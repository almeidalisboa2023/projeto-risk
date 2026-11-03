// Leitura R.I.S.K. — Raciocínio Lógico-Matemático (para qualquer edital). Texto original, exemplos resolvidos.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, banca, formula as F, C, E } from './blocos.js';

const tv = (cab, linhas) => `<table class="tab lt-tv"><tr>${cab.map((c) => `<th>${c}</th>`).join('')}</tr>${linhas.map((l) => `<tr>${l.map((v) => `<td class="${v === 'V' ? 'v' : v === 'F' ? 'f' : ''}">${v}</td>`).join('')}</tr>`).join('')}</table>`;

export default {
  id: 'rlm', nome: 'Raciocínio Lógico-Matemático', apelidos: ['raciocinio', 'logica', 'matematica', 'rlm'],
  assuntos: [
    {
      id: 'proposicoes', titulo: 'Lógica proposicional: proposições, conectivos e tabela-verdade', arts: 'lógica sentencial',
      chaves: ['logica proposicional', 'logica sentencial', 'tabela verdade', 'tabelas verdade', 'conectivos', 'proposicoes', 'estruturas logicas'],
      html: `
<h3>Proposição</h3>
<p>É toda frase <b>declarativa</b> que pode ser julgada como <b>verdadeira (V) ou falsa (F)</b>, nunca as duas coisas ao mesmo tempo. <b>Não</b> são proposições: perguntas (“Você estudou?”), ordens (“Estude!”), exclamações (“Que prova difícil!”) e sentenças abertas com variável (“x + 2 = 5”, “Ele é policial”).</p>
${cartoes([['¬', 'Negação · não p', 'inverte o valor', COR.cinza], ['∧', 'Conjunção · p e q', 'V só se as duas forem V', COR.azul], ['∨', 'Disjunção · p ou q', 'F só se as duas forem F', COR.verde], ['⊻', 'Disjunção exclusiva · ou p ou q', 'V se forem diferentes', COR.lar], ['→', 'Condicional · se p, então q', 'F só em V → F', COR.verm], ['↔', 'Bicondicional · p se e somente se q', 'V se forem iguais', COR.roxo]])}
<h3>Tabela-verdade completa</h3>
${tv(['p', 'q', 'p ∧ q', 'p ∨ q', 'p ⊻ q', 'p → q', 'p ↔ q'], [['V', 'V', 'V', 'V', 'F', 'V', 'V'], ['V', 'F', 'F', 'V', 'V', 'F', 'F'], ['F', 'V', 'F', 'V', 'V', 'V', 'F'], ['F', 'F', 'F', 'F', 'F', 'V', 'V']])}
<p>Número de linhas da tabela: ${F('2ⁿ')} (n = número de proposições simples). Com 3 proposições, 8 linhas; com 4, 16 linhas.</p>
<h3>O condicional, o mais cobrado</h3>
<p>“Se p, então q” só é <b>falso</b> quando a primeira parte (antecedente) é <b>verdadeira</b> e a segunda (consequente) é <b>falsa</b>. Pense numa promessa: “Se você passar, eu te dou um carro.” Só houve mentira se você passou e não ganhou o carro.</p>
${box('Formas de dizer “p → q”', '<ul><li>Se p, q · Quando p, q · Caso p, q</li><li><b>p é condição suficiente para q</b></li><li><b>q é condição necessária para p</b></li><li>p somente se q · Todo p é q</li></ul>')}
${ex('<p>Sabe-se que é <b>falsa</b> a proposição “Se o condutor bebeu, então ele foi preso”. O que se conclui?</p><p>Condicional falso só em V → F. Logo: o condutor <b>bebeu</b> (V) e <b>não</b> foi preso (F).</p>', 'Exemplo resolvido')}
<h3>Tautologia, contradição e contingência</h3>
<ul><li><b>Tautologia</b>: sempre V, em todas as linhas. Ex.: ${F('p ∨ ¬p')}</li><li><b>Contradição</b>: sempre F. Ex.: ${F('p ∧ ¬p')}</li><li><b>Contingência</b>: às vezes V, às vezes F.</li></ul>
${banca('<ul><li>Cebraspe: “A sentença ‘Que dia lindo!’ é uma proposição” → <b>errado</b>.</li><li>Dar o valor de proposições simples e pedir o valor da composta.</li><li>Pedir o número de linhas da tabela-verdade: conte as proposições <b>simples distintas</b>.</li></ul>')}
${dica('Valores de “F” de cada conectivo: <b>e</b> → basta um F · <b>ou</b> → precisa dos dois F · <b>se… então</b> → só “<b>Vera Fischer</b>” (V → F) · <b>se e somente se</b> → valores diferentes.')}
${peg('“Ele é policial” <b>não</b> é proposição para o Cebraspe se o sujeito “ele” não está definido: é sentença aberta. Já “Lucas é policial” é proposição.')}`,
      quiz: [C('A sentença “x + 3 = 10” não é uma proposição, por se tratar de sentença aberta.', 'Sem saber o valor de x, não dá para julgar como V ou F.'), E('A proposição “Se 2 + 2 = 5, então o Brasil fica na Europa” é falsa.', 'O antecedente é falso; condicional com antecedente falso é sempre verdadeiro.'), C('Uma tabela-verdade de uma proposição composta por 4 proposições simples distintas tem 16 linhas.', '2⁴ = 16.')],
    },
    {
      id: 'equivalencias', titulo: 'Equivalências lógicas, negações e quantificadores', arts: 'De Morgan e contrapositiva',
      chaves: ['equivalencias logicas', 'equivalencia', 'negacao', 'leis de morgan', 'quantificadores', 'logica de argumentacao'],
      html: `
<h3>Equivalência</h3>
<p>Duas proposições são <b>equivalentes</b> quando têm a <b>mesma tabela-verdade</b>: dizem a mesma coisa de formas diferentes.</p>
<h3>As equivalências do condicional</h3>
${cartoes([['🔄', 'Contrapositiva', 'p → q ≡ ¬q → ¬p', COR.azul], ['🔀', 'Nega-ou-mantém', 'p → q ≡ ¬p ∨ q', COR.verde]])}
${ex('<p>“Se estudo, passo.” equivale a:</p><ul><li>“Se <b>não</b> passo, <b>não</b> estudo.” (contrapositiva: inverte e nega as duas)</li><li>“<b>Não</b> estudo <b>ou</b> passo.” (nega a primeira, troca por “ou”, mantém a segunda)</li></ul><p><b>Não</b> equivale a “Se passo, estudo” (recíproca) nem a “Se não estudo, não passo” (inversa).</p>')}
<h3>Negações (Leis de De Morgan e outras)</h3>
<table class="tab"><tr><th>Proposição</th><th>Negação</th><th>Como fazer</th></tr>
<tr><td>p ∧ q</td><td>¬p ∨ ¬q</td><td>nega as duas e troca “e” por “ou”</td></tr>
<tr><td>p ∨ q</td><td>¬p ∧ ¬q</td><td>nega as duas e troca “ou” por “e”</td></tr>
<tr><td>p → q</td><td><b>p ∧ ¬q</b></td><td>mantém a primeira, “e”, nega a segunda (“MA-NE”)</td></tr>
<tr><td>p ↔ q</td><td>p ⊻ q</td><td>vira “ou… ou”</td></tr></table>
${ex('<p>Negue: “Se o condutor estiver alcoolizado, então será autuado.”</p><p>Resposta: “O condutor está alcoolizado <b>e não</b> será autuado.”</p>', 'Exemplo resolvido')}
<h3>Quantificadores</h3>
<table class="tab"><tr><th>Proposição</th><th>Negação</th></tr>
<tr><td><b>Todo</b> A é B</td><td><b>Algum</b> A <b>não</b> é B (existe A que não é B)</td></tr>
<tr><td><b>Algum</b> A é B</td><td><b>Nenhum</b> A é B</td></tr>
<tr><td><b>Nenhum</b> A é B</td><td><b>Algum</b> A é B</td></tr>
<tr><td>Algum A <b>não</b> é B</td><td><b>Todo</b> A é B</td></tr></table>
${box('Argumento válido', '<p>Um argumento é <b>válido</b> quando, admitindo as premissas como verdadeiras, a conclusão é <b>necessariamente</b> verdadeira. A validade depende da <b>forma</b>, e não do conteúdo.</p><ul><li><b>Modus ponens</b>: p → q; p; logo q. ✔</li><li><b>Modus tollens</b>: p → q; ¬q; logo ¬p. ✔</li><li>Falácia da afirmação do consequente: p → q; q; logo p. ✘</li><li>Falácia da negação do antecedente: p → q; ¬p; logo ¬q. ✘</li></ul>')}
${dica('Negação do condicional: “<b>MA-NE</b>” = <b>MA</b>ntém a primeira e <b>NE</b>ga a segunda, ligando com “e”. E negação de “todo” <b>nunca</b> é “nenhum”: é “algum… não”.')}
${peg('A negação de “Todos os condutores usam cinto” é “<b>Algum</b> condutor <b>não</b> usa cinto”, e não “Nenhum condutor usa cinto”.')}`,
      quiz: [C('A proposição “Se chove, a pista fica molhada” é equivalente a “Se a pista não fica molhada, não chove”.', 'É a contrapositiva: ¬q → ¬p.'), E('A negação de “Se o agente fiscaliza, então o condutor obedece” é “Se o agente não fiscaliza, então o condutor não obedece”.', 'A negação é “O agente fiscaliza e o condutor não obedece” (p ∧ ¬q).'), C('A negação de “Todo policial é concursado” é “Algum policial não é concursado”.', 'Negação de “todo A é B”: “algum A não é B”.')],
    },
    {
      id: 'equacoes', titulo: 'Equações do 1º e 2º grau e sistemas lineares', arts: 'modelagem de problemas',
      chaves: ['equacoes do 1o e 2o graus', 'sistemas lineares', 'modelagem por equacoes', 'equacoes', 'equacao'],
      html: `
<h3>A habilidade cobrada: traduzir o texto em conta</h3>
${passos([['Defina a incógnita', '“seja x o número de…”'], ['Traduza cada frase em equação', '“o dobro” = 2x; “a metade” = x/2; “3 a mais” = x + 3'], ['Resolva', 'isole x'], ['Confira no enunciado', 'o resultado faz sentido? é inteiro e positivo?']])}
<h3>1. Equação do 1º grau</h3>
${ex(`<p>“Uma equipe aplicou 20 multas pela manhã e, à tarde, o triplo do número de multas de um dia normal. No total, foram 110 multas. Quantas multas tem um dia normal?”</p><p>${F('20 + 3x = 110 → 3x = 90 → x = 30')}</p>`, 'Exemplo resolvido')}
<h3>2. Sistemas lineares</h3>
${ex(`<p>“Num pátio há 30 veículos entre carros e motos, totalizando 100 rodas. Quantos são os carros?”</p><p>${F('c + m = 30')} e ${F('4c + 2m = 100')}</p><p>Substituindo ${F('m = 30 − c')}: ${F('4c + 2(30 − c) = 100 → 2c = 40 → c = 20')}. São <b>20 carros</b> e <b>10 motos</b>. Conferindo: 80 + 20 = 100 rodas ✔</p>`, 'Exemplo resolvido')}
<h3>3. Equação do 2º grau</h3>
<p>Forma ${F('ax² + bx + c = 0')}, com a ≠ 0.</p>
${F('Δ = b² − 4ac      x = (−b ± √Δ) / 2a')}
<ul><li>Δ &gt; 0: duas raízes reais diferentes · Δ = 0: uma raiz (dupla) · Δ &lt; 0: nenhuma raiz real.</li><li><b>Soma</b> das raízes ${F('S = −b/a')} · <b>Produto</b> ${F('P = c/a')}.</li></ul>
${ex(`<p>${F('x² − 5x + 6 = 0')} → Δ = 25 − 24 = 1 → x = (5 ± 1)/2 → <b>x = 3 ou x = 2</b>.</p><p>Atalho: dois números com soma 5 e produto 6 → 2 e 3.</p>`)}
${dica('Antes de usar Bhaskara, tente a <b>soma e produto</b>: em prova, as raízes costumam ser inteiras e pequenas.')}
${peg('Em problemas, descarte raízes que não fazem sentido (negativas para idade, quantidade ou tempo). A equação pode ter duas raízes e o problema, só uma resposta.')}`,
      quiz: [C('Se a soma de um número com o seu dobro é 45, esse número é 15.', 'x + 2x = 45 → x = 15.'), E('As raízes da equação x² − 7x + 10 = 0 são 1 e 10.', 'Soma 7 e produto 10: as raízes são 2 e 5.'), C('Em um estacionamento com 20 veículos, entre carros e motos, e 56 rodas, há 12 motos.', 'c + m = 20 e 4c + 2m = 56 → 2c = 16 → c = 8 carros e m = 12 motos. Conferindo: 32 + 24 = 56 rodas.')],
    },
    {
      id: 'funcoes', titulo: 'Funções: afim, quadrática, exponencial e logarítmica', arts: 'análise gráfica e aplicações',
      chaves: ['nocao de funcao', 'funcoes afim', 'funcao afim', 'quadratica', 'exponencial', 'logaritmica', 'funcoes'],
      html: `
<h3>O que é função</h3>
<p>É uma regra que associa <b>cada</b> valor de x (domínio) a <b>um único</b> valor de y (imagem). Na prova, a função aparece como modelo: custo, distância, população, lucro.</p>
<h3>1. Função afim · f(x) = ax + b</h3>
${cartoes([['📈', 'a > 0', 'crescente', COR.verde], ['📉', 'a < 0', 'decrescente', COR.verm], ['📍', 'b', 'onde a reta corta o eixo y', COR.azul], ['⚡', 'a', 'taxa de variação: quanto y muda quando x aumenta 1', COR.lar]])}
${ex(`<p>Um táxi cobra R$ 5,00 de bandeirada mais R$ 2,50 por km: ${F('f(x) = 2,5x + 5')}. Uma corrida de 10 km custa ${F('f(10) = 25 + 5 = R$ 30,00')}.</p><p>Taxa de variação a partir de dois pontos: ${F('a = (y₂ − y₁) / (x₂ − x₁)')}</p>`)}
<h3>2. Função quadrática · f(x) = ax² + bx + c</h3>
<p>O gráfico é uma <b>parábola</b>: concavidade para cima se a &gt; 0 (tem ponto de <b>mínimo</b>) e para baixo se a &lt; 0 (tem ponto de <b>máximo</b>).</p>
${F('Vértice: xᵥ = −b / 2a      yᵥ = −Δ / 4a')}
${ex(`<p>O lucro de uma empresa é ${F('L(x) = −x² + 10x')}. Qual o lucro máximo?</p><p>${F('xᵥ = −10 / (2·(−1)) = 5')} → ${F('L(5) = −25 + 50 = 25')}. Lucro máximo de <b>25</b>, com x = 5.</p>`, 'Exemplo resolvido')}
<h3>3. Função exponencial · f(x) = a·bˣ</h3>
<p>Modela crescimento ou decrescimento por <b>taxa constante</b>: população, juros compostos, contágio. Se b &gt; 1, cresce; se 0 &lt; b &lt; 1, decresce.</p>
${ex(`<p>Uma colônia dobra a cada hora e começa com 100 bactérias: ${F('N(t) = 100 · 2ᵗ')}. Depois de 5 horas: ${F('100 · 32 = 3.200')}.</p>`)}
<h3>4. Logaritmo</h3>
${F('logₐ b = c  ⟺  aᶜ = b')}
<table class="tab"><tr><th>Propriedade</th><th>Fórmula</th></tr>
<tr><td>Produto</td><td>log(a·b) = log a + log b</td></tr><tr><td>Quociente</td><td>log(a/b) = log a − log b</td></tr><tr><td>Potência</td><td>log aⁿ = n · log a</td></tr><tr><td>Mudança de base</td><td>logₐ b = log b / log a</td></tr></table>
${dica('Valores que a banca costuma dar: <code class="lt-formula lt-inline">log 2 ≈ 0,30</code> e <code class="lt-formula lt-inline">log 3 ≈ 0,48</code>. Com eles você calcula log 4 = 0,60; log 5 = 1 − 0,30 = 0,70; log 6 = 0,78.')}
${peg('Na função afim, “b” não é a taxa de variação: é o valor <b>fixo</b> (quando x = 0). Quem mede a variação é o “a”.')}`,
      quiz: [C('Na função f(x) = −2x + 8, o gráfico é uma reta decrescente que corta o eixo y no ponto 8.', 'a = −2 (decrescente) e b = 8.'), E('A função L(x) = −x² + 6x tem valor mínimo igual a 9.', 'Com a < 0, a parábola tem valor máximo: L(3) = 9 é o máximo.'), C('Se log 2 ≈ 0,30, então log 8 ≈ 0,90.', 'log 8 = log 2³ = 3 · 0,30 = 0,90.')],
    },
    {
      id: 'razao', titulo: 'Razão, proporção e regra de três', arts: 'grandezas proporcionais',
      chaves: ['razao e proporcao', 'regra de tres', 'taxas de variacao de grandezas', 'grandezas proporcionais', 'divisao proporcional'],
      html: `
<h3>Razão e proporção</h3>
<p><b>Razão</b> é a comparação por divisão: ${F('a/b')}. <b>Proporção</b> é a igualdade entre duas razões: ${F('a/b = c/d  ⟺  a·d = b·c')} (produto dos meios = produto dos extremos).</p>
<h3>Grandezas diretamente e inversamente proporcionais</h3>
${cartoes([['↗↗', 'Diretamente', 'uma dobra, a outra dobra: distância e combustível', COR.verde], ['↗↘', 'Inversamente', 'uma dobra, a outra cai pela metade: velocidade e tempo', COR.verm]])}
<h3>Regra de três simples</h3>
${ex(`<p><b>Direta</b>: um carro faz 12 km por litro. Quantos litros para 300 km? ${F('12/1 = 300/x → x = 25 litros')}</p><p><b>Inversa</b>: 6 agentes fazem uma operação em 10 dias. Em quantos dias 4 agentes fariam? Menos agentes, mais dias: ${F('6 · 10 = 4 · x → x = 15 dias')}</p>`, 'Exemplos resolvidos')}
<h3>Regra de três composta: o método das setas</h3>
${passos([['Monte a tabela', 'cada coluna é uma grandeza; a incógnita fica numa coluna'], ['Compare cada grandeza com a da incógnita', 'pergunte: se esta aumenta, a incógnita aumenta (direta) ou diminui (inversa)?'], ['Inverta as razões das inversas', ''], ['Iguale a razão da incógnita ao produto das outras', '']])}
${ex(`<p>“5 agentes fiscalizam 200 veículos em 4 horas. Quantos veículos 8 agentes fiscalizam em 3 horas?”</p><p>Mais agentes → mais veículos (direta). Mais horas → mais veículos (direta).</p><p>${F('x = 200 · (8/5) · (3/4) = 200 · 1,6 · 0,75 = 240 veículos')}</p>`, 'Exemplo resolvido')}
<h3>Divisão proporcional</h3>
${ex(`<p>Dividir R$ 1.200 entre três equipes na proporção 1, 2 e 3: soma das partes = 6 → cada parte vale 200. Recebem <b>200, 400 e 600</b>.</p><p>Na divisão <b>inversamente</b> proporcional, use os inversos (1/1, 1/2, 1/3), tire o MMC e divida pelos numeradores.</p>`)}
${dica('Escala, velocidade média, densidade e consumo são razões. <code class="lt-formula lt-inline">Velocidade média = distância / tempo</code>: 180 km em 2 h = 90 km/h.')}
${peg('Na regra de três composta, compare <b>cada</b> grandeza só com a da incógnita, sem considerar as outras. Erro comum: comparar duas grandezas conhecidas entre si.')}`,
      quiz: [C('Se 4 máquinas fazem um serviço em 12 horas, 6 máquinas iguais fariam o mesmo serviço em 8 horas.', 'Inversa: 4 · 12 = 6 · x → x = 8.'), E('Dividindo R$ 900 em partes diretamente proporcionais a 2 e 7, a maior parte é R$ 630,00 e a menor, R$ 270,00.', 'Soma 9 → cada parte vale 100: as partes são R$ 200 e R$ 700.'), C('Um veículo que percorre 240 km em 3 horas tem velocidade média de 80 km/h.', '240 ÷ 3 = 80.')],
    },
    {
      id: 'porcentagem', titulo: 'Porcentagem e juros', arts: 'aumentos, descontos e juros simples e compostos',
      chaves: ['porcentagem', 'juros simples', 'juros compostos', 'juros', 'matematica financeira'],
      html: `
<h3>Porcentagem é uma fração de 100</h3>
<p>${F('x% = x/100')}. 25% = 0,25 = 1/4. Para calcular 18% de 250: ${F('0,18 · 250 = 45')}.</p>
<h3>O método do fator multiplicador</h3>
${cartoes([['⬆', 'Aumento de i%', 'multiplique por (1 + i)', COR.verde], ['⬇', 'Desconto de i%', 'multiplique por (1 − i)', COR.verm]])}
${ex(`<ul><li>Aumento de 15%: ${F('× 1,15')} · Desconto de 30%: ${F('× 0,70')}</li><li><b>Aumentos sucessivos</b> de 10% e 10%: ${F('1,1 · 1,1 = 1,21')} → aumento total de <b>21%</b>, e não 20%.</li><li>Aumento de 20% seguido de desconto de 20%: ${F('1,2 · 0,8 = 0,96')} → <b>queda de 4%</b>.</li></ul>`, 'Exemplos resolvidos')}
<h3>Variação percentual</h3>
${F('variação = (valor final − valor inicial) / valor inicial')}
${ex('<p>Os acidentes caíram de 250 para 200: (200 − 250)/250 = −0,20 → <b>redução de 20%</b>. Se subissem de 200 para 250: 50/200 = <b>aumento de 25%</b>. A base muda o resultado.</p>')}
<h3>Juros simples x compostos</h3>
<table class="tab"><tr><th></th><th>Simples</th><th>Compostos</th></tr>
<tr><td>Fórmula</td><td>${F('J = C·i·t')} · ${F('M = C(1 + i·t)')}</td><td>${F('M = C(1 + i)ᵗ')}</td></tr>
<tr><td>Juros incidem sobre</td><td>só o capital inicial</td><td>capital + juros acumulados</td></tr>
<tr><td>Crescimento</td><td>linear (função afim)</td><td>exponencial</td></tr></table>
${ex(`<p>R$ 1.000 a 10% ao mês por 2 meses:</p><ul><li>Simples: ${F('M = 1.000 · (1 + 0,1·2) = R$ 1.200')}</li><li>Compostos: ${F('M = 1.000 · 1,1² = R$ 1.210')}</li></ul>`, 'Exemplo resolvido')}
${dica('Taxa e tempo sempre na <b>mesma unidade</b>: taxa mensal com tempo em meses. 3% ao mês por 1 ano = 12 meses.')}
${peg('Desconto de 50% seguido de aumento de 50% <b>não</b> volta ao preço original: <code class="lt-formula lt-inline">0,5 · 1,5 = 0,75</code>, ou seja, 25% abaixo.')}`,
      quiz: [E('Dois aumentos sucessivos de 20% equivalem a um aumento total de 40%.', '1,2 · 1,2 = 1,44: o aumento total é de 44%.'), C('Um capital de R$ 2.000 aplicado a juros simples de 5% ao mês, durante 4 meses, gera juros de R$ 400.', 'J = 2.000 · 0,05 · 4 = 400.'), C('Se o número de acidentes caiu de 400 para 300, a redução foi de 25%.', '100/400 = 0,25.')],
    },
    {
      id: 'sequencias', titulo: 'Sequências, PA e PG', arts: 'regularidades e padrões',
      chaves: ['regularidades e padroes', 'sequencias numericas', 'sequencias', 'pa e pg', 'progressao aritmetica', 'progressao geometrica', 'progressoes'],
      html: `
<h3>Achar o padrão</h3>
<p>Em sequências, a banca quer que você descubra a <b>regra</b>: soma constante, multiplicação constante, alternância, quadrados, ou duas sequências intercaladas.</p>
${ex('<ul><li>2, 5, 10, 17, 26… → diferenças 3, 5, 7, 9 (ímpares): o próximo é <b>37</b>. (São n² + 1.)</li><li>1, 4, 2, 8, 3, 12… → duas sequências intercaladas: 1, 2, 3… e 4, 8, 12… O próximo é <b>4</b>.</li><li>A, C, F, J… → saltos de 2, 3, 4 letras: o próximo pula 5 → <b>O</b>.</li></ul>')}
<h3>Progressão aritmética (PA): soma sempre a mesma razão</h3>
${F('aₙ = a₁ + (n − 1)·r      Sₙ = (a₁ + aₙ)·n / 2')}
${ex(`<p>Na PA (3, 7, 11, …), r = 4. O 20º termo: ${F('a₂₀ = 3 + 19·4 = 79')}. A soma dos 20 primeiros: ${F('S₂₀ = (3 + 79)·20/2 = 820')}.</p>`, 'Exemplo resolvido')}
<h3>Progressão geométrica (PG): multiplica sempre pela mesma razão</h3>
${F('aₙ = a₁ · qⁿ⁻¹      Sₙ = a₁·(qⁿ − 1)/(q − 1)      S∞ = a₁/(1 − q), se −1 < q < 1')}
${ex(`<p>Na PG (2, 6, 18, …), q = 3. O 5º termo: ${F('2 · 3⁴ = 162')}. A soma dos 5 primeiros: ${F('2·(243 − 1)/2 = 242')}. Conferindo: 2 + 6 + 18 + 54 + 162 = 242 ✔</p><p>Soma infinita de (10, 5, 2,5, …), com q = 1/2: ${F('10/(1 − 0,5) = 20')}.</p>`, 'Exemplos resolvidos')}
${box('Propriedades úteis', '<ul><li>Na PA, cada termo é a <b>média aritmética</b> dos vizinhos: (a, b, c) → b = (a + c)/2.</li><li>Na PG, cada termo é a <b>média geométrica</b> dos vizinhos: b² = a·c.</li><li>Na PA, a soma de termos equidistantes dos extremos é constante: a₁ + aₙ = a₂ + aₙ₋₁.</li></ul>')}
${dica('PA = “<b>A</b>diciona” · PG = “<b>G</b>anha multiplicando”. Juros simples formam PA; juros compostos formam PG.')}
${peg('Em aₙ = a₁ + (n − 1)r, o expoente “n − 1” existe porque do 1º ao n-ésimo termo há só <b>n − 1</b> saltos. Do 1º ao 10º termo são 9 razões.')}`,
      quiz: [C('Na progressão aritmética 5, 9, 13, …, o 10º termo é 41.', 'a₁₀ = 5 + 9·4 = 41.'), E('Na progressão geométrica 3, 6, 12, …, o 6º termo é 48.', 'a₆ = 3 · 2⁵ = 96.'), C('A soma dos termos da PG infinita 8, 4, 2, 1, … é igual a 16.', 'S = 8/(1 − 1/2) = 16.')],
    },
    {
      id: 'contagem', titulo: 'Análise combinatória (contagem)', arts: 'PFC, permutação, arranjo e combinação',
      chaves: ['nocoes basicas de contagem', 'analise combinatoria', 'contagem', 'permutacao', 'arranjo', 'combinacao'],
      html: `
<h3>A pergunta que decide tudo: a ordem importa?</h3>
${cartoes([['✖️', 'Princípio fundamental (PFC)', 'etapas independentes: multiplique as possibilidades', COR.azul], ['🔀', 'Permutação', 'organizar <b>todos</b> os elementos: n!', COR.verde], ['🥇', 'Arranjo', 'escolher p de n e a <b>ordem importa</b>', COR.lar], ['👥', 'Combinação', 'escolher p de n e a ordem <b>não</b> importa', COR.roxo]])}
<table class="tab"><tr><th>Tipo</th><th>Fórmula</th><th>Quando usar</th></tr>
<tr><td>Permutação simples</td><td>${F('Pₙ = n!')}</td><td>filas, anagramas, ordenar todos</td></tr>
<tr><td>Permutação com repetição</td><td>${F('n! / (a!·b!…)')}</td><td>anagramas com letras repetidas</td></tr>
<tr><td>Arranjo</td><td>${F('A(n,p) = n!/(n − p)!')}</td><td>cargos diferentes, pódio, senhas com dígitos distintos</td></tr>
<tr><td>Combinação</td><td>${F('C(n,p) = n!/[p!(n − p)!]')}</td><td>comissões, equipes, grupos, apostas</td></tr></table>
${ex(`<ul><li><b>PFC</b>: 3 camisas e 4 calças → ${F('3 · 4 = 12')} combinações de roupa.</li><li><b>Permutação</b>: anagramas de PRF → ${F('3! = 6')}.</li><li><b>Com repetição</b>: anagramas de ARARA (3 A e 2 R) → ${F('5!/(3!·2!) = 120/12 = 10')}.</li><li><b>Arranjo</b>: escolher presidente, vice e secretário entre 10 agentes → ${F('10 · 9 · 8 = 720')}.</li><li><b>Combinação</b>: formar uma equipe de 3 entre 10 agentes → ${F('720 / 3! = 120')}.</li></ul>`, 'Exemplos resolvidos')}
${box('Teste da ordem', '<p>Troque a ordem de dois escolhidos. Se o resultado <b>muda</b> (Ana presidente e Beto vice ≠ Beto presidente e Ana vice), é <b>arranjo</b>. Se <b>não muda</b> (equipe Ana e Beto = equipe Beto e Ana), é <b>combinação</b>.</p>')}
<h3>Casos com restrição</h3>
<ul><li><b>Elementos juntos</b>: trate o bloco como um único elemento e multiplique pelas permutações dentro do bloco.</li><li><b>Pelo menos um</b>: calcule o total e subtraia os casos com “nenhum”.</li><li><b>Restrição primeiro</b>: preencha primeiro a posição com restrição (ex.: placa que começa com vogal).</li></ul>
${dica('<code class="lt-formula lt-inline">C(n,p) = C(n, n − p)</code>: escolher 8 de 10 é o mesmo que escolher os 2 que ficam de fora. C(10,8) = C(10,2) = 45.')}
${peg('Senha de 4 dígitos <b>com</b> repetição permitida é PFC: <code class="lt-formula lt-inline">10⁴ = 10.000</code>. Sem repetição é arranjo: <code class="lt-formula lt-inline">10·9·8·7 = 5.040</code>.')}`,
      quiz: [C('O número de comissões de 3 pessoas que podem ser formadas a partir de um grupo de 8 pessoas é 56.', 'C(8,3) = 8·7·6/6 = 56.'), E('O número de anagramas da palavra BALA é 24.', 'Há dois A: 4!/2! = 12.'), C('Para escolher um presidente e um vice entre 6 candidatos, há 30 possibilidades.', 'Ordem importa: A(6,2) = 6·5 = 30.')],
    },
    {
      id: 'probabilidade', titulo: 'Probabilidade', arts: 'eventos, complementar, união e condicional',
      chaves: ['probabilidade'],
      html: `
<h3>Definição clássica</h3>
${F('P(A) = casos favoráveis / casos possíveis')}
<p>Vale para resultados <b>equiprováveis</b>. A probabilidade fica entre 0 (impossível) e 1 (certo).</p>
${ex('<p>Num dado, a chance de sair número par: {2, 4, 6} → 3/6 = <b>1/2</b>. Numa urna com 3 bolas vermelhas e 2 azuis, a chance de tirar azul: <b>2/5</b>.</p>')}
<h3>As regras essenciais</h3>
<table class="tab"><tr><th>Situação</th><th>Regra</th></tr>
<tr><td><b>Complementar</b> (“não A”)</td><td>${F('P(Ā) = 1 − P(A)')}</td></tr>
<tr><td><b>“Ou”</b> (união)</td><td>${F('P(A ∪ B) = P(A) + P(B) − P(A ∩ B)')}</td></tr>
<tr><td><b>“E”</b> com eventos independentes</td><td>${F('P(A ∩ B) = P(A) · P(B)')}</td></tr>
<tr><td><b>Condicional</b> (A sabendo que B ocorreu)</td><td>${F('P(A|B) = P(A ∩ B) / P(B)')}</td></tr></table>
${ex(`<ul><li><b>Pelo menos uma cara</b> em 2 lançamentos de moeda: ${F('1 − P(nenhuma) = 1 − 1/4 = 3/4')}.</li><li><b>Sem reposição</b>: de uma urna com 3 vermelhas e 2 azuis, tirar 2 vermelhas seguidas → ${F('3/5 · 2/4 = 6/20 = 3/10')}.</li><li><b>Condicional</b>: de 100 condutores, 40 foram fiscalizados e, desses, 10 estavam irregulares. Sabendo que o condutor foi fiscalizado, a chance de estar irregular é ${F('10/40 = 1/4')}.</li></ul>`, 'Exemplos resolvidos')}
${box('Com ou sem reposição', '<ul><li><b>Com reposição</b>: o total não muda; os eventos são independentes.</li><li><b>Sem reposição</b>: o total e os favoráveis diminuem a cada retirada.</li></ul>')}
${dica('“<b>Pelo menos um</b>” → quase sempre é mais rápido pelo complementar: 1 − P(nenhum).')}
${peg('Eventos <b>mutuamente exclusivos</b> (não ocorrem juntos) <b>não</b> são independentes, salvo se um deles tiver probabilidade zero. Exclusivos: P(A ∩ B) = 0. Independentes: P(A ∩ B) = P(A)·P(B).')}`,
      quiz: [C('Ao lançar um dado comum, a probabilidade de sair um número maior que 4 é de 1/3.', 'Favoráveis {5, 6}: 2/6 = 1/3.'), E('Lançando-se uma moeda três vezes, a probabilidade de sair pelo menos uma coroa é de 1/8.', 'P(pelo menos uma) = 1 − (1/2)³ = 7/8.'), C('Retirando-se duas cartas sem reposição de um conjunto com 4 cartas, das quais 2 são ases, a probabilidade de ambas serem ases é 1/6.', '2/4 · 1/3 = 2/12 = 1/6.')],
    },
    {
      id: 'estatistica', titulo: 'Estatística: tabelas, gráficos, médias e desvios', arts: 'descrição e análise de dados',
      chaves: ['descricao e analise de dados', 'medias e desvios', 'tabelas e graficos', 'estatistica', 'media aritmetica'],
      html: `
<h3>Medidas de tendência central</h3>
${cartoes([['➗', 'Média', 'soma dos valores ÷ quantidade', COR.azul], ['🎯', 'Mediana', 'valor do meio, com os dados em ordem', COR.verde], ['🔁', 'Moda', 'valor que mais se repete', COR.lar]])}
${ex('<p>Dados: 2, 3, 3, 5, 7.</p><ul><li>Média = 20 ÷ 5 = <b>4</b></li><li>Mediana = <b>3</b> (o 3º valor)</li><li>Moda = <b>3</b></li></ul><p>Com quantidade <b>par</b> de dados, a mediana é a média dos dois centrais: 2, 4, 6, 10 → (4 + 6)/2 = <b>5</b>.</p>', 'Exemplo resolvido')}
<h3>Média ponderada</h3>
${F('média = Σ(valor · peso) / Σ(pesos)')}
${ex('<p>Prova com nota 6 (peso 2) e nota 9 (peso 1): (12 + 9)/3 = <b>7</b>.</p>')}
<h3>Medidas de dispersão</h3>
<ul><li><b>Amplitude</b>: maior valor − menor valor.</li><li><b>Variância</b>: média dos quadrados dos desvios em relação à média.</li><li><b>Desvio padrão</b>: raiz quadrada da variância, na mesma unidade dos dados.</li></ul>
${ex(`<p>Dados 2, 4, 6 → média 4 → desvios −2, 0, 2 → quadrados 4, 0, 4 → variância (populacional) ${F('8/3 ≈ 2,67')} → desvio padrão ${F('≈ 1,63')}.</p>`)}
${box('Propriedades (cobradas sem conta)', '<table class="tab"><tr><th>Operação em todos os dados</th><th>Média</th><th>Desvio padrão</th><th>Variância</th></tr><tr><td>Somar uma constante k</td><td>soma k</td><td>não muda</td><td>não muda</td></tr><tr><td>Multiplicar por k</td><td>× k</td><td>× |k|</td><td>× k²</td></tr></table>')}
<h3>Leitura de gráficos</h3>
<ul><li><b>Colunas e barras</b>: comparação entre categorias.</li><li><b>Linhas</b>: evolução ao longo do tempo.</li><li><b>Setores (pizza)</b>: partes de um todo; o ângulo do setor = ${F('porcentagem · 360°')} (25% = 90°).</li><li>Confira sempre a <b>escala</b> e se o eixo começa no zero.</li></ul>
${dica('A <b>mediana</b> não é afetada por valores extremos; a <b>média</b> é. Em salários com um valor muito alto, a mediana representa melhor o “típico”.')}
${peg('Somar 10 a todas as notas aumenta a média em 10, mas <b>não</b> altera o desvio padrão: a distância entre as notas continua igual.')}`,
      quiz: [C('A mediana do conjunto 8, 2, 5, 9, 1 é 5.', 'Em ordem: 1, 2, 5, 8, 9. O valor central é 5.'), E('Multiplicando-se todos os valores de um conjunto por 3, a variância também fica multiplicada por 3.', 'A variância fica multiplicada por 3² = 9.'), C('Num gráfico de setores, uma categoria que representa 25% do total corresponde a um ângulo de 90°.', '0,25 · 360° = 90°.')],
    },
    {
      id: 'conjuntos', titulo: 'Teoria dos conjuntos', arts: 'operações e diagramas de Venn',
      chaves: ['teoria dos conjuntos', 'conjuntos', 'diagramas'],
      html: `
<h3>Operações</h3>
${cartoes([['∪', 'União A ∪ B', 'elementos de A <b>ou</b> de B', COR.azul], ['∩', 'Interseção A ∩ B', 'elementos de A <b>e</b> de B', COR.verde], ['−', 'Diferença A − B', 'estão em A e <b>não</b> em B', COR.lar], ['∁', 'Complementar', 'o que falta para chegar ao universo', COR.roxo]])}
${F('n(A ∪ B) = n(A) + n(B) − n(A ∩ B)')}
${ex('<p>De 100 condutores, 60 foram multados por velocidade, 30 por uso de celular e 10 pelas duas infrações.</p><ul><li>Pelo menos uma infração: 60 + 30 − 10 = <b>80</b></li><li>Nenhuma infração: 100 − 80 = <b>20</b></li><li>Só velocidade: 60 − 10 = <b>50</b> · só celular: 30 − 10 = <b>20</b></li></ul>', 'Exemplo resolvido')}
<h3>Diagrama com três conjuntos: comece pelo meio</h3>
${passos([['Preencha a interseção dos três', 'A ∩ B ∩ C'], ['Preencha as interseções de dois', 'subtraindo o centro'], ['Preencha as partes “só A”, “só B”, “só C”', 'subtraindo tudo o que já está dentro'], ['Some e compare com o total', 'a diferença é quem está fora de todos']])}
${F('n(A∪B∪C) = n(A) + n(B) + n(C) − n(A∩B) − n(A∩C) − n(B∩C) + n(A∩B∩C)')}
${box('Outros fatos cobrados', '<ul><li>Um conjunto com n elementos tem <code class="lt-formula lt-inline">2ⁿ</code> subconjuntos (incluindo o vazio e ele mesmo).</li><li>O conjunto vazio é subconjunto de qualquer conjunto.</li><li>∈ relaciona <b>elemento</b> e conjunto; ⊂ relaciona <b>conjunto</b> e conjunto.</li></ul>')}
${dica('Em problemas de conjuntos, desenhe <b>sempre</b> o diagrama e preencha de <b>dentro para fora</b>.')}
${peg('“60 foram multados por velocidade” inclui quem também foi multado por celular. “Só por velocidade” é outra coisa: 60 menos a interseção.')}`,
      quiz: [C('Se n(A) = 20, n(B) = 15 e n(A ∩ B) = 5, então n(A ∪ B) = 30.', '20 + 15 − 5 = 30.'), E('Um conjunto com 4 elementos possui 8 subconjuntos.', 'São 2⁴ = 16 subconjuntos.'), C('Em uma turma de 40 alunos, 25 estudam inglês, 20 estudam espanhol e 10 estudam os dois idiomas. Então 5 alunos não estudam nenhum desses idiomas.', '25 + 20 − 10 = 35; 40 − 35 = 5.')],
    },
    {
      id: 'geometria', titulo: 'Geometria: áreas, volumes, escalas e figuras espaciais', arts: 'métrica e figuras planas e espaciais',
      chaves: ['figuras planas', 'areas e volumes', 'metrica', 'escalas', 'figuras espaciais', 'geometria'],
      html: `
<h3>Áreas das figuras planas</h3>
<table class="tab"><tr><th>Figura</th><th>Área</th><th>Perímetro</th></tr>
<tr><td>⬛ Quadrado de lado ℓ</td><td>${F('ℓ²')}</td><td>4ℓ</td></tr>
<tr><td>▭ Retângulo</td><td>${F('b · h')}</td><td>2b + 2h</td></tr>
<tr><td>🔺 Triângulo</td><td>${F('b · h / 2')}</td><td>soma dos lados</td></tr>
<tr><td>⏢ Trapézio</td><td>${F('(B + b) · h / 2')}</td><td>soma dos lados</td></tr>
<tr><td>◆ Losango</td><td>${F('D · d / 2')}</td><td>4ℓ</td></tr>
<tr><td>⚪ Círculo de raio r</td><td>${F('π · r²')}</td><td>${F('2 · π · r')}</td></tr></table>
<h3>Teorema de Pitágoras</h3>
<p>No triângulo retângulo: ${F('a² = b² + c²')} (a = hipotenusa). Ternos que mais caem: <b>3-4-5</b>, <b>5-12-13</b>, <b>6-8-10</b>.</p>
<h3>Volumes</h3>
${cartoes([['🧊', 'Cubo', 'a³', COR.azul], ['📦', 'Paralelepípedo', 'a · b · c', COR.verde], ['🥫', 'Cilindro', 'π · r² · h', COR.lar], ['🍦', 'Cone', 'π · r² · h / 3', COR.roxo], ['⚽', 'Esfera', '4/3 · π · r³', COR.verm]])}
${box('Conversões', '<ul><li><code class="lt-formula lt-inline">1 m³ = 1.000 L</code> · <code class="lt-formula lt-inline">1 dm³ = 1 L</code> · <code class="lt-formula lt-inline">1 cm³ = 1 mL</code></li><li><code class="lt-formula lt-inline">1 km = 1.000 m</code> · <code class="lt-formula lt-inline">1 m = 100 cm</code> · <code class="lt-formula lt-inline">1 hectare = 10.000 m²</code></li></ul>')}
${ex(`<p>Um tanque cilíndrico tem raio 1 m e altura 2 m (use π ≈ 3,14): ${F('V = 3,14 · 1² · 2 = 6,28 m³ = 6.280 litros')}.</p>`, 'Exemplo resolvido')}
<h3>Escala</h3>
${F('escala = medida no desenho / medida real')}
${ex('<p>Num mapa de escala <b>1:50.000</b>, 4 cm representam <code class="lt-formula lt-inline">4 · 50.000 = 200.000 cm = 2 km</code>.</p>')}
<h3>Semelhança: razão k</h3>
<p>Se as medidas lineares de duas figuras semelhantes estão na razão <b>k</b>, as <b>áreas</b> estão na razão <b>k²</b> e os <b>volumes</b> na razão <b>k³</b>. Dobrar o lado de um cubo multiplica o volume por 8.</p>
<h3>Figuras espaciais e projeções</h3>
<p>Questões de <b>planificação</b> (que figura plana forma o sólido) e <b>vistas</b> (frontal, lateral, superior). Um cubo tem <b>6 faces, 12 arestas e 8 vértices</b>. Relação de Euler para poliedros convexos: ${F('V − A + F = 2')}.</p>
${dica('Área usa unidade ao <b>quadrado</b> (m²); volume, ao <b>cubo</b> (m³). Na conversão, 1 m² = 10.000 cm² (100²), e não 100 cm².')}
${peg('Dobrar o raio de um círculo <b>quadruplica</b> a área (r² vira 4r²), e não dobra.')}`,
      quiz: [C('Num mapa na escala 1:100.000, uma distância de 3 cm corresponde a 3 km na realidade.', '3 · 100.000 = 300.000 cm = 3 km.'), E('Um reservatório em forma de paralelepípedo com 2 m × 3 m × 1 m tem capacidade de 600 litros.', 'Volume = 6 m³ = 6.000 litros.'), C('Se o lado de um quadrado é triplicado, sua área fica multiplicada por 9.', 'Área na razão k² = 3² = 9.')],
    },
  ],
};
