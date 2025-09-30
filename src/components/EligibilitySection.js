import React, { useState } from 'react';
import { CheckCircle, Users, Clock, Shield } from 'lucide-react';

const EligibilitySection = () => {
  const [showModal, setShowModal] = useState(false);

  const eligibilityItems = [
    {
      icon: Users,
      title: "Âge minimum",
      description: "60 ans (ou 55 ans dans certains cas particuliers)"
    },
    {
      icon: Clock,
      title: "Trimestres cotisés",
      description: "Au moins 150 trimestres validés"
    },
    {
      icon: Shield,
      title: "Accord employeur",
      description: "Temps partiel entre 40% et 80%"
    }
  ];

  return (
    <section className="eligibility-section-modern">
      <div className="container">
        <div className="eligibility-content">
          <h2 className="section-title">Suis-je éligible ?</h2>
          <p className="section-description">
            Testez votre éligibilité en quelques clics et découvrez les conditions à remplir.
          </p>
          
          <div className="eligibility-cards">
            {eligibilityItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="eligibility-card">
                  <div className="eligibility-icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="eligibility-card-title">{item.title}</h3>
                  <p className="eligibility-card-description">{item.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="eligibility-cta">
            <button 
              className="eligibility-button"
              onClick={() => setShowModal(true)}
            >
              <CheckCircle size={20} />
              Tester mon éligibilité
            </button>
          </div>
        </div>
      </div>

      {/* Modal d'éligibilité */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Test d'éligibilité</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <p className="modal-intro">Pour être éligible à la retraite progressive, vous devez :</p>
              
              <div className="eligibility-checklist">
                <div className="checklist-item">
                  <CheckCircle size={20} className="check-icon" />
                  <span>Avoir au moins 60 ans (ou 55 ans dans certains cas)</span>
                </div>
                <div className="checklist-item">
                  <CheckCircle size={20} className="check-icon" />
                  <span>Avoir cotisé au moins 150 trimestres</span>
                </div>
                <div className="checklist-item">
                  <CheckCircle size={20} className="check-icon" />
                  <span>Avoir l'accord de votre employeur pour un temps partiel</span>
                </div>
                <div className="checklist-item">
                  <CheckCircle size={20} className="check-icon" />
                  <span>Travailler entre 40% et 80% du temps plein</span>
                </div>
              </div>
              
              <div className="next-steps">
                <h4>Prochaines étapes :</h4>
                <ol className="steps-list">
                  <li>Contactez votre employeur</li>
                  <li>Renseignez-vous auprès de votre caisse de retraite</li>
                  <li>Utilisez notre simulateur pour calculer vos revenus</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EligibilitySection;
