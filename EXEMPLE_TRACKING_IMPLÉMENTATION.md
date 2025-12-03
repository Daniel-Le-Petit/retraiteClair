# 📊 Exemple d'Implémentation du Tracking

## 🎯 Comment Ajouter le Tracking dans Vos Composants

### **1. Dans le Simulateur (Simulateurs.jsx)**

```javascript
import { trackEvent, trackTimeOnPage, initScrollTracking } from '../utils/tracking';
import { useEffect, useRef } from 'react';

const Simulateurs = () => {
  const pageStartTime = useRef(Date.now());
  
  useEffect(() => {
    // Track le temps passé sur la page
    return () => {
      trackTimeOnPage('simulateur', pageStartTime.current);
    };
  }, []);

  useEffect(() => {
    // Track le scroll
    return initScrollTracking('simulateur');
  }, []);

  const handleSimulation = async (data) => {
    // Track le début du calcul
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
      
      // Track la fin du calcul
      trackEvent('calculation_completed', {
        mode: data.mode || 'simplified',
        revenu_total: results.revenusNets?.total || 0,
        economie_fiscale: results.impactFiscal?.economie || 0,
        temps_partiel: data.tempsPartiel
      });
    }, 1500);
  };

  const handleFieldChange = (fieldName, value) => {
    // Track les interactions avec les champs
    trackEvent('form_field_changed', {
      field_name: fieldName,
      field_value: value,
      mode: 'simplified'
    });
  };

  return (
    // ... votre JSX
  );
};
```

### **2. Dans ScenarioComparator (Changements de Scénario)**

```javascript
import { trackEvent } from '../utils/tracking';

const ScenarioComparator = ({ onScenarioSelect, ... }) => {
  const handleScenarioSelect = (percentage) => {
    // Track la sélection d'un scénario
    trackEvent('scenario_selected', {
      scenario_percentage: percentage,
      previous_percentage: selectedPercentage,
      page: 'resultats'
    });

    setSelectedPercentage(percentage);
    if (onScenarioSelect) {
      onScenarioSelect(percentage);
    }
  };

  // Track quand l'utilisateur explore les scénarios
  useEffect(() => {
    trackEvent('scenario_explorer_opened', {
      current_scenario: selectedPercentage
    });
  }, []);

  return (
    // ... votre JSX
  );
};
```

### **3. Dans FiscalImpact (Interactions avec les Économies)**

```javascript
import { trackEvent, trackClick } from '../utils/tracking';

const FiscalImpact = ({ fiscalData, simulationData }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailsToggle = () => {
    const newState = !showDetails;
    setShowDetails(newState);
    
    // Track l'ouverture/fermeture des détails
    trackEvent('details_toggled', {
      section: 'economies_fiscales',
      action: newState ? 'opened' : 'closed',
      page: 'resultats'
    });
  };

  // Track quand l'utilisateur voit les économies
  useEffect(() => {
    if (fiscalData) {
      trackEvent('fiscal_impact_viewed', {
        economie_annuelle: fiscalData.economieAnnuelle || 0,
        economie_mensuelle: fiscalData.economie || 0
      });
    }
  }, [fiscalData]);

  return (
    <button
      className={styles.detailsButton}
      onClick={handleDetailsToggle}
    >
      {/* ... */}
    </button>
  );
};
```

### **4. Dans SwipeNavigation (Navigation)**

```javascript
import { trackEvent } from '../utils/tracking';

const SwipeNavigation = () => {
  const handlePageChange = (newPage, direction) => {
    // Track la navigation
    trackEvent('navigation_swipe', {
      from_page: currentPage.name,
      to_page: newPage.name,
      direction: direction, // 'left' ou 'right'
      method: 'swipe' // ou 'click'
    });
  };

  // Track les clics sur les boutons CTA
  const handleCTAClick = (ctaName, page) => {
    trackEvent('cta_clicked', {
      cta_name: ctaName,
      page: page,
      position: 'header' // ou autre position
    });
  };

  return (
    // ... votre JSX
  );
};
```

### **5. Track les Abandons de Formulaire**

```javascript
import { useEffect, useRef } from 'react';
import { trackEvent } from '../utils/tracking';

const Simulateurs = () => {
  const formStartTime = useRef(null);
  const lastActivityTime = useRef(Date.now());

  useEffect(() => {
    // Démarrer le tracking quand l'utilisateur commence à remplir
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
      
      // Si pas d'activité depuis 2 minutes et formulaire non soumis
      if (timeSinceLastActivity > 120000 && formStartTime.current && !isSubmitted) {
        const timeSpent = Math.round((Date.now() - formStartTime.current) / 1000);
        trackEvent('form_abandoned', {
          mode: 'simplified',
          time_spent_seconds: timeSpent,
          fields_filled: getFilledFieldsCount()
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
  }, []);

  return (
    // ... votre JSX
  );
};
```

---

## 🔧 **Configuration avec Webhook (Optionnel)**

### **1. Créer un fichier `.env`**

```bash
# .env
REACT_APP_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/
```

### **2. Créer un Webhook Zapier/Make.com**

1. Créez un compte sur [Zapier](https://zapier.com) ou [Make.com](https://make.com)
2. Créez un nouveau Zap/Scenario
3. Choisissez "Webhook" comme déclencheur
4. Copiez l'URL du webhook
5. Ajoutez-la dans votre `.env`

### **3. Connecter à Google Sheets ou Base de Données**

Dans Zapier/Make, vous pouvez :
- Envoyer les événements vers Google Sheets
- Envoyer vers une base de données (Airtable, Notion, etc.)
- Envoyer des emails pour certains événements
- Créer des alertes

---

## 📊 **Visualiser les Données**

### **Dans Google Analytics 4 :**

1. Allez sur [analytics.google.com](https://analytics.google.com)
2. **Rapports** → **Engagement** → **Événements**
3. Vous verrez tous vos événements personnalisés

### **Créer des Rapports Personnalisés :**

1. **Explorer** → **Créer un rapport**
2. Choisissez les événements à analyser
3. Ajoutez des dimensions (mode, temps_partiel, etc.)
4. Visualisez les données

---

## 🎯 **Événements Recommandés à Tracker**

### **Priorité 1 (Essentiels) :**
- ✅ `calculation_completed` - Calculs effectués
- ✅ `scenario_selected` - Changements de scénario
- ✅ `page_view` - Vues de pages
- ✅ `time_on_page` - Temps passé

### **Priorité 2 (Utiles) :**
- ✅ `form_field_changed` - Interactions formulaire
- ✅ `scroll_depth` - Engagement
- ✅ `cta_clicked` - Clics sur boutons
- ✅ `details_toggled` - Ouverture détails

### **Priorité 3 (Avancés) :**
- ✅ `form_abandoned` - Abandons
- ✅ `error` - Erreurs
- ✅ `navigation_swipe` - Navigation
- ✅ `fiscal_impact_viewed` - Vues économies

---

## 🚀 **Prochaines Étapes**

1. **Implémenter le tracking** dans vos composants clés
2. **Tester** en mode développement (console)
3. **Vérifier** dans GA4 Real-time
4. **Créer des rapports** personnalisés
5. **Analyser** les données pour améliorer l'UX

Souhaitez-vous que j'implémente le tracking dans un composant spécifique ?






