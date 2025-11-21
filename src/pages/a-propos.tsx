import React from 'react';
import SEOHead from '../components/SEOHead';
import PageHeader from '../components/PageHeader';
import LegalPageLayout from '../components/LegalPageLayout';

// Read version from package.json (injected at build time)
const APP_VERSION = process.env.REACT_APP_VERSION || '1.0.0';
const BUILD_DATE = process.env.REACT_APP_BUILD_DATE || new Date().toISOString().split('T')[0];
const FORMULA_VERSION = process.env.REACT_APP_FORMULA_VERSION || '1.0.0';

const APropos = () => {
  return (
    <LegalPageLayout>
      <SEOHead 
        title="À propos - RetraiteClair"
        description="Découvrez qui a créé RetraiteClair, les sources des calculs et les dernières mises à jour."
        keywords="à propos, retraiteclair, simulateur, retraite progressive"
        canonical="/a-propos"
      />
      
      <PageHeader 
        title="À propos de RetraiteClair"
        subtitle="Transparence et confiance"
        backgroundImage=""
      />
      
      <div className="legal-content">
        <div className="container">
          <div className="legal-section">
            <h2>Qui sommes-nous ?</h2>
            <p>
              RetraiteClair a été créé par un professionnel ayant 30 ans d'expérience dans le transport aérien, 
              qui a lui-même été confronté à la complexité de la retraite progressive.
            </p>
            <p>
              Face à la difficulté de comprendre les démarches et les calculs, nous avons développé des outils 
              clairs et accessibles pour accompagner les personnes dans cette transition importante de leur vie professionnelle.
            </p>
            <p>
              RetraiteClair, c'est l'expertise d'un professionnel qui a vécu les mêmes interrogations que vous, 
              avec la volonté de rendre cette étape de vie plus sereine.
            </p>
          </div>

          <div className="legal-section">
            <h2>Sources des calculs</h2>
            <p>
              Tous les calculs de RetraiteClair sont basés sur les formules officielles de l'Assurance Retraite française :
            </p>
            <ul>
              <li><strong>Code de la sécurité sociale</strong> - Articles L. 161-17-2 et suivants</li>
              <li><strong>Simulateur M@rel</strong> - Référence officielle de l'Assurance Retraite</li>
              <li><strong>Barèmes officiels 2024</strong> :
                <ul>
                  <li>Plafond de la Sécurité Sociale : 3 666 €/mois</li>
                  <li>Valeur du point Agirc-Arrco : 1,4158 €</li>
                  <li>Taux de cotisation retraite : 17,33% du salaire brut</li>
                  <li>Taux de conversion net/brut : 76,98%</li>
                </ul>
              </li>
              <li><strong>Barème fiscal 2024</strong> - Tranches d'imposition sur le revenu</li>
            </ul>
            <p>
              <strong>Note importante :</strong> Les calculs sont indicatifs et basés sur les règles en vigueur en 2024. 
              Les réformes futures peuvent modifier ces paramètres. Nous recommandons de vérifier vos calculs avec 
              l'<a href="https://www.lassuranceretraite.fr" target="_blank" rel="noopener noreferrer">Assurance Retraite</a>.
            </p>
          </div>

          <div className="legal-section">
            <h2>Version et mises à jour</h2>
            <ul>
              <li><strong>Version de l'application :</strong> {APP_VERSION}</li>
              <li><strong>Version de la formule de calcul :</strong> {FORMULA_VERSION}</li>
              <li><strong>Date de dernière mise à jour :</strong> {BUILD_DATE}</li>
            </ul>
            <p>
              Les formules de calcul sont régulièrement mises à jour pour refléter les évolutions réglementaires. 
              La version actuelle de la formule est indiquée dans les résultats de simulation.
            </p>
          </div>

          <div className="legal-section">
            <h2>Limitations et responsabilité</h2>
            <p>
              RetraiteClair est un outil d'estimation. Les résultats fournis sont indicatifs et non contractuels. 
              Ils ne peuvent en aucun cas se substituer à une consultation officielle auprès de l'Assurance Retraite.
            </p>
            <p>
              Nous ne garantissons pas l'exactitude absolue des calculs, notamment en raison de :
            </p>
            <ul>
              <li>L'évolution possible des règles réglementaires</li>
              <li>Les spécificités individuelles de chaque situation</li>
              <li>Les paramètres fiscaux qui peuvent varier selon votre situation personnelle</li>
            </ul>
            <p>
              <strong>Nous recommandons fortement de vérifier vos calculs avec l'Assurance Retraite avant toute décision.</strong>
            </p>
          </div>

          <div className="legal-section">
            <h2>Contact</h2>
            <p>
              Pour toute question ou suggestion concernant RetraiteClair :
            </p>
            <ul>
              <li><strong>Email :</strong> contact@retraiteclair.fr</li>
              <li><strong>Formulaire de contact :</strong> <button 
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

export default APropos;


