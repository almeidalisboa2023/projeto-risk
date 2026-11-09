-- PROJETO R.I.S.K. — Atualização 08: CURSOS
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.
--
-- O que muda:
--  • No cadastro, o aluno escolhe o curso (PRF, CFS PMMG, PCMG, Belo Vale...) e informa os dados dele.
--  • O administrador confere, corrige os dados, define o curso e a banca e aprova.
--  • O aluno só vê as matérias do curso dele; o administrador pode remover/restaurar matérias por aluno.

alter table public.profiles add column if not exists curso_solicitado text;   -- curso que o aluno marcou no cadastro
alter table public.profiles add column if not exists curso text;              -- curso definido pelo administrador
alter table public.profiles add column if not exists banca text;              -- banca definida pelo administrador (vazio = não definida)
alter table public.profiles add column if not exists materias_removidas text[] default '{}';
alter table public.profiles add column if not exists telefone text;
alter table public.profiles add column if not exists cidade text;
alter table public.profiles add column if not exists dados_ok_em timestamptz;  -- quando o aluno enviou os dados do cadastro

-- Só o administrador muda curso, banca e matérias removidas (o aluno escolhe apenas o curso_solicitado).
create or replace function public.protege_curso() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if public.is_admin() or auth.uid() is null then return new; end if;
  new.curso := old.curso;
  new.banca := old.banca;
  new.materias_removidas := old.materias_removidas;
  -- depois de aprovado, o aluno não troca mais o curso pedido sozinho
  if old.status = 'aprovado' then new.curso_solicitado := old.curso_solicitado; end if;
  return new;
end $$;
drop trigger if exists protege_curso on public.profiles;
create trigger protege_curso before update on public.profiles for each row execute function public.protege_curso();

-- Quem já estava aprovado e não tem curso continua vendo todas as matérias (nada muda para essas contas).
