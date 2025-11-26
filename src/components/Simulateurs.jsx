import React, { useState, useEffect } from 'react';
import SimplifieForm from './SimplifieForm';
import AvanceFormMultiStep from './AvanceFormMultiStep';
import ResultsTabs from './ResultsTabs';
import CalculProgress from './CalculProgress';
import styles from './Simulateurs.module.css';

const Simulateurs = () => {
  const [mode, setMode] = useState('simplifie');
  
  // Écouter les événements de mode de simulation
  useEffect(() => {
    const handleSimulationMode = (event) => {
      const modeFromEvent = event.detail?.mode || event.detail;
      // Convertir 'advanced' en 'avance' et 'simplified' en 'simplifie'
      if (modeFromEvent === 'advanced' || modeFromEvent === 'avance') {
        setMode('avance');
      } else if (modeFromEvent === 'simplified' || modeFromEvent === 'simplifie') {
        setMode('simplifie');
      }
    };

    const handleNavigation = (event) => {
      const { page, mode: modeFromEvent } = event.detail || {};
      if ((page === 'simulateurs' || page === 'calculateur') && modeFromEvent) {
        // Appliquer le mode immédiatement si le composant est monté
        if (modeFromEvent === 'advanced' || modeFromEvent === 'avance') {
          setMode('avance');
        } else if (modeFromEvent === 'simplified' || modeFromEvent === 'simplifie') {
          setMode('simplifie');
        }
      }
    };

    // Écouter l'événement setSimulationMode envoyé par SwipeNavigation
    window.addEventListener('setSimulationMode', handleSimulationMode);
    // Écouter aussi navigateToPage pour compatibilité et application immédiate
    window.addEventListener('navigateToPage', handleNavigation);
    return () => {
      window.removeEventListener('setSimulationMode', handleSimulationMode);
      window.removeEventListener('navigateToPage', handleNavigation);
    };
  }, []);

  // Charger les données sauvegardées depuis localStorage au montage
  const loadSavedData = () => {
    try {
      const savedFormData = localStorage.getItem('retraiteClair_formData');
      const savedSimulationData = localStorage.getItem('retraiteClair_simulationData');
      const savedMode = localStorage.getItem('retraiteClair_mode');
      
      if (savedFormData) {
        return JSON.parse(savedFormData);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données sauvegardées:', error);
    }
    return {
      salaireBrut: '',
      tempsPartiel: '60',
      age: '',
      trimestres: '',
      sam: '',
      pensionComplete: '',
      revenusComplementaires: ''
    };
  };

  const [simulationData, setSimulationData] = useState(() => {
    try {
      const savedSimulationData = localStorage.getItem('retraiteClair_simulationData');
      return savedSimulationData ? JSON.parse(savedSimulationData) : null;
    } catch (error) {
      return null;
    }
  });
  const [isCalculating, setIsCalculating] = useState(false);
  
  // État partagé entre les formulaires - initialisé avec les données sauvegardées
  const [sharedFormData, setSharedFormData] = useState(loadSavedData);

  // Restaurer le mode sauvegardé
  useEffect(() => {
    const savedMode = localStorage.getItem('retraiteClair_mode');
    if (savedMode && (savedMode === 'simplifie' || savedMode === 'avance')) {
      setMode(savedMode);
    }
  }, []);

  // Sauvegarder les données dans localStorage quand elles changent
  useEffect(() => {
    try {
      localStorage.setItem('retraiteClair_formData', JSON.stringify(sharedFormData));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }
  }, [sharedFormData]);

  // Sauvegarder les résultats de simulation
  useEffect(() => {
    if (simulationData) {
      try {
        localStorage.setItem('retraiteClair_simulationData', JSON.stringify(simulationData));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des résultats:', error);
      }
    }
  }, [simulationData]);

  // Sauvegarder le mode
  useEffect(() => {
    try {
      localStorage.setItem('retraiteClair_mode', mode);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du mode:', error);
    }
  }, [mode]);

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
    // IMPORTANT : À 100% (temps plein), pas de pension progressive
    let pensionProgressiveBrut, pensionCompleteBrut, pensionCompleteNet;
    
    if (tempsPartiel >= 100) {
      // Temps plein : pas de pension progressive
      pensionProgressiveBrut = 0;
      if (pensionComplete) {
        pensionCompleteNet = pensionComplete;
        pensionCompleteBrut = pensionComplete / 0.7698;
      } else {
        pensionCompleteBrut = salaireBrut * 0.5178;
        pensionCompleteNet = pensionCompleteBrut * 0.7698;
      }
    } else {
      // Temps partiel : calcul de la pension progressive
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
    }
    
    // Pension progressive nette (90% du brut, ou 0 si temps plein)
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
    // IMPORTANT: Utiliser les revenus NETS pour le calcul de l'impôt
    const revenusTempsPlein = salaireNetTempsPlein + revenusComplementaires;
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
    
    // Calculer les tranches d'imposition
    const getTrancheImposition = (revenusAnnuel) => {
      if (revenusAnnuel <= 10777) return 0;
      if (revenusAnnuel <= 27478) return 11;
      if (revenusAnnuel <= 78570) return 30;
      if (revenusAnnuel <= 168994) return 41;
      return 45;
    };
    
    const trancheAvant = getTrancheImposition(revenusTempsPleinAnnuel);
    const trancheApres = getTrancheImposition(revenusAnnuelNet);
    
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
        economie: impotTempsPlein - impotRevenu, // Mensuel
        economieAnnuelle: (impotTempsPlein - impotRevenu) * 12, // Annuel
        revenuAvant: revenusTempsPleinAnnuel, // Revenu imposable annuel avant RP
        revenuApres: revenusAnnuelNet, // Revenu imposable annuel avec RP
        trancheAvant: trancheAvant, // Tranche d'imposition avant RP (%)
        trancheApres: trancheApres // Tranche d'imposition avec RP (%)
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
        age: age,
        tempsPartiel: tempsPartiel // Ajouter le temps partiel
      }
    };
  };

  const modeMeta = {
    simplifie: {
      title: 'Mode simplifié',
      tagline: 'Estimation rapide (3 champs)',
      duration: '≈ 2 minutes',
      fields: '3 champs essentiels'
    },
    avance: {
      title: 'Mode avancé',
      tagline: 'Calcul complet en 5 étapes',
      duration: '≈ 5 minutes',
      fields: '9 champs détaillés'
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={`${styles.header} ${mode === 'avance' ? styles.advancedMode : ''}`}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Simulateur Retraite Progressive</h1>
            <p className={styles.subtitle}>
              Calculez vos revenus avec précision (mode simplifié ou avancé)
            </p>
            
            {/* Informations du mode actuel intégrées dans le header */}
            <div className={styles.modeInfoInline}>
              <div className={styles.modeInfoContent}>
                <span className={styles.modeInfoTitle}>{modeMeta[mode].title}</span>
                <span className={styles.modeInfoTagline}>{modeMeta[mode].tagline}</span>
                <div className={styles.modeInfoStats}>
                  <span className={styles.modeInfoStat}>⏱ {modeMeta[mode].duration}</span>
                  <span className={styles.modeInfoStat}>📝 {modeMeta[mode].fields}</span>
                </div>
              </div>
              <button
                type="button"
                className={styles.modeSwitchButtonInline}
                onClick={() => setMode(mode === 'simplifie' ? 'avance' : 'simplifie')}
              >
                {mode === 'simplifie' ? 'Passer au mode avancé' : 'Revenir au mode simplifié'}
              </button>
            </div>
          </div>
        </header>
        
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

        {/* Indicateur de calcul avec progression */}
        <CalculProgress isCalculating={isCalculating} />
      </div>
    </div>
  );
};

export default Simulateurs;
