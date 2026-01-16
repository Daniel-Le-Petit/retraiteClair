import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    const hash = location.hash;
    
    // Avec HashRouter, le hash contient la route (ex: #/en/)
    // Détecter la langue depuis le hash
    let detectedLang = 'fr';
    if (hash && (hash.includes('#/en/') || hash === '#/en')) {
      detectedLang = 'en';
    } else {
      // Vérifier aussi localStorage comme fallback
      const savedLang = localStorage.getItem('preferredLanguage');
      if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
        detectedLang = savedLang;
      }
    }
    
    // Mettre à jour la langue
    setLanguage(detectedLang);
    localStorage.setItem('preferredLanguage', detectedLang);
  }, [location.hash]); // Utiliser le hash avec HashRouter

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

