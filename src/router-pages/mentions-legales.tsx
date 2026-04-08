import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import PageHeader from '../components/PageHeader';
import LegalPageLayout from '../components/LegalPageLayout';

const MentionsLegales = () => {
  const navigate = useNavigate();
  return (
    <LegalPageLayout>
      <SEOHead 
        title="Mentions légales - RetraiteClair"
        description="Mentions légales du site RetraiteClair - Informations sur l'éditeur, hébergement et responsabilité."
        keywords="mentions légales, retraiteclair, éditeur, hébergement"
        canonical="/mentions-legales"
      />
      
      <PageHeader 
        title="Mentions légales"
        subtitle="Informations légales sur RetraiteClair"
        backgroundImage=""
      />
      
      <div className="legal-content">
        <div className="container">
          <div className="legal-section">
            <h2>1. Éditeur du site</h2>
            <p>
              Le site RetraiteClair est édité par :
            </p>
            <ul>
              <li><strong>Raison sociale :</strong> RetraiteClair – micro-entreprise</li>
              <li><strong>SIRET :</strong> En cours...</li>
              <li><strong>Adresse :</strong> 10, Cours de la liberté, 69003 Lyon</li>
              <li><strong>Email :</strong> contact@retraiteclair.fr</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>2. Hébergement</h2>
            <p>
              Le site est hébergé par :
            </p>
            <ul>
              <li><strong>Hébergeur :</strong> Render Inc.</li>
              <li><strong>Adresse :</strong> 525 Brannan St, San Francisco, CA 94107, USA</li>
              <li><strong>Site web :</strong> https://render.com</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>3. Déclaration CNIL</h2>
            <p>
              <strong>Statut :</strong> En cours – Déclaration n° XXXXXX
            </p>
            <p>
              Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la 
              Protection des Données (RGPD), RetraiteClair a déclaré ses traitements de données personnelles à la CNIL.
            </p>
          </div>

          <div className="legal-section">
            <h2>4. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu du site RetraiteClair (textes, images, vidéos, etc.) est protégé par le droit d'auteur. 
              Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces éléments est 
              strictement interdite sans l'accord exprès par écrit de RetraiteClair.
            </p>
          </div>

          <div className="legal-section">
            <h2>5. Responsabilité</h2>
            <p>
              Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes 
              périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.
            </p>
            <p>
              Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler 
              par email, à l'adresse contact@retraiteclair.fr, en décrivant le problème de la manière la plus précise possible.
            </p>
          </div>

          <div className="legal-section">
            <h2>6. Liens hypertextes</h2>
            <p>
              Le site RetraiteClair peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. 
              Les liens vers ces autres ressources vous font quitter le site RetraiteClair.
            </p>
            <p>
              Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de l'éditeur. 
              Aucune autorisation ou demande d'information préalable ne peut être exigée par l'éditeur à l'égard d'un site qui 
              souhaite établir un lien vers le site de l'éditeur.
            </p>
          </div>

          <div className="legal-section">
            <h2>7. Droit applicable</h2>
            <p>
              Tout litige en relation avec l'utilisation du site RetraiteClair est soumis au droit français. 
              Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
            </p>
          </div>

          <div className="legal-section">
            <h2>8. Contact</h2>
            <p>
              Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
            </p>
            <ul>
              <li><strong>Email :</strong> contact@retraiteclair.fr</li>
              <li><strong>Formulaire de contact :</strong> <button 
                className="footer-legal-btn" 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'auto' });
                  navigate('/contact');
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

export default MentionsLegales;


