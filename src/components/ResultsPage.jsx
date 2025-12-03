import React, { useEffect, useRef } from 'react';
import ScenarioComparator from './ScenarioComparator';
import FiscalImpact from './FiscalImpact';
import PostResultsActions from './PostResultsActions';
import AnimatedAmount from './AnimatedAmount';
import CalculationDetails from './CalculationDetails';
import { trackTimeOnPage, initScrollTracking, trackEvent } from '../utils/tracking';
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

  // Track la vue des sections importantes
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || entry.target.className;
          const sectionName = entry.target.getAttribute('data-section-name') || sectionId;
          
          trackEvent('section_viewed', {
            section_name: sectionName,
            section_id: sectionId,
            page: 'resultats'
          });
          
          // Ne track qu'une fois par section
          sectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observer les sections importantes
    const sectionsToTrack = [
      document.querySelector('[data-section="scenario-comparison"]'),
      document.querySelector('[data-section="fiscal-impact"]'),
      document.querySelector('[data-section="results-summary"]')
    ];

    sectionsToTrack.forEach(section => {
      if (section) {
        sectionObserver.observe(section);
      }
    });

    return () => sectionObserver.disconnect();
  }, [data]);

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
  // Vérifier et corriger la pension progressive nette si nécessaire
  // La valeur correcte doit être calculée avec 17.38% du salaire brut × 90%
  let pensionNet = data.revenusNets?.pension || 0;
  const salaireBrutTempsPlein = data.revenusBruts?.tempsPlein || 0;
  const pensionComplete = data.revenusNets?.pensionComplete || data.revenusBruts?.pensionComplete || 0;
  const isAdvancedMode = pensionComplete > 0 && (data.mode === 'advanced' || data.mode === 'avance');
  
  // Recalculer la pension progressive nette pour garantir la cohérence
  let totalNetRecalcule = totalNet;
  if (salaireBrutTempsPlein > 0) {
    let pensionProgressiveBrut;
    if (isAdvancedMode) {
      // Mode avancé : 40% de la pension complète
      const pensionCompleteBrut = pensionComplete / 0.9;
      pensionProgressiveBrut = pensionCompleteBrut * 0.4;
    } else {
      // Mode simplifié : 17.38% du salaire brut
      pensionProgressiveBrut = salaireBrutTempsPlein * 0.1738;
    }
    const pensionProgressiveNetCorrecte = pensionProgressiveBrut * 0.9;
    
    // Utiliser la valeur recalculée si elle diffère significativement (plus de 10€)
    if (Math.abs(pensionNet - pensionProgressiveNetCorrecte) > 10) {
      pensionNet = pensionProgressiveNetCorrecte;
      // Recalculer le total net avec la pension corrigée
      const revenusComplementaires = data.revenusNets?.revenusComplementaires || 0;
      totalNetRecalcule = salairePartiel + pensionNet + revenusComplementaires;
    }
  }
  
  const salaireActuel = data.revenusNets?.tempsPlein || 0;
  const tempsPartiel = data?.details?.tempsPartiel || 60;
  
  // Utiliser le total recalculé si la pension a été corrigée
  const totalNetFinal = totalNetRecalcule !== totalNet ? totalNetRecalcule : totalNet;
  
  // Calculer le pourcentage par rapport au salaire actuel
  const pourcentageSalaire = salaireActuel > 0 ? Math.round((totalNetFinal / salaireActuel) * 100) : 0;
  
  // Calculer les pourcentages pour chaque composante
  const pourcentagePension = totalNetFinal > 0 ? Math.round((pensionNet / totalNetFinal) * 100) : 0;

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
                value={totalNetFinal} 
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
        <div data-section="scenario-comparison" data-section-name="scenario_comparison">
          <ScenarioComparator
            currentScenario={getCurrentScenario()}
            onScenarioSelect={handleScenarioSelect}
            baseData={getBaseData()}
            simulationData={data}
          />
        </div>

        {/* Section Impact fiscal */}
        <FiscalImpact
          fiscalData={data.impactFiscal}
          simulationData={data}
        />

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
              impactFiscal: data.impactFiscal,
              cotisationSur100Pourcent: data.details?.cotisationSur100Pourcent || false,
              age: data.details?.age || null,
              anneeNaissance: data.details?.anneeNaissance || null,
              pensionComplete: data.revenusNets?.pensionComplete || data.revenusBruts?.pensionComplete || null,
              mode: data.mode || 'simplified'
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
    </div>
  );
};

export default ResultsPage;
