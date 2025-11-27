# 🚀 Accès au Dashboard via la Console

## Test Direct dans la Console

Ouvrez la console (F12) et exécutez ce code :

```javascript
// Méthode 1 : Via le hash
window.location.hash = '#dashboard';
window.location.reload();

// OU Méthode 2 : Si vous êtes sur React DevTools
// Trouvez le composant SwipeNavigation et modifiez currentIndex
```

---

## Vérifier si le Dashboard est dans les Pages

```javascript
// Cette commande ne fonctionnera pas directement car pages n'est pas global
// Mais vous pouvez vérifier dans React DevTools
```

---

## Solution Alternative : URL Directe

Essayez cette URL directement dans votre navigateur :

```
http://localhost:3002/#dashboard
```

Puis appuyez sur Entrée.

---

## Si Rien ne Fonctionne

Le bouton flottant devrait apparaître en bas à droite après un redémarrage du serveur.

**Redémarrez le serveur :**
1. `Ctrl+C` dans le terminal
2. `npm start` (ou `./my*`)
3. Rechargez la page

Le bouton "📊 Dashboard" devrait apparaître en bas à droite.

