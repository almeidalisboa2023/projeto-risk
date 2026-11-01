// Supabase Edge Function: gera 10 questões inéditas com o Claude (API da Anthropic).
// Segredos necessários (Supabase > Edge Functions > Secrets): ANTHROPIC_API_KEY  (opcional: ANTHROPIC_MODEL, LIMITE_DIARIO)
const URL_ = Deno.env.get('SUPABASE_URL')!;
const SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ANTHROPIC = Deno.env.get('ANTHROPIC_API_KEY');
const MODELO = Deno.env.get('ANTHROPIC_MODEL') || 'claude-sonnet-4-5';
const LIMITE = Number(Deno.env.get('LIMITE_DIARIO') || 5);

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
const rest = (path: string, init: RequestInit = {}) => fetch(`${URL_}/rest/v1/${path}`, { ...init, headers: { apikey: SERVICE, Authorization: `Bearer ${SERVICE}`, 'Content-Type': 'application/json', Prefer: 'return=representation', ...(init.headers || {}) } }).then(async (r) => { const t = await r.text(); if (!r.ok) throw new Error(t); return t ? JSON.parse(t) : null; });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  try {
    if (!ANTHROPIC) return json({ message: 'A geração com IA ainda não foi configurada (falta a chave da Anthropic).' }, 503);
    const jwt = (req.headers.get('Authorization') || '').replace('Bearer ', '');
    const u = await fetch(`${URL_}/auth/v1/user`, { headers: { apikey: SERVICE, Authorization: `Bearer ${jwt}` } });
    if (!u.ok) return json({ message: 'Faça login novamente.' }, 401);
    const user = await u.json();
    const { topico_id } = await req.json();

    const [tp] = await rest(`topicos?id=eq.${topico_id}&user_id=eq.${user.id}&select=*`);
    if (!tp) return json({ message: 'Tópico não encontrado.' }, 404);
    const [ed] = await rest(`editais?id=eq.${tp.edital_id}&select=*`);
    const desde = new Date(); desde.setHours(0, 0, 0, 0);
    const usados = await rest(`ia_pedidos?user_id=eq.${user.id}&ok=eq.true&created_at=gte.${desde.toISOString()}&select=id`);
    const [perfil] = await rest(`profiles?id=eq.${user.id}&select=role`);
    if (perfil?.role !== 'admin' && usados.length >= LIMITE) return json({ message: `Você já usou os ${LIMITE} pedidos de hoje. Use as questões do banco enquanto isso.` }, 429);

    const ce = (ed?.formato || 'certo_errado') !== 'multipla_escolha';
    const prompt = `Gere 10 questões INÉDITAS para o concurso "${ed?.concurso || ''}" (${ed?.cargo || ''}), banca ${ed?.banca || 'Cebraspe'}.
Matéria: ${tp.materia}
Tópico do edital: ${tp.topico}
Formato: ${ce ? 'CERTO/ERRADO no estilo Cebraspe (uma afirmação para julgar). Exatamente 5 certas e 5 erradas.' : 'MÚLTIPLA ESCOLHA com 5 alternativas (A a E) e uma única correta, no estilo da banca.'}
Regras: legislação brasileira vigente hoje (${new Date().toISOString().slice(0, 10)}); dificuldade variada (3 fáceis, 4 médias, 3 difíceis); até 3 itens com situação hipotética curta; nas erradas, o erro deve ser objetivo e preciso; não copie questões de provas; não invente artigos, leis ou jurisprudência — se não tiver certeza de um dado, não o use.
Comentário de 2 a 4 frases começando por "Certo." ou "Errado." (ou "Alternativa X.") explicando o porquê e citando o fundamento (artigo/lei/súmula/regra).
Responda SOMENTE com JSON válido, sem texto antes ou depois, no formato:
{"questoes":[{"texto_base":"(opcional, situação hipotética)","enunciado":"...","alternativas":${ce ? '[]' : '["...","...","...","...","..."]'},"gabarito":"${ce ? 'C ou E' : 'A a E'}","comentario":"...","dificuldade":1}]}`;

    let qs: any[] = [];
    for (let tentativa = 0; tentativa < 2 && qs.length < 10; tentativa++) {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': ANTHROPIC, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({ model: MODELO, max_tokens: 8000, messages: [{ role: 'user', content: prompt }] }),
      });
      if (r.status === 402 || r.status === 429) return json({ message: 'Os créditos da IA acabaram ou o limite foi atingido. Use as questões do banco enquanto isso.' }, 402);
      if (!r.ok) throw new Error('IA: ' + (await r.text()).slice(0, 300));
      const out = await r.json();
      const txt = (out.content || []).map((c: any) => c.text || '').join('');
      try {
        const parsed = JSON.parse(txt.slice(txt.indexOf('{'), txt.lastIndexOf('}') + 1));
        qs = (parsed.questoes || []).filter((q: any) => q.enunciado && q.comentario && (ce ? ['C', 'E'].includes(String(q.gabarito).trim().toUpperCase()[0]) : 'ABCDE'.includes(String(q.gabarito).trim().toUpperCase()[0])));
      } catch { qs = []; }
    }
    if (qs.length < 5) { await rest('ia_pedidos', { method: 'POST', body: JSON.stringify([{ user_id: user.id, topico_id, ok: false }]) }); return json({ message: 'Não foi possível gerar agora, tente de novo.' }, 502); }

    const esc = (s: string) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const p = (s: string) => esc(s).split(/\n\s*\n/).map((x) => `<p>${x.replace(/\n/g, '<br>')}</p>`).join('');
    const linhas = qs.slice(0, 10).map((q: any) => ({
      codigo: 'IA-' + crypto.randomUUID().slice(0, 8).toUpperCase(),
      modalidade: ce ? 'certo_errado' : 'multipla_escolha',
      enunciado: (q.texto_base ? p(q.texto_base) + '<hr>' : '') + p(q.enunciado),
      alternativas: ce ? [] : (q.alternativas || []).slice(0, 5),
      gabarito: String(q.gabarito).trim().toUpperCase()[0],
      comentario: p(q.comentario),
      materia: tp.materia, assunto: tp.topico, banca: ed?.banca || null, orgao: ed?.concurso || null, cargo: ed?.cargo || null,
      ano: new Date().getFullYear(), dificuldade: Number(q.dificuldade) || 2, situacao: 'atualizada', origem: 'ia', fonte: 'Gerada por IA (Claude)', owner: user.id,
    }));
    const salvas = await rest('questoes', { method: 'POST', body: JSON.stringify(linhas) });
    await rest('ia_pedidos', { method: 'POST', body: JSON.stringify([{ user_id: user.id, topico_id, ok: true }]) });
    return json({ questoes: salvas, restantes: Math.max(0, LIMITE - usados.length - 1) });
  } catch (e) {
    return json({ message: 'Erro ao gerar questões: ' + String((e as Error).message).slice(0, 300) }, 500);
  }
});
