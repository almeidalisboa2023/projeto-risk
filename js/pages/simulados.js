// Simulados: montar, resolver com tempo, nota líquida (Cebraspe) e histórico.
import { S, topicoDaQuestao, normResp } from '../state.js';
import { db } from '../backend.js';
import { esc, hoje, iso, pct, corPct } from '../util.js';
import { enunciadoHTML, sanitize, loading, toast, modal } from '../ui.js';
import { tagsQuestao } from '../quiz.js';

const KEY = 'risk-simulado';
const lerAnd = () => { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } };
const gravaAnd = (v) => { try { v ? localStorage.setItem(KEY, JSON.stringify(v)) : localStorage.removeItem(KEY); } catch {} };
let tick = null;

export async function render(el) {
  clearInterval(tick);
  const and = lerAnd();
  el.innerHTML = `<div class="mono up">Treino com tempo</div><h1>Simulados</h1>
    ${and ? `<div class="card" style="margin-bottom:16px;border-color:var(--ouro2)"><div class="row"><div><b>Você tem um simulado em andamento</b><div class="muted">${and.qs.length} questões · ${Object.keys(and.resp).length} respondidas</div></div><span class="sp"></span><button class="btn" id="cont">Continuar</button><button class="btn sec" id="desc">Descartar</button></div></div>` : ''}
    <div class="grid g2"><div class="card" id="novo">${loading()}</div><div class="card"><h3>Seu histórico</h3><div id="hist">${loading()}</div></div></div>
    <div class="card" style="margin-top:16px"><h3>Simulados em PDF</h3><div id="pdfs">${loading()}</div></div>`;
  if (and) {
    el.querySelector('#cont').onclick = () => executar(el, and);
    el.querySelector('#desc').onclick = () => { if (confirm('Descartar o simulado em andamento?')) { gravaAnd(null); render(el); } };
  }
  historico(el.querySelector('#hist'));
  pdfs(el.querySelector('#pdfs'));
  await formNovo(el, el.querySelector('#novo'));
}

async function formNovo(el, box) {
  const meta = await db.selectAll('questoes', { select: 'materia,modalidade', origem: 'in.(publica,inedita)', situacao: 'eq.atualizada' });
  const cont = new Map(); for (const q of meta) cont.set(q.materia, (cont.get(q.materia) || 0) + 1);
  const doEdital = new Set(S.topicos.map((t) => t.materia));
  const mats = [...cont.keys()].filter(Boolean).sort();
  const pre = mats.filter((m) => doEdital.has(m));
  const marcadas = new Set(pre.length ? pre : mats);
  const temME = meta.some((q) => q.modalidade === 'multipla_escolha');
  box.innerHTML = `<h3>Novo simulado</h3>
    <div class="row"><div class="campo"><label>Questões</label><select id="sq">${[10, 20, 30, 40, 60, 120].map((n) => `<option ${n === 20 ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
      <div class="campo"><label>Tempo (min)</label><input type="number" id="st" value="40" min="5" style="width:90px"></div>
      <div class="campo"><label>Origem</label><select id="so"><option value="">Todas</option><option value="publica">Provas anteriores</option><option value="inedita">Inéditas R.I.S.K.</option></select></div>
      ${temME ? `<div class="campo"><label>Tipo</label><select id="sm"><option value="certo_errado">Certo/Errado</option><option value="multipla_escolha">Múltipla escolha</option></select></div>` : ''}</div>
    <label class="check"><input type="checkbox" id="snr" checked> Priorizar questões que ainda não resolvi</label>
    <div class="row" style="margin-top:8px"><span class="mono up">Matérias</span><span class="sp"></span><button class="linkbtn" id="stodas">todas</button><button class="linkbtn" id="snenhuma">nenhuma</button></div>
    <div style="max-height:220px;overflow:auto;columns:2 220px">${mats.map((m) => `<label class="check" style="margin:3px 0"><input type="checkbox" class="smat" value="${esc(m)}" ${marcadas.has(m) ? 'checked' : ''}> ${esc(m)} <span class="muted">(${cont.get(m)})</span></label>`).join('') || '<p class="muted">O banco de questões está vazio. Importe as planilhas em Administrador.</p>'}</div>
    <div class="muted" style="font-size:13px;margin:8px 0">No formato Certo/Errado vale a regra Cebraspe: cada erro anula um acerto; em branco não conta.</div>
    <button class="btn" id="scomecar">Começar simulado</button>`;
  const q = (s) => box.querySelector(s);
  q('#sq').onchange = () => (q('#st').value = Number(q('#sq').value) * 2);
  q('#stodas').onclick = () => box.querySelectorAll('.smat').forEach((c) => (c.checked = true));
  q('#snenhuma').onclick = () => box.querySelectorAll('.smat').forEach((c) => (c.checked = false));
  q('#scomecar').onclick = async (ev) => {
    const escolhidas = [...box.querySelectorAll('.smat:checked')].map((c) => c.value);
    if (!escolhidas.length) return toast('Escolha pelo menos uma matéria.', 'erro');
    ev.target.disabled = true; ev.target.textContent = 'Montando…';
    try {
      const and = await montar({ n: Number(q('#sq').value), minutos: Number(q('#st').value) || 40, origem: q('#so').value, modalidade: q('#sm')?.value || 'certo_errado', naoResolvidas: q('#snr').checked, materias: escolhidas });
      gravaAnd(and); executar(el, and);
    } catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; ev.target.textContent = 'Começar simulado'; }
  };
}

const embaralha = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

async function montar({ n, minutos, origem, modalidade, naoResolvidas, materias }) {
  const p = { select: 'id,materia', situacao: 'eq.atualizada', modalidade: 'eq.' + modalidade, origem: origem ? 'eq.' + origem : 'in.(publica,inedita)' };
  const cand = (await db.selectAll('questoes', p)).filter((x) => materias.includes(x.materia));
  if (!cand.length) throw new Error('Não há questões com essas opções.');
  const feitas = naoResolvidas ? new Set((await db.selectAll('respostas', { user_id: 'eq.' + S.user.id, select: 'questao_id' })).map((r) => r.questao_id)) : new Set();
  const porMat = new Map();
  for (const x of embaralha(cand)) { const a = porMat.get(x.materia) || []; a.push(x); porMat.set(x.materia, a); }
  for (const [m, a] of porMat) porMat.set(m, [...a.filter((x) => !feitas.has(x.id)), ...a.filter((x) => feitas.has(x.id))]);
  // rodízio entre matérias para equilibrar
  const ids = []; const filas = [...porMat.values()];
  while (ids.length < n && filas.some((f) => f.length)) for (const f of filas) { if (ids.length >= n) break; const x = f.shift(); if (x) ids.push(x.id); }
  const qs = [];
  for (let i = 0; i < ids.length; i += 80) qs.push(...(await db.select('questoes', { id: `in.(${ids.slice(i, i + 80).join(',')})` })));
  const ordem = new Map(ids.map((id, i) => [id, i])); qs.sort((a, b) => ordem.get(a.id) - ordem.get(b.id));
  return { qs, resp: {}, i: 0, fim: Date.now() + minutos * 60000, inicio: Date.now(), minutos, modalidade, titulo: `Simulado ${new Date().toLocaleDateString('pt-BR')} · ${qs.length} questões` };
}

function executar(el, and) {
  clearInterval(tick);
  const ce = and.modalidade !== 'multipla_escolha';
  const desenha = () => {
    const q = and.qs[and.i]; const r = and.resp[q.id];
    const alts = Array.isArray(q.alternativas) ? q.alternativas : [];
    el.innerHTML = `<div class="sim-topo"><b>${esc(and.titulo)}</b><span class="sp"></span><span class="sim-tempo" id="tempo"></span><button class="btn sec mini" id="grade">Mapa</button><button class="btn mini" id="entregar">Entregar</button></div>
      <div class="card qcard"><div class="mono up" style="margin-bottom:6px">Questão ${and.i + 1} de ${and.qs.length}</div>${tagsQuestao(q)}${enunciadoHTML(q.enunciado)}
        <div class="resp">${ce ? `<button class="btn sec ${r === 'C' ? 'marcada' : ''}" data-r="C">C · Certo</button><button class="btn sec ${r === 'E' ? 'marcada' : ''}" data-r="E">E · Errado</button>${r ? '<button class="linkbtn" data-r="">Deixar em branco</button>' : ''}`
          : alts.map((a, k) => `<button class="btn sec alt ${r === 'ABCDE'[k] ? 'marcada' : ''}" data-r="${'ABCDE'[k]}"><b>${'ABCDE'[k]})</b> ${sanitize(a)}</button>`).join('') + (r ? '<button class="linkbtn" data-r="">Limpar resposta</button>' : '')}</div></div>
      <div class="row" style="margin-top:12px"><button class="btn sec" id="ant" ${and.i ? '' : 'disabled'}>‹ Anterior</button><span class="sp"></span><span class="muted">${Object.keys(and.resp).length} de ${and.qs.length} respondidas</span><span class="sp"></span><button class="btn" id="prox">${and.i < and.qs.length - 1 ? 'Próxima ›' : 'Revisar e entregar'}</button></div>`;
    el.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => { if (b.dataset.r) and.resp[q.id] = b.dataset.r; else delete and.resp[q.id]; gravaAnd(and); desenha(); }));
    el.querySelector('#ant').onclick = () => { and.i--; gravaAnd(and); desenha(); };
    el.querySelector('#prox').onclick = () => { if (and.i < and.qs.length - 1) { and.i++; gravaAnd(and); desenha(); } else mapa(); };
    el.querySelector('#grade').onclick = mapa;
    el.querySelector('#entregar').onclick = () => entregarConfirma();
    relogio();
    window.scrollTo(0, 0);
  };
  const mapa = () => modal(`<h3>Mapa do simulado</h3><div class="sim-grade">${and.qs.map((q, k) => `<button class="${and.resp[q.id] ? 'resp' : ''} ${k === and.i ? 'atual' : ''}" data-k="${k}">${k + 1}</button>`).join('')}</div>
    <div class="row" style="margin-top:14px"><span class="muted">${Object.keys(and.resp).length} respondidas · ${and.qs.length - Object.keys(and.resp).length} em branco</span><span class="sp"></span><button class="btn" id="mEnt">Entregar</button></div>`, {
    onMount: (m, close) => { m.querySelectorAll('[data-k]').forEach((b) => (b.onclick = () => { and.i = Number(b.dataset.k); gravaAnd(and); close(); desenha(); })); m.querySelector('#mEnt').onclick = () => { close(); entregarConfirma(); }; },
  });
  const entregarConfirma = () => {
    const br = and.qs.length - Object.keys(and.resp).length;
    if (br && !confirm(`${br} questão(ões) em branco. Entregar mesmo assim?`)) return;
    entregar(el, and);
  };
  const relogio = () => {
    clearInterval(tick);
    const at = () => {
      const t = document.getElementById('tempo'); if (!t) return clearInterval(tick);
      const ms = and.fim - Date.now();
      if (ms <= 0) { clearInterval(tick); toast('Tempo esgotado! Simulado entregue.'); entregar(el, and); return; }
      const s = Math.floor(ms / 1000); t.textContent = `⏱ ${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
      t.classList.toggle('pouco', ms < 5 * 60000);
    };
    at(); tick = setInterval(at, 1000);
  };
  desenha();
}

async function entregar(el, and) {
  clearInterval(tick);
  el.innerHTML = loading('Corrigindo…');
  const ce = and.modalidade !== 'multipla_escolha';
  let ac = 0, er = 0, br = 0; const det = {}; const resps = []; const porTop = new Map();
  for (const q of and.qs) {
    const r = and.resp[q.id]; const m = q.materia || 'Outros'; const d = det[m] || (det[m] = { c: 0, e: 0, b: 0 });
    if (!r) { br++; d.b++; continue; }
    const ok = normResp(r) === normResp(q.gabarito);
    ok ? (ac++, d.c++) : (er++, d.e++);
    const tp = topicoDaQuestao(q);
    resps.push({ user_id: S.user.id, questao_id: q.id, resposta: normResp(r), acertou: ok, topico_id: tp?.id || null });
    const k = tp?.id || 'sem'; const a = porTop.get(k) || [0, 0]; a[0]++; if (ok) a[1]++; porTop.set(k, a);
  }
  const nota = ce ? ac - er : ac;
  const minutos = Math.max(1, Math.round((Math.min(Date.now(), and.fim) - and.inicio) / 60000));
  try {
    if (resps.length) await db.insert('respostas', resps);
    if (S.edital && porTop.size) {
      const logs = [...porTop].map(([k, [f, a]]) => ({ user_id: S.user.id, edital_id: S.edital.id, topico_id: k === 'sem' ? null : k, data: iso(hoje()), feitas: f, acertos: a, origem: 'app' }));
      const novos = await db.insert('question_logs', logs); S.logs.push(...novos);
    }
    await db.insert('provas', [{ user_id: S.user.id, edital_id: S.edital?.id || null, titulo: and.titulo, formato: and.modalidade, total: and.qs.length, acertos: ac, erros: er, brancos: br, nota, minutos, detalhe: det }]);
  } catch (e) { toast('Erro ao salvar o resultado: ' + e.message, 'erro'); }
  gravaAnd(null);
  resultado(el, and, { ac, er, br, nota, minutos, det, ce });
}

function resultado(el, and, { ac, er, br, nota, minutos, det, ce }) {
  const n = and.qs.length;
  el.innerHTML = `<div class="mono up">Resultado</div><h1>${esc(and.titulo)}</h1>
    <div class="grid g2"><div class="hero"><div class="mono up">${ce ? 'Nota líquida (acertos − erros)' : 'Acertos'}</div><div class="nota ${corPct(pct(nota, n))}">${nota}<span class="muted" style="font-size:1.4rem"> / ${n}</span></div>
      <div style="margin-top:8px">${ac} certas · ${er} erradas · ${br} em branco · ${minutos} min</div></div>
      <div class="card"><h3>Por matéria</h3><table class="tab"><tr><th>Matéria</th><th>C</th><th>E</th><th>Br</th><th>${ce ? 'Líquida' : '%'}</th></tr>
        ${Object.entries(det).map(([m, d]) => `<tr><td>${esc(m)}</td><td>${d.c}</td><td>${d.e}</td><td>${d.b}</td><td class="${corPct(pct(d.c, d.c + d.e + d.b))}"><b>${ce ? d.c - d.e : (pct(d.c, d.c + d.e + d.b) ?? 0) + '%'}</b></td></tr>`).join('')}</table></div></div>
    <div class="card" style="margin-top:16px"><div class="row"><h3>Correção</h3><span class="sp"></span><a class="btn sec" href="#/simulados">Novo simulado</a></div>
      <div class="sim-grade" style="margin:10px 0 16px">${and.qs.map((q, k) => { const r = and.resp[q.id]; return `<button class="${!r ? '' : normResp(r) === normResp(q.gabarito) ? 'ok' : 'bad'}" data-k="${k}">${k + 1}</button>`; }).join('')}</div>
      <div id="corr"></div></div>`;
  const mostra = (k) => {
    const q = and.qs[k]; const r = and.resp[q.id]; const ok = r && normResp(r) === normResp(q.gabarito);
    el.querySelector('#corr').innerHTML = `<div class="mono up" style="margin-bottom:6px">Questão ${k + 1}</div>${tagsQuestao(q)}${enunciadoHTML(q.enunciado)}
      ${!ce && Array.isArray(q.alternativas) ? q.alternativas.map((a, i) => `<div class="alt" style="padding:6px 0">${'ABCDE'[i]}) ${sanitize(a)}</div>`).join('') : ''}
      <div class="resultado ${!r ? '' : ok ? 'ok' : 'bad'}"><b>${!r ? 'Em branco.' : ok ? '✔ Você acertou.' : '✘ Você errou.'}</b> Sua resposta: <b>${esc(r ? normResp(r) : '—')}</b> · Gabarito: <b>${esc(normResp(q.gabarito))}</b>
        <div style="margin-top:8px"><div class="mono up">Comentário</div>${sanitize(q.comentario || 'Sem comentário.')}</div></div>`;
  };
  el.querySelectorAll('.sim-grade [data-k]').forEach((b) => (b.onclick = () => mostra(Number(b.dataset.k))));
  const primeiraErrada = and.qs.findIndex((q) => and.resp[q.id] && normResp(and.resp[q.id]) !== normResp(q.gabarito));
  mostra(primeiraErrada >= 0 ? primeiraErrada : 0);
  window.scrollTo(0, 0);
}

async function historico(box) {
  let ps = [];
  try { ps = await db.select('provas', { user_id: 'eq.' + S.user.id, order: 'created_at.desc', limit: 30 }); }
  catch { box.innerHTML = '<p class="muted">Para guardar o histórico, rode a atualização do banco (atualizacao-02.sql) no Supabase.</p>'; return; }
  if (!ps.length) { box.innerHTML = '<p class="muted">Nenhum simulado feito ainda.</p>'; return; }
  const ult = ps.slice(0, 10).reverse();
  box.innerHTML = `<div class="chart" style="height:120px;margin-bottom:6px"><div class="meta" style="bottom:70%"></div>${ult.map((p) => { const v = Math.max(0, pct(Number(p.nota), p.total) || 0); return `<div class="col" title="${esc(new Date(p.created_at).toLocaleDateString('pt-BR'))}: ${p.nota}/${p.total}"><div class="b ${corPct(v)}" style="height:${Math.max(v, 2)}%"><span class="v">${v}%</span></div></div>`; }).join('')}</div>
    <div class="mono" style="margin-bottom:10px">Nota em % dos últimos simulados · linha: 70%</div>
    <table class="tab"><tr><th>Data</th><th>Questões</th><th>C / E / Br</th><th>Nota</th><th>Tempo</th></tr>
    ${ps.map((p) => `<tr><td>${esc(new Date(p.created_at).toLocaleDateString('pt-BR'))}</td><td>${p.total}</td><td>${p.acertos} / ${p.erros} / ${p.brancos}</td><td class="${corPct(pct(Number(p.nota), p.total))}"><b>${p.nota}</b></td><td>${p.minutos} min</td></tr>`).join('')}</table>`;
}

async function pdfs(box) {
  const h = iso(hoje());
  const ss = await db.select('simulados', { order: 'liberado_em.desc' }).catch(() => []);
  box.innerHTML = ss.length ? ss.map((s) => `<div class="row" style="margin:8px 0"><b>${esc(s.titulo)}</b>${s.semana ? `<span class="pill">Semana ${s.semana}</span>` : ''}<span class="sp"></span>${h >= s.liberado_em ? `<a class="btn sec mini" href="${esc(s.arquivo_url)}" target="_blank" rel="noopener">Baixar PDF ↗</a>` : `<span class="pill">Disponível em ${esc(s.liberado_em.split('-').reverse().join('/'))}</span>`}</div>`).join('') : '<p class="muted">Nenhum simulado em PDF liberado.</p>';
}
