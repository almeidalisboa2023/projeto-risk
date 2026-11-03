// Português (aula completa) — parte C: pontuação, concordância e regência.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, banca, C, E } from './blocos.js';

const par = (ok, no, por) => `<li class="${ok ? '' : 'so-erro'}">${ok ? `✔ ${ok}` : ''}${ok && no ? '<br>' : ''}${no ? `✘ <s>${no}</s>` : ''}${por ? ` <small class="muted">— ${por}</small>` : ''}</li>`;
const lista = (itens) => `<ul class="lt-pares">${itens.join('')}</ul>`;

export const PT_C = [
  {
    id: 'pontuacao', titulo: 'Pontuação', arts: 'aula completa',
    chaves: ['pontuacao', 'emprego da virgula', 'virgula', 'emprego dos sinais'],
    html: `
<h3>1. A regra de ouro da vírgula</h3>
<p>Na <b>ordem direta</b> (sujeito → verbo → complementos → adjuntos), os termos essenciais <b>não</b> se separam por vírgula. A vírgula aparece para marcar <b>deslocamentos</b>, <b>intercalações</b> e <b>enumerações</b>.</p>
${box('Nunca separe com vírgula', `${lista([par('', 'O condutor do veículo prata<b>,</b> fugiu.', 'sujeito × verbo'), par('', 'O agente apreendeu<b>,</b> a CNH.', 'verbo × objeto'), par('', 'A necessidade<b>,</b> de fiscalização é evidente.', 'nome × complemento'), par('', 'Os condutores flagrados dirigindo embriagados na operação de ontem<b>,</b> serão processados.', 'sujeito longo continua sendo sujeito')])}`)}
<h3>2. Vírgula obrigatória: os 10 casos</h3>
<table class="tab"><tr><th>Caso</th><th>Exemplo</th></tr>
<tr><td><b>Enumeração</b> de termos de mesma função</td><td>Foram apreendidos drogas, armas e munições.</td></tr>
<tr><td><b>Aposto explicativo</b></td><td>A PRF, órgão da União, patrulha as rodovias federais.</td></tr>
<tr><td><b>Vocativo</b></td><td>Condutor, desligue o motor.</td></tr>
<tr><td><b>Adjunto adverbial longo deslocado</b></td><td>Durante a operação de fim de ano, foram feitos 300 testes.</td></tr>
<tr><td><b>Oração adjetiva explicativa</b></td><td>O suspeito, que estava armado, foi preso.</td></tr>
<tr><td><b>Conjunção deslocada</b> (porém, contudo, portanto, entretanto)</td><td>O agente, porém, não autuou.</td></tr>
<tr><td><b>Oração adverbial anteposta</b> ou intercalada</td><td>Quando o sinal fechou, o carro avançou.</td></tr>
<tr><td><b>Zeugma</b> (omissão do verbo)</td><td>Uns preferiam o asfalto; outros, a terra.</td></tr>
<tr><td>Antes de <b>mas, porém, pois, logo</b> que iniciam coordenadas</td><td>Parou, mas não desceu.</td></tr>
<tr><td><b>Expressões explicativas</b> (isto é, ou seja, por exemplo, aliás)</td><td>Ele infringiu o art. 165, ou seja, dirigiu alcoolizado.</td></tr></table>
<h3>3. Vírgula facultativa</h3>
<ul><li><b>Adjunto adverbial curto</b> deslocado: “Ontem(,) choveu muito.” · “Aqui(,) se trabalha.”</li><li>Oração adverbial <b>posposta</b> curta: “Saiu(,) quando chegou a viatura.”</li><li>Antes de “etc.”: tanto faz, mas a tendência atual é usar.</li></ul>
<h3>4. A vírgula antes do “e”</h3>
${lista([par('“O agente parou o carro e pediu os documentos.”', '“O agente parou o carro, e pediu os documentos.”', 'mesmo sujeito: sem vírgula'), par('“O agente pediu os documentos, e o condutor os entregou.”', '', 'sujeitos diferentes: vírgula recomendada'), par('“Estudou muito, e não passou.”', '', '“e” com valor adversativo (= mas): vírgula'), par('“E corre, e grita, e chora.”', '', 'polissíndeto (repetição do “e”): vírgula')])}
<h3>5. Vírgula com as orações adjetivas</h3>
<p>A vírgula decide o <b>sentido</b>:</p>
${lista([par('“Os agentes <b>que trabalharam no feriado</b> receberão folga.” → só alguns trabalharam (restritiva).'), par('“Os agentes, <b>que trabalharam no feriado</b>, receberão folga.” → todos trabalharam (explicativa).')])}
<h3>6. Os outros sinais</h3>
<table class="tab"><tr><th>Sinal</th><th>Usos</th></tr>
<tr><td><b>Ponto e vírgula</b></td><td>separa itens de enumeração extensa (que já têm vírgulas), incisos de leis, e orações coordenadas longas ou com conjunção deslocada (“Estudou; não foi, porém, aprovado.”)</td></tr>
<tr><td><b>Dois-pontos</b></td><td>anuncia enumeração, explicação, citação, consequência ou síntese: “Só há um caminho: estudar.”</td></tr>
<tr><td><b>Travessão</b></td><td>isola intercalações com mais destaque; marca fala no diálogo; pode substituir vírgulas do aposto</td></tr>
<tr><td><b>Parênteses</b></td><td>isolam informação acessória, com menos destaque</td></tr>
<tr><td><b>Aspas</b></td><td>citação literal, ironia, neologismo, estrangeirismo, gíria, destaque</td></tr>
<tr><td><b>Reticências</b></td><td>interrupção, hesitação, suspense, supressão de trecho em citação: (…)</td></tr></table>
${ex(`<p>“A operação, que durou três dias, terminou ontem” pode ser reescrita sem erro e sem mudança de sentido como:</p>${lista([par('“A operação — que durou três dias — terminou ontem.”'), par('“A operação (que durou três dias) terminou ontem.”'), par('', '“A operação que durou três dias terminou ontem.”', 'correta, mas o sentido muda: vira restritiva')])}`, 'Reescrita comentada')}
${banca(`<ul><li>“A retirada da vírgula prejudicaria a correção gramatical” → verifique se ela isolava aposto, vocativo, intercalação ou separava sujeito e verbo.</li><li>“A vírgula poderia ser substituída por dois-pontos ou travessão” → o sentido explicativo se mantém?</li><li>Vírgula de adjunto adverbial <b>curto</b> deslocado: <b>facultativa</b>.</li><li>Uma vírgula <b>sozinha</b> numa intercalação está errada: intercalação exige par de vírgulas (abre e fecha).</li></ul>`)}
${dica('Teste rápido: <b>leia sem o trecho entre vírgulas</b>. Se a frase continua completa e correta, as vírgulas isolavam uma intercalação, e as duas são necessárias.')}
${peg('Vírgula entre sujeito e verbo continua <b>errada</b> mesmo com sujeito enorme. A exceção é quando há uma intercalação entre eles, marcada por <b>duas</b> vírgulas: “O condutor, <b>assustado</b>, fugiu.”')}`,
    quiz: [
      E('Em “Os condutores flagrados em excesso de velocidade durante o feriado, foram autuados”, a vírgula está correta para separar o sujeito extenso do verbo.', 'Não se separa sujeito de verbo.'),
      C('Em “O agente pediu os documentos, e o condutor os entregou”, a vírgula antes do “e” se justifica porque as orações têm sujeitos diferentes.', 'Sujeitos distintos.'),
      C('Em “Ontem, a PRF fez uma operação”, a vírgula após o adjunto adverbial curto é facultativa.', 'Adjunto curto deslocado.'),
      E('Em “Condutor desligue o motor”, a ausência de vírgula após “Condutor” está de acordo com a norma-padrão.', 'Vocativo exige vírgula.'),
      C('Em “Uns preferiam o asfalto; outros, a terra”, a vírgula após “outros” marca a omissão do verbo.', 'Zeugma.'),
      E('Substituir as vírgulas de uma oração adjetiva explicativa por travessões altera o sentido do período.', 'Travessões mantêm o valor explicativo.'),
      C('Na frase “O agente, porém, não autuou o condutor”, as vírgulas são obrigatórias por isolarem conjunção deslocada.', 'Conjunção intercalada.'),
      E('O ponto e vírgula não pode ser usado para separar orações coordenadas.', 'Pode, especialmente as longas ou com conjunção deslocada.'),
    ],
  },
  {
    id: 'concordancia', titulo: 'Concordância verbal e nominal', arts: 'aula completa',
    chaves: ['concordancia verbal e nominal', 'concordancia verbal', 'concordancia nominal', 'concordancia'],
    html: `
<h3>1. O ponto de partida: achar o sujeito</h3>
<p>A <b>concordância verbal</b> é a do verbo com o <b>sujeito</b> (número e pessoa). A <b>nominal</b> é a de artigos, adjetivos, numerais e pronomes com o <b>substantivo</b> (gênero e número). Em prova, o erro quase sempre está escondido num <b>sujeito posposto</b> ou distante do verbo.</p>
${passos([['Ache o verbo', ''], ['Pergunte “quem / o que” + verbo', 'a resposta é o sujeito'], ['Veja se o sujeito está depois do verbo', 'a banca adora inverter a ordem'], ['Confira número e pessoa', 'singular ou plural?']])}
${ex(`${lista([par('<b>Foram</b> apreendidos, na operação de ontem, <b>três caminhões</b>.', '<b>Foi</b> apreendido, na operação de ontem, três caminhões.'), par('<b>Faltam</b> dois dias para a prova.', '<b>Falta</b> dois dias para a prova.'), par('<b>Ocorreram</b> vários acidentes.', '<b>Ocorreu</b> vários acidentes.'), par('<b>Existem</b> falhas no sistema.', '<b>Existe</b> falhas no sistema.')])}`, 'Sujeito posposto')}
<h3>2. Concordância verbal: casos especiais</h3>
<table class="tab"><tr><th>Caso</th><th>Regra</th><th>Exemplo correto</th></tr>
<tr><td>Sujeito composto <b>anteposto</b></td><td>plural</td><td>O agente e o perito <b>chegaram</b>.</td></tr>
<tr><td>Sujeito composto <b>posposto</b></td><td>plural ou com o mais próximo</td><td><b>Chegaram</b> (ou <b>Chegou</b>) o agente e o perito.</td></tr>
<tr><td>Núcleos ligados por <b>ou</b></td><td>singular se exclusão; plural se ambos podem</td><td>Pedro ou Paulo <b>será</b> o chefe. · O frio ou o calor <b>prejudicam</b>.</td></tr>
<tr><td>Núcleos ligados por <b>com</b></td><td>plural (ou singular, com ênfase no primeiro)</td><td>O agente com o perito <b>vistoriaram</b>.</td></tr>
<tr><td><b>Mais de um</b></td><td>singular</td><td>Mais de um condutor <b>foi</b> autuado.</td></tr>
<tr><td><b>Um dos que</b></td><td>plural (preferível)</td><td>Ele foi um dos que mais <b>estudaram</b>.</td></tr>
<tr><td><b>A maioria de / grande parte de</b> + plural</td><td>singular ou plural</td><td>A maioria dos condutores <b>respeita</b> (ou <b>respeitam</b>) a lei.</td></tr>
<tr><td><b>Porcentagem</b></td><td>com o número ou com o termo que o acompanha</td><td>30% da frota <b>está</b> irregular. · 1% dos carros <b>foram</b> (ou <b>foi</b>) vistoriados.</td></tr>
<tr><td><b>Coletivo</b> no singular</td><td>singular</td><td>A multidão <b>invadiu</b> a pista.</td></tr>
<tr><td>Nome próprio no plural</td><td>com artigo plural, plural; sem artigo, singular</td><td>Os Estados Unidos <b>enviaram</b>… · Minas Gerais <b>produz</b>…</td></tr>
<tr><td><b>Que</b> (pronome relativo)</td><td>concorda com o antecedente</td><td>Fui eu que <b>fiz</b>. · Fomos nós que <b>fizemos</b>.</td></tr>
<tr><td><b>Quem</b></td><td>3ª pessoa do singular ou com o antecedente</td><td>Fui eu quem <b>fez</b> (ou <b>fiz</b>).</td></tr></table>
<h3>3. Verbos impessoais e o “se”</h3>
${cartoes([['🚫', 'Haver = existir ou ocorrer', 'sempre singular, também na locução: <b>Houve</b> acidentes; <b>Deve haver</b> vagas', COR.verm], ['⏳', 'Haver e fazer = tempo', 'singular: <b>Há</b> anos; <b>Faz</b> dez dias', COR.lar], ['🌦', 'Fenômenos da natureza', 'singular: <b>Choveu</b> muito; <b>Ventava</b>', COR.cinza], ['✅', 'Existir, ocorrer, acontecer, restar, faltar', 'concordam normalmente: <b>Existem</b> falhas; <b>Restam</b> dúvidas', COR.verde]])}
${lista([par('<b>Vendem-se</b> veículos. <b>Aplicaram-se</b> multas.', '<b>Vende-se</b> veículos.', 'verbo transitivo direto + se: passiva, concorda com o sujeito'), par('<b>Precisa-se</b> de agentes. <b>Trata-se</b> de crimes.', '<b>Precisam-se</b> de agentes.', 'verbo com preposição + se: sujeito indeterminado, singular'), par('<b>Deve haver</b> soluções.', '<b>Devem haver</b> soluções.', 'impessoalidade passa para o auxiliar'), par('<b>Devem existir</b> soluções.', '', '“existir” não é impessoal')])}
<h3>4. O verbo SER</h3>
<ul><li><b>Horas, datas e distâncias</b>: concorda com o número. “<b>São</b> duas horas.” “<b>É</b> uma hora.” “<b>É</b> meio-dia.” “Hoje <b>são</b> 3 de novembro” ou “Hoje <b>é</b> dia 3”. “Daqui até o posto <b>são</b> dez quilômetros.”</li><li>Sujeito <b>tudo, isto, isso, aquilo, o que</b> + predicativo plural: prefere-se o plural. “Tudo <b>são</b> flores.”</li><li><b>Pessoa</b> prevalece sobre coisa: “O responsável <b>sou</b> eu.” “O Brasil <b>são</b> vocês.”</li><li>Quantidade com “é muito, é pouco, é suficiente”: singular. “Dez reais <b>é</b> pouco.” “Dois anos <b>é</b> muito tempo.”</li></ul>
<h3>5. Concordância nominal</h3>
<table class="tab"><tr><th>Caso</th><th>Regra</th><th>Exemplo</th></tr>
<tr><td>Adjetivo <b>depois</b> de vários substantivos</td><td>com o mais próximo ou no plural</td><td>Rodovia e ponte <b>interditada</b> / <b>interditadas</b></td></tr>
<tr><td>Adjetivo <b>antes</b> de vários substantivos</td><td>com o mais próximo</td><td><b>Interditada</b> a rodovia e a ponte</td></tr>
<tr><td><b>É proibido, é necessário, é bom</b></td><td>sem determinante, invariável; com determinante, concorda</td><td>É <b>proibido</b> entrada. · É <b>proibida</b> a entrada.</td></tr>
<tr><td><b>Anexo, incluso, obrigado, mesmo, próprio, quite, leso</b></td><td>variam</td><td>Seguem <b>anexas</b> as planilhas. · Elas disseram “<b>obrigadas</b>”.</td></tr>
<tr><td><b>Menos, alerta, pseudo</b></td><td>invariáveis</td><td><b>Menos</b> pessoas. · Agentes <b>alerta</b>.</td></tr>
<tr><td><b>Meio</b></td><td>numeral varia; advérbio não</td><td><b>meia</b> hora · <b>meio</b> cansada</td></tr>
<tr><td><b>Bastante</b></td><td>pronome varia; advérbio não</td><td><b>bastantes</b> provas · provas <b>bastante</b> difíceis</td></tr>
<tr><td><b>Só</b></td><td>= sozinho varia; = somente não</td><td>Eles estavam <b>sós</b>. · <b>Só</b> eles sabiam.</td></tr>
<tr><td><b>Haja vista</b></td><td>invariável</td><td><b>Haja vista</b> os resultados.</td></tr>
<tr><td><b>Em anexo</b></td><td>invariável</td><td>Seguem <b>em anexo</b> as fotos.</td></tr></table>
${banca(`<ul><li>Sujeito <b>posposto</b> e afastado do verbo, com o verbo no singular para enganar.</li><li>Locução com <b>haver</b>: “<s>Devem haver</s> → <b>Deve haver</b>”.</li><li>Passiva sintética com sujeito plural: “<s>Aplicou-se</s> as penalidades → <b>Aplicaram-se</b>”.</li><li>“É proibido / é proibida” conforme o artigo.</li></ul>`)}
${dica('Para saber se o “se” é apassivador, passe para a passiva analítica: “Vendem-se carros” = “Carros <b>são vendidos</b>”. Se fizer sentido, o verbo concorda com o sujeito.')}
${peg('“<b>Existir</b>” não é impessoal: “<s>Existe</s> <b>Existem</b> muitas vagas”. Já “<b>Há</b> muitas vagas” está certo, porque “haver” é impessoal.')}`,
    quiz: [
      E('A frase “Devem haver soluções para o congestionamento” está de acordo com a norma-padrão.', 'Deve haver.'),
      C('Em “Aplicaram-se várias multas durante a operação”, o verbo está no plural porque concorda com o sujeito “várias multas”.', 'Passiva sintética.'),
      C('Está correta a frase “Mais de um condutor foi flagrado sem cinto”.', '“Mais de um” leva o singular.'),
      E('A frase “Precisam-se de mais agentes na operação” está correta.', 'Verbo com preposição: “Precisa-se de”.'),
      C('Em “É proibida a entrada de pessoas estranhas”, o adjetivo concorda com “entrada” porque o substantivo está determinado pelo artigo.', 'Com determinante, concorda.'),
      E('A forma “Seguem anexo as fotografias do acidente” está de acordo com a norma-padrão.', '“Anexas”; ou “em anexo”.'),
      C('Em “Hoje são 3 de novembro”, o verbo “ser” concorda com o numeral.', 'Datas: concorda com o número.'),
      E('Na frase “Existe muitas irregularidades no contrato”, o verbo está corretamente flexionado.', '“Existem”: existir concorda com o sujeito.'),
    ],
  },
  {
    id: 'regencia', titulo: 'Regência verbal e nominal', arts: 'aula completa',
    chaves: ['regencia verbal e nominal', 'regencia verbal', 'regencia nominal', 'regencia'],
    html: `
<h3>1. O que é regência</h3>
<p>É a relação entre um termo que <b>exige</b> complemento (o regente) e o complemento (o regido). A pergunta é sempre: o verbo ou o nome pede <b>preposição</b>? <b>Qual</b>? A regência pode mudar conforme o <b>sentido</b> do verbo, e é a base da crase.</p>
<h3>2. Verbos que mudam de sentido conforme a regência</h3>
<table class="tab"><tr><th>Verbo</th><th>Sentido → regência</th><th>Exemplo</th></tr>
<tr><td><b>Assistir</b></td><td>ver → <b>a</b> · ajudar → direto · morar → <b>em</b> · caber (direito) → <b>a</b></td><td>Assistimos <b>ao</b> jogo. · O médico assistiu <b>o</b> ferido. · Assiste <b>em</b> Belo Vale. · Assiste <b>ao</b> réu o direito de calar.</td></tr>
<tr><td><b>Aspirar</b></td><td>desejar → <b>a</b> · inalar → direto</td><td>Aspira <b>ao</b> cargo. · Aspirou <b>a</b> fumaça.</td></tr>
<tr><td><b>Visar</b></td><td>pretender → <b>a</b> · mirar ou dar visto → direto</td><td>Visa <b>ao</b> bem comum. · Visou <b>o</b> alvo. · Visou <b>o</b> passaporte.</td></tr>
<tr><td><b>Proceder</b></td><td>realizar → <b>a</b> · originar-se → <b>de</b> · ter fundamento → intransitivo</td><td>Procedeu-se <b>à</b> vistoria. · O ônibus procede <b>de</b> BH. · A denúncia não procede.</td></tr>
<tr><td><b>Querer</b></td><td>desejar → direto · estimar → <b>a</b></td><td>Quero <b>o</b> cargo. · Quero muito <b>aos</b> meus pais.</td></tr>
<tr><td><b>Implicar</b></td><td>acarretar → direto · antipatizar → <b>com</b> · envolver → direto e <b>em</b></td><td>A infração implica <b>multa</b>. · Implica <b>com</b> todos. · Implicou-o <b>no</b> crime.</td></tr>
<tr><td><b>Agradar</b></td><td>satisfazer → <b>a</b> · acariciar → direto</td><td>A decisão agradou <b>aos</b> servidores. · Agradou <b>o</b> cão.</td></tr></table>
<h3>3. Verbos de regência fixa que mais caem</h3>
${lista([par('Obedeça <b>às</b> leis. Desobedeceu <b>ao</b> agente.', 'Obedeça <b>as</b> leis.', 'obedecer e desobedecer: “a”'), par('Prefiro estudar <b>a</b> dormir.', 'Prefiro <b>mais</b> estudar <b>do que</b> dormir.', 'preferir algo a algo'), par('Chegou <b>ao</b> posto. Foi <b>à</b> delegacia.', 'Chegou <b>no</b> posto.', 'chegar e ir pedem “a” na norma-padrão'), par('Informou <b>o</b> fato <b>ao</b> delegado. / Informou <b>o</b> delegado <b>do</b> fato.', '', 'informar, avisar, comunicar (comunicar só “algo a alguém”)'), par('Pagou <b>a</b> multa. Pagou <b>ao</b> despachante.', '', 'coisa: direto; pessoa: indireto (pagar, perdoar)'), par('Esqueci <b>o</b> documento. / Esqueci-me <b>do</b> documento.', 'Esqueci <b>do</b> documento.', 'esquecer e lembrar: com pronome, “de”'), par('Namora <b>a</b> colega.', 'Namora <b>com</b> a colega.', 'namorar: direto'), par('Simpatizo <b>com</b> a ideia.', 'Simpatizo-<b>me</b> com a ideia.', 'simpatizar não é pronominal'), par('Custou-<b>me</b> entender.', 'Eu custei a entender.', 'custar (= ser difícil): o sujeito é a coisa difícil'), par('Moro <b>na</b> Rua X. Residente <b>na</b> Rua X.', 'Residente <b>à</b> Rua X.', 'morar, residir, situar: “em”')])}
<h3>4. Regência nominal</h3>
<table class="tab"><tr><th>Nomes</th><th>Preposição</th></tr>
<tr><td>acessível, adequado, alheio, favorável, contrário, obediente, imune, inerente, nocivo, propenso</td><td><b>a</b></td></tr>
<tr><td>apto, idôneo</td><td><b>a</b> ou <b>para</b></td></tr>
<tr><td>residente, situado, domiciliado, sito, versado</td><td><b>em</b></td></tr>
<tr><td>compatível, contemporâneo, cuidadoso, solidário</td><td><b>com</b></td></tr>
<tr><td>ansioso, ávido, capaz, digno, passível, suspeito, cheio</td><td><b>de</b> (ansioso também <b>por</b>)</td></tr>
<tr><td>respeito</td><td><b>a</b>, <b>com</b>, <b>para com</b>, <b>por</b></td></tr></table>
<h3>5. Pronome relativo leva a preposição do verbo</h3>
<p>Se o verbo da oração adjetiva pede preposição, ela vem <b>antes do relativo</b>. Para descobrir, ponha a oração na ordem direta.</p>
${lista([par('A lei <b>a que</b> todos devem obedecer.', 'A lei <b>que</b> todos devem obedecer.', 'obedecer a'), par('O cargo <b>a que</b> aspiro.', '', 'aspirar a'), par('A rodovia <b>em que</b> ocorreu o acidente.', '', 'ocorrer em'), par('O delegado <b>de quem</b> te falei.', '', 'falar de'), par('A operação <b>de que</b> participei.', 'A operação <b>que</b> participei.', 'participar de'), par('Os direitos <b>de que</b> dispomos.', '', 'dispor de')])}
${banca(`<ul><li>Troca de verbo: “assistir ao jogo” → “ver o jogo” (a preposição cai).</li><li>Relativo sem a preposição: “<s>A norma que nos referimos</s> → A norma <b>a que</b> nos referimos”.</li><li>“Preferir mais… do que” é sempre <b>erro</b>.</li><li>“Implicar em” (= acarretar) é aceito por alguns dicionários, mas a banca tradicional considera a forma correta “implicar” <b>sem</b> preposição.</li></ul>`)}
${dica('Para achar a preposição do relativo, <b>coloque a oração na ordem direta</b>: “a lei que obedecemos” → “obedecemos <b>à</b> lei” → “a lei <b>a que</b> obedecemos”.')}
${peg('“Assistir” (ver) é transitivo indireto e, na norma tradicional, <b>não</b> admite voz passiva: “<s>O jogo foi assistido</s>”. E “obedecer” e “desobedecer”, apesar de indiretos, aceitam a passiva: “As leis <b>são obedecidas</b>”.')}`,
    quiz: [
      C('Em “O cargo a que o candidato aspira exige dedicação”, a regência de “aspirar” está correta.', 'Aspirar (desejar) pede “a”.'),
      E('A frase “Prefiro mais estudar do que sair” está de acordo com a norma-padrão.', 'Prefiro estudar a sair.'),
      C('Em “Procedeu-se à vistoria do veículo”, o acento grave é obrigatório.', 'Proceder (realizar) + a.'),
      E('A frase “A operação que participei durou três dias” está correta.', 'Participar de: “de que participei”.'),
      C('Em “O médico assistiu o ferido”, o verbo “assistir” tem sentido de ajudar e é transitivo direto.', 'Assistir (ajudar): direto.'),
      E('Na norma-padrão, a forma “Ele reside à Rua das Flores” está correta.', 'Residir pede “em”: na Rua das Flores.'),
      C('Em “Esqueci-me do documento”, o verbo pronominal exige a preposição “de”.', 'Esquecer-se de.'),
      E('A frase “Simpatizo-me com a proposta” está de acordo com a norma-padrão.', 'Simpatizar não é pronominal.'),
    ],
  },
];
