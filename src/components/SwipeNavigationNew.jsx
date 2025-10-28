import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import HomePage from './HomePage';
import Simulateurs from './Simulateurs';
import Blog from './Blog';
import GuidePratique from './GuidePratique';
import Contact from './Contact';
import HorizontalNavigation from './HorizontalNavigation';
import BlogPostViewer from './Blog/BlogPostViewer';
import { useGA4 } from '../hooks/useGA4';
import './HorizontalNavigation.css';
import './SwipeNavigation.css';

const SwipeNavigation = ({ currentArticle: initialArticle = null }) => {
  const { trackPageView } = useGA4();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentArticle, setCurrentArticle] = useState(initialArticle);

  // Mettre à jour currentArticle quand initialArticle change
  useEffect(() => {
    setCurrentArticle(initialArticle);
  }, [initialArticle]);

  // Configuration des pages avec métadonnées GA4
  const pages = useMemo(() => [
    { 
      id: 'accueil', 
      component: HomePage, 
      title: 'Accueil',
      gaTitle: 'Page d\'accueil - RetraiteClair',
      gaPath: '/'
    },
    { 
      id: 'simulateurs', 
      component: Simulateurs, 
      title: 'Simulateurs',
      gaTitle: 'Simulateur Retraite Progressive',
      gaPath: '/simulateurs'
    },
    { 
      id: 'blog', 
      component: Blog, 
      title: 'Blog',
      gaTitle: 'Blog Retraite Progressive',
      gaPath: '/blog'
    },
    { 
      id: 'guide-pratique', 
      component: GuidePratique, 
      title: 'Guide pratique',
      gaTitle: 'Guide Pratique Retraite Progressive',
      gaPath: '/guide-pratique'
    },
    { 
      id: 'contact', 
      component: Contact, 
      title: 'Contact',
      gaTitle: 'Contact RetraiteClair',
      gaPath: '/contact'
    }
  ], []);

  // État pour désactiver le swipe pendant la sélection de texte
  const [isTextSelected, setIsTextSelected] = useState(false);

  // Configuration des gestes de swipe
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isTextSelected && currentIndex < pages.length - 1) {
        navigateToPage(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (!isTextSelected && currentIndex > 0) {
        navigateToPage(currentIndex - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  // Gestionnaire pour détecter la sélection de texte
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const hasSelection = selection && selection.toString().length > 0;
      setIsTextSelected(hasSelection);
    };

    const handleMouseDown = (e) => {
      // Si c'est un clic sur du texte, désactiver temporairement le swipe
      if (e.target.tagName === 'P' || e.target.tagName === 'H1' || e.target.tagName === 'H2' || e.target.tagName === 'H3' || e.target.tagName === 'DIV') {
        setIsTextSelected(true);
      }
    };

    const handleMouseUp = () => {
      // Réactiver le swipe après un court délai
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.toString().length === 0) {
          setIsTextSelected(false);
        }
      }, 100);
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Navigation vers une page spécifique
  const navigateToPage = useCallback((index) => {
    if (index >= 0 && index < pages.length) {
      setCurrentIndex(index);
      const page = pages[index];
      trackPageView(page.gaTitle, page.gaPath);
    }
  }, [pages, trackPageView]);

  // Gestion des événements de navigation
  useEffect(() => {
    const handleNavigation = (event) => {
      const { page } = event.detail || {};
      
      switch (page) {
        case 'accueil':
          navigateToPage(0);
          break;
        case 'simulateurs':
        case 'calculateur':
          navigateToPage(1);
          break;
        case 'blog':
        case 'conseils':
          navigateToPage(2);
          break;
        case 'guide-pratique':
          navigateToPage(3);
          break;
        case 'contact':
          navigateToPage(4);
          break;
        default:
          console.log('Page non reconnue:', page);
      }
    };

    window.addEventListener('navigateToPage', handleNavigation);
    
    // Gestionnaire pour la navigation vers un article
    const handleArticleNavigation = (event) => {
      const { article } = event.detail;
      setCurrentArticle(article);
    };
    
    // Gestionnaire pour retourner au blog
    const handleBackToBlog = () => {
      setCurrentArticle(null);
      navigateToPage(2); // Page blog
    };
    
    window.addEventListener('navigateToArticle', handleArticleNavigation);
    window.addEventListener('backToBlog', handleBackToBlog);
    
    return () => {
      window.removeEventListener('navigateToPage', handleNavigation);
      window.removeEventListener('navigateToArticle', handleArticleNavigation);
      window.removeEventListener('backToBlog', handleBackToBlog);
    };
  }, [navigateToPage]);

  // Tracking GA4 au chargement
  useEffect(() => {
    const currentPage = pages[currentIndex];
    trackPageView(currentPage.gaTitle, currentPage.gaPath);
  }, [currentIndex, trackPageView, pages]);

  // Rendu de la page actuelle
  const CurrentPageComponent = pages[currentIndex].component;

  return (
    <div className="swipe-navigation" {...swipeHandlers}>
      <HorizontalNavigation 
        currentPage={pages[currentIndex].id}
        onPageChange={(pageId) => {
          const pageIndex = pages.findIndex(page => page.id === pageId);
          if (pageIndex !== -1) {
            navigateToPage(pageIndex);
          }
        }}
      />
      
      <div className="page-container">
        {currentArticle ? (
          <BlogPostViewer articleSlug={currentArticle.slug} />
        ) : (
          <CurrentPageComponent />
        )}
      </div>
    </div>
  );
};

// Composant wrapper pour gérer les paramètres d'URL
const SwipeNavigationWrapper = () => {
  const { slug } = useParams();
  const [currentArticle, setCurrentArticle] = useState(null);

  useEffect(() => {
    if (slug) {
      // Si on accède directement à un article via l'URL
      import('../data/blogArticles').then(({ blogArticles }) => {
        const article = blogArticles.find(a => a.slug === slug);
        if (article) {
          setCurrentArticle(article);
        }
      });
    }
  }, [slug]);

  return <SwipeNavigation currentArticle={currentArticle} />;
};

// Composant principal avec Routes pour les redirections
const AppContent = () => {
  return (
    <Routes>
      {/* Redirections des anciennes URLs */}
      <Route path="/pourquoi-retraiteclair" element={<Navigate to="/" replace />} />
      <Route path="/mon-parcours" element={<Navigate to="/contact" replace />} />
      <Route path="/calculez-vos-revenus" element={<Navigate to="/simulateurs" replace />} />
      <Route path="/conseils" element={<Navigate to="/blog" replace />} />
      
      {/* Routes principales */}
      <Route path="/" element={<SwipeNavigation />} />
      <Route path="/simulateurs" element={<SwipeNavigation />} />
      <Route path="/blog" element={<SwipeNavigation />} />
      <Route path="/guide-pratique" element={<SwipeNavigation />} />
      <Route path="/contact" element={<SwipeNavigation />} />
      
      {/* Routes pour les articles de blog */}
      <Route path="/blog/:slug" element={<SwipeNavigationWrapper />} />
      
      {/* Route par défaut */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default SwipeNavigation;
export { AppContent };
