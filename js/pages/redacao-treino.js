// Treino de redação (barra lateral): abre a matéria Redação interativa no leitor, com os exercícios de escrita e a análise na hora.
export async function render(el, q) {
  const p = new URLSearchParams(q ? q.toString() : '');
  if (!p.get('a')) p.set('a', 'redacao-interativa/');
  const m = await import('./leitura.js');
  return m.render(el, p);
}
