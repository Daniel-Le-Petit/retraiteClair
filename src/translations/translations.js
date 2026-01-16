// Traductions FR/EN pour RetraiteClair

export const translations = {
  fr: {
    // Navigation
    nav: {
      accueil: 'Accueil',
      simulateurs: 'Simulateurs',
      blog: 'Blog',
      guidePratique: 'Guide pratique',
      contact: 'Contact',
    },
    // HomePage
    home: {
      title: 'RetraiteClair',
      subtitle: 'Simplifiez votre départ à la retraite avec notre simulateur de retraite progressive',
      // Ajoutez d'autres traductions de la homepage ici
    },
    // Contact
    contact: {
      title: 'Contact & Assistance',
      subtitle: 'Notre équipe d\'experts vous accompagne dans votre projet de retraite progressive',
      form: {
        name: 'Nom *',
        namePlaceholder: 'Votre nom complet',
        email: 'Email *',
        emailPlaceholder: 'votre@email.com',
        message: 'Message *',
        messagePlaceholder: 'Décrivez votre suggestion, bug ou question...',
        submit: 'Envoyer',
        sending: 'Envoi en cours...',
        success: 'Message envoyé avec succès !',
        error: 'Erreur lors de l\'envoi. Veuillez réessayer.',
      },
    },
    // Common
    common: {
      learnMore: 'En savoir plus',
      readMore: 'Lire la suite',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      close: 'Fermer',
    },
  },
  en: {
    // Navigation
    nav: {
      accueil: 'Home',
      simulateurs: 'Simulators',
      blog: 'Blog',
      guidePratique: 'Practical Guide',
      contact: 'Contact',
    },
    // HomePage
    home: {
      title: 'RetraiteClair',
      subtitle: 'Simplify your retirement with our progressive retirement simulator',
      // Ajoutez d'autres traductions de la homepage ici
    },
    // Contact
    contact: {
      title: 'Contact & Support',
      subtitle: 'Our team of experts supports you in your progressive retirement project',
      form: {
        name: 'Name *',
        namePlaceholder: 'Your full name',
        email: 'Email *',
        emailPlaceholder: 'your@email.com',
        message: 'Message *',
        messagePlaceholder: 'Describe your suggestion, bug or question...',
        submit: 'Send',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Error sending message. Please try again.',
      },
    },
    // Common
    common: {
      learnMore: 'Learn more',
      readMore: 'Read more',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
    },
  },
};

// Helper function pour obtenir une traduction
export const t = (key, lang = 'fr') => {
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    if (value && value[k]) {
      value = value[k];
    } else {
      // Fallback vers le français si la traduction n'existe pas
      value = translations.fr;
      for (const k2 of keys) {
        if (value && value[k2]) {
          value = value[k2];
        } else {
          return key; // Retourner la clé si aucune traduction n'est trouvée
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
};








