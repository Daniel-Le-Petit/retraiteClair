import React, { useEffect } from 'react';
import PageMetadata from '../components/PageMetadata';
import '../legal-styles.css';

const TempsPartielRetraiteProgressivePage = () => {
  // Scroll vers le haut au chargement de la page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Retraite progressive : impact selon votre pourcentage de temps partiel",
    "description": "Guide complet sur l'impact du temps partiel en retraite progressive : comparatif des revenus pour 40%, 50%, 60%, 70%, 80%, avantages et limites de chaque taux.",
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
      "@id": "https://retraiteclair.onrender.com/#/temps-partiel-retraite-progressive"
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
        "name": "Retraite progressive : impact selon votre pourcentage de temps partiel",
        "item": "https://retraiteclair.onrender.com/#/temps-partiel-retraite-progressive"
      }
    ]
  };

  return (
    <>
      <PageMetadata
        title="Retraite progressive : impact selon votre pourcentage de temps partiel | RetraiteClair"
        description="Retraite progressive et temps partiel : comparatif des revenus pour 40%, 50%, 60%, 70%, 80%. Découvrez l'impact sur vos revenus, la fiscalité et choisissez le meilleur taux."
        keywords="retraite progressive temps partiel, 40% 50% 60% 70% 80%, comparatif temps partiel, revenus retraite progressive, choix temps partiel"
        ogTitle="Retraite progressive : impact selon votre pourcentage de temps partiel"
        ogDescription="Comparatif complet des revenus en retraite progressive selon le taux de temps partiel : 40%, 50%, 60%, 70%, 80%."
        ogImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        ogUrl="https://retraiteclair.onrender.com/#/temps-partiel-retraite-progressive"
        twitterTitle="Retraite progressive : impact selon votre pourcentage de temps partiel"
        twitterDescription="Comparatif complet des revenus en retraite progressive selon le taux de temps partiel : 40%, 50%, 60%, 70%, 80%."
        twitterImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        canonical="https://retraiteclair.onrender.com/#/temps-partiel-retraite-progressive"
        structuredData={[structuredData]}
        breadcrumbData={breadcrumbData}
      />

      <div className="legal-page-container">
        <div className="legal-content">
          <nav className="breadcrumb" style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
            <a href="/#/" style={{ color: '#2563eb', textDecoration: 'none' }}>Accueil</a>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>Retraite progressive : impact selon votre pourcentage de temps partiel</span>
          </nav>

          <h1>Retraite progressive : impact selon votre pourcentage de temps partiel</h1>
          
          <p className="lead">
            Le choix du pourcentage de temps partiel (entre 40% et 80%) a un impact direct sur vos revenus, 
            votre pension partielle et votre qualité de vie. Ce guide vous aide à choisir le taux qui correspond le mieux à vos besoins.
          </p>

          <h2>Comparatif revenus avant/après</h2>
          
          <h3>Tableau simplifié pour 40%, 50%, 60%, 70%, 80%</h3>
          <p>
            Voici un comparatif des revenus selon le taux de temps partiel choisi, 
            basé sur un salaire brut de 3 000 €/mois et une pension au taux plein de 1 500 €/mois :
          </p>
          <div style={{ overflowX: 'auto', margin: '20px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Temps partiel</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Salaire brut</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Salaire net*</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Pension partielle</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Revenus totaux</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Temps libre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}><strong>40%</strong></td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>1 200 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~950 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~600 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~1 550 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#059669' }}>Maximum</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}><strong>50%</strong></td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>1 500 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~1 200 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~650 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~1 850 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#059669' }}>Très élevé</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}><strong>60%</strong></td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>1 800 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~1 400 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~700 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~2 100 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#2563eb' }}>Élevé</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}><strong>70%</strong></td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>2 100 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~1 650 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~750 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~2 400 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#2563eb' }}>Modéré</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}><strong>80%</strong></td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>2 400 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~1 900 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~800 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~2 700 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#dc2626' }}>Faible</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            * Salaire net estimé après cotisations sociales. Les montants peuvent varier selon votre situation fiscale et vos cotisations.
          </p>

          <h3>Impact sur le salaire net mensuel et pension partielle</h3>
          <p>
            Le salaire net diminue proportionnellement au temps partiel, mais la pension partielle compense partiellement cette perte. 
            Plus le temps partiel est faible, plus la pension partielle est importante en pourcentage.
          </p>
          <p>
            Par exemple, à 40% de temps partiel, vous perdez 60% de votre salaire mais vous touchez environ 40% de votre pension, 
            ce qui réduit l'impact sur vos revenus totaux.
          </p>

          <h3>Exemple concret : salarié à temps plein passant à 60%</h3>
          <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '8px', margin: '20px 0' }}>
            <p><strong>Cas : Marie, 63 ans, salaire brut 3 000 €/mois, pension au taux plein 1 500 €/mois</strong></p>
            <ul>
              <li><strong>Avant retraite progressive</strong> : Salaire net ~2 300 €/mois</li>
              <li><strong>Après retraite progressive à 60%</strong> :</li>
              <li style={{ marginLeft: '20px' }}>Salaire brut : 1 800 €/mois</li>
              <li style={{ marginLeft: '20px' }}>Salaire net : ~1 400 €/mois</li>
              <li style={{ marginLeft: '20px' }}>Pension partielle : ~700 €/mois (40% de la pension)</li>
              <li style={{ marginLeft: '20px' }}><strong>Revenus totaux : ~2 100 €/mois</strong></li>
            </ul>
            <p style={{ marginTop: '10px' }}>
              <strong>Impact :</strong> Perte de ~200 €/mois mais gain de 2 jours de temps libre par semaine.
            </p>
          </div>

          <h2>Avantages et limites de chaque taux</h2>
          
          <h3>40% de temps partiel</h3>
          <p><strong>Avantages :</strong></p>
          <ul>
            <li>Maximum de temps libre (3 jours par semaine)</li>
            <li>Transition très douce vers la retraite</li>
            <li>Bonne optimisation fiscale</li>
            <li>Idéal pour tester la retraite</li>
          </ul>
          <p><strong>Limites :</strong></p>
          <ul>
            <li>Revenus les plus faibles</li>
            <li>Peut nécessiter un ajustement du niveau de vie</li>
            <li>Certains employeurs peuvent être réticents</li>
          </ul>

          <h3>50% de temps partiel</h3>
          <p><strong>Avantages :</strong></p>
          <ul>
            <li>Excellent équilibre temps libre / revenus</li>
            <li>Revenus encore confortables</li>
            <li>Très bon compromis</li>
          </ul>
          <p><strong>Limites :</strong></p>
          <ul>
            <li>Revenus inférieurs au temps plein</li>
            <li>Nécessite une organisation personnelle</li>
          </ul>

          <h3>60% de temps partiel</h3>
          <p><strong>Avantages :</strong></p>
          <ul>
            <li>Bon équilibre revenus / temps libre</li>
            <li>Revenus proches du temps plein</li>
            <li>Accepté facilement par les employeurs</li>
          </ul>
          <p><strong>Limites :</strong></p>
          <ul>
            <li>Moins de temps libre qu'à 40% ou 50%</li>
            <li>Impact fiscal moins important</li>
          </ul>

          <h3>70% de temps partiel</h3>
          <p><strong>Avantages :</strong></p>
          <ul>
            <li>Revenus élevés</li>
            <li>Transition très progressive</li>
            <li>Maintien d'une activité importante</li>
          </ul>
          <p><strong>Limites :</strong></p>
          <ul>
            <li>Moins de temps libre</li>
            <li>Impact fiscal limité</li>
            <li>Transition moins marquée</li>
          </ul>

          <h3>80% de temps partiel</h3>
          <p><strong>Avantages :</strong></p>
          <ul>
            <li>Revenus très proches du temps plein</li>
            <li>Transition très douce</li>
            <li>Facilement accepté par les employeurs</li>
          </ul>
          <p><strong>Limites :</strong></p>
          <ul>
            <li>Peu de temps libre supplémentaire</li>
            <li>Impact fiscal minimal</li>
            <li>Transition peu marquée</li>
          </ul>

          <h3>Flexibilité et équilibre vie professionnelle / retraite</h3>
          <p>
            Le choix du taux de temps partiel dépend de vos priorités : revenus, temps libre, transition progressive. 
            Il n'y a pas de "meilleur" taux, seulement celui qui correspond à votre situation.
          </p>

          <h3>Impact fiscal et social</h3>
          <p>
            Plus le temps partiel est faible, plus l'impact fiscal est important. 
            À 40% ou 50%, vous pouvez passer dans une tranche d'imposition plus basse, 
            ce qui augmente vos revenus nets réels.
          </p>
          <p>
            Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur</a> pour calculer précisément l'impact fiscal 
            selon le taux de temps partiel choisi.
          </p>

          <h3>Limites liées aux conventions collectives ou contrats</h3>
          <p>
            Certaines conventions collectives ou contrats peuvent imposer des limites sur le temps partiel. 
            Vérifiez votre convention collective avant de négocier avec votre employeur.
          </p>

          <h2>Scénarios personnalisés</h2>
          
          <h3>Carrière longue vs carrière incomplète</h3>
          <p>
            Si vous avez une carrière longue avec tous vos trimestres, vous pouvez opter pour un temps partiel plus faible (40-50%) 
            pour maximiser votre temps libre tout en conservant des revenus confortables.
          </p>
          <p>
            Si votre carrière est incomplète, un temps partiel plus élevé (60-70%) peut vous permettre de continuer à valider 
            des trimestres tout en touchant une pension partielle.
          </p>

          <h3>Salariés cadres, non-cadres, multi‑régimes</h3>
          <p>
            Les cadres ont souvent des salaires plus élevés, ce qui peut rendre un temps partiel à 40-50% plus avantageux fiscalement. 
            Les non-cadres peuvent préférer 60-70% pour maintenir des revenus suffisants.
          </p>
          <p>
            Pour les personnes avec plusieurs régimes de retraite, le calcul est plus complexe. 
            Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur avancé</a> pour estimer vos revenus précisément.
          </p>

          <h2>FAQ : Questions fréquentes sur le temps partiel</h2>
          
          <div style={{ marginTop: '40px' }}>
            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Quel taux de temps partiel est le plus avantageux ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Il n'y a pas de taux "meilleur" universellement. Tout dépend de vos priorités : 
                si vous privilégiez le temps libre, optez pour 40-50%. Si vous voulez maximiser vos revenus, choisissez 70-80%. 
                Le taux 60% offre souvent le meilleur équilibre. Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur</a> pour comparer.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Peut-on changer de taux en cours de retraite progressive ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Oui, vous pouvez modifier votre taux de temps partiel, mais cela nécessite un nouvel accord avec votre employeur 
                et une nouvelle demande auprès de votre caisse de retraite. La pension partielle sera recalculée en fonction du nouveau taux.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Comment le choix du taux impacte-t-il la pension complémentaire ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Le taux de temps partiel impacte directement les cotisations à votre pension complémentaire (Agirc-Arrco, etc.). 
                Plus le temps partiel est faible, moins vous cotisez, mais vous continuez à acquérir des points. 
                La pension complémentaire sera calculée sur la base de vos points acquis.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Y a-t-il un seuil minimum pour bénéficier du dispositif ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Oui, le temps partiel doit être compris entre 40% et 80% de votre temps de travail habituel. 
                En dessous de 40%, vous ne pouvez pas bénéficier de la retraite progressive. 
                Au-dessus de 80%, vous êtes considéré comme étant à temps plein.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Quels sont les impacts sur l'impôt sur le revenu ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                La réduction de revenus peut vous faire passer dans une tranche d'imposition plus basse, 
                ce qui augmente vos revenus nets réels. À 40-50% de temps partiel, l'impact fiscal est généralement le plus important. 
                Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur</a> pour calculer précisément l'impact selon votre situation.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '40px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3 style={{ marginTop: 0 }}>💡 Besoin d'aide pour choisir votre temps partiel ?</h3>
            <p>
              Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb', fontWeight: 'bold' }}>simulateur de retraite progressive</a> pour comparer 
              les différents taux de temps partiel et trouver celui qui optimise vos revenus selon votre situation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TempsPartielRetraiteProgressivePage;

