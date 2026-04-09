-- Admin login: verify password with same pgcrypto crypt() as the insert.
-- Run the whole file. Enable extension pgcrypto in Dashboard if needed.

create extension if not exists pgcrypto;

create or replace function public.verify_admin_password(p_username text, p_plain text)
returns table (id uuid, username text)
language sql
security definer
set search_path = public, extensions
stable
as $$
  select a.id, a.username
  from public.admin_accounts a
  where a.username = p_username
    and a.password_hash = crypt(p_plain, a.password_hash)
  limit 1;
$$;

comment on function public.verify_admin_password(text, text) is
  'Admin login; Edge Function service_role only.';

revoke all on function public.verify_admin_password(text, text) from public;
grant execute on function public.verify_admin_password(text, text) to service_role;
