import React from 'react';
import { Helmet } from 'react-helmet-async';
import '../legal-styles.css';

const FAQRetraitePage = () => {
  const faqs = [
    {
      question: "Qu'est-ce que la retraite progressive ?",
      answer: "La retraite progressive est un dispositif qui permet de travailler à temps partiel (entre 40% et 80%) tout en percevant une partie de votre pension de retraite (entre 30% et 50%). C'est une transition en douceur vers la retraite définitive qui vous permet de continuer à cotiser tout en réduisant progressivement votre activité."
    },
    {
      question: "Comment optimiser sa retraite en 2025 ?",
      answer: "Pour optimiser votre retraite en 2025, vous devez : 1) Vérifier votre nombre de trimestres validés, 2) Calculer l'impact de la décote ou de la surcote, 3) Comparer différents scénarios (temps partiel, âge de départ), 4) Envisager la retraite progressive pour continuer à cotiser, 5) Utiliser notre simulateur gratuit pour estimer vos revenus précisément."
    },
    {
      question: "Quelles sont les erreurs les plus courantes lors de la prise de retraite ?",
      answer: "Les erreurs les plus courantes sont : 1) Partir trop tôt sans vérifier sa situation (décote importante), 2) Ignorer la retraite progressive, 3) Ne pas tenir compte de la fiscalité, 4) Mal calculer ses revenus, 5) Ne pas vérifier son éligibilité, 6) Oublier de négocier avec son employeur, 7) Ne pas comparer les scénarios. Utilisez notre simulateur pour éviter ces erreurs."
    },
    {
      question: "Comment fonctionne la décote ?",
      answer: "La décote est une réduction du montant de votre pension si vous partez avant d'avoir tous les trimestres requis ou avant l'âge du taux plein (67 ans). Elle est calculée de deux façons : 1) -0,625% par trimestre manquant avant 67 ans, 2) -1,25% par trimestre manquant par rapport au nombre requis. C'est la moins pénalisante qui s'applique, avec un maximum de -25%."
    },
    {
      question: "Comment fonctionne la surcote ?",
      answer: "La surcote est une augmentation du montant de votre pension si vous continuez à travailler après avoir atteint le taux plein (tous les trimestres requis ET 67 ans). Elle est de +0,75% par trimestre supplémentaire travaillé, avec un maximum de +12% (16 trimestres). C'est un excellent moyen d'augmenter votre pension à vie."
    },
    {
      question: "Comment demander sa retraite progressive ?",
      answer: "Pour demander la retraite progressive : 1) Vérifiez votre éligibilité avec notre simulateur, 2) Négociez un temps partiel avec votre employeur (40% à 80%), 3) Contactez votre caisse de retraite (CARSAT, MSA, etc.) pour faire la demande, 4) Fournissez les documents requis (fiche de paie, contrat modifié, etc.), 5) Attendez la décision (2 à 3 mois généralement)."
    },
    {
      question: "Qui peut bénéficier de la retraite progressive ?",
      answer: "Pour être éligible à la retraite progressive, vous devez : 1) Avoir atteint l'âge légal de départ (62 ans) ou l'âge du taux plein (67 ans), 2) Avoir validé suffisamment de trimestres pour avoir droit à une pension, 3) Être salarié, fonctionnaire ou travailleur indépendant, 4) Travailler à temps partiel entre 40% et 80%, 5) Continuer à cotiser à votre régime de retraite."
    },
    {
      question: "Comment calculer sa pension de retraite ?",
      answer: "Le calcul de votre pension repose sur : 1) Le salaire annuel moyen (SAM) = moyenne de vos 25 meilleures années, 2) Le taux de pension = 50% au taux plein, ajusté par décote/surcote, 3) La formule : Pension mensuelle = (SAM × Taux) / 12. Utilisez notre simulateur pour un calcul précis selon votre situation."
    },
    {
      question: "Quels sont les avantages de la retraite progressive ?",
      answer: "Les avantages de la retraite progressive sont nombreux : 1) Revenus optimisés (salaire partiel + pension partielle), 2) Réduction d'impôts (tranche d'imposition plus basse), 3) Cotisations continues (validation de trimestres), 4) Transition en douceur, 5) Plus de temps libre, 6) Test de la retraite avant la retraite définitive."
    },
    {
      question: "Quel est l'impact fiscal de la retraite progressive ?",
      answer: "La retraite progressive réduit vos revenus, ce qui peut vous faire passer dans une tranche d'imposition plus basse. Les économies d'impôts s'ajoutent à vos revenus nets, améliorant votre pouvoir d'achat réel. Notre simulateur calcule automatiquement cet impact fiscal pour vous montrer les économies réalisées."
    },
    {
      question: "Combien de trimestres faut-il pour partir à la retraite ?",
      answer: "Le nombre de trimestres requis dépend de votre année de naissance. Pour les personnes nées en 1961 et après, il faut 172 trimestres (43 ans) pour le taux plein. Pour les personnes nées avant 1961, le nombre est progressif. Consultez votre relevé de carrière ou le site de l'Assurance retraite pour connaître votre nombre requis."
    },
    {
      question: "Peut-on cumuler retraite progressive et autres revenus ?",
      answer: "Oui, vous pouvez cumuler votre retraite progressive avec d'autres revenus complémentaires (location, placements, etc.). Ces revenus s'ajoutent à votre salaire partiel et à votre pension partielle pour former votre revenu total. Attention aux plafonds de revenus qui peuvent impacter certaines prestations sociales."
    },
    {
      question: "Quelle est la différence entre retraite progressive et retraite anticipée ?",
      answer: "La retraite progressive permet de travailler à temps partiel tout en touchant une pension partielle, avec continuation des cotisations. La retraite anticipée permet de partir avant l'âge légal mais avec une décote importante et sans possibilité de travailler. La retraite progressive est généralement plus avantageuse car elle permet de continuer à cotiser et d'optimiser la fiscalité."
    },
    {
      question: "Comment éviter la décote ?",
      answer: "Pour éviter la décote : 1) Attendez l'âge du taux plein (67 ans) si vous manquez des trimestres, 2) Validez des trimestres supplémentaires (rachat ou continuation du travail), 3) Optez pour la retraite progressive pour continuer à cotiser, 4) Vérifiez votre relevé de carrière pour identifier les trimestres manquants, 5) Utilisez notre simulateur pour calculer l'impact de la décote."
    },
    {
      question: "Quand peut-on demander la retraite progressive ?",
      answer: "Vous pouvez demander la retraite progressive dès que vous remplissez les conditions d'éligibilité : âge légal atteint (62 ans) ou âge du taux plein (67 ans), trimestres suffisants pour avoir droit à une pension, et accord de votre employeur pour passer à temps partiel. Il est recommandé de faire la demande 3 à 6 mois avant la date souhaitée de début."
    }
  ];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://retraiteclair.onrender.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "FAQ Retraite",
        "item": "https://retraiteclair.onrender.com/#/faq-retraite"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>FAQ Retraite Progressive : Questions fréquentes 2025 | RetraiteClair</title>
        <meta name="description" content="FAQ retraite progressive : réponses à toutes vos questions sur la retraite progressive, la décote, la surcote, l'éligibilité et les démarches en 2025." />
        <meta name="keywords" content="FAQ retraite, questions retraite progressive, décote, surcote, éligibilité retraite, démarches retraite" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://retraiteclair.onrender.com/#/faq-retraite" />
        <meta property="og:title" content="FAQ Retraite Progressive : Questions fréquentes 2025" />
        <meta property="og:description" content="FAQ retraite progressive : réponses à toutes vos questions sur la retraite progressive, la décote, la surcote, l'éligibilité et les démarches en 2025." />
        <meta property="og:image" content="https://retraiteclair.onrender.com/retraite-progressive-hero.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ Retraite Progressive : Questions fréquentes 2025" />
        <meta name="twitter:description" content="FAQ retraite progressive : réponses à toutes vos questions sur la retraite progressive, la décote, la surcote, l'éligibilité et les démarches en 2025." />
        <meta name="twitter:image" content="https://retraiteclair.onrender.com/retraite-progressive-hero.png" />
        
        <link rel="canonical" href="https://retraiteclair.onrender.com/#/faq-retraite" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <div className="legal-page-container">
        <div className="legal-content">
          <nav className="breadcrumb" style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
            <a href="/#/" style={{ color: '#2563eb', textDecoration: 'none' }}>Accueil</a>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>FAQ Retraite</span>
          </nav>

          <h1>FAQ Retraite Progressive : Questions fréquentes</h1>
          
          <p className="lead">
            Retrouvez les réponses aux questions les plus fréquentes sur la retraite progressive, 
            la décote, la surcote, l'éligibilité et les démarches en 2025.
          </p>

          <div style={{ marginTop: '40px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: index < faqs.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                <h2 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                  {faq.question}
                </h2>
                <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3 style={{ marginTop: 0 }}>💡 Besoin de plus d'informations ?</h3>
            <p>
              Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb', fontWeight: 'bold' }}>simulateur de retraite progressive</a> pour estimer vos revenus, 
              ou consultez notre <a href="/#/guide-retraite-2025" style={{ color: '#2563eb', fontWeight: 'bold' }}>guide complet 2025</a> pour des informations détaillées.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQRetraitePage;


