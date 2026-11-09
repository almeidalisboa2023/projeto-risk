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

-- ===== ATUALIZAÇÃO 02 =====
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

-- ===== ATUALIZAÇÃO 03 =====
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

-- ===== ATUALIZAÇÃO 04 =====
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

-- ===== ATUALIZAÇÃO 05 =====
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

-- ===== ATUALIZAÇÃO 06 =====
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

-- ===== ATUALIZAÇÃO 07 =====
alter table public.editais add column if not exists finalizado_em date;

-- DEPOIS de criar a sua conta no app, rode a linha abaixo trocando o e-mail para virar administrador:
-- update public.profiles set role = 'admin' where email = 'almeidalisboa2023@gmail.com';

-- ===== Atualização 08: cursos =====
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

-- ===== Atualização 09: conteúdo em PDF =====
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

-- ===== Atualização 10: apostilas por curso =====
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

-- ===== Atualização 11: questões dos PDFs =====
-- (Antes, rode a 09 e a 10, se ainda não rodou.)
--
-- O que muda:
--  • As questões encontradas nos PDFs (Conteúdo em PDF e Apostilas) viram questões respondíveis.
--  • O gabarito e os comentários do PDF ficam escondidos e só aparecem depois da resposta.

alter table public.conteudos add column if not exists quiz jsonb default '[]'::jsonb;
alter table public.apostilas add column if not exists quiz jsonb default '[]'::jsonb;
alter table public.apostilas add column if not exists mascara jsonb default '{}'::jsonb; -- áreas das páginas cobertas (gabaritos e comentários)

-- ===== Atualização 12: apostilas, materiais e simulados =====
-- (Antes, rode a 09, a 10 e a 11, se ainda não rodou.)
--
-- O que muda:
--  • Os PDFs passam a ter uma seção: Apostilas, Materiais ou Simulados (coluna "tipo").
--  • Os PDFs já enviados são separados automaticamente pelo título:
--      título com "simulado"  → Simulados
--      título com "apostila"  → Apostilas
--      os demais              → Materiais
--    Depois é só conferir no app e, se algum ficou no lugar errado, clicar em Editar e trocar a seção.
--  • A ordem de cada seção é numerada (10, 20, 30…) pela data de envio; no app você muda com ↑ e ↓.

alter table public.apostilas add column if not exists tipo text;

update public.apostilas set tipo = case
    when titulo ilike '%simulad%' or arquivo ilike '%simulad%' then 'simulado'
    when titulo ilike '%apostila%' or arquivo ilike '%apostila%' then 'apostila'
    else 'material' end
  where tipo is null;

alter table public.apostilas alter column tipo set default 'apostila';
alter table public.apostilas alter column tipo set not null;
alter table public.apostilas drop constraint if exists apostilas_tipo_check;
alter table public.apostilas add constraint apostilas_tipo_check check (tipo in ('apostila', 'material', 'simulado'));

-- numera a ordem dentro de cada seção, só onde ainda não foi definida
with n as (
  select id, row_number() over (partition by tipo order by created_at) * 10 as o
  from public.apostilas where coalesce(ordem, 0) = 0
)
update public.apostilas a set ordem = n.o from n where a.id = n.id;

-- ===== Atualização 13: matérias dos cursos =====
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
