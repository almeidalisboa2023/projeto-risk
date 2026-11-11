import { db } from './backend.js';
import { norm, iso, hoje } from './util.js';

export const S = { user: null, profile: null, conteudos: [], editais: [], edital: null, topicos: [], logs: [], tarefas: [], sessoes: [], ready: false };

const ouvintes = new Set();
export const onChange = (fn) => { ouvintes.add(fn); return () => ouvintes.delete(fn); };
const avisa = () => ouvintes.forEach((f) => { try { f(); } catch (e) { console.error(e); } });

export async function carregarTudo() {
  const [prof] = await db.select('profiles', { id: 'eq.' + S.user.id });
  S.profile = prof || { id: S.user.id, role: 'aluno', nome: S.user.email };
  S.editais = await db.select('editais', { user_id: 'eq.' + S.user.id, order: 'created_at.asc' });
  // Conteúdos enviados em PDF pelo administrador (entram na leitura das matérias)
  // Ajustes de matérias por curso feitos pelo administrador (incluir/excluir)
  S.cursosAjustes = await db.selectAll('cursos_ajustes', {}).catch(() => []);
  S.conteudos = await db.selectAll('conteudos', { ativo: 'eq.true', order: 'created_at.asc' }).catch(() => []);
  S.edicoes = await db.selectAll('leitura_edicoes', {}).catch(() => []);
  S.sessoes = await db.selectAll('sessoes_estudo', { user_id: 'eq.' + S.user.id, order: 'data.asc' }).catch(() => []);
  const ativos = S.editais.filter((e) => e.ativo !== false);
  S.pendentes = S.profile.role === 'admin' ? (await db.select('profiles', { status: 'eq.pendente', select: 'id' }).catch(() => [])).length : 0;
  S.edital = ativos.find((e) => e.id === S.profile.edital_atual) || ativos[0] || null;
  await carregarEdital();
  S.ready = true;
}

export async function carregarEdital() {
  if (!S.edital) { S.topicos = []; S.logs = []; S.tarefas = []; return; }
  const e = 'eq.' + S.edital.id;
  [S.topicos, S.logs, S.tarefas] = await Promise.all([
    db.selectAll('topicos', { edital_id: e, order: 'materia.asc,ordem.asc' }),
    db.selectAll('question_logs', { edital_id: e, user_id: 'eq.' + S.user.id, order: 'data.asc' }),
    db.selectAll('tarefas', { edital_id: e, user_id: 'eq.' + S.user.id, order: 'semana.asc,ordem.asc' }),
  ]);
  avisa();
}

export async function trocarEdital(id) {
  S.edital = S.editais.find((e) => e.id === id) || S.edital;
  await db.update('profiles', { id: 'eq.' + S.user.id }, { edital_atual: S.edital.id });
  S.profile.edital_atual = S.edital.id;
  await carregarEdital();
}

// Tópicos válidos (sem "fora do edital" e só a língua escolhida)
export function topicosValidos() {
  const lingua = norm(S.profile?.lingua || 'espanhol');
  return S.topicos.filter((t) => !t.fora_do_edital && (!t.lingua || norm(t.lingua) === lingua));
}

export function topicoDaQuestao(q) {
  const m = norm(q.materia), a = norm(q.assunto);
  return S.topicos.find((t) => norm(t.materia) === m && norm(t.topico) === a) || null;
}

// Grava UMA resposta do banco (conta no edital, Painel e blocos)
export async function registrarResposta(q, resposta, topicoId) {
  const r = normResp(resposta), g = normResp(q.gabarito);
  const acertou = r === g;
  const topico_id = topicoId || topicoDaQuestao(q)?.id || null;
  await db.insert('respostas', [{ user_id: S.user.id, questao_id: q.id, resposta: r, acertou, topico_id }]);
  if (S.edital) {
    const [log] = await db.insert('question_logs', [{ user_id: S.user.id, edital_id: S.edital.id, topico_id, data: iso(hoje()), feitas: 1, acertos: acertou ? 1 : 0, origem: 'app' }]);
    S.logs.push(log);
    avisa();
  }
  return acertou;
}

export async function registrarExterno(topicoId, feitas, acertos, data) {
  feitas = Number(feitas); acertos = Number(acertos);
  if (!Number.isInteger(feitas) || !Number.isInteger(acertos) || feitas <= 0 || acertos < 0) throw new Error('Informe números inteiros (feitas maior que zero).');
  if (acertos > feitas) throw new Error('Acertos não pode ser maior que questões feitas.');
  const [log] = await db.insert('question_logs', [{ user_id: S.user.id, edital_id: S.edital.id, topico_id: topicoId, data: data || iso(hoje()), feitas, acertos, origem: 'externa' }]);
  S.logs.push(log); avisa();
}

export function normResp(v) {
  const s = norm(v).replace(/[^a-z]/g, '');
  if (['c', 'certo', 'correto', 'true', 'v', 'verdadeiro'].includes(s)) return 'C';
  if (['e', 'errado', 'incorreto', 'false', 'f', 'falso'].includes(s)) return 'E';
  return s.toUpperCase().slice(0, 1);
}

export async function atualizarTarefa(id, valores) {
  const [t] = await db.update('tarefas', { id: 'eq.' + id }, valores);
  const i = S.tarefas.findIndex((x) => x.id === id); if (i >= 0) S.tarefas[i] = t; avisa();
  return t;
}
export async function atualizarTopico(id, valores) {
  const [t] = await db.update('topicos', { id: 'eq.' + id }, valores);
  const i = S.topicos.findIndex((x) => x.id === id); if (i >= 0) S.topicos[i] = t; avisa();
  return t;
}
export const isAdmin = () => S.profile?.role === 'admin';
