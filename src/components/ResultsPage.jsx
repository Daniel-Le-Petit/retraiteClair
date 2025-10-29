import React, { useState } from 'react';
import { TrendingUp, PieChart, BarChart3, Euro, Calendar, Clock } from 'lucide-react';
import ScenarioComparator from './ScenarioComparator';
import FiscalImpact from './FiscalImpact';
import ScenarioChart from './ScenarioChart';
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
    return {
      tempsPartiel: 80, // Valeur par défaut, à adapter selon les données
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

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.celebration}>
            🎉 Voici vos revenus en Retraite Progressive !
          </div>
          
          <div className={styles.mainResult}>
            <div className={styles.resultLabel}>
              <Euro size={24} />
              Votre revenu total net
            </div>
            <div className={styles.resultAmount}>
              {formatCurrency(totalNet)} / mois
            </div>
            <div className={styles.resultSubtext}>
              Salaire partiel + Pension retraite
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
            {/* Détail des revenus */}
            <div className={styles.revenueBreakdown}>
              <h3 className={styles.sectionTitle}>
                <PieChart size={20} />
                Détail de vos revenus
              </h3>
              
              <div className={styles.breakdownChart}>
                <div className={styles.chartVisual}>
                  <div className={styles.pieChart}>
                    <div 
                      className={styles.pieSlice}
                      style={{
                        background: `conic-gradient(
                          #2563eb 0deg ${calculatePercentage(salairePartiel, totalNet) * 3.6}deg,
                          #10b981 ${calculatePercentage(salairePartiel, totalNet) * 3.6}deg ${(calculatePercentage(salairePartiel, totalNet) + calculatePercentage(pensionNet, totalNet)) * 3.6}deg,
                          #f59e0b ${(calculatePercentage(salairePartiel, totalNet) + calculatePercentage(pensionNet, totalNet)) * 3.6}deg 360deg
                        )`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className={styles.breakdownList}>
                  <div className={styles.breakdownItem}>
                    <div className={styles.itemColor} style={{ backgroundColor: '#2563eb' }}></div>
                    <div className={styles.itemContent}>
                      <div className={styles.itemLabel}>Salaire temps partiel</div>
                      <div className={styles.itemValue}>
                        {formatCurrency(salairePartiel)} ({calculatePercentage(salairePartiel, totalNet)}%)
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.breakdownItem}>
                    <div className={styles.itemColor} style={{ backgroundColor: '#10b981' }}></div>
                    <div className={styles.itemContent}>
                      <div className={styles.itemLabel}>Pension retraite</div>
                      <div className={styles.itemValue}>
                        {formatCurrency(pensionNet)} ({calculatePercentage(pensionNet, totalNet)}%)
                      </div>
                    </div>
                  </div>
                  
                  {revenusComplementaires > 0 && (
                    <div className={styles.breakdownItem}>
                      <div className={styles.itemColor} style={{ backgroundColor: '#f59e0b' }}></div>
                      <div className={styles.itemContent}>
                        <div className={styles.itemLabel}>Revenus complémentaires</div>
                        <div className={styles.itemValue}>
                          {formatCurrency(revenusComplementaires)} ({calculatePercentage(revenusComplementaires, totalNet)}%)
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comparaison avec autres scénarios */}
            <div className={styles.comparisonSection}>
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
    </div>
  );
};

export default ResultsPage;
