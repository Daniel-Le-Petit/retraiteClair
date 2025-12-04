import React, { useEffect } from 'react';
import PageMetadata from '../components/PageMetadata';
import '../legal-styles.css';

const RetraiteProgressivePage = () => {
  // Scroll vers le haut au chargement de la page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Comment fonctionne la retraite progressive ?",
    "description": "Guide complet sur le fonctionnement de la retraite progressive en France : conditions, calcul, avantages et démarches.",
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
    "dateModified": "2025-01-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://retraiteclair.onrender.com/#/retraite-progressive"
    }
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
        "name": "Comment fonctionne la retraite progressive ?",
        "item": "https://retraiteclair.onrender.com/#/retraite-progressive"
      }
    ]
  };

  return (
    <>
      <PageMetadata
        title="Comment fonctionne la retraite progressive ? Guide complet 2025 | RetraiteClair"
        description="Comment fonctionne la retraite progressive ? Découvrez les conditions d'éligibilité, le calcul de votre pension, les avantages fiscaux et les démarches à suivre pour bénéficier de cette transition en douceur vers la retraite."
        keywords="retraite progressive, comment ça marche, fonctionnement, conditions, éligibilité, calcul pension"
        ogTitle="Comment fonctionne la retraite progressive ? Guide complet 2025"
        ogDescription="Comment fonctionne la retraite progressive ? Découvrez les conditions d'éligibilité, le calcul de votre pension, les avantages fiscaux et les démarches à suivre."
        ogImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        ogUrl="https://retraiteclair.onrender.com/#/retraite-progressive"
        twitterTitle="Comment fonctionne la retraite progressive ? Guide complet 2025"
        twitterDescription="Comment fonctionne la retraite progressive ? Découvrez les conditions d'éligibilité, le calcul de votre pension, les avantages fiscaux et les démarches à suivre."
        twitterImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        canonical="https://retraiteclair.onrender.com/#/retraite-progressive"
        structuredData={[structuredData]}
        breadcrumbData={breadcrumbData}
      />

      <div className="legal-page-container">
        <div className="legal-content">
          <nav className="breadcrumb" style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
            <a href="/#/" style={{ color: '#2563eb', textDecoration: 'none' }}>Accueil</a>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>Comment fonctionne la retraite progressive ?</span>
          </nav>

          <h1>Comment fonctionne la retraite progressive ?</h1>
          
          <p className="lead">
            La retraite progressive est un dispositif qui permet de travailler à temps partiel tout en percevant une partie de votre pension de retraite. 
            C'est une transition en douceur vers la retraite définitive, idéale pour ceux qui souhaitent réduire progressivement leur activité professionnelle.
          </p>

          <h2>Qu'est-ce que la retraite progressive exactement ?</h2>
          
          <p>
            La retraite progressive vous permet de :
          </p>
          <ul>
            <li><strong>Travailler à temps partiel</strong> : entre 40% et 80% de votre temps de travail habituel</li>
            <li><strong>Percevoir une pension partielle</strong> : entre 30% et 50% de votre pension au taux plein</li>
            <li><strong>Continuer à cotiser</strong> : vous continuez à valider des trimestres pour votre retraite définitive</li>
            <li><strong>Optimiser votre fiscalité</strong> : vos revenus sont réduits, ce qui peut vous faire passer dans une tranche d'imposition plus basse</li>
          </ul>

          <h2>Qui peut bénéficier de la retraite progressive ?</h2>
          
          <p>Pour être éligible à la retraite progressive, vous devez remplir plusieurs conditions :</p>
          
          <h3>Conditions d'âge</h3>
          <ul>
            <li>Avoir atteint l'âge légal de départ à la retraite (62 ans en 2025)</li>
            <li>Ou avoir atteint l'âge de départ à taux plein automatique (67 ans)</li>
            <li>Ou bénéficier d'une carrière longue (départ anticipé possible)</li>
          </ul>

          <h3>Conditions de trimestres</h3>
          <ul>
            <li>Avoir validé suffisamment de trimestres pour avoir droit à une pension</li>
            <li>Le nombre de trimestres requis dépend de votre année de naissance</li>
          </ul>

          <h3>Conditions d'activité</h3>
          <ul>
            <li>Être salarié, fonctionnaire ou travailleur indépendant</li>
            <li>Travailler à temps partiel entre 40% et 80% de votre temps plein</li>
            <li>Continuer à cotiser à votre régime de retraite</li>
          </ul>

          <h2>Comment calculer votre pension progressive ?</h2>
          
          <p>Le calcul de votre pension progressive dépend de plusieurs facteurs :</p>
          
          <h3>1. Votre salaire annuel moyen (SAM)</h3>
          <p>
            Le SAM est calculé sur vos 25 meilleures années de salaire. 
            C'est la base de calcul de votre pension.
          </p>

          <h3>2. Votre taux de pension</h3>
          <p>
            Le taux dépend du nombre de trimestres validés par rapport au nombre requis :
          </p>
          <ul>
            <li><strong>Taux plein</strong> : 50% du SAM si vous avez tous les trimestres requis</li>
            <li><strong>Avec décote</strong> : le taux est réduit si vous partez avant d'avoir tous les trimestres</li>
            <li><strong>Avec surcote</strong> : le taux peut être augmenté si vous continuez à travailler après le taux plein</li>
          </ul>

          <h3>3. Le pourcentage de votre pension progressive</h3>
          <p>
            En retraite progressive, vous percevez entre 30% et 50% de votre pension au taux plein, 
            selon votre situation et votre temps partiel.
          </p>

          <h2>Quels sont les avantages de la retraite progressive ?</h2>
          
          <h3>Avantages financiers</h3>
          <ul>
            <li><strong>Revenus optimisés</strong> : vous combinez salaire partiel et pension partielle</li>
            <li><strong>Réduction d'impôts</strong> : vos revenus diminuent, vous pouvez passer dans une tranche d'imposition plus basse</li>
            <li><strong>Cotisations continues</strong> : vous continuez à valider des trimestres pour améliorer votre retraite définitive</li>
          </ul>

          <h3>Avantages personnels</h3>
          <ul>
            <li><strong>Transition en douceur</strong> : vous réduisez progressivement votre activité</li>
            <li><strong>Plus de temps libre</strong> : vous travaillez moins tout en conservant des revenus</li>
            <li><strong>Test de la retraite</strong> : vous pouvez tester votre nouveau rythme de vie avant la retraite définitive</li>
          </ul>

          <h2>Comment demander la retraite progressive ?</h2>
          
          <p>Les démarches pour demander la retraite progressive :</p>
          
          <h3>Étape 1 : Vérifier votre éligibilité</h3>
          <p>
            Utilisez notre simulateur gratuit pour vérifier si vous êtes éligible et estimer vos revenus en retraite progressive.
          </p>

          <h3>Étape 2 : Négocier avec votre employeur</h3>
          <p>
            Vous devez obtenir l'accord de votre employeur pour passer à temps partiel. 
            Cette négociation peut se faire dans le cadre d'un accord d'entreprise ou individuellement.
          </p>

          <h3>Étape 3 : Faire la demande auprès de votre caisse de retraite</h3>
          <p>
            Contactez votre caisse de retraite (CARSAT, MSA, etc.) pour faire la demande de retraite progressive. 
            Vous devrez fournir plusieurs documents (fiche de paie, contrat de travail modifié, etc.).
          </p>

          <h3>Étape 4 : Attendre la décision</h3>
          <p>
            La caisse de retraite étudie votre dossier et vous notifie sa décision. 
            Le délai de traitement est généralement de 2 à 3 mois.
          </p>

          <h2>Quels sont les pièges à éviter ?</h2>
          
          <ul>
            <li><strong>Ne pas vérifier son éligibilité</strong> : assurez-vous de remplir toutes les conditions avant de faire la demande</li>
            <li><strong>Oublier de négocier le temps partiel</strong> : vous devez avoir l'accord de votre employeur</li>
            <li><strong>Mal calculer ses revenus</strong> : utilisez notre simulateur pour avoir une estimation précise</li>
            <li><strong>Ne pas tenir compte de la fiscalité</strong> : la réduction de revenus peut avoir un impact fiscal positif</li>
          </ul>

          <h2>Conclusion</h2>
          
          <p>
            La retraite progressive est un excellent moyen de transitionner vers la retraite définitive tout en conservant des revenus et en optimisant votre situation fiscale. 
            Pour savoir si cette option vous convient, utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur gratuit</a> qui vous donnera une estimation précise de vos revenus.
          </p>

          <div style={{ marginTop: '40px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3 style={{ marginTop: 0 }}>💡 Besoin d'aide ?</h3>
            <p>
              Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb', fontWeight: 'bold' }}>simulateur de retraite progressive</a> pour estimer vos revenus 
              ou consultez notre <a href="/#/faq-retraite" style={{ color: '#2563eb', fontWeight: 'bold' }}>FAQ complète</a> pour répondre à toutes vos questions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RetraiteProgressivePage;


