import React, { useState, useEffect } from 'react';
import { Calculator, BarChart3, TrendingUp, Euro, User, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const CalculateurAvance = () => {
  const [activeTab, setActiveTab] = useState('saisie');
  const [expandedSections, setExpandedSections] = useState({
    saisie: true,
    resultats: false,
    scenarios: false
  });
  const [formData, setFormData] = useState({
    salaireBrut: '',
    debutRetraite: '',
    tempsPartiel: 60,
    // Mode avancé
    salaireAnnuelMoyen: '',
    trimestresValides: '',
    anneeNaissance: '', // Pour calculer automatiquement les trimestres requis
    pensionEstimee: '' // Optionnel pour comparaison
  });
  const [resultats, setResultats] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [maintienCotisation100, setMaintienCotisation100] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showAdvancedMode, setShowAdvancedMode] = useState(false);

  // Fonction pour calculer les trimestres requis en fonction de l'année de naissance
  const calculateTrimestresRequis = (anneeNaissance) => {
    if (!anneeNaissance) return 166; // Valeur par défaut
    
    const birthYear = parseInt(anneeNaissance);
    
    // Règles selon l'année de naissance
    if (birthYear <= 1951) {
      return 150; // 37,5 ans
    } else if (birthYear <= 1952) {
      return 152; // 38 ans
    } else if (birthYear <= 1953) {
      return 154; // 38,5 ans
    } else if (birthYear <= 1954) {
      return 156; // 39 ans
    } else if (birthYear <= 1955) {
      return 158; // 39,5 ans
    } else if (birthYear <= 1956) {
      return 160; // 40 ans
    } else if (birthYear <= 1957) {
      return 161; // 40,25 ans
    } else if (birthYear <= 1958) {
      return 162; // 40,5 ans
    } else if (birthYear <= 1959) {
      return 163; // 40,75 ans
    } else if (birthYear <= 1960) {
      return 164; // 41 ans
    } else if (birthYear <= 1961) {
      return 165; // 41,25 ans
    } else {
      return 166; // 41,5 ans (nés après 1961)
    }
  };

  // Fonction de validation pour l'onglet Résultats
  const validateForResults = () => {
    if (!formData.salaireBrut || formData.salaireBrut === '') {
      setValidationError('Vous devez entrer le "Salaire brut mensuel"');
      return false;
    }
    
    if (!formData.debutRetraite) {
      setValidationError('Vous devez sélectionner une date de début de retraite progressive');
      return false;
    }
    
    setValidationError('');
    return true;
  };

  // Charger les données sauvegardées au montage
  useEffect(() => {
    const savedData = localStorage.getItem('retraiteClair_personalInfo');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Calculer les résultats quand les données changent
  useEffect(() => {
    if (formData.salaireBrut && formData.tempsPartiel) {
      const salaireBrut = parseFloat(formData.salaireBrut);
      const salaireNet = salaireBrut * 0.78; // -22% de cotisations
      let salairePartiel = salaireNet * (formData.tempsPartiel / 100);
      
      // Si maintien cotisations à 100%, déduire les cotisations supplémentaires
      if (maintienCotisation100) {
        const cotisationsNormales = salaireBrut * (formData.tempsPartiel / 100) * 0.22;
        const cotisationsSur100 = salaireBrut * 0.22;
        const cotisationsSupplementaires = cotisationsSur100 - cotisationsNormales;
        salairePartiel = salairePartiel - cotisationsSupplementaires;
      }
      
      // Calcul de la pension selon le mode
      let pensionProgressive, pensionEstimeeFinale;
      let calculAvecTrimestres = false;
      let modeCalcul = 'simplifie';
      
      if (showAdvancedMode && formData.salaireAnnuelMoyen && formData.trimestresValides && formData.anneeNaissance) {
        // Mode avancé : calcul avec trimestres
        const salaireAnnuelMoyen = parseFloat(formData.salaireAnnuelMoyen);
        const trimestresValides = parseFloat(formData.trimestresValides);
        const trimestresRequis = calculateTrimestresRequis(formData.anneeNaissance);
        
        // Formule officielle : (Salaire annuel × 50%) × (Trimestres validés / Trimestres requis)
        const pensionAnnuelle = (salaireAnnuelMoyen * 0.5) * Math.min(1, trimestresValides / trimestresRequis);
        pensionEstimeeFinale = pensionAnnuelle / 12; // Conversion en mensuel
        calculAvecTrimestres = true;
        modeCalcul = 'avance';
      } else {
        // Mode simplifié : estimation basée sur le salaire brut
        // Taux de remplacement moyen de 45% du salaire net
        pensionEstimeeFinale = salaireNet * 0.45;
        modeCalcul = 'simplifie';
      }
      
      pensionProgressive = pensionEstimeeFinale * (1 - formData.tempsPartiel / 100);
      const revenuTotal = salairePartiel + pensionProgressive;
      
      // Calcul des pertes
      const perteSalaire = salaireNet - salairePartiel;
      const pertePension = pensionEstimeeFinale - pensionProgressive;

      setResultats({
        salairePartiel: salairePartiel.toFixed(0),
        pensionProgressive: pensionProgressive.toFixed(0),
        revenuTotal: revenuTotal.toFixed(0),
        pensionEstimee: Math.round(pensionEstimeeFinale),
        salaireActuel: salaireBrut,
        salaireNet: salaireNet.toFixed(0),
        calculAvecTrimestres: calculAvecTrimestres,
        pensionEstimeeFinale: Math.round(pensionEstimeeFinale),
        modeCalcul: modeCalcul,
        perteSalaire: perteSalaire.toFixed(0),
        pertePension: pertePension.toFixed(0),
        // Comparaison avec pension fournie si disponible
        pensionFournie: formData.pensionEstimee ? parseFloat(formData.pensionEstimee) : null
      });
    }
  }, [formData, maintienCotisation100, showAdvancedMode]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Sauvegarder automatiquement les données dans le localStorage
  useEffect(() => {
    if (formData.salaireBrut || formData.anneeNaissance) {
      localStorage.setItem('retraiteClair_personalInfo', JSON.stringify(formData));
    }
  }, [formData]);

  // Vérifier si tous les champs requis sont remplis
  const isFormComplete = () => {
    return formData.salaireBrut && 
           formData.debutRetraite && 
           formData.tempsPartiel;
  };

  // Fonctions pour le sélecteur de date
  const openDatePicker = () => {
    setShowDatePicker(true);
    setSelectedYear('');
    setSelectedMonth('');
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
    setSelectedYear('');
    setSelectedMonth('');
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setSelectedMonth('');
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    const dateString = `${selectedYear}-${month.toString().padStart(2, '0')}-01`;
    handleInputChange('debutRetraite', dateString);
    closeDatePicker();
  };

  // Générer les années (2025-2035)
  const years = Array.from({ length: 11 }, (_, i) => 2025 + i);
  
  // Générer les mois
  const months = [
    { value: 1, label: 'Janvier' },
    { value: 2, label: 'Février' },
    { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' },
    { value: 5, label: 'Mai' },
    { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' },
    { value: 8, label: 'Août' },
    { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Décembre' }
  ];

  const scenarios = [
    { nom: 'Minimum légal', tempsPartiel: 40, couleur: '#8b5cf6' },
    { nom: 'Conservateur', tempsPartiel: 50, couleur: '#ef4444' },
    { nom: 'Équilibré', tempsPartiel: 60, couleur: '#10b981' },
    { nom: 'Progressif', tempsPartiel: 70, couleur: '#3b82f6' },
    { nom: 'Maximum légal', tempsPartiel: 80, couleur: '#f59e0b' }
  ];

  const calculerScenario = (tempsPartiel, avecCotisation100 = false) => {
    if (!formData.salaireBrut || !formData.pensionEstimee) return null;
    
    const salaireNet = formData.salaireBrut * 0.78; // Salaire net (- 22% cotisations)
    let salairePartiel = salaireNet * (tempsPartiel / 100);
    
    // Si maintien cotisations à 100%, on déduit les cotisations supplémentaires
    if (avecCotisation100) {
      const cotisationsNormales = formData.salaireBrut * (tempsPartiel / 100) * 0.22;
      const cotisationsSur100 = formData.salaireBrut * 0.22;
      const cotisationsSupplementaires = cotisationsSur100 - cotisationsNormales;
      salairePartiel = salairePartiel - cotisationsSupplementaires;
    }
    
    const pensionProgressive = formData.pensionEstimee * (1 - tempsPartiel / 100);
    const revenuTotal = salairePartiel + pensionProgressive;

    return {
      salairePartiel: salairePartiel.toFixed(0),
      pensionProgressive: pensionProgressive.toFixed(0),
      revenuTotal: revenuTotal.toFixed(0)
    };
  };

  const tabs = [
    { id: 'saisie', label: 'Saisie', icon: Calculator },
    { id: 'resultats', label: 'Résultats', icon: BarChart3 },
    { id: 'scenarios', label: 'Scénarios', icon: TrendingUp }
  ];

  return (
    <div className="page-content">
      <div className="calculateur-avance-container">
        <div className="section-header">
          <h1 className="section-title">Estimation de votre retraite progressive</h1>
          <p className="section-description">
            Saisissez vos données, consultez vos résultats et comparez différents scénarios
          </p>
          <div className="disclaimer-notice">
            <p>Cet outil fournit une estimation indicative. Pour une projection complète, consultez le simulateur officiel M@rel.</p>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="tabs-navigation">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  if (tab.id === 'resultats') {
                    if (validateForResults()) {
                      setActiveTab(tab.id);
                    }
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Message d'erreur de validation */}
        {validationError && (
          <div className="validation-error">
            <p>{validationError}</p>
          </div>
        )}

        {/* Contenu des onglets */}
        <div className="tab-content">
          {/* Onglet Saisie */}
          {activeTab === 'saisie' && (
            <div className="saisie-tab">
              {/* Section Mode Simplifié */}
              <div className="form-section">
                <div className="section-header">
                  <h3>⚡ Simulation simplifiée</h3>
                  <p>Obtenez une estimation rapide avec les informations de base</p>
                </div>
                
                <div className="form-grid">
                  <div className="form-group required">
                    <label className="form-label">
                      <Euro size={18} />
                      Salaire brut mensuel (€) <span className="required-star">*</span>
                    </label>
                    <p className="field-explanation">Votre salaire brut actuel</p>
                    <input
                      type="number"
                      value={formData.salaireBrut}
                      onChange={(e) => handleInputChange('salaireBrut', e.target.value)}
                      placeholder="Ex: 3200"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group required">
                    <label className="form-label">
                      <Calendar size={18} />
                      Date de début souhaitée <span className="required-star">*</span>
                    </label>
                    <p className="field-explanation">Quand souhaitez-vous commencer votre retraite progressive ?</p>
                    <div className="date-input-container">
                      <input
                        type="date"
                        value={formData.debutRetraite}
                        onChange={(e) => handleInputChange('debutRetraite', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group required full-width">
                    <label className="form-label">
                      <Clock size={18} />
                      Temps partiel souhaité (%) <span className="required-star">*</span>
                    </label>
                    <p className="field-explanation">Détermine la part de salaire et la fraction de retraite</p>
                    <div className="slider-container-modern">
                      <div className="slider-wrapper">
                        <div className="slider-track-modern">
                          <div 
                            className="slider-fill" 
                            style={{ width: `${((formData.tempsPartiel - 40) / 40) * 100}%` }}
                          ></div>
                          <input
                            type="range"
                            min="40"
                            max="80"
                            step="10"
                            value={formData.tempsPartiel}
                            onChange={(e) => handleInputChange('tempsPartiel', e.target.value)}
                            className="slider-input-modern"
                          />
                        </div>
                        <div className="slider-labels">
                          <span className="slider-label">40%</span>
                          <span className="slider-label">50%</span>
                          <span className="slider-label">60%</span>
                          <span className="slider-label">70%</span>
                          <span className="slider-label">80%</span>
                        </div>
                      </div>
                    </div>
                    <div className="slider-value-display">
                      <span className="slider-value-text">{formData.tempsPartiel}%</span>
                    </div>
                  </div>
                </div>

                {/* Bouton pour mode avancé */}
                <div className="advanced-toggle-section">
                  <button 
                    className={`btn-advanced-toggle ${showAdvancedMode ? 'revert-mode' : ''}`}
                    onClick={() => setShowAdvancedMode(!showAdvancedMode)}
                  >
                    {showAdvancedMode ? '🔄 Revenir au mode simplifié' : '🎯 Affiner avec des données précises'}
                  </button>
                  <p className="advanced-explanation">
                    {showAdvancedMode ? 
                      'Mode simplifié : estimation basée sur votre salaire brut' : 
                      'Mode avancé : calcul précis avec votre salaire annuel moyen et vos trimestres'
                    }
                  </p>
                </div>
              </div>

              {/* Section Mode Avancé */}
              {showAdvancedMode && (
                <div className="form-section advanced-section">
                  <div className="section-header">
                    <h3>🎯 Mode avancé - Calcul précis</h3>
                    <p>Affinez votre estimation avec des données détaillées pour un résultat plus proche de la réalité</p>
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-group advanced-field">
                        <label className="form-label">
                          <Euro size={18} />
                          Salaire annuel moyen des 25 meilleures années (€ brut)
                        </label>
                        <p className="field-explanation">Base de calcul officielle pour votre pension - <strong>en salaire brut</strong></p>
                      <div className="data-source-info">
                        <span className="source-label">📄 Où trouver cette info :</span>
                        <ul className="source-list">
                          <li>📊 <strong>Simulateur M@rel</strong> sur <a href="https://www.assuranceretraite.fr" target="_blank" rel="noopener noreferrer">assuranceretraite.fr</a></li>
                          <li>📋 <strong>Relevé de carrière</strong> téléchargeable sur votre compte</li>
                          <li>💼 <strong>Fiches de paie</strong> de vos 25 meilleures années</li>
                        </ul>
                      </div>
                      <input
                        type="number"
                        value={formData.salaireAnnuelMoyen || ''}
                        onChange={(e) => handleInputChange('salaireAnnuelMoyen', e.target.value)}
                        placeholder="Ex: 45000"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Calendar size={18} />
                        Trimestres validés
                      </label>
                      <p className="field-explanation">Nombre de trimestres réellement acquis</p>
                      <div className="data-source-info">
                        <span className="source-label">📄 Où trouver cette info :</span>
                        <ul className="source-list">
                          <li>📊 <strong>Simulateur M@rel</strong> sur <a href="https://www.assuranceretraite.fr" target="_blank" rel="noopener noreferrer">assuranceretraite.fr</a></li>
                          <li>📋 <strong>Relevé de carrière</strong> téléchargeable sur votre compte</li>
                          <li>📱 <strong>Application mobile</strong> "Assurance Retraite"</li>
                        </ul>
                      </div>
                      
                      {/* Jauge des trimestres */}
                      {formData.trimestresValides && formData.anneeNaissance && (
                        <div className="quarters-progress">
                          <div className="quarters-header">
                            <span className="quarters-label">📊 Progression vers la retraite à taux plein</span>
                            <span className="quarters-count">
                              {formData.trimestresValides} / {calculateTrimestresRequis(formData.anneeNaissance)} trimestres
                            </span>
                          </div>
                          <div className="quarters-bar">
                            <div 
                              className="quarters-fill"
                              style={{
                                width: `${Math.min(100, (parseFloat(formData.trimestresValides) / calculateTrimestresRequis(formData.anneeNaissance)) * 100)}%`
                              }}
                            ></div>
                          </div>
                          <div className="quarters-status">
                            {parseFloat(formData.trimestresValides) >= calculateTrimestresRequis(formData.anneeNaissance) ? (
                              <span className="quarters-complete">✅ Taux plein atteint !</span>
                            ) : (
                              <span className="quarters-missing">
                                ⚠️ Il vous manque {calculateTrimestresRequis(formData.anneeNaissance) - parseFloat(formData.trimestresValides)} trimestres
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <input
                        type="number"
                        value={formData.trimestresValides || ''}
                        onChange={(e) => handleInputChange('trimestresValides', e.target.value)}
                        placeholder="Ex: 165"
                        className="form-input"
                        min="0"
                        max="200"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Calendar size={18} />
                        Année de naissance
                      </label>
                      <p className="field-explanation">Pour calculer automatiquement les trimestres requis selon votre génération</p>
                      <input
                        type="number"
                        value={formData.anneeNaissance}
                        onChange={(e) => handleInputChange('anneeNaissance', e.target.value)}
                        placeholder="Ex: 1960"
                        className="form-input"
                        min="1900"
                        max="2010"
                      />
                      {formData.anneeNaissance && (
                        <div className="calculated-info">
                          <span className="info-text">
                            Trimestres requis : {calculateTrimestresRequis(formData.anneeNaissance)} 
                            ({calculateTrimestresRequis(formData.anneeNaissance) / 4} ans)
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="form-group optional">
                      <label className="form-label">
                        <Euro size={18} />
                        Pension estimée (optionnel)
                        <span className="optional-badge">Pour comparaison</span>
                      </label>
                      <p className="field-explanation">Si vous connaissez déjà votre pension, pour comparer avec notre calcul</p>
                      <div className="data-source-info">
                        <span className="source-label">📄 Où trouver cette info :</span>
                        <ul className="source-list">
                          <li>📊 <strong>Simulateur M@rel</strong> sur <a href="https://www.assuranceretraite.fr" target="_blank" rel="noopener noreferrer">assuranceretraite.fr</a></li>
                          <li>📋 <strong>Relevé de carrière</strong> avec estimation de pension</li>
                          <li>📱 <strong>Application mobile</strong> "Assurance Retraite"</li>
                        </ul>
                      </div>
                      <input
                        type="number"
                        value={formData.pensionEstimee || ''}
                        onChange={(e) => handleInputChange('pensionEstimee', e.target.value)}
                        placeholder="Ex: 1800"
                        className="form-input optional-input"
                      />
                    </div>
                  </div>
                </div>
              )}


              {/* Bouton de calcul */}
              <div className="calculate-button-section">
                <button 
                  className="btn-calculate"
                  onClick={() => {
                    if (validateForResults()) {
                      setActiveTab('resultats');
                    }
                  }}
                >
                  <Calculator size={20} />
                  Calculer mes revenus
                </button>
              </div>
            </div>
          )}

          {/* Onglet Résultats */}
          {activeTab === 'resultats' && (
            <div className="resultats-tab">
              {resultats ? (
                <div className="results-container">
                  <div className="results-summary">
                    <h3>Évolution de vos revenus</h3>
                    <div className="estimation-notice">
                      <p>Cet outil vous donne une estimation indicative de vos droits à la retraite progressive, distincte du simulateur officiel M@rel de l'Assurance Retraite</p>
                      
                    </div>
                    
                    {/* Toggle pour maintien des cotisations */}
                    <div className="cotisation-toggle-container">
                      <label className="toggle-label">Maintien des cotisations à 100%</label>
                      <div 
                        className="toggle-switch"
                        onClick={() => setMaintienCotisation100(!maintienCotisation100)}
                      >
                        <div className={`toggle-option left ${!maintienCotisation100 ? 'active' : ''}`}>
                          NON
                        </div>
                        <div className={`toggle-option right ${maintienCotisation100 ? 'active' : ''}`}>
                          OUI
                        </div>
                      </div>
                    </div>

                    {/* Mode de calcul */}
                    <div className="calculation-mode-indicator">
                      <div className={`mode-badge ${resultats.modeCalcul}`}>
                        {resultats.modeCalcul === 'avance' ? '🎯 Calcul précis' : '⚡ Estimation rapide'}
                      </div>
                      <p className="mode-explanation">
                        {resultats.modeCalcul === 'avance' ? 
                          'Calcul basé sur votre salaire annuel moyen et vos trimestres' : 
                          'Estimation basée sur votre salaire brut (taux de remplacement moyen 45%)'
                        }
                      </p>
                    </div>

                    {/* Graphique 3D */}
                    <div className="chart-container">
                      <div className="flow-chart">
                        {/* Étape 1 : Salaire actuel */}
                        <div className="flow-step">
                          <div className="flow-label">Salaire mensuel actuel à temps plein</div>
                          <div className="flow-box blue">
                            <span className="flow-amount">{resultats.salaireActuel} €</span>
                            <div className="flow-subtitle">Brut</div>
                          </div>
                          <div className="flow-box blue-light">
                            <span className="flow-amount">{resultats.salaireNet} €</span>
                            <div className="flow-subtitle">Net</div>
                          </div>
                        </div>

                        {/* Flèche verte vers le bas */}
                        <div className="flow-arrow">
                          <svg viewBox="0 0 100 60" className="arrow-svg">
                            <defs>
                              <linearGradient id="arrowGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#059669" />
                              </linearGradient>
                            </defs>
                            <path d="M 50 0 L 50 45 M 30 30 L 50 50 L 70 30" 
                                  stroke="url(#arrowGradient1)" 
                                  strokeWidth="8" 
                                  fill="none" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"/>
                          </svg>
                        </div>

                        {/* Étape 2 : Retraite progressive */}
                        <div className="flow-step progressive">
                          <div className="flow-label-main">Revenu en Retraite progressive</div>
                          <div className="flow-calculation">
                            <div className="calc-item">
                              <div className="calc-amount tooltip-container">
                                {resultats.salairePartiel} €
                                <div className="tooltip">
                                  <div className="tooltip-title">💼 Calcul Temps Partiel</div>
                                  <div className="tooltip-content">
                                    <div className="tooltip-step">{formData.salaireBrut}€ × {formData.tempsPartiel}% = {(formData.salaireBrut * formData.tempsPartiel / 100).toFixed(0)}€</div>
                                    <div className="tooltip-step">{(formData.salaireBrut * formData.tempsPartiel / 100).toFixed(0)}€ - 22% = {resultats.salairePartiel}€</div>
                                  </div>
                                </div>
                              </div>
                              <div className="calc-label">Temps partiel</div>
                            </div>
                            <div className="calc-operator">+</div>
                            <div className="calc-item">
                              <div className="calc-amount tooltip-container">
                                {resultats.pensionProgressive} €
                                <div className="tooltip">
                                  <div className="tooltip-title">💰 Calcul Pension</div>
                                  <div className="tooltip-content">
                                    {resultats.calculAvecTrimestres ? (
                                      <>
                                        <div className="tooltip-step">{formData.salaireAnnuel || (formData.salaireBrut * 12)}€ × 50% × {formData.trimestresValides}/{formData.trimestresRequis} = {resultats.pensionEstimeeFinale * 12}€/an</div>
                                        <div className="tooltip-step">{resultats.pensionEstimeeFinale * 12}€ ÷ 12 = {resultats.pensionEstimeeFinale}€/mois</div>
                                        <div className="tooltip-step">{resultats.pensionEstimeeFinale}€ × {100 - formData.tempsPartiel}% = {resultats.pensionProgressive}€</div>
                                      </>
                                    ) : (
                                      <div className="tooltip-step">{formData.pensionEstimee}€ × {100 - formData.tempsPartiel}% = {resultats.pensionProgressive}€</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="calc-label">Pension</div>
                            </div>
                            <div className="calc-operator">=</div>
                            <div className="calc-result">
                              <div className="calc-result-amount tooltip-container">
                                {resultats.revenuTotal} €
                                <div className="tooltip">
                                  <div className="tooltip-title">🧮 Calcul Total</div>
                                  <div className="tooltip-content">
                                    <div className="tooltip-step">{resultats.salairePartiel}€ + {resultats.pensionProgressive}€ = {resultats.revenuTotal}€</div>
                                    <div className="tooltip-step">Salaire temps partiel + Pension progressive</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Flèche verte vers le bas */}
                        <div className="flow-arrow">
                          <svg viewBox="0 0 100 60" className="arrow-svg">
                            <defs>
                              <linearGradient id="arrowGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#059669" />
                              </linearGradient>
                            </defs>
                            <path d="M 50 0 L 50 45 M 30 30 L 50 50 L 70 30" 
                                  stroke="url(#arrowGradient2)" 
                                  strokeWidth="8" 
                                  fill="none" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"/>
                          </svg>
                        </div>

                        {/* Étape 3 : Retraite finale */}
                        <div className="flow-step">
                          <div className="flow-label">Pension complète à la retraite définitive</div>
                          <div className="flow-box orange">
                            <span className="flow-amount">{resultats.pensionEstimee} €</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Lien vers M@rel */}
                    <div className="official-simulator-link">
                      <p>
                        Pour une estimation globale de votre retraite (tous régimes), consultez le{' '}
                        <a 
                          href="https://www.info-retraite.fr/portail-info/sites/PortailInformationnel/home/actualites-1/simulez-votre-retraite-gratuitem.html" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="marel-link"
                        >
                          simulateur officiel M@rel
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-data">
                  <p>Veuillez d'abord saisir vos données dans l'onglet "Saisie"</p>
                </div>
              )}
            </div>
          )}

          {/* Onglet Scénarios */}
          {activeTab === 'scenarios' && (
            <div className="scenarios-tab">
              {formData.salaireBrut && formData.pensionEstimee ? (
                <div className="scenarios-container">
                  <h3>Comparaison des scénarios</h3>
                  
                  {/* Toggle pour maintien des cotisations */}
                  <div className="cotisation-toggle-container">
                    <label className="toggle-label">Maintien des cotisations à 100%</label>
                    <div 
                      className="toggle-switch"
                      onClick={() => setMaintienCotisation100(!maintienCotisation100)}
                    >
                      <div className={`toggle-option left ${!maintienCotisation100 ? 'active' : ''}`}>
                        NON
                      </div>
                      <div className={`toggle-option right ${maintienCotisation100 ? 'active' : ''}`}>
                        OUI
                      </div>
                    </div>
                  </div>

                  {/* Graphique en barres empilées - Décomposition des revenus */}
                  <div className="stacked-bar-chart">
                    <div className="chart-header">
                      <h3>Revenu Retraite Progressive</h3>
                      <div className="chart-subtitle">Répartition des revenus en retraite progressive selon le pourcentage d'activité</div>
                    </div>
                    
                    <div className="stacked-bar-container">
                      <svg className="stacked-bar-svg" viewBox="0 0 800 500">
                        <defs>
                          {/* Dégradés pour chaque section */}
                          <linearGradient id="salaireBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#1D4ED8" />
                          </linearGradient>
                          <linearGradient id="pensionBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="100%" stopColor="#059669" />
                          </linearGradient>
                          <linearGradient id="perteBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#EF4444" />
                            <stop offset="100%" stopColor="#DC2626" />
                          </linearGradient>
                        </defs>
                        
                        {/* Grille de fond - sera mise à jour dynamiquement */}
                        
                        {/* Axe X */}
                        <line x1="80" y1="380" x2="720" y2="380" stroke="#374151" strokeWidth="2"/>
                        
                        {/* Labels de l'axe X */}
                        <text x="400" y="440" fontSize="14" fill="#374151" textAnchor="middle" fontWeight="600">
                          % Activité
                        </text>
                        
                        {/* Calcul et affichage des barres empilées - ÉCHELLE DYNAMIQUE */}
                        {(() => {
                          const salaireBrut = parseFloat(formData.salaireBrut) || 3000;
                          const salaireNet = salaireBrut * 0.78;
                          // const pensionEstimee = parseFloat(formData.pensionEstimee) || 1500;
                          
                          // Calculer les données pour chaque scénario
                          const barData = scenarios.map((scenario, index) => {
                            const resultats = calculerScenario(scenario.tempsPartiel, maintienCotisation100);
                            const salairePartiel = parseFloat(resultats.salairePartiel);
                            const pensionProgressive = parseFloat(resultats.pensionProgressive);
                            
                            // Calculer la perte de gain (différence entre salaire plein et salaire partiel)
                            const perteGain = salaireNet - salairePartiel;
                            
                            return {
                              x: 120 + (index * 120),
                              width: 80,
                              salairePartiel,
                              pensionProgressive,
                              perteGain,
                              total: salaireNet
                            };
                          });
                          
                          // Calculer l'échelle dynamique basée sur le salaire brut
                          const maxValue = Math.max(salaireBrut, salaireNet * 1.1); // 10% de marge au-dessus du salaire net
                          const maxHeight = 240;
                          const scale = maxHeight / maxValue;
                          const baseY = 380; // Position de base (axe X)
                          
                          // Générer les lignes de grille dynamiquement
                          const gridLines = [];
                          const step = Math.ceil(maxValue / 7 / 100) * 100; // Arrondir à la centaine supérieure
                          for (let i = 0; i <= maxValue; i += step) {
                            gridLines.push(i);
                          }
                          
                          return (
                            <g>
                              {/* Grille de fond dynamique */}
                              <g className="grid-lines">
                                {gridLines.map((amount, index) => {
                                  const y = 80 + ((maxValue - amount) / maxValue) * 240;
                                  return (
                                    <g key={index}>
                                      <line x1="80" y1={y} x2="720" y2={y} stroke="#e2e8f0" strokeWidth="1" opacity="0.3"/>
                                      <text x="70" y={y + 5} fontSize="12" fill="#64748b" textAnchor="end">
                                        {amount}€
                                      </text>
                                    </g>
                                  );
                                })}
                              </g>
                              
                              {/* Barres empilées */}
                              {barData.map((bar, index) => {
                                const scenario = scenarios[index];
                                
                                // Calcul des hauteurs
                                const salaireHeight = bar.salairePartiel * scale;
                                const pensionHeight = bar.pensionProgressive * scale;
                                const perteHeight = bar.perteGain * scale;
                                
                                // Calcul des positions Y (du bas vers le haut)
                                const salaireY = baseY - salaireHeight; // Position du salaire (en bas)
                                const pensionY = salaireY - pensionHeight; // Position de la pension (au milieu)
                                const perteY = pensionY - perteHeight; // Position de la perte (en haut)
                                
                                return (
                                  <g key={scenario.nom}>
                                    {/* ORDRE DE DESSIN CORRECT : Du bas vers le haut */}
                                    
                                    {/* 1. Section Salaire (Bleu) - DESSINÉE EN PREMIER (en bas) */}
                                    <rect
                                      x={bar.x}
                                      y={salaireY}
                                      width={bar.width}
                                      height={salaireHeight}
                                      fill="url(#salaireBarGradient)"
                                      stroke="white"
                                      strokeWidth="2"
                                      className="bar-section salaire-section"
                                    />
                                    
                                    {/* 2. Section Pension (Vert) - DESSINÉE EN DEUXIÈME (au milieu) */}
                                    <rect
                                      x={bar.x}
                                      y={pensionY}
                                      width={bar.width}
                                      height={pensionHeight}
                                      fill="url(#pensionBarGradient)"
                                      stroke="white"
                                      strokeWidth="2"
                                      className="bar-section pension-section"
                                    />
                                    
                                    {/* 3. Section Perte (Rouge) - DESSINÉE EN DERNIER (en haut) */}
                                    <rect
                                      x={bar.x}
                                      y={perteY}
                                      width={bar.width}
                                      height={perteHeight}
                                      fill="url(#perteBarGradient)"
                                      stroke="white"
                                      strokeWidth="2"
                                      className="bar-section perte-section"
                                    />
                                    
                                    {/* Montants dans chaque section */}
                                    {/* Salaire */}
                                    {salaireHeight > 25 ? (
                                      <text
                                        x={bar.x + bar.width/2}
                                        y={salaireY + salaireHeight/2 + 4}
                                        fontSize="10"
                                        fill="white"
                                        textAnchor="middle"
                                        fontWeight="700"
                                        className="amount-text"
                                      >
                                        {Math.round(bar.salairePartiel)} €
                                      </text>
                                    ) : (
                                      <text
                                        x={bar.x + bar.width + 5}
                                        y={salaireY + salaireHeight/2 + 4}
                                        fontSize="9"
                                        fill="#3B82F6"
                                        textAnchor="start"
                                        fontWeight="600"
                                        className="amount-text-side"
                                      >
                                        {Math.round(bar.salairePartiel)} €
                                      </text>
                                    )}
                                    
                                    {/* Pension */}
                                    {pensionHeight > 25 ? (
                                      <text
                                        x={bar.x + bar.width/2}
                                        y={pensionY + pensionHeight/2 + 4}
                                        fontSize="10"
                                        fill="white"
                                        textAnchor="middle"
                                        fontWeight="700"
                                        className="amount-text"
                                      >
                                        {Math.round(bar.pensionProgressive)} €
                                      </text>
                                    ) : (
                                      <text
                                        x={bar.x + bar.width + 5}
                                        y={pensionY + pensionHeight/2 + 4}
                                        fontSize="9"
                                        fill="#10B981"
                                        textAnchor="start"
                                        fontWeight="600"
                                        className="amount-text-side"
                                      >
                                        {Math.round(bar.pensionProgressive)} €
                                      </text>
                                    )}
                                    
                                    {/* Perte */}
                                    {perteHeight > 25 ? (
                                      <text
                                        x={bar.x + bar.width/2}
                                        y={perteY + perteHeight/2 + 4}
                                        fontSize="10"
                                        fill="white"
                                        textAnchor="middle"
                                        fontWeight="700"
                                        className="amount-text"
                                      >
                                        {Math.round(bar.perteGain)} €
                                      </text>
                                    ) : (
                                      <text
                                        x={bar.x + bar.width + 5}
                                        y={perteY + perteHeight/2 + 4}
                                        fontSize="9"
                                        fill="#EF4444"
                                        textAnchor="start"
                                        fontWeight="600"
                                        className="amount-text-side"
                                      >
                                        {Math.round(bar.perteGain)} €
                                      </text>
                                    )}
                                    
                                    {/* Label du pourcentage */}
                                    <text
                                      x={bar.x + bar.width/2}
                                      y="415"
                                      fontSize="14"
                                      fill="#374151"
                                      textAnchor="middle"
                                      fontWeight="600"
                                    >
                                      {scenario.tempsPartiel}%
                                    </text>
                                  </g>
                                );
                              })}
                            </g>
                          );
                        })()}
                      </svg>
                    </div>
                    
                    {/* Légende */}
                    <div className="stacked-bar-legend">
                      <div className="legend-items">
                        <div className="legend-item">
                          <div className="legend-color" style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}></div>
                          <span className="legend-label">Salaire</span>
                        </div>
                        <div className="legend-item">
                          <div className="legend-color" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}></div>
                          <span className="legend-label">Pension</span>
                        </div>
                        <div className="legend-item">
                          <div className="legend-color" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}></div>
                          <span className="legend-label">Perte</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-data">
                  <p>Veuillez d'abord saisir vos données dans l'onglet "Saisie"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Version Mobile : Accordéon */}
        <div className="accordion-container">
          {/* Barre de progression mobile */}
          <div className="mobile-progress">
            <div className="progress-text">
              {isFormComplete() ? '✓ Formulaire complété' : 'Complétez vos informations'}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${isFormComplete() ? 100 : (formData.salaireBrut && formData.debutRetraite ? 33 : 0)}%`}}
              ></div>
            </div>
          </div>

          {/* Section 1 : Saisie */}
          <div className={`accordion-section ${expandedSections.saisie ? 'expanded' : ''}`}>
            <div className="accordion-header" onClick={() => toggleSection('saisie')}>
              <div className="accordion-header-left">
                <div className="accordion-icon">
                  <Calculator size={20} />
                </div>
                <div className="accordion-title">
                  <h3>1. Saisie</h3>
                  <span className="subtitle">Renseignez vos informations</span>
                </div>
              </div>
              {expandedSections.saisie ? <ChevronUp size={24} className="accordion-toggle" /> : <ChevronDown size={24} className="accordion-toggle" />}
            </div>
            <div className="accordion-content">
              <div className="accordion-body">
                {/* Version mobile du nouveau formulaire */}
                <div className="form-section">
                  <div className="section-header">
                    <h3>⚡ Simulation simplifiée</h3>
                    <p>Obtenez une estimation rapide avec les informations de base</p>
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-group required">
                      <label className="form-label">
                        <Euro size={18} />
                        Salaire brut mensuel (€) <span className="required-star">*</span>
                      </label>
                      <p className="field-explanation">Votre salaire brut actuel</p>
                      <input
                        type="number"
                        value={formData.salaireBrut}
                        onChange={(e) => handleInputChange('salaireBrut', e.target.value)}
                        placeholder="Ex: 3200"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group required">
                      <label className="form-label">
                        <Calendar size={18} />
                        Date de début souhaitée <span className="required-star">*</span>
                      </label>
                      <p className="field-explanation">Quand souhaitez-vous commencer votre retraite progressive ?</p>
                      <div className="date-input-container">
                        <input
                          type="date"
                          value={formData.debutRetraite}
                          onChange={(e) => handleInputChange('debutRetraite', e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group required full-width">
                      <label className="form-label">
                        <Clock size={18} />
                        Temps partiel souhaité (%) <span className="required-star">*</span>
                      </label>
                      <p className="field-explanation">Détermine la part de salaire et la fraction de retraite</p>
                      <div className="slider-container-modern">
                        <div className="slider-wrapper">
                          <div className="slider-track-modern">
                            <div 
                              className="slider-fill" 
                              style={{ width: `${((formData.tempsPartiel - 40) / 40) * 100}%` }}
                            ></div>
                            <input
                              type="range"
                              min="40"
                              max="80"
                              step="10"
                              value={formData.tempsPartiel}
                              onChange={(e) => handleInputChange('tempsPartiel', e.target.value)}
                              className="slider-input-modern"
                            />
                          </div>
                          <div className="slider-labels">
                            <span className="slider-label">40%</span>
                            <span className="slider-label">50%</span>
                            <span className="slider-label">60%</span>
                            <span className="slider-label">70%</span>
                            <span className="slider-label">80%</span>
                          </div>
                        </div>
                      </div>
                      <div className="slider-value-display">
                        <span className="slider-value-text">{formData.tempsPartiel}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Bouton pour mode avancé */}
                  <div className="advanced-toggle-section">
                    <button 
                      className={`btn-advanced-toggle ${showAdvancedMode ? 'revert-mode' : ''}`}
                      onClick={() => setShowAdvancedMode(!showAdvancedMode)}
                    >
                      {showAdvancedMode ? '🔄 Revenir au mode simplifié' : '🎯 Affiner avec des données précises'}
                    </button>
                    <p className="advanced-explanation">
                      {showAdvancedMode ? 
                        'Mode simplifié : estimation basée sur votre salaire brut' : 
                        'Mode avancé : calcul précis avec votre salaire annuel moyen et vos trimestres'
                      }
                    </p>
                  </div>
                </div>

                {/* Section Mode Avancé Mobile */}
                {showAdvancedMode && (
                  <div className="form-section advanced-section">
                    <div className="section-header">
                      <h3>🎯 Mode avancé - Calcul précis</h3>
                      <p>Affinez votre estimation avec des données détaillées</p>
                    </div>
                    
                    <div className="form-grid">
                      <div className="form-group advanced-field">
                        <label className="form-label">
                          <Euro size={18} />
                          Salaire annuel moyen des 25 meilleures années (€ brut)
                        </label>
                        <p className="field-explanation">Base de calcul officielle pour votre pension - <strong>en salaire brut</strong></p>
                        <div className="data-source-info">
                          <span className="source-label">📄 Où trouver cette info :</span>
                          <ul className="source-list">
                            <li>📊 <strong>Simulateur M@rel</strong> sur <a href="https://www.assuranceretraite.fr" target="_blank" rel="noopener noreferrer">assuranceretraite.fr</a></li>
                            <li>📋 <strong>Relevé de carrière</strong> téléchargeable sur votre compte</li>
                            <li>💼 <strong>Fiches de paie</strong> de vos 25 meilleures années</li>
                          </ul>
                        </div>
                        <input
                          type="number"
                          value={formData.salaireAnnuelMoyen || ''}
                          onChange={(e) => handleInputChange('salaireAnnuelMoyen', e.target.value)}
                          placeholder="Ex: 45000"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <Calendar size={18} />
                          Trimestres validés
                        </label>
                        <p className="field-explanation">Nombre de trimestres réellement acquis</p>
                        <div className="data-source-info">
                          <span className="source-label">📄 Où trouver cette info :</span>
                          <ul className="source-list">
                            <li>📊 <strong>Simulateur M@rel</strong> sur <a href="https://www.assuranceretraite.fr" target="_blank" rel="noopener noreferrer">assuranceretraite.fr</a></li>
                            <li>📋 <strong>Relevé de carrière</strong> téléchargeable sur votre compte</li>
                            <li>📱 <strong>Application mobile</strong> "Assurance Retraite"</li>
                          </ul>
                        </div>
                        
                        {/* Jauge des trimestres */}
                        {formData.trimestresValides && formData.anneeNaissance && (
                          <div className="quarters-progress">
                            <div className="quarters-header">
                              <span className="quarters-label">📊 Progression vers la retraite à taux plein</span>
                              <span className="quarters-count">
                                {formData.trimestresValides} / {calculateTrimestresRequis(formData.anneeNaissance)} trimestres
                              </span>
                            </div>
                            <div className="quarters-bar">
                              <div 
                                className="quarters-fill"
                                style={{
                                  width: `${Math.min(100, (parseFloat(formData.trimestresValides) / calculateTrimestresRequis(formData.anneeNaissance)) * 100)}%`
                                }}
                              ></div>
                            </div>
                            <div className="quarters-status">
                              {parseFloat(formData.trimestresValides) >= calculateTrimestresRequis(formData.anneeNaissance) ? (
                                <span className="quarters-complete">✅ Taux plein atteint !</span>
                              ) : (
                                <span className="quarters-missing">
                                  ⚠️ Il vous manque {calculateTrimestresRequis(formData.anneeNaissance) - parseFloat(formData.trimestresValides)} trimestres
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        <input
                          type="number"
                          value={formData.trimestresValides || ''}
                          onChange={(e) => handleInputChange('trimestresValides', e.target.value)}
                          placeholder="Ex: 165"
                          className="form-input"
                          min="0"
                          max="200"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <Calendar size={18} />
                          Année de naissance
                        </label>
                        <p className="field-explanation">Pour calculer automatiquement les trimestres requis selon votre génération</p>
                        <input
                          type="number"
                          value={formData.anneeNaissance}
                          onChange={(e) => handleInputChange('anneeNaissance', e.target.value)}
                          placeholder="Ex: 1960"
                          className="form-input"
                          min="1900"
                          max="2010"
                        />
                        {formData.anneeNaissance && (
                          <div className="calculated-info">
                            <span className="info-text">
                              Trimestres requis : {calculateTrimestresRequis(formData.anneeNaissance)} 
                              ({calculateTrimestresRequis(formData.anneeNaissance) / 4} ans)
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="form-group optional">
                        <label className="form-label">
                          <Euro size={18} />
                          Pension estimée (optionnel)
                          <span className="optional-badge">Pour comparaison</span>
                        </label>
                        <p className="field-explanation">Si vous connaissez déjà votre pension, pour comparer avec notre calcul</p>
                        <div className="data-source-info">
                          <span className="source-label">📄 Où trouver cette info :</span>
                          <ul className="source-list">
                            <li>📊 <strong>Simulateur M@rel</strong> sur <a href="https://www.assuranceretraite.fr" target="_blank" rel="noopener noreferrer">assuranceretraite.fr</a></li>
                            <li>📋 <strong>Relevé de carrière</strong> avec estimation de pension</li>
                            <li>📱 <strong>Application mobile</strong> "Assurance Retraite"</li>
                          </ul>
                        </div>
                        <input
                          type="number"
                          value={formData.pensionEstimee || ''}
                          onChange={(e) => handleInputChange('pensionEstimee', e.target.value)}
                          placeholder="Ex: 1800"
                          className="form-input optional-input"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2 : Résultats */}
          <div className={`accordion-section ${expandedSections.resultats ? 'expanded' : ''} ${!isFormComplete() ? 'disabled' : ''}`}>
            <div className="accordion-header" onClick={() => isFormComplete() && toggleSection('resultats')}>
              <div className="accordion-header-left">
                <div className="accordion-icon">
                  <BarChart3 size={20} />
                </div>
                <div className="accordion-title">
                  <h3>2. Résultats</h3>
                  <span className="subtitle">Consultez vos revenus estimés</span>
                </div>
              </div>
              {expandedSections.resultats ? <ChevronUp size={24} className="accordion-toggle" /> : <ChevronDown size={24} className="accordion-toggle" />}
            </div>
            <div className="accordion-content">
              <div className="accordion-body">
                {resultats ? (
                  <div className="resultats-tab">
                    <div className="results-header">
                      <h3>Évolution de vos revenus</h3>
                      <div className="estimation-notice">
                        <p>Cet outil vous donne une estimation indicative de vos droits à la retraite progressive, distincte du simulateur officiel M@rel de l'Assurance Retraite</p>
                      </div>
                    </div>

                    {/* Toggle pour maintien des cotisations */}
                    <div className="cotisation-toggle-container">
                      <label className="toggle-label">Maintien des cotisations à 100%</label>
                      <div 
                        className="toggle-switch"
                        onClick={() => setMaintienCotisation100(!maintienCotisation100)}
                      >
                        <div className={`toggle-option left ${!maintienCotisation100 ? 'active' : ''}`}>
                          NON
                        </div>
                        <div className={`toggle-option right ${maintienCotisation100 ? 'active' : ''}`}>
                          OUI
                        </div>
                      </div>
                    </div>

                    <div className="chart-container">
                      <div className="flow-chart">
                        {/* Étape 1 : Salaire actuel */}
                        <div className="flow-step">
                          <div className="flow-label">Salaire mensuel actuel à temps plein</div>
                          <div className="flow-box blue">
                            <span className="flow-amount">{resultats.salaireActuel} €</span>
                          </div>
                        </div>

                        {/* Flèche verte vers le bas */}
                        <div className="flow-arrow">
                          <svg viewBox="0 0 100 60" className="arrow-svg">
                            <defs>
                              <linearGradient id="arrowGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#059669" />
                              </linearGradient>
                            </defs>
                            <path d="M 50 0 L 50 45 M 30 30 L 50 50 L 70 30" 
                                  stroke="url(#arrowGradient3)" 
                                  strokeWidth="8" 
                                  fill="none" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"/>
                          </svg>
                        </div>

                        {/* Étape 2 : Retraite progressive */}
                        <div className="flow-step progressive">
                          <div className="flow-label-main">Revenu en Retraite progressive</div>
                          <div className="flow-calculation">
                            <div className="calc-item">
                              <div className="calc-amount tooltip-container">
                                {resultats.salairePartiel} €
                                <div className="tooltip">
                                  <div className="tooltip-title">💼 Calcul Temps Partiel</div>
                                  <div className="tooltip-content">
                                    <div className="tooltip-step">{formData.salaireBrut}€ × {formData.tempsPartiel}% = {(formData.salaireBrut * formData.tempsPartiel / 100).toFixed(0)}€</div>
                                    <div className="tooltip-step">{(formData.salaireBrut * formData.tempsPartiel / 100).toFixed(0)}€ - 22% = {resultats.salairePartiel}€</div>
                                  </div>
                                </div>
                              </div>
                              <div className="calc-label">Temps partiel</div>
                            </div>
                            <div className="calc-operator">+</div>
                            <div className="calc-item">
                              <div className="calc-amount tooltip-container">
                                {resultats.pensionProgressive} €
                                <div className="tooltip">
                                  <div className="tooltip-title">💰 Calcul Pension</div>
                                  <div className="tooltip-content">
                                    {resultats.calculAvecTrimestres ? (
                                      <>
                                        <div className="tooltip-step">{formData.salaireAnnuel || (formData.salaireBrut * 12)}€ × 50% × {formData.trimestresValides}/{formData.trimestresRequis} = {resultats.pensionEstimeeFinale * 12}€/an</div>
                                        <div className="tooltip-step">{resultats.pensionEstimeeFinale * 12}€ ÷ 12 = {resultats.pensionEstimeeFinale}€/mois</div>
                                        <div className="tooltip-step">{resultats.pensionEstimeeFinale}€ × {100 - formData.tempsPartiel}% = {resultats.pensionProgressive}€</div>
                                      </>
                                    ) : (
                                      <div className="tooltip-step">{formData.pensionEstimee}€ × {100 - formData.tempsPartiel}% = {resultats.pensionProgressive}€</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="calc-label">Pension</div>
                            </div>
                            <div className="calc-operator">=</div>
                            <div className="calc-result">
                              <div className="calc-result-amount tooltip-container">
                                {resultats.revenuTotal} €
                                <div className="tooltip">
                                  <div className="tooltip-title">🧮 Calcul Total</div>
                                  <div className="tooltip-content">
                                    <div className="tooltip-step">{resultats.salairePartiel}€ + {resultats.pensionProgressive}€ = {resultats.revenuTotal}€</div>
                                    <div className="tooltip-step">Salaire temps partiel + Pension progressive</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Flèche verte vers le bas */}
                        <div className="flow-arrow">
                          <svg viewBox="0 0 100 60" className="arrow-svg">
                            <defs>
                              <linearGradient id="arrowGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#059669" />
                              </linearGradient>
                            </defs>
                            <path d="M 50 0 L 50 45 M 30 30 L 50 50 L 70 30" 
                                  stroke="url(#arrowGradient4)" 
                                  strokeWidth="8" 
                                  fill="none" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"/>
                          </svg>
                        </div>

                        {/* Étape 3 : Retraite finale */}
                        <div className="flow-step">
                          <div className="flow-label">Pension complète à la retraite définitive</div>
                          <div className="flow-box orange">
                            <span className="flow-amount">{resultats.pensionEstimee} €</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Lien vers M@rel */}
                    <div className="official-simulator-link">
                      <p>
                        Pour une estimation globale de votre retraite (tous régimes), consultez le{' '}
                        <a 
                          href="https://www.info-retraite.fr/portail-info/sites/PortailInformationnel/home/actualites-1/simulez-votre-retraite-gratuitem.html" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="marel-link"
                        >
                          simulateur officiel M@rel
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="no-data">
                    <p>Complétez le formulaire pour voir vos résultats</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3 : Scénarios */}
          <div className={`accordion-section ${expandedSections.scenarios ? 'expanded' : ''} ${!isFormComplete() ? 'disabled' : ''}`}>
            <div className="accordion-header" onClick={() => isFormComplete() && toggleSection('scenarios')}>
              <div className="accordion-header-left">
                <div className="accordion-icon">
                  <TrendingUp size={20} />
                </div>
                <div className="accordion-title">
                  <h3>3. Scénarios</h3>
                  <span className="subtitle">Comparez différentes options</span>
                </div>
              </div>
              {expandedSections.scenarios ? <ChevronUp size={24} className="accordion-toggle" /> : <ChevronDown size={24} className="accordion-toggle" />}
            </div>
            <div className="accordion-content">
              <div className="accordion-body">
                {resultats ? (
                  <div className="scenarios-tab">
                    <div className="scenarios-header">
                      <h3>Comparez différents scénarios</h3>
                      <p>Explorez comment vos revenus varient selon le temps partiel choisi</p>
                    </div>

                    {/* Toggle pour maintien des cotisations */}
                    <div className="cotisation-toggle-container">
                      <label className="toggle-label">Maintien des cotisations à 100%</label>
                      <div 
                        className="toggle-switch"
                        onClick={() => setMaintienCotisation100(!maintienCotisation100)}
                      >
                        <div className={`toggle-option left ${!maintienCotisation100 ? 'active' : ''}`}>
                          NON
                        </div>
                        <div className={`toggle-option right ${maintienCotisation100 ? 'active' : ''}`}>
                          OUI
                        </div>
                      </div>
                    </div>

                    <div className="scenarios-grid">
                      {scenarios.map((scenario) => {
                        const resultatsScenario = calculerScenario(scenario.tempsPartiel, maintienCotisation100);

                        return (
                          <div key={scenario.nom} className="scenario-card">
                            <div className="scenario-header" style={{ backgroundColor: scenario.couleur }}>
                              <h4>{scenario.nom}</h4>
                              <div className="scenario-percentage">{scenario.tempsPartiel}%</div>
                            </div>
                            
                            <div className="scenario-content">
                              {resultatsScenario && (
                                <div className="scenario-results">
                                  <div className="result-item">
                                    <span>Salaire partiel:</span>
                                    <span>{resultatsScenario.salairePartiel} €</span>
                                  </div>
                                  <div className="result-item">
                                    <span>Pension progressive:</span>
                                    <span>{resultatsScenario.pensionProgressive} €</span>
                                  </div>
                                  <div className="result-item total">
                                    <span>Revenu total:</span>
                                    <span>{resultatsScenario.revenuTotal} €</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="no-data">
                    <p>Complétez le formulaire pour comparer les scénarios</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Sticky Mobile */}
        <div className="mobile-sticky-cta">
          <button onClick={() => {
            if (isFormComplete()) {
              setExpandedSections({
                saisie: false,
                resultats: true,
                scenarios: false
              });
              // Scroll vers la section Résultats
              setTimeout(() => {
                document.querySelector('.accordion-section:nth-child(3)')?.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start' 
                });
              }, 100);
            }
          }} disabled={!isFormComplete()}>
            {isFormComplete() ? (
              <>
                <BarChart3 size={20} />
                Voir mes résultats
              </>
            ) : (
              <>
                <Calculator size={20} />
                Complétez le formulaire
              </>
            )}
          </button>
        </div>

        {/* Pop-up de sélection de date */}
        {showDatePicker && (
          <div className="date-picker-modal" onClick={closeDatePicker}>
            <div className="date-picker-content" onClick={(e) => e.stopPropagation()}>
              <div className="date-picker-header">
                <h3>Sélectionner la date de début</h3>
                <button className="close-button" onClick={closeDatePicker}>×</button>
              </div>
              
              <div className="date-picker-body">
                {!selectedYear ? (
                  <div className="year-selection">
                    <h4>Choisissez l'année</h4>
                    <div className="year-grid">
                      {years.map((year) => (
                        <button
                          key={year}
                          className="year-button"
                          onClick={() => handleYearSelect(year)}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="month-selection">
                    <h4>Choisissez le mois pour {selectedYear}</h4>
                    <div className="month-grid">
                      {months.map((month) => (
                        <button
                          key={month.value}
                          className="month-button"
                          onClick={() => handleMonthSelect(month.value)}
                        >
                          {month.label}
                        </button>
                      ))}
                    </div>
                    <button className="back-button" onClick={() => setSelectedYear('')}>
                      ← Retour aux années
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculateurAvance;
