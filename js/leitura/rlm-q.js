// Raciocínio Lógico — banco de questões. As questões numéricas são geradas com cálculo exato
// (sorteio fixo, sempre as mesmas questões), e as conceituais foram escritas à mão.
import { C, E, M } from './blocos.js';

// ---------- utilitários ----------
let semente = 20261104;
const rnd = () => { semente = (semente * 1103515245 + 12345) % 2147483648; return semente / 2147483648; };
const int = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
const fmt = (n) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100).replace('.', ','));
const real = (n) => 'R$ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
// múltipla escolha com 5 alternativas distintas; a correta em posição sorteada
function me(p, certo, distr, e, f = fmt) {
  const ops = [certo]; for (const d of distr) if (!ops.some((o) => f(o) === f(d)) && ops.length < 5) ops.push(d);
  let k = 1; while (ops.length < 5) { const d = certo + k * (k % 2 ? 1 : -1) * Math.max(1, Math.abs(Math.round(certo / 10))); if (!ops.some((o) => f(o) === f(d))) ops.push(d); k++; }
  const pos = int(0, 4); const outros = ops.slice(1); outros.splice(pos, 0, certo);
  return M(p, outros.map(f), pos, e);
}
// certo/errado: metade com valor verdadeiro, metade com valor alterado
function ce(p, certo, errado, e, f = fmt) {
  return rnd() < 0.5 ? C(p.replace('{v}', f(certo)), e) : E(p.replace('{v}', f(errado)), `${e} O correto é ${f(certo)}.`);
}
const fat = (n) => (n <= 1 ? 1 : n * fat(n - 1));
const comb = (n, k) => fat(n) / (fat(k) * fat(n - k));
const arr = (n, k) => fat(n) / fat(n - k);
const mdc = (a, b) => (b ? mdc(b, a % b) : a);
const frac = (a, b) => { const g = mdc(a, b); return `${a / g}/${b / g}`; };
const fr = (x) => { for (let d = 1; d <= 512; d++) { const n = Math.round(x * d); if (Math.abs(n / d - x) < 1e-9) return d === 1 ? String(n) : frac(n, d); } return fmt(x); };

// ---------- lógica proposicional ----------
const OPS = {
  '∧': (p, q) => p && q, '∨': (p, q) => p || q, '→': (p, q) => !p || q, '↔': (p, q) => p === q, '⊻': (p, q) => p !== q,
};
const VF = (b) => (b ? 'verdadeira' : 'falsa');
function proposicoes() {
  const q = [
    C('Proposição é toda sentença declarativa que pode ser classificada como verdadeira ou falsa, mas não ambas.', 'Princípios da não contradição e do terceiro excluído.'),
    E('A sentença “Que dia lindo!” é uma proposição.', 'Exclamativa não é proposição.'),
    E('A sentença “Feche a porta.” é uma proposição.', 'Imperativa não é proposição.'),
    E('A sentença “x + 2 = 5” é uma proposição.', 'É sentença aberta: depende de x.'),
    C('A conjunção p ∧ q só é verdadeira quando p e q são verdadeiras.', 'Tabela-verdade.'),
    C('A disjunção p ∨ q só é falsa quando p e q são falsas.', 'Tabela-verdade.'),
    C('A condicional p → q só é falsa quando p é verdadeira e q é falsa.', '“Vera Fischer é falsa”.'),
    C('A bicondicional p ↔ q é verdadeira quando p e q têm o mesmo valor lógico.', 'Tabela-verdade.'),
    C('A disjunção exclusiva p ⊻ q é verdadeira quando p e q têm valores diferentes.', '“Ou p ou q”.'),
    C('Uma tabela-verdade com n proposições simples tem 2ⁿ linhas.', 'Ex.: 3 proposições → 8 linhas.'),
    C('Tautologia é a proposição composta sempre verdadeira, como p ∨ ¬p.', 'Conceito.'),
    C('Contradição é a proposição composta sempre falsa, como p ∧ ¬p.', 'Conceito.'),
    C('Contingência é a proposição composta que pode ser verdadeira ou falsa conforme os valores das simples.', 'Conceito.'),
    C('Na condicional “Se chove, então a rua molha”, “chove” é o antecedente e “a rua molha” é o consequente.', 'Estrutura.'),
    C('“p é condição suficiente para q” equivale a p → q.', 'Linguagem.'),
    C('“q é condição necessária para p” equivale a p → q.', 'Linguagem.'),
    C('“p somente se q” equivale a p → q.', 'Linguagem.'),
  ];
  const nomes = { '∧': 'conjunção', '∨': 'disjunção', '→': 'condicional', '↔': 'bicondicional', '⊻': 'disjunção exclusiva' };
  for (let i = 0; i < 22; i++) {
    const op = pick(Object.keys(OPS)), p = rnd() < 0.5, r = rnd() < 0.5, v = OPS[op](p, r);
    const afirma = rnd() < 0.5 ? v : !v;
    q.push((afirma === v ? C : E)(`Se p é ${VF(p)} e q é ${VF(r)}, a ${nomes[op]} p ${op} q é ${VF(afirma)}.`, `p ${op} q é ${VF(v)}.`));
  }
  for (let i = 0; i < 10; i++) {
    const p = rnd() < 0.5, r = rnd() < 0.5, s = rnd() < 0.5;
    const v = OPS['→'](OPS['∧'](p, r), s);
    q.push(M(`Sabendo que p é ${VF(p)}, q é ${VF(r)} e r é ${VF(s)}, o valor lógico de (p ∧ q) → r é:`, ['verdadeiro', 'falso', 'indeterminado', 'depende de p', 'não é proposição'], v ? 0 : 1, `p ∧ q é ${VF(p && r)}; então a condicional é ${VF(v)}.`));
  }
  q.push(M('Quantas linhas tem a tabela-verdade de uma proposição com 4 proposições simples?', ['4', '8', '12', '16', '32'], 3, '2⁴ = 16.'));
  q.push(M('A proposição sempre verdadeira é chamada de:', ['contradição', 'contingência', 'tautologia', 'falácia', 'paradoxo'], 2, 'Conceito.'));
  q.push(M('A condicional p → q é falsa quando:', ['p e q são verdadeiras', 'p é falsa e q verdadeira', 'p é verdadeira e q falsa', 'p e q são falsas', 'nunca'], 2, 'Tabela-verdade.'));
  return q;
}

function equivalencias() {
  return [
    C('A negação de “p e q” é “não p ou não q”.', 'Lei de De Morgan.'),
    C('A negação de “p ou q” é “não p e não q”.', 'Lei de De Morgan.'),
    C('A negação de “Se p, então q” é “p e não q”.', '¬(p → q) ≡ p ∧ ¬q.'),
    E('A negação de “Se estudo, então passo” é “Se não estudo, então não passo”.', 'A negação é “Estudo e não passo”.'),
    C('“Se p, então q” é equivalente a “Se não q, então não p”.', 'Contrapositiva.'),
    C('“Se p, então q” é equivalente a “Não p ou q”.', 'p → q ≡ ¬p ∨ q.'),
    E('“Se p, então q” é equivalente a “Se q, então p”.', 'Essa é a recíproca, que não é equivalente.'),
    E('“Se p, então q” é equivalente a “Se não p, então não q”.', 'Essa é a inversa, não equivalente.'),
    C('“Se chove, a rua fica molhada” equivale a “Se a rua não está molhada, não choveu”.', 'Contrapositiva.'),
    C('“Se chove, a rua fica molhada” equivale a “Não chove ou a rua fica molhada”.', '¬p ∨ q.'),
    C('A negação de “p se e somente se q” é “p ou q, mas não ambos”.', '¬(p ↔ q) ≡ p ⊻ q.'),
    C('A dupla negação de p equivale a p.', '¬¬p ≡ p.'),
    C('A negação de “Todos os alunos passaram” é “Algum aluno não passou”.', 'Quantificadores.'),
    E('A negação de “Todos os alunos passaram” é “Nenhum aluno passou”.', 'É “Algum aluno não passou”.'),
    C('A negação de “Algum servidor é honesto” é “Nenhum servidor é honesto”.', 'Quantificadores.'),
    C('A negação de “Nenhum político é honesto” é “Algum político é honesto”.', 'Quantificadores.'),
    C('A negação de “Algum carro não é azul” é “Todo carro é azul”.', 'Quantificadores.'),
    C('“Todo A é B” não implica que “todo B é A”.', 'Recíproca não vale.'),
    C('A negação de “João é alto e Maria é baixa” é “João não é alto ou Maria não é baixa”.', 'De Morgan.'),
    C('A negação de “Pedro estuda ou trabalha” é “Pedro não estuda e não trabalha”.', 'De Morgan.'),
    C('A negação de “Se o réu é culpado, então será preso” é “O réu é culpado e não será preso”.', 'p ∧ ¬q.'),
    C('“p ↔ q” equivale a “(p → q) ∧ (q → p)”.', 'Bicondicional.'),
    C('A proposição “p → q” é equivalente a “¬q → ¬p”, e ambas são falsas na mesma linha da tabela.', 'Equivalência.'),
    E('A negação de “Maria é rica” é “Maria é pobre”.', 'A negação é “Maria não é rica”.'),
    C('“Nenhum A é B” equivale a “Todo A não é B”.', 'Quantificadores.'),
    C('A negação de “Existe um número par primo” é “Todo número par não é primo”.', 'Quantificadores.'),
    C('“Se não estudar, não passará” equivale a “Se passou, estudou”.', 'Contrapositiva.'),
    C('Pela distributiva, p ∧ (q ∨ r) equivale a (p ∧ q) ∨ (p ∧ r).', 'Propriedade.'),
    C('Pela absorção, p ∨ (p ∧ q) equivale a p.', 'Propriedade.'),
    C('“p → q” equivale a “¬(p ∧ ¬q)”.', 'Equivalência.'),
    M('A negação de “Todos os candidatos estudaram” é:', ['Nenhum candidato estudou.', 'Algum candidato não estudou.', 'Todos os candidatos não estudaram.', 'Algum candidato estudou.', 'Nenhum candidato deixou de estudar.'], 1, 'Quantificadores.'),
    M('A negação de “Se bebe, não dirige” é:', ['Se não bebe, dirige.', 'Bebe e dirige.', 'Não bebe e não dirige.', 'Bebe ou dirige.', 'Se dirige, bebe.'], 1, '¬(p → q) ≡ p ∧ ¬q.'),
    M('“Se sou aprovado, então comemoro” equivale a:', ['Se não sou aprovado, não comemoro.', 'Se comemoro, sou aprovado.', 'Se não comemoro, não sou aprovado.', 'Sou aprovado e não comemoro.', 'Não sou aprovado e comemoro.'], 2, 'Contrapositiva.'),
    M('A negação de “Ana é médica ou Bia é advogada” é:', ['Ana não é médica ou Bia não é advogada.', 'Ana não é médica e Bia não é advogada.', 'Ana é médica e Bia é advogada.', 'Se Ana é médica, Bia não é advogada.', 'Ana não é médica, então Bia é advogada.'], 1, 'De Morgan.'),
    M('A negação de “Algum policial é corrupto” é:', ['Todo policial é corrupto.', 'Algum policial não é corrupto.', 'Nenhum policial é corrupto.', 'Nem todo policial é corrupto.', 'Existe policial honesto.'], 2, 'Quantificadores.'),
    M('“Se chove, então levo guarda-chuva” equivale a:', ['Chove e levo guarda-chuva.', 'Não chove ou levo guarda-chuva.', 'Chove ou não levo guarda-chuva.', 'Se levo guarda-chuva, chove.', 'Se não chove, não levo guarda-chuva.'], 1, '¬p ∨ q.'),
    M('A negação de “João é policial e Pedro é bombeiro” é:', ['João não é policial e Pedro não é bombeiro.', 'João não é policial ou Pedro não é bombeiro.', 'João é policial ou Pedro é bombeiro.', 'Se João é policial, Pedro é bombeiro.', 'João é policial e Pedro não é bombeiro.'], 1, 'De Morgan.'),
    M('A recíproca de p → q é:', ['¬q → ¬p', 'q → p', '¬p → ¬q', 'p ∧ ¬q', '¬p ∨ q'], 1, 'Troca de posição.'),
    M('A contrapositiva de p → q é:', ['q → p', '¬p → ¬q', '¬q → ¬p', 'p ∨ q', 'p ↔ q'], 2, 'Equivalente.'),
    M('A negação de “Nenhum aluno faltou” é:', ['Todos faltaram.', 'Algum aluno faltou.', 'Nenhum aluno compareceu.', 'Algum aluno não faltou.', 'Todo aluno compareceu.'], 1, 'Quantificadores.'),
    M('A negação de “p ↔ q” equivale a:', ['p ∧ q', 'p ⊻ q (ou p ou q)', '¬p ↔ ¬q', 'p → q', '¬p ∧ ¬q'], 1, 'Disjunção exclusiva.'),
    M('“Todo servidor é concursado” tem como negação:', ['Nenhum servidor é concursado.', 'Algum servidor não é concursado.', 'Todo concursado é servidor.', 'Algum concursado não é servidor.', 'Nenhum concursado é servidor.'], 1, 'Quantificadores.'),
    M('“Não é verdade que estudo e trabalho” equivale a:', ['Não estudo e não trabalho.', 'Não estudo ou não trabalho.', 'Estudo ou trabalho.', 'Se estudo, trabalho.', 'Estudo e não trabalho.'], 1, 'De Morgan.'),
    M('A proposição equivalente a “p → q” é:', ['q → p', '¬p → ¬q', '¬p ∨ q', 'p ∧ q', 'p ∨ ¬q'], 2, 'Equivalência.'),
    M('Se “Todo A é B” é verdadeira, então é necessariamente verdadeira:', ['Todo B é A.', 'Algum A é B (se existir A).', 'Nenhum B é A.', 'Algum B não é A.', 'Nenhum A é B.'], 1, 'Silogismo.'),
    M('A negação de “Algum carro é vermelho” é:', ['Todo carro é vermelho.', 'Nenhum carro é vermelho.', 'Algum carro não é vermelho.', 'Todo carro não é azul.', 'Nem todo carro é vermelho.'], 1, 'Quantificadores.'),
    M('“Se não pago, sou multado” equivale a:', ['Pago ou sou multado.', 'Se sou multado, não pago.', 'Não pago e sou multado.', 'Se pago, não sou multado.', 'Pago e não sou multado.'], 0, '¬p → q ≡ p ∨ q.'),
    M('A negação de “Se é domingo, então descanso” é:', ['Não é domingo e descanso.', 'É domingo e não descanso.', 'Se não é domingo, não descanso.', 'É domingo ou descanso.', 'Se descanso, é domingo.'], 1, 'p ∧ ¬q.'),
  ];
}

// ---------- matemática ----------
function equacoes() {
  const q = [
    C('A equação 2x + 6 = 0 tem como solução x = −3.', '2x = −6.'),
    C('Uma equação do 2º grau ax² + bx + c = 0 tem duas raízes reais distintas quando Δ = b² − 4ac > 0.', 'Discriminante.'),
    C('Quando Δ = 0, a equação do 2º grau tem duas raízes reais iguais.', 'Discriminante.'),
    C('Quando Δ < 0, a equação do 2º grau não tem raízes reais.', 'Discriminante.'),
    C('A soma das raízes de ax² + bx + c = 0 é −b/a e o produto é c/a.', 'Relações de Girard.'),
    C('Um sistema linear com duas equações e duas incógnitas pode ser resolvido por substituição ou por adição.', 'Métodos.'),
  ];
  for (let i = 0; i < 12; i++) {
    const x = int(-9, 15), a = int(2, 9), b = int(-20, 20), c = a * x + b;
    const p = `Na equação ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${c}, o valor de x é`;
    q.push(i % 2 ? me(`${p}:`, x, [x + 1, x - 1, -x, x + 2], `${a}x = ${c - b} → x = ${x}.`) : ce(`${p} {v}.`, x, x + int(1, 3), `${a}x = ${c - b}.`));
  }
  for (let i = 0; i < 12; i++) {
    const r1 = int(-6, 8), r2 = int(-6, 8), S = r1 + r2, P = r1 * r2;
    const eq = `x² ${S > 0 ? '−' : '+'} ${Math.abs(S)}x ${P < 0 ? '−' : '+'} ${Math.abs(P)} = 0`;
    if (i % 3 === 0) q.push(me(`A soma das raízes de ${eq} é:`, S, [-S, P, S + 1, S - 2], 'Soma = −b/a.'));
    else if (i % 3 === 1) q.push(me(`O produto das raízes de ${eq} é:`, P, [-P, S, P + 2, P - 1], 'Produto = c/a.'));
    else q.push(ce(`Uma das raízes de ${eq} é {v}.`, r1, Math.max(r1, r2) + int(1, 3), `As raízes são ${r1} e ${r2}.`));
  }
  for (let i = 0; i < 12; i++) {
    const x = int(1, 12), y = int(1, 12);
    const p = `No sistema x + y = ${x + y} e x − y = ${x - y}, o valor de x é`;
    q.push(i % 2 ? me(`${p}:`, x, [y, x + 1, x - 1, x + y], `Somando: 2x = ${2 * x}.`) : ce(`${p} {v}.`, x, x + 2, `2x = ${2 * x}.`));
  }
  for (let i = 0; i < 6; i++) {
    const preco = int(3, 12), qtd = int(4, 15), total = preco * qtd;
    q.push(me(`Ana comprou canetas a R$ ${preco},00 cada e pagou R$ ${total},00. Quantas canetas comprou?`, qtd, [qtd + 1, qtd - 1, qtd + 2, preco], `${total} ÷ ${preco} = ${qtd}.`));
  }
  return q;
}

function funcoes() {
  const q = [
    C('Na função afim f(x) = ax + b, o coeficiente a é a taxa de variação.', 'Inclinação da reta.'),
    C('Se a > 0, a função afim é crescente; se a < 0, é decrescente.', 'Monotonicidade.'),
    C('O gráfico da função quadrática é uma parábola.', 'Conceito.'),
    C('Na função quadrática, se a > 0 a parábola tem concavidade para cima e um ponto de mínimo.', 'Concavidade.'),
    C('A abscissa do vértice da parábola é xᵥ = −b/(2a).', 'Fórmula.'),
    C('A função exponencial f(x) = aˣ, com a > 1, é crescente.', 'Exponencial.'),
    C('log_a b = c significa que aᶜ = b.', 'Definição.'),
    C('log(a · b) = log a + log b.', 'Propriedade.'),
    C('log(aⁿ) = n · log a.', 'Propriedade.'),
    C('log_a 1 = 0 para qualquer base válida.', 'a⁰ = 1.'),
  ];
  for (let i = 0; i < 12; i++) {
    const a = int(-5, 7) || 2, b = int(-10, 10), x = int(-4, 6), v = a * x + b;
    const f = `f(x) = ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}`;
    q.push(i % 2 ? me(`Sendo ${f}, o valor de f(${x}) é:`, v, [v + a, v - a, -v, v + 1], `${a}·${x} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${v}.`) : ce(`Sendo ${f}, f(${x}) = {v}.`, v, v + a, `${a}·(${x}) + (${b}) = ${v}.`));
  }
  for (let i = 0; i < 10; i++) {
    const xv = int(-4, 5), a = pick([1, 2, -1]), b = -2 * a * xv, c = int(-6, 6), yv = a * xv * xv + b * xv + c;
    const f = `f(x) = ${a === 1 ? '' : a === -1 ? '−' : a}x² ${b < 0 ? '−' : '+'} ${Math.abs(b)}x ${c < 0 ? '−' : '+'} ${Math.abs(c)}`;
    q.push(i % 2 ? me(`O x do vértice de ${f} é:`, xv, [-xv, xv + 1, b, xv - 2], 'xᵥ = −b/(2a).') : me(`O y do vértice de ${f} é:`, yv, [yv + 1, -yv, c, yv - 2], `f(${xv}) = ${yv}.`));
  }
  for (let i = 0; i < 10; i++) {
    const base = pick([2, 3, 5, 10]), e = int(1, base === 10 ? 4 : 5), n = base ** e;
    q.push(i % 2 ? me(`O valor do logaritmo de ${n} na base ${base} é:`, e, [e + 1, e - 1, n / base, base], `${base}^${e} = ${n}.`) : ce(`O logaritmo de ${n} na base ${base} é {v}.`, e, e + 1, `${base}^${e} = ${n}.`));
  }
  for (let i = 0; i < 6; i++) {
    const b = pick([2, 3]), e = int(2, 6);
    q.push(me(`Sendo f(x) = ${b}ˣ, o valor de f(${e}) é:`, b ** e, [b * e, b ** (e - 1), b ** (e + 1), e ** b], `${b}^${e} = ${b ** e}.`));
  }
  return q;
}

function razao() {
  const q = [
    C('Razão é o quociente entre duas grandezas.', 'Conceito.'),
    C('Proporção é a igualdade entre duas razões.', 'Conceito.'),
    C('Em uma proporção, o produto dos meios é igual ao produto dos extremos.', 'Propriedade fundamental.'),
    C('Grandezas diretamente proporcionais variam na mesma razão.', 'Ex.: quantidade e preço.'),
    C('Grandezas inversamente proporcionais têm produto constante.', 'Ex.: velocidade e tempo.'),
    C('Velocidade e tempo de viagem, para a mesma distância, são inversamente proporcionais.', 'Inversa.'),
    C('Escala é a razão entre a medida no desenho e a medida real.', 'Conceito.'),
  ];
  for (let i = 0; i < 12; i++) {
    const a = int(2, 9), k = int(2, 9), b = a * k, c = int(2, 12), d = c * k;
    q.push(i % 2 ? me(`Se ${a} kg de feijão custam R$ ${b},00, quanto custam ${c} kg?`, d, [d + k, d - k, c * a, b + c], 'Regra de três direta.', (n) => real(n)) : ce(`Se ${a} pacotes custam R$ ${b},00, então ${c} pacotes custam R$ {v},00.`, d, d + k, `Preço unitário R$ ${k},00.`));
  }
  for (let i = 0; i < 12; i++) {
    const t = int(2, 10), p = int(2, 8), p2 = pick([1, 2, 4, 8].filter((x) => (t * p) % x === 0 && x !== p)) || 1, t2 = (t * p) / p2;
    q.push(me(`${p} pedreiros fazem um muro em ${t} dias. Em quantos dias ${p2} pedreiro(s), no mesmo ritmo, fariam o mesmo muro?`, t2, [t, (t * p2) / p, t2 + 1, t2 - 1], `Inversa: ${p}×${t} = ${p2}×${t2}.`));
  }
  for (let i = 0; i < 8; i++) {
    const r1 = int(1, 5), r2 = int(1, 5), k = int(5, 40), tot = (r1 + r2) * k;
    q.push(me(`R$ ${tot},00 foram divididos entre A e B na razão ${r1}:${r2}. A recebeu:`, r1 * k, [r2 * k, tot / 2, r1 * k + k, (r1 + 1) * k], `Cada parte vale ${k}.`, (n) => real(n)));
  }
  for (let i = 0; i < 8; i++) {
    const esc = pick([1000, 5000, 10000, 50000, 100000]), cm = int(2, 12), real_m = (cm * esc) / 100;
    q.push(me(`Num mapa de escala 1:${esc.toLocaleString('pt-BR')}, ${cm} cm correspondem a quantos metros na realidade?`, real_m, [real_m * 10, real_m / 10, cm * 100, real_m + esc / 100], `${cm} × ${esc} cm = ${real_m} m.`));
  }
  return q;
}

function porcentagem() {
  const q = [
    C('x% de um valor é igual a x/100 multiplicado por esse valor.', 'Definição.'),
    C('Um aumento de 10% seguido de um desconto de 10% resulta em perda de 1% sobre o valor inicial.', '1,1 × 0,9 = 0,99.'),
    E('Dois aumentos sucessivos de 10% equivalem a um aumento de 20%.', '1,1 × 1,1 = 1,21: aumento de 21%.'),
    C('Nos juros simples, J = C · i · t.', 'Fórmula.'),
    C('Nos juros compostos, M = C · (1 + i)ᵗ.', 'Fórmula.'),
    C('Para aumentar um valor em 25%, basta multiplicá-lo por 1,25.', 'Fator.'),
    C('Para dar desconto de 30%, multiplica-se o valor por 0,7.', 'Fator.'),
  ];
  for (let i = 0; i < 12; i++) {
    const p = pick([5, 10, 12, 15, 20, 25, 30, 40, 50, 75]), v = int(2, 40) * 20, r = (p * v) / 100;
    q.push(i % 2 ? me(`Quanto é ${p}% de ${v}?`, r, [r * 2, r / 2, r + p, v - r], `${p}/100 × ${v} = ${fmt(r)}.`) : ce(`${p}% de ${v} é igual a {v}.`, r, r + 10, `${p}/100 × ${v}.`));
  }
  for (let i = 0; i < 10; i++) {
    const v = int(5, 50) * 20, p = pick([10, 20, 25, 30, 40]), aum = rnd() < 0.5, f = aum ? v * (1 + p / 100) : v * (1 - p / 100);
    q.push(me(`Um produto de ${real(v)} teve ${aum ? 'aumento' : 'desconto'} de ${p}%. O novo preço é:`, f, [aum ? v * (1 - p / 100) : v * (1 + p / 100), v + p, f + 10, v * p / 100], `Fator ${fmt(aum ? 1 + p / 100 : 1 - p / 100)}.`, real));
  }
  for (let i = 0; i < 10; i++) {
    const Cc = int(2, 20) * 500, ia = pick([2, 3, 4, 5, 10]), t = int(2, 12), J = (Cc * ia * t) / 100;
    q.push(i % 2 ? me(`Um capital de ${real(Cc)} aplicado a juros simples de ${ia}% ao mês, por ${t} meses, rende juros de:`, J, [J * 2, J / 2, Cc + J, (Cc * ia) / 100], `J = ${Cc} × ${ia / 100} × ${t}.`, real) : ce(`Um capital de ${real(Cc)} a juros simples de ${ia}% ao mês, durante ${t} meses, gera juros de {v}.`, J, J + (Cc * ia) / 100, `J = C·i·t.`, real));
  }
  for (let i = 0; i < 8; i++) {
    const Cc = int(1, 10) * 1000, ia = pick([10, 20]), t = 2, Mt = Cc * (1 + ia / 100) ** t;
    q.push(me(`${real(Cc)} aplicados a juros compostos de ${ia}% ao mês, por 2 meses, geram montante de:`, Mt, [Cc * (1 + (ia * t) / 100), Mt + 100, Cc * (1 + ia / 100), Mt - 50], `M = C(1+i)².`, real));
  }
  return q;
}

function sequencias() {
  const q = [
    C('Na progressão aritmética, a diferença entre termos consecutivos é constante (razão r).', 'PA.'),
    C('O termo geral da PA é aₙ = a₁ + (n − 1)r.', 'Fórmula.'),
    C('A soma dos n primeiros termos da PA é Sₙ = (a₁ + aₙ) · n / 2.', 'Fórmula.'),
    C('Na progressão geométrica, o quociente entre termos consecutivos é constante (razão q).', 'PG.'),
    C('O termo geral da PG é aₙ = a₁ · qⁿ⁻¹.', 'Fórmula.'),
    C('Na sequência 2, 4, 8, 16, ..., o próximo termo é 32.', 'PG de razão 2.'),
  ];
  for (let i = 0; i < 14; i++) {
    const a1 = int(-5, 20), r = int(2, 9), n = int(5, 20), an = a1 + (n - 1) * r;
    q.push(i % 2 ? me(`Numa PA de primeiro termo ${a1} e razão ${r}, o ${n}º termo é:`, an, [an + r, an - r, a1 + n * r, a1 * n], `a${n} = ${a1} + ${n - 1}·${r}.`) : ce(`Numa PA de primeiro termo ${a1} e razão ${r}, o ${n}º termo é {v}.`, an, an + r, `aₙ = a₁ + (n−1)r.`));
  }
  for (let i = 0; i < 10; i++) {
    const a1 = int(1, 10), r = int(1, 6), n = int(5, 15), an = a1 + (n - 1) * r, S = ((a1 + an) * n) / 2;
    q.push(me(`A soma dos ${n} primeiros termos da PA (${a1}, ${a1 + r}, ${a1 + 2 * r}, ...) é:`, S, [S + an, S - a1, an * n, ((a1 + an) * (n - 1)) / 2], `Sₙ = (${a1} + ${an})·${n}/2.`));
  }
  for (let i = 0; i < 12; i++) {
    const a1 = int(1, 5), qq = pick([2, 3]), n = int(3, 7), an = a1 * qq ** (n - 1);
    q.push(i % 2 ? me(`Numa PG de primeiro termo ${a1} e razão ${qq}, o ${n}º termo é:`, an, [an * qq, an / qq, a1 * qq * n, an + qq], `a${n} = ${a1}·${qq}^${n - 1}.`) : ce(`Numa PG de primeiro termo ${a1} e razão ${qq}, o ${n}º termo é {v}.`, an, an * qq, `aₙ = a₁·qⁿ⁻¹.`));
  }
  for (let i = 0; i < 6; i++) {
    const a = int(1, 9), r = int(2, 7), seq = [a, a + r, a + 2 * r, a + 3 * r];
    q.push(me(`Qual o próximo termo da sequência ${seq.join(', ')}, ...?`, a + 4 * r, [a + 5 * r, a + 3 * r + 1, seq[3] * 2, a + 4 * r + 2], `Razão ${r}.`));
  }
  return q;
}

function contagem() {
  const q = [
    C('Pelo princípio fundamental da contagem, se um evento ocorre em m modos e outro em n modos, os dois juntos ocorrem em m × n modos.', 'PFC.'),
    C('Permutação simples de n elementos é n!.', 'Fórmula.'),
    C('No arranjo, a ordem dos elementos importa; na combinação, não importa.', 'Distinção.'),
    C('O número de anagramas da palavra AMOR é 4! = 24.', 'Permutação.'),
    C('Escolher uma comissão de pessoas é problema de combinação, pois a ordem não importa.', 'Combinação.'),
    C('Formar senhas com algarismos é problema em que a ordem importa.', 'Arranjo ou PFC.'),
    C('0! = 1.', 'Convenção.'),
  ];
  for (let i = 0; i < 10; i++) {
    const n = int(3, 7);
    q.push(me(`Quantos anagramas tem uma palavra de ${n} letras distintas?`, fat(n), [fat(n - 1), n * n, fat(n) / 2, fat(n) + n], `${n}! = ${fat(n)}.`));
  }
  for (let i = 0; i < 12; i++) {
    const n = int(5, 10), k = int(2, 4);
    q.push(i % 2 ? me(`De quantas maneiras é possível formar uma comissão de ${k} pessoas a partir de ${n}?`, comb(n, k), [arr(n, k), comb(n, k) + n, n * k, comb(n, k - 1)], `C(${n},${k}) = ${comb(n, k)}.`) : me(`De quantas maneiras ${n} atletas podem ocupar o 1º, o 2º e o 3º lugares?`, arr(n, 3), [comb(n, 3), n ** 3, fat(n), arr(n, 3) / 2], `A(${n},3) = ${n}·${n - 1}·${n - 2}.`));
  }
  for (let i = 0; i < 10; i++) {
    const a = int(2, 6), b = int(2, 6), c = int(2, 5);
    q.push(ce(`Com ${a} camisas, ${b} calças e ${c} pares de sapatos, é possível montar {v} combinações diferentes.`, a * b * c, a + b + c, `PFC: ${a}·${b}·${c}.`));
  }
  for (let i = 0; i < 8; i++) {
    const d = int(3, 5);
    q.push(me(`Quantas senhas de ${d} algarismos (0 a 9) podem ser formadas, permitindo repetição?`, 10 ** d, [arr(10, d), 10 * d, 9 ** d, 10 ** (d - 1)], `10^${d}.`));
  }
  return q;
}

function probabilidade() {
  const q = [
    C('Probabilidade é a razão entre o número de casos favoráveis e o de casos possíveis.', 'Definição clássica.'),
    C('A probabilidade de um evento está sempre entre 0 e 1.', 'Propriedade.'),
    C('A probabilidade do evento complementar é 1 − P(A).', 'Complementar.'),
    C('Para eventos independentes, P(A e B) = P(A) · P(B).', 'Multiplicação.'),
    C('Para eventos mutuamente exclusivos, P(A ou B) = P(A) + P(B).', 'Adição.'),
    C('No lançamento de uma moeda honesta, a probabilidade de sair cara é 1/2.', 'Equiprovável.'),
    C('No lançamento de um dado honesto, a probabilidade de sair número par é 1/2.', '3/6.'),
    C('No lançamento de duas moedas, a probabilidade de saírem duas caras é 1/4.', '1/2 · 1/2.'),
  ];
  for (let i = 0; i < 14; i++) {
    const az = int(1, 9), vm = int(1, 9), br = int(0, 6), tot = az + vm + br;
    q.push(me(`Uma urna tem ${az} bolas azuis, ${vm} vermelhas e ${br} brancas. Retirando uma ao acaso, a probabilidade de ser azul é:`, az / tot, [vm / tot, az / (tot + az), 1 / tot, (az + 1) / tot, (az + 2) / (tot + 3)], `${az}/${tot} = ${frac(az, tot)}.`, fr));
  }
  const dado = [['sair 6', 1, 6], ['sair número maior que 4', 2, 6], ['sair número primo', 3, 6], ['sair múltiplo de 3', 2, 6], ['sair número menor que 3', 2, 6]];
  dado.forEach(([t, f, n]) => q.push(ce(`No lançamento de um dado honesto, a probabilidade de ${t} é {v}.`, f / n, (f + 1) / n, `${f}/${n}.`, fr)));
  for (let i = 0; i < 10; i++) {
    const n = int(2, 5);
    q.push(me(`Lançando ${n} moedas honestas, a probabilidade de todas darem cara é:`, 1 / 2 ** n, [1 / (2 * n), 1 / 2 ** (n + 1), 1 / 2 ** (n - 1), 3 / 2 ** n, 1 / (n + 1), 1 / n], `(1/2)^${n}.`, fr));
  }
  for (let i = 0; i < 10; i++) {
    const s = pick([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); let f = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === s) f++;
    q.push(me(`Lançando dois dados, a probabilidade de a soma ser ${s} é:`, f / 36, [(f + 1) / 36, (f + 2) / 36, f / 18 === f / 36 ? 1 / 2 : (f + 3) / 36, 1 / 36, 1 / 6, 1 / 3], `${f} casos em 36.`, fr));
  }
  return q;
}

function estatistica() {
  const q = [
    C('A média aritmética é a soma dos valores dividida pela quantidade de valores.', 'Definição.'),
    C('A mediana é o valor central de um conjunto ordenado.', 'Definição.'),
    C('Com número par de valores, a mediana é a média dos dois valores centrais.', 'Definição.'),
    C('A moda é o valor que mais se repete.', 'Definição.'),
    C('Um conjunto pode ser amodal, unimodal ou multimodal.', 'Moda.'),
    C('A amplitude é a diferença entre o maior e o menor valor.', 'Dispersão.'),
    C('O desvio padrão é a raiz quadrada da variância.', 'Dispersão.'),
    C('Somar uma constante a todos os valores não altera o desvio padrão.', 'Propriedade.'),
    C('Multiplicar todos os valores por k multiplica a média por k.', 'Propriedade.'),
  ];
  for (let i = 0; i < 14; i++) {
    const n = pick([5, 6, 7]), vals = Array.from({ length: n }, () => int(1, 20)); const media = vals.reduce((a, b) => a + b, 0) / n;
    const ord = [...vals].sort((a, b) => a - b), med = n % 2 ? ord[(n - 1) / 2] : (ord[n / 2 - 1] + ord[n / 2]) / 2;
    if (i % 2) q.push(me(`A média dos valores ${vals.join(', ')} é:`, media, [med, media + 1, media - 1, Math.max(...vals) - Math.min(...vals)], `Soma ${vals.reduce((a, b) => a + b, 0)} ÷ ${n}.`));
    else q.push(me(`A mediana dos valores ${vals.join(', ')} é:`, med, [media, ord[0], ord[n - 1], med + 1], `Ordenados: ${ord.join(', ')}.`));
  }
  for (let i = 0; i < 10; i++) {
    const m = int(3, 15), rep = int(3, 4), outros = []; while (outros.length < 4) { const x = int(1, 20); if (x !== m && !outros.includes(x)) outros.push(x); }
    const vals = [...outros, ...Array(rep).fill(m)].sort(() => rnd() - 0.5);
    q.push(ce(`A moda do conjunto ${vals.join(', ')} é {v}.`, m, outros[0], `${m} aparece ${rep} vezes.`));
  }
  for (let i = 0; i < 14; i++) {
    const vals = Array.from({ length: 6 }, () => int(2, 40)); const amp = Math.max(...vals) - Math.min(...vals);
    q.push(me(`A amplitude do conjunto ${vals.join(', ')} é:`, amp, [Math.max(...vals), amp + 1, amp - 2, Math.min(...vals)], 'Maior − menor.'));
  }
  return q;
}

function conjuntos() {
  const q = [
    C('n(A ∪ B) = n(A) + n(B) − n(A ∩ B).', 'Princípio da inclusão-exclusão.'),
    C('A interseção A ∩ B contém os elementos comuns a A e B.', 'Definição.'),
    C('A união A ∪ B contém os elementos que pertencem a A ou a B.', 'Definição.'),
    C('A diferença A − B contém os elementos de A que não pertencem a B.', 'Definição.'),
    C('O conjunto vazio é subconjunto de qualquer conjunto.', 'Propriedade.'),
    C('Um conjunto com n elementos tem 2ⁿ subconjuntos.', 'Propriedade.'),
    C('Todo número natural é inteiro, e todo inteiro é racional.', 'ℕ ⊂ ℤ ⊂ ℚ.'),
    C('√2 é um número irracional.', 'Não é razão de inteiros.'),
  ];
  for (let i = 0; i < 16; i++) {
    const ab = int(3, 30), a = ab + int(5, 40), b = ab + int(5, 40), u = a + b - ab;
    const t = pick([['estudam inglês', 'estudam espanhol'], ['leem jornal', 'leem revista'], ['votaram em X', 'votaram em Y'], ['usam ônibus', 'usam metrô']]);
    q.push(i % 2 ? me(`Numa pesquisa, ${a} pessoas ${t[0]}, ${b} ${t[1]} e ${ab} fazem as duas coisas. Quantas fazem pelo menos uma delas?`, u, [a + b, u + ab, u - ab, a + b + ab], `${a} + ${b} − ${ab}.`) : me(`Numa pesquisa, ${a} pessoas ${t[0]}, ${b} ${t[1]} e ${ab} fazem as duas coisas. Quantas fazem só a primeira?`, a - ab, [a, ab, b - ab, a + ab], `${a} − ${ab}.`));
  }
  for (let i = 0; i < 12; i++) {
    const n = int(2, 7);
    q.push(ce(`Um conjunto com ${n} elementos possui {v} subconjuntos.`, 2 ** n, 2 * n, `2^${n}.`));
  }
  for (let i = 0; i < 11; i++) {
    const tot = int(80, 200), a = int(30, 60), b = int(30, 60), ab = int(5, 25), nenhum = tot - (a + b - ab);
    q.push(me(`Num grupo de ${tot} pessoas, ${a} gostam de futebol, ${b} de vôlei e ${ab} de ambos. Quantas não gostam de nenhum?`, nenhum, [tot - a - b, nenhum + ab, tot - ab, nenhum - ab], `${tot} − (${a} + ${b} − ${ab}).`));
  }
  return q;
}

function geometria() {
  const q = [
    C('A área do retângulo é base × altura.', 'Fórmula.'),
    C('A área do triângulo é (base × altura) / 2.', 'Fórmula.'),
    C('A área do círculo é π · r².', 'Fórmula.'),
    C('O comprimento da circunferência é 2 · π · r.', 'Fórmula.'),
    C('O volume do paralelepípedo é comprimento × largura × altura.', 'Fórmula.'),
    C('1 m³ corresponde a 1.000 litros.', 'Conversão.'),
    C('A soma dos ângulos internos de um triângulo é 180°.', 'Propriedade.'),
    C('Pelo teorema de Pitágoras, num triângulo retângulo, a² = b² + c², sendo a a hipotenusa.', 'Teorema.'),
    C('Se as medidas lineares de uma figura são multiplicadas por k, a área fica multiplicada por k².', 'Semelhança.'),
    C('Se as medidas lineares de um sólido são multiplicadas por k, o volume fica multiplicado por k³.', 'Semelhança.'),
  ];
  for (let i = 0; i < 10; i++) {
    const b = int(3, 25), h = int(2, 20);
    q.push(i % 2 ? me(`A área de um retângulo de ${b} m por ${h} m é:`, b * h, [2 * (b + h), b * h / 2, b + h, b * h + b], 'b × h.', (n) => fmt(n) + ' m²') : ce(`A área de um triângulo de base ${b} cm e altura ${h} cm é {v} cm².`, (b * h) / 2, b * h, '(b·h)/2.'));
  }
  for (let i = 0; i < 8; i++) {
    const r = int(1, 10);
    q.push(me(`Usando π = 3,14, a área de um círculo de raio ${r} m é:`, 3.14 * r * r, [2 * 3.14 * r, 3.14 * r, 3.14 * r * r * 2, 3.14 * (r + 1) ** 2], 'π·r².', (n) => fmt(n) + ' m²'));
  }
  const ternos = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25]];
  ternos.forEach(([a, b, c]) => q.push(me(`Num triângulo retângulo de catetos ${a} e ${b}, a hipotenusa mede:`, c, [a + b, c + 1, c - 1, b + 1], `${a}² + ${b}² = ${c}².`)));
  for (let i = 0; i < 10; i++) {
    const c = int(1, 6), l = int(1, 5), h = int(1, 4), v = c * l * h;
    q.push(i % 2 ? me(`Uma caixa-d'água de ${c} m × ${l} m × ${h} m tem capacidade de:`, v * 1000, [v * 100, v * 10, v, v * 10000], `${v} m³ = ${v * 1000} L.`, (n) => n.toLocaleString('pt-BR') + ' litros') : ce(`O volume de um paralelepípedo de ${c} m × ${l} m × ${h} m é {v} m³.`, v, c + l + h, 'c × l × h.'));
  }
  for (let i = 0; i < 6; i++) {
    const a1 = int(20, 80), a2 = int(20, 70);
    q.push(me(`Num triângulo, dois ângulos medem ${a1}° e ${a2}°. O terceiro ângulo mede:`, 180 - a1 - a2, [180 - a1, 90 - a2, 180 - a1 - a2 + 10, a1 + a2], '180° − soma.', (n) => n + '°'));
  }
  return q;
}

export const QRLM = {
  proposicoes: proposicoes(), equivalencias: equivalencias(), equacoes: equacoes(), funcoes: funcoes(), razao: razao(), porcentagem: porcentagem(),
  sequencias: sequencias(), contagem: contagem(), probabilidade: probabilidade(), estatistica: estatistica(), conjuntos: conjuntos(), geometria: geometria(),
};
