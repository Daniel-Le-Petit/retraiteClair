import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import HomePage from './HomePage';
import CalculateurAvance from './CalculateurAvance';
import BlogListStable from './Blog/BlogListStable';
import BlogPostViewer from './Blog/BlogPostViewer';
import ConseilsPageSimple from './ConseilsPageSimple';
import AboutPage from './AboutPage';
import ContactForm from './ContactForm';
import LegalPage from './LegalPage';
import HorizontalNavigation from './HorizontalNavigation';
import './HorizontalNavigation.css';
import './SwipeNavigation.css';

const SwipeNavigation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isTextSelection, setIsTextSelection] = useState(false);
  const [readingMode, setReadingMode] = useState(false);
  const [currentLegalPage, setCurrentLegalPage] = useState(null);

  // Configuration des pages
  const pages = [
    { id: 'accueil', component: HomePage, title: 'Accueil' },
    { id: 'calculateur', component: CalculateurAvance, title: 'Simulateur' },
    { id: 'blog', component: BlogListStable, title: 'Blog' },
    { id: 'conseils', component: ConseilsPageSimple, title: 'Conseils' },
    { id: 'about', component: AboutPage, title: 'Mon parcours' },
    { id: 'contact', component: ContactForm, title: 'Contact' }
  ];

  // Fonction pour scroll vers le haut
  const scrollToTop = () => {
    const activePage = document.querySelector('.swipe-page.active');
    if (activePage) {
      activePage.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Détection intelligente de sélection de texte pour mobile
  useEffect(() => {
    let isSelecting = false;
    let selectionTimeout = null;

    const handleSelectionStart = (e) => {
      // Détecter si on commence une sélection de texte
      const target = e.target;
      
      // Vérifier si closest est disponible et si c'est un élément de texte
      if (target && typeof target.closest === 'function') {
        const isTextElement = target.closest('p, h1, h2, h3, h4, h5, h6, span, div, article, section, .post-content, .article-content, .conseils-content');
        
        if (isTextElement) {
          isSelecting = true;
          setIsTextSelection(true);
          setReadingMode(true);
        }
      } else {
        // Fallback : vérifier le tagName directement
        const textTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'DIV', 'ARTICLE', 'SECTION'];
        if (target && textTags.includes(target.tagName)) {
          isSelecting = true;
          setIsTextSelection(true);
          setReadingMode(true);
        }
      }
    };

    const handleSelectionChange = () => {
      // Vérifier si getSelection est disponible
      if (typeof window.getSelection === 'function') {
        const selection = window.getSelection();
        const hasSelection = selection && selection.toString().length > 0;
        
        if (hasSelection) {
          isSelecting = true;
          setIsTextSelection(true);
          setReadingMode(true);
        } else {
          // Délai avant de réactiver le swipe
          selectionTimeout = setTimeout(() => {
            isSelecting = false;
            setIsTextSelection(false);
            setReadingMode(false);
          }, 300);
        }
      }
    };

    const handleTouchStart = (e) => {
      handleSelectionStart(e);
    };

    const handleTouchEnd = () => {
      // Vérifier après un délai si on a encore une sélection
      setTimeout(() => {
        if (typeof window.getSelection === 'function') {
          const selection = window.getSelection();
          if (selection && selection.toString().length === 0) {
            isSelecting = false;
            setIsTextSelection(false);
            setReadingMode(false);
          }
        }
      }, 200);
    };

    // Événements pour la détection de sélection
    document.addEventListener('selectstart', handleSelectionStart);
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('selectstart', handleSelectionStart);
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      if (selectionTimeout) {
        clearTimeout(selectionTimeout);
      }
    };
  }, []);

  // Réactiver le swipe avec détection intelligente de sélection de texte
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isTextSelection && !readingMode && !currentArticle) {
        if (currentIndex < pages.length - 1) {
          goToPage(currentIndex + 1);
        }
      }
    },
    onSwipedRight: () => {
      if (!isTextSelection && !readingMode && !currentArticle) {
        if (currentIndex > 0) {
          goToPage(currentIndex - 1);
        }
      }
    },
    delta: 50, // Sensibilité du swipe
    trackMouse: false, // Pas de swipe avec la souris
    preventDefaultTouchmoveEvent: false, // Permettre le scroll
  });
  
  // Détecter si on est sur une page de contenu (blog, conseils, contact, legal)
  const isContentPage = currentIndex >= 2 || currentArticle || currentLegalPage; // Blog, conseils, contact, legal ou article

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
      } else if (page === 'about') {
        goToPage(4); // Index de la page Mon parcours
      } else if (page === 'contact') {
        goToPage(5); // Index de la page contact
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

    const handleLegalNavigation = (event) => {
      const { page } = event.detail;
      setCurrentLegalPage(page);
    };

    const handleBackToHome = () => {
      setCurrentLegalPage(null);
      goToPage(0); // Index de l'accueil
    };

    window.addEventListener('navigateToPage', handleNavigation);
    window.addEventListener('navigateToArticle', handleArticleNavigation);
    window.addEventListener('backToBlog', handleBackToBlog);
    window.addEventListener('navigateToLegalPage', handleLegalNavigation);
    window.addEventListener('backToHome', handleBackToHome);
    return () => {
      window.removeEventListener('navigateToPage', handleNavigation);
      window.removeEventListener('navigateToArticle', handleArticleNavigation);
      window.removeEventListener('backToBlog', handleBackToBlog);
      window.removeEventListener('navigateToLegalPage', handleLegalNavigation);
      window.removeEventListener('backToHome', handleBackToHome);
    };
  }, []);

  // Rendu des pages avec transition
  const renderPages = () => {
    // Si on affiche une page légale, on l'affiche en priorité
    if (currentLegalPage) {
      return (
        <div
          key="legal"
          className="swipe-page active"
          style={{
            transform: 'translateX(0%)',
            opacity: 1,
            zIndex: 10,
            display: 'block'
          }}
        >
          <LegalPage />
        </div>
      );
    }

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
      {...swipeHandlers}
    >
      {/* Mode lecture intelligent - swipe désactivé pendant la sélection */}
      
      <div className="swipe-container">
        {renderPages()}
      </div>
      
      {/* Horizontal Navigation Bar */}
      <HorizontalNavigation 
        currentPage={currentLegalPage ? 'legal' : currentArticle ? 'article' : pages[currentIndex].id}
        onPageChange={(pageId) => {
          if (pageId === 'blog' && currentArticle) {
            setCurrentArticle(null);
            goToPage(2); // Index du blog
          } else if (pageId === 'accueil' && currentLegalPage) {
            setCurrentLegalPage(null);
            goToPage(0); // Index de l'accueil
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
