// Revisões: pontos fracos, revisão espaçada e agendamento no calendário.
import { S, topicosValidos } from './state.js';
import { db } from './backend.js';
import { hoje, iso, addDias, parseISO, semanaDe, idxDia, DIAS, dataDaTarefa, ddmm, esc } from './util.js';
import { modal, toast } from './ui.js';

export const blocosPorDia = () => (Array.isArray(S.profile?.blocos) && S.profile.blocos.length) || 3;
export const dataTarefa = (t) => dataDaTarefa(S.edital.data_inicio, t.semana, t.dia);
export const posicaoDe = (d) => ({ semana: semanaDe(S.edital.data_inicio, d), dia: DIAS[idxDia(d)] });

// ---------- pontos fracos ----------
// Para cada tópico: acerto, volume de questões e dias sem contato. Gera uma nota de prioridade e o motivo.
export function sugestoes(limite = 8) {
  const h = hoje();
  const por = new Map();
  for (const l of S.logs) {
    if (!l.topico_id) continue;
    const a = por.get(l.topico_id) || { f: 0, a: 0, ult: null };
    a.f += l.feitas; a.a += l.acertos; if (!a.ult || l.data > a.ult) a.ult = l.data;
    por.set(l.topico_id, a);
  }
  const ultTarefa = new Map(); const futura = new Set();
  for (const t of S.tarefas) {
    if (!t.topico_id) continue;
    const d = iso(dataTarefa(t));
    if (t.concluido && (!ultTarefa.get(t.topico_id) || d > ultTarefa.get(t.topico_id))) ultTarefa.set(t.topico_id, d);
    if (!t.concluido && d >= iso(h) && /^revis/i.test(t.topico)) futura.add(t.topico_id);
  }
  const out = [];
  for (const tp of topicosValidos()) {
    const st = por.get(tp.id); const ut = ultTarefa.get(tp.id);
    const ultimo = [st?.ult, ut].filter(Boolean).sort().pop();
    if (!st && !tp.concluido && !ut) continue; // ainda não estudado: não é revisão
    const taxa = st && st.f ? Math.round((st.a / st.f) * 100) : null;
    const dias = ultimo ? Math.round((h - parseISO(ultimo)) / 864e5) : 999;
    let pts = 0; const mot = [];
    if (taxa != null && taxa < 70) { pts += (70 - taxa) * 1.5 + 10; mot.push(`${taxa}% de acerto`); }
    if (taxa != null && taxa >= 70 && taxa < 80 && st.f < 40) { pts += 6; mot.push(`${taxa}% em poucas questões`); }
    if (!st || st.f < 15) { pts += 12; mot.push(st ? `só ${st.f} questões feitas` : 'nenhuma questão registrada'); }
    if (dias >= 21) { pts += Math.min(30, dias - 14); mot.push(dias >= 999 ? 'sem data de estudo' : `não revisa há ${dias} dias`); }
    else if (dias >= 10) { pts += 6; mot.push(`${dias} dias sem ver`); }
    if (pts < 12 || futura.has(tp.id)) continue;
    out.push({ tp, taxa, feitas: st?.f || 0, dias, pts, motivo: mot.join(' · ') });
  }
  return out.sort((a, b) => b.pts - a.pts).slice(0, limite);
}

// ---------- agendar ----------
async function inserir(linhas) {
  const novas = await db.insert('tarefas', linhas.map((l) => ({ user_id: S.user.id, edital_id: S.edital.id, checklist: {}, concluido: false, ...l })));
  S.tarefas.push(...novas);
  S.tarefas.sort((a, b) => a.semana - b.semana || (a.ordem ?? 0) - (b.ordem ?? 0));
  return novas;
}
const proxOrdem = (semana, dia) => Math.max(-1, ...S.tarefas.filter((t) => t.semana === semana && t.dia === dia).map((t) => t.ordem ?? 0)) + 1;

export async function agendarRevisao(tp, data, origem = 'revisao') {
  const { semana, dia } = posicaoDe(data);
  if (semana < 1) throw new Error('Data anterior ao início do plano.');
  return inserir([{ semana, dia, ordem: proxOrdem(semana, dia), materia: tp.materia, topico: 'Revisão + questões: ' + tp.topico, topico_id: tp.id, origem }]);
}

export function escolherDia(tp, depois) {
  const h = hoje();
  const opc = Array.from({ length: 14 }, (_, i) => addDias(h, i + 1));
  const ocup = (d) => { const p = posicaoDe(d); return S.tarefas.filter((t) => t.semana === p.semana && t.dia === p.dia).length; };
  modal(`<h3>Agendar revisão</h3><p class="muted" style="font-size:14px">${esc(tp.materia)} — ${esc(tp.topico)}</p>
    <div class="campo"><label>Em qual dia?</label><select id="rd" style="width:100%">${opc.map((d) => `<option value="${iso(d)}">${DIAS[idxDia(d)]} ${ddmm(d)} · ${ocup(d)}/${blocosPorDia()} blocos</option>`).join('')}</select></div>
    <button class="btn" id="rok">Colocar no calendário</button>`, {
    onMount: (m, close) => (m.querySelector('#rok').onclick = async () => {
      try { await agendarRevisao(tp, parseISO(m.querySelector('#rd').value)); toast('Revisão agendada!'); close(); depois && depois(); } catch (e) { toast(e.message, 'erro'); }
    }),
  });
}

// Revisão espaçada: ao finalizar um assunto, agenda revisões em +1, +7 e +30 dias (se ligado no Perfil)
export async function revisoesEspacadas(tp) {
  if (S.profile.revisao_auto === false) return 0;
  const h = hoje(); const linhas = [];
  for (const n of [1, 7, 30]) {
    const { semana, dia } = posicaoDe(addDias(h, n));
    if (S.tarefas.some((t) => t.topico_id === tp.id && t.semana === semana && t.dia === dia)) continue;
    linhas.push({ semana, dia, ordem: proxOrdem(semana, dia) + linhas.filter((l) => l.semana === semana && l.dia === dia).length, materia: tp.materia, topico: `Revisão: ${tp.topico}`, topico_id: tp.id, origem: 'revisao_' + n });
  }
  if (linhas.length) await inserir(linhas);
  return linhas.length;
}
