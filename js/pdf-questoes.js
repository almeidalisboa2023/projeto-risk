// Leitura de PDF no navegador e detecção de questões (enunciado, alternativas, gabarito e comentário).
// Usado no "Conteúdo em PDF" (leitura) e nas "Apostilas". O gabarito e os comentários encontrados no PDF
// são separados do texto: aparecem só depois que o aluno responde.
import { norm } from './util.js';
import { db } from './backend.js';
import { chaveQ } from './leitura/index.js';

let pdfjs = null;
export async function carregaPdfJs() {
  if (pdfjs) return pdfjs;
  pdfjs = await import('./vendor/pdfjs/pdf.min.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdfjs/pdf.worker.min.mjs', import.meta.url).href;
  return pdfjs;
}

// Lê o PDF e devolve, por página, as linhas com texto, posição (x0, x1, y), altura da letra e número da página.
export async function lerPdf(dados, progresso = () => {}) {
  const lib = await carregaPdfJs();
  const doc = await lib.getDocument({ data: dados instanceof Uint8Array ? dados : new Uint8Array(dados) }).promise;
  const paginas = [];
  for (let n = 1; n <= doc.numPages; n++) {
    progresso(n, doc.numPages);
    const pg = await doc.getPage(n);
    const tc = await pg.getTextContent();
    const linhas = [];
    for (const it of tc.items) {
      if (!it.str || !it.str.trim()) continue;
      const y = it.transform[5], x = it.transform[4], h = Math.abs(it.transform[3]) || it.height || 10;
      let l = linhas.find((z) => Math.abs(z.y - y) < Math.max(2, h * 0.4));
      if (!l) { l = { y, h, pag: n, partes: [] }; linhas.push(l); }
      l.partes.push({ x, s: it.str, w: it.width || 0 });
      l.h = Math.max(l.h, h);
    }
    for (const l of linhas) {
      l.partes.sort((a, b) => a.x - b.x);
      let t = '', fim = null;
      for (const p of l.partes) { if (fim !== null && p.x - fim > 1.5 && !t.endsWith(' ') && !p.s.startsWith(' ')) t += ' '; t += p.s; fim = p.x + p.w; }
      l.t = t.replace(/\s+/g, ' ').trim();
      l.x0 = l.partes[0].x; l.x1 = Math.max(...l.partes.map((p) => p.x + p.w));
      delete l.partes;
    }
    linhas.sort((a, b) => b.y - a.y);
    paginas.push(linhas.filter((l) => l.t));
  }
  return { paginas, numPaginas: doc.numPages };
}

// ---------- padrões ----------
const INICIO_Q = /^(?:quest[aã]o\s*(\d{1,3})\s*[\.\):\-–—]?\s*|(\d{1,3})\s*[\.\)\-–—]\s+|(\d{1,3})\s+(?=[A-ZÀ-Ú(“"]))/i;
const ALT = /^\(?\s*([A-Ea-e])\s*[\)\.\-–—]\s+/;
const ALT_INLINE = /(?:^|\s)\(?([A-Ea-e])\s*\)\s+/g;
const GAB_INLINE = /^(?:gabarito|resposta(?: correta)?|resp\.?|gab\.?|alternativa correta)\s*[:\-–—.]?\s*(?:letra\s*)?\(?\s*(certo|errado|correto|incorreto|[A-Ea-e])\b\s*\)?/i;
const GAB_TITULO = /^(gabarito|gabaritos|respostas|gabarito oficial|chave de respostas)\b[\s:.\-–—]*$/i;
const GAB_TITULO_COM_PARES = /^(gabarito|gabaritos|respostas)\b\s*[:\-–—]?\s*(.*\d.*)$/i;
const PAR = /(\d{1,3})\s*[\.\)\-–—:=]?\s*\(?\s*(certo|errado|[A-E]|C|E)\b/gi;
const COMENT = /^(coment[aá]rios?|justificativa|resolu[cç][aã]o|explica[cç][aã]o|fundamenta[cç][aã]o|fundamento)\s*[:\-–—.]?\s*(.*)$/i;

const letra = (v) => { const s = norm(v); if (['certo', 'correto', 'c'].includes(s)) return 'C'; if (['errado', 'incorreto', 'e'].includes(s)) return 'E'; return s.toUpperCase(); };
const junta = (a, b) => (/[a-zà-ú]-$/i.test(a) ? a.slice(0, -1) + b : (a ? a + ' ' : '') + b);

// Procura as questões nas linhas. Devolve as questões e o conjunto de linhas que pertencem a elas
// (para tirar do texto de leitura) e as que são gabarito/comentário (para esconder na apostila).
export function acharQuestoes(paginas) {
  const todas = paginas.flat();
  const qs = []; let q = null, modo = null; // modo: 'enun' | 'alt' | 'com' | 'gab'
  const gabLinhas = new Set(), gabTabela = [];
  const fecha = () => { if (q) qs.push(q); q = null; modo = null; };
  for (const l of todas) {
    const t = l.t;
    // seção de gabarito (tabela no fim)
    if (GAB_TITULO.test(t) || GAB_TITULO_COM_PARES.test(t) && (t.match(PAR) || []).length >= 2) {
      fecha(); modo = 'gab'; gabLinhas.add(l);
      const m = t.match(GAB_TITULO_COM_PARES); if (m) for (const p of m[2].matchAll(PAR)) gabTabela.push([Number(p[1]), letra(p[2])]);
      continue;
    }
    if (modo === 'gab') {
      const pares = [...t.matchAll(PAR)];
      const sobra = t.replace(PAR, '').replace(/[\s|;,.\-–—]/g, '');
      if (pares.length && sobra.length <= 6) { pares.forEach((p) => gabTabela.push([Number(p[1]), letra(p[2])])); gabLinhas.add(l); continue; }
      modo = null; // acabou a tabela
    }
    // gabarito dentro da questão
    const gi = t.match(GAB_INLINE);
    if (gi && /^[a-e]$/.test(gi[1])) { /* letra minúscula solta: provavelmente artigo ('resposta a ...'), não gabarito */ } else
    if (gi && q) { q.gab = letra(gi[1]); q.linhasGab.push(l); const resto = t.slice(gi[0].length).replace(/^[\s.\-–—:]+/, ''); modo = resto ? 'com' : 'posgab'; if (resto) q.com = junta(q.com, resto); continue; }
    const cm = t.match(COMENT);
    if (cm && q) { q.linhasGab.push(l); modo = 'com'; if (cm[2]) q.com = junta(q.com, cm[2]); continue; }
    // começo de questão
    const iq = t.match(INICIO_Q);
    if (iq && !ALT.test(t)) {
      fecha();
      q = { n: Number(iq[1] || iq[2] || iq[3]), p: t.slice(iq[0].length).trim(), alts: [], gab: null, com: '', linhas: [l], linhasGab: [], pag: l.pag };
      modo = 'enun';
      continue;
    }
    if (!q) continue;
    // depois do gabarito, só vira comentário o que vier com "Comentário:"; o resto volta a ser texto da matéria
    if (modo === 'posgab') { fecha(); continue; }
    if (modo === 'com') { q.com = junta(q.com, t); q.linhasGab.push(l); continue; }
    // alternativas (uma por linha ou várias na mesma linha)
    const inl = [...t.matchAll(ALT_INLINE)];
    if (ALT.test(t) || inl.length >= 2 && inl[0].index === 0) {
      const partes = inl.length >= 2 ? t.split(/(?:^|\s)\(?[A-Ea-e]\s*\)\s+/).filter((x) => x.trim()) : [t.replace(ALT, '')];
      partes.forEach((p) => q.alts.push(p.trim()));
      q.linhas.push(l); modo = 'alt';
      continue;
    }
    if (modo === 'alt' && q.alts.length) { q.alts[q.alts.length - 1] = junta(q.alts[q.alts.length - 1], t); q.linhas.push(l); continue; }
    if (modo === 'enun') { q.p = junta(q.p, t); q.linhas.push(l); }
  }
  fecha();
  // aplica a tabela de gabarito: cada número vai para a primeira questão com esse número ainda sem gabarito
  for (const [n, g] of gabTabela) { const alvo = qs.find((x) => x.n === n && !x.gab); if (alvo) alvo.gab = g; }
  // fica só o que é questão de verdade: múltipla escolha (4 ou 5 alternativas) ou item de Certo/Errado com gabarito
  const validas = qs.filter((x) => (x.alts.length >= 4 && x.alts.length <= 5) || (!x.alts.length && (x.gab === 'C' || x.gab === 'E') && x.p.length > 25));
  const questoes = validas.map((x) => {
    const me = x.alts.length >= 4;
    const r = me && /^[A-E]$/.test(x.gab || '') ? 'ABCDE'.indexOf(x.gab) : null;
    return { n: x.n, p: x.p, alts: me ? x.alts : null, gab: me ? (r !== null && r < x.alts.length ? x.gab : null) : x.gab, x: x.com.trim(), pag: x.pag, _linhas: x.linhas, _gab: x.linhasGab };
  });
  const usadas = new Set(questoes.flatMap((x) => [...x._linhas, ...x._gab]));
  const esconder = new Set([...gabLinhas, ...questoes.flatMap((x) => x._gab)]);
  return { questoes, usadas, esconder };
}

// Converte para o formato do quiz da leitura: C/E → {p, c, e, x}; múltipla → {p, alts, r, e, x}
export function paraQuiz(q, fonte = '') {
  const x = q.x || (fonte ? `Questão do material ${fonte}${q.n ? ', nº ' + q.n : ''}.` : 'Gabarito do material enviado.');
  if (q.alts) return { p: q.p, alts: q.alts, r: 'ABCDE'.indexOf(q.gab), x, e: q.n ? `Questão ${q.n} do material.` : '', pdf: true };
  return { p: q.p, c: q.gab === 'C', x, e: q.n ? `Questão ${q.n} do material.` : '', pdf: true };
}

// Retângulos a cobrir na apostila (gabaritos e comentários), em unidades do PDF, por página.
export function mascaras(linhas) {
  const m = {};
  for (const l of linhas) (m[l.pag] = m[l.pag] || []).push([Math.max(0, l.x0 - 2), l.y - l.h * 0.35, l.x1 + 2, l.y + l.h * 1.05].map((v) => Math.round(v * 10) / 10));
  return m;
}

// Lista editável para o administrador conferir as questões encontradas e o gabarito de cada uma.
export function painelQuestoes(box, questoes, esc) {
  if (!questoes.length) { box.innerHTML = '<p class="muted" style="font-size:13px">Nenhuma questão encontrada neste PDF.</p>'; return () => []; }
  const sem = questoes.filter((q) => !q.gab).length;
  box.innerHTML = `<div class="campo"><label>🎯 Questões encontradas: ${questoes.length}${sem ? ` · <span style="color:var(--vermelho)">${sem} sem gabarito (escolha abaixo ou desmarque)</span>` : ''}</label>
    <p class="muted" style="font-size:12.5px;margin:0 0 6px">O gabarito e os comentários do PDF saem da leitura e só aparecem depois que o aluno responde. Confira o gabarito de cada uma.</p>
    <div class="pq-lista">${questoes.map((q, i) => `<div class="pq-item"><label class="pq-sel"><input type="checkbox" data-pq="${i}" ${q.gab ? 'checked' : ''}></label>
      <div style="flex:1;min-width:0"><b>${q.n ? q.n + '. ' : ''}</b>${esc(q.p.slice(0, 160))}${q.p.length > 160 ? '…' : ''}
        <div class="muted" style="font-size:12px">${q.alts ? q.alts.length + ' alternativas' : 'Certo ou Errado'} · página ${q.pag}${q.x ? ' · com comentário' : ''}</div></div>
      <select data-pg="${i}">${q.alts ? '<option value="">—</option>' + q.alts.map((_, k) => `<option ${q.gab === 'ABCDE'[k] ? 'selected' : ''}>${'ABCDE'[k]}</option>`).join('') : `<option value="">—</option><option value="C" ${q.gab === 'C' ? 'selected' : ''}>Certo</option><option value="E" ${q.gab === 'E' ? 'selected' : ''}>Errado</option>`}</select></div>`).join('')}</div></div>`;
  box.querySelectorAll('[data-pg]').forEach((s) => (s.onchange = () => { const i = Number(s.dataset.pg); questoes[i].gab = s.value || null; box.querySelector(`[data-pq="${i}"]`).checked = !!s.value; }));
  return () => questoes.filter((q, i) => box.querySelector(`[data-pq="${i}"]`).checked && q.gab);
}

// Manda as questões (formato do quiz da leitura) para o banco de questões (tabela questoes), sem duplicar:
// o código é "PDF-" + a chave do enunciado, então reenviar só atualiza.
export async function enviarAoBanco(quiz, { materia = '', assunto = '', fonte = '' } = {}) {
  const linhas = (quiz || []).filter((q) => q && q.p && (q.alts ? q.r >= 0 && q.r < q.alts.length : typeof q.c === 'boolean')).map((q) => ({
    codigo: 'PDF-' + chaveQ(q.p), modalidade: q.alts ? 'multipla_escolha' : 'certo_errado', enunciado: q.p, alternativas: q.alts || [],
    gabarito: q.alts ? 'ABCDE'[q.r] : q.c ? 'C' : 'E', comentario: [q.x, q.e].filter(Boolean).join('\n\n') || null,
    materia: materia || null, assunto: assunto || null, fonte: fonte || null, origem: 'publica', situacao: 'atualizada', tags: 'pdf',
  }));
  for (let i = 0; i < linhas.length; i += 200) await db.insert('questoes', linhas.slice(i, i + 200), { upsert: true, onConflict: 'codigo' });
  return linhas.length;
}
