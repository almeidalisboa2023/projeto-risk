// Leitor/gravador de CSV (separador ; ou ,), com aspas e quebras de linha dentro de campos.
export function parseCSV(texto) {
  texto = texto.replace(/^﻿/, '');
  const prim = texto.split(/\r?\n/, 1)[0];
  const sep = (prim.match(/;/g) || []).length >= (prim.match(/,/g) || []).length ? ';' : ',';
  const linhas = []; let campo = '', linha = [], aspas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (aspas) {
      if (c === '"') { if (texto[i + 1] === '"') { campo += '"'; i++; } else aspas = false; }
      else campo += c;
    } else if (c === '"') aspas = true;
    else if (c === sep) { linha.push(campo); campo = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && texto[i + 1] === '\n') i++; linha.push(campo); linhas.push(linha); linha = []; campo = ''; }
    else campo += c;
  }
  if (campo !== '' || linha.length) { linha.push(campo); linhas.push(linha); }
  const cab = (linhas.shift() || []).map((h) => h.trim().replace(/^"|"$/g, '').toLowerCase());
  return linhas.filter((l) => l.some((x) => x.trim() !== '')).map((l) => Object.fromEntries(cab.map((h, i) => [h, (l[i] ?? '').trim()])));
}
export function toCSV(rows, cols) {
  const q = (v) => { const s = String(v ?? ''); return /[;"\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  return [cols.join(';'), ...rows.map((r) => cols.map((c) => q(r[c])).join(';'))].join('\n');
}
export function baixar(nome, conteudo, tipo = 'text/csv;charset=utf-8') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + conteudo], { type: tipo }));
  a.download = nome; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
