// Pasta "Compras Hotmart": o que a Hotmart avisou, se o acesso foi liberado e para quem.
import { db, MODO_DEMO } from '../backend.js';
import { SUPABASE_URL } from '../config.js';
import { esc, norm } from '../util.js';
import { toast } from '../ui.js';
import { cursoInfo } from '../cursos.js';

const ST = { aprovada: ['Aprovada', 'verde'], reembolsada: ['Reembolsada', 'vermelho'], chargeback: ['Chargeback', 'vermelho'], cancelada: ['Cancelada', 'vermelho'], pendente: ['Aguardando pagamento', 'amarelo'], outro: ['Outro aviso', 'cinza'] };
const dt = (s) => (s ? new Date(s).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—');

export async function compras(box) {
  let lista = [];
  try { lista = await db.select('compras', { order: 'recebido_em.desc', limit: 300 }); }
  catch (e) { box.innerHTML = `<h3>Compras Hotmart</h3><p class="bad">Não foi possível carregar: ${esc(e.message)}. Rode a atualização 16 no Supabase.</p>`; return; }
  const semConta = lista.filter((c) => c.status === 'aprovada' && !c.aplicado_em);
  const url = MODO_DEMO ? 'https://SEU-PROJETO.supabase.co/functions/v1/hotmart-webhook' : `${SUPABASE_URL}/functions/v1/hotmart-webhook`;
  let busca = '';
  const desenha = () => {
    const t = norm(busca);
    const vis = lista.filter((c) => !t || norm([c.nome, c.email, c.transacao, c.produto_nome].join(' ')).includes(t));
    box.querySelector('#cpLista').innerHTML = vis.length ? `<div style="overflow-x:auto"><table class="tab"><tr><th>Recebida</th><th>Comprador</th><th>Produto</th><th>Situação</th><th>Acesso</th><th></th></tr>
      ${vis.map((c) => { const [r, cor] = ST[c.status] || ST.outro; return `<tr>
        <td style="white-space:nowrap">${dt(c.recebido_em)}<br><span class="muted" style="font-size:11.5px">${esc(c.transacao)}</span></td>
        <td><b>${esc(c.nome || '')}</b><br><span class="muted" style="font-size:12.5px">${esc(c.email || '')}${c.telefone ? ' · ' + esc(c.telefone) : ''}</span></td>
        <td>${esc(c.produto_nome || c.produto_id || '')}${c.curso ? `<br><span class="muted" style="font-size:12px">libera ${esc(cursoInfo(c.curso)?.curto || c.curso)} · ${c.duracao_dias || 365} dias</span>` : '<br><span class="bad" style="font-size:12px">produto não ligado a um curso</span>'}</td>
        <td><span class="pill cp-${cor}">${r}</span>${c.valor != null ? `<br><span class="muted" style="font-size:12px">R$ ${Number(c.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>` : ''}</td>
        <td>${c.bloqueado_em ? `<span class="bad">bloqueado ${dt(c.bloqueado_em)}</span>` : c.aplicado_em ? `<span class="ok">liberado ${dt(c.aplicado_em)}</span>` : c.status === 'aprovada' ? '<span class="cp-espera">aguardando a pessoa criar a conta com este e-mail</span>' : '—'}</td>
        <td style="white-space:nowrap">${c.status === 'aprovada' && !c.aplicado_em ? `<button class="btn mini sec" data-mail="${c.id}">Corrigir e-mail</button> <button class="btn mini" data-rep="${c.id}">Tentar liberar</button>` : ''}</td></tr>`; }).join('')}</table></div>` : '<p class="muted">Nenhuma compra recebida ainda.</p>';
    box.querySelectorAll('[data-rep]').forEach((b) => (b.onclick = () => tentar(b.dataset.rep)));
    box.querySelectorAll('[data-mail]').forEach((b) => (b.onclick = async () => {
      const c = lista.find((x) => x.id === b.dataset.mail);
      const novo = prompt('E-mail da CONTA do aluno no site (o que ele usa para entrar):', c.email || '');
      if (!novo || !/^\S+@\S+\.\S+$/.test(novo.trim())) return;
      try { await db.update('compras', { id: 'eq.' + c.id }, { email: novo.trim().toLowerCase() }); toast('E-mail corrigido. Se a conta existir e estiver confirmada, o acesso foi liberado.'); compras(box); } catch (e) { toast(e.message, 'erro'); }
    }));
  };
  const tentar = async (id) => {
    try { const ok = await db.rpc('reprocessar_compra', { cid: id }); toast(ok ? 'Acesso liberado!' : 'Ainda não há conta confirmada com este e-mail.'); compras(box); } catch (e) { toast(e.message, 'erro'); }
  };
  box.innerHTML = `<div class="row"><h3 style="margin:0">Compras Hotmart (${lista.length})</h3><span class="sp"></span><input type="search" id="cpBusca" placeholder="Buscar nome, e-mail, transação" style="min-width:220px"></div>
    ${semConta.length ? `<p class="cp-alerta">🟡 ${semConta.length} compra(s) aprovada(s) ainda sem conta com o mesmo e-mail. Quando a pessoa criar a conta (e confirmar o e-mail), o acesso é liberado sozinho. Se ela usou outro e-mail, clique em “Corrigir e-mail”.</p>` : ''}
    <details class="cp-config"><summary><b>⚙ Como ligar a Hotmart ao site</b> (fazer uma vez)</summary>
      <ol>
        <li>No Supabase, crie a função <b>hotmart-webhook</b> (Edge Functions) com o código que enviei e <b>desligue “Verify JWT”</b>.</li>
        <li>Na Hotmart: <b>Ferramentas → Webhook (API e notificações) → Cadastrar webhook</b>. Versão <b>2.0.0</b>. URL:<br><code class="cp-url">${esc(url)}</code> <button class="btn mini sec" id="cpCopia">Copiar</button></li>
        <li>Marque os eventos: <b>Compra aprovada, Compra completa, Compra reembolsada, Chargeback, Compra cancelada</b> (e, se quiser, Boleto impresso e Compra atrasada).</li>
        <li>Copie o <b>Hottok</b> que a Hotmart mostra e cole no Supabase em <b>Edge Functions → Secrets</b> com o nome <b>HOTMART_HOTTOK</b>. (Não mande esse código para ninguém.)</li>
        <li>Em cada curso da vitrine, preencha o <b>ID do produto na Hotmart</b> e o <b>curso liberado</b>.</li>
        <li>Use o botão “Enviar teste” da Hotmart: a compra de teste aparece nesta lista.</li>
      </ol></details>
    <div id="cpLista" style="margin-top:10px"></div>`;
  box.querySelector('#cpBusca').oninput = (e) => { busca = e.target.value; desenha(); };
  box.querySelector('#cpCopia').onclick = () => { navigator.clipboard?.writeText(url).then(() => toast('Endereço copiado.')).catch(() => toast('Copie o endereço manualmente.', 'erro')); };
  desenha();
}
