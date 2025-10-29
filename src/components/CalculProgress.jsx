import React, { useState, useEffect } from 'react';
import { Calculator, CheckCircle, Loader } from 'lucide-react';
import styles from './CalculProgress.module.css';

const CalculProgress = ({ isCalculating }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 1, label: 'Analyse de votre profil', completed: false },
    { id: 2, label: 'Calcul des cotisations', completed: false },
    { id: 3, label: 'Optimisation fiscale...', completed: false }
  ];

  useEffect(() => {
    if (!isCalculating) {
      setProgress(0);
      setCurrentStep(0);
      return;
    }

    // Simulation de progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Mise à jour des étapes
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length) {
          clearInterval(stepInterval);
          return steps.length;
        }
        return prev + 1;
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [isCalculating, steps.length]);

  if (!isCalculating) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <Calculator size={24} />
          <h3>🧮 Calcul en cours...</h3>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.progressText}>
            {progress}%
          </div>
        </div>

        <div className={styles.stepsList}>
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep - 1;
            
            return (
              <div 
                key={step.id} 
                className={`${styles.stepItem} ${
                  isCompleted ? styles.completed : ''
                } ${isCurrent ? styles.current : ''}`}
              >
                {isCompleted ? (
                  <CheckCircle size={18} />
                ) : isCurrent ? (
                  <Loader size={18} className={styles.spinner} />
                ) : (
                  <div className={styles.stepDot}></div>
                )}
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalculProgress;
