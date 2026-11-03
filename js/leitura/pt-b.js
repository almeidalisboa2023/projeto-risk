// Português (aula completa) — parte B: coesão e tempos verbais, classes de palavras, sintaxe.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, banca, C, E } from './blocos.js';

const par = (ok, no, por) => `<li class="${ok ? '' : 'so-erro'}">${ok ? `✔ ${ok}` : ''}${ok && no ? '<br>' : ''}${no ? `✘ <s>${no}</s>` : ''}${por ? ` <small class="muted">— ${por}</small>` : ''}</li>`;
const lista = (itens) => `<ul class="lt-pares">${itens.join('')}</ul>`;

export const PT_B = [
  {
    id: 'coesao', titulo: 'Coesão textual, conectores e tempos e modos verbais', arts: 'aula completa',
    chaves: ['coesao textual', 'mecanismos de coesao', 'coesao', 'conectores', 'referenciacao', 'tempos e modos verbais'],
    html: `
<h3>1. Coesão e coerência</h3>
<p><b>Coesão</b> é a ligação <b>linguística</b> entre as partes do texto: os pronomes, sinônimos e conectores que “costuram” as frases. <b>Coerência</b> é a ligação de <b>sentido</b>: o texto faz sentido, não se contradiz. Um texto pode ter conectores e ser incoerente (“Choveu muito, portanto a pista ficou seca”).</p>
${cartoes([['🔗', 'Referenciação', 'retomar ou antecipar termos', COR.azul], ['➡️', 'Sequenciação', 'ligar ideias com conectores', COR.verde], ['⏳', 'Tempos e modos', 'situar ações no tempo e indicar certeza ou hipótese', COR.roxo]])}
<h3>2. Referenciação: os mecanismos</h3>
<table class="tab"><tr><th>Mecanismo</th><th>Como funciona</th><th>Exemplo</th></tr>
<tr><td><b>Anáfora</b></td><td>retoma algo já dito</td><td>“O condutor fugiu. <b>Ele</b> foi localizado depois.”</td></tr>
<tr><td><b>Catáfora</b></td><td>antecipa algo que virá</td><td>“O agente disse <b>isto</b>: a via está interditada.”</td></tr>
<tr><td><b>Pronomes</b></td><td>pessoais, demonstrativos, relativos, possessivos</td><td>“A PRF fez a operação; <b>seus</b> agentes…”</td></tr>
<tr><td><b>Sinônimo e hiperônimo</b></td><td>troca por palavra de sentido igual ou mais geral</td><td>“o caminhão… <b>o veículo</b>…”</td></tr>
<tr><td><b>Expressão nominal</b></td><td>retoma com avaliação</td><td>“O motorista ultrapassou na curva. <b>A manobra irresponsável</b>…”</td></tr>
<tr><td><b>Elipse</b></td><td>omissão de termo recuperável</td><td>“O motorista parou e [ele] desceu.”</td></tr>
<tr><td><b>Nominalização</b></td><td>verbo vira substantivo</td><td>“O carro <b>capotou</b>. O <b>capotamento</b>…”</td></tr></table>
${box('Este, esse, aquele', '<ul><li><b>Este</b>: perto de quem fala; no texto, anuncia o que <b>vai ser dito</b> (catáfora). “Digo <b>isto</b>: estude.”</li><li><b>Esse</b>: perto de quem ouve; no texto, retoma o que <b>já foi dito</b> (anáfora). “Estude. <b>Isso</b> é tudo.”</li><li>Em <b>retomada de dois termos</b>: <b>este</b> = o mais <b>próximo</b> (último citado); <b>aquele</b> = o mais <b>distante</b>. “Agentes e condutores conversaram: <b>estes</b> (os condutores) reclamaram, <b>aqueles</b> (os agentes) explicaram.”</li></ul>')}
<h3>3. Conectores: o sentido é o que importa</h3>
<table class="tab"><tr><th>Relação</th><th>Conectores</th><th>Exemplo</th></tr>
<tr><td><b>Adição</b></td><td>e, nem, também, além disso, não só… mas também</td><td>Não só multou, <b>mas também</b> removeu.</td></tr>
<tr><td><b>Oposição</b></td><td>mas, porém, contudo, todavia, entretanto, no entanto</td><td>Estava habilitado, <b>porém</b> sem o documento.</td></tr>
<tr><td><b>Concessão</b></td><td>embora, ainda que, mesmo que, apesar de, conquanto, posto que, se bem que</td><td><b>Embora</b> chovesse, a operação continuou.</td></tr>
<tr><td><b>Causa</b></td><td>porque, já que, visto que, uma vez que, como (no início)</td><td><b>Como</b> chovia, a pista ficou escorregadia.</td></tr>
<tr><td><b>Explicação</b></td><td>pois (antes do verbo), porque, que</td><td>Reduza, <b>pois</b> a pista está molhada.</td></tr>
<tr><td><b>Conclusão</b></td><td>portanto, logo, por isso, assim, por conseguinte, pois (depois do verbo)</td><td>Bebeu; <b>logo</b>, não pode dirigir.</td></tr>
<tr><td><b>Condição</b></td><td>se, caso, desde que, contanto que, a menos que, salvo se</td><td><b>Caso</b> haja vítima, chame o socorro.</td></tr>
<tr><td><b>Finalidade</b></td><td>para que, a fim de que, para</td><td>Sinalizou <b>para que</b> todos vissem.</td></tr>
<tr><td><b>Consequência</b></td><td>tão… que, tanto… que, de modo que, de forma que</td><td>Correu <b>tanto que</b> capotou.</td></tr>
<tr><td><b>Proporção</b></td><td>à medida que, à proporção que, quanto mais… mais</td><td><b>À medida que</b> a noite avançava, o fluxo caía.</td></tr>
<tr><td><b>Tempo</b></td><td>quando, enquanto, assim que, logo que, depois que, mal</td><td><b>Mal</b> chegou, foi abordado.</td></tr>
<tr><td><b>Conformidade</b></td><td>conforme, segundo, consoante, como (= conforme)</td><td>Agiu <b>conforme</b> o protocolo.</td></tr>
<tr><td><b>Comparação</b></td><td>como, assim como, tal qual, mais… (do) que</td><td>Dirigia <b>como</b> se estivesse sozinho.</td></tr></table>
<h3>4. Trocas de conectores (o que mais cai)</h3>
${lista([par('“porém” → “contudo”, “todavia”, “entretanto”, “no entanto”', '', 'mesmo valor de oposição: troca permitida'), par('', '“porém” → “portanto”', 'oposição virou conclusão: muda o sentido'), par('“Embora estivesse cansado, trabalhou” = “Estava cansado, mas trabalhou”', '', 'concessiva vira adversativa, com reorganização da frase'), par('', '“Embora estava cansado…”', '“embora” exige subjuntivo: estivesse'), par('“Visto que chovia” = “Como chovia” = “Porque chovia”', '', 'todas causais'), par('', '“À medida que” = “na medida em que”', 'a primeira é proporção; a segunda, causa')])}
<h3>5. Tempos e modos verbais</h3>
${cartoes([['✅', 'Indicativo', 'certeza: “O condutor <b>estava</b> alcoolizado.”', COR.azul], ['🤔', 'Subjuntivo', 'dúvida, hipótese, desejo: “Caso <b>esteja</b>…”, “Embora <b>estivesse</b>…”', COR.lar], ['👉', 'Imperativo', 'ordem, pedido, conselho: “<b>Apresente</b> a CNH.”', COR.verm]])}
<table class="tab"><tr><th>Tempo</th><th>Valor</th><th>Exemplo</th></tr>
<tr><td>Presente</td><td>fato atual, habitual ou verdade geral; também presente histórico (narra passado)</td><td>“A PRF <b>patrulha</b> as rodovias.”</td></tr>
<tr><td>Pretérito perfeito</td><td>ação concluída</td><td>“O agente <b>autuou</b> o condutor.”</td></tr>
<tr><td>Pretérito imperfeito</td><td>ação contínua ou habitual no passado; também cortesia</td><td>“<b>Dirigia</b> todos os dias.” “<b>Queria</b> pedir um favor.”</td></tr>
<tr><td>Mais-que-perfeito</td><td>passado anterior a outro passado</td><td>“Quando a polícia chegou, ele já <b>fugira</b> (tinha fugido).”</td></tr>
<tr><td>Futuro do presente</td><td>fato posterior; também ordem e dúvida</td><td>“<b>Será</b> instaurado inquérito.”</td></tr>
<tr><td>Futuro do pretérito</td><td>fato condicionado ou hipotético; informação não confirmada; cortesia</td><td>“O suspeito <b>teria</b> fugido.” “<b>Gostaria</b> de falar.”</td></tr></table>
${ex(`${lista([par('Se ele <b>tivesse</b> parado, não <b>teria</b> batido.', 'Se ele <b>teria</b> parado, não <b>tinha</b> batido.', 'hipótese no passado: subjuntivo + futuro do pretérito'), par('Quando eu <b>vir</b> o laudo, aviso.', 'Quando eu <b>ver</b> o laudo, aviso.', 'futuro do subjuntivo de “ver” é “vir”'), par('Se ele <b>vier</b> amanhã…', 'Se ele <b>vir</b> amanhã…', 'futuro do subjuntivo de “vir” é “vier”'), par('Se a polícia <b>intervier</b>…', 'Se a polícia <b>intervir</b>…', '“intervir” segue “vir”')])}`, 'Correlação verbal')}
${banca(`<ul><li>Troca de conector mantendo ou não o sentido.</li><li>A quem se refere um pronome (“o termo ‘ela’ retoma…”).</li><li>Efeito do futuro do pretérito em notícias: hipótese ou não comprometimento do autor.</li><li>Correlação: “se + imperfeito do subjuntivo” combina com futuro do pretérito.</li></ul>`)}
${dica('O “<b>pois</b>” muda conforme a posição: <b>antes</b> do verbo, explica (“Corra, <b>pois</b> está tarde”); <b>depois</b> do verbo, entre vírgulas, conclui (“Está tarde; corra, <b>pois</b>, agora”).')}
${peg('“<b>Na medida em que</b>” indica <b>causa</b>; “<b>à medida que</b>” indica <b>proporção</b>. E “<b>à medida em que</b>” não existe na norma-padrão.')}`,
    quiz: [
      C('Na frase “Embora a via estivesse interditada, muitos motoristas tentaram passar”, a conjunção “embora” introduz ideia de concessão.', 'Embora + subjuntivo = concessão.'),
      E('A substituição de “porém” por “portanto” em “O condutor estava habilitado, porém sem o documento” mantém o sentido.', 'Oposição × conclusão.'),
      C('Em notícias, o futuro do pretérito, como em “o suspeito teria fugido”, indica que a informação não é confirmada pelo autor.', 'Uso de distanciamento.'),
      E('A frase “Se o condutor teria parado, não haveria acidente” está correta.', 'O correto é “Se o condutor tivesse parado”.'),
      C('Em “Agentes e condutores discutiram: estes reclamavam; aqueles explicavam”, o pronome “estes” retoma “condutores”.', '“Este” retoma o termo mais próximo.'),
      E('As expressões “à medida que” e “na medida em que” são sinônimas e indicam proporção.', '“Na medida em que” indica causa.'),
      C('A forma “quando eu vir o laudo” está de acordo com a norma-padrão.', 'Futuro do subjuntivo do verbo ver.'),
      E('O conector “conquanto” expressa ideia de conclusão.', '“Conquanto” é concessivo, equivale a “embora”.'),
    ],
  },
  {
    id: 'classes', titulo: 'Classes de palavras (morfologia)', arts: 'aula completa',
    chaves: ['classes de palavras', 'classes gramaticais', 'morfologia'],
    html: `
<h3>1. O que é morfologia</h3>
<p>Morfologia estuda a palavra <b>isolada</b>: a que classe pertence e como se flexiona (gênero, número, pessoa, tempo). Mas, na prova, a classe é sempre definida pelo <b>uso na frase</b>: a mesma palavra pode ser substantivo numa frase e adjetivo em outra.</p>
${cartoes([['🏷', 'Substantivo', 'nomeia seres e conceitos', COR.azul], ['🎨', 'Adjetivo', 'caracteriza o substantivo', COR.verde], ['👉', 'Artigo', 'determina: o, a, um, uma', COR.cinza], ['🔢', 'Numeral', 'quantidade ou ordem', COR.lar], ['👤', 'Pronome', 'substitui ou acompanha o nome', COR.roxo], ['⚡', 'Verbo', 'ação, estado, fenômeno', COR.verm], ['📐', 'Advérbio', 'circunstância (modo, tempo, lugar, intensidade)', COR.amar], ['🔗', 'Preposição', 'liga termos: a, de, em, com, por, para, sem, sob', COR.azul], ['🧩', 'Conjunção', 'liga orações ou termos de mesma função', COR.verde], ['❗', 'Interjeição', 'emoção: ai!, ufa!, socorro!', COR.lar]])}
<p><b>Variáveis</b> (flexionam): substantivo, adjetivo, artigo, numeral, pronome e verbo. <b>Invariáveis</b>: advérbio, preposição, conjunção e interjeição.</p>
<h3>2. Substantivo e adjetivo</h3>
<ul><li><b>Substantivação</b>: qualquer palavra precedida de artigo vira substantivo. “O <b>não</b> do juiz”, “o <b>saber</b>”, “os <b>prós</b> e os <b>contras</b>”.</li><li>Substantivos <b>coletivos</b>: frota (veículos), comboio, cáfila, alcateia, cardume, junta (médicos), banca (examinadores).</li><li><b>Plural</b> dos compostos: substantivo + adjetivo, os dois variam (<b>guardas-noturnos</b>, <b>cartões-postais</b>); verbo + substantivo, só o segundo (<b>guarda-chuvas</b>, <b>para-brisas</b>); quando o segundo limita o primeiro, em regra só o primeiro varia (<b>salários-família</b>, <b>palavras-chave</b>).</li><li>Adjetivo composto: em regra, só o <b>último</b> elemento varia: médico-cirúrgicos, luso-brasileiras. Exceções: surdo-mudos (os dois); azul-marinho e azul-celeste (invariáveis).</li></ul>
<h3>3. Adjetivo × advérbio (a confusão mais cobrada)</h3>
${lista([par('“O carro <b>rápido</b> passou.” → adjetivo, caracteriza “carro”, varia: carros rápidos.'), par('“Os carros andam <b>rápido</b>.” → advérbio, modifica “andam”, invariável.', 'Os carros andam <b>rápidos</b>.', 'teste: troque por “rapidamente”'), par('“Ela estava <b>meio</b> cansada.” → advérbio (= um pouco), invariável.', 'Ela estava <b>meia</b> cansada.'), par('“Comeu <b>meia</b> pizza.” → numeral (= metade), varia.'), par('“Há <b>bastantes</b> provas.” → pronome ou adjetivo (= muitas), varia.'), par('“As provas são <b>bastante</b> difíceis.” → advérbio (= muito), invariável.'), par('“Falou <b>alto</b>.” → advérbio. “Prédio <b>alto</b>.” → adjetivo.')])}
<h3>4. Pronomes</h3>
<table class="tab"><tr><th>Tipo</th><th>Formas</th><th>Uso que cai</th></tr>
<tr><td><b>Pessoais retos</b></td><td>eu, tu, ele, nós, vós, eles</td><td>funcionam como sujeito: “Entre <b>mim</b> e <b>ti</b>” (depois de preposição, oblíquo tônico); “para <b>eu</b> fazer” (sujeito de infinitivo)</td></tr>
<tr><td><b>Oblíquos átonos</b></td><td>me, te, se, o, a, lhe, nos, vos, os, as, lhes</td><td>o/a = objeto direto; lhe = objeto indireto (“Entreguei-<b>lhe</b> o laudo”)</td></tr>
<tr><td><b>Oblíquos tônicos</b></td><td>mim, ti, si, ele, nós, conosco, comigo, consigo</td><td>sempre após preposição</td></tr>
<tr><td><b>Tratamento</b></td><td>você, senhor, Vossa Excelência, Vossa Senhoria</td><td>verbo na 3ª pessoa</td></tr>
<tr><td><b>Demonstrativos</b></td><td>este, esse, aquele, isto, isso, aquilo, o (= aquilo), tal, mesmo, próprio</td><td>“<b>O</b> que disse é verdade” (= aquilo)</td></tr>
<tr><td><b>Relativos</b></td><td>que, o qual, quem, cujo, onde, quanto</td><td>retomam antecedente e iniciam oração adjetiva</td></tr>
<tr><td><b>Indefinidos</b></td><td>algum, nenhum, todo, outro, qualquer, certo, vários</td><td>“<b>Algum</b> agente” (= um) × “agente <b>algum</b>” (= nenhum)</td></tr>
<tr><td><b>Possessivos</b></td><td>meu, teu, seu, nosso</td><td>“seu” pode gerar ambiguidade: prefira “dele/dela”</td></tr></table>
${box('Pronomes relativos: regras que caem', `${lista([par('“O condutor <b>cujo</b> veículo foi apreendido…”', '“O condutor <b>cujo o</b> veículo…”', '“cujo” indica posse e nunca leva artigo depois'), par('“O local <b>onde</b> ocorreu o acidente.”', '“O momento <b>onde</b> ele chegou.”', '“onde” só para lugar físico; para tempo, use “em que”'), par('“A lei <b>a que</b> me refiro.”', '“A lei <b>que</b> me refiro.”', 'a preposição do verbo vem antes do relativo'), par('“O agente <b>a quem</b> entreguei.”', '', '“quem” só para pessoas e sempre com preposição')])}`)}
<h3>5. Verbo: o essencial</h3>
<ul><li><b>Vozes</b>: ativa (“O agente <b>multou</b> o condutor”), passiva analítica (“O condutor <b>foi multado</b>”), passiva sintética com “se” (“<b>Multaram-se</b> os condutores”) e reflexiva (“O condutor <b>feriu-se</b>”).</li><li><b>Irregulares</b> que caem: <b>intervir</b> (como vir: interveio, intervieram, intervier); <b>manter, deter, reter, conter</b> (como ter: mantive, detiveram, se ele detiver); <b>ver</b> (quando eu vir, se nós virmos); <b>vir</b> (quando eu vier); <b>requerer</b> (eu requeiro, ele requereu); <b>reaver</b> (só nas formas com v: reouve, reaverá; não existe “reavejo”).</li><li><b>Formas nominais</b>: infinitivo (estudar), gerúndio (estudando) e particípio (estudado). Particípio duplo: “tinha <b>aceitado</b>” (ter/haver) × “foi <b>aceito</b>” (ser/estar).</li></ul>
<h3>6. As palavras camaleão: QUE e SE</h3>
<table class="tab"><tr><th>QUE</th><th>Exemplo</th><th>Teste</th></tr>
<tr><td>Pronome relativo</td><td>“A via <b>que</b> foi interditada.”</td><td>troque por “a qual”</td></tr>
<tr><td>Conjunção integrante</td><td>“Disse <b>que</b> viria.”</td><td>troque a oração por “isso”</td></tr>
<tr><td>Conjunção causal ou explicativa</td><td>“Corra, <b>que</b> está tarde.”</td><td>troque por “pois”</td></tr>
<tr><td>Conjunção consecutiva</td><td>“Correu tanto <b>que</b> cansou.”</td><td>vem após tanto, tão, tal</td></tr>
<tr><td>Partícula expletiva</td><td>“Eu é <b>que</b> sei.”</td><td>pode ser retirada</td></tr>
<tr><td>Advérbio de intensidade</td><td>“<b>Que</b> lindo!”</td><td>troque por “quão”</td></tr></table>
<table class="tab"><tr><th>SE</th><th>Exemplo</th><th>Teste</th></tr>
<tr><td>Partícula apassivadora</td><td>“Vendem-<b>se</b> carros.”</td><td>vira “carros são vendidos”: verbo concorda</td></tr>
<tr><td>Índice de indeterminação do sujeito</td><td>“Precisa-<b>se</b> de agentes.”</td><td>verbo com preposição ou intransitivo: fica no singular</td></tr>
<tr><td>Pronome reflexivo</td><td>“Feriu-<b>se</b> no acidente.”</td><td>= a si mesmo</td></tr>
<tr><td>Conjunção condicional</td><td>“<b>Se</b> chover, adie.”</td><td>= caso</td></tr>
<tr><td>Conjunção integrante</td><td>“Não sei <b>se</b> vem.”</td><td>introduz oração substantiva</td></tr>
<tr><td>Parte integrante do verbo</td><td>“Queixou-<b>se</b> do atendimento.”</td><td>verbo pronominal (queixar-se, arrepender-se)</td></tr></table>
${dica('Para o “que” relativo: troque por “<b>o qual / a qual</b>”. Para o “que” integrante: troque a oração inteira por “<b>isso</b>”.')}
${peg('“Mesmo”, “próprio”, “só” e “anexo” <b>variam</b> quando são adjetivos: “elas <b>mesmas</b>”, “eles <b>sós</b>”, “seguem <b>anexas</b> as fotos”. “A sós” é expressão fixa.')}`,
    quiz: [
      C('Em “Os veículos trafegavam rápido”, “rápido” é advérbio e, por isso, não se flexiona.', 'Modifica o verbo.'),
      E('Está correta a frase “O motorista cujo o carro foi apreendido compareceu”.', 'Não se usa artigo depois de “cujo”.'),
      C('Em “Precisa-se de agentes”, o “se” é índice de indeterminação do sujeito.', 'Verbo com preposição + se.'),
      E('Em “Vendem-se veículos apreendidos”, o “se” é índice de indeterminação do sujeito, e o verbo poderia ficar no singular.', 'É partícula apassivadora; o verbo concorda com “veículos”.'),
      C('A forma “se a polícia intervier” está de acordo com a norma-padrão.', '“Intervir” segue a conjugação de “vir”.'),
      E('Na frase “Foi o momento onde tudo mudou”, o pronome “onde” está corretamente empregado.', '“Onde” só para lugar; use “em que”.'),
      C('Em “As provas foram bastante difíceis”, “bastante” é advérbio e não varia.', 'Modifica o adjetivo.'),
      E('Em “Disse que viria”, o “que” é pronome relativo.', 'É conjunção integrante.'),
    ],
  },
  {
    id: 'sintaxe', titulo: 'Sintaxe: termos da oração, coordenação e subordinação', arts: 'aula completa',
    chaves: ['coordenacao e subordinacao', 'estrutura morfossintatica', 'termos da oracao', 'periodo composto', 'sintaxe'],
    html: `
<h3>1. Por que sintaxe é a base</h3>
<p>Sintaxe estuda a <b>função</b> das palavras na frase. É dela que dependem pontuação (não se separa sujeito de verbo), concordância (o verbo concorda com o sujeito), regência e crase (o verbo pede preposição?) e colocação pronominal. Quem entende sintaxe resolve todas essas.</p>
<h3>2. Termos essenciais: sujeito e predicado</h3>
<p><b>Sujeito</b> é o termo com o qual o verbo <b>concorda</b>. Teste: pergunte “<b>quem / o que</b> + verbo?”.</p>
<table class="tab"><tr><th>Tipo de sujeito</th><th>Exemplo</th></tr>
<tr><td>Simples</td><td>“<b>O agente</b> chegou.”</td></tr>
<tr><td>Composto</td><td>“<b>O agente e o perito</b> chegaram.”</td></tr>
<tr><td>Oculto (desinencial)</td><td>“[Nós] Chegamos cedo.”</td></tr>
<tr><td>Indeterminado</td><td>“<b>Roubaram</b> o carro.” (3ª do plural sem referente) · “Precisa-<b>se</b> de ajuda.”</td></tr>
<tr><td>Oração sem sujeito</td><td>“<b>Houve</b> acidentes.” (haver = existir) · “<b>Faz</b> dez anos.” · “<b>Choveu</b>.” · “<b>É</b> tarde.”</td></tr>
<tr><td>Sujeito posposto</td><td>“<b>Chegaram</b>, depois da meia-noite, <b>os reforços</b>.”</td></tr></table>
<p><b>Predicado</b>: <b>verbal</b> (núcleo é verbo de ação: “O agente <b>autuou</b>”), <b>nominal</b> (verbo de ligação + predicativo: “A via <b>estava interditada</b>”) ou <b>verbo-nominal</b> (ação + estado: “O condutor saiu <b>nervoso</b>”).</p>
<h3>3. Transitividade verbal</h3>
${cartoes([['⏹', 'Intransitivo', 'sentido completo: “O carro <b>capotou</b>.”', COR.cinza], ['🎯', 'Transitivo direto', 'complemento sem preposição: “Multou <b>o condutor</b>.”', COR.azul], ['🎯', 'Transitivo indireto', 'complemento com preposição: “Obedeceu <b>às regras</b>.”', COR.verde], ['🎯🎯', 'Direto e indireto', 'dois complementos: “Entregou <b>a CNH</b> <b>ao agente</b>.”', COR.roxo], ['🔗', 'De ligação', 'liga sujeito e predicativo: ser, estar, parecer, ficar, permanecer, continuar', COR.lar]])}
<h3>4. Termos integrantes e acessórios</h3>
<table class="tab"><tr><th>Termo</th><th>Função</th><th>Exemplo</th></tr>
<tr><td><b>Objeto direto</b></td><td>completa verbo sem preposição</td><td>“apreendeu <b>a arma</b>”</td></tr>
<tr><td><b>Objeto indireto</b></td><td>completa verbo com preposição</td><td>“necessita <b>de reforço</b>”</td></tr>
<tr><td><b>Complemento nominal</b></td><td>completa nome (substantivo, adjetivo, advérbio) com preposição</td><td>“respeito <b>às leis</b>”, “favorável <b>à medida</b>”</td></tr>
<tr><td><b>Agente da passiva</b></td><td>quem pratica a ação na voz passiva</td><td>“foi preso <b>pela PRF</b>”</td></tr>
<tr><td><b>Adjunto adnominal</b></td><td>caracteriza o substantivo</td><td>“<b>o</b> carro <b>azul</b> <b>do suspeito</b>”</td></tr>
<tr><td><b>Adjunto adverbial</b></td><td>circunstância</td><td>“<b>ontem</b>, <b>na BR-116</b>, <b>com rapidez</b>”</td></tr>
<tr><td><b>Aposto</b></td><td>explica ou resume outro termo</td><td>“Lucas, <b>policial rodoviário</b>, chegou.”</td></tr>
<tr><td><b>Vocativo</b></td><td>chamamento, isolado</td><td>“<b>Senhor</b>, encoste o veículo.”</td></tr></table>
${box('Complemento nominal × adjunto adnominal', '<p>Os dois podem vir com preposição depois de um substantivo. Pergunte se o termo é <b>paciente</b> ou <b>agente</b>:</p><ul><li>“A fiscalização <b>das rodovias</b>” → as rodovias <b>são fiscalizadas</b> (paciente) → <b>complemento nominal</b>.</li><li>“A fiscalização <b>da PRF</b>” → a PRF <b>fiscaliza</b> (agente) → <b>adjunto adnominal</b>.</li><li>Se o nome for <b>adjetivo ou advérbio</b> (“favorável <b>a</b>”, “longe <b>de</b>”), o termo é sempre complemento nominal.</li></ul>')}
<h3>5. Período composto por coordenação</h3>
<p>Orações <b>independentes</b> sintaticamente: cada uma tem sentido próprio. Podem vir sem conjunção (<b>assindéticas</b>: “Chegou, viu, autuou”) ou com conjunção (<b>sindéticas</b>).</p>
<table class="tab"><tr><th>Sindética</th><th>Conjunções</th></tr>
<tr><td>Aditiva</td><td>e, nem, mas também, como também</td></tr>
<tr><td>Adversativa</td><td>mas, porém, contudo, todavia, entretanto, no entanto</td></tr>
<tr><td>Alternativa</td><td>ou… ou, ora… ora, quer… quer, seja… seja</td></tr>
<tr><td>Conclusiva</td><td>logo, portanto, por isso, assim, pois (posposto)</td></tr>
<tr><td>Explicativa</td><td>pois (anteposto), porque, que</td></tr></table>
<h3>6. Período composto por subordinação</h3>
<p>Uma oração <b>exerce uma função</b> dentro da outra (a principal).</p>
${cartoes([['🔤', 'Substantivas', 'funcionam como substantivo: sujeito, objeto, complemento nominal, predicativo, aposto. “É necessário <b>que todos usem cinto</b>.” (subjetiva)', COR.azul], ['🎨', 'Adjetivas', 'funcionam como adjetivo, iniciadas por pronome relativo. “O carro <b>que foi apreendido</b> era roubado.”', COR.verde], ['🕐', 'Adverbiais', 'funcionam como advérbio: causa, condição, concessão, tempo, finalidade, consequência, comparação, conformidade, proporção', COR.lar]])}
<h3>7. Adjetiva restritiva × explicativa (campeã)</h3>
${lista([par('<b>Restritiva</b>, sem vírgulas: “Os condutores <b>que estavam embriagados</b> foram presos.” → só os embriagados foram presos.'), par('<b>Explicativa</b>, entre vírgulas: “Os condutores, <b>que estavam embriagados</b>, foram presos.” → todos estavam embriagados e todos foram presos.')])}
<p>Retirar ou colocar as vírgulas de uma oração adjetiva <b>mantém a correção</b>, mas <b>altera o sentido</b>. Esse é um dos itens mais frequentes do Cebraspe.</p>
<h3>8. Orações reduzidas</h3>
<p>Não têm conjunção nem pronome relativo, e o verbo está no <b>infinitivo, gerúndio ou particípio</b>. Podem ser desenvolvidas:</p>
${lista([par('“<b>Ao chegar</b>, o agente…” = “<b>Quando chegou</b>, o agente…” (temporal)'), par('“<b>Terminada</b> a operação, todos saíram.” = “<b>Depois que terminou</b> a operação…”'), par('“<b>Sendo</b> menor, não pode dirigir.” = “<b>Como é</b> menor…” (causal)')])}
${dica('Oração sem sujeito com “haver” (= existir) e “fazer” (tempo decorrido): verbo <b>sempre no singular</b>, também nas locuções. “<b>Houve</b> muitos acidentes.” “<b>Deve haver</b> vagas.” “<b>Faz</b> dez anos.”')}
${peg('Em “Roubaram o carro”, o sujeito é <b>indeterminado</b>, e não oculto. Oculto é quando dá para identificar pela desinência ou pelo contexto (“Chegamos” = nós).')}`,
    quiz: [
      C('Em “Os motoristas, que estavam sem cinto, foram autuados”, a oração entre vírgulas é adjetiva explicativa e indica que todos os motoristas estavam sem cinto.', 'Explicativa generaliza.'),
      E('Em “Houve muitos acidentes no feriado”, “muitos acidentes” é o sujeito de “haver”.', 'Haver = existir é impessoal; o termo é objeto direto.'),
      C('Em “a fiscalização das rodovias”, “das rodovias” é complemento nominal, pois tem valor paciente.', 'As rodovias são fiscalizadas.'),
      E('Em “Roubaram o veículo durante a madrugada”, o sujeito é oculto.', 'É indeterminado.'),
      C('Na oração “O condutor saiu nervoso”, o predicado é verbo-nominal.', 'Ação (saiu) + estado (nervoso).'),
      E('A retirada das vírgulas de uma oração adjetiva explicativa sempre prejudica a correção gramatical do período.', 'Mantém a correção, mas muda o sentido.'),
      C('Em “É necessário que todos usem cinto”, a oração “que todos usem cinto” exerce a função de sujeito.', 'Oração subordinada substantiva subjetiva.'),
      E('Em “Senhor, encoste o veículo”, o termo “Senhor” é o sujeito da oração.', 'É vocativo; o sujeito (você) está oculto.'),
    ],
  },
];
