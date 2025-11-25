import React from 'react';
import { linkedinArticles } from '../data/linkedinArticles';
import ArticleCard from './ArticleCard';
import styles from './LinkedInSection.module.css';

const LinkedInSection = () => {
  // Convertir les articles LinkedIn au format attendu par ArticleCard
  const formattedArticles = linkedinArticles.map(article => {
    // Mapping des catégories LinkedIn vers les catégories du blog
    const categoryMap = {
      'Conseils': 'conseils',
      'Actualités': 'actualites',
      'Témoignages': 'temoignages',
      'Réformes': 'reformes',
      'Fiscalité': 'fiscalite'
    };
    
    return {
      ...article,
      category: categoryMap[article.category] || article.category.toLowerCase()
    };
  });

  return (
    <section className={styles.linkedinSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Articles LinkedIn
          </h2>
          <p className={styles.subtitle}>
            Suivez-nous sur LinkedIn pour plus de conseils et d'actualités
          </p>
          <a 
            href="https://www.linkedin.com/in/clair-retraite-914755388" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.followButton}
          >
            Suivre sur LinkedIn →
          </a>
        </div>

        {/* Articles LinkedIn avec design horizontal */}
        {formattedArticles.length > 0 && (
          <div className={styles.articlesContainer}>
            <div className={styles.articlesGrid}>
              {formattedArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article}
                  featured={article.featured}
                  horizontal={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* CTA pour suivre sur LinkedIn */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaBox}>
            <h3>Restez connecté</h3>
            <p>Suivez RetraiteClair sur LinkedIn pour recevoir nos derniers conseils et actualités directement dans votre fil d'actualité.</p>
            <a 
              href="https://www.linkedin.com/in/clair-retraite-914755388" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              Suivre RetraiteClair sur LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinkedInSection;
