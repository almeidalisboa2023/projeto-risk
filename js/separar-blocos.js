// Separar blocos com várias matérias juntas.
// Cronogramas antigos (importados do Base44 ou colados em texto, ex.: "Segunda: Português, Constitucional e Administrativo")
// podem ter gravado um único bloco com várias matérias dentro. Aqui o app detecta esses blocos e os divide em
// um bloco por matéria, no mesmo dia e na mesma posição, ligando cada um ao assunto do edital quando possível.
import { S } from './state.js';
import { db } from './backend.js';
import { norm } from './util.js';
import { visiveis } from './leitura/index.js';

const limpa = (s) => norm(s).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const GENERICO = new Set(['direito', 'lingua', 'legislacao', 'nocoes', 'nocoes de', 'de', 'do', 'da', 'e']);

// chaves de cada matéria: nome do edital, nome da leitura e apelidos (sem palavras genéricas)
function chaves() {
  const lista = [];
  const add = (nome, ks) => {
    const out = new Set();
    for (const k of ks) {
      const c = limpa(k); if (!c || GENERICO.has(c)) continue;
      out.add(c);
      const sem = c.replace(/^(direito|nocoes de direito|nocoes de|legislacao|lingua)\s+(do |da |de )?/, '').trim();
      if (sem && sem.length >= 4 && !GENERICO.has(sem)) out.add(sem);
    }
    if (out.size) lista.push({ nome, ks: [...out].sort((a, b) => b.length - a.length) });
  };
  const doEdital = [...new Set((S.topicos || []).map((t) => t.materia).filter(Boolean))];
  let leituras = [];
  try { leituras = visiveis(); } catch { leituras = []; }
  for (const nome of doEdital) {
    const n = limpa(nome);
    const lt = leituras.find((m) => (m.apelidos || []).some((a) => n.includes(limpa(a))) || limpa(m.nome) === n);
    add(nome, [nome, ...(lt ? [lt.nome, ...(lt.apelidos || [])] : [])]);
  }
  for (const m of leituras) if (!lista.some((x) => limpa(x.nome) === limpa(m.nome))) add(m.nome, [m.nome, ...(m.apelidos || [])]);
  return lista;
}

// posição de cada matéria encontrada no texto (uma vez por matéria, na ordem em que aparece)
function achados(txt, ch) {
  const t = ' ' + limpa(txt) + ' ';
  const out = [];
  for (const m of ch) {
    let pos = -1, k0 = '';
    for (const k of m.ks) { const i = t.indexOf(' ' + k + ' '); if (i >= 0 && (pos < 0 || i < pos)) { pos = i; k0 = k; } }
    if (pos >= 0 && !out.some((o) => o.pos <= pos && pos < o.pos + o.k.length + 1)) out.push({ nome: m.nome, pos, k: k0 });
  }
  return out.sort((a, b) => a.pos - b.pos);
}

// Um bloco é "misto" quando o campo matéria cita duas ou mais matérias, ou quando a matéria não é reconhecida
// e o assunto lista duas ou mais matérias separadas (vírgula, barra, ponto e vírgula, "+", quebra de linha).
export function blocoMisto(t, ch = chaves()) {
  if (!t || /^revis/i.test(t.topico || '')) return null;
  const naMat = achados(t.materia || '', ch);
  if (naMat.length >= 2) return { fonte: 'materia', itens: naMat };
  const reconhecida = naMat.length === 1;
  if (!reconhecida && /[,;|+\n/]/.test(t.topico || '')) {
    const noTop = achados(t.topico || '', ch);
    if (noTop.length >= 2) return { fonte: 'topico', itens: noTop };
  }
  return null;
}

export function blocosMistos(lista = S.tarefas) {
  const ch = chaves();
  return (lista || []).filter((t) => !t.concluido && blocoMisto(t, ch));
}

function topicoDo(materia, txt) {
  const x = limpa(txt);
  const ts = (S.topicos || []).filter((t) => t.materia === materia && !t.fora_do_edital);
  if (x.length >= 5) {
    const hit = ts.find((t) => limpa(t.topico).includes(x) || (x.length >= 12 && x.includes(limpa(t.topico).slice(0, 30))));
    if (hit) return hit;
  }
  const agendados = new Set((S.tarefas || []).filter((t) => t.topico_id).map((t) => t.topico_id));
  return ts.sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0)).find((t) => !t.concluido && !agendados.has(t.id)) || null;
}

// Divide o bloco: cada matéria vira um bloco próprio no mesmo dia, na mesma posição.
export async function separarBloco(t) {
  const info = blocoMisto(t);
  if (!info) return 0;
  const fonte = info.fonte === 'materia' ? t.materia : t.topico;
  const tf = ' ' + limpa(fonte) + ' ';
  const pedacosFonte = String(fonte || '').split(/\s*(?:[,;|+\n]|\s\/\s)\s*/).filter(Boolean);
  const pedacosTopico = info.fonte === 'materia' ? String(t.topico || '').split(/\s*(?:;|\||\n|\s\/\s|\s\+\s)\s*/).filter(Boolean) : [];
  const itens = info.itens.map((it, i) => {
    const fim = i + 1 < info.itens.length ? info.itens[i + 1].pos : tf.length;
    const chave = tf.slice(it.pos + it.k.length + 1, fim).replace(/^[\s\-:]+|[\s,;+\-]+$/g, '').replace(/\s+e$/, '').trim();
    let resto = '';
    if (info.fonte === 'materia') resto = pedacosTopico.length === info.itens.length ? pedacosTopico[i] : '';
    else { const pc = pedacosFonte.find((p) => (' ' + limpa(p) + ' ').includes(' ' + it.k + ' ')); resto = pc && limpa(pc) !== it.k ? pc.trim() : ''; }
    const tp = topicoDo(it.nome, resto || chave);
    return { materia: it.nome, topico: tp ? tp.topico : (resto || it.nome), topico_id: tp?.id || null };
  });
  const n = itens.length;
  const base = t.ordem ?? 0;
  // abre espaço para os novos blocos depois do original
  const depois = (S.tarefas || []).filter((x) => x.id !== t.id && x.semana === t.semana && x.dia === t.dia && (x.ordem ?? 0) > base);
  for (const x of depois) { const [u] = await db.update('tarefas', { id: 'eq.' + x.id }, { ordem: (x.ordem ?? 0) + n - 1 }); Object.assign(x, u || { ordem: (x.ordem ?? 0) + n - 1 }); }
  const [primeiro] = await db.update('tarefas', { id: 'eq.' + t.id }, { materia: itens[0].materia, topico: itens[0].topico, topico_id: itens[0].topico_id });
  Object.assign(t, primeiro || itens[0]);
  if (n > 1) {
    const novas = await db.insert('tarefas', itens.slice(1).map((it, k) => ({
      user_id: t.user_id || S.user.id, edital_id: t.edital_id || S.edital?.id, semana: t.semana, dia: t.dia, ordem: base + k + 1,
      materia: it.materia, topico: it.topico, topico_id: it.topico_id, checklist: {}, concluido: false, previsto: t.previsto || null,
    })));
    S.tarefas.push(...novas);
  }
  S.tarefas.sort((a, b) => a.semana - b.semana || (a.ordem ?? 0) - (b.ordem ?? 0));
  return n;
}

export async function separarTodos(lista) {
  let total = 0;
  for (const t of lista) total += (await separarBloco(t)) > 1 ? 1 : 0;
  return total;
}
