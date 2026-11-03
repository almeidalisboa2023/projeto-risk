// Ilustrações em SVG (placas no padrão brasileiro, veículos e esquemas) e blocos visuais das leituras.
const svg = (inner, vb = '0 0 100 100') => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img">${inner}</svg>`;
const txt = (x, y, t, s = 22, c = '#111', w = 800) => `<text x="${x}" y="${y}" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">${t}</text>`;

// ---------- Placas ----------
export const placa = {
  pare: () => svg(`<polygon points="30,2 70,2 98,30 98,70 70,98 30,98 2,70 2,30" fill="#C8102E" stroke="#fff" stroke-width="4"/>${txt(50, 59, 'PARE', 25, '#fff')}`),
  preferencia: () => svg(`<polygon points="6,10 94,10 50,90" fill="#fff" stroke="#C8102E" stroke-width="10" stroke-linejoin="round"/>`),
  vel: (n) => svg(`<circle cx="50" cy="50" r="44" fill="#fff" stroke="#C8102E" stroke-width="10"/>${txt(50, 56, n, n >= 100 ? 28 : 34)}${txt(50, 74, 'km/h', 11, '#111', 600)}`),
  proibidoEstacionar: () => svg(`<circle cx="50" cy="50" r="44" fill="#fff" stroke="#C8102E" stroke-width="10"/>${txt(50, 63, 'E', 40)}<line x1="20" y1="20" x2="80" y2="80" stroke="#C8102E" stroke-width="9"/>`),
  sentidoProibido: () => svg(`<circle cx="50" cy="50" r="48" fill="#C8102E"/><rect x="18" y="41" width="64" height="18" fill="#fff"/>`),
  proibidoUltrapassar: () => svg(`<circle cx="50" cy="50" r="44" fill="#fff" stroke="#C8102E" stroke-width="10"/><rect x="30" y="34" width="14" height="26" rx="4" fill="#C8102E"/><rect x="56" y="40" width="14" height="26" rx="4" fill="#111"/><line x1="20" y1="20" x2="80" y2="80" stroke="#C8102E" stroke-width="9"/>`),
  curva: () => svg(`<polygon points="50,3 97,50 50,97 3,50" fill="#F5C400" stroke="#111" stroke-width="4"/><path d="M42 74 V48 Q42 34 56 34 H60" fill="none" stroke="#111" stroke-width="8"/><polygon points="58,22 74,34 58,46" fill="#111"/>`),
  pedestre: () => svg(`<polygon points="50,3 97,50 50,97 3,50" fill="#F5C400" stroke="#111" stroke-width="4"/><circle cx="52" cy="26" r="6" fill="#111"/><path d="M52 34 L48 54 L40 72 M48 54 L58 72 M50 40 L38 48 M50 40 L62 46" stroke="#111" stroke-width="6" stroke-linecap="round" fill="none"/>`),
  lombada: () => svg(`<polygon points="50,3 97,50 50,97 3,50" fill="#F5C400" stroke="#111" stroke-width="4"/><path d="M22 62 H34 Q50 36 66 62 H78" fill="none" stroke="#111" stroke-width="7" stroke-linejoin="round"/>`),
  escolares: () => svg(`<polygon points="50,3 97,50 50,97 3,50" fill="#F5C400" stroke="#111" stroke-width="4"/><circle cx="40" cy="30" r="5" fill="#111"/><circle cx="60" cy="34" r="4" fill="#111"/><path d="M40 37 V56 L34 70 M40 56 L46 70 M60 40 V56 L56 68 M60 56 L64 68 M40 44 L60 46" stroke="#111" stroke-width="5" stroke-linecap="round" fill="none"/>`),
  obras: () => svg(`<polygon points="50,3 97,50 50,97 3,50" fill="#F28C00" stroke="#111" stroke-width="4"/>${txt(50, 57, 'OBRAS', 17)}`),
};

// ---------- Outras figuras ----------
export const desenho = {
  semaforo: () => svg(`<rect x="34" y="4" width="32" height="92" rx="9" fill="#1b1b1b"/><circle cx="50" cy="22" r="10" fill="#E53935"/><circle cx="50" cy="50" r="10" fill="#FBC02D"/><circle cx="50" cy="78" r="10" fill="#43A047"/>`),
  faixa: () => svg(`<rect width="120" height="70" fill="#5b5b5b"/>${[10, 30, 50, 70, 90].map((x) => `<rect x="${x}" y="8" width="12" height="54" fill="#fff"/>`).join('')}`, '0 0 120 70'),
  agente: () => svg(`<circle cx="50" cy="20" r="11" fill="#2b4a8b"/><rect x="38" y="12" width="24" height="6" fill="#111"/><rect x="36" y="33" width="28" height="36" rx="6" fill="#2b4a8b"/><path d="M36 40 L14 22 M64 40 L86 52" stroke="#2b4a8b" stroke-width="9" stroke-linecap="round"/><rect x="40" y="69" width="8" height="26" fill="#1f3566"/><rect x="52" y="69" width="8" height="26" fill="#1f3566"/><rect x="36" y="44" width="28" height="5" fill="#F5C400"/>`),
  escolar: () => svg(`<rect x="6" y="18" width="148" height="52" rx="10" fill="#fff" stroke="#333" stroke-width="2"/><rect x="18" y="24" width="26" height="16" rx="3" fill="#9cc7e8"/><rect x="50" y="24" width="26" height="16" rx="3" fill="#9cc7e8"/><rect x="82" y="24" width="26" height="16" rx="3" fill="#9cc7e8"/><rect x="114" y="24" width="30" height="16" rx="3" fill="#9cc7e8"/><rect x="6" y="44" width="148" height="12" fill="#F5C400"/>${txt(80, 54, 'ESCOLAR', 11, '#111')}<circle cx="38" cy="72" r="10" fill="#222"/><circle cx="122" cy="72" r="10" fill="#222"/><rect x="8" y="10" width="8" height="6" fill="#F5C400"/><rect x="144" y="10" width="8" height="6" fill="#C8102E"/>`, '0 0 160 86'),
  documento: (titulo, linha) => svg(`<rect x="6" y="6" width="148" height="88" rx="8" fill="#eef6ee" stroke="#3a7d44" stroke-width="2"/><rect x="6" y="6" width="148" height="20" rx="8" fill="#3a7d44"/>${txt(80, 21, titulo, 11, '#fff')}<rect x="16" y="36" width="80" height="7" rx="3" fill="#9bbf9f"/><rect x="16" y="50" width="110" height="7" rx="3" fill="#9bbf9f"/><rect x="16" y="64" width="64" height="7" rx="3" fill="#9bbf9f"/><rect x="108" y="58" width="36" height="26" rx="4" fill="#fff" stroke="#3a7d44"/>${txt(126, 76, linha, 10, '#3a7d44')}`, '0 0 160 100'),
};

// ---------- Blocos visuais ----------
// Linha de figuras com legenda
export const figuras = (itens, legenda = '') => `<figure class="lt-fig"><div class="lt-fig-row">${itens.map(([s, l]) => `<div class="lt-fig-it"><div class="lt-fig-img">${s}</div>${l ? `<small>${l}</small>` : ''}</div>`).join('')}</div>${legenda ? `<figcaption>${legenda}</figcaption>` : ''}</figure>`;
// Cartões coloridos: [emoji, título, texto, cor]
export const cartoes = (itens) => `<div class="lt-cards">${itens.map(([i, t, x, c]) => `<div class="lt-card" style="--c:${c || 'var(--ouro)'}"><span class="lt-card-i">${i}</span><b>${t}</b>${x ? `<small>${x}</small>` : ''}</div>`).join('')}</div>`;
// Passo a passo / linha do tempo
export const passos = (itens) => `<ol class="lt-passos">${itens.map(([t, x]) => `<li><b>${t}</b>${x ? `<small>${x}</small>` : ''}</li>`).join('')}</ol>`;

export const COR = { verm: '#C8102E', lar: '#E67E22', amar: '#D4A017', verde: '#2E7D4F', azul: '#2B6CB0', roxo: '#7B3FA0', cinza: '#6B6458' };
