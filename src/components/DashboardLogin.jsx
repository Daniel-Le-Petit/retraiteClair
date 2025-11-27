import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import styles from './DashboardLogin.module.css';

const DashboardLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Vérifier le mot de passe contre la variable d'environnement
    const correctPassword = process.env.REACT_APP_DASHBOARD_PASSWORD;
    
    if (!correctPassword) {
      setError('Dashboard non configuré. Contactez l\'administrateur.');
      setLoading(false);
      return;
    }

    if (password === correctPassword) {
      // Stocker l'authentification dans sessionStorage (expire à la fermeture du navigateur)
      sessionStorage.setItem('dashboard_authenticated', 'true');
      sessionStorage.setItem('dashboard_auth_time', Date.now().toString());
      onLogin();
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
    
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.iconContainer}>
          <Lock size={48} className={styles.icon} />
        </div>
        <h2 className={styles.title}>Accès Dashboard Analytics</h2>
        <p className={styles.subtitle}>Veuillez entrer le mot de passe pour accéder au dashboard</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className={styles.input}
              autoFocus
              disabled={loading}
            />
          </div>
          
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className={styles.button}
            disabled={loading || !password}
          >
            {loading ? 'Vérification...' : 'Accéder au Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardLogin;

