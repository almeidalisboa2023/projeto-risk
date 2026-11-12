-- PROJETO R.I.S.K. — Atualização 17: IMAGENS NO CONTEÚDO PROGRAMÁTICO
-- Cole no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem problema.
-- Cria a pasta pública "leitura" para as imagens que o administrador insere nos textos (só ele envia; todos veem).
insert into storage.buckets (id, name, public) values ('leitura', 'leitura', true) on conflict (id) do nothing;
drop policy if exists "leitura img upload admin" on storage.objects;
create policy "leitura img upload admin" on storage.objects for insert with check (bucket_id = 'leitura' and public.is_admin());
drop policy if exists "leitura img update admin" on storage.objects;
create policy "leitura img update admin" on storage.objects for update using (bucket_id = 'leitura' and public.is_admin());
drop policy if exists "leitura img delete admin" on storage.objects;
create policy "leitura img delete admin" on storage.objects for delete using (bucket_id = 'leitura' and public.is_admin());
drop policy if exists "leitura img le" on storage.objects;
create policy "leitura img le" on storage.objects for select using (bucket_id = 'leitura');
