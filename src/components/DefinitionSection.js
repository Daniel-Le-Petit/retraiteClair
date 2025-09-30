import React from 'react';
import { Users, Euro, Shield, Clock } from 'lucide-react';

const DefinitionSection = () => {
  const cards = [
    {
      icon: Users,
      title: "Travailler à temps partiel",
      description: "Réduisez votre temps de travail (entre 40% et 80%) tout en conservant votre emploi."
    },
    {
      icon: Euro,
      title: "Toucher une partie de sa retraite",
      description: "Percevez 30% à 50% de votre pension estimée au taux plein, selon votre situation."
    },
    {
      icon: Shield,
      title: "Transition en douceur",
      description: "Préparez sereinement votre retraite complète tout en gardant un revenu stable."
    },
    {
      icon: Clock,
      title: "Flexibilité temporelle",
      description: "Choisissez quand commencer et ajustez votre rythme selon vos besoins personnels."
    }
  ];

  return (
    <section className="definition-section-modern">
      <div className="container">
        <h2 className="section-title">Qu'est-ce que la retraite progressive ?</h2>
        
        <div className="cards-grid">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="definition-card-modern">
                <div className="card-icon-modern">
                  <Icon size={32} />
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DefinitionSection;
