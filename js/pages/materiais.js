// Página Materiais: mesma tela das Apostilas, filtrada pelo tipo
import { render as base } from './apostilas.js';
export const render = (el, q) => base(el, q, 'material');
