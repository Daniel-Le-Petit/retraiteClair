# Task 5: Open-source Transparency

## Files to create/modify

### 1. src/utils/retraiteFormulas.js - Create formulas file

Create `src/utils/retraiteFormulas.js`:

```javascript
/**
 * Formules de calcul de retraite progressive - 2025
 * Basées sur les règles officielles de l'Assurance Retraite
 * 
 * Sources:
 * - Code de la sécurité sociale, articles L. 351-1 à L. 351-18
 * - Décret n° 2010-1734 du 30 décembre 2010
 * - Arrêtés annuels fixant les taux et plafonds
 * 
 * Dernière mise à jour: 2025-01-01
 */

/**
 * Taux de liquidation de la pension (2025)
 * @param {number} trimestres - Nombre de trimestres validés
 * @param {number} trimestresRequis - Nombre de trimestres requis pour taux plein
 * @returns {number} Taux de liquidation (entre 0.5 et 1.0)
 */
export const calculerTauxLiquidation = (trimestres, trimestresRequis) => {
  // Taux plein si trimestres >= requis
  if (trimestres >= trimestresRequis) {
    return 1.0;
  }

  // Décote: -0.625% par trimestre manquant (max 25 trimestres = -15.625%)
  const trimestresManquants = trimestresRequis - trimestres;
  const decote = Math.min(trimestresManquants * 0.00625, 0.15625);
  
  // Taux minimum: 50%
  return Math.max(0.5, 1.0 - decote);
};

/**
 * Surcote: majoration pour trimestres supplémentaires (2025)
 * @param {number} trimestres - Nombre de trimestres validés
 * @param {number} trimestresRequis - Nombre de trimestres requis
 * @returns {number} Coefficient de surcote (1.0 à 1.25 max)
 */
export const calculerSurcote = (trimestres, trimestresRequis) => {
  if (trimestres <= trimestresRequis) {
    return 1.0;
  }

  // Majoration: +1.25% par trimestre supplémentaire (max 20 trimestres = +25%)
  const trimestresSupplementaires = trimestres - trimestresRequis;
  const majoration = Math.min(trimestresSupplementaires * 0.0125, 0.25);
  
  return 1.0 + majoration;
};

/**
 * Salaire annuel moyen (SAM) - Moyenne des 25 meilleures années
 * @param {number[]} salairesAnnuels - Tableau des salaires annuels bruts
 * @returns {number} Salaire annuel moyen
 */
export const calculerSAM = (salairesAnnuels) => {
  if (!salairesAnnuels || salairesAnnuels.length === 0) {
    return 0;
  }

  // Trier par ordre décroissant et prendre les 25 meilleures années
  const salairesTries = [...salairesAnnuels]
    .sort((a, b) => b - a)
    .slice(0, 25);

  // Moyenne des 25 meilleures années
  const somme = salairesTries.reduce((acc, salaire) => acc + salaire, 0);
  return somme / salairesTries.length;
};

/**
 * Pension de base (régime général)
 * @param {number} sam - Salaire annuel moyen
 * @param {number} tauxLiquidation - Taux de liquidation (0.5 à 1.0)
 * @param {number} surcote - Coefficient de surcote (1.0 à 1.25)
 * @returns {number} Pension annuelle brute
 */
export const calculerPensionBase = (sam, tauxLiquidation, surcote = 1.0) => {
  // Taux de remplacement: 50% du SAM
  const tauxRemplacement = 0.5;
  
  // Pension = SAM × taux remplacement × taux liquidation × surcote
  return sam * tauxRemplacement * tauxLiquidation * surcote;
};

/**
 * Pension progressive (retraite progressive)
 * @param {number} pensionComplete - Pension à taux plein
 * @param {number} tauxProgression - Taux de progression (0.0 à 1.0)
 * @returns {number} Pension progressive annuelle brute
 */
export const calculerPensionProgressive = (pensionComplete, tauxProgression) => {
  // Pension progressive = pension complète × taux de progression
  // Taux de progression dépend du temps partiel (ex: 50% temps partiel = 50% pension)
  return pensionComplete * tauxProgression;
};

/**
 * Cotisations sociales sur pension (2025)
 * @param {number} pensionBrute - Pension annuelle brute
 * @returns {number} Cotisations annuelles
 */
export const calculerCotisationsPension = (pensionBrute) => {
  // Taux de cotisations: 10% (CSG + CRDS + autres)
  const tauxCotisations = 0.10;
  return pensionBrute * tauxCotisations;
};

/**
 * Impôt sur le revenu (simplifié - tranches 2025)
 * @param {number} revenuImposable - Revenu imposable annuel
 * @returns {number} Impôt annuel
 */
export const calculerImpotRevenu = (revenuImposable) => {
  // Tranches d'imposition 2025 (simplifié)
  const tranches = [
    { min: 0, max: 11294, taux: 0 },
    { min: 11294, max: 28797, taux: 0.11 },
    { min: 28797, max: 82341, taux: 0.30 },
    { min: 82341, max: 177106, taux: 0.41 },
    { min: 177106, max: Infinity, taux: 0.45 },
  ];

  let impot = 0;
  let reste = revenuImposable;

  for (const tranche of tranches) {
    if (reste <= 0) break;

    const baseImposable = Math.min(reste, tranche.max - tranche.min);
    impot += baseImposable * tranche.taux;
    reste -= baseImposable;
  }

  return Math.round(impot);
};

/**
 * Revenu net après cotisations et impôts
 * @param {number} revenuBrut - Revenu annuel brut
 * @param {number} cotisations - Cotisations annuelles
 * @param {number} impot - Impôt annuel
 * @returns {number} Revenu net annuel
 */
export const calculerRevenuNet = (revenuBrut, cotisations, impot) => {
  return revenuBrut - cotisations - impot;
};

/**
 * Trimestres requis selon l'année de naissance (2025)
 * @param {number} anneeNaissance - Année de naissance
 * @returns {number} Nombre de trimestres requis
 */
export const getTrimestresRequis = (anneeNaissance) => {
  // Générations nées à partir de 1973: 172 trimestres (43 ans)
  if (anneeNaissance >= 1973) {
    return 172;
  }
  
  // Générations 1961-1972: 168 trimestres (42 ans)
  if (anneeNaissance >= 1961) {
    return 168;
  }
  
  // Générations 1955-1960: 164 trimestres (41 ans)
  if (anneeNaissance >= 1955) {
    return 164;
  }
  
  // Générations avant 1955: 160 trimestres (40 ans)
  return 160;
};

/**
 * Age légal de départ selon l'année de naissance (2025)
 * @param {number} anneeNaissance - Année de naissance
 * @returns {number} Age légal de départ
 */
export const getAgeLegalDepart = (anneeNaissance) => {
  // Générations nées à partir de 1973: 64 ans
  if (anneeNaissance >= 1973) {
    return 64;
  }
  
  // Générations 1961-1972: 63 ans
  if (anneeNaissance >= 1961) {
    return 63;
  }
  
  // Générations avant 1961: 62 ans
  return 62;
};

// Export par défaut avec toutes les formules
export default {
  calculerTauxLiquidation,
  calculerSurcote,
  calculerSAM,
  calculerPensionBase,
  calculerPensionProgressive,
  calculerCotisationsPension,
  calculerImpotRevenu,
  calculerRevenuNet,
  getTrimestresRequis,
  getAgeLegalDepart,
};
```

### 2. src/components/Footer.tsx - Add source code link

```diff
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleLegalLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  const handleCookieManagement = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).reopenCookieBanner) {
      (window as any).reopenCookieBanner();
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.links}>
            <Link 
              to="/mentions-legales" 
              className={styles.link}
              onClick={(e) => handleLegalLinkClick(e, '/mentions-legales')}
            >
              Mentions légales
            </Link>
            <span className={styles.separator}>|</span>
            <Link 
              to="/politique-confidentialite" 
              className={styles.link}
              onClick={(e) => handleLegalLinkClick(e, '/politique-confidentialite')}
            >
              Politique de confidentialité
            </Link>
            <span className={styles.separator}>|</span>
            <a 
              href="#" 
              className={styles.link}
              onClick={handleCookieManagement}
            >
              Gestion des cookies
            </a>
+           <span className={styles.separator}>|</span>
+           <a 
+             href="https://github.com/retraiteclair/retraiteclair" 
+             target="_blank" 
+             rel="noopener noreferrer"
+             className={styles.link}
+           >
+             Code source & méthodologie
+           </a>
          </div>
          <div className={styles.copyright}>
            © {currentYear} RetraiteClair – Tous droits réservés
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```





