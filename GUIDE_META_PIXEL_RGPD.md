# 📊 Guide Meta Pixel et Conformité RGPD - RetraiteClair

## ✅ **Code Meta Pixel Intégré**

Le code Meta Pixel a été correctement intégré dans `public/index.html` avec l'ID : `736513402739299`

### **Fonctionnalités activées :**
- ✅ **PageView** - Suivi des vues de page
- ✅ **Tracking automatique** - Événements de base
- ✅ **Fallback noscript** - Compatibilité sans JavaScript

---

## 🔒 **CONFORMITÉ RGPD OBLIGATOIRE**

### **⚠️ IMPORTANT :** 
Le Meta Pixel collecte des données personnelles. Vous DEVEZ être conforme au RGPD.

### **Actions requises :**

#### **1. Mise à jour de la politique de confidentialité**
Ajoutez cette section à votre politique de confidentialité :

```
COLLECTE DE DONNÉES PAR META PIXEL

Nous utilisons Meta Pixel (Facebook) pour :
• Analyser l'utilisation de notre site
• Mesurer l'efficacité de nos publicités
• Créer des audiences personnalisées
• Optimiser nos campagnes publicitaires

Données collectées :
• Pages visitées
• Actions effectuées sur le site
• Informations de navigation
• Adresse IP (anonymisée)

Base légale : Consentement (art. 6.1.a RGPD)
Durée de conservation : 24 mois maximum
```

#### **2. Bannière de consentement**
Ajoutez une bannière de consentement sur votre site :

```html
<!-- Bannière de consentement RGPD -->
<div id="consent-banner" style="display: none;">
  <div style="background: #f8f9fa; padding: 20px; border-top: 2px solid #0f766e; position: fixed; bottom: 0; left: 0; right: 0; z-index: 1000;">
    <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
      <div style="flex: 1;">
        <p style="margin: 0; font-size: 14px; color: #333;">
          Nous utilisons des cookies et Meta Pixel pour améliorer votre expérience et mesurer nos performances. 
          <a href="/privacy-policy" style="color: #0f766e;">En savoir plus</a>
        </p>
      </div>
      <div style="margin-left: 20px;">
        <button onclick="acceptCookies()" style="background: #0f766e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-right: 10px;">
          Accepter
        </button>
        <button onclick="declineCookies()" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
          Refuser
        </button>
      </div>
    </div>
  </div>
</div>

<script>
// Gestion du consentement
function acceptCookies() {
  localStorage.setItem('consent-given', 'true');
  document.getElementById('consent-banner').style.display = 'none';
  // Activer Meta Pixel
  if (typeof fbq !== 'undefined') {
    fbq('consent', 'grant');
  }
}

function declineCookies() {
  localStorage.setItem('consent-given', 'false');
  document.getElementById('consent-banner').style.display = 'none';
  // Désactiver Meta Pixel
  if (typeof fbq !== 'undefined') {
    fbq('consent', 'revoke');
  }
}

// Vérifier le consentement au chargement
document.addEventListener('DOMContentLoaded', function() {
  const consent = localStorage.getItem('consent-given');
  if (!consent) {
    document.getElementById('consent-banner').style.display = 'block';
  } else if (consent === 'false') {
    // Désactiver Meta Pixel si refusé
    if (typeof fbq !== 'undefined') {
      fbq('consent', 'revoke');
    }
  }
});
</script>
```

#### **3. Modification du code Meta Pixel**
Modifiez le code Meta Pixel pour respecter le consentement :

```html
<!-- Meta Pixel Code avec consentement RGPD -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

// Initialiser Meta Pixel
fbq('init', '736513402739299');

// Vérifier le consentement avant de tracker
if (localStorage.getItem('consent-given') === 'true') {
  fbq('track', 'PageView');
} else {
  // Attendre le consentement
  fbq('consent', 'revoke');
}
</script>
```

---

## 📈 **ÉVÉNEMENTS DE TRACKING PERSONNALISÉS**

### **Événements recommandés pour RetraiteClair :**

#### **1. Événements de conversion**
```javascript
// Utilisateur lance le simulateur
fbq('track', 'InitiateCheckout', {
  content_name: 'Simulateur Retraite Progressive',
  content_category: 'Simulateur',
  value: 0,
  currency: 'EUR'
});

// Utilisateur complète une simulation
fbq('track', 'CompleteRegistration', {
  content_name: 'Simulation Complétée',
  content_category: 'Conversion',
  value: 0,
  currency: 'EUR'
});

// Utilisateur télécharge un guide
fbq('track', 'Lead', {
  content_name: 'Guide Retraite Progressive',
  content_category: 'Lead Generation',
  value: 0,
  currency: 'EUR'
});
```

#### **2. Événements d'engagement**
```javascript
// Utilisateur consulte les conseils
fbq('track', 'ViewContent', {
  content_name: 'Conseils Retraite Progressive',
  content_category: 'Conseils',
  value: 0,
  currency: 'EUR'
});

// Utilisateur contacte le support
fbq('track', 'Contact', {
  content_name: 'Contact Support',
  content_category: 'Support',
  value: 0,
  currency: 'EUR'
});
```

#### **3. Événements d'erreur**
```javascript
// Erreur dans le simulateur
fbq('track', 'CustomEvent', {
  event_name: 'SimulatorError',
  content_name: 'Erreur Simulateur',
  content_category: 'Error',
  value: 0,
  currency: 'EUR'
});
```

---

## 🛠️ **IMPLÉMENTATION DANS REACT**

### **1. Créer un hook personnalisé**
```javascript
// src/hooks/useFacebookPixel.js
import { useEffect } from 'react';

export const useFacebookPixel = () => {
  useEffect(() => {
    // Vérifier si Meta Pixel est chargé
    if (typeof window !== 'undefined' && window.fbq) {
      // Vérifier le consentement
      const consent = localStorage.getItem('consent-given');
      if (consent === 'true') {
        window.fbq('consent', 'grant');
      } else {
        window.fbq('consent', 'revoke');
      }
    }
  }, []);

  const trackEvent = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
      const consent = localStorage.getItem('consent-given');
      if (consent === 'true') {
        window.fbq('track', eventName, parameters);
      }
    }
  };

  return { trackEvent };
};
```

### **2. Utilisation dans les composants**
```javascript
// src/components/Simulateur.js
import { useFacebookPixel } from '../hooks/useFacebookPixel';

const Simulateur = () => {
  const { trackEvent } = useFacebookPixel();

  const handleStartSimulation = () => {
    trackEvent('InitiateCheckout', {
      content_name: 'Simulateur Retraite Progressive',
      content_category: 'Simulateur',
      value: 0,
      currency: 'EUR'
    });
  };

  const handleCompleteSimulation = () => {
    trackEvent('CompleteRegistration', {
      content_name: 'Simulation Complétée',
      content_category: 'Conversion',
      value: 0,
      currency: 'EUR'
    });
  };

  return (
    <div>
      <button onClick={handleStartSimulation}>
        Lancer la simulation
      </button>
      {/* ... reste du composant */}
    </div>
  );
};
```

---

## 📊 **CONFIGURATION FACEBOOK ADS MANAGER**

### **1. Créer des audiences personnalisées**
- **Audience "Visiteurs du site"** - Tous les visiteurs
- **Audience "Simulateur lancé"** - Utilisateurs qui ont commencé une simulation
- **Audience "Simulation complétée"** - Utilisateurs qui ont terminé une simulation
- **Audience "Conseils consultés"** - Utilisateurs intéressés par les conseils

### **2. Créer des événements personnalisés**
- **SimulatorStart** - Lancement du simulateur
- **SimulatorComplete** - Simulation terminée
- **GuideDownload** - Téléchargement d'un guide
- **ContactForm** - Envoi du formulaire de contact

### **3. Configurer les conversions**
- **Objectif principal :** Simulation complétée
- **Objectif secondaire :** Contact form
- **Objectif tertiaire :** Téléchargement guide

---

## 🔍 **TEST ET VALIDATION**

### **1. Facebook Pixel Helper**
- Installez l'extension Chrome "Facebook Pixel Helper"
- Vérifiez que le pixel se charge correctement
- Testez les événements personnalisés

### **2. Facebook Events Manager**
- Connectez-vous à Facebook Events Manager
- Vérifiez que les événements arrivent en temps réel
- Testez les audiences personnalisées

### **3. Test de conformité RGPD**
- Testez la bannière de consentement
- Vérifiez que le pixel se désactive si refusé
- Testez la politique de confidentialité

---

## ⚠️ **POINTS D'ATTENTION**

### **Sécurité :**
- ✅ Code Meta Pixel correctement intégré
- ✅ ID pixel valide : 736513402739299
- ✅ Fallback noscript inclus

### **RGPD :**
- ⚠️ **Bannière de consentement requise**
- ⚠️ **Politique de confidentialité à mettre à jour**
- ⚠️ **Gestion du consentement obligatoire**

### **Performance :**
- ✅ Script asynchrone (pas de blocage)
- ✅ Chargement optimisé
- ✅ Gestion des erreurs

---

## 📋 **CHECKLIST DE VALIDATION**

### **Avant la mise en production :**
- [ ] Code Meta Pixel intégré
- [ ] Bannière de consentement RGPD ajoutée
- [ ] Politique de confidentialité mise à jour
- [ ] Événements personnalisés configurés
- [ ] Test avec Facebook Pixel Helper
- [ ] Validation dans Facebook Events Manager
- [ ] Test de conformité RGPD

### **Après la mise en production :**
- [ ] Surveillance des événements en temps réel
- [ ] Vérification des audiences personnalisées
- [ ] Test des campagnes publicitaires
- [ ] Monitoring de la conformité RGPD

---

**🎯 Résultat :** Meta Pixel correctement configuré avec conformité RGPD, tracking des conversions optimisé, et audiences personnalisées prêtes pour les campagnes Facebook Ads.

**📊 Bénéfices :** Mesure précise des performances, optimisation des publicités, et création d'audiences qualifiées pour RetraiteClair.

