import React, { useState } from 'react';
import { TrendingUp, PieChart, BarChart3, Euro } from 'lucide-react';
import ScenarioComparator from './ScenarioComparator';
import FiscalImpact from './FiscalImpact';
import ScenarioChart from './ScenarioChart';
import PostResultsActions from './PostResultsActions';
import AnimatedAmount from './AnimatedAmount';
import CalculationDetails from './CalculationDetails';
import styles from './ResultsPage.module.css';

const ResultsPage = ({ data, mode, onScenarioChange }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculatePercentage = (part, total) => {
    return total > 0 ? Math.round((part / total) * 100) : 0;
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
  const revenusComplementaires = data.revenusNets?.revenusComplementaires || 0;
  const salaireActuel = data.revenusNets?.tempsPlein || 0;
  const tempsPartiel = data?.details?.tempsPartiel || 60;
  
  // Calculer le pourcentage par rapport au salaire actuel
  const pourcentageSalaire = salaireActuel > 0 ? Math.round((totalNet / salaireActuel) * 100) : 0;
  
  // Calculer les pourcentages pour chaque composante
  const pourcentageSalairePartiel = totalNet > 0 ? Math.round((salairePartiel / totalNet) * 100) : 0;
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

      {/* Navigation Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <PieChart size={16} />
          Vue d'ensemble
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'scenarios' ? styles.active : ''}`}
          onClick={() => setActiveTab('scenarios')}
        >
          <BarChart3 size={16} />
          Autres scénarios
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'fiscal' ? styles.active : ''}`}
          onClick={() => setActiveTab('fiscal')}
        >
          <TrendingUp size={16} />
          Impact fiscal
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'overview' && (
          <div className={styles.overviewContent}>
            {/* Comparaison avec autres scénarios */}
            <div className={`${styles.comparisonSection} animate-slideUp animate-delay-200`}>
              <h3 className={styles.sectionTitle}>
                <BarChart3 size={20} />
                Comparaison avec d'autres scénarios
              </h3>
              
              <ScenarioChart data={data} />
              
              <div className={styles.insight}>
                <div className={styles.insightIcon}>💡</div>
                <div className={styles.insightText}>
                  Avec 80%, vous conservez 95% de votre revenu !
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scenarios' && (
          <ScenarioComparator
            currentScenario={getCurrentScenario()}
            onScenarioSelect={handleScenarioSelect}
            baseData={getBaseData()}
          />
        )}

        {activeTab === 'fiscal' && (
          <FiscalImpact
            fiscalData={data.impactFiscal}
            simulationData={data}
          />
        )}
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
