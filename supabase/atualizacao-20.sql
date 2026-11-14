-- PROJETO R.I.S.K. — Atualização 20: CRONOGRAMA AUTOMÁTICO DO CURSO
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.

-- Edital gerado pelo assistente "Montar meu cronograma": guarda o curso e as respostas do aluno
alter table public.editais add column if not exists curso text;
alter table public.editais add column if not exists plano jsonb;

-- Tempo previsto de cada bloco do calendário (em minutos)
alter table public.tarefas add column if not exists previsto int;
