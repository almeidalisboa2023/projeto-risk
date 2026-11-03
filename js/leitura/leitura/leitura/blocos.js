// Blocos de texto reutilizados nas leituras
export const peg = (t) => `<div class="lt-peg"><b class="lt-tit">⚠ Pegadinha</b> ${t}</div>`;
export const box = (tit, t) => `<div class="lt-box"><b class="lt-tit">${tit}</b>${t}</div>`;
export const dica = (t) => `<div class="lt-dica"><b class="lt-tit">💡 Dica de memorização</b> ${t}</div>`;
export const ex = (t, tit = 'Exemplo') => `<div class="lt-ex"><b class="lt-tit">✍ ${tit}</b>${t}</div>`;
export const juris = (t) => `<div class="lt-juris"><b class="lt-tit">⚖ Jurisprudência</b>${t}</div>`;
export const banca = (t) => `<div class="lt-box"><b class="lt-tit">🎯 Como a banca cobra</b>${t}</div>`;
export const formula = (t) => `<code class="lt-formula">${t}</code>`;
export const C = (p, e) => ({ p, c: true, e });
export const E = (p, e) => ({ p, c: false, e });
