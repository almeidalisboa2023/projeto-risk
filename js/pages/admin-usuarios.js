// Pasta "Usuários" do administrador: um cartão por aluno, com cor pela situação do acesso,
// data de vencimento editável, contato (e-mail e WhatsApp) e mensagens prontas de aviso.
import { S } from '../state.js';
import { db } from '../backend.js';
import { esc, norm, iso, hoje } from '../util.js';
import { toast, modal } from '../ui.js';
import { TEMAS, detectarTema } from '../temas.js';
import { ajustarDatas } from './edital-ferramentas.js';
import { CURSOS, BANCAS, cursoInfo, bancaInfo, materiasDoCurso } from '../cursos.js';
import { MATERIAS_TODAS } from '../leitura/index.js';
import { situacao, fmtData, somaDias, linkWhats, linkEmail, mensagem, tipoAviso, AVISO_DIAS } from '../acesso.js';

const fmtCpf = (c) => String(c || '').replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
let VITRINE = [];
async function vitrine() { try { VITRINE = await db.select('cursos_venda', { order: 'ordem.asc' }); } catch { VITRINE = []; } return VITRINE; }
// Prazo padrão: o do curso à venda ligado ao curso do aluno; sem curso à venda, 365 dias
export const duracaoDoCurso = (curso) => VITRINE.find((v) => v.curso === curso && v.duracao_dias)?.duracao_dias || 365;

const PRAZOS = [[30, '+30 dias'], [90, '+3 meses'], [180, '+6 meses'], [365, '+1 ano']];

// ---------- Conferência do aluno (aprovação, curso, banca, matérias e prazo) ----------
export async function conferir(p, atual) {
  if (!VITRINE.length) await vitrine();
  const pend = p.status !== 'aprovado';
  let curso = p.curso || p.curso_solicitado || '';
  let fora = new Set(p.materias_removidas || []);
  const acessoPadrao = () => p.acesso_ate || somaDias(null, duracaoDoCurso(curso));
  const listaMats = () => {
    const c = cursoInfo(curso);
    if (!c) return '<p class="muted">Escolha um curso para ver as matérias. Sem curso, o aluno vê só as matérias que aparecem no edital dele.</p>';
    return materiasDoCurso(c).map((it) => {
      const mat = MATERIAS_TODAS.find((x) => x.id === it.id);
      const nome = mat?.nome || it.id, off = fora.has(it.id);
      const n = mat ? (it.assuntos ? mat.assuntos.filter((a) => it.assuntos.includes(a.id)).length : mat.assuntos.length) : 0;
      return `<div class="row mat-lin ${off ? 'off' : ''}" style="border-top:1px solid var(--borda);padding:6px 0">
        <span style="flex:1"><b>${esc(nome)}</b> <span class="muted" style="font-size:12px">${n} tópicos${it.obs ? ' · ' + esc(it.obs) : ''}</span>${off ? ' <span class="pill" style="background:var(--vermelho);color:#fff">removida</span>' : ''}</span>
        <button type="button" class="btn mini ${off ? '' : 'sec'}" data-mat="${it.id}">${off ? 'Restaurar' : 'Remover'}</button></div>`;
    }).join('');
  };
  modal(`<h3>${pend ? 'Conferir cadastro' : 'Curso e acesso do aluno'}</h3>
    <p class="muted" style="font-size:13px;margin-top:-6px">${esc(p.email || '')}${p.curso_solicitado ? ` · pediu: <b>${esc(cursoInfo(p.curso_solicitado)?.nome || p.curso_solicitado)}</b>` : ''}</p>
    <div class="campo"><label>Nome completo</label><input id="cN" style="width:100%" value="${esc(p.nome || '')}"></div>
    <div class="row"><div class="campo" style="flex:1"><label>CPF</label><input id="cC" style="width:100%" value="${esc(fmtCpf(p.cpf))}"></div>
      <div class="campo" style="flex:1"><label>WhatsApp</label><input id="cT" style="width:100%" value="${esc(p.telefone || '')}"></div></div>
    <div class="campo"><label>Cidade / UF</label><input id="cCi" style="width:100%" value="${esc(p.cidade || '')}"></div>
    <div class="row"><div class="campo" style="flex:2"><label>Curso</label><select id="cCu" style="width:100%"><option value="">— sem curso (só as matérias do edital do aluno) —</option>${CURSOS.map((c) => `<option value="${c.id}" ${c.id === curso ? 'selected' : ''}>${esc(c.nome)}</option>`).join('')}</select></div>
      <div class="campo" style="flex:1"><label>Banca</label><select id="cB" style="width:100%"><option value="">Não definida</option>${Object.entries(BANCAS).map(([k, v]) => `<option value="${k}" ${k === (p.banca ?? '') ? 'selected' : ''}>${esc(v.nome)}</option>`).join('')}</select></div></div>
    <p class="muted" id="cBd" style="font-size:12.5px;margin:-4px 0 8px"></p>
    <div class="campo"><label>Acesso até</label><div class="row" style="gap:6px"><input type="date" id="cA" value="${esc(acessoPadrao())}"><label class="check" style="margin:0"><input type="checkbox" id="cSem" ${p.acesso_ate || pend ? '' : 'checked'}> sem vencimento</label></div>
      <small class="muted" id="cAd"></small></div>
    <div class="campo"><label>Matérias liberadas</label><div id="cM">${listaMats()}</div></div>
    <div class="row" style="margin-top:12px"><span class="sp"></span>${pend ? '<button class="btn sec" id="cSalva">Salvar sem aprovar</button>' : ''}<button class="btn verde" id="cOk">${pend ? 'Confirmar e aprovar' : 'Confirmar'}</button></div>`, {
    onMount: (m, close) => {
      const $ = (q) => m.querySelector(q);
      const desc = () => { const c = cursoInfo(curso), bi = bancaInfo($('#cB').value); $('#cBd').innerHTML = `${c ? esc(c.edital) + ' ' : ''}${bi ? `Padrão da banca: <b>${esc(bi.desc)}</b>.` : 'Sem banca definida: o aluno vê Certo/Errado e múltipla escolha juntas.'}`; };
      const descA = () => { $('#cA').disabled = $('#cSem').checked; $('#cAd').textContent = $('#cSem').checked ? 'O acesso não vence (use para você ou para cortesias).' : `Padrão do curso: ${duracaoDoCurso(curso)} dias.`; };
      const liga = () => m.querySelectorAll('[data-mat]').forEach((x) => (x.onclick = () => { const id = x.dataset.mat; fora.has(id) ? fora.delete(id) : fora.add(id); $('#cM').innerHTML = listaMats(); liga(); }));
      liga(); desc(); descA();
      $('#cSem').onchange = descA;
      $('#cCu').onchange = () => {
        curso = $('#cCu').value; fora = new Set(); $('#cM').innerHTML = listaMats(); liga();
        const c = cursoInfo(curso); if (c && !$('#cB').dataset.mexeu) $('#cB').value = c.banca;
        if (!p.acesso_ate) $('#cA').value = somaDias(null, duracaoDoCurso(curso));
        desc(); descA();
      };
      $('#cB').onchange = () => { $('#cB').dataset.mexeu = '1'; desc(); };
      if (!p.banca && cursoInfo(curso) && pend) $('#cB').value = cursoInfo(curso).banca;
      desc();
      const salvar = async (aprovar, ev) => {
        const cpf = $('#cC').value.replace(/\D/g, '');
        if (cpf && cpf.length !== 11) return toast('CPF deve ter 11 números.', 'erro');
        if (!$('#cSem').checked && !$('#cA').value) return toast('Informe a data de vencimento ou marque "sem vencimento".', 'erro');
        ev.target.disabled = true;
        const v = { nome: $('#cN').value.trim(), cpf: cpf || null, telefone: $('#cT').value.trim() || null, cidade: $('#cCi').value.trim() || null,
          curso: curso || null, banca: $('#cB').value || null, materias_removidas: [...fora], acesso_ate: $('#cSem').checked ? null : $('#cA').value };
        if (aprovar) v.status = 'aprovado';
        try { await db.update('profiles', { id: 'eq.' + p.id }, v); toast(aprovar ? 'Aluno aprovado com curso e prazo definidos!' : 'Dados salvos.'); close(); atual(); }
        catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; }
      };
      $('#cOk').onclick = (ev) => salvar(pend, ev);
      if ($('#cSalva')) $('#cSalva').onclick = (ev) => salvar(false, ev);
    },
  });
}

// ---------- Pasta de usuários ----------
const FILTROS = [['todos', 'Todos'], ['verde', '🟢 Ativos'], ['amarelo', '🟡 Perto de vencer'], ['vermelho', '🔴 Vencidos e bloqueados'], ['cinza', '⚪ Aguardando'], ['azul', '🔵 Administradores']];
let filtro = 'todos', busca = '';

export async function usuarios(box, atual) {
  const [ps, eds] = await Promise.all([
    db.select('profiles', { order: 'created_at.asc' }),
    db.select('editais', { select: 'id,user_id,concurso,cargo,tema,ativo,data_inicio', order: 'created_at.asc' }).catch(() => []),
    vitrine(),
  ]);
  const comSit = ps.map((p) => ({ p, s: situacao(p) }));
  const conta = (c) => comSit.filter((x) => x.s.cor === c).length;
  const edsDe = (uid) => eds.filter((e) => e.user_id === uid && e.ativo !== false);
  const temaSel = (e) => `<select data-tema="${e.id}" style="padding:4px 6px;font-size:12.5px"><option value="">Automático: ${esc(TEMAS[detectarTema(e)].nome)}</option>${Object.entries(TEMAS).map(([k, t]) => `<option value="${k}" ${e.tema === k ? 'selected' : ''}>${esc(t.nome)}</option>`).join('')}</select>`;
  const amarelos = comSit.filter((x) => x.s.cor === 'amarelo' && x.p.email);

  const desenha = () => {
    const t = norm(busca);
    const lista = comSit.filter(({ p, s }) => (filtro === 'todos' || s.cor === filtro) && (!t || norm([p.nome, p.email, p.telefone, p.cidade, p.cpf, cursoInfo(p.curso)?.nome].join(' ')).includes(t)))
      .sort((a, b) => a.s.ordem - b.s.ordem || String(a.p.acesso_ate || '9').localeCompare(String(b.p.acesso_ate || '9')) || String(a.p.nome || '').localeCompare(String(b.p.nome || '')));
    box.querySelector('#usLista').innerHTML = lista.map(({ p, s }) => cartao(p, s, edsDe(p.id), temaSel)).join('') || '<p class="muted">Nenhum usuário neste filtro.</p>';
    box.querySelectorAll('[data-f]').forEach((b) => b.classList.toggle('ativo', b.dataset.f === filtro));
    ligar();
  };

  box.innerHTML = `<div class="row"><h3 style="margin:0">Usuários (${ps.length})</h3><span class="sp"></span>
      ${amarelos.length ? `<a class="btn mini sec" href="${esc(`mailto:?bcc=${encodeURIComponent(amarelos.map((x) => x.p.email).join(','))}&subject=${encodeURIComponent('Seu acesso ao PROJETO R.I.S.K. está perto de vencer')}&body=${encodeURIComponent('Olá!\n\nPassando para avisar que o seu acesso ao PROJETO R.I.S.K. vence nos próximos dias. Para continuar estudando sem interrupção, renove pela aba "Cursos preparatórios" do site.\n\nBons estudos!\nPROJETO R.I.S.K.')}`)}">✉ Avisar os ${amarelos.length} perto de vencer</a>` : ''}</div>
    <div class="us-resumo"><span class="us-dot verde"></span>${conta('verde')} ativos <span class="us-dot amarelo"></span>${conta('amarelo')} perto de vencer (até ${AVISO_DIAS} dias) <span class="us-dot vermelho"></span>${conta('vermelho')} vencidos/bloqueados <span class="us-dot cinza"></span>${conta('cinza')} aguardando</div>
    <div class="row" style="gap:6px;flex-wrap:wrap;margin:10px 0">${FILTROS.map(([k, n]) => `<button class="btn mini sec us-filtro" data-f="${k}">${n}</button>`).join('')}
      <input type="search" id="usBusca" placeholder="Buscar por nome, e-mail, WhatsApp, cidade…" value="${esc(busca)}" style="flex:1;min-width:200px"></div>
    <div id="usLista" class="us-grade"></div>`;
  box.querySelectorAll('[data-f]').forEach((b) => (b.onclick = () => { filtro = b.dataset.f; desenha(); }));
  box.querySelector('#usBusca').oninput = (e) => { busca = e.target.value; desenha(); };

  const up = async (id, v, msg) => { try { await db.update('profiles', { id: 'eq.' + id }, v); if (msg) toast(msg); atual(); } catch (e) { toast(e.message, 'erro'); } };
  function ligar() {
    const achar = (id) => ps.find((x) => x.id === id);
    box.querySelectorAll('[data-conf]').forEach((b) => (b.onclick = () => conferir(achar(b.dataset.conf), atual)));
    box.querySelectorAll('[data-rc]').forEach((b) => (b.onclick = () => { if (confirm('Revogar o acesso deste usuário? Ele não vai conseguir entrar.')) up(b.dataset.rc, { status: 'recusado' }, 'Acesso revogado.'); }));
    box.querySelectorAll('[data-bl]').forEach((b) => (b.onclick = () => { const p = achar(b.dataset.bl); const mot = p.bloqueado ? null : prompt('Motivo do bloqueio (aparece só para você):', 'Bloqueado pelo administrador'); if (!p.bloqueado && mot === null) return; up(p.id, { bloqueado: !p.bloqueado, bloqueio_motivo: p.bloqueado ? null : mot || null }, p.bloqueado ? 'Desbloqueado.' : 'Bloqueado.'); }));
    box.querySelectorAll('[data-adm]').forEach((b) => (b.onclick = () => { const p = achar(b.dataset.adm); if (confirm(p.role === 'admin' ? 'Tirar o perfil de administrador deste usuário?' : 'Tornar este usuário administrador? Ele verá tudo, inclusive esta área.')) up(p.id, { role: p.role === 'admin' ? 'aluno' : 'admin', status: 'aprovado' }); }));
    box.querySelectorAll('[data-mais]').forEach((b) => (b.onclick = () => { const card = b.closest('.us-card'); const inp = card.querySelector('[data-ate]'); inp.value = somaDias(inp.value || null, Number(b.dataset.mais)); card.querySelector('[data-sem]').checked = false; card.querySelector('[data-salvar]').classList.add('pulsa'); }));
    box.querySelectorAll('[data-ate]').forEach((i) => (i.oninput = () => { const card = i.closest('.us-card'); card.querySelector('[data-sem]').checked = false; card.querySelector('[data-salvar]').classList.add('pulsa'); }));
    box.querySelectorAll('[data-sem]').forEach((c) => (c.onchange = () => c.closest('.us-card').querySelector('[data-salvar]').classList.add('pulsa')));
    box.querySelectorAll('[data-salvar]').forEach((b) => (b.onclick = () => {
      const card = b.closest('.us-card'); const sem = card.querySelector('[data-sem]').checked; const ate = card.querySelector('[data-ate]').value;
      if (!sem && !ate) return toast('Escolha a data ou marque "sem vencimento".', 'erro');
      const obs = card.querySelector('[data-obs]')?.value ?? undefined;
      const v = { acesso_ate: sem ? null : ate }; if (obs !== undefined) v.obs_admin = obs.trim() || null;
      // Renovar um aluno vencido também tira o bloqueio automático de compra, se houver
      up(b.dataset.salvar, v, sem ? 'Acesso sem vencimento salvo.' : `Acesso liberado até ${fmtData(ate)}.`);
    }));
    box.querySelectorAll('[data-tema]').forEach((s) => (s.onchange = async () => {
      try { await db.update('editais', { id: 'eq.' + s.dataset.tema }, { tema: s.value || null }); toast('Tema atualizado.'); const e = S.editais.find((x) => x.id === s.dataset.tema); if (e) e.tema = s.value || null; } catch (e) { toast(e.message, 'erro'); }
    }));
    box.querySelectorAll('[data-datas]').forEach((b) => (b.onclick = () => ajustarDatas(eds.find((x) => x.id === b.dataset.datas), () => atual())));
  }
  desenha();
}

function cartao(p, s, eds, temaSel) {
  const eu = p.id === S.user.id, adm = p.role === 'admin';
  const aviso = tipoAviso(p), msg = mensagem(p, aviso);
  const wa = linkWhats(p.telefone, msg.texto);
  return `<article class="us-card us-${s.cor}">
    <header class="us-cab"><div style="flex:1;min-width:0"><b class="us-nome">${esc(p.nome || p.email || '(sem nome)')}</b>${eu ? ' <span class="muted" style="font-size:12px">(você)</span>' : ''}
      <div class="us-sit"><span class="us-badge">${esc(s.rotulo)}</span>${s.detalhe ? `<span class="muted">${esc(s.detalhe)}</span>` : ''}</div></div></header>
    <div class="us-contato">
      ${p.email ? `<a href="${esc(linkEmail(p.email, msg))}" title="Escrever e-mail">✉ ${esc(p.email)}</a>` : '<span class="muted">sem e-mail</span>'}
      ${p.telefone ? `<a href="${esc(wa)}" target="_blank" rel="noopener" title="Abrir WhatsApp com a mensagem pronta">🟢 WhatsApp ${esc(p.telefone)}</a>` : '<span class="muted">WhatsApp não informado</span>'}
      ${p.cidade || p.cpf ? `<span class="muted">${esc(p.cidade || '')}${p.cpf ? `${p.cidade ? ' · ' : ''}CPF ${esc(fmtCpf(p.cpf))}` : ''}</span>` : ''}
      <span class="muted" style="font-size:12px">Cadastro em ${p.created_at ? new Date(p.created_at).toLocaleDateString('pt-BR') : '—'}</span>
    </div>
    ${adm ? '' : `<div class="us-bloco"><div class="muted us-rot">Curso</div><div>${esc(cursoInfo(p.curso)?.nome || (p.status === 'pendente' ? 'pediu: ' + (cursoInfo(p.curso_solicitado)?.curto || '—') : 'sem curso (vê só o edital dele)'))}</div>
      <div class="muted" style="font-size:12px">${esc(bancaInfo(p.banca)?.nome || 'banca não definida')}${p.materias_removidas?.length ? ` · ${p.materias_removidas.length} matéria(s) removida(s)` : ''}</div></div>
    <div class="us-bloco"><div class="muted us-rot">Acesso até</div>
      <div class="row" style="gap:6px;flex-wrap:wrap"><input type="date" data-ate value="${esc(p.acesso_ate || '')}"><label class="check" style="margin:0;font-size:13px"><input type="checkbox" data-sem ${p.acesso_ate ? '' : 'checked'}> sem vencimento</label></div>
      <div class="row" style="gap:4px;flex-wrap:wrap;margin-top:6px">${PRAZOS.map(([n, r]) => `<button class="btn mini sec" data-mais="${n}">${r}</button>`).join('')}<button class="btn mini" data-salvar="${p.id}">Salvar prazo</button></div>
      <textarea data-obs rows="2" placeholder="Anotações (só você vê): forma de pagamento, combinados…" style="width:100%;margin-top:8px;font-size:13px">${esc(p.obs_admin || '')}</textarea></div>`}
    ${eds.length ? `<details class="us-bloco"><summary class="muted">Calendário (${eds.length} edital${eds.length > 1 ? 'is' : ''})</summary>${eds.map((e) => `<div style="margin:4px 0"><span class="muted" style="font-size:12px">${esc(e.concurso)}</span><br>${temaSel(e)} <button class="linkbtn" data-datas="${e.id}" style="font-size:12px">📅 datas</button></div>`).join('')}${p.tema_padrao ? '<div class="muted" style="font-size:11.5px">aluno usa o tema padrão</div>' : ''}</details>` : ''}
    ${eu ? '' : `<footer class="us-acoes">
      ${p.status !== 'aprovado' ? `<button class="btn mini verde" data-conf="${p.id}">Conferir e aprovar</button>` : `<button class="btn mini sec" data-conf="${p.id}">🎓 Curso e matérias</button>`}
      ${p.email && !adm ? `<a class="btn mini sec" href="${esc(linkEmail(p.email, msg))}">✉ ${aviso === 'vencido' ? 'Avisar: venceu' : aviso === 'vencendo' ? 'Avisar: vai vencer' : 'E-mail'}</a>` : ''}
      <button class="btn mini sec" data-bl="${p.id}">${p.bloqueado ? 'Desbloquear' : 'Bloquear'}</button>
      ${p.status === 'aprovado' && !adm ? `<button class="btn mini sec" data-rc="${p.id}">Revogar</button>` : ''}
      <button class="btn mini sec" data-adm="${p.id}">${adm ? 'Tirar admin' : 'Tornar admin'}</button></footer>`}
  </article>`;
}

export const hojeIso = () => iso(hoje());
