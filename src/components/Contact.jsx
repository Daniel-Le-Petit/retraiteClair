import React, { useState, useEffect } from 'react';
import { aboutContent, contactReasons } from '../data/data';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations/translations';
import styles from './Contact.module.css';

const Contact = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Masquer le background image sur la page Contact
  useEffect(() => {
    const backgroundImage = document.querySelector('.background-image');
    
    if (backgroundImage) {
      backgroundImage.style.setProperty('display', 'none', 'important');
      backgroundImage.style.setProperty('visibility', 'hidden', 'important');
      backgroundImage.style.setProperty('opacity', '0', 'important');
    }
    
    // Forcer le background blanc
    document.body.style.setProperty('background-color', '#f5f5f5', 'important');
    
    return () => {
      // Restaurer le background quand on quitte la page
      if (backgroundImage) {
        backgroundImage.style.removeProperty('display');
        backgroundImage.style.removeProperty('visibility');
        backgroundImage.style.removeProperty('opacity');
      }
      document.body.style.removeProperty('background-color');
    };
  }, []);

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
            <h1 className={styles.title}>{t('contact.title', language)}</h1>
            <p className={styles.subtitle}>
              {language === 'en' 
                ? 'Have a question? Need help? Our team responds within 24 hours'
                : 'Une question ? Besoin d\'aide ? Notre équipe vous répond sous 24h'}
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
                src="/daniel-photo.jpg"
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
                    {t('contact.form.name', language)}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder={t('contact.form.namePlaceholder', language)}
                    required
                  />
                </div>
                
                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={styles.label}>
                    {t('contact.form.email', language)}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder={t('contact.form.emailPlaceholder', language)}
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
                {isSubmitting ? t('contact.form.sending', language) : t('contact.form.submit', language)}
              </button>

              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  {t('contact.form.success', language)}
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


