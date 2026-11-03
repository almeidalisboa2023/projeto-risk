// Direito Constitucional — tópicos novos (parte 1): teoria, princípios fundamentais, organização do Estado,
// Administração Pública e Poder Legislativo. Pedidos pelo edital de Procurador (Belo Vale) e por outros cargos.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, juris, banca, C, E } from './blocos.js';

export const NOVOS1 = [
  {
    id: 'teoria-constituicao', titulo: 'Constitucionalismo, conceito, classificação e aplicabilidade das normas', arts: 'teoria da Constituição · preâmbulo e ADCT',
    chaves: ['constitucionalismo', 'classificacao da constituicao', 'conceito e classificacao', 'aplicabilidade das normas', 'eficacia das normas', 'teoria da constituicao', 'hermeneutica constitucional', 'interpretacao constitucional'],
    html: `
<h3>Em poucas palavras</h3>
<p>Antes de estudar os artigos, a banca quer saber se você entende <b>o que é uma Constituição</b>, <b>como ela é classificada</b> e <b>quanto cada norma produz efeitos</b>. É o tópico mais “teórico” da matéria, mas cai em quase toda prova de nível superior.</p>
<h3>Constitucionalismo</h3>
<p>É o movimento que busca <b>limitar o poder</b> do Estado e <b>garantir direitos</b> por meio de uma Constituição. Marcos históricos: a <b>Magna Carta</b> inglesa (1215), a <b>Constituição dos EUA</b> (1787) e a <b>Constituição francesa</b> (1791), essas duas últimas já escritas e com separação de Poderes.</p>
<p>O <b>neoconstitucionalismo</b>, surgido após a Segunda Guerra, reconhece <b>força normativa</b> à Constituição: ela não é só um documento político, mas norma jurídica que obriga, com centralidade dos <b>direitos fundamentais</b> e da <b>dignidade humana</b> e forte papel do Judiciário.</p>
<h3>As concepções de Constituição</h3>
<table class="tab"><tr><th>Concepção</th><th>Autor</th><th>A Constituição é…</th></tr>
<tr><td><b>Sociológica</b></td><td>Ferdinand Lassalle</td><td>a soma dos <b>fatores reais de poder</b>; o texto escrito que não os reflete é mera “folha de papel”</td></tr>
<tr><td><b>Política</b></td><td>Carl Schmitt</td><td>a <b>decisão política fundamental</b>; separa a Constituição (o essencial) das leis constitucionais (o resto do texto)</td></tr>
<tr><td><b>Jurídica</b></td><td>Hans Kelsen</td><td><b>norma jurídica pura</b>, no topo da pirâmide, fundamento de validade das demais</td></tr>
<tr><td><b>Força normativa</b></td><td>Konrad Hesse</td><td>norma com força própria, capaz de transformar a realidade (resposta a Lassalle)</td></tr></table>
${dica('<b>S</b>ociológica = <b>L</b>assalle (“<b>S</b>oma dos fatores de poder”). <b>P</b>olítica = <b>S</b>chmitt (decisão). <b>J</b>urídica = <b>K</b>elsen (pirâmide).')}
<h3>Classificação da CF/1988</h3>
${cartoes([['✍', 'Escrita', 'documento único e sistematizado', COR.azul], ['🗳', 'Promulgada', 'democrática, feita por Assembleia eleita', COR.verde], ['🧱', 'Rígida', 'alteração por processo mais difícil que o das leis', COR.verm], ['📚', 'Analítica', 'extensa, trata de muitos assuntos', COR.roxo], ['🧭', 'Dirigente', 'traça metas e programas para o Estado', COR.lar], ['⚖', 'Formal e dogmática', 'vale pelo processo de criação; reflete ideias da época', COR.cinza]])}
<p>Quanto à ideologia, é <b>eclética</b> (pluralista). Parte da doutrina (Alexandre de Moraes) a chama de <b>super-rígida</b>, por ter cláusulas pétreas.</p>
<table class="tab"><tr><th>Constituição</th><th>Origem</th><th>Nota</th></tr>
<tr><td>1824</td><td>outorgada</td><td><b>semirrígida</b>; Poder Moderador</td></tr>
<tr><td>1891</td><td>promulgada</td><td>primeira republicana e federativa</td></tr>
<tr><td>1934</td><td>promulgada</td><td>direitos sociais; voto feminino</td></tr>
<tr><td>1937</td><td>outorgada</td><td>“Polaca”, Estado Novo</td></tr>
<tr><td>1946</td><td>promulgada</td><td>redemocratização</td></tr>
<tr><td>1967 (e EC 1/1969)</td><td>outorgada</td><td>regime militar</td></tr>
<tr><td>1988</td><td>promulgada</td><td>“Constituição Cidadã”</td></tr></table>
<h3>Aplicabilidade das normas (José Afonso da Silva)</h3>
<table class="tab"><tr><th>Eficácia</th><th>Aplicabilidade</th><th>O que significa</th><th>Exemplo</th></tr>
<tr><td><b>Plena</b></td><td>direta, imediata e integral</td><td>produz todos os efeitos desde já; lei não pode restringir</td><td>art. 2º (separação dos Poderes); art. 14, §2º</td></tr>
<tr><td><b>Contida</b> (restringível)</td><td>direta, imediata, mas possivelmente não integral</td><td>produz efeitos desde já, mas a <b>lei pode restringir</b></td><td>art. 5º, XIII: livre o exercício de profissão, “atendidas as qualificações que a lei estabelecer” (exame da OAB)</td></tr>
<tr><td><b>Limitada</b></td><td>indireta, mediata</td><td><b>depende de lei</b> para produzir efeitos plenos</td><td>de princípio <b>institutivo</b> (art. 37, VII, greve do servidor) ou <b>programáticas</b> (art. 196, saúde; art. 215, cultura)</td></tr></table>
${ex('A norma de eficácia <b>contida</b> é como uma torneira aberta que a lei pode <b>fechar um pouco</b>. A de eficácia <b>limitada</b> é uma torneira <b>fechada</b> que só a lei abre. Mesmo a limitada tem algum efeito: revoga leis contrárias e serve de parâmetro de controle de constitucionalidade.')}
${box('Outros pontos que caem', '<ul><li><b>Preâmbulo</b>: não tem força normativa e não serve de parâmetro de controle (STF, ADI 2.076). A menção a “Deus” não é de reprodução obrigatória nas Constituições estaduais.</li><li><b>ADCT</b>: tem a mesma hierarquia das demais normas constitucionais e pode ser emendado.</li><li><b>Não há hierarquia</b> entre normas constitucionais originárias, nem norma constitucional originária inconstitucional (STF, ADI 815).</li><li><b>Interpretação conforme a Constituição</b>: entre vários sentidos possíveis de uma lei, escolhe-se o compatível com a Constituição.</li></ul>')}
<h3>Princípios de interpretação constitucional</h3>
<ul><li><b>Unidade</b>: a Constituição é um todo, sem contradições reais.</li><li><b>Máxima efetividade</b>: dar à norma, sobretudo aos direitos fundamentais, o sentido que lhe dê mais eficácia.</li><li><b>Concordância prática (harmonização)</b>: em conflito, nenhum bem é sacrificado totalmente.</li><li><b>Justeza (conformidade funcional)</b>: o intérprete não pode alterar a repartição de funções feita pela Constituição.</li><li><b>Efeito integrador</b>: favorecer a integração política e social.</li><li><b>Força normativa</b>: preferir as soluções que deem atualidade e permanência à Constituição.</li></ul>
${peg('Constituição <b>semirrígida</b> (ou semiflexível) foi a de <b>1824</b>: uma parte exigia processo especial e a outra podia ser alterada por lei comum. A CF/1988 é <b>rígida</b>.')}`,
    quiz: [
      C('Para Ferdinand Lassalle, a Constituição escrita que não corresponde aos fatores reais de poder é apenas uma folha de papel.', 'Concepção sociológica.'),
      E('A Constituição de 1988 é classificada como semirrígida.', 'É rígida; semirrígida foi a de 1824.'),
      C('A norma de eficácia contida tem aplicabilidade direta e imediata, mas pode ter seu alcance restringido por lei.', 'Exemplo: art. 5º, XIII.'),
      E('O preâmbulo da Constituição tem força normativa e serve de parâmetro para o controle de constitucionalidade.', 'STF, ADI 2.076: não tem.'),
      C('As normas programáticas são espécie de norma de eficácia limitada.', 'Ao lado das de princípio institutivo.'),
      E('Segundo o STF, é possível declarar inconstitucional norma constitucional originária.', 'ADI 815: não há hierarquia entre normas originárias.'),
    ],
  },

  {
    id: 'principios-fundamentais', titulo: 'Princípios fundamentais', arts: 'arts. 1º a 4º',
    chaves: ['principios fundamentais', 'fundamentos da republica', 'objetivos fundamentais', 'relacoes internacionais'],
    html: `
<h3>Em poucas palavras</h3>
<p>Os quatro primeiros artigos são o “DNA” da Constituição: dizem <b>como o Estado é organizado</b> (art. 1º), <b>como o poder é dividido</b> (art. 2º), <b>aonde o País quer chegar</b> (art. 3º) e <b>como se relaciona com outros países</b> (art. 4º). A banca troca itens de uma lista para outra.</p>
<h3>Forma, sistema e regime</h3>
${cartoes([['🗺', 'Forma de Estado', 'Federação: união indissolúvel dos Estados, Municípios e DF', COR.azul], ['🏛', 'Forma de governo', 'República', COR.verde], ['👔', 'Sistema de governo', 'Presidencialismo', COR.roxo], ['🗳', 'Regime político', 'Estado Democrático de Direito; democracia semidireta', COR.lar]])}
<p>“Todo o poder emana do <b>povo</b>, que o exerce por meio de <b>representantes eleitos</b> ou <b>diretamente</b>, nos termos desta Constituição” (art. 1º, parágrafo único). O exercício direto ocorre por <b>plebiscito, referendo e iniciativa popular</b> (art. 14). A forma republicana e o presidencialismo foram confirmados pelo <b>plebiscito de 1993</b>.</p>
<h3>Fundamentos (art. 1º)</h3>
${dica('<b>SO-CI-DI-VA-PLU</b>: <b>SO</b>berania, <b>CI</b>dadania, <b>DI</b>gnidade da pessoa humana, <b>VA</b>lores sociais do trabalho e da livre iniciativa, <b>PLU</b>ralismo político.')}
<h3>Separação dos Poderes (art. 2º)</h3>
<p>São Poderes da União, <b>independentes e harmônicos</b> entre si, o Legislativo, o Executivo e o Judiciário. Cada um tem funções <b>típicas</b> e <b>atípicas</b>, e o sistema de <b>freios e contrapesos</b> permite o controle recíproco (veto, rejeição de veto, controle de constitucionalidade, julgamento do Presidente pelo Senado).</p>
<h3>Objetivos fundamentais (art. 3º): começam com verbos</h3>
<ol><li><b>Construir</b> uma sociedade livre, justa e solidária;</li><li><b>Garantir</b> o desenvolvimento nacional;</li><li><b>Erradicar</b> a pobreza e a marginalização e <b>reduzir</b> as desigualdades sociais e regionais;</li><li><b>Promover</b> o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.</li></ol>
${dica('Objetivos: <b>CON-GA-ERRA-PRO</b> (Construir, Garantir, Erradicar, Promover). Se a frase começa com verbo de ação, é objetivo. Se é um substantivo (soberania, cidadania), é fundamento.')}
<h3>Princípios das relações internacionais (art. 4º)</h3>
<table class="tab"><tr><th>Grupo</th><th>Princípios</th></tr>
<tr><td>Soberania</td><td><b>independência nacional</b>; <b>igualdade entre os Estados</b>; <b>não intervenção</b>; <b>autodeterminação dos povos</b></td></tr>
<tr><td>Paz</td><td><b>defesa da paz</b>; <b>solução pacífica dos conflitos</b></td></tr>
<tr><td>Direitos humanos</td><td><b>prevalência dos direitos humanos</b>; <b>repúdio ao terrorismo e ao racismo</b>; <b>concessão de asilo político</b></td></tr>
<tr><td>Cooperação</td><td><b>cooperação entre os povos para o progresso da humanidade</b></td></tr></table>
<p>Parágrafo único: o Brasil buscará a <b>integração econômica, política, social e cultural dos povos da América Latina</b>, visando à formação de uma comunidade latino-americana de nações.</p>
${box('Onde a banca troca', '<ul><li>“Dignidade da pessoa humana é objetivo fundamental” → <b>errado</b>: é fundamento.</li><li>“Erradicar a pobreza” → objetivo (art. 3º), não fundamento.</li><li>“Concessão de asilo político” → relações internacionais (art. 4º).</li><li>“Valores sociais do trabalho <b>e da livre iniciativa</b>” → os dois juntos formam um único fundamento.</li><li>“Reduzir as desigualdades sociais e regionais” → objetivo. Cuidado: <b>erradicar</b> a pobreza, mas <b>reduzir</b> as desigualdades (e não erradicá-las).</li></ul>')}
${ex('A Lei de Migração e a concessão de refúgio a estrangeiros perseguidos se apoiam na <b>prevalência dos direitos humanos</b> e na <b>concessão de asilo político</b>. Já o princípio da <b>não intervenção</b> explica por que o Brasil não interfere em assuntos internos de outros Estados.')}
${peg('A <b>República</b> não é cláusula pétrea expressa (o art. 60, §4º, não a menciona). O que é cláusula pétrea é a <b>forma federativa</b> de Estado. Mas a forma republicana é <b>princípio sensível</b>: sua violação por um Estado autoriza intervenção federal (art. 34, VII, a).')}`,
    quiz: [
      C('A dignidade da pessoa humana é fundamento da República Federativa do Brasil.', 'Art. 1º, III.'),
      E('Erradicar a pobreza e a marginalização é fundamento da República.', 'É objetivo fundamental (art. 3º, III).'),
      C('A concessão de asilo político é princípio que rege o Brasil nas relações internacionais.', 'Art. 4º, X.'),
      E('É objetivo fundamental da República erradicar as desigualdades sociais e regionais.', 'O verbo é reduzir.'),
      C('O pluralismo político é fundamento da República.', 'Art. 1º, V.'),
      E('A forma republicana de governo é cláusula pétrea expressa.', 'Não consta do art. 60, §4º.'),
    ],
  },

  {
    id: 'organizacao-estado', titulo: 'Organização do Estado: federação, Estados, Municípios, DF e intervenção', arts: 'arts. 18, 19, 25 a 36',
    chaves: ['organizacao do estado', 'organizacao politico-administrativa', 'municipios', 'dos estados federados', 'intervencao federal', 'intervencao', 'federacao', 'distrito federal'],
    html: `
<h3>Em poucas palavras</h3>
<p>O Brasil é uma <b>federação</b>: União, Estados, Distrito Federal e Municípios são <b>autônomos</b>, cada um com seu governo, suas leis e seus tributos. <b>Soberana</b> é só a República Federativa do Brasil. Para o Procurador municipal, este é um dos tópicos mais importantes da matéria.</p>
<h3>Autonomia em quatro capacidades</h3>
${cartoes([['📜', 'Auto-organização', 'cada ente tem sua lei maior: Constituição estadual ou Lei Orgânica', COR.azul], ['🗳', 'Autogoverno', 'elege seus próprios governantes', COR.verde], ['⚙', 'Autoadministração', 'presta seus serviços e gere seu pessoal', COR.roxo], ['✍', 'Autolegislação', 'edita leis sobre suas competências', COR.lar]])}
<h3>Mudanças territoriais (art. 18)</h3>
<table class="tab"><tr><th>Ente</th><th>Requisitos</th></tr>
<tr><td><b>Estados</b> (incorporar-se, subdividir-se, desmembrar-se)</td><td><b>plebiscito</b> com a população diretamente interessada + <b>lei complementar federal</b></td></tr>
<tr><td><b>Municípios</b> (criação, incorporação, fusão, desmembramento)</td><td><b>lei estadual</b>, no período fixado em <b>lei complementar federal</b>, após <b>estudos de viabilidade</b> divulgados e <b>plebiscito</b> com as populações dos Municípios envolvidos</td></tr>
<tr><td><b>Territórios</b></td><td>criação, transformação em Estado ou reintegração ao Estado de origem: lei complementar</td></tr></table>
<p>Como a lei complementar federal do §4º nunca foi editada, a <b>EC 57/2008</b> convalidou os Municípios criados até 31/12/2006.</p>
<h3>Vedações a todos os entes (art. 19)</h3>
<ol><li>estabelecer cultos religiosos ou igrejas, subvencioná-los, embaraçar-lhes o funcionamento ou manter com eles relações de dependência ou aliança, <b>ressalvada a colaboração de interesse público</b>;</li><li>recusar fé aos documentos públicos;</li><li>criar distinções entre brasileiros ou preferências entre si.</li></ol>
<h3>Os Estados (arts. 25 a 28)</h3>
<ul><li>Organizam-se pelas <b>Constituições</b> que adotarem, observados os princípios da CF.</li><li>Têm a competência <b>remanescente</b> (o que não lhes for vedado) e exploram os <b>serviços locais de gás canalizado</b> (vedada MP para regulamentar).</li><li>Podem instituir <b>regiões metropolitanas</b>, aglomerações urbanas e microrregiões por <b>lei complementar estadual</b>.</li><li>Número de deputados estaduais: o <b>triplo</b> da representação na Câmara; atingido o número de 36, soma-se tantos quantos forem os deputados federais acima de 12.</li></ul>
<h3>O Município (arts. 29 a 31)</h3>
${passos([['Lei Orgânica', 'votada em 2 turnos, com interstício mínimo de 10 dias, aprovada por 2/3 dos membros da Câmara, que a promulga'], ['Prefeito e Vice', 'eleição direta; em Municípios com mais de 200 mil eleitores, pode haver 2º turno'], ['Vereadores', 'número proporcional à população; até 15 mil habitantes, no máximo 9'], ['Controle', 'fiscalização pela Câmara, com auxílio do Tribunal de Contas do Estado']])}
${box('Regras do art. 29 que mais caem', '<ul><li><b>Inviolabilidade dos vereadores</b> por suas opiniões, palavras e votos no exercício do mandato e <b>na circunscrição do Município</b> (VIII). Vereador <b>não</b> tem imunidade formal (prisão e processo).</li><li><b>Julgamento do Prefeito</b> perante o <b>Tribunal de Justiça</b> (X) nos crimes comuns.</li><li><b>Iniciativa popular</b> de projetos de lei de interesse do Município, da cidade ou de bairros: <b>5%</b> do eleitorado (XIII).</li><li><b>Subsídio dos vereadores</b>: fixado pela Câmara em cada legislatura <b>para a subsequente</b>, com limite proporcional ao subsídio dos deputados estaduais (até 10 mil habitantes, no máximo 20%).</li><li><b>Subsídios do Prefeito, do Vice e dos Secretários</b>: fixados por <b>lei de iniciativa da Câmara</b>.</li></ul>')}
<p><b>Limites da Câmara (art. 29-A)</b>: em Municípios de até 100 mil habitantes, o total da despesa do Legislativo não pode passar de <b>7%</b> da receita tributária e das transferências do exercício anterior; e a folha de pagamento da Câmara não pode passar de <b>70%</b> da sua receita. É <b>crime de responsabilidade do Prefeito</b> repassar acima do limite, não repassar até o dia <b>20</b> de cada mês ou repassar a menor; e do <b>Presidente da Câmara</b> desrespeitar o limite de 70%.</p>
<h3>Distrito Federal (art. 32)</h3>
<p>Rege-se por <b>Lei Orgânica</b>, é <b>vedada sua divisão em Municípios</b> e acumula as competências legislativas reservadas aos Estados e aos Municípios. As polícias civil, militar e o corpo de bombeiros do DF são <b>organizados e mantidos pela União</b>.</p>
<h3>Intervenção (arts. 34 a 36)</h3>
<p>A regra é a <b>não intervenção</b>. Ela é <b>excepcional</b> e só cabe nas hipóteses taxativas.</p>
<table class="tab"><tr><th>Intervenção federal (União → Estados e DF)</th><th>Intervenção estadual (Estado → Municípios)</th></tr>
<tr><td><ul><li>manter a integridade nacional;</li><li>repelir invasão estrangeira ou de uma unidade em outra;</li><li>pôr termo a grave comprometimento da ordem pública;</li><li>garantir o livre exercício dos Poderes;</li><li>reorganizar as finanças (suspensão da dívida fundada por mais de 2 anos; retenção de receitas dos Municípios);</li><li>prover a execução de lei federal, ordem ou decisão judicial;</li><li>assegurar os <b>princípios sensíveis</b>.</li></ul></td><td><ul><li>deixar de pagar, sem força maior, por 2 anos consecutivos, a dívida fundada;</li><li>não prestar as contas devidas;</li><li>não aplicar o mínimo em <b>ensino e saúde</b>;</li><li>o Tribunal de Justiça der provimento a representação para assegurar princípios da Constituição estadual ou prover a execução de lei, ordem ou decisão judicial.</li></ul></td></tr></table>
${box('Princípios sensíveis (art. 34, VII)', 'forma republicana, sistema representativo e regime democrático; direitos da pessoa humana; <b>autonomia municipal</b>; prestação de contas da administração; aplicação do mínimo da receita de impostos em ensino e saúde. Sua violação exige <b>representação do Procurador-Geral da República</b> ao STF (ADI interventiva).')}
<p><b>Procedimento</b>: o decreto é do <b>Presidente</b> (federal) ou do <b>Governador</b> (estadual), especifica amplitude, prazo e condições e, se for o caso, nomeia o <b>interventor</b>. É submetido ao Congresso ou à Assembleia em <b>24 horas</b>. O controle político é <b>dispensado</b> quando a intervenção decorre de decisão judicial e o decreto se limita a <b>suspender o ato impugnado</b>, se isso bastar.</p>
${peg('A União <b>não intervém</b> diretamente nos Municípios de um Estado. Ela só intervém em Municípios localizados em <b>Território Federal</b>. Nos demais, quem intervém é o <b>Estado</b>.')}`,
    quiz: [
      C('A criação de Municípios depende de lei estadual, de estudos de viabilidade e de plebiscito com as populações dos Municípios envolvidos.', 'Art. 18, §4º.'),
      E('A Lei Orgânica do Município é votada em turno único e aprovada por maioria absoluta da Câmara.', '2 turnos, interstício de 10 dias, 2/3.'),
      C('A inviolabilidade dos vereadores restringe-se às opiniões, palavras e votos no exercício do mandato e na circunscrição do Município.', 'Art. 29, VIII.'),
      E('A União pode intervir diretamente nos Municípios localizados nos Estados.', 'Só nos localizados em Território Federal.'),
      C('A não aplicação do mínimo exigido da receita municipal em ensino e saúde autoriza a intervenção do Estado no Município.', 'Art. 35, III.'),
      E('O Distrito Federal pode ser dividido em Municípios mediante lei complementar.', 'A divisão é vedada (art. 32).'),
      C('Constitui crime de responsabilidade do Prefeito não enviar o repasse à Câmara até o dia 20 de cada mês.', 'Art. 29-A, §2º, II.'),
    ],
  },

  {
    id: 'administracao-publica', titulo: 'Administração Pública na Constituição e servidores públicos', arts: 'arts. 37 a 41 e 169',
    chaves: ['administracao publica', 'servidores publicos', '37, 39, 41', 'art. 37', 'disposicoes gerais da administracao', 'regime juridico unico'],
    html: `
<h3>Em poucas palavras</h3>
<p>Os arts. 37 a 41 trazem as regras que valem para <b>todos os entes</b> sobre acesso a cargos, remuneração, acumulação, estabilidade e aposentadoria do servidor. O art. 169 fixa o limite de gasto com pessoal. É matéria que aparece nas provas de Constitucional <b>e</b> de Administrativo.</p>
<h3>Os incisos do art. 37 em blocos</h3>
<table class="tab"><tr><th>Bloco</th><th>Regra</th></tr>
<tr><td><b>Acesso</b> (I e II)</td><td>cargos acessíveis a brasileiros que preencham os requisitos e a <b>estrangeiros, na forma da lei</b>; investidura por <b>concurso</b> de provas ou de provas e títulos, salvo cargo em comissão</td></tr>
<tr><td><b>Concurso</b> (III e IV)</td><td>validade de até <b>2 anos</b>, prorrogável <b>uma vez</b> por igual período; aprovado tem prioridade sobre novos concursados durante o prazo</td></tr>
<tr><td><b>Confiança</b> (V)</td><td><b>funções de confiança</b> só por servidores efetivos; <b>cargos em comissão</b> preenchidos em percentuais mínimos por efetivos; ambos só para <b>direção, chefia e assessoramento</b></td></tr>
<tr><td><b>Sindicato e greve</b> (VI e VII)</td><td>associação sindical livre; greve nos termos de <b>lei específica</b></td></tr>
<tr><td><b>Inclusão</b> (VIII)</td><td>reserva de vagas para <b>pessoas com deficiência</b></td></tr>
<tr><td><b>Temporários</b> (IX)</td><td>por tempo determinado, para necessidade temporária de <b>excepcional interesse público</b></td></tr>
<tr><td><b>Remuneração</b> (X a XV)</td><td>fixada por <b>lei específica</b>; <b>revisão geral anual</b>, sempre na mesma data e sem distinção de índices; teto; vedada vinculação ou equiparação; irredutibilidade</td></tr>
<tr><td><b>Acumulação</b> (XVI e XVII)</td><td>vedada, salvo dois de professor, professor + técnico ou científico, dois de saúde; alcança toda a Administração indireta</td></tr>
<tr><td><b>Entidades</b> (XIX e XX)</td><td>lei específica <b>cria</b> autarquia e <b>autoriza</b> empresa pública, sociedade de economia mista e fundação</td></tr>
<tr><td><b>Licitação</b> (XXI)</td><td>obras, serviços, compras e alienações, ressalvados os casos da lei</td></tr></table>
<h3>O teto (art. 37, XI)</h3>
${cartoes([['🇧🇷', 'Teto geral', 'subsídio dos Ministros do STF', COR.azul], ['🏛', 'Estados e DF', 'Executivo: Governador; Legislativo: deputados estaduais; Judiciário: desembargadores (90,25% do STF), aplicável também a MP, procuradores e defensores', COR.roxo], ['🏘', 'Municípios', 'subsídio do Prefeito', COR.verde]])}
${juris('<ul><li><b>STF, Tema 510</b>: os <b>procuradores municipais</b> integram a advocacia pública e se submetem ao teto do subsídio dos <b>desembargadores</b> do TJ, e não ao do Prefeito.</li><li><b>STF, ADI 6.053</b>: é constitucional o recebimento de <b>honorários de sucumbência</b> por advogados públicos, desde que a soma com a remuneração respeite o teto.</li><li><b>STF, Temas 377 e 384</b>: na acumulação lícita de cargos, o teto incide sobre <b>cada vínculo</b> isoladamente.</li><li><b>SV 37</b>: não cabe ao Judiciário, que não tem função legislativa, aumentar vencimentos de servidores sob o fundamento de isonomia.</li></ul>')}
<h3>Improbidade, prescrição e responsabilidade (§§4º a 6º)</h3>
<ul><li>Os atos de improbidade importam <b>suspensão dos direitos políticos, perda da função pública, indisponibilidade dos bens e ressarcimento ao erário</b>, sem prejuízo da ação penal (§4º).</li><li>A lei fixa os prazos de prescrição dos ilícitos, ressalvadas as ações de ressarcimento (§5º).</li><li>Responsabilidade objetiva do Estado e das prestadoras de serviço público, com regresso contra o agente em caso de dolo ou culpa (§6º).</li></ul>
<h3>Servidor que assume mandato eletivo (art. 38)</h3>
<table class="tab"><tr><th>Mandato</th><th>Regra</th></tr>
<tr><td>Federal, estadual ou distrital</td><td>fica <b>afastado</b> do cargo</td></tr>
<tr><td><b>Prefeito</b></td><td>afastado, mas pode <b>optar pela remuneração</b> do cargo</td></tr>
<tr><td><b>Vereador</b></td><td>com compatibilidade de horários, <b>acumula</b> e recebe as duas remunerações; sem compatibilidade, aplica-se a regra do Prefeito</td></tr></table>
<p>Em qualquer caso, o tempo de mandato conta para todos os efeitos, <b>exceto promoção por merecimento</b>.</p>
<h3>Regime jurídico, estabilidade e aposentadoria</h3>
<ul><li><b>Regime jurídico</b>: em 2024, o STF validou a redação da EC 19/1998 que acabou com a obrigatoriedade do <b>regime jurídico único</b> (ADI 2.135), com efeitos apenas para o futuro. Os entes podem, por lei, admitir pelo regime estatutário ou pelo celetista.</li><li><b>Subsídio</b>: parcela única, vedado acréscimo de gratificação, adicional ou prêmio (art. 39, §4º); obrigatório para membros de Poder, ministros, secretários e policiais.</li><li><b>Estabilidade</b> (art. 41): 3 anos de efetivo exercício + avaliação especial de desempenho. Invalidada a demissão, o servidor é <b>reintegrado</b> e o ocupante da vaga é reconduzido, aproveitado ou posto em disponibilidade. Extinto o cargo, o estável fica em <b>disponibilidade com remuneração proporcional</b> ao tempo de serviço.</li><li><b>Aposentadoria</b> (art. 40, com a EC 103/2019): compulsória aos <b>75 anos</b>; voluntária com idade mínima que, na União, é de <b>62 anos (mulher) e 65 (homem)</b>. Estados e Municípios fixam suas idades em suas próprias normas.</li></ul>
<h3>Limite de gasto com pessoal (art. 169)</h3>
${passos([['Limite', 'fixado em lei complementar (LRF): Municípios, 60% da receita corrente líquida (54% Executivo e 6% Legislativo)'], ['1º corte', 'reduzir em pelo menos 20% as despesas com cargos em comissão e funções de confiança'], ['2º corte', 'exonerar os servidores não estáveis'], ['3º corte', 'exonerar estáveis, por ato normativo motivado, com indenização de 1 remuneração por ano de serviço; o cargo é extinto e não pode ser recriado por 4 anos']])}
${peg('Funções de confiança: <b>só</b> servidores efetivos. Cargos em comissão: qualquer pessoa, mas a lei reserva <b>percentual mínimo</b> a efetivos. A banca costuma inverter as duas.')}`,
    quiz: [
      C('As funções de confiança são exercidas exclusivamente por servidores ocupantes de cargo efetivo.', 'Art. 37, V.'),
      E('O servidor público eleito vereador será sempre afastado do cargo, podendo optar pela remuneração.', 'Com compatibilidade de horários, acumula.'),
      C('Segundo o STF, os procuradores municipais submetem-se ao teto correspondente ao subsídio dos desembargadores do Tribunal de Justiça.', 'Tema 510.'),
      E('A revisão geral anual da remuneração dos servidores pode adotar índices diferentes para cada carreira.', 'Sem distinção de índices (art. 37, X).'),
      C('Extinto o cargo, o servidor estável ficará em disponibilidade, com remuneração proporcional ao tempo de serviço.', 'Art. 41, §3º.'),
      E('Para cumprir o limite de despesa com pessoal, a primeira medida prevista é a exoneração dos servidores estáveis.', 'Primeiro cortam-se cargos em comissão e funções de confiança; depois, não estáveis.'),
    ],
  },

  {
    id: 'legislativo', titulo: 'Poder Legislativo e processo legislativo', arts: 'arts. 44 a 75',
    chaves: ['poder legislativo', 'processo legislativo', 'organizacao dos poderes', 'congresso nacional', 'estatuto dos congressistas', 'imunidades parlamentares', 'fiscalizacao contabil'],
    html: `
<h3>Em poucas palavras</h3>
<p>O Legislativo federal é <b>bicameral</b>: o <b>Congresso Nacional</b> é formado pela <b>Câmara dos Deputados</b> (representantes do povo) e pelo <b>Senado Federal</b> (representantes dos Estados e do DF). Estados, DF e Municípios têm Legislativo <b>unicameral</b> (Assembleia, Câmara Legislativa e Câmara Municipal).</p>
<h3>Câmara × Senado</h3>
<table class="tab"><tr><th></th><th>Câmara dos Deputados</th><th>Senado Federal</th></tr>
<tr><td>Representa</td><td>o <b>povo</b></td><td>os <b>Estados e o DF</b></td></tr>
<tr><td>Sistema eleitoral</td><td><b>proporcional</b></td><td><b>majoritário</b></td></tr>
<tr><td>Número</td><td>proporcional à população: mínimo de <b>8</b> e máximo de <b>70</b> por Estado; Território elege 4</td><td><b>3</b> por Estado e pelo DF, cada um com 2 suplentes</td></tr>
<tr><td>Mandato</td><td><b>4 anos</b></td><td><b>8 anos</b>; renovação de 4 em 4 anos, alternadamente por 1/3 e 2/3</td></tr>
<tr><td>Idade mínima</td><td>21 anos</td><td>35 anos</td></tr></table>
<p><b>Quórum geral</b> (art. 47): as deliberações são tomadas por <b>maioria dos votos</b>, presente a <b>maioria absoluta</b> dos membros.</p>
<h3>Competências privativas que mais caem</h3>
<table class="tab"><tr><th>Câmara (art. 51)</th><th>Senado (art. 52)</th></tr>
<tr><td><ul><li><b>autorizar</b>, por 2/3, a instauração de processo contra o Presidente, o Vice e os Ministros;</li><li>proceder à tomada de contas do Presidente, quando não apresentadas em 60 dias após a abertura da sessão legislativa.</li></ul></td><td><ul><li><b>processar e julgar</b> Presidente e Vice nos crimes de responsabilidade, e também Ministros do STF, membros do CNJ e do CNMP, PGR e AGU;</li><li><b>aprovar previamente</b> a escolha de magistrados (casos da CF), ministros do TCU indicados pelo Presidente, presidente e diretores do Banco Central, PGR e chefes de missão diplomática;</li><li>fixar limites globais da dívida consolidada dos entes;</li><li><b>suspender a execução</b> de lei declarada inconstitucional por decisão definitiva do STF (X).</li></ul></td></tr></table>
<h3>Estatuto dos congressistas (art. 53)</h3>
${cartoes([['🗣', 'Imunidade material', 'inviolabilidade civil e penal por quaisquer opiniões, palavras e votos', COR.azul], ['🔒', 'Imunidade à prisão', 'desde a diplomação, só presos em flagrante de crime inafiançável; a Casa decide em 24h, pela maioria de seus membros', COR.verm], ['⚖', 'Sustação do processo', 'recebida a denúncia por crime posterior à diplomação, a Casa pode sustar o processo pela maioria de seus membros, por iniciativa de partido', COR.roxo], ['🏛', 'Foro', 'julgados pelo STF desde a expedição do diploma', COR.verde]])}
<ul><li>A sustação do processo <b>suspende a prescrição</b> enquanto durar o mandato.</li><li>Os parlamentares não são obrigados a testemunhar sobre informações recebidas em razão do mandato.</li><li>As imunidades <b>subsistem no estado de sítio</b> e só podem ser suspensas por <b>2/3</b> da Casa, quanto a atos praticados fora do recinto do Congresso.</li><li>O foro no STF alcança crimes cometidos <b>no cargo e em razão dele</b> (AP 937). Em 2025, o STF decidiu que esse foro se mantém mesmo depois do fim do mandato.</li></ul>
<h3>Perda do mandato (art. 55)</h3>
<table class="tab"><tr><th>Decidida pela Casa, por maioria absoluta</th><th>Declarada pela Mesa</th></tr>
<tr><td>infringir as vedações do art. 54; quebra de <b>decoro</b>; <b>condenação criminal</b> transitada em julgado</td><td>faltar a <b>1/3</b> das sessões ordinárias da sessão legislativa; perda ou suspensão dos direitos políticos; decisão da Justiça Eleitoral</td></tr></table>
<h3>Processo legislativo (art. 59)</h3>
<p>Compreende: <b>emendas à Constituição, leis complementares, leis ordinárias, leis delegadas, medidas provisórias, decretos legislativos e resoluções</b>.</p>
${passos([['Iniciativa', 'parlamentares, comissões, Presidente, STF, Tribunais Superiores, PGR e cidadãos'], ['Discussão e votação', 'na Casa iniciadora e na revisora; LC por maioria absoluta, LO por maioria simples'], ['Sanção ou veto', 'em 15 dias úteis; o silêncio importa sanção tácita'], ['Promulgação e publicação', 'em 48h pelo Presidente; se ele não o fizer, pelo Presidente e, depois, pelo Vice do Senado']])}
${box('Iniciativa privativa do Presidente (art. 61, §1º)', '<ul><li>efetivos das Forças Armadas;</li><li><b>criação de cargos</b>, funções ou empregos na administração direta e autárquica ou aumento de sua remuneração;</li><li>servidores públicos da União, seu <b>regime jurídico</b>, provimento, estabilidade e aposentadoria;</li><li>criação e extinção de <b>Ministérios</b> e órgãos da administração pública;</li><li>organização do MP e da Defensoria da União.</li></ul>Pelo <b>princípio da simetria</b>, essas regras valem para Governadores e <b>Prefeitos</b>: lei municipal de iniciativa de vereador que cria cargo ou reestrutura secretaria é inconstitucional por <b>vício de iniciativa</b>.')}
${juris('<b>STF, Tema 917</b>: não usurpa a competência privativa do Chefe do Executivo lei que, embora crie despesa para a Administração, <b>não trata da sua estrutura ou da atribuição de seus órgãos nem do regime jurídico de servidores</b>. Exemplo: lei de iniciativa parlamentar que obriga a instalação de câmeras em escolas.')}
<h3>Veto</h3>
<ul><li>Pode ser <b>total ou parcial</b>; o parcial só abrange texto integral de artigo, parágrafo, inciso ou alínea (não se vetam palavras soltas).</li><li>Motivos: <b>inconstitucionalidade</b> (veto jurídico) ou <b>contrariedade ao interesse público</b> (veto político).</li><li>É apreciado em <b>sessão conjunta</b>, em 30 dias, e só pode ser rejeitado pela <b>maioria absoluta</b> dos deputados e senadores.</li></ul>
<p><b>Iniciativa popular federal</b>: projeto subscrito por, no mínimo, <b>1% do eleitorado nacional</b>, distribuído por pelo menos <b>5 Estados</b>, com não menos de <b>0,3%</b> dos eleitores de cada um. <b>Sessão legislativa</b>: de 2 de fevereiro a 17 de julho e de 1º de agosto a 22 de dezembro.</p>
<h3>Tribunais de Contas (arts. 73 e 75)</h3>
<p>O TCU tem <b>9 ministros</b> (1/3 escolhidos pelo Presidente, com aprovação do Senado, e 2/3 pelo Congresso). Os Tribunais de Contas dos Estados têm <b>7 conselheiros</b>: 4 escolhidos pela Assembleia e 3 pelo Governador, sendo 1 de livre escolha, 1 entre auditores e 1 entre membros do MP junto ao Tribunal (Súmula 653 do STF).</p>
${peg('Projeto de lei <b>rejeitado</b> só pode ser reapresentado na mesma sessão legislativa por proposta da <b>maioria absoluta</b> dos membros de qualquer das Casas (art. 67). Já a proposta de <b>emenda</b> rejeitada <b>não pode</b> ser reapresentada na mesma sessão legislativa em hipótese alguma.')}`,
    quiz: [
      C('Os deputados federais são eleitos pelo sistema proporcional e os senadores pelo sistema majoritário.', 'Arts. 45 e 46.'),
      E('Compete privativamente ao Senado autorizar a instauração de processo contra o Presidente da República.', 'Autorizar é da Câmara; o Senado julga.'),
      C('O veto parcial somente abrangerá texto integral de artigo, de parágrafo, de inciso ou de alínea.', 'Art. 66, §2º.'),
      E('O veto pode ser rejeitado pela maioria simples dos deputados e senadores, em sessão conjunta.', 'Exige maioria absoluta.'),
      C('Pelo princípio da simetria, é inconstitucional lei municipal de iniciativa parlamentar que crie cargos na estrutura do Poder Executivo.', 'Vício de iniciativa.'),
      E('Os vereadores gozam de imunidade formal quanto à prisão, nos mesmos moldes dos congressistas.', 'Têm apenas a material, na circunscrição do Município.'),
      C('Os Tribunais de Contas dos Estados são compostos por sete conselheiros.', 'Art. 75, parágrafo único.'),
    ],
  },
];
