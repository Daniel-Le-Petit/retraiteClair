import React from 'react';
import { linkedinArticles } from '../data/linkedinArticles';
import styles from './LinkedInSection.module.css';

const LinkedInSection = () => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredArticles = linkedinArticles.filter(article => article.featured);
  const regularArticles = linkedinArticles.filter(article => !article.featured);

  return (
    <section className={styles.linkedinSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            📱 Articles LinkedIn
          </h2>
          <p className={styles.subtitle}>
            Suivez-nous sur LinkedIn pour plus de conseils et d'actualités
          </p>
          <a 
            href="https://linkedin.com/company/retraiteclair" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.followButton}
          >
            Suivre sur LinkedIn →
          </a>
        </div>

        {/* Articles mis en avant */}
        {featuredArticles.length > 0 && (
          <div className={styles.featuredSection}>
            <h3 className={styles.sectionTitle}>⭐ Articles à la une</h3>
            <div className={styles.featuredGrid}>
              {featuredArticles.map((article) => (
                <div key={article.id} className={styles.featuredCard}>
                  <div className={styles.cardImage}>
                    <img 
                      src={article.image || '/images/linkedin-default.svg'} 
                      alt={article.title}
                      onError={(e) => {
                        e.target.src = '/images/linkedin-default.svg';
                      }}
                    />
                    <div className={styles.linkedinBadge}>
                      📱 LinkedIn
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardMeta}>
                      <span className={styles.date}>{formatDate(article.date)}</span>
                      <span className={styles.readTime}>{article.readTime}</span>
                      <span className={styles.category}>{article.category}</span>
                    </div>
                    <h4 className={styles.cardTitle}>{article.title}</h4>
                    <p className={styles.cardExcerpt}>{article.excerpt}</p>
                    <div className={styles.cardTags}>
                      {article.tags.slice(0, 2).map(tag => (
                        <span key={tag} className={styles.tag}>#{tag}</span>
                      ))}
                    </div>
                    <a 
                      href={article.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.readMore}
                    >
                      Lire sur LinkedIn →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Autres articles */}
        {regularArticles.length > 0 && (
          <div className={styles.regularSection}>
            <h3 className={styles.sectionTitle}>Autres articles LinkedIn</h3>
            <div className={styles.regularGrid}>
              {regularArticles.map((article) => (
                <div key={article.id} className={styles.regularCard}>
                  <div className={styles.cardMeta}>
                    <span className={styles.date}>{formatDate(article.date)}</span>
                    <span className={styles.readTime}>{article.readTime}</span>
                    <span className={styles.linkedinBadgeSmall}>📱</span>
                  </div>
                  <h4 className={styles.cardTitle}>{article.title}</h4>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>
                  <a 
                    href={article.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.readMore}
                  >
                    Lire sur LinkedIn →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA pour suivre sur LinkedIn */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaBox}>
            <h3>🚀 Restez connecté</h3>
            <p>Suivez RetraiteClair sur LinkedIn pour recevoir nos derniers conseils et actualités directement dans votre fil d'actualité.</p>
            <a 
              href="https://linkedin.com/company/retraiteclair" 
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
