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
import { filtrarMaterias, meuCurso } from '../cursos.js';
import { NOVAS } from './novas/index.js';
import { APROFUNDA } from './aprofunda.js';
import { JURIS } from './juris.js';
import { GAB } from './gab/index.js';

// Cor e ícone de cada matéria (quadro colorido da página de leitura)
const VISUAL = {
  portugues: ['#2E7D4F', '📝'], rlm: ['#E67E22', '🧮'], constitucional: ['#2B6CB0', '🏛'],
  penal: ['#C8102E', '⚖️'], administrativo: ['#0F766E', '🗂'], belovale: ['#1E3A8A', '🏘'], 'processo-penal': ['#7B3FA0', '🔎'], transito: ['#D4A017', '🚦'],
};
// Ordem do quadro; processo penal vem antes de penal para "Direito Penal e Processual Penal" achar os dois
const junta = (a, x) => (x ? { ...a, aprof: (a.aprof || '') + (x.html || ''), quiz: [...(a.quiz || []), ...(x.quiz || [])] } : a);
const aprofundar = (m) => ({ ...m, assuntos: m.assuntos.map((a) => junta(junta(a, APROFUNDA[m.id]?.[a.id]), JURIS[m.id]?.[a.id])) });
// Gabarito comentado: junta explicação (x), pegadinha (pg) e notas das alternativas (n) pela chave do enunciado (hash FNV-1a)
export const chaveQ = (p) => { let h = 2166136261; for (const c of norm(p)) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619) >>> 0; } return h.toString(36); };
const comGab = (m) => { const G = GAB[m.id]; if (!G) return m;
  return { ...m, assuntos: m.assuntos.map((a) => { const g = G[a.id]; if (!g) return a;
    return { ...a, quiz: (a.quiz || []).map((q) => { const v = g[chaveQ(q.p)]; return v ? { ...q, x: v[0], pg: v[1] || '', n: v[2] || null } : q; }) }; }) };
};
export const MATERIAS_TODAS = [portugues, rlm, constitucional, administrativo, processo, penal, transito, belovale, ...NOVAS].map((m) => comGab(aprofundar(m))).map((m) => ({ ...m, cor: VISUAL[m.id]?.[0] || m.cor || '#6B6458', ico: VISUAL[m.id]?.[1] || m.ico || '📖', atualizado: m.atualizado || 'novembro de 2026' }));

// Junta os conteúdos enviados em PDF pelo administrador: tópico novo, complemento de tópico ou matéria nova.
// Complementar um tópico "em produção" troca o aviso pelo texto enviado.
const escH = (t) => String(t ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export function comConteudos(base = MATERIAS_TODAS, lista = S.conteudos || []) {
  if (!lista.length) return base;
  const mapa = new Map(base.map((m) => [m.id, { ...m, assuntos: [...m.assuntos] }]));
  for (const c of lista) {
    let m = mapa.get(c.materia_id);
    if (!m) {
      m = { id: c.materia_id, nome: c.materia_nome || c.materia_id, apelidos: [norm(c.materia_nome || '')].filter(Boolean), assuntos: [],
        cor: '#6B6458', ico: '📄', atualizado: 'material enviado', nova: true, cursos: c.cursos || [] };
      mapa.set(m.id, m);
    } else if (m.nova) m.cursos = [...new Set([...(m.cursos || []), ...(c.cursos || [])])];
    const quando = c.created_at ? new Date(c.created_at).toLocaleDateString('pt-BR') : '';
    const i = c.assunto_id ? m.assuntos.findIndex((a) => a.id === c.assunto_id) : -1;
    if (i >= 0) {
      const a = m.assuntos[i];
      const html = /class="lt-producao"/.test(a.html)
        ? a.html.replace(/<div class="lt-producao">[\s\S]*?<\/div>/, '') + c.html
        : a.html + `<h3>📄 Complemento: ${escH(c.titulo)}</h3>` + c.html;
      m.assuntos[i] = { ...a, html, quiz: [...(a.quiz || []), ...(c.quiz || [])] };
    } else {
      m.assuntos.push({ id: 'pdf-' + c.id, titulo: c.titulo, arts: 'Material enviado' + (quando ? ' em ' + quando : ''), chaves: [norm(c.titulo)], html: c.html, quiz: c.quiz || [], extra: true });
    }
  }
  return [...mapa.values()];
}

// Matérias que o aluno logado pode ver: as do curso dele (definido pelo administrador), sem as removidas.
// Administrador ou conta sem curso: todas. Para quem tem curso, a matéria do curso aparece mesmo que o edital não cite o município.
export function visiveis() {
  const v = filtrarMaterias(comConteudos());
  return meuCurso() ? v.map((m) => (m.soEdital ? { ...m, soEdital: null } : m)) : v;
}

// Todas as matérias cujo nome bate com o nome usado no edital (ex.: "Língua Portuguesa", "Português", "Noções de Direito Penal")
export function materiasDe(nome) {
  const m = norm(nome);
  const ed = norm([S.edital?.concurso, S.edital?.cargo].filter(Boolean).join(' '));
  return visiveis().filter((x) => (!x.soEdital || ed.includes(x.soEdital)) && x.apelidos.some((a) => m.includes(a)));
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
  if (!r && !mats.length) r = melhorAssunto(visiveis().filter((x) => !x.soEdital), t, 9);
  if (r) return { mat: r.mat, a: r.a, link: `#/leitura?a=${r.mat.id}/${r.a.id}`, rotulo: r.a.titulo };
  if (mats.length) return { mat: mats[0], a: null, link: `#/leitura?a=${mats[0].id}/`, rotulo: mats[0].nome };
  return null;
}
