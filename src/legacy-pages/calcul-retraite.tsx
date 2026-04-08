import React, { useEffect } from 'react';
import PageMetadata from '../components/PageMetadata';
import '../legal-styles.css';

const CalculRetraitePage = () => {
  // Scroll vers le haut au chargement de la page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment optimiser sa pension de retraite ?",
    "description": "Guide étape par étape pour calculer et optimiser votre pension de retraite en 2025.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Calculer votre salaire annuel moyen (SAM)",
        "text": "Le SAM est calculé sur vos 25 meilleures années de salaire. C'est la base de calcul de votre pension."
      },
      {
        "@type": "HowToStep",
        "name": "Vérifier vos trimestres validés",
        "text": "Consultez votre relevé de carrière pour connaître le nombre de trimestres validés et ceux qui vous manquent."
      },
      {
        "@type": "HowToStep",
        "name": "Calculer votre taux de pension",
        "text": "Le taux dépend du nombre de trimestres validés. Au taux plein, vous avez droit à 50% de votre SAM."
      },
      {
        "@type": "HowToStep",
        "name": "Tenir compte de la décote ou surcote",
        "text": "Appliquez la décote si vous partez avant le taux plein, ou la surcote si vous continuez à travailler après."
      },
      {
        "@type": "HowToStep",
        "name": "Optimiser votre départ",
        "text": "Utilisez notre simulateur pour comparer différents scénarios et trouver la meilleure stratégie."
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Calcul retraite : comment optimiser sa pension ?",
    "description": "Guide complet pour calculer et optimiser votre pension de retraite : SAM, trimestres, décote, surcote et stratégies d'optimisation.",
    "author": {
      "@type": "Person",
      "name": "RetraiteClair"
    },
    "publisher": {
      "@type": "Organization",
      "name": "RetraiteClair",
      "url": "https://retraiteclair.onrender.com"
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01"
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
        "name": "Calcul retraite : comment optimiser sa pension ?",
        "item": "https://retraiteclair.onrender.com/#/calcul-retraite"
      }
    ]
  };

  return (
    <>
      <PageMetadata
        title="Calcul retraite : comment optimiser sa pension ? Guide 2025 | RetraiteClair"
        description="Calcul retraite : comment optimiser sa pension ? Découvrez comment calculer votre pension, optimiser votre départ et maximiser vos revenus de retraite."
        keywords="calcul retraite, optimiser pension, SAM, trimestres, décote, surcote, stratégie retraite"
        ogTitle="Calcul retraite : comment optimiser sa pension ? Guide 2025"
        ogDescription="Calcul retraite : comment optimiser sa pension ? Découvrez comment calculer votre pension, optimiser votre départ et maximiser vos revenus de retraite."
        ogImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        ogUrl="https://retraiteclair.onrender.com/#/calcul-retraite"
        twitterTitle="Calcul retraite : comment optimiser sa pension ? Guide 2025"
        twitterDescription="Calcul retraite : comment optimiser sa pension ? Découvrez comment calculer votre pension, optimiser votre départ et maximiser vos revenus de retraite."
        twitterImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        canonical="https://retraiteclair.onrender.com/#/calcul-retraite"
        structuredData={[structuredData, articleData]}
        breadcrumbData={breadcrumbData}
      />

      <div className="legal-page-container">
        <div className="legal-content">
          <nav className="breadcrumb" style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
            <a href="/#/" style={{ color: '#2563eb', textDecoration: 'none' }}>Accueil</a>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>Calcul retraite : comment optimiser sa pension ?</span>
          </nav>

          <h1>Calcul retraite : comment optimiser sa pension ?</h1>
          
          <p className="lead">
            Optimiser sa pension de retraite nécessite de comprendre les mécanismes de calcul et de choisir la meilleure stratégie de départ. 
            Ce guide vous explique étape par étape comment calculer et maximiser votre pension.
          </p>

          <h2>Comment calculer votre pension de retraite ?</h2>
          
          <p>Le calcul de votre pension de retraite repose sur trois éléments principaux :</p>

          <h3>1. Le salaire annuel moyen (SAM)</h3>
          <p>
            Le SAM est la <strong>moyenne de vos 25 meilleures années de salaire</strong> (revalorisées selon l'inflation). 
            C'est la base de calcul de votre pension.
          </p>
          <ul>
            <li>Seules les années où vous avez cotisé comptent</li>
            <li>Les salaires sont revalorisés selon l'inflation</li>
            <li>Les années de chômage ou d'inactivité ne comptent pas</li>
          </ul>

          <h3>2. Le taux de pension</h3>
          <p>
            Le taux de pension dépend du nombre de trimestres validés :
          </p>
          <ul>
            <li><strong>Taux plein</strong> : 50% du SAM si vous avez tous les trimestres requis</li>
            <li><strong>Avec décote</strong> : le taux est réduit si vous manquez des trimestres</li>
            <li><strong>Avec surcote</strong> : le taux peut être augmenté si vous continuez à travailler après le taux plein</li>
          </ul>

          <h3>3. La décote ou la surcote</h3>
          <p>
            Selon votre situation, une décote (réduction) ou une surcote (augmentation) peut s'appliquer :
          </p>
          <ul>
            <li><strong>Décote</strong> : -0,625% par trimestre manquant (maximum -25%)</li>
            <li><strong>Surcote</strong> : +0,75% par trimestre supplémentaire (maximum +12%)</li>
          </ul>

          <h3>Formule de calcul</h3>
          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', margin: '20px 0', fontFamily: 'monospace' }}>
            <p><strong>Pension mensuelle = (SAM × Taux) / 12</strong></p>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              Avec :<br />
              - SAM = moyenne des 25 meilleures années<br />
              - Taux = 50% au taux plein, ajusté par décote/surcote
            </p>
          </div>

          <h2>Comment optimiser votre pension ?</h2>
          
          <h3>Stratégie 1 : Valider tous vos trimestres</h3>
          <p>
            Pour éviter la décote, assurez-vous de valider tous les trimestres requis pour votre génération :
          </p>
          <ul>
            <li>Consultez votre relevé de carrière régulièrement</li>
            <li>Identifiez les trimestres manquants</li>
            <li>Envisagez de racheter des trimestres si nécessaire</li>
            <li>Continuez à travailler jusqu'à avoir tous les trimestres</li>
          </ul>

          <h3>Stratégie 2 : Attendre l'âge du taux plein</h3>
          <p>
            Si vous manquez des trimestres, attendez l'âge du taux plein automatique (67 ans) :
          </p>
          <ul>
            <li>À 67 ans, vous avez droit au taux plein même sans tous les trimestres</li>
            <li>Cela évite la décote sur l'âge</li>
            <li>Vous pouvez opter pour la retraite progressive en attendant</li>
          </ul>

          <h3>Stratégie 3 : Maximiser la surcote</h3>
          <p>
            Si vous avez tous vos trimestres et avez atteint 67 ans, continuez à travailler pour bénéficier de la surcote :
          </p>
          <ul>
            <li>Chaque trimestre supplémentaire augmente votre pension de 0,75%</li>
            <li>Maximum : +12% d'augmentation (16 trimestres)</li>
            <li>La retraite progressive est idéale pour cumuler surcote et revenus</li>
          </ul>

          <h3>Stratégie 4 : Opter pour la retraite progressive</h3>
          <p>
            La retraite progressive permet d'optimiser à la fois vos revenus et votre pension :
          </p>
          <ul>
            <li>Vous continuez à cotiser et valider des trimestres</li>
            <li>Vous percevez une pension partielle (30% à 50%)</li>
            <li>Vous réduisez votre activité progressivement</li>
            <li>Vous optimisez votre fiscalité</li>
          </ul>

          <h2>Les pièges à éviter</h2>
          
          <h3>Piège 1 : Partir trop tôt sans vérifier</h3>
          <p>
            Ne partez pas à la retraite sans avoir vérifié votre situation :
          </p>
          <ul>
            <li>Vérifiez votre nombre de trimestres validés</li>
            <li>Calculez l'impact de la décote</li>
            <li>Comparez avec l'attente du taux plein</li>
          </ul>

          <h3>Piège 2 : Ignorer la retraite progressive</h3>
          <p>
            Beaucoup de personnes ignorent la retraite progressive alors qu'elle peut être très avantageuse :
          </p>
          <ul>
            <li>Elle permet de continuer à cotiser</li>
            <li>Elle optimise la fiscalité</li>
            <li>Elle offre une transition en douceur</li>
          </ul>

          <h3>Piège 3 : Ne pas tenir compte de la fiscalité</h3>
          <p>
            La réduction de revenus en retraite progressive peut avoir un impact fiscal positif :
          </p>
          <ul>
            <li>Vous pouvez passer dans une tranche d'imposition plus basse</li>
            <li>Les économies d'impôts s'ajoutent à vos revenus nets</li>
            <li>Notre simulateur calcule automatiquement cet impact</li>
          </ul>

          <h2>Outils pour optimiser votre pension</h2>
          
          <h3>1. Utilisez notre simulateur gratuit</h3>
          <p>
            Notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur de retraite progressive</a> vous permet de :
          </p>
          <ul>
            <li>Estimer vos revenus en retraite progressive</li>
            <li>Comparer différents scénarios (temps partiel, âge de départ)</li>
            <li>Calculer l'impact fiscal</li>
            <li>Optimiser votre stratégie de départ</li>
          </ul>

          <h3>2. Consultez votre relevé de carrière</h3>
          <p>
            Votre relevé de carrière est disponible sur le site de l'Assurance retraite :
          </p>
          <ul>
            <li>Vérifiez tous vos trimestres validés</li>
            <li>Identifiez les périodes manquantes</li>
            <li>Vérifiez vos salaires déclarés</li>
          </ul>

          <h3>3. Faites une simulation auprès de votre caisse</h3>
          <p>
            Contactez votre caisse de retraite (CARSAT, MSA, etc.) pour :
          </p>
          <ul>
            <li>Obtenir une estimation précise de votre pension</li>
            <li>Vérifier votre éligibilité à la retraite progressive</li>
            <li>Connaître les démarches à suivre</li>
          </ul>

          <h2>Conclusion</h2>
          
          <p>
            Optimiser sa pension de retraite nécessite de bien comprendre les mécanismes de calcul et de choisir la meilleure stratégie. 
            Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur gratuit</a> pour comparer différents scénarios 
            et trouver la stratégie qui maximise vos revenus.
          </p>

          <div style={{ marginTop: '40px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3 style={{ marginTop: 0 }}>💡 Besoin d'aide ?</h3>
            <p>
              Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb', fontWeight: 'bold' }}>simulateur de retraite progressive</a> pour estimer et optimiser votre pension, 
              ou consultez notre <a href="/#/guide-retraite-2025" style={{ color: '#2563eb', fontWeight: 'bold' }}>guide complet 2025</a> pour plus d'informations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculRetraitePage;


