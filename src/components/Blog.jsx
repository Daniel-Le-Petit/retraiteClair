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
        <header className={styles.header}>
          <h1 className={styles.title}>Blog & Conseils Retraite Progressive</h1>
          <p className={styles.subtitle}>
            Actualités, conseils et témoignages pour optimiser votre transition
          </p>
        </header>

        {/* Articles mis en avant */}
        {featuredArticles.length > 0 && (
          <section className={styles.featuredSection}>
            <h2 className={styles.sectionTitle}>⭐ Articles à la une</h2>
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

        {/* Filtres et recherche */}
        <section className={styles.filtersSection}>
          <div className={styles.searchContainer}>
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
        </section>

        {/* Liste des articles */}
        <section className={styles.articlesSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.sectionTitle}>
              {selectedCategory === 'all' 
                ? 'Tous les articles' 
                : blogCategories.find(cat => cat.id === selectedCategory)?.name
              }
            </h2>
            <p className={styles.resultsCount}>
              {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
            </p>
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
              <h3>Aucun article trouvé</h3>
              <p>Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.</p>
            </div>
          )}
        </section>

        {/* Section LinkedIn */}
        <LinkedInSection />

        {/* Newsletter */}
        <section className={styles.newsletterSection}>
          <div className={styles.newsletterCard}>
            <h3>📧 Restez informé</h3>
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;

