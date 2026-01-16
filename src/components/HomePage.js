import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../conseils-styles.css';
import { 
  CheckCircle, 
  ArrowRight,
  Briefcase,
  Euro,
  Calendar,
  Users,
  X
} from 'lucide-react';
import WhyChooseSection from './WhyChooseSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';
import FAQSection from './FAQSection';
import Accordion from './Accordion';
import { trackEvent } from '../utils/tracking';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [openPopup, setOpenPopup] = useState(null);
  const [openEligibilityTest, setOpenEligibilityTest] = useState(false);
  const [openResourceModal, setOpenResourceModal] = useState(null);

  // Navigation sticky
  const navItems = React.useMemo(() => [
    { id: 'accueil', label: 'Accueil' },
    { id: 'definition', label: 'Qu\'est-ce que c\'est ?' },
    { id: 'eligibilite', label: 'Éligibilité' },
    { id: 'etapes', label: 'Étapes' },
    { id: 'faq', label: 'FAQ' }
  ], []);

  // Definition data with popups
  const definitionData = [
    {
      icon: Briefcase,
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Travailler à temps partiel",
      description: "Réduisez votre temps de travail (entre 40% et 80%) tout en conservant votre emploi.",
      popupContent: "La retraite progressive vous permet de réduire votre temps de travail tout en gardant votre emploi. Vous pouvez choisir de travailler entre 40% et 80% de votre temps plein, ce qui vous laisse plus de temps libre tout en conservant une partie de vos revenus."
    },
    {
      icon: Euro,
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Toucher une partie de sa retraite",
      description: "Percevez 30% à 50% de votre pension estimée au taux plein, selon votre situation.",
      popupContent: "En plus de votre salaire partiel, vous percevez une partie de votre pension de retraite. Le montant dépend de votre situation : entre 30% et 50% de votre pension au taux plein. Cette pension partielle est calculée selon vos trimestres validés."
    },
    {
      icon: Calendar,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Transition en douceur",
      description: "Préparez sereinement votre retraite complète tout en gardant un revenu stable.",
      popupContent: "La retraite progressive est une transition douce vers la retraite complète. Elle vous permet de vous habituer progressivement à un nouveau rythme de vie tout en conservant des revenus stables et en préparant votre avenir."
    },
    {
      icon: Users,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Flexibilité temporelle",
      description: "Choisissez quand commencer et ajustez votre rythme selon vos besoins personnels.",
      popupContent: "Vous avez la flexibilité de choisir quand commencer votre retraite progressive et d'ajuster votre rythme selon vos besoins. Vous pouvez modifier votre temps partiel ou revenir au temps plein si nécessaire."
    }
  ];

  // Eligibility data with popups
  const eligibilityData = [
    {
      icon: Calendar,
      title: "Âge minimum",
      description: "60 ans (ou 55 ans dans certains cas particuliers)",
      popupContent: "Pour bénéficier de la retraite progressive, vous devez avoir au moins 60 ans. Cependant, certaines exceptions existent : 55 ans pour les régimes spéciaux, les situations de pénibilité, ou les carrières longues."
    },
    {
      icon: CheckCircle,
      title: "Trimestres cotisés",
      description: "Au moins 150 trimestres validés",
      popupContent: "Vous devez justifier d'au moins 150 trimestres validés (soit environ 37,5 ans de cotisation). Ces trimestres sont validés par l'Assurance Retraite sur la base de vos cotisations et de votre activité professionnelle."
    },
    {
      icon: Users,
      title: "Accord employeur",
      description: "Temps partiel entre 40% et 80%",
      popupContent: "Si vous êtes salarié, l'accord de votre employeur est obligatoire pour passer à temps partiel. Votre durée de travail doit être comprise entre 40% et 80% du temps plein. Cette négociation se fait en amont de votre demande."
    }
  ];

  // Steps data with popups
  const stepsData = [
    {
      number: "1",
      title: "Éligibilité",
      description: "Vérifiez vos conditions d'âge et de cotisations",
      popupContent: "Commencez par vérifier que vous remplissez tous les critères d'éligibilité : âge minimum, nombre de trimestres validés, et possibilité d'obtenir l'accord de votre employeur pour un temps partiel."
    },
    {
      number: "2",
      title: "Revenus",
      description: "Estimez vos revenus avec notre calculateur",
      popupContent: "Utilisez notre simulateur pour estimer précisément vos revenus en retraite progressive. Cela vous aidera à planifier votre budget et à prendre une décision éclairée."
    },
    {
      number: "3",
      title: "Employeur",
      description: "Négociez votre passage à temps partiel",
      popupContent: "Discutez avec votre employeur de votre souhait de passer à temps partiel. Préparez votre argumentaire en vous appuyant sur les résultats de votre simulation."
    },
    {
      number: "4",
      title: "Démarches",
      description: "Rassemblez vos documents et faites votre demande",
      popupContent: "Rassemblez tous les documents nécessaires (relevé de carrière, accord employeur) et faites votre demande à l'Assurance Retraite au moins 4 mois avant la date souhaitée."
    }
  ];

  // FAQ data - utilisé dans FAQSection component (importé depuis data/data.js)
  // const faqData = [
  //   {
  //     question: "Qu'est-ce que la retraite progressive ?",
  //     answer: "La retraite progressive est un dispositif qui vous permet de travailler à temps partiel tout en percevant une partie de votre pension de retraite. C'est une transition en douceur vers la retraite complète."
  //   },
  //   {
  //     question: "Suis-je éligible ?",
  //     answer: "Vous devez avoir au moins 60 ans (ou 55 ans dans certains cas), justifier d'au moins 150 trimestres validés, et obtenir l'accord de votre employeur pour un temps partiel entre 40% et 80%."
  //   },
  //   {
  //     question: "Combien vais-je toucher ?",
  //     answer: "Vos revenus dépendent de votre salaire partiel, de votre pension calculée selon vos trimestres validés, et du pourcentage d'activité choisi. Utilisez notre simulateur pour une estimation précise."
  //   },
  //   {
  //     question: "Puis-je ajuster mon temps partiel ?",
  //     answer: "Oui, vous pouvez modifier votre temps partiel, mais cela nécessite un nouvel accord avec votre employeur et une nouvelle demande à l'Assurance Retraite."
  //   },
  //   {
  //     question: "Comment faire ma demande ?",
  //     answer: "Vous devez faire votre demande 4 mois avant la date souhaitée. Rassemblez vos documents (relevé de carrière, accord employeur) et contactez l'Assurance Retraite."
  //   },
  //   {
  //     question: "La retraite progressive impacte-t-elle ma pension finale ?",
  //     answer: "Non, la retraite progressive n'affecte pas le montant de votre pension à taux plein. Elle vous permet simplement de la percevoir partiellement pendant votre activité."
  //   }
  // ];

  // Smooth scroll to section
  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            // Active section tracking removed - not needed for functionality
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <div className="homepage">
      <div className="homepage-content">
        {/* Header avec layout 3 colonnes */}
        <header className="homepage-header">
          <div className="homepage-header-layout">
            {/* Colonne gauche : RetraiteClair */}
            <div className="homepage-header-left">
              <p className="homepage-subtitle homepage-subtitle-large">RetraiteClair</p>
              <p className="homepage-subtitle-small">
                Simplifiez votre départ à la retraite avec notre simulateur de retraite progressive
              </p>
            </div>
            
            {/* Colonne centre : Image */}
            <div className="homepage-header-center">
              <div className="homepage-header-image-container">
                <img 
                  src="/images/homepage-hero-couple.jpg" 
                  alt="Couple souriant utilisant un smartphone"
                  className="homepage-header-image"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section removed as requested */}

      {/* Simulation Cards */}
      <section className="simulation-cards">
        <div className="simulation-cards-header">
          <h2 className="simulation-cards-title">Calculez votre retraite progressive en 2 minutes</h2>
          <p className="simulation-cards-subtitle">
            Découvrez combien vous pouvez percevoir en travaillant à temps partiel. Simulateur gratuit, précis et confidentiel
          </p>
        </div>
        <div className="cards-container">
          <div className="simulation-card">
            <div className="card-image-container">
              <img 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Simulation simplifiée"
                className="card-image"
              />
              <div className="card-overlay">
                <div className="card-header">
                  <h3 className="card-title">Simulation Simplifiée</h3>
                  <div className="card-time-indicator">
                    <span className="time-icon">⏱️</span>
                    <span className="time-text">2 min</span>
                  </div>
                </div>
                <p className="card-description">
                  <strong>Idéal pour débuter</strong><br/>
                  Calcul rapide avec les informations essentielles.
                </p>
                <button 
                  className="card-button card-button-primary"
                  onClick={() => {
                    // Déclencher la navigation vers le calculateur en mode simplifié
                    window.dispatchEvent(new CustomEvent('navigateToPage', { detail: { page: 'calculateur', mode: 'simplified' } }));
                  }}
                  aria-label="Essayer la version simplifiée"
                >
                  Commencer rapidement
                </button>
              </div>
            </div>
          </div>

          <div className="simulation-card simulation-card-advanced">
            <div 
              className="card-image-container"
              onClick={() => {
                // Déclencher la navigation vers le calculateur en mode avancé
                window.dispatchEvent(new CustomEvent('navigateToPage', { detail: { page: 'calculateur', mode: 'advanced' } }));
              }}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Femme détendue et souriante faisant du ski sur une montagne ensoleillée - Simulation avancée"
                className="card-image"
              />
              <div className="card-overlay">
                <div className="card-header">
                  <h3 className="card-title">Simulation Avancée</h3>
                  <div className="card-time-indicator">
                    <span className="time-icon">⏱️</span>
                    <span className="time-text">5 min</span>
                  </div>
                </div>
                <p className="card-description">
                  <strong>Analyse complète et précise</strong><br/>
                  Calcul détaillé avec tous les paramètres.
                </p>
                <button 
                  className="card-button card-button-secondary"
                  onClick={(e) => {
                    e.stopPropagation(); // Empêcher le double déclenchement
                    // Déclencher la navigation vers le calculateur en mode avancé
                    window.dispatchEvent(new CustomEvent('navigateToPage', { detail: { page: 'calculateur', mode: 'advanced' } }));
                  }}
                  aria-label="Explorer la version avancée"
                >
                  Analyse complète
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicateurs centrés entre les cartes */}
        <div className="cards-indicators">
          <div className="indicator-dot indicator-active"></div>
          <div className="indicator-dot"></div>
        </div>
      </section>

      {/* Why Choose Section */}
      <WhyChooseSection />

      {/* Definition Section */}
      <section id="definition" className="content-section">
        <div className="section-container">
          <h2 className="section-title">Qu'est-ce que la retraite progressive ?</h2>
          <div className="definition-grid">
            {definitionData.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="definition-card">
                  {item.image && (
                    <div className="definition-card-image">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        loading="lazy"
                      />
                      <div className="definition-card-overlay"></div>
                    </div>
                  )}
                  <div className="definition-card-content">
                    <div className="definition-icon">
                      <IconComponent size={32} />
                    </div>
                    <h3 className="definition-title">{item.title}</h3>
                    <p className="definition-description">{item.description}</p>
                    
                    <Accordion title="En savoir plus →">
                      <p className="modal-intro">{item.popupContent}</p>
                    </Accordion>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eligibility Section - Sans cadre */}
      <section id="eligibilite" className="content-section">
        <div className="section-container">
          <h2 className="section-title">Suis-je éligible ?</h2>
          <div className="eligibility-content">
            {eligibilityData.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="eligibility-item">
                  <div className="eligibility-icon">
                    <IconComponent size={32} />
                  </div>
                  <div className="eligibility-text">
                    <h3 className="eligibility-title">{item.title}</h3>
                    <p className="eligibility-description">{item.description}</p>
                  </div>
                  <Accordion title="En savoir plus →">
                    <p className="modal-intro">{item.popupContent}</p>
                  </Accordion>
                </div>
              );
            })}
          </div>
          <div className="eligibility-cta">
            <button 
              className="eligibility-button"
              onClick={() => setOpenEligibilityTest(true)}
              aria-label="Tester mon éligibilité"
            >
              🟩 Tester mon éligibilité
            </button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="etapes" className="content-section">
        <div className="section-container">
          <h2 className="section-title">Comment commencer sa retraite progressive</h2>
          <div className="steps-grid">
            {stepsData.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <Accordion title="En savoir plus →">
                  <p className="modal-intro">{step.popupContent}</p>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Resources Section - Internal Linking for AI SEO */}
      <section className="content-section" style={{ background: '#f8fafc', padding: '60px 20px' }}>
        <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
            {language === 'en' ? 'Guides and Additional Resources' : 'Guides et ressources complémentaires'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ 
              background: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                color: '#2c3e50', 
                padding: '1.5rem 1.5rem 0 1.5rem', 
                margin: 0, 
                lineHeight: '1.3' 
              }}>
                <a href="/#/guide-retraite-2025" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {language === 'en' ? 'Complete Guide 2025' : 'Guide complet 2025'}
                </a>
              </h3>
              <div style={{ padding: '1rem 1.5rem', margin: 0 }}>
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80" 
                  alt={language === 'en' ? 'Complete Guide 2025' : 'Guide complet 2025'}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <p style={{ 
                color: '#6c757d', 
                lineHeight: '1.6', 
                fontSize: '1rem', 
                padding: '0 1.5rem', 
                margin: 0 
              }}>
                {language === 'en' 
                  ? 'Detailed guide on progressive retirement: how it works, eligibility, calculation, benefits and optimization strategies.'
                  : 'Guide détaillé sur la retraite progressive : fonctionnement, éligibilité, calcul, avantages et stratégies d\'optimisation.'}
              </p>
              <button 
                onClick={() => setOpenResourceModal('guide-retraite-2025')}
                style={{ 
                  padding: '1rem 1.5rem 1.5rem 1.5rem',
                  marginTop: 'auto',
                  background: 'transparent',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: 'fit-content',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#2980b9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#3498db';
                }}
              >
                <span style={{ 
                  color: '#3498db', 
                  fontWeight: 500, 
                  fontSize: '0.9rem', 
                  transition: 'color 0.3s ease' 
                }}>
                  {language === 'en' ? 'Learn more →' : 'En savoir plus →'}
                </span>
              </button>
            </div>
            <div style={{ 
              background: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                color: '#2c3e50', 
                padding: '1.5rem 1.5rem 0 1.5rem', 
                margin: 0, 
                lineHeight: '1.3' 
              }}>
                <a href="/#/faq-retraite" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {language === 'en' ? 'Retirement FAQ' : 'FAQ Retraite'}
                </a>
              </h3>
              <div style={{ padding: '1rem 1.5rem', margin: 0 }}>
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80" 
                  alt={language === 'en' ? 'Retirement FAQ' : 'FAQ Retraite'}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <p style={{ 
                color: '#6c757d', 
                lineHeight: '1.6', 
                fontSize: '1rem', 
                padding: '0 1.5rem', 
                margin: 0 
              }}>
                {language === 'en' 
                  ? 'Answers to the most frequently asked questions about progressive retirement, discount, surcharge and eligibility.'
                  : 'Réponses aux questions les plus fréquentes sur la retraite progressive, la décote, la surcote et l\'éligibilité.'}
              </p>
              <button 
                onClick={() => setOpenResourceModal('faq-retraite')}
                style={{ 
                  padding: '1rem 1.5rem 1.5rem 1.5rem',
                  marginTop: 'auto',
                  background: 'transparent',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: 'fit-content',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#2980b9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#3498db';
                }}
              >
                <span style={{ 
                  color: '#3498db', 
                  fontWeight: 500, 
                  fontSize: '0.9rem', 
                  transition: 'color 0.3s ease' 
                }}>
                  {language === 'en' ? 'Learn more →' : 'En savoir plus →'}
                </span>
              </button>
            </div>
            <div style={{ 
              background: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                color: '#2c3e50', 
                padding: '1.5rem 1.5rem 0 1.5rem', 
                margin: 0, 
                lineHeight: '1.3' 
              }}>
                <a href="/#/calcul-retraite" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {language === 'en' ? 'Retirement Calculation' : 'Calcul retraite'}
                </a>
              </h3>
              <div style={{ padding: '1rem 1.5rem', margin: 0 }}>
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80" 
                  alt={language === 'en' ? 'Retirement Calculation' : 'Calcul retraite'}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <p style={{ 
                color: '#6c757d', 
                lineHeight: '1.6', 
                fontSize: '1rem', 
                padding: '0 1.5rem', 
                margin: 0 
              }}>
                {language === 'en' 
                  ? 'Learn how to calculate your pension and discover strategies to optimize your retirement income.'
                  : 'Apprenez à calculer votre pension et découvrez les stratégies pour optimiser vos revenus de retraite.'}
              </p>
              <button 
                onClick={() => setOpenResourceModal('calcul-retraite')}
                style={{ 
                  padding: '1rem 1.5rem 1.5rem 1.5rem',
                  marginTop: 'auto',
                  background: 'transparent',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: 'fit-content',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#2980b9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#3498db';
                }}
              >
                <span style={{ 
                  color: '#3498db', 
                  fontWeight: 500, 
                  fontSize: '0.9rem', 
                  transition: 'color 0.3s ease' 
                }}>
                  {language === 'en' ? 'Learn more →' : 'En savoir plus →'}
                </span>
              </button>
            </div>
            <div style={{ 
              background: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                color: '#2c3e50', 
                padding: '1.5rem 1.5rem 0 1.5rem', 
                margin: 0, 
                lineHeight: '1.3' 
              }}>
                <a href="/#/decote-surcote" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {language === 'en' ? 'Discount and Surcharge' : 'Décote et surcote'}
                </a>
              </h3>
              <div style={{ padding: '1rem 1.5rem', margin: 0 }}>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" 
                  alt={language === 'en' ? 'Discount and Surcharge' : 'Décote et surcote'}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <p style={{ 
                color: '#6c757d', 
                lineHeight: '1.6', 
                fontSize: '1rem', 
                padding: '0 1.5rem', 
                margin: 0 
              }}>
                {language === 'en' 
                  ? 'Understand how discount and surcharge impact your pension and how to optimize your departure.'
                  : 'Comprenez comment la décote et la surcote impactent votre pension et comment optimiser votre départ.'}
              </p>
              <button 
                onClick={() => setOpenResourceModal('decote-surcote')}
                style={{ 
                  padding: '1rem 1.5rem 1.5rem 1.5rem',
                  marginTop: 'auto',
                  background: 'transparent',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: 'fit-content',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#2980b9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#3498db';
                }}
              >
                <span style={{ 
                  color: '#3498db', 
                  fontWeight: 500, 
                  fontSize: '0.9rem', 
                  transition: 'color 0.3s ease' 
                }}>
                  {language === 'en' ? 'Learn more →' : 'En savoir plus →'}
                </span>
              </button>
            </div>
            <div style={{ 
              background: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                color: '#2c3e50', 
                padding: '1.5rem 1.5rem 0 1.5rem', 
                margin: 0, 
                lineHeight: '1.3' 
              }}>
                <a href="/#/demarche-retraite-progressive" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {language === 'en' ? 'Procedures and Formalities' : 'Démarches et formalités'}
                </a>
              </h3>
              <div style={{ padding: '1rem 1.5rem', margin: 0 }}>
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80" 
                  alt={language === 'en' ? 'Part-Time' : 'Temps partiel'}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <p style={{ 
                color: '#6c757d', 
                lineHeight: '1.6', 
                fontSize: '1rem', 
                padding: '0 1.5rem', 
                margin: 0 
              }}>
                {language === 'en' 
                  ? 'Income comparison by part-time rate: 40%, 50%, 60%, 70%, 80% and impact on your income.'
                  : 'Comparatif des revenus selon le taux de temps partiel : 40%, 50%, 60%, 70%, 80% et impact sur vos revenus.'}
              </p>
              <button 
                onClick={() => setOpenResourceModal('temps-partiel-retraite-progressive')}
                style={{ 
                  padding: '1rem 1.5rem 1.5rem 1.5rem',
                  marginTop: 'auto',
                  background: 'transparent',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: 'fit-content',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#2980b9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#3498db';
                }}
              >
                <span style={{ 
                  color: '#3498db', 
                  fontWeight: 500, 
                  fontSize: '0.9rem', 
                  transition: 'color 0.3s ease' 
                }}>
                  {language === 'en' ? 'Learn more →' : 'En savoir plus →'}
                </span>
              </button>
            </div>
            <div style={{ 
              background: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                color: '#2c3e50', 
                padding: '1.5rem 1.5rem 0 1.5rem', 
                margin: 0, 
                lineHeight: '1.3' 
              }}>
                <a href="/#/fiscalite-retraite-progressive" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {language === 'en' ? 'Taxation' : 'Fiscalité'}
                </a>
              </h3>
              <div style={{ padding: '1rem 1.5rem', margin: 0 }}>
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80" 
                  alt={language === 'en' ? 'Taxation' : 'Fiscalité'}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <p style={{ 
                color: '#6c757d', 
                lineHeight: '1.6', 
                fontSize: '1rem', 
                padding: '0 1.5rem', 
                margin: 0 
              }}>
                {language === 'en' 
                  ? 'Complete guide on progressive retirement taxation: taxes, contributions, supplementary pensions.'
                  : 'Guide complet sur la fiscalité de la retraite progressive : impôts, cotisations, pensions complémentaires.'}
              </p>
              <button 
                onClick={() => setOpenResourceModal('fiscalite-retraite-progressive')}
                style={{ 
                  padding: '1rem 1.5rem 1.5rem 1.5rem',
                  marginTop: 'auto',
                  background: 'transparent',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: 'fit-content',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#2980b9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#3498db';
                }}
              >
                <span style={{ 
                  color: '#3498db', 
                  fontWeight: 500, 
                  fontSize: '0.9rem', 
                  transition: 'color 0.3s ease' 
                }}>
                  {language === 'en' ? 'Learn more →' : 'En savoir plus →'}
                </span>
              </button>
            </div>
            <div style={{ 
              background: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                color: '#2c3e50', 
                padding: '1.5rem 1.5rem 0 1.5rem', 
                margin: 0, 
                lineHeight: '1.3' 
              }}>
                <a href="/#/cas-pratiques-retraite-progressive" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {language === 'en' ? 'Case Studies' : 'Cas pratiques'}
                </a>
              </h3>
              <div style={{ padding: '1rem 1.5rem', margin: 0 }}>
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80" 
                  alt={language === 'en' ? 'Case Studies' : 'Cas pratiques'}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <p style={{ 
                color: '#6c757d', 
                lineHeight: '1.6', 
                fontSize: '1rem', 
                padding: '0 1.5rem', 
                margin: 0 
              }}>
                {language === 'en' 
                  ? 'Concrete examples of progressive retirement: executive employee, part-time, incomplete career, multi-regime.'
                  : 'Exemples concrets de retraite progressive : salarié cadre, temps partiel, carrière incomplète, multi-régimes.'}
              </p>
              <button 
                onClick={() => setOpenResourceModal('cas-pratiques-retraite-progressive')}
                style={{ 
                  padding: '1rem 1.5rem 1.5rem 1.5rem',
                  marginTop: 'auto',
                  background: 'transparent',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: 'fit-content',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#2980b9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#3498db';
                }}
              >
                <span style={{ 
                  color: '#3498db', 
                  fontWeight: 500, 
                  fontSize: '0.9rem', 
                  transition: 'color 0.3s ease' 
                }}>
                  {language === 'en' ? 'Learn more →' : 'En savoir plus →'}
                </span>
              </button>
            </div>
            <div style={{ 
              background: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                color: '#2c3e50', 
                padding: '1.5rem 1.5rem 0 1.5rem', 
                margin: 0, 
                lineHeight: '1.3' 
              }}>
                <a href="/#/pieges-retraite" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {language === 'en' ? 'Pitfalls to Avoid' : 'Pièges à éviter'}
                </a>
              </h3>
              <div style={{ padding: '1rem 1.5rem', margin: 0 }}>
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80" 
                  alt={language === 'en' ? 'Pitfalls to Avoid' : 'Pièges à éviter'}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <p style={{ 
                color: '#6c757d', 
                lineHeight: '1.6', 
                fontSize: '1rem', 
                padding: '0 1.5rem', 
                margin: 0 
              }}>
                {language === 'en' 
                  ? 'Discover common mistakes when retiring and how to avoid them to optimize your income.'
                  : 'Découvrez les erreurs courantes lors de la prise de retraite et comment les éviter pour optimiser vos revenus.'}
              </p>
              <button 
                onClick={() => setOpenResourceModal('pieges-retraite')}
                style={{ 
                  padding: '1rem 1.5rem 1.5rem 1.5rem',
                  marginTop: 'auto',
                  background: 'transparent',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: 'fit-content',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#2980b9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#3498db';
                }}
              >
                <span style={{ 
                  color: '#3498db', 
                  fontWeight: 500, 
                  fontSize: '0.9rem', 
                  transition: 'color 0.3s ease' 
                }}>
                  {language === 'en' ? 'Learn more →' : 'En savoir plus →'}
                </span>
              </button>
            </div>
            <div style={{ 
              background: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                color: '#2c3e50', 
                padding: '1.5rem 1.5rem 0 1.5rem', 
                margin: 0, 
                lineHeight: '1.3' 
              }}>
                <a href="/#/statut-retraite-progressive" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {language === 'en' ? 'By Your Status' : 'Selon votre statut'}
                </a>
              </h3>
              <div style={{ padding: '1rem 1.5rem', margin: 0 }}>
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80" 
                  alt={language === 'en' ? 'By Your Status' : 'Selon votre statut'}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <p style={{ 
                color: '#6c757d', 
                lineHeight: '1.6', 
                fontSize: '1rem', 
                padding: '0 1.5rem', 
                margin: 0 
              }}>
                {language === 'en' 
                  ? 'Progressive retirement according to your status: civil service, self-employed, freelancers, expatriates.'
                  : 'Retraite progressive selon votre statut : fonction publique, indépendants, auto-entrepreneurs, expatriés.'}
              </p>
              <button 
                onClick={() => setOpenResourceModal('statut-retraite-progressive')}
                style={{ 
                  padding: '1rem 1.5rem 1.5rem 1.5rem',
                  marginTop: 'auto',
                  background: 'transparent',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: 'fit-content',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#2980b9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('span').style.color = '#3498db';
                }}
              >
                <span style={{ 
                  color: '#3498db', 
                  fontWeight: 500, 
                  fontSize: '0.9rem', 
                  transition: 'color 0.3s ease' 
                }}>
                  {language === 'en' ? 'Learn more →' : 'En savoir plus →'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="section-container">
          <h2 className="cta-title">Prêt à simuler votre retraite progressive ?</h2>
          <p className="cta-subtitle">
            Outil conforme à la réglementation 2025 de l'Assurance Retraite.
          </p>
          <button 
            className="final-cta-button"
            onClick={() => {
              // Track le clic sur le CTA
              trackEvent('cta_clicked', {
                cta_name: 'lancer_simulation',
                cta_location: 'homepage_final_section',
                page: 'accueil'
              });
              // Déclencher la navigation vers le calculateur
              window.dispatchEvent(new CustomEvent('navigateToPage', { detail: { page: 'calculateur' } }));
            }}
            aria-label="Lancer la simulation"
          >
            🟩 Lancer la simulation
          </button>
        </div>
      </section>


      {/* Popup Modal */}
      {openPopup && (
        <div className="popup-overlay" onClick={() => setOpenPopup(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="popup-close"
              onClick={() => setOpenPopup(null)}
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
            <h3 className="popup-title">{openPopup.title}</h3>
            <p className="popup-text">{openPopup.popupContent}</p>
          </div>
        </div>
      )}

      {/* Test d'éligibilité Popup */}
      {openEligibilityTest && (
        <div className="popup-overlay" onClick={() => setOpenEligibilityTest(false)}>
          <div className="popup-content eligibility-test-popup" onClick={(e) => e.stopPropagation()}>
            <button 
              className="popup-close"
              onClick={() => setOpenEligibilityTest(false)}
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
            <h3 className="popup-title">Test d'éligibilité</h3>
            <div className="eligibility-test-content">
              <p className="eligibility-intro">
                Pour être éligible à la retraite progressive, vous devez :
              </p>
              <ul className="eligibility-criteria-list">
                <li className="eligibility-criteria-item">
                  <CheckCircle size={20} className="criteria-icon" />
                  Avoir au moins 60 ans (ou 55 ans dans certains cas)
                </li>
                <li className="eligibility-criteria-item">
                  <CheckCircle size={20} className="criteria-icon" />
                  Avoir cotisé au moins 150 trimestres
                </li>
                <li className="eligibility-criteria-item">
                  <CheckCircle size={20} className="criteria-icon" />
                  Avoir l'accord de votre employeur pour un temps partiel
                </li>
                <li className="eligibility-criteria-item">
                  <CheckCircle size={20} className="criteria-icon" />
                  Travailler entre 40% et 80% du temps plein
                </li>
              </ul>
              <div className="eligibility-next-steps">
                <h4 className="next-steps-title">Prochaines étapes :</h4>
                <ul className="next-steps-list">
                  <li className="next-steps-item">
                    <ArrowRight size={16} className="step-icon" />
                    Contactez votre employeur
                  </li>
                  <li className="next-steps-item">
                    <ArrowRight size={16} className="step-icon" />
                    Renseignez-vous auprès de votre caisse de retraite
                  </li>
                  <li className="next-steps-item">
                    <ArrowRight size={16} className="step-icon" />
                    Utilisez notre simulateur pour calculer vos revenus
                  </li>
                </ul>
              </div>
              <div className="eligibility-test-cta">
                <button 
                  className="eligibility-test-button"
                  onClick={() => {
                    setOpenEligibilityTest(false);
                    navigate('/calculateur');
                  }}
                >
                  🟩 Lancer la simulation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resource Modal */}
      {openResourceModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={() => setOpenResourceModal(null)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenResourceModal(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#666',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              <X size={24} />
            </button>

            <div style={{ padding: '40px' }}>
              {openResourceModal === 'guide-retraite-2025' && (
                <>
                  <h2 style={{ color: '#1f2937', marginTop: 0, marginBottom: '20px', fontSize: '1.8rem' }}>
                    Guide complet 2025
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '20px', fontSize: '1rem' }}>
                    Ce guide complet vous explique tout sur la retraite progressive en 2025 : fonctionnement, conditions d'éligibilité, 
                    calcul de votre pension, décote et surcote, avantages fiscaux, démarches administratives et stratégies d'optimisation.
                  </p>
                  <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ color: '#1e40af', marginTop: 0, marginBottom: '12px', fontSize: '1.1rem' }}>Ce que vous découvrirez :</h3>
                    <ul style={{ color: '#1e3a8a', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                      <li>Comment fonctionne la retraite progressive</li>
                      <li>Les conditions d'éligibilité détaillées</li>
                      <li>Le calcul précis de votre pension</li>
                      <li>Les stratégies d'optimisation</li>
                      <li>Les démarches administratives</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setOpenResourceModal(null);
                      window.scrollTo({ top: 0, behavior: 'auto' });
                      setTimeout(() => {
                        window.location.href = '/#/guide-retraite-2025';
                      }, 50);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Lire le guide complet →
                  </button>
                </>
              )}

              {openResourceModal === 'faq-retraite' && (
                <>
                  <h2 style={{ color: '#1f2937', marginTop: 0, marginBottom: '20px', fontSize: '1.8rem' }}>
                    FAQ Retraite Progressive
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '20px', fontSize: '1rem' }}>
                    Retrouvez les réponses aux questions les plus fréquentes sur la retraite progressive, la décote, la surcote, 
                    l'éligibilité et les démarches en 2025.
                  </p>
                  <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ color: '#1e40af', marginTop: 0, marginBottom: '12px', fontSize: '1.1rem' }}>Questions abordées :</h3>
                    <ul style={{ color: '#1e3a8a', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                      <li>Qu'est-ce que la retraite progressive ?</li>
                      <li>Comment optimiser sa retraite en 2025 ?</li>
                      <li>Comment fonctionne la décote et la surcote ?</li>
                      <li>Comment demander sa retraite progressive ?</li>
                      <li>Qui peut en bénéficier ?</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setOpenResourceModal(null);
                      window.scrollTo({ top: 0, behavior: 'auto' });
                      setTimeout(() => {
                        window.location.href = '/#/faq-retraite';
                      }, 50);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Voir toutes les questions →
                  </button>
                </>
              )}

              {openResourceModal === 'decote-surcote' && (
                <>
                  <h2 style={{ color: '#1f2937', marginTop: 0, marginBottom: '20px', fontSize: '1.8rem' }}>
                    Décote et surcote
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '20px', fontSize: '1rem' }}>
                    La décote et la surcote sont deux mécanismes qui ajustent le montant de votre pension selon votre âge de départ 
                    et le nombre de trimestres validés. Comprendre ces mécanismes est essentiel pour optimiser votre départ.
                  </p>
                  <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ color: '#1e40af', marginTop: 0, marginBottom: '12px', fontSize: '1.1rem' }}>Vous apprendrez :</h3>
                    <ul style={{ color: '#1e3a8a', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                      <li>Comment calculer la décote (-0,625% par trimestre manquant)</li>
                      <li>Comment calculer la surcote (+0,75% par trimestre supplémentaire)</li>
                      <li>Tableau comparatif des impacts</li>
                      <li>Stratégies pour éviter la décote</li>
                      <li>Comment maximiser la surcote</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setOpenResourceModal(null);
                      window.scrollTo({ top: 0, behavior: 'auto' });
                      setTimeout(() => {
                        window.location.href = '/#/decote-surcote';
                      }, 50);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Lire le guide détaillé →
                  </button>
                </>
              )}

              {openResourceModal === 'calcul-retraite' && (
                <>
                  <h2 style={{ color: '#1f2937', marginTop: 0, marginBottom: '20px', fontSize: '1.8rem' }}>
                    Calcul retraite : comment optimiser sa pension ?
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '20px', fontSize: '1rem' }}>
                    Optimiser sa pension nécessite de comprendre les mécanismes de calcul et de choisir la meilleure stratégie de départ. 
                    Ce guide vous explique étape par étape comment calculer et maximiser votre pension.
                  </p>
                  <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ color: '#1e40af', marginTop: 0, marginBottom: '12px', fontSize: '1.1rem' }}>Contenu du guide :</h3>
                    <ul style={{ color: '#1e3a8a', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                      <li>Calcul du salaire annuel moyen (SAM)</li>
                      <li>Vérification des trimestres validés</li>
                      <li>Calcul du taux de pension</li>
                      <li>Impact de la décote ou surcote</li>
                      <li>4 stratégies d'optimisation</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setOpenResourceModal(null);
                      window.scrollTo({ top: 0, behavior: 'auto' });
                      setTimeout(() => {
                        window.location.href = '/#/calcul-retraite';
                      }, 50);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Voir le guide complet →
                  </button>
                </>
              )}

              {openResourceModal === 'pieges-retraite' && (
                <>
                  <h2 style={{ color: '#1f2937', marginTop: 0, marginBottom: '20px', fontSize: '1.8rem' }}>
                    Pièges à éviter pour prendre sa retraite
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '20px', fontSize: '1rem' }}>
                    Prendre sa retraite est une décision importante qui peut avoir des conséquences financières durables. 
                    Découvrez les erreurs courantes et comment les éviter pour optimiser votre départ.
                  </p>
                  <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ color: '#991b1b', marginTop: 0, marginBottom: '12px', fontSize: '1.1rem' }}>7 pièges à éviter :</h3>
                    <ul style={{ color: '#b91c1c', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                      <li>Partir trop tôt sans vérifier sa situation</li>
                      <li>Ignorer la retraite progressive</li>
                      <li>Ne pas tenir compte de la fiscalité</li>
                      <li>Mal calculer ses revenus</li>
                      <li>Ne pas vérifier son éligibilité</li>
                      <li>Oublier de négocier avec son employeur</li>
                      <li>Ne pas comparer les scénarios</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setOpenResourceModal(null);
                      window.scrollTo({ top: 0, behavior: 'auto' });
                      setTimeout(() => {
                        window.location.href = '/#/pieges-retraite';
                      }, 50);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Lire l'article complet →
                  </button>
                </>
              )}

              {openResourceModal === 'demarche-retraite-progressive' && (
                <>
                  <h2 style={{ color: '#1f2937', marginTop: 0, marginBottom: '20px', fontSize: '1.8rem' }}>
                    Démarches et formalités
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '20px', fontSize: '1rem' }}>
                    Faire une demande de retraite progressive nécessite de suivre plusieurs étapes administratives. 
                    Ce guide vous explique pas à pas comment procéder, quels documents fournir et quels sont les délais à prévoir.
                  </p>
                  <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ color: '#1e40af', marginTop: 0, marginBottom: '12px', fontSize: '1.1rem' }}>Étapes détaillées :</h3>
                    <ol style={{ color: '#1e3a8a', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                      <li>Vérifier votre éligibilité via le simulateur</li>
                      <li>Informer votre employeur et obtenir l'accord écrit</li>
                      <li>Remplir le formulaire officiel de demande</li>
                      <li>Joindre les justificatifs nécessaires</li>
                      <li>Envoyer la demande au régime de retraite</li>
                    </ol>
                  </div>
                  <button
                    onClick={() => {
                      setOpenResourceModal(null);
                      window.scrollTo({ top: 0, behavior: 'auto' });
                      setTimeout(() => {
                        window.location.href = '/#/demarche-retraite-progressive';
                      }, 50);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Voir le guide complet →
                  </button>
                </>
              )}

              {openResourceModal === 'temps-partiel-retraite-progressive' && (
                <>
                  <h2 style={{ color: '#1f2937', marginTop: 0, marginBottom: '20px', fontSize: '1.8rem' }}>
                    Retraite progressive : impact selon votre temps partiel
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '20px', fontSize: '1rem' }}>
                    Le choix du pourcentage de temps partiel (entre 40% et 80%) a un impact direct sur vos revenus, 
                    votre pension partielle et votre qualité de vie. Comparez les différents taux pour faire le meilleur choix.
                  </p>
                  <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ color: '#1e40af', marginTop: 0, marginBottom: '12px', fontSize: '1.1rem' }}>Comparatif disponible :</h3>
                    <ul style={{ color: '#1e3a8a', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                      <li>Tableau comparatif 40%, 50%, 60%, 70%, 80%</li>
                      <li>Impact sur le salaire net et pension partielle</li>
                      <li>Avantages et limites de chaque taux</li>
                      <li>Scénarios personnalisés selon votre profil</li>
                      <li>Conseils pour choisir le meilleur taux</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setOpenResourceModal(null);
                      window.scrollTo({ top: 0, behavior: 'auto' });
                      setTimeout(() => {
                        window.location.href = '/#/temps-partiel-retraite-progressive';
                      }, 50);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Comparer les taux →
                  </button>
                </>
              )}

              {openResourceModal === 'fiscalite-retraite-progressive' && (
                <>
                  <h2 style={{ color: '#1f2937', marginTop: 0, marginBottom: '20px', fontSize: '1.8rem' }}>
                    Fiscalité et impact social
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '20px', fontSize: '1rem' }}>
                    La retraite progressive a un impact important sur votre fiscalité. Comprendre ces impacts vous permet 
                    d'optimiser vos revenus nets et de faire les meilleurs choix pour votre situation.
                  </p>
                  <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ color: '#1e40af', marginTop: 0, marginBottom: '12px', fontSize: '1.1rem' }}>Sujets abordés :</h3>
                    <ul style={{ color: '#1e3a8a', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                      <li>Impôts et cotisations sociales</li>
                      <li>Impact sur les pensions complémentaires</li>
                      <li>Tableau comparatif impact fiscal</li>
                      <li>Optimisation des revenus nets</li>
                      <li>Conseils pratiques pour réduire vos impôts</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setOpenResourceModal(null);
                      window.scrollTo({ top: 0, behavior: 'auto' });
                      setTimeout(() => {
                        window.location.href = '/#/fiscalite-retraite-progressive';
                      }, 50);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    En savoir plus →
                  </button>
                </>
              )}

              {openResourceModal === 'cas-pratiques-retraite-progressive' && (
                <>
                  <h2 style={{ color: '#1f2937', marginTop: 0, marginBottom: '20px', fontSize: '1.8rem' }}>
                    Cas pratiques et exemples concrets
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '20px', fontSize: '1rem' }}>
                    Découvrez des exemples concrets de retraite progressive adaptés à différentes situations : 
                    salarié cadre, temps partiel, carrière incomplète, multi-régimes.
                  </p>
                  <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ color: '#1e40af', marginTop: 0, marginBottom: '12px', fontSize: '1.1rem' }}>Exemples détaillés :</h3>
                    <ul style={{ color: '#1e3a8a', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                      <li>Salarié cadre à 60 ans (simulation complète)</li>
                      <li>Salarié déjà à temps partiel (ajustement)</li>
                      <li>Carrière incomplète (solutions possibles)</li>
                      <li>Multi-régimes (gestion complexe)</li>
                      <li>Tableaux comparatifs avant/après</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setOpenResourceModal(null);
                      window.scrollTo({ top: 0, behavior: 'auto' });
                      setTimeout(() => {
                        window.location.href = '/#/cas-pratiques-retraite-progressive';
                      }, 50);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Voir les exemples →
                  </button>
                </>
              )}

              {openResourceModal === 'statut-retraite-progressive' && (
                <>
                  <h2 style={{ color: '#1f2937', marginTop: 0, marginBottom: '20px', fontSize: '1.8rem' }}>
                    Retraite progressive selon votre statut
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '20px', fontSize: '1rem' }}>
                    La retraite progressive s'adapte à différents statuts professionnels : fonction publique, indépendants, 
                    auto-entrepreneurs, multi-caisses, expatriés. Chaque statut a ses spécificités et ses conditions.
                  </p>
                  <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ color: '#1e40af', marginTop: 0, marginBottom: '12px', fontSize: '1.1rem' }}>Statuts couverts :</h3>
                    <ul style={{ color: '#1e3a8a', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                      <li>Fonction publique (CNRACL, RAFP)</li>
                      <li>Indépendants / auto-entrepreneurs</li>
                      <li>Multi-caisses / expatriés</li>
                      <li>Conditions spécifiques par statut</li>
                      <li>Tableau comparatif des démarches</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setOpenResourceModal(null);
                      window.scrollTo({ top: 0, behavior: 'auto' });
                      setTimeout(() => {
                        window.location.href = '/#/statut-retraite-progressive';
                      }, 50);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Voir mon statut →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default HomePage;
