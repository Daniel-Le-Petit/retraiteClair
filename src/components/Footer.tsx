import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleLegalLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    // Scroll to top avant la navigation
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // Naviguer
    navigate(path);
    // Scroll to top après la navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
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


