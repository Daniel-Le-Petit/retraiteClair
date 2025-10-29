import React from 'react';
import styles from './FaqAccordion.module.css';

const FaqAccordion = ({ items }) => {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div key={item.id} className={styles.faqItem}>
          <input 
            type="checkbox" 
            id={`faq-${item.id}`} 
            className={styles.faqToggle}
          />
          <label htmlFor={`faq-${item.id}`} className={styles.faqQuestion}>
            {item.question}
            <span className={styles.chevron}>▼</span>
          </label>
          <div className={styles.faqAnswer}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;



