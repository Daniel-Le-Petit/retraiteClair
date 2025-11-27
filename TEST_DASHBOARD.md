# 🧪 Test d'Accès au Dashboard

## Test Rapide dans la Console

Ouvrez la console du navigateur (F12) et exécutez ce code :

```javascript
// 1. Vérifier que le dashboard est dans les pages
console.log('Test Dashboard Access');

// 2. Vérifier l'environnement
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('REACT_APP_ENABLE_DASHBOARD:', process.env.REACT_APP_ENABLE_DASHBOARD);

// 3. Essayer d'accéder directement au dashboard
window.location.hash = '#dashboard';

// 4. Attendre 1 seconde puis recharger
setTimeout(() => {
  window.location.reload();
}, 1000);
```

---

## Alternative : Créer un Bouton de Test

Si vous voulez, je peux ajouter un bouton flottant "📊 Dashboard" en bas à droite de l'écran, visible uniquement en développement.

Dites-moi si vous préférez cette solution !

