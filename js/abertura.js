// Abertura do app: faíscas convergindo para a logo e saída automática em menos de 3 segundos.
// (Arquivo separado porque a política de segurança do site bloqueia scripts escritos dentro do HTML.)
(function () {
  var el = document.getElementById('intro'); if (!el) return;
  var calmo = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fim = function () { if (!el.isConnected) return; el.classList.add('sai'); setTimeout(function () { el.remove(); }, 600); };
  // A abertura fica na tela até o app terminar de carregar (mínimo de 1,4 s, máximo de 15 s), para não aparecer tela de "carregando"
  var app = document.getElementById('app'), pronto = false, minimo = false;
  var tenta = function () { if (pronto && minimo) fim(); };
  // pronto = a tela de verdade apareceu (login, vitrine ou o painel já preenchido, sem o "carregando")
  var ok = function () { return app.querySelector('.login, .pub') || (app.querySelector('#pagina') && !app.querySelector('#pagina > .loading') && app.querySelector('#pagina').children.length); };
  if (app && window.MutationObserver) new MutationObserver(function (m, o) { if (ok()) { pronto = true; o.disconnect(); tenta(); } }).observe(app, { childList: true, subtree: true });
  else pronto = true;
  setTimeout(function () { minimo = true; tenta(); }, calmo ? 200 : 1200);
  setTimeout(fim, 15000);
  el.addEventListener('click', fim); // um toque pula a abertura
  var cv = document.getElementById('introFx'); if (!cv || calmo) return;
  var c = cv.getContext('2d'), d = Math.min(2, window.devicePixelRatio || 1), w = innerWidth, h = innerHeight;
  cv.width = w * d; cv.height = h * d; c.scale(d, d);
  var ps = []; for (var i = 0; i < 90; i++) { ps.push({ a: Math.random() * 6.283, r: Math.max(w, h) * (0.45 + Math.random() * 0.4), s: 0.6 + Math.random() * 1.8 }); }
  var t0 = performance.now();
  (function f(t) {
    if (!el.isConnected) return;
    var k = Math.min(1, (t - t0) / 1400); c.clearRect(0, 0, w, h);
    for (var j = 0; j < ps.length; j++) {
      var p = ps[j], rr = p.r * (1 - k * k), x = w / 2 + Math.cos(p.a + k * 1.6) * rr, y = h / 2 + Math.sin(p.a + k * 1.6) * rr;
      c.beginPath(); c.arc(x, y, p.s, 0, 6.283); c.fillStyle = 'rgba(233,196,106,' + (0.25 + 0.75 * k * (1 - k) * 3) + ')'; c.shadowColor = '#e9c46a'; c.shadowBlur = 10; c.fill();
    }
    requestAnimationFrame(f);
  })(t0);
})();
