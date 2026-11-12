// Cursos do Projeto R.I.S.K.: cada curso segue o último edital do concurso e libera só as matérias dele.
// O aluno escolhe o curso no cadastro; o administrador confere, define a banca e pode remover/restaurar matérias.
import { S } from './state.js';
import { norm } from './util.js';

// Bancas: o "padrão" muda o formato das questões mostradas por padrão (C/E ou múltipla escolha)
// e, quando a banca usa 4 alternativas (A a D), as questões de múltipla escolha aparecem com 4 opções.
export const BANCAS = {
  cebraspe: { nome: 'Cebraspe', formato: 'ce', desc: 'Certo ou Errado' },
  fgv: { nome: 'FGV', formato: 'me', alts: 5, desc: 'Múltipla escolha (A a E)' },
  consulplan: { nome: 'Instituto Consulplan', formato: 'me', alts: 4, desc: 'Múltipla escolha (A a D)' },
  fumarc: { nome: 'FUMARC', formato: 'me', alts: 4, desc: 'Múltipla escolha (A a D)' },
  'pmmg-crs': { nome: 'PMMG (CRS/APM)', formato: 'me', alts: 4, desc: 'Múltipla escolha (A a D)' },
  ibfc: { nome: 'IBFC', formato: 'me', desc: 'Múltipla escolha' },
  vunesp: { nome: 'Vunesp', formato: 'me', alts: 5, desc: 'Múltipla escolha (A a E)' },
  fcc: { nome: 'FCC', formato: 'me', alts: 5, desc: 'Múltipla escolha (A a E)' },
  idecan: { nome: 'IDECAN', formato: 'me', desc: 'Múltipla escolha' },
  aocp: { nome: 'Instituto AOCP', formato: 'me', alts: 5, desc: 'Múltipla escolha (A a E)' },
  fundep: { nome: 'Fundep (Gestão de Concursos)', formato: 'me', desc: 'Múltipla escolha' },
};
export const bancaInfo = (id) => BANCAS[id] || null;

// m(id, assuntos?): matéria do curso; sem lista de assuntos = matéria inteira
const m = (id, assuntos = null, obs = '') => ({ id, assuntos, obs });

export const CURSOS = [
  {
    id: 'prf', nome: 'PRF · Policial Rodoviário Federal', curto: 'PRF', banca: 'cebraspe',
    edital: 'Baseado no último edital (PRF 2021, Cebraspe). Prova objetiva de Certo/Errado + discursiva.',
    materias: [
      m('portugues'), m('rlm'), m('informatica'), m('fisica'), m('etica-cidadania'), m('geopolitica'), m('lingua-estrangeira'),
      m('transito'), m('resolucoes-ctb'),
      m('administrativo'), m('constitucional'), m('penal'), m('processo-penal'), m('extravagante'), m('direitos-humanos'),
      m('redacao'),
    ],
  },
  {
    id: 'cfs-pmmg-2027', nome: 'CFS PMMG 2027 · Curso de Formação de Sargentos', curto: 'CFS PMMG', banca: 'pmmg-crs',
    edital: 'Edital DRH/CRS nº 05/2026 (Anexo B). Prova objetiva + redação.',
    materias: [
      m('portugues'), m('redacao'),
      m('doutrina-pmmg'), m('institucional-pmmg'),
      m('constitucional', ['direitos-individuais', 'garantias', 'remedios', 'administracao-publica', 'judiciario', 'defesa-estado'], 'CF: Título II cap. I; Adm. Pública (disp. gerais e militares dos Estados); Justiça Militar e dos Estados; Forças Armadas e Segurança Pública'),
      m('constituicao-mg'), m('cpm'), m('cppm'),
      m('penal', ['principios', 'aplicacao', 'tipicidade', 'ilicitude', 'culpabilidade', 'concurso-pessoas', 'pessoa-patrimonio', 'sexual-incolumidade', 'fe-administracao'], 'CP: Parte Geral (títulos I a IV) e crimes contra a pessoa, patrimônio, dignidade sexual e praticados por particular contra a Administração'),
      m('processo-penal', ['principios-pp', 'prova', 'busca', 'flagrante', 'preventiva'], 'CPP: disposições preliminares, prova (gerais, corpo de delito, cadeia de custódia, indícios, busca) e prisão/cautelares'),
      m('lindb'),
      m('administrativo', ['improbidade'], 'Lei 8.429/1992 (improbidade)'),
      m('extravagante', ['desarmamento', 'drogas', 'abuso'], 'Leis 10.826/2003, 11.343/2006 e 13.869/2019'),
    ],
  },
  {
    id: 'pcmg-investigador', nome: 'PCMG · Investigador de Polícia I', curto: 'PCMG Investigador', banca: 'fgv',
    edital: 'Baseado no último edital (Edital nº 04/2024, FGV): 70 questões de múltipla escolha (A a E).',
    materias: [
      m('portugues'), m('rlm'),
      m('informatica', ['hardware-so', 'redes-internet', 'internet-navegadores', 'email-outlook', 'seguranca', 'certificacao-software-livre', 'office', 'apresentacoes'], 'Informática Básica do Edital 04/2024'),
      m('lei-organica-pcmg'),
      m('administrativo'), m('constitucional'), m('penal'), m('processo-penal'),
      m('extravagante', ['hediondos', 'drogas', 'desarmamento', 'abuso', 'maria-penha', 'orcrim', 'interceptacao', 'lep', 'crimes-tributarios', 'crimes-ctb', 'anticrime'], 'Leis do item 5.7 do edital (LEP, hediondos, 8.137, interceptação, CTB, desarmamento, Maria da Penha, drogas, organização criminosa, abuso de autoridade e Pacote Anticrime)'),
      m('direitos-humanos'), m('medicina-legal'), m('criminologia'),
    ],
  },
  {
    id: 'pcmg-escrivao', nome: 'PCMG · Escrivão de Polícia I', curto: 'PCMG Escrivão', banca: 'fgv',
    edital: 'Último edital de Escrivão foi o de 2021 (FUMARC); o próximo concurso da PCMG está com a FGV, por isso o curso segue o modelo FGV de 2024. Há prova de digitação.',
    materias: [
      m('portugues'), m('rlm'), m('informatica'), m('lei-organica-pcmg'),
      m('administrativo'), m('constitucional'), m('penal'), m('processo-penal'), m('extravagante'),
      m('direitos-humanos'), m('medicina-legal'), m('criminologia'),
    ],
  },
  {
    id: 'pcmg-delegado', nome: 'PCMG · Delegado de Polícia Substituto', curto: 'PCMG Delegado', banca: 'fgv',
    edital: 'Baseado no último edital (Edital nº 01/2024, FGV): 80 questões objetivas, prova dissertativa e prova oral.',
    materias: [
      m('administrativo'), m('lei-organica-pcmg'), m('constitucional'), m('civil'),
      m('penal'), m('processo-penal'), m('extravagante'),
      m('direitos-humanos'), m('medicina-legal'), m('criminologia'), m('redacao'),
    ],
  },
  {
    id: 'belovale-procurador', nome: 'Belo Vale · Procurador I', curto: 'Procurador Belo Vale', banca: 'consulplan',
    edital: 'Edital nº 1/2026 do Município de Belo Vale (Instituto Consulplan), Quadro V: 50 questões de múltipla escolha (A a D). Prova objetiva em 13/12/2026.',
    materias: [
      m('portugues'), m('constitucional'), m('administrativo'), m('processo-civil'), m('civil'),
      m('trabalho'), m('previdenciario'), m('financeiro'), m('ambiental-urbanistico'), m('belovale'),
    ],
  },
];
export const cursoInfo = (id) => CURSOS.find((c) => c.id === id) || null;

// Curso efetivo do aluno logado (o que o administrador definiu)
export const meuCurso = () => (S.profile?.role === 'admin' ? null : cursoInfo(S.profile?.curso));
export const minhaBanca = () => bancaInfo(S.profile?.banca) || null;

// Matérias do curso com os ajustes do administrador (tabela cursos_ajustes): tira as excluídas e põe as incluídas.
export function materiasDoCurso(c, ajustes = S.cursosAjustes || []) {
  if (!c) return [];
  const aj = ajustes.find((x) => x.curso === c.id) || {};
  const fora = new Set(aj.excluidas || []);
  const lista = c.materias.filter((it) => !fora.has(it.id));
  for (const id of aj.incluidas || []) if (!fora.has(id) && !lista.some((it) => it.id === id)) lista.push(m(id));
  return lista;
}

// Filtra a lista completa de matérias para o aluno: só as do curso, sem as removidas pelo administrador,
// e com os assuntos restritos ao que o edital cobra. Sem curso definido (contas antigas) ou administrador: tudo.
export function filtrarMaterias(todas, perfil = S.profile) {
  if (!perfil || perfil.role === 'admin') return todas;
  const c = cursoInfo(perfil.curso);
  // Aluno sem curso definido: vê só as matérias que aparecem no edital dele
  if (!c) {
    const nomes = [...new Set((S.topicos || []).map((t) => norm(t.materia || '')))].filter(Boolean);
    return todas.filter((m) => !m.nova && nomes.some((n) => (m.apelidos || []).some((a) => n.includes(a))));
  }
  const fora = new Set(perfil.materias_removidas || []);
  const out = [];
  for (const item of materiasDoCurso(c)) {
    if (fora.has(item.id)) continue;
    const mat = todas.find((x) => x.id === item.id);
    if (!mat) continue;
    if (!item.assuntos) { out.push(mat); continue; }
    const ass = mat.assuntos.filter((a) => a.extra || item.assuntos.includes(a.id)); // tópicos enviados em PDF entram sempre
    if (ass.length) out.push({ ...mat, assuntos: ass, recorte: item.obs });
  }
  // Matérias novas criadas a partir de PDF, marcadas pelo administrador para este curso
  for (const mat of todas) if (mat.nova && (mat.cursos || []).includes(c.id) && !fora.has(mat.id)) out.push(mat);
  return out;
}
