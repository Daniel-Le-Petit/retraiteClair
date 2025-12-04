import React, { useEffect } from 'react';
import PageMetadata from '../components/PageMetadata';
import '../legal-styles.css';

const DemarcheRetraiteProgressivePage = () => {
  // Scroll vers le haut au chargement de la page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment faire une demande de retraite progressive en 2025",
    "description": "Guide étape par étape pour faire votre demande de retraite progressive : vérification d'éligibilité, démarches administratives, documents nécessaires et délais.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Vérifier votre éligibilité",
        "text": "Utilisez notre simulateur ou questionnaire d'éligibilité pour vérifier que vous remplissez toutes les conditions."
      },
      {
        "@type": "HowToStep",
        "name": "Obtenir l'accord de votre employeur",
        "text": "Informez votre employeur et obtenez un accord écrit pour passer à temps partiel."
      },
      {
        "@type": "HowToStep",
        "name": "Remplir le formulaire officiel",
        "text": "Téléchargez et remplissez le formulaire de demande de retraite progressive disponible sur le site de votre caisse de retraite."
      },
      {
        "@type": "HowToStep",
        "name": "Joindre les justificatifs",
        "text": "Rassemblez tous les documents nécessaires : pièces d'identité, bulletins de salaire, attestations de trimestres, accord employeur."
      },
      {
        "@type": "HowToStep",
        "name": "Envoyer la demande",
        "text": "Envoyez votre dossier complet à votre caisse de retraite et suivez l'avancement de votre demande."
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Comment faire une demande de retraite progressive en 2025",
    "description": "Guide complet des démarches pour faire une demande de retraite progressive : étapes, documents nécessaires, délais et suivi de votre dossier.",
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
      "@id": "https://retraiteclair.onrender.com/#/demarche-retraite-progressive"
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
        "name": "Comment faire une demande de retraite progressive en 2025",
        "item": "https://retraiteclair.onrender.com/#/demarche-retraite-progressive"
      }
    ]
  };

  return (
    <>
      <PageMetadata
        title="Comment faire une demande de retraite progressive en 2025 | RetraiteClair"
        description="Comment faire une demande de retraite progressive ? Guide complet des démarches, documents nécessaires, délais et suivi de votre dossier en 2025."
        keywords="demande retraite progressive, démarches retraite progressive, formulaire retraite progressive, documents retraite progressive, délais retraite progressive"
        ogTitle="Comment faire une demande de retraite progressive en 2025"
        ogDescription="Guide complet des démarches pour faire une demande de retraite progressive : étapes, documents, délais et suivi."
        ogImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        ogUrl="https://retraiteclair.onrender.com/#/demarche-retraite-progressive"
        twitterTitle="Comment faire une demande de retraite progressive en 2025"
        twitterDescription="Guide complet des démarches pour faire une demande de retraite progressive : étapes, documents, délais et suivi."
        twitterImage="https://retraiteclair.onrender.com/retraite-progressive-hero.png"
        canonical="https://retraiteclair.onrender.com/#/demarche-retraite-progressive"
        structuredData={[structuredData, articleData]}
        breadcrumbData={breadcrumbData}
      />

      <div className="legal-page-container">
        <div className="legal-content">
          <nav className="breadcrumb" style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
            <a href="/#/" style={{ color: '#2563eb', textDecoration: 'none' }}>Accueil</a>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>Comment faire une demande de retraite progressive en 2025</span>
          </nav>

          <h1>Comment faire une demande de retraite progressive en 2025</h1>
          
          <p className="lead">
            Faire une demande de retraite progressive nécessite de suivre plusieurs étapes administratives. 
            Ce guide vous explique pas à pas comment procéder, quels documents fournir et quels sont les délais à prévoir.
          </p>

          <h2>Étapes pour soumettre votre demande</h2>
          
          <h3>1. Vérifier votre éligibilité via le simulateur ou questionnaire</h3>
          <p>
            Avant de commencer les démarches, vérifiez que vous remplissez toutes les conditions d'éligibilité. 
            Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur de retraite progressive</a> ou notre 
            <a href="/#/suis-je-eligible" style={{ color: '#2563eb' }}> questionnaire d'éligibilité</a> pour vérifier :
          </p>
          <ul>
            <li>Votre âge (minimum 62 ans ou 67 ans pour le taux plein)</li>
            <li>Votre nombre de trimestres validés</li>
            <li>Votre situation professionnelle actuelle</li>
            <li>Votre capacité à passer à temps partiel</li>
          </ul>
          <p>
            Cette vérification préalable vous évite de perdre du temps sur une demande qui serait refusée.
          </p>

          <h3>2. Informer votre employeur et obtenir l'accord écrit</h3>
          <p>
            La retraite progressive nécessite l'accord de votre employeur pour passer à temps partiel. 
            Préparez votre argumentation en mettant en avant les avantages pour l'entreprise :
          </p>
          <ul>
            <li>Réduction des coûts salariaux</li>
            <li>Transmission progressive des compétences</li>
            <li>Maintien de l'expertise en interne</li>
            <li>Flexibilité organisationnelle</li>
          </ul>
          <p>
            L'accord doit être <strong>écrit et signé</strong> par votre employeur. 
            Il doit préciser le pourcentage de temps partiel (entre 40% et 80%) et la date de début.
          </p>

          <h3>3. Remplir le formulaire officiel de demande</h3>
          <p>
            Le formulaire de demande de retraite progressive est disponible sur le site de votre caisse de retraite :
          </p>
          <ul>
            <li><strong>CARSAT</strong> : pour les salariés du secteur privé</li>
            <li><strong>MSA</strong> : pour les agriculteurs</li>
            <li><strong>CNRACL</strong> : pour les fonctionnaires territoriaux</li>
            <li><strong>Autres régimes</strong> : selon votre statut</li>
          </ul>
          <p>
            Le formulaire demande des informations sur votre situation personnelle, professionnelle et vos revenus. 
            Remplissez-le avec soin pour éviter les retards de traitement.
          </p>

          <h3>4. Joindre les justificatifs nécessaires</h3>
          <p>
            Votre dossier doit être complet pour être traité rapidement. 
            Vérifiez que vous avez tous les documents nécessaires avant d'envoyer votre demande.
          </p>

          <h3>5. Envoyer la demande au régime de retraite concerné</h3>
          <p>
            Envoyez votre dossier complet par courrier recommandé avec accusé de réception ou via le portail en ligne de votre caisse. 
            Conservez une copie de tous les documents envoyés.
          </p>

          <h2>Délais et suivi</h2>
          
          <h3>Temps moyen de traitement : 1 à 3 mois selon le régime</h3>
          <p>
            Les délais de traitement varient selon votre caisse de retraite :
          </p>
          <div style={{ overflowX: 'auto', margin: '2rem 0' }}>
            <table>
              <thead>
                <tr>
                  <th>Régime</th>
                  <th>Délai moyen</th>
                  <th>Suivi en ligne</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>CARSAT</strong></td>
                  <td>2 à 3 mois</td>
                  <td>Oui</td>
                </tr>
                <tr>
                  <td><strong>MSA</strong></td>
                  <td>1 à 2 mois</td>
                  <td>Oui</td>
                </tr>
                <tr>
                  <td><strong>CNRACL</strong></td>
                  <td>2 à 3 mois</td>
                  <td>Oui</td>
                </tr>
                <tr>
                  <td><strong>Autres régimes</strong></td>
                  <td>1 à 3 mois</td>
                  <td>Variable</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Confirmation écrite du démarrage de la retraite progressive</h3>
          <p>
            Une fois votre demande acceptée, vous recevrez un courrier de confirmation qui précise :
          </p>
          <ul>
            <li>La date de début de votre retraite progressive</li>
            <li>Le montant de votre pension partielle</li>
            <li>Les conditions de versement</li>
            <li>Les modalités de suivi</li>
          </ul>

          <h3>Possibilité de suivi en ligne selon votre caisse</h3>
          <p>
            La plupart des caisses proposent un suivi en ligne de votre dossier. 
            Créez un compte sur le portail de votre caisse pour suivre l'avancement de votre demande en temps réel.
          </p>

          <h2>Documents et preuves nécessaires</h2>
          
          <h3>Liste détaillée des documents officiels</h3>
          <p>
            Voici la liste complète des documents à joindre à votre demande :
          </p>
          <ul>
            <li><strong>Pièces d'identité</strong> : copie recto-verso de votre carte d'identité ou passeport</li>
            <li><strong>Justificatif de domicile</strong> : facture récente (moins de 3 mois)</li>
            <li><strong>Bulletins de salaire</strong> : 3 derniers bulletins de salaire</li>
            <li><strong>Contrat de travail modifié</strong> : avenant au contrat précisant le temps partiel</li>
            <li><strong>Accord employeur</strong> : document écrit et signé par votre employeur</li>
            <li><strong>Relevé de carrière</strong> : relevé de situation individuelle (RSI) ou relevé de carrière</li>
            <li><strong>Attestations de trimestres</strong> : si vous avez des trimestres validés dans d'autres régimes</li>
            <li><strong>RIB</strong> : relevé d'identité bancaire pour le versement de la pension</li>
          </ul>

          <h3>Modèles d'attestation employeur</h3>
          <p>
            L'attestation employeur doit contenir les informations suivantes :
          </p>
          <div className="info-box info">
            <strong>📋 Exemple de contenu de l'attestation employeur</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              <li>Nom et prénom du salarié</li>
              <li>Date de naissance</li>
              <li>Poste occupé</li>
              <li>Pourcentage de temps partiel (entre 40% et 80%)</li>
              <li>Date de début du temps partiel</li>
              <li>Signature et cachet de l'employeur</li>
              <li>Date de l'accord</li>
            </ul>
          </div>

          <h3>Exemples de calculs pour le temps partiel</h3>
          <p>
            Pour vous aider à préparer votre demande, voici un exemple de calcul :
          </p>
          <div className="info-box success">
            <strong>💼 Exemple : Salarié à temps plein passant à 60%</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              <li>Salaire temps plein : 3 000 € brut/mois</li>
              <li>Salaire temps partiel 60% : 1 800 € brut/mois</li>
              <li>Pension partielle estimée : 600 €/mois (40% de la pension au taux plein)</li>
              <li>Revenus totaux : 2 400 €/mois</li>
            </ul>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb' }}>simulateur</a> pour calculer précisément vos revenus selon votre situation.
            </p>
          </div>

          <h2>FAQ : Questions fréquentes sur les démarches</h2>
          
          <div style={{ marginTop: '40px' }}>
            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Quels documents sont obligatoires ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Les documents obligatoires sont : pièce d'identité, justificatif de domicile, 3 derniers bulletins de salaire, 
                contrat de travail modifié, accord écrit de l'employeur, relevé de carrière et RIB. 
                Certains régimes peuvent demander des documents complémentaires selon votre situation.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Qui doit signer l'accord employeur ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                L'accord doit être signé par le représentant légal de l'entreprise (directeur, gérant, président) ou par une personne 
                habilitée à signer les contrats de travail. L'accord doit être daté et porter le cachet de l'entreprise.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Que faire si la caisse demande un complément ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Si la caisse demande des documents complémentaires, vous avez généralement 30 jours pour les fournir. 
                Répondez rapidement pour éviter les retards. Si vous ne pouvez pas fournir un document, contactez la caisse 
                pour expliquer votre situation et proposer une alternative.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Peut-on commencer la retraite progressive sans accord écrit ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Non, l'accord écrit de l'employeur est obligatoire. Sans cet accord, votre demande sera refusée. 
                Si votre employeur refuse, vous pouvez négocier ou envisager d'autres solutions comme attendre l'âge du taux plein 
                pour partir en retraite définitive.
              </p>
            </div>

            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.3rem', marginBottom: '10px' }}>
                Quels sont les délais moyens pour chaque régime ?
              </h3>
              <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1rem' }}>
                Les délais varient de 1 à 3 mois selon le régime : CARSAT (2-3 mois), MSA (1-2 mois), CNRACL (2-3 mois). 
                Les délais peuvent être plus longs en période de forte demande ou si votre dossier est incomplet. 
                Prévoyez de faire votre demande 3 à 6 mois avant la date souhaitée de début.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '40px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3 style={{ marginTop: 0 }}>💡 Besoin d'aide pour vos démarches ?</h3>
            <p>
              Utilisez notre <a href="/#/simulateurs" style={{ color: '#2563eb', fontWeight: 'bold' }}>simulateur de retraite progressive</a> pour vérifier votre éligibilité 
              et estimer vos revenus, ou consultez notre <a href="/#/guide-retraite-2025" style={{ color: '#2563eb', fontWeight: 'bold' }}>guide complet 2025</a> pour plus d'informations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemarcheRetraiteProgressivePage;

