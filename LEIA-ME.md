# PROJETO R.I.S.K. — versão própria (sem Base44)

Site estático (HTML/CSS/JavaScript, sem etapa de build) + Supabase (banco, login e regras de acesso) + Vercel (hospedagem).

## O que tem nesta etapa
- Login (criar conta, entrar, esqueci a senha) e modo claro/noturno
- Painel: relógio, frase do dia, dias para a prova, progresso, questões e acerto da semana, gráfico (meta 70%), desempenho por matéria
- Calendário "Hoje": semanas, faixa de 7 dias, blocos com horário, tipo, links (aula no YouTube, PDF, lei seca no Planalto, questões), checklist, concluir bloco/assunto, dúvidas, registrar questões feitas fora do app
- Edital verticalizado: progresso, análise de questões por período (com atalhos), "No app" × "Fora do app", tópicos finalizados, fora do edital
- Questões: banco completo com filtros e status, resolução C/E ou A–E, comentário, estatística, reportar erro, aba "Geradas para você"
- "Pedir questões ao Claude" (10 questões no padrão da banca, contabilizadas) — oferece antes as do banco
- Hidratação, Perfil (horários dos blocos, língua estrangeira, editais ativos, dúvidas)
- Administrador: banco de questões (totais, importar CSV, reportadas), importar dados do Base44, simulados semanais em PDF por aluno, alunos (bloquear / tornar admin)

## Passo a passo (uma vez só)

### 1) Supabase – banco de dados
1. Em supabase.com, abra o seu projeto (ou crie um: região São Paulo).
2. Menu **SQL Editor → New query**, cole TODO o conteúdo de `supabase/schema.sql` e clique em **Run**.
3. Menu **Project Settings → API**: copie a **Project URL** e a chave **anon public**.

### 2) Colocar as chaves no código
Abra `js/config.js` e troque `COLE_AQUI_A_PROJECT_URL` e `COLE_AQUI_A_ANON_PUBLIC_KEY` pelos valores copiados.
(A chave anon é pública; quem protege os dados são as regras de acesso do banco. NUNCA coloque a "service_role" no código.)

### 3) GitHub
1. Em github.com → **New repository** → nome `projeto-risk` → Create.
2. Clique em **uploading an existing file** e arraste TODO o conteúdo desta pasta (index.html, css, js, img, supabase, dados, LEIA-ME.md) → **Commit changes**.

### 4) Vercel – colocar no ar
1. vercel.com → **Add New… → Project** → importe o repositório `projeto-risk`.
2. Framework Preset: **Other**. Não precisa de Build Command. Clique em **Deploy**.
3. Copie o endereço que a Vercel criar (ex.: `projeto-risk.vercel.app`).

### 5) Supabase – endereço do site (para os e-mails de login)
**Authentication → URL Configuration → Site URL**: cole o endereço da Vercel e salve.

### 6) Virar administrador
1. Abra o site, clique em **Criar conta** e confirme o e-mail.
2. No Supabase, **SQL Editor**, rode:
   `update public.profiles set role = 'admin' where email = 'SEU-EMAIL-AQUI';`
3. Saia e entre de novo: aparece o menu **Administrador**.

### 7) Banco de questões
Administrador → **Importar planilha (CSV)** → importe, um de cada vez, os arquivos da pasta `dados/`:
`lote01-prf-2021-cebraspe.csv` (103), `lote02-prf-pf-cebraspe.csv` (254) e `lote03-ineditas-risk.csv` (2.668).

### 8) Seus dados do Base44 (edital, calendário, histórico de questões)
Exporte do Base44 as tabelas **Edital, EditalMateria, WeeklyTask, QuestionLog** (e WaterLog) em JSON ou CSV, mantendo o nome da tabela no nome do arquivo, e use **Administrador → Importar meus dados do Base44** selecionando todos de uma vez. Faça só uma vez.

### 9) Questões com IA (opcional, pago por uso)
1. Em console.anthropic.com, crie uma chave de API e coloque crédito (defina um limite de gasto).
2. No Supabase: **Edge Functions → Deploy a new function → Via Editor**, nome `gerar-questoes`, cole o conteúdo de `supabase/functions/gerar-questoes/index.ts` e faça o deploy.
3. **Edge Functions → Secrets**: crie `ANTHROPIC_API_KEY` com a sua chave. Opcional: `ANTHROPIC_MODEL` (modelo Claude a usar) e `LIMITE_DIARIO` (padrão 5 pedidos por aluno por dia).

## Atualizações do banco
Rode **uma vez** `supabase/atualizacao-04.sql` no SQL Editor (já inclui as atualizações 02 e 03; pode repetir sem problema).
Ao subir arquivos novos no GitHub, o `js/config.js` NÃO vem no pacote, para não apagar suas chaves.

## Resumos com IA
Edge Functions → Deploy a new function → Via Editor → nome `gerar-resumo` → cole `supabase/functions/gerar-resumo/index.ts` → Deploy.
Precisa do segredo `ANTHROPIC_API_KEY` (Edge Functions → Secrets). Opcional: `LIMITE_RESUMOS` (padrão 5 por aluno por dia).

## Testar sem Supabase
Abra o site com `?demo` no final do endereço (ex.: `projeto-risk.vercel.app/?demo`): usa dados de exemplo salvos só no navegador.

## Domínio próprio
Na Vercel: Project → Settings → Domains → adicione o domínio comprado e siga as instruções de DNS.
