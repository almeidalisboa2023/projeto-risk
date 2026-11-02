// Ferramentas do edital: ajustar datas do cronograma, finalizar cronograma e criar edital + cronograma a partir do PDF/texto do edital.
import { S, carregarTudo, trocarEdital } from '../state.js';
import { db } from '../backend.js';
import { esc, hoje, iso, addDias, ddmm, parseISO, segundaDa, semanaDe, inicioSemana, norm, DIAS, DIAS_CURTO } from '../util.js';
import { modal, toast, loading } from '../ui.js';
import { montarPlano } from './montar-semana.js';

const dataBR = (d) => `${ddmm(d)}/${d.getFullYear()}`;

// ---------- 1) AJUSTAR DATAS ----------
// "A semana N começa em DD/MM" -> recalcula o início do plano (data_inicio = segunda da semana 1)
export function ajustarDatas(ed, depois) {
  const h = hoje();
  const semAgora = semanaDe(ed.data_inicio, h);
  const semanas = S.edital?.id === ed.id ? [...new Set(S.tarefas.map((t) => t.semana))].sort((a, b) => a - b) : [];
  modal(`<h3>Ajustar datas do cronograma</h3>
    <p class="muted" style="font-size:14px;margin-top:0"><b>${esc(ed.concurso)}</b> · hoje o app considera que estamos na <b>semana ${semAgora}</b> (semana 1 começou em ${dataBR(inicioSemana(ed.data_inicio, 1))}).</p>
    <div class="row"><div class="campo"><label>A semana nº</label><input type="number" id="adS" min="1" max="200" value="${semAgora}" style="width:100px"></div>
      <div class="campo"><label>começa na segunda-feira</label><input type="date" id="adD" value="${iso(segundaDa(h))}"></div></div>
    <div id="adP" class="card" style="padding:12px;margin:6px 0 12px"></div>
    <p class="muted" style="font-size:12.5px">Nada é apagado: os blocos continuam nas mesmas semanas; só as datas de cada semana mudam.</p>
    <button class="btn" id="adOk">Salvar novas datas</button>`, {
    onMount: (m, close) => {
      const calc = () => {
        const n = Math.max(1, Number(m.querySelector('#adS').value) || 1);
        const d = segundaDa(parseISO(m.querySelector('#adD').value) || h);
        const ini = addDias(d, -7 * (n - 1));
        const agora = semanaDe(iso(ini), h);
        m.querySelector('#adP').innerHTML = `Semana 1 passa a começar em <b>${dataBR(ini)}</b>.<br>Hoje (${dataBR(h)}) fica sendo a <b>semana ${agora}</b>.${semanas.length ? `<br><span class="muted">Semanas com blocos: ${semanas[0]} a ${semanas[semanas.length - 1]} (semana ${semanas[semanas.length - 1]} = ${dataBR(addDias(ini, 7 * (semanas[semanas.length - 1] - 1)))} a ${dataBR(addDias(ini, 7 * (semanas[semanas.length - 1] - 1) + 6))}).</span>` : ''}`;
        return iso(ini);
      };
      m.querySelector('#adS').oninput = calc; m.querySelector('#adD').onchange = calc; calc();
      m.querySelector('#adOk').onclick = async (ev) => {
        ev.target.disabled = true;
        try {
          const di = calc();
          await db.update('editais', { id: 'eq.' + ed.id }, { data_inicio: di });
          ed.data_inicio = di; const e2 = S.editais.find((x) => x.id === ed.id); if (e2) e2.data_inicio = di;
          toast('Datas do cronograma ajustadas.'); close(); depois && depois();
        } catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; }
      };
    },
  });
}

// ---------- 2) FINALIZAR CRONOGRAMA ----------
export function finalizarCronograma(ed, depois) {
  const tops = S.topicos.filter((t) => !t.fora_do_edital);
  const fin = tops.filter((t) => t.concluido).length;
  const feitos = S.tarefas.filter((t) => t.concluido).length;
  modal(`<h3>Finalizar cronograma</h3>
    <p style="margin-top:0"><b>${esc(ed.concurso)}</b>: ${fin} de ${tops.length} tópicos finalizados · ${feitos} de ${S.tarefas.length} blocos cumpridos.</p>
    <p class="muted" style="font-size:14px">O cronograma atual é <b>guardado</b> (com todo o histórico de questões e horas) e sai da lista de editais ativos. Você pode reativá-lo no Perfil quando quiser.</p>
    <div class="campo"><label>E depois?</label>
      <label class="check"><input type="radio" name="fz" value="ciclo" checked> Começar um <b>novo ciclo</b> do mesmo edital (copia as matérias e tópicos, com o calendário zerado)</label>
      <label class="check"><input type="radio" name="fz" value="pdf"> Criar um <b>novo edital</b> anexando o PDF ou o texto do edital (cronograma automático)</label>
      <label class="check"><input type="radio" name="fz" value="nada"> Só finalizar</label></div>
    <div class="row" id="fzCiclo"><div class="campo"><label>Novo ciclo começa na segunda</label><input type="date" id="fzD" value="${iso(addDias(segundaDa(hoje()), 7))}"></div></div>
    <button class="btn vermelho" id="fzOk">Finalizar cronograma</button>`, {
    onMount: (m, close) => {
      m.querySelectorAll('[name=fz]').forEach((r) => (r.onchange = () => (m.querySelector('#fzCiclo').style.display = m.querySelector('[name=fz]:checked').value === 'ciclo' ? '' : 'none')));
      m.querySelector('#fzOk').onclick = async (ev) => {
        const op = m.querySelector('[name=fz]:checked').value;
        ev.target.disabled = true; ev.target.textContent = 'Finalizando…';
        try {
          await db.update('editais', { id: 'eq.' + ed.id }, { ativo: false, finalizado_em: iso(hoje()) });
          if (op === 'ciclo') {
            const n = (ed.concurso.match(/ciclo (\d+)/i)?.[1] | 0) + 1 || 2;
            const nome = ed.concurso.replace(/\s*[—-]\s*ciclo \d+$/i, '') + ` — ciclo ${Math.max(2, n)}`;
            const [novo] = await db.insert('editais', [{ user_id: S.user.id, concurso: nome, cargo: ed.cargo, banca: ed.banca, formato: ed.formato, data_prova: ed.data_prova, data_inicio: m.querySelector('#fzD').value || iso(segundaDa(hoje())) }]);
            const copia = S.topicos.map((t, i) => ({ user_id: S.user.id, edital_id: novo.id, materia: t.materia, topico: t.topico, ordem: t.ordem ?? i, fora_do_edital: t.fora_do_edital, lingua: t.lingua, concluido: false }));
            for (let i = 0; i < copia.length; i += 300) await db.insert('topicos', copia.slice(i, i + 300));
            await db.update('profiles', { id: 'eq.' + S.user.id }, { edital_atual: novo.id });
            toast('Cronograma finalizado. Novo ciclo criado: monte as semanas em Calendário → + Incluir semana.');
            close(); await carregarTudo(); depois && depois();
          } else {
            await db.update('profiles', { id: 'eq.' + S.user.id }, { edital_atual: null });
            close(); await carregarTudo(); toast('Cronograma finalizado e guardado.');
            if (op === 'pdf') importarEdital(depois); else depois && depois();
          }
        } catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; ev.target.textContent = 'Finalizar cronograma'; }
      };
    },
  });
}

// ---------- 3) LER O EDITAL ----------
const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
function carregaPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  return new Promise((ok, erro) => {
    const s = document.createElement('script'); s.src = PDFJS + 'pdf.min.js';
    s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS + 'pdf.worker.min.js'; ok(window.pdfjsLib); };
    s.onerror = () => erro(new Error('Não foi possível carregar o leitor de PDF. Verifique a internet ou cole o texto do edital.'));
    document.head.appendChild(s);
  });
}
export async function textoDoPdf(arquivo, progresso) {
  const lib = await carregaPdfJs();
  const pdf = await lib.getDocument({ data: new Uint8Array(await arquivo.arrayBuffer()) }).promise;
  let out = '';
  for (let p = 1; p <= pdf.numPages; p++) {
    progresso && progresso(p, pdf.numPages);
    const c = await (await pdf.getPage(p)).getTextContent();
    let ultY = null;
    for (const it of c.items) {
      const y = it.transform ? Math.round(it.transform[5]) : null;
      if (ultY != null && y != null && Math.abs(y - ultY) > 2 && !out.endsWith('\n')) out += '\n';
      out += it.str; if (it.hasEOL) out += '\n';
      ultY = y;
    }
    out += '\n';
  }
  return out;
}

const PEQ = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'a', 'o', 'as', 'os', 'para', 'com', 'na', 'no', 'nas', 'nos', 'à', 'ao']);
const titulo = (s) => s.toLowerCase().split(/\s+/).map((w, i) => (i && PEQ.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1))).join(' ');
const IGNORA = /^(anexo|conteudo programatico|conteudos programaticos|conhecimentos (basicos|gerais|especificos|complementares|comuns)|objetos? de avaliacao|cargo|cargos|nivel|escolaridade|bloco [ivx0-9]+|parte [ivx0-9]+|modulo [ivx0-9]+|disciplinas?|materias?|prova objetiva|edital|observac|nota|item)\b/;
const ehMaiusc = (s) => /[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/.test(s) && !/[a-záéíóúâêôãõç]/.test(s);

// Separa o conteúdo programático em matérias e tópicos (estilo Cebraspe "MATÉRIA: 1 ... 2 ..." e FGV/outras com títulos em linha própria)
export function lerConteudoProgramatico(texto) {
  let t = String(texto || '').replace(/\r/g, '').replace(/-\n(?=[a-zà-ú])/g, '').replace(/[ \t]+/g, ' ');
  const nt = norm(t); const k = nt.search(/conteudos? programaticos?|objetos? de avaliacao/);
  if (k > 0) t = t.slice(k);
  // "CONHECIMENTOS BÁSICOS: LÍNGUA PORTUGUESA: 1 ..." -> quebra a linha antes de cada título em maiúsculas
  t = t.replace(/:\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ]{2}[A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9 ,\-–()\/ºª.]{2,90}:\s)/g, ':\n');
  // marca títulos: "MATÉRIA:" (maiúsculas antes de dois-pontos) ou linha inteira em maiúsculas
  const marcas = [];
  const reDois = /(^|\n|[.;]\s+)([A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9 ,\-–()\/ºª.]{2,90}?)\s*:(?=\s)/g;
  let mm;
  while ((mm = reDois.exec(t))) if (ehMaiusc(mm[2]) && mm[2].replace(/[^A-ZÁÉÍÓÚÂÊÔÃÕÇ]/g, '').length >= 4) marcas.push({ i: mm.index + mm[1].length, fim: reDois.lastIndex, nome: mm[2].trim() });
  if (marcas.length < 2) {
    let pos = 0;
    for (const linha of t.split('\n')) {
      const l = linha.trim();
      if (l && ehMaiusc(l) && !/^\d/.test(l) && l.length >= 4 && l.length <= 90 && l.replace(/[^A-ZÁÉÍÓÚÂÊÔÃÕÇ]/g, '').length >= 4) marcas.push({ i: pos, fim: pos + linha.length, nome: l.replace(/:$/, '') });
      pos += linha.length + 1;
    }
  }
  marcas.sort((a, b) => a.i - b.i);
  const mats = [];
  marcas.forEach((m, j) => {
    const nome = m.nome.replace(/\s+/g, ' ').replace(/[.:\s]+$/, '');
    const corpo = t.slice(m.fim, j + 1 < marcas.length ? marcas[j + 1].i : t.length).replace(/\s+/g, ' ').trim();
    if (IGNORA.test(norm(nome)) || !corpo) return;
    // itens numerados em sequência: 1 ... 2 ... 3 ...
    const re = /(?:^|\s)(\d{1,2})(?:\s*[.)–-](?!\d))?\s+(?=["“(]?[A-ZÁÉÍÓÚÂÊÔÃÕÇ])/g;
    const cortes = []; let esp = 1, r;
    while ((r = re.exec(corpo))) if (Number(r[1]) === esp) { cortes.push({ n: esp, i: r.index, fim: re.lastIndex }); esp++; }
    let tops = [];
    if (cortes.length >= 2 || (cortes.length === 1 && cortes[0].i < 3)) {
      tops = cortes.map((c, x) => `${c.n} ${corpo.slice(c.fim, x + 1 < cortes.length ? cortes[x + 1].i : corpo.length).trim()}`);
    } else {
      tops = corpo.split(/;\s+|\.\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ])/).map((x) => x.trim()).filter((x) => x.length > 3);
    }
    tops = tops.map((x) => x.replace(/\s+/g, ' ').replace(/[;.\s]+$/, '.').slice(0, 400)).filter((x) => x.length > 2);
    if (!tops.length) return;
    const nomeOk = titulo(nome.replace(/^NOÇÕES DE /, 'NOÇÕES DE '));
    const ja = mats.find((x) => norm(x.materia) === norm(nomeOk));
    if (ja) ja.topicos.push(...tops); else mats.push({ materia: nomeOk, topicos: tops });
  });
  return mats;
}

// ---------- 4) ANEXAR EDITAL -> EDITAL + CRONOGRAMA AUTOMÁTICO ----------
export function importarEdital(depois) {
  if (S.editais.filter((e) => e.ativo !== false).length >= 3) { toast('Você já tem 3 editais ativos. Finalize ou arquive um antes.', 'erro'); return; }
  modal(`<h3>Criar cronograma a partir do edital</h3>
    <p class="muted" style="font-size:14px;margin-top:0">Anexe o PDF do edital (ou cole o texto do conteúdo programático). O sistema separa as matérias e os tópicos e monta o cronograma semana a semana.</p>
    <div class="campo"><label>PDF do edital</label><input type="file" id="ieF" accept="application/pdf,.pdf,.txt"></div>
    <details><summary class="muted" style="cursor:pointer">ou colar o texto do conteúdo programático</summary><textarea id="ieT" style="min-height:140px;margin-top:6px" placeholder="Ex.: LÍNGUA PORTUGUESA: 1 Compreensão e interpretação de textos. 2 Ortografia oficial. ..."></textarea></details>
    <div class="row" style="margin-top:10px"><button class="btn" id="ieLer">Ler edital</button><span class="muted" id="ieSt" style="font-size:13px"></span></div>
    <div id="ieOut" style="margin-top:14px"></div>`, {
    largo: true,
    onMount: (m, close) => {
      let mats = [];
      const st = (x) => (m.querySelector('#ieSt').textContent = x);
      m.querySelector('#ieLer').onclick = async (ev) => {
        ev.target.disabled = true;
        try {
          let txt = m.querySelector('#ieT').value;
          const f = m.querySelector('#ieF').files[0];
          if (f && /\.txt$/i.test(f.name)) txt = await f.text();
          else if (f) { st('Lendo o PDF…'); txt = await textoDoPdf(f, (p, n) => st(`Lendo página ${p} de ${n}…`)); }
          if (!txt.trim()) throw new Error('Anexe o PDF ou cole o texto do edital.');
          mats = lerConteudoProgramatico(txt);
          if (!mats.length) throw new Error('Não encontrei o conteúdo programático. Cole só a parte das matérias (ex.: "LÍNGUA PORTUGUESA: 1 ... 2 ...").');
          st(`${mats.length} matérias · ${mats.reduce((s, x) => s + x.topicos.length, 0)} tópicos encontrados.`);
          desenha(txt);
        } catch (e) { st(''); toast(e.message, 'erro'); }
        ev.target.disabled = false;
      };
      const desenha = (txt) => {
        const banca = /cebraspe|cespe/i.test(txt) ? 'Cebraspe' : /\bfgv\b|getulio vargas/i.test(txt) ? 'FGV' : /vunesp/i.test(txt) ? 'Vunesp' : /fcc|carlos chagas/i.test(txt) ? 'FCC' : /ibfc/i.test(txt) ? 'IBFC' : /idecan/i.test(txt) ? 'Idecan' : /quadrix/i.test(txt) ? 'Quadrix' : '';
        const out = m.querySelector('#ieOut');
        out.innerHTML = `<div class="grid g2">
          <div><div class="campo"><label>Concurso</label><input id="ieC" style="width:100%" placeholder="Ex.: PCMG 2026"></div>
            <div class="campo"><label>Cargo</label><input id="ieCg" style="width:100%"></div>
            <div class="row"><div class="campo"><label>Banca</label><input id="ieB" value="${esc(banca)}" style="width:140px"></div>
              <div class="campo"><label>Formato</label><select id="ieFm"><option value="certo_errado" ${banca === 'Cebraspe' ? 'selected' : ''}>Certo/Errado</option><option value="multipla_escolha" ${banca !== 'Cebraspe' ? 'selected' : ''}>Múltipla escolha</option></select></div></div>
            <div class="row"><div class="campo"><label>Início (segunda)</label><input type="date" id="ieI" value="${iso(addDias(segundaDa(hoje()), hoje().getDay() === 1 ? 0 : 7))}"></div><div class="campo"><label>Data da prova</label><input type="date" id="ieP"></div></div>
            <div class="row"><div class="campo"><label>Blocos por dia</label><input type="number" id="ieN" min="1" max="8" value="${(Array.isArray(S.profile.blocos) && S.profile.blocos.length) || 3}" style="width:90px"></div>
              <div class="campo"><label>Dias de estudo</label><div class="row">${DIAS_CURTO.slice(0, 6).map((d, i) => `<label class="check" style="margin:0"><input type="checkbox" class="ieDia" value="${i}" ${i < 5 ? 'checked' : ''}> ${d}</label>`).join('')}</div></div></div>
            <label class="check"><input type="checkbox" id="ieRev" checked> Sábado de revisão + questões</label></div>
          <div><div class="mono up">Matérias encontradas (desmarque o que não quiser)</div>
            <div style="max-height:320px;overflow:auto;margin-top:6px">${mats.map((x, i) => `<details style="margin:4px 0"><summary><label class="check" style="display:inline-flex;margin:0"><input type="checkbox" class="ieM" value="${i}" checked> <b>${esc(x.materia)}</b> <span class="muted">(${x.topicos.length})</span></label></summary><ol style="font-size:12.5px;margin:4px 0 8px 18px;padding:0">${x.topicos.map((tp) => `<li>${esc(tp.slice(0, 160))}</li>`).join('')}</ol></details>`).join('')}</div></div></div>
          <div id="iePrev" class="muted" style="margin-top:8px"></div>
          <button class="btn" id="ieCriar" style="margin-top:10px">Criar edital e cronograma</button>`;
        const previa = () => {
          const sel = [...out.querySelectorAll('.ieM:checked')].map((c) => mats[+c.value]);
          const nt = sel.reduce((s, x) => s + x.topicos.length, 0);
          const dias = out.querySelectorAll('.ieDia:checked').length - (out.querySelector('#ieRev').checked && out.querySelector('.ieDia[value="5"]').checked ? 1 : 0);
          const porSem = Math.max(1, dias * (Number(out.querySelector('#ieN').value) || 3));
          const sem = Math.ceil(nt / porSem);
          const ini = parseISO(out.querySelector('#ieI').value) || hoje();
          const fim = addDias(ini, sem * 7 - 1); const prova = parseISO(out.querySelector('#ieP').value);
          out.querySelector('#iePrev').innerHTML = `${sel.length} matérias · ${nt} tópicos · cerca de <b>${sem} semanas</b> de teoria (até ${dataBR(fim)}).${prova ? (fim > prova ? ' <span class="bad">Passa da data da prova: aumente os blocos por dia ou os dias de estudo.</span>' : ` <span class="ok">Termina ${Math.round((prova - fim) / 864e5)} dias antes da prova, sobra tempo para revisão.</span>`) : ''}`;
        };
        out.querySelectorAll('input,select').forEach((i) => i.addEventListener('change', previa)); previa();
        out.querySelector('#ieCriar').onclick = async (ev) => {
          const v = (s) => out.querySelector(s).value.trim();
          if (!v('#ieC')) return toast('Informe o nome do concurso.', 'erro');
          const sel = [...out.querySelectorAll('.ieM:checked')].map((c) => mats[+c.value]);
          if (!sel.length) return toast('Escolha pelo menos uma matéria.', 'erro');
          ev.target.disabled = true;
          try {
            ev.target.textContent = 'Criando edital…';
            const [ed] = await db.insert('editais', [{ user_id: S.user.id, concurso: v('#ieC'), cargo: v('#ieCg') || null, banca: v('#ieB') || null, formato: v('#ieFm'), data_inicio: v('#ieI') || iso(segundaDa(hoje())), data_prova: v('#ieP') || null }]);
            const linhas = []; sel.forEach((x) => x.topicos.forEach((tp) => linhas.push({ user_id: S.user.id, edital_id: ed.id, materia: x.materia, topico: tp, ordem: linhas.length })));
            for (let i = 0; i < linhas.length; i += 300) { ev.target.textContent = `Gravando tópicos ${i}/${linhas.length}…`; await db.insert('topicos', linhas.slice(i, i + 300)); }
            await db.update('profiles', { id: 'eq.' + S.user.id }, { edital_atual: ed.id });
            await carregarTudo(); await trocarEdital(ed.id);
            // monta as semanas até cobrir todos os tópicos
            ev.target.textContent = 'Montando o cronograma…';
            const cfg = { blocos: Math.max(1, Math.min(8, Number(v('#ieN')) || 3)), dias: [...out.querySelectorAll('.ieDia:checked')].map((c) => +c.value), revisao: out.querySelector('#ieRev').checked, freq: Object.fromEntries(sel.map((x) => [x.materia, 'auto'])) };
            if (!cfg.dias.length) cfg.dias = [0, 1, 2, 3, 4];
            const novas = []; const salva = S.tarefas;
            S.tarefas = [];
            for (let w = 1; w <= 104; w++) {
              const plano = montarPlano(w, cfg);
              const teoria = plano.filter((p) => !/^revis/i.test(p.topico));
              if (!teoria.length) break;
              const ws = plano.map((p) => ({ ...p, semana: w, id: 'tmp' + novas.length + '-' + p.ordem, concluido: false }));
              S.tarefas.push(...ws); novas.push(...ws);
            }
            S.tarefas = salva;
            const grava = novas.map(({ id, ...p }) => ({ user_id: S.user.id, edital_id: ed.id, checklist: {}, concluido: false, ...p }));
            for (let i = 0; i < grava.length; i += 300) { ev.target.textContent = `Gravando cronograma ${i}/${grava.length}…`; await db.insert('tarefas', grava.slice(i, i + 300)); }
            await carregarTudo();
            const semanas = new Set(novas.map((x) => x.semana)).size;
            toast(`Edital criado com ${linhas.length} tópicos e cronograma de ${semanas} semanas!`);
            close(); depois && depois();
          } catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; ev.target.textContent = 'Criar edital e cronograma'; }
        };
      };
    },
  });
}
