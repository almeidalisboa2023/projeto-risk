// Resumos técnicos gerados pelo Claude: lista, visualização em "folha A4" e download em PDF (impressão do navegador).
import { S } from '../state.js';
import { db, functions } from '../backend.js';
import { esc } from '../util.js';
import { sanitize, toast, modal, loading } from '../ui.js';
import { fmtCPF } from './perfil.js';

const dataBR = (s) => new Date(s).toLocaleDateString('pt-BR');

// Chamado pelo botão "Gerar resumo do conteúdo" nos blocos do calendário (e no Edital)
export async function gerarResumo(tp, botao) {
  let ja = [];
  try { ja = await db.select('resumos', { user_id: 'eq.' + S.user.id, topico_id: 'eq.' + tp.id, select: 'id,created_at', order: 'created_at.desc' }); }
  catch { return toast('Rode a atualização do banco (atualizacao-04.sql) no Supabase para usar os resumos.', 'erro'); }
  const gerar = async () => {
    const txt = botao?.textContent;
    if (botao) { botao.disabled = true; botao.textContent = 'Gerando resumo… (até 1 minuto)'; }
    const fecha = modal(`<h3>Gerando seu resumo</h3>${loading('O Claude está escrevendo um resumo técnico de ' + tp.materia + '. Isso leva até 1 minuto.')}`);
    try {
      const r = await functions.invoke('gerar-resumo', { topico_id: tp.id });
      fecha(); location.hash = '#/resumo?id=' + r.resumo.id;
    } catch (e) { fecha(); toast(e.message || 'Não foi possível gerar agora.', 'erro'); }
    finally { if (botao) { botao.disabled = false; botao.textContent = txt; } }
  };
  if (ja.length) {
    modal(`<h3>Resumo deste assunto</h3><p>Você já tem um resumo de <b>${esc(tp.topico.slice(0, 90))}</b>, gerado em ${dataBR(ja[0].created_at)}.</p>
      <div class="row"><a class="btn" href="#/resumo?id=${ja[0].id}" id="rAbrir">Abrir resumo</a><button class="btn sec" id="rNovo">Gerar nova versão</button></div>`, {
      onMount: (m, close) => { m.querySelector('#rAbrir').onclick = () => close(); m.querySelector('#rNovo').onclick = () => { close(); gerar(); }; },
    });
  } else await gerar();
}

export async function render(el, query) {
  const id = query.get('id');
  if (id) return ver(el, id);
  el.innerHTML = `<div class="mono up">Material de estudo</div><h1>Meus resumos</h1>
    <p class="muted">Gere um resumo em qualquer bloco do Calendário com o botão <b>📄 Gerar resumo do conteúdo</b>.</p><div id="lr">${loading()}</div>`;
  let rs = [];
  try { rs = await db.select('resumos', { user_id: 'eq.' + S.user.id, select: 'id,materia,topico,concurso,created_at', order: 'created_at.desc', limit: 300 }); }
  catch { el.querySelector('#lr').innerHTML = '<div class="card"><p class="muted">Para usar os resumos, rode a atualização do banco (atualizacao-04.sql) no Supabase.</p></div>'; return; }
  el.querySelector('#lr').innerHTML = rs.length ? `<div class="card"><table class="tab"><tr><th>Matéria</th><th>Assunto</th><th>Gerado em</th><th></th></tr>
    ${rs.map((r) => `<tr><td><b>${esc(r.materia)}</b></td><td>${esc(r.topico.slice(0, 110))}</td><td>${dataBR(r.created_at)}</td><td><a class="btn sec mini" href="#/resumo?id=${r.id}">Abrir</a></td></tr>`).join('')}</table></div>`
    : '<div class="card"><p class="muted">Nenhum resumo ainda.</p></div>';
}

async function ver(el, id) {
  el.innerHTML = loading();
  const [r] = await db.select('resumos', { id: 'eq.' + id });
  if (!r) { el.innerHTML = '<div class="card"><h3>Resumo não encontrado</h3><a class="btn sec" href="#/resumo">Ver meus resumos</a></div>'; return; }
  const p = S.profile, ed = S.editais.find((e) => e.id === r.edital_id) || S.edital;
  const cpf = p.cpf ? fmtCPF(p.cpf) : '';
  const nome = p.nome || S.user.email;
  el.innerHTML = `
    <div class="row no-print" style="margin-bottom:12px"><a class="btn sec mini" href="#/resumo">← Meus resumos</a><span class="sp"></span>
      <a class="btn sec mini" href="${esc(location.href)}" target="_blank" rel="noopener">Abrir em nova aba ↗</a>
      <button class="btn mini" id="baixar">⬇ Baixar PDF</button></div>
    ${cpf ? '' : '<div class="card no-print" style="margin-bottom:12px;border-color:var(--ouro2)">Seu CPF ainda não está cadastrado; ele aparece no cabeçalho do PDF. <a href="#/perfil">Cadastrar no Perfil →</a></div>'}
    <article class="doc">
      <header class="doc-cab">
        <img src="img/logo-claro.webp" alt="PROJETO R.I.S.K." class="doc-logo">
        <div class="doc-dados">
          <div class="doc-tit">Resumo técnico</div>
          <div><b>Aluno:</b> ${esc(nome)}</div>
          ${cpf ? `<div><b>CPF:</b> ${esc(cpf)}</div>` : ''}
          <div><b>Concurso:</b> ${esc([ed?.concurso || r.concurso, ed?.cargo, ed?.banca].filter(Boolean).join(' · '))}</div>
          <div><b>Gerado em:</b> ${dataBR(r.created_at)}</div>
        </div>
      </header>
      <div class="doc-assunto"><div class="doc-mat">${esc(r.materia)}</div><h1>${esc(r.topico)}</h1></div>
      <div class="doc-corpo">${sanitize(r.conteudo)}</div>
      <footer class="doc-rod">Material de uso pessoal e intransferível de ${esc(nome)}${cpf ? ' · CPF ' + esc(cpf) : ''} · PROJETO R.I.S.K. · Conteúdo gerado por IA: confira sempre na lei seca.</footer>
    </article>`;
  el.querySelector('#baixar').onclick = () => {
    const t = document.title;
    document.title = `Resumo - ${r.materia} - ${nome}`.replace(/[\\/:*?"<>|]/g, '');
    toast('Na janela que abrir, escolha "Salvar como PDF".');
    setTimeout(() => { window.print(); document.title = t; }, 300);
  };
}
