-- PROJETO R.I.S.K. — Atualização 13: INCLUIR E EXCLUIR MATÉRIAS DOS CURSOS
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.
--
-- O que muda:
--  • No Administrador, nova seção "Matérias dos cursos": incluir qualquer matéria do app em um curso
--    ou excluir uma matéria do curso. Vale para todos os alunos do curso.

create table if not exists public.cursos_ajustes (
  curso text primary key,             -- id do curso (ex.: 'prf', 'belovale-procurador')
  incluidas text[] not null default '{}',
  excluidas text[] not null default '{}',
  atualizado_em timestamptz default now()
);
alter table public.cursos_ajustes enable row level security;

drop policy if exists "cursos ajustes le" on public.cursos_ajustes;
create policy "cursos ajustes le" on public.cursos_ajustes for select
  using (public.is_admin() or public.meu_status() = 'aprovado');
drop policy if exists "cursos ajustes admin" on public.cursos_ajustes;
create policy "cursos ajustes admin" on public.cursos_ajustes for all
  using (public.is_admin()) with check (public.is_admin());
