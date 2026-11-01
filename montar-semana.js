// Montagem do calendário: adicionar/editar blocos e gerar uma semana automaticamente.
import { S, topicosValidos } from '../state.js';
import { db } from '../backend.js';
import { esc, DIAS, DIAS_CURTO, addDias, ddmm, norm, tipoBloco, inicioSemana } from '../util.js';
import { modal, toast } from '../ui.js';

const TIPOS = { Teoria: '', 'Revisão': 'Revisão: ', 'Questões': 'Revisão + questões: ' };
const semPrefixo = (t) => String(t || '').replace(/^(revis[aã]o \+ quest[oõ]es|revis[aã]o e quest[oõ]es|revis[aã]o)\s*:\s*/i, '');
const blocosPorDia = () => (Array.isArray(S.profile.blocos) && S.profile.blocos.length) || 3;
const materias = () => [...new Set(topicosValidos().map((t) => t.materia))];

async function salvar(linhas) {
  const novas = await db.insert('tarefas', linhas.map((l) => ({ user_id: S.user.id, edital_id: S.edital.id, checklist: {}, concluido: false, ...l })));
  S.tarefas.push(...novas);
  S.tarefas.sort((a, b) => a.semana - b.semana || (a.ordem ?? 0) - (b.ordem ?? 0));
  return novas;
}
const proxOrdem = (semana, dia) => Math.max(-1, ...S.tarefas.filter((t) => t.semana === semana && t.dia === dia).map((t) => t.ordem ?? 0)) + 1;

// ---------- formulário de um bloco (novo ou edição) ----------
function formBloco({ titulo, semana, dia, t }, onSalvar, extra = '') {
  const mats = materias();
  const tpAtual = t && S.topicos.find((x) => x.id === t.topico_id);
  const matIni = tpAtual?.materia || t?.materia || mats[0] || '';
  const tipoIni = t ? tipoBloco(t.topico) : 'Teoria';
  modal(`<h3>${esc(titulo)}</h3>
    <div class="campo"><label>Dia</label><select id="fdia" style="width:100%">${DIAS.map((d) => `<option ${d === dia ? 'selected' : ''}>${d}</option>`).join('')}</select></div>
    <div class="campo"><label>Matéria</label><select id="fmat" style="width:100%">${mats.map((m) => `<option ${m === matIni ? 'selected' : ''}>${esc(m)}</option>`).join('')}<option value="__livre">Outra (escrever)</option></select></div>
    <div class="campo" id="clivre" style="display:none"><label>Nome da matéria</label><input id="fmatl" style="width:100%" value="${esc(mats.includes(matIni) ? '' : matIni)}"></div>
    <div class="campo"><label>Assunto</label><select id="ftop" style="width:100%;max-width:100%"></select></div>
    <div class="campo" id="clivret" style="display:none"><label>Assunto (texto livre)</label><input id="ftopl" style="width:100%" value="${esc(tpAtual ? '' : semPrefixo(t?.topico))}"></div>
    <div class="campo"><label>Tipo do bloco</label><select id="ftipo">${Object.keys(TIPOS).map((k) => `<option ${k === tipoIni ? 'selected' : ''}>${k}</option>`).join('')}</select></div>
    <div class="row" style="margin-top:12px"><button class="btn" id="fok">Salvar</button>${extra}</div>`, {
    onMount: (m, close) => {
      const $ = (s) => m.querySelector(s);
      let primeira = true;
      const preencheTopicos = () => {
        const mat = $('#fmat').value; const livre = mat === '__livre';
        $('#clivre').style.display = livre ? '' : 'none';
        const ts = livre ? [] : topicosValidos().filter((x) => x.materia === mat);
        const agendados = new Set(S.tarefas.filter((x) => x.topico_id).map((x) => x.topico_id));
        $('#ftop').innerHTML = ts.map((x) => `<option value="${x.id}" ${tpAtual?.id === x.id ? 'selected' : ''}>${x.concluido ? '✓ ' : agendados.has(x.id) ? '· ' : ''}${esc(x.topico.slice(0, 110))}</option>`).join('') + '<option value="__livre">Outro assunto (escrever)</option>';
        if (!tpAtual || tpAtual.materia !== mat) { const prim = ts.find((x) => !x.concluido && !agendados.has(x.id)) || ts.find((x) => !x.concluido); if (prim) $('#ftop').value = prim.id; else $('#ftop').value = '__livre'; }
        if (primeira && t && !tpAtual && !livre) $('#ftop').value = '__livre';
        primeira = false;
        $('#clivret').style.display = $('#ftop').value === '__livre' ? '' : 'none';
      };
      $('#fmat').onchange = preencheTopicos; $('#ftop').onchange = () => ($('#clivret').style.display = $('#ftop').value === '__livre' ? '' : 'none');
      if (!mats.includes(matIni) && matIni) $('#fmat').value = '__livre';
      preencheTopicos();
      $('#fok').onclick = async () => {
        const livreM = $('#fmat').value === '__livre', livreT = $('#ftop').value === '__livre';
        const materia = livreM ? $('#fmatl').value.trim() : $('#fmat').value;
        const tp = livreT ? null : S.topicos.find((x) => x.id === $('#ftop').value);
        const assunto = tp ? tp.topico : $('#ftopl').value.trim();
        if (!materia || !assunto) return toast('Preencha matéria e assunto.', 'erro');
        const novoDia = $('#fdia').value;
        try { await onSalvar({ dia: novoDia, materia, topico: TIPOS[$('#ftipo').value] + semPrefixo(assunto), topico_id: tp?.id || null }); close(); }
        catch (e) { toast(e.message, 'erro'); }
      };
      m.querySelector('#fdel')?.addEventListener('click', async () => {
        if (!confirm('Excluir este bloco do calendário?')) return;
        try { await db.remove('tarefas', { id: 'eq.' + t.id }); S.tarefas = S.tarefas.filter((x) => x.id !== t.id); close(); onSalvar(null, true); } catch (e) { toast(e.message, 'erro'); }
      });
    },
  });
}

export function adicionarBloco(semana, dia, depois) {
  formBloco({ titulo: `Adicionar bloco · Semana ${semana}`, semana, dia }, async (v) => {
    await salvar([{ ...v, semana, ordem: proxOrdem(semana, v.dia) }]);
    toast('Bloco adicionado.'); depois();
  });
}

export function editarBloco(t, depois) {
  formBloco({ titulo: 'Editar bloco', semana: t.semana, dia: t.dia, t }, async (v, apagou) => {
    if (apagou) { toast('Bloco excluído.'); return depois(); }
    const mudou = { ...v }; if (v.dia !== t.dia) mudou.ordem = proxOrdem(t.semana, v.dia);
    const [n] = await db.update('tarefas', { id: 'eq.' + t.id }, mudou);
    const i = S.tarefas.findIndex((x) => x.id === t.id); if (i >= 0) S.tarefas[i] = n;
    toast('Bloco atualizado.'); depois();
  }, '<span class="sp"></span><button class="btn sec" id="fdel">Excluir bloco</button>');
}

// ---------- gerador automático ----------
const FREQ = { auto: 'Automático (rodízio)', todos: 'Todo dia', '3x': '3x (Seg, Qua, Sex)', '2x': '2x (Ter, Qui)', '1x': '1x (Qui)', nao: 'Não incluir' };
const DIAS_FREQ = { todos: [0, 1, 2, 3, 4, 5, 6], '3x': [0, 2, 4], '2x': [1, 3], '1x': [3] };
const CHAVE = () => 'risk-gerador-' + S.edital.id;
const lerCfg = () => { try { return JSON.parse(localStorage.getItem(CHAVE()) || 'null'); } catch { return null; } };
const gravarCfg = (c) => { try { localStorage.setItem(CHAVE(), JSON.stringify(c)); } catch {} };

// Frequência que cada matéria teve na última semana montada (para repetir o padrão de antes)
function padraoAnterior(semana) {
  const ant = [...new Set(S.tarefas.filter((t) => t.semana < semana).map((t) => t.semana))].sort((a, b) => b - a)[0];
  if (ant == null) return {};
  const dias = {};
  for (const t of S.tarefas.filter((x) => x.semana === ant && tipoBloco(x.topico) === 'Teoria')) {
    const m = S.topicos.find((x) => x.id === t.topico_id)?.materia || t.materia;
    (dias[m] = dias[m] || new Set()).add(t.dia);
  }
  const out = {};
  for (const [m, ds] of Object.entries(dias)) out[m] = ds.size >= 5 ? 'todos' : ds.size === 3 ? '3x' : 'auto';
  return out;
}

export function gerarSemana(semana, depois) {
  const mats = materias();
  const salvo = lerCfg();
  const ant = padraoAnterior(semana);
  const cfg = { blocos: salvo?.blocos || blocosPorDia(), dias: salvo?.dias || [0, 1, 2, 3, 4], revisao: salvo?.revisao ?? true, freq: { ...Object.fromEntries(mats.map((m) => [m, 'auto'])), ...ant, ...(salvo?.freq || {}) } };
  const ini = inicioSemana(S.edital.data_inicio, semana);
  modal(`<h3>Montar a semana ${semana} automaticamente</h3>
    <p class="muted" style="font-size:14px">O app escolhe os próximos assuntos ainda não estudados de cada matéria, na ordem do edital. Você confere antes de salvar e pode editar ou excluir qualquer bloco depois.</p>
    <div class="row"><div class="campo"><label>Blocos por dia</label><input type="number" id="gb" min="1" max="8" value="${cfg.blocos}" style="width:90px"></div>
      <div class="campo"><label>Dias de estudo</label><div class="row">${DIAS_CURTO.map((d, i) => `<label class="check" style="margin:0"><input type="checkbox" class="gd" value="${i}" ${cfg.dias.includes(i) ? 'checked' : ''}> ${d} ${ddmm(addDias(ini, i))}</label>`).join('')}</div></div></div>
    <label class="check"><input type="checkbox" id="gr" ${cfg.revisao ? 'checked' : ''}> Sábado com revisão + questões dos assuntos da semana passada e de 4 semanas atrás</label>
    <div class="mono up" style="margin-top:12px">Frequência de cada matéria</div>
    <div style="max-height:260px;overflow:auto">${mats.map((m, i) => `<div class="row" style="margin:4px 0"><span style="flex:1">${esc(m)}</span><select class="gf" data-i="${i}">${Object.entries(FREQ).map(([k, v]) => `<option value="${k}" ${cfg.freq[m] === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>`).join('')}</div>
    <div class="row" style="margin-top:12px"><button class="btn" id="gprev">Ver prévia</button></div><div id="gout"></div>`, {
    largo: true,
    onMount: (m, close) => {
      const $ = (s) => m.querySelector(s);
      let plano = [];
      $('#gprev').onclick = () => {
        cfg.blocos = Math.max(1, Math.min(8, Number($('#gb').value) || 3));
        cfg.dias = [...m.querySelectorAll('.gd:checked')].map((c) => Number(c.value));
        cfg.revisao = $('#gr').checked;
        m.querySelectorAll('.gf').forEach((s) => (cfg.freq[mats[s.dataset.i]] = s.value));
        gravarCfg(cfg);
        plano = montarPlano(semana, cfg);
        desenha();
      };
      const desenha = () => {
        const out = $('#gout');
        if (!plano.length) { out.innerHTML = '<p class="muted">Nada a adicionar: os dias escolhidos já estão cheios ou não há assuntos pendentes.</p>'; return; }
        out.innerHTML = `<div class="mono up" style="margin-top:14px">Prévia · ${plano.length} blocos novos</div>${DIAS.map((d, i) => { const ps = plano.map((p, k) => [p, k]).filter(([p]) => p.dia === d); if (!ps.length) return '';
          return `<div style="margin:10px 0"><b>${d} ${ddmm(addDias(ini, i))}</b>${ps.map(([p, k]) => `<div class="check"><button class="linkbtn" data-x="${k}" title="Tirar">✕</button><span><b>${esc(p.materia)}</b> — ${esc(p.topico)}</span></div>`).join('')}</div>`; }).join('')}
          <button class="btn" id="gsalva">Salvar semana ${semana}</button>`;
        out.querySelectorAll('[data-x]').forEach((b) => (b.onclick = () => { plano.splice(Number(b.dataset.x), 1); desenha(); }));
        out.querySelector('#gsalva').onclick = async (ev) => {
          ev.target.disabled = true;
          try { await salvar(plano.map((p) => ({ ...p, semana }))); toast(`Semana ${semana} montada com ${plano.length} blocos.`); close(); depois(); }
          catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; }
        };
      };
    },
  });
}

function montarPlano(semana, cfg) {
  const validos = topicosValidos();
  const jaTeoria = new Set(S.tarefas.filter((t) => t.topico_id && tipoBloco(t.topico) === 'Teoria').map((t) => t.topico_id));
  const fila = {};
  for (const m of materias()) fila[m] = validos.filter((t) => t.materia === m && !t.concluido && !jaTeoria.has(t.id)).sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
  // quando a matéria não tem assunto novo: revisão + questões dos assuntos com menor acerto
  const tx = {}; for (const l of S.logs) { const a = tx[l.topico_id] || [0, 0]; a[0] += l.feitas; a[1] += l.acertos; tx[l.topico_id] = a; }
  const taxa = (id) => (tx[id] ? tx[id][1] / tx[id][0] : 0);
  const rev = {};
  for (const m of materias()) rev[m] = validos.filter((t) => t.materia === m && !fila[m].includes(t)).sort((a, b) => taxa(a.id) - taxa(b.id));
  const tem = (m) => fila[m]?.length || rev[m]?.length;
  const ultimoUso = {}; // rodízio: matéria usada há mais tempo vai primeiro
  for (const t of S.tarefas) { const m = S.topicos.find((x) => x.id === t.topico_id)?.materia || t.materia; ultimoUso[m] = Math.max(ultimoUso[m] ?? -1, t.semana * 10 + DIAS.indexOf(t.dia)); }
  const plano = [];
  const usar = (m, dia, semanaN, diaIdx) => { const nova = fila[m].shift(); const tp = nova || rev[m].shift(); if (!tp) return false; plano.push({ dia, materia: m, topico: (nova ? '' : 'Revisão + questões: ') + tp.topico, topico_id: tp.id, ordem: 0 }); ultimoUso[m] = semanaN * 10 + diaIdx; return true; };

  for (const di of cfg.dias.filter((d) => d < 5 || !cfg.revisao || d !== 5).sort()) {
    const dia = DIAS[di];
    let vagas = cfg.blocos - S.tarefas.filter((t) => t.semana === semana && t.dia === dia).length;
    const hojeM = new Set();
    // fixas do dia
    for (const [m, f] of Object.entries(cfg.freq)) if (vagas > 0 && DIAS_FREQ[f]?.includes(di) && tem(m) && usar(m, dia, semana, di)) { vagas--; hojeM.add(m); }
    // rodízio
    while (vagas > 0) {
      const cand = Object.keys(fila).filter((m) => cfg.freq[m] === 'auto' && tem(m) && !hojeM.has(m)).sort((a, b) => (fila[b].length > 0) - (fila[a].length > 0) || (ultimoUso[a] ?? -1) - (ultimoUso[b] ?? -1) || fila[b].length - fila[a].length);
      if (!cand.length) break;
      usar(cand[0], dia, semana, di); hojeM.add(cand[0]); vagas--;
    }
  }
  if (cfg.revisao) {
    let vagas = cfg.blocos - S.tarefas.filter((t) => t.semana === semana && t.dia === 'Sábado').length;
    const vistos = new Set();
    for (const s of [semana - 1, semana - 4]) for (const t of S.tarefas.filter((x) => x.semana === s && x.topico_id && tipoBloco(x.topico) === 'Teoria')) {
      if (vagas <= 0 || vistos.has(t.topico_id)) continue;
      const tp = S.topicos.find((x) => x.id === t.topico_id); if (!tp) continue;
      vistos.add(tp.id); vagas--;
      plano.push({ dia: 'Sábado', materia: tp.materia, topico: 'Revisão + questões: ' + tp.topico, topico_id: tp.id, ordem: 0 });
    }
  }
  const cont = {};
  for (const p of plano) { const k = p.dia; cont[k] = cont[k] ?? proxOrdem(semana, k); p.ordem = cont[k]++; }
  return plano;
}
