# Checklist de Vérification - Refactoring v1.1.0

## 🔍 Vérifications Critiques à Effectuer

### 1. ✅ Conformité Légale

#### Footer visible sur toutes les pages
- [ ] Ouvrir chaque page du site (Accueil, Simulateur, Blog, Contact, etc.)
- [ ] Vérifier que le footer est visible en bas de chaque page
- [ ] Vérifier que le footer contient :
  - [ ] Lien "Mentions légales"
  - [ ] Lien "Politique de confidentialité"
  - [ ] Copyright "© 2024 RetraiteClair – Tous droits réservés"

#### Pages légales accessibles
- [ ] Cliquer sur "Mentions légales" dans le footer
- [ ] Vérifier que la page s'affiche correctement
- [ ] Vérifier que la page contient :
  - [ ] SIRET (actuellement placeholder : `XXX XXX XXX XXXXX`)
  - [ ] Adresse : "10 rue du Test, 75000 Paris"
  - [ ] Email : contact@retraiteclair.fr
  - [ ] Hébergement : "Render Inc., 525 Brannan St, San Francisco, CA 94107, USA"
  - [ ] CNIL : "En cours – Déclaration n° XXXXXX"

- [ ] Cliquer sur "Politique de confidentialité" dans le footer
- [ ] Vérifier que la page s'affiche correctement
- [ ] Vérifier que la page liste TOUS les cookies/localStorage :
  - [ ] retraiteClair_cookieConsent
  - [ ] retraiteClair_cookieConsentDate
  - [ ] consent-given
  - [ ] consent-date
  - [ ] retraiteClair_personalInfo
  - [ ] retraiteClair_data
  - [ ] Cookies Google Analytics (_ga, _gid, _gat)
  - [ ] Cookies Meta Pixel (fbq)
  - [ ] sessionStorage items (simulatorScrollPosition, blogArticleOrigin)

#### Page "À propos"
- [ ] Accéder à `/a-propos` (ou via le menu si disponible)
- [ ] Vérifier que la page s'affiche correctement
- [ ] Vérifier que la page contient :
  - [ ] Sources des calculs (Code de la sécurité sociale, M@rel, etc.)
  - [ ] Version de la formule affichée
  - [ ] Date de dernière mise à jour

---

### 2. 🍪 Gestion des Cookies (CRITIQUE)

#### Cookie Banner
- [ ] Ouvrir le site en navigation privée (ou supprimer les cookies)
- [ ] Vérifier que la bannière de cookies s'affiche en bas de la page
- [ ] Vérifier que la bannière contient :
  - [ ] Message expliquant l'utilisation des cookies
  - [ ] Lien vers la politique de confidentialité
  - [ ] Bouton "Accepter"
  - [ ] Bouton "Refuser"

#### Test Acceptation des cookies
1. Cliquer sur "Accepter"
2. Vérifier que la bannière disparaît
3. Ouvrir les DevTools (F12) → Onglet "Network"
4. Recharger la page
5. Vérifier que les scripts suivants se chargent :
   - [ ] `https://www.googletagmanager.com/gtag/js?id=G-9WF389CM13`
   - [ ] `https://connect.facebook.net/en_US/fbevents.js`
6. Vérifier dans l'onglet "Application" → "Cookies" :
   - [ ] Cookies `_ga`, `_gid` sont créés (Google Analytics)
   - [ ] Cookies Meta Pixel sont créés

#### Test Refus des cookies
1. Supprimer tous les cookies et localStorage
2. Recharger la page
3. Cliquer sur "Refuser"
4. Vérifier que la bannière disparaît
5. Ouvrir les DevTools → Onglet "Network"
6. Recharger la page
7. Vérifier que les scripts suivants NE se chargent PAS :
   - [ ] Google Analytics ne se charge pas
   - [ ] Meta Pixel ne se charge pas
8. Vérifier dans l'onglet "Application" → "Cookies" :
   - [ ] Aucun cookie analytique n'est créé

#### Vérification localStorage
- [ ] Ouvrir DevTools → Application → Local Storage
- [ ] Vérifier que les clés suivantes existent après acceptation :
  - [ ] `retraiteClair_cookieConsent` = "accepted"
  - [ ] `retraiteClair_cookieConsentDate` = date ISO
  - [ ] `consent-given` = "true"
  - [ ] `consent-date` = date ISO

---

### 3. 🔒 Sécurité

#### Headers de sécurité (si déployé avec Docker)
- [ ] Déployer avec Docker ou vérifier sur Render.com
- [ ] Ouvrir DevTools → Network → Sélectionner une requête
- [ ] Vérifier dans "Response Headers" :
  - [ ] `X-Frame-Options: DENY`
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `Referrer-Policy: strict-origin-when-cross-origin`
  - [ ] `Content-Security-Policy` est présent (vérifier qu'il ne contient pas `'unsafe-inline'` pour scripts)

#### HTTPS
- [ ] Vérifier que le site redirige automatiquement HTTP → HTTPS
- [ ] Tester : `http://votre-domaine.com` → doit rediriger vers `https://`

#### Health Check
- [ ] Tester l'endpoint : `https://votre-domaine.com/api/health`
- [ ] Vérifier que la réponse est : `{"status":"ok","timestamp":"..."}`

---

### 4. ✅ Validation des Formulaires

#### Simulateur - Mode Simplifié
1. Aller sur le simulateur
2. Essayer de soumettre avec des valeurs invalides :
   - [ ] Salaire brut = -100 → Doit afficher une erreur
   - [ ] Salaire brut = 200000 → Doit afficher une erreur (max 100000)
   - [ ] Temps partiel = 30% → Doit afficher une erreur (min 40%)
   - [ ] Temps partiel = 90% → Doit afficher une erreur (max 80%)
   - [ ] Âge = 50 → Doit afficher une erreur (min 55)
   - [ ] Âge = 75 → Doit afficher une erreur (max 70)

#### Simulateur - Mode Avancé
1. Passer en mode avancé
2. Essayer de soumettre avec des valeurs invalides :
   - [ ] Trimestres = 100 → Doit afficher une erreur (min 150)
   - [ ] Trimestres = 250 → Doit afficher une erreur (max 200)
   - [ ] SAM = -1000 → Doit afficher une erreur
   - [ ] SAM = 60000 → Doit afficher une erreur (max 50000)

#### Messages d'erreur
- [ ] Vérifier que les messages d'erreur sont clairs et en français
- [ ] Vérifier que les erreurs s'affichent correctement dans l'interface

---

### 5. 📊 Transparence des Calculs

#### Détail du calcul dans les résultats
1. Effectuer une simulation valide
2. Aller sur la page des résultats
3. Vérifier la présence de :
   - [ ] Bouton/toggle "Voir le détail du calcul"
4. Cliquer sur le toggle
5. Vérifier que s'affichent :
   - [ ] Calcul du salaire net temps partiel (étapes détaillées)
   - [ ] Calcul de la pension progressive (étapes détaillées)
   - [ ] Calcul du revenu total net
   - [ ] Calcul de l'impact fiscal (si applicable)
   - [ ] Version de la formule affichée (ex: "Formule v1.0.0 – 2024/01")

#### Disclaimer
- [ ] Vérifier que le disclaimer est visible : "⚠️ Résultat indicatif, non contractuel. Vérifiez avec l'Assurance Retraite"
- [ ] Vérifier que le lien vers https://www.lassuranceretraite.fr fonctionne

---

### 6. 📝 Logging des Calculs

#### Vérification des logs
1. Ouvrir DevTools → Console
2. Effectuer une simulation
3. Vérifier dans la console :
   - [ ] Un log JSON apparaît avec le format :
     ```json
     {
       "type": "calculation",
       "timestamp": "...",
       "mode": "simplifie" ou "avance",
       "parameters": { ... },
       "results": { ... },
       "formulaVersion": "1.0.0"
     }
     ```
   - [ ] Le log ne contient AUCUNE donnée personnelle (pas de nom, email, etc.)
   - [ ] Seulement des paramètres anonymisés (temps partiel, âge, etc.)

---

### 7. 🎨 Interface Utilisateur

#### Footer
- [ ] Vérifier que le footer est bien stylé
- [ ] Vérifier que les liens sont cliquables
- [ ] Vérifier que le footer est responsive (mobile/desktop)

#### Cookie Banner
- [ ] Vérifier que le banner est bien stylé
- [ ] Vérifier que le banner est responsive
- [ ] Vérifier que le banner ne cache pas le contenu important

#### Pages légales
- [ ] Vérifier que les pages légales sont lisibles
- [ ] Vérifier que les sections sont bien formatées
- [ ] Vérifier que les liens fonctionnent

---

### 8. 🔧 Actions Manuelles Requises

#### Variables d'environnement
- [ ] Créer le fichier `.env` basé sur `.env.example`
- [ ] Remplir les valeurs :
  - [ ] `REACT_APP_FORMULA_VERSION=1.0.0`
  - [ ] `REACT_APP_EMAILJS_PUBLIC_KEY` (votre clé)
  - [ ] `REACT_APP_EMAILJS_SERVICE_ID` (votre service ID)
  - [ ] `REACT_APP_EMAILJS_TEMPLATE_ID` (votre template ID)

#### SIRET et CNIL
- [ ] **IMPORTANT** : Remplacer `XXX XXX XXX XXXXX` par le vrai SIRET dans `src/pages/mentions-legales.tsx` (ligne 30)
- [ ] **IMPORTANT** : Remplacer `XXXXXX` par le vrai numéro CNIL dans `src/pages/mentions-legales.tsx` (ligne 51)

#### Adresse (si différente)
- [ ] Vérifier que l'adresse "10 rue du Test, 75000 Paris" est correcte
- [ ] Modifier si nécessaire dans `src/pages/mentions-legales.tsx` (ligne 31)

---

### 9. 🚀 Déploiement

#### Build de production
- [ ] Exécuter `npm run build`
- [ ] Vérifier qu'il n'y a pas d'erreurs
- [ ] Vérifier que le build se termine avec succès

#### Test Docker (optionnel)
- [ ] Build l'image : `docker build -t retraiteclair:latest .`
- [ ] Lancer le conteneur : `docker run -p 3000:80 retraiteclair:latest`
- [ ] Tester : `http://localhost:3000`
- [ ] Vérifier le health check : `http://localhost:3000/api/health`

#### Déploiement Render.com
- [ ] Vérifier que les variables d'environnement sont configurées
- [ ] Vérifier que le déploiement se fait sans erreur
- [ ] Tester le site en production
- [ ] Vérifier que HTTPS fonctionne
- [ ] Vérifier que les headers de sécurité sont présents (si configurés)

---

### 10. 🐛 Tests Fonctionnels

#### Navigation
- [ ] Tester toutes les pages du site
- [ ] Vérifier que la navigation fonctionne
- [ ] Vérifier que les liens internes fonctionnent

#### Simulateur
- [ ] Tester une simulation complète (mode simplifié)
- [ ] Tester une simulation complète (mode avancé)
- [ ] Vérifier que les résultats s'affichent correctement
- [ ] Vérifier que le détail du calcul s'affiche

#### Formulaire de contact
- [ ] Tester l'envoi d'un message
- [ ] Vérifier que l'email est bien envoyé (si EmailJS configuré)

---

## ⚠️ Points d'Attention Spéciaux

1. **Cookie Banner** : C'est le point le plus critique pour la conformité RGPD. Vérifiez bien que les scripts ne se chargent PAS avant le consentement.

2. **SIRET et CNIL** : Ces placeholders DOIVENT être remplacés avant la mise en production.

3. **Headers de sécurité** : Si vous n'utilisez pas Docker, vous devrez configurer les headers sur Render.com ou votre serveur.

4. **Logs de calcul** : En production, vérifiez que les logs apparaissent bien dans les logs serveur (stdout), pas seulement dans la console du navigateur.

---

## 📋 Résumé des Fichiers Modifiés

- `src/pages/mentions-legales.tsx` - ⚠️ À compléter (SIRET, CNIL)
- `src/pages/politique-confidentialite.tsx` - ✅ Complet
- `src/pages/a-propos.tsx` - ✅ Complet
- `src/components/Footer.tsx` - ✅ Complet
- `src/components/CookieBanner.tsx` - ✅ Complet
- `src/components/CalculateurAvance.js` - ✅ Validation Zod + Logging
- `src/components/ResultsPage.jsx` - ✅ CalculationDetails intégré
- `src/components/SwipeNavigationNew.jsx` - ✅ Footer + CookieBanner intégrés
- `public/index.html` - ✅ Scripts bloqués jusqu'au consentement
- `Dockerfile` - ✅ Headers de sécurité + HTTPS redirect
- `package.json` - ✅ TypeScript ajouté
- `tsconfig.json` - ✅ Créé
- `src/types/global.d.ts` - ✅ Créé
- `src/types/components.d.ts` - ✅ Créé

---

**Date de vérification** : _______________  
**Vérifié par** : _______________  
**Statut** : ⬜ En attente / ⬜ En cours / ⬜ Complété

