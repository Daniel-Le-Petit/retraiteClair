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
          <Link to={`/blog/${article.id}`} className={styles.titleLink}>
            {article.title}
          </Link>
        </h3>
        
        <p className={styles.excerpt}>{article.excerpt}</p>
        
        <div className={styles.cardFooter}>
          <Link to={`/blog/${article.id}`} className={styles.readMoreLink}>
            Lire la suite →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;


