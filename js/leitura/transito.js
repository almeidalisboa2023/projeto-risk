// Leitura R.I.S.K. — Legislação de Trânsito (CTB, Lei 9.503/1997). Texto original, escrito a partir da lei.
// Ordem = ordem de estudo (sequência dos capítulos do CTB).
import { EXTRAS, NOVOS, ORDEM } from './transito-extra.js';
const LEI = 'https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm';
const peg = (t) => `<div class="lt-peg"><b class="lt-tit">⚠ Pegadinha</b> ${t}</div>`;
const box = (tit, t) => `<div class="lt-box"><b class="lt-tit">${tit}</b>${t}</div>`;

const BASE = {
  id: 'transito',
  nome: 'Legislação de Trânsito',
  apelidos: ['transito', 'ctb', 'legislacao de transito', 'codigo de transito'],
  lei: LEI,
  assuntos: [
    {
      id: 'preliminares', titulo: 'Disposições preliminares', arts: 'arts. 1º a 4º',
      chaves: ['disposicoes preliminares', 'preliminares', 'conceito de transito'],
      html: `
<h3>Em poucas palavras</h3>
<p>O começo do CTB diz <b>o que é trânsito</b>, <b>onde o Código vale</b> e <b>quem responde</b> quando o trânsito não é seguro. É capítulo curto, mas a banca adora cobrar a literalidade.</p>
<h3>O que é trânsito (art. 1º, §1º)</h3>
<p>É o uso das vias por <b>pessoas, veículos e animais</b>, sozinhos ou em grupo, <b>conduzidos ou não</b>, para quatro finalidades: <b>circulação, parada, estacionamento e operação de carga ou descarga</b>.</p>
${box('Memorize', '<ul><li>Trânsito seguro é <b>direito de todos</b> e <b>dever</b> dos órgãos do Sistema Nacional de Trânsito (§2º).</li><li>Os órgãos do SNT respondem <b>objetivamente</b> (sem precisar provar culpa) por danos causados por ação, omissão ou erro na execução de programas e serviços que garantam o trânsito seguro (§3º).</li><li>Os órgãos devem dar <b>prioridade</b> à defesa da vida, aí incluídas a preservação da saúde e do meio ambiente (§5º).</li></ul>')}
<h3>Onde o CTB se aplica (art. 2º)</h3>
<p>Nas <b>vias terrestres</b> abertas à circulação: ruas, avenidas, logradouros, caminhos, passagens, estradas e rodovias. O parágrafo único equipara a vias terrestres:</p>
<ul><li>as <b>praias abertas</b> à circulação pública;</li><li>as <b>vias internas de condomínios</b> formados por unidades autônomas;</li><li>as vias e áreas de <b>estacionamento de estabelecimentos privados de uso coletivo</b> (shopping, supermercado).</li></ul>
${peg('A rodovia pode ser pública e a via de um condomínio, privada: mesmo assim o CTB vale nas duas. O que importa é a via estar aberta ao uso coletivo previsto no art. 2º.')}
<h3>A quem se aplica (art. 3º) e conceitos (art. 4º)</h3>
<p>O CTB vale para <b>qualquer veículo</b>, para os <b>proprietários</b>, para condutores <b>nacionais e estrangeiros</b> e para as demais pessoas que ele menciona. Os conceitos e definições (via, pista, acostamento, ultrapassagem etc.) estão no <b>Anexo I</b>.</p>
<h3>Quadro-resumo</h3>
<table class="tab"><tr><th>Tema</th><th>Guarde</th></tr>
<tr><td>Trânsito</td><td>Pessoas, veículos e animais · circulação, parada, estacionamento, carga/descarga</td></tr>
<tr><td>Responsabilidade</td><td>Objetiva dos órgãos do SNT</td></tr>
<tr><td>Vias equiparadas</td><td>Praias abertas, vias de condomínio, estacionamentos privados de uso coletivo</td></tr>
<tr><td>Conceitos</td><td>Anexo I</td></tr></table>`,
    },
    {
      id: 'circulacao', titulo: 'Normas gerais de circulação e conduta', arts: 'arts. 26 a 67',
      chaves: ['normas gerais de circulacao', 'circulacao e conduta', 'normas gerais'],
      html: `
<h3>Em poucas palavras</h3>
<p>É o “manual de comportamento” na via: preferência, ultrapassagem, luzes, velocidade, cinto, transporte de crianças, motos e bicicletas. Aparece em quase toda prova da PRF.</p>
<h3>Deveres básicos</h3>
<ul><li>Não praticar atos que sejam <b>perigo ou obstáculo</b> ao trânsito (art. 26).</li><li>Antes de sair, verificar as <b>condições do veículo</b> e o combustível suficiente para o percurso (art. 27).</li><li>Ter, a todo momento, <b>domínio do veículo</b>, dirigindo com atenção e cuidados indispensáveis (art. 28).</li></ul>
<h3>Regras do art. 29 (as mais cobradas)</h3>
<ul><li>Circulação pelo <b>lado direito</b> da via, salvo sinalização em contrário.</li><li>Guardar <b>distância de segurança</b> lateral e frontal.</li><li><b>Preferência em cruzamento sem sinalização:</b> (a) se só um dos fluxos vem de rodovia, tem preferência quem está na rodovia; (b) na rotatória, quem já está circulando nela; (c) nos demais casos, quem vem <b>pela direita</b> do condutor.</li><li>Ultrapassagem pela <b>esquerda</b>, exceto quando o veículo da frente já sinalizou que vai entrar à esquerda.</li><li>Veículos de <b>polícia, bombeiros, ambulância, fiscalização e operação de trânsito</b> têm prioridade, livre circulação, parada e estacionamento <b>quando em urgência</b> e identificados por <b>sirene e luz vermelha intermitente</b>.</li><li>Veículos de <b>utilidade pública</b> (manutenção, socorro mecânico etc.) usam luz <b>amarelo-âmbar</b> intermitente e têm livre parada e estacionamento no local do serviço.</li></ul>
${box('Regra da responsabilidade (art. 29, §2º)', '<p>Os veículos <b>maiores</b> respondem pela segurança dos menores, os <b>motorizados</b> pelos não motorizados e <b>todos</b> pela incolumidade dos <b>pedestres</b>.</p>')}
${peg('Ambulância com sirene desligada, voltando ao hospital sem urgência, <b>não</b> tem a prioridade do art. 29. A prioridade depende de urgência + sinais sonoros e luminosos ligados.')}
<h3>Luzes (art. 40)</h3>
<p>Farol baixo à noite; durante o dia em <b>túneis</b> e sob <b>chuva, neblina ou cerração</b>. Veículos sem luz de rodagem diurna (DRL) também devem usar farol baixo de dia nas <b>rodovias de pista simples fora do perímetro urbano</b>. A troca rápida baixo/alto serve para advertir ou indicar ultrapassagem.</p>
<h3>Velocidade máxima sem placa (art. 61)</h3>
<table class="tab"><tr><th>Via urbana</th><th>km/h</th><th>Via rural</th><th>km/h</th></tr>
<tr><td>Trânsito rápido</td><td>80</td><td>Rodovia pista dupla: automóvel, camioneta, moto</td><td>110</td></tr>
<tr><td>Arterial</td><td>60</td><td>Rodovia pista dupla: demais veículos</td><td>90</td></tr>
<tr><td>Coletora</td><td>40</td><td>Rodovia pista simples: automóvel, camioneta, moto</td><td>100</td></tr>
<tr><td>Local</td><td>30</td><td>Rodovia pista simples: demais veículos</td><td>90</td></tr>
<tr><td></td><td></td><td>Estrada (não pavimentada)</td><td>60</td></tr></table>
<p>A <b>velocidade mínima</b> é a <b>metade</b> da máxima da via (art. 62), respeitadas as condições de tráfego.</p>
<h3>Segurança dos ocupantes</h3>
<ul><li><b>Cinto</b> obrigatório para condutor e passageiros em <b>todas as vias</b> do país (art. 65).</li><li>Crianças <b>menores de 10 anos</b> que ainda não tenham <b>1,45 m</b> vão no <b>banco traseiro</b>, em dispositivo de retenção adequado (art. 64).</li><li>Motociclista e passageiro: <b>capacete</b> com viseira ou óculos, nos termos do Contran (arts. 54 e 55).</li><li><b>Bicicleta</b>: circula nos bordos da pista, no mesmo sentido do fluxo, e tem preferência sobre os veículos automotores (art. 58).</li></ul>
${peg('Velocidade “sem placa” é a do art. 61. Se houver placa, vale a placa, que pode ser maior ou menor que a tabela.')}`,
    },
    {
      id: 'profissionais', titulo: 'Condução de veículos por motoristas profissionais', arts: 'arts. 67-A a 67-E',
      chaves: ['motoristas profissionais', 'motorista profissional', 'tempo de direcao', 'lei 13.103', 'descanso'],
      html: `
<h3>Em poucas palavras</h3>
<p>Capítulo III-A, incluído pela <b>Lei 13.103/2015</b> (Lei dos Caminhoneiros). Controla o <b>tempo de direção e de descanso</b> de quem dirige profissionalmente no <b>transporte rodoviário coletivo de passageiros</b> e no <b>transporte rodoviário de cargas</b>.</p>
<h3>Tempo de direção e pausas (art. 67-C)</h3>
<ul><li>É proibido dirigir por mais de <b>5h30 ininterruptas</b>.</li><li><b>Carga:</b> <b>30 minutos</b> de descanso a cada <b>6 horas</b> de direção, podendo fracionar, desde que não passe de 5h30 contínuas.</li><li><b>Passageiros:</b> <b>30 minutos</b> de descanso a cada <b>4 horas</b> de direção, podendo fracionar.</li><li>Em cada <b>24 horas</b>: mínimo de <b>11 horas de descanso</b>, que podem ser fracionadas, com o primeiro período de <b>8 horas ininterruptas</b>.</li><li>O descanso pode ser feito no próprio veículo, se ele tiver condições adequadas.</li></ul>
${box('Quem controla o tempo', '<p>O próprio <b>motorista</b> registra o tempo de direção e descanso, por meio de <b>tacógrafo</b>, diário de bordo, papeleta ou meio eletrônico, conforme o Contran (art. 67-E). Ele responde pela guarda e preservação dessas informações.</p>')}
<h3>Ligações com outros capítulos</h3>
<ul><li>Dirigir sem respeitar os tempos é infração do <b>art. 230, XXIII</b>, com <b>retenção do veículo</b> até cumprir o descanso.</li><li>Condutores das categorias <b>C, D e E</b> fazem <b>exame toxicológico</b> periódico (art. 148-A).</li></ul>
${peg('Os 30 min a cada 6h são do transporte de <b>carga</b>; os 30 min a cada 4h, do transporte de <b>passageiros</b>. A banca costuma trocar os dois.')}`,
    },
    {
      id: 'cidadao', titulo: 'Do cidadão', arts: 'arts. 72 e 73',
      chaves: ['cidadao'],
      html: `
<h3>Em poucas palavras</h3>
<p>Dois artigos que dão ao cidadão o direito de <b>pedir</b> e ao órgão o dever de <b>responder</b>.</p>
<h3>Art. 72: o direito</h3>
<p>Todo cidadão ou entidade civil pode pedir, <b>por escrito</b>, aos órgãos do SNT: <b>sinalização, fiscalização e implantação de equipamentos de segurança</b>. Também pode <b>sugerir alterações</b> em normas, legislação e outros assuntos do Código.</p>
<h3>Art. 73: o dever</h3>
<p>O órgão deve <b>analisar</b> o pedido e <b>responder por escrito</b>, dentro de prazos mínimos, dizendo se é possível atender, justificando a análise e, quando for o caso, <b>informando quando</b> o pedido será atendido. O parágrafo único manda os órgãos promoverem campanhas para informar esse direito à população.</p>
${box('Resumo', '<ul><li>Quem: <b>qualquer cidadão ou entidade civil</b></li><li>Como: <b>por escrito</b></li><li>O quê: sinalização, fiscalização, equipamentos de segurança e sugestões de mudança</li><li>Resposta: <b>por escrito</b>, justificada</li></ul>')}
${peg('O pedido não precisa ser feito por advogado nem por associação. Basta ser cidadão, e sempre por escrito.')}`,
    },
    {
      id: 'educacao', titulo: 'Educação para o trânsito', arts: 'arts. 74 a 79',
      chaves: ['educacao para o transito', 'educacao'],
      html: `
<h3>Em poucas palavras</h3>
<p>Educação para o trânsito é <b>direito de todos</b> e <b>dever prioritário</b> dos órgãos do SNT (art. 74).</p>
<h3>Pontos-chave</h3>
<ul><li>Cada órgão do SNT deve ter uma <b>coordenação educacional</b> (art. 74, §1º).</li><li>Os órgãos executivos de trânsito podem manter <b>Escolas Públicas de Trânsito</b> (art. 74, §2º).</li><li>O <b>Contran</b> define <b>todo ano</b> os temas e o cronograma das campanhas nacionais, com foco em <b>férias escolares, feriados prolongados e Semana Nacional de Trânsito</b> (art. 75).</li><li>As campanhas são <b>permanentes</b>, e as emissoras de rádio e TV devem divulgá-las <b>gratuitamente</b> (art. 75, §2º).</li><li>Educação para o trânsito em <b>todos os níveis de ensino</b>, da pré-escola ao ensino superior (art. 76).</li><li><b>Ministério da Saúde</b>, por proposta do Contran, faz campanha nacional sobre <b>primeiros socorros</b> (art. 77).</li><li>Peças publicitárias de veículos devem trazer <b>mensagem educativa</b> de trânsito (arts. 77-A a 77-E).</li><li>Os Ministérios da Saúde, Educação, Trabalho, Transportes e Justiça desenvolvem programas de <b>prevenção de acidentes</b>. <b>10%</b> do que o seguro obrigatório repassa à Previdência vai para esses programas (art. 78).</li></ul>
${box('Datas e números', '<ul><li><b>Semana Nacional de Trânsito:</b> 18 a 25 de setembro (art. 326)</li><li><b>10%</b>: parcela do seguro obrigatório para prevenção de acidentes (art. 78, parágrafo único)</li></ul>')}
${peg('Quem define os temas das campanhas nacionais é o <b>Contran</b>, e não o Denatran/Senatran nem os Detrans.')}`,
    },
    {
      id: 'engenharia', titulo: 'Engenharia de tráfego, operação, fiscalização e policiamento ostensivo', arts: 'arts. 91 a 95',
      chaves: ['engenharia de trafego', 'engenharia', 'policiamento ostensivo', 'fiscalizacao e policiamento'],
      html: `
<h3>Em poucas palavras</h3>
<p>Trata de como a via é <b>projetada, operada e fiscalizada</b>: padrões nacionais, polos geradores de tráfego, obstáculos e obras na via.</p>
<h3>Pontos-chave</h3>
<ul><li>O <b>Contran</b> fixa normas e padrões de engenharia de tráfego válidos em todo o país (art. 91).</li><li><b>Polo atrativo de trânsito</b> (shopping, estádio, faculdade): o projeto só é aprovado com <b>anuência prévia</b> do órgão de trânsito com circunscrição sobre a via e com <b>área de estacionamento</b> e indicação das <b>vias de acesso</b> (art. 93).</li><li>Qualquer <b>obstáculo</b> à circulação deve ser <b>sinalizado imediatamente</b> (art. 94).</li><li>Lombadas (ondulações transversais) e sonorizadores <b>não</b> podem ser usados como redutores de velocidade, salvo nos casos definidos pelo Contran (art. 94, parágrafo único).</li><li>Nenhuma <b>obra ou evento</b> que atrapalhe a circulação começa sem <b>permissão prévia</b> do órgão com circunscrição sobre a via. Quem executa a obra é responsável por <b>sinalizar</b> (art. 95, §1º).</li><li>Interdição de via: salvo emergência, a comunidade deve ser avisada com <b>48 horas</b> de antecedência (art. 95, §2º).</li></ul>
${box('Números', '<ul><li><b>48 h</b>: aviso prévio de interdição da via</li></ul>')}
${peg('A sinalização da obra é obrigação de quem <b>executa ou mantém</b> a obra, e não automaticamente do órgão de trânsito.')}`,
    },
    {
      id: 'licenciamento', titulo: 'Licenciamento', arts: 'arts. 130 a 135',
      chaves: ['licenciamento', 'crlv', 'cla'],
      html: `
<h3>Em poucas palavras</h3>
<p>Todo veículo <b>automotor, elétrico, articulado, reboque ou semirreboque</b> precisa ser <b>licenciado todo ano</b> no Detran do Estado ou do DF onde está registrado (art. 130).</p>
<h3>Pontos-chave</h3>
<ul><li>O veículo licenciado recebe o <b>CLA</b> (Certificado de Licenciamento Anual), ligado ao CRV (art. 131).</li><li>Só é considerado licenciado com <b>tributos, encargos e multas</b> (de trânsito e ambientais) do veículo <b>quitados</b>, não importa quem cometeu as infrações (art. 131, §2º).</li><li>Exige aprovação nas inspeções de segurança veicular e de emissões, quando exigidas (art. 131, §3º).</li><li><b>Veículo novo</b> não precisa de licenciamento no trajeto da <b>fábrica até o município de destino</b>, nas regras do Contran. O mesmo vale para o importado, da alfândega até o destino (art. 132).</li><li>Porte do CLA é obrigatório, mas <b>dispensado</b> se o agente consegue consultar o licenciamento no sistema na hora (art. 133).</li><li><b>Venda do veículo:</b> o comprador tem 30 dias para transferir (art. 123, §1º). Se não transferir, o vendedor deve comunicar a venda ao Detran em até <b>60 dias</b>, senão responde <b>solidariamente</b> pelas penalidades até a comunicação (art. 134).</li><li>Veículos de <b>aluguel</b> e serviço remunerado precisam de autorização do poder concedente para registro, licenciamento e placa comercial (art. 135).</li></ul>
${box('Infração ligada', '<p>Conduzir veículo <b>não licenciado</b>: art. 230, V, infração <b>gravíssima</b>, com <b>remoção</b> do veículo.</p>')}
${peg('Multa vinculada ao <b>veículo</b> impede o licenciamento mesmo que outro condutor a tenha cometido. A responsabilidade pela infração é uma coisa, a quitação para licenciar é outra.')}`,
    },
    {
      id: 'escolares', titulo: 'Condução de escolares', arts: 'arts. 136 a 139',
      chaves: ['conducao de escolares', 'escolares', 'escolar'],
      html: `
<h3>Em poucas palavras</h3>
<p>O transporte coletivo de escolares só circula com <b>autorização do Detran</b> do Estado ou do DF e cumprindo requisitos do <b>veículo</b> (art. 136) e do <b>condutor</b> (art. 138).</p>
<h3>Requisitos do veículo (art. 136)</h3>
<ul><li>Registro como veículo de <b>passageiros</b>.</li><li><b>Inspeção semestral</b> dos equipamentos obrigatórios e de segurança.</li><li><b>Faixa amarela</b> de <b>40 cm</b>, à meia altura, nas laterais e na traseira, com a palavra <b>ESCOLAR em preto</b>. Se o veículo for amarelo, as cores se <b>invertem</b>.</li><li><b>Tacógrafo</b> (registrador instantâneo inalterável de velocidade e tempo).</li><li>Lanternas de luz <b>branca, fosca ou amarela</b> no alto da frente e de luz <b>vermelha</b> no alto da traseira.</li><li><b>Cintos</b> em número igual à lotação.</li><li>Outros requisitos fixados pelo Contran.</li></ul>
<p>A <b>autorização</b> fica afixada <b>dentro do veículo</b>, em local visível, com a <b>lotação</b>. É proibido levar mais escolares do que a capacidade do fabricante (art. 137).</p>
<h3>Requisitos do condutor (art. 138)</h3>
<ul><li>Idade <b>superior a 21 anos</b>.</li><li>Habilitação na categoria <b>D</b>.</li><li>Não ter cometido infração <b>grave ou gravíssima</b>, nem ser <b>reincidente em médias</b>, nos últimos <b>12 meses</b>.</li><li>Aprovação em <b>curso especializado</b> (Contran).</li></ul>
<p>Também precisa apresentar <b>certidão negativa criminal</b> para homicídio, roubo, estupro e corrupção de menores, renovada a cada <b>5 anos</b> (art. 329).</p>
<p>Os municípios podem criar <b>exigências adicionais</b> (art. 139).</p>
${box('Números', '<ul><li><b>40 cm</b>: faixa amarela</li><li><b>Semestral</b>: inspeção</li><li><b>21+</b> anos e categoria <b>D</b></li><li><b>5 anos</b>: certidão criminal</li></ul>')}
${peg('A inspeção do escolar é <b>semestral</b>, e não anual. E a autorização fica <b>dentro</b> do veículo, não no para-brisa por fora.')}`,
    },
    {
      id: 'motofrete', titulo: 'Condução de moto-frete', arts: 'arts. 139-A e 139-B',
      chaves: ['moto-frete', 'motofrete', 'mototaxi', 'motoboy'],
      html: `
<h3>Em poucas palavras</h3>
<p>Capítulo XIII-A, incluído pela <b>Lei 12.009/2009</b>. Motocicletas e motonetas usadas no <b>transporte remunerado de mercadorias</b> (moto-frete) só circulam com <b>autorização do Detran</b> do Estado ou do DF.</p>
<h3>Requisitos do veículo (art. 139-A)</h3>
<ul><li>Registro na categoria <b>aluguel</b>.</li><li><b>Protetor de motor</b> (“mata-cachorro”) fixado no chassi.</li><li><b>Aparador de linha</b> (antena corta-pipas).</li><li><b>Inspeção semestral</b> dos equipamentos obrigatórios e de segurança.</li><li>Baú ou outros dispositivos de carga conforme o Contran.</li></ul>
${box('Proibido transportar', '<p><b>Combustíveis, produtos inflamáveis ou tóxicos e galões</b>. Exceções: <b>gás de cozinha</b> e <b>galões de água mineral</b>, desde que com <b>side-car</b>, conforme o Contran (art. 139-A, §2º).</p>')}
<h3>Requisitos do condutor (Lei 12.009/2009)</h3>
<ul><li>Pelo menos <b>21 anos</b>.</li><li>Habilitado na categoria <b>A</b> há pelo menos <b>2 anos</b>.</li><li>Aprovação em <b>curso especializado</b>.</li><li>Uso de <b>colete</b> com dispositivos retrorrefletivos.</li></ul>
<p>O capítulo <b>não exclui</b> a competência dos municípios para regulamentar o serviço local (art. 139-B).</p>
${peg('Gás de cozinha e água mineral <b>podem</b> ser levados, mas só com <b>side-car</b>. Qualquer outro combustível ou inflamável é proibido.')}`,
    },
    {
      id: 'habilitacao', titulo: 'Habilitação', arts: 'arts. 140 a 160',
      chaves: ['habilitacao', 'dos condutores', 'cnh', 'permissao para dirigir'],
      html: `
<h3>Em poucas palavras</h3>
<p>Como alguém se torna condutor, quais as <b>categorias</b>, os <b>exames</b> e os prazos de renovação.</p>
<h3>Requisitos para se habilitar (art. 140)</h3>
<ul><li>Ser <b>penalmente imputável</b> (18 anos).</li><li>Saber <b>ler e escrever</b>.</li><li>Ter <b>documento de identidade</b> (e CPF).</li></ul>
<h3>Permissão para Dirigir (art. 148)</h3>
<p>Quem passa nos exames recebe a <b>Permissão para Dirigir</b>, válida por <b>1 ano</b>. Ao fim do ano recebe a <b>CNH definitiva</b>, se não tiver cometido infração <b>grave ou gravíssima</b> nem for <b>reincidente em média</b>. Se cometeu, recomeça o processo de habilitação.</p>
<h3>Categorias (art. 143)</h3>
<table class="tab"><tr><th>Cat.</th><th>Veículos</th></tr>
<tr><td><b>A</b></td><td>Motor de 2 ou 3 rodas, com ou sem carro lateral</td></tr>
<tr><td><b>B</b></td><td>Não abrangidos pela A, até <b>3.500 kg</b> de peso bruto e até <b>8 lugares</b> além do motorista</td></tr>
<tr><td><b>C</b></td><td>Carga, acima de <b>3.500 kg</b></td></tr>
<tr><td><b>D</b></td><td>Passageiros, mais de <b>8 lugares</b> além do motorista</td></tr>
<tr><td><b>E</b></td><td>Combinação em que a unidade tratora é B, C ou D e a unidade acoplada tem <b>6.000 kg ou mais</b>, ou lotação acima de 8 lugares</td></tr></table>
<p><b>ACC</b> (Autorização para Conduzir Ciclomotor) é para <b>ciclomotores</b> (art. 141).</p>
${box('Para D e E (art. 145)', '<ul><li>Ser <b>maior de 21 anos</b>.</li><li>Para <b>D</b>: estar habilitado há pelo menos <b>2 anos na B</b> ou <b>1 ano na C</b>.</li><li>Para <b>E</b>: estar habilitado há pelo menos <b>1 ano na C</b>.</li><li>Ter curso especializado e treinamento de prática veicular em situação de risco.</li><li>Os mesmos requisitos valem para conduzir transporte coletivo, escolar, emergência e produto perigoso.</li></ul>')}
<h3>Exames (art. 147)</h3>
<p>Aptidão física e mental; avaliação psicológica (na primeira habilitação e para quem exerce atividade remunerada); exame escrito de legislação, direção defensiva, primeiros socorros e meio ambiente; exame de direção veicular.</p>
<table class="tab"><tr><th>Idade</th><th>Renovação do exame médico (art. 147, §2º)</th></tr>
<tr><td>Menos de 50 anos</td><td>a cada <b>10 anos</b></td></tr>
<tr><td>50 a 69 anos</td><td>a cada <b>5 anos</b></td></tr>
<tr><td>70 anos ou mais</td><td>a cada <b>3 anos</b></td></tr></table>
<p>Categorias <b>C, D e E</b>: <b>exame toxicológico</b> periódico (art. 148-A).</p>
<p>A CNH vale como <b>documento de identidade</b> em todo o país (art. 159).</p>
${box('Infração ligada', '<p>Dirigir <b>sem habilitação</b>: art. 162, I, <b>gravíssima</b>, multa <b>3 vezes</b>, com retenção do veículo até aparecer condutor habilitado.</p>')}
${peg('Na Permissão para Dirigir, <b>uma</b> infração grave ou gravíssima já impede a CNH definitiva. Em infrações médias, só a <b>reincidência</b> impede.')}`,
    },
    {
      id: 'infracoes', titulo: 'Infrações e penalidades', arts: 'arts. 161 a 268',
      chaves: ['infracoes', 'infracao', 'penalidades', 'penalidade', 'pontuacao', 'suspensao do direito de dirigir'],
      html: `
<h3>Em poucas palavras</h3>
<p><b>Infração</b> é desobedecer a qualquer regra do CTB, da legislação complementar ou das resoluções do Contran (art. 161). Cada infração tem uma <b>natureza</b>, que define o valor da multa e os pontos.</p>
<h3>Natureza, valor e pontos (arts. 258 e 259)</h3>
<table class="tab"><tr><th>Natureza</th><th>Multa</th><th>Pontos</th></tr>
<tr><td><b>Gravíssima</b></td><td>R$ 293,47</td><td>7</td></tr>
<tr><td><b>Grave</b></td><td>R$ 195,23</td><td>5</td></tr>
<tr><td><b>Média</b></td><td>R$ 130,16</td><td>4</td></tr>
<tr><td><b>Leve</b></td><td>R$ 88,38</td><td>3</td></tr></table>
<p>Algumas gravíssimas têm <b>fator multiplicador</b> (3x, 5x, 10x...), previsto no próprio artigo.</p>
<h3>Quem responde (art. 257)</h3>
<ul><li><b>Proprietário:</b> pelas infrações de documentação e regularização do veículo.</li><li><b>Condutor:</b> pelos atos praticados na direção.</li><li><b>Embarcador e transportador:</b> pelo excesso de peso.</li><li>Se o condutor não for identificado na hora, o proprietário tem <b>30 dias</b> para indicá-lo após a notificação.</li></ul>
<h3>Penalidades (art. 256)</h3>
<p>Advertência por escrito · multa · suspensão do direito de dirigir · cassação da CNH · cassação da Permissão para Dirigir · curso de reciclagem.</p>
<p><b>Advertência por escrito</b> (art. 267): para infração <b>leve ou média</b>, quando o infrator não cometeu outra infração nos últimos <b>12 meses</b>.</p>
<h3>Suspensão por pontos (art. 261)</h3>
<table class="tab"><tr><th>Pontos em 12 meses</th><th>Condição</th></tr>
<tr><td><b>20</b></td><td>com 2 ou mais gravíssimas</td></tr>
<tr><td><b>30</b></td><td>com 1 gravíssima</td></tr>
<tr><td><b>40</b></td><td>sem gravíssima</td></tr></table>
<p>Prazo da suspensão: <b>6 meses a 1 ano</b> (pontos); <b>8 meses a 2 anos</b> se houver reincidência em 12 meses. Nas infrações que já suspendem por si só, o prazo é de <b>2 a 8 meses</b> (8 a 18 meses na reincidência), salvo prazo específico.</p>
${box('Infrações que suspendem por si só (as mais cobradas)', '<ul><li>Dirigir sob influência de <b>álcool</b> ou outra substância psicoativa (art. 165) e <b>recusar</b> o teste (art. 165-A): multa <b>10x</b> e suspensão por <b>12 meses</b>; dobra na reincidência em 12 meses.</li><li><b>Ameaçar</b> pedestres ou veículos (art. 170).</li><li><b>Disputar corrida</b> (art. 173), <b>competição/exibição</b> não autorizada (art. 174) e <b>manobra perigosa</b> como arrancada, derrapagem ou frenagem (art. 175).</li><li><b>Omissão de socorro</b> do condutor envolvido em acidente com vítima (art. 176).</li><li>Transpor <b>bloqueio policial</b> (art. 210).</li><li>Velocidade <b>mais de 50%</b> acima da máxima (art. 218, III): multa 3x.</li><li>Moto <b>sem capacete</b>, levando <b>passageiro sem capacete</b> ou fazendo <b>malabarismo</b> (art. 244, I a III).</li></ul>')}
<h3>Velocidade (art. 218)</h3>
<table class="tab"><tr><th>Excesso sobre a máxima</th><th>Natureza</th></tr><tr><td>até 20%</td><td>Média</td></tr><tr><td>de 20% a 50%</td><td>Grave</td></tr><tr><td>mais de 50%</td><td>Gravíssima, 3x + suspensão</td></tr></table>
<h3>Outras campeãs de prova</h3>
<ul><li><b>Segurar ou manusear o celular</b> dirigindo: <b>gravíssima</b> (art. 252, parágrafo único). Usar fone ligado a som ou celular: média.</li><li><b>Sem cinto:</b> grave, com retenção até colocar (art. 167).</li><li><b>Criança</b> transportada sem as regras do art. 64: gravíssima, com retenção (art. 168).</li><li><b>Avançar sinal vermelho:</b> gravíssima (art. 208).</li><li><b>Ultrapassar pela contramão</b> em linha contínua, curva, ponte etc.: gravíssima, <b>5x</b> (art. 203).</li></ul>
<h3>Cassação da CNH (art. 263)</h3>
<p>Ocorre quando o condutor: dirige qualquer veículo estando <b>suspenso</b>; é <b>reincidente em 12 meses</b> nas infrações dos arts. 162, III, 163, 164, 165, 173, 174 e 175; ou é <b>condenado judicialmente</b> por crime de trânsito. Pode pedir reabilitação depois de <b>2 anos</b>.</p>
${peg('Pontos <b>20/30/40</b> dependem do número de <b>gravíssimas</b> no período. Quem tem 2 gravíssimas é suspenso já com 20 pontos.')}`,
    },
    {
      id: 'medidas', titulo: 'Medidas administrativas', arts: 'arts. 269 a 279',
      chaves: ['medidas administrativas', 'medida administrativa', 'retencao', 'remocao do veiculo'],
      html: `
<h3>Em poucas palavras</h3>
<p>São providências tomadas <b>na hora</b> pela autoridade ou pelo agente para <b>corrigir a situação de risco</b>. <b>Não são penalidades</b>: convivem com elas e não as substituem (art. 269, §2º). O objetivo prioritário é <b>proteger a vida e a incolumidade física</b> (art. 269, §1º).</p>
<h3>Lista do art. 269</h3>
<ul><li><b>Retenção</b> do veículo</li><li><b>Remoção</b> do veículo</li><li><b>Recolhimento</b> da CNH, da Permissão para Dirigir, do CRV e do CLA</li><li><b>Transbordo</b> do excesso de carga</li><li><b>Teste de alcoolemia</b> ou perícia de substância entorpecente</li><li>Recolhimento de <b>animais soltos</b> na via e na faixa de domínio</li><li>Realização de <b>exames</b> de aptidão física e mental, legislação, primeiros socorros e direção</li></ul>
<h3>Retenção (art. 270)</h3>
<ul><li>O veículo fica parado no local até a irregularidade ser <b>sanada</b>.</li><li>Se não der para resolver no local e o veículo for seguro, é <b>liberado a condutor habilitado</b> mediante <b>recolhimento do CLA</b>, com prazo para regularizar.</li><li>Se não houver condutor habilitado, o veículo é <b>removido</b>.</li></ul>
<h3>Remoção (art. 271)</h3>
<p>O veículo vai para o <b>depósito</b>. A devolução depende do pagamento de <b>multas, taxas e despesas</b> de remoção e estada. Veículo não reclamado em <b>60 dias</b> vai a <b>leilão</b> (art. 328).</p>
${box('Álcool (art. 276)', '<p><b>Qualquer</b> concentração de álcool no sangue ou no ar alveolar sujeita o condutor às penalidades do art. 165, ou seja, <b>tolerância zero</b> na esfera administrativa.</p>')}
${peg('Retenção ≠ remoção. Na <b>retenção</b> o veículo fica no local; na <b>remoção</b> vai para o depósito. E nenhuma das duas é penalidade.')}`,
    },
    {
      id: 'crimes-gerais', titulo: 'Crimes de trânsito: disposições gerais', arts: 'arts. 291 a 301',
      chaves: ['crimes de transito: disposicoes gerais', 'disposicoes gerais', 'crimes de transito disposicoes'],
      html: `
<h3>Em poucas palavras</h3>
<p>Regras gerais que valem para todos os crimes de trânsito: o que se aplica do CP, do CPP e da Lei 9.099, a pena de suspensão da habilitação, as agravantes e a regra do socorro.</p>
<h3>Art. 291: normas aplicáveis</h3>
<p>Aos crimes de trânsito aplicam-se o <b>Código Penal</b>, o <b>CPP</b> e, no que couber, a <b>Lei 9.099/1995</b>.</p>
<p>Na <b>lesão corporal culposa</b>, valem a composição civil, a transação penal e a exigência de representação, <b>exceto</b> se o condutor estava:</p>
<ul><li>sob influência de <b>álcool</b> ou outra substância psicoativa;</li><li>participando de <b>corrida, disputa ou exibição</b> não autorizada;</li><li>em velocidade <b>mais de 50 km/h</b> acima da máxima da via.</li></ul>
<p>Nesses três casos instaura-se <b>inquérito policial</b> (§2º).</p>
<h3>Suspensão ou proibição de dirigir (arts. 292 a 296)</h3>
<ul><li>Pode ser aplicada <b>isolada ou cumulativamente</b> com outras penas (art. 292).</li><li>Duração: <b>2 meses a 5 anos</b> (art. 293).</li><li>Depois do trânsito em julgado, o condenado entrega a CNH ou a Permissão ao juiz em <b>48 horas</b> (art. 293, §1º).</li><li>Não corre enquanto o condenado estiver <b>preso</b> por efeito da condenação (art. 293, §2º).</li><li><b>Cautelar</b> (art. 294): em qualquer fase, para garantir a ordem pública, o juiz pode decretá-la <b>de ofício</b>, a pedido do MP ou por representação do delegado. Cabe <b>recurso em sentido estrito</b>, sem efeito suspensivo.</li><li><b>Reincidente</b> em crime de trânsito: o juiz <b>aplicará</b> a suspensão (art. 296).</li></ul>
<h3>Multa reparatória (art. 297)</h3>
<p>Valor pago à <b>vítima ou sucessores</b> quando há <b>prejuízo material</b>. Não pode passar do prejuízo demonstrado.</p>
${box('Agravantes (art. 298)', '<ul><li>Dano potencial a <b>2 ou mais pessoas</b> ou grande risco de dano patrimonial a terceiros</li><li>Veículo <b>sem placa</b> ou com placa falsa ou adulterada</li><li><b>Sem</b> Permissão ou CNH</li><li>CNH de <b>categoria diferente</b> da do veículo</li><li>Profissão que exige <b>cuidados especiais</b> com passageiros ou carga</li><li>Veículo com equipamentos ou características <b>adulterados</b> que afetem a segurança</li><li>Sobre <b>faixa de pedestres</b></li></ul>')}
<h3>Socorro (art. 301)</h3>
<p>O condutor que presta <b>pronto e integral socorro</b> à vítima <b>não</b> será preso em flagrante <b>nem</b> terá de pagar fiança.</p>
<h3>Penas alternativas</h3>
<p>O art. 312-A indica trabalhos ligados ao resgate e ao atendimento de vítimas de trânsito. O art. 312-B <b>proíbe a substituição</b> por pena restritiva de direitos no homicídio e na lesão grave/gravíssima culposos cometidos sob efeito de álcool (arts. 302, §3º, e 303, §2º).</p>
${peg('As exceções da Lei 9.099 do art. 291, §1º, valem para a <b>lesão corporal culposa</b>. O limite de velocidade é <b>50 km/h</b> acima da máxima, e não 50%.')}`,
    },
    {
      id: 'crimes-especie', titulo: 'Crimes de trânsito: crimes em espécie', arts: 'arts. 302 a 312',
      chaves: ['crimes em especie', 'crimes de transito', 'homicidio culposo', 'embriaguez ao volante', 'art. 306'],
      html: `
<h3>Em poucas palavras</h3>
<p>São 11 crimes. Para a prova, guarde a <b>pena</b>, se o crime é de <b>perigo concreto</b> (“gerando perigo de dano”) ou <b>abstrato</b>, e as <b>causas de aumento</b>.</p>
<table class="tab"><tr><th>Art.</th><th>Crime</th><th>Pena</th></tr>
<tr><td>302</td><td>Homicídio culposo na direção</td><td>Detenção 2 a 4 anos + suspensão/proibição</td></tr>
<tr><td>302, §3º</td><td>… sob efeito de álcool ou substância psicoativa</td><td><b>Reclusão 5 a 8 anos</b> + suspensão/proibição</td></tr>
<tr><td>303</td><td>Lesão corporal culposa na direção</td><td>Detenção 6 meses a 2 anos + suspensão/proibição</td></tr>
<tr><td>303, §2º</td><td>… sob efeito de álcool, com lesão grave ou gravíssima</td><td><b>Reclusão 2 a 5 anos</b></td></tr>
<tr><td>304</td><td>Omissão de socorro</td><td>Detenção 6 meses a 1 ano, ou multa</td></tr>
<tr><td>305</td><td>Fuga do local do acidente</td><td>Detenção 6 meses a 1 ano, ou multa</td></tr>
<tr><td>306</td><td>Embriaguez ao volante</td><td>Detenção 6 meses a 3 anos + multa + suspensão/proibição</td></tr>
<tr><td>307</td><td>Violar suspensão ou proibição de dirigir</td><td>Detenção 6 meses a 1 ano + multa + novo prazo igual de suspensão</td></tr>
<tr><td>308</td><td>Racha (corrida, disputa ou exibição não autorizada)</td><td>Detenção 6 meses a 3 anos + multa + suspensão/proibição</td></tr>
<tr><td>309</td><td>Dirigir sem habilitação</td><td>Detenção 6 meses a 1 ano, ou multa</td></tr>
<tr><td>310</td><td>Entregar a direção a quem não pode dirigir</td><td>Detenção 6 meses a 1 ano, ou multa</td></tr>
<tr><td>311</td><td>Velocidade incompatível perto de escola, hospital etc.</td><td>Detenção 6 meses a 1 ano, ou multa</td></tr>
<tr><td>312</td><td>Fraude processual em acidente com vítima</td><td>Detenção 6 meses a 1 ano, ou multa</td></tr></table>
<h3>Aumento de 1/3 à metade (arts. 302, §1º, e 303, §1º)</h3>
<ul><li>Sem Permissão ou CNH.</li><li>Na <b>faixa de pedestres</b> ou na <b>calçada</b>.</li><li>Deixar de prestar socorro, quando possível sem risco pessoal.</li><li>No exercício da profissão, conduzindo transporte de <b>passageiros</b>.</li></ul>
<h3>Embriaguez (art. 306)</h3>
<p>É crime dirigir com a <b>capacidade psicomotora alterada</b> por álcool ou outra substância psicoativa. A alteração é comprovada por:</p>
<ul><li><b>6 decigramas</b> ou mais de álcool por litro de <b>sangue</b>, ou <b>0,3 mg</b> ou mais por litro de <b>ar alveolar</b>; <b>ou</b></li><li><b>sinais</b> de alteração da capacidade psicomotora.</li></ul>
<p>Prova: teste de alcoolemia, exame clínico, perícia, vídeo, testemunha ou outros meios admitidos, garantida a contraprova.</p>
<h3>Racha (art. 308)</h3>
<p>Exige <b>situação de risco</b> à incolumidade. Se resulta <b>lesão grave</b> sem dolo: reclusão de <b>3 a 6 anos</b>. Se resulta <b>morte</b> sem dolo: reclusão de <b>5 a 10 anos</b>.</p>
${box('Perigo concreto x abstrato', '<ul><li><b>309</b> (sem habilitação) e <b>311</b> (velocidade incompatível): exigem <b>perigo de dano</b>, ou seja, perigo <b>concreto</b>.</li><li><b>310</b> (entregar a direção): perigo <b>abstrato</b>, não precisa de perigo concreto (<b>Súmula 575 do STJ</b>).</li><li><b>306</b>: basta a capacidade psicomotora alterada, comprovada pelos meios do §1º.</li></ul>')}
${peg('Na omissão de socorro (art. 304), o crime existe <b>mesmo que terceiros socorram</b> a vítima ou que ela tenha <b>morrido na hora</b> ou tenha só <b>ferimentos leves</b> (parágrafo único).')}`,
    },
    {
      id: 'finais', titulo: 'Disposições finais e transitórias', arts: 'arts. 313 a 341',
      chaves: ['disposicoes finais', 'transitorias', 'finais e transitorias'],
      html: `
<h3>Em poucas palavras</h3>
<p>Fecho do Código com regras soltas que caem como “detalhe” na prova: destino das multas, leilão, Semana Nacional de Trânsito e exigências para condutores de escolares e transporte coletivo.</p>
<h3>Pontos-chave</h3>
<ul><li><b>Destino das multas</b> (art. 320): só em <b>sinalização, engenharia de tráfego, de campo, policiamento, fiscalização, renovação de frota circulante e educação de trânsito</b>.</li><li><b>5%</b> do valor das multas vai, todo mês, para o fundo nacional de <b>segurança e educação de trânsito</b> (FUNSET) (art. 320, §1º).</li><li><b>Semana Nacional de Trânsito:</b> <b>18 a 25 de setembro</b> (art. 326).</li><li><b>Leilão</b> (art. 328): veículo removido e não reclamado em <b>60 dias</b> é avaliado e leiloado.</li><li><b>Condutores de escolares e transporte coletivo</b>: certidão negativa criminal para <b>homicídio, roubo, estupro e corrupção de menores</b>, renovável a cada <b>5 anos</b> (art. 329).</li><li><b>Oficinas, desmanches e lojas</b> que compram, vendem ou desmontam veículos devem manter <b>livro de registro</b> de entrada e saída (art. 330).</li></ul>
${box('Números', '<ul><li><b>5%</b>: multas → FUNSET</li><li><b>18 a 25/09</b>: Semana Nacional</li><li><b>60 dias</b>: prazo antes do leilão</li><li><b>5 anos</b>: certidão criminal</li></ul>')}
${peg('Dinheiro de multa <b>não</b> pode ir para despesas gerais do órgão. O rol do art. 320 é taxativo.')}`,
    },
  ],
};

// Junta ilustrações e questões, inclui os capítulos novos e põe tudo na ordem de estudo
const todos = [...BASE.assuntos, ...NOVOS].map((a) => {
  const x = EXTRAS[a.id];
  if (!x) return a;
  const i = a.html.indexOf('</p>');
  return { ...a, html: i > 0 ? a.html.slice(0, i + 4) + x.fig + a.html.slice(i + 4) : x.fig + a.html, quiz: x.quiz };
});
export default { ...BASE, assuntos: ORDEM.map((id) => todos.find((a) => a.id === id)).filter(Boolean) };
