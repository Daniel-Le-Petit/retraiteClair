import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PageAccueil from './components/PageAccueil';
import CalculateurAvance from './components/CalculateurAvance';
import ConseilsPage from './components/ConseilsPage';
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

function App() {
  const [currentPage, setCurrentPage] = useState('accueil');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil':
        return <PageAccueil />;
      case 'calculateur':
        return <CalculateurAvance />;
      case 'conseils':
        return <ConseilsPage />;
      default:
        return <PageAccueil />;
    }
  };

  return (
    <div className="App">
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
