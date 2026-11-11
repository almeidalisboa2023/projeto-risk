// Peças comuns das questões da leitura, das apostilas e dos simulados:
// histórico por aluno ("acertou/errou anteriormente"), contagem nas questões do dia, gabarito com fala de professor,
// alternativas embaralhadas (para o gabarito não ficar previsível) e flashcards.
import { S } from './state.js';
import { db } from './backend.js';
import { esc, iso, hoje } from './util.js';
import { toast } from './ui.js';
import { chaveQ } from './leitura/index.js';

export const LETRA = 'ABCDE';
const hash = (s) => parseInt(chaveQ(String(s)), 36) || 0;

// ---------- alternativas embaralhadas ----------
// Cada aluno vê as alternativas numa ordem própria (fixa para ele), então a letra certa varia.
// Questões com "todas/nenhuma das anteriores" ou referência a letras mantêm a ordem original.
const PRESA = /anterior|acima|todas as alternativas|nenhuma das|\b(a|b|c|d|e) e (a|b|c|d|e)\b|alternativas? [a-e]\b/i;
export function embaralhar(q, semente = S.user?.id || '') {
  if (!q.alts || q.alts.length < 3 || q.alts.some((t) => PRESA.test(t))) return q;
  let h = hash(semente + '|' + q.p);
  const ord = q.alts.map((_, k) => k);
  for (let i = ord.length - 1; i > 0; i--) { h = (Math.imul(h, 1103515245) + 12345) >>> 0; const j = h % (i + 1); [ord[i], ord[j]] = [ord[j], ord[i]]; }
  return { ...q, alts: ord.map((k) => q.alts[k]), r: ord.indexOf(q.r), n: q.n ? ord.map((k) => q.n[k]) : q.n, _ordem: ord };
}

// Ordem que intercala Certo e Errado (o aluno não consegue "chutar pelo padrão" da página)
export function intercalar(quiz, idx) {
  const me = idx.filter((i) => quiz[i].alts), c = idx.filter((i) => !quiz[i].alts && quiz[i].c), e = idx.filter((i) => !quiz[i].alts && !quiz[i].c);
  const base = [];
  for (let t = 0; c.length || e.length; t++) {
    const querE = ((Math.imul(t + 11, 2654435761) >>> 0) % 2) === 0;
    base.push((querE && e.length) || !c.length ? e.shift() : c.shift());
  }
  const out = [];
  base.forEach((x, i) => { out.push(x); if (i % 3 === 2 && me.length) out.push(me.shift()); });
  return [...out, ...me];
}

// ---------- histórico do aluno ----------
export const chaveDe = (ctx, q) => `${ctx.mat.id}/${ctx.a.id}/${chaveQ(q.p)}`;
export async function carregarHistorico(ctx) {
  ctx.hist = new Map();
  if (!S.user) return ctx.hist;
  try {
    const rows = await db.selectAll('respostas_leitura', { user_id: 'eq.' + S.user.id, chave: `like.${ctx.mat.id}/${ctx.a.id}/*` });
    for (const r of rows) ctx.hist.set(r.chave, r);
  } catch { /* sem a tabela (SQL 14 não rodado) o resto funciona */ }
  return ctx.hist;
}
export function seloHistorico(ctx, q) {
  const h = ctx.hist?.get(chaveDe(ctx, q)); if (!h) return '';
  const d = h.atualizado_em ? new Date(h.atualizado_em).toLocaleDateString('pt-BR') : '';
  return h.acertou ? `<span class="lt-hist ok" title="${h.acertos || 1} de ${h.tentativas || 1} acertos">✅ Acertou anteriormente${d ? ' · ' + d : ''}</span>`
    : `<span class="lt-hist erro" title="${h.acertos || 0} de ${h.tentativas || 1} acertos">❌ Errou anteriormente${d ? ' · ' + d : ''}</span>`;
}

// Conta a resposta: grava o histórico da questão e junta as respostas para as "questões de hoje"
const filas = new Map();
export function registrar(ctx, q, ok) {
  if (!S.user) return;
  const k = chaveDe(ctx, q), ant = ctx.hist?.get(k);
  const reg = { id: S.user.id + ':' + k, user_id: S.user.id, chave: k, acertou: ok, tentativas: (ant?.tentativas || 0) + 1, acertos: (ant?.acertos || 0) + (ok ? 1 : 0), atualizado_em: new Date().toISOString() };
  ctx.hist?.set(k, reg);
  db.insert('respostas_leitura', [reg], { upsert: true, onConflict: 'id' }).catch(() => {});
  const fk = ctx.mat.id + '/' + ctx.a.id;
  const f = filas.get(fk) || { ctx, feitas: 0, acertos: 0, timer: null, total: 0 };
  f.feitas++; f.acertos += ok ? 1 : 0; f.total++; filas.set(fk, f);
  clearTimeout(f.timer); f.timer = setTimeout(() => descarregar(fk), 2000);
  ctx.aoContar?.(f.total);
}
async function descarregar(fk) {
  const f = filas.get(fk); if (!f || !f.feitas) return;
  const { ctx } = f, feitas = f.feitas, acertos = f.acertos; f.feitas = 0; f.acertos = 0; clearTimeout(f.timer); f.timer = null;
  try {
    const [log] = await db.insert('question_logs', [{ user_id: S.user.id, edital_id: S.edital?.id || null, topico_id: ctx.topicoId || null, materia: ctx.materia || ctx.mat.nome, data: iso(hoje()), feitas, acertos, origem: 'app' }]);
    if (log) S.logs.push(log);
  } catch (e) { f.feitas += feitas; f.acertos += acertos; toast('Não consegui salvar as respostas: ' + e.message, 'erro'); }
}
const tudo = () => { for (const k of filas.keys()) descarregar(k); };
window.addEventListener('hashchange', tudo); window.addEventListener('pagehide', tudo);

// ---------- gabarito com fala de professor ----------
const ABRE_OK = ['Boa! Mandou bem.', 'Isso aí, acertou!', 'Perfeito, é isso mesmo.', 'Show! Você pegou a ideia.', 'Acertou! Agora vamos garantir que foi pelo motivo certo.'];
const ABRE_ERRO = ['Calma, essa derruba muita gente. Vem comigo:', 'Não foi dessa vez, mas olha que interessante:', 'Errar aqui é ótimo, porque agora você não erra na prova. Olha só:', 'Quase! Presta atenção neste detalhe:', 'Essa é clássica de prova. Vou te explicar:'];
const PONTE = ['Pensa assim:', 'O raciocínio é este:', 'Repara:', 'Olha o que a lei diz:', 'A lógica é simples:'];
export function htmlGabarito(q, ok) {
  const h = hash(q.p);
  const gab = q.alts ? `letra <b>${LETRA[q.r]}</b>` : `<b>${q.c ? 'CERTO' : 'ERRADO'}</b>`;
  const prof = q.prof || `${(ok ? ABRE_OK : ABRE_ERRO)[h % 5]} ${!q.alts ? `O item está ${q.c ? '<b>certo</b>' : '<b>errado</b>'}.` : `A resposta é a ${gab}.`} ${PONTE[(h >> 3) % 5]}`;
  const notas = q.alts && q.n ? `<ul class="lt-gn">${q.alts.map((t, k) => `<li class="${k === q.r ? 'ok' : ''}"><b>${LETRA[k]}</b> ${k === q.r ? '✔' : '✘'} ${esc(q.n[k] || '')}</li>`).join('')}</ul>` : '';
  return `<b>${ok ? '✅ Você acertou!' : '❌ Não foi dessa vez.'}</b> Gabarito: ${gab}.
    <div class="lt-gab"><p class="lt-prof"><span>👨‍🏫</span><span>${prof}</span></p>
    ${q.x ? `<p>${esc(q.x)}</p>` : q.e ? `<p>${esc(q.e)}</p>` : ''}
    ${q.pg ? `<p class="lt-gpg"><b>⚠ Fica esperto:</b> ${esc(q.pg)}</p>` : ''}${notas}${q.x && q.e ? `<p class="lt-gf">📌 ${esc(q.e)}</p>` : ''}</div>`;
}

// ---------- uma questão interativa (usada dentro do texto) ----------
export function htmlQuestao(q, ctx, n = '') {
  const op = q.alts
    ? `<div class="lt-alts">${q.alts.map((t, k) => `<button class="lt-alt" data-r="${k}"><b>${LETRA[k]}</b> ${esc(t)}</button>`).join('')}</div>`
    : `<div class="row"><button class="btn sec mini" data-r="1">Certo</button><button class="btn sec mini" data-r="0">Errado</button></div>`;
  return `<p>${n ? `<span class="mono">${n}.</span> ` : ''}${q.alts ? '<span class="lt-tipo">múltipla escolha</span> ' : ''}${seloHistorico(ctx, q)}${q.longa ? '' : ''}${esc(q.p)}</p>${op}<div class="lt-q-res"></div>`;
}
export function responder(box, q, r) {
  const ok = q.alts ? Number(r) === q.r : (r === '1') === q.c;
  box.querySelectorAll('[data-r]').forEach((y) => { y.disabled = true; y.classList.toggle('lt-marcado', y.dataset.r === String(r)); if (q.alts && Number(y.dataset.r) === q.r) y.classList.add('lt-certa'); });
  box.classList.add(ok ? 'ok' : 'erro');
  box.querySelector('.lt-q-res').innerHTML = htmlGabarito(q, ok);
  return ok;
}

// ---------- flashcards ----------
// Cartões que viram ao clicar. Os do texto vêm do conteúdo; se o tópico não tiver, monta com os itens de Certo/Errado.
export function htmlFlash(cartoes, titulo = '🃏 Flashcards: clique no cartão para ver a resposta') {
  if (!cartoes.length) return '';
  return `<div class="lt-flash-box"><b class="lt-tit">${titulo}</b><div class="lt-flash">${cartoes.map(([f, v]) => `<button type="button" class="lt-fc"><span class="fr">${f}</span><span class="vs">${v}</span></button>`).join('')}</div></div>`;
}
export function cartoesAuto(quiz, max = 8) {
  return quiz.filter((q) => !q.alts && q.p.length < 220).slice(0, 40)
    .sort((a, b) => hash(a.p) - hash(b.p)).slice(0, max)
    .map((q) => [`<small>Certo ou errado?</small>${esc(q.p)}`, `<b>${q.c ? 'CERTO' : 'ERRADO'}</b>${esc(q.x || q.e || '')}`]);
}
export function ligarFlash(el) {
  el.querySelectorAll('.lt-fc').forEach((c) => (c.onclick = () => c.classList.toggle('virado')));
}
