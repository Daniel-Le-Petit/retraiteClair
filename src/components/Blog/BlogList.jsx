import React, { useState, useEffect } from 'react';
import SEOHead from '../SEOHead';
import { blogArticles } from '../../data/blogArticles';
import './Blog.css';

const BlogList = () => {
  const [articles, setArticles] = useState(blogArticles);
  const [filteredArticles, setFilteredArticles] = useState(blogArticles);
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Les articles sont déjà initialisés dans useState

  // Filtrage des articles
  useEffect(() => {
    let filtered = articles;

    // Filtre par catégorie
    if (selectedCategory !== 'tous') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredArticles(filtered);
  }, [articles, selectedCategory, searchTerm]);

  const categories = [
    { id: 'tous', name: 'Tous les articles', count: articles.length },
    { id: 'guides', name: 'GUIDES', count: articles.filter(a => a.category === 'guides').length },
    { id: 'conseils', name: 'CONSEILS', count: articles.filter(a => a.category === 'conseils').length },
    { id: 'cas-etudes', name: 'CAS D\'ÉTUDES', count: articles.filter(a => a.category === 'cas-etudes').length },
    { id: 'actualites', name: 'ACTUALITÉS', count: articles.filter(a => a.category === 'actualites').length },
    { id: 'fiscalite', name: 'FISCALITÉ', count: articles.filter(a => a.category === 'fiscalite').length },
    { id: 'demarches', name: 'DÉMARCHES', count: articles.filter(a => a.category === 'demarches').length },
    { id: 'temoignages', name: 'TÉMOIGNAGES', count: articles.filter(a => a.category === 'temoignages').length },
    { id: 'reformes', name: 'RÉFORMES', count: articles.filter(a => a.category === 'reformes').length }
  ];

  const getCategoryInfo = (categoryId) => {
    const categoryMap = {
      'guides': { name: 'GUIDES', color: '#10b981' }, // green
      'conseils': { name: 'CONSEILS', color: '#10b981' }, // green
      'cas-etudes': { name: 'CAS D\'ÉTUDES', color: '#3b82f6' }, // blue
      'actualites': { name: 'ACTUALITÉS', color: '#3b82f6' }, // blue
      'fiscalite': { name: 'FISCALITÉ', color: '#3b82f6' }, // blue
      'demarches': { name: 'DÉMARCHES', color: '#10b981' }, // green
      'temoignages': { name: 'TÉMOIGNAGES', color: '#10b981' }, // green
      'reformes': { name: 'RÉFORMES', color: '#3b82f6' } // blue
    };
    return categoryMap[categoryId] || { name: categoryId.toUpperCase(), color: '#6b7280' };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="blog-list-container">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Chargement des articles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-list-container">
      <SEOHead 
        title="Blog RetraiteClair - Conseils et Guides Retraite Progressive"
        description="Découvrez tous nos conseils, guides et actualités sur la retraite progressive. Articles d'experts pour optimiser votre transition vers la retraite."
        keywords="blog retraite progressive, conseils retraite, guides retraite, actualités retraite"
      />
      
      {/* Header */}
      <div className="blog-header">
        <div className="container">
          <h1>Blog RetraiteClair</h1>
          <p className="blog-subtitle">
            Conseils d'experts, guides pratiques et actualités
          </p>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="blog-filters">
        <div className="container">
          <div className="filters-row">
            {/* Recherche */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            {/* Catégories */}
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Liste des articles */}
      <div className="blog-content">
        <div className="container">
          {filteredArticles.length > 0 ? (
            <div className="articles-grid">
              {filteredArticles.map(article => {
                const categoryInfo = getCategoryInfo(article.category);
                return (
                <article key={article.id} className="article-card">
                    <div className="article-category-tag" style={{ backgroundColor: categoryInfo.color }}>
                      {categoryInfo.name}
                  </div>
                  
                  <div className="article-content">
                    <div className="article-meta">
                      <span className="article-date">{formatDate(article.date)}</span>
                        <span className="article-separator">,</span>
                      <span className="article-read-time">{article.readTime}</span>
                    </div>
                    
                    <h2 className="article-title">
                      <button 
                        className="article-link"
                        onClick={() => {
                          // Navigation vers l'article
                          window.dispatchEvent(new CustomEvent('navigateToArticle', { 
                            detail: { article } 
                          }));
                        }}
                      >
                        {article.title}
                      </button>
                    </h2>
                    
                    <p className="article-excerpt">{article.excerpt}</p>
                    
                    <button 
                      className="read-more-btn"
                      onClick={() => {
                        // Navigation vers l'article
                        window.dispatchEvent(new CustomEvent('navigateToArticle', { 
                          detail: { article } 
                        }));
                      }}
                    >
                        En savoir plus →
                    </button>
                  </div>
                </article>
                );
              })}
            </div>
          ) : (
            <div className="no-articles">
              <h3>Aucun article trouvé</h3>
              <p>Essayez de modifier vos critères de recherche.</p>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="newsletter-cta">
        <div className="container">
          <div className="newsletter-content">
            <h3>Restez informé</h3>
            <p>Recevez nos derniers conseils et actualités sur la retraite progressive</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Votre adresse email" />
              <button className="btn-primary">S'abonner</button>
            </div>
            <p className="newsletter-note">
              Gratuit • Désinscription à tout moment • Pas de spam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
