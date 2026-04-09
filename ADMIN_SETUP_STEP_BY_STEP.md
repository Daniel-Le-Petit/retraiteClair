# Admin `/admin` — guide pas à pas

Objectif : page **`/admin`** sur le site statique, login **admin** + mot de passe en base, liste des visites / événements (7 jours, mois, année, tout).

---

## Étape 0 — Prérequis sur votre machine

- Compte [Supabase](https://supabase.com) avec le projet déjà créé.
- [Supabase CLI](https://supabase.com/docs/guides/cli) installée : `supabase --version`.
- Terminal ouvert dans le dossier du projet **RetraiteClair**.

---

## Étape 1 — Tables dans Supabase (interface web)

1. Ouvrez le [dashboard Supabase](https://supabase.com/dashboard) → votre projet.
2. Menu **SQL** → **New query**.
3. Copiez **tout** le contenu du fichier du projet :  
   `supabase/migrations/20250408120000_admin_dashboard.sql`
4. Cliquez sur **Run** (ou équivalent).
5. Vérifiez qu’il n’y a pas d’erreur en bas de l’éditeur.

---

## Étape 2 — Créer le compte administrateur (mot de passe)

Toujours dans **SQL** → nouvelle requête.

1. Remplacez `VotreMotDePasseSecret` par le mot de passe souhaité (gardez-le secret).
2. Exécutez :

```sql
insert into public.admin_accounts (username, password_hash)
values ('admin', crypt('VotreMotDePasseSecret', gen_salt('bf')))
on conflict (username) do update
  set password_hash = excluded.password_hash, updated_at = now();
```

3. Vous vous connecterez sur `/admin` avec **Identifiant** `admin` et ce mot de passe.

---

## Étape 3 — Lier le projet en local à Supabase (CLI)

Dans un terminal :

```bash
cd /chemin/vers/RetraiteClair
supabase login
```

Puis liez le dossier au projet cloud (remplacez `VOTRE_PROJECT_REF`) :

```bash
supabase link --project-ref VOTRE_PROJECT_REF
```

Où trouver `VOTRE_PROJECT_REF` : Supabase → **Project Settings** → **General** → **Reference ID**.

---

## Étape 4 — Secret pour les jetons admin (JWT)

Toujours dans le terminal, à la racine du projet :

```bash
supabase secrets set ADMIN_JWT_SECRET="$(openssl rand -base64 32)"
```

- Ce secret sert **uniquement** côté serveur (Edge Functions).
- Ne le mettez **pas** dans le frontend ni sur GitHub.

---

## Étape 5 — Déployer les Edge Functions

Toujours à la racine du projet :

```bash
supabase functions deploy admin --no-verify-jwt
supabase functions deploy log-visit --no-verify-jwt
```

Attendez le message de succès pour chaque commande.

---

## Étape 6 — Variables d’environnement du site Next

### En local

1. À la racine du projet, fichier **`.env`** (ou **`.env.local`**) :
2. Ajoutez (remplacez l’URL par la vôtre) :

```env
NEXT_PUBLIC_SUPABASE_URL=https://VOTRE_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

- **Project URL** : Supabase → **Project Settings** → **API** → **Project URL**.
- **anon public** : même page → **Project API keys** → **anon** **public** (celle qui commence souvent par `eyJ...`). Elle est faite pour le navigateur ; sans elle, les appels aux Edge Functions échouent (**Failed to fetch**).

### Sur Render (site en production)

1. Ouvrez votre **Static Site** sur Render.
2. **Environment** → **Environment Variables**.
3. Ajoutez **les deux** variables ci-dessus (mêmes noms et valeurs que dans `.env`).
4. Enregistrez puis **redéployez** le site (pour régénérer le build avec les variables).

---

## Étape 7 — Build et déploiement du site

En local, pour vérifier :

```bash
npm ci
npm run build:static
```

Puis commit + push (comme d’habitude) pour que Render prenne le nouveau build.

---

## Étape 8 — Tester `/admin`

1. Ouvrez : `https://votre-site.onrender.com/admin` (ou `http://localhost:3000/admin` en dev avec `npm run dev`).
2. Identifiant : **`admin`**
3. Mot de passe : celui de l’**étape 2**.
4. Vous devez voir les tableaux (events, user_numbers, connection_logs) et les filtres **7 jours / mois / année / tout**.

Si la connexion échoue : ouvrez la console du navigateur (F12) → onglet **Network** → regardez l’appel vers `.../functions/v1/admin` (code erreur, message).

---

## Étape 9 — (Optionnel) Remplir `connection_logs` automatiquement

La fonction **`log-visit`** enregistre une ligne (IP + user-agent ; optionnellement un `user_label` dans le corps JSON).

Elle est déjà déployée à l’étape 5. Pour l’appeler depuis le site plus tard, il faudra un petit `fetch` depuis le front avec la **clé anon** Supabase en en-tête (voir `ADMIN_EDGE_SETUP.md` section optionnelle). Ce n’est pas obligatoire pour le premier test : les tableaux **events** et **user_numbers** peuvent déjà contenir des données.

---

## Rappel sécurité

- Ne commitez **jamais** la **service role key** ni `ADMIN_JWT_SECRET` dans le dépôt.
- Le fichier `supabase-fix-rls.sql` qui ouvre des **SELECT public** sur `events` n’est pas idéal en production ; à resserrer quand vous serez prêt.

---

## Fichiers utiles dans le repo

| Fichier | Rôle |
|---------|------|
| `supabase/migrations/20250408120000_admin_dashboard.sql` | Tables + RLS |
| `supabase/functions/admin/index.ts` | Login + stats |
| `supabase/functions/log-visit/index.ts` | Journal optionnel des visites |
| `app/admin/page.tsx` | Interface |
| `ADMIN_EDGE_SETUP.md` | Détails techniques complémentaires |
