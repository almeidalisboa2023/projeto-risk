-- PROJETO R.I.S.K. — Atualização 24: MARCAS DE "PRECISA DE ATUALIZAÇÃO" NO CONTEÚDO PROGRAMÁTICO
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.
--
-- O que muda:
--  • No Conteúdo programático, o administrador pode marcar um tópico como "precisa de atualização" (bolinha amarela).
--    Só o administrador vê essas marcas. Erros reportados pelos alunos e ainda não resolvidos também acendem a bolinha amarela.

create table if not exists public.conteudo_revisao (
  id uuid primary key default gen_random_uuid(),
  materia text not null,
  assunto text,                         -- vazio = a matéria inteira
  nota text,
  criado_em timestamptz default now()
);
alter table public.conteudo_revisao enable row level security;
drop policy if exists "conteudo revisao admin" on public.conteudo_revisao;
create policy "conteudo revisao admin" on public.conteudo_revisao for all
  using (public.is_admin()) with check (public.is_admin());
