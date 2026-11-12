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
},
{
"p": "A memória cache é uma memória de alta velocidade que armazena dados usados com frequência pelo processador.",
"c": true,
"x": "Fica entre o processador e a RAM, reduzindo o tempo de acesso.",
"e": "Memória cache."
},
{
"p": "A BIOS/UEFI é armazenada na memória RAM e é apagada quando o computador é desligado.",
"c": false,
"x": "O firmware fica em memória não volátil (ROM/flash) na placa-mãe.",
"e": "Firmware."
},
{
"p": "No Windows, o atalho Ctrl + Shift + Esc abre o Gerenciador de Tarefas.",
"c": true,
"x": "É um atalho direto, sem passar pela tela de segurança do Ctrl + Alt + Del.",
"e": "Atalhos do Windows."
},
{
"p": "No Linux, o comando ls lista o conteúdo de um diretório, e o comando pwd mostra o diretório atual.",
"c": true,
"x": "São comandos básicos do terminal.",
"e": "Comandos Linux."
},
{
"p": "No Linux, o comando rm move arquivos para a lixeira.",
"c": false,
"x": "O rm remove arquivos definitivamente pelo terminal; para mover, usa-se mv.",
"e": "Comandos Linux."
},
{
"p": "O comando chmod, no Linux, altera as permissões de arquivos e diretórios.",
"c": true,
"x": "Ex.: chmod 755 arquivo.",
"e": "Comandos Linux."
},
{
"p": "Um arquivo com extensão .exe é, em regra, um programa executável no Windows.",
"c": true,
"x": "Por isso anexos .exe em e-mails suspeitos são perigosos.",
"e": "Extensões de arquivo."
},
{
"p": "O sistema de arquivos NTFS não suporta permissões de acesso.",
"c": false,
"x": "O NTFS suporta permissões, criptografia (EFS) e arquivos grandes; o FAT32 é mais limitado.",
"e": "Sistemas de arquivos."
},
{
"p": "Um pendrive é um dispositivo de",
"alts": [
"entrada",
"saída",
"armazenamento (entrada e saída de dados)",
"processamento",
"memória volátil"
],
"r": 2,
"x": "Ele lê e grava dados (memória flash não volátil).",
"n": [
"Não é só entrada.",
"Não é só saída.",
"Correta.",
"Não processa.",
"É não volátil."
],
"e": "Dispositivos."
},
{
"p": "No Windows 10/11, o atalho que abre a caixa “Executar” é",
"alts": [
"Windows + E",
"Windows + R",
"Windows + D",
"Ctrl + R",
"Alt + R"
],
"r": 1,
"x": "Windows + R abre o Executar.",
"n": [
"Abre o Explorador.",
"Correta.",
"Mostra a área de trabalho.",
"Atualiza em navegadores.",
"Não é atalho padrão."
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
},
{
"p": "O protocolo HTTPS utiliza criptografia (TLS) para proteger os dados trocados entre o navegador e o servidor.",
"c": true,
"x": "O cadeado no navegador indica conexão HTTPS.",
"e": "Protocolos."
},
{
"p": "O endereço IPv4 tem 128 bits.",
"c": false,
"x": "O IPv4 tem 32 bits; o IPv6, 128 bits.",
"e": "Endereçamento IP."
},
{
"p": "O protocolo DHCP atribui automaticamente endereços IP aos dispositivos de uma rede.",
"c": true,
"x": "É comum nos roteadores domésticos.",
"e": "Protocolos."
},
{
"p": "Na URL https://www.gov.br/prf, o trecho “gov.br” é o domínio.",
"c": true,
"x": "“https” é o protocolo e “/prf” é o caminho.",
"e": "Estrutura de URL."
},
{
"p": "O IMAP permite acessar as mensagens mantendo-as no servidor, sincronizadas entre vários dispositivos.",
"c": true,
"x": "O POP3, em regra, baixa as mensagens para o dispositivo.",
"e": "Protocolos de e-mail."
},
{
"p": "Uma VPN expõe o tráfego da rede, sem nenhuma criptografia.",
"c": false,
"x": "A VPN cria um túnel criptografado entre o dispositivo e a rede de destino.",
"e": "VPN."
},
{
"p": "Cookies são pequenos arquivos que os sites gravam no navegador para guardar informações como preferências e sessões.",
"c": true,
"x": "Podem ser apagados pelas configurações do navegador.",
"e": "Cookies."
},
{
"p": "O protocolo FTP é usado para envio de e-mails.",
"c": false,
"x": "O FTP é para transferência de arquivos; o SMTP, para envio de e-mails.",
"e": "Protocolos."
},
{
"p": "O dispositivo que interliga redes distintas e encaminha pacotes entre elas, como a rede doméstica e a internet, é o",
"alts": [
"hub",
"roteador",
"repetidor",
"modem apenas",
"switch de camada 2"
],
"r": 1,
"x": "O roteador encaminha pacotes entre redes diferentes.",
"n": [
"Só repete o sinal para todos.",
"Correta.",
"Só amplia o sinal.",
"Modula o sinal do provedor.",
"Conecta dispositivos na mesma rede."
],
"e": "Redes."
},
{
"p": "Ao responder um e-mail com “Responder a todos”, a resposta vai para",
"alts": [
"apenas o remetente",
"o remetente e todos os destinatários visíveis (Para e Cc)",
"todos, incluindo os em Cco",
"só os em Cco",
"apenas os em Cc"
],
"r": 1,
"x": "Os destinatários em Cco não aparecem e não recebem a resposta.",
"n": [
"Seria “Responder”.",
"Correta.",
"Os em Cco ficam ocultos.",
"Não.",
"Não só."
],
"e": "Correio eletrônico."
}
]
},
{
"id": "internet-navegadores",
"titulo": "Internet: URL, domínios, protocolos, Google Chrome, cookies, proxy e Marco Civil",
"arts": "Informática Básica 3.4",
"chaves": [
"url",
"dominio",
"google chrome",
"cookies",
"navegacao anonima",
"proxy",
"marco civil da internet",
"lei 12.965",
"protocolos da camada de aplicacao"
],
"html": "<div class=\"lt-stats\"><div class=\"lt-stat\"><b>6 meses</b><span>guarda dos registros de acesso a aplicações (provedor de aplicação)</span></div><div class=\"lt-stat\"><b>1 ano</b><span>guarda dos registros de conexão (provedor de conexão)</span></div><div class=\"lt-stat\"><b>Ctrl+Shift+N</b><span>janela anônima no Chrome</span></div><div class=\"lt-stat\"><b>443</b><span>porta padrão do HTTPS</span></div></div>\n<h3>1. URL e domínios</h3>\n<code class=\"lt-formula\">protocolo://servidor:porta/caminho/arquivo?consulta#fragmento</code>\n<ul><li>Exemplo: <b>https://www.policiacivil.mg.gov.br/noticias?ano=2026</b>. O <b>protocolo</b> (https), o <b>domínio</b> (policiacivil.mg.gov.br), o <b>caminho</b> (/noticias) e a <b>consulta</b> (?ano=2026).</li><li><b>Tipos de URL</b>: <b>absoluta</b> (endereço completo) e <b>relativa</b> (parte do endereço, a partir da página atual). URLs também servem para outros protocolos: <b>ftp://</b>, <b>mailto:</b>, <b>file://</b>.</li><li><b>Domínios</b>: o <b>de primeiro nível</b> (TLD) é o final (.br, .com). No Brasil, o <b>registro.br</b> administra os domínios <b>.br</b>: <b>.gov.br</b> (governo), <b>.jus.br</b> (Judiciário), <b>.leg.br</b> (Legislativo), <b>.mp.br</b> (Ministério Público), <b>.mil.br</b> (militares), <b>.edu.br</b>, <b>.org.br</b>, <b>.com.br</b>.</li></ul>\n<h3>2. Protocolos da camada de aplicação</h3>\n<ul><li><b>HTTP</b> (web), <b>HTTPS</b> (web com <b>TLS</b>: cadeado no navegador), <b>FTP</b> (arquivos), <b>SMTP</b> (envio de e-mail), <b>POP3/IMAP</b> (recebimento), <b>DNS</b> (nomes), <b>DHCP</b>, <b>SSH</b>, <b>SNMP</b>.</li></ul>\n<div class=\"lt-peg\"><b class=\"lt-tit\">⚠ Pegadinha</b> O <b>cadeado do HTTPS</b> garante que a <b>comunicação está cifrada</b> e que o site tem certificado. <b>Não garante que o site é honesto</b>: páginas de phishing também usam HTTPS.</div>\n<h3>3. Google Chrome (versão 93 ou superior)</h3>\n<table class=\"tab\"><thead><tr><th>Atalho</th><th>Função</th></tr></thead><tbody><tr><td>Ctrl+T</td><td>nova guia</td></tr><tr><td>Ctrl+Shift+T</td><td><b>reabrir</b> a guia fechada</td></tr><tr><td>Ctrl+N</td><td>nova janela</td></tr><tr><td><b>Ctrl+Shift+N</b></td><td>janela <b>anônima</b></td></tr><tr><td>Ctrl+H</td><td>histórico</td></tr><tr><td>Ctrl+J</td><td>downloads</td></tr><tr><td>Ctrl+D</td><td>adicionar aos favoritos</td></tr><tr><td>Ctrl+Shift+B</td><td>mostrar/ocultar barra de favoritos</td></tr><tr><td>Ctrl+Shift+Del</td><td>limpar dados de navegação</td></tr><tr><td>Ctrl+L (ou F6)</td><td>selecionar a barra de endereços</td></tr><tr><td>F5 / Ctrl+R</td><td>recarregar</td></tr><tr><td>F11</td><td>tela cheia</td></tr><tr><td>Ctrl+F</td><td>localizar na página</td></tr></tbody></table>\n<ul><li><b>Navegação anônima</b>: ao fechar as janelas anônimas, o Chrome <b>não guarda histórico, cookies, dados de formulários e permissões</b> daquela sessão. Mas <b>downloads e favoritos ficam</b>, e a navegação <b>continua visível</b> para o provedor de internet, o empregador/rede da escola e os sites visitados.</li><li><b>Cookies</b>: pequenos arquivos que os sites gravam no navegador (login, preferências, carrinho, rastreamento). <b>De sessão</b> (somem ao fechar) e <b>persistentes</b> (ficam até expirar); <b>primários</b> (do site visitado) e <b>de terceiros</b> (de anunciantes, usados para rastrear). Podem ser bloqueados nas configurações de <b>Privacidade e segurança</b>.</li><li><b>Privacidade e segurança</b> no Chrome: Navegação segura (alerta de sites perigosos), bloqueio de cookies de terceiros, permissões por site (câmera, microfone, localização), verificação de senhas vazadas.</li></ul>\n<h3>4. Proxy</h3>\n<ul><li><b>Servidor proxy</b> é um <b>intermediário</b> entre o computador e a internet: pode <b>filtrar</b> sites, guardar páginas em <b>cache</b>, registrar acessos e esconder o IP interno. Em órgãos públicos é comum o proxy corporativo.</li><li>No <b>Chrome</b>, a configuração de proxy usa a do <b>sistema operacional</b> (em Configurações > Sistema > \"Abrir as configurações de proxy do computador\").</li></ul>\n<div class=\"lt-pare\"></div>\n<h3>5. Marco Civil da Internet (Lei 12.965/2014)</h3>\n<ul><li><b>Fundamentos e princípios</b>: liberdade de expressão, <b>proteção da privacidade e dos dados pessoais</b>, <b>neutralidade de rede</b> (tratar os pacotes de forma isonômica, sem discriminar por conteúdo, origem ou aplicação), preservação da estabilidade e da segurança da rede.</li><li><b>Guarda de registros</b>: o provedor de <b>conexão</b> guarda os <b>registros de conexão</b> por <b>1 ano</b>; o provedor de <b>aplicação</b> (sites, redes sociais) guarda os <b>registros de acesso a aplicações</b> por <b>6 meses</b>, em sigilo. O fornecimento depende de <b>ordem judicial</b>. Autoridade policial ou MP podem <b>requerer cautelarmente</b> que os registros sejam guardados por prazo maior.</li><li><b>Dados cadastrais</b> (qualificação pessoal, filiação e endereço) podem ser requisitados <b>diretamente</b> por autoridades com competência legal (como o <b>Delegado</b>), sem ordem judicial.</li><li>Provedor de <b>conexão</b> não responde por conteúdo de terceiros. O provedor de <b>aplicação</b> tinha, pelo art. 19, responsabilidade só depois de <b>ordem judicial</b> específica não cumprida.</li></ul>\n<div class=\"lt-jc\"><b class=\"lt-tit\">⚖ Jurisprudência comentada · STF · Temas 533 e 987 (2025)</b><p class=\"jc-tese\">O art. 19 do Marco Civil é parcialmente inconstitucional: para conteúdos ilícitos graves (como crimes), o provedor de aplicação pode responder se, notificado, não remover o conteúdo; para crimes contra a honra, continua valendo a regra da ordem judicial.</p><p class=\"jc-com\">A decisão ampliou o dever de cuidado das plataformas. Para a prova, guarde a regra do texto (art. 19: ordem judicial) e saiba que o STF a flexibilizou. A exceção do art. 21 (nudez ou ato sexual privado divulgado sem autorização) sempre funcionou com <b>notificação da vítima</b>.</p></div>\n<div class=\"lt-pegs\"><b class=\"lt-tit\">🪤 Pegadinhas mais cobradas</b><ol><li>❌ <span class=\"banca\">A navegação anônima esconde o acesso do provedor de internet</span><br>✅ <span class=\"certo\">O provedor, a rede corporativa e os sites ainda veem o acesso.</span></li><li>❌ <span class=\"banca\">Downloads feitos no modo anônimo são apagados</span><br>✅ <span class=\"certo\">Os arquivos baixados e os favoritos permanecem.</span></li><li>❌ <span class=\"banca\">HTTPS garante que o site é confiável</span><br>✅ <span class=\"certo\">HTTPS garante canal cifrado, não a honestidade do site.</span></li><li>❌ <span class=\"banca\">Registros de acesso a aplicações são guardados por 1 ano</span><br>✅ <span class=\"certo\">Aplicações: 6 meses; conexão: 1 ano.</span></li><li>❌ <span class=\"banca\">Dados cadastrais só com ordem judicial</span><br>✅ <span class=\"certo\">Podem ser requisitados diretamente pela autoridade com competência legal.</span></li></ol></div>\n<div class=\"lt-flash-box\"><b class=\"lt-tit\">🃏 Flashcards: clique no cartão para ver a resposta</b><div class=\"lt-flash\"><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>Ctrl+Shift+T no Chrome?</span></span><span class=\"vs\"><span><b>Reabre</b> a última guia fechada.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>O que o modo anônimo NÃO guarda?</span></span><span class=\"vs\"><span>Histórico, cookies e dados de formulário da sessão.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>Proxy?</span></span><span class=\"vs\"><span><b>Intermediário</b> entre o usuário e a internet: filtro, cache, registro.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>Guarda de registros (Marco Civil)?</span></span><span class=\"vs\"><span>Conexão <b>1 ano</b>; aplicações <b>6 meses</b>.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>Neutralidade de rede?</span></span><span class=\"vs\"><span>Tratar os pacotes de forma <b>isonômica</b>, sem discriminar conteúdo.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>Delegado requisita dados cadastrais?</span></span><span class=\"vs\"><span><b>Sim</b>, sem ordem judicial.</span></span></button></div></div>",
"quiz": [
{
"p": "Na navegação anônima do Google Chrome, o histórico e os cookies da sessão não são mantidos após o fechamento das janelas anônimas, mas os arquivos baixados permanecem no computador.",
"c": true,
"prof": "Certo.",
"x": "Os downloads e os favoritos criados no modo anônimo continuam salvos. A navegação também não fica oculta para o provedor de internet nem para a rede corporativa.",
"e": "Anônimo apaga sessão, não downloads."
},
{
"p": "O cadeado exibido na barra de endereços garante que o site acessado é legítimo e não se trata de golpe.",
"c": false,
"prof": "O cadeado diz respeito ao canal.",
"x": "O cadeado indica conexão HTTPS cifrada com certificado válido. Sites de phishing também podem ter HTTPS.",
"e": "Cadeado ≠ site honesto."
},
{
"p": "Segundo o Marco Civil da Internet, o provedor de aplicações deve manter os registros de acesso a aplicações de internet, sob sigilo, pelo prazo de seis meses.",
"c": true,
"prof": "Certo. É o art. 15.",
"x": "O provedor de conexão guarda os registros de conexão por 1 ano (art. 13). O acesso aos registros depende de ordem judicial.",
"e": "Aplicação: 6 meses."
},
{
"p": "A neutralidade de rede autoriza o provedor a reduzir a velocidade de aplicativos de vídeo concorrentes de seus serviços.",
"c": false,
"prof": "É exatamente o que a neutralidade proíbe.",
"x": "A neutralidade exige tratamento isonômico dos pacotes, sem distinção por conteúdo, origem, destino, serviço ou aplicação.",
"e": "Neutralidade = isonomia."
},
{
"p": "O servidor proxy atua como intermediário entre os computadores da rede interna e a internet, podendo filtrar acessos e armazenar páginas em cache.",
"c": true,
"prof": "Certo.",
"x": "Em órgãos públicos, o proxy corporativo controla e registra a navegação.",
"e": "Proxy intermediário."
},
{
"p": "Um investigador fechou, por engano, uma guia do Google Chrome com uma consulta importante. Para reabri-la rapidamente, deve usar:",
"alts": [
"Ctrl + T",
"Ctrl + N",
"Ctrl + Shift + T",
"Ctrl + H",
"Ctrl + Shift + N"
],
"r": 2,
"n": [
"Abre guia nova vazia.",
"Abre janela nova.",
"Correta.",
"Abre o histórico (também resolveria, mas não \"rapidamente\").",
"Abre janela anônima."
],
"prof": "O Shift \"desfaz\" o T.",
"x": "Ctrl+Shift+T reabre a última guia fechada, inclusive várias vezes seguidas, na ordem inversa.",
"e": "Ctrl+Shift+T."
},
{
"p": "Na URL https://www.exemplo.mg.gov.br:8443/sistema/consulta?placa=ABC1D23, assinale a afirmativa correta.",
"alts": [
"\"consulta\" é o domínio de primeiro nível.",
"8443 indica a porta utilizada, diferente da porta padrão do HTTPS.",
"\"placa=ABC1D23\" é o protocolo de transporte.",
"\"gov.br\" indica um site de empresa privada.",
"O protocolo usado é o FTP."
],
"r": 1,
"n": [
"O TLD é .br.",
"Correta: a porta padrão do HTTPS é 443.",
"É a string de consulta.",
".gov.br é governo.",
"O protocolo é HTTPS."
],
"prof": "Depois dos dois-pontos do servidor vem a porta.",
"x": "A estrutura é protocolo (https), servidor (www.exemplo.mg.gov.br), porta (8443), caminho (/sistema/consulta) e consulta (?placa=...).",
"e": ":8443 = porta."
},
{
"p": "Investigando ameaças publicadas em rede social, o Delegado precisa identificar quem usava determinada conta. À luz do Marco Civil da Internet:",
"alts": [
"o provedor deve entregar os registros de acesso diretamente ao Delegado, sem ordem judicial",
"os registros de acesso dependem de ordem judicial, mas os dados cadastrais (qualificação, filiação e endereço) podem ser requisitados pela autoridade com competência legal",
"nenhum dado pode ser fornecido em investigação criminal",
"o provedor de aplicação guarda os registros por 5 anos",
"o provedor de conexão é responsável pelo conteúdo das ameaças"
],
"r": 1,
"n": [
"Registros exigem ordem judicial.",
"Correta: arts. 10, § 3º, e 15, § 3º.",
"Há previsão de fornecimento.",
"O prazo é de 6 meses.",
"O provedor de conexão não responde por conteúdo de terceiros."
],
"prof": "Separe registros (ordem judicial) de dados cadastrais (requisição direta).",
"x": "O Marco Civil exige ordem judicial para os registros de conexão e de acesso, mas permite que autoridades com competência legal requisitem dados cadastrais. Por isso a investigação costuma começar pelo pedido judicial de registros e pelo cadastro.",
"e": "Registro: juiz. Cadastro: requisição."
}
]
},
{
"id": "email-outlook",
"titulo": "Correio eletrônico e Microsoft Outlook 2016",
"arts": "Informática Básica 3.5",
"chaves": [
"correio eletronico",
"e-mail",
"outlook 2016",
"webmail",
"cc",
"cco",
"responder a todos",
"encaminhar",
"pst",
"pgp e-mail",
"smtp",
"pop3",
"imap"
],
"html": "<div class=\"lt-stats\"><div class=\"lt-stat\"><b>Cco</b><span>destinatários ocultos</span></div><div class=\"lt-stat\"><b>25/587</b><span>portas do SMTP (envio)</span></div><div class=\"lt-stat\"><b>.pst</b><span>arquivo de dados (backup) do Outlook</span></div><div class=\"lt-stat\"><b>2</b><span>chaves no PGP: pública e privada</span></div></div>\n<h3>1. Endereço e campos</h3>\n<ul><li>Endereço: <b>usuario@dominio</b> (investigador@pc.mg.gov.br). O que vem depois do @ é o domínio do servidor de e-mail.</li></ul>\n<table class=\"tab\"><thead><tr><th>Campo</th><th>Função</th></tr></thead><tbody><tr><td><b>Para</b></td><td>destinatários principais</td></tr><tr><td><b>Cc</b> (com cópia)</td><td>recebem cópia; <b>todos veem</b> quem está em Cc</td></tr><tr><td><b>Cco</b> (com cópia oculta)</td><td>recebem cópia sem que os demais saibam; <b>ninguém vê</b> os endereços em Cco</td></tr><tr><td><b>Assunto</b></td><td>resumo da mensagem</td></tr><tr><td><b>Anexo</b></td><td>arquivo enviado junto (limite de tamanho do servidor)</td></tr></tbody></table>\n<ul><li><b>Responder</b>: só ao remetente, <b>sem os anexos</b>. <b>Responder a todos</b>: ao remetente e aos que estavam em Para e Cc (<b>não</b> inclui quem estava em <b>Cco</b>), sem anexos. <b>Encaminhar</b>: a outra pessoa, <b>com os anexos</b>.</li></ul>\n<h3>2. Envio e recebimento</h3>\n<ul><li><b>SMTP</b> envia (do programa ao servidor e entre servidores). <b>POP3</b> baixa as mensagens para o computador (em geral, apaga do servidor). <b>IMAP</b> sincroniza: as mensagens <b>ficam no servidor</b> e aparecem iguais em todos os dispositivos.</li><li><b>Webmail</b>: acesso pelo <b>navegador</b> (Gmail, Outlook.com), sem instalar programa. <b>Cliente de e-mail</b>: programa instalado (Outlook, Thunderbird).</li></ul>\n<h3>3. Outlook 2016</h3>\n<ul><li>Pastas padrão: <b>Caixa de Entrada</b>, <b>Itens Enviados</b>, <b>Rascunhos</b>, <b>Caixa de Saída</b> (aguardando envio), <b>Lixo Eletrônico</b> (spam), <b>Itens Excluídos</b>, <b>Arquivo Morto</b>.</li><li><b>Regras</b>: mover automaticamente mensagens por remetente, assunto ou palavras. <b>Categorias</b>, <b>sinalizadores</b> e <b>pesquisa</b> ajudam a organizar.</li><li><b>Backup</b>: o Outlook guarda os dados em <b>arquivos .pst</b> (Arquivo de Dados do Outlook), que podem ser <b>exportados/importados</b>; o <b>.ost</b> é a cópia off-line de contas Exchange/IMAP. O <b>Arquivamento</b> (AutoArquivar) move mensagens antigas para um .pst.</li><li><b>Compactação</b>: arquivos grandes podem ser compactados (.zip) antes de anexar; o Outlook também tem \"Limpeza da Caixa de Correio\".</li></ul>\n<div class=\"lt-pare\"></div>\n<h3>4. Sigilo e autenticidade com PGP</h3>\n<table class=\"tab\"><thead><tr><th>Objetivo</th><th>Quem usa qual chave</th></tr></thead><tbody><tr><td><b>Sigilo</b> (confidencialidade)</td><td>o remetente <b>cifra</b> com a <b>chave pública do destinatário</b>; só a <b>chave privada do destinatário</b> decifra</td></tr><tr><td><b>Autenticidade</b> (e integridade, não repúdio)</td><td>o remetente <b>assina</b> com a <b>sua chave privada</b>; qualquer um confere com a <b>chave pública do remetente</b></td></tr></tbody></table>\n<ul><li>A <b>chave pública</b> pode ser divulgada (inclusive em <b>servidores de chaves</b>, consultados pela web ou por aplicativos); a <b>chave privada</b> nunca é compartilhada.</li></ul>\n<div class=\"lt-dica\"><b class=\"lt-tit\">💡 Dica de memorização</b> Para <b>esconder</b>, use a chave do <b>outro</b> (pública do destinatário). Para <b>assinar</b>, use a <b>sua</b> (privada).</div>\n<div class=\"lt-pegs\"><b class=\"lt-tit\">🪤 Pegadinhas mais cobradas</b><ol><li>❌ <span class=\"banca\">Quem está em Cco recebe as respostas do \"Responder a todos\"</span><br>✅ <span class=\"certo\">O \"Responder a todos\" não inclui os destinatários em Cco.</span></li><li>❌ <span class=\"banca\">Responder envia os anexos de volta</span><br>✅ <span class=\"certo\">Responder não reenvia anexos; Encaminhar envia.</span></li><li>❌ <span class=\"banca\">POP3 mantém tudo sincronizado em vários aparelhos</span><br>✅ <span class=\"certo\">Quem sincroniza é o IMAP.</span></li><li>❌ <span class=\"banca\">Para cifrar uso minha chave privada</span><br>✅ <span class=\"certo\">Para cifrar, a chave PÚBLICA do destinatário; para assinar, a minha PRIVADA.</span></li><li>❌ <span class=\"banca\">O arquivo .pst é o executável do Outlook</span><br>✅ <span class=\"certo\">.pst é o arquivo de dados (backup) das mensagens.</span></li></ol></div>\n<div class=\"lt-flash-box\"><b class=\"lt-tit\">🃏 Flashcards: clique no cartão para ver a resposta</b><div class=\"lt-flash\"><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>Cc x Cco?</span></span><span class=\"vs\"><span><b>Cc</b>: todos veem. <b>Cco</b>: ninguém vê os endereços.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>Encaminhar leva anexos?</span></span><span class=\"vs\"><span><b>Sim</b>. Responder <b>não</b>.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>SMTP, POP3, IMAP?</span></span><span class=\"vs\"><span><b>Envio</b>; baixar; <b>sincronizar</b> no servidor.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>Backup do Outlook?</span></span><span class=\"vs\"><span>Arquivo <b>.pst</b>.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>PGP: cifrar?</span></span><span class=\"vs\"><span><b>Chave pública do destinatário</b>.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>PGP: assinar?</span></span><span class=\"vs\"><span><b>Minha chave privada</b>.</span></span></button></div></div>",
"quiz": [
{
"p": "Os destinatários incluídos no campo Cco recebem a mensagem sem que os demais destinatários vejam seus endereços.",
"c": true,
"prof": "Certo.",
"x": "Cco (cópia oculta) protege a lista de destinatários. É útil para avisos coletivos.",
"e": "Cco oculta."
},
{
"p": "Ao utilizar a opção Responder a todos, a resposta é enviada também aos destinatários que estavam em Cco na mensagem original.",
"c": false,
"prof": "Quem estava oculto continua fora.",
"x": "Responder a todos inclui o remetente e os destinatários de Para e Cc. Os de Cco não aparecem para os demais e não recebem a resposta.",
"e": "Cco fora do Responder a todos."
},
{
"p": "A opção Encaminhar envia a mensagem a outro destinatário, mantendo os anexos originais.",
"c": true,
"prof": "Certo.",
"x": "Responder e Responder a todos, em regra, não reenviam os anexos.",
"e": "Encaminhar leva anexos."
},
{
"p": "O protocolo POP3 mantém as mensagens sincronizadas no servidor, permitindo que apareçam iguais no celular e no computador.",
"c": false,
"prof": "Esse é o IMAP.",
"x": "O POP3 baixa as mensagens para o dispositivo. O IMAP mantém as mensagens no servidor, sincronizadas.",
"e": "IMAP sincroniza."
},
{
"p": "No PGP, para garantir que apenas o destinatário leia a mensagem, o remetente deve cifrá-la com a chave pública do destinatário.",
"c": true,
"prof": "Certo.",
"x": "Só a chave privada correspondente, que fica com o destinatário, decifra a mensagem.",
"e": "Sigilo: pública do destinatário."
},
{
"p": "Uma escrivã precisa enviar um relatório a um Delegado, comprovando que foi ela quem o enviou e que o conteúdo não foi alterado. Usando PGP, ela deve:",
"alts": [
"cifrar a mensagem com a chave pública do Delegado",
"cifrar a mensagem com a chave privada do Delegado",
"assinar a mensagem com a sua própria chave privada",
"assinar a mensagem com a chave pública do Delegado",
"enviar a sua chave privada junto da mensagem"
],
"r": 2,
"n": [
"Isso garante sigilo, não autoria.",
"Ela não tem a chave privada do Delegado.",
"Correta: assinatura digital.",
"Chave pública não assina.",
"A chave privada nunca é enviada."
],
"prof": "Autoria = assinatura = minha chave privada.",
"x": "A assinatura digital, feita com a chave privada do remetente, garante autenticidade, integridade e não repúdio; o Delegado confere com a chave pública da escrivã.",
"e": "Assinar com a minha privada."
},
{
"p": "Em ambiente corporativo com o Outlook 2016, o usuário quer fazer cópia de segurança de todas as mensagens e pastas para restaurá-las em outro computador. Ele deve:",
"alts": [
"copiar o atalho do Outlook da área de trabalho",
"exportar os dados para um arquivo .pst",
"esvaziar a pasta Itens Excluídos",
"criar uma regra de encaminhamento",
"mover as mensagens para Rascunhos"
],
"r": 1,
"n": [
"O atalho não contém dados.",
"Correta.",
"Isso apaga mensagens.",
"Encaminhamento não é backup.",
"Rascunhos é só uma pasta."
],
"prof": ".pst = backup do Outlook.",
"x": "O Arquivo de Dados do Outlook (.pst) guarda mensagens, contatos e calendário e pode ser importado em outro computador.",
"e": "Exportar .pst."
},
{
"p": "Um investigador deseja enviar um alerta a 40 vítimas de um golpe, sem que uma veja o e-mail das outras. Ele deve colocar os endereços das vítimas no campo:",
"alts": [
"Para",
"Cc",
"Cco",
"Assunto",
"Responder para"
],
"r": 2,
"n": [
"Todos veriam.",
"Todos veriam.",
"Correta.",
"Não é campo de endereço.",
"Define para quem vão as respostas."
],
"prof": "Privacidade dos destinatários = Cco.",
"x": "Em Cco, cada destinatário recebe a mensagem sem ver os demais endereços, o que protege dados pessoais das vítimas.",
"e": "Cco."
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
},
{
"p": "O firewall filtra o tráfego de rede segundo regras, podendo bloquear acessos não autorizados.",
"c": true,
"x": "Pode ser software ou hardware.",
"e": "Firewall."
},
{
"p": "O antivírus dispensa a necessidade de backup.",
"c": false,
"x": "Antivírus não protege contra perda de dados por falha, exclusão ou ransomware já ativo. Backup é essencial.",
"e": "Boas práticas."
},
{
"p": "Keylogger é um tipo de spyware que captura e armazena as teclas digitadas pelo usuário.",
"c": true,
"x": "É usado para roubar senhas.",
"e": "Malware."
},
{
"p": "A engenharia social explora a confiança e o descuido das pessoas para obter informações.",
"c": true,
"x": "O phishing é a forma mais comum.",
"e": "Engenharia social."
},
{
"p": "O backup incremental copia todos os arquivos a cada execução.",
"c": false,
"x": "Esse é o backup completo. O incremental copia só o que mudou desde o último backup.",
"e": "Tipos de backup."
},
{
"p": "A integridade garante que a informação não foi alterada de forma não autorizada.",
"c": true,
"x": "É um dos princípios da segurança da informação.",
"e": "Princípios."
},
{
"p": "Na criptografia simétrica, a mesma chave é usada para cifrar e decifrar.",
"c": true,
"x": "Exemplo: AES.",
"e": "Criptografia."
},
{
"p": "O certificado digital ICP-Brasil não tem validade jurídica no Brasil.",
"c": false,
"x": "Documentos assinados com certificado ICP-Brasil têm presunção de veracidade (MP 2.200-2/2001).",
"e": "MP 2.200-2/2001."
},
{
"p": "O malware que se disfarça de programa legítimo para, depois de instalado, executar ações maliciosas é o",
"alts": [
"worm",
"cavalo de Troia",
"adware",
"ransomware",
"rootkit"
],
"r": 1,
"x": "O trojan depende de o usuário instalá-lo.",
"n": [
"Se autorreplica.",
"Correta.",
"Exibe propaganda.",
"Sequestra dados.",
"Esconde a presença do invasor."
],
"e": "Malware."
},
{
"p": "A autenticação que combina uma senha com um código enviado ao celular usa",
"alts": [
"um único fator",
"dois fatores (algo que sabe e algo que tem)",
"biometria",
"criptografia simétrica",
"apenas um token físico"
],
"r": 1,
"x": "É a autenticação em dois fatores (2FA).",
"n": [
"São dois fatores.",
"Correta.",
"Não há biometria.",
"Não é o conceito.",
"Não é o caso."
],
"e": "Autenticação."
}
]
},
{
"id": "certificacao-software-livre",
"titulo": "Certificação digital, ICP-Brasil, criptografia PGP e software livre",
"arts": "Informática Básica 3.8 e 3.9",
"chaves": [
"certificacao digital",
"certificado digital",
"icp-brasil",
"autoridade certificadora",
"a1",
"a3",
"criptografia assimetrica",
"pgp",
"chave publica",
"chave privada",
"software livre",
"gpl",
"bsd",
"fsdg"
],
"html": "<div class=\"lt-stats\"><div class=\"lt-stat\"><b>MP 2.200-2</b><span>criou a ICP-Brasil (2001)</span></div><div class=\"lt-stat\"><b>ITI</b><span>é a AC-Raiz brasileira</span></div><div class=\"lt-stat\"><b>A1 / A3</b><span>certificado em arquivo (até 1 ano) / em token ou cartão (até 5 anos)</span></div><div class=\"lt-stat\"><b>4</b><span>liberdades do software livre (0 a 3)</span></div></div>\n<h3>1. Criptografia: simétrica e assimétrica</h3>\n<ul><li><b>Simétrica</b>: <b>uma única chave</b> cifra e decifra (rápida; problema é compartilhar a chave). Ex.: AES.</li><li><b>Assimétrica</b> (chave pública): <b>par de chaves</b> matematicamente ligadas. O que uma cifra, só a outra decifra. Ex.: RSA. É a base da <b>certificação digital</b> e do <b>PGP</b>.</li><li><b>Hash</b>: \"impressão digital\" de tamanho fixo de um arquivo (SHA-256). Qualquer alteração muda o hash: serve para conferir <b>integridade</b> (muito usado em prova digital).</li></ul>\n<h3>2. Assinatura digital e certificado digital</h3>\n<ul><li><b>Assinatura digital</b> = hash do documento cifrado com a <b>chave privada</b> do signatário. Garante <b>autenticidade</b>, <b>integridade</b> e <b>não repúdio</b>. <b>Não garante sigilo</b>.</li><li><b>Certificado digital</b> é o documento eletrônico que <b>vincula uma chave pública a uma pessoa ou instituição</b>, emitido e assinado por uma <b>Autoridade Certificadora (AC)</b>. Tem prazo de validade e pode ser <b>revogado</b> (lista de certificados revogados).</li></ul>\n<h3>3. ICP-Brasil (MP 2.200-2/2001)</h3>\n<div class=\"lt-fluxo\"><span>AC-Raiz (ITI)</span> <em>→</em> <span>Autoridades Certificadoras (ACs)</span> <em>→</em> <span>Autoridades de Registro (ARs: validação presencial ou por videoconferência)</span> <em>→</em> <span>Titular do certificado</span></div>\n<ul><li>Documentos assinados com certificado <b>ICP-Brasil</b> têm <b>presunção de veracidade</b> em relação ao signatário (equivalem à assinatura de próprio punho). A Lei 14.063/2020 chama essa assinatura de <b>qualificada</b>.</li></ul>\n<table class=\"tab\"><thead><tr><th>Tipo</th><th>Onde fica a chave</th><th>Validade usual</th></tr></thead><tbody><tr><td><b>A1</b></td><td>arquivo no computador (software)</td><td>até <b>1 ano</b></td></tr><tr><td><b>A3</b></td><td><b>token</b>, <b>cartão inteligente</b> ou nuvem (hardware criptográfico)</td><td>até <b>5 anos</b></td></tr><tr><td>S1 / S3</td><td>certificados de <b>sigilo</b> (cifragem)</td><td>conforme a política</td></tr><tr><td>T3 / T4</td><td>carimbo do <b>tempo</b></td><td>conforme a política</td></tr></tbody></table>\n<ul><li><b>Aplicativos de segurança</b>: antivírus, firewall, antispyware, antispam, gerenciadores de senha, VPN e os programas de assinatura e de cifragem (como o GnuPG, que implementa o padrão OpenPGP).</li></ul>\n<h3>4. PGP na prática</h3>\n<ul><li>O PGP combina criptografia simétrica (rápida, para a mensagem) e assimétrica (para proteger a chave e assinar). Usa a <b>rede de confiança</b>: os usuários assinam as chaves uns dos outros, em vez de depender de uma AC central.</li><li><b>Chaves públicas</b> podem ser <b>enviadas e consultadas em servidores de chaves</b> (keyservers) pela <b>interface web</b> ou pelos próprios aplicativos; a <b>impressão digital</b> (fingerprint) serve para conferir se a chave é mesmo de quem diz ser.</li></ul>\n<div class=\"lt-pare\"></div>\n<h3>5. Software livre</h3>\n<ul><li>Segundo a Free Software Foundation, é livre o software que respeita <b>quatro liberdades</b>: <b>0</b> – executar para qualquer finalidade; <b>1</b> – estudar e adaptar (exige <b>acesso ao código-fonte</b>); <b>2</b> – redistribuir cópias; <b>3</b> – melhorar e distribuir as melhorias. <b>Livre não significa grátis</b> (free as in freedom).</li></ul>\n<table class=\"tab\"><thead><tr><th>Licença</th><th>Tipo</th><th>Efeito</th></tr></thead><tbody><tr><td><b>GPLv2</b> (1991) e <b>GPLv3</b> (2007)</td><td><b>copyleft</b></td><td>quem distribui versão modificada deve mantê-la <b>sob a mesma licença</b> e liberar o código; a v3 trata de <b>patentes</b> e <b>tivoização</b> (impedir que o hardware rode versões modificadas)</td></tr><tr><td><b>BSD</b></td><td><b>permissiva</b></td><td>permite incorporar o código, inclusive em <b>software proprietário</b>, mantendo o aviso de direitos autorais</td></tr><tr><td><b>GNU FSDG</b></td><td>diretrizes da FSF</td><td>critérios para uma <b>distribuição</b> ser 100% livre: sem programas, firmwares (\"blobs\") ou repositórios não livres, nem incentivo a instalá-los</td></tr></tbody></table>\n<div class=\"lt-peg\"><b class=\"lt-tit\">⚠ Pegadinha</b> O <b>Linux</b> (kernel) é GPLv2. Distribuições populares como Ubuntu e Debian <b>não</b> estão na lista da FSF de distribuições que seguem a FSDG, porque oferecem ou incluem componentes não livres; exemplos aceitos são o <b>Trisquel</b> e o <b>Parabola</b>.</div>\n<div class=\"lt-pegs\"><b class=\"lt-tit\">🪤 Pegadinhas mais cobradas</b><ol><li>❌ <span class=\"banca\">Assinatura digital garante sigilo</span><br>✅ <span class=\"certo\">Garante autenticidade, integridade e não repúdio; sigilo vem da cifragem.</span></li><li>❌ <span class=\"banca\">A AC-Raiz da ICP-Brasil é o Serpro</span><br>✅ <span class=\"certo\">A AC-Raiz é o ITI.</span></li><li>❌ <span class=\"banca\">O certificado A1 fica em token</span><br>✅ <span class=\"certo\">O A1 fica em arquivo; o A3 em token ou cartão.</span></li><li>❌ <span class=\"banca\">Software livre é sempre gratuito</span><br>✅ <span class=\"certo\">Livre = liberdades; pode ser vendido.</span></li><li>❌ <span class=\"banca\">A BSD obriga o código derivado a continuar livre</span><br>✅ <span class=\"certo\">Quem obriga é a GPL (copyleft); a BSD é permissiva.</span></li></ol></div>\n<div class=\"lt-flash-box\"><b class=\"lt-tit\">🃏 Flashcards: clique no cartão para ver a resposta</b><div class=\"lt-flash\"><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>Assinatura digital garante?</span></span><span class=\"vs\"><span><b>Autenticidade, integridade e não repúdio</b> (não sigilo).</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>AC-Raiz da ICP-Brasil?</span></span><span class=\"vs\"><span><b>ITI</b>.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>A1 x A3?</span></span><span class=\"vs\"><span><b>A1</b>: arquivo, até 1 ano. <b>A3</b>: token/cartão, até 5 anos.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>4 liberdades?</span></span><span class=\"vs\"><span><b>Executar, estudar, redistribuir, melhorar</b>.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>GPL x BSD?</span></span><span class=\"vs\"><span><b>GPL</b>: copyleft. <b>BSD</b>: permissiva.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>FSDG?</span></span><span class=\"vs\"><span>Diretrizes da FSF para <b>distribuições</b> totalmente livres.</span></span></button></div></div>",
"quiz": [
{
"p": "A assinatura digital garante a autenticidade, a integridade e o não repúdio de um documento, mas não garante, por si só, a sua confidencialidade.",
"c": true,
"prof": "Certo.",
"x": "Para confidencialidade é preciso cifrar o conteúdo, por exemplo com a chave pública do destinatário.",
"e": "Assinatura ≠ sigilo."
},
{
"p": "Na ICP-Brasil, a Autoridade Certificadora Raiz é exercida pelas Autoridades de Registro, responsáveis por emitir os certificados aos usuários finais.",
"c": false,
"prof": "Funções trocadas.",
"x": "A AC-Raiz é o ITI. As ACs emitem os certificados, e as ARs fazem a identificação e o cadastro dos titulares.",
"e": "AC-Raiz = ITI."
},
{
"p": "O certificado digital do tipo A3 tem a chave privada armazenada em hardware criptográfico, como token ou cartão inteligente.",
"c": true,
"prof": "Certo.",
"x": "O A1 fica em arquivo no computador e tem validade usual de até 1 ano.",
"e": "A3 = hardware."
},
{
"p": "Por definição, software livre é aquele distribuído gratuitamente, ainda que sem acesso ao código-fonte.",
"c": false,
"prof": "Liberdade, não preço.",
"x": "Software livre garante as quatro liberdades, e a liberdade de estudar e adaptar exige acesso ao código-fonte. Pode ser vendido; freeware fechado não é software livre.",
"e": "Livre ≠ grátis."
},
{
"p": "A licença GPL é do tipo copyleft, exigindo que as obras derivadas distribuídas mantenham a mesma licença.",
"c": true,
"prof": "Certo.",
"x": "A licença BSD, ao contrário, é permissiva e admite a incorporação do código em software proprietário.",
"e": "GPL = copyleft."
},
{
"p": "Um perito precisa demonstrar, em juízo, que o arquivo de vídeo entregue à defesa é exatamente igual ao extraído do DVR apreendido. O recurso técnico mais adequado é:",
"alts": [
"comparar o tamanho dos dois arquivos em megabytes",
"assistir aos dois vídeos ao mesmo tempo",
"calcular e comparar o hash (por exemplo, SHA-256) dos dois arquivos",
"converter os arquivos para PDF",
"renomear os arquivos com a data da apreensão"
],
"r": 2,
"n": [
"Arquivos diferentes podem ter o mesmo tamanho.",
"Comparação visual não prova identidade.",
"Correta.",
"Conversão altera o arquivo.",
"Nome não comprova conteúdo."
],
"prof": "Integridade de arquivo = hash.",
"x": "Qualquer alteração em um bit gera hash completamente diferente. Hashes iguais demonstram que os arquivos são idênticos.",
"e": "Hash."
},
{
"p": "Sobre a ICP-Brasil e os certificados digitais, assinale a afirmativa correta.",
"alts": [
"O certificado digital vincula uma chave privada a uma pessoa e deve ser divulgado amplamente.",
"O certificado digital vincula uma chave pública ao seu titular e é assinado por uma Autoridade Certificadora.",
"O certificado A1 tem validade usual de 5 anos e fica em cartão inteligente.",
"A ICP-Brasil foi criada pela LGPD.",
"Documento assinado com certificado ICP-Brasil não tem validade jurídica."
],
"r": 1,
"n": [
"Vincula a chave PÚBLICA; a privada é secreta.",
"Correta.",
"Essas são características do A3.",
"Foi criada pela MP 2.200-2/2001.",
"Tem presunção de veracidade."
],
"prof": "Certificado = chave pública + identidade + assinatura da AC.",
"x": "O certificado associa a chave pública ao titular e é assinado pela AC. Documentos assinados com certificado ICP-Brasil presumem-se verdadeiros em relação aos signatários.",
"e": "Certificado: chave pública."
},
{
"p": "Uma empresa quer usar código de um projeto livre em seu produto comercial de código fechado, sem divulgar o código-fonte das alterações. A licença do projeto que permite isso é a:",
"alts": [
"GPLv2",
"GPLv3",
"BSD",
"qualquer licença copyleft",
"nenhuma licença livre permite"
],
"r": 2,
"n": [
"GPL exige manter a licença nas obras distribuídas.",
"Também copyleft.",
"Correta: licença permissiva.",
"Copyleft impede o fechamento.",
"Licenças permissivas permitem."
],
"prof": "Permissiva deixa fechar; copyleft não.",
"x": "A BSD exige apenas a manutenção do aviso de direitos autorais e permite incorporar o código em software proprietário. A GPL (v2 e v3) obriga as obras derivadas distribuídas a seguir livres.",
"e": "BSD permite."
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
},
{
"p": "No Excel, a função =SOMA(A1:A3) soma os valores das células A1, A2 e A3.",
"c": true,
"x": "O sinal de dois pontos indica intervalo.",
"e": "Excel."
},
{
"p": "No Excel, a função =SE(A1>10;\"Alto\";\"Baixo\") retorna “Baixo” se A1 for igual a 10.",
"c": true,
"x": "O teste A1>10 é falso para 10.",
"e": "Função SE."
},
{
"p": "No Excel, a referência A$1 trava a coluna e deixa a linha livre.",
"c": false,
"x": "O cifrão antes do 1 trava a linha; a coluna fica livre.",
"e": "Referências."
},
{
"p": "A função PROCV procura um valor na primeira coluna de uma tabela e retorna o valor de uma coluna indicada na mesma linha.",
"c": true,
"x": "O último argumento 0 (ou FALSO) exige correspondência exata.",
"e": "PROCV."
},
{
"p": "No Word, a quebra de página manual pode ser inserida com Ctrl + Enter.",
"c": true,
"x": "Inicia o texto seguinte em nova página.",
"e": "Word."
},
{
"p": "No Excel, o erro #DIV/0! indica que a função não existe.",
"c": false,
"x": "#DIV/0! indica divisão por zero. Função inexistente gera #NOME?.",
"e": "Erros do Excel."
},
{
"p": "O recurso de mala direta permite gerar vários documentos personalizados a partir de uma lista de dados.",
"c": true,
"x": "Existe no Word e no Writer.",
"e": "Mala direta."
},
{
"p": "A função =CONT.SE(A1:A10;\">=7\") conta as células do intervalo com valor maior ou igual a 7.",
"c": true,
"x": "É a contagem com critério.",
"e": "CONT.SE."
},
{
"p": "No Excel, as células A1 = 2, A2 = 4 e A3 = 6. O resultado de =MÁXIMO(A1:A3)-MÍNIMO(A1:A3) é",
"alts": [
"2",
"4",
"6",
"8",
"12"
],
"r": 1,
"x": "6 − 2 = 4.",
"n": [
"Não confere.",
"Correta.",
"É o máximo.",
"Não confere.",
"É a soma."
],
"e": "Funções do Excel."
},
{
"p": "Uma fórmula =A1*$B$1 em C1, copiada para C2, ficará",
"alts": [
"=A1*$B$1",
"=A2*$B$1",
"=A2*$B$2",
"=A2*B2",
"=B2*$B$1"
],
"r": 1,
"x": "A1 é relativa (vira A2); $B$1 é absoluta.",
"n": [
"A referência relativa muda.",
"Correta.",
"A absoluta não muda.",
"A absoluta não muda.",
"A coluna de A1 não muda ao copiar para baixo."
],
"e": "Referências."
}
]
},
{
"id": "apresentacoes",
"titulo": "Apresentações: PowerPoint 2016 e LibreOffice Impress 7.1",
"arts": "Informática Básica 3.6.1",
"chaves": [
"powerpoint",
"impress",
"slide mestre",
"transicao",
"animacao",
"apresentacao de slides",
"f5",
"shift+f5",
"ppsx",
"odp",
"modo de exibicao"
],
"html": "<div class=\"lt-stats\"><div class=\"lt-stat\"><b>F5</b><span>inicia a apresentação do começo</span></div><div class=\"lt-stat\"><b>Shift+F5</b><span>inicia do slide atual</span></div><div class=\"lt-stat\"><b>.pptx / .odp</b><span>formatos padrão (PowerPoint / Impress)</span></div><div class=\"lt-stat\"><b>.ppsx</b><span>abre direto no modo apresentação</span></div></div>\n<h3>1. Estrutura</h3>\n<ul><li><b>Slide mestre</b> (PowerPoint: Exibir > <b>Slide Mestre</b>; Impress: Exibir > <b>Slide mestre</b>) controla fontes, cores, logotipos e posições de <b>todos</b> os slides que o usam. <b>Layouts</b> (Título e conteúdo, Duas colunas…) são modelos de disposição.</li><li><b>Modos de exibição</b> do PowerPoint: <b>Normal</b> (edição), <b>Classificação de Slides</b> (miniaturas para reordenar), <b>Anotações</b> (notas do apresentador), <b>Modo de Exibição de Leitura</b> e <b>Apresentação de Slides</b>. O <b>Modo do Apresentador</b> mostra as anotações e o próximo slide só para quem apresenta.</li></ul>\n<h3>2. Edição e formatação</h3>\n<ul><li>Inserir: caixas de texto, imagens, formas, <b>SmartArt</b>, tabelas, gráficos, <b>áudio e vídeo</b>, hiperlinks, numeração de slides e rodapé.</li><li><b>Transição</b> = efeito <b>entre</b> um slide e outro. <b>Animação</b> = efeito em um <b>objeto dentro</b> do slide (entrada, ênfase, saída, trajetória).</li><li><b>Ocultar slide</b>: ele continua no arquivo, mas não aparece na apresentação.</li><li><b>Impressão</b>: slides inteiros, <b>folhetos</b> (vários slides por página, para o público) ou <b>anotações</b>.</li></ul>\n<table class=\"tab\"><thead><tr><th>Atalho</th><th>PowerPoint</th><th>Impress</th></tr></thead><tbody><tr><td>Iniciar do começo</td><td><b>F5</b></td><td><b>F5</b></td></tr><tr><td>Iniciar do slide atual</td><td><b>Shift+F5</b></td><td>Shift+F5</td></tr><tr><td>Encerrar</td><td>Esc</td><td>Esc</td></tr><tr><td>Novo slide</td><td>Ctrl+M</td><td>(menu Slide > Novo slide)</td></tr></tbody></table>\n<div class=\"lt-pare\"></div>\n<h3>3. Formatos</h3>\n<ul><li>PowerPoint: <b>.pptx</b> (apresentação), <b>.ppsx</b> (abre <b>direto em apresentação</b>), <b>.potx</b> (modelo), <b>.pptm</b> (com macros). Impress: <b>.odp</b> (apresentação) e <b>.otp</b> (modelo). Ambos exportam para <b>PDF</b>.</li></ul>\n<div class=\"lt-pegs\"><b class=\"lt-tit\">🪤 Pegadinhas mais cobradas</b><ol><li>❌ <span class=\"banca\">Transição e animação são sinônimos</span><br>✅ <span class=\"certo\">Transição é ENTRE slides; animação é em OBJETOS do slide.</span></li><li>❌ <span class=\"banca\">Shift+F5 inicia do primeiro slide</span><br>✅ <span class=\"certo\">Inicia do slide ATUAL; F5 inicia do começo.</span></li><li>❌ <span class=\"banca\">Slide oculto é apagado do arquivo</span><br>✅ <span class=\"certo\">Continua no arquivo, só não aparece na apresentação.</span></li><li>❌ <span class=\"banca\">Alterar o slide mestre muda só o slide selecionado</span><br>✅ <span class=\"certo\">Muda todos os slides que usam aquele mestre.</span></li><li>❌ <span class=\"banca\">.ppsx abre no modo de edição</span><br>✅ <span class=\"certo\">Abre direto no modo apresentação.</span></li></ol></div>\n<div class=\"lt-flash-box\"><b class=\"lt-tit\">🃏 Flashcards: clique no cartão para ver a resposta</b><div class=\"lt-flash\"><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>F5 x Shift+F5?</span></span><span class=\"vs\"><span>Do <b>começo</b> x do <b>slide atual</b>.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>Transição x animação?</span></span><span class=\"vs\"><span><b>Entre slides</b> x <b>objeto no slide</b>.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>Slide mestre?</span></span><span class=\"vs\"><span>Padroniza o visual de <b>todos</b> os slides que o usam.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>.ppsx?</span></span><span class=\"vs\"><span>Abre direto em <b>apresentação</b>.</span></span></button><button type=\"button\" class=\"lt-fc\"><span class=\"fr\"><span>Folheto?</span></span><span class=\"vs\"><span>Impressão de <b>vários slides por página</b>.</span></span></button></div></div>",
"quiz": [
{
"p": "No PowerPoint 2016, a tecla F5 inicia a apresentação a partir do primeiro slide, ao passo que Shift+F5 a inicia a partir do slide atual.",
"c": true,
"prof": "Certo.",
"x": "No Impress, os atalhos são os mesmos.",
"e": "F5 começo; Shift+F5 atual."
},
{
"p": "Transição é o efeito aplicado a um objeto dentro do slide, como a entrada de uma imagem.",
"c": false,
"prof": "Esse é o conceito de animação.",
"x": "A transição ocorre na passagem de um slide para outro. A animação é aplicada aos objetos do slide.",
"e": "Transição = entre slides."
},
{
"p": "Alterações feitas no slide mestre refletem em todos os slides baseados nele.",
"c": true,
"prof": "Certo.",
"x": "É a forma de padronizar logotipo, fonte e cores de uma apresentação institucional.",
"e": "Mestre padroniza."
},
{
"p": "Um slide oculto é excluído do arquivo e não pode mais ser recuperado.",
"c": false,
"prof": "Ocultar não é excluir.",
"x": "O slide oculto permanece no arquivo e pode ser reexibido; apenas não aparece durante a apresentação.",
"e": "Oculto continua no arquivo."
},
{
"p": "Um Delegado vai apresentar um briefing de operação e quer que todos os slides tenham o brasão da unidade no canto e a mesma fonte, sem precisar formatar slide por slide. Ele deve usar:",
"alts": [
"o Modo de Classificação de Slides",
"o Slide Mestre",
"a transição \"Esmaecer\" em todos os slides",
"o recurso Ocultar Slide",
"o Modo de Exibição de Leitura"
],
"r": 1,
"n": [
"Serve para reordenar slides.",
"Correta.",
"Transição não insere logotipo.",
"Oculta slides.",
"Só exibe."
],
"prof": "Padronizar tudo de uma vez = mestre.",
"x": "O slide mestre controla os elementos comuns e a formatação de todos os slides baseados nele.",
"e": "Slide Mestre."
},
{
"p": "Durante uma apresentação no PowerPoint, o apresentador quer ver suas anotações e o próximo slide na tela do notebook, enquanto o público vê apenas o slide atual no projetor. Ele deve usar:",
"alts": [
"o Modo de Exibição de Leitura",
"o Modo do Apresentador",
"o Modo de Classificação de Slides",
"a impressão de folhetos",
"o recurso de ocultar slides"
],
"r": 1,
"n": [
"Não separa telas.",
"Correta.",
"É para reorganizar slides.",
"É impressão.",
"Não resolve."
],
"prof": "Duas telas, duas visões: Modo do Apresentador.",
"x": "O Modo do Apresentador mostra notas, cronômetro e próximo slide ao apresentador, enquanto o projetor exibe só o slide.",
"e": "Modo do Apresentador."
},
{
"p": "Para enviar um arquivo que, ao ser aberto com duplo clique, já comece no modo de apresentação, o usuário do PowerPoint deve salvá-lo como:",
"alts": [
".pptx",
".ppsx",
".potx",
".odt",
".xlsx"
],
"r": 1,
"n": [
"Abre em edição.",
"Correta.",
"É modelo.",
"É texto do Writer.",
"É planilha."
],
"prof": "S de \"show\".",
"x": "O formato .ppsx (Apresentação de Slides do PowerPoint) abre diretamente no modo apresentação.",
"e": ".ppsx."
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
},
{
"p": "Na computação em nuvem, o modelo IaaS fornece infraestrutura como servidores virtuais e armazenamento.",
"c": true,
"x": "O cliente gerencia sistema e aplicações.",
"e": "Nuvem."
},
{
"p": "A nuvem privada é compartilhada publicamente com qualquer usuário da internet.",
"c": false,
"x": "A nuvem privada é exclusiva de uma organização.",
"e": "Nuvem."
},
{
"p": "Em SQL, o comando SELECT é usado para consultar dados de uma tabela.",
"c": true,
"x": "INSERT insere, UPDATE altera e DELETE exclui.",
"e": "SQL."
},
{
"p": "A chave estrangeira estabelece relação entre tabelas, referenciando a chave primária de outra tabela.",
"c": true,
"x": "Garante a integridade referencial.",
"e": "Banco de dados."
},
{
"p": "Segundo a LGPD, o tratamento de dados pessoais pode ser feito mediante consentimento do titular ou nas demais hipóteses legais, como cumprimento de obrigação legal.",
"c": true,
"x": "São as bases legais do art. 7º da LGPD.",
"e": "LGPD, art. 7º."
},
{
"p": "A LGPD não se aplica ao Poder Público.",
"c": false,
"x": "Aplica-se, com regras próprias nos arts. 23 a 32; só não se aplica a tratamentos exclusivos de segurança pública, defesa e investigação penal (art. 4º, III).",
"e": "LGPD."
},
{
"p": "A ANPD é a autoridade nacional responsável por fiscalizar o cumprimento da LGPD.",
"c": true,
"x": "Autoridade Nacional de Proteção de Dados.",
"e": "LGPD, art. 55-A."
},
{
"p": "O aprendizado de máquina supervisionado usa dados rotulados para treinar o modelo.",
"c": true,
"x": "No não supervisionado, os dados não têm rótulo.",
"e": "Inteligência artificial."
},
{
"p": "Segundo a LGPD, o agente que toma as decisões sobre o tratamento de dados pessoais é o",
"alts": [
"operador",
"controlador",
"encarregado",
"titular",
"ANPD"
],
"r": 1,
"x": "Art. 5º, VI, da LGPD.",
"n": [
"Trata em nome do controlador.",
"Correta.",
"É o canal de comunicação.",
"É o dono dos dados.",
"É a autoridade fiscalizadora."
],
"e": "LGPD, art. 5º."
},
{
"p": "A característica de Big Data relacionada à rapidez com que os dados são gerados e processados é a",
"alts": [
"variedade",
"velocidade",
"veracidade",
"valor",
"volume"
],
"r": 1,
"x": "Os “Vs” do Big Data.",
"n": [
"Trata dos tipos de dados.",
"Correta.",
"Trata da confiabilidade.",
"Trata da utilidade.",
"Trata da quantidade."
],
"e": "Big Data."
},
{
"p": "Em SQL, a cláusula WHERE filtra os registros retornados por uma consulta.",
"c": true,
"x": "Ex.: SELECT * FROM multas WHERE valor > 100.",
"e": "SQL."
}
]
}
]
};
