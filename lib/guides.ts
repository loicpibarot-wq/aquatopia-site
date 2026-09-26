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
  {
    slug: 'parametres-eau-ph-gh-kh',
    titre: "pH, GH, KH : comprendre les paramètres de l'eau en aquariophilie",
    eyebrow: 'Comprendre',
    description:
      "Ce que mesurent réellement le pH, le GH et le KH, et pourquoi la stabilité de ces paramètres compte plus que leur valeur exacte.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Le pH : acidité ou basicité de l’eau',
        paragraphes: [
          "Le pH mesure l'acidité de l'eau sur une échelle de 0 à 14 (7 étant neutre). La plupart des poissons d'eau douce tropicaux tolèrent un pH entre 6,5 et 7,5, mais certaines espèces (Discus, Scalaires) préfèrent une eau plus acide, tandis que d'autres (Cichlidés du Lac Malawi) préfèrent une eau plus basique.",
        ],
      },
      {
        titre: 'Le GH : la dureté générale',
        paragraphes: [
          "Le GH mesure la concentration en calcium et magnésium dissous dans l'eau — on parle d'eau « douce » (GH bas) ou « dure » (GH élevé). C'est un paramètre important pour la reproduction de nombreuses espèces et pour la croissance des plantes, qui puisent ces minéraux dans l'eau.",
        ],
      },
      {
        titre: 'Le KH : le pouvoir tampon',
        paragraphes: [
          "Le KH mesure la capacité de l'eau à résister aux variations de pH (le « pouvoir tampon »). Un KH trop bas expose à des chutes brutales de pH (le fameux « pH crash »), souvent dangereuses pour les poissons. C'est pourquoi un KH stable est souvent plus important que la valeur exacte du pH.",
        ],
      },
      {
        titre: 'Pourquoi la stabilité prime sur la valeur exacte',
        paragraphes: [
          "La plupart des poissons s'adaptent à une large gamme de paramètres du moment qu'ils sont stables : une variation brutale est bien plus dangereuse qu'un paramètre légèrement éloigné de l'idéal théorique. Mieux vaut donc éviter de chercher à forcer un paramètre avec des produits chimiques et privilégier des changements d'eau réguliers et progressifs.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/cycle-de-lazote-aquarium', label: "Comprendre le cycle de l'azote" },
      { href: '/categorie/materiel', label: "Voir les testeurs d'eau" },
    ],
  },
  {
    slug: 'bien-nourrir-poissons-aquarium',
    titre: 'Bien nourrir ses poissons d’aquarium : quantité, fréquence et erreurs à éviter',
    eyebrow: 'Entretien',
    description:
      "La suralimentation est la cause la plus fréquente de problèmes en aquarium : comment nourrir ses poissons correctement, sans excès.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'La règle de base : moins que ce qu’on pense',
        paragraphes: [
          "La grande majorité des problèmes d'eau (pics d'ammoniac, algues, eau trouble) viennent d'une suralimentation plutôt que d'un manque de nourriture. Une bonne règle est de ne donner que ce que les poissons peuvent consommer en 2 à 3 minutes, une à deux fois par jour.",
        ],
      },
      {
        titre: 'Varier les sources de nourriture',
        paragraphes: [
          "Granulés ou paillettes en base quotidienne, complétés occasionnellement par des proies congelées (artémias, daphnies, vers de vase) ou vivantes, permettent de couvrir les besoins nutritionnels de la plupart des espèces communautaires et d'stimuler leur comportement naturel.",
        ],
      },
      {
        titre: 'Adapter la nourriture à l’espèce',
        paragraphes: [
          "Un poisson de fond (Corydoras, Ancistrus) a besoin de nourriture qui coule, tandis qu'un poisson de surface préfère des paillettes flottantes. Les herbivores (certains Poecilidés, Ancistrus) profitent d'un complément végétal (courgette, concombre blanchi) en plus des granulés classiques.",
        ],
      },
      {
        titre: 'Le jeûne, un outil utile',
        paragraphes: [
          "Sauter un jour de nourrissage par semaine n'est pas néfaste, bien au contraire : cela laisse le temps au système digestif de se reposer et limite l'accumulation de déchets organiques dans le bac — une pratique courante chez les aquariophiles expérimentés.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/cycle-de-lazote-aquarium', label: "Comprendre le cycle de l'azote" },
      { href: '/categorie/vivant', label: 'Voir les annonces de poissons' },
    ],
  },
  {
    slug: 'aquascaping-decor-naturel',
    titre: 'Aquascaping : composer un décor naturel pour son aquarium',
    eyebrow: 'Décoration',
    description:
      "Les grands principes de l'aquascaping pour composer un décor d'aquarium harmonieux : plantes, racines, roches et mise en scène.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Un décor qui s’inspire de la nature',
        paragraphes: [
          "L'aquascaping consiste à composer le décor d'un aquarium en s'inspirant de paysages naturels — sous-bois, ruisseau, montagne — plutôt que d'accumuler des éléments décoratifs sans cohérence. Les styles les plus connus sont le style hollandais (bac planté dense, organisé en massifs) et le style japonais Iwagumi (quelques roches disposées avec soin, peu de plantes).",
        ],
      },
      {
        titre: 'La règle des tiers',
        paragraphes: [
          "Comme en photographie, diviser l'espace visuel en tiers plutôt que de centrer les éléments donne un résultat plus naturel et équilibré à l'œil. Un point focal (une roche imposante, une racine) placé sur l'une de ces lignes structure généralement bien la composition.",
        ],
      },
      {
        titre: 'Racines et roches : bien les préparer',
        paragraphes: [
          "Une racine de bois flotté doit généralement être immergée plusieurs jours (voire semaines) avant d'être installée définitivement, le temps qu'elle se sature en eau et cesse de flotter ; elle relâchera aussi des tanins qui colorent l'eau, sans danger pour les poissons. Certaines roches (calcaires notamment) peuvent modifier la dureté de l'eau : à réserver aux bacs où ce n'est pas gênant, voire recherché (Cichlidés africains).",
        ],
      },
      {
        titre: 'Composer les plans avant/arrière',
        paragraphes: [
          "Les plantes de premier plan (courtes, tapissantes) devant, les plantes de taille moyenne au centre, et les plantes hautes ou à tige en arrière-plan donnent une impression de profondeur — un principe simple qui améliore immédiatement le rendu d'un bac planté.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/plantes', label: 'Voir les annonces de plantes' },
      { href: '/categorie/decor', label: 'Voir les annonces de décor (roches, racines...)' },
    ],
  },
  {
    slug: 'materiel-recifal-ecumeur-osmolateur-brassage',
    titre: 'Écumeur, osmolateur, brassage : le matériel récifal expliqué',
    eyebrow: 'Récifal',
    description:
      "Le rôle exact de l'écumeur, de l'osmolateur et des pompes de brassage dans un aquarium récifal, et comment bien les dimensionner.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'L’écumeur protéinique',
        paragraphes: [
          "L'écumeur extrait les molécules organiques dissoutes avant qu'elles ne se décomposent en polluants, en créant un mélange d'air et d'eau qui capture ces déchets sous forme d'écume évacuée dans un godet séparé. C'est l'un des équipements les plus déterminants pour la qualité de l'eau en récifal, à dimensionner plutôt au-dessus du volume réel du bac qu'en dessous.",
        ],
      },
      {
        titre: 'L’osmolateur : compenser l’évaporation',
        paragraphes: [
          "L'eau s'évapore en continu dans un bac récifal, mais les sels qu'elle contient restent : sans compensation, la salinité augmente progressivement. Un osmolateur ajoute automatiquement de l'eau osmosée pure (sans sel) pour maintenir un niveau et une salinité stables, en particulier utile en cas d'absence prolongée.",
        ],
      },
      {
        titre: 'Le brassage : reproduire le mouvement des courants',
        paragraphes: [
          "Les pompes de brassage reproduisent le mouvement de l'eau que les coraux connaissent en milieu naturel — un brassage insuffisant favorise l'accumulation de déchets et le développement d'algues, tandis qu'un brassage adapté à chaque zone du bac améliore la santé et la coloration des coraux. Un brassage aléatoire ou alterné (plutôt qu'un flux constant dans une seule direction) est généralement recommandé.",
        ],
      },
      {
        titre: 'Dimensionner son matériel dès le départ',
        paragraphes: [
          "Il est presque toujours préférable de surdimensionner légèrement écumeur et brassage plutôt que de devoir les changer après quelques mois d'évolution du bac — un achat de matériel d'occasion adapté à un volume un peu supérieur au sien reste souvent plus économique qu'un achat neuf pile à la bonne taille.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/aquarium-recifal-par-ou-commencer', label: 'Retour au guide du récifal débutant' },
      { href: '/categorie/materiel', label: 'Voir le matériel récifal en vente' },
    ],
  },
  {
    slug: 'coraux-mous-lps-sps-differences',
    titre: 'Coraux mous, LPS, SPS : quelles différences et quelle progression ?',
    eyebrow: 'Récifal',
    description:
      "Les trois grandes familles de coraux d'aquarium récifal, leurs besoins respectifs, et dans quel ordre les introduire.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Les coraux mous : les plus tolérants',
        paragraphes: [
          "Zoanthus, Discosoma (coraux champignons), Sarcophyton ou Xenia tolèrent des paramètres d'eau moins stricts et une intensité lumineuse plus modeste. Ce sont les coraux recommandés pour démarrer un bac récifal, le temps que celui-ci gagne en maturité et en stabilité.",
        ],
      },
      {
        titre: 'Les LPS : un premier pas vers l’exigence',
        paragraphes: [
          "Les LPS (« Large Polyp Stony », coraux durs à gros polypes — Euphyllia, Trachyphyllia, Acanthophyllia) demandent des paramètres plus précis (calcium, KH, magnésium) mais restent globalement plus indulgents que les SPS en cas de petite variation. Ils constituent une bonne étape intermédiaire.",
        ],
      },
      {
        titre: 'Les SPS : le niveau exigeant',
        paragraphes: [
          "Les SPS (« Small Polyp Stony » — Acropora, Montipora) sont les plus sensibles aux variations de paramètres et demandent un éclairage puissant, un brassage important et une chimie de l'eau très stable. Ils ne sont généralement recommandés qu'une fois le bac mature de plusieurs mois, avec des paramètres maîtrisés dans la durée.",
        ],
      },
      {
        titre: 'Une progression plutôt qu’un choix figé',
        paragraphes: [
          "Beaucoup de récifalistes mélangent les trois familles dans un même bac en les répartissant selon leurs besoins en lumière et en flux, mais la règle reste la même à l'introduction : ne jamais ajouter de coraux exigeants avant que le bac ait démontré sa stabilité sur la durée.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/calcium-kh-magnesium-recifal', label: "Bien doser calcium, KH et magnésium" },
      { href: '/biotope/eau-de-mer', label: "Voir les annonces d'eau de mer et récifal" },
    ],
  },
  {
    slug: 'calcium-kh-magnesium-recifal',
    titre: 'Calcium, KH, magnésium : bien doser les 3 éléments en récifal',
    eyebrow: 'Récifal',
    description:
      "Comment ces trois paramètres interagissent pour la croissance des coraux durs, et les méthodes courantes pour les maintenir stables.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Pourquoi ces trois paramètres sont liés',
        paragraphes: [
          "Les coraux durs (LPS, SPS) puisent calcium et carbonates (mesurés via le KH) dans l'eau pour construire leur squelette, ce qui fait naturellement baisser ces deux paramètres avec le temps. Le magnésium, lui, empêche le calcium et les carbonates de précipiter ensemble : un magnésium trop bas rend le calcium et le KH très instables et difficiles à maintenir, quel que soit le dosage effectué.",
        ],
      },
      {
        titre: 'Les fourchettes généralement visées',
        paragraphes: [
          "La plupart des récifalistes visent un calcium autour de 400 à 450 ppm, un KH entre 7 et 10 dKH, et un magnésium entre 1250 et 1350 ppm — mais la valeur exacte compte moins que le fait de la maintenir stable dans la durée, en évitant les à-coups.",
        ],
      },
      {
        titre: 'Les méthodes de dosage courantes',
        paragraphes: [
          "L'eau de Kalkwasser (eau de chaux) permet de compenser l'évaporation tout en apportant du calcium et en stabilisant le pH — une méthode simple mais limitée aux petits volumes. Les dosages liquides à deux ou trois composants (calcium, carbonates, magnésium séparés) conviennent à la plupart des bacs de taille moyenne. Le réacteur à calcaire, plus technique, convient aux bacs plus chargés en coraux où les besoins de reconstitution sont importants.",
        ],
      },
      {
        titre: 'Tester avant de doser',
        paragraphes: [
          "Dans tous les cas, mieux vaut tester régulièrement ces trois paramètres avant d'ajuster le dosage plutôt que de doser à l'aveugle : une correction trop rapide d'un paramètre déséquilibré peut être aussi dommageable pour les coraux que le déséquilibre initial.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/coraux-mous-lps-sps-differences', label: 'Coraux mous, LPS, SPS : les différences' },
      { href: '/categorie/materiel', label: 'Voir le matériel de dosage et de test' },
    ],
  },
  {
    slug: 'acclimatation-goutte-a-goutte-poissons-coraux',
    titre: 'Acclimatation des poissons et coraux marins : la méthode du goutte-à-goutte',
    eyebrow: 'Récifal',
    description:
      "Pourquoi une acclimatation progressive est indispensable en eau de mer, et comment la réaliser sans stresser l'animal.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Pourquoi l’acclimatation est plus critique en eau de mer',
        paragraphes: [
          "Les écarts de salinité, de température et de pH entre l'eau de transport et celle de l'aquarium de destination sont beaucoup plus dangereux pour les organismes marins que pour l'eau douce : un changement brutal de salinité peut provoquer un choc osmotique sévère, parfois fatal en quelques heures.",
        ],
      },
      {
        titre: 'La méthode du goutte-à-goutte',
        paragraphes: [
          "Le sachet de transport est placé (flottant ou dans un récipient à part) pour égaliser la température, puis de l'eau de l'aquarium de destination est ajoutée très progressivement, goutte après goutte à l'aide d'un tuyau fin, sur une durée d'une à plusieurs heures selon la sensibilité de l'espèce — l'idée étant de laisser l'organisme s'adapter très lentement au changement de salinité plutôt que de le transférer d'un coup.",
        ],
      },
      {
        titre: 'Ne jamais reverser l’eau de transport dans le bac',
        paragraphes: [
          "L'eau du sachet ou du sac de transport peut contenir des parasites, des déchets ou des traitements incompatibles avec le bac de destination : elle doit toujours être jetée, jamais versée dans l'aquarium, y compris lors de l'acclimatation.",
        ],
      },
      {
        titre: 'Cas particulier des coraux',
        paragraphes: [
          "Les coraux supportent en général une acclimatation plus courte que les poissons (30 à 60 minutes suffisent souvent), mais restent sensibles à la lumière : il est préférable de les introduire dans une zone modérément éclairée du bac au départ, puis de les rapprocher progressivement de leur emplacement définitif sur plusieurs jours.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/aquarium-recifal-par-ou-commencer', label: 'Retour au guide du récifal débutant' },
      { href: '/biotope/eau-de-mer', label: "Voir les annonces d'eau de mer et récifal" },
    ],
  },
  {
    slug: 'demarrer-bassin-jardin',
    titre: 'Bien démarrer un bassin de jardin',
    eyebrow: 'Bassin',
    description:
      "Emplacement, profondeur, filtration et mise en eau : les bases pour créer un bassin de jardin durable.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Choisir le bon emplacement',
        paragraphes: [
          "Un emplacement recevant quelques heures de soleil mais pas en plein soleil toute la journée limite la prolifération d'algues et les variations de température excessives. Il faut aussi éviter de placer un bassin directement sous de grands arbres, dont les feuilles mortes en automne se décomposent et dégradent la qualité de l'eau.",
        ],
      },
      {
        titre: 'La profondeur, un critère souvent sous-estimé',
        paragraphes: [
          "Pour accueillir des poissons à l'année (Koï, poissons rouges), une zone d'au moins 80 cm à 1 mètre de profondeur est nécessaire pour éviter que le bassin ne gèle entièrement en hiver ou ne surchauffe en été. Des paliers de profondeurs variées permettent aussi d'accueillir davantage de plantes aquatiques.",
        ],
      },
      {
        titre: 'La filtration, indispensable dès qu’il y a des poissons',
        paragraphes: [
          "Contrairement à une mare purement végétale, un bassin avec poissons a besoin d'une filtration mécanique (retenir les particules) et biologique (transformer les déchets azotés) dimensionnée au volume total et à la population de poissons prévue à terme.",
        ],
      },
      {
        titre: 'Laisser le bassin se stabiliser avant d’introduire les poissons',
        paragraphes: [
          "Comme pour un aquarium, un bassin neuf a besoin de quelques semaines pour que son cycle biologique s'installe avant d'accueillir des poissons — une étape à ne pas précipiter, même si l'envie de peupler le bassin rapidement est grande.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/hivernage-poissons-bassin', label: "Préparer l'hivernage de son bassin" },
      { href: '/biotope/bassin', label: 'Voir les annonces de bassin' },
    ],
  },
  {
    slug: 'choisir-filtration-aquarium',
    titre: 'Filtre interne, externe, sur-verre : lequel choisir pour son aquarium ?',
    eyebrow: 'Matériel',
    description:
      "Les avantages et limites des principaux types de filtration d'aquarium, pour choisir celui adapté à votre bac.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Le filtre interne',
        paragraphes: [
          "Compact et peu coûteux, le filtre interne se place directement dans le bac. Il convient bien aux petits volumes, mais sa capacité de masse filtrante reste limitée et il prend de la place visible dans l'aquarium.",
        ],
      },
      {
        titre: 'Le filtre externe',
        paragraphes: [
          "Placé sous le meuble, à l'extérieur du bac, le filtre externe offre un volume de masses filtrantes bien supérieur et ne prend aucune place dans l'aquarium. C'est la solution la plus courante à partir d'une soixantaine de litres, en particulier pour des bacs plantés ou fortement peuplés.",
        ],
      },
      {
        titre: 'Le filtre sur-verre (à décantation)',
        paragraphes: [
          "Utilisé en récifal et dans certains bacs d'eau douce haut de gamme, le filtre sur-verre (« sump ») déporte la filtration, le chauffage et parfois l'écumeur dans un compartiment ou un bac séparé sous le meuble, relié par une gorge en verre. Il offre le plus grand volume de filtration et de flexibilité, au prix d'une installation plus complexe et plus coûteuse.",
        ],
      },
      {
        titre: 'Ce qui compte le plus : le débit adapté au volume',
        paragraphes: [
          "Quel que soit le type choisi, le critère principal reste un débit de filtration adapté au volume du bac (on vise généralement 4 à 6 fois le volume du bac par heure en eau douce) — un filtre surdimensionné reste presque toujours préférable à un filtre trop juste.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/materiel', label: 'Voir les filtres en vente' },
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Retour au guide de démarrage' },
    ],
  },
  {
    slug: 'meilleur-aquarium-pour-debutant',
    titre: 'Quel aquarium choisir pour débuter ? Notre comparatif',
    eyebrow: 'Comparatif',
    description:
      "Bocal, nano-aquarium, kit tout-équipé ou bac + matériel séparé : comment choisir son premier aquarium selon son budget et son espace.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Pourquoi éviter le bocal ou le très petit volume',
        paragraphes: [
          "Un bocal sans filtre ni chauffage ne permet pas de maintenir des paramètres d'eau stables, ce qui expose les poissons à un stress constant. Même pour un premier bac, un volume de 54 à 60 litres minimum reste beaucoup plus simple à équilibrer et pardonne davantage les erreurs de débutant.",
        ],
      },
      {
        titre: 'Le kit tout-équipé : simple mais parfois limité',
        paragraphes: [
          "Les kits vendus avec aquarium, filtre, éclairage et parfois chauffage intégrés simplifient l'achat et conviennent bien à un premier bac. Leur principale limite est un filtre souvent un peu juste pour le volume, qu'il est possible de compléter par la suite si besoin.",
        ],
      },
      {
        titre: 'Aquarium et matériel séparés : plus de flexibilité',
        paragraphes: [
          "Choisir chaque élément séparément (bac, filtre, éclairage) permet de mieux dimensionner chaque composant à son projet, en particulier pour un bac planté ou déjà orienté vers une espèce précise. Cette option demande un peu plus de recherche mais évite d'avoir à tout changer plus tard.",
        ],
      },
      {
        titre: "L'occasion, une option à ne pas négliger",
        paragraphes: [
          "Un aquarium ou un kit d'occasion en bon état permet souvent d'obtenir un volume plus généreux pour le même budget qu'un petit kit neuf — un point clé à vérifier étant l'étanchéité et l'état du silicone.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/cuves', label: 'Voir les aquariums en vente' },
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Retour au guide de démarrage' },
    ],
  },
  {
    slug: 'quel-filtre-choisir-selon-volume',
    titre: 'Quel filtre choisir selon le volume de son aquarium ?',
    eyebrow: 'Comparatif',
    description:
      "Filtre interne, externe ou sur-verre : quel type de filtration convient le mieux selon la taille de votre aquarium.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Petits volumes (jusqu’à 60 litres environ)',
        paragraphes: [
          "Un filtre interne suffit généralement pour ce volume, à condition de vérifier que son débit reste adapté (4 à 6 fois le volume du bac par heure). Il présente l'avantage d'être simple à installer et peu coûteux.",
        ],
      },
      {
        titre: 'Volumes moyens à grands (60 à 300 litres environ)',
        paragraphes: [
          "Un filtre externe devient généralement plus adapté : il offre un volume de masses filtrantes bien supérieur, ne prend aucune place visible dans le bac, et convient bien aux bacs plantés ou fortement peuplés.",
        ],
      },
      {
        titre: 'Grands volumes et récifal',
        paragraphes: [
          "Au-delà, ou pour un bac récifal, un filtre sur-verre (sump) devient intéressant : il permet de déporter filtration, chauffage et écumeur dans un compartiment séparé, au prix d'une installation plus complexe.",
        ],
      },
      {
        titre: 'Le critère qui prime sur tout le reste',
        paragraphes: [
          "Quel que soit le type retenu, un débit de filtration légèrement surdimensionné par rapport au volume réel du bac reste presque toujours préférable à un filtre trop juste, qui laisse s'accumuler les déchets plus vite qu'il ne les traite.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-filtration-aquarium', label: 'Filtre interne, externe, sur-verre : le détail' },
      { href: '/categorie/materiel', label: 'Voir les filtres en vente' },
    ],
  },
  {
    slug: 'eau-douce-ou-eau-de-mer-comment-choisir',
    titre: 'Eau douce ou eau de mer : comment choisir son premier aquarium ?',
    eyebrow: 'Comparatif',
    description:
      "Budget, technicité, temps d'entretien : les vrais critères pour choisir entre un aquarium d'eau douce et un aquarium récifal.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Le budget de départ',
        paragraphes: [
          "L'eau douce demande généralement un budget de départ plus accessible (bac, filtre, chauffage, éclairage basique), tandis que le récifal ajoute des postes de dépense supplémentaires (écumeur, pompes de brassage, éclairage puissant, tests spécifiques), ce qui augmente sensiblement l'investissement initial.",
        ],
      },
      {
        titre: 'La technicité et la marge d’erreur',
        paragraphes: [
          "Les poissons d'eau douce tropicaux tolèrent en général une fourchette de paramètres assez large tant qu'elle reste stable. Le récifal marin, en particulier avec des coraux, demande des paramètres beaucoup plus précis (salinité, calcium, KH, magnésium) et laisse moins de marge d'erreur.",
        ],
      },
      {
        titre: 'Le temps d’entretien',
        paragraphes: [
          "Un aquarium d'eau douce classique demande un entretien hebdomadaire assez simple (changement d'eau partiel, nettoyage du filtre). Le récifal implique un suivi plus régulier des paramètres et souvent un dosage de plusieurs éléments (calcium, KH, magnésium) pour rester stable.",
        ],
      },
      {
        titre: 'Notre recommandation pour un premier bac',
        paragraphes: [
          "Pour une toute première expérience, l'eau douce reste le point d'entrée le plus accessible pour apprendre les bases (cyclage, paramètres, alimentation) avant de se lancer, si l'envie est là, dans un projet récifal plus tard, avec l'expérience acquise entre-temps.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/demarrer-aquarium-eau-douce', label: "Démarrer en eau douce" },
      { href: '/guides/aquarium-recifal-par-ou-commencer', label: 'Démarrer en récifal' },
    ],
  },
  {
    slug: 'budget-demarrer-aquarium',
    titre: "Combien coûte un aquarium ? Le budget réel pour démarrer",
    eyebrow: 'Débuter',
    description:
      "Aquarium, filtre, chauffage, éclairage, entretien mensuel : le budget réaliste pour démarrer l'aquariophilie, en neuf comme en occasion.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: "Le budget d'équipement de départ",
        paragraphes: [
          "Un kit tout équipé (bac, filtre, chauffage, éclairage) couvre l'essentiel pour un premier bac, avec une fourchette de prix qui varie surtout selon le volume. Acheter séparément permet souvent de mieux choisir chaque élément, mais demande un peu plus de recherche. Dans les deux cas, passer par de l'occasion réduit fortement cette mise de départ, en particulier sur le bac et le meuble, les postes les plus coûteux en neuf.",
        ],
      },
      {
        titre: 'Le budget des premiers habitants',
        paragraphes: [
          "Les poissons et plantes robustes recommandés pour débuter restent généralement d'un coût modeste. Les espèces plus rares, ou un projet récifal avec des coraux, représentent un budget nettement plus élevé — une bonne raison de bien se renseigner avant de se lancer dans ce type de projet.",
        ],
      },
      {
        titre: "Le budget d'entretien mensuel",
        paragraphes: [
          "Au-delà de l'achat initial, il faut compter la nourriture, l'électricité du chauffage et de l'éclairage, ainsi que le remplacement occasionnel de consommables (masses filtrantes, réactifs de test). C'est un budget modeste mais réel, à anticiper avant de se lancer plutôt qu'à découvrir après coup.",
        ],
      },
      {
        titre: "Où l'occasion permet de vraiment économiser",
        paragraphes: [
          "Le matériel volumineux et durable (bac, meuble, filtre externe, éclairage) se revend et s'achète bien d'occasion, avec une décote importante par rapport au neuf. Les consommables (nourriture, réactifs de test, masses filtrantes) restent en revanche à acheter neufs, pour des raisons évidentes d'hygiène et d'efficacité.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/cuves', label: 'Voir les aquariums en vente' },
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Démarrer un aquarium d’eau douce' },
    ],
  },
  {
    slug: 'erreurs-debutant-aquariophilie',
    titre: "Les erreurs de débutant les plus fréquentes en aquariophilie (et comment les éviter)",
    eyebrow: 'Débuter',
    description:
      "Cyclage sauté, suralimentation, bac trop peuplé trop vite : les erreurs classiques des nouveaux aquariophiles, et les bons réflexes pour les éviter.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Précipiter le démarrage',
        paragraphes: [
          "Introduire des poissons avant la fin du cyclage, peupler l'aquarium d'un coup au lieu d'y aller progressivement, ou choisir un bac trop petit pour gagner en marge d'erreur : la plupart des premiers échecs viennent d'un démarrage trop rapide, avant que l'équilibre biologique du bac ait eu le temps de s'installer.",
        ],
      },
      {
        titre: "Mal doser l'entretien courant",
        paragraphes: [
          "Suralimenter reste la cause la plus fréquente de pics d'ammoniac, tandis que des changements d'eau trop rares laissent les nitrates s'accumuler. À l'inverse, des changements d'eau trop fréquents ou trop importants peuvent déstabiliser un bac déjà équilibré. La régularité compte plus que l'intensité.",
        ],
      },
      {
        titre: 'Sous-estimer les besoins des poissons',
        paragraphes: [
          "Beaucoup d'espèces vendues jeunes atteignent une taille adulte bien plus importante, ou ont besoin de vivre en groupe pour ne pas stresser. Vérifier ces besoins avant l'achat évite bien des déceptions et des soucis de cohabitation quelques mois plus tard.",
        ],
      },
      {
        titre: 'Négliger le suivi',
        paragraphes: [
          "Ne tester l'eau qu'en cas de problème visible, au lieu de le faire régulièrement, retarde souvent la détection d'un déséquilibre. Un poisson léthargique ou qui perd l'appétit est un signal à prendre au sérieux tout de suite, pas à surveiller « pour voir ».",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
      { href: '/guides/reconnaitre-poisson-malade-stresse', label: 'Reconnaître un poisson malade ou stressé' },
    ],
  },
  {
    slug: 'reconnaitre-poisson-malade-stresse',
    titre: 'Comment reconnaître un poisson malade ou stressé ?',
    eyebrow: 'Comprendre',
    description:
      "Les signes qui doivent alerter chez un poisson d'aquarium : comportement, apparence, et les bons réflexes à avoir dès le premier doute.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Les signes comportementaux',
        paragraphes: [
          "Léthargie, isolement du reste du groupe, nage anormale (en biais, saccadée, ou au contraire immobile), perte d'appétit ou frottements contre le décor sont souvent les premiers signes visibles, avant même une anomalie physique.",
        ],
      },
      {
        titre: 'Les signes physiques',
        paragraphes: [
          "Des taches blanches ponctuelles évoquent souvent l'ich (maladie des points blancs), des nageoires abîmées ou recroquevillées un problème bactérien, des couleurs ternies ou un gonflement abdominal un mal-être plus général. Des yeux troubles ou exorbités sont également à surveiller de près.",
        ],
      },
      {
        titre: 'Les causes les plus fréquentes',
        paragraphes: [
          "Une mauvaise qualité d'eau (pic d'ammoniac ou de nitrites, souvent après un déséquilibre du cycle de l'azote), un stress de cohabitation, ou un parasite introduit par un nouveau poisson non mis en quarantaine expliquent la grande majorité des cas.",
        ],
      },
      {
        titre: 'Les bons réflexes',
        paragraphes: [
          "Tester l'eau immédiatement reste le premier réflexe, avant toute autre action : une bonne partie des soucis de santé viennent d'un paramètre déséquilibré plutôt que d'une maladie à proprement parler. Isoler le poisson suspect quand c'est possible limite aussi le risque de contamination du reste du bac.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
      { href: '/faq#entretien', label: 'Questions fréquentes sur l’entretien' },
    ],
  },
  {
    slug: 'role-du-filtre-dans-aquarium',
    titre: "Comprendre le rôle du filtre dans un aquarium",
    eyebrow: 'Comprendre',
    description:
      "Filtration mécanique, biologique, chimique : à quoi sert vraiment un filtre d'aquarium, au-delà de simplement « nettoyer l'eau ».",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'La filtration mécanique',
        paragraphes: [
          "Elle retient les particules en suspension (mousse, ouate, perlon) : c'est la fonction la plus visible du filtre, mais aussi la moins importante pour l'équilibre du bac sur le long terme.",
        ],
      },
      {
        titre: 'La filtration biologique',
        paragraphes: [
          "C'est le rôle le plus important, et souvent le plus sous-estimé : les masses filtrantes biologiques hébergent les bactéries nitrifiantes qui transforment l'ammoniac et les nitrites en substances beaucoup moins toxiques. C'est cette population bactérienne qui « fait » le cyclage d'un aquarium.",
        ],
      },
      {
        titre: 'La filtration chimique',
        paragraphes: [
          "Charbon actif ou résines anti-nitrates : utile ponctuellement, par exemple pour retirer un médicament après un traitement ou une odeur persistante, mais pas indispensable au quotidien dans un bac bien entretenu.",
        ],
      },
      {
        titre: 'Pourquoi ne jamais tout nettoyer d’un coup',
        paragraphes: [
          "Nettoyer l'ensemble des masses filtrantes en même temps, à l'eau du robinet et de manière trop appuyée, détruit une grande partie de cette population bactérienne. Rincer les masses biologiques dans l'eau du bac déjà retirée, et par roulement plutôt que toutes en même temps, préserve l'équilibre du cycle de l'azote.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-filtration-aquarium', label: 'Bien choisir sa filtration' },
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
    ],
  },
  {
    slug: 'printemps-bassin-redemarrage',
    titre: 'Bassin de jardin : bien relancer la saison au printemps',
    eyebrow: 'Bassin',
    description:
      "Reprise de l'alimentation, nettoyage, relance de la filtration : comment redémarrer son bassin de jardin après l'hiver sans le déstabiliser.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: "Reprendre l'alimentation progressivement",
        paragraphes: [
          "Dès que l'eau dépasse 10°C, une reprise progressive avec une nourriture digeste est possible, avant de revenir au rythme et à la nourriture habituels une fois la température stabilisée au-delà de 14-15°C. Reprendre trop tôt ou trop généreusement peut perturber une digestion encore ralentie par le froid.",
        ],
      },
      {
        titre: 'Nettoyer sans tout perturber',
        paragraphes: [
          "Retirer les débris et les feuilles accumulées en surface reste utile, mais un nettoyage trop brutal du fond du bassin dérange aussi la faune utile qui s'y trouve. Mieux vaut y aller par étapes plutôt que de tout remuer en une seule fois.",
        ],
      },
      {
        titre: 'Relancer la filtration biologique',
        paragraphes: [
          "Si la filtration a été arrêtée ou ralentie pendant l'hiver, la remettre en route progressivement laisse le temps aux bactéries épuratrices de se redévelopper, plutôt que de la relancer brutalement à pleine puissance.",
        ],
      },
      {
        titre: 'Surveiller les premières proliférations d’algues',
        paragraphes: [
          "Le printemps est une période à risque pour les algues, avant que les plantes du bassin aient repris leur rôle de régulation naturelle des nutriments. Une eau qui verdit rapidement à cette période n'est pas anormale, mais mérite d'être surveillée.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/hivernage-poissons-bassin', label: 'Préparer l’hivernage de son bassin' },
      { href: '/guides/eau-verte-bassin-solutions', label: 'Lutter contre l’eau verte en bassin' },
    ],
  },
  {
    slug: 'eau-verte-bassin-solutions',
    titre: 'Eau verte dans un bassin : causes et solutions',
    eyebrow: 'Bassin',
    description:
      "Pourquoi l'eau d'un bassin de jardin devient verte en été, et les solutions qui fonctionnent réellement pour retrouver une eau claire.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'La cause : des algues microscopiques',
        paragraphes: [
          "L'eau verte est due à une prolifération d'algues unicellulaires en suspension, favorisée par la lumière et l'excès de nutriments (déjections des poissons, décomposition de matière végétale). Ce n'est pas un signe de mauvaise santé du bassin en soi, mais un déséquilibre à corriger.",
        ],
      },
      {
        titre: 'Les solutions qui fonctionnent',
        paragraphes: [
          "Un clarificateur UV agglomère ces algues pour qu'elles soient ensuite piégées par le filtre. Les plantes oxygénantes et épuratrices concurrencent aussi les algues pour les nutriments disponibles. Un ombrage partiel du bassin limite la lumière disponible, un facteur clé de la prolifération.",
        ],
      },
      {
        titre: 'Les solutions à éviter',
        paragraphes: [
          "Les traitements chimiques agressifs, utilisés seuls sans corriger la cause, ramènent généralement le problème après quelques semaines. Une vidange totale du bassin déstabilise tout l'écosystème installé et peut, paradoxalement, aggraver la situation plutôt que la résoudre.",
        ],
      },
      {
        titre: 'Une question de patience',
        paragraphes: [
          "Un bassin neuf traverse souvent une phase d'eau verte avant de se stabiliser, une fois les plantes bien installées et l'équilibre biologique trouvé. Cette phase transitoire ne doit pas systématiquement pousser à intervenir dans l'urgence.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/demarrer-bassin-jardin', label: 'Démarrer un bassin de jardin' },
      { href: '/categorie/materiel', label: 'Voir le matériel en vente' },
    ],
  },
  {
    slug: 'changement-eau-aquarium-frequence-methode',
    titre: "Changement d'eau en aquarium : fréquence et bonne méthode",
    eyebrow: 'Entretien',
    description:
      "Pourquoi, à quelle fréquence et comment faire un changement d'eau efficace en aquarium, sans stresser inutilement ses poissons.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: "Pourquoi changer l'eau régulièrement",
        paragraphes: [
          "Même avec une bonne filtration, les nitrates et d'autres substances continuent de s'accumuler dans l'eau au fil du temps. Le changement d'eau reste le seul moyen de les éliminer réellement, tout en réintroduisant des oligo-éléments consommés par les plantes et les poissons.",
        ],
      },
      {
        titre: 'La fréquence recommandée',
        paragraphes: [
          "Un changement de 10 à 20 % du volume par semaine convient à la plupart des bacs, à ajuster à la hausse si le bac est fortement peuplé ou si les nitrates montent rapidement entre deux changements.",
        ],
      },
      {
        titre: 'La bonne méthode',
        paragraphes: [
          "Siphonner le substrat en même temps que le changement d'eau permet de retirer les déchets qui s'y accumulent. La nouvelle eau doit être traitée avec un conditionneur anti-chlore et amenée à une température proche de celle du bac avant d'être réintroduite, pour éviter un choc thermique.",
        ],
      },
      {
        titre: "Les signes qu'il faut changer d'eau plus souvent",
        paragraphes: [
          "Des nitrates élevés au test, une eau qui jaunit visiblement entre deux changements, ou des poissons plus agités que d'habitude quelques jours après le dernier changement sont des signaux à prendre en compte pour ajuster la fréquence.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/parametres-eau-ph-gh-kh', label: 'Comprendre les paramètres de l’eau' },
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
    ],
  },
  {
    slug: 'nettoyer-aquarium-sans-stresser-poissons',
    titre: 'Nettoyer son aquarium sans stresser ses poissons',
    eyebrow: 'Entretien',
    description:
      "Vitres, décor, substrat : comment nettoyer un aquarium efficacement, sans perturber inutilement les poissons et l'équilibre biologique du bac.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Les vitres',
        paragraphes: [
          "Un aimant ou une raclette dédiée à l'aquarium, utilisés avec des mouvements lents, suffisent généralement à retirer les dépôts d'algues sans agiter excessivement les poissons.",
        ],
      },
      {
        titre: 'Le décor et les plantes',
        paragraphes: [
          "Retirer les algues à la main ou avec une brosse douce reste préférable aux produits chimiques anti-algues, qui peuvent affecter à la fois les poissons sensibles et les plantes du bac.",
        ],
      },
      {
        titre: 'Le substrat',
        paragraphes: [
          "Siphonner le substrat par zones, plutôt que l'ensemble du fond d'un seul coup, évite de perturber excessivement les bactéries qui s'y trouvent — un point particulièrement important dans un bac planté avec un substrat nutritif.",
        ],
      },
      {
        titre: 'Le bon rythme',
        paragraphes: [
          "Un entretien léger et régulier, chaque semaine, reste toujours moins stressant pour les poissons qu'un grand nettoyage espacé de plusieurs mois, qui bouleverse d'un coup l'ensemble du bac.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: 'Bien faire son changement d’eau' },
    ],
  },
  {
    slug: 'lutter-contre-les-algues-aquarium',
    titre: 'Lutter contre les algues en aquarium : identifier et agir',
    eyebrow: 'Entretien',
    description:
      "Algues brunes, vertes, filamenteuses, cyanobactéries : comment identifier le type d'algue et adapter la bonne solution à chaque cas.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Identifier le type d’algue',
        paragraphes: [
          "Les diatomées forment un voile brunâtre, fréquent dans un bac encore jeune. Les algues vertes en points ou en filaments traduisent le plus souvent un excès de lumière ou de nutriments. Les cyanobactéries, malgré leur nom, ne sont pas vraiment des algues : elles forment un voile glissant, souvent rougeâtre ou verdâtre, et une odeur caractéristique.",
        ],
      },
      {
        titre: 'Les causes communes',
        paragraphes: [
          "Un éclairage trop intense ou trop long, un excès de nutriments lié à la suralimentation ou à des changements d'eau trop rares, et un déséquilibre entre la quantité de plantes et la lumière disponible expliquent la grande majorité des invasions d'algues.",
        ],
      },
      {
        titre: 'Les solutions selon le cas',
        paragraphes: [
          "Réduire la photopériode, renforcer temporairement les changements d'eau, et ajouter des plantes à croissance rapide qui concurrencent les algues pour les nutriments sont les leviers les plus efficaces. Certaines espèces (Ancistrus, crevettes) aident aussi à limiter certains types d'algues au quotidien.",
        ],
      },
      {
        titre: 'Le piège à éviter',
        paragraphes: [
          "Traiter uniquement le symptôme avec un produit anti-algues, sans corriger la cause réelle (lumière ou nutriments en excès), ramène généralement le problème après quelques semaines.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/bien-nourrir-poissons-aquarium', label: 'Bien nourrir ses poissons' },
      { href: '/glossaire/cyanobacteries', label: 'Cyanobactéries : définition' },
    ],
  },
  {
    slug: 'choisir-son-substrat-aquarium',
    titre: "Bien choisir son substrat d'aquarium",
    eyebrow: 'Décoration',
    description:
      "Sable, gravier, substrat nutritif : comment choisir le bon substrat d'aquarium selon le type de bac et les espèces hébergées.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Substrat neutre : sable ou gravier',
        paragraphes: [
          "Un substrat neutre suffit pour un bac peu planté, ou pour héberger des poissons de fond fouisseurs comme les Corydoras, qui préfèrent un substrat fin et non coupant pour ne pas abîmer leurs barbillons.",
        ],
      },
      {
        titre: 'Substrat nutritif',
        paragraphes: [
          "Conçu pour nourrir les racines des plantes, il est recommandé pour un bac fortement planté ou un projet d'aquascaping, où les plantes puisent une bonne partie de leurs nutriments directement dans le sol.",
        ],
      },
      {
        titre: 'Cas particulier : bacs à crevettes ou Cichlidés africains',
        paragraphes: [
          "Certains substrats dits « actifs » influencent le pH et le GH de l'eau : à réserver aux projets qui recherchent précisément cet effet, au risque sinon de déstabiliser un bac qui n'en a pas besoin.",
        ],
      },
      {
        titre: 'L’épaisseur, un détail qui compte',
        paragraphes: [
          "Une couche trop fine limite l'installation des racines et des bactéries utiles, tandis qu'une couche trop épaisse peut favoriser des zones anaérobies mal odorantes si le substrat n'est pas régulièrement entretenu.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/aquascaping-decor-naturel', label: 'Créer un décor naturel' },
      { href: '/categorie/plantes', label: 'Voir les plantes en vente' },
    ],
  },
  {
    slug: 'plantes-faciles-aquarium-debutant',
    titre: "Les plantes d'aquarium les plus faciles pour débuter",
    eyebrow: 'Décoration',
    description:
      "Des plantes d'aquarium robustes, qui ne demandent ni CO2 ni éclairage puissant, parfaites pour un premier bac planté.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Anubias et fougère de Java (Microsorum)',
        paragraphes: [
          "Ces plantes se fixent sur une racine ou une roche plutôt que dans le substrat. Très tolérantes et à croissance lente, elles conviennent parfaitement à un premier bac, y compris avec un éclairage modeste.",
        ],
      },
      {
        titre: 'Les mousses (Java moss)',
        paragraphes: [
          "Faciles à attacher sur le décor, elles tolèrent une large gamme de conditions et servent aussi de cachette naturelle pour les alevins ou les crevettes.",
        ],
      },
      {
        titre: 'Cryptocoryne et Vallisneria',
        paragraphes: [
          "Des plantes de substrat robustes, qui forment une bonne base pour un premier bac planté classique, sans exigences particulières en CO2 ou en engrais.",
        ],
      },
      {
        titre: 'Ce qu’il faut éviter en débutant',
        paragraphes: [
          "Certaines plantes à forte demande en lumière et en CO2 (certaines Rotala, l'Hemianthus callitrichoides) fondent rapidement sans un matériel adapté — mieux vaut les réserver à un projet d'aquascaping plus avancé.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/plantes', label: 'Voir les plantes en vente' },
      { href: '/guides/aquascaping-decor-naturel', label: 'Créer un décor naturel' },
    ],
  },
  {
    slug: 'eclairage-bac-plante-choisir',
    titre: "Choisir l'éclairage de son aquarium planté",
    eyebrow: 'Décoration',
    description:
      "Puissance, spectre, durée : comment choisir un éclairage adapté à un bac planté, sans provoquer une invasion d'algues.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Le spectre lumineux',
        paragraphes: [
          "Les plantes utilisent principalement les longueurs d'onde rouge et bleue pour la photosynthèse. La plupart des rampes LED horticoles modernes couvrent bien ce spectre, sans qu'il soit nécessaire de rechercher un modèle très spécialisé pour débuter.",
        ],
      },
      {
        titre: 'La puissance selon les plantes',
        paragraphes: [
          "Les plantes exigeantes (tapis de sol, certaines Rotala) demandent un éclairage plus intense que les espèces faciles comme les Anubias ou les mousses, qui se contentent d'un éclairage modéré.",
        ],
      },
      {
        titre: "La durée d'éclairage",
        paragraphes: [
          "Une durée de 8 à 10 heures par jour constitue une bonne base pour la plupart des bacs plantés. Une durée excessive est l'une des causes les plus fréquentes d'invasion d'algues, bien avant un problème de puissance en elle-même.",
        ],
      },
      {
        titre: 'Éviter le sur-éclairage en début de bac',
        paragraphes: [
          "Un aquarium jeune, avec encore peu de plantes établies pour consommer les nutriments disponibles, est particulièrement sensible aux algues si l'éclairage est trop fort trop tôt. Mieux vaut monter progressivement en intensité à mesure que les plantes s'installent.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/lutter-contre-les-algues-aquarium', label: 'Lutter contre les algues' },
      { href: '/guides/plantes-faciles-aquarium-debutant', label: 'Des plantes faciles pour débuter' },
    ],
  },
  {
    slug: 'chauffage-aquarium-bien-choisir-puissance',
    titre: "Chauffage d'aquarium : comment bien choisir sa puissance",
    eyebrow: 'Matériel',
    description:
      "Comment dimensionner un chauffage d'aquarium selon le volume du bac et la température de la pièce, et pourquoi la sécurité ne doit pas être négligée.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Le calcul de base',
        paragraphes: [
          "Une règle courante consiste à prévoir environ 1 watt par litre dans une pièce tempérée, un peu plus si la pièce est fraîche l'hiver ou si le bac est ouvert, ce qui augmente les déperditions de chaleur.",
        ],
      },
      {
        titre: 'Un ou deux chauffages ?',
        paragraphes: [
          "Au-delà de 150 à 200 litres, répartir la puissance sur deux chauffages de moindre puissance placés à chaque extrémité du bac assure une température plus homogène, et sécurise en cas de panne de l'un des deux appareils.",
        ],
      },
      {
        titre: 'Le thermostat, indispensable',
        paragraphes: [
          "La plupart des chauffages modernes intègrent un thermostat réglable. Vérifier sa précision avec un thermomètre séparé reste une bonne habitude, surtout dans les premières semaines suivant l'installation.",
        ],
      },
      {
        titre: 'Ne pas négliger la sécurité',
        paragraphes: [
          "Toujours débrancher le chauffage avant de baisser fortement le niveau d'eau, par exemple lors d'un grand changement d'eau, pour éviter qu'il ne chauffe à l'air libre et ne s'endommage.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Démarrer un aquarium d’eau douce' },
      { href: '/categorie/materiel', label: 'Voir le matériel en vente' },
    ],
  },
  {
    slug: 'pompe-a-air-utilite-aquarium',
    titre: 'À quoi sert une pompe à air (bulleur) en aquarium ?',
    eyebrow: 'Matériel',
    description:
      "Oxygénation, brassage de surface, alimentation d'accessoires : le rôle réel d'une pompe à air en aquarium d'eau douce.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Favoriser les échanges gazeux',
        paragraphes: [
          "Les bulles elles-mêmes n'oxygènent pas directement l'eau : c'est le brassage de surface qu'elles créent qui favorise les échanges gazeux, en particulier l'apport d'oxygène et l'évacuation du CO2 excédentaire.",
        ],
      },
      {
        titre: 'Utile en cas de forte chaleur ou de bac chargé',
        paragraphes: [
          "Un bac très peuplé, ou une eau chaude qui retient naturellement moins d'oxygène, profite particulièrement d'un complément d'aération, notamment pendant les périodes de forte chaleur.",
        ],
      },
      {
        titre: "Alimenter d'autres équipements",
        paragraphes: [
          "Une pompe à air peut aussi faire fonctionner un filtre à éponge ou un décor animé, en plus de son rôle d'aération proprement dit.",
        ],
      },
      {
        titre: 'Pas toujours indispensable',
        paragraphes: [
          "Un bac avec une bonne agitation de surface générée par le retour du filtre a souvent moins besoin d'un bulleur séparé, sauf cas particulier comme une forte densité de poissons ou un manque d'oxygène observé.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-filtration-aquarium', label: 'Bien choisir sa filtration' },
      { href: '/categorie/materiel', label: 'Voir le matériel en vente' },
    ],
  },
  {
    slug: 'kit-test-eau-aquarium-lequel-choisir',
    titre: "Quel kit de test d'eau choisir pour son aquarium ?",
    eyebrow: 'Matériel',
    description:
      "Bandelettes, tests en gouttes, testeurs électroniques : avantages et limites de chaque méthode pour suivre les paramètres de son eau.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Les bandelettes',
        paragraphes: [
          "Rapides et pratiques à utiliser, elles sont généralement moins précises que d'autres méthodes et se conservent mal une fois le flacon ouvert, avec une fiabilité qui décline dans le temps.",
        ],
      },
      {
        titre: 'Les tests en gouttes (type API)',
        paragraphes: [
          "Plus précis que les bandelettes, ils restent la référence pour un suivi régulier, aussi bien en eau douce qu'en récifal, au prix d'un peu plus de manipulation à chaque test.",
        ],
      },
      {
        titre: 'Les testeurs électroniques',
        paragraphes: [
          "Utiles surtout pour un suivi en continu de paramètres précis comme le pH, la salinité ou la température, ils représentent un coût d'achat plus élevé, généralement justifié pour un usage intensif ou un projet récifal.",
        ],
      },
      {
        titre: 'Ce qu’il faut tester en priorité',
        paragraphes: [
          "Ammoniac, nitrites et nitrates en priorité pendant le cyclage, puis pH et GH/KH de façon ponctuelle. En récifal, calcium, KH et magnésium s'ajoutent à ce suivi de base.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/parametres-eau-ph-gh-kh', label: 'Comprendre les paramètres de l’eau' },
      { href: '/guides/calcium-kh-magnesium-recifal', label: 'Calcium, KH et magnésium en récifal' },
    ],
  },
  {
    slug: 'aquarium-neuf-ou-occasion-comparatif',
    titre: "Aquarium neuf ou d'occasion : que choisir ?",
    eyebrow: 'Comparatif',
    description:
      "Avantages et précautions de l'achat d'occasion face au neuf, pour un aquarium comme pour son matériel : ce qu'il faut vérifier avant de se décider.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: "Ce que l'occasion permet d'économiser",
        paragraphes: [
          "Un aquarium ou un kit complet d'occasion permet souvent d'obtenir un volume ou un équipement plus généreux pour un budget identique, un argument de poids pour un premier bac ou un projet d'agrandissement.",
        ],
      },
      {
        titre: "Ce qu'il faut vérifier avant d'acheter d'occasion",
        paragraphes: [
          "L'étanchéité et l'état du silicone pour un bac, le fonctionnement réel testé sur place pour un filtre ou une pompe, et l'ancienneté générale du matériel sont les points à contrôler avant de valider un achat d'occasion.",
        ],
      },
      {
        titre: 'Ce qui reste préférable en neuf',
        paragraphes: [
          "Les consommables (masses filtrantes, réactifs de test, nourriture) et le matériel dont l'usure n'est pas visible de l'extérieur, comme une résistance de chauffage, sont plus risqués à acheter d'occasion.",
        ],
      },
      {
        titre: 'Le bon réflexe : tester avant de valider',
        paragraphes: [
          "Lors d'une remise en main propre, demander à voir le matériel en fonctionnement quand c'est possible reste la meilleure garantie avant de finaliser un achat d'occasion.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/cuves', label: 'Voir les aquariums en vente' },
      { href: '/guides/meilleur-aquarium-pour-debutant', label: 'Quel aquarium choisir pour débuter' },
    ],
  },
  {
    slug: 'acclimater-nouveau-poisson-aquarium',
    titre: 'Bien acclimater un nouveau poisson à son arrivée',
    eyebrow: 'Débuter',
    description:
      "La méthode simple pour acclimater un poisson à l'eau de son aquarium après l'achat, et limiter le stress du transport.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: "Pourquoi l'acclimatation est nécessaire",
        paragraphes: [
          "L'eau du sac de transport diffère souvent en température et en paramètres de celle de l'aquarium de destination. Un changement trop brutal stresse fortement le poisson, et peut lui être fatal dans les cas les plus sévères.",
        ],
      },
      {
        titre: 'La méthode du sac flottant',
        paragraphes: [
          "Laisser le sac fermé flotter à la surface du bac pendant 15 à 20 minutes égalise progressivement la température, avant même d'ouvrir le sac.",
        ],
      },
      {
        titre: "Mélanger progressivement l'eau",
        paragraphes: [
          "Une fois le sac ouvert, ajouter un petit volume d'eau du bac toutes les 5 à 10 minutes pendant environ une demi-heure permet aux paramètres de s'équilibrer en douceur plutôt que d'un coup.",
        ],
      },
      {
        titre: "Éviter de transférer l'eau du sac dans le bac",
        paragraphes: [
          "L'eau du magasin ou de l'éleveur peut contenir des germes ou des résidus de traitement. Mieux vaut transférer le poisson à l'épuisette plutôt que de verser directement l'eau du sac dans l'aquarium.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-son-premier-poisson', label: 'Choisir ses premiers poissons' },
      { href: '/guides/reconnaitre-poisson-malade-stresse', label: 'Reconnaître un poisson malade ou stressé' },
    ],
  },
  {
    slug: 'quel-volume-aquarium-choisir-espece',
    titre: "Quel volume d'aquarium choisir selon les poissons envisagés ?",
    eyebrow: 'Débuter',
    description:
      "Comment déterminer le bon volume d'aquarium en fonction des espèces envisagées, de leur taille adulte et de leurs besoins de groupe.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Partir des poissons, pas du meuble disponible',
        paragraphes: [
          "Le bon ordre est de choisir les espèces que l'on souhaite accueillir puis d'en déduire le volume nécessaire, plutôt que l'inverse.",
        ],
      },
      {
        titre: 'Tenir compte de la taille adulte',
        paragraphes: [
          "Un poisson vendu jeune à quelques centimètres peut atteindre une taille bien plus importante une fois adulte. Se renseigner sur la taille adulte de chaque espèce avant l'achat évite de se retrouver avec un bac trop petit quelques mois plus tard.",
        ],
      },
      {
        titre: 'Les espèces qui vivent en groupe',
        paragraphes: [
          "De nombreux poissons (bancs, Corydoras, Tétras) ont besoin d'un nombre minimum d'individus pour se sentir en sécurité, ce qui augmente d'autant le volume nécessaire par rapport à un poisson solitaire.",
        ],
      },
      {
        titre: 'Une marge de sécurité utile',
        paragraphes: [
          "Viser un peu plus grand que le minimum théorique laisse une marge d'erreur sur les paramètres et facilite l'entretien au quotidien, un aquarium plus grand étant paradoxalement souvent plus simple à stabiliser.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-son-premier-poisson', label: 'Choisir ses premiers poissons' },
      { href: '/categorie/cuves', label: 'Voir les aquariums en vente' },
    ],
  },
  {
    slug: 'aquarium-pour-enfant-bonne-idee',
    titre: 'Un aquarium pour un enfant : bonne ou mauvaise idée ?',
    eyebrow: 'Débuter',
    description:
      "Ce qu'il faut anticiper avant d'offrir un aquarium à un enfant : l'entretien réel, les espèces adaptées, et le rôle des parents.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: "L'entretien reste une responsabilité d'adulte",
        paragraphes: [
          "Un enfant peut participer (nourrissage, observation) mais le suivi des paramètres et l'entretien technique restent, dans les faits, à la charge d'un adulte de la maison.",
        ],
      },
      {
        titre: 'Choisir des espèces robustes et tolérantes',
        paragraphes: [
          "Des poissons peu exigeants en paramètres et supportant de petites erreurs d'entretien conviennent mieux à un projet familial qu'une espèce délicate, réservée à un aquariophile plus expérimenté.",
        ],
      },
      {
        titre: 'Un bon projet pédagogique',
        paragraphes: [
          "Suivre le cycle de l'azote, observer le comportement des poissons ou le développement des plantes peut être une bonne initiation à la biologie et à la patience pour un enfant.",
        ],
      },
      {
        titre: 'Éviter les décisions impulsives',
        paragraphes: [
          "Un aquarium engage sur plusieurs années. Mieux vaut en discuter en famille avant l'achat plutôt que de céder à un coup de cœur en animalerie.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-son-premier-poisson', label: 'Choisir ses premiers poissons' },
      { href: '/guides/erreurs-debutant-aquariophilie', label: 'Les erreurs de débutant à éviter' },
    ],
  },
  {
    slug: 'premiere-semaine-nouvel-aquarium',
    titre: "Que faire pendant les premières semaines d'un nouvel aquarium ?",
    eyebrow: 'Débuter',
    description:
      "Le déroulé étape par étape des premières semaines d'un aquarium neuf, du cyclage jusqu'à l'introduction progressive des poissons.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Semaine 1 à 2 : lancer le cyclage',
        paragraphes: [
          "Installer le matériel, démarrer le filtre et suivre les tests d'ammoniac et de nitrites, sans introduire le moindre poisson à ce stade.",
        ],
      },
      {
        titre: 'Semaine 3 à 4 : suivre la montée des nitrites',
        paragraphes: [
          "C'est généralement la période où les nitrites atteignent leur pic avant de redescendre, signe que la population bactérienne du filtre progresse correctement.",
        ],
      },
      {
        titre: 'Fin de cyclage : les premiers poissons',
        paragraphes: [
          "Une fois l'ammoniac et les nitrites retombés à zéro, les premiers poissons robustes peuvent être introduits, en petit nombre plutôt que tous à la fois.",
        ],
      },
      {
        titre: 'Les semaines suivantes : peupler progressivement',
        paragraphes: [
          "Attendre 2 à 3 semaines entre chaque nouvel ajout de poissons laisse le temps au filtre de s'adapter à la charge biologique supplémentaire, sans à-coup pour l'équilibre du bac.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Démarrer un aquarium d’eau douce' },
    ],
  },
  {
    slug: 'cycle-sans-poisson-vs-avec-poisson',
    titre: 'Cyclage sans poisson ou avec poisson : quelle méthode choisir ?',
    eyebrow: 'Comprendre',
    description:
      "Deux méthodes existent pour cycler un aquarium neuf : avec ou sans poisson présent. Leurs différences, avantages et inconvénients.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Le cyclage sans poisson',
        paragraphes: [
          "Une source d'ammoniac (produit dédié ou un peu de nourriture en décomposition) nourrit les bactéries en formation sans exposer d'animal aux pics toxiques. C'est la méthode la plus recommandée aujourd'hui.",
        ],
      },
      {
        titre: 'Le cyclage avec poisson',
        paragraphes: [
          "Historiquement répandu, il expose directement les premiers poissons aux pics d'ammoniac et de nitrites, avec un risque de mortalité ou de stress important pendant les premières semaines.",
        ],
      },
      {
        titre: 'Pourquoi la méthode sans poisson est privilégiée',
        paragraphes: [
          "Elle permet d'attendre la fin complète du cycle avant d'introduire le moindre animal, sans compromis sur son bien-être ni sur celui des poissons suivants.",
        ],
      },
      {
        titre: 'Dans tous les cas, la patience reste la clé',
        paragraphes: [
          "Qu'elle que soit la méthode choisie, un cyclage complet prend généralement 4 à 6 semaines, un délai qu'il vaut mieux anticiper avant même l'achat des poissons.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
      { href: '/guides/premiere-semaine-nouvel-aquarium', label: 'Les premières semaines d’un nouvel aquarium' },
    ],
  },
  {
    slug: 'role-des-plantes-aquarium-equilibre',
    titre: "Le rôle des plantes dans l'équilibre d'un aquarium",
    eyebrow: 'Comprendre',
    description:
      "Au-delà du décor, les plantes jouent un rôle actif dans l'équilibre biologique d'un aquarium. Comment et pourquoi.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Consommer les nutriments en excès',
        paragraphes: [
          "Les plantes absorbent une partie des nitrates et d'autres composés issus des déchets, réduisant d'autant la charge que la filtration biologique doit traiter.",
        ],
      },
      {
        titre: 'Concurrencer les algues',
        paragraphes: [
          "En captant les nutriments disponibles, des plantes bien installées limitent naturellement le développement des algues indésirables.",
        ],
      },
      {
        titre: 'Offrir des cachettes et réduire le stress',
        paragraphes: [
          "Les plantes fournissent des zones de repli pour les poissons timides ou les alevins, ce qui réduit le niveau de stress général dans le bac.",
        ],
      },
      {
        titre: "Un équilibre qui prend du temps à s'installer",
        paragraphes: [
          "Un bac fraîchement planté met plusieurs semaines à tirer pleinement parti de ce rôle, le temps que les plantes développent racines et feuillage.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/plantes-faciles-aquarium-debutant', label: 'Des plantes faciles pour débuter' },
      { href: '/guides/lutter-contre-les-algues-aquarium', label: 'Lutter contre les algues' },
    ],
  },
  {
    slug: 'difference-eau-osmosee-eau-robinet-aquarium',
    titre: "Eau du robinet ou eau osmosée : ce qu'il faut savoir",
    eyebrow: 'Comprendre',
    description:
      "Différences entre l'eau du robinet et l'eau osmosée pour l'aquariophilie, et dans quels cas l'une ou l'autre est préférable.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'L’eau du robinet, un point de départ pour la plupart des bacs',
        paragraphes: [
          "Traitée avec un conditionneur anti-chlore, elle convient à la grande majorité des aquariums d'eau douce communautaires, à condition de vérifier ses paramètres de base (dureté notamment).",
        ],
      },
      {
        titre: 'L’eau osmosée, une eau quasiment vide de minéraux',
        paragraphes: [
          "Obtenue par un osmoseur qui filtre l'eau du robinet, elle est presque totalement dépourvue de minéraux, ce qui la rend utile pour certains projets spécifiques.",
        ],
      },
      {
        titre: "Quand l'eau osmosée devient utile",
        paragraphes: [
          "Un bac récifal, ou l'élevage de poissons qui exigent une eau très douce, tire souvent parti d'une eau osmosée reminéralisée de façon contrôlée.",
        ],
      },
      {
        titre: 'Ne jamais utiliser d’eau osmosée pure sans reminéralisation',
        paragraphes: [
          "Une eau totalement dépourvue de minéraux n'est stable pour aucun poisson. Elle doit être reminéralisée avant utilisation dans la grande majorité des cas.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/parametres-eau-ph-gh-kh', label: 'Comprendre les paramètres de l’eau' },
      { href: '/guides/osmoseur-aquarium-a-quoi-ca-sert', label: 'L’osmoseur : à quoi ça sert' },
    ],
  },
  {
    slug: 'comprendre-la-photoperiode-aquarium',
    titre: "Comprendre la photopériode et son rôle dans l'aquarium",
    eyebrow: 'Comprendre',
    description:
      "Ce qu'est la photopériode d'un aquarium, pourquoi elle influence poissons, plantes et algues, et comment bien la régler.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: "Qu'est-ce que la photopériode",
        paragraphes: [
          "C'est la durée quotidienne pendant laquelle l'éclairage du bac reste allumé, généralement réglée par une prise programmable ou un minuteur intégré.",
        ],
      },
      {
        titre: 'Son rôle pour les plantes',
        paragraphes: [
          "Une photopériode suffisante permet la photosynthèse nécessaire à la croissance des plantes, sans quoi elles s'affaiblissent progressivement.",
        ],
      },
      {
        titre: 'Son rôle pour les poissons',
        paragraphes: [
          "Une alternance jour/nuit régulière rassure les poissons et structure leur comportement (alimentation, repos), un peu comme un rythme circadien.",
        ],
      },
      {
        titre: "Le piège d'une photopériode trop longue",
        paragraphes: [
          "Au-delà de 10 à 12 heures par jour selon les bacs, l'excès de lumière favorise surtout la prolifération d'algues, sans bénéfice supplémentaire pour les plantes.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/eclairage-bac-plante-choisir', label: 'Choisir l’éclairage d’un bac planté' },
      { href: '/guides/lutter-contre-les-algues-aquarium', label: 'Lutter contre les algues' },
    ],
  },
  {
    slug: 'quarantaine-poissons-recifal-pourquoi',
    titre: 'Pourquoi mettre en quarantaine poissons et coraux récifal',
    eyebrow: 'Récifal',
    description:
      "L'intérêt d'un bac de quarantaine avant d'introduire un nouveau poisson ou corail dans un aquarium récifal, et comment le mettre en place simplement.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Le risque d’introduire une maladie',
        paragraphes: [
          "Un poisson ou un corail nouvellement acheté peut porter un parasite ou une maladie invisible à l'œil nu, capable de contaminer tout un bac récifal une fois introduit directement.",
        ],
      },
      {
        titre: 'Un bac de quarantaine simple mais efficace',
        paragraphes: [
          "Un petit volume, un filtre et un chauffage suffisent généralement, sans décor complexe, pour observer le nouvel arrivant pendant quelques semaines.",
        ],
      },
      {
        titre: 'La durée recommandée',
        paragraphes: [
          "Une période de 2 à 4 semaines d'observation permet généralement de repérer un problème avant qu'il ne soit trop tard pour le reste du bac.",
        ],
      },
      {
        titre: 'Un investissement qui protège tout le bac principal',
        paragraphes: [
          "Le coût et l'espace d'un bac de quarantaine restent minimes comparés au risque de perdre plusieurs coraux ou poissons en cas de contamination du bac principal.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/acclimatation-goutte-a-goutte-poissons-coraux', label: 'L’acclimatation goutte à goutte' },
      { href: '/guides/aquarium-recifal-par-ou-commencer', label: 'Démarrer en récifal' },
    ],
  },
  {
    slug: 'eclairage-recifal-choisir-led',
    titre: 'Choisir son éclairage LED pour un aquarium récifal',
    eyebrow: 'Récifal',
    description:
      "Puissance, spectre, intensité : comment choisir un éclairage LED adapté à un aquarium récifal selon les coraux hébergés.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: "Un besoin bien plus élevé qu'en eau douce",
        paragraphes: [
          "Les coraux, en particulier les SPS, ont besoin d'une intensité lumineuse nettement supérieure à celle d'un bac planté d'eau douce classique pour assurer leur photosynthèse symbiotique.",
        ],
      },
      {
        titre: 'Le spectre adapté aux coraux',
        paragraphes: [
          "Une dominante bleue favorise généralement la coloration et la croissance des coraux, en complément d'une composante blanche qui profite aussi à l'observation du bac.",
        ],
      },
      {
        titre: 'Adapter l’intensité selon les espèces',
        paragraphes: [
          "Les coraux mous et LPS tolèrent une lumière plus modérée que les SPS, qui exigent généralement un éclairage plus puissant et une acclimatation progressive à cette intensité.",
        ],
      },
      {
        titre: 'Une acclimatation lumineuse progressive',
        paragraphes: [
          "Un nouveau corail, ou un éclairage neuf plus puissant, doit être introduit progressivement pour éviter un stress lumineux (blanchiment) chez des coraux non habitués.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/coraux-mous-lps-sps-differences', label: 'Coraux mous, LPS, SPS : les différences' },
      { href: '/guides/materiel-recifal-ecumeur-osmolateur-brassage', label: 'Le matériel indispensable en récifal' },
    ],
  },
  {
    slug: 'nourrir-un-aquarium-recifal',
    titre: 'Bien nourrir un aquarium récifal',
    eyebrow: 'Récifal',
    description:
      "Nourrir les poissons mais aussi les coraux d'un aquarium récifal : quelles différences, quelle fréquence et quels pièges éviter.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Nourrir les poissons récifal',
        paragraphes: [
          "Une alimentation variée (granulés, paillettes, nourriture congelée) couvre généralement les besoins des poissons marins, en veillant à ne pas suralimenter dans un volume souvent plus sensible qu'en eau douce.",
        ],
      },
      {
        titre: 'Nourrir les coraux',
        paragraphes: [
          "De nombreux coraux tirent une bonne partie de leur énergie de la photosynthèse via les algues symbiotiques qu'ils hébergent, mais certains profitent aussi d'un apport complémentaire en nourriture fine (phytoplancton, zooplancton).",
        ],
      },
      {
        titre: 'Le risque de suralimentation en récifal',
        paragraphes: [
          "Un excès de nourriture se traduit rapidement par une hausse des nitrates et des phosphates, deux paramètres particulièrement sensibles à surveiller en aquarium récifal.",
        ],
      },
      {
        titre: 'Adapter la fréquence aux paramètres du bac',
        paragraphes: [
          "Un suivi régulier des nitrates et phosphates permet d'ajuster la fréquence de nourrissage plutôt que de suivre une règle fixe, différente d'un bac à l'autre.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/calcium-kh-magnesium-recifal', label: 'Calcium, KH et magnésium en récifal' },
      { href: '/guides/aquarium-recifal-par-ou-commencer', label: 'Démarrer en récifal' },
    ],
  },
  {
    slug: 'choisir-poissons-bassin-jardin',
    titre: 'Quels poissons choisir pour un bassin de jardin ?',
    eyebrow: 'Bassin',
    description:
      "Carpes koï, poissons rouges, autres espèces rustiques : comment choisir les poissons adaptés à un bassin de jardin selon sa taille et son climat.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Les carpes koï',
        paragraphes: [
          "Populaires pour leur robustesse et leurs couleurs, elles demandent néanmoins un bassin de volume conséquent, leur taille adulte étant nettement supérieure à celle d'un poisson rouge.",
        ],
      },
      {
        titre: 'Le poisson rouge, une valeur sûre',
        paragraphes: [
          "Rustique et tolérant à de larges variations de température, il convient à des bassins de taille plus modeste que les koï.",
        ],
      },
      {
        titre: 'Tenir compte du climat local',
        paragraphes: [
          "Dans les régions aux hivers rigoureux, la profondeur du bassin doit permettre d'éviter un gel complet, sous peine de mettre en danger les poissons qui y hivernent.",
        ],
      },
      {
        titre: 'Éviter la surpopulation',
        paragraphes: [
          "Comme en aquarium, un bassin surpeuplé dégrade rapidement la qualité de l'eau. Mieux vaut prévoir un nombre de poissons cohérent avec le volume réel du bassin.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/hivernage-poissons-bassin', label: 'Préparer l’hivernage de son bassin' },
      { href: '/guides/demarrer-bassin-jardin', label: 'Démarrer un bassin de jardin' },
    ],
  },
  {
    slug: 'plantes-bassin-oxygenantes-epuratrices',
    titre: 'Les plantes de bassin : oxygénantes, épuratrices, décoratives',
    eyebrow: 'Bassin',
    description:
      "Le rôle des différentes catégories de plantes de bassin, et comment les combiner pour un bassin équilibré et une eau plus claire.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Les plantes oxygénantes',
        paragraphes: [
          "Immergées, elles participent aux échanges gazeux et concurrencent les algues pour les nutriments disponibles, un rôle proche de celui des plantes d'aquarium.",
        ],
      },
      {
        titre: 'Les plantes épuratrices',
        paragraphes: [
          "Souvent installées en berge ou en zone peu profonde, elles absorbent une partie des nutriments en excès, limitant d'autant la prolifération d'algues.",
        ],
      },
      {
        titre: 'Les plantes décoratives',
        paragraphes: [
          "Nénuphars et autres plantes à fleurs apportent surtout un intérêt visuel, tout en offrant de l'ombrage qui limite aussi la lumière disponible pour les algues.",
        ],
      },
      {
        titre: 'Trouver le bon équilibre',
        paragraphes: [
          "Un bassin qui associe ces trois catégories de plantes tend à s'équilibrer plus naturellement qu'un bassin uniquement décoratif, avec moins de recours à des solutions techniques.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/eau-verte-bassin-solutions', label: 'Lutter contre l’eau verte en bassin' },
      { href: '/guides/demarrer-bassin-jardin', label: 'Démarrer un bassin de jardin' },
    ],
  },
  {
    slug: 'pompe-filtration-bassin-bien-choisir',
    titre: 'Bien choisir sa pompe et sa filtration de bassin',
    eyebrow: 'Bassin',
    description:
      "Débit, filtration mécanique et biologique : comment dimensionner la pompe et le filtre d'un bassin de jardin.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Dimensionner le débit de la pompe',
        paragraphes: [
          "Une règle courante consiste à faire circuler l'intégralité du volume du bassin en une à deux heures, un repère à ajuster selon la charge en poissons et plantes.",
        ],
      },
      {
        titre: 'La filtration mécanique',
        paragraphes: [
          "Elle retient les débris (feuilles, particules) avant qu'ils ne se décomposent dans le bassin, un rôle particulièrement utile à l'automne.",
        ],
      },
      {
        titre: 'La filtration biologique',
        paragraphes: [
          "Comme en aquarium, elle héberge les bactéries qui traitent les déchets azotés produits par les poissons, un rôle essentiel dans un bassin peuplé.",
        ],
      },
      {
        titre: 'Le cas des bassins à koï',
        paragraphes: [
          "Avec des poissons de grande taille et une production de déchets plus importante, un filtre surdimensionné par rapport à un bassin classique est généralement recommandé.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-poissons-bassin-jardin', label: 'Quels poissons choisir pour son bassin' },
      { href: '/categorie/materiel', label: 'Voir le matériel en vente' },
    ],
  },
  {
    slug: 'predateurs-bassin-proteger-poissons',
    titre: 'Protéger les poissons de bassin des prédateurs',
    eyebrow: 'Bassin',
    description:
      "Hérons, chats, prédateurs terrestres : comment protéger les poissons d'un bassin de jardin des menaces les plus courantes.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Le héron, un prédateur redoutable',
        paragraphes: [
          "Capable de vider un bassin en quelques visites, il est attiré par les zones peu profondes qui exposent les poissons. Un filet tendu ou des zones de refuge profondes limitent ce risque.",
        ],
      },
      {
        titre: 'Les chats et autres prédateurs terrestres',
        paragraphes: [
          "Un rebord de bassin surélevé, ou une zone de berge peu accessible, réduit les tentatives de pêche depuis la rive.",
        ],
      },
      {
        titre: 'Les cachettes dans le bassin',
        paragraphes: [
          "Des plantes immergées denses ou des structures type tuyaux et rochers offrent aux poissons un abri immédiat en cas de menace repérée.",
        ],
      },
      {
        titre: 'Un filet, la solution la plus fiable',
        paragraphes: [
          "Un filet correctement tendu au-dessus du bassin reste souvent la protection la plus efficace contre l'ensemble de ces prédateurs, en particulier le héron.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-poissons-bassin-jardin', label: 'Quels poissons choisir pour son bassin' },
      { href: '/guides/hivernage-poissons-bassin', label: 'Préparer l’hivernage de son bassin' },
    ],
  },
  {
    slug: 'vacances-aquarium-que-faire',
    titre: 'Partir en vacances : comment préparer son aquarium',
    eyebrow: 'Entretien',
    description:
      "Nourrissage automatique, entretien avant le départ, personne de confiance : comment préparer son aquarium pour une absence de plusieurs jours.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Un nourrissage automatique fiable',
        paragraphes: [
          "Un distributeur automatique programmé reste plus sûr qu'un bloc de nourriture à dissolution lente, qui peut dégrader la qualité de l'eau s'il se dissout trop vite.",
        ],
      },
      {
        titre: 'Un entretien complet avant le départ',
        paragraphes: [
          "Un changement d'eau et un nettoyage léger juste avant de partir permettent de partir sur des paramètres stables pour toute la durée de l'absence.",
        ],
      },
      {
        titre: 'Éviter de suralimenter avant de partir',
        paragraphes: [
          "Donner une double ration pour « compenser » l'absence est une fausse bonne idée qui dégrade la qualité de l'eau. Les poissons adultes supportent en réalité bien plusieurs jours sans nourriture.",
        ],
      },
      {
        titre: "Prévoir un contact en cas d'imprévu",
        paragraphes: [
          "Demander à une personne de confiance de passer vérifier l'aquarium en cas d'absence prolongée reste une sécurité utile, notamment pour repérer une panne de matériel.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/bien-nourrir-poissons-aquarium', label: 'Bien nourrir ses poissons' },
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: 'Bien faire son changement d’eau' },
    ],
  },
  {
    slug: 'tailler-entretenir-plantes-aquarium',
    titre: 'Bien tailler et entretenir les plantes d’aquarium',
    eyebrow: 'Entretien',
    description:
      "Quand et comment tailler les plantes d'un aquarium planté pour garder un bac équilibré et un décor soigné.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Pourquoi tailler régulièrement',
        paragraphes: [
          "Une plante qui pousse sans être taillée finit par faire de l'ombre aux espèces voisines, ou par flotter en surface une fois trop développée.",
        ],
      },
      {
        titre: 'Les plantes à tiges',
        paragraphes: [
          "Elles se taillent en coupant la tige à la hauteur souhaitée. La partie coupée peut souvent être replantée pour repartir ailleurs dans le bac.",
        ],
      },
      {
        titre: 'Les plantes à rosette et de premier plan',
        paragraphes: [
          "Elles demandent surtout de retirer les feuilles abîmées ou jaunies au fur et à mesure, plutôt qu'une taille franche comme les plantes à tiges.",
        ],
      },
      {
        titre: 'Éviter de tout tailler en une seule fois',
        paragraphes: [
          "Une taille trop importante d'un coup peut déstabiliser temporairement l'équilibre du bac, en réduisant brutalement la capacité des plantes à absorber les nutriments.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/plantes-faciles-aquarium-debutant', label: 'Des plantes faciles pour débuter' },
      { href: '/guides/aquascaping-decor-naturel', label: 'Créer un décor naturel' },
    ],
  },
  {
    slug: 'entretien-filtre-aquarium-bonne-frequence',
    titre: "Entretien du filtre d'aquarium : quelle fréquence et comment procéder",
    eyebrow: 'Entretien',
    description:
      "À quelle fréquence nettoyer le filtre d'un aquarium, et comment le faire sans détruire les bactéries utiles qu'il héberge.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'La fréquence recommandée',
        paragraphes: [
          "Un nettoyage toutes les 4 à 6 semaines convient généralement à la plupart des bacs, à ajuster selon l'encrassement observé et le débit du filtre.",
        ],
      },
      {
        titre: 'Ne jamais tout nettoyer en même temps',
        paragraphes: [
          "Nettoyer l'ensemble des masses filtrantes le même jour détruit une grande partie des bactéries épuratrices. Mieux vaut alterner les masses nettoyées d'une fois sur l'autre.",
        ],
      },
      {
        titre: "Toujours rincer à l'eau du bac",
        paragraphes: [
          "L'eau du robinet, chlorée, tue une partie des bactéries utiles. Rincer les masses biologiques dans de l'eau du bac déjà retirée les préserve beaucoup mieux.",
        ],
      },
      {
        titre: "Vérifier le débit après l'entretien",
        paragraphes: [
          "Un débit qui reste faible après le nettoyage peut signaler une pièce usée (turbine, joint) à vérifier ou à remplacer.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/role-du-filtre-dans-aquarium', label: 'Comprendre le rôle du filtre' },
      { href: '/guides/choisir-filtration-aquarium', label: 'Bien choisir sa filtration' },
    ],
  },
  {
    slug: 'aquarium-eau-trouble-causes',
    titre: "Aquarium à l'eau trouble : causes et solutions",
    eyebrow: 'Entretien',
    description:
      "Eau blanchâtre, laiteuse ou trouble en aquarium : les causes les plus fréquentes et comment retrouver une eau claire.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Une eau trouble et blanchâtre',
        paragraphes: [
          "Souvent liée à une prolifération bactérienne suite à un excès de nourriture ou un bac récemment cyclé, elle se résorbe généralement d'elle-même en quelques jours si la cause est corrigée.",
        ],
      },
      {
        titre: 'Une eau trouble après un nettoyage',
        paragraphes: [
          "Remuer le substrat lors d'un entretien peut temporairement troubler l'eau en remettant en suspension de fines particules, sans gravité particulière.",
        ],
      },
      {
        titre: 'Vérifier les paramètres en priorité',
        paragraphes: [
          "Une eau trouble qui persiste doit d'abord faire l'objet d'un test d'ammoniac et de nitrites, qui peut révéler un déséquilibre du cycle de l'azote.",
        ],
      },
      {
        titre: 'Les bons réflexes',
        paragraphes: [
          "Réduire temporairement la nourriture, effectuer un changement d'eau partiel et éviter de suralimenter en attendant que l'eau se stabilise sont les mesures les plus efficaces.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: 'Bien faire son changement d’eau' },
    ],
  },
  {
    slug: 'bois-flotte-aquarium-preparation',
    titre: 'Bois flotté en aquarium : comment le préparer et l’utiliser',
    eyebrow: 'Décoration',
    description:
      "Pourquoi et comment préparer un bois flotté avant de l'installer en aquarium, pour éviter qu'il ne flotte ou ne colore l'eau trop longtemps.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Pourquoi le bois flotte au départ',
        paragraphes: [
          "Un bois flotté neuf contient de l'air dans ses fibres, ce qui le fait souvent remonter à la surface avant d'être suffisamment gorgé d'eau pour couler naturellement.",
        ],
      },
      {
        titre: "Le faire tremper avant l'installation",
        paragraphes: [
          "Un trempage de plusieurs jours à plusieurs semaines dans un seau d'eau, renouvelée régulièrement, accélère ce processus et limite la coloration de l'eau du bac une fois installé.",
        ],
      },
      {
        titre: "La coloration de l'eau, sans danger",
        paragraphes: [
          "Les tanins libérés par certains bois teintent l'eau en jaune-brun. C'est sans danger pour les poissons, et certaines espèces (bacs biotope Amazonie) en profitent même volontiers.",
        ],
      },
      {
        titre: "Choisir un bois adapté à l'aquariophilie",
        paragraphes: [
          "Tous les bois trouvés en extérieur ne conviennent pas. Mieux vaut choisir un bois spécifiquement vendu pour l'aquariophilie, déjà préparé pour cet usage.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/aquascaping-decor-naturel', label: 'Créer un décor naturel' },
      { href: '/guides/aquarium-biotope-reproduire-milieu-naturel', label: 'Créer un aquarium biotope' },
    ],
  },
  {
    slug: 'roches-pierres-aquarium-lesquelles-choisir',
    titre: 'Quelles roches et pierres choisir pour son décor d’aquarium ?',
    eyebrow: 'Décoration',
    description:
      "Roches inertes ou influençant les paramètres de l'eau : comment choisir les bonnes pierres selon le type de bac et les espèces hébergées.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Les roches inertes',
        paragraphes: [
          "La plupart des roches ornementales vendues pour l'aquariophilie n'influencent pas les paramètres de l'eau, ce qui les rend adaptées à la majorité des bacs communautaires.",
        ],
      },
      {
        titre: 'Les roches qui modifient le pH ou la dureté',
        paragraphes: [
          "Certaines pierres calcaires relâchent des minéraux dans l'eau, ce qui augmente le pH et la dureté. Utile pour un bac de Cichlidés africains, à éviter pour un bac de poissons d'eau douce et acide.",
        ],
      },
      {
        titre: 'Vérifier avant d’introduire une roche non identifiée',
        paragraphes: [
          "Un test au vinaigre (effervescence en présence de calcaire) permet de repérer une roche susceptible d'influencer les paramètres avant de l'installer.",
        ],
      },
      {
        titre: 'La stabilité du montage',
        paragraphes: [
          "Un empilement de roches doit toujours être stable et fixé si nécessaire, un aquarium bien rempli d'eau exerçant une pression capable de faire bouger un montage mal assuré.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-son-substrat-aquarium', label: 'Bien choisir son substrat' },
      { href: '/guides/aquascaping-decor-naturel', label: 'Créer un décor naturel' },
    ],
  },
  {
    slug: 'aquarium-biotope-reproduire-milieu-naturel',
    titre: 'Créer un aquarium biotope qui reproduit un milieu naturel',
    eyebrow: 'Décoration',
    description:
      "Le principe d'un aquarium biotope, qui reproduit fidèlement un milieu naturel précis, et comment s'y prendre pour un premier projet.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Le principe du biotope',
        paragraphes: [
          "Contrairement à un bac communautaire classique, un biotope cherche à reproduire fidèlement les conditions d'un milieu naturel précis : décor, paramètres et espèces originaires de la même zone géographique.",
        ],
      },
      {
        titre: 'Choisir un biotope accessible pour débuter',
        paragraphes: [
          "Un biotope amazonien (bois flotté, feuilles, eau douce et acide, poissons sud-américains) reste l'un des plus accessibles pour un premier projet de ce type.",
        ],
      },
      {
        titre: 'Adapter les paramètres au biotope choisi',
        paragraphes: [
          "Un biotope africain (lac Malawi ou Tanganyika) demande une eau dure et alcaline, à l'opposé d'un biotope amazonien. Les deux ne peuvent pas cohabiter dans les mêmes paramètres.",
        ],
      },
      {
        titre: 'L’intérêt pédagogique du biotope',
        paragraphes: [
          "Au-delà de l'esthétique, ce type de projet pousse à mieux comprendre les besoins réels des espèces choisies, plutôt que de simplement assembler des poissons compatibles sur le papier.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/bois-flotte-aquarium-preparation', label: 'Préparer un bois flotté' },
      { href: '/categorie/vivant', label: 'Voir les poissons en vente' },
    ],
  },
  {
    slug: 'co2-aquarium-plante-utile',
    titre: 'Le CO2 en aquarium planté : utile ou indispensable ?',
    eyebrow: 'Décoration',
    description:
      "Dans quels cas un apport de CO2 devient utile en aquarium planté, et quand il est possible de s'en passer.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Le rôle du CO2 pour les plantes',
        paragraphes: [
          "C'est l'un des éléments de base de la photosynthèse, aux côtés de la lumière et des nutriments. Un manque de CO2 peut limiter la croissance même avec un bon éclairage.",
        ],
      },
      {
        titre: "Les bacs qui peuvent s'en passer",
        paragraphes: [
          "Un aquarium avec des plantes peu exigeantes (Anubias, mousses, Cryptocoryne) et un éclairage modéré se développe généralement bien sans apport de CO2 supplémentaire.",
        ],
      },
      {
        titre: "Quand l'apport devient utile",
        paragraphes: [
          "Un bac fortement planté, avec un éclairage puissant et des espèces exigeantes (tapis de sol, certaines Rotala), tire souvent un net bénéfice d'un apport de CO2 pour éviter un déséquilibre entre lumière et nutriments disponibles.",
        ],
      },
      {
        titre: "Le risque d'un mauvais dosage",
        paragraphes: [
          "Un apport de CO2 mal réglé peut faire chuter le pH de façon dangereuse pour les poissons. Un diffuseur avec compte-bulles et un suivi régulier restent indispensables si cette option est choisie.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/eclairage-bac-plante-choisir', label: 'Choisir l’éclairage d’un bac planté' },
      { href: '/guides/plantes-faciles-aquarium-debutant', label: 'Des plantes faciles pour débuter' },
    ],
  },
  {
    slug: 'epuisette-materiel-manipulation-poissons',
    titre: 'Épuisette et matériel de manipulation : les indispensables',
    eyebrow: 'Matériel',
    description:
      "Épuisette, seau dédié, tuyau de siphon : le petit matériel de manipulation qui simplifie vraiment l'entretien d'un aquarium.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: "L'épuisette, l'outil du quotidien",
        paragraphes: [
          "Indispensable pour attraper un poisson en cas de besoin (quarantaine, déplacement) sans le stresser inutilement avec les mains.",
        ],
      },
      {
        titre: 'Un seau dédié à l’aquarium',
        paragraphes: [
          "Réservé exclusivement à cet usage, il évite tout résidu de produit ménager qui pourrait être toxique pour les poissons en cas de contact avec l'eau du bac.",
        ],
      },
      {
        titre: 'Le tuyau de siphon',
        paragraphes: [
          "Il combine souvent l'aspiration des déchets du substrat et le changement d'eau en une seule opération, un vrai gain de temps au quotidien.",
        ],
      },
      {
        titre: 'Des gants ou une manche dédiée',
        paragraphes: [
          "Pour les manipulations directes dans l'eau (récifal notamment), éviter tout contact avec crèmes, parfums ou résidus de savon protège les habitants du bac.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/nettoyer-aquarium-sans-stresser-poissons', label: 'Nettoyer son aquarium sans stresser ses poissons' },
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: 'Bien faire son changement d’eau' },
    ],
  },
  {
    slug: 'minuterie-programmateur-aquarium-utilite',
    titre: 'Minuterie et programmateur : automatiser son aquarium',
    eyebrow: 'Matériel',
    description:
      "Comment une simple minuterie programmable simplifie l'entretien quotidien d'un aquarium, notamment pour l'éclairage.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Automatiser l’éclairage',
        paragraphes: [
          "Une prise programmable garantit une photopériode régulière, jour après jour, sans dépendre d'y penser chaque soir.",
        ],
      },
      {
        titre: 'Une régularité utile pour les poissons et les plantes',
        paragraphes: [
          "Un cycle jour/nuit stable réduit le stress des poissons et favorise une croissance homogène des plantes.",
        ],
      },
      {
        titre: 'Automatiser d’autres équipements',
        paragraphes: [
          "Une pompe à air, un système de brassage ou un dosage automatique peuvent aussi bénéficier d'une programmation horaire selon les besoins du bac.",
        ],
      },
      {
        titre: 'Un allié pour les absences courtes',
        paragraphes: [
          "Couplée à un nourrisseur automatique, une bonne programmation permet de maintenir un fonctionnement stable pendant une absence de quelques jours.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/comprendre-la-photoperiode-aquarium', label: 'Comprendre la photopériode' },
      { href: '/guides/vacances-aquarium-que-faire', label: 'Préparer son aquarium avant de partir' },
    ],
  },
  {
    slug: 'meuble-aquarium-bien-choisir',
    titre: 'Bien choisir le meuble de son aquarium',
    eyebrow: 'Matériel',
    description:
      "Solidité, niveau, rangement : ce qu'il faut vérifier avant de choisir le meuble qui supportera un aquarium rempli d'eau.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'La solidité avant tout',
        paragraphes: [
          "Un aquarium rempli pèse plusieurs centaines de kilos au-delà de quelques dizaines de litres. Un meuble conçu spécifiquement pour l'aquariophilie est fortement préférable à un meuble de salon classique.",
        ],
      },
      {
        titre: 'Un meuble parfaitement à niveau',
        paragraphes: [
          "Le moindre défaut de mise à niveau peut, sur la durée, exercer une pression inégale sur le fond du bac et fragiliser le collage des vitres.",
        ],
      },
      {
        titre: 'Le rangement pratique',
        paragraphes: [
          "Un meuble fermé permet de dissimuler le matériel technique (filtre externe, dosage, transformateurs) tout en le gardant accessible pour l'entretien.",
        ],
      },
      {
        titre: 'Anticiper l’emplacement final',
        paragraphes: [
          "Un meuble se déplace difficilement une fois l'aquarium rempli. Mieux vaut valider l'emplacement définitif avant la mise en eau plutôt qu'après.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/cuves', label: 'Voir les aquariums en vente' },
      { href: '/guides/quel-volume-aquarium-choisir-espece', label: 'Quel volume choisir selon ses poissons' },
    ],
  },
  {
    slug: 'osmoseur-aquarium-a-quoi-ca-sert',
    titre: 'L’osmoseur : à quoi sert une eau osmosée en aquarium ?',
    eyebrow: 'Matériel',
    description:
      "Comment fonctionne un osmoseur, et dans quels cas il devient un investissement utile pour un aquarium d'eau douce ou récifal.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Le principe de l’osmose inverse',
        paragraphes: [
          "L'eau du robinet est poussée à travers une membrane qui retient la quasi-totalité des minéraux et impuretés, produisant une eau presque pure en sortie.",
        ],
      },
      {
        titre: 'Un intérêt particulier en récifal',
        paragraphes: [
          "L'eau osmosée, reminéralisée avec du sel marin de façon contrôlée, permet de préparer une eau de qualité constante, un critère important pour la stabilité d'un bac récifal.",
        ],
      },
      {
        titre: 'Un intérêt pour certains bacs d’eau douce',
        paragraphes: [
          "Une eau du robinet très dure ou chargée en nitrates peut être coupée avec de l'eau osmosée pour se rapprocher des besoins d'espèces sensibles.",
        ],
      },
      {
        titre: 'Ce que l’osmoseur ne remplace pas',
        paragraphes: [
          "Il ne dispense pas de reminéraliser l'eau avant utilisation, une eau totalement pure n'étant stable pour aucune espèce d'aquarium.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/difference-eau-osmosee-eau-robinet-aquarium', label: 'Eau du robinet ou eau osmosée' },
      { href: '/guides/calcium-kh-magnesium-recifal', label: 'Calcium, KH et magnésium en récifal' },
    ],
  },
  {
    slug: 'aquarium-communautaire-ou-espece-unique',
    titre: 'Bac communautaire ou bac d’espèce : que choisir ?',
    eyebrow: 'Comparatif',
    description:
      "Aquarium communautaire avec plusieurs espèces compatibles, ou bac dédié à une seule espèce : avantages et inconvénients de chaque approche.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Le bac communautaire',
        paragraphes: [
          "Il permet de varier les couleurs et les comportements observés, à condition de bien vérifier la compatibilité des espèces choisies entre elles (température, caractère, taille).",
        ],
      },
      {
        titre: 'Le bac d’espèce',
        paragraphes: [
          "Dédié à une seule espèce, souvent en groupe, il simplifie le choix des paramètres et évite les problèmes de cohabitation, au prix d'une diversité visuelle plus réduite.",
        ],
      },
      {
        titre: 'Le cas des espèces territoriales',
        paragraphes: [
          "Certains poissons (Cichlidés notamment) supportent mal la cohabitation avec d'autres espèces et se prêtent souvent mieux à un bac d'espèce.",
        ],
      },
      {
        titre: 'Notre recommandation pour débuter',
        paragraphes: [
          "Un bac communautaire avec des espèces reconnues comme compatibles reste un bon point de départ. Un bac d'espèce demande généralement une recherche plus poussée en amont.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-son-premier-poisson', label: 'Choisir ses premiers poissons' },
      { href: '/guides/quel-volume-aquarium-choisir-espece', label: 'Quel volume choisir selon ses poissons' },
    ],
  },
  {
    slug: 'led-vs-neon-eclairage-aquarium-comparatif',
    titre: 'Éclairage LED ou néon : quel choix pour son aquarium ?',
    eyebrow: 'Comparatif',
    description:
      "Comparatif entre l'éclairage LED et le néon (tube fluorescent) pour un aquarium : consommation, durée de vie et qualité de lumière.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'La consommation électrique',
        paragraphes: [
          "Une rampe LED consomme généralement bien moins d'électricité qu'un néon classique pour un éclairage équivalent, un avantage qui se ressent sur la durée.",
        ],
      },
      {
        titre: 'La durée de vie',
        paragraphes: [
          "Les LED conservent leurs performances beaucoup plus longtemps qu'un néon, dont l'intensité décline progressivement bien avant qu'il ne cesse de fonctionner.",
        ],
      },
      {
        titre: 'La qualité et la modularité de la lumière',
        paragraphes: [
          "De nombreuses rampes LED permettent de régler l'intensité et parfois le spectre, une souplesse que les tubes néon classiques n'offrent pas.",
        ],
      },
      {
        titre: 'Le cas du matériel déjà en place',
        paragraphes: [
          "Remplacer un néon fonctionnel par une LED n'est pas toujours une priorité immédiate. C'est surtout au moment d'un renouvellement de matériel que la LED s'impose aujourd'hui comme le choix par défaut.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/eclairage-bac-plante-choisir', label: 'Choisir l’éclairage d’un bac planté' },
      { href: '/guides/eclairage-recifal-choisir-led', label: 'Choisir son éclairage LED en récifal' },
    ],
  },
  {
    slug: 'filtre-interne-ou-externe-comparatif',
    titre: 'Filtre interne ou externe : lequel choisir ?',
    eyebrow: 'Comparatif',
    description:
      "Différences entre un filtre interne et un filtre externe pour aquarium, et dans quels cas privilégier l'un ou l'autre.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'Le filtre interne',
        paragraphes: [
          "Installé directement dans le bac, il est généralement plus abordable et plus simple à entretenir, mais prend de la place visible dans l'aquarium et convient mieux aux volumes modestes.",
        ],
      },
      {
        titre: 'Le filtre externe',
        paragraphes: [
          "Installé sous le meuble, il libère entièrement l'espace visible du bac et offre souvent un volume de masses filtrantes plus important, un atout pour les bacs de grand volume ou fortement peuplés.",
        ],
      },
      {
        titre: 'L’entretien au quotidien',
        paragraphes: [
          "Un filtre interne se nettoie plus rapidement sur place, tandis qu'un filtre externe demande de le débrancher et de le sortir, une opération un peu plus longue mais moins fréquente.",
        ],
      },
      {
        titre: 'Notre recommandation selon le volume',
        paragraphes: [
          "Un filtre interne suffit généralement jusqu'à un certain volume, au-delà duquel un filtre externe devient souvent plus adapté pour maintenir une bonne qualité d'eau.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-filtration-aquarium', label: 'Bien choisir sa filtration' },
      { href: '/guides/quel-filtre-choisir-selon-volume', label: 'Quel filtre choisir selon le volume' },
    ],
  },
  {
    slug: 'aquarium-eau-froide-ou-tropical',
    titre: 'Aquarium d’eau froide ou tropical : quelle différence ?',
    eyebrow: 'Comparatif',
    description:
      "Différences entre un aquarium d'eau froide (sans chauffage) et un aquarium tropical, et comment choisir selon les espèces envisagées.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: 'L’aquarium tropical',
        paragraphes: [
          "Le plus répandu, il maintient une température stable généralement comprise entre 24 et 28°C grâce à un chauffage, adaptée à la grande majorité des poissons d'ornement vendus en animalerie.",
        ],
      },
      {
        titre: 'L’aquarium d’eau froide',
        paragraphes: [
          "Sans chauffage, il convient à des espèces qui tolèrent ou préfèrent une température plus basse, comme certains poissons rouges ou certaines espèces originaires de zones tempérées.",
        ],
      },
      {
        titre: 'Ne pas confondre eau froide et bassin extérieur',
        paragraphes: [
          "Un aquarium d'eau froide reste un bac d'intérieur à température ambiante, différent d'un bassin de jardin exposé aux variations saisonnières extérieures.",
        ],
      },
      {
        titre: 'Le risque de mélanger les deux besoins',
        paragraphes: [
          "Un poisson tropical placé dans un bac non chauffé, ou l'inverse, subit un stress thermique durable qui affecte sa santé sur le long terme. Le choix du type de bac doit précéder celui des espèces.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/quel-volume-aquarium-choisir-espece', label: 'Quel volume choisir selon ses poissons' },
      { href: '/guides/choisir-poissons-bassin-jardin', label: 'Quels poissons choisir pour son bassin' },
    ],
  },
];

export function fetchGuideParSlug(slug: string): Guide | null {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}
