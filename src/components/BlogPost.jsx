import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogArticles, blogCategories } from '../data/data';
import styles from './BlogPost.module.css';

const BlogPost = () => {
  const { id } = useParams();
  const article = blogArticles.find(art => art.id === parseInt(id));
  
  if (!article) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>Article non trouvé</h1>
          <p>L'article que vous recherchez n'existe pas.</p>
          <Link to="/blog" className={styles.backLink}>
            ← Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  const category = blogCategories.find(cat => cat.id === article.category);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Navigation */}
        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.breadcrumbLink}>Accueil</Link>
          <span className={styles.separator}>›</span>
          <Link to="/blog" className={styles.breadcrumbLink}>Blog</Link>
          <span className={styles.separator}>›</span>
          <span className={styles.current}>{article.title}</span>
        </nav>

        {/* Article */}
        <article className={styles.article}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.categoryBadge} style={{ backgroundColor: category?.color }}>
              {category?.name}
            </div>
            
            <h1 className={styles.title}>{article.title}</h1>
            
            <div className={styles.meta}>
              <span className={styles.date}>{formatDate(article.date)}</span>
              <span className={styles.readTime}>{article.readTime}</span>
            </div>
            
            <p className={styles.excerpt}>{article.excerpt}</p>
          </header>

          {/* Content */}
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Footer */}
          <footer className={styles.footer}>
            <div className={styles.shareSection}>
              <h3>Partager cet article</h3>
              <div className={styles.shareButtons}>
                <button className={styles.shareButton}>
                  Facebook
                </button>
                <button className={styles.shareButton}>
                  Twitter
                </button>
                <button className={styles.shareButton}>
                  LinkedIn
                </button>
                <button className={styles.shareButton}>
                  Email
                </button>
              </div>
            </div>
            
            <div className={styles.ctaSection}>
              <h3>Prêt à simuler votre retraite progressive ?</h3>
              <p>Utilisez notre simulateur gratuit pour calculer vos revenus en retraite progressive.</p>
              <Link to="/simulateur" className={styles.ctaButton}>
                Lancer une simulation
              </Link>
            </div>
          </footer>
        </article>

        {/* Articles similaires */}
        <section className={styles.relatedSection}>
          <h2>Articles similaires</h2>
          <div className={styles.relatedGrid}>
            {blogArticles
              .filter(art => art.id !== article.id && art.category === article.category)
              .slice(0, 3)
              .map(relatedArticle => (
                <div key={relatedArticle.id} className={styles.relatedCard}>
                  <div className={styles.relatedCategory} style={{ backgroundColor: category?.color }}>
                    {category?.name}
                  </div>
                  <h3 className={styles.relatedTitle}>
                    <Link to={`/blog/${relatedArticle.id}`}>
                      {relatedArticle.title}
                    </Link>
                  </h3>
                  <p className={styles.relatedExcerpt}>{relatedArticle.excerpt}</p>
                  <div className={styles.relatedMeta}>
                    <span className={styles.relatedDate}>{formatDate(relatedArticle.date)}</span>
                    <span className={styles.relatedReadTime}>{relatedArticle.readTime}</span>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Retour au blog */}
        <div className={styles.backToBlog}>
          <Link to="/blog" className={styles.backButton}>
            ← Retour au blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
