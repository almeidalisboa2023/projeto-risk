// Trânsito — aula completa (parte 2): sinalização, engenharia, veículos, registro, licenciamento, escolares, moto-frete, habilitação.
import { cartoes, COR } from './figuras.js';
import { peg, box, ex, C, E } from './blocos.js';

const A = (t) => `<h3 class="lt-aula">📚 Aula completa</h3>${t}`;

export const AULA2 = {
  sinalizacao: {
    html: A(`
<h3>Os grupos de placas</h3>
<table class="tab"><tr><th>Grupo</th><th>Forma e cor</th><th>Função</th><th>Desobedecer é infração?</th></tr>
<tr><td><b>Regulamentação</b></td><td>em regra circular, borda vermelha (PARE é octogonal; Dê a preferência, triângulo invertido)</td><td>ordens, proibições, obrigações</td><td>sim</td></tr>
<tr><td><b>Advertência</b></td><td>losango amarelo com símbolo preto</td><td>avisar de perigo adiante</td><td>não diretamente, mas exige cautela (art. 220)</td></tr>
<tr><td><b>Indicação</b></td><td>retangulares: verde (direção), azul (serviços), marrom (turismo)</td><td>orientar, informar destinos e serviços</td><td>não</td></tr>
<tr><td><b>Obras</b> (temporária)</td><td>fundo laranja</td><td>sinalizar obras e desvios</td><td>conforme a mensagem</td></tr></table>
<h3>Sinalização horizontal</h3>
<ul><li>Linhas <b>amarelas</b> separam fluxos de <b>sentidos opostos</b>; linhas <b>brancas</b> separam fluxos do <b>mesmo sentido</b>.</li><li>Linha <b>contínua</b>: proibido ultrapassar ou transpor. Linha <b>tracejada</b>: permitido, com segurança.</li><li>Linha dupla com uma tracejada e outra contínua: vale para cada sentido a linha que está do seu lado.</li><li>Faixas de pedestres, linhas de retenção (onde parar), marcas de canalização (zebrados) e inscrições no pavimento (setas, “PARE”).</li></ul>
<h3>Semáforo</h3>
${cartoes([['🔴', 'Vermelho', 'parada obrigatória antes da faixa ou linha de retenção', COR.verm], ['🟡', 'Amarelo', 'atenção: parar, salvo se isso gerar risco (já está muito perto)', COR.amar], ['🟢', 'Verde', 'siga, respeitando pedestres que não terminaram a travessia', COR.verde]])}
<h3>Gestos do agente (prevalecem sobre tudo)</h3>
<ul><li>Braço levantado verticalmente, palma para frente: <b>ordem de parada</b> para todos os veículos.</li><li>Braços estendidos horizontalmente: parada para os que vêm de frente e de trás; siga para os que vêm dos lados.</li><li>Silvos de apito: um silvo breve = siga; dois breves = pare; um longo = diminua a marcha.</li></ul>
${ex('<p>Num cruzamento, o semáforo está verde, mas o agente da PRF levanta o braço verticalmente. O condutor deve <b>parar</b>: a ordem do agente prevalece sobre o semáforo (art. 89). Seguir seria desobedecer a ordem do agente (art. 195, grave).</p>', 'Caso prático')}
${peg('Linha <b>amarela</b> não é “mais forte” que a branca: a cor indica o <b>sentido</b> do fluxo (opostos × mesmo sentido). Quem proíbe ou permite é o traço: <b>contínuo</b> ou <b>tracejado</b>.')}`),
    quiz: [C('As linhas amarelas da sinalização horizontal separam fluxos de sentidos opostos.', 'Brancas separam o mesmo sentido.'), E('As placas de advertência têm, em regra, formato circular com borda vermelha.', 'São losangos amarelos.'), C('O braço levantado verticalmente, com a palma da mão para a frente, é ordem de parada para todos os veículos.', 'Anexo II do CTB.'), E('Diante da luz amarela do semáforo, o condutor deve acelerar para atravessar o cruzamento.', 'Deve parar, salvo se isso gerar risco.'), C('Sinalização insuficiente ou incorreta impede a aplicação da sanção correspondente.', 'Art. 90.')],
  },
  engenharia: {
    html: A(`
<h3>Ondulações e sonorizadores</h3>
<p>A regra é a <b>proibição</b> do uso de lombadas e sonorizadores como redutores de velocidade (art. 94, parágrafo único). Só são admitidos nos casos e padrões definidos pelo <b>Contran</b>, com sinalização prévia de advertência.</p>
<h3>Obras e eventos (art. 95)</h3>
<ul><li>Precisam de <b>permissão prévia</b> do órgão com circunscrição sobre a via.</li><li>A sinalização é obrigação de quem <b>executa</b> ou mantém a obra.</li><li>Interdição: aviso à comunidade com <b>48 horas</b> de antecedência, salvo emergência.</li><li>O descumprimento gera multa ao responsável, sem prejuízo das sanções civis e penais.</li></ul>
<h3>Polos geradores de tráfego (art. 93)</h3>
<p>Shoppings, estádios, universidades, hospitais e grandes condomínios só têm o projeto aprovado com <b>anuência prévia</b> do órgão de trânsito e com <b>estacionamento</b> e vias de acesso adequadas previstos.</p>
${ex('<p>Uma empresa vai trocar a tubulação sob uma avenida e precisa interditar uma faixa por três dias. Ela deve pedir permissão ao órgão municipal, sinalizar a obra por conta própria e avisar a população com 48 horas de antecedência.</p>', 'Caso prático')}
${peg('Quem responde pela falta de sinalização de obra é quem <b>executa ou mantém</b> a obra, inclusive empresa privada contratada.')}`),
    quiz: [C('A utilização de ondulações transversais como redutores de velocidade é, em regra, proibida, salvo nos casos definidos pelo Contran.', 'Art. 94, parágrafo único.'), E('Projetos de shoppings e estádios independem de manifestação do órgão de trânsito para sua aprovação.', 'Exigem anuência prévia (art. 93).')],
  },
  veiculos: {
    html: A(`
<h3>Categorias de veículos (art. 96, III)</h3>
<table class="tab"><tr><th>Categoria</th><th>Exemplo</th></tr><tr><td>Oficial</td><td>viatura da PRF, carro de prefeitura</td></tr><tr><td>Representação diplomática, consular e de organismos internacionais</td><td>carro de embaixada</td></tr><tr><td>Particular</td><td>carro de passeio</td></tr><tr><td>Aluguel</td><td>táxi, mototáxi, moto-frete</td></tr><tr><td>Aprendizagem</td><td>carro de autoescola</td></tr></table>
<h3>Segurança veicular</h3>
<ul><li>Veículo só circula com <b>equipamentos obrigatórios</b> em funcionamento; faltar ou estar inoperante é infração grave, com retenção (art. 230, IX).</li><li>Modificar o veículo sem autorização: infração grave (art. 230, VII), retenção.</li><li><b>Inspeção de segurança veicular</b> e de emissões, quando exigida.</li><li>Película nos vidros só nos limites do Contran; vidro coberto fora do padrão: art. 230, XVI, grave.</li></ul>
<h3>Peso e dimensões</h3>
<ul><li>Limites fixados pelo Contran (art. 99). Acima disso, só com <b>Autorização Especial de Trânsito (AET)</b>, com prazo certo e para cada viagem (art. 101).</li><li><b>Excesso de peso</b>: infração média com multa acrescida a cada 200 kg ou fração de excesso, retenção e <b>transbordo</b> da carga (art. 231, V). Responde o <b>embarcador</b> e o <b>transportador</b>, conforme o caso (art. 257).</li><li>Transitar com dimensões acima do permitido sem autorização: art. 231, IV, grave.</li></ul>
${ex('<p>Numa balança da rodovia, um caminhão é pesado com 2.500 kg acima do limite. Medidas: <b>retenção</b> e <b>transbordo</b> do excesso. Multa média acrescida por cada 200 kg (ou fração) de excesso. A responsabilidade é do transportador e, se a nota fiscal indicar peso menor que o real, do embarcador.</p>', 'Caso prático')}
${peg('Veículo <b>particular</b> usado para transporte remunerado sem estar licenciado para isso comete o art. 231, VIII (média, retenção).')}`),
    quiz: [C('Transitar com excesso de peso sujeita o veículo à retenção e ao transbordo da carga excedente.', 'Art. 231, V.'), E('Os veículos de aprendizagem pertencem à categoria particular.', 'Aprendizagem é categoria própria (art. 96, III).'), C('Para transitar com dimensões acima dos limites legais, o veículo precisa de autorização especial, com prazo certo.', 'Art. 101.')],
  },
  registro: {
    html: A(`
<h3>Na prática da transferência</h3>
${cartoes([['🧾', 'Vendedor', 'comunica a venda ao Detran (se o comprador não transferir em 30 dias, tem 60 dias para comunicar)', COR.azul], ['🚗', 'Comprador', '<b>30 dias</b> para transferir e obter novo CRV', COR.verde]])}
<ul><li>Sem a transferência no prazo: infração do <b>art. 233</b>, <b>média</b>, com <b>remoção</b> do veículo (redação atual).</li><li>Para o novo CRV, o veículo deve estar com tributos, encargos e multas quitados (art. 128).</li><li><b>Baixa do registro</b>: veículo irrecuperável ou desmontado. Deixar de fazer a baixa: art. 240, grave.</li><li>A <b>seguradora</b> deve comunicar ao órgão de trânsito a perda total do veículo (art. 243).</li><li>Identificação: <b>placas</b> dianteira e traseira e <b>chassi</b> gravado (VIN). Adulterar sinal identificador é crime (CP, art. 311).</li></ul>
${ex('<p>Lucas vende o carro em janeiro e o comprador não transfere. Em março, o comprador comete infrações. Se Lucas não comunicou a venda ao Detran no prazo, responde <b>solidariamente</b> pelas penalidades até a comunicação (art. 134).</p>', 'Caso prático')}
${peg('Deixar de transferir em 30 dias hoje é infração <b>média</b> com <b>remoção</b> (art. 233). Materiais antigos falam em grave com retenção, mas o texto mudou.')}`),
    quiz: [C('Deixar de efetuar o registro do veículo no prazo de 30 dias, nas hipóteses do art. 123, é infração média, com remoção do veículo.', 'Art. 233, redação atual.'), E('O antigo proprietário que não comunica a venda ao Detran não responde por nenhuma penalidade posterior à venda.', 'Responde solidariamente até a comunicação (art. 134).'), C('Adulterar o número do chassi é crime previsto no Código Penal.', 'Art. 311 do CP.')],
  },
  licenciamento: {
    html: A(`
<h3>Na prática da fiscalização</h3>
<ul><li>O <b>CRLV</b> (Certificado de Registro e Licenciamento de Veículo, em meio digital) reúne o registro e o licenciamento anual.</li><li>O porte do documento é dispensado se o agente puder consultar o sistema (art. 133).</li><li>Conduzir sem os documentos de porte obrigatório: art. 232, <b>leve</b>, retenção até apresentar o documento.</li><li>Conduzir veículo <b>não licenciado</b>: art. 230, V, <b>gravíssima</b>, com <b>remoção</b>.</li></ul>
${ex('<p>Na blitz, o condutor esqueceu o celular com o CRLV digital, mas o agente consulta o sistema e vê o veículo licenciado: não há infração. Se o sistema mostrar licenciamento vencido: art. 230, V, gravíssima, remoção.</p>', 'Caso prático')}
${peg('Esquecer o documento é <b>leve</b> (art. 232). Não ter licenciado é <b>gravíssima</b> (art. 230, V). A banca troca as duas.')}`),
    quiz: [C('Conduzir veículo que não esteja devidamente licenciado é infração gravíssima, com remoção do veículo.', 'Art. 230, V.'), E('Conduzir o veículo sem portar o documento obrigatório é infração gravíssima.', 'É leve (art. 232).')],
  },
  escolares: {
    html: A(`
<h3>Fiscalização do transporte escolar</h3>
<table class="tab"><tr><th>Irregularidade</th><th>Infração</th></tr>
<tr><td>Conduzir escolares sem a autorização</td><td>art. 230, XX, média</td></tr>
<tr><td>Porta aberta com o veículo em movimento</td><td>art. 250, IV, gravíssima, retenção</td></tr>
<tr><td>Ultrapassar pela direita escolar parado para embarque, sem refúgio</td><td>art. 200, gravíssima</td></tr>
<tr><td>Excesso de lotação</td><td>art. 231, VII, média, retenção</td></tr>
<tr><td>Tacógrafo defeituoso</td><td>art. 230, XIV, grave, retenção</td></tr></table>
${ex('<p>Uma van escolar com 15 lugares leva 18 crianças: lotação excedente (média, retenção). Se o motorista tiver só CNH categoria B: dirige veículo de categoria diferente (art. 162, III, gravíssima, multa 2x), além de não cumprir o art. 138.</p>', 'Caso prático')}
${peg('Ultrapassar pela direita ônibus escolar parado é <b>gravíssima</b>; ultrapassar pela direita outro veículo qualquer é <b>média</b> (art. 199).')}`),
    quiz: [C('Ultrapassar pela direita veículo de escolares parado para embarque ou desembarque, onde não houver refúgio de segurança, é infração gravíssima.', 'Art. 200.'), E('Conduzir veículo de escolares sem portar a autorização é infração gravíssima.', 'É média (art. 230, XX).')],
  },
  motofrete: {
    html: A(`
<h3>Fiscalização do moto-frete</h3>
<ul><li>Transporte remunerado de mercadorias em desacordo com o art. 139-A: art. 244, IX, <b>média</b>, retenção.</li><li>Carga incompatível com as especificações: art. 244, VIII, média, retenção.</li><li>Moto sem capacete, transportando passageiro sem capacete ou fazendo malabarismo: <b>gravíssima</b> com suspensão (art. 244, I a III).</li><li>Mototaxista e motoboy seguem também as normas municipais (art. 139-B).</li></ul>
${peg('As infrações específicas do moto-frete são <b>médias</b>; as de segurança do art. 244, I a III, são <b>gravíssimas</b> com suspensão.')}`),
    quiz: [C('Fazer transporte remunerado de mercadorias em motocicleta em desacordo com o art. 139-A é infração média.', 'Art. 244, IX.')],
  },
  habilitacao: {
    html: A(`
<h3>O caminho até a CNH</h3>
<table class="tab"><tr><th>Etapa</th><th>O que é</th></tr>
<tr><td>Exame de aptidão física e mental</td><td>médico de trânsito</td></tr>
<tr><td>Avaliação psicológica</td><td>na primeira habilitação; e para quem exerce atividade remunerada (EAR)</td></tr>
<tr><td>Curso teórico e exame escrito</td><td>legislação, direção defensiva, primeiros socorros, meio ambiente, cidadania</td></tr>
<tr><td>Curso prático e exame de direção</td><td>em via pública, com veículo da categoria pretendida</td></tr>
<tr><td>Permissão para Dirigir</td><td>1 ano; depois, CNH definitiva se não houver grave, gravíssima ou reincidência em média</td></tr></table>
<h3>Mudança de categoria (adição e evolução)</h3>
<ul><li>Para <b>D</b>: 2 anos na B ou 1 ano na C; para <b>E</b>: 1 ano na C; mais de 21 anos; curso específico.</li><li>Quem tem <b>A</b> e quer <b>B</b> (ou o contrário) faz a <b>adição</b> de categoria.</li><li>A categoria superior permite dirigir as inferiores, exceto a <b>A</b>: quem tem D não dirige moto se não tiver A.</li></ul>
<h3>Validade e renovação</h3>
<ul><li>Validade conforme o exame médico: <b>10 anos</b> (menos de 50), <b>5 anos</b> (50 a 69) e <b>3 anos</b> (70 ou mais).</li><li>Dirigir com CNH vencida há <b>mais de 30 dias</b>: art. 162, V, gravíssima, retenção.</li><li>Exame <b>toxicológico</b> para C, D e E: na habilitação, na renovação e periodicamente.</li></ul>
<h3>Estrangeiros</h3>
<p>O reconhecimento da habilitação obtida em outro país segue as <b>convenções e acordos internacionais</b> e as normas do Contran (art. 142).</p>
${ex('<p>Motorista com CNH B há 1 ano quer tirar D para dirigir ônibus. Ainda não pode: para D, precisa de pelo menos <b>2 anos na B</b> (ou 1 na C) e mais de 21 anos.</p>', 'Caso prático')}
${peg('Categoria <b>superior</b> não abrange a <b>A</b>. Ter CNH “E” não autoriza pilotar moto.')}`),
    quiz: [C('Para habilitar-se na categoria D, o condutor deve estar habilitado há pelo menos dois anos na categoria B ou um ano na categoria C.', 'Art. 145.'), E('O condutor habilitado na categoria E pode conduzir motocicleta, por ser categoria superior.', 'A categoria A não é abrangida pelas demais.'), C('A avaliação psicológica é exigida na primeira habilitação e para quem exerce atividade remunerada ao veículo.', 'Art. 147.')],
  },
};
