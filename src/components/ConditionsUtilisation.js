import React from 'react';
import SEOHead from './SEOHead';
import PageHeader from './PageHeader';

const ConditionsUtilisation = () => {
  return (
    <>
      <SEOHead 
        title="Conditions d'utilisation - RetraiteClair"
        description="Conditions d'utilisation du site RetraiteClair - Règles d'usage du simulateur et des services."
        keywords="conditions utilisation, retraiteclair, simulateur, règles usage"
      />
      
      <PageHeader 
        title="Conditions d'utilisation"
        subtitle="Règles d'usage du site RetraiteClair"
      />
      
      <div className="legal-content">
        <div className="container">
          <div className="legal-section">
            <h2>1. Objet</h2>
            <p>
              Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation du site RetraiteClair 
              et de ses services, notamment le simulateur de retraite progressive.
            </p>
          </div>

          <div className="legal-section">
            <h2>2. Acceptation des conditions</h2>
            <p>
              L'utilisation du site RetraiteClair implique l'acceptation pleine et entière des présentes CGU. 
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le site.
            </p>
          </div>

          <div className="legal-section">
            <h2>3. Description du service</h2>
            <p>
              RetraiteClair propose :
            </p>
            <ul>
              <li>Un simulateur gratuit de retraite progressive</li>
              <li>Des informations et conseils sur la retraite progressive</li>
              <li>Un blog avec des articles spécialisés</li>
              <li>Un formulaire de contact</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>4. Utilisation du simulateur</h2>
            <p>
              Le simulateur de retraite progressive est fourni à titre informatif uniquement. 
              Les résultats obtenus sont des estimations basées sur les informations fournies et 
              la réglementation en vigueur au moment du calcul.
            </p>
            <p>
              <strong>Important :</strong> Ces résultats ne constituent pas un conseil personnalisé 
              et ne remplacent pas l'avis d'un professionnel qualifié.
            </p>
          </div>

          <div className="legal-section">
            <h2>5. Responsabilité de l'utilisateur</h2>
            <p>
              L'utilisateur s'engage à :
            </p>
            <ul>
              <li>Fournir des informations exactes et à jour</li>
              <li>Utiliser le site conformément à sa destination</li>
              <li>Ne pas tenter de contourner les mesures de sécurité</li>
              <li>Respecter les droits de propriété intellectuelle</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>6. Limitation de responsabilité</h2>
            <p>
              RetraiteClair ne peut être tenu responsable :
            </p>
            <ul>
              <li>Des décisions prises sur la base des résultats du simulateur</li>
              <li>Des erreurs ou omissions dans les informations fournies</li>
              <li>Des dommages indirects résultant de l'utilisation du site</li>
              <li>Des interruptions temporaires du service</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>7. Propriété intellectuelle</h2>
            <p>
              Le contenu du site (textes, images, logiciels) est protégé par le droit d'auteur. 
              Toute reproduction non autorisée est interdite.
            </p>
          </div>

          <div className="legal-section">
            <h2>8. Disponibilité du service</h2>
            <p>
              RetraiteClair s'efforce de maintenir le site accessible 24h/24, 7j/7, mais ne peut 
              garantir une disponibilité absolue. Des interruptions peuvent survenir pour maintenance.
            </p>
          </div>

          <div className="legal-section">
            <h2>9. Modification des CGU</h2>
            <p>
              RetraiteClair se réserve le droit de modifier ces conditions à tout moment. 
              Les nouvelles conditions seront applicables dès leur publication sur le site.
            </p>
          </div>

          <div className="legal-section">
            <h2>10. Droit applicable</h2>
            <p>
              Les présentes CGU sont régies par le droit français. En cas de litige, les tribunaux 
              français seront seuls compétents.
            </p>
          </div>

          <div className="legal-section">
            <h2>11. Contact</h2>
            <p>
              Pour toute question concernant ces conditions :
            </p>
            <ul>
              <li><strong>Email :</strong> retraiteclair@gmail.com</li>
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
    </>
  );
};

export default ConditionsUtilisation;
