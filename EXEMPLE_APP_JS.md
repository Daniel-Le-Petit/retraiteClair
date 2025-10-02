# Exemple d'importation dans App.js

Voici l'extrait de code montrant comment le composant FeedbackForm a été intégré dans App.js :

```javascript
// Import du composant
import FeedbackForm from './components/FeedbackForm';

// Dans la fonction renderPage()
const renderPage = () => {
  switch (currentPage) {
    case 'accueil':
      return <PageAccueil />;
    case 'calculateur':
      return <CalculateurAvance />;
    case 'conseils':
      return <ConseilsPage />;
    case 'feedback':  // Nouvelle page ajoutée
      return <FeedbackForm />;
    default:
      return <PageAccueil />;
  }
};
```

Le composant est maintenant accessible via le menu de la sidebar sous "Votre avis".
