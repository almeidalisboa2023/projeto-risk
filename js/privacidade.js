// LGPD: baixar meus dados, excluir minha conta e backup do administrador.
import { db, auth, MODO_DEMO } from './backend.js';
import { baixar } from './csv.js';

export const TERMOS_VERSAO = '2026-11-13';

// Tabelas com dados do próprio aluno (cada uma só devolve as linhas dele, pelas regras de acesso do banco)
const DO_ALUNO = ['editais', 'topicos', 'tarefas', 'question_logs', 'respostas', 'respostas_leitura', 'flashcards_feitos', 'reportes', 'agua', 'provas', 'sessoes_estudo', 'resumos', 'ia_pedidos'];
// Tabelas gerais do site (só para o backup do administrador)
const DO_SITE = ['profiles', 'cursos_venda', 'cursos_ajustes', 'compras', 'conteudos', 'apostilas', 'leitura_edicoes', 'simulados', 'questoes', 'contas_excluidas'];

const data = () => new Date().toISOString().slice(0, 10);

async function junta(tabelas, filtro) {
  const out = {};
  for (const t of tabelas) {
    try { out[t] = await db.selectAll(t, filtro ? filtro(t) : {}); } catch { /* tabela inexistente ou sem permissão: ignora */ }
  }
  return out;
}

export async function baixarMeusDados(user) {
  const perfil = await db.select('profiles', { id: 'eq.' + user.id }).catch(() => []);
  const dados = await junta(DO_ALUNO, () => ({ user_id: 'eq.' + user.id }));
  const pacote = { gerado_em: new Date().toISOString(), conta: { id: user.id, email: user.email }, perfil: perfil[0] || null, ...dados };
  baixar(`meus-dados-projeto-risk-${data()}.json`, JSON.stringify(pacote, null, 2), 'application/json;charset=utf-8');
}

export async function backupCompleto() {
  const tudo = await junta([...DO_SITE, ...DO_ALUNO]);
  const resumo = Object.fromEntries(Object.entries(tudo).map(([k, v]) => [k, v.length]));
  baixar(`backup-projeto-risk-${data()}.json`, JSON.stringify({ gerado_em: new Date().toISOString(), resumo, ...tudo }), 'application/json;charset=utf-8');
  return resumo;
}

export async function excluirMinhaConta(motivo) {
  if (MODO_DEMO) throw new Error('No modo demonstração não há conta para excluir.');
  await db.rpc('excluir_minha_conta', { motivo: motivo || null });
  try { auth.signOut(); } catch {}
  try { ['risk-session', 'risk-comprar'].forEach((k) => localStorage.removeItem(k)); } catch {}
}
