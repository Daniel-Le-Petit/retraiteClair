import React from 'react';
import styles from './ProgressFeedback.module.css';

const ProgressFeedback = ({ currentStep, totalSteps }) => {

  const renderDots = () => {
    return Array.from({ length: totalSteps }, (_, index) => {
      const stepNumber = index + 1;
      const isCompleted = stepNumber < currentStep;
      const isCurrent = stepNumber === currentStep;
      const isDone = currentStep === totalSteps;
      
      return (
        <div
          key={stepNumber}
          className={`${styles.dot} ${
            isDone || isCompleted ? styles.completed : ''
          } ${isCurrent ? styles.current : ''}`}
        >
          {stepNumber}
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.dotsContainer}>
        {renderDots()}
      </div>
    </div>
  );
};

export default ProgressFeedback;
