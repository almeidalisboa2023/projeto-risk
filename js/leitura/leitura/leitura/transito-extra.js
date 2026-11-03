// Complementos de Legislação de Trânsito: ilustrações e questões dos textos existentes + capítulos que faltavam.
import { placa, desenho, figuras, cartoes, passos, COR } from './figuras.js';
import { TABELA } from './transito-tabela.js';

const peg = (t) => `<div class="lt-peg"><b class="lt-tit">⚠ Pegadinha</b> ${t}</div>`;
const box = (tit, t) => `<div class="lt-box"><b class="lt-tit">${tit}</b>${t}</div>`;
const dica = (t) => `<div class="lt-dica"><b class="lt-tit">💡 Dica de memorização</b> ${t}</div>`;
const C = (p, e) => ({ p, c: true, e });
const E = (p, e) => ({ p, c: false, e });

// Figura (vai logo após o primeiro parágrafo) e questões de cada assunto já escrito
export const EXTRAS = {
  preliminares: {
    fig: cartoes([['🚶', 'Pessoas', '', COR.azul], ['🚗', 'Veículos', '', COR.verm], ['🐎', 'Animais', '', COR.verde]]) + cartoes([['➡️', 'Circulação'], ['✋', 'Parada'], ['🅿️', 'Estacionamento'], ['📦', 'Carga e descarga']]),
    quiz: [C('As vias internas de condomínios constituídos por unidades autônomas são equiparadas a vias terrestres para fins de aplicação do CTB.', 'Art. 2º, parágrafo único: praias abertas, vias internas de condomínios e estacionamentos privados de uso coletivo são equiparados a vias terrestres.'),
      E('A responsabilidade dos órgãos do SNT por danos causados por omissão em programas de trânsito seguro depende de comprovação de culpa.', 'A responsabilidade é objetiva (art. 1º, §3º): não é preciso provar culpa.')],
  },
  circulacao: {
    fig: figuras([[placa.vel(80), 'Trânsito rápido'], [placa.vel(60), 'Arterial'], [placa.vel(40), 'Coletora'], [placa.vel(30), 'Local']], 'Vias urbanas sem placa (art. 61)') + figuras([[placa.vel(110), 'Pista dupla · carro e moto'], [placa.vel(100), 'Pista simples · carro e moto'], [placa.vel(90), 'Demais veículos'], [placa.vel(60), 'Estrada']], 'Vias rurais sem placa (art. 61)'),
    quiz: [C('Em cruzamento não sinalizado entre duas vias urbanas comuns, tem preferência o veículo que vier pela direita do condutor.', 'Art. 29, III, “c”: fora dos casos de rodovia e rotatória, a preferência é de quem vem pela direita.'),
      E('Em rodovia de pista dupla sem sinalização, a velocidade máxima para caminhões é de 110 km/h.', 'Os 110 km/h valem para automóveis, camionetas e motocicletas. Para os demais veículos, o limite é 90 km/h.')],
  },
  profissionais: {
    fig: cartoes([['⏱', '5h30', 'máximo de direção ininterrupta', COR.verm], ['🚚', '30 min a cada 6 h', 'transporte de carga', COR.lar], ['🚌', '30 min a cada 4 h', 'transporte de passageiros', COR.azul], ['🛏', '11 h a cada 24 h', '1º período de 8 h seguidas', COR.verde]]),
    quiz: [E('No transporte rodoviário de cargas, devem ser observados 30 minutos de descanso a cada 4 horas de direção.', 'Na carga são 30 minutos a cada 6 horas. Os 30 minutos a cada 4 horas são do transporte de passageiros.'),
      C('Em cada período de 24 horas, o motorista profissional deve ter no mínimo 11 horas de descanso, que podem ser fracionadas, com o primeiro período de 8 horas ininterruptas.', 'Art. 67-C, §3º.')],
  },
  cidadao: {
    fig: cartoes([['✍️', 'Pede por escrito', 'sinalização, fiscalização, equipamentos de segurança, sugestões', COR.azul], ['📨', 'Órgão responde por escrito', 'justifica e informa quando vai atender', COR.verde]]),
    quiz: [E('O cidadão pode solicitar verbalmente ao órgão de trânsito a implantação de sinalização, e o órgão deve responder no mesmo ato.', 'O pedido e a resposta são por escrito (arts. 72 e 73).')],
  },
  educacao: {
    fig: cartoes([['📅', '18 a 25 de setembro', 'Semana Nacional de Trânsito', COR.verm], ['🏛', 'Contran', 'define os temas anuais das campanhas', COR.azul], ['📺', 'Rádio e TV', 'divulgação gratuita das campanhas', COR.verde], ['🏫', 'Todos os níveis', 'da pré-escola ao ensino superior', COR.roxo]]),
    quiz: [C('Cabe ao Contran estabelecer anualmente os temas e os cronogramas das campanhas de âmbito nacional de educação para o trânsito.', 'Art. 75.'),
      E('A Semana Nacional de Trânsito é realizada entre 1º e 7 de setembro.', 'É de 18 a 25 de setembro (art. 326).')],
  },
  engenharia: {
    fig: figuras([[placa.obras(), 'Obra na via'], [placa.lombada(), 'Saliência / lombada'], [placa.curva(), 'Curva à direita']], 'Obstáculos e obras devem ser sinalizados imediatamente (arts. 94 e 95)'),
    quiz: [C('Salvo emergência, a interdição de via deve ser comunicada à comunidade com antecedência mínima de 48 horas.', 'Art. 95, §2º.'),
      E('A obrigação de sinalizar uma obra realizada na via é sempre do órgão de trânsito com circunscrição sobre ela.', 'A sinalização é responsabilidade de quem executa ou mantém a obra (art. 95, §1º).')],
  },
  licenciamento: {
    fig: figuras([[desenho.documento('LICENCIAMENTO ANUAL', 'CLA'), 'O CLA prova que o veículo está licenciado']]),
    quiz: [C('Para ser considerado licenciado, o veículo deve estar com as multas vinculadas a ele quitadas, ainda que o proprietário não seja o responsável pelas infrações.', 'Art. 131, §2º: a quitação independe de quem cometeu as infrações.'),
      E('O veículo novo deve ser licenciado antes de sair da fábrica.', 'No trajeto da fábrica até o município de destino ele não está sujeito a licenciamento (art. 132).')],
  },
  escolares: {
    fig: figuras([[desenho.escolar(), 'Faixa amarela de 40 cm com “ESCOLAR” em preto'], [placa.escolares(), 'Placa de área escolar']]),
    quiz: [C('O condutor de veículo destinado à condução de escolares deve ter idade superior a 21 anos e ser habilitado na categoria D.', 'Art. 138, I e II.'),
      E('A inspeção dos veículos de transporte escolar para verificação dos equipamentos obrigatórios é anual.', 'É semestral (art. 136, II).')],
  },
  motofrete: {
    fig: cartoes([['🏍', 'Categoria aluguel', 'registro do veículo', COR.azul], ['🛡', 'Mata-cachorro', 'protetor de motor no chassi', COR.lar], ['📡', 'Antena corta-pipas', 'aparador de linha', COR.verde], ['🔍', 'Inspeção semestral', '', COR.roxo]]),
    quiz: [C('É permitido o transporte de gás de cozinha em moto-frete, desde que com auxílio de side-car.', 'Art. 139-A, §2º: gás de cozinha e galões de água mineral são exceções, com side-car.'),
      E('Para exercer moto-frete, basta ser habilitado na categoria A, sem tempo mínimo de habilitação.', 'São exigidos 2 anos na categoria A, idade mínima de 21 anos e curso especializado (Lei 12.009/2009).')],
  },
  habilitacao: {
    fig: cartoes([['🏍', 'A', '2 ou 3 rodas', COR.azul], ['🚗', 'B', 'até 3.500 kg e 8 lugares', COR.verde], ['🚚', 'C', 'carga acima de 3.500 kg', COR.lar], ['🚌', 'D', 'mais de 8 passageiros', COR.roxo], ['🚛', 'E', 'combinações · acoplado de 6.000 kg ou mais', COR.verm]]),
    quiz: [C('Um condutor de 55 anos deve renovar o exame de aptidão física e mental a cada 5 anos.', 'De 50 a 69 anos, a renovação é a cada 5 anos (art. 147, §2º, II).'),
      E('Para habilitar-se na categoria E, o condutor deve estar habilitado há, no mínimo, 2 anos na categoria B.', 'Para a E, é preciso no mínimo 1 ano na categoria C (art. 145).')],
  },
  infracoes: {
    fig: cartoes([['🔴', 'Gravíssima', '7 pontos · R$ 293,47', COR.verm], ['🟠', 'Grave', '5 pontos · R$ 195,23', COR.lar], ['🟡', 'Média', '4 pontos · R$ 130,16', COR.amar], ['🟢', 'Leve', '3 pontos · R$ 88,38', COR.verde]]),
    quiz: [C('O condutor que soma 20 pontos em 12 meses, tendo cometido duas infrações gravíssimas nesse período, fica sujeito à suspensão do direito de dirigir.', 'Art. 261, I, “a”: 20 pontos quando houver 2 ou mais gravíssimas.'),
      E('Dirigir segurando ou manuseando o telefone celular é infração de natureza média.', 'Segurar ou manusear o celular é gravíssima (art. 252, parágrafo único).')],
  },
  medidas: {
    fig: cartoes([['🚧', 'Retenção', 'fica no local até regularizar', COR.lar], ['🚛', 'Remoção', 'vai para o depósito', COR.verm], ['🪪', 'Recolhimento', 'CNH, Permissão, CRV, CLA', COR.azul], ['🌬', 'Alcoolemia', 'teste ou perícia', COR.roxo]]),
    quiz: [E('A retenção do veículo é uma penalidade aplicada pela autoridade de trânsito.', 'Retenção é medida administrativa, e não penalidade (art. 269).'),
      C('Na esfera administrativa, qualquer concentração de álcool por litro de sangue ou de ar alveolar sujeita o condutor às penalidades do art. 165.', 'Art. 276.')],
  },
  'crimes-gerais': {
    fig: cartoes([['🚑', 'Prestou socorro', 'sem flagrante e sem fiança (art. 301)', COR.verde], ['⏳', '2 meses a 5 anos', 'suspensão ou proibição (art. 293)', COR.azul], ['📮', '48 horas', 'para entregar a CNH ao juiz', COR.lar]]),
    quiz: [C('Ao condutor que presta pronto e integral socorro à vítima não se imporá prisão em flagrante nem se exigirá fiança.', 'Art. 301.'),
      E('A pena de suspensão da habilitação para dirigir tem duração de 1 a 10 anos.', 'Ela dura de 2 meses a 5 anos (art. 293).')],
  },
  'crimes-especie': {
    fig: cartoes([['🍺', 'Art. 306', '6 dg/L de sangue ou 0,3 mg/L de ar', COR.verm], ['🏁', 'Art. 308', 'racha com risco à incolumidade', COR.lar], ['🔑', 'Art. 310', 'perigo abstrato · Súmula 575 STJ', COR.roxo], ['🪪', 'Art. 309', 'sem habilitação, gerando perigo de dano', COR.azul]]),
    quiz: [E('O crime de entregar a direção de veículo a pessoa não habilitada exige a comprovação de perigo concreto de dano.', 'É crime de perigo abstrato (Súmula 575 do STJ).'),
      C('O crime de omissão de socorro se configura ainda que a vítima tenha morrido instantaneamente.', 'Art. 304, parágrafo único.')],
  },
  finais: {
    fig: cartoes([['💰', '5%', 'das multas → FUNSET', COR.verde], ['📅', '18 a 25/09', 'Semana Nacional', COR.verm], ['🔨', '60 dias', 'sem reclamação → leilão', COR.lar]]),
    quiz: [C('5% do valor das multas de trânsito arrecadadas é depositado mensalmente em fundo nacional destinado à segurança e educação de trânsito.', 'Art. 320, §1º.')],
  },
};

// Capítulos que faltavam
export const NOVOS = [
  TABELA,
  {
    id: 'snt', titulo: 'Sistema Nacional de Trânsito', arts: 'arts. 5º a 25',
    chaves: ['sistema nacional de transito', 'sistema nacional'],
    html: `
<h3>Em poucas palavras</h3>
<p>O <b>SNT</b> é o conjunto de órgãos e entidades da <b>União, Estados, DF e Municípios</b> que planeja, normatiza, registra e licencia veículos, habilita condutores, educa, opera e fiscaliza o trânsito, julga infrações e recursos e aplica penalidades (art. 5º).</p>
${cartoes([['🏛', 'Contran', 'coordenador do SNT e órgão máximo normativo', '#C8102E'], ['🗺', 'Cetran e Contrandife', 'normativos, consultivos e coordenadores nos Estados e no DF', '#E67E22'], ['🏢', 'Órgãos executivos de trânsito', 'Senatran, Detrans e órgãos municipais', '#2B6CB0'], ['🛣', 'Órgãos executivos rodoviários', 'DNIT, DERs', '#7B3FA0'], ['🚓', 'PRF', 'rodovias e estradas federais', '#D4A017'], ['👮', 'Polícias Militares', 'fiscalizam mediante convênio', '#2E7D4F'], ['⚖️', 'JARI', 'julgam os recursos contra penalidades', '#6B6458']])}
<h3>Composição (art. 7º)</h3>
<p>Contran; Cetran e Contrandife; órgãos e entidades <b>executivos de trânsito</b> da União, Estados, DF e Municípios; órgãos <b>executivos rodoviários</b>; <b>Polícia Rodoviária Federal</b>; <b>Polícias Militares</b> dos Estados e do DF; e <b>JARI</b>.</p>
<h3>Competências da PRF (art. 20), no âmbito das rodovias federais</h3>
<ul><li>Cumprir e fazer cumprir a legislação de trânsito.</li><li>Fazer o <b>patrulhamento ostensivo</b> e operações de segurança pública, preservando a ordem, a incolumidade das pessoas e o patrimônio da União e de terceiros.</li><li>Fiscalizar, aplicar <b>advertência por escrito e multas</b> e as <b>medidas administrativas</b>, notificar e arrecadar as multas e os valores de estada, remoção e escolta.</li><li>Fazer o <b>levantamento dos locais de acidente</b> e dos serviços de socorro e salvamento.</li><li>Credenciar e fiscalizar escoltas e o transporte de carga indivisível.</li><li>Assegurar a <b>livre circulação</b> e zelar pelo direito de vizinhança, interditando construções não autorizadas.</li><li>Coletar <b>estatísticas</b> de acidentes e propor medidas preventivas.</li><li>Fiscalizar a emissão de <b>poluentes e ruído</b>.</li></ul>
${box('Quem faz o quê', '<ul><li><b>Detran</b> (art. 22): habilitação, registro e licenciamento de veículos.</li><li><b>Órgão municipal</b> (art. 24): fiscaliza circulação, estacionamento e parada no município.</li><li><b>Polícia Militar</b> (art. 23): fiscaliza quando houver <b>convênio</b> com o órgão de trânsito.</li><li><b>JARI</b> (art. 16): funciona junto a cada órgão executivo e rodoviário e julga os recursos.</li></ul>')}
${peg('A PRF atua nas rodovias <b>federais</b>. Rodovia estadual é com o órgão rodoviário estadual e com a PM mediante convênio.')}
${dica('“<b>C</b>ontran <b>C</b>oordena”: duas letras C para lembrar que o Contran é o coordenador e o órgão máximo normativo.')}`,
    quiz: [C('O Contran é o coordenador do Sistema Nacional de Trânsito e seu órgão máximo normativo.', 'Art. 7º, I.'), E('Compete à PRF realizar o patrulhamento ostensivo das rodovias estaduais.', 'A competência da PRF é nas rodovias e estradas federais (art. 20).')],
  },
  {
    id: 'pedestres', titulo: 'Pedestres e condutores de veículos não motorizados', arts: 'arts. 68 a 71',
    chaves: ['pedestres', 'nao motorizados', 'pedestre'],
    html: `
<h3>Em poucas palavras</h3>
<p>O pedestre tem direito aos <b>passeios</b> (calçadas) e passagens nas vias urbanas e aos <b>acostamentos</b> nas vias rurais (art. 68).</p>
${figuras([[desenho.faixa(), 'Faixa de pedestres'], [placa.pedestre(), 'Advertência: passagem de pedestres']])}
<h3>Quando não há calçada ou acostamento</h3>
<table class="tab"><tr><th>Onde</th><th>Como o pedestre circula na pista</th></tr>
<tr><td><b>Área urbana</b></td><td>com <b>prioridade</b> sobre os veículos, pelos <b>bordos</b> da pista, em <b>fila única</b></td></tr>
<tr><td><b>Via rural</b></td><td>igual, mas em <b>sentido contrário</b> ao dos veículos</td></tr></table>
<p>As duas regras não valem onde a sinalização proíbe ou quando a segurança ficar comprometida.</p>
<h3>Travessia (arts. 69 e 70)</h3>
<ul><li>Use a <b>faixa</b> ou passagem quando houver uma a até <b>50 metros</b>.</li><li>Sem faixa por perto, atravesse em <b>linha perpendicular</b> ao eixo da via.</li><li>Na faixa <b>sem semáforo</b>, o pedestre tem <b>prioridade</b>.</li><li>Com semáforo, quem <b>não terminou a travessia</b> tem preferência, mesmo que o sinal abra para os veículos.</li></ul>
${box('Equiparação', '<p>O <b>ciclista desmontado</b>, empurrando a bicicleta, equipara-se ao <b>pedestre</b> em direitos e deveres (art. 68, §1º).</p>')}
${peg('Na via <b>rural</b> sem acostamento, o pedestre anda <b>contra</b> o fluxo, para ver os veículos que vêm em sua direção. Na área urbana, essa exigência não existe.')}`,
    quiz: [E('Nas vias rurais sem acostamento, o pedestre deve circular pelos bordos da pista, em fila única, no mesmo sentido dos veículos.', 'Na via rural, ele circula em sentido contrário ao dos veículos (art. 68, §3º).'), C('O ciclista desmontado empurrando a bicicleta equipara-se ao pedestre em direitos e deveres.', 'Art. 68, §1º.')],
  },
  {
    id: 'sinalizacao', titulo: 'Sinalização de trânsito', arts: 'arts. 80 a 90',
    chaves: ['sinalizacao de transito', 'sinalizacao'],
    html: `
<h3>Em poucas palavras</h3>
<p>Sinalização é a linguagem da via. Ela deve ser <b>visível e legível de dia e à noite</b>, e só vale a prevista no CTB e no Contran (art. 80).</p>
${figuras([[placa.pare(), 'Parada obrigatória'], [placa.preferencia(), 'Dê a preferência'], [placa.sentidoProibido(), 'Sentido proibido'], [placa.proibidoEstacionar(), 'Proibido estacionar'], [placa.proibidoUltrapassar(), 'Proibido ultrapassar']], 'Placas de regulamentação: são ordens, e desobedecer é infração') + figuras([[placa.curva(), 'Curva'], [placa.lombada(), 'Lombada'], [placa.pedestre(), 'Pedestres'], [placa.escolares(), 'Área escolar']], 'Placas de advertência (amarelas): avisam de um perigo à frente')}
<h3>Tipos de sinalização (art. 87)</h3>
${cartoes([['🪧', 'Vertical', 'placas', '#2B6CB0'], ['〰️', 'Horizontal', 'marcas no pavimento', '#D4A017'], ['🚧', 'Auxiliar', 'cones, tachas, barreiras', '#E67E22'], ['🚦', 'Luminosa', 'semáforos', '#2E7D4F'], ['📢', 'Sonora', 'apitos', '#7B3FA0'], ['✋', 'Gestos', 'do agente e do condutor', '#C8102E']])}
<h3>Ordem de prevalência (art. 89)</h3>
${figuras([[desenho.agente(), '1º Agente de trânsito'], [desenho.semaforo(), '2º Semáforo'], [placa.pare(), '3º Demais sinais']])}
${passos([['Ordens do agente', 'prevalecem sobre as normas de circulação e outros sinais'], ['Semáforo', 'prevalece sobre os demais sinais'], ['Sinais', 'prevalecem sobre as demais normas de trânsito']])}
<h3>Outras regras</h3>
<ul><li>Proibido colocar luzes, publicidade, vegetação ou mobiliário que <b>confundam</b> ou atrapalhem a visão da sinalização (art. 81).</li><li>Proibido afixar <b>publicidade</b> na placa ou em seu suporte (art. 82).</li><li>Via pavimentada só é entregue ou reaberta depois de <b>sinalizada</b> vertical e horizontalmente (art. 88).</li><li>Sinalização <b>insuficiente ou incorreta</b>: não se aplica sanção, e o órgão responsável responde pela falha (art. 90).</li></ul>
${dica('Ordem de prevalência: “<b>A</b>gente, <b>S</b>emáforo, <b>S</b>inal, <b>N</b>orma”: A-S-S-N.')}
${peg('A placa manda, mas o <b>agente manda mais</b>. Se ele mandar seguir com o sinal vermelho, vale a ordem dele.')}`,
    quiz: [E('As indicações dos sinais de trânsito prevalecem sobre as ordens do agente de trânsito.', 'As ordens do agente prevalecem sobre todos os sinais (art. 89, I).'), C('Não se aplicam as sanções por inobservância à sinalização quando ela for insuficiente ou incorreta.', 'Art. 90.')],
  },
  {
    id: 'veiculos', titulo: 'Dos veículos', arts: 'arts. 96 a 117',
    chaves: ['dos veiculos', 'classificacao dos veiculos', 'equipamentos obrigatorios'],
    html: `
<h3>Em poucas palavras</h3>
<p>O capítulo classifica os veículos, lista os <b>equipamentos obrigatórios</b> e fixa regras de peso, dimensões e identificação.</p>
<h3>Classificação (art. 96)</h3>
${cartoes([['⚙️', 'Tração', 'automotor, elétrico, propulsão humana, tração animal, reboque e semirreboque', '#2B6CB0'], ['🚗', 'Espécie', 'passageiros, carga, misto, competição, tração, especial, coleção', '#E67E22'], ['🏷', 'Categoria', 'oficial, diplomático, particular, aluguel, aprendizagem', '#2E7D4F']])}
<table class="tab"><tr><th>Espécie</th><th>Exemplos</th></tr>
<tr><td>🚌 Passageiros</td><td>bicicleta, ciclomotor, motoneta, motocicleta, triciclo, quadriciclo, automóvel, micro-ônibus, ônibus, bonde, charrete</td></tr>
<tr><td>🚚 Carga</td><td>motoneta, motocicleta, triciclo, quadriciclo, caminhonete, caminhão, carroça, carro de mão</td></tr>
<tr><td>🚙 Misto</td><td>camioneta, utilitário</td></tr>
<tr><td>🚜 Tração</td><td>caminhão-trator, trator de rodas, de esteiras e misto</td></tr></table>
<h3>Equipamentos obrigatórios (art. 105)</h3>
<ul><li><b>Cinto de segurança</b>.</li><li><b>Tacógrafo</b> nos veículos de <b>escolares</b>, de passageiros com <b>mais de 10 lugares</b> e de carga com peso bruto acima de <b>4.536 kg</b>.</li><li><b>Encosto de cabeça</b>.</li><li>Controle de emissão de <b>poluentes e ruído</b>.</li><li><b>Air bag</b> frontal para motorista e passageiro do banco da frente.</li><li><b>Bicicleta</b>: campainha, sinalização noturna dianteira, traseira, lateral e nos pedais, e retrovisor do lado esquerdo.</li></ul>
<h3>Outras regras</h3>
<ul><li>Nenhuma <b>modificação de fábrica</b> sem autorização prévia da autoridade (art. 98).</li><li>Peso e dimensões acima do limite só com <b>Autorização Especial de Trânsito</b> (AET) (art. 101).</li><li>Veículo de carga deve estar preparado para <b>não derramar carga</b> na via (art. 102).</li><li>Identificação externa por <b>placas</b> dianteira e traseira e identificação interna pelo <b>chassi</b> gravado (arts. 114 e 115).</li></ul>
${peg('O tacógrafo é exigido no transporte de passageiros com <b>mais de 10 lugares</b> e no de carga acima de <b>4.536 kg</b>, e não acima de 3.500 kg, que é o limite da categoria B.')}`,
    quiz: [C('O tacógrafo é equipamento obrigatório para os veículos de carga com peso bruto total superior a 4.536 kg.', 'Art. 105, II.'), E('O proprietário pode alterar livremente as características de fábrica do veículo, desde que comunique a alteração depois ao órgão de trânsito.', 'É preciso autorização prévia da autoridade competente (art. 98).')],
  },
  {
    id: 'registro', titulo: 'Registro de veículos', arts: 'arts. 120 a 129',
    chaves: ['registro de veiculos', 'registro e licenciamento', 'registro'],
    html: `
<h3>Em poucas palavras</h3>
<p>Todo veículo <b>automotor, elétrico, articulado, reboque ou semirreboque</b> deve ser <b>registrado</b> no Detran, no município de domicílio ou residência do proprietário (art. 120). O registro gera o <b>CRV</b>, o “RG” do veículo (art. 121).</p>
${figuras([[desenho.documento('REGISTRO DO VEÍCULO', 'CRV'), 'CRV: propriedade do veículo'], [desenho.documento('LICENCIAMENTO ANUAL', 'CLA'), 'CLA: renovado todo ano']])}
<h3>Novo CRV é obrigatório quando (art. 123)</h3>
${cartoes([['🤝', 'Transferência de propriedade', 'prazo de 30 dias', '#C8102E'], ['🏠', 'Mudança de município', 'providência imediata', '#2B6CB0'], ['🔧', 'Alteração de característica', 'providência imediata', '#E67E22'], ['🏷', 'Mudança de categoria', 'providência imediata', '#2E7D4F']])}
<ul><li>Não se expede novo CRV sem quitar <b>tributos, encargos e multas</b> (art. 128).</li><li>Veículo <b>irrecuperável</b> ou destinado a desmonte: o proprietário pede a <b>baixa</b> do registro, e é proibido remontá-lo sobre o mesmo chassi para manter o registro anterior (art. 126).</li><li>Veículos de <b>propulsão humana</b> e de <b>tração animal</b> seguem a legislação <b>municipal</b> (art. 129).</li></ul>
${box('Infração ligada', '<p>Não registrar no prazo de 30 dias nas hipóteses do art. 123: art. 233, infração <b>média</b>, com <b>remoção</b> do veículo (redação atual do CTB).</p>')}
${peg('Os <b>30 dias</b> valem para a <b>transferência de propriedade</b>. Nos demais casos (mudança de município, característica ou categoria), as providências devem ser <b>imediatas</b>.')}`,
    quiz: [C('Na transferência de propriedade, o prazo para as providências de expedição do novo CRV é de 30 dias.', 'Art. 123, §1º.'), E('A mudança de município de domicílio do proprietário dispensa a expedição de novo CRV.', 'A mudança de município exige novo CRV (art. 123, II).')],
  },
  {
    id: 'processo', titulo: 'Processo administrativo', arts: 'arts. 280 a 290',
    chaves: ['processo administrativo', 'auto de infracao', 'notificacao'],
    html: `
<h3>Em poucas palavras</h3>
<p>É o caminho entre a <b>autuação</b> e a <b>penalidade definitiva</b>, com direito de defesa e recursos.</p>
${passos([['Auto de infração', 'lavrado pelo agente (art. 280)'], ['Notificação da autuação', 'expedida em até 30 dias, senão o auto é arquivado (art. 281)'], ['Defesa da autuação', 'apresentada antes da aplicação da penalidade'], ['Notificação da penalidade', 'com o prazo para pagar ou recorrer (art. 282)'], ['Recurso à JARI', '1ª instância'], ['Recurso de 2ª instância', 'Cetran, Contrandife ou colegiado, conforme o órgão (art. 289)']])}
<h3>Auto de infração (art. 280)</h3>
<p>Deve conter: tipificação, local, data e hora, placa, marca e espécie do veículo, prontuário do condutor sempre que possível, identificação do órgão e do agente e assinatura do infrator sempre que possível.</p>
<p>O <b>agente</b> pode ser servidor civil, estatutário ou celetista, ou <b>policial militar designado</b> (§4º). A infração pode ser comprovada por declaração do agente ou por aparelho eletrônico ou audiovisual reconhecido pelo Contran (§2º).</p>
<h3>Pagamento com desconto (art. 284)</h3>
${cartoes([['💸', '20% de desconto', 'pagando até o vencimento: 80% do valor', '#2E7D4F'], ['📱', '40% de desconto', 'pelo sistema de notificação eletrônica, abrindo mão de defesa e recurso: 60% do valor', '#2B6CB0']])}
<ul><li>O recurso <b>não tem efeito suspensivo</b> (art. 285, §1º).</li><li>O recurso <b>não depende do pagamento</b> da multa (art. 286).</li><li>A instância administrativa se encerra com o julgamento em <b>2ª instância</b> ou se não houver recurso no prazo (art. 290).</li></ul>
${peg('Se a <b>notificação da autuação</b> não sair em <b>30 dias</b>, o auto é <b>arquivado</b> e o registro julgado insubsistente. O prazo vale para a notificação, e não para o pagamento.')}`,
    quiz: [C('Se a notificação da autuação não for expedida no prazo máximo de 30 dias, o auto de infração será arquivado.', 'Art. 281, parágrafo único, II.'), E('O recurso contra a penalidade de multa depende do pagamento prévio da multa.', 'O recurso independe do pagamento (art. 286).')],
  },
  {
    id: 'lei5970', titulo: 'Lei nº 5.970/1973 (remoção em acidentes)', arts: 'Lei 5.970/1973',
    chaves: ['5.970', '5970'],
    html: `
<h3>Em poucas palavras</h3>
<p>Lei curta e muito cobrada na PRF. Em acidente de trânsito, a <b>autoridade ou agente policial</b> que primeiro tomar conhecimento do fato pode autorizar, <b>independentemente de exame do local</b>, a <b>remoção imediata</b>:</p>
${cartoes([['🚑', 'Das pessoas feridas', '', '#C8102E'], ['🚗', 'Dos veículos', 'se estiverem no leito da via e prejudicarem o tráfego', '#2B6CB0']])}
<h3>Condição: boletim de ocorrência</h3>
<p>Para autorizar a remoção, a autoridade ou o agente <b>lavra boletim de ocorrência</b> com o fato, as <b>testemunhas</b> e todas as circunstâncias necessárias ao esclarecimento da verdade (art. 1º, parágrafo único).</p>
${box('Por que existe', '<p>O CPP manda preservar o local do crime até a chegada da perícia. A Lei 5.970 cria uma <b>exceção</b> para acidentes de trânsito: socorrer a vítima e liberar a via vêm antes da perícia no local.</p>')}
${peg('A remoção dos veículos só é autorizada se eles estiverem no <b>leito da via</b> e <b>prejudicarem o tráfego</b>. Veículo no acostamento, sem atrapalhar, não se enquadra.')}`,
    quiz: [C('A autoridade ou o agente policial que primeiro tomar conhecimento de acidente de trânsito pode autorizar a remoção imediata dos veículos que estejam no leito da via e prejudiquem o tráfego, independentemente de exame do local.', 'Art. 1º da Lei 5.970/1973.'), E('Para autorizar a remoção, basta a ordem verbal do agente, sem qualquer registro.', 'É obrigatório lavrar boletim de ocorrência com o fato, as testemunhas e as circunstâncias.')],
  },
];

// Ordem de estudo final
export const ORDEM = ['preliminares', 'snt', 'circulacao', 'profissionais', 'pedestres', 'cidadao', 'educacao', 'sinalizacao', 'engenharia', 'veiculos', 'registro', 'licenciamento', 'escolares', 'motofrete', 'habilitacao', 'infracoes', 'tabela-infracoes', 'medidas', 'processo', 'crimes-gerais', 'crimes-especie', 'finais', 'lei5970'];
