// Trânsito — 60 questões geradas a partir da tabela oficial de infrações (natureza conferida com o Planalto em nov/2026).
import { INFRACOES, MED } from './ctb-infracoes.js';
import { C, E, M } from './blocos.js';

const NOME = { G: 'gravíssima', R: 'grave', M: 'média', L: 'leve' };
const ORDEM = ['L', 'M', 'R', 'G'];
const lista = [];
for (const [art, cab, itens] of INFRACOES) for (const [inc, cond, nat, pen, med] of itens) lista.push({ art, inc, txt: `${cab} ${cond}`.replace(/\s+/g, ' ').trim(), nat, pen, med });
// Gabarito comentado gerado da própria tabela: pontos, valor da multa, penalidade e medida administrativa
const PONTOS = { G: 7, R: 5, M: 4, L: 3 };
const VALOR = { G: 'R$ 293,47', R: 'R$ 195,23', M: 'R$ 130,16', L: 'R$ 88,38' };
const penal = (p) => String(p || 'multa').replace(/(\d+)x/, 'multiplicada por $1');
const medida = (m) => (m ? MED[m] || m : '');
const explica = (x) => {
  const nat = x.nat in NOME ? NOME[x.nat] : x.nat;
  const pts = PONTOS[x.nat] ? ` Ela soma ${PONTOS[x.nat]} pontos no prontuário e a multa-base é de ${VALOR[x.nat]}.` : '';
  const med = medida(x.med) ? ` Medida administrativa: ${medida(x.med)}.` : ' Não há medida administrativa específica.';
  return `Pelo ${ref(x).replace('Art.', 'art.')}, essa conduta é infração ${nat}.${pts} Penalidade: ${penal(x.pen)}.${med}`;
};
const DICA = 'Pontos por natureza (art. 259): gravíssima 7, grave 5, média 4 e leve 3.';
// escolha determinística e espalhada pela tabela
const pega = (n, des) => Array.from({ length: n }, (_, k) => lista[(k * 37 + des) % lista.length]);
const ref = (x) => `Art. ${x.art}${x.inc && x.inc !== '-' ? ', ' + x.inc : ''}`;
const frase = (t) => t.charAt(0).toUpperCase() + t.slice(1);

const qs = [];
pega(20, 3).forEach((x) => qs.push({ ...C(`${frase(x.txt)} é infração ${NOME[x.nat]}.`, `${ref(x)}: ${NOME[x.nat]}.`), x: explica(x), pg: DICA }));
pega(20, 11).forEach((x, k) => {
  const outra = ORDEM[(ORDEM.indexOf(x.nat) + 1 + (k % 3)) % 4];
  qs.push({ ...E(`${frase(x.txt)} é infração ${NOME[outra]}.`, `${ref(x)}: é ${NOME[x.nat]}.`), x: `A natureza não é ${NOME[outra]}. ${explica(x)}`, pg: DICA });
});
pega(20, 23).forEach((x) => {
  const r = ORDEM.indexOf(x.nat);
  const n = ORDEM.map((k, i) => (i === r ? `Correta: ${NOME[k]} (${PONTOS[k]} pontos).` : `Não: ${NOME[k]} somaria ${PONTOS[k]} pontos, e a natureza é ${NOME[x.nat]}.`)).concat(['Errado: a conduta está tipificada como infração no CTB.']);
  qs.push({ ...M(`Qual a natureza da infração: “${frase(x.txt)}”?`, ['leve', 'média', 'grave', 'gravíssima', 'não é infração de trânsito'], r, `${ref(x)}.`), x: explica(x), pg: DICA, n });
});
export const QTABELA = qs;
