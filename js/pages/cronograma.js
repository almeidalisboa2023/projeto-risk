// Assistente "Montar meu cronograma": o aluno responde algumas perguntas (dias, horas, matérias por dia,
// dificuldades, prioridades, revisão) e o app gera o cronograma completo em cima do edital do curso dele:
// cria o edital do curso, os tópicos (os assuntos que o edital cobra) e todos os blocos, semana a semana.
import { S, carregarTudo, trocarEdital } from '../state.js';
import { db } from '../backend.js';
import { esc, iso, hoje, addDias, segundaDa, parseISO, DIAS, DIAS_CURTO, ddmm, semanaDe, inicioSemana, norm } from '../util.js';
import { toast } from '../ui.js';
import { meuCurso, minhaBanca, cursoInfo, CURSOS, filtrarMaterias } from '../cursos.js';
import { visiveis, comConteudos, comEdicoes } from '../leitura/index.js';
import { modal } from '../ui.js';
import { TEMAS, temaAtual } from '../temas.js';

const NIVEL = { dif: { nome: 'Tenho dificuldade', peso: 1.6 }, normal: { nome: 'Normal', peso: 1 }, dom: { nome: 'Já domino', peso: 0.6 } };
const MAX_SEMANAS = 104;

// Matérias e assuntos do edital do curso (os mesmos do Conteúdo programático)
// Curso do cronograma: o do aluno; para o administrador, o curso gravado no edital ou o que bate com o nome dele
export function cursoDoCronograma() {
  const c = meuCurso(); if (c) return c;
  if (S.edital?.curso && cursoInfo(S.edital.curso)) return cursoInfo(S.edital.curso);
  if (S.profile?.role !== 'admin') return null;
  const nome = norm([S.edital?.concurso, S.edital?.cargo].filter(Boolean).join(' '));
  return CURSOS.find((x) => nome && nome.includes(norm(x.curto))) || null;
}

export function materiasDoPlano(curso = meuCurso()) {
  const pal = (h) => String(h || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  // tempo estimado do assunto: leitura (~180 palavras/min) + questões (~1,2 min cada) + 10 min de fixação
  // Língua estrangeira: se o aluno já escolheu o idioma, o cronograma traz só os tópicos dele
  let lg = ''; try { lg = JSON.parse(localStorage.getItem('risk-lingua')) || ''; } catch {}
  const idioma = (id) => (/^espanhol/.test(id) ? 'es' : /^ingles|^gramatica$/.test(id) ? 'en' : '');
  const porLingua = (m) => (m.id === 'lingua-estrangeira' && (lg === 'en' || lg === 'es') ? { ...m, assuntos: m.assuntos.filter((a) => !idioma(a.id) || idioma(a.id) === lg) } : m);
  const base = curso && !meuCurso() ? filtrarMaterias(comEdicoes(comConteudos()), { role: 'aluno', curso: curso.id, materias_removidas: [] }).map((m) => (m.soEdital ? { ...m, soEdital: null } : m)) : visiveis();
  return base.map(porLingua).filter((m) => (m.assuntos || []).length).map((m) => ({ id: m.id, nome: m.nome, ico: m.ico, cor: m.cor,
    assuntos: m.assuntos.map((a) => a.titulo), est: m.assuntos.map((a) => pal(a.html) / 180 + pal(a.aprof) / 360 + Math.min(a.quiz?.length || 0, 40) * 1.2 + 10) }));
}

const padrao = (mats, ant) => ({
  inicio: iso(hoje()), prova: '', dias: [0, 1, 2, 3, 4], horas: 3, porDia: 3, revDia: 5, retaFinal: true,
  nivel: Object.fromEntries(mats.map((m) => [m.id, 'normal'])), prio: [], ...(ant || {}),
});

// ---------- gerador ----------
// Distribui os assuntos por "passos" ponderados: matéria com mais peso aparece com mais frequência,
// nunca a mesma matéria duas vezes no dia, sempre na ordem do edital dentro de cada matéria.
export function gerarPlano(cfg, mats, { edInicio, jaVistos = new Map(), tarefasAntigas = [] }) {
  const media = mats.reduce((s, m) => s + m.assuntos.length, 0) / Math.max(1, mats.length);
  const fila = {}, passo = {}, peso = {};
  const minBloco = Math.max(20, Math.round((cfg.horas * 60) / cfg.porDia / 5) * 5);
  mats.forEach((m, i) => {
    // assunto grande vira 2, 3 ou 4 blocos (partes), conforme o tempo estimado e a duração do bloco
    fila[m.id] = m.assuntos.flatMap((t, k) => { const n = Math.max(1, Math.min(4, Math.ceil((m.est?.[k] || 0) / minBloco - 0.25)));
      return Array.from({ length: n }, (_, j) => ({ mid: m.id, materia: m.nome, topico: t, parte: n > 1 ? `${j + 1} de ${n}` : '', ordem: k })).slice(jaVistos.get(m.nome + '|' + t) || 0); });
    peso[m.id] = (NIVEL[cfg.nivel[m.id]] || NIVEL.normal).peso * (cfg.prio.includes(m.id) ? 1.5 : 1) * Math.sqrt(Math.max(1, m.assuntos.length) / Math.max(1, media));
    passo[m.id] = i * 0.001; // desempate: ordem do curso
  });
  const minutos = minBloco;
  const dias = [...new Set([...cfg.dias, ...(cfg.revDia >= 0 ? [cfg.revDia] : [])])].sort();
  const estudados = [...tarefasAntigas]; // { data, mid, materia, topico }
  const blocos = [];
  const prova = cfg.prova ? parseISO(cfg.prova) : null;
  const pendentes = () => mats.some((m) => fila[m.id].length);
  let d = parseISO(cfg.inicio) || hoje();
  const fimMax = addDias(d, MAX_SEMANAS * 7);
  let cicloRev = [];
  const proxRev = () => { // reta final: revisão + questões de todos os assuntos, girando pelas matérias com peso
    if (!cicloRev.length) {
      const pf = {}; const pa = {}; mats.forEach((m, i) => { pf[m.id] = m.assuntos.map((t) => ({ mid: m.id, materia: m.nome, topico: t })); pa[m.id] = i * 0.001; });
      const total = mats.reduce((s, m) => s + m.assuntos.length, 0);
      for (let k = 0; k < total; k++) { const c = mats.filter((m) => pf[m.id].length).sort((a, b) => pa[a.id] - pa[b.id])[0]; if (!c) break; cicloRev.push(pf[c.id].shift()); pa[c.id] += 1 / peso[c.id]; }
    }
    return cicloRev.shift();
  };

  while (d <= fimMax) {
    const di = (d.getDay() + 6) % 7;
    const terminouTeoria = !pendentes();
    if (prova && d >= prova) break;
    if (terminouTeoria && (!prova || !cfg.retaFinal)) break;
    if (dias.includes(di)) {
      const semana = semanaDe(edInicio, d), dia = DIAS[di];
      const add = (x, rev) => blocos.push({ semana, dia, data: iso(d), materia: x.materia, mid: x.mid, topicoBase: x.topico, topico: (rev ? 'Revisão + questões: ' : '') + x.topico + (!rev && x.parte ? ` (parte ${x.parte})` : ''), previsto: minutos, origem: rev ? 'revisao' : 'cronograma', ordem: blocos.filter((b) => b.semana === semana && b.dia === dia).length });
      if (di === cfg.revDia && !terminouTeoria) {
        // dia de revisão: assuntos estudados nos últimos 7 dias e os de 4 semanas atrás (revisão espaçada)
        const lim1 = iso(addDias(d, -7)), lim2 = iso(addDias(d, -35)), lim3 = iso(addDias(d, -21));
        const rec = estudados.filter((e) => e.data >= lim1 && e.data < iso(d)).reverse();
        const ant = estudados.filter((e) => e.data >= lim2 && e.data < lim3);
        const vistos = new Set();
        for (const e of [...rec, ...ant]) { if (vistos.size >= cfg.porDia) break; const k = e.materia + '|' + e.topico; if (vistos.has(k)) continue; vistos.add(k); add(e, true); }
      } else if (!terminouTeoria) {
        const hojeM = new Set();
        for (let s = 0; s < cfg.porDia; s++) {
          const c = mats.filter((m) => fila[m.id].length && !hojeM.has(m.id)).sort((a, b) => passo[a.id] - passo[b.id])[0];
          if (!c) break;
          const x = fila[c.id].shift(); hojeM.add(c.id); passo[c.id] += 1 / peso[c.id];
          add(x, false); estudados.push({ data: iso(d), mid: x.mid, materia: x.materia, topico: x.topico });
        }
      } else {
        for (let s = 0; s < cfg.porDia; s++) { const x = proxRev(); if (x) add(x, true); }
      }
    }
    d = addDias(d, 1);
  }
  const fimTeoria = blocos.filter((b) => b.origem === 'cronograma').map((b) => b.data).sort().pop() || null;
  return { blocos, minutos, fimTeoria, sobrou: mats.reduce((s, m) => s + fila[m.id].length, 0) };
}

// ---------- tela do assistente ----------
export function assistente(el, { voltar } = {}) {
  const c = cursoDoCronograma();
  if (!c) { el.innerHTML = '<div class="card"><h2>Montar cronograma</h2><p class="muted">O assistente monta o cronograma em cima do edital do seu curso. Seu curso ainda não foi definido: fale com o administrador.</p></div>'; return; }
  const mats = materiasDoPlano(c);
  const meu = S.edital && (S.edital.curso === c.id || !S.edital.curso) ? S.edital : null;
  const cfg = padrao(mats, meu?.plano ? { ...meu.plano, inicio: iso(hoje()) } : null);
  if (meu?.data_prova && !cfg.prova) cfg.prova = meu.data_prova;
  const temaId = temaAtual(), T = TEMAS[temaId] || {};
  let passo = 0;
  const PASSOS = ['Datas', 'Rotina', 'Matérias', 'Revisão', 'Resumo'];

  const corpo = () => {
    if (passo === 0) return `<h2>Quando você começa e quando é a prova?</h2>
      <p class="muted">O cronograma começa na data escolhida e organiza todo o edital até a prova. Se a data da prova ainda não saiu, deixe em branco: o app distribui o edital inteiro no seu ritmo.</p>
      <div class="row cr-campos"><div class="campo"><label>Começar em</label><input type="date" id="crIni" value="${esc(cfg.inicio)}"></div>
      <div class="campo"><label>Data da prova (se já tiver)</label><input type="date" id="crProva" value="${esc(cfg.prova)}"></div></div>
      <div class="cr-info">📚 Edital do curso <b>${esc(c.nome)}</b>: <b>${mats.length} matérias</b> e <b>${mats.reduce((s, m) => s + m.assuntos.length, 0)} assuntos</b>.</div>`;
    if (passo === 1) return `<h2>Como é a sua rotina de estudo?</h2>
      <div class="campo"><label>Dias da semana em que você vai estudar</label><div class="cr-chips">${DIAS_CURTO.map((d, i) => `<button class="cr-chip ${cfg.dias.includes(i) ? 'on' : ''}" data-dia="${i}">${d}</button>`).join('')}</div></div>
      <div class="row cr-campos"><div class="campo"><label>Horas de estudo por dia</label><select id="crHoras">${[1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8].map((h) => `<option value="${h}" ${h === cfg.horas ? 'selected' : ''}>${String(h).replace('.5', 'h30').replace(/^(\d+)$/, '$1h')}</option>`).join('')}</select></div>
      <div class="campo"><label>Matérias diferentes por dia</label><select id="crPorDia">${[1, 2, 3, 4, 5, 6].map((n) => `<option value="${n}" ${n === cfg.porDia ? 'selected' : ''}>${n}</option>`).join('')}</select></div></div>
      <div class="cr-info" id="crTempo"></div>`;
    if (passo === 2) return `<h2>Como você está em cada matéria?</h2>
      <p class="muted">Matéria em que você tem <b>dificuldade</b> aparece mais vezes; a que você <b>já domina</b> aparece menos. Marque a ⭐ nas matérias que você quer ver <b>com mais frequência</b> (as de maior peso na prova, por exemplo).</p>
      <div class="cr-mats">${mats.map((m) => `<div class="cr-mat"><span class="cr-mi">${m.ico || '📖'}</span><div class="cr-mn"><b>${esc(m.nome)}</b><small>${m.assuntos.length} assuntos</small></div>
        <div class="cr-seg">${Object.entries(NIVEL).map(([k, n]) => `<button class="${cfg.nivel[m.id] === k ? 'on' : ''} n-${k}" data-mat="${m.id}" data-niv="${k}">${n.nome}</button>`).join('')}</div>
        <button class="cr-star ${cfg.prio.includes(m.id) ? 'on' : ''}" data-star="${m.id}" title="Ver com mais frequência">⭐</button></div>`).join('')}</div>`;
    if (passo === 3) return `<h2>Revisão</h2>
      <p class="muted">Revisar é o que fixa o conteúdo. No dia de revisão, o app coloca <b>revisão + questões</b> dos assuntos estudados na semana e dos de 4 semanas antes (revisão espaçada).</p>
      <div class="campo"><label>Dia de revisão</label><div class="cr-chips">${[[5, 'Sábado'], [6, 'Domingo'], [-1, 'Sem dia fixo de revisão']].map(([v, n]) => `<button class="cr-chip ${cfg.revDia === v ? 'on' : ''}" data-rev="${v}">${n}</button>`).join('')}</div></div>
      <label class="check"><input type="checkbox" id="crReta" ${cfg.retaFinal ? 'checked' : ''}> Terminando o edital antes da prova, seguir com <b>revisão + questões</b> de todos os assuntos até o dia da prova (reta final)</label>`;
    // resumo
    const r = gerarPlano(cfg, mats, { edInicio: iso(segundaDa(parseISO(cfg.inicio) || hoje())) });
    const teoria = r.blocos.filter((b) => b.origem === 'cronograma');
    const sem = new Set(r.blocos.map((b) => b.semana)).size;
    const porMat = mats.map((m) => [m, teoria.filter((b) => b.mid === m.id).length]);
    const fim = r.fimTeoria ? parseISO(r.fimTeoria) : null;
    const aviso = cfg.prova && r.sobrou ? `<div class="cr-alerta">⚠ Com essa rotina, <b>${r.sobrou} assuntos</b> ficariam de fora até a prova. Volte e aumente as horas, as matérias por dia ou os dias de estudo.</div>`
      : cfg.prova && fim ? `<div class="cr-ok">✅ O edital inteiro fica pronto em <b>${ddmm(fim)}/${fim.getFullYear()}</b>${cfg.retaFinal ? ', e daí até a prova é reta final com revisão e questões' : ''}.</div>`
      : fim ? `<div class="cr-ok">✅ Nesse ritmo, você termina o edital em <b>${ddmm(fim)}/${fim.getFullYear()}</b> (${sem} semanas).</div>` : '';
    return `<h2>Resumo do seu cronograma</h2>
      <div class="cr-nums"><div><b>${sem}</b><small>semanas</small></div><div><b>${teoria.length}</b><small>blocos de teoria</small></div><div><b>${r.blocos.length - teoria.length}</b><small>blocos de revisão</small></div><div><b>${r.minutos} min</b><small>por bloco</small></div></div>
      ${aviso}
      <div class="cr-dist">${porMat.map(([m, n]) => `<div class="cr-dl"><span>${m.ico || '📖'} ${esc(m.nome)}${cfg.prio.includes(m.id) ? ' ⭐' : ''}</span><i style="--w:${Math.round((n / Math.max(1, ...porMat.map((x) => x[1]))) * 100)}%;--c:${m.cor || '#888'}"></i><small>${n} blocos</small></div>`).join('')}</div>
      <p class="muted" style="font-size:13.5px">Depois de gerado, você pode editar, mover ou excluir qualquer bloco no calendário, e refazer o cronograma quando quiser (o que já foi concluído é mantido).</p>`;
  };

  const desenha = () => {
    el.innerHTML = `<div class="${temaId !== 'padrao' ? `tema-wrap tema-${temaId}` : ''} cr-wrap">
      <div class="cr-topo">${T.selo ? `<span class="tema-selo">${T.selo} ${esc(c.curto)}</span>` : `<span class="pill">${esc(c.curto)}</span>`}<div><div class="mono up">Montar meu cronograma</div><div class="cr-tit">${esc(c.nome)}</div></div></div>
      <div class="cr-passos">${PASSOS.map((p, i) => `<div class="${i < passo ? 'ok' : i === passo ? 'on' : ''}"><b>${i < passo ? '✓' : i + 1}</b>${p}</div>`).join('')}</div>
      <div class="card cr-card">${corpo()}
        <div class="row cr-nav">${passo ? '<button class="btn sec" id="crVolta">‹ Voltar</button>' : voltar ? '<button class="btn sec" id="crSair">Cancelar</button>' : ''}<span class="sp"></span>
          ${passo < PASSOS.length - 1 ? '<button class="btn" id="crProx">Continuar ›</button>' : '<button class="btn" id="crGera">✅ Gerar meu cronograma</button>'}</div></div></div>`;
    const $ = (s) => el.querySelector(s);
    const tempo = () => { const t = $('#crTempo'); if (t) t.innerHTML = `⏱ Cada bloco terá cerca de <b>${Math.max(20, Math.round((cfg.horas * 60) / cfg.porDia / 5) * 5)} minutos</b> · <b>${cfg.dias.length} dias</b> por semana · <b>${String(cfg.horas * cfg.dias.length).replace('.5', 'h30')}${Number.isInteger(cfg.horas * cfg.dias.length) ? 'h' : ''}</b> de estudo por semana.`; };
    el.querySelectorAll('[data-dia]').forEach((b) => (b.onclick = () => { const i = +b.dataset.dia; cfg.dias = cfg.dias.includes(i) ? cfg.dias.filter((x) => x !== i) : [...cfg.dias, i].sort(); b.classList.toggle('on'); tempo(); }));
    if ($('#crHoras')) { $('#crHoras').onchange = (e) => { cfg.horas = +e.target.value; tempo(); }; $('#crPorDia').onchange = (e) => { cfg.porDia = +e.target.value; tempo(); }; tempo(); }
    el.querySelectorAll('[data-niv]').forEach((b) => (b.onclick = () => { cfg.nivel[b.dataset.mat] = b.dataset.niv; b.parentElement.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b)); }));
    el.querySelectorAll('[data-star]').forEach((b) => (b.onclick = () => { const id = b.dataset.star; cfg.prio = cfg.prio.includes(id) ? cfg.prio.filter((x) => x !== id) : [...cfg.prio, id]; b.classList.toggle('on'); }));
    el.querySelectorAll('[data-rev]').forEach((b) => (b.onclick = () => { cfg.revDia = +b.dataset.rev; el.querySelectorAll('[data-rev]').forEach((x) => x.classList.toggle('on', x === b)); }));
    const lerPasso = () => {
      if (passo === 0) {
        cfg.inicio = $('#crIni').value || iso(hoje()); cfg.prova = $('#crProva').value || '';
        if (cfg.prova && cfg.prova <= cfg.inicio) { toast('A data da prova precisa ser depois do início.', 'erro'); return false; }
      }
      if (passo === 1 && !cfg.dias.length) { toast('Escolha pelo menos um dia de estudo.', 'erro'); return false; }
      if (passo === 1 && cfg.revDia >= 0 && cfg.dias.length === 1 && cfg.dias[0] === cfg.revDia) cfg.revDia = -1;
      if (passo === 3) cfg.retaFinal = $('#crReta').checked;
      return true;
    };
    if ($('#crProx')) $('#crProx').onclick = () => { if (lerPasso()) { passo++; desenha(); window.scrollTo(0, 0); } };
    if ($('#crVolta')) $('#crVolta').onclick = () => { passo--; desenha(); };
    if ($('#crSair')) $('#crSair').onclick = () => voltar();
    if ($('#crGera')) $('#crGera').onclick = async (e) => {
      e.target.disabled = true; e.target.textContent = 'Gerando seu cronograma…';
      try { await salvarPlano(c, cfg, mats, meu, (t) => (e.target.textContent = t), { conhecidas: mats.map((m) => m.id) }); toast('Cronograma pronto! Bons estudos.'); location.hash = '#/calendario'; }
      catch (er) { console.error(er); toast('Não deu para gerar: ' + er.message, 'erro'); e.target.disabled = false; e.target.textContent = '✅ Gerar meu cronograma'; }
    };
  };
  desenha();
}

// ---------- gravação ----------
async function lotes(tabela, linhas, st, rot) {
  const out = [];
  for (let i = 0; i < linhas.length; i += 300) { st && st(`${rot} ${Math.min(i + 300, linhas.length)}/${linhas.length}…`); out.push(...(await db.insert(tabela, linhas.slice(i, i + 300)))); }
  return out;
}
// modo: 'refazer' (apaga os blocos pendentes da data de início em diante), 'reiniciar' (apaga todos os pendentes,
// inclusive os atrasados) ou 'zerar' (apaga todo o calendário e desmarca tudo, no edital e no conteúdo programático).
// foraDoCurso: 'historico' guarda como "fora do edital" os tópicos que não estão na lista do curso.
export async function salvarPlano(c, cfg, mats, meu, st = () => {}, { modo = 'refazer', foraDoCurso = '', conhecidas = null, excluidas = [] } = {}) {
  const banca = minhaBanca() || null;
  const fmt = (banca?.formato || (c.banca === 'cebraspe' ? 'ce' : 'me')) === 'ce' ? 'certo_errado' : 'multipla_escolha';
  let ed = meu;
  const plano = { ...cfg, gerado_em: new Date().toISOString(), curso: c.id, excluidas, conhecidas: conhecidas || meu?.plano?.conhecidas || mats.map((m) => m.id) };
  delete plano.excluidasSel;
  if (!ed) {
    st('Criando o edital do curso…');
    [ed] = await db.insert('editais', [{ user_id: S.user.id, concurso: c.nome, cargo: c.curto, banca: banca?.nome || null, formato: fmt, data_inicio: iso(segundaDa(parseISO(cfg.inicio) || hoje())), data_prova: cfg.prova || null, tema: c.tema || null, curso: c.id, plano }]);
  } else {
    const mud = { data_prova: cfg.prova || null, plano, tema: c.tema || ed.tema || null, curso: c.id };
    if (modo === 'zerar') mud.data_inicio = iso(segundaDa(parseISO(cfg.inicio) || hoje()));
    await db.update('editais', { id: 'eq.' + ed.id }, mud);
    ed = { ...ed, ...mud };
  }
  // tópicos: os que faltam no edital do aluno
  const tops = (await db.selectAll('topicos', { edital_id: 'eq.' + ed.id })) || [];
  const chave = (m, t) => norm(m) + '|' + norm(t);
  const mapa = new Map(tops.map((t) => [chave(t.materia, t.topico), t]));
  const novos = [];
  mats.forEach((m) => m.assuntos.forEach((a, k) => { if (!mapa.has(chave(m.nome, a))) novos.push({ user_id: S.user.id, edital_id: ed.id, materia: m.nome, topico: a, ordem: k }); }));
  if (novos.length) (await lotes('topicos', novos, st, 'Gravando assuntos')).forEach((t) => mapa.set(chave(t.materia, t.topico), t));
  // sincroniza o edital com a lista do curso: o que não está no curso vai para o histórico (fora do edital)
  if (foraDoCurso === 'historico') {
    const doCurso = new Set(); mats.forEach((m) => m.assuntos.forEach((a) => doCurso.add(chave(m.nome, a))));
    const sai = [...mapa.values()].filter((t) => !t.fora_do_edital && !doCurso.has(chave(t.materia, t.topico))).map((t) => t.id);
    const volta = [...mapa.values()].filter((t) => t.fora_do_edital && doCurso.has(chave(t.materia, t.topico))).map((t) => t.id);
    for (let i = 0; i < sai.length; i += 100) { st('Organizando o edital…'); await db.update('topicos', { id: 'in.(' + sai.slice(i, i + 100).join(',') + ')' }, { fora_do_edital: true }); }
    for (let i = 0; i < volta.length; i += 100) await db.update('topicos', { id: 'in.(' + volta.slice(i, i + 100).join(',') + ')' }, { fora_do_edital: false });
    for (const t of mapa.values()) { if (sai.includes(t.id)) t.fora_do_edital = true; if (volta.includes(t.id)) t.fora_do_edital = false; }
  }
  // zerar: desmarca todos os tópicos e as leituras do conteúdo programático
  if (modo === 'zerar') {
    const marcados = [...mapa.values()].filter((t) => t.concluido).map((t) => t.id);
    for (let i = 0; i < marcados.length; i += 100) { st('Desmarcando os tópicos…'); await db.update('topicos', { id: 'in.(' + marcados.slice(i, i + 100).join(',') + ')' }, { concluido: false }); }
    for (const t of mapa.values()) t.concluido = false;
    zerarLeituras();
  }
  // refazer: apaga os blocos não concluídos de hoje em diante e guarda o que já foi estudado
  const antigas = meu ? (await db.selectAll('tarefas', { edital_id: 'eq.' + ed.id })) || [] : [];
  const dataDe = (t) => iso(addDias(inicioSemana(ed.data_inicio, t.semana), DIAS.indexOf(t.dia)));
  const hojeI = iso(parseISO(cfg.inicio) || hoje());
  const apagar = antigas.filter((t) => modo === 'zerar' || (!t.concluido && (modo === 'reiniciar' || dataDe(t) >= hojeI))).map((t) => t.id);
  for (let i = 0; i < apagar.length; i += 100) { st('Limpando o cronograma antigo…'); await db.remove('tarefas', { id: 'in.(' + apagar.slice(i, i + 100).join(',') + ')' }); }
  const ficam = antigas.filter((t) => !apagar.includes(t.id));
  const topPorId = new Map([...mapa.values()].map((t) => [t.id, t]));
  const jaVistos = new Map(); // assunto -> partes já estudadas
  const estudadas = [];
  for (const t of ficam) { const tp = topPorId.get(t.topico_id); if (!tp || /^revis/i.test(t.origem || '') || /^revis/i.test(t.topico || '')) continue; const k = tp.materia + '|' + tp.topico; jaVistos.set(k, (jaVistos.get(k) || 0) + 1); estudadas.push({ data: dataDe(t), materia: tp.materia, topico: tp.topico, mid: mats.find((m) => m.nome === tp.materia)?.id }); }
  for (const tp of mapa.values()) if (tp.concluido) jaVistos.set(tp.materia + '|' + tp.topico, 99);
  st('Distribuindo os assuntos…');
  const r = gerarPlano(cfg, mats, { edInicio: ed.data_inicio, jaVistos, tarefasAntigas: estudadas.sort((a, b) => a.data.localeCompare(b.data)) });
  const ordemBase = {}; for (const t of ficam) { const k = t.semana + '|' + t.dia; ordemBase[k] = Math.max(ordemBase[k] ?? -1, t.ordem ?? 0); }
  const linhas = r.blocos.map((b) => { const k = b.semana + '|' + b.dia; return { user_id: S.user.id, edital_id: ed.id, topico_id: mapa.get(chave(b.materia, b.topicoBase))?.id || null, semana: b.semana, dia: b.dia, ordem: (ordemBase[k] ?? -1) + 1 + b.ordem, materia: b.materia, topico: b.topico, previsto: b.previsto, origem: b.origem, checklist: {}, concluido: false }; });
  await lotes('tarefas', linhas, st, 'Gravando blocos');
  st('Abrindo o calendário…');
  await db.update('profiles', { id: 'eq.' + S.user.id }, { edital_atual: ed.id }).catch(() => {});
  if (S.profile) S.profile.edital_atual = ed.id;
  await carregarTudo();
  if (S.edital?.id !== ed.id) await trocarEdital(ed.id).catch(() => {});
}

// Desmarca o que o aluno leu no Conteúdo programático (usado ao zerar o edital)
export function zerarLeituras() { try { localStorage.removeItem('risk-lidos-' + (S.user?.id || 'x')); } catch {} }

// Matérias que chegaram ao curso depois do último cronograma gerado
export function materiasNovas(c, mats) {
  const pl = S.edital?.plano;
  if (pl?.conhecidas) { const k = new Set(pl.conhecidas); return mats.filter((m) => !k.has(m.id)); }
  // sem referência confiável (edital importado ou criado à mão): não aponta nada como novo
  if (!S.edital?.curso || !S.tarefas.length) return [];
  const nomes = new Set((S.topicos || []).map((t) => norm(t.materia)));
  return mats.filter((m) => !nomes.has(norm(m.nome)));
}

// Automático: matéria nova no curso entra sozinha no cronograma (da data de hoje em diante), se o aluno deixou ligado
let verificando = false;
export async function incluirNovasAutomatico() {
  const ed = S.edital, pl = ed?.plano; if (verificando || !pl || pl.autoNovas === false || !S.tarefas.length) return 0;
  const c = cursoDoCronograma(); if (!c || (ed.curso && ed.curso !== c.id)) return 0;
  const todas = materiasDoPlano(c), novas = materiasNovas(c, todas); if (!novas.length) return 0;
  verificando = true;
  try {
    const exc = new Set(pl.excluidas || []);
    const mats = todas.filter((m) => !exc.has(m.id));
    const cfg = { ...padrao(mats, pl), inicio: iso(hoje()) };
    await salvarPlano(c, cfg, mats, ed, () => {}, { modo: 'refazer', conhecidas: todas.map((m) => m.id), excluidas: [...exc], foraDoCurso: pl.foraDoCurso || '' });
    toast(`Matéria nova no seu edital: ${novas.map((m) => m.nome).join(', ')}. Ela já foi incluída no seu cronograma.`);
    return novas.length;
  } catch (e) { console.error(e); return 0; } finally { verificando = false; }
}

// ---------- REINICIAR CRONOGRAMA: uma tela só, o aluno escolhe tudo e o app refaz o calendário ----------
export function reiniciar(el, { voltar } = {}) {
  const admin = S.profile?.role === 'admin' && !meuCurso();
  let c = cursoDoCronograma() || (admin ? CURSOS[0] : null);
  if (!c) { el.innerHTML = '<div class="card"><h2>Reiniciar cronograma</h2><p class="muted">Seu curso ainda não foi definido: fale com o administrador.</p></div>'; return; }
  const ant = S.edital?.plano || null;
  const amanha = iso(addDias(hoje(), 1));
  let cfg = padrao([], ant ? { ...ant, inicio: amanha } : { inicio: amanha });
  if (!ant) cfg.dias = [0, 1, 2, 3, 4];
  if (S.edital?.data_prova && !cfg.prova) cfg.prova = S.edital.data_prova;
  let modo = 'reiniciar', foraDoCurso = 'historico', autoNovas = ant?.autoNovas !== false;
  let excl = new Set(ant?.excluidas || []);
  let lg = ''; try { lg = JSON.parse(localStorage.getItem('risk-lingua')) || ''; } catch {}

  const desenha = () => {
    const mats = materiasDoPlano(c), novas = new Set(materiasNovas(c, mats).map((m) => m.id));
    const temLingua = mats.some((m) => m.id === 'lingua-estrangeira');
    const doCurso = new Set(); mats.forEach((m) => m.assuntos.forEach((a) => doCurso.add(norm(m.nome) + '|' + norm(a))));
    const fora = S.edital ? S.topicos.filter((t) => !t.fora_do_edital && !doCurso.has(norm(t.materia) + '|' + norm(t.topico))).length : 0;
    const sel = mats.filter((m) => !excl.has(m.id));
    const r = gerarPlano(cfg, sel, { edInicio: iso(segundaDa(parseISO(cfg.inicio) || hoje())) });
    const fim = r.fimTeoria ? parseISO(r.fimTeoria) : null;
    el.innerHTML = `<div class="rc">
      <div class="rc-cab"><div><div class="mono up">Calendário de estudos</div><h1>Reiniciar cronograma</h1>
        <p class="muted">Escolha como quer estudar a partir de agora. O app refaz o calendário inteiro com essas opções; você pode reiniciar de novo sempre que quiser.</p></div></div>
      <div class="rc-grade">
        <section class="card rc-sec"><h3><span>1</span>Datas</h3>
          ${admin ? `<div class="campo"><label>Curso</label><select id="rcCurso">${CURSOS.map((x) => `<option value="${x.id}" ${x.id === c.id ? 'selected' : ''}>${esc(x.nome)}</option>`).join('')}</select></div>` : `<div class="rc-curso">${esc(c.nome)}</div>`}
          <div class="row cr-campos"><div class="campo"><label>Começar em</label><input type="date" id="rcIni" value="${esc(cfg.inicio)}"></div>
          <div class="campo"><label>Data da prova (opcional)</label><input type="date" id="rcProva" value="${esc(cfg.prova)}"></div></div></section>
        <section class="card rc-sec"><h3><span>2</span>Rotina</h3>
          <div class="campo"><label>Dias de estudo</label><div class="cr-chips">${DIAS_CURTO.map((d, i) => `<button class="cr-chip ${cfg.dias.includes(i) ? 'on' : ''}" data-dia="${i}">${d}</button>`).join('')}</div></div>
          <div class="row cr-campos"><div class="campo"><label>Matérias por dia</label><select id="rcPorDia">${[1, 2, 3, 4, 5, 6].map((n) => `<option ${n === cfg.porDia ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
          <div class="campo"><label>Horas por dia</label><select id="rcHoras">${[1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8].map((h) => `<option value="${h}" ${h === cfg.horas ? 'selected' : ''}>${String(h).replace('.5', 'h30').replace(/^(\d+)$/, '$1h')}</option>`).join('')}</select></div>
          <div class="campo"><label>Dia de revisão</label><select id="rcRev">${[[5, 'Sábado'], [6, 'Domingo'], [-1, 'Sem dia fixo']].map(([v, n]) => `<option value="${v}" ${cfg.revDia === v ? 'selected' : ''}>${n}</option>`).join('')}</select></div></div></section>
        <section class="card rc-sec rc-larga"><h3><span>3</span>Matérias</h3>
          ${novas.size ? `<div class="rc-nova-aviso"><b>${novas.size === 1 ? 'Há 1 matéria nova' : `Há ${novas.size} matérias novas`} no seu edital.</b> Ela${novas.size > 1 ? 's estão marcadas' : ' está marcada'} para entrar no cronograma; desmarque se não quiser.</div>` : ''}
          ${temLingua ? `<div class="campo"><label>Língua estrangeira</label><div class="cr-chips">${[['en', 'Inglês'], ['es', 'Espanhol']].map(([v, n]) => `<button class="cr-chip ${lg === v ? 'on' : ''}" data-lg="${v}">${n}</button>`).join('')}</div>${lg ? '' : '<small class="muted">Escolha o idioma: só os tópicos dele entram no cronograma.</small>'}</div>` : ''}
          <div class="rc-mats">${mats.map((m) => `<label class="rc-mat ${novas.has(m.id) ? 'nova' : ''}"><input type="checkbox" data-mat="${m.id}" ${excl.has(m.id) ? '' : 'checked'}><i style="background:${m.cor || '#888'}"></i><span>${esc(m.nome)}<small>${m.assuntos.length} tópicos</small></span>${novas.has(m.id) ? '<em>nova</em>' : ''}</label>`).join('')}</div>
          <label class="check" style="margin-top:12px"><input type="checkbox" id="rcAuto" ${autoNovas ? 'checked' : ''}> Quando chegar matéria nova no meu curso, incluir no cronograma automaticamente</label></section>
        <section class="card rc-sec rc-larga"><h3><span>4</span>O que você já estudou</h3>
          <label class="rc-op"><input type="radio" name="rcModo" value="reiniciar" ${modo === 'reiniciar' ? 'checked' : ''}><span><b>Manter o que já concluí</b><small>Os blocos e tópicos concluídos ficam; o resto do calendário (inclusive atrasos) é refeito a partir da data escolhida.</small></span></label>
          <label class="rc-op"><input type="radio" name="rcModo" value="zerar" ${modo === 'zerar' ? 'checked' : ''}><span><b>Começar do zero</b><small>Apaga o calendário e desmarca tudo, no edital e no conteúdo programático. As questões e o histórico de desempenho são mantidos.</small></span></label>
          ${fora ? `<label class="check" style="margin-top:8px"><input type="checkbox" id="rcFora" ${foraDoCurso === 'historico' ? 'checked' : ''}> Guardar no histórico os ${fora} tópicos do meu edital que não estão na lista do curso (importados ou criados à mão)</label>` : ''}</section>
      </div>
      <div class="card rc-resumo"><div class="rc-nums"><div><b>${sel.length}</b><small>matérias</small></div><div><b>${cfg.porDia}</b><small>por dia</small></div><div><b>${Math.max(20, Math.round((cfg.horas * 60) / cfg.porDia / 5) * 5)} min</b><small>por bloco</small></div><div><b>${fim ? ddmm(fim) + '/' + String(fim.getFullYear()).slice(2) : '—'}</b><small>fim do edital</small></div></div>
        ${cfg.prova && r.sobrou ? `<div class="cr-alerta">Com essa rotina, ${r.sobrou} assuntos ficam de fora até a prova.</div>` : ''}
        <div class="row" style="margin-top:14px">${voltar ? '<button class="btn sec" id="rcSair">Cancelar</button>' : ''}<span class="sp"></span><button class="btn" id="rcOk">Reiniciar cronograma</button></div></div>
    </div>`;
    const $ = (q) => el.querySelector(q);
    const ler = () => { cfg.inicio = $('#rcIni').value || amanha; cfg.prova = $('#rcProva').value || ''; cfg.porDia = +$('#rcPorDia').value; cfg.horas = +$('#rcHoras').value; cfg.revDia = +$('#rcRev').value; autoNovas = $('#rcAuto').checked; modo = el.querySelector('[name=rcModo]:checked').value; foraDoCurso = $('#rcFora') ? ($('#rcFora').checked ? 'historico' : '') : foraDoCurso; };
    const refaz = () => { const y = scrollY; ler(); desenha(); scrollTo(0, y); };
    el.querySelectorAll('select, input[type=date], input[type=radio], #rcAuto, #rcFora').forEach((x) => (x.onchange = refaz));
    if ($('#rcCurso')) $('#rcCurso').onchange = (e) => { ler(); c = cursoInfo(e.target.value); excl = new Set(); desenha(); };
    el.querySelectorAll('[data-dia]').forEach((b) => (b.onclick = () => { const i = +b.dataset.dia; cfg.dias = cfg.dias.includes(i) ? cfg.dias.filter((x) => x !== i) : [...cfg.dias, i].sort(); refaz(); }));
    el.querySelectorAll('[data-lg]').forEach((b) => (b.onclick = () => { lg = b.dataset.lg; try { localStorage.setItem('risk-lingua', JSON.stringify(lg)); } catch {} refaz(); }));
    el.querySelectorAll('[data-mat]').forEach((x) => (x.onchange = () => { x.checked ? excl.delete(x.dataset.mat) : excl.add(x.dataset.mat); refaz(); }));
    if ($('#rcSair')) $('#rcSair').onclick = () => voltar();
    $('#rcOk').onclick = () => {
      ler();
      if (!cfg.dias.length) return toast('Escolha pelo menos um dia de estudo.', 'erro');
      if (!sel.length) return toast('Escolha pelo menos uma matéria.', 'erro');
      if (cfg.prova && cfg.prova <= cfg.inicio) return toast('A data da prova precisa ser depois do início.', 'erro');
      if (temLingua && !lg && !excl.has('lingua-estrangeira')) return toast('Escolha inglês ou espanhol em Língua estrangeira.', 'erro');
      if (cfg.revDia >= 0 && cfg.dias.length === 1 && cfg.dias[0] === cfg.revDia) cfg.revDia = -1;
      const vai = async (b) => {
        b.disabled = true;
        try {
          cfg.autoNovas = autoNovas; cfg.foraDoCurso = foraDoCurso;
          const mats = materiasDoPlano(c), escolhidas = mats.filter((m) => !excl.has(m.id));
          await salvarPlano(c, cfg, escolhidas, S.edital || null, (t) => (b.textContent = t), { modo, foraDoCurso, conhecidas: mats.map((m) => m.id), excluidas: [...excl] });
          toast(modo === 'zerar' ? 'Cronograma zerado e refeito. Bons estudos!' : 'Cronograma reiniciado. Bons estudos!'); location.hash = '#/calendario';
        } catch (e) { console.error(e); toast('Não deu para reiniciar: ' + e.message, 'erro'); b.disabled = false; b.textContent = 'Reiniciar cronograma'; }
      };
      if (modo === 'zerar') modal('<h3>Começar do zero?</h3><p>O calendário atual será apagado e todos os tópicos voltam desmarcados, no edital e no conteúdo programático. As questões resolvidas e o desempenho continuam salvos.</p><div class="row"><button class="btn sec" id="nao">Voltar</button><span class="sp"></span><button class="btn vermelho" id="sim">Zerar e refazer</button></div>', { onMount: (m, close) => { m.querySelector('#nao').onclick = close; m.querySelector('#sim').onclick = () => { close(); vai($('#rcOk')); }; } });
      else vai($('#rcOk'));
    };
  };
  desenha();
}

// Cartão de convite (calendário vazio e página inicial)
export function convite(c) {
  return `<div class="card cr-convite"><div class="cr-ci">🧭</div><div style="flex:1;min-width:220px"><h2 style="margin:0 0 4px">Monte o seu cronograma de estudos</h2>
    <p class="muted" style="margin:0">Responda 5 perguntas rápidas (dias, horas, matérias por dia, dificuldades e revisão) e o app gera o cronograma completo do edital ${c ? `de <b>${esc(c.curto)}</b>` : 'do seu curso'}, semana por semana.</p></div>
    <a class="btn" href="#/calendario?montar=1">Montar meu cronograma</a></div>`;
}
export { cursoInfo };
