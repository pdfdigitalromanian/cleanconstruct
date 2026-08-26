-- CleanConstruct quote-photo storage
-- Paste this file second, after 01_schema.sql.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'quote-uploads',
  'quote-uploads',
  false,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can upload quote photos" on storage.objects;
create policy "Public can upload quote photos"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'quote-uploads'
  and (storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'heic')
);

-- No public SELECT policy is created: uploaded photos remain private.
-- View/download them from the authenticated Supabase dashboard or a secure server.
