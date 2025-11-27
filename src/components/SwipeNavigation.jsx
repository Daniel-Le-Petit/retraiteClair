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
import AnalyticsDashboard from './AnalyticsDashboard';
import HorizontalNavigation from './HorizontalNavigation';
import { useGA4 } from '../hooks/useGA4';
import './HorizontalNavigation.css';
import './SwipeNavigation.css';

const SwipeNavigation = () => {
  console.log('🚀🚀🚀 [SWIPE] SwipeNavigation component function called!');
  const { trackPageView, trackEvent } = useGA4();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Debug: Log les pages au montage
  useEffect(() => {
    console.log('🔄 SwipeNavigation mounted');
    console.log('🔄 NODE_ENV:', process.env.NODE_ENV);
    console.log('🔄 REACT_APP_ENABLE_DASHBOARD:', process.env.REACT_APP_ENABLE_DASHBOARD);
    console.log('🔄 Total pages:', pages.length);
    console.log('🔄 Pages IDs:', pages.map(p => p.id));
    const dashboardIndex = pages.findIndex(p => p.id === 'dashboard');
    console.log('🔄 Dashboard index:', dashboardIndex);
    if (dashboardIndex === -1) {
      console.warn('⚠️ Dashboard NOT FOUND in pages array!');
    } else {
      console.log('✅ Dashboard found at index:', dashboardIndex);
    }
  }, []);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isTextSelection, setIsTextSelection] = useState(false);
  const [readingMode, setReadingMode] = useState(false);
  const [currentLegalPage, setCurrentLegalPage] = useState(null);

  // Configuration des pages avec métadonnées GA4
  const pages = [
    { 
      id: 'accueil', 
      component: HomePage, 
      title: 'Accueil',
      gaTitle: 'Page d\'accueil - RetraiteClair',
      gaPath: '/'
    },
    { 
      id: 'calculateur', 
      component: CalculateurAvance, 
      title: 'Simulateur',
      gaTitle: 'Simulateur Retraite Progressive',
      gaPath: '/calculateur'
    },
    { 
      id: 'blog', 
      component: BlogListStable, 
      title: 'Blog',
      gaTitle: 'Blog Retraite Progressive',
      gaPath: '/blog'
    },
    { 
      id: 'conseils', 
      component: ConseilsPageSimple, 
      title: 'Conseils',
      gaTitle: 'Conseils Retraite Progressive',
      gaPath: '/conseils'
    },
    { 
      id: 'about', 
      component: AboutPage, 
      title: 'Mon parcours',
      gaTitle: 'À propos - Mon parcours',
      gaPath: '/about'
    },
    { 
      id: 'contact', 
      component: ContactForm, 
      title: 'Contact',
      gaTitle: 'Contact RetraiteClair',
      gaPath: '/contact'
    },
    // Dashboard Analytics - TOUJOURS ajouté pour le moment (on peut le restreindre après)
    {
      id: 'dashboard',
      component: AnalyticsDashboard,
      title: 'Dashboard',
      gaTitle: 'Dashboard Analytics',
      gaPath: '/dashboard'
    }
  ];
  
  // Debug: Vérifier que le dashboard est bien dans les pages (au moment de la création)
  console.log('📊📊📊 [SWIPE-MOUNT] Pages array created. Total:', pages.length);
  console.log('📊📊📊 [SWIPE-MOUNT] Pages IDs:', pages.map(p => p.id));
  console.log('📊📊📊 [SWIPE-MOUNT] Dashboard in pages?', pages.some(p => p.id === 'dashboard'));
  console.log('📊📊📊 [SWIPE-MOUNT] NODE_ENV:', process.env.NODE_ENV);
  
  // Vérifier que le composant AnalyticsDashboard est bien importé
  console.log('📊📊📊 [SWIPE-MOUNT] AnalyticsDashboard imported?', typeof AnalyticsDashboard !== 'undefined');

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
    console.log('🔄 goToPage called:', index, 'Total pages:', pages.length);
    console.log('🔄 Pages IDs:', pages.map(p => p.id));
    
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      
      // Track la page précédente
      const currentPage = pages[currentIndex];
      const newPage = pages[index];
      console.log('🔄 Navigating from:', currentPage?.id, 'to:', newPage?.id);
      
      trackEvent('page_exit', {
        event_category: 'navigation',
        event_label: currentPage.gaTitle,
        page_path: currentPage.gaPath
      });
      
      setCurrentIndex(index);
      
      // Track la nouvelle page après un délai
      setTimeout(() => {
        const newPage = pages[index];
        trackPageView(newPage.gaTitle, newPage.gaPath);
        setIsTransitioning(false);
        scrollToTop();
      }, 300);
    }
  };

  // Track la page initiale au chargement
  useEffect(() => {
    const initialPage = pages[currentIndex];
    trackPageView(initialPage.gaTitle, initialPage.gaPath);
  }, []);

  // Écouter les événements de navigation
  useEffect(() => {
    const handleNavigation = (event) => {
      const { page, mode } = event.detail;
      if (page === 'calculateur') {
        goToPage(1); // Index du calculateur
        // Déclencher le mode de simulation après un délai pour laisser le temps à la page de se charger
        if (mode) {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('setSimulationMode', { detail: { mode: mode } }));
          }, 600);
        }
      } else if (page === 'contact') {
        goToPage(4); // Index de la page contact
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
      if (page.id === 'dashboard') {
        console.log('📊 [RENDER] Rendering dashboard page at index:', index, 'currentIndex:', currentIndex, 'isActive:', index === currentIndex);
      }
      const isActive = index === currentIndex;
      
      if (isActive && page.id === 'dashboard') {
        console.log('📊 Dashboard page is active, rendering AnalyticsDashboard component');
      }
      
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
          {isActive && <PageComponent />}
        </div>
      );
    });
  };

  // Rendu des dots indicateurs (remplacé par le NavigationWidget)
  const renderDots = () => {
    return null; // Désactivé car remplacé par NavigationWidget
  };

  // Log au rendu pour vérifier que le composant se monte
  console.log('🚀🚀🚀 [SWIPE-RENDER] SwipeNavigation rendering. Current index:', currentIndex, 'Current page:', pages[currentIndex]?.id);
  console.log('🚀🚀🚀 [SWIPE-RENDER] Dashboard page exists?', pages.some(p => p.id === 'dashboard'));
  
  return (
    <div 
      className={`swipe-navigation ${currentArticle ? 'article-mode' : ''} ${readingMode ? 'reading-mode' : ''}`}
      {...swipeHandlers}
    >
      {/* Mode lecture intelligent - swipe désactivé pendant la sélection */}
      
      <div className="swipe-container">
        {renderPages()}
      </div>
      
      {/* Bouton d'accès direct au Dashboard (uniquement en développement) */}
      {(process.env.NODE_ENV === 'development' || process.env.REACT_APP_ENABLE_DASHBOARD === 'true') && (
        <button
          onClick={() => {
            const dashboardIndex = pages.findIndex(page => page.id === 'dashboard');
            console.log('Dashboard index:', dashboardIndex, 'Total pages:', pages.length);
            if (dashboardIndex !== -1) {
              goToPage(dashboardIndex);
            } else {
              console.warn('Dashboard non trouvé dans les pages. Pages disponibles:', pages.map(p => p.id));
              window.location.hash = '#dashboard';
              setTimeout(() => window.location.reload(), 100);
            }
          }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 24px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
          }}
          title="Accéder au Dashboard Analytics"
        >
          📊 Dashboard
        </button>
      )}
      
      {/* Horizontal Navigation Bar */}
      <HorizontalNavigation 
        currentPage={currentLegalPage ? 'legal' : currentArticle ? 'article' : pages[currentIndex].id}
        onPageChange={(pageId) => {
          console.log('🔄🔄🔄 [SWIPE] onPageChange called with pageId:', pageId);
          console.log('🔄🔄🔄 [SWIPE] Available pages:', pages.map(p => p.id));
          console.log('🔄🔄🔄 [SWIPE] Current index:', currentIndex);
          
          if (pageId === 'blog' && currentArticle) {
            console.log('🔄🔄🔄 [SWIPE] Blog + article case');
            setCurrentArticle(null);
            goToPage(2); // Index du blog
          } else if (pageId === 'accueil' && currentLegalPage) {
            console.log('🔄🔄🔄 [SWIPE] Accueil + legal case');
            setCurrentLegalPage(null);
            goToPage(0); // Index de l'accueil
          } else {
            console.log('🔄🔄🔄 [SWIPE] Normal navigation case');
            const pageIndex = pages.findIndex(page => page.id === pageId);
            console.log('🔄🔄🔄 [SWIPE] Page index found:', pageIndex, 'for pageId:', pageId);
            if (pageIndex !== -1) {
              console.log('✅✅✅ [SWIPE] Calling goToPage with index:', pageIndex);
              goToPage(pageIndex);
            } else {
              console.error('❌❌❌ [SWIPE] Page not found:', pageId, 'Available pages:', pages.map(p => p.id));
            }
          }
        }}
      />
    </div>
  );
};

export default SwipeNavigation;
