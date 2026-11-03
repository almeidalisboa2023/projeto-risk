// Tópico interativo: tabela completa de infrações do CTB (texto oficial) + treino de natureza.
import { INFRACOES, MED, DATA_TABELA } from './ctb-infracoes.js';
import { cartoes, COR } from './figuras.js';
import { esc, norm } from '../util.js';

const NAT = { G: ['Gravíssima', '#C8102E', 7], R: ['Grave', '#E67E22', 5], M: ['Média', '#D4A017', 4], L: ['Leve', '#2E7D4F', 3] };
const linhas = () => INFRACOES.flatMap(([art, cab, itens]) => itens.filter((x) => x[2] !== '=162').map(([inc, cond, nat, pen, med]) => ({ art, inc, cab, cond, nat, pen, med: MED[med] || med })));
const natTxt = (n) => NAT[n]?.[0] || n;

export const TABELA = {
  id: 'tabela-infracoes', titulo: 'Tabela completa de infrações (arts. 162 a 255)', arts: 'texto oficial do CTB',
  chaves: ['tabela de infracoes', 'das infracoes'],
  html: `
<h3>Como usar esta tabela</h3>
<p>São as <b>235 condutas</b> do capítulo de infrações, com natureza, penalidade e medida administrativa, conferidas no <b>texto compilado do Planalto</b> em ${DATA_TABELA}. Filtre pela natureza, busque por palavra (ex.: “celular”, “acostamento”, “capacete”) ou teste-se no <b>treino</b> logo abaixo.</p>
${cartoes([['🔴', 'Gravíssima', '7 pontos · R$ 293,47', COR.verm], ['🟠', 'Grave', '5 pontos · R$ 195,23', COR.lar], ['🟡', 'Média', '4 pontos · R$ 130,16', COR.amar], ['🟢', 'Leve', '3 pontos · R$ 88,38', COR.verde]])}
<div class="lt-peg"><b class="lt-tit">⚠ Atenção à “apreensão do veículo”</b> Alguns artigos ainda trazem “apreensão do veículo” na penalidade, mas a apreensão foi <b>retirada do rol de penalidades</b> do art. 256 pela Lei 13.281/2016. Na prática, aplica-se a <b>remoção</b> como medida administrativa. Em prova, siga o que o enunciado pedir: a letra da lei ou a regra atual.</div>
<div id="ctbTab"></div>
<h3>🎯 Treino: qual é a natureza?</h3>
<p class="muted" style="margin-top:-6px">Uma conduta aparece; você escolhe a natureza. O placar fica nesta tela.</p>
<div id="ctbTreino"></div>`,
  montar(el) {
    const L = linhas();
    // ---------- tabela com filtro ----------
    const tab = el.querySelector('#ctbTab');
    let filtro = '', busca = '', susp = false;
    const desenha = () => {
      const q = norm(busca);
      const vis = L.filter((x) => (!filtro || x.nat === filtro) && (!susp || /suspens/.test(x.pen)) && (!q || norm(`${x.art} ${x.cab} ${x.cond} ${x.pen} ${x.med}`).includes(q)));
      tab.querySelector('#ctbRes').innerHTML = `<p class="muted" style="margin:6px 0">${vis.length} conduta(s)</p>
        <div style="overflow-x:auto"><table class="tab lt-inf"><tr><th>Art.</th><th>Conduta</th><th>Natureza</th><th>Penalidade</th><th>Medida administrativa</th></tr>
        ${vis.map((x) => `<tr><td class="mono">${esc(x.art)}${x.inc ? ', ' + esc(x.inc) : ''}</td><td><b>${esc(x.cab)}</b>${x.cond ? ' ' + esc(x.cond) : ''}</td><td><span class="lt-nat" style="--n:${NAT[x.nat]?.[1] || '#6B6458'}">${esc(natTxt(x.nat))}</span></td><td>${esc(x.pen)}</td><td>${esc(x.med || '—')}</td></tr>`).join('')}</table></div>`;
    };
    tab.innerHTML = `<div class="row" style="gap:6px;flex-wrap:wrap">
      <input id="ctbQ" placeholder="Buscar: celular, capacete, acostamento, 230…" style="flex:1;min-width:200px">
      ${[['', 'Todas'], ['G', 'Gravíssimas'], ['R', 'Graves'], ['M', 'Médias'], ['L', 'Leves']].map(([k, n]) => `<button class="btn sec mini" data-n="${k}">${n}</button>`).join('')}
      <label class="check" style="margin:0"><input type="checkbox" id="ctbS"> <span>só com suspensão</span></label></div><div id="ctbRes"></div>`;
    tab.querySelector('#ctbQ').oninput = (e) => { busca = e.target.value; desenha(); };
    tab.querySelector('#ctbS').onchange = (e) => { susp = e.target.checked; desenha(); };
    tab.querySelectorAll('[data-n]').forEach((b) => (b.onclick = () => { filtro = b.dataset.n; tab.querySelectorAll('[data-n]').forEach((y) => y.classList.toggle('on', y === b)); desenha(); }));
    tab.querySelector('[data-n=""]').classList.add('on');
    desenha();
    // ---------- treino ----------
    const tr = el.querySelector('#ctbTreino');
    const pool = L.filter((x) => NAT[x.nat]);
    let ok = 0, tot = 0;
    const nova = () => {
      const x = pool[Math.floor(Math.random() * pool.length)];
      tr.innerHTML = `<div class="lt-q"><p><span class="mono">Art. ${esc(x.art)}${x.inc ? ', ' + esc(x.inc) : ''}</span> · <b>${esc(x.cab)}</b>${x.cond ? ' ' + esc(x.cond) : ''}</p>
        <div class="row">${Object.entries(NAT).map(([k, [n]]) => `<button class="btn sec mini" data-t="${k}">${n}</button>`).join('')}</div><div class="lt-q-res"></div>
        <div class="row" style="margin-top:6px"><span class="muted">Placar: ${ok}/${tot}</span><span class="sp"></span><button class="btn mini" id="ctbProx">Próxima ›</button></div></div>`;
      tr.querySelectorAll('[data-t]').forEach((b) => (b.onclick = () => {
        const certo = b.dataset.t === x.nat; tot++; if (certo) ok++;
        tr.querySelectorAll('[data-t]').forEach((y) => { y.disabled = true; y.classList.toggle('lt-marcado', y === b); });
        tr.querySelector('.lt-q').classList.add(certo ? 'ok' : 'erro');
        tr.querySelector('.lt-q-res').innerHTML = `<b>${certo ? '✅ Acertou!' : '❌ Errou.'}</b> É <b>${natTxt(x.nat)}</b> (${NAT[x.nat][2]} pontos). Penalidade: ${esc(x.pen)}${x.med ? `. Medida: ${esc(x.med)}` : ''}.`;
        tr.querySelector('.muted').textContent = `Placar: ${ok}/${tot}`;
      }));
      tr.querySelector('#ctbProx').onclick = nova;
    };
    nova();
  },
};
