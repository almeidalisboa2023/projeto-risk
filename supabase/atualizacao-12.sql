-- PROJETO R.I.S.K. — Atualização 12: APOSTILAS, MATERIAIS E SIMULADOS SEPARADOS
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.
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
