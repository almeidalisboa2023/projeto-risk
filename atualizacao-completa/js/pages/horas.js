// Horas de estudo: cronômetro, tabela por matéria e lançamentos manuais (para trazer de outro app).
import { S } from '../state.js';
import { db } from '../backend.js';
import { esc, hoje, iso, addDias, ddmm, segundaDa, parseISO, pct } from '../util.js';
import { toast, modal } from '../ui.js';
import * as crono from '../crono.js';

let per = 'mes', de = null, ate = null, tick = null;

// "2h30", "2:30", "2,5", "2.5", "45min", "90m", "3" (horas) -> minutos
export function parseHoras(txt) {
  const s = String(txt || '').trim().toLowerCase().replace(/\s+/g, '');
  if (!s) return 0;
  let m;
  if ((m = s.match(/^(\d+)h(\d{1,2})?(m|min)?$/))) return Number(m[1]) * 60 + Number(m[2] || 0);
  if ((m = s.match(/^(\d+):(\d{1,2})$/))) return Number(m[1]) * 60 + Number(m[2]);
  if ((m = s.match(/^(\d+)(m|min|mins|minutos?)$/))) return Number(m[1]);
  if ((m = s.match(/^(\d+(?:[.,]\d+)?)(h|horas?)?$/))) return Math.round(Number(m[1].replace(',', '.')) * 60);
  return NaN;
}
const fmtH = (min) => { const h = Math.floor(min / 60), m = Math.round(min % 60); return `${h}h${String(m).padStart(2, '0')}`; };

function periodo() {
  const h = hoje();
  if (per === 'semana') { const s = segundaDa(h); return [s, addDias(s, 6), 'Esta semana']; }
  if (per === 'mes') return [new Date(h.getFullYear(), h.getMonth(), 1), new Date(h.getFullYear(), h.getMonth() + 1, 0), 'Este mês'];
  if (per === '30') return [addDias(h, -29), h, 'Últimos 30 dias'];
  if (per === 'pers') return [parseISO(de) || addDias(h, -29), parseISO(ate) || h, 'Período escolhido'];
  return [null, null, 'Todo o período'];
}
// Espalha horas trazidas de outro app nos dias ANTERIORES a `ate`, até `media` minutos por dia
// (descontando o que já existe no dia). As matérias são intercaladas em pedaços de até 1h.
export function distribuir(itens, media, ate, ignorar = new Set()) {
  const ja = new Map(); for (const s of S.sessoes) if (!ignorar.has(s.id)) ja.set(s.data, (ja.get(s.data) || 0) + s.minutos);
  const resto = itens.map((i) => ({ ...i, r: i.minutos })), pedacos = [];
  while (resto.some((x) => x.r > 0)) for (const x of resto.sort((a, b) => b.r - a.r)) if (x.r > 0) { const q = Math.min(60, x.r); pedacos.push({ materia: x.materia, min: q, obs: x.obs || null }); x.r -= q; }
  const out = new Map(); let d = addDias(parseISO(ate) || hoje(), -1), livre = Math.max(0, media - (ja.get(iso(d)) || 0)), guarda = 0;
  for (const p of pedacos) {
    let falta = p.min;
    while (falta > 0) {
      while (livre <= 0 && guarda++ < 20000) { d = addDias(d, -1); livre = Math.max(0, media - (ja.get(iso(d)) || 0)); }
      const q = Math.min(falta, livre), k = iso(d) + '|' + p.materia;
      const o = out.get(k) || { materia: p.materia, data: iso(d), minutos: 0, obs: p.obs }; o.minutos += q; out.set(k, o);
      falta -= q; livre -= q;
    }
  }
  return [...out.values()];
}
const resumoDist = (lista) => {
  if (!lista.length) return '';
  const datas = lista.map((i) => i.data).sort(), dias = new Set(datas).size, tot = lista.reduce((x, i) => x + i.minutos, 0);
  const br = (s) => s.split('-').reverse().join('/');
  return `<p style="margin:8px 0"><b>${fmtH(tot)}</b> espalhadas em <b>${dias} dia(s)</b>, de <b>${br(datas[0])}</b> a <b>${br(datas[datas.length - 1])}</b>.</p>`;
};

// Modal: confirma a distribuição; se `trocar` tiver ids, apaga esses registros antigos depois de salvar os novos
function modalDistribuir(itens, ate, depois, trocar = []) {
  const tot = itens.reduce((x, i) => x + i.minutos, 0);
  modal(`<h3>Distribuir horas nos dias anteriores</h3>
    <p class="muted" style="font-size:14px">As <b>${fmtH(tot)}</b> serão espalhadas nos dias <b>antes de ${ate.split('-').reverse().join('/')}</b>, como se você tivesse estudado em média o tempo abaixo por dia. Dias que já têm horas recebem só o que falta para completar a média.</p>
    <div class="campo"><label>Média de estudo por dia</label><input id="dmM" value="3h" style="width:120px"></div>
    <div id="dmR"></div><button class="btn" id="dmS">Distribuir</button>`, {
    onMount: (m, close) => {
      let lista = [];
      const calc = () => { const med = parseHoras(m.querySelector('#dmM').value); if (!med || isNaN(med)) { lista = []; m.querySelector('#dmR').innerHTML = '<p class="bad">Média inválida.</p>'; return; } lista = distribuir(itens, Math.min(med, 1440), ate, new Set(trocar)); m.querySelector('#dmR').innerHTML = resumoDist(lista); };
      m.querySelector('#dmM').oninput = calc; calc();
      m.querySelector('#dmS').onclick = async (ev) => {
        if (!lista.length) return;
        ev.target.disabled = true;
        try {
          await salvar(lista);
          for (const id of trocar) { await db.remove('sessoes_estudo', { id: 'eq.' + id }); }
          S.sessoes = S.sessoes.filter((s) => !trocar.includes(s.id));
          toast('Horas distribuídas!'); close(); depois();
        } catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; }
      };
    },
  });
}

const materiasConhecidas = () => [...new Set([...S.topicos.filter((t) => !t.fora_do_edital).map((t) => t.materia), ...S.sessoes.map((s) => s.materia)])].filter(Boolean).sort((a, b) => a.localeCompare(b, 'pt-BR'));

export async function render(el) {
  clearInterval(tick);
  const [ini, fim, nome] = periodo();
  const lista = S.sessoes.filter((s) => (!ini || s.data >= iso(ini)) && (!fim || s.data <= iso(fim)));
  const porMat = new Map();
  for (const s of lista) { const a = porMat.get(s.materia) || { t: 0, c: 0, m: 0, n: 0 }; a.t += s.minutos; a.n++; s.origem === 'manual' ? (a.m += s.minutos) : (a.c += s.minutos); porMat.set(s.materia, a); }
  const linhas = [...porMat].sort((a, b) => b[1].t - a[1].t);
  const total = lista.reduce((x, s) => x + s.minutos, 0);
  const maior = linhas[0]?.[1].t || 1;
  const c = crono.atual();
  const mats = materiasConhecidas();
  const dias = ini && fim ? Math.round((fim - ini) / 864e5) + 1 : null;

  el.innerHTML = `<div class="mono up">Cronômetro e registro de tempo</div><h1>Horas de estudo</h1>
  <datalist id="dlmat">${mats.map((m) => `<option value="${esc(m)}">`).join('')}</datalist>
  <div class="grid g2">
    <div class="card"><h3>Cronômetro</h3>
      ${c ? `<div class="hero" style="padding:18px"><div class="mono up">Estudando</div><h2 style="margin:4px 0">${esc(c.materia)}</h2><div class="sim-tempo" id="hT" style="font-size:2rem">${crono.fmt(Date.now() - c.inicio)}</div><button class="btn" id="hParar" style="margin-top:10px">■ Parar e salvar</button></div>`
        : `<div class="campo"><label>Matéria</label><input id="hMat" list="dlmat" placeholder="Escolha ou digite" style="width:100%"></div><button class="btn" id="hIni">▶ Iniciar cronômetro</button>
          <p class="muted" style="font-size:13px">Também dá para iniciar direto em cada bloco do Calendário. O tempo vem para esta página quando você para.</p>`}</div>
    <div class="card"><h3>Adicionar horas manualmente</h3>
      <div class="campo"><label>Matéria</label><input id="mMat" list="dlmat" placeholder="Ex.: Direito Constitucional" style="width:100%"></div>
      <div class="row"><div class="campo"><label>Horas estudadas</label><input id="mH" placeholder="Ex.: 2h30, 1,5 ou 45min" style="width:170px"></div>
        <div class="campo"><label>Data</label><input type="date" id="mD" value="${iso(hoje())}"></div></div>
      <div class="campo"><label>Observação (opcional)</label><input id="mO" placeholder="Ex.: trazido do app X" style="width:100%"></div>
      <label class="check" style="margin:4px 0 10px"><input type="checkbox" id="mMig"> <span>São horas de outro aplicativo: distribuir nos dias anteriores à data</span></label>
      <div class="row"><button class="btn" id="mAdd">Adicionar</button><button class="linkbtn" id="mVarios">Colar vários de uma vez</button></div></div>
  </div>
  <div class="card" style="margin-top:16px">
    <div class="row"><h3 style="margin:0">Horas por matéria</h3><span class="sp"></span>
      <div class="abas" id="per">${[['semana', 'Semana'], ['mes', 'Mês'], ['30', '30 dias'], ['tudo', 'Tudo'], ['pers', 'Escolher']].map(([k, n]) => `<button data-p="${k}" class="${per === k ? 'on' : ''}">${n}</button>`).join('')}</div></div>
    ${per === 'pers' ? `<div class="row" style="margin-top:10px"><label style="margin:0">De</label><input type="date" id="pDe" value="${iso(ini)}"><label style="margin:0">até</label><input type="date" id="pAte" value="${iso(fim)}"><button class="btn sec mini" id="pOk">Aplicar</button></div>` : ''}
    <div class="row" style="margin:14px 0 6px"><span class="mono up">${esc(nome)}${ini ? ` · ${ddmm(ini)} a ${ddmm(fim)}` : ''}</span><span class="sp"></span><b>Total: ${fmtH(total)}</b>${dias ? `<span class="muted">· média ${fmtH(total / dias)} por dia</span>` : ''}</div>
    ${linhas.length ? `<div style="overflow-x:auto"><table class="tab"><tr><th>Matéria</th><th>Horas</th><th style="min-width:120px"></th><th>% do total</th><th>Cronômetro</th><th>Manual</th><th>Sessões</th></tr>
      ${linhas.map(([m, a]) => `<tr><td><b>${esc(m)}</b></td><td><b>${fmtH(a.t)}</b></td><td><div class="bar"><div class="bar-in" style="width:${Math.round((a.t / maior) * 100)}%;background:var(--ouro2)"></div></div></td><td>${pct(a.t, total)}%</td><td>${fmtH(a.c)}</td><td>${fmtH(a.m)}</td><td>${a.n}</td></tr>`).join('')}
      <tr><td><b>Total</b></td><td><b>${fmtH(total)}</b></td><td></td><td>100%</td><td>${fmtH(linhas.reduce((x, [, a]) => x + a.c, 0))}</td><td>${fmtH(linhas.reduce((x, [, a]) => x + a.m, 0))}</td><td>${lista.length}</td></tr></table></div>`
      : '<p class="muted">Nenhuma hora registrada neste período. Use o cronômetro ou adicione manualmente.</p>'}
    ${dias && dias <= 31 && lista.length ? grafico(ini, dias, lista) : ''}
  </div>
  <div class="card" style="margin-top:16px"><div class="row"><h3 style="margin:0">Registros do período</h3><span class="sp"></span><button class="btn sec mini" id="hDist">↺ Distribuir horas migradas</button></div>
    ${lista.length ? `<div style="overflow-x:auto"><table class="tab"><tr><th>Data</th><th>Matéria</th><th>Tempo</th><th>Origem</th><th>Obs.</th><th></th></tr>
      ${lista.slice().sort((a, b) => (b.data + (b.created_at || '')).localeCompare(a.data + (a.created_at || ''))).slice(0, 200).map((s) => `<tr><td>${ddmm(parseISO(s.data))}/${s.data.slice(0, 4)}</td><td>${esc(s.materia)}</td><td>${fmtH(s.minutos)}</td><td>${s.origem === 'manual' ? 'Manual' : 'Cronômetro'}</td><td class="muted">${esc(s.obs || '')}</td><td><button class="linkbtn" data-del="${s.id}" title="Excluir">✕</button></td></tr>`).join('')}</table></div>` : '<p class="muted">Sem registros.</p>'}
  </div>`;

  const $ = (s) => el.querySelector(s);
  el.querySelectorAll('#per [data-p]').forEach((b) => (b.onclick = () => { per = b.dataset.p; render(el); }));
  if ($('#pOk')) $('#pOk').onclick = () => { de = $('#pDe').value; ate = $('#pAte').value; render(el); };
  if (c) {
    tick = setInterval(() => { const t = document.getElementById('hT'); if (!t) return clearInterval(tick); t.textContent = crono.fmt(Date.now() - c.inicio); }, 1000);
    $('#hParar').onclick = async () => { await crono.parar(); render(el); };
  } else {
    $('#hIni').onclick = async () => { const m = $('#hMat').value.trim(); if (!m) return toast('Escolha a matéria.', 'erro'); await crono.iniciar({ materia: m }); render(el); };
  }
  $('#mAdd').onclick = async (ev) => {
    const materia = $('#mMat').value.trim(), min = parseHoras($('#mH').value), data = $('#mD').value;
    if (!materia) return toast('Informe a matéria.', 'erro');
    if (!min || isNaN(min) || min <= 0) return toast('Horas inválidas. Use por exemplo 2h30, 1,5 ou 45min.', 'erro');
    ev.target.disabled = true;
    const item = { materia, minutos: min, data, obs: $('#mO').value.trim() || null };
    const doDia = S.sessoes.filter((s) => s.data === data).reduce((x, s) => x + s.minutos, 0);
    if ($('#mMig').checked || (min + doDia > 16 * 60 && confirm(`${fmtH(min + doDia)} em um único dia é mais do que dá para estudar.\n\nSão horas trazidas de outro aplicativo? Clique OK para distribuir nos dias anteriores.`))) {
      ev.target.disabled = false; return modalDistribuir([item], data, () => render(el));
    }
    try { await salvar([item]); toast(`${fmtH(min)} de ${materia} adicionadas.`); render(el); }
    catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; }
  };
  $('#mVarios').onclick = () => colarVarios(() => render(el));
  $('#hDist').onclick = () => escolherDia(() => render(el));
  el.querySelectorAll('[data-del]').forEach((b) => (b.onclick = async () => {
    if (!confirm('Excluir este registro de horas?')) return;
    try { await db.remove('sessoes_estudo', { id: 'eq.' + b.dataset.del }); S.sessoes = S.sessoes.filter((s) => s.id !== b.dataset.del); render(el); } catch (e) { toast(e.message, 'erro'); }
  }));
}

async function salvar(itens) {
  const novas = await db.insert('sessoes_estudo', itens.map((i) => ({ user_id: S.user.id, edital_id: S.edital?.id || null, origem: 'manual', ...i })));
  S.sessoes.push(...novas);
}

function grafico(ini, dias, lista) {
  const por = new Map(); for (const s of lista) por.set(s.data, (por.get(s.data) || 0) + s.minutos);
  const cols = Array.from({ length: dias }, (_, i) => { const d = addDias(ini, i); return [d, por.get(iso(d)) || 0]; });
  const max = Math.max(60, ...cols.map((c) => c[1]));
  return `<div class="mono up" style="margin-top:20px">Tempo por dia</div><div class="chart" style="height:140px">${cols.map(([d, m]) => `<div class="col" title="${ddmm(d)}: ${fmtH(m)}">${m ? `<div class="b" style="background:var(--ouro2);height:${Math.max(3, Math.round((m / max) * 100))}%"></div>` : ''}</div>`).join('')}</div>
    <div class="chart-labs">${cols.map(([d]) => `<div class="lab">${dias <= 7 ? ddmm(d) : d.getDate()}</div>`).join('')}</div>`;
}

function colarVarios(depois) {
  modal(`<h3>Colar vários registros</h3>
    <p class="muted" style="font-size:14px">Uma linha por matéria: <b>Matéria; horas</b> e, se quiser, <b>; data</b>. Pode copiar e colar de uma planilha.</p>
    <pre class="code" style="white-space:pre-wrap">Direito Constitucional; 12h30
Língua Portuguesa; 8,5
Legislação de Trânsito; 15:45; 20/10/2026</pre>
    <textarea id="cv" style="min-height:160px" placeholder="Cole aqui"></textarea>
    <div class="campo" style="margin-top:8px"><label>Data para as linhas sem data</label><input type="date" id="cvD" value="${iso(hoje())}"></div>
    <div class="campo"><label>Observação</label><input id="cvO" value="Transferido de outro app" style="width:100%"></div>
    <label class="check"><input type="checkbox" id="cvMig" checked> <span>Vieram de outro aplicativo: distribuir as linhas sem data nos dias anteriores, com média de <input id="cvM" value="3h" style="width:70px;padding:4px 6px"> por dia</span></label>
    <button class="btn sec" id="cvP">Conferir</button><div id="cvOut" style="margin-top:10px"></div>`, {
    largo: true,
    onMount: (m, close) => {
      let itens = [];
      m.querySelector('#cvP').onclick = () => {
        const padrao = m.querySelector('#cvD').value, obs = m.querySelector('#cvO').value.trim() || null;
        const erros = []; itens = [];
        m.querySelector('#cv').value.split(/\r?\n/).forEach((l, n) => {
          if (!l.trim()) return;
          const p = l.split(/[;\t]/).map((x) => x.trim());
          const min = parseHoras(p[1]);
          let data = padrao, semData = !p[2];
          if (p[2]) { const d = p[2].match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); if (d) data = `${d[3]}-${d[2].padStart(2, '0')}-${d[1].padStart(2, '0')}`; else if (/^\d{4}-\d{2}-\d{2}$/.test(p[2])) data = p[2]; else { erros.push(`Linha ${n + 1}: data inválida`); return; } }
          if (!p[0] || !min || isNaN(min)) { erros.push(`Linha ${n + 1}: "${l.slice(0, 40)}"`); return; }
          itens.push({ materia: p[0], minutos: min, data, obs, semData });
        });
        let dist = '';
        if (m.querySelector('#cvMig').checked) {
          const med = parseHoras(m.querySelector('#cvM').value);
          if (!med || isNaN(med)) erros.push('média por dia inválida');
          else {
            const semData = itens.filter((i) => i.semData);
            if (semData.length) { const espalhadas = distribuir(semData, Math.min(med, 1440), padrao); itens = [...itens.filter((i) => !i.semData), ...espalhadas]; dist = resumoDist(espalhadas); }
          }
        }
        itens.forEach((i) => delete i.semData);
        const porMat = new Map(); for (const i of itens) porMat.set(i.materia, (porMat.get(i.materia) || 0) + i.minutos);
        const out = m.querySelector('#cvOut');
        out.innerHTML = `${erros.length ? `<p class="bad" style="font-size:13px">Não entendi: ${esc(erros.join(' · '))}</p>` : ''}
          ${dist ? `${dist}<table class="tab"><tr><th>Matéria</th><th>Horas</th></tr>${[...porMat].map(([k, v]) => `<tr><td>${esc(k)}</td><td>${fmtH(v)}</td></tr>`).join('')}</table>
          <button class="btn" id="cvS" style="margin-top:10px">Salvar · ${fmtH(itens.reduce((x, i) => x + i.minutos, 0))}</button>` : itens.length ? `<table class="tab"><tr><th>Matéria</th><th>Horas</th><th>Data</th></tr>${itens.map((i) => `<tr><td>${esc(i.materia)}</td><td>${fmtH(i.minutos)}</td><td>${esc(i.data.split('-').reverse().join('/'))}</td></tr>`).join('')}</table>
          <button class="btn" id="cvS" style="margin-top:10px">Salvar ${itens.length} registro(s) · ${fmtH(itens.reduce((x, i) => x + i.minutos, 0))}</button>` : ''}`;
        const b = out.querySelector('#cvS');
        if (b) b.onclick = async () => { b.disabled = true; try { await salvar(itens); toast('Horas adicionadas!'); close(); depois(); } catch (e) { toast(e.message, 'erro'); b.disabled = false; } };
      };
    },
  });
}

// Corrige horas migradas que ficaram todas em um dia só
function escolherDia(depois) {
  const por = new Map(); for (const s of S.sessoes) if (s.origem === 'manual') por.set(s.data, (por.get(s.data) || 0) + s.minutos);
  const dias = [...por].sort((a, b) => b[1] - a[1]).slice(0, 15);
  if (!dias.length) return toast('Não há horas lançadas manualmente.', 'erro');
  modal(`<h3>Distribuir horas migradas</h3>
    <p class="muted" style="font-size:14px">Escolha o dia em que você lançou as horas trazidas de outro aplicativo. Os registros manuais desse dia serão espalhados nos dias anteriores.</p>
    <div class="campo"><label>Dia</label><select id="edD">${dias.map(([d, m]) => `<option value="${d}">${d.split('-').reverse().join('/')} · ${fmtH(m)} lançadas</option>`).join('')}</select></div>
    <button class="btn" id="edOk">Continuar</button>`, {
    onMount: (m, close) => {
      m.querySelector('#edOk').onclick = () => {
        const d = m.querySelector('#edD').value;
        const regs = S.sessoes.filter((s) => s.origem === 'manual' && s.data === d);
        const porMat = new Map(); for (const s of regs) { const o = porMat.get(s.materia) || { materia: s.materia, minutos: 0, obs: s.obs || 'Transferido de outro app' }; o.minutos += s.minutos; porMat.set(s.materia, o); }
        close(); modalDistribuir([...porMat.values()], d, depois, regs.map((s) => s.id));
      };
    },
  });
}
