// Supabase Edge Function: recebe os avisos (webhook 2.0) da Hotmart e grava em "compras".
// O banco libera ou bloqueia o acesso sozinho (atualização 16).
// Segredo (Supabase > Edge Functions > Secrets): HOTMART_HOTTOK  = o "Hottok" que aparece na Hotmart (Ferramentas > Webhook).
// IMPORTANTE: ao criar a função, DESLIGUE "Verify JWT" (a Hotmart não envia login do Supabase).
const URL_ = Deno.env.get('SUPABASE_URL')!;
const SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const HOTTOK = Deno.env.get('HOTMART_HOTTOK') || '';

const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { 'Content-Type': 'application/json' } });

// Comparação em tempo constante (não revela o token por tempo de resposta)
function igual(a: string, b: string) {
  if (!a || !b || a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

const STATUS: Record<string, string> = {
  PURCHASE_APPROVED: 'aprovada', PURCHASE_COMPLETE: 'aprovada',
  PURCHASE_REFUNDED: 'reembolsada', PURCHASE_CHARGEBACK: 'chargeback', PURCHASE_PROTEST: 'chargeback',
  PURCHASE_CANCELED: 'cancelada', PURCHASE_EXPIRED: 'cancelada',
  PURCHASE_BILLET_PRINTED: 'pendente', PURCHASE_DELAYED: 'pendente', PURCHASE_OUT_OF_SHOPPING_CART: 'pendente',
};

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ ok: true, info: 'Webhook da Hotmart do Projeto R.I.S.K.' });
  let body: any;
  try { body = await req.json(); } catch { return json({ message: 'JSON inválido' }, 400); }
  const tok = req.headers.get('x-hotmart-hottok') || body?.hottok || '';
  if (!HOTTOK) return json({ message: 'HOTMART_HOTTOK não configurado no Supabase.' }, 503);
  if (!igual(String(tok), HOTTOK)) return json({ message: 'Token inválido' }, 401);

  const ev = String(body?.event || '');
  const d = body?.data || {};
  const transacao = d?.purchase?.transaction;
  if (!transacao) return json({ ok: true, ignorado: 'evento sem transação', evento: ev });
  const status = STATUS[ev] || 'outro';

  // Não rebaixa uma compra já aprovada por um aviso atrasado (ex.: "boleto impresso" chegando depois)
  const ant = await fetch(`${URL_}/rest/v1/compras?transacao=eq.${encodeURIComponent(transacao)}&select=status`, { headers: { apikey: SERVICE, Authorization: `Bearer ${SERVICE}` } }).then((r) => r.json()).catch(() => []);
  const atual = ant?.[0]?.status;
  if (atual && ['aprovada', 'reembolsada', 'chargeback', 'cancelada'].includes(atual) && ['pendente', 'outro'].includes(status)) return json({ ok: true, mantido: atual });
  if (atual && ['reembolsada', 'chargeback'].includes(atual) && status === 'aprovada') return json({ ok: true, mantido: atual });

  const tel = [d?.buyer?.checkout_phone_code, d?.buyer?.checkout_phone].filter(Boolean).join(' ') || d?.buyer?.phone || null;
  const linha = {
    transacao, evento: ev, status,
    email: String(d?.buyer?.email || '').trim().toLowerCase() || null,
    nome: d?.buyer?.name || null, telefone: tel,
    produto_id: d?.product?.id != null ? String(d.product.id) : null,
    produto_nome: d?.product?.name || null,
    valor: d?.purchase?.price?.value ?? d?.purchase?.full_price?.value ?? null,
  };
  const r = await fetch(`${URL_}/rest/v1/compras?on_conflict=transacao`, {
    method: 'POST',
    headers: { apikey: SERVICE, Authorization: `Bearer ${SERVICE}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify([linha]),
  });
  if (!r.ok) return json({ message: 'Erro ao gravar', detalhe: await r.text() }, 500);
  return json({ ok: true, status });
});
