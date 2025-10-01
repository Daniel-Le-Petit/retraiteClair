import React, { useState } from 'react';
import { Users, Euro, Shield, Clock, X } from 'lucide-react';

const DefinitionSection = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      icon: Users,
      title: "Travailler à temps partiel",
      description: "Réduisez votre temps de travail (entre 40% et 80%) tout en conservant votre emploi.",
      detailedContent: {
        intro: "Vous pouvez réduire votre temps de travail entre 40 % et 80 % d'un temps complet (par exemple : entre 2 et 4 jours par semaine sur une base de 5 jours).",
        rules: [
          "Le passage à temps partiel se fait par avenant au contrat de travail, signé avec l'employeur.",
          "L'accord de l'employeur est obligatoire, sauf pour certains fonctionnaires et professions libérales qui relèvent d'autres règles.",
          "La durée du travail doit être clairement définie dans le contrat (nombre d'heures par semaine ou par mois)."
        ],
        example: {
          title: "Exemple concret :",
          text: "Temps plein = 35h → vous pouvez travailler entre 14h (40 %) et 28h (80 %) par semaine."
        },
        advantages: "Garder un rythme professionnel, libérer du temps pour préparer sa retraite.",
        warning: "Si vous descendez en dessous de 40 % ou au-dessus de 80 %, vous perdez le droit à la retraite progressive."
      }
    },
    {
      icon: Euro,
      title: "Toucher une partie de sa retraite",
      description: "Percevez 30% à 50% de votre pension estimée au taux plein, selon votre situation.",
      detailedContent: {
        intro: "La retraite progressive vous verse une fraction de votre pension vieillesse, calculée en fonction de la réduction de votre temps de travail.",
        rules: [
          "Si vous travaillez à 60 %, la retraite progressive complète vos revenus avec 40 % de votre pension de retraite.",
          "Si vous travaillez à 80 %, vous touchez environ 20 % de votre pension.",
          "La fraction est versée chaque mois, comme une pension classique.",
          "Cette pension est provisoire : elle sera recalculée au moment du départ définitif, pour tenir compte des nouveaux droits acquis."
        ],
        advantages: "Maintenir un revenu plus proche du salaire plein temps.",
        warning: "Le calcul est basé sur vos droits au moment de la demande, donc une partie de la pension peut être faible si votre carrière est incomplète."
      }
    },
    {
      icon: Shield,
      title: "Transition en douceur",
      description: "Préparez sereinement votre retraite complète tout en gardant un revenu stable.",
      detailedContent: {
        intro: "Même si vous touchez déjà une pension, vos cotisations retraite sur votre temps partiel continuent d'alimenter vos droits.",
        rules: [
          "Vous validez encore des trimestres.",
          "Vous gagnez des points supplémentaires (régimes complémentaires).",
          "Au moment du passage à la retraite définitive, votre pension est augmentée pour intégrer ces droits."
        ],
        example: {
          title: "Exemple :",
          text: "Vous travaillez 3 ans en retraite progressive à 60 %. Pendant ces 3 ans, vous cotisez et engrangez des points qui augmentent votre retraite définitive de +80 € par mois à vie (chiffre indicatif)."
        },
        advantages: "Optimiser sa pension finale.",
        warning: "Si vous restez longtemps en retraite progressive, la pension partielle touchée n'évolue pas, seule la définitive est recalculée."
      }
    },
    {
      icon: Clock,
      title: "Flexibilité temporelle",
      description: "Choisissez quand commencer et ajustez votre rythme selon vos besoins personnels.",
      detailedContent: {
        intro: "Vous restez libre de décider quand arrêter la retraite progressive pour demander votre retraite définitive.",
        rules: [
          "Dès que vous atteignez l'âge du taux plein (67 ans ou avant si vous avez la durée d'assurance requise).",
          "Ou plus tôt, si vous choisissez d'anticiper, avec les règles de minoration applicables.",
          "Au moment de la liquidation définitive, la pension est recalculée intégralement pour inclure les trimestres et points supplémentaires accumulés."
        ],
        example: {
          title: "Exemple :",
          text: "Vous commencez une retraite progressive à 60 ans. Vous partez en retraite définitive à 63 ans. Résultat : vous avez cumulé 3 années supplémentaires de droits, ce qui augmente votre pension définitive par rapport à un départ direct à 60 ans."
        },
        advantages: "Maîtrise de votre rythme de sortie du marché du travail.",
        warning: "Plus vous attendez, plus la pension définitive est élevée, mais vous restez dépendant de la règle d'âge légal et du taux plein."
      }
    }
  ];

  const openModal = (index) => {
    setSelectedCard(index);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <>
      <section className="definition-section-modern">
        <div className="container">
          <h2 className="section-title">Qu'est-ce que la retraite progressive ?</h2>
          
          <div className="cards-grid">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div 
                  key={index} 
                  className="definition-card-modern clickable"
                  onClick={() => openModal(index)}
                >
                  <div className="card-icon-modern">
                    <Icon size={32} />
                  </div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                  <div className="card-more">En savoir plus →</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedCard !== null && (
        <div className="definition-modal-overlay" onClick={closeModal}>
          <div className="definition-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={24} />
            </button>
            
            <div className="modal-header">
              {React.createElement(cards[selectedCard].icon, { size: 40 })}
              <h2>{cards[selectedCard].title}</h2>
            </div>

            <div className="modal-body">
              <p className="modal-intro">{cards[selectedCard].detailedContent.intro}</p>

              {cards[selectedCard].detailedContent.rules && (
                <ul className="modal-rules">
                  {cards[selectedCard].detailedContent.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              )}

              {cards[selectedCard].detailedContent.example && (
                <div className="modal-example">
                  <h4>{cards[selectedCard].detailedContent.example.title}</h4>
                  <p>{cards[selectedCard].detailedContent.example.text}</p>
                </div>
              )}

              <div className="modal-footer">
                <div className="modal-advantages">
                  <strong>✅ Avantages :</strong> {cards[selectedCard].detailedContent.advantages}
                </div>
                <div className="modal-warning">
                  <strong>⚠️ Point de vigilance :</strong> {cards[selectedCard].detailedContent.warning}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DefinitionSection;

