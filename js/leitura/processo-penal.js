// Leitura R.I.S.K. — Direito Processual Penal (CPP e leis correlatas). Texto original.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, juris, banca, C, E } from './blocos.js';
import { Q1 } from './pp-q1.js';
import { Q2 } from './pp-q2.js';
const BANCO = { ...Q1, ...Q2 };

const BASE = {
  id: 'processo-penal', nome: 'Direito Processual Penal', apelidos: ['processual penal', 'processo penal'],
  lei: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm',
  assuntos: [
    {
      id: 'principios-pp', titulo: 'Princípios, sistema acusatório e lei processual no tempo', arts: 'CPP, arts. 1º a 3º-A',
      chaves: ['principios do processo penal', 'aplicacao da lei processual', 'lei processual penal', 'sistema acusatorio', 'juiz das garantias'],
      html: `
<h3>Visão geral</h3>
<p>O processo penal é o caminho para o Estado aplicar a pena <b>sem violar direitos</b>. Seus princípios vêm da Constituição e, desde o Pacote Anticrime (Lei 13.964/2019), o CPP diz expressamente que o processo tem <b>estrutura acusatória</b> (art. 3º-A).</p>
${cartoes([['📜', 'Devido processo legal', 'ninguém perde a liberdade ou bens sem ele', COR.azul], ['🗣', 'Contraditório e ampla defesa', 'ciência e reação a cada ato', COR.verde], ['⚖️', 'Presunção de inocência', 'até o trânsito em julgado', COR.roxo], ['🤐', 'Não autoincriminação', 'ninguém é obrigado a produzir prova contra si', COR.verm], ['🏛', 'Juiz natural', 'sem tribunal de exceção', COR.lar], ['🚫', 'Vedação das provas ilícitas', 'CF, art. 5º, LVI', COR.cinza]])}
<h3>Sistema acusatório (art. 3º-A)</h3>
<p>Separa as funções: o <b>MP acusa</b>, a <b>defesa defende</b> e o <b>juiz julga</b>. São vedadas a iniciativa do juiz na fase de investigação e a substituição da atuação probatória da acusação. Por isso o juiz <b>não decreta preventiva de ofício</b> nem converte flagrante em preventiva sem pedido.</p>
${box('Juiz das garantias (arts. 3º-B a 3º-F)', '<p>Controla a legalidade da investigação e protege os direitos do investigado. O STF (2023) declarou o instituto <b>constitucional</b>, com ajustes: sua competência vai até o <b>oferecimento da denúncia</b>, e ele não atua nos processos de competência originária dos tribunais, do júri, de violência doméstica e dos Juizados Especiais.</p>')}
<h3>Lei processual no tempo (art. 2º)</h3>
<p>Vale o <b>tempus regit actum</b>: a lei processual tem <b>aplicação imediata</b> aos processos em curso, sem invalidar os atos já praticados sob a lei anterior. Isso vale mesmo que a nova lei seja <b>mais gravosa</b> ao réu.</p>
<table class="tab"><tr><th>Tipo de norma</th><th>Regra no tempo</th></tr>
<tr><td><b>Processual pura</b> (forma de citação, prazos de recurso)</td><td>aplicação imediata</td></tr>
<tr><td><b>Penal</b> (crime, pena)</td><td>não retroage, salvo para beneficiar</td></tr>
<tr><td><b>Mista</b> (processual com efeito penal: representação, perdão, prescrição)</td><td>segue a regra penal: retroage só se for benéfica</td></tr></table>
<p>A lei processual admite <b>interpretação extensiva</b> e <b>aplicação analógica</b>, além do suplemento dos princípios gerais de direito (art. 3º). A lei penal incriminadora não admite analogia contra o réu.</p>
${banca('<ul><li>“A lei processual penal nova não se aplica aos processos em curso” → <b>errado</b>.</li><li>Norma que transforma crime de ação pública incondicionada em condicionada (efeito penal): <b>retroage</b> para beneficiar.</li></ul>')}
${peg('Ao contrário da lei penal, a lei processual pura se aplica de imediato <b>mesmo se prejudicar</b> o réu. A irretroatividade da lei mais grave é regra do Direito <b>Penal</b>.')}`,
      quiz: [C('A lei processual penal aplica-se desde logo, sem prejuízo da validade dos atos realizados sob a vigência da lei anterior.', 'Art. 2º do CPP: tempus regit actum.'), E('A lei processual penal não admite interpretação extensiva nem aplicação analógica.', 'O art. 3º do CPP admite expressamente as duas.'), C('Pelo sistema acusatório adotado no CPP, é vedada a iniciativa do juiz na fase de investigação.', 'Art. 3º-A, incluído pelo Pacote Anticrime.')],
    },
    {
      id: 'inquerito', titulo: 'Inquérito policial', arts: 'CPP, arts. 4º a 23',
      chaves: ['inquerito policial', 'inquerito'],
      html: `
<h3>O que é</h3>
<p>Procedimento <b>administrativo</b>, conduzido pela <b>polícia judiciária</b> (Polícia Civil e Polícia Federal), para apurar a <b>autoria e a materialidade</b> de uma infração penal e fornecer ao titular da ação penal os elementos para acusar.</p>
<h3>Características (decore com exemplos)</h3>
<table class="tab"><tr><th>Característica</th><th>O que significa</th></tr>
<tr><td><b>Administrativo</b></td><td>não é processo; não há acusação formal nem sentença</td></tr>
<tr><td><b>Inquisitivo</b></td><td>não há contraditório pleno; o investigado não é “parte”</td></tr>
<tr><td><b>Escrito</b></td><td>todas as peças reduzidas a escrito (art. 9º)</td></tr>
<tr><td><b>Sigiloso</b></td><td>sigilo necessário à elucidação (art. 20), mas o advogado acessa o que já foi documentado (Súmula Vinculante 14)</td></tr>
<tr><td><b>Dispensável</b></td><td>se o MP já tiver elementos, pode denunciar sem inquérito</td></tr>
<tr><td><b>Indisponível</b></td><td>o delegado <b>não pode arquivar</b> o inquérito (art. 17)</td></tr>
<tr><td><b>Discricionário</b></td><td>o delegado escolhe as diligências; pode negar as pedidas pelo ofendido ou indiciado, exceto o exame de corpo de delito (art. 14 e art. 184)</td></tr>
<tr><td><b>Oficioso e oficial</b></td><td>na ação pública incondicionada, é instaurado de ofício, por órgão oficial</td></tr></table>
<h3>Como começa</h3>
${cartoes([['🔓', 'Ação pública incondicionada', 'de ofício (portaria), por requisição do MP, por requerimento do ofendido ou pelo auto de prisão em flagrante', COR.verde], ['🔐', 'Ação pública condicionada', 'só com representação do ofendido ou requisição do Ministro da Justiça (art. 5º, §4º)', COR.lar], ['👤', 'Ação privada', 'só com requerimento de quem pode ajuizar a queixa (art. 5º, §5º)', COR.roxo]])}
<h3>Prazos para concluir</h3>
<table class="tab"><tr><th>Situação</th><th>Indiciado preso</th><th>Indiciado solto</th></tr>
<tr><td>Regra geral (CPP, art. 10)</td><td><b>10 dias</b></td><td><b>30 dias</b>, prorrogáveis pelo juiz</td></tr>
<tr><td>Justiça Federal (Lei 5.010/1966)</td><td>15 dias + 15</td><td>30 dias</td></tr>
<tr><td>Lei de Drogas (Lei 11.343/2006)</td><td>30 dias (duplicável)</td><td>90 dias (duplicável)</td></tr></table>
<h3>Indiciamento e encerramento</h3>
<ul><li><b>Indiciamento</b> é ato <b>privativo do delegado</b>, fundamentado, com análise técnico-jurídica do fato, da autoria, da materialidade e das circunstâncias (Lei 12.830/2013, art. 2º, §6º).</li><li>O inquérito termina com o <b>relatório</b> da autoridade, enviado ao juiz e ao MP.</li><li>O <b>arquivamento</b> é decidido pelo <b>MP</b>, com comunicação à vítima, ao investigado e à polícia, e submetido à revisão (art. 28, com a interpretação dada pelo STF).</li><li>Arquivado o inquérito por falta de provas, a polícia pode fazer <b>novas pesquisas</b> se souber de outras provas (art. 18). Sem provas novas, a ação não pode ser iniciada (Súmula 524 do STF).</li></ul>
${box('Valor probatório', '<p>O juiz <b>não pode</b> condenar com base <b>exclusiva</b> nos elementos do inquérito, ressalvadas as provas <b>cautelares, não repetíveis e antecipadas</b> (art. 155). Por ser peça informativa, eventuais <b>vícios</b> do inquérito não anulam a ação penal.</p>')}
${juris('<ul><li><b>Súmula Vinculante 14</b>: o defensor tem direito de acesso amplo aos elementos de prova <b>já documentados</b> no procedimento investigatório.</li><li>O MP pode investigar diretamente (STF, RE 593.727).</li></ul>')}
${dica('Características do IP: “<b>ESCrito, SIgiloso, INquisitivo, DIspensável, INdisponível, DIScricionário</b>”: <b>E-SI-IN-DI-IN-DIS</b>.')}
${peg('A <b>autoridade policial não pode mandar arquivar</b> autos de inquérito (art. 17). E o sigilo do inquérito <b>não</b> alcança o advogado em relação às diligências já documentadas.')}`,
      quiz: [E('A autoridade policial pode determinar o arquivamento do inquérito policial quando concluir pela atipicidade do fato.', 'O art. 17 do CPP proíbe o delegado de arquivar o inquérito.'), C('Estando o indiciado preso, o inquérito policial deve terminar no prazo de 10 dias, conforme a regra geral do CPP.', 'Art. 10 do CPP.'), C('O inquérito policial é dispensável, podendo o Ministério Público oferecer denúncia com base em outros elementos de informação.', 'O inquérito serve para formar a opinião do MP, mas não é obrigatório.')],
    },
    {
      id: 'diligencias', titulo: 'Diligências investigatórias (arts. 6º, 7º e 13 do CPP)', arts: 'CPP, arts. 6º a 14',
      chaves: ['diligencias investigatorias', 'arts. 6o e 13', 'art. 6o', 'diligencias'],
      html: `
<h3>O que a autoridade policial deve fazer (art. 6º)</h3>
<p>Assim que souber da infração, a autoridade policial deverá:</p>
${passos([['Ir ao local', 'e garantir que não se alterem o estado e a conservação das coisas até a chegada dos peritos (I)'], ['Apreender objetos', 'relacionados ao fato, depois de liberados pelos peritos (II)'], ['Colher todas as provas', 'que sirvam para esclarecer o fato e suas circunstâncias (III)'], ['Ouvir o ofendido', '(IV)'], ['Ouvir o indiciado', 'com as regras do interrogatório judicial, assinado por duas testemunhas que ouviram a leitura (V)'], ['Reconhecimentos e acareações', '(VI)'], ['Exame de corpo de delito e outras perícias', '(VII)'], ['Identificação datiloscópica', 'se possível, e juntar a folha de antecedentes (VIII)'], ['Averiguar a vida pregressa', 'individual, familiar, social, econômica e o estado de ânimo antes, durante e depois do crime (IX)'], ['Informações sobre filhos', 'existência, idades, deficiência e responsável pelos cuidados (X)']])}
<h3>Reprodução simulada (art. 7º)</h3>
<p>A autoridade pode fazer a <b>reconstituição</b> do crime, desde que não contrarie a <b>moralidade</b> ou a <b>ordem pública</b>. O investigado <b>não é obrigado</b> a participar (não autoincriminação).</p>
<h3>Atribuições do art. 13</h3>
<ul><li>Fornecer às autoridades judiciárias as informações para a instrução e o julgamento.</li><li>Realizar as diligências <b>requisitadas</b> pelo juiz ou pelo MP.</li><li>Cumprir os <b>mandados de prisão</b>.</li><li><b>Representar</b> pela prisão preventiva.</li></ul>
${box('Arts. 13-A e 13-B: crimes contra a liberdade e tráfico de pessoas', '<ul><li><b>13-A</b>: o MP ou o delegado podem <b>requisitar diretamente</b> a órgãos públicos e empresas dados e informações cadastrais da vítima ou dos suspeitos. Resposta em <b>24 horas</b>.</li><li><b>13-B</b>: mediante <b>autorização judicial</b>, podem requisitar às operadoras os sinais que permitam localizar a vítima ou os suspeitos. Sem manifestação do juiz em <b>12 horas</b>, a autoridade pode requisitar diretamente, comunicando o juiz de imediato.</li></ul>')}
<h3>Pedido de diligências (art. 14)</h3>
<p>O ofendido ou o indiciado podem <b>requerer</b> diligências, que serão feitas ou não, <b>a juízo da autoridade</b>. Exceção: o <b>exame de corpo de delito</b> não pode ser negado quando necessário (art. 184).</p>
${ex('<p>Num acidente com vítima numa rodovia federal, o policial que chega primeiro deve preservar o local e acionar a perícia. Mas, pela <b>Lei 5.970/1973</b>, pode autorizar a <b>remoção imediata</b> dos feridos e dos veículos que estejam no leito da via e prejudiquem o tráfego, registrando tudo em boletim de ocorrência.</p>', 'Ligação com a PRF')}
${peg('O delegado pode <b>negar</b> diligência pedida pelo ofendido ou pelo indiciado (art. 14), mas <b>deve cumprir</b> as diligências <b>requisitadas</b> pelo juiz ou pelo MP (art. 13, II).')}`,
      quiz: [C('Logo que tiver conhecimento da infração penal, a autoridade policial deverá dirigir-se ao local, providenciando para que não se alterem o estado e a conservação das coisas até a chegada dos peritos criminais.', 'Art. 6º, I, do CPP.'), E('O investigado é obrigado a participar da reprodução simulada dos fatos, sob pena de desobediência.', 'Ninguém é obrigado a produzir prova contra si; a reconstituição depende da colaboração do investigado.'), C('A autoridade policial pode indeferir diligência requerida pelo ofendido, exceto o exame de corpo de delito.', 'Arts. 14 e 184 do CPP.')],
    },
    {
      id: 'acao-penal', titulo: 'Ação penal: espécies, condições e princípios', arts: 'CPP, arts. 24 a 62',
      chaves: ['acao penal'],
      html: `
<h3>O que é</h3>
<p>É o direito de pedir ao Judiciário a aplicação da lei penal a um caso concreto. A regra é a ação <b>pública incondicionada</b>; as demais precisam estar <b>expressas</b> na lei (“somente se procede mediante representação / queixa”).</p>
${cartoes([['🏛', 'Pública incondicionada', 'MP denuncia sem depender de ninguém', COR.azul], ['✍️', 'Pública condicionada', 'MP depende de representação do ofendido ou requisição do Ministro da Justiça', COR.lar], ['👤', 'Privada', 'o ofendido oferece queixa-crime por advogado', COR.roxo]])}
<h3>Princípios</h3>
<table class="tab"><tr><th>Ação pública</th><th>Ação privada</th></tr>
<tr><td><b>Obrigatoriedade</b>: havendo justa causa, o MP deve denunciar (mitigada pela transação penal e pelo acordo de não persecução)</td><td><b>Oportunidade</b>: o ofendido decide se processa</td></tr>
<tr><td><b>Indisponibilidade</b>: o MP não pode desistir da ação (art. 42) nem do recurso (art. 576)</td><td><b>Disponibilidade</b>: pode haver perdão, perempção e desistência</td></tr>
<tr><td><b>Oficialidade</b>: proposta por órgão oficial</td><td><b>Indivisibilidade</b>: a queixa contra um obriga ao processo de todos (art. 48)</td></tr></table>
<h3>Representação e queixa: prazos e regras</h3>
<ul><li><b>Prazo decadencial</b>: <b>6 meses</b> contados do dia em que o ofendido souber <b>quem é o autor</b> (art. 38).</li><li>A <b>representação</b> não exige forma especial e é <b>retratável até o oferecimento</b> da denúncia (art. 25).</li><li>A <b>renúncia</b> (antes da queixa) e o <b>perdão</b> (depois, aceito pelo querelado) extinguem a punibilidade na ação privada. A renúncia a um dos autores alcança todos (art. 49).</li><li><b>Perempção</b> (art. 60): desídia do querelante (ex.: deixar o processo parado por 30 dias seguidos ou faltar a ato sem justificativa).</li></ul>
${box('Ação privada subsidiária da pública (art. 29; CF, art. 5º, LIX)', '<p>Se o MP fica <b>inerte</b> no prazo legal (não denuncia, não pede arquivamento, não requisita diligências), o ofendido pode oferecer queixa. Prazo: <b>6 meses</b> contados do fim do prazo do MP. O MP pode aditar, repudiar e oferecer denúncia substitutiva, e retoma a ação se o querelante for negligente.</p>')}
<h3>Denúncia</h3>
<ul><li>Requisitos (art. 41): exposição do fato com todas as circunstâncias, qualificação do acusado, classificação do crime e rol de testemunhas, quando necessário.</li><li>Prazo para oferecer (art. 46): <b>5 dias</b> com réu preso; <b>15 dias</b> com réu solto.</li><li>Rejeição (art. 395): inépcia, falta de pressuposto processual ou condição da ação, ou <b>falta de justa causa</b>.</li></ul>
${box('Acordo de não persecução penal (art. 28-A)', '<p>Cabe quando: não for caso de arquivamento · o investigado <b>confessa</b> formal e circunstanciadamente · infração <b>sem violência ou grave ameaça</b> · pena mínima <b>inferior a 4 anos</b>. <b>Não</b> cabe: se couber transação penal; para reincidente ou criminoso habitual; para quem recebeu ANPP, transação ou suspensão nos 5 anos anteriores; em violência doméstica ou contra a mulher por razões da condição de sexo feminino.</p>')}
${dica('Prazos de 6 meses: <b>decadência</b> da representação e da queixa, e prazo da <b>subsidiária</b>. Prazos da denúncia: “<b>5 preso, 15 solto</b>”.')}
${peg('A representação é retratável até o <b>oferecimento</b> da denúncia, e não até o recebimento. Na Lei Maria da Penha, a renúncia à representação só pode ocorrer <b>perante o juiz</b>, em audiência, antes do recebimento.')}`,
      quiz: [C('O direito de representação deve ser exercido no prazo de 6 meses, contado do dia em que o ofendido vier a saber quem é o autor do crime.', 'Art. 38 do CPP.'), E('Oferecida a denúncia, o Ministério Público pode desistir da ação penal pública.', 'Princípio da indisponibilidade: art. 42 do CPP.'), C('Na ação penal privada, a queixa contra qualquer dos autores do crime obrigará ao processo de todos.', 'Princípio da indivisibilidade: art. 48 do CPP.')],
    },
    {
      id: 'tco', titulo: 'Termo circunstanciado (Lei 9.099/1995) e atos processuais', arts: 'Lei 9.099/1995, arts. 60 a 92 · CPP, arts. 351 a 372 e 797 a 798',
      chaves: ['termo circunstanciado', 'tco', 'juizados especiais criminais', 'atos processuais', '9.099'],
      html: `
<h3>Infração de menor potencial ofensivo (art. 61)</h3>
<p>São as <b>contravenções penais</b> e os <b>crimes com pena máxima não superior a 2 anos</b>, cumulada ou não com multa. São julgadas pelo <b>Juizado Especial Criminal</b>.</p>
${cartoes([['🗣', 'Oralidade'], ['📄', 'Simplicidade'], ['🤝', 'Informalidade'], ['💰', 'Economia processual'], ['⚡', 'Celeridade']])}
<h3>O termo circunstanciado (art. 69)</h3>
<p>Em vez de auto de prisão em flagrante e inquérito, a autoridade policial lavra o <b>TCO</b> e o encaminha <b>imediatamente</b> ao Juizado, com o autor do fato e a vítima, providenciando as requisições de exames periciais.</p>
${box('Sem prisão e sem fiança (art. 69, parágrafo único)', '<p>Se o autor do fato for <b>imediatamente encaminhado</b> ao Juizado ou <b>assumir o compromisso</b> de comparecer, <b>não</b> se imporá prisão em flagrante nem se exigirá fiança. Em violência doméstica, o juiz pode determinar o afastamento do lar.</p>')}
${juris('<p>O STF entende que o TCO <b>não é ato de investigação</b> exclusivo da polícia judiciária, podendo ser lavrado por outras autoridades policiais, como a PRF e a PM. E, nos crimes de violência doméstica contra a mulher, a Lei 9.099 <b>não se aplica</b> (Lei 11.340/2006, art. 41; Súmula 536 do STJ).</p>')}
<h3>Os institutos despenalizadores</h3>
<table class="tab"><tr><th>Instituto</th><th>Quando</th><th>Efeito</th></tr>
<tr><td><b>Composição civil</b> (art. 74)</td><td>acordo de reparação entre autor e vítima</td><td>homologada, na ação privada ou pública condicionada, acarreta <b>renúncia</b> à queixa ou à representação</td></tr>
<tr><td><b>Transação penal</b> (art. 76)</td><td>proposta do MP de pena restritiva de direitos ou multa</td><td>não gera reincidência nem antecedentes; impede novo benefício por 5 anos</td></tr>
<tr><td><b>Suspensão condicional do processo</b> (art. 89)</td><td>crimes com pena <b>mínima</b> igual ou inferior a <b>1 ano</b> (mesmo fora do Juizado)</td><td>processo suspenso por 2 a 4 anos; cumpridas as condições, extingue-se a punibilidade</td></tr></table>
<p>A lesão corporal <b>leve</b> e a lesão <b>culposa</b> dependem de <b>representação</b> (art. 88).</p>
<h3>Atos processuais: forma, lugar e tempo (CPP)</h3>
<ul><li>Atos podem ser praticados em <b>férias, domingos e feriados</b>; as sessões de julgamento, não (art. 797).</li><li><b>Prazos</b> são contínuos e peremptórios. <b>Exclui-se o dia do começo e inclui-se o do vencimento</b> (art. 798, §1º). Terminando em domingo ou feriado, prorroga-se para o dia útil seguinte.</li><li>Intimação na sexta-feira: o prazo começa na segunda-feira (Súmula 310 do STF).</li><li><b>Citação</b>: pessoal por mandado (regra), por hora certa (réu que se oculta) ou por edital (réu não encontrado). Citado por edital que não comparece nem constitui advogado: <b>suspendem-se o processo e a prescrição</b> (art. 366).</li><li>No Juizado não há citação por edital: o caso vai para o juízo comum (Lei 9.099, art. 66, parágrafo único).</li></ul>
${peg('Prazo <b>penal</b> (de prescrição, decadência) inclui o dia do começo (CP, art. 10). Prazo <b>processual</b> exclui o dia do começo (CPP, art. 798, §1º).')}`,
      quiz: [C('Consideram-se infrações de menor potencial ofensivo as contravenções penais e os crimes a que a lei comine pena máxima não superior a 2 anos, cumulada ou não com multa.', 'Art. 61 da Lei 9.099/1995.'), E('Ao autor do fato que assume o compromisso de comparecer ao Juizado, impõe-se a prisão em flagrante, com fiança.', 'Nesse caso não se impõe prisão em flagrante nem se exige fiança (art. 69, parágrafo único).'), C('Na contagem dos prazos processuais penais, não se computa o dia do começo, incluindo-se o do vencimento.', 'Art. 798, §1º, do CPP.')],
    },
    {
      id: 'prova', titulo: 'Prova: conceito, ônus, provas ilícitas, cadeia de custódia e local de crime', arts: 'CPP, arts. 155 a 159 e 158-A a 158-F',
      chaves: ['prova: conceito', 'provas ilicitas', 'cadeia de custodia', 'preservacao de local', 'teoria geral da prova', 'onus da prova'],
      html: `
<h3>Conceitos básicos</h3>
<ul><li><b>Objeto da prova</b>: os fatos relevantes. O <b>direito</b> não precisa ser provado, exceto o municipal, estadual, estrangeiro ou consuetudinário.</li><li><b>Ônus</b>: a prova da alegação incumbe a <b>quem a fizer</b> (art. 156).</li><li><b>Sistema de valoração</b>: <b>persuasão racional</b> (livre convencimento motivado) (art. 155). No Tribunal do Júri, os jurados decidem por <b>íntima convicção</b>.</li><li><b>Elementos informativos</b> (inquérito) x <b>provas</b> (produzidas em contraditório judicial). O juiz não pode condenar só com os primeiros, salvo provas cautelares, não repetíveis e antecipadas.</li></ul>
<h3>Provas ilícitas (art. 157)</h3>
<p>São <b>inadmissíveis</b> e devem ser <b>desentranhadas</b> do processo as provas obtidas com violação a normas constitucionais ou legais.</p>
${cartoes([['🌳', 'Frutos da árvore envenenada', 'as derivadas das ilícitas também são inadmissíveis', COR.verm], ['🔀', 'Fonte independente', 'admitida se puder ser obtida por fonte autônoma', COR.verde], ['🔗', 'Ausência de nexo', 'admitida se não houver nexo causal com a ilícita', COR.azul], ['🧭', 'Descoberta inevitável', 'seria obtida de qualquer jeito pelos trâmites normais', COR.lar]])}
${juris('<ul><li><b>Gravação ambiental</b> feita por um dos interlocutores, sem conhecimento do outro, é <b>lícita</b> (STF, RE 583.937), salvo causa legal de sigilo.</li><li>Acesso ao <b>WhatsApp</b> do celular apreendido sem autorização judicial é <b>prova ilícita</b> (STJ).</li><li>A prova ilícita pode ser usada em favor do <b>réu</b> para provar sua inocência (proporcionalidade).</li></ul>')}
<h3>Cadeia de custódia (arts. 158-A a 158-F)</h3>
<p>É o conjunto de procedimentos para <b>manter e documentar a história cronológica</b> do vestígio, desde o reconhecimento até o descarte. Começa com a <b>preservação do local</b> ou com o procedimento em que se detecta o vestígio. O agente público que reconhece um elemento de potencial interesse fica <b>responsável por sua preservação</b>.</p>
${passos([['Reconhecimento', 'distinguir o elemento de interesse'], ['Isolamento', 'evitar alteração do local'], ['Fixação', 'descrever, fotografar, filmar'], ['Coleta', 'recolher o vestígio'], ['Acondicionamento', 'embalar e lacrar'], ['Transporte', 'manter as condições'], ['Recebimento', 'registrar a entrega'], ['Processamento', 'perícia'], ['Armazenamento', 'guarda para contraperícia'], ['Descarte', 'liberação conforme a lei']])}
<h3>Exame de corpo de delito (arts. 158 e 167)</h3>
<ul><li>Infração que deixa <b>vestígios</b>: o exame é <b>indispensável</b>, direto ou indireto, e a <b>confissão não supre</b> sua falta.</li><li>Desaparecidos os vestígios, a <b>prova testemunhal</b> pode suprir (art. 167).</li><li>Prioridade: violência doméstica e familiar contra a mulher e violência contra criança, adolescente, idoso ou pessoa com deficiência.</li><li>Feito por <b>1 perito oficial</b> com curso superior. Na falta, por <b>2 pessoas idôneas</b> com diploma superior (art. 159).</li></ul>
${dica('Cadeia de custódia, 10 etapas: “<b>RI-FI-CO-A-T-RE-PRO-AR-DE</b>”: Reconhecimento, Isolamento, Fixação, Coleta, Acondicionamento, Transporte, Recebimento, Processamento, Armazenamento e Descarte.')}
${peg('A <b>confissão</b> do acusado <b>não supre</b> o exame de corpo de delito. Quem supre, na falta de vestígios, é a prova <b>testemunhal</b>.')}`,
      quiz: [C('São inadmissíveis as provas derivadas das ilícitas, salvo quando não evidenciado o nexo de causalidade entre umas e outras ou quando puderem ser obtidas por uma fonte independente.', 'Art. 157, §1º, do CPP.'), E('Nas infrações que deixam vestígios, a confissão do acusado supre a falta do exame de corpo de delito.', 'A confissão não supre o exame (art. 158). Se os vestígios desapareceram, a prova testemunhal pode suprir (art. 167).'), C('O agente público que reconhecer um elemento como de potencial interesse para a produção da prova pericial fica responsável por sua preservação.', 'Art. 158-A, §2º, do CPP.')],
    },
    {
      id: 'meios-prova', titulo: 'Meios de prova: interrogatório, confissão, ofendido, testemunhas e reconhecimento', arts: 'CPP, arts. 185 a 239',
      chaves: ['meios de prova', 'interrogatorio', 'confissao', 'testemunhas', 'reconhecimento de pessoas', 'acareacao'],
      html: `
<h3>Interrogatório (arts. 185 a 196)</h3>
<ul><li>É <b>meio de defesa</b> e de prova. A presença do <b>defensor</b> é obrigatória.</li><li>O acusado será informado do direito de <b>permanecer calado</b>. O silêncio <b>não importa confissão</b> e não pode ser interpretado em prejuízo da defesa (art. 186).</li><li>O silêncio vale para o <b>mérito</b>; sobre a qualificação (nome, endereço), o réu deve responder.</li><li><b>Videoconferência</b> é excepcional, por decisão fundamentada, para prevenir risco à segurança, viabilizar a participação do réu ou proteger testemunha ou vítima (art. 185, §2º).</li><li>No processo, o interrogatório é o <b>último ato</b> da instrução (art. 400).</li></ul>
<h3>Confissão (arts. 197 a 200)</h3>
${cartoes([['✂️', 'Divisível', 'o juiz pode aceitar uma parte e rejeitar outra', COR.azul], ['↩️', 'Retratável', 'o réu pode voltar atrás', COR.verde], ['⚖️', 'Valor relativo', 'confrontada com as demais provas', COR.lar]])}
<h3>Ofendido (art. 201)</h3>
<p>A vítima é ouvida sobre as circunstâncias do crime, quem seja ou presuma ser o autor e as provas que possa indicar. <b>Não presta compromisso</b> de dizer a verdade (não comete falso testemunho) e, se não comparecer sem motivo justo, pode ser <b>conduzida coercitivamente</b>.</p>
<h3>Testemunhas (arts. 202 a 225)</h3>
<table class="tab"><tr><th>Situação</th><th>Regra</th></tr>
<tr><td>Quem pode ser testemunha</td><td><b>toda pessoa</b> (art. 202)</td></tr>
<tr><td>Podem <b>recusar-se</b> a depor (art. 206)</td><td>ascendente, descendente, afim em linha reta, cônjuge (ainda que separado), irmão, pai, mãe e filho adotivo, salvo se não houver outro modo de obter a prova</td></tr>
<tr><td><b>Não prestam compromisso</b> (art. 208)</td><td>doentes mentais, menores de 14 anos e os parentes do art. 206 (informantes)</td></tr>
<tr><td><b>Proibidas</b> de depor (art. 207)</td><td>quem deve guardar segredo por função, ministério, ofício ou profissão, salvo se desobrigado pela parte e quiser depor</td></tr>
<tr><td>Forma das perguntas (art. 212)</td><td>as partes perguntam <b>diretamente</b>; o juiz complementa</td></tr>
<tr><td>Número máximo</td><td>procedimento ordinário: <b>8</b> por parte · sumário: <b>5</b> · plenário do júri: <b>5</b></td></tr></table>
<h3>Reconhecimento de pessoas (art. 226)</h3>
${passos([['Descrição', 'quem vai reconhecer descreve a pessoa'], ['Alinhamento', 'a pessoa é colocada, se possível, ao lado de outras parecidas'], ['Apontamento', 'quem reconhece aponta'], ['Auto', 'lavra-se auto pormenorizado, assinado por duas testemunhas']])}
${juris('<p>O STJ (HC 598.886/SC) firmou que as formalidades do art. 226 são <b>garantia mínima</b>: o reconhecimento feito sem elas é inválido e não pode, sozinho, fundamentar condenação. O reconhecimento <b>fotográfico</b> deve seguir o mesmo procedimento e ser confirmado em juízo.</p>')}
<h3>Outros meios</h3>
<ul><li><b>Acareação</b> (art. 229): confronto entre pessoas com declarações divergentes sobre fatos relevantes.</li><li><b>Documentos</b> (art. 231): podem ser juntados em <b>qualquer fase</b> do processo.</li><li><b>Indícios</b> (art. 239): circunstância conhecida e provada que, por indução, permite concluir outra.</li></ul>
${peg('O cônjuge e os parentes próximos podem se recusar a depor, mas, se depuserem, são ouvidos <b>sem compromisso</b> (informantes) e não respondem por falso testemunho.')}`,
      quiz: [C('O silêncio do acusado no interrogatório não importará confissão e não poderá ser interpretado em prejuízo da defesa.', 'Art. 186, parágrafo único, do CPP.'), E('A confissão é indivisível e irretratável.', 'Ela é divisível e retratável (art. 200).'), C('São proibidas de depor as pessoas que, em razão de função, ministério, ofício ou profissão, devam guardar segredo, salvo se, desobrigadas pela parte interessada, quiserem dar o seu testemunho.', 'Art. 207 do CPP.')],
    },
    {
      id: 'busca', titulo: 'Busca e apreensão: pessoal e domiciliar', arts: 'CPP, arts. 240 a 250',
      chaves: ['busca e apreensao', 'busca pessoal', 'busca domiciliar'],
      html: `
<h3>Duas espécies (art. 240)</h3>
${cartoes([['🏠', 'Domiciliar', 'em casa, com fundadas razões e, em regra, mandado judicial', COR.azul], ['🧍', 'Pessoal', 'na pessoa, em seus pertences e no veículo, com fundada suspeita', COR.lar]])}
<h3>Busca domiciliar</h3>
<ul><li>Exige <b>mandado judicial</b>, salvo flagrante delito, desastre, prestação de socorro ou consentimento do morador (CF, art. 5º, XI).</li><li>Com mandado, só <b>durante o dia</b>, salvo se o morador consentir com a entrada à noite (art. 245).</li><li>O mandado deve indicar a casa, o nome do morador (se possível), o motivo e os fins da diligência (art. 243).</li><li>“Casa” abrange qualquer compartimento habitado, aposento de habitação coletiva e o compartimento não aberto ao público onde alguém exerce profissão (escritório, consultório).</li></ul>
${juris('<ul><li><b>STF, Tema 280 (RE 603.616)</b>: a entrada forçada em domicílio sem mandado, mesmo à noite, é lícita quando amparada em <b>fundadas razões</b>, justificadas <b>depois</b> (a posteriori), que indiquem que dentro da casa ocorre <b>flagrante delito</b>.</li><li><b>STJ</b>: denúncia anônima isolada, fuga ao ver a polícia ou “atitude suspeita” <b>não bastam</b> para entrar na casa. O consentimento do morador deve ser <b>comprovado</b> (de preferência por escrito e gravação).</li></ul>')}
<h3>Busca pessoal (art. 244)</h3>
<p><b>Independe de mandado</b>:</p>
<ul><li>no caso de <b>prisão</b>;</li><li>quando houver <b>fundada suspeita</b> de que a pessoa esteja com <b>arma proibida</b> ou objetos e papéis que constituam <b>corpo de delito</b>;</li><li>quando determinada no curso de <b>busca domiciliar</b>.</li></ul>
${box('Fundada suspeita (o que o STJ exige)', '<p>A suspeita precisa ser <b>objetiva</b>, baseada em elementos concretos e descritos, e não em impressão subjetiva, intuição, aparência ou “nervosismo” do abordado (STJ, RHC 158.580). Isso vale também para a busca em <b>veículos</b>, que se equipara à busca pessoal, salvo quando o veículo é usado como <b>moradia</b> (trailer, cabine de caminhão usada para habitação).</p>')}
<ul><li><b>Mulher</b>: a busca será feita por outra mulher, se não houver retardamento ou prejuízo da diligência (art. 249).</li><li><b>Escritório de advocacia</b>: só com mandado específico, presença de representante da OAB e vedada a apreensão de documentos de clientes não investigados (Estatuto da OAB, art. 7º, §6º).</li></ul>
${ex('<p>Numa fiscalização de rotina na BR, o policial sente forte cheiro de maconha vindo do carro e vê um tablete no banco traseiro. Há <b>fundada suspeita objetiva</b> (percebida pelos sentidos) para revistar o veículo, sem mandado.</p><p>Já revistar só porque o motorista “ficou nervoso” ao ser abordado <b>não</b> é fundada suspeita para o STJ.</p>', 'Exemplo prático')}
${dica('Domiciliar: “<b>dia + mandado</b>” (ou flagrante, desastre, socorro, consentimento). Pessoal: “<b>fundada suspeita</b>, sem mandado”.')}
${peg('Mesmo com mandado judicial, a busca domiciliar à <b>noite</b> depende do <b>consentimento</b> do morador. O que autoriza a entrada noturna sem consentimento é o <b>flagrante</b>, o desastre ou o socorro.')}`,
      quiz: [C('A busca pessoal independe de mandado quando houver fundada suspeita de que a pessoa esteja na posse de arma proibida ou de objetos que constituam corpo de delito.', 'Art. 244 do CPP.'), E('Com mandado judicial, a busca domiciliar pode ser realizada a qualquer hora do dia ou da noite, independentemente de consentimento.', 'Com mandado, a busca é feita durante o dia; à noite, só com consentimento (CF, art. 5º, XI; CPP, art. 245).'), C('Segundo o STF, a entrada forçada em domicílio sem mandado judicial só é lícita quando amparada em fundadas razões, justificadas a posteriori, que indiquem situação de flagrante delito.', 'Tema 280 de repercussão geral (RE 603.616).')],
    },
    {
      id: 'flagrante', titulo: 'Prisão em flagrante e audiência de custódia', arts: 'CPP, arts. 301 a 310 e 322 a 323',
      chaves: ['prisao em flagrante', 'flagrante', 'audiencia de custodia'],
      html: `
<h3>Quem pode prender (art. 301)</h3>
${cartoes([['🧑', 'Flagrante facultativo', 'qualquer do povo <b>poderá</b> prender', COR.azul], ['👮', 'Flagrante obrigatório', 'as autoridades policiais e seus agentes <b>deverão</b> prender', COR.verm]])}
<h3>Espécies de flagrante (art. 302)</h3>
<table class="tab"><tr><th>Espécie</th><th>Situação</th></tr>
<tr><td><b>Próprio</b> (real)</td><td>está cometendo ou <b>acaba de cometer</b> a infração (I e II)</td></tr>
<tr><td><b>Impróprio</b> (quase-flagrante)</td><td>é <b>perseguido, logo após</b>, em situação que faça presumir ser o autor (III). A perseguição pode durar horas, desde que contínua</td></tr>
<tr><td><b>Presumido</b> (ficto)</td><td>é <b>encontrado, logo depois</b>, com instrumentos, armas, objetos ou papéis que façam presumir ser o autor (IV)</td></tr></table>
<h3>Outras modalidades</h3>
<ul><li><b>Preparado ou provocado</b>: a polícia induz o crime e impede a consumação → <b>crime impossível</b>, prisão ilegal (Súmula 145 do STF).</li><li><b>Esperado</b>: a polícia, sabendo do crime, apenas aguarda e prende → <b>válido</b>.</li><li><b>Forjado</b>: a polícia cria provas falsas → ilegal, e o policial comete crime.</li><li><b>Diferido ou retardado</b> (ação controlada): a polícia adia a prisão para o momento mais eficaz, nos casos previstos em lei (organização criminosa, drogas).</li><li><b>Crime permanente</b> (ex.: guardar droga, manter refém): o flagrante é possível enquanto durar a permanência (art. 303).</li></ul>
<h3>Lavratura do auto (arts. 304 a 306)</h3>
${passos([['Ouvir o condutor', 'quem apresentou o preso; recebe recibo de entrega'], ['Ouvir as testemunhas', ''], ['Interrogar o preso', 'informando o direito ao silêncio'], ['Comunicar imediatamente', 'juiz, MP e a família ou pessoa indicada pelo preso'], ['Entregar a nota de culpa', 'em até 24 horas, com o motivo da prisão e os nomes do condutor e das testemunhas'], ['Enviar o auto ao juiz em 24 horas', 'e cópia à Defensoria se o preso não tiver advogado']])}
${box('Audiência de custódia (art. 310)', '<p>Em até <b>24 horas</b> após a prisão, o juiz ouve o preso, com MP e defesa, e deve, fundamentadamente:</p><ul><li><b>relaxar</b> a prisão ilegal;</li><li><b>converter</b> em preventiva, quando presentes os requisitos do art. 312 e insuficientes outras cautelares, <b>a pedido</b> do MP ou da polícia (não de ofício);</li><li>ou conceder <b>liberdade provisória</b>, com ou sem fiança.</li></ul>')}
<h3>Fiança</h3>
<ul><li>O <b>delegado</b> pode conceder fiança nas infrações com pena máxima <b>não superior a 4 anos</b> (art. 322). Acima disso, só o juiz, em 48 horas.</li><li><b>Inafiançáveis</b> (art. 323): racismo · tortura, tráfico, terrorismo e hediondos · ação de grupos armados contra a ordem constitucional.</li><li>Inafiançável não significa “sem liberdade provisória”: cabe liberdade provisória <b>sem fiança</b>, com cautelares.</li></ul>
${box('Quem não pode ser preso em flagrante (ou tem regra especial)', '<ul><li><b>Presidente da República</b>: não pode ser preso enquanto não houver sentença condenatória nas infrações comuns.</li><li><b>Parlamentares, magistrados e membros do MP</b>: só em flagrante de crime <b>inafiançável</b>.</li><li><b>Diplomatas estrangeiros</b>: imunidade (Convenção de Viena).</li><li><b>Condutor que socorre a vítima</b> em acidente de trânsito: sem flagrante e sem fiança (CTB, art. 301).</li><li><b>Autor de infração de menor potencial ofensivo</b> que vai ao Juizado ou assume o compromisso de ir (Lei 9.099, art. 69).</li></ul>')}
${dica('“<b>Acaba</b> de cometer” = próprio · “<b>perseguido</b> logo após” = impróprio · “<b>encontrado</b> logo depois” = presumido.')}
${peg('No flagrante <b>impróprio</b>, não há limite de 24 horas para a perseguição. O que importa é que ela comece logo após o crime e seja <b>ininterrupta</b>.')}`,
      quiz: [C('Considera-se em flagrante delito quem é encontrado, logo depois, com instrumentos, armas, objetos ou papéis que façam presumir ser ele autor da infração.', 'Flagrante presumido (art. 302, IV).'), E('Não há crime quando a preparação do flagrante pela polícia torna impossível a sua consumação, mas a prisão realizada nessa situação é válida.', 'Súmula 145 do STF: há crime impossível, e a prisão é ilegal.'), C('A autoridade policial pode conceder fiança nos casos de infração cuja pena privativa de liberdade máxima não seja superior a 4 anos.', 'Art. 322 do CPP.')],
    },
    {
      id: 'preventiva', titulo: 'Prisão preventiva, temporária e medidas cautelares', arts: 'CPP, arts. 282 a 320 · Lei 7.960/1989',
      chaves: ['prisao preventiva', 'prisao temporaria', 'medidas cautelares', 'prisao: conceito', 'especies de prisao', 'mandado de prisao', 'prisao'],
      html: `
<h3>Visão geral</h3>
<p>Antes da condenação definitiva, a prisão é <b>exceção</b>. Ela é <b>cautelar</b>: serve para proteger o processo ou a sociedade, nunca para antecipar a pena. O juiz deve preferir as <b>medidas cautelares diversas</b> sempre que forem suficientes (art. 282, §6º).</p>
${cartoes([['⏱', 'Temporária', 'só na investigação · prazo curto', COR.lar], ['🔒', 'Preventiva', 'na investigação ou no processo · sem prazo fixo', COR.verm], ['🧩', 'Cautelares diversas', 'alternativas à prisão (art. 319)', COR.verde]])}
<h3>Prisão preventiva</h3>
<ul><li><b>Quando</b>: em qualquer fase da investigação ou do processo.</li><li><b>Quem pede</b>: MP, querelante, assistente ou autoridade policial (representação). O juiz <b>não decreta de ofício</b> (art. 311).</li><li><b>Pressupostos</b> (art. 312): prova da existência do crime e indício suficiente de autoria (<i>fumus comissi delicti</i>) + <b>perigo gerado pelo estado de liberdade</b> do imputado (<i>periculum libertatis</i>).</li><li><b>Fundamentos</b>: garantia da <b>ordem pública</b>, da <b>ordem econômica</b>, <b>conveniência da instrução</b> criminal ou para assegurar a <b>aplicação da lei penal</b>.</li></ul>
${box('Hipóteses de cabimento (art. 313)', '<ul><li>Crimes <b>dolosos</b> com pena máxima <b>superior a 4 anos</b>.</li><li>Réu <b>reincidente</b> em crime doloso.</li><li>Violência doméstica contra mulher, criança, adolescente, idoso, enfermo ou pessoa com deficiência, para garantir medidas protetivas.</li><li><b>Dúvida sobre a identidade</b> civil.</li></ul><p>Não cabe preventiva para <b>antecipar pena</b> nem como consequência imediata da investigação ou da denúncia (§2º).</p>')}
<ul><li>A decisão deve ser <b>fundamentada</b> em fatos novos ou contemporâneos (art. 315).</li><li>O juiz deve <b>revisar</b> a necessidade a cada <b>90 dias</b> (art. 316, parágrafo único). Segundo o STF, a falta de revisão não gera soltura automática; o juiz deve ser instado a reavaliar.</li><li>Pode ser substituída por <b>prisão domiciliar</b>: maior de 80 anos, extremamente debilitado, gestante, mãe ou responsável por criança até 12 anos ou por pessoa com deficiência (art. 318).</li></ul>
<h3>Prisão temporária (Lei 7.960/1989)</h3>
<table class="tab"><tr><th>Ponto</th><th>Regra</th></tr>
<tr><td>Fase</td><td>só na <b>investigação</b> (inquérito)</td></tr>
<tr><td>Quem pede</td><td>autoridade policial (representação) ou MP. <b>Nunca de ofício</b></td></tr>
<tr><td>Prazo</td><td><b>5 dias + 5</b>, em caso de extrema e comprovada necessidade</td></tr>
<tr><td>Hediondos, tráfico, tortura e terrorismo</td><td><b>30 dias + 30</b> (Lei 8.072/1990, art. 2º, §4º)</td></tr>
<tr><td>Fim do prazo</td><td>o preso é solto <b>independentemente de alvará</b>, salvo se decretada a preventiva</td></tr></table>
<p><b>Cabimento</b> (art. 1º): (I) imprescindível para as investigações; (II) indiciado sem residência fixa ou sem identidade esclarecida; (III) fundadas razões de autoria ou participação em crimes da lista (homicídio doloso, sequestro, roubo, extorsão, estupro, tráfico, organização criminosa, entre outros). Para o STF, exige-se o inciso <b>III</b> combinado com o I ou o II, além da necessidade concreta e da insuficiência de outras cautelares.</p>
<h3>Medidas cautelares diversas da prisão (art. 319)</h3>
${cartoes([['📅', 'Comparecimento periódico em juízo', ''], ['🚷', 'Proibição de frequentar lugares', ''], ['📵', 'Proibição de contato com pessoa', ''], ['🗺', 'Proibição de sair da comarca', ''], ['🌙', 'Recolhimento domiciliar noturno', ''], ['🏢', 'Suspensão da função pública', ''], ['🏥', 'Internação provisória', ''], ['💰', 'Fiança', ''], ['📡', 'Monitoração eletrônica', '']])}
${dica('Preventiva: “<b>OOCA</b>”: <b>O</b>rdem pública, <b>O</b>rdem econômica, <b>C</b>onveniência da instrução e <b>A</b>plicação da lei penal. Temporária: “<b>5 + 5</b>” (comum) e “<b>30 + 30</b>” (hediondos).')}
${peg('A <b>temporária</b> nunca cabe durante o <b>processo</b>, só na investigação. E <b>nenhuma</b> das duas pode ser decretada de ofício pelo juiz.')}`,
      quiz: [E('O juiz pode decretar a prisão preventiva de ofício durante o processo penal.', 'Após o Pacote Anticrime, a preventiva depende de requerimento ou representação (art. 311).'), C('A prisão temporária tem prazo de 5 dias, prorrogável por igual período em caso de extrema e comprovada necessidade.', 'Art. 2º da Lei 7.960/1989.'), C('Decretada a prisão preventiva, o órgão que a decretou deve revisar a necessidade de sua manutenção a cada 90 dias, mediante decisão fundamentada.', 'Art. 316, parágrafo único, do CPP.')],
    },
    {
      id: 'identificacao', titulo: 'Identificação criminal (CF, art. 5º, LVIII, e Lei 12.037/2009)', arts: 'Lei 12.037/2009',
      chaves: ['identificacao criminal', '12.037'],
      html: `
<h3>A regra</h3>
<p>“O <b>civilmente identificado</b> não será submetido a identificação criminal, <b>salvo nas hipóteses previstas em lei</b>” (CF, art. 5º, LVIII). A lei que regula é a <b>12.037/2009</b>.</p>
${cartoes([['🪪', 'Identificação civil', 'documentos do art. 2º', COR.azul], ['🖐', 'Identificação criminal', 'datiloscópica e fotográfica (art. 5º)', COR.roxo], ['🧬', 'Perfil genético', 'só na hipótese do inciso IV, com ordem judicial', COR.verm]])}
<h3>Documentos que provam a identificação civil (art. 2º)</h3>
<p>Carteira de identidade · carteira de trabalho · carteira profissional · passaporte · carteira de identificação funcional · outro documento público que permita a identificação. Equiparam-se os documentos de identificação <b>militares</b>.</p>
<h3>Quando, mesmo com documento, cabe identificação criminal (art. 3º)</h3>
<ol><li>O documento apresenta <b>rasura</b> ou indício de <b>falsificação</b>.</li><li>O documento é <b>insuficiente</b> para identificar a pessoa cabalmente.</li><li>O indiciado porta <b>documentos distintos</b>, com informações conflitantes.</li><li>A identificação criminal é <b>essencial às investigações</b>, segundo despacho do <b>juiz</b>, de ofício ou a pedido da polícia, do MP ou da defesa.</li><li>Constam dos registros policiais o uso de <b>outros nomes</b> ou qualificações.</li><li>O <b>estado de conservação</b>, a distância no tempo ou o local da expedição do documento impedem a identificação completa.</li></ol>
${box('Garantias do identificado', '<ul><li>A autoridade deve evitar <b>constrangimento</b> ao identificado (art. 4º).</li><li>É vedado mencionar a identificação criminal em <b>atestados de antecedentes</b> ou em informações não destinadas ao juízo criminal, antes do trânsito em julgado (art. 6º).</li><li>Se houver não oferecimento da denúncia, rejeição ou <b>absolvição</b>, o indiciado pode pedir a <b>retirada da identificação fotográfica</b> do inquérito ou do processo, desde que apresente provas de sua identificação civil (art. 7º).</li></ul>')}
<h3>Perfil genético</h3>
<p>Na hipótese do inciso IV (essencial às investigações, com ordem judicial), a identificação pode incluir a <b>coleta de material biológico</b> para obter o perfil genético (art. 5º, parágrafo único). Os dados ficam em banco sigiloso. Na execução penal, há regras próprias para condenados (Lei 7.210/1984, art. 9º-A).</p>
${dica('Das 6 hipóteses do art. 3º, só a do inciso <b>IV</b> exige <b>despacho judicial</b>. As outras a autoridade policial verifica diretamente.')}
${peg('A identificação criminal envolve os processos <b>datiloscópico e fotográfico</b>. A coleta de <b>material genético</b> não é regra: só cabe no inciso IV, com ordem do juiz.')}`,
      quiz: [C('O civilmente identificado não será submetido a identificação criminal, salvo nas hipóteses previstas em lei.', 'CF, art. 5º, LVIII.'), E('A identificação criminal pode ser feita sempre que a autoridade policial entender conveniente, independentemente de o indiciado apresentar documento de identidade válido.', 'Só nas hipóteses do art. 3º da Lei 12.037/2009.'), C('Caso o documento apresentado tenha rasura ou indício de falsificação, poderá ocorrer a identificação criminal, ainda que apresentado documento de identificação.', 'Art. 3º, I, da Lei 12.037/2009.')],
    },
  ],
};
export default { ...BASE, atualizado: 'novembro de 2026 · 50 questões por tópico', assuntos: BASE.assuntos.map((a) => ({ ...a, quiz: [...(a.quiz || []), ...(BANCO[a.id] || [])] })) };
