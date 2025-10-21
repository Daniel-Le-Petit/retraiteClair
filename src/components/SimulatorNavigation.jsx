import React from 'react';
import { User, BarChart3, TrendingUp } from 'lucide-react';

const SimulatorNavigation = ({ activeTab, onTabChange }) => {
  const navigationItems = [
    {
      id: 'saisie',
      label: 'Saisie',
      icon: User,
      description: 'Vos informations'
    },
    {
      id: 'resultats',
      label: 'Résultats',
      icon: BarChart3,
      description: 'Vos calculs'
    },
    {
      id: 'scenarios',
      label: 'Scénarios',
      icon: TrendingUp,
      description: 'Comparaisons'
    }
  ];

  return (
    <div className="simulator-navigation">
      <div className="simulator-nav-container">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              className={`simulator-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <div className="simulator-nav-content">
                <div className="simulator-nav-icon">
                  <Icon size={18} />
                </div>
                <div className="simulator-nav-text">
                  <div className="simulator-nav-label">{item.label}</div>
                  <div className="simulator-nav-description">{item.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SimulatorNavigation;
