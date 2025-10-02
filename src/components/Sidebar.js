import React from 'react';
import { Home, Calculator, BarChart3, TrendingUp, CheckCircle, MessageSquare } from 'lucide-react';

const Sidebar = ({ currentPage, onPageChange }) => {
  const menuItems = [
    {
      id: 'accueil',
      label: 'Accueil',
      icon: Home,
      badge: 0
    },
    {
      id: 'calculateur',
      label: 'Estimation de votre retraite progressive',
      icon: Calculator,
      badge: 1
    },
    {
      id: 'conseils',
      label: 'Conseils',
      icon: CheckCircle,
      badge: 2
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: MessageSquare,
      badge: 3
    }
  ];

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
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onPageChange(item.id)}
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
