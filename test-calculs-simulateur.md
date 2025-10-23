# Jeu de Test - Simulateur Retraite Progressive

## Rappel des Calculs

### Mode Simplifié
- **Salaire net** = Salaire brut × 0.78 (22% de cotisations)
- **Pension complète** = Salaire net × 0.45 (ou pension fournie par l'utilisateur)
- **Pension progressive** = Pension complète × 0.40 × (1 + surcote/décote%)
- **Salaire partiel** = Salaire brut × (temps partiel / 100)
- **Revenu total** = Salaire partiel + Pension progressive

### Mode Avancé
- **Salaire net** = Salaire brut × 0.78
- **Pension complète** = (Salaire annuel moyen × 0.5) × Taux pension / 12
- **Pension progressive** = Pension complète × 0.40 × (1 + surcote/décote%)
- **Salaire partiel** = Salaire brut × (temps partiel / 100)
- **Revenu total** = Salaire partiel + Pension progressive

### Scénarios
- **Ratio pension progressive** = 0.2506 (basé sur données 60%)
- **Pension progressive** = Salaire net × 0.2506
- **Salaire partiel net** = Salaire net × (temps partiel / 100)
- **Revenu total** = Salaire partiel net + Pension progressive

## Jeu de Test

### Test 1: Mode Simplifié - Cas Standard
**Données d'entrée:**
- Salaire brut: 5000€
- Temps partiel: 60%
- Début retraite: 2025-01-01
- Surcote/décote: 0%

**Résultats attendus:**
- Salaire net: 5000 × 0.78 = 3900€
- Pension complète: 3900 × 0.45 = 1755€
- Pension progressive: 1755 × 0.40 = 702€
- Salaire partiel: 5000 × 0.60 = 3000€
- Revenu total: 3000 + 702 = 3702€

### Test 2: Mode Simplifié - Avec Décote
**Données d'entrée:**
- Salaire brut: 4000€
- Temps partiel: 50%
- Début retraite: 2025-01-01
- Surcote/décote: -5%

**Résultats attendus:**
- Salaire net: 4000 × 0.78 = 3120€
- Pension complète: 3120 × 0.45 = 1404€
- Pension progressive: 1404 × 0.40 × (1 - 0.05) = 1404 × 0.40 × 0.95 = 533.52€
- Salaire partiel: 4000 × 0.50 = 2000€
- Revenu total: 2000 + 533.52 = 2533.52€

### Test 3: Mode Simplifié - Avec Pension Fournie
**Données d'entrée:**
- Salaire brut: 6000€
- Temps partiel: 70%
- Début retraite: 2025-01-01
- Pension estimée: 2000€
- Surcote/décote: +2%

**Résultats attendus:**
- Salaire net: 6000 × 0.78 = 4680€
- Pension complète: 2000€ (fournie)
- Pension progressive: 2000 × 0.40 × (1 + 0.02) = 2000 × 0.40 × 1.02 = 816€
- Salaire partiel: 6000 × 0.70 = 4200€
- Revenu total: 4200 + 816 = 5016€

### Test 4: Mode Avancé - Calcul M@rel
**Données d'entrée:**
- Salaire brut: 5500€
- Temps partiel: 60%
- Début retraite: 2025-01-01
- Salaire annuel moyen: 66000€
- Trimestres validés: 150
- Année de naissance: 1970
- Surcote/décote: 0%

**Résultats attendus:**
- Salaire net: 5500 × 0.78 = 4290€
- Trimestres requis: 166 (nés après 1961)
- Taux pension: 150/166 = 0.9036
- Pension complète: (66000 × 0.5) × 0.9036 / 12 = 33000 × 0.9036 / 12 = 2484.9€
- Pension progressive: 2484.9 × 0.40 = 993.96€
- Salaire partiel: 5500 × 0.60 = 3300€
- Revenu total: 3300 + 993.96 = 4293.96€

### Test 5: Scénarios - 40%
**Données d'entrée:**
- Salaire brut: 5000€
- Temps partiel: 40%
- Maintien cotisations: Non

**Résultats attendus:**
- Salaire net: 5000 × 0.78 = 3900€
- Salaire partiel net: 3900 × 0.40 = 1560€
- Pension progressive: 3900 × 0.2506 = 977.34€
- Revenu total: 1560 + 977.34 = 2537.34€
- Perte revenu: 3900 - 2537.34 = 1362.66€

### Test 6: Scénarios - 60% avec Maintien Cotisations
**Données d'entrée:**
- Salaire brut: 5000€
- Temps partiel: 60%
- Maintien cotisations: Oui

**Résultats attendus:**
- Salaire net: 5000 × 0.78 = 3900€
- Salaire partiel brut: 5000 × 0.60 = 3000€
- Cotisations normales: 3000 × 0.22 = 660€
- Cotisations sur 100%: 5000 × 0.22 = 1100€
- Cotisations supplémentaires: 1100 - 660 = 440€
- Salaire partiel net: 3000 - 440 = 2560€
- Pension progressive: 3900 × 0.2506 = 977.34€
- Revenu total: 2560 + 977.34 = 3537.34€

### Test 7: Scénarios - 80%
**Données d'entrée:**
- Salaire brut: 4000€
- Temps partiel: 80%
- Maintien cotisations: Non

**Résultats attendus:**
- Salaire net: 4000 × 0.78 = 3120€
- Salaire partiel net: 3120 × 0.80 = 2496€
- Pension progressive: 3120 × 0.2506 = 781.87€
- Revenu total: 2496 + 781.87 = 3277.87€
- Perte revenu: 3120 - 3277.87 = -157.87€ (gain!)

## Points de Vérification

### Interface Utilisateur
1. ✅ Navigation entre onglets (Saisie, Résultats, Scénarios)
2. ✅ Affichage des résultats en mode simplifié
3. ✅ Affichage des résultats en mode avancé
4. ✅ Calculs des scénarios (40%, 50%, 60%, 70%, 80%)
5. ✅ Affichage mobile des scénarios
6. ✅ Couleurs des barres (rouge, bleu, vert, gris)

### Calculs
1. ✅ Mode simplifié avec pension estimée
2. ✅ Mode simplifié avec pension fournie
3. ✅ Mode avancé avec calcul M@rel
4. ✅ Application des surcotes/décotes
5. ✅ Maintien des cotisations à 100%
6. ✅ Calculs des scénarios avec ratio fixe

### Responsive
1. ✅ Affichage desktop
2. ✅ Affichage tablette
3. ✅ Affichage mobile
4. ✅ Navigation mobile
5. ✅ Graphiques mobiles

## Instructions de Test

1. **Tester chaque cas de test** avec les données exactes
2. **Vérifier les calculs** à la main pour les 3 premiers cas
3. **Tester sur différents écrans** (desktop, tablette, mobile)
4. **Vérifier l'affichage des couleurs** sur mobile
5. **Tester la navigation** entre les onglets
6. **Vérifier la sauvegarde** des données dans localStorage

## Critères de Validation

- ✅ Tous les calculs sont corrects (±1€ de tolérance)
- ✅ L'interface s'affiche correctement sur tous les écrans
- ✅ Les couleurs sont cohérentes
- ✅ La navigation fonctionne
- ✅ Aucune erreur JavaScript dans la console
- ✅ Les données sont sauvegardées correctement
