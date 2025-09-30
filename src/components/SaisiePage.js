import React, { useState } from 'react';
import { Calculator, Save } from 'lucide-react';

const SaisiePage = () => {
  const [formData, setFormData] = useState({
    salaireBrut: '',
    age: '',
    trimestres: '',
    tempsPartiel: 60,
    dateDebut: '',
    dateFin: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Sauvegarder les données
    localStorage.setItem('retraiteClair_data', JSON.stringify(formData));
    alert('Données sauvegardées avec succès !');
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Saisie des données</h1>
        <p>Renseignez vos informations personnelles pour la simulation</p>
      </div>

      <div className="form-container">
        <div className="form-section">
          <h2>Informations personnelles</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Salaire brut mensuel (€)</label>
              <input
                type="number"
                value={formData.salaireBrut}
                onChange={(e) => handleInputChange('salaireBrut', e.target.value)}
                placeholder="Ex: 5000"
              />
            </div>

            <div className="form-group">
              <label>Âge actuel</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Ex: 62"
              />
            </div>

            <div className="form-group">
              <label>Trimestres cotisés</label>
              <input
                type="number"
                value={formData.trimestres}
                onChange={(e) => handleInputChange('trimestres', e.target.value)}
                placeholder="Ex: 160"
              />
            </div>

            <div className="form-group">
              <label>Temps partiel souhaité (%)</label>
              <input
                type="range"
                min="40"
                max="80"
                value={formData.tempsPartiel}
                onChange={(e) => handleInputChange('tempsPartiel', e.target.value)}
              />
              <div className="range-value">{formData.tempsPartiel}%</div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Période de retraite progressive</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Date de début souhaitée</label>
              <input
                type="date"
                value={formData.dateDebut}
                onChange={(e) => handleInputChange('dateDebut', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Date de fin (optionnel)</label>
              <input
                type="date"
                value={formData.dateFin}
                onChange={(e) => handleInputChange('dateFin', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="save-button" onClick={handleSave}>
            <Save size={20} />
            Sauvegarder mes données
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaisiePage;
