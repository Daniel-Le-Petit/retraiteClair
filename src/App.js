import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import SwipeNavigation from './components/SwipeNavigation';
import BackgroundImage from './components/BackgroundImage';
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

function AppContent() {
  return <SwipeNavigation />;
}

function App() {
  return (
    <Router>
      <BackgroundImage />
      <AppContent />
    </Router>
  );
}

export default App;
