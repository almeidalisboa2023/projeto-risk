// Leitura interativa: textos por matéria, em ordem de estudo, ligados ao calendário.
import { S } from '../state.js';
import { esc } from '../util.js';
import { MATERIAS } from '../leitura/index.js';

const chave = () => 'risk-lidos-' + (S.user?.id || 'x');
const lidos = () => { try { return new Set(JSON.parse(localStorage.getItem(chave()) || '[]')); } catch { return new Set(); } };
const salvaLidos = (s) => { try { localStorage.setItem(chave(), JSON.stringify([...s])); } catch {} };
let fonte = (() => { try { return Number(localStorage.getItem('risk-fonte')) || 17; } catch { return 17; } })();

export async function render(el, q) {
  const [mid, aid] = String(q?.get('a') || '').split('/');
  const mat = MATERIAS.find((m) => m.id === mid) || MATERIAS[0];
  const idx = Math.max(0, mat.assuntos.findIndex((a) => a.id === aid));
  const a = mat.assuntos[idx];
  const L = lidos();
  const feitos = mat.assuntos.filter((x) => L.has(mat.id + '/' + x.id)).length;
  const k = mat.id + '/' + a.id;
  const ir = (i) => `#/leitura?a=${mat.id}/${mat.assuntos[i].id}`;

  el.innerHTML = `<div class="mono up">Leitura interativa</div><h1>${esc(mat.nome)}</h1>
  <div class="lt-wrap">
    <aside class="card lt-indice">
      ${MATERIAS.length > 1 ? `<select id="ltMat">${MATERIAS.map((m) => `<option value="${m.id}" ${m.id === mat.id ? 'selected' : ''}>${esc(m.nome)}</option>`).join('')}</select>` : ''}
      <div class="mono up" style="margin:4px 0 6px">Ordem de estudo · ${feitos}/${mat.assuntos.length} lidos</div>
      <div class="bar" style="margin-bottom:10px"><div class="bar-in" style="width:${Math.round((feitos / mat.assuntos.length) * 100)}%"></div></div>
      <select id="ltSel" class="lt-sel-mob">${mat.assuntos.map((x, i) => `<option value="${i}" ${i === idx ? 'selected' : ''}>${i + 1}. ${esc(x.titulo)}</option>`).join('')}</select>
      <ol class="lt-lista">${mat.assuntos.map((x, i) => `<li class="${i === idx ? 'on' : ''} ${L.has(mat.id + '/' + x.id) ? 'lido' : ''}"><a href="${ir(i)}">${esc(x.titulo)}</a></li>`).join('')}</ol>
    </aside>
    <article class="card lt-texto">
      <div class="row"><span class="pill">${idx + 1} de ${mat.assuntos.length}</span><span class="pill">${esc(a.arts)}</span><span class="sp"></span>
        <button class="btn sec mini" id="ltMenos" title="Diminuir letra">A−</button><button class="btn sec mini" id="ltMais" title="Aumentar letra">A+</button></div>
      <h2 style="margin:10px 0 4px">${esc(a.titulo)}</h2>
      <div class="lt-corpo" style="font-size:${fonte}px">${a.html}</div>
      ${a.quiz?.length ? `<div class="lt-quiz"><h3>🎯 Teste seu conhecimento</h3><p class="muted" style="margin-top:0">Julgue os itens a seguir como <b>Certo</b> ou <b>Errado</b>, no estilo Cebraspe.</p>
        ${a.quiz.map((x, i) => `<div class="lt-q" data-q="${i}"><p><span class="mono">${i + 1}.</span> ${esc(x.p)}</p>
          <div class="row"><button class="btn sec mini" data-r="1">Certo</button><button class="btn sec mini" data-r="0">Errado</button></div><div class="lt-q-res"></div></div>`).join('')}</div>` : ''}
      <p class="muted" style="font-size:13px;margin-top:18px">Resumo do Projeto R.I.S.K. para revisão. Confira sempre a <a href="${mat.lei}" target="_blank" rel="noopener">lei seca atualizada no Planalto</a>.</p>
      <div class="row" style="margin-top:12px">
        <button class="btn ${L.has(k) ? 'sec' : ''}" id="ltLido">${L.has(k) ? '✓ Lido (desmarcar)' : 'Marcar como lido'}</button><span class="sp"></span>
        ${idx > 0 ? `<a class="btn sec" href="${ir(idx - 1)}">‹ Anterior</a>` : ''}${idx < mat.assuntos.length - 1 ? `<a class="btn sec" href="${ir(idx + 1)}">Próximo ›</a>` : ''}
      </div>
    </article>
  </div>`;

  const $ = (s) => el.querySelector(s);
  const fonteAjusta = (d) => { fonte = Math.min(24, Math.max(14, fonte + d)); try { localStorage.setItem('risk-fonte', fonte); } catch {} $('.lt-corpo').style.fontSize = fonte + 'px'; };
  $('#ltMenos').onclick = () => fonteAjusta(-1);
  $('#ltMais').onclick = () => fonteAjusta(1);
  $('#ltSel').onchange = () => { location.hash = ir(Number($('#ltSel').value)); };
  if ($('#ltMat')) $('#ltMat').onchange = () => { location.hash = `#/leitura?a=${$('#ltMat').value}/`; };
  el.querySelectorAll('.lt-q').forEach((box) => {
    const x = a.quiz[Number(box.dataset.q)];
    box.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => {
      const ok = (b.dataset.r === '1') === x.c;
      box.querySelectorAll('[data-r]').forEach((y) => { y.disabled = true; y.classList.toggle('lt-marcado', y === b); });
      box.classList.add(ok ? 'ok' : 'erro');
      box.querySelector('.lt-q-res').innerHTML = `<b>${ok ? '✅ Você acertou!' : '❌ Não foi dessa vez.'}</b> Gabarito: <b>${x.c ? 'CERTO' : 'ERRADO'}</b>. ${esc(x.e)}<div><button class="linkbtn" data-de-novo>Responder de novo</button></div>`;
      box.querySelector('[data-de-novo]').onclick = () => { box.classList.remove('ok', 'erro'); box.querySelector('.lt-q-res').innerHTML = ''; box.querySelectorAll('[data-r]').forEach((y) => { y.disabled = false; y.classList.remove('lt-marcado'); }); };
    }));
  });
  $('#ltLido').onclick = () => { const s = lidos(); s.has(k) ? s.delete(k) : s.add(k); salvaLidos(s); render(el, q); };
}
