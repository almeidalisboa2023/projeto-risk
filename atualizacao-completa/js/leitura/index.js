// Índice das leituras interativas e ligação com o calendário de QUALQUER edital (matéria + assunto do bloco).
import { norm } from '../util.js';
import transito from './transito.js';
import constitucional from './constitucional.js';
import penal from './penal.js';
import processo from './processo-penal.js';
import portugues from './portugues.js';
import rlm from './rlm.js';
import administrativo from './administrativo.js';
import belovale from './belovale.js';
import { S } from '../state.js';
import { APROFUNDA } from './aprofunda.js';
import { JURIS } from './juris.js';

// Cor e ícone de cada matéria (quadro colorido da página de leitura)
const VISUAL = {
  portugues: ['#2E7D4F', '📝'], rlm: ['#E67E22', '🧮'], constitucional: ['#2B6CB0', '🏛'],
  penal: ['#C8102E', '⚖️'], administrativo: ['#0F766E', '🗂'], belovale: ['#1E3A8A', '🏘'], 'processo-penal': ['#7B3FA0', '🔎'], transito: ['#D4A017', '🚦'],
};
// Ordem do quadro; processo penal vem antes de penal para "Direito Penal e Processual Penal" achar os dois
const junta = (a, x) => (x ? { ...a, aprof: (a.aprof || '') + (x.html || ''), quiz: [...(a.quiz || []), ...(x.quiz || [])] } : a);
const aprofundar = (m) => ({ ...m, assuntos: m.assuntos.map((a) => junta(junta(a, APROFUNDA[m.id]?.[a.id]), JURIS[m.id]?.[a.id])) });
export const MATERIAS = [portugues, rlm, constitucional, administrativo, processo, penal, transito, belovale].map((m) => ({ ...aprofundar(m), cor: VISUAL[m.id]?.[0] || '#6B6458', ico: VISUAL[m.id]?.[1] || '📖', atualizado: m.atualizado || 'novembro de 2026' }));

// Todas as matérias cujo nome bate com o nome usado no edital (ex.: "Língua Portuguesa", "Português", "Noções de Direito Penal")
export function materiasDe(nome) {
  const m = norm(nome);
  const ed = norm([S.edital?.concurso, S.edital?.cargo].filter(Boolean).join(' '));
  return MATERIAS.filter((x) => (!x.soEdital || ed.includes(x.soEdital)) && x.apelidos.some((a) => m.includes(a)));
}
export const materiaDe = (nome) => materiasDe(nome)[0] || null;

function melhorAssunto(lista, texto, minimo = 0) {
  let melhor = null, tam = 0;
  for (const mat of lista) for (const a of mat.assuntos) for (const c of a.chaves) {
    if (c.length >= minimo && c.length > tam && texto.includes(c)) { melhor = { mat, a }; tam = c.length; }
  }
  return melhor;
}

// Acha a leitura do bloco do calendário. Retorna o assunto exato ou, se só a matéria bater, a matéria inteira.
export function acharLeitura(materia, topico) {
  const t = norm(topico);
  const mats = materiasDe(materia);
  let r = mats.length ? melhorAssunto(mats, t) : null;
  // Edital com nome de matéria diferente (ex.: "Conhecimentos Básicos"): procura pelo assunto em todas, com chaves longas
  if (!r && !mats.length) r = melhorAssunto(MATERIAS.filter((x) => !x.soEdital), t, 9);
  if (r) return { mat: r.mat, a: r.a, link: `#/leitura?a=${r.mat.id}/${r.a.id}`, rotulo: r.a.titulo };
  if (mats.length) return { mat: mats[0], a: null, link: `#/leitura?a=${mats[0].id}/`, rotulo: mats[0].nome };
  return null;
}
