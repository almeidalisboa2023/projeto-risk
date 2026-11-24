// Fotos de fundo dos cursos: galeria pronta do app + foto enviada pelo administrador (salva em cursos_ajustes.fundo).
import { S } from './state.js';

export const GALERIA = [
  { id: 'rodoviario', nome: 'PRF (rodovia)', arq: 'img/temas/rodoviario.webp' },
  { id: 'federal', nome: 'Polícia Federal', arq: 'img/temas/federal.webp' },
  { id: 'civil', nome: 'Polícia Civil (PCMG)', arq: 'img/temas/civil.webp' },
  { id: 'pm', nome: 'Polícia Militar (PMMG)', arq: 'img/temas/pm.webp' },
  { id: 'bombeiro', nome: 'Bombeiro Militar', arq: 'img/temas/bombeiro.webp' },
  { id: 'juridico', nome: 'Tribunal', arq: 'img/temas/juridico.webp' },
  { id: 'procurador', nome: 'Procuradoria (ilustração)', arq: 'img/temas/procurador.svg' },
  { id: 'padrao', nome: 'Neutro R.I.S.K.', arq: 'img/temas/padrao.svg' },
];

// O que o administrador escolheu para o curso: 'galeria:<id>', uma URL de foto enviada, ou nada (padrão do tema)
export const fundoDoCurso = (cursoId) => (S.cursosAjustes || []).find((x) => x.curso === cursoId)?.fundo || '';

// Converte a escolha em { id para data-fundo, url opcional }
export function resolverFundo(escolha) {
  if (!escolha) return null;
  if (escolha.startsWith('galeria:')) { const g = GALERIA.find((x) => x.id === escolha.slice(8)); return g ? { id: g.id } : null; }
  if (/^https:\/\/|^data:image\/|^blob:/.test(escolha)) return { id: 'foto', url: escolha };
  return null;
}

// Reduz a foto no navegador (máx. 2560 px de largura, WebP) para carregar rápido sem perder nitidez
export function prepararFoto(file) {
  return new Promise((ok, erro) => {
    const img = new Image(); const u = URL.createObjectURL(file);
    img.onload = () => {
      const max = 2560, k = Math.min(1, max / img.naturalWidth);
      const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
      const ctx = c.getContext('2d'); ctx.imageSmoothingQuality = 'high'; ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(u);
      c.toBlob((b) => b ? ok({ blob: b, largura: img.naturalWidth, altura: img.naturalHeight }) : erro(new Error('Não foi possível ler a imagem.')), 'image/webp', 0.88);
    };
    img.onerror = () => { URL.revokeObjectURL(u); erro(new Error('Arquivo de imagem inválido.')); };
    img.src = u;
  });
}
