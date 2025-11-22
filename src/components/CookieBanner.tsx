import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
          <Link 
            to="/politique-confidentialite" 
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              navigate('/politique-confidentialite');
            }}
          >
            politique de confidentialité
          </Link>
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
