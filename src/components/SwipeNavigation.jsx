import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import HomePage from './HomePage';
import CalculateurAvance from './CalculateurAvance';
import BlogListStable from './Blog/BlogListStable';
import ConseilsPageSimple from './ConseilsPageSimple';
import ContactForm from './ContactForm';
import './SwipeNavigation.css';

const SwipeNavigation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Configuration des pages
  const pages = [
    { id: 'accueil', component: HomePage, title: 'Accueil' },
    { id: 'calculateur', component: CalculateurAvance, title: 'Simulateur' },
    { id: 'blog', component: BlogListStable, title: 'Blog' },
    { id: 'conseils', component: ConseilsPageSimple, title: 'Conseils' },
    { id: 'contact', component: ContactForm, title: 'Contact' }
  ];

  // Gestion du swipe
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % pages.length);
        setTimeout(() => setIsTransitioning(false), 300);
      }
    },
    onSwipedRight: () => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + pages.length) % pages.length);
        setTimeout(() => setIsTransitioning(false), 300);
      }
    },
    preventDefaultTouchmoveEvent: false,
    trackMouse: true,
    delta: 50
  });

  // Navigation par clic sur les dots
  const goToPage = (index) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  // Rendu des pages avec transition
  const renderPages = () => {
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

  // Rendu des dots indicateurs
  const renderDots = () => {
    return (
      <div className="dots-indicator">
        {pages.map((page, index) => (
          <button
            key={page.id}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToPage(index)}
            aria-label={`Aller à ${page.title}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="swipe-navigation" {...swipeHandlers}>
      <div className="swipe-container">
        {renderPages()}
      </div>
      {renderDots()}
    </div>
  );
};

export default SwipeNavigation;
