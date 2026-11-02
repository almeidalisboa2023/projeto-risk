import { esc, norm } from './util.js';

// ---------- HTML seguro (enunciados e comentários) ----------
const PERMITIDAS = new Set(['H2', 'H3', 'H4', 'P', 'BR', 'HR', 'STRONG', 'B', 'EM', 'I', 'U', 'UL', 'OL', 'LI', 'BLOCKQUOTE', 'PRE', 'CODE', 'SUB', 'SUP', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD', 'SPAN']);
export function sanitize(html) {
  const s = String(html ?? '');
  if (!/<[a-z][\s\S]*>/i.test(s)) return esc(s).replace(/\n/g, '<br>');
  const doc = new DOMParser().parseFromString(`<div>${s}</div>`, 'text/html');
  const walk = (node) => {
    for (const el of [...node.children]) {
      if (!PERMITIDAS.has(el.tagName)) { el.replaceWith(...el.childNodes); continue; }
      for (const a of [...el.attributes]) el.removeAttribute(a.name);
      walk(el);
    }
  };
  const root = doc.body.firstElementChild; walk(root);
  return root.innerHTML;
}
const pareceCodigo = (t) => /(print\s*\(|^\s*def |<-|^\s*for |^\s*if |=\s*\w+\(|;\s*$)/m.test(t);
export function enunciadoHTML(html) {
  const s = String(html ?? '');
  const i = s.search(/<hr\s*\/?>/i);
  let base = '', item = s;
  if (i >= 0) { base = s.slice(0, i); item = s.slice(i).replace(/^<hr\s*\/?>/i, ''); }
  const fmt = (h) => {
    let out = sanitize(h);
    // parágrafos que parecem código viram bloco monoespaçado
    out = out.replace(/<p>([\s\S]*?)<\/p>/g, (m, inner) => {
      const txt = inner.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '');
      return pareceCodigo(txt) && txt.includes('\n') ? `<pre class="code">${inner.replace(/<br\s*\/?>/g, '\n')}</pre>` : m;
    });
    return out;
  };
  return (base ? `<div class="texto-base"><div class="tb-label">Texto / situação</div>${fmt(base)}</div>` : '') + `<div class="afirmacao">${fmt(item)}</div>`;
}

// ---------- toast e modal ----------
export function toast(msg, tipo = '') {
  const t = document.createElement('div');
  t.className = 'toast ' + tipo; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3500);
}
export function modal(html, { onMount, largo } = {}) {
  const w = document.createElement('div');
  w.className = 'modal-bg';
  w.innerHTML = `<div class="modal ${largo ? 'largo' : ''}" role="dialog"><button class="modal-x" aria-label="Fechar">×</button>${html}</div>`;
  const close = () => w.remove();
  w.addEventListener('click', (e) => { if (e.target === w || e.target.classList.contains('modal-x')) close(); });
  document.body.appendChild(w);
  onMount && onMount(w.querySelector('.modal'), close);
  return close;
}
export const loading = (txt = 'Carregando…') => `<div class="loading"><span class="spin"></span>${esc(txt)}</div>`;

// ---------- links de estudo ----------
const P = 'https://www.planalto.gov.br/ccivil_03/';
const LEIS = [
  [/\bctb\b|9\.503/, ['CTB', P + 'leis/l9503compilado.htm']],
  [/5\.970/, ['Lei 5.970/1973', P + 'leis/1970-1979/l5970.htm']],
  [/\bres\.|resolu/, ['Resoluções do CONTRAN', 'https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran/resolucoes-contran']],
  [/8\.112/, ['Lei 8.112/1990', P + 'leis/l8112compilado.htm']],
  [/9\.784/, ['Lei 9.784/1999', P + 'leis/l9784.htm']],
  [/licita|14\.133/, ['Lei 14.133/2021', P + '_ato2019-2022/2021/lei/l14133.htm']],
  [/8\.429|improbidade/, ['Lei 8.429/1992', P + 'leis/l8429.htm']],
  [/9\.654/, ['Lei 9.654/1998', P + 'leis/l9654compilado.htm']],
  [/12\.855/, ['Lei 12.855/2013', P + '_ato2011-2014/2013/lei/l12855.htm']],
  [/13\.712/, ['Lei 13.712/2018', P + '_ato2015-2018/2018/lei/l13712.htm']],
  [/8\.282/, ['Decreto 8.282/2014', P + '_ato2011-2014/2014/decreto/d8282.htm']],
  [/1\.171/, ['Decreto 1.171/1994', P + 'decreto/d1171.htm']],
  [/6\.029/, ['Decreto 6.029/2007', P + '_ato2007-2010/2007/decreto/d6029.htm']],
  [/9\.203/, ['Decreto 9.203/2017', P + '_ato2015-2018/2017/decreto/d9203.htm']],
  [/12\.527/, ['Lei 12.527/2011 (LAI)', P + '_ato2011-2014/2011/lei/l12527.htm']],
  [/7\.724/, ['Decreto 7.724/2012', P + '_ato2011-2014/2012/decreto/d7724.htm']],
  [/12\.813/, ['Lei 12.813/2013', P + '_ato2011-2014/2013/lei/l12813.htm']],
  [/7\.203/, ['Decreto 7.203/2010', P + '_ato2007-2010/2010/decreto/d7203.htm']],
  [/5\.553/, ['Lei 5.553/1968', P + 'leis/l5553.htm']],
  [/12\.037/, ['Lei 12.037/2009', P + '_ato2007-2010/2009/lei/l12037.htm']],
  [/8\.069|\beca\b/, ['ECA (Lei 8.069/1990)', P + 'leis/l8069.htm']],
  [/8\.072|hediondo/, ['Lei 8.072/1990', P + 'leis/l8072.htm']],
  [/9\.099/, ['Lei 9.099/1995', P + 'leis/l9099.htm']],
  [/9\.455|tortura/, ['Lei 9.455/1997', P + 'leis/l9455.htm']],
  [/9\.605/, ['Lei 9.605/1998', P + 'leis/l9605.htm']],
  [/10\.826|desarmamento/, ['Lei 10.826/2003', P + 'leis/2003/l10.826compilado.htm']],
  [/11\.343|drogas/, ['Lei 11.343/2006', P + '_ato2004-2006/2006/lei/l11343.htm']],
  [/12\.850|organiza..es criminosas/, ['Lei 12.850/2013', P + '_ato2011-2014/2013/lei/l12850.htm']],
  [/13\.675|susp/, ['Lei 13.675/2018', P + '_ato2015-2018/2018/lei/l13675.htm']],
  [/13\.869|abuso de autoridade/, ['Lei 13.869/2019', P + '_ato2019-2022/2019/lei/l13869compilado.htm']],
  [/1\.655/, ['Decreto 1.655/1995', P + 'decreto/d1655.htm']],
  [/678|convencao americana|sao jose/, ['Decreto 678/1992', P + 'decreto/d0678.htm']],
  [/declaracao universal/, ['DUDH (UNICEF)', 'https://www.unicef.org/brazil/declaracao-universal-dos-direitos-humanos']],
];
const POR_MATERIA = {
  'direito constitucional': ['Constituição Federal', P + 'constituicao/constituicaocompilado.htm'],
  'direito penal': ['Código Penal', P + 'decreto-lei/del2848compilado.htm'],
  'direito processual penal': ['Código de Processo Penal', P + 'decreto-lei/del3689compilado.htm'],
  'direitos humanos': ['Constituição Federal', P + 'constituicao/constituicaocompilado.htm'],
};
export function linksDoTopico(t, concurso = '') {
  const texto = norm(t.topico);
  const semNum = String(t.topico).replace(/^[\d\.\/\-\s e]+/, '').replace(/\(.*?\)/g, '').trim();
  const leis = [];
  if (t.link_lei_seca) leis.push(['Lei seca', t.link_lei_seca]);
  else {
    for (const [re, l] of LEIS) if (re.test(texto)) leis.push(l);
    if (!leis.length && POR_MATERIA[norm(t.materia)]) leis.push(POR_MATERIA[norm(t.materia)]);
  }
  const conc = String(concurso).replace(/\d{4}/, '').trim();
  return {
    aula: t.link_aula || 'https://www.youtube.com/results?search_query=' + encodeURIComponent(`aula ${semNum} ${conc}`),
    pdf: t.link_pdf || 'https://www.google.com/search?q=' + encodeURIComponent(`${semNum} pdf apostila gratuita ${conc}`),
    questoes: t.link_questoes || `#/questoes?topico=${t.id}`,
    leis,
  };
}
export function leiSecaHTML(t) {
  const L = linksDoTopico(t);
  return L.leis.length ? `<div class="links">${L.leis.map(([n, u]) => `<a class="link" href="${esc(u)}" target="_blank" rel="noopener">Lei seca: ${esc(n)} ↗</a>`).join('')}</div>` : '';
}
export function linksHTML(t, concurso) {
  const L = linksDoTopico(t, concurso);
  const ext = (href, txt) => `<a class="link" href="${esc(href)}" target="_blank" rel="noopener">${esc(txt)} ↗</a>`;
  return `<div class="links">
    ${ext(L.aula, 'Aula grátis (YouTube)')}
    ${ext(L.pdf, 'Material em PDF')}
    ${L.leis.map(([n, u]) => ext(u, 'Lei seca: ' + n)).join('')}
    <a class="link" href="${esc(L.questoes)}">Questões do banco →</a>
  </div>`;
}

// ---------- relógio flip ----------
export function flipHTML(str) {
  return `<div class="flip">${[...str].map((c) => (c === ':' ? '<span class="flip-sep">:</span>' : `<span class="flip-d">${esc(c)}</span>`)).join('')}</div>`;
}

export const barra = (p) => `<div class="bar"><div class="bar-in" style="width:${Math.max(0, Math.min(100, p || 0))}%"></div></div>`;
