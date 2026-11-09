// Supabase Edge Function: gera um resumo técnico do tópico com o Claude (API da Anthropic) e guarda em "resumos".
// Segredos (Supabase > Edge Functions > Secrets): ANTHROPIC_API_KEY  (opcional: ANTHROPIC_MODEL, LIMITE_RESUMOS)
const URL_ = Deno.env.get('SUPABASE_URL')!;
const SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ANTHROPIC = Deno.env.get('ANTHROPIC_API_KEY');
const MODELO = Deno.env.get('ANTHROPIC_MODEL') || 'claude-sonnet-4-5';
const LIMITE = Number(Deno.env.get('LIMITE_RESUMOS') || 5);

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
const rest = (path: string, init: RequestInit = {}) => fetch(`${URL_}/rest/v1/${path}`, { ...init, headers: { apikey: SERVICE, Authorization: `Bearer ${SERVICE}`, 'Content-Type': 'application/json', Prefer: 'return=representation', ...(init.headers || {}) } }).then(async (r) => { const t = await r.text(); if (!r.ok) throw new Error(t); return t ? JSON.parse(t) : null; });

// Só as tags que o site exibe
const limpa = (h: string) => h.replace(/<(script|style|iframe)[\s\S]*?<\/\1>/gi, '').replace(/<(?!\/?(h2|h3|h4|p|ul|ol|li|strong|b|em|i|u|table|thead|tbody|tr|th|td|blockquote|br|hr)\b)[^>]*>/gi, '').replace(/\son\w+="[^"]*"/gi, '');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  try {
    if (!ANTHROPIC) return json({ message: 'A geração de resumos ainda não foi configurada (falta a chave da Anthropic no Supabase).' }, 503);
    const jwt = (req.headers.get('Authorization') || '').replace('Bearer ', '');
    const u = await fetch(`${URL_}/auth/v1/user`, { headers: { apikey: SERVICE, Authorization: `Bearer ${jwt}` } });
    if (!u.ok) return json({ message: 'Faça login novamente.' }, 401);
    const user = await u.json();
    const { topico_id } = await req.json();
    const [tp] = await rest(`topicos?id=eq.${topico_id}&user_id=eq.${user.id}&select=*`);
    if (!tp) return json({ message: 'Tópico não encontrado.' }, 404);
    const [ed] = await rest(`editais?id=eq.${tp.edital_id}&select=*`);
    const [perfil] = await rest(`profiles?id=eq.${user.id}&select=role`);
    const desde = new Date(); desde.setHours(0, 0, 0, 0);
    const hojeFeitos = await rest(`resumos?user_id=eq.${user.id}&created_at=gte.${desde.toISOString()}&select=id`);
    if (perfil?.role !== 'admin' && hojeFeitos.length >= LIMITE) return json({ message: `Você já gerou ${LIMITE} resumos hoje. Amanhã libera de novo.` }, 429);

    const prompt = `Você é professor especialista em concursos públicos no Brasil. Escreva um RESUMO TÉCNICO e DIRECIONADO para estudo, em português do Brasil.
Concurso: ${ed?.concurso || ''} · Cargo: ${ed?.cargo || ''} · Banca: ${ed?.banca || 'Cebraspe'}
Matéria: ${tp.materia}
Tópico do edital: ${tp.topico}
Data de hoje: ${new Date().toISOString().slice(0, 10)} (use a legislação vigente).

Estrutura obrigatória (use exatamente estes títulos em <h2>):
1. Visão geral — o que é cobrado deste tópico e por que importa para o cargo.
2. Base legal — dispositivos essenciais (lei, artigo, parágrafo), com a letra da lei resumida quando for decisiva.
3. Conceitos e regras-chave — definições, requisitos, prazos, exceções; use listas.
4. Quadro comparativo — uma <table> comparando institutos/conceitos que a banca costuma confundir.
5. Como a banca cobra — padrões e pegadinhas típicas da ${ed?.banca || 'banca'} neste tema.
6. Jurisprudência e entendimentos — apenas súmulas/teses que você tenha certeza; se não houver, diga que o tema é cobrado pela letra da lei.
7. Checklist de revisão — 8 a 12 itens curtos.
8. Fixação — 6 afirmações no estilo ${ed?.formato === 'multipla_escolha' ? 'de alternativas' : 'Certo/Errado'}, cada uma seguida do gabarito e de uma justificativa de uma linha.

Regras: linguagem técnica, objetiva e precisa; nada de enrolação; entre 1.500 e 2.500 palavras; não invente artigos, números de lei, súmulas ou julgados — na dúvida, omita; destaque termos importantes com <strong>.
Responda SOMENTE com HTML usando as tags h2, h3, p, ul, ol, li, strong, em, table, thead, tbody, tr, th, td, blockquote. Sem <html>, <head>, <body>, estilos ou markdown.`;

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': ANTHROPIC, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: MODELO, max_tokens: 8000, messages: [{ role: 'user', content: prompt }] }),
    });
    if (r.status === 402 || r.status === 429) return json({ message: 'Os créditos da IA acabaram ou o limite foi atingido. Tente mais tarde.' }, 402);
    if (!r.ok) throw new Error('IA: ' + (await r.text()).slice(0, 300));
    const out = await r.json();
    let html = (out.content || []).map((c: any) => c.text || '').join('').trim().replace(/^```html?\s*/i, '').replace(/```\s*$/, '');
    html = limpa(html);
    if (html.length < 800) return json({ message: 'O resumo veio incompleto. Tente de novo.' }, 502);
    const [salvo] = await rest('resumos', { method: 'POST', body: JSON.stringify([{ user_id: user.id, topico_id: tp.id, edital_id: tp.edital_id, materia: tp.materia, topico: tp.topico, concurso: ed?.concurso || null, conteudo: html, modelo: MODELO }]) });
    return json({ resumo: salvo });
  } catch (e) {
    return json({ message: 'Erro ao gerar o resumo: ' + String((e as Error).message).slice(0, 300) }, 500);
  }
});
