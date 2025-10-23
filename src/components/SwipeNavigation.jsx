import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import HomePage from './HomePage';
import CalculateurAvance from './CalculateurAvance';
import BlogListStable from './Blog/BlogListStable';
import BlogPostViewer from './Blog/BlogPostViewer';
import ConseilsPageSimple from './ConseilsPageSimple';
import ContactForm from './ContactForm';
import HorizontalNavigation from './HorizontalNavigation';
import './HorizontalNavigation.css';
import './SwipeNavigation.css';

const SwipeNavigation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isTextSelection, setIsTextSelection] = useState(false);
  const [readingMode, setReadingMode] = useState(false);

  // Configuration des pages
  const pages = [
    { id: 'accueil', component: HomePage, title: 'Accueil' },
    { id: 'calculateur', component: CalculateurAvance, title: 'Simulateur' },
    { id: 'blog', component: BlogListStable, title: 'Blog' },
    { id: 'conseils', component: ConseilsPageSimple, title: 'Conseils' },
    { id: 'contact', component: ContactForm, title: 'Contact' }
  ];

  // Fonction pour scroll vers le haut
  const scrollToTop = () => {
    const activePage = document.querySelector('.swipe-page.active');
    if (activePage) {
      activePage.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Désactiver complètement tous les événements qui interfèrent avec la sélection de texte
  useEffect(() => {
    // Supprimer tous les événements de swipe et de navigation qui interfèrent
    const preventSwipeEvents = (e) => {
      // Empêcher tous les événements de swipe
      if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
        e.stopPropagation();
      }
    };

    // Désactiver les événements de swipe sur tout le document
    document.addEventListener('touchstart', preventSwipeEvents, { passive: false });
    document.addEventListener('touchmove', preventSwipeEvents, { passive: false });
    document.addEventListener('touchend', preventSwipeEvents, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventSwipeEvents);
      document.removeEventListener('touchmove', preventSwipeEvents);
      document.removeEventListener('touchend', preventSwipeEvents);
    };
  }, []);

  // Désactiver complètement le swipe pour permettre la sélection de texte
  const swipeHandlers = {}; // Swipe complètement désactivé
  
  // Détecter si on est sur une page de contenu (blog, conseils, contact)
  const isContentPage = currentIndex >= 2 || currentArticle; // Blog, conseils, contact ou article

  // Navigation par clic sur les dots
  const goToPage = (index) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => {
        setIsTransitioning(false);
        scrollToTop();
      }, 300);
    }
  };

  // Écouter les événements de navigation
  useEffect(() => {
    const handleNavigation = (event) => {
      const { page, mode } = event.detail;
      if (page === 'calculateur') {
        goToPage(1); // Index du calculateur
        // Déclencher le mode de simulation après un délai
        if (mode) {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('setSimulationMode', { detail: mode }));
          }, 400);
        }
      }
    };

    const handleArticleNavigation = (event) => {
      const { article } = event.detail;
      setCurrentArticle(article);
    };

    const handleBackToBlog = () => {
      setCurrentArticle(null);
      goToPage(2); // Index du blog
    };

    window.addEventListener('navigateToPage', handleNavigation);
    window.addEventListener('navigateToArticle', handleArticleNavigation);
    window.addEventListener('backToBlog', handleBackToBlog);
    return () => {
      window.removeEventListener('navigateToPage', handleNavigation);
      window.removeEventListener('navigateToArticle', handleArticleNavigation);
      window.removeEventListener('backToBlog', handleBackToBlog);
    };
  }, []);

  // Rendu des pages avec transition
  const renderPages = () => {
    // Si on affiche un article, on l'affiche en priorité
    if (currentArticle) {
      return (
        <div
          key="article"
          className="swipe-page active"
          style={{
            transform: 'translateX(0%)',
            opacity: 1,
            zIndex: 10,
            display: 'block'
          }}
        >
          <BlogPostViewer articleSlug={currentArticle.slug} />
        </div>
      );
    }

    return pages.map((page, index) => {
      const PageComponent = page.component;
      const isActive = index === currentIndex;
      
      return (
        <div
          key={page.id}
          className={`swipe-page ${isActive ? 'active' : ''}`}
          style={{
            transform: `translateX(${(index - currentIndex) * 100}%)`,
            opacity: isActive ? 1 : 0,
            zIndex: isActive ? 10 : 1,
            display: isActive ? 'block' : 'none'
          }}
        >
          <PageComponent />
        </div>
      );
    });
  };

  // Rendu des dots indicateurs (remplacé par le NavigationWidget)
  const renderDots = () => {
    return null; // Désactivé car remplacé par NavigationWidget
  };

  return (
    <div 
      className={`swipe-navigation ${currentArticle ? 'article-mode' : ''} ${readingMode ? 'reading-mode' : ''}`}
    >
      {/* Bouton de mode lecture */}
      {isContentPage && (
        <div className="reading-mode-toggle">
          <button 
            className={`reading-btn ${readingMode ? 'active' : ''}`}
            onClick={() => setReadingMode(!readingMode)}
            title={readingMode ? 'Désactiver le mode lecture' : 'Activer le mode lecture'}
          >
            {readingMode ? '📖 Mode lecture' : '👁️ Mode lecture'}
          </button>
        </div>
      )}
      
      <div className="swipe-container">
        {renderPages()}
      </div>
      
      {/* Horizontal Navigation Bar */}
      <HorizontalNavigation 
        currentPage={currentArticle ? 'article' : pages[currentIndex].id}
        onPageChange={(pageId) => {
          if (pageId === 'blog' && currentArticle) {
            setCurrentArticle(null);
            goToPage(2); // Index du blog
          } else {
            const pageIndex = pages.findIndex(page => page.id === pageId);
            if (pageIndex !== -1) {
              goToPage(pageIndex);
            }
          }
        }}
      />
    </div>
  );
};

export default SwipeNavigation;
