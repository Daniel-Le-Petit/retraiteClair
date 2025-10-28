// Déclarer gtag comme variable globale
/* global gtag */

export const useGA4 = () => {
  const trackPageView = (pageTitle, pagePath) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath,
        send_to: 'G-9WF389CM13'
      });
      console.log(`GA4 Page View tracked: ${pageTitle} - ${pagePath}`);
    }
  };

  const trackEvent = (eventName, parameters = {}) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        ...parameters,
        send_to: 'G-9WF389CM13'
      });
      console.log(`GA4 Event tracked: ${eventName}`, parameters);
    }
  };

  return { trackPageView, trackEvent };
};
