import React, { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('retraiteClair_cookieConsent') || localStorage.getItem('consent-given');
    const consentDate = localStorage.getItem('retraiteClair_cookieConsentDate') || localStorage.getItem('consent-date');
    
    if (!consent || !consentDate) {
      setShowBanner(true);
    } else {
      // Check if consent is older than 13 months
      const thirteenMonthsAgo = new Date();
      thirteenMonthsAgo.setMonth(thirteenMonthsAgo.getMonth() - 13);
      
      if (new Date(consentDate) < thirteenMonthsAgo) {
        setShowBanner(true);
      } else {
        // If consent was given, load analytics
        if (consent === 'accepted' || consent === 'true') {
          loadAnalytics();
        }
      }
    }
    
    // Listen for consent changes from the HTML banner
    const handleConsentChange = (event) => {
      if (event.detail.accepted) {
        setShowBanner(false);
        loadAnalytics();
      } else {
        setShowBanner(false);
      }
    };
    
    window.addEventListener('cookieConsentChanged', handleConsentChange);
    return () => window.removeEventListener('cookieConsentChanged', handleConsentChange);
  }, []);

  const loadAnalytics = () => {
    // Trigger loading of Google Analytics and Meta Pixel if not already loaded
    if (typeof window !== 'undefined') {
      // Call the load functions defined in index.html
      const win = window as any;
      if (typeof win.loadGoogleAnalytics === 'function') {
        win.loadGoogleAnalytics();
      }
      if (typeof win.loadMetaPixel === 'function') {
        win.loadMetaPixel();
      }
      // Also trigger the enableAnalytics event for any other listeners
      window.dispatchEvent(new CustomEvent('enableAnalytics'));
    }
  };

  const handleAccept = () => {
    const consentDate = new Date().toISOString();
    localStorage.setItem('retraiteClair_cookieConsent', 'accepted');
    localStorage.setItem('retraiteClair_cookieConsentDate', consentDate);
    localStorage.setItem('consent-given', 'true');
    localStorage.setItem('consent-date', consentDate);
    setShowBanner(false);
    loadAnalytics();
    
    // Also update gtag and fbq if they exist
    if (typeof window.gtag !== 'undefined') {
      window.gtag!('consent', 'grant', {
        'analytics_storage': 'granted'
      });
    }
    if (typeof window.fbq !== 'undefined') {
      window.fbq!('consent', 'grant');
      window.fbq!('track', 'PageView');
    }
  };

  const handleReject = () => {
    const consentDate = new Date().toISOString();
    localStorage.setItem('retraiteClair_cookieConsent', 'rejected');
    localStorage.setItem('retraiteClair_cookieConsentDate', consentDate);
    localStorage.setItem('consent-given', 'false');
    localStorage.setItem('consent-date', consentDate);
    setShowBanner(false);
    
    // Revoke consent for analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag!('consent', 'revoke', {
        'analytics_storage': 'denied'
      });
    }
    if (typeof window.fbq !== 'undefined') {
      window.fbq!('consent', 'revoke');
    }
    
    // Remove analytics cookies if they exist
    if (typeof document !== 'undefined') {
      document.cookie.split(";").forEach((c) => {
        const cookieName = c.split("=")[0].trim();
        if (cookieName.startsWith('_ga') || cookieName.startsWith('_gid') || cookieName.startsWith('_gat')) {
          document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
        }
      });
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h3>🍪 Gestion des cookies</h3>
          <p>
            Ce site utilise des cookies pour améliorer votre expérience et analyser l'utilisation du site. 
            Les cookies essentiels sont nécessaires au fonctionnement du site. Les cookies analytiques 
            nécessitent votre consentement.
          </p>
          <p>
            <a href="/politique-confidentialite" className={styles.link}>
              En savoir plus sur notre politique de confidentialité
            </a>
          </p>
        </div>
        <div className={styles.buttons}>
          <button onClick={handleAccept} className={styles.acceptButton}>
            Accepter
          </button>
          <button onClick={handleReject} className={styles.rejectButton}>
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;


