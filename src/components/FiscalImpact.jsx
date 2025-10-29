import React, { useState } from 'react';
import { Euro, TrendingUp, Info, Calculator } from 'lucide-react';
import Tooltip from './Tooltip';
import styles from './FiscalImpact.module.css';

const FiscalImpact = ({ fiscalData, simulationData }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (!fiscalData) return null;

  // Utiliser economieAnnuelle si disponible, sinon convertir economie (mensuel) en annuel
  const annualSavings = fiscalData.economieAnnuelle || (fiscalData.economie ? fiscalData.economie * 12 : 0);
  const monthlySavings = fiscalData.economie || (annualSavings / 12);
  const fiveYearSavings = annualSavings * 5;

  const tooltipContent = `Calcul de l'économie fiscale :
─────────────────────────
• Tranche d'imposition réduite
• Abattement pension retraite : 10%
• Calcul basé sur : Couple, 2 parts
• Revenus nets considérés : ${formatCurrency(simulationData?.revenusNets?.total || 0)}/mois`;

  return (
    <div className={`${styles.container} animate-slideUp animate-delay-300`}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <Euro size={24} />
        </div>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>Économie fiscale annuelle</h3>
          <div className={styles.amount}>
            {formatCurrency(annualSavings)} / an
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.monthlySavings}>
          <TrendingUp size={16} />
          <span>Soit {formatCurrency(monthlySavings)} d'économie par mois</span>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.detailsSection}>
          <div className={styles.detailsHeader}>
            <Calculator size={16} />
            <span>Détail :</span>
          </div>
          
          <ul className={styles.detailsList}>
            <li>Tranche d'imposition réduite</li>
            <li>Abattement pension retraite : 10%</li>
            <li>Calcul basé sur : Couple, 2 parts</li>
          </ul>

          <button
            className={styles.detailsButton}
            onClick={() => setShowDetails(!showDetails)}
          >
            <Tooltip content={tooltipContent}>
              <Info size={16} />
            </Tooltip>
            Comment est calculée cette économie ?
          </button>
        </div>

        <div className={styles.projection}>
          <div className={styles.projectionIcon}>💡</div>
          <div className={styles.projectionText}>
            Sur 5 ans de RP, c'est {formatCurrency(fiveYearSavings)} d'économies !
          </div>
        </div>

        {showDetails && (
          <div className={styles.expandedDetails}>
            <h4>Calcul détaillé de l'économie fiscale</h4>
            <div className={styles.calculationSteps}>
              <div className={styles.step}>
                <div className={styles.stepTitle}>Revenus temps plein :</div>
                <div className={styles.stepValue}>
                  {formatCurrency(simulationData?.revenusNets?.tempsPlein || 0)}/mois
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepTitle}>Revenus retraite progressive :</div>
                <div className={styles.stepValue}>
                  {formatCurrency(simulationData?.revenusNets?.total || 0)}/mois
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepTitle}>Différence annuelle :</div>
                <div className={styles.stepValue}>
                  {formatCurrency((simulationData?.revenusNets?.tempsPlein || 0) - (simulationData?.revenusNets?.total || 0))} × 12 mois
                </div>
              </div>
              <div className={styles.stepResult}>
                <div className={styles.stepTitle}>Économie d'impôt :</div>
                <div className={styles.stepValue}>
                  {formatCurrency(annualSavings)}/an
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiscalImpact;
