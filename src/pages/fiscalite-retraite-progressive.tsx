import React, { useEffect } from 'react';
import PageMetadata from '../components/PageMetadata';
import '../legal-styles.css';

const FiscaliteRetraiteProgressivePage = () => {
  // Scroll vers le haut au chargement de la page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Retraite progressive et fiscalité : ce que vous devez savoir",
    "description": "Guide complet sur la fiscalité de la retraite progressive : impôts, cotisations sociales, pensions complémentaires, optimisations fiscales et conseils pratiques.",
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
      "@id": "https://retraiteclair.onrender.com/#/fiscalite-retraite-progressive"
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
        "name": "Retraite progressive et fiscalité : ce que vous devez savoir",
        "item": "https://retraiteclair.onrender.com/#/fiscalite-retraite-progressive"
      }
    ]
  };

  return (
    <>
      <PageMetadata
        title="Retraite progressive et fiscalité : ce que vous devez savoir | RetraiteClair"
        description="Retraite progressive et fiscalité : guide complet sur les impôts, cotisations sociales, pensions complémentaires et optimisations fiscales en 2025."
        keywords="fiscalité retraite progressive, impôts retraite progressive, cotisations retraite progressive, pension complémentaire, optimisation fiscale retraite"
        ogTitle="Retraite progressive et fiscalité : ce que vous devez savoir"
        ogDescription="Guide complet sur la fiscalité de la retraite progressive : impôts, cotisations, pensions complémentaires et optimisations."
        ogImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        ogUrl="https://retraiteclair.onrender.com/#/fiscalite-retraite-progressive"
        twitterTitle="Retraite progressive et fiscalité : ce que vous devez savoir"
        twitterDescription="Guide complet sur la fiscalité de la retraite progressive : impôts, cotisations, pensions complémentaires et optimisations."
        twitterImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        canonical="https://retraiteclair.onrender.com/#/fiscalite-retraite-progressive"
        structuredData={[structuredData]}
        breadcrumbData={breadcrumbData}
      />

      <div className="legal-page-container">
        <div className="legal-content">
          <nav className="breadcrumb" style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
            <a href="/#/" style={{ color: '#2563eb', textDecoration: 'none' }}>Accueil</a>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>Retraite progressive et fiscalité : ce que vous devez savoir</span>
          </nav>

          <h1>Retraite progressive et fiscalité : ce que vous devez savoir</h1>
          
          <p className="lead">
            La retraite progressive a un impact important sur votre fiscalité. 
            Comprendre ces impacts vous permet d'optimiser vos revenus nets et de faire les meilleurs choix pour votre situation.
          </p>

          <h2>Impôts et cotisations</h2>
          
          <h3>Retraite partielle imposable selon le barème</h3>
          <p>
            La pension partielle de retraite progressive est imposable au barème progressif de l'impôt sur le revenu, 
            comme toute pension de retraite. Elle s'ajoute à votre salaire partiel pour former votre revenu imposable total.
          </p>
          <p>
            Exemple : Si vous touchez 1 400 € de salaire net et 700 € de pension partielle, 
            votre revenu imposable est de 2 100 €/mois (25 200 €/an).
          </p>

          <h3>Impact sur cotisations sociales</h3>
          <p>
            En retraite progressive, vous continuez à cotiser sur votre salaire partiel, mais pas sur votre pension partielle. 
            Les cotisations sont calculées uniquement sur votre salaire, ce qui réduit le montant des cotisations par rapport au temps plein.
          </p>
          <div className="info-box success">
            <strong>💡 Exemple de calcul des cotisations</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              <li>Salaire temps plein : 3 000 € brut → cotisations ~700 €</li>
              <li>Salaire temps partiel 60% : 1 800 € brut → cotisations ~420 €</li>
              <li><strong>Économie de cotisations : ~280 €/mois</strong></li>
            </ul>
          </div>

          <h3>Cumul emploi-retraite et fiscalité</h3>
          <p>
            Le cumul emploi-retraite en retraite progressive est autorisé et fiscalement avantageux. 
            Votre revenu total (salaire + pension) est imposé selon le barème progressif, 
            mais la réduction de revenus peut vous faire passer dans une tranche d'imposition plus basse.
          </p>
          <p>
            Cette réduction d'impôt s'ajoute à vos revenus nets, améliorant votre pouvoir d'achat réel.
          </p>

          <h2>Pensions complémentaires</h2>
          
          <h3>Comment la retraite progressive influence les régimes Agirc-Arrco, CIPAV, etc.</h3>
          <p>
            En retraite progressive, vous continuez à cotiser à votre pension complémentaire sur la base de votre salaire partiel. 
            Vous acquérez donc moins de points qu'à temps plein, mais vous continuez à améliorer votre retraite complémentaire.
          </p>
          <p>
            Les régimes complémentaires principaux sont :
          </p>
          <ul>
            <li><strong>Agirc-Arrco</strong> : pour les salariés du secteur privé</li>
            <li><strong>CIPAV</strong> : pour les professions libérales</li>
            <li><strong>IRCANTEC</strong> : pour les contractuels de la fonction publique</li>
            <li><strong>Autres régimes</strong> : selon votre statut</li>
          </ul>

          <h3>Calcul des points partiels</h3>
          <p>
            Le nombre de points acquis dépend de votre salaire brut et du taux de cotisation. 
            À temps partiel, vous cotisez moins, donc vous acquérez moins de points, mais proportionnellement à votre temps de travail.
          </p>
          <div className="info-box info">
            <strong>📊 Exemple : Acquisition de points Agirc-Arrco</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              <li>Temps plein (3 000 € brut) : ~12 points/mois</li>
              <li>Temps partiel 60% (1 800 € brut) : ~7 points/mois</li>
              <li>Vous continuez à acquérir des points, mais à un rythme réduit</li>
            </ul>
          </div>

          <h2>Conseils pratiques</h2>
          
          <h3>Optimiser ses revenus nets</h3>
          <p>
            Pour optimiser vos revenus nets en retraite progressive :
          </p>
          <ul>
            <li><strong>Choisir le bon taux de temps partiel</strong> : 40-50% offre souvent le meilleur équilibre fiscal</li>
            <li><strong>Calculer l'impact fiscal</strong> : utilisez notre simulateur pour estimer vos revenus nets</li>
            <li><strong>Tenir compte des économies d'impôts</strong> : les économies d'impôts augmentent vos revenus nets réels</li>
            <li><strong>Optimiser les déductions</strong> : vérifiez vos droits aux réductions et crédits d'impôt</li>
          </ul>

          <h3>Utiliser le simulateur pour évaluer les impacts fiscaux</h3>
          <p>
            Notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur de retraite progressive</a> calcule automatiquement :
          </p>
          <ul>
            <li>Vos revenus bruts et nets</li>
            <li>Votre impôt sur le revenu</li>
            <li>Vos cotisations sociales</li>
            <li>Vos revenus nets après impôts</li>
            <li>L'impact fiscal de la retraite progressive</li>
          </ul>
          <p>
            Utilisez-le pour comparer différents scénarios et trouver celui qui optimise vos revenus nets.
          </p>

          <h2>Tableau comparatif : Impact fiscal selon le temps partiel</h2>
          
          <div style={{ overflowX: 'auto', margin: '2rem 0' }}>
            <table>
              <thead>
                <tr>
                  <th>Temps partiel</th>
                  <th>Revenus totaux</th>
                  <th>Impôt estimé*</th>
                  <th>Revenus nets</th>
                  <th>Économie d'impôt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Temps plein</strong></td>
                  <td>2 300 €</td>
                  <td>~350 €</td>
                  <td>~1 950 €</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><strong>80%</strong></td>
                  <td>~2 700 €</td>
                  <td>~300 €</td>
                  <td>~2 400 €</td>
                  <td style={{ color: '#059669', fontWeight: '600' }}>~50 €</td>
                </tr>
                <tr>
                  <td><strong>60%</strong></td>
                  <td>~2 100 €</td>
                  <td>~200 €</td>
                  <td>~1 900 €</td>
                  <td style={{ color: '#059669', fontWeight: '600' }}>~150 €</td>
                </tr>
                <tr>
                  <td><strong>50%</strong></td>
                  <td>~1 850 €</td>
                  <td>~150 €</td>
                  <td>~1 700 €</td>
                  <td style={{ color: '#059669', fontWeight: '600' }}>~200 €</td>
                </tr>
                <tr>
                  <td><strong>40%</strong></td>
                  <td>~1 550 €</td>
                  <td>~100 €</td>
                  <td>~1 450 €</td>
                  <td style={{ color: '#059669', fontWeight: '600' }}>~250 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem', fontStyle: 'italic' }}>
            * Impôt estimé pour un célibataire sans enfants. Les montants peuvent varier selon votre situation.
          </p>

          <h2>FAQ : Questions fréquentes sur la fiscalité</h2>
          
          <div style={{ marginTop: '3rem' }}>
            <div className="faq-item">
              <h3>La retraite progressive est-elle imposable ?</h3>
              <p>
                Oui, la pension partielle de retraite progressive est imposable au barème progressif de l'impôt sur le revenu, 
                comme toute pension de retraite. Elle s'ajoute à votre salaire partiel pour former votre revenu imposable total. 
                Cependant, la réduction de revenus peut vous faire passer dans une tranche d'imposition plus basse, 
                ce qui réduit votre impôt total.
              </p>
            </div>

            <div className="faq-item">
              <h3>Comment calculer la part complémentaire ?</h3>
              <p>
                La pension complémentaire est calculée sur la base des points acquis tout au long de votre carrière. 
                En retraite progressive, vous continuez à acquérir des points sur votre salaire partiel. 
                Le nombre de points acquis est proportionnel à votre temps de travail. 
                Contactez votre caisse complémentaire pour connaître le nombre de points nécessaires et le montant de votre pension.
              </p>
            </div>

            <div className="faq-item">
              <h3>Peut-on cumuler avec d'autres revenus ?</h3>
              <p>
                Oui, vous pouvez cumuler votre retraite progressive avec d'autres revenus (location, placements, etc.). 
                Tous ces revenus s'ajoutent pour former votre revenu imposable total. 
                Attention aux plafonds de revenus qui peuvent impacter certaines prestations sociales ou avantages fiscaux.
              </p>
            </div>

            <div className="faq-item">
              <h3>Quelles sont les erreurs fréquentes sur la fiscalité ?</h3>
              <p>
                Les erreurs fréquentes sont : ne pas déclarer la pension partielle, oublier de déclarer les autres revenus, 
                ne pas tenir compte des économies d'impôts dans le calcul des revenus nets, 
                ou ne pas utiliser le simulateur pour estimer précisément l'impact fiscal. 
                Utilisez notre <a href="/#/simulateurs">simulateur</a> pour éviter ces erreurs.
              </p>
            </div>

            <div className="faq-item">
              <h3>Existe-t-il des exonérations ou réductions possibles ?</h3>
              <p>
                Il n'y a pas d'exonération spécifique pour la retraite progressive, mais vous pouvez bénéficier des réductions 
                et crédits d'impôt classiques (dons, travaux, etc.). La principale "réduction" vient du fait que la baisse de revenus 
                peut vous faire passer dans une tranche d'imposition plus basse, réduisant ainsi votre impôt total.
              </p>
            </div>
          </div>

          <div className="info-box info" style={{ marginTop: '3rem' }}>
            <strong>💡 Besoin d'aide pour optimiser votre fiscalité ?</strong>
            <p style={{ marginTop: '0.75rem', marginBottom: 0 }}>
              Utilisez notre <a href="/#/simulateurs">simulateur de retraite progressive</a> pour calculer 
              précisément l'impact fiscal selon votre situation et optimiser vos revenus nets.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiscaliteRetraiteProgressivePage;

