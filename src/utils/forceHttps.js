export const forceHttps = () => {
  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'http:' &&
    window.location.hostname !== 'localhost' &&
    !window.location.hostname.includes('127.0.0.1')
  ) {
    window.location.replace(
      `https://${window.location.hostname}${window.location.pathname}${window.location.search}${window.location.hash}`
    );
  }
};







