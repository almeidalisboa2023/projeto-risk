-- PROJETO R.I.S.K. — Atualização 10: APOSTILAS POR CURSO
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.
--
-- O que muda:
--  • Nova página "Apostilas": o administrador envia apostilas em PDF e escolhe para quais cursos elas aparecem.
--  • O aluno aprovado vê só as apostilas do curso dele, abertas dentro do app (sem botão de baixar).
--  • Os PDFs ficam num espaço privado: não existe link público para eles.

create table if not exists public.apostilas (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  materia text,                    -- matéria da apostila (opcional, só para organizar)
  cursos text[] not null default '{}',
  arquivo text not null,           -- caminho do PDF no Storage (bucket "apostilas")
  paginas int,
  tamanho bigint,
  ordem int default 0,
  ativo boolean default true,
  created_at timestamptz default now()
);
alter table public.apostilas enable row level security;

-- O curso do aluno logado (security definer para não depender da política de profiles)
create or replace function public.meu_curso() returns text
language sql stable security definer set search_path = public as $$
  select curso from public.profiles where id = auth.uid();
$$;

drop policy if exists "apostilas le" on public.apostilas;
create policy "apostilas le" on public.apostilas for select
  using (public.is_admin() or (ativo and public.meu_status() = 'aprovado' and public.meu_curso() = any(cursos)));
drop policy if exists "apostilas admin" on public.apostilas;
create policy "apostilas admin" on public.apostilas for all
  using (public.is_admin()) with check (public.is_admin());

-- Espaço privado dos PDFs
insert into storage.buckets (id, name, public) values ('apostilas', 'apostilas', false)
  on conflict (id) do update set public = false;

drop policy if exists "apostilas pdf upload admin" on storage.objects;
create policy "apostilas pdf upload admin" on storage.objects for insert
  with check (bucket_id = 'apostilas' and public.is_admin());
drop policy if exists "apostilas pdf update admin" on storage.objects;
create policy "apostilas pdf update admin" on storage.objects for update
  using (bucket_id = 'apostilas' and public.is_admin());
drop policy if exists "apostilas pdf delete admin" on storage.objects;
create policy "apostilas pdf delete admin" on storage.objects for delete
  using (bucket_id = 'apostilas' and public.is_admin());
-- Leitura: o administrador, ou o aluno aprovado cujo curso está na apostila
drop policy if exists "apostilas pdf le" on storage.objects;
create policy "apostilas pdf le" on storage.objects for select
  using (bucket_id = 'apostilas' and (public.is_admin() or exists (
    select 1 from public.apostilas a
    where a.arquivo = storage.objects.name and a.ativo
      and public.meu_status() = 'aprovado' and public.meu_curso() = any(a.cursos))));
