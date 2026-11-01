import * as real from './api.js';
import * as mock from './mock.js';
import { SUPABASE_URL } from './config.js';
export const MODO_DEMO = new URLSearchParams(location.search).has('demo') || !/^https:\/\//.test(SUPABASE_URL);
const B = MODO_DEMO ? mock : real;
export const auth = B.auth, db = B.db, storage = B.storage, functions = B.functions;
