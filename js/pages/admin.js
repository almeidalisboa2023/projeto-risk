import { S, carregarTudo, normResp } from '../state.js';
import { db, storage } from '../backend.js';
import { esc, iso, hoje, norm, DIAS } from '../util.js';
import { toast, barra, modal, loading } from '../ui.js';
import { parseCSV, toCSV, baixar } from '../csv.js';
import { recarregar } from '../app.js';
import { cursoInfo, CURSOS } from '../cursos.js';
import { criarAviso } from '../avisos.js';
import { materiasCursos } from './admin-cursos.js';
import { conteudoPdf } from './admin-pdf.js';
import { usuarios, conferir } from './admin-usuarios.js';
import { cursosVenda } from './admin-vitrine.js';
import { compras } from './admin-compras.js';
import { situacao } from '../acesso.js';
import { backupCompleto } from '../privacidade.js';

const COLS = 'codigo;modalidade;enunciado;alt_a;alt_b;alt_c;alt_d;alt_e;gabarito;comentario;materia;assunto;subassunto;banca;orgao;cargo;nivel;ano;dificuldade;situacao;origem;fonte;tags'.split(';');

// O painel do administrador é organizado em pastas
const PASTAS = [
  ['usuarios', '👥', 'Usuários', 'Cada aluno com o próprio cartão: prazo de acesso, contato e avisos'],
  ['cadastros', '📝', 'Cadastros pendentes', 'Conferir dados e aprovar quem se cadastrou'],
  ['vitrine', '🎓', 'Cursos preparatórios', 'Vitrine pública: foto do órgão, vagas, matérias, preço e link'],
  ['compras', '🛒', 'Compras Hotmart', 'Pagamentos recebidos e liberações automáticas'],
  ['materias', '📚', 'Matérias por curso', 'Incluir ou tirar matérias de cada curso'],
  ['pdfs', '📄', 'Conteúdo em PDF', 'Enviar PDF para virar conteúdo programático'],
  ['avisos', '📣', 'Avisos da página inicial', 'Publicar recados para os alunos (conteúdo novo, simulado, datas)'],
  ['erros', '⚑', 'Erros reportados', 'Avisos de erro enviados pelos alunos'],
  ['excluidas', '🗑', 'Contas excluídas', 'Alunos que excluíram a própria conta (aviso automático)'],
  ['backup', '💾', 'Backup dos dados', 'Baixar uma cópia de segurança de todo o banco'],
  ['importar', '⬇', 'Importar do Base44', 'Migração dos dados antigos'],
];

export async function render(el, q) {
  const p = q?.get?.('p');
  const pasta = PASTAS.find((x) => x[0] === p);
  if (!pasta) return capa(el);
  el.innerHTML = `<div class="row"><a class="btn sec mini" href="#/admin">‹ Pastas</a></div><div class="mono up" style="margin-top:8px">Administrador</div><h1>${pasta[1]} ${esc(pasta[2])}</h1><div class="card" id="pasta">${loading()}</div>`;
  const box = el.querySelector('#pasta');
  const atual = () => render(el, q);
  const F = {
    usuarios: () => usuarios(box, atual), cadastros: () => cadastros(box, atual), vitrine: () => cursosVenda(box), compras: () => compras(box),
    materias: () => materiasCursos(box), pdfs: () => conteudoPdf(box), erros: () => reportes(box), importar: () => migracao(box),
    excluidas: () => excluidas(box, atual), backup: () => backup(box), avisos: () => avisosAdm(box, atual),
  };
  try { await F[pasta[0]](); } catch (e) { box.innerHTML = `<p class="bad">${esc(e.message)}</p>`; }
}

async function capa(el) {
  el.innerHTML = `<div class="mono up">Administrador</div><h1>Painel do administrador</h1><div class="adm-pastas">${PASTAS.map(([k, ic, n, d]) => `<a class="adm-pasta" href="#/admin?p=${k}" data-p="${k}"><span class="adm-pasta-ico">${ic}</span><b>${esc(n)}</b><small>${esc(d)}</small><span class="adm-pasta-tag" hidden></span></a>`).join('')}</div>`;
  // contadores nas pastas
  try {
    const ps = await db.select('profiles', { select: 'id,role,status,bloqueado,acesso_ate' });
    const sit = ps.map(situacao);
    const am = sit.filter((s) => s.cor === 'amarelo').length, vm = sit.filter((s) => s.cor === 'vermelho').length, pend = ps.filter((p) => p.status === 'pendente').length;
    const tag = (k, html) => { const t = el.querySelector(`[data-p="${k}"] .adm-pasta-tag`); if (t && html) { t.innerHTML = html; t.hidden = false; } };
    tag('usuarios', [ps.length + ' usuários', am && `<i class="us-dot amarelo"></i>${am}`, vm && `<i class="us-dot vermelho"></i>${vm}`].filter(Boolean).join(' '));
    tag('cadastros', pend ? `<i class="us-dot vermelho"></i>${pend} aguardando` : '');
    const cp = await db.select('compras', { select: 'id,status,aplicado_em', status: 'eq.aprovada' }).catch(() => []);
    const semConta = cp.filter((c) => !c.aplicado_em).length;
    tag('compras', cp.length ? `${cp.length} aprovada(s)${semConta ? ` · <i class="us-dot amarelo"></i>${semConta} sem conta` : ''}` : '');
    const ex = await db.select('contas_excluidas', { select: 'id,vista' }).catch(() => []);
    const exN = ex.filter((x) => !x.vista).length;
    tag('excluidas', exN ? `<i class="us-dot vermelho"></i>${exN} nova(s)` : ex.length ? `${ex.length} registro(s)` : '');
    const cv = await db.select('cursos_venda', { select: 'id,publicado' }).catch(() => []);
    tag('vitrine', cv.length ? `${cv.filter((c) => c.publicado).length} publicado(s) de ${cv.length}` : '');
  } catch {}
}

// ---------- BANCO DE QUESTÕES ----------
async function banco(box) {
  const meta = await db.selectAll('questoes', { select: 'id,materia,origem,situacao', origem: 'in.(publica,inedita)' });
  const conta = (k) => meta.reduce((m, q) => m.set(q[k] || '—', (m.get(q[k] || '—') || 0) + 1), new Map());
  const rep = await db.select('reportes', { resolvido: 'eq.false', order: 'created_at.desc', limit: 50 });
  box.innerHTML = `<div class="row"><h3 style="margin:0">Banco de questões</h3><span class="sp"></span><button class="btn sec mini" id="modelo">Modelo CSV</button><label class="btn mini" style="margin:0">Importar planilha (CSV)<input type="file" accept=".csv,text/csv" id="csv" hidden></label></div>
    <div class="grid g4" style="margin-top:12px"><div><div class="muted">Total</div><div class="num">${meta.length}</div></div>
      ${[...conta('origem')].map(([k, v]) => `<div><div class="muted">${k === 'publica' ? 'Provas anteriores' : k === 'inedita' ? 'Inéditas' : esc(k)}</div><div class="num">${v}</div></div>`).join('')}
      ${[...conta('situacao')].map(([k, v]) => `<div><div class="muted">${esc(k)}</div><div class="num">${v}</div></div>`).join('')}</div>
    <details style="margin-top:10px"><summary class="muted">Questões por matéria</summary>${[...conta('materia')].sort((a, b) => b[1] - a[1]).map(([k, v]) => `<div class="row"><span>${esc(k)}</span><span class="sp"></span><b>${v}</b></div>`).join('')}</details>
    <div id="imp"></div>
    <h3 style="margin-top:16px">Questões reportadas com erro (${rep.length})</h3>${rep.map((r) => `<div class="row" style="margin:6px 0"><span class="muted">${esc(r.texto || '(sem texto)')}</span><span class="sp"></span><button class="btn mini sec" data-res="${r.id}">Resolvido</button></div>`).join('') || '<p class="muted">Nenhuma.</p>'}`;
  box.querySelector('#modelo').onclick = () => baixar('modelo-questoes.csv', toCSV([], COLS));
  box.querySelectorAll('[data-res]').forEach((b) => (b.onclick = async () => { await db.update('reportes', { id: 'eq.' + b.dataset.res }, { resolvido: true }); banco(box); }));
  box.querySelector('#csv').onchange = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const rows = parseCSV(await file.text());
    const existentes = new Set((await db.selectAll('questoes', { select: 'codigo' })).map((q) => q.codigo));
    const validas = [], erros = [];
    rows.forEach((r, i) => {
      const mod = r.modalidade === 'multipla_escolha' ? 'multipla_escolha' : 'certo_errado';
      const g = mod === 'certo_errado' ? normResp(r.gabarito) : String(r.gabarito || '').trim().toUpperCase();
      const err = !r.codigo ? 'código vazio' : !r.enunciado ? 'enunciado vazio' : mod === 'certo_errado' && !['C', 'E'].includes(g) ? 'gabarito deve ser C ou E' : mod === 'multipla_escolha' && !'ABCDE'.includes(g || 'X') ? 'gabarito deve ser A–E' : '';
      if (err) { erros.push(`Linha ${i + 2}${r.codigo ? ' (' + r.codigo + ')' : ''}: ${err}`); return; }
      validas.push({ codigo: r.codigo, modalidade: mod, enunciado: r.enunciado, alternativas: ['alt_a', 'alt_b', 'alt_c', 'alt_d', 'alt_e'].map((k) => r[k]).filter(Boolean), gabarito: g, comentario: r.comentario || null,
        materia: r.materia || null, assunto: r.assunto || null, subassunto: r.subassunto || null, banca: r.banca || null, orgao: r.orgao || null, cargo: r.cargo || null, nivel: r.nivel || null,
        ano: Number(r.ano) || null, dificuldade: Number(r.dificuldade) || null, situacao: ['desatualizada', 'anulada'].includes(r.situacao) ? r.situacao : 'atualizada', origem: r.origem === 'inedita' ? 'inedita' : 'publica', fonte: r.fonte || null, tags: r.tags || null });
    });
    const novas = validas.filter((q) => !existentes.has(q.codigo)).length;
    const imp = box.querySelector('#imp');
    imp.innerHTML = `<div class="card" style="margin-top:12px"><b>${esc(file.name)}</b> — ${rows.length} linhas<div class="row" style="margin:8px 0"><span class="pill verde">${validas.length} válidas</span><span class="pill">${novas} novas</span><span class="pill">${validas.length - novas} já existem (serão atualizadas)</span><span class="pill">${erros.length} com erro</span></div>
      ${erros.length ? `<details><summary class="muted">Ver erros</summary>${erros.slice(0, 200).map((x) => `<div class="muted" style="font-size:13px">${esc(x)}</div>`).join('')}</details>` : ''}
      <div id="prog"></div><button class="btn" id="go" ${validas.length ? '' : 'disabled'}>Importar ${validas.length} questões</button></div>`;
    imp.querySelector('#go').onclick = async (ev) => {
      ev.target.disabled = true;
      try {
        for (let i = 0; i < validas.length; i += 200) {
          await db.insert('questoes', validas.slice(i, i + 200), { upsert: true, onConflict: 'codigo' });
          imp.querySelector('#prog').innerHTML = `<div class="muted">${Math.min(i + 200, validas.length)} de ${validas.length}</div>${barra(((i + 200) / validas.length) * 100)}`;
        }
        toast('Importação concluída!'); banco(box);
      } catch (er) { toast(er.message, 'erro'); ev.target.disabled = false; }
    };
  };
}

// ---------- MIGRAÇÃO DO BASE44 ----------
function migracao(box) {
  box.innerHTML = `<h3>Importar meus dados do Base44</h3>
    <p class="muted" style="font-size:14px">Selecione os arquivos exportados (JSON ou CSV, com o nome da tabela no nome do arquivo): Edital, EditalMateria, WeeklyTask, QuestionLog e, se tiver, WaterLog. Os dados entram na SUA conta. Faça só uma vez.</p>
    <input type="file" id="js" accept=".json,.csv,application/json,text/csv" multiple><div id="mres" style="margin-top:10px"></div>`;
  box.querySelector('#js').onchange = async (e) => {
    const arq = {};
    for (const f of e.target.files) {
      const nome = f.name.toLowerCase(); const txt = await f.text();
      try {
        if (nome.endsWith('.csv')) arq[nome] = parseCSV(txt).map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, v === 'true' ? true : v === 'false' ? false : v === '' ? null : v])));
        else { const j = JSON.parse(txt); arq[nome] = Array.isArray(j) ? j : j.data || j.items || []; }
      } catch { toast('Arquivo inválido: ' + f.name, 'erro'); return; }
    }
    const pega = (k) => Object.entries(arq).find(([n]) => { const x = n.replace(/[^a-z]/g, ''); return k === 'edital' ? x.startsWith('edital') && !x.startsWith('editalmateria') : x.includes(k); })?.[1] || [];
    const E = pega('edital').filter((x) => x.concurso), M = pega('editalmateria'), W = pega('weeklytask'), Q = pega('questionlog'), A = pega('waterlog');
    const out = box.querySelector('#mres');
    out.innerHTML = `<div class="row"><span class="pill">${E.length} edital(is)</span><span class="pill">${M.length} tópicos</span><span class="pill">${W.length} tarefas</span><span class="pill">${Q.length} registros de questões (${Q.reduce((s, q) => s + num(q, ['questoes_feitas', 'feitas', 'quantidade']), 0)} questões)</span><span class="pill">${A.length} registros de água</span></div><div id="mp"></div><button class="btn" id="mgo" style="margin-top:8px">Importar para a minha conta</button>`;
    out.querySelector('#mgo').onclick = async (ev) => {
      ev.target.disabled = true; const st = (t) => (out.querySelector('#mp').innerHTML = `<div class="loading"><span class="spin"></span>${esc(t)}</div>`);
      try {
        const uid = S.user.id, mapE = new Map(), mapT = new Map();
        for (const e0 of E) {
          st('Criando edital ' + e0.concurso);
          const [e] = await db.insert('editais', [{ user_id: uid, concurso: e0.concurso, cargo: e0.cargo || null, banca: e0.banca || null, formato: e0.formato === 'multipla_escolha' ? 'multipla_escolha' : 'certo_errado', data_prova: e0.data_prova || null, data_inicio: e0.data_inicio_plano || e0.data_inicio || null, legacy_id: e0.id }]);
          mapE.set(e0.id, e.id);
        }
        const edPadrao = mapE.values().next().value;
        const tops = M.map((m, i) => ({ user_id: uid, edital_id: mapE.get(m.edital_id) || edPadrao, materia: m.materia, topico: m.topico, ordem: i, fora_do_edital: !!m.fora_do_edital, lingua: m.lingua || null, concluido: !!m.concluido, legacy_id: m.id,
          link_aula: m.link_aula || null, link_pdf: m.link_pdf || null, link_lei_seca: m.link_lei_seca || null, link_questoes: m.link_questoes || null }));
        for (let i = 0; i < tops.length; i += 300) { st(`Tópicos ${i}/${tops.length}`); (await db.insert('topicos', tops.slice(i, i + 300))).forEach((t) => mapT.set(t.legacy_id, t)); }
        const ordem = new Map();
        const tars = W.filter((w) => DIAS.includes(w.dia)).map((w) => { const k = w.semana + w.dia; const o = ordem.get(k) || 0; ordem.set(k, o + 1); const tp = mapT.get(w.edital_materia_id);
          return { user_id: uid, edital_id: tp?.edital_id || edPadrao, topico_id: tp?.id || null, semana: Math.round(w.semana), dia: w.dia, ordem: o, materia: w.materia, topico: w.topico, concluido: !!w.concluido, concluido_em: w.concluido_em || null, legacy_id: w.id }; });
        for (let i = 0; i < tars.length; i += 300) { st(`Tarefas ${i}/${tars.length}`); await db.insert('tarefas', tars.slice(i, i + 300)); }
        const logs = Q.map((q) => { const f = num(q, ['questoes_feitas', 'feitas', 'quantidade']), a = Math.min(f, num(q, ['questoes_acertos', 'acertos'])); const tp = mapT.get(q.edital_materia_id);
          return { user_id: uid, edital_id: tp?.edital_id || edPadrao, topico_id: tp?.id || null, data: String(q.data || q.data_registro || q.created_date || iso(hoje())).slice(0, 10), feitas: f, acertos: a, origem: q.origem === 'app' ? 'app' : 'externa', legacy_id: q.id }; }).filter((l) => l.feitas > 0);
        for (let i = 0; i < logs.length; i += 300) { st(`Histórico ${i}/${logs.length}`); await db.insert('question_logs', logs.slice(i, i + 300)); }
        const ag = A.map((a) => ({ user_id: uid, data: String(a.data || a.created_date).slice(0, 10), ml: Number(a.ml || a.quantidade_ml || a.quantidade) || 0 })).filter((a) => a.ml > 0);
        if (ag.length) await db.insert('agua', ag);
        if (edPadrao) await db.update('profiles', { id: 'eq.' + uid }, { edital_atual: edPadrao });
        out.querySelector('#mp').innerHTML = `<p class="ok">Pronto! ${tops.length} tópicos, ${tars.length} tarefas e ${logs.reduce((s, l) => s + l.feitas, 0)} questões no histórico.</p>`;
        await carregarTudo(); setTimeout(recarregar, 1500);
      } catch (er) { toast(er.message, 'erro'); ev.target.disabled = false; }
    };
  };
}
const num = (o, ks) => { for (const k of ks) if (o[k] != null && !isNaN(Number(o[k]))) return Math.round(Number(o[k])); return 0; };

// ---------- SIMULADOS ----------
async function simulados(box) {
  const [lista, perfis] = await Promise.all([db.select('simulados', { order: 'liberado_em.desc' }), db.select('profiles', { order: 'nome.asc' })]);
  box.innerHTML = `<div class="row"><h3 style="margin:0">Simulados semanais</h3><span class="sp"></span><button class="btn" id="novo">Adicionar simulado</button></div>
    ${lista.map((s) => `<div class="row" style="margin:10px 0"><b>${esc(s.titulo)}</b><span class="pill">Semana ${s.semana ?? '—'}</span><span class="muted">libera ${esc((s.liberado_em || '').split('-').reverse().join('/'))} · ${s.alunos?.length ? s.alunos.length + ' aluno(s)' : 'todos os alunos'}</span><span class="sp"></span><a class="btn sec mini" href="${esc(s.arquivo_url)}" target="_blank">Abrir</a><button class="btn sec mini" data-del="${s.id}">Excluir</button></div>`).join('') || '<p class="muted">Nenhum simulado cadastrado.</p>'}`;
  box.querySelectorAll('[data-del]').forEach((b) => (b.onclick = async () => { if (!confirm('Excluir este simulado?')) return; await db.remove('simulados', { id: 'eq.' + b.dataset.del }); simulados(box); }));
  box.querySelector('#novo').onclick = () => modal(`<h3>Adicionar simulado</h3>
    <div class="campo"><label>Título</label><input id="t" style="width:100%" placeholder="SIMULADO SEMANA 10"></div>
    <div class="row"><div class="campo"><label>Semana</label><input type="number" id="s" style="width:100px"></div><div class="campo"><label>Libera em (sábado)</label><input type="date" id="d"></div></div>
    <div class="campo"><label>PDF</label><input type="file" id="f" accept="application/pdf"></div>
    <div class="campo"><label>Para quais alunos? (nenhum marcado = todos)</label>${perfis.map((p) => `<label class="check"><input type="checkbox" value="${p.id}"> ${esc(p.nome || p.email)}</label>`).join('')}</div>
    <button class="btn" id="ok">Salvar</button>`, {
    onMount: (m, close) => (m.querySelector('#ok').onclick = async (ev) => {
      const f = m.querySelector('#f').files[0]; const t = m.querySelector('#t').value.trim(); const d = m.querySelector('#d').value;
      if (!t || !f || !d) return toast('Preencha título, data e PDF.', 'erro');
      ev.target.disabled = true;
      try {
        const url = await storage.upload('simulados', `${Date.now()}-${f.name.replace(/[^\w.-]/g, '_')}`, f);
        const alunos = [...m.querySelectorAll('input[type=checkbox]:checked')].map((c) => c.value);
        await db.insert('simulados', [{ titulo: t, semana: Number(m.querySelector('#s').value) || null, liberado_em: d, arquivo_url: url, alunos: alunos.length ? alunos : null }]);
        close(); simulados(box);
      } catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; }
    }),
  });
}

// ---------- CADASTROS PENDENTES ----------
async function cadastros(box, atual) {
  const ps = await db.select('profiles', { status: 'eq.pendente', order: 'created_at.asc' });
  S.pendentes = ps.length;
  const b = document.querySelector('.side a[href="#/admin"] .badge'); if (b) { if (ps.length) b.textContent = ps.length; else b.remove(); }
  box.innerHTML = `<div class="row"><h3 style="margin:0">Cadastros aguardando aprovação</h3>${ps.length ? `<span class="pill" style="background:var(--vermelho);color:#fff">${ps.length}</span>` : ''}</div>
    <p class="muted" style="font-size:13px">Confira os dados, defina o curso e a banca e aprove. O aluno só vê as matérias do curso.</p>
    ${ps.length ? `<div style="overflow-x:auto"><table class="tab"><tr><th>Nome</th><th>Contato</th><th>Curso pedido</th><th>Cadastrou em</th><th></th></tr>
      ${ps.map((p) => `<tr><td><b>${esc(p.nome || '')}</b>${p.cpf ? `<br><span class="muted" style="font-size:12px">CPF ${esc(fmtCpf(p.cpf))}</span>` : ''}</td>
        <td>${esc(p.email || '')}${p.telefone ? `<br><span class="muted" style="font-size:12px">${esc(p.telefone)} · ${esc(p.cidade || '')}</span>` : ''}</td>
        <td>${p.dados_ok_em ? esc(cursoInfo(p.curso_solicitado)?.nome || 'não escolheu') : '<span class="muted">ainda preenchendo o cadastro</span>'}</td>
        <td>${p.created_at ? new Date(p.created_at).toLocaleString('pt-BR') : ''}</td>
        <td><button class="btn mini verde" data-conf="${p.id}">Conferir e aprovar</button> <button class="btn mini sec" data-rc="${p.id}">Recusar</button></td></tr>`).join('')}</table></div>`
      : '<p class="muted">Nenhum cadastro pendente.</p>'}`;
  box.querySelectorAll('[data-conf]').forEach((x) => (x.onclick = () => conferir(ps.find((p) => p.id === x.dataset.conf), atual)));
  box.querySelectorAll('[data-rc]').forEach((x) => (x.onclick = async () => {
    if (!confirm('Recusar este cadastro? A pessoa não vai conseguir entrar.')) return;
    try { await db.update('profiles', { id: 'eq.' + x.dataset.rc }, { status: 'recusado' }); toast('Cadastro recusado.'); atual(); } catch (e) { toast(e.message, 'erro'); }
  }));
}
const fmtCpf = (c) => String(c || '').replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

// ---------- ERROS REPORTADOS NA LEITURA ----------
async function reportes(box) {
  let lista = [];
  try { lista = (await db.select('reportes', { order: 'created_at.desc', limit: 200 })).filter((r) => !r.resolvido); } catch { lista = []; }
  box.innerHTML = `<h3 style="margin-top:0">⚑ Erros reportados no conteúdo programático</h3>
    ${lista.length ? lista.map((r) => `<div class="row" style="border-top:1px solid var(--borda);padding:8px 0;align-items:flex-start"><div style="flex:1"><div class="muted" style="font-size:12px">${esc(String(r.created_at || '').slice(0, 10).split('-').reverse().join('/'))}</div>${esc(r.texto || '')}</div><button class="btn sec mini" data-ok="${r.id}">Resolvido</button></div>`).join('') : '<p class="muted">Nenhum erro pendente.</p>'}`;
  box.querySelectorAll('[data-ok]').forEach((b) => (b.onclick = async () => { try { await db.update('reportes', { id: 'eq.' + b.dataset.ok }, { resolvido: true }); reportes(box); } catch (e) { toast(e.message, 'erro'); } }));
}

// ---------- CONTAS EXCLUÍDAS ----------
// ---------- AVISOS DA PÁGINA INICIAL ----------
async function avisosAdm(box, atual) {
  const ls = await db.select('avisos', { order: 'publicar_em.desc', limit: 100 });
  const agora = new Date().toISOString();
  box.innerHTML = `<h3 style="margin:0 0 4px">Novo aviso</h3>
    <p class="muted" style="font-size:13.5px;margin:0 0 10px">Aparece na caixa “📣 Avisos” da página inicial dos alunos. Quando você envia apostila, material, simulado ou conteúdo em PDF, o aviso já é criado sozinho. Use aqui para recados avulsos.</p>
    <div class="campo"><label>Título</label><input id="avT" style="width:100%" placeholder="Ex.: Conteúdo novo disponível: Lei 5.406"></div>
    <div class="campo"><label>Texto (opcional)</label><textarea id="avX" rows="2" style="width:100%" placeholder="Ex.: 80 questões novas de processo disciplinar"></textarea></div>
    <div class="row" style="gap:10px;flex-wrap:wrap">
      <div class="campo" style="flex:1;min-width:150px"><label>Tipo</label><select id="avTp" style="width:100%"><option value="aviso">📣 Recado</option><option value="conteudo">📖 Conteúdo novo</option><option value="questoes">🎯 Questões novas</option><option value="simulado">📝 Simulado</option><option value="apostila">📕 Apostila</option><option value="material">📄 Material</option></select></div>
      <div class="campo" style="flex:1;min-width:150px"><label>Publicar em</label><input type="datetime-local" id="avQ" style="width:100%"><small class="muted">Em branco: agora.</small></div>
      <div class="campo" style="flex:1;min-width:150px"><label>Link no site (opcional)</label><input id="avL" style="width:100%" placeholder="#/simulados"></div></div>
    <div class="campo"><label>Para quais cursos? (nenhum marcado = todos os alunos)</label><div class="row" style="gap:12px;flex-wrap:wrap">${CURSOS.map((c) => `<label style="font-size:14px"><input type="checkbox" class="avC" value="${c.id}"> ${esc(c.curto)}</label>`).join('')}</div></div>
    <button class="btn" id="avGo">Publicar aviso</button>
    <h3 style="margin:22px 0 6px">Avisos publicados (${ls.length})</h3>
    ${ls.map((a) => `<div class="row" style="border-top:1px solid var(--borda);padding:10px 0;gap:10px;align-items:flex-start"><div style="flex:1;min-width:0">
      <b>${esc(a.titulo)}</b>${a.ativo ? '' : ' <span class="pill">oculto</span>'}${a.publicar_em > agora ? ' <span class="pill">agendado</span>' : ''}
      ${a.texto ? `<div class="muted" style="font-size:13.5px">${esc(a.texto)}</div>` : ''}
      <div class="muted" style="font-size:12.5px">${new Date(a.publicar_em).toLocaleString('pt-BR')} · ${(a.cursos || []).length ? a.cursos.map((c) => esc(cursoInfo(c)?.curto || c)).join(', ') : 'todos os alunos'}</div></div>
      <button class="btn mini sec" data-oc="${a.id}" data-v="${a.ativo ? 0 : 1}">${a.ativo ? 'Ocultar' : 'Mostrar'}</button><button class="btn mini sec" data-del="${a.id}">Apagar</button></div>`).join('') || '<p class="muted">Nenhum aviso ainda.</p>'}`;
  box.querySelector('#avGo').onclick = async (e) => {
    const titulo = box.querySelector('#avT').value.trim();
    if (!titulo) return toast('Escreva o título do aviso.', 'erro');
    const q = box.querySelector('#avQ').value;
    e.target.disabled = true;
    const r = await criarAviso({ titulo, texto: box.querySelector('#avX').value.trim(), tipo: box.querySelector('#avTp').value, link: box.querySelector('#avL').value.trim() || null,
      cursos: [...box.querySelectorAll('.avC:checked')].map((x) => x.value), publicar_em: q ? new Date(q).toISOString() : null });
    if (!r) { e.target.disabled = false; return toast('Não deu para publicar. Rodou a atualização 19 no Supabase?', 'erro'); }
    toast('Aviso publicado.'); atual();
  };
  box.querySelectorAll('[data-oc]').forEach((b) => (b.onclick = async () => { try { await db.update('avisos', { id: 'eq.' + b.dataset.oc }, { ativo: b.dataset.v === '1' }); atual(); } catch (er) { toast(er.message, 'erro'); } }));
  box.querySelectorAll('[data-del]').forEach((b) => (b.onclick = async () => { if (!confirm('Apagar este aviso?')) return; try { await db.remove('avisos', { id: 'eq.' + b.dataset.del }); atual(); } catch (er) { toast(er.message, 'erro'); } }));
}

async function excluidas(box, atual) {
  const ls = await db.select('contas_excluidas', { order: 'excluida_em.desc' });
  const novas = ls.filter((x) => !x.vista).length;
  box.innerHTML = `<div class="row"><h3 style="margin:0">Contas excluídas (${ls.length})</h3><span class="sp"></span>${novas ? '<button class="btn mini" id="exVistas">Marcar todas como vistas</button>' : ''}</div>
    <p class="muted" style="font-size:13.5px">Quando um aluno usa “Excluir minha conta” no Perfil, a conta e os dados de estudo dele são apagados na hora, e ele aparece aqui. Guardamos só nome, e-mail, curso, motivo e data, por 6 meses. As compras dele continuam na pasta Compras Hotmart.</p>
    ${ls.map((x) => `<div class="row" style="border-top:1px solid var(--borda);padding:10px 0;gap:10px;align-items:flex-start">
      <div style="flex:1">${x.vista ? '' : '<span class="pill" style="background:var(--vermelho);color:#fff">nova</span> '}<b>${esc(x.nome || '(sem nome)')}</b> <span class="muted">${esc(x.email || '')}</span>
        <div class="muted" style="font-size:13px">Excluída em ${new Date(x.excluida_em).toLocaleString('pt-BR')}${x.curso ? ' · curso: ' + esc(cursoInfo(x.curso)?.nome || x.curso) : ''}</div>
        ${x.motivo ? `<div style="font-size:13.5px;margin-top:4px">💬 ${esc(x.motivo)}</div>` : ''}</div>
      ${x.vista ? '' : `<button class="btn mini sec" data-vista="${x.id}">Marcar como vista</button>`}</div>`).join('') || '<p class="muted">Nenhuma conta excluída.</p>'}`;
  const marca = async (filtro) => { await db.update('contas_excluidas', filtro, { vista: true }); await carregarTudo().catch(() => {}); atual(); };
  const t = box.querySelector('#exVistas'); if (t) t.onclick = () => marca({ vista: 'eq.false' });
  box.querySelectorAll('[data-vista]').forEach((b) => (b.onclick = () => marca({ id: 'eq.' + b.dataset.vista })));
}

// ---------- BACKUP ----------
async function backup(box) {
  box.innerHTML = `<h3 style="margin-top:0">Backup dos dados</h3>
    <p class="muted" style="font-size:14px">Baixa um arquivo (.json) com todas as tabelas do banco: alunos, cursos, compras, questões, calendários, respostas e conteúdos editados. Faça <b>uma vez por semana</b> e guarde o arquivo no Google Drive ou no computador. O plano gratuito do Supabase não guarda cópias que você possa baixar.</p>
    <p class="muted" style="font-size:13px">⚠ O arquivo contém dados pessoais dos alunos (nome, e-mail, CPF, WhatsApp). Guarde em local protegido e não compartilhe. Os PDFs enviados (apostilas e simulados) não entram: eles ficam no Storage do Supabase.</p>
    <button class="btn" id="bkGo">💾 Baixar backup agora</button><div id="bkRes" style="margin-top:12px"></div>`;
  box.querySelector('#bkGo').onclick = async (e) => {
    e.target.disabled = true; e.target.textContent = 'Gerando backup…';
    try {
      const r = await backupCompleto();
      box.querySelector('#bkRes').innerHTML = `<p class="ok">Backup baixado.</p><div class="muted" style="font-size:13px">${Object.entries(r).map(([k, v]) => `${esc(k)}: <b>${v}</b>`).join(' · ')}</div>`;
    } catch (er) { toast(er.message, 'erro'); }
    e.target.disabled = false; e.target.textContent = '💾 Baixar backup agora';
  };
}
