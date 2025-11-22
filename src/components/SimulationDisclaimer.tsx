import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import styles from './SimulationDisclaimer.module.css';

export const SimulationDisclaimer = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('rcl_simulation_disclaimer_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('rcl_simulation_disclaimer_dismissed', 'true');
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div className={styles.disclaimer}>
      <div className={styles.content}>
        <AlertTriangle className={styles.icon} size={20} />
        <p className={styles.text}>
          Résultat fourni à titre indicatif. Seul l'extrait de compte de l'Assurance Retraite fait foi.
        </p>
        <button
          className={styles.closeButton}
          onClick={handleDismiss}
          aria-label="Fermer l'alerte"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default SimulationDisclaimer;


