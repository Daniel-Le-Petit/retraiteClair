import React, { useState, useEffect } from 'react';
import styles from './SimplifieForm.module.css';

const SimplifieForm = ({ onSubmit, isCalculating, sharedData, onDataChange }) => {
  const [formData, setFormData] = useState({
    salaireBrut: sharedData.salaireBrut || '',
    tempsPartiel: sharedData.tempsPartiel || '60',
    age: sharedData.age || ''
  });

  const [errors, setErrors] = useState({});

  // Synchroniser avec sharedData quand il change (chargement depuis localStorage)
  useEffect(() => {
    setFormData({
      salaireBrut: sharedData.salaireBrut || '',
      tempsPartiel: sharedData.tempsPartiel || '60',
      age: sharedData.age || ''
    });
  }, [sharedData.salaireBrut, sharedData.tempsPartiel, sharedData.age]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation personnalisée pour éviter l'arrondi forcé
    let processedValue = value;
    if (name === 'salaireBrut') {
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
        // Valeurs par défaut pour le mode simplifié
        trimestres: 160, // Valeur moyenne
        sam: parseFloat(formData.salaireBrut) * 12, // Estimation basée sur le salaire actuel
        revenusComplementaires: 0
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mode Simplifié</h2>
      <p className={styles.description}>
        Renseignez vos 3 informations clés pour obtenir une estimation immédiate.
      </p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
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

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isCalculating}
        >
          {isCalculating ? 'Calcul en cours...' : 'Calculer mes revenus'}
        </button>
      </form>

      <div className={styles.infoBox}>
        <h3>Mode simplifié</h3>
        <p>
          Ce mode utilise des valeurs moyennes pour les calculs. 
          Pour une estimation plus précise, utilisez le mode avancé.
        </p>
      </div>
    </div>
  );
};

export default SimplifieForm;
