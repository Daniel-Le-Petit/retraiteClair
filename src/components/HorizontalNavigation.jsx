import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calculator, 
  BookOpen, 
  CheckCircle, 
  User,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

const HorizontalNavigation = ({ currentPage, onPageChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navigationItems = [
    {
      id: 'accueil',
      label: 'Accueil',
      icon: Home,
      description: 'Découvrez la retraite progressive'
    },
    {
      id: 'calculateur',
      label: 'Simulations',
      icon: Calculator,
      description: 'Calculez vos revenus'
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: BookOpen,
      description: 'Conseils et actualités'
    },
    {
      id: 'conseils',
      label: 'Conseils',
      icon: CheckCircle,
      description: 'Guide pratique'
    },
    {
      id: 'about',
      label: 'Mon parcours',
      icon: User,
      description: 'Pourquoi RetraiteClair'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: MessageSquare,
      description: 'Nous contacter'
    }
  ];

  // Trouver l'index de la page actuelle
  useEffect(() => {
    if (currentPage === 'article') {
      // Si on est sur un article, on active le blog
      const blogIndex = navigationItems.findIndex(item => item.id === 'blog');
      if (blogIndex !== -1) {
        setActiveIndex(blogIndex);
      }
    } else {
      const currentIndex = navigationItems.findIndex(item => item.id === currentPage);
      if (currentIndex !== -1) {
        setActiveIndex(currentIndex);
      }
    }
  }, [currentPage]);

  const handleNavigation = (item, index) => {
    setActiveIndex(index);
    onPageChange(item.id);
  };

  // Indicateur spécial pour les articles
  const isOnArticle = currentPage === 'article';

  return (
    <div className="horizontal-navigation">
      <div className="nav-container">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;

          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavigation(item, index)}
            >
              <div className="nav-item-content">
                <div className="nav-item-icon">
                  <Icon size={20} />
                </div>
                
                <div className="nav-item-text">
                  <div className="nav-item-label">
                    {item.label}
                    {isOnArticle && item.id === 'blog' && (
                      <span className="article-indicator"> 📖</span>
                    )}
                  </div>
                  <div className="nav-item-description">
                    {isOnArticle && item.id === 'blog' ? 'Article en cours' : item.description}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalNavigation;
