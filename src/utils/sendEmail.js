import emailjs from '@emailjs/browser';

// ✅ CONFIGURATION EMAILJS - Configuration pour les simulations
const EMAILJS_CONFIG = {
  serviceId: 'service_go62bxn',        // Service ID Gmail configuré
  templateId: 'template_amj5ayi',      // Template ID pour l'email de confirmation avec résultats
  publicKey: 'gBCd9v4gii2QckAgK'      // Clé publique configurée
};

/**
 * Envoie un email avec les résultats de simulation via EmailJS
 * Utilise la même configuration que le formulaire de contact
 * @param {string} recipientEmail - Email du destinataire
 * @param {Object} simulationData - Données de simulation à envoyer
 * @returns {Promise} - Promise qui se résout quand l'email est envoyé
 */
export const sendSimulationEmail = async (recipientEmail, simulationData) => {
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

  // Formater les données pour le template email selon le format demandé
  const templateParams = {
    // ⚠️ IMPORTANT : Le template EmailJS doit utiliser {{to_email}} dans le champ "To Email"
    // et non une adresse email en dur, sinon tous les emails iront à cette adresse
    to_email: recipientEmail,  // Email de l'utilisateur qui recevra les résultats
    to_name: recipientEmail.split('@')[0], // Nom dérivé de l'email
    
    // 📧 Informations de l'expéditeur
    sender_name: 'RetraiteClair',
    sender_email: 'retraiteClair@gmail.com',
    
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

  console.log('Paramètres EmailJS (simulation):', templateParams);

  try {
    // Envoi via EmailJS - Même structure que ContactForm
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
    
    // Gestion d'erreur similaire à ContactForm
    let errorMessage = 'Une erreur est survenue lors de l\'envoi de l\'email.';
    
    if (error.status === 400 && error.text && error.text.includes('service ID not found')) {
      errorMessage = 'Service EmailJS introuvable. Vérifiez que le service est actif sur https://dashboard.emailjs.com/admin';
    } else if (error.status === 422) {
      errorMessage = 'Erreur de configuration EmailJS : L\'adresse de destination est vide. Vérifiez la configuration du template.';
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

