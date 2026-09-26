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
];

export function fetchGuideParSlug(slug: string): Guide | null {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}
