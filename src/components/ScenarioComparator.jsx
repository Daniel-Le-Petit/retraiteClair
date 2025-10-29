import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, Euro } from 'lucide-react';
import styles from './ScenarioComparator.module.css';

const ScenarioComparator = ({ 
  currentScenario, 
  onScenarioSelect, 
  baseData 
}) => {
  const [selectedPercentage, setSelectedPercentage] = useState(currentScenario?.tempsPartiel || 80);
  const [comparisonData, setComparisonData] = useState(null);

  // Calculer les données de comparaison
  useEffect(() => {
    if (!baseData) return;

    const calculateScenario = (percentage) => {
      const salaireBrutTempsPartiel = baseData.salaireBrut * (percentage / 100);
      const salaireNetTempsPartiel = salaireBrutTempsPartiel * 0.7698;
      
      // Pension progressive (simplifiée)
      const pensionProgressiveBrut = baseData.salaireBrut * 0.1733;
      const pensionProgressiveNet = pensionProgressiveBrut * 0.9;
      
      const totalNet = salaireNetTempsPartiel + pensionProgressiveNet + (baseData.revenusComplementaires || 0);
      
      return {
        percentage,
        totalNet,
        salaireNetPartiel: salaireNetTempsPartiel,
        pensionNet: pensionProgressiveNet,
        hoursPerWeek: Math.round((percentage / 100) * 35),
        daysOffPerWeek: Math.round(((100 - percentage) / 100) * 5 * 10) / 10 // Arrondi à 1 décimale
      };
    };

    const scenarios = [40, 50, 60, 70, 80].map(calculateScenario);
    const currentScenarioData = calculateScenario(selectedPercentage);
    const currentScenarioRef = currentScenario ? calculateScenario(currentScenario.tempsPartiel) : scenarios[4]; // 80% par défaut

    setComparisonData({
      scenarios,
      current: currentScenarioData,
      reference: currentScenarioRef
    });
  }, [selectedPercentage, baseData, currentScenario]);

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
    return diff >= 0 ? '#10b981' : '#dc2626';
  };

  if (!comparisonData) return null;

  const { current, reference, scenarios } = comparisonData;
  const vsTempsPlein = calculateDifference(current.totalNet, scenarios[4].totalNet); // 80% = temps plein
  const vsActuel = calculateDifference(current.totalNet, reference.totalNet);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          🔄 Explorer d'autres temps partiels
        </h3>
        <p className={styles.subtitle}>
          Déplacez le curseur pour comparer :
        </p>
      </div>

      {/* Slider interactif */}
      <div className={styles.sliderSection}>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="40"
            max="80"
            step="10"
            value={selectedPercentage}
            onChange={(e) => setSelectedPercentage(parseInt(e.target.value))}
            className={styles.slider}
          />
          <div className={styles.sliderLabels}>
            <span>40%</span>
            <span>50%</span>
            <span>60%</span>
            <span>70%</span>
            <span>80%</span>
          </div>
          <div className={styles.sliderValue}>{selectedPercentage}%</div>
        </div>
      </div>

      {/* Détail du scénario sélectionné */}
      <div className={styles.scenarioDetail}>
        <div className={styles.scenarioHeader}>
          <h4>Avec {selectedPercentage}% de temps partiel :</h4>
        </div>
        
        <div className={styles.scenarioContent}>
          <div className={styles.revenueInfo}>
            <div className={styles.revenueItem}>
              <Euro size={16} />
              <span>Revenu total : {formatCurrency(current.totalNet)}/mois</span>
            </div>
            
            <div className={styles.comparisonItem}>
              {getDifferenceIcon(vsTempsPlein.amount)}
              <span style={{ color: getDifferenceColor(vsTempsPlein.amount) }}>
                vs temps plein : {formatCurrency(vsTempsPlein.amount)} ({vsTempsPlein.percentage > 0 ? '+' : ''}{vsTempsPlein.percentage.toFixed(0)}%)
              </span>
            </div>
            
            {currentScenario && (
              <div className={styles.comparisonItem}>
                {getDifferenceIcon(vsActuel.amount)}
                <span style={{ color: getDifferenceColor(vsActuel.amount) }}>
                  vs votre choix actuel ({currentScenario.tempsPartiel}%) : {formatCurrency(vsActuel.amount)}
                </span>
              </div>
            )}
          </div>
          
          <div className={styles.timeInfo}>
            <div className={styles.timeItem}>
              <Clock size={16} />
              <span>Journées non travaillées : {current.daysOffPerWeek} jours/semaine</span>
            </div>
          </div>
          
          <button
            className={styles.selectButton}
            onClick={() => onScenarioSelect && onScenarioSelect(selectedPercentage)}
          >
            Choisir ce scénario
          </button>
        </div>
      </div>

      {/* Tableau récapitulatif */}
      <div className={styles.tableSection}>
        <h4 className={styles.tableTitle}>Comparaison rapide :</h4>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.tableCell}>%</div>
            <div className={styles.tableCell}>Revenu</div>
            <div className={styles.tableCell}>vs actuel</div>
            <div className={styles.tableCell}>Temps libre</div>
          </div>
          
          {scenarios.map((scenario) => {
            const diff = calculateDifference(scenario.totalNet, reference.totalNet);
            const isCurrent = scenario.percentage === (currentScenario?.tempsPartiel || 80);
            
            return (
              <div 
                key={scenario.percentage} 
                className={`${styles.tableRow} ${isCurrent ? styles.currentRow : ''}`}
              >
                <div className={styles.tableCell}>
                  {scenario.percentage}%
                  {isCurrent && <span className={styles.currentBadge}>✓</span>}
                </div>
                <div className={styles.tableCell}>
                  {formatCurrency(scenario.totalNet)}
                </div>
                <div className={styles.tableCell}>
                  <span style={{ color: getDifferenceColor(diff.amount) }}>
                    {diff.percentage > 0 ? '+' : ''}{diff.percentage.toFixed(0)}%
                  </span>
                </div>
                <div className={styles.tableCell}>
                  {scenario.daysOffPerWeek} jours/sem.
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScenarioComparator;
