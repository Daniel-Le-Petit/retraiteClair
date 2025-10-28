import React, { useState } from 'react';
import { aboutContent, contactReasons } from '../data/data';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi (remplacer par votre logique d'envoi)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Contact & Assistance</h1>
            <p className={styles.subtitle}>
              Une question ? Besoin d'aide ? Notre équipe vous répond sous 24h
            </p>
          </div>
        </header>

        {/* Section "Qui sommes-nous ?" */}
        <section className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>Qui sommes-nous ?</h2>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <p>{aboutContent.content}</p>
              <p className={styles.author}>— {aboutContent.author}</p>
            </div>
            <div className={styles.aboutImage}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Équipe RetraiteClair"
                className={styles.image}
              />
            </div>
          </div>
        </section>

        {/* Formulaire de contact */}
        <section className={styles.contactFormSection}>
          <h2 className={styles.sectionTitle}>Contactez-nous</h2>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                
                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="subject" className={styles.label}>
                  Sujet *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="simulateur">Question sur le simulateur</option>
                  <option value="retraite-progressive">Information retraite progressive</option>
                  <option value="bug">Signaler un problème</option>
                  <option value="suggestion">Suggestion d'amélioration</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Décrivez votre question ou votre demande..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  Message envoyé avec succès ! Nous vous répondrons sous 24h.
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Section "Pourquoi nous contacter ?" */}
        <section className={styles.reasonsSection}>
          <h2 className={styles.sectionTitle}>Pourquoi nous contacter ?</h2>
          <div className={styles.reasonsGrid}>
            {contactReasons.map((reason, index) => (
              <div key={index} className={styles.reasonCard}>
                <div className={styles.reasonIcon}>{reason.icon}</div>
                <h3 className={styles.reasonTitle}>{reason.title}</h3>
                <p className={styles.reasonDescription}>{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Informations pratiques */}
        <section className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Informations pratiques</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>Délai de réponse</h3>
              <p>Nous nous engageons à vous répondre sous 24h ouvrées.</p>
            </div>
            
            <div className={styles.infoCard}>
              <h3>Confidentialité</h3>
              <p>Vos données sont protégées et ne seront jamais partagées.</p>
            </div>
            
            <div className={styles.infoCard}>
              <h3>Email direct</h3>
              <p>Vous pouvez aussi nous écrire directement à retraiteclair@gmail.com</p>
            </div>
            
            <div className={styles.infoCard}>
              <h3>Gratuit</h3>
              <p>Tous nos conseils et notre assistance sont entièrement gratuits.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;


