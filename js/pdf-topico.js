// PDF do tópico do conteúdo programático, gerado no próprio navegador (sem bibliotecas externas).
// As páginas de conteúdo são PDF de verdade (texto vetorial em Helvetica, nítido em qualquer zoom e pesquisável);
// só a capa é imagem, em alta resolução. Capa com matéria e tópico, cabeçalho com a logo, número de página,
// texto sem flashcards/botões, questões numeradas e gabarito comentado no fim.
import { S } from './state.js';

// ---------- página A4 a 150 dpi ----------
const PW = 1240, PH = 1754, MX = 96, TOPO = 168, BASE = 1640, LARG = PW - 2 * MX;
const FONTE = "'Outfit', 'Segoe UI', Arial, sans-serif", SERIF = "'Fraunces', Georgia, serif";
const COR = { txt: '#1b1d21', txt2: '#5a606b', dest: '#9a5d00', link: '#0f7f93', ouro: '#C8902A' };
const fonte = (tam, neg, ita, fam = FONTE) => `${ita ? 'italic ' : ''}${neg ? '700' : '400'} ${tam}px ${fam}`;
const medidor = document.createElement('canvas').getContext('2d');
const K = 595.28 / PW; // unidade de layout -> ponto do PDF

// Larguras das fontes padrão do PDF (Helvetica e Helvetica-Bold, códigos 32 a 255 da WinAnsi, em milésimos)
const AFM = [[278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584,761,556,0,222,556,333,1000,556,556,333,1000,667,333,1000,0,611,0,0,222,222,333,333,350,556,1000,333,1000,500,333,944,0,500,667,278,333,556,556,556,556,260,556,333,737,370,556,584,333,737,333,400,584,333,333,333,556,537,278,333,333,365,556,834,834,834,611,667,667,667,667,667,667,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,500,556,556,556,556,278,278,278,278,556,556,556,556,556,556,556,584,611,556,556,556,556,500,556,500],[278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584,761,556,0,278,556,500,1000,556,556,333,1000,667,333,1000,0,611,0,0,278,278,500,500,350,556,1000,333,1000,556,333,944,0,500,667,278,333,556,556,556,556,280,556,333,737,370,556,584,333,737,333,400,584,333,333,333,611,556,278,333,333,365,556,834,834,834,611,722,722,722,722,722,722,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,556,556,556,556,556,278,278,278,278,611,611,611,611,611,611,611,584,611,611,611,611,611,556,611,556]];
const W1252 = '€\u0081‚ƒ„…†‡ˆ‰Š‹Œ\u008DŽ\u008F\u0090‘’“”•–—˜™š›œ\u009DžŸ';
const TROCA = { '→': '->', '←': '<-', '⇒': '=>', '⇔': '<=>', '↔': '<->', '≥': '>=', '≤': '<=', '≠': '!=', '≈': '~', '✓': 'v', '✔': 'v', '✅': 'v', '✗': 'x', '✘': 'x', '❌': 'x', '▸': '>', '►': '>', '➜': '>', '➔': '>', '−': '-', '‐': '-', '‑': '-', '√': 'raiz de ', '∴': 'portanto', 'π': 'pi', '∞': 'infinito', 'Δ': 'Delta', 'α': 'alfa', 'β': 'beta', '\u2009': ' ', '\u202F': ' ', '\u200B': '', '\uFE0F': '', '★': '*', '⭐': '*', '⚠': '!', '•': '•' };
const codigo = (ch) => { const c = ch.codePointAt(0); if (c < 128 || (c >= 160 && c < 256)) return c; const k = W1252.indexOf(ch); return k >= 0 ? 128 + k : -1; };
// Deixa só caracteres que as fontes padrão do PDF conseguem mostrar
const limpa = (s) => { let o = ''; for (const ch of String(s)) { if (codigo(ch) >= 0 && ch !== '\u0081' && ch !== '\u008D' && ch !== '\u008F' && ch !== '\u0090' && ch !== '\u009D') o += ch; else if (TROCA[ch] != null) o += TROCA[ch]; } return o; };
const largura = (s, tam, neg) => { const t = AFM[neg ? 1 : 0]; let w = 0; for (const ch of s) { const c = codigo(ch); w += c >= 32 ? t[c - 32] || 500 : 500; } return (w / 1000) * tam; };


// ---------- texto rico: nós inline viram trechos (negrito, itálico, cor) ----------
function trechos(no, est = {}, out = []) {
  for (const n of no.childNodes) {
    if (n.nodeType === 3) { const t = n.textContent.replace(/\s+/g, ' '); if (t) out.push({ t, ...est }); continue; }
    if (n.nodeType !== 1) continue;
    const tag = n.tagName;
    if (tag === 'BR') { out.push({ t: '\n', ...est }); continue; }
    if (/^(BUTTON|INPUT|SELECT|SVG|SCRIPT|STYLE|IMG|FIGURE)$/.test(tag)) continue;
    const e = { ...est };
    if (tag === 'B' || tag === 'STRONG' || tag === 'MARK' || tag === 'SUMMARY') { e.neg = true; e.cor = e.cor || COR.dest; }
    if (tag === 'I' || tag === 'EM') e.ita = true;
    if (tag === 'A') e.cor = COR.link;
    if (n.classList?.contains('lt-tit')) { e.neg = true; }
    trechos(n, e, out);
  }
  return out;
}

// Quebra os trechos em linhas que cabem na largura.
// Sem 'fam': mede com as larguras da Helvetica (páginas vetoriais). Com 'fam': mede no canvas (capa).
function quebrar(ts, larg, tam, cor0 = COR.txt, fam = null) {
  const linhas = []; let linha = [], x = 0;
  const fecha = () => { linhas.push(linha); linha = []; x = 0; };
  for (const tr of ts) {
    if (tr.t === '\n') { fecha(); continue; }
    const f = fam ? fonte(tam, tr.neg, tr.ita, fam) : null; if (f) medidor.font = f;
    const mede = (s) => (fam ? medidor.measureText(s).width : largura(s, tam, tr.neg));
    const texto = fam ? tr.t : limpa(tr.t);
    const seg = (t, x0) => ({ t, f, neg: !!tr.neg, ita: !!tr.ita, cor: tr.cor || cor0, x: x0 });
    for (const pedaco of texto.split(/(\s+)/)) {
      if (!pedaco) continue;
      const esp = /^\s+$/.test(pedaco);
      if (esp && !linha.length) continue;
      const w = mede(esp ? ' ' : pedaco);
      if (!esp && x + w > larg && linha.length) fecha();
      if (!esp && w > larg) { // palavra enorme: corta
        let p = pedaco; while (p) { let k = p.length; while (k > 1 && mede(p.slice(0, k)) > larg - x) k--; linha.push(seg(p.slice(0, k), x)); x += mede(p.slice(0, k)); p = p.slice(k); if (p) fecha(); }
        continue;
      }
      linha.push(seg(esp ? ' ' : pedaco, x)); x += w;
    }
  }
  if (linha.length) fecha();
  return linhas.map((l) => { while (l.length && l[l.length - 1].t === ' ') l.pop(); return l; }).filter((l, i, a) => l.length || (i > 0 && i < a.length - 1));
}

// ---------- montagem: o conteúdo vira uma lista de "linhas" com altura fixa ----------
function montar(raiz) {
  const L = [];
  const espaco = (h, caixa) => L.push({ h, caixa });
  const paragrafo = (ts, { tam = 26, recuo = 0, caixa = null, marcador = '', cor = COR.txt, antes = 6, depois = 10, keep = 0, barra = false } = {}) => {
    const larg = LARG - recuo - (caixa ? 56 : 0) - (marcador ? 34 : 0);
    const ls = quebrar(ts, larg, tam, cor); if (!ls.length) return;
    if (antes) espaco(antes, caixa);
    ls.forEach((ln, i) => L.push({ h: Math.round(tam * 1.55), caixa, recuo: recuo + (caixa ? 32 : 0) + (marcador ? 34 : 0), segs: ln, tam, marcador: i === 0 ? marcador : '', keep: i === 0 ? keep : 0, barraTitulo: barra && i === 0 }));
    if (depois) espaco(depois, caixa);
  };
  const tabela = (tb, caixa) => {
    const rows = [...tb.querySelectorAll('tr')]; if (!rows.length) return;
    const nc = Math.max(...rows.map((r) => r.children.length)); const cw = (LARG - (caixa ? 56 : 0)) / nc;
    espaco(8, caixa);
    rows.forEach((r, ri) => {
      const cab = ri === 0 && r.querySelector('th');
      const cels = [...r.children].map((c) => quebrar(trechos(c, cab ? { neg: true, cor: '#111' } : {}), cw - 20, 22));
      const nl = Math.max(1, ...cels.map((c) => c.length)), h = nl * 32 + 16;
      L.push({ h, caixa, tabela: { cels, cw, cab, nc }, keep: cab ? 1 : 0 });
    });
    espaco(12, caixa);
  };
  const bloco = (el, caixa = null, recuo = 0) => {
    for (const n of el.childNodes) {
      if (n.nodeType === 3) { if (n.textContent.trim()) paragrafo([{ t: n.textContent }], { caixa, recuo }); continue; }
      if (n.nodeType !== 1) continue;
      const tag = n.tagName, cls = [...n.classList];
      if (/^(BUTTON|INPUT|SELECT|SCRIPT|STYLE|SVG|FIGURE|IMG|CANVAS)$/.test(tag)) continue;
      if (cls.includes('lt-flash-box') && !caixa) { memorizar(L, [...n.querySelectorAll('.lt-fc')].map((b) => [b.querySelector('.fr'), b.querySelector('.vs')]).filter((x) => x[0] && x[1])); continue; }
      if (cls.some((c) => /^lt-(flash|flash-box|fc|pegtreino|quiz|q|charge)$/.test(c))) continue;
      if (cls.includes('lt-pegs') && !caixa) {
        const its = [...n.querySelectorAll('li')].map((li) => [li.querySelector('.banca'), li.querySelector('.certo')]).filter((x) => x[0] && x[1]);
        caixaRes(L, { ...RES.peg, rot: 'PEGADINHAS MAIS COBRADAS' }, its.map(([b, c]) => [{ t: 'Banca: ', neg: true, cor: '#C0392B' }, ...trechos(b).map((r) => ({ ...r, neg: false, cor: COR.txt2 })), { t: '\n' }, { t: 'Certo: ', neg: true, cor: '#2B6A1F' }, ...trechos(c)]));
        continue;
      }
      const tipo = cls.map((c) => TIPO_CAIXA[c]).find(Boolean);
      if (tipo && !caixa) {
        const cx = RES[tipo[0]];
        const titEl = n.querySelector(':scope > .lt-tit, :scope > .art-cab');
        const titTxt = limpa(titEl ? titEl.textContent : '').replace(/^[^A-Za-zÀ-ÿ0-9]+/, '').trim();
        const rot = (tipo[1] && (!titTxt || tipo[2]) ? tipo[1] + (tipo[2] && titTxt ? ' · ' + titTxt : '') : titTxt || tipo[1]).toUpperCase();
        L.push({ h: 12 }, { h: 12, caixa: cx, keep: 3 });
        quebrar([{ t: rot, neg: true, cor: cx.titulo }], LARG - 56, 18).forEach((ln, k) => L.push({ h: 30, caixa: cx, segs: ln, tam: 18, recuo: 32, keep: k === 0 ? 2 : 0 }));
        const copia = n.cloneNode(true); copia.querySelector(':scope > .lt-tit, :scope > .art-cab')?.remove();
        copia.querySelectorAll('summary').forEach((x) => (x.textContent = 'Solução comentada'));
        if (copia.querySelector('p,ul,ol,table,div,details,h1,h2,h3,h4')) bloco(copia, cx, 0); else paragrafo(trechos(copia), { caixa: cx, antes: 0, depois: 4, tam: 24 });
        espaco(14, cx); espaco(12);
        continue;
      }
      if (/^H[1-4]$/.test(tag)) { if (caixa) { paragrafo(trechos(n, { neg: true, cor: COR.txt }), { tam: 25, caixa }); continue; } espaco(18); const cx = { bg: tingir(corAtual), barra: corAtual }; espaco(10, cx); paragrafo(trechos(n, { neg: true, cor: '#1b1d21' }).map((r) => ({ ...r, cor: '#1b1d21' })), { tam: 29, caixa: cx, antes: 0, depois: 0, keep: 4 }); espaco(10, cx); espaco(8); continue; }
      if (tag === 'P' || tag === 'SUMMARY' || tag === 'BLOCKQUOTE') { paragrafo(trechos(n, tag === 'SUMMARY' ? { neg: true, cor: '#2E6B22' } : {}), { caixa, recuo }); continue; }
      if (tag === 'UL' || tag === 'OL') {
        [...n.children].forEach((li, i) => {
          const sub = li.querySelector('ul,ol'); const c2 = li.cloneNode(true); c2.querySelectorAll('ul,ol').forEach((x) => x.remove());
          paragrafo(trechos(c2), { caixa, recuo, marcador: tag === 'OL' ? `${i + 1}.` : '•', antes: 2, depois: 4 });
          if (sub) bloco({ childNodes: [sub] }, caixa, recuo + 34);
        });
        espaco(6, caixa); continue;
      }
      if (tag === 'TABLE') { tabela(n, caixa); continue; }
      if (cls.includes('lt-stats')) { cartoes(L, [...n.querySelectorAll('.lt-stat')].map((x) => ({ n: (x.querySelector('b')?.textContent || '').trim(), t: (x.querySelector('span')?.textContent || '').trim() }))); continue; }
      if (tag === 'DETAILS') { bloco(n, caixa, recuo); continue; }
      if (/^(DIV|SECTION|ARTICLE|ASIDE|DL|DD|DT|SPAN|LABEL|CENTER)$/.test(tag)) {
        const temBloco = n.querySelector('p,ul,ol,table,div,h1,h2,h3,h4,details');
        if (temBloco) bloco(n, caixa, recuo); else paragrafo(trechos(n), { caixa, recuo });
        continue;
      }
      paragrafo(trechos(n), { caixa, recuo });
    }
  };
  bloco(raiz);
  return L;
}

// ---------- paginação ----------
function paginar(L, topo1 = TOPO) {
  const pags = []; let atual = [], y = topo1;
  const nova = () => { pags.push(atual); atual = []; y = TOPO; };
  for (let i = 0; i < L.length; i++) {
    const ln = L[i];
    if (ln.quebra) { if (atual.length) nova(); continue; }
    let precisa = ln.h; if (ln.keep) for (let k = 1; k <= ln.keep && L[i + k]; k++) precisa += L[i + k].h;
    if (y + Math.min(precisa, BASE - TOPO) > BASE && atual.length) nova();
    if (!atual.length && !ln.segs && !ln.tabela && !ln.caixa && !ln.faixa && !ln.chips) continue; // não começa página com espaço vazio
    atual.push({ ...ln, y }); y += ln.h;
  }
  if (atual.length) pags.push(atual);
  return pags;
}

// ---------- desenho vetorial (comandos de página PDF) ----------
const rgb = (h) => { let s = String(h).replace('#', ''); if (s.length === 3) s = [...s].map((c) => c + c).join(''); return [0, 2, 4].map((i) => (parseInt(s.slice(i, i + 2), 16) / 255).toFixed(3)).join(' '); };
const n2 = (v) => (Math.round(v * 100) / 100).toString();
const pdfStr = (s) => { let o = ''; for (const ch of s) { const c = codigo(ch); if (c < 0) continue; if (c === 40 || c === 41 || c === 92) o += '\\' + ch; else if (c < 128) o += ch; else o += '\\' + c.toString(8).padStart(3, '0'); } return o; };
class Pagina {
  constructor() { this.ops = []; }
  ret(x, y, w, h, cor) { this.ops.push(`${rgb(cor)} rg ${n2(x * K)} ${n2((PH - y - h) * K)} ${n2(w * K)} ${n2(h * K)} re f`); }
  borda(x, y, w, h, cor, lw = 2) { this.ops.push(`${rgb(cor)} RG ${n2(lw * K)} w ${n2(x * K)} ${n2((PH - y - h) * K)} ${n2(w * K)} ${n2(h * K)} re S`); }
  texto(t, x, y, tam, { neg = false, ita = false, cor = COR.txt, alinha = 'left' } = {}) {
    t = limpa(t); if (!t) return;
    if (alinha === 'right') x -= largura(t, tam, neg); else if (alinha === 'center') x -= largura(t, tam, neg) / 2;
    this.ops.push(`BT /F${1 + (neg ? 1 : 0) + (ita ? 2 : 0)} ${n2(tam * K)} Tf ${rgb(cor)} rg ${n2(x * K)} ${n2((PH - y) * K)} Td (${pdfStr(t)}) Tj ET`);
  }
  imagem(nome, x, y, w, h) { this.ops.push(`q ${n2(w * K)} 0 0 ${n2(h * K)} ${n2(x * K)} ${n2((PH - y - h) * K)} cm /${nome} Do Q`); }
  get conteudo() { return this.ops.join('\n'); }
}

function desenharLinhas(pg, linhas) {
  for (const ln of linhas) {
    if (ln.caixa) { pg.ret(MX, ln.y, LARG, ln.h, ln.caixa.bg); pg.ret(MX, ln.y, 8, ln.h, ln.caixa.barra); }
    if (ln.regua) { pg.ret(MX, ln.y, LARG, 5, COR.ouro); continue; }
    if (ln.regua2) { pg.ret(MX, ln.y, LARG, 1.5, '#e3e5e9'); continue; }
    if (ln.faixa) { const f = ln.faixa; pg.ret(MX, ln.y + 6, LARG, ln.h - 12, f.cor); pg.ret(MX, ln.y + 6, 76, ln.h - 12, f.escura || '#000000'); if (f.num != null) pg.texto(String(f.num).padStart(2, '0'), MX + 38, ln.y + ln.h / 2 + 11, 30, { neg: true, cor: '#ffffff', alinha: 'center' }); const y0 = ln.y + ln.h / 2 - (f.linhas.length - 1) * 17 + 10; f.linhas.forEach((t, k) => pg.texto(t, MX + 96, y0 + k * 34, 27, { neg: true, cor: '#ffffff' })); continue; }
    if (ln.chips) { const n = ln.chips.length, gap = 14, w = (LARG - gap * (n - 1)) / n; ln.chips.forEach((c, k) => { const x = MX + k * (w + gap); pg.ret(x, ln.y + 4, w, ln.h - 12, c.bg); pg.ret(x, ln.y + 4, w, 5, c.cor); pg.texto(corta(c.n, w - 24, 30, true), x + 14, ln.y + 46, 30, { neg: true, cor: c.cor }); c.linhas.forEach((l2, j) => pg.texto(l2, x + 14, ln.y + 76 + j * 26, 19, { cor: COR.txt })); }); continue; }
    if (ln.tabela) {
      const { cels, cw, cab } = ln.tabela, x0 = MX + (ln.caixa ? 28 : 0);
      if (cab) pg.ret(x0, ln.y, cw * cels.length, ln.h, COR.ouro);
      cels.forEach((c, k) => { pg.borda(x0 + k * cw, ln.y, cw, ln.h, '#d9dce1'); c.forEach((linha, j) => linha.forEach((s) => pg.texto(s.t, x0 + k * cw + 10 + s.x, ln.y + 36 + j * 32, 22, { neg: s.neg, ita: s.ita, cor: cab ? '#111111' : s.cor }))); });
      continue;
    }
    if (!ln.segs) continue;
    const x0 = MX + (ln.recuo || 0), base = ln.y + Math.round(ln.tam * 1.15);
    if (ln.barraTitulo) pg.ret(MX - 22, ln.y + 6, 7, ln.h - 10, COR.ouro);
    if (ln.marcador) pg.texto(ln.marcador, x0 - 30, base, ln.tam, { neg: true, cor: COR.ouro });
    for (const s of ln.segs) pg.texto(s.t, x0 + s.x, base, ln.tam, { neg: s.neg, ita: s.ita, cor: s.cor });
  }
}

// Cabeçalho (logo, matéria e seção) e rodapé (tópico e número da página)
const corta = (t, max, tam, neg) => { t = limpa(t); if (largura(t, tam, neg) <= max) return t; while (t.length > 4 && largura(t + '…', tam, neg) > max) t = t.slice(0, -1); return t.trimEnd() + '…'; };
function moldura(pg, p, total, info, logo) {
  const lh = 60, lw = (logo.w / logo.h) * lh;
  pg.imagem('Lg', MX, 50, lw, lh);
  pg.texto(corta(info.materia, LARG - lw - 40, 22, true), PW - MX, 78, 22, { neg: true, alinha: 'right' });
  pg.texto(corta(info.secao, LARG - lw - 40, 19, false), PW - MX, 106, 19, { cor: COR.txt2, alinha: 'right' });
  pg.ret(MX, 128, LARG, 3, COR.ouro);
  pg.ret(MX, BASE + 40, LARG, 2, '#dfe2e6');
  pg.texto(corta(info.rodape, LARG - 240, 18, false), MX, BASE + 76, 18, { cor: '#7a808a' });
  pg.texto(`Página ${p} de ${total}`, PW - MX, BASE + 76, 18, { neg: true, cor: '#7a808a', alinha: 'right' });
}

// ---------- montagem do arquivo PDF ----------
async function comprime(txt) {
  const bytes = new TextEncoder().encode(txt);
  if (typeof CompressionStream === 'undefined') return { dados: bytes, filtro: '' };
  try { const s = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate')); return { dados: new Uint8Array(await new Response(s).arrayBuffer()), filtro: ' /Filter /FlateDecode' }; }
  catch { return { dados: bytes, filtro: '' }; }
}
async function montaPdf(capaJpg, logo, paginas) {
  const enc = new TextEncoder(), partes = [], offs = []; let tam = 0;
  const put = (x) => { const b = typeof x === 'string' ? enc.encode(x) : x; partes.push(b); tam += b.length; };
  const obj = (i, corpo, stream) => { offs[i] = tam; put(`${i} 0 obj\n${corpo}\n`); if (stream) { put('stream\n'); put(stream); put('\nendstream\n'); } put('endobj\n'); };
  put('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  const W = '595.28', H = '841.89', nP = paginas.length + (capaJpg ? 1 : 0), P0 = 10;
  const kids = Array.from({ length: nP }, (_, k) => `${P0 + k * 2} 0 R`).join(' ');
  obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
  obj(2, `<< /Type /Pages /Kids [${kids}] /Count ${nP} >>`);
  obj(3, '<< /Producer (PROJETO R.I.S.K.) /Creator (PROJETO R.I.S.K.) >>');
  ['Helvetica', 'Helvetica-Bold', 'Helvetica-Oblique', 'Helvetica-BoldOblique'].forEach((f, i) => obj(4 + i, `<< /Type /Font /Subtype /Type1 /BaseFont /${f} /Encoding /WinAnsiEncoding >>`));
  obj(8, `<< /Type /XObject /Subtype /Image /Width ${logo.w} /Height ${logo.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${logo.jpg.length} >>`, logo.jpg);
  if (capaJpg) obj(9, `<< /Type /XObject /Subtype /Image /Width ${capaJpg.w} /Height ${capaJpg.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${capaJpg.jpg.length} >>`, capaJpg.jpg);
  const recursos = `<< /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R /F4 7 0 R >> /XObject << /Lg 8 0 R${capaJpg ? ' /Cv 9 0 R' : ''} >> >>`;
  const fluxos = [...(capaJpg ? [`q ${W} 0 0 ${H} 0 0 cm /Cv Do Q`] : []), ...paginas.map((p) => p.conteudo)];
  for (let k = 0; k < nP; k++) {
    const p = P0 + k * 2, { dados, filtro } = await comprime(fluxos[k]);
    obj(p, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources ${recursos} /Contents ${p + 1} 0 R >>`);
    obj(p + 1, `<< /Length ${dados.length}${filtro} >>`, dados);
  }
  const total = P0 + nP * 2, xref = tam;
  put(`xref\n0 ${total}\n0000000000 65535 f \n`);
  for (let i = 1; i < total; i++) put(String(offs[i]).padStart(10, '0') + ' 00000 n \n');
  put(`trailer\n<< /Size ${total} /Root 1 0 R /Info 3 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(partes, { type: 'application/pdf' });
}
const jpeg = (cv, q = 0.9) => new Promise((ok) => cv.toBlob(async (b) => ok(new Uint8Array(await b.arrayBuffer())), 'image/jpeg', q));
const espera = () => new Promise((r) => setTimeout(r, 0));

// ---------- estilo dos quadros (mesma estética em todos os PDFs) ----------
const RES = {
  stats: { bg: '#EAF2FB', barra: '#2F6FB0', titulo: '#1F4E80', rot: 'NÚMEROS E PRAZOS QUE CAEM' },
  bizu: { bg: '#EAF6E6', barra: '#3E8E2F', titulo: '#2B6A1F', rot: 'BIZU · MEMORIZAÇÃO' },
  peg: { bg: '#FDEDEC', barra: '#C0392B', titulo: '#962D22', rot: 'PEGADINHA' },
  jur: { bg: '#F2EEFA', barra: '#7B5EA7', titulo: '#5B3F8A', rot: 'JURISPRUDÊNCIA' },
  lei: { bg: '#E8F4F6', barra: '#2C8FA3', titulo: '#1F6F80', rot: 'LEI SECA' },
  caso: { bg: '#FFF4E5', barra: '#E08A1E', titulo: '#9A5A0B', rot: 'CASO PRÁTICO' },
  banca: { bg: '#FFF8E1', barra: '#C8902A', titulo: '#8A6210', rot: 'COMO A BANCA COBRA' },
  chave: { bg: '#F4F4F2', barra: '#8A8F98', titulo: '#4A4F58', rot: 'EXEMPLO' },
};
// classe do quadro -> [estilo, rótulo, junta o título próprio ao rótulo?]
const TIPO_CAIXA = {
  'lt-dica': ['bizu', 'Bizu · memorização'], 'lt-peg': ['peg', 'Pegadinha'], 'lt-jc': ['jur', 'Jurisprudência'], 'lt-juris': ['jur', 'Jurisprudência'],
  'lt-art': ['lei', 'Lei seca', true], 'lt-caso': ['caso', '', false], 'lt-box': ['banca', ''], 'lt-ex': ['chave', 'Exemplo'], 'lt-calc': ['chave', ''],
  'lt-fluxo': ['chave', 'Fluxo'], 'lt-barras': ['stats', ''], 'lt-verdade': ['chave', 'Tabela-verdade'],
};
let corAtual = COR.ouro;
const mistura = (h, alvo, f) => { let x = String(h).replace('#', ''); if (x.length === 3) x = [...x].map((c) => c + c).join(''); return '#' + [0, 2, 4].map((i, k) => Math.round(parseInt(x.slice(i, i + 2), 16) * (1 - f) + alvo[k] * f).toString(16).padStart(2, '0')).join(''); };
const tingir = (h) => mistura(h, [255, 255, 255], 0.88);
const escurecer = (h) => mistura(h, [0, 0, 0], 0.3);
const linhasDe = (t, larg, tam) => quebrar([{ t }], larg, tam).map((l) => l.map((x) => x.t).join(''));
const esc2 = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// cartões azuis com os números que caem (3 por linha)
function cartoes(L, st) {
  st = st.filter((x) => x.n); if (!st.length) return;
  L.push({ h: 10 }); L.push({ h: 28, segs: quebrar([{ t: RES.stats.rot, neg: true, cor: RES.stats.titulo }], LARG, 18)[0], tam: 18, recuo: 0, keep: 1 });
  for (let k = 0; k < st.length; k += 3) {
    const w = (LARG - 28) / 3 - 28;
    const chips = st.slice(k, k + 3).map((c) => ({ n: c.n, linhas: linhasDe(c.t, w, 19).slice(0, 5), cor: RES.stats.barra, bg: RES.stats.bg }));
    const nl = Math.max(...chips.map((c) => c.linhas.length));
    while (chips.length < 3) chips.push({ n: '', linhas: [], cor: '#ffffff', bg: '#ffffff' });
    L.push({ h: 66 + nl * 26, chips });
  }
  L.push({ h: 6 });
}
// tabela dourada "Memorize" a partir dos flashcards
function memorizar(L, pares) {
  if (!pares.length) return;
  const d = document.createElement('div');
  d.innerHTML = `<table><tr><th>Memorize</th><th>Resposta</th></tr>${pares.map(([f, v]) => `<tr><td>${esc2(f.textContent.trim())}</td><td><b>${esc2(v.textContent.trim())}</b></td></tr>`).join('')}</table>`;
  L.push({ h: 8 }); L.push(...montar(d));
}
// quadro colorido com rótulo e itens
function caixaRes(L, cx, itens, { marcador = '•' } = {}) {
  if (!itens.length) return;
  const tam = 22, lh = 33, larg = LARG - 56 - (marcador ? 30 : 0);
  L.push({ h: 12 }); L.push({ h: 12, caixa: cx, keep: 3 });
  L.push({ h: 30, caixa: cx, segs: quebrar([{ t: cx.rot, neg: true, cor: cx.titulo }], LARG - 56, 18)[0], tam: 18, recuo: 32, keep: 2 });
  itens.forEach((ts, k) => {
    quebrar(ts, larg, tam).forEach((ln, j) => L.push({ h: lh, caixa: cx, segs: ln, tam, recuo: 32 + (marcador ? 30 : 0), marcador: j === 0 ? marcador : '', keep: j === 0 && k === 0 ? 1 : 0 }));
    L.push({ h: 8, caixa: cx });
  });
  L.push({ h: 8, caixa: cx }); L.push({ h: 6 });
}
const faixaDe = (titulo, num, cor) => { const ls = linhasDe(titulo, LARG - 120, 27).slice(0, 3); return { h: 40 + ls.length * 34, faixa: { cor, escura: escurecer(cor), num, linhas: ls }, keep: 3 }; };

// ---------- conteúdo de um tópico (texto, leitura complementar, questões e gabarito) ----------
const palavras = (h) => String(h || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const questoesDe = (a) => (a.quiz || []).filter((q) => q && q.p);
function textoHtml(L, html) {
  const raiz = document.createElement('div'); raiz.innerHTML = String(html || '').replace(/<script[\s\S]*?<\/script>/gi, '');
  raiz.querySelectorAll('.lt-pegtreino, .lt-q, .lt-quiz, input, select, .lt-charge, .rd-ex').forEach((e) => e.remove());
  raiz.querySelectorAll('button:not(.lt-fc)').forEach((e) => e.remove());
  L.push(...montar(raiz));
}
function adicionarTopico(L, a, { comQuestoes = true, num = null, marca = null, cor = COR.ouro, quebraAntes = false } = {}) {
  corAtual = cor;
  if (quebraAntes) L.push({ quebra: true, h: 0 });
  L.push({ ...faixaDe(a.titulo, num, cor), ...(marca != null ? { marca } : {}) });
  if (a.arts) L.push({ h: 34, segs: quebrar([{ t: a.arts, ita: true, cor: COR.txt2 }], LARG, 21)[0], tam: 21, recuo: 0 }, { h: 8 });
  textoHtml(L, a.html);
  if (a.aprof) { L.push({ h: 16 }, faixaDe('Leitura complementar', null, escurecer(cor))); textoHtml(L, a.aprof); }
  const questoes = questoesDe(a);
  if (!comQuestoes || !questoes.length) return;
  L.push({ quebra: true, h: 0 }, faixaDe(`Questões · ${a.titulo}`, null, '#2b2f3a'), { h: 12 });
  const d = document.createElement('div');
  questoes.forEach((q, i) => {
    d.innerHTML = q.p;
    const ts = [{ t: `${i + 1}. `, neg: true, cor: cor }, ...(q.alts ? [{ t: '[Múltipla escolha] ', neg: true, cor: COR.txt2 }] : []), ...trechos(d).map((r) => ({ ...r, cor: r.cor === COR.dest ? COR.txt : r.cor }))];
    const ls = quebrar(ts, LARG, 24);
    ls.forEach((ln, k) => L.push({ h: 36, segs: ln, tam: 24, recuo: 0, keep: k === 0 ? Math.min(3, ls.length) : 0 }));
    if (q.alts) q.alts.forEach((x, j) => { d.innerHTML = x; quebrar([{ t: `${'ABCDE'[j]}) `, neg: true }, ...trechos(d)], LARG - 40, 23).forEach((ln) => L.push({ h: 34, segs: ln, tam: 23, recuo: 40 })); });
    else L.push({ h: 34, segs: quebrar([{ t: '(   ) Certo        (   ) Errado', cor: COR.txt2 }], LARG, 22)[0], tam: 22, recuo: 0 });
    L.push({ h: 20 });
  });
  L.push({ quebra: true, h: 0 }, faixaDe(`Gabarito comentado · ${a.titulo}`, null, '#2E6B22'), { h: 12 });
  const resp = (q) => (q.alts ? 'ABCDE'[q.r ?? 0] : q.c ? 'C' : 'E');
  const linhasGab = [];
  for (let i = 0; i < questoes.length; i += 10) { const ts = []; for (let k = i; k < Math.min(i + 10, questoes.length); k++) ts.push({ t: `${k + 1}-`, cor: COR.txt2 }, { t: `${resp(questoes[k])}     `, neg: true, cor: '#2B6A1F' }); linhasGab.push(ts); }
  caixaRes(L, { ...RES.bizu, rot: 'GABARITO' }, linhasGab, { marcador: '' });
  questoes.forEach((q, i) => {
    d.innerHTML = (q.alts ? q.n?.[q.r ?? 0] : q.x) || ''; let com = d.textContent.trim();
    if (/^literal\.?$/i.test(com)) com = 'Reproduz o texto da norma.';
    d.innerHTML = (q.alts ? q.x : q.prof || q.t) || ''; const fonteQ = d.textContent.trim();
    const ok = q.alts ? true : q.c;
    const ts = [{ t: `${i + 1}. ${q.alts ? 'Letra ' + resp(q) : q.c ? 'Certo' : 'Errado'}. `, neg: true, cor: ok ? '#2B6A1F' : '#C0392B' }, { t: com }, ...(fonteQ ? [{ t: ` (${fonteQ})`, ita: true, cor: COR.txt2 }] : [])];
    quebrar(ts, LARG, 22).forEach((ln, k) => L.push({ h: 33, segs: ln, tam: 22, recuo: 0, keep: k === 0 ? 1 : 0 }));
    L.push({ h: 8 });
  });
}

// ---------- primeira página com cabeçalho escuro (no lugar da capa) ----------
function cabecalho(pg, info, logo, cor) {
  const tit = linhasDe(info.titulo, LARG - 210, 42).slice(0, 4), alt = Math.max(360, 190 + tit.length * 50 + 120);
  pg.ret(0, 0, PW, alt, '#12151f'); pg.ret(0, alt - 8, PW, 8, cor);
  pg.ret(MX - 10, 60, 170, 170 * logo.h / logo.w + 20, '#ffffff'); pg.imagem('Lg', MX, 70, 150, 150 * logo.h / logo.w);
  pg.texto(corta(info.rotulo.toUpperCase(), LARG - 210, 21, true), MX + 200, 100, 21, { neg: true, cor: '#E9C46A' });
  tit.forEach((t, k) => pg.texto(t, MX + 200, 156 + k * 50, 42, { neg: true, cor: '#ffffff' }));
  pg.texto(corta(info.sub, LARG - 210, 20, false), MX + 200, 156 + tit.length * 50 + 6, 20, { cor: '#C9CED8' });
  const leg = [['Números', RES.stats.barra], ['Bizu', RES.bizu.barra], ['Memorize', COR.ouro], ['Pegadinha', RES.peg.barra], ['Lei seca', RES.lei.barra], ['Jurisprudência', RES.jur.barra], ['Caso', RES.caso.barra]];
  let x = MX; const yl = alt - 46; leg.forEach(([t, c]) => { pg.ret(x, yl - 14, 15, 15, c); pg.texto(t, x + 22, yl, 17, { cor: '#E6E8EE' }); x += 22 + largura(t, 17, false) + 22; });
  return alt + 40;
}
async function logoPdf() {
  const logo = new Image(); logo.src = 'img/logo-claro.webp'; await logo.decode();
  const lc = document.createElement('canvas'); lc.width = logo.naturalWidth; lc.height = logo.naturalHeight; const lx = lc.getContext('2d');
  lx.fillStyle = '#fff'; lx.fillRect(0, 0, lc.width, lc.height); lx.drawImage(logo, 0, 0);
  return { jpg: await jpeg(lc, 0.95), w: lc.width, h: lc.height };
}
async function gerar({ info, L, cor, titulos = null, nome, aviso }) {
  const logoJpg = await logoPdf();
  const pg0 = new Pagina(), topo1 = cabecalho(pg0, info, logoJpg, cor);
  const pags = paginar(L, topo1), total = pags.length;
  const inicio = new Map(); pags.forEach((pgL, i) => pgL.forEach((ln) => { if (ln.marca != null && !inicio.has(ln.marca)) inicio.set(ln.marca, i + 1); }));
  const paginas = []; let atual = info.rodape;
  for (let i = 0; i < pags.length; i++) {
    if (i % 5 === 0) { aviso(`Montando página ${i + 1} de ${total}…`); await espera(); }
    for (const ln of pags[i]) if (ln.marca != null && titulos) atual = titulos[ln.marca];
    const pg = i === 0 ? pg0 : new Pagina();
    desenharLinhas(pg, pags[i]);
    for (const ln of pags[i]) if (ln.sumIdx != null) pg.texto(String(inicio.get(ln.sumIdx) ?? ''), PW - MX, ln.y + Math.round(23 * 1.15), 23, { neg: true, cor, alinha: 'right' });
    if (i === 0) { pg.ret(MX, BASE + 40, LARG, 2, '#dfe2e6'); pg.texto(corta(info.rodape, LARG - 240, 18, false), MX, BASE + 76, 18, { cor: '#7a808a' }); pg.texto(`Página 1 de ${total}`, PW - MX, BASE + 76, 18, { neg: true, cor: '#7a808a', alinha: 'right' }); }
    else moldura(pg, i + 1, total, { ...info, rodape: atual }, logoJpg);
    paginas.push(pg);
  }
  aviso('Salvando…');
  return { blob: await montaPdf(null, logoJpg, paginas), nome: nome.replace(/[\\/:*?"<>|]+/g, '').slice(0, 120) + '.pdf', paginas: total };
}

// PDF de um tópico
export async function gerarPdfTopico(mat, a, aviso = () => {}) {
  aviso('Preparando o texto…');
  const cor = mat.cor || COR.ouro, num = (mat.assuntos || []).indexOf(a);
  const min = Math.round((palavras(a.html) + palavras(a.aprof)) / 180) || 0, nq = questoesDe(a).length;
  const info = { rotulo: `Conteúdo programático · ${mat.nome}`, titulo: a.titulo, sub: [a.arts, min ? `cerca de ${min} min de leitura` : '', nq ? `${nq} questões com gabarito` : '', new Date().toLocaleDateString('pt-BR')].filter(Boolean).join(' · '), materia: mat.nome, secao: 'Conteúdo programático · PROJETO R.I.S.K.', rodape: a.titulo };
  const L = []; adicionarTopico(L, a, { cor, num: num >= 0 ? num + 1 : null });
  return gerar({ info, L, cor, nome: `RISK - ${mat.nome} - ${a.titulo}`, aviso });
}

// Apostila completa da matéria: sumário na primeira página e todos os tópicos, sem limite de páginas
export async function gerarApostila(mat, { comQuestoes = false } = {}, aviso = () => {}) {
  aviso('Preparando a apostila…');
  const ass = mat.assuntos || [], cor = mat.cor || COR.ouro;
  const min = Math.round(ass.reduce((s, a) => s + palavras(a.html) + palavras(a.aprof), 0) / 180) || 0;
  const nq = ass.reduce((s, a) => s + questoesDe(a).length, 0);
  const info = { rotulo: 'Apostila completa · PROJETO R.I.S.K.', titulo: mat.nome, sub: `${ass.length} tópicos · cerca de ${min} min de leitura${comQuestoes ? ` · ${nq} questões com gabarito` : ''} · ${new Date().toLocaleDateString('pt-BR')}`, materia: mat.nome, secao: 'Apostila · PROJETO R.I.S.K.', rodape: 'Sumário' };
  const L = [faixaDe('Sumário', null, '#2b2f3a'), { h: 10 }];
  ass.forEach((a, k) => { const ln = quebrar([{ t: `${String(k + 1).padStart(2, '0')}  `, neg: true, cor }, { t: a.titulo }], LARG - 110, 23)[0] || []; L.push({ h: 44, segs: ln, tam: 23, recuo: 0, sumIdx: k }, { h: 2, regua2: true }); });
  for (let i = 0; i < ass.length; i++) {
    if (i % 3 === 0) { aviso(`Organizando o tópico ${i + 1} de ${ass.length}…`); await espera(); }
    adicionarTopico(L, ass[i], { comQuestoes, num: i + 1, marca: i, cor, quebraAntes: true });
  }
  return gerar({ info, L, cor, titulos: ass.map((a) => a.titulo), nome: `RISK - Apostila - ${mat.nome}`, aviso });
}

function baixar({ blob, nome }) {
  const url = URL.createObjectURL(blob), link = document.createElement('a');
  link.href = url; link.download = nome; document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
export async function baixarPdfTopico(mat, a, aviso) { baixar(await gerarPdfTopico(mat, a, aviso)); }
export async function baixarApostila(mat, opcoes, aviso) { baixar(await gerarApostila(mat, opcoes, aviso)); }
