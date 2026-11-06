-- PROJETO R.I.S.K. — Atualização 09: CONTEÚDO EM PDF
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.
--
-- O que muda:
--  • Nova aba no administrador para enviar PDF de conteúdo.
--  • O administrador escolhe (ou confirma) a matéria e o tópico; ao confirmar, o texto vai para a leitura da matéria:
--    cria um tópico novo ou complementa um tópico que já existe.

create table if not exists public.conteudos (
  id uuid primary key default gen_random_uuid(),
  materia_id text not null,          -- id da matéria (ex.: 'civil', 'doutrina-pmmg') ou de uma matéria nova
  materia_nome text,                 -- nome da matéria (usado quando é matéria nova)
  assunto_id text,                   -- tópico que vai ser complementado (vazio = tópico novo)
  titulo text not null,              -- título do tópico novo ou do complemento
  html text not null,                -- texto já formatado para a leitura
  cursos text[] default '{}',        -- matéria nova: cursos que recebem a matéria
  arquivo text,                      -- caminho do PDF original guardado no Storage
  ativo boolean default true,
  created_at timestamptz default now(),
  created_by uuid default auth.uid()
);
alter table public.conteudos enable row level security;

-- Alunos aprovados e o administrador leem; só o administrador cria, altera e apaga.
drop policy if exists "conteudos le" on public.conteudos;
create policy "conteudos le" on public.conteudos for select
  using (public.is_admin() or public.meu_status() = 'aprovado');
drop policy if exists "conteudos admin" on public.conteudos;
create policy "conteudos admin" on public.conteudos for all
  using (public.is_admin()) with check (public.is_admin());

-- PDFs originais (guardados só para o administrador, não ficam públicos)
insert into storage.buckets (id, name, public) values ('conteudos', 'conteudos', false)
  on conflict (id) do nothing;
drop policy if exists "conteudos pdf upload admin" on storage.objects;
create policy "conteudos pdf upload admin" on storage.objects for insert
  with check (bucket_id = 'conteudos' and public.is_admin());
drop policy if exists "conteudos pdf le admin" on storage.objects;
create policy "conteudos pdf le admin" on storage.objects for select
  using (bucket_id = 'conteudos' and public.is_admin());
drop policy if exists "conteudos pdf update admin" on storage.objects;
create policy "conteudos pdf update admin" on storage.objects for update
  using (bucket_id = 'conteudos' and public.is_admin());
drop policy if exists "conteudos pdf delete admin" on storage.objects;
create policy "conteudos pdf delete admin" on storage.objects for delete
  using (bucket_id = 'conteudos' and public.is_admin());
