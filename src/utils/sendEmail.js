import emailjs from '@emailjs/browser';

// ✅ CONFIGURATION EMAILJS - Même configuration que ContactForm
const EMAILJS_CONFIG = {
  serviceId: 'service_go62bxn',        // Service ID Gmail configuré
  templateId: 'template_sirltvl',      // Template ID configuré (à créer un nouveau template pour les simulations)
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
  // Formater les données pour le template email
  const templateParams = {
    // Paramètres destinataire (comme dans ContactForm)
    to_email: recipientEmail,
    to_name: 'Utilisateur RetraiteClair',
    
    // Paramètres expéditeur (pour que l'email arrive de retraiteClair@gmail.com)
    from_email: 'retraiteClair@gmail.com',
    from_name: 'RetraiteClair',
    reply_to: 'retraiteClair@gmail.com',
    
    // Sujet de l'email
    subject: 'Votre simulation Retraite Progressive - RetraiteClair',
    
    // Message principal avec toutes les données de simulation
    message: `Voici votre simulation de retraite progressive générée le ${new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}

📊 VOS RÉSULTATS :

💰 Revenu total net mensuel : ${formatCurrency(simulationData.revenusNets?.total || 0)}
💼 Salaire temps partiel : ${formatCurrency(simulationData.revenusNets?.tempsPartiel || 0)}
🏦 Pension retraite : ${formatCurrency(simulationData.revenusNets?.pension || 0)}
⏰ Temps partiel : ${simulationData.details?.tempsPartiel || simulationData.tempsPartiel || 80}%
📈 Économie fiscale annuelle : ${formatCurrency(simulationData.impactFiscal?.economieAnnuelle ?? (simulationData.impactFiscal?.economie ? simulationData.impactFiscal.economie * 12 : 0))}

Pour plus de détails et pour modifier vos paramètres, visitez https://retraiteclair.com

Cordialement,
L'équipe RetraiteClair`,
    
    // Date formatée
    date: new Date().toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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

