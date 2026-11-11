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

// ---------- gabarito em forma de bate-papo com o professor ----------
// Escolhe sempre um índice válido (nada de "undefined" no texto).
const um = (lista, n) => lista[((n >>> 0) % lista.length + lista.length) % lista.length];
const ABRE_OK = ['Boa! Mandou bem.', 'Isso aí, acertou!', 'Perfeito, é isso mesmo.', 'Show! Você pegou a ideia.', 'Acertou! Agora vamos garantir que foi pelo motivo certo, e não no chute.', 'Muito bem! Essa a banca adora cobrar.'];
const ABRE_ERRO = ['Calma, essa derruba muita gente. Vem comigo que eu te mostro.', 'Não foi dessa vez, mas olha que interessante o que está por trás dela.', 'Errar aqui é ótimo: agora você não erra na prova. Olha só.', 'Quase! O detalhe que pegou você é justamente o que a banca gosta de trocar.', 'Essa é clássica de prova. Bora entender de vez.', 'Tranquilo, essa tem uma casca de banana. Vou te explicar.'];
const POR_QUE = ['E por quê?', 'Vamos ao motivo:', 'Pensa comigo:', 'O raciocínio é este:', 'Repara no detalhe:', 'Olha o que a lei diz:'];
const ERRADO_PORQUE = ['O erro do item está aqui:', 'Onde está a pegadinha?', 'O que deixa o item errado é isto:', 'A banca trocou um detalhe:'];
const OUTRAS = ['E as outras alternativas? Olha por que cada uma cai:', 'Agora vamos olhar as outras, porque a banca pode cobrar qualquer uma delas:', 'Bora passar pelas demais, uma por uma:'];
const FECHO = ['📌 Pra levar pra prova:', '📌 Anota aí:', '📌 Resumindo em uma frase:'];
const msg = (t, cls = '') => t ? `<div class="lt-msg ${cls}"><div class="lt-bal">${t}</div></div>` : '';
const corta = (t, n = 140) => { t = String(t ?? ''); return t.length > n ? t.slice(0, n - 1) + '…' : t; };

export function htmlGabarito(q, ok, marcada) {
  const h = hash(q.p), me = Array.isArray(q.alts) && q.alts.length;
  const r = me ? Math.max(0, Math.min(q.alts.length - 1, Number(q.r) || 0)) : 0;
  const gab = me ? `letra <b>${LETRA[r]}</b>` : `<b>${q.c ? 'CERTO' : 'ERRADO'}</b>`;
  const x = String(q.x || '').trim(), e = String(q.e || '').trim(), pg = String(q.pg || '').trim();
  // 1) abertura + veredito
  let ver;
  if (me) ver = `A resposta é a ${gab}: “${esc(corta(q.alts[r], 220))}”.`;
  else if (q.c) ver = ok ? 'O item está <b>certo</b>, do jeitinho que a lei e a doutrina dizem.' : 'Você marcou Errado, mas o item está <b>certo</b>.';
  else ver = ok ? 'O item está <b>errado</b> mesmo, e é importante saber exatamente onde.' : 'Você marcou Certo, mas o item está <b>errado</b>.';
  const partes = [msg(`${um(ok ? ABRE_OK : ABRE_ERRO, h)} ${ver}`, 'abre')];
  // 2) explicação: fala do professor (T:) e explicação (X:)
  const prof = String(q.prof || '').trim();
  if (prof) partes.push(msg(esc(prof)));
  const base = x || (!prof ? e : '');
  if (base) {
    const intro = !me && !q.c ? um(ERRADO_PORQUE, h >>> 3) : um(POR_QUE, h >>> 3);
    partes.push(msg(`${prof ? '' : `<b>${intro}</b> `}${esc(base)}`));
  }
  // 3) quem errou uma múltipla escolha: por que a marcada não serve
  const m = marcada === undefined || marcada === null || marcada === '' ? -1 : Number(marcada);
  if (me && !ok && m >= 0 && m < q.alts.length && m !== r) {
    const nota = Array.isArray(q.n) ? String(q.n[m] || '').trim() : '';
    partes.push(msg(`Você marcou a <b>${LETRA[m]}</b> (“${esc(corta(q.alts[m]))}”). ${nota ? `Ela não serve porque ${esc(nota.charAt(0).toLowerCase() + nota.slice(1))}` : 'Ela parece certa à primeira vista, mas não é o que a regra diz: compare com a correta acima, palavra por palavra.'}`, 'sua'));
  }
  // 4) pegadinha
  if (pg) partes.push(msg(`<b>⚠ Fica esperto:</b> ${esc(pg)}`, 'peg'));
  // 5) comentário de cada alternativa
  if (me && Array.isArray(q.n) && q.n.some((t) => String(t || '').trim())) {
    partes.push(msg(`<b>${um(OUTRAS, h >>> 5)}</b><ul class="lt-gn">${q.alts.map((t, k) => { const nt = String(q.n[k] || '').trim(); return `<li class="${k === r ? 'ok' : ''}"><b>${LETRA[k]}</b> ${k === r ? '✔' : '✘'} ${nt ? esc(nt) : esc(corta(t, 120))}</li>`; }).join('')}</ul>`));
  }
  // 6) fecho
  if (e && (x || prof)) partes.push(msg(`<b>${um(FECHO, h >>> 7)}</b> ${esc(e)}`, 'fecho'));
  return `<b>${ok ? '✅ Você acertou!' : '❌ Não foi dessa vez.'}</b> Gabarito: ${gab}.
    <div class="lt-gab lt-chat"><div class="lt-av">👨‍🏫 <b>Professor</b></div>${partes.join('')}</div>`;
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
  box.querySelector('.lt-q-res').innerHTML = htmlGabarito(q, ok, r);
  return ok;
}

// ---------- flashcards ----------
// Cartões que viram ao clicar. Os do texto vêm do conteúdo; se o tópico não tiver, monta com os itens de Certo/Errado.
export function htmlFlash(cartoes, titulo = '🃏 Flashcards: clique no cartão para ver a resposta') {
  if (!cartoes.length) return '';
  return `<div class="lt-flash-box"><b class="lt-tit">${titulo}</b><div class="lt-flash">${cartoes.map(([f, v]) => `<button type="button" class="lt-fc"><span class="fr">${f}</span><span class="vs">${v}</span></button>`).join('')}</div></div>`;
}
const VIRA_C = ['Certo! E olha o porquê:', 'Tá certo. Repara:', 'Certinho. A lógica é esta:'];
const VIRA_E = ['Errado! O pulo do gato:', 'Errado. Onde está a casca de banana:', 'Errado, e a banca adora isso:'];
export function cartoesAuto(quiz, max = 8) {
  return quiz.filter((q) => !q.alts && String(q.p || '').length < 240 && (q.x || q.e || q.prof)).slice(0, 60)
    .sort((a, b) => hash(a.p) - hash(b.p)).slice(0, max)
    .map((q) => {
      const h = hash(q.p), fala = String(q.prof || q.x || q.e || '').trim();
      return [`<small>Certo ou errado?</small>${esc(q.p)}`,
        `<b class="${q.c ? 'ok' : 'erro'}">${um(q.c ? VIRA_C : VIRA_E, h)}</b><span>${esc(corta(fala, 360))}</span>${q.e && q.e !== fala ? `<small>📌 ${esc(corta(q.e, 160))}</small>` : ''}`];
    });
}
export function ligarFlash(el) {
  el.querySelectorAll('.lt-fc').forEach((c) => (c.onclick = () => c.classList.toggle('virado')));
}
