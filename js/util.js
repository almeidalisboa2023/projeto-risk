export const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
export const DIAS_CURTO = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const SEMANA_EXT = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const norm = (s) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

export function hoje() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
export function iso(d) { const z = new Date(d); return `${z.getFullYear()}-${String(z.getMonth() + 1).padStart(2, '0')}-${String(z.getDate()).padStart(2, '0')}`; }
export function parseISO(s) { if (!s) return null; const [y, m, d] = String(s).slice(0, 10).split('-').map(Number); return new Date(y, m - 1, d); }
export function addDias(d, n) { const z = new Date(d); z.setDate(z.getDate() + n); return z; }
export function ddmm(d) { return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`; }
export function dataExtenso(d) { return `${SEMANA_EXT[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`; }
export function idxDia(d) { return (d.getDay() + 6) % 7; } // 0 = segunda
export function segundaDa(d) { return addDias(hoje0(d), -idxDia(d)); }
function hoje0(d) { const z = new Date(d); z.setHours(0, 0, 0, 0); return z; }

// Semana N começa em data_inicio (segunda-feira) + 7*(N-1)
export function inicioSemana(dataInicio, semana) { return addDias(segundaDa(parseISO(dataInicio) || hoje()), 7 * (semana - 1)); }
export function semanaDe(dataInicio, d) {
  const base = segundaDa(parseISO(dataInicio) || hoje());
  return Math.floor((segundaDa(d) - base) / (7 * 864e5)) + 1;
}
export function dataDaTarefa(dataInicio, semana, dia) { return addDias(inicioSemana(dataInicio, semana), DIAS.indexOf(dia)); }

export const pct = (a, b) => (b ? Math.round((a / b) * 100) : null);
export const corPct = (p) => (p == null ? '' : p >= 70 ? 'ok' : 'bad');

// Código do tópico ("5.4/5.5 Pontuação" -> ["5.4/5.5", "Pontuação"])
export function separaCodigo(t) {
  const m = String(t || '').match(/^\s*((?:\d+[\.\d]*(?:\s*(?:\/|-|e)\s*\d+[\.\d]*)*)\.?)\s+(.*)$/);
  return m ? [m[1].replace(/\.$/, ''), m[2]] : ['', String(t || '')];
}

export function tipoBloco(topico) {
  const t = norm(topico);
  if (t.startsWith('revisao + questoes') || t.includes('treino com questoes') || t.startsWith('resolucao')) return 'Questões';
  if (t.startsWith('revisao')) return 'Revisão';
  return 'Teoria';
}

// Agrupa logs por tópico
export function somaLogs(logs, filtro = () => true) {
  const m = new Map();
  for (const l of logs) {
    if (!filtro(l)) continue;
    const k = l.topico_id || 'sem';
    const a = m.get(k) || { feitas: 0, acertos: 0, app: 0, externa: 0 };
    a.feitas += l.feitas; a.acertos += l.acertos; a[l.origem === 'app' ? 'app' : 'externa'] += l.feitas;
    m.set(k, a);
  }
  return m;
}

export const FRASES = [
  ['A repetição é a mãe da aprendizagem.', 'Provérbio popular'],
  ['Água mole em pedra dura, tanto bate até que fura.', 'Provérbio popular'],
  ['O sucesso é a soma de pequenos esforços repetidos dia após dia.', 'Robert Collier'],
  ['Não é preciso ver toda a escada. Apenas dê o primeiro passo.', 'Martin Luther King Jr.'],
  ['A disciplina é a ponte entre metas e realizações.', 'Jim Rohn'],
  ['Quem quer faz um caminho; quem não quer arruma uma desculpa.', 'Provérbio popular'],
  ['A educação é a arma mais poderosa que você pode usar para mudar o mundo.', 'Nelson Mandela'],
  ['O segredo de progredir é começar.', 'Mark Twain'],
  ['Devagar se vai ao longe.', 'Provérbio popular'],
  ['Tudo parece impossível até que seja feito.', 'Nelson Mandela'],
  ['A persistência é o caminho do êxito.', 'Charles Chaplin'],
  ['Faça o teu melhor, na condição que você tem, enquanto você não tem condições melhores.', 'Mario Sergio Cortella'],
  ['Grandes realizações são possíveis quando se dá atenção aos pequenos começos.', 'Lao-Tsé'],
  ['O que sabemos é uma gota; o que ignoramos é um oceano.', 'Isaac Newton'],
  ['A pequena disciplina diária constrói grandes resultados.', 'Autor desconhecido'],
  ['Quem estuda hoje, comemora amanhã.', 'Autor desconhecido'],
  ['A constância vence o talento quando o talento não é constante.', 'Autor desconhecido'],
  ['Feito é melhor que perfeito.', 'Provérbio popular'],
];
