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

  // Calcul des scénarios pour différents temps partiels (ordre croissant : 40% → 80%)
  const scenarios = [40, 50, 60, 70, 80].map(percentage => {
    const salaireBrut = data.revenusBruts.tempsPlein * (percentage / 100);
    const salaireNetTempsPlein = data.revenusBruts.tempsPlein * 0.7883;
    const salaireNetPartiel = salaireBrut * 0.7883; // 78.83% du brut temps partiel
    const pensionProgressiveBrut = data.revenusBruts.tempsPlein * 0.1728;
    const pensionProgressiveNet = pensionProgressiveBrut * 0.9; // 90% du brut
    const totalNet = salaireNetPartiel + pensionProgressiveNet;
    
    return {
      percentage,
      salaireBrut,
      salaireNetPartiel,
      pensionProgressiveBrut,
      pensionProgressiveNet,
      totalNet
    };
  });

  // Trouver les valeurs min/max pour l'échelle
  const maxValue = Math.max(...scenarios.map(s => s.totalNet));
  const minValue = Math.min(...scenarios.map(s => s.totalNet));

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>Comparaison des scénarios en revenu net</h3>
      <div className={styles.chart}>
        <div className={styles.yAxis}>
          <div className={styles.yLabel}>Revenus nets (€)</div>
          <div className={styles.yScale}>
            {[maxValue, (maxValue + minValue) / 2, minValue].map(value => (
              <div key={value} className={styles.yTick}>
                {formatCurrency(value)}
              </div>
            ))}
          </div>
        </div>
        
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
                      {formatCurrency(scenario.totalNet)}
                    </div>
                  </div>
                  <div className={styles.barLabel}>
                    {scenario.percentage}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: '#3498db' }}></div>
          <span>Revenus nets totaux</span>
        </div>
      </div>
    </div>
  );
};

export default ScenarioChart;
