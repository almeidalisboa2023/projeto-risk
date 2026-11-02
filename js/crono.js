// Cronômetro de estudo: um por vez. Ao parar, vira uma sessão na página "Horas de estudo"
// (e, se veio de um bloco do calendário, soma também no tempo do bloco).
import { S } from './state.js';
import { db } from './backend.js';
import { esc, iso, hoje } from './util.js';
import { toast } from './ui.js';

const KEY = 'risk-crono';
let tick = null;
export function atual() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } }
const grava = (v) => { try { v ? localStorage.setItem(KEY, JSON.stringify(v)) : localStorage.removeItem(KEY); } catch {} };
export const fmt = (ms) => { const s = Math.floor(ms / 1000); return [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map((n) => String(n).padStart(2, '0')).join(':'); };
export const fmtMin = (m) => { m = Math.round(m || 0); return m >= 60 ? `${Math.floor(m / 60)}h${String(m % 60).padStart(2, '0')}` : `${m} min`; };

// t = tarefa do calendário  OU  { materia } para cronômetro livre
export async function iniciar(t) {
  const c = atual();
  if (c) await parar();
  grava({ id: t.id || null, tarefa: !!t.id, materia: t.materia || 'Sem matéria', inicio: Date.now() });
  flutuante();
}

export async function parar() {
  const c = atual(); if (!c) return 0;
  grava(null);
  const min = Math.max(1, Math.round((Date.now() - c.inicio) / 60000));
  try {
    const [s] = await db.insert('sessoes_estudo', [{ user_id: S.user.id, edital_id: S.edital?.id || null, tarefa_id: c.tarefa ? c.id : null, materia: c.materia, data: iso(hoje()), minutos: min, origem: 'cronometro' }]);
    if (s) S.sessoes.push(s);
  } catch (e) { toast('Não foi possível salvar a sessão: ' + e.message, 'erro'); }
  if (c.tarefa) {
    try {
      const t = S.tarefas.find((x) => x.id === c.id);
      const base = t ? t.minutos || 0 : 0;
      const [n] = await db.update('tarefas', { id: 'eq.' + c.id }, { minutos: base + min });
      if (t && n) Object.assign(t, n);
    } catch {}
  }
  toast(`${fmtMin(min)} de ${c.materia} registrados em Horas de estudo.`);
  flutuante();
  return min;
}

// Caixinha no canto da tela enquanto o cronômetro roda (aparece em qualquer página)
export function flutuante() {
  clearInterval(tick);
  document.querySelector('.crono-flut')?.remove();
  const c = atual(); if (!c) return;
  const box = document.createElement('div');
  box.className = 'crono-flut';
  box.innerHTML = `<a href="#/horas" style="color:inherit;text-decoration:none">⏱ ${esc(c.materia)}</a><b id="cfT">${fmt(Date.now() - c.inicio)}</b><button id="cfP">Parar</button>`;
  document.body.appendChild(box);
  tick = setInterval(() => { const el = document.getElementById('cfT'); if (!el) return clearInterval(tick); el.textContent = fmt(Date.now() - c.inicio); }, 1000);
  box.querySelector('#cfP').onclick = async () => { await parar(); window.dispatchEvent(new Event('risk-crono')); };
}
