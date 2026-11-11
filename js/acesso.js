// Prazo de acesso dos alunos: verde (ativo), amarelo (perto de vencer) e vermelho (vencido ou bloqueado).
import { iso, hoje } from './util.js';

export const AVISO_DIAS = 15; // a partir de quantos dias antes de vencer o aluno fica amarelo

const dia = (s) => { const [a, m, d] = String(s).slice(0, 10).split('-').map(Number); return new Date(a, m - 1, d); };
export const fmtData = (s) => (s ? String(s).slice(0, 10).split('-').reverse().join('/') : '—');
export const somaDias = (base, n) => { const d = base ? dia(base) : hoje(); const h = hoje(); const ini = d < h ? h : d; ini.setDate(ini.getDate() + Number(n)); return iso(ini); };

export function diasRestantes(p) {
  if (!p?.acesso_ate) return null;
  return Math.round((dia(p.acesso_ate) - dia(iso(hoje()))) / 86400000);
}

// Situação do aluno para o painel do administrador
export function situacao(p) {
  if (!p) return { cor: 'cinza', rotulo: '—', ordem: 9 };
  if (p.role === 'admin') return { cor: 'azul', rotulo: 'Administrador', ordem: 8 };
  if (p.bloqueado) return { cor: 'vermelho', rotulo: 'Bloqueado', detalhe: p.bloqueio_motivo || 'bloqueado pelo administrador', ordem: 0 };
  if (p.status === 'recusado') return { cor: 'vermelho', rotulo: 'Recusado / revogado', ordem: 1 };
  if (p.status === 'pendente') return { cor: 'cinza', rotulo: 'Aguardando aprovação', ordem: 4 };
  const d = diasRestantes(p);
  if (d === null) return { cor: 'verde', rotulo: 'Ativo', detalhe: 'sem data de vencimento', ordem: 6 };
  if (d < 0) return { cor: 'vermelho', rotulo: 'Vencido', detalhe: `venceu em ${fmtData(p.acesso_ate)} (há ${-d} dia${d === -1 ? '' : 's'})`, ordem: 2 };
  if (d <= AVISO_DIAS) return { cor: 'amarelo', rotulo: d === 0 ? 'Vence hoje' : 'Perto de vencer', detalhe: d === 0 ? `vence hoje (${fmtData(p.acesso_ate)})` : `vence em ${d} dia${d === 1 ? '' : 's'} (${fmtData(p.acesso_ate)})`, ordem: 3 };
  return { cor: 'verde', rotulo: 'Ativo', detalhe: `até ${fmtData(p.acesso_ate)} (${d} dias)`, ordem: 5 };
}

// O aluno pode usar o app? (o administrador sempre pode)
export const acessoVencido = (p) => p && p.role !== 'admin' && p.acesso_ate && diasRestantes(p) < 0;

// Link do WhatsApp (Brasil: acrescenta 55 quando faltar)
export function linkWhats(tel, texto = '') {
  let n = String(tel || '').replace(/\D/g, '');
  if (!n) return '';
  if (n.length <= 11) n = '55' + n;
  return `https://wa.me/${n}${texto ? '?text=' + encodeURIComponent(texto) : ''}`;
}

// Mensagens prontas para o administrador avisar o aluno
export function mensagem(p, tipo) {
  const nome = (p.nome || '').split(' ')[0] || 'tudo bem';
  const ate = fmtData(p.acesso_ate);
  const M = {
    vencendo: { assunto: 'Seu acesso ao PROJETO R.I.S.K. está perto de vencer', texto: `Olá, ${nome}!\n\nPassando para avisar que o seu acesso ao PROJETO R.I.S.K. vence em ${ate}. Para continuar estudando sem interrupção, é só renovar pelo link do seu curso na aba "Cursos preparatórios" do site.\n\nQualquer dúvida, é só responder esta mensagem.\n\nBons estudos!\nPROJETO R.I.S.K.` },
    vencido: { assunto: 'Seu acesso ao PROJETO R.I.S.K. venceu', texto: `Olá, ${nome}!\n\nO seu acesso ao PROJETO R.I.S.K. venceu em ${ate}. O seu histórico de estudos continua guardado: renovando, você volta exatamente de onde parou. A renovação é feita na aba "Cursos preparatórios" do site.\n\nQualquer dúvida, é só responder esta mensagem.\n\nPROJETO R.I.S.K.` },
    ativo: { assunto: 'Seu acesso ao PROJETO R.I.S.K. está ativo', texto: `Olá, ${nome}!\n\nO seu acesso ao PROJETO R.I.S.K. está liberado${p.acesso_ate ? ` até ${ate}` : ''}. Entre no site com este e-mail e comece pelo calendário e pelo Conteúdo programático.\n\nBons estudos!\nPROJETO R.I.S.K.` },
    livre: { assunto: 'PROJETO R.I.S.K.', texto: `Olá, ${nome}!\n\n` },
  };
  return M[tipo] || M.livre;
}
export const linkEmail = (email, msg) => `mailto:${encodeURIComponent(email || '')}?subject=${encodeURIComponent(msg.assunto)}&body=${encodeURIComponent(msg.texto)}`;
export const tipoAviso = (p) => { const s = situacao(p); return s.rotulo === 'Vencido' ? 'vencido' : s.cor === 'amarelo' ? 'vencendo' : 'ativo'; };
