// Direito Constitucional — aula completa dos tópicos originais (poder constituinte a ordem social).
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, banca, C, E } from './blocos.js';

const A = (t) => `<h3 class="lt-aula">📚 Aula completa</h3>${t}`;

export const AULA = {
  'poder-constituinte': {
    html: A(`
<h3>As espécies de poder constituinte</h3>
${cartoes([['🌱', 'Originário', 'cria a Constituição: inicial, ilimitado juridicamente, incondicionado e autônomo', COR.verde], ['🔧', 'Derivado reformador', 'altera a Constituição por emendas (art. 60)', COR.azul], ['🏛', 'Derivado decorrente', 'os Estados se auto-organizam por suas Constituições (art. 25 e ADCT, art. 11)', COR.roxo], ['📝', 'Derivado revisor', 'a revisão do ADCT, art. 3º; já se esgotou', COR.cinza]])}
<p>O poder <b>originário</b> tem como titular o <b>povo</b> (art. 1º, parágrafo único). Os <b>derivados</b> são criados pela própria Constituição e, por isso, são <b>limitados e condicionados</b> por ela.</p>
<h3>Limitações ao poder de reforma (art. 60)</h3>
<table class="tab"><tr><th>Tipo</th><th>Conteúdo</th></tr>
<tr><td><b>Formais (procedimentais)</b></td><td>iniciativa restrita; votação em <b>2 turnos</b> em cada Casa; aprovação por <b>3/5</b>; promulgação pelas <b>Mesas</b> da Câmara e do Senado; proposta rejeitada ou prejudicada não pode ser reapresentada na <b>mesma sessão legislativa</b></td></tr>
<tr><td><b>Circunstanciais</b></td><td>a Constituição não pode ser emendada na vigência de <b>intervenção federal, estado de defesa ou estado de sítio</b></td></tr>
<tr><td><b>Materiais</b> (cláusulas pétreas)</td><td>não será objeto de deliberação a proposta <b>tendente a abolir</b>: forma federativa; voto direto, secreto, universal e periódico; separação dos Poderes; direitos e garantias individuais</td></tr>
<tr><td><b>Implícitas</b></td><td>não se pode mudar o titular do poder constituinte nem o próprio art. 60 para facilitar a reforma</td></tr></table>
${box('Quem pode propor emenda (art. 60, I a III)', '<ol><li><b>1/3</b>, no mínimo, dos membros da Câmara <b>ou</b> do Senado;</li><li>o <b>Presidente da República</b>;</li><li><b>mais da metade</b> das Assembleias Legislativas, cada uma pela <b>maioria relativa</b> de seus membros.</li></ol>Não há iniciativa popular para emenda à Constituição Federal, nem sanção ou veto do Presidente.')}
${dica('Cláusulas pétreas: <b>FO-VO-SE-DI</b> — FOrma federativa, VOto direto, secreto, universal e periódico, SEparação dos Poderes, DIreitos e garantias individuais. Repare que o voto <b>obrigatório</b> não está na lista.')}
<h3>“Tendente a abolir” não é “intocável”</h3>
<p>O STF entende que as cláusulas pétreas protegem o <b>núcleo essencial</b> dos institutos, e não a sua redação literal. Uma emenda pode <b>modificar ou ampliar</b> direitos individuais; o que não pode é esvaziá-los. Também há direitos individuais fora do art. 5º, como a anterioridade tributária (art. 150, III, b), que o STF reconheceu como cláusula pétrea (ADI 939).</p>
<h3>Revisão constitucional</h3>
<p>Prevista no ADCT, art. 3º: realizada <b>uma única vez</b>, após <b>5 anos</b> da promulgação, em <b>sessão unicameral</b> e por <b>maioria absoluta</b>. Gerou 6 emendas de revisão, em 1994. Não pode ser repetida.</p>
<h3>Tratados de direitos humanos</h3>
<table class="tab"><tr><th>Forma de aprovação</th><th>Status</th></tr><tr><td>Rito do art. 5º, §3º: 2 turnos, 3/5, em cada Casa</td><td><b>equivalente a emenda constitucional</b></td></tr><tr><td>Rito comum</td><td><b>supralegal</b> (acima das leis, abaixo da CF)</td></tr><tr><td>Tratados que não versam sobre direitos humanos</td><td>lei ordinária</td></tr></table>
${peg('Emenda constitucional é promulgada pelas <b>Mesas</b> da Câmara e do Senado, com o respectivo número de ordem. O Presidente da República <b>não</b> sanciona, <b>não</b> veta e <b>não</b> promulga emenda.')}`),
    quiz: [
      E('A Constituição Federal pode ser emendada durante o estado de defesa, desde que aprovada a proposta por três quintos dos membros de cada Casa.', 'É limitação circunstancial: não pode ser emendada.'),
      C('Pode propor emenda à Constituição mais da metade das Assembleias Legislativas, manifestando-se cada uma pela maioria relativa de seus membros.', 'Art. 60, III.'),
      E('O voto obrigatório é cláusula pétrea.', 'Cláusula pétrea é o voto direto, secreto, universal e periódico.'),
      C('A emenda à Constituição será promulgada pelas Mesas da Câmara dos Deputados e do Senado Federal.', 'Art. 60, §3º.'),
    ],
  },

  'direitos-individuais': {
    html: A(`
<h3>Características dos direitos fundamentais</h3>
<ul><li><b>Historicidade</b>: surgem e evoluem com a história.</li><li><b>Universalidade</b>: destinam-se a todos.</li><li><b>Inalienabilidade, imprescritibilidade e irrenunciabilidade</b>: não se vendem, não se perdem pelo tempo e não se renunciam (pode-se deixar de exercê-los).</li><li><b>Relatividade</b>: nenhum é absoluto; em conflito, faz-se ponderação.</li><li><b>Concorrência</b>: podem ser exercidos ao mesmo tempo.</li></ul>
<h3>As gerações (dimensões)</h3>
${cartoes([['🗽', '1ª geração', 'liberdade: direitos civis e políticos; abstenção do Estado', COR.azul], ['🤲', '2ª geração', 'igualdade: direitos sociais, econômicos e culturais; prestação do Estado', COR.verde], ['🌍', '3ª geração', 'fraternidade: meio ambiente, paz, desenvolvimento; direitos difusos', COR.roxo]])}
${dica('Siga o lema da Revolução Francesa: <b>Liberdade, Igualdade, Fraternidade</b> = 1ª, 2ª e 3ª gerações.')}
<h3>Quem é titular</h3>
<p>O <i>caput</i> do art. 5º fala em “brasileiros e estrangeiros residentes no País”, mas o STF estende a proteção também a <b>estrangeiros não residentes</b> (turista preso tem direito a habeas corpus) e, no que for compatível, às <b>pessoas jurídicas</b>.</p>
<h3>Incisos em blocos</h3>
<table class="tab"><tr><th>Bloco</th><th>O que diz</th></tr>
<tr><td><b>Domicílio</b> (XI)</td><td>a casa é asilo inviolável; entrada sem consentimento só em <b>flagrante delito, desastre, para prestar socorro</b> ou, <b>durante o dia</b>, por determinação judicial</td></tr>
<tr><td><b>Comunicações</b> (XII)</td><td>inviolável o sigilo de correspondência, comunicações telegráficas, de dados e telefônicas; a <b>interceptação telefônica</b> exige ordem judicial e só serve para <b>investigação criminal ou instrução processual penal</b></td></tr>
<tr><td><b>Reunião</b> (XVI)</td><td>pacificamente, <b>sem armas</b>, em locais abertos, <b>independentemente de autorização</b>, exigido apenas <b>aviso prévio</b></td></tr>
<tr><td><b>Associação</b> (XVII a XXI)</td><td>livre para fins lícitos, vedada a de caráter paramilitar; criação independe de autorização; <b>suspensão</b> por decisão judicial; <b>dissolução</b> compulsória só por decisão judicial <b>transitada em julgado</b></td></tr>
<tr><td><b>Propriedade</b> (XXII a XXVI)</td><td>garantida, atendida a <b>função social</b>; a pequena propriedade rural trabalhada pela família não será penhorada por dívidas de sua atividade produtiva</td></tr></table>
${box('Inviolabilidade do domicílio na prática (STF, Tema 280)', 'A entrada forçada sem mandado, inclusive à noite, é lícita quando amparada em <b>fundadas razões</b>, justificadas depois, de que dentro da casa ocorre <b>flagrante delito</b>. Se não houver essas razões, as provas obtidas são ilícitas e os agentes podem responder.')}
<h3>Os incisos penais</h3>
<table class="tab"><tr><th>Crime</th><th>Inafiançável</th><th>Imprescritível</th><th>Sem graça ou anistia</th></tr>
<tr><td><b>Racismo</b> (XLII)</td><td>sim</td><td>sim</td><td>—</td></tr>
<tr><td><b>Ação de grupos armados</b> contra a ordem constitucional (XLIV)</td><td>sim</td><td>sim</td><td>—</td></tr>
<tr><td><b>Tortura, tráfico, terrorismo e hediondos</b> (XLIII)</td><td>sim</td><td>não</td><td>sim</td></tr></table>
${dica('<b>3TH</b> (Tortura, Tráfico, Terrorismo e Hediondos): inafiançáveis e sem graça ou anistia, mas <b>prescritíveis</b>. Imprescritíveis são só <b>RA-GA</b>: RAcismo e Grupos Armados.')}
<p><b>Penas proibidas</b> (XLVII): de <b>morte</b> (salvo guerra declarada), de caráter <b>perpétuo</b>, de <b>trabalhos forçados</b>, de <b>banimento</b> e <b>cruéis</b>.</p>
${ex('Uma lei municipal que exija autorização prévia da prefeitura para uma passeata é inconstitucional: a Constituição só exige <b>aviso prévio</b> à autoridade, para que outra reunião não seja marcada para o mesmo local.')}
${peg('Para entrar na casa <b>por ordem judicial</b>, só <b>durante o dia</b>. Para flagrante, desastre ou socorro, a qualquer hora, de dia ou de noite.')}`),
    quiz: [
      C('A entrada em domicílio por determinação judicial só pode ocorrer durante o dia.', 'Art. 5º, XI.'),
      E('O tráfico ilícito de entorpecentes é crime imprescritível.', 'É inafiançável e insuscetível de graça ou anistia, mas prescritível.'),
      C('As associações só podem ser compulsoriamente dissolvidas por decisão judicial transitada em julgado.', 'Art. 5º, XIX.'),
      E('O direito de reunião depende de prévia autorização da autoridade competente.', 'Basta o aviso prévio.'),
    ],
  },

  garantias: {
    html: A(`
<h3>Os quatro parágrafos do art. 5º</h3>
<ul><li><b>§1º</b>: as normas definidoras de direitos e garantias fundamentais têm <b>aplicação imediata</b>.</li><li><b>§2º</b>: o rol não exclui outros direitos decorrentes do regime, dos princípios e dos tratados (é <b>exemplificativo</b>).</li><li><b>§3º</b>: tratados de direitos humanos aprovados por 3/5, em 2 turnos, em cada Casa, equivalem a emendas.</li><li><b>§4º</b>: o Brasil se submete à jurisdição do <b>Tribunal Penal Internacional</b>.</li></ul>
<h3>Garantias processuais em sequência</h3>
${passos([['Devido processo legal (LIV)', 'ninguém será privado da liberdade ou de seus bens sem ele'], ['Contraditório e ampla defesa (LV)', 'em processo judicial e administrativo'], ['Provas ilícitas (LVI)', 'são inadmissíveis'], ['Presunção de inocência (LVII)', 'ninguém será considerado culpado até o trânsito em julgado'], ['Duração razoável (LXXVIII)', 'incluída pela EC 45/2004']])}
<h3>Prisão: o que a Constituição exige</h3>
<ul><li>Só em <b>flagrante delito</b> ou por <b>ordem escrita e fundamentada</b> de autoridade judiciária, salvo transgressão militar ou crime propriamente militar (LXI).</li><li>A prisão e o local devem ser comunicados <b>imediatamente</b> ao juiz e à família ou pessoa indicada (LXII).</li><li>O preso tem direito ao <b>silêncio</b> e à assistência da família e de advogado (LXIII).</li><li>A prisão ilegal será <b>imediatamente relaxada</b> pelo juiz (LXV).</li><li><b>Prisão civil por dívida</b>: só a do <b>devedor de alimentos</b> (LXVII). A do depositário infiel está superada (<b>SV 25</b>).</li></ul>
${box('Presunção de inocência no STF', 'Nas ADCs 43, 44 e 54, o STF decidiu que a pena só pode começar a ser cumprida após o <b>trânsito em julgado</b>. Antes disso, só cabe prisão <b>cautelar</b> (flagrante, temporária ou preventiva), com fundamento próprio. No <b>Tribunal do Júri</b>, o STF admitiu a execução imediata da pena após a condenação pelos jurados (Tema 1.068).')}
<h3>Tribunal do Júri (XXXVIII)</h3>
<p>Reconhecida a instituição do júri, com a organização da lei, assegurados: <b>plenitude de defesa</b>, <b>sigilo das votações</b>, <b>soberania dos veredictos</b> e competência para julgar os <b>crimes dolosos contra a vida</b>.</p>
${dica('Júri: “<b>PLE-SI-SO-CO</b>” — PLEnitude de defesa, SIgilo das votações, SOberania dos veredictos, COmpetência para crimes dolosos contra a vida.')}
<h3>Outras garantias</h3>
<ul><li><b>Juiz natural</b> (XXXVII e LIII): não haverá juízo ou tribunal de exceção; ninguém será processado senão pela autoridade competente.</li><li><b>Identificação criminal</b> (LVIII): quem é civilmente identificado não será submetido a ela, salvo nas hipóteses da lei.</li><li><b>Ação penal privada subsidiária</b> (LIX): se o MP não oferecer denúncia no prazo.</li><li><b>Assistência jurídica integral e gratuita</b> aos que comprovarem insuficiência de recursos (LXXIV).</li><li><b>Proteção de dados pessoais</b>, inclusive nos meios digitais (LXXIX, incluído pela EC 115/2022).</li><li><b>Gratuidade</b> de habeas corpus e habeas data e, na forma da lei, dos atos necessários ao exercício da cidadania (LXXVII).</li></ul>
${peg('O §1º fala em aplicação <b>imediata</b>, mas isso não impede que algumas normas dependam de lei para produzir todos os efeitos. Para a banca, a frase literal está <b>certa</b>: “as normas definidoras dos direitos e garantias fundamentais têm aplicação imediata”.')}`),
    quiz: [
      C('O rol de direitos e garantias do art. 5º é exemplificativo.', 'Art. 5º, §2º.'),
      E('A Constituição admite a prisão civil do depositário infiel.', 'SV 25: é ilícita.'),
      C('São assegurados ao Tribunal do Júri a plenitude de defesa, o sigilo das votações e a soberania dos veredictos.', 'Art. 5º, XXXVIII.'),
      E('O civilmente identificado será sempre submetido a identificação criminal quando indiciado.', 'Só nas hipóteses previstas em lei.'),
    ],
  },

  remedios: {
    html: A(`
<h3>Os seis remédios lado a lado</h3>
<table class="tab"><tr><th>Remédio</th><th>Protege</th><th>Quem impetra</th><th>Detalhe-chave</th></tr>
<tr><td><b>Habeas corpus</b></td><td>liberdade de <b>locomoção</b></td><td>qualquer pessoa, sem advogado</td><td>gratuito; pode ser preventivo (salvo-conduto) ou repressivo</td></tr>
<tr><td><b>Habeas data</b></td><td>conhecer ou retificar <b>informações pessoais</b> em bancos de dados públicos ou de caráter público</td><td>o próprio titular</td><td>gratuito; exige <b>recusa administrativa</b> prévia (Súmula 2 do STJ)</td></tr>
<tr><td><b>Mandado de segurança</b></td><td>direito <b>líquido e certo</b> não amparado por HC ou HD</td><td>pessoa física ou jurídica, por advogado</td><td>prazo <b>decadencial de 120 dias</b> (Lei 12.016/2009)</td></tr>
<tr><td><b>MS coletivo</b></td><td>direitos coletivos e individuais homogêneos</td><td>partido político com representação no Congresso; sindicato, entidade de classe ou associação em funcionamento há pelo menos <b>1 ano</b></td><td>o requisito de 1 ano vale só para a <b>associação</b></td></tr>
<tr><td><b>Mandado de injunção</b></td><td>falta de <b>norma regulamentadora</b> que torne inviável um direito constitucional</td><td>individual ou coletivo (Lei 13.300/2016)</td><td>o STF adota a posição <b>concretista</b></td></tr>
<tr><td><b>Ação popular</b></td><td>patrimônio público, <b>moralidade administrativa</b>, meio ambiente e patrimônio histórico e cultural</td><td>só o <b>cidadão</b> (eleitor)</td><td>autor isento de custas e sucumbência, salvo má-fé</td></tr></table>
${dica('Gratuitos por força da Constituição: os dois “<b>habeas</b>” (corpus e data).')}
<h3>Súmulas sobre mandado de segurança</h3>
<ul><li><b>Súmula 266 do STF</b>: não cabe MS contra <b>lei em tese</b>.</li><li><b>Súmula 267 do STF</b>: não cabe MS contra ato judicial passível de <b>recurso</b> ou correição.</li><li><b>Súmula 269 do STF</b>: o MS não é substitutivo de <b>ação de cobrança</b>.</li><li><b>Súmula 101 do STF</b>: o MS não substitui a <b>ação popular</b>.</li><li><b>Súmula 629 do STF</b>: a impetração de MS coletivo por entidade de classe em favor dos associados <b>independe da autorização</b> destes.</li><li><b>Súmula 630 do STF</b>: a entidade de classe tem legitimação para o MS ainda quando a pretensão interesse apenas a <b>parte</b> da categoria.</li></ul>
<h3>Ação popular: pontos de atenção</h3>
<ul><li><b>Pessoa jurídica não pode</b> propor ação popular (Súmula 365 do STF).</li><li>O Ministério Público não é autor, mas acompanha a ação e pode assumir o polo ativo se o autor desistir.</li><li>Não há foro por prerrogativa de função: é julgada em primeiro grau, mesmo contra o Presidente.</li></ul>
${ex('Um morador de Belo Vale, eleitor, descobre que a prefeitura comprou um terreno por preço muito acima do mercado: pode ajuizar <b>ação popular</b>. Se ele quiser apenas consultar seus próprios dados num cadastro municipal que foi negado, o caminho é o <b>habeas data</b>.')}
${box('Mandado de injunção: efeitos da decisão (Lei 13.300/2016)', 'Reconhecida a omissão, o tribunal fixa prazo para o órgão editar a norma e, se não for editada, estabelece as condições para o exercício do direito. A eficácia, em regra, é <b>subjetiva</b> (para as partes), mas pode ser estendida (<i>ultra partes</i> ou <i>erga omnes</i>) quando indispensável. Exemplo célebre: o STF aplicou a Lei de Greve do setor privado aos <b>servidores públicos</b> (MIs 670, 708 e 712).')}
${peg('No MS coletivo, o partido político precisa ter <b>representação no Congresso Nacional</b> (ao menos um parlamentar). Já o requisito de <b>1 ano</b> de funcionamento é só para a associação.')}`),
    quiz: [
      C('O prazo para impetrar mandado de segurança é de 120 dias, contados da ciência do ato impugnado.', 'Lei 12.016, art. 23.'),
      E('A pessoa jurídica tem legitimidade para propor ação popular.', 'Súmula 365 do STF.'),
      C('Não cabe mandado de segurança contra lei em tese.', 'Súmula 266 do STF.'),
      E('O requisito de funcionamento há pelo menos um ano aplica-se ao partido político que impetra mandado de segurança coletivo.', 'Aplica-se apenas à associação.'),
      C('A impetração de mandado de segurança coletivo por entidade de classe independe da autorização dos associados.', 'Súmula 629 do STF.'),
    ],
  },

  sociais: {
    html: A(`
<h3>O rol do art. 6º</h3>
<p>São direitos sociais: <b>educação, saúde, alimentação, trabalho, moradia, transporte, lazer, segurança, previdência social, proteção à maternidade e à infância</b> e <b>assistência aos desamparados</b>. O parágrafo único (EC 114/2021) garante a todo brasileiro em situação de vulnerabilidade o direito a uma <b>renda básica familiar</b>.</p>
${dica('Os últimos incluídos: <b>moradia</b> (EC 26/2000), <b>alimentação</b> (EC 64/2010) e <b>transporte</b> (EC 90/2015).')}
<h3>Três conceitos que caem</h3>
${cartoes([['💰', 'Reserva do possível', 'a efetivação depende de recursos; o Estado não pode ser obrigado ao impossível', COR.azul], ['🛡', 'Mínimo existencial', 'núcleo que não pode ser negado, nem com o argumento da falta de recursos', COR.verde], ['↩', 'Vedação ao retrocesso', 'direitos sociais já concretizados não podem ser simplesmente suprimidos', COR.roxo]])}
<h3>Art. 7º: os números</h3>
<table class="tab"><tr><th>Direito</th><th>Regra</th></tr>
<tr><td>Jornada</td><td>até <b>8 horas diárias e 44 semanais</b>; turnos ininterruptos de revezamento: <b>6 horas</b>, salvo negociação coletiva</td></tr>
<tr><td>Hora extra</td><td>no mínimo <b>50%</b> superior à normal</td></tr>
<tr><td>Férias</td><td>anuais, com pelo menos <b>1/3</b> a mais</td></tr>
<tr><td>Licença à gestante</td><td><b>120 dias</b>, sem prejuízo do emprego e do salário</td></tr>
<tr><td>Aviso prévio</td><td>proporcional ao tempo de serviço, de no mínimo <b>30 dias</b></td></tr>
<tr><td>Prescrição</td><td><b>5 anos</b>, até o limite de <b>2 anos</b> após a extinção do contrato</td></tr>
<tr><td>Trabalho do menor</td><td>proibido trabalho noturno, perigoso ou insalubre a menores de <b>18</b> e qualquer trabalho a menores de <b>16</b>, salvo como aprendiz, a partir de <b>14</b></td></tr>
<tr><td>Salário</td><td>salário mínimo nacionalmente unificado, <b>vedada a vinculação</b> para qualquer fim; irredutível, salvo convenção ou acordo coletivo</td></tr></table>
<h3>Sindicatos e greve</h3>
<ul><li><b>Unicidade sindical</b>: só um sindicato da mesma categoria na mesma base territorial, que não pode ser inferior à área de <b>um Município</b>.</li><li>Ninguém é obrigado a se filiar ou manter-se filiado.</li><li>O <b>dirigente sindical</b> tem estabilidade desde o registro da candidatura até <b>1 ano</b> após o fim do mandato, salvo falta grave.</li><li><b>Greve</b> (art. 9º): cabe aos trabalhadores decidir sobre a oportunidade e os interesses a defender.</li><li><b>Servidores públicos civis</b>: greve nos termos de lei específica (art. 37, VII); enquanto ela não vem, aplica-se a Lei 7.783/1989 (STF).</li><li><b>Policiais e demais carreiras da segurança pública</b>: a greve é vedada (STF, ARE 654.432). <b>Militares</b>: vedadas sindicalização e greve (art. 142, §3º, IV).</li></ul>
${peg('A licença-<b>paternidade</b> não tem prazo fixado no art. 7º: ele remete à lei. Enquanto isso, o ADCT (art. 10, §1º) fixa <b>5 dias</b>.')}
${ex('Em empresa com mais de <b>200 empregados</b>, é assegurada a eleição de um representante dos trabalhadores para tratar diretamente com o empregador (art. 11).')}`),
    quiz: [
      C('O transporte foi incluído no rol de direitos sociais do art. 6º pela EC 90/2015.', 'Último incluído da lista.'),
      E('A Constituição proíbe qualquer trabalho a menores de 18 anos.', 'Proíbe qualquer trabalho a menores de 16, salvo aprendiz a partir de 14.'),
      C('A base territorial de um sindicato não pode ser inferior à área de um Município.', 'Art. 8º, II.'),
      E('Segundo o STF, os policiais civis podem exercer o direito de greve nos termos da Lei 7.783/1989.', 'A greve é vedada às carreiras da segurança pública.'),
    ],
  },

  nacionalidade: {
    html: A(`
<h3>Brasileiro nato: as três hipóteses (art. 12, I)</h3>
<table class="tab"><tr><th>Onde nasceu</th><th>Condição</th><th>Critério</th></tr>
<tr><td>No Brasil</td><td>ainda que de pais estrangeiros, desde que estes <b>não estejam a serviço de seu país</b></td><td><i>ius soli</i></td></tr>
<tr><td>No estrangeiro</td><td>pai ou mãe brasileiro <b>a serviço da República Federativa do Brasil</b></td><td><i>ius sanguinis</i> + serviço</td></tr>
<tr><td>No estrangeiro</td><td>pai ou mãe brasileiro, <b>registrado em repartição brasileira</b> competente, <b>ou</b> que venha a residir no Brasil e opte, a qualquer tempo, depois de atingida a maioridade</td><td><i>ius sanguinis</i> + registro ou opção</td></tr></table>
<h3>Naturalizado (art. 12, II)</h3>
<ul><li>Na forma da lei (Lei de Migração).</li><li>Originários de <b>países de língua portuguesa</b>: residência por <b>1 ano ininterrupto</b> e idoneidade moral.</li><li>Estrangeiros residentes há mais de <b>15 anos ininterruptos</b> e sem condenação penal, desde que requeiram (naturalização extraordinária).</li><li><b>Portugueses</b> com residência permanente: se houver reciprocidade, recebem os direitos inerentes ao brasileiro, salvo os casos da Constituição (quase-nacionalidade, §1º).</li></ul>
<h3>Cargos privativos de brasileiro nato (§3º)</h3>
${box('MP3.COM', '<b>M</b>inistro do STF · <b>P</b>residente e Vice da República · <b>P</b>residente da Câmara · <b>P</b>residente do Senado · <b>C</b>arreira diplomática · <b>O</b>ficial das Forças Armadas · <b>M</b>inistro de Estado da Defesa.')}
<p>Repare: <b>senador e deputado</b> podem ser naturalizados; só a <b>presidência</b> das Casas é privativa. Ministro do STJ ou do TSE também pode ser naturalizado (a não ser os que vêm do STF).</p>
<h3>Perda da nacionalidade (§4º, com a EC 131/2023)</h3>
<ol><li>Cancelamento da naturalização por <b>sentença judicial</b>, em razão de <b>fraude</b> no processo de naturalização ou de <b>atentado contra a ordem constitucional e o Estado Democrático</b>;</li><li><b>Pedido expresso</b> de perda perante autoridade brasileira, ressalvadas situações que acarretem apatridia.</li></ol>
<p>Antes da EC 131/2023, o brasileiro que adquiria outra nacionalidade podia perder a brasileira. Hoje isso <b>não</b> ocorre automaticamente.</p>
<h3>Direitos políticos</h3>
<table class="tab"><tr><th>Alistamento e voto</th><th>Quem</th></tr><tr><td>Obrigatórios</td><td>maiores de 18 anos</td></tr><tr><td>Facultativos</td><td>analfabetos, maiores de 70 anos, maiores de 16 e menores de 18</td></tr><tr><td>Inalistáveis</td><td>estrangeiros e, durante o serviço militar obrigatório, os <b>conscritos</b></td></tr></table>
${dica('Idades mínimas: <b>35</b> (Presidente, Vice e Senador) · <b>30</b> (Governador e Vice) · <b>21</b> (Deputados, Prefeito, Vice-Prefeito e juiz de paz) · <b>18</b> (Vereador).')}
<p><b>Perda ou suspensão</b> (art. 15; a <b>cassação é vedada</b>): cancelamento da naturalização; incapacidade civil absoluta; condenação criminal transitada em julgado, enquanto durarem seus efeitos; recusa de cumprir obrigação a todos imposta ou prestação alternativa; improbidade administrativa.</p>
<p><b>Anterioridade eleitoral</b> (art. 16): a lei que altera o processo eleitoral entra em vigor na data da publicação, mas <b>não se aplica à eleição que ocorra até 1 ano</b> da data de sua vigência.</p>
<h3>Partidos políticos (art. 17)</h3>
<ul><li>Livre criação, fusão, incorporação e extinção, resguardados a soberania, o regime democrático, o pluripartidarismo e os direitos fundamentais.</li><li>Devem ter <b>caráter nacional</b>, prestar contas à Justiça Eleitoral e não podem receber recursos de entidade ou governo <b>estrangeiro</b>.</li><li>Adquirem personalidade jurídica na forma da <b>lei civil</b> e registram o estatuto no <b>TSE</b>.</li><li>São vedadas as <b>coligações nas eleições proporcionais</b> (EC 97/2017) e a utilização de organização <b>paramilitar</b>.</li><li>O acesso ao fundo partidário e ao tempo de rádio e TV depende de <b>cláusula de desempenho</b>.</li></ul>
${peg('A Constituição veda a <b>cassação</b> de direitos políticos. O que existe é <b>perda</b> (ex.: cancelamento da naturalização) e <b>suspensão</b> (ex.: condenação criminal enquanto durarem os efeitos).')}`),
    quiz: [
      C('É privativo de brasileiro nato o cargo de Ministro de Estado da Defesa.', 'Art. 12, §3º, VII.'),
      E('O cargo de senador é privativo de brasileiro nato.', 'Só o de Presidente do Senado.'),
      C('Os conscritos, durante o período do serviço militar obrigatório, não podem alistar-se como eleitores.', 'Art. 14, §2º.'),
      E('A Constituição admite a cassação de direitos políticos em caso de improbidade administrativa.', 'Cassação é vedada; a improbidade gera suspensão.'),
      C('São vedadas as coligações partidárias nas eleições proporcionais.', 'Art. 17, §1º, com a EC 97/2017.'),
    ],
  },

  uniao: {
    html: A(`
<h3>O mapa das competências</h3>
<table class="tab"><tr><th>Artigo</th><th>Tipo</th><th>De quem</th><th>Pode delegar?</th></tr>
<tr><td><b>21</b></td><td>exclusiva (material/administrativa)</td><td>União</td><td><b>não</b></td></tr>
<tr><td><b>22</b></td><td>privativa (legislativa)</td><td>União</td><td><b>sim</b>, por lei complementar, aos Estados, sobre questões específicas</td></tr>
<tr><td><b>23</b></td><td>comum (material)</td><td>União, Estados, DF e Municípios</td><td>—</td></tr>
<tr><td><b>24</b></td><td>concorrente (legislativa)</td><td>União, Estados e DF (<b>não</b> Municípios)</td><td>—</td></tr>
<tr><td><b>30</b></td><td>local</td><td>Municípios</td><td>—</td></tr></table>
${dica('Art. 22 (privativa): <b>CAPACETE de PM</b> — Civil, Agrário, Penal, Aeronáutico, Comercial, Espacial, Trabalho, Eleitoral, Processual e Marítimo. Também trânsito e transporte (XI), desapropriação, águas e energia.<br>Art. 24 (concorrente): <b>PUFETO</b> — Penitenciário, Urbanístico, Financeiro, Econômico, Tributário e Orçamento.')}
<h3>Como funciona a competência concorrente (art. 24, §§1º a 4º)</h3>
${passos([['União', 'edita normas gerais'], ['Estados', 'suplementam com normas específicas'], ['Sem lei federal', 'Estados exercem competência legislativa plena'], ['Lei federal superveniente', 'suspende a eficácia da lei estadual no que lhe for contrária (suspende, não revoga)']])}
<h3>Competência do Município (art. 30)</h3>
<ul><li>Legislar sobre assuntos de <b>interesse local</b>.</li><li>Suplementar a legislação federal e estadual no que couber.</li><li>Instituir e arrecadar seus tributos; criar distritos; organizar os serviços públicos de interesse local, incluído o <b>transporte coletivo</b>, que tem caráter essencial.</li><li>Manter, com a cooperação técnica e financeira da União e do Estado, a <b>educação infantil e o ensino fundamental</b> e os serviços de atendimento à saúde.</li><li>Promover o adequado ordenamento territorial e proteger o patrimônio histórico-cultural local.</li></ul>
${box('Súmulas vinculantes sobre competência', '<ul><li><b>SV 38</b>: é competente o <b>Município</b> para fixar o horário de funcionamento de estabelecimento comercial.</li><li><b>SV 49</b>: ofende a livre concorrência lei municipal que impede a instalação de estabelecimentos comerciais do mesmo ramo em determinada área.</li><li><b>SV 2</b>: é inconstitucional lei estadual ou distrital que disponha sobre <b>loterias</b> e bingos (o STF depois admitiu que os Estados <b>explorem</b> loterias, sem legislar sobre o tema).</li><li><b>SV 46</b>: a definição dos crimes de responsabilidade e o processo e julgamento são da competência legislativa privativa da <b>União</b>.</li></ul>')}
${ex('Lei de Belo Vale que fixa tempo máximo de espera em fila de banco: <b>constitucional</b> (interesse local; STF, Tema 272). Lei de Belo Vale que cria nova infração de trânsito: <b>inconstitucional</b> (trânsito é privativo da União, art. 22, XI).')}
<h3>Competência comum (art. 23) que interessa ao Município</h3>
<p>Cuidar da saúde, proteger o meio ambiente e combater a poluição, preservar florestas, proteger documentos e monumentos históricos, combater as causas da pobreza, promover programas de moradia e saneamento. Leis complementares fixam normas de <b>cooperação</b> entre os entes (parágrafo único), como a LC 140/2011 no meio ambiente.</p>
${peg('A competência <b>concorrente</b> do art. 24 não inclui o Município. Mas ele pode <b>suplementar</b> a legislação federal e estadual no que couber, com base no art. 30, II.')}`),
    quiz: [
      C('A lei complementar pode autorizar os Estados a legislar sobre questões específicas das matérias de competência privativa da União.', 'Art. 22, parágrafo único.'),
      E('A superveniência de lei federal sobre normas gerais revoga a lei estadual no que lhe for contrária.', 'Suspende a eficácia.'),
      C('É competente o Município para fixar o horário de funcionamento de estabelecimento comercial.', 'SV 38.'),
      E('Os Municípios têm competência concorrente com a União para legislar sobre direito financeiro.', 'O art. 24 não inclui os Municípios.'),
    ],
  },

  executivo: {
    html: A(`
<h3>Atribuições do Presidente que podem ser delegadas (art. 84, parágrafo único)</h3>
<p>Das muitas atribuições do art. 84, só três podem ser delegadas a <b>Ministros de Estado, ao Procurador-Geral da República ou ao Advogado-Geral da União</b>:</p>
<ol><li><b>VI</b>: decreto autônomo (organização da administração federal sem aumento de despesa; extinção de cargos vagos);</li><li><b>XII</b>: conceder <b>indulto</b> e comutar penas;</li><li><b>XXV, primeira parte</b>: <b>prover</b> cargos públicos federais.</li></ol>
${dica('“<b>DE-IN-PRO</b>”: DEcreto autônomo, INdulto, PROver cargos.')}
<h3>Responsabilização do Presidente</h3>
<table class="tab"><tr><th></th><th>Crime comum</th><th>Crime de responsabilidade</th></tr>
<tr><td>Autorização</td><td>Câmara, por <b>2/3</b></td><td>Câmara, por <b>2/3</b></td></tr>
<tr><td>Julgamento</td><td><b>STF</b></td><td><b>Senado</b>, presidido pelo Presidente do STF</td></tr>
<tr><td>Suspensão das funções</td><td>com o <b>recebimento da denúncia ou queixa</b> pelo STF</td><td>com a <b>instauração do processo</b> pelo Senado</td></tr>
<tr><td>Condenação</td><td>pena do crime</td><td>por <b>2/3</b> do Senado: perda do cargo e inabilitação por <b>8 anos</b> para função pública</td></tr></table>
<ul><li>Se o julgamento não terminar em <b>180 dias</b>, o Presidente volta ao cargo, sem prejuízo do processo.</li><li>Nas infrações comuns, não pode ser <b>preso</b> enquanto não houver sentença condenatória.</li><li>Na vigência do mandato, não pode ser responsabilizado por atos <b>estranhos</b> ao exercício de suas funções (§4º).</li></ul>
${box('Esses privilégios valem para governadores e prefeitos?', '<b>Não.</b> O STF entende que a imunidade à prisão e a irresponsabilidade por atos estranhos ao mandato são exclusivas do Presidente, como Chefe de Estado. Os Estados não podem exigir autorização da Assembleia para processar o Governador (ADI 5.540). O <b>prefeito</b> é julgado pelo <b>Tribunal de Justiça</b> nos crimes comuns (art. 29, X).')}
<h3>Medidas provisórias (art. 62)</h3>
${passos([['Edição', 'em caso de relevância e urgência, com força de lei'], ['Prazo', '60 dias, prorrogáveis uma vez por mais 60; não corre no recesso'], ['Trancamento de pauta', 'se não apreciada em 45 dias, entra em regime de urgência'], ['Votação', 'comissão mista, depois Câmara, depois Senado'], ['Rejeição ou perda de eficácia', 'o Congresso disciplina as relações por decreto legislativo; vedada a reedição na mesma sessão legislativa']])}
${box('Matérias que não podem ser tratadas por MP (§1º)', '<ul><li>nacionalidade, cidadania, direitos políticos, partidos e direito eleitoral;</li><li>direito <b>penal</b>, processual penal e processual civil;</li><li>organização do Judiciário e do MP, carreira e garantias de seus membros;</li><li>planos plurianuais, diretrizes orçamentárias, orçamento e créditos adicionais (salvo crédito <b>extraordinário</b>);</li><li>detenção ou sequestro de bens, poupança ou ativo financeiro;</li><li>matéria reservada a <b>lei complementar</b>;</li><li>matéria já disciplinada em projeto aprovado pelo Congresso e pendente de sanção ou veto.</li></ul>')}
<h3>Ministros e Conselhos</h3>
<ul><li><b>Ministros de Estado</b>: brasileiros maiores de <b>21 anos</b> no exercício dos direitos políticos (art. 87). Referendam os atos do Presidente.</li><li><b>Conselho da República</b> (art. 89): órgão superior de consulta; pronuncia-se sobre intervenção federal, estado de defesa e estado de sítio. Inclui 6 cidadãos brasileiros natos com mais de 35 anos.</li><li><b>Conselho de Defesa Nacional</b> (art. 91): assuntos de soberania e defesa; também opina sobre declaração de guerra e celebração de paz.</li></ul>
${peg('Os pareceres dos Conselhos são <b>opinativos</b>: o Presidente deve ouvi-los, mas não está obrigado a seguir a opinião.')}`),
    quiz: [
      C('O Presidente da República pode delegar aos Ministros de Estado a concessão de indulto.', 'Art. 84, XII e parágrafo único.'),
      E('Nos crimes de responsabilidade, o Presidente da República é julgado pelo STF.', 'É julgado pelo Senado.'),
      C('É vedada a edição de medida provisória sobre direito penal.', 'Art. 62, §1º, I, b.'),
      E('Os Ministros de Estado devem ter, no mínimo, 35 anos de idade.', 'Mínimo de 21 anos.'),
      C('Segundo o STF, o governador não goza de imunidade à prisão cautelar nos crimes comuns.', 'Prerrogativa exclusiva do Presidente.'),
    ],
  },

  'defesa-estado': {
    html: A(`
<h3>Estado de defesa × estado de sítio</h3>
<table class="tab"><tr><th></th><th>Estado de defesa (art. 136)</th><th>Estado de sítio (arts. 137 a 139)</th></tr>
<tr><td>Hipóteses</td><td>preservar ou restabelecer a ordem pública ou a paz social ameaçadas por <b>grave e iminente instabilidade institucional</b> ou atingidas por <b>calamidades</b> de grandes proporções na natureza</td><td>I: <b>comoção grave de repercussão nacional</b> ou ineficácia do estado de defesa; II: <b>declaração de guerra</b> ou resposta a agressão armada estrangeira</td></tr>
<tr><td>Área</td><td>locais <b>restritos e determinados</b></td><td>pode ser nacional</td></tr>
<tr><td>Decretação</td><td>o Presidente decreta e <b>depois</b> submete ao Congresso em 24 horas</td><td>o Presidente <b>pede autorização prévia</b> ao Congresso</td></tr>
<tr><td>Aprovação</td><td>maioria absoluta, em até 10 dias</td><td>maioria absoluta</td></tr>
<tr><td>Prazo</td><td>até <b>30 dias</b>, prorrogável <b>uma vez</b> por igual período</td><td>I: 30 dias, prorrogáveis <b>cada vez</b> por até 30; II: <b>o tempo que durar a guerra</b></td></tr>
<tr><td>Conselhos</td><td colspan="2">em ambos, o Presidente ouve o Conselho da República e o Conselho de Defesa Nacional (opinião não vinculante)</td></tr></table>
${dica('Estado de <b>D</b>efesa: <b>D</b>ecreta primeiro e <b>D</b>epois o Congresso aprecia. Estado de <b>S</b>ítio: <b>S</b>ó com autorização prévia (<b>S</b>olicita).')}
<h3>Restrições possíveis no estado de defesa</h3>
<ul><li>direito de <b>reunião</b>, ainda que em associações;</li><li>sigilo de <b>correspondência</b> e de comunicação telegráfica e telefônica;</li><li>ocupação e uso temporário de bens e serviços públicos, em caso de calamidade.</li></ul>
<p>A prisão por crime contra o Estado, determinada pelo executor da medida, é comunicada imediatamente ao juiz, e <b>não pode passar de 10 dias</b>, salvo autorização judicial. É <b>vedada a incomunicabilidade</b> do preso.</p>
<h3>Segurança pública (art. 144)</h3>
${cartoes([['🦅', 'Polícia Federal', 'infrações contra a União; tráfico; polícia marítima, aeroportuária e de fronteiras; polícia judiciária da União com exclusividade', COR.azul], ['🛣', 'PRF', 'patrulhamento ostensivo das rodovias federais', COR.amar], ['🚆', 'Polícia Ferroviária Federal', 'patrulhamento ostensivo das ferrovias federais', COR.cinza], ['🔎', 'Polícias Civis', 'polícia judiciária e apuração de infrações penais, exceto as militares', COR.roxo], ['🎖', 'PM e Bombeiros', 'policiamento ostensivo e preservação da ordem pública; defesa civil', COR.verm], ['🔐', 'Polícias Penais', 'segurança dos estabelecimentos penais (EC 104/2019)', COR.verde]])}
${box('Guardas municipais (art. 144, §8º)', '<ul><li>Os Municípios <b>podem</b> (não são obrigados) constituir guardas para a proteção de seus <b>bens, serviços e instalações</b>, conforme dispuser a lei.</li><li>O Estatuto Geral das Guardas Municipais é a <b>Lei 13.022/2014</b>.</li><li>O STF reconheceu que as guardas integram o <b>Sistema Único de Segurança Pública</b> (ADPF 995) e que podem realizar ações de <b>segurança urbana</b>, inclusive policiamento ostensivo e comunitário, respeitadas as atribuições dos outros órgãos e <b>sem atividade de polícia judiciária</b> (Tema 656).</li></ul>')}
<h3>Forças Armadas (art. 142)</h3>
<ul><li>Marinha, Exército e Aeronáutica; organizadas com base na <b>hierarquia e disciplina</b>, sob a autoridade suprema do Presidente.</li><li>Destinam-se à defesa da Pátria, à garantia dos poderes constitucionais e, por iniciativa de qualquer deles, da lei e da ordem.</li><li>Ao militar são proibidas a <b>sindicalização e a greve</b>; enquanto em serviço ativo, não pode estar filiado a partidos.</li><li>Não cabe habeas corpus em relação a <b>punições disciplinares militares</b> (§2º), mas o STF admite o HC para examinar a <b>legalidade</b> da punição (competência, cerimonial, previsão legal).</li></ul>
${peg('A Constituição <b>não</b> pode ser emendada durante o estado de defesa ou de sítio (limitação circunstancial). E o Congresso permanece em funcionamento durante toda a medida.')}`),
    quiz: [
      C('O estado de defesa é decretado pelo Presidente da República e submetido ao Congresso Nacional em até 24 horas.', 'Art. 136, §4º.'),
      E('O estado de sítio motivado por comoção grave de repercussão nacional pode ser decretado sem prévia autorização do Congresso.', 'Sempre exige autorização prévia.'),
      C('No estado de defesa, é vedada a incomunicabilidade do preso.', 'Art. 136, §3º, IV.'),
      E('A Constituição obriga todos os Municípios a criar guardas municipais.', 'É faculdade.'),
      C('O estado de defesa tem prazo máximo de 30 dias, prorrogável uma vez por igual período.', 'Art. 136, §2º.'),
    ],
  },

  'ordem-social': {
    html: A(`
<h3>A seguridade social em três pilares (art. 194)</h3>
${cartoes([['🏥', 'Saúde', 'direito de todos e dever do Estado; independe de contribuição', COR.verde], ['👴', 'Previdência', 'contributiva e de filiação obrigatória; equilíbrio financeiro e atuarial', COR.azul], ['🤲', 'Assistência social', 'a quem dela necessitar, independentemente de contribuição', COR.roxo]])}
${dica('Só a <b>previdência</b> exige contribuição. Saúde e assistência são para quem precisar, contribuindo ou não.')}
<h3>Financiamento (art. 195)</h3>
<p>Toda a sociedade financia, de forma direta e indireta, com recursos dos orçamentos dos entes e das contribuições sociais: do <b>empregador</b> (folha, receita ou faturamento, lucro), do <b>trabalhador</b>, sobre a receita de <b>concursos de prognósticos</b> (loterias) e do <b>importador</b>.</p>
<ul><li>Nenhum benefício ou serviço pode ser criado, majorado ou estendido <b>sem a correspondente fonte de custeio total</b> (§5º).</li><li>As contribuições sociais só podem ser exigidas <b>90 dias</b> após a publicação da lei (§6º): vale a anterioridade <b>nonagesimal</b>, e não a anual.</li><li>As <b>entidades beneficentes de assistência social</b> que atendam aos requisitos da lei complementar são isentas (na verdade, <b>imunes</b>) das contribuições (§7º).</li></ul>
<h3>Saúde (arts. 196 a 200)</h3>
<ul><li>O SUS é organizado com <b>descentralização</b> (direção única em cada esfera), <b>atendimento integral</b> (prioridade às atividades preventivas) e <b>participação da comunidade</b>.</li><li>A iniciativa privada pode participar de forma <b>complementar</b>, com preferência para entidades filantrópicas e sem fins lucrativos. É vedado destinar recursos públicos para auxílios ou subvenções a instituições privadas <b>com fins lucrativos</b>.</li><li>Aplicações mínimas em saúde (LC 141/2012): União, 15% da receita corrente líquida; Estados, 12%; <b>Municípios, 15%</b> da receita de impostos e transferências.</li></ul>
<h3>Assistência social (arts. 203 e 204)</h3>
<p>Garante <b>um salário mínimo</b> de benefício mensal à <b>pessoa com deficiência</b> e ao <b>idoso</b> que comprovem não possuir meios de prover a própria manutenção nem de tê-la provida pela família (BPC, art. 203, V).</p>
<h3>Educação (arts. 205 a 214)</h3>
<ul><li>Direito de todos e dever do Estado e da família.</li><li><b>Educação básica</b> obrigatória e gratuita dos <b>4 aos 17 anos</b>.</li><li>Os <b>Municípios</b> atuam prioritariamente no <b>ensino fundamental e na educação infantil</b>; os Estados, no fundamental e no médio (art. 211).</li><li>Aplicação mínima da receita de impostos (art. 212): <b>União 18%</b>; <b>Estados, DF e Municípios 25%</b>.</li><li>As universidades gozam de autonomia didático-científica, administrativa e de gestão financeira e patrimonial.</li></ul>
${ex('Belo Vale deve aplicar, no mínimo, <b>25%</b> da receita de impostos (incluídas as transferências) em educação e <b>15%</b> em saúde. O descumprimento desses mínimos é uma das hipóteses de <b>intervenção do Estado no Município</b> (art. 35, III).')}
${peg('Contribuição social para a seguridade obedece só à anterioridade de <b>90 dias</b>. Pode ser criada em novembro e cobrada em fevereiro do ano seguinte, ou criada em março e cobrada em junho do mesmo ano.')}`),
    quiz: [
      C('A assistência social será prestada a quem dela necessitar, independentemente de contribuição à seguridade social.', 'Art. 203.'),
      E('As contribuições sociais para a seguridade social sujeitam-se à anterioridade anual.', 'Só à nonagesimal (art. 195, §6º).'),
      C('Os Municípios devem aplicar, anualmente, no mínimo 25% da receita de impostos na manutenção e no desenvolvimento do ensino.', 'Art. 212.'),
      E('A Constituição permite a destinação de recursos públicos para subvenções a instituições privadas de saúde com fins lucrativos.', 'É vedado (art. 199, §2º).'),
    ],
  },

  'ordem-social-2': {
    html: A(`
<h3>Meio ambiente: o que mais cai no art. 225</h3>
<ul><li>Todos têm direito ao meio ambiente ecologicamente equilibrado, bem de <b>uso comum do povo</b>; o dever de defendê-lo é do Poder Público <b>e da coletividade</b>, para as presentes e futuras gerações.</li><li>Exige-se <b>estudo prévio de impacto ambiental</b>, com publicidade, para obra ou atividade potencialmente causadora de <b>significativa</b> degradação.</li><li>Quem explora <b>recursos minerais</b> fica obrigado a recuperar o meio ambiente degradado.</li><li>Condutas lesivas sujeitam pessoas físicas ou <b>jurídicas</b> a sanções <b>penais e administrativas</b>, independentemente da obrigação de reparar o dano (§3º).</li><li>As usinas nucleares devem ter localização definida em <b>lei federal</b>.</li><li>Não são cruéis as práticas desportivas com animais que sejam manifestações culturais registradas como patrimônio imaterial (§7º, EC 96/2017, que respondeu à decisão do STF sobre a vaquejada).</li></ul>
${box('Patrimônio nacional (§4º)', 'Floresta Amazônica brasileira, Mata Atlântica, Serra do Mar, Pantanal Mato-Grossense e Zona Costeira. Atenção: <b>Cerrado e Caatinga não estão na lista</b>.')}
<h3>Família (art. 226)</h3>
<ul><li>A família é a base da sociedade e tem especial proteção do Estado.</li><li>O casamento é civil e a celebração é <b>gratuita</b>.</li><li>É reconhecida a <b>união estável</b> como entidade familiar; o STF estendeu o reconhecimento às uniões homoafetivas (ADI 4.277 e ADPF 132).</li><li>O casamento civil pode ser dissolvido pelo <b>divórcio</b>, sem exigência de prazo de separação (EC 66/2010).</li><li>O <b>planejamento familiar</b> é livre decisão do casal, vedada qualquer forma coercitiva por instituições oficiais ou privadas.</li></ul>
<h3>Criança, adolescente e jovem (arts. 227 e 228)</h3>
<p>É dever da família, da sociedade e do Estado assegurar a eles, com <b>absoluta prioridade</b>, o direito à vida, à saúde, à alimentação, à educação e aos demais direitos fundamentais. São <b>penalmente inimputáveis os menores de 18 anos</b>, sujeitos às normas da legislação especial (ECA). Filhos, havidos ou não do casamento, ou por adoção, têm os <b>mesmos direitos</b>, proibidas discriminações.</p>
<h3>Índios (arts. 231 e 232)</h3>
<ul><li>As terras tradicionalmente ocupadas pelos índios são <b>bens da União</b>, destinadas à sua <b>posse permanente</b>, com <b>usufruto exclusivo</b> das riquezas do solo, rios e lagos.</li><li>O aproveitamento de recursos hídricos e minerais nessas terras depende de <b>autorização do Congresso</b>, ouvidas as comunidades.</li><li>É vedada a remoção dos grupos indígenas, salvo <i>ad referendum</i> do Congresso, em caso de catástrofe ou epidemia, ou no interesse da soberania, garantido o retorno logo que cesse o risco.</li><li>Os índios, suas comunidades e organizações são partes legítimas para ingressar em juízo, com intervenção do MP.</li><li>O STF rejeitou a tese do <b>marco temporal</b> (Tema 1.031, 2023); o assunto voltou a ser discutido após a Lei 14.701/2023.</li></ul>
<h3>Comunicação social (arts. 220 a 224)</h3>
<p>É vedada toda <b>censura</b> de natureza política, ideológica e artística. A empresa jornalística e de radiodifusão é privativa de <b>brasileiros natos ou naturalizados há mais de 10 anos</b>, ou de pessoas jurídicas constituídas sob as leis brasileiras e com sede no País.</p>
${peg('Idoso: o Estatuto considera idoso quem tem <b>60 anos</b>, mas a gratuidade no transporte coletivo urbano garantida pela Constituição é para os maiores de <b>65 anos</b>. Os programas de amparo aos idosos serão executados <b>preferencialmente em seus lares</b>.')}`),
    quiz: [
      C('As pessoas jurídicas estão sujeitas a sanções penais por condutas lesivas ao meio ambiente.', 'Art. 225, §3º.'),
      E('O Cerrado é patrimônio nacional, nos termos do art. 225, §4º, da Constituição.', 'Não está na lista.'),
      C('As terras tradicionalmente ocupadas pelos índios são bens da União.', 'Art. 20, XI, e art. 231.'),
      E('A celebração do casamento civil é sempre onerosa, sendo gratuita apenas para os comprovadamente pobres.', 'A celebração é gratuita (art. 226, §1º).'),
    ],
  },
};
