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
];

export function fetchGuideParSlug(slug: string): Guide | null {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}
