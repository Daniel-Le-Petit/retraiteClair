import React, { useState } from 'react';
import { TrendingUp, Info } from 'lucide-react';
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

  // Calculer les pourcentages pour le graphique
  const tempsPleinRevenu = simulationData?.revenusNets?.tempsPlein || 0;
  const rpRevenu = simulationData?.revenusNets?.total || 0;
  const rpPercentage = tempsPleinRevenu > 0 ? (rpRevenu / tempsPleinRevenu) * 100 : 0;

  return (
    <div className={`${styles.container} animate-slideUp animate-delay-300`}>
      <div className={styles.header}>
        <h3 className={styles.title}>💰 Économies fiscales</h3>
        <p className={styles.introText}>
          La retraite progressive vous permet de réduire votre revenu imposable et donc de payer moins d'impôts. 
          Cette économie fiscale s'ajoute à votre revenu net, améliorant ainsi votre pouvoir d'achat réel.
        </p>
      </div>

      <div className={styles.visualContent}>
        {/* Graphique principal */}
        <div className={styles.mainCard}>
          <div className={styles.mainAmount}>
            {formatCurrency(annualSavings)}
            <span className={styles.period}>/an</span>
          </div>
          <div className={styles.monthlyBadge}>
            <TrendingUp size={18} />
            {formatCurrency(monthlySavings)}/mois
          </div>
        </div>

        {/* Graphique de comparaison */}
        <div className={styles.comparisonChart}>
          <div className={styles.chartTitle}>Revenus comparés</div>
          <div className={styles.barsContainer}>
            <div className={styles.barGroup}>
              <div className={styles.barLabel}>Temps plein</div>
              <div className={styles.barWrapper}>
                <div 
                  className={`${styles.bar} ${styles.barFull}`}
                  style={{ height: '100%' }}
                >
                  <div className={styles.barValue}>{formatCurrency(tempsPleinRevenu)}</div>
                </div>
              </div>
            </div>
            <div className={styles.barGroup}>
              <div className={styles.barLabel}>Retraite progressive</div>
              <div className={styles.barWrapper}>
                <div 
                  className={`${styles.bar} ${styles.barRP}`}
                  style={{ height: `${rpPercentage}%` }}
                >
                  <div className={styles.barValue}>{formatCurrency(rpRevenu)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.savingsIndicator}>
            <div className={styles.savingsArrow}>↓</div>
            <div className={styles.savingsAmount}>
              Économie : {formatCurrency(annualSavings)}/an
            </div>
          </div>
        </div>

        {/* Projection 5 ans */}
        <div className={styles.projectionCard}>
          <div className={styles.projectionHeader}>
            <div className={styles.projectionIcon}>💡</div>
            <div className={styles.projectionTitle}>Sur 5 ans</div>
          </div>
          <div className={styles.projectionAmount}>
            {formatCurrency(fiveYearSavings)}
          </div>
          <div className={styles.projectionSubtext}>d'économies cumulées</div>
        </div>

        {/* Détails simplifiés */}
        <button
          className={styles.detailsButton}
          onClick={() => setShowDetails(!showDetails)}
        >
          <Info size={18} />
          <span>Comment est calculée cette économie ?</span>
        </button>

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
            <div className={styles.calculationNote}>
              <strong>💡 Prélèvement à la source :</strong> Calculé selon les tranches 2024 (11%, 30%, 41%, 45%). Mensuel = annuel ÷ 12.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiscalImpact;
