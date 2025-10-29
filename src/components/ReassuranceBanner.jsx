import React from 'react';
import { Shield, Star, CheckCircle } from 'lucide-react';
import styles from './ReassuranceBanner.module.css';

const ReassuranceBanner = ({ type = 'security' }) => {
  if (type === 'security') {
    return (
      <div className={`${styles.banner} ${styles.security}`}>
        <Shield size={20} />
        <div className={styles.content}>
          <strong>🔒 Vos données sont sécurisées</strong>
          <span>Aucune information n'est stockée ou partagée</span>
        </div>
      </div>
    );
  }

  if (type === 'trust') {
    return (
      <div className={`${styles.banner} ${styles.trust}`}>
        <Star size={20} />
        <div className={styles.content}>
          <strong>⭐ Déjà 12 450 simulations réalisées</strong>
          <span>Note moyenne : 4.8/5</span>
        </div>
      </div>
    );
  }

  if (type === 'compliance') {
    return (
      <div className={`${styles.banner} ${styles.compliance}`}>
        <CheckCircle size={20} />
        <div className={styles.content}>
          <div className={styles.complianceList}>
            <span>✓ Calculs conformes aux règles officielles</span>
            <span>✓ Mis à jour avec la réforme 2025</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ReassuranceBanner;
