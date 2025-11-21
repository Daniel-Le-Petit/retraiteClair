import React, { useState, useEffect } from 'react';
import ResultsPage from './ResultsPage';
import styles from './ResultsTabs.module.css';

const ResultsTabs = ({ data, mode, onScenarioChange }) => {
  useEffect(() => {
    // Mobile detection removed - using CSS media queries instead
    // No cleanup needed
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