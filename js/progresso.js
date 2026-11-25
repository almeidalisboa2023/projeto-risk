// Progresso real do edital: um tópico conta como finalizado quando o aluno marcou o check,
// leu o conteúdo correspondente no Conteúdo Programático ou concluiu todas as tarefas de teoria dele no cronograma.
import { S } from './state.js';
import { acharLeitura } from './leitura/index.js';

const ler = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const lidos = () => new Set(ler('risk-lidos-' + (S.user?.id || 'x'), []));
const cache = new Map();
const leituraDe = (t) => { const k = t.materia + '|' + t.topico; if (!cache.has(k)) { let r = null; try { r = acharLeitura(t.materia, t.topico); } catch {} cache.set(k, r && r.a ? r.mat.id + '/' + r.a.id : null); } return cache.get(k); };

// Motivo pelo qual o tópico está finalizado ('check', 'leitura', 'cronograma') ou null
export function motivoFinalizado(t, L = lidos(), tar = tarefasPorTopico()) {
  if (t.concluido) return 'check';
  const k = leituraDe(t); if (k && L.has(k)) return 'leitura';
  const ts = tar.get(t.id); if (ts && ts.length && ts.every((x) => x.concluido)) return 'cronograma';
  return null;
}

export function tarefasPorTopico() {
  const m = new Map();
  for (const x of S.tarefas || []) { if (!x.topico_id || /^revis/i.test(x.origem || '') || /^revis/i.test(x.topico || '')) continue; (m.get(x.topico_id) || m.set(x.topico_id, []).get(x.topico_id)).push(x); }
  return m;
}

// Conjunto de ids dos tópicos finalizados
export function finalizados(lista) { const L = lidos(), tar = tarefasPorTopico(); return new Set(lista.filter((t) => motivoFinalizado(t, L, tar)).map((t) => t.id)); }
