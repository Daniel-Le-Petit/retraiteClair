import React, { useEffect } from 'react';
import { faqs } from '../data/data';
import { trackEvent } from '../utils/tracking';
import styles from './FAQSection.module.css';

const FAQSection = () => {
  // Track la vue de la section FAQ
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('section_viewed', {
              section_name: 'faq',
              section_id: 'faq',
              page: 'accueil'
            });
            observer.disconnect(); // Ne track qu'une fois
          }
        });
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById('faq');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const handleAccordionToggle = (faqId, question, isOpen) => {
    if (isOpen) {
      trackEvent('accordion_opened', {
        accordion_id: `faq-${faqId}`,
        accordion_title: question,
        page: 'accueil',
        section: 'faq'
      });
    }
  };

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
                onChange={(e) => handleAccordionToggle(faq.id, faq.question, e.target.checked)}
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
