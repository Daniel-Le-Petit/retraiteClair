import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../SEOHead';
import { blogArticles } from '../../data/blogArticles';
import './Blog.css';

const BlogListStable = () => {
  // Pas d'état React - rendu direct pour éviter tout flash
  const [selectedCategory, setSelectedCategory] = React.useState('tous');
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filtrage direct sans délai
  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = selectedCategory === 'tous' || article.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['tous', 'guides', 'conseils', 'cas-etudes', 'actualites'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            Conseils d'experts, guides pratiques et actualités pour optimiser votre retraite progressive
          </p>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="blog-filters">
        <div className="container">
          <div className="filters-row">
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  style={{ opacity: 1, transform: 'translateY(0)' }}
                >
                  {category === 'tous' ? 'Tous' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu du blog */}
      <div className="blog-content">
        <div className="container">
          <div className="articles-grid">
            {filteredArticles.map(article => (
              <article key={article.id} className="article-card" style={{ opacity: 1, transform: 'translateY(0)' }}>
                <div className="article-image">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="article-category">{article.category}</div>
                </div>
                
                <div className="article-content">
                  <div className="article-meta">
                    <span className="article-date">{formatDate(article.date)}</span>
                    <span className="article-read-time">{article.readTime}</span>
                  </div>
                  
                  <h2 className="article-title" style={{ opacity: 1, transform: 'translateY(0)' }}>
                    <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                  </h2>
                  
                  <p className="article-excerpt">{article.excerpt}</p>
                  
                  <div className="article-footer">
                    <div className="article-tags">
                      {article.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="article-tag">#{tag}</span>
                      ))}
                    </div>
                    <Link to={`/blog/${article.slug}`} className="read-more">
                      Lire la suite →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="newsletter-cta">
        <div className="container">
          <div className="newsletter-content">
            <h3>📧 Restez informé</h3>
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

export default BlogListStable;
