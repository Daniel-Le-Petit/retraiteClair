import React from 'react';
import { TrendingUp, Users, BookOpen, Shield, ArrowRight, Mail, Calculator } from 'lucide-react';
import '../about-styles.css';

const AboutPage = () => {
  const handleNavigation = (page) => {
    window.dispatchEvent(new CustomEvent('navigateToPage', { detail: { page } }));
  };

  return (
    <div className="about-page">
      {/* Header Section */}
      <div className="about-header">
        <div className="about-header-content">
          <h1 className="about-main-title">Mon parcours, ma vision</h1>
          <div className="about-intro">
            <p className="about-intro-text">
              Après plus de 30 ans dans le transport aérien, j'ai commencé à préparer ma retraite progressive.
              Et j'ai découvert un parcours semé de zones grises, de réponses floues et de procédures lourdes.
              Entre les démarches administratives complexes, les informations contradictoires et le manque de clarté sur mes droits,
              j'ai réalisé que beaucoup de salariés se trouvaient dans la même situation que moi.
              J'ai voulu créer RetraiteClair pour aider ceux qui, comme moi, veulent comprendre simplement leurs droits et prendre les bonnes décisions.
            </p>
          </div>
        </div>
      </div>

      {/* Mon évolution Section */}
      <div className="about-evolution">
        <div className="about-container">
          <h2 className="about-section-title">Mon évolution</h2>
          <div className="evolution-timeline">
            <div className="timeline-item">
              <div className="timeline-icon">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                  alt="Développeur"
                  className="role-image"
                />
              </div>
              <div className="timeline-content">
                <h3>Développeur</h3>
                <p>Début de carrière dans le transport aérien (1990-1998)</p>
                <p className="timeline-detail">Développement d'applications métier, compréhension des processus complexes</p>
              </div>
            </div>
            
            <div className="timeline-connector"></div>
            
            <div className="timeline-item">
              <div className="timeline-icon">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                  alt="Business Analyst"
                  className="role-image"
                />
              </div>
              <div className="timeline-content">
                <h3>Business Analyst</h3>
                <p>Transformation digitale (1998-2015)</p>
                <p className="timeline-detail">Analyse des besoins métier, pilotage de projets, simplification des processus</p>
              </div>
            </div>
            
            <div className="timeline-connector"></div>
            
            <div className="timeline-item">
              <div className="timeline-icon">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                  alt="Product Owner / Business Advisor"
                  className="role-image"
                />
              </div>
              <div className="timeline-content">
                <h3>Product Owner / Business Advisor</h3>
                <p>Pilotage de solutions métier à grande échelle (2015-2023)</p>
                <p className="timeline-detail">Conseil stratégique, accompagnement des équipes, expertise métier approfondie</p>
              </div>
            </div>
            
            <div className="timeline-connector"></div>
            
            <div className="timeline-item">
              <div className="timeline-icon">
                <div className="founder-photo">
                  <img 
                    src="/daniel-photo.jpg" 
                    alt="Daniel, fondateur de RetraiteClair"
                    className="founder-image"
                  />
                </div>
              </div>
              <div className="timeline-content">
                <h3>Daniel, fondateur de RetraiteClair</h3>
                <p>Fondateur de RetraiteClair</p>
                <p>Depuis 2023</p>
                <p className="timeline-detail">Création d'un outil simple et accessible pour comprendre la retraite progressive</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pourquoi RetraiteClair Section */}
      <div className="about-why">
        <div className="about-container">
          <h2 className="about-section-title">Pourquoi RetraiteClair</h2>
          <div className="why-content">
            <p className="why-text">
              RetraiteClair n'est pas une plateforme institutionnelle.
              C'est un espace indépendant, né de l'expérience d'un salarié en transition, qui veut partager des outils simples et une lecture claire des réformes.
            </p>
            <p className="why-text">
              Face à la complexité des démarches administratives, aux informations contradictoires et au manque de transparence,
              j'ai créé RetraiteClair pour offrir une alternative claire et accessible.
            </p>
            <p className="why-text">
              L'objectif : que chacun puisse anticiper, décider et avancer sereinement dans sa préparation à la retraite progressive.
            </p>
          </div>
        </div>
      </div>

      {/* Ce que j'apporte Section */}
      <div className="about-values">
        <div className="about-container">
          <h2 className="about-section-title">Ce que j'apporte</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <TrendingUp size={32} />
              </div>
              <div className="value-content">
                <h3>Clarté</h3>
                <p>Expliquer sans jargon</p>
              </div>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <Shield size={32} />
              </div>
              <div className="value-content">
                <h3>Indépendance</h3>
                <p>Pas de lien avec des organismes financiers</p>
              </div>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <BookOpen size={32} />
              </div>
              <div className="value-content">
                <h3>Pédagogie</h3>
                <p>Des outils et conseils pratiques, basés sur l'expérience réelle</p>
              </div>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <Users size={32} />
              </div>
              <div className="value-content">
                <h3>Accessibilité</h3>
                <p>Un langage simple, pour tous les profils</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="about-cta">
        <div className="about-container">
          <div className="cta-content">
            <h2 className="cta-title">Vous préparez votre retraite progressive ?</h2>
            <p className="cta-subtitle">Testez le simulateur ou contactez-moi pour un conseil personnalisé.</p>
            
            <div className="cta-buttons">
              <button 
                className="cta-button cta-primary"
                onClick={() => handleNavigation('calculateur')}
              >
                <Calculator size={20} />
                Lancer le simulateur
                <ArrowRight size={16} />
              </button>
              
              <button 
                className="cta-button cta-secondary"
                onClick={() => handleNavigation('contact')}
              >
                <Mail size={20} />
                Échanger sur votre situation
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
