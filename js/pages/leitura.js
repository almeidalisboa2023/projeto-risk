// Leitura interativa: quadro colorido de matérias → índice de tópicos → texto com questões. Aberta a todos os alunos.
import { S } from '../state.js';
import { esc, norm, iso, hoje } from '../util.js';
import { db } from '../backend.js';
import { toast, modal } from '../ui.js';
import { visiveis, materiasDe, acharLeitura, chaveQ } from '../leitura/index.js';
import { meuCurso, minhaBanca } from '../cursos.js';

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

const LETRA = 'ABCDE';
const POR_PAG = 10;

export async function render(el, q) {
  const [mid, aid] = String(q?.get('a') || '').split('/');
  const m0 = visiveis().find((m) => m.id === mid);
  if (!m0) return quadro(el);
  const mat = { ...m0, assuntos: m0.assuntos.map((a) => (a.quiz ? { ...a, quiz: a.quiz.map(padraoBanca) } : a)) };
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
      <div class="row"><span class="pill">${idx + 1} de ${mat.assuntos.length}</span><span class="pill">${esc(a.arts || '')}</span><span class="sp"></span>
        <button class="btn sec mini" id="ltMenos" title="Diminuir letra">A−</button><button class="btn sec mini" id="ltMais" title="Aumentar letra">A+</button></div>
      <h2 style="margin:10px 0 4px">${esc(a.titulo)}</h2>
      <p class="muted" style="font-size:12.5px;margin:0 0 8px">Atualizado em ${esc(mat.atualizado)} · <button class="linkbtn" id="ltErro">⚑ Reportar erro neste texto</button></p>
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
      ${a.quiz?.length ? `<section data-pane="qst" hidden><div class="lt-quiz"><h3>🎯 Teste seu conhecimento</h3>
        <p class="muted" style="margin-top:0">${nCE} de Certo ou Errado${nME ? ` e ${nME} de múltipla escolha` : ''}. <span id="ltPlacar"></span></p>
        <div class="row lt-qbar">${nME && nCE ? `<select id="ltTipo"><option value="">Todas</option><option value="ce">Só Certo/Errado</option><option value="me">Só múltipla escolha</option></select>` : ''}
          <button class="btn sec mini" id="ltMist">🔀 Embaralhar</button><span class="sp"></span><span class="muted" style="font-size:13px" id="ltPag"></span>
          <button class="btn sec mini" id="ltAnt">‹</button><button class="btn sec mini" id="ltProx">›</button></div>
        <div id="ltLista"></div>
        <div class="row" style="margin-top:12px"><button class="btn sec mini" id="ltAnt2">‹ Anteriores</button><button class="btn sec mini" id="ltProx2">Próximas ›</button><span class="sp"></span>
          <button class="btn mini" id="ltSalvar" disabled>Salvar no meu desempenho</button></div>
        <p class="muted" style="font-size:13px;margin-bottom:0">Salve quando quiser: entram as questões respondidas desde o último salvamento, e o resultado vai para os seus pontos fracos e revisões.</p></div></section>` : ''}
      ${mat.lei ? `<p class="muted" style="font-size:13px;margin-top:18px">Material de estudo do Projeto R.I.S.K. Confira sempre o <a href="${mat.lei}" target="_blank" rel="noopener">texto oficial atualizado</a>.</p>` : ''}
      <div class="row" style="margin-top:12px">
        <button class="btn ${L.has(k) ? 'sec' : ''}" id="ltLido">${L.has(k) ? '✓ Lido (desmarcar)' : 'Marcar como lido'}</button><span class="sp"></span>
        ${idx > 0 ? `<a class="btn sec" href="${ir(idx - 1)}">‹ Anterior</a>` : ''}${idx < mat.assuntos.length - 1 ? `<a class="btn sec" href="${ir(idx + 1)}">Próximo ›</a>` : ''}
      </div>
    </article>
  </div>`;

  const $ = (s) => el.querySelector(s);
  // Jurisprudência: junta os blocos espalhados no texto numa aba própria
  const jur = $('[data-pane="jur"]');
  el.querySelectorAll('[data-pane="ess"] .lt-juris, [data-pane="apr"] .lt-juris').forEach((j) => jur.appendChild(j));
  if (jur.querySelector('.lt-juris')) $('[data-aba="jur"]').hidden = false;
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
  if (a.quiz?.length) quiz(el, mat, a);
  $('#ltLido').onclick = () => { const s = lidos(); s.has(k) ? s.delete(k) : s.add(k); gravar(chave(), [...s]); render(el, q); };
}

// Questões: páginas de 10, filtro por tipo, embaralhar, Certo/Errado e múltipla escolha (A a E)
function quiz(el, mat, a) {
  const $ = (s) => el.querySelector(s);
  const resp = new Map(); // índice da questão → acertou?
  let salvas = new Set(), ordem = a.quiz.map((_, i) => i), pag = 0;
  const filtrada = () => { const t = $('#ltTipo')?.value; return ordem.filter((i) => !t || (t === 'me') === !!a.quiz[i].alts); };
  const placar = () => {
    const c = [...resp.values()].filter(Boolean).length;
    $('#ltPlacar').textContent = resp.size ? `Placar: ${c}/${resp.size} (${Math.round((100 * c) / resp.size)}%)` : '';
    $('#ltSalvar').disabled = ![...resp.keys()].some((i) => !salvas.has(i));
  };
  const item = (i, n) => {
    const x = a.quiz[i];
    const op = x.alts
      ? `<div class="lt-alts">${x.alts.map((t, k) => `<button class="lt-alt" data-r="${k}"><b>${LETRA[k]}</b> ${esc(t)}</button>`).join('')}</div>`
      : `<div class="row"><button class="btn sec mini" data-r="1">Certo</button><button class="btn sec mini" data-r="0">Errado</button></div>`;
    return `<div class="lt-q" data-q="${i}"><p><span class="mono">${n}.</span> ${x.alts ? '<span class="lt-tipo">múltipla escolha</span> ' : ''}${esc(x.p)}</p>${op}<div class="lt-q-res"></div></div>`;
  };
  const mostrar = (i, box, r) => {
    const x = a.quiz[i], ok = x.alts ? Number(r) === x.r : (r === '1') === x.c;
    box.querySelectorAll('[data-r]').forEach((y) => { y.disabled = true; y.classList.toggle('lt-marcado', y.dataset.r === String(r)); if (x.alts && Number(y.dataset.r) === x.r) y.classList.add('lt-certa'); });
    box.classList.add(ok ? 'ok' : 'erro');
    const gab = x.alts ? `letra <b>${LETRA[x.r]}</b>` : `<b>${x.c ? 'CERTO' : 'ERRADO'}</b>`;
    const notas = x.alts && x.n ? `<ul class="lt-gn">${x.alts.map((t, k) => `<li class="${k === x.r ? 'ok' : ''}"><b>${LETRA[k]}</b> ${k === x.r ? '✔' : '✘'} ${esc(x.n[k] || '')}</li>`).join('')}</ul>` : '';
    const corpo = x.x
      ? `<div class="lt-gab"><p><b>Por quê:</b> ${esc(x.x)}</p>${x.pg ? `<p class="lt-gpg"><b>⚠ Pegadinha:</b> ${esc(x.pg)}</p>` : ''}${notas}${x.e ? `<p class="lt-gf">📌 ${esc(x.e)}</p>` : ''}</div>`
      : ` ${esc(x.e)}`;
    box.querySelector('.lt-q-res').innerHTML = `<b>${ok ? '✅ Você acertou!' : '❌ Não foi dessa vez.'}</b> Gabarito: ${gab}.${corpo}<div><button class="linkbtn" data-de-novo>Responder de novo</button></div>`;
    box.querySelector('[data-de-novo]').onclick = () => { resp.delete(i); salvas.delete(i); box.dataset.r = ''; desenhar(); placar(); };
    return ok;
  };
  const desenhar = () => {
    const lista = filtrada(), tot = Math.max(1, Math.ceil(lista.length / POR_PAG));
    pag = Math.min(pag, tot - 1);
    const pedaco = lista.slice(pag * POR_PAG, pag * POR_PAG + POR_PAG);
    $('#ltLista').innerHTML = pedaco.map((i, k) => item(i, pag * POR_PAG + k + 1)).join('') || '<p class="muted">Nenhuma questão desse tipo.</p>';
    $('#ltPag').textContent = `${pag * POR_PAG + 1}–${Math.min(lista.length, (pag + 1) * POR_PAG)} de ${lista.length}`;
    ['#ltAnt', '#ltAnt2'].forEach((s) => ($(s).disabled = pag === 0));
    ['#ltProx', '#ltProx2'].forEach((s) => ($(s).disabled = pag >= tot - 1));
    el.querySelectorAll('#ltLista .lt-q').forEach((box) => {
      const i = Number(box.dataset.q);
      if (resp.has(i)) mostrar(i, box, box.dataset.r || $(`#ltLista`).dataset['r' + i]);
      box.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => {
        if (resp.has(i)) return;
        $('#ltLista').dataset['r' + i] = b.dataset.r;
        resp.set(i, mostrar(i, box, b.dataset.r)); placar();
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
  $('#ltMist').onclick = () => { ordem = ordem.map((i) => [Math.random(), i]).sort((x, y) => x[0] - y[0]).map((x) => x[1]); pag = 0; desenhar(); };
  $('#ltSalvar').onclick = async () => {
    const novas = [...resp.keys()].filter((i) => !salvas.has(i));
    const feitas = novas.length, acertos = novas.filter((i) => resp.get(i)).length;
    if (!feitas) return;
    // liga ao tópico do edital do aluno que corresponde a esta leitura, se houver
    const tp = (S.topicos || []).find((t) => { const r = acharLeitura(t.materia, t.topico); return r?.a && r.mat.id === mat.id && r.a.id === a.id; });
    $('#ltSalvar').disabled = true;
    try {
      const [log] = await db.insert('question_logs', [{ user_id: S.user.id, edital_id: S.edital?.id || null, topico_id: tp?.id || null, materia: tp?.materia || mat.nome, data: iso(hoje()), feitas, acertos, origem: 'app' }]);
      if (log) S.logs.push(log);
      novas.forEach((i) => salvas.add(i));
      toast(`Resultado salvo: ${acertos}/${feitas}.`); placar();
    } catch (e) { toast(e.message, 'erro'); $('#ltSalvar').disabled = false; }
  };
  desenhar();
}
