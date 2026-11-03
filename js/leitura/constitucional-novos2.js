// Direito Constitucional — tópicos novos (parte 2): Judiciário, funções essenciais à Justiça, controle de
// constitucionalidade, sistema tributário e ordem econômica.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, juris, C, E } from './blocos.js';

export const NOVOS2 = [
  {
    id: 'judiciario', titulo: 'Poder Judiciário', arts: 'arts. 92 a 126',
    chaves: ['poder judiciario', 'do poder judiciario', 'stf e stj', 'sumula vinculante', 'precatorios', 'conselho nacional de justica'],
    html: `
<h3>Em poucas palavras</h3>
<p>O Judiciário tem a função típica de <b>julgar</b> com definitividade. A Constituição define seus órgãos, as garantias dos juízes, a competência do STF e do STJ, as súmulas vinculantes e a forma como o Estado paga suas dívidas judiciais (precatórios).</p>
<h3>Órgãos (art. 92)</h3>
<p>STF, <b>CNJ</b>, STJ, TST, TRFs e juízes federais, TRTs e juízes do trabalho, TREs e juízes eleitorais, tribunais e juízes militares, TJs e juízes estaduais e do DF.</p>
${box('O CNJ', '<ul><li>É órgão do Judiciário, mas <b>não tem função jurisdicional</b>: faz o controle <b>administrativo, financeiro e disciplinar</b> da magistratura.</li><li>Tem 15 membros, presidido pelo Presidente do STF.</li><li><b>Não</b> tem competência sobre o <b>STF</b> e seus ministros (ADI 3.367).</li></ul>')}
<h3>Garantias e vedações dos juízes (art. 95)</h3>
${cartoes([['♾', 'Vitaliciedade', 'em 1º grau, adquirida após 2 anos de exercício; perda do cargo só por sentença transitada em julgado', COR.azul], ['📍', 'Inamovibilidade', 'salvo por interesse público, por maioria absoluta do tribunal ou do CNJ', COR.verde], ['💵', 'Irredutibilidade de subsídio', 'ressalvados teto e tributos', COR.roxo]])}
<p><b>Vedações</b>: exercer outro cargo ou função, salvo <b>uma de magistério</b>; receber custas ou participação em processo; dedicar-se a <b>atividade político-partidária</b>; receber auxílios de pessoas físicas ou entidades, salvo exceções legais; exercer a <b>advocacia</b> no juízo ou tribunal de que se afastou antes de <b>3 anos</b> da aposentadoria ou exoneração (quarentena).</p>
<h3>Quinto constitucional (art. 94)</h3>
${passos([['Quem', '1/5 dos lugares dos TRFs e TJs: membros do MP e advogados com mais de 10 anos de carreira ou atividade'], ['Lista sêxtupla', 'indicada pelos órgãos de representação (MP e OAB)'], ['Lista tríplice', 'formada pelo próprio tribunal'], ['Nomeação', 'pelo Chefe do Executivo, em 20 dias']])}
<h3>STF e STJ</h3>
<table class="tab"><tr><th></th><th>STF</th><th>STJ</th></tr>
<tr><td>Composição</td><td><b>11</b> ministros</td><td>no mínimo <b>33</b> ministros</td></tr>
<tr><td>Requisitos</td><td>brasileiro <b>nato</b>, de 35 a 70 anos, notável saber jurídico e reputação ilibada</td><td>brasileiro (nato ou naturalizado), de 35 a 70 anos</td></tr>
<tr><td>Nomeação</td><td>Presidente, após aprovação da <b>maioria absoluta</b> do Senado</td><td>Presidente, após aprovação da maioria absoluta do Senado</td></tr>
<tr><td>Recurso típico</td><td><b>extraordinário</b>: decisão que contraria a <b>Constituição</b>; exige <b>repercussão geral</b></td><td><b>especial</b>: decisão que contraria <b>lei federal</b> ou diverge na sua interpretação; exige relevância da questão federal (EC 125/2022)</td></tr></table>
<p>O STF só pode recusar a repercussão geral pela manifestação de <b>2/3</b> de seus membros. A idade máxima de 70 anos para nomeação foi fixada pela <b>EC 122/2022</b> (antes era 65).</p>
<h3>Competências originárias do STF que mais caem (art. 102, I)</h3>
<ul><li>ADI, ADC, ADO e ADPF;</li><li>crimes comuns do Presidente, do Vice, dos congressistas, dos próprios Ministros do STF e do PGR;</li><li>mandado de segurança contra atos do Presidente, das Mesas da Câmara e do Senado, do TCU, do PGR e do próprio STF;</li><li>extradição solicitada por Estado estrangeiro;</li><li>litígio entre Estado estrangeiro e a União, Estado, DF ou Território;</li><li>causas e conflitos entre a União e os Estados, ou entre estes.</li></ul>
<h3>Súmula vinculante (art. 103-A)</h3>
<ul><li>Aprovada pelo STF, de ofício ou por provocação, por <b>2/3</b> de seus membros, após <b>reiteradas decisões</b> sobre matéria constitucional.</li><li>Vincula os <b>demais órgãos do Judiciário</b> e a <b>Administração Pública direta e indireta</b> de todas as esferas.</li><li><b>Não vincula</b> o Legislativo na função de legislar, nem o próprio STF.</li><li>Contra ato que a contrarie cabe <b>reclamação</b> ao STF. Na via administrativa, só depois de esgotadas as instâncias.</li></ul>
<h3>Precatórios (art. 100)</h3>
<p>Os pagamentos devidos pelas Fazendas Públicas em virtude de sentença são feitos na <b>ordem cronológica</b> de apresentação dos precatórios. Os débitos <b>alimentares</b> têm preferência, e entre eles os de titulares com <b>60 anos</b> ou mais, portadores de <b>doença grave</b> ou <b>pessoas com deficiência</b> têm “superpreferência”, até o triplo do valor da RPV. As obrigações de <b>pequeno valor</b> (RPV) dispensam precatório; cada Município fixa o seu valor por lei, que não pode ser inferior ao <b>maior benefício do regime geral de previdência</b>.</p>
${ex('Belo Vale é condenada a pagar R$ 500 mil a uma empreiteira: paga por <b>precatório</b>, na ordem cronológica. Condenada a pagar R$ 3 mil a um servidor: paga por <b>RPV</b>, sem fila, desde que o valor esteja abaixo do limite fixado pela lei municipal.')}
<h3>Justiça Federal × Justiça Estadual</h3>
<p>Compete aos juízes federais (art. 109) julgar as causas em que a <b>União, entidade autárquica ou empresa pública federal</b> forem interessadas, salvo falência, acidentes de trabalho e as da Justiça Eleitoral e do Trabalho. A <b>sociedade de economia mista</b> federal é julgada na <b>Justiça Estadual</b>. A Justiça Estadual tem competência <b>residual</b>.</p>
${peg('A súmula vinculante <b>não</b> vincula o Poder Legislativo na sua função típica: o Congresso pode aprovar lei em sentido contrário (e o STF poderá declará-la inconstitucional depois).')}`,
    quiz: [
      C('O CNJ não tem competência sobre o STF e seus ministros.', 'ADI 3.367.'),
      E('A vitaliciedade dos juízes de primeiro grau é adquirida após 3 anos de exercício.', 'Após 2 anos.'),
      C('A súmula vinculante é aprovada por decisão de dois terços dos membros do STF.', 'Art. 103-A.'),
      E('A súmula vinculante vincula o Poder Legislativo no exercício da função legislativa.', 'Não vincula.'),
      C('As causas em que é parte sociedade de economia mista federal são, em regra, julgadas pela Justiça Estadual.', 'Art. 109 não a inclui.'),
      E('Os Ministros do STJ devem ser brasileiros natos.', 'Podem ser naturalizados.'),
    ],
  },

  {
    id: 'funcoes-essenciais', titulo: 'Funções essenciais à Justiça: MP, Advocacia Pública, Advocacia e Defensoria', arts: 'arts. 127 a 135',
    chaves: ['funcoes essenciais', 'ministerio publico', 'advocacia publica', 'defensoria publica', 'advocacia-geral da uniao', 'procuradoria'],
    html: `
<h3>Em poucas palavras</h3>
<p>São instituições que <b>não integram o Judiciário</b>, mas sem as quais ele não funciona: o <b>Ministério Público</b> (fiscal da lei e titular da ação penal), a <b>Advocacia Pública</b> (defesa dos entes públicos), a <b>Advocacia</b> privada e a <b>Defensoria Pública</b> (defesa dos necessitados). Para o cargo de Procurador, a Advocacia Pública é a sua própria carreira.</p>
<h3>Ministério Público (arts. 127 a 130-A)</h3>
<p>Instituição <b>permanente</b>, essencial à função jurisdicional, incumbida da defesa da <b>ordem jurídica</b>, do <b>regime democrático</b> e dos <b>interesses sociais e individuais indisponíveis</b>.</p>
${cartoes([['1️⃣', 'Unidade', 'membros integram um só órgão, sob uma chefia', COR.azul], ['🔄', 'Indivisibilidade', 'um membro pode substituir o outro sem prejuízo do processo', COR.verde], ['🧠', 'Independência funcional', 'cada membro atua segundo sua convicção, sem hierarquia funcional', COR.roxo]])}
<table class="tab"><tr><th></th><th>Procurador-Geral da República</th><th>Procurador-Geral de Justiça (Estados)</th></tr>
<tr><td>Escolha</td><td>pelo Presidente, entre integrantes da carreira maiores de 35 anos, após aprovação da <b>maioria absoluta do Senado</b></td><td>pelo Governador, a partir de <b>lista tríplice</b> formada pela carreira</td></tr>
<tr><td>Mandato</td><td>2 anos, permitida a recondução</td><td>2 anos, permitida <b>uma</b> recondução</td></tr>
<tr><td>Destituição</td><td>iniciativa do Presidente, com autorização da maioria absoluta do Senado</td><td>deliberação da maioria absoluta da <b>Assembleia</b></td></tr></table>
<p><b>Funções institucionais</b> (art. 129): promover, <b>privativamente</b>, a ação penal pública; promover o inquérito civil e a ação civil pública; exercer o <b>controle externo da atividade policial</b>; requisitar diligências e a instauração de inquérito policial; promover a representação interventiva. O MP pode também conduzir <b>investigações criminais</b> próprias (STF, RE 593.727).</p>
<p>Os membros têm <b>vitaliciedade</b> (após 2 anos), <b>inamovibilidade</b> e <b>irredutibilidade</b>, e não podem exercer a advocacia nem atividade político-partidária. O <b>MP junto aos Tribunais de Contas</b> (art. 130) integra a estrutura do próprio Tribunal, e não o MP comum.</p>
<h3>Advocacia Pública (arts. 131 e 132)</h3>
<ul><li><b>Advocacia-Geral da União</b>: representa a União judicial e extrajudicialmente e presta consultoria e assessoramento ao Executivo. O <b>Advogado-Geral da União</b> é de livre nomeação do Presidente entre cidadãos maiores de 35 anos, de notável saber jurídico e reputação ilibada. A execução da dívida ativa tributária da União cabe à <b>Procuradoria-Geral da Fazenda Nacional</b>.</li><li><b>Procuradores dos Estados e do DF</b>: carreira com ingresso por <b>concurso de provas e títulos, com participação da OAB em todas as fases</b>; adquirem estabilidade após <b>3 anos</b> de efetivo exercício, mediante avaliação de desempenho perante os órgãos próprios.</li></ul>
${box('E os procuradores municipais?', '<ul><li>A Constituição não trata expressamente das procuradorias municipais, mas o STF reconhece que os procuradores do Município <b>integram a advocacia pública</b> e exercem <b>função essencial à Justiça</b>.</li><li>Por isso, seu teto remuneratório é o subsídio dos <b>desembargadores</b> do TJ, e não o do Prefeito (STF, Tema 510).</li><li>Podem receber <b>honorários de sucumbência</b>, respeitado o teto (STF, ADI 6.053).</li><li>O ingresso deve ser por <b>concurso público</b>, como em todo cargo efetivo (art. 37, II).</li></ul>')}
<h3>Advocacia (art. 133)</h3>
<p>O advogado é <b>indispensável à administração da justiça</b>, sendo <b>inviolável</b> por seus atos e manifestações no exercício da profissão, nos limites da lei. Essa indispensabilidade não é absoluta: há atos que dispensam advogado, como o habeas corpus, os juizados especiais (em parte) e a reclamação trabalhista.</p>
<h3>Defensoria Pública (arts. 134 e 135)</h3>
<ul><li>Instituição permanente, encarregada da orientação jurídica, da promoção dos direitos humanos e da defesa, judicial e extrajudicial, dos direitos individuais e coletivos dos <b>necessitados</b>, de forma integral e gratuita.</li><li>Princípios: <b>unidade, indivisibilidade e independência funcional</b> (EC 80/2014).</li><li>As Defensorias estaduais, a do DF e a da União têm <b>autonomia funcional e administrativa</b> e iniciativa de sua proposta orçamentária.</li><li>Os defensores têm <b>inamovibilidade</b> e são proibidos de exercer a advocacia fora das atribuições institucionais.</li></ul>
${dica('MP: <b>U-I-I</b> (Unidade, Indivisibilidade, Independência funcional). A Defensoria tem os <b>mesmos três</b> princípios, desde a EC 80/2014.')}
${peg('O PGR pode ser reconduzido <b>sem limite</b> de vezes. O Procurador-Geral de Justiça dos Estados, só <b>uma</b> vez. E quem destitui o PGJ é a <b>Assembleia</b>, não o Governador.')}`,
    quiz: [
      C('São princípios institucionais do Ministério Público a unidade, a indivisibilidade e a independência funcional.', 'Art. 127, §1º.'),
      E('O Procurador-Geral de Justiça dos Estados pode ser reconduzido sem limite de vezes.', 'Permitida uma recondução.'),
      C('O ingresso na carreira de procurador do Estado exige concurso com participação da OAB em todas as fases.', 'Art. 132.'),
      E('Segundo o STF, o teto remuneratório dos procuradores municipais é o subsídio do Prefeito.', 'É o dos desembargadores (Tema 510).'),
      C('O MP junto aos Tribunais de Contas integra a estrutura desses Tribunais.', 'Art. 130 e jurisprudência do STF.'),
      E('A Defensoria Pública da União não tem autonomia funcional e administrativa.', 'Tem, desde a EC 74/2013.'),
    ],
  },

  {
    id: 'controle', titulo: 'Controle de constitucionalidade', arts: 'arts. 97, 102, 103 e 125, §2º · Leis 9.868 e 9.882/1999',
    chaves: ['controle de constitucionalidade', 'controle difuso', 'controle concentrado', 'acao direta de inconstitucionalidade', 'adpf', 'adi e adc', 'controle de constitucionalidade (introducao)'],
    html: `
<h3>Em poucas palavras</h3>
<p>Controle de constitucionalidade é a verificação de que uma lei ou ato normativo é compatível com a Constituição. Ele só existe porque a Constituição é <b>suprema</b> e <b>rígida</b>. No Brasil, o sistema é <b>misto</b>: qualquer juiz pode deixar de aplicar uma lei inconstitucional num caso concreto (difuso), e o STF julga a lei “em tese” (concentrado).</p>
<h3>Tipos de inconstitucionalidade</h3>
<table class="tab"><tr><th>Tipo</th><th>O que está errado</th><th>Exemplo</th></tr>
<tr><td><b>Formal orgânica</b></td><td>o ente não tinha competência</td><td>lei municipal sobre trânsito</td></tr>
<tr><td><b>Formal subjetiva</b> (vício de iniciativa)</td><td>quem propôs não podia propor</td><td>vereador propõe lei que cria cargos no Executivo</td></tr>
<tr><td><b>Formal objetiva</b></td><td>o procedimento não foi seguido</td><td>lei complementar aprovada por maioria simples</td></tr>
<tr><td><b>Material</b></td><td>o conteúdo contraria a Constituição</td><td>lei que institui pena de morte em tempo de paz</td></tr>
<tr><td><b>Por omissão</b></td><td>falta a norma que a Constituição exige</td><td>ausência da lei de greve do servidor</td></tr></table>
<p>O vício de iniciativa <b>não é sanado</b> pela sanção do Chefe do Executivo (a antiga Súmula 5 do STF está superada).</p>
<h3>Quando ocorre o controle</h3>
${cartoes([['🛑', 'Preventivo', 'sobre o projeto: Comissão de Constituição e Justiça, veto jurídico, mandado de segurança impetrado por parlamentar', COR.azul], ['🔨', 'Repressivo', 'sobre a lei pronta: em regra pelo Judiciário; excepcionalmente pelo Legislativo (sustação de ato normativo, rejeição de MP)', COR.verm]])}
<p>No controle preventivo judicial, só o <b>parlamentar</b> da Casa em que tramita o projeto tem legitimidade para impetrar o MS, e só para discutir o <b>devido processo legislativo</b>.</p>
<h3>Controle difuso (concreto, incidental)</h3>
<ul><li>Feito por <b>qualquer juiz ou tribunal</b>, num caso concreto. A inconstitucionalidade é a <b>causa de pedir</b>, não o pedido.</li><li>Origem: caso <i>Marbury v. Madison</i> (EUA, 1803).</li><li>Efeitos: em regra <b>inter partes</b> e <b>ex tunc</b>.</li><li>Chega ao STF por <b>recurso extraordinário</b>, que exige repercussão geral.</li><li>O Senado pode <b>suspender a execução</b> da lei declarada inconstitucional pelo STF (art. 52, X). O STF passou a entender que a decisão do Plenário, mesmo no controle difuso, já tem efeito geral, cabendo ao Senado dar publicidade (ADIs 3.406 e 3.470).</li></ul>
${box('Cláusula de reserva de plenário (art. 97 e SV 10)', 'Os <b>tribunais</b> só podem declarar a inconstitucionalidade de lei pelo voto da <b>maioria absoluta</b> de seus membros ou do órgão especial. Viola essa regra a decisão de órgão fracionário (turma, câmara) que, embora não declare expressamente, <b>afasta a incidência</b> da lei (SV 10). Não precisa de plenário quando já houver pronunciamento do próprio plenário ou do STF sobre a questão, nem para juízes de primeiro grau.')}
<h3>Controle concentrado (abstrato)</h3>
<table class="tab"><tr><th>Ação</th><th>Objeto</th><th>Detalhe</th></tr>
<tr><td><b>ADI</b></td><td>lei ou ato normativo <b>federal ou estadual</b> posterior à CF</td><td>lei <b>municipal</b> não cabe ADI no STF</td></tr>
<tr><td><b>ADC</b></td><td>lei ou ato normativo <b>federal</b></td><td>exige <b>controvérsia judicial relevante</b></td></tr>
<tr><td><b>ADO</b></td><td>omissão na edição de norma</td><td>dá ciência ao Poder; órgão administrativo tem 30 dias</td></tr>
<tr><td><b>ADPF</b></td><td>qualquer ato do Poder Público, inclusive <b>municipal</b> e <b>anterior à CF</b></td><td><b>subsidiária</b>: só cabe se não houver outro meio eficaz</td></tr>
<tr><td><b>ADI interventiva</b></td><td>violação de princípio sensível</td><td>só o <b>PGR</b> propõe</td></tr></table>
<h3>Quem pode propor (art. 103)</h3>
${cartoes([['🌐', 'Universais', 'Presidente da República, Mesa do Senado, Mesa da Câmara, PGR, Conselho Federal da OAB, partido político com representação no Congresso', COR.verde], ['🎯', 'Especiais (pertinência temática)', 'Mesa de Assembleia Legislativa ou da Câmara Legislativa do DF, Governador, confederação sindical ou entidade de classe de âmbito nacional', COR.lar]])}
${dica('Os <b>especiais</b> são os que têm interesse “local” ou de categoria: <b>Ga-Me-Co</b> — <b>G</b>overnador, <b>Me</b>sa de Assembleia, <b>Co</b>nfederação ou entidade de classe. O <b>Prefeito</b> e a <b>Mesa da Câmara Municipal</b> não podem propor ADI no STF.')}
<h3>Efeitos e regras processuais</h3>
<ul><li>Decisão definitiva em ADI e ADC: eficácia <b>erga omnes</b>, efeito <b>vinculante</b> (Judiciário e Administração) e, em regra, <b>ex tunc</b>.</li><li><b>Modulação de efeitos</b>: por razões de segurança jurídica ou excepcional interesse social, por <b>2/3</b> dos ministros (Lei 9.868, art. 27).</li><li><b>Medida cautelar</b> em ADI: maioria absoluta; efeitos, em regra, <b>ex nunc</b>.</li><li>Não se admite <b>desistência</b>, nem intervenção de terceiros, mas se admite <b>amicus curiae</b>.</li><li>O <b>AGU</b> defende a norma impugnada (curador), podendo deixar de fazê-lo quando o STF já tiver decidido pela inconstitucionalidade.</li><li>Técnicas: <b>interpretação conforme</b> e declaração de <b>inconstitucionalidade parcial sem redução de texto</b>.</li></ul>
<h3>Controle no Estado e no Município (art. 125, §2º)</h3>
<p>Cabe aos Estados instituir <b>representação de inconstitucionalidade</b> de leis ou atos normativos <b>estaduais ou municipais</b> em face da <b>Constituição Estadual</b>, julgada pelo <b>Tribunal de Justiça</b>, vedada a atribuição da legitimação a um único órgão. O TJ pode usar como parâmetro as normas da CF de <b>reprodução obrigatória</b> pelos Estados, e dessa decisão cabe recurso extraordinário ao STF (Tema 484).</p>
${ex('Uma lei de Belo Vale que viola a Constituição Federal pode ser questionada: (1) em qualquer processo concreto, pelo controle difuso; (2) por <b>ADPF</b> no STF; ou (3) por representação de inconstitucionalidade no <b>TJMG</b>, em face da Constituição de Minas Gerais.')}
${peg('Lei anterior à Constituição incompatível com ela não é “inconstitucional”: ela simplesmente <b>não foi recepcionada</b> (foi revogada). Por isso, não cabe ADI contra norma pré-constitucional; o caminho é a <b>ADPF</b>.')}`,
    quiz: [
      C('O controle de constitucionalidade no Brasil adota sistema misto, combinando o difuso e o concentrado.', 'Difuso por qualquer juiz; concentrado no STF e nos TJs.'),
      E('Cabe ação direta de inconstitucionalidade no STF contra lei municipal em face da Constituição Federal.', 'Cabe ADPF; ADI só contra lei federal ou estadual.'),
      C('Viola a cláusula de reserva de plenário a decisão de órgão fracionário que afasta a incidência de lei sem declarar expressamente sua inconstitucionalidade.', 'SV 10.'),
      E('O Prefeito é legitimado para propor ação direta de inconstitucionalidade perante o STF.', 'Não consta do art. 103.'),
      C('A modulação dos efeitos da declaração de inconstitucionalidade exige maioria de dois terços dos ministros do STF.', 'Lei 9.868, art. 27.'),
      E('A sanção do projeto pelo Chefe do Executivo supre o vício de iniciativa.', 'A Súmula 5 do STF está superada.'),
      C('A ADPF admite como objeto o direito pré-constitucional.', 'Lei 9.882/1999.'),
    ],
  },

  {
    id: 'tributario', titulo: 'Sistema Tributário Nacional na Constituição', arts: 'arts. 145 a 162 (com a EC 132/2023)',
    chaves: ['sistema tributario', 'tributacao e orcamento', 'limitacoes do poder de tributar', 'imunidades tributarias', 'especies tributarias', 'reparticao das receitas', 'impostos dos municipios'],
    html: `
<h3>Em poucas palavras</h3>
<p>A Constituição não cria tributos: ela <b>reparte a competência</b> para que cada ente os institua por lei, <b>limita</b> esse poder (princípios e imunidades) e <b>divide a arrecadação</b> entre os entes. Para o Procurador municipal, os impostos do Município e a repartição das receitas são essenciais.</p>
<h3>As espécies tributárias (teoria pentapartida, adotada pelo STF)</h3>
<table class="tab"><tr><th>Espécie</th><th>Fato gerador</th><th>Quem institui</th></tr>
<tr><td><b>Imposto</b></td><td>situação independente de atividade estatal (renda, propriedade)</td><td>cada ente, os seus</td></tr>
<tr><td><b>Taxa</b></td><td>exercício do <b>poder de polícia</b> ou serviço público <b>específico e divisível</b>, prestado ou posto à disposição</td><td>todos os entes</td></tr>
<tr><td><b>Contribuição de melhoria</b></td><td>valorização imobiliária decorrente de <b>obra pública</b></td><td>todos os entes</td></tr>
<tr><td><b>Empréstimo compulsório</b></td><td>calamidade pública, guerra externa ou sua iminência; investimento público urgente e relevante</td><td>só a <b>União</b>, por <b>lei complementar</b></td></tr>
<tr><td><b>Contribuições</b></td><td>sociais, de intervenção no domínio econômico (CIDE), corporativas</td><td>em regra a União; Estados e Municípios instituem a previdenciária de seus servidores; Municípios e DF, a de <b>iluminação pública</b> (art. 149-A)</td></tr></table>
${juris('<ul><li><b>SV 19</b>: a taxa de coleta, remoção e tratamento de <b>lixo domiciliar</b> não viola o art. 145, II.</li><li><b>SV 41</b>: o serviço de <b>iluminação pública</b> não pode ser remunerado por taxa (daí a COSIP, contribuição do art. 149-A).</li><li><b>SV 29</b>: é constitucional a taxa que adote um ou mais elementos da base de cálculo de imposto, desde que não haja <b>integral identidade</b> entre uma base e a outra.</li></ul>')}
<h3>Quem cobra o quê</h3>
${cartoes([['🇧🇷', 'União', 'II, IE, IR, IPI, IOF, ITR, grandes fortunas e o Imposto Seletivo (EC 132/2023); residual por LC; extraordinário de guerra', COR.azul], ['🏛', 'Estados e DF', 'ITCMD, ICMS e IPVA', COR.roxo], ['🏘', 'Municípios e DF', 'IPTU, ITBI e ISS', COR.verde]])}
${box('Reforma tributária (EC 132/2023)', 'Criou o <b>IBS</b> (Imposto sobre Bens e Serviços, de competência compartilhada entre Estados, DF e Municípios), a <b>CBS</b> (Contribuição sobre Bens e Serviços, federal) e o <b>Imposto Seletivo</b>. O IBS substituirá o <b>ICMS</b> e o <b>ISS</b>, e a CBS, o PIS e a Cofins. A transição vai de <b>2026 a 2033</b>, quando ICMS e ISS deixam de existir. Até lá, os tributos antigos convivem com os novos.')}
<h3>Impostos municipais em detalhe</h3>
<ul><li><b>IPTU</b>: pode ser <b>progressivo em razão do valor</b> do imóvel e ter alíquotas diferentes conforme <b>localização e uso</b> (EC 29/2000); pode ser <b>progressivo no tempo</b> para o imóvel que não cumpre a função social (art. 182, §4º).</li><li><b>ITBI</b>: transmissão <b>inter vivos</b>, a título <b>oneroso</b>, de bens imóveis; compete ao Município da <b>situação do bem</b>; não incide na incorporação ao capital de empresa, salvo se a atividade preponderante for imobiliária. O fato gerador só ocorre com o <b>registro</b> da transferência no cartório (STF, Tema 1.124).</li><li><b>ISS</b>: serviços definidos em lei complementar (LC 116/2003); alíquota mínima de <b>2%</b> e máxima de 5%.</li></ul>
<h3>Limitações ao poder de tributar (art. 150)</h3>
<table class="tab"><tr><th>Princípio</th><th>Regra</th></tr>
<tr><td><b>Legalidade</b></td><td>só lei cria ou aumenta tributo; o Executivo pode alterar alíquotas de II, IE, IPI e IOF, nos limites da lei</td></tr>
<tr><td><b>Irretroatividade</b></td><td>não alcança fatos anteriores à lei</td></tr>
<tr><td><b>Anterioridade anual</b></td><td>não cobra no mesmo exercício financeiro em que a lei foi publicada</td></tr>
<tr><td><b>Anterioridade nonagesimal</b></td><td>não cobra antes de <b>90 dias</b> da publicação</td></tr>
<tr><td><b>Isonomia</b></td><td>vedado tratamento desigual entre contribuintes em situação equivalente</td></tr>
<tr><td><b>Não confisco</b></td><td>tributo não pode ter efeito de confisco (vale também para multas)</td></tr>
<tr><td><b>Liberdade de tráfego</b></td><td>vedadas limitações ao tráfego por tributos interestaduais ou intermunicipais, ressalvado o <b>pedágio</b></td></tr></table>
${box('Exceções às anterioridades (as mais cobradas)', '<ul><li>Não se sujeitam a <b>nenhuma</b> das duas: II, IE, IOF, imposto extraordinário de guerra e empréstimo compulsório de guerra ou calamidade.</li><li>Só à <b>nonagesimal</b> (cobra no mesmo ano, após 90 dias): IPI, contribuições para a seguridade social e restabelecimento de alíquotas da CIDE e do ICMS sobre combustíveis.</li><li>Só à <b>anual</b> (cobra em 1º de janeiro, mesmo sem 90 dias): <b>IR</b> e a fixação da <b>base de cálculo</b> do IPVA e do <b>IPTU</b>.</li></ul>')}
<h3>Imunidades (art. 150, VI)</h3>
<ol><li><b>Recíproca</b>: os entes não cobram impostos uns dos outros sobre patrimônio, renda e serviços; estende-se às autarquias e fundações e a estatais prestadoras de serviço público em regime não concorrencial (como os Correios).</li><li><b>Templos</b> de qualquer culto.</li><li>Patrimônio, renda e serviços dos <b>partidos políticos</b> e suas fundações, das <b>entidades sindicais dos trabalhadores</b> e das <b>instituições de educação e de assistência social sem fins lucrativos</b>, atendidos os requisitos da lei.</li><li><b>Livros, jornais, periódicos</b> e o papel destinado à sua impressão (inclui o livro eletrônico, <b>SV 57</b>).</li><li><b>Fonogramas e videofonogramas musicais</b> produzidos no Brasil.</li></ol>
<p><b>SV 52</b>: o imóvel de entidade imune continua imune ao IPTU ainda que <b>alugado a terceiros</b>, desde que o valor dos aluguéis seja aplicado nas atividades essenciais da entidade.</p>
<h3>Repartição das receitas: o que o Município recebe</h3>
<ul><li><b>100%</b> do IR retido na fonte sobre rendimentos pagos pelo próprio Município;</li><li><b>50%</b> do ITR dos imóveis nele situados, ou <b>100%</b> se optar por fiscalizar e cobrar;</li><li><b>50%</b> do IPVA dos veículos licenciados em seu território;</li><li><b>25%</b> do ICMS arrecadado pelo Estado;</li><li>cotas do <b>Fundo de Participação dos Municípios</b> (parcela do IR e do IPI).</li></ul>
${peg('Imunidade é <b>constitucional</b> (a Constituição proíbe tributar). Isenção é <b>legal</b> (o ente poderia tributar, mas a lei dispensa). Quando a CF fala em “isentas” no art. 195, §7º, o STF entende que se trata de imunidade.')}`,
    quiz: [
      C('O serviço de iluminação pública não pode ser remunerado mediante taxa.', 'SV 41.'),
      E('O IR se submete à anterioridade nonagesimal.', 'O IR é exceção à nonagesimal; respeita só a anual.'),
      C('A imunidade dos livros alcança o livro eletrônico.', 'SV 57.'),
      E('Os Estados podem instituir empréstimo compulsório em caso de calamidade pública.', 'Só a União, por lei complementar.'),
      C('Pertencem aos Municípios 50% do produto da arrecadação do IPVA dos veículos licenciados em seus territórios.', 'Art. 158, III.'),
      E('A taxa pode ter base de cálculo idêntica à de imposto.', 'Vedado (art. 145, §2º); SV 29 admite só elementos parciais.'),
      C('Segundo o STF, o fato gerador do ITBI só ocorre com a transferência efetiva da propriedade, mediante registro em cartório.', 'Tema 1.124.'),
    ],
  },

  {
    id: 'ordem-economica', titulo: 'Ordem econômica e financeira: princípios, atuação do Estado e política urbana e agrária', arts: 'arts. 170 a 192',
    chaves: ['ordem economica', 'ordem economica e financeira', 'politica urbana', 'politica agricola', 'reforma agraria', 'atividade economica'],
    html: `
<h3>Em poucas palavras</h3>
<p>A ordem econômica é <b>capitalista com preocupação social</b>: valoriza a livre iniciativa, mas exige que a economia sirva a uma existência digna. O Estado, em regra, não explora atividade econômica: ele <b>regula, fiscaliza, incentiva e planeja</b>. Também é aqui que estão a política urbana (o Município como protagonista) e a política agrária.</p>
<h3>Fundamentos, fim e princípios (art. 170)</h3>
<p>Fundada na <b>valorização do trabalho humano</b> e na <b>livre iniciativa</b>, tem por fim assegurar a todos <b>existência digna</b>, conforme os ditames da <b>justiça social</b>, observados os princípios:</p>
<ol><li>soberania nacional;</li><li>propriedade privada;</li><li>função social da propriedade;</li><li>livre concorrência;</li><li>defesa do consumidor;</li><li>defesa do meio ambiente, inclusive com tratamento diferenciado conforme o impacto ambiental;</li><li>redução das desigualdades regionais e sociais;</li><li>busca do pleno emprego;</li><li>tratamento favorecido para as empresas de pequeno porte constituídas sob as leis brasileiras e com sede no País.</li></ol>
<p>É assegurado a todos o livre exercício de qualquer atividade econômica, <b>independentemente de autorização</b> de órgãos públicos, salvo nos casos previstos em lei (parágrafo único).</p>
${dica('Fundamentos: <b>trabalho + livre iniciativa</b> (os mesmos do art. 1º, IV). Fim: <b>existência digna</b>. O resto da lista são <b>princípios</b>.')}
<h3>Como o Estado atua na economia</h3>
${cartoes([['🏭', 'Exploração direta (art. 173)', 'excepcional: só por imperativo de segurança nacional ou relevante interesse coletivo, por empresas estatais', COR.verm], ['📏', 'Agente normativo e regulador (art. 174)', 'fiscalização, incentivo e planejamento; o planejamento é determinante para o setor público e indicativo para o privado', COR.azul], ['🛠', 'Serviços públicos (art. 175)', 'diretamente ou por concessão e permissão, sempre com licitação', COR.verde], ['⛔', 'Monopólio (art. 177)', 'petróleo, gás natural, refino, transporte por dutos e minérios nucleares', COR.roxo]])}
<p>As estatais que exploram atividade econômica sujeitam-se ao <b>regime das empresas privadas</b>, inclusive quanto às obrigações trabalhistas e tributárias, e <b>não podem gozar de privilégios fiscais</b> não extensivos ao setor privado (art. 173, §§1º e 2º).</p>
<h3>Recursos minerais (arts. 176 e 20, §1º)</h3>
<ul><li>As jazidas e os recursos minerais <b>pertencem à União</b>, distintos da propriedade do solo; ao concessionário é garantida a propriedade do produto da lavra.</li><li>A pesquisa e a lavra dependem de <b>autorização ou concessão da União</b>, a brasileiros ou empresas constituídas sob as leis brasileiras com sede e administração no País.</li><li>O <b>proprietário do solo</b> tem participação nos resultados da lavra.</li><li>Estados, DF e <b>Municípios</b> têm direito a participação ou <b>compensação financeira</b> pela exploração em seu território (a CFEM).</li></ul>
${ex('Belo Vale fica numa região de mineração de ferro. O minério no subsolo é da <b>União</b>, a mineradora é dona do minério que extrai, o dono do terreno participa dos resultados e o <b>Município</b> recebe a compensação financeira (CFEM) pela exploração em seu território.')}
<h3>Política urbana (arts. 182 e 183)</h3>
<ul><li>Executada pelo <b>Município</b>, conforme diretrizes gerais da lei federal (Estatuto da Cidade, Lei 10.257/2001).</li><li>O <b>plano diretor</b>, aprovado pela Câmara, é obrigatório para cidades com mais de <b>20 mil habitantes</b> e é o instrumento básico da política urbana.</li><li>A propriedade urbana cumpre sua função social quando atende ao plano diretor.</li><li>As desapropriações urbanas comuns são feitas com <b>prévia e justa indenização em dinheiro</b>.</li></ul>
${passos([['1º', 'parcelamento ou edificação compulsórios'], ['2º', 'IPTU progressivo no tempo'], ['3º', 'desapropriação com pagamento em títulos da dívida pública, resgatáveis em até 10 anos']])}
<p>Essa é a sequência obrigatória, por <b>lei específica</b> para área incluída no plano diretor, contra o solo urbano não edificado, subutilizado ou não utilizado.</p>
<h3>Usucapião especial</h3>
<table class="tab"><tr><th></th><th>Urbana (art. 183)</th><th>Rural (art. 191)</th></tr>
<tr><td>Área</td><td>até <b>250 m²</b></td><td>até <b>50 hectares</b></td></tr>
<tr><td>Tempo</td><td><b>5 anos</b> ininterruptos e sem oposição</td><td><b>5 anos</b> ininterruptos e sem oposição</td></tr>
<tr><td>Uso</td><td>moradia própria ou da família</td><td>tornar a área produtiva pelo trabalho e ter nela sua moradia</td></tr>
<tr><td>Requisito</td><td>não ser proprietário de outro imóvel urbano ou rural; não reconhecida mais de uma vez</td><td>não ser proprietário de outro imóvel</td></tr></table>
<p>Em ambos os casos, os <b>imóveis públicos</b> não podem ser adquiridos por usucapião.</p>
<h3>Política agrícola e reforma agrária (arts. 184 a 191)</h3>
<ul><li>A função social da propriedade rural exige, <b>simultaneamente</b>: aproveitamento racional e adequado; utilização adequada dos recursos naturais e preservação do meio ambiente; observância das leis trabalhistas; exploração que favoreça o bem-estar de proprietários e trabalhadores (art. 186).</li><li>São <b>insuscetíveis</b> de desapropriação para reforma agrária a <b>pequena e a média propriedade</b> rural, desde que o proprietário não tenha outra, e a <b>propriedade produtiva</b> (art. 185).</li><li>As operações de transferência de imóveis desapropriados para reforma agrária são <b>isentas</b> de impostos federais, estaduais e municipais.</li></ul>
${peg('O planejamento econômico do Estado é <b>determinante</b> para o setor <b>público</b> e apenas <b>indicativo</b> para o setor <b>privado</b>. A banca costuma dizer que ele é “obrigatório para todos”.')}`,
    quiz: [
      C('A ordem econômica é fundada na valorização do trabalho humano e na livre iniciativa.', 'Art. 170, caput.'),
      E('O planejamento econômico estatal é determinante para os setores público e privado.', 'Indicativo para o setor privado (art. 174).'),
      C('As jazidas e demais recursos minerais pertencem à União, garantida ao concessionário a propriedade do produto da lavra.', 'Art. 176.'),
      E('O plano diretor é obrigatório para todos os Municípios, independentemente do número de habitantes.', 'Pela CF, para cidades com mais de 20 mil habitantes.'),
      C('A propriedade produtiva é insuscetível de desapropriação para fins de reforma agrária.', 'Art. 185, II.'),
      E('A usucapião especial urbana alcança áreas de até 500 metros quadrados.', 'Até 250 m².'),
    ],
  },
];
