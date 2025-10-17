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
  const [validationError, setValidationError] = useState('');

  // Fonction de validation pour l'onglet Résultats
  const validateForResults = () => {
    if (!formData.salaireBrut || formData.salaireBrut === '') {
      setValidationError('Vous devez entrer le "Salaire brut mensuel"');
      return false;
    }
    
    // Si pas de pension estimée, la calculer automatiquement
    if (!formData.pensionEstimee || formData.pensionEstimee === '') {
      // Calculer la pension estimée basée sur le salaire brut
      // Estimation basée sur un taux de remplacement moyen de 50% du salaire net
      const salaireNet = formData.salaireBrut * 0.78; // -22% de cotisations
      const pensionEstimee = salaireNet * 0.5; // 50% du salaire net
      
      setFormData(prev => ({
        ...prev,
        pensionEstimee: Math.round(pensionEstimee)
      }));
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
      
      // Calcul de la pension avec ou sans trimestres
      let pensionProgressive;
      let pensionEstimeeFinale = formData.pensionEstimee;
      let calculAvecTrimestres = false;
      
      // Si les trimestres sont renseignés ET qu'aucune pension n'a été saisie manuellement, utiliser la formule officielle
      if (formData.trimestresValides && formData.trimestresRequis && formData.salaireAnnuel && !formData.pensionEstimee) {
        // Formule officielle : (Salaire annuel × 50%) × (Trimestres validés / Trimestres requis)
        const salaireAnnuel = formData.salaireAnnuel || (formData.salaireBrut * 12);
        const pensionAnnuelle = (salaireAnnuel * 0.5) * (formData.trimestresValides / formData.trimestresRequis);
        pensionEstimeeFinale = pensionAnnuelle / 12; // Conversion en mensuel
        calculAvecTrimestres = true;
      }
      // Sinon, utiliser la valeur saisie manuellement dans le champ "Pension estimée"
      
      pensionProgressive = pensionEstimeeFinale * (1 - formData.tempsPartiel / 100);
      const revenuTotal = salairePartiel + pensionProgressive;

      setResultats({
        salairePartiel: salairePartiel.toFixed(0),
        pensionProgressive: pensionProgressive.toFixed(0),
        revenuTotal: revenuTotal.toFixed(0),
        pensionEstimee: Math.round(pensionEstimeeFinale),
        salaireActuel: formData.salaireBrut,
        calculAvecTrimestres: calculAvecTrimestres,
        pensionEstimeeFinale: Math.round(pensionEstimeeFinale)
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
              {/* Section Champs Obligatoires */}
              <div className="form-section">
                
                <div className="form-grid">
                  <div className="form-group required">
                    <label className="form-label">
                      <Euro size={18} />
                      Salaire brut mensuel (€) <span className="required-star">*</span>
                    </label>
                    <p className="field-explanation">Utilisé pour calculer votre salaire à temps partiel</p>
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
                      <Euro size={18} />
                      Pension mensuelle nette estimée au taux plein (€) <span className="required-star">*</span>
                    </label>
                    <p className="field-explanation">Pension complète que vous toucheriez si vous preniez votre retraite à taux plein</p>
                    <input
                      type="number"
                      value={formData.pensionEstimee}
                      onChange={(e) => handleInputChange('pensionEstimee', e.target.value)}
                      placeholder="Ex: 1800"
                      className="form-input"
                    />
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
              </div>

              {/* Section Champs Facultatifs */}
              <div className="form-section">
                
                <div className="form-grid">
                  <div className="form-group optional">
                    <label className="form-label">
                      <Euro size={18} />
                      Salaire annuel moyen (€)
                      <span className="optional-badge">Facultatif</span>
                    </label>
                    <p className="field-explanation">Pour affiner le calcul de la retraite si vous le connaissez</p>
                    <input
                      type="number"
                      value={formData.salaireAnnuel || ''}
                      onChange={(e) => handleInputChange('salaireAnnuel', e.target.value)}
                      placeholder="Ex: 38400"
                      className="form-input optional-input"
                    />
                  </div>

                  <div className="form-group optional">
                    <label className="form-label">
                      <Calendar size={18} />
                      Trimestres validés
                      <span className="optional-badge">Facultatif</span>
                    </label>
                    <p className="field-explanation">Nombre de trimestres réellement acquis pour la retraite</p>
                    <input
                      type="number"
                      value={formData.trimestresValides || ''}
                      onChange={(e) => handleInputChange('trimestresValides', e.target.value)}
                      placeholder="Ex: 165"
                      className="form-input optional-input"
                      min="0"
                      max="200"
                    />
                  </div>

                  <div className="form-group optional">
                    <label className="form-label">
                      <Calendar size={18} />
                      Trimestres requis pour taux plein
                      <span className="optional-badge">Facultatif</span>
                    </label>
                    <p className="field-explanation">Nombre de trimestres nécessaires pour une retraite complète</p>
                    <input
                      type="number"
                      value={formData.trimestresRequis || ''}
                      onChange={(e) => handleInputChange('trimestresRequis', e.target.value)}
                      placeholder="Ex: 172"
                      className="form-input optional-input"
                      min="0"
                      max="200"
                    />
                  </div>
                </div>
              </div>

              {/* Section Champs Informatifs */}
              <div className="form-section">
                
                <div className="form-grid">
                  <div className="form-group informational">
                    <label className="form-label">
                      <Calendar size={18} />
                      Année de naissance
                      <span className="info-badge">Pour planification personnelle</span>
                    </label>
                    <p className="field-explanation">Pour vérifier l'éligibilité à la retraite progressive</p>
                    <input
                      type="number"
                      value={formData.anneeNaissance}
                      onChange={(e) => handleInputChange('anneeNaissance', e.target.value)}
                      placeholder="Ex: 1963"
                      className="form-input info-input"
                      min="1900"
                      max="2010"
                    />
                  </div>

                  <div className="form-group informational">
                    <label className="form-label">
                      <Calendar size={18} />
                      Début souhaité de la retraite progressive
                      <span className="info-badge">Pour planification personnelle</span>
                    </label>
                    <p className="field-explanation">Date prévue pour le début de votre retraite progressive</p>
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
                        placeholder="DD/MM/YYYY"
                        className="date-input-manual info-input"
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

                  <div className="form-group informational">
                    <label className="form-label">
                      <Clock size={18} />
                      Durée de la retraite progressive (années)
                      <span className="info-badge">Pour planification personnelle</span>
                    </label>
                    <p className="field-explanation">Durée prévue de votre retraite progressive</p>
                    <input
                      type="number"
                      value={formData.dureeRetraite}
                      onChange={(e) => handleInputChange('dureeRetraite', e.target.value)}
                      placeholder="Ex: 5"
                      className="form-input info-input"
                      min="2"
                      max="20"
                    />
                  </div>
                </div>
              </div>

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
                      {resultats.calculAvecTrimestres && (
                        <div className="trimestres-notice">
                          <p>✅ <strong>Calcul automatique</strong> : Pension calculée avec la formule officielle basée sur vos trimestres validés (aucune pension manuelle saisie)</p>
                        </div>
                      )}
                      
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

                    {/* Graphique 3D */}
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
                          const pensionEstimee = parseFloat(formData.pensionEstimee) || 1500;
                          
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
                        placeholder=""
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
                        placeholder=""
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
                        placeholder=""
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
                          placeholder=""
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
                        placeholder=""
                        min="2"
                        max="10"
                        className="form-input"
                      />
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
