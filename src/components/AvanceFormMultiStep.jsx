import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ExternalLink, Clock, User, Briefcase, PiggyBank, Plus } from 'lucide-react';
import InputField from './InputField';
import InfoBox from './InfoBox';
import styles from './AvanceFormMultiStep.module.css';

const AvanceFormMultiStep = ({ onSubmit, isCalculating, sharedData = {}, onDataChange = () => {} }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    salaireBrut: sharedData?.salaireBrut || '',
    tempsPartiel: sharedData?.tempsPartiel || '60',
    age: sharedData?.age || '',
    trimestres: sharedData?.trimestres || '',
    sam: sharedData?.sam || '',
    pensionComplete: sharedData?.pensionComplete || '',
    revenusComplementaires: sharedData?.revenusComplementaires || ''
  });

  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Définition des étapes avec des références aux composants d'icônes
  const steps = [
    {
      id: 1,
      title: 'Votre situation actuelle',
      iconComponent: User,
      fields: ['age', 'salaireBrut']
    },
    {
      id: 2,
      title: 'Votre projet de retraite progressive',
      iconComponent: Clock,
      fields: ['tempsPartiel']
    },
    {
      id: 3,
      title: 'Carrière et retraite',
      iconComponent: Briefcase,
      fields: ['trimestres', 'sam']
    },
    {
      id: 4,
      title: 'Votre pension future',
      iconComponent: PiggyBank,
      fields: ['pensionComplete']
    },
    {
      id: 5,
      title: 'Revenus complémentaires',
      iconComponent: Plus,
      fields: ['revenusComplementaires'],
      optional: true
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === 'salaireBrut' || name === 'sam' || name === 'pensionComplete' || name === 'revenusComplementaires') {
      processedValue = value.replace(/[^0-9.]/g, '');
    }
    
    const newFormData = {
      ...formData,
      [name]: processedValue
    };
    setFormData(newFormData);
    
    if (onDataChange && typeof onDataChange === 'function') {
      onDataChange({
        [name]: processedValue
      });
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Validation en temps réel
    validateField(name, processedValue);
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    
    switch (fieldName) {
      case 'salaireBrut':
        if (value && (isNaN(value) || parseFloat(value) <= 0)) {
          newErrors.salaireBrut = 'Veuillez saisir un salaire brut valide';
        } else {
          delete newErrors.salaireBrut;
        }
        break;
      case 'age':
        if (value && (isNaN(value) || parseInt(value) < 60)) {
          newErrors.age = 'Vous devez avoir au moins 60 ans';
        } else {
          delete newErrors.age;
        }
        break;
      case 'trimestres':
        if (value && (isNaN(value) || parseInt(value) < 150)) {
          newErrors.trimestres = 'Vous devez avoir au moins 150 trimestres validés';
        } else {
          delete newErrors.trimestres;
        }
        break;
      case 'sam':
        if (value && (isNaN(value) || parseFloat(value) <= 0)) {
          newErrors.sam = 'Veuillez saisir un SAM valide';
        } else {
          delete newErrors.sam;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const validateStep = (stepNumber) => {
    const step = steps.find(s => s.id === stepNumber);
    if (!step) return false;
    
    const stepErrors = {};
    
    step.fields.forEach(field => {
      if (field === 'age' && (!formData.age || parseInt(formData.age) < 60)) {
        stepErrors.age = 'Vous devez avoir au moins 60 ans';
      }
      if (field === 'salaireBrut' && (!formData.salaireBrut || parseFloat(formData.salaireBrut) <= 0)) {
        stepErrors.salaireBrut = 'Veuillez saisir un salaire brut valide';
      }
      if (field === 'trimestres' && (!formData.trimestres || parseInt(formData.trimestres) < 150)) {
        stepErrors.trimestres = 'Vous devez avoir au moins 150 trimestres validés';
      }
      if (field === 'sam' && (!formData.sam || parseFloat(formData.sam) <= 0)) {
        stepErrors.sam = 'Veuillez saisir votre SAM';
      }
    });
    
    setErrors(prev => ({ ...prev, ...stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep(currentStep) && onSubmit && typeof onSubmit === 'function') {
      onSubmit({
        ...formData,
        salaireBrut: parseFloat(formData.salaireBrut),
        tempsPartiel: parseFloat(formData.tempsPartiel),
        age: parseInt(formData.age),
        trimestres: parseInt(formData.trimestres),
        sam: parseFloat(formData.sam),
        pensionComplete: parseFloat(formData.pensionComplete) || 0,
        revenusComplementaires: parseFloat(formData.revenusComplementaires) || 0
      });
    }
  };

  const calculateHoursPerWeek = (tempsPartiel) => {
    const fullTimeHours = 35; // Heures légales
    return Math.round((tempsPartiel / 100) * fullTimeHours);
  };

  const estimatePension = () => {
    if (formData.sam && formData.trimestres) {
      const sam = parseFloat(formData.sam);
      const trimestres = parseInt(formData.trimestres);
      const taux = Math.min(trimestres / 166, 1); // Taux maximum à 166 trimestres
      return Math.round(sam * taux * 0.25); // 25% du SAM pour estimation
    }
    return null;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <InputField
              label="Votre âge"
              icon="👤"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ex: 62"
              min="60"
              max="70"
              error={errors.age}
              success={formData.age && parseInt(formData.age) >= 60 ? "Âge valide pour la retraite progressive" : null}
              tooltipContent="Vous devez avoir au moins 60 ans pour bénéficier de la retraite progressive"
            />

            <InputField
              label="Salaire brut mensuel actuel"
              icon="💰"
              type="text"
              name="salaireBrut"
              value={formData.salaireBrut}
              onChange={handleChange}
              placeholder="Ex: 4400"
              pattern="[0-9]*"
              inputMode="numeric"
              error={errors.salaireBrut}
              success={formData.salaireBrut && parseFloat(formData.salaireBrut) > 0 ? "Salaire brut valide" : null}
              tooltipContent={`Votre salaire BRUT mensuel
────────────────────────────
C'est le montant avant déduction des
cotisations sociales, indiqué en haut
de votre bulletin de salaire.

Exemple : Si vous gagnez 3000€ net,
votre brut est environ 3850€`}
              helpText="Il s'agit du salaire AVANT prélèvement des cotisations. Vous le trouvez sur votre fiche de paie."
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContent}>
            <InputField
              label="Temps partiel souhaité"
              icon="⏰"
              type="range"
              name="tempsPartiel"
              value={formData.tempsPartiel}
              onChange={handleChange}
              min="40"
              max="80"
              step="10"
            />
            
            <InfoBox type="info" className={styles.timeInfo}>
              Vous travaillerez : {calculateHoursPerWeek(formData.tempsPartiel)} heures / semaine
              <br />
              Sur une base de 35h hebdomadaires
            </InfoBox>
            
            <InfoBox type="info" className={styles.popularChoice}>
              💡 La plupart des personnes choisissent 60%
            </InfoBox>
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <InputField
              label="Nombre de trimestres validés"
              icon="📊"
              type="number"
              name="trimestres"
              value={formData.trimestres}
              onChange={handleChange}
              placeholder="Ex: 160"
              min="150"
              max="172"
              error={errors.trimestres}
              success={formData.trimestres && parseInt(formData.trimestres) >= 150 ? "Nombre valide pour votre génération" : null}
              tooltipContent="Consultez votre relevé de carrière sur lassuranceretraite.fr"
            />
            
            <InfoBox type="info" className={styles.externalLinkBox}>
              <strong>Où trouver cette information ?</strong>
              <p>📄 Consultez votre relevé de carrière sur lassuranceretraite.fr</p>
              <button
                type="button"
                className={styles.externalLink}
                onClick={() => window.open('https://www.lassuranceretraite.fr', '_blank')}
              >
                Ouvrir le site →
              </button>
            </InfoBox>

            <InputField
              label="SAM - Salaire Annuel Moyen"
              icon="📊"
              type="text"
              name="sam"
              value={formData.sam}
              onChange={handleChange}
              placeholder="Ex: 45000"
              error={errors.sam}
              showCalculator={true}
              onCalculatorResult={(result) => {
                setFormData(prev => ({ ...prev, sam: result.toString() }));
                if (onDataChange && typeof onDataChange === 'function') {
                  onDataChange({ sam: result.toString() });
                }
              }}
              helpText="Moyenne des 25 meilleures années de salaire"
            />
            
            {!formData.sam && (
              <InfoBox type="warning" className={styles.calculatorPrompt}>
                ⚠️ Vous ne connaissez pas votre SAM ?
                <br />
                Utilisez le calculateur automatique ci-dessus 🧮
              </InfoBox>
            )}
          </div>
        );

      case 4:
        const estimatedPension = estimatePension();
        return (
          <div className={styles.stepContent}>
            <InputField
              label="Pension à taux plein mensuelle"
              icon="🏦"
              type="text"
              name="pensionComplete"
              value={formData.pensionComplete}
              onChange={handleChange}
              placeholder="Ex: 1200"
              pattern="[0-9]*"
              inputMode="numeric"
              helpText="Montant NET de votre pension complète si vous ne prenez PAS la retraite progressive"
            />
            
            {estimatedPension && !formData.pensionComplete && (
              <InfoBox type="calculator" className={styles.estimateBox}>
                <strong>Estimation automatique :</strong>
                <p>Environ {estimatedPension}€/mois (basé sur votre SAM et trimestres)</p>
                <button
                  type="button"
                  className={styles.useEstimate}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, pensionComplete: estimatedPension.toString() }));
                    if (onDataChange && typeof onDataChange === 'function') {
                      onDataChange({ pensionComplete: estimatedPension.toString() });
                    }
                  }}
                >
                  Utiliser cette estimation
                </button>
              </InfoBox>
            )}
          </div>
        );

      case 5:
        return (
          <div className={styles.stepContent}>
            <InfoBox type="info" className={styles.optionalStep}>
              <strong>Cette étape est facultative</strong>
              <p>Mais elle permet un calcul plus précis de vos revenus totaux</p>
            </InfoBox>
            
            <InputField
              label="Revenus complémentaires mensuels"
              icon="➕"
              type="text"
              name="revenusComplementaires"
              value={formData.revenusComplementaires}
              onChange={handleChange}
              placeholder="Ex: 200"
              pattern="[0-9]*"
              inputMode="numeric"
              helpText="Location, freelance, autres pensions..."
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mode Avancé</h2>
        <p className={styles.description}>
          Calcul précis avec tous vos paramètres personnels
        </p>
      </div>

      {/* Barre de progression */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          {steps.map((step) => {
            const IconComponent = step.iconComponent;
            return (
              <div
                key={step.id}
                className={`${styles.progressStep} ${
                  currentStep === step.id ? styles.current : ''
                } ${completedSteps.has(step.id) ? styles.completed : ''}`}
              >
                <div className={styles.stepIcon}>
                  {completedSteps.has(step.id) ? (
                    <CheckCircle size={16} />
                  ) : (
                    IconComponent && <IconComponent size={16} />
                  )}
                </div>
                <span className={styles.stepNumber}>{step.id}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.progressText}>
          Étape {currentStep}/{steps.length} : {steps[currentStep - 1]?.title || ''}
        </div>
      </div>

      {/* Contenu de l'étape */}
      <div className={styles.stepContainer}>
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className={styles.navigation}>
        <button
          type="button"
          className={styles.prevButton}
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ChevronLeft size={16} />
          Précédent
        </button>

        {currentStep < steps.length ? (
          <button
            type="button"
            className={styles.nextButton}
            onClick={nextStep}
          >
            Continuer
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={isCalculating}
          >
            {isCalculating ? 'Calcul en cours...' : 'Calculer mes revenus précis'}
          </button>
        )}
      </div>

      <div className={styles.infoBox}>
        <h3>Mode avancé</h3>
        <p>
          Ce mode utilise vos données exactes pour un calcul précis. 
          Les résultats incluent l'impact fiscal et les revenus complémentaires.
        </p>
      </div>
    </div>
  );
};

export default AvanceFormMultiStep;
