// Direito Constitucional — PEC da Segurança Pública (PEC 18/2025).
// Texto aprovado pela Câmara em 4/3/2026 e pelo Senado em 3/11/2026, sem alterações; aguardando promulgação.
// Quando promulgada, trocar STATUS pelo número da Emenda Constitucional.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, C, E } from './blocos.js';

const STATUS = 'aprovada pela Câmara (4/3/2026) e pelo Senado (3/11/2026) sem alterações · aguardando promulgação';
const P = (t) => `<h3 class="lt-aula lt-pec">🆕 PEC da Segurança Pública</h3><p class="lt-pec-st"><b>Situação:</b> ${STATUS}. A emenda entra em vigor na data da publicação. Até lá, vale o texto atual; mas as bancas costumam cobrar a novidade assim que ela é promulgada.</p>${t}`;

export const PEC = {
  'defesa-estado': {
    html: P(`
<h3>O que muda no art. 144</h3>
<p>O novo <i>caput</i> diz que a segurança pública, dever do Estado, direito e responsabilidade de todos, é exercida em <b>regime de cooperação federativa</b>, por meio da atuação <b>integrada e descentralizada</b> dos órgãos da lista.</p>
<table class="tab"><tr><th>Órgão</th><th>Antes</th><th>Com a PEC</th></tr>
<tr><td>Polícia Ferroviária Federal (III)</td><td>órgão próprio, nunca estruturado</td><td><b>revogada</b>; os profissionais da segurança ferroviária vão para a <b>PRF</b>, com direito de opção</td></tr>
<tr><td><b>PRF</b> (§2º)</td><td>patrulhamento ostensivo das <b>rodovias</b> federais</td><td>policiamento ostensivo das <b>rodovias, ferrovias e hidrovias</b> federais, ressalvadas as competências das Forças Armadas</td></tr>
<tr><td><b>Polícia Federal</b> (§1º, I)</td><td>infrações contra bens, serviços e interesses da União</td><td>inclui expressamente o <b>meio ambiente</b> e as infrações de repercussão interestadual ou internacional, como as de <b>organizações criminosas e milícias privadas</b>, sem prejuízo das polícias estaduais e do MP</td></tr>
<tr><td><b>Polícias penais</b> (§5º-A)</td><td>segurança dos estabelecimentos penais</td><td>órgãos de <b>natureza civil</b>, estruturados em carreira, com <b>custódia, ordem, disciplina e segurança</b> dos estabelecimentos penais</td></tr>
<tr><td><b>Polícias municipais</b> (VII e §8º-A)</td><td>não existiam</td><td>novo órgão do art. 144</td></tr></table>
${box('Novas missões da PRF (§2º-A)', 'O emprego da PRF poderá ser autorizado ou determinado pela União, nos termos da lei, para:<ol><li>policiamento ostensivo na proteção de <b>bens, serviços e instalações federais</b> e de interesse da União (ressalvados os sob administração militar);</li><li><b>auxílio</b> aos órgãos de segurança estaduais ou distritais, quando <b>requerido pelos Governadores</b>;</li><li>atuação em cooperação no SUSP em <b>calamidade pública ou desastre</b>.</li></ol>')}
<h3>Polícias municipais (§8º-A)</h3>
<p>Os Municípios <b>poderão</b> constituir polícias municipais, de <b>natureza civil</b>, organizadas em carreira, para <b>policiamento ostensivo e comunitário</b>.</p>
${passos([['Acreditação', 'periódica, pelo Conselho Estadual de Segurança Pública e Defesa Social, conforme padronização nacional em lei federal'], ['Município elegível', 'capacidade financeira com receita própria; se já tem guarda, cumprir integralmente a lei do §8º; formação nos parâmetros nacionais; pactuação de integração do policiamento'], ['Sem sobreposição', 'é vedado ter, no mesmo Município, dois órgãos municipais de segurança com atribuições sobrepostas'], ['Quadro', 'só por concurso público ou pela transformação dos cargos da guarda que já cumprir o §8º-A (art. 2º da PEC)']])}
<ul><li>Guardas e polícias municipais ficam sujeitas ao <b>controle externo do Ministério Público</b> (§8º-B).</li><li>Os entes que tiverem guardas ou polícias municipais devem instituir <b>ouvidorias</b> com autonomia (§14).</li></ul>
<h3>Outras novidades do art. 144</h3>
<ul><li><b>§5º-B</b>: aos órgãos do <b>sistema socioeducativo</b> dos Estados e do DF cabem a segurança e a gestão das unidades socioeducativas.</li><li><b>§6º</b>: PMs e bombeiros (forças auxiliares e reserva do Exército) subordinam-se, com as polícias civis, penais e o socioeducativo, aos <b>Governadores</b>.</li><li><b>§11 e §12</b>: a União institui o <b>Fundo Nacional de Segurança Pública</b> e o <b>Fundo Penitenciário Nacional</b> e repassa <b>50%</b> de cada um a Estados e DF, como transferência obrigatória, sem convênio.</li><li><b>§13</b>: a responsabilidade funcional dos profissionais é apurada por <b>corregedorias com autonomia</b>.</li><li><b>§15</b>: competências comuns a todos os órgãos: enviar ao Judiciário, por sistema eletrônico, o registro das <b>infrações de menor potencial ofensivo</b>; conduzir o preso em flagrante ou por mandado à polícia judiciária; conduzir quem descumpre medida cautelar, protetiva, disciplinar ou socioeducativa.</li></ul>
<h3>SUSP e Sistema de Políticas Penais</h3>
${cartoes([['🔗', 'Art. 144-A: SUSP', 'cooperação federativa para prevenção, persecução e execução penal; força-tarefa (com participação do MP), interoperabilidade de sistemas, compartilhamento de informações; atos da força-tarefa valem em todo o território de atuação', COR.azul], ['🔐', 'Art. 144-B: Políticas Penais', 'custódia, ordem, disciplina, correição, reeducação e integração social dos apenados; a polícia penal aloca e transfere presos, exerce polícia administrativa na execução penal, aplica o regime disciplinar e opera tecnologias de segurança', COR.verde]])}
<p>Pelo art. 144-A, §3º, a investidura em cargos de segurança pública e inteligência terá requisitos especiais, como <b>pesquisa social e exame psicológico</b>. E os órgãos dos incisos I a VI devem prevenir e reprimir as infrações de <b>organizações criminosas, milícias privadas e contra o meio ambiente</b> (§5º).</p>
${dica('PRF com a PEC: “<b>RO-FE-HI</b>” — ROdovias, FErrovias e HIdrovias federais.')}
${peg('A PEC <b>não</b> transforma automaticamente as guardas em polícias. O Município <b>pode</b> criar a polícia municipal se cumprir os requisitos, e a guarda só é transformada se já atender ao §8º-A. Também <b>não</b> reduziu a maioridade penal: o Senado separou essas emendas para outra PEC.')}`),
    quiz: [
      C('Segundo o texto da PEC da Segurança Pública aprovado pelo Congresso, a PRF passa a exercer o policiamento ostensivo das rodovias, ferrovias e hidrovias federais.', 'Novo art. 144, §2º.'),
      E('A PEC da Segurança Pública transforma automaticamente todas as guardas municipais em polícias municipais.', 'É faculdade do Município, com requisitos; a transformação de cargos só ocorre para guarda que já cumpra o §8º-A.'),
      C('Pelo texto da PEC, as guardas e as polícias municipais estão sujeitas ao controle externo do Ministério Público.', 'Novo §8º-B.'),
      E('Pelo texto da PEC, a polícia municipal terá natureza militar.', 'Natureza civil.'),
      C('A PEC prevê que a União repasse a Estados e DF 50% dos recursos do Fundo Nacional de Segurança Pública, independentemente de convênio.', 'Novo §12.'),
      E('A PEC mantém a Polícia Ferroviária Federal como órgão autônomo do art. 144.', 'O inciso III é revogado; o pessoal vai para a PRF.'),
    ],
  },

  'direitos-individuais': {
    html: P(`
<h3>Novos incisos do art. 5º</h3>
<ul><li><b>XLVI-A</b>: a lei definirá as atividades próprias de <b>organizações criminosas de alta periculosidade</b> (comando ou facção, organização paramilitar, milícia privada) e disciplinará <b>sanções mais gravosas e regime legal especial</b> para integrantes e líderes, proporcionais à posição hierárquica, e para autores de crimes de alta lesividade com violência ou grave ameaça, em especial contra a vida e a dignidade sexual de mulheres, crianças e adolescentes. A lei deverá tratar, entre outros pontos, de:<ul><li>prisão em estabelecimento de <b>segurança máxima</b>, se necessário em RDD;</li><li>restrição ou vedação de <b>progressão de regime, liberdade provisória</b> (inclusive na audiência de custódia) e <b>acordo de não persecução penal</b>, em razão de reiteração e perigo da liberdade;</li><li>restrição ou vedação de penas alternativas, sursis, livramento condicional, remição e <b>saída temporária</b>;</li><li>medidas cautelares patrimoniais e <b>expropriação sem indenização</b> de bens ligados às atividades criminosas;</li><li>responsabilização da <b>pessoa jurídica</b> envolvida e proteção ao <b>noticiante</b> (denunciante).</li></ul></li>
<li><b>LXXX</b>: às <b>vítimas</b> de infração penal é assegurada tutela judicial efetiva: proteção, informação, assistência, acesso à justiça e participação no processo penal, especialmente às mulheres.</li>
<li><b>LXXXI</b>: a pena será imposta e executada com o rigor necessário para a justiça à vítima, a reparação do dano e a proteção da sociedade.</li></ul>
${peg('O inciso XLVI-A é norma de eficácia <b>limitada</b>: ele manda a <b>lei</b> definir e disciplinar. Sozinho, não veda progressão nem saída temporária de ninguém.')}`),
    quiz: [
      C('O texto da PEC da Segurança Pública assegura às vítimas de infração penal direitos à proteção, à informação, à assistência, ao acesso à justiça e à participação no processo penal.', 'Novo art. 5º, LXXX.'),
      E('O novo inciso XLVI-A do art. 5º, previsto na PEC, veda diretamente, sem necessidade de lei, a progressão de regime aos integrantes de facções.', 'Remete à lei.'),
    ],
  },

  nacionalidade: {
    html: P(`
<h3>Nova hipótese de suspensão dos direitos políticos (art. 15, III-A)</h3>
<p>A PEC acrescenta a <b>prisão provisória, durante o período de recolhimento</b>, às hipóteses de perda ou suspensão dos direitos políticos. Hoje só a <b>condenação criminal transitada em julgado</b> suspende; com a emenda, o preso provisório também fica com os direitos políticos suspensos enquanto estiver recolhido.</p>`),
    quiz: [C('O texto da PEC da Segurança Pública inclui a prisão provisória, durante o recolhimento, entre as hipóteses de suspensão dos direitos políticos.', 'Novo art. 15, III-A.')],
  },

  uniao: {
    html: P(`
<h3>Competências que entram com a PEC</h3>
<table class="tab"><tr><th>Artigo</th><th>Novidade</th></tr>
<tr><td>22 (privativa da União)</td><td>XXII: competência da <b>polícia federal e da polícia rodoviária federal</b>; XXXI: <b>normas gerais da atividade de inteligência</b></td></tr>
<tr><td>23 (comum)</td><td>XIII: prover os meios para a segurança pública e defesa social; XIV: instituir <b>conselhos de segurança pública</b> (colegiados permanentes e consultivos); XV: estabelecer políticas e planos de segurança, ouvidos os conselhos</td></tr>
<tr><td>24 (concorrente)</td><td>XVII: <b>segurança pública e defesa social</b>; XVIII: forças-tarefa; XIX: organização, competências, formação, garantias, direitos e deveres das <b>polícias e das guardas municipais</b>; XX: órgãos do sistema socioeducativo</td></tr></table>
${peg('Segurança pública passa a ser competência <b>concorrente</b> (art. 24): a União edita normas gerais e os Estados suplementam. Lembre que o art. 24 não inclui os Municípios, mas a competência <b>comum</b> do art. 23 inclui.')}`),
    quiz: [C('Pelo texto da PEC da Segurança Pública, segurança pública e defesa social passam a figurar entre as matérias de competência legislativa concorrente.', 'Novo art. 24, XVII.')],
  },

  legislativo: {
    html: P(`
<h3>Novas competências exclusivas do Congresso (art. 49)</h3>
<ul><li><b>V-A</b>: sustar atos normativos do <b>CNJ e do CNMP</b> que exorbitem do poder regulamentar ou dos limites da delegação, em matéria de segurança pública, direito penal, processual penal e penitenciário.</li><li><b>X-A</b>: fiscalizar e controlar a <b>atividade de inteligência</b>.</li></ul>`),
    quiz: [C('O texto da PEC da Segurança Pública permite ao Congresso sustar atos normativos do CNJ que exorbitem do poder regulamentar em matéria penal.', 'Novo art. 49, V-A.')],
  },

  executivo: {
    html: P(`<p>Nova atribuição privativa do Presidente: <b>fixar a Política Nacional de Inteligência</b> (art. 84, XXIX).</p>`),
    quiz: [],
  },

  judiciario: {
    html: P(`<p>O CNJ continua podendo expedir atos regulamentares, mas o novo art. 103-B, §4º, I, <b>veda a adoção de medidas que atentem contra as competências do Congresso Nacional</b>. A mesma ressalva vale para o <b>CNMP</b> (art. 130-A, §2º, I).</p>`),
    quiz: [],
  },

  'administracao-publica': {
    html: P(`<p>Novo art. 40, §7º: a pensão por morte ou invalidez dos servidores será concedida nos termos da lei do respectivo ente, que poderá tratar de forma <b>mais favorável</b> a morte dos servidores da segurança pública (os do §4º-B) <b>decorrente do exercício da função ou em razão dela</b>.</p>`),
    quiz: [],
  },
};
