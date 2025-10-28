import React from 'react';
import { whyChooseFeatures } from '../data/data';
import styles from './WhyChooseSection.module.css';

const WhyChooseSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Pourquoi choisir RetraiteClair ?
        </h2>
        
        <div className={styles.grid}>
          {whyChooseFeatures.map((feature) => (
            <div key={feature.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <div className={styles.imageContainer}>
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className={styles.cardImage}
                />
              </div>
              <p className={styles.description}>{feature.description}</p>
              {feature.hasReadMore && (
                <div className={styles.readMore}>
                  <span className={styles.readMoreText}>Lire la suite →</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
