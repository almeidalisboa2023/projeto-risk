-- PROJETO R.I.S.K. — Atualização 15: EDIÇÃO DO CONTEÚDO PELO ADMINISTRADOR e CONTAGEM DE FLASHCARDS
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.
--
-- O que muda:
--  • O administrador pode editar o texto de qualquer tópico da leitura; a versão editada vale para todos os alunos.
--  • Cada flashcard virado fica registrado para o aluno, e a tela inicial mostra quantos ele já fez.

create table if not exists public.leitura_edicoes (
  id text primary key,                 -- matéria/tópico
  html text not null,
  editado_por uuid references auth.users(id) on delete set null,
  atualizado_em timestamptz default now()
);
alter table public.leitura_edicoes enable row level security;
drop policy if exists "edicoes le" on public.leitura_edicoes;
create policy "edicoes le" on public.leitura_edicoes for select using (auth.uid() is not null);
drop policy if exists "edicoes admin" on public.leitura_edicoes;
create policy "edicoes admin" on public.leitura_edicoes for all using (public.is_admin()) with check (public.is_admin());

create table if not exists public.flashcards_feitos (
  id text primary key,                 -- aluno + cartão
  user_id uuid not null references auth.users(id) on delete cascade,
  chave text not null,                 -- matéria/tópico/cartão
  vezes int not null default 1,
  atualizado_em timestamptz default now()
);
create index if not exists flashcards_feitos_user on public.flashcards_feitos (user_id);
alter table public.flashcards_feitos enable row level security;
drop policy if exists "flashcards dono" on public.flashcards_feitos;
create policy "flashcards dono" on public.flashcards_feitos for all
  using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid());
