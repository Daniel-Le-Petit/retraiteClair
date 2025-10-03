import React, { useState } from 'react';
import { 
  CheckCircle, Clock, Percent, Lightbulb, BarChart3, FileText, 
  Euro, Users, Calendar, TrendingUp, AlertCircle, Target, 
  Shield, Phone, Mail, BookOpen, Calculator, Heart, ChevronDown, ChevronUp
} from 'lucide-react';

const ConseilsPage = ({ onPageChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    optimisation: false,
    demarches: false,
    pension: false,
    pieges: false
  });

  const [checklistItems, setChecklistItems] = useState({
    age: false,
    trimestres: false,
    employeur: false,
    releve: false,
    simulation: false,
    budget: false,
    releveCarriere: false,
    avenant: false,
    attestation: false,
    bulletins: false,
    identite: false,
    rib: false,
    versement: false,
    cotisations: false,
    mutuelle: false,
    budgetReel: false,
    points: false,
    planification: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleChecklistItem = (item) => {
    setChecklistItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <div className="page-content">
      <div className="conseils-container">
        {/* H1 principal pour le SEO */}
        <h1 style={{position: 'absolute', left: '-9999px', top: '-9999px'}}>
          Conseils Retraite Progressive : Optimisez Votre Transition 2024
        </h1>
        
        <h2>Conseils & Optimisation de votre retraite progressive</h2>
        <p className="conseils-intro">La retraite progressive est un sas : vous gardez un pied dans la vie pro tout en activant déjà une partie de vos droits.</p>
        
        {/* Section Optimisation financière - Accordion */}
        <div className="conseils-accordion">
          <button 
            className="accordion-header" 
            onClick={() => toggleSection('optimisation')}
            type="button"
          >
            <h3>💰 Comment optimiser financièrement sa retraite progressive</h3>
            {expandedSections.optimisation ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
          {expandedSections.optimisation && (
            <div className="accordion-content">
              <div className="conseils-grid">
                <div className="conseil-card">
                  <div className="conseil-icon green">
                    <Euro size={24} />
                  </div>
                  <h4>Choisissez le bon pourcentage</h4>
                  <p>Entre 60% et 70% de temps partiel offre souvent le meilleur équilibre entre revenus et qualité de vie. Utilisez notre calculateur pour trouver votre optimal.</p>
                  <button 
                    className="conseil-link-btn"
                    onClick={() => onPageChange('calculateur')}
                  >
                    🧮 Tester avec le simulateur
                  </button>
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
                  <button 
                    className="conseil-link-btn"
                    onClick={() => onPageChange('calculateur')}
                  >
                    💰 Simuler l'impact fiscal
                  </button>
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
          )}
        </div>

        {/* Section Démarches administratives - Accordion */}
        <div className="conseils-accordion">
              <button 
                className="accordion-header" 
                onClick={() => toggleSection('demarches')}
                type="button"
              >
            <h3>📋 Démarches administratives pour la retraite progressive</h3>
            {expandedSections.demarches ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
          {expandedSections.demarches && (
            <div className="accordion-content">
              <div className="conseils-grid">
                <div className="conseil-card">
                  <div className="conseil-icon blue">
                    <Calendar size={24} />
                  </div>
                  <h4>Déposez 4 mois à l'avance</h4>
                  <p>Votre demande doit être déposée au moins 4 mois avant la date souhaitée de début. Ne tardez pas, les délais peuvent être longs.</p>
                </div>

                <div className="conseil-card">
                  <div className="conseil-icon blue">
                    <FileText size={24} />
                  </div>
                  <h4>Vérifiez votre relevé</h4>
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
                  <button 
                    className="conseil-link-btn"
                    onClick={() => onPageChange('contact')}
                  >
                    📞 Poser une question
                  </button>
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
          )}
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
                <Percent size={24} />
              </div>
              <h4>Testez différents pourcentages</h4>
              <p>Commencez par 60% et ajustez selon vos besoins. Vous pouvez modifier votre temps partiel avec l'accord de votre employeur.</p>
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

        {/* Section Optimisation de la pension - Accordion */}
        <div className="conseils-accordion">
              <button 
                className="accordion-header" 
                onClick={() => toggleSection('pension')}
                type="button"
              >
            <h3>📈 Comment optimiser sa pension de retraite progressive</h3>
            {expandedSections.pension ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
          {expandedSections.pension && (
            <div className="accordion-content">
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
          )}
        </div>

        {/* Section Pièges à éviter - Accordion */}
        <div className="conseils-accordion">
              <button 
                className="accordion-header" 
                onClick={() => toggleSection('pieges')}
                type="button"
              >
            <h3>⚠️ Pièges à éviter dans la retraite progressive</h3>
            {expandedSections.pieges ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
          {expandedSections.pieges && (
            <div className="accordion-content">
              <div className="conseils-grid alert-grid">
                <div className="conseil-card alert-card">
                  <div className="conseil-icon red">
                    <AlertCircle size={24} />
                  </div>
                  <h4>Ne sous-estimez pas vos besoins</h4>
                  <p>Calculez précisément vos dépenses mensuelles. Une baisse de revenus mal anticipée peut créer des difficultés financières.</p>
                </div>

                <div className="conseil-card alert-card">
                  <div className="conseil-icon red">
                    <AlertCircle size={24} />
                  </div>
                  <h4>Attention aux délais</h4>
                  <p>Les démarches prennent du temps. Ne commencez pas vos négociations avec votre employeur trop tardivement.</p>
                </div>

                <div className="conseil-card alert-card">
                  <div className="conseil-icon red">
                    <AlertCircle size={24} />
                  </div>
                  <h4>Vérifiez votre mutuelle</h4>
                  <p>Certaines mutuelles d'entreprise ne couvrent plus à temps partiel. Vérifiez avant de signer votre avenant.</p>
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
          )}
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
                <p>3960 (service gratuit + prix appel) - Du lundi au vendredi de 8h à 17h</p>
              </div>
            </div>

            <div className="ressource-item">
              <div className="ressource-icon">
                <Mail size={20} />
              </div>
              <div className="ressource-content">
                <h4>Site officiel</h4>
                <p>www.lassuranceretraite.fr - Tous vos services en ligne</p>
              </div>
            </div>

            <div className="ressource-item">
              <div className="ressource-icon">
                <BookOpen size={20} />
              </div>
              <div className="ressource-content">
                <h4>Guide pratique</h4>
                <p>Téléchargez le guide "Retraite progressive" sur le site officiel</p>
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
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="age"
                    checked={checklistItems.age}
                    onChange={() => toggleChecklistItem('age')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="age">J'ai au moins 60 ans</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="trimestres"
                    checked={checklistItems.trimestres}
                    onChange={() => toggleChecklistItem('trimestres')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="trimestres">J'ai cotisé au moins 150 trimestres</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="employeur"
                    checked={checklistItems.employeur}
                    onChange={() => toggleChecklistItem('employeur')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="employeur">Mon employeur est d'accord pour le temps partiel</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="releve"
                    checked={checklistItems.releve}
                    onChange={() => toggleChecklistItem('releve')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="releve">J'ai obtenu mon relevé de carrière actualisé</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="simulation"
                    checked={checklistItems.simulation}
                    onChange={() => toggleChecklistItem('simulation')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="simulation">J'ai simulé mes revenus futurs</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="budget"
                    checked={checklistItems.budget}
                    onChange={() => toggleChecklistItem('budget')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="budget">Mon budget est compatible avec la baisse de revenus</label>
                </li>
              </ul>
            </div>

            <div className="checklist-column">
              <h4>Documents à préparer</h4>
              <ul className="checklist">
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="releveCarriere"
                    checked={checklistItems.releveCarriere}
                    onChange={() => toggleChecklistItem('releveCarriere')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="releveCarriere">Relevé de carrière complet</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="avenant"
                    checked={checklistItems.avenant}
                    onChange={() => toggleChecklistItem('avenant')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="avenant">Avenant au contrat de travail signé</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="attestation"
                    checked={checklistItems.attestation}
                    onChange={() => toggleChecklistItem('attestation')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="attestation">Attestation employeur de temps de travail</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="bulletins"
                    checked={checklistItems.bulletins}
                    onChange={() => toggleChecklistItem('bulletins')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="bulletins">3 derniers bulletins de salaire</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="identite"
                    checked={checklistItems.identite}
                    onChange={() => toggleChecklistItem('identite')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="identite">Pièce d'identité et carte vitale</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="rib"
                    checked={checklistItems.rib}
                    onChange={() => toggleChecklistItem('rib')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="rib">RIB pour le versement de la pension</label>
                </li>
              </ul>
            </div>

            <div className="checklist-column">
              <h4>Après le démarrage</h4>
              <ul className="checklist">
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="versement"
                    checked={checklistItems.versement}
                    onChange={() => toggleChecklistItem('versement')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="versement">Vérifier le premier versement de pension</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="cotisations"
                    checked={checklistItems.cotisations}
                    onChange={() => toggleChecklistItem('cotisations')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="cotisations">Contrôler les cotisations sur bulletin de salaire</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="mutuelle"
                    checked={checklistItems.mutuelle}
                    onChange={() => toggleChecklistItem('mutuelle')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="mutuelle">Mettre à jour ma mutuelle si nécessaire</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="budgetReel"
                    checked={checklistItems.budgetReel}
                    onChange={() => toggleChecklistItem('budgetReel')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="budgetReel">Ajuster mon budget selon mes revenus réels</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="points"
                    checked={checklistItems.points}
                    onChange={() => toggleChecklistItem('points')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="points">Consulter mon relevé annuel de points</label>
                </li>
                <li className="checklist-item">
                  <input 
                    type="checkbox" 
                    id="planification"
                    checked={checklistItems.planification}
                    onChange={() => toggleChecklistItem('planification')}
                    className="checklist-checkbox"
                  />
                  <label htmlFor="planification">Planifier ma retraite définitive</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConseilsPage;