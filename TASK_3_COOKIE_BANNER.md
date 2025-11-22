# Task 3: Cookie Banner & GDPR

## Files to create/modify

### 1. src/components/CookieBanner.tsx - Create component (lightweight, no external dependency)

Create `src/components/CookieBanner.tsx` (lightweight implementation):

```typescript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CookieBanner.module.css';

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const consent = localStorage.getItem('rcl_cookie_consent');
    const cookieConsent = document.cookie
      .split('; ')
      .find(row => row.startsWith('rcl_cookie_consent='));
    
    if (!consent && !cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('rcl_cookie_consent', 'accepted');
    document.cookie = 'rcl_cookie_consent=accepted; max-age=31536000; path=/; SameSite=Lax';
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('rcl_cookie_consent', 'declined');
    document.cookie = 'rcl_cookie_consent=declined; max-age=31536000; path=/; SameSite=Lax';
    setShowBanner(false);
  };

  const reopenBanner = () => {
    setShowBanner(true);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).reopenCookieBanner = reopenBanner;
    }
  }, []);

  if (!showBanner) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p className={styles.text}>
          Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre{' '}
          <a 
            href="/politique-confidentialite" 
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              navigate('/politique-confidentialite');
            }}
          >
            politique de confidentialité
          </a>
          .
        </p>
        <div className={styles.buttons}>
          <button
            className={styles.acceptButton}
            onClick={handleAccept}
          >
            J'accepte
          </button>
          <button
            className={styles.declineButton}
            onClick={handleDecline}
          >
            Je refuse
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
```

### 3. src/components/CookieBanner.module.css - Create styles

Create `src/components/CookieBanner.module.css`:

```css
.banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  background: #0f766e;
  color: white;
  padding: 1rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.text {
  flex: 1;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.link {
  color: #10b981;
  text-decoration: underline;
}

.link:hover {
  color: #34d399;
}

.buttons {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.acceptButton {
  background: #10b981;
  color: white;
  font-size: 14px;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.acceptButton:hover {
  background: #059669;
}

.declineButton {
  background: #6b7280;
  color: white;
  font-size: 14px;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.declineButton:hover {
  background: #4b5563;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    align-items: flex-start;
  }

  .buttons {
    width: 100%;
    justify-content: flex-end;
  }

  .text {
    font-size: 13px;
  }
}
```

### 4. src/App.js - Integrate CookieBanner

```diff
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import SwipeNavigationNew, { AppContent } from './components/SwipeNavigationNew';
import BackgroundImage from './components/BackgroundImage';
+import CookieBanner from './components/CookieBanner';
import './index.css';
import './definition-styles.css';
import './hero-styles.css';
import './eligibility-styles.css';
import './financial-impact-styles.css';
import './personal-info-styles.css';
import './calculateur-avance-styles.css';
import './calculateur-mobile-styles.css';
import './conseils-styles.css';
import './homepage-styles.css';
import './legal-styles.css';
import './about-styles.css';

function App() {
  return (
    <Router>
      <BackgroundImage />
      <AppContent />
+     <CookieBanner />
    </Router>
  );
}

export default App;
```

### 5. src/components/Footer.tsx - Add cookie management link

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

+  const handleCookieManagement = (e: React.MouseEvent<HTMLAnchorElement>) => {
+    e.preventDefault();
+    if (typeof window !== 'undefined' && (window as any).reopenCookieBanner) {
+      (window as any).reopenCookieBanner();
+    }
+  };

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
+           <span className={styles.separator}>|</span>
+           <a 
+             href="#" 
+             className={styles.link}
+             onClick={handleCookieManagement}
+           >
+             Gestion des cookies
+           </a>
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

