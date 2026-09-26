// Contenu du blog/guides — articles de fond écrits une bonne fois pour
// toutes ici (pas de CMS externe pour l'instant : le volume reste gérable
// à la main, et ça évite une dépendance supplémentaire pour un site qui n'a
// pas besoin d'être mis à jour par un non-développeur).
export type Guide = {
  slug: string;
  titre: string;
  eyebrow: string;
  description: string; // meta description + accroche affichée sur la liste
  datePublication: string; // ISO, sert au schema.org et à l'affichage
  sections: { titre?: string; paragraphes: string[] }[];
  liensUtiles: { href: string; label: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: 'demarrer-aquarium-eau-douce',
    titre: "Comment démarrer un aquarium d'eau douce : le guide complet pour débutants",
    eyebrow: 'Débuter',
    description:
      "Taille du bac, matériel indispensable, cyclage et premiers poissons : tout ce qu'il faut savoir avant de se lancer dans l'aquariophilie d'eau douce.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Choisir la taille de son aquarium',
        paragraphes: [
          "Contrairement à une idée reçue, un petit aquarium est plus difficile à équilibrer qu'un grand : les paramètres de l'eau (température, pH, taux de déchets) y varient beaucoup plus vite. Pour un premier bac, mieux vaut viser au minimum 54 à 60 litres plutôt qu'un petit bac ou un bocal, qui laissent très peu de marge d'erreur.",
        ],
      },
      {
        titre: 'Le matériel indispensable',
        paragraphes: [
          "Un filtre adapté au volume du bac, un chauffage (sauf pour un bac dédié à des espèces d'eau froide), un éclairage, un substrat et un thermomètre forment la base. Un kit de test d'eau (ammoniac, nitrites, nitrates, pH) est également indispensable pour suivre l'évolution du bac, en particulier pendant les premières semaines.",
        ],
      },
      {
        titre: "Le cyclage : l'étape qu'on ne doit jamais sauter",
        paragraphes: [
          "Avant d'introduire le moindre poisson, l'aquarium doit être « cyclé » : c'est-à-dire qu'une population de bactéries bénéfiques doit s'être installée dans le filtre pour transformer les déchets toxiques en substances moins nocives. C'est l'étape la plus souvent négligée par les débutants, et la première cause de mortalité en aquarium neuf.",
        ],
      },
      {
        titre: 'Choisir ses premiers poissons',
        paragraphes: [
          "Une fois le bac cyclé, mieux vaut introduire les poissons progressivement, en commençant par des espèces robustes et adaptées aux débutants, plutôt que de peupler l'aquarium d'un coup.",
        ],
      },
      {
        titre: 'Les erreurs classiques à éviter',
        paragraphes: [
          "Surpeupler l'aquarium dès le départ, introduire des poissons avant la fin du cyclage, suralimenter (la cause la plus fréquente de pics d'ammoniac) et négliger les tests d'eau réguliers sont les erreurs les plus courantes chez les débutants — et les plus faciles à éviter avec un peu de patience.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote en détail' },
      { href: '/guides/choisir-son-premier-poisson', label: 'Quels poissons choisir pour débuter' },
      { href: '/categorie/cuves', label: 'Voir les aquariums en vente' },
      { href: '/biotope/eau-douce', label: "Toutes les annonces d'eau douce" },
    ],
  },
  {
    slug: 'cycle-de-lazote-aquarium',
    titre: "Le cycle de l'azote en aquariophilie : pourquoi c'est essentiel",
    eyebrow: 'Comprendre',
    description:
      "Ammoniac, nitrites, nitrates : comprendre le cycle de l'azote pour éviter la première cause de mortalité des poissons en aquarium neuf.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: "Pourquoi le cycle de l'azote est vital",
        paragraphes: [
          "Les déjections des poissons et les restes de nourriture se décomposent en ammoniac, une substance toxique même à faible dose. Dans un aquarium équilibré, des bactéries installées dans le filtre et le substrat transforment cet ammoniac en nitrites — également toxiques — puis en nitrates, beaucoup moins nocifs et éliminés par les changements d'eau réguliers.",
        ],
      },
      {
        titre: 'Combien de temps dure un cyclage',
        paragraphes: [
          "Il faut généralement compter 4 à 6 semaines pour qu'une population bactérienne suffisante s'installe dans un aquarium neuf. Ce délai varie selon la température, le type de filtration et la source d'ammoniac utilisée pour amorcer le cycle.",
        ],
      },
      {
        titre: "Comment cycler son bac avant d'introduire des poissons",
        paragraphes: [
          "La méthode la plus recommandée aujourd'hui est le « cyclage sans poisson » : on ajoute une source d'ammoniac pur dans l'eau et on suit sa transformation progressive en nitrites puis en nitrates à l'aide d'un kit de test, jusqu'à ce que l'ammoniac et les nitrites retombent à zéro en moins de 24h après un ajout.",
        ],
      },
      {
        titre: "Les signes d'un bac non cyclé",
        paragraphes: [
          "Une eau trouble, des poissons qui restent près de la surface à respirer rapidement, ou un pic soudain d'ammoniac ou de nitrites au test sont des signes qu'un aquarium n'est pas encore stabilisé — la réaction à avoir est un changement d'eau partiel immédiat, jamais une suralimentation ou un ajout de poissons supplémentaires.",
        ],
      },
      {
        titre: 'Entretenir le cycle une fois établi',
        paragraphes: [
          "Une fois le bac cyclé, des changements d'eau partiels réguliers (10 à 20 % par semaine en général) suffisent à maintenir l'équilibre. Il faut en revanche éviter de nettoyer excessivement les masses filtrantes à l'eau du robinet, ce qui détruirait une partie des bactéries bénéfiques : un rinçage dans l'eau de l'aquarium prélevée lors d'un changement d'eau est suffisant.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Retour au guide de démarrage' },
      { href: '/categorie/materiel', label: "Voir le matériel (filtres, testeurs d'eau...)" },
    ],
  },
  {
    slug: 'choisir-son-premier-poisson',
    titre: 'Quels poissons choisir pour un premier aquarium ?',
    eyebrow: 'Débuter',
    description:
      "Les espèces les plus adaptées aux débutants en eau douce, et celles qu'il vaut mieux éviter au départ.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Les critères pour bien choisir',
        paragraphes: [
          "Avant de choisir une espèce, il faut regarder sa taille adulte (souvent bien supérieure à la taille en animalerie), son caractère (paisible ou territorial), ses besoins spécifiques en eau, et si elle doit être maintenue en groupe — beaucoup de poissons d'eau douce sont des espèces de banc qui souffrent d'être maintenues seules.",
        ],
      },
      {
        titre: 'De bons poissons pour débuter',
        paragraphes: [
          "Le Guppy et le Platy sont robustes et tolèrent de petites variations de paramètres. Les Corydoras, poissons de fond paisibles à maintenir en groupe, et l'Ancistrus, efficace contre les algues, complètent bien un bac communautaire. Le Danio zébré est également une valeur sûre, actif et résistant.",
        ],
      },
      {
        titre: 'Des poissons à éviter en tant que débutant',
        paragraphes: [
          "Le Combattant (Betta) est intéressant mais territorial : deux mâles ne peuvent jamais cohabiter, et certains poissons à nageoires longues peuvent le stresser. Le Discus demande une eau très stable et des paramètres précis, peu adaptés à un premier bac. Les gros cichlidés nécessitent des volumes bien supérieurs à ce qu'on imagine au départ, et le poisson rouge, souvent recommandé à tort pour débuter, a besoin d'un très grand volume et d'une eau plus fraîche que la plupart des poissons tropicaux.",
        ],
      },
      {
        titre: 'Les crevettes, une bonne alternative',
        paragraphes: [
          "La crevette Red Cherry est une excellente option pour découvrir l'aquariophilie : robuste, discrète, et utile pour limiter les algues, à condition d'éviter tout traitement à base de cuivre, toxique pour les invertébrés.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Retour au guide de démarrage' },
      { href: '/categorie/vivant', label: 'Voir les annonces de poissons et invertébrés' },
      { href: '/biotope/eau-douce', label: "Toutes les annonces d'eau douce" },
    ],
  },
  {
    slug: 'aquarium-recifal-par-ou-commencer',
    titre: 'Aquarium récifal : par où commencer ?',
    eyebrow: 'Récifal',
    description:
      "Les bases du récifal marin : matériel spécifique, paramètres d'eau stables et progressivité de l'installation.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Un projet plus technique et plus coûteux',
        paragraphes: [
          "Le récifal marin demande des paramètres d'eau beaucoup plus stables et précis que l'eau douce (salinité, calcium, KH, phosphates), un budget matériel plus conséquent, et davantage de patience avant d'accueillir les premiers coraux. Partir avec des attentes réalistes évite beaucoup de déconvenues.",
        ],
      },
      {
        titre: 'Le matériel spécifique',
        paragraphes: [
          "Un écumeur protéinique pour extraire les déchets organiques, un osmolateur pour compenser l'évaporation sans faire varier la salinité, des pompes de brassage pour reproduire le mouvement de l'eau, un éclairage au spectre adapté à la photosynthèse des coraux, et des tests dédiés à l'eau de mer sont indispensables — le matériel d'eau douce n'est pas transposable tel quel.",
        ],
      },
      {
        titre: 'Une évolution progressive',
        paragraphes: [
          "Un bac récifal se peuple par étapes : roches vivantes d'abord, pour installer une bonne base bactérienne et microfaunique, puis coraux mous et LPS, plus tolérants aux variations, avant d'envisager des SPS beaucoup plus exigeants une fois le bac mature (plusieurs mois de stabilité).",
        ],
      },
      {
        titre: 'Bien choisir ses premiers habitants',
        paragraphes: [
          "Le poisson-clown et certains poissons-demoiselles sont des choix robustes pour débuter, en restant attentif à l'agressivité de certaines demoiselles entre elles. Côté coraux, les Zoanthus et les coraux champignons (Discosoma) sont réputés pour leur tolérance et conviennent bien à un premier bac.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/biotope/eau-de-mer', label: "Voir les annonces d'eau de mer et récifal" },
      { href: '/categorie/materiel', label: 'Voir le matériel (écumeurs, pompes, éclairage...)' },
    ],
  },
  {
    slug: 'hivernage-poissons-bassin',
    titre: 'Bassin de jardin : bien préparer l’hivernage de vos poissons',
    eyebrow: 'Bassin',
    description:
      "Comment adapter l'alimentation, protéger l'eau du gel et entretenir la filtration de votre bassin avant l'hiver.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Pourquoi l’automne est une période clé',
        paragraphes: [
          "À mesure que la température de l'eau baisse, le métabolisme des poissons de bassin (Koï, poissons rouges) ralentit fortement. C'est en amont de l'hiver que se prépare le passage à la saison froide, pas une fois les premières gelées arrivées.",
        ],
      },
      {
        titre: 'Adapter l’alimentation progressivement',
        paragraphes: [
          "Dès que l'eau descend sous 14°C environ, il est conseillé de passer à une nourriture pauvre en protéines et facile à digérer (à base de germe de blé). En dessous de 8 à 10°C, la digestion des poissons est trop ralentie pour traiter la nourriture correctement : mieux vaut arrêter complètement de nourrir plutôt que de risquer des problèmes digestifs.",
        ],
      },
      {
        titre: 'Protéger le bassin du gel',
        paragraphes: [
          "Un bassin doit comporter une zone d'au moins 80 cm à 1 mètre de profondeur pour ne pas geler entièrement en hiver. Un bulleur ou un dégeleur flottant permet de maintenir une ouverture dans la glace, essentielle aux échanges gazeux — un bassin totalement pris par la glace peut voir ses poissons manquer d'oxygène. Retirer les feuilles mortes et débris végétaux avant l'hiver limite aussi la formation de gaz toxiques sous la glace.",
        ],
      },
      {
        titre: 'Entretenir la filtration',
        paragraphes: [
          "Certains passionnés arrêtent la filtration biologique par grand froid car les bactéries deviennent dormantes, d'autres préfèrent la maintenir à débit réduit pour éviter le gel des canalisations. La bonne approche dépend surtout de la rigueur du climat local — mieux vaut se renseigner sur les pratiques adaptées à sa région.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/biotope/bassin', label: 'Voir les annonces de bassin' },
      { href: '/categorie/materiel', label: 'Voir le matériel de filtration' },
    ],
  },
];

export function fetchGuideParSlug(slug: string): Guide | null {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}
