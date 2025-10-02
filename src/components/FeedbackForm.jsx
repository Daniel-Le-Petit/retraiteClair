import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    name: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, sent, error
  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          message: formData.message,
          name: formData.name || 'Anonyme',
          _subject: 'Retour utilisateur - RetraiteClair'
        })
      });

      if (response.ok) {
        setStatus('sent');
        setFormData({ email: '', message: '', name: '' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Une erreur est survenue lors de l\'envoi du message');
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
    <div className="feedback-container">
      <div className="feedback-card">
        <div className="feedback-header">
          <h2>Votre avis nous intéresse</h2>
          <p>Partagez vos suggestions, signalements de bugs ou questions pour améliorer RetraiteClair</p>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form" noValidate>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nom (optionnel)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Votre nom"
              aria-describedby="name-help"
            />
            <small id="name-help" className="form-help">
              Reste anonyme si vous préférez
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
              Nous ne partagerons jamais votre email
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

export default FeedbackForm;
