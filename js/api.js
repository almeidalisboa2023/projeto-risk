// Cliente Supabase sem dependências (Auth + REST + Storage + Functions) usando fetch.
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const KEY = 'risk-session';
let session = null;
try { session = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { session = null; }

function save(s) {
  session = s;
  try { s ? localStorage.setItem(KEY, JSON.stringify(s)) : localStorage.removeItem(KEY); } catch {}
}

function headers(extra = {}) {
  const h = { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json', ...extra };
  h.Authorization = 'Bearer ' + (session?.access_token || SUPABASE_ANON_KEY);
  return h;
}

async function parse(res) {
  const txt = await res.text();
  let body = null;
  try { body = txt ? JSON.parse(txt) : null; } catch { body = txt; }
  if (!res.ok) {
    const msg = (body && (body.message || body.error_description || body.msg || body.error)) || ('Erro ' + res.status);
    const err = new Error(traduz(msg)); err.status = res.status; err.body = body; throw err;
  }
  return body;
}

function traduz(m) {
  const map = {
    'Invalid login credentials': 'E-mail ou senha incorretos.',
    'User already registered': 'Este e-mail já tem conta. Use "Entrar".',
    'Email not confirmed': 'Confirme seu e-mail pelo link que enviamos antes de entrar.',
    'Password should be at least 6 characters': 'A senha precisa ter pelo menos 6 caracteres.',
  };
  return map[m] || m;
}

async function refreshIfNeeded() {
  if (!session) return;
  const exp = (session.expires_at || 0) * 1000;
  if (Date.now() < exp - 60_000) return;
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST', headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });
    save(await parse(res));
  } catch { save(null); }
}

export const auth = {
  get user() { return session?.user || null; },
  async signIn(email, password) {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST', headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    save(await parse(res));
    return session.user;
  },
  async signUp(email, password, nome) {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST', headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, data: { nome } }),
    });
    const b = await parse(res);
    if (b.access_token) save(b);
    return b;
  },
  async resetPassword(email) {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
      method: 'POST', headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, redirect_to: location.origin }),
    });
    return parse(res);
  },
  async updatePassword(password) {
    await refreshIfNeeded();
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, { method: 'PUT', headers: headers(), body: JSON.stringify({ password }) });
    return parse(res);
  },
  // Link de e-mail (confirmação/recuperação) chega com #access_token=...
  fromUrlHash() {
    const h = new URLSearchParams(location.hash.replace(/^#/, ''));
    if (h.get('access_token')) {
      save({ access_token: h.get('access_token'), refresh_token: h.get('refresh_token'),
        expires_at: Math.floor(Date.now() / 1000) + Number(h.get('expires_in') || 3600), user: null, tipo: h.get('type') });
      history.replaceState(null, '', location.pathname);
      return h.get('type');
    }
    return null;
  },
  async loadUser() {
    if (!session) return null;
    await refreshIfNeeded();
    if (!session) return null;
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: headers() });
      const u = await parse(res);
      session.user = u; save(session); return u;
    } catch { save(null); return null; }
  },
  signOut() { save(null); },
};

function qs(params = {}) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null) p.append(k, v);
  const s = p.toString();
  return s ? '?' + s : '';
}

export const db = {
  // select('tarefas', {semana:'eq.10', order:'ordem'})
  async select(table, params = {}, { count = false, range } = {}) {
    await refreshIfNeeded();
    const extra = {};
    if (count) extra.Prefer = 'count=exact';
    if (range) { extra['Range-Unit'] = 'items'; extra.Range = `${range[0]}-${range[1]}`; }
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${qs({ select: '*', ...params })}`, { headers: headers(extra) });
    const data = await parse(res);
    if (count) {
      const cr = res.headers.get('content-range') || '';
      return { data, count: Number(cr.split('/')[1] || data.length) };
    }
    return data;
  },
  // Busca tudo, paginando de 1000 em 1000
  async selectAll(table, params = {}) {
    const out = [];
    for (let from = 0; ; from += 1000) {
      const page = await db.select(table, params, { range: [from, from + 999] });
      out.push(...page);
      if (page.length < 1000) break;
    }
    return out;
  },
  async insert(table, rows, { upsert = false, onConflict } = {}) {
    await refreshIfNeeded();
    const prefer = ['return=representation'];
    if (upsert) prefer.push('resolution=merge-duplicates');
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${qs(onConflict ? { on_conflict: onConflict } : {})}`, {
      method: 'POST', headers: headers({ Prefer: prefer.join(',') }), body: JSON.stringify(rows),
    });
    return parse(res);
  },
  async update(table, match, values) {
    await refreshIfNeeded();
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${qs(match)}`, {
      method: 'PATCH', headers: headers({ Prefer: 'return=representation' }), body: JSON.stringify(values),
    });
    return parse(res);
  },
  async remove(table, match) {
    await refreshIfNeeded();
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${qs(match)}`, { method: 'DELETE', headers: headers() });
    return parse(res);
  },
  async rpc(fn, args = {}) {
    await refreshIfNeeded();
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, { method: 'POST', headers: headers(), body: JSON.stringify(args) });
    return parse(res);
  },
};

export const storage = {
  async upload(bucket, path, file) {
    await refreshIfNeeded();
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${path}`, {
      method: 'POST', headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + session.access_token, 'Content-Type': file.type || 'application/pdf', 'x-upsert': 'true' },
      body: file,
    });
    await parse(res);
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
  },
  async remove(bucket, path) {
    await refreshIfNeeded();
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${path}`, { method: 'DELETE', headers: headers() });
    return parse(res);
  },
};

export const functions = {
  async invoke(name, body) {
    await refreshIfNeeded();
    const res = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, { method: 'POST', headers: headers(), body: JSON.stringify(body) });
    return parse(res);
  },
};
