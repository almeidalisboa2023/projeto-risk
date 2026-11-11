-- PROJETO R.I.S.K. — Atualização 14: HISTÓRICO DAS QUESTÕES ("acertou/errou anteriormente")
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.
--
-- O que muda:
--  • Cada questão respondida na leitura, nas apostilas e nos simulados fica registrada para o aluno.
--  • O app mostra "Acertou anteriormente" ou "Errou anteriormente" e permite filtrar (só novas, só as que errei…).

create table if not exists public.respostas_leitura (
  id text primary key,                 -- aluno + questão
  user_id uuid not null references auth.users(id) on delete cascade,
  chave text not null,                 -- matéria/tópico/questão
  acertou boolean not null,            -- resultado da última tentativa
  tentativas int not null default 1,
  acertos int not null default 0,
  atualizado_em timestamptz default now()
);
create index if not exists respostas_leitura_user_chave on public.respostas_leitura (user_id, chave);
alter table public.respostas_leitura enable row level security;

drop policy if exists "respostas leitura dono" on public.respostas_leitura;
create policy "respostas leitura dono" on public.respostas_leitura for all
  using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid());
