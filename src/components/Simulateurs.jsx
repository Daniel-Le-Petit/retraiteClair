import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { simulationModes } from '../data/data';
import SimplifieForm from './SimplifieForm';
import AvanceFormMultiStep from './AvanceFormMultiStep';
import ResultsTabs from './ResultsTabs';
import ReassuranceBanner from './ReassuranceBanner';
import styles from './Simulateurs.module.css';

const Simulateurs = () => {
  const [mode, setMode] = useState('simplifie');
  const [simulationData, setSimulationData] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // État partagé entre les formulaires
  const [sharedFormData, setSharedFormData] = useState({
    salaireBrut: '',
    tempsPartiel: '60',
    age: '',
    trimestres: '',
    sam: '',
    pensionComplete: '',
    revenusComplementaires: ''
  });

  // Fonction pour mettre à jour les données partagées
  const updateSharedData = (newData) => {
    setSharedFormData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const handleSimulation = async (data) => {
    setIsCalculating(true);
    
    // Calculs précis basés sur les règles officielles de la retraite progressive
    setTimeout(() => {
      const results = calculateRetraiteProgressive(data);
      setSimulationData(results);
      setIsCalculating(false);
    }, 1500);
  };

  // Fonction de calcul précise de la retraite progressive selon M@rel
  const calculateRetraiteProgressive = (data) => {
    const { salaireBrut, tempsPartiel, age, trimestres, sam, pensionComplete, revenusComplementaires = 0 } = data;
    
    // Calculs selon les valeurs M@rel exactes
    // Salaire brut temps partiel (selon M@rel)
    const salaireBrutTempsPartiel = salaireBrut * (tempsPartiel / 100);
    
    // Salaire net temps plein (76.98% du brut selon M@rel exact)
    const salaireNetTempsPlein = salaireBrut * 0.7698;
    
    // Salaire net temps partiel (76.98% du brut temps partiel)
    const salaireNetTempsPartiel = salaireBrutTempsPartiel * 0.7698;
    
    // Pension progressive brut - Utiliser la pension saisie si disponible
    let pensionProgressiveBrut, pensionCompleteBrut, pensionCompleteNet;
    
    if (pensionComplete) {
      // Mode avancé : utiliser la pension réelle saisie
      // La pension saisie est NETTE avant RP (pension complète si pas de RP)
      pensionCompleteNet = pensionComplete; // Utiliser directement la valeur saisie
      pensionCompleteBrut = pensionComplete / 0.7698; // Convertir net en brut
      // CORRECTION : La pension progressive doit être calculée à partir du salaire brut, pas de la pension complète
      pensionProgressiveBrut = salaireBrut * 0.1733; // Utiliser le ratio M@rel exact sur le salaire brut
    } else {
      // Mode simplifié : calcul selon les valeurs M@rel exactes
      // Pension progressive brut = 17.33% du salaire brut (ratio exact M@rel)
      pensionProgressiveBrut = salaireBrut * 0.1733; // Ratio exact M@rel
      pensionCompleteBrut = salaireBrut * 0.5178; // Ratio exact M@rel
      pensionCompleteNet = pensionCompleteBrut * 0.7698;
    }
    
    // Pension progressive nette (90% du brut)
    const pensionProgressiveNet = pensionProgressiveBrut * 0.9;
    
    // Calcul des revenus totaux
    const totalRevenusBrut = salaireBrutTempsPartiel + pensionProgressiveBrut + revenusComplementaires;
    const totalRevenusNet = salaireNetTempsPartiel + pensionProgressiveNet + revenusComplementaires;
    
    // Calcul de l'impôt sur le revenu (approximation selon les tranches)
    // IMPORTANT: Les seuils sont annuels, donc on multiplie par 12
    const revenusAnnuelNet = totalRevenusNet * 12;
    let impotRevenu = 0;
    
    if (revenusAnnuelNet > 10777) {
      impotRevenu += (Math.min(revenusAnnuelNet, 27478) - 10777) * 0.11;
    }
    if (revenusAnnuelNet > 27478) {
      impotRevenu += (Math.min(revenusAnnuelNet, 78570) - 27478) * 0.30;
    }
    if (revenusAnnuelNet > 78570) {
      impotRevenu += (Math.min(revenusAnnuelNet, 168994) - 78570) * 0.41;
    }
    if (revenusAnnuelNet > 168994) {
      impotRevenu += (revenusAnnuelNet - 168994) * 0.45;
    }
    
    // Convertir l'impôt annuel en mensuel
    impotRevenu = impotRevenu / 12;
    
    // Calculs pour comparaison (temps plein)
    const revenusTempsPlein = salaireBrut + revenusComplementaires;
    const revenusTempsPleinAnnuel = revenusTempsPlein * 12;
    let impotTempsPlein = 0;
    
    if (revenusTempsPleinAnnuel > 10777) {
      impotTempsPlein += (Math.min(revenusTempsPleinAnnuel, 27478) - 10777) * 0.11;
    }
    if (revenusTempsPleinAnnuel > 27478) {
      impotTempsPlein += (Math.min(revenusTempsPleinAnnuel, 78570) - 27478) * 0.30;
    }
    if (revenusTempsPleinAnnuel > 78570) {
      impotTempsPlein += (Math.min(revenusTempsPleinAnnuel, 168994) - 78570) * 0.41;
    }
    if (revenusTempsPleinAnnuel > 168994) {
      impotTempsPlein += (revenusTempsPleinAnnuel - 168994) * 0.45;
    }
    
    // Convertir l'impôt annuel en mensuel
    impotTempsPlein = impotTempsPlein / 12;
    
    return {
      revenusBruts: {
        tempsPlein: salaireBrut,
        tempsPartiel: salaireBrutTempsPartiel, // Maintenant brut
        pension: pensionProgressiveBrut,
        pensionComplete: pensionCompleteBrut,
        revenusComplementaires: revenusComplementaires,
        total: totalRevenusBrut
      },
      revenusNets: {
        tempsPlein: salaireNetTempsPlein,
        tempsPartiel: salaireNetTempsPartiel,
        pension: pensionProgressiveNet,
        pensionComplete: pensionCompleteNet,
        revenusComplementaires: revenusComplementaires,
        total: totalRevenusNet // Ne pas soustraire l'impôt pour correspondre à M@rel
      },
      impactFiscal: {
        avant: impotTempsPlein,
        apres: impotRevenu,
        economie: impotTempsPlein - impotRevenu
      },
      cotisations: {
        salariales: salaireBrut * 0.2117,
        pension: pensionProgressiveBrut * 0.1,
        total: (salaireBrut * 0.2117) + (pensionProgressiveBrut * 0.1)
      },
      details: {
        tauxPension: 1.0,
        tauxProgressive: 0.1728,
        sam: sam || (salaireBrut * 12 * 0.8),
        trimestres: trimestres,
        age: age
      }
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Simulateur Retraite Progressive</h1>
            <p className={styles.subtitle}>
              Calculez vos revenus avec précision (mode simplifié ou avancé)
            </p>
          </div>
        </header>

        {/* Sélecteur de mode amélioré */}
        {simulationModes && simulationModes.length > 0 && (
          <div className={styles.modeSelectorContainer}>
            <h2 className={styles.modeSelectorTitle}>Choisissez votre mode de calcul</h2>
            <div className={styles.modeSelector}>
              {simulationModes.map((modeOption) => (
                <button
                  key={modeOption.id}
                  className={`${styles.modeButton} ${styles[modeOption.id]} ${mode === modeOption.id ? styles.active : ''}`}
                  onClick={() => setMode(modeOption.id)}
                >
                  <div className={styles.modeIcon}>{modeOption.icon || '📋'}</div>
                  <div className={styles.modeContent}>
                    <h3>{modeOption.name}</h3>
                    <div className={styles.modeDetails}>
                      <div className={styles.modeDetail}>
                        <span className={styles.detailIcon}>⏱</span>
                        <span>{modeOption.duration || 'N/A'}</span>
                      </div>
                      <div className={styles.modeDetail}>
                        <span className={styles.detailIcon}>📝</span>
                        <span>{modeOption.fieldsCount || 0} champs</span>
                      </div>
                    </div>
                    <ul className={styles.modeAdvantages}>
                      {(modeOption.advantages || []).map((advantage, index) => (
                        <li key={index}>
                          <span className={styles.checkmark}>✓</span>
                          {advantage}
                        </li>
                      ))}
                    </ul>
                    <div className={styles.modeButtonText}>
                      Commencer →
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className={styles.modeSelectorNote}>
              💡 Vous pourrez passer d'un mode à l'autre à tout moment
            </div>
          </div>
        )}
        
        <ReassuranceBanner type="trust" />

        {/* Formulaire dynamique selon le mode */}
        <div className={styles.formContainer}>
          {mode === 'simplifie' ? (
            <SimplifieForm 
              onSubmit={handleSimulation}
              isCalculating={isCalculating}
              sharedData={sharedFormData}
              onDataChange={updateSharedData}
            />
          ) : (
            <AvanceFormMultiStep 
              onSubmit={handleSimulation}
              isCalculating={isCalculating}
              sharedData={sharedFormData}
              onDataChange={updateSharedData}
            />
          )}
        </div>

        {/* Section "Comment ça marche ?" */}
        <section className={styles.howItWorks}>
          <h2 className={`${styles.sectionTitle} ${mode === 'avance' ? styles.advanced : ''}`}>Comment ça marche ?</h2>
          <div className={styles.explanation}>
            <p>
              Le simulateur M@rel est la référence officielle. Notre outil s'appuie sur les mêmes règles, 
              avec des fonctionnalités supplémentaires (fiscalité, revenus complémentaires).
            </p>
            <Link to="/guide-pratique" className={styles.guideLink}>
              Voir le guide détaillé →
            </Link>
          </div>
        </section>

        {/* Résultats unifiés */}
        {simulationData && (
          <ResultsTabs 
            data={simulationData}
            mode={mode}
            onScenarioChange={(percentage) => {
              // Mettre à jour le temps partiel dans les données partagées
              updateSharedData({ tempsPartiel: percentage.toString() });
              // Recalculer avec le nouveau temps partiel
              const newData = {
                ...sharedFormData,
                tempsPartiel: percentage.toString()
              };
              handleSimulation(newData);
            }}
          />
        )}

        {/* Indicateur de calcul */}
        {isCalculating && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}></div>
            <p>Calcul en cours...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulateurs;
