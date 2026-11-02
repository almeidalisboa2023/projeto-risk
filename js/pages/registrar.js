// Registrar questões: lança questões feitas fora do site (por matéria / assunto) e mostra o histórico.
import { S, topicosValidos } from '../state.js';
import { db } from '../backend.js';
import { esc, hoje, iso, parseISO, ddmm, pct, corPct } from '../util.js';
import { toast } from '../ui.js';

export async function render(el) {
  const ed = S.edital;
  if (!ed) { el.innerHTML = `<div class="card"><h2>Registrar questões</h2><p class="muted">Cadastre um edital primeiro (menu Edital).</p></div>`; return; }
  const val = topicosValidos();
  const materias = [...new Set(val.map((t) => t.materia).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt'));
  const topById = new Map(S.topicos.map((t) => [t.id, t]));
  const logs = S.logs.filter((l) => !l.edital_id || l.edital_id === ed.id).slice().sort((a, b) => String(b.data).localeCompare(String(a.data)));
  const feitas = logs.reduce((x, l) => x + (l.feitas || 0), 0), acertos = logs.reduce((x, l) => x + (l.acertos || 0), 0);
  const pTot = pct(acertos, feitas);
  const h = iso(hoje());
  const hojeL = logs.filter((l) => l.data === h);
  const fHoje = hojeL.reduce((x, l) => x + (l.feitas || 0), 0), aHoje = hojeL.reduce((x, l) => x + (l.acertos || 0), 0);
  const nomeMat = (l) => topById.get(l.topico_id)?.materia || l.materia || 'Outros';

  el.innerHTML = `
  <h2 style="margin-top:0">✎ Registrar questões</h2>
  <div class="g4">
    <div class="card"><div class="mono up">Questões hoje</div><div class="num">${fHoje}</div><div class="muted">${aHoje} acertos${fHoje ? ` · ${pct(aHoje, fHoje)}%` : ''}</div></div>
    <div class="card"><div class="mono up">Total de questões</div><div class="num">${feitas}</div><div class="muted">${acertos} acertos</div></div>
    <div class="card"><div class="mono up">Taxa de acerto</div><div class="num ${corPct(pTot)}">${pTot == null ? '—' : pTot + '%'}</div><div class="muted">no edital atual</div></div>
  </div>
  <div class="card" style="margin-top:16px">
    <h3 style="margin-top:0">Novo registro</h3>
    <div class="g2">
      <label>Matéria<select id="rqM"><option value="">Escolha a matéria…</option>${materias.map((m) => `<option>${esc(m)}</option>`).join('')}</select></label>
      <label>Assunto (opcional)<select id="rqT"><option value="">— matéria inteira —</option></select></label>
    </div>
    <div class="g4" style="margin-top:8px;align-items:end">
      <label>Questões feitas<input id="rqF" type="number" min="1" inputmode="numeric"></label>
      <label>Acertos<input id="rqA" type="number" min="0" inputmode="numeric"></label>
      <label>Data<input id="rqD" type="date" value="${h}"></label>
      <div><div class="mono up">Aproveitamento</div><div class="num" id="rqP">—</div></div>
    </div>
    <div class="row" style="margin-top:10px"><button class="btn" id="rqS">Registrar</button></div>
  </div>
  <div class="card" style="margin-top:16px">
    <h3 style="margin-top:0">Histórico</h3>
    ${logs.length ? `<div style="overflow-x:auto"><table class="tab"><thead><tr><th>Data</th><th>Matéria / assunto</th><th>Questões</th><th>Acertos</th><th>%</th><th></th></tr></thead><tbody>
      ${logs.slice(0, 200).map((l) => { const p = pct(l.acertos, l.feitas); const t = topById.get(l.topico_id); const d = parseISO(l.data); return `<tr><td>${d ? ddmm(d) + '/' + d.getFullYear() : ''}</td><td>${esc(nomeMat(l))}${t?.topico ? `<div class="muted">${esc(t.topico)}</div>` : ''}</td><td>${l.feitas || 0}</td><td>${l.acertos || 0}</td><td class="${corPct(p)}">${p == null ? '—' : p + '%'}</td><td><button class="btn sec mini" data-del="${esc(l.id)}" title="Excluir">✕</button></td></tr>`; }).join('')}
    </tbody></table></div>` : '<p class="muted">Nenhuma questão registrada ainda.</p>'}
  </div>`;

  const $ = (id) => el.querySelector('#' + id);
  $('rqM').onchange = () => {
    const ts = val.filter((t) => t.materia === $('rqM').value);
    $('rqT').innerHTML = `<option value="">— matéria inteira —</option>` + ts.map((t) => `<option value="${esc(t.id)}">${esc(t.topico)}</option>`).join('');
  };
  const atualizaP = () => {
    const f = Number($('rqF').value), a = Number($('rqA').value);
    const p = f > 0 && $('rqA').value !== '' ? pct(Math.min(a, f), f) : null;
    $('rqP').textContent = p == null ? '—' : p + '%';
    $('rqP').className = 'num ' + corPct(p);
  };
  $('rqF').oninput = atualizaP; $('rqA').oninput = atualizaP;
  $('rqS').onclick = async () => {
    const materia = $('rqM').value, f = Number($('rqF').value), a = Number($('rqA').value), data = $('rqD').value || h;
    if (!materia) return toast('Escolha a matéria.', 'erro');
    if (!(f > 0)) return toast('Informe quantas questões fez.', 'erro');
    if ($('rqA').value === '' || a < 0 || a > f) return toast('Acertos devem estar entre 0 e o total de questões.', 'erro');
    $('rqS').disabled = true;
    try {
      const [log] = await db.insert('question_logs', [{ user_id: S.user.id, edital_id: ed.id, topico_id: $('rqT').value || null, materia, data, feitas: f, acertos: a, origem: 'externa' }]);
      S.logs.push(log);
      toast(`Registrado: ${a}/${f} (${pct(a, f)}%)`);
      render(el);
    } catch (e) { toast(e.message, 'erro'); $('rqS').disabled = false; }
  };
  el.querySelectorAll('[data-del]').forEach((b) => (b.onclick = async () => {
    if (!confirm('Excluir este registro?')) return;
    try { await db.remove('question_logs', { id: 'eq.' + b.dataset.del }); S.logs = S.logs.filter((l) => l.id !== b.dataset.del); render(el); } catch (e) { toast(e.message, 'erro'); }
  }));
}
