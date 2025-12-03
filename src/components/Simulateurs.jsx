import React, { useState, useEffect, useRef } from 'react';
import SimplifieForm from './SimplifieForm';
import AvanceFormMultiStep from './AvanceFormMultiStep';
import ResultsTabs from './ResultsTabs';
import CalculProgress from './CalculProgress';
import { trackEvent, trackTimeOnPage, initScrollTracking } from '../utils/tracking';
import { 
  getTrimestresRequis,
  calculerTauxLiquidation,
  calculerSurcote,
  calculerPensionBase,
  calculerPensionProgressive
} from '../utils/retraiteFormulas';
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
      revenusComplementaires: '',
      cotisationSur100Pourcent: false
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
  
  // Tracking du temps passé sur la page
  const pageStartTime = useRef(Date.now());
  
  // Track le temps passé quand l'utilisateur quitte la page
  useEffect(() => {
    const startTime = pageStartTime.current;
    return () => {
      trackTimeOnPage('simulateur', startTime);
    };
  }, []);
  
  // Track le scroll depth
  useEffect(() => {
    return initScrollTracking('simulateur');
  }, []);
  
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
    // Track le début du calcul
    trackEvent('calculation_started', {
      mode: mode === 'avance' ? 'advanced' : 'simplified',
      salaire_brut: data.salaireBrut,
      temps_partiel: data.tempsPartiel,
      age: data.age
    });
    
    setIsCalculating(true);
    
    // En mode simplifié, forcer cotisationSur100Pourcent à false
    const dataToCalculate = mode === 'simplifie' 
      ? { ...data, cotisationSur100Pourcent: false }
      : data;
    
    // Calculs précis basés sur les règles officielles de la retraite progressive
    setTimeout(() => {
      const results = calculateRetraiteProgressive(dataToCalculate);
      // Ajouter le mode dans les résultats pour que CalculationDetails puisse le détecter
      results.mode = mode === 'avance' ? 'advanced' : 'simplified';
      setSimulationData(results);
      setIsCalculating(false);
      
      // Track la fin du calcul avec résultats
      trackEvent('calculation_completed', {
        mode: mode === 'avance' ? 'advanced' : 'simplified',
        revenu_total: results.revenusNets?.total || 0,
        economie_fiscale: results.impactFiscal?.economie || 0,
        temps_partiel: data.tempsPartiel,
        revenu_temps_plein: results.revenusNets?.tempsPlein || 0,
        salaire_brut: data.salaireBrut
      });
    }, 1500);
  };

  // Fonction de calcul précise de la retraite progressive selon la génération
  const calculateRetraiteProgressive = (data) => {
    const { salaireBrut, tempsPartiel, age, trimestres, sam, pensionComplete, revenusComplementaires = 0, cotisationSur100Pourcent = false, anneeNaissance: anneeNaissanceInput } = data;
    
    // Utiliser l'année de naissance si fournie directement, sinon la calculer à partir de l'âge
    // ATTENTION : Le calcul depuis l'âge peut être imprécis (dépend du mois de naissance)
    const anneeNaissance = anneeNaissanceInput 
      ? (typeof anneeNaissanceInput === 'string' ? parseInt(anneeNaissanceInput, 10) : anneeNaissanceInput)
      : (age ? new Date().getFullYear() - parseInt(age) : null);
    
    // Calculs selon les valeurs M@rel exactes
    // Salaire brut temps partiel (selon M@rel)
    const salaireBrutTempsPartiel = salaireBrut * (tempsPartiel / 100);
    
    // Salaire net temps plein (76.98% du brut selon M@rel exact)
    const salaireNetTempsPlein = salaireBrut * 0.7698;
    
    // Salaire net temps partiel
    // Si cotisationSur100Pourcent est activé, les cotisations sont calculées sur 100% du salaire brut
    let salaireNetTempsPartiel;
    if (cotisationSur100Pourcent) {
      // Cotisations sur 100% du salaire brut (23.02% de cotisations)
      const cotisations = salaireBrut * 0.2302;
      // Salaire net = salaire brut temps partiel - cotisations sur temps plein
      salaireNetTempsPartiel = salaireBrutTempsPartiel - cotisations;
    } else {
      // Cotisations sur le salaire brut temps partiel (76.98% du brut temps partiel)
      salaireNetTempsPartiel = salaireBrutTempsPartiel * 0.7698;
    }
    
    // Pension progressive brut - Utiliser la pension saisie si disponible
    // IMPORTANT : À 100% (temps plein), pas de pension progressive
    let pensionProgressiveBrut, pensionCompleteBrut, pensionCompleteNet;
    
    // Calculer la pension en fonction de la génération si on a les informations nécessaires
    if (anneeNaissance && trimestres && sam) {
      // Mode avancé avec génération : calcul précis basé sur les formules officielles
      const trimestresRequis = getTrimestresRequis(anneeNaissance);
      const tauxLiquidation = calculerTauxLiquidation(parseInt(trimestres) || 0, trimestresRequis);
      const surcote = calculerSurcote(parseInt(trimestres) || 0, trimestresRequis);
      
      // Calculer la pension complète annuelle brute
      const samAnnuel = sam || (salaireBrut * 12 * 0.8);
      const pensionCompleteAnnuelleBrute = calculerPensionBase(samAnnuel, tauxLiquidation, surcote);
      
      // Convertir en mensuel
      pensionCompleteBrut = pensionCompleteAnnuelleBrute / 12;
      pensionCompleteNet = pensionCompleteBrut * 0.9; // 10% de cotisations
      
      // Calculer la pension progressive (40% de la pension complète en retraite progressive)
      if (tempsPartiel < 100) {
        const tauxProgression = 0.4; // 40% de la pension complète
        const pensionProgressiveAnnuelleBrute = calculerPensionProgressive(pensionCompleteAnnuelleBrute, tauxProgression);
        pensionProgressiveBrut = pensionProgressiveAnnuelleBrute / 12;
      } else {
        pensionProgressiveBrut = 0;
      }
    } else if (tempsPartiel >= 100) {
      // Temps plein : pas de pension progressive
      pensionProgressiveBrut = 0;
      if (pensionComplete) {
        pensionCompleteNet = pensionComplete;
        pensionCompleteBrut = pensionComplete / 0.9; // Convertir net en brut (10% cotisations)
      } else {
        // Estimation si pas de données précises
        // Pension complète après RP = 57.58% du salaire brut (basé sur chiffres officiels)
        pensionCompleteBrut = salaireBrut * 0.5758;
        pensionCompleteNet = pensionCompleteBrut * 0.9;
      }
    } else {
      // Mode simplifié ou données incomplètes : utiliser les ratios M@rel
      if (pensionComplete) {
        // Mode avancé : utiliser la pension réelle saisie
        pensionCompleteNet = pensionComplete;
        pensionCompleteBrut = pensionComplete / 0.9;
        // Estimation de la pension progressive (40% de la pension complète)
        pensionProgressiveBrut = (pensionCompleteBrut * 0.4);
      } else {
        // Mode simplifié : calcul selon les valeurs officielles exactes
        // Pension progressive brut = 17.38% du salaire brut (basé sur chiffres officiels)
        pensionProgressiveBrut = salaireBrut * 0.1738;
        // Pension complète après RP = 57.58% du salaire brut (basé sur chiffres officiels)
        // Cette pension prend en compte les droits accumulés pendant la retraite progressive
        pensionCompleteBrut = salaireBrut * 0.5758;
        pensionCompleteNet = pensionCompleteBrut * 0.9;
      }
    }
    
    // Pension progressive nette (90% du brut après cotisations de 10%, ou 0 si temps plein)
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
        salariales: cotisationSur100Pourcent ? salaireBrut * 0.2302 : salaireBrutTempsPartiel * 0.2302,
        pension: pensionProgressiveBrut * 0.1,
        total: (cotisationSur100Pourcent ? salaireBrut * 0.2302 : salaireBrutTempsPartiel * 0.2302) + (pensionProgressiveBrut * 0.1),
        sur100Pourcent: cotisationSur100Pourcent
      },
      details: {
        tauxPension: anneeNaissance && trimestres ? calculerTauxLiquidation(parseInt(trimestres) || 0, getTrimestresRequis(anneeNaissance)) : 1.0,
        tauxProgressive: 0.4, // 40% de la pension complète
        sam: sam || (salaireBrut * 12 * 0.8),
        trimestres: trimestres,
        trimestresRequis: anneeNaissance ? getTrimestresRequis(anneeNaissance) : null,
        age: age,
        anneeNaissance: anneeNaissance,
        tempsPartiel: tempsPartiel,
        surcote: anneeNaissance && trimestres ? calculerSurcote(parseInt(trimestres) || 0, getTrimestresRequis(anneeNaissance)) : 1.0,
        cotisationSur100Pourcent: cotisationSur100Pourcent
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
            <div className={`${styles.modeInfoInline} ${mode === 'simplifie' ? styles.simplifieMode : styles.advancedMode}`}>
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
              // Recalculer avec le nouveau temps partiel en conservant toutes les autres données (y compris cotisationSur100Pourcent)
              const newData = {
                ...sharedFormData,
                tempsPartiel: percentage.toString()
                // cotisationSur100Pourcent est déjà dans sharedFormData, donc conservé automatiquement
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
