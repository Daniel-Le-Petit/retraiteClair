# 🔍 Guide de Vérification des Tests - Simulateur Retraite Progressive

## 📋 Commandes Rapides

### 🚀 Exécuter les Tests
```bash
# Tests manuels (recommandé)
npm run test:manual

# Tests automatisés
npm run test:automated

# Tous les tests
npm run test:all
```

### 📊 Visualiser les Résultats
```bash
# Voir tous les résultats (recommandé)
npm run test:results

# Voir seulement les tests échoués
npm run test:failed

# Voir seulement les tests réussis
npm run test:passed
```

## 🎯 Utilisation Recommandée

### 1. **Exécution des Tests**
```bash
npm run test:manual
```
- Suivez les instructions à l'écran
- Saisissez les valeurs affichées dans le simulateur
- Le rapport sera automatiquement généré

### 2. **Vérification des Résultats**
```bash
npm run test:results
```
- Affiche un résumé coloré de tous les tests
- Montre les détails des échecs
- Donne des recommandations

### 3. **Focus sur les Problèmes**
```bash
npm run test:failed
```
- Affiche uniquement les tests qui ont échoué
- Idéal pour identifier rapidement les problèmes

## 📁 Fichiers de Rapport

Les résultats sont sauvegardés dans :
- `manual-test-report.json` - Résultats des tests manuels
- `automated-test-report.json` - Résultats des tests automatisés

## 🎨 Codes Couleur

- ✅ **Vert** : Test réussi
- ❌ **Rouge** : Test échoué
- ⚠️ **Jaune** : Attention requise
- 📊 **Bleu** : Informations générales

## 🔧 Dépannage

### Si l'application ne démarre pas :
```bash
# Vérifier le port 3000
netstat -ano | findstr :3000

# Tuer le processus si nécessaire
taskkill /PID [NUMERO_PID] /F

# Redémarrer l'application
npm start
```

### Si les tests échouent :
1. Vérifiez que l'application est ouverte sur `http://localhost:3000`
2. Naviguez vers la page Simulateur
3. Vérifiez que les données sont correctement saisies
4. Relancez les tests

## 📈 Interprétation des Résultats

### ✅ **Tous les tests réussis (100%)**
- 🎉 Le simulateur est prêt pour le déploiement
- ✅ Aucune action requise

### ⚠️ **Quelques tests échoués (80-99%)**
- 🔧 Vérifiez les calculs spécifiques
- 📝 Corrigez les erreurs mineures
- ✅ Acceptable pour le déploiement

### ❌ **Plusieurs tests échoués (<80%)**
- 🚨 Des corrections importantes sont nécessaires
- 🔍 Analysez les détails des échecs
- ❌ Ne pas déployer avant corrections

## 🚀 Workflow Recommandé

1. **Développement** : Modifications du code
2. **Tests** : `npm run test:manual`
3. **Vérification** : `npm run test:results`
4. **Correction** : Si échecs, corriger et relancer
5. **Déploiement** : Une fois tous les tests réussis

## 💡 Conseils

- **Exécutez les tests après chaque modification importante**
- **Vérifiez les résultats avec `npm run test:results`**
- **Corrigez les échecs avant de déployer**
- **Gardez les rapports JSON pour l'historique**
