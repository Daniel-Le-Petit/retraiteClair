import React, { useEffect } from 'react';
import PageMetadata from '../components/PageMetadata';
import '../legal-styles.css';

const GuideRetraite2025Page = () => {
  // Scroll vers le haut au chargement de la page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Guide complet de la retraite progressive 2025",
    "description": "Guide complet et détaillé sur la retraite progressive en 2025 : fonctionnement, éligibilité, calcul, avantages, démarches et stratégies d'optimisation.",
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
      "@id": "https://retraiteclair.onrender.com/#/guide-retraite-2025"
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
        "name": "Guide complet retraite progressive 2025",
        "item": "https://retraiteclair.onrender.com/#/guide-retraite-2025"
      }
    ]
  };

  return (
    <>
      <PageMetadata
        title="Guide complet de la retraite progressive 2025 | RetraiteClair"
        description="Guide complet et détaillé sur la retraite progressive en 2025 : fonctionnement, éligibilité, calcul de la pension, décote, surcote, avantages fiscaux, démarches et stratégies d'optimisation."
        keywords="guide retraite progressive, retraite progressive 2025, calcul retraite, décote, surcote, éligibilité, démarches, optimisation"
        ogTitle="Guide complet de la retraite progressive 2025"
        ogDescription="Guide complet et détaillé sur la retraite progressive en 2025 : fonctionnement, éligibilité, calcul, avantages, démarches et stratégies d'optimisation."
        ogImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        ogUrl="https://retraiteclair.onrender.com/#/guide-retraite-2025"
        twitterTitle="Guide complet de la retraite progressive 2025"
        twitterDescription="Guide complet et détaillé sur la retraite progressive en 2025 : fonctionnement, éligibilité, calcul, avantages, démarches et stratégies d'optimisation."
        twitterImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        canonical="https://retraiteclair.onrender.com/#/guide-retraite-2025"
        structuredData={[structuredData]}
        breadcrumbData={breadcrumbData}
      />

      <div className="legal-page-container">
        <div className="legal-content">
          <nav className="breadcrumb" style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
            <a href="/#/" style={{ color: '#2563eb', textDecoration: 'none' }}>Accueil</a>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>Guide complet retraite progressive 2025</span>
          </nav>

          <h1>Guide complet de la retraite progressive 2025</h1>
          
          <p className="lead">
            Ce guide complet vous explique tout ce que vous devez savoir sur la retraite progressive en 2025 : 
            fonctionnement, conditions d'éligibilité, calcul de votre pension, décote et surcote, avantages fiscaux, 
            démarches administratives et stratégies d'optimisation pour maximiser vos revenus.
          </p>

          <div style={{ marginTop: '30px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd', marginBottom: '40px' }}>
            <h3 style={{ marginTop: 0 }}>📋 Table des matières</h3>
            <ul style={{ lineHeight: '2', marginBottom: 0 }}>
              <li><a href="#qu-est-ce-que-la-retraite-progressive" style={{ color: '#2563eb' }}>Qu'est-ce que la retraite progressive ?</a></li>
              <li><a href="#eligibilite" style={{ color: '#2563eb' }}>Conditions d'éligibilité</a></li>
              <li><a href="#calcul-pension" style={{ color: '#2563eb' }}>Calcul de la pension progressive</a></li>
              <li><a href="#decote-surcote" style={{ color: '#2563eb' }}>Décote et surcote</a></li>
              <li><a href="#avantages" style={{ color: '#2563eb' }}>Avantages de la retraite progressive</a></li>
              <li><a href="#demarches" style={{ color: '#2563eb' }}>Démarches administratives</a></li>
              <li><a href="#optimisation" style={{ color: '#2563eb' }}>Stratégies d'optimisation</a></li>
              <li><a href="#pieges-eviter" style={{ color: '#2563eb' }}>Pièges à éviter</a></li>
              <li><a href="#carrieres-longues" style={{ color: '#2563eb' }}>Carrières longues</a></li>
              <li><a href="#passage-temps-partiel" style={{ color: '#2563eb' }}>Passage du temps plein au temps partiel</a></li>
            </ul>
          </div>

          <section id="qu-est-ce-que-la-retraite-progressive">
            <h2>1. Qu'est-ce que la retraite progressive ?</h2>
            
            <p>
              La retraite progressive est un dispositif qui permet de <strong>travailler à temps partiel</strong> 
              (entre 40% et 80% de votre temps de travail habituel) tout en <strong>percevant une partie de votre pension de retraite</strong> 
              (entre 30% et 50% de votre pension au taux plein).
            </p>

            <h3>Les principes fondamentaux</h3>
            <ul>
              <li><strong>Transition en douceur</strong> : vous réduisez progressivement votre activité professionnelle</li>
              <li><strong>Revenus combinés</strong> : vous cumulez salaire partiel et pension partielle</li>
              <li><strong>Cotisations continues</strong> : vous continuez à cotiser et à valider des trimestres</li>
              <li><strong>Optimisation fiscale</strong> : vos revenus réduits peuvent vous faire passer dans une tranche d'imposition plus basse</li>
            </ul>

            <h3>Différence avec la retraite définitive</h3>
            <p>
              Contrairement à la retraite définitive où vous arrêtez complètement de travailler, 
              la retraite progressive vous permet de continuer à travailler tout en touchant une pension. 
              C'est idéal pour ceux qui souhaitent réduire leur activité sans arrêter complètement.
            </p>
          </section>

          <section id="eligibilite">
            <h2>2. Conditions d'éligibilité à la retraite progressive</h2>
            
            <h3>Conditions d'âge</h3>
            <p>Pour être éligible, vous devez avoir atteint :</p>
            <ul>
              <li><strong>L'âge légal de départ à la retraite</strong> : 62 ans en 2025</li>
              <li><strong>OU l'âge du taux plein automatique</strong> : 67 ans</li>
              <li><strong>OU bénéficier d'une carrière longue</strong> : départ anticipé possible selon votre situation</li>
            </ul>

            <h3>Conditions de trimestres</h3>
            <p>Vous devez avoir validé suffisamment de trimestres pour avoir droit à une pension :</p>
            <ul>
              <li>Le nombre de trimestres requis dépend de votre année de naissance</li>
              <li>Pour les personnes nées en 1961 et après : 172 trimestres (43 ans) pour le taux plein</li>
              <li>Consultez votre relevé de carrière pour connaître votre situation exacte</li>
            </ul>

            <h3>Conditions d'activité</h3>
            <p>Vous devez :</p>
            <ul>
              <li>Être <strong>salarié, fonctionnaire ou travailleur indépendant</strong></li>
              <li>Travailler à <strong>temps partiel entre 40% et 80%</strong> de votre temps plein</li>
              <li>Continuer à <strong>cotiser à votre régime de retraite</strong></li>
              <li>Avoir l'<strong>accord de votre employeur</strong> pour passer à temps partiel</li>
            </ul>
          </section>

          <section id="calcul-pension">
            <h2>3. Calcul de la pension progressive</h2>
            
            <h3>Les éléments de calcul</h3>
            <p>Le calcul de votre pension progressive repose sur trois éléments principaux :</p>

            <h4>3.1. Le salaire annuel moyen (SAM)</h4>
            <p>
              Le SAM est la <strong>moyenne de vos 25 meilleures années de salaire</strong> (revalorisées selon l'inflation). 
              C'est la base de calcul de votre pension.
            </p>
            <ul>
              <li>Seules les années où vous avez cotisé comptent</li>
              <li>Les salaires sont revalorisés selon l'inflation</li>
              <li>Les années de chômage ou d'inactivité ne comptent pas</li>
            </ul>

            <h4>3.2. Le taux de pension</h4>
            <p>Le taux de pension dépend du nombre de trimestres validés :</p>
            <ul>
              <li><strong>Taux plein</strong> : 50% du SAM si vous avez tous les trimestres requis</li>
              <li><strong>Avec décote</strong> : le taux est réduit si vous manquez des trimestres</li>
              <li><strong>Avec surcote</strong> : le taux peut être augmenté si vous continuez à travailler après le taux plein</li>
            </ul>

            <h4>3.3. Le pourcentage de pension progressive</h4>
            <p>
              En retraite progressive, vous percevez entre <strong>30% et 50% de votre pension au taux plein</strong>, 
              selon votre situation et votre temps partiel.
            </p>

            <h3>Formule de calcul</h3>
            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', margin: '20px 0', fontFamily: 'monospace' }}>
              <p><strong>Pension progressive mensuelle = (SAM × Taux × Pourcentage progressif) / 12</strong></p>
              <p style={{ marginTop: '10px', fontSize: '14px' }}>
                Exemple : SAM = 30 000 €, Taux = 50%, Pourcentage progressif = 40%<br />
                Pension progressive = (30 000 × 0,50 × 0,40) / 12 = <strong>500 €/mois</strong>
              </p>
            </div>
          </section>

          <section id="decote-surcote">
            <h2>4. Décote et surcote</h2>
            
            <h3>La décote</h3>
            <p>
              La décote est une <strong>réduction du montant de votre pension</strong> si vous partez avant d'avoir 
              tous les trimestres requis ou avant l'âge du taux plein (67 ans).
            </p>

            <h4>Calcul de la décote</h4>
            <p>La décote est calculée de deux façons, et c'est la moins pénalisante qui s'applique :</p>
            <ul>
              <li><strong>Décote sur l'âge</strong> : -0,625% par trimestre manquant avant 67 ans (maximum -25%)</li>
              <li><strong>Décote sur les trimestres</strong> : -1,25% par trimestre manquant par rapport au nombre requis (maximum -25%)</li>
            </ul>

            <h3>La surcote</h3>
            <p>
              La surcote est une <strong>augmentation du montant de votre pension</strong> si vous continuez à travailler 
              après avoir atteint le taux plein (tous les trimestres requis ET 67 ans).
            </p>

            <h4>Calcul de la surcote</h4>
            <ul>
              <li><strong>+0,75% par trimestre supplémentaire</strong> travaillé après le taux plein</li>
              <li>Maximum : <strong>+12% d'augmentation</strong> (16 trimestres)</li>
            </ul>

            <p>
              Pour plus de détails, consultez notre guide sur <a href="/#/decote-surcote" style={{ color: '#2563eb' }}>la décote et la surcote</a>.
            </p>
          </section>

          <section id="avantages">
            <h2>5. Avantages de la retraite progressive</h2>
            
            <h3>Avantages financiers</h3>
            <ul>
              <li><strong>Revenus optimisés</strong> : vous combinez salaire partiel et pension partielle</li>
              <li><strong>Réduction d'impôts</strong> : vos revenus diminuent, vous pouvez passer dans une tranche d'imposition plus basse</li>
              <li><strong>Cotisations continues</strong> : vous continuez à valider des trimestres pour améliorer votre retraite définitive</li>
              <li><strong>Économies fiscales</strong> : les économies d'impôts s'ajoutent à vos revenus nets</li>
            </ul>

            <h3>Avantages personnels</h3>
            <ul>
              <li><strong>Transition en douceur</strong> : vous réduisez progressivement votre activité</li>
              <li><strong>Plus de temps libre</strong> : vous travaillez moins tout en conservant des revenus</li>
              <li><strong>Test de la retraite</strong> : vous pouvez tester votre nouveau rythme de vie avant la retraite définitive</li>
              <li><strong>Maintien du lien social</strong> : vous restez en contact avec votre entreprise et vos collègues</li>
            </ul>
          </section>

          <section id="demarches">
            <h2>6. Démarches administratives</h2>
            
            <h3>Étape 1 : Vérifier votre éligibilité</h3>
            <p>
              Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur gratuit</a> pour vérifier 
              si vous êtes éligible et estimer vos revenus en retraite progressive.
            </p>

            <h3>Étape 2 : Négocier avec votre employeur</h3>
            <p>
              Vous devez obtenir l'accord de votre employeur pour passer à temps partiel. 
              Cette négociation peut se faire :
            </p>
            <ul>
              <li>Dans le cadre d'un <strong>accord d'entreprise</strong> si votre entreprise en a un</li>
              <li><strong>Individuellement</strong> avec votre employeur</li>
              <li>Avec l'aide des <strong>représentants du personnel</strong> si nécessaire</li>
            </ul>

            <h3>Étape 3 : Faire la demande auprès de votre caisse de retraite</h3>
            <p>
              Contactez votre caisse de retraite (CARSAT, MSA, etc.) pour faire la demande de retraite progressive. 
              Vous devrez fournir :
            </p>
            <ul>
              <li>Votre fiche de paie</li>
              <li>Votre contrat de travail modifié (temps partiel)</li>
              <li>Votre relevé de carrière</li>
              <li>Les documents d'identité</li>
            </ul>

            <h3>Étape 4 : Attendre la décision</h3>
            <p>
              La caisse de retraite étudie votre dossier et vous notifie sa décision. 
              Le délai de traitement est généralement de <strong>2 à 3 mois</strong>.
            </p>
          </section>

          <section id="optimisation">
            <h2>7. Stratégies d'optimisation</h2>
            
            <h3>Stratégie 1 : Valider tous vos trimestres</h3>
            <p>
              Pour éviter la décote, assurez-vous de valider tous les trimestres requis :
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

            <h3>Stratégie 4 : Optimiser la fiscalité</h3>
            <p>
              La réduction de revenus en retraite progressive peut avoir un impact fiscal positif :
            </p>
            <ul>
              <li>Vous pouvez passer dans une tranche d'imposition plus basse</li>
              <li>Les économies d'impôts s'ajoutent à vos revenus nets</li>
              <li>Notre simulateur calcule automatiquement cet impact</li>
            </ul>
          </section>

          <section id="pieges-eviter">
            <h2>8. Pièges à éviter</h2>
            
            <h3>Piège 1 : Partir trop tôt sans vérifier</h3>
            <p>
              Ne partez pas à la retraite sans avoir vérifié votre situation. 
              Vérifiez votre nombre de trimestres et calculez l'impact de la décote.
            </p>

            <h3>Piège 2 : Ignorer la retraite progressive</h3>
            <p>
              Beaucoup de personnes ignorent la retraite progressive alors qu'elle peut être très avantageuse. 
              Informez-vous et utilisez notre simulateur pour estimer vos revenus.
            </p>

            <h3>Piège 3 : Ne pas tenir compte de la fiscalité</h3>
            <p>
              La réduction de revenus peut avoir un impact fiscal positif significatif. 
              Calculez l'impact avec notre simulateur.
            </p>

            <h3>Piège 4 : Mal calculer ses revenus</h3>
            <p>
              Utilisez notre simulateur gratuit pour avoir une estimation précise de vos revenus 
              et éviter les mauvaises surprises.
            </p>

            <p>
              Pour plus de détails, consultez notre guide sur <a href="/#/pieges-retraite" style={{ color: '#2563eb' }}>les pièges à éviter</a>.
            </p>
          </section>

          <section id="carrieres-longues">
            <h2>9. Carrières longues</h2>
            
            <p>
              Si vous avez commencé à travailler très jeune, vous pouvez bénéficier d'un <strong>départ anticipé</strong> 
              dans le cadre d'une carrière longue.
            </p>

            <h3>Conditions pour une carrière longue</h3>
            <ul>
              <li>Avoir commencé à travailler avant un certain âge (variable selon votre génération)</li>
              <li>Avoir validé un certain nombre de trimestres</li>
              <li>Remplir les conditions d'âge minimum</li>
            </ul>

            <h3>Avantages</h3>
            <ul>
              <li>Départ à la retraite possible avant 62 ans</li>
              <li>Possibilité de combiner avec la retraite progressive</li>
              <li>Optimisation de votre stratégie de départ</li>
            </ul>

            <p>
              Consultez votre caisse de retraite pour vérifier si vous êtes éligible à une carrière longue.
            </p>
          </section>

          <section id="passage-temps-partiel">
            <h2>10. Passage du temps plein au temps partiel</h2>
            
            <h3>Négociation avec l'employeur</h3>
            <p>
              Le passage à temps partiel nécessite l'accord de votre employeur. 
              Préparez votre argumentation :
            </p>
            <ul>
              <li>Avantages pour l'entreprise (réduction des coûts, transmission de compétences)</li>
              <li>Plan de transition progressif</li>
              <li>Organisation du travail (répartition des tâches, formation)</li>
            </ul>

            <h3>Choix du pourcentage de temps partiel</h3>
            <p>
              Vous pouvez choisir un temps partiel entre 40% et 80% :
            </p>
            <ul>
              <li><strong>40%</strong> : maximum de temps libre, revenus plus réduits</li>
              <li><strong>50-60%</strong> : bon équilibre entre temps libre et revenus</li>
              <li><strong>70-80%</strong> : revenus plus élevés, moins de temps libre</li>
            </ul>

            <h3>Impact sur les revenus</h3>
            <p>
              Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur</a> pour comparer 
              différents pourcentages de temps partiel et trouver celui qui optimise vos revenus.
            </p>
          </section>

          <section style={{ marginTop: '50px' }}>
            <h2>Conclusion</h2>
            
            <p>
              La retraite progressive est un excellent moyen de transitionner vers la retraite définitive 
              tout en conservant des revenus et en optimisant votre situation fiscale. 
              Pour savoir si cette option vous convient, utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur gratuit</a> 
              qui vous donnera une estimation précise de vos revenus.
            </p>

            <div style={{ marginTop: '40px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
              <h3 style={{ marginTop: 0 }}>💡 Ressources complémentaires</h3>
              <ul style={{ lineHeight: '2' }}>
                <li><a href="/#/simulateurs" style={{ color: '#2563eb', fontWeight: 'bold' }}>Simulateur de retraite progressive</a> - Estimez vos revenus</li>
                <li><a href="/#/faq-retraite" style={{ color: '#2563eb', fontWeight: 'bold' }}>FAQ Retraite</a> - Réponses aux questions fréquentes</li>
                <li><a href="/#/retraite-progressive" style={{ color: '#2563eb', fontWeight: 'bold' }}>Comment fonctionne la retraite progressive ?</a></li>
                <li><a href="/#/decote-surcote" style={{ color: '#2563eb', fontWeight: 'bold' }}>Décote et surcote</a> - Guide détaillé</li>
                <li><a href="/#/calcul-retraite" style={{ color: '#2563eb', fontWeight: 'bold' }}>Calcul retraite</a> - Comment optimiser sa pension</li>
                <li><a href="/#/pieges-retraite" style={{ color: '#2563eb', fontWeight: 'bold' }}>Pièges à éviter</a> - Erreurs courantes</li>
                <li><a href="/#/demarche-retraite-progressive" style={{ color: '#2563eb', fontWeight: 'bold' }}>Démarches et formalités</a> - Guide complet des démarches</li>
                <li><a href="/#/temps-partiel-retraite-progressive" style={{ color: '#2563eb', fontWeight: 'bold' }}>Temps partiel</a> - Comparatif 40%, 50%, 60%, 70%, 80%</li>
                <li><a href="/#/fiscalite-retraite-progressive" style={{ color: '#2563eb', fontWeight: 'bold' }}>Fiscalité</a> - Impôts et cotisations</li>
                <li><a href="/#/cas-pratiques-retraite-progressive" style={{ color: '#2563eb', fontWeight: 'bold' }}>Cas pratiques</a> - Exemples concrets</li>
                <li><a href="/#/statut-retraite-progressive" style={{ color: '#2563eb', fontWeight: 'bold' }}>Selon votre statut</a> - Fonction publique, indépendants, expatriés</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default GuideRetraite2025Page;


