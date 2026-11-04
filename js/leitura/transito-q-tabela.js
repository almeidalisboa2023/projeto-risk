// Trânsito — 60 questões geradas a partir da tabela oficial de infrações (natureza conferida com o Planalto em nov/2026).
import { INFRACOES } from './ctb-infracoes.js';
import { C, E, M } from './blocos.js';

const NOME = { G: 'gravíssima', R: 'grave', M: 'média', L: 'leve' };
const ORDEM = ['L', 'M', 'R', 'G'];
const lista = [];
for (const [art, cab, itens] of INFRACOES) for (const [inc, cond, nat] of itens) lista.push({ art, inc, txt: `${cab} ${cond}`.replace(/\s+/g, ' ').trim(), nat });
// escolha determinística e espalhada pela tabela
const pega = (n, des) => Array.from({ length: n }, (_, k) => lista[(k * 37 + des) % lista.length]);
const ref = (x) => `Art. ${x.art}${x.inc && x.inc !== '-' ? ', ' + x.inc : ''}`;
const frase = (t) => t.charAt(0).toUpperCase() + t.slice(1);

const qs = [];
pega(20, 3).forEach((x) => qs.push(C(`${frase(x.txt)} é infração ${NOME[x.nat]}.`, `${ref(x)}: ${NOME[x.nat]}.`)));
pega(20, 11).forEach((x, k) => {
  const outra = ORDEM[(ORDEM.indexOf(x.nat) + 1 + (k % 3)) % 4];
  qs.push(E(`${frase(x.txt)} é infração ${NOME[outra]}.`, `${ref(x)}: é ${NOME[x.nat]}.`));
});
pega(20, 23).forEach((x) => qs.push(M(`Qual a natureza da infração: “${frase(x.txt)}”?`, ['leve', 'média', 'grave', 'gravíssima', 'não é infração de trânsito'], ORDEM.indexOf(x.nat), `${ref(x)}.`)));
export const QTABELA = qs;
