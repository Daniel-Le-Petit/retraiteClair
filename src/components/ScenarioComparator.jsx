import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, Euro, CheckCircle } from 'lucide-react';
import Payslip from './Payslip';
import { trackEvent } from '../utils/tracking';
import styles from './ScenarioComparator.module.css';

const ScenarioComparator = ({ 
  currentScenario, 
  onScenarioSelect, 
  baseData,
  simulationData
}) => {
  const [selectedPercentage, setSelectedPercentage] = useState(currentScenario?.tempsPartiel || 80);
  const [comparisonData, setComparisonData] = useState(null);
  const [comparisonViewed, setComparisonViewed] = useState(false);

  // Mettre à jour selectedPercentage quand currentScenario change
  useEffect(() => {
    if (currentScenario?.tempsPartiel) {
      setSelectedPercentage(currentScenario.tempsPartiel);
    }
  }, [currentScenario]);


  // Calculer les données de comparaison
  useEffect(() => {
    if (!baseData) return;

    // Récupérer l'information sur les cotisations sur 100%
    const cotisationSur100Pourcent = simulationData?.details?.cotisationSur100Pourcent || false;
    const salaireBrutTempsPlein = baseData.salaireBrut;

    const calculateScenario = (percentage) => {
      const salaireBrutTempsPartiel = salaireBrutTempsPlein * (percentage / 100);
      
      // Calculer le salaire net selon le toggle
      let salaireNetTempsPartiel;
      if (cotisationSur100Pourcent) {
        // Cotisations sur 100% du salaire brut (temps plein)
        const cotisations = salaireBrutTempsPlein * 0.2302;
        // Salaire net = salaire brut temps partiel - cotisations sur temps plein
        salaireNetTempsPartiel = salaireBrutTempsPartiel - cotisations;
      } else {
        // Cotisations sur le salaire brut temps partiel (76.98% du brut temps partiel)
        salaireNetTempsPartiel = salaireBrutTempsPartiel * 0.7698;
      }
      
      // Pension progressive : seulement si temps partiel < 100%
      // À 100%, on est en temps plein, donc pas de pension progressive
      let pensionProgressiveBrut = 0;
      let pensionProgressiveNet = 0;
      
      if (percentage < 100) {
        pensionProgressiveBrut = baseData.salaireBrut * 0.1733;
        pensionProgressiveNet = pensionProgressiveBrut * 0.9;
      }
      
      const totalNet = salaireNetTempsPartiel + pensionProgressiveNet + (baseData.revenusComplementaires || 0);
      
      return {
        percentage,
        totalNet,
        salaireNetPartiel: salaireNetTempsPartiel,
        pensionNet: pensionProgressiveNet,
        hoursPerWeek: Math.round((percentage / 100) * 35),
        daysOffPerWeek: percentage === 100 ? 0 : Math.round(((100 - percentage) / 100) * 5 * 10) / 10 // Arrondi à 1 décimale
      };
    };

    const scenarios = [40, 50, 60, 70, 80, 100].map(calculateScenario);
    const currentScenarioData = calculateScenario(selectedPercentage);
    const currentScenarioRef = currentScenario ? calculateScenario(currentScenario.tempsPartiel) : scenarios[5]; // 100% par défaut (temps plein)

    setComparisonData({
      scenarios,
      current: currentScenarioData,
      reference: currentScenarioRef
    });
  }, [selectedPercentage, baseData, currentScenario, simulationData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateDifference = (current, reference) => {
    const diff = current - reference;
    const percentage = reference > 0 ? ((diff / reference) * 100) : 0;
    return { amount: diff, percentage };
  };

  const getDifferenceIcon = (diff) => {
    return diff >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />;
  };

  const getDifferenceColor = (diff) => {
    return diff >= 0 ? '#10b981' : '#f59e0b';
  };

  // Couleurs dégradées pour chaque scénario
  const getScenarioGradient = (percentage) => {
    const gradients = {
      40: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', // Rouge
      50: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', // Orange
      60: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', // Vert
      70: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', // Bleu
      80: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', // Violet
      100: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' // Gris foncé pour temps plein
    };
    return gradients[percentage] || gradients[60];
  };

  const getScenarioCardGradient = (percentage) => {
    const gradients = {
      40: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', // Rouge clair
      50: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', // Orange clair
      60: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', // Vert clair
      70: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', // Bleu clair
      80: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', // Violet clair
      100: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' // Gris clair pour temps plein
    };
    return gradients[percentage] || gradients[60];
  };

  if (!comparisonData) return null;

  const { current, reference, scenarios } = comparisonData;
  const vsTempsPlein = calculateDifference(current.totalNet, scenarios[5].totalNet); // 100% = temps plein
  const vsActuel = calculateDifference(current.totalNet, reference.totalNet);

  return (
    <div className={`${styles.container} animate-slideUp animate-delay-200`}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          🔄 Explorer d'autres temps partiels
        </h3>
        <p className={styles.subtitle}>
          Cliquez sur un bloc de couleur pour lancer le recalcul avec ce scénario
        </p>
      </div>

      {/* Graphique de comparaison visuel - Vue d'ensemble d'abord */}
      <div className={styles.chartSection}>
        <div className={styles.chartContainer}>
          <div className={styles.chartBars}>
            {scenarios.map((scenario) => {
              const diff = calculateDifference(scenario.totalNet, reference.totalNet);
              const isCurrent = scenario.percentage === (currentScenario?.tempsPartiel || 80);
              const maxRevenu = Math.max(...scenarios.map(s => s.totalNet));
              const barHeight = (scenario.totalNet / maxRevenu) * 100;
              const vsTempsPleinDiff = calculateDifference(scenario.totalNet, scenarios[5].totalNet);
              
              return (
                <div 
                  key={scenario.percentage} 
                  className={styles.barGroup}
                  onClick={() => {
                    const newPercentage = scenario.percentage;
                    const previousPercentage = selectedPercentage;
                    
                    // Track la vue de la comparaison si c'est la première fois
                    if (!comparisonViewed) {
                      trackEvent('scenario_comparison_viewed', {
                        scenarios_count: scenarios.length,
                        default_scenario: currentScenario?.tempsPartiel || 80,
                        page: 'resultats'
                      });
                      setComparisonViewed(true);
                    }
                    
                    // Track la sélection du scénario
                    trackEvent('scenario_selected', {
                      scenario_percentage: newPercentage,
                      previous_percentage: previousPercentage,
                      revenu_estime: scenario.totalNet,
                      vs_temps_plein: vsTempsPleinDiff.amount,
                      page: 'resultats'
                    });
                    
                    setSelectedPercentage(newPercentage);
                    // Lancer automatiquement le calcul avec le nouveau pourcentage
                    if (onScenarioSelect) {
                      onScenarioSelect(newPercentage);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.barWrapper}>
                    <div 
                      className={`${styles.bar} ${isCurrent ? styles.currentBar : ''}`}
                      style={{ 
                        height: `${barHeight}%`,
                        background: getScenarioGradient(scenario.percentage)
                      }}
                    >
                      <div className={styles.barValue}>
                        {formatCurrency(scenario.totalNet)}
                      </div>
                      {isCurrent && (
                        <div className={styles.currentIndicator}>
                          <CheckCircle size={16} />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className={styles.barLabel}>
                    <div className={styles.percentageLabel}>
                      {scenario.percentage}%
                      {isCurrent && <span className={styles.currentDot}>●</span>}
                    </div>
                    <div className={styles.diffLabel} style={{ color: getDifferenceColor(diff.amount) }}>
                      {diff.percentage > 0 ? '+' : ''}{diff.percentage.toFixed(0)}%
                    </div>
                    <div className={styles.daysLabel}>
                      {scenario.daysOffPerWeek} jours libres
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Détail du scénario sélectionné - Après la vue d'ensemble */}
      <div className={styles.scenarioDetail}>
        <div className={styles.scenarioHeader}>
          <h4>Scénario sélectionné : {selectedPercentage}% de temps partiel</h4>
        </div>
        
        <div className={styles.visualSummary}>
          {/* Revenu principal en grand */}
          <div 
            className={styles.mainRevenueCard}
            style={{ background: getScenarioCardGradient(selectedPercentage) }}
          >
            <div 
              className={styles.revenueIcon}
              style={{ background: getScenarioGradient(selectedPercentage) }}
            >
              <Euro size={32} />
            </div>
            <div className={styles.revenueContent}>
              <div className={styles.revenueLabel}>Revenu mensuel</div>
              <div className={styles.revenueAmount}>{formatCurrency(current.totalNet)}</div>
            </div>
          </div>
          
          {/* Comparaisons visuelles */}
          <div className={styles.comparisonsGrid}>
            <div className={styles.comparisonCard}>
              <div className={styles.comparisonHeader}>
                {getDifferenceIcon(vsTempsPlein.amount)}
                <span>vs Temps plein (100%)</span>
              </div>
              <div 
                className={`${styles.comparisonValue} ${vsTempsPlein.amount < 0 ? styles.negativeValue : ''}`}
                style={{ color: getDifferenceColor(vsTempsPlein.amount) }}
              >
                {formatCurrency(vsTempsPlein.amount)}
                <span className={styles.comparisonPercentage}>
                  ({vsTempsPlein.percentage > 0 ? '+' : ''}{vsTempsPlein.percentage.toFixed(0)}%)
                </span>
              </div>
            </div>
            
            {currentScenario && currentScenario.tempsPartiel !== selectedPercentage && (
              <div className={styles.comparisonCard}>
                <div className={styles.comparisonHeader}>
                  {getDifferenceIcon(vsActuel.amount)}
                  <span>vs Votre choix ({currentScenario.tempsPartiel}%)</span>
                </div>
                <div 
                  className={`${styles.comparisonValue} ${vsActuel.amount < 0 ? styles.negativeValue : ''}`}
                  style={{ color: getDifferenceColor(vsActuel.amount) }}
                >
                  {formatCurrency(vsActuel.amount)}
                  <span className={styles.comparisonPercentage}>
                    ({vsActuel.percentage > 0 ? '+' : ''}{vsActuel.percentage.toFixed(0)}%)
                  </span>
                </div>
              </div>
            )}
            
            <div className={`${styles.comparisonCard} ${styles.freeTimeCard}`}>
              <div className={styles.comparisonHeader}>
                <Clock size={20} />
                <span>Temps libre</span>
              </div>
              <div className={styles.comparisonValue}>
                {current.daysOffPerWeek} jours/semaine
                <span className={styles.comparisonPercentage}>
                  ({Math.round((current.daysOffPerWeek / 5) * 100)}% de la semaine)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feuille de paie à la fin du bloc */}
      {simulationData && (
        <div className={styles.payslipSection}>
          <Payslip simulationData={simulationData} />
        </div>
      )}
    </div>
  );
};

export default ScenarioComparator;
