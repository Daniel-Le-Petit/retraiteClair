import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Download } from 'lucide-react';

const ResultatsPage = () => {
  const [resultats, setResultats] = useState(null);
  const [donnees, setDonnees] = useState(null);

  useEffect(() => {
    // Charger les données sauvegardées
    const savedData = localStorage.getItem('retraiteClair_data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setDonnees(data);
      
      // Calculer les résultats
      if (data.salaireBrut && data.tempsPartiel) {
        const salaireNet = data.salaireBrut * 0.78; // -22% de cotisations
        const salairePartiel = salaireNet * (data.tempsPartiel / 100);
        const pensionEstimee = salaireNet * 0.6; // Estimation
        const pensionProgressive = pensionEstimee * (1 - data.tempsPartiel / 100);
        const revenuTotal = salairePartiel + pensionProgressive;

        setResultats({
          salairePartiel: salairePartiel.toFixed(0),
          pensionProgressive: pensionProgressive.toFixed(0),
          revenuTotal: revenuTotal.toFixed(0),
          pensionEstimee: pensionEstimee.toFixed(0),
          salaireActuel: data.salaireBrut
        });
      }
    }
  }, []);

  if (!donnees) {
    return (
      <div className="page-content">
        <div className="page-header">
          <h1>Résultats</h1>
          <p>Vos résultats de simulation</p>
        </div>
        <div className="no-data">
          <p>Veuillez d'abord saisir vos données dans l'onglet "Saisie"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Résultats</h1>
        <p>Analyse de votre retraite progressive</p>
      </div>

      {resultats && (
        <div className="results-container">
          <div className="results-summary">
            <h2>Synthèse de vos revenus</h2>
            <div className="results-grid">
              <div className="result-card">
                <h3>Salaire actuel</h3>
                <div className="result-value">{resultats.salaireActuel} €</div>
              </div>
              <div className="result-card">
                <h3>Salaire à temps partiel</h3>
                <div className="result-value">{resultats.salairePartiel} €</div>
              </div>
              <div className="result-card">
                <h3>Pension progressive</h3>
                <div className="result-value">{resultats.pensionProgressive} €</div>
              </div>
              <div className="result-card total">
                <h3>Revenu total mensuel</h3>
                <div className="result-value">{resultats.revenuTotal} €</div>
              </div>
            </div>
          </div>

          <div className="chart-section">
            <h2>Visualisation</h2>
            <div className="chart-container">
              <div className="progression-chart">
                <div className="progression-step">
                  <div className="step-icon step-actuel">💼</div>
                  <div className="step-content">
                    <div className="step-title">Situation actuelle</div>
                    <div className="step-revenu">{resultats.salaireActuel} €</div>
                    <div className="step-description">Salaire à temps plein</div>
                  </div>
                </div>
                
                <div className="progression-arrow">→</div>
                
                <div className="progression-step">
                  <div className="step-icon step-progressive">🔄</div>
                  <div className="step-content">
                    <div className="step-title">Retraite progressive</div>
                    <div className="step-revenu">{resultats.revenuTotal} €</div>
                    <div className="step-description">
                      <div>Salaire partiel: {resultats.salairePartiel} €</div>
                      <div>Pension: {resultats.pensionProgressive} €</div>
                    </div>
                  </div>
                </div>
                
                <div className="progression-arrow">→</div>
                
                <div className="progression-step">
                  <div className="step-icon step-finale">🏖️</div>
                  <div className="step-content">
                    <div className="step-title">Retraite finale</div>
                    <div className="step-revenu">{resultats.pensionEstimee} €</div>
                    <div className="step-description">Pension complète</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="export-section">
            <button className="export-button">
              <Download size={20} />
              Exporter les résultats
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultatsPage;


