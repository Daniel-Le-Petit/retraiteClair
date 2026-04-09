-- Admin + journal des connexions (site statique : lecture via Edge Function + service role)
-- Exécuter dans Supabase SQL Editor ou via CLI.

create extension if not exists pgcrypto;

-- Comptes admin (mot de passe = hash bcrypt via crypt() ci-dessous, jamais en clair)
create table if not exists public.admin_accounts (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Journal : identifiant affiché (email, @pseudo, etc.) + IP + date (rempli par Edge log-visit ou vos scripts)
create table if not exists public.connection_logs (
  id uuid primary key default gen_random_uuid(),
  user_label text null,
  ip_address text null,
  user_agent text null,
  created_at timestamptz default now()
);

alter table public.admin_accounts enable row level security;
alter table public.connection_logs enable row level security;

-- Pas d’accès direct anon/authenticated : tout passe par Edge Functions (service role)
drop policy if exists "admin_accounts_no_direct" on public.admin_accounts;
create policy "admin_accounts_no_direct"
  on public.admin_accounts for all
  using (false)
  with check (false);

drop policy if exists "connection_logs_no_direct" on public.connection_logs;
create policy "connection_logs_no_direct"
  on public.connection_logs for all
  using (false)
  with check (false);

-- Exemple : créer l’utilisateur admin (remplacez le mot de passe avant d’exécuter)
-- insert into public.admin_accounts (username, password_hash)
-- values ('admin', crypt('VOTRE_MOT_DE_PASSE_ICI', gen_salt('bf')))
-- on conflict (username) do update set password_hash = excluded.password_hash, updated_at = now();

comment on table public.admin_accounts is 'Auth admin dashboard — vérifié par Edge Function uniquement';
comment on table public.connection_logs is 'Visites / connexions — remplies par Edge log-visit ou imports';
