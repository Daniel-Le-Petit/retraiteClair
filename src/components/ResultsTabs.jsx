import React, { useState, useEffect } from 'react';
import ResultsPage from './ResultsPage';
import styles from './ResultsTabs.module.css';

const ResultsTabs = ({ data, mode, onScenarioChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${mode === 'avance' ? styles.advanced : ''}`}>
        Résultats de votre simulation
      </h2>
      
      <ResultsPage 
        data={data} 
        mode={mode} 
        onScenarioChange={onScenarioChange}
      />
    </div>
  );
};

export default ResultsTabs;