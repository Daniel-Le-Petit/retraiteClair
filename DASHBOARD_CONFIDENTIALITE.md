# 🔒 Confidentialité du Dashboard Analytics

## ✅ Ce qui est visible dans le dashboard

### Statistiques agrégées (anonymes)
- **Événements totaux** : Nombre total d'événements
- **Utilisateurs uniques** : Nombre d'utilisateurs différents (sans identification)
- **Calculs effectués** : Nombre de simulations complétées
- **Scénarios sélectionnés** : Nombre de scénarios comparés
- **Temps moyen sur page** : Temps moyen passé sur les pages
- **Événements aujourd'hui** : Nombre d'événements aujourd'hui

### Événements récents (anonymisés)
- **Date** : Date et heure de l'événement
- **Événement** : Type d'événement (ex: `calculation_started`, `scenario_selected`)
- **Page** : Page visitée (ex: `/simulateurs`, `/resultats`)

**❌ Plus de colonne "Utilisateur"** : Les identifiants utilisateurs ne sont plus affichés dans le tableau.

## 🔐 Conformité RGPD

### ✅ Conforme car :
1. **Pas d'identification personnelle** : Les `user_id` sont générés aléatoirement et stockés localement (localStorage)
2. **Pas de données personnelles** : Aucun nom, email, adresse IP, ou autre donnée personnelle n'est stockée
3. **Statistiques agrégées uniquement** : Les données affichées sont des agrégations anonymes
4. **Données techniques uniquement** : Seules les interactions avec le site sont trackées (pages visitées, événements)

### 📊 Ce qui est tracké
- Type d'événement (ex: `calculation_started`)
- Page visitée
- Temps passé sur la page
- Profondeur de scroll
- Paramètres de calcul (salaire, temps partiel, âge) - **sans identification de l'utilisateur**

### 🚫 Ce qui n'est PAS tracké
- Nom, prénom, email
- Adresse IP
- Localisation géographique précise
- Informations bancaires
- Autres données personnelles

## 🎯 Recommandations

### Pour la production
1. ✅ **Garder les statistiques agrégées** : Utiles pour comprendre l'utilisation du site
2. ✅ **Masquer les identifiants utilisateurs** : Déjà fait - la colonne "Utilisateur" a été supprimée
3. ✅ **Conserver les événements récents** : Utiles pour le debugging et comprendre les parcours utilisateurs
4. ✅ **Protéger l'accès au dashboard** : Le mot de passe protège l'accès (via `REACT_APP_DASHBOARD_PASSWORD`)

### Optionnel : Anonymisation supplémentaire
Si vous voulez aller plus loin, vous pouvez :
- Masquer complètement le tableau des événements récents
- Afficher uniquement les statistiques agrégées
- Ajouter un message de confidentialité dans le dashboard

## 📝 Configuration actuelle

Le dashboard affiche :
- ✅ Statistiques agrégées (anonymes)
- ✅ Graphique des événements par type
- ✅ Événements récents (sans identifiant utilisateur)
- 🔒 Accès protégé par mot de passe

## 🔄 Si vous voulez modifier

Pour masquer complètement les événements récents, modifiez `src/components/AnalyticsDashboard.jsx` et commentez la section "Événements récents".

