-- PROJETO R.I.S.K. — atualização 07 (finalizar cronograma). Já inclui as atualizações 02 a 06.
-- Cole tudo no SQL Editor e clique em Run. Pode rodar de novo sem problema. Não apaga nada.

alter table public.profiles add column if not exists meta_questoes int default 30;
alter table public.profiles add column if not exists revisao_auto boolean default true;
alter table public.tarefas add column if not exists minutos int default 0;
alter table public.tarefas add column if not exists origem text;

create table if not exists public.provas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  edital_id uuid references public.editais(id) on delete set null,
  titulo text,
  formato text default 'certo_errado',
  total int not null default 0,
  acertos int not null default 0,
  erros int not null default 0,
  brancos int not null default 0,
  nota numeric not null default 0,
  minutos int default 0,
  detalhe jsonb default '{}',
  created_at timestamptz default now()
);
create index if not exists provas_user on public.provas(user_id, created_at);
alter table public.provas enable row level security;
drop policy if exists "dono le" on public.provas;
drop policy if exists "dono grava" on public.provas;
create policy "dono le" on public.provas for select using (user_id = auth.uid() or public.is_admin());
create policy "dono grava" on public.provas for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Horas de estudo (cronômetro e lançamentos manuais)
create table if not exists public.sessoes_estudo (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  edital_id uuid references public.editais(id) on delete set null,
  tarefa_id uuid references public.tarefas(id) on delete set null,
  materia text not null,
  data date not null default current_date,
  minutos int not null check (minutos > 0),
  origem text default 'cronometro' check (origem in ('cronometro','manual')),
  obs text,
  created_at timestamptz default now()
);
create index if not exists sessoes_user on public.sessoes_estudo(user_id, data);
alter table public.sessoes_estudo enable row level security;
drop policy if exists "dono le" on public.sessoes_estudo;
drop policy if exists "dono grava" on public.sessoes_estudo;
create policy "dono le" on public.sessoes_estudo for select using (user_id = auth.uid() or public.is_admin());
create policy "dono grava" on public.sessoes_estudo for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- CPF no perfil (cabeçalho dos resumos) e matéria nos registros de questões feitos pelo Painel
alter table public.profiles add column if not exists cpf text;
alter table public.question_logs add column if not exists materia text;

-- Resumos técnicos gerados pela IA
create table if not exists public.resumos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  topico_id uuid references public.topicos(id) on delete set null,
  edital_id uuid references public.editais(id) on delete set null,
  materia text,
  topico text,
  concurso text,
  conteudo text not null,
  modelo text,
  created_at timestamptz default now()
);
create index if not exists resumos_user on public.resumos(user_id, topico_id);
alter table public.resumos enable row level security;
drop policy if exists "dono le" on public.resumos;
drop policy if exists "dono grava" on public.resumos;
create policy "dono le" on public.resumos for select using (user_id = auth.uid() or public.is_admin());
create policy "dono grava" on public.resumos for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ===== Aprovação de cadastros =====
-- Na primeira vez, cria a coluna e libera quem já tinha conta; novos cadastros entram como "pendente".
do $$ begin
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'status') then
    alter table public.profiles add column status text default 'pendente';
    update public.profiles set status = 'aprovado';
  end if;
end $$;
alter table public.profiles drop constraint if exists profiles_status_check;
alter table public.profiles add constraint profiles_status_check check (status in ('pendente','aprovado','recusado'));

create or replace function public.meu_status() returns text
language sql stable security definer set search_path = public as $$
  select status from public.profiles where id = auth.uid();
$$;

-- O aluno edita o próprio perfil, mas não pode mudar o próprio papel nem se aprovar
drop policy if exists "perfil edita" on public.profiles;
create policy "perfil edita" on public.profiles for update using (id = auth.uid())
  with check (id = auth.uid() and (public.is_admin() or (role = 'aluno' and status is not distinct from public.meu_status())));

-- Novos cadastros (e-mail ou Google): nome vem do Google quando houver; o administrador já entra aprovado
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare adm boolean := lower(new.email) = 'almeidalisboa2023@gmail.com';
begin
  insert into public.profiles(id, email, nome, role, status)
  values (new.id, new.email,
    coalesce(new.raw_user_meta_data->>'nome', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email,'@',1)),
    case when adm then 'admin' else 'aluno' end,
    case when adm then 'aprovado' else 'pendente' end)
  on conflict (id) do nothing;
  return new;
end $$;

-- Conta do administrador
update public.profiles set role = 'admin', status = 'aprovado' where lower(email) = 'almeidalisboa2023@gmail.com';

-- ===== Temas do calendário =====
-- editais.tema: vazio = automático pelo nome do concurso; só o administrador muda.
-- profiles.tema_padrao: o próprio aluno pode preferir o tema padrão.
alter table public.editais add column if not exists tema text;
alter table public.profiles add column if not exists tema_padrao boolean default false;

create or replace function public.protege_tema() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if public.is_admin() or auth.uid() is null then return new; end if;
  if tg_op = 'INSERT' then new.tema := null; return new; end if;
  if new.tema is distinct from old.tema then raise exception 'Só o administrador pode mudar o tema do calendário.'; end if;
  return new;
end $$;
drop trigger if exists protege_tema on public.editais;
create trigger protege_tema before insert or update on public.editais for each row execute function public.protege_tema();

-- O administrador pode editar o edital (tema) de qualquer aluno
drop policy if exists "admin edita editais" on public.editais;
create policy "admin edita editais" on public.editais for update using (public.is_admin()) with check (public.is_admin());

-- ===== Finalizar cronograma =====
alter table public.editais add column if not exists finalizado_em date;
