import { useEffect } from 'react';

const PageMetadata = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonical,
  structuredData,
  breadcrumbData
}) => {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      if (!content) return;
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update description
    if (description) {
      updateMetaTag('description', description);
    }

    // Update keywords if provided
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Open Graph tags
    if (ogTitle) updateMetaTag('og:title', ogTitle, 'property');
    if (ogDescription) updateMetaTag('og:description', ogDescription, 'property');
    if (ogImage) updateMetaTag('og:image', ogImage, 'property');
    if (ogUrl) updateMetaTag('og:url', ogUrl, 'property');
    updateMetaTag('og:type', 'article', 'property');

    // Twitter tags
    if (twitterTitle) updateMetaTag('twitter:title', twitterTitle, 'property');
    if (twitterDescription) updateMetaTag('twitter:description', twitterDescription, 'property');
    if (twitterImage) updateMetaTag('twitter:image', twitterImage, 'property');
    updateMetaTag('twitter:card', 'summary_large_image', 'property');

    // Canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Remove old structured data scripts
    const oldScripts = document.querySelectorAll('script[data-structured-data="true"]');
    oldScripts.forEach(script => script.remove());

    // Add structured data
    const addStructuredData = (data) => {
      if (!data) return;
      try {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);
        script.setAttribute('data-structured-data', 'true');
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error adding structured data:', error);
      }
    };

    if (structuredData) {
      if (Array.isArray(structuredData)) {
        structuredData.forEach((data) => {
          addStructuredData(data);
        });
      } else {
        addStructuredData(structuredData);
      }
    }

    if (breadcrumbData) {
      addStructuredData(breadcrumbData);
    }
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterTitle,
    twitterDescription,
    twitterImage,
    canonical
  ]);

  return null;
};

export default PageMetadata;

