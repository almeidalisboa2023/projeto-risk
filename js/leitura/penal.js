// Leitura R.I.S.K. — Direito Penal (Código Penal, parte geral e crimes do edital). Texto original.
import { cartoes, passos, COR } from './figuras.js';
import { Q1 } from './penal-q1.js';
import { Q2 } from './penal-q2.js';

const BANCO = { ...Q1, ...Q2 };

const peg = (t) => `<div class="lt-peg"><b class="lt-tit">⚠ Pegadinha</b> ${t}</div>`;
const box = (tit, t) => `<div class="lt-box"><b class="lt-tit">${tit}</b>${t}</div>`;
const dica = (t) => `<div class="lt-dica"><b class="lt-tit">💡 Dica de memorização</b> ${t}</div>`;
const C = (p, e) => ({ p, c: true, e });
const E = (p, e) => ({ p, c: false, e });

const BASE = {
  id: 'penal',
  nome: 'Direito Penal',
  apelidos: ['direito penal'],
  lei: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm',
  assuntos: [
    {
      id: 'principios', titulo: 'Princípios básicos do Direito Penal', arts: 'CF, art. 5º, e CP, art. 1º',
      chaves: ['principios basicos', 'principios do direito penal'],
      html: `
<h3>Em poucas palavras</h3>
<p>Os princípios <b>limitam o poder de punir</b> do Estado. São cobrados tanto na teoria quanto em casos práticos.</p>
${cartoes([['📜', 'Legalidade', 'não há crime nem pena sem lei anterior', COR.azul], ['🎯', 'Intervenção mínima', 'Direito Penal como última opção', COR.verde], ['🔍', 'Insignificância', 'lesão mínima não é crime', COR.lar], ['👤', 'Pessoalidade', 'a pena não passa do condenado', COR.roxo], ['⚖️', 'Culpabilidade', 'sem dolo ou culpa não há crime', COR.verm], ['🧩', 'Individualização', 'pena sob medida para cada réu', COR.cinza]])}
<h3>Os mais cobrados</h3>
<ul><li><b>Legalidade</b> (CF, art. 5º, XXXIX; CP, art. 1º): reúne a <b>reserva legal</b> (só <b>lei</b> cria crime; medida provisória não pode) e a <b>anterioridade</b> (a lei deve existir antes do fato).</li><li><b>Intervenção mínima</b>: o Direito Penal é <b>subsidiário</b> (só atua quando os outros ramos falham) e <b>fragmentário</b> (protege só os bens mais importantes).</li><li><b>Lesividade ou ofensividade</b>: só há crime se houver lesão ou perigo de lesão a bem jurídico de terceiro.</li><li><b>Pessoalidade ou intranscendência</b> (CF, art. 5º, XLV): a pena não passa do condenado. A obrigação de reparar o dano e o perdimento de bens podem alcançar os sucessores, até o limite do patrimônio transferido.</li><li><b>Humanidade</b>: proíbe penas cruéis, de morte (salvo guerra), perpétuas, de trabalhos forçados e de banimento.</li></ul>
${box('Insignificância: requisitos do STF', '<ul><li><b>M</b>ínima ofensividade da conduta</li><li><b>A</b>usência de periculosidade social da ação</li><li><b>R</b>eduzido grau de reprovabilidade do comportamento</li><li><b>I</b>nexpressividade da lesão jurídica</li></ul><p>O efeito é afastar a <b>tipicidade material</b>.</p>')}
${dica('Requisitos da insignificância: “<b>MARI</b>”.')}
${peg('Não se aplica a insignificância aos crimes contra a <b>Administração Pública</b> (Súmula 599 do STJ) nem aos crimes e contravenções contra a <b>mulher</b> no âmbito das relações domésticas (Súmula 589 do STJ).')}`,
      quiz: [C('A medida provisória não pode criar crimes nem cominar penas, em razão do princípio da reserva legal.', 'Matéria penal exige lei em sentido estrito (CF, art. 62, §1º, I, “b”).'), E('Segundo o STJ, o princípio da insignificância é aplicável aos crimes contra a Administração Pública quando o prejuízo for pequeno.', 'A Súmula 599 do STJ afasta a insignificância nos crimes contra a Administração Pública.')],
    },
    {
      id: 'aplicacao', titulo: 'Aplicação da lei penal: tempo e espaço', arts: 'arts. 2º a 12',
      chaves: ['aplicacao da lei penal', 'lei penal no tempo', 'lei penal no espaco'],
      html: `
<h3>Em poucas palavras</h3>
<p><b>Quando</b> o crime foi praticado e <b>onde</b>, e qual lei se aplica.</p>
${cartoes([['⏱', 'Tempo · Atividade', 'momento da ação ou omissão (art. 4º)', COR.azul], ['📍', 'Lugar · Ubiquidade', 'onde ocorreu a conduta ou o resultado (art. 6º)', COR.verde]])}
${dica('“<b>LUTA</b>”: <b>L</b>ugar = <b>U</b>biquidade; <b>T</b>empo = <b>A</b>tividade.')}
<h3>Lei penal no tempo</h3>
<ul><li><b>Abolitio criminis</b> (art. 2º): a lei nova deixa de considerar o fato crime. Cessam a execução e os <b>efeitos penais</b> da condenação; os <b>efeitos civis</b> permanecem.</li><li><b>Lei mais benéfica</b> (art. 2º, parágrafo único): <b>retroage</b>, mesmo após o trânsito em julgado.</li><li><b>Lei mais grave</b>: não retroage.</li><li><b>Lei excepcional ou temporária</b> (art. 3º): aplica-se aos fatos praticados durante sua vigência, mesmo depois de encerrada (<b>ultratividade</b>).</li><li>Crime <b>permanente ou continuado</b>: aplica-se a lei mais grave se ela entrou em vigor antes de cessar a permanência ou a continuidade (Súmula 711 do STF).</li></ul>
<h3>Lei penal no espaço</h3>
<p><b>Territorialidade temperada</b> (art. 5º): aplica-se a lei brasileira ao crime cometido no território nacional, ressalvados tratados. Consideram-se extensão do território as embarcações e aeronaves brasileiras <b>públicas ou a serviço do governo</b>, onde estiverem, e as <b>mercantes ou privadas</b> em alto-mar ou no espaço aéreo correspondente.</p>
<table class="tab"><tr><th>Extraterritorialidade (art. 7º)</th><th>Casos</th></tr>
<tr><td><b>Incondicionada</b></td><td>Crimes contra a vida ou a liberdade do <b>Presidente</b>; contra o patrimônio ou a fé pública da União, Estados, DF, Municípios e suas entidades; contra a administração pública por quem está a seu serviço; <b>genocídio</b> por brasileiro ou domiciliado no Brasil</td></tr>
<tr><td><b>Condicionada</b></td><td>Crimes que o Brasil se obrigou a reprimir por tratado; praticados por <b>brasileiro</b>; praticados em aeronaves ou embarcações brasileiras privadas no exterior e lá não julgados</td></tr></table>
<p>O <b>dia do começo</b> inclui-se no cômputo do prazo penal (art. 10).</p>
${peg('A <b>abolitio criminis</b> apaga os efeitos <b>penais</b>, como a reincidência, mas não os <b>civis</b>: o dever de indenizar continua.')}`,
      quiz: [C('Considera-se praticado o crime no momento da ação ou omissão, ainda que outro seja o momento do resultado.', 'Art. 4º do CP: teoria da atividade.'), E('A lei penal mais benéfica não retroage quando já houver sentença condenatória transitada em julgado.', 'A lei mais benéfica retroage mesmo após o trânsito em julgado (art. 2º, parágrafo único).')],
    },
    {
      id: 'tipicidade', titulo: 'Tipicidade: dolo, culpa, consumação, tentativa e erro de tipo', arts: 'arts. 13 a 20 e 107',
      chaves: ['tipicidade', 'crime doloso e culposo', 'erro de tipo'],
      html: `
<h3>Em poucas palavras</h3>
<p>Fato típico é a conduta que se encaixa no tipo penal: <b>conduta + resultado + nexo causal + tipicidade</b>.</p>
<h3>Dolo e culpa (art. 18)</h3>
${cartoes([['🎯', 'Dolo direto', 'quis o resultado', COR.verm], ['🎲', 'Dolo eventual', 'assumiu o risco: “dane-se”', COR.lar], ['😬', 'Culpa consciente', 'previu, mas acreditou que não ocorreria', COR.amar], ['🙈', 'Culpa inconsciente', 'não previu o que era previsível', COR.azul]])}
<p>Modalidades de culpa: <b>imprudência</b> (agir sem cautela), <b>negligência</b> (deixar de agir com cautela) e <b>imperícia</b> (falta de aptidão técnica). Só se pune por culpa quando a lei <b>expressamente</b> prevê.</p>
<h3>Iter criminis e figuras do art. 14 ao 17</h3>
${passos([['Cogitação', 'não punível'], ['Preparação', 'em regra, não punível'], ['Execução', 'a partir daqui pode haver tentativa'], ['Consumação', 'reúnem-se todos os elementos do tipo']])}
<table class="tab"><tr><th>Figura</th><th>Consequência</th></tr>
<tr><td><b>Tentativa</b> (art. 14, II)</td><td>Não consuma por circunstâncias <b>alheias</b> à vontade: pena do consumado reduzida de <b>1 a 2/3</b></td></tr>
<tr><td><b>Desistência voluntária / arrependimento eficaz</b> (art. 15)</td><td>Responde só pelos <b>atos já praticados</b></td></tr>
<tr><td><b>Arrependimento posterior</b> (art. 16)</td><td>Sem violência ou grave ameaça, repara o dano até o <b>recebimento da denúncia</b>: redução de 1 a 2/3</td></tr>
<tr><td><b>Crime impossível</b> (art. 17)</td><td>Meio <b>absolutamente ineficaz</b> ou objeto <b>absolutamente impróprio</b>: não se pune a tentativa</td></tr></table>
<h3>Nexo causal (art. 13)</h3>
<p>Causa é a ação ou omissão sem a qual o resultado não teria ocorrido. Na <b>omissão imprópria</b>, deve agir quem tem por lei dever de cuidado, proteção ou vigilância, quem assumiu a responsabilidade de impedir o resultado ou quem criou o risco com sua conduta anterior.</p>
<h3>Erro de tipo (art. 20)</h3>
<p>Engano sobre um <b>elemento do tipo</b>: sempre <b>exclui o dolo</b>. Se <b>inevitável</b>, exclui também a culpa; se <b>evitável</b>, permite punir por culpa, se houver previsão culposa. No erro sobre a <b>pessoa</b>, consideram-se as qualidades da vítima que o agente queria atingir.</p>
${box('Extinção da punibilidade (art. 107)', '<p>Morte do agente · anistia, graça ou indulto · abolitio criminis · prescrição, decadência ou perempção · renúncia ou perdão aceito (ação privada) · retratação, quando a lei admite · perdão judicial.</p>')}
${peg('Câmeras de vigilância na loja <b>não</b> tornam o furto um crime impossível (Súmula 567 do STJ). Já o flagrante <b>preparado</b> pela polícia torna o crime impossível (Súmula 145 do STF).')}`,
      quiz: [C('Na desistência voluntária, o agente só responde pelos atos já praticados.', 'Art. 15 do CP.'), E('O erro de tipo evitável exclui o dolo e a culpa, impedindo qualquer punição.', 'O erro evitável exclui o dolo, mas permite a punição por culpa, se houver previsão legal (art. 20).')],
    },
    {
      id: 'ilicitude', titulo: 'Ilicitude: causas de exclusão e excesso', arts: 'arts. 23 a 25',
      chaves: ['ilicitude', 'excesso punivel'],
      html: `
<h3>Em poucas palavras</h3>
<p>O fato típico é, em regra, ilícito. As <b>excludentes</b> tornam a conduta <b>lícita</b> (art. 23):</p>
${cartoes([['🔥', 'Estado de necessidade', 'perigo atual, sem agressão', COR.lar], ['🛡', 'Legítima defesa', 'reação a agressão injusta', COR.verm], ['👮', 'Estrito cumprimento do dever legal', 'agente público cumprindo a lei', COR.azul], ['🥊', 'Exercício regular de direito', 'esporte, correção moderada etc.', COR.verde]])}
<h3>Estado de necessidade (art. 24)</h3>
<p>Salvar de <b>perigo atual</b>, que o agente <b>não provocou</b> por sua vontade nem podia evitar de outro modo, <b>direito próprio ou alheio</b>, cujo sacrifício não era razoável exigir. Quem tem <b>dever legal de enfrentar o perigo</b> (bombeiro, policial) não pode alegá-lo. Se era razoável exigir o sacrifício, a pena pode ser reduzida de 1 a 2/3.</p>
<h3>Legítima defesa (art. 25)</h3>
<p>Repelir <b>injusta agressão</b>, <b>atual ou iminente</b>, a direito <b>seu ou de outrem</b>, usando <b>moderadamente</b> os <b>meios necessários</b>.</p>
${box('Legítima defesa do agente de segurança (art. 25, parágrafo único)', '<p>Incluído pelo Pacote Anticrime: também age em legítima defesa o <b>agente de segurança pública</b> que repele agressão ou <b>risco de agressão</b> a <b>vítima mantida refém</b> durante a prática de crimes.</p>')}
<h3>Excesso (art. 23, parágrafo único)</h3>
<p>Em qualquer excludente, o agente responde pelo <b>excesso doloso ou culposo</b>.</p>
${table()}
${peg('Contra agressão <b>futura</b> não cabe legítima defesa, e contra agressão já <b>encerrada</b> também não (seria vingança). A agressão precisa ser <b>atual ou iminente</b>.')}`,
      quiz: [C('Não pode alegar estado de necessidade quem tinha o dever legal de enfrentar o perigo.', 'Art. 24, §1º.'), E('A legítima defesa pode ser invocada para repelir agressão futura, desde que provável.', 'A agressão deve ser atual ou iminente (art. 25).')],
    },
    {
      id: 'culpabilidade', titulo: 'Culpabilidade: imputabilidade e erro de proibição', arts: 'arts. 21 e 22, 26 a 28',
      chaves: ['culpabilidade', 'erro de proibicao', 'imputabilidade'],
      html: `
<h3>Em poucas palavras</h3>
<p>Culpabilidade é o <b>juízo de reprovação</b> sobre o autor. Tem três elementos; faltando um, o agente fica <b>isento de pena</b>.</p>
${cartoes([['🧠', 'Imputabilidade', 'capacidade de entender e de se determinar', COR.azul], ['📖', 'Potencial consciência da ilicitude', 'podia saber que era errado', COR.verde], ['🤔', 'Exigibilidade de conduta diversa', 'podia agir de outro modo', COR.lar]])}
<h3>Inimputabilidade</h3>
<ul><li><b>Doença mental</b> ou desenvolvimento mental incompleto ou retardado, <b>inteiramente</b> incapaz de entender ou de se determinar: isento de pena, com <b>medida de segurança</b> (art. 26). Se <b>parcialmente</b> incapaz: pena reduzida de 1 a 2/3.</li><li><b>Menores de 18 anos</b>: inimputáveis, pelo critério biológico (art. 27).</li><li><b>Emoção e paixão</b> não excluem a imputabilidade (art. 28, I).</li><li><b>Embriaguez</b> voluntária ou culposa não exclui. Só a embriaguez <b>completa por caso fortuito ou força maior</b> isenta de pena; se incompleta, reduz de 1 a 2/3.</li></ul>
<h3>Erro de proibição (art. 21)</h3>
<p>O agente sabe o que faz, mas pensa que é <b>permitido</b>. O <b>desconhecimento da lei</b> é inescusável. Se o erro for <b>inevitável</b>, isenta de pena; se <b>evitável</b>, diminui de <b>1/6 a 1/3</b>.</p>
<h3>Coação moral e obediência hierárquica (art. 22)</h3>
<p>Na <b>coação moral irresistível</b> e na <b>obediência a ordem não manifestamente ilegal</b> de superior, só responde o <b>autor da coação ou da ordem</b>.</p>
<table class="tab"><tr><th>Erro de tipo</th><th>Erro de proibição</th></tr><tr><td>Erra sobre o <b>fato</b> (“não sabia que era coisa alheia”)</td><td>Erra sobre a <b>ilicitude</b> (“achei que podia”)</td></tr><tr><td>Exclui o <b>dolo</b></td><td>Afeta a <b>culpabilidade</b></td></tr></table>
${peg('A coação <b>física</b> irresistível exclui a própria <b>conduta</b> (não há fato típico). A coação <b>moral</b> irresistível exclui a <b>culpabilidade</b>.')}`,
      quiz: [C('A embriaguez completa, proveniente de caso fortuito ou força maior, que torne o agente inteiramente incapaz de entender o caráter ilícito do fato isenta de pena.', 'Art. 28, §1º.'), E('O erro de proibição evitável isenta o agente de pena.', 'O erro evitável apenas diminui a pena de 1/6 a 1/3. Só o inevitável isenta (art. 21).')],
    },
    {
      id: 'pessoa-patrimonio', titulo: 'Crimes contra a pessoa e contra o patrimônio', arts: 'arts. 121 a 183',
      chaves: ['crimes contra a pessoa', 'contra o patrimonio'],
      html: `
<h3>Em poucas palavras</h3>
<p>Os crimes mais cobrados da parte especial: homicídio, lesão corporal, furto, roubo, extorsão, estelionato e receptação.</p>
<h3>Contra a pessoa</h3>
<table class="tab"><tr><th>Crime</th><th>Pena</th></tr>
<tr><td>Homicídio simples (121)</td><td>Reclusão de 6 a 20 anos</td></tr>
<tr><td>Homicídio qualificado (121, §2º)</td><td>Reclusão de 12 a 30 anos · hediondo</td></tr>
<tr><td>Feminicídio (121-A, Lei 14.994/2024)</td><td>Reclusão de 20 a 40 anos · crime autônomo</td></tr>
<tr><td>Homicídio culposo (121, §3º)</td><td>Detenção de 1 a 3 anos</td></tr>
<tr><td>Lesão corporal leve (129)</td><td>Detenção de 3 meses a 1 ano</td></tr></table>
<p><b>Homicídio privilegiado</b> (121, §1º): relevante valor social ou moral, ou domínio de violenta emoção logo após injusta provocação da vítima. A pena cai de 1/6 a 1/3.</p>
${cartoes([['🩹', 'Lesão grave', 'mais de 30 dias sem atividades · perigo de vida · debilidade permanente · aceleração de parto', COR.lar], ['🩸', 'Lesão gravíssima', 'incapacidade permanente · enfermidade incurável · perda de membro, sentido ou função · deformidade · aborto', COR.verm]])}
<h3>Contra o patrimônio</h3>
<table class="tab"><tr><th>Crime</th><th>Núcleo</th><th>Pena-base</th></tr>
<tr><td><b>Furto</b> (155)</td><td>Subtrair coisa alheia móvel</td><td>1 a 4 anos</td></tr>
<tr><td><b>Roubo</b> (157)</td><td>Subtrair com <b>violência ou grave ameaça</b></td><td>4 a 10 anos</td></tr>
<tr><td><b>Extorsão</b> (158)</td><td>Constranger a <b>fazer</b>, tolerar ou deixar de fazer algo, para obter vantagem</td><td>4 a 10 anos</td></tr>
<tr><td><b>Estelionato</b> (171)</td><td>Obter vantagem mediante <b>fraude</b></td><td>1 a 5 anos</td></tr>
<tr><td><b>Receptação</b> (180)</td><td>Adquirir ou receber produto de crime</td><td>1 a 4 anos</td></tr></table>
<ul><li><b>Furto qualificado</b> (2 a 8 anos): rompimento de obstáculo, abuso de confiança, fraude, escalada, destreza, chave falsa ou concurso de duas ou mais pessoas. Com explosivo: 4 a 10 anos. Veículo levado a outro Estado ou ao exterior: 3 a 8 anos.</li><li><b>Roubo majorado</b>: +1/3 até a metade (concurso de pessoas, arma branca, vítima a serviço de transporte de valores, restrição da liberdade); +2/3 com <b>arma de fogo</b>; em <b>dobro</b> com arma de fogo de uso restrito ou proibido.</li><li><b>Latrocínio</b> (roubo com morte): reclusão de 20 a 30 anos, hediondo. Há latrocínio consumado se a morte ocorre, ainda que não haja subtração (Súmula 610 do STF).</li><li><b>Estelionato</b>: depende de <b>representação</b>, salvo vítima Administração Pública, criança ou adolescente, pessoa com deficiência mental, maior de 70 anos ou incapaz.</li></ul>
${box('Escusas absolutórias (arts. 181 a 183)', '<p>É isento de pena quem pratica crime patrimonial contra <b>cônjuge</b> (na constância da sociedade conjugal), <b>ascendente ou descendente</b>. Não vale em <b>roubo, extorsão</b> ou crime com violência ou grave ameaça, para o <b>estranho</b> que participa nem se a vítima tem <b>60 anos ou mais</b>.</p>')}
${peg('A <b>extorsão</b> se consuma com o constrangimento, mesmo que o agente <b>não obtenha</b> a vantagem (Súmula 96 do STJ).')}`,
      quiz: [C('Há crime de latrocínio quando o homicídio se consuma, ainda que o agente não realize a subtração de bens da vítima.', 'Súmula 610 do STF.'), E('O emprego de arma de fogo no roubo aumenta a pena de um terço até a metade.', 'Com arma de fogo, o aumento é de 2/3 (art. 157, §2º-A, I). O aumento de 1/3 à metade vale, por exemplo, para arma branca.')],
    },
    {
      id: 'sexual-incolumidade', titulo: 'Crimes contra a dignidade sexual e contra a incolumidade pública', arts: 'arts. 213 a 234 e 250 a 285',
      chaves: ['dignidade sexual', 'incolumidade publica'],
      html: `
<h3>Contra a dignidade sexual</h3>
<table class="tab"><tr><th>Crime</th><th>Conduta</th><th>Pena</th></tr>
<tr><td><b>Estupro</b> (213)</td><td>Constranger alguém, mediante <b>violência ou grave ameaça</b>, a conjunção carnal ou outro ato libidinoso</td><td>6 a 10 anos</td></tr>
<tr><td><b>Estupro de vulnerável</b> (217-A)</td><td>Conjunção carnal ou ato libidinoso com <b>menor de 14 anos</b> ou com quem não pode oferecer resistência ou discernir</td><td>8 a 15 anos</td></tr>
<tr><td><b>Importunação sexual</b> (215-A)</td><td>Praticar ato libidinoso contra alguém, <b>sem anuência</b>, para satisfazer a própria lascívia ou a de terceiro</td><td>1 a 5 anos</td></tr>
<tr><td><b>Assédio sexual</b> (216-A)</td><td>Constranger para obter vantagem sexual, prevalecendo-se de <b>superioridade hierárquica</b></td><td>Detenção de 1 a 2 anos</td></tr></table>
<ul><li>No estupro, lesão grave ou vítima de 14 a 18 anos: 8 a 12 anos; morte: 12 a 30 anos.</li><li>No estupro de vulnerável, <b>o consentimento e a experiência sexual anterior</b> da vítima são irrelevantes (Súmula 593 do STJ e art. 217-A, §5º).</li><li>A ação penal nos crimes sexuais é <b>pública incondicionada</b> (art. 225).</li></ul>
<h3>Contra a incolumidade pública</h3>
<p>São crimes de <b>perigo comum</b>: atingem um número indeterminado de pessoas.</p>
${cartoes([['🔥', 'Incêndio (250)', 'reclusão de 3 a 6 anos; culposo: detenção', COR.verm], ['💥', 'Explosão (251)', '', COR.lar], ['🚆', 'Segurança dos transportes (260 a 264)', 'desastre ferroviário, atentado contra transporte, arremesso de projétil', COR.azul], ['🦠', 'Saúde pública (267 a 285)', 'epidemia, infração de medida sanitária, envenenamento de água', COR.verde]])}
<ul><li><b>Arremesso de projétil</b> (264): contra veículo em movimento destinado ao transporte público.</li><li><b>Epidemia</b> (267): reclusão de 10 a 15 anos; com morte, a pena dobra, e o crime é hediondo.</li><li><b>Infração de medida sanitária preventiva</b> (268): desobedecer determinação do poder público para impedir doença contagiosa.</li></ul>
${peg('A <b>importunação sexual</b> não exige violência nem grave ameaça. Se houver violência ou grave ameaça para o ato libidinoso, o crime passa a ser <b>estupro</b>.')}`,
      quiz: [C('Para o estupro de vulnerável, são irrelevantes o eventual consentimento da vítima menor de 14 anos e sua experiência sexual anterior.', 'Súmula 593 do STJ e art. 217-A, §5º.'), E('Nos crimes contra a liberdade sexual, a ação penal é pública condicionada à representação.', 'Desde a Lei 13.718/2018, a ação é pública incondicionada (art. 225).')],
    },
    {
      id: 'fe-administracao', titulo: 'Crimes contra a fé pública e contra a Administração Pública', arts: 'arts. 289 a 359',
      chaves: ['fe publica', 'contra a administracao publica'],
      html: `
<h3>Contra a fé pública</h3>
<table class="tab"><tr><th>Crime</th><th>Conduta</th><th>Pena</th></tr>
<tr><td><b>Moeda falsa</b> (289)</td><td>Falsificar moeda metálica ou papel-moeda</td><td>3 a 12 anos</td></tr>
<tr><td><b>Documento público</b> (297)</td><td>Falsificar ou alterar documento público</td><td>2 a 6 anos</td></tr>
<tr><td><b>Documento particular</b> (298)</td><td>Falsificar ou alterar documento particular, incluindo <b>cartão de crédito ou débito</b></td><td>1 a 5 anos</td></tr>
<tr><td><b>Falsidade ideológica</b> (299)</td><td>Documento <b>verdadeiro na forma</b>, com conteúdo falso</td><td>1 a 5 (público) · 1 a 3 (particular)</td></tr>
<tr><td><b>Uso de documento falso</b> (304)</td><td>Usar qualquer papel falsificado ou alterado</td><td>A mesma da falsificação</td></tr>
<tr><td><b>Falsa identidade</b> (307)</td><td>Atribuir-se identidade falsa para obter vantagem ou causar dano</td><td>Detenção de 3 meses a 1 ano</td></tr>
<tr><td><b>Adulteração de sinal de veículo</b> (311)</td><td>Adulterar ou remarcar chassi, placa ou outro sinal identificador</td><td>3 a 6 anos</td></tr></table>
${box('Muito cobrado na PRF', '<ul><li>Dar nome falso à polícia para esconder antecedentes é crime de <b>falsa identidade</b>, mesmo alegando autodefesa (Súmula 522 do STJ).</li><li>Equiparam-se a documento público (art. 297, §2º): documento de entidade paraestatal, título ao portador ou transmissível por endosso, ações de sociedade comercial, livros mercantis e testamento particular.</li></ul>')}
<h3>Contra a Administração Pública</h3>
${cartoes([['💰', 'Peculato (312)', 'apropriar-se ou desviar bem de que tem a posse pelo cargo · 2 a 12 anos', COR.verm], ['🫴', 'Concussão (316)', '<b>exigir</b> vantagem indevida · 2 a 12 anos', COR.lar], ['🤝', 'Corrupção passiva (317)', '<b>solicitar, receber ou aceitar promessa</b> · 2 a 12 anos', COR.roxo], ['🎁', 'Corrupção ativa (333)', 'particular <b>oferece ou promete</b> · 2 a 12 anos', COR.azul], ['😴', 'Prevaricação (319)', 'retardar ou deixar de praticar ato de ofício por interesse ou sentimento pessoal', COR.cinza], ['🗯', 'Desacato (331)', 'desacatar funcionário no exercício da função · detenção de 6 meses a 2 anos ou multa', COR.verde]])}
<ul><li><b>Peculato culposo</b> (312, §2º): reparar o dano <b>antes</b> da sentença irrecorrível extingue a punibilidade; depois, reduz a pena pela metade.</li><li><b>Resistência</b> (329): opor-se a ato legal com <b>violência ou ameaça</b>. <b>Desobediência</b> (330): desobedecer ordem legal, sem violência.</li><li><b>Descaminho</b> (334): iludir imposto sobre mercadoria permitida. <b>Contrabando</b> (334-A): importar ou exportar mercadoria <b>proibida</b>.</li></ul>
${box('Funcionário público para fins penais (art. 327)', '<p>Quem exerce cargo, emprego ou função pública, mesmo <b>transitoriamente ou sem remuneração</b>. Equipara-se quem trabalha em entidade paraestatal ou em empresa contratada ou conveniada para executar <b>atividade típica</b> da Administração.</p>')}
${dica('Concussão = <b>exigir</b> (impõe). Corrupção passiva = <b>solicitar, receber ou aceitar</b> (pede ou aceita). Corrupção ativa = o particular <b>oferece ou promete</b>.')}
${peg('Mercadoria <b>proibida</b> é contrabando. Mercadoria <b>permitida</b>, sem pagar imposto, é descaminho.')}`,
      quiz: [C('Constitui crime de falsa identidade atribuir-se falsa identidade perante a autoridade policial, ainda que em situação de alegada autodefesa.', 'Súmula 522 do STJ.'), E('Comete corrupção passiva o funcionário público que exige, para si, vantagem indevida em razão da função.', 'Exigir é concussão (art. 316). Corrupção passiva é solicitar, receber ou aceitar promessa (art. 317).')],
    },
  ],
};

function table() {
  return `<table class="tab"><tr><th>Excludente</th><th>Palavra-chave</th></tr><tr><td>Estado de necessidade</td><td><b>Perigo</b> atual</td></tr><tr><td>Legítima defesa</td><td><b>Agressão</b> injusta</td></tr><tr><td>Estrito cumprimento</td><td><b>Dever</b> legal</td></tr><tr><td>Exercício regular</td><td><b>Direito</b></td></tr></table>`;
}

export default { ...BASE, atualizado: 'novembro de 2026 · 50 questões por tópico', assuntos: BASE.assuntos.map((a) => ({ ...a, quiz: [...(a.quiz || []), ...(BANCO[a.id] || [])] })) };
