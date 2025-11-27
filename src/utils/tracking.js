// Utilitaire de tracking unifié pour tous les services d'analytics
// Supporte GA4, et peut être étendu avec d'autres services

/* global gtag */

/**
 * Génère un ID utilisateur unique (stocké dans localStorage)
 */
export const getUserId = () => {
  let userId = localStorage.getItem('retraiteClair_userId');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('retraiteClair_userId', userId);
  }
  return userId;
};

/**
 * Génère un ID de session (change à chaque visite)
 */
export const getSessionId = () => {
  let sessionId = sessionStorage.getItem('retraiteClair_sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('retraiteClair_sessionId', sessionId);
  }
  return sessionId;
};

/**
 * Track un événement vers GA4
 */
export const trackGA4Event = (eventName, parameters = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      ...parameters,
      user_id: getUserId(),
      session_id: getSessionId(),
      send_to: 'G-9WF389CM13'
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 GA4 Event: ${eventName}`, parameters);
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.log(`📊 GA4 Event (gtag not loaded): ${eventName}`, parameters);
  }
};

/**
 * Track une page view vers GA4
 */
export const trackGA4PageView = (pageTitle, pagePath) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pagePath,
      user_id: getUserId(),
      session_id: getSessionId(),
      send_to: 'G-9WF389CM13'
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 GA4 Page View: ${pageTitle} - ${pagePath}`);
    }
  }
};

/**
 * Track un événement vers un webhook (optionnel)
 * Utile pour envoyer vers Zapier, Make.com, ou votre propre API
 */
export const trackWebhook = async (eventName, properties = {}) => {
  const webhookUrl = process.env.REACT_APP_WEBHOOK_URL;
  
  if (!webhookUrl) {
    return; // Pas de webhook configuré
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        properties,
        user_id: getUserId(),
        session_id: getSessionId(),
        timestamp: new Date().toISOString(),
        url: window.location.href,
        user_agent: navigator.userAgent,
        referrer: document.referrer
      })
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Webhook tracking error:', error);
    }
  }
};

/**
 * Track un événement vers Supabase (si configuré)
 */
export const trackSupabase = async (eventName, parameters = {}) => {
  // Import dynamique pour éviter les erreurs si Supabase n'est pas installé
  try {
    const { supabase } = await import('./supabase');
    
    if (!supabase) {
      return; // Supabase non configuré
    }

    const { error } = await supabase
      .from('events')
      .insert([
        {
          event_name: eventName,
          properties: parameters,
          user_id: getUserId(),
          session_id: getSessionId(),
          page_url: window.location.href,
          user_agent: navigator.userAgent,
          referrer: document.referrer
        }
      ]);

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Supabase tracking error:', error);
      }
    } else if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Supabase Event: ${eventName}`, parameters);
    }
  } catch (error) {
    // Supabase non installé ou non configuré - c'est OK, on continue
    if (process.env.NODE_ENV === 'development') {
      console.log('Supabase not configured, skipping...');
    }
  }
};

/**
 * Fonction unifiée pour tracker un événement
 * Envoie vers GA4, Supabase (si configuré), et optionnellement vers un webhook
 */
export const trackEvent = async (eventName, parameters = {}) => {
  // Toujours tracker vers GA4
  trackGA4Event(eventName, parameters);
  
  // Optionnellement tracker vers Supabase (si configuré)
  await trackSupabase(eventName, parameters);
  
  // Optionnellement tracker vers webhook
  if (process.env.REACT_APP_WEBHOOK_URL) {
    await trackWebhook(eventName, parameters);
  }
};

/**
 * Track le temps passé sur une page
 */
export const trackTimeOnPage = (pageName, startTime) => {
  const timeSpent = Math.round((Date.now() - startTime) / 1000);
  
  if (timeSpent > 0) {
    trackEvent('time_on_page', {
      page: pageName,
      time_seconds: timeSpent
    });
  }
};

/**
 * Track la profondeur de scroll
 */
let maxScrollDepth = 0;
let scrollTracked = { 25: false, 50: false, 75: false, 100: false };

export const initScrollTracking = (pageName) => {
  maxScrollDepth = 0;
  scrollTracked = { 25: false, 50: false, 75: false, 100: false };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent;
      
      // Track à 25%, 50%, 75%, 100%
      [25, 50, 75, 100].forEach(threshold => {
        if (scrollPercent >= threshold && !scrollTracked[threshold]) {
          scrollTracked[threshold] = true;
          trackEvent('scroll_depth', {
            page: pageName,
            depth: threshold
          });
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Retourner une fonction de nettoyage
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Track les clics sur les éléments importants
 */
export const trackClick = (elementName, properties = {}) => {
  trackEvent('click', {
    element: elementName,
    ...properties
  });
};

/**
 * Track les erreurs
 */
export const trackError = (errorName, errorDetails = {}) => {
  trackEvent('error', {
    error_name: errorName,
    ...errorDetails
  });
};

