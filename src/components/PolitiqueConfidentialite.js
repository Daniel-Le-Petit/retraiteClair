import React from 'react';
import SEOHead from './SEOHead';
import PageHeader from './PageHeader';

const PolitiqueConfidentialite = () => {
  return (
    <>
      <SEOHead 
        title="Politique de confidentialité - RetraiteClair"
        description="Politique de confidentialité de RetraiteClair - Comment nous collectons, utilisons et protégeons vos données personnelles."
        keywords="politique confidentialité, protection données, RGPD, retraiteclair"
      />
      
      <PageHeader 
        title="Politique de confidentialité"
        subtitle="Protection de vos données personnelles"
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
              <li><strong>Simulateur :</strong> données de calcul (non stockées)</li>
              <li><strong>Cookies :</strong> données de navigation anonymisées</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>2. Utilisation des données</h2>
            <p>
              Les données collectées sont utilisées uniquement pour :
            </p>
            <ul>
              <li>Répondre à vos demandes de contact</li>
              <li>Améliorer le fonctionnement du simulateur</li>
              <li>Analyser l'utilisation du site (données anonymisées)</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>3. Partage des données</h2>
            <p>
              RetraiteClair ne partage, ne vend ni ne loue vos données personnelles à des tiers. 
              Les données sont uniquement utilisées en interne pour les finalités décrites ci-dessus.
            </p>
          </div>

          <div className="legal-section">
            <h2>4. Conservation des données</h2>
            <p>
              Les données sont conservées pendant les durées suivantes :
            </p>
            <ul>
              <li><strong>Messages de contact :</strong> 3 ans maximum</li>
              <li><strong>Données de simulation :</strong> non stockées</li>
              <li><strong>Cookies :</strong> 13 mois maximum</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul>
              <li><strong>Droit d'accès :</strong> connaître les données que nous détenons</li>
              <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
              <li><strong>Droit d'effacement :</strong> supprimer vos données</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
              <li><strong>Droit à la portabilité :</strong> récupérer vos données</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>6. Sécurité</h2>
            <p>
              RetraiteClair met en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
              vos données contre la perte, l'utilisation abusive, l'accès non autorisé, la divulgation, 
              l'altération ou la destruction.
            </p>
          </div>

          <div className="legal-section">
            <h2>7. Cookies</h2>
            <p>
              Le site utilise des cookies pour :
            </p>
            <ul>
              <li>Améliorer votre expérience de navigation</li>
              <li>Analyser l'utilisation du site (Google Analytics)</li>
              <li>Mémoriser vos préférences</li>
            </ul>
            <p>
              Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
            </p>
          </div>

          <div className="legal-section">
            <h2>8. Contact</h2>
            <p>
              Pour exercer vos droits ou pour toute question concernant cette politique :
            </p>
            <ul>
              <li><strong>Email :</strong> retraiteclair@gmail.com</li>
              <li><strong>Formulaire :</strong> <button 
                className="footer-legal-btn" 
                onClick={() => window.dispatchEvent(new CustomEvent('navigateToPage', { detail: { page: 'contact' } }))}
              >
                Page de contact
              </button></li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>9. Modifications</h2>
            <p>
              Cette politique peut être modifiée à tout moment. La version en vigueur est toujours disponible sur cette page.
            </p>
            <p><strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolitiqueConfidentialite;
