// Leitura R.I.S.K. — Informática (gerado de c4-informatica.mat).
export default {
"id": "informatica",
"nome": "Informática",
"cor": "#3182CE",
"ico": "💻",
"apelidos": [
"informatica",
"nocoes de informatica",
"informatica basica",
"tecnologia da informacao"
],
"assuntos": [
{
"id": "hardware-so",
"titulo": "Hardware, sistemas operacionais e arquivos",
"arts": "Windows, Linux e conceitos básicos",
"chaves": [
"hardware",
"software",
"sistema operacional",
"windows",
"linux",
"memoria ram",
"arquivos e pastas",
"atalhos"
],
"html": "<h3>Hardware</h3>\n<ul><li><b>CPU</b> (processador): executa as instruções. <b>Memória RAM</b>: volátil, guarda o que está em uso; perde os dados ao desligar. <b>ROM</b>: não volátil, guarda o firmware (BIOS/UEFI).</li><li><b>Armazenamento</b>: HD (disco magnético), <b>SSD</b> (memória flash, mais rápido, sem partes móveis), pendrive, cartão de memória.</li><li><b>Memória cache</b>: pequena e muito rápida, entre CPU e RAM. Ordem de velocidade: registradores > cache > RAM > SSD > HD.</li><li>Periféricos de <b>entrada</b> (teclado, mouse, scanner), <b>saída</b> (monitor, impressora) e <b>entrada e saída</b> (touchscreen, impressora multifuncional, pendrive).</li></ul>\n<h3>Sistemas operacionais</h3>\n<ul><li><b>Windows</b>: proprietário. Explorador de Arquivos, Lixeira, Painel de Controle/Configurações. <b>Linux</b>: livre e de código aberto (kernel + distribuições como Ubuntu, Debian), comandos como `ls`, `cd`, `mkdir`, `rm`, `chmod`, `sudo`.</li><li>No Linux, o <b>root</b> é o superusuário; arquivos e pastas têm permissões de <b>leitura (r), escrita (w) e execução (x)</b> para dono, grupo e outros.</li></ul>\n<h3>Atalhos que caem (Windows)</h3>\n<table class=\"tab\"><thead><tr><th>Atalho</th><th>Ação</th></tr></thead><tbody><tr><td>Ctrl + C / Ctrl + V / Ctrl + X</td><td>copiar / colar / recortar</td></tr><tr><td>Ctrl + Z / Ctrl + Y</td><td>desfazer / refazer</td></tr><tr><td>Windows + E</td><td>abrir o Explorador de Arquivos</td></tr><tr><td>Windows + D</td><td>mostrar a área de trabalho</td></tr><tr><td>Windows + L</td><td>bloquear o computador</td></tr><tr><td>Alt + Tab</td><td>alternar entre janelas</td></tr><tr><td>Shift + Delete</td><td>excluir <b>sem</b> enviar para a Lixeira</td></tr><tr><td>F2</td><td>renomear</td></tr></tbody></table>\n<ul><li>Arquivos excluídos de <b>pendrive</b> ou de unidade de rede normalmente <b>não vão para a Lixeira</b>.</li></ul>\n<div class=\"lt-peg\"><b class=\"lt-tit\">⚠ Pegadinha</b> <b>RAM é volátil</b> (perde os dados sem energia); <b>ROM</b> não. E <b>Shift + Delete</b> exclui <b>direto</b>, sem passar pela Lixeira.</div>",
"quiz": [
{
"p": "A memória RAM é volátil, ou seja, seu conteúdo é perdido quando o computador é desligado.",
"c": true,
"x": "Por isso o trabalho não salvo se perde em uma queda de energia.",
"e": "Conceito de memória RAM."
},
{
"p": "Arquivos excluídos com Shift + Delete no Windows vão para a Lixeira e podem ser restaurados por ela.",
"c": false,
"x": "Shift + Delete exclui permanentemente, sem passar pela Lixeira.",
"e": "Atalhos do Windows."
},
{
"p": "O Linux é um sistema operacional de código aberto, distribuído em diversas distribuições, como Ubuntu e Debian.",
"c": true,
"x": "O kernel Linux é livre (licença GPL), e as distribuições reúnem kernel e programas.",
"e": "Sistemas operacionais."
},
{
"p": "O SSD armazena dados em memória flash e, por não ter partes móveis, costuma ser mais rápido que o HD.",
"c": true,
"x": "É a principal diferença entre SSD e HD magnético.",
"e": "Dispositivos de armazenamento."
},
{
"p": "No Windows, o atalho que bloqueia o computador é",
"alts": [
"Windows + D",
"Windows + E",
"Windows + L",
"Alt + F4",
"Ctrl + Alt + T"
],
"r": 2,
"x": "Windows + L (de “lock”) bloqueia a sessão.",
"n": [
"Mostra a área de trabalho.",
"Abre o Explorador.",
"Correta.",
"Fecha a janela ativa.",
"Não é atalho padrão do Windows (no Ubuntu abre o terminal)."
],
"e": "Atalhos do Windows."
}
]
},
{
"id": "redes-internet",
"titulo": "Redes, internet, navegadores e correio eletrônico",
"arts": "Conceitos de redes e internet",
"chaves": [
"redes de computadores",
"internet",
"intranet",
"protocolos",
"tcp ip",
"http",
"https",
"dns",
"navegador",
"correio eletronico",
"email"
],
"html": "<h3>Tipos de rede</h3>\n<ul><li><b>LAN</b> (local), <b>MAN</b> (metropolitana), <b>WAN</b> (longa distância, ex.: internet), <b>PAN</b> (pessoal, ex.: Bluetooth).</li><li><b>Internet</b>: rede pública mundial. <b>Intranet</b>: rede <b>privada</b> de uma organização com as <b>mesmas tecnologias</b> da internet. <b>Extranet</b>: parte da intranet aberta a parceiros externos.</li></ul>\n<h3>Protocolos</h3>\n<table class=\"tab\"><thead><tr><th>Protocolo</th><th>Função</th></tr></thead><tbody><tr><td>HTTP / HTTPS</td><td>páginas web (HTTPS = com criptografia TLS, cadeado)</td></tr><tr><td>DNS</td><td>traduz nomes de domínio em endereços IP</td></tr><tr><td>SMTP</td><td><b>envio</b> de e-mail</td></tr><tr><td>POP3</td><td>recebimento, baixando as mensagens</td></tr><tr><td>IMAP</td><td>recebimento, <b>sincronizando</b> com o servidor</td></tr><tr><td>FTP</td><td>transferência de arquivos</td></tr><tr><td>DHCP</td><td>atribui IP automaticamente</td></tr><tr><td>TCP / UDP</td><td>transporte (TCP confiável; UDP rápido, sem garantia)</td></tr></tbody></table>\n<ul><li><b>Endereço IP</b>: IPv4 (32 bits, ex.: 192.168.0.1) e <b>IPv6</b> (128 bits).</li></ul>\n<h3>Navegadores e e-mail</h3>\n<ul><li><b>Navegação anônima/privada</b> não guarda histórico, cookies e formulários <b>no computador</b>, mas <b>não</b> esconde a navegação do provedor ou do empregador.</li><li><b>Cookies</b>: pequenos arquivos que o site grava no navegador. <b>Cache</b>: cópia local de páginas para carregar mais rápido.</li><li>E-mail: <b>CC</b> (cópia visível) e <b>CCO/BCC</b> (cópia oculta: os demais destinatários não veem quem recebeu em CCO).</li></ul>\n<div class=\"lt-dica\"><b class=\"lt-tit\">💡 Dica de memorização</b> <b>S</b>MTP = <b>S</b>ai (envio). <b>I</b>MAP = <b>I</b>gual no servidor e em todos os aparelhos. <b>POP</b> = <b>P</b>uxa para o computador.</div>",
"quiz": [
{
"p": "A intranet é uma rede privada que utiliza os mesmos protocolos e tecnologias da internet.",
"c": true,
"x": "É restrita aos membros da organização, mas usa TCP/IP, HTTP etc.",
"e": "Conceito de intranet."
},
{
"p": "O protocolo SMTP é utilizado para o recebimento de mensagens de correio eletrônico pelo cliente de e-mail.",
"c": false,
"x": "O SMTP é para envio. Para receber, usam-se POP3 ou IMAP.",
"e": "Protocolos de e-mail."
},
{
"p": "O DNS é o serviço que traduz nomes de domínio, como gov.br, em endereços IP.",
"c": true,
"x": "Sem DNS seria preciso digitar o número IP de cada site.",
"e": "Serviço DNS."
},
{
"p": "A navegação anônima impede que o provedor de internet saiba quais sites o usuário visitou.",
"c": false,
"x": "Ela só deixa de gravar dados no próprio navegador. Provedor, rede da empresa e sites ainda podem registrar o acesso.",
"e": "Navegação privada."
},
{
"p": "O destinatário colocado no campo CCO de uma mensagem de e-mail",
"alts": [
"vê os endereços de todos os demais em CCO",
"recebe a mensagem sem que os outros destinatários saibam que ele a recebeu",
"não recebe anexos",
"só recebe se responder",
"aparece para todos como remetente"
],
"r": 1,
"x": "CCO (cópia carbono oculta) esconde o destinatário dos demais.",
"n": [
"Os em CCO não são exibidos.",
"Correta.",
"Recebe os anexos.",
"Não há essa regra.",
"Não é remetente."
],
"e": "Correio eletrônico."
}
]
},
{
"id": "seguranca",
"titulo": "Segurança da informação: ameaças, backup e criptografia",
"arts": "Princípios e pragas virtuais",
"chaves": [
"seguranca da informacao",
"malware",
"virus",
"worm",
"trojan",
"ransomware",
"phishing",
"backup",
"criptografia",
"firewall",
"autenticacao em dois fatores"
],
"html": "<h3>Princípios (CIDA)</h3>\n<ul><li><b>Confidencialidade</b> (só quem pode acessa), <b>Integridade</b> (sem alteração indevida), <b>Disponibilidade</b> (acessível quando preciso) e <b>Autenticidade</b> (origem verdadeira). Também: <b>não repúdio</b> (o autor não pode negar).</li></ul>\n<h3>Pragas (malware)</h3>\n<table class=\"tab\"><thead><tr><th>Praga</th><th>Característica</th></tr></thead><tbody><tr><td>Vírus</td><td>se anexa a arquivos e precisa de <b>execução</b> para se propagar</td></tr><tr><td>Worm</td><td>se <b>autorreplica</b> pela rede, sem hospedeiro</td></tr><tr><td>Cavalo de Troia</td><td>parece útil, mas executa ações maliciosas</td></tr><tr><td><b>Ransomware</b></td><td><b>criptografa</b> os dados e pede resgate</td></tr><tr><td>Spyware / keylogger</td><td>espiona e captura o que é digitado</td></tr><tr><td>Backdoor</td><td>abre acesso remoto escondido</td></tr><tr><td>Bot / botnet</td><td>transforma a máquina em “zumbi” controlado a distância</td></tr><tr><td>Rootkit</td><td>esconde a presença do invasor</td></tr></tbody></table>\n<ul><li><b>Phishing</b>: mensagem falsa para roubar dados (golpe de <b>engenharia social</b>). <b>Pharming</b>: redireciona o usuário para site falso, alterando o DNS.</li></ul>\n<h3>Defesa</h3>\n<ul><li><b>Firewall</b>: filtra o tráfego da rede conforme regras. <b>Antivírus</b>: detecta e remove malware.</li><li><b>Backup</b>: <b>completo</b> (tudo), <b>incremental</b> (o que mudou desde o último backup de qualquer tipo) e <b>diferencial</b> (o que mudou desde o último <b>completo</b>). Regra 3-2-1: 3 cópias, 2 mídias, 1 fora do local.</li><li><b>Criptografia simétrica</b> (mesma chave para cifrar e decifrar) e <b>assimétrica</b> (par de chaves: pública e privada). <b>Assinatura digital</b> usa a chave <b>privada</b> do autor e garante autenticidade, integridade e não repúdio.</li><li><b>Autenticação em dois fatores (2FA)</b>: algo que você <b>sabe</b> (senha), <b>tem</b> (celular, token) ou <b>é</b> (biometria).</li></ul>\n<div class=\"lt-peg\"><b class=\"lt-tit\">⚠ Pegadinha</b> <b>Worm</b> não precisa de hospedeiro nem de execução pelo usuário; <b>vírus</b> precisa. E na assinatura digital usa-se a chave <b>privada</b> de quem assina; quem confere usa a <b>pública</b>.</div>",
"quiz": [
{
"p": "O ransomware é um tipo de código malicioso que torna inacessíveis os dados armazenados em um equipamento, geralmente usando criptografia, e exige pagamento de resgate.",
"c": true,
"x": "É a definição usada pela Cartilha de Segurança do CERT.br.",
"e": "Conceito de ransomware."
},
{
"p": "O worm depende da execução de um arquivo hospedeiro pelo usuário para se propagar.",
"c": false,
"x": "Essa é característica do vírus. O worm se propaga sozinho, explorando vulnerabilidades.",
"e": "Tipos de malware."
},
{
"p": "O backup diferencial copia os arquivos alterados desde o último backup completo.",
"c": true,
"x": "O incremental copia o que mudou desde o último backup de qualquer tipo.",
"e": "Tipos de backup."
},
{
"p": "Na assinatura digital, o autor usa sua chave privada, e o destinatário verifica a assinatura com a chave pública do autor.",
"c": true,
"x": "Isso garante autenticidade, integridade e não repúdio.",
"e": "Criptografia assimétrica."
},
{
"p": "O golpe em que o usuário recebe mensagem falsa, que imita uma instituição conhecida, para que informe senhas ou dados bancários, é chamado de",
"alts": [
"worm",
"phishing",
"firewall",
"backup",
"spyware"
],
"r": 1,
"x": "Phishing é engenharia social por mensagem falsa.",
"n": [
"Worm é praga autorreplicante.",
"Correta.",
"Firewall é defesa.",
"Backup é cópia de segurança.",
"Spyware é programa espião instalado."
],
"e": "Phishing."
}
]
},
{
"id": "office",
"titulo": "Editores de texto e planilhas (Word, Excel, LibreOffice)",
"arts": "Pacotes de escritório",
"chaves": [
"word",
"excel",
"libreoffice",
"writer",
"calc",
"planilha",
"formulas",
"funcoes",
"referencia absoluta"
],
"html": "<h3>Editores de texto</h3>\n<ul><li><b>Word</b> (.docx) e <b>LibreOffice Writer</b> (.odt). Recursos: estilos, sumário automático, controle de alterações, mala direta, cabeçalho e rodapé, quebra de página (Ctrl + Enter).</li><li>Atalhos: <b>Ctrl + N</b> (negrito no Word em português) / <b>Ctrl + B</b> (Writer e Word em inglês); Ctrl + I (itálico); Ctrl + S (sublinhado no Word em português) ou <b>salvar</b> (Writer/inglês). Atenção à versão cobrada.</li></ul>\n<h3>Planilhas</h3>\n<ul><li><b>Excel</b> (.xlsx) e <b>LibreOffice Calc</b> (.ods). Toda fórmula começa com <b>=</b> (também aceita + e −).</li><li><b>Referência relativa</b> (A1) muda ao copiar; <b>absoluta</b> ($A$1) não muda; <b>mista</b> ($A1 ou A$1) trava só coluna ou linha. <b>F4</b> alterna os tipos no Excel.</li></ul>\n<table class=\"tab\"><thead><tr><th>Função</th><th>O que faz</th></tr></thead><tbody><tr><td>=SOMA(A1:A5)</td><td>soma o intervalo</td></tr><tr><td>=MÉDIA(A1:A5)</td><td>média aritmética</td></tr><tr><td>=MÁXIMO / =MÍNIMO</td><td>maior / menor valor</td></tr><tr><td>=CONT.NÚM(A1:A5)</td><td>conta células com <b>números</b></td></tr><tr><td>=CONT.VALORES</td><td>conta células <b>não vazias</b></td></tr><tr><td>=CONT.SE(A1:A5;\">10\")</td><td>conta com critério</td></tr><tr><td>=SE(A1>=7;\"Aprovado\";\"Reprovado\")</td><td>teste lógico</td></tr><tr><td>=PROCV(valor;tabela;coluna;0)</td><td>busca vertical</td></tr><tr><td>=SOMASE</td><td>soma com critério</td></tr></tbody></table>\n<ul><li>No <b>Calc</b>, a referência a outra planilha usa ponto (<b>Planilha1.A1</b>); no <b>Excel</b>, exclamação (<b>Planilha1!A1</b>).</li><li>Erros: <b>#DIV/0!</b> (divisão por zero), <b>#NOME?</b> (função inexistente), <b>#REF!</b> (referência inválida), <b>#VALOR!</b> (tipo errado), <b>#N/D</b> (valor não encontrado no PROCV).</li></ul>\n<div class=\"lt-ex\"><b class=\"lt-tit\">✍ Exemplo</b><p>Em A1 = 10 e B1 = =A1*2. Copiando B1 para B2, a fórmula vira =A2*2 (relativa). Se fosse =$A$1*2, continuaria =$A$1*2.</p></div>",
"quiz": [
{
"p": "Em planilhas eletrônicas, a referência $A$1 permanece inalterada quando a fórmula é copiada para outras células.",
"c": true,
"x": "O cifrão fixa coluna e linha (referência absoluta).",
"e": "Referências em planilhas."
},
{
"p": "A função CONT.NÚM conta todas as células não vazias de um intervalo, inclusive as que contêm texto.",
"c": false,
"x": "CONT.NÚM conta só as células com números. Para não vazias, usa-se CONT.VALORES.",
"e": "Funções de contagem."
},
{
"p": "No Excel, a fórmula =SE(A1>=7;\"Aprovado\";\"Reprovado\") retorna “Aprovado” quando o valor de A1 for 7.",
"c": true,
"x": "O teste A1>=7 é verdadeiro para 7.",
"e": "Função SE."
},
{
"p": "No LibreOffice Calc, a referência a uma célula de outra planilha usa o ponto, como em Planilha1.A1.",
"c": true,
"x": "No Excel, usa-se o ponto de exclamação (Planilha1!A1).",
"e": "LibreOffice Calc."
},
{
"p": "Em uma planilha, a célula A1 contém 8, A2 contém 4 e A3 está vazia. O resultado de =MÉDIA(A1:A3) é",
"alts": [
"4",
"6",
"12",
"0",
"#DIV/0!"
],
"r": 1,
"x": "A função MÉDIA ignora células vazias: (8 + 4) / 2 = 6.",
"n": [
"Seria se a vazia contasse como zero e dividisse por 3 (12/3).",
"Correta.",
"É a soma.",
"Não é o resultado.",
"Só ocorreria se não houvesse números."
],
"e": "Função MÉDIA."
}
]
},
{
"id": "nuvem-dados",
"titulo": "Computação em nuvem, dados, inteligência artificial e LGPD",
"arts": "Conceitos atuais",
"chaves": [
"computacao em nuvem",
"cloud",
"saas",
"paas",
"iaas",
"big data",
"inteligencia artificial",
"lgpd",
"banco de dados",
"bi"
],
"html": "<h3>Nuvem</h3>\n<ul><li><b>IaaS</b> (infraestrutura: servidores, armazenamento), <b>PaaS</b> (plataforma para desenvolver) e <b>SaaS</b> (software pronto pela internet, ex.: webmail, Google Docs).</li><li>Nuvem <b>pública</b>, <b>privada</b>, <b>híbrida</b> e <b>comunitária</b>.</li></ul>\n<h3>Dados e IA</h3>\n<ul><li><b>Big Data</b>: os <b>Vs</b>: volume, velocidade, variedade (e veracidade, valor).</li><li><b>Banco de dados relacional</b>: tabelas, chave primária (identifica cada registro) e chave estrangeira (liga tabelas). <b>SQL</b>: SELECT, INSERT, UPDATE, DELETE.</li><li><b>BI</b> (Business Intelligence): painéis e relatórios para decisão. <b>Mineração de dados</b>: descobrir padrões.</li><li><b>Inteligência artificial</b> e <b>aprendizado de máquina</b>: modelos que aprendem com dados (supervisionado, não supervisionado, por reforço). IA generativa produz texto e imagem.</li></ul>\n<h3>LGPD (Lei 13.709/2018)</h3>\n<ul><li><b>Dado pessoal</b>: informação de pessoa natural identificada ou identificável. <b>Dado sensível</b>: origem racial, religião, opinião política, saúde, vida sexual, genético, biométrico.</li><li><b>Controlador</b> decide sobre o tratamento; <b>operador</b> trata em nome do controlador; <b>encarregado (DPO)</b> é o canal com titulares e ANPD.</li><li>O tratamento para fins exclusivos de <b>segurança pública</b>, defesa e investigação penal <b>não</b> segue a LGPD diretamente (art. 4º, III), devendo ter lei específica.</li></ul>\n<div class=\"lt-peg\"><b class=\"lt-tit\">⚠ Pegadinha</b> A LGPD <b>não se aplica</b> ao tratamento para fins <b>exclusivos</b> de segurança pública e investigação penal (art. 4º, III). Mas aplica-se aos demais tratamentos feitos pelos órgãos públicos.</div>",
"quiz": [
{
"p": "No modelo SaaS de computação em nuvem, o usuário utiliza um software pronto, acessado pela internet, sem gerenciar a infraestrutura.",
"c": true,
"x": "Exemplos: webmail, editores on-line, sistemas de gestão na nuvem.",
"e": "Modelos de serviço em nuvem."
},
{
"p": "A LGPD aplica-se integralmente ao tratamento de dados realizado para fins exclusivos de investigação e repressão de infrações penais.",
"c": false,
"x": "O art. 4º, III, d, exclui esse tratamento, que deve ser regido por legislação específica.",
"e": "LGPD, art. 4º."
},
{
"p": "Em banco de dados relacional, a chave primária identifica de forma única cada registro de uma tabela.",
"c": true,
"x": "Ela não pode se repetir nem ser nula.",
"e": "Banco de dados relacional."
},
{
"p": "Segundo a LGPD, é dado pessoal sensível o dado sobre",
"alts": [
"endereço residencial",
"número de telefone",
"convicção religiosa",
"placa de veículo",
"e-mail profissional"
],
"r": 2,
"x": "O art. 5º, II, lista origem racial ou étnica, convicção religiosa, opinião política, filiação sindical, saúde, vida sexual, dado genético ou biométrico.",
"n": [
"É dado pessoal comum.",
"É dado pessoal comum.",
"Correta.",
"Pode ser dado pessoal, não sensível.",
"É dado pessoal comum."
],
"e": "LGPD, art. 5º, II."
}
]
}
]
};
