import React from 'react';
import { CheckCircle, Clock, Percent, Lightbulb, BarChart3, FileText } from 'lucide-react';

const ConseilsPage = () => {
  return (
    <div className="page-content">
      <div className="conseils-container">
        <h2>Éligibilité • Démarches • Optimisation</h2>
        
        {/* Section Éligibilité */}
        <div className="conseils-section">
          <h3>Éligibilité</h3>
          <div className="conseils-grid">
            <div className="conseil-card">
              <div className="conseil-icon">
                <CheckCircle size={24} />
              </div>
              <h4>Vérifiez votre âge</h4>
              <p>Vous devez avoir au moins 60 ans (ou 55 ans dans certains cas particuliers)</p>
            </div>
            
            <div className="conseil-card">
              <div className="conseil-icon">
                <Clock size={24} />
              </div>
              <h4>Contrôlez vos trimestres</h4>
              <p>Assurez-vous d'avoir cotisé au moins 150 trimestres pour être éligible</p>
            </div>
            
            <div className="conseil-card">
              <div className="conseil-icon">
                <Percent size={24} />
              </div>
              <h4>Temps partiel requis</h4>
              <p>Le temps partiel doit être compris entre 40% et 80% du temps plein</p>
            </div>
          </div>
        </div>

        {/* Section Conseils rapides */}
        <div className="conseils-section">
          <h3>Conseils rapides</h3>
          <div className="conseils-grid">
            <div className="conseil-card conseil-tip">
              <div className="conseil-icon">
                <Lightbulb size={24} />
              </div>
              <h4>Commencez tôt</h4>
              <p>Plus vous anticipez, plus vous avez de chances d'obtenir l'accord de votre employeur</p>
            </div>
            
            <div className="conseil-card conseil-tip">
              <div className="conseil-icon">
                <BarChart3 size={24} />
              </div>
              <h4>Simulez plusieurs scénarios</h4>
              <p>Testez différents pourcentages de temps partiel pour optimiser vos revenus</p>
            </div>
            
            <div className="conseil-card conseil-tip">
              <div className="conseil-icon">
                <FileText size={24} />
              </div>
              <h4>Préparez vos documents</h4>
              <p>Rassemblez tous les justificatifs nécessaires avant de faire votre demande</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConseilsPage;