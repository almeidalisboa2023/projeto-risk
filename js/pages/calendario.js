import { S, atualizarTarefa, atualizarTopico, registrarExterno } from '../state.js';
import { db, functions } from '../backend.js';
import { esc, hoje, iso, addDias, ddmm, DIAS, DIAS_CURTO, idxDia, semanaDe, inicioSemana, separaCodigo, tipoBloco, norm, pct, dataExtenso } from '../util.js';
import { linksHTML, toast, modal, barra } from '../ui.js';
import { resolverSequencia } from '../quiz.js';

let semanaSel = null, diaSel = null;

export async function render(el) {
  const ed = S.edital;
  if (!ed) { el.innerHTML = '<div class="card"><h2>Sem edital</h2><p>Peça ao administrador para importar seu edital ou crie um na aba Edital.</p></div>'; return; }
  const h = hoje();
  const semAtual = semanaDe(ed.data_inicio, h);
  if (semanaSel == null) { semanaSel = semAtual; diaSel = idxDia(h); }
  const ini = inicioSemana(ed.data_inicio, semanaSel);
  const blocosCfg = Array.isArray(S.profile.blocos) && S.profile.blocos.length ? S.profile.blocos : [{ hora: '08:00', min: 50 }, { hora: '09:00', min: 50 }, { hora: '21:00', min: 50 }];
  const daSemana = S.tarefas.filter((t) => t.semana === semanaSel);
  const doDia = (i) => daSemana.filter((t) => t.dia === DIAS[i]).sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
  const tarefas = doDia(diaSel);
  const feitos = tarefas.filter((t) => t.concluido).length;
  const dataSel = addDias(ini, diaSel);
  const estado = !tarefas.length ? 'Sem blocos' : feitos === 0 ? 'Nenhum bloco ainda' : feitos === tarefas.length ? 'Dia concluído' : 'Em andamento';
  const semanas = [...new Set(S.tarefas.map((t) => t.semana))].sort((a, b) => a - b);
  const simulados = diaSel === 5 ? await db.select('simulados', { order: 'liberado_em.desc' }).catch(() => []) : [];
  const simSemana = simulados.filter((s) => s.semana === semanaSel || (s.liberado_em >= iso(ini) && s.liberado_em <= iso(addDias(ini, 6))));

  el.innerHTML = `
    <div class="mono up">${esc(dataExtenso(dataSel))} · Semana ${semanaSel}${semanaSel === semAtual ? ' (atual)' : ''}</div>
    <h1>${iso(dataSel) === iso(h) ? 'Hoje' : esc(DIAS[diaSel])}</h1>
    <div class="card">
      <div class="row">
        <div style="min-width:220px;flex:1"><div class="row"><b>${feitos} de ${tarefas.length} blocos</b><span class="pill ${estado === 'Dia concluído' ? 'verde' : ''}">${estado}</span></div>${barra(pct(feitos, tarefas.length))}</div>
        <div class="row"><button class="btn sec mini" id="ant">‹ Anterior</button><button class="btn sec mini" id="esta">Esta semana</button><button class="btn sec mini" id="prox">Próxima ›</button></div>
      </div>
      <div class="dias" style="margin-top:12px">${DIAS_CURTO.map((d, i) => { const ts = doDia(i); const ok = ts.length && ts.every((t) => t.concluido); const parc = ts.some((t) => t.concluido); const di = addDias(ini, i);
        return `<button class="dia ${i === diaSel ? 'sel' : ''} ${iso(di) === iso(h) ? 'hoje' : ''}" data-d="${i}">${d}<small>${ddmm(di)}</small><div class="pt ${ok ? 'feito' : parc ? 'parcial' : ''}"></div></button>`; }).join('')}</div>
      ${semanas.length && !semanas.includes(semanaSel) ? `<p class="muted">Não há tarefas na semana ${semanaSel}. Semanas com tarefas: ${semanas[0]} a ${semanas[semanas.length - 1]}.</p>` : ''}
    </div>
    ${simSemana.map((s) => `<div class="card" style="margin-top:12px"><div class="mono up">Simulado da semana</div><h3>${esc(s.titulo)}</h3>${iso(h) >= s.liberado_em ? `<a class="btn" href="${esc(s.arquivo_url)}" target="_blank" rel="noopener">Baixar PDF ↗</a>` : `<span class="pill">Disponível em ${esc(s.liberado_em.split('-').reverse().join('/'))}</span>`}</div>`).join('')}
    <div id="blocos"></div>
    <div class="row" style="margin-top:16px"><button class="btn sec" id="semana">Ver semana inteira</button></div>`;

  el.querySelector('#ant').onclick = () => { semanaSel--; render(el); };
  el.querySelector('#prox').onclick = () => { semanaSel++; render(el); };
  el.querySelector('#esta').onclick = () => { semanaSel = semAtual; diaSel = idxDia(h); render(el); };
  el.querySelectorAll('.dia').forEach((b) => (b.onclick = () => { diaSel = Number(b.dataset.d); render(el); }));
  el.querySelector('#semana').onclick = () => verSemana(daSemana, ini);

  const box = el.querySelector('#blocos');
  if (!tarefas.length) { box.innerHTML = '<div class="card" style="margin-top:12px"><p class="muted">Nenhum bloco neste dia.</p></div>'; return; }
  const appHoje = (tid) => S.logs.filter((l) => l.topico_id === tid && l.data === iso(dataSel) && l.origem === 'app').reduce((s, l) => s + l.feitas, 0);
  const temPublica = new Set((await db.select('questoes', { origem: 'eq.publica', select: 'materia,assunto' }).catch(() => [])).map((q) => norm(q.materia) + '|' + norm(q.assunto)));

  let html = '', secao = '';
  tarefas.forEach((t, i) => {
    const cfg = blocosCfg[i] || { hora: String(22 + (i - blocosCfg.length)).padStart(2, '0') + ':00', min: 50 };
    const nova = Number(cfg.hora.slice(0, 2)) < 12 ? 'MANHÃ' : Number(cfg.hora.slice(0, 2)) < 18 ? 'TARDE' : 'NOITE';
    if (nova !== secao) { secao = nova; html += `<div class="mono up" style="margin:22px 0 8px">${nova} · começa às ${esc(cfg.hora.replace(':00', 'h').replace(':', 'h'))}</div>`; }
    const tp = S.topicos.find((x) => x.id === t.topico_id);
    const tipo = tipoBloco(t.topico);
    const [cod, nome] = separaCodigo(tp ? tp.topico : t.topico);
    const cl = t.checklist || {};
    const n = tp ? appHoje(tp.id) : 0;
    const itens = tipo === 'Teoria' ? [['teoria', 'Teoria do assunto'], ['q10', `10 questões registradas (${Math.min(n, 10)}/10)`, n >= 10]]
      : tipo === 'Revisão' ? [['leitura', 'Leitura dirigida / lei seca'], ['q10', `10 questões registradas (${Math.min(n, 10)}/10)`, n >= 10]]
      : [['q20', `Questões no banco: ${Math.min(n, 20)} de 20`, n >= 20], ['erros', 'Erros anotados no caderno']];
    const caiu = tp && temPublica.has(norm(tp.materia) + '|' + norm(tp.topico));
    html += `<div class="card bloco ${t.concluido ? 'feito' : ''}" data-id="${t.id}" style="margin-bottom:12px">
      <div class="row"><span class="mono">Bloco ${i + 1} · ${esc(cfg.hora.replace(':', 'h'))} · ${cfg.min} min</span><span class="sp"></span><span class="pill">${tipo}</span></div>
      <h2 style="margin-top:6px">${esc(t.materia)}</h2>
      <div class="assunto"><span class="mono">${esc(cod)}</span> <b>${esc(tipo === 'Teoria' ? nome : t.topico)}</b>
        ${tp ? `<details><summary>detalhes: lei seca, material, onde reestudar</summary>
          <div class="row" style="margin-top:8px"><span class="pill dash">Banca: ${caiu ? 'já caiu' : 'não caiu'}</span><span class="pill">${esc(S.edital.concurso)}</span>${tp.concluido ? '<span class="pill verde">Assunto finalizado</span>' : ''}</div>
          ${linksHTML(tp, S.edital.concurso)}</details>` : '<div class="muted" style="font-size:13px">Tarefa sem tópico do edital ligado.</div>'}
      </div>
      ${itens.map(([k, txt, auto]) => `<label class="check"><input type="checkbox" data-k="${k}" ${cl[k] || auto ? 'checked' : ''}> ${esc(txt)}</label>`).join('')}
      ${t.duvida ? `<div class="muted" style="font-size:13px">📝 ${esc(t.duvida)}</div>` : ''}
      <div class="row" style="margin-top:12px">
        <button class="btn" data-a="concluir">${t.concluido ? 'Reabrir bloco' : 'Concluí o bloco'}</button>
        ${tp ? `<button class="btn sec" data-a="terminei">${tp.concluido ? 'Reabrir assunto' : 'Terminei este assunto'}</button>
        <a class="btn sec" href="#/questoes?topico=${tp.id}">Questões da matéria</a>
        <button class="btn sec" data-a="ia">Pedir questões ao Claude</button>` : ''}
      </div>
      <div class="row" style="margin-top:6px"><button class="linkbtn" data-a="duvida">Anotar dúvida</button>${tp ? '<button class="linkbtn" data-a="externo">Registrar questões feitas fora do app</button>' : ''}</div>
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
        if (a === 'concluir') { await atualizarTarefa(t.id, { concluido: !t.concluido, concluido_em: t.concluido ? null : iso(hoje()) }); render(el); }
        if (a === 'terminei') { await atualizarTopico(tp.id, { concluido: !tp.concluido }); toast(tp.concluido ? 'Assunto reaberto.' : 'Assunto finalizado!'); render(el); }
        if (a === 'duvida') modal(`<h3>Anotar dúvida</h3><textarea id="dv">${esc(t.duvida || '')}</textarea><button class="btn" id="sv" style="margin-top:10px">Salvar</button>`, { onMount: (m, close) => (m.querySelector('#sv').onclick = async () => { await atualizarTarefa(t.id, { duvida: m.querySelector('#dv').value || null }); close(); render(el); }) });
        if (a === 'externo') formExterno(tp, () => render(el));
        if (a === 'ia') await pedirIA(tp, b, () => render(el));
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

export async function pedirIA(tp, botao, depois) {
  // Primeiro oferece as do banco (não gastam crédito)
  const resp = new Set((await db.select('respostas', { user_id: 'eq.' + S.user.id, select: 'questao_id' })).map((r) => r.questao_id));
  const banco = (await db.select('questoes', { materia: 'eq.' + tp.materia, assunto: 'eq.' + tp.topico, situacao: 'eq.atualizada', limit: 200 })).filter((q) => !resp.has(q.id));
  const gerar = async () => {
    botao.disabled = true; botao.textContent = 'Gerando 10 questões…';
    try {
      const r = await functions.invoke('gerar-questoes', { topico_id: tp.id, edital_id: S.edital.id });
      toast(`Questões geradas! Restam ${r.restantes} pedidos hoje.`);
      resolverSequencia(r.questoes, { titulo: tp.topico, topicoId: tp.id, onFim: depois });
    } catch (e) {
      toast(e.status === 402 || /cr[eé]dito|limite/i.test(e.message) ? e.message : 'Não foi possível gerar agora: ' + e.message, 'erro');
    } finally { botao.disabled = false; botao.textContent = 'Pedir questões ao Claude'; }
  };
  if (banco.length >= 10) {
    modal(`<h3>Questões deste assunto</h3><p>Há <b>${banco.length}</b> questões ainda não resolvidas no banco para este assunto.</p>
      <div class="row"><button class="btn" id="b1">Responder 10 do banco</button><button class="btn sec" id="b2">Gerar novas com IA</button></div>`, {
      onMount: (m, close) => { m.querySelector('#b1').onclick = () => { close(); resolverSequencia(banco.sort(() => Math.random() - 0.5).slice(0, 10), { titulo: tp.topico, topicoId: tp.id, onFim: depois }); }; m.querySelector('#b2').onclick = () => { close(); gerar(); }; },
    });
  } else await gerar();
}

function verSemana(tarefas, ini) {
  modal(`<h3>Semana inteira</h3>${DIAS.map((d, i) => { const ts = tarefas.filter((t) => t.dia === d).sort((a, b) => a.ordem - b.ordem); if (!ts.length) return '';
    return `<div style="margin:12px 0"><div class="mono up">${d} · ${ddmm(addDias(ini, i))}</div>${ts.map((t) => `<div class="check">${t.concluido ? '✅' : '⬜'} <span><b>${esc(t.materia)}</b> — ${esc(t.topico)}</span></div>`).join('')}</div>`; }).join('') || '<p class="muted">Sem tarefas.</p>'}`, { largo: true });
}
