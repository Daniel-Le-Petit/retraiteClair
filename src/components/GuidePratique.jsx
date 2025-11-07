import React, { useState } from 'react';
import { checklist, resources } from '../data/data';
import styles from './GuidePratique.module.css';

const GuidePratique = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const getCheckedCount = () => {
    return Object.values(checkedItems).filter(Boolean).length;
  };

  const getProgressPercentage = () => {
    return (getCheckedCount() / checklist.length) * 100;
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Guide Pratique Retraite Progressive</h1>
            <p className={styles.subtitle}>
              Tout ce qu'il faut savoir pour réussir votre transition vers la retraite progressive
            </p>
          </div>
        </header>

        {/* Checklist */}
        <section className={styles.checklistSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Checklist avant de vous lancer</h2>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <span className={styles.progressText}>
                {getCheckedCount()}/{checklist.length} étapes complétées
              </span>
            </div>
          </div>
          
          <div className={styles.checklistContainer}>
            {checklist.map((item) => (
              <div key={item.id} className={styles.checklistItem}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={checkedItems[item.id] || false}
                    onChange={() => handleCheckboxChange(item.id)}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.checklistText}>{item.text}</span>
                </label>
              </div>
            ))}
          </div>
          
          {getCheckedCount() === checklist.length && (
            <div className={styles.completionMessage}>
              <h3>✅ Toutes les étapes sont complétées !</h3>
              <p>Vous avez rempli tous les critères. Vous pouvez maintenant passer à la simulation de vos revenus et préparer votre demande.</p>
            </div>
          )}
        </section>

        {/* Ressources */}
        <section className={styles.resourcesSection}>
          <h2 className={styles.sectionTitle}>Ressources officielles</h2>
          <div className={styles.resourcesGrid}>
            {resources.map((resource) => (
              <div key={resource.id} className={styles.resourceCard}>
                <h3 className={styles.resourceTitle}>{resource.title}</h3>
                <p className={styles.resourceDescription}>{resource.description}</p>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.resourceLink}
                >
                  Visiter le site →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Guide étape par étape */}
        <section className={styles.stepsSection}>
          <h2 className={styles.sectionTitle}>Guide étape par étape</h2>
          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Vérifiez votre éligibilité</h3>
                <p>Assurez-vous de remplir tous les critères : âge, trimestres, accord employeur.</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Simulez vos revenus</h3>
                <p>Utilisez notre simulateur pour estimer précisément vos revenus en retraite progressive.</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Négociez avec votre employeur</h3>
                <p>Discutez de votre souhait de passer à temps partiel et obtenez son accord.</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3>Rassemblez vos documents</h3>
                <p>Relevé de carrière, accord employeur, et autres documents nécessaires.</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>5</div>
              <div className={styles.stepContent}>
                <h3>Faites votre demande</h3>
                <p>Contactez l'Assurance Retraite au moins 4 mois avant la date souhaitée.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h3>Calculer vos revenus en retraite progressive</h3>
            <p>Maintenant que vous avez toutes les informations, utilisez notre simulateur pour obtenir une estimation précise de vos revenus.</p>
            <a href="/simulateurs" className={styles.ctaButton}>
              Utiliser le simulateur
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GuidePratique;


