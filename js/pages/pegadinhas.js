// Treino de pegadinhas: junta as pegadinhas de todos os tópicos das matérias do aluno
// (quadros "🪤 Pegadinhas mais cobradas" e "⚠ Pegadinha" da leitura) e transforma em treino.
// O aluno vê a frase do jeito que a banca escreve para pegar e escolhe, entre 4, a correção certa.
import { esc } from '../util.js';
import { visiveis } from '../leitura/index.js';

const ERR_KEY = 'risk-peg-erros';
const ler = () => { try { return new Set(JSON.parse(localStorage.getItem(ERR_KEY) || '[]')); } catch { return new Set(); } };
const grava = (s) => { try { localStorage.setItem(ERR_KEY, JSON.stringify([...s].slice(-500))); } catch {} };
const limpa = (s) => String(s || '').replace(/\s+/g, ' ').trim();
const mistura = (v) => { const a = [...v]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// Extrai as pegadinhas do HTML de cada tópico
export function extrair(mats) {
  const pares = [], dicas = [];
  const dp = new DOMParser();
  for (const m of mats) for (const a of m.assuntos || []) {
    const h = (a.html || '') + (a.aprof || '');
    if (!h.includes('lt-peg')) continue;
    const doc = dp.parseFromString(`<div>${h}</div>`, 'text/html');
    const onde = { mid: m.id, aid: a.id, materia: m.nome, topico: a.titulo, ico: m.ico, cor: m.cor };
    doc.querySelectorAll('.lt-pegs li').forEach((li, i) => {
      const b = limpa(li.querySelector('.banca')?.textContent), c = limpa(li.querySelector('.certo')?.textContent);
      if (b && c) pares.push({ id: `${m.id}/${a.id}/${i}`, banca: b, certo: c, ...onde });
    });
    doc.querySelectorAll('.lt-peg').forEach((d) => {
      const t = d.cloneNode(true); t.querySelector('.lt-tit')?.remove();
      const html = t.innerHTML.trim();
      if (html) dicas.push({ html, ...onde });
    });
  }
  return { pares, dicas };
}

export async function render(el, q) {
  const mats = visiveis();
  const { pares, dicas } = extrair(mats);
  const porMat = new Map();
  for (const p of pares) porMat.set(p.mid, (porMat.get(p.mid) || 0) + 1);
  let mid = q?.get('m') || '', modo = 'treino';
  let fila = [], i = 0, acertos = 0, feitas = 0, so = false;
  let erros = ler();

  const opcoes = mats.filter((m) => porMat.get(m.id)).map((m) => `<option value="${m.id}">${m.ico} ${esc(m.nome)} (${porMat.get(m.id)})</option>`).join('');
  el.innerHTML = `<div class="pg-wrap">
    <div class="card"><div class="mono up">Aprender as pegadinhas</div><h2 style="margin:4px 0 6px">🪤 Treino de pegadinhas</h2>
      <p class="muted" style="margin:0 0 12px">As bancas trocam uma palavra (sempre/nunca, pode/deve, crime/contravenção, prazos) e a frase fica errada. Aqui você vê a frase <b>do jeito que a banca escreve para pegar</b> e escolhe, entre quatro, <b>a correção certa</b>. Depois vê a explicação e o tópico onde estudar. As que você errar vão para a revisão.</p>
      <div class="row" style="gap:8px;flex-wrap:wrap">
        <select id="pgM" style="flex:1;min-width:220px"><option value="">Todas as matérias (${pares.length})</option>${opcoes}</select>
        <div class="sm-seg" id="pgModo"><button data-m="treino">Ache a correção</button><button data-m="erros">Revisar as que errei</button><button data-m="dicas">Cartões de alerta</button></div>
      </div></div>
    <div id="pgArea"></div></div>`;
  const sel = el.querySelector('#pgM'); sel.value = porMat.get(mid) ? mid : ''; mid = sel.value;
  const area = el.querySelector('#pgArea');

  const base = () => pares.filter((p) => !mid || p.mid === mid);
  const iniciar = () => {
    acertos = feitas = 0; i = 0; so = modo === 'erros';
    const b = base();
    fila = mistura(so ? b.filter((p) => erros.has(p.id)) : b).map((p) => ({ ...p, ops: opcoes4(p) }));
    desenha();
  };
  const linkTop = (p) => `<a href="#/leitura?a=${p.mid}/${p.aid}">${p.ico || '📖'} ${esc(p.materia)} › ${esc(p.topico)}</a>`;

  const desenha = () => {
    el.querySelectorAll('#pgModo [data-m]').forEach((b) => b.classList.toggle('on', b.dataset.m === modo));
    if (modo === 'dicas') {
      const ds = dicas.filter((d) => !mid || d.mid === mid);
      area.innerHTML = ds.length ? `<div class="pg-dicas">${mistura(ds).slice(0, 40).map((d) => `<div class="card pg-dica"><b class="pg-alerta">⚠ Atenção</b><div>${d.html}</div><small class="muted">${linkTop(d)}</small></div>`).join('')}</div>`
        : '<div class="card"><p class="muted" style="margin:0">Sem cartões de alerta nesta matéria.</p></div>';
      return;
    }
    if (!fila.length) {
      area.innerHTML = `<div class="card"><p class="muted" style="margin:0">${so ? 'Nenhuma pegadinha errada para revisar. 👏 Faça o treino Certo ou Errado primeiro.' : 'Esta matéria ainda não tem pegadinhas no treino.'}</p></div>`;
      return;
    }
    if (i >= fila.length) {
      const p = Math.round((acertos / Math.max(1, feitas)) * 100);
      area.innerHTML = `<div class="card pg-fim"><h3 style="margin:0 0 6px">Fim da rodada</h3><p style="margin:0 0 12px">Você acertou <b>${acertos} de ${feitas}</b> (${p}%). ${erros.size ? `Ficaram <b>${erros.size}</b> para revisar.` : ''}</p>
        <div class="row" style="gap:8px"><button class="btn" id="pgDeNovo">Nova rodada</button>${erros.size ? '<button class="btn sec" id="pgRev">Revisar as que errei</button>' : ''}</div></div>`;
      area.querySelector('#pgDeNovo').onclick = () => { modo = 'treino'; iniciar(); };
      const r = area.querySelector('#pgRev'); if (r) r.onclick = () => { modo = 'erros'; iniciar(); };
      return;
    }
    const p = fila[i];
    area.innerHTML = `<div class="card pg-card">
      <div class="row"><small class="muted">${esc(p.materia)} · ${i + 1} de ${fila.length}</small><span class="sp"></span><small class="mono">✔ ${acertos}/${feitas}</small></div>
      <div class="pg-rot">❌ A banca escreveu (está errado):</div>
      <p class="pg-frase">“${esc(p.banca)}”</p>
      <div class="pg-rot">Qual é a correção?</div>
      <div class="pg-ops">${p.ops.map((o, k) => `<button class="pg-op" data-r="${k}"><b>${'ABCD'[k]}</b> ${esc(o)}</button>`).join('')}</div>
      <div id="pgFb"></div></div>`;
    area.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => responder(+b.dataset.r)));
  };

  const responder = (k) => {
    const p = fila[i];
    const ok = p.ops[k] === p.certo;
    area.querySelectorAll('.pg-op').forEach((b, j) => { if (p.ops[j] === p.certo) b.classList.add('ok'); else if (j === k) b.classList.add('bad'); });
    feitas++; if (ok) acertos++;
    if (ok && so) erros.delete(p.id); if (!ok) erros.add(p.id);
    grava(erros);
    area.querySelectorAll('[data-r]').forEach((b) => (b.disabled = true));
    area.querySelector('#pgFb').innerHTML = `<div class="pg-fb ${ok ? 'ok' : 'bad'}"><b>${ok ? '✅ Acertou!' : '❌ Errou.'}</b> Guarde o par:
      <ul class="pg-par"><li>❌ <span class="banca">${esc(p.banca)}</span></li><li>✅ <span class="certo">${esc(p.certo)}</span></li></ul>
      <small class="muted">Onde estudar: ${linkTop(p)}</small>
      <div style="margin-top:10px"><button class="btn" id="pgProx">Próxima →</button></div></div>`;
    area.querySelector('#pgProx').onclick = () => { i++; desenha(); };
    area.querySelector('#pgProx').focus();
  };

  // 4 opções: a correção certa + 3 correções de outras pegadinhas (de preferência do mesmo tópico ou matéria)
  function opcoes4(p) {
    const viz = (f) => mistura(pares.filter((x) => x.certo !== p.certo && f(x)).map((x) => x.certo));
    const outros = [...new Set([...viz((x) => x.mid === p.mid && x.aid === p.aid), ...viz((x) => x.mid === p.mid), ...viz(() => true)])].slice(0, 3);
    return mistura([p.certo, ...outros]);
  }
  sel.onchange = () => { mid = sel.value; if (modo !== 'dicas') iniciar(); else desenha(); };
  el.querySelectorAll('#pgModo [data-m]').forEach((b) => (b.onclick = () => { modo = b.dataset.m; if (modo === 'dicas') desenha(); else iniciar(); }));
  iniciar();
}
