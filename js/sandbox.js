// Modo aluno do administrador: os dados de estudo (edital, cronograma, questões feitas, horas…) ficam numa
// "caixa de areia" só deste navegador, separada por curso. Nada disso vai para o banco e some ao sair do modo aluno.
export const SANDBOX_TABELAS = new Set(['editais', 'topicos', 'tarefas', 'question_logs', 'sessoes_estudo', 'respostas', 'apostilas_feitas', 'agua', 'resumos', 'provas', 'respostas_leitura', 'flashcards_feitos']);
const VISAO = 'risk-visao', KEY = 'risk-visao-db';
export function emSandbox() { try { return !!JSON.parse(sessionStorage.getItem(VISAO) || 'null')?.curso; } catch { return false; } }
const cursoAtual = () => { try { return JSON.parse(sessionStorage.getItem(VISAO) || 'null')?.curso || '_'; } catch { return '_'; } };
let D = null;
const load = () => { if (!D) { try { D = JSON.parse(sessionStorage.getItem(KEY) || '{}'); } catch { D = {}; } } const c = cursoAtual(); D[c] = D[c] || {}; return D[c]; };
const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(D)); } catch {} };
const tab = (n) => { const d = load(); d[n] = d[n] || []; return d[n]; };
export function limparSandbox() { D = null; try { sessionStorage.removeItem(KEY); } catch {} }

function testa(row, k, v) {
  const val = row[k]; const [op, ...r] = String(v).split('.'); const arg = r.join('.');
  if (op === 'eq') return String(val ?? '') === arg;
  if (op === 'neq') return String(val ?? '') !== arg;
  if (op === 'is') return arg === 'null' ? val == null : String(val) === arg;
  if (op === 'gte') return String(val ?? '') >= arg;
  if (op === 'lte') return String(val ?? '') <= arg;
  if (op === 'in') return arg.replace(/^\(|\)$/g, '').split(',').map((s) => s.replace(/^"|"$/g, '')).includes(String(val));
  if (op === 'like' || op === 'ilike') return new RegExp('^' + arg.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$', op === 'ilike' ? 'i' : '').test(String(val ?? ''));
  return true;
}
function filtra(rows, p = {}) {
  let out = rows.filter((x) => Object.entries(p).every(([k, v]) => ['select', 'order', 'limit', 'offset', 'on_conflict', 'or'].includes(k) || testa(x, k, v)));
  if (p.order) { const o = p.order.split(',').map((s) => s.split('.')); out.sort((a, b) => { for (const [k, d] of o) { const x = a[k] ?? '', y = b[k] ?? ''; if (x < y) return d === 'desc' ? 1 : -1; if (x > y) return d === 'desc' ? -1 : 1; } return 0; }); }
  return out;
}
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : 'sb-' + Date.now() + Math.random().toString(16).slice(2));
export const sandbox = {
  async select(t, p = {}, { count = false } = {}) { let rows = filtra(tab(t), p); const total = rows.length; const off = Number(p.offset || 0); rows = rows.slice(off, p.limit ? off + Number(p.limit) : undefined).map((r) => ({ ...r })); return count ? { data: rows, count: total } : rows; },
  async selectAll(t, p = {}) { return sandbox.select(t, p); },
  async insert(t, rows, { upsert = false, onConflict } = {}) {
    const T = tab(t), out = [];
    for (const r0 of rows) { const r = { id: uid(), created_at: new Date().toISOString(), ...r0 };
      if (upsert && onConflict) { const i = T.findIndex((x) => x[onConflict] === r[onConflict]); if (i >= 0) { T[i] = { ...T[i], ...r0 }; out.push({ ...T[i] }); continue; } }
      T.push(r); out.push({ ...r }); }
    save(); return out;
  },
  async update(t, m, v) { const rows = filtra(tab(t), m); rows.forEach((r) => Object.assign(r, v)); save(); return rows.map((r) => ({ ...r })); },
  async remove(t, m) { const del = new Set(filtra(tab(t), m)); const d = load(); d[t] = tab(t).filter((r) => !del.has(r)); save(); return null; },
};
