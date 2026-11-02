import { auth, MODO_DEMO } from './backend.js';
import { S, carregarTudo, trocarEdital, isAdmin } from './state.js';
import { esc } from './util.js';
import { toast, loading } from './ui.js';
import { flutuante } from './crono.js';

const PAGINAS = {
  painel: ['Painel', '⌂', () => import('./pages/painel.js')],
  calendario: ['Calendário', '▦', () => import('./pages/calendario.js')],
  horas: ['Horas de estudo', '⏱', () => import('./pages/horas.js')],
  edital: ['Edital', '☰', () => import('./pages/edital.js')],
  perfil: ['Perfil', '☺', () => import('./pages/perfil.js')],
  admin: ['Administrador', '⚙', () => import('./pages/admin.js')],
};
const root = document.getElementById('app');

export function tema() { return document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
export function alternaTema() {
  const novo = tema() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = novo;
  try { localStorage.setItem('risk-tema', novo); } catch {}
  return novo;
}

async function iniciar() {
  const tipo = auth.fromUrlHash();
  const u = await auth.loadUser();
  if (!u) return telaLogin();
  S.user = u;
  if (tipo === 'recovery') return telaNovaSenha();
  try { await carregarTudo(); } catch (e) { root.innerHTML = `<div class="login"><div class="card"><h2>Não foi possível carregar</h2><p>${esc(e.message)}</p><button class="btn" onclick="location.reload()">Tentar de novo</button></div></div>`; return; }
  if (S.profile.bloqueado) { root.innerHTML = '<div class="login"><div class="card"><h2>Acesso bloqueado</h2><p>Fale com o administrador.</p></div></div>'; return; }
  window.addEventListener('hashchange', rota);
  window.addEventListener('risk-crono', () => { if (/calendario|painel|horas/.test(location.hash) || !location.hash) rota(); });
  rota();
}

function layout(atual) {
  const itens = Object.entries(PAGINAS).filter(([k]) => k !== 'admin' || isAdmin());
  const ativos = S.editais.filter((e) => e.ativo !== false);
  return `${MODO_DEMO ? '<div class="demo">Modo demonstração – dados de exemplo salvos só neste navegador</div>' : ''}
  <div class="shell">
    <nav class="side" id="side">
      <a class="logo-img" href="#/painel" title="PROJETO R.I.S.K."><img src="img/logo-escuro.webp" alt="PROJETO R.I.S.K."></a>
      ${ativos.length ? `<select id="selEdital" aria-label="Edital">${ativos.map((e) => `<option value="${e.id}" ${e.id === S.edital?.id ? 'selected' : ''}>${esc(e.concurso)}</option>`).join('')}</select>` : ''}
      <div class="grupo">Geral</div>
      ${itens.map(([k, [n, ic]]) => `<a class="item ${k === atual ? 'ativo' : ''}" href="#/${k}"><span>${ic}</span>${n}</a>`).join('')}
      <div class="rodape">
        <div style="padding:0 8px 8px">${esc(S.profile.nome || S.user.email)}<br><span style="opacity:.6;font-size:12px">${S.profile.role === 'admin' ? 'Administrador' : 'Aluno'}</span></div>
        <a class="item" href="#" id="btnTema">◐ <span>${tema() === 'dark' ? 'Modo claro' : 'Modo noturno'}</span></a>
        <a class="item" href="#" id="btnSair">⎋ Sair</a>
      </div>
    </nav>
    <main class="main"><div class="row" style="margin-bottom:8px"><button class="btn sec mini burger" id="burger">☰ Menu</button></div><div id="pagina">${loading()}</div></main>
  </div>`;
}

async function rota() {
  const [nome, query] = (location.hash.replace(/^#\/?/, '') || 'painel').split('?');
  const k = PAGINAS[nome] && (nome !== 'admin' || isAdmin()) ? nome : 'painel';
  root.innerHTML = layout(k);
  document.title = `${PAGINAS[k][0]} · PROJETO R.I.S.K.`;
  document.getElementById('burger').onclick = () => document.getElementById('side').classList.toggle('aberto');
  document.getElementById('btnSair').onclick = (e) => { e.preventDefault(); auth.signOut(); location.hash = ''; location.reload(); };
  document.getElementById('btnTema').onclick = (e) => { e.preventDefault(); alternaTema(); rota(); };
  const sel = document.getElementById('selEdital');
  if (sel) sel.onchange = async () => { await trocarEdital(sel.value); rota(); };
  const el = document.getElementById('pagina');
  try {
    const mod = await PAGINAS[k][2]();
    await mod.render(el, new URLSearchParams(query || ''));
  } catch (e) {
    console.error(e);
    el.innerHTML = `<div class="card"><h3>Algo deu errado</h3><p class="muted">${esc(e.message)}</p></div>`;
  }
  window.scrollTo(0, 0);
  flutuante();
}
export const recarregar = rota;

function telaLogin(modo = 'entrar') {
  root.innerHTML = `<div class="login"><div class="card">
    <div class="login-logo"><img src="img/${tema() === 'dark' ? 'logo-escuro' : 'logo-claro'}.webp" alt="PROJETO R.I.S.K."></div>
    <p class="muted" style="margin-top:0;text-align:center">Plano de estudos, questões e simulados para concursos</p>
    <form id="f">
      ${modo === 'criar' ? '<div class="campo"><label>Seu nome</label><input name="nome" required style="width:100%"></div>' : ''}
      <div class="campo"><label>E-mail</label><input name="email" type="email" required autocomplete="email" style="width:100%"></div>
      ${modo !== 'esqueci' ? `<div class="campo"><label>Senha</label><input name="senha" type="password" required minlength="6" autocomplete="${modo === 'criar' ? 'new-password' : 'current-password'}" style="width:100%"></div>` : ''}
      <button class="btn" style="width:100%">${{ entrar: 'Entrar', criar: 'Criar conta', esqueci: 'Enviar link para trocar a senha' }[modo]}</button>
    </form>
    <div class="row" style="margin-top:12px;justify-content:space-between">
      ${modo !== 'entrar' ? '<button class="linkbtn" data-m="entrar">Já tenho conta</button>' : '<button class="linkbtn" data-m="criar">Criar conta</button>'}
      ${modo === 'entrar' ? '<button class="linkbtn" data-m="esqueci">Esqueci a senha</button>' : ''}
    </div></div></div>`;
  root.querySelectorAll('[data-m]').forEach((b) => (b.onclick = () => telaLogin(b.dataset.m)));
  root.querySelector('#f').onsubmit = async (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    const b = e.target.querySelector('button'); b.disabled = true;
    try {
      if (modo === 'entrar') { await auth.signIn(f.email, f.senha); location.reload(); }
      else if (modo === 'criar') {
        const r = await auth.signUp(f.email, f.senha, f.nome);
        if (r.access_token) location.reload(); else { toast('Conta criada! Confirme pelo link que enviamos ao seu e-mail.'); telaLogin('entrar'); }
      } else { await auth.resetPassword(f.email); toast('Se o e-mail existir, enviamos o link.'); telaLogin('entrar'); }
    } catch (err) { toast(err.message, 'erro'); b.disabled = false; }
  };
}

function telaNovaSenha() {
  root.innerHTML = `<div class="login"><div class="card"><h2>Nova senha</h2><form id="f"><div class="campo"><label>Nova senha</label><input name="s" type="password" minlength="6" required style="width:100%"></div><button class="btn">Salvar</button></form></div></div>`;
  root.querySelector('#f').onsubmit = async (e) => {
    e.preventDefault();
    try { await auth.updatePassword(new FormData(e.target).get('s')); toast('Senha alterada.'); location.reload(); } catch (err) { toast(err.message, 'erro'); }
  };
}

iniciar();
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
