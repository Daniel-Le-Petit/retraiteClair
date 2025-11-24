import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calculator } from 'lucide-react';
import styles from './CalculationDetails.module.css';

const CalculationDetails = ({ calculationData, formulaVersion }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!calculationData) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Calculator size={18} />
        <span>Voir le détail du calcul</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isExpanded && (
        <div className={styles.details}>
          <div className={styles.section}>
            <h4>1. Calcul du salaire net temps partiel</h4>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Salaire brut temps plein :</div>
              <div className={styles.stepValue}>{formatCurrency(calculationData.salaireBrutTempsPlein || 0)}</div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Temps partiel :</div>
              <div className={styles.stepValue}>{calculationData.tempsPartiel || 0}%</div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Salaire brut temps partiel :</div>
              <div className={styles.stepValue}>
                {formatCurrency(calculationData.salaireBrutTempsPlein || 0)} × {formatNumber((calculationData.tempsPartiel || 0) / 100)} = {formatCurrency(calculationData.salaireBrutTempsPartiel || 0)}
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Taux de conversion net/brut :</div>
              <div className={styles.stepValue}>76,98%</div>
            </div>
            <div className={styles.stepResult}>
              <div className={styles.stepLabel}>Salaire net temps partiel :</div>
              <div className={styles.stepValue}>
                {formatCurrency(calculationData.salaireBrutTempsPartiel || 0)} × 0,7698 = <strong>{formatCurrency(calculationData.salaireNetTempsPartiel || 0)}</strong>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h4>2. Calcul de la pension progressive</h4>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Ratio pension/salaire brut :</div>
              <div className={styles.stepValue}>17,33%</div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Pension progressive brute :</div>
              <div className={styles.stepValue}>
                {formatCurrency(calculationData.salaireBrutTempsPlein || 0)} × 0,1733 = {formatCurrency(calculationData.pensionProgressiveBrut || 0)}
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Taux de conversion net/brut :</div>
              <div className={styles.stepValue}>76,98%</div>
            </div>
            <div className={styles.stepResult}>
              <div className={styles.stepLabel}>Pension progressive nette :</div>
              <div className={styles.stepValue}>
                {formatCurrency(calculationData.pensionProgressiveBrut || 0)} × 0,7698 = <strong>{formatCurrency(calculationData.pensionProgressiveNet || 0)}</strong>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h4>3. Calcul du revenu total net</h4>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Salaire net temps partiel :</div>
              <div className={styles.stepValue}>{formatCurrency(calculationData.salaireNetTempsPartiel || 0)}</div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Pension progressive nette :</div>
              <div className={styles.stepValue}>{formatCurrency(calculationData.pensionProgressiveNet || 0)}</div>
            </div>
            {calculationData.revenusComplementaires > 0 && (
              <div className={styles.step}>
                <div className={styles.stepLabel}>Revenus complémentaires :</div>
                <div className={styles.stepValue}>{formatCurrency(calculationData.revenusComplementaires || 0)}</div>
              </div>
            )}
            <div className={styles.stepResult}>
              <div className={styles.stepLabel}>Revenu total net :</div>
              <div className={styles.stepValue}>
                <strong>{formatCurrency(calculationData.totalNet || 0)}</strong>
              </div>
            </div>
          </div>

          {calculationData.impactFiscal && (
            <div className={styles.section}>
              <h4>4. Calcul de l'impact fiscal</h4>
              <div className={styles.step}>
                <div className={styles.stepLabel}>Revenu imposable avant RP :</div>
                <div className={styles.stepValue}>{formatCurrency(calculationData.impactFiscal.revenuAvant || 0)}</div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepLabel}>Revenu imposable avec RP :</div>
                <div className={styles.stepValue}>{formatCurrency(calculationData.impactFiscal.revenuApres || 0)}</div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepLabel}>Tranche d'imposition avant :</div>
                <div className={styles.stepValue}>{calculationData.impactFiscal.trancheAvant || 0}%</div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepLabel}>Tranche d'imposition après :</div>
                <div className={styles.stepValue}>{calculationData.impactFiscal.trancheApres || 0}%</div>
              </div>
              <div className={styles.stepResult}>
                <div className={styles.stepLabel}>Économie d'impôts :</div>
                <div className={styles.stepValue}>
                  <strong>{formatCurrency(calculationData.impactFiscal.economie || 0)}/mois</strong>
                </div>
              </div>
            </div>
          )}

          <div className={styles.formulaVersion}>
            <strong>Formule v{formulaVersion}</strong> – {new Date().getFullYear()}/{String(new Date().getMonth() + 1).padStart(2, '0')}
          </div>
        </div>
      )}

      <div className={styles.disclaimer}>
        <strong>⚠️ Résultat indicatif, non contractuel.</strong> Vérifiez avec l'
        <a 
          href="https://www.lassuranceretraite.fr" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.disclaimerLink}
        >
          Assurance Retraite
        </a>
      </div>
    </div>
  );
};

export default CalculationDetails;





