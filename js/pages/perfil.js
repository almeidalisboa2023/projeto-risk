import { S, carregarTudo } from '../state.js';
import { db, auth } from '../backend.js';
import { esc } from '../util.js';
import { toast, modal } from '../ui.js';
import { baixarMeusDados, excluirMinhaConta } from '../privacidade.js';
import { recarregar } from '../app.js';
import { TEMAS, temaDoEdital } from '../temas.js';
import { meuCurso, minhaBanca } from '../cursos.js';

export async function render(el) {
  el.addEventListener('click', (e) => { if (e.target.id === 'pfSair') { e.preventDefault(); auth.signOut(); location.hash = ''; location.reload(); } });
  const p = S.profile;
  const blocos = Array.isArray(p.blocos) && p.blocos.length ? p.blocos : [{ hora: '08:00', min: 50 }, { hora: '09:00', min: 50 }, { hora: '21:00', min: 50 }];
  const duvidas = S.tarefas.filter((t) => t.duvida);
  el.innerHTML = `<div class="row"><div class="mono up">Perfil</div><span class="sp"></span><button class="btn sec mini" id="pfSair">⎋ Sair da conta</button></div><h1>${esc(p.nome || '')}</h1>
  ${meuCurso() ? `<div class="lt-curso"><span>🎓</span><div><b>${esc(meuCurso().nome)}</b><small>${esc(meuCurso().edital)} ${minhaBanca() ? 'Banca: ' + esc(minhaBanca().nome) + '.' : 'Banca ainda não definida.'} Para trocar de curso, fale com o administrador.</small></div></div>` : ''}
  <div class="grid g2">
    <div class="card"><h3>Seus dados</h3>
      <div class="campo"><label>Nome</label><input id="nome" value="${esc(p.nome || '')}" style="width:100%"></div>
      <div class="campo"><label>E-mail</label><input value="${esc(S.user.email)}" disabled style="width:100%"></div>
      <div class="row"><div class="campo"><label>Língua estrangeira</label><select id="lingua"><option value="espanhol" ${p.lingua === 'espanhol' ? 'selected' : ''}>Espanhol</option><option value="ingles" ${p.lingua === 'ingles' ? 'selected' : ''}>Inglês</option></select></div>
        <div class="campo"><label>Meta diária de questões</label><input type="number" id="metaq" min="1" value="${p.meta_questoes || 30}" style="width:120px"></div></div>
      <label class="check"><input type="checkbox" id="revauto" ${p.revisao_auto !== false ? 'checked' : ''}> Ao finalizar um assunto, agendar revisões automáticas (amanhã, em 7 e em 30 dias)</label>
      <button class="btn" id="salvar">Salvar</button>
      <hr style="border:0;border-top:1px solid var(--borda);margin:18px 0">
      <div class="campo"><label>Nova senha</label><input type="password" id="senha" minlength="6"></div><button class="btn sec" id="trocar">Trocar senha</button></div>
    <div class="card"><h3>Blocos por dia</h3><p class="muted" style="font-size:13px">Quantos blocos de estudo você faz por dia. Usado ao montar a semana automaticamente e ao corrigir atrasos.</p>
      <div class="row"><input type="number" id="nbl" min="1" max="8" value="${blocos.length}" style="width:100px"><button class="btn" id="salvaBl">Salvar</button></div></div>
  </div>
  <div class="card" style="margin-top:16px"><h3>Tema do calendário</h3>
    <p class="muted" style="font-size:14px;margin-top:0">O tema é definido automaticamente pelo seu edital${S.edital ? ` (<b>${esc(S.edital.concurso)}</b>: ${esc(TEMAS[temaDoEdital(S.edital)].nome)})` : ''}. Só o administrador pode trocar o tema; você pode preferir o tema padrão.</p>
    <label class="check"><input type="radio" name="tp" value="0" ${!p.tema_padrao ? 'checked' : ''}> Usar o tema do meu edital${S.edital ? ` (${esc(TEMAS[temaDoEdital(S.edital)].nome)})` : ''}</label>
    <label class="check"><input type="radio" name="tp" value="1" ${p.tema_padrao ? 'checked' : ''}> Usar o tema padrão R.I.S.K.</label></div>
  <div class="card" style="margin-top:16px"><h3>Meus editais</h3>${S.editais.map((e) => `<div class="row" style="margin:8px 0"><b>${esc(e.concurso)}</b><span class="pill">${e.ativo === false ? 'Arquivado' : 'Ativo'}</span><span class="sp"></span><button class="btn sec mini" data-arq="${e.id}">${e.ativo === false ? 'Reativar' : 'Arquivar'}</button></div>`).join('') || '<p class="muted">Nenhum.</p>'}</div>
  <div class="card" style="margin-top:16px"><h3>Minhas dúvidas</h3>${duvidas.map((t) => `<div style="margin:8px 0"><span class="mono">Semana ${t.semana} · ${esc(t.dia)}</span><br><b>${esc(t.materia)}</b> — ${esc(t.topico)}<div class="muted">📝 ${esc(t.duvida)}</div></div>`).join('') || '<p class="muted">Nenhuma dúvida anotada.</p>'}</div>
  <div class="card" style="margin-top:16px"><h3>Privacidade e dados</h3>
    <p class="muted" style="font-size:14px;margin-top:0">Leia os <a href="termos.html" target="_blank" rel="noopener">Termos de Uso</a> e a <a href="privacidade.html" target="_blank" rel="noopener">Política de Privacidade</a>.${p.termos_aceitos_em ? ` Você aceitou em ${new Date(p.termos_aceitos_em).toLocaleDateString('pt-BR')}.` : ''}</p>
    <div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn sec" id="pfBaixar">⬇ Baixar meus dados</button><span class="sp"></span>${p.role === 'admin' ? '<span class="muted" style="font-size:13px">A conta do administrador não pode ser excluída por aqui.</span>' : '<button class="btn sec" id="pfExcluir" style="color:var(--vermelho);border-color:var(--vermelho)">Excluir minha conta</button>'}</div></div>`;

  el.querySelector('#salvar').onclick = async () => {
    try { const [n] = await db.update('profiles', { id: 'eq.' + S.user.id }, { nome: el.querySelector('#nome').value.trim(), lingua: el.querySelector('#lingua').value, meta_questoes: Number(el.querySelector('#metaq').value) || 30, revisao_auto: el.querySelector('#revauto').checked }); Object.assign(S.profile, n); toast('Salvo!'); recarregar(); } catch (e) { toast(e.message, 'erro'); }
  };
  el.querySelector('#pfBaixar').onclick = async (e) => { e.target.disabled = true; try { await baixarMeusDados(S.user); toast('Arquivo com os seus dados baixado.'); } catch (er) { toast(er.message, 'erro'); } e.target.disabled = false; };
  const bEx = el.querySelector('#pfExcluir');
  if (bEx) bEx.onclick = () => modal(`<h3>Excluir minha conta</h3>
    <p>Isto apaga <b>para sempre</b> a sua conta e todos os seus dados de estudo: calendário, edital, questões feitas, horas, revisões e anotações. <b>Não dá para desfazer.</b></p>
    <p class="muted" style="font-size:13.5px">Se você tem um curso pago, o acesso também acaba e não é devolvido ao excluir a conta. Reembolsos seguem as regras da Hotmart (7 dias após a compra). Antes, se quiser, use “Baixar meus dados”.</p>
    <div class="campo"><label>Por que você está saindo? (opcional)</label><textarea id="exM" rows="2" maxlength="500" style="width:100%"></textarea></div>
    <div class="campo"><label>Para confirmar, digite <b>EXCLUIR</b></label><input id="exC" autocomplete="off" style="width:100%"></div>
    <div class="row"><span class="sp"></span><button class="btn sec" id="exNao">Cancelar</button><button class="btn" id="exSim" disabled style="background:var(--vermelho);border-color:var(--vermelho);color:#fff">Excluir definitivamente</button></div>`, {
    onMount: (m, close) => {
      const sim = m.querySelector('#exSim');
      m.querySelector('#exC').oninput = (ev) => { sim.disabled = ev.target.value.trim().toUpperCase() !== 'EXCLUIR'; };
      m.querySelector('#exNao').onclick = close;
      sim.onclick = async () => {
        sim.disabled = true; sim.textContent = 'Excluindo…';
        try {
          await excluirMinhaConta(m.querySelector('#exM').value.trim());
          close();
          document.getElementById('app').innerHTML = '<div class="login"><div class="card" style="text-align:center"><h2>Conta excluída</h2><p class="muted">Sua conta e seus dados de estudo foram apagados. Obrigado por ter estudado com o PROJETO R.I.S.K.</p><a class="btn" href="./">Voltar ao início</a></div></div>';
          location.hash = '';
        } catch (er) { toast(er.message, 'erro'); sim.disabled = false; sim.textContent = 'Excluir definitivamente'; }
      };
    },
  });
  el.querySelector('#trocar').onclick = async () => { try { await auth.updatePassword(el.querySelector('#senha').value); toast('Senha alterada.'); } catch (e) { toast(e.message, 'erro'); } };
  el.querySelector('#salvaBl').onclick = async () => {
    const n = Math.max(1, Math.min(8, Number(el.querySelector('#nbl').value) || 3));
    const novo = Array.from({ length: n }, (_, i) => blocos[i] || { hora: '', min: 50 });
    try { await db.update('profiles', { id: 'eq.' + S.user.id }, { blocos: novo }); S.profile.blocos = novo; toast('Salvo!'); } catch (e) { toast(e.message, 'erro'); }
  };
  el.querySelectorAll('[name=tp]').forEach((r) => (r.onchange = async () => {
    const v = r.value === '1';
    try { await db.update('profiles', { id: 'eq.' + S.user.id }, { tema_padrao: v }); S.profile.tema_padrao = v; toast(v ? 'Tema padrão ativado.' : 'Tema do edital ativado.'); } catch (e) { toast(e.message, 'erro'); }
  }));
  el.querySelectorAll('[data-arq]').forEach((b) => (b.onclick = async () => {
    const e = S.editais.find((x) => x.id === b.dataset.arq);
    if (e.ativo === false && S.editais.filter((x) => x.ativo !== false).length >= 3) return toast('Máximo de 3 editais ativos.', 'erro');
    try { await db.update('editais', { id: 'eq.' + e.id }, { ativo: e.ativo === false }); await carregarTudo(); recarregar(); } catch (er) { toast(er.message, 'erro'); }
  }));
}

export function fmtCPF(v) {
  const d = String(v || '').replace(/\D/g, '').slice(0, 11);
  return d.replace(/^(\d{3})(\d)/, '$1.$2').replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2');
}
function cpfValido(d) {
  if (!/^\d{11}$/.test(d) || /^(\d)\1{10}$/.test(d)) return false;
  const dv = (n) => { let s = 0; for (let i = 0; i < n; i++) s += Number(d[i]) * (n + 1 - i); const r = (s * 10) % 11; return r === 10 ? 0 : r; };
  return dv(9) === Number(d[9]) && dv(10) === Number(d[10]);
}
