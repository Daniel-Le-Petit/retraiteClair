# Déployer Next.js sur Render (remplacer l’ancien site statique)

## Contexte

- **Avant** : service **Static Site** + dossier `build/` → ancienne app React.
- **Après** : service **Web** Node → `next build` + `next start` (dossier `.next/`).

Le fichier `render.yaml` à la racine décrit ce service web.

---

## Étape 1 — Vérifier le projet en local

```bash
cd /chemin/vers/RetraiteClair
npm ci
npm run build
npm start
```

Ouvrir `http://localhost:3000` : la page doit être le site **Next.js** (pas l’ancien `#/simulateurs`).

Arrêter le serveur (Ctrl+C).

---

## Étape 2 — Commiter les changements (Git)

Depuis la racine du dépôt :

```bash
git status
git add render.yaml .gitignore
git commit -m "Deploy: Render Web Service Next.js (remplace static site build/)"
```

### Optionnel — retirer l’ancien dossier `build/` du dépôt Git

Si `build/` était versionné (ancienne CRA), pour éviter toute confusion :

```bash
git rm -r --cached build 2>/dev/null || true
git add .gitignore
git commit -m "Stop tracking legacy CRA build/ folder"
```

Puis pousser :

```bash
git push origin main
```

---

## Étape 3 — Render : choisir une stratégie

### A) Nouveau Blueprint (recommandé si vous repartez propre)

1. Tableau de bord Render → **New** → **Blueprint**.
2. Connecter le dépôt `Daniel-Le-Petit/retraiteClair` (si ce n’est pas déjà fait).
3. Render détecte `render.yaml` et propose un service **Web** `retraiteclair`.
4. Si un **ancien** service s’appelle déjà `retraiteclair`, **renommez ou supprimez** l’ancien Static Site avant (voir étape 5), ou modifiez temporairement le `name:` dans `render.yaml`.

### B) Création manuelle du Web Service (sans Blueprint)

1. **New** → **Web Service**.
2. **Repository** : `Daniel-Le-Petit/retraiteClair`, branche **`main`**.
3. **Runtime** : **Node**.
4. **Build command** : `npm ci && npm run build`
5. **Start command** : `npm start`
6. **Plan** : selon votre besoin (Free / paid).
7. **Environment** → **Environment Variables** :
   - `NODE_ENV` = `production` (souvent déjà défini par Render ; sinon l’ajouter).
   - Ne **pas** mettre `NODE_ENV=development` pour le build.
8. **Create Web Service**.

---

## Étape 4 — Ancien Static Site

1. Ouvrir l’ancien service **Static Site** `retraiteclair` (ou le nom actuel).
2. **Settings** → noter le **custom domain** s’il est attaché ici.
3. **Suspend** ou **Delete** ce service une fois le nouveau Web Service **Live** et testé.

**Important** : un seul service doit utiliser l’URL `https://retraiteclair.onrender.com` à la fin.

---

## Étape 5 — Domaine et URL

1. Ouvrir le **nouveau** Web Service → **Settings** → **Custom Domains**.
2. **Add** `retraiteclair.onrender.com` (ou laisser le sous-domaine `.onrender.com` fourni par Render).
3. Si le domaine était sur l’ancien service, le **retirer** de l’ancien puis l’ajouter au nouveau.

---

## Étape 6 — Vérification

```bash
curl -sS "https://retraiteclair.onrender.com/" | head -c 500
```

Vous devez voir des indices **Next.js** (par ex. `/_next/` ou structure typique), **pas** `main.c3777b8b.js` ni `<div id="root">`.

En navigateur : **navigation privée** ou `https://retraiteclair.onrender.com/?t=1`

---

## Dépannage

| Problème | Action |
|----------|--------|
| Build échoue | Vérifier les logs ; `npm ci` exige `package-lock.json` à jour. |
| `EADDRINUSE` / port | Render injecte `PORT` ; Next `start` l’utilise. Ne pas fixer un port en dur. |
| Encore l’ancien site | Mauvais service ou domaine encore sur le Static Site. |
| Avertissement `NODE_ENV` | Garder `NODE_ENV=production` pour le runtime, pas de valeur exotique. |

---

## Fichiers concernés dans le repo

- `render.yaml` — service **web** Node, `buildCommand` / `startCommand`.
- `package.json` — `"build": "next build"`, `"start": "next start"`.
- `.gitignore` — ignore `build/` (ancienne sortie CRA).
