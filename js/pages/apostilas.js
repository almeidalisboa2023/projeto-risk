// Apostilas, Materiais e Simulados por curso: o administrador envia PDFs, escolhe a seção, a ordem e os cursos; o aluno lê dentro do app, sem baixar.
import { S } from '../state.js';
import { db, storage } from '../backend.js';
import { esc } from '../util.js';
import { toast, loading } from '../ui.js';
import { CURSOS, cursoInfo, meuCurso } from '../cursos.js';
import { lerPdf, acharQuestoes, paraQuiz, mascaras, painelQuestoes, carregaPdfJs } from '../pdf-questoes.js';
import { blocoQuiz, quiz } from './leitura.js';

const ehAdmin = () => S.profile?.role === 'admin';
const lib = carregaPdfJs;
const tam = (b) => (b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB');

// Três seções que usam a mesma tabela (coluna "tipo"): Apostilas, Materiais e Simulados.
export const SECOES = {
  apostila: { rota: 'apostilas', nome: 'Apostilas', um: 'apostila', ico: '📕', novo: 'nova apostila' },
  material: { rota: 'materiais', nome: 'Materiais', um: 'material', ico: '📄', novo: 'novo material' },
  simulado: { rota: 'simulados', nome: 'Simulados', um: 'simulado', ico: '📝', novo: 'novo simulado' },
};
const tipoDe = (a) => (SECOES[a.tipo] ? a.tipo : 'apostila');

export async function render(el, q, tipo = 'apostila') {
  const abrir = q?.get('ver');
  el.innerHTML = loading();
  let lista = [];
  try { lista = await db.select('apostilas', { order: 'ordem.asc,created_at.asc' }); } catch (e) { el.innerHTML = `<div class="card"><p>${esc(e.message)}</p></div>`; return; }
  if (!ehAdmin()) lista = lista.filter((a) => a.ativo !== false && (a.cursos || []).includes(S.profile?.curso));
  if (abrir) { const a = lista.find((x) => x.id === abrir); if (a) return leitor(el, a); }
  pagina(el, lista.filter((a) => tipoDe(a) === tipo), tipo, lista);
}

function pagina(el, lista, tipo, todas) {
  const c = meuCurso(), sec = SECOES[tipo];
  el.innerHTML = `<div class="mono up">${ehAdmin() ? 'Administrador · ' : ''}${sec.nome}</div>
    <h1>${ehAdmin() ? sec.nome + ' dos cursos' : c ? sec.nome + ' · ' + esc(c.curto) : sec.nome}</h1>
    ${ehAdmin() ? `<div class="card" id="apEnvio"></div>` : c ? `<p class="muted" style="margin-top:-6px">${sec.nome} do seu curso (${esc(c.nome)}). Tudo abre aqui dentro do app.</p>`
      : `<div class="card"><p>Você ainda não tem curso definido. Quando o administrador definir o seu curso, os ${sec.nome.toLowerCase()} dele aparecem aqui.</p></div>`}
    ${ehAdmin() ? `<div class="row" style="margin:16px 0 6px"><h3 style="margin:0">Enviados (${lista.length})</h3><span class="sp"></span>
      <select id="apFiltro"><option value="">Todos os cursos</option>${CURSOS.map((x) => `<option value="${x.id}">${esc(x.curto)}</option>`).join('')}</select></div>
      ${lista.length > 1 ? '<p class="muted" style="font-size:12.5px;margin:0">Use ↑ e ↓ para mudar a ordem em que os alunos veem.</p>' : ''}` : ''}
    <div id="apLista">${lista.length ? '' : `<p class="muted">${ehAdmin() ? 'Nada enviado ainda nesta seção.' : c ? `Ainda não há ${sec.nome.toLowerCase()} para o seu curso.` : ''}</p>`}</div>`;
  const desenha = (filtro = '') => {
    const L = el.querySelector('#apLista'); if (!lista.length) return;
    const vis = lista.filter((a) => !filtro || (a.cursos || []).includes(filtro));
    // agrupa por matéria, na ordem definida (a matéria aparece onde está o seu primeiro item)
    const grupos = new Map(); for (const a of vis) { const k = a.materia || 'Geral'; if (!grupos.has(k)) grupos.set(k, []); grupos.get(k).push(a); }
    L.innerHTML = [...grupos].map(([m, as]) => `${grupos.size > 1 || m !== 'Geral' ? `<h3 style="margin:18px 0 8px">${esc(m)}</h3>` : ''}<div class="ap-grade">${as.map((a) => {
      const i = lista.indexOf(a);
      return `<div class="card ap-item ${a.ativo === false ? 'off' : ''}">
        <div class="ap-ico">${sec.ico}</div>
        <div style="flex:1;min-width:0"><b>${ehAdmin() ? `<span class="muted">${i + 1}.</span> ` : ''}${esc(a.titulo)}</b>
          ${a.descricao ? `<p class="muted" style="margin:4px 0 0;font-size:13.5px">${esc(a.descricao)}</p>` : ''}
          <p class="muted" style="margin:4px 0 0;font-size:12.5px">${a.quiz?.length ? '🎯 ' + a.quiz.length + ' questões · ' : ''}${a.paginas ? a.paginas + ' páginas · ' : ''}${a.tamanho ? tam(a.tamanho) + ' · ' : ''}${new Date(a.created_at).toLocaleDateString('pt-BR')}</p>
          ${ehAdmin() ? `<p style="margin:6px 0 0">${(a.cursos || []).map((k) => `<span class="pill">${esc(cursoInfo(k)?.curto || k)}</span>`).join(' ') || '<span class="pill" style="background:var(--vermelho);color:#fff">sem curso</span>'}${a.ativo === false ? ' <span class="pill">oculto</span>' : ''}</p>` : ''}
          <div class="row" style="margin-top:10px;flex-wrap:wrap;gap:6px"><a class="btn mini" href="#/${sec.rota}?ver=${a.id}">Abrir</a>
            ${ehAdmin() ? `<button class="btn mini sec" data-mv="${a.id}" data-d="-1" title="Subir" ${i === 0 ? 'disabled' : ''}>↑</button><button class="btn mini sec" data-mv="${a.id}" data-d="1" title="Descer" ${i === lista.length - 1 ? 'disabled' : ''}>↓</button>
              <button class="btn mini sec" data-ed="${a.id}">Editar</button><button class="btn mini sec" data-oc="${a.id}">${a.ativo === false ? 'Mostrar' : 'Ocultar'}</button><button class="btn mini sec" data-rm="${a.id}">Apagar</button>` : ''}</div>
        </div></div>`; }).join('')}</div>`).join('') || '<p class="muted">Nada para este curso.</p>';
    if (!ehAdmin()) return;
    const filtroAtual = () => el.querySelector('#apFiltro').value;
    L.querySelectorAll('[data-mv]').forEach((b) => (b.onclick = async () => {
      const i = lista.findIndex((x) => x.id === b.dataset.mv), j = i + Number(b.dataset.d);
      if (j < 0 || j >= lista.length) return;
      [lista[i], lista[j]] = [lista[j], lista[i]];
      try { await salvarOrdem(lista); desenha(filtroAtual()); } catch (e) { toast(e.message, 'erro'); }
    }));
    L.querySelectorAll('[data-oc]').forEach((b) => (b.onclick = async () => {
      const a = lista.find((x) => x.id === b.dataset.oc);
      try { await db.update('apostilas', { id: 'eq.' + a.id }, { ativo: a.ativo === false }); a.ativo = a.ativo === false; desenha(filtroAtual()); } catch (e) { toast(e.message, 'erro'); }
    }));
    L.querySelectorAll('[data-rm]').forEach((b) => (b.onclick = async () => {
      const a = lista.find((x) => x.id === b.dataset.rm);
      if (!confirm(`Apagar “${a.titulo}”? O PDF também é apagado.`)) return;
      try { await db.remove('apostilas', { id: 'eq.' + a.id }); storage.remove('apostilas', a.arquivo).catch(() => {}); toast('Apagado.'); render(el, null, tipo); } catch (e) { toast(e.message, 'erro'); }
    }));
    L.querySelectorAll('[data-ed]').forEach((b) => (b.onclick = () => { formulario(el, lista.find((x) => x.id === b.dataset.ed), tipo, todas); el.querySelector('#apEnvio').scrollIntoView({ behavior: 'smooth' }); }));
  };
  desenha();
  if (ehAdmin()) {
    el.querySelector('#apFiltro').onchange = (e) => desenha(e.target.value);
    formulario(el, null, tipo, todas);
  }
}

// Grava a ordem (10, 20, 30…) dos itens que mudaram de posição
async function salvarOrdem(lista) {
  const mud = [];
  lista.forEach((a, k) => { const o = (k + 1) * 10; if (a.ordem !== o) { a.ordem = o; mud.push(a); } });
  await Promise.all(mud.map((a) => db.update('apostilas', { id: 'eq.' + a.id }, { ordem: a.ordem })));
}

// Envio (novo) ou edição (sem trocar o PDF): escolhe a seção (Apostilas, Materiais, Simulados) e a posição
function formulario(el, ap, tipoPagina, todas) {
  const box = el.querySelector('#apEnvio');
  const marcados = new Set(ap?.cursos || []);
  const tipoIni = ap ? tipoDe(ap) : tipoPagina;
  const daSecao = (t) => todas.filter((x) => tipoDe(x) === t && x.id !== ap?.id);
  const opPos = (t) => { const l = daSecao(t); const atual = ap && tipoDe(ap) === t ? todas.filter((x) => tipoDe(x) === t).indexOf(ap) : l.length;
    return Array.from({ length: l.length + 1 }, (_, k) => `<option value="${k}" ${k === atual ? 'selected' : ''}>${k === 0 ? '1º (no topo)' : k === l.length ? `${k + 1}º (no fim)` : `${k + 1}º (antes de “${esc(l[k].titulo.slice(0, 40))}”)`}</option>`).join(''); };
  box.innerHTML = `<h3 style="margin-top:0">${ap ? 'Editar' : '📤 Enviar PDF'}</h3>
    ${ap ? '' : `<label class="btn sec" style="margin:0">Escolher PDF<input type="file" id="apF" accept="application/pdf,.pdf" hidden></label> <span class="muted" id="apArq" style="font-size:13px"></span>`}
    <div class="row" style="margin-top:10px"><div class="campo" style="flex:1;min-width:160px"><label>Enviar para</label><select id="apTipo" style="width:100%">${Object.entries(SECOES).map(([k, v]) => `<option value="${k}" ${k === tipoIni ? 'selected' : ''}>${v.ico} ${v.nome}</option>`).join('')}</select></div>
      <div class="campo" style="flex:2;min-width:220px"><label>Posição na lista</label><select id="apPos" style="width:100%">${opPos(tipoIni)}</select></div></div>
    <div class="row"><div class="campo" style="flex:2;min-width:220px"><label>Título</label><input id="apT" style="width:100%" value="${esc(ap?.titulo || '')}" placeholder="Ex.: Direito Civil · Parte Geral"></div>
      <div class="campo" style="flex:1;min-width:160px"><label>Matéria (opcional)</label><input id="apM" style="width:100%" value="${esc(ap?.materia || '')}" placeholder="Ex.: Direito Civil"></div></div>
    <div class="campo"><label>Descrição (opcional)</label><input id="apD" style="width:100%" value="${esc(ap?.descricao || '')}"></div>
    <div class="campo"><label>Cursos que vão receber</label>
      <div class="row" style="flex-wrap:wrap;gap:6px 14px">${CURSOS.map((c) => `<label style="font-size:14px"><input type="checkbox" class="apC" value="${c.id}" ${marcados.has(c.id) ? 'checked' : ''}> ${esc(c.curto)}</label>`).join('')}</div></div>
    ${ap ? `<div class="row" style="margin:4px 0 8px"><button type="button" class="btn sec mini" id="apReq">🔎 Procurar questões neste PDF</button><span class="muted" style="font-size:12.5px">${ap.quiz?.length ? ap.quiz.length + ' questões já ativas. Procurar de novo substitui a lista.' : 'Transforma as questões do PDF em questões para responder.'}</span></div>` : ''}
    <div id="apQs"></div>
    <div class="row"><span class="sp"></span>${ap ? '<button class="btn sec" id="apCanc">Cancelar</button>' : ''}<button class="btn verde" id="apOk">${ap ? 'Salvar' : 'Enviar'}</button></div>`;
  box.querySelector('#apTipo').onchange = (e) => { box.querySelector('#apPos').innerHTML = opPos(e.target.value); };
  let arquivo = null, paginas = null, achou = null, escolhidas = () => [];
  const f = box.querySelector('#apF');
  if (f) f.onchange = async () => {
    arquivo = f.files[0]; paginas = null;
    if (!arquivo) return;
    if (arquivo.size > 50 * 1024 * 1024) { arquivo = null; return toast('PDF muito grande (máximo 50 MB). Divida em partes.', 'erro'); }
    box.querySelector('#apArq').textContent = `${arquivo.name} · ${tam(arquivo.size)}`;
    if (!box.querySelector('#apT').value) box.querySelector('#apT').value = arquivo.name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ');
    if (/simulad/i.test(arquivo.name)) { box.querySelector('#apTipo').value = 'simulado'; box.querySelector('#apPos').innerHTML = opPos('simulado'); }
    try {
      const info = box.querySelector('#apArq'), base = info.textContent;
      const r = await lerPdf(await arquivo.arrayBuffer(), (n, t) => (info.textContent = `${base} · lendo página ${n} de ${t}…`));
      paginas = r.numPaginas; achou = acharQuestoes(r.paginas);
      info.textContent = `${base} · ${paginas} páginas`;
      escolhidas = painelQuestoes(box.querySelector('#apQs'), achou.questoes, esc);
    } catch { toast('Não consegui abrir este PDF. Confira se o arquivo não está corrompido ou com senha.', 'erro'); arquivo = null; }
  };
  if (ap) box.querySelector('#apCanc').onclick = () => formulario(el, null, tipoPagina, todas);
  if (ap) box.querySelector('#apReq').onclick = async (ev) => {
    ev.target.disabled = true; ev.target.textContent = 'Lendo o PDF…';
    try {
      const r = await lerPdf(await storage.download('apostilas', ap.arquivo), (n, t) => (ev.target.textContent = `Lendo página ${n} de ${t}…`));
      achou = acharQuestoes(r.paginas); escolhidas = painelQuestoes(box.querySelector('#apQs'), achou.questoes, esc);
      ev.target.textContent = '🔎 Procurar de novo';
    } catch (e) { toast(e.message, 'erro'); ev.target.textContent = '🔎 Procurar questões neste PDF'; }
    ev.target.disabled = false;
  };
  box.querySelector('#apOk').onclick = async (ev) => {
    const cursos = [...box.querySelectorAll('.apC:checked')].map((x) => x.value);
    const tipo = box.querySelector('#apTipo').value, pos = Number(box.querySelector('#apPos').value);
    const v = { tipo, titulo: box.querySelector('#apT').value.trim(), materia: box.querySelector('#apM').value.trim() || null, descricao: box.querySelector('#apD').value.trim() || null, cursos };
    if (!ap && !arquivo) return toast('Escolha o PDF.', 'erro');
    if (!v.titulo) return toast('Escreva o título.', 'erro');
    if (!cursos.length) return toast('Marque pelo menos um curso.', 'erro');
    ev.target.disabled = true; ev.target.textContent = ap ? 'Salvando…' : 'Enviando…';
    try {
      let reg;
      if (ap) { await db.update('apostilas', { id: 'eq.' + ap.id }, achou ? { ...v, quiz: escolhidas().map((q) => paraQuiz(q, v.titulo)), mascara: mascaras([...achou.esconder]) } : v); reg = { ...ap, ...v }; }
      else {
        const caminho = `${Date.now()}-${arquivo.name.replace(/[^\w.-]/g, '_')}`;
        await storage.upload('apostilas', caminho, arquivo);
        // esconde no PDF o gabarito e os comentários das questões (aparecem só depois da resposta)
        const extra = { quiz: escolhidas().map((q) => paraQuiz(q, v.titulo)), mascara: mascaras(achou ? [...achou.esconder] : []) };
        [reg] = await db.insert('apostilas', [{ ...v, arquivo: caminho, paginas, tamanho: arquivo.size, ativo: true, ordem: 0, ...extra }]);
      }
      // posição escolhida na seção de destino
      const nova = daSecao(tipo); nova.splice(Math.min(pos, nova.length), 0, reg);
      await salvarOrdem(nova);
      toast(ap ? 'Salvo.' : `Enviado para ${SECOES[tipo].nome}! Os alunos dos cursos marcados já podem abrir.`);
      if (tipo !== tipoPagina) location.hash = '#/' + SECOES[tipo].rota; else render(el, null, tipoPagina);
    } catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; ev.target.textContent = ap ? 'Salvar' : 'Enviar'; }
  };
}

// Leitor: desenha as páginas em imagem dentro do app (sem barra do navegador, sem botão de baixar)
async function leitor(el, a) {
  const sec = SECOES[tipoDe(a)];
  el.innerHTML = `<div class="row"><a class="btn sec mini" href="#/${sec.rota}">‹ ${sec.nome}</a><span class="sp"></span>
      <button class="btn sec mini" id="lzMenos" title="Diminuir">−</button><span class="muted" id="lzZoom" style="font-size:13px;min-width:44px;text-align:center"></span><button class="btn sec mini" id="lzMais" title="Aumentar">+</button></div>
    <h1 style="margin:10px 0 2px">${esc(a.titulo)}</h1>
    <p class="muted" style="margin:0 0 10px;font-size:13px">${a.materia ? esc(a.materia) + ' · ' : ''}<span id="lzPag">Carregando…</span></p>
    ${a.quiz?.length ? `<div class="abas lt-abas" id="lzAbas" style="margin-bottom:10px"><button data-aba="pdf" class="on">📖 ${tipoDe(a) === 'simulado' ? 'Prova' : 'PDF'}</button><button data-aba="qst">🎯 Questões (${a.quiz.length})</button></div>` : ''}
    <div class="ap-leitor" id="lz"></div>
    ${a.quiz?.length ? `<div id="lzQ" hidden>${blocoQuiz(a)}</div>` : ''}
    <p class="muted" style="font-size:12px;text-align:center;margin-top:10px">Material de uso exclusivo dos alunos do Projeto R.I.S.K.${S.user?.email ? ' · ' + esc(S.user.email) : ''}</p>`;
  const caixa = el.querySelector('#lz');
  if (a.quiz?.length) {
    quiz(el, { id: 'apostila-' + a.id, nome: a.materia || a.titulo }, a);
    el.querySelectorAll('#lzAbas [data-aba]').forEach((b) => (b.onclick = () => {
      el.querySelectorAll('#lzAbas [data-aba]').forEach((y) => y.classList.toggle('on', y === b));
      caixa.hidden = b.dataset.aba !== 'pdf'; el.querySelector('#lzQ').hidden = b.dataset.aba !== 'qst';
    }));
    if (tipoDe(a) === 'simulado') el.querySelector('#lzAbas [data-aba="qst"]').click(); // simulado abre direto nas questões
  }
  caixa.oncontextmenu = (e) => e.preventDefault();
  let doc;
  try {
    const [L, dados] = await Promise.all([lib(), storage.download('apostilas', a.arquivo)]);
    doc = await L.getDocument({ data: new Uint8Array(dados) }).promise;
  } catch (e) { caixa.innerHTML = `<div class="card"><p>Não foi possível abrir a apostila. ${esc(e.message)}</p></div>`; el.querySelector('#lzPag').textContent = ''; return; }
  let zoom = 1;
  const marca = S.user?.email || '';
  const paginas = Array.from({ length: doc.numPages }, (_, i) => {
    const d = document.createElement('div'); d.className = 'ap-pag'; d.dataset.n = i + 1; d.innerHTML = `<span class="muted">Página ${i + 1}</span>`; caixa.appendChild(d); return d;
  });
  const feitas = new Map();
  const desenha = async (d) => {
    const n = Number(d.dataset.n);
    if (feitas.get(n) === zoom) return; feitas.set(n, zoom);
    const pg = await doc.getPage(n);
    const larg = Math.min(Math.max(280, (caixa.clientWidth || 800) - 26), 1000) * zoom;
    const base = pg.getViewport({ scale: 1 }), esc2 = larg / base.width, dpr = Math.min(2, window.devicePixelRatio || 1);
    const vp = pg.getViewport({ scale: esc2 * dpr });
    const cv = document.createElement('canvas'); cv.width = vp.width; cv.height = vp.height;
    cv.style.width = Math.round(vp.width / dpr) + 'px'; cv.style.height = Math.round(vp.height / dpr) + 'px';
    await pg.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;
    const tampa = (a.mascara || {})[n];
    if (tampa?.length) { const ctx = cv.getContext('2d'); ctx.save(); ctx.fillStyle = '#fff';
      const [ta, tb, tc, td, te, tf] = vp.transform, pt = (x, y) => [ta * x + tc * y + te, tb * x + td * y + tf];
      for (const r of tampa) { const [x1, y1] = pt(r[0], r[1]), [x2, y2] = pt(r[2], r[3]); ctx.fillRect(Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1)); }
      ctx.restore(); }
    if (marca) { const ctx = cv.getContext('2d'); ctx.save(); ctx.globalAlpha = 0.08; ctx.fillStyle = '#000'; ctx.font = `${Math.round(18 * dpr)}px sans-serif`; ctx.translate(cv.width / 2, cv.height / 2); ctx.rotate(-Math.PI / 6); ctx.textAlign = 'center'; ctx.fillText(marca, 0, 0); ctx.restore(); }
    d.replaceChildren(cv);
  };
  const obs = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) desenha(e.target); }), { rootMargin: '600px 0px' });
  paginas.forEach((d) => obs.observe(d));
  const atualizaZoom = () => { el.querySelector('#lzZoom').textContent = Math.round(zoom * 100) + '%'; paginas.forEach((d) => { const r = d.getBoundingClientRect(); if (r.bottom > -600 && r.top < innerHeight + 600) desenha(d); }); };
  el.querySelector('#lzMenos').onclick = () => { zoom = Math.max(0.6, +(zoom - 0.2).toFixed(1)); atualizaZoom(); };
  el.querySelector('#lzMais').onclick = () => { zoom = Math.min(2.4, +(zoom + 0.2).toFixed(1)); atualizaZoom(); };
  atualizaZoom();
  const pagAtual = () => { let n = 1; for (const d of paginas) if (d.getBoundingClientRect().top < innerHeight / 2) n = Number(d.dataset.n); el.querySelector('#lzPag').textContent = `Página ${n} de ${doc.numPages}`; };
  pagAtual(); window.addEventListener('scroll', pagAtual, { passive: true });
  window.addEventListener('hashchange', () => { obs.disconnect(); window.removeEventListener('scroll', pagAtual); doc.destroy?.(); }, { once: true });
}
