# 📊 Tracking Amélioré - Événements Implémentés

## ✅ Événements Implémentés (Phase 1)

### 1. **Interactions avec les Sections de Contenu**

#### `section_viewed`
**Quand** : Un utilisateur consulte une section spécifique
**Où** : HomePage (FAQ), ResultsPage (comparaisons, économies fiscales)
**Propriétés** :
- `section_name` : Nom de la section (ex: 'faq', 'scenario_comparison', 'economies_fiscales')
- `section_id` : ID de la section
- `page` : Page actuelle

**Ce que ça vous dit** :
- Quelles sections intéressent le plus les utilisateurs
- Quelles sections sont les plus consultées
- Parcours de lecture des utilisateurs

#### `accordion_opened`
**Quand** : Un utilisateur ouvre un accordéon/FAQ
**Où** : FAQSection
**Propriétés** :
- `accordion_id` : ID de l'accordéon
- `accordion_title` : Titre de la question
- `page` : Page actuelle
- `section` : Section parente

**Ce que ça vous dit** :
- Quelles questions FAQ sont les plus ouvertes
- Quelles questions intéressent le plus
- Points de confusion ou d'intérêt

### 2. **Interactions avec les Boutons CTA**

#### `cta_clicked`
**Quand** : Clic sur un bouton d'action important
**Où** : HomePage, ResultsPage
**Propriétés** :
- `cta_name` : Nom du CTA (ex: 'lancer_simulation', 'voir_detail_calcul')
- `cta_location` : Emplacement du CTA (ex: 'homepage_final_section', 'eligibility_test_popup')
- `page` : Page actuelle
- `action` : Action effectuée (ex: 'expanded')

**Ce que ça vous dit** :
- Quels CTAs sont les plus cliqués
- Où les utilisateurs cliquent le plus
- Taux de conversion par emplacement

### 3. **Détails des Simulations**

#### `simulation_parameters_changed`
**Quand** : L'utilisateur modifie un paramètre dans le formulaire
**Où** : SimplifieForm
**Propriétés** :
- `parameter` : Paramètre modifié (ex: 'salaireBrut', 'tempsPartiel', 'age')
- `old_value` : Ancienne valeur
- `new_value` : Nouvelle valeur
- `mode` : Mode actuel ('simplified' ou 'advanced')

**Ce que ça vous dit** :
- Quels paramètres sont les plus modifiés
- Combien de modifications avant validation
- Valeurs typiques choisies par les utilisateurs
- Comportement d'exploration (test de différentes valeurs)

#### `simulation_mode_switched`
**Quand** : Changement entre mode simplifié et avancé
**Où** : Simulateurs
**Propriétés** :
- `from_mode` : Mode d'origine ('simplified' ou 'advanced')
- `to_mode` : Mode de destination
- `reason` : Raison du changement (ex: 'user_click')

**Ce que ça vous dit** :
- Préférence des utilisateurs (simplifié vs avancé)
- Fréquence des changements de mode
- Utilisateurs qui explorent les deux modes

### 4. **Interactions avec les Résultats**

#### `scenario_comparison_viewed`
**Quand** : L'utilisateur consulte la comparaison de scénarios
**Où** : ScenarioComparator
**Propriétés** :
- `scenarios_count` : Nombre de scénarios disponibles
- `default_scenario` : Scénario par défaut
- `page` : Page actuelle

**Ce que ça vous dit** :
- Combien d'utilisateurs consultent les comparaisons
- Intérêt pour la comparaison de scénarios
- Engagement avec les résultats

#### `scenario_selected`
**Quand** : L'utilisateur sélectionne un scénario
**Où** : ScenarioComparator
**Propriétés** :
- `scenario_percentage` : Pourcentage de temps partiel sélectionné
- `previous_percentage` : Scénario précédent
- `revenu_estime` : Revenu estimé pour ce scénario
- `vs_temps_plein` : Différence avec le temps plein
- `page` : Page actuelle

**Ce que ça vous dit** :
- Scénarios les plus sélectionnés
- Parcours de comparaison (quels scénarios sont testés)
- Préférences des utilisateurs (60%, 70%, 80% ?)

### 5. **Téléchargements et Exports**

#### `document_downloaded`
**Quand** : Téléchargement d'un document
**Où** : PostResultsActions
**Propriétés** :
- `document_type` : Type de document (ex: 'pdf')
- `document_name` : Nom du document (ex: 'simulation_results')
- `contains_data` : Si le document contient des données
- `page` : Page actuelle

**Ce que ça vous dit** :
- Taux de téléchargement PDF
- Engagement avec les résultats
- Utilisateurs qui veulent garder leurs résultats

#### `email_sent`
**Quand** : Envoi d'email avec les résultats
**Où** : PostResultsActions
**Propriétés** :
- `email_type` : Type d'email (ex: 'simulation_results')
- `recipient_count` : Nombre de destinataires
- `page` : Page actuelle

**Ce que ça vous dit** :
- Taux d'envoi d'email
- Engagement avec les résultats
- Utilisateurs qui partagent leurs résultats

## 📈 Informations Capturées

### Pour chaque événement, on capture automatiquement :
- **user_id** : Identifiant unique de l'utilisateur
- **session_id** : Identifiant de session
- **page_url** : URL complète de la page
- **user_agent** : Type d'appareil et navigateur
- **referrer** : Page d'origine
- **created_at** : Date et heure précise

### Informations contextuelles ajoutées :
- **Mode de simulation** : Simplifié ou avancé
- **Valeurs des paramètres** : Salaire, temps partiel, âge
- **Résultats** : Revenus calculés, économies fiscales
- **Position dans le parcours** : Page actuelle, section consultée

## 🎯 Ce que Vous Pouvez Analyser Maintenant

### 1. **Intérêt par Section**
- Quelles sections sont les plus consultées ?
- Quelles questions FAQ sont les plus ouvertes ?
- Quels utilisateurs consultent les économies fiscales ?

### 2. **Comportement de Simulation**
- Combien de modifications avant validation ?
- Quels paramètres sont les plus testés ?
- Préférence pour le mode simplifié ou avancé ?

### 3. **Engagement avec les Résultats**
- Combien consultent les comparaisons de scénarios ?
- Quels scénarios sont les plus sélectionnés ?
- Taux de téléchargement PDF
- Taux d'envoi d'email

### 4. **Parcours Utilisateur**
- Séquence de sections consultées
- Temps passé sur chaque section
- Points d'abandon

### 5. **Préférences Utilisateur**
- Temps partiel le plus choisi (60%, 70%, 80% ?)
- Scénarios les plus comparés
- Sections les plus intéressantes

## 📊 Dashboard - Nouvelles Métriques Possibles

Avec ces événements, vous pourrez ajouter dans le dashboard :

1. **Sections les plus consultées**
   - Graphique des sections par nombre de vues
   - Questions FAQ les plus ouvertes

2. **Comportement de simulation**
   - Nombre moyen de modifications par simulation
   - Paramètres les plus modifiés
   - Préférence de mode (simplifié vs avancé)

3. **Engagement avec les résultats**
   - Taux de consultation des comparaisons
   - Scénarios les plus sélectionnés
   - Taux de téléchargement PDF
   - Taux d'envoi d'email

4. **Parcours utilisateur**
   - Séquence typique de sections consultées
   - Temps moyen par section
   - Points d'abandon

## 🔄 Prochaines Étapes (Phase 2)

Événements à implémenter ensuite :
- `form_field_focused` : Focus sur les champs de formulaire
- `calculation_attempts` : Nombre de tentatives avant validation
- `blog_article_viewed` : Articles de blog consultés
- `external_link_clicked` : Clics sur les liens externes
- `navigation_path` : Parcours complet de l'utilisateur

## 📝 Fichiers Modifiés

- ✅ `src/components/HomePage.js` - Tracking des CTA
- ✅ `src/components/FAQSection.jsx` - Tracking des accordéons et sections
- ✅ `src/components/Simulateurs.jsx` - Tracking des changements de mode
- ✅ `src/components/SimplifieForm.jsx` - Tracking des changements de paramètres
- ✅ `src/components/ResultsPage.jsx` - Tracking des sections consultées
- ✅ `src/components/ScenarioComparator.jsx` - Tracking des comparaisons et sélections
- ✅ `src/components/FiscalImpact.jsx` - Tracking de la vue de la section
- ✅ `src/components/PostResultsActions.jsx` - Tracking des téléchargements et emails
- ✅ `src/components/CalculationDetails.tsx` - Tracking du clic sur "Voir le détail"

## 🎉 Résultat

Vous avez maintenant un tracking beaucoup plus riche qui vous permet de comprendre :
- **Ce que les utilisateurs voient** : Sections consultées, questions ouvertes
- **Ce qui les intéresse** : Scénarios sélectionnés, paramètres testés
- **Leur comportement** : Modifications, changements de mode, téléchargements
- **Leur parcours** : Séquence de sections, temps passé

Tous ces événements sont automatiquement enregistrés dans Supabase et visibles dans votre dashboard !

