import React, { useState } from 'react';
import { Calculator, X } from 'lucide-react';
import styles from './SamCalculator.module.css';

const SamCalculator = ({ isOpen, onClose, onUseEstimation, currentSalary = '' }) => {
  const [formData, setFormData] = useState({
    currentSalary: currentSalary,
    yearsWorked: '15',
    salaryEvolution: 'normal' // low, normal, high
  });

  const calculateSam = () => {
    const salary = parseFloat(formData.currentSalary) || 0;
    const years = parseInt(formData.yearsWorked) || 15;
    
    if (salary === 0) return 0;
    
    // Facteurs d'évolution salariale
    const evolutionFactors = {
      low: 0.02,    // 2% par an
      normal: 0.03, // 3% par an
      high: 0.04    // 4% par an
    };
    
    const factor = evolutionFactors[formData.salaryEvolution];
    
    // Calcul simplifié : moyenne pondérée sur les 25 meilleures années
    // On estime que le salaire actuel représente la fin de carrière
    let totalSam = 0;
    const yearsToCalculate = Math.min(years, 25);
    
    for (let i = 0; i < yearsToCalculate; i++) {
      // Salaire estimé il y a i années (en euros constants)
      const estimatedSalary = salary / Math.pow(1 + factor, i);
      totalSam += estimatedSalary;
    }
    
    return Math.round(totalSam / yearsToCalculate);
  };

  const estimatedSam = calculateSam();

  const handleUseEstimation = () => {
    onUseEstimation(estimatedSam);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>
            <Calculator size={20} />
            Calculateur de SAM simplifié
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Votre salaire actuel (€/mois)
            </label>
            <input
              type="text"
              name="currentSalary"
              value={formData.currentSalary}
              onChange={handleChange}
              className={styles.input}
              placeholder="Ex: 4400"
            />
          </div>
          
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Depuis combien d'années travaillez-vous ?
            </label>
            <select
              name="yearsWorked"
              value={formData.yearsWorked}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="5">5 ans</option>
              <option value="10">10 ans</option>
              <option value="15">15 ans</option>
              <option value="20">20 ans</option>
              <option value="25">25 ans</option>
              <option value="30">30 ans</option>
              <option value="35">35 ans</option>
              <option value="40">40 ans</option>
            </select>
          </div>
          
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Évolution salariale
            </label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="salaryEvolution"
                  value="low"
                  checked={formData.salaryEvolution === 'low'}
                  onChange={handleChange}
                />
                <span>Faible (+2%/an)</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="salaryEvolution"
                  value="normal"
                  checked={formData.salaryEvolution === 'normal'}
                  onChange={handleChange}
                />
                <span>Normale (+3%/an)</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="salaryEvolution"
                  value="high"
                  checked={formData.salaryEvolution === 'high'}
                  onChange={handleChange}
                />
                <span>Élevée (+4%/an)</span>
              </label>
            </div>
          </div>
          
          {estimatedSam > 0 && (
            <div className={styles.result}>
              <div className={styles.resultTitle}>💡 SAM estimé :</div>
              <div className={styles.resultValue}>
                {estimatedSam.toLocaleString('fr-FR')} € / an
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.footer}>
          <button
            className={styles.useButton}
            onClick={handleUseEstimation}
            disabled={estimatedSam === 0}
          >
            Utiliser cette estimation
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Saisir manuellement
          </button>
        </div>
      </div>
    </div>
  );
};

export default SamCalculator;
