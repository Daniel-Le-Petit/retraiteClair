import React, { useEffect } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import SEOHead from '../SEOHead';
import { blogArticles } from '../../data/blogArticles';
import './Blog.css';

const BlogPostStable = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Vérifier l'origine : depuis le simulateur ou depuis le blog
  const fromParam = searchParams.get('from');
  const originFromStorage = sessionStorage.getItem('blogArticleOrigin');
  const isFromSimulator = fromParam === 'simulator' || originFromStorage === 'simulator';
  
  // Si on accède depuis le blog directement (pas de paramètre from), nettoyer le sessionStorage
  useEffect(() => {
    if (!fromParam && !originFromStorage) {
      sessionStorage.removeItem('simulatorScrollPosition');
      sessionStorage.removeItem('blogArticleOrigin');
    }
  }, [fromParam, originFromStorage]);
  
  // Trouver l'article directement - pas d'état React pour éviter le flash
  const article = blogArticles.find(a => a.slug === slug);

  const renderContent = (item, index) => {
    switch (item.type) {
      case 'h2':
        return <h2 key={index} style={{ opacity: 1, transform: 'translateY(0)' }}>{item.content}</h2>;
      case 'h3':
        return <h3 key={index} style={{ opacity: 1, transform: 'translateY(0)' }}>{item.content}</h3>;
      case 'h4':
        return <h4 key={index} style={{ opacity: 1, transform: 'translateY(0)' }}>{item.content}</h4>;
      case 'p':
        return <p key={index}>{item.content}</p>;
      case 'ul':
        return (
          <ul key={index}>
            {item.content.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={index}>
            {item.content.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ol>
        );
      case 'example':
        return (
          <div key={index} className="calculation-example">
            <h4>{item.title}</h4>
            <p>{item.content}</p>
            <ul>
              {item.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        );
      case 'formula':
        return (
          <div key={index} className="formula-box">
            <strong>{item.content}</strong>
          </div>
        );
      default:
        return null;
    }
  };

  if (!article) {
    return (
      <div className="blog-post-container">
        <div className="container">
          <div className="not-found">
            <h1>Article non trouvé</h1>
            <p>L'article que vous recherchez n'existe pas.</p>
            <Link to="/blog" className="btn-primary">Retour au blog</Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            <Link to="/">Accueil</Link>
            <span>›</span>
            {isFromSimulator ? (
              <>
                <Link to="/simulateurs" onClick={(e) => {
                  e.preventDefault();
                  navigate('/simulateurs');
                  // Restaurer la position de scroll après un court délai
                  setTimeout(() => {
                    const savedPosition = sessionStorage.getItem('simulatorScrollPosition');
                    if (savedPosition) {
                      window.scrollTo(0, parseInt(savedPosition, 10));
                    }
                    // Nettoyer le sessionStorage
                    sessionStorage.removeItem('simulatorScrollPosition');
                    sessionStorage.removeItem('blogArticleOrigin');
                  }, 100);
                }}>
                  Simulateurs
                </Link>
                <span>›</span>
                <span>{article.title}</span>
              </>
            ) : (
              <>
                <Link to="/blog">Blog</Link>
                <span>›</span>
                <span>{article.title}</span>
              </>
            )}
          </nav>
          <div className="back-to-blog" style={{ marginTop: '1rem' }}>
            {isFromSimulator ? (
              <Link
                to="/simulateurs"
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/simulateurs');
                  // Restaurer la position de scroll après un court délai
                  setTimeout(() => {
                    const savedPosition = sessionStorage.getItem('simulatorScrollPosition');
                    if (savedPosition) {
                      window.scrollTo(0, parseInt(savedPosition, 10));
                    }
                    // Nettoyer le sessionStorage
                    sessionStorage.removeItem('simulatorScrollPosition');
                    sessionStorage.removeItem('blogArticleOrigin');
                  }, 100);
                }}
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                ← Retour au simulateur
              </Link>
            ) : (
              <Link
                to="/blog"
                className="btn-secondary"
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                ← Retour au blog
              </Link>
            )}
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
            
            <h1 className="post-title" style={{ opacity: 1, transform: 'translateY(0)', animation: 'none' }}>
              {article.title}
            </h1>
            
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
                e.target.style.display = 'none';
                e.target.nextSibling.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
              }}
            />
            <div className="post-image-overlay">
              <h2 className="post-image-title">{article.title}</h2>
            </div>
          </div>

          <div className="post-content">
            {article.content.map((item, index) => renderContent(item, index))}
          </div>

          {/* CTA vers simulateur */}
          <div className="post-cta">
            <div className="cta-box">
              <h3>🛠️ Calculez votre situation</h3>
              <p>Utilisez notre simulateur gratuit pour calculer précisément vos revenus en retraite progressive selon votre situation.</p>
              <Link to="/calculateur" className="btn-primary">Lancer la simulation</Link>
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

export default BlogPostStable;
