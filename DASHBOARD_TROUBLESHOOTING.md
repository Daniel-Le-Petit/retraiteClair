# 🔧 Dépannage du Dashboard

## ✅ Vérifications à Faire

### **1. Vérifier que le Dashboard est dans la Navigation**

Le dashboard devrait apparaître dans `HorizontalNavigation` après "Contact".

**Si vous ne le voyez pas :**

1. **Vérifiez la console du navigateur** (F12)
   - Cherchez des erreurs liées à `AnalyticsDashboard`
   - Vérifiez que `process.env.NODE_ENV === 'development'`

2. **Rechargez complètement la page**
   - Ctrl+Shift+R (ou Cmd+Shift+R sur Mac) pour un hard refresh
   - Ou fermez et rouvrez l'onglet

3. **Vérifiez que vous êtes bien en mode développement**
   - Le serveur doit être lancé avec `npm start`
   - Pas en mode production (`npm run build`)

### **2. Accès Direct par URL**

Essayez d'accéder directement au dashboard via l'URL :

```
http://localhost:3002/#dashboard
```

**Si ça ne fonctionne pas :**

- Vérifiez que le dashboard est bien dans le tableau `pages` de `SwipeNavigation.jsx`
- Vérifiez la console pour des erreurs

### **3. Vérifier Supabase**

Le dashboard nécessite Supabase pour fonctionner.

**Vérifiez dans la console :**
- Vous devriez voir : `✅ Supabase configuré avec succès`
- Si vous voyez : `⚠️ Supabase non configuré`, ajoutez les variables dans `.env`

### **4. Forcer l'Activation du Dashboard**

Si le dashboard n'apparaît toujours pas, ajoutez dans votre `.env` :

```bash
REACT_APP_ENABLE_DASHBOARD=true
```

Puis **redémarrez** le serveur (Ctrl+C puis `npm start`).

---

## 🐛 Erreurs Courantes

### **"AnalyticsDashboard is not defined"**

➡️ Vérifiez que l'import est correct dans `SwipeNavigation.jsx` :
```javascript
import AnalyticsDashboard from './AnalyticsDashboard';
```

### **"Cannot read property 'from' of null"**

➡️ Supabase n'est pas configuré. Ajoutez les variables dans `.env`.

### **Le dashboard apparaît mais est vide**

➡️ Vérifiez que :
1. La table `events` existe dans Supabase
2. Il y a des événements dans la table
3. Les politiques RLS sont correctement configurées

---

## 🧪 Test Rapide

1. **Ouvrez la console** (F12)
2. **Tapez dans la console** :
   ```javascript
   console.log('NODE_ENV:', process.env.NODE_ENV);
   console.log('ENABLE_DASHBOARD:', process.env.REACT_APP_ENABLE_DASHBOARD);
   ```
3. **Vérifiez les valeurs** :
   - `NODE_ENV` devrait être `"development"`
   - `ENABLE_DASHBOARD` devrait être `"true"` ou `undefined` (si en dev)

---

## 🔄 Solution Alternative : Route Dédiée

Si le dashboard ne fonctionne toujours pas via la navigation, je peux créer une route dédiée accessible via `/dashboard` directement.

Dites-moi si vous voulez que je crée cette solution alternative !

