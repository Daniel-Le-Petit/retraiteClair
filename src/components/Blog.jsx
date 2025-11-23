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

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header simplifié */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Blog RetraiteClair</h1>
            <p className={styles.subtitle}>
              Guides pratiques et conseils pour réussir votre retraite progressive
            </p>
          </div>
        </header>

        {/* Section de recherche simplifiée */}
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
            </div>
            
            <div className={styles.categoryFilters}>
              <button
                className={`${styles.categoryButton} ${selectedCategory === 'all' ? styles.active : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                Tous
              </button>
              {blogCategories.slice(0, 4).map((category) => (
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

        {/* Liste des articles */}
        <section className={styles.articlesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {selectedCategory === 'all' 
                ? 'Articles' 
                : blogCategories.find(cat => cat.id === selectedCategory)?.name
              }
            </h2>
            <div className={styles.resultsInfo}>
              <p className={styles.resultsCount}>
                {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {filteredArticles.length > 0 ? (
            <div className={styles.articlesGrid}>
              {filteredArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article}
                  featured={false}
                  horizontal={true}
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

      </div>
    </div>
  );
};

export default Blog;