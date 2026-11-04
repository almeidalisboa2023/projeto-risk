// Leitura R.I.S.K. — Direito Constitucional (CF/1988). Texto original, escrito a partir da Constituição.
import { cartoes, passos, COR } from './figuras.js';
import { AULA } from './constitucional-aula.js';
import { NOVOS1 } from './constitucional-novos1.js';
import { NOVOS2 } from './constitucional-novos2.js';
import { PEC } from './constitucional-pec.js';
import { Q1 } from './constitucional-q1.js';
import { Q2 } from './constitucional-q2.js';
import { Q3 } from './constitucional-q3.js';
import { Q4 } from './constitucional-q4.js';
const BANCO = { ...Q1, ...Q2, ...Q3, ...Q4 };

const peg = (t) => `<div class="lt-peg"><b class="lt-tit">⚠ Pegadinha</b> ${t}</div>`;
const box = (tit, t) => `<div class="lt-box"><b class="lt-tit">${tit}</b>${t}</div>`;
const dica = (t) => `<div class="lt-dica"><b class="lt-tit">💡 Dica de memorização</b> ${t}</div>`;
const C = (p, e) => ({ p, c: true, e });
const E = (p, e) => ({ p, c: false, e });

const BASE = {
  id: 'constitucional',
  nome: 'Direito Constitucional',
  apelidos: ['constitucional', 'constituicao federal'],
  lei: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
  assuntos: [
    {
      id: 'poder-constituinte', titulo: 'Poder constituinte e reforma da Constituição', arts: 'art. 60 e ADCT, art. 3º',
      chaves: ['poder constituinte', 'reforma e revisao'],
      html: `
<h3>Em poucas palavras</h3>
<p>Poder constituinte é o poder de <b>criar</b> ou <b>alterar</b> a Constituição. O <b>originário</b> cria uma Constituição nova; o <b>derivado</b> altera a que existe, dentro de limites.</p>
${cartoes([['🌱', 'Originário', 'inicial, ilimitado juridicamente, autônomo e incondicionado', COR.verm], ['✏️', 'Derivado reformador', 'emendas constitucionais (art. 60)', COR.azul], ['🔄', 'Derivado revisor', 'revisão única do art. 3º do ADCT, já esgotada', COR.cinza], ['🏛', 'Derivado decorrente', 'Estados elaboram suas Constituições', COR.verde]])}
<h3>Emenda constitucional (art. 60)</h3>
${passos([['Proposta', '1/3 da Câmara ou do Senado · Presidente da República · mais da metade das Assembleias Legislativas (cada uma por maioria relativa)'], ['Votação', 'em cada Casa do Congresso, em 2 turnos, com 3/5 dos votos'], ['Promulgação', 'pelas Mesas da Câmara e do Senado, sem sanção ou veto do Presidente']])}
${box('Limites ao poder de reforma', '<ul><li><b>Circunstanciais:</b> não se emenda a CF na vigência de <b>intervenção federal, estado de defesa ou estado de sítio</b>.</li><li><b>Materiais (cláusulas pétreas, §4º):</b> não será objeto de deliberação proposta <b>tendente a abolir</b> a forma federativa de Estado, o voto direto, secreto, universal e periódico, a separação dos Poderes e os direitos e garantias individuais.</li><li><b>Formais:</b> quórum de 3/5, 2 turnos e iniciativa restrita.</li><li>Matéria <b>rejeitada ou prejudicada</b> não pode ser reapresentada na <b>mesma sessão legislativa</b>.</li></ul>')}
<h3>Revisão (ADCT, art. 3º)</h3>
<p>Feita <b>uma única vez</b>, 5 anos após a promulgação, em <b>sessão unicameral</b> e por <b>maioria absoluta</b>. Resultou nas 6 Emendas Constitucionais de Revisão de 1994.</p>
${dica('Cláusulas pétreas: “<b>FO-VO-SE-DI</b>”: <b>FO</b>rma federativa, <b>VO</b>to direto, secreto, universal e periódico, <b>SE</b>paração dos Poderes e <b>DI</b>reitos e garantias individuais.')}
${peg('O voto <b>obrigatório</b> não é cláusula pétrea. Pétreo é o voto <b>direto, secreto, universal e periódico</b>. E a cláusula pétrea proíbe <b>abolir</b>, não proíbe qualquer alteração.')}`,
      quiz: [C('A Constituição não pode ser emendada na vigência de intervenção federal, de estado de defesa ou de estado de sítio.', 'Art. 60, §1º: limites circunstanciais.'), E('A proposta de emenda constitucional aprovada pelo Congresso Nacional é enviada ao Presidente da República para sanção.', 'A emenda é promulgada pelas Mesas da Câmara e do Senado, sem sanção ou veto.')],
    },
    {
      id: 'direitos-individuais', titulo: 'Direitos e deveres individuais e coletivos', arts: 'art. 5º',
      chaves: ['direitos fundamentais', 'direitos e deveres individuais', 'direito a vida', 'deveres individuais e coletivos'],
      html: `
<h3>Em poucas palavras</h3>
<p>O art. 5º garante a <b>brasileiros e estrangeiros residentes</b> (e, segundo o STF, também aos não residentes) a inviolabilidade do direito à <b>vida, liberdade, igualdade, segurança e propriedade</b>.</p>
${cartoes([['❤️', 'Vida', '', COR.verm], ['🕊', 'Liberdade', '', COR.azul], ['⚖️', 'Igualdade', '', COR.verde], ['🛡', 'Segurança', '', COR.lar], ['🏠', 'Propriedade', '', COR.roxo]])}
<h3>Incisos mais cobrados</h3>
<table class="tab"><tr><th>Tema</th><th>Regra</th></tr>
<tr><td>🏠 Casa (XI)</td><td>Asilo inviolável. Entra-se sem consentimento só em <b>flagrante delito</b>, <b>desastre</b>, para <b>prestar socorro</b> ou, <b>durante o dia</b>, por <b>ordem judicial</b></td></tr>
<tr><td>📞 Sigilo (XII)</td><td>Correspondência, dados e comunicações telegráficas e telefônicas. Só a <b>telefônica</b> pode ser quebrada, por <b>ordem judicial</b>, para investigação criminal ou instrução processual penal</td></tr>
<tr><td>👥 Reunião (XVI)</td><td>Pacífica, <b>sem armas</b>, em local aberto ao público, <b>sem autorização</b>, com <b>aviso prévio</b> à autoridade</td></tr>
<tr><td>🤝 Associação (XVII a XX)</td><td>Plena para fins lícitos, <b>vedada a paramilitar</b>. Criação sem autorização. <b>Dissolução compulsória</b> só por decisão judicial <b>transitada em julgado</b>; suspensão por decisão judicial</td></tr>
<tr><td>🚫 Penas proibidas (XLVII)</td><td>Morte (salvo <b>guerra declarada</b>), perpétua, trabalhos forçados, banimento e cruéis</td></tr>
<tr><td>⛓ Prisão (LXI)</td><td>Só em <b>flagrante</b> ou por <b>ordem escrita e fundamentada</b> de juiz, salvo transgressão ou crime propriamente militar</td></tr>
<tr><td>💸 Prisão civil (LXVII)</td><td>Só do <b>devedor de alimentos</b>. Depositário infiel não pode ser preso (Súmula Vinculante 25)</td></tr></table>
${box('Crimes com tratamento mais severo', '<ul><li><b>Racismo</b> (XLII): inafiançável e <b>imprescritível</b>, com reclusão.</li><li><b>Tortura, tráfico, terrorismo e hediondos</b> (XLIII): inafiançáveis e insuscetíveis de <b>graça ou anistia</b>.</li><li><b>Ação de grupos armados</b> contra a ordem constitucional (XLIV): inafiançável e <b>imprescritível</b>.</li></ul>')}
<h3>Extradição (LI e LII)</h3>
<p><b>Brasileiro nato</b> nunca é extraditado. O <b>naturalizado</b> pode ser, por <b>crime comum anterior</b> à naturalização ou por envolvimento comprovado em <b>tráfico de drogas</b>. <b>Estrangeiro</b> não é extraditado por crime <b>político ou de opinião</b>.</p>
${dica('Imprescritíveis são só dois: “<b>RA-GA</b>”: <b>RA</b>cismo e <b>G</b>rupos <b>A</b>rmados. Os “3 T + H” (tortura, tráfico, terrorismo e hediondos) prescrevem.')}
${peg('A entrada em casa por ordem judicial só pode ocorrer <b>durante o dia</b>. Em flagrante, desastre ou socorro, pode ser a qualquer hora.')}`,
      quiz: [C('Por determinação judicial, a casa pode ser penetrada sem o consentimento do morador apenas durante o dia.', 'Art. 5º, XI.'), E('A prática de tortura é crime inafiançável e imprescritível.', 'A tortura é inafiançável e insuscetível de graça ou anistia, mas não é imprescritível. Imprescritíveis são o racismo e a ação de grupos armados.')],
    },
    {
      id: 'garantias', titulo: 'Garantias constitucionais individuais e coletivas', arts: 'art. 5º, §§ 1º a 4º',
      chaves: ['garantias constitucionais', 'garantias dos direitos coletivos'],
      html: `
<h3>Em poucas palavras</h3>
<p><b>Direitos</b> são os bens protegidos (vida, liberdade). <b>Garantias</b> são os instrumentos que os protegem (devido processo, contraditório, remédios constitucionais).</p>
${cartoes([['📜', 'Devido processo legal', 'ninguém perde liberdade ou bens sem ele (LIV)', COR.azul], ['🗣', 'Contraditório e ampla defesa', 'em processo judicial e administrativo (LV)', COR.verde], ['🚫', 'Provas ilícitas', 'inadmissíveis no processo (LVI)', COR.verm], ['⚖️', 'Presunção de inocência', 'até o trânsito em julgado (LVII)', COR.roxo]])}
<h3>Outras garantias importantes</h3>
<ul><li><b>Juiz natural</b>: não haverá juízo ou tribunal de exceção (XXXVII).</li><li><b>Júri</b>: julga os crimes <b>dolosos contra a vida</b>, com plenitude de defesa, sigilo das votações e soberania dos veredictos (XXXVIII).</li><li><b>Legalidade penal</b>: não há crime sem lei anterior que o defina, nem pena sem prévia cominação legal (XXXIX).</li><li><b>Irretroatividade</b>: a lei penal não retroage, salvo para beneficiar o réu (XL).</li><li>Preso deve ser informado de seus direitos, inclusive o de <b>permanecer calado</b> (LXIII).</li><li><b>Identificado civilmente</b> não será identificado criminalmente, salvo nas hipóteses da lei (LVIII).</li><li><b>Razoável duração do processo</b> (LXXVIII).</li></ul>
${box('Parágrafos do art. 5º', '<ul><li><b>§1º</b>: as normas de direitos fundamentais têm <b>aplicação imediata</b>.</li><li><b>§2º</b>: o rol <b>não é taxativo</b>; há outros direitos decorrentes dos princípios e dos tratados.</li><li><b>§3º</b>: tratados de <b>direitos humanos</b> aprovados em cada Casa, em <b>2 turnos</b>, por <b>3/5</b> equivalem a <b>emendas constitucionais</b>.</li><li><b>§4º</b>: o Brasil se submete ao <b>Tribunal Penal Internacional</b>.</li></ul>')}
${peg('Tratado de direitos humanos aprovado <b>sem</b> o rito do §3º tem status <b>supralegal</b>: está acima das leis e abaixo da Constituição (entendimento do STF).')}`,
      quiz: [C('Os tratados internacionais sobre direitos humanos aprovados em cada Casa do Congresso, em dois turnos, por três quintos dos votos, são equivalentes às emendas constitucionais.', 'Art. 5º, §3º.'), E('O rol de direitos e garantias do art. 5º é taxativo, não admitindo outros direitos decorrentes de tratados.', 'O §2º diz que os direitos expressos não excluem outros decorrentes do regime, dos princípios e dos tratados.')],
    },
    {
      id: 'remedios', titulo: 'Remédios constitucionais', arts: 'art. 5º, LXVIII a LXXIII',
      chaves: ['remedios constitucionais', 'habeas corpus', 'mandado de seguranca'],
      html: `
<h3>Em poucas palavras</h3>
<p>São as ações que protegem direitos fundamentais quando eles são ameaçados ou violados.</p>
<table class="tab"><tr><th>Remédio</th><th>Protege</th><th>Detalhe-chave</th></tr>
<tr><td>🕊 <b>Habeas corpus</b></td><td>Liberdade de <b>locomoção</b> (ir, vir e ficar)</td><td>Gratuito e sem advogado. Não cabe contra punição disciplinar militar (no mérito)</td></tr>
<tr><td>📂 <b>Habeas data</b></td><td>Acesso e retificação de <b>informações pessoais</b> em bancos de dados governamentais ou de caráter público</td><td>Gratuito. Exige prévia recusa administrativa</td></tr>
<tr><td>🛡 <b>Mandado de segurança</b></td><td><b>Direito líquido e certo</b> não amparado por HC ou HD</td><td>Contra ilegalidade ou abuso de poder de autoridade</td></tr>
<tr><td>🧩 <b>Mandado de injunção</b></td><td>Direito inviabilizado pela <b>falta de norma regulamentadora</b></td><td>Direitos e liberdades constitucionais, nacionalidade, soberania e cidadania</td></tr>
<tr><td>🏛 <b>Ação popular</b></td><td><b>Patrimônio público</b>, moralidade administrativa, meio ambiente e patrimônio histórico e cultural</td><td>Qualquer <b>cidadão</b>. Isento de custas, salvo má-fé</td></tr></table>
${box('Mandado de segurança coletivo (LXX)', '<p>Pode ser impetrado por <b>partido político</b> com representação no Congresso, <b>organização sindical</b>, <b>entidade de classe</b> ou <b>associação</b> legalmente constituída e em funcionamento há pelo menos <b>1 ano</b>, em defesa dos membros ou associados.</p>')}
${dica('Gratuitos são o <b>HC</b> e o <b>HD</b>, os dois “habeas”. A ação popular é isenta de custas, salvo má-fé.')}
${peg('Ação popular exige ser <b>cidadão</b> (eleitor), e não basta ser pessoa física qualquer. Pessoa jurídica não propõe ação popular.')}`,
      quiz: [C('O habeas data é o remédio adequado para assegurar o conhecimento de informações relativas ao impetrante constantes de bancos de dados de entidades governamentais ou de caráter público.', 'Art. 5º, LXXII.'), E('A associação legalmente constituída pode impetrar mandado de segurança coletivo independentemente do tempo de funcionamento.', 'A associação precisa estar em funcionamento há pelo menos 1 ano (art. 5º, LXX, “b”).')],
    },
    {
      id: 'sociais', titulo: 'Direitos sociais', arts: 'arts. 6º a 11',
      chaves: ['direitos sociais'],
      html: `
<h3>Em poucas palavras</h3>
<p>São direitos de 2ª geração, que exigem <b>atuação do Estado</b>. O art. 6º lista: educação, saúde, alimentação, trabalho, moradia, transporte, lazer, segurança, previdência social, proteção à maternidade e à infância e assistência aos desamparados.</p>
${cartoes([['📚', 'Educação'], ['🏥', 'Saúde'], ['🍽', 'Alimentação'], ['💼', 'Trabalho'], ['🏠', 'Moradia'], ['🚌', 'Transporte'], ['🎡', 'Lazer'], ['🛡', 'Segurança']])}
<h3>Direitos dos trabalhadores (art. 7º), os mais cobrados</h3>
<ul><li><b>Salário mínimo</b> nacionalmente unificado, vedada a vinculação para qualquer fim.</li><li>Jornada de <b>8 horas diárias e 44 semanais</b>; <b>6 horas</b> em turnos ininterruptos de revezamento.</li><li><b>Férias</b> com pelo menos <b>1/3 a mais</b> do salário.</li><li><b>Licença-gestante</b> de <b>120 dias</b>; licença-paternidade nos termos da lei.</li><li>Proibido trabalho <b>noturno, perigoso ou insalubre</b> a menores de <b>18</b> e qualquer trabalho a menores de <b>16</b>, salvo como <b>aprendiz</b>, a partir dos <b>14</b>.</li><li><b>Prescrição</b>: 5 anos, até o limite de <b>2 anos</b> após o fim do contrato.</li></ul>
<h3>Sindicatos e greve (arts. 8º e 9º)</h3>
<ul><li>Livre associação, mas com <b>unicidade sindical</b>: só um sindicato da mesma categoria por base territorial, nunca menor que um <b>município</b>.</li><li>Ninguém é obrigado a se <b>filiar</b> ou a manter-se filiado.</li><li><b>Greve</b> assegurada aos trabalhadores; a lei define os serviços essenciais.</li></ul>
${peg('Militares não podem fazer greve nem se sindicalizar (art. 142, §3º, IV). E o STF entende que policiais civis também não podem fazer greve.')}`,
      quiz: [C('É proibido qualquer trabalho a menores de 16 anos, salvo na condição de aprendiz, a partir de 14 anos.', 'Art. 7º, XXXIII.'), E('A Constituição admite mais de uma organização sindical da mesma categoria na mesma base territorial, desde que menor que um município.', 'Vale a unicidade sindical, e a base territorial mínima é a área de um município (art. 8º, II).')],
    },
    {
      id: 'nacionalidade', titulo: 'Nacionalidade, cidadania e direitos políticos', arts: 'arts. 12 a 16',
      chaves: ['partidos politicos', 'nacionalidade', 'direitos politicos', 'cidadania e direitos'],
      html: `
<h3>Em poucas palavras</h3>
<p>Quem é <b>brasileiro</b> (nato ou naturalizado), quais cargos só o nato ocupa, quem vota e quem pode ser votado.</p>
<h3>Brasileiro nato (art. 12, I)</h3>
<ul><li>Nascido no <b>Brasil</b>, ainda que de pais estrangeiros, desde que estes <b>não estejam a serviço do seu país</b>.</li><li>Nascido no <b>estrangeiro</b>, de pai ou mãe brasileiros, se qualquer deles estiver <b>a serviço do Brasil</b>.</li><li>Nascido no estrangeiro, de pai ou mãe brasileiros, <b>registrado</b> em repartição brasileira ou que venha a <b>residir no Brasil</b> e <b>opte</b>, depois da maioridade, pela nacionalidade brasileira.</li></ul>
<h3>Naturalizado (art. 12, II)</h3>
<ul><li>De país de <b>língua portuguesa</b>: <b>1 ano</b> ininterrupto de residência e idoneidade moral.</li><li>Demais estrangeiros: residentes há mais de <b>15 anos</b> ininterruptos e sem condenação penal, desde que requeiram.</li></ul>
${box('Cargos privativos de brasileiro nato (§3º)', '<p>Presidente e Vice-Presidente · Presidente da Câmara · Presidente do Senado · Ministro do STF · carreira diplomática · oficial das Forças Armadas · Ministro de Estado da Defesa.</p>')}
<h3>Direitos políticos (art. 14)</h3>
${cartoes([['🗳', 'Obrigatório', 'maiores de 18 anos', COR.verde], ['🤷', 'Facultativo', 'analfabetos, maiores de 70 e de 16 a 18 anos', COR.azul], ['🚫', 'Inalistáveis', 'estrangeiros e conscritos no serviço militar', COR.verm]])}
<table class="tab"><tr><th>Idade mínima</th><th>Cargo</th></tr><tr><td><b>35</b></td><td>Presidente, Vice e Senador</td></tr><tr><td><b>30</b></td><td>Governador e Vice</td></tr><tr><td><b>21</b></td><td>Deputado, Prefeito, Vice-Prefeito e juiz de paz</td></tr><tr><td><b>18</b></td><td>Vereador</td></tr></table>
<p><b>Cassação</b> de direitos políticos é <b>vedada</b>. Há perda ou suspensão (art. 15) por: cancelamento da naturalização por sentença transitada em julgado; incapacidade civil absoluta; condenação criminal transitada em julgado, enquanto durarem seus efeitos; recusa de cumprir obrigação a todos imposta ou prestação alternativa; e improbidade administrativa.</p>
${dica('Cargos de nato: “<b>MP3.COM</b>”: <b>M</b>inistro do STF, <b>P</b>residente e Vice, <b>P</b>residente da Câmara, <b>P</b>residente do Senado, <b>C</b>arreira diplomática, <b>O</b>ficial das Forças Armadas e <b>M</b>inistro da Defesa.')}
${peg('Ministro de Estado em geral <b>pode</b> ser naturalizado. Só o Ministro da <b>Defesa</b> precisa ser nato.')}`,
      quiz: [C('O cargo de Ministro de Estado da Defesa é privativo de brasileiro nato.', 'Art. 12, §3º, VII.'), E('O voto é facultativo para os maiores de 65 anos.', 'O voto é facultativo para os maiores de 70 anos (art. 14, §1º, II, “b”).')],
    },
    {
      id: 'uniao', titulo: 'Da União: bens e competências', arts: 'arts. 20 a 24',
      chaves: ['competencias constitucionais', 'reparticao de competencias', 'da uniao', 'bens e competencias', 'arts. 20 a 24'],
      html: `
<h3>Em poucas palavras</h3>
<p>Quais bens pertencem à União e como a Constituição distribui as competências entre os entes federativos.</p>
<h3>Bens da União (art. 20), os principais</h3>
<p>Terras devolutas indispensáveis à defesa das fronteiras · lagos e rios em terrenos seus ou que banhem mais de um Estado · ilhas oceânicas e costeiras (com exceções) · <b>mar territorial</b> · terrenos de marinha · recursos da plataforma continental e da zona econômica exclusiva · <b>potenciais de energia hidráulica</b> · <b>recursos minerais, inclusive do subsolo</b> · cavidades naturais subterrâneas e sítios arqueológicos · <b>terras tradicionalmente ocupadas pelos índios</b>.</p>
<p>A <b>faixa de fronteira</b> tem até <b>150 km</b> de largura (§2º).</p>
<h3>Os quatro tipos de competência</h3>
${cartoes([['🔒', 'Exclusiva · art. 21', 'administrativa, só da União, indelegável', COR.verm], ['📝', 'Privativa · art. 22', 'legislativa da União, delegável aos Estados por lei complementar', COR.azul], ['🤝', 'Comum · art. 23', 'administrativa de todos: União, Estados, DF e Municípios', COR.verde], ['🔀', 'Concorrente · art. 24', 'legislativa da União, dos Estados e do DF', COR.lar]])}
<ul><li><b>Art. 22</b>: legislar sobre direito civil, comercial, penal, processual, eleitoral, agrário, marítimo, aeronáutico, espacial e do trabalho; <b>trânsito e transporte</b>; e <b>competência da PF, PRF e PFF</b>.</li><li><b>Art. 23</b>: cuidar da saúde, proteger o meio ambiente, o patrimônio histórico e cultural, combater a pobreza etc.</li><li><b>Art. 24</b>: direito tributário, financeiro, penitenciário, econômico e urbanístico, orçamento etc.</li></ul>
${box('Regras da competência concorrente (art. 24, §§)', '<ul><li>A União faz <b>normas gerais</b>.</li><li>Os Estados <b>suplementam</b>.</li><li>Sem lei federal, os Estados exercem competência <b>plena</b>.</li><li>Lei federal nova <b>suspende a eficácia</b> da lei estadual no que for contrária, mas <b>não a revoga</b>.</li></ul>')}
${dica('Art. 22: “<b>CAPACETE de PM</b>”: <b>C</b>ivil, <b>A</b>grário, <b>P</b>enal, <b>A</b>eronáutico, <b>C</b>omercial, <b>E</b>leitoral, <b>T</b>rabalho, <b>E</b>spacial, <b>P</b>rocessual e <b>M</b>arítimo. Art. 24: “<b>PUFETO</b>”: <b>P</b>enitenciário, <b>U</b>rbanístico, <b>F</b>inanceiro, <b>E</b>conômico, <b>T</b>ributário e <b>O</b>rçamento.')}
${peg('Legislar sobre <b>trânsito</b> é competência <b>privativa da União</b> (art. 22, XI). Lei estadual ou municipal que crie infração de trânsito é inconstitucional.')}`,
      quiz: [C('Compete privativamente à União legislar sobre trânsito e transporte.', 'Art. 22, XI.'), E('Na competência concorrente, a superveniência de lei federal sobre normas gerais revoga a lei estadual no que lhe for contrário.', 'A lei federal suspende a eficácia da lei estadual, sem revogá-la (art. 24, §4º).')],
    },
    {
      id: 'executivo', titulo: 'Poder Executivo', arts: 'arts. 76 a 91',
      chaves: ['poder executivo', 'chefia de estado'],
      html: `
<h3>Em poucas palavras</h3>
<p>O Brasil adota <b>república presidencialista</b>. O Presidente acumula a <b>chefia de Estado</b> (representa o país) e a <b>chefia de governo</b> (administra), auxiliado pelos Ministros de Estado (art. 76).</p>
<h3>Eleição e mandato</h3>
<ul><li>Eleito com o Vice por <b>maioria absoluta dos votos válidos</b>, sem contar brancos e nulos. Se ninguém alcança, há <b>2º turno</b> entre os dois mais votados.</li><li>Mandato de <b>4 anos</b>, com <b>uma reeleição</b>.</li><li>Ausentar-se do país por mais de <b>15 dias</b> exige licença do Congresso.</li></ul>
<h3>Linha sucessória (arts. 79 a 81)</h3>
${passos([['Vice-Presidente', 'substitui e sucede'], ['Presidente da Câmara', 'substitui temporariamente'], ['Presidente do Senado', 'substitui temporariamente'], ['Presidente do STF', 'substitui temporariamente']])}
${box('Vagando os dois cargos', '<ul><li>Nos <b>2 primeiros anos</b> do mandato: eleição <b>direta</b> em 90 dias.</li><li>Nos <b>2 últimos anos</b>: eleição <b>indireta</b>, pelo Congresso, em 30 dias.</li><li>Os eleitos apenas completam o período.</li></ul>')}
<h3>Responsabilidade do Presidente</h3>
<table class="tab"><tr><th></th><th>Crime de responsabilidade</th><th>Crime comum</th></tr>
<tr><td>Autorização</td><td>Câmara, por <b>2/3</b></td><td>Câmara, por <b>2/3</b></td></tr>
<tr><td>Julgamento</td><td><b>Senado</b>, presidido pelo Presidente do STF</td><td><b>STF</b></td></tr>
<tr><td>Condenação</td><td>2/3 do Senado: perda do cargo e inabilitação por <b>8 anos</b></td><td>Pena criminal</td></tr></table>
<p>Fica <b>suspenso</b> das funções ao ser recebida a denúncia ou queixa pelo STF ou instaurado o processo pelo Senado. Se o julgamento não terminar em <b>180 dias</b>, volta ao cargo. Na vigência do mandato, não responde por atos <b>estranhos</b> às funções e não pode ser <b>preso</b> antes de sentença condenatória nas infrações comuns.</p>
${box('Atribuições delegáveis (art. 84, parágrafo único)', '<p>Decretos autônomos sobre organização da administração (VI), concessão de <b>indulto</b> e comutação de penas (XII) e provimento de cargos (XXV, 1ª parte). Podem ser delegadas a <b>Ministros de Estado</b>, ao <b>PGR</b> ou ao <b>AGU</b>.</p>')}
${peg('Na vacância dos dois cargos nos <b>últimos 2 anos</b>, a eleição é <b>indireta</b> (Congresso) em <b>30 dias</b>, e não em 90.')}`,
      quiz: [C('Vagando os cargos de Presidente e Vice-Presidente nos últimos dois anos do período presidencial, a eleição para ambos será feita pelo Congresso Nacional, 30 dias depois da última vaga.', 'Art. 81, §1º.'), E('Nos crimes de responsabilidade, o Presidente da República é julgado pelo Supremo Tribunal Federal.', 'Nos crimes de responsabilidade, o julgamento é do Senado Federal. O STF julga os crimes comuns.')],
    },
    {
      id: 'defesa-estado', titulo: 'Defesa do Estado: Forças Armadas e segurança pública', arts: 'arts. 136 a 144',
      chaves: ['pec da seguranca', 'defesa do estado', 'forcas armadas', 'seguranca publica'],
      html: `
<h3>Em poucas palavras</h3>
<p>Instrumentos para crises (<b>estado de defesa</b> e <b>estado de sítio</b>) e as instituições que defendem o país e a ordem: <b>Forças Armadas</b> e <b>órgãos de segurança pública</b>. É o capítulo da PRF na Constituição.</p>
<table class="tab"><tr><th></th><th>Estado de defesa (art. 136)</th><th>Estado de sítio (art. 137)</th></tr>
<tr><td>Motivo</td><td>Ordem pública ou paz social ameaçadas por grave instabilidade institucional ou calamidades da natureza, em <b>locais restritos e determinados</b></td><td>Comoção grave de repercussão nacional, ineficácia do estado de defesa, guerra ou agressão armada estrangeira</td></tr>
<tr><td>Congresso</td><td>Presidente <b>decreta</b> e depois submete em 24 h; Congresso decide em 10 dias</td><td>Presidente <b>pede autorização antes</b>; maioria absoluta</td></tr>
<tr><td>Prazo</td><td>Até <b>30 dias</b>, prorrogável <b>uma vez</b></td><td>Até 30 dias por vez (comoção); na guerra, enquanto durar</td></tr></table>
<p>Nos dois casos, o Presidente ouve antes o <b>Conselho da República</b> e o <b>Conselho de Defesa Nacional</b>.</p>
<h3>Forças Armadas (art. 142)</h3>
<p><b>Marinha, Exército e Aeronáutica</b>: instituições nacionais <b>permanentes e regulares</b>, baseadas na <b>hierarquia e disciplina</b>, sob a autoridade suprema do Presidente. Defendem a Pátria, garantem os poderes constitucionais e, por iniciativa destes, a lei e a ordem. O militar não pode se sindicalizar nem fazer greve.</p>
<h3>Segurança pública (art. 144)</h3>
<p>É <b>dever do Estado</b>, direito e responsabilidade de todos.</p>
${cartoes([['🕵️', 'Polícia Federal', '', COR.azul], ['🚓', 'Polícia Rodoviária Federal', 'patrulhamento ostensivo das rodovias federais', COR.amar], ['🚆', 'Polícia Ferroviária Federal', '', COR.cinza], ['🔎', 'Polícias Civis', '', COR.roxo], ['⭐', 'PM e Corpo de Bombeiros', '', COR.verm], ['🔐', 'Polícias Penais', 'federal, estaduais e distrital', COR.verde]])}
${box('A PRF na Constituição (art. 144, §2º)', '<p>Órgão <b>permanente</b>, organizado e mantido pela <b>União</b> e estruturado em <b>carreira</b>, destinado, na forma da lei, ao <b>patrulhamento ostensivo das rodovias federais</b>.</p>')}
<p>As <b>guardas municipais</b> protegem bens, serviços e instalações do município (§8º), e a <b>segurança viária</b> é tratada no §10.</p>
${peg('No estado de <b>defesa</b>, o Presidente decreta e depois submete ao Congresso. No estado de <b>sítio</b>, ele precisa da autorização do Congresso <b>antes</b>.')}`,
      quiz: [C('A Polícia Rodoviária Federal, órgão permanente, organizado e mantido pela União e estruturado em carreira, destina-se, na forma da lei, ao patrulhamento ostensivo das rodovias federais.', 'Art. 144, §2º.'), E('Para decretar o estado de defesa, o Presidente da República depende de prévia autorização do Congresso Nacional.', 'O estado de defesa é decretado pelo Presidente e depois submetido ao Congresso. A autorização prévia é exigida no estado de sítio.')],
    },
    {
      id: 'ordem-social', titulo: 'Ordem social: base, objetivos e seguridade social', arts: 'arts. 193 a 204',
      chaves: ['ordem social', 'seguridade social', 'base e objetivos'],
      html: `
<h3>Em poucas palavras</h3>
<p>A ordem social tem como <b>base o primado do trabalho</b> e como <b>objetivo o bem-estar e a justiça sociais</b> (art. 193). A <b>seguridade social</b> reúne três áreas (art. 194):</p>
${cartoes([['🏥', 'Saúde', 'direito de todos, sem contribuição · SUS', COR.verm], ['👴', 'Previdência', 'contributiva e de filiação obrigatória', COR.azul], ['🤲', 'Assistência social', 'a quem precisar, sem contribuição', COR.verde]])}
<h3>Objetivos da seguridade (art. 194, parágrafo único)</h3>
<ul><li><b>Universalidade</b> da cobertura e do atendimento.</li><li><b>Uniformidade e equivalência</b> dos benefícios entre populações urbanas e rurais.</li><li><b>Seletividade e distributividade</b> na prestação.</li><li><b>Irredutibilidade</b> do valor dos benefícios.</li><li><b>Equidade</b> no custeio.</li><li><b>Diversidade</b> da base de financiamento.</li><li>Gestão <b>democrática e descentralizada</b>, quadripartite: trabalhadores, empregadores, aposentados e Governo.</li></ul>
${box('Benefício de Prestação Continuada', '<p>A assistência garante <b>1 salário mínimo</b> mensal à <b>pessoa com deficiência</b> e ao <b>idoso</b> que comprovem não ter meios de se manter nem de ser mantidos pela família (art. 203, V), <b>sem contribuição</b>.</p>')}
<p>A <b>saúde</b> é direito de todos e dever do Estado, com acesso universal e igualitário (art. 196). A assistência à saúde é <b>livre à iniciativa privada</b> (art. 199).</p>
${peg('Só a <b>previdência</b> exige contribuição. Saúde e assistência social são prestadas <b>independentemente</b> de contribuição.')}`,
      quiz: [C('A assistência social será prestada a quem dela necessitar, independentemente de contribuição à seguridade social.', 'Art. 203.'), E('A previdência social tem caráter não contributivo e filiação facultativa.', 'A previdência tem caráter contributivo e filiação obrigatória (art. 201).')],
    },
    {
      id: 'ordem-social-2', titulo: 'Ordem social: meio ambiente, família, criança, idoso e índios', arts: 'arts. 225 a 232',
      chaves: ['meio ambiente; familia', 'familia, crianca', 'idoso e indio', 'meio ambiente'],
      html: `
<h3>Meio ambiente (art. 225)</h3>
<p>Todos têm direito ao meio ambiente <b>ecologicamente equilibrado</b>, <b>bem de uso comum do povo</b>. Cabe ao Poder Público <b>e à coletividade</b> defendê-lo para as <b>presentes e futuras gerações</b>.</p>
<ul><li>Obra com potencial de <b>significativa degradação</b> exige <b>estudo prévio de impacto ambiental</b>, com publicidade.</li><li>Quem causa dano ambiental, pessoa <b>física ou jurídica</b>, responde nas esferas <b>penal, administrativa</b> e civil (reparação).</li></ul>
${cartoes([['🌳', 'Floresta Amazônica', '', COR.verde], ['🌿', 'Mata Atlântica', '', COR.verde], ['⛰', 'Serra do Mar', '', COR.azul], ['🐊', 'Pantanal Mato-Grossense', '', COR.lar], ['🏖', 'Zona Costeira', '', COR.azul]])}
<p class="muted" style="margin-top:-6px">Patrimônio nacional (art. 225, §4º). Cerrado e Caatinga não estão nessa lista.</p>
<h3>Família, criança, adolescente e jovem (arts. 226 a 228)</h3>
<ul><li>A família é a <b>base da sociedade</b> e tem especial proteção. A <b>união estável</b> é reconhecida como entidade familiar, e o casamento civil pode ser dissolvido pelo <b>divórcio</b>.</li><li>Família, sociedade e Estado devem assegurar à criança, ao adolescente e ao jovem, com <b>absoluta prioridade</b>, seus direitos fundamentais (art. 227).</li><li>São <b>penalmente inimputáveis</b> os menores de <b>18 anos</b>, sujeitos à legislação especial (art. 228).</li></ul>
<h3>Idosos (art. 230)</h3>
<p>Amparo pela família, pela sociedade e pelo Estado, com programas executados <b>preferencialmente em seus lares</b>. Maiores de <b>65 anos</b> têm <b>gratuidade</b> nos transportes coletivos urbanos.</p>
<h3>Índios (arts. 231 e 232)</h3>
<ul><li>Têm reconhecidos sua organização social, costumes, línguas, crenças, tradições e os <b>direitos originários</b> sobre as terras que tradicionalmente ocupam. A <b>União</b> demarca.</li><li>Essas terras são <b>inalienáveis e indisponíveis</b>, e os direitos sobre elas, <b>imprescritíveis</b>.</li><li>A <b>remoção</b> dos grupos só ocorre <i>ad referendum</i> do Congresso, em catástrofe, epidemia ou no interesse da soberania, com <b>retorno</b> assim que cessar o risco.</li><li>Índios, comunidades e organizações podem ir a juízo, com intervenção do <b>Ministério Público</b>.</li></ul>
${peg('A gratuidade no transporte coletivo urbano é para maiores de <b>65 anos</b> (art. 230, §2º). O Estatuto da Pessoa Idosa considera idoso quem tem 60 anos ou mais, mas a idade da gratuidade na CF é 65.')}`,
      quiz: [C('A Floresta Amazônica, a Mata Atlântica, a Serra do Mar, o Pantanal Mato-Grossense e a Zona Costeira são patrimônio nacional.', 'Art. 225, §4º.'), E('Aos maiores de 60 anos é garantida, pela Constituição, a gratuidade dos transportes coletivos urbanos.', 'A Constituição garante a gratuidade aos maiores de 65 anos (art. 230, §2º).')],
    },
  ],
};

const ORDEM = ['teoria-constituicao', 'poder-constituinte', 'principios-fundamentais', 'direitos-individuais', 'garantias', 'remedios', 'sociais', 'nacionalidade', 'organizacao-estado', 'uniao', 'administracao-publica', 'legislativo', 'executivo', 'judiciario', 'funcoes-essenciais', 'controle', 'defesa-estado', 'tributario', 'ordem-economica', 'ordem-social', 'ordem-social-2'];
const todos = [...BASE.assuntos, ...NOVOS1, ...NOVOS2].map((a) => (AULA[a.id] ? { ...a, html: a.html + AULA[a.id].html, quiz: [...(a.quiz || []), ...AULA[a.id].quiz] } : a));
const comPec = todos.map((a) => (PEC[a.id] ? { ...a, html: a.html + PEC[a.id].html, quiz: [...a.quiz, ...PEC[a.id].quiz] } : a)).map((a) => ({ ...a, quiz: [...a.quiz, ...(BANCO[a.id] || [])] }));
export default { ...BASE, atualizado: 'novembro de 2026 · aula completa + PEC da Segurança Pública', assuntos: ORDEM.map((id) => comPec.find((a) => a.id === id)).filter(Boolean) };
