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
      <div class="row"><div class="campo"><label>Língua estrangeira</label><select id="lingua"><option value="espanhol" ${p.lingua === 'espanhol' ? 'selected' : ''}>Espanhol</option><option value="ingles" ${p.lingua === 'ingles' ? 'selected' : ''}>Inglês</option></select></div>
        <div class="campo"><label>Meta de água (ml)</label><input type="number" id="agua" value="${p.meta_agua || 4000}" style="width:120px"></div></div>
      <button class="btn" id="salvar">Salvar</button>
      <hr style="border:0;border-top:1px solid var(--borda);margin:18px 0">
      <div class="campo"><label>Nova senha</label><input type="password" id="senha" minlength="6"></div><button class="btn sec" id="trocar">Trocar senha</button></div>
    <div class="card"><h3>Horário dos blocos</h3><p class="muted" style="font-size:13px">Usado no Calendário (Bloco 1, 2, 3…).</p>
      <div id="bl">${blocos.map((b, i) => `<div class="row" style="margin-bottom:8px"><span class="mono">Bloco ${i + 1}</span><input type="time" data-h="${i}" value="${esc(b.hora)}"><input type="number" data-m="${i}" value="${b.min}" style="width:90px"> min</div>`).join('')}</div>
      <div class="row"><button class="btn sec mini" id="mais">+ Bloco</button><button class="btn sec mini" id="menos">− Bloco</button><button class="btn" id="salvaBl">Salvar horários</button></div></div>
  </div>
  <div class="card" style="margin-top:16px"><h3>Meus editais</h3>${S.editais.map((e) => `<div class="row" style="margin:8px 0"><b>${esc(e.concurso)}</b><span class="pill">${e.ativo === false ? 'Arquivado' : 'Ativo'}</span><span class="sp"></span><button class="btn sec mini" data-arq="${e.id}">${e.ativo === false ? 'Reativar' : 'Arquivar'}</button></div>`).join('') || '<p class="muted">Nenhum.</p>'}</div>
  <div class="card" style="margin-top:16px"><h3>Minhas dúvidas</h3>${duvidas.map((t) => `<div style="margin:8px 0"><span class="mono">Semana ${t.semana} · ${esc(t.dia)}</span><br><b>${esc(t.materia)}</b> — ${esc(t.topico)}<div class="muted">📝 ${esc(t.duvida)}</div></div>`).join('') || '<p class="muted">Nenhuma dúvida anotada.</p>'}</div>`;

  el.querySelector('#salvar').onclick = async () => {
    try { const [n] = await db.update('profiles', { id: 'eq.' + S.user.id }, { nome: el.querySelector('#nome').value.trim(), lingua: el.querySelector('#lingua').value, meta_agua: Number(el.querySelector('#agua').value) || 4000 }); Object.assign(S.profile, n); toast('Salvo!'); recarregar(); } catch (e) { toast(e.message, 'erro'); }
  };
  el.querySelector('#trocar').onclick = async () => { try { await auth.updatePassword(el.querySelector('#senha').value); toast('Senha alterada.'); } catch (e) { toast(e.message, 'erro'); } };
  const lerBlocos = () => [...el.querySelectorAll('[data-h]')].map((i) => ({ hora: i.value || '08:00', min: Number(el.querySelector(`[data-m="${i.dataset.h}"]`).value) || 50 }));
  el.querySelector('#mais').onclick = () => { S.profile.blocos = [...lerBlocos(), { hora: '22:00', min: 50 }]; render(el); };
  el.querySelector('#menos').onclick = () => { S.profile.blocos = lerBlocos().slice(0, -1); render(el); };
  el.querySelector('#salvaBl').onclick = async () => { try { await db.update('profiles', { id: 'eq.' + S.user.id }, { blocos: lerBlocos() }); S.profile.blocos = lerBlocos(); toast('Horários salvos!'); } catch (e) { toast(e.message, 'erro'); } };
  el.querySelectorAll('[data-arq]').forEach((b) => (b.onclick = async () => {
    const e = S.editais.find((x) => x.id === b.dataset.arq);
    if (e.ativo === false && S.editais.filter((x) => x.ativo !== false).length >= 3) return toast('Máximo de 3 editais ativos.', 'erro');
    try { await db.update('editais', { id: 'eq.' + e.id }, { ativo: e.ativo === false }); await carregarTudo(); recarregar(); } catch (er) { toast(er.message, 'erro'); }
  }));
}
