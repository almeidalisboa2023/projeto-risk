import { S } from '../state.js';
import { db } from '../backend.js';
import { iso, hoje, addDias, pct } from '../util.js';
import { barra, toast } from '../ui.js';

export async function render(el) {
  const meta = S.profile.meta_agua || 4000;
  const regs = await db.select('agua', { user_id: 'eq.' + S.user.id, data: 'gte.' + iso(addDias(hoje(), -6)), order: 'created_at.asc' });
  const dia = (d) => regs.filter((r) => r.data === iso(d)).reduce((s, r) => s + r.ml, 0);
  const total = dia(hoje());
  el.innerHTML = `<div class="mono up">Hidratação</div><h1>Água hoje</h1>
    <div class="card"><div class="num">${total} <span class="muted" style="font-size:1rem">/ ${meta} ml</span></div>${barra(pct(total, meta))}
      <div class="row" style="margin-top:14px">${[200, 300, 500, 750].map((v) => `<button class="btn sec" data-ml="${v}">+ ${v} ml</button>`).join('')}
      <input type="number" id="outro" placeholder="Outro (ml)" style="width:130px"><button class="btn" id="add">Adicionar</button></div></div>
    <div class="card" style="margin-top:16px"><h3>Últimos 7 dias</h3>${Array.from({ length: 7 }, (_, i) => addDias(hoje(), -i)).map((d) => { const v = dia(d); return `<div style="margin:8px 0"><div class="row"><span>${d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })}</span><span class="sp"></span><b>${v} ml</b></div>${barra(pct(v, meta))}</div>`; }).join('')}</div>`;
  const add = async (ml) => { if (!(ml > 0)) return toast('Informe a quantidade.', 'erro'); try { await db.insert('agua', [{ user_id: S.user.id, data: iso(hoje()), ml }]); render(el); } catch (e) { toast(e.message, 'erro'); } };
  el.querySelectorAll('[data-ml]').forEach((b) => (b.onclick = () => add(Number(b.dataset.ml))));
  el.querySelector('#add').onclick = () => add(Number(el.querySelector('#outro').value));
}
