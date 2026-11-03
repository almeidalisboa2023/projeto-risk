// Trânsito — aula completa (parte 3): infrações, medidas, processo, crimes, disposições finais e Lei 5.970.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, ex, C, E } from './blocos.js';

const A = (t) => `<h3 class="lt-aula">📚 Aula completa</h3>${t}`;

export const AULA3 = {
  infracoes: {
    html: A(`
<h3>Como ler um artigo de infração</h3>
<p>Todo artigo do capítulo de infrações tem a mesma estrutura: <b>conduta</b> → <b>Infração</b> (natureza) → <b>Penalidade</b> → <b>Medida administrativa</b>. A banca troca uma dessas partes. Use a <b>Tabela completa de infrações</b> (tópico seguinte) para treinar.</p>
<h3>Responsabilidade pela infração (art. 257) em casos</h3>
<table class="tab"><tr><th>Situação</th><th>Quem responde</th></tr>
<tr><td>Veículo não licenciado, sem placa, com equipamento faltando</td><td>proprietário</td></tr>
<tr><td>Excesso de velocidade, avanço de sinal, uso de celular</td><td>condutor</td></tr>
<tr><td>Excesso de peso, quando o embarcador declarou peso inferior ao real</td><td>embarcador</td></tr>
<tr><td>Excesso de peso em geral</td><td>transportador (e embarcador, se for o caso)</td></tr>
<tr><td>Pessoa jurídica dona do veículo não indica o condutor</td><td>além da infração, multa por não identificação (art. 257, §8º)</td></tr></table>
<h3>Pontuação e suspensão: casos</h3>
${cartoes([['20', '2 gravíssimas em 12 meses', 'suspende com 20 pontos', COR.verm], ['30', '1 gravíssima em 12 meses', 'suspende com 30 pontos', COR.lar], ['40', 'nenhuma gravíssima', 'suspende com 40 pontos', COR.amar], ['40', 'quem exerce atividade remunerada (EAR)', 'pode ser suspenso só com 40 pontos, independentemente da natureza, e fazer curso preventivo de reciclagem', COR.azul]])}
<ul><li>Os pontos são contados no período de <b>12 meses</b>.</li><li>Terminada a suspensão, o condutor faz <b>curso de reciclagem</b> para recuperar a CNH.</li><li>A suspensão por pontos dura de <b>6 meses a 1 ano</b> (8 meses a 2 anos na reincidência em 12 meses).</li></ul>
<h3>Multas agravadas (fator multiplicador)</h3>
<table class="tab"><tr><th>Fator</th><th>Exemplos</th></tr>
<tr><td>2x</td><td>art. 162, III (categoria diferente)</td></tr>
<tr><td>3x</td><td>art. 162, I e II (sem CNH, CNH cassada ou suspensa); art. 193 (calçada, acostamento); art. 218, III</td></tr>
<tr><td>5x</td><td>art. 176 (omissão do condutor envolvido em sinistro com vítima); arts. 202 e 203 (ultrapassagens proibidas); art. 165-B a 165-D (toxicológico)</td></tr>
<tr><td>10x</td><td>arts. 165 e 165-A (álcool); arts. 173 a 175 (racha, exibição, manobra perigosa); art. 191 (forçar passagem)</td></tr>
<tr><td>20x</td><td>art. 253-A (interromper a circulação deliberadamente)</td></tr></table>
${ex('<p>Em 12 meses, um condutor comete: excesso de velocidade de 30% (grave, 5 pontos), avanço de sinal (gravíssima, 7), sem cinto (grave, 5), celular na mão (gravíssima, 7). Total: <b>24 pontos</b>, com <b>2 gravíssimas</b>. Como o limite para quem tem 2 gravíssimas é <b>20</b>, ele já está sujeito à suspensão.</p>', 'Caso prático')}
${peg('Nas infrações que <b>já preveem suspensão</b> (165, 173, 210, 244, I a III etc.), os pontos não são somados para esse fim: a suspensão vem da própria infração.')}`),
    quiz: [C('Um condutor que acumula 24 pontos em 12 meses, tendo duas infrações gravíssimas, está sujeito à suspensão do direito de dirigir.', 'Com 2 gravíssimas, o limite é 20 pontos.'), E('O excesso de peso é infração de responsabilidade exclusiva do condutor do veículo.', 'Responde o transportador e, conforme o caso, o embarcador (art. 257).'), C('As infrações de disputar corrida e de exibir manobra perigosa têm multa multiplicada por dez.', 'Arts. 173 e 175.'), E('A suspensão do direito de dirigir por pontuação dura de 2 a 8 meses.', 'Por pontos: 6 meses a 1 ano; 2 a 8 meses é para as infrações que preveem suspensão.')],
  },
  medidas: {
    html: A(`
<h3>Cada medida, na prática</h3>
<table class="tab"><tr><th>Medida</th><th>Exemplo de infração</th><th>O que acontece</th></tr>
<tr><td><b>Retenção</b></td><td>sem cinto (167); farol desregulado (223)</td><td>o veículo fica no local até sanar; se não der, é liberado a condutor habilitado com recolhimento do CLA e prazo para regularizar</td></tr>
<tr><td><b>Remoção</b></td><td>não licenciado (230, V); estacionar em vaga de idoso (181, XX)</td><td>vai para o depósito; devolução após pagar multas, taxas e despesas</td></tr>
<tr><td><b>Recolhimento da CNH</b></td><td>álcool (165); racha (173); moto sem capacete (244, I)</td><td>a CNH é recolhida mediante recibo</td></tr>
<tr><td><b>Transbordo</b></td><td>excesso de peso (231, V)</td><td>a carga excedente é passada a outro veículo</td></tr>
<tr><td><b>Teste de alcoolemia</b></td><td>fiscalização de rotina ou sinistro</td><td>etilômetro, exame clínico, perícia ou sinais de alteração</td></tr>
<tr><td><b>Recolhimento de animais</b></td><td>animais soltos na rodovia</td><td>recolhidos; o dono paga as despesas</td></tr></table>
${box('Testes de alcoolemia (art. 277)', '<ul><li>O condutor envolvido em sinistro ou alvo de fiscalização pode ser submetido a teste, exame clínico, perícia ou outro procedimento.</li><li>A infração do art. 165 pode ser comprovada por <b>imagem, vídeo, sinais de alteração</b> da capacidade psicomotora ou <b>prova testemunhal</b>.</li><li>A <b>recusa</b> ao teste gera as penalidades do art. 165-A.</li></ul>')}
${ex('<p>O condutor flagrado sem cinto coloca o cinto na hora: o veículo é <b>liberado</b> após a autuação (retenção sanada). Se o problema for pneu careca e não der para trocar ali, o veículo pode ser liberado a condutor habilitado com recolhimento do CLA e prazo para regularizar, desde que ofereça segurança.</p>', 'Caso prático')}
${peg('Retenção e remoção são <b>medidas administrativas</b>, aplicadas pelo agente. A <b>multa</b> e a <b>suspensão</b> são <b>penalidades</b>, aplicadas pela autoridade.')}`),
    quiz: [C('A infração do art. 165 pode ser caracterizada por sinais que indiquem alteração da capacidade psicomotora, sem necessidade de teste de etilômetro.', 'Art. 277, §2º.'), E('A retenção do veículo implica, necessariamente, sua remoção ao depósito.', 'Na retenção, o veículo fica no local até sanar a irregularidade.'), C('O transbordo do excesso de carga é medida administrativa prevista no CTB.', 'Art. 269, IV.')],
  },
  processo: {
    html: A(`
<h3>O passo a passo com prazos</h3>
${passos([['Autuação', 'o agente lavra o auto (art. 280)'], ['Notificação da autuação', 'expedida em até <b>30 dias</b>; se não, o auto é arquivado (art. 281)'], ['Defesa da autuação (defesa prévia)', 'prazo indicado na notificação, não inferior a 15 dias (normas do Contran)'], ['Indicação do condutor', 'até <b>30 dias</b> após a notificação da autuação (art. 257, §7º)'], ['Notificação da penalidade', 'com prazo para pagamento e recurso (art. 282)'], ['Recurso à JARI', 'em regra, no prazo indicado na notificação da penalidade'], ['Recurso de 2ª instância', 'Cetran, Contrandife ou colegiado especial (art. 289)'], ['Fim da instância administrativa', 'decisão de 2ª instância ou falta de recurso (art. 290)']])}
<h3>Formas de comprovação da infração (art. 280, §2º)</h3>
<p>Declaração da autoridade ou do agente · aparelho eletrônico · equipamento audiovisual · reações químicas · qualquer outro meio tecnologicamente disponível, previamente regulamentado pelo Contran.</p>
<h3>Notificação e pagamento</h3>
<ul><li>Notificação por remessa postal, meio eletrônico ou outro meio que assegure a ciência.</li><li>Pagamento até o vencimento: <b>80%</b> do valor. Pelo sistema eletrônico, sem defesa nem recurso: <b>60%</b>.</li><li>Notificação devolvida por desatualização do endereço do proprietário: considera-se válida (art. 282, §1º).</li></ul>
${ex('<p>Uma infração foi cometida em 1º de março e a notificação da autuação só foi expedida em 15 de abril (mais de 30 dias). O auto deve ser <b>arquivado</b> e o registro julgado <b>insubsistente</b> (art. 281, parágrafo único, II).</p>', 'Caso prático')}
${peg('O prazo de <b>30 dias</b> do art. 281 é para <b>expedir</b> a notificação da autuação, e não para o condutor recebê-la.')}`),
    quiz: [C('Será arquivado o auto de infração se a notificação da autuação não for expedida no prazo máximo de 30 dias.', 'Art. 281.'), E('A infração de trânsito só pode ser comprovada por equipamento eletrônico, não bastando a declaração do agente.', 'A declaração do agente é meio válido (art. 280, §2º).'), C('A notificação devolvida por desatualização do endereço do proprietário é considerada válida para todos os efeitos.', 'Art. 282, §1º.')],
  },
  'crimes-gerais': {
    html: A(`
<h3>Lesão corporal culposa e a Lei 9.099: o raciocínio completo</h3>
${passos([['A lesão culposa na direção (art. 303) tem pena de 6 meses a 2 anos', 'é infração de menor potencial ofensivo'], ['Regra: aplicam-se composição civil, transação penal e representação', 'arts. 74, 76 e 88 da Lei 9.099'], ['Exceções do art. 291, §1º', 'álcool; racha; velocidade mais de 50 km/h acima da máxima'], ['Nas exceções', 'instaura-se inquérito policial, e não TCO (§2º)']])}
<h3>Suspensão e proibição de dirigir: a pena criminal</h3>
<ul><li>É <b>pena</b> (aplicada pelo juiz), diferente da suspensão <b>administrativa</b> (aplicada pela autoridade de trânsito).</li><li>Prevista diretamente em vários crimes (302, 303, 306, 307, 308) e aplicável ao reincidente (art. 296).</li><li>Cautelar no curso do processo (art. 294), com recurso em sentido estrito sem efeito suspensivo.</li></ul>
<h3>Agravantes do art. 298: exemplos</h3>
${cartoes([['👥', 'Dano potencial a 2+ pessoas', 'van lotada', COR.azul], ['🪧', 'Placa falsa ou sem placa', '', COR.lar], ['🪪', 'Sem habilitação', 'quando não for elemento do crime', COR.verm], ['🚚', 'Profissional de transporte', 'motorista de ônibus ou caminhão', COR.verde], ['🚶', 'Sobre a faixa de pedestres', '', COR.roxo]])}
${ex('<p>Um condutor sem CNH, em velocidade 60 km/h acima do limite, atropela um ciclista, que sofre lesão leve. É lesão culposa (art. 303), mas, por causa da velocidade, <b>não</b> cabem composição civil, transação penal nem exigência de representação: instaura-se <b>inquérito</b>. A falta de habilitação aumenta a pena (art. 303, §1º).</p>', 'Caso prático')}
${peg('A exceção do art. 291, §1º, III, é velocidade superior à máxima em <b>50 km/h</b>, e não em 50%. Os 50% são da infração <b>administrativa</b> do art. 218, III.')}`),
    quiz: [C('Na lesão corporal culposa de trânsito praticada sob influência de álcool, não se aplicam a composição civil, a transação penal e a exigência de representação.', 'Art. 291, §1º, I.'), E('A suspensão da habilitação como pena criminal é aplicada pela autoridade de trânsito.', 'É aplicada pelo juiz.'), C('Da decisão que decreta a suspensão cautelar da habilitação cabe recurso em sentido estrito, sem efeito suspensivo.', 'Art. 294, parágrafo único.')],
  },
  'crimes-especie': {
    html: A(`
<h3>Diferenciando crimes parecidos</h3>
<table class="tab"><tr><th>Situação</th><th>Crime</th></tr>
<tr><td>Condutor envolvido no acidente não socorre</td><td>omissão de socorro do art. 304 (ou causa de aumento do 302/303, se foi ele quem causou a lesão ou morte)</td></tr>
<tr><td>Condutor causa lesão e foge para não ser identificado</td><td>lesão culposa (303) + fuga do local (305)</td></tr>
<tr><td>Terceiro, não envolvido, deixa de socorrer</td><td>omissão de socorro do <b>Código Penal</b> (art. 135)</td></tr>
<tr><td>Dirige sem CNH, sem gerar perigo concreto</td><td>só infração administrativa (162, I)</td></tr>
<tr><td>Dirige sem CNH, gerando perigo de dano</td><td>crime do art. 309</td></tr>
<tr><td>Dono entrega o carro a amigo sem CNH</td><td>crime do art. 310 (perigo abstrato) + infração do art. 163</td></tr>
<tr><td>Dirige com CNH suspensa por decisão judicial</td><td>crime do art. 307</td></tr></table>
<h3>Embriaguez: crime x infração</h3>
${cartoes([['🧪', 'Abaixo de 0,3 mg/L, sem sinais', 'só infração administrativa (165)', COR.lar], ['🍺', '0,3 mg/L ou mais', 'crime (306) + infração (165)', COR.verm], ['👀', 'Recusou o teste, com sinais de embriaguez', 'infração (165-A) + possível crime (306) provado por sinais, vídeo ou testemunhas', COR.roxo]])}
<h3>Racha: três níveis</h3>
<ul><li>Sem risco à incolumidade: infração administrativa (art. 173 ou 174).</li><li>Com situação de risco: crime do art. 308 (6 meses a 3 anos).</li><li>Com lesão grave ou morte <b>culposa</b>: art. 308, §§1º e 2º. Com <b>dolo eventual</b>: homicídio doloso do Código Penal, julgado pelo júri.</li></ul>
${ex('<p>Na abordagem, o condutor sopra 0,45 mg/L e não tem CNH. Há crime do <b>art. 306</b> (embriaguez) e, se ele gerava perigo de dano, do <b>art. 309</b>. Segundo a Súmula 664 do STJ, os dois crimes <b>não</b> se absorvem: ele responde pelos dois, em concurso.</p>', 'Caso prático')}
${peg('O <b>terceiro</b> que passa e não socorre responde pelo art. 135 do <b>Código Penal</b>. O art. 304 do CTB é só para o <b>condutor envolvido</b> no acidente.')}`),
    quiz: [C('Configura o crime do art. 306 do CTB conduzir veículo com concentração igual ou superior a 0,3 miligrama de álcool por litro de ar alveolar.', 'Art. 306, §1º, I.'), E('Dirigir sem habilitação, ainda que sem gerar perigo de dano, configura o crime do art. 309 do CTB.', 'O art. 309 exige perigo de dano; sem ele, há só infração administrativa.'), C('O terceiro não envolvido no acidente que deixa de prestar socorro responde por omissão de socorro do Código Penal.', 'O art. 304 do CTB é para o condutor envolvido.'), E('Segundo o STJ, o crime de embriaguez ao volante absorve o de dirigir sem habilitação.', 'Súmula 664: não há consunção.')],
  },
  finais: {
    html: A(`
<h3>Outras regras que aparecem em prova</h3>
<ul><li>Os <b>órgãos executivos</b> devem manter <b>cadastros</b> e registros nacionais integrados (RENAVAM, RENACH, RENAINF).</li><li>A receita das multas não pode ser usada para pagamento de pessoal nem despesas gerais: só nas finalidades do art. 320.</li><li>O veículo apreendido ou removido e não reclamado vai a leilão, com o valor usado para quitar débitos e o saldo à disposição do proprietário.</li></ul>
${peg('A destinação das multas é <b>vinculada</b> (art. 320): sinalização, engenharia, policiamento, fiscalização, renovação de frota e educação de trânsito.')}`),
    quiz: [C('A receita arrecadada com multas de trânsito deve ser aplicada exclusivamente nas finalidades previstas no art. 320 do CTB.', 'Rol vinculado.'), E('O dinheiro das multas pode ser usado para pagar a folha de pessoal do órgão de trânsito.', 'Não está entre as finalidades do art. 320.')],
  },
  lei5970: {
    html: A(`
<h3>Contexto com o CPP</h3>
<p>O CPP manda que a autoridade policial vá ao local e providencie para que <b>não se alterem</b> o estado e a conservação das coisas até a chegada dos peritos (art. 6º, I). A Lei 5.970/1973 cria uma <b>exceção</b> para acidentes de trânsito: socorrer as vítimas e desobstruir a via podem vir antes do exame do local.</p>
<table class="tab"><tr><th>Pode remover?</th><th>Requisitos</th></tr>
<tr><td><b>Pessoas feridas</b></td><td>sempre, para socorro</td></tr>
<tr><td><b>Veículos</b></td><td>se estiverem no <b>leito da via</b> e <b>prejudicarem o tráfego</b></td></tr>
<tr><td><b>Registro</b></td><td>boletim de ocorrência com o fato, as testemunhas e as circunstâncias</td></tr></table>
${peg('A lei não dispensa o registro: sem <b>boletim de ocorrência</b>, a remoção fica sem respaldo.')}`),
    quiz: [C('A Lei 5.970/1973 excepciona a regra do CPP de preservação do local, nos acidentes de trânsito, para permitir a remoção imediata de feridos e veículos que prejudiquem o tráfego.', 'Art. 1º.')],
  },
};
