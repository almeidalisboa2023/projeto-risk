// Redação interativa: o aluno escreve no próprio leitor e recebe na hora uma análise automática do texto
// (extensão, estrutura, conectivos, repertório, linguagem formal, repetições e erros comuns).
// A análise é feita no navegador, por critérios objetivos das bancas; não substitui a correção de um professor.
import { esc } from './util.js';

const sa = (t) => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const PALAVRAS = (t) => (String(t).match(/[A-Za-zÀ-ÿ0-9]+(?:[-'][A-Za-zÀ-ÿ0-9]+)*/g) || []);
const FRASES = (t) => String(t).replace(/\s+/g, ' ').split(/(?<=[.!?])\s+(?=[A-ZÀ-Ý"“(])/).map((x) => x.trim()).filter((x) => PALAVRAS(x).length > 1);

// Conectivos por função (sem acento, minúsculos)
const CONECTIVOS = {
  adição: ['alem disso', 'ademais', 'outrossim', 'tambem', 'nao so', 'mas tambem', 'bem como', 'somado a isso', 'acrescenta-se', 'soma-se a isso'],
  oposição: ['entretanto', 'contudo', 'todavia', 'no entanto', 'porem', 'embora', 'apesar de', 'nao obstante', 'ainda que', 'mesmo que', 'em contrapartida'],
  causa: ['porque', 'visto que', 'ja que', 'uma vez que', 'pois', 'devido a', 'em razao de', 'em virtude de', 'tendo em vista'],
  exemplo: ['por exemplo', 'a exemplo de', 'como exemplo', 'isto e', 'ou seja', 'a saber', 'como ocorre', 'como se observa'],
  conclusão: ['portanto', 'logo', 'assim', 'dessa forma', 'desse modo', 'dessa maneira', 'por conseguinte', 'consequentemente', 'em suma', 'diante disso', 'diante do exposto', 'com isso', 'sendo assim'],
  finalidade: ['a fim de', 'para que', 'com o objetivo de', 'com o intuito de', 'visando', 'de modo a', 'com a finalidade de'],
};
const INFORMAL = ['tipo assim', ' ne ', ' ne,', ' ne?', ' vc ', ' pq ', ' ta ', ' pra ', ' pro ', ' a gente', ' coisa ', ' coisas ', ' dai ', ' ai ', ' mo ', ' muito top', ' galera', ' bagulho', ' ate porque', ' enfim '];
const PRIMEIRA = [' eu ', 'eu acho', 'na minha opiniao', 'acredito que', 'penso que', 'a meu ver', ' meu ', ' minha ', ' nosso ', ' nossa '];
const CLICHES = ['hoje em dia', 'nos dias de hoje', 'nos dias atuais', 'desde os primordios', 'desde sempre', 'e de suma importancia', 'vale ressaltar', 'em pleno seculo xxi', 'cada vez mais', 'nos tempos modernos', 'atualmente, ', 'e notorio que', 'e inegavel que', 'como todos sabem', 'sem sombra de duvidas'];
const ERROS = [
  [/\bhouveram\b/i, '"Houveram" está errado no sentido de existir: use "houve" (haver impessoal).'],
  [/\bfazem\s+\d+\s+anos\b/i, '"Fazem X anos" está errado: use "faz X anos" (fazer impessoal, indicando tempo).'],
  [/\ba nivel de\b/, '"A nível de" é condenado pelas bancas: use "em nível de" ou "no âmbito de".'],
  [/\bmenas\b/, '"Menas" não existe: use "menos".'],
  [/\bconcerteza\b/, 'Escreva "com certeza" (separado) e, num texto formal, prefira "certamente".'],
  [/\bderrepente\b/, 'Escreva "de repente" (separado).'],
  [/\bafim de\b/, 'Para finalidade, escreva "a fim de" (separado).'],
  [/\bmesmo\s+(?:ele|ela|eles|elas)\b/, 'Evite "o mesmo / a mesma" como pronome; prefira "ele", "ela" ou repita o substantivo.'],
  [/\bonde\b/, 'Confira cada "onde": ele só deve indicar lugar. Para tempo ou situação, use "em que" ou "no qual".', 'aviso'],
  [/\bseje\b|\besteje\b/, '"Seje"/"esteje" estão errados: use "seja"/"esteja".'],
  [/\bpor que\b(?![^.?]*\?)/, 'Confira "por que": separado e sem acento é usado em perguntas ou quando equivale a "pelo qual". Explicação usa "porque".', 'aviso'],
];
// Indícios de repertório (fundamentação)
const REPERTORIO = [
  [/["“][^"”]{12,}["”]/, 'citação entre aspas'], [/\bsegundo\b|\bde acordo com\b|\bconforme\b|\bconsoante\b|\bna visao de\b|\bpara o (filosofo|sociologo|pensador|autor)\b/, 'autoria (segundo, conforme...)'],
  [/\bconstituicao\b|\bart\.?\s*\d|\bartigo\s+\d|\blei\s+(n[oº]?\s*)?\d|\bcodigo\b|\beca\b|\bctb\b/, 'lei ou Constituição'], [/\d+([.,]\d+)?\s*%|\bpesquisa\b|\bdados\b|\bibge\b|\bipea\b|\boms\b|\bonu\b|\banuario\b|\bindice\b|\bestatistic/, 'dado ou pesquisa'],
  [/\bfilosof|\bsociolog|\bhistoria\b|\bhistoricamente\b|\bseculo\b/, 'repertório histórico ou filosófico'],
];
const AGENTES = /\b(estado|governo|poder publico|uniao|ministerio|congresso|prefeitura|municipios|escolas?|midia|imprensa|sociedade civil|familia|ongs?|policia|prf|orgaos? de transito|detran|secretaria|judiciario|legislativo|empresas)\b/;
const ACOES = /\b(criar|criacao|promover|ampliar|ampliacao|investir|investimento|fiscalizar|fiscalizacao|implementar|implantar|realizar|desenvolver|fortalecer|garantir|oferecer|intensificar|aplicar|capacitar|integrar)\b/;
const MEIOS = /\b(por meio de|mediante|por intermedio de|atraves de|com o uso de|com base em|por meio da|por meio do)\b/;

const STOP = new Set(sa('a o e é de da do das dos em no na nos nas um uma uns umas que se por para com como mais mas ou ao aos à às seu sua seus suas ser são foi pelo pela pelos pelas isso esse essa este esta esses essas estes estas ele ela eles elas também já não sim muito muitos muita muitas quando onde entre sobre sem até mesmo cada todo toda todos todas outro outra outros outras ainda pois assim porque está estão há ter tem têm sendo sido forma modo').split(' '));

// Configuração por tipo de exercício: faixa de palavras e o que precisa aparecer
const TIPOS = {
  tese: { nome: 'uma tese', min: 15, max: 50, frases: [1, 2] },
  introducao: { nome: 'uma introdução', min: 50, max: 120, frases: [2, 4] },
  desenvolvimento: { nome: 'um parágrafo de desenvolvimento', min: 80, max: 180, frases: [3, 7] },
  citacao: { nome: 'um parágrafo com citação', min: 60, max: 160, frases: [3, 6] },
  conclusao: { nome: 'uma conclusão', min: 40, max: 130, frases: [2, 4] },
  completa: { nome: 'uma redação completa', min: 220, max: 450, frases: [10, 26] },
};

export function analisar(texto, tipo = 'desenvolvimento', chaves = []) {
  const cfg = TIPOS[tipo] || TIPOS.desenvolvimento;
  const bruto = String(texto || '').trim(), n = sa(' ' + bruto.replace(/\s+/g, ' ') + ' ');
  const pal = PALAVRAS(bruto), fr = FRASES(bruto), itens = [];
  const b2 = ' ' + bruto.replace(/\s+/g, ' ') + ' ', orig = (c) => { const i = n.indexOf(c); return i >= 0 ? b2.substr(i, c.length).trim() : c.trim(); };
  const add = (nivel, titulo, detalhe, peso = 1) => itens.push({ nivel, titulo, detalhe, peso });
  if (pal.length < 8) return { nota: 0, itens: [{ nivel: 'erro', titulo: 'Escreva o seu texto', detalhe: 'Digite pelo menos algumas frases para receber a análise.' }], palavras: pal.length, frases: fr.length };

  // 1) Extensão
  const np = pal.length;
  if (np < cfg.min) add('erro', 'Texto curto', `Você escreveu ${np} palavras. Para ${cfg.nome}, mire entre ${cfg.min} e ${cfg.max} palavras: desenvolva mais a ideia.`, 2);
  else if (np > cfg.max) add('aviso', 'Texto longo', `Você escreveu ${np} palavras. Para ${cfg.nome}, o ideal é até ${cfg.max}: corte repetições e vá direto ao ponto.`, 1);
  else add('ok', 'Extensão adequada', `${np} palavras: dentro do esperado para ${cfg.nome}.`, 2);

  // 2) Frases: quantidade e tamanho
  const longas = fr.filter((f) => PALAVRAS(f).length > 45);
  if (fr.length < cfg.frases[0]) add('aviso', 'Poucos períodos', `Há ${fr.length} período(s). Esse tipo de texto costuma ter de ${cfg.frases[0]} a ${cfg.frases[1]}: separe as ideias em frases completas.`, 1);
  if (longas.length) add('aviso', 'Períodos muito longos', `${longas.length} frase(s) com mais de 45 palavras. Frases longas aumentam o risco de erro de pontuação e de concordância: divida com ponto final. Começa assim: "${esc(longas[0].slice(0, 70))}…"`, 1);
  else if (fr.length >= cfg.frases[0]) add('ok', 'Períodos bem dimensionados', 'Nenhuma frase passa de 45 palavras.', 1);
  if (!/[.!?]["”)]?$/.test(bruto)) add('erro', 'Falta ponto final', 'Termine o parágrafo com ponto final.', 1);

  // 3) Conectivos
  const usados = Object.entries(CONECTIVOS).map(([tipoC, lista]) => [tipoC, lista.filter((c) => n.includes(' ' + c + ' ') || n.includes(' ' + c + ',') || n.includes(' ' + c + '.'))]).filter(([, l]) => l.length);
  const variedade = usados.length;
  if (tipo !== 'tese') {
    if (variedade >= 2) add('ok', 'Coesão: bons conectivos', `Você usou conectivos de ${variedade} tipos (${usados.map(([t, l]) => `${t}: "${orig(l[0])}"`).join('; ')}).`, 2);
    else if (variedade === 1) add('aviso', 'Coesão: varie os conectivos', `Só apareceram conectivos de ${usados[0][0]}. Use também ${['adição', 'oposição', 'causa', 'exemplo', 'conclusão'].filter((x) => x !== usados[0][0]).slice(0, 2).join(' e ')} (ex.: "Além disso", "No entanto", "Dessa forma").`, 2);
    else add('erro', 'Coesão: faltam conectivos', 'Ligue as frases com conectivos: "Além disso", "No entanto", "Isso ocorre porque", "Por exemplo", "Dessa forma".', 2);
  }

  // 4) Linguagem: informalidade, primeira pessoa, clichês
  const inf = INFORMAL.filter((x) => n.includes(x)).map((x) => orig(x));
  if (inf.length) add('erro', 'Linguagem informal', `Evite marcas de oralidade: ${inf.map((x) => `"${x}"`).join(', ')}. Use a norma-padrão.`, 2);
  const pri = PRIMEIRA.filter((x) => n.includes(x)).map((x) => orig(x));
  if (pri.length) add('aviso', 'Impessoalidade', `Evite a 1ª pessoa (${pri.map((x) => `"${x}"`).join(', ')}). Em vez de "eu acho que", afirme: "É necessário que...", "Observa-se que...".`, 1);
  else add('ok', 'Texto impessoal', 'Não apareceu 1ª pessoa.', 1);
  const cli = CLICHES.filter((x) => n.includes(x)).map((x) => orig(x).replace(/[, ]+$/, ''));
  if (cli.length) add('aviso', 'Clichês', `Troque expressões gastas: ${cli.map((x) => `"${x}"`).join(', ')}. Prefira um dado, uma lei ou um fato concreto.`, 1);

  // 5) Repetição de palavras
  const cont = new Map(); pal.forEach((p) => { const k = sa(p).replace(/s$/, ''); if (k.length >= 5 && !STOP.has(k)) cont.set(k, (cont.get(k) || 0) + 1); });
  const rep = [...cont].filter(([k, v]) => v >= (np > 150 ? 4 : 3) && !chaves.some((c) => sa(c) === k)).sort((a, b) => b[1] - a[1]).slice(0, 3);
  if (rep.length) add('aviso', 'Repetição de palavras', `Repetiu ${rep.map(([k, v]) => `"${k}" (${v}x)`).join(', ')}. Use sinônimos, pronomes ou expressões de retomada ("esse cenário", "tal problema").`, 1);

  // 6) Erros comuns
  ERROS.forEach(([re, msg, nivel]) => { if (re.test(n) || re.test(bruto)) add(nivel || 'erro', nivel === 'aviso' ? 'Confira' : 'Erro gramatical comum', msg, nivel === 'aviso' ? 0.5 : 1.5); });
  if (/\s,|,(?=\S)(?!\d)/.test(bruto)) add('aviso', 'Espaço e vírgula', 'Não deixe espaço antes da vírgula e coloque espaço depois dela.', 0.5);
  if (/^[a-zà-ÿ]/.test(bruto)) add('erro', 'Letra maiúscula', 'Comece o texto com letra maiúscula.', 0.5);

  // 7) Tema (palavras-chave da proposta)
  if (chaves.length) {
    const achou = chaves.filter((c) => n.includes(sa(c)));
    if (achou.length) add('ok', 'Aderência ao tema', `O texto retoma a proposta (${achou.slice(0, 3).map((x) => `"${x}"`).join(', ')}).`, 2);
    else add('erro', 'Risco de fuga ao tema', `Não apareceram as palavras-chave da proposta (${chaves.slice(0, 4).map((x) => `"${x}"`).join(', ')}). Mencione o tema de forma explícita.`, 3);
  }

  // 8) Critérios de cada parte da redação
  const rep1 = REPERTORIO.filter(([re]) => re.test(n)).map(([, nome]) => nome);
  const primeira = fr[0] || '', ultima = fr[fr.length - 1] || '';
  const concl = (f) => CONECTIVOS.conclusão.some((c) => sa(' ' + f).includes(' ' + c));
  if (tipo === 'tese') {
    if (fr.length > 2) add('aviso', 'Tese em uma frase', 'A tese deve caber em um período: o seu ponto de vista sobre o tema.', 1);
    if (/\b(deve|devem|precisa|precisam|e necessario|e fundamental|e preciso|depende|decorre|resulta|causa|provoca|compromete|prejudica|garante|contribui)\b/.test(n)) add('ok', 'Posicionamento claro', 'A frase assume uma posição (há um verbo de avaliação ou de causa).', 2);
    else add('aviso', 'Posicione-se', 'A tese precisa de uma opinião defensável: "X compromete Y porque...", "É necessário... para...".', 2);
    if (/\b(porque|devido|em razao|em virtude|pois|uma vez que|tanto|quanto|seja|bem como)\b/.test(n)) add('ok', 'Argumentos anunciados', 'Você antecipou os motivos (causas ou eixos) que vai desenvolver.', 1);
    else add('aviso', 'Anuncie os argumentos', 'Acrescente o "porquê": "...devido à falta de fiscalização e à cultura de impunidade".', 1);
  }
  if (tipo === 'introducao') {
    if (rep1.length) add('ok', 'Contextualização com repertório', `Abertura com ${rep1[0]}: ótimo jeito de começar.`, 1);
    else add('aviso', 'Contextualize', 'Abra com um dado, uma lei, um fato histórico ou uma citação ligada ao tema antes de apresentar a tese.', 1);
    if (/\b(deve|devem|precisa|e necessario|e fundamental|compromete|prejudica|decorre|resulta|e preciso|configura|representa)\b/.test(sa(ultima))) add('ok', 'Tese no fim da introdução', 'O último período apresenta o seu ponto de vista.', 2);
    else add('aviso', 'Deixe a tese explícita', 'Feche a introdução com a tese: "Esse cenário decorre de X e de Y, o que exige...".', 2);
  }
  if (tipo === 'desenvolvimento' || tipo === 'citacao') {
    const tp = PALAVRAS(primeira).length;
    if (tp >= 10 && tp <= 40) add('ok', 'Tópico frasal', 'A primeira frase apresenta a ideia do parágrafo em tamanho adequado.', 2);
    else add('aviso', 'Tópico frasal', 'Comece com uma frase que diga, sozinha, qual é o argumento do parágrafo (entre 10 e 40 palavras).', 2);
    if (rep1.length) add('ok', 'Fundamentação (repertório)', `Encontrei ${rep1.join(', ')}.`, 3);
    else add('erro', 'Falta fundamentação', 'Sustente o argumento com repertório: uma lei ("Segundo o art. 144 da Constituição..."), um dado, um fato ou um autor.', 3);
    if (CONECTIVOS.exemplo.some((c) => n.includes(' ' + c)) || /\b(como|a exemplo)\b/.test(n)) add('ok', 'Exemplificação', 'Há exemplo ou explicação concreta.', 1);
    if (concl(ultima) && fr.length > 1) add('ok', 'Fechamento do parágrafo', 'A última frase conclui e liga o argumento à tese.', 2);
    else add('aviso', 'Feche o parágrafo', 'Termine com uma frase conclusiva ligada à tese: "Dessa forma, ...", "Assim, ...".', 2);
    if (tipo === 'citacao') {
      if (/\bsegundo\b|\bde acordo com\b|\bconforme\b|\bpara o\b|\bna visao de\b|\bconsoante\b/.test(n)) add('ok', 'Autoria identificada', 'A fonte da citação aparece no texto.', 2);
      else add('erro', 'Identifique a fonte', 'Diga de onde vem a citação: "Segundo a Constituição...", "Conforme dados do IBGE...", "Para o sociólogo...".', 2);
      if (/\b(isso|esse|essa|tal)\b[^.]{0,40}\b(mostra|evidencia|demonstra|revela|comprova|reforca|indica)\b|\bo que (mostra|evidencia|demonstra|revela)\b/.test(n)) add('ok', 'Citação explicada', 'Você explicou como a citação se relaciona com o argumento.', 2);
      else add('aviso', 'Explique a citação', 'Depois de citar, diga o que ela prova: "Isso evidencia que...", "o que demonstra...". Citação solta não pontua.', 2);
    }
  }
  if (tipo === 'conclusao') {
    if (concl(primeira)) add('ok', 'Abertura conclusiva', 'A conclusão começa com conectivo conclusivo.', 1);
    else add('aviso', 'Sinalize a conclusão', 'Comece com "Portanto", "Diante do exposto", "Em suma" ou "Dessa forma".', 1);
    const prop = [['agente (quem faz)', AGENTES], ['ação (o que fazer)', ACOES], ['meio (como fazer)', MEIOS], ['finalidade (para quê)', new RegExp('\\b(' + CONECTIVOS.finalidade.map((x) => x.replace(/ /g, '\\s+')).join('|') + '|para)\\b')]];
    const tem = prop.filter(([, re]) => re.test(n)).map(([nome]) => nome), falta = prop.filter(([, re]) => !re.test(n)).map(([nome]) => nome);
    if (falta.length === 0) add('ok', 'Proposta de solução completa', 'Há agente, ação, meio e finalidade.', 3);
    else add(tem.length >= 2 ? 'aviso' : 'erro', 'Proposta de solução', `Encontrei: ${tem.join(', ') || 'nenhum elemento'}. Falta: ${falta.join(', ')}. Modelo: "O Ministério X deve ampliar Y, por meio de Z, a fim de W".`, 3);
  }
  if (tipo === 'completa') {
    const pars = bruto.split(/\n\s*\n|\n/).map((x) => x.trim()).filter((x) => PALAVRAS(x).length > 8);
    if (pars.length >= 4 && pars.length <= 5) add('ok', 'Estrutura em parágrafos', `${pars.length} parágrafos: introdução, desenvolvimento e conclusão.`, 3);
    else add('erro', 'Estrutura em parágrafos', `Encontrei ${pars.length} parágrafo(s). Use 4 ou 5: introdução, 2 ou 3 de desenvolvimento e conclusão (separe com Enter).`, 3);
    if (rep1.length >= 2) add('ok', 'Repertório', `Vários tipos de repertório: ${rep1.join(', ')}.`, 2);
    else add('aviso', 'Repertório', 'Use pelo menos dois repertórios diferentes (lei, dado, fato, autor) nos parágrafos de desenvolvimento.', 2);
    if (pars.length && concl(pars[pars.length - 1].split(/[.!?]/)[0])) add('ok', 'Conclusão sinalizada', 'O último parágrafo começa com conectivo conclusivo.', 1);
  }

  // nota: média ponderada (ok = 1, aviso = 0,5, erro = 0)
  const val = { ok: 1, aviso: 0.5, erro: 0 }, tot = itens.reduce((s, i) => s + i.peso, 0);
  const nota = Math.round((itens.reduce((s, i) => s + val[i.nivel] * i.peso, 0) / Math.max(1, tot)) * 100);
  const ordem = { erro: 0, aviso: 1, ok: 2 };
  return { nota, itens: itens.sort((a, b) => ordem[a.nivel] - ordem[b.nivel]), palavras: np, frases: fr.length };
}

const FAIXA = (n) => (n >= 85 ? ['Excelente', 'otimo'] : n >= 70 ? ['Bom, com ajustes', 'bom'] : n >= 50 ? ['Precisa melhorar', 'medio'] : ['Reescreva', 'fraco']);
const ICO = { ok: '✓', aviso: '!', erro: '✕' };

// Monta os exercícios <div class="rd-ex" data-tipo="..." data-tema="..." data-chaves="a;b"> dentro do leitor
export function montarExercicios(raiz, uid = 'x') {
  raiz.querySelectorAll('.rd-ex').forEach((box, k) => {
    if (box.dataset.pronto) return; box.dataset.pronto = '1';
    const tipo = box.dataset.tipo || 'desenvolvimento', tema = box.dataset.tema || '', chaves = (box.dataset.chaves || '').split(';').map((x) => x.trim()).filter(Boolean);
    const chave = `risk-redacao-${uid}-${box.dataset.id || tipo + k}`;
    let salvo = ''; try { salvo = localStorage.getItem(chave) || ''; } catch {}
    const cfg = TIPOS[tipo] || TIPOS.desenvolvimento;
    box.innerHTML = `<div class="rd-cab"><span class="rd-sel">✍ Pratique agora</span><b>${esc(box.dataset.titulo || 'Escreva ' + cfg.nome)}</b>${tema ? `<p class="rd-tema"><span>Tema:</span> ${esc(tema)}</p>` : ''}${box.dataset.instrucao ? `<p class="rd-inst">${esc(box.dataset.instrucao)}</p>` : ''}</div>
      <textarea class="rd-txt" rows="${tipo === 'completa' ? 18 : tipo === 'tese' ? 3 : 8}" placeholder="Escreva aqui. Meta: ${cfg.min} a ${cfg.max} palavras.">${esc(salvo)}</textarea>
      <div class="rd-barra"><span class="rd-cont">0 palavras</span><span class="sp"></span><button class="btn sec mini rd-limpa" type="button">Limpar</button><button class="btn mini rd-ok" type="button">Analisar meu texto</button></div>
      <div class="rd-res" aria-live="polite"></div>`;
    const ta = box.querySelector('.rd-txt'), cont = box.querySelector('.rd-cont'), res = box.querySelector('.rd-res');
    const conta = () => { const n = PALAVRAS(ta.value).length; cont.textContent = `${n} palavra${n === 1 ? '' : 's'} · meta ${cfg.min} a ${cfg.max}`; cont.className = 'rd-cont ' + (n >= cfg.min && n <= cfg.max ? 'ok' : ''); };
    ta.oninput = () => { conta(); try { localStorage.setItem(chave, ta.value); } catch {} };
    conta();
    box.querySelector('.rd-limpa').onclick = () => { ta.value = ''; ta.oninput(); res.innerHTML = ''; };
    box.querySelector('.rd-ok').onclick = () => {
      const r = analisar(ta.value, tipo, chaves), [rot, cls] = FAIXA(r.nota);
      const erros = r.itens.filter((i) => i.nivel === 'erro').length, avisos = r.itens.filter((i) => i.nivel === 'aviso').length;
      res.innerHTML = `<div class="rd-nota ${cls}"><div class="rd-anel" style="--p:${r.nota}"><b>${r.nota}</b><small>de 100</small></div><div><b>${rot}</b><span>${r.palavras} palavras · ${r.frases} período(s) · ${erros} ponto(s) a corrigir · ${avisos} ajuste(s)</span></div></div>
        <ul class="rd-itens">${r.itens.map((i) => `<li class="${i.nivel}"><i>${ICO[i.nivel]}</i><div><b>${esc(i.titulo)}</b><span>${i.detalhe}</span></div></li>`).join('')}</ul>
        <p class="rd-obs">Análise automática pelos critérios mais cobrados pelas bancas. Ela aponta o que ajustar, mas não substitui a correção de um professor. Reescreva e analise de novo.</p>`;
      res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
  });
}
