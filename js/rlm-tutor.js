// Resolução passo a passo das questões de Raciocínio Lógico-Matemático.
// Monta, quando dá para calcular com segurança, a tabela-verdade pronta (com a linha do enunciado destacada)
// e explica onde preencher cada coluna; em todas as questões, transforma a explicação em passos numerados.
import { esc } from './util.js';
import { parse, lerFrase, ev, txt, colunas, linhas, ordemVars, regra, nomeOp, VF, tabelaHTML, classificar } from './logica.js';

const LOGICA = new Set(['proposicoes', 'equivalencias', 'logica-argumentacao']);

// Como pensar, por assunto (aparece antes do cálculo)
const METODO = {
  proposicoes: ['Identifique as proposições simples e dê uma letra a cada uma (P, Q, R).', 'Descubra o conectivo principal: é ele que decide o valor final.', 'Substitua cada letra pelo valor dado (V ou F) e resolva de dentro para fora: primeiro as negações, depois os parênteses, por fim o conectivo principal.'],
  equivalencias: ['Traduza a frase para símbolos (P, Q, ~, ∧, ∨, →).', 'Aplique a regra certa: contrapositiva (P → Q ≡ ~Q → ~P), De Morgan (nega tudo e troca e/ou), negação da condicional (P ∧ ~Q) ou da bicondicional (ou... ou).', 'Na dúvida, monte a tabela-verdade das duas frases: se as colunas finais forem iguais em todas as linhas, são equivalentes.'],
  'logica-argumentacao': ['Separe as premissas (o que é dado como verdadeiro) da conclusão.', 'Comece pela premissa simples (sem conectivo): ela já entrega o valor de uma letra.', 'Use esse valor nas outras premissas, uma por vez, até descobrir todas as letras. Para testar validade: o argumento é inválido se existir uma linha com todas as premissas V e a conclusão F.'],
  conjuntos: ['Desenhe o diagrama de Venn com uma região para cada combinação.', 'Preencha primeiro a interseção (a região que pertence a todos) e depois subtraia para achar o "só A", "só B".', 'Some as regiões que a pergunta pede; não conte a interseção duas vezes: n(A ∪ B) = n(A) + n(B) − n(A ∩ B).'],
  equacoes: ['Dê nome à incógnita (x) e escreva a frase do enunciado como equação.', 'Isole x: o que soma passa subtraindo, o que multiplica passa dividindo.', 'Confira substituindo o valor encontrado na equação original.'],
  funcoes: ['Identifique o tipo de função (afim, quadrática, exponencial, logarítmica) e os coeficientes.', 'Substitua o valor de x pedido ou use a fórmula própria (raízes, vértice, crescimento).', 'Interprete o resultado na situação do enunciado.'],
  razao: ['Organize as grandezas em colunas, com as unidades.', 'Decida se são diretamente proporcionais (as duas aumentam) ou inversamente (uma aumenta, a outra diminui).', 'Monte a proporção (inversa: inverta a fração) e multiplique cruzado.'],
  porcentagem: ['Transforme a porcentagem em número: 15% = 0,15.', 'Aumento de p%: multiplique por (1 + p). Desconto de p%: multiplique por (1 − p). Aumentos sucessivos: multiplique os fatores.', 'Volte para a pergunta: valor final, variação ou taxa?'],
  sequencias: ['Descubra a regra: diferença constante (PA, razão r) ou quociente constante (PG, razão q).', 'Use o termo geral: PA aₙ = a₁ + (n − 1)·r; PG aₙ = a₁·qⁿ⁻¹.', 'Para somas, use Sₙ = (a₁ + aₙ)·n / 2 (PA) ou a fórmula da PG.'],
  contagem: ['Pergunte: a ordem importa? Se sim, arranjo/princípio multiplicativo; se não, combinação.', 'Conte as etapas e as opções de cada etapa; multiplique (e) ou some (ou).', 'Atenção a restrições (posições fixas, elementos que não podem ficar juntos) e a repetições (permutação com repetição).'],
  probabilidade: ['Conte os casos possíveis (o total) e os favoráveis (o que a pergunta quer).', 'P = favoráveis ÷ possíveis. Eventos independentes em sequência: multiplique; eventos que se excluem: some.', '"Pelo menos um" fica mais fácil pelo complementar: 1 − P(nenhum).'],
  estatistica: ['Coloque os dados em ordem crescente.', 'Média: some e divida pela quantidade. Mediana: termo do meio. Moda: o que mais se repete.', 'Para desvio e variância, calcule a média primeiro e depois as diferenças de cada valor para ela.'],
  geometria: ['Desenhe a figura e anote as medidas, todas na mesma unidade.', 'Escolha a fórmula certa (área, perímetro, volume, Pitágoras, escala).', 'Faça a conta e confira a unidade da resposta (m, m², m³).'],
  'medidas-cartesiano': ['Converta tudo para a mesma unidade antes de calcular.', 'No plano cartesiano, use as coordenadas (x, y) nas fórmulas de distância, ponto médio ou reta.', 'Em matrizes, siga a regra linha × coluna.'],
  juros: ['Anote capital (C), taxa (i), tempo (t) e confira se taxa e tempo estão na mesma unidade.', 'Juros simples: J = C·i·t e M = C + J. Juros compostos: M = C·(1 + i)ᵗ.', 'Responda o que foi pedido: juros, montante, taxa ou tempo.'],
};

const ok1 = (fn) => { try { return fn(); } catch { return ''; } };
const passosDe = (t) => String(t || '').replace(/\s+/g, ' ').split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ“"(0-9])/).map((s) => s.trim()).filter((s) => s.length > 2);
const legenda = (at) => [...at.values()].map((a) => `<b>${a.letra}</b> = “${esc(a.texto)}”`).join(' · ');
const regraLinhas = (n) => `Com ${n} proposiç${n > 1 ? 'ões simples' : 'ão simples'}, a tabela tem 2${'⁰¹²³⁴⁵'[n]} = ${2 ** n} linhas. ${n >= 2 ? `Na 1ª coluna, escreva ${2 ** (n - 1)} V e depois ${2 ** (n - 1)} F; na 2ª, alterne de ${2 ** (n - 2)} em ${2 ** (n - 2)}${n >= 3 ? '; na 3ª, alterne de 1 em 1' : ''}. Assim nenhuma combinação se repete.` : 'Escreva V na 1ª linha e F na 2ª.'}`;
const comoPreencher = (vs, cols) => `<ol class="tv-como"><li><b>Colunas das letras (${vs.join(', ')}):</b> ${regraLinhas(vs.length)}</li>${cols.map((c) => `<li><b>Coluna ${esc(c.titulo)}:</b> ${c.f.v ? 'copie a coluna da letra.' : `${(r0 => r0.charAt(0).toUpperCase() + r0.slice(1))(regra(c.f.op))}. ${c.f.op === '~' ? `Olhe a coluna ${esc(txt(c.f.a))} e inverta linha a linha.` : `Olhe, em cada linha, as colunas ${esc(txt(c.f.a, false))} e ${esc(txt(c.f.b, false))}.`}`}</li>`).join('')}</ol>`;
const cols = (f) => colunas(f).map((g) => ({ titulo: txt(g), f: g }));
const linhaDe = (vs, val) => linhas(vs).findIndex((l) => vs.every((v) => val[v] === undefined || l[v] === val[v])) + 1;
const casa = (vs, val) => (l) => (vs.every((v) => val[v] === undefined || l[v] === val[v]) ? 'tv-hl' : '');

// ---------- fórmulas em símbolos ----------
const RE_F = /[~¬(\[]*\s*[pqrstPQRST]\s*[)\]]*(?:\s*[∧∨→↔⊻]\s*[~¬(\[]*\s*[pqrstPQRST]\s*[)\]]*)+/g;
function equilibra(s) {
  s = s.trim();
  for (let k = 0; k < 6; k++) {
    const ab = (s.match(/[(\[]/g) || []).length, fe = (s.match(/[)\]]/g) || []).length;
    if (ab > fe && /^[~¬]*[(\[]/.test(s)) s = s.replace(/^([~¬]*)[(\[]/, '$1');
    else if (fe > ab && /[)\]]$/.test(s)) s = s.slice(0, -1);
    else break;
  }
  return s.trim();
}
function formulas(t) {
  const out = [];
  for (const m of String(t).matchAll(RE_F)) { const s = equilibra(m[0]); try { out.push({ s, f: parse(s) }); } catch {} }
  return out;
}
function valoresDados(t) {
  const val = {};
  for (const m of String(t).matchAll(/\b([pqrstPQRST])\s+(?:é|for|seja|=)\s+(verdadeir[ao]|fals[ao]|V\b|F\b)/g)) { const k = m[1].toUpperCase(); if (!(k in val)) val[k] = /^(v|V)/.test(m[2]); }
  for (const m of String(t).matchAll(/\b([pqrstPQRST](?:\s*,\s*[pqrstPQRST])*\s+e\s+[pqrstPQRST])\s+são\s+(verdadeiras|falsas)/g)) for (const l of m[1].match(/[pqrstPQRST]/g)) if (!(l.toUpperCase() in val)) val[l.toUpperCase()] = m[2][0] === 'v';
  return val;
}
function simbolico(q) {
  const fs = formulas(q.p);
  if (!fs.length) return '';
  const altsF = (q.alts || []).map((a) => ok1(() => parse(equilibra(a.replace(/[“”"]/g, '').replace(/\((?:[^)]*\s)?[a-zà-ú]{2,}\b[^)]*\)/gi, ''))))).map((x) => x || null);
  const equiv = /equival|≡/i.test(q.p) && (fs.length >= 2 || altsF.some(Boolean));
  if (equiv) {
    const nega = /nega/i.test(q.p.split(fs[0].s)[0]);
    const base = nega ? { op: '~', a: fs[0].f } : fs[0].f;
    const cands = fs.length >= 2 ? [{ rot: 'proposta', f: fs[1].f }] : q.alts.map((a, k) => ({ rot: 'letra ' + 'ABCDE'[k], f: altsF[k] })).filter((c) => c.f);
    return comparar(base, cands, nega ? `negação de ${fs[0].s}` : fs[0].s);
  }
  const f = fs.sort((a, b) => b.s.length - a.s.length)[0].f, vs = ordemVars(f);
  if (vs.length > 4) return `<div class="tv-box"><b class="tv-tit">📐 Tabela-verdade</b><p>${regraLinhas(vs.length)} Com ${vs.length} letras ela ficaria grande demais para montar aqui, mas a regra é a mesma: 2 multiplicado por ele mesmo ${vs.length} vezes.</p></div>`;
  const val = valoresDados(q.p), temVal = vs.every((v) => val[v] !== undefined);
  const C = cols(f);
  const fim = temVal ? `<p class="tv-res">➡ Linha ${linhaDe(vs, val)} (destacada) é a situação do enunciado: ${vs.map((v) => `${v} = ${VF(val[v])}`).join(', ')}. Resultado na última coluna: <b>${VF(ev(f, val))}</b>.</p>`
    : `<p class="tv-res">➡ Olhe a última coluna: ${classificar(f) === 'tautologia' ? 'só tem V, então é <b>tautologia</b>' : classificar(f) === 'contradição' ? 'só tem F, então é <b>contradição</b>' : 'tem V e F, então é <b>contingência</b>'}.</p>`;
  return `<div class="tv-box"><b class="tv-tit">📐 Tabela-verdade pronta de ${esc(txt(f))}</b>${tabelaHTML(vs, C, { destaque: temVal ? casa(vs, val) : null })}${fim}<details class="tv-det" open><summary>Como preencher cada coluna</summary>${comoPreencher(vs, C)}</details></div>`;
}
function comparar(base, cands, rotBase, at) {
  if (!cands.length) return '';
  const vs = [...new Set([...ordemVars(base), ...cands.flatMap((c) => ordemVars(c.f))])].sort();
  if (vs.length > (at ? 3 : 4)) return '';
  const L = linhas(vs), Cb = cols(base);
  const iguais = cands.map((c) => L.every((v) => ev(c.f, v) === ev(base, v)));
  const cc = cands.map((c, k) => ({ titulo: `${esc(txt(c.f))}<small>${esc(c.rot)}</small>`, f: c.f, cls: iguais[k] ? 'tv-igual' : '' }));
  const linhasDif = (c) => L.map((v, i) => (ev(c.f, v) !== ev(base, v) ? i + 1 : 0)).filter(Boolean);
  const concl = cands.map((c, k) => `<li>${esc(c.rot)} (${esc(txt(c.f))}): ${iguais[k] ? '✅ coluna idêntica à da frase original em todas as linhas: <b>equivalente</b>.' : `❌ difere nas linhas ${linhasDif(c).join(', ')}: <b>não é equivalente</b>.`}</li>`).join('');
  return `<div class="tv-box"><b class="tv-tit">📐 Conferência pela tabela-verdade</b>${at ? `<p class="tv-leg">${legenda(at)}</p>` : ''}
    ${tabelaHTML(vs, [...Cb.slice(0, -1), { ...Cb[Cb.length - 1], titulo: `${esc(Cb[Cb.length - 1].titulo)}<small>${esc(rotBase)}</small>`, cls: 'tv-base' }, ...cc])}
    <p class="tv-res">➡ Duas proposições são equivalentes quando a última coluna de uma é igual à da outra em <b>todas</b> as linhas.</p><ul class="tv-concl">${concl}</ul>
    <details class="tv-det"><summary>Como preencher cada coluna</summary>${comoPreencher(vs, [...Cb, ...cc])}</details></div>`;
}

// ---------- frases em português ----------
const aspas = (t) => [...String(t).matchAll(/[“"]([^”"]{6,})[”"]/g)].map((m) => m[1]);
function literais(f, out = {}) {
  if (f.v) { out[f.v] = true; return out; }
  if (f.op === '~' && f.a.v) { out[f.a.v] = false; return out; }
  if (f.op === '∧') { literais(f.a, out); literais(f.b, out); return out; }
  throw new Error('não é conjunção de literais');
}
function emPortugues(q) {
  const qs = aspas(q.p); const at = new Map();
  // argumento: P1/P2/conclusão ou premissas numeradas
  const prem = [...q.p.matchAll(/(?:P\d|\(\d\))\s*:?\s*([^;]+?)(?=;|\s*conclus|\.\s|$)/g)].map((m) => m[1].trim());
  if (prem.length >= 2) {
    const P = prem.map((p) => lerFrase(p, at));
    let concl = (q.p.match(/conclusão:\s*([^.]+)/i) || q.p.match(/concluir que\s+([^.]+)/i) || [])[1];
    const cands = [];
    if (concl) cands.push({ rot: 'conclusão', f: ok1(() => lerFrase(concl, at)) });
    (q.alts || []).forEach((a, k) => cands.push({ rot: 'letra ' + 'ABCDE'[k], f: ok1(() => lerFrase(a, at)) }));
    return argumento(P, cands.filter((c) => c.f), at);
  }
  if (/suspeit/i.test(q.p) && /diz:/i.test(q.p)) return suspeitos(q);
  if (!qs.length) return '';
  const f = lerFrase(qs[0], at);
  if (f.v || (f.op === '~' && f.a.v)) return '';
  // comparação: negação / equivalência com outra frase ou com as alternativas
  if (/equival|nega/i.test(q.p) && (qs.length >= 2 || q.alts)) {
    const nega = /nega/i.test(q.p);
    const outras = qs.length >= 2 ? qs.slice(1).map((s) => ({ rot: 'frase proposta', f: ok1(() => lerFrase(s, at)) })) : q.alts.map((a, k) => ({ rot: 'letra ' + 'ABCDE'[k], f: ok1(() => lerFrase(a, at)) }));
    return comparar(nega ? { op: '~', a: f } : f, outras.filter((c) => c.f), nega ? 'negação da original' : 'original', at);
  }
  const vs = ordemVars(f), C = cols(f);
  if (vs.length > 3) return '';
  const cen = q.p.match(/Em certo dia,\s*([^.]+)\./i);
  let val = null; if (cen) val = ok1(() => literais(lerFrase(cen[1], at)));
  const fim = val && vs.every((v) => val[v] !== undefined)
    ? `<p class="tv-res">➡ A linha ${linhaDe(vs, val)} (destacada) é o dia descrito: ${vs.map((v) => `${v} = ${VF(val[v])}`).join(', ')}. Na última coluna: <b>${VF(ev(f, val))}</b>, ou seja, a proposição é <b>${ev(f, val) ? 'verdadeira' : 'falsa'}</b> nesse dia.</p>` : '';
  return `<div class="tv-box"><b class="tv-tit">📐 Tabela-verdade pronta</b><p class="tv-leg">${legenda(at)}</p><p class="tv-leg">Em símbolos: <b>${esc(txt(f))}</b></p>${tabelaHTML(vs, C, { destaque: val ? casa(vs, val) : null })}${fim}<details class="tv-det" open><summary>Como preencher cada coluna</summary>${comoPreencher(vs, C)}</details></div>`;
}
function argumento(P, cands, at) {
  const todos = [...P, ...cands.map((c) => c.f)];
  const vs = [...new Set(todos.flatMap((f) => ordemVars(f)))].sort();
  if (vs.length > 4) return '';
  const L = linhas(vs), crit = (v) => P.every((p) => ev(p, v));
  const nCrit = L.map((v, i) => (crit(v) ? i + 1 : 0)).filter(Boolean);
  const colsP = P.map((p, k) => ({ titulo: `${esc(txt(p))}<small>premissa ${k + 1}</small>`, f: p }));
  const colsC = cands.map((c) => ({ titulo: `${esc(txt(c.f))}<small>${esc(c.rot)}</small>`, f: c.f, cls: 'tv-base' }));
  const veredito = cands.map((c) => { const bad = L.map((v, i) => (crit(v) && !ev(c.f, v) ? i + 1 : 0)).filter(Boolean);
    return `<li>${esc(c.rot)} (${esc(txt(c.f))}): ${bad.length ? `❌ na linha ${bad.join(', ')} as premissas são todas V e ela é F: <b>não decorre das premissas</b> (argumento inválido).` : '✅ é V em todas as linhas em que as premissas são V: <b>decorre das premissas</b> (argumento válido).'}</li>`; }).join('');
  return `<div class="tv-box"><b class="tv-tit">📐 Tabela-verdade do argumento</b><p class="tv-leg">${legenda(at)}</p>
    ${tabelaHTML(vs, [...colsP, ...colsC], { destaque: (v) => (crit(v) ? 'tv-hl' : '') })}
    <p class="tv-res">➡ As linhas destacadas (${nCrit.join(', ') || 'nenhuma'}) são as únicas em que <b>todas as premissas são V</b>. É só nelas que se olha a conclusão.</p><ul class="tv-concl">${veredito}</ul>
    <details class="tv-det"><summary>Como preencher cada coluna</summary>${comoPreencher(vs, [...colsP, ...colsC])}</details></div>`;
}
function suspeitos(q) {
  const nomes = (q.p.match(/suspeitos?,?\s*([A-ZÁÉÍÓÚ]\w+),\s*([A-ZÁÉÍÓÚ]\w+)\s+ou\s+([A-ZÁÉÍÓÚ]\w+)/) || []).slice(1);
  if (nomes.length !== 3) return '';
  const dec = [...q.p.matchAll(/([A-ZÁÉÍÓÚ]\w+)\s+diz:\s*[“"]([^”"]+)[”"]/g)].map((m) => ({ quem: m[1], frase: m[2] }));
  if (dec.length !== 3) return '';
  const avalia = (d, c) => { const f = d.frase.trim().replace(/\.$/, ''); let m;
    if (/^eu fui$/i.test(f)) return c === d.quem;
    if (/^eu não (fui|sou o culpado)$/i.test(f)) return c !== d.quem;
    if ((m = f.match(/^(\w+) (foi|é o culpado)$/i))) return c === m[1];
    if ((m = f.match(/^(\w+) não (foi|é o culpado)$/i))) return c !== m[1];
    throw new Error('frase'); };
  const alvo = /apenas um deles diz a verdade|só um diz a verdade/i.test(q.p) ? 1 : /apenas um deles mente|só um mente/i.test(q.p) ? 2 : null;
  if (alvo === null) return '';
  const tab = nomes.map((c) => ({ c, r: dec.map((d) => avalia(d, c)) }));
  const certo = tab.filter((t) => t.r.filter(Boolean).length === alvo);
  return `<div class="tv-box"><b class="tv-tit">📐 Quadro de hipóteses</b><p class="tv-leg">Teste um culpado por linha e marque se cada frase fica V ou F. Serve a linha em que há exatamente <b>${alvo}</b> frase${alvo > 1 ? 's' : ''} verdadeira${alvo > 1 ? 's' : ''}.</p>
    <div class="tv-wrap"><table class="tv"><thead><tr><th>Se o culpado for…</th>${dec.map((d) => `<th>${esc(d.quem)}: “${esc(d.frase)}”</th>`).join('')}<th>Nº de V</th></tr></thead><tbody>
    ${tab.map((t) => `<tr class="${certo.includes(t) ? 'tv-hl' : ''}"><td><b>${esc(t.c)}</b></td>${t.r.map((r) => `<td class="${r ? 'tv-t' : 'tv-f'}">${VF(r)}</td>`).join('')}<td><b>${t.r.filter(Boolean).length}</b></td></tr>`).join('')}</tbody></table></div>
    <p class="tv-res">➡ ${certo.length === 1 ? `Só a hipótese <b>${esc(certo[0].c)}</b> deixa exatamente ${alvo} frase${alvo > 1 ? 's' : ''} verdadeira${alvo > 1 ? 's' : ''}: é ${esc(certo[0].c)}.` : 'Mais de uma hipótese atende: confira a condição do enunciado.'}</p></div>`;
}

// Números do enunciado (para as questões de cálculo)
function dados(p) {
  const nums = [...String(p).matchAll(/R\$\s?[\d.]+(?:,\d+)?|\d+(?:[.,]\d+)*\s?%|\b\d+(?:[.,]\d+)*\b/g)].map((m) => m[0].trim());
  const u = [...new Set(nums)].slice(0, 10);
  return u.length >= 2 ? `<div class="pp-dados"><b>Dados do enunciado:</b> ${u.map((n) => `<span>${esc(n)}</span>`).join('')}</div>` : '';
}

// Trava de segurança: se o quadro calculado não bate com o gabarito oficial da questão, ele não é mostrado
function confere(q, h) {
  const t = h.replace(/<[^>]+>/g, ''), p = String(q.p).trim(), me = Array.isArray(q.alts) && q.alts.length;
  const letrasOk = [...t.matchAll(/letra ([A-E]) \([^)]*\): ✅/g)].map((x) => x[1]);
  if (me) {
    if (/Conferência|argumento/.test(t)) { const tem = /letra [A-E] \(/.test(t); return !tem || letrasOk.includes('ABCDE'[q.r]); }
    const certa = String(q.alts[q.r] || '');
    if (/Resultado na última coluna: ([VF])/.test(t) && /^(verdadeir|fals|V$|F$)/i.test(certa.trim())) return (t.match(/Resultado na última coluna: ([VF])/)[1] === 'V') === /^(verdadeir|V$)/i.test(certa.trim());
    return true;
  }
  if (/Em certo dia/.test(p) && /é (verdadeira|falsa)\.?$/.test(p)) return ((/verdadeira\.?$/.test(p)) === /é verdadeira nesse dia/.test(t)) === !!q.c;
  if (/Conferência pela/.test(t) && /equival|nega/i.test(p)) return /✅/.test(t) === !!q.c;
  if (/do argumento/.test(t)) {
    const val = /argumento é válido|pode-se concluir|conclui-se/i.test(p), inval = /argumento é inválido|não se pode concluir/i.test(p);
    const okk = /✅/.test(t) && !/❌/.test(t);
    if (val || inval) return (val ? okk : !okk) === !!q.c;
  }
  if (/Resultado na última coluna: ([VF])/.test(t) && /é (verdadeir[oa]|fals[oa])\.?$/.test(p)) return ((/verdadeir[oa]\.?$/.test(p)) === (t.match(/Resultado na última coluna: ([VF])/)[1] === 'V')) === !!q.c;
  if (/é (tautologia|contradição|contingência)\.?$/.test(p) && /então é (tautologia|contradição|contingência)/.test(t)) return (p.match(/é (tautologia|contradição|contingência)\.?$/)[1] === t.match(/então é (tautologia|contradição|contingência)/)[1]) === !!q.c;
  if (/Quadro de hipóteses/.test(t)) { const quem = (t.match(/Só a hipótese (\S+) /) || [])[1]; const dito = (p.match(/foi (\w+)\.?$/) || [])[1]; if (quem && dito) return (quem === dito) === !!q.c; }
  return true;
}
export function ehRlm(q) { return !!q?.rlm; }
export function passoAPasso(q) {
  const tid = q.rlm;
  const metodo = METODO[tid] || ['Leia a pergunta até o fim e anote o que ela pede.', 'Separe os dados úteis do enunciado.', 'Resolva em etapas pequenas e confira o resultado.'];
  let tabela = LOGICA.has(tid) || /[∧∨→↔⊻]/.test(q.p) ? ok1(() => simbolico(q)) || ok1(() => emPortugues(q)) : '';
  if (tabela && !confere(q, tabela)) tabela = '';
  let passos = passosDe(q.x || q.prof || q.e);
  if (tabela) passos = passos.filter((s) => !/^Conferência pela tabela-verdade/i.test(s));
  const me = Array.isArray(q.alts) && q.alts.length, r = Number(q.r) || 0;
  const conclusao = me ? `Resposta: letra <b>${'ABCDE'[r]}</b> (${esc(String(q.alts[r]).slice(0, 160).replace(/[.;]\s*$/, ''))}).` : `Logo, o item está <b>${q.c ? 'CERTO' : 'ERRADO'}</b>.`;
  return `<div class="pp">
    <div class="pp-cab">🧭 <b>Resolução passo a passo</b><small>siga na ordem, como na prova</small></div>
    <div class="pp-sec"><span class="pp-n">1</span><div><b>Como pensar nesta questão</b><ul>${metodo.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>${LOGICA.has(tid) ? '' : dados(q.p)}</div></div>
    ${tabela ? `<div class="pp-sec"><span class="pp-n">2</span><div><b>Monte o quadro</b>${tabela}</div></div>` : ''}
    ${passos.length ? `<div class="pp-sec"><span class="pp-n">${tabela ? 3 : 2}</span><div><b>Resolvendo</b><ol class="pp-passos">${passos.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></div></div>` : ''}
    <div class="pp-sec pp-fim"><span class="pp-n">✓</span><div>${conclusao}</div></div>
    ${LOGICA.has(tid) ? '<a class="pp-treino" href="#/tabela-verdade">🧩 Treinar tabela-verdade no quadro interativo →</a>' : ''}
  </div>`;
}
export const _bruto = (q) => ok1(() => simbolico(q)) || ok1(() => emPortugues(q));
