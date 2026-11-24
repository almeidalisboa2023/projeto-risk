-- PROJETO R.I.S.K. — Atualização 23: FOTO DE FUNDO DE CADA CURSO
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.
--
-- O que muda:
--  • No Administrador > "Matérias e fundo dos cursos", o administrador escolhe a foto de fundo de cada curso
--    (da galeria do app ou enviando uma foto). A foto enviada fica no bucket público "cursos" (já existente).

alter table public.cursos_ajustes add column if not exists fundo text;  -- 'galeria:<id>' ou URL da foto enviada

-- Garante o bucket público "cursos" e as permissões de envio só para o administrador (caso a atualização 16 não tenha rodado)
insert into storage.buckets (id, name, public) values ('cursos', 'cursos', true) on conflict (id) do nothing;
drop policy if exists "cursos foto upload admin" on storage.objects;
create policy "cursos foto upload admin" on storage.objects for insert with check (bucket_id = 'cursos' and public.is_admin());
drop policy if exists "cursos foto update admin" on storage.objects;
create policy "cursos foto update admin" on storage.objects for update using (bucket_id = 'cursos' and public.is_admin());
