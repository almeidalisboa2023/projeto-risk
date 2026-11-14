import * as real from './api.js';
import * as mock from './mock.js';
import { SUPABASE_URL } from './config.js';
export const MODO_DEMO = new URLSearchParams(location.search).has('demo') || !/^https:\/\//.test(SUPABASE_URL);
const B = MODO_DEMO ? mock : real;
import { sandbox, emSandbox, SANDBOX_TABELAS } from './sandbox.js';
export const auth = B.auth, storage = B.storage, functions = B.functions;
// No modo aluno do administrador, os dados de estudo vão para a caixa de areia (sandbox.js) e o perfil não é alterado.
const base = B.db;
const pessoal = (t) => SANDBOX_TABELAS.has(t) && emSandbox();
export const db = {
  select: (t, ...a) => (pessoal(t) ? sandbox.select(t, ...a) : base.select(t, ...a)),
  selectAll: (t, ...a) => (pessoal(t) ? sandbox.selectAll(t, ...a) : base.selectAll(t, ...a)),
  insert: (t, ...a) => (pessoal(t) ? sandbox.insert(t, ...a) : base.insert(t, ...a)),
  update: (t, m, v) => (pessoal(t) ? sandbox.update(t, m, v) : t === 'profiles' && emSandbox() ? Promise.resolve([{ ...v }]) : base.update(t, m, v)),
  remove: (t, ...a) => (pessoal(t) ? sandbox.remove(t, ...a) : base.remove(t, ...a)),
  rpc: (...a) => base.rpc(...a),
};
