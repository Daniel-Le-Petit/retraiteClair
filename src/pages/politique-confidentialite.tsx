import React from 'react';
import SEOHead from '../components/SEOHead';
import PageHeader from '../components/PageHeader';
import LegalPageLayout from '../components/LegalPageLayout';

const PolitiqueConfidentialite = () => {
  return (
    <LegalPageLayout>
      <SEOHead 
        title="Politique de confidentialité - RetraiteClair"
        description="Politique de confidentialité de RetraiteClair - Comment nous collectons, utilisons et protégeons vos données personnelles."
        keywords="politique confidentialité, protection données, RGPD, retraiteclair"
        canonical="/politique-confidentialite"
      />
      
      <PageHeader 
        title="Politique de confidentialité"
        subtitle="Protection de vos données personnelles"
        backgroundImage=""
      />
      
      <div className="legal-content">
        <div className="container">
          <div className="legal-section">
            <h2>1. Collecte des données</h2>
            <p>
              RetraiteClair collecte des données personnelles uniquement dans les cas suivants :
            </p>
            <ul>
              <li><strong>Formulaire de contact :</strong> nom, email, message</li>
              <li><strong>Simulateur :</strong> données de calcul (non stockées de manière permanente)</li>
              <li><strong>Cookies et localStorage :</strong> voir section détaillée ci-dessous</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>2. Cookies et technologies de stockage local</h2>
            <p>
              Le site RetraiteClair utilise les technologies suivantes pour améliorer votre expérience :
            </p>
            
            <h3>2.1. Cookies</h3>
            <p><strong>Cookies essentiels (nécessaires au fonctionnement) :</strong></p>
            <ul>
              <li><strong>Aucun cookie essentiel</strong> n'est utilisé actuellement</li>
            </ul>
            
            <p><strong>Cookies nécessitant votre consentement :</strong></p>
            <ul>
              <li><strong>retraiteClair_cookieConsent :</strong> mémorisation de votre choix de consentement aux cookies (accepté/refusé) - durée : 13 mois</li>
              <li><strong>retraiteClair_cookieConsentDate :</strong> date de votre consentement - durée : 13 mois</li>
              <li><strong>consent-given :</strong> mémorisation de votre consentement (true/false) - durée : 13 mois</li>
              <li><strong>consent-date :</strong> date de votre consentement - durée : 13 mois</li>
              <li><strong>Cookies Google Analytics (_ga, _gid, _gat) :</strong> analyse de l'utilisation du site, mesure d'audience - durée : 13 mois (nécessitent votre consentement)</li>
              <li><strong>Cookies Meta Pixel (fbq) :</strong> suivi des conversions et mesure de performance publicitaire - durée : 90 jours (nécessitent votre consentement)</li>
            </ul>

            <h3>2.2. localStorage</h3>
            <p>Les données suivantes sont stockées localement sur votre appareil :</p>
            <ul>
              <li><strong>retraiteClair_personalInfo :</strong> sauvegarde temporaire des données du formulaire de simulation (salaire, âge, trimestres, etc.) pour faciliter la navigation entre les étapes - durée : jusqu'à suppression manuelle ou expiration du navigateur</li>
              <li><strong>retraiteClair_data :</strong> sauvegarde temporaire des résultats de simulation calculés - durée : jusqu'à suppression manuelle ou expiration du navigateur</li>
              <li><strong>retraiteClair_cookieConsent :</strong> préférence de consentement aux cookies - durée : 13 mois</li>
              <li><strong>retraiteClair_cookieConsentDate :</strong> date du consentement - durée : 13 mois</li>
              <li><strong>consent-given :</strong> statut du consentement (true/false) - durée : 13 mois</li>
              <li><strong>consent-date :</strong> date du consentement - durée : 13 mois</li>
            </ul>

            <h3>2.3. sessionStorage</h3>
            <p>Les données suivantes sont stockées uniquement pendant votre session de navigation :</p>
            <ul>
              <li><strong>simulatorScrollPosition :</strong> mémorisation de la position de défilement dans le simulateur pour restaurer votre position lors de la navigation - durée : session uniquement (supprimé à la fermeture de l'onglet)</li>
              <li><strong>blogArticleOrigin :</strong> mémorisation de l'origine de navigation vers un article de blog (depuis le simulateur ou autre) - durée : session uniquement (supprimé à la fermeture de l'onglet)</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>3. Utilisation des données</h2>
            <p>
              Les données collectées sont utilisées uniquement pour :
            </p>
            <ul>
              <li>Répondre à vos demandes de contact</li>
              <li>Améliorer le fonctionnement du simulateur (sauvegarde temporaire des saisies)</li>
              <li>Analyser l'utilisation du site (données anonymisées via Google Analytics, avec votre consentement)</li>
              <li>Mémoriser vos préférences de navigation</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>4. Partage des données</h2>
            <p>
              RetraiteClair ne partage, ne vend ni ne loue vos données personnelles à des tiers. 
              Les données sont uniquement utilisées en interne pour les finalités décrites ci-dessus.
            </p>
            <p>
              <strong>Exceptions :</strong> 
            </p>
            <ul>
              <li>Les données analytiques anonymisées peuvent être transmises à <strong>Google Analytics</strong> (avec votre consentement) pour l'analyse de l'utilisation du site</li>
              <li>Les données de conversion peuvent être transmises à <strong>Meta Pixel (Facebook)</strong> (avec votre consentement) pour mesurer l'efficacité des campagnes publicitaires</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. Conservation des données</h2>
            <p>
              Les données sont conservées pendant les durées suivantes :
            </p>
            <ul>
              <li><strong>Messages de contact :</strong> 3 ans maximum</li>
              <li><strong>Données de simulation (localStorage) :</strong> jusqu'à suppression manuelle ou expiration du navigateur</li>
              <li><strong>Cookies de consentement :</strong> 13 mois maximum</li>
              <li><strong>Cookies Google Analytics :</strong> 13 mois maximum (avec consentement)</li>
              <li><strong>Cookies Meta Pixel :</strong> 90 jours maximum (avec consentement)</li>
              <li><strong>sessionStorage :</strong> durée de la session uniquement (supprimé à la fermeture de l'onglet)</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>6. Vos droits (RGPD)</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
            </p>
            <ul>
              <li><strong>Droit d'accès :</strong> connaître les données que nous détenons sur vous</li>
              <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
              <li><strong>Droit d'effacement :</strong> supprimer vos données</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
              <li><strong>Droit de limitation :</strong> limiter le traitement de vos données</li>
              <li><strong>Droit de retirer votre consentement :</strong> à tout moment pour les cookies non essentiels</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à : <strong>contact@retraiteclair.fr</strong>
            </p>
          </div>

          <div className="legal-section">
            <h2>7. Contact DPO (Délégué à la Protection des Données)</h2>
            <p>
              Pour toute question concernant le traitement de vos données personnelles, vous pouvez contacter :
            </p>
            <ul>
              <li><strong>Email :</strong> contact@retraiteclair.fr</li>
              <li><strong>Objet :</strong> "Demande DPO"</li>
            </ul>
            <p>
              Nous nous engageons à répondre à votre demande dans un délai d'un mois maximum.
            </p>
          </div>

          <div className="legal-section">
            <h2>8. Réclamer auprès de la CNIL</h2>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous avez le droit d'introduire une réclamation 
              auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
            </p>
            <ul>
              <li><strong>Site web :</strong> <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">https://www.cnil.fr</a></li>
              <li><strong>Adresse :</strong> 3 Place de Fontenoy - TSA 80715, 75334 Paris Cedex 07</li>
              <li><strong>Téléphone :</strong> 01 53 73 22 22</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>9. Sécurité</h2>
            <p>
              RetraiteClair met en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
              vos données contre la perte, l'utilisation abusive, l'accès non autorisé, la divulgation, 
              l'altération ou la destruction.
            </p>
            <p>
              Le site utilise HTTPS pour chiffrer les données en transit. Les données stockées localement 
              (localStorage, sessionStorage) restent sur votre appareil et ne sont pas transmises à nos serveurs.
            </p>
          </div>

          <div className="legal-section">
            <h2>10. Modifications</h2>
            <p>
              Cette politique peut être modifiée à tout moment. La version en vigueur est toujours disponible sur cette page.
            </p>
            <p><strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}</p>
          </div>

          <div className="legal-section">
            <h2>11. Contact</h2>
            <p>
              Pour exercer vos droits ou pour toute question concernant cette politique :
            </p>
            <ul>
              <li><strong>Email :</strong> contact@retraiteclair.fr</li>
              <li><strong>Formulaire :</strong> <button 
                className="footer-legal-btn" 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('navigateToPage', { detail: { page: 'contact' } }));
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('backToHome'));
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent('navigateToPage', { detail: { page: 'contact' } }));
                    }, 100);
                  }, 100);
                }}
              >
                Page de contact
              </button></li>
            </ul>
          </div>
        </div>
      </div>
    </LegalPageLayout>
  );
};

export default PolitiqueConfidentialite;


