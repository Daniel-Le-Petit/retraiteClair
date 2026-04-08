import React, { useEffect } from 'react';
import PageMetadata from '../components/PageMetadata';
import '../legal-styles.css';

const CasPratiquesRetraiteProgressivePage = () => {
  // Scroll vers le haut au chargement de la page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Retraite progressive : exemples concrets",
    "description": "Exemples concrets de retraite progressive : salarié cadre, temps partiel, carrière incomplète, multi-régimes. Simulations avant/après et conseils pratiques.",
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
      "@id": "https://retraiteclair.onrender.com/#/cas-pratiques-retraite-progressive"
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
        "name": "Retraite progressive : exemples concrets",
        "item": "https://retraiteclair.onrender.com/#/cas-pratiques-retraite-progressive"
      }
    ]
  };

  return (
    <>
      <PageMetadata
        title="Retraite progressive : exemples concrets | RetraiteClair"
        description="Retraite progressive : exemples concrets et cas pratiques pour salarié cadre, temps partiel, carrière incomplète, multi-régimes. Simulations avant/après."
        keywords="exemples retraite progressive, cas pratiques retraite progressive, simulation retraite progressive, salarié cadre retraite progressive"
        ogTitle="Retraite progressive : exemples concrets"
        ogDescription="Exemples concrets de retraite progressive : salarié cadre, temps partiel, carrière incomplète. Simulations avant/après."
        ogImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        ogUrl="https://retraiteclair.onrender.com/#/cas-pratiques-retraite-progressive"
        twitterTitle="Retraite progressive : exemples concrets"
        twitterDescription="Exemples concrets de retraite progressive : salarié cadre, temps partiel, carrière incomplète. Simulations avant/après."
        twitterImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        canonical="https://retraiteclair.onrender.com/#/cas-pratiques-retraite-progressive"
        structuredData={[structuredData]}
        breadcrumbData={breadcrumbData}
      />

      <div className="legal-page-container">
        <div className="legal-content">
          <nav className="breadcrumb" style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
            <a href="/#/" style={{ color: '#2563eb', textDecoration: 'none' }}>Accueil</a>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>Retraite progressive : exemples concrets</span>
          </nav>

          <h1>Retraite progressive : exemples concrets</h1>
          
          <p className="lead">
            Découvrez des exemples concrets de retraite progressive adaptés à différentes situations : 
            salarié cadre, temps partiel, carrière incomplète, multi-régimes. 
            Ces cas pratiques vous aident à mieux comprendre l'impact de la retraite progressive sur vos revenus.
          </p>

          <h2>Salarié cadre à 60 ans</h2>
          
          <h3>Profil : Marie, 63 ans, cadre commerciale</h3>
          <p>
            <strong>Situation initiale :</strong>
          </p>
          <ul>
            <li>Âge : 63 ans</li>
            <li>Salaire brut : 4 500 €/mois</li>
            <li>Salaire net : ~3 500 €/mois</li>
            <li>Trimestres validés : 168/172 (il en manque 4)</li>
            <li>Pension au taux plein estimée : 1 800 €/mois</li>
            <li>Statut : Cadre, secteur privé</li>
          </ul>

          <h3>Temps partiel 60%, impact sur salaire et pension</h3>
          <p>
            Marie opte pour une retraite progressive à 60% de temps partiel :
          </p>
          <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '8px', margin: '20px 0' }}>
            <p><strong>Simulation après retraite progressive :</strong></p>
            <ul>
              <li><strong>Salaire brut</strong> : 2 700 €/mois (60% de 4 500 €)</li>
              <li><strong>Salaire net</strong> : ~2 100 €/mois</li>
              <li><strong>Pension partielle</strong> : ~720 €/mois (40% de 1 800 €)</li>
              <li><strong>Revenus totaux</strong> : ~2 820 €/mois</li>
              <li><strong>Impôt estimé</strong> : ~250 €/mois</li>
              <li><strong>Revenus nets après impôts</strong> : ~2 570 €/mois</li>
            </ul>
            <p style={{ marginTop: '10px' }}>
              <strong>Impact :</strong> Perte de ~930 €/mois mais gain de 2 jours de temps libre par semaine.
            </p>
          </div>

          <h3>Simulation avant/après</h3>
          <div style={{ overflowX: 'auto', margin: '20px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Critère</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Avant</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Après (60%)</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Écart</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Salaire net</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>3 500 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>2 100 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#dc2626' }}>-1 400 €</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Pension</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>0 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>720 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#059669' }}>+720 €</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Revenus totaux</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>3 500 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>2 820 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#dc2626' }}>-680 €</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Impôt</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~500 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~250 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#059669' }}>-250 €</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}><strong>Revenus nets</strong></td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}><strong>~3 000 €</strong></td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}><strong>~2 570 €</strong></td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#dc2626' }}><strong>-430 €</strong></td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Temps libre</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Week-ends</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>+2 jours/semaine</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', color: '#059669' }}>+40%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Salarié à temps partiel</h2>
          
          <h3>Profil : Jean, 64 ans, employé administratif</h3>
          <p>
            <strong>Situation initiale :</strong>
          </p>
          <ul>
            <li>Âge : 64 ans</li>
            <li>Salaire brut : 2 200 €/mois (déjà à 80% de temps partiel)</li>
            <li>Salaire net : ~1 700 €/mois</li>
            <li>Trimestres validés : 170/172 (il en manque 2)</li>
            <li>Pension au taux plein estimée : 1 200 €/mois</li>
            <li>Statut : Employé, secteur privé</li>
          </ul>

          <h3>Ajustement du pourcentage, évolution de la pension</h3>
          <p>
            Jean souhaite réduire encore son temps de travail et passe à 50% :
          </p>
          <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '8px', margin: '20px 0' }}>
            <p><strong>Simulation après ajustement à 50% :</strong></p>
            <ul>
              <li><strong>Salaire brut</strong> : 1 375 €/mois (50% de 2 750 € équivalent temps plein)</li>
              <li><strong>Salaire net</strong> : ~1 050 €/mois</li>
              <li><strong>Pension partielle</strong> : ~600 €/mois (50% de 1 200 €)</li>
              <li><strong>Revenus totaux</strong> : ~1 650 €/mois</li>
              <li><strong>Impôt estimé</strong> : ~100 €/mois</li>
              <li><strong>Revenus nets après impôts</strong> : ~1 550 €/mois</li>
            </ul>
            <p style={{ marginTop: '10px' }}>
              <strong>Impact :</strong> Perte de ~150 €/mois mais gain d'un jour supplémentaire de temps libre.
            </p>
          </div>

          <h3>Gestion fiscale et cotisations</h3>
          <p>
            À 50% de temps partiel, Jean passe dans une tranche d'imposition plus basse, 
            ce qui réduit son impôt de ~150 €/mois. Cette économie d'impôt compense partiellement la perte de revenus.
          </p>
          <p>
            Les cotisations sociales sont réduites proportionnellement au temps partiel, 
            mais Jean continue à valider des trimestres pour sa retraite définitive.
          </p>

          <h2>Carrière incomplète ou multi‑régimes</h2>
          
          <h3>Profil : Sophie, 62 ans, carrière incomplète</h3>
          <p>
            <strong>Situation initiale :</strong>
          </p>
          <ul>
            <li>Âge : 62 ans</li>
            <li>Salaire brut : 2 800 €/mois</li>
            <li>Salaire net : ~2 200 €/mois</li>
            <li>Trimestres validés : 160/172 (il en manque 12)</li>
            <li>Pension au taux plein estimée : 1 400 €/mois</li>
            <li>Statut : Salariée, plusieurs périodes d'inactivité</li>
          </ul>

          <h3>Trimestres manquants, solutions possibles</h3>
          <p>
            Sophie a plusieurs options :
          </p>
          <ul>
            <li><strong>Option 1 : Retraite progressive à 60%</strong> - Continue à valider des trimestres tout en touchant une pension partielle</li>
            <li><strong>Option 2 : Attendre 67 ans</strong> - Partir au taux plein automatique sans décote</li>
            <li><strong>Option 3 : Rachat de trimestres</strong> - Racheter les trimestres manquants</li>
          </ul>

          <h3>Comparatif gains nets selon scénario</h3>
          <div style={{ overflowX: 'auto', margin: '20px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Scénario</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Revenus/mois</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Trimestres validés</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Avantage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Retraite progressive 60%</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~1 900 €</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Continue</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Valide trimestres + revenus</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Attendre 67 ans</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>2 200 € (jusqu'à 67 ans)</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Continue</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Taux plein sans décote</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Partir maintenant</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>~1 050 € (avec décote)</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Arrêt</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Aucun</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Recommandation :</strong> La retraite progressive à 60% permet de continuer à valider des trimestres 
            tout en touchant une pension partielle, ce qui optimise les revenus à long terme.
          </p>

          <h3>Multi-régimes : addition des trimestres</h3>
          <p>
            Si vous avez cotisé à plusieurs régimes (salarié + indépendant, France + étranger), 
            vos trimestres sont additionnés pour le calcul de votre pension de base. 
            Chaque régime complémentaire (Agirc-Arrco, CIPAV, etc.) calcule sa propre pension.
          </p>
          <p>
            Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur avancé</a> pour estimer précisément 
            vos revenus en cas de multi-régimes.
          </p>

          <h2>FAQ : Questions fréquentes sur les cas pratiques</h2>
          
          <div style={{ marginTop: '40px' }}>
            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Peut-on débuter une retraite progressive avec une carrière incomplète ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Oui, vous pouvez débuter une retraite progressive même avec une carrière incomplète, 
                à condition d'avoir validé suffisamment de trimestres pour avoir droit à une pension. 
                La retraite progressive vous permet de continuer à valider des trimestres tout en touchant une pension partielle, 
                ce qui peut être avantageux pour compléter votre carrière.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Comment gérer plusieurs régimes de retraite ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Si vous avez plusieurs régimes, vos trimestres sont additionnés pour la pension de base. 
                Chaque régime complémentaire calcule sa propre pension. 
                Vous devez faire une demande de retraite progressive auprès de chaque régime concerné. 
                Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur avancé</a> pour estimer vos revenus totaux.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Quels outils pour simuler chaque scénario ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur de retraite progressive</a> vous permet de simuler 
                différents scénarios : temps partiel, âge de départ, carrière incomplète, multi-régimes. 
                Vous pouvez comparer les revenus, l'impact fiscal et choisir le scénario qui optimise vos revenus.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Les profils atypiques peuvent-ils bénéficier du dispositif ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Oui, la retraite progressive est accessible à tous les profils qui remplissent les conditions d'éligibilité : 
                salariés, fonctionnaires, indépendants, multi-régimes, carrières incomplètes, etc. 
                Chaque situation est unique, utilisez notre <a href="/#/suis-je-eligible" style={{ color: '#2563eb' }}>questionnaire d'éligibilité</a> 
                pour vérifier votre situation.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Quels sont les avantages réels pour chaque type de salarié ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Les avantages varient selon le profil : cadres (optimisation fiscale importante), 
                non-cadres (maintien de revenus suffisants), carrières incomplètes (validation de trimestres), 
                multi-régimes (optimisation globale). Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur</a> 
                pour estimer les avantages selon votre situation spécifique.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '40px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3 style={{ marginTop: 0 }}>💡 Besoin de simuler votre situation ?</h3>
            <p>
              Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb', fontWeight: 'bold' }}>simulateur de retraite progressive</a> pour 
              simuler votre situation spécifique et comparer différents scénarios selon votre profil.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CasPratiquesRetraiteProgressivePage;

