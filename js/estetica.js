// Padrão visual da leitura (R.I.S.K.): aplicado na hora de mostrar qualquer texto — os escritos no app,
// os editados pelo administrador e os que vieram de PDF. Não altera o que está gravado.
//  • artigos de lei viram um quadro de "texto da lei";
//  • parágrafos que começam com Atenção / Exemplo / Dica / Súmula viram caixas coloridas;
//  • prazos, valores, penas e percentuais ficam marcados (marca-texto);
//  • palavras que a banca usa para pegar o aluno (salvo, exceto, vedado, somente…) ficam em destaque.

const CAIXAS = [
  [/^(aten[cç][aã]o|importante|cuidado|pegadinha|fique atento|observa[cç][aã]o|obs\.?|nota)\s*[:!.\-–—]\s*/i, 'lt-peg', '⚠ Atenção'],
  [/^(exemplo|ex\.|exemplificando|na pr[aá]tica)\s*[:!.\-–—]\s*/i, 'lt-ex', '✍ Exemplo'],
  [/^(dica|macete|memorize|para memorizar|resumindo|em resumo|resumo)\s*[:!.\-–—]\s*/i, 'lt-dica', '💡 Dica'],
];
const ARTIGO = /^\s*(Art\.?\s*\d|§\s*\d|Par[aá]grafo [uú]nico|[IVXLC]{1,6}\s*[-–—]\s|[a-z]\)\s)/;
const SUMULA = /^\s*(S[uú]mula( Vinculante)?\s*(n[ºo°.]*\s*)?\d+|Tema\s+\d+|(STF|STJ)\s*[,:\-–—])/i;

// marca-texto: números que a banca troca
const MARCA = new RegExp([
  String.raw`\d+(?:[.,]\d+)?\s*(?:a|e|ou)\s*\d+(?:[.,]\d+)?\s*(?:dias?|horas?|meses|m[eê]s|anos?|minutos?)(?:\s*úteis)?`,
  String.raw`\d+(?:[.,]\d+)?\s*(?:dias?|horas?|meses|m[eê]s|anos?|minutos?)(?:\s*úteis)?`,
  String.raw`R\$\s*\d[\d.]*(?:,\d{2})?`,
  String.raw`\d+(?:[.,]\d+)?\s*%`,
  String.raw`\d+\s*km\/h`,
  String.raw`\d+(?:[.,]\d+)?\s*(?:mg\/L|dg\/L|kg|toneladas?)`,
  String.raw`(?:um|dois|tr[eê]s|quatro|cinco|seis|oito|dez|quinze|trinta|sessenta|noventa|cento e oitenta)\s+(?:dias|anos|meses|horas)`,
  String.raw`(?:um ter[cç]o|metade|dois ter[cç]os|o dobro|o triplo)`,
].join('|'), 'gi');
// palavras de pegadinha
const PEGA = /\b(salvo|exceto|vedad[oa]s?|proibid[oa]s?|somente|apenas|exclusivamente|privativ[oa]s?|independentemente|facultativ[oa]s?|obrigat[oó]ri[oa]s?|nunca|sempre|vetad[oa]s?|indelegáve(?:l|is)|imprescrit[ií]ve(?:l|is)|inafian[cç][aá]ve(?:l|is)|insuscet[ií]ve(?:l|is))\b/gi;

const PULA = new Set(['B', 'STRONG', 'MARK', 'H1', 'H2', 'H3', 'H4', 'TH', 'CODE', 'BUTTON', 'SVG', 'A', 'SELECT', 'OPTION', 'TEXTAREA', 'SMALL', 'SUMMARY', 'FIGCAPTION']);
const BLOCOS_FORA = ['lt-qin', 'lt-fc', 'lt-flash', 'lt-charge', 'lt-q', 'lt-stats', 'lt-barras', 'lt-fluxo', 'lt-calc', 'lt-verdade', 'lt-gab'];
const pular = (n) => {
  for (let p = n.parentElement; p; p = p.parentElement) {
    if (PULA.has(p.tagName.toUpperCase())) return true;
    if (BLOCOS_FORA.some((c) => p.classList?.contains(c))) return true;
    if (p.dataset?.pane) return false;
  }
  return false;
};

function realcar(root) {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const alvos = [];
  for (let n = w.nextNode(); n; n = w.nextNode()) if (n.nodeValue.trim().length > 3 && !pular(n)) alvos.push(n);
  for (const n of alvos) {
    const t = n.nodeValue;
    const partes = []; let fim = 0;
    const achados = [];
    for (const m of t.matchAll(MARCA)) achados.push([m.index, m[0], 'm']);
    for (const m of t.matchAll(PEGA)) achados.push([m.index, m[0], 'p']);
    if (!achados.length) continue;
    achados.sort((a, b) => a[0] - b[0]);
    for (const [i, s, tipo] of achados) {
      if (i < fim) continue;
      partes.push(document.createTextNode(t.slice(fim, i)));
      const e = document.createElement(tipo === 'm' ? 'mark' : 'b');
      e.className = tipo === 'm' ? 'lt-hl' : 'lt-pega'; e.textContent = s; partes.push(e); fim = i + s.length;
    }
    partes.push(document.createTextNode(t.slice(fim)));
    n.replaceWith(...partes);
  }
}

// Caixas e quadros de lei nos parágrafos "soltos" (os que não estão dentro de outro bloco)
function caixas(sec) {
  const ps = [...sec.children];
  let lei = null;
  for (const p of ps) {
    if (p.tagName !== 'P' || p.className) { lei = null; continue; }
    const txt = p.textContent.trim();
    if (ARTIGO.test(txt)) {
      if (!lei) { lei = document.createElement('div'); lei.className = 'lt-lei'; lei.innerHTML = '<b class="lt-tit">📜 Texto da lei</b>'; p.before(lei); }
      lei.appendChild(p); continue;
    }
    lei = null;
    if (SUMULA.test(txt)) { const d = document.createElement('div'); d.className = 'lt-juris'; d.innerHTML = '<b class="lt-tit">⚖ Jurisprudência</b>'; p.before(d); d.appendChild(p); continue; }
    for (const [re, cls, tit] of CAIXAS) {
      const m = txt.match(re);
      if (m) {
        const d = document.createElement('div'); d.className = cls;
        d.innerHTML = `<b class="lt-tit">${tit}</b> `;
        // tira a palavra de abertura ("Atenção:") que já virou título
        const prim = p.firstChild;
        if (prim?.nodeType === 3) prim.nodeValue = prim.nodeValue.replace(re, '');
        else if (prim?.nodeType === 1 && re.test(prim.textContent.trim())) prim.remove();
        d.append(...p.childNodes); p.replaceWith(d); break;
      }
    }
  }
}

export function padronizar(...secoes) {
  for (const s of secoes) {
    if (!s || s.dataset.padrao) continue;
    s.dataset.padrao = '1';
    caixas(s);
    realcar(s);
  }
}

// Tempo de leitura (180 palavras por minuto, mais 1 minuto por questão no meio do texto)
export function minutosLeitura(html, extras = 0) {
  const n = String(html || '').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(n / 180 + extras));
}

// Texto vindo de PDF: tira expressões de enchimento que só alongam a frase.
const ENCHE = [
  /\b(?:vale (?:a pena )?(?:ressaltar|destacar|lembrar|salientar|mencionar)|cumpre (?:ressaltar|destacar|salientar|observar)|[eé] (?:importante|interessante|v[aá]lido|oportuno) (?:ressaltar|destacar|lembrar|salientar|mencionar|observar|notar)|convém (?:ressaltar|destacar|lembrar)|não podemos (?:deixar de )?(?:esquecer|mencionar)|cabe (?:ressaltar|destacar|salientar|mencionar))\s+(?:que|o seguinte)\s*[:,]?\s*/gi,
  /\b(?:nesse|neste|desse|deste) (?:sentido|diapas[aã]o|contexto)\s*,\s*/gi,
  /\bcomo (?:já )?(?:dito|mencionado|visto|falado) (?:anteriormente|acima|antes)\s*,\s*/gi,
  /\bde (?:certa|alguma) forma\s*,?\s*/gi,
  /\bpor assim dizer\s*,?\s*/gi,
];
export function enxugar(t) {
  let s = String(t || '');
  for (const re of ENCHE) s = s.replace(re, '');
  // primeira letra maiúscula de novo depois do corte
  return s.replace(/(^|[.!?]\s+)([a-zà-ú])/g, (_, a, b) => a + b.toUpperCase()).replace(/\s{2,}/g, ' ').trim();
}
