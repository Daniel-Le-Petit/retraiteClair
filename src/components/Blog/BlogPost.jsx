import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../SEOHead';
import './Blog.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Articles du blog (à remplacer par une API plus tard)
  useEffect(() => {
    const blogArticles = [
      {
        id: 1,
        title: "Guide Complet Retraite Progressive 2024",
        content: `
          <h2>Qu'est-ce que la retraite progressive ?</h2>
          <p>La retraite progressive est un dispositif qui vous permet de réduire progressivement votre temps de travail tout en percevant une partie de votre retraite. C'est une solution idéale pour ceux qui souhaitent une transition en douceur vers la retraite.</p>
          
          <h3>Les avantages de la retraite progressive</h3>
          <ul>
            <li><strong>Transition en douceur :</strong> Vous adaptez progressivement votre rythme de vie</li>
            <li><strong>Maintien des revenus :</strong> Vous conservez un niveau de vie satisfaisant</li>
            <li><strong>Continuité des cotisations :</strong> Vous continuez à cotiser pour votre retraite définitive</li>
            <li><strong>Test du nouveau rythme :</strong> Vous évaluez si ce mode de vie vous convient</li>
          </ul>

          <h3>Conditions d'éligibilité</h3>
          <p>Pour bénéficier de la retraite progressive, vous devez remplir plusieurs conditions :</p>
          <ol>
            <li><strong>Âge minimum :</strong> 60 ans</li>
            <li><strong>Trimestres cotisés :</strong> 150 trimestres minimum</li>
            <li><strong>Statut :</strong> Salarié du secteur privé</li>
            <li><strong>Accord employeur :</strong> Votre employeur doit accepter le temps partiel</li>
          </ol>

          <h3>Comment calculer vos revenus ?</h3>
          <p>Le calcul de vos revenus en retraite progressive dépend de plusieurs facteurs :</p>
          
          <div className="calculation-example">
            <h4>Exemple concret :</h4>
            <p>Si vous gagnez 3000€/mois et passez à 60% du temps :</p>
            <ul>
              <li>Salaire : 3000€ × 60% = 1800€</li>
              <li>Retraite : 1500€ × 40% = 600€</li>
              <li>Total : 1800€ + 600€ = 2400€/mois</li>
            </ul>
          </div>

          <h3>Démarches à effectuer</h3>
          <p>Pour faire votre demande de retraite progressive, voici les étapes à suivre :</p>
          <ol>
            <li><strong>3 mois avant :</strong> Calculez vos revenus futurs et vérifiez votre éligibilité</li>
            <li><strong>2 mois avant :</strong> Demandez l'accord de votre employeur</li>
            <li><strong>1 mois avant :</strong> Envoyez votre demande à la CARSAT/CPAM</li>
            <li><strong>Jours J :</strong> Début de votre retraite progressive</li>
          </ol>

          <h3>Optimisation fiscale</h3>
          <p>La retraite progressive peut vous permettre d'optimiser votre fiscalité :</p>
          <ul>
            <li>Évitez le taux marginal élevé d'impôt</li>
            <li>Profitez des déductions fiscales</li>
            <li>Optimisez votre TMI (Tranche Marginale d'Imposition)</li>
          </ul>

          <div className="cta-box">
            <h3>🛠️ Calculez votre situation</h3>
            <p>Utilisez notre simulateur gratuit pour calculer précisément vos revenus en retraite progressive.</p>
            <a href="/calculateur" className="btn-primary">Lancer la simulation</a>
          </div>

          <h3>Conclusion</h3>
          <p>La retraite progressive est une excellente solution pour ceux qui souhaitent une transition en douceur vers la retraite. En respectant les conditions d'éligibilité et en optimisant vos revenus, vous pouvez maintenir votre niveau de vie tout en profitant de plus de temps libre.</p>
        `,
        excerpt: "Tout ce que vous devez savoir sur la retraite progressive : éligibilité, calculs, démarches et optimisations fiscales.",
        category: "guides",
        author: "RetraiteClair",
        date: "2024-01-15",
        readTime: "15 min",
        image: "/images/guide-retraite-progressive.jpg",
        slug: "guide-complet-retraite-progressive-2024",
        tags: ["retraite progressive", "guide", "éligibilité", "calculs"]
      },
      {
        id: 2,
        title: "Comment Calculer ses Revenus en Retraite Progressive",
        content: `
          <h2>La formule de calcul</h2>
          <p>Le calcul de vos revenus en retraite progressive suit une formule simple :</p>
          <div className="formula-box">
            <strong>Revenus totaux = (Salaire × % temps partiel) + (Retraite × % retraite)</strong>
          </div>

          <h3>Exemple détaillé</h3>
          <p>Prenons l'exemple de Marie, 62 ans, cadre commerciale :</p>
          <ul>
            <li>Salaire actuel : 3200€/mois</li>
            <li>Retraite théorique : 1800€/mois</li>
            <li>Pourcentage choisi : 60% du temps</li>
          </ul>

          <h4>Calcul étape par étape :</h4>
          <ol>
            <li>Salaire 60% : 3200€ × 60% = 1920€</li>
            <li>Retraite 40% : 1800€ × 40% = 720€</li>
            <li>Total : 1920€ + 720€ = 2640€/mois</li>
          </ol>

          <h3>Facteurs à prendre en compte</h3>
          <ul>
            <li><strong>Votre salaire actuel :</strong> Salaire brut mensuel</li>
            <li><strong>Votre retraite théorique :</strong> Calculée par la CARSAT</li>
            <li><strong>Le pourcentage choisi :</strong> Entre 40% et 80%</li>
            <li><strong>Les primes :</strong> Éventuellement maintenues</li>
          </ul>

          <div className="cta-box">
            <h3>🧮 Testez votre situation</h3>
            <p>Utilisez notre simulateur pour calculer précisément vos revenus selon votre situation.</p>
            <a href="/calculateur" className="btn-primary">Calculer mes revenus</a>
          </div>
        `,
        excerpt: "Formule complète et exemples concrets pour calculer précisément vos revenus en retraite progressive.",
        category: "conseils",
        author: "RetraiteClair",
        date: "2024-01-12",
        readTime: "8 min",
        image: "/images/calcul-revenus.jpg",
        slug: "comment-calculer-revenus-retraite-progressive",
        tags: ["calcul", "revenus", "formule", "exemples"]
      }
      // Ajouter les autres articles...
    ];

    const currentArticle = blogArticles.find(a => a.slug === slug);
    setArticle(currentArticle);
    
    // Articles similaires
    const related = blogArticles
      .filter(a => a.id !== currentArticle?.id && a.category === currentArticle?.category)
      .slice(0, 3);
    setRelatedArticles(related);
    
    setLoading(false);
  }, [slug]);

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
            <Link to="/blog">Blog</Link>
            <span>›</span>
            <span>{article.title}</span>
          </nav>
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

          <div 
            className="post-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

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

      {/* Articles similaires */}
      {relatedArticles.length > 0 && (
        <div className="related-articles">
          <div className="container">
            <h3>Articles similaires</h3>
            <div className="related-grid">
              {relatedArticles.map(relatedArticle => (
                <div key={relatedArticle.id} className="related-card">
                  <div className="related-image">
                    <img 
                      src={relatedArticle.image} 
                      alt={relatedArticle.title}
                      onError={(e) => {
                        e.target.src = '/images/blog-default.jpg';
                      }}
                    />
                  </div>
                  <div className="related-content">
                    <h4>
                      <Link to={`/blog/${relatedArticle.slug}`}>
                        {relatedArticle.title}
                      </Link>
                    </h4>
                    <p>{relatedArticle.excerpt}</p>
                    <Link to={`/blog/${relatedArticle.slug}`} className="read-more">
                      Lire l'article →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

export default BlogPost;
