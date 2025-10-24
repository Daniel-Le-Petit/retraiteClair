import React, { useState, useEffect } from 'react';
import { CheckCircle, Users, Clock, Shield, X } from 'lucide-react';
import PureCSSModal from './PureCSSModal';

const EligibilitySection = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Gérer l'ouverture/fermeture des modales
  useEffect(() => {
    if (selectedItem !== null || showModal) {
      document.body.classList.add('modal-open');
      // Forcer le centrage avec JavaScript
      setTimeout(() => {
        const modals = document.querySelectorAll('.modal-overlay, .eligibility-detail-modal-overlay');
        modals.forEach(modal => {
          if (modal) {
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '999999';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
          }
        });
      }, 10);
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Nettoyer au démontage
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [selectedItem, showModal]);

  const eligibilityItems = [
    {
      icon: Users,
      title: "Âge minimum",
      description: "60 ans (ou 55 ans dans certains cas particuliers)",
      detailedContent: {
        intro: "Pour bénéficier de la retraite progressive, vous devez avoir atteint l'âge légal minimum fixé par la réglementation.",
        rules: [
          "En France, c'est généralement 60 ans.",
          "L'âge peut varier selon votre génération et votre régime de retraite (ex. fonction publique, régimes spéciaux).",
          "Règle pratique : vous pouvez commencer la retraite progressive à 60 ans, mais si vous n'avez pas le nombre de trimestres requis pour le taux plein, le montant de la pension définitive sera ajusté."
        ],
        example: {
          title: "Exemple :",
          text: "Vous avez 61 ans et souhaitez passer à 60 % d'activité → vous pouvez percevoir 40 % de votre retraite tout en continuant à travailler à temps partiel."
        },
        tip: "Il n'est pas obligatoire d'attendre l'âge du taux plein pour commencer la retraite progressive, mais la pension partielle dépendra de vos droits acquis."
      }
    },
    {
      icon: Clock,
      title: "Trimestres cotisés",
      description: "Au moins 150 trimestres validés",
      detailedContent: {
        intro: "La retraite progressive nécessite un minimum de trimestres cotisés :",
        rules: [
          "Généralement 150 trimestres (soit environ 37,5 ans) pour les régimes de base.",
          "Ce nombre peut varier selon votre régime et votre génération."
        ],
        included: {
          title: "Les trimestres pris en compte incluent :",
          items: [
            "Vos périodes de travail salarié ou indépendant.",
            "Les trimestres assimilés (chômage indemnisé, service militaire, maternité/paternité, maladie)."
          ]
        },
        example: {
          title: "Exemple concret :",
          text: "Vous avez 155 trimestres validés et 62 ans → vous pouvez commencer la retraite progressive."
        },
        tip: "Même après le passage en retraite progressive, chaque trimestre travaillé continue d'être validé pour améliorer votre retraite définitive."
      }
    },
    {
      icon: Shield,
      title: "Accord employeur",
      description: "Temps partiel entre 40% et 80%",
      detailedContent: {
        intro: "Pour bénéficier de la retraite progressive en tant que salarié, l'accord de l'employeur est obligatoire.",
        rules: [
          "La réduction du temps de travail doit être formalisée par un avenant au contrat de travail.",
          "La durée et le rythme de travail doivent être clairement définis.",
          "Exceptions : certains statuts particuliers (fonction publique, professions libérales, indépendants) suivent d'autres règles."
        ],
        example: {
          title: "Exemple concret :",
          text: "Vous souhaitez passer de 35h à 21h/semaine (60 %) → l'employeur doit accepter et signer l'avenant."
        },
        goodToKnow: {
          title: "Bon à savoir :",
          items: [
            "L'employeur ne peut pas refuser sans raison valable (ex. impossibilité de réorganiser le service).",
            "Vous pouvez négocier le rythme de réduction du temps de travail pour qu'il corresponde à vos besoins."
          ]
        }
      }
    }
  ];

  return (
    <section className="eligibility-section-modern">
      <div className="eligibility-hero-image">
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80" 
          alt="Consultation retraite"
          loading="lazy"
        />
        <div className="image-overlay">
          <h2 className="section-title-on-image">Suis-je éligible ?</h2>
          <p className="section-description-on-image">
            Testez votre éligibilité en quelques clics et découvrez les conditions à remplir.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="eligibility-content">
          
          <div className="eligibility-cards">
            {eligibilityItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className="eligibility-card clickable"
                  onClick={() => setSelectedItem(index)}
                >
                  <div className="eligibility-icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="eligibility-card-title">{item.title}</h3>
                  <p className="eligibility-card-description">{item.description}</p>
                  <div className="card-more">En savoir plus →</div>
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

      {/* Modal détaillé pour chaque critère */}
      <PureCSSModal 
        isOpen={selectedItem !== null} 
        onClose={() => setSelectedItem(null)}
      >
            <button className="modal-close-btn" onClick={() => setSelectedItem(null)}>
              <X size={24} />
            </button>
            
            <div className="modal-header">
              {React.createElement(eligibilityItems[selectedItem].icon, { size: 40 })}
              <h2>{eligibilityItems[selectedItem].title}</h2>
            </div>

            <div className="modal-body">
              <p className="modal-intro">{eligibilityItems[selectedItem].detailedContent.intro}</p>

              {eligibilityItems[selectedItem].detailedContent.rules && (
                <ul className="modal-rules">
                  {eligibilityItems[selectedItem].detailedContent.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              )}

              {eligibilityItems[selectedItem].detailedContent.included && (
                <div className="modal-section">
                  <h4>{eligibilityItems[selectedItem].detailedContent.included.title}</h4>
                  <ul className="modal-sub-list">
                    {eligibilityItems[selectedItem].detailedContent.included.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {eligibilityItems[selectedItem].detailedContent.example && (
                <div className="modal-example">
                  <h4>{eligibilityItems[selectedItem].detailedContent.example.title}</h4>
                  <p>{eligibilityItems[selectedItem].detailedContent.example.text}</p>
                </div>
              )}

              {eligibilityItems[selectedItem].detailedContent.goodToKnow && (
                <div className="modal-good-to-know">
                  <h4>{eligibilityItems[selectedItem].detailedContent.goodToKnow.title}</h4>
                  <ul className="modal-sub-list">
                    {eligibilityItems[selectedItem].detailedContent.goodToKnow.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {eligibilityItems[selectedItem].detailedContent.tip && (
                <div className="modal-tip">
                  <strong>💡 Astuce :</strong> {eligibilityItems[selectedItem].detailedContent.tip}
                </div>
              )}
            </div>
      </PureCSSModal>

      {/* Modal d'éligibilité */}
      <PureCSSModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
      >
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
      </PureCSSModal>
    </section>
  );
};

export default EligibilitySection;

