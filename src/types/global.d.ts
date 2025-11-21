// Global type declarations for window object extensions

interface Window {
  gtag?: (
    command: string,
    targetId?: string | Date | Record<string, any>,
    config?: Record<string, any>
  ) => void;
  fbq?: (
    command: string,
    event?: string,
    params?: Record<string, any>
  ) => void;
  dataLayer?: any[];
  loadGoogleAnalytics?: () => void;
  loadMetaPixel?: () => void;
}

// Declare module for CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Declare module for regular CSS files
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

