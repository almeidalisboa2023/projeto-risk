// Leitura interativa: quadro colorido de matérias → índice de tópicos → texto com questões. Aberta a todos os alunos.
import { S } from '../state.js';
import { esc, norm } from '../util.js';
import { MATERIAS, materiasDe } from '../leitura/index.js';

const ler = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const gravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const chave = () => 'risk-lidos-' + (S.user?.id || 'x');
const lidos = () => new Set(ler(chave(), []));
let fonte = ler('risk-fonte', 17);

export async function render(el, q) {
  const [mid, aid] = String(q?.get('a') || '').split('/');
  const mat = MATERIAS.find((m) => m.id === mid);
  if (!mat) return quadro(el);
  let idx = mat.assuntos.findIndex((a) => a.id === aid);
  if (idx < 0) idx = Math.max(0, mat.assuntos.findIndex((a) => a.id === ler('risk-ultimo-' + mat.id, '')));
  gravar('risk-ultimo-' + mat.id, mat.assuntos[idx].id);
  leitura(el, q, mat, idx);
}

// Matérias que aparecem no edital atual do aluno (qualquer edital)
function doMeuEdital() {
  const ids = new Set();
  for (const t of S.topicos || []) for (const m of materiasDe(t.materia)) ids.add(m.id);
  return ids;
}

function quadro(el) {
  const L = lidos(), meu = doMeuEdital();
  const ordem = [...MATERIAS].sort((a, b) => (meu.has(b.id) ? 1 : 0) - (meu.has(a.id) ? 1 : 0));
  el.innerHTML = `<div class="mono up">Leitura interativa</div><h1>Escolha a matéria</h1>
  <p class="muted" style="margin-top:-6px">Textos completos, com quadros, exemplos, pegadinhas e questões no fim de cada tópico. ${meu.size ? 'As matérias do seu edital aparecem primeiro.' : ''}</p>
  <div class="lt-materias">${ordem.map((m) => {
    const feitos = m.assuntos.filter((a) => L.has(m.id + '/' + a.id)).length, p = Math.round((feitos / m.assuntos.length) * 100);
    return `<a class="lt-mat" href="#/leitura?a=${m.id}/" style="--c:${m.cor}">
      <span class="lt-mat-ico">${m.ico}</span><b>${esc(m.nome)}</b>
      <small>${m.assuntos.length} tópicos · ${feitos} lidos</small>
      <div class="lt-mat-bar"><div style="width:${p}%"></div></div>
      ${meu.has(m.id) ? '<span class="lt-mat-tag">No seu edital</span>' : ''}</a>`;
  }).join('')}</div>`;
}

function leitura(el, q, mat, idx) {
  const a = mat.assuntos[idx], L = lidos(), k = mat.id + '/' + a.id;
  const feitos = mat.assuntos.filter((x) => L.has(mat.id + '/' + x.id)).length;
  const ir = (i) => `#/leitura?a=${mat.id}/${mat.assuntos[i].id}`;
  el.innerHTML = `<div class="row"><a class="btn sec mini" href="#/leitura">‹ Todas as matérias</a></div>
  <div class="lt-cab" style="--c:${mat.cor}"><span>${mat.ico}</span><div><div class="mono up">Leitura interativa</div><h1 style="margin:0">${esc(mat.nome)}</h1></div></div>
  <div class="lt-wrap" style="--c:${mat.cor}">
    <aside class="card lt-indice">
      <div class="mono up" style="margin:4px 0 6px">Ordem de estudo · ${feitos}/${mat.assuntos.length} lidos</div>
      <div class="lt-mat-bar" style="margin-bottom:10px"><div style="width:${Math.round((feitos / mat.assuntos.length) * 100)}%"></div></div>
      <select id="ltSel" class="lt-sel-mob">${mat.assuntos.map((x, i) => `<option value="${i}" ${i === idx ? 'selected' : ''}>${i + 1}. ${esc(x.titulo)}${L.has(mat.id + '/' + x.id) ? ' ✓' : ''}</option>`).join('')}</select>
      <ol class="lt-lista">${mat.assuntos.map((x, i) => `<li class="${i === idx ? 'on' : ''} ${L.has(mat.id + '/' + x.id) ? 'lido' : ''}"><a href="${ir(i)}">${esc(x.titulo)}</a></li>`).join('')}</ol>
    </aside>
    <article class="card lt-texto">
      <div class="row"><span class="pill">${idx + 1} de ${mat.assuntos.length}</span><span class="pill">${esc(a.arts || '')}</span><span class="sp"></span>
        <button class="btn sec mini" id="ltMenos" title="Diminuir letra">A−</button><button class="btn sec mini" id="ltMais" title="Aumentar letra">A+</button></div>
      <h2 style="margin:10px 0 4px">${esc(a.titulo)}</h2>
      <div class="lt-corpo" style="font-size:${fonte}px">${a.html}</div>
      ${a.quiz?.length ? `<div class="lt-quiz"><h3>🎯 Teste seu conhecimento</h3><p class="muted" style="margin-top:0">Julgue os itens como <b>Certo</b> ou <b>Errado</b>. <span id="ltPlacar"></span></p>
        ${a.quiz.map((x, i) => `<div class="lt-q" data-q="${i}"><p><span class="mono">${i + 1}.</span> ${esc(x.p)}</p>
          <div class="row"><button class="btn sec mini" data-r="1">Certo</button><button class="btn sec mini" data-r="0">Errado</button></div><div class="lt-q-res"></div></div>`).join('')}</div>` : ''}
      ${mat.lei ? `<p class="muted" style="font-size:13px;margin-top:18px">Material de estudo do Projeto R.I.S.K. Confira sempre o <a href="${mat.lei}" target="_blank" rel="noopener">texto oficial atualizado</a>.</p>` : ''}
      <div class="row" style="margin-top:12px">
        <button class="btn ${L.has(k) ? 'sec' : ''}" id="ltLido">${L.has(k) ? '✓ Lido (desmarcar)' : 'Marcar como lido'}</button><span class="sp"></span>
        ${idx > 0 ? `<a class="btn sec" href="${ir(idx - 1)}">‹ Anterior</a>` : ''}${idx < mat.assuntos.length - 1 ? `<a class="btn sec" href="${ir(idx + 1)}">Próximo ›</a>` : ''}
      </div>
    </article>
  </div>`;

  const $ = (s) => el.querySelector(s);
  const fonteAjusta = (d) => { fonte = Math.min(24, Math.max(14, fonte + d)); gravar('risk-fonte', fonte); $('.lt-corpo').style.fontSize = fonte + 'px'; };
  $('#ltMenos').onclick = () => fonteAjusta(-1);
  $('#ltMais').onclick = () => fonteAjusta(1);
  $('#ltSel').onchange = () => { location.hash = ir(Number($('#ltSel').value)); };
  let certos = 0, feitas = 0;
  const placar = () => { const p = $('#ltPlacar'); if (p) p.textContent = feitas ? `Placar: ${certos}/${feitas}` : ''; };
  el.querySelectorAll('.lt-q').forEach((box) => {
    const x = a.quiz[Number(box.dataset.q)];
    box.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => {
      const ok = (b.dataset.r === '1') === x.c;
      feitas++; if (ok) certos++; placar();
      box.querySelectorAll('[data-r]').forEach((y) => { y.disabled = true; y.classList.toggle('lt-marcado', y === b); });
      box.classList.add(ok ? 'ok' : 'erro');
      box.querySelector('.lt-q-res').innerHTML = `<b>${ok ? '✅ Você acertou!' : '❌ Não foi dessa vez.'}</b> Gabarito: <b>${x.c ? 'CERTO' : 'ERRADO'}</b>. ${esc(x.e)}<div><button class="linkbtn" data-de-novo>Responder de novo</button></div>`;
      box.querySelector('[data-de-novo]').onclick = () => { feitas--; if (ok) certos--; placar(); box.classList.remove('ok', 'erro'); box.querySelector('.lt-q-res').innerHTML = ''; box.querySelectorAll('[data-r]').forEach((y) => { y.disabled = false; y.classList.remove('lt-marcado'); }); };
    }));
  });
  $('#ltLido').onclick = () => { const s = lidos(); s.has(k) ? s.delete(k) : s.add(k); gravar(chave(), [...s]); render(el, q); };
}
