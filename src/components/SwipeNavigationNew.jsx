import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import HomePage from './HomePage';
import Simulateurs from './Simulateurs';
import Blog from './Blog';
import GuidePratique from './GuidePratique';
import Contact from './Contact';
import HorizontalNavigation from './HorizontalNavigation';
import BlogPostViewer from './Blog/BlogPostViewer';
import MentionsLegales from '../router-pages/mentions-legales';
import PolitiqueConfidentialite from '../router-pages/politique-confidentialite';
import ConditionsUtilisation from './ConditionsUtilisation';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import ProtectedDashboard from './ProtectedDashboard';
import RetraiteProgressivePage from '../legacy-pages/retraite-progressive';
import DecoteSurcotePage from '../legacy-pages/decote-surcote';
import CalculRetraitePage from '../legacy-pages/calcul-retraite';
import PiegesRetraitePage from '../legacy-pages/pieges-retraite';
import FAQRetraitePage from '../legacy-pages/faq-retraite';
import GuideRetraite2025Page from '../legacy-pages/guide-retraite-2025';
import DemarcheRetraiteProgressivePage from '../legacy-pages/demarche-retraite-progressive';
import TempsPartielRetraiteProgressivePage from '../legacy-pages/temps-partiel-retraite-progressive';
import FiscaliteRetraiteProgressivePage from '../legacy-pages/fiscalite-retraite-progressive';
import CasPratiquesRetraiteProgressivePage from '../legacy-pages/cas-pratiques-retraite-progressive';
import StatutRetraiteProgressivePage from '../legacy-pages/statut-retraite-progressive';
import { useGA4 } from '../hooks/useGA4';
import './HorizontalNavigation.css';
import './SwipeNavigation.css';

const SwipeNavigation = ({ currentArticle: initialArticle = null }) => {
  const { trackPageView } = useGA4();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentArticle, setCurrentArticle] = useState(initialArticle);

  // Mettre à jour currentArticle quand initialArticle change
  useEffect(() => {
    setCurrentArticle(initialArticle);
  }, [initialArticle]);

  // Configuration des pages avec métadonnées GA4
  const pages = useMemo(() => {
    const basePages = [
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
    ];

    // Dashboard Analytics - Seulement en développement ou si activé explicitement
    const isDashboardEnabled = process.env.NODE_ENV === 'development' || process.env.REACT_APP_ENABLE_DASHBOARD === 'true';
    console.log('📊 [PAGES] Dashboard enabled?', isDashboardEnabled);
    console.log('📊 [PAGES] NODE_ENV:', process.env.NODE_ENV);
    console.log('📊 [PAGES] REACT_APP_ENABLE_DASHBOARD:', process.env.REACT_APP_ENABLE_DASHBOARD);

    if (isDashboardEnabled) {
      basePages.push({
        id: 'dashboard',
        component: ProtectedDashboard,
        title: 'Dashboard',
        gaTitle: 'Dashboard Analytics',
        gaPath: '/dashboard'
      });
    }

    console.log('📊 [PAGES] Total pages:', basePages.length);
    console.log('📊 [PAGES] Page IDs:', basePages.map(p => p.id));
    return basePages;
  }, []);

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
      const { page, mode } = event.detail || {};
      
      switch (page) {
        case 'accueil':
          navigateToPage(0);
          break;
        case 'simulateurs':
        case 'calculateur':
          navigateToPage(1);
          // Déclencher le mode de simulation après un délai pour laisser le temps à la page de se charger
          if (mode) {
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('setSimulationMode', { detail: { mode: mode } }));
            }, 600);
          }
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
        case 'dashboard':
          // Trouver l'index du dashboard dans les pages
          console.log('🔍 [NAV] Dashboard navigation requested');
          console.log('🔍 [NAV] Available pages:', pages.map(p => p.id));
          const dashboardIndex = pages.findIndex(p => p.id === 'dashboard');
          console.log('🔍 [NAV] Dashboard index:', dashboardIndex);
          if (dashboardIndex !== -1) {
            console.log('✅ [NAV] Navigating to dashboard at index:', dashboardIndex);
            navigateToPage(dashboardIndex);
          } else {
            console.warn('⚠️ [NAV] Dashboard non trouvé dans les pages');
            console.warn('⚠️ [NAV] REACT_APP_ENABLE_DASHBOARD:', process.env.REACT_APP_ENABLE_DASHBOARD);
            console.warn('⚠️ [NAV] NODE_ENV:', process.env.NODE_ENV);
            // Fallback: naviguer via URL
            navigate('/dashboard');
          }
          break;
        default:
          console.log('Page non reconnue:', page);
      }
    };

    const handleLegalNavigation = (event) => {
      const { page } = event.detail || {};
      
      // Scroll to top avant la navigation
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      switch (page) {
        case 'mentions-legales':
          navigate('/mentions-legales');
          break;
        case 'politique-confidentialite':
          navigate('/politique-confidentialite');
          break;
        case 'conditions-utilisation':
          navigate('/conditions-utilisation');
          break;
        default:
          console.log('Page légale non reconnue:', page);
      }
      
      // Scroll to top après la navigation (avec un petit délai pour s'assurer que le DOM est mis à jour)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 100);
    };

    window.addEventListener('navigateToPage', handleNavigation);
    window.addEventListener('navigateToLegalPage', handleLegalNavigation);
    
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
      window.removeEventListener('navigateToLegalPage', handleLegalNavigation);
      window.removeEventListener('navigateToArticle', handleArticleNavigation);
      window.removeEventListener('backToBlog', handleBackToBlog);
    };
  }, [navigateToPage, navigate, pages]);

  // Tracking GA4 au chargement
  useEffect(() => {
    const currentPage = pages[currentIndex];
    trackPageView(currentPage.gaTitle, currentPage.gaPath);
  }, [currentIndex, trackPageView, pages]);

  // Masquer le background image pour toutes les pages principales
  useEffect(() => {
    const backgroundImage = document.querySelector('.background-image');
    
    if (backgroundImage) {
      backgroundImage.style.setProperty('display', 'none', 'important');
      backgroundImage.style.setProperty('visibility', 'hidden', 'important');
      backgroundImage.style.setProperty('opacity', '0', 'important');
    }
    
    // Forcer un background propre
    document.body.style.setProperty('background-color', '#ffffff', 'important');
    document.documentElement.style.setProperty('background-color', '#ffffff', 'important');
    
    return () => {
      // Optionnel : restaurer si nécessaire
    };
  }, [currentIndex, currentArticle]);

  // Rendu de la page actuelle
  const CurrentPageComponent = pages[currentIndex].component;

  return (
    <div className="swipe-navigation" {...swipeHandlers}>
      <HorizontalNavigation 
        currentPage={pages[currentIndex].id}
        onPageChange={(pageId) => {
          console.log('🔄🔄🔄 [SWIPE-NEW] onPageChange called with pageId:', pageId);
          console.log('🔄🔄🔄 [SWIPE-NEW] Available pages:', pages.map(p => p.id));
          const pageIndex = pages.findIndex(page => page.id === pageId);
          console.log('🔄🔄🔄 [SWIPE-NEW] Page index found:', pageIndex);
          if (pageIndex !== -1) {
            console.log('✅✅✅ [SWIPE-NEW] Navigating to page index:', pageIndex);
            navigateToPage(pageIndex);
          } else {
            console.error('❌❌❌ [SWIPE-NEW] Page not found:', pageId);
          }
        }}
      />
      
      <div className="swipe-navigation-content">
        <div className="page-container">
          {currentArticle ? (
            <BlogPostViewer articleSlug={currentArticle.slug} />
          ) : (
            <CurrentPageComponent />
          )}
        </div>
        <Footer />
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

// Composant pour scroller vers le haut à chaque changement de route
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll vers le haut immédiatement
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Double vérification après un court délai pour s'assurer que le scroll fonctionne
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

// Composant principal avec Routes pour les redirections
const AppContent = () => {
  return (
    <>
      <ScrollToTop />
      <CookieBanner />
      <Routes>
        {/* Redirections des anciennes URLs */}
        <Route path="/pourquoi-retraiteclair" element={<Navigate to="/" replace />} />
        <Route path="/mon-parcours" element={<Navigate to="/contact" replace />} />
        <Route path="/calculez-vos-revenus" element={<Navigate to="/simulateurs" replace />} />
        <Route path="/conseils" element={<Navigate to="/blog" replace />} />
        
        {/* Routes principales - Français */}
        <Route path="/" element={<SwipeNavigation />} />
        <Route path="/simulateurs" element={<SwipeNavigation />} />
        <Route path="/blog" element={<SwipeNavigation />} />
        <Route path="/guide-pratique" element={<SwipeNavigation />} />
        <Route path="/contact" element={<SwipeNavigation />} />
        <Route path="/dashboard" element={<SwipeNavigation />} />
        
        {/* Routes principales - Anglais */}
        <Route path="/en/" element={<SwipeNavigation />} />
        <Route path="/en" element={<SwipeNavigation />} />
        <Route path="/en/simulateurs" element={<SwipeNavigation />} />
        <Route path="/en/blog" element={<SwipeNavigation />} />
        <Route path="/en/guide-pratique" element={<SwipeNavigation />} />
        <Route path="/en/contact" element={<SwipeNavigation />} />
        <Route path="/en/dashboard" element={<SwipeNavigation />} />
        
        {/* Routes légales - Français */}
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
        
        {/* Routes légales - Anglais */}
        <Route path="/en/mentions-legales" element={<MentionsLegales />} />
        <Route path="/en/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/en/conditions-utilisation" element={<ConditionsUtilisation />} />
        
        {/* Routes pour les articles de blog */}
        <Route path="/blog/:slug" element={<SwipeNavigationWrapper />} />
        <Route path="/en/blog/:slug" element={<SwipeNavigationWrapper />} />
        
        {/* Routes pour les guides et FAQ optimisés IA - Français */}
        <Route path="/retraite-progressive" element={<RetraiteProgressivePage />} />
        <Route path="/decote-surcote" element={<DecoteSurcotePage />} />
        <Route path="/calcul-retraite" element={<CalculRetraitePage />} />
        <Route path="/pieges-retraite" element={<PiegesRetraitePage />} />
        <Route path="/faq-retraite" element={<FAQRetraitePage />} />
        <Route path="/guide-retraite-2025" element={<GuideRetraite2025Page />} />
        <Route path="/demarche-retraite-progressive" element={<DemarcheRetraiteProgressivePage />} />
        <Route path="/temps-partiel-retraite-progressive" element={<TempsPartielRetraiteProgressivePage />} />
        <Route path="/fiscalite-retraite-progressive" element={<FiscaliteRetraiteProgressivePage />} />
        <Route path="/cas-pratiques-retraite-progressive" element={<CasPratiquesRetraiteProgressivePage />} />
        <Route path="/statut-retraite-progressive" element={<StatutRetraiteProgressivePage />} />
        
        {/* Routes pour les guides et FAQ optimisés IA - Anglais */}
        <Route path="/en/retraite-progressive" element={<RetraiteProgressivePage />} />
        <Route path="/en/decote-surcote" element={<DecoteSurcotePage />} />
        <Route path="/en/calcul-retraite" element={<CalculRetraitePage />} />
        <Route path="/en/pieges-retraite" element={<PiegesRetraitePage />} />
        <Route path="/en/faq-retraite" element={<FAQRetraitePage />} />
        <Route path="/en/guide-retraite-2025" element={<GuideRetraite2025Page />} />
        <Route path="/en/demarche-retraite-progressive" element={<DemarcheRetraiteProgressivePage />} />
        <Route path="/en/temps-partiel-retraite-progressive" element={<TempsPartielRetraiteProgressivePage />} />
        <Route path="/en/fiscalite-retraite-progressive" element={<FiscaliteRetraiteProgressivePage />} />
        <Route path="/en/cas-pratiques-retraite-progressive" element={<CasPratiquesRetraiteProgressivePage />} />
        <Route path="/en/statut-retraite-progressive" element={<StatutRetraiteProgressivePage />} />
        
        {/* Route par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* Footer supprimé d'ici car il est maintenant dans chaque page/composant */}
    </>
  );
};

export default SwipeNavigation;
export { AppContent };
