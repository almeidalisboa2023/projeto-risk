// Português (aula completa) — parte D: crase, colocação pronominal, reescrita e redação oficial.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, banca, C, E } from './blocos.js';

const par = (ok, no, por) => `<li class="${ok ? '' : 'so-erro'}">${ok ? `✔ ${ok}` : ''}${ok && no ? '<br>' : ''}${no ? `✘ <s>${no}</s>` : ''}${por ? ` <small class="muted">— ${por}</small>` : ''}</li>`;
const lista = (itens) => `<ul class="lt-pares">${itens.join('')}</ul>`;

export const PT_D = [
  {
    id: 'crase', titulo: 'Crase', arts: 'aula completa',
    chaves: ['crase', 'acento grave'],
    html: `
<h3>1. O que é crase</h3>
<p>Crase é a <b>fusão de dois “aa”</b>: a <b>preposição a</b> + o <b>artigo a(s)</b>, ou a preposição + o “a” inicial de <b>aquele(s), aquela(s), aquilo</b>, ou a preposição + o pronome <b>a(s)</b> (= aquela). O acento grave (à) só marca essa fusão. Por isso, crase exige duas condições ao mesmo tempo.</p>
${passos([['O termo anterior exige a preposição “a”?', 'vou a, obedeço a, refiro-me a, cheguei a, entreguei a, favorável a'], ['A palavra seguinte é feminina e aceita o artigo “a”?', 'a praia, a lei, a delegacia, a operação'], ['As duas respostas são sim?', 'então há crase: vou à praia, obedeço à lei']])}
${dica('<b>Truque do masculino</b>: troque a palavra feminina por uma masculina. Se aparecer “<b>ao</b>”, há crase. “Vou <b>à</b> delegacia” → “Vou <b>ao</b> posto”. “Conheço <b>a</b> delegada” → “Conheço <b>o</b> delegado” (sem crase).')}
<h3>2. Crase obrigatória</h3>
<table class="tab"><tr><th>Caso</th><th>Exemplos</th></tr>
<tr><td><b>Horas determinadas</b></td><td>às 8h · das 8h às 18h · à meia-noite · à uma hora</td></tr>
<tr><td><b>Locuções adverbiais femininas</b></td><td>à noite, à tarde, às pressas, às vezes, à vista, à toa, à vontade, às claras, à esquerda, à direita</td></tr>
<tr><td><b>Locuções prepositivas</b></td><td>à custa de, à procura de, à espera de, à frente de, à beira de, à mercê de</td></tr>
<tr><td><b>Locuções conjuntivas</b></td><td>à medida que, à proporção que</td></tr>
<tr><td><b>À moda de / à maneira de</b> (mesmo subentendido)</td><td>bife à milanesa · gol à Pelé · móveis à Luís XV</td></tr>
<tr><td><b>Aquele, aquela, aquilo</b> após termo que exige “a”</td><td>Refiro-me <b>àquele</b> agente. · Não dei atenção <b>àquilo</b>.</td></tr>
<tr><td>Pronome <b>a</b> (= aquela) + preposição</td><td>Esta multa é igual <b>à</b> que recebi ontem.</td></tr>
<tr><td><b>Distância determinada</b></td><td>O carro estava <b>à</b> distância de 50 metros.</td></tr></table>
<h3>3. Crase proibida</h3>
${cartoes([['♂', 'Antes de masculino', 'andar a pé, a cavalo; passeio a barco', COR.verm], ['⚡', 'Antes de verbo', 'começou a chover; dispostos a colaborar', COR.verm], ['👤', 'Antes de pronomes que não aceitam artigo', 'a ela, a você, a mim, a Vossa Excelência, a esta, a cada, a qualquer, a ninguém', COR.verm], ['🔁', 'Entre palavras repetidas', 'cara a cara, frente a frente, gota a gota, dia a dia', COR.verm], ['1️⃣', '“a” singular antes de plural', 'refiro-me a pessoas; entregou a crianças', COR.verm], ['❓', 'Antes de artigo indefinido', 'chegou a uma conclusão', COR.verm], ['🏷', 'Antes de nomes de cidade sem determinante', 'vou a Brasília, a Roma', COR.verm], ['📅', 'Antes de “distância” indeterminada', 'ficou a distância (sem especificar quanto)', COR.verm]])}
<p>Exceções entre os pronomes: <b>senhora, senhorita, dona, madame</b> aceitam artigo. “Entreguei o documento <b>à</b> senhora.”</p>
<h3>4. Crase facultativa</h3>
${lista([par('Antes de <b>pronome possessivo feminino singular</b>: “Entregou <b>à/a</b> sua chefe.”'), par('Antes de <b>nome próprio feminino de pessoa</b>: “Refiro-me <b>à/a</b> Maria.”'), par('Depois de <b>até</b>: “Foi até <b>à/a</b> praia.”')])}
<h3>5. Casos especiais</h3>
<table class="tab"><tr><th>Caso</th><th>Regra</th></tr>
<tr><td><b>Lugares</b></td><td>“Vou a… / volto <b>da</b>” → crase: vou <b>à</b> Bahia (volto da Bahia). “Vou a… / volto <b>de</b>” → sem crase: vou <b>a</b> Brasília (volto de Brasília). Cidade com determinante: vou <b>à</b> Brasília dos anos 60.</td></tr>
<tr><td><b>Casa</b> (o próprio lar)</td><td>sem determinante, sem crase: “Voltou <b>a</b> casa.” Com determinante: “Voltou <b>à</b> casa dos pais.”</td></tr>
<tr><td><b>Terra</b> (chão firme)</td><td>“Os marinheiros desceram <b>a</b> terra.” Terra natal ou planeta: “Voltou <b>à</b> terra natal.”</td></tr>
<tr><td><b>Às vezes × as vezes</b></td><td>“às vezes” (= de vez em quando) tem crase; “fazer as vezes de” (= substituir) não tem</td></tr>
<tr><td><b>Datas</b></td><td>“de 10 a 20 de maio” (sem crase, sem artigo) · “das 8h às 18h” (com artigo, com crase)</td></tr></table>
${ex(`${lista([par('O agente entregou a notificação <b>à</b> condutora.', '', 'entregou a + a condutora'), par('Assistimos <b>à</b> audiência.', '', 'assistir (ver) pede “a”'), par('A reunião será <b>às</b> 14h.'), par('', 'O agente começou <b>à</b> verificar.', 'verbo'), par('', 'Entregou o laudo <b>à</b> Vossa Excelência.', 'pronome de tratamento'), par('', 'Fez a vistoria <b>à</b> pedido do juiz.', 'masculino: “a pedido”')])}`, 'Certo ou errado?')}
${banca(`<ul><li>“O acento grave é <b>facultativo</b>” antes de possessivo ou depois de “até”: item certo.</li><li>Crase antes de verbo, masculino ou pronome de tratamento: sempre errado.</li><li>“As pessoas <b>a quem</b> me refiro”: sem crase, “quem” não aceita artigo.</li><li>Troca de palavra: “Refiro-me à lei” → “Refiro-me ao decreto” (mostra que havia crase).</li></ul>`)}
${peg('“Às vezes” (= de vez em quando) tem crase. “Fazer <b>as</b> vezes de” (= substituir) <b>não</b> tem: “O cabo fez <b>as</b> vezes do sargento.”')}`,
    quiz: [
      E('Em “O agente começou à verificar os documentos”, o acento grave está correto.', 'Não há crase antes de verbo.'),
      C('Na frase “Entregou o relatório à sua chefe”, o acento grave é facultativo.', 'Possessivo feminino singular.'),
      C('Em “Voltarei a Brasília amanhã”, não há crase porque se diz “volto de Brasília”.', 'Regra do “vou a, volto de”.'),
      E('A frase “Encaminhe o processo à Vossa Excelência” está correta.', 'Pronome de tratamento não aceita artigo.'),
      C('Em “A audiência ocorrerá das 9h às 17h”, o acento grave em “às” é obrigatório.', 'Horas determinadas.'),
      E('Em “Fizemos a vistoria à pedido do delegado”, o acento grave está correto.', '“Pedido” é masculino.'),
      C('Em “Refiro-me àquela decisão”, há crase da preposição “a” com o “a” inicial de “aquela”.', 'Referir-se a + aquela.'),
      E('Na expressão “frente à frente”, o acento grave é obrigatório.', 'Entre palavras repetidas não há crase.'),
    ],
  },
  {
    id: 'colocacao', titulo: 'Colocação dos pronomes átonos', arts: 'aula completa',
    chaves: ['colocacao dos pronomes atonos', 'colocacao pronominal', 'colocacao dos pronomes', 'pronomes atonos'],
    html: `
<h3>1. Os três lugares do pronome</h3>
<p>Os pronomes oblíquos <b>átonos</b> (me, te, se, o, a, lhe, nos, vos, os, as, lhes) se colocam em relação ao verbo de três formas:</p>
${cartoes([['⬅️', 'Próclise', 'antes do verbo: “Não <b>me</b> disse.”', COR.azul], ['⏺', 'Mesóclise', 'no meio do verbo: “Dir-<b>te</b>-ei.”', COR.roxo], ['➡️', 'Ênclise', 'depois do verbo: “Disse-<b>me</b> a verdade.”', COR.verde]])}
<p>A <b>ênclise</b> é a posição “neutra” da norma-padrão. A <b>próclise</b> é obrigatória quando há uma palavra que “atrai” o pronome. A <b>mesóclise</b> é usada só com futuro do presente e do pretérito, quando não há atração.</p>
<h3>2. Próclise obrigatória: as palavras atrativas</h3>
<table class="tab"><tr><th>Palavra atrativa</th><th>Exemplo</th></tr>
<tr><td><b>Negativas</b>: não, nunca, jamais, ninguém, nada, nem</td><td>“<b>Não</b> se esqueça do documento.”</td></tr>
<tr><td><b>Advérbios</b> sem vírgula: aqui, ali, sempre, já, ainda, talvez, bem, mal, só</td><td>“<b>Aqui</b> se trabalha.” · “<b>Sempre</b> o vejo.”</td></tr>
<tr><td><b>Pronomes relativos</b>: que, quem, o qual, cujo, onde</td><td>“O agente <b>que</b> me abordou…”</td></tr>
<tr><td><b>Pronomes indefinidos</b>: alguém, tudo, todos, nada, muitos, poucos</td><td>“<b>Alguém</b> o avisou.” · “<b>Tudo</b> se resolveu.”</td></tr>
<tr><td><b>Pronomes demonstrativos</b> neutros: isso, isto, aquilo</td><td>“<b>Isso</b> me preocupa.”</td></tr>
<tr><td><b>Conjunções subordinativas</b>: quando, se, embora, porque, que, como, conforme</td><td>“<b>Quando</b> o vi…” · “<b>Embora</b> se esforce…”</td></tr>
<tr><td>Frases <b>interrogativas</b> e <b>exclamativas</b></td><td>“Quem <b>te</b> contou?” · “Como <b>se</b> enganou!”</td></tr>
<tr><td>Frases <b>optativas</b> (desejo)</td><td>“Deus <b>o</b> abençoe!” · “Bons ventos <b>o</b> levem!”</td></tr>
<tr><td>Preposição <b>em</b> + gerúndio</td><td>“<b>Em se</b> tratando de crime…”</td></tr></table>
<h3>3. Ênclise obrigatória</h3>
${lista([par('<b>Início de frase</b>: “Entregaram-<b>me</b> o laudo.”', '“<b>Me</b> entregaram o laudo.”', 'a norma-padrão não começa frase com pronome átono'), par('<b>Imperativo afirmativo</b>: “Apresente-<b>me</b> a CNH.”'), par('<b>Gerúndio</b> sem “em”: “Saiu, deixando-<b>o</b> ferido.”'), par('<b>Infinitivo impessoal</b> sem atrativa: “É preciso respeitá-<b>lo</b>.”'), par('Depois de vírgula ou pausa: “Ontem, ligaram-<b>me</b>.”')])}
<h3>4. Mesóclise</h3>
<p>Só com <b>futuro do presente</b> e <b>futuro do pretérito</b>, quando não há palavra atrativa. Se houver, usa-se a próclise.</p>
${lista([par('“Realizar-<b>se</b>-á a operação.”'), par('“Dir-<b>lhe</b>-ia a verdade.”'), par('“<b>Não se</b> realizará a operação.”', '', 'com atrativa: próclise'), par('', '“Realizará-<b>se</b> a operação.”', 'nunca ênclise com futuro')])}
<h3>5. Locuções verbais</h3>
<table class="tab"><tr><th>Locução</th><th>Possibilidades</th></tr>
<tr><td>Auxiliar + <b>infinitivo</b></td><td>“Quero-<b>lhe</b> falar.” · “Quero falar-<b>lhe</b>.” · com atrativa: “Não <b>lhe</b> quero falar.” ou “Não quero falar-<b>lhe</b>.”</td></tr>
<tr><td>Auxiliar + <b>gerúndio</b></td><td>“Estava-<b>me</b> esperando.” · “Estava esperando-<b>me</b>.”</td></tr>
<tr><td>Auxiliar + <b>particípio</b></td><td>pronome junto ao <b>auxiliar</b>: “Tinha-<b>se</b> ferido.” · com atrativa: “Não <b>se</b> tinha ferido.” <b>Nunca</b> depois do particípio: “<s>tinha ferido-se</s>”</td></tr></table>
<h3>6. Formas do pronome depois do verbo</h3>
${lista([par('Verbo terminado em <b>r, s, z</b>: o pronome vira <b>lo, la, los, las</b> e o verbo perde a letra. “respeitar + o” → “respeitá-<b>lo</b>”; “fiz + o” → “fi-<b>lo</b>”; “vamos + o” → “vamo-<b>lo</b>”.'), par('Verbo terminado em <b>som nasal</b> (am, em, ão, õe): o pronome vira <b>no, na, nos, nas</b>. “viram + o” → “viram-<b>no</b>”; “põe + a” → “põe-<b>na</b>”.'), par('“Nos” + verbo na 1ª do plural: o verbo perde o s. “Levantamos + nos” → “levantamo-<b>nos</b>”.')])}
${dica('Atrativas mais cobradas: “<b>NÃO, QUE, QUANDO, QUEM, ALGUÉM, NADA, SEMPRE, JÁ, SE, EMBORA</b>”. Viu uma delas logo antes do verbo? Próclise.')}
${peg('Advérbio seguido de <b>vírgula</b> perde a força atrativa. “<b>Ontem</b> me ligaram” (próclise) × “<b>Ontem</b>, ligaram-me” (ênclise).')}`,
    quiz: [
      C('Na frase “Ninguém o avisou sobre a interdição”, a próclise é obrigatória por causa do pronome indefinido.', 'Indefinidos atraem.'),
      E('A construção “Me entregaram a notificação ontem” está de acordo com a norma-padrão escrita.', 'Não se inicia frase com pronome átono.'),
      C('Em “Realizar-se-á a audiência amanhã”, a mesóclise está correta.', 'Futuro sem atrativa.'),
      E('A forma “Ele tinha ferido-se no acidente” está correta.', 'Nunca ênclise ao particípio.'),
      C('Em “Quando o viram, chamaram a polícia”, a próclise se justifica pela conjunção subordinativa.', '“Quando” atrai.'),
      E('A forma “Não realizará-se a operação” está de acordo com a norma-padrão.', 'Com atrativa: “Não se realizará”.'),
      C('Em “É preciso respeitá-lo”, o pronome assumiu a forma “lo” porque o infinitivo termina em “r”.', 'r, s, z → lo, la.'),
      E('Em “Ontem, me ligaram do posto”, a próclise é obrigatória por causa do advérbio.', 'A vírgula anula a atração.'),
    ],
  },
  {
    id: 'reescrita', titulo: 'Reescrita de frases e significação das palavras', arts: 'aula completa',
    chaves: ['reescrita de frases', 'reescrita', 'significacao das palavras', 'substituicao de palavras', 'semantica'],
    html: `
<h3>1. O que a banca avalia na reescrita</h3>
<p>Duas coisas, separadamente: a nova versão está <b>gramaticalmente correta</b>? E <b>mantém o sentido</b> original? Uma reescrita pode estar correta e ter mudado o sentido, ou manter o sentido com erro. O item só é certo quando as duas condições são verdadeiras.</p>
${cartoes([['✅', 'Correção', 'concordância, regência, crase, pontuação, colocação, flexão verbal', COR.verde], ['🎯', 'Sentido', 'mesma informação, mesmas relações lógicas, mesmo grau de certeza', COR.azul]])}
<h3>2. Voz ativa ↔ voz passiva</h3>
<p>O <b>objeto direto</b> da ativa vira <b>sujeito</b> da passiva; o sujeito da ativa vira <b>agente da passiva</b>; o verbo “ser” fica no <b>mesmo tempo</b> do verbo original.</p>
<table class="tab"><tr><th>Ativa</th><th>Passiva analítica</th><th>Passiva sintética</th></tr>
<tr><td>O agente <b>multou</b> o condutor.</td><td>O condutor <b>foi multado</b> pelo agente.</td><td>Multou-se o condutor.</td></tr>
<tr><td>O agente <b>multava</b> os condutores.</td><td>Os condutores <b>eram multados</b> pelo agente.</td><td>Multavam-se os condutores.</td></tr>
<tr><td>O agente <b>multará</b> os condutores.</td><td>Os condutores <b>serão multados</b>.</td><td>Multar-se-ão os condutores.</td></tr>
<tr><td>O agente <b>tinha multado</b> o condutor.</td><td>O condutor <b>tinha sido multado</b>.</td><td>—</td></tr>
<tr><td>O agente <b>vai multar</b> o condutor.</td><td>O condutor <b>vai ser multado</b>.</td><td>—</td></tr></table>
<p>Só verbos <b>transitivos diretos</b> vão para a passiva (exceções tradicionais: obedecer, desobedecer, responder, pagar e perdoar).</p>
<h3>3. Discurso direto ↔ indireto</h3>
<table class="tab"><tr><th>Direto</th><th>Indireto</th></tr>
<tr><td>presente: “Eu <b>estou</b> habilitado.”</td><td>imperfeito: Disse que <b>estava</b> habilitado.</td></tr>
<tr><td>pretérito perfeito: “Eu <b>parei</b>.”</td><td>mais-que-perfeito: Disse que <b>tinha parado</b> (parara).</td></tr>
<tr><td>futuro do presente: “Eu <b>pagarei</b>.”</td><td>futuro do pretérito: Disse que <b>pagaria</b>.</td></tr>
<tr><td>imperativo: “<b>Pare</b> o carro!”</td><td>subjuntivo: Mandou que ele <b>parasse</b> o carro.</td></tr>
<tr><td>eu, meu, nós</td><td>ele, seu, eles</td></tr>
<tr><td>este, aqui, hoje, amanhã, ontem</td><td>aquele, ali, naquele dia, no dia seguinte, na véspera</td></tr></table>
<h3>4. Reorganizações que costumam manter o sentido</h3>
${lista([par('Oração reduzida ↔ desenvolvida: “<b>Ao chegar</b>, o agente…” = “<b>Quando chegou</b>, o agente…”'), par('Nominalização: “<b>Fiscalizar</b> as rodovias é…” = “A <b>fiscalização</b> das rodovias é…”'), par('Conector de mesmo valor: porém → contudo; porque → visto que; embora → ainda que'), par('Deslocamento de adjunto adverbial, com ajuste de vírgula: “Ontem a PRF autuou 50” = “A PRF autuou 50 ontem”'), par('Coordenada ↔ subordinada de mesmo valor: “Estava cansado, mas trabalhou” = “Embora estivesse cansado, trabalhou”')])}
<h3>5. Mudanças que costumam alterar o sentido</h3>
${lista([par('', '“Só o agente viu” → “O agente só viu”', '“só” muda de alcance'), par('', '“um grande homem” → “um homem grande”', 'importante × alto'), par('', '“o agente” → “um agente”', 'definido × indefinido'), par('', 'retirar as vírgulas de uma oração adjetiva explicativa', 'vira restritiva'), par('', '“deve” → “pode”', 'obrigação × possibilidade'), par('', '“certamente” → “provavelmente”', 'certeza × probabilidade')])}
<h3>6. Significação das palavras</h3>
<table class="tab"><tr><th>Relação</th><th>O que é</th><th>Exemplo</th></tr>
<tr><td><b>Sinonímia</b></td><td>sentido semelhante no contexto</td><td>infringir / violar</td></tr>
<tr><td><b>Antonímia</b></td><td>sentido oposto</td><td>deferir / indeferir</td></tr>
<tr><td><b>Homonímia</b></td><td>mesma pronúncia ou grafia, sentidos diferentes</td><td>sessão / seção / cessão</td></tr>
<tr><td><b>Paronímia</b></td><td>parecidas na forma, sentidos diferentes</td><td>eminente / iminente</td></tr>
<tr><td><b>Polissemia</b></td><td>uma palavra com vários sentidos</td><td>“a <b>pena</b> do crime” × “a <b>pena</b> da ave”</td></tr>
<tr><td><b>Hiperonímia / hiponímia</b></td><td>termo geral / termo específico</td><td>veículo / caminhão</td></tr>
<tr><td><b>Denotação / conotação</b></td><td>sentido literal / figurado</td><td>“a notícia foi um <b>balde de água fria</b>”</td></tr></table>
<h3>7. Figuras de linguagem</h3>
${cartoes([['🌉', 'Metáfora', 'comparação implícita: “ele é uma rocha”', COR.azul], ['🔁', 'Metonímia', 'parte pelo todo, autor pela obra, marca pelo produto: “leu Machado”', COR.verde], ['🕊', 'Eufemismo', 'suaviza: “faltou com a verdade”', COR.roxo], ['😏', 'Ironia', 'diz o contrário do que pensa', COR.lar], ['📈', 'Hipérbole', 'exagero: “já disse mil vezes”', COR.verm], ['🎭', 'Prosopopeia', 'dá ações humanas a seres inanimados: “a cidade dorme”', COR.cinza], ['⚖️', 'Antítese', 'ideias opostas: “é tempo de chorar e de sorrir”', COR.amar], ['🌀', 'Pleonasmo', 'repetição enfática (vicioso quando inútil: “subir para cima”)', COR.azul]])}
${banca(`<ul><li>Cebraspe: “A substituição de X por Y <b>preservaria a correção e o sentido</b>”. Só é certo se as duas forem verdadeiras.</li><li>Atenção a mudanças sutis: “só” mudou de lugar, artigo definido virou indefinido, singular virou plural, “deve” virou “pode”.</li><li>Na passiva, confira se o <b>tempo verbal</b> do “ser” é o mesmo do verbo da ativa.</li></ul>`)}
${peg('A passiva de “O agente <b>autuava</b> os condutores” é “Os condutores <b>eram autuados</b>”, e não “<s>foram autuados</s>” (que mudaria o imperfeito para o perfeito).')}`,
    quiz: [
      C('A passagem de “O agente autuava os condutores” para a voz passiva resulta em “Os condutores eram autuados pelo agente”.', 'Mesmo tempo verbal.'),
      E('Ao transpor “Eu vou pagar a multa amanhã” para o discurso indireto, obtém-se corretamente “Ele disse que vai pagar a multa amanhã”.', 'Ele disse que iria pagar a multa no dia seguinte.'),
      C('Em “O caminhão tombou na curva; o veículo transportava grãos”, “veículo” retoma “caminhão” por hiperonímia.', 'Termo geral.'),
      E('A reescrita de “Só o agente viu o acidente” como “O agente só viu o acidente” mantém o sentido original.', 'O alcance de “só” muda.'),
      C('Em “Ao terminar a vistoria, o perito assinou o laudo”, a oração reduzida pode ser desenvolvida como “Quando terminou a vistoria”.', 'Reduzida temporal.'),
      E('Em “A cidade dorme tranquila”, há uma hipérbole.', 'É prosopopeia (personificação).'),
      C('A expressão “faltou com a verdade”, no lugar de “mentiu”, é um eufemismo.', 'Suaviza a ideia.'),
      E('Substituir “deve ser interditada” por “pode ser interditada” mantém o sentido do trecho.', 'Obrigação × possibilidade.'),
    ],
  },
  {
    id: 'redacao-oficial', titulo: 'Redação oficial', arts: 'Manual de Redação da Presidência da República, 3ª ed.',
    chaves: ['correspondencia oficial', 'redacao oficial', 'manual de redacao'],
    html: `
<h3>1. O que é redação oficial</h3>
<p>É a forma como o <b>Poder Público</b> redige atos normativos e comunicações. Quem “fala” é o <b>serviço público</b>, e não a pessoa do servidor. A referência é o <b>Manual de Redação da Presidência da República</b> (3ª edição, 2018), que também serve de modelo para Estados e Municípios.</p>
<h3>2. Atributos da redação oficial</h3>
${cartoes([['🔍', 'Clareza e precisão', 'entendida na primeira leitura, sem ambiguidade; palavras no sentido comum', COR.azul], ['🎯', 'Objetividade', 'vai direto ao ponto, sem rodeios', COR.verde], ['✂️', 'Concisão', 'máximo de informação com o mínimo de palavras, sem cortar o essencial', COR.lar], ['🔗', 'Coesão e coerência', 'texto bem amarrado e lógico', COR.roxo], ['🏛', 'Impessoalidade', 'sem impressões pessoais; foco no interesse público', COR.cinza], ['📏', 'Formalidade e padronização', 'linguagem formal e diagramação uniforme', COR.verm], ['📚', 'Norma-padrão', 'sem gírias, jargões, regionalismos ou estrangeirismos desnecessários', COR.amar]])}
${box('O que evitar', `${lista([par('“Informamos que o prazo termina em 30/11.”', '“Gostaríamos de, por meio deste, vir respeitosamente informar que…”', 'prolixidade'), par('“O pedido foi indeferido por falta de documentos.”', '“Infelizmente, achamos que o pedido não tem condições.”', 'pessoalidade'), par('“A reunião será às 14h.”', '“Galera, a reunião rola às 14h.”', 'informalidade')])}`)}
<h3>3. Pronomes de tratamento</h3>
<table class="tab"><tr><th>Pronome</th><th>Para quem</th><th>Vocativo</th></tr>
<tr><td><b>Vossa Excelência</b> (V. Exa.)</td><td>Presidente e Vice; ministros de Estado; senadores e deputados; ministros de tribunais superiores e conselheiros de tribunais de contas; juízes; governadores; prefeitos; presidentes de Câmaras Municipais; oficiais-generais; embaixadores</td><td>“Excelentíssimo Senhor Presidente da República,” (só para chefes de Poder) · demais: “Senhor + cargo,”</td></tr>
<tr><td><b>Vossa Senhoria</b> (V. Sa.)</td><td>demais autoridades e particulares</td><td>“Senhor + cargo,” ou “Senhor + nome,”</td></tr>
<tr><td><b>Vossa Magnificência</b></td><td>reitores de universidade</td><td>“Magnífico Reitor,”</td></tr>
<tr><td><b>Vossa Santidade</b></td><td>Papa</td><td>“Santíssimo Padre,”</td></tr></table>
${box('Concordância com os pronomes de tratamento', `${lista([par('“Vossa Excelência <b>está</b> convidado.”', '“Vossa Excelência <b>estais</b> convidado.”', 'verbo na 3ª pessoa'), par('“Vossa Senhoria e <b>sua</b> equipe…”', '“Vossa Senhoria e <b>vossa</b> equipe…”', 'possessivo de 3ª pessoa'), par('“Vossa Excelência está <b>cansado</b>” (para homem).', '', 'adjetivo concorda com o sexo da pessoa'), par('“<b>Vossa</b> Excelência” = falando <b>com</b> a autoridade. “<b>Sua</b> Excelência” = falando <b>sobre</b> ela.')])}`)}
<h3>4. O padrão ofício</h3>
<p>Na 3ª edição, <b>ofício, aviso e memorando</b> foram unificados: todos passaram a se chamar <b>ofício</b>, com a mesma diagramação. O <b>e-mail</b> é aceito como documento oficial quando há meio de confirmar autoria e recebimento.</p>
${passos([['Cabeçalho', 'brasão e nome do órgão'], ['Identificação', '“OFÍCIO Nº 123/2026/PRF” (tipo, número, ano, sigla do órgão)'], ['Local e data', '“Brasília, 3 de novembro de 2026.” (sem zero à esquerda no dia; mês em minúsculas)'], ['Endereçamento', 'vocativo de endereçamento, nome, cargo e endereço do destinatário'], ['Assunto', 'resumo do tema, em negrito'], ['Vocativo', '“Senhor Diretor,”'], ['Texto', 'introdução, desenvolvimento e conclusão; parágrafos numerados, exceto o primeiro e o fecho, quando houver mais de um'], ['Fecho', '“Respeitosamente,” ou “Atenciosamente,”'], ['Assinatura', 'nome e cargo do signatário']])}
<h3>5. Fechos</h3>
${cartoes([['🙇', 'Respeitosamente', 'para autoridades de hierarquia <b>superior</b>, inclusive o Presidente da República', COR.azul], ['🤝', 'Atenciosamente', 'para autoridades de <b>mesma</b> hierarquia, de hierarquia <b>inferior</b> e para particulares', COR.verde]])}
<p>Comunicações assinadas pelo <b>Presidente da República</b> não trazem identificação do signatário.</p>
<h3>6. O que caiu em desuso</h3>
<ul><li><b>Digníssimo (DD.)</b> e <b>Ilustríssimo (Ilmo.)</b>: abolidos. Basta “Senhor”.</li><li><b>Doutor</b>: não é pronome de tratamento, e sim título acadêmico. Só se usa para quem tem doutorado, ou por costume consolidado em certas profissões.</li><li>A distinção entre aviso (entre ministros), ofício e memorando (interno) deixou de existir.</li></ul>
${dica('Fecho: “<b>R</b>espeitosamente” para quem está <b>acima</b> (R de reverência); “<b>A</b>tenciosamente” para quem está <b>ao lado ou abaixo</b>.')}
${peg('Com “Vossa Excelência”, o verbo vai para a <b>3ª pessoa</b>: “Vossa Excelência <b>decidiu</b>”, e não “<s>decidistes</s>”. E o vocativo “Excelentíssimo Senhor” fica reservado aos <b>chefes de Poder</b>.')}`,
    quiz: [
      C('Segundo o Manual de Redação da Presidência, o fecho “Respeitosamente” é empregado para autoridades de hierarquia superior, inclusive o Presidente da República.', 'Para mesma hierarquia ou inferior: Atenciosamente.'),
      E('Na redação oficial, é correto escrever “Vossa Excelência e vossa equipe estão convidados”.', 'Use “sua equipe”.'),
      C('Na 3ª edição do Manual, aviso, ofício e memorando passaram a ser chamados apenas de ofício.', 'Padrão ofício unificado.'),
      E('O vocativo “Excelentíssimo Senhor” deve ser usado para todas as autoridades tratadas por Vossa Excelência.', 'É reservado aos chefes de Poder.'),
      C('A concisão consiste em transmitir o máximo de informações com o mínimo de palavras, sem prejuízo do sentido.', 'Atributo da redação oficial.'),
      E('O emprego de “Ilustríssimo Senhor” é recomendado pelo Manual para comunicações dirigidas a particulares.', 'Foi abolido; basta “Senhor”.'),
      C('Na data de um ofício, o dia do mês deve ser escrito sem zero à esquerda.', '“3 de novembro de 2026”.'),
      E('Ao se dirigir a um reitor de universidade, o pronome de tratamento adequado é Vossa Senhoria.', 'Vossa Magnificência.'),
    ],
  },
];
