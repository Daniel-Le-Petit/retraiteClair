import React, { useState } from 'react';
import styles from './AvanceForm.module.css';

const AvanceForm = ({ onSubmit, isCalculating, sharedData, onDataChange }) => {
  const [formData, setFormData] = useState({
    salaireBrut: sharedData.salaireBrut || '',
    tempsPartiel: sharedData.tempsPartiel || '60',
    age: sharedData.age || '',
    trimestres: sharedData.trimestres || '',
    sam: sharedData.sam || '',
    revenusComplementaires: sharedData.revenusComplementaires || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation personnalisée pour éviter l'arrondi forcé
    let processedValue = value;
    if (name === 'salaireBrut' || name === 'sam' || name === 'revenusComplementaires') {
      // Permettre n'importe quel nombre sans arrondi
      processedValue = value.replace(/[^0-9.]/g, '');
    }
    
    const newFormData = {
      ...formData,
      [name]: processedValue
    };
    setFormData(newFormData);
    
    // Synchroniser avec les données partagées
    onDataChange({
      [name]: processedValue
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.salaireBrut || formData.salaireBrut <= 0) {
      newErrors.salaireBrut = 'Veuillez saisir un salaire brut valide';
    }
    
    if (!formData.tempsPartiel || formData.tempsPartiel < 40 || formData.tempsPartiel > 80) {
      newErrors.tempsPartiel = 'Le temps partiel doit être entre 40% et 80%';
    }
    
    if (!formData.age || formData.age < 60) {
      newErrors.age = 'Vous devez avoir au moins 60 ans';
    }
    
    if (!formData.trimestres || formData.trimestres < 150) {
      newErrors.trimestres = 'Vous devez avoir au moins 150 trimestres validés';
    }
    
    if (!formData.sam || formData.sam <= 0) {
      newErrors.sam = 'Veuillez saisir votre SAM (Salaire Annuel Moyen)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        salaireBrut: parseFloat(formData.salaireBrut),
        tempsPartiel: parseFloat(formData.tempsPartiel),
        age: parseInt(formData.age),
        trimestres: parseInt(formData.trimestres),
        sam: parseFloat(formData.sam),
        revenusComplementaires: parseFloat(formData.revenusComplementaires) || 0
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mode Avancé</h2>
      <p className={styles.description}>
        Calcul précis avec tous vos paramètres personnels
      </p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Informations de base</h3>
          
          <div className={styles.fieldGroup}>
            <label htmlFor="salaireBrut" className={styles.label}>
              Salaire brut mensuel actuel (€)
            </label>
            <input
              type="text"
              id="salaireBrut"
              name="salaireBrut"
              value={formData.salaireBrut}
              onChange={handleChange}
              className={`${styles.input} ${errors.salaireBrut ? styles.error : ''}`}
              placeholder="Ex: 3000"
              pattern="[0-9]*"
              inputMode="numeric"
            />
            {errors.salaireBrut && (
              <span className={styles.errorMessage}>{errors.salaireBrut}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="tempsPartiel" className={styles.label}>
              Temps partiel souhaité (%)
            </label>
            <select
              id="tempsPartiel"
              name="tempsPartiel"
              value={formData.tempsPartiel}
              onChange={handleChange}
              className={`${styles.select} ${errors.tempsPartiel ? styles.error : ''}`}
            >
              <option value="40">40%</option>
              <option value="50">50%</option>
              <option value="60">60%</option>
              <option value="70">70%</option>
              <option value="80">80%</option>
            </select>
            {errors.tempsPartiel && (
              <span className={styles.errorMessage}>{errors.tempsPartiel}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="age" className={styles.label}>
              Votre âge
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`${styles.input} ${errors.age ? styles.error : ''}`}
              placeholder="Ex: 62"
              min="60"
              max="70"
            />
            {errors.age && (
              <span className={styles.errorMessage}>{errors.age}</span>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Carrière et retraite</h3>
          
          <div className={styles.fieldGroup}>
            <label htmlFor="trimestres" className={styles.label}>
              Nombre de trimestres validés
            </label>
            <input
              type="number"
              id="trimestres"
              name="trimestres"
              value={formData.trimestres}
              onChange={handleChange}
              className={`${styles.input} ${errors.trimestres ? styles.error : ''}`}
              placeholder="Ex: 160"
              min="150"
              max="172"
            />
            {errors.trimestres && (
              <span className={styles.errorMessage}>{errors.trimestres}</span>
            )}
            <small className={styles.helpText}>
              Consultez votre relevé de carrière sur lassuranceretraite.fr
            </small>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="sam" className={styles.label}>
              SAM - Salaire Annuel Moyen (€)
            </label>
            <input
              type="number"
              id="sam"
              name="sam"
              value={formData.sam}
              onChange={handleChange}
              className={`${styles.input} ${errors.sam ? styles.error : ''}`}
              placeholder="Ex: 36000"
              min="0"
              step="0.01"
            />
            {errors.sam && (
              <span className={styles.errorMessage}>{errors.sam}</span>
            )}
            <small className={styles.helpText}>
              Moyenne des 25 meilleures années de salaire
            </small>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Revenus complémentaires (optionnel)</h3>
          
          <div className={styles.fieldGroup}>
            <label htmlFor="revenusComplementaires" className={styles.label}>
              Revenus complémentaires mensuels (€)
            </label>
            <input
              type="number"
              id="revenusComplementaires"
              name="revenusComplementaires"
              value={formData.revenusComplementaires}
              onChange={handleChange}
              className={styles.input}
              placeholder="Ex: 200"
              min="0"
              step="0.01"
            />
            <small className={styles.helpText}>
              Location, freelance, autres pensions...
            </small>
          </div>
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isCalculating}
        >
          {isCalculating ? 'Calcul en cours...' : 'Calculer mes revenus précis'}
        </button>
      </form>

      <div className={styles.infoBox}>
        <h3>Mode avancé</h3>
        <p>
          Ce mode utilise vos données exactes pour un calcul précis. 
          Les résultats incluent l'impact fiscal et les revenus complémentaires.
        </p>
      </div>
    </div>
  );
};

export default AvanceForm;
