# Composant FeedbackForm - RetraiteClair

## Configuration Formspree

**IMPORTANT** : Remplacez `YOUR_FORMSPREE_ID` dans `FeedbackForm.jsx` ligne 45 par votre identifiant Formspree.

1. Créez un compte sur [Formspree.io](https://formspree.io)
2. Créez un nouveau formulaire et récupérez l'URL complète : `https://formspree.io/f/mnngvdaw`
3. Remplacez `YOUR_FORMSPREE_ID` par `mnngvdaw` dans le fichier `src/components/FeedbackForm.jsx`

## Fichiers créés

- `src/components/FeedbackForm.jsx` - Composant React principal
- `src/components/FeedbackForm.css` - Styles responsive et modernes
- `src/components/FeedbackForm.test.jsx` - Tests unitaires complets

## Intégration

Le composant est déjà intégré dans l'application :
- Ajouté dans la sidebar (menu "Votre avis")
- Routage configuré dans `App.js`
- Accessible via le menu de navigation

## Commandes

```bash
npm run build    # Build de production
npm test         # Lancement des tests
npm start        # Démarrage en développement
```

## Fonctionnalités

- ✅ Validation HTML5 (email requis, message min 10 caractères)
- ✅ États visuels (idle, sending, sent, error)
- ✅ Accessibilité complète (ARIA, focus, tabindex)
- ✅ Design responsive (max 500px mobile)
- ✅ Animation sur le bouton d'envoi
- ✅ Gestion d'erreurs HTTP
- ✅ Tests unitaires complets
