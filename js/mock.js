// Modo demonstração: banco em memória (salvo no navegador) com a mesma interface do Supabase.
import { iso, hoje, addDias, segundaDa, DIAS } from './util.js';

const KEY = 'risk-demo-db';
const uid = () => crypto.randomUUID();
const USER = { id: '00000000-0000-0000-0000-000000000001', email: 'demo@risk.app' };
let D = null;

function seed() {
  const ed = uid(), seg = segundaDa(hoje());
  const inicio = iso(addDias(seg, -7 * 9));
  const tops = [
    ['Legislação de Trânsito', 'CTB: Das Infrações.'], ['Legislação de Trânsito', 'Lei nº 5.970/1973.'],
    ['Língua Portuguesa', '1 Compreensão e interpretação de textos de gêneros variados.'],
    ['Língua Portuguesa', '7/7.1-7.4 Correspondência oficial (Manual de Redação da Presidência da República): aspectos gerais, finalidade dos expedientes, adequação da linguagem e do formato.'],
    ['Legislação Especial', '12 Lei nº 13.869/2019 (abuso de autoridade).'], ['Legislação Especial', '3 Lei nº 8.072/1990 (crimes hediondos) e alterações.'],
    ['Direito Constitucional', '1/1.1-1.5 Poder constituinte: fundamentos; originário e derivado; reforma e revisão; limitação do poder de revisão; emendas à Constituição.'],
    ['Direito Processual Penal', '1/1.1-1.4 Ação penal: conceito, características, espécies e condições.'],
    ['Ética e Cidadania', '4/4.1/4.2 Ética no setor público: moralidade (art. 37 da CF); deveres do servidor e moralidade administrativa (Lei nº 8.112/1990, art. 116, IX).'],
    ['Língua Estrangeira', 'Espanhol 1: Compreensão de texto escrito em língua espanhola.'],
    ['Direito Penal', '5/5.1-5.3 Culpabilidade: causas de exclusão; imputabilidade; erro de proibição.'],
    ['Geopolítica', '6 O Brasil e a questão cultural.'],
  ].map(([materia, topico], i) => ({ id: uid(), user_id: USER.id, edital_id: ed, materia, topico, ordem: i, fora_do_edital: i === 11, lingua: materia === 'Língua Estrangeira' ? 'espanhol' : null, concluido: i < 2 }));
  const T = (n) => tops[n];
  const plano = [
    ['Segunda', [0, 2, 4]], ['Terça', [1, 6, 7]], ['Quarta', [0, 3, 8]], ['Quinta', [1, 9, 10]], ['Sexta', [0, 2, 5]],
  ];
  const tarefas = [];
  for (const sem of [9, 10, 11]) for (const [dia, ids] of plano) ids.forEach((n, o) => tarefas.push({
    id: uid(), user_id: USER.id, edital_id: ed, topico_id: T(n).id, semana: sem, dia, ordem: o, materia: T(n).materia,
    topico: (o === 0 && n === 0 ? 'Revisão + questões: ' : '') + T(n).topico.replace(/^[\d\.\/\-]+ /, ''), concluido: sem === 9, concluido_em: sem === 9 ? iso(addDias(seg, -7 + DIAS.indexOf(dia))) : null, checklist: {}, duvida: null, minutos: sem === 9 ? 45 : 0,
  }));
  const logs = [];
  for (let k = 0; k < 25; k++) {
    const t = tops[k % 10]; const f = 10 + (k % 5) * 4;
    logs.push({ id: uid(), user_id: USER.id, edital_id: ed, topico_id: t.id, data: iso(addDias(hoje(), -k)), feitas: f, acertos: Math.round(f * (0.55 + (k % 4) * 0.1)), origem: k % 3 ? 'externa' : 'app' });
  }
  const q = (codigo, materia, assunto, enunciado, gabarito, comentario, origem = 'inedita') => ({ id: uid(), codigo, modalidade: 'certo_errado', enunciado, alternativas: [], gabarito, comentario, materia, assunto, banca: origem === 'inedita' ? 'Projeto R.I.S.K.' : 'Cebraspe', orgao: 'PRF', ano: 2026, dificuldade: 2, situacao: 'atualizada', origem, fonte: 'Demo' });
  const questoes = [
    q('IN00001', 'Legislação Especial', tops[4].topico, '<p>Nos crimes da Lei nº 13.869/2019, a ação penal é pública condicionada à representação.</p>', 'E', '<p>Errado. O art. 3º estabelece ação penal pública incondicionada.</p>'),
    q('IN00002', 'Legislação Especial', tops[4].topico, '<p>Um agente filma pessoa presa para expô-la a vexame.</p><hr><p>Nessa situação, a conduta pode configurar crime de abuso de autoridade.</p>', 'C', '<p>Certo. Art. 13 da Lei 13.869/2019.</p>'),
    q('R21PFA084', 'Informática', 'Programação', '<p>Com relação a Python, julgue o item.</p><hr><p>O código a seguir imprime True.</p><p>x = bool(-3)<br>y = bool(True*x)<br>z = bool(False)<br>print (x and y and z)</p>', 'E', '<p>Errado. z é False, então a expressão é False.</p>', 'publica'),
    q('IN00003', 'Língua Portuguesa', tops[2].topico, '<p>Texto: A PRF ampliou a fiscalização no feriado.</p><hr><p>O texto informa que houve redução da fiscalização.</p>', 'E', '<p>Errado. O texto fala em ampliação.</p>'),
  ];
  for (let k = 0; k < 36; k++) { const tp = tops[k % 10]; questoes.push({ ...q('DM' + String(k).padStart(3, '0'), tp.materia, tp.topico, `<p>(Demonstração) Afirmação ${k + 1} sobre ${tp.topico.replace(/^[\d\.\/\-]+ /, '')}.</p>`, k % 3 ? 'C' : 'E', '<p>Comentário de demonstração.</p>', k % 2 ? 'publica' : 'inedita'), dificuldade: 1 + (k % 3), ano: 2020 + (k % 6) }); }
  const sessoes = [];
  for (let k = 0; k < 20; k++) { const tp = tops[k % 7]; sessoes.push({ id: uid(), user_id: USER.id, edital_id: ed, tarefa_id: null, materia: tp.materia, data: iso(addDias(hoje(), -k)), minutos: 30 + (k % 4) * 20, origem: k % 5 ? 'cronometro' : 'manual', obs: null, created_at: new Date().toISOString() }); }
  return {
    profiles: [{ id: USER.id, email: USER.email, nome: 'Lucas Matheus', role: 'admin', lingua: 'espanhol', blocos: [{ hora: '08:00', min: 50 }, { hora: '09:00', min: 50 }, { hora: '21:00', min: 50 }], meta_agua: 4000, edital_atual: ed, meta_questoes: 30, revisao_auto: true, cpf: '12345678909', status: 'aprovado' }, { id: uid(), email: 'novo.aluno@gmail.com', nome: 'Aluno Novo', role: 'aluno', status: 'pendente', created_at: new Date().toISOString() }, { id: uid(), email: 'eduarda@gmail.com', nome: 'Eduarda Souza', role: 'aluno', status: 'pendente', cpf: '98765432100', telefone: '(31) 98888-7777', cidade: 'Belo Vale/MG', curso_solicitado: 'belovale-procurador', dados_ok_em: new Date().toISOString(), materias_removidas: [], created_at: new Date().toISOString() }],
    editais: [{ id: ed, user_id: USER.id, concurso: 'PRF 2027', cargo: 'Policial Rodoviário Federal', banca: 'Cebraspe', formato: 'certo_errado', data_prova: null, data_inicio: inicio, cor: 'rosa', ativo: true }],
    ...demoVendas(),
    topicos: tops, tarefas, question_logs: logs, questoes, respostas: [], reportes: [], agua: [], simulados: [], ia_pedidos: [], provas: [], sessoes_estudo: sessoes, resumos: [],
  };
}
// Demonstração da vitrine, dos prazos de acesso e das compras
function demoVendas() {
  const d = (n) => iso(addDias(hoje(), n));
  const cv = uid();
  const aluno = (nome, email, extra) => ({ id: uid(), email, nome, role: 'aluno', status: 'aprovado', telefone: '(38) 99999-0000', cidade: 'Pirapora/MG', cpf: '11122233344', curso: 'prf', banca: 'cebraspe', materias_removidas: [], dados_ok_em: new Date().toISOString(), created_at: new Date().toISOString(), ...extra });
  return {
    _alunosDemo: [aluno('Ana Ativa', 'ana@exemplo.com', { acesso_ate: d(120) }), aluno('Bruno Vencendo', 'bruno@exemplo.com', { acesso_ate: d(6) }), aluno('Carla Vencida', 'carla@exemplo.com', { acesso_ate: d(-4) }), aluno('Diego Bloqueado', 'diego@exemplo.com', { acesso_ate: d(40), bloqueado: true, bloqueio_motivo: 'Compra reembolsada na Hotmart (HP0001)' })],
    cursos_venda: [{ id: cv, titulo: 'Preparatório PRF 2027', orgao: 'Polícia Rodoviária Federal', cargo: 'Policial Rodoviário Federal', situacao: 'Edital previsto', vagas: '1.000', salario: 'R$ 10.400', banca: 'Cebraspe', escolaridade: 'Nível superior', data_prova: 'a definir', materias: 'Língua Portuguesa\nRaciocínio Lógico-Matemático\nLegislação de Trânsito\nResoluções CONTRAN\nÉtica e Cidadania', descricao: 'Calendário de estudos montado para o edital, conteúdo programático completo e questões no padrão Cebraspe.', preco: 'R$ 197,00 ou 12x de R$ 19,70', link_compra: 'https://pay.hotmart.com/EXEMPLO', hotmart_produto: '1234567', curso: 'prf', duracao_dias: 365, publicado: true, ordem: 0, created_at: new Date().toISOString() }],
    compras: [{ id: uid(), transacao: 'HP1234567890', evento: 'PURCHASE_APPROVED', status: 'aprovada', email: 'ana@exemplo.com', nome: 'Ana Ativa', produto_id: '1234567', produto_nome: 'Preparatório PRF 2027', valor: 197, curso: 'prf', duracao_dias: 365, curso_venda_id: cv, aplicado_em: new Date().toISOString(), recebido_em: new Date().toISOString() },
      { id: uid(), transacao: 'HP2222222222', evento: 'PURCHASE_APPROVED', status: 'aprovada', email: 'novo.comprador@exemplo.com', nome: 'Novo Comprador', produto_id: '1234567', produto_nome: 'Preparatório PRF 2027', valor: 197, curso: 'prf', duracao_dias: 365, curso_venda_id: cv, recebido_em: new Date().toISOString() }],
  };
}
function load() { if (D) return; try { D = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { D = null; } if (!D) { D = seed(); if (D._alunosDemo) { D.profiles.push(...D._alunosDemo); delete D._alunosDemo; } persist(); } }
function persist() { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch {} }

function testa(row, k, v) {
  const val = row[k];
  if (k === 'or') return true;
  const [op, ...rest] = String(v).split('.'); const arg = rest.join('.');
  switch (op) {
    case 'eq': return String(val ?? '') === arg;
    case 'neq': return String(val ?? '') !== arg;
    case 'is': return arg === 'null' ? val == null : String(val) === arg;
    case 'gte': return String(val) >= arg;
    case 'lte': return String(val) <= arg;
    case 'in': return arg.replace(/^\(|\)$/g, '').split(',').map((s) => s.replace(/^"|"$/g, '')).includes(String(val));
    case 'like': { const re = new RegExp('^' + arg.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$'); return re.test(String(val ?? '')); }
    case 'ilike': { const re = new RegExp('^' + arg.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$', 'i'); return re.test(String(val ?? '')); }
    default: return true;
  }
}
function filtra(rows, params) {
  let out = rows.filter((r) => Object.entries(params).every(([k, v]) => ['select', 'order', 'limit', 'offset', 'on_conflict'].includes(k) || testa(r, k, v)));
  if (params.or) { const conds = params.or.replace(/^\(|\)$/g, '').split(','); out = out.filter((r) => conds.some((c) => { const [k, ...v] = c.split('.'); return testa(r, k, v.join('.')); })); }
  if (params.order) {
    const ords = params.order.split(',').map((o) => o.split('.'));
    out.sort((a, b) => { for (const [k, d] of ords) { const x = a[k] ?? '', y = b[k] ?? ''; if (x < y) return d === 'desc' ? 1 : -1; if (x > y) return d === 'desc' ? -1 : 1; } return 0; });
  }
  return out;
}
const t = (n) => { load(); D[n] = D[n] || []; return D[n]; };
const espera = () => new Promise((r) => setTimeout(r, 60));

export const auth = {
  get user() { return USER; },
  async signIn() { return USER; }, async signUp() { return { user: USER }; }, async resetPassword() {}, async updatePassword() {},
  fromUrlHash() { return null; }, signInGoogle() { alert('No modo demonstração o login com Google não funciona.'); }, async loadUser() { return new URLSearchParams(location.search).has('publico') ? null : USER; }, signOut() { localStorage.removeItem(KEY); D = null; location.reload(); },
};
export const db = {
  async select(table, params = {}, { count = false, range } = {}) {
    await espera();
    let rows = filtra(t(table), params);
    const total = rows.length;
    const off = Number(params.offset || (range ? range[0] : 0)); const lim = params.limit ? Number(params.limit) : range ? range[1] - range[0] + 1 : rows.length;
    rows = rows.slice(off, off + lim).map((r) => ({ ...r }));
    return count ? { data: rows, count: total } : rows;
  },
  async selectAll(table, params = {}) { return db.select(table, params); },
  async insert(table, rows, { upsert = false, onConflict } = {}) {
    await espera(); const T = t(table); const out = [];
    for (const r0 of rows) {
      const r = { id: uid(), created_at: new Date().toISOString(), ...r0 };
      if (upsert && onConflict) { const i = T.findIndex((x) => x[onConflict] === r[onConflict]); if (i >= 0) { T[i] = { ...T[i], ...r0 }; out.push(T[i]); continue; } }
      T.push(r); out.push(r);
    }
    persist(); return out;
  },
  async update(table, match, values) { await espera(); const rows = filtra(t(table), match); rows.forEach((r) => Object.assign(r, values)); persist(); return rows.map((r) => ({ ...r })); },
  async remove(table, match) { await espera(); const del = new Set(filtra(t(table), match)); D[table] = t(table).filter((r) => !del.has(r)); persist(); return null; },
  async rpc(fn, args) { if (fn === 'reprocessar_compra' || fn === 'verificar_minha_compra') return fn === 'reprocessar_compra' ? false : 0; if (fn === 'estatistica_questao') { const r = t('respostas').filter((x) => x.questao_id === args.q); return [{ total: r.length, acertos: r.filter((x) => x.acertou).length }]; } return null; },
};
const ARQ = new Map(); // arquivos do modo demonstração ficam só na memória (somem ao recarregar)
export const storage = {
  async upload(b, path, file) { ARQ.set(b + '/' + path, await file.arrayBuffer()); return URL.createObjectURL(file); },
  async download(b, path) { const a = ARQ.get(b + '/' + path); if (!a) throw new Error('No modo demonstração o arquivo some ao recarregar a página. Envie de novo para testar.'); return a.slice(0); },
  async remove(b, path) { ARQ.delete(b + '/' + path); },
};
export const functions = {
  async invoke(name, body) {
    await new Promise((r) => setTimeout(r, 700));
    if (name === 'gerar-resumo') {
      const tp = t('topicos').find((x) => x.id === body.topico_id);
      const html = `<h2>1. Visão geral</h2><p>(Demonstração) Resumo técnico de <strong>${tp.topico}</strong>. No site real, este texto é escrito pelo Claude com base no edital, no cargo e na banca.</p>
<h2>2. Base legal</h2><ul><li><strong>Art. 1º</strong> — exemplo de dispositivo.</li><li><strong>Art. 2º</strong> — outro dispositivo.</li></ul>
<h2>3. Conceitos e regras-chave</h2><p>Definições, requisitos e exceções.</p><ul><li>Regra A</li><li>Regra B</li></ul>
<h2>4. Quadro comparativo</h2><table><thead><tr><th>Instituto</th><th>Característica</th><th>Prazo</th></tr></thead><tbody><tr><td>A</td><td>Exemplo</td><td>5 dias</td></tr><tr><td>B</td><td>Exemplo</td><td>10 dias</td></tr></tbody></table>
<h2>5. Como a banca cobra</h2><blockquote>Pegadinha típica: trocar “pode” por “deve”.</blockquote>
<h2>6. Jurisprudência e entendimentos</h2><p>Tema cobrado pela letra da lei.</p>
<h2>7. Checklist de revisão</h2><ol><li>Item 1</li><li>Item 2</li><li>Item 3</li></ol>
<h2>8. Fixação</h2><ol><li>Afirmação de exemplo. <strong>Gabarito: Certo.</strong> Justificativa.</li></ol>`.repeat(2);
      const r = { id: uid(), user_id: USER.id, topico_id: tp.id, edital_id: tp.edital_id, materia: tp.materia, topico: tp.topico, concurso: 'PRF 2027', conteudo: html, created_at: new Date().toISOString() };
      t('resumos').push(r); persist(); return { resumo: r };
    }
    if (name !== 'gerar-questoes') throw new Error('Função inexistente');
    const tp = t('topicos').find((x) => x.id === body.topico_id);
    const qs = Array.from({ length: 10 }, (_, i) => ({ id: uid(), codigo: 'IA-DEMO-' + uid().slice(0, 6), modalidade: 'certo_errado', enunciado: `<p>(Demonstração) Afirmação ${i + 1} sobre ${tp?.topico || 'o tópico'}.</p>`, alternativas: [], gabarito: i % 2 ? 'E' : 'C', comentario: `<p>${i % 2 ? 'Errado' : 'Certo'}. Comentário de demonstração.</p>`, materia: tp?.materia, assunto: tp?.topico, banca: 'Cebraspe', origem: 'ia', owner: USER.id, situacao: 'atualizada', dificuldade: 2 }));
    t('questoes').push(...qs); persist(); return { questoes: qs, restantes: 4 };
  },
};
