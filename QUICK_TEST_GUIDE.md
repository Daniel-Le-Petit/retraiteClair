# Guide de Test Rapide - Changements à Tester

## Tests Locaux (npm start)

### ✅ Test 1: Cookie Banner
**Fichiers modifiés:** `src/App.js`, `src/components/CookieBanner.tsx`

**Comment tester:**
1. Ouvrir la console navigateur (F12)
2. Exécuter: `localStorage.clear()`
3. Recharger la page (F5)
4. **Attendu:** Bannière cookie apparaît en bas de page
5. Cliquer "J'accepte"
6. **Attendu:** Bannière disparaît
7. Recharger la page
8. **Attendu:** Bannière ne réapparaît PAS
9. Cliquer "Gestion des cookies" dans le footer
10. **Attendu:** Bannière réapparaît

**Vérifier dans DevTools:**
- Application → Local Storage → `rcl_cookie_consent: "accepted"`
- Application → Cookies → `rcl_cookie_consent`

---

### ✅ Test 2: Simulation Disclaimer
**Fichiers modifiés:** `src/components/Simulateurs.jsx`, `src/components/SimulationDisclaimer.tsx`

**Comment tester:**
1. Naviguer vers `/simulateurs` ou `/simulateur`
2. **Attendu:** Bannière jaune avec message "Résultat fourni à titre indicatif..."
3. Cliquer le bouton X (fermer)
4. **Attendu:** Bannière disparaît
5. Recharger la page
6. **Attendu:** Bannière ne réapparaît PAS
7. Console: `localStorage.removeItem('rcl_simulation_disclaimer_dismissed')`
8. Recharger
9. **Attendu:** Bannière réapparaît

---

### ✅ Test 3: Footer - Liens et Clarifications
**Fichiers modifiés:** `src/components/Footer.tsx`, `src/components/Footer.module.css`

**Comment tester:**
1. Scroller en bas de n'importe quelle page
2. **Attendu:** Voir le texte "RetraiteClair est un simulateur gratuit..."
3. **Attendu:** Voir le lien "Gestion des cookies"
4. **Attendu:** Voir le lien "Code source & méthodologie"
5. Cliquer "Gestion des cookies"
6. **Attendu:** Bannière cookie s'ouvre
7. Cliquer "Code source & méthodologie"
8. **Attendu:** Ouvre GitHub (ou 404 si repo pas encore créé)

---

### ✅ Test 4: Formules Open-Source
**Fichiers créés:** `src/utils/retraiteFormulas.js`

**Comment tester:**
1. Ouvrir `src/utils/retraiteFormulas.js`
2. **Vérifier:** Toutes les formules sont documentées avec JSDoc
3. Console navigateur:
   ```javascript
   import('./utils/retraiteFormulas.js').then(m => {
     console.log(m.calculerTauxLiquidation(160, 172)); // Devrait retourner ~0.925
     console.log(m.getTrimestresRequis(1975)); // Devrait retourner 172
   });
   ```
4. **Attendu:** Fonctions retournent des valeurs cohérentes

---

### ⚠️ Test 5: HTTPS Redirect (Local - Partiel)
**Fichiers modifiés:** `src/index.js`, `src/utils/forceHttps.js`

**Comment tester:**
1. Le redirect ne fonctionnera PAS en local (localhost)
2. **Vérifier:** Aucune erreur dans la console
3. **Vérifier:** Le code `forceHttps()` est appelé dans `src/index.js`

**Note:** Test complet uniquement sur Render (production)

---

### ⚠️ Test 6: Security Headers (Local - Impossible)
**Fichiers modifiés:** `render.yaml`, `public/_headers`

**Comment tester:**
- ❌ **Ne peut PAS être testé localement**
- Headers sont configurés côté serveur (Render)
- Test uniquement après déploiement sur Render

---

## Tests sur Render (Production)

### ✅ Test 7: HTTPS Redirect (Production)
**Après déploiement sur Render:**

1. Ouvrir `http://retraiteclair.onrender.com` (sans https)
2. **Attendu:** Redirection automatique vers `https://retraiteclair.onrender.com`
3. **Vérifier:** URL change en `https://`
4. **Vérifier:** Pas d'erreur de sécurité dans le navigateur

---

### ✅ Test 8: Security Headers (Production)
**Après déploiement sur Render:**

1. Aller sur https://securityheaders.com
2. Entrer: `https://retraiteclair.onrender.com`
3. **Attendu:** Score A ou A+
4. **Vérifier présence de:**
   - ✅ Strict-Transport-Security
   - ✅ X-Content-Type-Options: nosniff
   - ✅ X-Frame-Options: DENY
   - ✅ Content-Security-Policy
   - ✅ Referrer-Policy

**Alternative - DevTools:**
1. Ouvrir DevTools → Network
2. Recharger la page
3. Cliquer sur la requête principale (document)
4. Onglet "Headers" → "Response Headers"
5. **Vérifier:** Tous les headers de sécurité présents

---

### ✅ Test 9: CSP (Content Security Policy)
**Après déploiement:**

1. Ouvrir DevTools → Console
2. **Attendu:** Aucune erreur CSP (pas de violation)
3. Tester toutes les fonctionnalités:
   - ✅ Formulaires fonctionnent
   - ✅ Images s'affichent
   - ✅ Scripts se chargent
   - ✅ Pas d'erreur "Refused to load"

---

## Checklist Rapide

### Tests Locaux (Maintenant)
- [ ] Cookie banner apparaît au premier chargement
- [ ] Cookie banner disparaît après acceptation
- [ ] Cookie banner réapparaît via "Gestion des cookies"
- [ ] Simulation disclaimer apparaît sur `/simulateurs`
- [ ] Simulation disclaimer est dismissible
- [ ] Footer affiche le texte de clarification
- [ ] Footer a le lien "Gestion des cookies"
- [ ] Footer a le lien "Code source & méthodologie"
- [ ] Formules sont importables et fonctionnent

### Tests Production (Après déploiement)
- [ ] HTTPS redirect fonctionne (http → https)
- [ ] Security headers présents (vérifier avec securityheaders.com)
- [ ] CSP ne bloque aucune fonctionnalité
- [ ] Cookie banner fonctionne en production
- [ ] Simulation disclaimer fonctionne en production
- [ ] Tous les liens du footer fonctionnent

---

## Commandes Utiles pour Tester

```bash
# Démarrer le serveur local
npm start

# Nettoyer le localStorage (dans la console navigateur)
localStorage.clear()

# Vérifier les cookies (dans la console navigateur)
document.cookie

# Réinitialiser le disclaimer (dans la console navigateur)
localStorage.removeItem('rcl_simulation_disclaimer_dismissed')
```

---

## Problèmes Courants

### Cookie banner ne s'affiche pas
- Vérifier: `localStorage.getItem('rcl_cookie_consent')` est null
- Vérifier: `<CookieBanner />` est dans `App.js`

### Disclaimer ne s'affiche pas
- Vérifier: Vous êtes sur `/simulateurs`
- Vérifier: `<SimulationDisclaimer />` est dans `Simulateurs.jsx`
- Vérifier: `localStorage.getItem('rcl_simulation_disclaimer_dismissed')` est null

### Headers ne s'affichent pas
- Normal en local, test uniquement sur Render
- Vérifier: `render.yaml` est bien déployé
- Vérifier: Render a bien lu le fichier `render.yaml`


