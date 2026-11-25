import { S, atualizarTarefa, atualizarTopico, registrarExterno } from '../state.js';
import { db, functions } from '../backend.js';
import { esc, hoje, iso, addDias, ddmm, DIAS, DIAS_CURTO, idxDia, semanaDe, inicioSemana, separaCodigo, tipoBloco, norm, pct, dataExtenso } from '../util.js';
import { leiSecaHTML, toast, modal, barra } from '../ui.js';
import { resolverSequencia } from '../quiz.js';
import { adicionarBloco, editarBloco, gerarSemana, incluirSemana } from './montar-semana.js';
import { corrigirAtrasos, atrasados } from './replanejar.js';
import { revisoesEspacadas, dataTarefa } from '../revisoes.js';
import * as crono from '../crono.js';
import { acharLeitura } from '../leitura/index.js';
import { topicosValidos } from '../state.js';
import { assistente, convite, reiniciar, cursoDoCronograma, incluirNovasAutomatico } from './cronograma.js';
import { blocosMistos, blocoMisto, separarBloco, separarTodos } from '../separar-blocos.js';

let semanaSel = null, diaSel = null, visao = 'semana', mesSel = null, edSel = null;

export async function render(el, q) {
  const ed = S.edital;
  const curso = cursoDoCronograma();
  if (curso && q?.get('montar')) return assistente(el, { voltar: () => { location.hash = '#/calendario'; } });
  if ((curso || S.profile?.role === 'admin') && q?.get('reiniciar')) return reiniciar(el, { voltar: () => { location.hash = '#/calendario'; } });
  if (!ed || (curso && !S.tarefas.length)) {
    el.innerHTML = curso ? `<div class="mono up">Calendário de estudos</div><h1>Seu calendário está vazio</h1>${convite(curso)}`
      : '<div class="card"><h2>Sem edital</h2><p>Peça ao administrador para importar seu edital ou crie um na aba Edital.</p></div>';
    return;
  }
  // matéria nova no curso: entra sozinha no cronograma (se o aluno deixou essa opção ligada)
  incluirNovasAutomatico().then((n) => { if (n) render(el, q); });
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
  const semanas = [...new Set(S.tarefas.map((t) => t.semana))].sort((a, b) => a - b);
  const semFeitos = daSemana.filter((x) => x.concluido).length;
  const minDia = tarefas.reduce((s, t) => s + (t.previsto || 0), 0);
  const fimSem = addDias(ini, 6);
  const mesCurto = (d) => d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
  const ehHoje = iso(dataSel) === iso(h);
  const tituloDia = (ehHoje ? 'Hoje, ' : '') + dataSel.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  el.innerHTML = `<div class="cal">
    <div class="cal-topo">
      <div><div class="mono up">Semana ${semanaSel}${semanaSel === semAtual ? ' · atual' : ''} · ${ini.getDate()} ${mesCurto(ini)} a ${fimSem.getDate()} ${mesCurto(fimSem)}</div>
        <h1 class="cal-tit">${esc(tituloDia.charAt(0).toUpperCase() + tituloDia.slice(1))}</h1></div>
      <div class="cal-acoes"><div class="cal-seg"><button class="on">Semana</button><button id="vmes">Mês</button></div>
        ${curso || S.profile?.role === 'admin' ? '<a class="btn sec mini" href="#/calendario?reiniciar=1">Reiniciar cronograma</a>' : ''}
        <button class="btn sec mini ${nAtr ? 'cal-atr' : ''}" id="atr">${nAtr ? `${nAtr} atrasado${nAtr > 1 ? 's' : ''}: reorganizar` : 'Reorganizar'}</button></div>
    </div>
    <div class="cal-semana">
      <button class="cal-nav" id="ant" aria-label="Semana anterior">‹</button>
      <div class="cal-dias">${DIAS_CURTO.map((d, i) => { const ts = doDia(i); const di = addDias(ini, i); const fe = ts.filter((t) => t.concluido).length;
        return `<button class="cal-dia ${i === diaSel ? 'sel' : ''} ${iso(di) === iso(h) ? 'hoje' : ''} ${ts.length && fe === ts.length ? 'ok' : ''} ${!ts.length ? 'vazio' : ''}" data-d="${i}">
          <span class="cd-sem">${d}</span><span class="cd-num">${di.getDate()}</span>
          <span class="cd-pts">${ts.length ? ts.map((t) => `<i class="${t.concluido ? 'f' : ''}"></i>`).join('') : '<small>—</small>'}</span></button>`; }).join('')}</div>
      <button class="cal-nav" id="prox" aria-label="Próxima semana">›</button>
    </div>
    <div class="cal-resumo"><span><b>${feitos}/${tarefas.length}</b> blocos ${ehHoje ? "hoje" : "no dia"}${minDia ? ` · ${crono.fmtMin(minDia)} previstos` : ''}</span><div class="cal-barra"><i style="width:${pct(feitos, tarefas.length) || 0}%"></i></div>
      <span class="muted">Semana: ${semFeitos}/${daSemana.length}</span>${semanaSel !== semAtual ? '<button class="linkbtn" id="esta">Voltar para esta semana</button>' : ''}</div>
    ${!daSemana.length ? `<div class="cal-vazio"><b>A semana ${semanaSel} ainda não tem blocos.</b><span class="muted">${semanas.length ? `Semanas montadas: ${semanas[0]} a ${semanas[semanas.length - 1]}.` : 'Monte seu primeiro calendário.'}</span><button class="btn mini" data-i="1">Incluir esta semana</button></div>` : ''}
    ${(() => { const mx = blocosMistos(); return mx.length ? `<div class="cal-aviso"><span><b>${mx.length} bloco(s) têm várias matérias juntas.</b> O app pode dividir em um bloco por matéria.</span><button class="btn sec mini" id="sepTodos">Separar agora</button></div>` : ''; })()}
    <div id="blocos"></div>
    <div class="cal-rodape"><button class="linkbtn" id="add">+ Adicionar matéria neste dia</button><button class="linkbtn" id="semana">Ver semana inteira</button><button class="linkbtn" id="incluir">Incluir semana</button>${daSemana.length ? '<button class="linkbtn" data-g="1">Completar semana automaticamente</button>' : ''}</div>
  </div>`;

  el.querySelector('#vmes').onclick = () => { visao = 'mes'; mesSel = null; render(el); };
  el.querySelector('#atr').onclick = () => corrigirAtrasos(() => render(el));
  el.querySelector('#ant').onclick = () => { semanaSel--; render(el); };
  el.querySelector('#prox').onclick = () => { semanaSel++; render(el); };
  const est = el.querySelector('#esta'); if (est) est.onclick = () => { semanaSel = semAtual; diaSel = idxDia(h); render(el); };
  el.querySelectorAll('.cal-dia').forEach((b) => (b.onclick = () => { diaSel = Number(b.dataset.d); render(el); }));
  el.querySelector('#semana').onclick = () => verSemana(daSemana, ini);
  el.querySelector('#add').onclick = () => adicionarBloco(semanaSel, DIAS[diaSel], (s, d) => { if (s) { semanaSel = s; diaSel = DIAS.indexOf(d); } render(el); });
  const irPara = (s) => { if (s) { semanaSel = s; diaSel = 0; } render(el); };
  el.querySelectorAll('[data-g]').forEach((b) => (b.onclick = () => gerarSemana(semanaSel, irPara)));
  el.querySelector('#incluir').onclick = () => incluirSemana(semanaSel, irPara);
  const sepT = el.querySelector('#sepTodos');
  if (sepT) sepT.onclick = async () => { sepT.disabled = true; sepT.textContent = 'Separando…'; try { const n = await separarTodos(blocosMistos()); toast(`${n} bloco(s) separados: agora cada matéria tem o seu bloco.`); } catch (e) { toast(e.message, 'erro'); } render(el); };
  el.querySelectorAll('[data-i]').forEach((b) => (b.onclick = () => incluirSemana(semanaSel, irPara, true)));

  const box = el.querySelector('#blocos');
  if (!tarefas.length) { box.innerHTML = daSemana.length ? '<div class="cal-livre">Dia livre: nenhum bloco programado.</div>' : ''; return; }
  const appHoje = (tid) => S.logs.filter((l) => l.topico_id === tid && l.data === iso(dataSel) && l.origem === 'app').reduce((s, l) => s + l.feitas, 0);
  const temPublica = new Set((await db.select('questoes', { origem: 'eq.publica', select: 'materia,assunto' }).catch(() => [])).map((q) => norm(q.materia) + '|' + norm(q.assunto)));

  let html = '';
  tarefas.forEach((t) => {
    const tp = S.topicos.find((x) => x.id === t.topico_id);
    const tipo = tipoBloco(t.topico);
    const [, nome] = separaCodigo(tp ? tp.topico : t.topico);
    const cl = t.checklist || {};
    const itens = tipo === 'Teoria' ? [['teoria', 'Teoria do assunto']]
      : tipo === 'Revisão' ? [['leitura', 'Leitura dirigida / lei seca']]
      : [['q', 'Resolvi as questões'], ['erros', 'Revisei os erros']];
    const caiu = tp && temPublica.has(norm(tp.materia) + '|' + norm(tp.topico));
    const atrasado = !t.concluido && iso(dataTarefa(t)) < iso(h);
    const rodando = crono.atual()?.id === t.id;
    const ehRev = /^revis/i.test(t.origem || '') || tipo !== 'Teoria';
    const lt = acharLeitura(tp?.materia || t.materia, (tp?.topico || '') + ' ' + (t.topico || ''));
    const cor = lt?.mat?.cor || '#8a8f98';
    const parte = (t.topico.match(/\(parte [^)]+\)/) || [''])[0];
    const titulo = tipo === 'Teoria' ? nome + (parte && !nome.includes(parte) ? ' ' + parte : '') : t.topico;
    html += `<article class="cb ${t.concluido ? 'feito' : ''} ${atrasado ? 'atraso' : ''}" data-id="${t.id}" style="--c:${cor}">
      <button class="cb-check" data-a="concluir" title="${t.concluido ? 'Reabrir bloco' : 'Concluir bloco'}" aria-label="${t.concluido ? 'Reabrir bloco' : 'Concluir bloco'}">${t.concluido ? '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}</button>
      <div class="cb-corpo">
        <div class="cb-mat">${esc(t.materia)}</div>
        <div class="cb-top">${esc(titulo)}</div>
        <div class="cb-meta"><span class="cb-tag ${ehRev ? 'rev' : ''}">${ehRev ? (tipo === 'Teoria' ? 'Revisão' : tipo) : 'Teoria'}</span>${t.previsto ? `<span>${crono.fmtMin(t.previsto)}</span>` : ''}${t.minutos ? `<span>${crono.fmtMin(t.minutos)} estudados</span>` : ''}${atrasado ? '<span class="cb-atr">Atrasado</span>' : ''}${tp?.concluido ? '<span class="cb-fin">Assunto finalizado</span>' : ''}</div>
        ${!t.concluido && blocoMisto(t) ? '<div class="cb-linha"><span class="cb-atr">Várias matérias neste bloco</span><button class="linkbtn" data-a="separar">Separar</button></div>' : ''}
        ${t.duvida ? `<div class="cb-duvida">Dúvida: ${esc(t.duvida)}</div>` : ''}
        <details class="cb-mais"><summary>Mais opções</summary>
          <div class="cb-checks">${itens.map(([k, txt]) => `<label class="check"><input type="checkbox" data-k="${k}" ${cl[k] ? 'checked' : ''}> ${esc(txt)}</label>`).join('')}</div>
          <div class="cb-links">${tp ? `<button class="linkbtn" data-a="terminei">${tp.concluido ? 'Reabrir assunto' : 'Terminei este assunto'}</button>` : ''}<button class="linkbtn" data-a="duvida">Anotar dúvida</button><button class="linkbtn" data-a="editar">Editar, mover ou excluir</button>${tp ? '<button class="linkbtn" data-a="externo">Registrar questões feitas fora do app</button>' : ''}</div>
          ${tp ? `<div class="cb-lei"><div class="row" style="margin-bottom:6px"><span class="pill dash">Banca: ${caiu ? 'já caiu' : 'não caiu'}</span>${appHoje(tp.id) ? `<span class="pill">${appHoje(tp.id)} questões hoje</span>` : ''}</div>${leiSecaHTML(tp)}</div>` : ''}
        </details>
      </div>
      <div class="cb-acoes">${lt ? `<a class="btn mini" href="${lt.link}">Ler</a>` : ''}<button class="btn sec mini ${rodando ? 'cb-rodando' : ''}" data-a="crono">${rodando ? '■ Parar' : '▶ Cronômetro'}</button></div>
    </article>`;
  });
  box.innerHTML = html;

  box.querySelectorAll('.cb').forEach((card) => {
    const t = S.tarefas.find((x) => x.id === card.dataset.id);
    const tp = S.topicos.find((x) => x.id === t.topico_id);
    card.querySelectorAll('input[data-k]').forEach((c) => (c.onchange = async () => {
      try { await atualizarTarefa(t.id, { checklist: { ...(t.checklist || {}), [c.dataset.k]: c.checked } }); } catch (e) { toast(e.message, 'erro'); }
    }));
    card.querySelectorAll('[data-a]').forEach((b) => (b.onclick = async () => {
      const a = b.dataset.a;
      try {
        if (a === 'separar') { b.disabled = true; const n = await separarBloco(t); toast(n > 1 ? `Bloco dividido em ${n} matérias.` : 'Nada para separar.'); render(el); return; }
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
  el.innerHTML = `<div class="row" style="margin-bottom:6px"><div class="cal-seg"><button id="vsem">Semana</button><button class="on">Mês</button></div><span class="sp"></span>
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
