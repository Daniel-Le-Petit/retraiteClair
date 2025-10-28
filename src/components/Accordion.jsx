import React, { useState } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ title, children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.accordion} ${className}`}>
      <button 
        className={styles.summary}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        {title}
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
          →
        </span>
      </button>
      {isOpen && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;


