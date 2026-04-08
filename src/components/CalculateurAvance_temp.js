import React, { useState, useEffect } from 'react';
import { Calculator, BarChart3, TrendingUp, Euro, User, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import PageHeader from './PageHeader';

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
  const [currentStep, setCurrentStep] = useState(1); // 1: Saisie, 2: Résultats, 3: Scénarios
  const [simulationMode, setSimulationMode] = useState('simplified'); // 'simplified' ou 'advanced'

  // Fonction pour calculer les trimestres requis en fonction de l'année de naissance
  const getTrimestresRequis = (anneeNaissance) => {
    if (anneeNaissance <= 1951) {
      return 160; // 40 ans
    } else if (anneeNaissance <= 1955) {
      return 164; // 41 ans
    } else if (anneeNaissance <= 1960) {
      return 166; // 41,5 ans
    } else {
      return 166; // 41,5 ans (nés après 1961)
    }
  };

  const validateForResults = () => {
    if (!formData.salaireBrut) {
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

  // Sauvegarder les données dans localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('retraiteClair_personalInfo');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Calculer les résultats quand les données changent
  useEffect(() => {
    if (formData.salaireBrut && formData.debutRetraite) {
      const salaireBrut = parseFloat(formData.salaireBrut);
      const tempsPartiel = formData.tempsPartiel;
      
      // Calcul du salaire partiel
      let salairePartiel = salaireBrut * (tempsPartiel / 100);
      
      // Ajustement si maintien des cotisations à 100%
      if (maintienCotisation100) {
        const cotisationsNormales = salairePartiel * 0.22; // 22% de cotisations
        const cotisationsSur100 = salaireBrut * 0.22; // Cotisations sur salaire plein
        const cotisationsSupplementaires = cotisationsSur100 - cotisationsNormales;
        salairePartiel = salairePartiel - cotisationsSupplementaires;
      }
      
      // Calcul de la pension selon le mode
      let pensionProgressive = 0;
      let modeCalcul = '';
      
      if (showAdvancedMode && formData.salaireAnnuelMoyen && formData.trimestresValides) {
        // Mode avancé : calcul précis
        const salaireAnnuelMoyen = parseFloat(formData.salaireAnnuelMoyen);
        const trimestresValides = parseInt(formData.trimestresValides);
        const trimestresRequis = getTrimestresRequis(parseInt(formData.anneeNaissance));
        
        const tauxPension = Math.min(trimestresValides / trimestresRequis, 1);
        const pensionBrute = (salaireAnnuelMoyen * 0.5) * tauxPension;
        pensionProgressive = pensionBrute * (1 - tempsPartiel / 100) / 12;
        modeCalcul = 'avance';
      } else {
        // Mode simplifié : estimation
        const salaireNet = salaireBrut * 0.78; // 22% de cotisations
        const pensionEstimeeFinale = formData.pensionEstimee ? parseFloat(formData.pensionEstimee) : salaireNet * 0.45;
        pensionProgressive = pensionEstimeeFinale * (1 - formData.tempsPartiel / 100);
        modeCalcul = 'simplifie';
      }
      
      setResultats({
        salaireActuel: salaireBrut,
        salaireNet: salaireBrut * 0.78,
        salairePartiel: salairePartiel,
        pensionProgressive: pensionProgressive,
        revenuTotal: salairePartiel + pensionProgressive,
        tempsPartiel: tempsPartiel,
        modeCalcul: modeCalcul,
        pensionFournie: formData.pensionEstimee ? parseFloat(formData.pensionEstimee) : null
      });
    }
  }, [formData, maintienCotisation100, showAdvancedMode]);

  // Sauvegarder les données quand elles changent
  useEffect(() => {
    if (formData.salaireBrut || formData.anneeNaissance) {
      localStorage.setItem('retraiteClair_personalInfo', JSON.stringify(formData));
    }
  }, [formData]);

  // Écouter les événements de mode de simulation
  useEffect(() => {
    const handleSimulationMode = (event) => {
      if (event.detail.mode === 'simplified') {
        setSimulationMode('simplified');
        setShowAdvancedMode(false);
        setActiveTab('saisie');
      } else if (event.detail.mode === 'advanced') {
        setSimulationMode('advanced');
        setShowAdvancedMode(true);
        setActiveTab('saisie');
      }
    };

    window.addEventListener('navigateToPage', handleSimulationMode);
    return () => window.removeEventListener('navigateToPage', handleSimulationMode);
  }, []);

  // Mise à jour du step actuel
  useEffect(() => {
    if (activeTab === 'saisie') setCurrentStep(1);
    else if (activeTab === 'resultats') setCurrentStep(2);
    else if (activeTab === 'scenarios') setCurrentStep(3);
  }, [activeTab]);

  // Fonction pour calculer un scénario
  const calculerScenario = (tempsPartiel) => {
    if (!formData.salaireBrut) return null;
    
    const salaireBrut = parseFloat(formData.salaireBrut);
    let salairePartiel = salaireBrut * (tempsPartiel / 100);
    
    // Ajustement si maintien des cotisations à 100%
    if (maintienCotisation100) {
      const cotisationsNormales = salairePartiel * 0.22;
      const cotisationsSur100 = salaireBrut * 0.22;
      const cotisationsSupplementaires = cotisationsSur100 - cotisationsNormales;
      salairePartiel = salairePartiel - cotisationsSupplementaires;
    }
    
    const pensionProgressive = formData.pensionEstimee * (1 - tempsPartiel / 100);
    const revenuTotal = salairePartiel + pensionProgressive;
    
    return {
      salairePartiel: Math.round(salairePartiel),
      pensionProgressive: Math.round(pensionProgressive),
      revenuTotal: Math.round(revenuTotal)
    };
  };

  const isFormComplete = () => {
    return formData.salaireBrut && formData.debutRetraite;
  };

  return (
    <div className="page-content">
      <PageHeader 
        title="Simulateur Retraite Progressive"
        subtitle="Calculez vos revenus en retraite progressive avec précision"
      />
      
      <div className="calculateur-avance-container">

        {/* Message d'erreur de validation */}
        {validationError && (
          <div className="validation-error">
            <p>{validationError}</p>
          </div>
        )}

        {/* Contenu des onglets */}
        <div className="tab-content">
          {/* Section Saisie */}
          {(
            <div className="saisie-tab">
              {/* Section Mode Simplifié - Masquée en mode avancé */}
              {simulationMode === 'simplified' && (
                <div className="form-section">
                  <div className="section-header">
                    <h3>📝 Vos informations personnelles</h3>
                    <p>Renseignez vos données pour obtenir une estimation de votre retraite progressive</p>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">
                        <Euro size={18} />
                        Salaire brut mensuel (€)
                      </label>
                      <input
                        type="number"
                        value={formData.salaireBrut}
                        onChange={(e) => setFormData({...formData, salaireBrut: e.target.value})}
                        placeholder="Ex: 3000"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Calendar size={18} />
                        Date de début de retraite progressive
                      </label>
                      <input
                        type="date"
                        value={formData.debutRetraite}
                        onChange={(e) => setFormData({...formData, debutRetraite: e.target.value})}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Clock size={18} />
                        Temps de travail souhaité
                      </label>
                      <div className="slider-container">
                        <input
                          type="range"
                          min="20"
                          max="80"
                          value={formData.tempsPartiel}
                          onChange={(e) => setFormData({...formData, tempsPartiel: parseInt(e.target.value)})}
                          className="slider"
                        />
                        <div className="slider-labels">
                          <span>20%</span>
                          <span className="slider-value-text">{formData.tempsPartiel}%</span>
                          <span>80%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'action pour mode simplifié */}
                  <div className="simulation-buttons">
                    <div className="button-pair">
                      <button 
                        className="btn-results"
                        onClick={() => {
                          if (validateForResults()) {
                            setActiveTab('resultats');
                          }
                        }}
                      >
                        Résultats
                        <span className="button-text">Voir les Résultats</span>
                      </button>
                      <button 
                        className="btn-advanced"
                        onClick={() => {
                          setSimulationMode('advanced');
                          setShowAdvancedMode(true);
                        }}
                      >
                        Simulation Simplifiée
                        <span className="button-text">Entrer le minimum de données</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
                        value={formData.salaireAnnuelMoyen}
                        onChange={(e) => setFormData({...formData, salaireAnnuelMoyen: e.target.value})}
                        placeholder="Ex: 45000"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group advanced-field">
                      <label className="form-label">
                        <User size={18} />
                        Année de naissance
                      </label>
                      <p className="field-explanation">Pour calculer automatiquement le nombre de trimestres requis</p>
                      <input
                        type="number"
                        value={formData.anneeNaissance}
                        onChange={(e) => setFormData({...formData, anneeNaissance: e.target.value})}
                        placeholder="Ex: 1965"
                        className="form-input"
                        min="1940"
                        max="2000"
                      />
                    </div>

                    <div className="form-group advanced-field">
                      <label className="form-label">
                        <Calendar size={18} />
                        Nombre de trimestres validés
                      </label>
                      <p className="field-explanation">Vérifiez sur votre relevé de carrière</p>
                      <input
                        type="number"
                        value={formData.trimestresValides}
                        onChange={(e) => setFormData({...formData, trimestresValides: e.target.value})}
                        placeholder="Ex: 160"
                        className="form-input"
                        min="0"
                        max="200"
                      />
                    </div>

                    <div className="form-group advanced-field">
                      <label className="form-label">
                        <Euro size={18} />
                        Pension estimée (optionnel)
                      </label>
                      <p className="field-explanation">Si vous connaissez déjà votre pension, entrez-la ici pour comparaison</p>
                      <input
                        type="number"
                        value={formData.pensionEstimee}
                        onChange={(e) => setFormData({...formData, pensionEstimee: e.target.value})}
                        placeholder="Ex: 1200"
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Boutons d'action pour mode avancé */}
                  <div className="simulation-buttons">
                    <div className="button-pair">
                      <button 
                        className="btn-results"
                        onClick={() => {
                          if (validateForResults()) {
                            setActiveTab('resultats');
                          }
                        }}
                      >
                        Résultats
                        <span className="button-text">Voir les Résultats</span>
                      </button>
                      <button 
                        className="btn-advanced"
                        onClick={() => {
                          setSimulationMode('advanced');
                          setShowAdvancedMode(true);
                        }}
                      >
                        Simulation Simplifiée
                        <span className="button-text">Entrer le minimum de données</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculateurAvance;
