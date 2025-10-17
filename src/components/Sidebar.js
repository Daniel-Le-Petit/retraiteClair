import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calculator, CheckCircle, MessageSquare, BookOpen } from 'lucide-react';

const Sidebar = ({ currentPage, onPageChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    {
      id: 'accueil',
      label: 'Accueil',
      icon: Home,
      badge: 0,
      path: '/'
    },
    {
      id: 'calculateur',
      label: 'Estimation de votre retraite progressive',
      icon: Calculator,
      badge: 1,
      path: '/calculateur'
    },
    {
      id: 'blog',
      label: 'Blog & Conseils',
      icon: BookOpen,
      badge: 2,
      path: '/blog'
    },
    {
      id: 'conseils',
      label: 'Conseils',
      icon: CheckCircle,
      badge: 3,
      path: '/conseils'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: MessageSquare,
      badge: 4,
      path: '/contact'
    }
  ];

  const handleNavigation = (item) => {
    navigate(item.path);
    onPageChange(item.id);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <img src="/logo-retraiteclair.svg" alt="RetraiteClair" className="logo" />
        </div>
        <p>Simulateur de retraite progressive</p>
      </div>
      
      <div className="sidebar-divider"></div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavigation(item)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
              <div className="nav-badge">{item.badge}</div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
