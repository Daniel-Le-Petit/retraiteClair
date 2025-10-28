import React, { useState } from 'react';
import styles from './ResultsTabs.module.css';
import ScenarioChart from './ScenarioChart';

const ResultsTabs = ({ data, mode }) => {
  const [activeTab, setActiveTab] = useState('bruts');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateTotalRevenus = () => {
    return data.revenusBruts.total;
  };

  const calculateTotalNets = () => {
    return data.revenusNets.total;
  };

  const calculateEconomieFiscale = () => {
    return data.impactFiscal.economie;
  };

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${mode === 'avance' ? styles.advanced : ''}`}>Résultats de votre simulation</h2>
      
      {/* Onglets */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'bruts' ? styles.active : ''}`}
          onClick={() => setActiveTab('bruts')}
        >
          Revenus bruts
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'nets' ? styles.active : ''}`}
          onClick={() => setActiveTab('nets')}
        >
          Revenus nets
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'scenarios' ? styles.active : ''}`}
          onClick={() => setActiveTab('scenarios')}
        >
          Scénarios 40%-80%
        </button>
        {mode === 'avance' && (
          <button
            className={`${styles.tab} ${activeTab === 'details' ? styles.active : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Détails calculs
          </button>
        )}
      </div>

      {/* Contenu des onglets */}
      <div className={styles.tabContent}>
        {activeTab === 'bruts' && (
          <div className={styles.resultsGrid}>
            <div className={`${styles.resultCard} ${styles.salaireTempsPlein}`}>
              <h3>Salaire temps plein</h3>
              <div className={styles.amount}>{formatCurrency(data.revenusBruts.tempsPlein)}</div>
              <p>Votre salaire actuel</p>
            </div>
            <div className={`${styles.resultCard} ${styles.salaireTempsPartiel}`}>
              <h3>Salaire temps partiel</h3>
              <div className={styles.amount}>{formatCurrency(data.revenusBruts.tempsPartiel)}</div>
              <p>Après réduction du temps de travail</p>
            </div>
            <div className={`${styles.resultCard} ${styles.pensionRetraite}`}>
              <h3>Pension retraite</h3>
              <div className={styles.amount}>{formatCurrency(data.revenusBruts.pension)}</div>
              <p>Part de votre pension progressive</p>
            </div>
            <div className={`${styles.resultCard} ${styles.totalRevenus}`}>
              <h3>Total revenus en Retraite Progressive</h3>
              <div className={styles.amount}>{formatCurrency(calculateTotalRevenus())}</div>
              <p>Revenus bruts totaux</p>
            </div>
            <div className={`${styles.resultCard} ${styles.pensionComplete}`}>
              <h3>Pension complète (comparaison)</h3>
              <div className={styles.amount}>{formatCurrency(data.revenusBruts.pensionComplete)}</div>
              <p>Si vous preniez votre retraite complète</p>
            </div>
            {data.revenusBruts.revenusComplementaires > 0 && (
              <div className={styles.resultCard}>
                <h3>Revenus complémentaires</h3>
                <div className={styles.amount}>{formatCurrency(data.revenusBruts.revenusComplementaires)}</div>
                <p>Autres revenus</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'nets' && (
          <div className={styles.resultsGrid}>
            <div className={`${styles.resultCard} ${styles.salaireTempsPlein}`}>
              <h3>Salaire temps plein</h3>
              <div className={styles.amount}>{formatCurrency(data.revenusNets.tempsPlein)}</div>
              <p>Net après cotisations</p>
            </div>
            <div className={`${styles.resultCard} ${styles.salaireTempsPartiel}`}>
              <h3>Salaire temps partiel</h3>
              <div className={styles.amount}>{formatCurrency(data.revenusNets.tempsPartiel)}</div>
              <p>Net après cotisations</p>
            </div>
            <div className={`${styles.resultCard} ${styles.pensionRetraite}`}>
              <h3>Pension retraite</h3>
              <div className={styles.amount}>{formatCurrency(data.revenusNets.pension)}</div>
              <p>Net après cotisations</p>
            </div>
            <div className={`${styles.resultCard} ${styles.totalRevenus}`}>
              <h3>Total revenus nets en Retraite Progressive</h3>
              <div className={styles.amount}>{formatCurrency(calculateTotalNets())}</div>
              <p></p>
            </div>
            <div className={`${styles.resultCard} ${styles.pensionComplete}`}>
              <h3>Pension complète (comparaison)</h3>
              <div className={styles.amount}>{formatCurrency(data.revenusNets.pensionComplete)}</div>
              <p>Si vous preniez votre retraite complète</p>
            </div>
            {data.revenusNets.revenusComplementaires > 0 && (
              <div className={styles.resultCard}>
                <h3>Revenus complémentaires</h3>
                <div className={styles.amount}>{formatCurrency(data.revenusNets.revenusComplementaires)}</div>
                <p>Autres revenus</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className={styles.scenariosContainer}>
            <h3>Comparaison des scénarios</h3>
            
            {/* Graphique des scénarios */}
            <ScenarioChart data={data} />
            
            {/* Tableau des scénarios */}
            <div className={styles.scenariosTable}>
              <div className={styles.tableHeader}>
                <div>Temps partiel</div>
                <div>Salaire Temps Partiel</div>
                <div>Pension Nette</div>
                <div>Total Revenu Net (en RP)</div>
              </div>
              {/* Scénarios dans l'ordre croissant : 40% → 50% → 60% → 70% → 80% */}
              {[40, 50, 60, 70, 80].map((percentage) => {
                const salaireBrut = data.revenusBruts.tempsPlein * (percentage / 100);
                const salaireNetPartiel = salaireBrut * 0.7883; // 78.83% du brut temps partiel
                const pensionProgressiveBrut = data.revenusBruts.tempsPlein * 0.1728;
                const pensionProgressiveNet = pensionProgressiveBrut * 0.9; // 90% du brut
                const totalNet = salaireNetPartiel + pensionProgressiveNet;
                
                return (
                  <div key={percentage} className={styles.tableRow}>
                    <div>{percentage}%</div>
                    <div>{formatCurrency(salaireNetPartiel)}</div>
                    <div>{formatCurrency(pensionProgressiveNet)}</div>
                    <div>{formatCurrency(totalNet)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'details' && mode === 'avance' && (
          <div className={styles.detailsContainer}>
            <h3>Détails des calculs</h3>
            <div className={styles.detailsGrid}>
              <div className={styles.detailCard}>
                <h4>Impact fiscal</h4>
                <p className={styles.explanationText}>
                  💡 <strong>Qu'est-ce que l'impact fiscal ?</strong><br/>
                  Quand vous réduisez vos revenus en retraite progressive, vous pouvez changer de tranche d'imposition. 
                  Cela peut générer des économies d'impôt significatives !
                </p>
                <div className={styles.detailItem}>
                  <span>Impôt avant retraite progressive</span>
                  <span>{formatCurrency(data.impactFiscal.avant)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span>Impôt après retraite progressive</span>
                  <span>{formatCurrency(data.impactFiscal.apres)}</span>
                </div>
                <div className={`${styles.detailItem} ${styles.highlight}`}>
                  <span>Économie d'impôt</span>
                  <span>{formatCurrency(calculateEconomieFiscale())}</span>
                </div>
                {calculateEconomieFiscale() > 0 && (
                  <p className={styles.savingsNote}>
                    🎉 <strong>Excellente nouvelle !</strong> Vous économisez {formatCurrency(calculateEconomieFiscale())} par an en impôts grâce à la retraite progressive.
                  </p>
                )}
              </div>
              
              <div className={styles.detailCard}>
                <h4>Paramètres utilisés</h4>
                <div className={styles.detailItem}>
                  <span>Mode de calcul</span>
                  <span>{mode === 'avance' ? 'Avancé' : 'Simplifié'}</span>
                </div>
                <div className={styles.detailItem}>
                  <span>Taux de pension</span>
                  <span>{(data.details.tauxPension * 100).toFixed(1)}%</span>
                </div>
                <div className={styles.detailItem}>
                  <span>Taux progressif</span>
                  <span>{(data.details.tauxProgressive * 100).toFixed(0)}%</span>
                </div>
                <div className={styles.detailItem}>
                  <span>SAM utilisé</span>
                  <span>{formatCurrency(data.details.sam)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span>Trimestres validés</span>
                  <span>{data.details.trimestres}</span>
                </div>
                <div className={styles.detailItem}>
                  <span>Âge</span>
                  <span>{data.details.age} ans</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.actionButton}>
          📄 Sauvegarder les résultats
        </button>
        <button className={styles.actionButton}>
          📧 Envoyer par email
        </button>
        <button className={styles.actionButton}>
          🔄 Nouvelle simulation
        </button>
      </div>
    </div>
  );
};

export default ResultsTabs;
