import React, { useState } from 'react';
import { 
  CheckCircle, 
  Users, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Target,
  Calculator,
  HelpCircle,
  FileText,
  Zap
} from 'lucide-react';
import DefinitionSection from './DefinitionSection';
import HeroSection from './HeroSection';
import EligibilitySection from './EligibilitySection';
import FinancialImpactSection from './FinancialImpactSection';

const PageAccueil = () => {
  const [showFaq, setShowFaq] = useState(null);
  const [quickCalc, setQuickCalc] = useState({
    salaire: 0,
    tempsPartiel: 60,
    pensionEstimee: 0,
    tauxCotisations: 22,
    pensionManuelle: false // Flag pour savoir si l'utilisateur a modifié manuellement la pension
  });


  // Calcul automatique de la pension estimée (environ 60% du salaire net)
  const pensionEstimeeCalculee = quickCalc.salaire > 0 ? 
    (quickCalc.salaire * (1 - quickCalc.tauxCotisations / 100)) * 0.6 : 0;

  // Utiliser la pension manuelle si l'utilisateur l'a modifiée, sinon la pension calculée
  const pensionUtilisee = quickCalc.pensionManuelle ? quickCalc.pensionEstimee : pensionEstimeeCalculee;

  const calculRapide = {
    // Salaire partiel = (Salaire brut - cotisations) × temps partiel
    salairePartiel: (quickCalc.salaire * (1 - quickCalc.tauxCotisations / 100) * quickCalc.tempsPartiel) / 100,
    // Pension progressive basée sur la pension saisie ou calculée
    pensionProgressive: pensionUtilisee * (1 - quickCalc.tempsPartiel / 100),
    revenuTotal: ((quickCalc.salaire * (1 - quickCalc.tauxCotisations / 100) * quickCalc.tempsPartiel) / 100) + (pensionUtilisee * (1 - quickCalc.tempsPartiel / 100))
  };

  const faqItems = [
    {
      question: "Qu'est-ce que la retraite progressive ?",
      answer: "La retraite progressive vous permet de travailler à temps partiel (40% à 80%) tout en percevant une partie de votre retraite (30% à 50%). C'est une transition en douceur vers la retraite complète."
    },
    {
      question: "Qui peut bénéficier de la retraite progressive ?",
      answer: "Vous devez avoir au moins 60 ans (ou 55 ans dans certains cas), avoir cotisé au moins 150 trimestres, et avoir l'accord de votre employeur pour un temps partiel."
    },
    {
      question: "Comment calculer mes revenus ?",
      answer: "Vos revenus = (Salaire brut - cotisations) × temps partiel + Pension progressive. Utilisez notre calculateur pour une estimation précise."
    },
    {
      question: "Puis-je changer de pourcentage de temps partiel ?",
      answer: "Oui, vous pouvez ajuster votre temps partiel entre 40% et 80% selon vos besoins et l'accord de votre employeur."
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section Moderne */}
      <HeroSection />

      {/* Section Definition Moderne */}
      <DefinitionSection />

      {/* Section Eligibility Moderne */}
      <EligibilitySection />

      {/* Calculateur Rapide */}
      <div className="calculator-section">
        <h2>Combien vais-je toucher ?</h2>
        <div className="calculator-content">
          <div className="calculator-container">
            <h3 className="calculator-title">
              <Zap size={24} />
              Calculateur rapide
            </h3>
            
            {/* Ligne 1: 3 champs d'entrée */}
            <div className="input-row">
              <div className="input-group">
                <label>Salaire actuel (€/mois)</label>
                <input
                  type="number"
                  value={quickCalc.salaire}
                  onChange={(e) => {
                    const newSalaire = Number(e.target.value);
                    const newPensionCalculee = newSalaire > 0 ? (newSalaire * (1 - quickCalc.tauxCotisations / 100)) * 0.6 : 0;
                    
                    setQuickCalc({
                      ...quickCalc, 
                      salaire: newSalaire,
                      // Recalcul automatique de la pension seulement si pas de modification manuelle
                      pensionEstimee: quickCalc.pensionManuelle ? quickCalc.pensionEstimee : newPensionCalculee
                    });
                  }}
                  placeholder="Ex: 6696"
                />
              </div>
              <div className="input-group">
                <label>Pension estimée au taux plein (€/mois)</label>
                <input
                  type="number"
                  value={quickCalc.pensionManuelle ? quickCalc.pensionEstimee : pensionEstimeeCalculee}
                  onChange={(e) => {
                    const newPension = Number(e.target.value);
                    setQuickCalc({
                      ...quickCalc, 
                      pensionEstimee: newPension,
                      pensionManuelle: true // Marquer comme modifiée manuellement
                    });
                  }}
                  placeholder={`Ex: ${pensionEstimeeCalculee.toFixed(0)}`}
                />
                {!quickCalc.pensionManuelle && quickCalc.salaire > 0 && (
                  <small style={{color: '#10b981', fontSize: '12px'}}>
                    Calculée automatiquement
                  </small>
                )}
                {quickCalc.pensionManuelle && (
                  <small style={{color: '#6b7280', fontSize: '12px'}}>
                    Modifiée manuellement
                  </small>
                )}
              </div>
              <div className="input-group">
                <label>Cotisations sociales (%)</label>
                <input
                  type="number"
                  value={quickCalc.tauxCotisations}
                  onChange={(e) => setQuickCalc({...quickCalc, tauxCotisations: Number(e.target.value)})}
                  placeholder="Ex: 22"
                  min="0"
                  max="50"
                />
              </div>
            </div>
            
            {/* Ligne 2: Barre de progression */}
            <div className="progress-row">
              <label>Temps partiel (%)</label>
              <div className="progress-container">
                <input
                  type="range"
                  min="40"
                  max="80"
                  value={quickCalc.tempsPartiel}
                  onChange={(e) => setQuickCalc({...quickCalc, tempsPartiel: Number(e.target.value)})}
                  className="progress-bar"
                />
                <div className="progress-value">{quickCalc.tempsPartiel}%</div>
              </div>
            </div>
            
            {/* Ligne 3: 3 champs de résultats */}
            <div className="result-row">
              <div className="result-group">
                <label>Salaire à temps partiel</label>
                <div className="result-value">{calculRapide.salairePartiel.toFixed(0)} €</div>
              </div>
              <div className="result-group">
                <label>Pension progressive</label>
                <div className="result-value">{calculRapide.pensionProgressive.toFixed(0)} €</div>
              </div>
              <div className="result-group">
                <label>Revenu total mensuel</label>
                <div className="result-total-value">{calculRapide.revenuTotal.toFixed(0)} €</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Section Impact Financier Moderne */}
      <FinancialImpactSection 
        quickCalc={quickCalc}
        calculRapide={calculRapide}
        pensionUtilisee={pensionUtilisee}
      />

      {/* Étapes pour commencer */}
      <div className="steps-section">
        <h2>Comment commencer ?</h2>
        <div className="steps-grid">
          <div className="step-item">
            <div className="step-number">1</div>
            <h3>Vérifiez votre éligibilité</h3>
            <p>Testez si vous remplissez les conditions d'âge et de cotisations</p>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <h3>Calculez vos revenus</h3>
            <p>
              Utilisez notre calculateur pour estimer vos revenus de retraite progressive. 
              Pour obtenir des informations précises et personnalisées, nous vous recommandons de consulter le{' '}
              <a 
                href="https://www.lassuranceretraite.fr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="official-link"
              >
                simulateur officiel
              </a>{' '}
              disponible sur lassuranceretraite.fr
            </p>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <h3>Contactez votre employeur</h3>
            <p>Discutez de la possibilité d'un temps partiel avec votre employeur</p>
          </div>
          <div className="step-item">
            <div className="step-number">4</div>
            <h3>Renseignez-vous</h3>
            <p>Contactez votre caisse de retraite pour les démarches administratives</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <h2>Questions fréquentes</h2>
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