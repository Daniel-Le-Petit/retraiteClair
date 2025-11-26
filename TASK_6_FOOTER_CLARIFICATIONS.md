# Task 6: Footer Clarifications

## Files to modify

### 1. src/components/Footer.tsx - Add service clarification

```diff
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

  const handleCookieManagement = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).reopenCookieBanner) {
      (window as any).reopenCookieBanner();
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
+         <div className={styles.serviceInfo}>
+           RetraiteClair est un simulateur gratuit. Un service de conseil payant optionnel est proposé via des partenaires certifiés.
+         </div>
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
            <a 
              href="#" 
              className={styles.link}
              onClick={handleCookieManagement}
            >
              Gestion des cookies
            </a>
            <span className={styles.separator}>|</span>
            <a 
              href="https://github.com/retraiteclair/retraiteclair" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.link}
            >
              Code source & méthodologie
            </a>
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
```

### 2. src/components/Footer.module.css - Add service info styles

```diff
/* ... existing styles ... */

+.serviceInfo {
+  text-align: center;
+  font-size: 0.85rem;
+  color: #6b7280;
+  margin-bottom: 1rem;
+  padding: 0 1rem;
+  line-height: 1.5;
+}
+
+@media (max-width: 768px) {
+  .serviceInfo {
+    font-size: 0.8rem;
+    padding: 0 0.5rem;
+  }
+}
+
/* ... existing styles ... */
```







