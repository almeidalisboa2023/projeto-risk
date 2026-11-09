// Administrador · Matérias dos cursos: incluir ou excluir matérias de cada curso (vale para todos os alunos do curso).
import { S } from '../state.js';
import { db } from '../backend.js';
import { esc } from '../util.js';
import { toast } from '../ui.js';
import { CURSOS, cursoInfo, materiasDoCurso } from '../cursos.js';
import { MATERIAS_TODAS, comConteudos } from '../leitura/index.js';

export function materiasCursos(box) {
  let curso = CURSOS[0].id, rascunho = null;
  const ajusteDe = (id) => (S.cursosAjustes || []).find((x) => x.curso === id) || { curso: id, incluidas: [], excluidas: [] };
  const comecar = () => { const a = ajusteDe(curso); rascunho = { incluidas: [...(a.incluidas || [])], excluidas: [...(a.excluidas || [])] }; };
  const desenha = () => {
    const c = cursoInfo(curso), todas = comConteudos(MATERIAS_TODAS);
    const nomeDe = (id) => todas.find((m) => m.id === id)?.nome || id;
    const topicos = (id, it) => { const m = todas.find((x) => x.id === id); return m ? (it?.assuntos ? it.assuntos.length : m.assuntos.length) : 0; };
    const atual = materiasDoCurso(c, [{ curso, ...rascunho }]);
    const original = new Set(c.materias.map((it) => it.id));
    const excluidasDoEdital = c.materias.filter((it) => rascunho.excluidas.includes(it.id));
    const fora = todas.filter((m) => !atual.some((it) => it.id === m.id) && !excluidasDoEdital.some((it) => it.id === m.id));
    const salvo = JSON.stringify(rascunho) === JSON.stringify({ incluidas: ajusteDe(curso).incluidas || [], excluidas: ajusteDe(curso).excluidas || [] });
    box.innerHTML = `<div class="row"><h3 style="margin:0">🎓 Matérias dos cursos</h3><span class="sp"></span>
        <select id="mcCurso">${CURSOS.map((x) => `<option value="${x.id}" ${x.id === curso ? 'selected' : ''}>${esc(x.nome)}</option>`).join('')}</select></div>
      <p class="muted" style="font-size:13px">Inclua ou exclua matérias do curso. Vale para <b>todos os alunos</b> desse curso. Para tirar uma matéria de um aluno só, use “Conferir” na lista de alunos.</p>
      <div class="campo"><label>No curso (${atual.length})</label>
        ${atual.map((it) => `<div class="row mat-lin" style="border-top:1px solid var(--borda);padding:6px 0">
          <span style="flex:1"><b>${esc(nomeDe(it.id))}</b> <span class="muted" style="font-size:12px">${topicos(it.id, it)} tópicos${it.obs ? ' · ' + esc(it.obs) : ''}${original.has(it.id) ? '' : ' · <span class="pill">incluída por você</span>'}</span></span>
          <button type="button" class="btn mini sec" data-tira="${it.id}">Excluir</button></div>`).join('') || '<p class="muted">Nenhuma matéria.</p>'}</div>
      ${excluidasDoEdital.length ? `<div class="campo"><label>Excluídas do curso (${excluidasDoEdital.length})</label>
        ${excluidasDoEdital.map((it) => `<div class="row mat-lin off" style="border-top:1px solid var(--borda);padding:6px 0">
          <span style="flex:1"><b>${esc(nomeDe(it.id))}</b> <span class="pill" style="background:var(--vermelho);color:#fff">excluída</span></span>
          <button type="button" class="btn mini" data-volta="${it.id}">Incluir de volta</button></div>`).join('')}</div>` : ''}
      <div class="row" style="align-items:flex-end"><div class="campo" style="flex:1;min-width:220px;margin:0"><label>Incluir outra matéria do app</label>
        <select id="mcNova" style="width:100%"><option value="">— escolha —</option>${fora.map((m) => `<option value="${esc(m.id)}">${esc(m.nome)} (${m.assuntos.length} tópicos)</option>`).join('')}</select></div>
        <button class="btn sec" id="mcInc">Incluir</button></div>
      <div class="row" style="margin-top:12px"><span class="muted" style="font-size:13px">${salvo ? '' : '⚠ Alterações ainda não confirmadas.'}</span><span class="sp"></span>
        <button class="btn sec" id="mcDesf" ${salvo ? 'disabled' : ''}>Desfazer</button><button class="btn verde" id="mcOk" ${salvo ? 'disabled' : ''}>Confirmar</button></div>`;
    const $ = (q) => box.querySelector(q);
    $('#mcCurso').onchange = (e) => { if (!salvo && !confirm('Há alterações não confirmadas neste curso. Trocar mesmo assim?')) { e.target.value = curso; return; } curso = e.target.value; comecar(); desenha(); };
    box.querySelectorAll('[data-tira]').forEach((b) => (b.onclick = () => {
      const id = b.dataset.tira;
      if (rascunho.incluidas.includes(id)) rascunho.incluidas = rascunho.incluidas.filter((x) => x !== id);
      else rascunho.excluidas.push(id);
      desenha();
    }));
    box.querySelectorAll('[data-volta]').forEach((b) => (b.onclick = () => { rascunho.excluidas = rascunho.excluidas.filter((x) => x !== b.dataset.volta); desenha(); }));
    $('#mcInc').onclick = () => { const id = $('#mcNova').value; if (!id) return toast('Escolha a matéria.', 'erro'); rascunho.excluidas = rascunho.excluidas.filter((x) => x !== id); if (!original.has(id)) rascunho.incluidas.push(id); desenha(); };
    $('#mcDesf').onclick = () => { comecar(); desenha(); };
    $('#mcOk').onclick = async (ev) => {
      ev.target.disabled = true;
      const reg = { curso, incluidas: rascunho.incluidas, excluidas: rascunho.excluidas, atualizado_em: new Date().toISOString() };
      try {
        await db.insert('cursos_ajustes', [reg], { upsert: true, onConflict: 'curso' });
        S.cursosAjustes = [...(S.cursosAjustes || []).filter((x) => x.curso !== curso), reg];
        toast(`Matérias de ${cursoInfo(curso).curto} atualizadas.`); desenha();
      } catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; }
    };
  };
  comecar(); desenha();
}
