import React, { useEffect } from 'react';
import PageMetadata from '../components/PageMetadata';
import '../legal-styles.css';

const StatutRetraiteProgressivePage = () => {
  // Scroll vers le haut au chargement de la page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Retraite progressive selon votre statut",
    "description": "Guide complet sur la retraite progressive selon votre statut : fonction publique, indépendants, auto-entrepreneurs, multi-caisses, expatriés. Conditions spécifiques et démarches.",
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
      "@id": "https://retraiteclair.onrender.com/#/statut-retraite-progressive"
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
        "name": "Retraite progressive selon votre statut",
        "item": "https://retraiteclair.onrender.com/#/statut-retraite-progressive"
      }
    ]
  };

  return (
    <>
      <PageMetadata
        title="Retraite progressive selon votre statut | RetraiteClair"
        description="Retraite progressive selon votre statut : fonction publique, indépendants, auto-entrepreneurs, multi-caisses, expatriés. Conditions spécifiques et démarches en 2025."
        keywords="retraite progressive fonction publique, retraite progressive indépendant, retraite progressive auto-entrepreneur, retraite progressive expatrié, multi-caisses retraite"
        ogTitle="Retraite progressive selon votre statut"
        ogDescription="Guide complet sur la retraite progressive selon votre statut : fonction publique, indépendants, expatriés. Conditions et démarches."
        ogImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        ogUrl="https://retraiteclair.onrender.com/#/statut-retraite-progressive"
        twitterTitle="Retraite progressive selon votre statut"
        twitterDescription="Guide complet sur la retraite progressive selon votre statut : fonction publique, indépendants, expatriés. Conditions et démarches."
        twitterImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        canonical="https://retraiteclair.onrender.com/#/statut-retraite-progressive"
        structuredData={[structuredData]}
        breadcrumbData={breadcrumbData}
      />

      <div className="legal-page-container">
        <div className="legal-content">
          <nav className="breadcrumb" style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
            <a href="/#/" style={{ color: '#2563eb', textDecoration: 'none' }}>Accueil</a>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>Retraite progressive selon votre statut</span>
          </nav>

          <h1>Retraite progressive selon votre statut</h1>
          
          <p className="lead">
            La retraite progressive s'adapte à différents statuts professionnels : fonction publique, indépendants, 
            auto-entrepreneurs, multi-caisses, expatriés. Chaque statut a ses spécificités et ses conditions. 
            Ce guide vous explique les particularités selon votre situation.
          </p>

          <h2>Fonction publique</h2>
          
          <h3>Conditions spécifiques</h3>
          <p>
            Les fonctionnaires peuvent bénéficier de la retraite progressive sous certaines conditions :
          </p>
          <ul>
            <li>Avoir atteint l'âge légal de départ à la retraite (62 ans) ou l'âge du taux plein (67 ans)</li>
            <li>Avoir validé suffisamment de trimestres pour avoir droit à une pension</li>
            <li>Obtenir l'accord de l'administration pour passer à temps partiel</li>
            <li>Travailler entre 40% et 80% de votre temps de travail habituel</li>
          </ul>

          <h3>Exceptions et particularités</h3>
          <p>
            La fonction publique a quelques particularités :
          </p>
          <ul>
            <li><strong>Régimes spécifiques</strong> : CNRACL (territoriaux), RAFP (fonctionnaires d'État), etc.</li>
            <li><strong>Accord hiérarchique</strong> : L'accord doit être donné par votre supérieur hiérarchique</li>
            <li><strong>Organisation du service</strong> : L'administration doit pouvoir s'organiser sans vous</li>
            <li><strong>Pension complémentaire</strong> : Calcul spécifique selon votre régime (CNRACL, RAFP, etc.)</li>
          </ul>

          <h3>Démarches</h3>
          <p>
            Les démarches pour les fonctionnaires :
          </p>
          <ol>
            <li>Vérifier votre éligibilité avec notre <a href="/#/suis-je-eligible" style={{ color: '#2563eb' }}>questionnaire</a></li>
            <li>Demander l'accord de votre supérieur hiérarchique</li>
            <li>Remplir le formulaire de demande de temps partiel</li>
            <li>Faire la demande de retraite progressive auprès de votre caisse (CNRACL, RAFP, etc.)</li>
            <li>Joindre les documents nécessaires (avis de situation, accord hiérarchique, etc.)</li>
          </ol>

          <h2>Indépendants / auto-entrepreneurs</h2>
          
          <h3>Conditions d'éligibilité</h3>
          <p>
            Les indépendants et auto-entrepreneurs peuvent bénéficier de la retraite progressive si :
          </p>
          <ul>
            <li>Ils ont atteint l'âge légal (62 ans) ou l'âge du taux plein (67 ans)</li>
            <li>Ils ont validé suffisamment de trimestres</li>
            <li>Ils réduisent leur activité entre 40% et 80%</li>
            <li>Ils continuent à cotiser à leur régime de retraite</li>
          </ul>

          <h3>Cotisations et droits</h3>
          <p>
            En retraite progressive, les indépendants continuent à cotiser sur leur chiffre d'affaires réduit :
          </p>
          <ul>
            <li><strong>Cotisations proportionnelles</strong> : Les cotisations sont calculées sur le CA réduit</li>
            <li><strong>Validation de trimestres</strong> : Vous continuez à valider des trimestres</li>
            <li><strong>Pension partielle</strong> : Vous touchez une pension partielle selon votre activité réduite</li>
            <li><strong>Régimes complémentaires</strong> : CIPAV, SSI, etc. selon votre profession</li>
          </ul>

          <h3>Simulateurs adaptés</h3>
          <p>
            Les indépendants doivent utiliser des simulateurs spécifiques car le calcul est différent :
          </p>
          <ul>
            <li>Calcul basé sur le chiffre d'affaires et non le salaire</li>
            <li>Cotisations variables selon le régime (CIPAV, SSI, etc.)</li>
            <li>Pension complémentaire spécifique à chaque profession</li>
          </ul>
          <p>
            Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur avancé</a> en précisant votre statut d'indépendant 
            pour obtenir une estimation précise.
          </p>

          <h2>Multi-caisses / expatriés</h2>
          
          <h3>Addition des trimestres</h3>
          <p>
            Si vous avez cotisé à plusieurs caisses (France + étranger, plusieurs régimes français), 
            vos trimestres sont additionnés pour le calcul de votre pension de base :
          </p>
          <ul>
            <li><strong>Trimestres français</strong> : Tous les trimestres validés en France sont additionnés</li>
            <li><strong>Trimestres européens</strong> : Les trimestres validés dans l'UE sont pris en compte</li>
            <li><strong>Conventions bilatérales</strong> : Certains pays ont des conventions avec la France</li>
            <li><strong>Calcul de la pension</strong> : Chaque régime calcule sa part de pension</li>
          </ul>

          <h3>Droits à la retraite partielle</h3>
          <p>
            Pour bénéficier de la retraite progressive avec plusieurs caisses :
          </p>
          <ul>
            <li>Vous devez remplir les conditions d'éligibilité pour chaque régime</li>
            <li>Vous devez faire une demande auprès de chaque caisse concernée</li>
            <li>Chaque caisse calcule sa pension partielle</li>
            <li>Les pensions s'additionnent pour former votre revenu total</li>
          </ul>

          <h3>Formulaires spécifiques</h3>
          <p>
            Les expatriés et personnes avec plusieurs caisses doivent :
          </p>
          <ul>
            <li>Fournir des justificatifs de trimestres validés dans chaque pays/régime</li>
            <li>Remplir les formulaires spécifiques à chaque caisse</li>
            <li>Joindre les traductions certifiées des documents étrangers si nécessaire</li>
            <li>Respecter les délais de traitement de chaque caisse</li>
          </ul>

          <h2>Tableau comparatif : Spécificités par statut</h2>
          
          <div style={{ overflowX: 'auto', margin: '20px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Statut</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Régime</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Particularités</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Démarches</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Fonctionnaire territorial</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>CNRACL</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Accord hiérarchique obligatoire</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Formulaire CNRACL + accord</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Fonctionnaire d'État</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>RAFP</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Régime spécifique État</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Formulaire RAFP</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Indépendant</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>CIPAV, SSI, etc.</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Calcul sur CA réduit</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Formulaire régime spécifique</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Auto-entrepreneur</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>RSI, URSSAF</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Cotisations sur CA réduit</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Déclaration activité réduite</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Multi-caisses</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Plusieurs régimes</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Addition des trimestres</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Demande à chaque caisse</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Expatrié</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Conventions bilatérales</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Trimestres étrangers pris en compte</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Justificatifs traduits</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>FAQ : Questions fréquentes selon le statut</h2>
          
          <div style={{ marginTop: '40px' }}>
            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Quels sont les régimes applicables pour les fonctionnaires ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Les fonctionnaires dépendent de différents régimes selon leur statut : CNRACL pour les territoriaux, 
                RAFP pour les fonctionnaires d'État, régimes spécifiques pour les hospitaliers, etc. 
                Chaque régime a ses propres conditions et démarches. 
                Contactez votre caisse de retraite pour connaître votre régime exact.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Puis-je cumuler retraite progressive et activité indépendante ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Oui, vous pouvez cumuler retraite progressive et activité indépendante, 
                à condition de réduire votre activité indépendante entre 40% et 80%. 
                Vous continuez à cotiser sur votre chiffre d'affaires réduit et vous touchez une pension partielle. 
                Les deux revenus s'additionnent pour former votre revenu total.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Comment déclarer mes trimestres à plusieurs caisses ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Si vous avez plusieurs caisses, vous devez faire une demande de retraite progressive auprès de chaque caisse concernée. 
                Chaque caisse additionne vos trimestres pour calculer votre pension. 
                Vous devez fournir les justificatifs de trimestres validés dans chaque régime. 
                Les caisses se coordonnent pour éviter les doubles comptages.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Quels documents pour un expatrié ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Les expatriés doivent fournir : justificatifs de trimestres validés à l'étranger (traductions certifiées si nécessaire), 
                attestations des caisses étrangères, conventions bilatérales si applicables, 
                documents d'identité et justificatifs de domicile. 
                Contactez votre caisse française pour connaître la liste exacte des documents requis.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Quels avantages pour chaque statut ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Les avantages varient selon le statut : fonctionnaires (transition douce, maintien des avantages), 
                indépendants (flexibilité, optimisation fiscale), multi-caisses (optimisation globale), 
                expatriés (prise en compte des trimestres étrangers). 
                Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur</a> en précisant votre statut 
                pour estimer les avantages selon votre situation.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '40px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3 style={{ marginTop: 0 }}>💡 Besoin d'aide selon votre statut ?</h3>
            <p>
              Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb', fontWeight: 'bold' }}>simulateur de retraite progressive</a> en précisant votre statut 
              (fonctionnaire, indépendant, expatrié, etc.) pour obtenir une estimation précise adaptée à votre situation, 
              ou consultez notre <a href="/#/guide-retraite-2025" style={{ color: '#2563eb', fontWeight: 'bold' }}>guide complet 2025</a> pour plus d'informations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatutRetraiteProgressivePage;

