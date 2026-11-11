-- PROJETO R.I.S.K. — Atualização 16: PRAZO DE ACESSO, CURSOS PREPARATÓRIOS À VENDA e COMPRAS DA HOTMART
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.
--
-- O que muda:
--  • Cada aluno tem uma data "acesso até". Só o administrador altera.
--  • Tabela de cursos preparatórios à venda (vitrine pública, aparece mesmo para quem não tem conta).
--  • Tabela de compras recebidas da Hotmart. Quando a compra é aprovada e a pessoa tem conta (e-mail confirmado)
--    com o MESMO e-mail da compra, o acesso é liberado sozinho, com o prazo do curso. Reembolso/chargeback bloqueia.

-- ---------- 1. Prazo de acesso no perfil ----------
alter table public.profiles add column if not exists acesso_ate date;
alter table public.profiles add column if not exists bloqueio_motivo text;
alter table public.profiles add column if not exists obs_admin text;

-- O aluno não pode mexer no próprio prazo, bloqueio ou anotações do administrador.
-- Funções internas do sistema (liberação pela compra) marcam "risk.sistema" para poder alterar.
create or replace function public.protege_acesso() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if public.is_admin() or auth.uid() is null or current_setting('risk.sistema', true) = '1' then return new; end if;
  new.acesso_ate := old.acesso_ate;
  new.bloqueado := old.bloqueado;
  new.bloqueio_motivo := old.bloqueio_motivo;
  new.obs_admin := old.obs_admin;
  return new;
end $$;
drop trigger if exists protege_acesso on public.profiles;
create trigger protege_acesso before update on public.profiles for each row execute function public.protege_acesso();

-- A proteção de curso (atualização 08) também precisa deixar o sistema liberar o curso comprado
create or replace function public.protege_curso() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if public.is_admin() or auth.uid() is null or current_setting('risk.sistema', true) = '1' then return new; end if;
  new.curso := old.curso;
  new.banca := old.banca;
  new.materias_removidas := old.materias_removidas;
  if old.status = 'aprovado' then new.curso_solicitado := old.curso_solicitado; end if;
  return new;
end $$;

-- ---------- 2. Cursos preparatórios à venda ----------
create table if not exists public.cursos_venda (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,                 -- ex.: "PRF 2027 — Policial Rodoviário Federal"
  orgao text,                           -- ex.: "Polícia Rodoviária Federal"
  cargo text,
  foto_url text,                        -- foto do órgão (capa)
  vagas text,
  salario text,
  banca text,
  escolaridade text,
  situacao text,                        -- ex.: "Edital previsto", "Inscrições abertas"
  data_prova text,
  materias text,                        -- uma matéria por linha
  descricao text,
  preco text,                           -- ex.: "R$ 197,00 ou 12x de R$ 19,70"
  link_compra text,                     -- link do checkout da Hotmart
  hotmart_produto text,                 -- ID do produto na Hotmart (para reconhecer a compra)
  curso text,                           -- curso do app que é liberado (ex.: prf)
  duracao_dias int default 365,         -- prazo de acesso liberado pela compra
  publicado boolean default false,
  ordem int default 0,
  created_at timestamptz default now(),
  atualizado_em timestamptz default now()
);
alter table public.cursos_venda enable row level security;
drop policy if exists "vitrine le" on public.cursos_venda;
create policy "vitrine le" on public.cursos_venda for select using (publicado or public.is_admin());
drop policy if exists "vitrine admin" on public.cursos_venda;
create policy "vitrine admin" on public.cursos_venda for all using (public.is_admin()) with check (public.is_admin());
grant select on public.cursos_venda to anon;

-- Fotos das capas (públicas, só o administrador envia)
insert into storage.buckets (id, name, public) values ('cursos', 'cursos', true) on conflict (id) do nothing;
drop policy if exists "cursos foto upload admin" on storage.objects;
create policy "cursos foto upload admin" on storage.objects for insert with check (bucket_id = 'cursos' and public.is_admin());
drop policy if exists "cursos foto update admin" on storage.objects;
create policy "cursos foto update admin" on storage.objects for update using (bucket_id = 'cursos' and public.is_admin());
drop policy if exists "cursos foto delete admin" on storage.objects;
create policy "cursos foto delete admin" on storage.objects for delete using (bucket_id = 'cursos' and public.is_admin());
drop policy if exists "cursos foto le" on storage.objects;
create policy "cursos foto le" on storage.objects for select using (bucket_id = 'cursos');

-- ---------- 3. Compras recebidas da Hotmart ----------
create table if not exists public.compras (
  id uuid primary key default gen_random_uuid(),
  transacao text unique not null,       -- código da transação na Hotmart (HP...)
  evento text,                          -- PURCHASE_APPROVED, PURCHASE_REFUNDED...
  status text not null default 'outro' check (status in ('aprovada','reembolsada','cancelada','chargeback','pendente','outro')),
  email text,
  nome text,
  telefone text,
  produto_id text,
  produto_nome text,
  valor numeric,
  curso_venda_id uuid references public.cursos_venda(id) on delete set null,
  curso text,
  duracao_dias int,
  user_id uuid references auth.users(id) on delete set null,
  aplicado_em timestamptz,              -- quando liberou o acesso
  bloqueado_em timestamptz,             -- quando bloqueou por reembolso/chargeback
  recebido_em timestamptz default now(),
  atualizado_em timestamptz default now()
);
create index if not exists compras_email on public.compras (lower(email));
alter table public.compras enable row level security;
drop policy if exists "compras admin" on public.compras;
create policy "compras admin" on public.compras for all using (public.is_admin()) with check (public.is_admin());

-- Descobre o curso e o prazo pelo ID do produto da Hotmart
create or replace function public.compra_preenche() returns trigger
language plpgsql security definer set search_path = public as $$
declare cv public.cursos_venda;
begin
  new.email := lower(trim(new.email));
  new.atualizado_em := now();
  if new.curso_venda_id is null and new.produto_id is not null then
    select * into cv from public.cursos_venda where hotmart_produto = new.produto_id order by publicado desc, created_at limit 1;
    if found then new.curso_venda_id := cv.id; new.curso := coalesce(new.curso, cv.curso); new.duracao_dias := coalesce(new.duracao_dias, cv.duracao_dias); end if;
  end if;
  return new;
end $$;
drop trigger if exists compra_preenche on public.compras;
create trigger compra_preenche before insert or update on public.compras for each row execute function public.compra_preenche();

-- Aplica UMA compra ao aluno com o mesmo e-mail (só se o e-mail da conta estiver confirmado)
create or replace function public.aplicar_compra(cid uuid) returns boolean
language plpgsql security definer set search_path = public as $$
declare c public.compras; uid uuid; dias int;
begin
  select * into c from public.compras where id = cid;
  if not found or c.email is null then return false; end if;
  select u.id into uid from auth.users u where lower(u.email) = c.email and u.email_confirmed_at is not null limit 1;
  if uid is null then return false; end if;
  perform set_config('risk.sistema', '1', true);
  if c.status = 'aprovada' and c.aplicado_em is null then
    dias := coalesce(c.duracao_dias, 365);
    update public.profiles p set
      status = 'aprovado',
      curso = coalesce(c.curso, p.curso),
      curso_solicitado = coalesce(c.curso, p.curso_solicitado),
      acesso_ate = greatest(coalesce(p.acesso_ate, current_date), current_date) + dias,
      bloqueado = false, bloqueio_motivo = null,
      telefone = coalesce(p.telefone, c.telefone)
    where p.id = uid;
    update public.compras set aplicado_em = now(), user_id = uid where id = c.id;
    return true;
  elsif c.status in ('reembolsada','chargeback','cancelada') and c.aplicado_em is not null and c.bloqueado_em is null then
    update public.profiles set bloqueado = true, bloqueio_motivo = 'Compra ' || c.status || ' na Hotmart (' || c.transacao || ')' where id = uid;
    update public.compras set bloqueado_em = now(), user_id = uid where id = c.id;
    return true;
  end if;
  return false;
end $$;
revoke all on function public.aplicar_compra(uuid) from public, anon, authenticated;

-- Quando a Hotmart avisa (insere/atualiza a compra), tenta liberar na hora
create or replace function public.compra_aplica() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if pg_trigger_depth() > 1 then return null; end if;
  perform public.aplicar_compra(new.id);
  return null;
end $$;
drop trigger if exists compra_aplica on public.compras;
create trigger compra_aplica after insert or update on public.compras for each row execute function public.compra_aplica();

-- O aluno chama ao entrar: procura compras do e-mail dele que ainda não foram aplicadas
create or replace function public.verificar_minha_compra() returns int
language plpgsql security definer set search_path = public as $$
declare em text; n int := 0; r record;
begin
  select lower(email) into em from auth.users where id = auth.uid() and email_confirmed_at is not null;
  if em is null then return 0; end if;
  for r in select id from public.compras where email = em and ((status = 'aprovada' and aplicado_em is null) or (status in ('reembolsada','chargeback','cancelada') and aplicado_em is not null and bloqueado_em is null)) order by recebido_em loop
    if public.aplicar_compra(r.id) then n := n + 1; end if;
  end loop;
  return n;
end $$;
grant execute on function public.verificar_minha_compra() to authenticated;

-- O administrador pode reprocessar uma compra (ex.: depois de corrigir o produto ou o e-mail)
create or replace function public.reprocessar_compra(cid uuid) returns boolean
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Somente o administrador.'; end if;
  return public.aplicar_compra(cid);
end $$;
grant execute on function public.reprocessar_compra(uuid) to authenticated;

-- Quem já estava aprovado antes desta atualização fica sem data (acesso sem vencimento) até você definir.
