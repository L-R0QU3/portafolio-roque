-- Ejecuta este script completo en Supabase > SQL Editor.
-- IMPORTANTE: reemplaza el correo si tu usuario admin usa otro.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status text not null default 'dev',
  desc_es text not null default '',
  desc_en text not null default '',
  tech text[] not null default '{}',
  tech_planned boolean not null default false,
  repo_url text,
  live_url text,
  images jsonb not null default '[]'::jsonb,
  primary_index int not null default 0,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Lectura publica" on public.projects for select using (true);

create policy "Solo el dueno escribe" on public.projects for all to authenticated
  using ((auth.jwt() ->> 'email') = 'luis.roquetic@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'luis.roquetic@gmail.com');

-- Bucket publico para las imagenes
insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "Imagenes lectura publica" on storage.objects for select
  using (bucket_id = 'project-images');

create policy "Imagenes subir solo dueno" on storage.objects for insert to authenticated
  with check (bucket_id = 'project-images' and (auth.jwt() ->> 'email') = 'luis.roquetic@gmail.com');

create policy "Imagenes borrar solo dueno" on storage.objects for delete to authenticated
  using (bucket_id = 'project-images' and (auth.jwt() ->> 'email') = 'luis.roquetic@gmail.com');
