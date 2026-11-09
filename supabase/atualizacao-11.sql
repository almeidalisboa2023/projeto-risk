-- PROJETO R.I.S.K. — Atualização 11: QUESTÕES DOS PDFs RESPONDÍVEIS
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.
-- (Antes, rode a 09 e a 10, se ainda não rodou.)
--
-- O que muda:
--  • As questões encontradas nos PDFs (Conteúdo em PDF e Apostilas) viram questões respondíveis.
--  • O gabarito e os comentários do PDF ficam escondidos e só aparecem depois da resposta.

alter table public.conteudos add column if not exists quiz jsonb default '[]'::jsonb;
alter table public.apostilas add column if not exists quiz jsonb default '[]'::jsonb;
alter table public.apostilas add column if not exists mascara jsonb default '{}'::jsonb; -- áreas das páginas cobertas (gabaritos e comentários)
