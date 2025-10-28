import React, { useState } from 'react';
import { blogArticles, blogCategories } from '../data/data';
import ArticleCard from './ArticleCard';
import LinkedInSection from './LinkedInSection';
import styles from './Blog.module.css';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les articles selon la catégorie et la recherche
  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Articles mis en avant
  const featuredArticles = blogArticles.filter(article => article.featured);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header principal */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Blog RetraiteClair</h1>
            <p className={styles.subtitle}>
              Guides pratiques, conseils d'experts et témoignages pour réussir votre retraite progressive
            </p>
            <div className={styles.headerStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{blogArticles.length}</span>
                <span className={styles.statLabel}>Articles</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{blogCategories.length}</span>
                <span className={styles.statLabel}>Catégories</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Gratuit</span>
              </div>
            </div>
          </div>
        </header>

        {/* Section de recherche et filtres */}
        <section className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                Rechercher
              </button>
            </div>
            
            <div className={styles.categoryFilters}>
              <button
                className={`${styles.categoryButton} ${selectedCategory === 'all' ? styles.active : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                Tous les articles
              </button>
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{ '--category-color': category.color }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles mis en avant */}
        {featuredArticles.length > 0 && (
          <section className={styles.featuredSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Articles recommandés
              </h2>
              <p className={styles.sectionSubtitle}>
                Nos articles les plus populaires et utiles
              </p>
            </div>
            <div className={styles.featuredGrid}>
              {featuredArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  featured={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Liste des articles */}
        <section className={styles.articlesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {selectedCategory === 'all' 
                ? 'Tous les articles' 
                : blogCategories.find(cat => cat.id === selectedCategory)?.name
              }
            </h2>
            <div className={styles.resultsInfo}>
              <p className={styles.resultsCount}>
                {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} trouvé{filteredArticles.length > 1 ? 's' : ''}
              </p>
              {searchTerm && (
                <p className={styles.searchTerm}>
                  pour "<strong>{searchTerm}</strong>"
                </p>
              )}
            </div>
          </div>

          {filteredArticles.length > 0 ? (
            <div className={styles.articlesGrid}>
              {filteredArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article}
                  featured={false}
                />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}></div>
              <h3>Aucun article trouvé</h3>
              <p>
                {searchTerm 
                  ? `Aucun article ne correspond à "${searchTerm}". Essayez avec d'autres mots-clés.`
                  : `Aucun article dans la catégorie "${blogCategories.find(cat => cat.id === selectedCategory)?.name}".`
                }
              </p>
              <div className={styles.noResultsActions}>
                <button 
                  className={styles.resetButton}
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Voir tous les articles
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Section LinkedIn */}
        <LinkedInSection />

        {/* Newsletter */}
        <section className={styles.newsletterSection}>
          <div className={styles.newsletterCard}>
            <div className={styles.newsletterIcon}></div>
            <h3>Restez informé</h3>
            <p>Recevez nos derniers articles et conseils directement dans votre boîte mail.</p>
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Votre adresse email"
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterButton}>
                S'abonner
              </button>
            </div>
            <p className={styles.newsletterDisclaimer}>
              Vos données sont protégées. Pas de spam, désabonnement facile.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;