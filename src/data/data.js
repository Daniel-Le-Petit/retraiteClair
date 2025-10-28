// Données centralisées pour RetraiteClair
import { blogArticles } from './blogArticles.js';

// === FAQ CENTRALISÉES ===
export const faqs = [
  {
    id: 1,
    question: "Qu'est-ce que la retraite progressive ?",
    answer: "La retraite progressive permet de cumuler une partie de votre pension de retraite avec une activité professionnelle réduite. Vous pouvez ainsi continuer à travailler tout en percevant une partie de vos droits à la retraite."
  },
  {
    id: 2,
    question: "Comment calculer l'impact fiscal ?",
    answer: "L'impact fiscal, c'est simple : quand vous réduisez vos revenus en retraite progressive, vous pouvez passer d'une tranche d'imposition élevée (30%) à une tranche plus basse (11%). Par exemple, si vous gagnez 4 500€/mois et passez à 60% de temps partiel, vous pouvez économiser jusqu'à 200€/mois d'impôts ! Notre simulateur calcule automatiquement cette économie pour vous."
  },
  {
    id: 3,
    question: "Puis-je utiliser le simulateur gratuitement ?",
    answer: "Oui, tous nos simulateurs sont entièrement gratuits. Vous pouvez faire autant de simulations que vous le souhaitez sans aucune limitation."
  },
  {
    id: 4,
    question: "Suis-je éligible à la retraite progressive ?",
    answer: "Vous devez avoir au moins 60 ans (ou 55 ans dans certains cas), justifier d'au moins 150 trimestres validés, et obtenir l'accord de votre employeur pour un temps partiel entre 40% et 80%."
  },
  {
    id: 5,
    question: "Combien vais-je toucher ?",
    answer: "Vos revenus dépendent de votre salaire partiel, de votre pension calculée selon vos trimestres validés, et du pourcentage d'activité choisi. Utilisez notre simulateur pour une estimation précise."
  },
  {
    id: 6,
    question: "Puis-je ajuster mon temps partiel ?",
    answer: "Oui, vous pouvez modifier votre temps partiel, mais cela nécessite un nouvel accord avec votre employeur et une nouvelle demande à l'Assurance Retraite."
  },
  {
    id: 7,
    question: "Comment faire ma demande ?",
    answer: "Vous devez faire votre demande 4 mois avant la date souhaitée. Rassemblez vos documents (relevé de carrière, accord employeur) et contactez l'Assurance Retraite."
  },
  {
    id: 8,
    question: "La retraite progressive impacte-t-elle ma pension finale ?",
    answer: "Non, la retraite progressive n'affecte pas le montant de votre pension à taux plein. Elle vous permet simplement de la percevoir partiellement pendant votre activité."
  }
];

// === CHECKLIST ===
export const checklist = [
  {
    id: 1,
    text: "J'ai au moins 60 ans (ou 55 ans dans certains cas particuliers)",
    checked: false
  },
  {
    id: 2,
    text: "J'ai cotisé au moins 150 trimestres",
    checked: false
  },
  {
    id: 3,
    text: "Mon employeur est d'accord pour un temps partiel",
    checked: false
  },
  {
    id: 4,
    text: "Je souhaite travailler entre 40% et 80% du temps plein",
    checked: false
  },
  {
    id: 5,
    text: "J'ai consulté mon relevé de carrière",
    checked: false
  },
  {
    id: 6,
    text: "J'ai estimé mes revenus avec notre simulateur",
    checked: false
  },
  {
    id: 7,
    text: "Je suis prêt à faire ma demande 4 mois à l'avance",
    checked: false
  }
];

// === RESSOURCES OFFICIELLES ===
export const resources = [
  {
    id: 1,
    title: "Site officiel Assurance Retraite",
    url: "https://www.lassuranceretraite.fr",
    description: "Informations officielles sur la retraite progressive"
  },
  {
    id: 2,
    title: "Simulateur M@rel",
    url: "https://www.lassuranceretraite.fr",
    description: "Simulateur officiel de l'Assurance Retraite"
  },
  {
    id: 3,
    title: "Service Public - Retraite progressive",
    url: "https://www.service-public.fr",
    description: "Informations administratives sur le dispositif"
  },
  {
    id: 4,
    title: "Code de la sécurité sociale",
    url: "https://www.legifrance.gouv.fr",
    description: "Textes réglementaires officiels"
  }
];

// === ARTICLES DE BLOG ===
// Les articles sont importés en haut du fichier
export { blogArticles };

// === CATÉGORIES DE BLOG ===
export const blogCategories = [
  {
    id: 'guides',
    name: 'Guides',
    description: 'Guides complets et tutoriels',
    color: '#0f766e'
  },
  {
    id: 'conseils',
    name: 'Conseils',
    description: 'Conseils pratiques et astuces',
    color: '#134e4a'
  },
  {
    id: 'cas-etudes',
    name: 'Cas d\'études',
    description: 'Exemples concrets et analyses',
    color: '#2563eb'
  },
  {
    id: 'actualites',
    name: 'Actualités',
    description: 'Nouvelles et évolutions réglementaires',
    color: '#1d4ed8'
  },
  {
    id: 'fiscalite',
    name: 'Fiscalité',
    description: 'Optimisation fiscale et calculs d\'impôts',
    color: '#1e40af'
  },
  {
    id: 'demarches',
    name: 'Démarches',
    description: 'Procédures administratives et documents',
    color: '#059669'
  },
  {
    id: 'temoignages',
    name: 'Témoignages',
    description: 'Expériences et retours d\'utilisateurs',
    color: '#10b981'
  },
  {
    id: 'reformes',
    name: 'Réformes',
    description: 'Évolutions réglementaires et actualités',
    color: '#374151'
  }
];

// === DONNÉES POUR LES SIMULATEURS ===
export const simulationModes = [
  {
    id: 'simplifie',
    name: 'Mode simplifié',
    description: 'Calcul rapide avec les informations essentielles',
    fields: ['salaireBrut', 'tempsPartiel', 'age']
  },
  {
    id: 'avance',
    name: 'Mode avancé',
    description: 'Calcul détaillé avec tous les paramètres',
    fields: ['salaireBrut', 'tempsPartiel', 'age', 'trimestres', 'sam', 'revenusComplementaires']
  }
];

// === CONTENU POUR LA PAGE CONTACT ===
export const aboutContent = {
  title: "Qui sommes-nous ?",
  content: `Après 30 ans dans le transport aérien, j'ai créé RetraiteClair pour simplifier la retraite progressive. 

Face à la complexité des démarches et des calculs, j'ai développé des outils clairs et accessibles pour vous accompagner dans cette transition importante.

RetraiteClair, c'est l'expertise d'un professionnel qui a vécu les mêmes interrogations que vous, avec la volonté de rendre cette étape de vie plus sereine.`,
  author: "L'équipe RetraiteClair"
};

export const contactReasons = [
  {
    icon: "",
    title: "Questions sur le simulateur",
    description: "Besoin d'aide pour utiliser nos outils de calcul"
  },
  {
    icon: "",
    title: "Suggestions d'amélioration",
    description: "Proposer des fonctionnalités ou améliorations"
  },
  {
    icon: "",
    title: "Questions générales",
    description: "Informations sur la retraite progressive"
  },
  {
    icon: "",
    title: "Signaler un problème",
    description: "Nous aider à améliorer le site"
  }
];

// === DONNÉES EXISTANTES (pour compatibilité) ===
export const whyChooseFeatures = [
  {
    id: 1,
    title: "Calcul fiscal précis et transparent",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Calcule ton impôt sur le revenu avant et après la retraite progressive avec précision, en tenant compte de tous les paramètres fiscaux.",
    hasReadMore: false
  },
  {
    id: 2,
    title: "Simulation en 2 minutes chrono",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Fini les formulaires compliqués ! Notre simulateur te guide étape par étape pour obtenir tes résultats en moins de 2 minutes.",
    hasReadMore: false
  },
  {
    id: 3,
    title: "Conseils sur mesure pour votre situation",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Reçois des recommandations adaptées à ta situation pour optimiser ta stratégie de retraite progressive.",
    hasReadMore: true
  },
  {
    id: 4,
    title: "Comparaison détaillée des revenus",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Visualise clairement l'impact financier de la retraite progressive sur tes revenus nets et ton niveau de vie.",
    hasReadMore: true
  }
];

export const testimonials = [
  {
    id: 1,
    text: "Enfin un simulateur qui me donne des résultats clairs ! J'ai pu voir exactement combien je gagnerais avec la retraite progressive.",
    author: "Marie, 58 ans, enseignante"
  },
  {
    id: 2,
    text: "L'interface est tellement intuitive que j'ai pu faire ma simulation en quelques clics. Les conseils sont vraiment pertinents.",
    author: "Pierre, 61 ans, cadre"
  }
];