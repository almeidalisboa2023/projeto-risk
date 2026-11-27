// Núcleo de lógica proposicional: lê fórmulas (símbolos ou português), calcula e monta tabelas-verdade.
// Usado pela resolução passo a passo das questões de RLM e pelo treino interativo de tabela-verdade.

export const VF = (b) => (b ? 'V' : 'F');
const NOME = { '∧': 'conjunção (e)', '∨': 'disjunção (ou)', '⊻': 'disjunção exclusiva (ou... ou)', '→': 'condicional (se... então)', '↔': 'bicondicional (se e somente se)' };
const PREC = { '↔': 1, '→': 2, '⊻': 3, '∨': 4, '∧': 5 };
export const OPS = {
  '∧': (a, b) => a && b, '∨': (a, b) => a || b, '⊻': (a, b) => a !== b, '→': (a, b) => !a || b, '↔': (a, b) => a === b,
};

// ---------- fórmulas em símbolos ----------
// Nós: { v: 'P' } | { op: '~', a } | { op: '∧', a, b }
const norm = (s) => String(s).replace(/¬/g, '~').replace(/[\[{]/g, '(').replace(/[\]}]/g, ')').replace(/⟷|<->/g, '↔').replace(/->|⇒/g, '→').replace(/\^/g, '∧');
export function parse(txt) {
  const s = norm(txt).replace(/\s+/g, '');
  let i = 0;
  const peek = () => s[i];
  function prim() {
    const c = peek();
    if (c === '~') { i++; return { op: '~', a: prim() }; }
    if (c === '(') { i++; const f = expr(0); if (peek() !== ')') throw new Error('parêntese'); i++; return f; }
    if (/[A-Za-z]/.test(c || '')) { i++; return { v: c.toUpperCase() }; }
    throw new Error('símbolo inesperado');
  }
  function expr(min) {
    let esq = prim();
    while (PREC[peek()] && PREC[peek()] > min) {
      const op = s[i++];
      // → e ↔ associam à direita; os demais à esquerda
      const dir = op === '→' || op === '↔' ? PREC[op] - 1 : PREC[op];
      esq = { op, a: esq, b: expr(dir) };
    }
    return esq;
  }
  const f = expr(0);
  if (i !== s.length) throw new Error('sobra');
  return f;
}
export const vars = (f, out = new Set()) => { if (f.v) out.add(f.v); else { vars(f.a, out); if (f.b) vars(f.b, out); } return out; };
export function ev(f, val) {
  if (f.v) return !!val[f.v];
  if (f.op === '~') return !ev(f.a, val);
  return OPS[f.op](ev(f.a, val), ev(f.b, val));
}
export function txt(f, topo = true) {
  if (f.v) return f.v;
  if (f.op === '~') return '~' + txt(f.a, false);
  const s = `${txt(f.a, false)} ${f.op} ${txt(f.b, false)}`;
  return topo ? s : `(${s})`;
}
// Subfórmulas na ordem em que se calcula (de dentro para fora), sem repetir
export function colunas(f) {
  const out = [], vistos = new Set();
  (function rec(g) { if (g.v) return; rec(g.a); if (g.b) rec(g.b); const k = txt(g); if (!vistos.has(k)) { vistos.add(k); out.push(g); } })(f);
  return out;
}
// Linhas na ordem clássica das bancas: 1ª coluna metade V metade F, a próxima alterna pela metade, ...
export function linhas(vs) {
  const n = vs.length, L = [];
  for (let k = 0; k < 2 ** n; k++) { const val = {}; vs.forEach((v, j) => { val[v] = !((k >> (n - 1 - j)) & 1); }); L.push(val); }
  return L;
}
export const ordemVars = (f) => [...vars(f)].sort((a, b) => 'PQRSTABCDE'.indexOf(a) - 'PQRSTABCDE'.indexOf(b) || a.localeCompare(b));

// Regra de cada conectivo, explicada para quem está aprendendo
export function regra(op) {
  return {
    '~': 'a negação inverte o valor: V vira F e F vira V',
    '∧': 'a conjunção (e) só é V quando as duas partes são V; basta uma F para dar F',
    '∨': 'a disjunção (ou) só é F quando as duas partes são F; basta uma V para dar V',
    '⊻': 'a disjunção exclusiva (ou... ou) é V quando as partes têm valores diferentes e F quando são iguais',
    '→': 'a condicional (se... então) só é F no caso V → F (antecedente V e consequente F); nos demais é V',
    '↔': 'a bicondicional (se e somente se) é V quando as partes têm valores iguais e F quando são diferentes',
  }[op];
}
export const nomeOp = (op) => (op === '~' ? 'negação (não)' : NOME[op]);
// Por que uma célula vale o que vale (linha concreta)
export function porque(g, val) {
  const r = ev(g, val);
  if (g.op === '~') return `${txt(g.a)} = ${VF(ev(g.a, val))}, e a negação inverte: ${VF(r)}`;
  const a = ev(g.a, val), b = ev(g.b, val);
  return `${txt(g.a, false)} = ${VF(a)} e ${txt(g.b, false)} = ${VF(b)}: ${VF(a)} ${g.op} ${VF(b)} = ${VF(r)}, porque ${regra(g.op)}`;
}
export function classificar(f) {
  const vs = ordemVars(f), res = linhas(vs).map((v) => ev(f, v));
  return res.every(Boolean) ? 'tautologia' : res.some(Boolean) ? 'contingência' : 'contradição';
}

// ---------- português → fórmula ----------
const tira = (s) => String(s).replace(/[“”"]/g, '').replace(/[.;]+\s*$/, '').trim();
const chaveAtomo = (s) => s.toLowerCase().replace(/\bnão\s+/g, '').replace(/\s+/g, ' ').trim();
export function lerFrase(frase, atomos) {
  // atomos: Map chave -> { letra, texto }
  let s = tira(frase).replace(/^\s*(a proposição|a frase)\s+/i, '');
  s = s.charAt(0).toLowerCase() + s.slice(1);
  const at = (t) => {
    t = tira(t).replace(/^(que|então)\s+/i, '').trim();
    if (!t || t.split(' ').length < 2) throw new Error('átomo curto');
    const neg = /\bnão\s/.test(t) && !/^não é verdade que/.test(t);
    let k = chaveAtomo(t);
    // sujeito oculto: "pode circular" é a mesma proposição que "o veículo pode circular"
    if (!atomos.has(k)) for (const k2 of atomos.keys()) if (k2.endsWith(' ' + k) || k.endsWith(' ' + k2)) { k = k2; break; }
    if (!atomos.has(k)) { const letra = 'PQRST'[atomos.size]; if (!letra) throw new Error('muitas'); atomos.set(k, { letra, texto: k }); }
    const v = { v: atomos.get(k).letra };
    return neg ? { op: '~', a: v } : v;
  };
  const rec = (t) => {
    t = tira(t);
    let m;
    if ((m = t.match(/^não é verdade que\s+(.+)$/i))) return { op: '~', a: rec(m[1]) };
    if ((m = t.match(/^(se\s+.+?,\s*então\s+.+?),\s+e\s+(se\s+.+)$/i))) return { op: '∧', a: rec(m[1]), b: rec(m[2]) };
    if ((m = t.match(/^se\s+(.+?),\s*então\s+(.+)$/i))) return { op: '→', a: rec(m[1]), b: rec(m[2]) };
    if ((m = t.match(/^(.+?)\s+se e somente se\s+(.+)$/i))) return { op: '↔', a: rec(m[1]), b: rec(m[2]) };
    if ((m = t.match(/^(.+?)\s+é condição necessária para (?:que\s+)?(.+)$/i))) return { op: '→', a: rec(m[2]), b: rec(m[1]) };
    if ((m = t.match(/^(.+?)\s+é condição suficiente para (?:que\s+)?(.+)$/i))) return { op: '→', a: rec(m[1]), b: rec(m[2]) };
    if ((m = t.match(/^(.+?)\s+somente se\s+(.+)$/i))) return { op: '→', a: rec(m[1]), b: rec(m[2]) };
    if ((m = t.match(/^ou\s+(.+?),?\s+ou\s+(.+)$/i))) return { op: '⊻', a: rec(m[1]), b: rec(m[2]) };
    if ((m = t.match(/^nem\s+(.+?),?\s+nem\s+(.+)$/i))) return { op: '∧', a: { op: '~', a: rec(m[1]) }, b: { op: '~', a: rec(m[2]) } };
    if ((m = t.match(/^(.+?),?\s+ou\s+(.+)$/i))) return { op: '∨', a: rec(m[1]), b: rec(m[2]) };
    if ((m = t.match(/^(.+?),?\s+e\s+(.+)$/i))) return { op: '∧', a: rec(m[1]), b: rec(m[2]) };
    return at(t);
  };
  return rec(s);
}

// ---------- tabela em HTML ----------
// cols: lista de { titulo, f (fórmula) }; destaque: função(val) -> classe da linha
export function tabelaHTML(vs, cols, { destaque, legenda, marca } = {}) {
  const L = linhas(vs);
  return `<div class="tv-wrap"><table class="tv"><thead><tr><th class="tv-n">#</th>${vs.map((v) => `<th class="tv-v">${v}</th>`).join('')}${cols.map((c) => `<th class="${c.cls || ''}">${c.titulo}</th>`).join('')}${marca ? `<th>${marca.titulo}</th>` : ''}</tr></thead>
    <tbody>${L.map((val, i) => `<tr class="${destaque ? destaque(val) || '' : ''}"><td class="tv-n">${i + 1}</td>${vs.map((v) => `<td class="tv-v ${val[v] ? 'tv-t' : 'tv-f'}">${VF(val[v])}</td>`).join('')}${cols.map((c) => { const r = ev(c.f, val); return `<td class="${r ? 'tv-t' : 'tv-f'} ${c.cls || ''}">${VF(r)}</td>`; }).join('')}${marca ? `<td>${marca.f(val)}</td>` : ''}</tr>`).join('')}</tbody></table></div>${legenda ? `<p class="tv-leg">${legenda}</p>` : ''}`;
}
