import React, { useState, useEffect } from 'react';
import SEOHead from '../SEOHead';
import { blogArticles } from '../../data/blogArticles';
import './Blog.css';

const BlogPostViewer = ({ articleSlug }) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundArticle = blogArticles.find(a => a.slug === articleSlug);
    setArticle(foundArticle);
    setLoading(false);
  }, [articleSlug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case 'h2':
          return <h2 key={index}>{item.content}</h2>;
        case 'h3':
          return <h3 key={index}>{item.content}</h3>;
        case 'h4':
          return <h4 key={index}>{item.content}</h4>;
        case 'p':
          return <p key={index}>{item.content}</p>;
        case 'ul':
          return (
            <ul key={index}>
              {item.content.map((li, liIndex) => (
                <li key={liIndex}>{li}</li>
              ))}
            </ul>
          );
        case 'ol':
          return (
            <ol key={index}>
              {item.content.map((li, liIndex) => (
                <li key={liIndex}>{li}</li>
              ))}
            </ol>
          );
        case 'formula':
          return (
            <div key={index} className="formula-box">
              <strong>{item.content}</strong>
            </div>
          );
        case 'example':
          return (
            <div key={index} className="example-box">
              <h4>{item.title}</h4>
              <p>{item.content}</p>
              {item.details && (
                <ul>
                  {item.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        default:
          return null;
      }
    });
  };

  if (loading) {
    return (
      <div className="blog-post-container">
        <div className="container">
          <div className="loading">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="blog-post-container">
        <div className="container">
          <div className="not-found">
            <h1>Article non trouvé</h1>
            <p>L'article que vous recherchez n'existe pas.</p>
            <button 
              className="btn-primary"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('backToBlog'));
              }}
            >
              Retour au blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <SEOHead 
        title={`${article.title} - Blog RetraiteClair`}
        description={article.excerpt}
        keywords={article.tags.join(', ')}
      />
      
      {/* Navigation */}
      <div className="blog-nav">
        <div className="container">
          <nav className="breadcrumb">
            <button 
              className="breadcrumb-link"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('navigateToPage', { 
                  detail: { page: 'accueil' } 
                }));
              }}
            >
              Accueil
            </button>
            <span>›</span>
            <button 
              className="breadcrumb-link"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('backToBlog'));
              }}
            >
              Blog
            </button>
            <span>›</span>
            <span className="article-title-breadcrumb">{article.title}</span>
          </nav>
          <div className="back-to-blog">
            <button 
              className="btn-secondary"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('backToBlog'));
              }}
            >
              ← Retour au blog
            </button>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="blog-post">
        <div className="container">
          <div className="post-header">
            <div className="post-meta">
              <span className="post-date">{formatDate(article.date)}</span>
              <span className="post-read-time">{article.readTime}</span>
              <span className="post-category">{article.category}</span>
            </div>
            
            <h1 className="post-title">{article.title}</h1>
            
            <div className="post-excerpt">{article.excerpt}</div>
            
            <div className="post-tags">
              {article.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          </div>

          <div className="post-image">
            <img 
              src={article.image} 
              alt={article.title}
              onError={(e) => {
                e.target.src = '/images/blog-default.jpg';
              }}
            />
          </div>

          <div className="post-content">
            {renderContent(article.content)}
          </div>

          {/* CTA vers simulateur */}
          <div className="post-cta">
            <div className="cta-box">
              <h3>🛠️ Calculez votre situation</h3>
              <p>Utilisez notre simulateur gratuit pour calculer précisément vos revenus en retraite progressive selon votre situation.</p>
              <button 
                className="btn-primary"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('navigateToPage', { 
                    detail: { page: 'calculateur' } 
                  }));
                }}
              >
                Lancer la simulation
              </button>
            </div>
          </div>

          {/* Partage */}
          <div className="post-share">
            <h4>Partager cet article</h4>
            <div className="share-buttons">
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn linkedin"
              >
                LinkedIn
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn facebook"
              >
                Facebook
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn twitter"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </article>

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

export default BlogPostViewer;
