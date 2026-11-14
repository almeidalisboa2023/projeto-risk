-- PROJETO R.I.S.K. — Atualização 19: QUADRO DE SIMULADOS E AVISOS
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.

-- 1) Simulados: categoria (Completo, Mini…) e data de liberação
alter table public.apostilas add column if not exists categoria text;
alter table public.apostilas add column if not exists liberar_em date;

-- 2) Simulados resolvidos por aluno
create table if not exists public.apostilas_feitas (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  apostila_id uuid not null references public.apostilas(id) on delete cascade,
  feito_em timestamptz not null default now(),
  primary key (user_id, apostila_id)
);
alter table public.apostilas_feitas enable row level security;
drop policy if exists "feitas dono" on public.apostilas_feitas;
create policy "feitas dono" on public.apostilas_feitas for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid());

-- 3) Avisos da página inicial (o administrador publica; o site também cria sozinho ao enviar conteúdo)
create table if not exists public.avisos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  texto text,
  tipo text default 'aviso',          -- aviso, conteudo, questoes, simulado, apostila, material
  cursos text[] not null default '{}', -- vazio = todos os alunos
  link text,                           -- endereço dentro do site (ex.: #/simulados)
  publicar_em timestamptz not null default now(),
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.avisos enable row level security;
drop policy if exists "avisos le" on public.avisos;
create policy "avisos le" on public.avisos for select using (auth.uid() is not null and (ativo or public.is_admin()));
drop policy if exists "avisos admin" on public.avisos;
create policy "avisos admin" on public.avisos for all using (public.is_admin()) with check (public.is_admin());
