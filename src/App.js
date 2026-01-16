import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AppContent } from './components/SwipeNavigationNew';
import BackgroundImage from './components/BackgroundImage';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';
import './definition-styles.css';
import './hero-styles.css';
import './eligibility-styles.css';
import './financial-impact-styles.css';
import './personal-info-styles.css';
import './calculateur-avance-styles.css';
import './calculateur-mobile-styles.css';
import './conseils-styles.css';
import './homepage-styles.css';
import './legal-styles.css';
import './about-styles.css';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <BackgroundImage />
        <AppContent />
      </LanguageProvider>
    </Router>
  );
}

export default App;
