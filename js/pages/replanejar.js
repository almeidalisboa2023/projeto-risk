// Corrigir atrasos: redistribui blocos não feitos (semana ou mês), com prévia antes de salvar.
import { S } from '../state.js';
import { db } from '../backend.js';
import { esc, hoje, iso, addDias, ddmm, DIAS, DIAS_CURTO, idxDia, segundaDa } from '../util.js';
import { modal, toast } from '../ui.js';
import { blocosPorDia, dataTarefa, posicaoDe } from '../revisoes.js';

export function atrasados() {
  const h = iso(hoje());
  return S.tarefas.filter((t) => !t.concluido && iso(dataTarefa(t)) < h);
}

export function corrigirAtrasos(depois) {
  const atr = atrasados();
  modal(`<h3>Corrigir atrasos</h3>
    <p class="muted" style="font-size:14px">${atr.length ? `Você tem <b>${atr.length}</b> bloco(s) atrasado(s).` : 'Nenhum bloco atrasado. Você ainda pode reorganizar o plano.'} Nada é salvo antes da prévia.</p>
    <div class="campo"><label>Até onde reorganizar?</label>
      <label class="check"><input type="radio" name="alc" value="semana" checked> Só esta semana (até domingo)</label>
      <label class="check"><input type="radio" name="alc" value="mes"> O mês (próximas 4 semanas)</label></div>
    <div class="campo"><label>Como?</label>
      <label class="check"><input type="radio" name="met" value="encaixar" checked> Encaixar os atrasados nos espaços livres (não mexe no resto)</label>
      <label class="check"><input type="radio" name="met" value="empurrar"> Empurrar o plano: atrasados primeiro, o resto anda para frente na mesma ordem</label></div>
    <div class="row"><div class="campo"><label>Blocos por dia</label><input type="number" id="cb" min="1" max="8" value="${blocosPorDia()}" style="width:90px"></div>
      <div class="campo"><label>Dias que podem receber blocos</label><div class="row">${DIAS_CURTO.map((d, i) => `<label class="check" style="margin:0"><input type="checkbox" class="cd" value="${i}" ${i < 6 ? 'checked' : ''}> ${d}</label>`).join('')}</div></div></div>
    <button class="btn" id="cprev">Ver prévia</button><div id="cout" style="margin-top:12px"></div>`, {
    largo: true,
    onMount: (m, close) => {
      let movs = [];
      m.querySelector('#cprev').onclick = () => {
        const alc = m.querySelector('[name=alc]:checked').value, met = m.querySelector('[name=met]:checked').value;
        const cap = Math.max(1, Math.min(8, Number(m.querySelector('#cb').value) || 3));
        const dias = new Set([...m.querySelectorAll('.cd:checked')].map((c) => Number(c.value)));
        if (!dias.size) return toast('Escolha pelo menos um dia.', 'erro');
        movs = planejar({ alc, met, cap, dias });
        const out = m.querySelector('#cout');
        if (!movs.length) { out.innerHTML = '<p class="muted">Nada para mudar com essas opções.</p>'; return; }
        const fora = movs.filter((x) => x.depois).length;
        out.innerHTML = `<div class="mono up">Prévia · ${movs.length} bloco(s) mudam de dia</div>
          ${fora ? `<p class="muted" style="font-size:13px">${fora} bloco(s) não couberam no período e foram para os primeiros dias livres depois dele.</p>` : ''}
          <div class="lista-mov">${movs.map((x) => `<div><b>${DIAS_CURTO[idxDia(x.para)]} ${ddmm(x.para)}</b> ← ${DIAS_CURTO[idxDia(x.de)]} ${ddmm(x.de)} · ${esc(x.t.materia)} — ${esc(x.t.topico.slice(0, 80))}</div>`).join('')}</div>
          <button class="btn" id="csalva" style="margin-top:10px">Aplicar no calendário</button>`;
        out.querySelector('#csalva').onclick = async (ev) => {
          ev.target.disabled = true;
          try {
            let k = 0;
            for (const x of movs) {
              const { semana, dia } = posicaoDe(x.para);
              const [n] = await db.update('tarefas', { id: 'eq.' + x.t.id }, { semana, dia, ordem: x.ordem });
              const i = S.tarefas.findIndex((y) => y.id === x.t.id); if (i >= 0) S.tarefas[i] = n;
              ev.target.textContent = `Salvando ${++k}/${movs.length}…`;
            }
            S.tarefas.sort((a, b) => a.semana - b.semana || (a.ordem ?? 0) - (b.ordem ?? 0));
            toast('Calendário reorganizado!'); close(); depois && depois();
          } catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; }
        };
      };
    },
  });
}

function planejar({ alc, met, cap, dias }) {
  const h = hoje();
  const fim = alc === 'semana' ? addDias(segundaDa(h), 6) : addDias(h, 27);
  const chave = (d) => iso(d);
  const porData = (a, b) => dataTarefa(a) - dataTarefa(b) || (a.ordem ?? 0) - (b.ordem ?? 0);
  const fila = atrasados().sort(porData);
  if (met === 'empurrar') fila.push(...S.tarefas.filter((t) => !t.concluido && dataTarefa(t) >= h && dataTarefa(t) <= fim).sort(porData));
  const mover = new Set(fila.map((t) => t.id));
  // ocupação dos dias pelos blocos que ficam onde estão
  const ocup = new Map(); const maxOrd = new Map();
  for (const t of S.tarefas) {
    if (mover.has(t.id)) continue;
    const k = chave(dataTarefa(t)); ocup.set(k, (ocup.get(k) || 0) + 1); maxOrd.set(k, Math.max(maxOrd.get(k) ?? -1, t.ordem ?? 0));
  }
  const movs = [];
  let d = new Date(h), guarda = 0;
  for (const t of fila) {
    while (guarda++ < 2000) {
      const k = chave(d);
      if (dias.has(idxDia(d)) && posicaoDe(d).semana >= 1 && (ocup.get(k) || 0) < cap) break;
      d = addDias(d, 1);
    }
    const k = chave(d); const ordem = (maxOrd.get(k) ?? -1) + 1;
    ocup.set(k, (ocup.get(k) || 0) + 1); maxOrd.set(k, ordem);
    const de = dataTarefa(t);
    if (chave(de) !== k || (t.ordem ?? 0) !== ordem) movs.push({ t, de, para: new Date(d), ordem, depois: d > fim });
  }
  return movs.filter((x) => chave(x.de) !== chave(x.para));
}
