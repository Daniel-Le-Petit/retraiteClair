// Utilitaire de tracking unifié pour tous les services d'analytics
// Supporte GA4, et peut être étendu avec d'autres services

/* global gtag */

/**
 * Assigne un numéro unique à un utilisateur dans Supabase
 */
const assignUserNumber = async (userId) => {
  try {
    const { supabase } = await import('./supabase');
    
    if (!supabase) {
      // Si Supabase n'est pas configuré, retourner l'ID sans numéro
      return userId;
    }

    // Vérifier si l'utilisateur a déjà un numéro
    const { data: existingUser, error: selectError } = await supabase
      .from('user_numbers')
      .select('user_number')
      .eq('user_id', userId)
      .single();

    if (existingUser && existingUser.user_number) {
      // L'utilisateur a déjà un numéro, le retourner
      const numberedUserId = `user#${existingUser.user_number}_${userId.replace('user_', '')}`;
      localStorage.setItem('retraiteClair_userId', numberedUserId);
      return numberedUserId;
    }

    // Obtenir le prochain numéro disponible
    const { data: maxUser, error: maxError } = await supabase
      .from('user_numbers')
      .select('user_number')
      .order('user_number', { ascending: false })
      .limit(1)
      .single();

    let nextNumber = 1;
    if (maxUser && maxUser.user_number) {
      nextNumber = maxUser.user_number + 1;
    }

    // Insérer le nouvel utilisateur avec son numéro
    const { error: insertError } = await supabase
      .from('user_numbers')
      .insert([
        {
          user_id: userId,
          user_number: nextNumber,
          first_seen: new Date().toISOString(),
          last_seen: new Date().toISOString()
        }
      ]);

    if (insertError) {
      // Si l'insertion échoue (peut-être à cause d'une race condition), réessayer de récupérer
      const { data: retryUser } = await supabase
        .from('user_numbers')
        .select('user_number')
        .eq('user_id', userId)
        .single();

      if (retryUser && retryUser.user_number) {
        const numberedUserId = `user#${retryUser.user_number}_${userId.replace('user_', '')}`;
        localStorage.setItem('retraiteClair_userId', numberedUserId);
        return numberedUserId;
      }
      
      // Si tout échoue, retourner l'ID sans numéro
      if (process.env.NODE_ENV === 'development') {
        console.warn('Erreur lors de l\'assignation du numéro utilisateur:', insertError);
      }
      return userId;
    }

    // Mettre à jour le localStorage avec l'ID numéroté
    const numberedUserId = `user#${nextNumber}_${userId.replace('user_', '')}`;
    localStorage.setItem('retraiteClair_userId', numberedUserId);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Numéro utilisateur assigné: ${numberedUserId}`);
    }
    
    return numberedUserId;
  } catch (error) {
    // En cas d'erreur, retourner l'ID sans numéro
    if (process.env.NODE_ENV === 'development') {
      console.warn('Erreur lors de l\'assignation du numéro utilisateur:', error);
    }
    return userId;
  }
};

/**
 * Extrait l'ID utilisateur original depuis un ID numéroté
 */
const extractOriginalUserId = (numberedUserId) => {
  // Format: user#1_1764253590480_8818u0x2r
  const match = numberedUserId.match(/^user#\d+_(.+)$/);
  if (match) {
    return `user_${match[1]}`;
  }
  // Si ce n'est pas un ID numéroté, retourner tel quel
  return numberedUserId;
};

// Cache pour éviter les appels répétés à Supabase
let userIdCache = null;
let userIdPromise = null;

/**
 * Génère un ID utilisateur unique (stocké dans localStorage)
 * Assigne automatiquement un numéro unique à chaque nouvel utilisateur
 */
export const getUserId = async () => {
  // Si on a déjà l'ID en cache, le retourner immédiatement
  if (userIdCache) {
    return userIdCache;
  }
  
  // Si une promesse est déjà en cours, attendre sa résolution
  if (userIdPromise) {
    return await userIdPromise;
  }
  
  // Créer une nouvelle promesse pour obtenir l'ID
  userIdPromise = (async () => {
    let userId = localStorage.getItem('retraiteClair_userId');
    
    // Si l'ID existe déjà et contient un numéro, le mettre en cache et le retourner
    if (userId && userId.includes('user#')) {
      userIdCache = userId;
      userIdPromise = null;
      return userId;
    }
    
    // Si l'ID existe mais n'a pas de numéro, extraire l'ID original
    if (userId) {
      const originalUserId = extractOriginalUserId(userId);
      // Assigner un numéro si ce n'est pas déjà fait
      const numberedUserId = await assignUserNumber(originalUserId);
      userIdCache = numberedUserId;
      userIdPromise = null;
      return numberedUserId;
    }
    
    // Créer un nouvel ID utilisateur
    const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('retraiteClair_userId', newUserId);
    
    // Assigner un numéro unique
    const numberedUserId = await assignUserNumber(newUserId);
    userIdCache = numberedUserId;
    userIdPromise = null;
    return numberedUserId;
  })();
  
  return await userIdPromise;
};

/**
 * Version synchrone qui retourne l'ID depuis le cache ou localStorage
 * Utilisée pour les cas où on ne peut pas attendre (comme GA4)
 */
export const getUserIdSync = () => {
  if (userIdCache) {
    return userIdCache;
  }
  
  const userId = localStorage.getItem('retraiteClair_userId');
  if (userId) {
    return userId;
  }
  
  // Si aucun ID n'existe, créer un ID temporaire (sera remplacé par la version async)
  const tempUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('retraiteClair_userId', tempUserId);
  return tempUserId;
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
    // Utiliser la version synchrone pour GA4 (ne peut pas attendre)
    gtag('event', eventName, {
      ...parameters,
      user_id: getUserIdSync(),
      session_id: getSessionId(),
      send_to: 'G-9WF389CM13'
    });
    
    // Initialiser l'ID asynchrone en arrière-plan si nécessaire
    if (!userIdCache) {
      getUserId().catch(() => {
        // Ignorer les erreurs silencieusement
      });
    }
    
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
    // Utiliser la version synchrone pour GA4 (ne peut pas attendre)
    gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pagePath,
      user_id: getUserIdSync(),
      session_id: getSessionId(),
      send_to: 'G-9WF389CM13'
    });
    
    // Initialiser l'ID asynchrone en arrière-plan si nécessaire
    if (!userIdCache) {
      getUserId().catch(() => {
        // Ignorer les erreurs silencieusement
      });
    }
    
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
    const userId = await getUserId();
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        properties,
        user_id: userId,
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

    const userId = await getUserId();
    
    // Mettre à jour last_seen dans user_numbers si l'utilisateur a un numéro
    if (userId.includes('user#')) {
      const originalUserId = extractOriginalUserId(userId);
      await supabase
        .from('user_numbers')
        .update({ last_seen: new Date().toISOString() })
        .eq('user_id', originalUserId);
    }
    
    const { error } = await supabase
      .from('events')
      .insert([
        {
          event_name: eventName,
          properties: parameters,
          user_id: userId,
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

