import React, { useState, useEffect } from 'react';
import { Calculator, BarChart3, TrendingUp, Save, CheckCircle, Euro, User, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const CalculateurAvance = () => {
  const [activeTab, setActiveTab] = useState('saisie');
  const [expandedSections, setExpandedSections] = useState({
    saisie: true,
    resultats: false,
    scenarios: false
  });
  const [formData, setFormData] = useState({
    salaireBrut: '',
    pensionEstimee: '',
    anneeNaissance: '',
    debutRetraite: '',
    dureeRetraite: '',
    tempsPartiel: 60
  });
  const [resultats, setResultats] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [maintienCotisation100, setMaintienCotisation100] = useState(false);

  // Charger les données sauvegardées au montage
  useEffect(() => {
    const savedData = localStorage.getItem('retraiteClair_personalInfo');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Calculer les résultats quand les données changent
  useEffect(() => {
    if (formData.salaireBrut && formData.pensionEstimee && formData.tempsPartiel) {
      const salaireNet = formData.salaireBrut * 0.78; // -22% de cotisations
      let salairePartiel = salaireNet * (formData.tempsPartiel / 100);
      
      // Si maintien cotisations à 100%, déduire les cotisations supplémentaires
      if (maintienCotisation100) {
        const cotisationsNormales = formData.salaireBrut * (formData.tempsPartiel / 100) * 0.22;
        const cotisationsSur100 = formData.salaireBrut * 0.22;
        const cotisationsSupplementaires = cotisationsSur100 - cotisationsNormales;
        salairePartiel = salairePartiel - cotisationsSupplementaires;
      }
      
      const pensionProgressive = formData.pensionEstimee * (1 - formData.tempsPartiel / 100);
      const revenuTotal = salairePartiel + pensionProgressive;

      setResultats({
        salairePartiel: salairePartiel.toFixed(0),
        pensionProgressive: pensionProgressive.toFixed(0),
        revenuTotal: revenuTotal.toFixed(0),
        pensionEstimee: formData.pensionEstimee,
        salaireActuel: formData.salaireBrut
      });
    }
  }, [formData, maintienCotisation100]);

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
    if (formData.salaireBrut || formData.pensionEstimee) {
      localStorage.setItem('retraiteClair_personalInfo', JSON.stringify(formData));
    }
  }, [formData]);

  // Vérifier si tous les champs requis sont remplis
  const isFormComplete = () => {
    return formData.salaireBrut && 
           formData.pensionEstimee && 
           formData.anneeNaissance && 
           formData.debutRetraite && 
           formData.dureeRetraite;
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
          <h1 className="section-title">Calculateur avancé</h1>
          <p className="section-description">
            Saisissez vos données, consultez vos résultats et comparez différents scénarios
          </p>
        </div>

        {/* Navigation par onglets */}
        <div className="tabs-navigation">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contenu des onglets */}
        <div className="tab-content">
          {/* Onglet Saisie */}
          {activeTab === 'saisie' && (
            <div className="saisie-tab">
              <div className="form-section">
                <h3>Informations personnelles</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <Euro size={18} />
                      Salaire brut mensuel (€)
                    </label>
                    <input
                      type="number"
                      value={formData.salaireBrut}
                      onChange={(e) => handleInputChange('salaireBrut', e.target.value)}
                      placeholder="Ex: 6696"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Euro size={18} />
                      Pension mensuelle nette estimée au taux plein (€)
                    </label>
                    <input
                      type="number"
                      value={formData.pensionEstimee}
                      onChange={(e) => handleInputChange('pensionEstimee', e.target.value)}
                      placeholder="Ex: 4536"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Calendar size={18} />
                      Année de naissance
                    </label>
                    <input
                      type="number"
                      value={formData.anneeNaissance}
                      onChange={(e) => handleInputChange('anneeNaissance', e.target.value)}
                      placeholder="Ex: 1964"
                      className="form-input"
                      min="1900"
                      max="2010"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Calendar size={18} />
                      Début souhaité de la retraite progressive
                    </label>
                    <div className="date-input-container">
                      <input
                        type="text"
                        value={formData.debutRetraite ? 
                          new Date(formData.debutRetraite).toLocaleDateString('fr-FR') : 
                          ''
                        }
                        onChange={(e) => {
                          // Permettre la saisie manuelle au format DD/MM/YYYY
                          const value = e.target.value;
                          if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                            const [day, month, year] = value.split('/');
                            const dateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                            handleInputChange('debutRetraite', dateString);
                          } else if (value === '') {
                            handleInputChange('debutRetraite', '');
                          }
                        }}
                        placeholder="01/12/2025"
                        className="date-input-manual"
                      />
                      <button
                        type="button"
                        className="date-picker-button"
                        onClick={openDatePicker}
                        title="Ouvrir le sélecteur de date"
                      >
                        📅
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Clock size={18} />
                      Durée de la retraite progressive
                    </label>
                    <input
                      type="number"
                      value={formData.dureeRetraite}
                      onChange={(e) => handleInputChange('dureeRetraite', e.target.value)}
                      placeholder="Ex: 4"
                      className="form-input"
                      min="2"
                      max="20"
                    />
                  </div>

                </div>

                {/* Slider sur toute la largeur */}
                <div className="full-width-slider-section">
                  <label className="form-label">
                    <Clock size={18} />
                    Temps partiel souhaité (%)
                  </label>
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
                          step="5"
                          value={formData.tempsPartiel}
                          onChange={(e) => handleInputChange('tempsPartiel', e.target.value)}
                          className="slider-input-modern"
                        />
                      </div>
                      <div className="slider-labels">
                        <span className="slider-label">40%</span>
                        <span className="slider-label">60%</span>
                        <span className="slider-label">80%</span>
                      </div>
                    </div>
                    <div className="slider-value-display">
                      <span className="slider-value-text">{formData.tempsPartiel}%</span>
                    </div>
                  </div>
                </div>

                <div className="form-grid">
                </div>
              </div>
            </div>
          )}

          {/* Onglet Résultats */}
          {activeTab === 'resultats' && (
            <div className="resultats-tab">
              {resultats ? (
                <div className="results-container">
                  <div className="results-summary">
                    <h3>Vos revenus estimés en retraite progressive</h3>
                    
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

                    {/* Graphique 3D */}
                    <div className="chart-container">
                      <div className="chart-title-highlight">
                        <h3>📊 Évolution de vos revenus</h3>
                        <p>Visualisez votre transition financière en un coup d'œil</p>
                      </div>
                      <div className="flow-chart">
                        {/* Étape 1 : Salaire actuel */}
                        <div className="flow-step">
                          <div className="flow-label">Salaire mensuel actuel à temps plein</div>
                          <div className="flow-box purple">
                            <span className="flow-amount">{resultats.salaireActuel} €</span>
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
                              <div className="calc-amount">{resultats.salairePartiel} €</div>
                              <div className="calc-label">Temps partiel</div>
                            </div>
                            <div className="calc-operator">+</div>
                            <div className="calc-item">
                              <div className="calc-amount">{resultats.pensionProgressive} €</div>
                              <div className="calc-label">Pension</div>
                            </div>
                            <div className="calc-operator">=</div>
                            <div className="calc-result">
                              <div className="calc-result-amount">{resultats.revenuTotal} €</div>
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
                          <div className="flow-box green">
                            <span className="flow-amount">{resultats.pensionEstimee} €</span>
                          </div>
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

                  <div className="scenarios-grid">
                    {scenarios.map((scenario) => {
                      const resultats = calculerScenario(scenario.tempsPartiel, maintienCotisation100);
                      
                      return (
                        <div key={scenario.nom} className="scenario-card">
                          <div className="scenario-header" style={{ backgroundColor: scenario.couleur }}>
                            <h4>{scenario.nom}</h4>
                            <div className="scenario-percentage">{scenario.tempsPartiel}%</div>
                          </div>
                          
                          <div className="scenario-content">
                            {resultats && (
                              <div className="scenario-results">
                                <div className="result-item">
                                  <span>Salaire partiel:</span>
                                  <span>{resultats.salairePartiel} €</span>
                                </div>
                                <div className="result-item">
                                  <span>Pension progressive:</span>
                                  <span>{resultats.pensionProgressive} €</span>
                                </div>
                                <div className="result-item total">
                                  <span>Revenu total:</span>
                                  <span>{resultats.revenuTotal} €</span>
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
                style={{width: `${isFormComplete() ? 100 : (formData.salaireBrut && formData.pensionEstimee ? 33 : 0)}%`}}
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
                {/* Contenu identique à l'onglet Saisie */}
                <div className="form-section">
                  <h3>Informations personnelles</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">
                        <Euro size={18} />
                        Salaire brut mensuel (€)
                      </label>
                      <input
                        type="number"
                        value={formData.salaireBrut}
                        onChange={(e) => handleInputChange('salaireBrut', e.target.value)}
                        placeholder="Ex: 6696"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Euro size={18} />
                        Pension mensuelle nette estimée au taux plein (€)
                      </label>
                      <input
                        type="number"
                        value={formData.pensionEstimee}
                        onChange={(e) => handleInputChange('pensionEstimee', e.target.value)}
                        placeholder="Ex: 4536"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <User size={18} />
                        Année de naissance
                      </label>
                      <input
                        type="number"
                        value={formData.anneeNaissance}
                        onChange={(e) => handleInputChange('anneeNaissance', e.target.value)}
                        placeholder="Ex: 1963"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Calendar size={18} />
                        Début souhaité de la retraite progressive
                      </label>
                      <div className="date-input-container">
                        <input
                          type="text"
                          value={formData.debutRetraite ? 
                            new Date(formData.debutRetraite).toLocaleDateString('fr-FR') : 
                            ''
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                              const [day, month, year] = value.split('/');
                              const dateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                              handleInputChange('debutRetraite', dateString);
                            } else if (value === '') {
                              handleInputChange('debutRetraite', '');
                            }
                          }}
                          placeholder="01/12/2025"
                          className="date-input-manual"
                        />
                        <button
                          type="button"
                          className="date-picker-button"
                          onClick={openDatePicker}
                          title="Ouvrir le sélecteur de date"
                        >
                          📅
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Clock size={18} />
                        Durée de la retraite progressive (années)
                      </label>
                      <input
                        type="number"
                        value={formData.dureeRetraite}
                        onChange={(e) => handleInputChange('dureeRetraite', e.target.value)}
                        placeholder="Ex: 3"
                        min="2"
                        max="10"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group slider-group">
                      <label className="form-label">
                        <User size={18} />
                        Temps partiel souhaité (%)
                      </label>
                      <div className="modern-slider-container">
                        <input
                          type="range"
                          min="40"
                          max="80"
                          value={formData.tempsPartiel}
                          onChange={(e) => handleInputChange('tempsPartiel', e.target.value)}
                          className="modern-slider"
                        />
                        <div className="slider-track">
                          <div className="slider-fill" style={{width: `${((formData.tempsPartiel - 40) / 40) * 100}%`}}></div>
                        </div>
                        <div className="slider-labels">
                          <span>40%</span>
                          <span className="slider-value">{formData.tempsPartiel}%</span>
                          <span>80%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                      <h3>Vos revenus estimés en retraite progressive</h3>
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
                      <div className="chart-title-highlight">
                        <h3>📊 Évolution de vos revenus</h3>
                        <p>Visualisez votre transition financière en un coup d'œil</p>
                      </div>
                      <div className="flow-chart">
                        {/* Étape 1 : Salaire actuel */}
                        <div className="flow-step">
                          <div className="flow-label">Salaire mensuel actuel à temps plein</div>
                          <div className="flow-box purple">
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
                              <div className="calc-amount">{resultats.salairePartiel} €</div>
                              <div className="calc-label">Temps partiel</div>
                            </div>
                            <div className="calc-operator">+</div>
                            <div className="calc-item">
                              <div className="calc-amount">{resultats.pensionProgressive} €</div>
                              <div className="calc-label">Pension</div>
                            </div>
                            <div className="calc-operator">=</div>
                            <div className="calc-result">
                              <div className="calc-result-amount">{resultats.revenuTotal} €</div>
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
                          <div className="flow-box green">
                            <span className="flow-amount">{resultats.pensionEstimee} €</span>
                          </div>
                        </div>
                      </div>
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
