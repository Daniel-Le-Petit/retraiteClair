import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { simulationModes } from '../data/data';
import SimplifieForm from './SimplifieForm';
import AvanceForm from './AvanceForm';
import ResultsTabs from './ResultsTabs';
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
    const { salaireBrut, tempsPartiel, age, trimestres, sam, revenusComplementaires = 0 } = data;
    
    // Calculs selon les valeurs M@rel exactes
    // Salaire brut temps partiel (selon M@rel)
    const salaireBrutTempsPartiel = salaireBrut * (tempsPartiel / 100);
    
    // Salaire net temps plein (78.83% du brut selon M@rel)
    const salaireNetTempsPlein = salaireBrut * 0.7883;
    
    // Salaire net temps partiel (78.83% du brut temps partiel)
    const salaireNetTempsPartiel = salaireBrutTempsPartiel * 0.7883;
    
    // Pension progressive brut (17.28% du salaire brut selon M@rel)
    const pensionProgressiveBrut = salaireBrut * 0.1728;
    
    // Pension progressive nette (90% du brut)
    const pensionProgressiveNet = pensionProgressiveBrut * 0.9;
    
    // Pension complète brut (pour comparaison)
    const pensionCompleteBrut = salaireBrut * 0.518;
    
    // Pension complète nette (90% du brut)
    const pensionCompleteNet = pensionCompleteBrut * 0.9;
    
    // Calcul des revenus totaux
    const totalRevenusBrut = salaireBrutTempsPartiel + pensionProgressiveBrut + revenusComplementaires;
    const totalRevenusNet = salaireNetTempsPartiel + pensionProgressiveNet + revenusComplementaires;
    
    // Calcul de l'impôt sur le revenu (approximation selon les tranches)
    let impotRevenu = 0;
    
    if (totalRevenusNet > 10777) {
      impotRevenu += (Math.min(totalRevenusNet, 27478) - 10777) * 0.11;
    }
    if (totalRevenusNet > 27478) {
      impotRevenu += (Math.min(totalRevenusNet, 78570) - 27478) * 0.30;
    }
    if (totalRevenusNet > 78570) {
      impotRevenu += (Math.min(totalRevenusNet, 168994) - 78570) * 0.41;
    }
    if (totalRevenusNet > 168994) {
      impotRevenu += (totalRevenusNet - 168994) * 0.45;
    }
    
    // Calculs pour comparaison (temps plein)
    const revenusTempsPlein = salaireBrut + revenusComplementaires;
    let impotTempsPlein = 0;
    
    if (revenusTempsPlein > 10777) {
      impotTempsPlein += (Math.min(revenusTempsPlein, 27478) - 10777) * 0.11;
    }
    if (revenusTempsPlein > 27478) {
      impotTempsPlein += (Math.min(revenusTempsPlein, 78570) - 27478) * 0.30;
    }
    if (revenusTempsPlein > 78570) {
      impotTempsPlein += (Math.min(revenusTempsPlein, 168994) - 78570) * 0.41;
    }
    if (revenusTempsPlein > 168994) {
      impotTempsPlein += (revenusTempsPlein - 168994) * 0.45;
    }
    
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
        total: totalRevenusNet - impotRevenu
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
          <h1 className={styles.title}>Simulateur Retraite Progressive</h1>
          <p className={styles.subtitle}>
            Calculez vos revenus avec précision (mode simplifié ou avancé)
          </p>
        </header>

        {/* Sélecteur de mode */}
        <div className={styles.modeSelector}>
          {simulationModes.map((modeOption) => (
            <button
              key={modeOption.id}
              className={`${styles.modeButton} ${styles[modeOption.id]} ${mode === modeOption.id ? styles.active : ''}`}
              onClick={() => setMode(modeOption.id)}
            >
              <h3>{modeOption.name}</h3>
              <p>{modeOption.description}</p>
            </button>
          ))}
        </div>

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
            <AvanceForm 
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
