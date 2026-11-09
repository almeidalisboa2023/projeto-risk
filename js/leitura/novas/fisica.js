// Leitura R.I.S.K. — Física (gerado de c8-prf-gerais.mat).
export default {
"id": "fisica",
"nome": "Física",
"cor": "#2C5282",
"ico": "🔭",
"apelidos": [
"fisica",
"nocoes de fisica"
],
"assuntos": [
{
"id": "cinematica",
"titulo": "Cinemática: MRU, MRUV e queda livre",
"arts": "Movimento",
"chaves": [
"cinematica",
"mru",
"mruv",
"velocidade media",
"aceleracao",
"torricelli",
"queda livre",
"tempo de reacao",
"distancia de parada"
],
"html": "<h3>Conceitos</h3>\n<ul><li><b>Velocidade média</b>: v = Δs / Δt. Converter: <b>km/h ÷ 3,6 = m/s</b> (e m/s × 3,6 = km/h).</li><li><b>MRU</b> (velocidade constante): s = s₀ + v·t.</li><li><b>MRUV</b> (aceleração constante): v = v₀ + a·t; s = s₀ + v₀·t + a·t²/2; <b>Torricelli</b>: v² = v₀² + 2·a·Δs.</li><li><b>Queda livre</b>: aceleração g ≈ 10 m/s², sem resistência do ar; todos os corpos caem com a mesma aceleração.</li></ul>\n<h3>Aplicação ao trânsito: distância de parada</h3>\n<ul><li><b>Distância de reação</b> (o carro segue em MRU durante o tempo de reação, cerca de 0,75 a 1 s) + <b>distância de frenagem</b> (MRUV com desaceleração).</li><li>A distância de frenagem é proporcional ao <b>quadrado da velocidade</b>: dobrando a velocidade, a frenagem <b>quadruplica</b> (Torricelli: Δs = v₀² / 2a).</li></ul>\n<div class=\"lt-ex\"><b class=\"lt-tit\">✍ Exemplo</b><p>Carro a 72 km/h (20 m/s), tempo de reação 1 s, desaceleração 5 m/s². Reação: 20 m. Frenagem: 20² / (2·5) = 40 m. Parada total: <b>60 m</b>.</p></div>\n<code class=\"lt-formula\">Δs = v₀² / (2·a)</code>",
"quiz": [
{
"p": "Um veículo a 108 km/h percorre 30 metros a cada segundo.",
"c": true,
"x": "108 ÷ 3,6 = 30 m/s.",
"e": "Conversão de unidades."
},
{
"p": "Mantida a desaceleração, se a velocidade inicial de um veículo dobrar, a distância necessária para frenagem será quatro vezes maior.",
"c": true,
"x": "Pela equação de Torricelli, Δs = v₀²/2a: a distância é proporcional ao quadrado da velocidade.",
"e": "Torricelli."
},
{
"p": "Na ausência de resistência do ar, um corpo mais pesado cai com aceleração maior que um corpo mais leve.",
"c": false,
"x": "Em queda livre, todos os corpos têm a mesma aceleração g, independentemente da massa.",
"e": "Queda livre."
},
{
"p": "Um veículo a 20 m/s freia com desaceleração constante de 4 m/s². A distância percorrida até parar é",
"alts": [
"25 m",
"50 m",
"80 m",
"100 m",
"40 m"
],
"r": 1,
"x": "Δs = 20² / (2·4) = 400 / 8 = 50 m.",
"n": [
"Erro no denominador.",
"Correta.",
"Não confere.",
"Esqueceu de dividir por 2a corretamente.",
"Não confere."
],
"e": "Torricelli."
},
{
"p": "Um veículo que percorre 150 km em 2 horas tem velocidade média de 75 km/h.",
"c": true,
"x": "vm = 150/2.",
"e": "Velocidade média."
},
{
"p": "20 m/s correspondem a 72 km/h.",
"c": true,
"x": "20 × 3,6 = 72.",
"e": "Conversão."
},
{
"p": "No MRU, a aceleração é diferente de zero.",
"c": false,
"x": "No MRU a velocidade é constante e a aceleração é nula.",
"e": "MRU."
},
{
"p": "Um objeto em queda livre, partindo do repouso, atinge 20 m/s após 2 segundos (g = 10 m/s²).",
"c": true,
"x": "v = g·t = 10·2.",
"e": "Queda livre."
},
{
"p": "Um carro parte do repouso com aceleração constante de 2 m/s². Após 5 segundos, sua velocidade será",
"alts": [
"2 m/s",
"5 m/s",
"10 m/s",
"25 m/s",
"50 m/s"
],
"r": 2,
"x": "v = v₀ + a·t = 0 + 2·5.",
"n": [
"É a aceleração.",
"É o tempo.",
"Correta.",
"É o deslocamento (a·t²/2).",
"Não confere."
],
"e": "MRUV."
},
{
"p": "Um condutor a 30 m/s tem tempo de reação de 1 s. A distância percorrida antes de começar a frear é",
"alts": [
"3 m",
"10 m",
"30 m",
"60 m",
"90 m"
],
"r": 2,
"x": "Durante a reação o carro segue em MRU: d = v·t = 30·1.",
"n": [
"Não confere.",
"Não confere.",
"Correta.",
"Seria com 2 s.",
"Não confere."
],
"e": "Distância de reação."
},
{
"p": "Um corpo lançado verticalmente para cima atinge a altura máxima quando sua velocidade se anula.",
"c": true,
"x": "A aceleração continua sendo g.",
"e": "Lançamento vertical."
},
{
"p": "No gráfico velocidade × tempo, a área sob a curva representa o deslocamento.",
"c": true,
"x": "Propriedade do gráfico v × t.",
"e": "Gráficos."
},
{
"p": "Um veículo que mantém 60 km/h em curva está em movimento retilíneo uniforme.",
"c": false,
"x": "Em curva o movimento não é retilíneo; há aceleração centrípeta.",
"e": "Movimento circular."
},
{
"p": "Um veículo que vai de 0 a 108 km/h em 10 s tem aceleração média de 3 m/s².",
"c": true,
"x": "108 km/h = 30 m/s; a = 30/10.",
"e": "Aceleração média."
},
{
"p": "Um corpo cai do repouso por 3 s (g = 10 m/s², sem resistência do ar). A distância percorrida é",
"alts": [
"15 m",
"30 m",
"45 m",
"90 m",
"9 m"
],
"r": 2,
"x": "h = g·t²/2 = 10·9/2.",
"n": [
"Não confere.",
"É g·t.",
"Correta.",
"Não dividiu por 2.",
"Não confere."
],
"e": "Queda livre."
}
]
},
{
"id": "dinamica",
"titulo": "Dinâmica: leis de Newton, atrito e plano inclinado",
"arts": "Leis de Newton",
"chaves": [
"leis de newton",
"inercia",
"forca resultante",
"acao e reacao",
"atrito",
"forca peso",
"plano inclinado",
"cinto de seguranca"
],
"html": "<h3>Leis de Newton</h3>\n<ul><li><b>1ª (Inércia)</b>: um corpo tende a manter seu estado de repouso ou de MRU se a força resultante for nula. Explica por que o passageiro “é jogado para frente” na freada: a importância do <b>cinto de segurança</b>.</li><li><b>2ª (Princípio fundamental)</b>: <b>F = m·a</b>.</li><li><b>3ª (Ação e reação)</b>: forças de mesma intensidade, mesma direção e sentidos opostos, <b>em corpos diferentes</b> (por isso não se anulam).</li></ul>\n<h3>Forças</h3>\n<ul><li><b>Peso</b>: P = m·g. <b>Normal</b>: perpendicular à superfície. <b>Atrito</b>: Fat = μ·N, contrário à tendência de movimento; o atrito <b>estático</b> máximo é maior que o <b>cinético</b>.</li><li><b>ABS</b> evita o travamento das rodas, mantendo o atrito estático (maior) e a dirigibilidade.</li><li><b>Plano inclinado</b>: componente do peso ao longo do plano = P·sen θ.</li></ul>\n<div class=\"lt-peg\"><b class=\"lt-tit\">⚠ Pegadinha</b> Ação e reação <b>não se anulam</b> porque atuam em <b>corpos diferentes</b>.</div>",
"quiz": [
{
"p": "O uso do cinto de segurança está relacionado à primeira lei de Newton, pois, na freada brusca, o corpo do passageiro tende a continuar em movimento.",
"c": true,
"x": "É o princípio da inércia.",
"e": "1ª lei de Newton."
},
{
"p": "As forças de ação e reação se anulam porque têm mesma intensidade e sentidos opostos.",
"c": false,
"x": "Elas atuam em corpos diferentes e, por isso, não se anulam.",
"e": "3ª lei de Newton."
},
{
"p": "O sistema ABS mantém as rodas girando durante a frenagem, aproveitando o atrito estático, que é maior que o cinético.",
"c": true,
"x": "Com a roda travada, atua o atrito cinético (menor) e se perde a dirigibilidade.",
"e": "Atrito."
},
{
"p": "Uma força resultante de 3.000 N atua sobre um veículo de 1.500 kg. A aceleração é de",
"alts": [
"0,5 m/s²",
"2 m/s²",
"4,5 m/s²",
"15 m/s²",
"4.500 m/s²"
],
"r": 1,
"x": "a = F/m = 3.000/1.500 = 2 m/s².",
"n": [
"Inverteu a razão.",
"Correta.",
"Somou.",
"Não confere.",
"Multiplicou."
],
"e": "2ª lei de Newton."
},
{
"p": "A força peso de um corpo de 80 kg na superfície da Terra é de aproximadamente 800 N (g = 10 m/s²).",
"c": true,
"x": "P = m·g.",
"e": "Força peso."
},
{
"p": "A massa de um corpo muda quando ele é levado à Lua.",
"c": false,
"x": "A massa é a mesma; o peso diminui, porque a gravidade é menor.",
"e": "Massa e peso."
},
{
"p": "Quanto maior o coeficiente de atrito entre os pneus e a pista, menor tende a ser a distância de frenagem.",
"c": true,
"x": "A força de atrito é maior, gerando maior desaceleração.",
"e": "Atrito."
},
{
"p": "Em uma curva, a força que mantém o veículo na trajetória é a resultante centrípeta, fornecida pelo atrito entre pneus e pista.",
"c": true,
"x": "Pista molhada reduz o atrito e aumenta o risco de derrapagem.",
"e": "Movimento circular."
},
{
"p": "A unidade de força no Sistema Internacional é o",
"alts": [
"joule",
"watt",
"newton",
"pascal",
"quilograma"
],
"r": 2,
"x": "1 N = 1 kg·m/s².",
"n": [
"Energia.",
"Potência.",
"Correta.",
"Pressão.",
"Massa."
],
"e": "Unidades do SI."
},
{
"p": "A força normal sobre um corpo apoiado em superfície horizontal, sem outras forças verticais, tem a mesma intensidade do peso.",
"c": true,
"x": "Equilíbrio vertical.",
"e": "Força normal."
},
{
"p": "Pela 1ª lei de Newton, todo corpo em movimento tende a parar naturalmente, mesmo sem forças.",
"c": false,
"x": "Sem força resultante, o corpo mantém o MRU. Ele para por causa de forças como o atrito.",
"e": "Inércia."
},
{
"p": "Na colisão traseira, o encosto de cabeça reduz o risco de lesão no pescoço, relacionado à inércia da cabeça.",
"c": true,
"x": "Aplicação da 1ª lei.",
"e": "Inércia."
},
{
"p": "Em pista molhada, o coeficiente de atrito diminui e a distância de frenagem aumenta.",
"c": true,
"x": "Menor atrito, menor desaceleração.",
"e": "Atrito."
},
{
"p": "Pela 3ª lei de Newton, o pneu empurra o asfalto para trás e o asfalto empurra o pneu para a frente.",
"c": true,
"x": "É assim que o carro se move.",
"e": "Ação e reação."
},
{
"p": "Um bloco de 10 kg sofre força resultante de 50 N. Sua aceleração é",
"alts": [
"0,2 m/s²",
"5 m/s²",
"50 m/s²",
"500 m/s²",
"60 m/s²"
],
"r": 1,
"x": "a = F/m.",
"n": [
"Invertido.",
"Correta.",
"Não confere.",
"Multiplicou.",
"Somou."
],
"e": "2ª lei de Newton."
}
]
},
{
"id": "energia",
"titulo": "Trabalho, energia, potência, quantidade de movimento e colisões",
"arts": "Energia e momento",
"chaves": [
"energia cinetica",
"energia potencial",
"conservacao da energia",
"potencia",
"quantidade de movimento",
"impulso",
"colisoes",
"airbag"
],
"html": "<h3>Energia</h3>\n<ul><li><b>Cinética</b>: Ec = m·v²/2 (depende do <b>quadrado</b> da velocidade). <b>Potencial gravitacional</b>: Ep = m·g·h.</li><li><b>Conservação</b>: sem atrito, a energia mecânica (Ec + Ep) se conserva.</li><li><b>Trabalho</b>: τ = F·d·cos θ. <b>Teorema da energia cinética</b>: τ = ΔEc. <b>Potência</b>: P = τ/Δt (watts).</li></ul>\n<h3>Quantidade de movimento</h3>\n<ul><li><b>Q = m·v</b> (vetorial). <b>Impulso</b>: I = F·Δt = ΔQ.</li><li><b>Air bag</b> e zonas de deformação aumentam o <b>tempo</b> de colisão, reduzindo a <b>força média</b> sobre os ocupantes (mesmo impulso, maior Δt).</li><li>Nas colisões, a quantidade de movimento do sistema <b>se conserva</b>. <b>Colisão perfeitamente inelástica</b>: os corpos seguem juntos, com a maior perda de energia cinética.</li></ul>\n<div class=\"lt-ex\"><b class=\"lt-tit\">✍ Exemplo</b><p>Carro de 1.000 kg a 20 m/s bate em outro parado de 1.000 kg e seguem juntos: Q antes = 20.000; depois: 2.000·v → v = 10 m/s.</p></div>",
"quiz": [
{
"p": "Dobrando a velocidade de um veículo, sua energia cinética fica quatro vezes maior.",
"c": true,
"x": "Ec = mv²/2: proporcional ao quadrado da velocidade.",
"e": "Energia cinética."
},
{
"p": "O air bag reduz a força média sobre o ocupante porque aumenta o tempo de interação durante a colisão.",
"c": true,
"x": "Pelo teorema do impulso, F·Δt = ΔQ: maior Δt, menor F.",
"e": "Impulso."
},
{
"p": "Em uma colisão perfeitamente inelástica, a energia cinética total do sistema se conserva.",
"c": false,
"x": "O que se conserva é a quantidade de movimento. A energia cinética tem a maior perda possível.",
"e": "Colisões."
},
{
"p": "Um veículo de 800 kg a 10 m/s tem energia cinética de",
"alts": [
"4.000 J",
"8.000 J",
"40.000 J",
"80.000 J",
"400 J"
],
"r": 2,
"x": "Ec = 800·10²/2 = 800·100/2 = 40.000 J.",
"n": [
"Esqueceu o quadrado.",
"É m·v.",
"Correta.",
"Esqueceu de dividir por 2.",
"Não confere."
],
"e": "Energia cinética."
},
{
"p": "A potência é a rapidez com que um trabalho é realizado, medida em watts no SI.",
"c": true,
"x": "P = τ/Δt.",
"e": "Potência."
},
{
"p": "A quantidade de movimento é uma grandeza escalar.",
"c": false,
"x": "É vetorial (Q = m·v).",
"e": "Quantidade de movimento."
},
{
"p": "Na ausência de forças dissipativas, a energia mecânica de um sistema se conserva.",
"c": true,
"x": "Ec + Ep constante.",
"e": "Conservação da energia."
},
{
"p": "Um corpo de 2 kg a 10 metros de altura tem energia potencial gravitacional de 200 J (g = 10 m/s²).",
"c": true,
"x": "Ep = m·g·h = 2·10·10.",
"e": "Energia potencial."
},
{
"p": "Um veículo de 1.000 kg a 20 m/s tem quantidade de movimento de",
"alts": [
"200 kg·m/s",
"2.000 kg·m/s",
"20.000 kg·m/s",
"200.000 kg·m/s",
"50 kg·m/s"
],
"r": 2,
"x": "Q = m·v.",
"n": [
"Não confere.",
"Não confere.",
"Correta.",
"É a energia cinética em J.",
"Não confere."
],
"e": "Quantidade de movimento."
},
{
"p": "O trabalho da força resultante é igual à variação da energia cinética.",
"c": true,
"x": "Teorema da energia cinética.",
"e": "Trabalho."
},
{
"p": "Na frenagem, a energia cinética do veículo desaparece sem se transformar.",
"c": false,
"x": "É convertida principalmente em calor nos freios e pneus.",
"e": "Conservação da energia."
},
{
"p": "O impulso de uma força é igual ao produto da força pelo intervalo de tempo de atuação.",
"c": true,
"x": "I = F·Δt.",
"e": "Impulso."
},
{
"p": "Um motor de 1.000 W realiza 60.000 J de trabalho em 1 minuto.",
"c": true,
"x": "τ = P·t = 1.000·60.",
"e": "Potência."
},
{
"p": "Em uma colisão elástica, conservam-se a quantidade de movimento e a energia cinética.",
"c": true,
"x": "Na inelástica, só a quantidade de movimento.",
"e": "Colisões."
},
{
"p": "Se a velocidade de um veículo triplica, sua energia cinética fica",
"alts": [
"3 vezes maior",
"6 vezes maior",
"9 vezes maior",
"igual",
"27 vezes maior"
],
"r": 2,
"x": "Ec ∝ v².",
"n": [
"Não é linear.",
"Não confere.",
"Correta.",
"Muda.",
"Seria cúbico."
],
"e": "Energia cinética."
}
]
},
{
"id": "ondas-optica",
"titulo": "Ondas, som, efeito Doppler e óptica (radar e espelhos)",
"arts": "Ondulatória e óptica",
"chaves": [
"ondas",
"som",
"efeito doppler",
"radar",
"espelho convexo",
"optica",
"reflexao",
"refracao"
],
"html": "<h3>Ondas</h3>\n<ul><li><b>v = λ·f</b> (velocidade = comprimento de onda × frequência). Som: onda <b>mecânica</b> e <b>longitudinal</b>, não se propaga no vácuo (≈ 340 m/s no ar). Luz e ondas de rádio: <b>eletromagnéticas</b>, propagam-se no vácuo.</li><li><b>Efeito Doppler</b>: variação da frequência percebida quando há movimento relativo entre fonte e observador. Aproximação: frequência <b>maior</b> (som mais agudo); afastamento: <b>menor</b>. Base dos <b>radares Doppler</b> de velocidade.</li></ul>\n<h3>Óptica</h3>\n<ul><li><b>Espelho convexo</b> (retrovisores externos de muitos veículos): imagem <b>virtual, direita e menor</b>, com <b>campo visual ampliado</b>; por isso os objetos parecem mais distantes.</li><li><b>Espelho plano</b>: imagem virtual, direita, do mesmo tamanho, simétrica. <b>Espelho côncavo</b>: pode ampliar (uso em faróis, refletores).</li><li><b>Refração</b>: mudança de velocidade da luz ao mudar de meio. <b>Miragem</b> no asfalto quente.</li></ul>",
"quiz": [
{
"p": "O efeito Doppler explica a mudança da frequência percebida de uma onda quando há movimento relativo entre a fonte e o observador, princípio usado em radares de velocidade.",
"c": true,
"x": "Na aproximação a frequência percebida aumenta; no afastamento, diminui.",
"e": "Efeito Doppler."
},
{
"p": "O som se propaga no vácuo com velocidade de aproximadamente 340 m/s.",
"c": false,
"x": "O som é onda mecânica e não se propaga no vácuo. 340 m/s é a velocidade no ar.",
"e": "Ondas sonoras."
},
{
"p": "Os espelhos convexos fornecem imagens virtuais, direitas e menores, ampliando o campo de visão, razão pela qual os objetos parecem mais distantes.",
"c": true,
"x": "É o motivo do aviso em alguns retrovisores.",
"e": "Espelhos esféricos."
},
{
"p": "Uma onda de frequência 100 Hz e comprimento de onda 3,4 m tem velocidade de",
"alts": [
"34 m/s",
"340 m/s",
"3.400 m/s",
"29,4 m/s",
"103,4 m/s"
],
"r": 1,
"x": "v = λ·f = 3,4·100 = 340 m/s.",
"n": [
"Erro de potência.",
"Correta.",
"Erro de potência.",
"Dividiu.",
"Somou."
],
"e": "Equação fundamental da ondulatória."
},
{
"p": "A luz se propaga no vácuo com velocidade de aproximadamente 300.000 km/s.",
"c": true,
"x": "3 × 10⁸ m/s.",
"e": "Óptica."
},
{
"p": "As ondas sonoras são transversais no ar.",
"c": false,
"x": "No ar, o som é onda longitudinal.",
"e": "Ondulatória."
},
{
"p": "Na reflexão regular, o ângulo de incidência é igual ao ângulo de reflexão.",
"c": true,
"x": "Leis da reflexão.",
"e": "Óptica."
},
{
"p": "Quando a ambulância se aproxima do observador, o som da sirene parece mais agudo.",
"c": true,
"x": "Efeito Doppler: frequência percebida maior.",
"e": "Efeito Doppler."
},
{
"p": "O radar que mede a velocidade de veículos pela variação da frequência da onda refletida se baseia no",
"alts": [
"princípio de Pascal",
"efeito Doppler",
"princípio de Arquimedes",
"efeito fotoelétrico",
"lei de Ohm"
],
"r": 1,
"x": "A diferença de frequência indica a velocidade relativa.",
"n": [
"Hidrostática.",
"Correta.",
"Empuxo.",
"Emissão de elétrons pela luz.",
"Eletricidade."
],
"e": "Efeito Doppler."
},
{
"p": "A frequência é o número de oscilações por segundo, medida em hertz.",
"c": true,
"x": "Período é o inverso da frequência.",
"e": "Ondulatória."
},
{
"p": "A luz é uma onda mecânica.",
"c": false,
"x": "É onda eletromagnética, que se propaga no vácuo.",
"e": "Óptica."
},
{
"p": "A refração da luz ocorre quando ela muda de meio, alterando sua velocidade.",
"c": true,
"x": "Pode mudar de direção se a incidência for oblíqua.",
"e": "Refração."
},
{
"p": "O espelho côncavo pode formar imagens reais e invertidas.",
"c": true,
"x": "Depende da posição do objeto.",
"e": "Espelhos esféricos."
},
{
"p": "O eco é a reflexão do som percebida separadamente do som original.",
"c": true,
"x": "Exige distância mínima do obstáculo.",
"e": "Acústica."
},
{
"p": "A velocidade de uma onda de frequência 50 Hz e comprimento de onda 2 m é",
"alts": [
"25 m/s",
"52 m/s",
"100 m/s",
"48 m/s",
"200 m/s"
],
"r": 2,
"x": "v = λ·f.",
"n": [
"Dividiu.",
"Somou.",
"Correta.",
"Subtraiu.",
"Não confere."
],
"e": "Ondulatória."
}
]
}
]
};
