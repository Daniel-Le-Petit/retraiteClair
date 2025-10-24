import React from 'react';
import { User, BarChart3, TrendingUp, CheckCircle } from 'lucide-react';

const SimulatorNavigation = ({ activeTab, onTabChange, isResultsAccessible = false, hasVisitedResults = false }) => {
  const navigationItems = [
    {
      id: 'saisie',
      label: 'Saisie',
      icon: User,
      description: 'Vos informations',
      step: 1
    },
    {
      id: 'resultats',
      label: 'Résultats',
      icon: BarChart3,
      description: 'Vos calculs',
      step: 2
    },
    {
      id: 'scenarios',
      label: 'Scénarios',
      icon: TrendingUp,
      description: 'Comparaisons',
      step: 3
    }
  ];

  const getCurrentStep = () => {
    const currentItem = navigationItems.find(item => item.id === activeTab);
    return currentItem ? currentItem.step : 1;
  };

  const currentStep = getCurrentStep();

  // Déterminer si l'étape est accessible
  const isStepAccessible = (step) => {
    if (step === 1) return true; // Saisie toujours accessible
    if (step === 2) return isResultsAccessible; // Résultats accessible si champs remplis
    if (step === 3) return hasVisitedResults; // Scénarios accessible seulement après avoir visité les résultats
    return false;
  };

  return (
    <div className="simulator-navigation">
      <div className="simulator-nav-container">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isCompleted = item.step < currentStep;
          const isAccessible = isStepAccessible(item.step);

          return (
            <div key={item.id} className="simulator-step-container">
              <button
                className={`simulator-nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${!isAccessible ? 'disabled' : ''}`}
                onClick={() => isAccessible && onTabChange(item.id)}
                disabled={!isAccessible}
              >
                <div className="simulator-nav-content">
                  <div className="simulator-nav-icon">
                    {isCompleted ? <CheckCircle size={18} /> : <Icon size={18} />}
                  </div>
                  <div className="simulator-nav-text">
                    <div className="simulator-nav-label">{item.label}</div>
                    <div className="simulator-nav-description">{item.description}</div>
                  </div>
                  <div className="simulator-step-number">{item.step}</div>
                </div>
              </button>
              
              {/* Ligne de connexion */}
              {index < navigationItems.length - 1 && (
                <div className={`simulator-connector ${isCompleted ? 'completed' : ''}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimulatorNavigation;
