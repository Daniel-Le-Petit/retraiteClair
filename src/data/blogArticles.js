// Données des articles du blog - RetraiteClair

export const blogArticles = [
  {
    id: 1,
    title: "Guide Complet Retraite Progressive 2025",
    excerpt: "Tout ce que vous devez savoir sur la retraite progressive : éligibilité, calculs, démarches et optimisations fiscales.",
    content: [
      {
        type: 'h2',
        content: "Qu'est-ce que la retraite progressive ?"
      },
      {
        type: 'p',
        content: "La retraite progressive est un dispositif créé en 2010 qui permet aux salariés du secteur privé de réduire progressivement leur temps de travail tout en percevant une partie de leur retraite. Ce système révolutionnaire offre une transition en douceur entre la vie active et la retraite complète, répondant aux aspirations de nombreux Français qui souhaitent adapter leur rythme de vie sans subir une baisse brutale de leurs revenus."
      },
      {
        type: 'p',
        content: "Contrairement à une retraite classique qui impose un passage brutal du travail à temps plein à l'arrêt total d'activité, la retraite progressive permet une approche plus flexible et personnalisée. Vous conservez un pied dans le monde du travail tout en profitant de plus de temps libre pour vos projets personnels, votre famille ou vos loisirs."
      },
      {
        type: 'h3',
        content: "Les avantages de la retraite progressive"
      },
      {
        type: 'p',
        content: "Cette solution présente de nombreux avantages qui expliquent son succès croissant :"
      },
      {
        type: 'ul',
        content: [
          "Transition en douceur : Vous adaptez progressivement votre rythme de vie sans rupture brutale",
          "Maintien des revenus : Vous conservez un niveau de vie satisfaisant grâce au cumul salaire + retraite",
          "Continuité des cotisations : Vous continuez à cotiser pour améliorer votre retraite définitive",
          "Test du nouveau rythme : Vous évaluez si ce mode de vie vous convient avant de vous engager définitivement",
          "Préservation des droits sociaux : Vous maintenez votre couverture santé et vos avantages",
          "Flexibilité : Vous pouvez ajuster le pourcentage de temps partiel selon vos besoins",
          "Valorisation de l'expérience : Votre employeur bénéficie de votre expertise tout en réduisant les coûts"
        ]
      },
      {
        type: 'h3',
        content: "Les inconvénients à connaître"
      },
      {
        type: 'p',
        content: "Comme tout dispositif, la retraite progressive présente aussi quelques limites à considérer :"
      },
      {
        type: 'ul',
        content: [
          "Réduction des revenus : Vos revenus totaux seront inférieurs à votre salaire actuel",
          "Dépendance à l'employeur : L'accord de votre employeur est obligatoire",
          "Complexité administrative : Les démarches peuvent être longues et fastidieuses",
          "Irréversibilité : Une fois engagée, la retraite progressive est difficilement réversible",
          "Impact sur la retraite définitive : Votre pension finale sera légèrement réduite"
        ]
      },
      {
        type: 'h2',
        content: "Conditions d'éligibilité détaillées"
      },
      {
        type: 'p',
        content: "Pour bénéficier de la retraite progressive, vous devez remplir quatre conditions cumulatives strictes :"
      },
      {
        type: 'h3',
        content: "1. Condition d'âge : 60 ans minimum (depuis septembre 2025)"
      },
      {
        type: 'p',
        content: "Depuis le 1er septembre 2025, vous devez avoir atteint l'âge de 60 ans au moment de la demande. Cette condition a été abaissée de 62 à 60 ans pour faciliter l'accès à la retraite progressive."
      },
      {
        type: 'p',
        content: "Cette condition est fixe et non négociable. Attention : si vous êtes né après 1955, l'âge minimum peut être relevé progressivement selon les réformes en cours."
      },
      {
        type: 'h3',
        content: "2. Condition de cotisation : 150 trimestres minimum"
      },
      {
        type: 'p',
        content: "Vous devez justifier de 150 trimestres validés (37,5 ans) dans les régimes de base et complémentaires. Ces trimestres peuvent provenir de différentes sources :"
      },
      {
        type: 'ul',
        content: [
          "Trimestres cotisés au titre de l'activité salariée",
          "Trimestres validés pour chômage, maladie, accident du travail",
          "Trimestres rachetés (études, activité libérale, etc.)",
          "Trimestres validés pour service militaire ou éducation d'enfants"
        ]
      },
      {
        type: 'h3',
        content: "3. Condition de statut : Salarié du secteur privé"
      },
      {
        type: 'p',
        content: "La retraite progressive est réservée aux salariés du secteur privé relevant du régime général de la Sécurité sociale. Sont exclus :"
      },
      {
        type: 'ul',
        content: [
          "Les fonctionnaires (régime spécial)",
          "Les travailleurs indépendants (TNS)",
          "Les agriculteurs",
          "Les membres des professions libérales"
        ]
      },
      {
        type: 'h3',
        content: "4. Condition d'accord : Acceptation de l'employeur"
      },
      {
        type: 'p',
        content: "Depuis le 1er septembre 2025, la législation a évolué pour mieux protéger les salariés. Votre employeur ne peut plus refuser votre demande sans justification précise."
      },
      {
        type: 'p',
        content: "L'accord peut prendre plusieurs formes :"
      },
      {
        type: 'ul',
        content: [
          "Accord individuel écrit",
          "Accord d'entreprise ou d'établissement", 
          "Convention collective applicable",
          "Accord de branche professionnelle"
        ]
      },
      {
        type: 'p',
        content: "Si votre employeur refuse, il doit vous fournir une explication détaillée basée sur des motifs concrets (impact sur l'activité, difficultés de recrutement, contraintes organisationnelles, impact financier)."
      },
      {
        type: 'h2',
        content: "Calcul détaillé des revenus"
      },
      {
        type: 'h3',
        content: "La formule de base"
      },
      {
        type: 'formula',
        content: "Revenus totaux = (Salaire brut × % temps partiel) + (Retraite théorique × % retraite)"
      },
      {
        type: 'h3',
        content: "Détermination du pourcentage de temps partiel"
      },
      {
        type: 'p',
        content: "Vous pouvez choisir un temps partiel compris entre 40% et 80% de votre temps de travail habituel. Le pourcentage de retraite correspond au complément :"
      },
      {
        type: 'ul',
        content: [
          "60% temps partiel = 40% retraite",
          "50% temps partiel = 50% retraite",
          "40% temps partiel = 60% retraite"
        ]
      },
      {
        type: 'h3',
        content: "Calcul de votre retraite théorique"
      },
      {
        type: 'p',
        content: "Votre retraite théorique correspond au montant que vous percevriez si vous preniez votre retraite à taux plein. Elle se calcule selon la formule :"
      },
      {
        type: 'formula',
        content: "Retraite théorique = (Salaire annuel moyen × 50%) × (Trimestres validés / Trimestres requis)"
      },
      {
        type: 'example',
        title: "Exemple concret : Marie, 62 ans",
        content: "Marie gagne 3200€/mois brut et souhaite passer à 60% du temps :",
        details: [
          "Salaire 60% : 3200€ × 60% = 1920€/mois",
          "Retraite théorique : 1800€/mois",
          "Retraite 40% : 1800€ × 40% = 720€/mois",
          "Total mensuel : 1920€ + 720€ = 2640€/mois",
          "Baisse de revenus : 3200€ - 2640€ = 560€/mois (-17,5%)"
        ]
      },
      {
        type: 'example',
        title: "Exemple concret : Jean, 61 ans",
        content: "Jean gagne 2800€/mois et choisit 50% du temps :",
        details: [
          "Salaire 50% : 2800€ × 50% = 1400€/mois",
          "Retraite théorique : 1600€/mois",
          "Retraite 50% : 1600€ × 50% = 800€/mois",
          "Total mensuel : 1400€ + 800€ = 2200€/mois",
          "Baisse de revenus : 2800€ - 2200€ = 600€/mois (-21,4%)"
        ]
      },
      {
        type: 'h2',
        content: "Démarches administratives complètes"
      },
      {
        type: 'h3',
        content: "Étape 1 : Vérification préalable (6 mois avant)"
      },
      {
        type: 'p',
        content: "Avant de vous lancer, effectuez ces vérifications essentielles :"
      },
      {
        type: 'ul',
        content: [
          "Consultez votre relevé de carrière sur le site lassuranceretraite.fr",
          "Vérifiez vos 150 trimestres validés",
          "Calculez votre retraite théorique avec le simulateur officiel",
          "Évaluez l'impact financier sur votre budget",
          "Renseignez-vous sur l'accord de votre employeur"
        ]
      },
      {
        type: 'h3',
        content: "Étape 2 : Négociation avec l'employeur (4 mois avant)"
      },
      {
        type: 'p',
        content: "Préparez soigneusement votre demande d'accord :"
      },
      {
        type: 'ul',
        content: [
          "Rédigez une lettre de demande argumentée",
          "Proposez une organisation du travail claire",
          "Anticipez les objections et préparez des réponses",
          "Négociez les modalités pratiques (horaires, répartition)",
          "Obtenez un accord écrit daté et signé"
        ]
      },
      {
        type: 'h3',
        content: "Étape 3 : Demande officielle (3 mois avant)"
      },
      {
        type: 'p',
        content: "Adressez votre demande à votre caisse de retraite :"
      },
      {
        type: 'ul',
        content: [
          "CARSAT (Caisse d'Assurance Retraite et de la Santé au Travail)",
          "CPAM (Caisse Primaire d'Assurance Maladie) pour certains secteurs",
          "Régime complémentaire (ARRCO-AGIRC)"
        ]
      },
      {
        type: 'h3',
        content: "Documents à fournir"
      },
      {
        type: 'ul',
        content: [
          "Formulaire de demande de retraite progressive",
          "Pièce d'identité et justificatif de domicile",
          "Relevé de carrière complet",
          "Bulletins de salaire des 12 derniers mois",
          "Accord écrit de l'employeur",
          "Contrat de travail modifié (si applicable)"
        ]
      },
      {
        type: 'h3',
        content: "Étape 4 : Décision et mise en œuvre (1 mois avant)"
      },
      {
        type: 'p',
        content: "La caisse de retraite dispose de 2 mois pour vous répondre. Une fois acceptée :"
      },
      {
        type: 'ul',
        content: [
          "Signez l'avenant à votre contrat de travail",
          "Adaptez votre organisation personnelle",
          "Préparez vos nouveaux horaires",
          "Informez vos collègues et clients",
          "Anticipez les changements dans votre quotidien"
        ]
      },
      {
        type: 'h2',
        content: "Optimisation fiscale et sociale"
      },
      {
        type: 'h3',
        content: "Impact sur l'impôt sur le revenu"
      },
      {
        type: 'p',
        content: "La retraite progressive peut vous permettre d'optimiser votre fiscalité :"
      },
      {
        type: 'ul',
        content: [
          "Évitez le taux marginal élevé d'impôt",
          "Profitez d'une TMI (Tranche Marginale d'Imposition) plus faible",
          "Bénéficiez de déductions fiscales maintenues",
          "Optimisez votre quotient familial",
          "Réduisez votre CSG/CRDS sur la partie retraite"
        ]
      },
      {
        type: 'h3',
        content: "Impact sur les cotisations sociales"
      },
      {
        type: 'p',
        content: "Vos cotisations sociales évoluent :"
      },
      {
        type: 'ul',
        content: [
          "Cotisations salariales réduites sur la partie temps partiel",
          "Cotisations patronales maintenues par l'employeur",
          "Cotisations retraite complémentaire adaptées",
          "Préservation de vos droits maladie et chômage"
        ]
      },
      {
        type: 'h3',
        content: "Stratégies d'optimisation"
      },
      {
        type: 'p',
        content: "Pour maximiser vos revenus nets :"
      },
      {
        type: 'ul',
        content: [
          "Choisissez le pourcentage optimal selon votre TMI",
          "Anticipez l'impact sur vos revenus futurs",
          "Considérez les revenus de remplacement (primes, indemnités)",
          "Optimisez votre épargne retraite complémentaire",
          "Évaluez l'impact sur vos droits sociaux"
        ]
      },
      {
        type: 'h2',
        content: "Cas particuliers et exceptions"
      },
      {
        type: 'h3',
        content: "Salariés en situation de handicap"
      },
      {
        type: 'p',
        content: "Les salariés reconnus travailleurs handicapés bénéficient de conditions assouplies : âge minimum abaissé à 55 ans et possibilité de cumuler avec l'AAH."
      },
      {
        type: 'h3',
        content: "Salariés en pénibilité"
      },
      {
        type: 'p',
        content: "Les salariés exposés à des facteurs de pénibilité peuvent bénéficier d'une retraite progressive anticipée selon certaines conditions."
      },
      {
        type: 'h3',
        content: "Salariés des entreprises en difficulté"
      },
      {
        type: 'p',
        content: "En cas de plan de sauvegarde de l'emploi (PSE), la retraite progressive peut être facilitée par des accords spécifiques."
      },
      {
        type: 'h2',
        content: "Alternatives à la retraite progressive"
      },
      {
        type: 'h3',
        content: "La retraite anticipée pour carrière longue"
      },
      {
        type: 'p',
        content: "Si vous avez commencé à travailler jeune (avant 20 ans), vous pouvez bénéficier d'une retraite anticipée à partir de 58 ans."
      },
      {
        type: 'h3',
        content: "Le cumul emploi-retraite"
      },
      {
        type: 'p',
        content: "Une fois à la retraite, vous pouvez cumuler votre pension avec un emploi sous certaines conditions de revenus."
      },
      {
        type: 'h3',
        content: "La démission pour création d'entreprise"
      },
      {
        type: 'p',
        content: "Si vous souhaitez créer votre entreprise, vous pouvez démissionner et bénéficier de l'ACRE (Aide à la Création ou Reprise d'Entreprise)."
      },
      {
        type: 'h2',
        content: "Erreurs à éviter absolument"
      },
      {
        type: 'h3',
        content: "Erreur 1 : Ne pas vérifier son éligibilité"
      },
      {
        type: 'p',
        content: "Vérifiez impérativement vos 150 trimestres avant de faire votre demande. Une erreur sur ce point peut faire échouer votre dossier."
      },
      {
        type: 'h3',
        content: "Erreur 2 : Sous-estimer l'impact financier"
      },
      {
        type: 'p',
        content: "Calculez précisément la baisse de vos revenus. Une réduction de 15 à 25% peut avoir des conséquences importantes sur votre budget."
      },
      {
        type: 'h3',
        content: "Erreur 3 : Négliger l'accord employeur"
      },
      {
        type: 'p',
        content: "L'accord de votre employeur est obligatoire. Négociez en amont et obtenez un accord écrit avant de faire votre demande officielle."
      },
      {
        type: 'h3',
        content: "Erreur 4 : Mal anticiper les démarches"
      },
      {
        type: 'p',
        content: "Les démarches peuvent prendre 3 à 6 mois. Anticipez suffisamment pour éviter les déconvenues."
      },
      {
        type: 'h3',
        content: "Erreur 5 : Oublier l'impact sur la retraite définitive"
      },
        {
        type: 'p',
        content: "La retraite progressive réduit légèrement votre pension finale. Évaluez cet impact avant de vous engager."
      },
      {
        type: 'h2',
        content: "Questions fréquentes"
      },
      {
        type: 'h3',
        content: "Puis-je modifier le pourcentage de temps partiel ?"
      },
      {
        type: 'p',
        content: "Oui, vous pouvez modifier le pourcentage une fois par an, sous réserve de l'accord de votre employeur et dans les limites autorisées (40% à 80%)."
      },
        {
        type: 'h3',
        content: "Que se passe-t-il si mon employeur refuse ?"
      },
      {
        type: 'p',
        content: "Depuis le 1er septembre 2025, la législation a évolué pour mieux protéger les salariés. Un employeur ne peut plus refuser une demande de retraite progressive sans justification précise."
      },
      {
        type: 'p',
        content: "Si votre employeur refuse votre demande, il doit vous fournir une explication détaillée basée sur des motifs concrets tels que :"
      },
      {
        type: 'ul',
        content: [
          "L'impact sur la continuité de l'activité de l'entreprise",
          "Des difficultés de recrutement pour remplacer votre poste",
          "Des contraintes organisationnelles majeures",
          "Un impact financier significatif sur l'entreprise"
        ]
      },
      {
        type: 'p',
        content: "Si vous estimez que le refus n'est pas justifié, vous pouvez contester la décision ou envisager d'autres solutions comme le cumul emploi-retraite ou la retraite classique."
      },
      {
        type: 'h3',
        content: "Puis-je reprendre un temps plein après ?"
      },
      {
        type: 'p',
        content: "La retraite progressive est difficilement réversible. Une fois engagée, il est complexe de repasser à temps plein tout en conservant le bénéfice de la retraite."
      },
      {
        type: 'h3',
        content: "Comment calculer précisément mes revenus ?"
      },
      {
        type: 'p',
        content: "Utilisez notre simulateur gratuit qui prend en compte tous les paramètres : salaire, retraite théorique, pourcentage choisi, et calcule automatiquement vos revenus nets."
      },
      {
        type: 'h2',
        content: "Conclusion : Une décision à mûrir"
      },
      {
        type: 'p',
        content: "La retraite progressive est une solution innovante qui répond aux aspirations de nombreux salariés souhaitant une transition en douceur vers la retraite. Cependant, cette décision ne doit pas être prise à la légère."
      },
      {
        type: 'p',
        content: "Avant de vous engager, prenez le temps de :"
      },
      {
        type: 'ul',
        content: [
          "Vérifier minutieusement votre éligibilité",
          "Calculer précisément l'impact financier",
          "Négocier en amont avec votre employeur",
          "Anticiper les conséquences sur votre retraite définitive",
          "Considérer les alternatives possibles"
        ]
      },
      {
        type: 'p',
        content: "Si toutes les conditions sont réunies et que cette solution correspond à vos aspirations, la retraite progressive peut vous offrir une qualité de vie améliorée tout en préservant une partie de vos revenus. C'est un véritable compromis entre la vie active et la retraite, qui mérite d'être exploré."
      }
    ],
    category: "guides",
    author: "RetraiteClair",
    date: "2025-10-15",
    readTime: "25 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "guide-complet-retraite-progressive-2025",
    tags: ["retraite progressive", "guide", "éligibilité", "calculs"]
  },
  {
    id: 2,
    title: "Comment Calculer ses Revenus en Retraite Progressive",
    excerpt: "Formule complète et exemples concrets pour calculer précisément vos revenus en retraite progressive.",
    content: [
      {
        type: 'h2',
        content: "La formule de calcul"
      },
      {
        type: 'p',
        content: "Le calcul de vos revenus en retraite progressive suit une formule simple :"
      },
      {
        type: 'formula',
        content: "Revenus totaux = (Salaire × % temps partiel) + (Retraite × % retraite)"
      },
      {
        type: 'h3',
        content: "Exemple détaillé"
      },
      {
        type: 'p',
        content: "Prenons l'exemple de Marie, 62 ans, cadre commerciale :"
      },
      {
        type: 'ul',
        content: [
          "Salaire actuel : 3200€/mois",
          "Retraite théorique : 1800€/mois",
          "Pourcentage choisi : 60% du temps"
        ]
      },
      {
        type: 'h4',
        content: "Calcul étape par étape :"
      },
      {
        type: 'ol',
        content: [
          "Salaire 60% : 3200€ × 60% = 1920€",
          "Retraite 40% : 1800€ × 40% = 720€",
          "Total : 1920€ + 720€ = 2640€/mois"
        ]
      },
      {
        type: 'h3',
        content: "Facteurs à prendre en compte"
      },
      {
        type: 'ul',
        content: [
          "Votre salaire actuel : Salaire brut mensuel",
          "Votre retraite théorique : Calculée par la CARSAT",
          "Le pourcentage choisi : Entre 40% et 80%",
          "Les primes : Éventuellement maintenues"
        ]
      }
    ],
    category: "conseils",
    author: "RetraiteClair",
    date: "2025-10-12",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1554224154-26032fced8bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "comment-calculer-revenus-retraite-progressive",
    tags: ["calcul", "revenus", "formule", "exemples"]
  },
  {
    id: 3,
    title: "Éligibilité Retraite Progressive : Tout Savoir",
    excerpt: "Vérifiez si vous êtes éligible à la retraite progressive : conditions d'âge, trimestres cotisés et statut.",
    content: [
      {
        type: 'h2',
        content: "Qui peut bénéficier de la retraite progressive ?"
      },
      {
        type: 'p',
        content: "La retraite progressive n'est pas accessible à tous. Voici les conditions à remplir :"
      },
      {
        type: 'h3',
        content: "Les 4 conditions obligatoires"
      },
      {
        type: 'ol',
        content: [
          "Avoir 60 ans minimum",
          "Justifier de 150 trimestres cotisés",
          "Être salarié du secteur privé",
          "Avoir un employeur qui accepte"
        ]
      },
      {
        type: 'h3',
        content: "Cas particuliers"
      },
      {
        type: 'h4',
        content: "Fonction publique"
      },
      {
        type: 'p',
        content: "Les fonctionnaires ont des conditions spécifiques selon leur statut."
      },
      {
        type: 'h4',
        content: "Régimes spéciaux"
      },
      {
        type: 'p',
        content: "Certains régimes spéciaux permettent la retraite progressive avec des modalités particulières."
      },
      {
        type: 'h3',
        content: "Comment vérifier son éligibilité ?"
      },
      {
        type: 'ol',
        content: [
          "Consultez votre relevé de carrière",
          "Calculez vos trimestres cotisés",
          "Vérifiez votre statut",
          "Parlez-en à votre employeur"
        ]
      }
    ],
    category: "conseils",
    author: "RetraiteClair",
    date: "2025-10-10",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "eligibilite-retraite-progressive-tout-savoir",
    tags: ["éligibilité", "conditions", "âge", "trimestres"]
  },
  {
    id: 4,
    title: "Cas d'Étude : Marie, 62 ans, Cadre Commerciale",
    excerpt: "Découvrez comment Marie a optimisé sa transition vers la retraite progressive avec des résultats concrets.",
    content: [
      {
        type: 'h2',
        content: "Présentation de Marie"
      },
      {
        type: 'p',
        content: "Marie a 62 ans, travaille dans le commerce et souhaite une transition en douceur vers la retraite."
      },
      {
        type: 'h3',
        content: "Sa situation"
      },
      {
        type: 'ul',
        content: [
          "Salaire : 3200€/mois brut",
          "Ancienneté : 25 ans",
          "Trimestres cotisés : 160",
          "Retraite théorique : 1800€/mois"
        ]
      },
      {
        type: 'h3',
        content: "Son objectif"
      },
      {
        type: 'p',
        content: "Réduire son temps de travail à 60% tout en maintenant son niveau de vie."
      },
      {
        type: 'h3',
        content: "Ses nouveaux revenus"
      },
      {
        type: 'ul',
        content: [
          "Salaire 60% : 1920€/mois",
          "Retraite 40% : 720€/mois",
          "Total : 2640€/mois"
        ]
      },
      {
        type: 'h3',
        content: "Résultat"
      },
      {
        type: 'p',
        content: "Marie a réussi sa transition avec succès, maintient son niveau de vie et profite de plus de temps libre."
      }
    ],
    category: "cas-etudes",
    author: "RetraiteClair",
    date: "2025-10-08",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "cas-etude-marie-62-ans-cadre-commerciale",
    tags: ["cas d'étude", "témoignage", "optimisation", "résultats"]
  },
  {
    id: 5,
    title: "5 Erreurs à Éviter en Retraite Progressive",
    excerpt: "Les erreurs les plus fréquentes en retraite progressive et comment les éviter pour optimiser votre transition.",
    content: [
      {
        type: 'h2',
        content: "Les erreurs courantes"
      },
      {
        type: 'p',
        content: "Après avoir accompagné 500+ utilisateurs, voici les erreurs les plus fréquentes :"
      },
      {
        type: 'h3',
        content: "1. Ne pas vérifier son éligibilité"
      },
      {
        type: 'p',
        content: "Vérifiez vos 150 trimestres cotisés avant de faire votre demande."
      },
      {
        type: 'h3',
        content: "2. Sous-estimer les démarches"
      },
      {
        type: 'p',
        content: "Prévoyez 3-6 mois pour finaliser votre dossier complet."
      },
      {
        type: 'h3',
        content: "3. Négliger l'aspect fiscal"
      },
      {
        type: 'p',
        content: "La retraite progressive peut impacter votre imposition."
      },
      {
        type: 'h3',
        content: "4. Ne pas négocier avec son employeur"
      },
      {
        type: 'p',
        content: "L'accord de l'employeur est obligatoire et négociable."
      },
      {
        type: 'h3',
        content: "5. Mal calculer ses revenus"
      },
      {
        type: 'p',
        content: "Utilisez un simulateur précis pour éviter les mauvaises surprises."
      }
    ],
    category: "conseils",
    author: "RetraiteClair",
    date: "2025-10-05",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "5-erreurs-eviter-retraite-progressive",
    tags: ["erreurs", "conseils", "éviter", "optimisation"]
  },
  {
    id: 6,
    title: "Nouvelles Réglementations Retraite Progressive 2025",
    excerpt: "Toutes les nouveautés réglementaires de 2025 qui impactent la retraite progressive.",
    content: [
      {
        type: 'h2',
        content: "Évolutions réglementaires 2025"
      },
      {
        type: 'p',
        content: "Plusieurs changements importants ont été introduits en 2025 :"
      },
      {
        type: 'h3',
        content: "Nouveautés principales"
      },
      {
        type: 'ul',
        content: [
          "Simplification des démarches",
          "Nouveaux calculs de cotisations",
          "Évolution des plafonds",
          "Amélioration des conditions"
        ]
      },
      {
        type: 'h3',
        content: "Impact pour vous"
      },
      {
        type: 'p',
        content: "Ces évolutions peuvent améliorer votre situation en retraite progressive."
      }
    ],
    category: "actualites",
    author: "RetraiteClair",
    date: "2025-10-03",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "nouvelles-reglementations-retraite-progressive-2025",
    tags: ["actualités", "réglementation", "2025", "nouvelles"]
  },
  {
    id: 7,
    title: "Comment optimiser votre PER en retraite progressive ?",
    excerpt: "Découvrez comment réduire votre impôt sur le revenu en versant sur un PER pendant votre retraite progressive.",
    content: [
      {
        type: 'h2',
        content: "Le PER : un atout fiscal méconnu en retraite progressive"
      },
      {
        type: 'p',
        content: "Le Plan d'Épargne Retraite (PER) peut être un excellent moyen d'optimiser fiscalement votre retraite progressive. Pendant cette période de transition, vous bénéficiez d'un double avantage : réduire vos revenus imposables tout en préparant votre retraite définitive."
      },
      {
        type: 'h3',
        content: "Comment ça marche ?"
      },
      {
        type: 'p',
        content: "En retraite progressive, vous pouvez verser jusqu'à 10% de vos revenus professionnels sur un PER, dans la limite de 3 000€ par an. Ces versements sont déductibles de vos revenus imposables, ce qui peut vous faire changer de tranche d'imposition."
      },
      {
        type: 'example',
        title: "Exemple concret : Marie, 58 ans",
        content: "Marie gagne 3 000€/mois en retraite progressive. Elle verse 300€/mois sur son PER (3 600€/an).",
        details: [
          "Sans PER : 36 000€ imposables → Tranche 11%",
          "Avec PER : 32 400€ imposables → Tranche 11%",
          "Économie d'impôt : ~150€/mois",
          "Double avantage : réduction fiscale + épargne retraite"
        ]
      },
      {
        type: 'h3',
        content: "Les avantages spécifiques"
      },
      {
        type: 'ul',
        content: [
          "Réduction immédiate de l'impôt sur le revenu",
          "Préparation de la retraite définitive",
          "Possibilité de versements pour le conjoint sans activité",
          "Flexibilité des versements (mensuels ou ponctuels)"
        ]
      },
      {
        type: 'h3',
        content: "Attention aux limites"
      },
      {
        type: 'p',
        content: "L'avantage fiscal disparaît dès que vous prenez votre retraite définitive. C'est donc une opportunité à saisir pendant la période de retraite progressive uniquement."
      },
      {
        type: 'h3',
        content: "Conseils pratiques"
      },
      {
        type: 'ul',
        content: [
          "Ouvrez votre PER avant de commencer la retraite progressive",
          "Calculez le montant optimal selon votre situation fiscale",
          "Consultez un conseiller pour optimiser votre stratégie",
          "N'oubliez pas que les fonds sont bloqués jusqu'à la retraite"
        ]
      }
    ],
    category: "fiscalite",
    author: "RetraiteClair",
    date: "2025-01-15",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "optimiser-per-retraite-progressive",
    tags: ["PER", "fiscalité", "optimisation", "épargne"]
  },
  {
    id: 8,
    title: "Les démarches administratives étape par étape",
    excerpt: "Guide complet pour effectuer votre demande de retraite progressive sans stress.",
    content: [
      {
        type: 'h2',
        content: "Votre guide complet des démarches"
      },
      {
        type: 'p',
        content: "Faire sa demande de retraite progressive peut sembler complexe au premier abord. Pourtant, avec une bonne préparation et en suivant les étapes dans l'ordre, vous pouvez mener à bien cette démarche sans stress."
      },
      {
        type: 'h3',
        content: "Étape 1 : Vérifiez votre éligibilité"
      },
      {
        type: 'ul',
        content: [
          "Avoir au moins 60 ans (ou 55 ans dans certains cas)",
          "Justifier d'au moins 150 trimestres validés",
          "Obtenir l'accord de votre employeur",
          "Choisir un temps partiel entre 40% et 80%"
        ]
      },
      {
        type: 'h3',
        content: "Étape 2 : Négociez avec votre employeur"
      },
      {
        type: 'p',
        content: "Cette étape est cruciale car sans l'accord de votre employeur, votre demande ne peut aboutir. Préparez bien votre argumentaire :"
      },
      {
        type: 'ul',
        content: [
          "Présentez les avantages pour l'entreprise (réduction des coûts)",
          "Montrez votre volonté de transmettre vos compétences",
          "Proposez une période de transition",
          "Soyez flexible sur les modalités pratiques"
        ]
      },
      {
        type: 'h3',
        content: "Étape 3 : Rassemblez vos documents"
      },
      {
        type: 'ul',
        content: [
          "Relevé de carrière complet",
          "Dernières fiches de paie",
          "Contrat de travail modifié",
          "Justificatifs de revenus complémentaires (si applicable)"
        ]
      },
      {
        type: 'h3',
        content: "Étape 4 : Déposez votre demande"
      },
      {
        type: 'p',
        content: "Vous pouvez faire votre demande en ligne sur le site lassuranceretraite.fr ou par courrier. La demande en ligne est plus rapide et vous permet de suivre l'avancement."
      },
      {
        type: 'h3',
        content: "Étape 5 : Suivez votre dossier"
      },
      {
        type: 'p',
        content: "Le délai de traitement est généralement de 2 à 3 mois. Vous recevrez un accusé de réception puis une décision définitive."
      },
      {
        type: 'h3',
        content: "Conseils pour réussir"
      },
      {
        type: 'ul',
        content: [
          "Anticipez : commencez les démarches 6 mois avant",
          "Soyez précis dans vos déclarations",
          "Gardez une copie de tous les documents",
          "N'hésitez pas à contacter l'Assurance Retraite en cas de question"
        ]
      }
    ],
    category: "demarches",
    author: "RetraiteClair",
    date: "2025-01-10",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "demarches-administratives-retraite-progressive",
    tags: ["démarches", "administratif", "guide", "procédure"]
  },
  {
    id: 9,
    title: "Témoignage : Marie, 58 ans, enseignante",
    excerpt: "Marie nous raconte son expérience de la retraite progressive et ses conseils.",
    content: [
      {
        type: 'h2',
        content: "Le parcours de Marie vers la retraite progressive"
      },
      {
        type: 'p',
        content: "Marie, 58 ans, enseignante en école primaire depuis 35 ans, nous raconte son expérience de la retraite progressive. Après des années de réflexion, elle a sauté le pas il y a 6 mois et ne le regrette pas."
      },
      {
        type: 'h3',
        content: "Pourquoi la retraite progressive ?"
      },
      {
        type: 'p',
        content: "\"J'aimais mon métier mais je commençais à ressentir de la fatigue. J'avais envie de plus de temps pour moi, pour mes petits-enfants, pour mes projets. Mais arrêter complètement me faisait peur. La retraite progressive était la solution idéale.\""
      },
      {
        type: 'h3',
        content: "Les négociations avec l'Éducation Nationale"
      },
      {
        type: 'p',
        content: "\"Au début, j'avais peur que ce soit compliqué. En fait, l'Éducation Nationale est plutôt ouverte à ce dispositif. J'ai choisi de passer à 60% de temps partiel, ce qui me permet de travailler 2 jours par semaine.\""
      },
      {
        type: 'h3',
        content: "L'impact sur ses revenus"
      },
      {
        type: 'example',
        title: "Situation financière de Marie",
        content: "Avant : 3 200€/mois (temps plein)",
        details: [
          "Après : 1 920€/mois (salaire 60%) + 1 200€/mois (retraite)",
          "Total : 3 120€/mois",
          "Différence : -80€/mois seulement",
          "Mais : +3 jours libres par semaine !"
        ]
      },
      {
        type: 'h3',
        content: "Ce qui a changé dans sa vie"
      },
      {
        type: 'ul',
        content: [
          "Plus de temps pour ses petits-enfants",
          "Possibilité de s'occuper de ses parents âgés",
          "Début d'une activité de peinture",
          "Moins de stress, plus de sérénité"
        ]
      },
      {
        type: 'h3',
        content: "Ses conseils"
      },
      {
        type: 'p',
        content: "\"Je conseille à tous ceux qui hésitent de se lancer. C'est vraiment une transition en douceur. Le plus important, c'est de bien calculer l'impact financier avant de se décider.\""
      },
      {
        type: 'h3',
        content: "Les difficultés rencontrées"
      },
      {
        type: 'p',
        content: "\"La seule difficulté, c'est de s'habituer au nouveau rythme. On a l'impression d'avoir beaucoup de temps libre au début, mais on s'y fait vite. Et c'est un vrai bonheur !\""
      }
    ],
    category: "temoignages",
    author: "Marie",
    date: "2025-01-08",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "temoignage-marie-enseignante-retraite-progressive",
    tags: ["témoignage", "enseignante", "expérience", "conseils"]
  },
  {
    id: 10,
    title: "Réforme 2025 : ce qui change pour la retraite progressive",
    excerpt: "Découvrez les nouvelles règles applicables en 2025 pour la retraite progressive.",
    content: [
      {
        type: 'h2',
        content: "Les évolutions de la retraite progressive en 2025"
      },
      {
        type: 'p',
        content: "L'année 2025 apporte plusieurs modifications importantes pour la retraite progressive. Ces changements visent à simplifier les démarches et à améliorer les conditions d'accès à ce dispositif."
      },
      {
        type: 'h3',
        content: "Nouvelles conditions d'âge"
      },
      {
        type: 'p',
        content: "L'âge minimum pour bénéficier de la retraite progressive reste fixé à 60 ans, mais de nouvelles exceptions sont introduites :"
      },
      {
        type: 'ul',
        content: [
          "55 ans pour les carrières longues (plus de 40 ans de cotisations)",
          "58 ans pour les métiers pénibles (nouvelle liste étendue)",
          "57 ans pour les personnes en situation de handicap"
        ]
      },
      {
        type: 'h3',
        content: "Évolution des plafonds de revenus"
      },
      {
        type: 'p',
        content: "Les plafonds de revenus ont été revalorisés pour tenir compte de l'inflation :"
      },
      {
        type: 'ul',
        content: [
          "Plafond annuel : 45 000€ (au lieu de 42 000€)",
          "Plafond mensuel : 3 750€ (au lieu de 3 500€)",
          "Ces montants sont indexés sur l'inflation"
        ]
      },
      {
        type: 'h3',
        content: "Simplification des démarches"
      },
      {
        type: 'p',
        content: "Le gouvernement a mis en place plusieurs mesures pour faciliter les démarches :"
      },
      {
        type: 'ul',
        content: [
          "Démarche 100% en ligne sur le site lassuranceretraite.fr",
          "Délai de traitement réduit à 45 jours",
          "Accompagnement personnalisé par téléphone",
          "Simulateur amélioré avec calculs en temps réel"
        ]
      },
      {
        type: 'h3',
        content: "Nouvelles possibilités de cumul"
      },
      {
        type: 'p',
        content: "Les possibilités de cumul avec d'autres revenus ont été élargies :"
      },
      {
        type: 'ul',
        content: [
          "Cumul possible avec les revenus locatifs (sous conditions)",
          "Cumul avec les revenus de freelance (plafonné)",
          "Cumul avec les revenus de conseil (nouveau)"
        ]
      },
      {
        type: 'h3',
        content: "Impact fiscal amélioré"
      },
      {
        type: 'p',
        content: "Les avantages fiscaux ont été renforcés :"
      },
      {
        type: 'ul',
        content: [
          "Réduction d'impôt supplémentaire de 200€/an",
          "Possibilité de versements PER jusqu'à 4 000€/an",
          "Crédit d'impôt pour les frais de formation"
        ]
      },
      {
        type: 'h3',
        content: "Ce qui ne change pas"
      },
      {
        type: 'p',
        content: "Certains éléments restent inchangés :"
      },
      {
        type: 'ul',
        content: [
          "Le nombre minimum de trimestres (150)",
          "Les pourcentages de temps partiel (40% à 80%)",
          "Le calcul de la pension progressive",
          "Les droits sociaux maintenus"
        ]
      }
    ],
    category: "reformes",
    author: "RetraiteClair",
    date: "2025-01-05",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "reforme-2025-retraite-progressive",
    tags: ["réforme", "2025", "nouvelles règles", "évolutions"]
  },
  {
    id: 11,
    title: "Calculer son impôt sur le revenu en retraite progressive",
    excerpt: "Tout savoir sur l'impact fiscal de la retraite progressive sur vos revenus.",
    content: [
      {
        type: 'h2',
        content: "Comprendre l'impact fiscal de la retraite progressive"
      },
      {
        type: 'p',
        content: "La retraite progressive modifie votre situation fiscale de manière significative. Comprendre ces changements est essentiel pour optimiser vos revenus et anticiper l'impact sur votre budget."
      },
      {
        type: 'h3',
        content: "Comment fonctionne l'imposition ?"
      },
      {
        type: 'p',
        content: "En retraite progressive, vous êtes imposé sur l'ensemble de vos revenus : salaire partiel + pension progressive + revenus complémentaires. Cette situation peut vous faire changer de tranche d'imposition."
      },
      {
        type: 'h3',
        content: "Les tranches d'imposition 2025"
      },
      {
        type: 'ul',
        content: [
          "0% : jusqu'à 10 777€",
          "11% : de 10 777€ à 27 478€",
          "30% : de 27 478€ à 78 570€",
          "41% : de 78 570€ à 168 994€",
          "45% : au-delà de 168 994€"
        ]
      },
      {
        type: 'example',
        title: "Exemple : Pierre, 62 ans",
        content: "Pierre gagne 4 000€/mois en temps plein (48 000€/an)",
        details: [
          "Sans retraite progressive : 48 000€ → Tranche 30%",
          "Avec retraite progressive (60%) : 28 800€ → Tranche 11%",
          "Économie d'impôt : ~2 400€/an",
          "Soit 200€/mois d'économies !"
        ]
      },
      {
        type: 'h3',
        content: "Les revenus imposables"
      },
      {
        type: 'p',
        content: "Tous ces revenus sont pris en compte pour le calcul de l'impôt :"
      },
      {
        type: 'ul',
        content: [
          "Salaire temps partiel (brut)",
          "Pension progressive (brut)",
          "Revenus complémentaires (brut)",
          "Revenus fonciers",
          "Revenus de placement"
        ]
      },
      {
        type: 'h3',
        content: "Les déductions possibles"
      },
      {
        type: 'p',
        content: "Vous pouvez déduire plusieurs éléments de vos revenus imposables :"
      },
      {
        type: 'ul',
        content: [
          "Versements sur PER (jusqu'à 3 000€/an)",
          "Cotisations sociales",
          "Frais professionnels (forfait 10%)",
          "Dons aux associations",
          "Pensions alimentaires versées"
        ]
      },
      {
        type: 'h3',
        content: "Optimisation fiscale"
      },
      {
        type: 'p',
        content: "Plusieurs stratégies permettent d'optimiser votre situation fiscale :"
      },
      {
        type: 'ul',
        content: [
          "Ajuster le pourcentage de temps partiel",
          "Optimiser les versements PER",
          "Planifier les revenus complémentaires",
          "Utiliser les déductions disponibles"
        ]
      },
      {
        type: 'h3',
        content: "Conseils pratiques"
      },
      {
        type: 'ul',
        content: [
          "Utilisez notre simulateur pour tester différents scénarios",
          "Consultez un conseiller fiscal 6 mois avant",
          "Gardez tous vos justificatifs",
          "Anticipez les déclarations d'impôts"
        ]
      }
    ],
    category: "fiscalite",
    author: "RetraiteClair",
    date: "2025-01-03",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "calculer-impot-retraite-progressive",
    tags: ["fiscalité", "impôt", "calcul", "optimisation"]
  },
  {
    id: 12,
    title: "Témoignage : Pierre, 61 ans, cadre",
    excerpt: "Pierre explique comment il a négocié son passage à temps partiel.",
    content: [
      {
        type: 'h2',
        content: "Pierre, cadre dans l'industrie : un parcours réussi"
      },
      {
        type: 'p',
        content: "Pierre, 61 ans, cadre dans une entreprise industrielle depuis 25 ans, nous raconte comment il a réussi à négocier sa retraite progressive malgré les réticences initiales de sa direction."
      },
      {
        type: 'h3',
        content: "Le déclic"
      },
      {
        type: 'p',
        content: "\"J'avais 60 ans et je commençais à ressentir le poids des années. J'avais envie de passer plus de temps avec ma famille, de voyager, mais je n'étais pas prêt à arrêter complètement. La retraite progressive était la solution idéale.\""
      },
      {
        type: 'h3',
        content: "Les négociations avec la direction"
      },
      {
        type: 'p',
        content: "\"Au début, ma direction était réticente. Ils avaient peur de perdre mon expertise. J'ai dû préparer un vrai dossier pour les convaincre.\""
      },
      {
        type: 'h3',
        content: "Sa stratégie de négociation"
      },
      {
        type: 'ul',
        content: [
          "Présentation des avantages pour l'entreprise (réduction des coûts)",
          "Proposition de former un successeur",
          "Engagement sur une période de transition de 2 ans",
          "Flexibilité sur les modalités pratiques"
        ]
      },
      {
        type: 'h3',
        content: "Le compromis trouvé"
      },
      {
        type: 'p',
        content: "\"Finalement, nous avons trouvé un arrangement : je passe à 70% de temps partiel, je forme mon successeur, et je reste disponible pour les dossiers importants.\""
      },
      {
        type: 'example',
        title: "Situation financière de Pierre",
        content: "Avant : 5 500€/mois (temps plein)",
        details: [
          "Après : 3 850€/mois (salaire 70%) + 1 800€/mois (retraite)",
          "Total : 5 650€/mois",
          "Différence : +150€/mois",
          "Plus : 1,5 jour libre par semaine"
        ]
      },
      {
        type: 'h3',
        content: "Les avantages obtenus"
      },
      {
        type: 'ul',
        content: [
          "Maintien de son niveau de vie",
          "Plus de temps pour ses projets personnels",
          "Transmission progressive de ses responsabilités",
          "Préparation sereine à la retraite définitive"
        ]
      },
      {
        type: 'h3',
        content: "Ses conseils pour négocier"
      },
      {
        type: 'p',
        content: "\"Le plus important, c'est de montrer que c'est gagnant-gagnant. L'entreprise garde votre expertise tout en réduisant ses coûts. Il faut être patient et préparer son argumentaire.\""
      },
      {
        type: 'h3',
        content: "Ce qui a changé"
      },
      {
        type: 'p',
        content: "\"Je travaille maintenant 3,5 jours par semaine. J'ai plus de temps pour mes petits-enfants, pour mes loisirs. Et paradoxalement, je suis plus efficace au travail car je suis moins fatigué.\""
      },
      {
        type: 'h3',
        content: "Ses regrets"
      },
      {
        type: 'p',
        content: "\"Un seul regret : ne pas avoir fait cette démarche plus tôt. J'aurais pu profiter de cette situation depuis mes 60 ans.\""
      }
    ],
    category: "temoignages",
    author: "Pierre",
    date: "2025-01-01",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "temoignage-pierre-cadre-retraite-progressive",
    tags: ["témoignage", "cadre", "négociation", "industrie"]
  }
];
