# Tests Automatisés - Simulateur Retraite Progressive

## 🎯 Vue d'ensemble

Ce système de tests automatisés permet de vérifier le bon fonctionnement du simulateur de retraite progressive avant le déploiement.

## 🚀 Installation et Configuration

### 1. Configuration initiale
```bash
# Installer les dépendances de test
node setup-tests.js

# Ou manuellement
npm install puppeteer readline-sync --save-dev
```

### 2. Démarrer l'application
```bash
# Dans un terminal
npm start

# L'application sera disponible sur http://localhost:3000
```

## 🧪 Types de Tests

### 1. Tests Automatisés (Puppeteer)
**Commande :** `npm run test:automated`

**Fonctionnalités :**
- ✅ Contrôle automatique du navigateur
- ✅ Saisie automatique des données
- ✅ Vérification des calculs
- ✅ Tests des scénarios
- ✅ Génération de rapports

**Avantages :**
- Rapide et reproductible
- Pas d'intervention manuelle
- Idéal pour les tests de régression

### 2. Tests Manuels Guidés
**Commande :** `npm run test:manual`

**Fonctionnalités :**
- ✅ Guide interactif
- ✅ Questions structurées
- ✅ Validation des résultats
- ✅ Tests d'interface
- ✅ Rapport automatique

**Avantages :**
- Contrôle humain
- Tests d'interface visuelle
- Validation de l'expérience utilisateur

### 3. Tests Complets
**Commande :** `npm run test:all`

**Fonctionnalités :**
- ✅ Combine tests automatisés et manuels
- ✅ Rapport global
- ✅ Validation complète

## 📋 Cas de Test Inclus

### Tests de Calculs
1. **Mode Simplifié - Cas Standard**
   - Salaire: 5000€, Temps partiel: 60%, Décote: 0%
   - Résultats attendus: Salaire net 3900€, Pension 702€, Total 3702€

2. **Mode Simplifié - Avec Décote**
   - Salaire: 4000€, Temps partiel: 50%, Décote: -5%
   - Résultats attendus: Salaire net 3120€, Pension 533.52€, Total 2533.52€

3. **Mode Simplifié - Avec Pension Fournie**
   - Salaire: 6000€, Temps partiel: 70%, Pension: 2000€, Surcote: +2%
   - Résultats attendus: Salaire net 4680€, Pension 816€, Total 5016€

4. **Mode Avancé - Calcul M@rel**
   - Salaire: 5500€, Salaire annuel: 66000€, Trimestres: 150, Naissance: 1970
   - Résultats attendus: Salaire net 4290€, Pension 993.96€, Total 4293.96€

### Tests de Scénarios
1. **Scénario 40%** - Revenu partiel 1560€, Pension 977.34€, Total 2537.34€
2. **Scénario 60%** - Revenu partiel 2340€, Pension 977.34€, Total 3317.34€
3. **Scénario 80%** - Revenu partiel 2496€, Pension 781.87€, Total 3277.87€

### Tests d'Interface
- ✅ Navigation entre onglets
- ✅ Affichage responsive
- ✅ Couleurs des barres (rouge, bleu, vert, gris)
- ✅ Sauvegarde des données

## 🔧 Configuration

### Variables d'environnement
```bash
# URL de l'application
TEST_BASE_URL=http://localhost:3000

# Mode headless (true/false)
TEST_HEADLESS=false

# Timeout des tests (ms)
TEST_TIMEOUT=30000
```

### Personnalisation des tests
Modifier `test-config.json` pour ajuster :
- Cas de test
- Tolérance des calculs
- Configuration du navigateur

## 📊 Rapports

### Fichiers générés
- `test-report.json` - Rapport des tests automatisés
- `manual-test-report.json` - Rapport des tests manuels
- `test-config.json` - Configuration des tests

### Format des rapports
```json
{
  "summary": {
    "totalTests": 10,
    "passedTests": 9,
    "failedTests": 1,
    "successRate": "90.0%",
    "timestamp": "2024-01-01T12:00:00.000Z"
  },
  "results": [
    {
      "name": "Mode Simplifié - Cas Standard",
      "expected": { "salaireNet": 3900, "pensionProgressive": 702 },
      "actual": { "salaireNet": 3900, "pensionProgressive": 702 },
      "passed": true,
      "timestamp": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

## 🚨 Dépannage

### Problèmes courants

#### 1. Application ne démarre pas
```bash
# Vérifier que le port 3000 est libre
netstat -an | findstr :3000

# Redémarrer l'application
npm start
```

#### 2. Tests automatisés échouent
```bash
# Vérifier que Puppeteer est installé
npm list puppeteer

# Réinstaller Puppeteer
npm install puppeteer --save-dev
```

#### 3. Tests manuels ne répondent pas
```bash
# Vérifier que l'application est accessible
curl http://localhost:3000

# Vérifier la console pour les erreurs
F12 > Console
```

### Logs de debug
```bash
# Activer les logs détaillés
DEBUG=true npm run test:automated

# Voir les logs du navigateur
TEST_HEADLESS=false npm run test:automated
```

## 📈 Intégration CI/CD

### GitHub Actions
```yaml
name: Tests Simulateur
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:all
```

### Jenkins
```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm run test:all'
            }
        }
    }
}
```

## 🔄 Maintenance

### Mise à jour des tests
1. Modifier les cas de test dans `test-config.json`
2. Ajuster les sélecteurs CSS si l'interface change
3. Mettre à jour les valeurs attendues si les calculs changent

### Ajout de nouveaux tests
1. Ajouter le cas de test dans `TEST_CASES`
2. Définir les données d'entrée et résultats attendus
3. Tester le nouveau cas manuellement
4. Intégrer dans la suite de tests

## 📞 Support

### En cas de problème
1. Vérifier les logs dans la console
2. Consulter les rapports de test
3. Tester manuellement les cas problématiques
4. Contacter l'équipe de développement

### Améliorations
- Ajouter des tests de performance
- Intégrer des tests de sécurité
- Automatiser les tests de régression
- Ajouter des tests de charge

## 🎉 Déploiement

### Critères de validation
- ✅ Tous les tests automatisés passent
- ✅ Tous les tests manuels passent
- ✅ Aucune erreur JavaScript
- ✅ Interface responsive
- ✅ Calculs corrects

### Commandes de déploiement
```bash
# Tests complets avant déploiement
npm run test:all

# Build de production
npm run build

# Déploiement
npm run deploy
```

---

**Note :** Ce système de tests garantit la qualité et la fiabilité du simulateur avant chaque déploiement en production.
