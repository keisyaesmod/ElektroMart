-- Jalankan seluruh script ini di Supabase SQL Editor.
-- User login tersimpan di auth.users; data aplikasi tersimpan di public.profiles.

create type public.user_role as enum ('buyer', 'seller', 'admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'buyer',
  job_title text,
  full_name text,
  store_name text,
  phone text,
  store_address text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

alter table public.profiles add column if not exists job_title text;

create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can create their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Jadikan akun Keisya sebagai admin Developer.
-- Jalankan setelah user dibuat di Supabase Authentication.
do $$
declare
  admin_id uuid;
begin
  select id into admin_id
  from auth.users
  where lower(email) = 'esmodkeisya@gmail.com'
  limit 1;

  if admin_id is null then
    raise notice 'User esmodkeisya@gmail.com belum ada di Authentication. Buat user tersebut dahulu, lalu jalankan ulang blok ini.';
  else
    update auth.users
    set phone = '+6285198253573',
      raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object(
      'full_name', 'Keisya esmod',
      'phone', '+6285198253573',
      'role', 'admin',
      'job_title', 'Developer'
    )
    where id = admin_id;

    insert into public.profiles (id, role, job_title, full_name, phone)
    values (admin_id, 'admin', 'Developer', 'Keisya esmod', '+62 851-9825-3573')
    on conflict (id) do update set
      role = 'admin',
      job_title = 'Developer',
      full_name = 'Keisya esmod',
      phone = '+62 851-9825-3573',
      updated_at = now();
  end if;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    role,
    job_title,
    full_name,
    store_name,
    phone,
    store_address,
    avatar_url
  )
  values (
    new.id,
    case
      when new.raw_user_meta_data->>'role' = 'seller' then 'seller'::public.user_role
      when new.raw_user_meta_data->>'role' = 'admin' then 'admin'::public.user_role
      else 'buyer'::public.user_role
    end,
    new.raw_user_meta_data->>'job_title',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'store_name',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'store_address',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- Jalankan blok ALTER ini bila tabel profiles sudah pernah dibuat sebelumnya.
alter table public.profiles add column if not exists avatar_url text;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update set public = true;

-- Bucket avatars dipakai untuk menyimpan foto profil admin, seller, dan buyer.
-- Jalankan bagian ini di Supabase SQL Editor sebelum mencoba upload foto.

create policy "Users can view avatars"
  on storage.objects for select
  to public
  using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can update their own avatar"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete their own avatar"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();