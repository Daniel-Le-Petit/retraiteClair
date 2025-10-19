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
  X
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  // Navigation sticky
  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'definition', label: 'Qu\'est-ce que c\'est ?' },
    { id: 'eligibilite', label: 'Éligibilité' },
    { id: 'etapes', label: 'Étapes' },
    { id: 'faq', label: 'FAQ' }
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
          <div className="section-content">
            <p className="section-text">
              Un dispositif flexible qui vous permet de préparer votre retraite tout en maintenant une activité professionnelle.
            </p>
            <p className="section-text">
              Travailler à temps partiel (40 à 80 %), percevoir une partie de votre pension (30 à 50 %), et organiser une transition en douceur selon vos besoins.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section id="eligibilite" className="content-section eligibility-section">
        <div className="section-container">
          <h2 className="section-title">Suis-je éligible ?</h2>
          <div className="eligibility-criteria">
            <div className="criteria-item">
              <CheckCircle className="criteria-icon" />
              <div className="criteria-content">
                <h3>Âge minimum</h3>
                <p>60 ans (ou 55 ans dans certains cas particuliers)</p>
              </div>
            </div>
            <div className="criteria-item">
              <CheckCircle className="criteria-icon" />
              <div className="criteria-content">
                <h3>Trimestres cotisés</h3>
                <p>Au moins 150 validés</p>
              </div>
            </div>
            <div className="criteria-item">
              <CheckCircle className="criteria-icon" />
              <div className="criteria-content">
                <h3>Accord employeur</h3>
                <p>Temps partiel entre 40 % et 80 %</p>
              </div>
            </div>
          </div>
          <div className="eligibility-cta">
            <p>Vous remplissez les conditions ? Découvrez tout de suite vos revenus potentiels.</p>
            <button 
              className="cta-button"
              onClick={() => navigate('/calculateur')}
              aria-label="Lancer la simulation"
            >
              🟩 Lancer la simulation
            </button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="etapes" className="content-section">
        <div className="section-container">
          <h2 className="section-title">Comment commencer sa retraite progressive</h2>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Vérifiez vos conditions</h3>
                <p>d'âge et de cotisations</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Estimez vos revenus</h3>
                <p>avec le simulateur</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Négociez votre passage</h3>
                <p>à temps partiel</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Rassemblez vos documents</h3>
                <p>et faites votre demande 4 mois à l'avance</p>
              </div>
            </div>
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
    </div>
  );
};

export default HomePage;
