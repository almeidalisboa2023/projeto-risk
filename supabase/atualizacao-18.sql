-- PROJETO R.I.S.K. — Atualização 18: SEGURANÇA E LGPD
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.
-- 1) Registro do aceite dos Termos de Uso e da Política de Privacidade
-- 2) "Excluir minha conta" pelo próprio aluno (apaga a conta e todos os dados de estudo dele)
-- 3) Aviso ao administrador: lista "Contas excluídas" (guardada por 6 meses, só nome, e-mail, curso e data)

alter table public.profiles add column if not exists termos_aceitos_em timestamptz;
alter table public.profiles add column if not exists termos_versao text;

create table if not exists public.contas_excluidas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  nome text,
  email text,
  curso text,
  motivo text,
  excluida_em timestamptz not null default now(),
  vista boolean not null default false
);
alter table public.contas_excluidas enable row level security;
drop policy if exists "excluidas admin" on public.contas_excluidas;
create policy "excluidas admin" on public.contas_excluidas for all using (public.is_admin()) with check (public.is_admin());

-- O aluno exclui a própria conta. Os dados de estudo somem junto (todas as tabelas apagam em cascata).
-- As compras da Hotmart ficam guardadas sem vínculo com a conta (obrigação fiscal e de consumo).
create or replace function public.excluir_minha_conta(motivo text default null)
returns void language plpgsql security definer set search_path = public, auth as $$
declare uid uuid := auth.uid(); p public.profiles%rowtype;
begin
  if uid is null then raise exception 'Você precisa estar conectado.'; end if;
  select * into p from public.profiles where id = uid;
  if p.role = 'admin' then raise exception 'A conta do administrador não pode ser excluída por aqui.'; end if;
  insert into public.contas_excluidas(user_id, nome, email, curso, motivo)
    values (uid, p.nome, coalesce(p.email, (select u.email from auth.users u where u.id = uid)), coalesce(p.curso, p.curso_solicitado), left(nullif(trim(motivo), ''), 500));
  delete from public.contas_excluidas where excluida_em < now() - interval '6 months';
  delete from auth.users where id = uid;
end $$;
revoke all on function public.excluir_minha_conta(text) from public, anon;
grant execute on function public.excluir_minha_conta(text) to authenticated;
