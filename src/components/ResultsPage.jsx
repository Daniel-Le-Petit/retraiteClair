import React, { useEffect, useRef } from 'react';
import ScenarioComparator from './ScenarioComparator';
import FiscalImpact from './FiscalImpact';
import PostResultsActions from './PostResultsActions';
import AnimatedAmount from './AnimatedAmount';
import CalculationDetails from './CalculationDetails';
import { trackTimeOnPage, initScrollTracking } from '../utils/tracking';
import styles from './ResultsPage.module.css';

const ResultsPage = ({ data, mode, onScenarioChange }) => {
  // Tracking du temps passé sur la page
  const pageStartTime = useRef(Date.now());
  
  // Track le temps passé quand l'utilisateur quitte la page
  useEffect(() => {
    const startTime = pageStartTime.current;
    return () => {
      trackTimeOnPage('resultats', startTime);
    };
  }, []);
  
  // Track le scroll depth
  useEffect(() => {
    return initScrollTracking('resultats');
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCurrentScenario = () => {
    // Récupérer le temps partiel depuis les données de simulation
    const tempsPartiel = data?.details?.tempsPartiel 
      ? parseFloat(data.details.tempsPartiel) 
      : 80; // Valeur par défaut si non disponible
    return {
      tempsPartiel: tempsPartiel,
      totalNet: data?.revenusNets?.total || 0
    };
  };

  const getBaseData = () => {
    return {
      salaireBrut: data?.revenusBruts?.tempsPlein || 0,
      revenusComplementaires: data?.revenusNets?.revenusComplementaires || 0
    };
  };

  const handleScenarioSelect = (percentage) => {
    if (onScenarioChange) {
      onScenarioChange(percentage);
    }
  };

  if (!data) return null;

  const totalNet = data.revenusNets?.total || 0;
  const salairePartiel = data.revenusNets?.tempsPartiel || 0;
  const pensionNet = data.revenusNets?.pension || 0;
  const salaireActuel = data.revenusNets?.tempsPlein || 0;
  const tempsPartiel = data?.details?.tempsPartiel || 60;
  
  // Calculer le pourcentage par rapport au salaire actuel
  const pourcentageSalaire = salaireActuel > 0 ? Math.round((totalNet / salaireActuel) * 100) : 0;
  
  // Calculer les pourcentages pour chaque composante
  const pourcentagePension = totalNet > 0 ? Math.round((pensionNet / totalNet) * 100) : 0;

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.mainTitle}>
            Votre revenu total mensuel estimé
          </div>
          
          <div className={styles.mainResult}>
            <div className={styles.resultAmount}>
              <AnimatedAmount 
                value={totalNet} 
                formatCurrency={true} 
              />
            </div>
            <div className={styles.resultPercentage}>
              soit {pourcentageSalaire}% de votre salaire actuel
            </div>
          </div>
          
          <div className={styles.breakdownCards}>
            <div className={styles.breakdownCard}>
              <div className={styles.cardLabel}>
                Salaire temps partiel ({tempsPartiel}%)
              </div>
              <div className={styles.cardAmount}>
                {formatCurrency(salairePartiel)}
              </div>
            </div>
            
            <div className={styles.breakdownCard}>
              <div className={styles.cardLabel}>
                Pension retraite ({pourcentagePension}%)
              </div>
              <div className={styles.cardAmount}>
                {formatCurrency(pensionNet)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu combiné sans onglets */}
      <div className={styles.combinedContent}>
        {/* Section Scénarios - Explorer et comparer */}
        <ScenarioComparator
          currentScenario={getCurrentScenario()}
          onScenarioSelect={handleScenarioSelect}
          baseData={getBaseData()}
          simulationData={data}
        />

        {/* Section Impact fiscal */}
        <FiscalImpact
          fiscalData={data.impactFiscal}
          simulationData={data}
        />
      </div>

      {/* Détail du calcul */}
      {data && (
        <div className={styles.calculationDetailsSection}>
          <CalculationDetails 
            calculationData={{
              salaireBrutTempsPlein: data.revenusBruts?.tempsPlein || 0,
              tempsPartiel: data.details?.tempsPartiel || 0,
              salaireBrutTempsPartiel: (data.revenusBruts?.tempsPlein || 0) * ((data.details?.tempsPartiel || 0) / 100),
              salaireNetTempsPartiel: data.revenusNets?.tempsPartiel || 0,
              pensionProgressiveBrut: data.revenusBruts?.pension || 0,
              pensionProgressiveNet: data.revenusNets?.pension || 0,
              totalNet: data.revenusNets?.total || 0,
              revenusComplementaires: data.revenusNets?.revenusComplementaires || 0,
              impactFiscal: data.impactFiscal
            }}
            formulaVersion={process.env.REACT_APP_FORMULA_VERSION || '1.0.0'}
          />
        </div>
      )}

      {/* Actions post-résultats */}
      <PostResultsActions 
        simulationData={data}
        onModify={() => {
          // Scroll vers le formulaire ou déclencher modification
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export default ResultsPage;
