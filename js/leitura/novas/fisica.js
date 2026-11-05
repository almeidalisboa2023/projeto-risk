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
}
]
}
]
};
