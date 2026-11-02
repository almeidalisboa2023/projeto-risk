// Resolução de questões (uma por vez), usada no banco, nos blocos e nas questões da IA.
import { S, registrarResposta, normResp } from './state.js';
import { db } from './backend.js';
import { esc } from './util.js';
import { enunciadoHTML, sanitize, modal, toast } from './ui.js';

const DIF = { 1: ['f', 'Fácil'], 2: ['m', 'Médio'], 3: ['d', 'Difícil'] };
// Selos no estilo cartão: banca, ano, dificuldade + órgão, cargo, matéria e assunto
export function tagsQuestao(q, { extra = '' } = {}) {
  const d = DIF[Number(q.dificuldade)];
  const origem = q.origem === 'inedita' ? '<span class="pill rosa">Inédita R.I.S.K.</span>' : q.origem === 'ia' ? '<span class="pill rosa">Gerada por IA</span>' : '';
  const sit = q.situacao && q.situacao !== 'atualizada' ? `<span class="pill">${esc(q.situacao)}</span>` : '';
  return `<div class="qtags">${q.banca ? `<span class="pill ouro">${esc(q.banca)}</span>` : ''}${q.ano ? `<b>${esc(q.ano)}</b>` : ''}${d ? `<span class="dif ${d[0]}">${d[1]}</span>` : ''}${origem}${sit}<span class="sp"></span><span class="mono">${esc(q.codigo || '')}</span>${extra}</div>
    <div class="qmeta">${q.orgao ? `<span>🏛 ${esc(q.orgao)}</span>` : ''}${q.cargo ? `<span>💼 ${esc(q.cargo)}</span>` : ''}${q.materia ? `<span>📚 ${esc(q.materia)}</span>` : ''}${q.assunto ? `<span>📄 ${esc(q.assunto)}</span>` : ''}</div>`;
}
export function cabecalhoQuestao(q) { return tagsQuestao(q); }

// Monta a área de resposta dentro de `box`. onDone(acertou) é chamado depois de registrar.
export function montarQuestao(box, q, { topicoId, onDone } = {}) {
  const ce = q.modalidade !== 'multipla_escolha' && ['C', 'E'].includes(normResp(q.gabarito));
  const alts = Array.isArray(q.alternativas) ? q.alternativas : [];
  const inicio = Date.now();
  box.innerHTML = `${cabecalhoQuestao(q)}${enunciadoHTML(q.enunciado)}
    <div class="resp">${ce ? '<button class="btn sec" data-r="C">C · Certo</button><button class="btn sec" data-r="E">E · Errado</button>'
      : alts.map((a, i) => `<button class="btn sec alt" data-r="${'ABCDE'[i]}"><b>${'ABCDE'[i]})</b> ${sanitize(a)}</button>`).join('')}</div>
    <div class="out"></div>
    <div class="row" style="margin-top:10px"><button class="linkbtn rep">Reportar erro na questão</button></div>`;
  box.querySelectorAll('.alt').forEach((b) => b.addEventListener('contextmenu', (e) => { e.preventDefault(); b.classList.toggle('riscada'); }));
  box.querySelectorAll('[data-r]').forEach((b) => (b.onclick = async () => {
    box.querySelectorAll('[data-r]').forEach((x) => (x.disabled = true));
    b.classList.add('escolhida');
    try {
      const acertou = await registrarResposta(q, b.dataset.r, topicoId);
      let est = '';
      try { const [r] = await db.rpc('estatistica_questao', { q: q.id }); if (r && r.total) est = `<div class="mono" style="margin-top:6px">${Math.round((r.acertos / r.total) * 100)}% de acerto entre os alunos (${r.total} respostas)</div>`; } catch {}
      const seg = Math.round((Date.now() - inicio) / 1000);
      box.querySelector('.out').innerHTML = `<div class="resultado ${acertou ? 'ok' : 'bad'}"><b>${acertou ? '✔ Você acertou!' : '✘ Você errou.'}</b> Gabarito: <b>${esc(normResp(q.gabarito))}</b> · ${seg}s
        <div style="margin-top:8px"><div class="mono up">Comentário do professor</div>${sanitize(q.comentario || 'Sem comentário.')}</div>${est}</div>`;
      onDone && onDone(acertou);
    } catch (e) { toast(e.message, 'erro'); box.querySelectorAll('[data-r]').forEach((x) => (x.disabled = false)); }
  }));
  box.querySelector('.rep').onclick = () => modal(`<h3>Reportar erro</h3><textarea id="rt" placeholder="O que está errado?"></textarea><button class="btn" id="re" style="margin-top:10px">Enviar</button>`, {
    onMount: (m, close) => (m.querySelector('#re').onclick = async () => { try { await db.insert('reportes', [{ user_id: S.user.id, questao_id: q.id, texto: m.querySelector('#rt').value }]); toast('Obrigado! Vamos revisar.'); close(); } catch (e) { toast(e.message, 'erro'); } }),
  });
}

// Resolve uma lista em sequência dentro de um modal, com resumo no fim.
export function resolverSequencia(lista, { titulo = 'Questões', topicoId, onFim } = {}) {
  let i = 0, ac = 0, resp = 0; const t0 = Date.now();
  modal(`<div class="mono up" id="qpos"></div><h3>${esc(titulo)}</h3><div id="qbox"></div><div class="row" style="margin-top:14px"><span class="sp"></span><button class="btn" id="qprox" disabled>Próxima →</button></div>`, {
    largo: true,
    onMount: (m, close) => {
      const mostra = () => {
        if (i >= lista.length) {
          const min = Math.round((Date.now() - t0) / 60000);
          m.querySelector('#qpos').textContent = 'Resumo';
          m.querySelector('#qbox').innerHTML = `<div class="hero"><div class="num">${ac}/${resp}</div><div>${resp ? Math.round((ac / resp) * 100) : 0}% de acerto · ${min} min</div></div>`;
          const b = m.querySelector('#qprox'); b.textContent = 'Fechar'; b.disabled = false; b.onclick = () => { close(); onFim && onFim(); };
          return;
        }
        m.querySelector('#qpos').textContent = `Questão ${i + 1} de ${lista.length}`;
        const b = m.querySelector('#qprox'); b.disabled = true; b.textContent = i === lista.length - 1 ? 'Ver resumo' : 'Próxima →';
        montarQuestao(m.querySelector('#qbox'), lista[i], { topicoId, onDone: (ok) => { resp++; if (ok) ac++; b.disabled = false; } });
        b.onclick = () => { i++; mostra(); };
      };
      mostra();
    },
  });
}
