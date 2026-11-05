// Leitura R.I.S.K. — Medicina Legal (gerado de c6-medicina-legal.mat).
export default {
"id": "medicina-legal",
"nome": "Medicina Legal",
"cor": "#702459",
"ico": "🩺",
"apelidos": [
"medicina legal"
],
"assuntos": [
{
"id": "pericia",
"titulo": "Perícias, peritos e documentos médico-legais",
"arts": "CPP, arts. 158 a 184",
"chaves": [
"pericia",
"perito oficial",
"corpo de delito",
"laudo",
"documentos medico-legais",
"cadeia de custodia"
],
"html": "<h3>Perícia no CPP</h3>\n<ul><li>Quando a infração deixa vestígios, é <b>indispensável</b> o exame de corpo de delito, <b>direto ou indireto</b>, não podendo supri-lo a confissão (art. 158).</li><li><b>Prioridade</b> para crimes de violência doméstica contra a mulher e violência contra criança, adolescente, idoso ou pessoa com deficiência (art. 158, parágrafo único).</li><li>Feito por <b>1 perito oficial</b> com diploma superior; na falta, por <b>2 pessoas idôneas</b> com diploma superior, preferencialmente na área (art. 159).</li><li>O laudo é elaborado em até <b>10 dias</b>, prorrogáveis (art. 160). O juiz <b>não fica adstrito</b> ao laudo (art. 182, sistema <b>liberatório</b>).</li><li><b>Exame complementar</b> de lesão corporal: para classificar a lesão grave por incapacidade para as ocupações habituais por mais de 30 dias, faz-se logo que decorra o prazo de <b>30 dias</b> (art. 168, §2º).</li><li><b>Cadeia de custódia</b> (arts. 158-A a 158-F): reconhecimento, isolamento, fixação, coleta, acondicionamento, transporte, recebimento, processamento, armazenamento e descarte.</li></ul>\n<h3>Documentos médico-legais</h3>\n<table class=\"tab\"><thead><tr><th>Documento</th><th>Característica</th></tr></thead><tbody><tr><td>Notificação</td><td>comunicação compulsória (doenças, violência)</td></tr><tr><td>Atestado</td><td>afirmação simples de um fato médico</td></tr><tr><td>Relatório (laudo ou auto)</td><td>descrição da perícia: <b>laudo</b> (escrito pelo perito) e <b>auto</b> (ditado ao escrivão)</td></tr><tr><td>Parecer</td><td>opinião técnica de especialista sobre caso já periciado</td></tr><tr><td>Depoimento oral</td><td>esclarecimento em juízo</td></tr></tbody></table>\n<ul><li>Partes do relatório: preâmbulo, quesitos, histórico, <b>descrição</b> (parte mais importante, <i>visum et repertum</i>), discussão, conclusão e respostas aos quesitos.</li></ul>\n<div class=\"lt-peg\"><b class=\"lt-tit\">⚠ Pegadinha</b> <b>Laudo</b> é redigido pelo próprio perito; <b>auto</b> é ditado ao escrivão. E o exame de corpo de delito <b>não</b> é suprido pela confissão.</div>",
"quiz": [
{
"p": "Quando a infração deixar vestígios, será indispensável o exame de corpo de delito, direto ou indireto, não podendo supri-lo a confissão do acusado.",
"c": true,
"x": "É o art. 158 do CPP.",
"e": "CPP, art. 158."
},
{
"p": "O juiz fica vinculado às conclusões do laudo pericial.",
"c": false,
"x": "Pelo art. 182 do CPP, o juiz pode aceitar ou rejeitar o laudo, no todo ou em parte (sistema liberatório).",
"e": "CPP, art. 182."
},
{
"p": "Em regra, o exame de corpo de delito e outras perícias são realizados por perito oficial portador de diploma de curso superior.",
"c": true,
"x": "É o art. 159 do CPP. Na falta, duas pessoas idôneas com diploma superior.",
"e": "CPP, art. 159."
},
{
"p": "A parte do relatório médico-legal considerada a mais importante, em que o perito descreve minuciosamente o que observou, é",
"alts": [
"o preâmbulo",
"o histórico",
"a descrição",
"a discussão",
"os quesitos"
],
"r": 2,
"x": "É o “visum et repertum” (visto e encontrado).",
"n": [
"Contém a qualificação do perito e da autoridade.",
"É o relato dos fatos pelo periciado ou pela autoridade.",
"Correta.",
"Traz as hipóteses diagnósticas.",
"São as perguntas a responder."
],
"e": "Documentos médico-legais."
}
]
},
{
"id": "traumatologia",
"titulo": "Traumatologia: lesões por instrumentos e classificação das lesões",
"arts": "CP, art. 129",
"chaves": [
"traumatologia",
"instrumento perfurante",
"instrumento cortante",
"instrumento contundente",
"perfurocortante",
"perfurocontundente",
"lesao corporal",
"equimose"
],
"html": "<h3>Instrumentos e lesões</h3>\n<table class=\"tab\"><thead><tr><th>Instrumento</th><th>Ação</th><th>Lesão</th><th>Exemplo</th></tr></thead><tbody><tr><td>Perfurante</td><td>pressão em ponto</td><td><b>puntiforme</b></td><td>agulha, prego</td></tr><tr><td>Cortante</td><td>deslizamento em gume</td><td><b>incisa</b> (bordas regulares, mais longa que profunda, cauda de escoriação)</td><td>navalha, bisturi</td></tr><tr><td>Contundente</td><td>pressão em superfície</td><td><b>contusa</b> (escoriação, equimose, hematoma, ferida contusa com bordas irregulares e pontes de tecido)</td><td>pau, soco</td></tr><tr><td>Perfurocortante</td><td>ponta + gume</td><td><b>perfuroincisa</b></td><td>faca, punhal</td></tr><tr><td>Cortocontundente</td><td>peso + gume</td><td><b>cortocontusa</b></td><td>machado, facão, dentes</td></tr><tr><td>Perfurocontundente</td><td>ponta romba</td><td><b>perfurocontusa</b></td><td>projétil de arma de fogo</td></tr></tbody></table>\n<h3>Equimoses: espectro de Legrand du Saulle</h3>\n<ul><li>Vermelha (1º dia) → violácea (2º e 3º) → azul (4º a 6º) → esverdeada (7º a 10º) → amarelada (12º) → desaparece por volta do 15º a 20º dia. Útil para <b>datar</b> a lesão.</li></ul>\n<h3>Lesões por projétil de arma de fogo</h3>\n<ul><li><b>Orifício de entrada</b>: geralmente menor, bordas invertidas, <b>orla de escoriação</b> e de enxugo; em tiros próximos, <b>zona de tatuagem</b> (grãos de pólvora incrustados, não sai com lavagem) e <b>zona de esfumaçamento</b> (fuligem, sai com lavagem).</li><li><b>Tiro encostado</b>: <b>câmara de mina de Hoffmann</b> (em ossos planos, como o crânio), sinal de Puppe-Werkgaertner (marca do cano).</li><li><b>Orifício de saída</b>: geralmente maior, irregular, bordas <b>evertidas</b>, sem orlas.</li></ul>\n<h3>Classificação jurídica (CP, art. 129)</h3>\n<ul><li><b>Grave</b> (§1º): incapacidade para ocupações habituais por mais de <b>30 dias</b>; perigo de vida; debilidade <b>permanente</b> de membro, sentido ou função; aceleração de parto.</li><li><b>Gravíssima</b> (§2º): incapacidade <b>permanente</b> para o trabalho; enfermidade incurável; <b>perda ou inutilização</b> de membro, sentido ou função; deformidade permanente; <b>aborto</b>.</li></ul>\n<div class=\"lt-dica\"><b class=\"lt-tit\">💡 Dica de memorização</b> <b>Debilidade</b> = enfraquecimento (grave). <b>Perda</b> = inutilização (gravíssima). <b>Aceleração do parto</b> = grave. <b>Aborto</b> = gravíssima.</div>",
"quiz": [
{
"p": "O projétil de arma de fogo é instrumento perfurocontundente e produz lesão perfurocontusa.",
"c": true,
"x": "Ele age por pressão de ponta romba, perfurando e contundindo.",
"e": "Traumatologia."
},
{
"p": "A zona de tatuagem é formada pela fuligem depositada na pele e é removida com a lavagem.",
"c": false,
"x": "Essa é a zona de esfumaçamento. A tatuagem é formada por grãos de pólvora incrustados e não sai com a lavagem.",
"e": "Lesões por arma de fogo."
},
{
"p": "A câmara de mina de Hoffmann é característica do tiro encostado em região com plano ósseo subjacente, como o crânio.",
"c": true,
"x": "Os gases da explosão descolam e rompem os tecidos, formando lesão estrelada.",
"e": "Tiro encostado."
},
{
"p": "A lesão produzida por instrumento cortante, como a navalha, é a lesão incisa, que costuma ter bordas regulares e cauda de escoriação.",
"c": true,
"x": "A cauda indica o sentido do corte (do fim do movimento).",
"e": "Traumatologia."
},
{
"p": "Segundo o Código Penal, a debilidade permanente de membro, sentido ou função configura lesão corporal",
"alts": [
"leve",
"grave",
"gravíssima",
"seguida de morte",
"culposa"
],
"r": 1,
"x": "Art. 129, §1º, III. A perda ou inutilização é que configura gravíssima (§2º, III).",
"n": [
"Há resultado qualificador.",
"Correta.",
"Gravíssima é a perda ou inutilização.",
"Não houve morte.",
"A classificação não depende de culpa."
],
"e": "CP, art. 129, §1º."
}
]
},
{
"id": "tanatologia",
"titulo": "Tanatologia: morte, fenômenos cadavéricos e cronotanatognose",
"arts": "Lei 9.434/1997",
"chaves": [
"tanatologia",
"morte encefalica",
"fenomenos cadavericos",
"rigidez cadaverica",
"livores",
"algor mortis",
"putrefacao",
"cronotanatognose"
],
"html": "<h3>Morte</h3>\n<ul><li>Diagnóstico legal de <b>morte encefálica</b> para transplantes (Lei 9.434/1997, art. 3º), conforme protocolo do <b>CFM</b>.</li><li><b>Comoriência</b>: se dois morrem na mesma ocasião e não se sabe quem morreu primeiro, presumem-se <b>simultaneamente mortos</b> (CC, art. 8º).</li></ul>\n<h3>Fenômenos cadavéricos</h3>\n<ul><li><b>Abióticos imediatos</b>: perda da consciência, insensibilidade, imobilidade, parada cardiorrespiratória.</li><li><b>Abióticos consecutivos</b>: <b>resfriamento</b> (<i>algor mortis</i>, cerca de 0,5 °C a 1,5 °C por hora nas primeiras horas); <b>desidratação</b>; <b>livores</b> (<i>livor mortis</i>, manchas de hipóstase nas partes de declive, a partir de 2 a 3 horas, fixam-se em cerca de 8 a 12 horas); <b>rigidez</b> (<i>rigor mortis</i>, começa em 1 a 2 horas pela <b>mandíbula e nuca</b>, generaliza-se em cerca de 8 horas e desaparece com a putrefação, a partir de 24 a 36 horas, na mesma ordem: <b>lei de Nysten</b>).</li><li><b>Transformativos destrutivos</b>: <b>autólise</b>, <b>putrefação</b> (fases: <b>coloração</b> com mancha verde abdominal na fossa ilíaca direita, a partir de 18 a 24 horas; <b>gasosa</b>; <b>coliquativa</b>; <b>esqueletização</b>) e maceração.</li><li><b>Conservadores</b>: <b>mumificação</b> (ambiente quente e seco), <b>saponificação</b> (adipocera, ambiente úmido e argiloso), calcificação, corificação.</li></ul>\n<div class=\"lt-peg\"><b class=\"lt-tit\">⚠ Pegadinha</b> Livores <b>mudam de lugar</b> se o corpo for movido antes de se fixarem (até cerca de 12 horas). Livores <b>incompatíveis</b> com a posição do corpo indicam que ele foi <b>mudado de posição</b>.</div>\n<div class=\"lt-dica\"><b class=\"lt-tit\">💡 Dica de memorização</b> Ordem da rigidez (Nysten): <b>de cima para baixo</b>: mandíbula → nuca → membros superiores → tronco → membros inferiores.</div>",
"quiz": [
{
"p": "Os livores cadavéricos surgem nas partes de declive do cadáver e, depois de fixados, não mudam de posição com a mudança da posição do corpo.",
"c": true,
"x": "Livor incompatível com a posição em que o corpo foi achado indica mudança de posição após a fixação.",
"e": "Fenômenos cadavéricos."
},
{
"p": "A rigidez cadavérica inicia-se pelos membros inferiores e progride em direção à cabeça.",
"c": false,
"x": "Segundo a lei de Nysten, começa pela mandíbula e nuca e segue em sentido descendente.",
"e": "Lei de Nysten."
},
{
"p": "A mancha verde abdominal, que marca a fase de coloração da putrefação, aparece em geral na fossa ilíaca direita.",
"c": true,
"x": "A região do ceco tem grande concentração de bactérias e gases.",
"e": "Putrefação."
},
{
"p": "A transformação conservadora do cadáver em ambiente quente, seco e ventilado é a",
"alts": [
"saponificação",
"mumificação",
"maceração",
"coliquação",
"autólise"
],
"r": 1,
"x": "A desidratação rápida impede a putrefação e conserva o corpo.",
"n": [
"Ocorre em ambiente úmido.",
"Correta.",
"Ocorre em meio líquido (feto morto no útero, afogados).",
"É fase da putrefação.",
"É fenômeno destrutivo inicial."
],
"e": "Fenômenos conservadores."
}
]
},
{
"id": "asfixiologia",
"titulo": "Asfixiologia: enforcamento, estrangulamento, esganadura, afogamento",
"arts": "Asfixias mecânicas",
"chaves": [
"asfixia",
"enforcamento",
"estrangulamento",
"esganadura",
"afogamento",
"sufocacao",
"sulco"
],
"html": "<h3>Constrição do pescoço</h3>\n<table class=\"tab\"><thead><tr><th>Modalidade</th><th>Força</th><th>Sulco</th></tr></thead><tbody><tr><td><b>Enforcamento</b></td><td>o <b>peso do próprio corpo</b></td><td><b>oblíquo</b>, ascendente, <b>descontínuo</b> (interrompido no nó), mais profundo do lado oposto ao nó</td></tr><tr><td><b>Estrangulamento</b></td><td>força <b>externa</b> com laço (outra pessoa)</td><td><b>horizontal</b>, <b>contínuo</b>, profundidade uniforme</td></tr><tr><td><b>Esganadura</b></td><td><b>mãos</b> do agressor</td><td><b>sem sulco</b>: estigmas ungueais (marcas de unhas) e equimoses</td></tr></tbody></table>\n<ul><li><b>Enforcamento</b> é, em regra, <b>suicida</b>; <b>esganadura</b> é sempre <b>homicida</b> (ninguém se esgana sozinho).</li></ul>\n<h3>Outras asfixias</h3>\n<ul><li><b>Sufocação direta</b> (oclusão de boca e nariz, de vias aéreas) e <b>indireta</b> (compressão do tórax).</li><li><b>Afogamento</b>: substituição do ar por líquido. Sinais: <b>cogumelo de espuma</b> nas narinas e boca, <b>mão de lavadeira</b> (maceração da pele), manchas de Paltauf nos pulmões.</li><li><b>Confinamento</b> e asfixia por <b>gases</b> (monóxido de carbono: coloração <b>vermelho-carmim</b> dos livores).</li></ul>\n<div class=\"lt-peg\"><b class=\"lt-tit\">⚠ Pegadinha</b> Sulco <b>oblíquo e descontínuo</b> = enforcamento. Sulco <b>horizontal e contínuo</b> = estrangulamento. <b>Sem sulco</b>, com unhadas = esganadura.</div>",
"quiz": [
{
"p": "Na esganadura, a constrição do pescoço é feita pelas mãos do agressor, e não há sulco, mas marcas de unhas e equimoses.",
"c": true,
"x": "Por isso a esganadura é sempre homicida.",
"e": "Asfixiologia."
},
{
"p": "O sulco do enforcamento é tipicamente horizontal e contínuo, com profundidade uniforme.",
"c": false,
"x": "Essas são características do estrangulamento. No enforcamento, o sulco é oblíquo, ascendente e interrompido na altura do nó.",
"e": "Asfixiologia."
},
{
"p": "Na intoxicação por monóxido de carbono, os livores costumam apresentar coloração vermelho-carmim.",
"c": true,
"x": "A carboxi-hemoglobina dá a coloração característica.",
"e": "Asfixia por gases."
},
{
"p": "O “cogumelo de espuma” na boca e nas narinas é sinal típico de",
"alts": [
"esganadura",
"enforcamento",
"afogamento",
"sufocação indireta",
"estrangulamento"
],
"r": 2,
"x": "Forma-se pela mistura de ar, água e muco nas vias aéreas do afogado.",
"n": [
"Não é sinal típico.",
"Não é sinal típico.",
"Correta.",
"Não é sinal típico.",
"Não é sinal típico."
],
"e": "Afogamento."
}
]
},
{
"id": "sexologia",
"titulo": "Sexologia forense e identificação",
"arts": "CP, arts. 213 a 217-A; antropologia forense",
"chaves": [
"sexologia forense",
"estupro",
"conjuncao carnal",
"himen",
"gravidez",
"identificacao",
"datiloscopia",
"dna",
"arcada dentaria"
],
"html": "<h3>Sexologia</h3>\n<ul><li><b>Conjunção carnal</b>: introdução do pênis na vagina. Prova: rotura himenal recente, presença de <b>esperma</b> (fosfatase ácida, PSA), gravidez, doenças sexualmente transmissíveis.</li><li><b>Hímen complacente</b>: permite a conjunção sem se romper. Por isso a integridade do hímen não exclui a conjunção.</li><li>Após a Lei 12.015/2009, <b>estupro</b> abrange conjunção carnal e <b>outros atos libidinosos</b> (CP, art. 213). <b>Estupro de vulnerável</b> (art. 217-A): menor de 14 anos ou quem não tem discernimento ou não pode oferecer resistência.</li></ul>\n<h3>Identificação</h3>\n<ul><li><b>Datiloscopia</b> (impressões digitais): baseada nos princípios da <b>perenidade, imutabilidade, variabilidade e classificabilidade</b>. No Brasil, sistema de <b>Vucetich</b> (tipos: arco, presilha interna, presilha externa e verticilo).</li><li><b>DNA</b>: Banco Nacional de Perfis Genéticos (Lei 12.654/2012; LEP, art. 9º-A).</li><li><b>Odontologia legal</b>: arcada dentária, útil em carbonizados.</li><li>Identidade x <b>reconhecimento</b>: identificação é processo técnico; reconhecimento é ato de testemunha.</li></ul>\n<div class=\"lt-juris\"><b class=\"lt-tit\">⚖ Jurisprudência</b><ul><li><b>STF (Tema 905)</b>: discute a constitucionalidade da coleta compulsória de DNA de condenados (LEP, art. 9º-A); a lei segue aplicável até o julgamento final.</li><li><b>STJ (Súmula 593)</b>: o estupro de vulnerável se configura com a conjunção carnal ou prática de ato libidinoso com menor de 14 anos, sendo irrelevantes o consentimento, a experiência sexual anterior ou o relacionamento amoroso.</li></ul></div>",
"quiz": [
{
"p": "A integridade do hímen não exclui, necessariamente, a ocorrência de conjunção carnal, pois há hímens complacentes.",
"c": true,
"x": "O hímen complacente é elástico e não se rompe.",
"e": "Sexologia forense."
},
{
"p": "No sistema datiloscópico de Vucetich, os tipos fundamentais são arco, presilha interna, presilha externa e espiral dupla.",
"c": false,
"x": "Os quatro tipos são arco, presilha interna, presilha externa e verticilo.",
"e": "Sistema de Vucetich."
},
{
"p": "O estupro de vulnerável se configura com a prática de ato libidinoso com menor de 14 anos, sendo irrelevante o consentimento da vítima.",
"c": true,
"x": "É a Súmula 593 do STJ, positivada no art. 217-A, §5º, do CP.",
"e": "Súmula 593 do STJ."
},
{
"p": "Os princípios que fundamentam a datiloscopia como método de identificação incluem",
"alts": [
"mutabilidade e uniformidade",
"perenidade, imutabilidade e variabilidade",
"transitoriedade e semelhança",
"hereditariedade e repetição",
"flexibilidade e mutação"
],
"r": 1,
"x": "As impressões existem desde a vida fetal (perenidade), não mudam (imutabilidade) e são únicas (variabilidade).",
"n": [
"Oposto do correto.",
"Correta.",
"Oposto do correto.",
"Não são princípios da datiloscopia.",
"Oposto do correto."
],
"e": "Datiloscopia."
}
]
},
{
"id": "toxicologia-psiquiatria",
"titulo": "Toxicologia, embriaguez e psiquiatria forense",
"arts": "CP, arts. 26 a 28",
"chaves": [
"toxicologia",
"embriaguez",
"imputabilidade",
"psiquiatria forense",
"semi-imputabilidade",
"actio libera in causa"
],
"html": "<h3>Embriaguez (CP, art. 28)</h3>\n<ul><li><b>Voluntária ou culposa</b>: <b>não exclui</b> a imputabilidade (teoria da <i>actio libera in causa</i>).</li><li><b>Completa, por caso fortuito ou força maior</b>: <b>isenta de pena</b> se o agente era inteiramente incapaz de entender ou de se determinar.</li><li><b>Incompleta</b> por caso fortuito: reduz a pena de 1/3 a 2/3.</li><li><b>Preordenada</b> (para cometer o crime): <b>agravante</b> (art. 61, II, l).</li><li>Fases clínicas: <b>excitação</b> (euforia), <b>confusão</b> (perturbação motora, “fase do leão”) e <b>sono/coma</b>.</li></ul>\n<h3>Imputabilidade (art. 26)</h3>\n<ul><li><b>Inimputável</b> (isento de pena): doença mental ou desenvolvimento mental incompleto ou retardado, <b>inteiramente incapaz</b> de entender o caráter ilícito ou de se determinar (critério <b>biopsicológico</b>). Aplica-se <b>medida de segurança</b>.</li><li><b>Semi-imputável</b> (parágrafo único): não era inteiramente capaz: pena reduzida de 1/3 a 2/3, ou substituída por medida de segurança.</li><li>Menores de 18: inimputáveis por critério <b>biológico</b> (art. 27).</li><li><b>Incidente de insanidade mental</b>: CPP, art. 149.</li></ul>\n<div class=\"lt-peg\"><b class=\"lt-tit\">⚠ Pegadinha</b> A <b>emoção e a paixão não excluem</b> a imputabilidade (art. 28, I). E a embriaguez <b>voluntária completa</b> também não.</div>",
"quiz": [
{
"p": "A embriaguez voluntária ou culposa, pelo álcool ou substância de efeitos análogos, não exclui a imputabilidade penal.",
"c": true,
"x": "É o art. 28, II, do CP (teoria da actio libera in causa).",
"e": "CP, art. 28, II."
},
{
"p": "A embriaguez completa, ainda que voluntária, isenta o agente de pena.",
"c": false,
"x": "Só a embriaguez completa proveniente de caso fortuito ou força maior isenta de pena (art. 28, §1º).",
"e": "CP, art. 28, §1º."
},
{
"p": "O Código Penal adotou, quanto à inimputabilidade por doença mental, o critério biopsicológico.",
"c": true,
"x": "Exige a doença (biológico) e a incapacidade de entender ou de se determinar (psicológico) no momento do fato.",
"e": "CP, art. 26."
},
{
"p": "A embriaguez preordenada, em que o agente se embriaga para cometer o crime, é",
"alts": [
"causa de isenção de pena",
"causa de diminuição de pena",
"circunstância agravante",
"causa de exclusão da ilicitude",
"irrelevante"
],
"r": 2,
"x": "É a agravante do art. 61, II, l, do CP.",
"n": [
"Não isenta.",
"Não diminui.",
"Correta.",
"Não exclui a ilicitude.",
"É relevante: agrava."
],
"e": "CP, art. 61, II, l."
}
]
}
]
};
