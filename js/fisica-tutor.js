// Resolução passo a passo das questões de Física (no mesmo espírito da de RLM).
// A explicação da questão pode vir estruturada em etapas separadas por " >> ":
//   Dados: v₀ = 20 m/s; a = 4 m/s² >> Pede: Δs até parar >> Fórmula: v² = v₀² − 2·a·Δs >> Conta: 0 = 400 − 8·Δs → Δs = 50 m >> Resultado: 50 m
// Rótulos aceitos: Ideia, Dados, Converta, Pede, Fórmula, Conta, Resultado, Confere, Atenção. Sem rótulos, cada frase vira um passo.
// As etapas aparecem uma de cada vez ("Mostrar próximo passo"), para o aluno tentar antes de ver.
import { esc } from './util.js';

const METODO = {
  cinematica: ['Passe tudo para o SI: km/h ÷ 3,6 = m/s; minutos × 60 = segundos.', 'Descubra o tipo de movimento: velocidade constante (MRU) ou aceleração constante (MRUV)?', 'Escolha a equação que liga os dados à incógnita. Não tem o tempo? Use Torricelli.'],
  'movimento-circular': ['Separe as grandezas angulares (ω, f, T) das lineares (v, aceleração centrípeta).', 'Lembre as pontes: v = ω·R, ω = 2π·f = 2π/T.', 'Em curvas, pergunte: que força faz o papel de resultante centrípeta (atrito, normal, tração)?'],
  dinamica: ['Desenhe o corpo isolado e marque todas as forças (peso, normal, atrito, tração).', 'Escolha um eixo no sentido do movimento e calcule a força resultante.', 'Aplique F = m·a. Em repouso ou MRU, a resultante é zero.'],
  'trabalho-potencia': ['Trabalho só existe com força e deslocamento: τ = F·d·cos θ.', 'Força perpendicular ao deslocamento não realiza trabalho (θ = 90°).', 'Potência é rapidez: P = τ/Δt ou P = F·v. Rendimento = útil ÷ total.'],
  energia: ['Liste as energias no início e no fim: cinética (m·v²/2) e potencial (m·g·h ou k·x²/2).', 'Sem atrito, a energia mecânica se conserva: some antes = some depois.', 'Com atrito, a diferença virou calor: Em inicial − Em final = energia dissipada.'],
  'quantidade-movimento': ['Quantidade de movimento é Q = m·v e tem sentido: escolha um positivo.', 'Em colisões e explosões, Q total antes = Q total depois.', 'Impulso = F·Δt = ΔQ: para a mesma variação de Q, mais tempo significa menos força.'],
  'ondas-optica': ['Identifique o tipo de onda (mecânica ou eletromagnética) e o que muda ao trocar de meio.', 'Use v = λ·f: ao mudar de meio, a frequência não muda.', 'Em espelhos e lentes, defina o sinal de f e p e use 1/f = 1/p + 1/p′.'],
};

const FORMULAS = {
  cinematica: ['v_m = Δs/Δt', 'MRU: s = s₀ + v·t', 'MRUV: v = v₀ + a·t', 's = s₀ + v₀·t + a·t²/2', 'Torricelli: v² = v₀² + 2·a·Δs', 'Queda livre: h = g·t²/2; v = g·t', 'km/h ÷ 3,6 = m/s'],
  'movimento-circular': ['ω = Δφ/Δt', 'ω = 2π·f = 2π/T', 'v = ω·R', 'a_cp = v²/R = ω²·R', 'F_cp = m·v²/R', 'Curva plana: v_máx = √(μ·g·R)'],
  dinamica: ['F_R = m·a', 'P = m·g', 'Fat = μ·N', 'Plano inclinado: P·sen θ (ao longo) e P·cos θ (normal)', 'Elástica: F = k·x'],
  'trabalho-potencia': ['τ = F·d·cos θ', 'τ_peso = ± m·g·h', 'τ_R = ΔEc', 'P = τ/Δt = F·v', 'η = P_útil/P_total', '1 cv ≈ 735 W; 1 kWh = 3,6·10⁶ J'],
  energia: ['Ec = m·v²/2', 'Ep = m·g·h', 'Ep_el = k·x²/2', 'Em = Ec + Ep', 'Sem atrito: Em_i = Em_f', 'Com atrito: E_dissipada = Em_i − Em_f'],
  'quantidade-movimento': ['Q = m·v', 'I = F·Δt = ΔQ', 'Sistema isolado: Q_antes = Q_depois', 'Inelástica: m₁v₁ + m₂v₂ = (m₁ + m₂)·v', 'e = v_afast/v_aprox'],
  'ondas-optica': ['v = λ·f', 'T = 1/f', 'Espelhos e lentes: 1/f = 1/p + 1/p′', 'A = −p′/p', 'n = c/v', 'Snell: n₁·sen θ₁ = n₂·sen θ₂'],
};

const ROT = {
  ideia: ['💡', 'A ideia-chave'], dados: ['📋', 'Dados do problema'], converta: ['🔁', 'Converta as unidades'], pede: ['🎯', 'O que a questão pede'],
  'fórmula': ['📐', 'Escolha a fórmula'], formula: ['📐', 'Escolha a fórmula'], conta: ['🧮', 'Substitua e calcule'],
  resultado: ['✅', 'Resultado'], confere: ['🔍', 'Confira'], 'atenção': ['⚠', 'Cuidado'], atencao: ['⚠', 'Cuidado'],
};

function etapas(x) {
  const t = String(x || '').trim();
  if (!t) return [];
  const partes = t.includes(' >> ') ? t.split(' >> ') : t.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ“"(0-9])/);
  return partes.map((s) => s.trim()).filter(Boolean).map((s) => {
    const m = s.match(/^(Ideia|Dados|Converta|Pede|Fórmula|Formula|Conta|Resultado|Confere|Atenção|Atencao)\s*:\s*(.+)$/i);
    return m ? { k: m[1].toLowerCase(), v: m[2].trim() } : { k: '', v: s };
  });
}

// "v₀ = 20 m/s; a = 4 m/s²" → chips de grandeza
const chips = (v) => `<div class="fz-dados">${v.split(/\s*;\s*/).filter(Boolean).map((d) => { const m = d.match(/^([^=]{1,18}?)\s*=\s*(.+)$/); return m ? `<span><i>${esc(m[1])}</i> = ${esc(m[2])}</span>` : `<span>${esc(d)}</span>`; }).join('')}</div>`;
// "a → b → c" vira linhas de conta
const contas = (v) => `<div class="fz-conta">${v.split(/\s*(?:→|⇒)\s*/).map((l, i) => `<div>${i ? '<b>→</b> ' : ''}${esc(l)}</div>`).join('')}</div>`;

export function resolucaoFisica(q) {
  const tid = q.fis;
  const metodo = METODO[tid] || ['Leia a pergunta até o fim e anote o que ela pede.', 'Separe os dados e passe para o SI.', 'Escolha a lei física que liga os dados ao que se pede.'];
  const E = etapas(q.x || q.prof || q.e);
  const me = Array.isArray(q.alts) && q.alts.length, r = Number(q.r) || 0;
  const conclusao = me ? `Resposta: letra <b>${'ABCDE'[r]}</b> (${esc(String(q.alts[r]).slice(0, 160).replace(/[.;]\s*$/, ''))}).` : `Logo, o item está <b>${q.c ? 'CERTO' : 'ERRADO'}</b>.`;
  let n = 1;
  const secs = [`<div class="pp-sec"><span class="pp-n">${n++}</span><div><b>Como pensar nesta questão</b><ul>${metodo.map((m) => `<li>${esc(m)}</li>`).join('')}</ul></div></div>`];
  // etapas sem rótulo seguidas são agrupadas em "Raciocínio"
  let soltas = [];
  const fecha = () => { if (soltas.length) { secs.push(`<div class="pp-sec fz-passo"><span class="pp-n">${n++}</span><div><b>🧠 Raciocínio</b><ol class="pp-passos">${soltas.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></div></div>`); soltas = []; } };
  for (const { k, v } of E) {
    if (!k) { soltas.push(v); continue; }
    fecha();
    const [ico, tit] = ROT[k] || ['•', k];
    const corpo = k === 'dados' || k === 'converta' ? chips(v) : k === 'conta' ? contas(v) : k === 'fórmula' || k === 'formula' ? `<code class="fz-form">${esc(v)}</code>` : k === 'resultado' ? `<div class="fz-res">${esc(v)}</div>` : `<p>${esc(v)}</p>`;
    secs.push(`<div class="pp-sec fz-passo fz-k-${k.replace('ó', 'o').replace('ç', 'c').replace('ã', 'a')}"><span class="pp-n">${n++}</span><div><b>${ico} ${tit}</b>${corpo}</div></div>`);
  }
  fecha();
  const nPassos = secs.length - 1;
  const form = FORMULAS[tid];
  return `<div class="pp fz" data-fz>
    <div class="pp-cab">🧭 <b>Resolução passo a passo</b><small>tente cada etapa antes de abrir a próxima</small></div>
    ${secs.map((s, i) => (i > 1 ? s.replace('class="pp-sec', 'class="pp-sec fz-oculto') : s)).join('')}
    <div class="pp-sec pp-fim fz-oculto fz-final"><span class="pp-n">✓</span><div>${conclusao}</div></div>
    <div class="fz-ctl">${nPassos > 1 ? '<button class="btn sec mini" data-fz-prox>Mostrar próximo passo ▸</button><button class="linkbtn" data-fz-tudo>Ver resolução completa</button>' : '<button class="btn sec mini" data-fz-tudo>Ver conclusão ▸</button>'}</div>
    ${form ? `<details class="fz-formulario"><summary>📐 Formulário do assunto</summary><div>${form.map((f) => `<code>${esc(f)}</code>`).join('')}</div></details>` : ''}
  </div>`;
}

// Botões "próximo passo" / "ver tudo" (delegação: funciona em qualquer lugar onde a questão aparecer)
if (typeof document !== 'undefined' && document.addEventListener && !globalThis.__fzOn) {
  globalThis.__fzOn = 1;
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest?.('[data-fz-prox],[data-fz-tudo]'); if (!b) return;
    const box = b.closest('[data-fz]'); if (!box) return;
    const ocultos = [...box.querySelectorAll('.fz-oculto')];
    (b.hasAttribute('data-fz-tudo') ? ocultos : ocultos.slice(0, 1)).forEach((s) => s.classList.remove('fz-oculto'));
    if (!box.querySelector('.fz-oculto')) box.querySelector('.fz-ctl')?.remove();
  });
}
