import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Info, Lightbulb } from 'lucide-react';

const ConseilsPage = () => {
  const [activeCategory, setActiveCategory] = useState('eligibilite');

  const conseils = {
    eligibilite: {
      title: 'Éligibilité',
      icon: CheckCircle,
      items: [
        {
          title: 'Vérifiez votre âge',
          content: 'Vous devez avoir au moins 60 ans (ou 55 ans dans certains cas particuliers)',
          type: 'info'
        },
        {
          title: 'Contrôlez vos trimestres',
          content: 'Assurez-vous d\'avoir cotisé au moins 150 trimestres pour être éligible',
          type: 'warning'
        },
        {
          title: 'Temps partiel requis',
          content: 'Le temps partiel doit être compris entre 40% et 80% du temps plein',
          type: 'info'
        }
      ]
    },
    demarches: {
      title: 'Démarches',
      icon: AlertCircle,
      items: [
        {
          title: 'Contactez votre employeur',
          content: 'Discutez de la possibilité d\'un temps partiel. L\'accord de l\'employeur est obligatoire.',
          type: 'warning'
        },
        {
          title: 'Renseignez-vous auprès de votre caisse',
          content: 'Contactez votre caisse de retraite pour connaître les modalités précises',
          type: 'info'
        },
        {
          title: 'Déposez votre demande',
          content: 'Formalisez votre demande de retraite progressive selon les délais requis',
          type: 'info'
        }
      ]
    },
    optimisation: {
      title: 'Optimisation',
      icon: Lightbulb,
      items: [
        {
          title: 'Calculez le bon équilibre',
          content: 'Trouvez le pourcentage de temps partiel qui optimise vos revenus',
          type: 'tip'
        },
        {
          title: 'Anticipez la fiscalité',
          content: 'Renseignez-vous sur l\'impact fiscal de la retraite progressive',
          type: 'info'
        },
        {
          title: 'Planifiez la transition',
          content: 'Préparez votre passage à la retraite complète',
          type: 'tip'
        }
      ]
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertCircle size={16} className="text-orange-500" />;
      case 'tip':
        return <Lightbulb size={16} className="text-yellow-500" />;
      default:
        return <Info size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Conseils</h1>
        <p>Guide pratique pour votre retraite progressive</p>
      </div>

      <div className="conseils-container">
        <div className="conseils-nav">
          {Object.entries(conseils).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <button
                key={key}
                className={`nav-category ${activeCategory === key ? 'active' : ''}`}
                onClick={() => setActiveCategory(key)}
              >
                <Icon size={20} />
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>

        <div className="conseils-content">
          <h2>{conseils[activeCategory].title}</h2>
          <div className="conseils-list">
            {conseils[activeCategory].items.map((conseil, index) => (
              <div key={index} className="conseil-item">
                <div className="conseil-header">
                  {getIcon(conseil.type)}
                  <h3>{conseil.title}</h3>
                </div>
                <p>{conseil.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="quick-tips">
        <h2>Conseils rapides</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">💡</div>
            <h3>Commencez tôt</h3>
            <p>Plus vous anticipez, plus vous avez de chances d'obtenir l'accord de votre employeur</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">📊</div>
            <h3>Simulez plusieurs scénarios</h3>
            <p>Testez différents pourcentages de temps partiel pour optimiser vos revenus</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">📋</div>
            <h3>Préparez vos documents</h3>
            <p>Rassemblez tous les justificatifs nécessaires avant de faire votre demande</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConseilsPage;
