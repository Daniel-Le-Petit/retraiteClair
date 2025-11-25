# Étapes manuelles à effectuer après le refactoring

## 🔴 Actions critiques (à faire avant déploiement)

### 1. Installer les dépendances
```bash
npm install zod
```

### 2. Intégrer les nouveaux composants dans App.js

Ajoutez le Footer et CookieBanner dans `src/App.js` :

```jsx
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <Router>
      <BackgroundImage />
      <CookieBanner />
      <AppContent />
      <Footer />
    </Router>
  );
}
```

### 3. Ajouter les routes légales dans SwipeNavigationNew.jsx

Dans `src/components/SwipeNavigationNew.jsx`, ajoutez les imports et routes :

```jsx
import MentionsLegales from '../pages/mentions-legales';
import PolitiqueConfidentialite from '../pages/politique-confidentialite';
import APropos from '../pages/a-propos';

// Dans AppContent, ajouter :
<Route path="/mentions-legales" element={<MentionsLegales />} />
<Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
<Route path="/a-propos" element={<APropos />} />
```

### 4. Intégrer CalculationDetails dans ResultsPage.jsx

Dans `src/components/ResultsPage.jsx` :

```jsx
import CalculationDetails from './CalculationDetails';

// Dans le render, après les tabs, ajouter :
<CalculationDetails 
  calculationData={data} 
  formulaVersion={process.env.REACT_APP_FORMULA_VERSION || '1.0.0'} 
/>
```

### 5. Ajouter la validation Zod dans les formulaires

Dans `src/components/SimplifieForm.jsx` et `src/components/AvanceFormMultiStep.jsx`, 
ajoutez la validation avant soumission :

```jsx
import { validateSimplifiedForm, validateAdvancedForm } from '../utils/validation';

// Dans handleSubmit :
const validation = mode === 'simplifie' 
  ? validateSimplifiedForm(formData)
  : validateAdvancedForm(formData);

if (!validation.success) {
  // Afficher les erreurs
  setErrors(validation.errors);
  return;
}
```

### 6. Ajouter le logging des calculs

Dans `src/components/Simulateurs.jsx`, après `calculateRetraiteProgressive` :

```jsx
import { logCalculation } from '../utils/calculationLogger';

// Après le calcul :
logCalculation({
  timestamp: new Date().toISOString(),
  mode: mode,
  parameters: {
    tempsPartiel: data.tempsPartiel,
    age: data.age,
    hasTrimestres: !!data.trimestres,
    hasSam: !!data.sam,
    hasPensionComplete: !!data.pensionComplete,
    hasRevenusComplementaires: !!data.revenusComplementaires
  },
  results: {
    totalNet: results.revenusNets.total,
    salaireNetTempsPartiel: results.revenusNets.tempsPartiel,
    pensionProgressiveNet: results.revenusNets.pension,
    impactFiscal: results.impactFiscal
  },
  formulaVersion: process.env.REACT_APP_FORMULA_VERSION || '1.0.0'
});
```

## 🟡 Actions importantes (à faire avant production)

### 7. Remplacer les placeholders SIRET et CNIL

Dans `src/pages/mentions-legales.tsx` :
- Remplacer `XXX XXX XXX XXXXX` par votre vrai SIRET
- Remplacer `XXXXXX` par votre vrai numéro de déclaration CNIL

### 8. Configurer les variables d'environnement

Créer `.env` à partir de `.env.example` et remplir :
- `REACT_APP_FORMULA_VERSION=1.0.0`
- `REACT_APP_EMAILJS_*` (si vous utilisez EmailJS)
- `REACT_APP_GA_MEASUREMENT_ID` (optionnel)

### 9. Configurer les headers de sécurité

#### Sur Render.com :
Ajoutez un fichier `_headers` dans `public/` (déjà créé) ou configurez via le dashboard Render.

#### Sur nginx (si vous utilisez votre propre serveur) :
Le Dockerfile inclut déjà la configuration nginx avec les headers.

#### Sur Netlify :
Le fichier `public/_headers` sera automatiquement utilisé.

### 10. Tester le cookie banner

1. Ouvrir le site en navigation privée
2. Vérifier que la bannière s'affiche
3. Tester "Accepter" et vérifier que les cookies analytiques se chargent
4. Tester "Refuser" et vérifier que les cookies ne se chargent pas
5. Vérifier que le choix est mémorisé (ne plus afficher la bannière après)

### 11. Vérifier les liens du footer

Tester que tous les liens du footer fonctionnent :
- Mentions légales
- Politique de confidentialité

## 🟢 Actions optionnelles (améliorations futures)

### 12. Migration vers Next.js

Pour bénéficier de l'ISR et d'une meilleure performance, considérer la migration vers Next.js (voir `GUIDE_MIGRATION_SSR.md`).

### 13. Ajouter @next/bundle-analyzer

Si vous migrez vers Next.js, ajouter l'analyseur de bundle pour optimiser la taille.

### 14. Mise en place d'un système de logging centralisé

Actuellement, les logs de calculs vont dans la console. Pour la production, considérer :
- Un service de logging (LogRocket, Sentry, etc.)
- Un endpoint API pour recevoir les logs
- Un système de monitoring (Datadog, New Relic, etc.)

### 15. Tests automatisés pour la validation Zod

Ajouter des tests unitaires pour vérifier que la validation Zod fonctionne correctement.

## ✅ Checklist de déploiement

- [ ] `npm install zod` exécuté
- [ ] Footer et CookieBanner intégrés dans App.js
- [ ] Routes légales ajoutées dans le routeur
- [ ] CalculationDetails intégré dans ResultsPage
- [ ] Validation Zod ajoutée dans les formulaires
- [ ] Logging des calculs ajouté
- [ ] SIRET et CNIL remplacés par les vrais numéros
- [ ] Variables d'environnement configurées
- [ ] Headers de sécurité configurés
- [ ] Cookie banner testé
- [ ] Liens du footer testés
- [ ] Build de production testé localement
- [ ] Déploiement sur Render testé

## 📝 Notes

- Les fichiers TypeScript (`.tsx`, `.ts`) peuvent nécessiter une configuration TypeScript si vous n'en avez pas déjà. Pour l'instant, React Scripts devrait les gérer.
- Si vous rencontrez des erreurs TypeScript, vous pouvez renommer les fichiers en `.jsx`/`.js` ou ajouter un `tsconfig.json` basique.
- Le cookie banner bloque Google Analytics jusqu'à consentement. Assurez-vous que votre code GA respecte cela.






