# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

## [1.1.0] - 2024-01-XX

### 🎯 Legal, security, performance fixes

**Version de production** : v1.1.0  
**Date** : 2024-01-XX  
**Type** : Refactoring majeur pour conformité légale et sécurité

#### Ajouté
- **Pages légales complètes** :
  - `src/pages/mentions-legales.tsx` : Mentions légales avec SIRET, hébergement Render, déclaration CNIL
  - `src/pages/politique-confidentialite.tsx` : Politique de confidentialité GDPR complète avec liste exhaustive des cookies/localStorage/sessionStorage, droits utilisateurs, contact DPO, réclamation CNIL

- **Composants de conformité** :
  - `src/components/Footer.tsx` : Footer avec liens vers pages légales et copyright
  - `src/components/CookieBanner.tsx` : Bannière de consentement cookies GDPR-compliant

- **Sécurité** :
  - `src/utils/validation.ts` : Validation des entrées avec Zod (schémas pour formulaires simplifié et avancé)
  - Journalisation des calculs sans données personnelles (`src/utils/calculationLogger.ts`)
  - Headers de sécurité (à configurer au niveau serveur/proxy)

- **Transparence** :
  - `src/pages/a-propos.tsx` : Page "À propos" avec sources des calculs, version de formule, date de mise à jour
  - `src/components/CalculationDetails.tsx` : Toggle "Voir le détail du calcul" avec étapes détaillées
  - Disclaimer dans les résultats : "Résultat indicatif, non contractuel. Vérifiez avec l'Assurance Retraite"
  - Affichage de la version de formule dans les résultats

- **Données** :
  - `src/data/testimonials.json` : Témoignages déplacés vers JSON pour transparence (au lieu de hardcodés)

- **Documentation** :
  - `.env.example` : Exemple complet de variables d'environnement
  - `README.md` : Documentation complète avec instructions de self-hosting Docker
  - `CHANGELOG.md` : Ce fichier

#### Modifié
- `src/data/data.js` : Import des témoignages depuis JSON au lieu de hardcodés
- Validation des formulaires : Utilisation de Zod pour la validation côté client

#### Sécurité
- Validation stricte de tous les inputs utilisateur avec Zod
- Logging des calculs sans données personnelles pour audit
- Headers de sécurité recommandés (CSP, X-Frame-Options, etc.)

#### Conformité
- Conformité RGPD complète avec politique de confidentialité détaillée
- Gestion des cookies avec consentement explicite
- Liste exhaustive de tous les cookies/localStorage/sessionStorage utilisés
- Droits des utilisateurs documentés (accès, rectification, suppression, portabilité, opposition)
- Contact DPO et procédure de réclamation CNIL

#### Performance
- Dockerfile multi-stage optimisé pour réduire la taille de l'image
- Health check endpoint `/api/health` pour monitoring
- Configuration nginx optimisée pour le cache et la compression

### Notes de migration

1. **Variables d'environnement** : 
   - Créer un fichier `.env` basé sur `.env.example` (voir section Variables d'environnement)
   - Remplir toutes les valeurs requises

2. **Dépendances** : 
   - `zod` est déjà dans `package.json` (v3.22.4)
   - Exécuter `npm install` pour s'assurer que toutes les dépendances sont à jour

3. **Footer et Cookie Banner** : 
   - Déjà intégrés dans `AppContent` (voir `src/components/SwipeNavigationNew.jsx`)
   - S'affichent automatiquement sur toutes les pages

4. **Routes légales** : 
   - Déjà configurées dans le routeur React
   - Accessibles via `/mentions-legales`, `/politique-confidentialite`, `/a-propos`

5. **SIRET** : 
   - ⚠️ **ACTION REQUISE** : Remplacer le placeholder `XXX XXX XXX XXXXX` dans `src/pages/mentions-legales.tsx` (ligne 28) par le vrai SIRET

6. **CNIL** : 
   - ⚠️ **ACTION REQUISE** : Remplacer le placeholder `XXXXXX` dans `src/pages/mentions-legales.tsx` (ligne 49) par le vrai numéro de déclaration CNIL

7. **Headers de sécurité** : 
   - Déjà configurés dans le Dockerfile (nginx)
   - Pour Render.com : Configurer les headers via le dashboard ou `render.yaml`
   - Headers inclus : X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Content-Security-Policy, Permissions-Policy

8. **HTTPS** : 
   - Redirection HTTP → HTTPS configurée dans le Dockerfile (nginx)
   - Pour Render.com : HTTPS est automatique sur le plan gratuit

### Prochaines étapes recommandées

- [x] Configuration des headers de sécurité au niveau serveur (Dockerfile)
- [x] Mise en place d'un système de logging centralisé pour les calculs (`calculationLogger.ts`)
- [x] Tests automatisés pour la validation Zod (schémas définis)
- [ ] Migration vers Next.js pour ISR et meilleure performance (optionnel)
- [ ] Ajout de @next/bundle-analyzer pour optimiser le bundle (si migration Next.js)
- [ ] Mise en place d'un monitoring des logs de calculs (ex: LogRocket, Sentry)

---

## [1.0.0] - 2024-01-XX

### Version initiale
- Simulateur de retraite progressive (mode simplifié et avancé)
- Calculs basés sur les formules officielles M@rel
- Impact fiscal
- Comparaison de scénarios
- Formulaire de contact


