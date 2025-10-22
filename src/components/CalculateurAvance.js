import React, { useState, useEffect } from 'react';
import { Calculator, BarChart3, TrendingUp, Euro, User, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import PageHeader from './PageHeader';
import SimulatorNavigation from './SimulatorNavigation';
import './SimulatorNavigation.css';

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
    pensionEstimee: '', // Optionnel pour comparaison
    surcoteDecote: 0 // Surcote/décote en % (positif = surcote, négatif = décote)
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

  // Fonction pour calculer automatiquement la décote/surcote
  const calculateDecoteSurcote = (trimestresValides, anneeNaissance) => {
    if (!trimestresValides || !anneeNaissance) return { decote: 0, explanation: '' };
    
    const trimestresRequis = getTrimestresRequis(parseInt(anneeNaissance));
    const trimestresManquants = trimestresRequis - parseInt(trimestresValides);
    
    if (trimestresManquants > 0) {
      const decote = trimestresManquants * 0.625;
      return {
        decote: -decote,
        explanation: `Trimestres manquants : ${trimestresManquants} × 0.625% par trimestre manquant = ${decote.toFixed(3)}% de décote`
      };
    } else if (trimestresManquants < 0) {
      const surcote = Math.abs(trimestresManquants) * 0.625;
      return {
        decote: surcote,
        explanation: `Trimestres supplémentaires : ${Math.abs(trimestresManquants)} × 0.625% par trimestre supplémentaire = ${surcote.toFixed(3)}% de surcote`
      };
    } else {
      return {
        decote: 0,
        explanation: 'Nombre de trimestres exactement requis - ni décote ni surcote'
      };
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
      
      // Calcul de la pension selon le mode (basé sur M@rel)
      let pensionProgressive = 0;
      let pensionComplete = 0;
      let modeCalcul = '';
      
      if (showAdvancedMode && formData.salaireAnnuelMoyen && formData.trimestresValides) {
        // Mode avancé : calcul précis selon M@rel
        const salaireAnnuelMoyen = parseFloat(formData.salaireAnnuelMoyen);
        const trimestresValides = parseInt(formData.trimestresValides);
        const trimestresRequis = getTrimestresRequis(parseInt(formData.anneeNaissance));
        
        const tauxPension = Math.min(trimestresValides / trimestresRequis, 1);
        const surcoteDecote = parseFloat(formData.surcoteDecote) || 0;
        pensionComplete = (salaireAnnuelMoyen * 0.5) * tauxPension / 12; // Pension complète mensuelle
        pensionComplete = pensionComplete * (1 + surcoteDecote / 100); // Application de la surcote/décote
        // Retraite progressive : 40% de la pension complète AVEC décote
        const pensionCompleteSansDecote = (salaireAnnuelMoyen * 0.5) * tauxPension / 12;
        const pensionProgressiveSansDecote = pensionCompleteSansDecote * 0.40; // 40% sans décote
        pensionProgressive = pensionProgressiveSansDecote * (1 + surcoteDecote / 100); // Application de la décote/surcote
        modeCalcul = 'avance';
      } else {
        // Mode simplifié : estimation selon M@rel
        const salaireNet = salaireBrut * 0.78; // 22% de cotisations
        const surcoteDecote = parseFloat(formData.surcoteDecote) || 0;
        pensionComplete = formData.pensionEstimee ? parseFloat(formData.pensionEstimee) : salaireNet * 0.45; // Pension complète
        pensionComplete = pensionComplete * (1 + surcoteDecote / 100); // Application de la surcote/décote
        // Retraite progressive : 40% de la pension complète AVEC décote
        const pensionCompleteSansDecote = formData.pensionEstimee ? parseFloat(formData.pensionEstimee) : salaireNet * 0.45;
        const pensionProgressiveSansDecote = pensionCompleteSansDecote * 0.40; // 40% sans décote
        pensionProgressive = pensionProgressiveSansDecote * (1 + surcoteDecote / 100); // Application de la décote/surcote
        modeCalcul = 'simplifie';
      }

      setResultats({
        salaireActuel: salaireBrut,
        salaireNet: salaireBrut * 0.78,
        salairePartiel: salairePartiel,
        pensionProgressive: pensionProgressive,
        pensionComplete: pensionComplete,
        revenuTotal: salairePartiel + pensionProgressive,
        revenuApresRetraite: pensionComplete,
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

  // Calculer automatiquement la décote/surcote
  useEffect(() => {
    if (formData.trimestresValides && formData.anneeNaissance) {
      const { decote, explanation } = calculateDecoteSurcote(formData.trimestresValides, formData.anneeNaissance);
      setFormData(prev => ({
        ...prev,
        surcoteDecote: decote
      }));
    }
  }, [formData.trimestresValides, formData.anneeNaissance]);

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
    const salaireNet = salaireBrut * 0.78; // 22% de cotisations
    
    // Calcul du salaire partiel net
    let salairePartielNet = salaireNet * (tempsPartiel / 100);
    
    // Ajustement si maintien des cotisations à 100%
    if (maintienCotisation100) {
      const cotisationsNormales = salairePartielNet * 0.22;
      const cotisationsSur100 = salaireBrut * 0.22;
      const cotisationsSupplementaires = cotisationsSur100 - cotisationsNormales;
      salairePartielNet = salairePartielNet - cotisationsSupplementaires;
    }
    
    // Calcul de la pension progressive basé sur les données fournies
    // Pour 60%: pension progressive = 1694.50€
    // Calcul du ratio: 1694.50 / 6760 = 0.2506
    const ratioPensionProgressive = 0.2506; // Ratio basé sur les données 60%
    const pensionProgressive = salaireNet * ratioPensionProgressive;
    
    const revenuTotal = salairePartielNet + pensionProgressive;
    const perteRevenu = salaireNet - revenuTotal;

    return {
      salairePartiel: Math.round(salairePartielNet * 100) / 100,
      pensionProgressive: Math.round(pensionProgressive * 100) / 100,
      revenuTotal: Math.round(revenuTotal * 100) / 100,
      perteRevenu: Math.round(perteRevenu * 100) / 100,
      salaireNet: Math.round(salaireNet)
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
      
      {/* Navigation du simulateur */}
      <SimulatorNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
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
          {/* Onglet Saisie */}
          {activeTab === 'saisie' && (
            <div className="saisie-tab">
              {/* Section Mode Simplifié - Masquée en mode avancé */}
              {simulationMode === 'simplified' && (
                <div className="form-section">
                  <div className="marel-reference">
                    <p><strong>Le simulateur M@rel est la référence officielle</strong> pour calculer votre retraite progressive avec précision.</p>
                  </div>
                
                <div className="form-grid-simplified">
                  <div className="form-row">
                    <div className="form-group simplified-field salaire-field">
                      <label className="form-label">
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

                    <div className="form-group simplified-field date-field">
                      <label className="form-label">
                          Date de début de retraite progressive
                      </label>
                        <input
                          type="date"
                          value={formData.debutRetraite}
                          onChange={(e) => setFormData({...formData, debutRetraite: e.target.value})}
                          className="form-input"
                        />
                    </div>
                  </div>

                  <div className="form-row-full">
                    <div className="form-group simplified-field temps-field">
                      <label className="form-label">
                          Temps de travail souhaité
                      </label>
                      <div className="slider-container">
                        <div className="slider-options">
                          {[40, 50, 60, 70, 80].map((percentage) => (
                            <button
                              key={percentage}
                              className={`slider-option ${formData.tempsPartiel === percentage ? 'active' : ''}`}
                              onClick={() => setFormData({...formData, tempsPartiel: percentage})}
                            >
                              {percentage}%
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                  {/* Boutons d'action pour mode simplifié */}
                  <div className="simulation-actions">
                    <button 
                      className="btn-primary btn-results"
                      onClick={() => {
                        if (validateForResults()) {
                          setActiveTab('resultats');
                        }
                      }}
                    >
                      <div className="btn-content">
                        <div className="btn-title">Voir les Résultats</div>
                        <div className="btn-subtitle">Calculs et projections</div>
                  </div>
                    </button>
                    
                    <button 
                      className="btn-secondary btn-advanced"
                      onClick={() => {
                        setSimulationMode('advanced');
                        setShowAdvancedMode(true);
                      }}
                    >
                      <div className="btn-content">
                        <div className="btn-title">Mode Avancé</div>
                        <div className="btn-subtitle">Données précises et détaillées</div>
                      </div>
                    </button>
                  </div>
              </div>
              )}

              {/* Section Mode Avancé */}
              {showAdvancedMode && (
                <div className="form-section">
                  <div className="marel-reference">
                    <p><strong>Le simulateur M@rel est la référence officielle</strong> pour calculer votre retraite progressive avec précision.</p>
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-group advanced-field">
                        <label className="form-label">
                          Salaire annuel moyen des 25 meilleures années (€ brut)
                        </label>
                        <p className="field-explanation">Base de calcul officielle pour votre pension - <strong>en salaire brut</strong></p>
                      <input
                        type="number"
                        value={formData.salaireAnnuelMoyen}
                        onChange={(e) => setFormData({...formData, salaireAnnuelMoyen: e.target.value})}
                        placeholder="Ex: 45000"
                        className="form-input"
                        style={{backgroundColor: 'white', color: '#1e293b'}}
                      />
                    </div>

                    <div className="form-group advanced-field">
                      <label className="form-label">
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

                    <div className="form-group advanced-field">
                      <label className="form-label">
                        Surcote/Décote (%)
                      </label>
                      <p className="field-explanation">
                        {formData.trimestresValides && formData.anneeNaissance 
                          ? calculateDecoteSurcote(formData.trimestresValides, formData.anneeNaissance).explanation
                          : 'Calcul automatique basé sur les trimestres validés et l\'année de naissance'
                        }
                      </p>
                      <div className="input-with-suffix">
                        <input
                          type="number"
                          value={formData.surcoteDecote}
                          readOnly
                          className="form-input"
                          style={{backgroundColor: '#f8f9fa', cursor: 'not-allowed'}}
                          step="0.1"
                        />
                        <span className="input-suffix">%</span>
                      </div>
                    </div>

                  {/* Boutons d'action pour mode avancé */}
                  <div className="simulation-actions">
                  <button 
                  className="btn-primary btn-results"
                    onClick={() => {
                      if (validateForResults()) {
                        setActiveTab('resultats');
                      }
                    }}
                  >
                  <div className="btn-content">
                    <div className="btn-title">Voir les Résultats</div>
                    <div className="btn-subtitle">Calculs et projections</div>
                  </div>
                  </button>
                
                  <button 
                  className="btn-secondary btn-advanced"
                    onClick={() => {
                    setSimulationMode('simplified');
                    setShowAdvancedMode(false);
                  }}
                >
                  <div className="btn-content">
                    <div className="btn-title">Mode Simplifié</div>
                    <div className="btn-subtitle">Calcul rapide et simple</div>
                  </div>
                  </button>
                </div>
              </div>
              )}
            </div>
          )}

          {/* Onglet Résultats */}
          {activeTab === 'resultats' && (
            <div className="resultats-tab">
              {resultats ? (
                <div className="results-container">
                  <div className="results-summary">
                    <h3>Vos résultats de retraite progressive</h3>
                    
                    {/* Section Pendant la retraite progressive */}
                    <div className="results-section">
                      <h4 className="section-title">Pendant votre retraite progressive, vous percevez :</h4>
                      <div className="results-grid">
                        <div className="result-card">
                          <h4>Revenu Net Partiel</h4>
                          <p className="result-value">{(resultats.salairePartiel * 0.78).toFixed(2)} € nets</p>
                          <p className="result-explanation">
                            Ce montant correspond à votre activité à temps partiel ({formData.tempsPartiel}%) après déduction des cotisations
                          </p>
                    </div>
                        <div className="result-card">
                          <h4>Retraite progressive</h4>
                          <p className="result-value">{resultats.pensionProgressive.toFixed(2)} €</p>
                          <p className="result-explanation">
                            Ce montant correspond à 40% de votre retraite complète avec application de la décote/surcote. Cette part est versée par les régimes participant à la retraite progressive.
                          </p>
                        </div>
                        <div className="result-card total">
                          <h4>Montant total</h4>
                          <p className="result-value">{((resultats.salairePartiel * 0.78) + resultats.pensionProgressive).toFixed(2)} € nets/mois</p>
                          <p className="result-explanation">
                            Revenu total pendant votre retraite progressive
                      </p>
                        </div>
                      </div>
                    </div>

                    {/* Section Après la retraite progressive */}
                    <div className="results-section">
                      <h4 className="section-title">Après votre retraite progressive, vous percevrez :</h4>
                      <div className="results-grid">
                        <div className="result-card total">
                          <h4>Retraite complète</h4>
                          <p className="result-value">{resultats.pensionComplete.toFixed(2)} € nets/mois</p>
                          <p className="result-explanation">
                            Ce montant correspond à la totalité de votre retraite et prend en compte les droits enregistrés pendant votre retraite progressive.
                      </p>
                    </div>
                  </div>
                </div>
                </div>

                    {/* Section des calculs détaillés */}
                    <div className="calculations-details">
                      <h4>🔍 Détail des calculs</h4>
                      <div className="calculation-steps">
                        <div className="calculation-step">
                          <div className="step-title">1. Salaire brut mensuel</div>
                          <div className="step-value">{formData.salaireBrut} €</div>
                  </div>

                        <div className="calculation-step">
                          <div className="step-title">2. Temps partiel</div>
                          <div className="step-value">{formData.tempsPartiel}%</div>
                    </div>
                    
                        <div className="calculation-step">
                          <div className="step-title">3. Revenu Net Partiel (temps partiel)</div>
                          <div className="step-value">({formData.salaireBrut} × {formData.tempsPartiel}%) × 78% = {(resultats.salairePartiel * 0.78).toFixed(2)} € nets</div>
                    </div>
                    
                        {resultats.modeCalcul === 'avance' ? (
                          <>
                            <div className="calculation-step">
                              <div className="step-title">4. Salaire annuel moyen</div>
                              <div className="step-value">{formData.salaireAnnuelMoyen} €</div>
        </div>

                            <div className="calculation-step">
                              <div className="step-title">5. Trimestres validés</div>
                              <div className="step-value">{formData.trimestresValides} / {getTrimestresRequis(formData.anneeNaissance)}</div>
          </div>

                            <div className="calculation-step">
                              <div className="step-title">6. Taux de pension</div>
                              <div className="step-value">{(formData.trimestresValides / getTrimestresRequis(formData.anneeNaissance) * 100).toFixed(1)}%</div>
                  </div>
                  
                            <div className="calculation-step">
                              <div className="step-title">7. Pension complète (avant surcote/décote)</div>
                              <div className="step-value">({formData.salaireAnnuelMoyen} × 50% × {(formData.trimestresValides / getTrimestresRequis(formData.anneeNaissance) * 100).toFixed(1)}%) / 12 = {((formData.salaireAnnuelMoyen * 0.5 * (formData.trimestresValides / getTrimestresRequis(formData.anneeNaissance))) / 12).toFixed(2)} €</div>
                    </div>

                            {formData.surcoteDecote && parseFloat(formData.surcoteDecote) !== 0 && (
                              <div className="calculation-step">
                                <div className="step-title">8. Application surcote/décote</div>
                                <div className="step-value">{((formData.salaireAnnuelMoyen * 0.5 * (formData.trimestresValides / getTrimestresRequis(formData.anneeNaissance))) / 12) * (1 + parseFloat(formData.surcoteDecote) / 100)} € × (1 {parseFloat(formData.surcoteDecote) >= 0 ? '+' : ''}{formData.surcoteDecote}%) = {resultats.pensionComplete.toFixed(2)} €</div>
                      </div>
                            )}

                            <div className="calculation-step">
                              <div className="step-title">{formData.surcoteDecote && parseFloat(formData.surcoteDecote) !== 0 ? '9' : '8'}. Part de pension progressive</div>
                              <div className="step-value">Pension complète (sans décote) × 40% × (1 {parseFloat(formData.surcoteDecote) >= 0 ? '+' : ''}{formData.surcoteDecote}%) = {resultats.pensionProgressive.toFixed(2)} €</div>
                          </div>
                                      </>
                                    ) : (
                                      <>
                            <div className="calculation-step">
                              <div className="step-title">4. Pension complète estimée</div>
                              <div className="step-value">{formData.pensionEstimee || (formData.salaireBrut * 0.78 * 0.45).toFixed(0)} €</div>
                        </div>

                            <div className="calculation-step">
                              <div className="step-title">5. Part de pension progressive</div>
                              <div className="step-value">Pension complète (sans décote) × 40% × (1 {parseFloat(formData.surcoteDecote) >= 0 ? '+' : ''}{formData.surcoteDecote}%) = {resultats.pensionProgressive.toFixed(2)} €</div>
                        </div>
                          </>
                        )}
                        
                        <div className="calculation-step total">
                          <div className="step-title">💰 Revenu pendant la retraite progressive</div>
                          <div className="step-value">{(resultats.salairePartiel * 0.78).toFixed(2)} € nets + {resultats.pensionProgressive.toFixed(2)} € = {((resultats.salairePartiel * 0.78) + resultats.pensionProgressive).toFixed(2)} € nets</div>
                    </div>

                        <div className="calculation-step total">
                          <div className="step-title">🏖️ Revenu après la retraite progressive</div>
                          <div className="step-value">{resultats.pensionComplete.toFixed(2)} € (retraite complète)</div>
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
              {formData.salaireBrut ? (
                <div className="scenarios-container">
                  <h3>Comparaison des scénarios</h3>
                  <p>Analysez l'impact financier de la retraite progressive</p>
                  
                  <div className="scenarios-chart-container">
                    <div className="chart-grid">
                      {[40, 50, 60, 70, 80].map((pourcentage) => {
                        const scenario = calculerScenario(pourcentage);
                        if (!scenario) return null;
                        
                        return (
                          <div key={pourcentage} className="scenario-column">
                            <div className="column-header">
                              <h4>{pourcentage}%</h4>
                            </div>
                            
                            <div className="chart-stack">
                              {/* Perte de revenu (fond rouge pâle) */}
                              <div className="chart-bar perte-revenu" style={{height: `${(scenario.perteRevenu / scenario.salaireNet) * 100}%`}}>
                                <div className="bar-content">
                                  <span className="bar-label">Perte</span>
                                  <span className="bar-value">{scenario.perteRevenu}€</span>
                                </div>
                              </div>
                              
                              {/* Revenu partiel (fond bleu) */}
                              <div className="chart-bar revenu-partiel" style={{height: `${(scenario.salairePartiel / scenario.salaireNet) * 100}%`}}>
                                <div className="bar-content">
                                  <span className="bar-label">Revenu Partiel</span>
                                  <span className="bar-value">{scenario.salairePartiel}€</span>
                                </div>
                              </div>
                              
                              {/* Retraite progressive (fond vert) */}
                              <div className="chart-bar retraite-progressive" style={{height: `${(scenario.pensionProgressive / scenario.salaireNet) * 100}%`}}>
                                <div className="bar-content">
                                  <span className="bar-label">Retraite progressive</span>
                                  <span className="bar-value">{scenario.pensionProgressive}€</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="column-footer">
                              <div className="total-revenu">
                                <span className="total-label">Total:</span>
                                <span className="total-value">{scenario.revenuTotal}€</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="chart-legend">
                      <div className="legend-item">
                        <div className="legend-color perte-revenu"></div>
                        <span>Perte de revenu</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color revenu-partiel"></div>
                        <span>Revenu Partiel</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color retraite-progressive"></div>
                        <span>Retraite Progressive</span>
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
      </div>
    </div>
  );
};

export default CalculateurAvance;
