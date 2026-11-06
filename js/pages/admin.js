import { S, carregarTudo, normResp } from '../state.js';
import { db, storage } from '../backend.js';
import { esc, iso, hoje, norm, DIAS } from '../util.js';
import { toast, barra, modal, loading } from '../ui.js';
import { parseCSV, toCSV, baixar } from '../csv.js';
import { recarregar } from '../app.js';
import { TEMAS, detectarTema } from '../temas.js';
import { ajustarDatas } from './edital-ferramentas.js';
import { CURSOS, BANCAS, cursoInfo, bancaInfo } from '../cursos.js';
import { MATERIAS_TODAS } from '../leitura/index.js';
import { conteudoPdf } from './admin-pdf.js';

const COLS = 'codigo;modalidade;enunciado;alt_a;alt_b;alt_c;alt_d;alt_e;gabarito;comentario;materia;assunto;subassunto;banca;orgao;cargo;nivel;ano;dificuldade;situacao;origem;fonte;tags'.split(';');

export async function render(el) {
  el.innerHTML = `<div class="mono up">Administrador</div><h1>Painel do administrador</h1>
    <div class="card" id="cad">${loading()}</div>
    <div class="card" style="margin-top:16px" id="pdfs"></div>
    <div class="card" style="margin-top:16px" id="migra"></div>
    <div class="card" style="margin-top:16px" id="alunos">${loading()}</div>
    <div class="card" style="margin-top:16px" id="reps"></div>`;
  reportes(el.querySelector('#reps'));
  const atual = async () => { await Promise.all([cadastros(el.querySelector('#cad'), atual), alunos(el.querySelector('#alunos'), atual)]); };
  conteudoPdf(el.querySelector('#pdfs'));
  migracao(el.querySelector('#migra'));
  await atual();
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

// Conferência do aluno: corrige dados, define curso e banca, remove/restaura matérias e confirma.
function conferir(p, atual) {
  const pend = p.status !== 'aprovado';
  let curso = p.curso || p.curso_solicitado || '';
  let fora = new Set(p.materias_removidas || []);
  const listaMats = () => {
    const c = cursoInfo(curso);
    if (!c) return '<p class="muted">Escolha um curso para ver as matérias.</p>';
    return c.materias.map((it) => {
      const mat = MATERIAS_TODAS.find((x) => x.id === it.id);
      const nome = mat?.nome || it.id, off = fora.has(it.id);
      const n = mat ? (it.assuntos ? mat.assuntos.filter((a) => it.assuntos.includes(a.id)).length : mat.assuntos.length) : 0;
      return `<div class="row mat-lin ${off ? 'off' : ''}" style="border-top:1px solid var(--borda);padding:6px 0">
        <span style="flex:1"><b>${esc(nome)}</b> <span class="muted" style="font-size:12px">${n} tópicos${it.obs ? ' · ' + esc(it.obs) : ''}</span>${off ? ' <span class="pill" style="background:var(--vermelho);color:#fff">removida</span>' : ''}</span>
        <button type="button" class="btn mini ${off ? '' : 'sec'}" data-mat="${it.id}">${off ? 'Restaurar' : 'Remover'}</button></div>`;
    }).join('');
  };
  modal(`<h3>${pend ? 'Conferir cadastro' : 'Curso do aluno'}</h3>
    <p class="muted" style="font-size:13px;margin-top:-6px">${esc(p.email || '')}${p.curso_solicitado ? ` · pediu: <b>${esc(cursoInfo(p.curso_solicitado)?.nome || p.curso_solicitado)}</b>` : ''}</p>
    <div class="campo"><label>Nome completo</label><input id="cN" style="width:100%" value="${esc(p.nome || '')}"></div>
    <div class="row"><div class="campo" style="flex:1"><label>CPF</label><input id="cC" style="width:100%" value="${esc(fmtCpf(p.cpf))}"></div>
      <div class="campo" style="flex:1"><label>WhatsApp</label><input id="cT" style="width:100%" value="${esc(p.telefone || '')}"></div></div>
    <div class="campo"><label>Cidade / UF</label><input id="cCi" style="width:100%" value="${esc(p.cidade || '')}"></div>
    <div class="row"><div class="campo" style="flex:2"><label>Curso</label><select id="cCu" style="width:100%"><option value="">— sem curso (vê todas as matérias) —</option>${CURSOS.map((c) => `<option value="${c.id}" ${c.id === curso ? 'selected' : ''}>${esc(c.nome)}</option>`).join('')}</select></div>
      <div class="campo" style="flex:1"><label>Banca</label><select id="cB" style="width:100%"><option value="">Não definida</option>${Object.entries(BANCAS).map(([k, v]) => `<option value="${k}" ${k === (p.banca ?? '') ? 'selected' : ''}>${esc(v.nome)}</option>`).join('')}</select></div></div>
    <p class="muted" id="cBd" style="font-size:12.5px;margin:-4px 0 8px"></p>
    <div class="campo"><label>Matérias liberadas</label><div id="cM">${listaMats()}</div></div>
    <div class="row" style="margin-top:12px"><span class="sp"></span>${pend ? '<button class="btn sec" id="cSalva">Salvar sem aprovar</button>' : ''}<button class="btn verde" id="cOk">${pend ? 'Confirmar e aprovar' : 'Confirmar'}</button></div>`, {
    onMount: (m, close) => {
      const $ = (q) => m.querySelector(q);
      const desc = () => { const c = cursoInfo(curso), bi = bancaInfo($('#cB').value); $('#cBd').innerHTML = `${c ? esc(c.edital) + ' ' : ''}${bi ? `Padrão da banca: <b>${esc(bi.desc)}</b>.` : 'Sem banca definida: o aluno vê Certo/Errado e múltipla escolha juntas.'}`; };
      const liga = () => m.querySelectorAll('[data-mat]').forEach((x) => (x.onclick = () => { const id = x.dataset.mat; fora.has(id) ? fora.delete(id) : fora.add(id); $('#cM').innerHTML = listaMats(); liga(); }));
      liga(); desc();
      $('#cCu').onchange = () => {
        curso = $('#cCu').value; fora = new Set(); $('#cM').innerHTML = listaMats(); liga();
        const c = cursoInfo(curso); if (c && !$('#cB').dataset.mexeu) $('#cB').value = c.banca; desc();
      };
      $('#cB').onchange = () => { $('#cB').dataset.mexeu = '1'; desc(); };
      if (!p.banca && cursoInfo(curso) && pend) $('#cB').value = cursoInfo(curso).banca;
      desc();
      const salvar = async (aprovar, ev) => {
        const cpf = $('#cC').value.replace(/\D/g, '');
        if (cpf && cpf.length !== 11) return toast('CPF deve ter 11 números.', 'erro');
        ev.target.disabled = true;
        const v = { nome: $('#cN').value.trim(), cpf: cpf || null, telefone: $('#cT').value.trim() || null, cidade: $('#cCi').value.trim() || null,
          curso: curso || null, banca: $('#cB').value || null, materias_removidas: [...fora] };
        if (aprovar) v.status = 'aprovado';
        try { await db.update('profiles', { id: 'eq.' + p.id }, v); toast(aprovar ? 'Aluno aprovado com o curso definido!' : 'Dados salvos.'); close(); atual(); }
        catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; }
      };
      $('#cOk').onclick = (ev) => salvar(pend, ev);
      if ($('#cSalva')) $('#cSalva').onclick = (ev) => salvar(false, ev);
    },
  });
}

// ---------- ALUNOS ----------
async function alunos(box, atual) {
  const ps = await db.select('profiles', { order: 'created_at.asc' });
  const eds = await db.select('editais', { select: 'id,user_id,concurso,cargo,tema,ativo,data_inicio', order: 'created_at.asc' }).catch(() => []);
  const temaSel = (e) => `<select data-tema="${e.id}" style="padding:4px 6px;font-size:12.5px"><option value="">Automático: ${esc(TEMAS[detectarTema(e)].nome)}</option>${Object.entries(TEMAS).map(([k, t]) => `<option value="${k}" ${e.tema === k ? 'selected' : ''}>${esc(t.nome)}</option>`).join('')}</select>`;
  const edsDe = (uid) => eds.filter((e) => e.user_id === uid && e.ativo !== false);
  const ST = { pendente: 'Aguardando', aprovado: 'Aprovado', recusado: 'Recusado' };
  box.innerHTML = `<h3>Alunos e usuários (${ps.length})</h3><div style="overflow-x:auto"><table class="tab"><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Cadastro</th><th>Curso e banca</th><th>Acesso</th><th>Tema do calendário (por edital)</th><th></th></tr>
    ${ps.map((p) => `<tr><td>${esc(p.nome || '')}</td><td>${esc(p.email || '')}</td><td>${p.role === 'admin' ? 'Administrador' : 'Aluno'}</td><td>${ST[p.status] || 'Aprovado'}</td><td>${p.role === 'admin' ? '<span class="muted">—</span>' : `${esc(cursoInfo(p.curso)?.curto || 'sem curso')}<br><span class="muted" style="font-size:12px">${esc(bancaInfo(p.banca)?.nome || 'banca não definida')}${p.materias_removidas?.length ? ` · ${p.materias_removidas.length} removida(s)` : ''}</span><br><button class="linkbtn" data-curso="${p.id}" style="font-size:12px">🎓 curso e matérias</button>`}</td><td>${p.bloqueado ? 'Bloqueado' : 'Ativo'}</td><td>${edsDe(p.id).map((e) => `<div style="margin:2px 0"><span class="muted" style="font-size:12px">${esc(e.concurso)}</span><br>${temaSel(e)} <button class="linkbtn" data-datas="${e.id}" style="font-size:12px">📅 datas</button></div>`).join('') || '<span class="muted">sem edital</span>'}${p.tema_padrao ? '<div class="muted" style="font-size:11.5px">aluno usa o tema padrão</div>' : ''}</td>
      <td>${p.id === S.user.id ? '<span class="muted">você</span>' : `${p.status !== 'aprovado' ? `<button class="btn mini verde" data-conf="${p.id}">Conferir e aprovar</button> ` : `<button class="btn mini sec" data-rc="${p.id}">Revogar</button> `}<button class="btn mini sec" data-bl="${p.id}">${p.bloqueado ? 'Desbloquear' : 'Bloquear'}</button> <button class="btn mini sec" data-adm="${p.id}">${p.role === 'admin' ? 'Tirar admin' : 'Tornar admin'}</button>`}</td></tr>`).join('')}</table></div>`;
  const up = async (id, v) => { try { await db.update('profiles', { id: 'eq.' + id }, v); atual(); } catch (e) { toast(e.message, 'erro'); } };
  box.querySelectorAll('[data-conf],[data-curso]').forEach((b) => (b.onclick = () => conferir(ps.find((x) => x.id === (b.dataset.conf || b.dataset.curso)), atual)));
  box.querySelectorAll('[data-rc]').forEach((b) => (b.onclick = () => { if (confirm('Revogar o acesso deste usuário?')) up(b.dataset.rc, { status: 'recusado' }); }));
  box.querySelectorAll('[data-tema]').forEach((s) => (s.onchange = async () => {
    try { await db.update('editais', { id: 'eq.' + s.dataset.tema }, { tema: s.value || null }); toast('Tema atualizado.'); const e = S.editais.find((x) => x.id === s.dataset.tema); if (e) e.tema = s.value || null; } catch (e) { toast(e.message, 'erro'); }
  }));
  box.querySelectorAll('[data-datas]').forEach((b) => (b.onclick = () => ajustarDatas(eds.find((x) => x.id === b.dataset.datas), () => alunos(box, atual))));
  box.querySelectorAll('[data-bl]').forEach((b) => (b.onclick = () => { const p = ps.find((x) => x.id === b.dataset.bl); up(p.id, { bloqueado: !p.bloqueado }); }));
  box.querySelectorAll('[data-adm]').forEach((b) => (b.onclick = () => { const p = ps.find((x) => x.id === b.dataset.adm); if (confirm('Alterar o perfil deste usuário?')) up(p.id, { role: p.role === 'admin' ? 'aluno' : 'admin', status: 'aprovado' }); }));
}

// ---------- ERROS REPORTADOS NA LEITURA ----------
async function reportes(box) {
  let lista = [];
  try { lista = (await db.select('reportes', { order: 'created_at.desc', limit: 200 })).filter((r) => !r.resolvido); } catch { lista = []; }
  box.innerHTML = `<h3 style="margin-top:0">⚑ Erros reportados na leitura</h3>
    ${lista.length ? lista.map((r) => `<div class="row" style="border-top:1px solid var(--borda);padding:8px 0;align-items:flex-start"><div style="flex:1"><div class="muted" style="font-size:12px">${esc(String(r.created_at || '').slice(0, 10).split('-').reverse().join('/'))}</div>${esc(r.texto || '')}</div><button class="btn sec mini" data-ok="${r.id}">Resolvido</button></div>`).join('') : '<p class="muted">Nenhum erro pendente.</p>'}`;
  box.querySelectorAll('[data-ok]').forEach((b) => (b.onclick = async () => { try { await db.update('reportes', { id: 'eq.' + b.dataset.ok }, { resolvido: true }); reportes(box); } catch (e) { toast(e.message, 'erro'); } }));
}
