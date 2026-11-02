import { S, topicosValidos, atualizarTopico, carregarTudo } from '../state.js';
import { db } from '../backend.js';
import { esc, hoje, iso, addDias, parseISO, pct, corPct, norm, segundaDa } from '../util.js';
import { barra, toast, modal } from '../ui.js';
import { formExterno } from './calendario.js';
import { recarregar } from '../app.js';
import { ajustarDatas, finalizarCronograma, importarEdital } from './edital-ferramentas.js';

let periodo = { tipo: 'total', de: null, ate: null };
let soPendentes = false;

export async function render(el) {
  const ed = S.edital;
  if (!ed) {
    el.innerHTML = `<h1>Edital</h1><div class="card"><p>Você ainda não tem um edital ativo.</p><div class="row"><button class="btn" id="anexo">📎 Anexar edital (cronograma automático)</button><button class="btn sec" id="novo">+ Novo edital em branco</button></div></div>`;
    el.querySelector('#novo').onclick = () => novoEdital();
    el.querySelector('#anexo').onclick = () => importarEdital(() => recarregar());
    return;
  }
  const h = hoje();
  const intervalo = () => {
    if (periodo.tipo === 'dia') return [iso(h), iso(h)];
    if (periodo.tipo === 'semana') return [iso(segundaDa(h)), iso(h)];
    if (periodo.tipo === 'mes') return [iso(addDias(h, -30)), iso(h)];
    if (periodo.tipo === 'periodo' && periodo.de && periodo.ate) return periodo.de <= periodo.ate ? [periodo.de, periodo.ate] : [periodo.ate, periodo.de];
    return null;
  };
  const iv = intervalo();
  const logs = iv ? S.logs.filter((l) => l.data >= iv[0] && l.data <= iv[1]) : S.logs;
  const tot = logs.reduce((a, l) => { a.f += l.feitas; a.a += l.acertos; a[l.origem === 'app' ? 'app' : 'ext'][0] += l.feitas; a[l.origem === 'app' ? 'app' : 'ext'][1] += l.acertos; return a; }, { f: 0, a: 0, app: [0, 0], ext: [0, 0] });
  const porTop = new Map();
  for (const l of logs) { const a = porTop.get(l.topico_id) || [0, 0]; a[0] += l.feitas; a[1] += l.acertos; porTop.set(l.topico_id, a); }
  const validos = topicosValidos();
  const fora = S.topicos.filter((t) => t.fora_do_edital);
  const comQ = new Set(S.logs.map((l) => l.topico_id));
  const prog = pct(validos.filter((t) => comQ.has(t.id)).length, validos.length) ?? 0;
  const mats = new Map();
  for (const t of validos) { if (!mats.has(t.materia)) mats.set(t.materia, []); mats.get(t.materia).push(t); }
  const ap = pct(tot.a, tot.f);
  const fmtD = (s) => s ? s.split('-').reverse().join('/') : '';

  el.innerHTML = `
  <div class="topo"><div><div class="mono up">Edital verticalizado</div><h1>${esc(ed.concurso)}</h1><div class="muted">${esc([ed.cargo, ed.banca, ed.formato === 'multipla_escolha' ? 'múltipla escolha' : 'certo/errado'].filter(Boolean).join(' · '))}</div></div>
    <div class="row"><button class="btn" id="anexo">📎 Anexar edital</button><button class="btn sec" id="novo">+ Novo edital</button><button class="btn sec" id="addTop">+ Tópico</button><button class="btn sec" id="datas">📅 Ajustar datas</button><button class="btn sec" id="finaliza">🏁 Finalizar cronograma</button></div></div>
  <div class="grid g2">
    <div class="card"><div class="mono up">Progresso geral</div><div class="num">${prog}%</div>${barra(prog)}<div class="muted" style="margin-top:6px">${validos.filter((t) => comQ.has(t.id)).length} de ${validos.length} tópicos praticados · ${validos.filter((t) => t.concluido).length} finalizados</div></div>
    <div class="card"><div class="row"><div class="mono up">Análise de questões</div><span class="sp"></span>
      <select id="per">${[['total', 'Total'], ['dia', 'Hoje'], ['semana', 'Semana'], ['mes', 'Último mês'], ['periodo', 'Período personalizado']].map(([v, n]) => `<option value="${v}" ${periodo.tipo === v ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
      ${periodo.tipo === 'periodo' ? `<div class="row" style="margin-top:8px"><input type="date" id="de" value="${esc(periodo.de || '')}"> a <input type="date" id="ate" value="${esc(periodo.ate || '')}"></div>
        <div class="row" style="margin-top:6px">${[['estasem', 'Esta semana'], ['semant', 'Semana passada'], ['estemes', 'Este mês'], ['mesant', 'Mês passado']].map(([k, n]) => `<button class="btn mini sec" data-at="${k}">${n}</button>`).join('')}</div>` : ''}
      ${iv && periodo.tipo === 'periodo' ? `<div class="row" style="margin-top:6px"><span class="pill">Período: ${fmtD(iv[0])} a ${fmtD(iv[1])}</span><button class="linkbtn" id="limpa">Limpar</button></div>` : ''}
      <div class="grid g4" style="margin-top:10px;grid-template-columns:repeat(4,1fr)">
        <div><div class="muted">Resolvidas</div><div class="num">${tot.f}</div></div><div><div class="muted">Acertos</div><div class="num ok">${tot.a}</div></div>
        <div><div class="muted">Erros</div><div class="num bad">${tot.f - tot.a}</div></div><div><div class="muted">Aproveit.</div><div class="num ${corPct(ap)}">${ap ?? '—'}${ap != null ? '%' : ''}</div></div></div>
      <div class="mono" style="margin-top:6px">No app: ${tot.app[0]} questões · ${tot.app[1]} acertos — Fora do app: ${tot.ext[0]} questões · ${tot.ext[1]} acertos</div></div>
  </div>
  <div class="row" style="margin:18px 0 8px"><h2 style="margin:0">Matérias do edital</h2><span class="sp"></span><label class="check" style="margin:0"><input type="checkbox" id="pend" ${soPendentes ? 'checked' : ''}> Só não finalizados</label></div>
  ${[...mats].map(([m, ts]) => { const vis = soPendentes ? ts.filter((t) => !t.concluido) : ts; const pr = ts.filter((t) => comQ.has(t.id)).length;
    return `<details class="mat"><summary><b style="font-family:var(--serif);font-size:1.1rem">${esc(m)}</b><span class="muted">(${ts.length})</span><span class="sp"></span><span class="pill">${pr}/${ts.length}</span></summary>
      ${vis.map((t) => { const [f, a] = porTop.get(t.id) || [0, 0]; const p = pct(a, f);
        return `<div class="top"><input type="checkbox" data-c="${t.id}" ${t.concluido ? 'checked' : ''} title="Tópico finalizado">
          <div>${esc(t.topico)}<div class="row" style="margin-top:6px"><button class="linkbtn" data-ext="${t.id}">Registrar fora do app</button></div></div>
          <div class="nums">${f ? `<b class="${corPct(p)}">${p}%</b><br><span class="muted">${a}/${f}</span>` : `<span class="muted">${iv ? 'sem questões no período' : '—'}</span>`}</div></div>`; }).join('')}
    </details>`; }).join('')}
  ${fora.length ? `<details class="mat"><summary><b>Fora do edital (histórico)</b><span class="muted">— ${fora.length} tópicos</span></summary>${fora.map((t) => { const [f, a] = porTop.get(t.id) || [0, 0]; return `<div class="top"><span></span><div><span class="muted">${esc(t.materia)}</span><br>${esc(t.topico)}</div><div class="nums">${f} questões · ${a} acertos</div></div>`; }).join('')}</details>` : ''}`;

  el.querySelector('#per').onchange = (e) => { periodo = { tipo: e.target.value, de: periodo.de, ate: periodo.ate }; render(el); };
  const de = el.querySelector('#de'), ate = el.querySelector('#ate');
  if (de) de.onchange = () => { periodo.de = de.value; render(el); };
  if (ate) ate.onchange = () => { periodo.ate = ate.value; render(el); };
  el.querySelectorAll('[data-at]').forEach((b) => (b.onclick = () => {
    const s = segundaDa(h), m0 = new Date(h.getFullYear(), h.getMonth(), 1);
    const r = { estasem: [s, h], semant: [addDias(s, -7), addDias(s, -1)], estemes: [m0, h], mesant: [new Date(h.getFullYear(), h.getMonth() - 1, 1), addDias(m0, -1)] }[b.dataset.at];
    periodo = { tipo: 'periodo', de: iso(r[0]), ate: iso(r[1]) }; render(el);
  }));
  const lp = el.querySelector('#limpa'); if (lp) lp.onclick = () => { periodo = { tipo: 'total' }; render(el); };
  el.querySelector('#pend').onchange = (e) => { soPendentes = e.target.checked; render(el); };
  el.querySelectorAll('[data-c]').forEach((c) => (c.onchange = async () => { try { await atualizarTopico(c.dataset.c, { concluido: c.checked }); } catch (e) { toast(e.message, 'erro'); } }));
  el.querySelectorAll('[data-ext]').forEach((b) => (b.onclick = () => formExterno(S.topicos.find((t) => t.id === b.dataset.ext), () => render(el))));
  el.querySelector('#novo').onclick = () => novoEdital();
  el.querySelector('#anexo').onclick = () => importarEdital(() => recarregar());
  el.querySelector('#datas').onclick = () => ajustarDatas(ed, () => render(el));
  el.querySelector('#finaliza').onclick = () => finalizarCronograma(ed, () => recarregar());
  el.querySelector('#addTop').onclick = () => modal(`<h3>Novo tópico</h3><div class="campo"><label>Matéria</label><input id="m" list="ml" style="width:100%"><datalist id="ml">${[...mats.keys()].map((m) => `<option value="${esc(m)}">`).join('')}</datalist></div><div class="campo"><label>Tópico</label><textarea id="t"></textarea></div><button class="btn" id="ok">Adicionar</button>`, {
    onMount: (m, close) => (m.querySelector('#ok').onclick = async () => {
      try { const [t] = await db.insert('topicos', [{ user_id: S.user.id, edital_id: ed.id, materia: m.querySelector('#m').value.trim(), topico: m.querySelector('#t').value.trim(), ordem: S.topicos.length }]); S.topicos.push(t); close(); render(el); } catch (e) { toast(e.message, 'erro'); }
    }),
  });
}

function novoEdital() {
  if (S.editais.filter((e) => e.ativo !== false).length >= 3) { toast('Você já tem 3 editais ativos. Arquive um no Perfil.', 'erro'); return; }
  modal(`<h3>Novo edital</h3>
    <div class="campo"><label>Concurso</label><input id="c" placeholder="Ex.: PCMG 2026" style="width:100%"></div>
    <div class="campo"><label>Cargo</label><input id="cg" style="width:100%"></div>
    <div class="row"><div class="campo"><label>Banca</label><input id="b"></div><div class="campo"><label>Formato</label><select id="f"><option value="certo_errado">Certo/Errado</option><option value="multipla_escolha">Múltipla escolha</option></select></div></div>
    <div class="row"><div class="campo"><label>Início do plano (segunda-feira)</label><input type="date" id="i" value="${iso(segundaDa(hoje()))}"></div><div class="campo"><label>Data da prova</label><input type="date" id="p"></div></div>
    <button class="btn" id="ok">Criar</button>`, {
    onMount: (m, close) => (m.querySelector('#ok').onclick = async () => {
      const v = (s) => m.querySelector(s).value.trim();
      if (!v('#c')) return toast('Informe o concurso.', 'erro');
      try {
        const [e] = await db.insert('editais', [{ user_id: S.user.id, concurso: v('#c'), cargo: v('#cg') || null, banca: v('#b') || null, formato: v('#f'), data_inicio: v('#i') || null, data_prova: v('#p') || null }]);
        await db.update('profiles', { id: 'eq.' + S.user.id }, { edital_atual: e.id });
        close(); await carregarTudo(); recarregar();
      } catch (er) { toast(er.message, 'erro'); }
    }),
  });
}
