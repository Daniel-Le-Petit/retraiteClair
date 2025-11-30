# 📊 Guide d'Implémentation GA4 - RetraiteClair

## 🎯 Objectif

Améliorer le tracking GA4 existant pour analyser les comportements des utilisateurs sur votre site statique.

---

## ✅ Ce qui est Déjà en Place

- ✅ GA4 configuré avec consentement RGPD
- ✅ Hook `useGA4` disponible
- ✅ Tracking des pages et calculs de base
- ✅ Utilitaire `tracking.js` avec fonctions avancées

---

## 🚀 Événements à Ajouter (Priorités)

### **Priorité 1 - Essentiels** ⭐⭐⭐

#### 1. **Calculs Effectués** (déjà fait, à améliorer)
```javascript
// Dans Simulateurs.jsx ou CalculateurAvance.js
import { trackEvent } from '../utils/tracking';

const handleSimulation = async (data) => {
  // Track le début
  trackEvent('calculation_started', {
    mode: data.mode || 'simplified',
    salaire_brut: data.salaireBrut,
    temps_partiel: data.tempsPartiel,
    age: data.age
  });

  setIsCalculating(true);
  
  setTimeout(() => {
    const results = calculateRetraiteProgressive(data);
    setSimulationData(results);
    setIsCalculating(false);
    
    // Track la fin avec résultats
    trackEvent('calculation_completed', {
      mode: data.mode || 'simplified',
      revenu_total: results.revenusNets?.total || 0,
      economie_fiscale: results.impactFiscal?.economie || 0,
      temps_partiel: data.tempsPartiel,
      revenu_temps_plein: results.revenusNets?.tempsPlein || 0
    });
  }, 1500);
};
```

#### 2. **Changements de Scénario**
```javascript
// Dans ScenarioComparator.jsx
import { trackEvent } from '../utils/tracking';

const handleScenarioSelect = (percentage) => {
  trackEvent('scenario_selected', {
    scenario_percentage: percentage,
    previous_percentage: selectedPercentage,
    revenu_estime: current.totalNet,
    vs_temps_plein: vsTempsPlein.amount,
    page: 'resultats'
  });

  setSelectedPercentage(percentage);
  if (onScenarioSelect) {
    onScenarioSelect(percentage);
  }
};
```

#### 3. **Temps Passé sur les Pages**
```javascript
// Dans chaque composant de page principale
import { useEffect, useRef } from 'react';
import { trackTimeOnPage } from '../utils/tracking';

const Simulateurs = () => {
  const pageStartTime = useRef(Date.now());
  
  useEffect(() => {
    return () => {
      // Track quand l'utilisateur quitte la page
      trackTimeOnPage('simulateur', pageStartTime.current);
    };
  }, []);

  return (
    // ... votre JSX
  );
};
```

### **Priorité 2 - Utiles** ⭐⭐

#### 4. **Interactions avec les Champs du Formulaire**
```javascript
// Dans Simulateurs.jsx
import { trackEvent } from '../utils/tracking';

const handleFieldChange = (fieldName, value) => {
  trackEvent('form_field_changed', {
    field_name: fieldName,
    field_value: value,
    mode: 'simplified'
  });
};

// Utilisation dans les inputs
<input
  onChange={(e) => {
    handleFieldChange('salaire_brut', e.target.value);
    // ... votre logique existante
  }}
/>
```

#### 5. **Scroll Depth (Engagement)**
```javascript
// Dans chaque page principale
import { useEffect } from 'react';
import { initScrollTracking } from '../utils/tracking';

const Simulateurs = () => {
  useEffect(() => {
    return initScrollTracking('simulateur');
  }, []);

  return (
    // ... votre JSX
  );
};
```

#### 6. **Clics sur les CTA**
```javascript
// Dans SwipeNavigation.jsx ou autres composants
import { trackClick } from '../utils/tracking';

const handleCTAClick = (ctaName) => {
  trackClick(ctaName, {
    page: currentPage,
    position: 'header'
  });
};

// Utilisation
<button onClick={() => handleCTAClick('Passer au mode avancé')}>
  Passer au mode avancé
</button>
```

#### 7. **Ouverture/Fermeture des Détails**
```javascript
// Dans FiscalImpact.jsx
import { trackEvent } from '../utils/tracking';

const handleDetailsToggle = () => {
  const newState = !showDetails;
  setShowDetails(newState);
  
  trackEvent('details_toggled', {
    section: 'economies_fiscales',
    action: newState ? 'opened' : 'closed',
    page: 'resultats'
  });
};
```

### **Priorité 3 - Avancés** ⭐

#### 8. **Abandons de Formulaire**
```javascript
// Dans Simulateurs.jsx
import { useEffect, useRef } from 'react';
import { trackEvent } from '../utils/tracking';

const Simulateurs = () => {
  const formStartTime = useRef(null);
  const lastActivityTime = useRef(Date.now());
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleInput = () => {
      if (!formStartTime.current) {
        formStartTime.current = Date.now();
        trackEvent('form_started', {
          mode: 'simplified'
        });
      }
      lastActivityTime.current = Date.now();
    };

    // Vérifier les abandons toutes les 30 secondes
    const checkAbandon = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivityTime.current;
      
      if (timeSinceLastActivity > 120000 && formStartTime.current && !isSubmitted) {
        const timeSpent = Math.round((Date.now() - formStartTime.current) / 1000);
        trackEvent('form_abandoned', {
          mode: 'simplified',
          time_spent_seconds: timeSpent
        });
        formStartTime.current = null;
      }
    }, 30000);

    document.addEventListener('input', handleInput);
    document.addEventListener('change', handleInput);

    return () => {
      clearInterval(checkAbandon);
      document.removeEventListener('input', handleInput);
      document.removeEventListener('change', handleInput);
    };
  }, [isSubmitted]);

  const handleSimulation = async (data) => {
    setIsSubmitted(true);
    // ... votre logique existante
  };
};
```

#### 9. **Navigation entre Pages**
```javascript
// Dans SwipeNavigation.jsx (améliorer l'existant)
import { trackEvent } from '../utils/tracking';

const handlePageChange = (newPage, direction) => {
  trackEvent('navigation_swipe', {
    from_page: currentPage.name,
    to_page: newPage.name,
    direction: direction, // 'left' ou 'right'
    method: 'swipe'
  });
};
```

#### 10. **Erreurs**
```javascript
// Dans un ErrorBoundary ou try/catch
import { trackError } from '../utils/tracking';

try {
  // votre code
} catch (error) {
  trackError('calculation_error', {
    error_message: error.message,
    error_stack: error.stack,
    page: 'simulateur'
  });
}
```

---

## 📝 Implémentation Étape par Étape

### **Étape 1 : Améliorer le Tracking des Calculs**

**Fichier : `src/components/Simulateurs.jsx`**

```javascript
// Ajouter en haut
import { trackEvent, trackTimeOnPage, initScrollTracking } from '../utils/tracking';
import { useEffect, useRef } from 'react';

// Dans le composant
const Simulateurs = () => {
  const pageStartTime = useRef(Date.now());
  
  // Track le temps passé
  useEffect(() => {
    return () => {
      trackTimeOnPage('simulateur', pageStartTime.current);
    };
  }, []);

  // Track le scroll
  useEffect(() => {
    return initScrollTracking('simulateur');
  }, []);

  const handleSimulation = async (data) => {
    // Track le début
    trackEvent('calculation_started', {
      mode: data.mode || 'simplified',
      salaire_brut: data.salaireBrut,
      temps_partiel: data.tempsPartiel,
      age: data.age
    });

    setIsCalculating(true);
    
    setTimeout(() => {
      const results = calculateRetraiteProgressive(data);
      setSimulationData(results);
      setIsCalculating(false);
      
      // Track la fin avec résultats
      trackEvent('calculation_completed', {
        mode: data.mode || 'simplified',
        revenu_total: results.revenusNets?.total || 0,
        economie_fiscale: results.impactFiscal?.economie || 0,
        temps_partiel: data.tempsPartiel,
        revenu_temps_plein: results.revenusNets?.tempsPlein || 0
      });
    }, 1500);
  };

  // ... reste du code
};
```

### **Étape 2 : Ajouter le Tracking des Scénarios**

**Fichier : `src/components/ScenarioComparator.jsx`**

```javascript
// Ajouter en haut
import { trackEvent } from '../utils/tracking';

// Dans le composant, modifier handleScenarioSelect ou la fonction équivalente
const handleScenarioSelect = (percentage) => {
  const previousPercentage = selectedPercentage;
  
  trackEvent('scenario_selected', {
    scenario_percentage: percentage,
    previous_percentage: previousPercentage,
    revenu_estime: current.totalNet,
    vs_temps_plein: vsTempsPlein.amount,
    page: 'resultats'
  });

  setSelectedPercentage(percentage);
  if (onScenarioSelect) {
    onScenarioSelect(percentage);
  }
};
```

### **Étape 3 : Ajouter le Tracking des CTA**

**Fichier : `src/components/SwipeNavigation.jsx` ou composants avec boutons**

```javascript
// Ajouter en haut
import { trackClick } from '../utils/tracking';

// Utilisation
<button 
  onClick={() => {
    trackClick('Passer au mode avancé', {
      page: 'simulateur',
      position: 'header'
    });
    // ... votre logique existante
  }}
>
  Passer au mode avancé
</button>
```

---

## 📊 Visualiser les Données dans GA4

### **1. Vérifier en Temps Réel**

1. Allez sur [analytics.google.com](https://analytics.google.com)
2. **Rapports** → **Engagement** → **Temps réel**
3. Naviguez sur votre site
4. Vous devriez voir les événements apparaître

### **2. Créer un Rapport Personnalisé**

1. **Explorer** → **Créer un rapport**
2. Choisissez **Événements**
3. Ajoutez :
   - **Dimension** : `event_name`
   - **Métrique** : `Event count`
4. Filtrez sur vos événements personnalisés

### **3. Analyser les Funnels**

1. **Explorer** → **Créer un rapport**
2. Choisissez **Funnel exploration**
3. Ajoutez les étapes :
   - `form_started`
   - `calculation_started`
   - `calculation_completed`
4. Visualisez où les utilisateurs abandonnent

---

## 🎯 Événements Recommandés (Checklist)

### **À Implémenter :**

- [ ] `calculation_started` - Début d'un calcul
- [ ] `calculation_completed` - Fin d'un calcul (avec résultats)
- [ ] `scenario_selected` - Changement de scénario
- [ ] `time_on_page` - Temps passé sur une page
- [ ] `scroll_depth` - Profondeur de scroll (25%, 50%, 75%, 100%)
- [ ] `form_field_changed` - Interaction avec un champ
- [ ] `cta_clicked` - Clic sur un bouton CTA
- [ ] `details_toggled` - Ouverture/fermeture des détails
- [ ] `navigation_swipe` - Navigation entre pages
- [ ] `form_abandoned` - Abandon de formulaire (optionnel)
- [ ] `error` - Erreurs (optionnel)

---

## 🧪 Tester le Tracking

### **Mode Développement**

Dans la console du navigateur, vous verrez :
```
📊 GA4 Event: calculation_started {mode: "simplified", ...}
📊 GA4 Event: calculation_completed {revenu_total: 5288, ...}
```

### **Vérifier dans GA4**

1. Allez dans **Rapports** → **Engagement** → **Événements**
2. Recherchez vos événements personnalisés
3. Vérifiez les paramètres envoyés

---

## 🚀 Prochaines Étapes

1. **Implémenter les événements prioritaires** (Priorité 1)
2. **Tester** en mode développement
3. **Vérifier** dans GA4 Real-time
4. **Ajouter les événements utiles** (Priorité 2)
5. **Créer des rapports** personnalisés dans GA4
6. **Analyser** les données pour améliorer l'UX

---

## 💡 Conseils

- ✅ **Commencez petit** : Implémentez d'abord les événements prioritaires
- ✅ **Testez régulièrement** : Vérifiez dans GA4 après chaque ajout
- ✅ **Nommez clairement** : Utilisez des noms d'événements explicites
- ✅ **Ajoutez des paramètres** : Plus de contexte = meilleure analyse
- ✅ **Documentez** : Notez ce que chaque événement track

---

Souhaitez-vous que j'implémente ces événements dans vos composants maintenant ?



