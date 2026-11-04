// Leitura R.I.S.K. — Língua Portuguesa (aula completa, para qualquer edital). Texto original.
import { PT_A } from './pt-a.js';
import { PT_B } from './pt-b.js';
import { PT_C } from './pt-c.js';
import { PT_D } from './pt-d.js';
import { Q1 } from './pt-q1.js';
import { Q2 } from './pt-q2.js';
import { Q3 } from './pt-q3.js';
import { Q4 } from './pt-q4.js';
const BANCO = { ...Q1, ...Q2, ...Q3, ...Q4 };

export default {
  id: 'portugues', nome: 'Língua Portuguesa', apelidos: ['portugues', 'lingua portuguesa', 'gramatica', 'redacao'],
  atualizado: 'novembro de 2026 · aula completa',
  assuntos: [...PT_A, ...PT_B, ...PT_C, ...PT_D].map((a) => ({ ...a, quiz: [...(a.quiz || []), ...(BANCO[a.id] || [])] })),
};
