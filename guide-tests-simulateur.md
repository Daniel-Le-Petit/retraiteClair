# Guide d'Exécution des Tests - Simulateur Retraite Progressive

## Préparation

### 1. Démarrer l'application
```bash
# Dans le terminal, à la racine du projet
npm start
```

### 2. Ouvrir l'application
- Aller sur `http://localhost:3000` (ou le port affiché)
- Naviguer vers la page Simulateur

## Tests Manuels - Mode Simplifié

### Test 1: Cas Standard
**Étapes :**
1. Aller dans l'onglet "Saisie"
2. Saisir les données :
   - Salaire brut : `5000`
   - Temps partiel : `60%`
   - Début retraite : `2025-01-01`
   - Surcote/décote : `0%`
3. Aller dans l'onglet "Résultats"
4. **Vérifier les résultats attendus :**
   - Salaire net : `3900€`
   - Pension complète : `1755€`
   - Pension progressive : `702€`
   - Salaire partiel : `3000€`
   - Revenu total : `3702€`

### Test 2: Avec Décote
**Étapes :**
1. Modifier les données :
   - Salaire brut : `4000`
   - Temps partiel : `50%`
   - Surcote/décote : `-5%`
2. **Vérifier les résultats attendus :**
   - Salaire net : `3120€`
   - Pension complète : `1404€`
   - Pension progressive : `533.52€`
   - Salaire partiel : `2000€`
   - Revenu total : `2533.52€`

### Test 3: Avec Pension Fournie
**Étapes :**
1. Modifier les données :
   - Salaire brut : `6000`
   - Temps partiel : `70%`
   - Pension estimée : `2000`
   - Surcote/décote : `+2%`
2. **Vérifier les résultats attendus :**
   - Salaire net : `4680€`
   - Pension complète : `2000€`
   - Pension progressive : `816€`
   - Salaire partiel : `4200€`
   - Revenu total : `5016€`

## Tests Manuels - Mode Avancé

### Test 4: Calcul M@rel
**Étapes :**
1. Activer le mode avancé
2. Saisir les données :
   - Salaire brut : `5500`
   - Temps partiel : `60%`
   - Salaire annuel moyen : `66000`
   - Trimestres validés : `150`
   - Année de naissance : `1970`
   - Surcote/décote : `0%`
3. **Vérifier les résultats attendus :**
   - Salaire net : `4290€`
   - Trimestres requis : `166`
   - Taux pension : `0.9036`
   - Pension complète : `2484.9€`
   - Pension progressive : `993.96€`
   - Salaire partiel : `3300€`
   - Revenu total : `4293.96€`

## Tests Manuels - Scénarios

### Test 5: Scénario 40%
**Étapes :**
1. Aller dans l'onglet "Scénarios"
2. Vérifier le scénario 40% :
   - Salaire partiel : `1560€`
   - Pension progressive : `977.34€`
   - Revenu total : `2537.34€`
   - Perte revenu : `1362.66€`

### Test 6: Scénario 60% avec Maintien
**Étapes :**
1. Activer "Maintien des cotisations à 100%"
2. Vérifier le scénario 60% :
   - Salaire partiel : `2560€`
   - Pension progressive : `977.34€`
   - Revenu total : `3537.34€`

### Test 7: Scénario 80%
**Étapes :**
1. Vérifier le scénario 80% :
   - Salaire partiel : `2496€`
   - Pension progressive : `781.87€`
   - Revenu total : `3277.87€`
   - Perte revenu : `-157.87€` (gain!)

## Tests d'Interface

### Test Responsive
1. **Desktop** : Vérifier l'affichage normal
2. **Tablette** : Redimensionner la fenêtre (768px-1024px)
3. **Mobile** : Redimensionner la fenêtre (<768px)
   - Vérifier que les scénarios s'affichent verticalement
   - Vérifier les couleurs des barres (rouge, bleu, vert, gris)

### Test Navigation
1. **Onglet Saisie** : Vérifier la saisie des données
2. **Onglet Résultats** : Vérifier l'affichage des calculs
3. **Onglet Scénarios** : Vérifier les graphiques et comparaisons

### Test Sauvegarde
1. Saisir des données
2. Rafraîchir la page (F5)
3. Vérifier que les données sont conservées

## Tests Automatisés (Optionnel)

### Script de Test Automatique
```javascript
// Créer un fichier test-automation.js
const testCases = [
  {
    name: "Mode Simplifié Standard",
    data: { salaireBrut: 5000, tempsPartiel: 60, surcoteDecote: 0 },
    expected: { salaireNet: 3900, pensionProgressive: 702, revenuTotal: 3702 }
  },
  // ... autres cas de test
];

// Fonction pour tester automatiquement
function runAutomatedTests() {
  testCases.forEach(testCase => {
    console.log(`Testing: ${testCase.name}`);
    // Logique de test automatique
  });
}
```

## Checklist de Validation

### ✅ Calculs
- [ ] Tous les calculs sont corrects (±1€ de tolérance)
- [ ] Mode simplifié fonctionne
- [ ] Mode avancé fonctionne
- [ ] Scénarios calculés correctement
- [ ] Surcotes/décotes appliquées

### ✅ Interface
- [ ] Navigation entre onglets
- [ ] Affichage desktop
- [ ] Affichage tablette
- [ ] Affichage mobile
- [ ] Couleurs des barres
- [ ] Graphiques des scénarios

### ✅ Fonctionnalités
- [ ] Sauvegarde des données
- [ ] Validation des champs
- [ ] Messages d'erreur
- [ ] Maintien des cotisations
- [ ] Mode avancé/simplifié

### ✅ Performance
- [ ] Pas d'erreurs JavaScript
- [ ] Chargement rapide
- [ ] Responsive fluide
- [ ] Calculs instantanés

## Rapport de Test

### Template de Rapport
```
Date: [DATE]
Testeur: [NOM]
Version: [VERSION]

Résultats:
- Tests réussis: X/7
- Tests échoués: X/7
- Problèmes identifiés: [LISTE]
- Recommandations: [LISTE]

Statut: ✅ PRÊT POUR DÉPLOIEMENT / ❌ CORRECTIONS NÉCESSAIRES
```

## Commandes Utiles

### Développement
```bash
# Démarrer l'application
npm start

# Build de production
npm run build

# Vérifier les erreurs
npm run lint
```

### Debug
```bash
# Ouvrir les outils de développement
F12

# Vérifier la console
Console > Vérifier les erreurs JavaScript

# Vérifier le localStorage
Application > Local Storage > retraiteClair_personalInfo
```

## Notes Importantes

1. **Tolérance de calcul** : ±1€ pour les arrondis
2. **Tests sur différents navigateurs** : Chrome, Firefox, Safari
3. **Tests sur différents appareils** : Desktop, tablette, mobile
4. **Vérification des couleurs** : Rouge, bleu, vert, gris sur mobile
5. **Sauvegarde** : Vérifier que les données persistent après rafraîchissement

## En Cas de Problème

1. **Vérifier la console** pour les erreurs JavaScript
2. **Vérifier le localStorage** pour la sauvegarde
3. **Tester sur un autre navigateur**
4. **Vérifier la responsivité** sur différents écrans
5. **Contacter l'équipe de développement** si nécessaire
