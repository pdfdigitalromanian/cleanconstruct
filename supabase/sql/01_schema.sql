-- CleanConstruct database schema
-- Paste this file first in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  wordpress_id bigint unique,
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null,
  excerpt text not null default '',
  content_html text not null,
  published_at timestamptz not null,
  modified_at timestamptz not null,
  author text not null default 'CleanConstruct',
  categories text[] not null default '{}',
  featured_image text not null,
  featured_image_alt text not null default '',
  seo_title text not null,
  seo_description text not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  phone text not null check (char_length(phone) between 6 and 40),
  email text not null check (char_length(email) between 5 and 254),
  service text not null check (char_length(service) between 2 and 100),
  locality text not null check (char_length(locality) between 2 and 120),
  approximate_area numeric(10, 2) check (approximate_area is null or approximate_area between 0 and 100000),
  message text not null check (char_length(message) between 3 and 5000),
  photo_paths text[] not null default '{}',
  source_url text,
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'won', 'lost', 'spam')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_at_idx on public.posts (published_at desc) where status = 'published';
create index if not exists posts_categories_idx on public.posts using gin (categories);
create index if not exists quote_requests_created_at_idx on public.quote_requests (created_at desc);
create index if not exists quote_requests_status_idx on public.quote_requests (status, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

drop trigger if exists quote_requests_set_updated_at on public.quote_requests;
create trigger quote_requests_set_updated_at
before update on public.quote_requests
for each row execute function public.set_updated_at();

alter table public.posts enable row level security;
alter table public.quote_requests enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
on public.posts
for select
to anon, authenticated
using (status = 'published');

-- The frontend can create a request, but cannot list, read, edit, or delete leads.
drop policy if exists "Public can submit quote requests" on public.quote_requests;
create policy "Public can submit quote requests"
on public.quote_requests
for insert
to anon, authenticated
with check (
  status = 'new'
  and cardinality(photo_paths) <= 4
  and char_length(name) between 2 and 120
  and char_length(message) between 3 and 5000
);

revoke all on table public.quote_requests from anon, authenticated;
grant insert on table public.quote_requests to anon, authenticated;
grant select on table public.posts to anon, authenticated;

comment on table public.posts is 'Published and draft CleanConstruct articles.';
comment on table public.quote_requests is 'Private lead submissions from the website quote form.';
