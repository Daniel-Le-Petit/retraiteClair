import React from 'react';

const TestNavigation = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      background: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001,
      fontSize: '18px',
      fontWeight: 'bold'
    }}>
      TEST NAVIGATION - Accueil → Simulations → Blog → Conseils → Contact
    </div>
  );
};

export default TestNavigation;
