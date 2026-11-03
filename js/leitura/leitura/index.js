// Índice das leituras interativas e ligação com o calendário (matéria + assunto do bloco).
import { norm } from '../util.js';
import transito from './transito.js';
import constitucional from './constitucional.js';
import penal from './penal.js';

export const MATERIAS = [transito, constitucional, penal];

export function materiaDe(nome) {
  const m = norm(nome);
  return MATERIAS.find((x) => x.apelidos.some((a) => m.includes(a))) || null;
}

// Acha o texto que corresponde ao bloco do calendário (ou null)
export function acharLeitura(materia, topico) {
  const mat = materiaDe(materia);
  if (!mat) return null;
  const t = norm(topico);
  let melhor = null, tam = 0;
  for (const a of mat.assuntos) for (const c of a.chaves) if (t.includes(c) && c.length > tam) { melhor = a; tam = c.length; }
  return melhor ? { mat, a: melhor, link: `#/leitura?a=${mat.id}/${melhor.id}` } : null;
}
