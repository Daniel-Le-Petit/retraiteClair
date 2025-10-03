import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PageAccueil from './components/PageAccueil';
import CalculateurAvance from './components/CalculateurAvance';
import ConseilsPageSimple from './components/ConseilsPageSimple';
import ContactForm from './components/ContactForm';
import './index.css';
import './sidebar.css';
import './definition-styles.css';
import './hero-styles.css';
import './eligibility-styles.css';
import './financial-impact-styles.css';
import './personal-info-styles.css';
import './calculateur-avance-styles.css';
import './calculateur-mobile-styles.css';
import './conseils-styles.css';

function AppContent() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('accueil');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Mettre à jour currentPage basé sur l'URL
  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/') setCurrentPage('accueil');
    else if (path === '/calculateur') setCurrentPage('calculateur');
    else if (path === '/conseils') setCurrentPage('conseils');
    else if (path === '/contact') setCurrentPage('contact');
  }, [location.pathname]);

  return (
    <div className="App">
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<PageAccueil onPageChange={handlePageChange} />} />
          <Route path="/calculateur" element={<CalculateurAvance />} />
          <Route path="/conseils" element={<ConseilsPageSimple onPageChange={handlePageChange} />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
