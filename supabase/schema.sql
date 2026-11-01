-- PROJETO R.I.S.K. — banco de dados (Supabase / PostgreSQL)
-- Cole tudo no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.

create extension if not exists pgcrypto;

-- ===== PERFIS =====
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  nome text,
  role text not null default 'aluno' check (role in ('aluno','admin')),
  lingua text default 'espanhol',
  blocos jsonb default '[{"hora":"08:00","min":50},{"hora":"09:00","min":50},{"hora":"21:00","min":50}]',
  meta_agua int default 4000,
  edital_atual uuid,
  bloqueado boolean default false,
  created_at timestamptz default now()
);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles(id, email, nome)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'nome', split_part(new.email,'@',1)))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ===== EDITAIS E TÓPICOS =====
create table if not exists public.editais (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  concurso text not null,
  cargo text,
  banca text,
  formato text default 'certo_errado' check (formato in ('certo_errado','multipla_escolha')),
  data_prova date,
  data_inicio date,
  cor text default 'rosa',
  ativo boolean default true,
  legacy_id text,
  created_at timestamptz default now()
);

create table if not exists public.topicos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  edital_id uuid not null references public.editais(id) on delete cascade,
  materia text not null,
  topico text not null,
  ordem int default 0,
  fora_do_edital boolean default false,
  lingua text,
  concluido boolean default false,
  link_aula text, link_pdf text, link_lei_seca text, link_questoes text,
  legacy_id text,
  created_at timestamptz default now()
);
create index if not exists topicos_edital on public.topicos(edital_id);

-- ===== CALENDÁRIO =====
create table if not exists public.tarefas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  edital_id uuid references public.editais(id) on delete cascade,
  topico_id uuid references public.topicos(id) on delete set null,
  semana int not null,
  dia text not null check (dia in ('Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo')),
  ordem int default 0,
  materia text,
  topico text,
  concluido boolean default false,
  concluido_em date,
  checklist jsonb default '{}',
  duvida text,
  legacy_id text,
  created_at timestamptz default now()
);
create index if not exists tarefas_user_semana on public.tarefas(user_id, semana);

-- ===== HISTÓRICO DE QUESTÕES (fonte única dos números) =====
create table if not exists public.question_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  edital_id uuid references public.editais(id) on delete cascade,
  topico_id uuid references public.topicos(id) on delete set null,
  data date not null default current_date,
  feitas int not null check (feitas >= 0),
  acertos int not null check (acertos >= 0),
  origem text default 'externa' check (origem in ('app','externa')),
  legacy_id text,
  created_at timestamptz default now(),
  check (acertos <= feitas)
);
create index if not exists qlogs_user on public.question_logs(user_id, data);

-- ===== BANCO DE QUESTÕES =====
create table if not exists public.questoes (
  id uuid primary key default gen_random_uuid(),
  codigo text unique,
  modalidade text not null default 'certo_errado' check (modalidade in ('certo_errado','multipla_escolha')),
  enunciado text not null,
  alternativas jsonb default '[]',
  gabarito text not null,
  comentario text,
  materia text, assunto text, subassunto text,
  banca text, orgao text, cargo text, nivel text, ano int, dificuldade int,
  situacao text default 'atualizada' check (situacao in ('atualizada','desatualizada','anulada')),
  origem text default 'publica' check (origem in ('publica','inedita','ia')),
  fonte text,
  tags text,
  owner uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);
create index if not exists questoes_assunto on public.questoes(materia, assunto);

create table if not exists public.respostas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  questao_id uuid not null references public.questoes(id) on delete cascade,
  resposta text not null,
  acertou boolean not null,
  topico_id uuid references public.topicos(id) on delete set null,
  created_at timestamptz default now()
);
create index if not exists respostas_user on public.respostas(user_id, questao_id);

create table if not exists public.reportes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  questao_id uuid references public.questoes(id) on delete cascade,
  texto text,
  resolvido boolean default false,
  created_at timestamptz default now()
);

-- ===== OUTROS =====
create table if not exists public.agua (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  data date not null default current_date,
  ml int not null check (ml > 0),
  created_at timestamptz default now()
);

create table if not exists public.simulados (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  semana int,
  arquivo_url text not null,
  liberado_em date not null default current_date,
  alunos uuid[],           -- vazio = todos os alunos
  created_at timestamptz default now()
);

create table if not exists public.ia_pedidos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  topico_id uuid,
  ok boolean default true,
  created_at timestamptz default now()
);

-- ===== REGRAS DE ACESSO (RLS) =====
alter table public.profiles enable row level security;
alter table public.editais enable row level security;
alter table public.topicos enable row level security;
alter table public.tarefas enable row level security;
alter table public.question_logs enable row level security;
alter table public.questoes enable row level security;
alter table public.respostas enable row level security;
alter table public.reportes enable row level security;
alter table public.agua enable row level security;
alter table public.simulados enable row level security;
alter table public.ia_pedidos enable row level security;

do $$ declare t text; begin
  foreach t in array array['editais','topicos','tarefas','question_logs','respostas','agua','ia_pedidos'] loop
    execute format('drop policy if exists "dono le" on public.%I', t);
    execute format('drop policy if exists "dono grava" on public.%I', t);
    execute format('create policy "dono le" on public.%I for select using (user_id = auth.uid() or public.is_admin())', t);
    execute format('create policy "dono grava" on public.%I for all using (user_id = auth.uid()) with check (user_id = auth.uid())', t);
  end loop;
end $$;

drop policy if exists "perfil le" on public.profiles;
drop policy if exists "perfil edita" on public.profiles;
drop policy if exists "admin edita perfis" on public.profiles;
create policy "perfil le" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "perfil edita" on public.profiles for update using (id = auth.uid())
  with check (id = auth.uid() and (role = 'aluno' or public.is_admin()));
create policy "admin edita perfis" on public.profiles for update using (public.is_admin());

drop policy if exists "questoes le" on public.questoes;
drop policy if exists "questoes admin" on public.questoes;
drop policy if exists "questoes ia" on public.questoes;
create policy "questoes le" on public.questoes for select
  using (origem in ('publica','inedita') or owner = auth.uid() or public.is_admin());
create policy "questoes admin" on public.questoes for all using (public.is_admin()) with check (public.is_admin());
create policy "questoes ia" on public.questoes for insert with check (origem = 'ia' and owner = auth.uid());

drop policy if exists "reportes grava" on public.reportes;
drop policy if exists "reportes le" on public.reportes;
create policy "reportes grava" on public.reportes for insert with check (user_id = auth.uid());
create policy "reportes le" on public.reportes for select using (user_id = auth.uid() or public.is_admin());
drop policy if exists "reportes admin" on public.reportes;
create policy "reportes admin" on public.reportes for update using (public.is_admin());

drop policy if exists "simulados le" on public.simulados;
drop policy if exists "simulados admin" on public.simulados;
create policy "simulados le" on public.simulados for select
  using (public.is_admin() or alunos is null or cardinality(alunos) = 0 or auth.uid() = any(alunos));
create policy "simulados admin" on public.simulados for all using (public.is_admin()) with check (public.is_admin());

-- Estatística de uma questão (% de acerto entre todos os alunos), sem expor respostas alheias
create or replace function public.estatistica_questao(q uuid)
returns table(total bigint, acertos bigint) language sql stable security definer set search_path = public as $$
  select count(*), count(*) filter (where acertou) from public.respostas where questao_id = q;
$$;

-- Arquivos dos simulados (PDF)
insert into storage.buckets (id, name, public) values ('simulados','simulados', true)
  on conflict (id) do nothing;
drop policy if exists "simulados upload admin" on storage.objects;
create policy "simulados upload admin" on storage.objects for insert
  with check (bucket_id = 'simulados' and public.is_admin());
drop policy if exists "simulados delete admin" on storage.objects;
create policy "simulados delete admin" on storage.objects for delete
  using (bucket_id = 'simulados' and public.is_admin());

-- DEPOIS de criar a sua conta no app, rode a linha abaixo trocando o e-mail para virar administrador:
-- update public.profiles set role = 'admin' where email = 'almeidalisboa2023@gmail.com';
