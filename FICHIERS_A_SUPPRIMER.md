# Fichiers à supprimer pour libérer de l'espace

## 🗑️ CATÉGORIE 1 : Dossiers volumineux (peuvent être régénérés)

### `node_modules/` ⚠️ TRÈS VOLUMINEUX
- **Taille estimée** : 200-500 MB
- **Action** : Supprimer, puis régénérer avec `npm install` si besoin
- **Note** : Peut être recréé à tout moment

### `build/` ⚠️ VOLUMINEUX
- **Taille estimée** : 50-200 MB
- **Action** : Supprimer, régénéré avec `npm run build`
- **Note** : Fichiers de production compilés

---

## 📝 CATÉGORIE 2 : Fichiers de documentation/notes (non nécessaires au fonctionnement)

### Fichiers .md de documentation technique (peuvent être archivés ailleurs)
- `ACCORDEON_PER_IPHONE.md`
- `AMELIORATIONS_IMPLIQUEES.md`
- `AMELIORATIONS_SITE_IMMEDIATES.md`
- `ARTICLES_PILOTES.md`
- `BUSINESS_PLAN_RETRAITECLAIR.md`
- `CALCULATEUR_FISCAL_INTEGRE.md`
- `CAMPAGNES_LINKEDIN_ADS.md`
- `CONFIGURATION_EMAIL_SIMULATION.md`
- `CONFIGURATION_EMAILJS_RAPIDE.md`
- `CONFIGURATION_TEMPLATE_EMAILJS.md`
- `CONTENU_FISCAL_ENRICHI.md`
- `CONTENU_PER_DEPLOYE.md`
- `CORRECTION_ACCORDEONS_IPHONE.md`
- `CORRECTION_LOGO_AFFICHAGE.md`
- `CORRECTION_LOGO_MOBILE.md`
- `DEPANNAGE_EMAILJS_422.md`
- `DEPANNAGE_SERVICE_ID_400.md`
- `ECOSYSTEME_CONTENU_COMPLET.md`
- `EMAILJS_CONFIGURED.md`
- `EMAILJS_SETUP.md`
- `GOOGLE_SEARCH_CONSOLE_SETUP.md`
- `GSC_CONFIGURATION_RESUME.md`
- `GUIDE_CREATION_INFOGRAPHIES_CANVA.md`
- `GUIDE_DEBUG_TAG_ASSISTANT.md`
- `GUIDE_FACEBOOK_RETRAITECLAIR.md`
- `GUIDE_META_PIXEL_RGPD.md`
- `GUIDE_MIGRATION_SSR.md`
- `GUIDE_OPTIMISATION_LINKEDIN.md`
- `GUIDE_TEST_GA4_SPA.md`
- `GUIDE_TEST_TAG_ASSISTANT.md`
- `GUIDE_VISUEL_FACEBOOK.md`
- `guide-tests-simulateur.md`
- `GUIDE-VERIFICATION-TESTS.md`
- `LOGO_INTEGRATION.md`
- `MONITORING_SEO_GUIDE.md`
- `NETTOYAGE_IMPORTS_RESUME.md`
- `PLAN_ACTION_FACEBOOK.md`
- `PLAN_PROMOTION_LINKEDIN_BLOG.md`
- `PRE_DEPLOYMENT_CHECKLIST.md`
- `RESOLUTION_FINALE_TAG_ASSISTANT.md`
- `RESOLUTION_TAG_ASSISTANT.md`
- `RESUME_CHANGEMENTS_HEAD.md`
- `RGPD_IMPLEMENTATION_COMPLETE.md`
- `SEO_MONITORING_GUIDE.md`
- `SERVICE_ID_MIS_A_JOUR.md`
- `SOLUTION_ACCORDEONS_SIMPLE.md`
- `SOLUTION_GA4_SPA.md`
- `SOLUTION_MOBILE.md`
- `STATUT_SEO_GOOGLE.md`
- `STRATEGIE_CONTENT_MARKETING.md`
- `STRATEGIES_MARKETING_DIGITAL.md`
- `STYLE_CHAMP_SALAIRE.md`
- `SUPPRESSION_VALEURS_DEFAUT.md`
- `TEMPLATE_EMAILJS_AMELIORE.md`
- `TEMPLATES_INFOGRAPHIES_DETAILLES.md`
- `TEMPLATES_POSTS_FACEBOOK.md`
- `TEMPLATES_POSTS_LINKEDIN.md`
- `TEST_ACCORDEONS_IPHONE.md`
- `TEST_BOUTONS_ACCORDEONS.md`
- `test-calculs-simulateur.md`
- `VERIFICATION_META_PIXEL.md`

**Total estimé** : ~5-10 MB

---

## 🧪 CATÉGORIE 3 : Fichiers de test et debug

- `debug-emailjs.html`
- `test-automation.js`
- `test-interface.html`
- `test-logo.html`
- `test-manual.js`
- `setup-tests.js`
- `view-test-results.js`
- `manual-test-report.json`
- `seo-report.json`
- `package-test.json`
- `Testing/` (dossier entier avec images de test)

**Total estimé** : ~2-5 MB

---

## 📊 CATÉGORIE 4 : Fichiers d'export et logs

- `export/` (dossier entier - fichiers CSV)
- `git.log`
- `Simulation - valeurs a saisir.txt`

**Total estimé** : ~1-2 MB

---

## 🎨 CATÉGORIE 5 : Assets non utilisés

- `FR-flag.png` (si non utilisé dans le site)
- `Post LinkedIn - Réforme des retraites.pptx` (fichier PowerPoint)
- `readme_retraiteClair.txt` (doublon avec README.md ?)

**Total estimé** : ~1-5 MB

---

## ⚙️ CATÉGORIE 6 : Scripts et fichiers de configuration multiples

### Scripts PowerShell (garder seulement ceux utilisés)
- `monitoring-seo.js`
- `monitoring-seo.ps1`
- `mynpmstart.ps1`
- `deploy.ps1` (garder si utilisé pour déploiement)

### Fichiers de configuration de déploiement (garder seulement celui utilisé)
- `netlify.toml` (si vous utilisez Netlify)
- `vercel.json` (si vous utilisez Vercel)
- `render.yaml` (si vous utilisez Render)

**Note** : Garder seulement le fichier de configuration du service que vous utilisez réellement

**Total estimé** : ~0.5-1 MB

---

## 📋 RÉSUMÉ PAR PRIORITÉ

### 🔴 PRIORITÉ HAUTE (libère le plus d'espace)
1. **`node_modules/`** - 200-500 MB ⚠️
2. **`build/`** - 50-200 MB ⚠️

### 🟡 PRIORITÉ MOYENNE (libère de l'espace, fichiers non essentiels)
3. **Tous les fichiers .md de documentation** - 5-10 MB
4. **Dossier `Testing/`** - 1-2 MB
5. **Dossier `export/`** - 1-2 MB

### 🟢 PRIORITÉ BASSE (peu d'espace mais peut être nettoyé)
6. **Fichiers de test/debug** - 2-5 MB
7. **Assets non utilisés** - 1-5 MB
8. **Scripts et configs multiples** - 0.5-1 MB

---

## 💾 ESPACE TOTAL LIBÉRABLE

**Estimation totale** : **260-725 MB** (principalement node_modules et build)

---

## ⚠️ AVANT DE SUPPRIMER

1. **Sauvegarder les fichiers .md importants** dans un dossier d'archive ailleurs
2. **Vérifier que `node_modules` peut être régénéré** (avoir `package.json` et `package-lock.json`)
3. **Garder au moins un fichier de configuration de déploiement** (celui que vous utilisez)

---

## 🔄 APRÈS SUPPRESSION

Pour régénérer si besoin :
```bash
npm install          # Recrée node_modules
npm run build        # Recrée build/
```




