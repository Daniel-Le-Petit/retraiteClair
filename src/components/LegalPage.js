import React, { useState, useEffect } from 'react';
import MentionsLegales from './MentionsLegales';
import PolitiqueConfidentialite from './PolitiqueConfidentialite';
import ConditionsUtilisation from './ConditionsUtilisation';

const LegalPage = () => {
  const [currentPage, setCurrentPage] = useState('mentions-legales');

  // Écouter les événements de navigation vers les pages légales
  useEffect(() => {
    const handleLegalNavigation = (event) => {
      const { page } = event.detail;
      if (page === 'mentions-legales' || page === 'politique-confidentialite' || page === 'conditions-utilisation') {
        setCurrentPage(page);
      }
    };

    window.addEventListener('navigateToLegalPage', handleLegalNavigation);
    return () => {
      window.removeEventListener('navigateToLegalPage', handleLegalNavigation);
    };
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'mentions-legales':
        return <MentionsLegales />;
      case 'politique-confidentialite':
        return <PolitiqueConfidentialite />;
      case 'conditions-utilisation':
        return <ConditionsUtilisation />;
      default:
        return <MentionsLegales />;
    }
  };

  return (
    <div className="legal-page-container">
      {renderCurrentPage()}
    </div>
  );
};

export default LegalPage;
