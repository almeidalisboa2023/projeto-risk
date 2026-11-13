import { S, topicosValidos } from '../state.js';
import { db } from '../backend.js';
import { esc, hoje, iso, parseISO, addDias, dataExtenso, pct, corPct, FRASES, semanaDe, DIAS, idxDia, segundaDa, ddmm } from '../util.js';
import { flipHTML, barra, toast, modal } from '../ui.js';
import { tema, alternaTema, recarregar } from '../app.js';
import { sugestoes, escolherDia, dataTarefa } from '../revisoes.js';
import { atrasados } from './replanejar.js';
import { fmtMin } from '../crono.js';
import { contarFlash } from '../questao.js';
import { caixaAvisos } from '../avisos.js';

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
  const prova = parseISO(ed?.data_prova);
  const faltam = prova ? Math.max(0, Math.round((prova - h) / 864e5)) : null;
  let fi = Math.floor(Math.random() * FRASES.length);

  const semanaAtual = ed ? semanaDe(ed.data_inicio, h) : null;
  const meta = S.profile.meta_questoes || 30;
  const qHoje = S.logs.filter((l) => l.data === iso(h)).reduce((s, l) => s + l.feitas, 0);
  const ativ = new Set([...S.logs.filter((l) => l.feitas > 0).map((l) => l.data), ...S.tarefas.filter((t) => t.concluido && t.concluido_em).map((t) => String(t.concluido_em).slice(0, 10))]);
  let seq = 0; for (let d = ativ.has(iso(h)) ? h : addDias(h, -1); ativ.has(iso(d)); d = addDias(d, -1)) seq++;
  const minEntre = (a, b) => S.sessoes.filter((s) => s.data >= iso(a) && s.data <= iso(b)).reduce((x, s) => x + s.minutos, 0);
  const minSem = minEntre(seg, addDias(seg, 6));
  const minHoje = minEntre(h, h);
  const minTotal = S.sessoes.reduce((x, s) => x + s.minutos, 0);
  const restantes = validos.filter((t) => !t.concluido).length;
  const semRest = faltam != null ? Math.max(1, Math.ceil(faltam / 7)) : null;
  const teoria4 = ed ? S.tarefas.filter((t) => t.concluido && t.semana < semanaAtual && t.semana >= semanaAtual - 4 && !/^revis/i.test(t.topico)).length / 4 : 0;
  const precisa = semRest ? Math.ceil(restantes / semRest) : null;
  const ritmo = precisa == null ? `<div class="num">${restantes}</div><div class="muted">tópicos pendentes · defina a data da prova para calcular o ritmo</div>`
    : `<div class="num ${teoria4 >= precisa ? 'ok' : 'bad'}">${precisa}<span class="muted" style="font-size:1rem"> tópicos/semana</span></div><div class="muted">${restantes} pendentes em ${semRest} semanas · seu ritmo recente: ${teoria4.toFixed(1)} blocos de teoria/semana</div>`;
  const sug = ed ? sugestoes(15) : [];
  const tarefasHoje = ed ? S.tarefas.filter((t) => t.semana === semanaAtual && t.dia === DIAS[idxDia(h)]) : [];

  el.innerHTML = `
  <div class="topo">
    <span class="pill">${esc(ed ? ed.concurso : 'Sem edital')} · plano de estudos</span>
    <div class="row">
      ${ed ? `<span class="pill ouro" id="faltam">${faltam != null ? `Faltam <b>${faltam}</b> dias para a prova` : 'Defina a data da prova'}</span><input type="date" id="dp" value="${esc(ed.data_prova || '')}" min="${iso(h)}" max="2100-12-31" aria-label="Data da prova"><button class="btn sec mini" id="dpOk">Salvar data</button>` : ''}
      <button class="btn" id="tema">${tema() === 'dark' ? '☀ Modo claro' : '☾ Modo noturno'}</button>
    </div>
  </div>
  <div id="avisosBox" style="margin-bottom:16px"></div>
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
  <div class="card" style="margin-top:16px" id="cronoSem"></div>
  <div class="grid g4" style="margin-top:16px">
    <div class="card"><div class="mono up">Progresso do edital</div><div class="num">${pct(praticados, validos.length) ?? 0}%</div><div class="muted">${praticados} de ${validos.length} tópicos praticados</div></div>
    <div class="card"><div class="mono up">Questões na semana</div><div class="num">${fs}</div><div class="muted">${as} acertos</div></div>
    <div class="card"><div class="mono up">Tempo de estudo total</div><div class="num">${fmtMin(minTotal)}</div><a class="muted" href="#/horas">desde o início · por matéria →</a></div>
    <div class="card"><div class="mono up">Taxa de acerto</div><div class="num ${corPct(tx)}">${tx ?? '—'}${tx != null ? '%' : ''}</div><div class="muted">${tx != null && txa != null ? `${tx - txa >= 0 ? '+' : ''}${tx - txa} pp vs semana anterior` : 'semana atual'}</div></div>
    <div class="card"><div class="mono up">Flashcards feitos</div><div class="num" id="pFlash">…</div><a class="muted" id="pFlashSub" href="#/leitura">desde o início · na leitura →</a></div>
  </div>
  <div class="grid g4" style="margin-top:16px">
    <div class="card"><div class="mono up">Meta de hoje</div><div class="num">${qHoje}<span class="muted" style="font-size:1rem"> / ${meta}</span></div>${barra(Math.min(100, pct(qHoje, meta) || 0))}<div class="muted" style="margin-top:6px">${qHoje >= meta ? 'Meta batida! 🎯' : `Faltam ${meta - qHoje} questões`}</div></div>
    <div class="card"><div class="mono up">Sequência</div><div class="num"><span class="fogo">🔥</span> ${seq} ${seq === 1 ? 'dia' : 'dias'}</div><div class="muted">${seq ? 'estudando sem parar' : 'registre algo hoje para começar'}</div></div>
    <div class="card"><div class="mono up">Tempo de estudo hoje</div><div class="num">${fmtMin(minHoje)}</div><div class="muted">${fmtMin(minSem)} nesta semana</div></div>
    <div class="card"><div class="mono up">Ritmo até a prova</div>${ritmo}</div>
  </div>
  <div class="grid g2" style="margin-top:16px">
    <div class="card"><div class="row"><h3>Revisões sugeridas</h3><span class="sp"></span>${sug.length > 5 ? '<button class="btn sec mini" id="todasSug">Ver todas</button>' : ''}</div>
      <p class="muted" style="font-size:13px;margin-top:0">Assuntos com acerto baixo, poucas questões ou muito tempo sem revisar.</p>
      <div id="sug">${sugHTML(sug.slice(0, 5))}</div></div>
    <div class="card"><div class="row"><h3>Resumo da semana</h3><span class="sp"></span><div class="abas" id="rs"><button class="on" data-s="0">Esta</button><button data-s="-1">Passada</button></div></div><div id="resumo"></div></div>
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
  caixaAvisos(el.querySelector('#avisosBox')).catch(() => {});
  contarFlash().then((r) => { const n = el.querySelector('#pFlash'); if (!n) return; if (!r) { n.textContent = '—'; return; } n.textContent = r.cartoes; el.querySelector('#pFlashSub').textContent = `${r.viradas} viradas no total · ir para a leitura →`; });

  const ligaSug = (box) => box.querySelectorAll('[data-ag]').forEach((b) => (b.onclick = () => escolherDia(sug.find((x) => x.tp.id === b.dataset.ag).tp, () => render(el))));
  ligaSug(el.querySelector('#sug'));
  const todas = el.querySelector('#todasSug');
  if (todas) todas.onclick = () => { const close = modal(`<h3>Revisões sugeridas</h3>${sugHTML(sug)}`, { largo: true, onMount: (m, fecha) => m.querySelectorAll('[data-ag]').forEach((b) => (b.onclick = () => { fecha(); escolherDia(sug.find((x) => x.tp.id === b.dataset.ag).tp, () => render(el)); })) }); };
  const resumo = (desl) => {
    el.querySelectorAll('#rs button').forEach((b) => b.classList.toggle('on', Number(b.dataset.s) === desl));
    const box = el.querySelector('#resumo');
    if (!ed) { box.innerHTML = '<p class="muted">Sem edital.</p>'; return; }
    const sem = semanaAtual + desl, ini = addDias(seg, 7 * desl);
    const ts = S.tarefas.filter((t) => t.semana === sem), fe = ts.filter((t) => t.concluido).length;
    const lg = S.logs.filter((l) => naSemana(l, ini)); const [f, a] = soma(lg);
    const mats = new Map(); for (const l of lg) { const k = topById.get(l.topico_id)?.materia || l.materia || 'Outros'; const x = mats.get(k) || [0, 0]; x[0] += l.feitas; x[1] += l.acertos; mats.set(k, x); }
    const ord = [...mats].filter(([, x]) => x[0] >= 5).map(([k, x]) => [k, pct(x[1], x[0])]).sort((p, q) => q[1] - p[1]);
    const atr = ts.filter((t) => !t.concluido && iso(dataTarefa(t)) < iso(h)).length;
    const min = minEntre(ini, addDias(ini, 6));
    const dica = !ts.length ? 'Semana sem blocos montados. Use "+ Incluir semana" no Calendário.'
      : atr ? `Você tem ${atr} bloco(s) atrasado(s) nesta semana. Use "Corrigir atrasos" no Calendário.`
      : ord.length && ord[ord.length - 1][1] < 70 ? `Reforce ${ord[ord.length - 1][0]} (${ord[ord.length - 1][1]}% de acerto).`
      : fe === ts.length ? 'Semana cumprida. Excelente!' : 'Siga o plano dos próximos dias.';
    box.innerHTML = `<div class="grid" style="grid-template-columns:repeat(2,1fr);gap:10px">
      <div><div class="mono up">Blocos</div><b>${fe}/${ts.length}</b> ${barra(pct(fe, ts.length) || 0)}</div>
      <div><div class="mono up">Questões</div><b>${f}</b> <span class="${corPct(pct(a, f))}">${f ? pct(a, f) + '%' : ''}</span></div>
      <div><div class="mono up">Tempo</div><b>${fmtMin(min)}</b></div>
      <div><div class="mono up">Atrasados</div><b class="${atr ? 'bad' : ''}">${atr}</b></div></div>
      ${ord.length ? `<div style="margin-top:10px;font-size:14px">Melhor: <b class="ok">${esc(ord[0][0])} ${ord[0][1]}%</b>${ord.length > 1 ? ` · Pior: <b class="${corPct(ord[ord.length - 1][1])}">${esc(ord[ord.length - 1][0])} ${ord[ord.length - 1][1]}%</b>` : ''}</div>` : ''}
      <div class="pill ouro" style="margin-top:10px;white-space:normal">💡 ${esc(dica)}</div>`;
  };
  el.querySelectorAll('#rs button').forEach((b) => (b.onclick = () => resumo(Number(b.dataset.s))));
  calendarioCrono(el.querySelector('#cronoSem'), 0);
  const relogio = () => { const d = new Date(); const s = [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':'); const r = document.getElementById('relogio'); if (!r) return clearInterval(timer); r.innerHTML = flipHTML(s); };
  relogio(); timer = setInterval(relogio, 1000);
  const frase = () => { el.querySelector('#frase').textContent = '“' + FRASES[fi][0] + '”'; el.querySelector('#autor').textContent = FRASES[fi][1].toUpperCase(); };
  frase();
  el.querySelector('#outra').onclick = () => { fi = (fi + 1 + Math.floor(Math.random() * (FRASES.length - 1))) % FRASES.length; frase(); };
  el.querySelector('#tema').onclick = () => { alternaTema(); recarregar(); };
  const dp = el.querySelector('#dp');
  if (dp) {
    // Só aceita uma data completa e futura (o campo de data dispara eventos enquanto se digita o ano)
    const valida = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) && Number(v.slice(0, 4)) >= h.getFullYear() && Number(v.slice(0, 4)) <= 2100 && parseISO(v) >= h;
    const atualiza = () => { const v = dp.value; el.querySelector('#faltam').innerHTML = valida(v) ? `Faltam <b>${Math.round((parseISO(v) - h) / 864e5)}</b> dias para a prova` : v ? 'Data inválida' : 'Defina a data da prova'; };
    dp.oninput = atualiza;
    const salva = async () => {
      const v = dp.value || null;
      if (v && !valida(v)) return toast('Escolha uma data futura completa (dia, mês e ano).', 'erro');
      try { await db.update('editais', { id: 'eq.' + ed.id }, { data_prova: v }); ed.data_prova = v; const e2 = S.editais.find((x) => x.id === ed.id); if (e2) e2.data_prova = v; toast(v ? 'Data da prova salva!' : 'Data removida.'); render(el); } catch (e) { toast(e.message, 'erro'); }
    };
    el.querySelector('#dpOk').onclick = salva;
    dp.onkeydown = (e) => { if (e.key === 'Enter') salva(); };
  }

  const topById = new Map(S.topicos.map((t) => [t.id, t]));
  const grafico = (v) => {
    el.querySelectorAll('#visoes button').forEach((b) => b.classList.toggle('sec', b.dataset.v !== v));
    let cols = [];
    if (v === 'hoje') {
      const m = new Map();
      for (const l of S.logs.filter((l) => l.data === iso(h))) { const k = topById.get(l.topico_id)?.materia || l.materia || 'Outros'; const a = m.get(k) || [0, 0]; a[0] += l.feitas; a[1] += l.acertos; m.set(k, a); }
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
  resumo(0);

  const mats = new Map();
  for (const l of S.logs) { const k = topById.get(l.topico_id)?.materia || l.materia || 'Outros'; const a = mats.get(k) || [0, 0]; a[0] += l.feitas; a[1] += l.acertos; mats.set(k, a); }
  el.querySelector('#pormat').innerHTML = [...mats].sort((a, b) => b[1][0] - a[1][0]).map(([k, [f, a]]) => { const p = pct(a, f); return `<div style="margin:10px 0"><div class="row"><span>${esc(k)}</span><span class="sp"></span><span class="${corPct(p)}"><b>${p}%</b></span><span class="muted">${a}/${f}</span></div><div class="bar"><div class="bar-in" style="width:${p}%;background:${p >= 70 ? 'var(--verde)' : p >= 60 ? '#F59E0B' : 'var(--vermelho)'}"></div></div></div>`; }).join('') || '<p class="muted">Sem questões ainda.</p>';
}

function sugHTML(lista) {
  if (!lista.length) return '<p class="muted">Nenhuma revisão urgente agora. Continue registrando suas questões para o site analisar seus pontos fracos.</p>';
  return lista.map((s) => `<div class="sug"><div><b>${esc(s.tp.materia)}</b> — ${esc(s.tp.topico.length > 90 ? s.tp.topico.slice(0, 90) + '…' : s.tp.topico)}<div class="mot">${esc(s.motivo)}</div></div>
    <div class="row" style="gap:6px"><button class="btn mini" data-ag="${s.tp.id}">Agendar revisão</button></div></div>`).join('');
}

// Calendário do cronômetro: horas estudadas em cada dia da semana
let semCrono = 0;
function calendarioCrono(box, desl) {
  if (desl != null) semCrono = desl;
  const h = hoje(), seg = addDias(segundaDa(h), 7 * semCrono);
  const por = new Map(); for (const s of S.sessoes) por.set(s.data, (por.get(s.data) || 0) + s.minutos);
  const dias = Array.from({ length: 7 }, (_, i) => { const d = addDias(seg, i); return [d, por.get(iso(d)) || 0]; });
  const tot = dias.reduce((x, [, m]) => x + m, 0), max = Math.max(60, ...dias.map(([, m]) => m));
  const melhor = dias.reduce((a, b) => (b[1] > a[1] ? b : a));
  const fmtH = (m) => `${Math.floor(m / 60)}h${String(Math.round(m % 60)).padStart(2, '0')}`;
  box.innerHTML = `<div class="row"><h3 style="margin:0">⏱ Calendário do cronômetro</h3><span class="sp"></span>
      <button class="btn sec mini" data-cs="-1">‹</button><button class="btn sec mini" data-cs="0">Esta semana</button><button class="btn sec mini" data-cs="1">›</button></div>
    <div class="muted" style="font-size:13px;margin:4px 0 12px">${ddmm(seg)} a ${ddmm(addDias(seg, 6))} · total <b>${fmtH(tot)}</b> · média <b>${fmtH(tot / 7)}</b> por dia${melhor[1] ? ` · melhor dia: ${DIAS_C[idxDia(melhor[0])]} (${fmtH(melhor[1])})` : ''}</div>
    <div class="crono-sem">${dias.map(([d, m]) => `<div class="cs-dia ${iso(d) === iso(h) ? 'hoje' : ''} ${iso(d) > iso(h) ? 'futuro' : ''}">
        <div class="cs-barra"><div style="height:${m ? Math.max(6, Math.round((m / max) * 100)) : 0}%"></div></div>
        <b>${m ? fmtH(m) : '—'}</b><span>${DIAS_C[idxDia(d)]} ${ddmm(d)}</span></div>`).join('')}</div>
    <div class="row" style="margin-top:10px"><a class="btn sec mini" href="#/horas">Abrir Horas de estudo</a><span class="muted" style="font-size:12.5px">Use o cronômetro dos blocos ou lance horas manualmente.</span></div>`;
  box.querySelectorAll('[data-cs]').forEach((b) => (b.onclick = () => calendarioCrono(box, b.dataset.cs === '0' ? 0 : semCrono + Number(b.dataset.cs))));
}
const DIAS_C = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
