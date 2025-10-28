import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CTASection.module.css';

const CTASection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Prêt à simuler ta retraite progressive ?
        </h2>
        
        <div className={styles.buttonGroup}>
          <Link to="/simulateur-simplifie" className={styles.primaryButton}>
            Estime tes revenus en 2 min
          </Link>
          
          <Link to="/simulateur-avance" className={styles.secondaryButton}>
            Optimise ta stratégie
          </Link>
        </div>
        
        <div className={styles.helpSection}>
          <p className={styles.helpText}>
            Besoin d'aide ? 
            <Link to="/contact" className={styles.helpLink}>
              Parle à un expert
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
