import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle, Calculator, Briefcase, FileText } from 'lucide-react';
import DefinitionSection from './DefinitionSection';
import HeroSection from './HeroSection';
import EligibilitySection from './EligibilitySection';

const PageAccueil = ({ onPageChange }) => {
  const navigate = useNavigate();
  const [showFaq, setShowFaq] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);

  const stepsDetails = [
    {
      icon: CheckCircle,
      title: "Éligibilité",
      shortDescription: "Vérifiez vos conditions d'âge et de cotisations",
      detailedContent: {
        intro: "Avant de vous lancer dans la retraite progressive, il est essentiel de vérifier que vous remplissez tous les critères d'éligibilité.",
        criteria: {
          title: "Les critères principaux à vérifier :",
          items: [
            {
              subtitle: "Âge minimum",
              text: "Vous devez avoir au moins 60 ans (ou 55 ans pour certains régimes spéciaux ou situations de pénibilité)."
            },
            {
              subtitle: "Trimestres cotisés",
              text: "Vous devez justifier d'au moins 150 trimestres validés (soit environ 37,5 ans de cotisation)."
            },
            {
              subtitle: "Accord employeur",
              text: "Si vous êtes salarié, l'accord de votre employeur est obligatoire pour passer à temps partiel."
            },
            {
              subtitle: "Temps partiel",
              text: "Votre durée de travail doit être comprise entre 40% et 80% du temps plein."
            }
          ]
        },
        howTo: {
          title: "Comment vérifier votre éligibilité ?",
          steps: [
            "Consultez vos relevés de carrière sur www.lassuranceretraite.fr",
            "Vérifiez votre nombre de trimestres validés",
            "Calculez votre âge et comparez avec l'âge légal de départ",
            "Utilisez notre outil d'éligibilité pour un test rapide"
          ]
        },
        tip: "Même si vous n'avez pas tous vos trimestres, vous pouvez commencer la retraite progressive à 60 ans. La pension partielle sera calculée sur vos droits acquis. Utilisez notre simulateur de retraite progressive pour une estimation précise."
      }
    },
    {
      icon: Calculator,
      title: "Revenus",
      shortDescription: "Estimez vos revenus avec notre calculateur",
      detailedContent: {
        intro: "Une fois votre éligibilité confirmée, il est crucial d'estimer vos revenus futurs pour planifier sereinement votre transition.",
        whatToCalculate: {
          title: "Ce que vous devez calculer :",
          items: [
            {
              subtitle: "Votre salaire à temps partiel",
              text: "Calculez votre salaire net en fonction du pourcentage de temps partiel choisi (entre 40% et 80%)."
            },
            {
              subtitle: "Votre pension progressive",
              text: "Estimez la fraction de votre pension de retraite que vous percevrez (complémentaire au temps partiel)."
            },
            {
              subtitle: "Votre revenu total mensuel",
              text: "Additionnez votre salaire partiel et votre pension progressive pour connaître votre revenu global."
            }
          ]
        },
        tools: {
          title: "Outils à votre disposition :",
          items: [
            "Notre Calculateur avancé dans l'onglet \"Calculateur avancé\"",
            "Le simulateur officiel sur www.lassuranceretraite.fr (recommandé pour une estimation précise)",
            "Votre conseiller retraite pour un accompagnement personnalisé"
          ]
        },
        example: {
          title: "Exemple de calcul :",
          text: "Salaire brut actuel : 3 500 € • Temps partiel : 60% • Pension estimée : 1 800 €\n→ Salaire net partiel : 1 638 € (60% de 2 730 €)\n→ Pension progressive : 720 € (40% de 1 800 €)\n→ Revenu total : 2 358 €"
        },
        tip: "N'oubliez pas que vous continuerez à cotiser pendant la retraite progressive, ce qui augmentera votre pension définitive. Consultez nos conseils d'optimisation financière pour maximiser vos revenus."
      }
    },
    {
      icon: Briefcase,
      title: "Employeur",
      shortDescription: "Négociez votre passage à temps partiel",
      detailedContent: {
        intro: "Le passage en retraite progressive nécessite obligatoirement l'accord de votre employeur. Cette étape est cruciale pour la réussite de votre projet.",
        preparation: {
          title: "Comment préparer votre demande ?",
          items: [
            {
              subtitle: "Choisissez le bon moment",
              text: "Anticipez votre demande de 6 à 12 mois à l'avance pour permettre à votre employeur d'organiser la transition."
            },
            {
              subtitle: "Préparez votre proposition",
              text: "Définissez clairement le pourcentage de temps partiel souhaité, les jours de travail, et proposez un planning précis."
            },
            {
              subtitle: "Mettez en avant les avantages",
              text: "Soulignez que vous conservez votre expertise, que vous pouvez former vos successeurs, et que c'est une transition progressive."
            }
          ]
        },
        whatToDiscuss: {
          title: "Points à aborder avec votre employeur :",
          items: [
            "La date de début souhaitée",
            "Le pourcentage de temps de travail (40% à 80%)",
            "L'organisation concrète : quels jours, quels horaires",
            "La durée envisagée de la retraite progressive",
            "Les modalités de transfert de vos missions"
          ]
        },
        contract: {
          title: "Formalisation :",
          text: "L'accord doit être formalisé par un avenant à votre contrat de travail, précisant la nouvelle durée de travail, la rémunération, et les conditions d'exercice."
        },
        tip: "Si vous êtes fonctionnaire ou profession libérale, les règles peuvent différer. Renseignez-vous auprès de votre administration ou ordre professionnel. Pour plus de détails, consultez notre guide des démarches administratives."
      }
    },
    {
      icon: FileText,
      title: "Démarches",
      shortDescription: "Rassemblez vos documents et faites votre demande",
      detailedContent: {
        intro: "Une fois l'accord de votre employeur obtenu, vous devez effectuer les démarches administratives auprès de votre caisse de retraite.",
        whoToContact: {
          title: "Qui contacter ?",
          items: [
            {
              subtitle: "Régime de base",
              text: "L'Assurance Retraite (CNAV) pour les salariés du secteur privé : www.lassuranceretraite.fr ou 3960"
            },
            {
              subtitle: "Régimes complémentaires",
              text: "Agirc-Arrco pour les salariés cadres et non-cadres : www.agirc-arrco.fr"
            },
            {
              subtitle: "Autres régimes",
              text: "Fonction publique, professions libérales, agriculteurs : contactez votre caisse spécifique"
            }
          ]
        },
        documents: {
          title: "Documents à préparer :",
          items: [
            "Votre relevé de carrière (disponible sur votre compte retraite en ligne)",
            "L'avenant à votre contrat de travail signé par l'employeur",
            {
              text: "Une attestation de l'employeur précisant votre temps de travail",
              link: "https://www.info-retraite.fr/portail-info/files/live/sites/PortailInformationnel/files/PDF/Services/UnionRetraite-Attestation_employeur_retraiteProgressive.pdf"
            },
            "Vos bulletins de salaire récents",
            "Une copie de votre pièce d'identité et de votre carte vitale"
          ]
        },
        timeline: {
          title: "Calendrier des démarches :",
          text: "Déposez votre demande au moins 4 mois avant la date souhaitée de début de la retraite progressive. La caisse de retraite dispose de 2 mois pour instruire votre dossier."
        },
        tip: "Prenez rendez-vous avec un conseiller retraite pour un accompagnement personnalisé. C'est gratuit et très utile pour éviter les erreurs. Vous pouvez aussi nous contacter pour toute question spécifique."
      }
    }
  ];

  const faqItems = [
    {
      question: "Qu'est-ce que la retraite progressive ?",
      answer: "C'est votre sas vers la retraite ! Vous réduisez votre temps de travail (40% à 80%) tout en touchant déjà une partie de votre pension (30% à 50%). Une transition en douceur qui vous permet de garder un pied dans la vie active."
    },
    {
      question: "Suis-je éligible ?",
      answer: "Pour en bénéficier, il vous faut : 60 ans minimum (ou 55 ans dans certains cas), 150 trimestres cotisés, et l'accord de votre employeur. Pas de panique si vous n'avez pas tous vos trimestres, vous pouvez quand même commencer !"
    },
    {
      question: "Combien vais-je toucher ?",
      answer: "Le calcul est simple : votre salaire à temps partiel + votre pension progressive. Notre simulateur de retraite progressive vous donne une estimation en quelques clics. N'oubliez pas : c'est indicatif, le simulateur officiel M@rel reste la référence."
    },
    {
      question: "Puis-je ajuster mon temps partiel ?",
      answer: "Absolument ! Vous pouvez modifier votre pourcentage entre 40% et 80% selon vos besoins. L'important c'est de bien négocier avec votre employeur et de prévoir les démarches administratives. Consultez nos conseils pour optimiser votre retraite progressive."
    }
  ];

  return (
    <div className="homepage">
      {/* H1 principal pour le SEO */}
      <h1 style={{position: 'absolute', left: '-9999px', top: '-9999px'}}>
        Retraite Progressive : Guide Complet 2024 - Simulateur Gratuit
      </h1>
      
      {/* Hero Section Moderne */}
      <HeroSection />

      {/* Section Definition Moderne */}
      <DefinitionSection />

      {/* Section Eligibility Moderne */}
      <EligibilitySection />

      {/* Étapes pour commencer */}
      <div className="steps-section">
        <div className="steps-header-image">
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80" 
            alt="Planifier sa retraite progressive"
            loading="lazy"
          />
          <div className="image-overlay-steps">
            <h2 className="section-title-on-image">Comment commencer sa retraite progressive en 2024 ?</h2>
            <p className="section-description-on-image">
              4 étapes simples pour réussir votre transition en douceur
            </p>
          </div>
        </div>
        <div className="steps-grid">
          {stepsDetails.map((step, index) => (
            <div 
              key={index} 
              className="step-item clickable"
              onClick={() => setSelectedStep(index)}
            >
              <div className="step-number">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.shortDescription}</p>
              <div className="step-more">En savoir plus →</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal détaillé pour les étapes */}
      {selectedStep !== null && (
        <div className="steps-modal-overlay" onClick={() => setSelectedStep(null)}>
          <div className="steps-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedStep(null)}>
              <X size={24} />
            </button>
            
            <div className="modal-header">
              {React.createElement(stepsDetails[selectedStep].icon, { size: 40 })}
              <h2>{stepsDetails[selectedStep].title}</h2>
      </div>

            <div className="modal-body">
              <p className="modal-intro">{stepsDetails[selectedStep].detailedContent.intro}</p>

              {/* Critères (pour l'étape 1) */}
              {stepsDetails[selectedStep].detailedContent.criteria && (
                <div className="modal-section">
                  <h4>{stepsDetails[selectedStep].detailedContent.criteria.title}</h4>
                  {stepsDetails[selectedStep].detailedContent.criteria.items.map((item, idx) => (
                    <div key={idx} className="modal-subsection">
                      <strong>{item.subtitle}</strong>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment faire (pour l'étape 1) */}
              {stepsDetails[selectedStep].detailedContent.howTo && (
                <div className="modal-section">
                  <h4>{stepsDetails[selectedStep].detailedContent.howTo.title}</h4>
                  <ol className="modal-ordered-list">
                    {stepsDetails[selectedStep].detailedContent.howTo.steps.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Ce qu'il faut calculer (pour l'étape 2) */}
              {stepsDetails[selectedStep].detailedContent.whatToCalculate && (
                <div className="modal-section">
                  <h4>{stepsDetails[selectedStep].detailedContent.whatToCalculate.title}</h4>
                  {stepsDetails[selectedStep].detailedContent.whatToCalculate.items.map((item, idx) => (
                    <div key={idx} className="modal-subsection">
                      <strong>{item.subtitle}</strong>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Outils (pour l'étape 2) */}
              {stepsDetails[selectedStep].detailedContent.tools && (
                <div className="modal-section">
                  <h4>{stepsDetails[selectedStep].detailedContent.tools.title}</h4>
                  <ul className="modal-list">
                    {stepsDetails[selectedStep].detailedContent.tools.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
            </div>
              )}

              {/* Préparation (pour l'étape 3) */}
              {stepsDetails[selectedStep].detailedContent.preparation && (
                <div className="modal-section">
                  <h4>{stepsDetails[selectedStep].detailedContent.preparation.title}</h4>
                  {stepsDetails[selectedStep].detailedContent.preparation.items.map((item, idx) => (
                    <div key={idx} className="modal-subsection">
                      <strong>{item.subtitle}</strong>
                      <p>{item.text}</p>
          </div>
                  ))}
              </div>
              )}

              {/* Points à discuter (pour l'étape 3) */}
              {stepsDetails[selectedStep].detailedContent.whatToDiscuss && (
                <div className="modal-section">
                  <h4>{stepsDetails[selectedStep].detailedContent.whatToDiscuss.title}</h4>
                  <ul className="modal-list">
                    {stepsDetails[selectedStep].detailedContent.whatToDiscuss.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
              </div>
              )}

              {/* Contrat (pour l'étape 3) */}
              {stepsDetails[selectedStep].detailedContent.contract && (
                <div className="modal-contract">
                  <h4>{stepsDetails[selectedStep].detailedContent.contract.title}</h4>
                  <p>{stepsDetails[selectedStep].detailedContent.contract.text}</p>
            </div>
              )}

              {/* Qui contacter (pour l'étape 4) */}
              {stepsDetails[selectedStep].detailedContent.whoToContact && (
                <div className="modal-section">
                  <h4>{stepsDetails[selectedStep].detailedContent.whoToContact.title}</h4>
                  {stepsDetails[selectedStep].detailedContent.whoToContact.items.map((item, idx) => (
                    <div key={idx} className="modal-subsection">
                      <strong>{item.subtitle}</strong>
                      <p>{item.text}</p>
          </div>
                  ))}
          </div>
              )}

              {/* Documents (pour l'étape 4) */}
              {stepsDetails[selectedStep].detailedContent.documents && (
                <div className="modal-section">
                  <h4>{stepsDetails[selectedStep].detailedContent.documents.title}</h4>
                  <ul className="modal-list">
                    {stepsDetails[selectedStep].detailedContent.documents.items.map((item, idx) => (
                      <li key={idx}>
                        {typeof item === 'string' ? (
                          item
                        ) : (
                          <>
                            {item.text}{' '}
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="document-link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              (télécharger le modèle)
                            </a>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Timeline (pour l'étape 4) */}
              {stepsDetails[selectedStep].detailedContent.timeline && (
                <div className="modal-timeline">
                  <h4>{stepsDetails[selectedStep].detailedContent.timeline.title}</h4>
                  <p>{stepsDetails[selectedStep].detailedContent.timeline.text}</p>
            </div>
              )}

              {/* Exemple (pour l'étape 2) */}
              {stepsDetails[selectedStep].detailedContent.example && (
                <div className="modal-example">
                  <h4>{stepsDetails[selectedStep].detailedContent.example.title}</h4>
                  <p style={{whiteSpace: 'pre-line'}}>{stepsDetails[selectedStep].detailedContent.example.text}</p>
          </div>
              )}

              {/* Tip */}
              {stepsDetails[selectedStep].detailedContent.tip && (
                <div className="modal-tip">
                  <strong>💡 Astuce :</strong> {stepsDetails[selectedStep].detailedContent.tip}
                  
                  {/* Liens internes contextuels */}
                  {selectedStep === 0 && (
                    <div className="modal-links">
                      <button 
                        className="modal-link-btn"
                        onClick={() => {
                          setSelectedStep(null);
                          navigate('/calculateur');
                          onPageChange('calculateur');
                        }}
                      >
                        🧮 Utiliser le simulateur
                      </button>
                    </div>
                  )}
                  
                  {selectedStep === 1 && (
                    <div className="modal-links">
                      <button 
                        className="modal-link-btn"
                        onClick={() => {
                          setSelectedStep(null);
                          navigate('/conseils');
                          onPageChange('conseils');
                        }}
                      >
                        💡 Voir les conseils d'optimisation
                      </button>
                    </div>
                  )}
                  
                  {selectedStep === 2 && (
                    <div className="modal-links">
                      <button 
                        className="modal-link-btn"
                        onClick={() => {
                          setSelectedStep(null);
                          navigate('/conseils');
                          onPageChange('conseils');
                        }}
                      >
                        📋 Guide des démarches
                      </button>
                    </div>
                  )}
                  
                  {selectedStep === 3 && (
                    <div className="modal-links">
                      <button 
                        className="modal-link-btn"
                        onClick={() => {
                          setSelectedStep(null);
                          navigate('/contact');
                          onPageChange('contact');
                        }}
                      >
                        📞 Nous contacter
                      </button>
                    </div>
                  )}
              </div>
              )}
              </div>
            </div>
          </div>
      )}

      {/* FAQ */}
      <div className="faq-section">
        <div className="faq-header-image">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80" 
            alt="Questions fréquentes sur la retraite"
            loading="lazy"
          />
          <div className="image-overlay-faq">
            <h2 className="section-title-on-image">Questions fréquentes sur la retraite progressive</h2>
            <p className="section-description-on-image">
              Trouvez rapidement les réponses à vos questions sur la retraite progressive
            </p>
          </div>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => setShowFaq(showFaq === index ? null : index)}
              >
                {item.question}
                <span className={`faq-icon ${showFaq === index ? 'open' : ''}`}>+</span>
              </button>
              {showFaq === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
          </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PageAccueil;