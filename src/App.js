import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import CalculateurAvance from './components/CalculateurAvance';
import ConseilsPageSimple from './components/ConseilsPageSimple';
import ContactForm from './components/ContactForm';
import BlogListStable from './components/Blog/BlogListStable';
import BlogPostStable from './components/Blog/BlogPostStable';
import './index.css';
import './sidebar.css';
import './definition-styles.css';
import './hero-styles.css';
import './eligibility-styles.css';
import './financial-impact-styles.css';
import './personal-info-styles.css';
import './calculateur-avance-styles.css';
import './calculateur-mobile-styles.css';
import './conseils-styles.css';
import './homepage-styles.css';
import './swipe-styles.css';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('accueil');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Configuration des pages pour le swipe
  const pages = [
    { id: 'accueil', path: '/', name: 'Accueil' },
    { id: 'calculateur', path: '/calculateur', name: 'Calculateur' },
    { id: 'conseils', path: '/conseils', name: 'Conseils' },
    { id: 'contact', path: '/contact', name: 'Contact' },
    { id: 'blog', path: '/blog', name: 'Blog' }
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Mettre à jour currentPage basé sur l'URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setCurrentPage('accueil');
    else if (path === '/calculateur') setCurrentPage('calculateur');
    else if (path === '/conseils') setCurrentPage('conseils');
    else if (path === '/contact') setCurrentPage('contact');
    else if (path.startsWith('/blog')) setCurrentPage('blog');
  }, [location.pathname]);

  // Fonction pour naviguer vers la page suivante/précédente
  const navigateToPage = (direction) => {
    const currentIndex = pages.findIndex(page => page.id === currentPage);
    let newIndex;
    
    if (direction === 'left') {
      newIndex = currentIndex + 1;
      if (newIndex >= pages.length) newIndex = 0; // Retour au début
    } else {
      newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = pages.length - 1; // Aller à la fin
    }
    
    const newPage = pages[newIndex];
    navigate(newPage.path);
    setCurrentPage(newPage.id);
  };

  // Gestion des événements tactiles
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      navigateToPage('left'); // Swipe gauche = page suivante
    }
    if (isRightSwipe) {
      navigateToPage('right'); // Swipe droite = page précédente
    }
  };

  return (
    <div 
      className="App"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculateur" element={<CalculateurAvance />} />
          <Route path="/conseils" element={<ConseilsPageSimple onPageChange={handlePageChange} />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/blog" element={<BlogListStable />} />
          <Route path="/blog/:slug" element={<BlogPostStable />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
