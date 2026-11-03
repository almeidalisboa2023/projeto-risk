// Aprofundamento dos textos já publicados: casos práticos, jurisprudência e mais questões.
// Cada entrada é anexada ao fim do texto do assunto (matéria → assunto).
import { cartoes, COR } from './figuras.js';
import { peg, box, ex, juris, banca, C, E } from './blocos.js';

const T = (t) => `<h3 class="lt-aprof">🔬 Aprofundamento</h3>${t}`;

export const APROFUNDA = {
  penal: {
    principios: { html: T(`
${cartoes([['🎭', 'Adequação social', 'conduta aceita socialmente não é crime (ex.: furar a orelha de um bebê)', COR.azul], ['🪞', 'Alteridade', 'não se pune quem só prejudica a si mesmo (ex.: autolesão)', COR.verde], ['2️⃣', 'Ne bis in idem', 'ninguém é punido duas vezes pelo mesmo fato', COR.roxo]])}
<h3>Insignificância na prática</h3>
<table class="tab"><tr><th>Situação</th><th>Entendimento dos tribunais</th></tr>
<tr><td><b>Furto</b> de pequeno valor, sem violência</td><td>pode ser aplicada, analisando o caso concreto</td></tr>
<tr><td><b>Roubo</b> e crimes com violência ou grave ameaça</td><td><b>não</b> se aplica</td></tr>
<tr><td><b>Tráfico de drogas</b> e <b>moeda falsa</b></td><td><b>não</b> se aplica (crimes contra a saúde e a fé pública)</td></tr>
<tr><td><b>Descaminho</b></td><td>aplicável quando o tributo iludido não passa de <b>R$ 20.000</b> (STF e STJ)</td></tr>
<tr><td><b>Reincidente</b></td><td>em regra afasta, mas o STF admite análise caso a caso</td></tr></table>
${ex('<p>Alguém furta um chocolate de R$ 5 num supermercado: mínima ofensividade, sem periculosidade, reprovação reduzida e lesão inexpressiva → <b>fato atípico</b>. Se o mesmo chocolate é tomado com uma faca: é <b>roubo</b>, e a insignificância não se aplica.</p>', 'Caso prático')}`),
      quiz: [E('O princípio da insignificância é aplicável ao crime de roubo quando o bem subtraído tiver valor ínfimo.', 'Crimes com violência ou grave ameaça afastam a insignificância.'), C('Pelo princípio da alteridade, não se pune a conduta que prejudica apenas o próprio agente, como a autolesão.', 'O Direito Penal só intervém quando há lesão a bem jurídico de terceiro.')] },
    aplicacao: { html: T(`
<h3>Sucessão de leis penais no tempo</h3>
<table class="tab"><tr><th>Lei nova</th><th>Efeito</th></tr>
<tr><td><b>Abolitio criminis</b> (deixa de ser crime)</td><td>retroage; extingue a punibilidade</td></tr>
<tr><td><b>Novatio legis in mellius</b> (mais benéfica)</td><td>retroage, mesmo após o trânsito em julgado</td></tr>
<tr><td><b>Novatio legis in pejus</b> (mais grave)</td><td>não retroage</td></tr>
<tr><td><b>Novatio legis incriminadora</b> (cria crime)</td><td>não retroage</td></tr></table>
<ul><li><b>Lei intermediária</b>: se, entre o fato e o julgamento, vigorou uma lei mais benéfica que a anterior e a atual, aplica-se a intermediária.</li><li><b>Combinação de leis</b>: o STJ não admite juntar as partes favoráveis de duas leis (Súmula 501, sobre a Lei de Drogas). Aplica-se uma ou outra, a que for melhor no conjunto.</li><li>Depois do trânsito em julgado, quem aplica a lei mais benéfica é o <b>juiz da execução</b> (Súmula 611 do STF).</li></ul>
<h3>Conflito aparente de normas</h3>
${cartoes([['🎯', 'Especialidade', 'a norma especial prevalece: infanticídio x homicídio', COR.azul], ['🪜', 'Subsidiariedade', 'a norma menos grave só se aplica se não houver a mais grave', COR.verde], ['🍽', 'Consunção', 'o crime-meio é absorvido pelo crime-fim (Súmula 17 do STJ: falso absorvido pelo estelionato)', COR.lar], ['🔀', 'Alternatividade', 'tipo com vários verbos: praticar mais de um no mesmo contexto é crime único', COR.roxo]])}
${ex('<p>Na Lei de Drogas, quem <b>transporta</b> e <b>guarda</b> a mesma droga, no mesmo contexto, comete <b>um só</b> crime de tráfico (tipo misto alternativo).</p>')}`),
      quiz: [C('Após o trânsito em julgado da sentença condenatória, compete ao juízo das execuções a aplicação de lei mais benigna.', 'Súmula 611 do STF.'), E('Segundo o STJ, é possível combinar as partes mais benéficas da lei antiga e da lei nova de drogas para beneficiar o réu.', 'A Súmula 501 do STJ veda a combinação de leis.')] },
    tipicidade: { html: T(`
<h3>Classificações que caem com frequência</h3>
<table class="tab"><tr><th>Crime</th><th>Consumação</th><th>Exemplo</th></tr>
<tr><td><b>Material</b></td><td>exige o resultado naturalístico</td><td>homicídio, furto</td></tr>
<tr><td><b>Formal</b></td><td>o resultado pode ocorrer, mas não é necessário</td><td>extorsão (Súmula 96 do STJ), concussão</td></tr>
<tr><td><b>Mera conduta</b></td><td>não há resultado naturalístico previsto</td><td>violação de domicílio, porte de arma</td></tr>
<tr><td><b>Preterdoloso</b></td><td>dolo no antecedente e culpa no resultado</td><td>lesão corporal seguida de morte</td></tr></table>
${box('Não admitem tentativa', '<ul><li>Crimes <b>culposos</b> (não há vontade de consumar)</li><li>Crimes <b>preterdolosos</b></li><li><b>Contravenções</b> penais (LCP, art. 4º)</li><li>Crimes <b>omissivos próprios</b> (omissão de socorro)</li><li>Crimes <b>habituais</b> e <b>unissubsistentes</b> (praticados em um só ato)</li></ul>')}
${ex('<p>O agente atira para matar, erra e, arrependido, vai embora sem tentar de novo, embora pudesse: é <b>tentativa</b>? Não. Ele <b>podia prosseguir e não quis</b>: é <b>desistência voluntária</b>, e responde só pelo que já fez (disparo de arma de fogo).</p><p>Se ele atira, acerta e, arrependido, leva a vítima ao hospital e ela sobrevive: <b>arrependimento eficaz</b>, responde pela lesão corporal.</p>', 'Caso prático')}
${peg('Fórmula de Frank: na <b>tentativa</b>, o agente “quer, mas não pode” prosseguir; na <b>desistência</b>, “pode, mas não quer”.')}`),
      quiz: [C('Os crimes culposos não admitem tentativa.', 'Não há vontade dirigida à consumação.'), E('Na desistência voluntária, o agente responde pelo crime tentado com a pena reduzida de um a dois terços.', 'Ele responde apenas pelos atos já praticados (art. 15).')] },
    ilicitude: { html: T(`
<h3>Requisitos lado a lado</h3>
<table class="tab"><tr><th>Legítima defesa</th><th>Estado de necessidade</th></tr>
<tr><td>agressão <b>humana</b> injusta</td><td>perigo de qualquer origem (natureza, animal, pessoa)</td></tr>
<tr><td>atual ou <b>iminente</b></td><td>perigo <b>atual</b></td></tr>
<tr><td>reação contra o <b>agressor</b></td><td>pode atingir bem de <b>terceiro inocente</b></td></tr>
<tr><td>meios necessários, usados com moderação</td><td>sacrifício razoável e perigo inevitável de outro modo</td></tr></table>
<ul><li><b>Ofendículos</b> (cerca elétrica, cacos de vidro no muro): exercício regular de direito quando instalados; legítima defesa preordenada quando funcionam.</li><li><b>Consentimento do ofendido</b>: causa <b>supralegal</b> de exclusão da ilicitude, se o bem for disponível e o ofendido capaz.</li><li><b>Legítima defesa putativa</b>: o agente imagina uma agressão que não existe (erro). Tratada pelas regras do erro (art. 20, §1º).</li></ul>
${ex('<p>Um náufrago toma a única boia de outro para se salvar: <b>estado de necessidade</b> (perigo atual, não provocado, sacrifício razoável). Um policial que, em serviço, dispara contra quem aponta uma arma para um refém age em <b>legítima defesa de terceiro</b> (art. 25, parágrafo único).</p>', 'Casos práticos')}`),
      quiz: [C('O consentimento do ofendido é causa supralegal de exclusão da ilicitude, desde que o bem jurídico seja disponível.', 'Não está previsto no CP, mas é aceito pela doutrina e jurisprudência.'), E('A legítima defesa pode ser invocada contra perigo causado por um animal que ataca espontaneamente.', 'Ataque espontâneo de animal gera estado de necessidade; legítima defesa exige agressão humana.')] },
    culpabilidade: { html: T(`
<h3>Actio libera in causa</h3>
<p>Quem se embriaga <b>voluntariamente</b> responde pelo crime, porque era livre no momento em que bebeu. A imputabilidade é analisada no momento da ingestão, e não no momento do crime.</p>
<table class="tab"><tr><th>Embriaguez</th><th>Efeito</th></tr>
<tr><td>Voluntária ou culposa (completa ou não)</td><td>não exclui a imputabilidade</td></tr>
<tr><td><b>Preordenada</b> (bebe para criar coragem)</td><td>agravante (art. 61, II, “l”)</td></tr>
<tr><td>Acidental (caso fortuito ou força maior), <b>completa</b></td><td>isenta de pena</td></tr>
<tr><td>Acidental, <b>incompleta</b></td><td>reduz a pena de 1 a 2/3</td></tr>
<tr><td>Patológica (alcoolismo crônico)</td><td>tratada como doença mental (art. 26)</td></tr></table>
${ex('<p>Um estrangeiro, recém-chegado ao Brasil, pratica algo permitido em seu país e proibido aqui, sem qualquer possibilidade de saber disso: <b>erro de proibição inevitável</b>, isento de pena. Se tinha como se informar facilmente: erro evitável, pena reduzida.</p>', 'Caso prático')}`),
      quiz: [C('A embriaguez preordenada não exclui a imputabilidade e ainda funciona como circunstância agravante.', 'Art. 61, II, “l”, do CP.'), E('Pela teoria da actio libera in causa, a imputabilidade é aferida no momento em que o crime é praticado, ainda que o agente tenha se embriagado voluntariamente.', 'É aferida no momento em que o agente se coloca em estado de embriaguez.')] },
    'pessoa-patrimonio': { html: T(`
<h3>Qualificadoras do homicídio mais cobradas (art. 121, §2º)</h3>
${cartoes([['💰', 'Motivo torpe', 'repugnante (ex.: por dinheiro, por herança)', COR.verm], ['🪶', 'Motivo fútil', 'desproporcional, insignificante', COR.lar], ['🔥', 'Meio cruel', 'veneno, fogo, explosivo, tortura, asfixia', COR.roxo], ['🎯', 'Surpresa', 'traição, emboscada, dissimulação', COR.azul], ['🔗', 'Conexão', 'para assegurar outro crime ou sua impunidade', COR.verde], ['👮', 'Contra agente de segurança', 'contra policiais e seus familiares, em razão da função (VII)', COR.amar]])}
<p>O homicídio qualificado é <b>hediondo</b>. O homicídio contra integrante dos órgãos do art. 144 da CF (inclusive a <b>PRF</b>), no exercício da função ou em razão dela, é qualificado.</p>
<h3>Súmulas sobre crimes patrimoniais</h3>
${juris('<ul><li><b>Súmula 582 do STJ</b>: o roubo se consuma com a <b>inversão da posse</b>, mediante violência ou grave ameaça, ainda que por breve tempo e sem posse mansa e pacífica.</li><li><b>Súmula 511 do STJ</b>: é possível o furto <b>privilegiado-qualificado</b> se a qualificadora for de ordem <b>objetiva</b>.</li><li><b>Súmula 442 do STJ</b>: não se aplica ao furto qualificado pelo concurso de pessoas a majorante do roubo.</li><li><b>Súmula 610 do STF</b>: há latrocínio consumado se a morte ocorre, ainda que não haja subtração.</li></ul>')}
${ex('<p>O agente pega o celular da vítima e, ao fugir, a empurra para garantir a posse: <b>roubo impróprio</b> (violência <b>depois</b> da subtração, para assegurar a coisa). Se só tivesse pegado o celular e fugido: <b>furto</b>.</p><p>Pegar a moto do vizinho para dar uma volta e devolvê-la intacta logo depois: <b>furto de uso</b>, fato atípico.</p>', 'Casos práticos')}`),
      quiz: [C('Considera-se consumado o crime de roubo com a inversão da posse do bem, mediante violência ou grave ameaça, ainda que por breve tempo.', 'Súmula 582 do STJ.'), C('É qualificado o homicídio praticado contra integrante da Polícia Rodoviária Federal no exercício da função ou em decorrência dela.', 'Art. 121, §2º, VII, do CP.')] },
    'sexual-incolumidade': { html: T(`
<ul><li>O estupro se consuma com a prática de <b>qualquer ato libidinoso</b>, não só com a conjunção carnal.</li><li><b>Registro não autorizado da intimidade sexual</b> (art. 216-B) e <b>divulgação de cena de estupro ou de sexo sem consentimento</b> (art. 218-C) são crimes autônomos. A pena da divulgação aumenta se o agente tinha relação íntima com a vítima ou agiu por vingança.</li><li><b>Perigo abstrato x concreto</b>: no incêndio (art. 250), exige-se perigo <b>concreto</b> à vida, à integridade ou ao patrimônio de outrem.</li></ul>
${ex('<p>Num ônibus, um homem se esfrega numa passageira sem violência ou ameaça: <b>importunação sexual</b> (art. 215-A). Se ele a imobilizar à força para praticar o ato: <b>estupro</b>.</p>', 'Caso prático')}`),
      quiz: [C('O crime de estupro se consuma com a prática de qualquer ato libidinoso, não sendo exigida a conjunção carnal.', 'O art. 213 abrange conjunção carnal ou outro ato libidinoso.')] },
    'fe-administracao': { html: T(`
${juris('<ul><li><b>Súmula 546 do STJ</b>: a competência para julgar o <b>uso de documento falso</b> é definida pela entidade ou órgão a quem o documento foi <b>apresentado</b>. CNH falsa apresentada à <b>PRF</b> → <b>Justiça Federal</b>. Apresentada à PM numa blitz estadual → Justiça Estadual.</li><li><b>Súmula 73 do STJ</b>: papel-moeda <b>grosseiramente</b> falsificado configura, em tese, <b>estelionato</b> (Justiça Estadual), e não moeda falsa.</li><li><b>Súmula 17 do STJ</b>: quando o falso se exaure no estelionato, sem mais potencialidade lesiva, é por este absorvido.</li><li>O STF declarou constitucional o crime de <b>desacato</b>.</li></ul>')}
<ul><li><b>Falsificação grosseira</b>, perceptível a olho nu, não engana ninguém: crime impossível.</li><li><b>Peculato de uso</b> (usar o bem e devolver) é, em regra, fato atípico, salvo para prefeitos (Decreto-Lei 201/1967).</li></ul>
${ex('<p>Numa fiscalização, o condutor entrega ao policial rodoviário federal uma <b>CNH falsa</b>. Ele comete <b>uso de documento falso</b> (art. 304), julgado pela <b>Justiça Federal</b>, porque o documento foi apresentado a órgão da União. Se ele ainda oferecer dinheiro para ser liberado: soma-se a <b>corrupção ativa</b> (art. 333).</p>', 'Caso prático: abordagem da PRF')}`),
      quiz: [C('A competência para processar e julgar o crime de uso de documento falso é firmada em razão da entidade ou órgão ao qual foi apresentado o documento público, não importando a qualificação do órgão expedidor.', 'Súmula 546 do STJ.'), E('A falsificação grosseira de papel-moeda configura o crime de moeda falsa, de competência da Justiça Federal.', 'Súmula 73 do STJ: em tese, estelionato, da Justiça Estadual.')] },
  },
  constitucional: {
    'poder-constituinte': { html: T(`
<ul><li><b>Limites implícitos</b>: não se pode alterar o titular do poder constituinte nem o próprio procedimento de reforma do art. 60 para facilitá-lo. A <b>dupla revisão</b> (revogar uma cláusula pétrea para depois mudar o tema) é vedada.</li><li><b>Mutação constitucional</b> (poder constituinte difuso): muda-se a <b>interpretação</b> sem mudar o texto.</li><li><b>Recepção</b>: a lei anterior compatível com a nova Constituição continua valendo, ainda que com outro status (o CTN foi recebido como lei complementar).</li><li><b>Repristinação</b> (volta de lei revogada) não é automática: depende de previsão expressa.</li></ul>
${ex('<p>O Código Penal (1940) e o CPP (1941) são anteriores à CF/1988 e foram <b>recepcionados</b> naquilo que é compatível. Os dispositivos incompatíveis foram <b>não recepcionados</b> (ex.: incomunicabilidade do preso, art. 21 do CPP).</p>')}`),
      quiz: [C('A mutação constitucional altera o sentido de uma norma constitucional sem alteração formal de seu texto.', 'É o chamado poder constituinte difuso.'), E('No Brasil, a repristinação ocorre automaticamente quando a lei revogadora é revogada.', 'A repristinação depende de previsão expressa (LINDB, art. 2º, §3º).')] },
    'direitos-individuais': { html: T(`
<ul><li>Os direitos fundamentais <b>não são absolutos</b>: em conflito, aplica-se a <b>ponderação</b>.</li><li><b>Eficácia horizontal</b>: valem também nas relações entre particulares.</li><li><b>XXXV</b>: a lei não excluirá do Judiciário lesão ou ameaça a direito (inafastabilidade).</li><li><b>XXXVI</b>: a lei não prejudicará o direito adquirido, o ato jurídico perfeito e a coisa julgada.</li><li><b>LXII</b>: a prisão e o local onde o preso se encontra serão comunicados <b>imediatamente</b> ao juiz e à família ou pessoa indicada.</li><li><b>LXXV</b>: o Estado indenizará o condenado por <b>erro judiciário</b> e quem ficar preso além do tempo fixado na sentença.</li></ul>
${juris('<ul><li><b>CPI</b> pode quebrar sigilo <b>bancário, fiscal e de dados</b> por decisão fundamentada, mas <b>não</b> pode decretar interceptação telefônica (reserva de jurisdição).</li><li>Algemas só em caso de resistência, fundado receio de fuga ou perigo, justificado por escrito (Súmula Vinculante 11).</li></ul>')}`),
      quiz: [C('A CPI pode determinar a quebra de sigilo bancário, mas não pode determinar interceptação telefônica.', 'A interceptação está sob reserva de jurisdição (art. 5º, XII).'), E('A prisão de qualquer pessoa deve ser comunicada ao juiz competente em até 48 horas.', 'A comunicação deve ser imediata (art. 5º, LXII).')] },
    remedios: { html: T(`
<table class="tab"><tr><th>Ponto</th><th>Regra</th></tr>
<tr><td>Prazo do mandado de segurança</td><td><b>120 dias</b> da ciência do ato (decadencial, Lei 12.016/2009, art. 23)</td></tr>
<tr><td>Prazo da ação popular</td><td><b>5 anos</b> (Lei 4.717/1965, art. 21)</td></tr>
<tr><td>Mandado de injunção</td><td>o STF adota a posição <b>concretista</b>: o tribunal viabiliza o exercício do direito (ex.: greve de servidores com a lei do setor privado)</td></tr>
<tr><td>HC contra punição disciplinar militar</td><td>não cabe quanto ao <b>mérito</b>; cabe quanto à <b>legalidade</b> (competência, procedimento)</td></tr></table>
${juris('<ul><li><b>Súmula 693 do STF</b>: não cabe HC contra decisão condenatória a pena de <b>multa</b> ou em processo em curso por infração cuja única pena seja a multa.</li><li><b>Súmula 695 do STF</b>: não cabe HC quando já <b>extinta</b> a pena privativa de liberdade.</li></ul>')}`),
      quiz: [C('O direito de requerer mandado de segurança extingue-se em 120 dias, contados da ciência do ato impugnado.', 'Art. 23 da Lei 12.016/2009.'), E('Cabe habeas corpus contra decisão condenatória exclusivamente a pena de multa.', 'Súmula 693 do STF: não cabe.')] },
    nacionalidade: { html: T(`
<ul><li><b>Perda da nacionalidade</b> (art. 12, §4º, após a EC 131/2023): cancelamento da naturalização por sentença judicial, por <b>fraude</b> no processo de naturalização ou por <b>atentado contra a ordem constitucional</b> e o Estado Democrático; ou <b>pedido expresso</b> perante autoridade brasileira, salvo se gerar apatridia.</li><li><b>Portugueses</b> com residência permanente, havendo reciprocidade, têm os direitos de brasileiro, salvo os casos da CF (quase-nacionalidade, §1º).</li><li>A lei <b>não pode</b> criar distinções entre natos e naturalizados além das previstas na Constituição (§2º).</li></ul>
<h3>Inelegibilidades</h3>
<ul><li><b>Inelegíveis absolutos</b>: inalistáveis e analfabetos.</li><li><b>Reflexa</b>: cônjuge e parentes até o <b>2º grau</b> do Presidente, Governador ou Prefeito são inelegíveis no território de jurisdição do titular, salvo se já titulares de mandato e candidatos à reeleição.</li><li>Para concorrer a <b>outros cargos</b>, Presidente, Governadores e Prefeitos devem renunciar <b>até 6 meses</b> antes do pleito.</li><li><b>Militar alistável</b> é elegível: com menos de 10 anos de serviço, afasta-se; com mais de 10, é agregado e, se eleito, vai para a inatividade.</li></ul>`),
      quiz: [C('O cônjuge do Prefeito é inelegível para vereador no mesmo município, salvo se já titular de mandato e candidato à reeleição.', 'Inelegibilidade reflexa (art. 14, §7º).'), E('A lei ordinária pode estabelecer distinções entre brasileiros natos e naturalizados para cargos públicos.', 'Só a Constituição pode distinguir (art. 12, §2º).')] },
    uniao: { html: T(`
<ul><li><b>Municípios</b> (art. 30): legislam sobre assuntos de <b>interesse local</b> e suplementam a legislação federal e estadual no que couber. Ex.: horário de funcionamento do comércio local (Súmula Vinculante 38).</li><li><b>Distrito Federal</b> (art. 32): não pode ser dividido em municípios e acumula competências <b>estaduais e municipais</b>.</li><li><b>Delegação</b> (art. 22, parágrafo único): lei complementar pode autorizar os Estados a legislar sobre <b>questões específicas</b> das matérias privativas da União.</li></ul>
${ex('<p>Lei municipal que cria regras de habilitação de motoristas é <b>inconstitucional</b> (trânsito é privativo da União, art. 22, XI). Mas o município pode organizar o estacionamento rotativo nas suas vias, porque executar e fiscalizar o trânsito local é competência administrativa dele (CTB, art. 24).</p>', 'Caso prático')}`),
      quiz: [C('Compete aos municípios legislar sobre assuntos de interesse local, como o horário de funcionamento de estabelecimentos comerciais.', 'Art. 30, I, e Súmula Vinculante 38.'), E('O Distrito Federal pode ser dividido em municípios por lei distrital.', 'É vedada a divisão do DF em municípios (art. 32).')] },
    'defesa-estado': { html: T(`
<table class="tab"><tr><th>Órgão</th><th>Função principal (art. 144)</th></tr>
<tr><td><b>Polícia Federal</b></td><td>polícia judiciária da União; infrações contra bens e interesses da União; tráfico internacional; polícia marítima, aeroportuária e de fronteiras</td></tr>
<tr><td><b>PRF</b></td><td>patrulhamento <b>ostensivo</b> das rodovias federais</td></tr>
<tr><td><b>Polícias Civis</b></td><td>polícia judiciária e apuração de infrações (exceto militares), dirigidas por delegados de carreira</td></tr>
<tr><td><b>Polícias Militares</b></td><td>polícia <b>ostensiva</b> e preservação da ordem pública</td></tr>
<tr><td><b>Corpos de Bombeiros</b></td><td>defesa civil, além de outras atribuições legais</td></tr>
<tr><td><b>Polícias Penais</b></td><td>segurança dos estabelecimentos penais</td></tr></table>
${juris('<p>O STF (ADPF 995, 2023) reconheceu que as <b>guardas municipais</b> integram o Sistema de Segurança Pública. Elas podem fazer policiamento preventivo e comunitário, mas <b>não</b> têm funções de polícia judiciária nem investigativas.</p>')}`),
      quiz: [C('Às polícias militares cabem a polícia ostensiva e a preservação da ordem pública.', 'Art. 144, §5º.'), E('A Polícia Rodoviária Federal exerce, com exclusividade, as funções de polícia judiciária da União.', 'A polícia judiciária da União é exercida pela Polícia Federal (art. 144, §1º, IV).')] },
    'ordem-social': { html: T(`
<ul><li><b>Diretrizes do SUS</b> (art. 198): descentralização, atendimento integral (prioridade às atividades preventivas) e participação da comunidade.</li><li>É vedada a destinação de recursos públicos para auxílios ou subvenções a instituições privadas <b>com fins lucrativos</b> (art. 199, §2º). Instituições filantrópicas e sem fins lucrativos têm preferência na participação complementar.</li><li>A previdência do regime geral cobre eventos de doença, invalidez, morte, idade avançada, maternidade, desemprego involuntário, salário-família e auxílio-reclusão para dependentes de baixa renda e pensão (art. 201).</li></ul>`),
      quiz: [C('É vedada a destinação de recursos públicos para auxílios ou subvenções às instituições privadas de saúde com fins lucrativos.', 'Art. 199, §2º.')] },
  },
  transito: {
    circulacao: { html: T(`
<h3>Ultrapassagem e manobras (arts. 29 a 38)</h3>
<ul><li>Antes de ultrapassar, verifique se ninguém já começou a ultrapassá-lo, se o veículo da frente não sinalizou que vai ultrapassar outro e se a faixa da esquerda está livre numa extensão suficiente.</li><li>Quem vai ser ultrapassado deve <b>manter-se à direita</b> e <b>não acelerar</b>.</li><li><b>Proibido ultrapassar</b> pela contramão em curvas, aclives sem visibilidade, pontes, viadutos, túneis, passagens de nível e faixas de pedestres, salvo onde houver sinalização permitindo.</li><li>Para entrar à esquerda em via de mão dupla, o condutor se aproxima do eixo central; em via de mão única, do bordo esquerdo.</li></ul>
<h3>Parada e estacionamento</h3>
<ul><li>O <b>acostamento</b> é para parada ou estacionamento de emergência, não para circulação (circular pelo acostamento é infração gravíssima, art. 193).</li><li>Na parada, o condutor deve manter-se no veículo, ou próximo dele, pelo tempo estritamente necessário.</li></ul>
${ex('<p>Em rodovia de pista simples, um carro tenta ultrapassar um caminhão numa curva sem visibilidade, cruzando a <b>linha amarela contínua</b>: infração <b>gravíssima</b>, multa 5 vezes (art. 203), e, se provocar acidente com vítima, pode responder pelos crimes dos arts. 302 ou 303.</p>', 'Caso prático')}`),
      quiz: [C('O condutor que perceber que outro pretende ultrapassá-lo e estiver na faixa da esquerda deve deslocar-se para a faixa da direita, sem acelerar a marcha.', 'Art. 30, I, do CTB.'), E('O acostamento pode ser usado para ultrapassagem quando a pista estiver congestionada.', 'O acostamento não é destinado à circulação; transitar por ele é infração gravíssima.')] },
    habilitacao: { html: T(`
<h3>Infrações do art. 162 lado a lado</h3>
<table class="tab"><tr><th>Situação</th><th>Penalidade e medida</th></tr>
<tr><td>Sem possuir CNH, Permissão ou ACC (I)</td><td>gravíssima, multa 3x, retenção até apresentar condutor habilitado</td></tr>
<tr><td>Com CNH <b>cassada</b> ou com direito de dirigir <b>suspenso</b> (II)</td><td>gravíssima, multa 3x, recolhimento do documento e retenção</td></tr>
<tr><td>Com CNH de <b>categoria diferente</b> (III)</td><td>gravíssima, multa 2x, retenção</td></tr>
<tr><td>Com CNH <b>vencida há mais de 30 dias</b> (V)</td><td>gravíssima, recolhimento do documento e retenção</td></tr></table>
<h3>Suspensão x cassação</h3>
${cartoes([['⏸', 'Suspensão', 'tempo determinado; ao final, curso de reciclagem e devolução da CNH', COR.lar], ['❌', 'Cassação', 'perde a CNH; só pode pedir reabilitação após 2 anos, refazendo todo o processo', COR.verm]])}
${ex('<p>Um condutor com CNH categoria B é flagrado dirigindo um ônibus de 30 lugares (categoria D): infração <b>gravíssima</b> com multa em dobro (art. 162, III), e o veículo fica retido até chegar um condutor habilitado na categoria D.</p>', 'Caso prático')}`),
      quiz: [C('Dirigir veículo com a CNH vencida há mais de 30 dias é infração gravíssima.', 'Art. 162, V, do CTB.'), E('Quem tem a CNH cassada pode requerer a reabilitação após 6 meses.', 'A reabilitação só pode ser requerida após 2 anos da cassação (art. 263, §2º).')] },
    infracoes: { html: T(`
<h3>Lei Seca na prática (arts. 165, 165-A, 276 e 277)</h3>
<table class="tab"><tr><th>Situação</th><th>Esfera administrativa</th><th>Esfera criminal (art. 306)</th></tr>
<tr><td>Qualquer concentração de álcool</td><td>infração do art. 165 (multa 10x + suspensão por 12 meses)</td><td>só há crime com capacidade psicomotora alterada</td></tr>
<tr><td>0,3 mg/L de ar alveolar ou mais</td><td>art. 165</td><td><b>crime</b></td></tr>
<tr><td>Recusa ao teste</td><td>art. 165-A, mesmas penalidades do 165</td><td>a recusa por si só <b>não</b> é crime; o crime pode ser provado por sinais, vídeo, testemunhas</td></tr></table>
${ex('<p>O condutor sopra o etilômetro e o resultado é 0,15 mg/L, sem sinais de embriaguez: <b>infração administrativa</b> do art. 165, sem crime. Se o resultado for 0,40 mg/L: infração <b>e</b> crime do art. 306. Se recusar o teste mas apresentar fala pastosa e olhos vermelhos, constatados em termo próprio: infração do art. 165-A e possível crime do 306 provado pelos <b>sinais</b>.</p>', 'Caso prático')}
${peg('O auto de constatação de sinais de alteração da capacidade psicomotora é prova válida tanto da infração administrativa quanto do crime. O teste do bafômetro não é o único meio.')}`),
      quiz: [C('A recusa do condutor em se submeter ao teste do etilômetro sujeita-o às mesmas penalidades previstas para quem dirige sob influência de álcool.', 'Art. 165-A do CTB.'), E('Para a configuração da infração administrativa do art. 165, exige-se concentração igual ou superior a 0,3 mg de álcool por litro de ar alveolar.', 'Na esfera administrativa, qualquer concentração basta (art. 276). O índice de 0,3 mg/L é referência do crime.')] },
    'crimes-especie': { html: T(`
${juris('<ul><li><b>Súmula 664 do STJ</b>: é <b>inaplicável a consunção</b> entre o crime de embriaguez ao volante (art. 306) e o de dirigir sem habilitação (art. 309). O agente responde pelos dois.</li><li><b>Súmula 575 do STJ</b>: entregar a direção a pessoa não habilitada é crime de <b>perigo abstrato</b>.</li><li>No “racha” com morte, os tribunais admitem <b>dolo eventual</b> conforme as circunstâncias. Nesse caso, há homicídio doloso (CP, art. 121), julgado pelo <b>júri</b>, e não o art. 308, §2º.</li></ul>')}
${ex('<p>Um condutor embriagado e sem CNH atropela e mata um pedestre na <b>faixa de pedestres</b> e foge sem prestar socorro. Ele responde por: homicídio culposo qualificado pela embriaguez (art. 302, §3º, reclusão de 5 a 8 anos), com aumento de pena por estar sem habilitação, na faixa de pedestres e por deixar de socorrer (art. 302, §1º). A fuga também pode configurar o art. 305.</p>', 'Caso prático')}`),
      quiz: [C('Segundo o STJ, não se aplica o princípio da consunção entre o crime de embriaguez ao volante e o de condução de veículo sem habilitação.', 'Súmula 664 do STJ.'), E('O homicídio culposo na direção de veículo praticado na faixa de pedestres tem a pena reduzida de um terço.', 'Trata-se de causa de aumento de pena de 1/3 à metade (art. 302, §1º, II).')] },
    medidas: { html: T(`
<ul><li>A medida administrativa é aplicada pelo <b>agente</b>, na hora. A <b>penalidade</b> é aplicada depois pela <b>autoridade</b> de trânsito, com processo administrativo.</li><li><b>Recolhimento da CNH</b>: quando houver suspeita de inautenticidade ou adulteração, ou nos casos previstos no artigo da infração (ex.: art. 165).</li><li><b>Remoção</b>: o veículo vai ao depósito, e sua devolução depende do pagamento de multas, taxas e despesas de remoção e estada.</li></ul>
${ex('<p>Na abordagem, o condutor sem cinto (art. 167) tem o veículo <b>retido</b> só até colocar o cinto. Já o condutor flagrado com veículo não licenciado (art. 230, V) tem o veículo <b>removido</b> ao pátio.</p>', 'Caso prático')}`),
      quiz: [C('As medidas administrativas são aplicadas pela autoridade de trânsito ou por seus agentes e não excluem a aplicação das penalidades.', 'Art. 269, §2º, do CTB.')] },
  },
};
