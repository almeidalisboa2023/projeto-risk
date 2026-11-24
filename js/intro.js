// Efeitos da abertura e da tela de entrada: faíscas douradas em canvas e cartão que inclina com o ponteiro.
const calmo = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Faíscas que sobem devagar (fundo da tela de entrada). Para sozinho quando o canvas sai da página.
export function faiscas(cv, { qtd = 70, cor = '233,196,106' } = {}) {
  if (!cv || calmo()) return;
  const ctx = cv.getContext('2d'); let w = 0, h = 0; const dpr = Math.min(2, devicePixelRatio || 1);
  const tam = () => { w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  tam(); addEventListener('resize', tam);
  const nova = (y) => ({ x: Math.random() * w, y: y ?? h + Math.random() * 40, r: 0.6 + Math.random() * 1.8, v: 0.15 + Math.random() * 0.55, f: Math.random() * 6.28, a: 0.25 + Math.random() * 0.6 });
  const ps = Array.from({ length: qtd }, () => nova(Math.random() * h));
  const passo = (t) => {
    if (!cv.isConnected) { removeEventListener('resize', tam); return; }
    ctx.clearRect(0, 0, w, h);
    for (const p of ps) {
      p.y -= p.v; p.x += Math.sin(t / 1400 + p.f) * 0.25;
      if (p.y < -10) Object.assign(p, nova());
      const brilho = p.a * (0.6 + 0.4 * Math.sin(t / 500 + p.f));
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = `rgba(${cor},${brilho})`; ctx.shadowColor = `rgba(${cor},.9)`; ctx.shadowBlur = 8; ctx.fill();
    }
    requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

// Inclinação 3D suave do cartão acompanhando o mouse (no celular fica parado)
export function inclinar(card) {
  if (!card || calmo() || matchMedia('(pointer: coarse)').matches) return;
  const zona = card.parentElement;
  zona.addEventListener('pointermove', (e) => {
    const r = zona.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--ry', (x * 6).toFixed(2) + 'deg'); card.style.setProperty('--rx', (-y * 6).toFixed(2) + 'deg');
  });
  zona.addEventListener('pointerleave', () => { card.style.setProperty('--ry', '0deg'); card.style.setProperty('--rx', '0deg'); });
}

// Logo em camadas (lâmpada + nome) que "nasce" em 3D
export const logo3D = (extra = '') => `<div class="logo3d ${extra}" aria-label="PROJETO R.I.S.K."><div class="l3-palco">
  <i class="l3-anel pulso"></i><i class="l3-anel pulso b"></i><i class="l3-halo"></i><img class="l3-bulbo" src="img/logo-3d-bulbo.webp" alt=""><img class="l3-texto" src="img/logo-3d-texto.webp" alt="PROJETO R.I.S.K."><i class="l3-brilho"></i></div></div>`;
