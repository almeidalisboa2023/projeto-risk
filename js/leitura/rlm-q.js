// Raciocínio Lógico — banco de questões. As questões numéricas são geradas com cálculo exato
// (sorteio fixo, sempre as mesmas questões), e as conceituais foram escritas à mão.
// Cada questão traz o gabarito comentado: x (por quê), pg (pegadinha) e n (comentário de cada alternativa).
import { C as C0, E as E0, M as M0 } from './blocos.js';

const C = (p, e, x, pg) => ({ ...C0(p, e), ...(x ? { x, pg: pg || '' } : {}) });
const E = (p, e, x, pg) => ({ ...E0(p, e), ...(x ? { x, pg: pg || '' } : {}) });
const M = (p, alts, r, e, x, n, pg) => ({ ...M0(p, alts, r, e), ...(x ? { x, pg: pg || '', n: n || null } : {}) });
const OK = 'Correta.';

// ---------- utilitários ----------
let semente = 20261104;
const rnd = () => { semente = (semente * 1103515245 + 12345) % 2147483648; return semente / 2147483648; };
const int = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
const fmt = (n) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100).replace('.', ','));
const real = (n) => 'R$ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const CONTA = 'Não corresponde ao resultado da conta.';
// múltipla escolha com 5 alternativas distintas; a correta em posição sorteada.
// distr: valores ou pares [valor, motivo do erro]; x: explicação passo a passo.
function me(p, certo, distr, e, f = fmt, x = '', pg = '') {
  const ops = [[certo, OK]];
  for (const d of distr) { const [v, m] = Array.isArray(d) ? d : [d, CONTA]; if (!ops.some((o) => f(o[0]) === f(v)) && ops.length < 5) ops.push([v, m]); }
  let k = 1; while (ops.length < 5) { const d = certo + k * (k % 2 ? 1 : -1) * Math.max(1, Math.abs(Math.round(certo / 10))); if (!ops.some((o) => f(o[0]) === f(d))) ops.push([d, CONTA]); k++; }
  const pos = int(0, 4); const outros = ops.slice(1); outros.splice(pos, 0, ops[0]);
  return M(p, outros.map((o) => f(o[0])), pos, e, x || e, outros.map((o) => o[1]), pg);
}
// certo/errado: metade com valor verdadeiro, metade com valor alterado
function ce(p, certo, errado, e, f = fmt, x = '', pg = '') {
  const xx = x || e;
  return rnd() < 0.5
    ? C(p.replace('{v}', f(certo)), e, xx, pg)
    : E(p.replace('{v}', f(errado)), `${e} O correto é ${f(certo)}.`, `${xx} O item diz ${f(errado)}, mas o correto é ${f(certo)}.`, pg);
}
const fat = (n) => (n <= 1 ? 1 : n * fat(n - 1));
const comb = (n, k) => fat(n) / (fat(k) * fat(n - k));
const arr = (n, k) => fat(n) / fat(n - k);
const mdc = (a, b) => (b ? mdc(b, a % b) : a);
const frac = (a, b) => { const g = mdc(a, b); return `${a / g}/${b / g}`; };
const fr = (x) => { for (let d = 1; d <= 512; d++) { const n = Math.round(x * d); if (Math.abs(n / d - x) < 1e-9) return d === 1 ? String(n) : frac(n, d); } return fmt(x); };
const sx = (n) => (n < 0 ? `(${n})` : String(n)); // número entre parênteses se negativo

// ---------- lógica proposicional ----------
const OPS = {
  '∧': (p, q) => p && q, '∨': (p, q) => p || q, '→': (p, q) => !p || q, '↔': (p, q) => p === q, '⊻': (p, q) => p !== q,
};
const REGRA = {
  '∧': 'a conjunção (“e”) só é verdadeira quando as duas partes são verdadeiras',
  '∨': 'a disjunção (“ou”) só é falsa quando as duas partes são falsas',
  '→': 'a condicional (“se..., então...”) só é falsa quando o antecedente é verdadeiro e o consequente é falso (a famosa “Vera Fischer”: V → F = F)',
  '↔': 'a bicondicional (“se e somente se”) é verdadeira quando as duas partes têm o mesmo valor',
  '⊻': 'a disjunção exclusiva (“ou..., ou...”) é verdadeira quando as partes têm valores diferentes',
};
const VF = (b) => (b ? 'verdadeira' : 'falsa');
function proposicoes() {
  const q = [
    C('Proposição é toda sentença declarativa que pode ser classificada como verdadeira ou falsa, mas não ambas.', 'Princípios da não contradição e do terceiro excluído.',
      'Proposição é uma frase que afirma ou nega algo e pode ser julgada como verdadeira ou falsa. Dois princípios a sustentam: o da não contradição (não pode ser V e F ao mesmo tempo) e o do terceiro excluído (ou é V, ou é F, sem terceira opção).'),
    E('A sentença “Que dia lindo!” é uma proposição.', 'Exclamativa não é proposição.',
      'Frases exclamativas expressam emoção e não podem ser julgadas como verdadeiras ou falsas. Também não são proposições as interrogativas, as imperativas (ordens) e as sentenças abertas.'),
    E('A sentença “Feche a porta.” é uma proposição.', 'Imperativa não é proposição.',
      'Uma ordem não é verdadeira nem falsa: ela pode ser cumprida ou não. Por isso frases imperativas não são proposições.'),
    E('A sentença “x + 2 = 5” é uma proposição.', 'É sentença aberta: depende de x.',
      'Sem saber o valor de x, não dá para dizer se a frase é verdadeira ou falsa (é V se x = 3 e F para outros valores). Isso é uma sentença aberta. Ela vira proposição quando x recebe um valor ou quando aparece um quantificador (“existe x tal que...”).'),
    C('A conjunção p ∧ q só é verdadeira quando p e q são verdadeiras.', 'Tabela-verdade.',
      'No “e”, as duas partes precisam ser verdadeiras. Basta uma falsa para a conjunção ser falsa. Exemplo: “Estudei e passei” só é verdade se as duas coisas aconteceram.'),
    C('A disjunção p ∨ q só é falsa quando p e q são falsas.', 'Tabela-verdade.',
      'No “ou” inclusivo, basta uma parte verdadeira para a disjunção ser verdadeira. Ela só é falsa quando as duas são falsas.'),
    C('A condicional p → q só é falsa quando p é verdadeira e q é falsa.', '“Vera Fischer é falsa”.',
      'A condicional é uma promessa: “se p, então q”. Ela só é quebrada quando p acontece e q não acontece (V → F). Se p é falso, a condicional é verdadeira, seja q o que for.', 'Macete “Vera Fischer é Falsa”: V → F = F. Todas as outras combinações dão V.'),
    C('A bicondicional p ↔ q é verdadeira quando p e q têm o mesmo valor lógico.', 'Tabela-verdade.',
      'A bicondicional (“se e somente se”) é V quando p e q são ambas V ou ambas F, e F quando têm valores diferentes.'),
    C('A disjunção exclusiva p ⊻ q é verdadeira quando p e q têm valores diferentes.', '“Ou p ou q”.',
      'No “ou..., ou...” exclusivo, só uma das partes pode ser verdadeira. É exatamente o contrário da bicondicional.'),
    C('Uma tabela-verdade com n proposições simples tem 2ⁿ linhas.', 'Ex.: 3 proposições → 8 linhas.',
      'Cada proposição simples tem 2 valores possíveis (V ou F). Com n proposições, as combinações são 2 × 2 × ... × 2 = 2ⁿ. Exemplo: 3 proposições → 2³ = 8 linhas.'),
    C('Tautologia é a proposição composta sempre verdadeira, como p ∨ ¬p.', 'Conceito.',
      'Tautologia é verdadeira em todas as linhas da tabela-verdade. Em p ∨ ¬p, se p é F, ¬p é V, e vice-versa: sempre há uma parte verdadeira.'),
    C('Contradição é a proposição composta sempre falsa, como p ∧ ¬p.', 'Conceito.',
      'Contradição é falsa em todas as linhas. Em p ∧ ¬p, as duas partes nunca são verdadeiras ao mesmo tempo.'),
    C('Contingência é a proposição composta que pode ser verdadeira ou falsa conforme os valores das simples.', 'Conceito.',
      'Contingência tem pelo menos um V e pelo menos um F na tabela-verdade. Exemplo: p ∧ q.'),
    C('Na condicional “Se chove, então a rua molha”, “chove” é o antecedente e “a rua molha” é o consequente.', 'Estrutura.',
      'O antecedente vem depois do “se” (a condição); o consequente vem depois do “então” (o resultado).'),
    C('“p é condição suficiente para q” equivale a p → q.', 'Linguagem.',
      'Se p basta para garantir q, então “se p, então q”. O que é suficiente fica no antecedente.', 'Suficiente = antecedente (antes da seta). Necessário = consequente (depois da seta).'),
    C('“q é condição necessária para p” equivale a p → q.', 'Linguagem.',
      'Se q é necessário para p, então p não acontece sem q: sempre que p ocorre, q ocorreu. Isso é p → q. O que é necessário fica no consequente.'),
    C('“p somente se q” equivale a p → q.', 'Linguagem.',
      '“Somente se” introduz a condição necessária, que vai para o consequente: “p somente se q” = “se p, então q”.', 'Cuidado: “p se q” é q → p, mas “p somente se q” é p → q.'),
  ];
  const nomes = { '∧': 'conjunção', '∨': 'disjunção', '→': 'condicional', '↔': 'bicondicional', '⊻': 'disjunção exclusiva' };
  for (let i = 0; i < 22; i++) {
    const op = pick(Object.keys(OPS)), p = rnd() < 0.5, r = rnd() < 0.5, v = OPS[op](p, r);
    const afirma = rnd() < 0.5 ? v : !v;
    const x = `Lembre que ${REGRA[op]}. Com p ${VF(p)} e q ${VF(r)}, p ${op} q é ${VF(v)}.`;
    q.push((afirma === v ? C : E)(`Se p é ${VF(p)} e q é ${VF(r)}, a ${nomes[op]} p ${op} q é ${VF(afirma)}.`, `p ${op} q é ${VF(v)}.`, x));
  }
  for (let i = 0; i < 10; i++) {
    const p = rnd() < 0.5, r = rnd() < 0.5, s = rnd() < 0.5;
    const v = OPS['→'](OPS['∧'](p, r), s);
    const pq = p && r;
    const x = `Primeiro resolva o parêntese: p ∧ q é ${VF(pq)} (o “e” só é V se as duas forem V). Depois a condicional (p ∧ q) → r: antecedente ${VF(pq)} e consequente ${VF(s)}. ${pq && !s ? 'É o caso V → F, o único em que a condicional é falsa.' : pq ? 'V → V dá verdadeiro.' : 'Com antecedente falso, a condicional é sempre verdadeira.'}`;
    const n = ['verdadeiro', 'falso'].map((t, k) => ((v ? 0 : 1) === k ? OK : `O cálculo dá ${v ? 'verdadeiro' : 'falso'}.`))
      .concat(['Todos os valores foram dados, então o resultado é determinado.', 'O valor de p já foi informado.', 'É uma proposição composta, com valor lógico definido.']);
    q.push(M(`Sabendo que p é ${VF(p)}, q é ${VF(r)} e r é ${VF(s)}, o valor lógico de (p ∧ q) → r é:`, ['verdadeiro', 'falso', 'indeterminado', 'depende de p', 'não é proposição'], v ? 0 : 1, `p ∧ q é ${VF(p && r)}; então a condicional é ${VF(v)}.`, x, n));
  }
  q.push(M('Quantas linhas tem a tabela-verdade de uma proposição com 4 proposições simples?', ['4', '8', '12', '16', '32'], 3, '2⁴ = 16.',
    'O número de linhas é 2ⁿ, com n = número de proposições simples: 2⁴ = 2 × 2 × 2 × 2 = 16.',
    ['4 seria só o número de proposições.', '8 = 2³, para 3 proposições.', '12 não é potência de 2.', OK, '32 = 2⁵, para 5 proposições.']));
  q.push(M('A proposição sempre verdadeira é chamada de:', ['contradição', 'contingência', 'tautologia', 'falácia', 'paradoxo'], 2, 'Conceito.',
    'Tautologia é a proposição composta verdadeira em todas as linhas da tabela-verdade.',
    ['Contradição é sempre falsa.', 'Contingência tem V e F.', OK, 'Falácia é argumento inválido.', 'Paradoxo é afirmação que se contradiz, não é o termo técnico pedido.']));
  q.push(M('A condicional p → q é falsa quando:', ['p e q são verdadeiras', 'p é falsa e q verdadeira', 'p é verdadeira e q falsa', 'p e q são falsas', 'nunca'], 2, 'Tabela-verdade.',
    'A condicional só é falsa no caso V → F: o antecedente acontece e o consequente não.',
    ['V → V é verdadeira.', 'F → V é verdadeira.', OK, 'F → F é verdadeira.', 'Há um caso em que é falsa: V → F.']));
  return q;
}

function equivalencias() {
  return [
    C('A negação de “p e q” é “não p ou não q”.', 'Lei de De Morgan.',
      'Pela Lei de De Morgan, para negar uma conjunção, nega-se cada parte e troca-se o “e” pelo “ou”: ¬(p ∧ q) ≡ ¬p ∨ ¬q. Para a frase “p e q” ser falsa, basta uma das partes falhar.', 'Negou o “e”? Vira “ou”. Negou o “ou”? Vira “e”.'),
    C('A negação de “p ou q” é “não p e não q”.', 'Lei de De Morgan.',
      'Pela Lei de De Morgan: ¬(p ∨ q) ≡ ¬p ∧ ¬q. Para “p ou q” ser falsa, as duas partes precisam ser falsas.'),
    C('A negação de “Se p, então q” é “p e não q”.', '¬(p → q) ≡ p ∧ ¬q.',
      'A condicional só é falsa quando p é verdadeiro e q é falso. Por isso a negação é “p e não q”: mantém o antecedente, troca “se... então” por “e” e nega o consequente.', 'Macete “MA-NÉ”: MAntém a primeira E NEga a segunda.'),
    E('A negação de “Se estudo, então passo” é “Se não estudo, então não passo”.', 'A negação é “Estudo e não passo”.',
      'A negação de uma condicional nunca é outra condicional. É “p e não q”: “Estudo e não passo”. A frase do item é a inversa, que não nega nem equivale à original.'),
    C('“Se p, então q” é equivalente a “Se não q, então não p”.', 'Contrapositiva.',
      'É a contrapositiva: inverte a ordem e nega as duas partes. p → q ≡ ¬q → ¬p. Se “chover” garante “rua molhada”, então rua seca garante que não choveu.', 'Contrapositiva: inverte E nega. Só inverter (recíproca) ou só negar (inversa) não vale.'),
    C('“Se p, então q” é equivalente a “Não p ou q”.', 'p → q ≡ ¬p ∨ q.',
      'Outra equivalência clássica: p → q ≡ ¬p ∨ q. Nega-se o antecedente, troca-se a seta por “ou” e mantém-se o consequente. As duas são falsas só quando p é V e q é F.', 'Macete “NE-Y-MA”: NEga a primeira, troca por “ou” e MAntém a segunda.'),
    E('“Se p, então q” é equivalente a “Se q, então p”.', 'Essa é a recíproca, que não é equivalente.',
      'Trocar só a ordem gera a recíproca (q → p), que NÃO é equivalente. Exemplo: “Se é cachorro, é animal” é V, mas “Se é animal, é cachorro” é F.'),
    E('“Se p, então q” é equivalente a “Se não p, então não q”.', 'Essa é a inversa, não equivalente.',
      'Negar as duas partes sem inverter a ordem gera a inversa (¬p → ¬q), que NÃO é equivalente. A equivalente é a contrapositiva: ¬q → ¬p.'),
    C('“Se chove, a rua fica molhada” equivale a “Se a rua não está molhada, não choveu”.', 'Contrapositiva.',
      'É a contrapositiva: inverteu a ordem e negou as duas partes.'),
    C('“Se chove, a rua fica molhada” equivale a “Não chove ou a rua fica molhada”.', '¬p ∨ q.',
      'É a equivalência p → q ≡ ¬p ∨ q: negou o antecedente, trocou por “ou” e manteve o consequente.'),
    C('A negação de “p se e somente se q” é “p ou q, mas não ambos”.', '¬(p ↔ q) ≡ p ⊻ q.',
      'A bicondicional é V quando p e q têm o mesmo valor. A negação é V quando têm valores diferentes, que é a disjunção exclusiva (ou p, ou q).'),
    C('A dupla negação de p equivale a p.', '¬¬p ≡ p.',
      'Negar duas vezes volta ao original: “Não é verdade que ele não veio” = “Ele veio”.'),
    C('A negação de “Todos os alunos passaram” é “Algum aluno não passou”.', 'Quantificadores.',
      'Para desmentir “todos passaram”, basta UM aluno que não passou. A negação de “todo A é B” é “algum A não é B”.', 'Todo ↔ Algum... não. Nenhum ↔ Algum.'),
    E('A negação de “Todos os alunos passaram” é “Nenhum aluno passou”.', 'É “Algum aluno não passou”.',
      '“Nenhum aluno passou” é o contrário extremo, não a negação. Se metade passou, as duas frases seriam falsas ao mesmo tempo, e isso não pode acontecer entre uma frase e sua negação. A negação correta é “Algum aluno não passou”.'),
    C('A negação de “Algum servidor é honesto” é “Nenhum servidor é honesto”.', 'Quantificadores.',
      '“Algum” afirma que existe pelo menos um. A negação diz que não existe nenhum.'),
    C('A negação de “Nenhum político é honesto” é “Algum político é honesto”.', 'Quantificadores.',
      'Para desmentir “nenhum”, basta mostrar um caso: existe pelo menos um político honesto.'),
    C('A negação de “Algum carro não é azul” é “Todo carro é azul”.', 'Quantificadores.',
      '“Algum A não é B” e “Todo A é B” são negações uma da outra: sempre uma é V e a outra é F.'),
    C('“Todo A é B” não implica que “todo B é A”.', 'Recíproca não vale.',
      'Exemplo: “Todo policial é servidor” não significa que “todo servidor é policial”. O conjunto A está dentro de B, mas B pode ser maior.'),
    C('A negação de “João é alto e Maria é baixa” é “João não é alto ou Maria não é baixa”.', 'De Morgan.',
      'Negou o “e”: nega cada parte e troca por “ou”.'),
    C('A negação de “Pedro estuda ou trabalha” é “Pedro não estuda e não trabalha”.', 'De Morgan.',
      'Negou o “ou”: nega cada parte e troca por “e”.'),
    C('A negação de “Se o réu é culpado, então será preso” é “O réu é culpado e não será preso”.', 'p ∧ ¬q.',
      'Negação da condicional: mantém o antecedente, troca por “e” e nega o consequente.'),
    C('“p ↔ q” equivale a “(p → q) ∧ (q → p)”.', 'Bicondicional.',
      'A bicondicional é a condicional nos dois sentidos: p garante q e q garante p.'),
    C('A proposição “p → q” é equivalente a “¬q → ¬p”, e ambas são falsas na mesma linha da tabela.', 'Equivalência.',
      'Proposições equivalentes têm a mesma tabela-verdade. As duas são falsas só quando p é V e q é F.'),
    E('A negação de “Maria é rica” é “Maria é pobre”.', 'A negação é “Maria não é rica”.',
      'Negar não é dizer o oposto. “Pobre” é o contrário de “rica”, mas Maria pode ser de classe média. A negação é simplesmente “Maria não é rica”.', 'Cuidado com antônimos: a negação de “alto” é “não alto”, e não “baixo”.'),
    C('“Nenhum A é B” equivale a “Todo A não é B”.', 'Quantificadores.',
      'Dizer que nenhum A é B é o mesmo que dizer que todos os A estão fora de B.'),
    C('A negação de “Existe um número par primo” é “Todo número par não é primo”.', 'Quantificadores.',
      '“Existe” (algum) é negado por “nenhum” ou “todo... não”: “Nenhum número par é primo” = “Todo número par não é primo”.'),
    C('“Se não estudar, não passará” equivale a “Se passou, estudou”.', 'Contrapositiva.',
      'A original é ¬p → ¬q. A contrapositiva inverte e nega: ¬(¬q) → ¬(¬p), que é q → p: “Se passou, estudou”.'),
    C('Pela distributiva, p ∧ (q ∨ r) equivale a (p ∧ q) ∨ (p ∧ r).', 'Propriedade.',
      'É como na matemática, a × (b + c) = a×b + a×c: o “e” se distribui sobre o “ou”.'),
    C('Pela absorção, p ∨ (p ∧ q) equivale a p.', 'Propriedade.',
      'Se p é V, a expressão é V. Se p é F, p ∧ q também é F e tudo dá F. O resultado sempre acompanha p.'),
    C('“p → q” equivale a “¬(p ∧ ¬q)”.', 'Equivalência.',
      'A negação de p → q é p ∧ ¬q. Negando de novo, volta-se a p → q.'),
    M('A negação de “Todos os candidatos estudaram” é:', ['Nenhum candidato estudou.', 'Algum candidato não estudou.', 'Todos os candidatos não estudaram.', 'Algum candidato estudou.', 'Nenhum candidato deixou de estudar.'], 1, 'Quantificadores.',
      'Para negar “todos”, basta um caso contrário: “Algum candidato não estudou”.',
      ['É o contrário extremo, não a negação.', OK, 'Equivale a “nenhum estudou”, também extremo.', 'É compatível com a frase original.', 'Equivale à frase original.']),
    M('A negação de “Se bebe, não dirige” é:', ['Se não bebe, dirige.', 'Bebe e dirige.', 'Não bebe e não dirige.', 'Bebe ou dirige.', 'Se dirige, bebe.'], 1, '¬(p → q) ≡ p ∧ ¬q.',
      'Mantém o antecedente (bebe), troca por “e” e nega o consequente (não dirige → dirige): “Bebe e dirige”.',
      ['Negação de condicional nunca é condicional.', OK, 'Negou também o antecedente.', 'Trocou por “ou”, sem regra.', 'Negação de condicional nunca é condicional.']),
    M('“Se sou aprovado, então comemoro” equivale a:', ['Se não sou aprovado, não comemoro.', 'Se comemoro, sou aprovado.', 'Se não comemoro, não sou aprovado.', 'Sou aprovado e não comemoro.', 'Não sou aprovado e comemoro.'], 2, 'Contrapositiva.',
      'A contrapositiva inverte a ordem e nega as duas partes: “Se não comemoro, não sou aprovado”.',
      ['É a inversa, não equivalente.', 'É a recíproca, não equivalente.', OK, 'É a negação.', 'Não é equivalente.']),
    M('A negação de “Ana é médica ou Bia é advogada” é:', ['Ana não é médica ou Bia não é advogada.', 'Ana não é médica e Bia não é advogada.', 'Ana é médica e Bia é advogada.', 'Se Ana é médica, Bia não é advogada.', 'Ana não é médica, então Bia é advogada.'], 1, 'De Morgan.',
      'Negou o “ou”: nega cada parte e troca por “e”.',
      ['Esqueceu de trocar o “ou” por “e”.', OK, 'Não negou nada.', 'Não é a negação.', 'Não é a negação.']),
    M('A negação de “Algum policial é corrupto” é:', ['Todo policial é corrupto.', 'Algum policial não é corrupto.', 'Nenhum policial é corrupto.', 'Nem todo policial é corrupto.', 'Existe policial honesto.'], 2, 'Quantificadores.',
      'A negação de “algum é” é “nenhum é”.',
      ['É compatível com a original.', 'Pode ser verdadeira junto com a original.', OK, 'Equivale a “algum não é”.', 'Pode ser verdadeira junto com a original.']),
    M('“Se chove, então levo guarda-chuva” equivale a:', ['Chove e levo guarda-chuva.', 'Não chove ou levo guarda-chuva.', 'Chove ou não levo guarda-chuva.', 'Se levo guarda-chuva, chove.', 'Se não chove, não levo guarda-chuva.'], 1, '¬p ∨ q.',
      'p → q ≡ ¬p ∨ q: nega a primeira, troca por “ou” e mantém a segunda.',
      ['Conjunção não é equivalente.', OK, 'Negou a parte errada.', 'É a recíproca.', 'É a inversa.']),
    M('A negação de “João é policial e Pedro é bombeiro” é:', ['João não é policial e Pedro não é bombeiro.', 'João não é policial ou Pedro não é bombeiro.', 'João é policial ou Pedro é bombeiro.', 'Se João é policial, Pedro é bombeiro.', 'João é policial e Pedro não é bombeiro.'], 1, 'De Morgan.',
      'Negou o “e”: nega cada parte e troca por “ou”.',
      ['Esqueceu de trocar o “e” por “ou”.', OK, 'Não negou as partes.', 'Não é a negação.', 'É só um dos casos da negação.']),
    M('A recíproca de p → q é:', ['¬q → ¬p', 'q → p', '¬p → ¬q', 'p ∧ ¬q', '¬p ∨ q'], 1, 'Troca de posição.',
      'A recíproca só troca a ordem: q → p. Não é equivalente à original.',
      ['É a contrapositiva.', OK, 'É a inversa.', 'É a negação.', 'É uma equivalente.']),
    M('A contrapositiva de p → q é:', ['q → p', '¬p → ¬q', '¬q → ¬p', 'p ∨ q', 'p ↔ q'], 2, 'Equivalente.',
      'A contrapositiva inverte e nega: ¬q → ¬p. É equivalente à original.',
      ['É a recíproca.', 'É a inversa.', OK, 'Não tem relação.', 'É a bicondicional.']),
    M('A negação de “Nenhum aluno faltou” é:', ['Todos faltaram.', 'Algum aluno faltou.', 'Nenhum aluno compareceu.', 'Algum aluno não faltou.', 'Todo aluno compareceu.'], 1, 'Quantificadores.',
      'Para negar “nenhum”, basta um caso: “Algum aluno faltou”.',
      ['É o contrário extremo.', OK, 'Equivale a “todos faltaram”.', 'É compatível com a original.', 'Equivale à original.']),
    M('A negação de “p ↔ q” equivale a:', ['p ∧ q', 'p ⊻ q (ou p ou q)', '¬p ↔ ¬q', 'p → q', '¬p ∧ ¬q'], 1, 'Disjunção exclusiva.',
      'A bicondicional é V com valores iguais; a negação é V com valores diferentes: a disjunção exclusiva.',
      ['Não é a negação.', OK, 'É equivalente à original, não a negação.', 'Não é a negação.', 'Não é a negação.']),
    M('“Todo servidor é concursado” tem como negação:', ['Nenhum servidor é concursado.', 'Algum servidor não é concursado.', 'Todo concursado é servidor.', 'Algum concursado não é servidor.', 'Nenhum concursado é servidor.'], 1, 'Quantificadores.',
      'A negação de “todo A é B” é “algum A não é B”.',
      ['É o contrário extremo.', OK, 'É a recíproca.', 'Fala de outro grupo.', 'Fala de outro grupo.']),
    M('“Não é verdade que estudo e trabalho” equivale a:', ['Não estudo e não trabalho.', 'Não estudo ou não trabalho.', 'Estudo ou trabalho.', 'Se estudo, trabalho.', 'Estudo e não trabalho.'], 1, 'De Morgan.',
      '“Não é verdade que...” é a negação do “e”: nega cada parte e troca por “ou”.',
      ['Esqueceu de trocar o “e” por “ou”.', OK, 'Não negou as partes.', 'Não é equivalente.', 'É só um dos casos.']),
    M('A proposição equivalente a “p → q” é:', ['q → p', '¬p → ¬q', '¬p ∨ q', 'p ∧ q', 'p ∨ ¬q'], 2, 'Equivalência.',
      'p → q ≡ ¬p ∨ q (e também ≡ ¬q → ¬p).',
      ['É a recíproca.', 'É a inversa.', OK, 'Conjunção não é equivalente.', 'Negou a parte errada.']),
    M('Se “Todo A é B” é verdadeira, então é necessariamente verdadeira:', ['Todo B é A.', 'Algum A é B (se existir A).', 'Nenhum B é A.', 'Algum B não é A.', 'Nenhum A é B.'], 1, 'Silogismo.',
      'Se todo A está dentro de B e existe pelo menos um A, esse A também é B. Logo, algum A é B.',
      ['É a recíproca, que não vale.', OK, 'Contradiz a premissa.', 'Pode ser V, mas não necessariamente.', 'Contradiz a premissa.']),
    M('A negação de “Algum carro é vermelho” é:', ['Todo carro é vermelho.', 'Nenhum carro é vermelho.', 'Algum carro não é vermelho.', 'Todo carro não é azul.', 'Nem todo carro é vermelho.'], 1, 'Quantificadores.',
      'A negação de “algum é” é “nenhum é”.',
      ['É compatível com a original.', OK, 'Pode ser V junto com a original.', 'Fala de outra cor.', 'Equivale a “algum não é”.']),
    M('“Se não pago, sou multado” equivale a:', ['Pago ou sou multado.', 'Se sou multado, não pago.', 'Não pago e sou multado.', 'Se pago, não sou multado.', 'Pago e não sou multado.'], 0, '¬p → q ≡ p ∨ q.',
      'Use p → q ≡ ¬p ∨ q com o antecedente “não pago”: negando “não pago”, fica “pago”. Resultado: “Pago ou sou multado”.',
      [OK, 'É a recíproca.', 'Conjunção não é equivalente.', 'É a inversa.', 'Não é equivalente.']),
    M('A negação de “Se é domingo, então descanso” é:', ['Não é domingo e descanso.', 'É domingo e não descanso.', 'Se não é domingo, não descanso.', 'É domingo ou descanso.', 'Se descanso, é domingo.'], 1, 'p ∧ ¬q.',
      'Mantém o antecedente, troca por “e” e nega o consequente: “É domingo e não descanso”.',
      ['Negou a parte errada.', OK, 'Negação de condicional não é condicional.', 'Não é a negação.', 'É a recíproca.']),
  ];
}

// ---------- matemática ----------
function equacoes() {
  const q = [
    C('A equação 2x + 6 = 0 tem como solução x = −3.', '2x = −6.',
      'Passe o 6 para o outro lado com sinal trocado: 2x = −6. Divida por 2: x = −3. Conferindo: 2·(−3) + 6 = 0.'),
    C('Uma equação do 2º grau ax² + bx + c = 0 tem duas raízes reais distintas quando Δ = b² − 4ac > 0.', 'Discriminante.',
      'Na fórmula de Bhaskara, x = (−b ± √Δ)/2a. Se Δ > 0, a raiz quadrada existe e o “±” gera dois valores diferentes.'),
    C('Quando Δ = 0, a equação do 2º grau tem duas raízes reais iguais.', 'Discriminante.',
      'Com Δ = 0, o “± √Δ” vale zero, e as duas raízes ficam iguais a −b/2a.'),
    C('Quando Δ < 0, a equação do 2º grau não tem raízes reais.', 'Discriminante.',
      'Não existe raiz quadrada de número negativo nos reais. Por isso, com Δ < 0, não há solução real.'),
    C('A soma das raízes de ax² + bx + c = 0 é −b/a e o produto é c/a.', 'Relações de Girard.',
      'São as relações de Girard. Na equação x² − 5x + 6 = 0, a soma é 5 e o produto é 6 (raízes 2 e 3).', 'Na soma, o sinal de b se inverte (−b/a). No produto, não (c/a).'),
    C('Um sistema linear com duas equações e duas incógnitas pode ser resolvido por substituição ou por adição.', 'Métodos.',
      'Substituição: isola uma letra numa equação e substitui na outra. Adição: soma as equações para eliminar uma letra.'),
  ];
  for (let i = 0; i < 12; i++) {
    const x = int(-9, 15), a = int(2, 9), b = int(-20, 20), c = a * x + b;
    const p = `Na equação ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${c}, o valor de x é`;
    const xx = `Isole o x: passe o ${b} para o outro lado com o sinal trocado: ${a}x = ${c} ${b < 0 ? '+' : '−'} ${Math.abs(b)} = ${c - b}. Divida por ${a}: x = ${c - b} ÷ ${a} = ${x}.`;
    q.push(i % 2
      ? me(`${p}:`, x, [[x + 1, 'Erro de uma unidade na conta.'], [x - 1, 'Erro de uma unidade na conta.'], [-x, 'Sinal trocado.'], [x + 2, CONTA]], `${a}x = ${c - b} → x = ${x}.`, fmt, xx, 'Ao passar um termo para o outro lado, troque o sinal.')
      : ce(`${p} {v}.`, x, x + int(1, 3), `${a}x = ${c - b}.`, fmt, xx));
  }
  for (let i = 0; i < 12; i++) {
    const r1 = int(-6, 8), r2 = int(-6, 8), S = r1 + r2, P = r1 * r2;
    const eq = `x² ${S > 0 ? '−' : '+'} ${Math.abs(S)}x ${P < 0 ? '−' : '+'} ${Math.abs(P)} = 0`;
    const b = -S;
    if (i % 3 === 0) q.push(me(`A soma das raízes de ${eq} é:`, S, [[-S, 'Esqueceu de inverter o sinal de b.'], [P, 'Esse é o produto (c/a).'], [S + 1, CONTA], [S - 2, CONTA]], 'Soma = −b/a.', fmt,
      `Pelas relações de Girard, a soma das raízes é −b/a. Aqui a = 1 e b = ${b}, então a soma é −(${b})/1 = ${S}. (As raízes são ${r1} e ${r2}.)`, 'Na soma, o sinal de b se inverte.'));
    else if (i % 3 === 1) q.push(me(`O produto das raízes de ${eq} é:`, P, [[-P, 'Sinal trocado: o produto é c/a, sem inverter.'], [S, 'Essa é a soma (−b/a).'], [P + 2, CONTA], [P - 1, CONTA]], 'Produto = c/a.', fmt,
      `Pelas relações de Girard, o produto das raízes é c/a. Aqui a = 1 e c = ${P}, então o produto é ${P}. (As raízes são ${r1} e ${r2}.)`));
    else q.push(ce(`Uma das raízes de ${eq} é {v}.`, r1, Math.max(r1, r2) + int(1, 3), `As raízes são ${r1} e ${r2}.`, fmt,
      `Procure dois números com soma ${S} e produto ${P}: são ${r1} e ${r2}. Conferindo, ${sx(r1)} + ${sx(r2)} = ${S} e ${sx(r1)} · ${sx(r2)} = ${P}.`));
  }
  for (let i = 0; i < 12; i++) {
    const x = int(1, 12), y = int(1, 12);
    const p = `No sistema x + y = ${x + y} e x − y = ${x - y}, o valor de x é`;
    const xx = `Some as duas equações: (x + y) + (x − y) = ${x + y} + ${sx(x - y)}, então 2x = ${2 * x} e x = ${x}. Substituindo, y = ${x + y} − ${x} = ${y}.`;
    q.push(i % 2
      ? me(`${p}:`, x, [[y, 'Esse é o valor de y.'], [x + 1, CONTA], [x - 1, CONTA], [x + y, 'Essa é a soma x + y.']], `Somando: 2x = ${2 * x}.`, fmt, xx)
      : ce(`${p} {v}.`, x, x + 2, `2x = ${2 * x}.`, fmt, xx));
  }
  for (let i = 0; i < 6; i++) {
    const preco = int(3, 12), qtd = int(4, 15), total = preco * qtd;
    q.push(me(`Ana comprou canetas a R$ ${preco},00 cada e pagou R$ ${total},00. Quantas canetas comprou?`, qtd, [[qtd + 1, CONTA], [qtd - 1, CONTA], [qtd + 2, CONTA], [preco, 'Esse é o preço de cada caneta.']], `${total} ÷ ${preco} = ${qtd}.`, fmt,
      `Quantidade = total ÷ preço de cada uma: ${total} ÷ ${preco} = ${qtd} canetas. Conferindo: ${qtd} × ${preco} = ${total}.`));
  }
  return q;
}

function funcoes() {
  const q = [
    C('Na função afim f(x) = ax + b, o coeficiente a é a taxa de variação.', 'Inclinação da reta.',
      'O coeficiente a diz quanto f(x) muda quando x aumenta 1 unidade. Ele define a inclinação da reta. O b é onde a reta corta o eixo y.'),
    C('Se a > 0, a função afim é crescente; se a < 0, é decrescente.', 'Monotonicidade.',
      'Com a positivo, aumentar x aumenta f(x) (reta subindo). Com a negativo, aumentar x diminui f(x) (reta descendo).'),
    C('O gráfico da função quadrática é uma parábola.', 'Conceito.',
      'A função f(x) = ax² + bx + c, com a ≠ 0, tem gráfico em forma de parábola.'),
    C('Na função quadrática, se a > 0 a parábola tem concavidade para cima e um ponto de mínimo.', 'Concavidade.',
      'a > 0: parábola “sorrindo”, com ponto mais baixo (mínimo) no vértice. a < 0: parábola “triste”, com ponto mais alto (máximo).'),
    C('A abscissa do vértice da parábola é xᵥ = −b/(2a).', 'Fórmula.',
      'O vértice fica no meio das raízes. Sua coordenada x é −b/(2a), e a coordenada y é f(xᵥ) ou −Δ/(4a).'),
    C('A função exponencial f(x) = aˣ, com a > 1, é crescente.', 'Exponencial.',
      'Com base maior que 1, cada aumento de x multiplica o valor pela base: 2¹ = 2, 2² = 4, 2³ = 8. Com base entre 0 e 1, é decrescente.'),
    C('log_a b = c significa que aᶜ = b.', 'Definição.',
      'Logaritmo é o expoente: log₂ 8 = 3 porque 2³ = 8. Pergunte: “a base elevada a quanto dá o número?”.'),
    C('log(a · b) = log a + log b.', 'Propriedade.',
      'O logaritmo transforma multiplicação em soma. Exemplo: log 100 = log(10 · 10) = 1 + 1 = 2.'),
    C('log(aⁿ) = n · log a.', 'Propriedade.',
      'O expoente “desce” multiplicando. Exemplo: log 1000 = log 10³ = 3 · log 10 = 3.'),
    C('log_a 1 = 0 para qualquer base válida.', 'a⁰ = 1.',
      'Qualquer base (positiva e diferente de 1) elevada a zero dá 1. Logo, o logaritmo de 1 é sempre 0.'),
  ];
  for (let i = 0; i < 12; i++) {
    const a = int(-5, 7) || 2, b = int(-10, 10), x = int(-4, 6), v = a * x + b;
    const f = `f(x) = ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}`;
    const xx = `Substitua x por ${x}: f(${x}) = ${a} · ${sx(x)} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${a * x} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${v}.`;
    q.push(i % 2
      ? me(`Sendo ${f}, o valor de f(${x}) é:`, v, [[v + a, 'Seria f(' + (x + 1) + '), não f(' + x + ').'], [v - a, 'Seria f(' + (x - 1) + '), não f(' + x + ').'], [-v, 'Sinal trocado.'], [v + 1, CONTA]], `${a}·${x} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${v}.`, fmt, xx)
      : ce(`Sendo ${f}, f(${x}) = {v}.`, v, v + a, `${a}·(${x}) + (${b}) = ${v}.`, fmt, xx));
  }
  for (let i = 0; i < 10; i++) {
    const xv = int(-4, 5), a = pick([1, 2, -1]), b = -2 * a * xv, c = int(-6, 6), yv = a * xv * xv + b * xv + c;
    const f = `f(x) = ${a === 1 ? '' : a === -1 ? '−' : a}x² ${b < 0 ? '−' : '+'} ${Math.abs(b)}x ${c < 0 ? '−' : '+'} ${Math.abs(c)}`;
    const xx = `xᵥ = −b/(2a) = −(${b})/(2 · ${sx(a)}) = ${xv}.`;
    q.push(i % 2
      ? me(`O x do vértice de ${f} é:`, xv, [[-xv, 'Sinal trocado: lembre do “−” em −b/(2a).'], [xv + 1, CONTA], [b, 'Esse é o próprio b, sem dividir por 2a.'], [xv - 2, CONTA]], 'xᵥ = −b/(2a).', fmt, `Use a fórmula ${xx}`)
      : me(`O y do vértice de ${f} é:`, yv, [[yv + 1, CONTA], [-yv, 'Sinal trocado.'], [c, 'Esse é o c, que é f(0), não o vértice.'], [yv - 2, CONTA]], `f(${xv}) = ${yv}.`, fmt,
        `Primeiro ache o x do vértice: ${xx} Depois calcule f(${xv}) = ${a} · ${sx(xv)}² ${b < 0 ? '−' : '+'} ${Math.abs(b)} · ${sx(xv)} ${c < 0 ? '−' : '+'} ${Math.abs(c)} = ${yv}.`));
  }
  for (let i = 0; i < 10; i++) {
    const base = pick([2, 3, 5, 10]), e = int(1, base === 10 ? 4 : 5), n = base ** e;
    const xx = `Logaritmo é o expoente: ${base} elevado a quanto dá ${n}? ${base}^${e} = ${n}, então log de ${n} na base ${base} é ${e}.`;
    q.push(i % 2
      ? me(`O valor do logaritmo de ${n} na base ${base} é:`, e, [[e + 1, `${base}^${e + 1} = ${base ** (e + 1)}, não ${n}.`], [e - 1, `${base}^${e - 1} = ${base ** (e - 1)}, não ${n}.`], [n / base, 'Dividiu pela base em vez de achar o expoente.'], [base, 'Essa é a base.']], `${base}^${e} = ${n}.`, fmt, xx)
      : ce(`O logaritmo de ${n} na base ${base} é {v}.`, e, e + 1, `${base}^${e} = ${n}.`, fmt, xx));
  }
  for (let i = 0; i < 6; i++) {
    const b = pick([2, 3]), e = int(2, 6);
    q.push(me(`Sendo f(x) = ${b}ˣ, o valor de f(${e}) é:`, b ** e, [[b * e, 'Multiplicou base por expoente em vez de elevar.'], [b ** (e - 1), 'Elevou a um expoente a menos.'], [b ** (e + 1), 'Elevou a um expoente a mais.'], [e ** b, 'Inverteu base e expoente.']], `${b}^${e} = ${b ** e}.`, fmt,
      `f(${e}) = ${b}^${e} = ${Array(e).fill(b).join(' × ')} = ${b ** e}.`, 'Potência não é multiplicação de base por expoente: 2³ = 8, e não 6.'));
  }
  return q;
}

function razao() {
  const q = [
    C('Razão é o quociente entre duas grandezas.', 'Conceito.',
      'Razão é a divisão de uma grandeza pela outra. Exemplo: 10 acertos em 20 questões dão razão 10/20 = 1/2.'),
    C('Proporção é a igualdade entre duas razões.', 'Conceito.',
      'Exemplo: 2/4 = 3/6 é uma proporção, porque as duas razões valem 1/2.'),
    C('Em uma proporção, o produto dos meios é igual ao produto dos extremos.', 'Propriedade fundamental.',
      'Em a/b = c/d, vale a · d = b · c (multiplicação cruzada). É a base da regra de três.'),
    C('Grandezas diretamente proporcionais variam na mesma razão.', 'Ex.: quantidade e preço.',
      'Se uma dobra, a outra também dobra. Exemplo: o dobro de quilos custa o dobro.'),
    C('Grandezas inversamente proporcionais têm produto constante.', 'Ex.: velocidade e tempo.',
      'Se uma dobra, a outra cai pela metade. Exemplo: com o dobro de operários, a obra leva metade do tempo.'),
    C('Velocidade e tempo de viagem, para a mesma distância, são inversamente proporcionais.', 'Inversa.',
      'Distância = velocidade × tempo. Se a distância é fixa, aumentar a velocidade diminui o tempo na mesma proporção.'),
    C('Escala é a razão entre a medida no desenho e a medida real.', 'Conceito.',
      'Escala 1:1.000 significa que 1 cm no mapa vale 1.000 cm (10 m) na realidade.'),
  ];
  for (let i = 0; i < 12; i++) {
    const a = int(2, 9), k = int(2, 9), b = a * k, c = int(2, 12), d = c * k;
    const xx = `Regra de três direta (mais quilos, mais caro). Preço de 1 unidade: ${b} ÷ ${a} = R$ ${k},00. Para ${c}: ${c} × ${k} = R$ ${d},00.`;
    q.push(i % 2
      ? me(`Se ${a} kg de feijão custam R$ ${b},00, quanto custam ${c} kg?`, d, [[d + k, 'Calculou um quilo a mais.'], [d - k, 'Calculou um quilo a menos.'], [c * a, 'Multiplicou as quantidades em vez de usar o preço.'], [b + c, 'Somou valores sem relação.']], 'Regra de três direta.', (n) => real(n), xx)
      : ce(`Se ${a} pacotes custam R$ ${b},00, então ${c} pacotes custam R$ {v},00.`, d, d + k, `Preço unitário R$ ${k},00.`, fmt, xx.replace(' quilos', ' pacotes')));
  }
  for (let i = 0; i < 12; i++) {
    const t = int(2, 10), p = int(2, 8), p2 = pick([1, 2, 4, 8].filter((x) => (t * p) % x === 0 && x !== p)) || 1, t2 = (t * p) / p2;
    q.push(me(`${p} pedreiros fazem um muro em ${t} dias. Em quantos dias ${p2} pedreiro(s), no mesmo ritmo, fariam o mesmo muro?`, t2, [[t, 'Manteve o tempo, ignorando a mudança de pedreiros.'], [(t * p2) / p, 'Fez regra de três direta, mas é inversa.'], [t2 + 1, CONTA], [t2 - 1, CONTA]], `Inversa: ${p}×${t} = ${p2}×${t2}.`, fmt,
      `Regra de três inversa: menos pedreiros, mais dias. O total de trabalho é fixo: ${p} pedreiros × ${t} dias = ${p * t} “pedreiro-dias”. Com ${p2}: ${p * t} ÷ ${p2} = ${t2} dias.`, 'Antes de montar a regra de três, pergunte se as grandezas são diretas ou inversas.'));
  }
  for (let i = 0; i < 8; i++) {
    const r1 = int(1, 5), r2 = int(1, 5), k = int(5, 40), tot = (r1 + r2) * k;
    q.push(me(`R$ ${tot},00 foram divididos entre A e B na razão ${r1}:${r2}. A recebeu:`, r1 * k, [[r2 * k, 'Essa é a parte de B.'], [tot / 2, 'Dividiu ao meio, ignorando a razão.'], [r1 * k + k, 'Contou uma parte a mais.'], [(r1 + 1) * k, 'Contou uma parte a mais.']], `Cada parte vale ${k}.`, (n) => real(n),
      `Na razão ${r1}:${r2}, o total tem ${r1} + ${r2} = ${r1 + r2} partes. Cada parte vale ${tot} ÷ ${r1 + r2} = ${k}. A fica com ${r1} partes: ${r1} × ${k} = R$ ${r1 * k},00.`));
  }
  for (let i = 0; i < 8; i++) {
    const esc = pick([1000, 5000, 10000, 50000, 100000]), cm = int(2, 12), real_m = (cm * esc) / 100;
    q.push(me(`Num mapa de escala 1:${esc.toLocaleString('pt-BR')}, ${cm} cm correspondem a quantos metros na realidade?`, real_m, [[real_m * 10, 'Erro na conversão de unidades.'], [real_m / 10, 'Erro na conversão de unidades.'], [cm * 100, 'Converteu só os centímetros, sem a escala.'], [real_m + esc / 100, CONTA]], `${cm} × ${esc} cm = ${real_m} m.`, fmt,
      `Na escala 1:${esc.toLocaleString('pt-BR')}, cada 1 cm do mapa vale ${esc.toLocaleString('pt-BR')} cm reais. ${cm} cm valem ${cm} × ${esc.toLocaleString('pt-BR')} = ${(cm * esc).toLocaleString('pt-BR')} cm. Como 1 m = 100 cm, isso dá ${fmt(real_m)} m.`, 'A escala está em centímetros: no final, divida por 100 para ter metros.'));
  }
  return q;
}

function porcentagem() {
  const q = [
    C('x% de um valor é igual a x/100 multiplicado por esse valor.', 'Definição.',
      'Porcentagem é uma fração de denominador 100. 20% de 50 = 20/100 × 50 = 10.'),
    C('Um aumento de 10% seguido de um desconto de 10% resulta em perda de 1% sobre o valor inicial.', '1,1 × 0,9 = 0,99.',
      'Use fatores: aumento de 10% = × 1,1; desconto de 10% = × 0,9. Juntos: 1,1 × 0,9 = 0,99, ou seja, 99% do valor inicial (perda de 1%). O desconto incide sobre um valor já aumentado.', 'Aumento e desconto de mesma taxa nunca se anulam.'),
    E('Dois aumentos sucessivos de 10% equivalem a um aumento de 20%.', '1,1 × 1,1 = 1,21: aumento de 21%.',
      'Aumentos sucessivos se multiplicam, não se somam: 1,1 × 1,1 = 1,21, que é aumento de 21%. O segundo aumento incide sobre o valor já aumentado.'),
    C('Nos juros simples, J = C · i · t.', 'Fórmula.',
      'Nos juros simples, os juros de cada mês são sempre calculados sobre o capital inicial. J = capital × taxa × tempo (taxa e tempo na mesma unidade).'),
    C('Nos juros compostos, M = C · (1 + i)ᵗ.', 'Fórmula.',
      'Nos juros compostos, os juros entram no capital a cada período (juros sobre juros). O montante cresce multiplicando por (1 + i) a cada período.'),
    C('Para aumentar um valor em 25%, basta multiplicá-lo por 1,25.', 'Fator.',
      'Valor + 25% do valor = 100% + 25% = 125% = 1,25 × valor.'),
    C('Para dar desconto de 30%, multiplica-se o valor por 0,7.', 'Fator.',
      'Valor − 30% = 100% − 30% = 70% = 0,7 × valor.'),
  ];
  for (let i = 0; i < 12; i++) {
    const p = pick([5, 10, 12, 15, 20, 25, 30, 40, 50, 75]), v = int(2, 40) * 20, r = (p * v) / 100;
    const xx = `${p}% de ${v} = ${p}/100 × ${v} = ${p * v}/100 = ${fmt(r)}.`;
    q.push(i % 2
      ? me(`Quanto é ${p}% de ${v}?`, r, [[r * 2, 'É o dobro do resultado.'], [r / 2, 'É a metade do resultado.'], [r + p, CONTA], [v - r, `Esse é o valor depois de tirar ${p}%.`]], `${p}/100 × ${v} = ${fmt(r)}.`, fmt, xx)
      : ce(`${p}% de ${v} é igual a {v}.`, r, r + 10, `${p}/100 × ${v}.`, fmt, xx));
  }
  for (let i = 0; i < 10; i++) {
    const v = int(5, 50) * 20, p = pick([10, 20, 25, 30, 40]), aum = rnd() < 0.5, f = aum ? v * (1 + p / 100) : v * (1 - p / 100);
    const fat_ = aum ? 1 + p / 100 : 1 - p / 100;
    q.push(me(`Um produto de ${real(v)} teve ${aum ? 'aumento' : 'desconto'} de ${p}%. O novo preço é:`, f, [[aum ? v * (1 - p / 100) : v * (1 + p / 100), aum ? 'Aplicou desconto em vez de aumento.' : 'Aplicou aumento em vez de desconto.'], [v + p, 'Somou a taxa como se fosse dinheiro.'], [f + 10, CONTA], [v * p / 100, `Esse é só o valor dos ${p}%.`]], `Fator ${fmt(fat_)}.`, real,
      `${aum ? 'Aumento' : 'Desconto'} de ${p}% = multiplicar por ${aum ? `1 + ${p}/100` : `1 − ${p}/100`} = ${fmt(fat_)}. Novo preço: ${fmt(v)} × ${fmt(fat_)} = ${real(f)}.`));
  }
  for (let i = 0; i < 10; i++) {
    const Cc = int(2, 20) * 500, ia = pick([2, 3, 4, 5, 10]), t = int(2, 12), J = (Cc * ia * t) / 100;
    const xx = `Juros simples: J = C × i × t = ${fmt(Cc)} × ${ia}/100 × ${t}. Por mês rende ${real((Cc * ia) / 100)}; em ${t} meses, ${real(J)}.`;
    q.push(i % 2
      ? me(`Um capital de ${real(Cc)} aplicado a juros simples de ${ia}% ao mês, por ${t} meses, rende juros de:`, J, [[J * 2, 'É o dobro dos juros.'], [J / 2, 'É a metade dos juros.'], [Cc + J, 'Esse é o montante (capital + juros), não os juros.'], [(Cc * ia) / 100, 'Esse é o juro de um só mês.']], `J = ${Cc} × ${ia / 100} × ${t}.`, real, xx, 'Juros não é o mesmo que montante: montante = capital + juros.')
      : ce(`Um capital de ${real(Cc)} a juros simples de ${ia}% ao mês, durante ${t} meses, gera juros de {v}.`, J, J + (Cc * ia) / 100, `J = C·i·t.`, real, xx));
  }
  for (let i = 0; i < 8; i++) {
    const Cc = int(1, 10) * 1000, ia = pick([10, 20]), t = 2, Mt = Cc * (1 + ia / 100) ** t;
    const f1 = Cc * (1 + ia / 100);
    q.push(me(`${real(Cc)} aplicados a juros compostos de ${ia}% ao mês, por 2 meses, geram montante de:`, Mt, [[Cc * (1 + (ia * t) / 100), 'Esse seria o montante em juros simples.'], [Mt + 100, CONTA], [Cc * (1 + ia / 100), 'Esse é o montante de um só mês.'], [Mt - 50, CONTA]], `M = C(1+i)².`, real,
      `Juros compostos: a cada mês multiplica-se por ${fmt(1 + ia / 100)}. 1º mês: ${fmt(Cc)} × ${fmt(1 + ia / 100)} = ${fmt(f1)}. 2º mês: ${fmt(f1)} × ${fmt(1 + ia / 100)} = ${real(Mt)}.`, 'Nos compostos, o juro do 2º mês incide sobre o valor já aumentado.'));
  }
  return q;
}

function sequencias() {
  const q = [
    C('Na progressão aritmética, a diferença entre termos consecutivos é constante (razão r).', 'PA.',
      'Na PA, soma-se sempre o mesmo número. Exemplo: 3, 7, 11, 15 tem razão 4.'),
    C('O termo geral da PA é aₙ = a₁ + (n − 1)r.', 'Fórmula.',
      'Para chegar ao termo n, você parte do 1º e soma a razão (n − 1) vezes. Exemplo: o 10º termo de 3, 7, 11... é 3 + 9 × 4 = 39.'),
    C('A soma dos n primeiros termos da PA é Sₙ = (a₁ + aₙ) · n / 2.', 'Fórmula.',
      'Some o primeiro com o último, multiplique pela quantidade de termos e divida por 2. Exemplo: 1 + 2 + ... + 100 = (1 + 100) × 100 / 2 = 5.050.'),
    C('Na progressão geométrica, o quociente entre termos consecutivos é constante (razão q).', 'PG.',
      'Na PG, multiplica-se sempre pelo mesmo número. Exemplo: 3, 6, 12, 24 tem razão 2.'),
    C('O termo geral da PG é aₙ = a₁ · qⁿ⁻¹.', 'Fórmula.',
      'Para chegar ao termo n, multiplique o 1º pela razão (n − 1) vezes.'),
    C('Na sequência 2, 4, 8, 16, ..., o próximo termo é 32.', 'PG de razão 2.',
      'Cada termo é o dobro do anterior: 16 × 2 = 32.'),
  ];
  for (let i = 0; i < 14; i++) {
    const a1 = int(-5, 20), r = int(2, 9), n = int(5, 20), an = a1 + (n - 1) * r;
    const xx = `Termo geral da PA: aₙ = a₁ + (n − 1) · r. a${n} = ${a1} + (${n} − 1) · ${r} = ${a1} + ${(n - 1) * r} = ${an}.`;
    q.push(i % 2
      ? me(`Numa PA de primeiro termo ${a1} e razão ${r}, o ${n}º termo é:`, an, [[an + r, `Esse é o ${n + 1}º termo.`], [an - r, `Esse é o ${n - 1}º termo.`], [a1 + n * r, 'Usou n em vez de (n − 1).'], [a1 * n, 'Multiplicou o 1º termo por n, sem a razão.']], `a${n} = ${a1} + ${n - 1}·${r}.`, fmt, xx, 'Do 1º ao termo n há (n − 1) “pulos” de razão, e não n.')
      : ce(`Numa PA de primeiro termo ${a1} e razão ${r}, o ${n}º termo é {v}.`, an, an + r, `aₙ = a₁ + (n−1)r.`, fmt, xx));
  }
  for (let i = 0; i < 10; i++) {
    const a1 = int(1, 10), r = int(1, 6), n = int(5, 15), an = a1 + (n - 1) * r, S = ((a1 + an) * n) / 2;
    q.push(me(`A soma dos ${n} primeiros termos da PA (${a1}, ${a1 + r}, ${a1 + 2 * r}, ...) é:`, S, [[S + an, 'Somou o último termo duas vezes.'], [S - a1, 'Deixou de somar o primeiro termo.'], [an * n, 'Multiplicou o último termo por n.'], [((a1 + an) * (n - 1)) / 2, 'Usou (n − 1) termos em vez de n.']], `Sₙ = (${a1} + ${an})·${n}/2.`, fmt,
      `A razão é ${r}. O ${n}º termo é ${a1} + ${n - 1} · ${r} = ${an}. Soma: Sₙ = (a₁ + aₙ) · n / 2 = (${a1} + ${an}) · ${n} / 2 = ${S}.`));
  }
  for (let i = 0; i < 12; i++) {
    const a1 = int(1, 5), qq = pick([2, 3]), n = int(3, 7), an = a1 * qq ** (n - 1);
    const xx = `Termo geral da PG: aₙ = a₁ · qⁿ⁻¹. a${n} = ${a1} · ${qq}^${n - 1} = ${a1} · ${qq ** (n - 1)} = ${an}.`;
    q.push(i % 2
      ? me(`Numa PG de primeiro termo ${a1} e razão ${qq}, o ${n}º termo é:`, an, [[an * qq, `Esse é o ${n + 1}º termo.`], [an / qq, `Esse é o ${n - 1}º termo.`], [a1 * qq * n, 'Multiplicou em vez de elevar.'], [an + qq, CONTA]], `a${n} = ${a1}·${qq}^${n - 1}.`, fmt, xx)
      : ce(`Numa PG de primeiro termo ${a1} e razão ${qq}, o ${n}º termo é {v}.`, an, an * qq, `aₙ = a₁·qⁿ⁻¹.`, fmt, xx));
  }
  for (let i = 0; i < 6; i++) {
    const a = int(1, 9), r = int(2, 7), seq = [a, a + r, a + 2 * r, a + 3 * r];
    q.push(me(`Qual o próximo termo da sequência ${seq.join(', ')}, ...?`, a + 4 * r, [[a + 5 * r, 'Pulou um termo.'], [a + 3 * r + 1, 'Somou 1 em vez da razão.'], [seq[3] * 2, 'Tratou como PG de razão 2.'], [a + 4 * r + 2, CONTA]], `Razão ${r}.`, fmt,
      `A diferença entre termos vizinhos é sempre ${r} (${seq[1]} − ${seq[0]} = ${r}): é uma PA de razão ${r}. Próximo termo: ${seq[3]} + ${r} = ${a + 4 * r}.`));
  }
  return q;
}

function contagem() {
  const q = [
    C('Pelo princípio fundamental da contagem, se um evento ocorre em m modos e outro em n modos, os dois juntos ocorrem em m × n modos.', 'PFC.',
      'Para cada uma das m opções da primeira etapa, há n opções na segunda: total m × n. Exemplo: 3 camisas e 2 calças = 6 combinações.'),
    C('Permutação simples de n elementos é n!.', 'Fórmula.',
      'Para organizar n objetos em fila: n opções para o 1º lugar, n − 1 para o 2º, e assim por diante: n × (n − 1) × ... × 1 = n!.'),
    C('No arranjo, a ordem dos elementos importa; na combinação, não importa.', 'Distinção.',
      'Pódio (1º, 2º, 3º) é arranjo: trocar a ordem muda o resultado. Comissão é combinação: o grupo é o mesmo em qualquer ordem.', 'Teste: troque a ordem de dois escolhidos. Mudou algo? Arranjo. Não mudou? Combinação.'),
    C('O número de anagramas da palavra AMOR é 4! = 24.', 'Permutação.',
      'AMOR tem 4 letras diferentes: 4! = 4 × 3 × 2 × 1 = 24 anagramas.'),
    C('Escolher uma comissão de pessoas é problema de combinação, pois a ordem não importa.', 'Combinação.',
      'A comissão {Ana, Bia} é a mesma que {Bia, Ana}. Como a ordem não importa, usa-se combinação.'),
    C('Formar senhas com algarismos é problema em que a ordem importa.', 'Arranjo ou PFC.',
      'A senha 123 é diferente de 321. A ordem importa, então se usa o PFC (ou arranjo, se não puder repetir).'),
    C('0! = 1.', 'Convenção.',
      'Por definição, 0! = 1. Isso faz as fórmulas de combinação funcionarem, por exemplo C(n, n) = 1.'),
  ];
  for (let i = 0; i < 10; i++) {
    const n = int(3, 7);
    const passos = Array.from({ length: n }, (_, k) => n - k).join(' × ');
    q.push(me(`Quantos anagramas tem uma palavra de ${n} letras distintas?`, fat(n), [[fat(n - 1), `Esse é ${n - 1}!, com uma letra a menos.`], [n * n, 'Elevou n ao quadrado, sem sentido aqui.'], [fat(n) / 2, 'Dividiu por 2 sem haver letras repetidas.'], [fat(n) + n, CONTA]], `${n}! = ${fat(n)}.`, fmt,
      `Anagramas de palavra com letras distintas = permutação: ${n}! = ${passos} = ${fat(n)}.`));
  }
  for (let i = 0; i < 12; i++) {
    const n = int(5, 10), k = int(2, 4);
    if (i % 2) {
      const num = Array.from({ length: k }, (_, j) => n - j).join(' × '), den = Array.from({ length: k }, (_, j) => k - j).join(' × ');
      q.push(me(`De quantas maneiras é possível formar uma comissão de ${k} pessoas a partir de ${n}?`, comb(n, k), [[arr(n, k), 'Esse é o arranjo: contou a ordem, que não importa numa comissão.'], [comb(n, k) + n, CONTA], [n * k, 'Multiplicou n por k, sem sentido aqui.'], [comb(n, k - 1), `Essa é a combinação de ${k - 1}.`]], `C(${n},${k}) = ${comb(n, k)}.`, fmt,
        `Comissão: a ordem não importa, então é combinação. C(${n},${k}) = (${num}) ÷ (${den}) = ${arr(n, k)} ÷ ${fat(k)} = ${comb(n, k)}.`, 'Na comissão, divide-se por k! para eliminar as ordens repetidas.'));
    } else {
      q.push(me(`De quantas maneiras ${n} atletas podem ocupar o 1º, o 2º e o 3º lugares?`, arr(n, 3), [[comb(n, 3), 'Essa é a combinação: ignorou a ordem, que importa no pódio.'], [n ** 3, 'Permitiu o mesmo atleta em dois lugares.'], [fat(n), 'Contou todas as posições, não só as 3 primeiras.'], [arr(n, 3) / 2, CONTA]], `A(${n},3) = ${n}·${n - 1}·${n - 2}.`, fmt,
        `No pódio a ordem importa: arranjo. 1º lugar: ${n} opções; 2º: ${n - 1}; 3º: ${n - 2}. Total: ${n} × ${n - 1} × ${n - 2} = ${arr(n, 3)}.`));
    }
  }
  for (let i = 0; i < 10; i++) {
    const a = int(2, 6), b = int(2, 6), c = int(2, 5);
    q.push(ce(`Com ${a} camisas, ${b} calças e ${c} pares de sapatos, é possível montar {v} combinações diferentes.`, a * b * c, a + b + c, `PFC: ${a}·${b}·${c}.`, fmt,
      `Pelo princípio fundamental da contagem, multiplicam-se as opções de cada etapa: ${a} × ${b} × ${c} = ${a * b * c}.`, 'Escolhas em sequência (camisa E calça E sapato) se multiplicam, não se somam.'));
  }
  for (let i = 0; i < 8; i++) {
    const d = int(3, 5);
    q.push(me(`Quantas senhas de ${d} algarismos (0 a 9) podem ser formadas, permitindo repetição?`, 10 ** d, [[arr(10, d), 'Esse é o resultado sem repetição.'], [10 * d, 'Multiplicou em vez de elevar.'], [9 ** d, 'Esqueceu um dos algarismos (são 10, de 0 a 9).'], [10 ** (d - 1), 'Contou uma posição a menos.']], `10^${d}.`, fmt,
      `Cada uma das ${d} posições pode ter qualquer um dos 10 algarismos (com repetição): ${Array(d).fill(10).join(' × ')} = ${(10 ** d).toLocaleString('pt-BR')}.`));
  }
  return q;
}

function probabilidade() {
  const q = [
    C('Probabilidade é a razão entre o número de casos favoráveis e o de casos possíveis.', 'Definição clássica.',
      'P = favoráveis ÷ possíveis, quando todos os resultados têm a mesma chance. Exemplo: sair 3 num dado = 1/6.'),
    C('A probabilidade de um evento está sempre entre 0 e 1.', 'Propriedade.',
      '0 é o evento impossível e 1 é o evento certo. Em porcentagem, de 0% a 100%.'),
    C('A probabilidade do evento complementar é 1 − P(A).', 'Complementar.',
      'Ou o evento acontece, ou não acontece: as duas chances somam 1. Exemplo: se P(chover) = 0,3, P(não chover) = 0,7.'),
    C('Para eventos independentes, P(A e B) = P(A) · P(B).', 'Multiplicação.',
      'Quando um evento não interfere no outro, multiplica-se. Exemplo: duas caras em duas moedas = 1/2 × 1/2 = 1/4.', '“E” multiplica; “ou” (de eventos que não acontecem juntos) soma.'),
    C('Para eventos mutuamente exclusivos, P(A ou B) = P(A) + P(B).', 'Adição.',
      'Se os eventos não podem acontecer juntos, soma-se. Exemplo: sair 1 ou 2 num dado = 1/6 + 1/6 = 2/6 = 1/3.'),
    C('No lançamento de uma moeda honesta, a probabilidade de sair cara é 1/2.', 'Equiprovável.',
      'Há 2 resultados possíveis com a mesma chance: 1 favorável em 2.'),
    C('No lançamento de um dado honesto, a probabilidade de sair número par é 1/2.', '3/6.',
      'Pares: 2, 4 e 6 = 3 casos em 6. 3/6 = 1/2.'),
    C('No lançamento de duas moedas, a probabilidade de saírem duas caras é 1/4.', '1/2 · 1/2.',
      'Resultados possíveis: CC, CK, KC, KK (4). Só CC é favorável: 1/4. Ou: 1/2 × 1/2 = 1/4.'),
  ];
  for (let i = 0; i < 14; i++) {
    const az = int(1, 9), vm = int(1, 9), br = int(0, 6), tot = az + vm + br;
    q.push(me(`Uma urna tem ${az} bolas azuis, ${vm} vermelhas e ${br} brancas. Retirando uma ao acaso, a probabilidade de ser azul é:`, az / tot, [[vm / tot, 'Essa é a chance de vermelha.'], [az / (tot + az), 'Contou as azuis duas vezes no total.'], [1 / tot, 'Considerou só uma bola azul.'], [(az + 1) / tot, CONTA], [(az + 2) / (tot + 3), CONTA]], `${az}/${tot} = ${frac(az, tot)}.`, fr,
      `Total de bolas: ${az} + ${vm} + ${br} = ${tot}. Favoráveis (azuis): ${az}. P = ${az}/${tot}${frac(az, tot) !== `${az}/${tot}` ? ` = ${frac(az, tot)} (simplificando)` : ''}.`));
  }
  const dado = [['sair 6', 1, 6, 'só o 6'], ['sair número maior que 4', 2, 6, '5 e 6'], ['sair número primo', 3, 6, '2, 3 e 5 (o 1 não é primo)'], ['sair múltiplo de 3', 2, 6, '3 e 6'], ['sair número menor que 3', 2, 6, '1 e 2']];
  dado.forEach(([t, f, n, quais]) => q.push(ce(`No lançamento de um dado honesto, a probabilidade de ${t} é {v}.`, f / n, (f + 1) / n, `${f}/${n}.`, fr,
    `O dado tem 6 resultados. Favoráveis: ${quais}, ou seja, ${f}. P = ${f}/6${frac(f, 6) !== `${f}/6` ? ` = ${frac(f, 6)}` : ''}.`)));
  for (let i = 0; i < 10; i++) {
    const n = int(2, 5);
    q.push(me(`Lançando ${n} moedas honestas, a probabilidade de todas darem cara é:`, 1 / 2 ** n, [[1 / (2 * n), 'Multiplicou 2 por n em vez de elevar.'], [1 / 2 ** (n + 1), 'Contou uma moeda a mais.'], [1 / 2 ** (n - 1), 'Contou uma moeda a menos.'], [3 / 2 ** n, CONTA], [1 / (n + 1), CONTA], [1 / n, CONTA]], `(1/2)^${n}.`, fr,
      `Cada moeda dá cara com chance 1/2, e as moedas são independentes: multiplica-se. (1/2)^${n} = 1/${2 ** n}.`));
  }
  for (let i = 0; i < 10; i++) {
    const s = pick([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); let f = 0; const casos = []; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === s) { f++; casos.push(`(${a},${b})`); }
    q.push(me(`Lançando dois dados, a probabilidade de a soma ser ${s} é:`, f / 36, [[(f + 1) / 36, 'Contou um caso a mais.'], [(f + 2) / 36, 'Contou dois casos a mais.'], [f / 18 === f / 36 ? 1 / 2 : (f + 3) / 36, CONTA], [1 / 36, 'Considerou um só caso.'], [1 / 6, CONTA], [1 / 3, CONTA]], `${f} casos em 36.`, fr,
      `Dois dados dão 6 × 6 = 36 resultados. Soma ${s}: ${casos.join(', ')} = ${f} caso(s). P = ${f}/36${frac(f, 36) !== `${f}/36` ? ` = ${frac(f, 36)}` : ''}.`, '(1,2) e (2,1) são resultados diferentes: conte os dois.'));
  }
  return q;
}

function estatistica() {
  const q = [
    C('A média aritmética é a soma dos valores dividida pela quantidade de valores.', 'Definição.',
      'Exemplo: média de 4, 6 e 8 = (4 + 6 + 8) ÷ 3 = 6.'),
    C('A mediana é o valor central de um conjunto ordenado.', 'Definição.',
      'Primeiro ordene os valores. Com quantidade ímpar, a mediana é o do meio. Exemplo: 3, 5, 9 → mediana 5.', 'Sempre ordene antes de achar a mediana.'),
    C('Com número par de valores, a mediana é a média dos dois valores centrais.', 'Definição.',
      'Exemplo: 2, 4, 6, 8 → os centrais são 4 e 6 → mediana (4 + 6) ÷ 2 = 5.'),
    C('A moda é o valor que mais se repete.', 'Definição.',
      'Exemplo: em 2, 3, 3, 5, 3, 7, a moda é 3.'),
    C('Um conjunto pode ser amodal, unimodal ou multimodal.', 'Moda.',
      'Amodal: nenhum valor se repete mais que os outros. Unimodal: uma moda. Bimodal ou multimodal: duas ou mais modas.'),
    C('A amplitude é a diferença entre o maior e o menor valor.', 'Dispersão.',
      'Exemplo: em 3, 8, 15, a amplitude é 15 − 3 = 12.'),
    C('O desvio padrão é a raiz quadrada da variância.', 'Dispersão.',
      'A variância mede o quanto os valores se afastam da média (em unidades ao quadrado). O desvio padrão tira a raiz para voltar à unidade original.'),
    C('Somar uma constante a todos os valores não altera o desvio padrão.', 'Propriedade.',
      'Somar o mesmo número a todos desloca o conjunto inteiro, mas a distância entre os valores não muda. A média aumenta, a dispersão fica igual.'),
    C('Multiplicar todos os valores por k multiplica a média por k.', 'Propriedade.',
      'Exemplo: média 5; dobrando todos os valores, a média vira 10. O desvio padrão também fica multiplicado por k (em módulo).'),
  ];
  for (let i = 0; i < 14; i++) {
    const n = pick([5, 6, 7]), vals = Array.from({ length: n }, () => int(1, 20)); const soma = vals.reduce((a, b) => a + b, 0), media = soma / n;
    const ord = [...vals].sort((a, b) => a - b), med = n % 2 ? ord[(n - 1) / 2] : (ord[n / 2 - 1] + ord[n / 2]) / 2;
    const amp = Math.max(...vals) - Math.min(...vals);
    if (i % 2) q.push(me(`A média dos valores ${vals.join(', ')} é:`, media, [[med, 'Essa é a mediana.'], [media + 1, CONTA], [media - 1, CONTA], [amp, 'Essa é a amplitude.']], `Soma ${soma} ÷ ${n}.`, fmt,
      `Some todos: ${vals.join(' + ')} = ${soma}. Divida pela quantidade (${n}): ${soma} ÷ ${n} = ${fmt(media)}.`));
    else q.push(me(`A mediana dos valores ${vals.join(', ')} é:`, med, [[media, 'Essa é a média.'], [ord[0], 'Esse é o menor valor.'], [ord[n - 1], 'Esse é o maior valor.'], [med + 1, CONTA]], `Ordenados: ${ord.join(', ')}.`, fmt,
      `Ordene: ${ord.join(', ')}. ${n % 2 ? `Com ${n} valores (ímpar), a mediana é o ${(n + 1) / 2}º: ${med}.` : `Com ${n} valores (par), a mediana é a média dos dois centrais: (${ord[n / 2 - 1]} + ${ord[n / 2]}) ÷ 2 = ${fmt(med)}.`}`, 'Não pegue o valor do meio da lista desordenada.'));
  }
  for (let i = 0; i < 10; i++) {
    const m = int(3, 15), rep = int(3, 4), outros = []; while (outros.length < 4) { const x = int(1, 20); if (x !== m && !outros.includes(x)) outros.push(x); }
    const vals = [...outros, ...Array(rep).fill(m)].sort(() => rnd() - 0.5);
    q.push(ce(`A moda do conjunto ${vals.join(', ')} é {v}.`, m, outros[0], `${m} aparece ${rep} vezes.`, fmt,
      `Moda é o valor que mais se repete. O ${m} aparece ${rep} vezes; os outros (${outros.join(', ')}) aparecem uma vez cada.`));
  }
  for (let i = 0; i < 14; i++) {
    const vals = Array.from({ length: 6 }, () => int(2, 40)); const mx = Math.max(...vals), mn = Math.min(...vals), amp = mx - mn;
    q.push(me(`A amplitude do conjunto ${vals.join(', ')} é:`, amp, [[mx, 'Esse é só o maior valor.'], [amp + 1, CONTA], [amp - 2, CONTA], [mn, 'Esse é só o menor valor.']], 'Maior − menor.', fmt,
      `Amplitude = maior − menor. Maior: ${mx}; menor: ${mn}. ${mx} − ${mn} = ${amp}.`));
  }
  return q;
}

function conjuntos() {
  const q = [
    C('n(A ∪ B) = n(A) + n(B) − n(A ∩ B).', 'Princípio da inclusão-exclusão.',
      'Quem está nos dois conjuntos foi contado duas vezes (em A e em B). Por isso se subtrai a interseção uma vez.'),
    C('A interseção A ∩ B contém os elementos comuns a A e B.', 'Definição.',
      'Interseção = “e”: está em A E em B. Exemplo: {1,2,3} ∩ {2,3,4} = {2,3}.'),
    C('A união A ∪ B contém os elementos que pertencem a A ou a B.', 'Definição.',
      'União = “ou”: está em A, em B ou nos dois. Exemplo: {1,2} ∪ {2,3} = {1,2,3}.'),
    C('A diferença A − B contém os elementos de A que não pertencem a B.', 'Definição.',
      'Exemplo: {1,2,3} − {2,3,4} = {1}. Corresponde a “só A”.'),
    C('O conjunto vazio é subconjunto de qualquer conjunto.', 'Propriedade.',
      'Para ∅ não ser subconjunto de A, ele teria que ter um elemento fora de A, mas ∅ não tem elementos.'),
    C('Um conjunto com n elementos tem 2ⁿ subconjuntos.', 'Propriedade.',
      'Para formar um subconjunto, cada elemento entra ou não entra (2 opções). Com n elementos: 2ⁿ. Isso inclui o vazio e o próprio conjunto.'),
    C('Todo número natural é inteiro, e todo inteiro é racional.', 'ℕ ⊂ ℤ ⊂ ℚ.',
      'Naturais (0, 1, 2...) estão dentro dos inteiros (que incluem negativos), que estão dentro dos racionais (frações). Exemplo: 5 = 5/1.'),
    C('√2 é um número irracional.', 'Não é razão de inteiros.',
      '√2 = 1,41421... tem infinitas casas decimais sem repetição e não pode ser escrito como fração de inteiros.'),
  ];
  for (let i = 0; i < 16; i++) {
    const ab = int(3, 30), a = ab + int(5, 40), b = ab + int(5, 40), u = a + b - ab;
    const t = pick([['estudam inglês', 'estudam espanhol'], ['leem jornal', 'leem revista'], ['votaram em X', 'votaram em Y'], ['usam ônibus', 'usam metrô']]);
    q.push(i % 2
      ? me(`Numa pesquisa, ${a} pessoas ${t[0]}, ${b} ${t[1]} e ${ab} fazem as duas coisas. Quantas fazem pelo menos uma delas?`, u, [[a + b, 'Contou duas vezes quem faz as duas coisas.'], [u + ab, CONTA], [u - ab, 'Subtraiu a interseção duas vezes.'], [a + b + ab, 'Somou a interseção em vez de subtrair.']], `${a} + ${b} − ${ab}.`, fmt,
        `“Pelo menos uma” é a união. n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = ${a} + ${b} − ${ab} = ${u}. Os ${ab} que fazem as duas coisas foram contados duas vezes, por isso se subtrai uma vez.`, 'Quem faz as duas coisas já está dentro dos dois totais.')
      : me(`Numa pesquisa, ${a} pessoas ${t[0]}, ${b} ${t[1]} e ${ab} fazem as duas coisas. Quantas fazem só a primeira?`, a - ab, [[a, 'Incluiu quem faz as duas coisas.'], [ab, 'Essa é a interseção.'], [b - ab, 'Essa é “só a segunda”.'], [a + ab, 'Somou a interseção em vez de subtrair.']], `${a} − ${ab}.`, fmt,
        `Os ${a} da primeira incluem os ${ab} que fazem as duas. “Só a primeira” = ${a} − ${ab} = ${a - ab}.`));
  }
  for (let i = 0; i < 12; i++) {
    const n = int(2, 7);
    q.push(ce(`Um conjunto com ${n} elementos possui {v} subconjuntos.`, 2 ** n, 2 * n, `2^${n}.`, fmt,
      `Número de subconjuntos = 2ⁿ = 2^${n} = ${2 ** n} (incluindo o vazio e o próprio conjunto).`, 'É 2 elevado a n, e não 2 vezes n.'));
  }
  for (let i = 0; i < 11; i++) {
    const tot = int(80, 200), a = int(30, 60), b = int(30, 60), ab = int(5, 25), u = a + b - ab, nenhum = tot - u;
    q.push(me(`Num grupo de ${tot} pessoas, ${a} gostam de futebol, ${b} de vôlei e ${ab} de ambos. Quantas não gostam de nenhum?`, nenhum, [[tot - a - b, 'Esqueceu de devolver a interseção (contou quem gosta de ambos duas vezes).'], [nenhum + ab, CONTA], [tot - ab, 'Tirou só a interseção.'], [nenhum - ab, 'Subtraiu a interseção de novo.']], `${tot} − (${a} + ${b} − ${ab}).`, fmt,
      `Primeiro, quem gosta de pelo menos um: ${a} + ${b} − ${ab} = ${u}. Depois, nenhum = total − união = ${tot} − ${u} = ${nenhum}.`));
  }
  return q;
}

function geometria() {
  const q = [
    C('A área do retângulo é base × altura.', 'Fórmula.',
      'Exemplo: retângulo de 5 m por 3 m tem área 15 m².'),
    C('A área do triângulo é (base × altura) / 2.', 'Fórmula.',
      'O triângulo é metade de um retângulo de mesma base e altura. Exemplo: base 6 e altura 4 → (6 × 4) ÷ 2 = 12.'),
    C('A área do círculo é π · r².', 'Fórmula.',
      'Exemplo: raio 2 → π × 4 ≈ 12,56. Não confunda com o comprimento da circunferência (2πr).'),
    C('O comprimento da circunferência é 2 · π · r.', 'Fórmula.',
      'É a medida do contorno. Exemplo: raio 5 → 2 × 3,14 × 5 = 31,4.'),
    C('O volume do paralelepípedo é comprimento × largura × altura.', 'Fórmula.',
      'Exemplo: caixa de 2 m × 3 m × 1 m = 6 m³.'),
    C('1 m³ corresponde a 1.000 litros.', 'Conversão.',
      '1 m³ é um cubo de 10 dm de lado: 10 × 10 × 10 = 1.000 dm³, e 1 dm³ = 1 litro.'),
    C('A soma dos ângulos internos de um triângulo é 180°.', 'Propriedade.',
      'Vale para qualquer triângulo. Num polígono de n lados, a soma é (n − 2) × 180°.'),
    C('Pelo teorema de Pitágoras, num triângulo retângulo, a² = b² + c², sendo a a hipotenusa.', 'Teorema.',
      'A hipotenusa é o maior lado, oposto ao ângulo reto. Exemplo: catetos 3 e 4 → 9 + 16 = 25 → hipotenusa 5.'),
    C('Se as medidas lineares de uma figura são multiplicadas por k, a área fica multiplicada por k².', 'Semelhança.',
      'Área tem duas dimensões. Dobrando os lados de um quadrado, a área fica 4 vezes maior (2²).'),
    C('Se as medidas lineares de um sólido são multiplicadas por k, o volume fica multiplicado por k³.', 'Semelhança.',
      'Volume tem três dimensões. Dobrando as arestas de um cubo, o volume fica 8 vezes maior (2³).'),
  ];
  for (let i = 0; i < 10; i++) {
    const b = int(3, 25), h = int(2, 20);
    q.push(i % 2
      ? me(`A área de um retângulo de ${b} m por ${h} m é:`, b * h, [[2 * (b + h), 'Esse é o perímetro.'], [b * h / 2, 'Dividiu por 2, como no triângulo.'], [b + h, 'Somou os lados.'], [b * h + b, CONTA]], 'b × h.', (n) => fmt(n) + ' m²',
        `Área do retângulo = base × altura = ${b} × ${h} = ${b * h} m².`, 'Área (b × h) não é perímetro (soma de todos os lados).')
      : ce(`A área de um triângulo de base ${b} cm e altura ${h} cm é {v} cm².`, (b * h) / 2, b * h, '(b·h)/2.', fmt,
        `Área do triângulo = (base × altura) ÷ 2 = (${b} × ${h}) ÷ 2 = ${b * h} ÷ 2 = ${fmt((b * h) / 2)} cm².`, 'Não esqueça de dividir por 2.'));
  }
  for (let i = 0; i < 8; i++) {
    const r = int(1, 10);
    q.push(me(`Usando π = 3,14, a área de um círculo de raio ${r} m é:`, 3.14 * r * r, [[2 * 3.14 * r, 'Esse é o comprimento da circunferência (2πr).'], [3.14 * r, 'Esqueceu de elevar o raio ao quadrado.'], [3.14 * r * r * 2, 'Multiplicou por 2 sem motivo.'], [3.14 * (r + 1) ** 2, 'Usou o raio errado.']], 'π·r².', (n) => fmt(n) + ' m²',
      `Área = π · r² = 3,14 × ${r}² = 3,14 × ${r * r} = ${fmt(3.14 * r * r)} m².`));
  }
  const ternos = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25]];
  ternos.forEach(([a, b, c]) => q.push(me(`Num triângulo retângulo de catetos ${a} e ${b}, a hipotenusa mede:`, c, [[a + b, 'Somou os catetos: Pitágoras soma os quadrados.'], [c + 1, CONTA], [c - 1, CONTA], [b + 1, CONTA]], `${a}² + ${b}² = ${c}².`, fmt,
    `Pitágoras: hipotenusa² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}. Hipotenusa = √${c * c} = ${c}.`)));
  for (let i = 0; i < 10; i++) {
    const c = int(1, 6), l = int(1, 5), h = int(1, 4), v = c * l * h;
    q.push(i % 2
      ? me(`Uma caixa-d'água de ${c} m × ${l} m × ${h} m tem capacidade de:`, v * 1000, [[v * 100, 'Conversão errada: 1 m³ = 1.000 L.'], [v * 10, 'Conversão errada: 1 m³ = 1.000 L.'], [v, 'Esse é o volume em m³, não em litros.'], [v * 10000, 'Conversão errada: 1 m³ = 1.000 L.']], `${v} m³ = ${v * 1000} L.`, (n) => n.toLocaleString('pt-BR') + ' litros',
        `Volume = ${c} × ${l} × ${h} = ${v} m³. Como 1 m³ = 1.000 litros: ${v} × 1.000 = ${(v * 1000).toLocaleString('pt-BR')} litros.`)
      : ce(`O volume de um paralelepípedo de ${c} m × ${l} m × ${h} m é {v} m³.`, v, c + l + h, 'c × l × h.', fmt,
        `Volume = comprimento × largura × altura = ${c} × ${l} × ${h} = ${v} m³.`, 'Volume multiplica as três medidas, não soma.'));
  }
  for (let i = 0; i < 6; i++) {
    const a1 = int(20, 80), a2 = int(20, 70);
    q.push(me(`Num triângulo, dois ângulos medem ${a1}° e ${a2}°. O terceiro ângulo mede:`, 180 - a1 - a2, [[180 - a1, 'Subtraiu só um dos ângulos.'], [90 - a2, 'Usou 90° em vez de 180°.'], [180 - a1 - a2 + 10, CONTA], [a1 + a2, 'Essa é a soma dos dois ângulos dados.']], '180° − soma.', (n) => n + '°',
      `A soma dos ângulos internos é 180°. Terceiro ângulo = 180° − (${a1}° + ${a2}°) = 180° − ${a1 + a2}° = ${180 - a1 - a2}°.`));
  }
  return q;
}

export const QRLM = {
  proposicoes: proposicoes(), equivalencias: equivalencias(), equacoes: equacoes(), funcoes: funcoes(), razao: razao(), porcentagem: porcentagem(),
  sequencias: sequencias(), contagem: contagem(), probabilidade: probabilidade(), estatistica: estatistica(), conjuntos: conjuntos(), geometria: geometria(),
};
