import { auth, db, MODO_DEMO } from './backend.js';
import { S, carregarTudo, trocarEdital, isAdmin } from './state.js';
import { esc } from './util.js';
import { toast, loading } from './ui.js';
import { flutuante } from './crono.js';
import { CURSOS, cursoInfo } from './cursos.js';
import { situacao, acessoVencido, fmtData, diasRestantes, AVISO_DIAS } from './acesso.js';

const PAGINAS = {
  painel: ['Painel', '⌂', () => import('./pages/painel.js')],
  calendario: ['Calendário', '▦', () => import('./pages/calendario.js')],
  horas: ['Horas de estudo', '⏱', () => import('./pages/horas.js')],
  registrar: ['Registrar questões', '✎', () => import('./pages/registrar.js')],
  leitura: ['Conteúdo programático', '📖', () => import('./pages/leitura.js')],
  cursos: ['Cursos preparatórios', '🎓', () => import('./pages/vitrine.js')],
  apostilas: ['Apostilas', '📚', () => import('./pages/apostilas.js')],
  materiais: ['Materiais', '📄', () => import('./pages/materiais.js')],
  simulados: ['Simulados', '📝', () => import('./pages/simulados-pdf.js')],
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
  if (!u) return deslogado();
  S.user = u;
  if (tipo === 'recovery') return telaNovaSenha();
  // Compra feita na Hotmart com o mesmo e-mail: libera o acesso na hora
  try { if (!MODO_DEMO) { const n = await db.rpc('verificar_minha_compra'); if (Number(n) > 0) toast('Pagamento reconhecido! Seu acesso foi liberado.'); } } catch {}
  try { await carregarTudo(); } catch (e) { root.innerHTML = `<div class="login"><div class="card"><h2>Não foi possível carregar</h2><p>${esc(e.message)}</p><button class="btn" onclick="location.reload()">Tentar de novo</button></div></div>`; return; }
  if (S.profile.bloqueado) return telaAviso('Acesso bloqueado', 'Fale com o administrador do Projeto R.I.S.K.', false, false, true);
  // Todo aluno informa WhatsApp e dados uma vez (inclusive quem já entrou liberado pela compra)
  if (S.profile.role !== 'admin' && !S.profile.dados_ok_em && S.profile.status !== 'recusado') return telaCadastroCurso();
  if (S.profile.role !== 'admin' && S.profile.status === 'pendente') {
    const c = cursoInfo(S.profile.curso_solicitado);
    return telaAviso('Cadastro em análise', `Olá, ${esc((S.profile.nome || '').split(' ')[0] || 'tudo bem')}! Recebemos o seu cadastro (${esc(S.user.email)})${c ? ` para o curso <b>${esc(c.nome)}</b>` : ''}. Se você comprou pela Hotmart com este e-mail, o acesso é liberado sozinho assim que o pagamento for confirmado (Pix e cartão em minutos; boleto em até 3 dias úteis). Caso contrário, o administrador confere os seus dados e libera. Clique em “Verificar de novo” depois de pagar.`, true, true, true);
  }
  if (acessoVencido(S.profile)) return telaAviso('Seu acesso venceu', `O seu acesso venceu em <b>${fmtData(S.profile.acesso_ate)}</b>. O seu histórico continua guardado: renovando, você volta de onde parou. Depois de pagar a renovação com este e-mail (${esc(S.user.email)}), clique em “Verificar de novo”.`, true, false, true);
  if (S.profile.role !== 'admin' && S.profile.status === 'recusado') return telaAviso('Cadastro não aprovado', 'O seu cadastro não foi aprovado pelo administrador. Se acha que foi um engano, entre em contato.');
  window.addEventListener('hashchange', rota);
  window.addEventListener('risk-crono', () => { if (/calendario|painel|horas/.test(location.hash) || !location.hash) rota(); });
  rota();
  import('./pages/vitrine.js').then((v) => v.retomarCompra()).catch(() => {});
}

// Aviso no topo para o aluno com acesso perto de vencer
function faixaVencimento() {
  const p = S.profile; if (!p || p.role === 'admin') return '';
  const d = diasRestantes(p);
  if (d === null || d < 0 || d > AVISO_DIAS) return '';
  return `<div class="faixa-venc">⏳ Seu acesso ${d === 0 ? 'vence <b>hoje</b>' : `vence em <b>${d} dia${d === 1 ? '' : 's'}</b> (${fmtData(p.acesso_ate)})`}. <a href="#/cursos">Renovar agora</a></div>`;
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
      ${itens.map(([k, [n, ic]]) => `<a class="item ${k === atual ? 'ativo' : ''}" href="#/${k}"><span>${ic}</span>${n}${k === 'admin' && S.pendentes ? `<span class="badge">${S.pendentes}</span>` : ''}</a>`).join('')}
      <div class="rodape">
        <div style="padding:0 8px 8px">${esc(S.profile.nome || S.user.email)}<br><span style="opacity:.6;font-size:12px">${S.profile.role === 'admin' ? 'Administrador' : 'Aluno'}</span></div>
        <a class="item" href="#" id="btnTema">◐ <span>${tema() === 'dark' ? 'Modo claro' : 'Modo noturno'}</span></a>
        <a class="item" href="#" id="btnSair">⎋ Sair</a>
      </div>
    </nav>
    <main class="main">${faixaVencimento()}<div class="row" style="margin-bottom:8px"><button class="btn sec mini burger" id="burger">☰ Menu</button></div><div id="pagina">${loading()}</div></main>
  </div>`;
}

async function rota() {
  const [nome, query] = (location.hash.replace(/^#\/?/, '') || 'painel').split('?');
  const k = PAGINAS[nome] && (nome !== 'admin' || isAdmin()) ? nome : 'painel';
  document.querySelectorAll('.modal-bg').forEach((m) => m.remove()); // trocar de página fecha janelas abertas
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

// Visitante sem login: a página inicial é a vitrine de cursos; Entrar/Criar conta ficam no canto
const ROTA_LOGIN = /^#\/(entrar|criar|esqueci)\b/;
function deslogado() {
  const h = location.hash;
  if (ROTA_LOGIN.test(h)) telaLogin(h.slice(2).split(/[?&]/)[0]);
  else { if (!/^#\/cursos/.test(h)) history.replaceState(null, '', location.pathname + location.search + '#/cursos'); telaPublica(); }
  if (window.__riskDeslog) return; window.__riskDeslog = true;
  window.addEventListener('hashchange', () => {
    if (S.user) return; const h2 = location.hash;
    if (ROTA_LOGIN.test(h2)) telaLogin(h2.slice(2).split(/[?&]/)[0]);
    else if (!root.querySelector('.pub')) { if (!/^#\/cursos/.test(h2)) history.replaceState(null, '', location.pathname + location.search + '#/cursos'); telaPublica(); }
  });
}

function telaLogin(modo = 'entrar') {
  root.innerHTML = `<div class="login"><div class="card">
    <div class="login-logo"><img src="img/${tema() === 'dark' ? 'logo-escuro' : 'logo-claro'}.webp" alt="PROJETO R.I.S.K."></div>
    <p class="login-frase">Organizador de estudos</p>
    ${(() => { try { return localStorage.getItem('risk-comprar'); } catch { return null; } })() ? `<div class="aviso-compra">🛒 ${modo === 'criar' ? 'Crie a conta com o <b>e-mail que vai usar na compra</b>.' : 'Entre na sua conta.'} Em seguida você vai para o pagamento, e o acesso é liberado sozinho.</div>` : ''}
    ${modo !== 'esqueci' ? `<button class="btn sec btn-google" id="google" type="button"><svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 38.2 44 33 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg> ${modo === 'criar' ? 'Cadastrar com Google' : 'Entrar com Google'}</button>
    <div class="ou"><span>ou com e-mail</span></div>` : '<p class="muted" style="text-align:center">Informe seu e-mail para receber o link de troca de senha.</p>'}
    <form id="f">
      ${modo === 'criar' ? '<div class="campo"><label>Seu nome</label><input name="nome" required style="width:100%"></div>' : ''}
      <div class="campo"><label>E-mail</label><input name="email" type="email" required autocomplete="email" style="width:100%"></div>
      ${modo !== 'esqueci' ? `<div class="campo"><label>Senha</label><input name="senha" type="password" required minlength="6" autocomplete="${modo === 'criar' ? 'new-password' : 'current-password'}" style="width:100%"></div>` : ''}
      <button class="btn" style="width:100%">${{ entrar: 'Entrar', criar: 'Criar conta', esqueci: 'Enviar link para trocar a senha' }[modo]}</button>
    </form>
    ${modo === 'criar' ? `<p class="muted" style="font-size:13px;text-align:center;margin:10px 0 0">${(() => { try { return localStorage.getItem('risk-comprar'); } catch { return null; } })() ? 'Comprando com o mesmo e-mail, o acesso é liberado automaticamente.' : 'Quem compra um curso tem o acesso liberado automaticamente. Os demais cadastros passam pela aprovação do administrador.'}</p>` : ''}
    <div class="row" style="margin-top:12px;justify-content:space-between">
      ${modo !== 'entrar' ? '<button class="linkbtn" data-m="entrar">Já tenho conta</button>' : '<button class="linkbtn" data-m="criar">Criar conta</button>'}
      ${modo === 'entrar' ? '<button class="linkbtn" data-m="esqueci">Esqueci a senha</button>' : ''}
    </div>
    <a class="btn sec" href="#/cursos" id="verCursos" style="width:100%;margin-top:14px;text-align:center">🎓 Ver cursos preparatórios</a></div></div>`;
  root.querySelector('#verCursos').onclick = (e) => { e.preventDefault(); location.hash = '#/cursos'; };
  root.querySelectorAll('[data-m]').forEach((b) => (b.onclick = () => { location.hash = '#/' + b.dataset.m; }));
  const g = root.querySelector('#google'); if (g) g.onclick = () => auth.signInGoogle();
  root.querySelector('#f').onsubmit = async (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    const b = e.target.querySelector('button'); b.disabled = true;
    try {
      if (modo === 'entrar') { await auth.signIn(f.email, f.senha); location.reload(); }
      else if (modo === 'criar') {
        const r = await auth.signUp(f.email, f.senha, f.nome);
        if (r.access_token) location.reload(); else { toast('Conta criada! Confirme pelo link enviado ao seu e-mail. Depois, o administrador aprova o seu acesso.'); telaLogin('entrar'); }
      } else { await auth.resetPassword(f.email); toast('Se o e-mail existir, enviamos o link.'); telaLogin('entrar'); }
    } catch (err) { toast(err.message, 'erro'); b.disabled = false; }
  };
}

// Vitrine de cursos para quem ainda não entrou
async function telaPublica() {
  root.innerHTML = `<div class="pub"><header class="pub-top"><a href="#/cursos" class="pub-logo"><img src="img/${tema() === 'dark' ? 'logo-escuro' : 'logo-claro'}.webp" alt="PROJETO R.I.S.K."></a><span class="sp"></span><button class="btn sec mini" id="pubE">Entrar</button><button class="btn mini" id="pubC">Criar conta</button></header><main class="pub-main" id="pubM">${loading()}</main></div>`;
  root.querySelector('#pubE').onclick = () => { location.hash = '#/entrar'; };
  root.querySelector('#pubC').onclick = () => { location.hash = '#/criar'; };
  const mod = await import('./pages/vitrine.js');
  const desenha = () => { if (!/^#\/cursos/.test(location.hash)) { window.removeEventListener('hashchange', desenha); return; } const q = new URLSearchParams(location.hash.split('?')[1] || ''); mod.render(root.querySelector('#pubM'), q, { publico: true, aoEntrar: (m) => { location.hash = '#/' + (m === 'criar' ? 'criar' : 'entrar'); } }); window.scrollTo(0, 0); };
  window.addEventListener('hashchange', desenha);
  desenha();
}

function telaAviso(titulo, texto, verificar = false, corrigir = false, cursos = false) {
  root.innerHTML = `<div class="login"><div class="card" style="text-align:center">
    <div class="login-logo"><img src="img/${tema() === 'dark' ? 'logo-escuro' : 'logo-claro'}.webp" alt="PROJETO R.I.S.K."></div>
    <h2>${esc(titulo)}</h2><p class="muted">${texto}</p>
    <div class="row" style="justify-content:center;margin-top:14px">${verificar ? '<button class="btn" id="avV">Verificar de novo</button>' : ''}${cursos ? '<button class="btn sec" id="avCur">🎓 Cursos preparatórios</button>' : ''}${corrigir ? '<button class="btn sec" id="avC">Corrigir meus dados</button>' : ''}<button class="btn sec" id="avS">Sair</button></div></div></div>`;
  root.querySelector('#avS').onclick = () => { auth.signOut(); location.hash = ''; location.reload(); };
  const v = root.querySelector('#avV'); if (v) v.onclick = () => location.reload();
  const c = root.querySelector('#avC'); if (c) c.onclick = () => telaCadastroCurso();
  const cu = root.querySelector('#avCur'); if (cu) cu.onclick = () => { location.hash = '#/cursos'; telaVitrineLogado(); };
}

async function telaVitrineLogado() {
  root.innerHTML = `<div class="pub"><header class="pub-top"><a href="#/cursos" class="pub-logo"><img src="img/${tema() === 'dark' ? 'logo-escuro' : 'logo-claro'}.webp" alt="PROJETO R.I.S.K."></a><span class="sp"></span><button class="btn sec mini" id="pubV">Voltar</button></header><main class="pub-main" id="pubM">${loading()}</main></div>`;
  root.querySelector('#pubV').onclick = () => { location.hash = ''; location.reload(); };
  const mod = await import('./pages/vitrine.js');
  const desenha = () => { if (!/^#\/cursos/.test(location.hash)) return; mod.render(root.querySelector('#pubM'), new URLSearchParams(location.hash.split('?')[1] || '')); };
  window.addEventListener('hashchange', desenha); desenha();
}

// Primeiro acesso: o aluno escolhe o curso do edital dele e informa os dados para o administrador conferir.
function telaCadastroCurso() {
  const p = S.profile;
  root.innerHTML = `<div class="login"><div class="card" style="max-width:560px">
    <div class="login-logo"><img src="img/${tema() === 'dark' ? 'logo-escuro' : 'logo-claro'}.webp" alt="PROJETO R.I.S.K."></div>
    <h2 style="margin-bottom:4px">Complete o seu cadastro</h2>
    <p class="muted" style="margin-top:0">${p.status === 'aprovado' ? 'Falta pouco! Informe seus dados de contato para entrar. É por eles que avisamos sobre renovação e novidades.' : 'Escolha o curso do concurso que você vai fazer. Você só vai ver as matérias do seu edital. O administrador confere os dados e libera o acesso.'}</p>
    <form id="fc">
      ${p.curso && cursoInfo(p.curso) ? `<div class="campo"><label>Curso</label><div class="curso-op curso-fixo"><span><b>${esc(cursoInfo(p.curso).nome)}</b><small>Liberado pela sua compra</small></span></div><input type="hidden" name="curso" value="${esc(p.curso)}"></div>`
        : `<div class="campo"><label>Curso</label><div class="cursos-op">${CURSOS.map((c) => `<label class="curso-op"><input type="radio" name="curso" value="${c.id}" ${p.curso_solicitado === c.id ? 'checked' : ''} required><span><b>${esc(c.nome)}</b><small>${esc(c.edital)}</small></span></label>`).join('')}</div></div>`}
      <div class="campo"><label>E-mail de contato</label><input value="${esc(S.user.email || p.email || '')}" disabled style="width:100%"><small class="muted">É por este e-mail que o administrador avisa sobre renovação e novidades.</small></div>
      <div class="campo"><label>Nome completo</label><input name="nome" required style="width:100%" value="${esc(p.nome || '')}"></div>
      <div class="row"><div class="campo" style="flex:1"><label>CPF</label><input name="cpf" inputmode="numeric" maxlength="14" placeholder="000.000.000-00" required style="width:100%" value="${esc(p.cpf || '')}"></div>
        <div class="campo" style="flex:1"><label>WhatsApp</label><input name="telefone" inputmode="tel" placeholder="(31) 90000-0000" required style="width:100%" value="${esc(p.telefone || '')}"></div></div>
      <div class="campo"><label>Cidade / UF</label><input name="cidade" placeholder="Pirapora/MG" required style="width:100%" value="${esc(p.cidade || '')}"></div>
      <button class="btn" style="width:100%">${p.status === 'aprovado' ? 'Salvar e entrar' : 'Enviar para aprovação'}</button>
    </form>
    <div class="row" style="justify-content:center;margin-top:10px"><button class="btn sec mini" id="fcS">Sair</button></div></div></div>`;
  root.querySelector('#fcS').onclick = () => { auth.signOut(); location.hash = ''; location.reload(); };
  root.querySelector('#fc').onsubmit = async (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    const cpf = String(f.cpf).replace(/\D/g, '');
    if (cpf.length !== 11) return toast('Confira o CPF: são 11 números.', 'erro');
    const b = e.target.querySelector('button'); b.disabled = true;
    try {
      const v = { nome: f.nome.trim(), cpf, telefone: f.telefone.trim(), cidade: f.cidade.trim(), curso_solicitado: f.curso, dados_ok_em: new Date().toISOString() };
      await db.update('profiles', { id: 'eq.' + S.user.id }, v);
      Object.assign(S.profile, v);
      toast(S.profile.status === 'aprovado' ? 'Dados salvos! Bons estudos.' : 'Cadastro enviado! Agora é só aguardar a aprovação.');
      location.reload();
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
