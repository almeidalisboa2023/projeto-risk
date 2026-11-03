// Trânsito — aula completa (parte 1): preliminares, SNT, circulação, profissionais, pedestres, cidadão, educação.
import { cartoes, COR } from './figuras.js';
import { peg, box, ex, banca, C, E } from './blocos.js';

const A = (t) => `<h3 class="lt-aula">📚 Aula completa</h3>${t}`;

export const AULA1 = {
  preliminares: {
    html: A(`
<h3>Conceitos do Anexo I que mais caem</h3>
<table class="tab"><tr><th>Termo</th><th>Definição (resumida do Anexo I)</th></tr>
<tr><td><b>Via</b></td><td>superfície por onde transitam veículos, pessoas e animais: pista, calçada, acostamento, ilha e canteiro central</td></tr>
<tr><td><b>Pista</b></td><td>parte da via normalmente usada para a circulação de veículos</td></tr>
<tr><td><b>Acostamento</b></td><td>parte da via diferenciada da pista, destinada à <b>parada ou estacionamento de emergência</b> e à circulação de pedestres e bicicletas, quando não houver local apropriado</td></tr>
<tr><td><b>Calçada</b> e <b>passeio</b></td><td>calçada: parte da via, em nível diferente, reservada aos pedestres; passeio: parte da calçada (ou da pista, separada) destinada à circulação exclusiva de pedestres e, excepcionalmente, de ciclistas</td></tr>
<tr><td><b>Ciclovia</b> e <b>ciclofaixa</b></td><td>ciclovia: pista própria, <b>separada fisicamente</b>; ciclofaixa: parte da pista <b>delimitada por sinalização</b></td></tr>
<tr><td><b>Parada</b></td><td>imobilização pelo tempo <b>estritamente necessário</b> para embarque ou desembarque de passageiros</td></tr>
<tr><td><b>Estacionamento</b></td><td>imobilização por tempo <b>superior</b> ao necessário para embarque ou desembarque</td></tr>
<tr><td><b>Ultrapassagem</b></td><td>movimento de passar à frente de outro veículo que se desloca no mesmo sentido, em menor velocidade, na mesma faixa, saindo e retornando a ela</td></tr>
<tr><td><b>Passagem</b></td><td>passar à frente de outro veículo que está em <b>outra faixa</b> (sem mudar de faixa)</td></tr>
<tr><td><b>Ciclomotor</b></td><td>2 ou 3 rodas, motor de até <b>50 cm³</b> ou elétrico de até 4 kW, velocidade máxima de fabricação de até <b>50 km/h</b></td></tr>
<tr><td><b>Sinistro de trânsito</b></td><td>expressão adotada pelo CTB (Lei 14.599/2023) no lugar de “acidente de trânsito”</td></tr></table>
${box('Parada × estacionamento', '<p>A diferença é o <b>tempo</b> e a <b>finalidade</b>. Parou para alguém descer e já saiu: <b>parada</b>. Desligou o carro e foi ao banco: <b>estacionamento</b>. As infrações são diferentes (arts. 181 e 182), e as de estacionamento costumam ter <b>remoção</b>.</p>')}
${ex('<p>Um condutor para no acostamento de rodovia para atender o celular. O acostamento é para <b>emergência</b>; atender o celular não é emergência, então ele <b>estacionou</b> indevidamente no acostamento (art. 181, VII: leve, com remoção).</p>', 'Caso prático')}
${banca('<ul><li>Cebraspe adora a diferença entre <b>ciclovia</b> (separada fisicamente) e <b>ciclofaixa</b> (só pintura).</li><li>“Passagem” e “ultrapassagem” não são sinônimos.</li><li>O CTB passou a usar “sinistro”, mas questões antigas ainda falam em “acidente”.</li></ul>')}
${peg('Acostamento <b>não</b> é para circular com veículo. Pedestres e bicicletas podem usá-lo quando não houver local próprio; veículos, só em <b>emergência</b>.')}`),
    quiz: [C('Segundo o Anexo I do CTB, estacionamento é a imobilização do veículo por tempo superior ao necessário para embarque ou desembarque de passageiros.', 'Parada é pelo tempo estritamente necessário.'), E('Ciclofaixa é a pista própria para bicicletas, separada fisicamente do tráfego comum.', 'Isso é ciclovia; a ciclofaixa é delimitada por sinalização.'), C('O acostamento destina-se à parada ou ao estacionamento de veículos em caso de emergência.', 'Anexo I.'), E('Ultrapassagem e passagem são expressões sinônimas no CTB.', 'Na passagem, o veículo está em outra faixa.'), C('O ciclomotor tem velocidade máxima de fabricação não superior a 50 km/h.', 'Anexo I.')],
  },
  snt: {
    html: A(`
<h3>Competências mais cobradas</h3>
<table class="tab"><tr><th>Órgão</th><th>Atribuições principais</th></tr>
<tr><td><b>Contran</b> (art. 12)</td><td>estabelecer normas regulamentares; coordenar os órgãos do SNT; criar <b>Câmaras Temáticas</b>; zelar pela uniformidade e cumprimento das normas; responder consultas; normatizar procedimentos de habilitação, registro e licenciamento</td></tr>
<tr><td><b>Cetran e Contrandife</b> (art. 14)</td><td>cumprir e fazer cumprir a legislação no Estado ou no DF; <b>julgar recursos</b> contra decisões das JARI (2ª instância); responder consultas dos municípios</td></tr>
<tr><td><b>Senatran</b> (art. 19)</td><td>órgão máximo executivo de trânsito da <b>União</b>: organiza os registros nacionais (RENAVAM, RENACH), expede a CNH e o CRV por meio dos Detrans, supervisiona a política nacional</td></tr>
<tr><td><b>DNIT e DERs</b> (art. 21)</td><td>órgãos executivos rodoviários: engenharia, sinalização, fiscalização de peso e dimensões, autuação nas rodovias de sua circunscrição</td></tr>
<tr><td><b>Detran</b> (art. 22)</td><td>habilitação, exames, registro, licenciamento e vistoria de veículos</td></tr>
<tr><td><b>Órgão municipal</b> (art. 24)</td><td>planejar e operar o trânsito urbano; fiscalizar <b>circulação, estacionamento e parada</b>; implantar estacionamento rotativo</td></tr>
<tr><td><b>JARI</b> (art. 16)</td><td>julgar os recursos em 1ª instância, junto a cada órgão executivo e rodoviário</td></tr></table>
${box('Como o município entra no SNT', '<p>Para exercer as competências do art. 24, o município precisa <b>integrar-se ao SNT</b>, criando órgão ou entidade executiva de trânsito (art. 24, §2º). Enquanto não fizer isso, as competências ficam com o Estado.</p>')}
${cartoes([['🤝', 'Convênios (art. 25)', 'os órgãos podem celebrar convênios delegando atividades previstas no CTB', COR.azul], ['👮', 'PM (art. 23, III)', 'fiscaliza trânsito como agente do órgão executivo quando houver <b>convênio</b>', COR.verde]])}
${ex('<p>Um condutor recebe multa da PRF numa rodovia federal e recorre. A 1ª instância é a <b>JARI</b> que funciona junto à PRF. A 2ª instância, para penalidades de órgão da União, é um <b>colegiado especial</b> previsto no art. 289, I. Se a multa fosse do Detran, a 2ª instância seria o <b>Cetran</b>.</p>', 'Caso prático')}
${peg('Cetran e Contrandife <b>julgam recursos</b> de 2ª instância contra decisões das JARI dos órgãos estaduais e municipais. A JARI <b>não</b> é órgão superior: é a 1ª instância.')}`),
    quiz: [C('Compete aos Cetrans julgar os recursos interpostos contra decisões das JARI dos órgãos estaduais e municipais.', 'Art. 14, V.'), E('A Polícia Militar exerce a fiscalização de trânsito independentemente de convênio com o órgão executivo.', 'Depende de convênio (art. 23, III).'), C('O município passa a exercer as competências do art. 24 do CTB depois de integrar-se ao SNT, criando órgão executivo de trânsito.', 'Art. 24, §2º.'), E('A JARI é o órgão máximo normativo do Sistema Nacional de Trânsito.', 'O órgão máximo normativo é o Contran.'), C('Compete ao órgão executivo municipal fiscalizar as infrações de circulação, estacionamento e parada no perímetro urbano.', 'Art. 24.')],
  },
  circulacao: {
    html: A(`
<h3>Classificação das vias (art. 60)</h3>
${cartoes([['🏙', 'Urbanas', 'trânsito rápido · arterial · coletora · local', COR.azul], ['🛣', 'Rurais', 'rodovias (pavimentadas) · estradas (não pavimentadas)', COR.verde]])}
<h3>Regras de luzes em detalhe (art. 40)</h3>
<ul><li><b>Farol baixo</b>: à noite; de dia em túneis e sob chuva, neblina ou cerração; de dia em rodovias de pista simples fora do perímetro urbano (veículos sem DRL).</li><li><b>Motocicletas, motonetas, ciclomotores</b> e transporte coletivo em faixas próprias: farol baixo <b>de dia e de noite</b>.</li><li><b>Farol alto</b>: só em vias sem iluminação pública, exceto ao cruzar ou seguir outro veículo.</li><li><b>Luz de posição</b>: à noite, com o veículo parado para embarque, desembarque, carga ou descarga.</li><li><b>Pisca-alerta</b>: só em imobilizações ou situações de emergência, ou quando a regulamentação determinar.</li><li>Troca rápida de farol baixo e alto: advertir outro condutor que vai ultrapassar ou indicar perigo.</li></ul>
<h3>Outras regras de conduta</h3>
<table class="tab"><tr><th>Regra</th><th>Artigo</th></tr>
<tr><td>Proibido frear bruscamente, salvo por razões de segurança</td><td>art. 42</td></tr>
<tr><td>Velocidade compatível com a via e as condições; reduzir em locais de risco</td><td>art. 43</td></tr>
<tr><td>Ao aproximar-se de cruzamento, prudência especial e velocidade moderada</td><td>art. 44</td></tr>
<tr><td>Não entrar em cruzamento se houver congestionamento que obrigue a parar sobre ele</td><td>art. 45</td></tr>
<tr><td>Imobilização na via: sinalizar (triângulo, pisca-alerta) a distância adequada</td><td>art. 46</td></tr>
<tr><td>Estacionar paralelo ao meio-fio, no sentido do fluxo, salvo sinalização</td><td>art. 48</td></tr>
<tr><td>Abrir porta só com segurança, e o embarque e desembarque pelo lado da calçada</td><td>art. 49</td></tr>
<tr><td>Motociclistas: capacete com viseira ou óculos, guidom com as duas mãos, vestuário de proteção</td><td>art. 54</td></tr>
<tr><td>Ciclomotores: pela direita, proibidos em vias de trânsito rápido e calçadas</td><td>art. 57</td></tr>
<tr><td>Competições na via só com autorização e com garantias de segurança</td><td>art. 67</td></tr></table>
<h3>Ultrapassagem em detalhe</h3>
<ul><li>Antes de ultrapassar: ninguém o estar ultrapassando; o veículo da frente não ter sinalizado que vai ultrapassar; faixa da esquerda livre numa extensão suficiente (art. 29, X).</li><li>Ao ultrapassar: indicar com a seta, guardar distância lateral, retornar à faixa com segurança e sinalizando.</li><li>Quem é ultrapassado: deslocar-se para a direita, se estiver à esquerda, e <b>não acelerar</b> (art. 30).</li><li>Proibido ultrapassar pela contramão em curvas, aclives sem visibilidade, pontes, viadutos, túneis, faixas de pedestres e com linha amarela contínua (art. 32 e art. 203).</li><li>Distância lateral de <b>1,50 m</b> ao ultrapassar bicicleta (art. 201).</li></ul>
${ex('<p>Na BR, à noite e sem iluminação, o condutor trafega com farol alto e, ao ver um caminhão vindo no sentido contrário, mantém o alto: infração do art. 223 (farol que perturba a visão), grave. Se a via tivesse iluminação pública, usar farol alto já seria infração do art. 224, leve.</p>', 'Caso prático')}
${peg('Moto anda de farol baixo aceso <b>de dia e de noite</b> em qualquer via. A regra de “farol baixo de dia só em rodovia de pista simples” vale para os outros veículos.')}`),
    quiz: [C('Motocicletas, motonetas e ciclomotores devem trafegar com o farol baixo aceso durante o dia e a noite.', 'Art. 40, parágrafo único.'), E('O uso do pisca-alerta é permitido sempre que o condutor parar o veículo para embarque de passageiros.', 'Só em imobilizações ou emergências, ou quando a regulamentação determinar.'), C('É proibido ao condutor entrar em interseção quando houver congestionamento que o obrigue a parar sobre ela.', 'Art. 45.'), E('As vias rurais classificam-se em vias de trânsito rápido, arteriais e coletoras.', 'Rurais: rodovias e estradas.'), C('Ao ultrapassar bicicleta, o condutor deve guardar distância lateral de um metro e cinquenta centímetros.', 'Art. 29, XI, “c”, e art. 201.')],
  },
  profissionais: {
    html: A(`
<h3>Conceitos da Lei 13.103/2015 usados no CTB</h3>
<ul><li><b>Tempo de direção</b>: período em que o motorista efetivamente dirige.</li><li><b>Intervalo de descanso</b>: período de repouso, que pode ser feito no veículo se este tiver condições adequadas.</li><li>Os tempos de direção e descanso valem para o <b>transporte rodoviário coletivo de passageiros</b> e para o <b>transporte rodoviário de cargas</b>.</li></ul>
<h3>Situações práticas</h3>
<table class="tab"><tr><th>Situação</th><th>Correto?</th></tr>
<tr><td>Caminhoneiro dirige 5h, para 15 min, dirige mais 1h e para 15 min</td><td>✔ fracionou os 30 min dentro das 6 h, sem passar de 5h30 contínuas</td></tr>
<tr><td>Caminhoneiro dirige 6h seguidas</td><td>✘ passou de 5h30 ininterruptas</td></tr>
<tr><td>Motorista de ônibus dirige 4h e para 30 min</td><td>✔ 30 min a cada 4 h (passageiros)</td></tr>
<tr><td>Motorista descansa 8 h seguidas e mais 3 h no restante das 24 h</td><td>✔ 11 h no total, com o primeiro período de 8 h</td></tr></table>
${box('Fiscalização', '<p>O controle é feito por <b>tacógrafo</b>, diário de bordo, papeleta ou meio eletrônico. Na fiscalização, constatada a violação, aplica-se a infração <b>média</b> do art. 230, XXIII, com <b>retenção do veículo</b> até o cumprimento do descanso.</p>')}
${ex('<p>A PRF aborda um caminhão às 2h da manhã. O tacógrafo mostra que o motorista dirige há 7 horas sem parar. Medida: <b>retenção</b> até cumprir o descanso; infração média (art. 230, XXIII).</p>', 'Caso prático')}
${peg('O descanso de 11 h pode ser <b>fracionado</b>, mas o primeiro período precisa ter <b>8 h ininterruptas</b>.')}`),
    quiz: [C('Constatado o descumprimento do tempo de descanso, o veículo do motorista profissional será retido até que o descanso seja cumprido.', 'Art. 230, XXIII.'), E('Os tempos de direção e descanso do art. 67-C aplicam-se a qualquer condutor de automóvel particular.', 'Aplicam-se ao transporte rodoviário coletivo de passageiros e de cargas.'), C('O intervalo de descanso pode ser usufruído no próprio veículo, se ele oferecer condições adequadas.', 'Art. 67-C, §3º.'), E('Conduzir em desacordo com os tempos de direção do art. 67-C é infração gravíssima.', 'É média (art. 230, XXIII).')],
  },
  pedestres: {
    html: A(`
<h3>Direitos e deveres do pedestre</h3>
<ul><li>A autoridade pode permitir usar parte da calçada para outros fins (mesas, bancas), desde que não prejudique o fluxo de pedestres (art. 68, caput).</li><li>Onde houver faixa ou passagem a até <b>50 m</b>, o pedestre deve usá-la (art. 69, I).</li><li>Sem faixa: atravessar em linha perpendicular, olhando antes, sem demora e sem parar na pista sem necessidade.</li></ul>
<h3>Infrações do pedestre (art. 254)</h3>
<p>Todas são <b>leves</b>, com multa de <b>50%</b> do valor da leve: permanecer ou andar na pista; cruzar pistas em viadutos, pontes ou túneis; atravessar dentro de cruzamentos sem sinalização; usar a via em grupo que perturbe o trânsito; andar fora da faixa, passarela ou passagem; desobedecer à sinalização.</p>
<h3>Deveres dos condutores com o pedestre (art. 214)</h3>
${cartoes([['🔴', 'Gravíssimas', 'não dar preferência ao pedestre na faixa; ao que não terminou a travessia com o sinal verde para o veículo; a pessoas com deficiência, crianças, idosos e gestantes', COR.verm], ['🟠', 'Graves', 'não dar preferência a quem já iniciou a travessia sem sinalização; a quem atravessa a via transversal para onde o veículo vai', COR.lar]])}
${ex('<p>O semáforo abre para o carro, mas uma senhora ainda está no meio da faixa. Se o condutor buzinar e avançar, comete infração <b>gravíssima</b> (art. 214, II): o pedestre que não concluiu a travessia tem preferência.</p>', 'Caso prático')}
${peg('A multa do pedestre não é igual à leve “cheia”: é de <b>50%</b> do valor da infração leve.')}`),
    quiz: [C('As infrações cometidas por pedestres são de natureza leve, com multa de 50% do valor da infração leve.', 'Art. 254.'), E('Deixar de dar preferência ao pedestre que se encontra na faixa a ele destinada é infração média.', 'É gravíssima (art. 214, I).'), C('Havendo faixa de pedestres a até 50 metros, o pedestre deve utilizá-la para a travessia.', 'Art. 69, I.')],
  },
  cidadao: {
    html: A(`
<h3>Na prática</h3>
<ul><li>O pedido do art. 72 pode tratar de <b>sinalização, fiscalização e equipamentos de segurança</b> e também de <b>sugestões</b> de mudança de normas e da legislação de trânsito.</li><li>O órgão deve responder por escrito, <b>justificando</b> a análise e, quando cabível, informando <b>quando</b> o atendimento ocorrerá (art. 73).</li><li>Os órgãos devem promover campanhas para dar ciência desse direito à população (art. 73, parágrafo único).</li></ul>
${ex('<p>Moradores de um bairro pedem por escrito à prefeitura um semáforo perto da escola. O órgão de trânsito analisa e responde por escrito: pode negar, desde que justifique, ou informar a data prevista de implantação.</p>', 'Caso prático')}
${peg('O órgão não é obrigado a <b>atender</b> o pedido, mas é obrigado a <b>responder por escrito</b> e <b>justificar</b>.')}`),
    quiz: [C('O órgão de trânsito não é obrigado a atender a solicitação do cidadão, mas deve respondê-la por escrito, justificando a análise.', 'Art. 73.'), E('Apenas entidades civis registradas podem solicitar aos órgãos do SNT a implantação de sinalização.', 'Qualquer cidadão pode (art. 72).')],
  },
  educacao: {
    html: A(`
<h3>Os responsáveis e as ações</h3>
<table class="tab"><tr><th>Quem</th><th>O quê</th></tr>
<tr><td>Todos os órgãos do SNT</td><td>educação para o trânsito é <b>dever prioritário</b>; coordenação educacional obrigatória</td></tr>
<tr><td>Contran</td><td>temas e cronogramas <b>anuais</b> das campanhas nacionais</td></tr>
<tr><td>Ministério da Educação</td><td>educação para o trânsito nos currículos, da pré-escola ao ensino superior (art. 76)</td></tr>
<tr><td>Ministério da Saúde</td><td>campanha nacional sobre <b>primeiros socorros</b> (art. 77)</td></tr>
<tr><td>Emissoras de rádio e TV</td><td>difundir as campanhas gratuitamente</td></tr>
<tr><td>Fabricantes e anunciantes de veículos</td><td>mensagem educativa nas peças publicitárias (art. 77-A a 77-E)</td></tr></table>
${box('Recursos para educação', '<ul><li><b>10%</b> do valor repassado pelo seguro obrigatório à Previdência vai para programas de prevenção de acidentes (art. 78, parágrafo único).</li><li><b>5%</b> das multas vai para o FUNSET, fundo de segurança e educação de trânsito (art. 320, §1º).</li></ul>')}
${peg('Os <b>10%</b> do art. 78 vêm do <b>seguro obrigatório</b>; os <b>5%</b> do art. 320 vêm das <b>multas</b>. A banca troca os dois.')}`),
    quiz: [C('Cabe ao Ministério da Saúde, mediante proposta do Contran, estabelecer campanha nacional sobre primeiros socorros.', 'Art. 77.'), E('O percentual de 5% destinado a programas de prevenção de acidentes vem do seguro obrigatório.', 'Do seguro são 10% (art. 78); os 5% vêm das multas (art. 320).'), C('As campanhas de educação para o trânsito têm caráter permanente.', 'Art. 75, §2º.')],
  },
};
