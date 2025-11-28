import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleLegalLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  const handleCookieManagement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).reopenCookieBanner) {
      (window as any).reopenCookieBanner();
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.serviceInfo}>
            RetraiteClair est un simulateur gratuit. Un service de conseil payant optionnel est proposé via des partenaires certifiés.
          </div>
          <div className={styles.links}>
            <Link 
              to="/mentions-legales" 
              className={styles.link}
              onClick={(e) => handleLegalLinkClick(e, '/mentions-legales')}
            >
              Mentions légales
            </Link>
            <span className={styles.separator}>|</span>
            <Link 
              to="/politique-confidentialite" 
              className={styles.link}
              onClick={(e) => handleLegalLinkClick(e, '/politique-confidentialite')}
            >
              Politique de confidentialité
            </Link>
            <span className={styles.separator}>|</span>
            <Link 
              to="/conditions-utilisation" 
              className={styles.link}
              onClick={(e) => handleLegalLinkClick(e, '/conditions-utilisation')}
            >
              Conditions d'utilisation
            </Link>
            <span className={styles.separator}>|</span>
            <button 
              type="button"
              className={styles.linkButton}
              onClick={handleCookieManagement}
            >
              Gestion des cookies
            </button>
            <span className={styles.separator}>|</span>
            <a 
              href="https://github.com/retraiteclair/retraiteclair" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.link}
            >
              Code source & méthodologie
            </a>
            {/* Dashboard link - Only visible if enabled, styled discretely */}
            {(process.env.NODE_ENV === 'development' || process.env.REACT_APP_ENABLE_DASHBOARD === 'true') && (
              <>
                <span className={styles.separator}>|</span>
                <Link 
                  to="/dashboard" 
                  className={styles.dashboardLink}
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'auto' });
                    // Use HashRouter compatible navigation
                    window.location.hash = '#dashboard';
                    // Also trigger navigation for React Router
                    setTimeout(() => {
                      navigate('/dashboard');
                      // Dispatch event for SwipeNavigation
                      window.dispatchEvent(new CustomEvent('navigateToPage', { detail: { page: 'dashboard' } }));
                    }, 100);
                  }}
                >
                  Admin
                </Link>
              </>
            )}
          </div>
          <div className={styles.copyright}>
            © {currentYear} RetraiteClair – Tous droits réservés
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


