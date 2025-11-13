import React from 'react';
import { whyChooseFeatures } from '../data/data';
import styles from './WhyChooseSection.module.css';

const WhyChooseSection = () => {
  const handleReadMore = (feature) => {
    if (typeof window === 'undefined') {
      return;
    }

    switch (feature.id) {
      case 3:
        window.dispatchEvent(
          new CustomEvent('navigateToPage', { detail: { page: 'guide-pratique' } })
        );
        break;
      case 4:
        window.dispatchEvent(
          new CustomEvent('navigateToPage', { detail: { page: 'simulateurs' } })
        );
        break;
      default:
        window.dispatchEvent(
          new CustomEvent('navigateToPage', { detail: { page: 'contact' } })
        );
        break;
    }
  };

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
                <button
                  type="button"
                  className={styles.readMore}
                  onClick={() => handleReadMore(feature)}
                >
                  <span className={styles.readMoreText}>En savoir plus →</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
