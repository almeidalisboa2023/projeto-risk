// Língua Portuguesa — parte 2: concordância, regência, crase, colocação, reescrita e redação oficial.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, banca, C, E } from './blocos.js';

export const PARTE2 = [
  {
    id: 'concordancia', titulo: 'Concordância verbal e nominal', arts: 'verbo com sujeito; nome com nome',
    chaves: ['concordancia verbal e nominal', 'concordancia verbal', 'concordancia nominal', 'concordancia'],
    html: `
<h3>A ideia central</h3>
<p><b>Concordância verbal</b>: o verbo concorda em número e pessoa com o <b>sujeito</b>. <b>Concordância nominal</b>: artigo, adjetivo, numeral e pronome concordam em gênero e número com o <b>substantivo</b>. O passo 1 é sempre <b>achar o sujeito</b>, que muitas vezes vem depois do verbo.</p>
${ex('<p>“<s>Foi</s> <b>Foram</b> apreendidos, na operação de ontem, <b>três caminhões</b>.” → o sujeito (três caminhões) está posposto e no plural.</p>')}
<h3>1. Concordância verbal: casos que mais caem</h3>
<table class="tab"><tr><th>Caso</th><th>Regra</th><th>Exemplo correto</th></tr>
<tr><td>Sujeito composto <b>anteposto</b></td><td>plural</td><td>O agente e o perito <b>chegaram</b>.</td></tr>
<tr><td>Sujeito composto <b>posposto</b></td><td>plural ou concorda com o mais próximo</td><td><b>Chegaram</b> (ou <b>Chegou</b>) o agente e o perito.</td></tr>
<tr><td><b>Mais de um</b></td><td>singular (salvo reciprocidade)</td><td>Mais de um condutor <b>foi</b> autuado.</td></tr>
<tr><td><b>Um dos que</b></td><td>plural (preferível)</td><td>Ele foi um dos que <b>mais estudaram</b>.</td></tr>
<tr><td><b>Porcentagem</b></td><td>com o numeral ou com o termo que o segue</td><td>30% da frota <b>está</b> irregular / 1% dos carros <b>foi</b> vistoriado</td></tr>
<tr><td>Coletivo no singular</td><td>singular</td><td>A multidão <b>invadiu</b> a pista.</td></tr>
<tr><td><b>Haver</b> (= existir, ocorrer) e <b>fazer</b> (tempo)</td><td>sempre singular, também na locução</td><td><b>Houve</b> acidentes. <b>Deve haver</b> vagas. <b>Faz</b> anos.</td></tr>
<tr><td><b>Existir, ocorrer, acontecer</b></td><td>concordam normalmente</td><td><b>Existem</b> falhas. <b>Ocorreram</b> acidentes.</td></tr>
<tr><td>Verbo transitivo direto + <b>se</b> (passiva)</td><td>concorda com o sujeito</td><td><b>Vendem-se</b> veículos. <b>Aplicaram-se</b> multas.</td></tr>
<tr><td>Verbo com preposição + <b>se</b> (indeterminado)</td><td>singular</td><td><b>Precisa-se</b> de agentes. <b>Trata-se</b> de crimes.</td></tr>
<tr><td>Pronome relativo <b>que</b></td><td>concorda com o antecedente</td><td>Fui eu que <b>fiz</b>. Fomos nós que <b>fizemos</b>.</td></tr>
<tr><td>Pronome relativo <b>quem</b></td><td>3ª pessoa do singular ou com o antecedente</td><td>Fui eu quem <b>fez</b> (ou <b>fiz</b>).</td></tr></table>
${box('Verbo SER: concordância especial', '<ul><li>Horas, datas e distâncias: concorda com o número. “<b>São</b> duas horas.” “<b>É</b> uma hora.” “Hoje <b>são</b> 3 de novembro” (ou “Hoje <b>é</b> dia 3”).</li><li>Sujeito “tudo, isto, isso, aquilo” + predicativo plural: prefere-se o plural. “Tudo <b>são</b> flores.”</li><li>Pessoa prevalece: “O responsável <b>sou</b> eu.”</li><li>Quantidade com “é muito, é pouco”: singular. “Dez reais <b>é</b> pouco.”</li></ul>')}
<h3>2. Concordância nominal</h3>
<ul><li><b>Adjetivo depois</b> de vários substantivos: concorda com o mais próximo ou vai para o plural. “Rodovia e ponte <b>interditada</b>” ou “<b>interditadas</b>”.</li><li><b>Adjetivo antes</b>: concorda com o mais próximo. “<b>Interditada</b> a rodovia e a ponte.”</li><li><b>É proibido / é necessário / é bom</b>: sem artigo, invariável; com artigo, concorda. “<b>É proibido</b> entrada.” x “<b>É proibida a</b> entrada.”</li><li><b>Anexo, incluso, obrigado, mesmo, próprio, quite</b>: variam. “Seguem <b>anexas</b> as planilhas.” “Elas disseram: <b>obrigadas</b>.”</li><li><b>Menos, alerta, pseudo</b>: invariáveis. “<b>Menos</b> pessoas.” “Os agentes estão <b>alerta</b>.”</li><li><b>Meio</b>: “<b>meia</b> hora” (numeral, varia) x “<b>meio</b> cansada” (advérbio, invariável).</li><li><b>Bastante</b>: “<b>bastantes</b> provas” (varia) x “provas <b>bastante</b> difíceis” (invariável).</li><li><b>Haja vista</b>: expressão invariável. “<b>Haja vista</b> os resultados.”</li></ul>
${banca('<ul><li>Sujeito <b>posposto</b> e afastado do verbo, com o verbo no singular para enganar.</li><li>Locução com <b>haver</b>: “<s>Devem haver</s> <b>Deve haver</b> explicações.”</li><li>Passiva sintética com sujeito plural: “<s>Aplicou-se</s> <b>Aplicaram-se</b> as penalidades.”</li></ul>')}
${dica('Para saber se o “se” é apassivador, passe para a passiva analítica: “Vendem-se carros” = “Carros <b>são vendidos</b>”. Se fizer sentido, o verbo concorda com o sujeito.')}
${peg('“<b>Existir</b>” não é impessoal como “haver”. “<s>Existe</s> <b>Existem</b> muitas vagas” está errado com “existe”, mas “<b>Há</b> muitas vagas” está certo.')}`,
    quiz: [E('A frase “Devem haver soluções para o congestionamento” está de acordo com a norma-padrão.', 'Haver = existir é impessoal e transmite a impessoalidade ao auxiliar: “Deve haver soluções”.'), C('Em “Aplicaram-se várias multas durante a operação”, o verbo está no plural porque concorda com o sujeito “várias multas”.', 'Passiva sintética: o verbo concorda com o sujeito paciente.'), C('Está correta a frase “Mais de um condutor foi flagrado sem cinto”.', '“Mais de um” leva o verbo ao singular.')],
  },
  {
    id: 'regencia', titulo: 'Regência verbal e nominal', arts: 'preposições exigidas',
    chaves: ['regencia verbal e nominal', 'regencia verbal', 'regencia nominal', 'regencia'],
    html: `
<h3>O que é regência</h3>
<p>É a relação entre um termo que <b>exige</b> complemento (regente) e o complemento (regido). Responde: o verbo ou o nome pede <b>preposição</b>? Qual? A regência muda conforme o <b>sentido</b> do verbo.</p>
<h3>1. Verbos que mudam de sentido</h3>
<table class="tab"><tr><th>Verbo</th><th>Sentido e regência</th><th>Exemplo</th></tr>
<tr><td><b>Assistir</b></td><td>ver → VTI (<b>a</b>) · ajudar → VTD · morar → VI (<b>em</b>)</td><td>Assistimos <b>ao</b> jogo. O médico assistiu <b>o</b> ferido.</td></tr>
<tr><td><b>Aspirar</b></td><td>desejar → VTI (<b>a</b>) · inalar → VTD</td><td>Aspira <b>ao</b> cargo. Aspirou <b>a</b> fumaça.</td></tr>
<tr><td><b>Visar</b></td><td>pretender → VTI (<b>a</b>) · mirar, dar visto → VTD</td><td>Visa <b>ao</b> bem comum. Visou <b>o</b> passaporte.</td></tr>
<tr><td><b>Proceder</b></td><td>realizar → VTI (<b>a</b>) · ter fundamento → VI</td><td>Procedeu-se <b>à</b> vistoria. A denúncia não procede.</td></tr>
<tr><td><b>Implicar</b></td><td>acarretar → VTD (sem “em”, na norma tradicional)</td><td>A infração implica <b>multa</b>.</td></tr></table>
<h3>2. Verbos com regência fixa que mais caem</h3>
<ul><li><b>Obedecer / desobedecer</b>: VTI (a). “Obedeça <b>às</b> leis.” “Desobedeceu <b>ao</b> agente.”</li><li><b>Preferir</b>: “preferir <b>algo a</b> algo”, sem “mais” e sem “do que”. “Prefiro estudar <b>a</b> dormir.”</li><li><b>Chegar / ir</b>: com destino, preposição <b>a</b>. “Chegou <b>ao</b> posto.” (“chegar em” é coloquial)</li><li><b>Informar, avisar, comunicar</b>: algo a alguém ou alguém de algo. “Informou <b>o</b> fato <b>ao</b> delegado” / “Informou <b>o</b> delegado <b>do</b> fato.”</li><li><b>Pagar / perdoar</b>: coisa = objeto direto; pessoa = objeto indireto. “Pagou <b>a</b> multa.” “Pagou <b>ao</b> despachante.”</li><li><b>Esquecer / lembrar</b>: sem pronome, VTD; com pronome, VTI (de). “Esqueci <b>o</b> documento.” “Esqueci-<b>me do</b> documento.”</li><li><b>Namorar, ver, encontrar</b>: VTD. “Namora <b>a</b> colega” (sem “com”).</li></ul>
<h3>3. Regência nominal</h3>
<table class="tab"><tr><th>Nome</th><th>Preposição</th></tr>
<tr><td>acessível, adequado, alheio, favorável, contrário, obediente, apto</td><td><b>a</b> (apto também <b>para</b>)</td></tr>
<tr><td>residente, situado, domiciliado, sito</td><td><b>em</b> (“residente <b>na</b> Rua X”)</td></tr>
<tr><td>compatível, contemporâneo, cuidadoso</td><td><b>com</b></td></tr>
<tr><td>ansioso, ávido, capaz, digno, passível</td><td><b>de</b> (ansioso também <b>por</b>)</td></tr></table>
<h3>4. Pronome relativo leva a preposição do verbo</h3>
<p>Se o verbo da oração adjetiva pede preposição, ela vem <b>antes do relativo</b>.</p>
${ex('<ul><li>“A lei <b>a que</b> todos devem obedecer” (obedecer <b>a</b>).</li><li>“O cargo <b>a que</b> aspiro” (aspirar <b>a</b>).</li><li>“A rodovia <b>em que</b> ocorreu o acidente” (ocorrer <b>em</b>).</li><li>“O delegado <b>de quem</b> te falei” (falar <b>de</b>).</li></ul>')}
${banca('<ul><li>Troca de verbo: “assistir ao jogo” → “ver o jogo” (a preposição cai).</li><li>Relativo sem a preposição: “<s>A norma que</s> <b>A norma a que</b> nos referimos.”</li><li>“Preferir mais… do que” é sempre <b>erro</b>.</li></ul>')}
${dica('Para descobrir a preposição do relativo, <b>coloque a oração na ordem direta</b>: “a lei que obedecemos” → “obedecemos <b>à</b> lei” → então: “a lei <b>a que</b> obedecemos”.')}
${peg('“Assistir” no sentido de <b>ver</b> é VTI e <b>não</b> admite voz passiva na norma tradicional: “<s>O jogo foi assistido</s>”. Prefira “O jogo foi visto” ou “Assistiram ao jogo”.')}`,
    quiz: [C('Na frase “O cargo a que o candidato aspira exige dedicação”, a regência do verbo “aspirar” está correta.', 'Aspirar (desejar) pede a preposição “a”, que vai antes do relativo.'), E('A frase “Prefiro mais estudar do que sair” está de acordo com a norma-padrão.', 'O correto é “Prefiro estudar a sair”, sem “mais” e sem “do que”.'), C('Em “Procedeu-se à vistoria do veículo”, o acento grave é obrigatório, pois “proceder”, no sentido de realizar, exige a preposição “a”.', 'Preposição “a” (de proceder) + artigo “a” (de vistoria) = crase.')],
  },
  {
    id: 'crase', titulo: 'Crase', arts: 'a + a',
    chaves: ['crase', 'acento grave'],
    html: `
<h3>O que é crase</h3>
<p>Crase é a <b>fusão</b> da preposição <b>a</b> com o artigo feminino <b>a(s)</b> ou com o “a” inicial de <b>aquele(s), aquela(s), aquilo</b>. É marcada pelo acento grave (à).</p>
${passos([['O termo anterior exige a preposição “a”?', 'vou a, obedeço a, refiro-me a, cheguei a'], ['A palavra seguinte é feminina e aceita artigo “a”?', 'a praia, a lei, a delegacia'], ['As duas respostas são sim?', 'então há crase: vou à praia']])}
${dica('Troque a palavra feminina por uma <b>masculina</b>. Se aparecer “<b>ao</b>”, há crase. “Vou <b>à</b> delegacia” → “Vou <b>ao</b> posto”. “Conheço <b>a</b> delegada” → “Conheço <b>o</b> delegado” (sem crase).')}
<h3>1. Crase obrigatória</h3>
<ul><li><b>Horas determinadas</b>: “às 8h”, “das 8h às 18h”, “à meia-noite”.</li><li><b>Locuções femininas</b> adverbiais, prepositivas e conjuntivas: à noite, às pressas, à vista, à toa, à medida que, à custa de, à procura de, à espera de, às vezes.</li><li><b>À moda de / à maneira de</b>, mesmo subentendida: “bife à milanesa”, “gol à Pelé”.</li><li><b>Aquele, aquela, aquilo</b> depois de termo que exige “a”: “Refiro-me <b>àquele</b> agente.”</li><li><b>Distância determinada</b>: “O carro estava <b>à</b> distância de 50 metros.”</li></ul>
<h3>2. Crase proibida</h3>
${cartoes([['♂', 'Antes de masculino', 'andar a pé, a cavalo', COR.verm], ['⚡', 'Antes de verbo', 'começou a chover; dispostos a colaborar', COR.verm], ['👤', 'Antes de pronomes', 'a ela, a você, a Vossa Excelência, a esta, a cada', COR.verm], ['🔁', 'Entre palavras repetidas', 'cara a cara, frente a frente, gota a gota', COR.verm], ['1️⃣', '“a” singular antes de plural', 'refiro-me a pessoas (sem artigo)', COR.verm], ['❓', 'Antes de artigo indefinido', 'chegou a uma conclusão', COR.verm]])}
<p>Exceção entre os pronomes: <b>senhora, senhorita, dona, madame</b> aceitam artigo. “Entreguei o documento <b>à</b> senhora.”</p>
<h3>3. Casos especiais</h3>
<table class="tab"><tr><th>Caso</th><th>Regra</th></tr>
<tr><td><b>Lugares</b></td><td>“Vou a… / volto <b>da</b>” → crase. “Vou a… / volto <b>de</b>” → sem crase. Vou <b>à</b> Bahia (volto da Bahia); vou <b>a</b> Brasília (volto de Brasília).</td></tr>
<tr><td><b>Casa</b> (o próprio lar)</td><td>sem determinante, sem crase: “Voltou <b>a</b> casa.” Com determinante: “Voltou <b>à</b> casa dos pais.”</td></tr>
<tr><td><b>Terra</b> (chão firme)</td><td>“Os marinheiros desceram <b>a</b> terra.” Terra natal ou planeta: crase. “Voltou <b>à</b> terra natal.”</td></tr>
<tr><td><b>Facultativa</b></td><td>antes de possessivo feminino singular (“<b>à/a</b> sua equipe”), de nome próprio feminino de pessoa (“<b>à/a</b> Maria”) e depois de “até” (“até <b>à/a</b> praia”).</td></tr></table>
${banca('<ul><li>“O acento grave é <b>facultativo</b>” em possessivo ou depois de “até”: item certo.</li><li>Crase antes de verbo ou de masculino: sempre errado.</li><li>“As pessoas <b>a</b> quem me refiro”: sem crase, pois “quem” não aceita artigo.</li></ul>')}
${peg('“Às vezes” (= de vez em quando) tem crase. “Fazer as vezes de” (= substituir) <b>não</b> tem: “O cabo fez <b>as</b> vezes do sargento.”')}`,
    quiz: [E('Em “O agente começou à verificar os documentos”, o emprego do acento grave está correto.', 'Não há crase antes de verbo.'), C('Na frase “Entregou o relatório à sua chefe”, o acento grave é facultativo.', 'Antes de pronome possessivo feminino singular, a crase é facultativa.'), C('Em “Voltarei a Brasília amanhã”, não há crase porque se diz “volto de Brasília”.', 'Regra do “vou a, volto de”: sem crase.')],
  },
  {
    id: 'colocacao', titulo: 'Colocação dos pronomes átonos', arts: 'próclise, ênclise e mesóclise',
    chaves: ['colocacao dos pronomes atonos', 'colocacao pronominal', 'colocacao dos pronomes', 'pronomes atonos'],
    html: `
<h3>Os três lugares do pronome</h3>
<p>Os pronomes oblíquos átonos (<b>me, te, se, o, a, lhe, nos, vos</b> e variações) podem ficar antes, no meio ou depois do verbo.</p>
${cartoes([['⬅️', 'Próclise', 'antes do verbo: “Não <b>me</b> disse.”', COR.azul], ['⏺', 'Mesóclise', 'no meio: “Dir-<b>te</b>-ei.”', COR.roxo], ['➡️', 'Ênclise', 'depois: “Disse-<b>me</b> a verdade.”', COR.verde]])}
<h3>1. Próclise obrigatória: palavras que “puxam” o pronome</h3>
<ul><li><b>Palavras negativas</b>: não, nunca, jamais, ninguém, nada. “<b>Não</b> se esqueça do documento.”</li><li><b>Advérbios</b> sem vírgula: “<b>Aqui</b> se trabalha.” “<b>Sempre</b> o vejo.” (Com vírgula, a atração some: “Aqui, trabalha-se.”)</li><li><b>Pronomes relativos</b>: “O agente <b>que</b> me abordou…”</li><li><b>Pronomes indefinidos</b>: “<b>Alguém</b> o avisou.” “<b>Tudo</b> se resolveu.”</li><li><b>Pronomes demonstrativos</b> neutros: “<b>Isso</b> me preocupa.”</li><li><b>Conjunções subordinativas</b>: “<b>Quando</b> o vi…”, “<b>Embora</b> se esforce…”, “<b>Se</b> me chamarem…”</li><li>Frases <b>exclamativas, interrogativas</b> e <b>optativas</b> (desejo): “Quem <b>te</b> contou?” “Deus <b>o</b> abençoe!”</li></ul>
<h3>2. Ênclise obrigatória</h3>
<ul><li><b>Início de frase</b>: a norma-padrão não começa frase com pronome oblíquo. “<b>Entregaram-me</b> o laudo.” (e não “Me entregaram”)</li><li><b>Imperativo afirmativo</b>: “<b>Apresente-me</b> a CNH.”</li><li><b>Gerúndio</b> sem a preposição “em”: “Saiu, <b>deixando-o</b> ferido.”</li><li><b>Infinitivo impessoal</b> (sem palavra atrativa): “É preciso <b>respeitá-lo</b>.”</li></ul>
<h3>3. Mesóclise</h3>
<p>Só com <b>futuro do presente</b> e <b>futuro do pretérito</b>, quando não há palavra atrativa. “<b>Realizar-se-á</b> a operação.” “<b>Dir-lhe-ia</b> a verdade.”</p>
${box('Nunca ênclise com futuro nem com particípio', '<ul><li>“<s>Farei-o</s>” ✗ → “<b>Fá-lo-ei</b>” ou, com atrativa, “<b>Não o</b> farei”.</li><li>“<s>Tinha ferido-se</s>” ✗ → “<b>Tinha-se</b> ferido” ou “<b>Se tinha</b> ferido” (com atrativa).</li></ul>')}
<h3>4. Locuções verbais</h3>
<ul><li>Auxiliar + <b>infinitivo ou gerúndio</b>: o pronome pode ir depois do auxiliar ou depois do principal. “Quero-<b>lhe</b> falar” / “Quero falar-<b>lhe</b>”. Com palavra atrativa, também antes do auxiliar: “Não <b>lhe</b> quero falar.”</li><li>Auxiliar + <b>particípio</b>: pronome junto ao <b>auxiliar</b>, nunca depois do particípio.</li></ul>
${ex('<p>Formas do pronome depois de verbo terminado em <b>r, s, z</b>: o pronome vira <b>lo/la</b> e o verbo perde a letra. “Vou <b>respeitar + o</b>” → “Vou <b>respeitá-lo</b>”. Depois de som nasal (am, em, ão), vira <b>no/na</b>: “<b>Viram + o</b>” → “<b>Viram-no</b>”.</p>')}
${dica('Atrativas mais cobradas: “<b>NÃO, QUE, QUANDO, QUEM, ALGUÉM, NADA, SEMPRE, JÁ</b>”. Viu uma delas logo antes do verbo? Próclise.')}
${peg('Advérbio seguido de <b>vírgula</b> perde a força atrativa. “<b>Ontem</b> me ligaram” (próclise) x “<b>Ontem</b>, ligaram-me” (ênclise).')}`,
    quiz: [C('Na frase “Ninguém o avisou sobre a interdição”, a próclise é obrigatória em razão do pronome indefinido.', 'Pronomes indefinidos atraem o oblíquo para antes do verbo.'), E('A construção “Me entregaram a notificação ontem” está de acordo com a norma-padrão escrita.', 'A norma-padrão não inicia frase com pronome oblíquo átono: “Entregaram-me a notificação”.'), C('Em “Realizar-se-á a audiência amanhã”, a mesóclise está corretamente empregada.', 'Futuro do presente, sem palavra atrativa: mesóclise.')],
  },
  {
    id: 'reescrita', titulo: 'Reescrita de frases e significação das palavras', arts: 'paráfrase, vozes e discurso',
    chaves: ['reescrita de frases', 'reescrita', 'significacao das palavras', 'substituicao de palavras', 'semantica'],
    html: `
<h3>O que a banca quer saber</h3>
<p>Ao reescrever um trecho, a nova versão mantém a <b>correção gramatical</b> e o <b>sentido original</b>? São duas checagens separadas: a frase pode estar correta e ter mudado o sentido, ou manter o sentido com erro gramatical.</p>
${cartoes([['✅', 'Correção', 'concordância, regência, crase, pontuação e colocação', COR.verde], ['🎯', 'Sentido', 'mesma informação, mesmas relações lógicas', COR.azul]])}
<h3>1. Voz ativa ↔ voz passiva</h3>
<p>O <b>objeto direto</b> da ativa vira <b>sujeito</b> da passiva, e o verbo auxiliar “ser” fica no <b>mesmo tempo</b> do verbo original.</p>
<table class="tab"><tr><th>Ativa</th><th>Passiva analítica</th></tr>
<tr><td>O agente <b>multou</b> o condutor.</td><td>O condutor <b>foi multado</b> pelo agente.</td></tr>
<tr><td>O agente <b>multava</b> os condutores.</td><td>Os condutores <b>eram multados</b> pelo agente.</td></tr>
<tr><td>O agente <b>multará</b> o condutor.</td><td>O condutor <b>será multado</b> pelo agente.</td></tr>
<tr><td>O agente <b>tinha multado</b> o condutor.</td><td>O condutor <b>tinha sido multado</b> pelo agente.</td></tr></table>
<h3>2. Discurso direto ↔ indireto</h3>
<table class="tab"><tr><th>Direto</th><th>Indireto</th></tr>
<tr><td>presente: “Eu <b>estou</b> habilitado”</td><td>imperfeito: disse que <b>estava</b> habilitado</td></tr>
<tr><td>pretérito perfeito: “Eu <b>parei</b>”</td><td>mais-que-perfeito: disse que <b>tinha parado</b></td></tr>
<tr><td>futuro: “Eu <b>vou</b> pagar”</td><td>futuro do pretérito: disse que <b>iria</b> pagar</td></tr>
<tr><td>este, aqui, hoje, amanhã</td><td>aquele, ali, naquele dia, no dia seguinte</td></tr>
<tr><td>eu, meu</td><td>ele, seu</td></tr></table>
<h3>3. Substituição de palavras: significação</h3>
<ul><li><b>Sinônimos</b> perfeitos quase não existem: o sinônimo precisa servir <b>naquele contexto</b>.</li><li><b>Polissemia</b>: uma palavra com vários sentidos (“a <b>pena</b> do crime” x “a <b>pena</b> da ave”).</li><li><b>Denotação</b> (sentido literal) x <b>conotação</b> (figurado): “A notícia foi um <b>balde de água fria</b>.”</li><li><b>Hiperônimo</b> (sentido geral: veículo) e <b>hipônimo</b> (específico: caminhão). Substituir hipônimo por hiperônimo mantém a coesão (“o caminhão… o veículo”).</li></ul>
<h3>4. Figuras de linguagem que mais caem</h3>
${cartoes([['🌉', 'Metáfora', 'comparação implícita: “ele é uma rocha”', COR.azul], ['🔁', 'Metonímia', 'parte pelo todo, autor pela obra: “leu Machado”', COR.verde], ['🕊', 'Eufemismo', 'suaviza: “partiu desta para melhor”', COR.roxo], ['😏', 'Ironia', 'diz o contrário do que pensa', COR.lar], ['📈', 'Hipérbole', 'exagero: “já te disse mil vezes”', COR.verm]])}
${box('Reorganizações que costumam manter o sentido', '<ul><li>Oração reduzida ↔ desenvolvida: “<b>Ao chegar</b>, o agente…” = “<b>Quando chegou</b>, o agente…”</li><li>Nominalização: “<b>Fiscalizar</b> as rodovias é…” = “A <b>fiscalização</b> das rodovias é…”</li><li>Troca de conector de <b>mesmo valor</b>: porém → contudo; porque → visto que; embora → ainda que.</li></ul>')}
${banca('<ul><li>Cebraspe: “A substituição de X por Y <b>preservaria a correção e o sentido</b>”. O item só é certo se as duas coisas forem verdadeiras.</li><li>Atenção a mudanças sutis: “só” passou de lugar (“só ele chegou” x “ele só chegou”), artigo definido virou indefinido, singular virou plural.</li></ul>')}
${peg('Mudar a posição do adjetivo pode mudar o sentido: “um <b>grande</b> homem” (importante) x “um homem <b>grande</b>” (alto). E “<b>só</b>” muda conforme a posição: “Só o agente viu” ≠ “O agente só viu”.')}`,
    quiz: [C('A passagem de “O agente autuava os condutores” para a voz passiva resulta em “Os condutores eram autuados pelo agente”.', 'O auxiliar “ser” fica no mesmo tempo do verbo da ativa (imperfeito).'), E('Ao transpor “Eu vou pagar a multa amanhã” para o discurso indireto, obtém-se, corretamente, “Ele disse que vai pagar a multa amanhã”.', 'No indireto: “Ele disse que iria pagar a multa no dia seguinte”.'), C('Em “O caminhão tombou na curva; o veículo transportava grãos”, o termo “veículo” retoma “caminhão” por hiperonímia.', 'Veículo é o termo geral (hiperônimo) de caminhão.')],
  },
  {
    id: 'redacao-oficial', titulo: 'Redação oficial', arts: 'Manual de Redação da Presidência da República, 3ª ed.',
    chaves: ['correspondencia oficial', 'redacao oficial', 'manual de redacao'],
    html: `
<h3>O que é</h3>
<p>Redação oficial é o modo como o <b>Poder Público</b> redige atos normativos e comunicações. A referência é o <b>Manual de Redação da Presidência da República</b> (3ª edição, 2018).</p>
<h3>1. Atributos da redação oficial</h3>
${cartoes([['🔍', 'Clareza e precisão', 'entendida na primeira leitura, sem ambiguidade', COR.azul], ['🎯', 'Objetividade', 'vai direto ao ponto', COR.verde], ['✂️', 'Concisão', 'máximo de informação com o mínimo de palavras', COR.lar], ['🔗', 'Coesão e coerência', 'texto bem amarrado e lógico', COR.roxo], ['🏛', 'Impessoalidade', 'quem fala é o serviço público, não a pessoa', COR.cinza], ['📏', 'Formalidade e padronização', 'linguagem e diagramação uniformes', COR.verm], ['📚', 'Norma-padrão', 'sem gírias, jargões ou regionalismos', COR.amar]])}
<h3>2. Pronomes de tratamento</h3>
<table class="tab"><tr><th>Pronome</th><th>Para quem</th><th>Vocativo</th></tr>
<tr><td><b>Vossa Excelência</b></td><td>Presidente, Vice, Ministros, parlamentares, juízes, governadores, prefeitos, oficiais-generais</td><td>“Excelentíssimo Senhor Presidente da República,” (só para chefes de Poder) · demais: “Senhor + cargo,”</td></tr>
<tr><td><b>Vossa Senhoria</b></td><td>demais autoridades e particulares</td><td>“Senhor + cargo,” ou “Senhor + nome,”</td></tr>
<tr><td><b>Vossa Magnificência</b></td><td>reitores de universidade</td><td>“Magnífico Reitor,”</td></tr></table>
${box('Concordância com pronomes de tratamento', '<ul><li>O verbo vai para a <b>3ª pessoa</b>: “Vossa Excelência <b>está</b> convidado.”</li><li>Possessivos de 3ª pessoa: “Vossa Senhoria e <b>sua</b> equipe” (nunca “vossa equipe”).</li><li>O adjetivo concorda com o <b>sexo da pessoa</b>: “Vossa Excelência está <b>cansado</b>” (para homem).</li><li><b>Vossa</b> = falando <b>com</b> a autoridade. <b>Sua</b> = falando <b>sobre</b> ela (“Sua Excelência, o Ministro, chegou”).</li></ul>')}
<h3>3. O padrão ofício</h3>
<p>Na 3ª edição, <b>ofício, aviso e memorando</b> foram unificados: todos passaram a se chamar <b>ofício</b>, com a mesma diagramação.</p>
${passos([['Cabeçalho e identificação', 'número e sigla do órgão: “Ofício nº 123/2026/PRF”'], ['Local e data', '“Brasília, 3 de novembro de 2026.” (sem zero à esquerda no dia)'], ['Endereçamento', 'nome, cargo e endereço do destinatário'], ['Assunto', 'resumo do tema, em negrito'], ['Vocativo', '“Senhor Diretor,”'], ['Texto', 'introdução, desenvolvimento e conclusão, com parágrafos numerados quando necessário'], ['Fecho', '“Respeitosamente,” ou “Atenciosamente,”'], ['Assinatura', 'nome e cargo do signatário']])}
<h3>4. Fechos</h3>
${cartoes([['🙇', 'Respeitosamente', 'para autoridades de hierarquia <b>superior</b>, inclusive o Presidente', COR.azul], ['🤝', 'Atenciosamente', 'para autoridades de <b>mesma</b> hierarquia ou <b>inferior</b>', COR.verde]])}
<p>Comunicações assinadas pelo <b>Presidente da República</b> não levam identificação do signatário abaixo da assinatura.</p>
<h3>5. O que caiu em desuso</h3>
<ul><li><b>Digníssimo</b> (DD.) e <b>Ilustríssimo</b> (Ilmo.): abolidos. Basta “Senhor”.</li><li><b>Doutor</b>: não é forma de tratamento, é título acadêmico. Use só para quem tem doutorado (ou por costume, para médicos e advogados).</li><li>O <b>e-mail</b> é aceito como documento oficial quando há meio de comprovar autoria e recebimento.</li></ul>
${dica('Fecho: “<b>R</b>espeitosamente” para quem está <b>acima</b> (R de “reverência”); “<b>A</b>tenciosamente” para quem está ao <b>lado ou abaixo</b>.')}
${peg('Com “Vossa Excelência”, o verbo vai para a <b>3ª pessoa</b>, e não para a 2ª do plural: “Vossa Excelência <b>decidiu</b>”, e não “Vossa Excelência <s>decidistes</s>”.')}`,
    quiz: [C('Segundo o Manual de Redação da Presidência da República, o fecho “Respeitosamente” é empregado para autoridades de hierarquia superior, inclusive o Presidente da República.', 'Para mesma hierarquia ou inferior, usa-se “Atenciosamente”.'), E('Na redação oficial, a forma correta é “Vossa Excelência e vossa equipe estão convidados”.', 'Com pronomes de tratamento, usam-se possessivos de 3ª pessoa: “Vossa Excelência e sua equipe”.'), C('Na 3ª edição do Manual de Redação, aviso, ofício e memorando passaram a ser chamados apenas de ofício.', 'É a unificação do “padrão ofício”.')],
  },
];
