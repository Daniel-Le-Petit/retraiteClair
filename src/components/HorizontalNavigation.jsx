import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calculator, 
  BookOpen, 
  CheckCircle, 
  MessageSquare,
  BarChart3
} from 'lucide-react';

const HorizontalNavigation = ({ currentPage, onPageChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navigationItems = React.useMemo(() => {
    const baseItems = [
      {
        id: 'accueil',
        label: 'Accueil',
        icon: Home,
        description: 'Découvrez la retraite progressive'
      },
      {
        id: 'simulateurs',
        label: 'Simulateurs',
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
        id: 'guide-pratique',
        label: 'Guide pratique',
        icon: CheckCircle,
        description: 'FAQ et ressources'
      },
      {
        id: 'contact',
        label: 'Contact',
        icon: MessageSquare,
        description: 'Nous contacter'
      }
    ];

    // Dashboard - Toujours visible dans le header (mais protégé par mot de passe)
    // En production, il faut définir REACT_APP_ENABLE_DASHBOARD=true pour l'activer
    if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_ENABLE_DASHBOARD === 'true') {
      baseItems.push({
        id: 'dashboard',
        label: 'Dashboard',
        icon: BarChart3,
        description: 'Statistiques et analytics'
      });
    }
    
    console.log('🔄 [DEBUG] HorizontalNavigation items:', baseItems.map(i => i.id));

    return baseItems;
  }, []);

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
  }, [currentPage, navigationItems]);

  const handleNavigation = (item, index) => {
    console.log('🔄 [CLICK] handleNavigation called with item:', item.id, 'index:', index);
    setActiveIndex(index);
    console.log('🔄 [CLICK] Calling onPageChange with:', item.id);
    onPageChange(item.id);
    console.log('🔄 [CLICK] onPageChange called');
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
