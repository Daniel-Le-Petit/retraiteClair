import emailjs from '@emailjs/browser';

// ✅ CONFIGURATION EMAILJS - Configuration pour les simulations
const EMAILJS_CONFIG = {
  serviceId: 'service_7l45cwp',        // Service ID Gmail configuré
  templateId: 'template_amj5ayi',      // Template ID pour l'email de confirmation avec résultats
  publicKey: 'M2iGfrY568BDBjtCY'      // Clé publique configurée
};

/**
 * Envoie un email avec les résultats de simulation via EmailJS
 * Utilise la même configuration que le formulaire de contact
 * @param {string} recipientEmail - Email du destinataire
 * @param {Object} simulationData - Données de simulation à envoyer
 * @returns {Promise} - Promise qui se résout quand l'email est envoyé
 */
export const sendSimulationEmail = async (recipientEmail, simulationData) => {
  // Vérifier que l'email est valide
  if (!recipientEmail || !recipientEmail.includes('@')) {
    throw new Error('Adresse email invalide');
  }

  // Formater la date et l'heure séparément
  const now = new Date();
  const formattedDate = now.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = now.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const fullDateTime = `${formattedDate} ${formattedTime}`;

  // Extraire les données de simulation
  const revenuTotal = simulationData.revenusNets?.total || 0;
  const salaireTempsPartiel = simulationData.revenusNets?.tempsPartiel || 0;
  const pensionRetraite = simulationData.revenusNets?.pension || 0;
  const tempsPartiel = simulationData.details?.tempsPartiel || simulationData.tempsPartiel || 80;
  const economieFiscale = simulationData.impactFiscal?.economieAnnuelle ?? 
                         (simulationData.impactFiscal?.economie ? simulationData.impactFiscal.economie * 12 : 0);

  // Extraire le nom de l'email (format: prenom.nom@email.com -> Prenom Nom)
  const extractNameFromEmail = (email) => {
    const emailPart = email.split('@')[0];
    // Si format prenom.nom ou prenom_nom, formater en "Prenom Nom"
    if (emailPart.includes('.') || emailPart.includes('_')) {
      const parts = emailPart.split(/[._]/);
      return parts.map(part => 
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      ).join(' ');
    }
    // Sinon, capitaliser la première lettre
    return emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
  };

  const userName = extractNameFromEmail(recipientEmail);

  // Formater les données pour le template email selon le format demandé
  // ⚠️ IMPORTANT : Toutes ces variables doivent correspondre aux variables du template EmailJS
  const templateParams = {
    // Email du destinataire - UTILISÉ dans le champ "To Email" du template
    to_email: recipientEmail.trim(),  // Email de l'utilisateur qui recevra les résultats
    user_email: recipientEmail.trim(), // Alternative pour certains templates
    to_name: userName,
    
    // 📧 Informations de l'expéditeur (L'UTILISATEUR qui a demandé la simulation)
    sender_name: userName,  // Nom de l'utilisateur
    sender_email: recipientEmail,  // Email de l'utilisateur
    
    // Date et heure séparées pour plus de flexibilité dans le template
    date: formattedDate,
    time: formattedTime,
    date_time: fullDateTime,
    
    // 🎯 Sujet
    subject: 'Votre simulation Retraite Progressive - RetraiteClair',
    
    // 💬 Message avec résultats formatés
    message: `Voici votre simulation de retraite progressive générée le ${fullDateTime}

VOS RÉSULTATS :

💰 Revenu total net mensuel : ${formatCurrency(revenuTotal)}
💼 Salaire temps partiel : ${formatCurrency(salaireTempsPartiel)}
🏦 Pension retraite : ${formatCurrency(pensionRetraite)}
⏰ Temps partiel : ${tempsPartiel}%
📈 Économie fiscale annuelle : ${formatCurrency(economieFiscale)}

Pour plus de détails et pour modifier vos paramètres, visitez https://retraiteclair.onrender.com

Cordialement,
L'équipe RetraiteClair
📧 Répondre à retraiteclair@gmail.com`,
    
    // Variables individuelles pour les résultats (pour faciliter le formatage dans le template)
    revenu_total: formatCurrency(revenuTotal),
    salaire_temps_partiel: formatCurrency(salaireTempsPartiel),
    pension_retraite: formatCurrency(pensionRetraite),
    temps_partiel: `${tempsPartiel}%`,
    economie_fiscale: formatCurrency(economieFiscale),
    
    // Informations supplémentaires pour le template
    reply_to: 'retraiteclair@gmail.com',
    website_url: 'https://retraiteclair.onrender.com'
  };

  // Logs de débogage
  console.log('=== ENVOI EMAIL SIMULATION ===');
  console.log('Email destinataire reçu:', recipientEmail);
  console.log('Email destinataire dans params (to_email):', templateParams.to_email);
  console.log('Service ID:', EMAILJS_CONFIG.serviceId);
  console.log('Template ID:', EMAILJS_CONFIG.templateId);
  console.log('Tous les paramètres:', templateParams);

  try {
    // Envoi via EmailJS - Même structure que ContactForm
    // ⚠️ IMPORTANT : Assurez-vous que le template EmailJS utilise bien {{to_email}} dans "To Email"
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('Email de simulation envoyé avec succès:', response);
    return response;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de simulation:', error);
    console.error('Détails de l\'erreur:', {
      status: error.status,
      text: error.text,
      message: error.message
    });
    
    // Gestion d'erreur similaire à ContactForm
    let errorMessage = 'Une erreur est survenue lors de l\'envoi de l\'email.';
    
    if (error.status === 400 && error.text && error.text.includes('service ID not found')) {
      errorMessage = 'Service EmailJS introuvable. Vérifiez que le service est actif sur https://dashboard.emailjs.com/admin';
    } else if (error.status === 400 && error.text && error.text.includes('template ID not found')) {
      errorMessage = `Template EmailJS introuvable : "${EMAILJS_CONFIG.templateId}". Veuillez vérifier que le template existe bien dans votre dashboard EmailJS : https://dashboard.emailjs.com/admin/templates. Si le template n'existe pas encore, créez-le et utilisez le bon Template ID.`;
    } else if (error.status === 422 && error.text && error.text.includes('corrupted')) {
      errorMessage = 'Erreur EmailJS : L\'adresse email est corrompue. Vérifiez que le template EmailJS utilise exactement {{user_email}} dans le champ "To Email" (sans espaces, sans texte autour). Le problème peut aussi venir d\'une configuration incorrecte du service EmailJS.';
    } else if (error.status === 422) {
      errorMessage = `Erreur de configuration EmailJS : ${error.text || 'L\'adresse de destination est vide ou invalide'}. Vérifiez la configuration du template.`;
    } else if (error.message && error.message.includes('400')) {
      errorMessage = 'Configuration EmailJS manquante. Veuillez vérifier la configuration.';
    } else if (error.message && error.message.includes('Invalid')) {
      errorMessage = 'Configuration EmailJS invalide. Vérifiez vos clés de service.';
    } else if (error.text) {
      errorMessage = `Erreur EmailJS: ${error.text}`;
    }
    
    throw new Error(errorMessage);
  }
};

/**
 * Formatage d'un montant en devise
 */
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

