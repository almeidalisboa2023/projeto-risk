// Leitura interativa: quadro colorido de matérias → índice de tópicos → texto com questões. Aberta a todos os alunos.
import { S, isAdmin } from '../state.js';
import { padronizar, minutosLeitura } from '../estetica.js';
import { esc, norm, iso, hoje } from '../util.js';
import { db } from '../backend.js';
import { toast, modal } from '../ui.js';
import { visiveis, materiasDe, acharLeitura, chaveQ } from '../leitura/index.js';
import { meuCurso, minhaBanca } from '../cursos.js';
import { TEMAS, temaAtual } from '../temas.js';
import { LETRA, embaralhar, intercalar, carregarHistorico, seloHistorico, registrar, htmlGabarito, htmlQuestao, responder, htmlFlash, cartoesAuto, ligarFlash, chaveDe, contarFlash } from '../questao.js';

// Padrão da banca do aluno: com banca de 4 alternativas (A a D), a múltipla escolha perde uma alternativa errada
// (sempre a mesma para cada questão) e o gabarito e as notas são reajustados.
function padraoBanca(q) {
  const b = minhaBanca();
  if (!b || b.alts !== 4 || !q.alts || q.alts.length <= 4) return q;
  const erradas = q.alts.map((_, k) => k).filter((k) => k !== q.r);
  const tira = erradas[parseInt(chaveQ(q.p), 36) % erradas.length];
  const ficam = q.alts.map((_, k) => k).filter((k) => k !== tira);
  return { ...q, alts: ficam.map((k) => q.alts[k]), r: ficam.indexOf(q.r), n: q.n ? ficam.map((k) => q.n[k]) : q.n };
}
const faixaCurso = () => {
  const c = meuCurso(); if (!c) return '';
  const b = minhaBanca();
  return `<div class="lt-curso"><span>🎓</span><div><b>${esc(c.nome)}</b><small>${b ? `Banca: ${esc(b.nome)} · questões no padrão ${esc(b.desc)}` : 'Banca ainda não definida: aparecem questões de todos os formatos'}</small></div></div>`;
};

const ler = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const gravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const chave = () => 'risk-lidos-' + (S.user?.id || 'x');
const lidos = () => new Set(ler(chave(), []));
let fonte = ler('risk-fonte', 17);

const POR_PAG = 10;

export async function render(el, q) {
  const [mid, aid] = String(q?.get('a') || '').split('/');
  const m0 = visiveis().find((m) => m.id === mid);
  if (!m0) return quadro(el);
  const mat = { ...m0, assuntos: m0.assuntos.map((a) => (a.quiz ? { ...a, quiz: a.quiz.map((x) => embaralhar(padraoBanca(x))) } : a)) };
  let idx = mat.assuntos.findIndex((a) => a.id === aid);
  if (idx < 0) idx = Math.max(0, mat.assuntos.findIndex((a) => a.id === ler('risk-ultimo-' + mat.id, '')));
  gravar('risk-ultimo-' + mat.id, mat.assuntos[idx].id);
  leitura(el, q, mat, idx);
}

// Matérias que aparecem no edital atual do aluno (qualquer edital)
function doMeuEdital() {
  const ids = new Set();
  for (const t of S.topicos || []) for (const m of materiasDe(t.materia)) ids.add(m.id);
  return ids;
}

function quadro(el) {
  const L = lidos(), meu = doMeuEdital();
  const ordem = [...visiveis()].sort((a, b) => (meu.has(b.id) ? 1 : 0) - (meu.has(a.id) ? 1 : 0));
  el.innerHTML = `${faixaCurso()}<div class="mono up">Leitura interativa</div><h1>Escolha a matéria</h1>
  <p class="muted" style="margin-top:-6px">Textos completos, com quadros, exemplos, pegadinhas e questões no fim de cada tópico. ${meu.size ? 'As matérias do seu edital aparecem primeiro.' : ''}</p>
  <div class="lt-materias">${ordem.map((m) => {
    const feitos = m.assuntos.filter((a) => L.has(m.id + '/' + a.id)).length, p = Math.round((feitos / m.assuntos.length) * 100);
    return `<a class="lt-mat" href="#/leitura?a=${m.id}/" style="--c:${m.cor}">
      <span class="lt-mat-ico">${m.ico}</span><b>${esc(m.nome)}</b>
      <small>${m.assuntos.length} tópicos · ${feitos} lidos</small>
      <div class="lt-mat-bar"><div style="width:${p}%"></div></div>
      ${meu.has(m.id) ? '<span class="lt-mat-tag">No seu edital</span>' : ''}</a>`;
  }).join('')}</div>`;
}

function leitura(el, q, mat, idx) {
  const a = mat.assuntos[idx], L = lidos(), k = mat.id + '/' + a.id;
  const nME = (a.quiz || []).filter((x) => x.alts).length, nCE = (a.quiz || []).length - nME;
  const feitos = mat.assuntos.filter((x) => L.has(mat.id + '/' + x.id)).length;
  const ir = (i) => `#/leitura?a=${mat.id}/${mat.assuntos[i].id}`;
  el.innerHTML = `<div class="row"><a class="btn sec mini" href="#/leitura">‹ Todas as matérias</a></div>
  <div class="lt-cab" style="--c:${mat.cor}"><span>${mat.ico}</span><div><div class="mono up">Leitura interativa${meuCurso() ? ' · ' + esc(meuCurso().curto) : ''}</div><h1 style="margin:0">${esc(mat.nome)}</h1></div></div>
  ${mat.recorte ? `<div class="lt-recorte">📋 <b>Recorte do seu edital:</b> ${esc(mat.recorte)}. Aparecem só os tópicos cobrados.</div>` : ''}
  <div class="lt-wrap" style="--c:${mat.cor}">
    <aside class="card lt-indice">
      <div class="mono up" style="margin:4px 0 6px">Ordem de estudo · ${feitos}/${mat.assuntos.length} lidos</div>
      <div class="lt-mat-bar" style="margin-bottom:10px"><div style="width:${Math.round((feitos / mat.assuntos.length) * 100)}%"></div></div>
      <select id="ltSel" class="lt-sel-mob">${mat.assuntos.map((x, i) => `<option value="${i}" ${i === idx ? 'selected' : ''}>${i + 1}. ${esc(x.titulo)}${L.has(mat.id + '/' + x.id) ? ' ✓' : ''}</option>`).join('')}</select>
      <ol class="lt-lista">${mat.assuntos.map((x, i) => `<li class="${i === idx ? 'on' : ''} ${L.has(mat.id + '/' + x.id) ? 'lido' : ''}"><a href="${ir(i)}">${esc(x.titulo)}</a></li>`).join('')}</ol>
    </aside>
    <article class="card lt-texto">
      <div class="row"><span class="pill">${idx + 1} de ${mat.assuntos.length}</span><span class="pill">${esc(a.arts || '')}</span><span class="pill lt-tempo" title="Leitura do texto essencial + aprofundamento">⏱ ~${minutosLeitura(a.html + (a.aprof || ''), 0)} min de leitura</span><span class="sp"></span>
        ${isAdmin() ? '<button class="btn sec mini" id="ltEditar" title="Só o administrador vê este botão">✏️ Editar conteúdo</button>' : ''}
        <button class="btn sec mini" id="ltMenos" title="Diminuir letra">A−</button><button class="btn sec mini" id="ltMais" title="Aumentar letra">A+</button></div>
      <h2 style="margin:10px 0 4px">${esc(a.titulo)}</h2>
      <p class="muted" style="font-size:12.5px;margin:0 0 8px">${a.editado ? 'Revisado pelo administrador' : 'Atualizado em ' + esc(mat.atualizado)} · <button class="linkbtn" id="ltErro">⚑ Reportar erro neste texto</button></p>
      <div class="abas lt-abas" id="ltAbas">
        <button data-aba="ess" class="on">📘 Essencial</button>
        ${a.aprof ? '<button data-aba="apr">🔬 Aprofundamento</button>' : ''}
        <button data-aba="jur" hidden>⚖ Jurisprudência</button>
        ${a.quiz?.length ? `<button data-aba="qst">🎯 Questões (${a.quiz.length})</button>` : ''}
      </div>
      <div class="lt-corpo" style="font-size:${fonte}px">
        <section data-pane="ess">${a.html}</section>
        ${a.aprof ? `<section data-pane="apr" hidden>${a.aprof}</section>` : ''}
        <section data-pane="jur" hidden><p class="muted">Súmulas e decisões dos tribunais superiores que mais caem sobre este tópico. Confira sempre se houve mudança recente de entendimento.</p></section>
      </div>
      ${a.quiz?.length ? `<section data-pane="qst" hidden>${blocoQuiz(a)}</section>` : ''}
      ${mat.lei ? `<p class="muted" style="font-size:13px;margin-top:18px">Material de estudo do Projeto R.I.S.K. Confira sempre o <a href="${mat.lei}" target="_blank" rel="noopener">texto oficial atualizado</a>.</p>` : ''}
      <div class="row" style="margin-top:12px">
        <button class="btn ${L.has(k) ? 'sec' : ''}" id="ltLido">${L.has(k) ? '✓ Lido (desmarcar)' : 'Marcar como lido'}</button><span class="sp"></span>
        ${idx > 0 ? `<a class="btn sec" href="${ir(idx - 1)}">‹ Anterior</a>` : ''}${idx < mat.assuntos.length - 1 ? `<a class="btn sec" href="${ir(idx + 1)}">Próximo ›</a>` : ''}
      </div>
    </article>
  </div>`;

  const $ = (s) => el.querySelector(s);
  // padrão visual (quadros de lei, caixas, marca-texto) em qualquer texto, inclusive os vindos de PDF
  padronizar($('[data-pane="ess"]'), $('[data-pane="apr"]'));
  // Jurisprudência: junta os blocos espalhados no texto numa aba própria
  const jur = $('[data-pane="jur"]');
  el.querySelectorAll('[data-pane="ess"] .lt-juris, [data-pane="apr"] .lt-juris').forEach((j) => jur.appendChild(j));
  // jurisprudência comentada fica no texto e ganha uma cópia na aba de jurisprudência
  el.querySelectorAll('[data-pane="ess"] .lt-jc, [data-pane="apr"] .lt-jc').forEach((j) => jur.appendChild(j.cloneNode(true)));
  if (jur.querySelector('.lt-juris, .lt-jc')) $('[data-aba="jur"]').hidden = false;
  el.querySelectorAll('#ltAbas [data-aba]').forEach((b) => (b.onclick = () => {
    el.querySelectorAll('#ltAbas [data-aba]').forEach((y) => y.classList.toggle('on', y === b));
    el.querySelectorAll('[data-pane]').forEach((p) => (p.hidden = p.dataset.pane !== b.dataset.aba));
  }));
  if (typeof a.montar === 'function') a.montar(el);
  $('#ltErro').onclick = () => modal(`<h3>Reportar erro</h3><p class="muted" style="font-size:14px">${esc(mat.nome)} › ${esc(a.titulo)}</p>
    <textarea id="erT" style="min-height:120px" placeholder="Descreva o erro: o trecho, o que está errado e, se souber, a fonte correta."></textarea><button class="btn" id="erE" style="margin-top:8px">Enviar</button>`, {
    onMount: (m, close) => (m.querySelector('#erE').onclick = async () => {
      const t = m.querySelector('#erT').value.trim(); if (!t) return toast('Descreva o erro.', 'erro');
      try { await db.insert('reportes', [{ user_id: S.user.id, texto: `[Leitura · ${mat.nome} › ${a.titulo}] ${t}` }]); toast('Obrigado! O erro foi enviado para revisão.'); close(); } catch (e) { toast(e.message, 'erro'); }
    }),
  });
  const fonteAjusta = (d) => { fonte = Math.min(24, Math.max(14, fonte + d)); gravar('risk-fonte', fonte); $('.lt-corpo').style.fontSize = fonte + 'px'; };
  $('#ltMenos').onclick = () => fonteAjusta(-1);
  $('#ltMais').onclick = () => fonteAjusta(1);
  $('#ltSel').onchange = () => { location.hash = ir(Number($('#ltSel').value)); };
  // Flashcards: os do conteúdo, ou um baralho automático com os itens de Certo/Errado
  const ess = $('[data-pane="ess"]');
  if (!ess.querySelector('.lt-flash') && a.quiz?.length) ess.insertAdjacentHTML('beforeend', htmlFlash(cartoesAuto(a.quiz), '🃏 Revisão rápida em flashcards: clique no cartão para ver a resposta'));
  const ctx = contexto(mat, a);
  const ligar = () => ligarFlash(el, ctx);
  if (S.user && !S.flashFeitos) contarFlash().then(ligar); else ligar();
  if (a.quiz?.length) carregarHistorico(ctx).then(() => { const ja = questoesDoPdf(el, ctx); perguntasNoTexto(el, ctx, ja); quiz(el, mat, a, ctx); });
  if (isAdmin()) $('#ltEditar').onclick = () => editar(el, q, mat, a);
  $('#ltLido').onclick = () => { const s = lidos(); s.has(k) ? s.delete(k) : s.add(k); gravar(chave(), [...s]); render(el, q); };
}


// Bloco de questões (usado na leitura e nas apostilas)
export function blocoQuiz(a) {
  const nME = (a.quiz || []).filter((x) => x.alts).length, nCE = (a.quiz || []).length - nME;
  const tid = temaAtual(), T = TEMAS[tid] || {};
  const cab = tid !== 'padrao' && S.edital ? `<div class="tema-topo"><span class="tema-selo">${T.selo || ''} ${esc(S.edital.concurso)}</span><div><div class="tema-tit">Treino de questões · <span>${esc(T.titulo || '')}</span></div><div class="tema-sub">${esc(a.titulo || '')}</div></div></div>` : '<h3>🎯 Teste seu conhecimento</h3>';
  return `<div class="lt-quiz ${tid !== 'padrao' ? 'tema-wrap tema-' + tid + ' lt-qtema' : ''}">${cab}
        <p class="muted" style="margin-top:0">${nCE} de Certo ou Errado${nME ? ` e ${nME} de múltipla escolha` : ''}. <span id="ltPlacar"></span></p>
        <div class="row lt-qbar">${nME && nCE ? `<select id="ltTipo"><option value="">Todos os tipos</option><option value="ce">Só Certo/Errado</option><option value="me">Só múltipla escolha</option></select>` : ''}
          <select id="ltHist"><option value="">Todas as questões</option><option value="novas">Só as que nunca respondi</option><option value="erradas">Só as que errei</option><option value="semacerto">Esconder as que já acertei</option></select>
          <button class="btn sec mini" id="ltMist">🔀 Embaralhar</button><span class="sp"></span><span class="muted" style="font-size:13px" id="ltPag"></span>
          <button class="btn sec mini" id="ltAnt">‹</button><button class="btn sec mini" id="ltProx">›</button></div>
        <div id="ltLista"></div>
        <div class="row" style="margin-top:12px"><button class="btn sec mini" id="ltAnt2">‹ Anteriores</button><button class="btn sec mini" id="ltProx2">Próximas ›</button><span class="sp"></span>
          <span class="muted" style="font-size:13px" id="ltSalvar"></span></div>
        <p class="muted" style="font-size:13px;margin-bottom:0">Cada resposta entra sozinha nas suas questões do dia, nos pontos fracos e nas revisões.</p></div>`;
}

// Contexto das questões de um tópico (para histórico e contagem)
function contexto(mat, a) {
  const tp = (S.topicos || []).find((t) => { const r = acharLeitura(t.materia, t.topico); return r?.a && r.mat.id === mat.id && r.a.id === a.id; });
  return { mat, a, topicoId: tp?.id || null, materia: tp?.materia || mat.nome };
}

// Questões dentro do texto: um "Pare e responda" depois de algumas seções (prefere as que o aluno ainda não acertou)
// Questões que estavam no meio do PDF: aparecem no mesmo lugar, para responder (marcador .lt-qpdf com a chave do enunciado)
function questoesDoPdf(el, ctx) {
  const usadas = new Set();
  const q = ctx.a.quiz || [];
  el.querySelectorAll('[data-pane="ess"] .lt-qpdf[data-k]').forEach((mk) => {
    const i = q.findIndex((x) => chaveQ(x.p) === mk.dataset.k); if (i < 0) { mk.remove(); return; }
    usadas.add(i);
    const box = document.createElement('div'); box.className = 'lt-qin lt-q'; box.dataset.q = i;
    box.innerHTML = `<b class="lt-tit">🎯 Questão do material</b>` + htmlQuestao(q[i], ctx);
    mk.replaceWith(box);
    box.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => { if (box.dataset.feito) return; box.dataset.feito = 1; registrar(ctx, q[i], responder(box, q[i], b.dataset.r)); }));
  });
  if (usadas.size) el.querySelectorAll('.lt-q-aviso').forEach((x) => x.remove());
  return usadas;
}

function perguntasNoTexto(el, ctx, ja = new Set()) {
  const ess = el.querySelector('[data-pane="ess"]'); if (!ess || ess.querySelector('.lt-qin:not([data-pdf])') || ja.size) return;
  const marcadores = [...ess.querySelectorAll('.lt-pare')];
  const h3 = [...ess.querySelectorAll(':scope > h3')];
  const pontos = marcadores.length ? marcadores : h3.filter((_, i) => i > 0 && i % 2 === 0);
  if (!pontos.length && h3.length > 1) pontos.push(h3[h3.length - 1]);
  const q = ctx.a.quiz; if (!q?.length || !pontos.length) return;
  const nao = q.map((_, i) => i).filter((i) => !ctx.hist.get(chaveDe(ctx, q[i]))?.acertou);
  const pool = intercalar(q, nao.length >= pontos.length ? nao : q.map((_, i) => i));
  pontos.slice(0, 8).forEach((p, k) => {
    const i = pool[k]; if (i === undefined) return;
    const box = document.createElement('div'); box.className = 'lt-qin lt-q'; box.dataset.q = i;
    box.innerHTML = `<b class="lt-tit">🎯 Pare e responda</b>` + htmlQuestao(q[i], ctx);
    p.before(box);
    box.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => { if (box.dataset.feito) return; box.dataset.feito = 1; registrar(ctx, q[i], responder(box, q[i], b.dataset.r)); }));
  });
}

// Questões: páginas de 10, filtros (tipo e histórico), embaralhar, Certo/Errado e múltipla escolha
export function quiz(el, mat, a, ctx0) {
  const $ = (s) => el.querySelector(s);
  const ctx = ctx0 || contexto(mat, a);
  if (!ctx.hist) { carregarHistorico(ctx).then(() => quiz(el, mat, a, ctx)); return; }
  const resp = new Map(); // índice da questão → resposta dada
  let ordem = intercalar(a.quiz, a.quiz.map((_, i) => i)), pag = 0;
  const hist = (i) => ctx.hist.get(chaveDe(ctx, a.quiz[i]));
  const filtrada = () => {
    const t = $('#ltTipo')?.value, h = $('#ltHist')?.value;
    return ordem.filter((i) => (!t || (t === 'me') === !!a.quiz[i].alts)
      && (!h || (h === 'novas' && !hist(i)) || (h === 'erradas' && hist(i) && !hist(i).acertou) || (h === 'semacerto' && !hist(i)?.acertou)));
  };
  const placar = () => {
    const c = [...resp.values()].filter((v) => v.ok).length;
    $('#ltPlacar').textContent = resp.size ? `Placar: ${c}/${resp.size} (${Math.round((100 * c) / resp.size)}%)` : '';
  };
  ctx.aoContar = (n) => { const st = $('#ltSalvar'); if (st) st.textContent = `✓ ${n} ${n === 1 ? 'resposta contada' : 'respostas contadas'} nas questões de hoje`; };
  const desenhar = () => {
    const lista = filtrada(), tot = Math.max(1, Math.ceil(lista.length / POR_PAG));
    pag = Math.min(pag, tot - 1);
    const pedaco = lista.slice(pag * POR_PAG, pag * POR_PAG + POR_PAG);
    $('#ltLista').innerHTML = pedaco.map((i, k) => `<div class="lt-q" data-q="${i}">${htmlQuestao(a.quiz[i], ctx, pag * POR_PAG + k + 1)}</div>`).join('') || '<p class="muted">Nenhuma questão com esse filtro.</p>';
    $('#ltPag').textContent = lista.length ? `${pag * POR_PAG + 1}–${Math.min(lista.length, (pag + 1) * POR_PAG)} de ${lista.length}` : '';
    ['#ltAnt', '#ltAnt2'].forEach((s) => ($(s).disabled = pag === 0));
    ['#ltProx', '#ltProx2'].forEach((s) => ($(s).disabled = pag >= tot - 1));
    el.querySelectorAll('#ltLista .lt-q').forEach((box) => {
      const i = Number(box.dataset.q);
      if (resp.has(i)) responder(box, a.quiz[i], resp.get(i).r);
      box.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => {
        if (resp.has(i)) return;
        const ok = responder(box, a.quiz[i], b.dataset.r);
        resp.set(i, { r: b.dataset.r, ok }); placar(); registrar(ctx, a.quiz[i], ok);
        box.querySelector('.lt-q-res').insertAdjacentHTML('beforeend', '<div><button class="linkbtn" data-de-novo>Responder de novo</button></div>');
        box.querySelector('[data-de-novo]').onclick = () => { resp.delete(i); desenhar(); placar(); };
      }));
    });
  };
  const ir = (d) => { pag += d; desenhar(); $('.lt-quiz').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  $('#ltAnt').onclick = $('#ltAnt2').onclick = () => ir(-1);
  $('#ltProx').onclick = $('#ltProx2').onclick = () => ir(1);
  if ($('#ltTipo')) {
    const b = minhaBanca(); if (b) $('#ltTipo').value = b.formato; // padrão da banca do aluno; ele pode trocar
    $('#ltTipo').onchange = () => { pag = 0; desenhar(); };
  }
  $('#ltHist').onchange = () => { pag = 0; desenhar(); };
  $('#ltMist').onclick = () => { ordem = intercalar(a.quiz, ordem.map((i) => [Math.random(), i]).sort((x, y) => x[0] - y[0]).map((x) => x[1])); pag = 0; desenhar(); };
  desenhar();
}

// ---------- edição do texto pelo administrador ----------
// Edita o texto "cru" do tópico (sem as questões e marcações automáticas) e grava em leitura_edicoes: vale para todos os alunos.
const limparEdicao = (html) => {
  const t = document.createElement('template'); t.innerHTML = html;
  t.content.querySelectorAll('script,iframe,object,embed,style,link,meta').forEach((x) => x.remove());
  t.content.querySelectorAll('*').forEach((x) => [...x.attributes].forEach((at) => { if (/^on/i.test(at.name) || /javascript:/i.test(at.value) || at.name === 'contenteditable') x.removeAttribute(at.name); }));
  return t.innerHTML.replace(/<p>\s*(<br>)?\s*<\/p>/g, '').trim();
};
function editar(el, q, mat, a) {
  const corpo = el.querySelector('.lt-corpo');
  el.querySelectorAll('[data-pane="qst"], #ltAbas').forEach((x) => (x.hidden = true));
  const editado = (S.edicoes || []).some((e) => e.id === mat.id + '/' + a.id);
  corpo.innerHTML = `<div class="ed-barra">
      <button data-c="bold" title="Negrito"><b>B</b></button>
      <button data-m="mark" title="Marca-texto">🖍 Destacar</button>
      <button data-b="h3" title="Título da seção">Título</button>
      <button data-b="p" title="Parágrafo normal">¶ Texto</button>
      <button data-c="insertUnorderedList" title="Lista">• Lista</button>
      <button data-x="lt-peg" title="Caixa de atenção">⚠ Atenção</button>
      <button data-x="lt-dica" title="Caixa de dica">💡 Dica</button>
      <button data-x="lt-ex" title="Caixa de exemplo">✍ Exemplo</button>
      <button data-x="lt-lei" title="Quadro de texto da lei">📜 Lei</button>
      <button data-c="undo" title="Desfazer">↶</button>
      <button data-html title="Editar o código HTML">&lt;/&gt;</button>
    </div>
    <div class="ed-area" contenteditable="true">${a.html}</div>
    <textarea class="ed-cod" hidden></textarea>
    <div class="row" style="margin-top:10px"><button class="btn sec" id="edCanc">Cancelar</button>
      ${editado ? '<button class="btn sec" id="edVolta" title="Apaga a edição e volta ao texto original do app">Restaurar original</button>' : ''}
      <span class="sp"></span><span class="muted" style="font-size:12.5px">Vale para todos os alunos.</span><button class="btn verde" id="edOk">Salvar</button></div>`;
  const area = corpo.querySelector('.ed-area'), cod = corpo.querySelector('.ed-cod');
  const bloco = () => { let n = getSelection().anchorNode; while (n && n.parentNode !== area) n = n.parentNode; return n && n !== area ? n : null; };
  corpo.querySelectorAll('.ed-barra button').forEach((b) => (b.onmousedown = (ev) => ev.preventDefault()));
  corpo.querySelectorAll('[data-c]').forEach((b) => (b.onclick = () => document.execCommand(b.dataset.c)));
  corpo.querySelectorAll('[data-b]').forEach((b) => (b.onclick = () => document.execCommand('formatBlock', false, b.dataset.b)));
  corpo.querySelector('[data-m]').onclick = () => {
    const s = getSelection(); if (!s.rangeCount || s.isCollapsed) return toast('Selecione o trecho que quer destacar.', 'erro');
    const r = s.getRangeAt(0), mk = document.createElement('mark'); mk.className = 'lt-hl';
    try { r.surroundContents(mk); } catch { toast('Selecione um trecho dentro de um mesmo parágrafo.', 'erro'); }
  };
  const TIT = { 'lt-peg': '⚠ Atenção', 'lt-dica': '💡 Dica de memorização', 'lt-ex': '✍ Exemplo', 'lt-lei': '📜 Texto da lei' };
  corpo.querySelectorAll('[data-x]').forEach((b) => (b.onclick = () => {
    const n = bloco(); if (!n) return toast('Clique dentro do parágrafo que vai virar caixa.', 'erro');
    if (n.nodeType === 1 && n.classList.contains(b.dataset.x)) { n.replaceWith(...[...n.childNodes].filter((c) => !c.classList?.contains('lt-tit'))); return; }
    const d = document.createElement('div'); d.className = b.dataset.x; d.innerHTML = `<b class="lt-tit">${TIT[b.dataset.x]}</b> `;
    n.before(d); d.appendChild(n);
  }));
  corpo.querySelector('[data-html]').onclick = () => {
    if (cod.hidden) { cod.value = area.innerHTML; cod.hidden = false; area.hidden = true; }
    else { area.innerHTML = cod.value; cod.hidden = true; area.hidden = false; }
  };
  const volta = () => render(el, q);
  corpo.querySelector('#edCanc').onclick = volta;
  const id = mat.id + '/' + a.id;
  corpo.querySelector('#edVolta')?.addEventListener('click', async () => {
    if (!confirm('Apagar a edição e voltar ao texto original deste tópico?')) return;
    try { await db.remove('leitura_edicoes', { id: 'eq.' + id }); S.edicoes = (S.edicoes || []).filter((e) => e.id !== id); toast('Texto original restaurado.'); volta(); } catch (er) { toast(er.message, 'erro'); }
  });
  corpo.querySelector('#edOk').onclick = async (ev) => {
    const html = limparEdicao(cod.hidden ? area.innerHTML : cod.value);
    if (html.replace(/<[^>]+>/g, '').trim().length < 20) return toast('O texto ficou vazio.', 'erro');
    ev.target.disabled = true;
    const reg = { id, html, editado_por: S.user.id, atualizado_em: new Date().toISOString() };
    try {
      await db.insert('leitura_edicoes', [reg], { upsert: true, onConflict: 'id' });
      S.edicoes = [...(S.edicoes || []).filter((e) => e.id !== id), reg];
      toast('Texto salvo. Já vale para todos os alunos.'); volta();
    } catch (er) { ev.target.disabled = false; toast(/leitura_edicoes/.test(er.message) ? 'Rode a atualização 15 no Supabase antes de editar.' : er.message, 'erro'); }
  };
}
