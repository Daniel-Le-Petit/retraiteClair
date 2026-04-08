# 🔐 Configuration de l'authentification du Dashboard

## ✅ **Ce qui a été implémenté**

1. **Page de login** : `DashboardLogin.jsx` - Interface de connexion avec mot de passe
2. **Protection du dashboard** : `ProtectedDashboard.jsx` - Vérifie l'authentification avant d'afficher le dashboard
3. **Bouton de déconnexion** : Visible en haut à droite du dashboard
4. **Session persistante** : L'authentification dure 24 heures (stockée dans `sessionStorage`)

## 🔑 **Configuration du mot de passe**

### **1. En développement local**

Ajoutez dans votre fichier `.env` :

```bash
REACT_APP_DASHBOARD_PASSWORD=votre_mot_de_passe_secret
```

### **2. En production (Render)**

1. Allez dans votre projet Render : https://dashboard.render.com
2. Sélectionnez votre service `retraiteclair`
3. Allez dans **Environment** (Variables d'environnement)
4. Ajoutez :
   - **Key** : `REACT_APP_DASHBOARD_PASSWORD`
   - **Value** : `votre_mot_de_passe_secret`
5. Redéployez l'application

### **3. Activer le dashboard en production**

Ajoutez aussi cette variable :

```bash
REACT_APP_ENABLE_DASHBOARD=true
```

## 🔒 **Sécurité**

### **Fonctionnalités de sécurité :**
- ✅ Mot de passe stocké dans les variables d'environnement (pas dans le code)
- ✅ Session expire après 24 heures
- ✅ Stockage dans `sessionStorage` (expire à la fermeture du navigateur)
- ✅ Dashboard masqué par défaut en production
- ✅ Tous les événements visibles (pas de filtre par utilisateur)

### **Recommandations :**
- 🔐 Utilisez un mot de passe fort (minimum 12 caractères, mélange de lettres, chiffres, symboles)
- 🔄 Changez le mot de passe régulièrement
- 🚫 Ne partagez pas le mot de passe
- 🔍 Vérifiez régulièrement les logs d'accès dans Supabase

## 📊 **Accès aux données**

Le dashboard affiche **tous les événements** de **tous les utilisateurs** :
- ✅ Événements totaux
- ✅ Utilisateurs uniques
- ✅ Calculs effectués
- ✅ Scénarios sélectionnés
- ✅ Temps moyen par page
- ✅ Événements par type
- ✅ Événements récents avec détails

## 🧪 **Test**

1. **En développement** :
   ```bash
   npm start
   ```
   - Le dashboard apparaît dans le header
   - Cliquez dessus → Page de login
   - Entrez le mot de passe → Accès au dashboard

2. **En production** :
   - Ajoutez `REACT_APP_ENABLE_DASHBOARD=true` et `REACT_APP_DASHBOARD_PASSWORD=...`
   - Redéployez
   - Le lien "Admin" apparaît dans le footer (discret, en bas de page)
   - Cliquez dessus → Page de login
   - Entrez le mot de passe → Accès au dashboard
   - Ou accédez directement via l'URL : `/#dashboard`

## 🚨 **Déconnexion**

- Cliquez sur le bouton **"Déconnexion"** en haut à droite du dashboard
- Ou fermez le navigateur (la session expire)

## 📝 **Fichiers créés/modifiés**

- ✅ `src/components/DashboardLogin.jsx` - Page de login
- ✅ `src/components/DashboardLogin.module.css` - Styles du login
- ✅ `src/components/ProtectedDashboard.jsx` - Wrapper de protection
- ✅ `src/components/AnalyticsDashboard.jsx` - Ajout du bouton de déconnexion
- ✅ `src/components/SwipeNavigationNew.jsx` - Utilise `ProtectedDashboard`
- ✅ `src/components/HorizontalNavigation.jsx` - Commentaire mis à jour

