# 🎯 SOLUTION GA4 POUR SPA - RetraiteClair

## 🚨 **PROBLÈME IDENTIFIÉ**

Votre site est une **Single Page Application (SPA)** React qui utilise :
- **React Router** avec `HashRouter`
- **Navigation par swipe** dans `SwipeNavigation.jsx`
- **Pas de rechargement de page** lors des changements de route

**Résultat :** GA4 ne détecte que la première page vue et ne track pas les changements de route.

## ✅ **SOLUTION : TRACKING MANUEL DES PAGE VIEWS**

### **1. Créer un Hook GA4 pour React**

```javascript
// src/hooks/useGA4.js
import { useEffect } from 'react';

export const useGA4 = () => {
  const trackPageView = (pageTitle, pagePath) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath,
        send_to: 'G-9WF389CM13'
      });
      console.log(`GA4 Page View tracked: ${pageTitle} - ${pagePath}`);
    }
  };

  const trackEvent = (eventName, parameters = {}) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        ...parameters,
        send_to: 'G-9WF389CM13'
      });
      console.log(`GA4 Event tracked: ${eventName}`, parameters);
    }
  };

  return { trackPageView, trackEvent };
};
```

### **2. Modifier SwipeNavigation.jsx**

```javascript
// Ajouter le tracking dans SwipeNavigation.jsx
import { useGA4 } from '../hooks/useGA4';

const SwipeNavigation = () => {
  const { trackPageView, trackEvent } = useGA4();
  
  // Configuration des pages avec métadonnées GA4
  const pages = [
    { 
      id: 'accueil', 
      component: HomePage, 
      title: 'Accueil',
      gaTitle: 'Page d\'accueil - RetraiteClair',
      gaPath: '/'
    },
    { 
      id: 'calculateur', 
      component: CalculateurAvance, 
      title: 'Simulateur',
      gaTitle: 'Simulateur Retraite Progressive',
      gaPath: '/calculateur'
    },
    { 
      id: 'blog', 
      component: BlogListStable, 
      title: 'Blog',
      gaTitle: 'Blog Retraite Progressive',
      gaPath: '/blog'
    },
    { 
      id: 'conseils', 
      component: ConseilsPageSimple, 
      title: 'Conseils',
      gaTitle: 'Conseils Retraite Progressive',
      gaPath: '/conseils'
    },
    { 
      id: 'about', 
      component: AboutPage, 
      title: 'Mon parcours',
      gaTitle: 'À propos - Mon parcours',
      gaPath: '/about'
    },
    { 
      id: 'contact', 
      component: ContactForm, 
      title: 'Contact',
      gaTitle: 'Contact RetraiteClair',
      gaPath: '/contact'
    }
  ];

  // Fonction pour changer de page avec tracking GA4
  const goToPage = (index) => {
    if (index >= 0 && index < pages.length && !isTransitioning) {
      setIsTransitioning(true);
      
      // Track la page précédente
      const currentPage = pages[currentIndex];
      trackEvent('page_exit', {
        page_title: currentPage.gaTitle,
        page_path: currentPage.gaPath
      });
      
      setCurrentIndex(index);
      
      // Track la nouvelle page après un délai
      setTimeout(() => {
        const newPage = pages[index];
        trackPageView(newPage.gaTitle, newPage.gaPath);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Track la page initiale au chargement
  useEffect(() => {
    const initialPage = pages[currentIndex];
    trackPageView(initialPage.gaTitle, initialPage.gaPath);
  }, []);

  // ... reste du code existant
};
```

### **3. Modifier les Composants Individuels**

```javascript
// Dans chaque composant (HomePage.js, CalculateurAvance.js, etc.)
import { useGA4 } from '../hooks/useGA4';

const HomePage = () => {
  const { trackEvent } = useGA4();

  // Track les interactions importantes
  const handleCalculatorClick = () => {
    trackEvent('calculator_click', {
      event_category: 'engagement',
      event_label: 'homepage_to_calculator'
    });
  };

  const handleContactClick = () => {
    trackEvent('contact_click', {
      event_category: 'engagement',
      event_label: 'homepage_to_contact'
    });
  };

  // ... reste du code
};
```

### **4. Modifier le CalculateurAvance.js**

```javascript
// Dans CalculateurAvance.js
import { useGA4 } from '../hooks/useGA4';

const CalculateurAvance = () => {
  const { trackEvent } = useGA4();

  // Track les calculs effectués
  const calculerScenario = (tempsPartiel) => {
    // ... logique existante ...
    
    // Track le calcul
    trackEvent('calculation_performed', {
      event_category: 'calculator',
      event_label: `temps_partiel_${tempsPartiel}`,
      value: tempsPartiel
    });
  };

  // Track les changements d'onglets
  const handleTabChange = (tabName) => {
    trackEvent('tab_change', {
      event_category: 'navigation',
      event_label: tabName
    });
  };

  // ... reste du code
};
```

## 🚀 **IMPLÉMENTATION IMMÉDIATE**

Je vais maintenant implémenter cette solution dans votre code :



