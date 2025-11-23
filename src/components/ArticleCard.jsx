import React from 'react';
import { blogCategories } from '../data/data';
import styles from './ArticleCard.module.css';

const ArticleCard = ({ article, featured = false, horizontal = false }) => {
  const category = blogCategories.find(cat => cat.id === article.category);
  const isLinkedIn = !!article.linkedinUrl;
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Mapping des catégories pour les tags colorés
  const getCategoryInfo = (categoryId) => {
    const categoryMap = {
      'guides': { name: 'GUIDES', color: '#10b981' }, // green
      'conseils': { name: 'CONSEILS', color: '#10b981' }, // green
      'cas-etudes': { name: 'CAS D\'ÉTUDES', color: '#3b82f6' }, // blue
      'actualites': { name: 'ACTUALITÉS', color: '#3b82f6' }, // blue
      'fiscalite': { name: 'FISCALITÉ', color: '#3b82f6' }, // blue
      'demarches': { name: 'DÉMARCHES', color: '#10b981' }, // green
      'temoignages': { name: 'TÉMOIGNAGES', color: '#10b981' }, // green
      'reformes': { name: 'RÉFORMES', color: '#3b82f6' }, // blue
      'Conseils': { name: 'CONSEILS', color: '#10b981' }, // pour LinkedIn
      'Actualités': { name: 'ACTUALITÉS', color: '#3b82f6' }, // pour LinkedIn
      'Témoignages': { name: 'TÉMOIGNAGES', color: '#10b981' }, // pour LinkedIn
      'Réformes': { name: 'RÉFORMES', color: '#3b82f6' }, // pour LinkedIn
      'Fiscalité': { name: 'FISCALITÉ', color: '#3b82f6' } // pour LinkedIn
    };
    return categoryMap[categoryId] || { name: (category?.name || categoryId).toUpperCase(), color: category?.color || '#6b7280' };
  };

  const categoryInfo = getCategoryInfo(article.category);
  
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLinkedIn && article.linkedinUrl) {
      // Ouvrir le lien LinkedIn dans un nouvel onglet
      window.open(article.linkedinUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.dispatchEvent(new CustomEvent('navigateToArticle', { 
        detail: { article: article } 
      }));
    }
  };

  // Si mode horizontal, afficher avec image à gauche
  if (horizontal) {
    return (
      <article className={`${styles.card} ${styles.horizontal}`}>
        <div className={styles.imageContainer}>
          <img 
            src={article.image} 
            alt={article.title}
            className={styles.horizontalImage}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>
        
        <div className={styles.horizontalContent}>
          <div className={styles.categoryTag} style={{ backgroundColor: categoryInfo.color }}>
            {categoryInfo.name}
          </div>
          
          <div className={styles.metaInfo}>
            <span className={styles.date}>{formatDate(article.date)}</span>
            <span className={styles.separator}>,</span>
            <span className={styles.readTime}>{article.readTime}</span>
          </div>
          
          <h3 className={styles.title}>
            <button 
              className={styles.titleLink}
              onClick={handleClick}
            >
              {article.title}
            </button>
          </h3>
          
          <p className={styles.excerpt}>{article.excerpt}</p>
          
          <button 
            className={styles.readMoreLink}
            onClick={handleClick}
          >
            {isLinkedIn ? 'Lire sur LinkedIn →' : 'En savoir plus →'}
          </button>
        </div>
      </article>
    );
  }

  // Mode vertical par défaut
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <div className={styles.categoryTag} style={{ backgroundColor: categoryInfo.color }}>
        {categoryInfo.name}
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.metaInfo}>
          <span className={styles.date}>{formatDate(article.date)}</span>
          <span className={styles.separator}>,</span>
          <span className={styles.readTime}>{article.readTime}</span>
        </div>
        
        <h3 className={styles.title}>
          <button 
            className={styles.titleLink}
            onClick={handleClick}
          >
            {article.title}
          </button>
        </h3>
        
        <p className={styles.excerpt}>{article.excerpt}</p>
        
        <button 
          className={styles.readMoreLink}
          onClick={handleClick}
        >
          {isLinkedIn ? 'Lire sur LinkedIn →' : 'En savoir plus →'}
        </button>
      </div>
    </article>
  );
};

export default ArticleCard;


