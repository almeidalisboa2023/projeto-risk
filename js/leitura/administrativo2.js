// Direito Administrativo — parte 2: licitações, contratos, serviços, bens, intervenção, responsabilidade, controle, improbidade e processo.
import { cartoes, passos, COR } from './figuras.js';
import { peg, box, dica, ex, juris, C, E } from './blocos.js';

export const PARTE2 = [
  {
    id: 'licitacoes', titulo: 'Licitações (Lei 14.133/2021)', arts: 'Lei 14.133/2021',
    chaves: ['licitacao', 'licitacoes', 'lei no 14.133', 'dispensa e inexigibilidade', 'pregao', 'registro de precos'],
    html: `
<h3>Para que serve</h3>
<p>A licitação garante <b>isonomia</b> e a proposta <b>mais vantajosa</b>, evitando sobrepreço e incentivando a inovação e o desenvolvimento sustentável (art. 11). É obrigatória para a Administração direta, autárquica e fundacional (CF, art. 37, XXI). As estatais seguem a Lei 13.303/2016.</p>
<h3>Modalidades (art. 28)</h3>
${cartoes([['🛒', 'Pregão', 'bens e serviços <b>comuns</b> (inclusive serviços comuns de engenharia) · menor preço ou maior desconto', COR.verde], ['🏗', 'Concorrência', 'bens e serviços especiais, obras e serviços de engenharia', COR.azul], ['🏆', 'Concurso', 'trabalho técnico, científico ou artístico · prêmio ou remuneração', COR.roxo], ['🔨', 'Leilão', 'alienação de bens imóveis ou móveis inservíveis ou apreendidos · maior lance', COR.lar], ['💬', 'Diálogo competitivo', 'objetos inovadores ou complexos; a Administração dialoga com licitantes previamente selecionados', COR.verm]])}
<p><b>Tomada de preços e convite deixaram de existir.</b> É vedado criar outras modalidades ou combinar as existentes.</p>
<h3>Critérios de julgamento (art. 33)</h3>
<p>Menor preço · maior desconto · melhor técnica ou conteúdo artístico · técnica e preço · maior lance (leilão) · maior retorno econômico.</p>
<h3>Fases (art. 17)</h3>
${passos([['Preparatória', 'estudo técnico preliminar, termo de referência, orçamento'], ['Divulgação do edital', 'no Portal Nacional de Contratações Públicas (PNCP)'], ['Apresentação de propostas e lances', ''], ['Julgamento', ''], ['Habilitação', 'em regra, <b>depois</b> do julgamento; pode ser antecipada, motivadamente'], ['Recursal', 'fase única'], ['Homologação', '']])}
<h3>Contratação direta</h3>
<table class="tab"><tr><th></th><th>Inexigibilidade (art. 74)</th><th>Dispensa (art. 75)</th></tr>
<tr><td>Ideia</td><td>a competição é <b>inviável</b></td><td>a competição seria possível, mas a lei <b>dispensa</b></td></tr>
<tr><td>Rol</td><td><b>exemplificativo</b></td><td><b>taxativo</b></td></tr>
<tr><td>Exemplos</td><td>fornecedor exclusivo; artista consagrado; serviço técnico especializado de natureza intelectual com notória especialização; credenciamento; imóvel cujas características tornem necessária a escolha</td><td>pequeno valor (obras e serviços de engenharia e manutenção de veículos; outros serviços e compras, com valores atualizados por decreto); licitação deserta ou fracassada; emergência ou calamidade (até 1 ano, sem prorrogação)</td></tr></table>
<p>Há ainda a <b>licitação dispensada</b> (art. 76): alienações em que a própria lei afasta a licitação (ex.: doação a outro órgão público).</p>
${box('Instrumentos auxiliares (art. 78)', '<p>Credenciamento · pré-qualificação · procedimento de manifestação de interesse · <b>sistema de registro de preços</b> (ata com preços registrados para contratações futuras, sem obrigação de contratar) · registro cadastral.</p>')}
${ex('<p>A prefeitura quer contratar um show de um cantor famoso para a festa da cidade: <b>inexigibilidade</b> (artista consagrado pela crítica ou pelo público). Se ela comprar papel A4 abaixo do limite de valor: <b>dispensa</b>. Se fizer pregão e ninguém aparecer, pode contratar diretamente nas mesmas condições: dispensa por licitação <b>deserta</b>.</p>', 'Casos práticos')}
${dica('Inexigibilidade = “<b>I</b>nviável”. Dispensa = “<b>D</b>á para licitar, mas a lei <b>D</b>ispensa”.')}
${peg('Na Lei 14.133, a regra é <b>julgar primeiro e habilitar depois</b>. Na antiga Lei 8.666, era o contrário.')}`,
    quiz: [C('A Lei 14.133/2021 extinguiu as modalidades tomada de preços e convite.', 'As modalidades atuais são pregão, concorrência, concurso, leilão e diálogo competitivo.'), E('O rol de hipóteses de inexigibilidade de licitação é taxativo.', 'Inexigibilidade decorre da inviabilidade de competição; o rol é exemplificativo. O de dispensa é taxativo.'), C('O pregão é a modalidade obrigatória para aquisição de bens e serviços comuns.', 'Art. 6º, XLI, e art. 29 da Lei 14.133/2021.')],
  },
  {
    id: 'contratos', titulo: 'Contratos administrativos e convênios', arts: 'Lei 14.133/2021, arts. 89 a 184',
    chaves: ['contratos administrativos', 'contrato administrativo', 'convenios', 'inexecucao e rescisao', 'penalidades administrativas', 'clausulas exorbitantes', 'alteracoes contratuais', 'equilibrio economico'],
    html: `
<h3>Características</h3>
<p>Contrato administrativo é o ajuste em que a Administração participa com <b>supremacia</b>, por meio das <b>cláusulas exorbitantes</b>, para atender ao interesse público. É formal, consensual, oneroso, comutativo, de adesão e <b>intuitu personae</b> (subcontratação só nos limites autorizados).</p>
<h3>Cláusulas exorbitantes (art. 104)</h3>
${cartoes([['✏️', 'Alterar unilateralmente', 'para adequar ao interesse público, respeitando o equilíbrio econômico', COR.azul], ['✂️', 'Extinguir unilateralmente', 'nos casos da lei', COR.verm], ['🔍', 'Fiscalizar a execução', '', COR.verde], ['⚖️', 'Aplicar sanções', '', COR.lar], ['🏗', 'Ocupar provisoriamente', 'bens e pessoal do contratado, em serviços essenciais', COR.roxo]])}
<ul><li><b>Limites de alteração unilateral</b> (art. 125): acréscimos ou supressões de até <b>25%</b> do valor inicial; em <b>reforma</b> de edifício ou equipamento, acréscimos de até <b>50%</b>.</li><li>O contratado tem direito ao <b>equilíbrio econômico-financeiro</b>: reajuste (inflação), repactuação (serviços contínuos com mão de obra) e revisão (fatos imprevisíveis).</li><li><b>Duração</b>: serviços e fornecimentos contínuos até <b>5 anos</b>, prorrogáveis até <b>10 anos</b> (arts. 106 e 107).</li><li><b>Garantia</b>: até <b>5%</b> do valor, podendo chegar a 10% em contratos de grande vulto ou complexidade (art. 98).</li></ul>
<h3>Teoria da imprevisão e fatos que desequilibram o contrato</h3>
<ul><li><b>Fato do príncipe</b>: medida geral do Estado que onera o contrato (ex.: aumento de tributo).</li><li><b>Fato da Administração</b>: ação ou omissão específica da Administração contratante (ex.: não liberar a área da obra).</li><li><b>Caso fortuito e força maior</b>; <b>interferências imprevistas</b> (ex.: rocha no subsolo não prevista).</li></ul>
<h3>Exceção do contrato não cumprido</h3>
<p>O contratado pode pedir a extinção do contrato ou suspender a execução se a Administração atrasar pagamentos por mais de <b>2 meses</b>, ou suspender a execução por mais de 3 meses (art. 137, §2º).</p>
<h3>Sanções (art. 156)</h3>
<table class="tab"><tr><th>Sanção</th><th>Alcance</th></tr>
<tr><td><b>Advertência</b></td><td>falta leve</td></tr><tr><td><b>Multa</b></td><td>de 0,5% a 30% do valor do contrato</td></tr>
<tr><td><b>Impedimento de licitar e contratar</b></td><td>até <b>3 anos</b>, no âmbito do <b>ente</b> que aplicou</td></tr>
<tr><td><b>Declaração de inidoneidade</b></td><td>de <b>3 a 6 anos</b>, em <b>todos os entes</b></td></tr></table>
${box('Convênios e parcerias', '<p>No <b>convênio</b>, os interesses são <b>comuns</b> (cooperação), e não opostos como no contrato. Há também acordos de cooperação técnica, protocolos de intenções, termos de execução descentralizada (entre órgãos federais) e contratos de repasse (com intermediação de instituição financeira oficial, como a Caixa).</p>')}
${dica('Limites de alteração: “<b>25</b> em geral, <b>50</b> só para acréscimo em reforma”.')}
${peg('O impedimento vale só no ente que aplicou (ex.: só na União). A <b>inidoneidade</b> vale para <b>todos</b> os entes da Federação.')}`,
    quiz: [C('Na Lei 14.133/2021, a declaração de inidoneidade impede o responsável de licitar e contratar no âmbito da Administração de todos os entes federativos, por 3 a 6 anos.', 'Art. 156, §5º.'), E('A Administração pode, unilateralmente, acrescer em até 50% o valor de qualquer contrato de serviço.', 'O limite geral é de 25%; os 50% valem para acréscimos em reforma de edifício ou equipamento.'), C('O fato do príncipe é medida geral do Estado que, indiretamente, onera a execução do contrato administrativo.', 'Ex.: aumento de tributo.')] ,
  },
  {
    id: 'servicos-publicos', titulo: 'Serviços públicos, concessões, permissões e PPPs', arts: 'CF, art. 175 · Leis 8.987/1995 e 11.079/2004',
    chaves: ['servico publico', 'servicos publicos', 'concessao de servico publico', 'permissao e autorizacao', 'parcerias publico-privadas', 'usuario do servico publico', 'concessao e permissao', 'concessao', 'ppp'],
    html: `
<h3>Conceito e princípios</h3>
<p>Serviço público é a atividade prestada pelo Estado, ou por quem lhe faz as vezes, para satisfazer necessidades coletivas, sob regime de direito público. Incumbe ao Poder Público, diretamente ou sob <b>concessão ou permissão</b>, sempre por <b>licitação</b> (CF, art. 175).</p>
<p><b>Serviço adequado</b> (Lei 8.987, art. 6º, §1º): regularidade, continuidade, eficiência, segurança, atualidade, generalidade, cortesia e <b>modicidade das tarifas</b>.</p>
${box('Interrupção que não é descontinuidade (art. 6º, §3º)', '<ul><li>Em situação de <b>emergência</b>.</li><li>Após <b>aviso prévio</b>, por razões técnicas ou de segurança, ou por <b>inadimplemento do usuário</b>, considerado o interesse da coletividade.</li></ul>')}
<h3>Concessão x permissão</h3>
<table class="tab"><tr><th></th><th>Concessão</th><th>Permissão</th></tr>
<tr><td>Licitação</td><td>concorrência ou diálogo competitivo</td><td>qualquer modalidade cabível</td></tr>
<tr><td>Delegatário</td><td>pessoa jurídica ou consórcio de empresas</td><td>pessoa física ou jurídica</td></tr>
<tr><td>Instrumento</td><td>contrato</td><td>contrato de adesão, com <b>precariedade</b> e revogabilidade</td></tr></table>
<p>A <b>autorização</b> de serviço público é ato unilateral, discricionário e precário, para situações emergenciais ou de interesse restrito.</p>
<h3>Extinção da concessão (art. 35)</h3>
${cartoes([['⏰', 'Advento do termo', 'fim do prazo', COR.cinza], ['🏛', 'Encampação', 'retomada por <b>interesse público</b>, com <b>lei autorizativa</b> e indenização <b>prévia</b>', COR.azul], ['⚠️', 'Caducidade', 'por <b>inadimplemento da concessionária</b>, após processo administrativo', COR.verm], ['⚖️', 'Rescisão', 'iniciativa da <b>concessionária</b>, por descumprimento do poder concedente, só por <b>via judicial</b>', COR.lar], ['❌', 'Anulação', 'ilegalidade', COR.roxo], ['📉', 'Falência', 'ou extinção da empresa', COR.cinza]])}
<p>Extinta a concessão, há a <b>reversão</b> ao poder concedente dos bens vinculados ao serviço, com indenização das parcelas não amortizadas.</p>
<h3>Parcerias Público-Privadas (Lei 11.079/2004)</h3>
<ul><li><b>Patrocinada</b>: tarifa do usuário + contraprestação pecuniária do parceiro público.</li><li><b>Administrativa</b>: a Administração é a usuária, direta ou indireta (ex.: presídio, hospital).</li><li>Prazo de <b>5 a 35 anos</b>; valor mínimo de <b>R$ 10 milhões</b>; obrigatória a constituição de <b>sociedade de propósito específico</b>; vedada PPP que tenha como objeto único o fornecimento de mão de obra ou de equipamentos, ou só a execução de obra.</li></ul>
${ex('<p>Uma rodovia federal é entregue a uma empresa que cobra pedágio: <b>concessão comum</b>. Se a cobrança não cobrir os custos e o governo complementar com pagamentos mensais: <b>PPP patrocinada</b>. Se o governo pagar uma empresa para construir e operar um presídio: <b>PPP administrativa</b>.</p>', 'Casos práticos')}
${dica('Encampação = “<b>E</b>stado quer” (interesse público). Caducidade = “<b>C</b>oncessionária falhou”. Rescisão = “<b>R</b>eclamação da concessionária, no juiz”.')}
${peg('A concessionária <b>não pode interromper</b> o serviço por inadimplência do poder concedente sem decisão judicial: ela pede a <b>rescisão judicial</b>, e o serviço continua até o trânsito em julgado (art. 39).')}`,
    quiz: [C('A encampação é a retomada do serviço pelo poder concedente, durante o prazo da concessão, por motivo de interesse público, mediante lei autorizativa e prévia indenização.', 'Art. 37 da Lei 8.987/1995.'), E('A caducidade da concessão decorre de interesse público superveniente, independentemente de falha da concessionária.', 'Caducidade é por inadimplemento da concessionária; por interesse público é encampação.'), C('Não caracteriza descontinuidade do serviço a interrupção por inadimplemento do usuário, após aviso prévio.', 'Art. 6º, §3º, II, da Lei 8.987/1995.')],
  },
  {
    id: 'bens-intervencao', titulo: 'Bens públicos e intervenção do Estado na propriedade', arts: 'CC, arts. 98 a 103 · CF, arts. 5º, 182, 184 e 243 · DL 3.365/1941',
    chaves: ['bens publicos', 'desapropriacao', 'tombamento', 'servidoes administrativas', 'requisicao', 'ocupacao temporaria', 'limitacoes administrativas', 'intervencao do estado na propriedade'],
    html: `
<h3>Bens públicos (Código Civil, art. 99)</h3>
${cartoes([['🌳', 'Uso comum do povo', 'rios, mares, estradas, ruas, praças', COR.verde], ['🏢', 'Uso especial', 'afetados a serviço: prédio de repartição, viatura, escola', COR.azul], ['📦', 'Dominicais', 'patrimônio disponível, sem destinação pública: terras devolutas, imóvel desocupado', COR.lar]])}
<ul><li><b>Inalienabilidade</b> relativa: bens de uso comum e especial não podem ser alienados enquanto <b>afetados</b>; os <b>dominicais</b> podem, observada a lei (autorização legislativa para imóveis, avaliação e licitação).</li><li><b>Impenhorabilidade</b>: o pagamento de dívidas judiciais do Estado segue o regime de <b>precatórios</b> (CF, art. 100).</li><li><b>Imprescritibilidade</b>: bens públicos <b>não</b> se adquirem por <b>usucapião</b> (CF, arts. 183, §3º, e 191, parágrafo único; Súmula 340 do STF).</li><li><b>Afetação</b> é dar destinação pública; <b>desafetação</b> é retirá-la.</li></ul>
<p><b>Uso privativo</b> por particular: <b>autorização</b> (precária, interesse do particular, ex.: fechar a rua para uma festa), <b>permissão</b> (precária, interesse público e particular, ex.: banca de jornal) e <b>concessão</b> (contrato, estável, ex.: restaurante em aeroporto).</p>
<h3>Intervenção restritiva x supressiva</h3>
<table class="tab"><tr><th>Instituto</th><th>O que é</th><th>Indenização</th></tr>
<tr><td><b>Limitação administrativa</b></td><td>restrição <b>geral</b> e abstrata (recuo de construção, gabarito)</td><td>em regra, <b>não</b></td></tr>
<tr><td><b>Servidão administrativa</b></td><td>direito <b>real</b> sobre imóvel específico para serviço público (passagem de linhas de energia)</td><td>se houver dano</td></tr>
<tr><td><b>Requisição</b></td><td>uso de bens ou serviços em <b>iminente perigo público</b> (CF, art. 5º, XXV)</td><td><b>ulterior</b>, se houver dano</td></tr>
<tr><td><b>Ocupação temporária</b></td><td>uso transitório de imóvel (ex.: depósito de material de obra pública vizinha)</td><td>se houver dano</td></tr>
<tr><td><b>Tombamento</b></td><td>proteção do patrimônio <b>histórico, artístico e cultural</b></td><td>em regra, não</td></tr>
<tr><td><b>Desapropriação</b></td><td>transferência <b>compulsória</b> da propriedade</td><td><b>prévia, justa e em dinheiro</b> (regra)</td></tr></table>
<h3>Desapropriação em detalhe</h3>
<ul><li><b>Utilidade ou necessidade pública</b> (DL 3.365/1941) e <b>interesse social</b> (Lei 4.132/1962). Caducidade do decreto: <b>5 anos</b> (utilidade pública) e <b>2 anos</b> (interesse social).</li><li><b>Sancionatória urbana</b> (art. 182, §4º, III): imóvel não edificado ou subutilizado, paga em <b>títulos da dívida pública</b>; competência do <b>Município</b>.</li><li><b>Sancionatória rural</b> para reforma agrária (art. 184): imóvel improdutivo, paga em <b>títulos da dívida agrária</b>; benfeitorias úteis e necessárias em dinheiro; competência da <b>União</b>.</li><li><b>Confisco</b> (art. 243): glebas com <b>culturas ilegais de psicotrópicos</b> ou exploração de <b>trabalho escravo</b>, sem indenização.</li><li><b>Desapropriação indireta</b>: o Estado se apossa sem o devido processo; o proprietário pede indenização. <b>Retrocessão</b>: o bem não recebe a destinação pública, e o ex-proprietário pode reavê-lo ou pedir perdas e danos. <b>Direito de extensão</b>: exigir que a desapropriação inclua a parte remanescente inaproveitável.</li><li>Na ação de desapropriação, o juiz só discute <b>vício processual ou o preço</b>; outras questões vão para ação própria (DL 3.365, art. 20).</li></ul>
${juris('<ul><li><b>Súmula 340 do STF</b>: os bens dominicais, como os demais bens públicos, não podem ser adquiridos por usucapião.</li><li><b>STJ (Tema 1.019)</b>: a ação de desapropriação indireta prescreve, em regra, em <b>10 anos</b>.</li></ul>')}
${dica('Requisição = “<b>R</b>isco iminente, paga <b>R</b>etroativamente (depois)”. Desapropriação comum = “<b>P</b>révia, <b>J</b>usta, em <b>D</b>inheiro”.')}
${peg('Bens <b>dominicais</b> também não sofrem <b>usucapião</b>, apesar de poderem ser alienados.')}`,
    quiz: [C('A requisição administrativa pode ser utilizada em caso de iminente perigo público, assegurada ao proprietário indenização ulterior, se houver dano.', 'CF, art. 5º, XXV.'), E('Os bens públicos dominicais podem ser adquiridos por usucapião, já que não estão afetados a uma finalidade pública.', 'Nenhum bem público é usucapível (Súmula 340 do STF).'), C('A desapropriação de imóvel rural para reforma agrária é de competência da União e indenizada em títulos da dívida agrária.', 'CF, art. 184.')],
  },
  {
    id: 'responsabilidade', titulo: 'Responsabilidade civil do Estado', arts: 'CF, art. 37, §6º',
    chaves: ['responsabilidade civil do estado', 'responsabilidade patrimonial do estado', 'responsabilidade civil e regime'],
    html: `
<h3>A regra constitucional</h3>
<p>“As pessoas jurídicas de direito público e as de direito privado <b>prestadoras de serviços públicos</b> responderão pelos danos que seus <b>agentes</b>, nessa qualidade, causarem a terceiros, assegurado o direito de <b>regresso</b> contra o responsável nos casos de <b>dolo ou culpa</b>” (art. 37, §6º).</p>
${passos([['Conduta de agente público', 'agindo nessa qualidade'], ['Dano', 'material ou moral'], ['Nexo causal', 'entre a conduta e o dano'], ['Sem culpa', 'a vítima não precisa provar culpa: responsabilidade objetiva']])}
<h3>Evolução das teorias</h3>
${cartoes([['👑', 'Irresponsabilidade', '“o rei não erra” (superada)', COR.cinza], ['🧾', 'Civilista / culpa', 'exige culpa do agente', COR.lar], ['🕳', 'Culpa administrativa (faute du service)', 'o serviço não funcionou, funcionou mal ou atrasou', COR.azul], ['⚖️', 'Risco administrativo', '<b>adotada como regra</b>: objetiva, mas admite excludentes', COR.verde], ['☢️', 'Risco integral', 'não admite excludentes: dano nuclear, dano ambiental, atentados terroristas em aeronaves', COR.verm]])}
<h3>Excludentes e atenuantes</h3>
<ul><li><b>Culpa exclusiva da vítima</b>, <b>caso fortuito ou força maior</b> e <b>fato exclusivo de terceiro</b> rompem o nexo causal.</li><li><b>Culpa concorrente</b> da vítima <b>atenua</b> (reduz) a indenização.</li></ul>
<h3>Omissão do Estado</h3>
<p>A doutrina tradicional aplica a responsabilidade <b>subjetiva</b> (culpa do serviço) nas omissões genéricas. O STF tem aplicado a responsabilidade <b>objetiva</b> quando há <b>dever específico</b> de agir e o Estado se omite (ex.: morte de detento).</p>
${juris('<ul><li><b>STF (Tema 940)</b>: a ação deve ser proposta contra o <b>Estado</b> (ou a prestadora), e não diretamente contra o agente (<b>dupla garantia</b>). O Estado depois cobra do agente em regresso, se houver dolo ou culpa.</li><li><b>STF (Tema 130)</b>: a prestadora de serviço público responde objetivamente também perante <b>não usuários</b> (ex.: pedestre atropelado por ônibus da concessionária).</li><li><b>STF (Tema 592)</b>: o Estado responde pela morte de detento quando descumpre o dever de proteção (art. 5º, XLIX).</li><li><b>STF (Tema 365)</b>: o Estado deve indenizar, inclusive por danos morais, o preso mantido em condições degradantes.</li><li>Prescrição da ação contra a Fazenda: <b>5 anos</b> (Decreto 20.910/1932).</li></ul>')}
${ex('<p>Uma viatura da PRF, em perseguição, colide com o carro de um cidadão que estava parado no semáforo. A União responde <b>objetivamente</b>: o cidadão prova a conduta, o dano e o nexo. Se o policial dirigia de forma imprudente, a União pode cobrar dele em <b>ação regressiva</b>. Se o cidadão é que avançou o sinal e bateu na viatura, há <b>culpa exclusiva da vítima</b>.</p>', 'Caso prático')}
${peg('Atos <b>legislativos</b> e <b>judiciais</b>, em regra, não geram responsabilidade do Estado. Exceções: lei de efeitos concretos, lei declarada inconstitucional e <b>erro judiciário</b> ou prisão além do tempo (CF, art. 5º, LXXV).')}`,
    quiz: [C('O Brasil adota, como regra, a teoria do risco administrativo, que admite excludentes como a culpa exclusiva da vítima.', 'Responsabilidade objetiva com excludentes.'), E('Segundo o STF, a vítima pode escolher propor a ação de indenização diretamente contra o agente público causador do dano.', 'Tema 940: a ação é contra o Estado, que tem direito de regresso.'), C('As concessionárias de serviço público respondem objetivamente pelos danos causados a terceiros não usuários do serviço.', 'Tema 130 do STF.')],
  },
  {
    id: 'controle', titulo: 'Controle da Administração Pública e Tribunais de Contas', arts: 'CF, arts. 70 a 75',
    chaves: ['controle da administracao', 'controle interno e externo', 'tribunais de contas', 'controle jurisdicional', 'controle da atividade financeira'],
    html: `
<h3>Classificações</h3>
<ul><li>Quanto ao órgão: <b>administrativo</b> (autotutela), <b>legislativo</b> (com auxílio do Tribunal de Contas) e <b>judicial</b>.</li><li>Quanto à posição: <b>interno</b> (dentro do mesmo Poder, ex.: CGU) e <b>externo</b> (outro Poder, ex.: Congresso com o TCU).</li><li>Quanto ao momento: <b>prévio</b>, <b>concomitante</b> e <b>posterior</b>.</li><li>Quanto ao aspecto: de <b>legalidade</b> (todos os controles) e de <b>mérito</b> (só a própria Administração).</li></ul>
${box('Sistema de jurisdição una', '<p>O Brasil adota o <b>sistema inglês</b> (jurisdição una): só o Judiciário decide com definitividade (art. 5º, XXXV). Não há contencioso administrativo com coisa julgada, como no modelo francês. Em regra, não é preciso esgotar a via administrativa para ir ao Judiciário (exceções: justiça desportiva, habeas data e algumas hipóteses previdenciárias).</p>')}
<h3>Tribunal de Contas da União (art. 71)</h3>
${cartoes([['📊', 'Aprecia', 'as contas anuais do <b>Presidente</b> (parecer prévio; quem julga é o Congresso)', COR.azul], ['⚖️', 'Julga', 'as contas dos demais administradores e responsáveis por dinheiro público', COR.verm], ['👥', 'Aprecia a legalidade', 'de admissões (exceto cargos em comissão) e de aposentadorias, reformas e pensões', COR.verde], ['🛑', 'Susta', 'atos ilegais não corrigidos; nos contratos, a sustação é do Congresso', COR.lar]])}
<p>As decisões que imputam débito ou multa têm eficácia de <b>título executivo</b>. Os Tribunais de Contas dos Estados seguem o modelo federal; há TCMs em São Paulo e no Rio de Janeiro, e é <b>vedada</b> a criação de novos tribunais de contas municipais (art. 31, §4º).</p>
${juris('<ul><li><b>Súmula Vinculante 3</b>: nos processos perante o TCU, asseguram-se contraditório e ampla defesa quando a decisão puder resultar em anulação ou revogação de ato que beneficie o interessado, <b>exceto</b> na apreciação inicial de aposentadoria, reforma e pensão.</li><li><b>STF (Tema 445)</b>: o TCU tem <b>5 anos</b>, contados da chegada do processo, para julgar a legalidade da concessão inicial de aposentadoria; depois disso, o ato se considera registrado.</li><li><b>Súmula 347 do STF</b> (com a releitura atual): o TCU não faz controle abstrato de constitucionalidade, mas pode afastar a aplicação de norma em casos concretos já pacificados pelo STF.</li><li><b>STF (RE 848.826 e RE 729.744)</b>: o julgamento das contas do prefeito é da <b>Câmara Municipal</b>; o parecer do Tribunal de Contas é opinativo e só deixa de prevalecer pelo voto de 2/3 dos vereadores (CF, art. 31, §2º), não havendo julgamento ficto por decurso de prazo.</li></ul>')}
${peg('O TCU <b>julga</b> as contas dos administradores em geral, mas só <b>aprecia</b> (dá parecer) as contas do Presidente. Quem julga as contas do Presidente é o <b>Congresso</b>.')}`,
    quiz: [C('O Brasil adota o sistema de jurisdição una, em que só o Poder Judiciário decide com força de coisa julgada.', 'CF, art. 5º, XXXV.'), E('O TCU julga as contas anuais prestadas pelo Presidente da República.', 'O TCU emite parecer prévio; o julgamento é do Congresso Nacional.'), C('As decisões do Tribunal de Contas de que resulte imputação de débito ou multa terão eficácia de título executivo.', 'CF, art. 71, §3º.')],
  },
  {
    id: 'improbidade', titulo: 'Improbidade administrativa e Lei Anticorrupção', arts: 'Lei 8.429/1992 (com a Lei 14.230/2021) · Lei 12.846/2013',
    chaves: ['improbidade administrativa', 'improbidade', 'responsabilizacao administrativa e civil de pessoas juridicas', 'lei anticorrupcao', '12.846'],
    html: `
<h3>Depois da Lei 14.230/2021</h3>
<p>A improbidade passou a exigir <b>dolo</b>: a vontade livre e consciente de alcançar o resultado ilícito. <b>Não existe mais improbidade culposa</b>, e o mero exercício da função ou a divergência interpretativa não configuram improbidade.</p>
<table class="tab"><tr><th>Espécie</th><th>Exemplo</th><th>Sanções principais</th></tr>
<tr><td><b>Enriquecimento ilícito</b> (art. 9º)</td><td>receber propina; usar bem público em proveito próprio</td><td>perda dos bens acrescidos, perda da função, suspensão dos direitos políticos até <b>14 anos</b>, multa de até o valor do acréscimo, proibição de contratar até 14 anos</td></tr>
<tr><td><b>Lesão ao erário</b> (art. 10)</td><td>superfaturamento; dispensa indevida de licitação com perda patrimonial efetiva</td><td>ressarcimento, perda da função, suspensão dos direitos políticos até <b>12 anos</b>, multa de até o valor do dano, proibição de contratar até 12 anos</td></tr>
<tr><td><b>Atentado aos princípios</b> (art. 11)</td><td>revelar segredo funcional; frustrar concurso; nepotismo</td><td>multa de até 24 vezes a remuneração e proibição de contratar até 4 anos (<b>sem</b> suspensão de direitos políticos nem perda da função)</td></tr></table>
<p>O rol do <b>art. 11</b> passou a ser <b>taxativo</b>.</p>
<h3>Processo</h3>
<ul><li><b>Legitimidade</b>: Ministério Público e, conforme o STF, também a <b>pessoa jurídica lesada</b> (ADIs 7042 e 7043).</li><li><b>Prescrição</b>: <b>8 anos</b>, contados do fato (ou do dia em que cessou a permanência), com prescrição intercorrente de 4 anos.</li><li>É possível o <b>acordo de não persecução civil</b>.</li><li>A perda da função e a suspensão dos direitos políticos só se efetivam com o <b>trânsito em julgado</b>.</li></ul>
${juris('<ul><li><b>STF (Tema 1.199)</b>: exige-se <b>dolo</b> para todas as espécies; a revogação da modalidade culposa <b>não retroage</b> para atingir condenações transitadas em julgado, mas se aplica aos processos sem condenação definitiva; o novo regime de prescrição <b>não retroage</b>.</li><li><b>STF (Tema 897)</b>: é <b>imprescritível</b> a ação de ressarcimento ao erário fundada em ato <b>doloso</b> de improbidade.</li></ul>')}
<h3>Lei Anticorrupção (Lei 12.846/2013)</h3>
<ul><li>Responsabiliza <b>pessoas jurídicas</b> de forma <b>objetiva</b>, nas esferas administrativa e civil, por atos lesivos à Administração nacional ou estrangeira (ex.: pagar propina, fraudar licitação).</li><li>Sanção administrativa: <b>multa</b> de 0,1% a 20% do faturamento bruto e <b>publicação extraordinária</b> da decisão.</li><li><b>Acordo de leniência</b>: a empresa colabora, identifica envolvidos e pode ter a multa reduzida em até 2/3.</li></ul>
${dica('Suspensão dos direitos políticos: “<b>14</b> para quem enriquece, <b>12</b> para quem lesa, <b>nenhuma</b> para quem só fere princípios”.')}
${peg('Depois da Lei 14.230, <b>não há improbidade culposa</b>. O agente que causa prejuízo por descuido pode responder em outras esferas, mas não por improbidade.')}`,
    quiz: [C('Após a Lei 14.230/2021, a configuração de ato de improbidade administrativa exige a presença de dolo.', 'Não há mais modalidade culposa.'), E('A prática de ato de improbidade que atenta contra os princípios da Administração sujeita o agente à suspensão dos direitos políticos.', 'Para o art. 11, as sanções são multa e proibição de contratar.'), C('A Lei 12.846/2013 prevê a responsabilização objetiva das pessoas jurídicas pela prática de atos lesivos à Administração Pública.', 'Art. 2º da Lei Anticorrupção.')],
  },
  {
    id: 'processo-adm', titulo: 'Processo administrativo (Lei 9.784/1999), acesso à informação e LGPD', arts: 'Leis 9.784/1999, 12.527/2011 e 13.709/2018',
    chaves: ['processo administrativo', '9.784', 'procedimento administrativo', 'recurso hierarquico', 'pedido de reconsideracao', 'prescricao administrativa', 'acesso a informacao', 'lei geral de protecao de dados', '12.527', 'transparencia'],
    html: `
<h3>Lei 9.784/1999: o essencial</h3>
<ul><li>Aplica-se à Administração federal e, por analogia, a Estados e Municípios sem lei própria (Súmula 633 do STJ).</li><li><b>Legitimados</b>: titulares de direitos e interesses, terceiros afetados, organizações e associações (art. 9º). <b>Capazes</b>: maiores de 18 anos, salvo previsão especial.</li><li><b>Impedimento</b> (art. 18) e <b>suspeição</b> (art. 20) de servidores e autoridades.</li><li>Atos devem ser motivados quando neguem, limitem ou afetem direitos, imponham sanções, dispensem licitação, decidam recursos, entre outros (art. 50).</li></ul>
<h3>Prazos que mais caem</h3>
<table class="tab"><tr><th>Ato</th><th>Prazo</th></tr>
<tr><td>Atos em geral, sem prazo específico</td><td><b>5 dias</b>, prorrogável até o dobro (art. 24)</td></tr>
<tr><td>Intimação para comparecimento</td><td>antecedência mínima de <b>3 dias úteis</b> (art. 26, §2º)</td></tr>
<tr><td>Decisão após a instrução</td><td>até <b>30 dias</b>, prorrogável por mais 30 (art. 49)</td></tr>
<tr><td>Interposição do recurso</td><td><b>10 dias</b> (art. 59)</td></tr>
<tr><td>Reconsideração pela autoridade que decidiu</td><td><b>5 dias</b>; se não reconsiderar, encaminha ao superior (art. 56, §1º)</td></tr>
<tr><td>Decisão do recurso</td><td><b>30 dias</b>, prorrogável por mais 30 (art. 59, §1º)</td></tr>
<tr><td>Anular atos favoráveis</td><td><b>5 anos</b>, salvo má-fé (art. 54)</td></tr></table>
${box('Recurso administrativo', '<ul><li>Tramita por no máximo <b>3 instâncias</b> (art. 57).</li><li>Em regra <b>não tem efeito suspensivo</b> (art. 61).</li><li><b>Reformatio in pejus</b> é possível no <b>recurso</b>, com ciência prévia do recorrente (art. 64). Na <b>revisão</b> (fatos novos), a sanção <b>não</b> pode ser agravada (art. 65).</li><li><b>Recurso hierárquico próprio</b>: ao superior no mesmo órgão. <b>Impróprio</b>: a outro órgão ou entidade, sem hierarquia, só se a lei previr.</li></ul>')}
${juris('<ul><li><b>SV 21</b>: é inconstitucional exigir depósito ou arrolamento prévio de dinheiro ou bens para admitir recurso administrativo.</li><li><b>SV 5</b>: a falta de defesa técnica por advogado no processo disciplinar não ofende a Constituição.</li><li><b>Súmula 633 do STJ</b>: a Lei 9.784 pode ser aplicada de forma subsidiária a Estados e Municípios sem norma própria.</li></ul>')}
<h3>Lei de Acesso à Informação (Lei 12.527/2011)</h3>
<ul><li>A <b>publicidade</b> é a regra e o sigilo, a exceção. O pedido <b>não precisa ser motivado</b>.</li><li>Resposta imediata ou em até <b>20 dias</b>, prorrogáveis por mais <b>10</b>, com justificativa.</li><li>Classificação de sigilo: <b>ultrassecreta</b> (25 anos, prorrogável uma vez), <b>secreta</b> (15 anos) e <b>reservada</b> (5 anos).</li><li><b>Transparência ativa</b>: divulgar informações de interesse geral na internet, independentemente de pedido.</li></ul>
<h3>LGPD (Lei 13.709/2018) no setor público</h3>
<p>O Poder Público trata dados pessoais para executar políticas públicas e cumprir atribuições legais, sem precisar de consentimento nesses casos, observados os princípios de <b>finalidade, necessidade e transparência</b>. A fiscalização é da <b>ANPD</b>.</p>
${dica('Lei 9.784: “<b>10</b> para recorrer, <b>5</b> para reconsiderar, <b>30</b> para decidir, <b>3</b> instâncias”. LAI: “<b>20 + 10</b>” e sigilo “<b>25 / 15 / 5</b>”.')}
${peg('No recurso cabe <b>agravar</b> a situação do recorrente (com aviso prévio). Na <b>revisão</b>, nunca.')}`,
    quiz: [C('Salvo disposição legal específica, o prazo para interposição de recurso administrativo na Lei 9.784/1999 é de 10 dias.', 'Art. 59.'), E('Na revisão do processo administrativo, a sanção pode ser agravada se surgirem fatos novos.', 'Art. 65, parágrafo único: da revisão não pode resultar agravamento.'), C('Segundo a Lei de Acesso à Informação, o prazo máximo de restrição de acesso para informação classificada como reservada é de 5 anos.', 'Art. 24, §1º, III.')],
  },
];
