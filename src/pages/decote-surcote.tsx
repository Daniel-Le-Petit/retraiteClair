import React, { useEffect } from 'react';
import PageMetadata from '../components/PageMetadata';
import '../legal-styles.css';

const DecoteSurcotePage = () => {
  // Scroll vers le haut au chargement de la page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Comment fonctionne la décote et la surcote ?",
    "description": "Guide complet sur la décote et la surcote en retraite : calcul, impact sur votre pension, et stratégies d'optimisation.",
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
      "@id": "https://retraiteclair.onrender.com/#/decote-surcote"
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
        "name": "Comment fonctionne la décote et la surcote ?",
        "item": "https://retraiteclair.onrender.com/#/decote-surcote"
      }
    ]
  };

  return (
    <>
      <PageMetadata
        title="Comment fonctionne la décote et la surcote ? Guide 2025 | RetraiteClair"
        description="Comment fonctionne la décote et la surcote ? Découvrez comment ces mécanismes impactent votre pension de retraite et comment optimiser votre départ."
        keywords="décote retraite, surcote retraite, calcul décote, calcul surcote, impact pension"
        ogTitle="Comment fonctionne la décote et la surcote ? Guide 2025"
        ogDescription="Comment fonctionne la décote et la surcote ? Découvrez comment ces mécanismes impactent votre pension de retraite et comment optimiser votre départ."
        ogImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        ogUrl="https://retraiteclair.onrender.com/#/decote-surcote"
        twitterTitle="Comment fonctionne la décote et la surcote ? Guide 2025"
        twitterDescription="Comment fonctionne la décote et la surcote ? Découvrez comment ces mécanismes impactent votre pension de retraite et comment optimiser votre départ."
        twitterImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        canonical="https://retraiteclair.onrender.com/#/decote-surcote"
        structuredData={[structuredData]}
        breadcrumbData={breadcrumbData}
      />

      <div className="legal-page-container">
        <div className="legal-content">
          <nav className="breadcrumb" style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
            <a href="/#/" style={{ color: '#2563eb', textDecoration: 'none' }}>Accueil</a>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>Comment fonctionne la décote et la surcote ?</span>
          </nav>

          <h1>Comment fonctionne la décote et la surcote ?</h1>
          
          <p className="lead">
            La décote et la surcote sont deux mécanismes qui ajustent le montant de votre pension de retraite 
            selon votre âge de départ et le nombre de trimestres validés. 
            Comprendre ces mécanismes est essentiel pour optimiser votre départ à la retraite.
          </p>

          <h2>Qu'est-ce que la décote ?</h2>
          
          <p>
            La décote est une <strong>réduction du montant de votre pension</strong> si vous partez à la retraite 
            avant d'avoir validé tous les trimestres requis ou avant l'âge du taux plein automatique.
          </p>

          <h3>Quand s'applique la décote ?</h3>
          <ul>
            <li>Vous partez avant l'âge du taux plein automatique (67 ans en 2025)</li>
            <li>ET vous n'avez pas validé tous les trimestres requis pour votre génération</li>
            <li>La décote s'applique alors au taux de votre pension</li>
          </ul>

          <h3>Comment calculer la décote ?</h3>
          <p>La décote est calculée de deux façons, et c'est la moins pénalisante qui s'applique :</p>
          
          <h4>1. Décote sur l'âge</h4>
          <ul>
            <li><strong>0,625% par trimestre manquant</strong> avant l'âge du taux plein (67 ans)</li>
            <li>Maximum : <strong>25% de réduction</strong> (soit 40 trimestres × 0,625%)</li>
            <li>Exemple : si vous partez à 65 ans (8 trimestres avant 67 ans), la décote est de 8 × 0,625% = 5%</li>
          </ul>

          <h4>2. Décote sur les trimestres</h4>
          <ul>
            <li><strong>1,25% par trimestre manquant</strong> par rapport au nombre requis</li>
            <li>Maximum : <strong>25% de réduction</strong> (soit 20 trimestres × 1,25%)</li>
            <li>Exemple : si vous manquez 4 trimestres, la décote est de 4 × 1,25% = 5%</li>
          </ul>

          <h3>Exemple concret de décote</h3>
          <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', margin: '20px 0' }}>
            <p><strong>Cas :</strong> Vous partez à 64 ans avec 160 trimestres validés (il vous en manque 4 pour le taux plein)</p>
            <ul>
              <li>Décote sur l'âge : 12 trimestres avant 67 ans × 0,625% = <strong>7,5%</strong></li>
              <li>Décote sur les trimestres : 4 trimestres manquants × 1,25% = <strong>5%</strong></li>
              <li><strong>Décote appliquée : 5%</strong> (la moins pénalisante)</li>
            </ul>
            <p>Si votre pension au taux plein était de 1 500 €, avec la décote elle sera de 1 500 € × 0,95 = <strong>1 425 €</strong></p>
          </div>

          <h2>Qu'est-ce que la surcote ?</h2>
          
          <p>
            La surcote est une <strong>augmentation du montant de votre pension</strong> si vous continuez à travailler 
            après avoir atteint le taux plein (tous les trimestres requis ET l'âge du taux plein).
          </p>

          <h3>Quand s'applique la surcote ?</h3>
          <ul>
            <li>Vous avez validé tous les trimestres requis pour votre génération</li>
            <li>ET vous avez atteint l'âge du taux plein automatique (67 ans)</li>
            <li>ET vous continuez à travailler et à cotiser</li>
          </ul>

          <h3>Comment calculer la surcote ?</h3>
          <ul>
            <li><strong>0,75% par trimestre supplémentaire</strong> travaillé après le taux plein</li>
            <li>Maximum : <strong>12% d'augmentation</strong> (soit 16 trimestres × 0,75%)</li>
            <li>Exemple : si vous travaillez 4 trimestres supplémentaires, la surcote est de 4 × 0,75% = 3%</li>
          </ul>

          <h3>Exemple concret de surcote</h3>
          <div style={{ padding: '15px', background: '#f0f9ff', borderRadius: '8px', margin: '20px 0' }}>
            <p><strong>Cas :</strong> Vous avez 67 ans, tous vos trimestres validés, et vous continuez à travailler 2 ans (8 trimestres)</p>
            <ul>
              <li>Surcote : 8 trimestres × 0,75% = <strong>6% d'augmentation</strong></li>
            </ul>
            <p>Si votre pension au taux plein était de 1 500 €, avec la surcote elle sera de 1 500 € × 1,06 = <strong>1 590 €</strong></p>
          </div>

          <h2>Décote vs Surcote : quel impact sur votre pension ?</h2>
          
          <h3>Tableau comparatif</h3>
          <div style={{ overflowX: 'auto', margin: '20px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Situation</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Impact</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Exemple (pension 1 500 €)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Décote maximale (-25%)</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#dc2626' }}>-25%</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>1 125 €</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Décote modérée (-5%)</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#dc2626' }}>-5%</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>1 425 €</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Taux plein (0%)</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>0%</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>1 500 €</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Surcote modérée (+3%)</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#059669' }}>+3%</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>1 545 €</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Surcote maximale (+12%)</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#059669' }}>+12%</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>1 680 €</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Comment éviter la décote ?</h2>
          
          <h3>Stratégies pour éviter la décote</h3>
          <ul>
            <li><strong>Attendre l'âge du taux plein</strong> : si vous manquez des trimestres, attendez 67 ans</li>
            <li><strong>Valider des trimestres supplémentaires</strong> : rachetez des trimestres ou continuez à travailler</li>
            <li><strong>Opter pour la retraite progressive</strong> : continuez à cotiser tout en réduisant votre activité</li>
            <li><strong>Vérifier vos trimestres</strong> : consultez votre relevé de carrière pour identifier les trimestres manquants</li>
          </ul>

          <h2>Comment maximiser la surcote ?</h2>
          
          <h3>Stratégies pour maximiser la surcote</h3>
          <ul>
            <li><strong>Continuer à travailler après le taux plein</strong> : chaque trimestre supplémentaire augmente votre pension</li>
            <li><strong>Opter pour la retraite progressive</strong> : travaillez à temps partiel tout en touchant une pension partielle</li>
            <li><strong>Calculer le point d'équilibre</strong> : comparez le gain de surcote avec les revenus du travail</li>
          </ul>

          <h2>Conclusion</h2>
          
          <p>
            La décote et la surcote sont des mécanismes importants qui impactent directement le montant de votre pension. 
            Pour optimiser votre départ à la retraite, utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur gratuit</a> 
            qui calcule automatiquement l'impact de la décote et de la surcote sur vos revenus.
          </p>

          <div style={{ marginTop: '40px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3 style={{ marginTop: 0 }}>💡 Besoin d'aide ?</h3>
            <p>
              Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb', fontWeight: 'bold' }}>simulateur de retraite progressive</a> pour estimer l'impact de la décote et de la surcote sur votre pension, 
              ou consultez notre <a href="/#/guide-retraite-2025" style={{ color: '#2563eb', fontWeight: 'bold' }}>guide complet 2025</a> pour plus d'informations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DecoteSurcotePage;


