// Leitura R.I.S.K. — Legislação Municipal de Belo Vale/MG: Lei Orgânica e Estatuto dos Servidores (LC 1.173/2006).
// Escrito a partir dos textos enviados pelo administrador (Lei Orgânica digitada em 2012 e Estatuto digitalizado).
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, C, E } from './blocos.js';

const fonte = (t) => `<p class="muted" style="font-size:13px">📄 Fonte: ${t}</p>`;
const LOM = 'Lei Orgânica do Município de Belo Vale (texto digitado em 2012)';
const EST = 'Lei Complementar nº 1.173/2006 (Estatuto dos Servidores Públicos de Belo Vale)';

export default {
  id: 'belovale', nome: 'Legislação Municipal · Belo Vale', soEdital: 'belo vale',
  apelidos: ['legislacao municipal', 'lei organica', 'estatuto'],
  assuntos: [
    {
      id: 'lom-organizacao', titulo: 'Lei Orgânica: princípios, organização e competências do Município', arts: 'LOM, arts. 1º a 16',
      chaves: ['estrutura do municipio', 'competencias do municipio', 'estrutura, competencias', 'organizacao do municipio', 'lei organica (estrutura'],
      html: `${fonte(LOM)}
<h3>O Município na Lei Orgânica</h3>
<ul><li>Belo Vale integra a República e o Estado de Minas Gerais com <b>autonomia político-administrativa e financeira</b> (art. 1º).</li><li><b>Todo o poder emana do povo</b>, exercido diretamente ou por representantes eleitos (art. 2º). A participação direta inclui instâncias populares com estatutos aprovados pela Câmara.</li><li>São <b>Poderes</b> do Município, independentes e harmônicos, o <b>Legislativo</b> e o <b>Executivo</b>. Em regra, é <b>vedado</b> delegar atribuições entre eles (art. 7º).</li><li><b>Símbolos</b>: bandeira, hino e brasão (art. 9º). O <b>Distrito de Belo Vale</b> é a sede e dá nome ao Município (art. 10).</li><li>Criar, organizar e suprimir <b>distritos</b> depende de <b>lei</b>, observada a legislação estadual (art. 11). O território só muda nos termos da Constituição do Estado (art. 4º).</li></ul>
<h3>Competências (arts. 12 a 16)</h3>
${cartoes([['🏠', 'Interesse local', 'prover a tudo quanto respeite ao interesse local (art. 12)', COR.azul], ['🤝', 'Comum', 'com a União e o Estado (art. 14)', COR.verde], ['🛡', 'Guarda Municipal', 'criar e organizar, de forma suplementar (art. 15)', COR.lar], ['📜', 'Legislativa', 'legislar sobre interesse local e suplementar as leis federais e estaduais (art. 16)', COR.roxo]])}
${box('Ligação com a Constituição', '<p>A LOM repete a lógica do art. 30 da CF: o Município legisla sobre <b>interesse local</b> e <b>suplementa</b> as leis federais e estaduais no que couber. Questões costumam misturar os dois textos.</p>')}
${peg('Na LOM de Belo Vale, a criação da Guarda Municipal aparece como competência <b>suplementar</b> do Município (art. 15).')}`,
      quiz: [C('Segundo a Lei Orgânica de Belo Vale, são poderes do Município, independentes e harmônicos entre si, o Legislativo e o Executivo.', 'Art. 7º.'), E('A criação de distritos no Município de Belo Vale pode ser feita por decreto do Prefeito.', 'Depende de lei, observada a legislação estadual (art. 11).'), C('Compete ao Município de Belo Vale legislar sobre assunto de interesse local e suplementar a legislação federal e a estadual no que couber.', 'Art. 16.')],
    },
    {
      id: 'lom-bens-servicos', titulo: 'Lei Orgânica: bens públicos, serviços e obras', arts: 'LOM, arts. 17 a 29',
      chaves: ['bens publicos municipais', 'patrimonio publico municipal', 'patrimonio historico municipal', 'servicos publicos municipais'],
      html: `${fonte(LOM)}
<h3>Bens municipais</h3>
<ul><li>São bens municipais todas as coisas <b>móveis e imóveis, direitos e ações</b> que pertençam ao Município (art. 17).</li><li>Cabe ao <b>Prefeito</b> administrá-los, respeitada a competência da <b>Câmara</b> quanto aos bens que ela usa (art. 18).</li><li>Comprar imóvel a título oneroso depende de <b>avaliação prévia</b> e <b>autorização legislativa</b> (art. 19).</li><li>São <b>intransferíveis</b> os bens públicos <b>não edificados</b>, salvo para programas de <b>habitação</b>, com autorização legislativa. Também são intransferíveis os imóveis usados pela população para <b>lazer, esporte e cultura</b> (art. 20).</li><li>Transferir imóvel edificado exige <b>avaliação prévia, licitação e aprovação legislativa</b>, e a autorização é <b>sempre prévia</b>, pelo voto da <b>maioria dos membros</b> da Câmara (art. 20, §§ 2º e 3º).</li><li>Imóveis de <b>valor histórico, arquitetônico ou artístico</b> só podem ser usados mediante autorização para <b>finalidade cultural</b> (art. 21).</li><li>É vedado edificar, descaracterizar ou abrir vias em <b>praças, parques e reservas ecológicas</b>, salvo construções estritamente necessárias à sua preservação (art. 23).</li></ul>
<h3>Serviços públicos (arts. 25 a 27)</h3>
<ul><li>Na organização dos serviços, o Município observa <b>comodidade, conforto e bem-estar</b> dos usuários (art. 26).</li><li>A <b>permissão</b> de serviço é sempre a <b>título precário</b>, autorizada por <b>decreto</b>, após edital de chamamento (art. 27, §2º).</li><li>A <b>concessão</b> só ocorre com <b>autorização legislativa</b>, mediante <b>contrato</b>, observada a legislação de licitações (art. 27, §3º).</li></ul>
<h3>Obras públicas (art. 29)</h3>
<p>Podem ser executadas diretamente ou por terceiros mediante <b>licitação</b>. A execução direta <b>não dispensa</b> licitação para comprar o material. A obra deve estar adequada ao <b>plano plurianual</b> e às <b>diretrizes orçamentárias</b> e ser precedida de <b>projeto</b>.</p>
${cartoes([['🔐', 'Permissão', 'decreto · precária · chamamento', COR.lar], ['📝', 'Concessão', 'autorização legislativa · contrato · licitação', COR.azul]])}
${peg('A autorização da Câmara para transferir imóvel é <b>sempre prévia</b> e exige a <b>maioria dos membros</b> (absoluta), e não a maioria dos presentes.')}`,
      quiz: [C('Segundo a Lei Orgânica, a aquisição de bem imóvel a título oneroso pelo Município depende de avaliação prévia e de autorização legislativa.', 'Art. 19.'), E('A concessão de serviço público municipal dispensa autorização legislativa, bastando decreto do Prefeito.', 'A concessão exige autorização legislativa e contrato (art. 27, §3º). Por decreto é a permissão.'), C('A execução direta de obra pública pelo Município não dispensa a licitação para aquisição do material a ser empregado.', 'Art. 29, §2º.')],
    },
    {
      id: 'lom-administracao', titulo: 'Lei Orgânica: Administração Pública e servidores', arts: 'LOM, arts. 30 a 71',
      chaves: ['administracao direta municipal', 'administracao municipal', 'competencias administrativas', 'processo administrativo municipal', 'poder de policia municipal', 'controle interno municipal'],
      html: `${fonte(LOM)}
<h3>Princípios (art. 30)</h3>
<p>A Administração dos Poderes do Município e das entidades descentralizadas obedece aos princípios da <b>legalidade, impessoalidade, moralidade, publicidade e razoabilidade</b>. O agente deve <b>motivar</b> o ato, explicitando o fundamento <b>legal, fático e a finalidade</b> (art. 30, §2º).</p>
${box('Diferença em relação à CF', '<p>A LOM lista a <b>razoabilidade</b> entre os princípios expressos; a CF lista a <b>eficiência</b>. Atenção ao enunciado: “segundo a Lei Orgânica” ou “segundo a Constituição”.</p>')}
<ul><li>O Município só pode instituir ou manter <b>fundações de direito público</b> (art. 34, §1º). É vedado delegar ao Executivo a criação, extinção ou transformação de entidade da administração indireta (§3º).</li><li>Prefeito, Vice e Vereadores <b>não podem contratar</b> com o Município, proibição que dura até <b>6 meses</b> após o fim das funções (art. 40).</li><li>Atos de efeitos externos só entram em vigor <b>após publicação</b> (art. 37, §2º).</li><li>É vedado contratar empresas ou profissionais <b>inadimplentes</b> com o Município e com obrigações fiscais, trabalhistas e previdenciárias (art. 51, §3º).</li></ul>
<h3>Servidores na LOM (arts. 52 a 71)</h3>
<ul><li><b>Concurso público</b> de provas ou de provas e títulos; validade de até <b>2 anos</b>, prorrogável <b>uma vez</b> (art. 53).</li><li>Contratação temporária para necessidade de <b>excepcional interesse público</b>, definida como o ato para evitar prejuízo ao erário ou danos à população (art. 54).</li><li>Os vencimentos do <b>Legislativo</b> não podem superar os do <b>Executivo</b> (art. 56, §2º).</li><li>Acumulação vedada, salvo compatibilidade de horário nos casos permitidos, entre eles <b>dois cargos privativos de médico</b> (art. 57).</li><li><b>Estabilidade</b> após <b>3 anos</b> de efetivo exercício; perda do cargo por sentença transitada em julgado ou processo administrativo com ampla defesa (art. 68).</li><li><b>Previdência</b>: todos os servidores são vinculados ao <b>Regime Geral de Previdência Social</b>, vedada a instituição de regime próprio (art. 69).</li><li><b>Regime jurídico único</b> e planos de carreira para administração direta, autarquias e fundações (art. 62).</li></ul>
${peg('Em Belo Vale, segundo a LOM, os servidores ficam no <b>Regime Geral</b> (INSS), e é <b>vedado</b> criar regime próprio de previdência (art. 69).')}`,
      quiz: [C('Segundo a Lei Orgânica de Belo Vale, o Prefeito, o Vice-Prefeito e os Vereadores não poderão contratar com o Município, subsistindo a proibição até seis meses após findas as respectivas funções.', 'Art. 40.'), E('A Lei Orgânica de Belo Vale autoriza o Município a instituir fundações de direito privado.', 'Só são permitidas fundações de direito público (art. 34, §1º).'), C('A Lei Orgânica de Belo Vale vincula os servidores municipais ao Regime Geral de Previdência Social, vedada a instituição de regime próprio.', 'Art. 69.')],
    },
    {
      id: 'lom-legislativo', titulo: 'Lei Orgânica: Câmara Municipal, vereadores e processo legislativo', arts: 'LOM, arts. 72 a 97',
      chaves: ['camara municipal', 'competencias da camara', 'processo legislativo municipal', 'controle legislativo'],
      html: `${fonte(LOM)}
<h3>A Câmara</h3>
<ul><li>Vereadores eleitos pelo <b>sistema proporcional</b>, para legislatura de <b>4 anos</b>. O número é fixado pela Câmara, dentro dos limites da CF (art. 72).</li><li>Reúne-se em sessão ordinária, <b>exceto em janeiro e julho</b> (art. 73). No 1º ano da legislatura, reúne-se em <b>1º de janeiro</b> para a posse (art. 74).</li><li>Sessão extraordinária: convocada pelo <b>Prefeito</b>, pelo <b>Presidente da Câmara</b> ou por <b>1/3</b> dos membros, em urgência ou interesse público relevante (art. 75).</li><li><b>Quórum</b>: funcionamento com a maioria dos membros; deliberação por maioria dos presentes, salvo exceções. Empréstimos e concessão de privilégios exigem <b>2/3</b> (art. 76). O Presidente só vota em escrutínio secreto ou para desempatar.</li><li>Convocação de Secretário: requerimento da <b>maioria</b>, com antecedência mínima de <b>10 dias</b> (reduzível a 48 horas na urgência); a exposição chega <b>3 dias úteis</b> antes (art. 78).</li></ul>
<h3>Vereadores</h3>
<ul><li><b>Invioláveis</b> por opiniões, palavras e votos no exercício do mandato e na circunscrição do Município (art. 79).</li><li><b>Perda do mandato</b> (art. 81): infringir proibições; corrupção ou improbidade; falta de decoro; perda ou suspensão dos direitos políticos; decisão da Justiça Eleitoral; condenação criminal transitada em julgado, entre outros. Em vários casos, a perda é decidida pela Câmara por <b>voto secreto de 2/3</b>.</li><li>Licença para interesse particular sem remuneração: não perde o mandato se não ultrapassar <b>60 dias por sessão legislativa</b>. O <b>suplente</b> é convocado em vaga, investidura em cargo ou licença superior a 60 dias. Sem suplente, há eleição se faltarem mais de <b>15 meses</b> (art. 82).</li><li><b>Subsídio</b> fixado por lei de iniciativa da Câmara, em no máximo <b>75%</b> do subsídio dos deputados estaduais (art. 83).</li></ul>
<h3>Emenda à Lei Orgânica (art. 88)</h3>
${passos([['Proposta', '1/3 dos vereadores · Prefeito · 5% do eleitorado'], ['Votação', 'dois turnos, com interstício mínimo de 10 dias'], ['Aprovação', '2/3 dos membros da Câmara em ambos os turnos']])}
<p>Não se emenda a LOM na vigência de <b>estado de sítio, estado de defesa</b> ou <b>intervenção estadual</b>.</p>
<h3>Leis e quóruns (arts. 89 a 97)</h3>
<table class="tab"><tr><th>Quórum</th><th>Matérias</th></tr>
<tr><td><b>2/3 dos membros</b></td><td>plano diretor · parcelamento, ocupação e uso do solo · código tributário · alteração do estatuto dos servidores · isenção de tributo (art. 118)</td></tr>
<tr><td><b>Maioria dos membros</b></td><td>código de obras · código de posturas · código sanitário · Defensoria do Povo e Guarda Municipal · organização administrativa · criação de cargos</td></tr></table>
<ul><li><b>Iniciativa popular</b>: projeto subscrito por no mínimo <b>5% do eleitorado</b> (art. 91).</li><li><b>Urgência</b> pedida pelo Prefeito: sem manifestação em <b>45 dias</b>, o projeto tranca a pauta (art. 93).</li><li><b>Sanção ou veto</b> em <b>15 dias</b>; o silêncio importa <b>sanção</b>; os motivos do veto vão à Câmara em <b>48 horas</b>; o veto parcial abrange texto integral de artigo, parágrafo, inciso ou alínea; a Câmara decide em <b>30 dias</b>, em escrutínio secreto, e rejeita o veto pela <b>maioria absoluta</b> (art. 94).</li><li>Projeto rejeitado só volta na mesma sessão legislativa por proposta da <b>maioria dos membros</b> (art. 95).</li></ul>
${dica('Emenda à LOM: “<b>1/3 – Prefeito – 5%</b> para propor; <b>2 turnos, 10 dias, 2/3</b> para aprovar”.')}
${peg('Na LOM de Belo Vale, alterar as regras do <b>Estatuto dos Servidores</b> exige <b>2/3</b> dos membros da Câmara (art. 89, §1º, I, “d”).')}`,
      quiz: [C('A Lei Orgânica de Belo Vale pode ser emendada mediante proposta de, no mínimo, 5% do eleitorado do Município.', 'Art. 88, III.'), E('O veto do Prefeito é rejeitado pelo voto de dois terços dos membros da Câmara.', 'A rejeição do veto ocorre pela maioria absoluta dos membros (art. 94, §5º).'), C('Segundo a Lei Orgânica, depende do voto favorável de dois terços dos membros da Câmara a lei que aprova o plano diretor.', 'Art. 89, §1º, I, “a”.')],
    },
    {
      id: 'lom-executivo', titulo: 'Lei Orgânica: Prefeito, julgamento, Procuradoria e fiscalização', arts: 'LOM, arts. 98 a 116',
      chaves: ['prefeito e vice', 'prefeito', 'procuradoria do municipio', 'defensoria do povo', 'fiscalizacao'],
      html: `${fonte(LOM)}
<h3>Prefeito e Vice</h3>
<ul><li>O Executivo é exercido pelo <b>Prefeito</b>, auxiliado pelos <b>Secretários Municipais</b> (art. 98).</li><li>Perde o mandato o Prefeito que assumir outro cargo ou função na administração, ressalvada a posse por concurso público (art. 99, parágrafo único).</li><li>Posse em reunião da Câmara; declaração pública de <b>bens</b> na posse e no fim do mandato (art. 100).</li><li>O <b>Vice</b> substitui nos impedimentos e sucede na vaga.</li><li>Impedidos ou vagos os dois cargos: assume o <b>Presidente da Câmara</b> (art. 101).</li><li>Vagando os dois cargos: eleição <b>90 dias</b> depois da última vaga; nos <b>últimos 15 meses</b> do mandato, eleição pela <b>Câmara</b> em <b>30 dias</b>. Os eleitos completam o período (art. 101).</li><li>Sem posse em <b>10 dias</b> da data fixada, salvo força maior reconhecida pela Câmara, o cargo é declarado vago (art. 102).</li><li>Ausência sem autorização da Câmara por mais de <b>15 dias consecutivos</b> (Prefeito do Município, Vice do Estado): <b>perda do cargo</b> (art. 103).</li><li>Contas do exercício anterior: prestadas em <b>60 dias</b> da abertura da sessão legislativa (art. 104, XI).</li></ul>
<h3>Responsabilização</h3>
${cartoes([['⚖️', 'Crimes de responsabilidade e comuns', 'processo e julgamento no <b>Tribunal de Justiça de Minas Gerais</b> (art. 105, §2º)', COR.verm], ['🏛', 'Infrações político-administrativas', 'julgamento pela <b>Câmara</b>, com perda do mandato (art. 106)', COR.azul]])}
<p>A denúncia por infração político-administrativa pode ser feita por <b>qualquer cidadão</b>. O vereador denunciante fica impedido de votar e de integrar a comissão processante (art. 106). Exemplos de infração: não repassar à Câmara o duodécimo até o dia <b>20</b> de cada mês; não prestar informações em <b>15 dias</b>.</p>
<h3>Secretários e Procuradoria</h3>
<ul><li>Secretários: brasileiros, maiores de <b>21 anos</b>, no exercício dos direitos políticos (art. 108). Crimes comuns: <b>juiz de Direito da Comarca</b>; infrações político-administrativas: <b>Câmara</b> (art. 109).</li><li><b>Procuradoria do Município</b>: representação judicial, consultoria e assessoramento jurídico. Ingresso na carreira de Procurador por <b>concurso de provas e títulos</b>. Chefe: <b>Procurador-Geral</b>, de livre designação do Prefeito, entre advogados de reconhecido saber jurídico (art. 110).</li></ul>
<h3>Fiscalização e controle (arts. 111 a 116)</h3>
<ul><li>Controle externo pela <b>Câmara</b>, com auxílio do <b>Tribunal de Contas do Estado</b>; controle interno integrado nos dois Poderes (art. 111).</li><li><b>Qualquer cidadão</b>, partido, associação ou sindicato pode denunciar irregularidades à Câmara, à Defensoria do Povo, ao MP ou ao Tribunal de Contas (art. 112).</li><li>As contas do Prefeito são <b>julgadas pela Câmara</b>, com parecer prévio do Tribunal de Contas emitido em até <b>365 dias</b> (art. 113).</li><li><b>Plebiscito</b> convocado pela Câmara, por maioria de seus membros (art. 114).</li><li><b>Defensoria do Povo</b>: órgão com autonomia administrativa e financeira e funções de controle da administração (art. 115).</li></ul>
${dica('Vacância dupla: “<b>90 dias</b>, voto direto; nos <b>últimos 15 meses</b>, Câmara em <b>30 dias</b>”. Na CF, para Presidente, o marco é de 2 anos.')}
${peg('Na LOM de Belo Vale, o marco para a eleição indireta é de <b>15 meses</b> finais do mandato, e não os 2 anos da regra federal.')}`,
      quiz: [C('Ocorrendo a vacância dos cargos de Prefeito e Vice-Prefeito nos últimos quinze meses do mandato, a eleição para ambos os cargos será feita pela Câmara, trinta dias depois da última vaga.', 'Art. 101, §2º, da LOM de Belo Vale.'), E('Segundo a Lei Orgânica, nos crimes de responsabilidade o Prefeito é julgado pela Câmara Municipal.', 'Crimes de responsabilidade e comuns vão ao TJMG (art. 105, §2º). A Câmara julga as infrações político-administrativas.'), C('O Procurador-Geral do Município é de livre designação do Prefeito, entre advogados de reconhecido saber jurídico.', 'Art. 110, §3º.')],
    },
    {
      id: 'lom-financas', titulo: 'Lei Orgânica: tributação e orçamento', arts: 'LOM, arts. 117 a 140',
      chaves: ['competencia tributaria municipal', 'tributacao municipal', 'orcamento'],
      html: `${fonte(LOM)}
<h3>Tributos do Município (art. 117)</h3>
${cartoes([['🏠', 'IPTU', 'propriedade predial e territorial urbana', COR.azul], ['🔁', 'ITBI', 'transmissão inter vivos, onerosa, de bens imóveis', COR.verde], ['🧾', 'ISS', 'serviços de qualquer natureza', COR.lar], ['💵', 'Taxas e contribuição de melhoria', '', COR.roxo]])}
<ul><li><b>Isenção</b> de tributo municipal: lei de iniciativa do <b>Executivo</b>, aprovada por <b>2/3</b> dos membros da Câmara, valendo para o <b>exercício seguinte</b> (art. 118).</li><li><b>Anistia ou remissão</b> tributária: só por <b>lei específica</b> municipal, de iniciativa do Executivo (art. 121).</li><li>O contribuinte não paga título lançado sem <b>prévia notificação</b> (art. 122).</li><li>O Município recebe parte de impostos federais (IR retido na fonte, ITR, FPM) e estaduais (IPVA dos veículos licenciados no Município, ICMS) (arts. 123 a 125).</li></ul>
<h3>Orçamento (arts. 127 a 140)</h3>
<ul><li>Leis de iniciativa do <b>Executivo</b>: <b>Plano Plurianual</b>, <b>Diretrizes Orçamentárias</b> e <b>Orçamentos Anuais</b> (art. 127).</li><li>Haverá um <b>Conselho Orçamentário</b> para colher sugestões para a LDO (art. 130).</li><li>A LOA não terá dispositivo estranho à previsão da receita e à fixação da despesa, salvo autorização de créditos suplementares e operações de crédito (art. 132).</li><li>O projeto da LOA vai à Câmara até <b>30 de setembro</b> do ano anterior; sem envio, a Câmara considera como proposta a lei orçamentária vigente (art. 136).</li><li>Duodécimos da Câmara entregues até o dia <b>20</b> de cada mês (art. 138).</li><li>Pagamentos por sentença judicial seguem a ordem dos <b>precatórios</b>, exceto créditos alimentícios (art. 140).</li></ul>
${peg('Isenção municipal exige <b>2/3</b> dos membros e só vale no <b>exercício seguinte</b> (art. 118). Anistia e remissão exigem <b>lei específica</b> de iniciativa do Executivo.')}`,
      quiz: [C('Segundo a Lei Orgânica, a isenção de tributo municipal depende de lei de iniciativa do Executivo aprovada por dois terços dos membros da Câmara.', 'Art. 118.'), E('O projeto de lei orçamentária anual deve ser enviado pelo Prefeito à Câmara até 31 de agosto do ano anterior.', 'O prazo da LOM é 30 de setembro (art. 136).')],
    },
    {
      id: 'est-provimento', titulo: 'Estatuto: requisitos, provimento, posse, exercício e estágio probatório', arts: 'Estatuto, arts. 1º a 20',
      chaves: ['provimento e posse', 'estatuto - estabilidade', 'estatuto dos servidores (parte geral)', 'estatuto - disposicoes gerais'],
      html: `${fonte(EST)}
<h3>Conceitos (arts. 1º a 4º)</h3>
<ul><li><b>Servidor</b> é a pessoa legalmente investida em cargo público (art. 2º).</li><li><b>Cargo público</b> é o conjunto de atribuições e responsabilidades cometidas a um servidor, criado por lei, com denominação própria e vencimento pago pelos cofres públicos, de provimento efetivo ou em comissão (art. 3º).</li><li>É proibida a prestação de <b>serviços gratuitos</b>, salvo nos casos previstos em lei (art. 4º).</li></ul>
<h3>Requisitos para a investidura (art. 5º)</h3>
${cartoes([['🇧🇷', 'Nacionalidade brasileira', 'ou equiparada', COR.azul], ['🗳', 'Direitos políticos', 'em gozo', COR.verde], ['🎖', 'Quitação militar e eleitoral', '', COR.lar], ['🎓', 'Escolaridade', 'exigida para o cargo', COR.roxo], ['🔞', 'Idade mínima de 18 anos', '', COR.verm], ['🩺', 'Aptidão física e mental', '', COR.cinza]])}
<p>Às pessoas com deficiência reservam-se <b>no mínimo 5%</b> das vagas, em cargos compatíveis (art. 5º, §2º).</p>
<h3>Provimento (arts. 6º a 12)</h3>
<p>Formas (art. 8º): <b>nomeação, promoção, readaptação, reversão, aproveitamento, reintegração e recondução</b>. A investidura ocorre com a <b>posse</b> (art. 7º).</p>
<ul><li>Nomeação em caráter <b>efetivo</b> (cargo isolado ou de carreira) ou <b>em comissão</b> (livre nomeação e exoneração, inclusive interinamente) (art. 9º).</li><li>Concurso de provas ou de provas e títulos; validade de até <b>2 anos</b>, prorrogável <b>uma única vez</b> por igual período; edital publicado em jornal oficial e de grande circulação regional (arts. 11 e 12).</li><li><b>Não se abre novo concurso</b> enquanto houver aprovado em concurso anterior com prazo de validade não expirado (art. 12, §2º).</li></ul>
<h3>Posse e exercício (arts. 13 a 18)</h3>
${passos([['Posse', '<b>30 dias</b> da publicação do ato de provimento; pode ser por procuração específica; exige declaração de bens e de acumulação'], ['Inspeção médica', 'só toma posse quem for julgado apto física e mentalmente (art. 14)'], ['Exercício', '<b>15 dias</b> da data da posse (art. 15, §1º)']])}
<ul><li>Sem posse no prazo, o ato de provimento é <b>tornado sem efeito</b> (art. 13, §6º). Só há posse nos casos de provimento por <b>nomeação</b> (§4º).</li><li>Sem exercício no prazo, o servidor é <b>exonerado</b> ou a designação é tornada sem efeito (art. 15, §2º).</li><li>Servidor removido, redistribuído, cedido ou com exercício provisório em outro órgão: de <b>10 a 30 dias</b> para retomar as atribuições, incluído o deslocamento (art. 18).</li><li><b>Jornada</b>: máximo de <b>40 horas</b> semanais. Cargo em comissão e função de confiança: <b>integral dedicação</b> (art. 19).</li></ul>
<h3>Estágio probatório e avaliação especial de desempenho (art. 20)</h3>
<p>Ao entrar em exercício, o servidor efetivo cumpre estágio probatório de <b>36 meses</b>, com <b>Avaliação Especial de Desempenho</b> segundo os princípios da legalidade, impessoalidade, moralidade, publicidade, eficiência, contraditório e ampla defesa. São <b>16 critérios</b>, entre eles pontualidade, assiduidade, ética, responsabilidade, disciplina, eficiência, qualidade do trabalho, iniciativa, cursos de capacitação (mínimo de 40 horas) e espírito de equipe.</p>
${box('Atenção ao PDF', '<p>O arquivo do Estatuto recebido pelo Projeto R.I.S.K. <b>não contém as páginas dos arts. 21 a 30</b> (estabilidade em detalhe, readaptação, reversão e reintegração). Para esses pontos, consulte o texto oficial na Prefeitura ou na Câmara. A estabilidade após 3 anos está confirmada na Lei Orgânica (art. 68).</p>')}
${dica('Prazos do ingresso: “<b>30 para a posse, 15 para o exercício</b>”, e estágio de <b>36 meses</b>.')}
${peg('Na Lei 8.112 (federal), o texto fala em estágio de 24 meses. No <b>Estatuto de Belo Vale</b>, o estágio é de <b>36 meses</b>, já alinhado à estabilidade de 3 anos.')}`,
      quiz: [C('Segundo o Estatuto dos Servidores de Belo Vale, a posse ocorrerá no prazo de 30 dias contados da publicação do ato de provimento.', 'Art. 13, §1º.'), E('O servidor empossado tem 30 dias, contados da posse, para entrar em exercício.', 'O prazo é de 15 dias (art. 15, §1º).'), C('O servidor nomeado para cargo efetivo em Belo Vale cumpre estágio probatório de 36 meses, com avaliação especial de desempenho.', 'Art. 20.')],
    },
    {
      id: 'est-vacancia-direitos', titulo: 'Estatuto: vacância, deslocamentos, vantagens, férias e licenças', arts: 'Estatuto, arts. 31 a 101',
      chaves: ['direitos e vantagens', 'estatuto - licencas', 'licencas'],
      html: `${fonte(EST)}
<h3>Recondução, disponibilidade e vacância</h3>
<ul><li><b>Recondução</b>: retorno do servidor <b>estável</b> ao cargo anterior por inabilitação em estágio probatório de outro cargo ou reintegração do antigo ocupante (art. 31).</li><li><b>Aproveitamento</b> do servidor em disponibilidade é <b>obrigatório</b>, em cargo de atribuições e vencimentos compatíveis. Se ele não entrar em exercício no prazo legal, o aproveitamento fica sem efeito e a disponibilidade é <b>cassada</b>, salvo doença comprovada por junta médica (arts. 32 a 34).</li><li><b>Vacância</b> (art. 35): exoneração · demissão · promoção · readaptação · aposentadoria · posse em outro cargo inacumulável · falecimento.</li><li><b>Remoção</b>: deslocamento, a pedido ou de ofício, no âmbito do mesmo quadro, com ou sem mudança de sede (art. 38).</li><li><b>Substituição</b>: os titulares de direção ou chefia têm substitutos; o substituto recebe a retribuição nos afastamentos superiores a <b>30 dias consecutivos</b> (art. 40).</li></ul>
<h3>Vantagens (arts. 49 a 76)</h3>
${cartoes([['🧳', 'Indenizações', 'ajuda de custo, diárias, transporte', COR.azul], ['🎄', 'Gratificação natalina', '1/12 da remuneração de dezembro por mês de exercício; paga até o dia <b>20 de dezembro</b>', COR.verde], ['☢️', 'Adicionais', 'insalubridade, periculosidade, atividades penosas', COR.lar], ['⏱', 'Serviço extraordinário', 'situações excepcionais e temporárias; máximo de <b>2 horas por jornada</b>; não se incorpora', COR.roxo], ['🌙', 'Adicional noturno', '22h às 5h · <b>+25%</b> · hora de 52min30s', COR.cinza], ['🏖', 'Adicional de férias', '<b>1/3</b> da remuneração, pago independentemente de pedido', COR.verm]])}
<h3>Férias (arts. 77 a 80)</h3>
<ul><li><b>30 dias</b>, acumuláveis até <b>2 períodos</b> por necessidade do serviço. Primeiro período aquisitivo: <b>12 meses</b> de exercício. É vedado descontar faltas das férias.</li><li>Parcelamento em até <b>3 etapas</b>, a pedido do servidor e no interesse da Administração.</li><li>Pagamento até <b>2 dias</b> antes do início. É <b>vedado</b> converter férias em abono pecuniário.</li><li>Quem opera com <b>Raios X</b> ou substâncias radioativas: <b>20 dias</b> consecutivos por semestre, sem acumulação (art. 79).</li><li>Interrupção só por calamidade, comoção interna, júri, serviço militar ou eleitoral, ou necessidade do serviço declarada pela autoridade máxima (art. 80).</li></ul>
<h3>Licenças (arts. 81 a 92)</h3>
<table class="tab"><tr><th>Licença</th><th>Regra no Estatuto</th></tr>
<tr><td>Doença própria ou em pessoa da família</td><td>precedida de exame médico ou junta oficial</td></tr>
<tr><td>Afastamento do cônjuge</td><td>por prazo indeterminado e <b>sem remuneração</b></td></tr>
<tr><td>Serviço militar e atividade política</td><td>na atividade política: do registro da candidatura até o 10º dia após a eleição, vencimentos garantidos por <b>3 meses</b></td></tr>
<tr><td>Interesses particulares</td><td>para efetivo <b>fora do estágio</b>; até <b>2 anos</b>, sem remuneração, prorrogável uma vez; nova licença só <b>2 anos</b> depois</td></tr>
<tr><td>Paternidade</td><td><b>5 dias</b>, também na adoção</td></tr>
<tr><td>Gestante</td><td><b>120 dias</b> remunerados, podendo começar no último mês de gestação</td></tr>
<tr><td>Adoção (servidora)</td><td><b>90 dias</b> (criança de até 1 ano) ou <b>30 dias</b> (maior de 1 ano), remunerada</td></tr>
<tr><td>Mandato classista</td><td>sem remuneração: 1 servidor (até 1.000 associados), 2 (1.001 a 5.000) e 3 (mais de 5.000)</td></tr></table>
<p>Licença concedida dentro de <b>60 dias</b> do término de outra da mesma espécie é considerada <b>prorrogação</b> (art. 82).</p>
<h3>Ausências permitidas (art. 97)</h3>
<p><b>1 dia</b> para doação de sangue · <b>1 dia</b> para alistamento eleitoral · <b>8 dias</b> consecutivos por casamento ou falecimento de cônjuge, companheiro, pais, madrasta ou padrasto, filhos, enteados, menor sob guarda ou tutela e irmãos.</p>
<h3>Direito de petição (arts. 102 a 112)</h3>
<p>O direito de requerer prescreve em <b>5 anos</b> (atos que afetem interesse patrimonial e créditos das relações de trabalho) e em <b>120 dias</b> nos demais casos. Pedido de reconsideração e recurso <b>interrompem</b> a prescrição. O recurso pode ter efeito suspensivo a juízo da autoridade.</p>
${peg('No Estatuto de Belo Vale é <b>vedado converter férias em abono</b>, e a licença-paternidade é de <b>5 dias</b>.')}`,
      quiz: [C('Segundo o Estatuto de Belo Vale, a servidora gestante tem direito a licença remunerada de 120 dias, podendo ser concedida a partir do último mês de gestação.', 'Art. 90.'), E('O servidor de Belo Vale pode converter um terço de suas férias em abono pecuniário.', 'É vedada a conversão de qualquer parcela das férias em abono (art. 78, §1º).'), C('O serviço extraordinário no Estatuto de Belo Vale está limitado a 2 horas por jornada.', 'Art. 73.')],
    },
    {
      id: 'est-regime-disciplinar', titulo: 'Estatuto: deveres, proibições, acumulação, responsabilidades e penalidades', arts: 'Estatuto, arts. 123 a 149',
      chaves: ['deveres e proibicoes', 'estatuto - penalidades', 'estatuto - responsabilidades', 'direitos, deveres, penalidades'],
      html: `${fonte(EST)}
<h3>Deveres (art. 123, destaques)</h3>
<p>Levar ao superior as irregularidades de que tiver ciência · zelar pelo patrimônio · guardar sigilo · conduta compatível com a moralidade · assiduidade e pontualidade · urbanidade · <b>representar contra ilegalidade, omissão ou abuso de poder</b> (pela via hierárquica, com ampla defesa ao representando).</p>
<h3>Proibições (art. 124)</h3>
${cartoes([['🚪', 'I a X', 'ausentar-se sem autorização · retirar documentos · recusar fé a documentos públicos · resistência injustificada · manifestação de apreço ou desapreço · cometer atribuição a estranho · coagir subordinados a se filiarem · nepotismo até o 2º grau · atividade incompatível · recusar atualizar dados', COR.lar], ['💰', 'XI a XIV', 'valer-se do cargo para proveito pessoal · receber propina ou presente · aceitar emprego de Estado estrangeiro · usura', COR.verm], ['😴', 'XV a XVII', 'desídia · usar pessoal ou recursos da repartição em atividade particular · cometer a outro servidor atribuições estranhas', COR.roxo]])}
<h3>Acumulação (arts. 125 a 127)</h3>
<ul><li>Vedada, salvo os casos da Constituição, também em autarquias, fundações, empresas públicas e sociedades de economia mista de qualquer ente; a acumulação lícita exige <b>compatibilidade de horários</b>.</li><li>Não pode exercer mais de <b>um cargo em comissão</b>, salvo interinidade.</li><li>Acumulação ilegal detectada: notificação para <b>optar em 10 dias</b> improrrogáveis; se não optar, procedimento sumário com comissão de <b>2 servidores estáveis</b>, defesa em 5 dias e conclusão em <b>30 dias</b>, prorrogáveis por 15 (art. 140).</li></ul>
<h3>Responsabilidades (arts. 128 a 133)</h3>
<p>O servidor responde <b>civil, penal e administrativamente</b>; as sanções podem cumular-se e são independentes. A responsabilidade administrativa é afastada na absolvição criminal que negue a <b>existência do fato</b> ou a <b>autoria</b>.</p>
<h3>Penalidades (arts. 134 a 147)</h3>
<table class="tab"><tr><th>Penalidade</th><th>Quando</th></tr>
<tr><td><b>Advertência</b></td><td>violação das proibições dos incisos I a X do art. 124 e de deveres funcionais</td></tr>
<tr><td><b>Suspensão</b> (até 90 dias)</td><td>reincidência em falta punida com advertência e demais proibições que não gerem demissão. Recusa injustificada à inspeção médica: até <b>15 dias</b>. Pode virar <b>multa de 50%</b> por dia, com o servidor em serviço</td></tr>
<tr><td><b>Demissão</b></td><td>crime contra a administração · abandono · inassiduidade habitual · improbidade · incontinência pública · insubordinação grave · ofensa física em serviço · aplicação irregular de dinheiro público · revelação de segredo · lesão aos cofres públicos · corrupção · acumulação ilegal · incisos XI a XIV do art. 124</td></tr>
<tr><td><b>Cassação de aposentadoria ou disponibilidade</b></td><td>falta punível com demissão praticada na atividade</td></tr>
<tr><td><b>Destituição de cargo em comissão</b></td><td>para não efetivo, infrações sujeitas a suspensão ou demissão</td></tr></table>
<ul><li><b>Abandono</b>: ausência intencional por mais de <b>30 dias consecutivos</b>. <b>Inassiduidade</b>: <b>60 dias</b> de falta sem justa causa, interpoladamente, em <b>12 meses</b>.</li><li>Registros de advertência e suspensão são <b>cancelados</b> após <b>3 e 5 anos</b> de exercício sem nova infração, sem efeito retroativo.</li><li>Demissão por violação do art. 124, XI: ex-servidor fica impedido de nova investidura municipal por <b>5 anos</b>. Demissão por crime contra a administração, improbidade, aplicação irregular de dinheiro, lesão aos cofres e corrupção: <b>não retorna</b> ao serviço municipal.</li></ul>
<h3>Quem aplica e prescrição (arts. 148 e 149)</h3>
<table class="tab"><tr><th>Competência</th><th>Penalidade</th></tr><tr><td>Autoridade administrativa superior</td><td>demissão e cassação</td></tr><tr><td>Autoridade imediatamente inferior</td><td>suspensão superior a 30 dias</td></tr><tr><td>Chefe da repartição</td><td>advertência e suspensão de até 30 dias</td></tr><tr><td>Quem nomeou</td><td>destituição de cargo em comissão</td></tr></table>
<p><b>Prescrição</b>: <b>5 anos</b> (demissão, cassação e destituição), <b>2 anos</b> (suspensão) e <b>180 dias</b> (advertência), contados da data em que o fato se tornou conhecido. A abertura de sindicância ou PAD <b>interrompe</b> a prescrição até a decisão final.</p>
${dica('Cancelamento dos registros: “<b>A</b>dvertência <b>3</b>, <b>S</b>uspensão <b>5</b>”. Prescrição: “<b>5 – 2 – 180</b>”.')}
${peg('Em Belo Vale, o nepotismo do art. 124, VIII, alcança cônjuge, companheiro ou parente até o <b>2º grau</b> sob chefia imediata. A SV 13 do STF vai até o 3º grau.')}`,
      quiz: [C('Segundo o Estatuto de Belo Vale, configura abandono de cargo a ausência intencional do servidor ao serviço por mais de trinta dias consecutivos.', 'Art. 145.'), E('A penalidade de suspensão, no Estatuto de Belo Vale, pode chegar a 120 dias.', 'O limite é de 90 dias (art. 137).'), C('A ação disciplinar prescreve em 180 dias quanto à advertência, contados da data em que o fato se tornou conhecido.', 'Art. 149, III, e §1º.')],
    },
    {
      id: 'est-pad', titulo: 'Estatuto: sindicância, afastamento preventivo, PAD e revisão', arts: 'Estatuto, arts. 150 a 189',
      chaves: ['processo administrativo disciplinar', 'estatuto - processo administrativo'],
      html: `${fonte(EST)}
<h3>Dever de apurar (arts. 150 e 151)</h3>
<p>A autoridade que souber de irregularidade é <b>obrigada</b> a apurá-la de imediato, por sindicância ou PAD, com ampla defesa. Denúncias exigem <b>identificação e endereço</b> do denunciante e forma <b>escrita</b>; se o fato não configurar infração, a denúncia é arquivada.</p>
<h3>Sindicância (art. 152)</h3>
${cartoes([['🗂', 'Arquivamento', '', COR.cinza], ['⚠️', 'Advertência ou suspensão de até 30 dias', '', COR.lar], ['📂', 'Instauração de PAD', '', COR.verm]])}
<p>Prazo: <b>30 dias</b>, prorrogáveis por igual período. Se a falta puder gerar suspensão <b>acima de 30 dias</b>, demissão, cassação ou destituição, o <b>PAD é obrigatório</b> (art. 153).</p>
<h3>Afastamento preventivo (art. 154)</h3>
<p>Medida cautelar para que o servidor não influa na apuração: até <b>60 dias</b>, sem prejuízo da remuneração, prorrogável por igual prazo.</p>
<h3>Processo disciplinar (arts. 155 a 180)</h3>
<ul><li>Comissão de <b>3 servidores estáveis</b>; o presidente deve ocupar cargo superior ou de mesmo nível, ou ter escolaridade igual ou superior à do indiciado (art. 156).</li><li>Não podem integrar a comissão cônjuge, companheiro ou parente do acusado, consanguíneo ou afim, em linha reta ou colateral, até o <b>3º grau</b>.</li><li>A comissão atua com independência e imparcialidade; reuniões e audiências têm caráter <b>reservado</b> (art. 157).</li></ul>
${passos([['Instauração', 'publicação do ato que constitui a comissão'], ['Inquérito administrativo', 'instrução, defesa e relatório, com contraditório e ampla defesa'], ['Julgamento', 'pela autoridade competente, que acata o relatório salvo se contrário às provas']])}
<p>Prazo de conclusão: <b>60 dias</b> da publicação do ato que constitui a comissão, prorrogáveis por igual prazo (art. 159). Os autos da sindicância integram o PAD como peça informativa; se houver ilícito penal, cópia vai ao <b>Ministério Público</b> (art. 161).</p>
<p>O servidor que responde a processo disciplinar tem restrição à <b>exoneração a pedido</b> enquanto o processo não termina (art. 179).</p>
<h3>Revisão (arts. 181 a 189)</h3>
<ul><li>O processo disciplinar pode ser revisto <b>a qualquer tempo</b>, a pedido ou de ofício (art. 181).</li><li>O <b>ônus da prova</b> é do requerente; a simples alegação de injustiça não basta.</li><li>A comissão revisora tem <b>60 dias</b>. O julgamento cabe à autoridade que aplicou a penalidade.</li></ul>
${dica('Prazos do disciplinar: “sindicância <b>30 + 30</b>, afastamento <b>60 + 60</b>, PAD <b>60 + 60</b>, revisão <b>60</b>”.')}
${peg('No procedimento <b>sumário</b> (acumulação ilegal, abandono e inassiduidade), a comissão tem <b>2</b> servidores estáveis e prazo de <b>30 dias</b> + 15. No PAD comum, são <b>3</b> membros e <b>60 dias</b> + 60.')}`,
      quiz: [C('Da sindicância, segundo o Estatuto de Belo Vale, pode resultar a aplicação de advertência ou suspensão de até 30 dias.', 'Art. 152, II.'), E('O afastamento preventivo do servidor pode durar até 90 dias e implica suspensão da remuneração.', 'São até 60 dias, prorrogáveis por igual prazo, sem prejuízo da remuneração (art. 154).'), C('O processo disciplinar é conduzido por comissão de três servidores estáveis e deve ser concluído em 60 dias, prorrogáveis por igual prazo.', 'Arts. 156 e 159.')],
    },
    {
      id: 'est-transitorias', titulo: 'Estatuto: disposições gerais e transitórias (quinquênio e licença-prêmio)', arts: 'Estatuto, arts. 190 a 204',
      chaves: ['quinquenal', 'licenca-premio'],
      html: `${fonte(EST)}
<h3>Disposições gerais</h3>
<ul><li><b>Dia do Servidor Público</b>: <b>28 de outubro</b> (art. 192).</li><li>Os prazos do Estatuto são contados em <b>dias corridos</b>, excluindo o dia do começo e incluindo o do vencimento (art. 194).</li><li>Ninguém é privado de direitos nem sofre restrição por <b>crença religiosa ou convicção filosófica ou política</b> (art. 195).</li><li><b>Família</b> do servidor: cônjuge, filhos e quaisquer pessoas que vivam às suas expensas e constem do assentamento; equipara-se ao cônjuge o companheiro em <b>união estável</b> (art. 197).</li><li><b>Sede</b> é o município onde a repartição está instalada e onde o servidor tem exercício permanente (art. 198).</li></ul>
<h3>Adicional quinquenal (arts. 199 e 200)</h3>
<ul><li>Quem tomou posse <b>após</b> a publicação do Estatuto <b>não</b> tem direito ao adicional quinquenal; aplicam-se as <b>progressões</b> do plano de carreira.</li><li>Quem já era efetivo pôde <b>optar</b>, em até <b>90 dias</b>: manter o quinquênio (<b>10%</b> a cada 5 anos, até <b>60%</b>, sem as progressões) ou passar às progressões, com renúncia a novos adicionais e proporcionalidade do período em curso (2%, 4%, 6% ou 8%).</li><li>Sem opção no prazo, aplicam-se automaticamente as normas de progressão.</li></ul>
<h3>Licença-prêmio (arts. 201 e 202)</h3>
<ul><li>Quem tomou posse <b>após</b> a publicação do Estatuto <b>não</b> tem direito à licença-prêmio.</li><li>Quem já era efetivo mantém: a licença adquirida e não gozada (em até 2 anos) e <b>6 meses</b> a cada <b>10 anos</b> de efetivo exercício, gozados em até 2 anos da aquisição, com possibilidade de conversão em pecúnia nos termos do artigo.</li></ul>
${peg('O quinquênio e a licença-prêmio são regras de <b>transição</b>: valem só para quem já era servidor efetivo quando o Estatuto foi publicado.')}`,
      quiz: [C('O servidor nomeado e empossado em Belo Vale após a publicação do Estatuto não tem direito à licença-prêmio.', 'Art. 201.'), E('Os prazos previstos no Estatuto de Belo Vale são contados em dias úteis.', 'São contados em dias corridos (art. 194).')],
    },
  ],
};
