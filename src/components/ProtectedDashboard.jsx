import React, { useState, useEffect } from 'react';
import AnalyticsDashboard from './AnalyticsDashboard';
import DashboardLogin from './DashboardLogin';

const ProtectedDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Vérifier l'authentification au montage
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    // Vérifier si l'utilisateur est authentifié
    const authenticated = sessionStorage.getItem('dashboard_authenticated') === 'true';
    const authTime = sessionStorage.getItem('dashboard_auth_time');
    
    // Vérifier si l'authentification n'a pas expiré (24 heures)
    if (authenticated && authTime) {
      const timeDiff = Date.now() - parseInt(authTime, 10);
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        // Expiré, déconnecter
        sessionStorage.removeItem('dashboard_authenticated');
        sessionStorage.removeItem('dashboard_auth_time');
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
    
    setChecking(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dashboard_authenticated');
    sessionStorage.removeItem('dashboard_auth_time');
    setIsAuthenticated(false);
  };

  if (checking) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '1.2rem' }}>Vérification...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <DashboardLogin onLogin={handleLogin} />;
  }

  return (
    <div>
      <AnalyticsDashboard onLogout={handleLogout} />
    </div>
  );
};

export default ProtectedDashboard;

