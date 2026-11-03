// Português (aula completa) — parte A: interpretação, tipologia, ortografia e acentuação.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, banca, C, E } from './blocos.js';

const par = (ok, no, por) => `<li class="${ok ? '' : 'so-erro'}">${ok ? `✔ ${ok}` : ''}${ok && no ? '<br>' : ''}${no ? `✘ <s>${no}</s>` : ''}${por ? ` <small class="muted">— ${por}</small>` : ''}</li>`;
const lista = (itens) => `<ul class="lt-pares">${itens.join('')}</ul>`;

export const PT_A = [
  {
    id: 'interpretacao', titulo: 'Compreensão e interpretação de textos', arts: 'aula completa',
    chaves: ['interpretacao de texto', 'compreensao e interpretacao', 'compreensao de texto', 'interpretacao'],
    html: `
<h3>1. Por que este é o tópico mais importante da prova</h3>
<p>Nas bancas grandes (Cebraspe, FGV, Vunesp, FCC, Consulplan), entre <b>40% e 60%</b> das questões de Português dependem de leitura atenta. Mesmo quando a questão é de gramática (“a vírgula pode ser retirada?”, “o termo ‘ela’ retoma…?”), o enunciado quase sempre está dentro de um texto. Quem domina a técnica de leitura ganha pontos em <b>todas</b> as outras partes da prova.</p>
<p>Interpretar não é “achar” o que o autor quis dizer. É provar, com o próprio texto, que uma afirmação é ou não autorizada por ele. A pergunta-chave é sempre a mesma: <b>“onde, no texto, está escrito ou implicado isso?”</b>.</p>
<h3>2. Os três níveis de leitura</h3>
${cartoes([['👁', 'Compreensão (literal)', 'localizar o que está <b>escrito</b>, mesmo com outras palavras', COR.azul], ['🧠', 'Interpretação (inferência)', 'concluir o que <b>não está escrito</b>, mas decorre logicamente do texto', COR.roxo], ['🚫', 'Extrapolação', 'ir <b>além</b> do texto, usando opinião ou conhecimento externo: sempre errado', COR.verm]])}
<p><b>Comandos de compreensão</b>: “segundo o texto”, “de acordo com o autor”, “o texto afirma”, “conforme o 2º parágrafo”. A resposta é uma <b>paráfrase</b> (o mesmo conteúdo com outras palavras).</p>
<p><b>Comandos de interpretação</b>: “infere-se”, “depreende-se”, “conclui-se”, “o texto permite concluir”, “subentende-se”. A resposta é uma <b>consequência necessária</b> do que está escrito.</p>
${ex(`<p><i>Texto:</i> “Desde que a fiscalização eletrônica foi instalada no trecho, o número de mortes caiu pela metade.”</p>
${lista([par('<b>Compreensão</b>: o número de mortes diminuiu após a instalação da fiscalização.'), par('<b>Inferência válida</b>: antes da fiscalização, o número de mortes era maior.'), par('<b>Inferência válida</b>: houve, em algum momento, ao menos uma morte no trecho.'), par('', '<b>Extrapolação</b>: a fiscalização eletrônica é a melhor política de segurança viária.', 'o texto não compara políticas'), par('', '<b>Extrapolação</b>: as mortes caíram por causa da fiscalização.', 'o texto mostra relação temporal (“desde que”), não afirma causa com certeza; atenção ao que a banca considera')])}`, 'Exemplo comentado')}
<h3>3. Os erros que a banca planta nas alternativas</h3>
<table class="tab"><tr><th>Erro</th><th>Como aparece</th><th>Exemplo</th></tr>
<tr><td><b>Extrapolação</b></td><td>acrescenta uma ideia que o texto não autoriza</td><td>o texto fala de “acidentes em rodovias” e o item fala de “acidentes em todo o país”</td></tr>
<tr><td><b>Redução</b></td><td>pega um detalhe e o apresenta como ideia central</td><td>o texto fala de educação no trânsito e cita multas uma vez; o item diz que “o tema central são as multas”</td></tr>
<tr><td><b>Contradição</b></td><td>afirma o oposto do texto</td><td>o texto diz que algo “ainda não foi resolvido”; o item diz que “foi solucionado”</td></tr>
<tr><td><b>Troca de relação lógica</b></td><td>transforma causa em consequência, condição em certeza, hipótese em fato</td><td>“se houver verba, haverá obras” vira “haverá obras”</td></tr>
<tr><td><b>Generalização</b></td><td>troca “alguns, muitos” por “todos, sempre”</td><td>“muitos condutores” vira “os condutores”</td></tr></table>
<h3>4. Técnica de leitura em 5 passos</h3>
${passos([['Leia o comando antes do texto', 'saber o que procurar evita reler tudo e direciona a atenção'], ['Faça uma leitura geral, sem parar', 'identifique o tema, o tipo de texto e a posição do autor'], ['Releia marcando', 'a tese, os conectores (mas, portanto, embora), os exemplos e as palavras de intensidade'], ['Volte ao trecho citado na questão', 'nunca responda “de memória”; leia a frase anterior e a posterior'], ['Compare palavra por palavra', 'o item é fiel ao texto? Acrescentou, retirou ou trocou algo?']])}
<h3>5. Palavras que mudam o sentido de um item</h3>
<p>As bancas usam pequenas palavras para tornar um item errado. Treine o olho para elas:</p>
${cartoes([['🔒', 'Absolutas', 'sempre, nunca, todos, nenhum, somente, apenas, exclusivamente, único, necessariamente', COR.verm], ['🔓', 'Relativizadoras', 'pode, em geral, tende a, alguns, muitos, frequentemente, possivelmente', COR.verde], ['🔀', 'De relação', 'porque, portanto, embora, se, desde que, à medida que', COR.azul]])}
${ex(`<p><i>Texto:</i> “A maioria dos acidentes graves envolve excesso de velocidade.”</p>${lista([par('Muitos acidentes graves envolvem excesso de velocidade.', '', 'fiel: “maioria” autoriza “muitos”'), par('', 'Todos os acidentes graves envolvem excesso de velocidade.', 'generalização'), par('', 'O excesso de velocidade é a única causa de acidentes graves.', 'o texto não fala em causa única')])}`)}
<h3>6. Tese, argumentos e vozes do texto</h3>
<ul><li><b>Tese</b>: a opinião central que o autor defende. Costuma estar na introdução e ser retomada na conclusão, muitas vezes depois de “portanto”, “assim”, “em suma”.</li><li><b>Argumentos</b>: sustentam a tese. Tipos: dados e estatísticas, exemplos, autoridade (citação de especialista), causa e consequência, comparação, contra-argumentação.</li><li><b>Vozes</b>: o texto pode trazer opiniões de outras pessoas. “Há quem diga que…”, “segundo críticos…”, “para alguns…”. Essa opinião <b>não</b> é necessariamente a do autor, que muitas vezes a cita para refutá-la logo depois, com “mas”, “contudo”, “no entanto”.</li></ul>
${ex(`<p><i>Texto:</i> “Há quem defenda que radares servem apenas para arrecadar. <b>Contudo</b>, os dados mostram queda de 40% nos acidentes onde foram instalados.”</p>${lista([par('O autor discorda de que radares sirvam apenas para arrecadar.'), par('', 'O autor defende que os radares têm finalidade arrecadatória.', 'essa é a voz que ele refuta')])}`, 'Exemplo comentado')}
<h3>7. Sentido de palavras e expressões no contexto</h3>
<p>A banca não pergunta o sentido de dicionário, e sim o sentido <b>naquele texto</b>. Faça o teste da substituição: troque a palavra pela opção e veja se a frase mantém o <b>sentido</b> e a <b>correção</b>.</p>
${lista([par('“A medida <b>esbarrou</b> na falta de recursos” = encontrou obstáculo.'), par('“O projeto <b>ganhou corpo</b>” = tomou forma, cresceu.'), par('“O tema voltou à <b>pauta</b>” = à discussão, à agenda.'), par('“Uma <b>avalanche</b> de processos” = grande quantidade (sentido figurado).')])}
<h3>8. Recursos de linguagem e seus efeitos</h3>
<table class="tab"><tr><th>Recurso</th><th>Efeito mais comum</th></tr>
<tr><td>Aspas</td><td>citação, ironia, destaque, termo estrangeiro ou de uso especial</td></tr>
<tr><td>Pergunta retórica</td><td>provocar reflexão; não espera resposta</td></tr>
<tr><td>Futuro do pretérito (“teria”, “seria”)</td><td>hipótese, informação não confirmada</td></tr>
<tr><td>Primeira pessoa do plural (“precisamos”)</td><td>aproximar o leitor, incluí-lo no problema</td></tr>
<tr><td>Dados numéricos</td><td>dar credibilidade, objetividade</td></tr>
<tr><td>Ironia</td><td>dizer o contrário do que se pensa, para criticar</td></tr></table>
${banca(`<ul><li><b>Cebraspe</b>: item com paráfrase quase idêntica ao texto, mas com <b>uma palavra trocada</b> (causa virou consequência; “alguns” virou “todos”).</li><li><b>FGV</b>: pergunta a <b>intenção</b> do autor, o efeito de um recurso (ironia, aspas, pergunta) e a função de um parágrafo no texto.</li><li><b>Vunesp, FCC e Consulplan</b>: “de acordo com o texto…”, troca de palavras sem alterar o sentido e identificação da ideia principal.</li></ul>`)}
${dica('Na dúvida entre duas alternativas, escolha a mais <b>fiel</b> ao texto, mesmo que pareça “óbvia demais”. Interpretação de concurso premia fidelidade, não criatividade.')}
${peg('Seu conhecimento de mundo <b>não</b> conta. Se o texto afirma algo que você sabe ser falso, responda conforme o <b>texto</b>, a menos que a questão peça sua opinião (o que quase nunca ocorre).')}`,
    quiz: [
      C('Em questões de interpretação, uma afirmativa que generaliza com “todos” uma ideia que o texto atribui a “muitos” deve ser julgada errada.', 'É generalização: o texto relativiza e o item absolutiza.'),
      E('Quando o autor apresenta uma opinião iniciada por “há quem defenda que” e, em seguida, usa “contudo”, a opinião apresentada antes do conector é a tese do autor.', 'O “contudo” marca oposição: a tese do autor costuma vir depois dele.'),
      C('Inferir é concluir algo que não está escrito no texto, mas que decorre logicamente do que está escrito.', 'É a diferença entre interpretação e compreensão.'),
      E('Na frase “O suspeito teria fugido pela BR”, o autor afirma com certeza que o suspeito fugiu.', 'O futuro do pretérito indica hipótese ou informação não confirmada.'),
      C('Se o texto afirma que “a maioria dos acidentes graves envolve excesso de velocidade”, é correto afirmar que muitos acidentes graves envolvem excesso de velocidade.', '“Maioria” autoriza “muitos”.'),
      E('A pergunta retórica, em textos argumentativos, tem como objetivo principal obter uma resposta do leitor.', 'Ela provoca reflexão e não espera resposta.'),
      C('Afirmar que o tema central de um texto é um detalhe mencionado uma única vez configura erro de redução.', 'Redução é tomar a parte pelo todo.'),
      E('O conhecimento prévio do candidato deve prevalecer sobre o que o texto afirma quando houver conflito entre ambos.', 'Em interpretação, vale o texto.'),
    ],
  },
  {
    id: 'tipologia', titulo: 'Tipos e gêneros textuais', arts: 'aula completa',
    chaves: ['tipos e generos', 'tipologia textual', 'generos textuais', 'tipos textuais', 'reconhecimento de tipos'],
    html: `
<h3>1. Tipo e gênero não são a mesma coisa</h3>
<p><b>Tipo textual</b> é o <b>modo de organizar</b> as frases de um texto, com marcas linguísticas próprias (tempos verbais, conectores, adjetivos). São poucos: narrativo, descritivo, dissertativo (expositivo ou argumentativo) e injuntivo. Algumas bancas acrescentam o <b>dialogal</b> (conversação).</p>
<p><b>Gênero textual</b> é o texto “de verdade” que circula na sociedade, com finalidade, suporte e público próprios: notícia, reportagem, crônica, editorial, artigo de opinião, receita, bula, manual, edital, ofício, boletim de ocorrência, e-mail. São <b>praticamente infinitos</b> e mudam com o tempo (post, meme, podcast).</p>
${box('Regra de ouro', '<p>Um gênero quase sempre <b>mistura</b> tipos, mas tem um tipo <b>predominante</b>. Uma notícia é predominantemente <b>narrativa</b>, mas pode ter trechos descritivos (“o carro, um sedã prata, …”) e expositivos (dados). Quando a banca pergunta “o tipo predominante”, olhe a <b>função global</b> do texto.</p>')}
<h3>2. Os tipos, um por um</h3>
<h4>📖 Narrativo</h4>
<p>Conta <b>fatos</b> que se sucedem no tempo, com personagens, espaço e narrador. Marcas: verbos de <b>ação</b> no pretérito perfeito e imperfeito, marcadores temporais (“depois”, “naquela noite”, “dias mais tarde”), progressão temporal. Elementos: enredo (situação inicial, conflito, clímax, desfecho), narrador (1ª pessoa: personagem; 3ª pessoa: observador ou onisciente).</p>
<h4>🖼 Descritivo</h4>
<p>Apresenta as <b>características</b> de um ser, objeto, lugar ou pessoa, como um retrato. Marcas: <b>adjetivos</b> e locuções adjetivas, verbos de <b>ligação</b> e de estado (ser, estar, parecer), enumerações, ausência de progressão temporal (o tempo “para”).</p>
<h4>📘 Dissertativo-expositivo</h4>
<p>Explica um assunto, transmitindo informações de forma <b>objetiva e neutra</b>, sem defender posição. Marcas: definições, exemplos, dados, linguagem impessoal, presente do indicativo. Gêneros: verbete, artigo de divulgação científica, aula, relatório.</p>
<h4>💬 Dissertativo-argumentativo</h4>
<p>Defende uma <b>tese</b> com argumentos para convencer o leitor. Marcas: conectores lógicos (porque, portanto, porém, além disso), modalizadores (“é necessário”, “certamente”), contra-argumentação. Gêneros: artigo de opinião, editorial, carta argumentativa, redação de concurso.</p>
<h4>📋 Injuntivo (instrucional)</h4>
<p>Orienta o leitor a <b>fazer</b> algo. Marcas: verbos no <b>imperativo</b> (“mantenha”, “reduza”) ou no <b>infinitivo</b> com valor de ordem (“manter distância”), sequência de passos, linguagem direta. Gêneros: manual, receita, bula, regulamento, placa educativa, edital (nas partes de instrução).</p>
<table class="tab"><tr><th>Tipo</th><th>Pergunta que responde</th><th>Verbo típico</th><th>Gêneros</th></tr>
<tr><td>Narrativo</td><td>O que aconteceu?</td><td>pretérito, ação</td><td>conto, crônica, notícia, B.O.</td></tr>
<tr><td>Descritivo</td><td>Como é?</td><td>ligação, estado</td><td>laudo, classificado, retrato</td></tr>
<tr><td>Expositivo</td><td>O que é? Como funciona?</td><td>presente, impessoal</td><td>verbete, aula, artigo científico</td></tr>
<tr><td>Argumentativo</td><td>O que o autor defende?</td><td>presente, modalizadores</td><td>editorial, artigo de opinião</td></tr>
<tr><td>Injuntivo</td><td>O que devo fazer?</td><td>imperativo, infinitivo</td><td>manual, receita, bula</td></tr></table>
${ex(`<ul><li>“<b>Mantenha</b> distância segura do veículo da frente. <b>Reduza</b> a velocidade em dias de chuva.” → <b>injuntivo</b>, gênero campanha educativa.</li><li>“O condutor <b>perdeu</b> o controle, <b>atravessou</b> o canteiro e <b>colidiu</b> com a mureta.” → <b>narrativo</b>.</li><li>“A viatura era branca, com faixas azuis e amarelas, giroflex no teto e o brasão da corporação na porta.” → <b>descritivo</b>.</li><li>“O etilômetro é um aparelho que mede a concentração de álcool no ar expirado.” → <b>expositivo</b>.</li><li>“O excesso de velocidade mata, <b>pois</b> reduz o tempo de reação; <b>portanto</b>, a fiscalização é indispensável.” → <b>argumentativo</b>.</li></ul>`, 'Identifique o tipo')}
<h3>3. Gêneros que mais caem</h3>
${cartoes([['📰', 'Notícia', 'relata fato recente, objetiva, 3ª pessoa, título + lide (o quê, quem, quando, onde, como, por quê)', COR.azul], ['🔎', 'Reportagem', 'aprofunda um tema, com entrevistas e dados; mais extensa que a notícia', COR.verde], ['✍️', 'Crônica', 'fato do cotidiano com olhar pessoal, linguagem leve, muitas vezes humor ou reflexão', COR.lar], ['🗞', 'Editorial', 'opinião do <b>veículo</b> de comunicação, sem assinatura individual', COR.verm], ['🖋', 'Artigo de opinião', 'opinião de um <b>autor</b> identificado', COR.roxo], ['📨', 'Ofício e e-mail oficial', 'comunicação da Administração (redação oficial)', COR.cinza]])}
${banca(`<ul><li>“O texto é predominantemente…” → identifique a função global.</li><li>“O trecho X tem caráter descritivo” → veja se há adjetivos e ausência de progressão temporal.</li><li>Confusões clássicas: <b>expositivo × argumentativo</b> (explicar × defender) e <b>notícia × reportagem</b> (relatar × aprofundar).</li><li>“O texto pertence ao gênero…” → olhe a finalidade, o suporte e o público.</li></ul>`)}
${dica('Pergunte: o texto quer que eu <b>saiba</b> (expositivo), <b>concorde</b> (argumentativo), <b>faça</b> (injuntivo), <b>veja</b> (descritivo) ou <b>acompanhe</b> uma história (narrativo)?')}
${peg('Ter números não torna o texto expositivo. Se os dados servem para <b>defender uma posição</b>, o texto é <b>argumentativo</b>. E o editorial não é assinado: expressa a opinião do jornal.')}`,
    quiz: [
      C('Textos que orientam o leitor a realizar uma ação, como manuais e receitas, pertencem ao tipo injuntivo, marcado pelo uso de verbos no imperativo ou no infinitivo.', 'Característica central do tipo injuntivo.'),
      E('Gênero e tipo textual são sinônimos, pois ambos se referem à estrutura linguística predominante no texto.', 'Tipo é o modo de organização; gênero é o texto concreto com função social.'),
      C('Um texto que apresenta dados estatísticos para sustentar a necessidade de mais fiscalização é predominantemente argumentativo.', 'Os dados funcionam como argumento.'),
      E('No tipo descritivo, predominam verbos de ação no pretérito perfeito e marcadores de progressão temporal.', 'Essas são marcas do tipo narrativo.'),
      C('O editorial expressa a opinião do próprio veículo de comunicação e, em regra, não é assinado.', 'O artigo de opinião é que é assinado por um autor.'),
      E('A reportagem e a notícia diferem apenas pelo tamanho do título.', 'A reportagem aprofunda o tema, com dados e entrevistas.'),
      C('Uma notícia pode conter trechos descritivos sem deixar de ser predominantemente narrativa.', 'Gêneros mesclam tipos.'),
      E('O texto expositivo tem como objetivo principal convencer o leitor de uma tese.', 'Expõe e explica; quem convence é o argumentativo.'),
    ],
  },
  {
    id: 'ortografia', titulo: 'Ortografia oficial, acentuação e hífen', arts: 'Acordo Ortográfico (Decreto 6.583/2008)',
    chaves: ['ortografia', 'acentuacao grafica', 'acentuacao', 'hifen', 'dominio da ortografia'],
    html: `
<h3>1. O que cai</h3>
<p>Três frentes: <b>grafia</b> (s, z, ç, ss, x, ch, g, j), <b>acentuação</b> e <b>hífen</b>, além dos <b>parônimos</b> e <b>homônimos</b> (mandado/mandato). As regras abaixo são as do Acordo Ortográfico em vigor.</p>
<h3>2. Sílaba tônica: o primeiro passo da acentuação</h3>
${cartoes([['🔚', 'Oxítona', 'tônica na última: ca-<b>fé</b>, ra-<b>paz</b>', COR.azul], ['➖', 'Paroxítona', 'tônica na penúltima: <b>me</b>-sa, <b>fá</b>-cil', COR.verde], ['🔝', 'Proparoxítona', 'tônica na antepenúltima: <b>lâm</b>-pa-da', COR.verm]])}
<h3>3. As regras de acentuação</h3>
<table class="tab"><tr><th>Grupo</th><th>Quando acentua</th><th>Exemplos</th></tr>
<tr><td><b>Proparoxítonas</b></td><td><b>todas</b></td><td>lâmpada, rápido, público, médico, trânsito</td></tr>
<tr><td><b>Oxítonas</b></td><td>terminadas em <b>a(s), e(s), o(s), em, ens</b></td><td>sofá, café, cipó, também, parabéns, você</td></tr>
<tr><td><b>Paroxítonas</b></td><td>terminadas em <b>l, n, r, x, ps, ã(s), ão(s), i(s), us, um, uns, om, ons, ditongo</b> (ou seja, as que <b>não</b> terminam em a, e, o, em, ens)</td><td>fácil, hífen, caráter, tórax, bíceps, órfã, órgão, táxi, vírus, álbum, história, jóquei</td></tr>
<tr><td><b>Monossílabos tônicos</b></td><td>terminados em a(s), e(s), o(s)</td><td>pá, pé, pó, mês, nós, três</td></tr>
<tr><td><b>Hiatos i e u</b></td><td>tônicos, sozinhos na sílaba ou com s</td><td>sa-í-da, sa-ú-de, ba-ú, pa-ís, ju-í-zes</td></tr></table>
${box('Exceções dos hiatos', '<ul><li>Não se acentua se o i ou u for seguido de <b>nh</b>: ra-i-nha, mo-i-nho.</li><li>Não se acentua se vier depois de <b>ditongo</b> em paroxítona: fei-u-ra, bai-u-ca.</li><li>Não se acentua se estiver repetido: xi-i-ta.</li><li>Não se acentua se formar sílaba com letra que não seja s: ra-iz (mas ra-í-zes), ju-iz (mas ju-í-zes).</li></ul>')}
<h3>4. O que o Acordo mudou</h3>
<ul><li><b>Ditongos abertos éi e ói</b> em <b>paroxítonas</b> perderam o acento: ideia, assembleia, plateia, jiboia, heroico, paranoico. Nas <b>oxítonas</b> e monossílabos, continuam: papéis, herói, anéis, dói, céu.</li><li><b>Hiato “oo” e “ee”</b> perdeu o acento: voo, enjoo, leem, creem, veem, deem.</li><li><b>Trema</b> desapareceu (salvo em nomes estrangeiros): linguiça, frequente, tranquilo, cinquenta.</li><li>Acentos <b>diferenciais</b> que caíram: para (verbo) / para (preposição); pelo, pela, polo, pera.</li></ul>
<h3>5. Acentos diferenciais que continuam</h3>
${lista([par('<b>pôde</b> (passado) × pode (presente)'), par('<b>pôr</b> (verbo) × por (preposição)'), par('ele <b>tem</b> / eles <b>têm</b> · ele <b>vem</b> / eles <b>vêm</b>'), par('ele <b>mantém</b> / eles <b>mantêm</b> · ele <b>detém</b> / eles <b>detêm</b> (derivados de ter e vir: acento agudo no singular, circunflexo no plural)'), par('<b>fôrma</b> (molde) × forma: acento <b>facultativo</b>')])}
<h3>6. Grafia: as regras que resolvem a maioria das dúvidas</h3>
<table class="tab"><tr><th>Regra</th><th>Exemplos</th></tr>
<tr><td>Sufixo <b>-ês / -esa</b> (origem, título nobre) com <b>S</b></td><td>português, francesa, marquês, princesa, camponesa</td></tr>
<tr><td>Sufixo <b>-ez / -eza</b> (substantivo abstrato derivado de adjetivo) com <b>Z</b></td><td>rígido → rigidez; pobre → pobreza; certo → certeza; nítido → nitidez</td></tr>
<tr><td>Verbo em <b>-isar</b> quando a palavra-base tem S</td><td>análise → analisar; pesquisa → pesquisar; aviso → avisar; paralisia → paralisar</td></tr>
<tr><td>Verbo em <b>-izar</b> quando a base não tem S</td><td>real → realizar; útil → utilizar; atual → atualizar; civil → civilizar</td></tr>
<tr><td>Derivados de verbos em <b>-nder / -ndir</b> com S</td><td>pretender → pretensão; expandir → expansão; compreender → compreensão</td></tr>
<tr><td>Derivados de verbos em <b>-ter</b> com Ç</td><td>deter → detenção; reter → retenção; conter → contenção; obter → obtenção</td></tr>
<tr><td>Derivados de verbos em <b>-tir</b> (alguns) com SS</td><td>discutir → discussão; repercutir → repercussão; admitir → admissão</td></tr>
<tr><td>Depois de <b>ditongo</b>: X (e não CH)</td><td>caixa, peixe, frouxo, ameixa, deixar (exceção: recauchutar)</td></tr>
<tr><td>Depois de <b>en-</b> inicial: X</td><td>enxada, enxergar, enxurrada (exceções: encher, encharcar e derivados de palavras com ch, como enchova)</td></tr>
<tr><td>Terminações <b>-gem</b> em substantivos: G</td><td>viagem, garagem, coragem (exceções: pajem, lajem); mas o verbo é “que eles viaj<b>em</b>”</td></tr></table>
<h3>7. Parônimos e homônimos campeões de prova</h3>
<table class="tab"><tr><th>Par</th><th>Diferença</th></tr>
<tr><td>mandado / mandato</td><td>ordem judicial (mandado de prisão, de segurança) / período de exercício ou procuração (mandato do prefeito)</td></tr>
<tr><td>infligir / infringir</td><td>aplicar pena / violar regra</td></tr>
<tr><td>ratificar / retificar</td><td>confirmar / corrigir</td></tr>
<tr><td>descrição / discrição</td><td>ato de descrever / reserva, prudência</td></tr>
<tr><td>sessão / seção / cessão</td><td>reunião, espetáculo / divisão, setor / ato de ceder</td></tr>
<tr><td>eminente / iminente</td><td>ilustre / prestes a acontecer</td></tr>
<tr><td>tráfego / tráfico</td><td>fluxo de veículos / comércio ilegal</td></tr>
<tr><td>deferir / diferir</td><td>conceder / adiar ou ser diferente</td></tr>
<tr><td>flagrante / fragrante</td><td>evidente, no ato / perfumado</td></tr>
<tr><td>mal / mau</td><td>oposto de bem (advérbio ou substantivo) / oposto de bom (adjetivo)</td></tr>
<tr><td>a fim de / afim</td><td>finalidade (“a fim de estudar”) / semelhante, parente (“áreas afins”)</td></tr>
<tr><td>acerca de / há cerca de / a cerca de</td><td>sobre / faz aproximadamente / a uma distância aproximada</td></tr>
<tr><td>senão / se não</td><td>do contrário, mas sim, exceto / caso não (“se não chover”)</td></tr>
<tr><td>porque / por que / porquê / por quê</td><td>explicação / pergunta ou “pelo qual” / substantivo (“o porquê”) / pergunta no fim da frase</td></tr></table>
<h3>8. Hífen com prefixos</h3>
${cartoes([['➖', 'Segundo elemento com H', 'sempre hífen: anti-higiênico, super-homem, pré-história', COR.azul], ['🔁', 'Vogais iguais', 'hífen: micro-ondas, anti-inflamatório, contra-ataque', COR.verde], ['🔗', 'Vogais diferentes', 'junta: autoescola, infraestrutura, extraoficial, semiaberto', COR.lar], ['🔠', 'Vogal + R ou S', 'junta e dobra: antissocial, contrarregra, minissaia, ultrassom', COR.roxo]])}
<ul><li><b>Sempre com hífen</b>: ex- (ex-diretor), vice- (vice-prefeito), sem- (sem-terra), além-, aquém-, recém- (recém-nascido), pós-, pré-, pró- quando tônicos (pós-graduação, pré-escola, pró-reitor).</li><li><b>Sub- e sob-</b> antes de r, b ou h: sub-reitor, sub-base, sub-humano (ou subumano).</li><li><b>Circum- e pan-</b> antes de vogal, m, n, h: circum-navegação, pan-americano.</li><li><b>Co-</b>: em regra junta (coautor, cooperar, coerdeiro).</li><li><b>Compostos</b> sem elemento de ligação costumam ter hífen (guarda-chuva, segunda-feira); com elemento de ligação, em regra não (pé de moleque, dia a dia, fim de semana).</li></ul>
${dica('Hífen com prefixo: “<b>iguais se separam, diferentes se juntam</b>”. Micro-ondas (o + o) separa; autoescola (o + e) junta. Com <b>r</b> ou <b>s</b> depois de vogal, junta e dobra: anti + social = antissocial.')}
${peg('“Mandado de segurança” e “mandado de prisão” são com <b>D</b>. E “ideia” não tem acento, mas “papéis” tem: a regra do ditongo aberto vale só para <b>paroxítonas</b>.')}`,
    quiz: [
      C('As palavras “ideia” e “heroico” não recebem acento gráfico porque são paroxítonas com ditongo aberto.', 'O Acordo eliminou esse acento nas paroxítonas.'),
      E('A palavra “autoescola” deve ser grafada com hífen.', 'Vogais diferentes: junta-se.'),
      C('Em “O agente lavrou o auto por infringir o condutor a regra”, “infringir” significa violar.', 'Infringir = violar; infligir = aplicar pena.'),
      E('A palavra “juiz” leva acento agudo no “i”, assim como “juízes”.', 'Em “juiz” o i forma sílaba com z (ju-iz); em “ju-í-zes” fica sozinho e é acentuado.'),
      C('O plural de “ele detém” é “eles detêm”, com acento circunflexo.', 'Derivados de ter e vir: agudo no singular, circunflexo no plural.'),
      E('A grafia “pesquizar” está correta, pois o verbo termina em -izar.', 'A base “pesquisa” tem S: pesquisar.'),
      C('A palavra “antissocial” está corretamente grafada, sem hífen e com o “s” duplicado.', 'Prefixo terminado em vogal + palavra iniciada por s.'),
      E('Na frase “Ele foi preso em flagrante delito e será julgado na próxima seção do júri”, a palavra “seção” está corretamente empregada.', 'Reunião do júri é “sessão”.'),
    ],
  },
];
