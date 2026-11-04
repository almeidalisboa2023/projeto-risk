// Leitura R.I.S.K. — Direito Administrativo (cobre PRF 2021 e Procurador/Belo Vale 2026). Texto original.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, juris, banca, C, E } from './blocos.js';
import { PARTE2 } from './administrativo2.js';
import { AULA1 } from './administrativo-aula1.js';
import { AULA2 } from './administrativo-aula2.js';
const AULA = { ...AULA1, ...AULA2 };
import { Q1 } from './administrativo-q1.js';
import { Q2 } from './administrativo-q2.js';
const BANCO = { ...Q1, ...Q2 };

const PARTE1 = [
  {
    id: 'conceito-principios', titulo: 'Conceito, fontes, regime jurídico e princípios', arts: 'CF, art. 37 · LINDB, arts. 20 a 30',
    chaves: ['principios da administracao', 'regime juridico-administrativo', 'conceito de administracao publica', 'fontes do direito administrativo', 'criterios adotados para a conceituacao', 'lei de introducao as normas', 'regime juridico administrativo', 'principios'],
    html: `
<h3>O que é o Direito Administrativo</h3>
<p>É o ramo do direito público que disciplina a <b>função administrativa</b> e os órgãos, entidades e agentes que a exercem. A expressão “Administração Pública” tem dois sentidos:</p>
${cartoes([['🏢', 'Sentido subjetivo (orgânico, formal)', 'quem administra: órgãos, entidades e agentes', COR.azul], ['⚙️', 'Sentido objetivo (material, funcional)', 'a atividade: serviço público, polícia, fomento e intervenção', COR.verde]])}
<h3>Fontes</h3>
<p><b>Lei</b> (fonte primária) · <b>jurisprudência</b> · <b>doutrina</b> · <b>costumes</b> (secundárias). Regulamentos, instruções e regimentos são atos infralegais que executam a lei. As súmulas vinculantes do STF obrigam a Administração.</p>
<h3>Regime jurídico-administrativo: as duas pedras de toque</h3>
${cartoes([['⬆️', 'Supremacia do interesse público', 'gera prerrogativas: cláusulas exorbitantes, desapropriação, autoexecutoriedade', COR.verm], ['🔒', 'Indisponibilidade do interesse público', 'gera sujeições: licitação, concurso, controle, motivação', COR.roxo]])}
<h3>Princípios expressos (art. 37): LIMPE</h3>
<table class="tab"><tr><th>Princípio</th><th>O que exige</th><th>Exemplo</th></tr>
<tr><td><b>Legalidade</b></td><td>a Administração só faz o que a lei <b>autoriza</b> (o particular pode tudo o que a lei não proíbe)</td><td>multa só com previsão legal</td></tr>
<tr><td><b>Impessoalidade</b></td><td>finalidade pública, sem favorecimentos; atos são do órgão, não do agente</td><td>proibida promoção pessoal em publicidade (art. 37, §1º)</td></tr>
<tr><td><b>Moralidade</b></td><td>ética, boa-fé, probidade</td><td>vedação ao nepotismo (SV 13)</td></tr>
<tr><td><b>Publicidade</b></td><td>transparência e condição de eficácia dos atos, salvo sigilo legal</td><td>publicação no diário oficial; Lei de Acesso à Informação</td></tr>
<tr><td><b>Eficiência</b></td><td>resultado, qualidade e economicidade (EC 19/1998)</td><td>avaliação periódica de desempenho do servidor</td></tr></table>
<h3>Princípios implícitos mais cobrados</h3>
<ul><li><b>Autotutela</b>: a Administração <b>anula</b> seus atos ilegais e <b>revoga</b> os inconvenientes (Súmula 473 do STF).</li><li><b>Razoabilidade e proporcionalidade</b>: adequação, necessidade e proporcionalidade em sentido estrito.</li><li><b>Motivação</b>: indicar os fatos e fundamentos jurídicos (Lei 9.784, art. 50).</li><li><b>Segurança jurídica e proteção da confiança</b>: estabilidade das relações; prazo de 5 anos para anular atos favoráveis (Lei 9.784, art. 54).</li><li><b>Continuidade do serviço público</b>.</li></ul>
${box('LINDB e o Direito Administrativo (arts. 20 a 30)', '<ul><li>Não se decide com base em <b>valores jurídicos abstratos</b> sem considerar as <b>consequências práticas</b> da decisão (art. 20).</li><li>Na interpretação, consideram-se os <b>obstáculos e as dificuldades reais</b> do gestor (art. 22).</li><li>O agente público responde pessoalmente por decisões e opiniões técnicas só em caso de <b>dolo ou erro grosseiro</b> (art. 28).</li><li>Mudança de interpretação deve prever <b>regime de transição</b> (art. 23).</li></ul>')}
${juris('<ul><li><b>Súmula Vinculante 13</b>: viola a Constituição a nomeação de cônjuge, companheiro ou parente até o <b>3º grau</b> da autoridade nomeante ou de servidor em cargo de direção, chefia ou assessoramento, para cargo em comissão ou função de confiança, inclusive por ajuste mediante designações recíprocas (nepotismo cruzado). O STF ressalva cargos de natureza <b>política</b> (ex.: secretários), salvo fraude ou falta de qualificação.</li><li><b>Súmula 473 do STF</b>: a Administração pode anular seus atos ilegais e revogar os inconvenientes ou inoportunos, respeitados os direitos adquiridos e ressalvada a apreciação judicial.</li></ul>')}
${dica('<b>LIMPE</b> = Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência.')}
${peg('Legalidade para a Administração é <b>restrita</b> (só o que a lei permite); para o particular é <b>ampla</b> (tudo o que a lei não proíbe). A banca costuma inverter.')}`,
    quiz: [C('Pelo princípio da legalidade, a Administração Pública só pode fazer o que a lei autoriza.', 'Legalidade estrita para a Administração.'), E('A nomeação de primo do prefeito para cargo em comissão de assessor viola a Súmula Vinculante 13.', 'Primo é parente de 4º grau; a SV 13 alcança até o 3º grau.'), C('Segundo a LINDB, o agente público responde pessoalmente por suas decisões ou opiniões técnicas em caso de dolo ou erro grosseiro.', 'Art. 28 da LINDB.')],
  },
  {
    id: 'organizacao', titulo: 'Organização administrativa: Administração direta, indireta e terceiro setor', arts: 'DL 200/1967 · Leis 13.303/2016, 11.107/2005, 9.637/1998, 9.790/1999 e 13.019/2014',
    chaves: ['organizacao administrativa', 'centralizacao, descentralizacao', 'administracao direta e indireta', 'autarquias', 'empresas publicas', 'consorcios publicos', 'terceiro setor', 'teoria do orgao', 'concentracao e desconcentracao'],
    html: `
<h3>Desconcentração x descentralização (a pergunta nº 1)</h3>
<table class="tab"><tr><th></th><th>Desconcentração</th><th>Descentralização</th></tr>
<tr><td>O que surge</td><td><b>órgãos</b> (sem personalidade jurídica)</td><td><b>entidades</b> (com personalidade jurídica) ou particulares</td></tr>
<tr><td>Relação</td><td><b>hierarquia</b></td><td><b>vinculação / controle finalístico</b> (supervisão ministerial), sem hierarquia</td></tr>
<tr><td>Exemplo</td><td>Ministério → Secretarias; PRF dentro do Ministério da Justiça</td><td>União cria o INSS (autarquia); concessão de rodovia a empresa privada</td></tr></table>
<p>A descentralização pode ser por <b>outorga</b> (ou por serviço: a lei cria a entidade e transfere a titularidade e a execução) ou por <b>delegação</b> (ou por colaboração: contrato ou ato transfere só a execução, como na concessão).</p>
${box('Teoria do órgão (imputação)', '<p>A vontade do agente é <b>imputada</b> ao órgão e, por meio dele, à pessoa jurídica. Por isso o cidadão processa o <b>ente</b> (União, Estado, Município), e não o órgão. Exceção: órgãos independentes e autônomos podem ter <b>capacidade judiciária</b> para defender suas prerrogativas (ex.: Câmara Municipal).</p>')}
<h3>Administração indireta</h3>
<table class="tab"><tr><th>Entidade</th><th>Criação</th><th>Regime</th><th>Detalhes</th></tr>
<tr><td><b>Autarquia</b></td><td><b>criada</b> por lei específica</td><td>direito público</td><td>atividade típica de Estado; bens públicos; prerrogativas processuais. Ex.: INSS, Ibama, DNIT</td></tr>
<tr><td><b>Fundação pública</b></td><td>lei <b>autoriza</b> (de direito privado) ou cria (de direito público, a “autarquia fundacional”)</td><td>público ou privado</td><td>lei complementar define as áreas de atuação. Ex.: Funai, IBGE</td></tr>
<tr><td><b>Empresa pública</b></td><td>lei <b>autoriza</b></td><td>direito privado</td><td>capital <b>100% público</b>; qualquer forma societária. Ex.: Caixa, Correios</td></tr>
<tr><td><b>Sociedade de economia mista</b></td><td>lei <b>autoriza</b></td><td>direito privado</td><td>sempre <b>S.A.</b>; maioria do capital votante do ente. Ex.: Banco do Brasil, Petrobras</td></tr></table>
<ul><li><b>Agências reguladoras</b>: autarquias em regime especial, com dirigentes de mandato fixo (Lei 13.848/2019). Ex.: ANTT, Anatel.</li><li><b>Agências executivas</b>: qualificação dada a autarquia ou fundação que celebra <b>contrato de gestão</b> com o ministério supervisor.</li><li>Estatais (Lei 13.303/2016) seguem regras próprias de licitação e governança; as que exploram atividade econômica não têm privilégios fiscais não extensíveis ao setor privado (CF, art. 173).</li></ul>
<h3>Consórcios públicos (Lei 11.107/2005)</h3>
<p>Associação de entes federativos para objetivos comuns. Podem ser <b>associação pública</b> (direito público, integra a Administração indireta de todos os consorciados) ou pessoa jurídica de <b>direito privado</b>. Formam-se por <b>protocolo de intenções</b> ratificado por lei de cada ente. As obrigações de um ente para com o consórcio constam do <b>contrato de programa</b>.</p>
<h3>Terceiro setor e serviços sociais autônomos</h3>
${cartoes([['🤝', 'OS (Lei 9.637/1998)', 'qualificação pelo Poder Executivo · <b>contrato de gestão</b>', COR.azul], ['📜', 'OSCIP (Lei 9.790/1999)', 'qualificação pelo Ministério da Justiça · <b>termo de parceria</b>', COR.verde], ['🧩', 'OSC (Lei 13.019/2014)', '<b>termo de colaboração</b> (proposta da Administração), <b>termo de fomento</b> (proposta da OSC) ou <b>acordo de cooperação</b> (sem recursos)', COR.lar], ['🏭', 'Sistema S', 'Sesi, Senai, Sesc, Senac: pessoas privadas, sem fins lucrativos, com contribuições parafiscais; não precisam de concurso', COR.roxo]])}
${juris('<ul><li><b>STF</b>: os Correios (empresa pública prestadora de serviço público em regime de exclusividade) têm imunidade tributária recíproca e seus bens são impenhoráveis.</li><li><b>STF (ADI 1923)</b>: é constitucional o modelo das OS; a contratação delas pode dispensar licitação, observados os princípios do art. 37.</li><li><b>STF</b>: entidades do Sistema S não estão obrigadas a fazer concurso público.</li></ul>')}
${dica('Empresa pública: capital “<b>100% público</b>, qualquer forma”. Sociedade de economia mista: “<b>S.A.</b>, maioria votante pública”. Autarquia e fundação de direito público são <b>criadas</b> por lei; as demais são <b>autorizadas</b>.')}
${peg('Na desconcentração há <b>hierarquia</b>; na descentralização há só <b>controle finalístico</b> (tutela). Ministério não é “chefe” do INSS: ele o supervisiona.')}`,
    quiz: [C('A criação de órgãos dentro de uma mesma pessoa jurídica caracteriza desconcentração, com relação de hierarquia.', 'Desconcentração gera órgãos e hierarquia.'), E('A sociedade de economia mista pode adotar qualquer forma societária, desde que o capital seja majoritariamente público.', 'Ela é sempre sociedade anônima.'), C('Autarquias são criadas por lei específica e têm personalidade jurídica de direito público.', 'CF, art. 37, XIX.')],
  },
  {
    id: 'poderes', titulo: 'Poderes administrativos e abuso de poder', arts: 'CTN, art. 78 · CF, art. 84',
    chaves: ['poderes administrativos', 'poder de policia', 'poder regulamentar', 'poder hierarquico', 'poder disciplinar', 'uso e abuso do poder', 'hierarquia'],
    html: `
<h3>Os poderes são instrumentais</h3>
<p>São prerrogativas dadas à Administração para cumprir o interesse público. Por isso são também <b>deveres</b> (poder-dever): não podem ser renunciados.</p>
${cartoes([['🪜', 'Hierárquico', 'organizar, ordenar, rever, delegar e avocar dentro da mesma pessoa', COR.azul], ['⚖️', 'Disciplinar', 'apurar e punir infrações de <b>servidores</b> e de quem tem vínculo especial (contratados)', COR.verm], ['📜', 'Regulamentar', 'editar decretos e regulamentos para <b>executar</b> a lei', COR.verde], ['🚓', 'De polícia', 'limitar liberdades e propriedade em favor do interesse coletivo', COR.amar]])}
<h3>Poder hierárquico</h3>
<ul><li><b>Delegação</b>: transferir temporariamente parte da competência, inclusive a quem não é subordinado (Lei 9.784, art. 12).</li><li><b>Avocação</b>: o superior chama para si competência do subordinado, em caráter <b>excepcional e temporário</b>, com motivos relevantes (art. 15).</li><li><b>Indelegáveis</b> (art. 13): edição de <b>atos normativos</b>, decisão de <b>recursos</b> administrativos e matérias de competência <b>exclusiva</b>.</li></ul>
<h3>Poder disciplinar</h3>
<p>Alcança servidores e particulares com <b>vínculo especial</b> com a Administração (contratados, alunos de escola pública). A punição de um particular comum (ex.: multa de trânsito) é poder de <b>polícia</b>, e não disciplinar.</p>
<h3>Poder regulamentar</h3>
<ul><li><b>Decreto de execução</b> (art. 84, IV): detalha a lei, sem inovar.</li><li><b>Decreto autônomo</b> (art. 84, VI): organização da administração federal sem aumento de despesa nem criação ou extinção de órgãos, e extinção de cargos vagos.</li><li>O Congresso pode <b>sustar</b> atos do Executivo que exorbitem do poder regulamentar (CF, art. 49, V).</li></ul>
<h3>Poder de polícia</h3>
<p>Definição legal no <b>art. 78 do CTN</b>: atividade que limita ou disciplina direito, interesse ou liberdade, regulando ato ou abstenção em razão do interesse público (segurança, higiene, ordem, trânsito, costumes). Gera a cobrança de <b>taxa</b>.</p>
${passos([['Ordem de polícia', 'a norma que proíbe ou condiciona (ex.: CTB)'], ['Consentimento', 'licença (vinculada) ou autorização (discricionária)'], ['Fiscalização', 'blitz, vistoria, radar'], ['Sanção', 'multa, interdição, apreensão']])}
${cartoes([['🎚', 'Discricionariedade', 'em regra (licença é vinculada)', COR.cinza], ['⚡', 'Autoexecutoriedade', 'executa sem ordem judicial (nem sempre: multa não paga é cobrada em juízo)', COR.lar], ['💪', 'Coercibilidade', 'impõe-se mesmo contra a vontade do particular', COR.verm]])}
<h3>Abuso de poder</h3>
${cartoes([['📏', 'Excesso de poder', 'o agente vai <b>além</b> da sua competência', COR.lar], ['🎯', 'Desvio de finalidade (de poder)', 'age dentro da competência, mas para fim diverso do interesse público', COR.verm]])}
${juris('<ul><li><b>STF (Tema 532, RE 633.782)</b>: é constitucional delegar, por lei, o poder de polícia a pessoa jurídica de direito privado da Administração indireta, de capital majoritariamente público, que preste exclusivamente serviço público próprio do Estado em regime não concorrencial, quanto às fases de <b>consentimento, fiscalização e sanção</b>. A <b>ordem de polícia</b> é indelegável.</li><li><b>STF (Tema 472)</b>: guardas municipais podem exercer poder de polícia de trânsito, inclusive aplicando multas.</li></ul>')}
${ex('<p>O agente da PRF que multa um condutor por excesso de velocidade exerce poder de <b>polícia</b> (fase de sanção). Se o mesmo agente for suspenso por faltar ao serviço, a Administração exerce poder <b>disciplinar</b> sobre ele.</p>', 'Exemplo prático')}
${peg('Não podem ser delegados: <b>atos normativos</b>, <b>decisão de recursos</b> e competência <b>exclusiva</b> (“<b>NO-RE-EX</b>”). Avocação é <b>excepcional e temporária</b>.')}`,
    quiz: [E('A aplicação de multa de trânsito a um particular é manifestação do poder disciplinar.', 'É poder de polícia; o disciplinar alcança quem tem vínculo especial com a Administração.'), C('Segundo a Lei 9.784/1999, não pode ser objeto de delegação a decisão de recursos administrativos.', 'Art. 13, II.'), C('Ocorre desvio de finalidade quando o agente, embora competente, pratica o ato visando fim diverso do interesse público.', 'É uma das espécies de abuso de poder.')],
  },
  {
    id: 'atos', titulo: 'Atos administrativos: elementos, atributos, classificação e extinção', arts: 'Lei 9.784/1999, arts. 50 a 55 · Lei 4.717/1965, art. 2º',
    chaves: ['ato administrativo', 'atos administrativos', 'fatos da administracao', 'formacao do ato administrativo', 'revogacao, anulacao e convalidacao', 'vicios do ato', 'motivos determinantes', 'teoria das nulidades', 'anulacao e revogacao', 'convalidacao'],
    html: `
<h3>Ato x fato administrativo</h3>
<p><b>Ato</b> é a manifestação de vontade da Administração que produz efeitos jurídicos (ex.: decreto de nomeação). <b>Fato administrativo</b> é acontecimento material sem vontade dirigida a efeito jurídico (ex.: a morte de um servidor, a demolição física de um prédio).</p>
<h3>Elementos (requisitos) do ato: CO-FI-FO-M-OB</h3>
<table class="tab"><tr><th>Elemento</th><th>Pergunta</th><th>Vinculado ou discricionário?</th></tr>
<tr><td><b>Competência</b></td><td>quem pode praticar?</td><td>sempre vinculado</td></tr>
<tr><td><b>Finalidade</b></td><td>para quê? (interesse público)</td><td>sempre vinculado</td></tr>
<tr><td><b>Forma</b></td><td>como se exterioriza?</td><td>em regra vinculado</td></tr>
<tr><td><b>Motivo</b></td><td>por quê? (fato e fundamento jurídico)</td><td>vinculado ou discricionário</td></tr>
<tr><td><b>Objeto</b></td><td>qual o efeito? (conteúdo)</td><td>vinculado ou discricionário</td></tr></table>
<p>O <b>mérito</b> administrativo (juízo de conveniência e oportunidade) está no <b>motivo e no objeto</b> dos atos discricionários. O Judiciário não revê o mérito, mas controla a <b>legalidade</b>, inclusive a razoabilidade e a proporcionalidade.</p>
${box('Teoria dos motivos determinantes', '<p>Se a Administração <b>declara</b> um motivo, fica vinculada a ele: se o motivo for falso ou inexistente, o ato é nulo, mesmo que não precisasse ser motivado. Ex.: exoneração de cargo em comissão (“ad nutum”) motivada por “falta de verba”, quando no dia seguinte outro é nomeado: ato nulo.</p>')}
<h3>Atributos: P-A-T-I</h3>
${cartoes([['✅', 'Presunção de legitimidade e veracidade', 'presume-se legal e verdadeiro até prova em contrário (relativa)', COR.azul], ['⚡', 'Autoexecutoriedade', 'executa sem ordem judicial, quando a lei prevê ou em urgência', COR.lar], ['🏷', 'Tipicidade', 'corresponde a figuras previstas em lei', COR.verde], ['💪', 'Imperatividade', 'impõe obrigações independentemente de concordância', COR.verm]])}
<h3>Classificações importantes</h3>
<ul><li><b>Simples</b> (um órgão), <b>complexo</b> (dois ou mais órgãos formam um único ato, ex.: nomeação de ministro do STF pelo Presidente com aprovação do Senado) e <b>composto</b> (um órgão pratica, outro aprova ou ratifica: ato principal + acessório).</li><li><b>Vinculado</b> (a lei define tudo, ex.: licença para construir) x <b>discricionário</b> (margem de escolha, ex.: autorização de uso de bem público).</li><li><b>Gerais</b> (destinatários indeterminados) x <b>individuais</b>; <b>unilaterais</b> x bilaterais.</li><li>Espécies: normativos (decretos), ordinatórios (portarias, circulares), negociais (licença, autorização, permissão), enunciativos (certidões, pareceres) e punitivos (multas).</li></ul>
<h3>Extinção do ato</h3>
<table class="tab"><tr><th></th><th>Anulação</th><th>Revogação</th></tr>
<tr><td>Motivo</td><td><b>ilegalidade</b></td><td><b>conveniência e oportunidade</b></td></tr>
<tr><td>Quem</td><td>Administração (autotutela) ou Judiciário</td><td>só a Administração que praticou</td></tr>
<tr><td>Efeitos</td><td><b>ex tunc</b> (retroage), ressalvados terceiros de boa-fé</td><td><b>ex nunc</b> (daqui para frente)</td></tr>
<tr><td>Limites</td><td>5 anos para atos favoráveis, salvo má-fé (Lei 9.784, art. 54)</td><td>não se revogam atos vinculados, consumados, que geraram direito adquirido ou meros atos enunciativos</td></tr></table>
<ul><li><b>Cassação</b>: o beneficiário descumpre condições (ex.: licença de bar cassada por funcionar como casa de jogos).</li><li><b>Caducidade</b>: norma posterior torna o ato incompatível.</li><li><b>Contraposição</b>: ato posterior com efeito oposto (ex.: exoneração após nomeação).</li></ul>
<h3>Convalidação (Lei 9.784, art. 55)</h3>
<p>Corrige-se o ato com vício <b>sanável</b>, com efeitos retroativos, se não houver lesão ao interesse público nem prejuízo a terceiros. Vícios sanáveis: <b>competência</b> (não exclusiva) e <b>forma</b> (não essencial). Vícios de finalidade, motivo e objeto, em regra, <b>não</b> se convalidam.</p>
${dica('Elementos: “<b>COFIFOMOB</b>”. Atributos: “<b>PATI</b>”. Convalidam-se “<b>FOCO</b>”: <b>FO</b>rma e <b>CO</b>mpetência.')}
${peg('O Judiciário pode <b>anular</b> ato administrativo ilegal, mas <b>não pode revogá-lo</b> (revogação é juízo de mérito). Só revoga atos do <b>próprio</b> Judiciário, quando atua em função administrativa.')}`,
    quiz: [C('A revogação do ato administrativo produz efeitos ex nunc e só pode ser feita pela própria Administração.', 'Revogação é juízo de conveniência e oportunidade.'), E('Os vícios de finalidade e de motivo são sanáveis e admitem convalidação.', 'Convalidam-se, em regra, os vícios de competência não exclusiva e de forma não essencial.'), C('Pela teoria dos motivos determinantes, a validade do ato fica vinculada aos motivos indicados como seu fundamento.', 'Motivo falso ou inexistente torna o ato nulo.')],
  },
  {
    id: 'agentes', titulo: 'Agentes públicos e Lei 8.112/1990', arts: 'CF, arts. 37 a 41 · Lei 8.112/1990',
    chaves: ['agentes publicos', 'lei no 8.112', 'servidor publico', 'provimento e vacancia', 'estagio probatorio', 'concurso publico', 'regime previdenciario do servidor', 'direitos, deveres e responsabilidades', 'processo administrativo disciplinar'],
    html: `
<h3>Espécies de agentes públicos</h3>
${cartoes([['🏛', 'Agentes políticos', 'chefes do Executivo, parlamentares, ministros, secretários (para parte da doutrina, também juízes e membros do MP)', COR.azul], ['💼', 'Servidores estatutários', 'ocupam <b>cargo</b>; regime legal (Lei 8.112 na União)', COR.verde], ['📄', 'Empregados públicos', 'ocupam <b>emprego</b>; regime CLT (estatais)', COR.lar], ['⏳', 'Temporários', 'contratados por tempo determinado para necessidade excepcional (art. 37, IX)', COR.roxo], ['🙋', 'Particulares em colaboração', 'jurados, mesários, concessionários, honoríficos', COR.cinza]])}
<h3>Regras constitucionais (art. 37)</h3>
<ul><li><b>Concurso público</b> para cargo ou emprego efetivo; validade de até <b>2 anos</b>, prorrogável <b>uma vez</b> por igual período. Durante o prazo improrrogável, o aprovado tem prioridade sobre novos concursados.</li><li><b>Cargos em comissão</b> (livre nomeação e exoneração) só para <b>direção, chefia e assessoramento</b>.</li><li><b>Acumulação</b> vedada, salvo com compatibilidade de horários: dois cargos de <b>professor</b>; um de professor com outro <b>técnico ou científico</b>; dois de <b>profissionais de saúde</b> com profissão regulamentada.</li><li><b>Teto</b> remuneratório: subsídio de ministro do STF (com subtetos nos Estados e Municípios).</li></ul>
<h3>Estabilidade (art. 41)</h3>
<p>Adquire-se após <b>3 anos</b> de efetivo exercício em cargo efetivo, com <b>avaliação especial de desempenho</b> por comissão. O estável só perde o cargo por: <b>sentença judicial transitada</b>, <b>processo administrativo</b> com ampla defesa, <b>avaliação periódica</b> de desempenho (lei complementar) e excesso de despesa com pessoal (art. 169).</p>
<h3>Lei 8.112/1990: provimento e vacância</h3>
<table class="tab"><tr><th>Provimento (art. 8º)</th><th>O que é</th></tr>
<tr><td><b>Nomeação</b></td><td>única forma <b>originária</b>; cargo efetivo (após concurso) ou em comissão</td></tr>
<tr><td><b>Promoção</b></td><td>subir na carreira</td></tr>
<tr><td><b>Readaptação</b></td><td>cargo compatível com limitação física ou mental superveniente</td></tr>
<tr><td><b>Reversão</b></td><td>retorno do <b>aposentado</b></td></tr>
<tr><td><b>Aproveitamento</b></td><td>retorno do servidor em <b>disponibilidade</b></td></tr>
<tr><td><b>Reintegração</b></td><td>retorno do servidor <b>demitido</b> cuja demissão foi anulada</td></tr>
<tr><td><b>Recondução</b></td><td>retorno ao cargo anterior por <b>inabilitação no estágio</b> de outro cargo ou pela reintegração do antigo ocupante</td></tr></table>
<p><b>Vacância</b> (art. 33): exoneração, demissão, promoção, readaptação, aposentadoria, posse em outro cargo inacumulável e falecimento.</p>
${passos([['Nomeação', 'publicação do ato'], ['Posse', 'em até 30 dias da publicação; sem posse, o ato é tornado sem efeito'], ['Exercício', 'em até 15 dias da posse; sem exercício, o servidor é exonerado']])}
<h3>Responsabilidades e penalidades (arts. 121 a 142)</h3>
<ul><li>As responsabilidades <b>civil, penal e administrativa</b> são independentes. A absolvição criminal por <b>inexistência do fato</b> ou <b>negativa de autoria</b> afasta a responsabilidade administrativa (art. 126).</li><li>Penalidades: <b>advertência</b>, <b>suspensão</b> (até 90 dias), <b>demissão</b>, cassação de aposentadoria ou disponibilidade, destituição de cargo em comissão e de função comissionada.</li><li>Prescrição da ação disciplinar: <b>5 anos</b> (demissão, cassação, destituição), <b>2 anos</b> (suspensão) e <b>180 dias</b> (advertência).</li></ul>
${box('Sindicância e PAD', '<ul><li><b>Sindicância</b>: prazo de 30 dias, prorrogável por igual período. Pode resultar em arquivamento, advertência, suspensão de até 30 dias ou instauração de PAD.</li><li><b>PAD</b>: conduzido por comissão de <b>3 servidores estáveis</b>; prazo de 60 dias, prorrogável por igual período. Obrigatório para suspensão acima de 30 dias, demissão, cassação e destituição.</li><li><b>Afastamento preventivo</b>: até 60 dias, prorrogável por igual período, sem prejuízo da remuneração.</li></ul>')}
${juris('<ul><li><b>SV 43</b>: é inconstitucional toda forma de provimento que permita ao servidor investir-se, sem concurso, em cargo que não integra a carreira em que foi investido (ascensão, transferência).</li><li><b>SV 44</b>: só por lei se pode sujeitar a exame psicotécnico a habilitação de candidato.</li><li><b>Súmula 683 do STF</b>: o limite de idade para inscrição em concurso só se legitima quando justificado pela natureza das atribuições do cargo.</li><li><b>STF (Tema 161)</b>: o candidato aprovado <b>dentro do número de vagas</b> tem direito subjetivo à nomeação.</li><li><b>SV 5</b>: a falta de advogado no PAD não ofende a Constituição.</li></ul>')}
${dica('Retornos: “<b>Re</b>versão = <b>Re</b>tirado (aposentado)”; “<b>Re</b>integração = <b>de</b>mitido injustamente”; “<b>A</b>proveitamento = em <b>d</b>isponibilidade”.')}
${peg('A Lei 8.112 diz que o estágio probatório dura 24 meses, mas o STF e o STJ entendem que, após a EC 19/1998, ele acompanha a estabilidade: <b>3 anos</b>.')}`,
    quiz: [C('O prazo de validade do concurso público é de até dois anos, prorrogável uma vez por igual período.', 'CF, art. 37, III.'), E('A reversão é o retorno à atividade do servidor demitido cuja demissão foi invalidada por decisão judicial.', 'Isso é reintegração. Reversão é o retorno do aposentado.'), C('Segundo o STF, o candidato aprovado dentro do número de vagas previsto no edital tem direito subjetivo à nomeação.', 'Tema 161 de repercussão geral.')],
  },
];

export default {
  id: 'administrativo', nome: 'Direito Administrativo', apelidos: ['direito administrativo', 'administrativo', 'administracao publica'],
  lei: 'https://www.planalto.gov.br/ccivil_03/leis/l8112cons.htm',
  atualizado: 'novembro de 2026 · aula completa',
  assuntos: [...PARTE1, ...PARTE2].map((a) => (AULA[a.id] ? { ...a, html: a.html + AULA[a.id].html, quiz: [...(a.quiz || []), ...AULA[a.id].quiz] } : a)).map((a) => ({ ...a, quiz: [...(a.quiz || []), ...(BANCO[a.id] || [])] })),
};
