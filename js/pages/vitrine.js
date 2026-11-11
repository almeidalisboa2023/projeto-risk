// Cursos preparatórios: vitrine aberta a qualquer pessoa (mesmo sem conta). O administrador cadastra os cursos.
import { S } from '../state.js';
import { db } from '../backend.js';
import { esc } from '../util.js';
import { modal, loading } from '../ui.js';

export const CHAVE_COMPRA = 'risk-comprar';

// Leva o e-mail e o nome da conta para o checkout da Hotmart (assim a compra cai no mesmo e-mail da conta)
export function linkCheckout(link, email, nome) {
  try {
    const u = new URL(link);
    if (/hotmart/i.test(u.hostname)) {
      if (email) u.searchParams.set('email', email);
      if (nome) u.searchParams.set('name', nome);
    }
    return u.toString();
  } catch { return link; }
}

export async function carregarVitrine() {
  try { return await db.select('cursos_venda', { publicado: 'eq.true', order: 'ordem.asc,created_at.desc' }); } catch { return []; }
}

const lista = (txt) => String(txt || '').split(/\n|;/).map((x) => x.replace(/^[-•\s]+/, '').trim()).filter(Boolean);
const capa = (c, alt = '') => c.foto_url
  ? `<div class="vt-capa" style="background-image:url('${esc(c.foto_url)}')" role="img" aria-label="${esc(alt || c.orgao || c.titulo)}"></div>`
  : `<div class="vt-capa vt-capa-vazia"><span>${esc((c.orgao || c.titulo || '?').slice(0, 1))}</span></div>`;
const chips = (c) => [
  c.situacao && `<span class="vt-chip vt-chip-forte">${esc(c.situacao)}</span>`,
  c.vagas && `<span class="vt-chip">👥 ${esc(c.vagas)} vagas</span>`,
  c.salario && `<span class="vt-chip">💰 ${esc(c.salario)}</span>`,
  c.banca && `<span class="vt-chip">🏛 ${esc(c.banca)}</span>`,
  c.escolaridade && `<span class="vt-chip">🎓 ${esc(c.escolaridade)}</span>`,
  c.data_prova && `<span class="vt-chip">📅 Prova: ${esc(c.data_prova)}</span>`,
].filter(Boolean).join('');

export async function render(el, q, { publico = false, aoEntrar } = {}) {
  el.innerHTML = loading();
  const cursos = await carregarVitrine();
  const id = q?.get?.('c');
  const c = id && cursos.find((x) => x.id === id);
  if (c) return detalhe(el, c, { publico, aoEntrar });
  el.innerHTML = `<div class="mono up">Cursos preparatórios</div><h1>Prepare-se com o PROJETO R.I.S.K.</h1>
    <p class="muted" style="margin-top:-6px">Organizador de estudos com calendário, conteúdo programático completo, questões comentadas e flashcards, no padrão da banca do seu concurso.</p>
    ${cursos.length ? `<div class="vt-grade">${cursos.map((c) => `<article class="vt-card">
      <a href="#/cursos?c=${c.id}" class="vt-link">${capa(c)}</a>
      <div class="vt-corpo">
        ${c.orgao ? `<div class="mono up vt-orgao">${esc(c.orgao)}</div>` : ''}
        <h3><a href="#/cursos?c=${c.id}">${esc(c.titulo)}</a></h3>
        ${c.cargo ? `<div class="muted" style="font-size:14px">${esc(c.cargo)}</div>` : ''}
        <div class="vt-chips">${chips(c)}</div>
        <div class="vt-rodape">${c.preco ? `<div class="vt-preco">${esc(c.preco)}</div>` : '<span></span>'}
          <div class="row" style="gap:6px"><a class="btn sec mini" href="#/cursos?c=${c.id}">Ver detalhes</a>${c.link_compra ? `<button class="btn mini" data-comprar="${c.id}">Comprar</button>` : ''}</div></div>
      </div></article>`).join('')}</div>`
      : '<div class="card"><b>Nenhum curso disponível no momento.</b><p class="muted">Novas turmas são abertas conforme os editais. Volte em breve.</p></div>'}`;
  el.querySelectorAll('[data-comprar]').forEach((b) => (b.onclick = () => comprar(cursos.find((x) => x.id === b.dataset.comprar), { publico, aoEntrar })));
}

function detalhe(el, c, ctx) {
  const mats = lista(c.materias);
  el.innerHTML = `<div class="row"><a class="btn sec mini" href="#/cursos">‹ Todos os cursos</a></div>
    <div class="vt-hero">${capa(c)}<div class="vt-hero-txt">${c.orgao ? `<div class="mono up">${esc(c.orgao)}</div>` : ''}<h1>${esc(c.titulo)}</h1>${c.cargo ? `<div>${esc(c.cargo)}</div>` : ''}</div></div>
    <div class="vt-det">
      <div class="card">
        <div class="vt-chips" style="margin-top:0">${chips(c)}</div>
        ${c.descricao ? `<div class="vt-desc">${esc(c.descricao).replace(/\n/g, '<br>')}</div>` : ''}
        ${mats.length ? `<h3 style="margin-top:18px">Matérias</h3><ul class="vt-mats">${mats.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>` : ''}
      </div>
      <aside class="card vt-compra">
        ${c.preco ? `<div class="muted" style="font-size:13px">Investimento</div><div class="vt-preco vt-preco-g">${esc(c.preco)}</div>` : ''}
        ${c.duracao_dias ? `<div class="muted" style="font-size:13px;margin:6px 0 12px">Acesso por ${c.duracao_dias % 30 === 0 && c.duracao_dias >= 30 ? `${c.duracao_dias / 30} ${c.duracao_dias === 30 ? 'mês' : 'meses'}` : `${c.duracao_dias} dias`}</div>` : ''}
        ${c.link_compra ? '<button class="btn" id="vtComprar" style="width:100%">Comprar agora</button>' : '<p class="muted">Vendas em breve.</p>'}
        <ul class="vt-inclui"><li>Calendário de estudos montado para o edital</li><li>Conteúdo programático com quadros e pegadinhas</li><li>Questões comentadas e flashcards</li><li>Liberação automática após o pagamento</li></ul>
      </aside>
    </div>`;
  const b = el.querySelector('#vtComprar'); if (b) b.onclick = () => comprar(c, ctx);
}

// Comprar: sem conta → pede para criar a conta primeiro (o e-mail da conta vai para o checkout); com conta → vai direto.
export function comprar(c, { publico, aoEntrar } = {}) {
  if (!c?.link_compra) return;
  if (!S.user || publico) {
    try { localStorage.setItem(CHAVE_COMPRA, c.id); } catch {}
    modal(`<h3>Antes do pagamento, crie a sua conta</h3>
      <p>Assim o sistema reconhece o seu pagamento e libera o acesso <b>automaticamente</b>.</p>
      <ol class="vt-passos"><li>Crie a conta (ou entre, se já tiver).</li><li>Você será levado ao pagamento na Hotmart com o <b>mesmo e-mail</b>.</li><li>Pagou, liberou: Pix e cartão em minutos; boleto em até 3 dias úteis.</li></ol>
      <div class="row" style="margin-top:12px"><span class="sp"></span><button class="btn sec" id="vtEntrar">Já tenho conta</button><button class="btn" id="vtCriar">Criar conta</button></div>`, {
      onMount: (m, close) => {
        m.querySelector('#vtCriar').onclick = () => { close(); aoEntrar ? aoEntrar('criar') : (location.hash = ''); };
        m.querySelector('#vtEntrar').onclick = () => { close(); aoEntrar ? aoEntrar('entrar') : (location.hash = ''); };
      },
    });
    return;
  }
  irParaPagamento(c);
}

export function irParaPagamento(c) {
  const email = S.user?.email || S.profile?.email || '';
  modal(`<h3>Ir para o pagamento</h3>
    <p>O pagamento é feito na <b>Hotmart</b>. Use o e-mail <b>${esc(email)}</b> na compra: é por ele que o sistema libera o seu acesso sozinho.</p>
    <p class="muted" style="font-size:13px">Se usar outro e-mail, a liberação não acontece automaticamente e o administrador precisará conferir.</p>
    <div class="row" style="margin-top:12px"><span class="sp"></span><button class="btn sec" id="vtNao">Agora não</button><a class="btn" id="vtIr" href="${esc(linkCheckout(c.link_compra, email, S.profile?.nome))}" target="_blank" rel="noopener">Ir para a Hotmart</a></div>`, {
    onMount: (m, close) => { m.querySelector('#vtNao').onclick = close; m.querySelector('#vtIr').onclick = () => setTimeout(close, 300); },
  });
}

// Depois do login: se a pessoa tinha clicado em "Comprar", retoma a compra
export async function retomarCompra() {
  let id = null; try { id = localStorage.getItem(CHAVE_COMPRA); localStorage.removeItem(CHAVE_COMPRA); } catch {}
  if (!id) return false;
  const c = (await carregarVitrine()).find((x) => x.id === id);
  if (c?.link_compra) { irParaPagamento(c); return true; }
  return false;
}
