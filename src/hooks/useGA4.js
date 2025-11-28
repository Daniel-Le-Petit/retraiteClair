// Déclarer gtag comme variable globale
/* global gtag */

import { trackGA4Event, trackGA4PageView } from '../utils/tracking';

export const useGA4 = () => {
  const trackPageView = (pageTitle, pagePath) => {
    trackGA4PageView(pageTitle, pagePath);
  };

  const trackEvent = (eventName, parameters = {}) => {
    trackGA4Event(eventName, parameters);
  };

  return { trackPageView, trackEvent };
};
