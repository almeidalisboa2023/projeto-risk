import { S, carregarTudo } from '../state.js';
import { db, auth } from '../backend.js';
import { esc } from '../util.js';
import { toast } from '../ui.js';
import { recarregar } from '../app.js';

export async function render(el) {
  const p = S.profile;
  const blocos = Array.isArray(p.blocos) && p.blocos.length ? p.blocos : [{ hora: '08:00', min: 50 }, { hora: '09:00', min: 50 }, { hora: '21:00', min: 50 }];
  const duvidas = S.tarefas.filter((t) => t.duvida);
  el.innerHTML = `<div class="mono up">Perfil</div><h1>${esc(p.nome || '')}</h1>
  <div class="grid g2">
    <div class="card"><h3>Seus dados</h3>
      <div class="campo"><label>Nome</label><input id="nome" value="${esc(p.nome || '')}" style="width:100%"></div>
      <div class="campo"><label>E-mail</label><input value="${esc(S.user.email)}" disabled style="width:100%"></div>
      <div class="campo"><label>CPF (aparece no cabeçalho dos resumos em PDF)</label><input id="cpf" inputmode="numeric" placeholder="000.000.000-00" value="${esc(fmtCPF(p.cpf || ''))}" style="width:220px"></div>
      <div class="row"><div class="campo"><label>Língua estrangeira</label><select id="lingua"><option value="espanhol" ${p.lingua === 'espanhol' ? 'selected' : ''}>Espanhol</option><option value="ingles" ${p.lingua === 'ingles' ? 'selected' : ''}>Inglês</option></select></div>
        <div class="campo"><label>Meta de água (ml)</label><input type="number" id="agua" value="${p.meta_agua || 4000}" style="width:120px"></div>
        <div class="campo"><label>Meta diária de questões</label><input type="number" id="metaq" min="1" value="${p.meta_questoes || 30}" style="width:120px"></div></div>
      <label class="check"><input type="checkbox" id="revauto" ${p.revisao_auto !== false ? 'checked' : ''}> Ao finalizar um assunto, agendar revisões automáticas (amanhã, em 7 e em 30 dias)</label>
      <button class="btn" id="salvar">Salvar</button>
      <hr style="border:0;border-top:1px solid var(--borda);margin:18px 0">
      <div class="campo"><label>Nova senha</label><input type="password" id="senha" minlength="6"></div><button class="btn sec" id="trocar">Trocar senha</button></div>
    <div class="card"><h3>Blocos por dia</h3><p class="muted" style="font-size:13px">Quantos blocos de estudo você faz por dia. Usado ao montar a semana automaticamente e ao corrigir atrasos.</p>
      <div class="row"><input type="number" id="nbl" min="1" max="8" value="${blocos.length}" style="width:100px"><button class="btn" id="salvaBl">Salvar</button></div></div>
  </div>
  <div class="card" style="margin-top:16px"><h3>Meus editais</h3>${S.editais.map((e) => `<div class="row" style="margin:8px 0"><b>${esc(e.concurso)}</b><span class="pill">${e.ativo === false ? 'Arquivado' : 'Ativo'}</span><span class="sp"></span><button class="btn sec mini" data-arq="${e.id}">${e.ativo === false ? 'Reativar' : 'Arquivar'}</button></div>`).join('') || '<p class="muted">Nenhum.</p>'}</div>
  <div class="card" style="margin-top:16px"><h3>Minhas dúvidas</h3>${duvidas.map((t) => `<div style="margin:8px 0"><span class="mono">Semana ${t.semana} · ${esc(t.dia)}</span><br><b>${esc(t.materia)}</b> — ${esc(t.topico)}<div class="muted">📝 ${esc(t.duvida)}</div></div>`).join('') || '<p class="muted">Nenhuma dúvida anotada.</p>'}</div>`;

  el.querySelector('#cpf').oninput = (e) => (e.target.value = fmtCPF(e.target.value));
  el.querySelector('#salvar').onclick = async () => {
    const d = el.querySelector('#cpf').value.replace(/\D/g, '');
    if (d && !cpfValido(d)) return toast('CPF inválido. Confira os números.', 'erro');
    try { const [n] = await db.update('profiles', { id: 'eq.' + S.user.id }, { nome: el.querySelector('#nome').value.trim(), lingua: el.querySelector('#lingua').value, meta_agua: Number(el.querySelector('#agua').value) || 4000, meta_questoes: Number(el.querySelector('#metaq').value) || 30, cpf: el.querySelector('#cpf').value.replace(/\D/g, '') || null, revisao_auto: el.querySelector('#revauto').checked }); Object.assign(S.profile, n); toast('Salvo!'); recarregar(); } catch (e) { toast(e.message, 'erro'); }
  };
  el.querySelector('#trocar').onclick = async () => { try { await auth.updatePassword(el.querySelector('#senha').value); toast('Senha alterada.'); } catch (e) { toast(e.message, 'erro'); } };
  el.querySelector('#salvaBl').onclick = async () => {
    const n = Math.max(1, Math.min(8, Number(el.querySelector('#nbl').value) || 3));
    const novo = Array.from({ length: n }, (_, i) => blocos[i] || { hora: '', min: 50 });
    try { await db.update('profiles', { id: 'eq.' + S.user.id }, { blocos: novo }); S.profile.blocos = novo; toast('Salvo!'); } catch (e) { toast(e.message, 'erro'); }
  };
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
