import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  Zap, 
  Settings, 
  CheckCircle, 
  Clock, 
  FileText, 
  ArrowRight,
  Menu,
  X,
  Briefcase,
  Euro,
  Calendar,
  Users,
  Mail,
  Linkedin,
  Facebook,
  Shield,
  Lock,
  MapPin
} from 'lucide-react';
import PageHeader from './PageHeader';

const HomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [openFaq, setOpenFaq] = useState(null);
  const [openPopup, setOpenPopup] = useState(null);
  const [openEligibilityTest, setOpenEligibilityTest] = useState(false);

  // Navigation sticky
  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'definition', label: 'Qu\'est-ce que c\'est ?' },
    { id: 'eligibilite', label: 'Éligibilité' },
    { id: 'etapes', label: 'Étapes' },
    { id: 'faq', label: 'FAQ' }
  ];

  // Definition data with popups
  const definitionData = [
    {
      icon: Briefcase,
      title: "Travailler à temps partiel",
      description: "Réduisez votre temps de travail (entre 40% et 80%) tout en conservant votre emploi.",
      popupContent: "La retraite progressive vous permet de réduire votre temps de travail tout en gardant votre emploi. Vous pouvez choisir de travailler entre 40% et 80% de votre temps plein, ce qui vous laisse plus de temps libre tout en conservant une partie de vos revenus."
    },
    {
      icon: Euro,
      title: "Toucher une partie de sa retraite",
      description: "Percevez 30% à 50% de votre pension estimée au taux plein, selon votre situation.",
      popupContent: "En plus de votre salaire partiel, vous percevez une partie de votre pension de retraite. Le montant dépend de votre situation : entre 30% et 50% de votre pension au taux plein. Cette pension partielle est calculée selon vos trimestres validés."
    },
    {
      icon: Calendar,
      title: "Transition en douceur",
      description: "Préparez sereinement votre retraite complète tout en gardant un revenu stable.",
      popupContent: "La retraite progressive est une transition douce vers la retraite complète. Elle vous permet de vous habituer progressivement à un nouveau rythme de vie tout en conservant des revenus stables et en préparant votre avenir."
    },
    {
      icon: Users,
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

  // FAQ data
  const faqData = [
    {
      question: "Qu'est-ce que la retraite progressive ?",
      answer: "La retraite progressive est un dispositif qui vous permet de travailler à temps partiel tout en percevant une partie de votre pension de retraite. C'est une transition en douceur vers la retraite complète."
    },
    {
      question: "Suis-je éligible ?",
      answer: "Vous devez avoir au moins 60 ans (ou 55 ans dans certains cas), justifier d'au moins 150 trimestres validés, et obtenir l'accord de votre employeur pour un temps partiel entre 40% et 80%."
    },
    {
      question: "Combien vais-je toucher ?",
      answer: "Vos revenus dépendent de votre salaire partiel, de votre pension calculée selon vos trimestres validés, et du pourcentage d'activité choisi. Utilisez notre simulateur pour une estimation précise."
    },
    {
      question: "Puis-je ajuster mon temps partiel ?",
      answer: "Oui, vous pouvez modifier votre temps partiel, mais cela nécessite un nouvel accord avec votre employeur et une nouvelle demande à l'Assurance Retraite."
    },
    {
      question: "Comment faire ma demande ?",
      answer: "Vous devez faire votre demande 4 mois avant la date souhaitée. Rassemblez vos documents (relevé de carrière, accord employeur) et contactez l'Assurance Retraite."
    },
    {
      question: "La retraite progressive impacte-t-elle ma pension finale ?",
      answer: "Non, la retraite progressive n'affecte pas le montant de votre pension à taux plein. Elle vous permet simplement de la percevoir partiellement pendant votre activité."
    }
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

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
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage">
      {/* Navigation Sticky */}
      <nav className="sticky-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <Calculator className="nav-icon" />
            <span>RetraiteClair</span>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
            {navItems.map(item => (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'nav-item-active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button 
              className="nav-cta"
              onClick={() => navigate('/calculateur')}
              aria-label="Lancer la simulation"
            >
              🟩 Simulateur
            </button>
          </div>

          <button 
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Page Header */}
      <PageHeader 
        title="RetraiteClair"
        subtitle="Simplifiez votre départ à la retraite avec notre simulateur de retraite progressive"
      />

      {/* Hero Section */}
      <section id="accueil" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Simulez votre <span className="hero-highlight">retraite progressive</span>
            </h1>
            <p className="hero-subtitle">
              Estimez vos revenus entre emploi à temps partiel et pension, gratuitement et sans inscription.
            </p>
            <button 
              className="hero-cta"
              onClick={() => navigate('/calculateur')}
              aria-label="Lancer la simulation"
            >
              🟩 Lancer la simulation
            </button>
          </div>
        </div>
      </section>

      {/* Simulation Cards */}
      <section className="simulation-cards">
        <div className="cards-container">
          <div className="simulation-card">
            <div className="card-icon">
              <Zap className="card-icon-svg" />
            </div>
            <h3 className="card-title">Simulation Simplifiée</h3>
            <p className="card-description">
              Résultat rapide en 2 minutes avec quelques données de base (âge, salaire, taux d'activité).
            </p>
            <button 
              className="card-button card-button-primary"
              onClick={() => navigate('/calculateur')}
              aria-label="Essayer la version simplifiée"
            >
              Essayer la version simplifiée
            </button>
          </div>

          <div className="simulation-card">
            <div className="card-icon">
              <Settings className="card-icon-svg" />
            </div>
            <h3 className="card-title">Simulation Avancée</h3>
            <p className="card-description">
              Analyse complète incluant cotisations, trimestres validés, et différents scénarios de revenus.
            </p>
            <button 
              className="card-button card-button-secondary"
              onClick={() => navigate('/calculateur')}
              aria-label="Explorer la version avancée"
            >
              Explorer la version avancée
            </button>
          </div>
        </div>
      </section>

      {/* Definition Section */}
      <section id="definition" className="content-section">
        <div className="section-container">
          <h2 className="section-title">Qu'est-ce que la retraite progressive ?</h2>
          <div className="definition-grid">
            {definitionData.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="definition-card">
                  <div className="definition-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="definition-title">{item.title}</h3>
                  <p className="definition-description">{item.description}</p>
                  <button 
                    className="definition-link"
                    onClick={() => setOpenPopup(item)}
                  >
                    En savoir plus →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section id="eligibilite" className="content-section eligibility-section">
        <div className="section-container">
          <h2 className="section-title">Suis-je éligible ?</h2>
          <div className="eligibility-grid">
            {eligibilityData.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="eligibility-card">
                  <div className="eligibility-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="eligibility-title">{item.title}</h3>
                  <p className="eligibility-description">{item.description}</p>
                  <button 
                    className="eligibility-link"
                    onClick={() => setOpenPopup(item)}
                  >
                    En savoir plus →
                  </button>
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
                <button 
                  className="step-link"
                  onClick={() => setOpenPopup(step)}
                >
                  En savoir plus →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="content-section faq-section">
        <div className="section-container">
          <h2 className="section-title">Questions fréquentes</h2>
          <div className="faq-container">
            {faqData.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
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
            onClick={() => navigate('/calculateur')}
            aria-label="Lancer la simulation"
          >
            🟩 Lancer la simulation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Bloc 1 — Logo et baseline */}
            <div className="footer-section footer-brand">
              <div className="footer-logo">
                <h3>RetraiteClair</h3>
                <p className="footer-baseline">Simplifiez votre départ à la retraite</p>
              </div>
              <p className="footer-description">
                RetraiteClair vous aide à comprendre vos droits, simuler votre retraite progressive et optimiser vos choix grâce à des outils clairs et accessibles.
              </p>
            </div>

            {/* Bloc 2 — Navigation */}
            <div className="footer-section footer-nav">
              <h4 className="footer-title">Navigation</h4>
              <ul className="footer-links">
                <li><a href="#accueil">Accueil</a></li>
                <li><a href="#definition">Qu'est-ce que c'est ?</a></li>
                <li><a href="#eligibilite">Éligibilité</a></li>
                <li><a href="#etapes">Étapes</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="/calculateur">Simulateur</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>

            {/* Bloc 3 — Informations légales */}
            <div className="footer-section footer-legal">
              <h4 className="footer-title">Informations légales</h4>
              <ul className="footer-links">
                <li><a href="/mentions-legales">Mentions légales</a></li>
                <li><a href="/politique-confidentialite">Politique de confidentialité</a></li>
                <li><a href="/conditions-utilisation">Conditions d'utilisation</a></li>
                <li><button className="footer-cookie-btn">Gestion des cookies</button></li>
              </ul>
            </div>

            {/* Bloc 4 — Contact & réseaux */}
            <div className="footer-section footer-contact">
              <h4 className="footer-title">Contact</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={16} />
                  <a href="mailto:contact@retraiteclair.fr">contact@retraiteclair.fr</a>
                </div>
                <p className="contact-response">Une question ? Notre équipe vous répond sous 24 h.</p>
              </div>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="social-link" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Bloc 5 — Crédit et droits */}
          <div className="footer-bottom">
            <div className="footer-credits">
              <p>© 2025 RetraiteClair – Tous droits réservés</p>
              <p className="footer-creator">Site conçu par l'équipe RetraiteClair avec l'aide de l'IA.</p>
            </div>
            
            {/* Bloc 6 — Rassurance */}
            <div className="footer-reassurance">
              <div className="reassurance-item">
                <Shield size={16} />
                <span>Données 100% confidentielles</span>
              </div>
              <div className="reassurance-item">
                <Lock size={16} />
                <span>Aucune information transmise sans accord</span>
              </div>
              <div className="reassurance-item">
                <MapPin size={16} />
                <span>Service conçu en France</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

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
    </div>
  );
};

export default HomePage;
