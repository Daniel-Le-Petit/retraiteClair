import React from 'react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

const FinancialImpactSection = ({ quickCalc, calculRapide, pensionUtilisee }) => {
  const currentSalary = quickCalc.salaire || 0;
  const progressiveIncome = calculRapide.revenuTotal || 0;
  const finalPension = pensionUtilisee || 0;

  const periods = [
    {
      id: 'current',
      title: 'Situation actuelle',
      icon: TrendingUp,
      amount: currentSalary,
      description: 'Salaire à temps plein',
      color: '#3b82f6',
      bgColor: '#eff6ff',
      borderColor: '#dbeafe'
    },
    {
      id: 'progressive',
      title: 'Retraite progressive',
      icon: Minus,
      amount: progressiveIncome,
      description: 'Salaire partiel + Pension',
      details: `Salaire: ${calculRapide.salairePartiel?.toFixed(0) || 0}€ | Pension: ${calculRapide.pensionProgressive?.toFixed(0) || 0}€`,
      color: '#10b981',
      bgColor: '#f0fdf4',
      borderColor: '#dcfce7'
    },
    {
      id: 'final',
      title: 'Retraite définitive',
      icon: TrendingDown,
      amount: finalPension,
      description: 'Pension complète',
      color: '#f59e0b',
      bgColor: '#fffbeb',
      borderColor: '#fef3c7'
    }
  ];

  const calculatePercentageChange = (from, to) => {
    if (from === 0) return 0;
    return ((to - from) / from) * 100;
  };

  const currentToProgressive = calculatePercentageChange(currentSalary, progressiveIncome);
  const progressiveToFinal = calculatePercentageChange(progressiveIncome, finalPension);
  const currentToFinal = calculatePercentageChange(currentSalary, finalPension);

  return (
    <section className="financial-impact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Impact financier de votre transition</h2>
          <p className="section-description">
            Visualisez l'évolution de vos revenus à travers les trois phases de votre retraite
          </p>
        </div>

        <div className="periods-container">
          {periods.map((period, index) => {
            const Icon = period.icon;
            const isLast = index === periods.length - 1;
            
            return (
              <div key={period.id} className="period-wrapper">
                <div 
                  className="period-card"
                  style={{
                    '--period-color': period.color,
                    '--period-bg': period.bgColor,
                    '--period-border': period.borderColor
                  }}
                >
                  <div className="period-header">
                    <div className="period-icon">
                      <Icon size={24} />
                    </div>
                    <h3 className="period-title">{period.title}</h3>
                  </div>
                  
                  <div className="period-amount">
                    <span className="amount-value">{period.amount.toFixed(0)}</span>
                    <span className="amount-currency">€</span>
                  </div>
                  
                  <div className="period-description">
                    <p className="description-text">{period.description}</p>
                    {period.details && (
                      <p className="description-details">{period.details}</p>
                    )}
                  </div>
                </div>
                
                {!isLast && (
                  <div className="period-arrow">
                    <div className="arrow-line"></div>
                    <div className="arrow-head"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="impact-summary">
          <h3>Résumé des variations</h3>
          <div className="variations-grid">
            <div className="variation-item">
              <span className="variation-label">Actuel → Progressive</span>
              <span className={`variation-value ${currentToProgressive >= 0 ? 'positive' : 'negative'}`}>
                {currentToProgressive >= 0 ? '+' : ''}{currentToProgressive.toFixed(1)}%
              </span>
            </div>
            <div className="variation-item">
              <span className="variation-label">Progressive → Finale</span>
              <span className={`variation-value ${progressiveToFinal >= 0 ? 'positive' : 'negative'}`}>
                {progressiveToFinal >= 0 ? '+' : ''}{progressiveToFinal.toFixed(1)}%
              </span>
            </div>
            <div className="variation-item">
              <span className="variation-label">Actuel → Finale</span>
              <span className={`variation-value ${currentToFinal >= 0 ? 'positive' : 'negative'}`}>
                {currentToFinal >= 0 ? '+' : ''}{currentToFinal.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialImpactSection;


