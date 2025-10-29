import React, { useState } from 'react';
import { Download, Mail, Calendar, BookOpen, Share2, Edit } from 'lucide-react';
import styles from './PostResultsActions.module.css';

const PostResultsActions = ({ simulationData, onModify }) => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleDownloadPDF = () => {
    // Logique de génération PDF
    console.log('Téléchargement PDF...', simulationData);
    // Ici on pourrait utiliser une librairie comme jsPDF ou react-pdf
    alert('Téléchargement du rapport PDF démarré');
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Logique d'envoi email
    console.log('Envoi email à:', email);
    setIsEmailSent(true);
    setTimeout(() => setIsEmailSent(false), 3000);
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
    <div className={styles.container}>
      <h3 className={styles.title}>
        🎯 Prochaines étapes
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
          >
            Télécharger
          </button>
        </div>

        {/* Recevoir par email */}
        <div className={styles.actionCard}>
          <div className={styles.cardIcon}>
            <Mail size={24} />
          </div>
          <h4 className={styles.cardTitle}>Recevoir par email</h4>
          <p className={styles.cardDescription}>
            Envoyez vos résultats directement dans votre boîte mail
          </p>
          <form onSubmit={handleSendEmail} className={styles.emailForm}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.fr"
              className={styles.emailInput}
              required
            />
            <button
              type="submit"
              className={styles.emailButton}
              disabled={isEmailSent}
            >
              {isEmailSent ? 'Envoyé ✓' : 'Envoyer'}
            </button>
          </form>
        </div>
      </div>

      {/* Besoin d'aide */}
      <div className={styles.helpCard}>
        <div className={styles.helpIcon}>💬</div>
        <div className={styles.helpContent}>
          <h4 className={styles.helpTitle}>Besoin d'aide pour vos démarches ?</h4>
          <p className={styles.helpText}>
            Un conseiller peut vous accompagner dans votre projet de retraite progressive
          </p>
        </div>
        <button className={styles.helpButton}>
          <Calendar size={16} />
          Prendre RDV avec un conseiller →
        </button>
      </div>

      {/* Guide pratique */}
      <div className={styles.guideCard}>
        <div className={styles.guideIcon}>
          <BookOpen size={24} />
        </div>
        <div className={styles.guideContent}>
          <h4 className={styles.guideTitle}>
            📚 Consultez notre guide complet
          </h4>
          <p className={styles.guideDescription}>
            "10 étapes pour demander votre Retraite Progressive"
          </p>
        </div>
        <button className={styles.guideButton}>
          Lire le guide →
        </button>
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
