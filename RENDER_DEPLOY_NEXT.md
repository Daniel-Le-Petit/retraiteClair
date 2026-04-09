# Déployer RetraiteClair sur Render (Next.js en **site statique**)

## Contexte

- **`NEXT_STATIC_EXPORT=true npm run build`** génère le dossier **`out/`** (HTML/JS/CSS prêts pour un CDN).
- **`render.yaml`** décrit un service **`type: web`** + **`runtime: static`** + **`staticPublishPath: out`** (syntaxe [Blueprint Render](https://render.com/docs/blueprint-spec)).
- Pas de **`next start`** en prod : pas de cold start Node, fichiers servis depuis le CDN Render.

### Autres modes (local / Docker)

| Mode | Commande / variable | Sortie |
|------|---------------------|--------|
| Développement | `npm run dev` | hot reload |
| Prod locale (Node) | `npm run build` puis `npm start` | `.next/` + serveur |
| **Export statique** | `NEXT_STATIC_EXPORT=true npm run build` ou `npm run build:static` | **`out/`** |
| Docker (image actuelle) | build **sans** `NEXT_STATIC_EXPORT` | `.next/` + `next start` |

---

## Étape 1 — Tester l’export en local

```bash
cd /chemin/vers/RetraiteClair
npm ci
npm run build:static
```

Servir le dossier `out/` (exemple avec `npx`) :

```bash
npx --yes serve out -l 3000
```

Ouvrir `http://localhost:3000` : le site doit être Next.js (chemins `/_next/`).

---

## Étape 2 — Git

```bash
git add next.config.mjs render.yaml package.json RENDER_DEPLOY_NEXT.md
git commit -m "feat: static export Next.js for Render CDN (out/)"
git push origin main
```

---

## Étape 3 — Render (Static Site)

### Manuel

1. **New** → **Static Site** (ou **Web Service** avec **Runtime Static** selon l’UI).
2. Repo **`Daniel-Le-Petit/retraiteClair`**, branche **`main`**.
3. **Build command** : `npm ci && npm run build:static`  
   (ne pas utiliser `NEXT_STATIC_EXPORT=true npm ci && npm run build` : la variable ne s’applique qu’à `npm ci`, pas au build → pas de dossier `out/`.)
4. **Publish directory** : **`out`**
5. Pas de **Start command** (fichiers statiques uniquement).

### Blueprint (`render.yaml`)

1. **New** → **Blueprint** → connecter le dépôt.
2. Render applique `render.yaml` (`runtime: static`, `staticPublishPath: out`).

3. Si un ancien Static **retraiteclair** pointait vers **`build/`**, le **supprimer** ou le **mettre à jour** pour éviter deux services.

---

## Étape 4 — Domaine

**Settings** → **Custom Domains** → attacher `retraiteclair.onrender.com` au **nouveau** site statique.

---

## Étape 5 — Vérification

```bash
curl -sS "https://retraiteclair.onrender.com/" | grep -oE '/(_next|static/js/main)' | head -1
```

Résultat attendu : **`/_next`** (pas `static/js/main`).

---

## Dépannage

| Problème | Action |
|----------|--------|
| Build échoue | Vérifier les logs ; `npm ci` nécessite `package-lock.json`. |
| Images Unsplash | En export statique, `images.unoptimized: true` est activé dans `next.config.mjs`. |
| Docker | Ne pas définir `NEXT_STATIC_EXPORT` au build si l’image utilise `next start` + `.next`. |

**Fichiers** : `next.config.mjs` (`NEXT_STATIC_EXPORT`, `USE_STANDALONE`), `render.yaml`, `package.json` (`build:static`).
