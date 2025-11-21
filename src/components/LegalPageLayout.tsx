import React, { useEffect } from 'react';
import HorizontalNavigation from './HorizontalNavigation';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import './LegalPageLayout.css';

interface LegalPageLayoutProps {
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  // Masquer le background image quand on est sur une page légale
  useEffect(() => {
    const backgroundImage = document.querySelector('.background-image') as HTMLElement;
    const bodyElement = document.body;
    
    // Masquer le background image
    if (backgroundImage) {
      backgroundImage.style.setProperty('display', 'none', 'important');
      backgroundImage.style.setProperty('visibility', 'hidden', 'important');
      backgroundImage.style.setProperty('opacity', '0', 'important');
      backgroundImage.style.setProperty('pointer-events', 'none', 'important');
    }
    
    // Ajouter une classe au body pour le CSS
    bodyElement.classList.add('legal-page-active');
    
    // Forcer le background blanc sur le body et html
    const originalBodyBg = bodyElement.style.backgroundColor;
    bodyElement.style.setProperty('background-color', '#ffffff', 'important');
    document.documentElement.style.setProperty('background-color', '#ffffff', 'important');
    
    // Masquer le body::before via style inline
    const style = document.createElement('style');
    style.id = 'legal-page-style';
    style.textContent = `
      body.legal-page-active::before {
        background: #ffffff !important;
        opacity: 1 !important;
      }
      body.legal-page-active .background-image {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Restaurer le background quand on quitte la page légale
      if (backgroundImage) {
        backgroundImage.style.removeProperty('display');
        backgroundImage.style.removeProperty('visibility');
        backgroundImage.style.removeProperty('opacity');
        backgroundImage.style.removeProperty('pointer-events');
      }
      bodyElement.classList.remove('legal-page-active');
      bodyElement.style.removeProperty('background-color');
      document.documentElement.style.removeProperty('background-color');
      
      // Supprimer le style ajouté
      const addedStyle = document.getElementById('legal-page-style');
      if (addedStyle) {
        addedStyle.remove();
      }
    };
  }, []);

  const handlePageChange = (pageId: string) => {
    switch (pageId) {
      case 'accueil':
        navigate('/');
        break;
      case 'simulateurs':
        navigate('/simulateurs');
        break;
      case 'blog':
        navigate('/blog');
        break;
      case 'guide-pratique':
        navigate('/guide-pratique');
        break;
      case 'contact':
        navigate('/contact');
        break;
      default:
        break;
    }
  };

  return (
    <div className="legal-page-wrapper">
      <HorizontalNavigation 
        currentPage="legal"
        onPageChange={handlePageChange}
      />
      <div className="legal-page-content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LegalPageLayout;

