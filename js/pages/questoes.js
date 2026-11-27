// Banco de questões: todas as questões dos tópicos de todas as matérias, num só lugar, com filtros.
// As questões continuam dentro de cada matéria; aqui o aluno filtra por matéria, assunto, modo e situação.
import { S } from '../state.js';
import { db } from '../backend.js';
import { esc } from '../util.js';
import { MATERIAS_TODAS, comConteudos, comEdicoes, acharLeitura, chaveQ } from '../leitura/index.js';
import { embaralhar, intercalar, htmlQuestao, responder, registrar } from '../questao.js';

const POR_PAG = 10;
let F = { m: '', a: '', modo: '', status: '', busca: '', ordem: 'mix', pag: 0 };
let BANCO = null, HIST = null, sessao = { feitas: 0, ok: 0 };
const num = (n) => Number(n).toLocaleString('pt-BR');

// Junta as questões de todas as matérias (todos os alunos veem todas, não só as do edital)
function montarBanco() {
  const mats = comEdicoes(comConteudos(MATERIAS_TODAS));
  const lista = [], vistos = new Set(), meta = [];
  for (const m of mats) {
    const assuntos = [];
    for (const a of m.assuntos) {
      let n = 0;
      for (const q0 of a.quiz || []) {
        if (!q0?.p) continue;
        const id = `${m.id}/${a.id}/${chaveQ(q0.p)}`;
        if (vistos.has(id)) continue; vistos.add(id);
        lista.push({ id, mat: m, a, q: embaralhar(q0), txt: '' });
        n++;
      }
      if (n) assuntos.push({ id: a.id, titulo: a.titulo, n });
    }
    if (assuntos.length) meta.push({ id: m.id, nome: m.nome, cor: m.cor, ico: m.ico, assuntos, n: assuntos.reduce((s, x) => s + x.n, 0) });
  }
  meta.sort((x, y) => x.nome.localeCompare(y.nome, 'pt-BR'));
  return { lista, meta };
}

async function carregarHist() {
  const h = new Map();
  if (!S.user) return h;
  try { (await db.selectAll('respostas_leitura', { user_id: 'eq.' + S.user.id, select: 'chave,acertou,acertos,tentativas,atualizado_em' })).forEach((r) => h.set(r.chave, r)); } catch {}
  return h;
}

// Contexto de cada assunto (para histórico, questões do dia e ligação com o tópico do calendário)
const CTX = new Map();
let topicoFixo = null;
function ctxDe(it) {
  const k = it.mat.id + '/' + it.a.id;
  if (!CTX.has(k)) {
    let tp = topicoFixo && topicoFixo.k === k ? topicoFixo.tp : null;
    if (!tp) tp = (S.topicos || []).find((t) => { const r = acharLeitura(t.materia, t.topico); return r?.a && r.mat.id === it.mat.id && r.a.id === it.a.id; }) || null;
    CTX.set(k, { mat: it.mat, a: it.a, hist: HIST, topicoId: tp?.id || null, materia: tp?.materia || it.mat.nome });
  }
  return CTX.get(k);
}

export async function render(el, query) {
  // Vindo do calendário: "Fazer questões desse assunto" (?m=materia&a=assunto&t=topico) ou link antigo (?topico=id)
  const tId = query?.get('t') || query?.get('topico');
  const tp = tId ? (S.topicos || []).find((t) => t.id === tId) : null;
  // Entrando pelo menu depois de vir do calendário: começa sem o filtro daquele assunto
  if (!query?.get('m') && !tp && topicoFixo) { F = { m: '', a: '', modo: '', status: '', busca: '', ordem: 'mix', pag: 0 }; topicoFixo = null; }
  if (query?.get('m') || tp) {
    let m = query.get('m') || '', a = query.get('a') || '';
    if (!m && tp) { const r = acharLeitura(tp.materia, tp.topico); if (r) { m = r.mat.id; a = r.a?.id || ''; } }
    F = { ...F, m, a, pag: 0, status: '' };
    topicoFixo = tp && m && a ? { k: m + '/' + a, tp } : null;
  }
  el.innerHTML = `<div class="qb"><div class="qb-hero"><div><div class="mono up">Banco de questões</div><h1>Questões</h1><p class="muted">Carregando o banco…</p></div></div></div>`;
  if (!BANCO) BANCO = montarBanco();
  if (!HIST) HIST = await carregarHist();
  CTX.clear();
  const tot = BANCO.lista.length, nME = BANCO.lista.filter((x) => x.q.alts).length;
  const daCal = tp && F.m;
  el.innerHTML = `
  <div class="qb">
    <div class="qb-hero">
      <div class="qb-hero-txt"><div class="mono up">Banco de questões</div><h1>Questões</h1>
        <p class="muted">Todas as questões do R.I.S.K. em um só lugar, de todas as matérias. Filtre por matéria, assunto e modo; cada resposta vem com o gabarito comentado e entra no seu histórico.</p></div>
      <div class="qb-total" title="Total de questões no banco"><b>${num(tot)}</b><span>questões no banco</span><small>${num(tot - nME)} Certo/Errado · ${num(nME)} múltipla escolha</small></div>
    </div>
    ${daCal ? `<div class="qb-cal"><span>📅</span><div><small>Do seu calendário</small><b>${esc(tp.topico)}</b></div><span class="sp"></span><a class="btn sec mini" href="#/calendario">← Voltar ao calendário</a></div>` : ''}
    <div class="qb-filtros">
      <div class="qb-f"><label>Matéria</label><select id="fM"><option value="">Todas as matérias</option>${BANCO.meta.map((m) => `<option value="${m.id}" ${m.id === F.m ? 'selected' : ''}>${esc(m.nome)} (${num(m.n)})</option>`).join('')}</select></div>
      <div class="qb-f"><label>Assunto</label><select id="fA" ${F.m ? '' : 'disabled'}><option value="">${F.m ? 'Todos os assuntos' : 'Escolha a matéria primeiro'}</option>${(BANCO.meta.find((m) => m.id === F.m)?.assuntos || []).map((a) => `<option value="${a.id}" ${a.id === F.a ? 'selected' : ''}>${esc(a.titulo)} (${num(a.n)})</option>`).join('')}</select></div>
      <div class="qb-f qb-fmodo"><label>Modo</label><div class="qb-seg" id="fModo">${[['', 'Todos'], ['ce', 'Certo ou errado'], ['me', 'Múltipla escolha']].map(([v, n]) => `<button data-v="${v}" class="${F.modo === v ? 'ativo' : ''}">${n}</button>`).join('')}</div></div>
      <div class="qb-f"><label>Situação</label><select id="fS">${[['', 'Todas'], ['novas', 'Nunca respondi'], ['erradas', 'Errei da última vez'], ['certas', 'Acertei da última vez']].map(([v, n]) => `<option value="${v}" ${F.status === v ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
      <div class="qb-f qb-busca"><label>Buscar no enunciado</label><input id="fB" value="${esc(F.busca)}" placeholder="Ex.: crase, contrapositiva, flagrante"></div>
      <button class="linkbtn qb-limpa" id="fLimpa">Limpar filtros</button>
    </div>
    <div id="qbRlm"></div>
    <div class="qb-barra">
      <div><b id="qbN">0</b> <span class="muted">questões encontradas</span></div>
      <div class="qb-sess" title="Nesta visita"><span>Nesta sessão:</span><b id="sF">${sessao.feitas}</b> respondidas · <b class="g" id="sO">${sessao.ok}</b> certas · <b class="r" id="sE">${sessao.feitas - sessao.ok}</b> erradas<i class="qb-sbar" title="Porcentagem de acertos"><i id="sBar" style="width:${sessao.feitas ? Math.round((100 * sessao.ok) / sessao.feitas) : 0}%"></i><em id="sPct">${sessao.feitas ? Math.round((100 * sessao.ok) / sessao.feitas) : 0}%</em></i></div>
      <span class="sp"></span>
      <div class="qb-seg mini" id="fOrd"><button data-v="mix" class="${F.ordem === 'mix' ? 'ativo' : ''}" title="Certo e Errado intercalados">Intercaladas</button><button data-v="rand" class="${F.ordem === 'rand' ? 'ativo' : ''}">🔀 Embaralhar</button></div>
    </div>
    <div id="qbLista"></div>
    <div class="qb-pags" id="qbPags"></div>
  </div>`;

  const $ = (s) => el.querySelector(s);
  $('#fM').onchange = (e) => { F.m = e.target.value; F.a = ''; F.pag = 0; topicoFixo = null; history.replaceState(null, '', '#/questoes'); render(el, null); };
  $('#fA').onchange = (e) => { F.a = e.target.value; F.pag = 0; lista(el); };
  $('#fS').onchange = (e) => { F.status = e.target.value; F.pag = 0; lista(el); };
  let tb; $('#fB').oninput = (e) => { clearTimeout(tb); tb = setTimeout(() => { F.busca = e.target.value.trim(); F.pag = 0; lista(el); }, 250); };
  el.querySelectorAll('#fModo button').forEach((b) => (b.onclick = () => { F.modo = b.dataset.v; F.pag = 0; el.querySelectorAll('#fModo button').forEach((x) => x.classList.toggle('ativo', x === b)); lista(el); }));
  el.querySelectorAll('#fOrd button').forEach((b) => (b.onclick = () => { F.ordem = b.dataset.v; F.semente = Math.random(); F.pag = 0; el.querySelectorAll('#fOrd button').forEach((x) => x.classList.toggle('ativo', x === b)); lista(el); }));
  $('#fLimpa').onclick = () => { F = { m: '', a: '', modo: '', status: '', busca: '', ordem: 'mix', pag: 0 }; topicoFixo = null; history.replaceState(null, '', '#/questoes'); render(el, null); };
  lista(el);
}

const semAcento = (t) => String(t).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
function filtrar() {
  const b = F.busca ? semAcento(F.busca) : '';
  let L = BANCO.lista.filter((it) => (!F.m || it.mat.id === F.m) && (!F.a || it.a.id === F.a)
    && (!F.modo || (F.modo === 'me') === !!it.q.alts)
    && (!F.status || (() => { const h = HIST.get(it.id); return F.status === 'novas' ? !h : F.status === 'erradas' ? h && !h.acertou : h && h.acertou; })())
    && (!b || semAcento(it.q.p).includes(b)));
  if (F.ordem === 'rand') { let s = Math.floor((F.semente || 0.5) * 1e9) >>> 0; L = L.map((x) => { s = (Math.imul(s, 1103515245) + 12345) >>> 0; return [s, x]; }).sort((x, y) => x[0] - y[0]).map((x) => x[1]); }
  else { const qs = L.map((x) => x.q); L = intercalar(qs, qs.map((_, i) => i)).map((i) => L[i]); }
  return L;
}

function lista(el) {
  const L = filtrar(), pags = Math.max(1, Math.ceil(L.length / POR_PAG));
  F.pag = Math.min(F.pag, pags - 1);
  el.querySelector('#qbN').textContent = num(L.length);
  // RLM: atalho para o quadro de tabela-verdade
  el.querySelector('#qbRlm').innerHTML = F.m === 'rlm' ? `<a class="qb-tv" href="#/tabela-verdade"><span>🧩</span><div><b>Quadro interativo de tabela-verdade</b><small>Monte a tabela célula por célula e veja em verde o que acertou e em vermelho o que errou, com o porquê. Um desafio novo por dia.</small></div><span class="qb-tv-ir">Treinar →</span></a>` : '';
  const pedaco = L.slice(F.pag * POR_PAG, (F.pag + 1) * POR_PAG);
  const box = el.querySelector('#qbLista');
  box.innerHTML = pedaco.length ? pedaco.map((it, k) => `<article class="qb-q lt-q" data-k="${k}" style="--c:${it.mat.cor}">
      <header class="qb-qcab"><span class="qb-num">${num(F.pag * POR_PAG + k + 1)}</span><span class="qb-mat"><i style="background:${it.mat.cor}"></i>${esc(it.mat.nome)}</span><span class="qb-ass" title="${esc(it.a.titulo)}">${esc(it.a.titulo)}</span><span class="sp"></span><span class="qb-modo">${it.q.alts ? 'Múltipla escolha' : 'Certo ou errado'}</span></header>
      <div class="qb-corpo">${htmlQuestao(it.q, ctxDe(it))}</div></article>`).join('')
    : `<div class="qb-vazio"><b>Nenhuma questão com esses filtros.</b><p class="muted">Troque o modo, a situação ou limpe a busca.</p></div>`;
  box.querySelectorAll('.qb-q').forEach((d) => {
    const it = pedaco[+d.dataset.k], ctx = ctxDe(it);
    d.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => {
      if (d.dataset.feito) return; d.dataset.feito = 1;
      const ok = responder(d, it.q, b.dataset.r);
      registrar(ctx, it.q, ok);
      sessao.feitas++; if (ok) sessao.ok++;
      el.querySelector('#sF').textContent = sessao.feitas; el.querySelector('#sO').textContent = sessao.ok; el.querySelector('#sE').textContent = sessao.feitas - sessao.ok;
      const pct = Math.round((100 * sessao.ok) / sessao.feitas) + '%'; el.querySelector('#sBar').style.width = pct; el.querySelector('#sPct').textContent = pct;
    }));
  });
  // Paginação numerada
  const pg = el.querySelector('#qbPags');
  if (pags <= 1) { pg.innerHTML = ''; return; }
  const nums = new Set([0, pags - 1, F.pag - 1, F.pag, F.pag + 1].filter((x) => x >= 0 && x < pags));
  const ord = [...nums].sort((x, y) => x - y);
  pg.innerHTML = `<button data-p="${F.pag - 1}" ${F.pag ? '' : 'disabled'}>‹ Anterior</button>${ord.map((p, i) => `${i && p - ord[i - 1] > 1 ? '<span>…</span>' : ''}<button data-p="${p}" class="${p === F.pag ? 'ativo' : ''}">${p + 1}</button>`).join('')}<button data-p="${F.pag + 1}" ${F.pag < pags - 1 ? '' : 'disabled'}>Próxima ›</button>`;
  pg.querySelectorAll('[data-p]').forEach((b) => (b.onclick = () => { F.pag = +b.dataset.p; lista(el); el.querySelector('.qb-barra').scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
}
