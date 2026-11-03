// Leitura R.I.S.K. — Língua Portuguesa (para qualquer edital de concurso). Texto original.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, banca, C, E } from './blocos.js';
import { PARTE2 } from './portugues2.js';

const PARTE1 = [
  {
    id: 'interpretacao', titulo: 'Compreensão e interpretação de textos', arts: 'base de toda a prova',
    chaves: ['interpretacao de texto', 'compreensao e interpretacao', 'compreensao de texto', 'interpretacao'],
    html: `
<h3>Por que este tópico decide a prova</h3>
<p>Em bancas como <b>Cebraspe, FGV, Vunesp e FCC</b>, de <b>40% a 60%</b> das questões de Português dependem de leitura atenta. Até as questões de gramática costumam vir “dentro” de um texto. Quem domina a técnica ganha pontos em <b>todas</b> as outras partes da prova.</p>
${cartoes([['👁', 'Compreender', 'o que o texto <b>diz</b> de forma explícita', COR.azul], ['🧠', 'Interpretar', 'o que se <b>conclui</b> a partir do texto (inferência)', COR.roxo], ['🚫', 'Extrapolar', 'ir <b>além</b> do texto: é sempre erro', COR.verm]])}
<h3>1. Compreensão x interpretação</h3>
<ul><li><b>Compreensão</b> é localizar a informação: “segundo o texto”, “o autor afirma”, “de acordo com o 2º parágrafo”. A resposta está <b>escrita</b>, ainda que com outras palavras.</li><li><b>Interpretação</b> é deduzir: “infere-se”, “depreende-se”, “conclui-se”, “o texto permite concluir”. A resposta <b>não está escrita</b>, mas é consequência lógica do que está.</li></ul>
${ex('<p>Texto: “Desde que a fiscalização eletrônica foi instalada no trecho, o número de mortes caiu pela metade.”</p><ul><li><b>Compreensão (certo):</b> o número de mortes diminuiu após a instalação da fiscalização.</li><li><b>Inferência (certo):</b> antes da fiscalização, o número de mortes era maior.</li><li><b>Extrapolação (errado):</b> a fiscalização eletrônica é a melhor política de segurança viária. O texto não compara políticas.</li></ul>')}
<h3>2. Os três erros clássicos</h3>
${cartoes([['➕', 'Extrapolação', 'acrescenta ideia que o texto não autoriza', COR.verm], ['➖', 'Redução', 'pega um detalhe e trata como ideia central', COR.lar], ['🔄', 'Contradição', 'afirma o oposto do texto', COR.roxo]])}
<h3>3. Técnica de leitura em 4 passos</h3>
${passos([['Leia o comando primeiro', 'saber o que procurar evita reler o texto inteiro'], ['Leia o texto marcando', 'tese do autor, conectores (mas, portanto, embora) e exemplos'], ['Volte ao trecho citado', 'nunca responda “de memória”: confira a linha'], ['Compare a afirmativa palavra por palavra', 'atenção a sempre, nunca, apenas, todos, exclusivamente']])}
<h3>4. Palavras que derrubam itens</h3>
<p>Termos <b>absolutos</b> (sempre, nunca, todos, nenhum, somente, exclusivamente, único) tornam a afirmativa mais forte que o texto. Se o autor disse “<b>muitos</b> condutores”, o item que diz “<b>todos</b> os condutores” está errado. Termos que <b>relativizam</b> (pode, em geral, tende a, alguns) costumam acompanhar itens certos.</p>
<h3>5. Tese, argumentos e ponto de vista</h3>
<ul><li><b>Tese</b> é a opinião central que o autor defende. Costuma aparecer na introdução e ser retomada na conclusão.</li><li><b>Argumentos</b> sustentam a tese: dados, exemplos, autoridade, causa e consequência, comparação.</li><li>Fique atento à <b>voz</b>: o autor pode citar uma opinião para <b>refutá-la</b>. “Há quem diga que…, mas…” — o que vem antes do “mas” <b>não</b> é a opinião do autor.</li></ul>
<h3>6. Sentido de palavras e expressões no contexto</h3>
<p>A banca pergunta o sentido de uma palavra <b>naquele texto</b>, e não no dicionário. Teste: substitua pela opção proposta e veja se a frase mantém o sentido e a correção.</p>
${ex('<p>“A medida <b>esbarrou</b> na falta de recursos.” Aqui, “esbarrar” significa <b>encontrar obstáculo</b>, e não “tocar fisicamente”.</p>')}
${banca('<ul><li><b>Cebraspe</b>: item de certo ou errado com paráfrase quase idêntica ao texto, mas com <b>uma palavra trocada</b> (ex.: “causa” virou “consequência”).</li><li><b>FGV</b>: pergunta sobre a <b>intenção</b> do autor ou o <b>efeito</b> de um recurso (ironia, pergunta retórica, aspas).</li><li><b>Vunesp e FCC</b>: “de acordo com o texto” e substituição de palavras sem alterar o sentido.</li></ul>')}
${dica('Na dúvida entre duas alternativas, fique com a que é <b>mais fiel</b> ao texto, mesmo que pareça “óbvia demais”. Interpretação de concurso premia fidelidade, não criatividade.')}
${peg('Seu conhecimento de mundo <b>não</b> vale. Se o texto diz algo que você sabe ser falso na realidade, responda conforme o <b>texto</b>.')}`,
    quiz: [C('Em questões de interpretação, uma afirmativa que generaliza com o termo “todos” uma ideia que o texto atribui a “muitos” deve ser julgada errada.', 'É extrapolação: o texto relativiza e o item absolutiza.'), E('Quando o autor apresenta uma opinião iniciada por “há quem defenda que” e em seguida usa “contudo”, a opinião apresentada antes do conector é a tese do autor.', 'O “contudo” marca oposição: a tese do autor costuma vir depois dele.'), C('Inferir é concluir algo que não está escrito no texto, mas que decorre logicamente do que está escrito.', 'É a diferença entre interpretação (inferência) e compreensão (informação explícita).')],
  },
  {
    id: 'tipologia', titulo: 'Tipos e gêneros textuais', arts: 'tipologia textual',
    chaves: ['tipos e generos', 'tipologia textual', 'generos textuais', 'tipos textuais'],
    html: `
<h3>Tipo x gênero</h3>
<p><b>Tipo textual</b> é o <b>modo de organizar</b> o texto, com características linguísticas próprias. São poucos (5). <b>Gênero textual</b> é o texto “real” que circula na sociedade, com função social definida: notícia, receita, ofício, boletim de ocorrência, bula, edital. São <b>infinitos</b>.</p>
${cartoes([['📖', 'Narrativo', 'conta fatos em sequência: personagens, tempo, espaço, verbos no pretérito', COR.azul], ['🖼', 'Descritivo', 'retrata seres e ambientes: adjetivos, verbos de estado', COR.verde], ['💬', 'Dissertativo-argumentativo', 'defende uma tese com argumentos: conectores lógicos', COR.verm], ['📘', 'Expositivo', 'explica um assunto sem tomar partido: definições, dados', COR.roxo], ['📋', 'Injuntivo (instrucional)', 'orienta o leitor: verbos no imperativo ou infinitivo', COR.lar]])}
<h3>Marcas de cada tipo</h3>
<table class="tab"><tr><th>Tipo</th><th>Marcas linguísticas</th><th>Gêneros comuns</th></tr>
<tr><td><b>Narrativo</b></td><td>verbos de ação no pretérito, marcadores de tempo (“depois”, “naquela noite”), narrador</td><td>conto, crônica, notícia, boletim de ocorrência</td></tr>
<tr><td><b>Descritivo</b></td><td>adjetivos, verbos de ligação, enumeração de características</td><td>laudo, classificado, retrato</td></tr>
<tr><td><b>Dissertativo-argumentativo</b></td><td>tese, conectores (portanto, porém, pois), 3ª pessoa, presente</td><td>artigo de opinião, editorial, redação de concurso</td></tr>
<tr><td><b>Expositivo</b></td><td>definições, exemplos, dados, linguagem objetiva</td><td>verbete, aula, artigo de divulgação científica</td></tr>
<tr><td><b>Injuntivo</b></td><td>imperativo (“dirija”, “mantenha”) ou infinitivo (“manter distância”)</td><td>manual, receita, bula, placa educativa, edital</td></tr></table>
${ex('<p>“<b>Mantenha</b> distância segura do veículo da frente. <b>Reduza</b> a velocidade em dias de chuva.” → tipo <b>injuntivo</b>, gênero campanha educativa.</p><p>“O excesso de velocidade é responsável por grande parte dos acidentes graves, <b>pois</b> reduz o tempo de reação do condutor; <b>portanto</b>, a fiscalização é indispensável.” → tipo <b>dissertativo-argumentativo</b>.</p>')}
<h3>Um gênero pode misturar tipos</h3>
<p>Uma notícia é predominantemente <b>narrativa</b>, mas pode ter trechos descritivos e expositivos. A banca pergunta qual é o tipo <b>predominante</b>, ou qual tipo aparece <b>em um trecho</b> específico.</p>
${banca('<ul><li>“O texto é predominantemente…”: identifique a função global (narrar, descrever, argumentar, explicar, instruir).</li><li>“O trecho X tem caráter descritivo”: veja se há adjetivos e ausência de progressão temporal.</li><li>Confusão frequente: <b>expositivo</b> (explica, neutro) x <b>argumentativo</b> (defende uma posição).</li></ul>')}
${dica('Pergunte: “o texto quer que eu <b>saiba</b> (expositivo), que eu <b>concorde</b> (argumentativo), que eu <b>faça</b> (injuntivo), que eu <b>veja</b> (descritivo) ou que eu <b>acompanhe</b> uma história (narrativo)?”')}
${peg('Ter números e dados não torna o texto expositivo. Se os dados servem para <b>defender uma posição</b>, o texto é <b>argumentativo</b>.')}`,
    quiz: [C('Textos que orientam o leitor a realizar uma ação, como manuais e receitas, pertencem ao tipo injuntivo, marcado pelo uso de verbos no imperativo ou no infinitivo.', 'É a característica central do tipo injuntivo (instrucional).'), E('Gênero e tipo textual são sinônimos, pois ambos se referem à estrutura linguística predominante no texto.', 'Tipo é o modo de organização (5 tipos); gênero é o texto concreto com função social (infinitos).'), C('Um texto que apresenta dados estatísticos para sustentar a necessidade de mais fiscalização é predominantemente argumentativo.', 'Os dados funcionam como argumento a favor de uma tese.')],
  },
  {
    id: 'ortografia', titulo: 'Ortografia oficial e acentuação', arts: 'Acordo Ortográfico (Decreto 6.583/2008)',
    chaves: ['ortografia', 'acentuacao grafica', 'acentuacao', 'hifen'],
    html: `
<h3>Visão geral</h3>
<p>Cai em três frentes: <b>grafia</b> das palavras (s/z/ç/x/ch/g/j), <b>acentuação</b> e <b>hífen</b>. As regras abaixo são as do Acordo Ortográfico em vigor.</p>
<h3>1. Acentuação: as regras que resolvem 90% das questões</h3>
${cartoes([['🔚', 'Oxítonas', 'acento se terminam em <b>a(s), e(s), o(s), em, ens</b>: sofá, café, cipó, também, parabéns', COR.azul], ['➖', 'Paroxítonas', 'acento se <b>não</b> terminam em a, e, o, em: fácil, táxi, caráter, órfão, júri', COR.verde], ['🔝', 'Proparoxítonas', '<b>todas</b> são acentuadas: lâmpada, rápido, público', COR.verm]])}
<ul><li><b>Monossílabos tônicos</b> terminados em a(s), e(s), o(s): pá, pé, pó, mês, nós.</li><li><b>Hiatos com i e u tônicos</b>, sozinhos na sílaba ou com s: saída, saúde, baú, país. Não se acentuam se seguidos de nh (ra-i-nha) ou se repetidos (xiita).</li><li><b>Ditongos abertos</b> éi, ói, éu: acentuados nas <b>oxítonas</b> e monossílabos (papéis, herói, céu), mas <b>não</b> nas paroxítonas (ideia, assembleia, jiboia, heroico).</li><li><b>Acento diferencial</b> que continua: <b>pôde</b> (passado) x pode (presente); <b>pôr</b> (verbo) x por (preposição); <b>têm/vêm</b> (plural) x tem/vem (singular).</li><li><b>Caíram</b> com o Acordo: o trema (linguiça, frequente), o acento de “voo”, “enjoo”, “leem”, “creem”, “veem”, e o diferencial de “para” (verbo) e “pelo”.</li></ul>
${ex('<p><b>Ideia</b> não tem acento (paroxítona com ditongo “ei”), mas <b>papéis</b> tem (oxítona com ditongo “éi”). <b>Herói</b> tem; <b>heroico</b> não.</p>')}
<h3>2. Grafias que mais caem</h3>
<table class="tab"><tr><th>Regra</th><th>Exemplos</th></tr>
<tr><td>Sufixo <b>-ês/-esa</b> (origem, título) com S</td><td>português, francesa, marquesa, princesa</td></tr>
<tr><td>Sufixo <b>-ez/-eza</b> (substantivo abstrato de adjetivo) com Z</td><td>rigidez, pobreza, certeza, nitidez</td></tr>
<tr><td>Verbos em <b>-isar</b> quando a base tem S</td><td>análise → analisar; pesquisa → pesquisar; aviso → avisar</td></tr>
<tr><td>Verbos em <b>-izar</b> quando a base não tem S</td><td>real → realizar; útil → utilizar; atual → atualizar</td></tr>
<tr><td>Substantivos de verbos em <b>-nder/-ndir</b> com S</td><td>pretender → pretensão; expandir → expansão</td></tr>
<tr><td>Verbos em <b>-tir</b> geram <b>-ssão</b> ou <b>-são</b>; em <b>-ter</b>, geram <b>-ção/-tenção</b></td><td>discutir → discussão; deter → detenção; reter → retenção</td></tr>
<tr><td>Depois de ditongo, <b>X</b> (e não CH)</td><td>caixa, peixe, frouxo, ameixa</td></tr></table>
<h3>3. Parônimos e homônimos campeões</h3>
<table class="tab"><tr><th>Par</th><th>Diferença</th></tr>
<tr><td>mandado / mandato</td><td>ordem judicial (mandado de prisão) / período de exercício (mandato do prefeito)</td></tr>
<tr><td>infligir / infringir</td><td>aplicar pena / violar regra (infringir o CTB)</td></tr>
<tr><td>ratificar / retificar</td><td>confirmar / corrigir</td></tr>
<tr><td>descrição / discrição</td><td>ato de descrever / reserva, prudência</td></tr>
<tr><td>sessão / seção / cessão</td><td>reunião / divisão, setor / ato de ceder</td></tr>
<tr><td>eminente / iminente</td><td>ilustre / prestes a acontecer (agressão iminente)</td></tr>
<tr><td>tráfego / tráfico</td><td>fluxo de veículos / comércio ilegal</td></tr></table>
<h3>4. Hífen com prefixos (regra geral do Acordo)</h3>
<ul><li>Usa-se hífen quando o 2º elemento começa por <b>h</b>: anti-higiênico, super-homem.</li><li>Usa-se quando o prefixo termina com a <b>mesma vogal</b> que inicia o 2º elemento: micro-ondas, anti-inflamatório.</li><li><b>Vogais diferentes</b>: junta. autoescola, infraestrutura, extraoficial.</li><li>Prefixo terminado em vogal + palavra iniciada por <b>r ou s</b>: junta e dobra. antissocial, contrarregra, minissaia.</li><li>Sempre com hífen: <b>ex-</b>, <b>vice-</b>, <b>pré-, pró-, pós-</b> (tônicos), <b>além-, aquém-, recém-, sem-</b>: ex-diretor, vice-prefeito, pós-graduação, recém-nascido.</li></ul>
${dica('Hífen com prefixo: “<b>iguais se separam, diferentes se juntam</b>”. Micro-ondas (o + o) separa; autoescola (o + e) junta.')}
${peg('“Mandado de segurança” e “mandado de prisão” são com <b>D</b>. “Mandato” com T é só o período de um cargo eletivo ou procuração.')}`,
    quiz: [C('As palavras “ideia” e “heroico” não recebem acento gráfico porque são paroxítonas com ditongo aberto.', 'O Acordo eliminou o acento dos ditongos abertos éi e ói nas paroxítonas.'), E('A palavra “autoescola” deve ser grafada com hífen, conforme o Acordo Ortográfico vigente.', 'Prefixo terminado em vogal diferente da que inicia o 2º elemento: junta-se. Autoescola.'), C('Na frase “O agente lavrou o auto por infringir o condutor a regra de ultrapassagem”, o verbo “infringir” está corretamente empregado no sentido de violar.', 'Infringir = violar, transgredir. Infligir = aplicar pena.')],
  },
  {
    id: 'coesao', titulo: 'Coesão textual, conectores e tempos verbais', arts: 'referenciação, sequenciação e modos verbais',
    chaves: ['coesao textual', 'mecanismos de coesao', 'coesao', 'conectores', 'referenciacao', 'tempos e modos verbais'],
    html: `
<h3>O que é coesão</h3>
<p>Coesão é a <b>costura</b> do texto: os mecanismos que ligam palavras, frases e parágrafos. Ela se faz por <b>referenciação</b> (retomar ou antecipar termos) e por <b>sequenciação</b> (conectar ideias com sentido lógico).</p>
${cartoes([['🔗', 'Referenciação', 'pronomes, sinônimos, elipse, repetição', COR.azul], ['➡️', 'Sequenciação', 'conjunções e expressões de ligação', COR.verde], ['⏳', 'Tempos e modos', 'situam as ações no tempo e indicam certeza ou hipótese', COR.roxo]])}
<h3>1. Referenciação</h3>
<ul><li><b>Anáfora</b>: retoma algo já dito. “O condutor fugiu. <b>Ele</b> foi localizado depois.”</li><li><b>Catáfora</b>: antecipa algo que vem depois. “O agente disse <b>isto</b>: a via está interditada.”</li><li><b>Substituição lexical</b>: sinônimos, hiperônimos e expressões. “A PRF… <b>a corporação</b>…”</li><li><b>Elipse</b>: omissão de termo recuperável. “O motorista parou e [ele] desceu do carro.”</li></ul>
${ex('<p>“Os agentes abordaram os condutores, e <b>estes</b> apresentaram os documentos.” <b>Este/estes</b> retoma o termo <b>mais próximo</b> (os condutores); <b>aquele/aqueles</b> retomaria o mais distante (os agentes).</p>')}
<h3>2. Conectores: o sentido é o que importa</h3>
<table class="tab"><tr><th>Relação</th><th>Conectores</th></tr>
<tr><td><b>Adição</b></td><td>e, nem, também, além disso, não só… mas também</td></tr>
<tr><td><b>Oposição / adversidade</b></td><td>mas, porém, contudo, todavia, entretanto, no entanto</td></tr>
<tr><td><b>Concessão</b></td><td>embora, ainda que, mesmo que, apesar de, conquanto, posto que</td></tr>
<tr><td><b>Causa</b></td><td>porque, já que, visto que, uma vez que, como (no início)</td></tr>
<tr><td><b>Explicação</b></td><td>pois (antes do verbo), porque, que</td></tr>
<tr><td><b>Conclusão</b></td><td>portanto, logo, por isso, por conseguinte, pois (depois do verbo, entre vírgulas)</td></tr>
<tr><td><b>Condição</b></td><td>se, caso, desde que, contanto que, a menos que</td></tr>
<tr><td><b>Finalidade</b></td><td>para que, a fim de que</td></tr>
<tr><td><b>Consequência</b></td><td>tão… que, tanto… que, de modo que</td></tr>
<tr><td><b>Proporção</b></td><td>à medida que, à proporção que, quanto mais… mais</td></tr>
<tr><td><b>Tempo</b></td><td>quando, enquanto, assim que, logo que, depois que</td></tr>
<tr><td><b>Conformidade</b></td><td>conforme, segundo, consoante, como (= conforme)</td></tr></table>
${box('Oposição x concessão', '<p>Ambas expressam contraste, mas a <b>concessão</b> apresenta um fato que <b>não impede</b> o outro: “<b>Embora</b> chovesse, a operação continuou.” A <b>adversativa</b> liga orações independentes: “Chovia, <b>mas</b> a operação continuou.” Na reescrita, troque “mas” por “embora” mudando a <b>ordem e o modo verbal</b> (embora + subjuntivo).</p>')}
<h3>3. Tempos e modos verbais</h3>
<ul><li><b>Indicativo</b>: certeza. “O condutor <b>estava</b> alcoolizado.”</li><li><b>Subjuntivo</b>: dúvida, hipótese, desejo. “Caso o condutor <b>esteja</b> alcoolizado…”, “Embora <b>estivesse</b> cansado…”</li><li><b>Imperativo</b>: ordem, pedido. “<b>Apresente</b> a CNH.”</li><li><b>Futuro do pretérito</b>: hipótese ou fato condicionado, e também afastamento do autor em relação à informação. “O suspeito <b>teria</b> fugido pela BR.” (o jornalista não garante)</li><li><b>Pretérito imperfeito</b>: ação contínua ou habitual no passado (“dirigia todos os dias”). <b>Perfeito</b>: ação concluída (“dirigiu ontem”).</li></ul>
${banca('<ul><li>Troca de conector mantendo o sentido: “porém” por “contudo” (sim); “porém” por “portanto” (não: muda de oposição para conclusão).</li><li>A quem se refere um pronome: “o termo ‘ela’ retoma…”.</li><li>Efeito de sentido do futuro do pretérito em notícias (“teria”, “seria”): hipótese ou não comprometimento do autor.</li></ul>')}
${dica('O “<b>pois</b>” muda de sentido conforme a posição: <b>antes</b> do verbo é explicação (“Corra, <b>pois</b> está tarde”); <b>depois</b> do verbo, entre vírgulas, é conclusão (“Está tarde; corra, <b>pois</b>.”).')}
${peg('Trocar “embora” por “mas” exige reescrever a frase. “<b>Embora</b> estivesse cansado, trabalhou” equivale a “Estava cansado, <b>mas</b> trabalhou”, e não a “<b>Mas</b> estava cansado, trabalhou”.')}`,
    quiz: [C('Na frase “Embora a via estivesse interditada, muitos motoristas tentaram passar”, a conjunção “embora” introduz ideia de concessão.', 'Embora + subjuntivo = concessão.'), E('A substituição de “porém” por “portanto” em “O condutor estava habilitado, porém sem o documento” mantém o sentido original.', 'Porém = oposição; portanto = conclusão. O sentido muda.'), C('Em notícias, o futuro do pretérito, como em “o suspeito teria fugido”, indica que a informação não é confirmada pelo autor.', 'É o uso do futuro do pretérito para indicar hipótese ou distanciamento.')],
  },
  {
    id: 'classes', titulo: 'Classes de palavras (morfologia)', arts: 'as 10 classes gramaticais',
    chaves: ['classes de palavras', 'classes gramaticais', 'morfologia'],
    html: `
<h3>As 10 classes</h3>
<p>Morfologia estuda a palavra <b>isolada</b>: sua classe e suas flexões. Na prova, a classe é sempre definida pelo <b>uso na frase</b>.</p>
${cartoes([['🏷', 'Substantivo', 'nomeia: via, condutor, segurança', COR.azul], ['🎨', 'Adjetivo', 'caracteriza: via <b>escura</b>', COR.verde], ['👉', 'Artigo', 'o, a, um, uma', COR.cinza], ['🔢', 'Numeral', 'dois, segundo, dobro, metade', COR.lar], ['👤', 'Pronome', 'substitui ou acompanha o nome', COR.roxo], ['⚡', 'Verbo', 'ação, estado, fenômeno', COR.verm], ['📐', 'Advérbio', 'circunstância: muito, ontem, aqui', COR.amar], ['🔗', 'Preposição', 'liga termos: de, para, com, sem', COR.azul], ['🧩', 'Conjunção', 'liga orações: e, mas, porque', COR.verde], ['❗', 'Interjeição', 'emoção: ai!, cuidado!', COR.lar]])}
<h3>1. Mudança de classe (o que mais cai)</h3>
<ul><li><b>Substantivação</b>: qualquer palavra precedida de artigo vira substantivo. “O <b>não</b> do juiz”, “o <b>saber</b>”.</li><li><b>Adjetivo x advérbio</b>: “O carro <b>rápido</b>” (adjetivo, varia) x “Os carros andam <b>rápido</b>” (advérbio, invariável). Teste: se pode trocar por “rapidamente”, é advérbio.</li><li><b>“Meio”</b>: adjetivo (= metade, varia: “meia hora”) ou advérbio (= um pouco, não varia: “ela estava <b>meio</b> cansada”).</li><li><b>“Bastante”</b>: adjetivo/pronome quando acompanha substantivo (“bastantes provas”), advérbio quando modifica adjetivo ou verbo (“provas bastante difíceis”).</li></ul>
<h3>2. Pronomes</h3>
<table class="tab"><tr><th>Tipo</th><th>Exemplos e uso</th></tr>
<tr><td><b>Pessoais retos</b> (sujeito)</td><td>eu, tu, ele, nós, vós, eles</td></tr>
<tr><td><b>Pessoais oblíquos</b> (complemento)</td><td>me, te, se, o, a, lhe, nos, vos, mim, ti, si, comigo</td></tr>
<tr><td><b>Demonstrativos</b></td><td>este (perto de quem fala, ou o que vou dizer), esse (perto de quem ouve, ou o que já disse), aquele (longe)</td></tr>
<tr><td><b>Relativos</b></td><td>que, o qual, quem, cujo, onde: retomam um termo anterior e iniciam oração</td></tr>
<tr><td><b>Indefinidos</b></td><td>algum, nenhum, todo, outro, qualquer</td></tr>
<tr><td><b>Possessivos</b></td><td>meu, seu, nosso</td></tr></table>
${ex('<p>“O condutor <b>cujo</b> veículo foi apreendido…” → “cujo” indica posse e <b>nunca</b> leva artigo depois (“cujo <b>o</b> veículo” é erro). “O local <b>onde</b> ocorreu o acidente” → “onde” só para <b>lugar físico</b>.</p>')}
<h3>3. Verbo: o essencial</h3>
<ul><li><b>Vozes</b>: ativa (“O agente <b>multou</b> o condutor”), passiva analítica (“O condutor <b>foi multado</b> pelo agente”), passiva sintética (“<b>Multaram-se</b> os condutores” = os condutores foram multados).</li><li><b>Verbos irregulares</b> que caem: “intervir” segue “vir” (ele <b>interveio</b>, se eles <b>intervierem</b>); “manter”, “deter”, “reter” seguem “ter” (se ele <b>mantiver</b>, eles <b>detiveram</b>); “ver”: quando eu <b>vir</b>; “vir”: quando eu <b>vier</b>.</li></ul>
<h3>4. “Que” e “se”: as palavras camaleão</h3>
<table class="tab"><tr><th>Palavra</th><th>Funções mais cobradas</th></tr>
<tr><td><b>QUE</b></td><td>pronome relativo (= o qual: “a via <b>que</b> foi interditada”), conjunção integrante (“disse <b>que</b> viria”), conjunção explicativa/causal, partícula expletiva (“é <b>que</b>”)</td></tr>
<tr><td><b>SE</b></td><td>partícula apassivadora (“vendem-<b>se</b> carros”), índice de indeterminação do sujeito (“precisa-<b>se</b> de agentes”), pronome reflexivo (“feriu-<b>se</b>”), conjunção condicional (“<b>se</b> chover”) ou integrante (“não sei <b>se</b> vem”)</td></tr></table>
${dica('Que relativo: troque por “<b>o qual / a qual</b>”. Se der certo, é relativo. Que integrante: troque a oração por “<b>isso</b>”. “Disse que viria” → “Disse isso”.')}
${peg('“Mesmo”, “próprio” e “só” <b>variam</b> quando são adjetivos (“elas <b>mesmas</b>”, “eles <b>sós</b>”). “A sós” é expressão fixa e não varia.')}`,
    quiz: [C('Em “Os veículos trafegavam rápido”, a palavra “rápido” funciona como advérbio e, por isso, não se flexiona.', 'Modifica o verbo e equivale a “rapidamente”.'), E('Na frase “O motorista cujo o carro foi apreendido compareceu”, o emprego do pronome relativo está correto.', 'Não se usa artigo depois de “cujo”: “cujo carro”.'), C('Em “Precisa-se de agentes”, o “se” é índice de indeterminação do sujeito.', 'Verbo com preposição (precisar de) + se = sujeito indeterminado; o verbo fica no singular.')],
  },
  {
    id: 'sintaxe', titulo: 'Sintaxe: termos da oração, coordenação e subordinação', arts: 'análise sintática',
    chaves: ['coordenacao e subordinacao', 'estrutura morfossintatica', 'termos da oracao', 'periodo composto', 'sintaxe'],
    html: `
<h3>Visão geral</h3>
<p>Sintaxe estuda a <b>função</b> das palavras na frase. É a base de pontuação, concordância, regência e crase. Quem entende sintaxe acerta todas essas.</p>
<h3>1. Termos essenciais: sujeito e predicado</h3>
<ul><li><b>Sujeito</b>: o termo com o qual o verbo concorda. Teste: pergunte “o que / quem” + verbo.</li><li>Tipos: simples (“<b>O agente</b> chegou”), composto (“<b>O agente e o perito</b> chegaram”), oculto (“[Nós] Chegamos cedo”), indeterminado (“<b>Roubaram</b> o carro”, “Precisa-<b>se</b> de ajuda”) e oração sem sujeito (“<b>Houve</b> acidentes”, “<b>Faz</b> dois anos”, “<b>Choveu</b>”).</li><li><b>Predicado</b>: verbal (verbo de ação), nominal (verbo de ligação + predicativo: “A via <b>estava interditada</b>”) ou verbo-nominal (“O condutor saiu <b>nervoso</b>”).</li></ul>
<h3>2. Termos integrantes e acessórios</h3>
${cartoes([['🎯', 'Objeto direto', 'completa verbo sem preposição: “multou <b>o condutor</b>”', COR.azul], ['🎯', 'Objeto indireto', 'completa verbo com preposição: “obedeceu <b>às regras</b>”', COR.verde], ['🧷', 'Complemento nominal', 'completa nome com preposição: “respeito <b>às leis</b>”', COR.roxo], ['🕐', 'Adjunto adverbial', 'circunstância: “<b>ontem</b>, <b>na BR-116</b>”', COR.lar], ['🏷', 'Adjunto adnominal', 'caracteriza o nome: “<b>o</b> carro <b>azul</b>”', COR.cinza], ['💬', 'Aposto', 'explica um termo: “Lucas, <b>policial</b>, …”', COR.verm], ['📣', 'Vocativo', 'chamamento: “<b>Senhor</b>, encoste.”', COR.amar]])}
${box('Complemento nominal x adjunto adnominal', '<p>Os dois podem vir com preposição depois de um nome. O <b>complemento nominal</b> é <b>paciente</b> (recebe a ação): “a fiscalização <b>das rodovias</b>” (as rodovias são fiscalizadas). O <b>adjunto adnominal</b> é <b>agente</b> ou indica posse: “a fiscalização <b>da PRF</b>” (a PRF fiscaliza).</p>')}
<h3>3. Período composto por coordenação</h3>
<p>Orações <b>independentes</b> sintaticamente, ligadas ou não por conjunção.</p>
<table class="tab"><tr><th>Coordenada sindética</th><th>Conjunções</th></tr>
<tr><td>Aditiva</td><td>e, nem, mas também</td></tr><tr><td>Adversativa</td><td>mas, porém, contudo, todavia, entretanto</td></tr><tr><td>Alternativa</td><td>ou… ou, ora… ora, quer… quer</td></tr><tr><td>Conclusiva</td><td>logo, portanto, por isso, pois (posposto)</td></tr><tr><td>Explicativa</td><td>pois, porque, que</td></tr></table>
<h3>4. Período composto por subordinação</h3>
<p>Uma oração <b>exerce função</b> dentro da outra (oração principal).</p>
${cartoes([['🔤', 'Substantivas', 'funcionam como substantivo (sujeito, objeto…): “É necessário <b>que todos usem cinto</b>”', COR.azul], ['🎨', 'Adjetivas', 'funcionam como adjetivo, iniciadas por pronome relativo: “O carro <b>que foi apreendido</b>…”', COR.verde], ['🕐', 'Adverbiais', 'funcionam como advérbio: causa, condição, concessão, tempo, finalidade…', COR.lar]])}
<h3>5. Adjetiva restritiva x explicativa (campeã de prova)</h3>
<ul><li><b>Restritiva</b> (sem vírgulas): restringe, especifica. “Os condutores <b>que estavam embriagados</b> foram presos.” → só os embriagados foram presos.</li><li><b>Explicativa</b> (entre vírgulas): generaliza, explica. “Os condutores, <b>que estavam embriagados</b>, foram presos.” → todos estavam embriagados, e todos foram presos.</li></ul>
${ex('<p>Retirar ou colocar as vírgulas de uma oração adjetiva <b>muda o sentido</b>. É item clássico do Cebraspe: “a supressão das vírgulas manteria a correção, mas alteraria o sentido”. Nesse caso, o item é <b>certo</b>.</p>')}
${dica('Oração sem sujeito com “haver” (= existir) e “fazer” (tempo decorrido): o verbo fica <b>sempre no singular</b>. “<b>Houve</b> muitos acidentes.” “<b>Faz</b> dez anos.”')}
${peg('No “Roubaram o carro”, o sujeito é <b>indeterminado</b>, e não oculto. Oculto é quando dá para identificar pela desinência ou pelo contexto (“Chegamos” = nós).')}`,
    quiz: [C('Em “Os motoristas, que estavam sem cinto, foram autuados”, a oração entre vírgulas é adjetiva explicativa e indica que todos os motoristas estavam sem cinto.', 'Adjetiva explicativa generaliza a característica a todo o termo antecedente.'), E('Na frase “Houve muitos acidentes no feriado”, o termo “muitos acidentes” é o sujeito do verbo “haver”.', 'Haver no sentido de existir é impessoal: a oração não tem sujeito, e “muitos acidentes” é objeto direto.'), C('Em “a fiscalização das rodovias”, o termo “das rodovias” é complemento nominal, pois tem sentido passivo.', 'As rodovias são fiscalizadas: valor paciente = complemento nominal.')],
  },
  {
    id: 'pontuacao', titulo: 'Pontuação', arts: 'emprego da vírgula e demais sinais',
    chaves: ['pontuacao', 'emprego da virgula', 'virgula'],
    html: `
<h3>A regra de ouro</h3>
<p>Na ordem direta (<b>sujeito + verbo + complementos + adjuntos</b>), <b>não se usa vírgula</b> entre os termos essenciais. A vírgula marca <b>deslocamentos, intercalações e enumerações</b>.</p>
${box('Proibido separar com vírgula', '<ul><li><b>Sujeito</b> do verbo: “O condutor do veículo<s>,</s> fugiu.” ✗</li><li><b>Verbo</b> do complemento: “O agente apreendeu<s>,</s> a CNH.” ✗</li><li><b>Nome</b> do seu complemento: “A necessidade<s>,</s> de fiscalização.” ✗</li></ul>')}
<h3>1. Usos obrigatórios da vírgula</h3>
<ul><li><b>Enumeração</b>: “Foram apreendidos drogas, armas e munições.”</li><li><b>Aposto explicativo</b>: “A PRF, <b>órgão da União</b>, patrulha as rodovias federais.”</li><li><b>Vocativo</b>: “Condutor, desligue o motor.”</li><li><b>Adjunto adverbial deslocado longo</b>: “<b>Durante a operação de fim de ano</b>, foram feitos 300 testes.” (curto é facultativo: “Ontem(,) choveu.”)</li><li><b>Orações adjetivas explicativas</b>: “O suspeito, <b>que estava armado</b>, foi preso.”</li><li><b>Conjunções intercaladas</b>: “O agente, <b>porém</b>, não autuou.”</li><li><b>Orações adverbiais antepostas</b>: “<b>Quando o sinal fechou</b>, o carro avançou.”</li><li><b>Omissão do verbo</b> (zeugma): “Uns preferiam o asfalto; outros, a terra.”</li><li>Antes de <b>mas, porém, pois (explicativo), logo</b> que iniciam coordenadas: “Parou, <b>mas</b> não desceu.”</li></ul>
<h3>2. Vírgula antes do “e”</h3>
<ul><li><b>Não</b> se usa quando liga termos ou orações com o <b>mesmo sujeito</b>: “O agente parou o carro e pediu os documentos.”</li><li><b>Usa-se</b> quando as orações têm <b>sujeitos diferentes</b>: “O agente pediu os documentos, <b>e</b> o condutor os entregou.”</li><li>Usa-se quando o “e” tem valor <b>adversativo</b> (= mas): “Estudou muito, e não passou.”</li><li>Usa-se no <b>polissíndeto</b> (repetição do “e”): “E corre, e grita, e chora.”</li></ul>
<h3>3. Outros sinais</h3>
<table class="tab"><tr><th>Sinal</th><th>Uso</th></tr>
<tr><td><b>Ponto e vírgula</b></td><td>separa itens de enumeração extensa (que já têm vírgula) e orações coordenadas longas ou com conjunção deslocada (“Estudou; não foi, porém, aprovado.”)</td></tr>
<tr><td><b>Dois-pontos</b></td><td>anuncia enumeração, explicação, citação ou consequência: “Só há um caminho: estudar.”</td></tr>
<tr><td><b>Travessão e parênteses</b></td><td>isolam intercalações, podendo substituir vírgulas no aposto. Parênteses dão menos destaque</td></tr>
<tr><td><b>Aspas</b></td><td>citação literal, ironia, neologismo, estrangeirismo, destaque</td></tr></table>
${ex('<p>Reescrita clássica: “A operação, que durou três dias, terminou ontem” pode virar “A operação — que durou três dias — terminou ontem” ou “A operação (que durou três dias) terminou ontem”, sem erro e sem mudar o sentido.</p>')}
${banca('<ul><li>“A retirada da vírgula prejudicaria a correção gramatical” → verifique se ela separava sujeito de verbo, ou se isolava aposto ou intercalação.</li><li>“A vírgula poderia ser substituída por dois-pontos / travessão” → confira se o sentido explicativo se mantém.</li><li>Vírgula de adjunto adverbial <b>curto</b> deslocado: é <b>facultativa</b> (item certo ao dizer que pode ser retirada).</li></ul>')}
${dica('Teste rápido: <b>leia sem o trecho entre vírgulas</b>. Se a frase continua completa e correta, as vírgulas isolavam uma intercalação, e as duas são obrigatórias (ou nenhuma, se a intercalação for restritiva).')}
${peg('Vírgula entre sujeito longo e verbo continua <b>errada</b>, por maior que seja o sujeito: “Os condutores flagrados dirigindo sob efeito de álcool na operação de ontem<s>,</s> serão processados.” ✗')}`,
    quiz: [E('Em “Os condutores flagrados em excesso de velocidade durante o feriado, foram autuados”, a vírgula está corretamente empregada para separar o sujeito extenso do verbo.', 'Não se separa sujeito de verbo com vírgula, por mais extenso que seja.'), C('Em “O agente pediu os documentos, e o condutor os entregou prontamente”, a vírgula antes do “e” é justificada pelo fato de as orações terem sujeitos diferentes.', 'Sujeitos diferentes autorizam a vírgula antes do “e”.'), C('Em “Ontem, a PRF fez uma operação”, a vírgula após o adjunto adverbial curto deslocado é facultativa.', 'Adjunto adverbial curto deslocado: vírgula facultativa.')],
  },
];

export default {
  id: 'portugues', nome: 'Língua Portuguesa', apelidos: ['portugues', 'lingua portuguesa', 'gramatica', 'redacao'],
  assuntos: [...PARTE1, ...PARTE2],
};
