// Caixa de avisos da página inicial: avisos publicados pelo administrador (tabela "avisos"),
// avisos criados sozinhos ao enviar apostila/simulado/conteúdo, e as novidades dos lotes de conteúdo (js/novidades.js).
import { S, isAdmin } from './state.js';
import { db, MODO_DEMO } from './backend.js';
import { esc } from './util.js';
import { meuCurso, materiasDoCurso } from './cursos.js';
import { NOVIDADES } from './novidades.js';

const ICO = { pegadinha: '🪤', aviso: '📣', conteudo: '📖', questoes: '🎯', simulado: '📝', apostila: '📕', material: '📄' };
const LIDO_KEY = 'risk-avisos-lidos';

// Cria um aviso (só o administrador consegue gravar; para os outros, falha em silêncio)
export async function criarAviso({ titulo, texto = '', tipo = 'aviso', cursos = [], link = null, publicar_em = null }) {
  if (!isAdmin() && S.profile?.role !== 'admin') return null;
  try { const [a] = await db.insert('avisos', [{ titulo, texto, tipo, cursos, link, ativo: true, ...(publicar_em ? { publicar_em } : {}) }]); return a; } catch { return null; }
}

async function doBanco() {
  try {
    const agora = new Date().toISOString();
    const ls = await db.select('avisos', { ativo: 'eq.true', publicar_em: 'lte.' + agora, order: 'publicar_em.desc', limit: 30 });
    const c = meuCurso()?.id;
    return ls.filter((a) => isAdmin() || !(a.cursos || []).length || (c && a.cursos.includes(c)))
      .map((a) => ({ data: a.publicar_em, titulo: a.titulo, texto: a.texto, tipo: a.tipo, link: a.link, id: 'db-' + a.id }));
  } catch { return []; }
}

function dasNovidades() {
  const c = meuCurso();
  // Aluno de curso: só as novidades das matérias (e dos assuntos) que o edital do curso dele cobra.
  // Sem curso (administrador ou conta antiga): todas.
  const itens = c ? new Map(materiasDoCurso(c).map((m) => [m.id, m])) : null;
  const doCurso = (n) => {
    if (!itens) return true;
    if (n.cursos) return n.cursos.includes(c.id);
    const it = n.materia && itens.get(n.materia);
    if (!it) return false;
    return !n.assuntos || !it.assuntos || n.assuntos.some((a) => it.assuntos.includes(a));
  };
  return NOVIDADES.filter(doCurso)
    .map((n, i) => ({ data: n.data, titulo: n.titulo, texto: n.texto, tipo: n.tipo || 'conteudo', link: n.link || (n.materia ? '#/leitura?a=' + n.materia + '/' : null), id: 'nv-' + n.data + '-' + n.titulo }));
}

export async function listaAvisos(max = 8) {
  const todos = [...(MODO_DEMO ? [] : await doBanco()), ...dasNovidades()];
  return todos.sort((a, b) => String(b.data).localeCompare(String(a.data))).slice(0, max);
}

const lidos = () => { try { return new Set(JSON.parse(localStorage.getItem(LIDO_KEY) || '[]')); } catch { return new Set(); } };
const fmt = (d) => { const x = new Date(String(d).length <= 10 ? d + 'T12:00:00' : d); return isNaN(x) ? '' : x.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }); };

// Desenha a caixa na página inicial
export async function caixaAvisos(box) {
  box.innerHTML = '<div class="card av-caixa"><h3 style="margin:0">📣 Avisos</h3><p class="muted" style="margin:6px 0 0">Carregando…</p></div>';
  const ls = await listaAvisos();
  const L = lidos();
  const novos = ls.filter((a) => !L.has(a.id)).length;
  box.innerHTML = `<div class="card av-caixa"><div class="row"><h3 style="margin:0">📣 Avisos ${novos ? `<span class="badge">${novos} novo${novos > 1 ? 's' : ''}</span>` : ''}</h3><span class="sp"></span>${novos ? '<button class="btn sec mini" id="avLidos">Marcar como lidos</button>' : ''}</div>
    ${ls.length ? `<ul class="av-lista">${ls.map((a) => `<li class="${L.has(a.id) ? '' : 'novo'}"><span class="av-ico">${ICO[a.tipo] || '📣'}</span><div><b>${a.link ? `<a href="${esc(a.link)}">${esc(a.titulo)}</a>` : esc(a.titulo)}</b>${a.texto ? `<div class="muted">${esc(a.texto)}</div>` : ''}</div><span class="av-data">${fmt(a.data)}</span></li>`).join('')}</ul>`
      : '<p class="muted" style="margin:8px 0 0">Nenhum aviso por enquanto. Quando chegar conteúdo novo, simulado ou questões, aparece aqui.</p>'}</div>`;
  const b = box.querySelector('#avLidos');
  if (b) b.onclick = () => { try { localStorage.setItem(LIDO_KEY, JSON.stringify([...L, ...ls.map((a) => a.id)])); } catch {} caixaAvisos(box); };
}
