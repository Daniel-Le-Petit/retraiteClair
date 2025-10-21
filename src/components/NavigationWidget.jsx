import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calculator, 
  BookOpen, 
  CheckCircle, 
  MessageSquare,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';

const NavigationWidget = ({ currentPage, onPageChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigationItems = [
    {
      id: 'accueil',
      label: 'Accueil',
      icon: Home,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      description: 'Découvrez la retraite progressive'
    },
    {
      id: 'calculateur',
      label: 'Simulations',
      icon: Calculator,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      description: 'Calculez vos revenus'
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      description: 'Conseils et actualités'
    },
    {
      id: 'conseils',
      label: 'Conseils',
      icon: CheckCircle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      description: 'Guide pratique'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: MessageSquare,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-700',
      description: 'Nous contacter'
    }
  ];

  // Trouver l'index de la page actuelle
  useEffect(() => {
    const currentIndex = navigationItems.findIndex(item => item.id === currentPage);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [currentPage]);

  const handleNavigation = (item, index) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    // Animation de transition
    setTimeout(() => {
      onPageChange(item.id);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="navigation-widget">
      {/* Header avec titre et indicateur */}
      <div className="nav-widget-header">
        <div className="nav-widget-title">
          <Sparkles className="nav-widget-icon" />
          <span>Navigation</span>
        </div>
        <div className="nav-widget-indicator">
          <span className="current-step">{activeIndex + 1}</span>
          <span className="total-steps">/{navigationItems.length}</span>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="nav-widget-progress">
        <div className="progress-track">
          <div 
            className="progress-fill"
            style={{ width: `${(activeIndex / (navigationItems.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Items de navigation */}
      <div className="nav-widget-items">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;
          const isCompleted = index < activeIndex;
          const isUpcoming = index > activeIndex;

          return (
            <div
              key={item.id}
              className={`nav-widget-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isUpcoming ? 'upcoming' : ''}`}
              onClick={() => handleNavigation(item, index)}
            >
              {/* Indicateur de statut */}
              <div className="nav-item-indicator">
                {isCompleted ? (
                  <div className="completed-icon">
                    <CheckCircle size={16} />
                  </div>
                ) : (
                  <div className={`step-number ${isActive ? 'active' : ''}`}>
                    {index + 1}
                  </div>
                )}
              </div>

              {/* Contenu de l'item */}
              <div className={`nav-item-content ${isActive ? 'active' : ''}`}>
                <div className="nav-item-icon">
                  <Icon 
                    size={20} 
                    className={`${isActive ? 'text-white' : item.textColor}`}
                  />
                </div>
                <div className="nav-item-text">
                  <div className="nav-item-label">{item.label}</div>
                  <div className="nav-item-description">{item.description}</div>
                </div>
                {isActive && (
                  <div className="nav-item-arrow">
                    <ChevronRight size={16} />
                  </div>
                )}
              </div>

              {/* Effet de brillance pour l'item actif */}
              {isActive && (
                <div className="nav-item-glow" />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer avec informations */}
      <div className="nav-widget-footer">
        <div className="nav-widget-info">
          <Zap className="nav-info-icon" />
          <span>Navigation fluide entre les sections</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationWidget;
