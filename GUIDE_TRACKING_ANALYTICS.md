# 📊 Guide Complet : Tracking & Analytics pour Site Statique sur Render

## 🎯 Solutions pour Site Statique

Votre site est déjà équipé de **Google Analytics 4 (GA4)**. Voici comment l'améliorer et ajouter d'autres solutions.

---

## ✅ **OPTION 1 : Améliorer GA4 Existant (Recommandé)**

### **Avantages :**
- ✅ Déjà configuré et fonctionnel
- ✅ Gratuit
- ✅ Respecte le RGPD
- ✅ Pas besoin de backend

### **Événements à Tracker :**

#### **1. Interactions Simulateur**
```javascript
// Dans Simulateurs.jsx ou CalculateurAvance.js
import { useGA4 } from '../hooks/useGA4';

const { trackEvent } = useGA4();

// Quand l'utilisateur remplit un champ
trackEvent('form_field_filled', {
  field_name: 'salaire_brut',
  field_value: salaireBrut,
  mode: 'simplified' // ou 'advanced'
});

// Quand l'utilisateur change le temps partiel
trackEvent('temps_partiel_changed', {
  previous_value: oldValue,
  new_value: newValue,
  percentage: newValue
});

// Quand l'utilisateur lance un calcul
trackEvent('calculation_started', {
  mode: 'simplified',
  salaire_brut: salaireBrut,
  temps_partiel: tempsPartiel,
  age: age
});

// Quand le calcul est terminé
trackEvent('calculation_completed', {
  mode: 'simplified',
  revenu_total: totalNet,
  economie_fiscale: economie,
  temps_partiel: tempsPartiel
});

// Quand l'utilisateur change de scénario
trackEvent('scenario_selected', {
  scenario_percentage: percentage,
  revenu_estime: revenu,
  vs_temps_plein: difference
});
```

#### **2. Interactions Pages**
```javascript
// Dans SwipeNavigation.jsx
trackEvent('navigation_swipe', {
  from_page: previousPage,
  to_page: newPage,
  direction: 'left' // ou 'right'
});

// Quand l'utilisateur clique sur un bouton CTA
trackEvent('cta_clicked', {
  cta_name: 'Passer au mode avancé',
  page: 'simulateur',
  position: 'header'
});

// Quand l'utilisateur ouvre les détails
trackEvent('details_expanded', {
  section: 'economies_fiscales',
  page: 'resultats'
});
```

#### **3. Engagement & Temps**
```javascript
// Temps passé sur une page
let startTime = Date.now();

useEffect(() => {
  return () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackEvent('time_on_page', {
      page: currentPage,
      time_seconds: timeSpent
    });
  };
}, [currentPage]);

// Scroll depth
let maxScroll = 0;
window.addEventListener('scroll', () => {
  const scrollPercent = Math.round(
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  );
  if (scrollPercent > maxScroll) {
    maxScroll = scrollPercent;
    if (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 100) {
      trackEvent('scroll_depth', {
        page: currentPage,
        depth: scrollPercent
      });
    }
  }
});
```

---

## 🔧 **OPTION 2 : Services Tiers (Sans Backend)**

### **A. Plausible Analytics (Recommandé pour Privacy)**

**Avantages :**
- ✅ 100% RGPD compliant
- ✅ Pas de cookies
- ✅ Dashboard simple
- ✅ Gratuit jusqu'à 10k vues/mois

**Installation :**
```html
<!-- Dans public/index.html -->
<script defer data-domain="retraiteclair.onrender.com" src="https://plausible.io/js/script.js"></script>
```

**Tracking personnalisé :**
```javascript
// Événements personnalisés
plausible('Calculation Completed', {
  props: {
    mode: 'simplified',
    temps_partiel: '60%'
  }
});
```

### **B. PostHog (Open Source)**

**Avantages :**
- ✅ Open source
- ✅ Session replay
- ✅ Feature flags
- ✅ Gratuit jusqu'à 1M événements/mois

**Installation :**
```bash
npm install posthog-js
```

```javascript
// src/utils/posthog.js
import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
  posthog.init('YOUR_API_KEY', {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') console.log('PostHog loaded');
    }
  });
}

export default posthog;
```

### **C. Mixpanel**

**Avantages :**
- ✅ Très puissant pour l'analyse comportementale
- ✅ Funnels et cohortes
- ✅ Gratuit jusqu'à 20M événements/mois

**Installation :**
```bash
npm install mixpanel-browser
```

```javascript
// src/utils/mixpanel.js
import mixpanel from 'mixpanel-browser';

mixpanel.init('YOUR_TOKEN', {
  debug: process.env.NODE_ENV === 'development'
});

export default mixpanel;
```

---

## 🚀 **OPTION 3 : Backend Simple (Plus de Contrôle)**

### **Solution A : API Serverless (Vercel/Netlify Functions)**

Créer un endpoint pour logger les événements :

```javascript
// api/track.js (Vercel Function)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event, properties, userId } = req.body;

  // Logger dans une base de données (MongoDB, Supabase, etc.)
  // Exemple avec Supabase :
  const { data, error } = await supabase
    .from('events')
    .insert([
      {
        event,
        properties,
        user_id: userId,
        timestamp: new Date().toISOString(),
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
      }
    ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true });
}
```

**Utilisation côté client :**
```javascript
// src/utils/tracking.js
export const trackEvent = async (eventName, properties = {}) => {
  // Envoyer à GA4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }

  // Envoyer à votre API
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        properties,
        userId: getUserId() // localStorage ou cookie
      })
    });
  } catch (error) {
    console.error('Tracking error:', error);
  }
};
```

### **Solution B : Webhook vers Service Externe**

Utiliser un service comme **Zapier**, **Make.com**, ou **n8n** pour recevoir les événements :

```javascript
// src/utils/tracking.js
export const trackEvent = async (eventName, properties = {}) => {
  // GA4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }

  // Webhook
  try {
    await fetch('https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        properties,
        timestamp: new Date().toISOString(),
        url: window.location.href
      })
    });
  } catch (error) {
    console.error('Webhook error:', error);
  }
};
```

---

## 📋 **OPTION 4 : Base de Données Simple (Supabase/Firebase)**

### **Supabase (Recommandé)**

**Avantages :**
- ✅ Gratuit jusqu'à 500MB
- ✅ API REST automatique
- ✅ Dashboard SQL
- ✅ Fonctionne avec sites statiques

**Installation :**
```bash
npm install @supabase/supabase-js
```

**Configuration :**
```javascript
// src/utils/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Table SQL à créer dans Supabase :
/*
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_name TEXT NOT NULL,
  properties JSONB,
  user_id TEXT,
  session_id TEXT,
  page_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
*/
```

**Tracking :**
```javascript
// src/utils/tracking.js
import { supabase } from './supabase';

export const trackEvent = async (eventName, properties = {}) => {
  // GA4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }

  // Supabase
  const { error } = await supabase
    .from('events')
    .insert([
      {
        event_name: eventName,
        properties,
        user_id: getUserId(),
        session_id: getSessionId(),
        page_url: window.location.href
      }
    ]);

  if (error) console.error('Supabase tracking error:', error);
};
```

---

## 🎯 **Recommandation pour Votre Site**

### **Solution Hybride (Meilleur rapport qualité/prix) :**

1. **GA4** (déjà en place) - pour les métriques générales
2. **Supabase** - pour les événements personnalisés et analyses avancées
3. **Plausible** (optionnel) - pour une alternative privacy-friendly

### **Événements Prioritaires à Tracker :**

1. ✅ **Calculs effectués** (déjà fait)
2. ✅ **Changements de scénario** (à ajouter)
3. ✅ **Temps passé sur chaque page**
4. ✅ **Scroll depth**
5. ✅ **Clics sur CTA**
6. ✅ **Mode simplifié vs avancé**
7. ✅ **Abandons de formulaire**

---

## 📝 **Prochaines Étapes**

1. **Améliorer le hook GA4** avec plus d'événements
2. **Ajouter Supabase** pour le tracking personnalisé
3. **Créer un dashboard** pour visualiser les données

Souhaitez-vous que je vous aide à implémenter une de ces solutions ?

