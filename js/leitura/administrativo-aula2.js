// Direito Administrativo — aula completa (parte 2): serviços, bens e intervenção, responsabilidade, controle, improbidade e processo.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, banca, C, E } from './blocos.js';

const A = (t) => `<h3 class="lt-aula">📚 Aula completa</h3>${t}`;

export const AULA2 = {
  'servicos-publicos': {
    html: A(`
<h3>O ponto de partida: art. 175 da CF</h3>
<p>Incumbe ao <b>Poder Público</b>, na forma da lei, prestar serviços públicos <b>diretamente</b> ou sob regime de <b>concessão ou permissão</b>, <b>sempre através de licitação</b>. O Estado continua <b>titular</b>; o particular só executa.</p>
<h3>Serviço adequado (Lei 8.987, art. 6º, §1º)</h3>
<p>É o que satisfaz as condições de <b>regularidade, continuidade, eficiência, segurança, atualidade, generalidade, cortesia</b> na prestação e <b>modicidade das tarifas</b>.</p>
${dica('“<b>RE-CO-EF-SE-A-GE-COR-MO</b>”: REgularidade, COntinuidade, EFiciência, SEgurança, Atualidade, GEneralidade, CORtesia, MOdicidade.')}
${box('Quando a interrupção NÃO fere a continuidade (art. 6º, §3º)', '<ul><li>em situação de <b>emergência</b>, sem aviso;</li><li>após <b>aviso prévio</b>, por razões de ordem técnica ou de segurança das instalações;</li><li>após aviso prévio, por <b>inadimplemento do usuário</b>, considerado o interesse da coletividade.</li></ul>A interrupção por falta de pagamento não pode começar na sexta-feira, no sábado, no domingo, em feriado ou no dia anterior a feriado (§4º).')}
<h3>Concessão × permissão</h3>
<table class="tab"><tr><th></th><th>Concessão</th><th>Permissão</th></tr>
<tr><td>Natureza</td><td>contrato</td><td>contrato de <b>adesão</b>, precário e revogável</td></tr>
<tr><td>Quem pode receber</td><td><b>pessoa jurídica</b> ou consórcio de empresas</td><td>pessoa <b>física ou jurídica</b></td></tr>
<tr><td>Licitação</td><td>concorrência ou diálogo competitivo</td><td>qualquer modalidade compatível</td></tr>
<tr><td>Prazo</td><td>determinado</td><td>em regra, sem garantia de prazo</td></tr></table>
<h3>Formas de extinção da concessão (art. 35)</h3>
<table class="tab"><tr><th>Forma</th><th>Causa</th><th>Detalhe que a banca cobra</th></tr>
<tr><td><b>Advento do termo</b></td><td>fim do prazo</td><td>forma natural</td></tr>
<tr><td><b>Encampação</b></td><td><b>interesse público</b></td><td>exige <b>lei autorizativa específica</b> e <b>indenização prévia</b></td></tr>
<tr><td><b>Caducidade</b></td><td><b>inadimplência</b> da concessionária</td><td>declarada por <b>decreto</b>, após processo administrativo; indenização <b>posterior</b>, descontadas multas e danos</td></tr>
<tr><td><b>Rescisão</b></td><td>inadimplência do <b>poder concedente</b></td><td>iniciativa da concessionária, por <b>ação judicial</b>; o serviço não para até o trânsito em julgado</td></tr>
<tr><td><b>Anulação</b></td><td>ilegalidade</td><td>—</td></tr>
<tr><td><b>Falência</b> ou extinção da empresa</td><td>—</td><td>—</td></tr></table>
${dica('<b>EN</b>campação = <b>EN</b>tendeu que não interessa mais (interesse público). <b>CA</b>ducidade = <b>CA</b>lote da concessionária.')}
<p>Com a extinção, ocorre a <b>reversão</b> dos bens vinculados ao serviço para o poder concedente, com indenização das parcelas ainda não amortizadas.</p>
<h3>Parcerias público-privadas (Lei 11.079/2004)</h3>
${cartoes([['🚌', 'PPP patrocinada', 'tarifa paga pelo usuário + contraprestação pecuniária do parceiro público', COR.azul], ['🏫', 'PPP administrativa', 'a Administração é a usuária direta ou indireta (ex.: presídio, hospital)', COR.verde]])}
${box('Vedações da PPP (art. 2º, §4º)', '<ul><li>contrato de valor inferior a <b>R$ 10 milhões</b>;</li><li>prazo inferior a <b>5 anos</b> (o máximo é <b>35 anos</b>, incluindo prorrogações);</li><li>objeto <b>único</b> de fornecimento de mão de obra, de fornecimento e instalação de equipamentos ou de execução de obra pública.</li></ul>Antes de celebrar o contrato, é obrigatória a constituição de uma <b>sociedade de propósito específico</b> (SPE).')}
<h3>Responsabilidade das concessionárias</h3>
<p>É <b>objetiva</b> (CF, art. 37, §6º), tanto perante <b>usuários</b> quanto perante <b>não usuários</b> do serviço (STF, RE 591.874). Exemplo: o ônibus da concessionária atropela um pedestre — responde objetivamente, mesmo que o pedestre não fosse passageiro.</p>
<h3>Classificações rápidas</h3>
<ul><li><b>Uti universi</b> (gerais): prestados à coletividade, sem usuário identificável (iluminação pública, segurança); custeados por impostos.</li><li><b>Uti singuli</b> (individuais): usuário determinado e uso mensurável (água, energia, telefonia); remunerados por taxa ou tarifa.</li></ul>
${peg('<b>Encampação</b> não é punição: a concessionária não errou, o poder público é que mudou de ideia. Por isso a indenização é <b>prévia</b>. Na <b>caducidade</b>, quem errou foi a concessionária, e a indenização vem depois.')}`),
    quiz: [
      C('A encampação depende de lei autorizativa específica e de prévio pagamento de indenização.', 'Lei 8.987, art. 37.'),
      E('A caducidade é a extinção da concessão por iniciativa da concessionária, em razão de inadimplemento do poder concedente.', 'Isso é rescisão; caducidade decorre da inadimplência da concessionária.'),
      C('É vedada a celebração de PPP cujo valor seja inferior a R$ 10 milhões.', 'Lei 11.079, art. 2º, §4º, I.'),
      E('A permissão de serviço público só pode ser outorgada a pessoa jurídica.', 'Pode ser a pessoa física ou jurídica.'),
      C('A responsabilidade objetiva da concessionária alcança também os terceiros não usuários do serviço.', 'STF, RE 591.874.'),
    ],
  },

  'bens-intervencao': {
    html: A(`
<h3>Bens públicos: as três categorias (CC, art. 99)</h3>
${cartoes([['🛣', 'Uso comum do povo', 'rios, mares, estradas, ruas e praças', COR.verde], ['🏢', 'Uso especial', 'edifícios ou terrenos destinados a serviço ou estabelecimento da Administração (prefeitura, escola)', COR.azul], ['📦', 'Dominicais', 'patrimônio disponível, sem destinação pública (terreno vazio do Município)', COR.cinza]])}
<p>Os dois primeiros são <b>afetados</b> (têm destinação pública) e, por isso, <b>inalienáveis enquanto conservarem essa qualificação</b> (art. 100). Os dominicais são <b>desafetados</b> e podem ser alienados, observadas as exigências da lei (art. 101): em regra, interesse público justificado, avaliação prévia, licitação e, para imóveis, autorização legislativa.</p>
<h3>O regime jurídico dos bens públicos</h3>
<ul><li><b>Alienabilidade condicionada</b>: só os desafetados, com os requisitos legais.</li><li><b>Imprescritibilidade</b>: não podem ser adquiridos por usucapião (CF, arts. 183, §3º, e 191, parágrafo único; CC, art. 102). Vale também para os <b>dominicais</b>.</li><li><b>Impenhorabilidade</b>: as dívidas judiciais do Estado são pagas por <b>precatórios</b> ou RPV (CF, art. 100), e não por penhora.</li><li><b>Não onerabilidade</b>: não podem ser dados em garantia (hipoteca, penhor).</li></ul>
${box('Bens de empresas estatais', 'São, em regra, <b>privados</b>. Mas os bens de estatais <b>prestadoras de serviço público</b> e afetados a esse serviço recebem proteção especial. Os Correios, por exemplo, têm bens impenhoráveis e pagam por precatório (STF, RE 220.906).')}
<h3>Uso privativo de bem público por particular</h3>
<table class="tab"><tr><th>Instrumento</th><th>Natureza</th><th>Exemplo</th></tr>
<tr><td><b>Autorização de uso</b></td><td>ato unilateral, discricionário e precário; interesse predominante do particular</td><td>fechar a rua para uma festa junina</td></tr>
<tr><td><b>Permissão de uso</b></td><td>ato unilateral, discricionário e precário; interesse do particular e da coletividade</td><td>banca de jornal na calçada</td></tr>
<tr><td><b>Concessão de uso</b></td><td><b>contrato</b>, com prazo, em regra precedido de licitação</td><td>restaurante dentro do mercado municipal</td></tr></table>
<h3>Intervenção restritiva: o Estado limita, mas o dono continua dono</h3>
<table class="tab"><tr><th>Instituto</th><th>Característica</th><th>Indenização</th></tr>
<tr><td><b>Limitação administrativa</b></td><td>geral, abstrata, atinge proprietários indeterminados (recuo obrigatório, altura máxima)</td><td>em regra, <b>não</b></td></tr>
<tr><td><b>Servidão administrativa</b></td><td><b>direito real</b> sobre imóvel determinado (passagem de linha de transmissão, placas)</td><td>só se houver prejuízo</td></tr>
<tr><td><b>Requisição</b></td><td>uso de bens ou serviços em <b>iminente perigo público</b> (CF, art. 5º, XXV)</td><td><b>ulterior</b>, se houver dano</td></tr>
<tr><td><b>Ocupação temporária</b></td><td>uso transitório de terreno não edificado, vizinho a obra pública</td><td>conforme o caso</td></tr>
<tr><td><b>Tombamento</b></td><td>preserva patrimônio histórico, artístico ou cultural (DL 25/1937)</td><td>em regra, não</td></tr></table>
<h3>Intervenção supressiva: a desapropriação</h3>
<table class="tab"><tr><th>Espécie</th><th>Fundamento</th><th>Indenização</th></tr>
<tr><td>Comum: necessidade ou utilidade pública, ou interesse social</td><td>CF, art. 5º, XXIV; DL 3.365/1941; Lei 4.132/1962</td><td><b>prévia, justa e em dinheiro</b></td></tr>
<tr><td>Urbanística (sancionatória)</td><td>art. 182, §4º, III: imóvel urbano não edificado, subutilizado ou não utilizado</td><td><b>títulos da dívida pública</b>, resgate em até 10 anos</td></tr>
<tr><td>Rural para reforma agrária</td><td>art. 184: imóvel rural que não cumpre a função social (competência da <b>União</b>)</td><td><b>títulos da dívida agrária</b>, resgate em até 20 anos; benfeitorias úteis e necessárias em dinheiro</td></tr>
<tr><td>Confiscatória (expropriação)</td><td>art. 243: cultivo ilegal de plantas psicotrópicas ou exploração de trabalho escravo</td><td><b>nenhuma</b></td></tr></table>
${passos([['Fase declaratória', 'decreto declara o bem de utilidade pública ou interesse social; permite às autoridades entrar no imóvel'], ['Fase executória', 'acordo (via administrativa) ou ação de desapropriação (via judicial)'], ['Imissão provisória', 'na posse, se houver urgência declarada e depósito do valor']])}
<p><b>Caducidade do decreto</b>: <b>5 anos</b> nas desapropriações por necessidade ou utilidade pública; <b>2 anos</b> nas por interesse social. Na ação judicial, a contestação só pode tratar de <b>vício do processo</b> ou de <b>impugnação do preço</b> (DL 3.365, art. 20); qualquer outra questão vai para ação própria.</p>
${box('Conceitos que caem', '<ul><li><b>Desapropriação indireta</b>: o Estado se apossa do bem sem o devido processo; o dono pede indenização.</li><li><b>Tredestinação</b>: dar ao bem destino diverso do previsto. É <b>lícita</b> se mantém o interesse público (troca escola por hospital) e <b>ilícita</b> se não mantém, o que gera o direito de <b>retrocessão</b>.</li><li><b>Direito de extensão</b>: o dono pede que a desapropriação abranja a parte remanescente que ficou inútil.</li></ul>')}
${peg('A desapropriação por interesse social para reforma agrária é privativa da <b>União</b>. Mas Estados e <b>Municípios</b> também podem desapropriar por interesse social para outros fins, pagando em dinheiro.')}`),
    quiz: [
      C('Os bens públicos dominicais também não podem ser adquiridos por usucapião.', 'Imprescritibilidade alcança todos os bens públicos.'),
      E('Na requisição administrativa, a indenização é sempre prévia.', 'É ulterior, e só se houver dano.'),
      C('A expropriação de propriedades com cultivo ilegal de plantas psicotrópicas não gera indenização ao proprietário.', 'CF, art. 243.'),
      E('A limitação administrativa incide sobre imóvel determinado e gera, como regra, direito à indenização.', 'É geral e, em regra, não indenizável.'),
      C('A tredestinação ilícita pode gerar direito de retrocessão ao antigo proprietário.', 'Destino sem interesse público.'),
    ],
  },

  responsabilidade: {
    html: A(`
<h3>A evolução em três tempos</h3>
${passos([['Irresponsabilidade', '“o rei não erra” (Estado absolutista)'], ['Responsabilidade subjetiva', 'primeiro com culpa do agente; depois culpa do serviço (faute du service): o serviço não funcionou, funcionou mal ou atrasou'], ['Responsabilidade objetiva', 'teoria do risco administrativo: basta conduta + dano + nexo causal']])}
<h3>O art. 37, §6º, palavra por palavra</h3>
<p>“As pessoas jurídicas de <b>direito público</b> e as de <b>direito privado prestadoras de serviços públicos</b> responderão pelos danos que seus agentes, <b>nessa qualidade</b>, causarem a terceiros, assegurado o direito de <b>regresso</b> contra o responsável nos casos de <b>dolo ou culpa</b>.”</p>
<ul><li><b>Quem responde objetivamente</b>: União, Estados, Municípios, autarquias, fundações públicas e qualquer prestadora de serviço público (inclusive concessionárias privadas). Estatais que exploram <b>atividade econômica</b> respondem pelo regime do direito privado.</li><li><b>“Nessa qualidade”</b>: o agente precisa estar agindo como agente, ainda que fora do expediente (policial de folga que usa a arma da corporação).</li><li><b>Regresso</b>: contra o agente, só com <b>dolo ou culpa</b> (responsabilidade subjetiva do agente).</li></ul>
${box('Dupla garantia (STF, Tema 940)', 'A vítima deve processar o <b>Estado</b> ou a prestadora de serviço público, e <b>não</b> diretamente o agente. O agente só responde perante a própria Administração, em ação regressiva.')}
<h3>Risco administrativo × risco integral</h3>
<table class="tab"><tr><th>Risco administrativo (regra)</th><th>Risco integral (exceção)</th></tr>
<tr><td>admite <b>excludentes</b>: culpa exclusiva da vítima, caso fortuito ou força maior, fato exclusivo de terceiro</td><td><b>não</b> admite excludentes</td></tr>
<tr><td>culpa concorrente da vítima <b>reduz</b> a indenização</td><td>—</td></tr>
<tr><td>a maioria dos casos</td><td>dano <b>nuclear</b> (CF, art. 21, XXIII, d), dano <b>ambiental</b> e atentados terroristas ou atos de guerra contra aeronaves de empresas brasileiras (Lei 10.744/2003)</td></tr></table>
<h3>E na omissão?</h3>
<p>A doutrina tradicional aplica a responsabilidade <b>subjetiva</b> (culpa do serviço) às omissões genéricas. O STF tem aplicado a responsabilidade <b>objetiva</b> quando o Estado tinha um <b>dever específico</b> de agir e não agiu.</p>
${cartoes([['🔒', 'Morte de detento (Tema 592)', 'o Estado responde quando descumpre seu dever específico de proteção do preso', COR.verm], ['🏃', 'Crime de foragido (Tema 362)', 'o Estado só responde se houver nexo causal direto entre a fuga e o crime', COR.lar], ['🏫', 'Aluno agredido na escola', 'dever de guarda: responsabilidade objetiva', COR.azul]])}
${ex('Um buraco não sinalizado na rua de Belo Vale causa a queda de um motociclista. A doutrina diria: omissão, culpa do serviço (falta de manutenção). Na prática, o Município responde e a discussão gira em torno do nexo causal e de eventual culpa concorrente (a moto estava em alta velocidade?).')}
<h3>Atos legislativos e judiciais</h3>
<ul><li><b>Leis</b>: em regra, não geram responsabilidade. Exceções: lei declarada inconstitucional que causou dano e <b>leis de efeitos concretos</b>.</li><li><b>Atos judiciais</b>: em regra, não. Exceção expressa: <b>erro judiciário</b> e prisão além do tempo fixado na sentença (CF, art. 5º, LXXV).</li></ul>
<h3>Prazos</h3>
<ul><li>Ação de indenização contra a Fazenda Pública: <b>5 anos</b> (Decreto 20.910/1932, segundo o STJ).</li><li>Ressarcimento ao erário por <b>ilícito civil</b>: <b>prescritível</b> (STF, Tema 666).</li><li>Ressarcimento por ato <b>doloso de improbidade</b>: <b>imprescritível</b> (STF, Tema 897).</li></ul>
${banca('Questões típicas: “a responsabilidade objetiva dispensa a prova do dano” (errado: dispensa a prova da <b>culpa</b>); “o agente responde objetivamente na ação regressiva” (errado: subjetivamente); “a vítima pode escolher processar só o agente” (errado, pelo Tema 940).')}
${peg('Responsabilidade <b>objetiva</b> não é responsabilidade <b>automática</b>: continua sendo preciso provar o <b>dano</b> e o <b>nexo causal</b>. O que se dispensa é a prova de culpa.')}`),
    quiz: [
      C('A teoria do risco administrativo admite excludentes como a culpa exclusiva da vítima.', 'Diferente do risco integral.'),
      E('Segundo o STF, a vítima pode ajuizar a ação de indenização diretamente contra o agente público causador do dano.', 'Tema 940: dupla garantia.'),
      C('A responsabilidade por dano nuclear adota a teoria do risco integral.', 'CF, art. 21, XXIII, d.'),
      E('Na ação regressiva, a responsabilidade do agente público é objetiva.', 'Exige dolo ou culpa.'),
      C('São imprescritíveis as ações de ressarcimento ao erário fundadas em ato doloso de improbidade.', 'STF, Tema 897.'),
    ],
  },

  controle: {
    html: A(`
<h3>Classificações do controle</h3>
<table class="tab"><tr><th>Critério</th><th>Espécies</th></tr>
<tr><td>Órgão que controla</td><td>administrativo, legislativo, judicial</td></tr>
<tr><td>Posição</td><td><b>interno</b> (dentro do mesmo Poder) ou <b>externo</b> (um Poder sobre outro)</td></tr>
<tr><td>Momento</td><td>prévio, concomitante ou posterior</td></tr>
<tr><td>Aspecto</td><td>de <b>legalidade</b> ou de <b>mérito</b></td></tr>
<tr><td>Iniciativa</td><td>de ofício ou provocado</td></tr></table>
<h3>Controle administrativo</h3>
<ul><li><b>Autotutela</b>: anula atos ilegais e revoga inconvenientes (Súmula 473 do STF).</li><li><b>Hierárquico</b>: dentro da mesma pessoa jurídica.</li><li><b>Tutela ou supervisão ministerial</b>: sobre as entidades da Administração indireta; é controle <b>finalístico</b>, limitado ao que a lei prevê, <b>sem hierarquia</b>.</li><li><b>Recurso hierárquico próprio</b> (para o superior no mesmo órgão) × <b>impróprio</b> (para autoridade de outra pessoa jurídica, só quando a lei prevê).</li></ul>
<h3>Controle legislativo</h3>
<ul><li><b>Sustar atos normativos</b> do Executivo que exorbitem o poder regulamentar (CF, art. 49, V).</li><li><b>Convocar ministros</b> e pedir informações (art. 50).</li><li><b>CPI</b> (art. 58, §3º): requerimento de <b>1/3</b> dos membros, <b>fato determinado</b> e <b>prazo certo</b>. Tem poderes de investigação de autoridade judicial: quebra de sigilo bancário, fiscal e de dados, convocação de testemunhas. <b>Não pode</b> (reserva de jurisdição): decretar prisão, salvo flagrante; determinar interceptação telefônica; busca e apreensão domiciliar; indisponibilidade de bens.</li></ul>
<h3>Tribunal de Contas (CF, arts. 70 a 75)</h3>
${box('Competências do TCU que mais caem (art. 71)', '<ol><li><b>Apreciar</b> as contas anuais do Presidente, com <b>parecer prévio</b> em 60 dias. Quem <b>julga</b> é o Congresso.</li><li><b>Julgar</b> as contas dos demais administradores e responsáveis por dinheiro público.</li><li>Apreciar, <b>para fins de registro</b>, a legalidade das admissões de pessoal (exceto cargos em comissão) e das aposentadorias, reformas e pensões.</li><li>Aplicar <b>sanções</b>; suas decisões que imputem débito ou multa têm eficácia de <b>título executivo</b> (§3º).</li><li><b>Sustar</b> atos ilegais, se não atendido. Quanto a <b>contratos</b>, a sustação é do <b>Congresso</b>; se ele não decidir em 90 dias, o TCU decide (§§1º e 2º).</li></ol>')}
${cartoes([['📄', 'Ato', 'o próprio Tribunal de Contas susta, se a ilegalidade não for corrigida', COR.azul], ['🤝', 'Contrato', 'quem susta é o Legislativo; o TC só atua se ele ficar inerte por 90 dias', COR.roxo]])}
${box('Contraditório no TCU (SV 3)', 'Nos processos perante o TCU, asseguram-se o contraditório e a ampla defesa quando a decisão puder resultar em anulação ou revogação de ato que beneficie o interessado, <b>exceto</b> na apreciação da legalidade do ato de <b>concessão inicial</b> de aposentadoria, reforma e pensão. Pelo Tema 445 do STF, o Tribunal de Contas tem <b>5 anos</b>, contados da chegada do processo, para julgar essa legalidade; depois disso, o ato se torna definitivo.')}
<h3>E no Município?</h3>
<ul><li>A fiscalização do Município é feita pela <b>Câmara Municipal</b> (controle externo), com auxílio do <b>Tribunal de Contas do Estado</b> (em Minas Gerais, o TCE-MG) e pelo controle interno do Executivo (CF, art. 31).</li><li>O <b>parecer prévio</b> do Tribunal de Contas sobre as contas do prefeito só deixa de prevalecer por decisão de <b>2/3</b> dos vereadores.</li><li>As contas ficam <b>60 dias</b> por ano à disposição de qualquer contribuinte, que pode questionar sua legitimidade.</li><li>É <b>vedada a criação</b> de novos Tribunais ou Conselhos de Contas municipais (art. 31, §4º). Só existem os de São Paulo e do Rio de Janeiro.</li><li>Para fins de inelegibilidade, quem julga as contas do prefeito, <b>de governo e de gestão</b>, é a <b>Câmara</b> (STF, RE 848.826).</li></ul>
<h3>Controle judicial</h3>
<p>Alcança a <b>legalidade</b> em sentido amplo, incluindo razoabilidade, proporcionalidade e motivos determinantes. <b>Não</b> substitui o juízo de mérito do administrador. Instrumentos: mandado de segurança, ação popular (qualquer cidadão), ação civil pública, habeas data, mandado de injunção e ação de improbidade.</p>
${peg('O Tribunal de Contas é órgão <b>auxiliar</b> do Legislativo, mas <b>não é subordinado</b> a ele. Suas decisões são administrativas, e não judiciais: podem ser revistas pelo Judiciário.')}`),
    quiz: [
      C('No caso de contrato, o ato de sustação é adotado diretamente pelo Congresso Nacional, e o TCU decide se este não agir em 90 dias.', 'CF, art. 71, §§1º e 2º.'),
      E('As CPIs podem determinar interceptação telefônica dos investigados.', 'Reserva de jurisdição.'),
      C('O parecer prévio do Tribunal de Contas sobre as contas do prefeito só deixa de prevalecer por decisão de dois terços da Câmara Municipal.', 'CF, art. 31, §2º.'),
      E('A Constituição permite que os Municípios criem seus próprios Tribunais de Contas.', 'Art. 31, §4º veda a criação.'),
      C('As decisões do Tribunal de Contas de que resulte imputação de débito ou multa têm eficácia de título executivo.', 'CF, art. 71, §3º.'),
    ],
  },

  improbidade: {
    html: A(`
<h3>A grande mudança de 2021</h3>
<p>A Lei 14.230/2021 reescreveu a Lei 8.429/1992. Hoje <b>só existe improbidade dolosa</b>: a modalidade culposa foi extinta. O dolo exigido é a <b>vontade livre e consciente de alcançar o resultado ilícito</b>; não basta a voluntariedade do agente, e mero exercício da função ou divergência na interpretação da lei não configura improbidade.</p>
<h3>As três espécies</h3>
<table class="tab"><tr><th>Espécie</th><th>Núcleo</th><th>Exemplos</th></tr>
<tr><td><b>Art. 9º</b>: enriquecimento ilícito</td><td>o agente obtém vantagem patrimonial indevida</td><td>receber propina; usar carro oficial em proveito próprio; patrimônio incompatível com a renda</td></tr>
<tr><td><b>Art. 10</b>: lesão ao erário</td><td>perda patrimonial <b>efetiva e comprovada</b></td><td>frustrar a licitação; permitir aquisição por preço superior ao de mercado</td></tr>
<tr><td><b>Art. 11</b>: violação de princípios</td><td>rol <b>taxativo</b> de condutas</td><td>revelar segredo funcional; frustrar concurso público; nepotismo; deixar de prestar contas</td></tr></table>
<h3>Sanções (art. 12)</h3>
<table class="tab"><tr><th></th><th>Art. 9º</th><th>Art. 10</th><th>Art. 11</th></tr>
<tr><td>Suspensão dos direitos políticos</td><td>até <b>14 anos</b></td><td>até <b>12 anos</b></td><td><b>não há</b></td></tr>
<tr><td>Proibição de contratar com o poder público</td><td>até 14 anos</td><td>até 12 anos</td><td>até 4 anos</td></tr>
<tr><td>Multa civil</td><td>equivalente ao valor do acréscimo</td><td>equivalente ao valor do dano</td><td>até 24 vezes a remuneração</td></tr>
<tr><td>Perda da função</td><td>sim</td><td>sim</td><td><b>não há</b></td></tr></table>
${dica('Dos mais graves para os menos graves: <b>14, 12, 0</b> anos de suspensão de direitos políticos.')}
<p>A perda da função pública e a suspensão dos direitos políticos só se efetivam com o <b>trânsito em julgado</b> da sentença (art. 20).</p>
<h3>Processo</h3>
<ul><li><b>Legitimidade</b>: Ministério Público e a <b>pessoa jurídica interessada</b> (o STF restabeleceu a legitimidade do ente lesado nas ADIs 7.042 e 7.043).</li><li><b>Indisponibilidade de bens</b>: exige demonstração de <b>perigo de dano</b> ou risco ao resultado útil do processo.</li><li><b>Acordo de não persecução civil</b> (art. 17-B): possível, com ressarcimento integral do dano e reversão da vantagem indevida.</li><li><b>Prescrição</b>: <b>8 anos</b> contados do fato (ou do dia em que cessou a permanência); prescrição intercorrente de <b>4 anos</b> após o ajuizamento.</li></ul>
${box('STF, Tema 1.199', '<ul><li>É necessário <b>dolo</b> para tipificar improbidade nos arts. 9º, 10 e 11.</li><li>A revogação da modalidade <b>culposa</b> se aplica aos atos praticados antes da lei <b>sem condenação transitada em julgado</b>.</li><li>O novo regime de <b>prescrição</b> é <b>irretroativo</b>: os novos prazos contam a partir da publicação da lei (26/10/2021).</li></ul>')}
<h3>Lei Anticorrupção (Lei 12.846/2013): a empresa responde</h3>
<ul><li>Responsabilidade <b>objetiva</b>, administrativa e civil, da <b>pessoa jurídica</b> por atos lesivos à Administração; não exclui a responsabilidade dos dirigentes, que é subjetiva.</li><li><b>Processo administrativo de responsabilização</b> (PAR): multa de <b>0,1% a 20%</b> do faturamento bruto do exercício anterior e <b>publicação extraordinária</b> da decisão.</li><li><b>Via judicial</b>: perdimento de bens, suspensão de atividades, <b>dissolução compulsória</b> e proibição de receber incentivos por 1 a 5 anos.</li><li><b>Acordo de leniência</b>: a empresa precisa ser a primeira a se manifestar, cessar a conduta, admitir a participação e cooperar. Benefícios: redução da multa em até <b>2/3</b> e isenção da publicação extraordinária e da proibição de receber incentivos. <b>Não</b> exime da reparação integral do dano.</li><li>Prescrição: <b>5 anos</b> da ciência da infração.</li></ul>
${peg('Na improbidade, a responsabilidade é <b>subjetiva</b> (dolo). Na Lei Anticorrupção, a responsabilidade da <b>empresa</b> é <b>objetiva</b>. A banca troca as duas.')}`),
    quiz: [
      C('Após a Lei 14.230/2021, todas as modalidades de improbidade administrativa exigem dolo.', 'Extinta a modalidade culposa.'),
      E('A condenação por ato de improbidade que atenta contra os princípios da Administração pode levar à suspensão dos direitos políticos por até 4 anos.', 'No art. 11 não há suspensão de direitos políticos.'),
      C('A ação de improbidade prescreve em 8 anos, contados da ocorrência do fato.', 'Art. 23 da Lei 8.429.'),
      E('O acordo de leniência da Lei Anticorrupção isenta a empresa da obrigação de reparar integralmente o dano.', 'A reparação integral continua obrigatória.'),
      C('Segundo o STF, o novo regime prescricional da Lei de Improbidade é irretroativo.', 'Tema 1.199.'),
    ],
  },

  'processo-adm': {
    html: A(`
<h3>Lei 9.784/1999: a quem se aplica</h3>
<p>Ao processo administrativo da <b>Administração federal</b> direta e indireta, e aos Poderes Legislativo e Judiciário federais quando exercem função administrativa. Estados e Municípios podem ter leis próprias; na falta delas, o STJ admite aplicar a lei federal de forma <b>subsidiária</b> (Súmula 633). Processos com lei específica (como o PAD da Lei 8.112) seguem a sua lei, e a 9.784 se aplica subsidiariamente.</p>
<h3>Direitos do administrado (art. 3º)</h3>
<ul><li>ser tratado com respeito; ter ciência da tramitação, vista dos autos e obter cópias;</li><li>formular alegações e apresentar documentos antes da decisão;</li><li>fazer-se assistir, <b>facultativamente</b>, por advogado, salvo quando a lei exigir.</li></ul>
<h3>Os prazos que a banca adora</h3>
<table class="tab"><tr><th>Ato</th><th>Prazo</th></tr>
<tr><td>Intimação para comparecimento</td><td>antecedência mínima de <b>3 dias úteis</b></td></tr>
<tr><td>Prática de atos em geral (sem prazo específico)</td><td><b>5 dias</b>, prorrogáveis até o dobro</td></tr>
<tr><td>Decisão após concluída a instrução</td><td><b>30 dias</b>, prorrogáveis por igual período, motivadamente</td></tr>
<tr><td>Interposição de recurso</td><td><b>10 dias</b></td></tr>
<tr><td>Reconsideração pela autoridade recorrida</td><td><b>5 dias</b>; se não reconsiderar, encaminha à superior</td></tr>
<tr><td>Decisão do recurso</td><td><b>30 dias</b>, prorrogáveis por igual período</td></tr>
<tr><td>Anular atos favoráveis ao administrado</td><td><b>5 anos</b>, salvo má-fé</td></tr></table>
${dica('Lembre a sequência <b>3 – 5 – 10 – 30</b>: 3 dias úteis para intimar, 5 para reconsiderar, 10 para recorrer, 30 para decidir.')}
<h3>Recurso e revisão</h3>
${cartoes([['🔁', 'Recurso (arts. 56 a 64)', 'razões de legalidade e de mérito; no máximo 3 instâncias; em regra sem efeito suspensivo; pode haver reformatio in pejus, com ciência prévia ao recorrente', COR.azul], ['🔍', 'Revisão (art. 65)', 'processos que resultem em sanção; a qualquer tempo; exige fatos novos ou circunstâncias relevantes; NÃO pode agravar a sanção', COR.verde]])}
<p>O recurso independe de <b>caução</b>, salvo exigência legal; e a exigência de depósito prévio como condição de admissibilidade é inconstitucional (<b>Súmula Vinculante 21</b>).</p>
<h3>Impedimento × suspeição</h3>
<table class="tab"><tr><th>Impedimento (art. 18): presunção absoluta</th><th>Suspeição (art. 20): presunção relativa</th></tr>
<tr><td>tem interesse direto ou indireto na matéria; participou ou vai participar como perito, testemunha ou representante; está litigando com o interessado ou seu cônjuge</td><td><b>amizade íntima ou inimizade notória</b> com algum interessado ou com parentes até o 3º grau</td></tr>
<tr><td>a autoridade <b>deve</b> comunicar; omitir é falta grave</td><td>pode ser <b>arguida</b> pelo interessado</td></tr></table>
<h3>Lei de Acesso à Informação (Lei 12.527/2011)</h3>
<ul><li>Qualquer interessado pode pedir, <b>sem precisar dizer por quê</b>.</li><li>Resposta imediata ou em até <b>20 dias</b>, prorrogáveis por mais <b>10</b>, com justificativa. Recurso em <b>10 dias</b>.</li><li>Sigilo por classificação: <b>ultrassecreta 25 anos</b>, <b>secreta 15</b>, <b>reservada 5</b>. Informações <b>pessoais</b> relativas à intimidade: acesso restrito por até <b>100 anos</b>.</li><li><b>Transparência ativa</b>: os órgãos devem divulgar informações na internet independentemente de pedido. Municípios com até <b>10 mil habitantes</b> ficam dispensados dessa divulgação obrigatória na internet, mas continuam obrigados a divulgar em tempo real a execução orçamentária e financeira.</li></ul>
${dica('Sigilo: <b>25 – 15 – 5</b> (ultrassecreta, secreta, reservada).')}
<h3>LGPD (Lei 13.709/2018) no setor público</h3>
<ul><li><b>Dado pessoal</b>: informação sobre pessoa natural identificada ou identificável. <b>Dado sensível</b>: origem racial ou étnica, convicção religiosa, opinião política, filiação sindical, saúde, vida sexual, dado genético ou biométrico.</li><li>O poder público pode tratar dados sem consentimento para executar <b>políticas públicas</b> e cumprir suas competências legais (arts. 7º, III, e 23), informando as hipóteses de tratamento.</li><li>Agentes de tratamento: <b>controlador</b> (decide) e <b>operador</b> (executa); <b>encarregado</b> é o canal com os titulares e com a ANPD.</li></ul>
${peg('No recurso administrativo pode haver <b>reformatio in pejus</b> (agravar a situação do recorrente), desde que ele seja avisado para se manifestar antes. Na <b>revisão</b>, nunca.')}`),
    quiz: [
      C('O prazo para interposição de recurso administrativo, salvo disposição legal específica, é de dez dias.', 'Lei 9.784, art. 59.'),
      E('Da revisão do processo administrativo poderá resultar agravamento da sanção.', 'Art. 65, parágrafo único: vedado.'),
      C('É inconstitucional a exigência de depósito prévio como requisito de admissibilidade de recurso administrativo.', 'SV 21.'),
      E('A amizade íntima com o interessado é causa de impedimento da autoridade no processo administrativo.', 'É causa de suspeição (art. 20).'),
      C('Pela LAI, a informação classificada como ultrassecreta tem prazo máximo de restrição de 25 anos.', 'Art. 24, §1º, I.'),
    ],
  },
};
