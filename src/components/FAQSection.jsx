import React from 'react';
import { faqs } from '../data/data';
import styles from './FAQSection.module.css';

const FAQSection = () => {
  return (
    <section id="faq" className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          ❓ Questions fréquentes
        </h2>
        
        <div className={styles.faqContainer}>
          {faqs.map((faq) => (
            <div key={faq.id} className={styles.faqItem}>
              <input 
                type="checkbox" 
                id={`faq-${faq.id}`} 
                className={styles.faqToggle}
              />
              <label htmlFor={`faq-${faq.id}`} className={styles.faqQuestion}>
                {faq.question}
                <span className={styles.arrow}>▼</span>
              </label>
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
