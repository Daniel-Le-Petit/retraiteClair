import React from 'react';
import { 
  CheckCircle, Clock, Percent, Lightbulb, BarChart3, FileText, 
  Euro, Users, Calendar, TrendingUp, AlertCircle, Target, 
  Shield, Phone, Mail, BookOpen, Calculator, Heart
} from 'lucide-react';

const ConseilsPage = () => {
  return (
    <div className="page-content">
      <div className="conseils-container">
        <h2>Conseils & Optimisation</h2>
        <p className="conseils-intro">Maximisez vos revenus et préparez sereinement votre transition vers la retraite</p>
        
        {/* Section Optimisation financière */}
        <div className="conseils-section">
          <h3>💰 Optimisation financière</h3>
          <div className="conseils-grid">
            <div className="conseil-card">
              <div className="conseil-icon green">
                <Euro size={24} />
              </div>
              <h4>Choisissez le bon pourcentage</h4>
              <p>Entre 60% et 70% de temps partiel offre souvent le meilleur équilibre entre revenus et qualité de vie. Utilisez notre calculateur pour trouver votre optimal.</p>
            </div>
            
            <div className="conseil-card">
              <div className="conseil-icon green">
                <TrendingUp size={24} />
              </div>
              <h4>Cotisez à 100% si possible</h4>
              <p>Maintenir vos cotisations sur votre salaire plein augmente significativement votre pension définitive. L'impact peut représenter +150€/mois à vie.</p>
            </div>
            
            <div className="conseil-card">
              <div className="conseil-icon green">
                <Calculator size={24} />
              </div>
              <h4>Calculez l'impact fiscal</h4>
              <p>La baisse de vos revenus peut vous faire changer de tranche d'imposition. Consultez un conseiller fiscal pour optimiser votre situation.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon green">
                <Target size={24} />
              </div>
              <h4>Épargnez la différence</h4>
              <p>Si votre revenu en retraite progressive dépasse vos besoins, épargnez la différence pour constituer un capital ou compléter votre future pension.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon green">
                <Shield size={24} />
              </div>
              <h4>Vérifiez vos complémentaires</h4>
              <p>Assurez-vous que vos régimes complémentaires (Agirc-Arrco) sont bien pris en compte dans votre demande de retraite progressive.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon green">
                <BarChart3 size={24} />
              </div>
              <h4>Anticipez les variations</h4>
              <p>Vos revenus peuvent varier selon votre ancienneté, primes, et régimes. Prévoyez une marge de sécurité de 10% dans vos calculs.</p>
            </div>
          </div>
        </div>

        {/* Section Démarches administratives */}
        <div className="conseils-section">
          <h3>📋 Démarches administratives</h3>
          <div className="conseils-grid">
            <div className="conseil-card">
              <div className="conseil-icon blue">
                <Calendar size={24} />
              </div>
              <h4>Déposez 4 mois à l'avance</h4>
              <p>La caisse de retraite a besoin de 2 mois pour traiter votre dossier. Anticipez pour éviter tout retard dans le versement de votre pension.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon blue">
                <FileText size={24} />
              </div>
              <h4>Demandez votre relevé de carrière</h4>
              <p>Obtenez votre relevé actualisé sur lassuranceretraite.fr. Vérifiez qu'aucune période n'est manquante avant de faire votre demande.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon blue">
                <Users size={24} />
              </div>
              <h4>Consultez tous vos régimes</h4>
              <p>Si vous avez cotisé à plusieurs régimes (privé, public, indépendant), contactez chacun d'eux séparément pour coordonner votre retraite progressive.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon blue">
                <Phone size={24} />
              </div>
              <h4>Prenez rendez-vous avec un conseiller</h4>
              <p>Un entretien personnalisé (gratuit) vous aide à éviter les erreurs et à optimiser votre dossier. Appelez le 3960 ou prenez RDV en ligne.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon blue">
                <Mail size={24} />
              </div>
              <h4>Envoyez en recommandé avec AR</h4>
              <p>Pour votre demande officielle, utilisez un courrier recommandé avec accusé de réception. Conservez tous les justificatifs et copies.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon blue">
                <BookOpen size={24} />
              </div>
              <h4>Conservez toutes vos preuves</h4>
              <p>Gardez copies des avenants, attestations employeur, bulletins de salaire et correspondances avec les caisses de retraite pendant au moins 5 ans.</p>
            </div>
          </div>
        </div>

        {/* Section Gestion du temps partiel */}
        <div className="conseils-section">
          <h3>⏰ Gestion du temps partiel</h3>
          <div className="conseils-grid">
            <div className="conseil-card">
              <div className="conseil-icon purple">
                <Clock size={24} />
              </div>
              <h4>Négociez votre planning</h4>
              <p>Proposez un planning précis à votre employeur : jours fixes dans la semaine ou semaines complètes alternées. La régularité facilite l'organisation.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon purple">
                <Users size={24} />
              </div>
              <h4>Organisez la passation</h4>
              <p>Prévoyez le transfert de vos missions et la formation de vos collègues. Une transition bien préparée rassure votre employeur.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon purple">
                <Heart size={24} />
              </div>
              <h4>Privilégiez la qualité de vie</h4>
              <p>Choisissez un rythme qui vous permet de profiter de votre temps libre sans stress financier. L'équilibre est essentiel.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon purple">
                <Target size={24} />
              </div>
              <h4>Restez flexible au début</h4>
              <p>Si possible, prévoyez une clause de révision après 6 mois pour ajuster le pourcentage de temps partiel selon votre ressenti.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon purple">
                <Percent size={24} />
              </div>
              <h4>Évitez les extrêmes</h4>
              <p>40% peut être trop brutal financièrement, 80% ne vous laisse que peu de temps libre. Les pourcentages entre 55% et 70% sont souvent plus confortables.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon purple">
                <Calendar size={24} />
              </div>
              <h4>Planifiez vos absences</h4>
              <p>Vos congés payés seront calculés sur votre temps partiel. Anticipez vos périodes de vacances pour bien profiter de votre nouvelle organisation.</p>
            </div>
          </div>
        </div>

        {/* Section Optimisation de la pension */}
        <div className="conseils-section">
          <h3>📈 Optimisation de votre pension</h3>
          <div className="conseils-grid">
            <div className="conseil-card">
              <div className="conseil-icon orange">
                <TrendingUp size={24} />
              </div>
              <h4>Prolongez si vous le pouvez</h4>
              <p>Chaque année supplémentaire en retraite progressive augmente vos droits. Si vous êtes à l'aise financièrement, rester 3-4 ans optimise votre pension finale.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon orange">
                <Calculator size={24} />
              </div>
              <h4>Rachetez vos trimestres manquants</h4>
              <p>Avant de partir en retraite progressive, envisagez le rachat de trimestres. Cela augmente votre pension de base et donc votre pension progressive.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon orange">
                <Euro size={24} />
              </div>
              <h4>Cumulez emploi-retraite après</h4>
              <p>Après votre retraite définitive, vous pourrez cumuler emploi et retraite sans limite si vous avez le taux plein. Une option pour compléter vos revenus.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon orange">
                <Shield size={24} />
              </div>
              <h4>Sécurisez votre mutuelle</h4>
              <p>Vérifiez que votre mutuelle d'entreprise reste active à temps partiel. Sinon, souscrivez à une complémentaire individuelle avant de réduire votre temps.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon orange">
                <BarChart3 size={24} />
              </div>
              <h4>Surveillez vos points Agirc-Arrco</h4>
              <p>Vos points de retraite complémentaire continuent à s'accumuler. Vérifiez chaque année que tout est bien comptabilisé sur votre relevé.</p>
            </div>

            <div className="conseil-card">
              <div className="conseil-icon orange">
                <Lightbulb size={24} />
              </div>
              <h4>Consultez avant de décider</h4>
              <p>Un conseiller en gestion de patrimoine peut vous aider à optimiser votre stratégie globale (épargne, immobilier, fiscalité) pendant cette transition.</p>
            </div>
          </div>
        </div>

        {/* Section Pièges à éviter */}
        <div className="conseils-section">
          <h3>⚠️ Pièges à éviter</h3>
          <div className="conseils-grid alert-grid">
            <div className="conseil-card alert-card">
              <div className="conseil-icon red">
                <AlertCircle size={24} />
              </div>
              <h4>Ne sous-estimez pas vos besoins</h4>
              <p>Calculez vos charges fixes réelles (logement, santé, loisirs). Une baisse de revenus trop importante peut générer du stress.</p>
            </div>

            <div className="conseil-card alert-card">
              <div className="conseil-icon red">
                <AlertCircle size={24} />
              </div>
              <h4>N'oubliez pas la prévoyance</h4>
              <p>Vérifiez votre couverture en cas d'arrêt maladie ou invalidité à temps partiel. Certains contrats collectifs peuvent être impactés.</p>
            </div>

            <div className="conseil-card alert-card">
              <div className="conseil-icon red">
                <AlertCircle size={24} />
              </div>
              <h4>Attention aux trimestres</h4>
              <p>En dessous de 150h par trimestre, vous risquez de ne pas valider votre trimestre. Assurez-vous de bien valider 4 trimestres par an.</p>
            </div>

            <div className="conseil-card alert-card">
              <div className="conseil-icon red">
                <AlertCircle size={24} />
              </div>
              <h4>Vérifiez la réversibilité</h4>
              <p>Une fois en retraite progressive, difficile de revenir en arrière. Assurez-vous d'être prêt avant de franchir le pas.</p>
            </div>

            <div className="conseil-card alert-card">
              <div className="conseil-icon red">
                <AlertCircle size={24} />
              </div>
              <h4>Coordonnez les régimes</h4>
              <p>Si vous avez plusieurs régimes de retraite, tous doivent accepter la retraite progressive simultanément. Vérifiez les règles de chacun.</p>
            </div>

            <div className="conseil-card alert-card">
              <div className="conseil-icon red">
                <AlertCircle size={24} />
              </div>
              <h4>Informez-vous sur le chômage</h4>
              <p>En cas de rupture de contrat pendant la retraite progressive, vos droits au chômage peuvent être limités. Privilégiez la stabilité.</p>
            </div>
          </div>
        </div>

        {/* Section Timing optimal */}
        <div className="conseils-section">
          <h3>🎯 Timing optimal</h3>
          <div className="conseils-grid two-columns">
            <div className="conseil-card timing-card">
              <div className="conseil-icon yellow">
                <Calendar size={24} />
              </div>
              <h4>Commencez à 60-62 ans</h4>
              <p>C'est l'âge idéal pour démarrer : vous avez généralement vos trimestres, et vous pouvez bénéficier de 3-5 ans de retraite progressive avant le taux plein.</p>
            </div>

            <div className="conseil-card timing-card">
              <div className="conseil-icon yellow">
                <Clock size={24} />
              </div>
              <h4>Durez au moins 2-3 ans</h4>
              <p>Une durée trop courte ne permet pas de vraiment profiter du dispositif. 3 à 5 ans est souvent optimal pour l'adaptation et l'optimisation des droits.</p>
            </div>

            <div className="conseil-card timing-card">
              <div className="conseil-icon yellow">
                <TrendingUp size={24} />
              </div>
              <h4>Arrêtez au taux plein si possible</h4>
              <p>Atteindre l'âge du taux plein (67 ans ou avant avec tous vos trimestres) maximise votre pension définitive sans décote.</p>
            </div>

            <div className="conseil-card timing-card">
              <div className="conseil-icon yellow">
                <Lightbulb size={24} />
              </div>
              <h4>Profitez de la surcote</h4>
              <p>Si vous avez déjà le taux plein et continuez en retraite progressive, chaque trimestre supplémentaire vous donne une surcote de 1,25% sur votre pension finale.</p>
            </div>
          </div>
        </div>

        {/* Section Ressources utiles */}
        <div className="conseils-section">
          <h3>📚 Ressources officielles</h3>
          <div className="ressources-list">
            <div className="ressource-item">
              <div className="ressource-icon">
                <Phone size={20} />
              </div>
              <div className="ressource-content">
                <h4>Assurance Retraite</h4>
                <p>Téléphone : <strong>3960</strong> (0,06€/min + prix d'appel)</p>
                <p>Du lundi au vendredi, 8h-17h</p>
              </div>
            </div>

            <div className="ressource-item">
              <div className="ressource-icon">
                <BookOpen size={20} />
              </div>
              <div className="ressource-content">
                <h4>Portail Info Retraite</h4>
                <p>Site : <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer">www.info-retraite.fr</a></p>
                <p>Accédez à votre relevé de carrière et estimez vos droits</p>
              </div>
            </div>

            <div className="ressource-item">
              <div className="ressource-icon">
                <Users size={20} />
              </div>
              <div className="ressource-content">
                <h4>Agirc-Arrco (complémentaire)</h4>
                <p>Site : <a href="https://www.agirc-arrco.fr" target="_blank" rel="noopener noreferrer">www.agirc-arrco.fr</a></p>
                <p>Pour vos régimes de retraite complémentaire</p>
              </div>
            </div>

            <div className="ressource-item">
              <div className="ressource-icon">
                <Mail size={20} />
              </div>
              <div className="ressource-content">
                <h4>France Services</h4>
                <p>Rendez-vous dans votre <strong>France Services</strong> local</p>
                <p>Accompagnement gratuit pour vos démarches administratives</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Checklist finale */}
        <div className="conseils-section checklist-section">
          <h3>✅ Checklist avant de vous lancer</h3>
          <div className="checklist-container">
            <div className="checklist-column">
              <h4>Vérifications préalables</h4>
              <ul className="checklist">
                <li>☐ J'ai au moins 60 ans</li>
                <li>☐ J'ai cotisé au moins 150 trimestres</li>
                <li>☐ Mon employeur est d'accord pour le temps partiel</li>
                <li>☐ J'ai obtenu mon relevé de carrière actualisé</li>
                <li>☐ J'ai simulé mes revenus futurs</li>
                <li>☐ Mon budget est compatible avec la baisse de revenus</li>
              </ul>
            </div>

            <div className="checklist-column">
              <h4>Documents à préparer</h4>
              <ul className="checklist">
                <li>☐ Relevé de carrière complet</li>
                <li>☐ Avenant au contrat de travail signé</li>
                <li>☐ Attestation employeur de temps de travail</li>
                <li>☐ 3 derniers bulletins de salaire</li>
                <li>☐ Pièce d'identité et carte vitale</li>
                <li>☐ RIB pour le versement de la pension</li>
              </ul>
            </div>

            <div className="checklist-column">
              <h4>Après le démarrage</h4>
              <ul className="checklist">
                <li>☐ Vérifier le premier versement de pension</li>
                <li>☐ Contrôler les cotisations sur bulletin de salaire</li>
                <li>☐ Mettre à jour ma mutuelle si nécessaire</li>
                <li>☐ Ajuster mon budget selon mes revenus réels</li>
                <li>☐ Consulter mon relevé annuel de points</li>
                <li>☐ Planifier ma retraite définitive</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConseilsPage;