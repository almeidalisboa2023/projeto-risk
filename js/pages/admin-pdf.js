// Administrador · Conteúdo em PDF: lê o PDF no navegador, sugere a matéria e o tópico, e, ao confirmar,
// manda o texto para a leitura da matéria (tópico novo, complemento de tópico ou matéria nova).
import { S } from '../state.js';
import { db, storage } from '../backend.js';
import { esc, norm } from '../util.js';
import { toast } from '../ui.js';
import { CURSOS } from '../cursos.js';
import { MATERIAS_TODAS, comConteudos } from '../leitura/index.js';
import { lerPdf, acharQuestoes, paraQuiz, painelQuestoes } from '../pdf-questoes.js';

// Transforma as linhas em HTML de leitura: títulos (letra maior, CAIXA ALTA, Título/Capítulo/Seção), parágrafos, listas e artigos.
function montarHtml(paginas, pular = new Set()) {
  // cabeçalho e rodapé que se repetem na maioria das páginas saem do texto
  const conta = new Map();
  if (paginas.length >= 3) for (const p of paginas) for (const k of new Set(p.map((l) => norm(l.t).replace(/\d+/g, '#')))) conta.set(k, (conta.get(k) || 0) + 1);
  const repetida = (l) => paginas.length >= 3 && (conta.get(norm(l.t).replace(/\d+/g, '#')) || 0) > paginas.length * 0.5;
  const todas = paginas.flatMap((p) => p.filter((l) => !repetida(l) && !/^\d{1,4}$/.test(l.t) && !/^p[aá]gina \d+/i.test(l.t)));
  if (!todas.length) return { html: '', texto: '', titulo: '' };
  const hs = todas.map((l) => l.h).sort((a, b) => a - b), corpo = hs[Math.floor(hs.length / 2)] || 10;
  const titulo = (l) => l.t.length < 120 && (l.h >= corpo * 1.15 || (/^(T[IÍ]TULO|CAP[IÍ]TULO|SE[CÇ][AÃ]O|SUBSE[CÇ][AÃ]O|LIVRO|PARTE|ANEXO)\b/i.test(l.t) && l.t.length < 90)
    || (l.t.length > 3 && l.t.length < 80 && l.t === l.t.toUpperCase() && /[A-ZÀ-Ú]{3}/.test(l.t)));
  const marcador = /^([•●▪■◦\-–—*]|\d{1,2}[\.\)]|[a-z]\))\s+/;
  const inicioNovo = /^(Art\.?\s*\d|§\s*\d|Par[aá]grafo [uú]nico|[IVXLC]{1,6}\s*[-–—]\s)/;
  const out = []; let par = null, lista = null, primeiro = '';
  const fechaPar = () => { if (par) out.push(`<p>${negrito(esc(par))}</p>`); par = null; };
  const fechaLista = () => { if (lista) out.push(`<ul>${lista.map((x) => `<li>${negrito(esc(x))}</li>`).join('')}</ul>`); lista = null; };
  let antY = null, antH = corpo;
  let avisou = false;
  for (const l of todas) {
    // linhas de questões, gabaritos e comentários saem do texto: viram questões respondíveis
    if (pular.has(l)) { if (!avisou) { fechaPar(); fechaLista(); out.push('<p class="lt-q-aviso">🎯 As questões deste material estão na aba <b>Questões</b>, para responder. O gabarito aparece depois da resposta.</p>'); avisou = true; } antY = null; continue; }
    const quebra = antY !== null && antY - l.y > Math.max(antH, l.h) * 1.7;
    antY = l.y; antH = l.h;
    if (titulo(l)) { fechaPar(); fechaLista(); out.push(`<h3>${esc(l.t)}</h3>`); if (!primeiro) primeiro = l.t; continue; }
    if (marcador.test(l.t)) { fechaPar(); (lista = lista || []).push(l.t.replace(marcador, '')); continue; }
    if (lista && !quebra && !inicioNovo.test(l.t)) { lista[lista.length - 1] = junta(lista[lista.length - 1], l.t); continue; }
    fechaLista();
    if (!par || quebra || inicioNovo.test(l.t) || /[.:;!?]$/.test(par) && /^[A-ZÀ-Ú]/.test(l.t) && l.t.length < 60) { fechaPar(); par = l.t; }
    else par = junta(par, l.t);
  }
  fechaPar(); fechaLista();
  return { html: out.join('\n'), texto: todas.map((l) => l.t).join('\n'), titulo: primeiro };
}
const junta = (a, b) => (/[a-zà-ú]-$/i.test(a) ? a.slice(0, -1) + b : a + ' ' + b);
const negrito = (t) => t.replace(/^(Art\.?\s*\d+[º°o]?(?:-[A-Z])?\.?|§\s*\d+[º°o]?\.?|Par[aá]grafo [uú]nico\.?)/, '<b>$1</b>');

// Limpa o HTML editado na prévia: só tags de texto, sem atributos (evita script e estilos estranhos).
const PERMITIDAS = new Set(['H3', 'H4', 'P', 'UL', 'OL', 'LI', 'B', 'STRONG', 'I', 'EM', 'U', 'BR', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD', 'BLOCKQUOTE']);
function limpar(html) {
  const tpl = document.createElement('template'); tpl.innerHTML = html;
  const anda = (n) => {
    for (const c of [...n.childNodes]) {
      if (c.nodeType === 1) {
        anda(c);
        if (!PERMITIDAS.has(c.tagName)) {
          if (['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT'].includes(c.tagName)) c.remove();
          else if (c.tagName === 'DIV') { const p = document.createElement('p'); p.append(...c.childNodes); c.replaceWith(p); }
          else c.replaceWith(...c.childNodes);
        } else for (const a of [...c.attributes]) if (!(a.name === 'class' && a.value === 'lt-q-aviso')) c.removeAttribute(a.name);
      } else if (c.nodeType !== 3) c.remove();
    }
  };
  anda(tpl.content);
  if (tpl.content.querySelector('table')) tpl.content.querySelectorAll('table').forEach((t) => t.setAttribute('class', 'tab'));
  return tpl.innerHTML.replace(/<p>\s*(<br>)?\s*<\/p>/g, '').trim();
}

// ---------- sugestão de matéria e tópico ----------
function sugerir(texto, nomeArquivo) {
  const t = ' ' + norm(nomeArquivo.replace(/[_\-.]+/g, ' ') + ' ' + texto.slice(0, 60000)) + ' ';
  const conta = (k) => { if (!k || k.length < 4) return 0; let n = 0, i = 0; while ((i = t.indexOf(k, i)) >= 0 && n < 50) { n++; i += k.length; } return n; };
  let melhor = null;
  for (const m of comConteudos(MATERIAS_TODAS)) {
    let pm = conta(norm(m.nome)) * 3 + (m.apelidos || []).reduce((s, a) => s + conta(a) * 2, 0);
    let ma = null;
    for (const a of m.assuntos) {
      const pa = (a.chaves || []).reduce((s, k) => s + conta(k) * Math.min(4, k.split(' ').length), 0) + conta(norm(a.titulo)) * 4;
      pm += pa;
      if (pa && (!ma || pa > ma.p)) ma = { id: a.id, p: pa };
    }
    if (pm && (!melhor || pm > melhor.p)) melhor = { id: m.id, p: pm, assunto: ma?.id || '' };
  }
  return melhor;
}

// ---------- tela ----------
export function conteudoPdf(box) {
  let lido = null;
  const desenha = () => {
    const lista = (S.conteudos || []).slice().reverse();
    const mats = comConteudos(MATERIAS_TODAS);
    box.innerHTML = `<div class="row"><h3 style="margin:0">📄 Conteúdo em PDF</h3></div>
      <p class="muted" style="font-size:13px">Envie um PDF de conteúdo (lei, apostila, diretriz). O app lê o texto, sugere a matéria e o tópico, e você confirma.
      Ao confirmar, o texto vai para a leitura da matéria: vira um <b>tópico novo</b> ou <b>complementa</b> um tópico que já existe. Nos tópicos “em produção”, o aviso é trocado pelo texto.</p>
      <label class="btn" style="margin:0">Escolher PDF<input type="file" id="pdfF" accept="application/pdf,.pdf" hidden></label>
      <span class="muted" id="pdfSt" style="margin-left:8px;font-size:13px"></span>
      <div id="pdfForm"></div>
      <h3 style="margin-top:18px">Conteúdos enviados (${lista.length})</h3>
      ${lista.length ? `<div style="overflow-x:auto"><table class="tab"><tr><th>Matéria</th><th>Tópico</th><th>Enviado em</th><th></th></tr>
        ${lista.map((c) => { const m = mats.find((x) => x.id === c.materia_id); const a = c.assunto_id ? m?.assuntos.find((x) => x.id === c.assunto_id) : null;
          return `<tr><td>${esc(m?.nome || c.materia_nome || c.materia_id)}</td><td>${a ? 'Complemento de <b>' + esc(a.titulo) + '</b>: ' : '<b>Tópico novo:</b> '}${esc(c.titulo)}</td>
          <td>${c.created_at ? new Date(c.created_at).toLocaleDateString('pt-BR') : ''}</td>
          <td style="white-space:nowrap"><a class="btn mini sec" href="#/leitura?a=${encodeURIComponent(c.materia_id)}/${encodeURIComponent(c.assunto_id || 'pdf-' + c.id)}">Ver</a> <button class="btn mini sec" data-apaga="${c.id}">Remover</button></td></tr>`; }).join('')}</table></div>`
        : '<p class="muted">Nenhum conteúdo enviado ainda.</p>'}`;
    box.querySelector('#pdfF').onchange = (e) => abrir(e.target.files[0]);
    box.querySelectorAll('[data-apaga]').forEach((b) => (b.onclick = async () => {
      if (!confirm('Remover este conteúdo da leitura? O texto sai da matéria para todos os alunos.')) return;
      const c = S.conteudos.find((x) => x.id === b.dataset.apaga);
      try {
        await db.remove('conteudos', { id: 'eq.' + c.id });
        if (c.arquivo) storage.remove('conteudos', c.arquivo).catch(() => {});
        S.conteudos = S.conteudos.filter((x) => x.id !== c.id); toast('Conteúdo removido.'); desenha();
      } catch (er) { toast(er.message, 'erro'); }
    }));
    if (lido) formulario();
  };

  const abrir = async (file) => {
    if (!file) return;
    if (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf') return toast('Escolha um arquivo PDF.', 'erro');
    if (file.size > 40 * 1024 * 1024) return toast('PDF muito grande (máximo 40 MB). Divida em partes.', 'erro');
    const st = box.querySelector('#pdfSt');
    try {
      st.textContent = 'Abrindo o PDF…';
      const { paginas } = await lerPdf(await file.arrayBuffer(), (n, t) => (st.textContent = `Lendo página ${n} de ${t}…`));
      const achou = acharQuestoes(paginas);
      const pular = new Set([...achou.usadas, ...achou.esconder]);
      const r = montarHtml(paginas, pular);
      r.texto = paginas.flat().map((l) => l.t).join('\n');
      if (r.texto.replace(/\s/g, '').length < 200) { st.textContent = ''; return toast('Não encontrei texto neste PDF. Ele parece ser escaneado (imagem). Envie um PDF com texto selecionável.', 'erro'); }
      const sug = sugerir(r.texto, file.name);
      lido = { file, ...r, sug, paginas: paginas.length, questoes: achou.questoes };
      st.textContent = `${file.name} · ${paginas.length} páginas lidas`;
      formulario();
    } catch (er) { st.textContent = ''; toast('Não consegui ler o PDF: ' + er.message, 'erro'); }
  };

  const formulario = () => {
    const f = box.querySelector('#pdfForm');
    const mats = comConteudos(MATERIAS_TODAS);
    const sm = lido.sug?.id || '';
    const tituloPadrao = (lido.titulo || lido.file.name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ')).slice(0, 140);
    f.innerHTML = `<div class="card" style="margin-top:12px;background:var(--hero)">
      <div class="row"><div class="campo" style="flex:2;min-width:220px"><label>Matéria ${sm ? '<span class="pill">sugerida pelo app</span>' : ''}</label>
        <select id="pM" style="width:100%"><option value="">— escolha a matéria —</option>${mats.map((m) => `<option value="${esc(m.id)}" ${m.id === sm ? 'selected' : ''}>${esc(m.nome)}</option>`).join('')}<option value="__nova">➕ Nova matéria…</option></select></div>
        <div class="campo" style="flex:2;min-width:220px" id="pNovaBox" hidden><label>Nome da nova matéria</label><input id="pNova" style="width:100%" placeholder="Ex.: Direito Tributário"></div></div>
      <div class="campo" id="pCursosBox" hidden><label>Cursos que vão receber a nova matéria</label>
        <div class="row" style="flex-wrap:wrap;gap:6px 14px">${CURSOS.map((c) => `<label style="font-size:14px"><input type="checkbox" value="${c.id}" class="pCur"> ${esc(c.curto)}</label>`).join('')}</div>
        <p class="muted" style="font-size:12.5px;margin:4px 0 0">Sem curso marcado, a matéria aparece só para quem não tem curso definido.</p></div>
      <div class="campo"><label>Destino</label>
        <div class="row" style="gap:16px"><label><input type="radio" name="pDest" value="novo" checked> Criar tópico novo</label><label><input type="radio" name="pDest" value="comp"> Complementar um tópico</label></div></div>
      <div class="campo" id="pTopBox" hidden><label>Tópico que será complementado</label><select id="pTop" style="width:100%"></select></div>
      <div class="campo"><label id="pTitL">Título do tópico novo</label><input id="pTit" style="width:100%" value="${esc(tituloPadrao)}"></div>
      <div class="campo"><label>Prévia do texto <span class="muted" style="font-weight:400">(você pode corrigir direto aqui antes de confirmar)</span></label>
        <div id="pPrev" class="lt-corpo" contenteditable="true" style="max-height:420px;overflow:auto;border:1px solid var(--borda);border-radius:12px;padding:12px 14px;background:var(--card);font-size:15px">${lido.html}</div></div>
      <div id="pQs"></div>
      <div class="row"><button class="btn sec" id="pCanc">Cancelar</button><span class="sp"></span><button class="btn verde" id="pOk">Confirmar e enviar para a matéria</button></div></div>`;
    const $ = (q) => f.querySelector(q);
    const escolhidas = painelQuestoes($('#pQs'), lido.questoes || [], esc);
    const atualiza = () => {
      const mid = $('#pM').value, nova = mid === '__nova', comp = f.querySelector('[name=pDest]:checked').value === 'comp';
      $('#pNovaBox').hidden = !nova; $('#pCursosBox').hidden = !nova;
      f.querySelector('[name=pDest][value=comp]').disabled = nova || !mid;
      if (nova || !mid) f.querySelector('[name=pDest][value=novo]').checked = true;
      const m = mats.find((x) => x.id === mid);
      const usaComp = !nova && m && f.querySelector('[name=pDest]:checked').value === 'comp';
      $('#pTopBox').hidden = !usaComp;
      if (usaComp && !$('#pTop').options.length) {
        $('#pTop').innerHTML = m.assuntos.map((a) => `<option value="${esc(a.id)}" ${a.id === lido.sug?.assunto && m.id === lido.sug?.id ? 'selected' : ''}>${esc(a.titulo)}${/lt-producao/.test(a.html) ? ' · em produção' : ''}</option>`).join('');
      }
      $('#pTitL').textContent = usaComp ? 'Título do complemento' : 'Título do tópico novo';
      void comp;
    };
    $('#pM').onchange = () => { $('#pTop').innerHTML = ''; atualiza(); };
    f.querySelectorAll('[name=pDest]').forEach((r) => (r.onchange = atualiza));
    // se o app achou um tópico parecido, já sugere complementar
    if (lido.sug?.assunto) { f.querySelector('[name=pDest][value=comp]').checked = true; }
    atualiza();
    $('#pCanc').onclick = () => { lido = null; f.innerHTML = ''; box.querySelector('#pdfSt').textContent = ''; };
    $('#pOk').onclick = async (ev) => {
      const mid = $('#pM').value, nova = mid === '__nova';
      const nomeNova = $('#pNova')?.value.trim();
      if (!mid) return toast('Escolha a matéria.', 'erro');
      if (nova && !nomeNova) return toast('Escreva o nome da nova matéria.', 'erro');
      const comp = !nova && f.querySelector('[name=pDest]:checked').value === 'comp';
      const titulo = $('#pTit').value.trim();
      if (!titulo) return toast('Escreva o título.', 'erro');
      const html = limpar($('#pPrev').innerHTML);
      const quiz = escolhidas().map((q) => paraQuiz(q, titulo));
      if (html.replace(/<[^>]+>/g, '').trim().length < 50 && !quiz.length) return toast('O texto ficou vazio.', 'erro');
      let materiaId = mid;
      if (nova) {
        const base = 'pdf-' + norm(nomeNova).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
        const existente = mats.find((x) => x.id === base || norm(x.nome) === norm(nomeNova));
        materiaId = existente ? existente.id : base;
      }
      const m = mats.find((x) => x.id === materiaId);
      const reg = { ativo: true, materia_id: materiaId, materia_nome: nova ? nomeNova : m?.nome || null, assunto_id: comp ? $('#pTop').value : null, titulo, html, quiz,
        cursos: nova ? [...f.querySelectorAll('.pCur:checked')].map((x) => x.value) : [] };
      ev.target.disabled = true; ev.target.textContent = 'Enviando…';
      try {
        try {
          const caminho = `${Date.now()}-${lido.file.name.replace(/[^\w.-]/g, '_')}`;
          await storage.upload('conteudos', caminho, lido.file);
          reg.arquivo = caminho;
        } catch { /* o PDF original é só cópia de segurança; o texto vai mesmo assim */ }
        const [novo] = await db.insert('conteudos', [reg]);
        S.conteudos = [...(S.conteudos || []), novo || reg];
        toast((comp ? 'Pronto! O tópico foi complementado.' : 'Pronto! O tópico novo já está na leitura da matéria.') + (quiz.length ? ` ${quiz.length} questões viraram respondíveis.` : ''));
        lido = null; desenha();
      } catch (er) { toast(er.message, 'erro'); ev.target.disabled = false; ev.target.textContent = 'Confirmar e enviar para a matéria'; }
    };
  };

  desenha();
}
