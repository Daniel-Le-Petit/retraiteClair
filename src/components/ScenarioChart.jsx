import React from 'react';
import styles from './ScenarioChart.module.css';

const ScenarioChart = ({ data }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Utiliser la même logique que la simulation principale pour les scénarios
  const calculateScenario = (percentage) => {
    const salaireBrutTempsPartiel = data.revenusBruts.tempsPlein * (percentage / 100);
    // Utiliser le même coefficient que le calcul principal : 0.7698 (76.98% du brut)
    const salaireNetTempsPartiel = salaireBrutTempsPartiel * 0.7698;
    
    // Utiliser la même logique que la simulation principale pour la pension progressive
    let pensionProgressiveBrut, pensionProgressiveNet;
    
    // Si on a une pension complète dans les données (mode avancé)
    if (data.revenusBruts.pensionComplete && data.revenusBruts.pensionComplete > 0) {
      // Mode avancé : utiliser la pension complète calculée
      // La pension progressive = 17.33% du salaire brut (ratio exact M@rel)
      pensionProgressiveBrut = data.revenusBruts.tempsPlein * 0.1733;
      pensionProgressiveNet = pensionProgressiveBrut * 0.9;
    } else {
      // Mode simplifié : calcul selon les valeurs M@rel exactes
      // Pension progressive brut = 17.33% du salaire brut (ratio exact M@rel)
      pensionProgressiveBrut = data.revenusBruts.tempsPlein * 0.1733;
      pensionProgressiveNet = pensionProgressiveBrut * 0.9;
    }
    
    // Ajouter les revenus complémentaires si présents
    const revenusComplementaires = data.revenusNets?.revenusComplementaires || 0;
    const totalNet = salaireNetTempsPartiel + pensionProgressiveNet + revenusComplementaires;
    
    return {
      percentage,
      salaireBrut: salaireBrutTempsPartiel,
      salaireNetPartiel: salaireNetTempsPartiel,
      pensionProgressiveBrut,
      pensionProgressiveNet,
      totalNet
    };
  };

  // Calcul des scénarios pour différents temps partiels (ordre croissant : 40% → 80%)
  const scenarios = [40, 50, 60, 70, 80].map(calculateScenario);

  // Trouver les valeurs min/max pour l'échelle
  const maxValue = Math.max(...scenarios.map(s => s.totalNet));
  const minValue = Math.min(...scenarios.map(s => s.totalNet));

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>Comparaison des scénarios en revenu net</h3>
      <div className={styles.chart}>
        <div className={styles.chartArea}>
          <div className={styles.bars}>
            {scenarios.map((scenario, index) => {
              const height = ((scenario.totalNet - minValue) / (maxValue - minValue)) * 100;
              const getBarClass = (percentage) => {
                switch (percentage) {
                  case 40: return styles.bar40;
                  case 50: return styles.bar50;
                  case 60: return styles.bar60;
                  case 70: return styles.bar70;
                  case 80: return styles.bar80;
                  default: return styles.bar40;
                }
              };
              return (
                <div key={scenario.percentage} className={styles.barContainer}>
                  <div 
                    className={`${styles.bar} ${getBarClass(scenario.percentage)}`}
                    style={{ height: `${height}%` }}
                    title={`${scenario.percentage}%: ${formatCurrency(scenario.totalNet)}`}
                  >
                    <div className={styles.barValue}>
                      {scenario.percentage}%
                    </div>
                  </div>
                  <div className={styles.barLabel}>
                    {formatCurrency(scenario.totalNet)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioChart;