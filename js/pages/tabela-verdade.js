// Quadro interativo: o aluno monta a tabela-verdade célula por célula e confere.
// Verde = certo, vermelho = errado (com o porquê), amarelo = em branco. Um desafio novo por dia.
import { S } from '../state.js';
import { esc, iso, hoje } from '../util.js';
import { parse, txt, colunas, linhas, ordemVars, ev, VF, porque, regra, nomeOp } from '../logica.js';

const BASICAS = ['~P', 'P ∧ Q', 'P ∨ Q', 'P ⊻ Q', 'P → Q', 'P ↔ Q'];
const chaveLS = () => 'risk-tv-' + (S.user?.id || 'anon');
const lerDias = () => { try { return JSON.parse(localStorage.getItem(chaveLS()) || '{}'); } catch { return {}; } };
const gravarDias = (d) => { try { localStorage.setItem(chaveLS(), JSON.stringify(d)); } catch {} };

// Gerador de fórmulas com semente (o desafio do dia é igual para todos no mesmo dia)
function rng(semente) { let h = 2166136261; for (const c of String(semente)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return () => { h = (Math.imul(h, 1103515245) + 12345) >>> 0; return h / 4294967296; }; }
function gerar(nivel, r) {
  const ops = ['∧', '∨', '→', '↔', '⊻'];
  const pick = (l) => l[Math.floor(r() * l.length)];
  const nv = nivel === 'dificil' ? ['P', 'Q', 'R'] : ['P', 'Q'];
  const folha = (lista) => { const v = pick(lista); return r() < 0.35 ? `~${v}` : v; };
  for (let t = 0; t < 50; t++) {
    let s;
    if (nivel === 'facil') s = `${folha(nv)} ${pick(ops.slice(0, 4))} ${folha(nv)}`;
    else if (nivel === 'medio') s = r() < 0.5 ? `(${folha(nv)} ${pick(ops)} ${folha(nv)}) ${pick(ops)} ${folha(nv)}` : `~(${folha(nv)} ${pick(ops)} ${folha(nv)})`;
    else s = `(${folha(['P', 'Q'])} ${pick(ops)} ${folha(['Q', 'R'])}) ${pick(ops.slice(0, 4))} ${r() < 0.5 ? `(${folha(['P', 'R'])} ${pick(ops)} ${folha(['Q', 'R'])})` : folha(['R', 'P'])}`;
    try {
      const f = parse(s), vs = ordemVars(f);
      // evita fórmulas sem graça, como Q → Q ou P ∧ ~P, em que os dois lados usam a mesma única letra
      const repete = (g) => !g.v && (g.b ? (ordemVars(g.a).length === 1 && ordemVars(g.b).length === 1 && ordemVars(g.a)[0] === ordemVars(g.b)[0]) || repete(g.a) || repete(g.b) : repete(g.a));
      if (vs.length === nv.length && !repete(f) && colunas(f).length >= (nivel === 'facil' ? 1 : 2)) return txt(f);
    } catch {}
  }
  return nivel === 'dificil' ? '(P ∧ Q) → R' : 'P → Q';
}
const NIVEL_DO_DIA = ['facil', 'medio', 'medio', 'dificil', 'medio', 'dificil', 'medio'];

let E = { modo: 'dia', nivel: 'medio', formula: '', auto: false, conferido: false };

export async function render(el) {
  const dias = lerDias(), d0 = iso(hoje());
  const nivelDia = NIVEL_DO_DIA[hoje().getDay()];
  if (E.modo === 'dia') E.formula = gerar(nivelDia, rng('tv' + d0));
  if (E.modo === 'basicas') E.formula = '';
  if (E.modo === 'livre' && !E.formula) E.formula = gerar(E.nivel, Math.random);
  const seq = sequencia(dias);
  const ult7 = [...Array(7)].map((_, i) => { const d = hoje(); d.setDate(d.getDate() - (6 - i)); return d; });
  el.innerHTML = `
  <div class="tvq">
    <div class="tvq-hero">
      <div><div class="mono up">Raciocínio Lógico · treino diário</div><h1>Quadro de tabela-verdade</h1>
        <p class="muted">Monte a tabela célula por célula, sem olhar a cola. Clique numa célula para alternar entre <b>V</b>, <b>F</b> e vazio (ou use as teclas <b>V</b> e <b>F</b> e as setas). Depois clique em <b>Conferir</b>: o que estiver certo fica verde, o errado fica vermelho e você vê o porquê.</p></div>
      <div class="tvq-seq"><div class="tvq-fogo">🔥 <b>${seq}</b><small>dia${seq === 1 ? '' : 's'} seguido${seq === 1 ? '' : 's'}</small></div>
        <div class="tvq-dias">${ult7.map((d) => `<span class="${dias[iso(d)] ? 'feito' : ''} ${iso(d) === d0 ? 'hoje' : ''}" title="${d.toLocaleDateString('pt-BR')}">${'DSTQQSS'[d.getDay()]}</span>`).join('')}</div>
        <small class="muted">${Object.keys(dias).length} dia(s) com tabela perfeita</small></div>
    </div>
    <div class="tvq-abas">
      <button data-modo="dia" class="${E.modo === 'dia' ? 'ativo' : ''}">📅 Desafio do dia</button>
      <button data-modo="basicas" class="${E.modo === 'basicas' ? 'ativo' : ''}">🧠 Tabelas básicas (decorar)</button>
      <button data-modo="livre" class="${E.modo === 'livre' ? 'ativo' : ''}">🎲 Treino livre</button>
    </div>
    <div class="card tvq-card">
      <div class="tvq-topo">
        ${E.modo === 'dia' ? `<div><small class="muted">Desafio de ${hoje().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })} · nível ${{ facil: 'fácil', medio: 'médio', dificil: 'difícil' }[nivelDia]}</small><div class="tvq-f">${esc(E.formula)}</div></div>`
          : E.modo === 'basicas' ? '<div><small class="muted">Os cinco conectivos e a negação, lado a lado. Quem decora esta tabela resolve metade das questões de lógica.</small><div class="tvq-f">~P · P ∧ Q · P ∨ Q · P ⊻ Q · P → Q · P ↔ Q</div></div>'
          : `<div class="tvq-livre"><select id="tvNivel"><option value="facil" ${E.nivel === 'facil' ? 'selected' : ''}>Fácil · 2 letras, 1 conectivo</option><option value="medio" ${E.nivel === 'medio' ? 'selected' : ''}>Médio · 2 letras, 2 conectivos</option><option value="dificil" ${E.nivel === 'dificil' ? 'selected' : ''}>Difícil · 3 letras</option></select>
              <button class="btn sec mini" id="tvNova">🎲 Nova fórmula</button>
              <input id="tvSua" placeholder="ou digite a sua: (P → Q) ∧ ~R" value=""><button class="btn sec mini" id="tvUsar">Usar</button>
              <div class="tvq-f">${esc(E.formula)}</div></div>`}
        <div class="tvq-tecl">${['~', '∧', '∨', '⊻', '→', '↔'].map((o) => `<span title="${esc(nomeOp(o))}">${o}</span>`).join('')}</div>
      </div>
      <label class="check tvq-auto"><input type="checkbox" id="tvAuto" ${E.auto ? 'checked' : ''}> Já preencher as colunas das letras (P, Q, R)</label>
      <div id="tvGrade"></div>
      <div class="row tvq-bts"><button class="btn" id="tvConf">✔ Conferir</button><button class="btn sec" id="tvLimpar">Limpar</button><button class="btn sec" id="tvVer">Mostrar resposta</button><span class="sp"></span><span class="muted" id="tvCont"></span></div>
      <div id="tvMsg" aria-live="polite"></div>
    </div>
    <details class="card tvq-cola"><summary>📌 Cola rápida dos conectivos (abra só se travar)</summary>
      <ul>${['~', '∧', '∨', '⊻', '→', '↔'].map((o) => `<li><b>${o} ${esc(nomeOp(o))}</b>: ${esc(regra(o))}.</li>`).join('')}</ul>
      <p class="muted">Ordem das letras: com 2 letras, P = V V F F e Q = V F V F. Com 3 letras, P = 4 V e 4 F; Q = 2 V, 2 F, 2 V, 2 F; R alterna V, F.</p></details>
  </div>`;

  el.querySelectorAll('[data-modo]').forEach((b) => (b.onclick = () => { E.modo = b.dataset.modo; E.conferido = false; if (E.modo === 'livre') E.formula = ''; render(el); }));
  const nv = el.querySelector('#tvNivel'); if (nv) nv.onchange = () => { E.nivel = nv.value; E.formula = gerar(E.nivel, Math.random); render(el); };
  const nova = el.querySelector('#tvNova'); if (nova) nova.onclick = () => { E.formula = gerar(E.nivel, Math.random); render(el); };
  const usar = el.querySelector('#tvUsar'); if (usar) usar.onclick = () => {
    const v = el.querySelector('#tvSua').value.trim();
    try { const f = parse(v); if (ordemVars(f).length > 4) throw new Error(); E.formula = txt(f); render(el); } catch { el.querySelector('#tvMsg').innerHTML = '<div class="tvq-aviso erro">Não entendi essa fórmula. Use letras P, Q, R, S e os símbolos ~ ∧ ∨ ⊻ → ↔ (pode copiar dos botões acima), com parênteses.</div>'; }
  };
  el.querySelector('#tvAuto').onchange = (e) => { E.auto = e.target.checked; montar(el); };
  montar(el);
}

function sequencia(dias) { let n = 0; const d = hoje(); if (!dias[iso(d)]) d.setDate(d.getDate() - 1); while (dias[iso(d)]) { n++; d.setDate(d.getDate() - 1); } return n; }

// Colunas da tabela: letras + subfórmulas (no modo básico, os seis conectivos)
function estrutura() {
  if (E.modo === 'basicas') { const fs = BASICAS.map((s) => parse(s)); return { vs: ['P', 'Q'], cols: fs.map((f) => ({ f, t: txt(f) })) }; }
  const f = parse(E.formula); return { vs: ordemVars(f), cols: colunas(f).map((g) => ({ f: g, t: txt(g) })) };
}

function montar(el) {
  const { vs, cols } = estrutura(), L = linhas(vs);
  const box = el.querySelector('#tvGrade');
  box.innerHTML = `<div class="tv-wrap"><table class="tv tvq-grade"><thead><tr><th class="tv-n">#</th>${vs.map((v) => `<th class="tv-v">${v}</th>`).join('')}${cols.map((c, j) => `<th class="${j === cols.length - 1 && E.modo !== 'basicas' ? 'tv-base' : ''}">${esc(c.t)}</th>`).join('')}</tr></thead>
    <tbody>${L.map((val, i) => `<tr><td class="tv-n">${i + 1}</td>${vs.map((v) => (E.auto ? `<td class="tv-v ${val[v] ? 'tv-t' : 'tv-f'}">${VF(val[v])}</td>` : `<td><button class="tvq-c" data-l="${i}" data-c="v:${v}" aria-label="Linha ${i + 1}, coluna ${v}"></button></td>`)).join('')}${cols.map((c, j) => `<td><button class="tvq-c" data-l="${i}" data-c="f:${j}" aria-label="Linha ${i + 1}, coluna ${esc(c.t)}"></button></td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const cels = [...box.querySelectorAll('.tvq-c')];
  const cont = () => { const n = cels.filter((c) => c.textContent).length; el.querySelector('#tvCont').textContent = `${n} de ${cels.length} células preenchidas`; };
  const marcar = (c, v) => { c.textContent = v; c.className = 'tvq-c' + (v ? ' tem' : ''); c.removeAttribute('title'); cont(); };
  cels.forEach((c, k) => {
    c.onclick = () => marcar(c, c.textContent === '' ? 'V' : c.textContent === 'V' ? 'F' : '');
    c.onkeydown = (e) => {
      const k2 = e.key.toUpperCase();
      if (k2 === 'V' || k2 === 'F') { marcar(c, k2); (cels[k + 1] || c).focus(); e.preventDefault(); }
      else if (e.key === 'Backspace' || e.key === 'Delete') { marcar(c, ''); e.preventDefault(); }
      else if (e.key === 'ArrowRight') (cels[k + 1] || c).focus();
      else if (e.key === 'ArrowLeft') (cels[k - 1] || c).focus();
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { const porLinha = cels.length / L.length; const alvo = cels[k + (e.key === 'ArrowDown' ? porLinha : -porLinha)]; if (alvo) { alvo.focus(); e.preventDefault(); } }
    };
  });
  cont();
  el.querySelector('#tvMsg').innerHTML = '';
  el.querySelector('#tvLimpar').onclick = () => { delete box.dataset.revelado; cels.forEach((c) => marcar(c, '')); el.querySelector('#tvMsg').innerHTML = ''; };
  el.querySelector('#tvVer').onclick = () => { box.dataset.revelado = 1; cels.forEach((c) => { marcar(c, certo(c, vs, cols, L)); c.classList.add('ok'); }); el.querySelector('#tvMsg').innerHTML = '<div class="tvq-aviso">Esta é a tabela completa. Limpe e tente montar de novo sem olhar: é assim que se decora.</div>'; };
  el.querySelector('#tvConf').onclick = () => conferir(el, cels, vs, cols, L);
}

function certo(c, vs, cols, L) {
  const [tipo, id] = c.dataset.c.split(':'), val = L[+c.dataset.l];
  return VF(tipo === 'v' ? val[id] : ev(cols[+id].f, val));
}
function motivo(c, vs, cols, L) {
  const [tipo, id] = c.dataset.c.split(':'), i = +c.dataset.l, val = L[i];
  if (tipo === 'v') {
    const j = vs.indexOf(id), bloco = 2 ** (vs.length - 1 - j);
    return `com ${vs.length} letras, a coluna ${id} alterna em blocos de ${bloco} (${bloco} V, depois ${bloco} F${j ? ', e repete' : ''}); na linha ${i + 1} ela é ${VF(val[id])}`;
  }
  return porque(cols[+id].f, val);
}

function conferir(el, cels, vs, cols, L) {
  let ok = 0, vaz = 0; const erros = [];
  cels.forEach((c) => {
    c.classList.remove('ok', 'erro', 'vazio');
    const esp = certo(c, vs, cols, L), dado = c.textContent;
    if (!dado) { vaz++; c.classList.add('vazio'); c.title = 'Em branco: o certo é ' + esp; return; }
    if (dado === esp) { ok++; c.classList.add('ok'); c.title = 'Certo'; return; }
    const [tipo, id] = c.dataset.c.split(':');
    const m = motivo(c, vs, cols, L);
    c.classList.add('erro'); c.title = `Errado: o certo é ${esp}. ${m}`;
    erros.push({ linha: +c.dataset.l + 1, col: tipo === 'v' ? id : cols[+id].t, dado, esp, m });
  });
  const tot = cels.length, pct = Math.round((100 * ok) / tot);
  const msg = el.querySelector('#tvMsg');
  if (ok === tot && el.querySelector('#tvGrade').dataset.revelado) { msg.innerHTML = '<div class="tvq-aviso">A resposta foi mostrada, então esta não conta na sequência. Clique em Limpar e monte de cabeça.</div>'; return; }
  if (ok === tot) {
    const dias = lerDias(); dias[iso(hoje())] = (dias[iso(hoje())] || 0) + 1; gravarDias(dias);
    msg.innerHTML = `<div class="tvq-aviso ok">🎉 <b>Tabela perfeita!</b> ${tot} de ${tot} células certas. O dia de hoje entrou na sua sequência. ${E.modo === 'dia' ? 'Amanhã tem um desafio novo; quer mais agora? Vá ao Treino livre.' : 'Tente outra no nível acima.'}</div>`;
    const seq = el.querySelector('.tvq-fogo b'); if (seq) seq.textContent = sequencia(dias);
    return;
  }
  const ordCol = [...vs, ...cols.map((c) => c.t)];
  erros.sort((x, y) => ordCol.indexOf(x.col) - ordCol.indexOf(y.col) || x.linha - y.linha);
  const porCol = new Map(); erros.forEach((e) => { if (!porCol.has(e.col)) porCol.set(e.col, []); porCol.get(e.col).push(e); });
  msg.innerHTML = `<div class="tvq-aviso ${pct >= 70 ? 'meio' : 'erro'}"><b>${ok} de ${tot} células certas (${pct}%).</b> ${erros.length ? `${erros.length} errada${erros.length > 1 ? 's' : ''} (em vermelho)` : ''}${erros.length && vaz ? ' e ' : ''}${vaz ? `${vaz} em branco (em amarelo)` : ''}. Passe o mouse ou toque numa célula vermelha para ver o motivo.</div>
    ${erros.length ? `<div class="tvq-erros">${[...porCol].map(([col, l]) => `<div class="tvq-ecol"><b>Coluna ${esc(col)}</b>${col.length > 1 ? `<small>${esc(regraDe(col, cols))}</small>` : ''}<ul>${l.map((e) => `<li><span class="tvq-pill">linha ${e.linha}</span> você marcou <b class="r">${e.dado}</b>, o certo é <b class="g">${e.esp}</b>: ${esc(e.m)}.</li>`).join('')}</ul></div>`).join('')}</div>` : ''}`;
}
function regraDe(col, cols) { const c = cols.find((x) => x.t === col); return c && !c.f.v ? `Regra: ${regra(c.f.op)}.` : ''; }
