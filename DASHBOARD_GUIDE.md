# 📊 Guide du Dashboard Analytics

## 🎯 Accès au Dashboard

Le dashboard est accessible de deux façons :

### **Option 1 : En Mode Développement (Automatique)**

En mode développement (`npm start`), le dashboard est automatiquement ajouté à la navigation.

1. Lancez votre serveur de développement
2. Naviguez jusqu'à la page "Dashboard" dans votre navigation
3. Ou allez directement sur `http://localhost:3002/#dashboard`

### **Option 2 : En Production (Optionnel)**

Pour activer le dashboard en production, ajoutez dans votre `.env` :

```bash
REACT_APP_ENABLE_DASHBOARD=true
```

Puis redéployez votre application.

---

## 📈 Fonctionnalités du Dashboard

### **1. Statistiques Principales**

Le dashboard affiche 6 cartes de statistiques :

- **Événements totaux** : Nombre total d'événements trackés
- **Utilisateurs uniques** : Nombre d'utilisateurs différents
- **Calculs effectués** : Nombre de calculs complétés
- **Scénarios sélectionnés** : Nombre de changements de scénario
- **Temps moyen / page** : Temps moyen passé sur les pages (en secondes)
- **Événements aujourd'hui** : Nombre d'événements aujourd'hui

### **2. Graphique des Événements par Type**

Visualisation en barres horizontales montrant :
- Le nombre d'événements pour chaque type
- Trié du plus fréquent au moins fréquent
- Barres proportionnelles pour une comparaison visuelle

### **3. Événements Récents**

Tableau des 10 événements les plus récents avec :
- Date et heure
- Type d'événement
- ID utilisateur (tronqué)
- Page URL

### **4. Filtres Temporels**

Boutons pour filtrer les données par période :
- **24h** : Dernières 24 heures
- **7 jours** : Dernière semaine
- **30 jours** : Dernier mois
- **Tout** : Toutes les données

---

## 🔧 Configuration

### **Variables d'Environnement**

Le dashboard nécessite que Supabase soit configuré :

```bash
REACT_APP_SUPABASE_URL=https://votre-projet.supabase.co
REACT_APP_SUPABASE_ANON_KEY=votre-cle-anon
```

Pour activer en production :
```bash
REACT_APP_ENABLE_DASHBOARD=true
```

---

## 📊 Types d'Événements Trackés

Le dashboard affiche tous les événements trackés, notamment :

- `calculation_started` - Début d'un calcul
- `calculation_completed` - Fin d'un calcul
- `scenario_selected` - Sélection d'un scénario
- `time_on_page` - Temps passé sur une page
- `scroll_depth` - Profondeur de scroll
- `page_view` - Vue de page
- Et tous les autres événements personnalisés

---

## 🎨 Personnalisation

### **Modifier les Statistiques Affichées**

Éditez `src/components/AnalyticsDashboard.jsx` dans la fonction `loadStats()` pour ajouter/modifier les statistiques calculées.

### **Modifier le Design**

Éditez `src/components/AnalyticsDashboard.module.css` pour personnaliser les styles.

### **Ajouter des Graphiques**

Vous pouvez ajouter des graphiques avec des bibliothèques comme :
- **Chart.js** : `npm install chart.js react-chartjs-2`
- **Recharts** : `npm install recharts`
- **Victory** : `npm install victory`

---

## 🔒 Sécurité

### **Recommandations**

1. **En Production** : Ne laissez pas le dashboard accessible publiquement
2. **Protection** : Ajoutez une authentification si nécessaire
3. **Données Sensibles** : Les données sont anonymisées (user_id généré)

### **Option : Dashboard Privé**

Pour rendre le dashboard privé, vous pouvez :

1. Ajouter une vérification d'authentification
2. Utiliser une route protégée
3. Restreindre l'accès par IP

---

## 🚀 Améliorations Futures Possibles

- [ ] Graphiques temporels (évolution dans le temps)
- [ ] Funnels de conversion
- [ ] Analyse des parcours utilisateurs
- [ ] Export des données (CSV, Excel)
- [ ] Filtres avancés (par utilisateur, par page, etc.)
- [ ] Alertes automatiques
- [ ] Comparaison de périodes

---

## ❓ Problèmes Courants

### **"Supabase n'est pas configuré"**

➡️ Vérifiez que les variables d'environnement sont définies dans `.env`

### **"Aucun événement récent"**

➡️ Vérifiez que le tracking fonctionne et que des événements sont enregistrés dans Supabase

### **Le dashboard n'apparaît pas**

➡️ Vérifiez que vous êtes en mode développement OU que `REACT_APP_ENABLE_DASHBOARD=true` est défini

---

## 📝 Exemple d'Utilisation

1. **Ouvrez le dashboard** en mode développement
2. **Sélectionnez une période** (7 jours par défaut)
3. **Analysez les statistiques** :
   - Combien de calculs ont été effectués ?
   - Quel est le scénario le plus populaire ?
   - Combien de temps les utilisateurs passent-ils sur le site ?
4. **Consultez les événements récents** pour voir l'activité en temps réel

---

Le dashboard est maintenant prêt à l'emploi ! 🎉

