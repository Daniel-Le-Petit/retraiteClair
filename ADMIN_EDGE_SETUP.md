# Admin dashboard (site statique + Supabase Edge Functions)

## Architecture

- **Frontend** : `/admin` (export statique) — appelle uniquement l’URL  
  `https://<PROJECT>.supabase.co/functions/v1/admin`
- **Secrets** : mot de passe admin en base (`admin_accounts.password_hash`, bcrypt via PostgreSQL `crypt()`), vérifié dans l’Edge Function ; JWT signé avec `ADMIN_JWT_SECRET`
- **Données** : lecture avec **service role** côté Edge Function (contourne la RLS sur `events`, `user_numbers`, `connection_logs`)

## 1. SQL (Supabase → SQL Editor)

Exécuter le fichier :

`supabase/migrations/20250408120000_admin_dashboard.sql`

Puis **créer le compte admin** (remplacez le mot de passe) :

```sql
insert into public.admin_accounts (username, password_hash)
values ('admin', crypt('VOTRE_MOT_DE_PASSE', gen_salt('bf')))
on conflict (username) do update
  set password_hash = excluded.password_hash, updated_at = now();
```

## 2. Secrets Edge Functions

Dans le terminal (Supabase CLI) :

```bash
supabase login
supabase link --project-ref VOTRE_PROJECT_REF
supabase secrets set ADMIN_JWT_SECRET="$(openssl rand -base64 32)"
```

`ADMIN_JWT_SECRET` doit rester **long** (≥ 32 caractères aléatoires).

`SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` sont injectés automatiquement par Supabase pour les fonctions.

## 3. Déployer les fonctions

```bash
supabase functions deploy admin --no-verify-jwt
supabase functions deploy log-visit --no-verify-jwt
```

`--no-verify-jwt` : pas de JWT Supabase Auth pour invoquer ces fonctions (login custom dans `admin`, endpoint public pour `log-visit`).

## 4. Variables d’environnement du site (Next / Render)

Dans `.env` local et dans les **Environment Variables** Render :

| Variable | Exemple |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` |

La page `/admin` construit l’URL des fonctions à partir de cette variable. **Ne commitez pas** la clé service role dans le frontend.

## 5. (Optionnel) Remplir `connection_logs`

- Déployer **`log-visit`** puis `POST` depuis le navigateur (avec en-têtes `apikey` + `Authorization: Bearer <anon key>`) vers  
  `https://<PROJECT>.supabase.co/functions/v1/log-visit`  
  Corps JSON optionnel : `{ "user_label": "@pseudo ou email" }` — l’IP est prise depuis `x-forwarded-for`.

## 6. Sécurité

- Retirez les politiques **SELECT public** sur `events` / données sensibles si vous ne voulez plus d’accès anonyme (voir ancien `supabase-fix-rls.sql`).
- L’admin ne doit pas indexer : `app/admin/layout.tsx` définit `robots: noindex`.

## 7. Test local des fonctions

```bash
supabase functions serve admin --no-verify-jwt --env-file supabase/.env.local
```

(`supabase/.env.local` peut contenir `ADMIN_JWT_SECRET=...` et les clés si besoin.)
