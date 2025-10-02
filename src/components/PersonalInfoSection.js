import React, { useState } from 'react';
import { User, Euro, Calendar, Clock, Save, CheckCircle } from 'lucide-react';

const PersonalInfoSection = () => {
  const [formData, setFormData] = useState({
    salaireBrut: '',
    age: '',
    trimestres: '',
    tempsPartiel: 60,
    dateDebut: '',
    dateFin: ''
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Sauvegarder les données dans localStorage
    localStorage.setItem('retraiteClair_personalInfo', JSON.stringify(formData));
    setIsSaved(true);
    
    // Masquer le message de succès après 3 secondes
    setTimeout(() => setIsSaved(false), 3000);
  };

  const inputFields = [
    {
      id: 'salaireBrut',
      label: 'Salaire brut mensuel (€)',
      type: 'number',
      placeholder: 'Ex: 5000',
      icon: Euro,
      required: true
    },
    {
      id: 'age',
      label: 'Âge actuel',
      type: 'number',
      placeholder: 'Ex: 62',
      icon: User,
      required: true
    },
    {
      id: 'trimestres',
      label: 'Trimestres cotisés',
      type: 'number',
      placeholder: 'Ex: 160',
      icon: Calendar,
      required: true
    }
  ];

  return (
    <section className="personal-info-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Informations personnelles</h2>
          <p className="section-description">
            Renseignez vos informations pour une simulation personnalisée de votre retraite progressive
          </p>
        </div>

        <div className="form-container">
          <div className="form-section">
            <div className="form-section-header">
              <h3>Données personnelles</h3>
              <p>Vos informations de base pour le calcul</p>
            </div>
            
            <div className="form-grid">
              {inputFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.id} className="form-group">
                    <label className="form-label">
                      <Icon size={18} />
                      {field.label}
                      {field.required && <span className="required">*</span>}
                    </label>
                    <input
                      type={field.type}
                      value={formData[field.id]}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="form-input"
                      required={field.required}
                    />
                  </div>
                );
              })}
              
              <div className="form-group full-width">
                <label className="form-label">
                  <Clock size={18} />
                  Temps partiel souhaité (%)
                </label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="40"
                    max="80"
                    value={formData.tempsPartiel}
                    onChange={(e) => handleInputChange('tempsPartiel', e.target.value)}
                    className="form-slider"
                  />
                  <div className="slider-value">{formData.tempsPartiel}%</div>
                </div>
                <div className="slider-labels">
                  <span>40%</span>
                  <span>80%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-header">
              <h3>Période de retraite progressive</h3>
              <p>Définissez vos dates souhaitées</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={18} />
                  Date de début souhaitée
                </label>
                <input
                  type="date"
                  value={formData.dateDebut}
                  onChange={(e) => handleInputChange('dateDebut', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={18} />
                  Date de fin (optionnel)
                </label>
                <input
                  type="date"
                  value={formData.dateFin}
                  onChange={(e) => handleInputChange('dateFin', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              className="save-button"
              onClick={handleSave}
              disabled={!formData.salaireBrut || !formData.age || !formData.trimestres}
            >
              <Save size={20} />
              Sauvegarder mes données
            </button>
            
            {isSaved && (
              <div className="save-success">
                <CheckCircle size={20} />
                <span>Données sauvegardées avec succès !</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;


