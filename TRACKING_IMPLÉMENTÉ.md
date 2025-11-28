# ✅ Tracking GA4 - Événements Prioritaires Implémentés

## 🎯 Événements Ajoutés

### **1. ✅ Calculs Effectués** (`calculation_started` + `calculation_completed`)

**Fichier :** `src/components/Simulateurs.jsx`

**Événements trackés :**
- `calculation_started` : Quand l'utilisateur lance un calcul
  - Paramètres : `mode`, `salaire_brut`, `temps_partiel`, `age`
  
- `calculation_completed` : Quand le calcul est terminé
  - Paramètres : `mode`, `revenu_total`, `economie_fiscale`, `temps_partiel`, `revenu_temps_plein`, `salaire_brut`

**Code ajouté :**
```javascript
// Track le début
trackEvent('calculation_started', {
  mode: mode === 'avance' ? 'advanced' : 'simplified',
  salaire_brut: data.salaireBrut,
  temps_partiel: data.tempsPartiel,
  age: data.age
});

// Track la fin avec résultats
trackEvent('calculation_completed', {
  mode: mode === 'avance' ? 'advanced' : 'simplified',
  revenu_total: results.revenusNets?.total || 0,
  economie_fiscale: results.impactFiscal?.economie || 0,
  temps_partiel: data.tempsPartiel,
  revenu_temps_plein: results.revenusNets?.tempsPlein || 0,
  salaire_brut: data.salaireBrut
});
```

---

### **2. ✅ Changements de Scénario** (`scenario_selected`)

**Fichier :** `src/components/ScenarioComparator.jsx`

**Événement tracké :**
- `scenario_selected` : Quand l'utilisateur clique sur un bloc de scénario
  - Paramètres : `scenario_percentage`, `previous_percentage`, `revenu_estime`, `vs_temps_plein`, `page`

**Code ajouté :**
```javascript
trackEvent('scenario_selected', {
  scenario_percentage: newPercentage,
  previous_percentage: previousPercentage,
  revenu_estime: scenario.totalNet,
  vs_temps_plein: vsTempsPleinDiff.amount,
  page: 'resultats'
});
```

---

### **3. ✅ Temps Passé sur les Pages** (`time_on_page`)

**Fichiers :**
- `src/components/Simulateurs.jsx`
- `src/components/ResultsPage.jsx`

**Événement tracké :**
- `time_on_page` : Temps passé sur une page (en secondes)
  - Paramètres : `page`, `time_seconds`

**Code ajouté :**
```javascript
const pageStartTime = useRef(Date.now());

useEffect(() => {
  return () => {
    trackTimeOnPage('simulateur', pageStartTime.current); // ou 'resultats'
  };
}, []);
```

---

### **4. ✅ Scroll Depth** (`scroll_depth`)

**Fichiers :**
- `src/components/Simulateurs.jsx`
- `src/components/ResultsPage.jsx`

**Événement tracké :**
- `scroll_depth` : Profondeur de scroll (25%, 50%, 75%, 100%)
  - Paramètres : `page`, `depth`

**Code ajouté :**
```javascript
useEffect(() => {
  return initScrollTracking('simulateur'); // ou 'resultats'
}, []);
```

---

## 📊 Événements Disponibles dans GA4

Une fois déployé, vous pourrez voir ces événements dans Google Analytics 4 :

1. **Rapports** → **Engagement** → **Événements**
2. Recherchez :
   - `calculation_started`
   - `calculation_completed`
   - `scenario_selected`
   - `time_on_page`
   - `scroll_depth`

---

## 🧪 Tester le Tracking

### **Mode Développement**

1. Ouvrez la console du navigateur (F12)
2. Naviguez sur votre site
3. Vous devriez voir :
   ```
   📊 GA4 Event: calculation_started {mode: "simplified", ...}
   📊 GA4 Event: calculation_completed {revenu_total: 5288, ...}
   📊 GA4 Event: scenario_selected {scenario_percentage: 60, ...}
   📊 GA4 Event: time_on_page {page: "simulateur", time_seconds: 45}
   📊 GA4 Event: scroll_depth {page: "simulateur", depth: 50}
   ```

### **Vérifier dans GA4 Real-time**

1. Allez sur [analytics.google.com](https://analytics.google.com)
2. **Rapports** → **Engagement** → **Temps réel**
3. Naviguez sur votre site
4. Les événements devraient apparaître dans les 30 secondes

---

## 📈 Prochaines Étapes (Optionnel)

### **Événements Utiles à Ajouter Plus Tard :**

- [ ] `form_field_changed` - Interactions avec les champs
- [ ] `cta_clicked` - Clics sur les boutons CTA
- [ ] `details_toggled` - Ouverture/fermeture des détails
- [ ] `navigation_swipe` - Navigation entre pages
- [ ] `form_abandoned` - Abandons de formulaire

Voir `GUIDE_GA4_IMPLÉMENTATION.md` pour les détails.

---

## ✅ Résumé

**3 événements prioritaires implémentés :**
1. ✅ Calculs (début + fin)
2. ✅ Sélection de scénarios
3. ✅ Temps passé + scroll depth

**Fichiers modifiés :**
- `src/components/Simulateurs.jsx`
- `src/components/ScenarioComparator.jsx`
- `src/components/ResultsPage.jsx`

**Prêt pour la production !** 🚀


