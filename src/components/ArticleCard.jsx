import React from 'react';
import { Link } from 'react-router-dom';
import { blogCategories } from '../data/data';
import styles from './ArticleCard.module.css';

const ArticleCard = ({ article, featured = false }) => {
  const category = blogCategories.find(cat => cat.id === article.category);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <div className={styles.cardHeader}>
        <div className={styles.categoryBadge} style={{ backgroundColor: category?.color }}>
          {category?.name}
        </div>
        <div className={styles.metaInfo}>
          <span className={styles.date}>{formatDate(article.date)}</span>
          <span className={styles.readTime}>{article.readTime}</span>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.title}>
          <button 
            className={styles.titleLink}
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigateToArticle', { 
                detail: { article: article } 
              }));
            }}
          >
            {article.title}
          </button>
        </h3>
        
        <p className={styles.excerpt}>{article.excerpt}</p>
        
        <div className={styles.cardFooter}>
          <button 
            className={styles.readMoreLink}
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigateToArticle', { 
                detail: { article: article } 
              }));
            }}
          >
            Lire la suite →
          </button>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;


