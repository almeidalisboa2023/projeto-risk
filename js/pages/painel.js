import { S, topicosValidos } from '../state.js';
import { db } from '../backend.js';
import { esc, hoje, iso, parseISO, addDias, dataExtenso, pct, corPct, FRASES, semanaDe, DIAS, idxDia, segundaDa } from '../util.js';
import { flipHTML, barra, toast } from '../ui.js';
import { tema, alternaTema, recarregar } from '../app.js';

let timer = null;

export async function render(el) {
  clearInterval(timer);
  const ed = S.edital;
  const nome = (S.profile.nome || '').split(' ')[0] || 'estudante';
  const validos = topicosValidos();
  const fin = validos.filter((t) => t.concluido).length;
  const comQ = new Set(S.logs.map((l) => l.topico_id));
  const praticados = validos.filter((t) => comQ.has(t.id)).length;
  const h = hoje(), seg = segundaDa(h);
  const naSemana = (l, ini) => { const d = parseISO(l.data); return d >= ini && d < addDias(ini, 7); };
  const sem = S.logs.filter((l) => naSemana(l, seg)), ant = S.logs.filter((l) => naSemana(l, addDias(seg, -7)));
  const soma = (a) => a.reduce((s, l) => [s[0] + l.feitas, s[1] + l.acertos], [0, 0]);
  const [fs, as] = soma(sem), [fa, aa] = soma(ant);
  const tx = pct(as, fs), txa = pct(aa, fa);
  const agua = (await db.select('agua', { user_id: 'eq.' + S.user.id, data: 'eq.' + iso(h) })).reduce((s, a) => s + a.ml, 0);
  const prova = parseISO(ed?.data_prova);
  const faltam = prova ? Math.max(0, Math.round((prova - h) / 864e5)) : null;
  let fi = Math.floor(Math.random() * FRASES.length);

  const semanaAtual = ed ? semanaDe(ed.data_inicio, h) : null;
  const tarefasHoje = ed ? S.tarefas.filter((t) => t.semana === semanaAtual && t.dia === DIAS[idxDia(h)]) : [];

  el.innerHTML = `
  <div class="topo">
    <span class="pill">${esc(ed ? ed.concurso : 'Sem edital')} · plano de estudos</span>
    <div class="row">
      ${ed ? `<span class="pill">${faltam != null ? `Faltam <b>${faltam}</b> dias` : 'Defina a data da prova'}</span><input type="date" id="dp" value="${esc(ed.data_prova || '')}" aria-label="Data da prova">` : ''}
      <button class="btn" id="tema">${tema() === 'dark' ? '☀ Modo claro' : '☾ Modo noturno'}</button>
    </div>
  </div>
  <section class="hero">
    <h1>Bem-vindo, ${esc(nome)}!</h1>
    <div class="muted">Vamos em busca do seu sonho.</div>
    <div id="relogio"></div>
    <div class="mono up">${esc(dataExtenso(h))}</div>
    <p class="frase" id="frase"></p><div class="mono" id="autor"></div>
    <button class="btn mini" id="outra" style="margin-top:10px">↻ Outra frase</button>
    ${faltam != null ? `<div style="margin-top:18px">${flipHTML(String(faltam).padStart(3, '0'))}<div class="muted">dias para a prova (${prova.toLocaleDateString('pt-BR')})</div></div>` : ''}
    <div style="max-width:560px;margin:18px auto 0;text-align:left"><div class="row"><span>Tópicos finalizados</span><span class="sp"></span><b>${fin}/${validos.length}</b></div>${barra(pct(fin, validos.length))}</div>
  </section>
  <div class="grid g4" style="margin-top:16px">
    <div class="card"><div class="mono up">Progresso do edital</div><div class="num">${pct(praticados, validos.length) ?? 0}%</div><div class="muted">${praticados} de ${validos.length} tópicos praticados</div></div>
    <div class="card"><div class="mono up">Questões na semana</div><div class="num">${fs}</div><div class="muted">${as} acertos</div></div>
    <div class="card"><div class="mono up">Taxa de acerto</div><div class="num ${corPct(tx)}">${tx ?? '—'}${tx != null ? '%' : ''}</div><div class="muted">${tx != null && txa != null ? `${tx - txa >= 0 ? '+' : ''}${tx - txa} pp vs semana anterior` : 'semana atual'}</div></div>
    <div class="card"><div class="mono up">Água hoje</div><div class="num">${agua}</div><div class="muted">/ ${S.profile.meta_agua || 4000} ml</div></div>
  </div>
  <div class="grid g2" style="margin-top:16px">
    <div class="card"><div class="row"><h3>Taxa de acerto</h3><span class="sp"></span>
      <div class="row" id="visoes"><button class="btn mini" data-v="hoje">Hoje</button><button class="btn mini sec" data-v="semana">Semana</button><button class="btn mini sec" data-v="30">30 dias</button></div></div>
      <div id="grafico" style="margin-top:14px"></div>
      <div class="mono" style="margin-top:8px">Linha tracejada: meta de 70%. Verde: 70% ou mais. Vermelho: abaixo.</div></div>
    <div class="card"><h3>Tarefas de hoje</h3>${tarefasHoje.length ? tarefasHoje.map((t) => `<div class="check"><span>${t.concluido ? '✅' : '⬜'}</span><span><b>${esc(t.materia)}</b> — ${esc(t.topico)}</span></div>`).join('') : '<p class="muted">Sem tarefas para hoje.</p>'}
      <a class="btn sec mini" href="#/calendario" style="margin-top:8px">Abrir o dia →</a></div>
  </div>
  <div class="card" style="margin-top:16px"><h3>Desempenho por matéria</h3><div id="pormat"></div></div>`;

  const relogio = () => { const d = new Date(); const s = [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':'); const r = document.getElementById('relogio'); if (!r) return clearInterval(timer); r.innerHTML = flipHTML(s); };
  relogio(); timer = setInterval(relogio, 1000);
  const frase = () => { el.querySelector('#frase').textContent = '“' + FRASES[fi][0] + '”'; el.querySelector('#autor').textContent = FRASES[fi][1].toUpperCase(); };
  frase();
  el.querySelector('#outra').onclick = () => { fi = (fi + 1 + Math.floor(Math.random() * (FRASES.length - 1))) % FRASES.length; frase(); };
  el.querySelector('#tema').onclick = () => { alternaTema(); recarregar(); };
  const dp = el.querySelector('#dp');
  if (dp) dp.onchange = async () => { try { await db.update('editais', { id: 'eq.' + ed.id }, { data_prova: dp.value || null }); ed.data_prova = dp.value || null; render(el); } catch (e) { toast(e.message, 'erro'); } };

  const topById = new Map(S.topicos.map((t) => [t.id, t]));
  const grafico = (v) => {
    el.querySelectorAll('#visoes button').forEach((b) => b.classList.toggle('sec', b.dataset.v !== v));
    let cols = [];
    if (v === 'hoje') {
      const m = new Map();
      for (const l of S.logs.filter((l) => l.data === iso(h))) { const k = topById.get(l.topico_id)?.materia || 'Outros'; const a = m.get(k) || [0, 0]; a[0] += l.feitas; a[1] += l.acertos; m.set(k, a); }
      cols = [...m].map(([k, [f, a]]) => [k, pct(a, f), `${a}/${f}`]);
    } else {
      const n = v === 'semana' ? 7 : 30;
      for (let i = n - 1; i >= 0; i--) { const d = iso(addDias(h, -i)); const ls = S.logs.filter((l) => l.data === d); const [f, a] = soma(ls); cols.push([d.slice(8) + '/' + d.slice(5, 7), f ? pct(a, f) : null, `${a}/${f}`]); }
    }
    const g = el.querySelector('#grafico');
    if (!cols.some((c) => c[1] != null)) { g.innerHTML = '<p class="muted">Nenhuma questão registrada neste período.</p>'; return; }
    g.innerHTML = `<div class="chart"><div class="meta" style="bottom:70%"></div>${cols.map(([lab, p, det]) => `<div class="col" title="${esc(lab)}: ${det}">${p != null ? `<div class="b ${corPct(p)}" style="height:${Math.max(p, 2)}%"><span class="v ${corPct(p)}">${p}%</span></div>` : ''}</div>`).join('')}</div>
      <div class="chart-labs">${cols.map(([lab]) => `<div class="lab">${esc(lab)}</div>`).join('')}</div>`;
  };
  el.querySelectorAll('#visoes button').forEach((b) => (b.onclick = () => grafico(b.dataset.v)));
  grafico('hoje');

  const mats = new Map();
  for (const l of S.logs) { const k = topById.get(l.topico_id)?.materia || 'Outros'; const a = mats.get(k) || [0, 0]; a[0] += l.feitas; a[1] += l.acertos; mats.set(k, a); }
  el.querySelector('#pormat').innerHTML = [...mats].sort((a, b) => b[1][0] - a[1][0]).map(([k, [f, a]]) => { const p = pct(a, f); return `<div style="margin:10px 0"><div class="row"><span>${esc(k)}</span><span class="sp"></span><span class="${corPct(p)}"><b>${p}%</b></span><span class="muted">${a}/${f}</span></div><div class="bar"><div class="bar-in" style="width:${p}%;background:${p >= 70 ? 'var(--verde)' : p >= 60 ? '#F59E0B' : 'var(--vermelho)'}"></div></div></div>`; }).join('') || '<p class="muted">Sem questões ainda.</p>';
}
