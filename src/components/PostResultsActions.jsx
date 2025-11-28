import React, { useState } from 'react';
import { Download, Mail, BookOpen, Share2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateSimulationPDF } from '../utils/generatePDF';
import { sendSimulationEmail } from '../utils/sendEmail';
import styles from './PostResultsActions.module.css';

const PostResultsActions = ({ simulationData, onModify }) => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = () => {
    // Track le téléchargement PDF
    trackEvent('document_downloaded', {
      document_type: 'pdf',
      document_name: 'simulation_results',
      contains_data: true,
      page: 'resultats'
    });
    if (!simulationData) {
      alert('Aucune donnée de simulation disponible');
      return;
    }
    
    setIsGeneratingPDF(true);
    
    try {
      generateSimulationPDF(simulationData);
      // Petit délai pour permettre à l'utilisateur de voir le feedback
      setTimeout(() => {
        setIsGeneratingPDF(false);
      }, 500);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF');
      setIsGeneratingPDF(false);
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Veuillez saisir une adresse email valide');
      return;
    }
    
    if (!simulationData) {
      alert('Aucune donnée de simulation disponible');
      return;
    }
    
    setIsSendingEmail(true);
    setEmailError('');
    
    try {
      // Envoyer l'email via EmailJS
      await sendSimulationEmail(email, simulationData);
      
      // Track l'envoi d'email
      trackEvent('email_sent', {
        email_type: 'simulation_results',
        recipient_count: 1,
        page: 'resultats'
      });
      
      setIsEmailSent(true);
      setIsSendingEmail(false);
      setEmail('');
      
      // Réinitialiser après 5 secondes
      setTimeout(() => {
        setIsEmailSent(false);
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      // Utiliser le message d'erreur détaillé depuis sendEmail
      setEmailError(error.message || 'Erreur lors de l\'envoi. Veuillez réessayer.');
      setIsSendingEmail(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ma simulation Retraite Progressive',
          text: 'Voici ma simulation de retraite progressive',
          url: window.location.href
        });
      } catch (err) {
        // L'utilisateur a annulé le partage
      }
    } else {
      // Fallback : copier le lien
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <div className={`${styles.container} animate-slideUp animate-delay-400`}>
      <h3 className={styles.title}>
        Prochaines étapes
      </h3>

      <div className={styles.actionsGrid}>
        {/* Télécharger PDF */}
        <div className={styles.actionCard}>
          <div className={styles.cardIcon}>
            <Download size={24} />
          </div>
          <h4 className={styles.cardTitle}>Télécharger mon rapport PDF</h4>
          <p className={styles.cardDescription}>
            Obtenez un résumé professionnel de votre simulation
          </p>
          <button
            className={styles.actionButton}
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF || !simulationData}
          >
            {isGeneratingPDF ? 'Génération...' : 'Télécharger'}
          </button>
        </div>

        {/* Recevoir par email */}
        <div className={styles.actionCard}>
          <div className={styles.cardIcon}>
            <Mail size={24} />
          </div>
          <h4 className={styles.cardTitle}>Recevoir par email</h4>
          <p className={styles.cardDescription}>
            Recevez vos résultats directement dans votre boîte mail
          </p>
          <form onSubmit={handleSendEmail} className={styles.emailForm}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              placeholder="votre@email.fr"
              className={`${styles.emailInput} ${emailError ? styles.emailInputError : ''}`}
              required
              disabled={isSendingEmail || isEmailSent}
            />
            {emailError && (
              <p className={styles.emailError}>{emailError}</p>
            )}
            <button
              type="submit"
              className={styles.emailButton}
              disabled={isEmailSent || isSendingEmail}
            >
              {isSendingEmail ? 'Envoi en cours...' : isEmailSent ? 'Email envoyé ✓' : 'Envoyer'}
            </button>
          </form>
          {isEmailSent && (
            <p className={styles.emailNote}>
              ✅ Email envoyé avec succès ! Vérifiez votre boîte de réception.
            </p>
          )}
        </div>
      </div>

      {/* Guide pratique */}
      <div className={styles.guideCard}>
        <div className={styles.guideIcon}>
          <BookOpen size={24} />
        </div>
        <div className={styles.guideContent}>
          <h4 className={styles.guideTitle}>
            Consultez notre guide complet
          </h4>
          <p className={styles.guideDescription}>
            "10 étapes pour demander votre Retraite Progressive"
          </p>
        </div>
        <Link 
          to="/blog/guide-complet-retraite-progressive-2025?from=simulator"
          className={styles.guideButton}
          onClick={(e) => {
            // Sauvegarder la position de scroll avant de naviguer
            const scrollPosition = window.scrollY;
            sessionStorage.setItem('simulatorScrollPosition', scrollPosition.toString());
            // Sauvegarder aussi que l'origine est le simulateur
            sessionStorage.setItem('blogArticleOrigin', 'simulator');
          }}
        >
          Lire le guide →
        </Link>
      </div>

      {/* Actions secondaires */}
      <div className={styles.secondaryActions}>
        <button
          className={styles.secondaryButton}
          onClick={onModify}
        >
          <Edit size={16} />
          Modifier mes paramètres
        </button>
        <button
          className={styles.secondaryButton}
          onClick={handleShare}
        >
          <Share2 size={16} />
          Partager cette simulation
        </button>
      </div>
    </div>
  );
};

export default PostResultsActions;
