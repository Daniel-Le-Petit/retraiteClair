import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.links}>
            <Link to="/mentions-legales" className={styles.link}>
              Mentions légales
            </Link>
            <span className={styles.separator}>|</span>
            <Link to="/politique-confidentialite" className={styles.link}>
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


