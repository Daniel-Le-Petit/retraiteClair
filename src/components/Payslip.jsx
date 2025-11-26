import React from 'react';
import styles from './Payslip.module.css';

const Payslip = ({ simulationData }) => {
  if (!simulationData) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = () => {
    const now = new Date();
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(now);
  };

  const salaireBrut = simulationData.revenusBruts?.tempsPartiel || 0;
  const salaireNet = simulationData.revenusNets?.tempsPartiel || 0;
  const pensionBrut = simulationData.revenusBruts?.pension || 0;
  const pensionNet = simulationData.revenusNets?.pension || 0;
  const tempsPartiel = simulationData.details?.tempsPartiel || 0;
  const revenusComplementaires = simulationData.revenusNets?.revenusComplementaires || 0;
  const cotisations = salaireBrut - salaireNet;
  const totalBrut = salaireBrut + pensionBrut;
  const totalNet = simulationData.revenusNets?.total || 0;

  // Calcul du prélèvement à la source (PAS)
  // Basé sur les tranches d'imposition 2024
  const revenuNetAnnuel = totalNet * 12;
  let prelevementSource = 0;
  
  if (revenuNetAnnuel > 10777) {
    prelevementSource += (Math.min(revenuNetAnnuel, 27478) - 10777) * 0.11;
  }
  if (revenuNetAnnuel > 27478) {
    prelevementSource += (Math.min(revenuNetAnnuel, 78570) - 27478) * 0.30;
  }
  if (revenuNetAnnuel > 78570) {
    prelevementSource += (Math.min(revenuNetAnnuel, 168994) - 78570) * 0.41;
  }
  if (revenuNetAnnuel > 168994) {
    prelevementSource += (revenuNetAnnuel - 168994) * 0.45;
  }
  
  // Convertir en mensuel
  prelevementSource = prelevementSource / 12;
  
  // Net à payer après impôts
  const netApresImpots = totalNet - prelevementSource;

  return (
    <div className={styles.container}>
      <div className={styles.payslip}>
        {/* En-tête */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.companyName}>RetraiteClair</h2>
            <p className={styles.companyInfo}>Simulateur de Retraite Progressive</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.documentType}>BULLETIN DE PAIE</div>
            <div className={styles.period}>Période : {formatDate()}</div>
          </div>
        </div>

        {/* Informations employé */}
        <div className={styles.employeeSection}>
          <div className={styles.employeeInfo}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Temps de travail :</span>
              <span className={styles.value}>{tempsPartiel}% (Retraite Progressive)</span>
            </div>
          </div>
        </div>

        {/* Section Salaire */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Salaire Temps Partiel</h3>
          <div className={styles.line}>
            <span className={styles.lineLabel}>Salaire brut ({tempsPartiel}%)</span>
            <span className={styles.lineValue}>{formatCurrency(salaireBrut)}</span>
          </div>
          <div className={styles.line}>
            <span className={styles.lineLabel}>Cotisations sociales</span>
            <span className={styles.lineValueNegative}>- {formatCurrency(cotisations)}</span>
          </div>
          <div className={styles.lineTotal}>
            <span className={styles.lineLabel}>Salaire net</span>
            <span className={styles.lineValue}>{formatCurrency(salaireNet)}</span>
          </div>
        </div>

        {/* Section Pension */}
        {pensionBrut > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Pension Retraite Progressive</h3>
            <div className={styles.line}>
              <span className={styles.lineLabel}>Pension brute</span>
              <span className={styles.lineValue}>{formatCurrency(pensionBrut)}</span>
            </div>
            <div className={styles.line}>
              <span className={styles.lineLabel}>Cotisations retraite</span>
              <span className={styles.lineValueNegative}>- {formatCurrency(pensionBrut - pensionNet)}</span>
            </div>
            <div className={styles.lineTotal}>
              <span className={styles.lineLabel}>Pension nette</span>
              <span className={styles.lineValue}>{formatCurrency(pensionNet)}</span>
            </div>
          </div>
        )}

        {/* Section Impôts */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Impôts sur le revenu</h3>
          <div className={styles.line}>
            <span className={styles.lineLabel}>Revenu net imposable</span>
            <span className={styles.lineValue}>{formatCurrency(totalNet)}</span>
          </div>
          <div className={styles.line}>
            <span className={styles.lineLabel}>Prélèvement à la source</span>
            <span className={styles.lineValueNegative}>- {formatCurrency(prelevementSource)}</span>
          </div>
          <div className={styles.lineTotal}>
            <span className={styles.lineLabel}>Net à payer après impôts</span>
            <span className={styles.lineValue}>{formatCurrency(netApresImpots)}</span>
          </div>
        </div>


        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.disclaimer}>
            Ce document est une simulation indicative. Les montants réels peuvent varier selon votre situation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payslip;

