# 📊 Améliorations du Tracking - Comprendre les Utilisateurs

## 🎯 Objectif

Tracer plus d'informations sur les choix des utilisateurs pour comprendre :
- Ce qu'ils voient
- Ce qui les intéresse
- Leur parcours sur le site
- Leurs préférences et comportements

## 📋 Nouveaux Événements à Tracker

### 1. **Interactions avec les Sections de Contenu**

#### `section_viewed`
Quand un utilisateur consulte une section spécifique
```javascript
trackEvent('section_viewed', {
  section_name: 'faq',
  section_id: 'eligibilite',
  page: 'accueil'
});
```

Sections à tracker :
- FAQ (et quelle question)
- Guide pratique
- Témoignages
- Avantages
- Étapes
- Économies fiscales
- Comparaison de scénarios

#### `accordion_opened`
Quand un utilisateur ouvre un accordéon/FAQ
```javascript
trackEvent('accordion_opened', {
  accordion_id: 'eligibilite-age',
  accordion_title: 'Quel âge pour la retraite progressive ?',
  page: 'accueil'
});
```

### 2. **Interactions avec les Boutons CTA**

#### `cta_clicked`
Clics sur les boutons d'action importants
```javascript
trackEvent('cta_clicked', {
  cta_name: 'lancer_simulation',
  cta_location: 'homepage_hero',
  page: 'accueil'
});
```

CTAs à tracker :
- "Lancer la simulation" (homepage)
- "Passer au mode avancé"
- "Revenir au mode simplifié"
- "Voir le détail du calcul"
- "Télécharger en PDF"
- "Envoyer par email"
- "Comparer les scénarios"

### 3. **Détails des Simulations**

#### `simulation_parameters_changed`
Quand l'utilisateur modifie un paramètre
```javascript
trackEvent('simulation_parameters_changed', {
  parameter: 'temps_partiel',
  old_value: 60,
  new_value: 80,
  mode: 'simplified'
});
```

#### `simulation_mode_switched`
Changement entre mode simplifié et avancé
```javascript
trackEvent('simulation_mode_switched', {
  from_mode: 'simplified',
  to_mode: 'advanced',
  reason: 'user_click'
});
```

#### `calculation_attempts`
Nombre de tentatives avant validation
```javascript
trackEvent('calculation_attempts', {
  attempts_count: 3,
  final_mode: 'simplified',
  time_before_submit: 120 // secondes
});
```

### 4. **Interactions avec les Résultats**

#### `scenario_comparison_viewed`
Quand l'utilisateur consulte la comparaison de scénarios
```javascript
trackEvent('scenario_comparison_viewed', {
  scenarios_count: 3,
  default_scenario: 80
});
```

#### `scenario_details_expanded`
Ouverture du détail d'un scénario
```javascript
trackEvent('scenario_details_expanded', {
  scenario_percentage: 60,
  section: 'fiscal_impact'
});
```

#### `graph_interaction`
Interactions avec les graphiques
```javascript
trackEvent('graph_interaction', {
  graph_type: 'comparison_chart',
  action: 'hover',
  data_point: 'temps_plein'
});
```

### 5. **Téléchargements et Exports**

#### `document_downloaded`
Téléchargement de documents
```javascript
trackEvent('document_downloaded', {
  document_type: 'pdf',
  document_name: 'simulation_results',
  contains_data: true
});
```

#### `email_sent`
Envoi d'email avec les résultats
```javascript
trackEvent('email_sent', {
  email_type: 'simulation_results',
  recipient_count: 1
});
```

### 6. **Navigation et Parcours**

#### `navigation_path`
Parcours complet de l'utilisateur
```javascript
trackEvent('navigation_path', {
  pages_visited: ['accueil', 'simulateurs', 'resultats'],
  time_on_each_page: [45, 120, 180],
  total_session_time: 345
});
```

#### `external_link_clicked`
Clics sur les liens externes
```javascript
trackEvent('external_link_clicked', {
  link_url: 'https://github.com/...',
  link_text: 'Code source',
  page: 'footer'
});
```

### 7. **Recherche et Filtres**

#### `blog_search`
Recherche dans le blog
```javascript
trackEvent('blog_search', {
  search_query: 'retraite progressive',
  results_count: 5
});
```

#### `blog_article_viewed`
Consultation d'un article de blog
```javascript
trackEvent('blog_article_viewed', {
  article_title: 'Guide retraite progressive 2025',
  article_category: 'guide',
  reading_time: 180
});
```

### 8. **Engagement et Temps**

#### `engagement_time`
Temps d'engagement par section
```javascript
trackEvent('engagement_time', {
  section: 'simulateur',
  time_seconds: 300,
  interactions_count: 5
});
```

#### `form_field_focused`
Focus sur un champ de formulaire
```javascript
trackEvent('form_field_focused', {
  field_name: 'salaire_brut',
  form_step: 1,
  time_to_focus: 5 // secondes depuis le début
});
```

### 9. **Erreurs et Abandons**

#### `form_abandoned`
Abandon d'un formulaire
```javascript
trackEvent('form_abandoned', {
  form_type: 'simulation',
  fields_completed: 2,
  fields_total: 3,
  time_spent: 60
});
```

#### `error_encountered`
Erreurs rencontrées
```javascript
trackEvent('error_encountered', {
  error_type: 'validation',
  error_field: 'age',
  error_message: 'Age invalide'
});
```

### 10. **Préférences Utilisateur**

#### `preference_detected`
Détection de préférences
```javascript
trackEvent('preference_detected', {
  preferred_mode: 'simplified',
  preferred_temps_partiel: 80,
  preferred_section: 'scenarios'
});
```

## 📊 Informations à Capturer dans les Propriétés

Pour chaque événement, capturer :
- **Temps** : Temps passé avant l'action
- **Position** : Où sur la page (scroll position)
- **Contexte** : Page actuelle, mode actuel
- **Historique** : Actions précédentes dans la session
- **Appareil** : Type d'appareil (déjà fait via user_agent)
- **Paramètres** : Valeurs des champs au moment de l'action

## 🎯 Priorités d'Implémentation

### **Phase 1 - Priorité Haute** (À implémenter en premier)
1. ✅ `section_viewed` - Sections consultées
2. ✅ `cta_clicked` - Clics sur les boutons importants
3. ✅ `accordion_opened` - Ouverture des FAQ
4. ✅ `simulation_parameters_changed` - Modifications des paramètres
5. ✅ `scenario_comparison_viewed` - Consultation des comparaisons

### **Phase 2 - Priorité Moyenne**
6. ✅ `document_downloaded` - Téléchargements PDF
7. ✅ `email_sent` - Envoi d'emails
8. ✅ `blog_article_viewed` - Articles consultés
9. ✅ `form_field_focused` - Focus sur les champs
10. ✅ `calculation_attempts` - Tentatives avant validation

### **Phase 3 - Priorité Basse** (Améliorations futures)
11. `graph_interaction` - Interactions avec graphiques
12. `navigation_path` - Parcours complet
13. `external_link_clicked` - Liens externes
14. `blog_search` - Recherche dans le blog
15. `preference_detected` - Préférences détectées

## 📈 Métriques à Analyser dans le Dashboard

Avec ces nouveaux événements, vous pourrez analyser :

1. **Sections les plus consultées**
   - Quelles sections intéressent le plus ?
   - Quelles questions FAQ sont les plus ouvertes ?

2. **Parcours utilisateur**
   - Quel est le parcours typique ?
   - Où les utilisateurs abandonnent-ils ?

3. **Engagement**
   - Combien de temps par section ?
   - Combien d'interactions par utilisateur ?

4. **Préférences**
   - Mode préféré (simplifié vs avancé) ?
   - Temps partiel le plus choisi ?
   - Scénarios les plus comparés ?

5. **Conversions**
   - Taux de complétion des simulations
   - Taux de téléchargement PDF
   - Taux d'envoi d'email

6. **Problèmes**
   - Où les utilisateurs rencontrent des erreurs ?
   - Où abandonnent-ils les formulaires ?

## 🔧 Implémentation

Je vais maintenant implémenter les événements de Phase 1 dans le code.

