// Direito Administrativo — aula completa (parte 1): princípios, organização, poderes, atos, agentes, licitações e contratos.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, banca, C, E } from './blocos.js';

const A = (t) => `<h3 class="lt-aula">📚 Aula completa</h3>${t}`;

export const AULA1 = {
  'conceito-principios': {
    html: A(`
<h3>Critérios para conceituar o Direito Administrativo</h3>
<p>Ao longo da história, a doutrina tentou definir a matéria por vários critérios. A banca cobra o nome de cada um e qual deles prevalece no Brasil.</p>
<table class="tab"><tr><th>Critério</th><th>Ideia central</th><th>Crítica</th></tr>
<tr><td><b>Legalista (exegético)</b></td><td>Direito Administrativo = conjunto de leis administrativas</td><td>ignora doutrina, jurisprudência e princípios</td></tr>
<tr><td><b>Do Poder Executivo</b></td><td>estuda só os atos do Executivo</td><td>Legislativo e Judiciário também administram (ex.: licitam, nomeiam servidores)</td></tr>
<tr><td><b>Do serviço público</b> (Escola de Bordeaux, Duguit)</td><td>tudo o que o Estado faz é serviço público</td><td>deixa de fora o poder de polícia e o fomento</td></tr>
<tr><td><b>Das relações jurídicas</b></td><td>regula relações entre Estado e particulares</td><td>outros ramos também regulam essas relações (tributário, penal)</td></tr>
<tr><td><b>Teleológico</b></td><td>sistema de princípios que guiam o Estado para seus fins</td><td>vago</td></tr>
<tr><td><b>Negativo ou residual</b></td><td>tudo o que não é legislar nem julgar</td><td>define pelo que a matéria não é</td></tr>
<tr><td><b>Da Administração Pública</b> (Hely Lopes Meirelles)</td><td>conjunto de princípios que regem órgãos, agentes e atividades que realizam, de forma direta, concreta e imediata, os fins do Estado</td><td><b>é o mais aceito no Brasil</b></td></tr></table>
<h3>Função administrativa × outras funções do Estado</h3>
<p>O Estado tem três funções típicas: <b>legislar</b> (normas gerais e abstratas, que inovam o ordenamento), <b>julgar</b> (resolver conflitos com definitividade) e <b>administrar</b> (executar a lei de forma concreta, sempre sujeita a controle judicial). Todos os Poderes exercem as três de forma típica ou atípica: quando o Tribunal faz concurso para servidores, está exercendo <b>função administrativa atípica</b>.</p>
<h3>Os princípios da Lei 9.784/1999 (art. 2º)</h3>
<p>Além do LIMPE, a lei do processo administrativo federal lista expressamente: <b>legalidade, finalidade, motivação, razoabilidade, proporcionalidade, moralidade, ampla defesa, contraditório, segurança jurídica, interesse público e eficiência</b>. Note que, nessa lei, motivação, razoabilidade e segurança jurídica são princípios <b>expressos</b>; na Constituição eles são implícitos.</p>
${box('Publicidade em detalhe', '<ul><li>É condição de <b>eficácia</b> do ato, não de validade: o ato existe e é válido, mas só produz efeitos perante terceiros depois de publicado.</li><li>A publicidade institucional deve ter caráter <b>educativo, informativo ou de orientação social</b>; não pode ter nomes, símbolos ou imagens que caracterizem <b>promoção pessoal</b> (CF, art. 37, §1º).</li><li>O sigilo é exceção: segurança da sociedade e do Estado e intimidade (CF, art. 5º, XXXIII e LX).</li></ul>')}
<h3>Razoabilidade e proporcionalidade: o teste em três passos</h3>
${passos([['Adequação', 'o meio escolhido serve para atingir o fim?'], ['Necessidade', 'não havia meio menos gravoso que chegasse ao mesmo resultado?'], ['Proporcionalidade em sentido estrito', 'o benefício compensa o sacrifício imposto?']])}
${ex('Interditar um restaurante inteiro por uma única lâmpada queimada na cozinha é medida <b>desproporcional</b>: havia meio menos gravoso (notificação com prazo). O Judiciário pode anular essa interdição, porque desproporcionalidade é <b>ilegalidade</b>, e não mérito.')}
<h3>A LINDB com mais detalhe</h3>
<ul><li><b>Art. 21</b>: a decisão que invalida ato, contrato ou processo deve indicar de modo expresso suas <b>consequências jurídicas e administrativas</b>.</li><li><b>Art. 24</b>: a revisão da validade de ato já completado leva em conta as <b>orientações gerais da época</b>; não se declaram inválidas situações plenamente constituídas com base em mudança posterior de orientação.</li><li><b>Art. 26</b>: permite <b>compromisso</b> com os interessados para eliminar irregularidade, incerteza jurídica ou situação contenciosa.</li><li><b>Art. 30</b>: as autoridades devem aumentar a segurança jurídica com regulamentos, súmulas administrativas e respostas a consultas, que vinculam o órgão.</li></ul>
${banca('<ul><li>“A Administração pode tudo o que a lei não proíbe” → <b>errado</b>.</li><li>“Publicidade é requisito de validade” → <b>errado</b>: é de eficácia.</li><li>“Eficiência foi incluída pela EC 19/1998” → <b>certo</b>.</li><li>“Princípios implícitos têm menor força que os expressos” → <b>errado</b>: não há hierarquia entre princípios.</li></ul>')}
${peg('Não existe hierarquia entre os princípios do art. 37. Em caso de conflito, faz-se <b>ponderação</b> no caso concreto, e não se aplica um princípio “acima” do outro.')}`),
    quiz: [
      C('O critério da Administração Pública é o mais aceito pela doutrina brasileira para conceituar o Direito Administrativo.', 'Defendido por Hely Lopes Meirelles.'),
      E('A publicidade é requisito de validade do ato administrativo.', 'É requisito de eficácia.'),
      C('Na Lei 9.784/1999, a motivação e a segurança jurídica são princípios expressos.', 'Art. 2º da lei.'),
      E('O critério do serviço público abrange adequadamente o poder de polícia e o fomento.', 'Essa é justamente a crítica ao critério: ele os deixa de fora.'),
    ],
  },

  organizacao: {
    html: A(`
<h3>Centralizar, descentralizar, concentrar, desconcentrar</h3>
${cartoes([['🎯', 'Centralização', 'o próprio ente (União, Estado, Município) executa diretamente', COR.azul], ['🌐', 'Descentralização', 'a atividade passa para OUTRA pessoa jurídica; não há hierarquia, há controle (tutela)', COR.verde], ['🧩', 'Desconcentração', 'divisão interna em órgãos, dentro da MESMA pessoa; há hierarquia', COR.roxo], ['🧱', 'Concentração', 'extinção de órgãos internos, reunindo competências', COR.cinza]])}
<h3>As formas de descentralização</h3>
<table class="tab"><tr><th>Forma</th><th>Como ocorre</th><th>O que se transfere</th></tr>
<tr><td><b>Por outorga</b> (por serviços, funcional, técnica)</td><td>por <b>lei</b>, para entidade da Administração indireta</td><td><b>titularidade e execução</b> do serviço</td></tr>
<tr><td><b>Por delegação</b> (por colaboração)</td><td>por <b>contrato</b> (concessão, permissão) ou <b>ato</b> (autorização)</td><td>só a <b>execução</b>; o Estado continua titular</td></tr>
<tr><td><b>Territorial</b> (geográfica)</td><td>criação de território federal</td><td>capacidade administrativa genérica</td></tr></table>
<h3>Teoria do órgão (imputação)</h3>
<p>Os órgãos são <b>centros de competência sem personalidade jurídica</b>. O que o agente faz em nome do órgão é <b>imputado</b> à pessoa jurídica a que ele pertence (teoria de Otto Gierke). Por isso, quem responde por um dano causado pela Secretaria Municipal de Obras é o <b>Município</b>.</p>
${box('Órgãos com capacidade processual', 'Embora sem personalidade, órgãos <b>independentes e autônomos</b> (Câmara Municipal, Assembleia, Tribunal de Contas, Ministério Público) podem ir a juízo para defender suas <b>prerrogativas institucionais</b>. Súmula 525 do STJ: a Câmara de Vereadores só pode demandar em juízo para defender seus direitos institucionais.')}
<h3>Classificação dos órgãos (Hely Lopes Meirelles)</h3>
<ul><li><b>Independentes</b>: previstos na Constituição, no topo de cada Poder (Presidência, Congresso, tribunais).</li><li><b>Autônomos</b>: logo abaixo, com autonomia administrativa e financeira (ministérios, secretarias).</li><li><b>Superiores</b>: poder de direção, sem autonomia (gabinetes, procuradorias).</li><li><b>Subalternos</b>: execução (seções de expediente, portarias).</li></ul>
<h3>As entidades da Administração indireta lado a lado</h3>
<table class="tab"><tr><th></th><th>Autarquia</th><th>Fundação pública</th><th>Empresa pública</th><th>Sociedade de economia mista</th></tr>
<tr><td>Criação</td><td>a lei <b>cria</b></td><td>a lei <b>autoriza</b> (ou cria, se de direito público)</td><td>a lei <b>autoriza</b></td><td>a lei <b>autoriza</b></td></tr>
<tr><td>Personalidade</td><td>direito público</td><td>pública ou privada</td><td>direito privado</td><td>direito privado</td></tr>
<tr><td>Capital</td><td>—</td><td>patrimônio afetado a um fim</td><td>100% público</td><td>maioria do capital votante pública</td></tr>
<tr><td>Forma</td><td>—</td><td>—</td><td>qualquer forma admitida</td><td><b>sempre S.A.</b></td></tr>
<tr><td>Foro (federal)</td><td>Justiça Federal</td><td>Justiça Federal</td><td>Justiça Federal</td><td><b>Justiça Estadual</b></td></tr></table>
<p>Lei complementar define as áreas de atuação das fundações (CF, art. 37, XIX). A criação de <b>subsidiárias</b> depende de autorização legislativa, que pode ser genérica na própria lei que autorizou a entidade-mãe (STF, ADI 1.649).</p>
<h3>Autarquias especiais</h3>
<ul><li><b>Agências reguladoras</b>: autarquias de regime especial, com dirigentes de <b>mandato fixo</b> (Lei 13.848/2019: 5 anos, vedada a recondução), o que lhes dá autonomia reforçada.</li><li><b>Agências executivas</b>: não são nova entidade, mas uma <b>qualificação</b> dada por decreto a autarquia ou fundação que celebre <b>contrato de gestão</b> e tenha plano estratégico de reestruturação.</li><li><b>Associações públicas</b>: consórcios públicos de direito público (Lei 11.107/2005) integram a Administração indireta de <b>todos</b> os entes consorciados. O consórcio nasce de um <b>protocolo de intenções</b> ratificado por lei de cada ente.</li></ul>
<h3>Terceiro setor: os instrumentos certos</h3>
<table class="tab"><tr><th>Entidade</th><th>Lei</th><th>Instrumento</th><th>Qualificação</th></tr>
<tr><td>Organização Social (OS)</td><td>9.637/1998</td><td><b>contrato de gestão</b></td><td>discricionária</td></tr>
<tr><td>OSCIP</td><td>9.790/1999</td><td><b>termo de parceria</b></td><td>vinculada</td></tr>
<tr><td>Organização da sociedade civil (MROSC)</td><td>13.019/2014</td><td><b>termo de colaboração</b> (proposta da Administração), <b>termo de fomento</b> (proposta da OSC), <b>acordo de cooperação</b> (sem repasse de dinheiro)</td><td>chamamento público</td></tr></table>
${dica('<b>OS</b> → <b>G</b>estão (contrato de Gestão). <b>OSCIP</b> → <b>P</b>arceria (termo de Parceria). Ordem alfabética: G vem antes de P, e a Lei das OS (1998) vem antes da das OSCIP (1999).')}
${peg('Os <b>serviços sociais autônomos</b> (Sistema S: SESI, SENAI, SESC) não integram a Administração indireta e <b>não precisam fazer concurso público</b> (STF, RE 789.874), embora prestem contas ao TCU.')}`),
    quiz: [
      C('Na descentralização por outorga, transferem-se, por lei, a titularidade e a execução do serviço.', 'Na delegação, só a execução.'),
      E('Na descentralização há hierarquia entre o ente central e a entidade criada.', 'Há controle finalístico (tutela), não hierarquia.'),
      C('As agências executivas são autarquias ou fundações qualificadas por decreto após celebrarem contrato de gestão.', 'Qualificação, não nova entidade.'),
      E('A OSCIP firma contrato de gestão com o poder público.', 'A OSCIP firma termo de parceria; contrato de gestão é da OS.'),
      C('A Câmara Municipal, embora sem personalidade jurídica, pode demandar em juízo para defender seus direitos institucionais.', 'Súmula 525 do STJ.'),
    ],
  },

  poderes: {
    html: A(`
<h3>Poder-dever</h3>
<p>Os poderes administrativos são <b>instrumentais</b>: existem para atingir o interesse público e, por isso, são também <b>deveres</b>. O agente não pode deixar de exercê-los quando a lei exige (omissão também é abuso). São irrenunciáveis.</p>
<h3>Poder hierárquico em detalhe</h3>
<p>Dá ao superior a prerrogativa de <b>dar ordens, fiscalizar, rever, delegar e avocar</b>. Só existe <b>dentro da mesma pessoa jurídica</b>; entre a União e uma autarquia federal não há hierarquia, há supervisão ministerial.</p>
<table class="tab"><tr><th>Delegação (Lei 9.784, arts. 11 a 14)</th><th>Avocação (art. 15)</th></tr>
<tr><td>Transfere parte da competência a outro órgão ou agente, <b>mesmo sem subordinação hierárquica</b></td><td>Superior chama para si competência do subordinado</td></tr>
<tr><td>Ato publicado, com limites e duração; <b>revogável a qualquer tempo</b></td><td><b>excepcional e temporária</b>, por motivos relevantes devidamente justificados</td></tr>
<tr><td>A decisão tomada por delegação considera-se editada pelo <b>delegado</b></td><td>—</td></tr></table>
${box('O que NÃO pode ser delegado (art. 13)', '<ol><li>edição de <b>atos de caráter normativo</b>;</li><li>decisão de <b>recursos administrativos</b>;</li><li>matérias de competência <b>exclusiva</b> do órgão ou da autoridade.</li></ol><b>Macete: NO-RE-EX</b> (NOrmativos, REcursos, EXclusiva).')}
<h3>Poder disciplinar</h3>
<p>Apura infrações e aplica penalidades a quem tem <b>vínculo especial</b> com a Administração: servidores, mas também particulares contratados (empresa punida por inexecução) e alunos de escola pública. Há discricionariedade na <b>escolha e dosagem</b> da sanção dentro do que a lei permite, mas <b>não</b> na decisão de apurar: se soube da infração, a autoridade é obrigada a apurar (Lei 8.112, art. 143).</p>
<h3>Poder regulamentar (normativo)</h3>
<ul><li><b>Decreto regulamentar ou executivo</b> (CF, art. 84, IV): fiel execução da lei; não inova, não cria direitos nem obrigações. É privativo do Chefe do Executivo e <b>indelegável</b>.</li><li><b>Decreto autônomo</b> (art. 84, VI): organização e funcionamento da administração federal <b>sem aumento de despesa nem criação ou extinção de órgãos</b>, e extinção de funções ou cargos <b>vagos</b>. Esse pode ser delegado a ministros, ao PGR e ao AGU (parágrafo único).</li><li>Se o regulamento extrapola a lei, o <b>Congresso pode sustá-lo</b> (art. 49, V).</li></ul>
<h3>Poder de polícia: o ciclo e a delegação</h3>
${passos([['Ordem de polícia', 'a norma que limita (lei e regulamento) — indelegável'], ['Consentimento', 'licença, autorização, alvará'], ['Fiscalização', 'vistoria, radar, blitz'], ['Sanção', 'multa, interdição, apreensão']])}
${box('STF, Tema 532 (RE 633.782)', 'É constitucional delegar as fases de <b>consentimento, fiscalização e sanção</b> do poder de polícia a pessoas jurídicas de direito privado da Administração indireta, de <b>capital social majoritariamente público</b>, que prestem <b>exclusivamente serviço público</b> de atuação própria do Estado e em <b>regime não concorrencial</b>. A fase de <b>ordem</b> continua indelegável. A delegação a particulares comuns segue proibida.')}
<p><b>Atributos</b> do poder de polícia: <b>discricionariedade</b> (em regra; a licença é vinculada), <b>autoexecutoriedade</b> (a Administração executa sem ordem judicial; mas a <b>multa</b> não é autoexecutória na cobrança: se não for paga, precisa de execução fiscal) e <b>coercibilidade</b>.</p>
${ex('A Vigilância Sanitária de Belo Vale encontra carne estragada num açougue: pode apreendê-la e inutilizá-la na hora (autoexecutoriedade). Já a multa aplicada, se não for paga, será inscrita em dívida ativa e cobrada em juízo.')}
<h3>Polícia administrativa × polícia judiciária</h3>
<table class="tab"><tr><th>Administrativa</th><th>Judiciária</th></tr><tr><td>incide sobre <b>bens, direitos e atividades</b></td><td>incide sobre <b>pessoas</b></td></tr><tr><td>regida pelo Direito Administrativo; preventiva em regra</td><td>regida pelo Processo Penal; repressiva (apura crimes)</td></tr><tr><td>órgãos diversos (Vigilância, trânsito, Procon)</td><td>Polícia Civil e Federal</td></tr></table>
<p>A prescrição da ação punitiva da Administração federal no exercício do poder de polícia é de <b>5 anos</b> (Lei 9.873/1999).</p>
${peg('O policial rodoviário que multa um motorista exerce <b>polícia administrativa</b>. Se, na mesma abordagem, prende em flagrante por embriaguez ao volante, atua em apoio à repressão penal. A natureza depende da <b>finalidade</b> do ato, não do órgão.')}`),
    quiz: [
      C('A decisão de recursos administrativos não pode ser objeto de delegação.', 'Lei 9.784, art. 13, II.'),
      E('A delegação de competência só é possível entre órgãos hierarquicamente subordinados.', 'Art. 12: cabe delegação mesmo sem subordinação hierárquica.'),
      C('Segundo o STF, a fase de ordem de polícia é indelegável a pessoas jurídicas de direito privado.', 'Tema 532.'),
      E('A multa decorrente do poder de polícia é autoexecutória também quanto à sua cobrança forçada.', 'Se não paga, exige execução fiscal.'),
      C('O decreto autônomo pode dispor sobre a extinção de cargos públicos vagos.', 'CF, art. 84, VI, b.'),
    ],
  },

  atos: {
    html: A(`
<h3>Os cinco elementos (requisitos) com o que cada um admite</h3>
<table class="tab"><tr><th>Elemento</th><th>Pergunta</th><th>Natureza</th><th>Vício e consequência</th></tr>
<tr><td><b>Competência</b></td><td>quem pode?</td><td>vinculado</td><td>excesso de poder, usurpação, função de fato; convalidável se não for exclusiva</td></tr>
<tr><td><b>Finalidade</b></td><td>para quê?</td><td>vinculado</td><td>desvio de finalidade; <b>não</b> se convalida</td></tr>
<tr><td><b>Forma</b></td><td>como se exterioriza?</td><td>vinculado</td><td>convalidável se a forma não for essencial</td></tr>
<tr><td><b>Motivo</b></td><td>por quê? (fato + direito)</td><td>vinculado ou discricionário</td><td>motivo inexistente ou falso; <b>não</b> se convalida</td></tr>
<tr><td><b>Objeto</b></td><td>o que o ato produz?</td><td>vinculado ou discricionário</td><td>objeto ilícito ou impossível; não se convalida (admite conversão)</td></tr></table>
${dica('<b>COFIFOMOB</b>. Os que podem ser convalidados são os dois “<b>FO</b>”rtes de fora: <b>CO</b>mpetência e <b>FO</b>rma (“<b>CO-FO</b> convalida”).')}
<h3>Motivo × motivação e a teoria dos motivos determinantes</h3>
<p><b>Motivo</b> é o fato e o fundamento que levam ao ato (existe sempre). <b>Motivação</b> é a <b>exposição escrita</b> desse motivo. A Lei 9.784 (art. 50) exige motivação quando o ato nega, limita ou afeta direitos, impõe deveres ou sanções, decide processos seletivos, dispensa licitação, decide recursos, deixa de aplicar jurisprudência ou anula, revoga, suspende ou convalida outro ato.</p>
<p>Pela <b>teoria dos motivos determinantes</b>, uma vez declarado, o motivo vincula o ato: se for falso ou inexistente, o ato é nulo, mesmo que a motivação nem fosse obrigatória.</p>
${ex('A exoneração de servidor ocupante de cargo em comissão é “ad nutum” e dispensa motivação. Mas se o prefeito escreve “exonero por falta de verba” e depois nomeia outra pessoa para o mesmo cargo, o ato pode ser anulado: o motivo declarado era falso.')}
<h3>Atributos: PATI</h3>
<ul><li><b>Presunção de legitimidade e veracidade</b>: presente em <b>todos</b> os atos; é relativa (admite prova em contrário) e inverte o ônus da prova.</li><li><b>Autoexecutoriedade</b>: só quando a lei prevê ou em urgência.</li><li><b>Tipicidade</b>: o ato deve corresponder a figura definida em lei.</li><li><b>Imperatividade</b>: impõe obrigações independentemente da concordância; não existe nos atos <b>negociais</b> (licença, autorização) nem nos <b>enunciativos</b> (certidões).</li></ul>
<h3>Classificações que caem</h3>
<table class="tab"><tr><th>Ato</th><th>Conceito</th><th>Exemplo</th></tr>
<tr><td><b>Simples</b></td><td>uma única vontade (de órgão singular ou colegiado)</td><td>decisão de um conselho</td></tr>
<tr><td><b>Complexo</b></td><td>duas ou mais vontades de <b>órgãos diferentes</b> se fundem para formar <b>um só ato</b></td><td>nomeação de ministro do STF (Presidente + Senado); aposentadoria (órgão + Tribunal de Contas, segundo o STF)</td></tr>
<tr><td><b>Composto</b></td><td>uma vontade principal e outra <b>acessória</b> que a confirma, no mesmo órgão</td><td>ato que depende de visto ou aprovação da chefia</td></tr></table>
<h3>Espécies</h3>
<ul><li><b>Normativos</b>: decretos, regulamentos, resoluções.</li><li><b>Ordinatórios</b>: organizam o serviço interno (portarias, ordens de serviço, circulares).</li><li><b>Negociais</b>: atendem a pedido do particular. <b>Licença</b> é vinculada e definitiva (licença para construir). <b>Autorização</b> é discricionária e precária (porte de arma). <b>Permissão</b> de uso é discricionária e precária.</li><li><b>Enunciativos</b>: atestam ou opinam (certidões, atestados, pareceres).</li><li><b>Punitivos</b>: multas, interdições.</li></ul>
<h3>Formas de extinção</h3>
<table class="tab"><tr><th>Forma</th><th>Motivo</th><th>Quem</th><th>Efeitos</th></tr>
<tr><td><b>Anulação</b></td><td>ilegalidade</td><td>Administração ou Judiciário</td><td><b>ex tunc</b>; prazo de 5 anos para atos favoráveis, salvo má-fé (Lei 9.784, art. 54)</td></tr>
<tr><td><b>Revogação</b></td><td>conveniência e oportunidade</td><td>só a Administração que praticou o ato</td><td><b>ex nunc</b>; respeita direitos adquiridos</td></tr>
<tr><td><b>Cassação</b></td><td>o beneficiário descumpriu as condições</td><td>Administração</td><td>ex nunc</td></tr>
<tr><td><b>Caducidade</b></td><td>lei nova tornou o ato incompatível</td><td>—</td><td>ex nunc</td></tr>
<tr><td><b>Contraposição</b></td><td>novo ato com efeitos opostos (exoneração extingue nomeação)</td><td>Administração</td><td>ex nunc</td></tr></table>
${box('Não podem ser revogados', 'atos <b>vinculados</b>, atos já <b>consumados</b> (que exauriram seus efeitos), atos que geraram <b>direito adquirido</b>, atos <b>enunciativos</b> e atos integrantes de procedimento quando já houve preclusão.')}
${peg('O Judiciário também revoga atos — mas apenas os <b>seus próprios</b> atos administrativos (ex.: o Tribunal revoga uma licitação que ele mesmo abriu). Atos do Executivo, o Judiciário só <b>anula</b>.')}
<p><b>Silêncio administrativo</b>: em regra não é ato, é um fato jurídico. Só produz efeito (deferimento ou indeferimento) quando a lei expressamente prevê.</p>`),
    quiz: [
      C('Os vícios de competência não exclusiva e de forma não essencial são, em regra, convalidáveis.', 'Lei 9.784, art. 55 e doutrina.'),
      E('A imperatividade está presente em todos os atos administrativos.', 'Não existe nos atos negociais e enunciativos.'),
      C('Pela teoria dos motivos determinantes, o motivo declarado vincula o ato, ainda que a motivação fosse dispensável.', 'Exemplo clássico: exoneração ad nutum com motivo falso.'),
      E('O Poder Judiciário pode revogar atos administrativos do Poder Executivo por motivo de conveniência.', 'Só anula atos ilegais; revoga apenas os próprios.'),
      C('A licença é ato vinculado; a autorização é ato discricionário e precário.', 'Classificação dos atos negociais.'),
    ],
  },

  agentes: {
    html: A(`
<h3>Quem é agente público</h3>
${cartoes([['🏛', 'Agentes políticos', 'chefes do Executivo, ministros e secretários, parlamentares, magistrados e membros do MP (segundo parte da doutrina)', COR.azul], ['🧑‍💼', 'Agentes administrativos', 'servidores estatutários, empregados públicos (CLT) e temporários (CF, art. 37, IX)', COR.verde], ['🤝', 'Particulares em colaboração', 'mesários, jurados (honoríficos); concessionários (delegados); médico conveniado do SUS (credenciados)', COR.roxo]])}
<h3>Cargo, emprego e função</h3>
<ul><li><b>Cargo</b>: lugar criado por lei, com atribuições e remuneração, ocupado por servidor <b>estatutário</b>. Pode ser efetivo (concurso) ou em comissão (livre nomeação, só para direção, chefia e assessoramento).</li><li><b>Emprego</b>: vínculo <b>celetista</b> (empresas públicas, sociedades de economia mista).</li><li><b>Função de confiança</b>: atribuições de direção, chefia e assessoramento exercidas <b>só por servidor efetivo</b> (art. 37, V).</li></ul>
<h3>Regras constitucionais que mais caem</h3>
<ul><li><b>Concurso</b>: validade de até 2 anos, prorrogável uma vez por igual período (art. 37, III); durante a prorrogação o aprovado tem prioridade sobre novos concursados (IV).</li><li><b>Acumulação</b> (art. 37, XVI), só com compatibilidade de horários: dois cargos de <b>professor</b>; um de professor com outro <b>técnico ou científico</b>; dois de <b>profissionais de saúde</b> com profissão regulamentada. A proibição alcança autarquias, fundações, empresas públicas e sociedades de economia mista (XVII).</li><li><b>Teto</b> (XI): nos Municípios, o subsídio do <b>prefeito</b>. Nos casos de acumulação lícita, o STF entende que o teto incide sobre <b>cada vínculo isoladamente</b>.</li><li><b>Estabilidade</b> (art. 41): após <b>3 anos de efetivo exercício</b> em cargo efetivo, com <b>avaliação especial de desempenho</b> por comissão.</li></ul>
${box('Como o servidor estável perde o cargo', '<ol><li>sentença judicial <b>transitada em julgado</b>;</li><li>processo administrativo com <b>ampla defesa</b>;</li><li><b>avaliação periódica de desempenho</b>, na forma de lei complementar, com ampla defesa;</li><li><b>excesso de despesa com pessoal</b> (art. 169, §4º), depois de cortar 20% dos cargos em comissão e funções de confiança e exonerar os não estáveis.</li></ol>')}
<h3>Lei 8.112/1990: o caminho do servidor</h3>
${passos([['Nomeação', 'ato de provimento'], ['Posse', 'em até 30 dias da publicação; sem posse, o ato fica sem efeito'], ['Exercício', 'em até 15 dias da posse; sem exercício, exoneração'], ['Estágio probatório', 'avaliação de assiduidade, disciplina, iniciativa, produtividade e responsabilidade']])}
<p><b>Formas de provimento</b> (art. 8º): nomeação, promoção, readaptação, reversão, aproveitamento, reintegração e recondução. <b>Formas de vacância</b> (art. 33): exoneração, demissão, promoção, readaptação, aposentadoria, posse em outro cargo inacumulável e falecimento. Promoção e readaptação aparecem nas duas listas.</p>
<table class="tab"><tr><th>Forma</th><th>Quem volta e por quê</th></tr>
<tr><td><b>Reintegração</b></td><td>servidor estável cuja <b>demissão foi invalidada</b>; volta com ressarcimento de todas as vantagens</td></tr>
<tr><td><b>Recondução</b></td><td>estável que volta ao cargo anterior por <b>inabilitação no estágio</b> de outro cargo ou pela reintegração do antigo ocupante</td></tr>
<tr><td><b>Reversão</b></td><td><b>aposentado</b> que retorna (por invalidez cessada ou no interesse da Administração)</td></tr>
<tr><td><b>Aproveitamento</b></td><td>servidor em <b>disponibilidade</b> que volta a cargo compatível</td></tr>
<tr><td><b>Readaptação</b></td><td>servidor com <b>limitação física ou mental</b> vai para cargo compatível</td></tr></table>
<h3>Penalidades e prazos (arts. 127 e 142)</h3>
<table class="tab"><tr><th>Penalidade</th><th>Prescrição da ação disciplinar</th></tr>
<tr><td>Advertência</td><td>180 dias</td></tr>
<tr><td>Suspensão (até 90 dias)</td><td>2 anos</td></tr>
<tr><td>Demissão, cassação de aposentadoria ou disponibilidade, destituição de cargo em comissão</td><td>5 anos</td></tr></table>
<p>O prazo conta da data em que o fato se tornou <b>conhecido</b>. A abertura de sindicância ou PAD <b>interrompe</b> a prescrição.</p>
<h3>Sindicância e PAD</h3>
<ul><li><b>Sindicância</b>: pode resultar em arquivamento, advertência ou suspensão de <b>até 30 dias</b>, ou em instauração de PAD. Prazo: 30 dias, prorrogáveis por igual período.</li><li><b>PAD</b>: obrigatório para suspensão acima de 30 dias, demissão, cassação e destituição. Conduzido por comissão de <b>3 servidores estáveis</b>. Prazo: <b>60 dias</b>, prorrogáveis por igual período. Fases: instauração → inquérito (instrução, defesa e relatório) → julgamento.</li><li><b>Afastamento preventivo</b>: até 60 dias, prorrogável por igual prazo, <b>sem prejuízo da remuneração</b>.</li></ul>
${box('Independência das instâncias (arts. 121 a 126)', 'O servidor responde civil, penal e administrativamente, e as sanções podem se acumular. A absolvição criminal só afasta a responsabilidade administrativa quando nega a <b>existência do fato</b> ou a <b>autoria</b>. Absolvição por falta de provas não impede a punição administrativa.')}
${peg('Para os servidores de <b>Belo Vale</b>, a lei que vale é o <b>Estatuto municipal (LC 1.173/2006)</b>, e não a Lei 8.112, que é federal. As ideias são parecidas, mas prazos e nomes podem mudar. Na prova de Procurador, compare com o tópico de Legislação Municipal.')}`),
    quiz: [
      C('É permitida a acumulação remunerada de um cargo de professor com outro técnico ou científico, havendo compatibilidade de horários.', 'CF, art. 37, XVI, b.'),
      E('A reversão é o retorno do servidor em disponibilidade a cargo de atribuições compatíveis.', 'Isso é aproveitamento; reversão é o retorno do aposentado.'),
      C('Segundo a Lei 8.112/1990, prescreve em 180 dias a ação disciplinar quanto à advertência.', 'Art. 142, III.'),
      E('A absolvição criminal por insuficiência de provas impede a aplicação de sanção administrativa pelo mesmo fato.', 'Só a negativa do fato ou da autoria repercute.'),
      C('A comissão do PAD é composta por três servidores estáveis.', 'Lei 8.112, art. 149.'),
    ],
  },

  licitacoes: {
    html: A(`
<h3>Quem se submete à Lei 14.133/2021</h3>
<p>Administração direta, autárquica e fundacional de todos os entes. As <b>empresas estatais</b> seguem a sua própria lei (<b>Lei 13.303/2016</b>). A Lei 8.666/1993, a do pregão (10.520/2002) e a do RDC foram <b>revogadas</b> e deixaram de ser usadas no fim de 2023.</p>
<h3>As cinco modalidades (art. 28)</h3>
<table class="tab"><tr><th>Modalidade</th><th>Para quê</th><th>Critério de julgamento</th></tr>
<tr><td><b>Pregão</b></td><td>bens e serviços <b>comuns</b> (inclusive serviços comuns de engenharia)</td><td>menor preço ou maior desconto</td></tr>
<tr><td><b>Concorrência</b></td><td>bens e serviços especiais, obras e serviços de engenharia</td><td>menor preço, melhor técnica ou conteúdo artístico, técnica e preço, maior retorno econômico, maior desconto</td></tr>
<tr><td><b>Concurso</b></td><td>trabalho técnico, científico ou artístico</td><td>melhor técnica ou conteúdo artístico, com prêmio ou remuneração</td></tr>
<tr><td><b>Leilão</b></td><td>alienação de imóveis ou de móveis inservíveis ou legalmente apreendidos</td><td>maior lance</td></tr>
<tr><td><b>Diálogo competitivo</b></td><td>objetos inovadores ou complexos em que a Administração não sabe definir sozinha a solução</td><td>diálogo com licitantes previamente selecionados</td></tr></table>
${peg('<b>Convite</b> e <b>tomada de preços</b> não existem mais. Também é proibido criar outras modalidades ou combinar as existentes (art. 28, §2º).')}
<h3>As fases, na ordem (art. 17)</h3>
${passos([['Preparatória', 'estudo técnico preliminar, termo de referência, orçamento, análise de riscos'], ['Divulgação do edital', 'publicação no Portal Nacional de Contratações Públicas (PNCP)'], ['Propostas e lances', ''], ['Julgamento', ''], ['Habilitação', 'só do vencedor, em regra'], ['Recursal', 'fase única'], ['Homologação', 'pela autoridade superior']])}
<p>A habilitação vem <b>depois</b> do julgamento; a inversão é possível desde que <b>motivada</b> e prevista no edital. A forma <b>eletrônica</b> é a preferencial; a presencial precisa de justificativa e de gravação em áudio e vídeo.</p>
<h3>Quem conduz</h3>
<p>O <b>agente de contratação</b>, servidor efetivo ou empregado público dos quadros permanentes, designado pela autoridade. No pregão, ele é chamado de <b>pregoeiro</b>. Quando o objeto é especial, pode haver <b>comissão de contratação</b> de no mínimo 3 membros; no diálogo competitivo, a comissão é obrigatória.</p>
<h3>Contratação direta: dispensa × inexigibilidade</h3>
${cartoes([['🚫', 'Inexigibilidade (art. 74)', 'a competição é INVIÁVEL. Rol exemplificativo', COR.verm], ['✋', 'Dispensa (art. 75)', 'a competição seria possível, mas a lei libera. Rol taxativo', COR.azul], ['📜', 'Licitação dispensada (art. 76)', 'alienação de bens em hipóteses legais; a própria lei afasta', COR.cinza]])}
<ul><li><b>Inexigibilidade</b>: fornecedor exclusivo; artista consagrado pela crítica ou pelo público (contratado diretamente ou por empresário exclusivo); serviços técnicos especializados de natureza predominantemente intelectual com profissional ou empresa de <b>notória especialização</b> (vedada para publicidade e divulgação); credenciamento; imóvel cujas características tornem necessária sua escolha.</li><li><b>Dispensa</b>: valores baixos (a lei previa R$ 100 mil para obras e serviços de engenharia e manutenção de veículos e R$ 50 mil para os demais; os valores são <b>atualizados todo ano por decreto</b>); emergência ou calamidade (contrato de até 1 ano, vedada a prorrogação e a recontratação da mesma empresa); licitação deserta ou fracassada; entre outros.</li></ul>
${ex('Belo Vale quer contratar um show de um cantor sertanejo famoso para a festa da cidade: <b>inexigibilidade</b> (artista consagrado). Quer comprar resmas de papel: licitação por <b>pregão</b>, ou <b>dispensa</b> se o valor for baixo.')}
<h3>Princípios (art. 5º) e instrumentos auxiliares</h3>
<p>Além dos clássicos, a lei lista: planejamento, transparência, segregação de funções, vinculação ao edital, julgamento objetivo, competitividade, celeridade, economicidade, desenvolvimento nacional sustentável e as disposições da LINDB. <b>Instrumentos auxiliares</b> (art. 78): credenciamento, pré-qualificação, procedimento de manifestação de interesse, <b>sistema de registro de preços</b> e registro cadastral.</p>
${box('Microempresas e EPP (LC 123/2006)', 'Têm preferência em caso de <b>empate ficto</b>: propostas até <b>10%</b> acima da melhor (<b>5%</b> no pregão) são consideradas empatadas, e a ME/EPP pode cobrir a oferta. Também podem regularizar a documentação fiscal depois da habilitação.')}
${banca('A banca costuma trocar: “pregão para obras” (errado, salvo serviço comum de engenharia), “leilão com critério menor preço” (errado: maior lance), “inexigibilidade com rol taxativo” (errado: exemplificativo).')}`),
    quiz: [
      C('A Lei 14.133/2021 extinguiu as modalidades convite e tomada de preços e criou o diálogo competitivo.', 'Art. 28.'),
      E('Na Lei 14.133/2021, a fase de habilitação precede, como regra, a de julgamento.', 'A regra é julgamento antes da habilitação.'),
      C('O rol de hipóteses de inexigibilidade de licitação é exemplificativo.', 'O art. 74 fala em “em especial”.'),
      E('Na contratação emergencial por dispensa, o contrato pode ser prorrogado sucessivamente enquanto durar a emergência.', 'Prazo máximo de 1 ano, vedada a prorrogação.'),
      C('O leilão é a modalidade para alienação de bens imóveis ou de bens móveis inservíveis ou legalmente apreendidos.', 'Critério: maior lance.'),
    ],
  },

  contratos: {
    html: A(`
<h3>O que torna o contrato “administrativo”</h3>
<p>A Administração participa com <b>supremacia</b>: o contrato tem <b>cláusulas exorbitantes</b>, que seriam ilícitas num contrato entre particulares. Em troca, o contratado tem direito ao <b>equilíbrio econômico-financeiro</b>.</p>
${box('Prerrogativas da Administração (art. 104)', '<ol><li><b>modificar</b> unilateralmente o contrato, respeitados os direitos do contratado;</li><li><b>extinguir</b> unilateralmente nos casos da lei;</li><li><b>fiscalizar</b> a execução;</li><li><b>aplicar sanções</b>;</li><li><b>ocupar provisoriamente</b> bens e pessoal do contratado, nos serviços essenciais, para apurar falhas.</li></ol>As cláusulas <b>econômico-financeiras</b> não podem ser alteradas sem concordância do contratado.')}
<h3>Alterações unilaterais (art. 125)</h3>
<table class="tab"><tr><th>Situação</th><th>Limite</th></tr><tr><td>Acréscimos ou supressões em obras, serviços ou compras</td><td>até <b>25%</b> do valor inicial atualizado</td></tr><tr><td>Reforma de edifício ou equipamento</td><td>acréscimos até <b>50%</b></td></tr></table>
<p>Supressões acima desses limites só por <b>acordo</b> entre as partes.</p>
<h3>Os quatro mecanismos de equilíbrio</h3>
<table class="tab"><tr><th>Mecanismo</th><th>Quando</th></tr>
<tr><td><b>Reajuste</b> em sentido estrito</td><td>correção por índice previsto no contrato, com periodicidade <b>anual</b>, contada da data do orçamento estimado</td></tr>
<tr><td><b>Repactuação</b></td><td>serviços contínuos com <b>dedicação exclusiva de mão de obra</b>: recalcula custos (convenção coletiva)</td></tr>
<tr><td><b>Revisão</b> (reequilíbrio)</td><td>fatos <b>imprevisíveis</b> ou previsíveis de consequências incalculáveis: força maior, caso fortuito, fato do príncipe, fato da Administração</td></tr>
<tr><td><b>Atualização monetária</b></td><td>pagamento em atraso</td></tr></table>
${cartoes([['👑', 'Fato do príncipe', 'ato geral do Estado que atinge o contrato de forma indireta (ex.: aumento de tributo)', COR.roxo], ['🏛', 'Fato da Administração', 'ação ou omissão da própria contratante que atinge diretamente o contrato (ex.: não entregar o terreno da obra)', COR.azul], ['🌪', 'Caso fortuito e força maior', 'eventos imprevisíveis e inevitáveis (enchente, pandemia)', COR.verde]])}
<h3>Duração</h3>
<ul><li>Regra: o prazo do edital, considerando a disponibilidade de créditos orçamentários.</li><li><b>Serviços e fornecimentos contínuos</b>: até <b>5 anos</b>, com prorrogações até <b>10 anos</b> (arts. 106 e 107).</li><li>Contratos que geram <b>receita</b> ou de eficiência: até <b>10 anos</b> sem investimento e até <b>35 anos</b> com investimento (art. 110).</li><li>É vedado contrato por prazo <b>indeterminado</b>, salvo quando a Administração é usuária de serviço público em regime de monopólio (água, energia).</li></ul>
<h3>Sanções ao contratado (art. 156)</h3>
<table class="tab"><tr><th>Sanção</th><th>Alcance e prazo</th></tr>
<tr><td>Advertência</td><td>infrações leves</td></tr>
<tr><td>Multa</td><td>de 0,5% a 30% do valor do contrato; pode ser cumulada com as demais</td></tr>
<tr><td>Impedimento de licitar e contratar</td><td>no <b>ente</b> que aplicou, por até <b>3 anos</b></td></tr>
<tr><td>Declaração de inidoneidade</td><td>em <b>todos os entes</b>, de <b>3 a 6 anos</b></td></tr></table>
<h3>Garantias (arts. 96 a 102)</h3>
<p>Caução em dinheiro ou títulos, seguro-garantia ou fiança bancária, à escolha do contratado. Até <b>5%</b> do valor, podendo chegar a <b>10%</b> com justificativa; em obras de grande vulto, seguro-garantia de até <b>30%</b> com cláusula de retomada (a seguradora assume a obra).</p>
<h3>E se a Administração não paga?</h3>
<p>Atraso superior a <b>2 meses</b> nos pagamentos dá ao contratado o direito de pedir a extinção do contrato ou de <b>suspender</b> o cumprimento das obrigações até a normalização (art. 137, §§2º e 3º). É uma forma mitigada da <b>exceção do contrato não cumprido</b>.</p>
${box('Convênios', 'No convênio os interesses são <b>comuns</b> (as partes querem o mesmo resultado), não opostos como no contrato. Por isso, em regra, não há licitação. A Lei 14.133 se aplica aos convênios <b>no que couber</b> (art. 184).')}
${peg('Os limites de 25% e 50% valem para alterações <b>unilaterais</b> quantitativas. A banca costuma dizer que “a Administração pode suprimir 40% unilateralmente” — errado; acima de 25%, só por acordo.')}`),
    quiz: [
      C('A Administração pode alterar unilateralmente o contrato para acréscimos de até 25% do valor inicial em obras, serviços ou compras.', 'Lei 14.133, art. 125.'),
      E('A declaração de inidoneidade impede o contratado de licitar apenas no ente que aplicou a sanção.', 'Alcança todos os entes; o impedimento é que fica restrito ao ente.'),
      C('O aumento de um tributo que eleva os custos do contratado é exemplo de fato do príncipe.', 'Ato geral do Estado com reflexo indireto no contrato.'),
      E('Os contratos de serviços contínuos podem durar por prazo indeterminado.', 'Até 5 anos, prorrogáveis até 10.'),
      C('A repactuação aplica-se a serviços contínuos com dedicação exclusiva de mão de obra.', 'Lei 14.133, art. 135.'),
    ],
  },
};
