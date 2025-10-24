import React, { useState } from 'react';
import { TrendingUp, Calculator, BarChart3 } from 'lucide-react';

const ScenariosPage = () => {
  const [scenarios, setScenarios] = useState([
    {
      id: 1,
      nom: 'Scénario conservateur',
      tempsPartiel: 50,
      description: 'Réduction importante du temps de travail',
      couleur: '#ef4444'
    },
    {
      id: 2,
      nom: 'Scénario équilibré',
      tempsPartiel: 60,
      description: 'Équilibre entre travail et retraite',
      couleur: '#10b981'
    },
    {
      id: 3,
      nom: 'Scénario progressif',
      tempsPartiel: 70,
      description: 'Transition douce vers la retraite',
      couleur: '#3b82f6'
    }
  ]);

  const [donnees, setDonnees] = useState(null);

  React.useEffect(() => {
    const savedData = localStorage.getItem('retraiteClair_data');
    if (savedData) {
      setDonnees(JSON.parse(savedData));
    }
  }, []);

  const calculerScenario = (tempsPartiel) => {
    if (!donnees || !donnees.salaireBrut) return null;
    
    const salaireNet = donnees.salaireBrut * 0.78;
    const salairePartiel = salaireNet * (tempsPartiel / 100);
    const pensionEstimee = salaireNet * 0.6;
    const pensionProgressive = pensionEstimee * (1 - tempsPartiel / 100);
    const revenuTotal = salairePartiel + pensionProgressive;

    return {
      salairePartiel: salairePartiel.toFixed(0),
      pensionProgressive: pensionProgressive.toFixed(0),
      revenuTotal: revenuTotal.toFixed(0)
    };
  };

  if (!donnees) {
    return (
      <div className="page-content">
        <div className="page-header">
          <h1>Scénarios</h1>
          <p>Comparez différents scénarios de retraite progressive</p>
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
        <h1>Scénarios</h1>
        <p>Comparez différents scénarios de retraite progressive</p>
      </div>

      <div className="scenarios-container">
        <div className="scenarios-grid">
          {scenarios.map((scenario) => {
            const resultats = calculerScenario(scenario.tempsPartiel);
            
            return (
              <div key={scenario.id} className="scenario-card">
                <div className="scenario-header" style={{ backgroundColor: scenario.couleur }}>
                  <h3>{scenario.nom}</h3>
                  <div className="scenario-percentage">{scenario.tempsPartiel}%</div>
                </div>
                
                <div className="scenario-content">
                  <p className="scenario-description">{scenario.description}</p>
                  
                  {resultats && (
                    <div className="scenario-results">
                      <div className="result-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', padding: '0.75rem 0' }}>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem', display: 'block', width: '100%' }}>Salaire partiel:</span>
                        <span style={{ fontSize: '0.65rem', fontWeight: '600', lineHeight: '1.2', color: '#10b981', background: '#f0fdf4', padding: '0.25rem 0.4rem', borderRadius: '6px', border: '1px solid #bbf7d0', width: '100%', textAlign: 'center', display: 'block', marginTop: '0.25rem' }}>{resultats.salairePartiel} €</span>
                      </div>
                      <div className="result-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', padding: '0.75rem 0' }}>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem', display: 'block', width: '100%' }}>Pension progressive:</span>
                        <span style={{ fontSize: '0.65rem', fontWeight: '600', lineHeight: '1.2', color: '#10b981', background: '#f0fdf4', padding: '0.25rem 0.4rem', borderRadius: '6px', border: '1px solid #bbf7d0', width: '100%', textAlign: 'center', display: 'block', marginTop: '0.25rem' }}>{resultats.pensionProgressive} €</span>
                      </div>
                      <div className="result-item total" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', padding: '0.75rem 0' }}>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem', display: 'block', width: '100%' }}>Revenu total:</span>
                        <span style={{ fontSize: '0.65rem', fontWeight: '600', lineHeight: '1.2', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '0.25rem 0.4rem', borderRadius: '6px', width: '100%', textAlign: 'center', display: 'block', marginTop: '0.25rem' }}>{resultats.revenuTotal} €</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="comparison-section">
          <h2>Comparaison des scénarios</h2>
          <div className="comparison-chart">
            <div className="chart-bars">
              {scenarios.map((scenario) => {
                const resultats = calculerScenario(scenario.tempsPartiel);
                if (!resultats) return null;
                
                const maxRevenu = Math.max(...scenarios.map(s => {
                  const r = calculerScenario(s.tempsPartiel);
                  return r ? parseFloat(r.revenuTotal) : 0;
                }));
                
                const pourcentage = (parseFloat(resultats.revenuTotal) / maxRevenu) * 100;
                
                return (
                  <div key={scenario.id} className="chart-bar-group">
                    <div className="chart-bar-label">{scenario.nom}</div>
                    <div className="chart-bar-container">
                      <div 
                        className="chart-bar" 
                        style={{
                          width: `${pourcentage}%`,
                          backgroundColor: scenario.couleur
                        }}
                      ></div>
                      <span className="chart-bar-value">{resultats.revenuTotal} €</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenariosPage;







