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
  }
];
