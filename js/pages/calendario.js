import { S, atualizarTarefa, atualizarTopico, registrarExterno } from '../state.js';
import { db, functions } from '../backend.js';
import { esc, hoje, iso, addDias, ddmm, DIAS, DIAS_CURTO, idxDia, semanaDe, inicioSemana, separaCodigo, tipoBloco, norm, pct, dataExtenso } from '../util.js';
import { leiSecaHTML, toast, modal, barra } from '../ui.js';
import { resolverSequencia } from '../quiz.js';
import { adicionarBloco, editarBloco, gerarSemana, incluirSemana } from './montar-semana.js';
import { corrigirAtrasos, atrasados } from './replanejar.js';
import { revisoesEspacadas, dataTarefa } from '../revisoes.js';
import * as crono from '../crono.js';
import { TEMAS, temaAtual, progressoHTML } from '../temas.js';
import { topicosValidos } from '../state.js';

let semanaSel = null, diaSel = null, visao = 'semana', mesSel = null, edSel = null;

export async function render(el) {
  const ed = S.edital;
  if (!ed) { el.innerHTML = '<div class="card"><h2>Sem edital</h2><p>Peça ao administrador para importar seu edital ou crie um na aba Edital.</p></div>'; return; }
  const h = hoje();
  const semAtual = semanaDe(ed.data_inicio, h);
  if (edSel !== ed.id + ed.data_inicio) { edSel = ed.id + ed.data_inicio; semanaSel = null; }
  if (semanaSel == null) { semanaSel = semAtual; diaSel = idxDia(h); }
  if (visao === 'mes') return renderMes(el, (s, d) => { semanaSel = s; diaSel = d; visao = 'semana'; render(el); }, () => { visao = 'semana'; render(el); });
  const nAtr = atrasados().length;
  const ini = inicioSemana(ed.data_inicio, semanaSel);
  const daSemana = S.tarefas.filter((t) => t.semana === semanaSel);
  const doDia = (i) => daSemana.filter((t) => t.dia === DIAS[i]).sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
  const tarefas = doDia(diaSel);
  const feitos = tarefas.filter((t) => t.concluido).length;
  const dataSel = addDias(ini, diaSel);
  const estado = !tarefas.length ? 'Sem blocos' : feitos === 0 ? 'Nenhum bloco ainda' : feitos === tarefas.length ? 'Dia concluído' : 'Em andamento';
  const semanas = [...new Set(S.tarefas.map((t) => t.semana))].sort((a, b) => a - b);
  const temaId = temaAtual(), T = temaId !== 'padrao' ? TEMAS[temaId] : null;
  const validos = topicosValidos(); const pctEd = pct(validos.filter((x) => x.concluido).length, validos.length) || 0;
  const semFeitos = daSemana.filter((x) => x.concluido).length;

  el.innerHTML = `
    <div class="row" style="margin-bottom:6px"><div class="abas"><button class="on">Semana</button><button id="vmes">Mês</button></div><span class="sp"></span>
      <button class="btn ${nAtr ? 'vermelho' : 'sec'} mini" id="atr">${nAtr ? `Corrigir atrasos (${nAtr})` : 'Reorganizar calendário'}</button></div>
    <div class="mono up">${esc(dataExtenso(dataSel))} · Semana ${semanaSel}${semanaSel === semAtual ? ' (atual)' : ''}</div>
    <h1>${iso(dataSel) === iso(h) ? 'Hoje' : esc(DIAS[diaSel])}${T && iso(dataSel) === iso(h) ? ` <span class="tema-hoje">${T.hoje}</span>` : ''}</h1>
    <div class="card">
      <div class="row">
        <div style="min-width:220px;flex:1"><div class="row"><b>${feitos} de ${tarefas.length} blocos</b><span class="pill ${estado === 'Dia concluído' ? 'verde' : ''}">${estado}</span></div>${barra(pct(feitos, tarefas.length))}</div>
        <div class="row"><button class="btn mini" id="incluir">+ Incluir semana</button><button class="btn sec mini" id="ant">‹ Anterior</button><button class="btn sec mini" id="esta">Esta semana</button><button class="btn sec mini" id="prox">Próxima ›</button></div>
      </div>
      <div class="dias" style="margin-top:12px">${DIAS_CURTO.map((d, i) => { const ts = doDia(i); const ok = ts.length && ts.every((t) => t.concluido); const parc = ts.some((t) => t.concluido); const di = addDias(ini, i);
        return `<button class="dia ${i === diaSel ? 'sel' : ''} ${iso(di) === iso(h) ? 'hoje' : ''}" data-d="${i}">${d}<small>${ddmm(di)}</small><div class="pt ${ok ? 'feito' : parc ? 'parcial' : ''}"></div></button>`; }).join('')}</div>
      ${!daSemana.length ? `<div class="hero" style="margin-top:12px;padding:18px"><b>A semana ${semanaSel} ainda não tem blocos.</b><div class="muted" style="margin:4px 0 10px">${semanas.length ? `Semanas montadas: ${semanas[0]} a ${semanas[semanas.length - 1]}.` : 'Monte seu primeiro calendário.'}</div><button class="btn" data-i="1">+ Incluir esta semana (manual ou automático)</button></div>` : ''}
    </div>
    <div id="blocos"></div>
    <div class="row" style="margin-top:16px"><button class="btn sec" id="add">+ Adicionar matéria ao calendário</button><button class="btn sec" id="semana">Ver semana inteira</button>${daSemana.length ? `<button class="btn sec" data-g="1">Completar semana automaticamente</button>` : ''}</div>`;
  if (T) {
    // envolve tudo no tema e coloca o cabeçalho temático
    const conteudo = el.innerHTML;
    el.innerHTML = `<div class="tema-wrap tema-${temaId}"><div class="tema-topo"><span class="tema-selo">${T.selo} ${esc(S.edital.concurso)}</span><div><div class="tema-tit">Semana ${semanaSel} · <span>${esc(T.titulo)}</span></div><div class="tema-sub">${semFeitos} de ${daSemana.length} blocos feitos na semana${S.edital.cargo ? ' · ' + esc(S.edital.cargo) : ''}</div></div></div>
      ${progressoHTML(temaId, pctEd, ` · ${validos.filter((x) => !x.concluido).length} tópicos pendentes`)}${conteudo}</div>`;
  }

  el.querySelector('#vmes').onclick = () => { visao = 'mes'; mesSel = null; render(el); };
  el.querySelector('#atr').onclick = () => corrigirAtrasos(() => render(el));
  el.querySelector('#ant').onclick = () => { semanaSel--; render(el); };
  el.querySelector('#prox').onclick = () => { semanaSel++; render(el); };
  el.querySelector('#esta').onclick = () => { semanaSel = semAtual; diaSel = idxDia(h); render(el); };
  el.querySelectorAll('.dia').forEach((b) => (b.onclick = () => { diaSel = Number(b.dataset.d); render(el); }));
  el.querySelector('#semana').onclick = () => verSemana(daSemana, ini);
  el.querySelector('#add').onclick = () => adicionarBloco(semanaSel, DIAS[diaSel], (s, d) => { if (s) { semanaSel = s; diaSel = DIAS.indexOf(d); } render(el); });
  const irPara = (s) => { if (s) { semanaSel = s; diaSel = 0; } render(el); };
  el.querySelectorAll('[data-g]').forEach((b) => (b.onclick = () => gerarSemana(semanaSel, irPara)));
  el.querySelector('#incluir').onclick = () => incluirSemana(semanaSel, irPara);
  el.querySelectorAll('[data-i]').forEach((b) => (b.onclick = () => incluirSemana(semanaSel, irPara, true)));

  const box = el.querySelector('#blocos');
  if (!tarefas.length) { box.innerHTML = '<div class="card" style="margin-top:12px"><p class="muted">Nenhum bloco neste dia.</p></div>'; return; }
  const appHoje = (tid) => S.logs.filter((l) => l.topico_id === tid && l.data === iso(dataSel) && l.origem === 'app').reduce((s, l) => s + l.feitas, 0);
  const temPublica = new Set((await db.select('questoes', { origem: 'eq.publica', select: 'materia,assunto' }).catch(() => [])).map((q) => norm(q.materia) + '|' + norm(q.assunto)));

  let html = '<div style="margin-top:16px"></div>';
  tarefas.forEach((t, i) => {
    const tp = S.topicos.find((x) => x.id === t.topico_id);
    const tipo = tipoBloco(t.topico);
    const [cod, nome] = separaCodigo(tp ? tp.topico : t.topico);
    const cl = t.checklist || {};
    const n = tp ? appHoje(tp.id) : 0;
    const itens = tipo === 'Teoria' ? [['teoria', 'Teoria do assunto']]
      : tipo === 'Revisão' ? [['leitura', 'Leitura dirigida / lei seca']]
      : [['q', 'Resolvi as questões'], ['erros', 'Revisei os erros']];
    const caiu = tp && temPublica.has(norm(tp.materia) + '|' + norm(tp.topico));
    const atrasado = !t.concluido && iso(dataTarefa(t)) < iso(h);
    const rodando = crono.atual()?.id === t.id;
    const ehRev = /^revis/i.test(t.origem || '') || tipo !== 'Teoria';
    const num = `${semanaSel}${String(diaSel + 1)}${String(i + 1).padStart(2, '0')}`;
    const estadoT = T ? (t.concluido ? 'CONCLUÍDO' : atrasado ? T.atraso : ehRev ? T.revisao.toUpperCase() : iso(dataSel) === iso(h) ? 'EM CURSO' : 'PROGRAMADO') : '';
    html += `<div class="card bloco ${t.concluido ? 'feito' : ''} ${atrasado ? 'atraso' : ''} ${ehRev && !t.concluido ? 'rev' : ''}" data-id="${t.id}" style="margin-bottom:12px">
      ${T ? `<span class="bl-ico">${t.concluido ? T.icoFeito : atrasado ? '⚠️' : ehRev ? '🔁' : T.ico}</span>${T.carimbo && t.concluido ? `<span class="bl-carimbo">${T.carimbo}</span>` : ''}${temaId === 'juridico' && atrasado ? `<span class="bl-carimbo bad">${T.atraso}</span>` : ''}` : ''}
      <div class="row"><span class="mono bl-cod">${T ? `${T.cod} ${num} · ${estadoT}` : `Bloco ${i + 1}`}</span><span class="sp"></span>${atrasado ? '<span class="pill" style="color:var(--vermelho)">Atrasado</span>' : ''}${/^revis/i.test(t.origem || '') ? '<span class="pill ouro">Revisão programada</span>' : ''}<span class="pill">${tipo}</span></div>
      <h2 style="margin-top:6px">${esc(t.materia)}</h2>
      <div class="assunto"><span class="mono">${esc(cod)}</span> <b>${esc(tipo === 'Teoria' ? nome : t.topico)}</b>
        ${tp ? `<details><summary>detalhes e lei seca</summary>
          <div class="row" style="margin-top:8px"><span class="pill dash">Banca: ${caiu ? 'já caiu' : 'não caiu'}</span><span class="pill">${esc(S.edital.concurso)}</span>${tp.concluido ? '<span class="pill verde">Assunto finalizado</span>' : ''}</div>
          ${leiSecaHTML(tp)}</details>` : '<div class="muted" style="font-size:13px">Tarefa sem tópico do edital ligado.</div>'}
      </div>
      ${itens.map(([k, txt, auto]) => `<label class="check"><input type="checkbox" data-k="${k}" ${cl[k] || auto ? 'checked' : ''}> ${esc(txt)}</label>`).join('')}
      ${t.duvida ? `<div class="muted" style="font-size:13px">📝 ${esc(t.duvida)}</div>` : ''}
      <div class="row" style="margin-top:10px"><span class="crono ${rodando ? 'rodando' : ''}">⏱ ${rodando ? 'Cronômetro rodando' : `Tempo estudado: ${crono.fmtMin(t.minutos || 0)}`}</span><button class="btn sec mini" data-a="crono">${rodando ? '■ Parar' : '▶ Iniciar cronômetro'}</button></div>
      <div class="row" style="margin-top:12px">
        <button class="btn bl-btn" data-a="concluir" ${t.concluido ? 'title="Clique para reabrir"' : ''}>${T ? (t.concluido ? T.feito : T.btn) : t.concluido ? 'Reabrir bloco' : 'Concluí o bloco'}</button>
        ${tp ? `<button class="btn sec" data-a="terminei">${tp.concluido ? 'Reabrir assunto' : 'Terminei este assunto'}</button>
` : ''}
      </div>
      <div class="row" style="margin-top:6px"><button class="linkbtn" data-a="duvida">Anotar dúvida</button><button class="linkbtn" data-a="editar">Editar, mover ou excluir</button>${tp ? '<button class="linkbtn" data-a="externo">Registrar questões feitas fora do app</button>' : ''}</div>
    </div>`;
  });
  box.innerHTML = html;

  box.querySelectorAll('.bloco').forEach((card) => {
    const t = S.tarefas.find((x) => x.id === card.dataset.id);
    const tp = S.topicos.find((x) => x.id === t.topico_id);
    card.querySelectorAll('input[data-k]').forEach((c) => (c.onchange = async () => {
      try { await atualizarTarefa(t.id, { checklist: { ...(t.checklist || {}), [c.dataset.k]: c.checked } }); } catch (e) { toast(e.message, 'erro'); }
    }));
    card.querySelectorAll('[data-a]').forEach((b) => (b.onclick = async () => {
      const a = b.dataset.a;
      try {
        if (a === 'crono') { if (crono.atual()?.id === t.id) await crono.parar(); else { await crono.iniciar(t); } render(el); }
        if (a === 'concluir' && !t.concluido && crono.atual()?.id === t.id) await crono.parar();
        if (a === 'concluir') { await atualizarTarefa(t.id, { concluido: !t.concluido, concluido_em: t.concluido ? null : iso(hoje()) }); render(el); }
        if (a === 'terminei') {
          const finalizou = !tp.concluido;
          await atualizarTopico(tp.id, { concluido: finalizou });
          if (finalizou) { const n = await revisoesEspacadas(tp); toast(n ? `Assunto finalizado! ${n} revisão(ões) agendada(s) no calendário (1, 7 e 30 dias).` : 'Assunto finalizado!'); } else toast('Assunto reaberto.');
          render(el);
        }
        if (a === 'duvida') modal(`<h3>Anotar dúvida</h3><textarea id="dv">${esc(t.duvida || '')}</textarea><button class="btn" id="sv" style="margin-top:10px">Salvar</button>`, { onMount: (m, close) => (m.querySelector('#sv').onclick = async () => { await atualizarTarefa(t.id, { duvida: m.querySelector('#dv').value || null }); close(); render(el); }) });
        if (a === 'externo') formExterno(tp, () => render(el));
        if (a === 'editar') editarBloco(t, () => render(el));
      } catch (e) { toast(e.message, 'erro'); }
    }));
  });
}

export function formExterno(tp, depois) {
  modal(`<h3>Registrar questões feitas fora do app</h3><p class="muted" style="font-size:13px">${esc(tp.topico)}</p>
    <div class="row"><div class="campo"><label>Questões feitas</label><input type="number" min="1" id="f" style="width:120px"></div><div class="campo"><label>Acertos</label><input type="number" min="0" id="a" style="width:120px"></div><div class="campo"><label>Data</label><input type="date" id="d" value="${iso(hoje())}"></div></div>
    <button class="btn" id="ok">Salvar</button>`, {
    onMount: (m, close) => (m.querySelector('#ok').onclick = async () => {
      try { await registrarExterno(tp.id, m.querySelector('#f').value, m.querySelector('#a').value, m.querySelector('#d').value); toast('Registrado!'); close(); depois && depois(); } catch (e) { toast(e.message, 'erro'); }
    }),
  });
}

function verSemana(tarefas, ini) {
  modal(`<h3>Semana inteira</h3>${DIAS.map((d, i) => { const ts = tarefas.filter((t) => t.dia === d).sort((a, b) => a.ordem - b.ordem); if (!ts.length) return '';
    return `<div style="margin:12px 0"><div class="mono up">${d} · ${ddmm(addDias(ini, i))}</div>${ts.map((t) => `<div class="check">${t.concluido ? '✅' : '⬜'} <span><b>${esc(t.materia)}</b> — ${esc(t.topico)}</span></div>`).join('')}</div>`; }).join('') || '<p class="muted">Sem tarefas.</p>'}`, { largo: true });
}

// ---------- VISÃO MENSAL ----------
function renderMes(el, abrirDia, voltar) {
  const ed = S.edital, h = hoje();
  if (!mesSel) mesSel = new Date(h.getFullYear(), h.getMonth(), 1);
  const primeiro = new Date(mesSel), ult = new Date(primeiro.getFullYear(), primeiro.getMonth() + 1, 0);
  const ini = addDias(primeiro, -idxDia(primeiro));
  const fim = addDias(ult, 6 - idxDia(ult));
  const porDia = new Map();
  for (const t of S.tarefas) { const k = iso(dataTarefa(t)); const a = porDia.get(k) || []; a.push(t); porDia.set(k, a); }
  const minQ = new Map(); for (const l of S.logs) minQ.set(l.data, (minQ.get(l.data) || 0) + l.feitas);
  const nomeMes = (() => { const s = primeiro.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }); return s.charAt(0).toUpperCase() + s.slice(1); })();
  let cel = '';
  for (let d = new Date(ini); d <= fim; d = addDias(d, 1)) {
    const k = iso(d), ts = porDia.get(k) || [], feitos = ts.filter((t) => t.concluido).length;
    const cls = !ts.length ? '' : feitos === ts.length ? 'ok' : k < iso(h) ? 'atraso' : feitos ? 'parcial' : '';
    cel += `<button class="cel ${d.getMonth() !== primeiro.getMonth() ? 'fora' : ''} ${k === iso(h) ? 'hoje' : ''} ${cls}" data-k="${k}"><span class="n">${d.getDate()}</span>${ts.length ? `<span class="q">${feitos}/${ts.length}<span class="lg"> blocos</span></span>` : ''}${minQ.get(k) ? `<span class="q">${minQ.get(k)} questões</span>` : ''}</button>`;
  }
  const doMes = [...porDia].filter(([k]) => k.slice(0, 7) === iso(primeiro).slice(0, 7)).flatMap(([, v]) => v);
  const fe = doMes.filter((t) => t.concluido).length;
  el.innerHTML = `<div class="row" style="margin-bottom:6px"><div class="abas"><button id="vsem">Semana</button><button class="on">Mês</button></div><span class="sp"></span>
      <button class="btn ${atrasados().length ? 'vermelho' : 'sec'} mini" id="atr">${atrasados().length ? `Corrigir atrasos (${atrasados().length})` : 'Reorganizar calendário'}</button></div>
    <div class="mono up">Visão do mês</div><h1>${esc(nomeMes)}</h1>
    <div class="card"><div class="row" style="margin-bottom:12px"><b>${fe} de ${doMes.length} blocos feitos no mês</b><span class="sp"></span>
      <button class="btn sec mini" id="mant">‹</button><button class="btn sec mini" id="mhoje">Mês atual</button><button class="btn sec mini" id="mprox">›</button></div>
      <div class="mes">${DIAS_CURTO.map((d) => `<div class="cab">${d}</div>`).join('')}${cel}</div>
      <div class="legenda"><span><i style="background:color-mix(in srgb,var(--verde) 40%,transparent)"></i>Dia cumprido</span><span><i style="background:color-mix(in srgb,var(--rosa) 60%,transparent)"></i>Em andamento</span><span><i style="background:color-mix(in srgb,var(--vermelho) 40%,transparent)"></i>Com atraso</span><span>Clique no dia para abrir</span></div></div>`;
  el.querySelector('#vsem').onclick = voltar;
  el.querySelector('#atr').onclick = () => corrigirAtrasos(() => renderMes(el, abrirDia, voltar));
  el.querySelector('#mant').onclick = () => { mesSel = new Date(primeiro.getFullYear(), primeiro.getMonth() - 1, 1); renderMes(el, abrirDia, voltar); };
  el.querySelector('#mprox').onclick = () => { mesSel = new Date(primeiro.getFullYear(), primeiro.getMonth() + 1, 1); renderMes(el, abrirDia, voltar); };
  el.querySelector('#mhoje').onclick = () => { mesSel = null; renderMes(el, abrirDia, voltar); };
  el.querySelectorAll('.cel').forEach((b) => (b.onclick = () => { const d = new Date(b.dataset.k + 'T00:00:00'); abrirDia(semanaDe(ed.data_inicio, d), idxDia(d)); }));
}
