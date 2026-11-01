import { S } from '../state.js';
import { db } from '../backend.js';
import { esc } from '../util.js';
import { loading, toast } from '../ui.js';
import { montarQuestao, resolverSequencia } from '../quiz.js';

let F = { aba: 'banco', materia: '', assunto: '', banca: '', origem: '', situacao: 'atualizada', status: 'todas', busca: '', pagina: 0 };
const POR_PAG = 20;

export async function render(el, query) {
  const topId = query.get('topico');
  const tp = topId ? S.topicos.find((t) => t.id === topId) : null;
  if (tp) F = { ...F, aba: 'banco', materia: tp.materia, assunto: tp.topico, pagina: 0 };
  el.innerHTML = `<div class="mono up">Banco de questões</div><h1>Questões</h1>
    ${tp ? `<div class="card" style="margin-bottom:12px"><div class="row"><div><div class="mono up">Tópico</div><b>${esc(tp.topico)}</b></div><span class="sp"></span><a class="btn sec mini" href="#/calendario">← Voltar ao calendário</a></div></div>` : ''}
    <div class="row" style="margin-bottom:12px"><button class="btn ${F.aba === 'banco' ? '' : 'sec'}" data-aba="banco">Banco completo</button><button class="btn ${F.aba === 'ia' ? '' : 'sec'}" data-aba="ia">Geradas para você</button></div>
    <div class="card filtros" id="filtros">${loading()}</div>
    <div id="lista" style="margin-top:14px">${loading()}</div>`;
  el.querySelectorAll('[data-aba]').forEach((b) => (b.onclick = () => { F.aba = b.dataset.aba; F.pagina = 0; if (topId) location.hash = '#/questoes'; else render(el, query); }));

  const meta = await db.selectAll('questoes', { select: 'materia,assunto,banca', order: 'materia.asc' });
  const uniq = (k, filtro = () => true) => [...new Set(meta.filter(filtro).map((q) => q[k]).filter(Boolean))].sort();
  const opt = (lista, v) => '<option value="">Todas</option>' + lista.map((x) => `<option ${x === v ? 'selected' : ''}>${esc(x)}</option>`).join('');
  el.querySelector('#filtros').innerHTML = `
    <div><label>Matéria</label><select data-f="materia">${opt(uniq('materia'), F.materia)}</select></div>
    <div><label>Assunto</label><select data-f="assunto">${opt(uniq('assunto', (q) => !F.materia || q.materia === F.materia), F.assunto)}</select></div>
    <div><label>Banca</label><select data-f="banca">${opt(uniq('banca'), F.banca)}</select></div>
    <div><label>Origem</label><select data-f="origem"><option value="">Todas</option><option value="publica" ${F.origem === 'publica' ? 'selected' : ''}>Provas anteriores</option><option value="inedita" ${F.origem === 'inedita' ? 'selected' : ''}>Inéditas R.I.S.K.</option></select></div>
    <div><label>Situação</label><select data-f="situacao"><option value="atualizada" ${F.situacao === 'atualizada' ? 'selected' : ''}>Só atualizadas</option><option value="" ${F.situacao === '' ? 'selected' : ''}>Incluir desatualizadas/anuladas</option></select></div>
    <div><label>Status</label><select data-f="status">${[['todas', 'Todas'], ['nao', 'Não resolvidas'], ['res', 'Resolvidas'], ['acertei', 'Acertei'], ['errei', 'Errei']].map(([v, n]) => `<option value="${v}" ${F.status === v ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
    <div><label>Busca (texto ou código)</label><input data-f="busca" value="${esc(F.busca)}" placeholder="Ex.: crase, R21PRF"></div>`;
  el.querySelectorAll('[data-f]').forEach((i) => (i.onchange = () => { F[i.dataset.f] = i.value; if (i.dataset.f === 'materia') F.assunto = ''; F.pagina = 0; if (topId) location.hash = '#/questoes'; else render(el, query); }));
  await lista(el.querySelector('#lista'));
}

async function lista(box) {
  const p = { select: 'id', order: 'codigo.asc' };
  if (F.aba === 'ia') { p.origem = 'eq.ia'; p.owner = 'eq.' + S.user.id; }
  else { if (F.origem) p.origem = 'eq.' + F.origem; else p.origem = 'in.(publica,inedita)'; }
  if (F.materia) p.materia = 'eq.' + F.materia;
  if (F.assunto) p.assunto = 'eq.' + F.assunto;
  if (F.banca) p.banca = 'eq.' + F.banca;
  if (F.situacao) p.situacao = 'eq.' + F.situacao;
  if (F.busca) { const b = F.busca.replace(/[,()*]/g, ' ').trim(); p.or = `(enunciado.ilike.*${b}*,codigo.ilike.*${b}*)`; }
  let ids = (await db.selectAll('questoes', p)).map((q) => q.id);
  const minhas = await db.selectAll('respostas', { user_id: 'eq.' + S.user.id, select: 'questao_id,acertou,created_at', order: 'created_at.asc' });
  const ult = new Map(minhas.map((r) => [r.questao_id, r.acertou]));
  if (F.status !== 'todas') ids = ids.filter((id) => ({ nao: !ult.has(id), res: ult.has(id), acertei: ult.get(id) === true, errei: ult.get(id) === false }[F.status]));
  const total = ids.length, pags = Math.max(1, Math.ceil(total / POR_PAG));
  F.pagina = Math.min(F.pagina, pags - 1);
  const pagIds = ids.slice(F.pagina * POR_PAG, (F.pagina + 1) * POR_PAG);
  const qs = pagIds.length ? await db.select('questoes', { id: `in.(${pagIds.join(',')})`, order: 'codigo.asc' }) : [];
  box.innerHTML = `<div class="row" style="margin-bottom:10px"><b>${total} questão(ões)</b><span class="sp"></span>${qs.length ? '<button class="btn" id="seq">Responder esta página em sequência</button>' : ''}</div>
    ${qs.length ? '' : `<div class="card"><p class="muted">${F.aba === 'ia' ? 'Você ainda não pediu questões ao Claude. Use o botão nos blocos do Calendário.' : 'Nenhuma questão com esses filtros.'}</p></div>`}
    ${qs.map((q, i) => `<div class="card" style="margin-bottom:10px" data-q="${q.id}"><div class="row"><span class="mono">${esc(q.codigo || '')} · ${esc(q.materia || '')}</span><span class="sp"></span>${ult.has(q.id) ? `<span class="pill ${ult.get(q.id) ? 'verde' : ''}">${ult.get(q.id) ? 'Acertou' : 'Errou'}</span>` : ''}</div>
      <div class="prev" style="margin:8px 0">${esc(String(q.enunciado).replace(/<hr\s*\/?>/gi, ' — ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 220))}…</div>
      <button class="btn sec mini" data-ver="${i}">Ver questão</button><div class="area"></div></div>`).join('')}
    <div class="row" style="justify-content:center;margin-top:12px">${F.pagina > 0 ? '<button class="btn sec" id="pa">‹ Anterior</button>' : ''}<span class="muted">Página ${F.pagina + 1} de ${pags}</span>${F.pagina < pags - 1 ? '<button class="btn sec" id="pp">Próxima ›</button>' : ''}</div>`;
  box.querySelectorAll('[data-ver]').forEach((b) => (b.onclick = () => {
    const card = b.closest('[data-q]'); const q = qs[Number(b.dataset.ver)];
    card.querySelector('.prev').remove(); card.querySelector('.row').remove(); b.remove();
    montarQuestao(card.querySelector('.area'), q, {});
  }));
  const seq = box.querySelector('#seq'); if (seq) seq.onclick = () => resolverSequencia(qs, { titulo: F.assunto || F.materia || 'Questões', onFim: () => lista(box) });
  const pa = box.querySelector('#pa'), pp = box.querySelector('#pp');
  if (pa) pa.onclick = () => { F.pagina--; lista(box); };
  if (pp) pp.onclick = () => { F.pagina++; lista(box); };
}
