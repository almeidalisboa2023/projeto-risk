// PDF do tópico do conteúdo programático, gerado no próprio navegador (sem bibliotecas externas):
// capa com matéria e tópico, cabeçalho com a logo e a identificação do aluno (nome e CPF), número de página,
// marca d'água, texto sem flashcards/botões, questões numeradas e gabarito comentado no fim.
import { S } from './state.js';

// ---------- página A4 a 150 dpi ----------
const PW = 1240, PH = 1754, MX = 96, TOPO = 168, BASE = 1640, LARG = PW - 2 * MX;
const FONTE = "'Outfit', 'Segoe UI', Arial, sans-serif", SERIF = "'Fraunces', Georgia, serif";
const COR = { txt: '#1b1d21', txt2: '#5a606b', dest: '#9a5d00', link: '#0f7f93', ouro: '#C8902A' };
const CAIXAS = {
  'lt-dica': { bg: '#EEF6EA', barra: '#4E9B3C', titulo: '#2E6B22' },
  'lt-caso': { bg: '#F3F4F6', barra: '#8A8F98', titulo: COR.dest },
  'lt-ex': { bg: '#F3F4F6', barra: '#8A8F98', titulo: COR.dest },
  'lt-box': { bg: '#F3F4F6', barra: '#8A8F98', titulo: COR.dest },
  'lt-pegs': { bg: '#FFF6E8', barra: '#E0A43A', titulo: '#8a5a00' },
  'lt-peg': { bg: '#FFF6E8', barra: '#E0A43A', titulo: '#8a5a00' },
  'lt-art': { bg: '#F2F7FA', barra: '#2C8FA3', titulo: '#1f6f80' },
  'lt-jc': { bg: '#F4F1FA', barra: '#7B5EA7', titulo: '#5b3f8a' },
  'lt-juris': { bg: '#F4F1FA', barra: '#7B5EA7', titulo: '#5b3f8a' },
  'lt-calc': { bg: '#F3F4F6', barra: '#8A8F98', titulo: COR.dest },
  'lt-fluxo': { bg: '#F3F4F6', barra: '#8A8F98', titulo: COR.dest },
};
const fmtCpf = (c) => { const d = String(c || '').replace(/\D/g, ''); return d.length === 11 ? `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}` : ''; };
const fonte = (tam, neg, ita, fam = FONTE) => `${ita ? 'italic ' : ''}${neg ? '700' : '400'} ${tam}px ${fam}`;
const medidor = document.createElement('canvas').getContext('2d');

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

// Quebra os trechos em linhas que cabem na largura
function quebrar(ts, larg, tam, cor0 = COR.txt, fam = FONTE) {
  const linhas = []; let linha = [], x = 0;
  const fecha = () => { linhas.push(linha); linha = []; x = 0; };
  for (const tr of ts) {
    if (tr.t === '\n') { fecha(); continue; }
    const f = fonte(tam, tr.neg, tr.ita, fam); medidor.font = f;
    for (const pedaco of tr.t.split(/(\s+)/)) {
      if (!pedaco) continue;
      const esp = /^\s+$/.test(pedaco);
      if (esp && !linha.length) continue;
      let w = medidor.measureText(esp ? ' ' : pedaco).width;
      if (!esp && x + w > larg && linha.length) { fecha(); }
      if (!esp && w > larg) { // palavra enorme: corta
        let p = pedaco; while (p) { let k = p.length; while (k > 1 && medidor.measureText(p.slice(0, k)).width > larg - x) k--; linha.push({ t: p.slice(0, k), f, cor: tr.cor || cor0, x }); x += medidor.measureText(p.slice(0, k)).width; p = p.slice(k); if (p) fecha(); }
        continue;
      }
      linha.push({ t: esp ? ' ' : pedaco, f, cor: tr.cor || cor0, x }); x += w;
    }
  }
  if (linha.length) fecha();
  // tira espaços no fim da linha
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
      L.push({ h, caixa, tabela: { cels, cw, cab, nc } });
    });
    espaco(12, caixa);
  };
  const bloco = (el, caixa = null, recuo = 0) => {
    for (const n of el.childNodes) {
      if (n.nodeType === 3) { if (n.textContent.trim()) paragrafo([{ t: n.textContent }], { caixa, recuo }); continue; }
      if (n.nodeType !== 1) continue;
      const tag = n.tagName, cls = [...n.classList];
      if (/^(BUTTON|INPUT|SELECT|SCRIPT|STYLE|SVG|FIGURE|IMG|CANVAS)$/.test(tag)) continue;
      if (cls.some((c) => /^lt-(flash|flash-box|fc|pegtreino|quiz|q|charge)$/.test(c))) continue;
      const cx = cls.map((c) => CAIXAS[c]).find(Boolean);
      if (cx && !caixa) {
        espaco(14); espaco(18, cx);
        const tit = n.querySelector(':scope > .lt-tit, :scope > .art-cab');
        if (tit) paragrafo(trechos(tit, { neg: true, cor: cx.titulo }), { caixa: cx, tam: 25, antes: 0, depois: 6, keep: 2 });
        const copia = n.cloneNode(true); copia.querySelector(':scope > .lt-tit, :scope > .art-cab')?.remove();
        bloco(copia, cx, 0);
        espaco(18, cx); espaco(14);
        continue;
      }
      if (/^H[1-4]$/.test(tag)) { paragrafo(trechos(n, { neg: true, cor: COR.txt }), { tam: tag === 'H2' ? 36 : 32, caixa, antes: 26, depois: 10, keep: 4, barra: !caixa }); continue; }
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
      if (cls.includes('lt-stats')) {
        [...n.querySelectorAll('.lt-stat')].forEach((s) => { const v = s.querySelector('b'), d = s.cloneNode(true); d.querySelector('b')?.remove();
          paragrafo([{ t: (v?.textContent || '').trim() + ' — ', neg: true, cor: COR.dest }, { t: d.textContent.trim() }], { caixa, recuo, marcador: '▸', antes: 2, depois: 4 }); });
        espaco(8, caixa); continue;
      }
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
function paginar(L) {
  const pags = []; let atual = [], y = TOPO;
  const nova = () => { pags.push(atual); atual = []; y = TOPO; };
  for (let i = 0; i < L.length; i++) {
    const ln = L[i];
    if (ln.quebra) { if (atual.length) nova(); continue; }
    let precisa = ln.h; if (ln.keep) for (let k = 1; k <= ln.keep && L[i + k]; k++) precisa += L[i + k].h;
    if (y + Math.min(precisa, BASE - TOPO) > BASE && atual.length) nova();
    if (!atual.length && !ln.segs && !ln.tabela && !ln.caixa) continue; // não começa página com espaço vazio
    atual.push({ ...ln, y }); y += ln.h;
  }
  if (atual.length) pags.push(atual);
  return pags;
}

// ---------- desenho ----------
function desenharLinhas(ctx, linhas) {
  for (const ln of linhas) {
    if (ln.caixa) { ctx.fillStyle = ln.caixa.bg; ctx.fillRect(MX, ln.y, LARG, ln.h); ctx.fillStyle = ln.caixa.barra; ctx.fillRect(MX, ln.y, 8, ln.h); }
    if (ln.tabela) {
      const { cels, cw, cab } = ln.tabela, x0 = MX + (ln.caixa ? 28 : 0);
      if (cab) { ctx.fillStyle = COR.ouro; ctx.fillRect(x0, ln.y, cw * cels.length, ln.h); }
      ctx.strokeStyle = '#d9dce1'; ctx.lineWidth = 2;
      cels.forEach((c, k) => { ctx.strokeRect(x0 + k * cw, ln.y, cw, ln.h); c.forEach((linha, j) => linha.forEach((s) => { ctx.font = s.f; ctx.fillStyle = cab ? '#111' : s.cor; ctx.fillText(s.t, x0 + k * cw + 10 + s.x, ln.y + 36 + j * 32); })); });
      continue;
    }
    if (!ln.segs) continue;
    const x0 = MX + (ln.recuo || 0), base = ln.y + Math.round(ln.tam * 1.15);
    if (ln.barraTitulo) { ctx.fillStyle = COR.ouro; ctx.fillRect(MX - 22, ln.y + 6, 7, ln.h - 10); }
    if (ln.marcador) { ctx.font = fonte(ln.tam, true); ctx.fillStyle = COR.ouro; ctx.fillText(ln.marcador, x0 - 30, base); }
    for (const s of ln.segs) { ctx.font = s.f; ctx.fillStyle = s.cor; ctx.fillText(s.t, x0 + s.x, base); }
  }
}

function moldura(ctx, p, total, info, logo) {
  // cabeçalho
  const lh = 64, lw = (logo.width / logo.height) * lh;
  ctx.drawImage(logo, MX, 44, lw, lh);
  ctx.textAlign = 'right'; ctx.fillStyle = COR.txt; ctx.font = fonte(24, true); ctx.fillText(info.nome, PW - MX, 72);
  ctx.fillStyle = COR.txt2; ctx.font = fonte(21); ctx.fillText(`CPF ${info.cpf}`, PW - MX, 102);
  ctx.fillStyle = COR.ouro; ctx.fillRect(MX, 128, LARG, 3);
  // rodapé
  ctx.fillStyle = '#dfe2e6'; ctx.fillRect(MX, BASE + 40, LARG, 2);
  ctx.font = fonte(19); ctx.fillStyle = '#7a808a';
  ctx.textAlign = 'left'; let r = info.rodape; while (medidor.measureText(r).width > LARG - 260 && r.length > 10) { r = r.slice(0, -2); medidor.font = ctx.font; } ctx.fillText(r, MX, BASE + 76);
  ctx.textAlign = 'right'; ctx.fillText(`Página ${p} de ${total}`, PW - MX, BASE + 76);
  ctx.textAlign = 'left';
  // marca d'água discreta
  ctx.save(); ctx.globalAlpha = 0.06; ctx.translate(PW / 2, PH / 2); ctx.rotate(-Math.PI / 5); ctx.textAlign = 'center';
  ctx.font = fonte(54, true); ctx.fillStyle = '#000'; ctx.fillText(`${info.nome} · ${info.cpf}`, 0, 0);
  ctx.font = fonte(30); ctx.fillText('Uso pessoal e intransferível · PROJETO R.I.S.K.', 0, 60);
  ctx.restore();
}

function capa(ctx, info, logo) {
  const g = ctx.createLinearGradient(0, 0, PW, PH); g.addColorStop(0, '#0f1220'); g.addColorStop(0.55, '#171c2e'); g.addColorStop(1, '#0b0d14');
  ctx.fillStyle = g; ctx.fillRect(0, 0, PW, PH);
  ctx.strokeStyle = 'rgba(233,196,106,.25)'; ctx.lineWidth = 3; for (const r of [300, 380, 470]) { ctx.beginPath(); ctx.arc(PW - 60, 120, r, 0, Math.PI * 2); ctx.stroke(); }
  // logo sobre placa clara
  const lw = 360, lh = (logo.height / logo.width) * lw;
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(MX - 12, 100, lw + 24, lh + 24, 22) : ctx.rect(MX - 12, 100, lw + 24, lh + 24); ctx.fill();
  ctx.drawImage(logo, MX, 112, lw, lh);
  let y = 760;
  ctx.fillStyle = '#E9C46A'; ctx.fillRect(MX, y - 60, 150, 10);
  ctx.font = fonte(26, true); ctx.fillStyle = '#E9C46A'; ctx.fillText(info.sup.toUpperCase(), MX, y);
  y += 30;
  for (const ln of quebrar([{ t: info.materia, neg: true }], LARG, 76, '#fff', SERIF).slice(0, 3)) { y += 92; ln.forEach((s) => { ctx.font = s.f; ctx.fillStyle = '#fff'; ctx.fillText(s.t, MX + s.x, y); }); }
  y += 30;
  for (const ln of quebrar([{ t: info.topico }], LARG, 46, '#E9E4D8').slice(0, 4)) { y += 62; ln.forEach((s) => { ctx.font = s.f; ctx.fillStyle = '#E9E4D8'; ctx.fillText(s.t, MX + s.x, y); }); }
  if (info.arts) { y += 50; ctx.font = fonte(26); ctx.fillStyle = '#b9b4a8'; ctx.fillText(info.arts.slice(0, 80), MX, y); }
  // quadro do aluno
  const qy = 1290, qh = 230; ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.fillRect(MX, qy, LARG, qh); ctx.strokeStyle = 'rgba(255,255,255,.15)'; ctx.lineWidth = 2; ctx.strokeRect(MX, qy, LARG, qh);
  const campo = (rot, val, x, yy) => { ctx.font = fonte(20, true); ctx.fillStyle = '#b9b4a8'; ctx.fillText(rot.toUpperCase(), x, yy); ctx.font = fonte(30, true); ctx.fillStyle = '#fff'; ctx.fillText(val, x, yy + 40); };
  campo('Aluno', info.nome.slice(0, 34), MX + 30, qy + 56); campo('CPF', info.cpf, MX + LARG / 2 + 20, qy + 56);
  campo('Emitido em', info.data, MX + 30, qy + 156); campo('Questões', info.nq ? `${info.nq} com gabarito` : '—', MX + LARG / 2 + 20, qy + 156);
  ctx.font = fonte(20); ctx.fillStyle = '#9d988c';
  quebrar([{ t: 'Material de uso pessoal e intransferível. Este arquivo é identificado com o nome e o CPF do aluno que o baixou; o compartilhamento é proibido.' }], LARG, 20).forEach((ln, i) => ln.forEach((s) => ctx.fillText(s.t, MX + s.x, 1600 + i * 30)));
}

// ---------- PDF com uma imagem JPEG por página ----------
function montaPdf(imgs) {
  const enc = new TextEncoder(), partes = [], offs = []; let tam = 0;
  const put = (x) => { const b = typeof x === 'string' ? enc.encode(x) : x; partes.push(b); tam += b.length; };
  const obj = (i, corpo, stream) => { offs[i] = tam; put(`${i} 0 obj\n${corpo}\n`); if (stream) { put('stream\n'); put(stream); put('\nendstream\n'); } put('endobj\n'); };
  put('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  const nP = imgs.length, kids = imgs.map((_, k) => `${4 + k * 3} 0 R`).join(' ');
  obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
  obj(2, `<< /Type /Pages /Kids [${kids}] /Count ${nP} >>`);
  obj(3, '<< /Producer (PROJETO R.I.S.K.) /Creator (PROJETO R.I.S.K.) >>');
  imgs.forEach((im, k) => {
    const p = 4 + k * 3, c = p + 1, x = p + 2, w = '595.28', h = '841.89';
    obj(p, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${w} ${h}] /Resources << /XObject << /Im${k} ${x} 0 R >> >> /Contents ${c} 0 R >>`);
    const cs = enc.encode(`q ${w} 0 0 ${h} 0 0 cm /Im${k} Do Q`);
    obj(c, `<< /Length ${cs.length} >>`, cs);
    obj(x, `<< /Type /XObject /Subtype /Image /Width ${im.w} /Height ${im.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${im.jpg.length} >>`, im.jpg);
  });
  const total = 4 + nP * 3, xref = tam;
  put(`xref\n0 ${total}\n0000000000 65535 f \n`);
  for (let i = 1; i < total; i++) put(String(offs[i]).padStart(10, '0') + ' 00000 n \n');
  put(`trailer\n<< /Size ${total} /Root 1 0 R /Info 3 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(partes, { type: 'application/pdf' });
}
const jpeg = (cv) => new Promise((ok) => cv.toBlob(async (b) => ok(new Uint8Array(await b.arrayBuffer())), 'image/jpeg', 0.8));
const espera = () => new Promise((r) => setTimeout(r, 0));

// ---------- função principal ----------
export async function gerarPdfTopico(mat, a, aviso = () => {}) {
  aviso('Preparando o texto…');
  try { await document.fonts?.load(fonte(26, true)); await document.fonts?.load(fonte(26)); await document.fonts?.load(fonte(80, true, false, SERIF)); } catch {}
  const logo = new Image(); logo.src = 'img/logo-claro.webp'; await logo.decode();
  const info = {
    nome: S.profile?.nome || S.user?.email || 'Aluno', cpf: fmtCpf(S.profile?.cpf) || 'não informado',
    data: new Date().toLocaleDateString('pt-BR'), materia: mat.nome, topico: a.titulo, arts: a.arts || '',
    sup: 'Conteúdo programático' + (S.edital?.concurso ? ' · ' + S.edital.concurso : ''), rodape: `${mat.nome} · ${a.titulo}`,
  };
  const questoes = (a.quiz || []).filter((q) => q && q.p);
  info.nq = questoes.length;

  // texto do tópico, limpo
  const raiz = document.createElement('div'); raiz.innerHTML = String(a.html || '').replace(/<script[\s\S]*?<\/script>/gi, '');
  raiz.querySelectorAll('.lt-flash-box, .lt-flash, .lt-pegtreino, button, .lt-q, .lt-quiz, input, select, .lt-charge').forEach((e) => e.remove());
  const L = montar(raiz);

  // questões e gabarito
  if (questoes.length) {
    L.push({ quebra: true, h: 0 });
    const tit = (t) => { L.push({ h: 72, segs: quebrar([{ t, neg: true }], LARG, 44, COR.txt)[0], tam: 44, recuo: 0, keep: 3 }); L.push({ h: 10, regua: true }); L.push({ h: 16 }); };
    tit('Questões');
    const d = document.createElement('div');
    questoes.forEach((q, i) => {
      d.innerHTML = q.p;
      const ts = [{ t: `${i + 1}. `, neg: true, cor: COR.dest }, ...(q.alts ? [{ t: '[Múltipla escolha] ', neg: true, cor: COR.txt2 }] : []), ...trechos(d)];
      const larg = LARG; const ls = quebrar(ts, larg, 25);
      ls.forEach((ln, k) => L.push({ h: 38, segs: ln, tam: 25, recuo: 0, keep: k === 0 ? Math.min(3, ls.length) : 0 }));
      if (q.alts) q.alts.forEach((x, j) => { d.innerHTML = x; quebrar([{ t: `${'ABCDE'[j]}) `, neg: true }, ...trechos(d)], LARG - 40, 24).forEach((ln) => L.push({ h: 36, segs: ln, tam: 24, recuo: 40 })); });
      else L.push({ h: 36, segs: quebrar([{ t: '(   ) Certo        (   ) Errado', cor: COR.txt2 }], LARG, 23)[0], tam: 23, recuo: 0 });
      L.push({ h: 26 });
    });
    L.push({ quebra: true, h: 0 });
    tit('Gabarito comentado');
    const resp = (q) => (q.alts ? 'ABCDE'[q.r ?? 0] : q.c ? 'C' : 'E');
    // grade compacta: 10 por linha
    for (let i = 0; i < questoes.length; i += 10) {
      const ts = []; for (let k = i; k < Math.min(i + 10, questoes.length); k++) ts.push({ t: `${k + 1}-`, cor: COR.txt2 }, { t: `${resp(questoes[k])}     `, neg: true, cor: COR.dest });
      L.push({ h: 40, segs: quebrar(ts, LARG, 24)[0], tam: 24, recuo: 0 });
    }
    L.push({ h: 24 });
    questoes.forEach((q, i) => {
      d.innerHTML = (q.alts ? q.n?.[q.r ?? 0] : q.x) || ''; let com = d.textContent.trim();
      if (/^literal\.?$/i.test(com)) com = 'Reproduz o texto da norma.';
      d.innerHTML = (q.alts ? q.x : q.prof || q.t) || ''; const fonteQ = d.textContent.trim();
      const ts = [{ t: `${i + 1}. ${q.alts ? 'Letra ' + resp(q) : q.c ? 'Certo' : 'Errado'}. `, neg: true, cor: COR.dest }, { t: com }, ...(fonteQ ? [{ t: ` (${fonteQ})`, ita: true, cor: COR.txt2 }] : [])];
      quebrar(ts, LARG, 22).forEach((ln, k) => L.push({ h: 33, segs: ln, tam: 22, recuo: 0, keep: k === 0 ? 1 : 0 }));
      L.push({ h: 8 });
    });
  }

  const pags = paginar(L), total = pags.length + 1, imgs = [];
  const cv = document.createElement('canvas'); cv.width = PW; cv.height = PH; const ctx = cv.getContext('2d');
  ctx.textBaseline = 'alphabetic';
  aviso('Desenhando a capa…');
  capa(ctx, info, logo); imgs.push({ jpg: await jpeg(cv), w: PW, h: PH });
  for (let i = 0; i < pags.length; i++) {
    aviso(`Montando página ${i + 2} de ${total}…`);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, PW, PH);
    desenharLinhas(ctx, pags[i]);
    for (const ln of pags[i]) if (ln.regua) { ctx.fillStyle = COR.ouro; ctx.fillRect(MX, ln.y, LARG, 5); }
    moldura(ctx, i + 2, total, info, logo);
    imgs.push({ jpg: await jpeg(cv), w: PW, h: PH });
    await espera();
  }
  aviso('Salvando…');
  return { blob: montaPdf(imgs), nome: `RISK - ${mat.nome} - ${a.titulo}`.replace(/[\\/:*?"<>|]+/g, '').slice(0, 120) + '.pdf', paginas: total };
}

export async function baixarPdfTopico(mat, a, aviso) {
  const { blob, nome } = await gerarPdfTopico(mat, a, aviso);
  const url = URL.createObjectURL(blob), link = document.createElement('a');
  link.href = url; link.download = nome; document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
