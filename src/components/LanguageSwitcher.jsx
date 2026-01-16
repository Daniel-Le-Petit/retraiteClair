import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState('fr');

  // Détecter la langue actuelle depuis l'URL ou localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    const hash = location.hash;
    
    // Avec HashRouter, le hash contient la route (ex: #/en/)
    // Vérifier l'URL d'abord
    if (hash && (hash.includes('#/en/') || hash === '#/en')) {
      setCurrentLang('en');
    } else if (savedLang) {
      setCurrentLang(savedLang);
    } else {
      setCurrentLang('fr');
    }
  }, [location.hash]);

  const switchLanguage = (lang) => {
    if (lang === currentLang) return; // Déjà dans la bonne langue
    
    const hash = location.hash || '#/';
    let currentPath = hash.replace('#', '') || '/';
    let newPath = currentPath;
    
    // Avec HashRouter, le hash contient la route (sans le #)
    if (lang === 'en') {
      // Passer en anglais : ajouter /en/ dans le path
      if (currentPath.startsWith('/en/') || currentPath === '/en') {
        return; // Déjà en anglais
      } else if (currentPath === '/' || currentPath === '') {
        newPath = '/en/';
      } else {
        newPath = `/en${currentPath}`;
      }
    } else {
      // Passer en français : retirer /en/ du path
      if (currentPath.startsWith('/en/')) {
        newPath = currentPath.replace('/en/', '/');
      } else if (currentPath === '/en' || currentPath.startsWith('/en')) {
        newPath = currentPath.replace('/en', '/');
      } else {
        return; // Déjà en français
      }
    }
    
    // Sauvegarder la préférence
    localStorage.setItem('preferredLanguage', lang);
    
    // Naviguer vers la nouvelle URL avec React Router (HashRouter gère automatiquement le hash)
    navigate(newPath);
    
    // Recharger la page pour appliquer les changements de langue
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="language-switcher">
      <button
        className={`lang-button ${currentLang === 'fr' ? 'active' : ''}`}
        onClick={() => switchLanguage('fr')}
        aria-label="Switch to French"
        title="Français"
      >
        FR
      </button>
      <span className="lang-separator">|</span>
      <button
        className={`lang-button ${currentLang === 'en' ? 'active' : ''}`}
        onClick={() => switchLanguage('en')}
        aria-label="Switch to English"
        title="English"
      >
        EN
      </button>
      <Globe size={16} className="lang-icon" />
    </div>
  );
};

export default LanguageSwitcher;

