// import React from 'react';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonical = '',
  ogImage = "https://retraiteclair.onrender.com/og-image.svg"
}) => {
  const baseUrl = "https://retraiteclair.onrender.com";
  // const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;

  // Temporairement désactivé pour éviter l'erreur HelmetDispatcher
  // Les balises SEO sont déjà dans le fichier public/index.html
  return null;
};

export default SEOHead;

