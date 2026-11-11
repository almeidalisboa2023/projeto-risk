// Pasta "Cursos preparatórios": o administrador monta a vitrine (foto do órgão, vagas, matérias, preço, link da Hotmart).
import { db, storage, MODO_DEMO } from '../backend.js';
import { esc } from '../util.js';
import { toast, modal } from '../ui.js';
import { CURSOS, cursoInfo, materiasDoCurso } from '../cursos.js';
import { MATERIAS_TODAS } from '../leitura/index.js';

const DURACOES = [[30, '1 mês'], [90, '3 meses'], [180, '6 meses'], [365, '12 meses'], [540, '18 meses'], [730, '24 meses']];
const CAMPOS = ['titulo', 'orgao', 'cargo', 'situacao', 'vagas', 'salario', 'banca', 'escolaridade', 'data_prova', 'materias', 'descricao', 'preco', 'link_compra', 'hotmart_produto', 'curso', 'duracao_dias', 'ordem', 'foto_url'];

export async function cursosVenda(box) {
  let lista = [];
  try { lista = await db.select('cursos_venda', { order: 'ordem.asc,created_at.desc' }); }
  catch (e) { box.innerHTML = `<h3>Cursos preparatórios</h3><p class="bad">Não foi possível carregar: ${esc(e.message)}. Rode a atualização 16 no Supabase.</p>`; return; }
  box.innerHTML = `<div class="row"><h3 style="margin:0">Cursos preparatórios (${lista.length})</h3><span class="sp"></span><a class="btn sec mini" href="#/cursos" target="_blank">👁 Ver vitrine</a><button class="btn mini" id="cvNovo">+ Novo curso</button></div>
    <p class="muted" style="font-size:13px">A vitrine aparece para qualquer pessoa, mesmo sem conta. Só os cursos <b>publicados</b> aparecem. Ao comprar, a pessoa cria a conta e é levada à Hotmart com o mesmo e-mail; o acesso é liberado sozinho com o prazo do curso.</p>
    <div class="cv-lista">${lista.map((c) => `<div class="cv-item">
      <div class="cv-mini" style="${c.foto_url ? `background-image:url('${esc(c.foto_url)}')` : ''}">${c.foto_url ? '' : '📷'}</div>
      <div style="flex:1;min-width:0"><b>${esc(c.titulo)}</b> ${c.publicado ? '<span class="pill verde">Publicado</span>' : '<span class="pill">Rascunho</span>'}
        <div class="muted" style="font-size:12.5px">${esc([c.orgao, c.preco, cursoInfo(c.curso)?.curto && 'libera: ' + cursoInfo(c.curso).curto, c.duracao_dias && c.duracao_dias + ' dias'].filter(Boolean).join(' · '))}</div>
        ${!c.hotmart_produto || !c.curso ? '<div class="bad" style="font-size:12px">⚠ Falta o ID do produto da Hotmart ou o curso liberado: a liberação automática não vai funcionar.</div>' : ''}</div>
      <div class="row" style="gap:4px"><button class="btn mini sec" data-ed="${c.id}">Editar</button><button class="btn mini ${c.publicado ? 'sec' : 'verde'}" data-pub="${c.id}">${c.publicado ? 'Despublicar' : 'Publicar'}</button><button class="btn mini sec" data-del="${c.id}">Excluir</button></div></div>`).join('') || '<p class="muted">Nenhum curso cadastrado. Clique em “+ Novo curso”.</p>'}</div>`;
  const reabre = () => cursosVenda(box);
  box.querySelector('#cvNovo').onclick = () => editor({ duracao_dias: 365, publicado: false, ordem: lista.length }, reabre);
  box.querySelectorAll('[data-ed]').forEach((b) => (b.onclick = () => editor(lista.find((x) => x.id === b.dataset.ed), reabre)));
  box.querySelectorAll('[data-pub]').forEach((b) => (b.onclick = async () => {
    const c = lista.find((x) => x.id === b.dataset.pub);
    if (!c.publicado && (!c.link_compra || !c.preco)) return toast('Antes de publicar, preencha o preço e o link de compra.', 'erro');
    try { await db.update('cursos_venda', { id: 'eq.' + c.id }, { publicado: !c.publicado, atualizado_em: new Date().toISOString() }); toast(c.publicado ? 'Curso tirado da vitrine.' : 'Curso publicado na vitrine!'); reabre(); } catch (e) { toast(e.message, 'erro'); }
  }));
  box.querySelectorAll('[data-del]').forEach((b) => (b.onclick = async () => {
    if (!confirm('Excluir este curso da vitrine? As compras já registradas continuam guardadas.')) return;
    try { await db.remove('cursos_venda', { id: 'eq.' + b.dataset.del }); reabre(); } catch (e) { toast(e.message, 'erro'); }
  }));
}

function editor(c, pronto) {
  const v = (k) => esc(c[k] ?? '');
  const dur = Number(c.duracao_dias) || 365;
  modal(`<h3>${c.id ? 'Editar curso' : 'Novo curso preparatório'}</h3>
    <div class="campo"><label>Foto do órgão (capa)</label>
      <div class="cv-foto" id="cvPrev" style="${c.foto_url ? `background-image:url('${esc(c.foto_url)}')` : ''}">${c.foto_url ? '' : '<span>Sem foto</span>'}</div>
      <input type="file" id="cvFoto" accept="image/*"><small class="muted">Use uma foto sua ou com direito de uso (prédio, viatura, equipe). Evite brasões e logotipos oficiais.</small></div>
    <div class="campo"><label>Título do curso *</label><input id="f_titulo" value="${v('titulo')}" placeholder="Preparatório PRF 2027" style="width:100%"></div>
    <div class="row"><div class="campo" style="flex:1"><label>Órgão</label><input id="f_orgao" value="${v('orgao')}" placeholder="Polícia Rodoviária Federal" style="width:100%"></div>
      <div class="campo" style="flex:1"><label>Cargo</label><input id="f_cargo" value="${v('cargo')}" placeholder="Policial Rodoviário Federal" style="width:100%"></div></div>
    <div class="row"><div class="campo" style="flex:1"><label>Situação</label><input id="f_situacao" value="${v('situacao')}" placeholder="Edital previsto" style="width:100%"></div>
      <div class="campo" style="flex:1"><label>Vagas</label><input id="f_vagas" value="${v('vagas')}" placeholder="1.000" style="width:100%"></div>
      <div class="campo" style="flex:1"><label>Salário</label><input id="f_salario" value="${v('salario')}" placeholder="R$ 10.000" style="width:100%"></div></div>
    <div class="row"><div class="campo" style="flex:1"><label>Banca</label><input id="f_banca" value="${v('banca')}" placeholder="Cebraspe" style="width:100%"></div>
      <div class="campo" style="flex:1"><label>Escolaridade</label><input id="f_escolaridade" value="${v('escolaridade')}" placeholder="Nível superior" style="width:100%"></div>
      <div class="campo" style="flex:1"><label>Data da prova</label><input id="f_data_prova" value="${v('data_prova')}" placeholder="a definir" style="width:100%"></div></div>
    <div class="campo"><label>Matérias (uma por linha)</label><textarea id="f_materias" rows="5" style="width:100%">${v('materias')}</textarea>
      <button type="button" class="linkbtn" id="cvMats" style="font-size:12.5px">Preencher com as matérias do curso escolhido abaixo</button></div>
    <div class="campo"><label>Descrição</label><textarea id="f_descricao" rows="4" style="width:100%" placeholder="O que o aluno recebe, diferenciais, para quem é…">${v('descricao')}</textarea></div>
    <div class="row"><div class="campo" style="flex:1"><label>Preço *</label><input id="f_preco" value="${v('preco')}" placeholder="R$ 197,00 ou 12x de R$ 19,70" style="width:100%"></div>
      <div class="campo" style="flex:1"><label>Ordem na vitrine</label><input id="f_ordem" type="number" value="${Number(c.ordem) || 0}" style="width:100%"></div></div>
    <div class="campo"><label>Link de compra (checkout da Hotmart) *</label><input id="f_link_compra" value="${v('link_compra')}" placeholder="https://pay.hotmart.com/..." style="width:100%"></div>
    <div class="cv-caixa"><b>Liberação automática</b>
      <div class="row"><div class="campo" style="flex:1"><label>ID do produto na Hotmart</label><input id="f_hotmart_produto" value="${v('hotmart_produto')}" placeholder="ex.: 1234567" inputmode="numeric" style="width:100%"></div>
        <div class="campo" style="flex:1.4"><label>Curso liberado no app</label><select id="f_curso" style="width:100%"><option value="">— escolha —</option>${CURSOS.map((k) => `<option value="${k.id}" ${k.id === c.curso ? 'selected' : ''}>${esc(k.nome)}</option>`).join('')}</select></div></div>
      <div class="campo"><label>Prazo de acesso</label><select id="f_duracao_dias">${DURACOES.map(([n, r]) => `<option value="${n}" ${n === dur ? 'selected' : ''}>${r}</option>`).join('')}${DURACOES.some(([n]) => n === dur) ? '' : `<option value="${dur}" selected>${dur} dias</option>`}<option value="outro">Outro (em dias)…</option></select></div>
      <small class="muted">O ID do produto aparece na Hotmart em Produtos → seu produto (número ao lado do nome). Quem já é aluno e compra de novo tem o prazo somado ao que já tinha.</small></div>
    <div class="row" style="margin-top:12px"><span class="sp"></span><button class="btn sec" id="cvSalvar">Salvar rascunho</button><button class="btn verde" id="cvPublicar">Salvar e publicar</button></div>`, {
    largo: true,
    onMount: (m, close) => {
      const $ = (q) => m.querySelector(q);
      let foto = c.foto_url || null, arquivo = null;
      $('#cvFoto').onchange = (e) => {
        arquivo = e.target.files[0] || null; if (!arquivo) return;
        if (arquivo.size > 5 * 1024 * 1024) { arquivo = null; e.target.value = ''; return toast('A foto deve ter até 5 MB.', 'erro'); }
        const url = URL.createObjectURL(arquivo); $('#cvPrev').style.backgroundImage = `url('${url}')`; $('#cvPrev').innerHTML = '';
      };
      $('#f_duracao_dias').onchange = (e) => { if (e.target.value !== 'outro') return; const n = Number(prompt('Prazo de acesso em dias:', '365')); if (n > 0) { const o = document.createElement('option'); o.value = n; o.textContent = n + ' dias'; o.selected = true; e.target.insertBefore(o, e.target.lastElementChild); } else e.target.value = '365'; };
      $('#cvMats').onclick = () => {
        const k = cursoInfo($('#f_curso').value); if (!k) return toast('Escolha primeiro o “Curso liberado no app”.', 'erro');
        $('#f_materias').value = materiasDoCurso(k).map((it) => MATERIAS_TODAS.find((x) => x.id === it.id)?.nome || it.id).join('\n');
      };
      const salvar = async (publicar, ev) => {
        const d = {};
        for (const k of CAMPOS) { const el = $('#f_' + k); if (el) d[k] = el.value.trim() || null; }
        d.duracao_dias = Number(d.duracao_dias) || 365; d.ordem = Number(d.ordem) || 0;
        if (!d.titulo) return toast('Informe o título do curso.', 'erro');
        if (d.link_compra && !/^https:\/\//i.test(d.link_compra)) return toast('O link de compra precisa começar com https://', 'erro');
        if (publicar && (!d.preco || !d.link_compra)) return toast('Para publicar, preencha o preço e o link de compra.', 'erro');
        ev.target.disabled = true;
        try {
          if (arquivo) {
            const ext = (arquivo.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
            foto = await storage.upload('cursos', `capa-${Date.now()}.${ext}`, arquivo);
          }
          d.foto_url = foto; d.atualizado_em = new Date().toISOString();
          if (publicar) d.publicado = true;
          if (c.id) await db.update('cursos_venda', { id: 'eq.' + c.id }, d);
          else await db.insert('cursos_venda', [{ ...d, publicado: !!publicar }]);
          toast(publicar ? 'Curso publicado na vitrine!' : 'Curso salvo.' + (MODO_DEMO && arquivo ? ' (No modo demonstração a foto some ao recarregar.)' : ''));
          close(); pronto();
        } catch (e) { toast(e.message, 'erro'); ev.target.disabled = false; }
      };
      $('#cvSalvar').onclick = (ev) => salvar(false, ev);
      $('#cvPublicar').onclick = (ev) => salvar(true, ev);
    },
  });
}
