import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PageAccueil from './components/PageAccueil';
import SaisiePage from './components/SaisiePage';
import ResultatsPage from './components/ResultatsPage';
import ScenariosPage from './components/ScenariosPage';
import ConseilsPage from './components/ConseilsPage';
import './index.css';
import './sidebar.css';
import './definition-styles.css';
import './hero-styles.css';
import './eligibility-styles.css';
import './financial-impact-styles.css';

function App() {
  const [currentPage, setCurrentPage] = useState('accueil');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil':
        return <PageAccueil />;
      case 'saisie':
        return <SaisiePage />;
      case 'resultats':
        return <ResultatsPage />;
      case 'scenarios':
        return <ScenariosPage />;
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
