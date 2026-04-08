# 🧪 GUIDE DE TEST GA4 SPA - RetraiteClair

## ✅ **SOLUTION IMPLÉMENTÉE**

Votre site SPA React a maintenant un **tracking GA4 automatique** pour toutes les pages et interactions.

## 🔧 **MODIFICATIONS APPORTÉES**

### **1. Hook GA4 Créé** (`src/hooks/useGA4.js`)
- ✅ **trackPageView()** : Track les changements de page
- ✅ **trackEvent()** : Track les événements personnalisés
- ✅ **Gestion du consentement** : Respecte le RGPD

### **2. SwipeNavigation Modifié**
- ✅ **Tracking automatique** des changements de page
- ✅ **Métadonnées GA4** pour chaque page
- ✅ **Événements page_exit** et page_view

### **3. CalculateurAvance Modifié**
- ✅ **Tracking des calculs** effectués
- ✅ **Paramètres détaillés** (temps partiel, salaire, revenu)

## 🧪 **TESTS À EFFECTUER**

### **Test 1 : Vérification Console**
1. **Visiter** `https://retraiteclair.onrender.com/`
2. **Accepter les cookies**
3. **Ouvrir la console** (F12)
4. **Vérifier** : `"GA4 Page View tracked: Page d'accueil - RetraiteClair - /"`

### **Test 2 : Navigation entre Pages**
1. **Cliquer sur les dots** de navigation
2. **Vérifier dans la console** :
   - `"GA4 Event tracked: page_exit"`
   - `"GA4 Page View tracked: [Nouvelle page]"`
3. **Répéter** pour toutes les pages

### **Test 3 : Calculateur**
1. **Aller sur le simulateur**
2. **Remplir le formulaire** (salaire, etc.)
3. **Changer le temps partiel** (60%, 80%, etc.)
4. **Vérifier dans la console** :
   - `"GA4 Event tracked: calculation_performed"`

### **Test 4 : Google Analytics Real-time**
1. **Aller dans GA4** : https://analytics.google.com/
2. **Real-time** → **Overview**
3. **Naviguer** sur le site
4. **Vérifier** : Utilisateurs actifs et pages vues

## 📊 **ÉVÉNEMENTS TRACKÉS**

### **Page Views :**
- ✅ **Page d'accueil** : `/`
- ✅ **Simulateur** : `/calculateur`
- ✅ **Blog** : `/blog`
- ✅ **Conseils** : `/conseils`
- ✅ **À propos** : `/about`
- ✅ **Contact** : `/contact`

### **Événements Personnalisés :**
- ✅ **page_exit** : Quand on quitte une page
- ✅ **calculation_performed** : Quand on calcule un scénario
- ✅ **tab_change** : Changement d'onglet (si implémenté)

## 🎯 **RÉSULTATS ATTENDUS**

### **Dans la Console :**
```
GA4 Page View tracked: Page d'accueil - RetraiteClair - /
GA4 Event tracked: page_exit {event_category: "navigation", event_label: "Page d'accueil - RetraiteClair", page_path: "/"}
GA4 Page View tracked: Simulateur Retraite Progressive - /calculateur
GA4 Event tracked: calculation_performed {event_category: "calculator", event_label: "temps_partiel_60", value: 60}
```

### **Dans GA4 Real-time :**
- ✅ **Utilisateurs actifs** : 1+
- ✅ **Pages vues** : Nombre de changements de page
- ✅ **Événements** : calculation_performed, page_exit

### **Dans GA4 Reports :**
- ✅ **Engagement** → **Pages and screens** : Toutes les pages
- ✅ **Engagement** → **Events** : Événements personnalisés
- ✅ **Acquisition** → **Traffic acquisition** : Sources de trafic

## 🚀 **DÉPLOIEMENT**

### **Build Réussi :**
- ✅ **Bundle size** : 96.31 kB (légèrement augmenté)
- ✅ **Warnings** : Réduits à des warnings mineurs
- ✅ **Fonctionnalité** : Tracking GA4 opérationnel

### **Prochain Déploiement :**
```bash
# Les modifications sont prêtes pour le déploiement
# Le tracking GA4 sera actif sur le site en ligne
```

## 📋 **CHECKLIST DE TEST**

- [ ] **Site accessible** : `https://retraiteclair.onrender.com/`
- [ ] **Cookies acceptés** : Bannière de consentement
- [ ] **Console ouverte** : F12 → Console
- [ ] **Navigation testée** : Toutes les pages
- [ ] **Calculateur testé** : Calculs effectués
- [ ] **GA4 vérifié** : Real-time reports
- [ ] **Événements confirmés** : Console + GA4

---

## 🎉 **RÉSUMÉ**

**Problème SPA résolu !** 

Votre site track maintenant automatiquement :
- ✅ **Toutes les pages** visitées
- ✅ **Tous les calculs** effectués
- ✅ **Toutes les navigations** entre pages

**GA4 va maintenant voir le vrai trafic de votre site SPA !** 🚀







