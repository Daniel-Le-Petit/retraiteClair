import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Champ honeypot pour limiter le spam
  });
  const [status, setStatus] = useState('idle'); // idle, sending, sent, error
  const [errorMessage, setErrorMessage] = useState('');

      // ✅ CONFIGURATION EMAILJS - Clés configurées
      const EMAILJS_CONFIG = {
        serviceId: 'service_go62bxn',        // Service ID Gmail configuré (nouveau)
        templateId: 'template_sirltvl',      // Template ID configuré
        publicKey: 'gBCd9v4gii2QckAgK'      // Clé publique configurée
      };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    // Vérification du honeypot (doit rester vide)
    if (formData.honeypot) {
      setErrorMessage('Erreur de validation');
      return false;
    }

    if (!formData.name.trim()) {
      setErrorMessage('Le nom est requis');
      return false;
    }

    if (!formData.email.trim()) {
      setErrorMessage('L\'adresse email est requise');
      return false;
    }

    if (!formData.email.includes('@')) {
      setErrorMessage('Veuillez saisir une adresse email valide');
      return false;
    }

    if (!formData.message.trim()) {
      setErrorMessage('Le message est requis');
      return false;
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage('Le message doit contenir au moins 10 caractères');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      // Préparation des données pour EmailJS - Essai avec différentes configurations
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email,
        to_email: 'retraiteClair@gmail.com', // Ajout explicite de l'email de destination
        to_name: 'RetraiteClair',
        subject: 'Nouveau message de ' + formData.name + ' - RetraiteClair',
        date: new Date().toLocaleString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      console.log('Paramètres EmailJS:', templateParams);

      // Envoi via EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      console.log('Email envoyé avec succès:', response);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '', honeypot: '' });

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setStatus('error');
      
      // Messages d'erreur plus clairs selon le type d'erreur
      if (error.status === 400 && error.text && error.text.includes('service ID not found')) {
        setErrorMessage('Service EmailJS introuvable. Vérifiez que le service_b96jawv existe et est actif sur https://dashboard.emailjs.com/admin');
      } else if (error.status === 422) {
        setErrorMessage('Erreur de configuration EmailJS : L\'adresse de destination est vide. Vérifiez la configuration du template.');
      } else if (error.message && error.message.includes('400')) {
        setErrorMessage('Configuration EmailJS manquante. Veuillez configurer vos clés EmailJS dans le code.');
      } else if (error.message && error.message.includes('Invalid')) {
        setErrorMessage('Configuration EmailJS invalide. Vérifiez vos clés de service.');
      } else {
        setErrorMessage('Une erreur est survenue lors de l\'envoi du message. Vérifiez votre connexion internet.');
      }
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'sending':
        return 'Envoi en cours...';
      case 'sent':
        return 'Message envoyé avec succès ! Merci pour votre retour.';
      case 'error':
        return errorMessage;
      default:
        return '';
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'sending':
        return 'status-sending';
      case 'sent':
        return 'status-success';
      case 'error':
        return 'status-error';
      default:
        return '';
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-header">
          <h2>Contactez-nous</h2>
          <p>Partagez vos suggestions, signalements de bugs ou questions pour améliorer RetraiteClair</p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          {/* Champ honeypot caché pour limiter le spam */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleInputChange}
            style={{ display: 'none' }}
            tabIndex="-1"
            autoComplete="off"
          />

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nom <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Votre nom complet"
              required
              aria-describedby="name-help"
              aria-invalid={status === 'error' && !formData.name}
            />
            <small id="name-help" className="form-help">
              Votre nom sera affiché dans l'email
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="votre@email.com"
              required
              aria-describedby="email-help"
              aria-invalid={status === 'error' && !formData.email}
            />
            <small id="email-help" className="form-help">
              Nous vous répondrons à cette adresse
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message <span className="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Décrivez votre suggestion, bug ou question..."
              required
              rows="5"
              minLength="10"
              aria-describedby="message-help"
              aria-invalid={status === 'error' && !formData.message}
            />
            <small id="message-help" className="form-help">
              Minimum 10 caractères ({formData.message.length}/10)
            </small>
          </div>

          <button
            type="submit"
            className={`submit-button ${status === 'sending' ? 'sending' : ''}`}
            disabled={status === 'sending'}
            aria-describedby="status-message"
          >
            {status === 'sending' ? (
              <>
                <span className="spinner"></span>
                Envoi en cours...
              </>
            ) : (
              'Envoyer le message'
            )}
          </button>

          {status !== 'idle' && (
            <div
              id="status-message"
              className={`status-message ${getStatusClass()}`}
              role="alert"
              aria-live="polite"
            >
              {getStatusMessage()}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
