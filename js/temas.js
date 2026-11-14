// Temas do calendário: reconhecidos pelo edital do aluno. O administrador pode trocar;
// o aluno só pode escolher entre "tema do meu edital" e o tema padrão.
import { S, visaoAluno } from './state.js';
import { meuCurso } from './cursos.js';
import { norm, esc } from './util.js';

export const TEMAS = {
  padrao: { nome: 'Padrão R.I.S.K.' },
  rodoviario: { nome: 'Rodoviário (PRF)', selo: '🚓', titulo: 'Plano de patrulha', hoje: 'HOJE', cod: 'BLOCO', btn: 'Concluir bloco', feito: '✓ Concluído', atraso: 'ATRASADO', revisao: 'Revisão', ico: '🚨', icoFeito: '✅', progresso: 'estrada' },
  juridico: { nome: 'Jurídico', selo: '⚖', titulo: 'Pauta da semana', hoje: 'PAUTA DE HOJE', cod: 'AUTOS Nº', btn: 'Despachar bloco', feito: '✓ Despachado', carimbo: 'DEFERIDO', atraso: 'PRAZO VENCIDO', revisao: 'Revisão', ico: '📜', icoFeito: '⚖', progresso: 'processo' },
  administrativo: { nome: 'Administrativo', selo: '🗂', titulo: 'Agenda de expediente', hoje: 'HOJE', cod: 'PROTOCOLO', btn: 'Concluir ficha', feito: '✓ Arquivado', atraso: 'PENDENTE', revisao: 'Lembrete', ico: '📎', icoFeito: '✅', progresso: 'fichas' },
  bombeiro: { nome: 'Bombeiro Militar', selo: '🚒', titulo: 'Escala de plantão', hoje: 'PLANTÃO HOJE', cod: 'OC. #', btn: 'Atender ocorrência', feito: '✓ Fogo extinto', atraso: 'EM ATRASO', revisao: 'Instrução', ico: '🔥', icoFeito: '✅', progresso: 'escada' },
  pm: { nome: 'Polícia Militar', selo: '★', titulo: 'Ordem de serviço', hoje: 'EM SERVIÇO', cod: 'MISSÃO #', btn: 'Cumprir missão', feito: '✓ Missão cumprida', atraso: 'REFORÇO', revisao: 'Instrução', ico: '🎯', icoFeito: '✅', progresso: 'carreira' },
  civil: { nome: 'Polícia Civil', selo: '🔎', titulo: 'Quadro de investigação', hoje: 'PLANTÃO', cod: 'IP Nº', btn: 'Cumprir diligência', feito: '✓ Diligência cumprida', atraso: 'PRAZO VENCIDO', revisao: 'Reanálise', ico: '📌', icoFeito: '✅', progresso: 'etapas', etapas: [['📝', 'Boletim'], ['🔎', 'Investigação'], ['🧪', 'Provas'], ['📂', 'Relatório'], ['⭐', 'Aprovação']], rotulo: 'Andamento do inquérito' },
  federal: { nome: 'Polícia Federal', selo: '🛰', titulo: 'Plano de operações', hoje: 'EM CAMPO', cod: 'OPERAÇÃO', btn: 'Deflagrar operação', feito: '✓ Operação concluída', atraso: 'EM ATRASO', revisao: 'Reanálise', ico: '🎯', icoFeito: '✅', progresso: 'etapas', etapas: [['📡', 'Inteligência'], ['🗺', 'Planejamento'], ['🚨', 'Deflagração'], ['📊', 'Análise'], ['⭐', 'Aprovação']], rotulo: 'Fases da operação' },
  gm: { nome: 'Guarda Municipal', selo: '🛡', titulo: 'Escala de ronda', hoje: 'EM RONDA', cod: 'RONDA #', btn: 'Fazer ronda', feito: '✓ Ronda concluída', atraso: 'PENDENTE', revisao: 'Instrução', ico: '📍', icoFeito: '✅', progresso: 'rota' },
};

// Reconhece o tema pelo nome do concurso e do cargo
export function detectarTema(ed) {
  if (!ed) return 'padrao';
  const t = ' ' + norm([ed.concurso, ed.cargo].filter(Boolean).join(' ')) + ' ';
  if (/\bprf\b|rodoviari/.test(t)) return 'rodoviario';
  if (/policia federal|\bpf\b|\bdpf\b|agente federal|delegado federal|escrivao federal|papiloscopista federal/.test(t)) return 'federal';
  if (/bombeir|\bcbm/.test(t)) return 'bombeiro';
  if (/guarda (civil )?municipal|guarda civil|\bgcm\b|\bgm\b/.test(t)) return 'gm';
  if (/policia militar|\bpm[a-z]{0,2}\b|soldado|\bcfsd\b|\bcfs\b/.test(t)) return 'pm';
  if (/policia civil|\bpc[a-z]{2}\b|\bpc\b|delegad|investigador|escrivao|inspetor de policia|agente de policia|perito criminal|papiloscopista|policia judiciaria/.test(t)) return 'civil';
  if (/procurad|advoga|tribunal|\btj[a-z]{0,2}\b|\btr[ft]\b|magistrat|promotor|ministerio publico|defensor|judiciari|cartori|juiz/.test(t)) return 'juridico';
  if (/administrativ|assistente|auxiliar|escriturari|agente de|tecnico|oficial de/.test(t)) return 'administrativo';
  return 'padrao';
}

// Tema do edital (escolha do administrador ou reconhecido automaticamente)
export const temaDoEdital = (ed) => (ed?.tema && TEMAS[ed.tema] ? ed.tema : detectarTema(ed));
// Tema em uso: o aluno pode preferir o padrão
// (aluno de curso: o tema do curso — PCMG = Polícia Civil, PRF = Rodoviário, CFS = PM…)
export function temaAtual() {
  const v = visaoAluno();
  if (S.profile?.tema_padrao && !v) return 'padrao';
  if (S.edital?.tema && TEMAS[S.edital.tema]) return S.edital.tema;
  const c = meuCurso();
  if (c?.tema && TEMAS[c.tema]) return c.tema;
  return temaDoEdital(S.edital);
}

// Barra de progresso temática (pct = % de tópicos finalizados)
export function progressoHTML(id, pct, extra = '') {
  const T = TEMAS[id]; const p = Math.max(0, Math.min(100, pct || 0));
  const etapas = (lista, chave) => {
    const n = lista.length; const atual = Math.min(n - 1, Math.floor((p / 100) * (n - 1) + 0.0001));
    return lista.map((x, i) => `<div class="tp-etapa ${i < atual ? 'ok' : i === atual ? 'agora' : ''}"><b>${i < atual ? '✓' : x[0]}</b>${esc(x[1])}${i === atual ? '<small>você está aqui</small>' : ''}</div>`).join('');
  };
  if (T.progresso === 'estrada') return `<div class="tp-estrada"><div class="tp-feito" style="width:${p}%"></div><div class="tp-carro" style="left:calc(${p}% - 22px)">🚓</div><div class="tp-rot">${p}% do edital percorrido${extra}</div></div>`;
  if (T.progresso === 'escada') return `<div class="tp-box"><div class="tp-tit">Subida na escada · edital</div><div class="tp-escada"><div class="tp-degraus">${Array.from({ length: 20 }, (_, i) => `<i class="${i < Math.round(p / 5) ? 'on' : ''}"></i>`).join('')}</div><span class="tp-boneco" style="left:calc(${p}% - 16px)">🧑‍🚒</span></div><div class="tp-leg"><span>Início</span><b>${p}% · ${Math.round(p / 5)} de 20 degraus${extra}</b><span>Topo = aprovação</span></div></div>`;
  if (T.progresso === 'processo') return `<div class="tp-box"><div class="tp-etapas">${etapas([['1', 'Petição inicial'], ['2', 'Instrução'], ['3', 'Revisão'], ['4', 'Sentença'], ['5', 'Trânsito em julgado']])}</div><div class="tp-leg c"><b>${p}%</b>&nbsp;dos tópicos finalizados${extra}</div></div>`;
  if (T.progresso === 'carreira') return `<div class="tp-box"><div class="tp-tit">Sua progressão no edital</div><div class="tp-etapas">${etapas([['^', 'Recruta'], ['^^', 'Soldado'], ['^^^', 'Cabo'], ['≡', 'Sargento'], ['★', 'Tenente'], ['★★', 'Aprovado']])}</div><div class="tp-leg c"><b>${p}%</b>&nbsp;do edital cumprido${extra}</div></div>`;
  if (T.progresso === 'etapas') return `<div class="tp-box"><div class="tp-tit">${esc(T.rotulo)}</div><div class="tp-etapas">${etapas(T.etapas)}</div><div class="tp-leg c"><b>${p}%</b>&nbsp;do edital concluído${extra}</div></div>`;
  if (T.progresso === 'rota') return `<div class="tp-box"><div class="tp-tit">Rota da aprovação</div><div class="tp-etapas">${etapas([['🏛', 'Prefeitura'], ['🏫', 'Escola'], ['🌳', 'Praça'], ['🏥', 'Posto de saúde'], ['🚌', 'Terminal'], ['⭐', 'Base']])}</div><div class="tp-leg c"><b>${p}%</b>&nbsp;do edital patrulhado${extra}</div></div>`;
  return `<div class="tp-box"><div class="tp-tit">Edital concluído</div><div class="tp-num">${p}%</div><div class="tp-barra"><div style="width:${p}%"></div></div><div class="tp-leg">${extra.replace(/^ · /, '')}</div></div>`;
}
