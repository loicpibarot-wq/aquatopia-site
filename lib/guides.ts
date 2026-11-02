// Contenu du blog/guides — articles de fond écrits une bonne fois pour
// toutes ici (pas de CMS externe pour l'instant : le volume reste gérable
// à la main, et ça évite une dépendance supplémentaire pour un site qui n'a
// pas besoin d'être mis à jour par un non-développeur).
export type Guide = {
  slug: string;
  titre: string;
  eyebrow: string;
  description: string; // meta description + accroche affichée sur la liste
  datePublication: string; // ISO, sert au schema.org et à l'affichage
  // `liste` (facultatif) : étapes ou points affichés en liste à puces sous les paragraphes.
  sections: { titre?: string; image?: { src: string; alt: string }; paragraphes: string[]; liste?: string[] }[];
  liensUtiles: { href: string; label: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: 'demarrer-aquarium-eau-douce',
    titre: "Comment démarrer un aquarium d'eau douce : le tutoriel complet pour débutants",
    eyebrow: 'Débuter',
    description:
      "Tutoriel pas à pas pour démarrer un aquarium d'eau douce quand on débute : taille du bac, matériel, installation, eau, cyclage, premiers poissons et entretien, dans le bon ordre.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Démarrer un aquarium d'eau douce est à la portée de tout le monde, à condition de suivre les étapes dans l'ordre et de ne pas se précipiter sur les poissons. Ce tutoriel détaille les 8 étapes d'un démarrage, de l'achat du bac aux premiers poissons, puis à l'entretien de tous les jours.",
          "Comptez environ 4 à 6 semaines entre l'installation et l'arrivée des premiers poissons. Ce temps n'est pas perdu : c'est lui qui évite la première cause de mortalité en aquarium neuf.",
        ],
      },
      {
        titre: 'Avant de commencer : les 3 règles du débutant',
        paragraphes: [],
        liste: [
          "Le bac vient avant les poissons : on installe et on cycle d'abord, on achète les poissons ensuite.",
          "Un seul ajout à la fois, avec plusieurs semaines d'observation entre deux.",
          "Moins de nourriture et plus de patience : la plupart des problèmes viennent d'un excès, pas d'un manque.",
        ],
      },
      {
        titre: 'Étape 1 : choisir la taille de son aquarium',
        image: { src: '/guides/eau-douce/etape-1-volume-bac.webp', alt: "Comparaison de trois volumes d’aquarium d’eau douce : moins de 60 L, de 60 à 200 L (idéal pour débuter) et plus de 200 L" },
        paragraphes: [
          "Contrairement à une idée reçue, un petit aquarium est plus difficile à équilibrer qu'un grand : les paramètres de l'eau (température, pH, taux de déchets) y varient beaucoup plus vite. Pour un premier bac, mieux vaut viser au minimum 54 à 60 litres plutôt qu'un petit bac ou un bocal, qui laissent très peu de marge d'erreur.",
          "Un bac de 60 à 200 litres est un bon compromis : assez stable pour pardonner les petites erreurs, sans budget ni poids excessifs. Partez toujours des poissons que vous voulez accueillir, puis déduisez-en le volume, plutôt que l'inverse. Le simulateur d'Aquatopia peut vous y aider.",
        ],
      },
      {
        titre: 'Étape 2 : rassembler le matériel',
        image: { src: '/guides/eau-douce/etape-2-materiel.webp', alt: "Le matériel d’un aquarium d’eau douce : aquarium, filtre, chauffage, éclairage, substrat, décor, thermomètre, kit de test, conditionneur d’eau et épuisette" },
        paragraphes: [
          "Avant de remplir quoi que ce soit, achetez et vérifiez tout le matériel. Voici la liste de base :",
        ],
        liste: [
          "L'aquarium et son meuble, parfaitement de niveau et capables de supporter le poids de l'eau.",
          "Un filtre adapté au volume du bac.",
          "Un chauffage avec thermostat (sauf pour un bac dédié à des espèces d'eau froide) et un thermomètre.",
          "Un éclairage, de préférence LED, avec une minuterie.",
          "Un substrat (sable ou gravier fin) et du décor : racines, roches, plantes.",
          "Un kit de test d'eau : ammoniac, nitrites, nitrates et pH.",
          "Un conditionneur d'eau anti-chlore, pour rendre l'eau du robinet utilisable.",
          "Une épuisette et un seau réservé à l'aquarium.",
        ],
      },
      {
        titre: 'Étape 3 : installer le bac',
        image: { src: '/guides/eau-douce/etape-3-installer-le-bac.webp', alt: "Installation d’un aquarium avant remplissage : meuble de niveau, substrat rincé et décor posé, filtre et chauffage installés mais pas branchés" },
        paragraphes: [
          "Avant de mettre la moindre goutte d'eau, installez et préparez tout.",
        ],
        liste: [
          "Placez le meuble et l'aquarium à l'endroit définitif, de niveau, à l'écart du soleil direct et des sources de chaleur, près d'une prise de courant.",
          "Rincez le substrat et le décor à l'eau claire, sans savon ni produit : le sable de nombreuses marques fait un nuage de poussière si on ne le rince pas.",
          "Installez le substrat, puis le décor, puis les plantes. Prévoyez des cachettes pour les futurs poissons.",
          "Installez le filtre, le chauffage et le thermomètre, sans les brancher tant que le bac est vide.",
        ],
      },
      {
        titre: 'Étape 4 : remplir et traiter l’eau',
        image: { src: '/guides/eau-douce/etape-4-remplir-et-traiter-leau.webp', alt: "Remplir un aquarium : conditionneur anti-chlore dans l’eau du robinet, eau versée doucement sur une assiette, température de 24 à 26 °C" },
        paragraphes: [],
        liste: [
          "Ajoutez un conditionneur anti-chlore à l'eau du robinet, en suivant la dose indiquée sur le flacon.",
          "Versez l'eau doucement, sur une assiette posée dans le bac, pour ne pas déplacer le substrat ni abîmer le décor.",
          "Une fois le bac rempli, branchez le filtre et le chauffage, et réglez la température autour de 24 à 26 °C pour un bac tropical.",
          "Allumez l'éclairage environ 6 à 8 heures par jour : un éclairage trop long fait pousser les algues.",
        ],
      },
      {
        titre: 'Étape 5 : lancer le cycle (4 à 6 semaines)',
        image: { src: '/guides/eau-douce/etape-5-cycle.webp', alt: "Courbes du cycle de l’azote en aquarium d’eau douce sur 6 semaines : ammoniaque, nitrites puis nitrates, bac cyclé à partir de la semaine 5" },
        paragraphes: [
          "C'est l'étape la plus souvent négligée par les débutants. Avant d'introduire le moindre poisson, l'aquarium doit être « cyclé » : une population de bactéries bénéfiques doit s'installer dans le filtre pour transformer l'ammoniac toxique en nitrites, puis en nitrates beaucoup moins nocifs.",
          "La méthode la plus recommandée aujourd'hui est le cyclage sans poisson : on ajoute une source d'ammoniac dans l'eau et on suit sa transformation avec le kit de test. Il faut généralement compter 4 à 6 semaines.",
        ],
        liste: [
          "Testez l'ammoniac, les nitrites et les nitrates chaque semaine, et notez les résultats.",
          "Les nitrites atteignent généralement leur pic vers les semaines 3 à 4 avant de redescendre.",
          "Le cycle est terminé quand l'ammoniac et les nitrites retombent à zéro en moins de 24 heures après un ajout.",
        ],
      },
      {
        titre: 'Étape 6 : vérifier l’eau avant le premier poisson',
        image: { src: '/guides/eau-douce/etape-6-verifier-leau.webp', alt: "Paramètres d’eau à vérifier avant les poissons : température, pH, ammoniaque et nitrites à zéro, nitrates faibles" },
        paragraphes: [
          "Quand le cycle est terminé, contrôlez que le bac est dans les bonnes plages. Pour un bac tropical de communauté, on vise généralement :",
        ],
        liste: [
          "Température : 24 à 26 °C.",
          "pH : entre 6,5 et 7,5, que tolère la plupart des poissons d'eau douce tropicaux (certaines espèces comme les discus ou les scalaires préfèrent une eau plus acide).",
          "Ammoniac : zéro.",
          "Nitrites : zéro.",
          "Nitrates : faibles, que les changements d'eau réguliers maintiennent bas.",
        ],
      },
      {
        titre: 'Étape 7 : ajouter les premiers poissons',
        image: { src: '/guides/eau-douce/etape-7-premiers-poissons.webp', alt: "Introduire les premiers poissons : peu de poissons robustes, acclimatation au sac flottant, un ajout toutes les 2 à 3 semaines" },
        paragraphes: [
          "Une fois le bac cyclé, introduisez les poissons progressivement, en commençant par un petit groupe d'espèces robustes et adaptées aux débutants, plutôt que de peupler l'aquarium d'un coup. Pour choisir, consultez notre guide sur les premiers poissons et les fiches espèces.",
          "Acclimatez chaque nouveau poisson : laissez le sac fermé flotter 15 à 20 minutes à la surface du bac, puis ajoutez un petit volume d'eau du bac toutes les 5 à 10 minutes pendant environ une demi-heure. Transférez ensuite le poisson à l'épuisette, sans verser l'eau du sac dans l'aquarium.",
          "Attendez 2 à 3 semaines entre chaque nouvel ajout : le filtre a besoin de ce temps pour s'adapter à la charge supplémentaire.",
        ],
      },
      {
        titre: 'Étape 8 : mettre en place la routine d’entretien',
        image: { src: '/guides/eau-douce/etape-8-routine-entretien.webp', alt: "Routine d’entretien d’un aquarium d’eau douce : nourrir chaque jour, changer 10 à 20 % de l’eau chaque semaine, rincer le filtre au besoin" },
        paragraphes: [],
        liste: [
          "Chaque jour : nourrissez une à deux fois, avec ce que les poissons consomment en 2 à 3 minutes, et observez-les.",
          "Chaque semaine : changez 10 à 20 % de l'eau, en siphonnant le substrat, avec une eau traitée à température proche de celle du bac, et faites un test d'eau.",
          "Au besoin : rincez les masses filtrantes dans de l'eau du bac prélevée lors d'un changement d'eau, jamais à l'eau du robinet, qui détruirait une partie des bactéries utiles.",
        ],
      },
      {
        titre: 'Les erreurs classiques à éviter',
        paragraphes: [],
        liste: [
          "Introduire des poissons avant la fin du cyclage.",
          "Surpeupler l'aquarium dès le départ.",
          "Suralimenter : c'est la cause la plus fréquente de pics d'ammoniac.",
          "Négliger les tests d'eau réguliers, en particulier pendant les premières semaines.",
          "Nettoyer le filtre à l'eau du robinet ou changer toute l'eau d'un coup.",
        ],
      },
      {
        titre: 'Récapitulatif : un calendrier réaliste',
        paragraphes: [],
        liste: [
          "Semaine 1 : installation du bac, remplissage, lancement du cycle.",
          "Semaines 1 à 6 : cyclage, tests hebdomadaires, aucun poisson.",
          "Après le cycle : un petit groupe de poissons robustes.",
          "Ensuite : un nouvel ajout toutes les 2 à 3 semaines, au rythme du bac.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/simulateur', label: 'Essayer le simulateur pour choisir vos poissons et dimensionner votre bac' },
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote en détail' },
      { href: '/guides/choisir-son-premier-poisson', label: 'Quels poissons choisir pour débuter' },
      { href: '/guides/acclimater-nouveau-poisson-aquarium', label: 'Bien acclimater un nouveau poisson' },
      { href: '/guides/parametres-eau-ph-gh-kh', label: 'pH, GH, KH : comprendre les paramètres de l’eau' },
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: "Changement d'eau : fréquence et bonne méthode" },
      { href: '/guides/bien-nourrir-poissons-aquarium', label: 'Bien nourrir ses poissons' },
      { href: '/categorie/cuves', label: 'Voir les aquariums en vente' },
      { href: '/biotope/eau-douce', label: "Toutes les annonces d'eau douce" },
    ],
  },
  {
    slug: 'cycle-de-lazote-aquarium',
    titre: "Le cycle de l'azote en aquariophilie : pourquoi c'est essentiel",
    eyebrow: 'Comprendre',
    description:
      "Ammoniac, nitrites, nitrates : comprendre le cycle de l'azote pour éviter la première cause de mortalité des poissons en aquarium neuf.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Le cycle de l'azote est le mécanisme invisible qui rend la vie possible dans un aquarium. Mal compris, il est la première cause de mortalité dans les bacs neufs. Bien maîtrisé, il garantit une eau saine pour des années. Voici ce qu'il faut en retenir avant d'acheter son premier poisson.",
        ],
      },
      {
        titre: "Pourquoi le cycle de l'azote est vital",
        image: { src: '/guides/sections/cycle-de-lazote-aquarium/1.webp', alt: "Chaîne de transformation : déchets, ammoniac, nitrites, nitrates puis évacuation par les changements d’eau" },
        paragraphes: [
          "Les déjections des poissons et les restes de nourriture se décomposent en ammoniac, une substance toxique même à faible dose. Dans un aquarium équilibré, des bactéries installées dans le filtre et le substrat transforment cet ammoniac en nitrites — également toxiques — puis en nitrates, beaucoup moins nocifs et éliminés par les changements d'eau réguliers.",
          "La toxicité de l'ammoniac dépend du pH et de la température : plus l'eau est basique et chaude, plus la fraction toxique est élevée. Les nitrites, eux, empêchent le sang des poissons de transporter correctement l'oxygène. Seuls les nitrates, produits en dernier, sont tolérés à des concentrations modérées, et les plantes les consomment en partie.",
        ],
      },
      {
        titre: "Combien de temps dure un cyclage",
        image: { src: '/guides/sections/cycle-de-lazote-aquarium/2.webp', alt: "Frise de 0 à 6 semaines : un cyclage dure généralement de 4 à 6 semaines selon la température, la filtration et la source d’ammoniac" },
        paragraphes: [
          "Il faut généralement compter 4 à 6 semaines pour qu'une population bactérienne suffisante s'installe dans un aquarium neuf. Ce délai varie selon la température, le type de filtration et la source d'ammoniac utilisée pour amorcer le cycle.",
          "Les bactéries nitrifiantes se développent mieux entre 25 et 30 °C, et ralentissent nettement sous 18 °C. Utiliser des mousses ou de la matière filtrante prélevées dans un aquarium déjà stable (avec l'accord de son propriétaire) peut raccourcir le délai à quelques jours, car on apporte directement la colonie. Des bactéries en flacon existent aussi, avec des résultats variables.",
        ],
      },
      {
        titre: "Comment cycler son bac avant d'introduire des poissons",
        image: { src: '/guides/sections/cycle-de-lazote-aquarium/3.webp', alt: "Du flacon d’ammoniac pur au bac sans poisson, puis tests à zéro en moins de 24 heures après un ajout" },
        paragraphes: [
          "La méthode la plus recommandée aujourd'hui est le « cyclage sans poisson » : on ajoute une source d'ammoniac pur dans l'eau et on suit sa transformation progressive en nitrites puis en nitrates à l'aide d'un kit de test, jusqu'à ce que l'ammoniac et les nitrites retombent à zéro en moins de 24h après un ajout.",
          "En pratique, on vise une concentration d'environ 2 mg/L d'ammoniac. On teste tous les jours ou tous les deux jours : l'ammoniac baisse d'abord, puis les nitrites montent, puis baissent à leur tour, tandis que les nitrates augmentent. Quand les deux premiers retombent à zéro en 24 heures, on effectue un gros changement d'eau pour ramener les nitrates à un niveau raisonnable, et on peut introduire les premiers poissons, progressivement. Pensez à utiliser un conditionneur d'eau pour neutraliser le chlore et les chloramines du robinet, qui tueraient les bactéries.",
        ],
      },
      {
        titre: "Les signes d'un bac non cyclé",
        image: { src: '/guides/sections/cycle-de-lazote-aquarium/4.webp', alt: "Eau trouble, poissons en surface et pic au test : le bon réflexe est un changement d’eau partiel, jamais suralimenter" },
        paragraphes: [
          "Une eau trouble, des poissons qui restent près de la surface à respirer rapidement, ou un pic soudain d'ammoniac ou de nitrites au test sont des signes qu'un aquarium n'est pas encore stabilisé — la réaction à avoir est un changement d'eau partiel immédiat, jamais une suralimentation ou un ajout de poissons supplémentaires.",
          "Si un poisson a déjà été introduit, changez 30 à 50 % de l'eau chaque fois que l'ammoniac ou les nitrites dépassent 0,25 mg/L, nourrissez très peu et surveillez les tests chaque jour jusqu'au retour à zéro.",
        ],
      },
      {
        titre: "Entretenir le cycle une fois établi",
        image: { src: '/guides/sections/cycle-de-lazote-aquarium/5.webp', alt: "Changements d’eau de 10 à 20 % par semaine et rinçage des masses filtrantes dans l’eau du bac plutôt qu’au robinet" },
        paragraphes: [
          "Une fois le bac cyclé, des changements d'eau partiels réguliers (10 à 20 % par semaine en général) suffisent à maintenir l'équilibre. Il faut en revanche éviter de nettoyer excessivement les masses filtrantes à l'eau du robinet, ce qui détruirait une partie des bactéries bénéfiques : un rinçage dans l'eau de l'aquarium prélevée lors d'un changement d'eau est suffisant.",
          "Une panne de courant de plusieurs heures peut aussi faire souffrir les bactéries du filtre, qui manquent d'oxygène quand l'eau cesse de circuler. Après une longue coupure, testez l'eau avant de reprendre un rythme normal. De même, ajouter beaucoup de poissons d'un seul coup provoque souvent un « mini-cycle » : la population bactérienne doit s'adapter à une charge de déchets plus élevée.",
        ],
      },
      {
        titre: "Les paramètres à viser",
        paragraphes: [
          "Un bac stabilisé présente des valeurs simples à retenir :",
        ],
        liste: [
          "Ammoniac (NH₃/NH₄⁺) : 0 mg/L.",
          "Nitrites (NO₂⁻) : 0 mg/L.",
          "Nitrates (NO₃⁻) : idéalement sous 25 mg/L, à surveiller au-delà de 40 mg/L.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Retour au guide de démarrage' },
      { href: '/guides/aquarium-eau-trouble-causes', label: 'Aquarium à l’eau trouble : causes et solutions' },
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: 'Bien faire son changement d’eau' },
      { href: '/guides/parametres-eau-ph-gh-kh', label: 'pH, GH, KH : les paramètres de l’eau' },
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
        paragraphes: [
          "Le choix des premiers poissons conditionne la réussite du bac. Les espèces vendues en animalerie ne sont pas toutes adaptées à un débutant, et certaines grandissent bien plus que prévu. Voici les critères et les espèces qui facilitent un bon départ.",
        ],
      },
      {
        titre: "Les critères pour bien choisir",
        image: { src: '/guides/sections/choisir-son-premier-poisson/1.webp', alt: "Quatre critères pour choisir un poisson : taille adulte, caractère, besoins en eau et vie en groupe" },
        paragraphes: [
          "Avant de choisir une espèce, il faut regarder sa taille adulte (souvent bien supérieure à la taille en animalerie), son caractère (paisible ou territorial), ses besoins spécifiques en eau, et si elle doit être maintenue en groupe — beaucoup de poissons d'eau douce sont des espèces de banc qui souffrent d'être maintenues seules.",
          "Vérifiez aussi la compatibilité avec les autres espèces et l'étage occupé dans le bac : surface, milieu ou fond. Un bac bien composé associe des poissons occupant des zones différentes. Choisissez des individus actifs, aux couleurs vives, sans lésions, avec un ventre ni creusé ni gonflé, et évitez les bacs d'animalerie où se trouve un poisson malade ou mort.",
        ],
      },
      {
        titre: "De bons poissons pour débuter",
        image: { src: '/guides/sections/choisir-son-premier-poisson/2.webp', alt: "Cinq poissons conseillés aux débutants : Guppy, Platy, Corydoras, Ancistrus et Danio zébré" },
        paragraphes: [
          "Le Guppy et le Platy sont robustes et tolèrent de petites variations de paramètres. Les Corydoras, poissons de fond paisibles à maintenir en groupe, et l'Ancistrus, efficace contre les algues, complètent bien un bac communautaire. Le Danio zébré est également une valeur sûre, actif et résistant.",
          "Les Guppys se reproduisent très facilement : pour éviter une explosion démographique, gardez un mâle pour deux ou trois femelles, ou des poissons d'un même sexe. Les Danios et les Corydoras se maintiennent en groupe d'au moins six individus. Les Rasboras (heteromorpha) et les Néons conviennent à un bac stabilisé, en groupes de huit à dix.",
        ],
      },
      {
        titre: "Des poissons à éviter en tant que débutant",
        image: { src: '/guides/sections/choisir-son-premier-poisson/3.webp', alt: "Quatre poissons à éviter pour un premier aquarium : Combattant, Discus, gros cichlidés et poisson rouge" },
        paragraphes: [
          "Le Combattant (Betta) est intéressant mais territorial : deux mâles ne peuvent jamais cohabiter, et certains poissons à nageoires longues peuvent le stresser. Le Discus demande une eau très stable et des paramètres précis, peu adaptés à un premier bac. Les gros cichlidés nécessitent des volumes bien supérieurs à ce qu'on imagine au départ, et le poisson rouge, souvent recommandé à tort pour débuter, a besoin d'un très grand volume et d'une eau plus fraîche que la plupart des poissons tropicaux.",
          "D'autres poissons très courants posent problème : le Pléco commun dépasse 40 centimètres, le Cichlidé Oscar demande un bac de plusieurs centaines de litres, et les Barbus tigrés mordillent les nageoires des voisins. Posez-vous toujours la question de la taille adulte.",
        ],
      },
      {
        titre: "Les crevettes, une bonne alternative",
        image: { src: '/guides/sections/choisir-son-premier-poisson/4.webp', alt: "Crevettes Red Cherry dans un aquarium planté et flacon de traitement au cuivre barré, toxique pour les crevettes" },
        paragraphes: [
          "La crevette Red Cherry est une excellente option pour découvrir l'aquariophilie : robuste, discrète, et utile pour limiter les algues, à condition d'éviter tout traitement à base de cuivre, toxique pour les invertébrés.",
          "Elle se reproduit facilement dans un bac mûr, avec des cachettes (mousses, plantes). Évitez toutefois de la mélanger avec de gros poissons, qui les mangent. Un bac de crevettes demande surtout une eau stable et sans polluants.",
        ],
      },
      {
        titre: "Comment composer un premier peuplement",
        paragraphes: [
          "Pour un bac de 54 à 100 litres, vous pouvez par exemple associer :",
        ],
        liste: [
          "Un groupe de six Corydoras pour le fond.",
          "Un banc de huit Rasboras ou de Néons pour le milieu de l'eau.",
          "Quelques Guppys ou Platys pour la couleur et le dynamisme.",
          "Une crevette ou quelques escargots pour le nettoyage.",
        ],
      },
      {
        titre: "L'introduction des poissons",
        paragraphes: [
          "Quel que soit le choix, n'introduisez pas tous les poissons le même jour : commencez par un tiers du peuplement prévu et attendez deux à trois semaines avant d'ajouter la suite. Acclimatez chaque poisson avec soin et mettez en quarantaine les nouveaux arrivants si vous avez déjà un bac occupé. Enfin, achetez de préférence chez un éleveur ou un magasin de confiance, qui peut vous renseigner sur l'origine des poissons.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Retour au guide de démarrage' },
      { href: '/categorie/vivant', label: 'Voir les annonces de poissons et invertébrés' },
      { href: '/guides/quel-volume-aquarium-choisir-espece', label: 'Quel volume d’aquarium choisir' },
      { href: '/guides/acclimater-nouveau-poisson-aquarium', label: 'Bien acclimater un nouveau poisson' },
    ],
  },
  {
    slug: 'aquarium-recifal-par-ou-commencer',
    titre: 'Aquarium récifal pour débutant : le tutoriel complet pour démarrer un bac corallien',
    eyebrow: 'Récifal',
    description:
      "Tutoriel pas à pas pour démarrer un aquarium récifal quand on débute : volume, matériel, installation, eau de mer, cycle, premiers poissons et premiers coraux, dans le bon ordre.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Un aquarium récifal (ou aquarium corallien) est un bac d'eau de mer où l'on élève des coraux, avec ou sans poissons. C'est plus exigeant que l'eau douce, mais tout à fait faisable pour un débutant qui suit les étapes dans l'ordre. Ce tutoriel détaille les 9 étapes d'un démarrage, de l'achat du bac aux premiers coraux.",
          "Comptez environ 2 mois entre l'installation et les premiers coraux. Cette durée n'est pas du temps perdu : c'est ce qui sépare un bac qui réussit d'un bac qui s'effondre.",
        ],
      },
      {
        titre: 'Avant de commencer : les 3 règles du récifal',
        paragraphes: [],
        liste: [
          "Allez lentement : un seul ajout à la fois (un poisson, un corail), puis plusieurs semaines d'observation.",
          "Mesurez régulièrement : un test par semaine vaut mieux que mille conseils lus sur un forum.",
          "Visez la stabilité, pas la perfection : un paramètre un peu éloigné mais constant fait moins de dégâts qu'un paramètre idéal qui varie sans cesse.",
        ],
      },
      {
        titre: 'Étape 1 : choisir le volume de son bac',
        image: { src: '/guides/recifal/etape-1-volume-bac.webp', alt: "Comparaison de trois volumes d’aquarium récifal : moins de 60 L, 100 à 250 L (idéal pour débuter) et plus de 300 L" },
        paragraphes: [
          "Plus le volume est grand, plus les paramètres varient lentement et plus vous avez le temps de réagir. Pour un premier bac, visez de 100 à 250 litres : c'est un bon compromis entre stabilité, budget et entretien.",
          "Les nano-bacs (moins de 60 litres) sont séduisants, mais l'évaporation, la température et la salinité y bougent très vite. Ils conviennent mieux à quelqu'un qui a déjà de l'expérience. Le simulateur d'Aquatopia peut vous aider à dimensionner votre projet.",
        ],
      },
      {
        titre: 'Étape 2 : rassembler le matériel',
        image: { src: '/guides/recifal/etape-2-materiel.webp', alt: "Le matériel d’un aquarium récifal : aquarium, écumeur, pompes de brassage, chauffage, éclairage LED, osmolateur, osmoseur, réfractomètre, kits de test et décanteur" },
        paragraphes: [
          "Avant de remplir quoi que ce soit, achetez et vérifiez tout le matériel. Voici la liste de base :",
        ],
        liste: [
          "L'aquarium et son meuble, parfaitement de niveau et capables de supporter le poids (l'eau de mer pèse environ 1,03 kg par litre).",
          "Un écumeur protéinique pour retirer les déchets organiques avant qu'ils ne se dégradent.",
          "Des pompes de brassage : de l'ordre de 10 à 20 fois le volume du bac par heure pour des coraux mous et LPS.",
          "Un chauffage avec thermostat fiable.",
          "Un éclairage LED au spectre adapté aux coraux, avec une minuterie.",
          "Un osmolateur, qui compense l'évaporation avec de l'eau osmosée pour garder la salinité stable.",
          "Un osmoseur (ou une source d'eau osmosée) et du sel marin de qualité récifale.",
          "Un réfractomètre pour mesurer la salinité (les densimètres à aiguille sont peu précis).",
          "Des tests : KH, calcium, magnésium, nitrates, phosphates, ammoniaque et nitrites.",
          "Optionnel : un décanteur (sump), pour cacher le matériel et gagner du volume d'eau.",
        ],
      },
      {
        titre: 'Étape 3 : installer le bac à sec',
        image: { src: '/guides/recifal/etape-3-installer-a-sec.webp', alt: "Installation à sec d’un aquarium récifal : meuble de niveau, test d’étanchéité de 24 h et roches stables avec de l’espace derrière" },
        paragraphes: [
          "Avant de mettre la moindre goutte d'eau de mer, installez et testez tout.",
        ],
        liste: [
          "Placez le meuble et l'aquarium à l'endroit définitif, à l'écart du soleil direct et des sources de chaleur, avec une prise de courant protégée.",
          "Remplissez d'abord d'eau douce pour vérifier l'étanchéité et le bon fonctionnement des pompes pendant 24 heures.",
          "Videz, puis installez le sable d'aragonite (fin et peu épais).",
          "Disposez les roches en laissant de la place derrière pour que l'eau circule : une zone sans courant accumule les déchets. Vérifiez qu'elles sont stables et ne reposent pas sur le verre.",
        ],
      },
      {
        titre: 'Étape 4 : préparer l’eau de mer et remplir',
        image: { src: '/guides/recifal/etape-4-eau-de-mer.webp', alt: "Préparer l’eau de mer : eau osmosée et sel marin, salinité de 35 g/L mesurée au réfractomètre, température de 24 à 26 °C" },
        paragraphes: [],
        liste: [
          "Préparez de l'eau osmosée, jamais de l'eau du robinet.",
          "Dissolvez le sel marin dans un seau avec une pompe de brassage, jusqu'à une salinité d'environ 35 g/L (densité autour de 1,025), mesurée au réfractomètre.",
          "Remplissez le bac, démarrez le brassage et le chauffage, et réglez la température entre 24 et 26 °C.",
          "Allumez l'éclairage à faible intensité, avec 6 à 8 heures d'éclairage par jour au début.",
          "Si vous utilisez de la roche sèche, ajoutez un peu de roche vivante pour amorcer la colonisation bactérienne.",
        ],
      },
      {
        titre: 'Étape 5 : lancer le cycle (4 à 8 semaines)',
        image: { src: '/guides/recifal/etape-5-cycle.webp', alt: "Courbes du cycle de l’azote en aquarium récifal sur 8 semaines : ammoniaque, nitrites puis nitrates, bac cyclé à partir de la semaine 6" },
        paragraphes: [
          "Comme en eau douce, des bactéries doivent s'installer dans les roches pour transformer l'ammoniaque en nitrites puis en nitrates. En récifal, comptez en général de 4 à 8 semaines, parfois plus avec de la roche sèche.",
        ],
        liste: [
          "Testez l'ammoniaque et les nitrites chaque semaine, et notez les résultats.",
          "N'ajoutez aucun animal tant que l'ammoniaque et les nitrites ne sont pas retombés à zéro.",
          "Une poussée d'algues brunes (diatomées), puis d'autres algues, est normale pendant la maturation : elle se calme toute seule quand l'équilibre s'installe.",
        ],
      },
      {
        titre: 'Étape 6 : vérifier les paramètres avant le premier habitant',
        image: { src: '/guides/recifal/etape-6-parametres.webp', alt: "Paramètres d’eau à viser en récifal : température, salinité, KH, calcium, magnésium, nitrates et phosphates" },
        paragraphes: [
          "Quand le cycle est terminé, contrôlez que le bac est dans les bonnes plages. Pour un bac de coraux mous et LPS, on vise généralement :",
        ],
        liste: [
          "Température : 24 à 26 °C.",
          "Salinité : environ 35 g/L (densité autour de 1,025).",
          "KH : 7 à 9 dKH.",
          "Calcium : 400 à 450 mg/L.",
          "Magnésium : 1250 à 1350 mg/L.",
          "Nitrates : faibles, quelques mg/L.",
          "Phosphates : inférieurs à 0,1 mg/L.",
        ],
      },
      {
        titre: 'Étape 7 : ajouter les nettoyeurs, puis un premier poisson',
        image: { src: '/guides/recifal/etape-7-nettoyeurs-poissons.webp', alt: "Peupler un aquarium récifal : nettoyeurs d’abord, quarantaine du poisson, puis acclimatation à la goutte-à-goutte" },
        paragraphes: [
          "On commence par les nettoyeurs (escargots turbo, crevette nettoyeuse), qui aident à contrôler les algues. Quelques semaines plus tard, vous pouvez ajouter un ou deux poissons robustes.",
          "Le poisson-clown ocellaris, élevé en captivité, est le classique du débutant : résistant et très présent dans les bacs récifaux. Soyez prudent avec les demoiselles, qui peuvent devenir agressives. Mieux vaut peu de poissons que trop : ils produisent des déchets que l'écumeur doit gérer.",
          "Passez les poissons en quarantaine avant de les introduire pour ne pas contaminer le bac principal, et acclimatez-les doucement, idéalement à la goutte-à-goutte.",
        ],
      },
      {
        titre: 'Étape 8 : installer les premiers coraux',
        image: { src: '/guides/recifal/etape-8-premiers-coraux.webp', alt: "Trois coraux faciles pour débuter en récifal : zoanthaires, corallimorphes (coraux champignons) et xenias" },
        paragraphes: [
          "Une fois le bac stable depuis plusieurs semaines, choisissez des coraux tolérants aux petites variations : les zoanthaires (Zoanthus), les corallimorphes (coraux champignons) et les xenias. Ils s'adaptent à un éclairage et un courant modérés, et poussent assez vite pour montrer que le bac va bien.",
          "Certaines de ces espèces se multiplient vite et peuvent envahir les roches : placez-les sur des zones bien délimitées. Les coraux LPS, puis les SPS, beaucoup plus exigeants, viennent après plusieurs mois de stabilité.",
          "Attention à la réglementation : tous les coraux durs (scléractiniaires) sont inscrits à la CITES en France et dans l'Union européenne, boutures comprises. Conservez toujours la facture ou l'attestation de cession, qui prouve l'origine légale. Les fiches espèces d'Aquatopia indiquent le statut légal de chaque animal.",
        ],
      },
      {
        titre: 'Étape 9 : mettre en place la routine d’entretien',
        image: { src: '/guides/recifal/etape-9-routine-entretien.webp', alt: "Routine d’entretien d’un aquarium récifal : tâches quotidiennes, hebdomadaires, toutes les 2 semaines et mensuelles" },
        paragraphes: [],
        liste: [
          "Chaque jour : vérifier la température, le niveau d'eau et le bon fonctionnement des pompes, et observer les animaux.",
          "Chaque semaine : tester la salinité, le KH, les nitrates et les phosphates, et nettoyer les vitres.",
          "Toutes les 2 semaines environ : un changement d'eau partiel d'environ 10 %, avec de l'eau de mer préparée à la même salinité et à la même température.",
          "Chaque mois : contrôler le calcium et le magnésium, et nettoyer l'écumeur et les pompes.",
        ],
      },
      {
        titre: 'Les erreurs classiques à éviter',
        paragraphes: [],
        liste: [
          "Mettre des poissons ou des coraux avant la fin du cycle.",
          "Acheter trop d'animaux le même jour.",
          "Corriger les paramètres à coups de produits sans comprendre la cause du problème.",
          "Négliger l'osmolateur : la salinité grimpe quand l'eau s'évapore sans être remplacée.",
          "Choisir un éclairage trop puissant pour des coraux fraîchement installés.",
          "Vouloir un bac parfait trop vite : un récifal réussi se construit en plusieurs mois.",
        ],
      },
      {
        titre: 'Récapitulatif : un calendrier réaliste',
        paragraphes: [],
        liste: [
          "Semaine 1 : installation du bac, de l'eau de mer et des roches.",
          "Semaines 2 à 8 : cycle, tests hebdomadaires, premières algues.",
          "Après le cycle : nettoyeurs, puis un premier poisson (quarantaine comprise).",
          "Un à deux mois après : premiers coraux faciles.",
          "Après plusieurs mois de stabilité : coraux LPS, puis SPS si vous le souhaitez.",
        ],
      },
      {
        paragraphes: [
          "Le budget dépend beaucoup du volume et du matériel : il est généralement plus élevé qu'en eau douce. Le guide sur le budget d'un premier aquarium vous aide à le chiffrer avant d'acheter.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/simulateur', label: 'Essayer le simulateur pour dimensionner votre bac' },
      { href: '/guides/materiel-recifal-ecumeur-osmolateur-brassage', label: 'Le matériel récifal expliqué (écumeur, osmolateur, brassage)' },
      { href: '/guides/calcium-kh-magnesium-recifal', label: 'Bien doser calcium, KH et magnésium' },
      { href: '/guides/eclairage-recifal-choisir-led', label: 'Choisir son éclairage LED récifal' },
      { href: '/guides/cycle-de-lazote-aquarium', label: "Comprendre le cycle de l'azote" },
      { href: '/guides/coraux-mous-lps-sps-differences', label: 'Coraux mous, LPS, SPS : la progression' },
      { href: '/guides/quarantaine-poissons-recifal-pourquoi', label: 'Pourquoi mettre en quarantaine poissons et coraux' },
      { href: '/guides/acclimatation-goutte-a-goutte-poissons-coraux', label: 'Acclimatation à la goutte-à-goutte' },
      { href: '/guides/budget-demarrer-aquarium', label: "Le budget d'un premier aquarium" },
      { href: '/especes/poisson-clown-ocellaris', label: 'Fiche : poisson-clown ocellaris' },
      { href: '/especes/zoanthaire', label: 'Fiche : zoanthaire' },
      { href: '/especes/corallimorphe-champignon', label: 'Fiche : corallimorphe (corail champignon)' },
      { href: '/biotope/eau-de-mer', label: "Voir les annonces d'eau de mer et récifal" },
      { href: '/categorie/materiel', label: 'Voir le matériel (écumeurs, pompes, éclairage...)' },
    ],
  },
  {
    slug: 'hivernage-poissons-bassin',
    titre: 'Bassin de jardin : bien préparer l’hivernage de vos poissons',
    eyebrow: 'Bassin',
    description:
      "Comment adapter l'alimentation, protéger l'eau du gel et entretenir la filtration de votre bassin avant l'hiver.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Les poissons de bassin rustiques, koï et poissons rouges en tête, passent l'hiver dehors sans difficulté, à condition que le bassin soit bien préparé. L'enjeu n'est pas de les réchauffer, mais de leur laisser le calme, l'oxygène et la profondeur dont ils ont besoin. Voici comment préparer l'hivernage.",
        ],
      },
      {
        titre: "Pourquoi l’automne est une période clé",
        image: { src: '/guides/sections/hivernage-poissons-bassin/1.webp', alt: "Bassin avec feuilles mortes, thermomètre qui baisse et poissons dont le métabolisme ralentit" },
        paragraphes: [
          "À mesure que la température de l'eau baisse, le métabolisme des poissons de bassin (Koï, poissons rouges) ralentit fortement. C'est en amont de l'hiver que se prépare le passage à la saison froide, pas une fois les premières gelées arrivées.",
          "À l'automne, les poissons doivent être en bonne santé : un animal faible ou parasité supporte mal l'hiver. Profitez-en pour contrôler l'état général, retirer les feuilles tombées et vérifier que le matériel est prêt.",
        ],
      },
      {
        titre: "Adapter l’alimentation progressivement",
        image: { src: '/guides/sections/hivernage-poissons-bassin/2.webp', alt: "Échelle de température indiquant quand passer à une nourriture pauvre en protéines puis arrêter de nourrir" },
        paragraphes: [
          "Dès que l'eau descend sous 14°C environ, il est conseillé de passer à une nourriture pauvre en protéines et facile à digérer (à base de germe de blé). En dessous de 8 à 10°C, la digestion des poissons est trop ralentie pour traiter la nourriture correctement : mieux vaut arrêter complètement de nourrir plutôt que de risquer des problèmes digestifs.",
          "Un poisson qui ne mange pas en hiver n'est pas en danger : il vit sur ses réserves, constituées à l'automne. Donner de la nourriture à une eau trop froide la laisse non digérée dans l'intestin, ce qui provoque des problèmes sérieux.",
        ],
      },
      {
        titre: "Protéger le bassin du gel",
        image: { src: '/guides/sections/hivernage-poissons-bassin/3.webp', alt: "Coupe d’un bassin profond de 80 centimètres à un mètre avec un bulleur qui garde un trou dans la glace" },
        paragraphes: [
          "Un bassin doit comporter une zone d'au moins 80 cm à 1 mètre de profondeur pour ne pas geler entièrement en hiver. Un bulleur ou un dégeleur flottant permet de maintenir une ouverture dans la glace, essentielle aux échanges gazeux — un bassin totalement pris par la glace peut voir ses poissons manquer d'oxygène. Retirer les feuilles mortes et débris végétaux avant l'hiver limite aussi la formation de gaz toxiques sous la glace.",
          "Ne cassez jamais la glace à coups de marteau : les ondes de choc peuvent blesser les poissons. Pour percer un trou, posez une casserole d'eau chaude sur la surface. Si possible, placez le bulleur à mi-profondeur plutôt qu'au fond, pour ne pas brasser l'eau plus chaude des profondeurs.",
        ],
      },
      {
        titre: "Entretenir la filtration",
        image: { src: '/guides/sections/hivernage-poissons-bassin/4.webp', alt: "Arrêter la filtration par grand froid ou la maintenir à débit réduit" },
        paragraphes: [
          "Certains passionnés arrêtent la filtration biologique par grand froid car les bactéries deviennent dormantes, d'autres préfèrent la maintenir à débit réduit pour éviter le gel des canalisations. La bonne approche dépend surtout de la rigueur du climat local — mieux vaut se renseigner sur les pratiques adaptées à sa région.",
          "Dans tous les cas, rentrez et nettoyez le clarificateur UV, qui craint le gel, et protégez les pompes fragiles. Retirez les plantes tropicales ou protégez-les à l'abri du froid.",
        ],
      },
      {
        titre: "Les gestes à faire avant les premières gelées",
        paragraphes: [
          "Voici une liste de contrôle pour l'automne :",
        ],
        liste: [
          "Tendre un filet au-dessus du bassin pour retenir les feuilles.",
          "Tailler les plantes mortes et retirer les débris organiques.",
          "Aspirer une partie de la vase accumulée au fond.",
          "Vérifier l'état du bulleur ou du dégeleur et le tester.",
          "Passer à une nourriture adaptée au froid, puis arrêter selon la température.",
          "Contrôler l'étanchéité du bassin et le niveau d'eau.",
        ],
      },
      {
        titre: "Pendant l'hiver : surveiller sans intervenir",
        paragraphes: [
          "Pendant l'hiver, le bassin demande peu : vérifiez que le trou dans la glace reste ouvert, retirez la neige qui bloque la lumière si le bassin est en partie couvert, et gardez le calme autour. Évitez de déranger les poissons, immobiles au fond. Au retour des beaux jours, reprenez progressivement l'alimentation et la filtration.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/biotope/bassin', label: 'Voir les annonces de bassin' },
      { href: '/categorie/materiel', label: 'Voir le matériel de filtration' },
      { href: '/guides/printemps-bassin-redemarrage', label: 'Relancer le bassin au printemps' },
    ],
  },
  {
    slug: 'parametres-eau-ph-gh-kh',
    titre: "pH, GH, KH : comprendre les paramètres de l'eau en aquariophilie",
    eyebrow: 'Comprendre',
    description:
      "Ce que mesurent réellement le pH, le GH et le KH, et pourquoi la stabilité de ces paramètres compte plus que leur valeur exacte.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Quand on débute en aquariophilie, trois sigles reviennent dans tous les kits de test : pH, GH et KH. Ils décrivent la chimie de base de l'eau et déterminent quelles espèces de poissons, de crevettes et de plantes s'y sentiront bien. Ils sont faciles à mesurer et à comprendre, à condition de ne pas les confondre.",
        ],
      },
      {
        titre: "Le pH : acidité ou basicité de l’eau",
        image: { src: '/guides/sections/parametres-eau-ph-gh-kh/1.webp', alt: "Échelle de pH de 0 à 14 avec la plage 6,5 à 7,5 tolérée par la plupart des poissons tropicaux" },
        paragraphes: [
          "Le pH mesure l'acidité de l'eau sur une échelle de 0 à 14 (7 étant neutre). La plupart des poissons d'eau douce tropicaux tolèrent un pH entre 6,5 et 7,5, mais certaines espèces (Discus, Scalaires) préfèrent une eau plus acide, tandis que d'autres (Cichlidés du Lac Malawi) préfèrent une eau plus basique.",
          "L'échelle est logarithmique : passer de pH 7 à pH 6 signifie que l'eau est dix fois plus acide, et non légèrement plus. Le pH varie aussi naturellement au cours de la journée dans un bac planté, car les plantes consomment du CO₂ le jour et en rejettent la nuit, ce qui rend l'eau un peu plus acide au petit matin. Une mesure isolée dit donc moins qu'une série de mesures faites à la même heure.",
        ],
      },
      {
        titre: "Le GH : la dureté générale",
        image: { src: '/guides/sections/parametres-eau-ph-gh-kh/2.webp', alt: "Comparaison d’une eau douce et d’une eau dure : le GH mesure le calcium et le magnésium dissous" },
        paragraphes: [
          "Le GH mesure la concentration en calcium et magnésium dissous dans l'eau — on parle d'eau « douce » (GH bas) ou « dure » (GH élevé). C'est un paramètre important pour la reproduction de nombreuses espèces et pour la croissance des plantes, qui puisent ces minéraux dans l'eau.",
          "Le GH s'exprime en degrés allemands (°dGH). Les distributeurs d'eau français indiquent plutôt le titre hydrotimétrique (TH) en degrés français (°f) : 1 °dGH équivaut à environ 1,8 °f. La facture ou le site de votre service des eaux donne donc une bonne idée du GH de votre robinet avant même d'acheter un test.",
        ],
      },
      {
        titre: "Le KH : le pouvoir tampon",
        image: { src: '/guides/sections/parametres-eau-ph-gh-kh/3.webp', alt: "À gauche un KH trop bas provoque un pH crash, à droite un KH stable maintient le pH" },
        paragraphes: [
          "Le KH mesure la capacité de l'eau à résister aux variations de pH (le « pouvoir tampon »). Un KH trop bas expose à des chutes brutales de pH (le fameux « pH crash »), souvent dangereuses pour les poissons. C'est pourquoi un KH stable est souvent plus important que la valeur exacte du pH.",
          "Le KH correspond aux carbonates et bicarbonates dissous, qui neutralisent les acides. Dans un aquarium, la transformation de l'ammoniac par les bactéries produit des acides et consomme peu à peu ce tampon : sans changements d'eau réguliers, le KH s'épuise et le pH finit par chuter. Ce phénomène est très fréquent dans les bacs peu entretenus, surtout si l'eau du robinet est déjà peu minéralisée.",
        ],
      },
      {
        titre: "Pourquoi la stabilité prime sur la valeur exacte",
        image: { src: '/guides/sections/parametres-eau-ph-gh-kh/4.webp', alt: "Un paramètre stable vaut mieux qu’un paramètre idéal mais instable ; on préfère les changements d’eau réguliers aux produits chimiques" },
        paragraphes: [
          "La plupart des poissons s'adaptent à une large gamme de paramètres du moment qu'ils sont stables : une variation brutale est bien plus dangereuse qu'un paramètre légèrement éloigné de l'idéal théorique. Mieux vaut donc éviter de chercher à forcer un paramètre avec des produits chimiques et privilégier des changements d'eau réguliers et progressifs.",
          "Les poissons vendus en animalerie sont dans leur grande majorité élevés en captivité depuis plusieurs générations, dans une eau proche de celle de nos robinets. Ils s'en accommodent très bien, et les « pH moins » ou « pH plus » du commerce font souvent plus de mal que de bien, car ils provoquent des oscillations d'un jour à l'autre.",
        ],
      },
      {
        titre: "Comment mesurer ces paramètres",
        paragraphes: [
          "Les tests en gouttes (réactif liquide dont on compte les gouttes jusqu'au changement de couleur) sont plus fiables que les bandelettes, dont la lecture est approximative. Pour le pH, un test à large gamme suffit pour débuter. Pour le GH et le KH, on compte le nombre de gouttes nécessaires : une goutte correspond généralement à 1 degré.",
          "Mesurez d'abord l'eau du robinet, puis l'eau du bac. Si vous constatez un écart important, c'est que quelque chose dans l'aquarium (roches, décor, bois, accumulation de déchets) modifie la composition de l'eau. Pour le pH du robinet, laissez un verre d'eau reposer 24 heures avant la mesure : l'eau perd son CO₂ dissous et le chiffre obtenu est plus proche de celui que vos poissons vont réellement connaître.",
        ],
      },
      {
        titre: "Ordres de grandeur selon les types d’aquarium",
        paragraphes: [
          "Ces valeurs sont des repères indicatifs. La fiche de chaque espèce du site précise ses besoins propres.",
        ],
        liste: [
          "Aquarium communautaire tropical : pH 6,5 à 7,5, GH 6 à 12 °dGH, KH 3 à 8 °dKH.",
          "Discus et poissons d'Amazonie : pH 6 à 7, GH 1 à 6 °dGH, KH inférieur à 4 °dKH.",
          "Cichlidés du Lac Malawi : pH 7,8 à 8,6, GH 10 à 20 °dGH, KH 8 à 15 °dKH.",
          "Crevettes Neocaridina (cherry) : pH 6,5 à 8, GH 6 à 12 °dGH, KH 3 à 10 °dKH.",
          "Crevettes Caridina sélectionnées (crystal red) : pH 5,5 à 6,5, GH 4 à 6 °dGH, KH 0 à 2 °dKH.",
        ],
      },
      {
        titre: "Que faire si les valeurs ne conviennent pas",
        paragraphes: [
          "La première question est de savoir si vos poissons s'en portent mal. Si l'eau du robinet est stable et que les animaux sont actifs, mangent et se reproduisent, il n'y a rien à corriger. Mieux vaut choisir des espèces adaptées à votre eau que l'inverse.",
          "Si vous souhaitez vraiment modifier les valeurs, la méthode la plus fiable consiste à couper l'eau du robinet avec de l'eau osmosée (pauvre en minéraux), puis à reminéraliser si besoin. À l'inverse, des roches calcaires, du corail concassé ou des coquillages augmentent lentement le GH et le KH. Dans tous les cas, avancez par petites étapes et laissez plusieurs jours entre deux modifications.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/osmoseur-aquarium-a-quoi-ca-sert', label: 'À quoi sert un osmoseur ?' },
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: 'Bien faire son changement d’eau' },
    ],
  },
  {
    slug: 'bien-nourrir-poissons-aquarium',
    titre: 'Bien nourrir ses poissons d’aquarium : quantité, fréquence et erreurs à éviter',
    eyebrow: 'Entretien',
    description:
      "La suralimentation est la cause la plus fréquente de problèmes en aquarium : comment nourrir ses poissons correctement, sans excès.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Nourrir ses poissons semble simple, et c'est pourtant la première source d'erreurs en aquariophilie. Trop de nourriture pollue l'eau, favorise les algues et fatigue les poissons. Voici les règles qui permettent de bien nourrir sans abîmer l'équilibre du bac.",
        ],
      },
      {
        titre: "La règle de base : moins que ce qu’on pense",
        image: { src: '/guides/sections/bien-nourrir-poissons-aquarium/1.webp', alt: "Poissons qui consomment la nourriture en deux à trois minutes, un excès causant ammoniac, algues et eau trouble" },
        paragraphes: [
          "La grande majorité des problèmes d'eau (pics d'ammoniac, algues, eau trouble) viennent d'une suralimentation plutôt que d'un manque de nourriture. Une bonne règle est de ne donner que ce que les poissons peuvent consommer en 2 à 3 minutes, une à deux fois par jour.",
          "Retirez les restes avec une épuisette après cinq minutes. Un poisson qui réclame de la nourriture n'a pas forcément faim : il réagit à la présence de son propriétaire. Un ventre légèrement arrondi est normal, un ventre gonflé indique un excès de nourriture.",
        ],
      },
      {
        titre: "Varier les sources de nourriture",
        image: { src: '/guides/sections/bien-nourrir-poissons-aquarium/2.webp', alt: "Granulés et paillettes au quotidien, complétés de temps en temps par des proies congelées ou vivantes" },
        paragraphes: [
          "Granulés ou paillettes en base quotidienne, complétés occasionnellement par des proies congelées (artémias, daphnies, vers de vase) ou vivantes, permettent de couvrir les besoins nutritionnels de la plupart des espèces communautaires et de stimuler leur comportement naturel.",
          "Les aliments congelés se décongèlent dans un peu d'eau du bac avant d'être donnés. La nourriture vivante offre un grand intérêt mais comporte un risque de parasites : préférez des élevages fiables. Achetez les aliments secs en petits conditionnements : ils perdent leurs vitamines en quelques mois après ouverture, et se conservent mieux dans un endroit sec et frais.",
        ],
      },
      {
        titre: "Adapter la nourriture à l’espèce",
        image: { src: '/guides/sections/bien-nourrir-poissons-aquarium/3.webp', alt: "Paillettes flottantes pour les poissons de surface, nourriture qui coule pour ceux du fond et complément végétal pour les herbivores" },
        paragraphes: [
          "Un poisson de fond (Corydoras, Ancistrus) a besoin de nourriture qui coule, tandis qu'un poisson de surface préfère des paillettes flottantes. Les herbivores (certains Poecilidés, Ancistrus) profitent d'un complément végétal (courgette, concombre blanchi) en plus des granulés classiques.",
          "Les poissons carnivores comme les Bettas ont besoin d'une nourriture riche en protéines. Les poissons nocturnes, comme certains poissons-chats, se nourrissent le soir : donnez-leur des pastilles après l'extinction des lumières. Les légumes blanchis se retirent au bout de 24 heures pour ne pas polluer l'eau. Les crevettes se contentent de peu : elles broutent le biofilm et les restes.",
        ],
      },
      {
        titre: "Le jeûne, un outil utile",
        image: { src: '/guides/sections/bien-nourrir-poissons-aquarium/4.webp', alt: "Semaine avec un jour de jeûne pour reposer le système digestif des poissons" },
        paragraphes: [
          "Sauter un jour de nourrissage par semaine n'est pas néfaste, bien au contraire : cela laisse le temps au système digestif de se reposer et limite l'accumulation de déchets organiques dans le bac — une pratique courante chez les aquariophiles expérimentés.",
          "Ce jour de jeûne est particulièrement utile pour les poissons sujets à l'embonpoint et à la constipation, comme les poissons rouges. Les jeunes poissons en croissance, eux, ont besoin de repas plus fréquents, en petites quantités.",
        ],
      },
      {
        titre: "Les signes d'une alimentation inadaptée",
        paragraphes: [
          "L'état de vos poissons et de l'eau vous renseigne mieux qu'une balance :",
        ],
        liste: [
          "Eau trouble, restes de nourriture au sol, algues qui reviennent : trop de nourriture.",
          "Ventre gonflé, selles longues et filandreuses : excès ou régime inadapté.",
          "Poissons amaigris, creusés au niveau du ventre : manque de nourriture ou compétition entre congénères.",
          "Couleurs ternes, croissance lente : alimentation trop pauvre ou trop monotone.",
        ],
      },
      {
        titre: "Nourrir un bac communautaire",
        paragraphes: [
          "Dans un bac mixte, les poissons rapides raflent la nourriture avant les plus timides. Répartissez les paillettes à plusieurs endroits, donnez de la nourriture qui coule pour les poissons de fond, et observez que chacun mange sa part. Si un poisson est systématiquement évincé, nourrissez-le à part avec une petite pince ou un tube d'alimentation. Pensez enfin à adapter les quantités au nombre de poissons réellement présents, et à les réduire si l'un d'eux meurt.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/vivant', label: 'Voir les annonces de poissons' },
      { href: '/guides/vacances-aquarium-que-faire', label: 'Partir en vacances' },
    ],
  },
  {
    slug: 'aquascaping-decor-naturel',
    titre: 'Aquascaping : composer un décor naturel pour son aquarium',
    eyebrow: 'Décoration',
    description:
      "Les grands principes de l'aquascaping pour composer un décor d'aquarium harmonieux : plantes, racines, roches et mise en scène.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "L'aquascaping est l'art de composer un paysage sous l'eau, à la manière d'un jardin paysager. Un bon aquascape ne repose pas sur le nombre de plantes ou de roches, mais sur l'équilibre de la composition, la cohérence des matériaux et la patience. Voici les principes de base pour réussir un premier projet.",
        ],
      },
      {
        titre: "Un décor qui s’inspire de la nature",
        image: { src: '/guides/sections/aquascaping-decor-naturel/1.webp', alt: "Trois inspirations d’aquascaping : sous-bois, ruisseau et montagne" },
        paragraphes: [
          "L'aquascaping consiste à composer le décor d'un aquarium en s'inspirant de paysages naturels — sous-bois, ruisseau, montagne — plutôt que d'accumuler des éléments décoratifs sans cohérence. Les styles les plus connus sont le style hollandais (bac planté dense, organisé en massifs) et le style japonais Iwagumi (quelques roches disposées avec soin, peu de plantes).",
          "Il existe aussi le style « jungle », volontairement foisonnant, et le style « nature » popularisé par Takashi Amano, qui mélange roches, bois et plantes dans une composition asymétrique. Choisissez le style avant d'acheter, pour que roches, bois et plantes forment un ensemble cohérent.",
        ],
      },
      {
        titre: "La règle des tiers",
        image: { src: '/guides/sections/aquascaping-decor-naturel/2.webp', alt: "Aquarium divisé en tiers avec une roche placée sur une intersection comme point focal" },
        paragraphes: [
          "Comme en photographie, diviser l'espace visuel en tiers plutôt que de centrer les éléments donne un résultat plus naturel et équilibré à l'œil. Un point focal (une roche imposante, une racine) placé sur l'une de ces lignes structure généralement bien la composition.",
          "Évitez la symétrie parfaite, qui paraît artificielle. Les groupes d'éléments en nombre impair (trois roches, cinq touffes) donnent aussi un rendu plus naturel que des groupes pairs. Laissez de l'espace vide : un espace ouvert met en valeur le point focal.",
        ],
      },
      {
        titre: "Racines et roches : bien les préparer",
        image: { src: '/guides/sections/aquascaping-decor-naturel/3.webp', alt: "Racine de bois flotté qui trempe dans un seau pour se saturer d’eau, roches rincées avant installation" },
        paragraphes: [
          "Une racine de bois flotté doit généralement être immergée plusieurs jours (voire semaines) avant d'être installée définitivement, le temps qu'elle se sature en eau et cesse de flotter ; elle relâchera aussi des tanins qui colorent l'eau, sans danger pour les poissons. Certaines roches (calcaires notamment) peuvent modifier la dureté de l'eau : à réserver aux bacs où ce n'est pas gênant, voire recherché (Cichlidés africains).",
          "Disposez le « hardscape » (roches et bois) en premier, avant le substrat et l'eau, en l'essayant à sec pour valider la composition. Collez et calez les pièces pour qu'elles ne bougent pas, puis ajoutez le sol et enfin les plantes.",
        ],
      },
      {
        titre: "Composer les plans avant/arrière",
        image: { src: '/guides/sections/aquascaping-decor-naturel/4.webp', alt: "Plantes de premier plan, de taille moyenne au centre et hautes à l’arrière-plan pour créer de la profondeur" },
        paragraphes: [
          "Les plantes de premier plan (courtes, tapissantes) devant, les plantes de taille moyenne au centre, et les plantes hautes ou à tige en arrière-plan donnent une impression de profondeur — un principe simple qui améliore immédiatement le rendu d'un bac planté.",
          "On peut renforcer cet effet en inclinant le substrat : plus épais à l'arrière, plus fin à l'avant. Les plantes d'arrière-plan, plus grandes, masquent le matériel technique (câbles, tuyaux), tandis que le premier plan reste dégagé pour la mise en valeur de la composition.",
        ],
      },
      {
        titre: "Les étapes pour monter un aquascape",
        paragraphes: [
          "Pour structurer votre projet, suivez cet ordre :",
        ],
        liste: [
          "Définir le style et esquisser la composition sur papier.",
          "Installer le hardscape, à sec, puis ajuster jusqu'à ce que l'équilibre convienne.",
          "Ajouter le substrat, en l'épaississant à l'arrière.",
          "Remplir lentement l'eau, en la versant sur une assiette pour ne pas bousculer le décor.",
          "Planter, en commençant par les plantes d'arrière-plan.",
          "Démarrer l'éclairage progressivement, avec des changements d'eau fréquents les premières semaines.",
        ],
      },
      {
        titre: "La patience, ingrédient principal",
        paragraphes: [
          "Un aquascape met plusieurs mois à atteindre son plein rendu : les plantes s'enracinent, se densifient et s'étoffent peu à peu. Pendant les premières semaines, des algues peuvent apparaître, ce qui est normal : elles disparaissent avec une photopériode raisonnable et la croissance des plantes. Entretenez régulièrement, taillez par petites touches, et n'hésitez pas à faire évoluer votre composition en observant ce qui fonctionne.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/plantes', label: 'Voir les annonces de plantes' },
      { href: '/categorie/decor', label: 'Voir les annonces de décor (roches, racines...)' },
      { href: '/guides/aquarium-biotope-reproduire-milieu-naturel', label: 'Créer un aquarium biotope' },
      { href: '/guides/tailler-entretenir-plantes-aquarium', label: 'Tailler et entretenir ses plantes' },
    ],
  },
  {
    slug: 'materiel-recifal-ecumeur-osmolateur-brassage',
    titre: 'Écumeur, osmolateur, brassage : le matériel récifal expliqué',
    eyebrow: 'Récifal',
    description:
      "Le rôle exact de l'écumeur, de l'osmolateur et des pompes de brassage dans un aquarium récifal, et comment bien les dimensionner.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Un aquarium récifal repose sur un équipement spécifique, qui ne ressemble pas à celui d'un bac d'eau douce. Trois appareils reviennent sans cesse dans les discussions de récifalistes : l'écumeur, l'osmolateur et les pompes de brassage. Voici le rôle de chacun et comment les choisir.",
        ],
      },
      {
        titre: "L’écumeur protéinique",
        image: { src: '/guides/sections/materiel-recifal-ecumeur-osmolateur-brassage/1.webp', alt: "Écumeur qui capture les déchets organiques dissous dans une écume évacuée dans un godet" },
        paragraphes: [
          "L'écumeur extrait les molécules organiques dissoutes avant qu'elles ne se décomposent en polluants, en créant un mélange d'air et d'eau qui capture ces déchets sous forme d'écume évacuée dans un godet séparé. C'est l'un des équipements les plus déterminants pour la qualité de l'eau en récifal, à dimensionner plutôt au-dessus du volume réel du bac qu'en dessous.",
          "Il se place généralement dans le décanteur (sump). Le godet doit être vidé et nettoyé chaque semaine, et le col de l'écumeur périodiquement. Un écumeur encrassé perd son efficacité. Son réglage (niveau d'eau, débit d'air) demande quelques jours après l'installation, le temps de trouver l'écume « sèche » ou « humide » souhaitée.",
        ],
      },
      {
        titre: "L’osmolateur : compenser l’évaporation",
        image: { src: '/guides/sections/materiel-recifal-ecumeur-osmolateur-brassage/2.webp', alt: "Osmolateur qui ajoute de l’eau osmosée pure pour garder un niveau et une salinité stables" },
        paragraphes: [
          "L'eau s'évapore en continu dans un bac récifal, mais les sels qu'elle contient restent : sans compensation, la salinité augmente progressivement. Un osmolateur ajoute automatiquement de l'eau osmosée pure (sans sel) pour maintenir un niveau et une salinité stables, en particulier utile en cas d'absence prolongée.",
          "Il se compose d'un capteur de niveau (optique ou à flotteur), d'une pompe d'appoint et d'une réserve d'eau osmosée, souvent de 20 à 40 litres. Choisissez un modèle avec une sécurité en cas de défaillance : un osmolateur qui reste bloqué en marche peut diluer l'eau du bac en quelques heures. Un second capteur de sécurité est un investissement judicieux.",
        ],
      },
      {
        titre: "Le brassage : reproduire le mouvement des courants",
        image: { src: '/guides/sections/materiel-recifal-ecumeur-osmolateur-brassage/3.webp', alt: "Pompes de brassage qui créent des courants croisés dans un aquarium récifal" },
        paragraphes: [
          "Les pompes de brassage reproduisent le mouvement de l'eau que les coraux connaissent en milieu naturel — un brassage insuffisant favorise l'accumulation de déchets et le développement d'algues, tandis qu'un brassage adapté à chaque zone du bac améliore la santé et la coloration des coraux. Un brassage aléatoire ou alterné (plutôt qu'un flux constant dans une seule direction) est généralement recommandé.",
          "À titre d'ordre de grandeur, on vise un brassage de 20 à 40 fois le volume du bac par heure pour un bac mixte, davantage pour un bac de SPS. Il est préférable de répartir le flux entre plusieurs pompes réglables plutôt que d'utiliser une seule pompe très puissante, qui crée des zones mortes et des zones trop agitées.",
        ],
      },
      {
        titre: "Dimensionner son matériel dès le départ",
        image: { src: '/guides/sections/materiel-recifal-ecumeur-osmolateur-brassage/4.webp', alt: "Écumeur et brassage légèrement surdimensionnés par rapport au volume du bac" },
        paragraphes: [
          "Il est presque toujours préférable de surdimensionner légèrement écumeur et brassage plutôt que de devoir les changer après quelques mois d'évolution du bac — un achat de matériel d'occasion adapté à un volume un peu supérieur au sien reste souvent plus économique qu'un achat neuf pile à la bonne taille.",
          "Pensez à l'ensemble de la chaîne : un décanteur de bonne taille, un chauffage fiable, un système de refroidissement en été, un réfractomètre et un kit de tests. Sur Aquatopia, la catégorie Matériel permet de trouver ces équipements en occasion.",
        ],
      },
      {
        titre: "Les autres équipements utiles",
        paragraphes: [
          "D'autres appareils complètent progressivement un bac récifal :",
        ],
        liste: [
          "Un osmoseur pour produire l'eau osmosée destinée à l'eau de mer artificielle et à l'osmolateur.",
          "Un doseur automatique pour le calcium, le KH et le magnésium.",
          "Un réacteur à charbon ou à résine pour traiter l'eau en continu.",
          "Un contrôleur (température, pH) et des alarmes pour sécuriser le bac.",
          "Un refroidisseur ou des ventilateurs pour les mois chauds.",
        ],
      },
      {
        titre: "Ne pas oublier la sécurité",
        paragraphes: [
          "Un bac récifal consomme beaucoup d'énergie et dépend de nombreux appareils électriques. Utilisez des prises étanches avec disjoncteur différentiel, formez des boucles d'égouttement sur les câbles et prévoyez une solution en cas de coupure de courant (pompes sur batterie, aération de secours). La sécurité du matériel est aussi celle de vos animaux.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/aquarium-recifal-par-ou-commencer', label: 'Retour au guide du récifal débutant' },
      { href: '/categorie/materiel', label: 'Voir le matériel récifal en vente' },
      { href: '/guides/nourrir-un-aquarium-recifal', label: 'Bien nourrir un aquarium récifal' },
      { href: '/guides/difference-eau-osmosee-eau-robinet-aquarium', label: 'Eau osmosée ou robinet' },
    ],
  },
  {
    slug: 'coraux-mous-lps-sps-differences',
    titre: 'Coraux mous, LPS, SPS : quelles différences et quelle progression ?',
    eyebrow: 'Récifal',
    description:
      "Les trois grandes familles de coraux d'aquarium récifal, leurs besoins respectifs, et dans quel ordre les introduire.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Les coraux ne demandent pas tous le même niveau d'expérience. On les classe en trois grandes catégories, du plus indulgent au plus exigeant : les coraux mous, les LPS et les SPS. Comprendre cette progression permet de construire un bac récifal sur des bases solides, plutôt que de multiplier les échecs.",
        ],
      },
      {
        titre: "Les coraux mous : les plus tolérants",
        image: { src: '/guides/sections/coraux-mous-lps-sps-differences/1.webp', alt: "Zoanthus, coraux champignons, Sarcophyton et Xenia, des coraux mous tolérants pour débuter" },
        paragraphes: [
          "Zoanthus, Discosoma (coraux champignons), Sarcophyton ou Xenia tolèrent des paramètres d'eau moins stricts et une intensité lumineuse modeste. Ce sont les coraux recommandés pour démarrer un bac récifal, le temps que celui-ci gagne en maturité et en stabilité.",
          "Ils sont robustes mais pas sans contraintes. Certains, comme les Zoanthus, contiennent une toxine puissante (palytoxine) : manipulez-les avec des gants et des lunettes, et ne les touchez jamais avec une plaie ouverte. D'autres, comme les Sarcophyton, libèrent des substances qui gênent leurs voisins, d'où l'intérêt du charbon actif. Les Xenia se multiplient très vite et peuvent envahir le bac.",
        ],
      },
      {
        titre: "Les LPS : un premier pas vers l’exigence",
        image: { src: '/guides/sections/coraux-mous-lps-sps-differences/2.webp', alt: "LPS à gros polypes comme Euphyllia et Trachyphyllia, qui demandent calcium, KH et magnésium plus précis" },
        paragraphes: [
          "Les LPS (« Large Polyp Stony », coraux durs à gros polypes — Euphyllia, Trachyphyllia, Acanthophyllia) demandent des paramètres plus précis (calcium, KH, magnésium) mais restent globalement plus indulgents que les SPS en cas de petite variation. Ils constituent une bonne étape intermédiaire.",
          "Les Euphyllia possèdent de longs tentacules urticants : laissez au moins cinq à dix centimètres d'espace autour d'eux. Les LPS acceptent une lumière modérée et un courant doux, et profitent d'un apport de nourriture. Leur squelette calcaire exige une surveillance régulière du calcium et du KH.",
        ],
      },
      {
        titre: "Les SPS : le niveau exigeant",
        image: { src: '/guides/sections/coraux-mous-lps-sps-differences/3.webp', alt: "SPS comme Acropora et Montipora sous éclairage puissant, réservés aux bacs matures" },
        paragraphes: [
          "Les SPS (« Small Polyp Stony » — Acropora, Montipora) sont les plus sensibles aux variations de paramètres et demandent un éclairage puissant, un brassage important et une chimie de l'eau très stable. Ils ne sont généralement recommandés qu'une fois le bac mature de plusieurs mois, avec des paramètres maîtrisés dans la durée.",
          "Une variation de KH, de salinité ou de température de quelques points peut provoquer la perte de tissu en quelques jours. Un dosage automatique, un suivi rigoureux et un bac mature sont les conditions minimales. Les SPS sont aussi les coraux à la croissance la plus visible et les plus spectaculaires.",
        ],
      },
      {
        titre: "Une progression plutôt qu’un choix figé",
        image: { src: '/guides/sections/coraux-mous-lps-sps-differences/4.webp', alt: "Escalier de difficulté des coraux mous aux LPS puis aux SPS" },
        paragraphes: [
          "Beaucoup de récifalistes mélangent les trois familles dans un même bac en les répartissant selon leurs besoins en lumière et en flux, mais la règle reste la même à l'introduction : ne jamais ajouter de coraux exigeants avant que le bac ait démontré sa stabilité sur la durée.",
          "Une progression classique : démarrer avec quelques coraux mous au cours des premiers mois, ajouter des LPS vers six mois, puis envisager des SPS après un an de stabilité. Chaque étape permet d'apprendre sans prendre de risque excessif.",
        ],
      },
      {
        titre: "Un point de réglementation important",
        paragraphes: [
          "Les coraux durs (SPS et LPS) sont inscrits à l'annexe II de la CITES : leur commerce est encadré et nécessite des documents. Achetez toujours auprès de revendeurs déclarés, de préférence des boutures issues d'élevage, qui limitent la pression sur les récifs naturels. Sur Aquatopia, vérifiez que l'annonce précise l'origine du corail. Les coraux d'élevage sont aussi plus faciles à garder, car déjà habitués à la vie en aquarium.",
        ],
      },
      {
        titre: "Comparaison rapide",
        paragraphes: [
          "Pour retenir l'essentiel :",
        ],
        liste: [
          "Coraux mous : lumière modérée, courant doux, paramètres tolérants. Idéal pour débuter.",
          "LPS : lumière modérée à forte, courant moyen, suivi calcium et KH. Étape intermédiaire.",
          "SPS : lumière forte, courant puissant, chimie très stable. Réservé aux bacs mûrs.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/eclairage-recifal-choisir-led', label: 'Choisir son éclairage récifal' },
      { href: '/guides/quarantaine-poissons-recifal-pourquoi', label: 'Pourquoi une quarantaine en récifal' },
    ],
  },
  {
    slug: 'calcium-kh-magnesium-recifal',
    titre: 'Calcium, KH, magnésium : bien doser les 3 éléments en récifal',
    eyebrow: 'Récifal',
    description:
      "Comment ces trois paramètres interagissent pour la croissance des coraux durs, et les méthodes courantes pour les maintenir stables.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "En récifal, trois paramètres chimiques structurent la vie des coraux durs : le calcium, le KH (alcalinité) et le magnésium. Ils sont liés les uns aux autres, et c'est leur équilibre, plus que chaque valeur isolée, qui détermine la réussite du bac. Voici les repères pour les comprendre et les maintenir.",
        ],
      },
      {
        titre: "Pourquoi ces trois paramètres sont liés",
        image: { src: '/guides/sections/calcium-kh-magnesium-recifal/1.webp', alt: "Les coraux durs puisent calcium et carbonates, le magnésium empêchant leur précipitation" },
        paragraphes: [
          "Les coraux durs (LPS, SPS) puisent calcium et carbonates (mesurés via le KH) dans l'eau pour construire leur squelette, ce qui fait naturellement baisser ces deux paramètres avec le temps. Le magnésium, lui, empêche le calcium et les carbonates de précipiter ensemble : un magnésium trop bas rend le calcium et le KH très instables et difficiles à maintenir, quel que soit le dosage effectué.",
          "Plus un bac contient de coraux durs en croissance, plus ils consomment. Un bac de coraux mous consomme peu, alors qu'un bac de SPS peut faire chuter le KH de plusieurs points en quelques jours. D'où l'importance de mesurer la consommation réelle de votre bac avant de choisir un système de dosage.",
        ],
      },
      {
        titre: "Les fourchettes généralement visées",
        image: { src: '/guides/sections/calcium-kh-magnesium-recifal/2.webp', alt: "Fourchettes de calcium, KH et magnésium visées en récifal : 400 à 450 ppm, 7 à 10 dKH, 1250 à 1350 ppm" },
        paragraphes: [
          "La plupart des récifalistes visent un calcium autour de 400 à 450 ppm, un KH entre 7 et 10 dKH, et un magnésium entre 1250 et 1350 ppm — mais la valeur exacte compte moins que le fait de la maintenir stable dans la durée, en évitant les à-coups.",
          "Pour les SPS, on vise souvent un KH légèrement plus bas (7 à 8,5 dKH) et très stable. La salinité, autour de 35 g/L (densité 1,025), influence aussi la stabilité de l'ensemble. Une variation brutale de KH, même de 1 à 2 points en un jour, peut suffire à stresser des coraux sensibles.",
        ],
      },
      {
        titre: "Les méthodes de dosage courantes",
        image: { src: '/guides/sections/calcium-kh-magnesium-recifal/3.webp', alt: "Eau de chaux, dosage liquide à plusieurs composants et réacteur à calcium" },
        paragraphes: [
          "L'eau de Kalkwasser (eau de chaux) permet de compenser l'évaporation tout en apportant du calcium et en stabilisant le pH — une méthode simple mais limitée aux petits volumes. Les dosages liquides à deux ou trois composants (calcium, carbonates, magnésium séparés) conviennent à la plupart des bacs de taille moyenne. Le réacteur à calcaire, plus technique, convient aux bacs plus chargés en coraux où les besoins de reconstitution sont importants.",
          "Le Kalkwasser est très basique : versez-le lentement, de préférence à débit régulier la nuit, jamais en une seule fois. Dans la méthode Balling, on prépare des solutions séparées de calcium, de carbonates et de magnésium, qu'on dose ensuite à l'aide de pompes doseuses programmables. Ne mélangez jamais les composants à l'état concentré : ils précipitent.",
        ],
      },
      {
        titre: "Tester avant de doser",
        image: { src: '/guides/sections/calcium-kh-magnesium-recifal/4.webp', alt: "Kit de test avant le dosage, car une correction trop rapide peut abîmer les coraux" },
        paragraphes: [
          "Dans tous les cas, mieux vaut tester régulièrement ces trois paramètres avant d'ajuster le dosage plutôt que de doser à l'aveugle : une correction trop rapide d'un paramètre déséquilibré peut être aussi dommageable pour les coraux que le déséquilibre initial.",
          "Corrigez lentement : pas plus de 1 dKH de KH et de 25 à 50 ppm de calcium par jour. Mesurez la consommation sur 24 heures sans dosage, puis ajustez la dose en conséquence. Si le magnésium est trop bas, corrigez-le en premier : sans lui, les autres paramètres ne tiendront pas.",
        ],
      },
      {
        titre: "Les bons réflexes en récifal",
        paragraphes: [
          "Un suivi rigoureux repose sur quelques habitudes :",
        ],
        liste: [
          "Tester les trois paramètres au moins une fois par semaine, et noter les résultats.",
          "Utiliser des tests de qualité, avec des réactifs récents.",
          "Étalonner le réfractomètre avec une solution de référence.",
          "Éviter de changer plusieurs paramètres le même jour.",
          "Automatiser le dosage dès que la consommation devient significative.",
        ],
      },
      {
        titre: "Quand les valeurs dérapent",
        paragraphes: [
          "Un KH qui baisse sans cesse indique une consommation élevée ou un dosage insuffisant. Un calcium qui monte et un KH qui chute signalent une précipitation, souvent due à un magnésium trop bas. En cas de doute, faites un changement d'eau partiel avec une eau de mer bien préparée : cela remet à niveau l'ensemble des éléments, avant de reprendre un dosage progressif.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/coraux-mous-lps-sps-differences', label: 'Coraux mous, LPS, SPS : les différences' },
      { href: '/categorie/materiel', label: 'Voir le matériel de dosage et de test' },
      { href: '/guides/kit-test-eau-aquarium-lequel-choisir', label: 'Quel kit de test choisir' },
      { href: '/guides/materiel-recifal-ecumeur-osmolateur-brassage', label: 'Le matériel récifal expliqué' },
    ],
  },
  {
    slug: 'acclimatation-goutte-a-goutte-poissons-coraux',
    titre: 'Acclimatation des poissons et coraux marins : la méthode du goutte-à-goutte',
    eyebrow: 'Récifal',
    description:
      "Pourquoi une acclimatation progressive est indispensable en eau de mer, et comment la réaliser sans stresser l'animal.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Les animaux marins sont habitués à un milieu extrêmement stable. Les déplacer d'une eau à une autre, même brièvement, demande des précautions. La méthode du goutte-à-goutte est la référence pour acclimater poissons, invertébrés et coraux sans les exposer à un choc.",
        ],
      },
      {
        titre: "Pourquoi l’acclimatation est plus critique en eau de mer",
        image: { src: '/guides/sections/acclimatation-goutte-a-goutte-poissons-coraux/1.webp', alt: "Écart de salinité, température et pH entre l’eau du sachet et celle du bac marin" },
        paragraphes: [
          "Les écarts de salinité, de température et de pH entre l'eau de transport et celle de l'aquarium de destination sont beaucoup plus dangereux pour les organismes marins que pour l'eau douce : un changement brutal de salinité peut provoquer un choc osmotique sévère, parfois fatal en quelques heures.",
          "La salinité varie d'un magasin à l'autre : certains vendent en eau à 1,020, d'autres à 1,026. Mesurez celle du sachet et celle de votre bac avec un réfractomètre, avant de planifier la durée de l'acclimatation. Plus l'écart est grand, plus l'opération doit être lente.",
        ],
      },
      {
        titre: "La méthode du goutte-à-goutte",
        image: { src: '/guides/sections/acclimatation-goutte-a-goutte-poissons-coraux/2.webp', alt: "Tuyau fin qui verse goutte à goutte l’eau du bac dans le récipient de transport sur une à plusieurs heures" },
        paragraphes: [
          "Le sachet de transport est placé (flottant ou dans un récipient à part) pour égaliser la température, puis de l'eau de l'aquarium de destination est ajoutée très progressivement, goutte après goutte à l'aide d'un tuyau fin, sur une durée d'une à plusieurs heures selon la sensibilité de l'espèce — l'idée étant de laisser l'organisme s'adapter très lentement au changement de salinité plutôt que de le transférer d'un coup.",
          "Concrètement, installez un seau ou un récipient sous le bac, versez-y le poisson avec son eau de transport, puis faites couler l'eau du bac par un tuyau d'air muni d'un nœud ou d'une vanne de réglage, à raison de deux à quatre gouttes par seconde. Quand le volume a doublé, videz-en la moitié et recommencez. En général, deux à trois doublements suffisent.",
        ],
      },
      {
        titre: "Ne jamais reverser l’eau de transport dans le bac",
        image: { src: '/guides/sections/acclimatation-goutte-a-goutte-poissons-coraux/3.webp', alt: "L’eau du sachet de transport est jetée et jamais versée dans l’aquarium" },
        paragraphes: [
          "L'eau du sachet ou du sac de transport peut contenir des parasites, des déchets ou des traitements incompatibles avec le bac de destination : elle doit toujours être jetée, jamais versée dans l'aquarium, y compris lors de l'acclimatation.",
          "Utilisez une épuisette pour transférer l'animal sans eau de transport. Évitez aussi d'exposer les coraux à l'air, notamment les coraux mous et les LPS, dont les tissus fragiles peuvent être endommagés.",
        ],
      },
      {
        titre: "Cas particulier des coraux",
        image: { src: '/guides/sections/acclimatation-goutte-a-goutte-poissons-coraux/4.webp', alt: "Acclimatation plus courte des coraux et introduction progressive vers la lumière" },
        paragraphes: [
          "Les coraux supportent en général une acclimatation plus courte que les poissons (30 à 60 minutes suffisent souvent), mais restent sensibles à la lumière : il est préférable de les introduire dans une zone modérément éclairée du bac au départ, puis de les rapprocher progressivement de leur emplacement définitif sur plusieurs jours.",
          "Un bain préventif (« dip ») avant l'introduction permet de retirer d'éventuels parasites. Pour les invertébrés comme les crevettes, les étoiles de mer ou les oursins, particulièrement sensibles aux variations de salinité, prévoyez une acclimatation d'au moins une à deux heures, très lente.",
        ],
      },
      {
        titre: "Matériel et déroulé résumé",
        paragraphes: [
          "Pour réussir l'opération, préparez :",
        ],
        liste: [
          "Un récipient propre, réservé à l'acclimatation.",
          "Un tuyau d'air et une vanne de réglage (ou un nœud) pour contrôler le débit.",
          "Un réfractomètre pour mesurer la salinité.",
          "Une épuisette et un couvercle pour éviter les sauts.",
          "Un éclairage tamisé pour limiter le stress.",
        ],
      },
      {
        titre: "Après l'introduction",
        paragraphes: [
          "Éteignez ou tamisez la lumière pendant quelques heures, surveillez la respiration et le comportement, et ne nourrissez pas avant le lendemain. Un poisson qui reste caché les premiers jours est normal. En cas de doute, une quarantaine préalable dans un bac séparé reste la meilleure garantie pour protéger l'ensemble du récif.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/aquarium-recifal-par-ou-commencer', label: 'Retour au guide du récifal débutant' },
      { href: '/guides/quarantaine-poissons-recifal-pourquoi', label: 'Pourquoi une quarantaine en récifal' },
    ],
  },
  {
    slug: 'demarrer-bassin-jardin',
    titre: 'Bien démarrer un bassin de jardin',
    eyebrow: 'Bassin',
    description:
      "Emplacement, profondeur, filtration et mise en eau : les bases pour créer un bassin de jardin durable.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Créer un bassin de jardin est un projet gratifiant, mais qui ne s'improvise pas. Emplacement, profondeur, filtration, patience : quelques décisions prises dès le départ conditionnent des années de plaisir ou de corvées. Voici les points essentiels à connaître avant de creuser.",
        ],
      },
      {
        titre: "Choisir le bon emplacement",
        image: { src: '/guides/sections/demarrer-bassin-jardin/1.webp', alt: "Bassin bien placé avec quelques heures de soleil et mauvais emplacement sous un arbre" },
        paragraphes: [
          "Un emplacement recevant quelques heures de soleil mais pas en plein soleil toute la journée limite la prolifération d'algues et les variations de température excessives. Il faut aussi éviter de placer un bassin directement sous de grands arbres, dont les feuilles mortes en automne se décomposent et dégradent la qualité de l'eau.",
          "Choisissez un endroit visible depuis la maison, mais à l'abri des écoulements d'eau de pluie chargés d'engrais ou de terre. Pensez à l'accès à l'électricité pour la pompe et à l'eau pour le remplissage. Renseignez-vous aussi sur les règles locales et la sécurité, notamment si de jeunes enfants fréquentent le jardin.",
        ],
      },
      {
        titre: "La profondeur, un critère souvent sous-estimé",
        image: { src: '/guides/sections/demarrer-bassin-jardin/2.webp', alt: "Coupe d’un bassin de 80 centimètres à un mètre de profondeur avec paliers pour accueillir des poissons toute l’année" },
        paragraphes: [
          "Pour accueillir des poissons à l'année (Koï, poissons rouges), une zone d'au moins 80 cm à 1 mètre de profondeur est nécessaire pour éviter que le bassin ne gèle entièrement en hiver ou ne surchauffe en été. Des paliers de profondeurs variées permettent aussi d'accueillir davantage de plantes aquatiques.",
          "Prévoyez des paliers : une zone de berge de 10 à 20 centimètres pour les plantes de rives, une zone de 40 à 60 centimètres pour les nénuphars et une zone profonde au centre. Les bords doivent être suffisamment abrupts pour décourager les prédateurs.",
        ],
      },
      {
        titre: "La filtration, indispensable dès qu’il y a des poissons",
        image: { src: '/guides/sections/demarrer-bassin-jardin/3.webp', alt: "Bassin avec pompe et filtration mécanique puis biologique" },
        paragraphes: [
          "Contrairement à une mare purement végétale, un bassin avec poissons a besoin d'une filtration mécanique (retenir les particules) et biologique (transformer les déchets azotés) dimensionnée au volume total et à la population de poissons prévue à terme.",
          "Pour un bassin de poissons rouges, comptez un volume minimum de 1 000 à 2 000 litres. Les koï nécessitent beaucoup plus. Un bassin trop petit chauffe et refroidit trop vite, ce qui fatigue les poissons.",
        ],
      },
      {
        titre: "Laisser le bassin se stabiliser avant d’introduire les poissons",
        image: { src: '/guides/sections/demarrer-bassin-jardin/4.webp', alt: "Bassin neuf sans poisson pendant quelques semaines pour installer le cycle biologique" },
        paragraphes: [
          "Comme pour un aquarium, un bassin neuf a besoin de quelques semaines pour que son cycle biologique s'installe avant d'accueillir des poissons — une étape à ne pas précipiter, même si l'envie de peupler le bassin rapidement est grande.",
          "Remplissez, mettez la pompe en route, plantez, et attendez quatre à six semaines avant l'arrivée des poissons. Testez l'eau pour vérifier que l'ammoniac et les nitrites sont retombés à zéro. Si l'eau est du réseau, utilisez un conditionneur pour neutraliser le chlore.",
        ],
      },
      {
        titre: "Les étapes de la construction",
        paragraphes: [
          "Pour un bassin à bâche, la séquence est la suivante :",
        ],
        liste: [
          "Tracer la forme et creuser les paliers, en vérifiant le niveau.",
          "Poser une sous-couche de protection (sable, géotextile) contre les pierres coupantes.",
          "Installer la bâche (EPDM ou PVC), avec un surplus pour les bords.",
          "Aménager les berges avec des pierres, des galets ou des plantes.",
          "Installer pompe et filtre, puis remplir lentement.",
          "Planter dès que le bassin est plein, avant d'ajouter les poissons.",
        ],
      },
      {
        titre: "Bâche, coque ou béton",
        paragraphes: [
          "La bâche souple (EPDM, PVC) offre la liberté de forme et reste le choix le plus répandu : elle est résistante et adaptable. Les coques préformées sont plus rapides à installer mais limitent les formes et les profondeurs. Le béton est durable mais exige un savoir-faire important. Pour un premier bassin, la bâche est un bon compromis entre budget, durabilité et souplesse.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/biotope/bassin', label: 'Voir les annonces de bassin' },
      { href: '/guides/pompe-filtration-bassin-bien-choisir', label: 'Pompe et filtration de bassin' },
      { href: '/guides/plantes-bassin-oxygenantes-epuratrices', label: 'Les plantes de bassin' },
    ],
  },
  {
    slug: 'choisir-filtration-aquarium',
    titre: 'Filtre interne, externe, sur-verre : lequel choisir pour son aquarium ?',
    eyebrow: 'Matériel',
    description:
      "Les avantages et limites des principaux types de filtration d'aquarium, pour choisir celui adapté à votre bac.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Le choix du filtre dépend avant tout du volume de l'aquarium, de son peuplement et de votre budget. Il n'y a pas de filtre universel, mais chaque famille répond à des besoins précis. Voici les trois grands systèmes et leurs avantages.",
        ],
      },
      {
        titre: "Le filtre interne",
        image: { src: '/guides/sections/choisir-filtration-aquarium/1.webp', alt: "Aquarium avec un filtre interne visible dans le bac, avantages et limites du filtre interne" },
        paragraphes: [
          "Compact et peu coûteux, le filtre interne se place directement dans le bac. Il convient bien aux petits volumes, mais sa capacité de masse filtrante reste limitée et il prend de la place visible dans l'aquarium.",
          "Il est simple à installer et à entretenir, ce qui en fait le choix classique pour un premier aquarium de moins de 100 litres. En contrepartie, son encombrement dans le bac, son bruit éventuel et son débit réduit en cas de colmatage sont des limites à connaître.",
        ],
      },
      {
        titre: "Le filtre externe",
        image: { src: '/guides/sections/choisir-filtration-aquarium/2.webp', alt: "Aquarium avec un filtre externe rangé dans le meuble et relié au bac par deux tuyaux" },
        paragraphes: [
          "Placé sous le meuble, à l'extérieur du bac, le filtre externe offre un volume de masses filtrantes bien supérieur et ne prend aucune place dans l'aquarium. C'est la solution la plus courante à partir d'une soixantaine de litres, en particulier pour des bacs plantés ou fortement peuplés.",
          "Son investissement est plus élevé, et son entretien demande un peu plus de manipulations (fermeture des robinets, purge de l'air). Il offre en échange une grande stabilité biologique et une filtration silencieuse, avec un volume de masses nettement plus important.",
        ],
      },
      {
        titre: "Le filtre sur-verre (à décantation)",
        image: { src: '/guides/sections/choisir-filtration-aquarium/3.webp', alt: "Aquarium au-dessus d’un meuble contenant une sump avec compartiments, écumeur et pompe de retour" },
        paragraphes: [
          "Utilisé en récifal et dans certains bacs d'eau douce haut de gamme, le filtre sur-verre (« sump ») déporte la filtration, le chauffage et parfois l'écumeur dans un compartiment ou un bac séparé sous le meuble, relié par une gorge en verre. Il offre le plus grand volume de filtration et de flexibilité, au prix d'une installation plus complexe et plus coûteuse.",
          "Il augmente aussi le volume d'eau total du système, ce qui améliore la stabilité. Il exige en revanche un aquarium percé ou équipé d'une cheminée, et une bonne maîtrise du niveau d'eau pour éviter les débordements en cas de coupure.",
        ],
      },
      {
        titre: "Ce qui compte le plus : le débit adapté au volume",
        image: { src: '/guides/sections/choisir-filtration-aquarium/4.webp', alt: "Débit du filtre égal à quatre à six fois le volume du bac par heure, filtre légèrement surdimensionné plutôt que trop juste" },
        paragraphes: [
          "Quel que soit le type choisi, le critère principal reste un débit de filtration adapté au volume du bac (on vise généralement 4 à 6 fois le volume du bac par heure en eau douce) — un filtre surdimensionné reste presque toujours préférable à un filtre trop juste.",
          "Le débit indiqué par le fabricant est mesuré à vide : il baisse de 30 à 50 % quand les masses filtrantes sont chargées. Attention toutefois aux espèces qui n'aiment pas le courant fort (Bettas, Scalaires, poissons à voiles) : choisissez un filtre réglable, ou un diffuseur qui casse le jet.",
        ],
      },
      {
        titre: "Les autres systèmes à connaître",
        paragraphes: [
          "D'autres filtres répondent à des situations particulières :",
        ],
        liste: [
          "Filtre à air à mousse : idéal pour la quarantaine, l'élevage d'alevins et les crevettes.",
          "Filtre en cascade (suspendu) : accroché à l'arrière du bac, facile à entretenir mais bruyant.",
          "Filtre de fond : plaque sous le substrat, désormais peu utilisé.",
          "Filtre à sac : un coffret fermé dans l'aquarium, pratique mais de petite capacité.",
        ],
      },
      {
        titre: "Comment décider",
        paragraphes: [
          "Pour un premier bac de 60 à 100 litres, un filtre externe de qualité constitue un excellent investissement, et vous accompagnera si vous changez d'aquarium. Pour un petit bac de moins de 54 litres, un filtre interne bien dimensionné suffit. Pour un projet récifal ou un très grand volume, la décantation devient la référence. Quel que soit votre choix, consultez les avis sur le niveau sonore et la facilité d'entretien, deux critères qui comptent beaucoup à l'usage.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/materiel', label: 'Voir les filtres en vente' },
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Retour au guide de démarrage' },
      { href: '/guides/role-du-filtre-dans-aquarium', label: 'Comprendre le rôle du filtre' },
      { href: '/guides/entretien-filtre-aquarium-bonne-frequence', label: 'Entretien du filtre' },
    ],
  },
  {
    slug: 'meilleur-aquarium-pour-debutant',
    titre: 'Quel aquarium choisir pour débuter ? Notre comparatif',
    eyebrow: 'Comparatif',
    description:
      "Bocal, nano-aquarium, kit tout-équipé ou bac + matériel séparé : comment choisir son premier aquarium selon son budget et son espace.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Pour un premier aquarium, la question n'est pas tant la marque que le type de projet et le volume. Un mauvais choix de départ (trop petit, mal équipé, mal placé) complique l'entretien et décourage rapidement. Voici les différentes options et leurs avantages, pour décider en connaissance de cause.",
        ],
      },
      {
        titre: "Pourquoi éviter le bocal ou le très petit volume",
        image: { src: '/guides/sections/meilleur-aquarium-pour-debutant/1.webp', alt: "Bocal sans filtre ni chauffage comparé à un aquarium de 54 à 60 litres plus stable pour un débutant" },
        paragraphes: [
          "Un bocal sans filtre ni chauffage ne permet pas de maintenir des paramètres d'eau stables, ce qui expose les poissons à un stress constant. Même pour un premier bac, un volume de 54 à 60 litres minimum reste beaucoup plus simple à équilibrer et pardonne davantage les erreurs de débutant.",
          "Dans un petit volume, la moindre pollution se concentre rapidement, et les écarts de température sont brutaux. Les aquariums « nano » de moins de 30 litres sont possibles mais plutôt réservés aux aquariophiles qui ont déjà de l'expérience, avec des crevettes ou des poissons miniatures.",
        ],
      },
      {
        titre: "Le kit tout-équipé : simple mais parfois limité",
        image: { src: '/guides/sections/meilleur-aquarium-pour-debutant/2.webp', alt: "Kit avec aquarium, filtre, éclairage et chauffage inclus, simple à acheter mais au filtre parfois juste" },
        paragraphes: [
          "Les kits vendus avec aquarium, filtre, éclairage et parfois chauffage intégrés simplifient l'achat et conviennent bien à un premier bac. Leur principale limite est un filtre souvent un peu juste pour le volume, qu'il est possible de compléter par la suite si besoin.",
          "Vérifiez le contenu du kit avant d'acheter : un chauffage est-il fourni, l'éclairage est-il adapté aux plantes, le filtre suffit-il pour le peuplement envisagé ? Un kit incomplet peut sembler économique mais nécessiter des achats supplémentaires. Prévoyez toujours un meuble ou un support adapté.",
        ],
      },
      {
        titre: "Aquarium et matériel séparés : plus de flexibilité",
        image: { src: '/guides/sections/meilleur-aquarium-pour-debutant/3.webp', alt: "Aquarium, filtre et éclairage choisis séparément pour mieux correspondre au projet" },
        paragraphes: [
          "Choisir chaque élément séparément (bac, filtre, éclairage) permet de mieux dimensionner chaque composant à son projet, en particulier pour un bac planté ou déjà orienté vers une espèce précise. Cette option demande un peu plus de recherche mais évite d'avoir à tout changer plus tard.",
          "Cette approche permet d'investir dans un bon filtre externe et un éclairage LED réglable dès le départ. Elle convient bien si vous visez un bac planté, un biotope particulier ou un aquarium qui doit évoluer avec le temps.",
        ],
      },
      {
        titre: "L'occasion, une option à ne pas négliger",
        image: { src: '/guides/sections/meilleur-aquarium-pour-debutant/4.webp', alt: "Aquarium d’occasion de grand volume au même prix, avec contrôle de l’étanchéité et du silicone" },
        paragraphes: [
          "Un aquarium ou un kit d'occasion en bon état permet souvent d'obtenir un volume plus généreux pour le même budget qu'un petit kit neuf — un point clé à vérifier étant l'étanchéité et l'état du silicone.",
          "Demandez au vendeur de remplir le bac devant vous si possible, regardez les joints, les éclats sur les vitres et l'état du matériel. Sur Aquatopia, vous pouvez contacter directement le vendeur et poser vos questions avant de vous déplacer.",
        ],
      },
      {
        titre: "Quel volume et quelles dimensions",
        paragraphes: [
          "Pour un premier bac, ces repères fonctionnent bien :",
        ],
        liste: [
          "54 à 60 litres (60 × 30 × 30 cm) : bon point de départ, compact et équilibré.",
          "80 à 112 litres (80 à 100 cm de long) : plus de marge de manœuvre et de choix d'espèces.",
          "Plus de 150 litres : intéressant pour des espèces plus grandes, mais nécessite un meuble solide et un budget plus élevé.",
          "Préférer un bac long plutôt que haut : plus de surface d'échange avec l'air et d'espace de nage.",
        ],
      },
      {
        titre: "Nos conseils pour choisir",
        paragraphes: [
          "Prenez le plus grand volume que votre budget et votre espace permettent, investissez dans une bonne filtration, et gardez la possibilité d'évoluer. N'oubliez pas le meuble, le substrat, le décor, les tests et le conditionneur d'eau, souvent oubliés du budget. Et surtout, prenez le temps du cyclage : le bac idéal est celui que vous saurez entretenir avec plaisir, pas celui qui impressionne le plus en magasin.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/cuves', label: 'Voir les aquariums en vente' },
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Retour au guide de démarrage' },
      { href: '/guides/budget-demarrer-aquarium', label: 'Combien coûte un aquarium' },
      { href: '/guides/acheter-aquarium-occasion-verifications', label: 'Acheter un aquarium d’occasion' },
    ],
  },
  {
    slug: 'quel-filtre-choisir-selon-volume',
    titre: 'Quel filtre choisir selon le volume de son aquarium ?',
    eyebrow: 'Comparatif',
    description:
      "Filtre interne, externe ou sur-verre : quel type de filtration convient le mieux selon la taille de votre aquarium.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Le volume de l'aquarium est le premier critère pour choisir un filtre. Chaque taille de bac a ses solutions adaptées, de la plus simple à la plus sophistiquée. Voici un guide pratique, volume par volume, avec les débits à viser.",
        ],
      },
      {
        titre: "Petits volumes (jusqu’à 60 litres environ)",
        image: { src: '/guides/sections/quel-filtre-choisir-selon-volume/1.webp', alt: "Petit aquarium équipé d’un filtre interne pour un volume jusqu’à environ 60 litres" },
        paragraphes: [
          "Un filtre interne suffit généralement pour ce volume, à condition de vérifier que son débit reste adapté (4 à 6 fois le volume du bac par heure). Il présente l'avantage d'être simple à installer et peu coûteux.",
          "Pour un bac de 54 litres, visez un débit de 220 à 330 litres par heure. Dans les très petits volumes (moins de 30 litres), un filtre à air à mousse ou un petit filtre interne convient parfaitement, avec un débit réglable pour ne pas fatiguer les poissons.",
        ],
      },
      {
        titre: "Volumes moyens à grands (60 à 300 litres environ)",
        image: { src: '/guides/sections/quel-filtre-choisir-selon-volume/2.webp', alt: "Aquarium moyen ou grand avec un filtre externe rangé dans le meuble" },
        paragraphes: [
          "Un filtre externe devient généralement plus adapté : il offre un volume de masses filtrantes bien supérieur, ne prend aucune place visible dans le bac, et convient bien aux bacs plantés ou fortement peuplés.",
          "Pour un bac de 100 litres, visez 400 à 600 litres par heure. Pour 200 litres, 800 à 1 200. Pour 300 litres, 1 200 à 1 800. Pour un très grand bac, deux filtres plus petits offrent une redondance : en cas de panne de l'un, l'autre assure la continuité.",
        ],
      },
      {
        titre: "Grands volumes et récifal",
        image: { src: '/guides/sections/quel-filtre-choisir-selon-volume/3.webp', alt: "Grand aquarium au-dessus d’une sump avec écumeur et pompe de retour" },
        paragraphes: [
          "Au-delà, ou pour un bac récifal, un filtre sur-verre (sump) devient intéressant : il permet de déporter filtration, chauffage et écumeur dans un compartiment séparé, au prix d'une installation plus complexe.",
          "En récifal, la filtration repose davantage sur la roche vivante, l'écumeur et le brassage que sur un filtre classique. Le décanteur offre un grand volume d'eau supplémentaire, qui améliore la stabilité du système.",
        ],
      },
      {
        titre: "Le critère qui prime sur tout le reste",
        image: { src: '/guides/sections/quel-filtre-choisir-selon-volume/4.webp', alt: "Aquarium aux déchets accumulés avec un filtre trop juste comparé à un aquarium clair avec un filtre légèrement surdimensionné" },
        paragraphes: [
          "Quel que soit le type retenu, un débit de filtration légèrement surdimensionné par rapport au volume réel du bac reste presque toujours préférable à un filtre trop juste, qui laisse s'accumuler les déchets plus vite qu'il ne les traite.",
          "Gardez en tête que le débit annoncé est mesuré à vide : il diminue de 30 à 50 % dès que les masses filtrantes s'encrassent. Un filtre « juste » sur le papier devient vite insuffisant en conditions réelles.",
        ],
      },
      {
        titre: "Ajuster selon le peuplement",
        paragraphes: [
          "Le volume n'est qu'un point de départ. Il faut aussi tenir compte de ce qui vit dans le bac :",
        ],
        liste: [
          "Poissons rouges et gros mangeurs : prévoir une filtration renforcée, de l'ordre de 8 à 10 fois le volume.",
          "Cichlidés du Malawi et bacs très peuplés : plutôt 8 fois le volume par heure.",
          "Bacs plantés peu peuplés : 3 à 5 fois suffisent.",
          "Crevettes et alevins : un débit doux, avec protection de l'aspiration.",
          "Poissons à voiles (Bettas, Scalaires) : un flux faible, ou un diffuseur qui casse le jet.",
        ],
      },
      {
        titre: "Penser au budget et à l'évolution",
        paragraphes: [
          "Un filtre un peu plus grand que nécessaire coûte souvent peu de plus, et vous évite de le remplacer si vous agrandissez votre peuplement ou changez de bac. Vérifiez aussi la disponibilité des pièces de rechange et des masses filtrantes, et privilégiez un modèle dont l'entretien est simple : on entretient mieux ce qui est facile à démonter. Sur Aquatopia, les filtres d'occasion de qualité se trouvent à des prix intéressants.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-filtration-aquarium', label: 'Filtre interne, externe, sur-verre : le détail' },
      { href: '/categorie/materiel', label: 'Voir les filtres en vente' },
      { href: '/guides/filtre-interne-ou-externe-comparatif', label: 'Filtre interne ou externe' },
      { href: '/guides/role-du-filtre-dans-aquarium', label: 'Comprendre le rôle du filtre' },
    ],
  },
  {
    slug: 'eau-douce-ou-eau-de-mer-comment-choisir',
    titre: 'Eau douce ou eau de mer : comment choisir son premier aquarium ?',
    eyebrow: 'Comparatif',
    description:
      "Budget, technicité, temps d'entretien : les vrais critères pour choisir entre un aquarium d'eau douce et un aquarium récifal.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "L'aquarium d'eau de mer fascine : coraux colorés, poissons de récif, atmosphère de plongée. Mais il ne s'improvise pas, et beaucoup de passionnés commencent par l'eau douce avant de franchir le pas. Voici les principales différences pour choisir en connaissance de cause.",
        ],
      },
      {
        titre: "Le budget de départ",
        image: { src: '/guides/sections/eau-douce-ou-eau-de-mer-comment-choisir/1.webp', alt: "Budget d’un aquarium d’eau douce comparé à celui d’un récifal avec écumeur, pompes, éclairage et tests" },
        paragraphes: [
          "L'eau douce demande généralement un budget de départ plus accessible (bac, filtre, chauffage, éclairage basique), tandis que le récifal ajoute des postes de dépense supplémentaires (écumeur, pompes de brassage, éclairage puissant, tests spécifiques), ce qui augmente sensiblement l'investissement initial.",
          "À cela s'ajoutent le sel marin, l'osmoseur pour produire l'eau de qualité, le réfractomètre, les dosages de calcium et de magnésium, et les animaux eux-mêmes, souvent plus chers : un poisson marin ou un corail coûte nettement plus qu'un poisson d'eau douce. Un bac récifal complet se chiffre en plusieurs centaines à plusieurs milliers d'euros.",
        ],
      },
      {
        titre: "La technicité et la marge d’erreur",
        image: { src: '/guides/sections/eau-douce-ou-eau-de-mer-comment-choisir/2.webp', alt: "Plage de paramètres tolérée large en eau douce et étroite en récifal marin" },
        paragraphes: [
          "Les poissons d'eau douce tropicaux tolèrent en général une fourchette de paramètres assez large tant qu'elle reste stable. Le récifal marin, en particulier avec des coraux, demande des paramètres beaucoup plus précis (salinité, calcium, KH, magnésium) et laisse moins de marge d'erreur.",
          "La salinité doit rester stable autour de 35 g/L, la température entre 24 et 26 °C, et plusieurs éléments chimiques doivent être dosés régulièrement. Le cyclage d'un bac marin est aussi plus long, souvent de deux à trois mois avant d'introduire les premiers animaux.",
        ],
      },
      {
        titre: "Le temps d’entretien",
        image: { src: '/guides/sections/eau-douce-ou-eau-de-mer-comment-choisir/3.webp', alt: "Entretien hebdomadaire simple en eau douce comparé à un suivi quotidien des paramètres en récifal" },
        paragraphes: [
          "Un aquarium d'eau douce classique demande un entretien hebdomadaire assez simple (changement d'eau partiel, nettoyage du filtre). Le récifal implique un suivi plus régulier des paramètres et souvent un dosage de plusieurs éléments (calcium, KH, magnésium) pour rester stable.",
          "Il faut prévoir des tests plus fréquents, le nettoyage de l'écumeur, le remplissage de l'osmolateur, la préparation d'eau de mer artificielle pour les changements d'eau. Ce suivi plus intensif est un plaisir pour certains, une contrainte pour d'autres.",
        ],
      },
      {
        titre: "Notre recommandation pour un premier bac",
        image: { src: '/guides/sections/eau-douce-ou-eau-de-mer-comment-choisir/4.webp', alt: "Parcours conseillé de l’aquarium d’eau douce vers un projet récifal plus tard" },
        paragraphes: [
          "Pour une toute première expérience, l'eau douce reste le point d'entrée le plus accessible pour apprendre les bases (cyclage, paramètres, alimentation) avant de se lancer, si l'envie est là, dans un projet récifal plus tard, avec l'expérience acquise entre-temps.",
          "Un an d'eau douce vous apprend à observer, à tester et à réagir. Ces réflexes sont précieux en récifal, où une erreur se paie plus vite et plus cher. Si l'envie du marin est forte, commencez par un petit bac de coraux mous, plus indulgents.",
        ],
      },
      {
        titre: "Comparaison rapide",
        paragraphes: [
          "Pour fixer les idées :",
        ],
        liste: [
          "Budget : eau douce plus accessible, récifal nettement plus élevé.",
          "Paramètres : tolérance plus large en eau douce, grande précision en récifal.",
          "Choix d'espèces : très vaste en eau douce, plus réduit et plus réglementé en marin.",
          "Entretien : hebdomadaire et simple en eau douce, plus intensif en récifal.",
          "Évolution : l'eau douce est un excellent apprentissage avant l'eau de mer.",
        ],
      },
      {
        titre: "Un enjeu : l'origine des animaux",
        paragraphes: [
          "Les poissons et coraux marins sont encore largement prélevés dans le milieu naturel, et les coraux durs sont protégés par la CITES. Privilégiez les animaux d'élevage et les boutures de coraux, plus résistants et plus respectueux des récifs. En eau douce, la plupart des poissons communs sont élevés en captivité depuis plusieurs générations, ce qui facilite leur maintien et limite l'impact sur la nature.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/aquarium-recifal-par-ou-commencer', label: 'Démarrer en récifal' },
      { href: '/guides/budget-demarrer-aquarium', label: 'Combien coûte un aquarium' },
    ],
  },
  {
    slug: 'budget-demarrer-aquarium',
    titre: "Combien coûte un aquarium ? Le budget réel pour démarrer",
    eyebrow: 'Débuter',
    description:
      "Aquarium, filtre, chauffage, éclairage, entretien mensuel : le budget réaliste pour démarrer l'aquariophilie, en neuf comme en occasion.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Combien coûte réellement un aquarium ? La réponse dépend du volume, du matériel et du type de bac, mais on peut dégager des ordres de grandeur. Les fourchettes ci-dessous sont indicatives et varient selon les marques, les promotions et l'état du marché de l'occasion : comparez toujours plusieurs offres avant d'acheter.",
        ],
      },
      {
        titre: "Le budget d'équipement de départ",
        image: { src: '/guides/sections/budget-demarrer-aquarium/1.webp', alt: "Un kit tout équipé : aquarium, filtre, chauffage et éclairage, avec une option d’occasion qui réduit la mise de départ" },
        paragraphes: [
          "Un kit tout équipé (bac, filtre, chauffage, éclairage) couvre l'essentiel pour un premier bac, avec une fourchette de prix qui varie surtout selon le volume. Acheter séparément permet souvent de mieux choisir chaque élément, mais demande un peu plus de recherche. Dans les deux cas, passer par de l'occasion réduit fortement cette mise de départ, en particulier sur le bac et le meuble, les postes les plus coûteux en neuf.",
          "Pour un bac de 60 à 100 litres, comptez en neuf quelques centaines d'euros pour l'ensemble : cuve, meuble, filtre, chauffage, éclairage, substrat, décor et conditionneur. À cela s'ajoutent un kit de tests (environ 25 à 40 euros) et de petits accessoires (épuisette, siphon, seau, thermomètre).",
        ],
      },
      {
        titre: "Le budget des premiers habitants",
        image: { src: '/guides/sections/budget-demarrer-aquarium/2.webp', alt: "Comparaison entre un aquarium de poissons robustes au coût modeste et un projet récifal au budget bien plus élevé" },
        paragraphes: [
          "Les poissons et plantes robustes recommandés pour débuter restent généralement d'un coût modeste. Les espèces plus rares, ou un projet récifal avec des coraux, représentent un budget nettement plus élevé — une bonne raison de bien se renseigner avant de se lancer dans ce type de projet.",
          "Un poisson de communautaire coûte quelques euros pièce, mais on achète souvent des groupes de six à dix individus. Les plantes se négocient de quelques euros l'unité, avec la possibilité de récupérer des boutures auprès d'autres aquariophiles. Un aquarium récifal, lui, peut atteindre plusieurs milliers d'euros à cause du matériel et des coraux.",
        ],
      },
      {
        titre: "Le budget d'entretien mensuel",
        image: { src: '/guides/sections/budget-demarrer-aquarium/3.webp', alt: "Les postes de dépense mensuels : nourriture, électricité du chauffage et de l’éclairage, consommables" },
        paragraphes: [
          "Au-delà de l'achat initial, il faut compter la nourriture, l'électricité du chauffage et de l'éclairage, ainsi que le remplacement occasionnel de consommables (masses filtrantes, réactifs de test). C'est un budget modeste mais réel, à anticiper avant de se lancer plutôt qu'à découvrir après coup.",
          "Pour un bac moyen, la consommation électrique (chauffage, filtre, éclairage) représente en ordre de grandeur une dizaine d'euros par mois, la nourriture quelques euros, et les consommables un peu plus occasionnellement. Prévoyez une petite réserve pour les imprévus, comme le remplacement d'un chauffage ou d'une pompe.",
        ],
      },
      {
        titre: "Où l'occasion permet de vraiment économiser",
        image: { src: '/guides/sections/budget-demarrer-aquarium/4.webp', alt: "À gauche le matériel durable à acheter d’occasion, à droite les consommables à acheter neufs" },
        paragraphes: [
          "Le matériel volumineux et durable (bac, meuble, filtre externe, éclairage) se revend et s'achète bien d'occasion, avec une décote importante par rapport au neuf. Les consommables (nourriture, réactifs de test, masses filtrantes) restent en revanche à acheter neufs, pour des raisons évidentes d'hygiène et d'efficacité.",
          "Pour un bac d'occasion, vérifiez l'étanchéité et l'état du silicone, le bon fonctionnement du matériel, et testez-le plein d'eau quelques jours chez vous avant d'y mettre des poissons.",
        ],
      },
      {
        titre: "Un exemple de répartition du budget",
        paragraphes: [
          "Pour vous repérer, voici les principaux postes d'un premier bac complet :",
        ],
        liste: [
          "La cuve et le meuble : le poste le plus important, souvent un tiers à la moitié du total.",
          "La filtration : entre 10 et 20 % du budget, à ne pas rogner.",
          "L'éclairage et le chauffage : quelques dizaines d'euros chacun.",
          "Le substrat, le décor et les plantes : 15 à 25 % selon l'ambition.",
          "Les tests, le conditionneur et les accessoires : une petite somme, mais indispensable.",
          "Les poissons : à acheter en dernier, après la fin du cyclage.",
        ],
      },
      {
        titre: "Les économies qui ne coûtent pas cher",
        paragraphes: [
          "Certaines économies sont raisonnables : acheter d'occasion le meuble et la cuve, récupérer des plantes auprès d'autres aquariophiles, préférer un éclairage LED qui consomme moins. D'autres sont risquées : rogner sur la filtration, acheter des tests de mauvaise qualité ou renoncer au conditionneur. Un budget bien réparti coûte moins cher qu'un bac improvisé qu'il faut refaire.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/cuves', label: 'Voir les aquariums en vente' },
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Démarrer un aquarium d’eau douce' },
      { href: '/guides/acheter-aquarium-occasion-verifications', label: 'Acheter un aquarium d’occasion' },
      { href: '/guides/aquarium-neuf-ou-occasion-comparatif', label: 'Neuf ou occasion : le comparatif' },
    ],
  },
  {
    slug: 'erreurs-debutant-aquariophilie',
    titre: "Les erreurs de débutant les plus fréquentes en aquariophilie (et comment les éviter)",
    eyebrow: 'Débuter',
    description:
      "Cyclage sauté, suralimentation, bac trop peuplé trop vite : les erreurs classiques des nouveaux aquariophiles, et les bons réflexes pour les éviter.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Tout le monde commet des erreurs en démarrant un aquarium. La plupart sont évitables avec quelques repères simples, et connaître les plus courantes permet de gagner des mois de tâtonnements. Voici celles que l'on retrouve le plus souvent chez les nouveaux aquariophiles, et la façon de les éviter.",
        ],
      },
      {
        titre: "Précipiter le démarrage",
        image: { src: '/guides/sections/erreurs-debutant-aquariophilie/1.webp', alt: "Trois erreurs de démarrage : poissons avant la fin du cyclage, peuplement d’un coup, bac trop petit" },
        paragraphes: [
          "Introduire des poissons avant la fin du cyclage, peupler l'aquarium d'un coup au lieu d'y aller progressivement, ou choisir un bac trop petit pour gagner en marge d'erreur : la plupart des premiers échecs viennent d'un démarrage trop rapide, avant que l'équilibre biologique du bac ait eu le temps de s'installer.",
          "Le réflexe à adopter est de laisser tourner le bac plusieurs semaines avant d'y mettre le moindre poisson, de tester l'eau et de n'introduire que quelques animaux à la fois. L'impatience coûte souvent plus cher que le temps d'attente.",
        ],
      },
      {
        titre: "Mal doser l'entretien courant",
        image: { src: '/guides/sections/erreurs-debutant-aquariophilie/2.webp', alt: "Suralimentation, changements d’eau trop rares et changements d’eau trop fréquents ou trop importants" },
        paragraphes: [
          "Suralimenter reste la cause la plus fréquente de pics d'ammoniac, tandis que des changements d'eau trop rares laissent les nitrates s'accumuler. À l'inverse, des changements d'eau trop fréquents ou trop importants peuvent déstabiliser un bac déjà équilibré. La régularité compte plus que l'intensité.",
          "Autre piège classique : le nettoyage excessif. Rincer le filtre sous le robinet, tout démonter le même jour ou utiliser du savon détruit les bactéries utiles et peut ramener le bac à un état de bac neuf. Un entretien simple, hebdomadaire, vaut mieux qu'un grand nettoyage occasionnel.",
        ],
      },
      {
        titre: "Sous-estimer les besoins des poissons",
        image: { src: '/guides/sections/erreurs-debutant-aquariophilie/3.webp', alt: "Un poisson vendu jeune devient bien plus grand, et beaucoup d’espèces ont besoin de vivre en groupe" },
        paragraphes: [
          "Beaucoup d'espèces vendues jeunes atteignent une taille adulte bien plus importante, ou ont besoin de vivre en groupe pour ne pas stresser. Vérifier ces besoins avant l'achat évite bien des déceptions et des soucis de cohabitation quelques mois plus tard.",
          "Ce point concerne aussi la compatibilité : associer au hasard des espèces dans un même bac conduit souvent à des poissons harcelés ou mangés. Poisson rouge et poissons tropicaux ne vivent pas à la même température, et un Cichlidé territorial n'a pas sa place dans un bac communautaire de petits poissons paisibles.",
        ],
      },
      {
        titre: "Négliger le suivi",
        image: { src: '/guides/sections/erreurs-debutant-aquariophilie/4.webp', alt: "Tests d’eau réguliers à gauche, poisson léthargique à surveiller de près à droite" },
        paragraphes: [
          "Ne tester l'eau qu'en cas de problème visible, au lieu de le faire régulièrement, retarde souvent la détection d'un déséquilibre. Un poisson léthargique ou qui perd l'appétit est un signal à prendre au sérieux tout de suite, pas à surveiller « pour voir ».",
          "Quelques minutes d'observation chaque jour, au moment du repas, suffisent à repérer un comportement anormal : nage saccadée, nageoires collées, taches blanches, respiration rapide. Plus on réagit tôt, plus on a de chances de sauver le poisson.",
        ],
      },
      {
        titre: "Autres erreurs fréquentes",
        paragraphes: [
          "Au-delà de ces quatre grandes erreurs, quelques oublis reviennent régulièrement et se corrigent facilement :",
        ],
        liste: [
          "Oublier le conditionneur d'eau : le chlore et les chloramines du robinet sont toxiques pour les poissons et les bactéries.",
          "Placer le bac près d'une fenêtre ou d'un radiateur : le soleil favorise les algues et les écarts de température fatiguent les poissons.",
          "Acheter plusieurs poissons d'un coup sur un coup de cœur, sans connaître leur compatibilité.",
          "Négliger la quarantaine : un nouvel arrivant malade peut contaminer tout le bac.",
          "Traiter à l'aveugle : un médicament inadapté ou mal dosé aggrave souvent la situation.",
          "Laisser le bac sans couvercle avec des espèces sauteuses.",
        ],
      },
      {
        titre: "Les réflexes qui changent tout",
        paragraphes: [
          "Se renseigner avant d'acheter, avancer lentement, tester l'eau régulièrement, nourrir avec parcimonie et entretenir chaque semaine : ces cinq habitudes suffisent à éviter l'essentiel des échecs. En cas de doute, ne faites pas plusieurs modifications à la fois : un seul changement à la fois permet de comprendre ce qui fonctionne.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
      { href: '/guides/reconnaitre-poisson-malade-stresse', label: 'Reconnaître un poisson malade ou stressé' },
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Démarrer un aquarium d’eau douce' },
      { href: '/guides/quel-volume-aquarium-choisir-espece', label: 'Quel volume d’aquarium choisir ?' },
    ],
  },
  {
    slug: 'reconnaitre-poisson-malade-stresse',
    titre: 'Comment reconnaître un poisson malade ou stressé ?',
    eyebrow: 'Comprendre',
    description:
      "Les signes qui doivent alerter chez un poisson d'aquarium : comportement, apparence, et les bons réflexes à avoir dès le premier doute.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Les poissons ne se plaignent pas : c'est à nous de repérer les signes d'un problème, le plus tôt possible. Dans la majorité des cas, un poisson qui va mal réagit à son environnement plus qu'à une maladie à proprement parler. Savoir observer vos poissons chaque jour est la meilleure prévention.",
        ],
      },
      {
        titre: "Les signes comportementaux",
        image: { src: '/guides/sections/reconnaitre-poisson-malade-stresse/1.webp', alt: "Cinq signes de comportement : léthargie, isolement, nage anormale, perte d’appétit et frottements contre le décor" },
        paragraphes: [
          "Léthargie, isolement du reste du groupe, nage anormale (en biais, saccadée, ou au contraire immobile), perte d'appétit ou frottements contre le décor sont souvent les premiers signes visibles, avant même une anomalie physique.",
          "D'autres indices méritent aussi l'attention : un poisson qui reste collé en surface à avaler l'air, qui respire très vite, qui reste près du filtre ou de l'aérateur, ou qui se cache en permanence alors qu'il est d'ordinaire actif. Les frottements répétés sur le sol ou le décor (le « flashing ») signalent souvent une irritation des branchies ou de la peau.",
        ],
      },
      {
        titre: "Les signes physiques",
        image: { src: '/guides/sections/reconnaitre-poisson-malade-stresse/2.webp', alt: "Poisson avec points blancs, nageoires abîmées, yeux troubles, ventre gonflé et couleurs ternies" },
        paragraphes: [
          "Des taches blanches ponctuelles évoquent souvent l'ich (maladie des points blancs), des nageoires abîmées ou recroquevillées un problème bactérien, des couleurs ternies ou un gonflement abdominal un mal-être plus général. Des yeux troubles ou exorbités sont également à surveiller de près.",
          "Un duvet blanc ressemblant à du coton révèle plutôt un champignon, et une fine poussière dorée sur le corps peut correspondre à l'oodinium (maladie du velours). Un ventre creusé ou un poisson qui maigrit alors qu'il mange peut signaler des parasites internes.",
        ],
      },
      {
        titre: "Les causes les plus fréquentes",
        image: { src: '/guides/sections/reconnaitre-poisson-malade-stresse/3.webp', alt: "Mauvaise qualité d’eau, stress de cohabitation et parasite introduit par un nouveau poisson sans quarantaine" },
        paragraphes: [
          "Une mauvaise qualité d'eau (pic d'ammoniac ou de nitrites, souvent après un déséquilibre du cycle de l'azote), un stress de cohabitation, ou un parasite introduit par un nouveau poisson non mis en quarantaine expliquent la grande majorité des cas.",
          "S'y ajoutent les écarts de température, un bac trop petit ou surpeuplé, une alimentation inadaptée, un éclairage trop violent, les bagarres entre congénères ou l'absence de cachettes. Un poisson stressé affaiblit ses défenses, et les maladies qui dormaient dans l'eau en profitent.",
        ],
      },
      {
        titre: "Les bons réflexes",
        image: { src: '/guides/sections/reconnaitre-poisson-malade-stresse/4.webp', alt: "Tester l’eau en premier, puis isoler le poisson suspect pour limiter la contamination" },
        paragraphes: [
          "Tester l'eau immédiatement reste le premier réflexe, avant toute autre action : une bonne partie des soucis de santé viennent d'un paramètre déséquilibré plutôt que d'une maladie à proprement parler. Isoler le poisson suspect quand c'est possible limite aussi le risque de contamination du reste du bac.",
          "Si les tests révèlent un problème, un changement d'eau partiel est la première réponse. Si l'eau est correcte mais que les symptômes persistent, observez les signes avant de traiter : un médicament inadapté peut aggraver la situation et déséquilibrer le filtre.",
        ],
      },
      {
        titre: "Quand traiter, et comment",
        paragraphes: [
          "Ne traitez qu'après avoir identifié le problème. Un bac d'isolement (« bac hôpital »), même simple, permet de soigner un poisson sans exposer le reste du bac ni détruire les bactéries du filtre. Lisez toujours la notice : certains produits sont toxiques pour les crevettes et les escargots, et le charbon actif doit être retiré du filtre pendant le traitement. Rétablissez les conditions normales une fois le traitement terminé, avec un changement d'eau et le retour du charbon actif.",
          "Si un poisson meurt, retirez-le rapidement et testez l'eau. En cas de pertes répétées malgré une eau correcte, demandez conseil à un aquariophile expérimenté ou à un vétérinaire spécialisé en animaux aquatiques.",
        ],
      },
      {
        titre: "Prévenir plutôt que soigner",
        paragraphes: [
          "La plupart des soucis se préviennent par de bonnes habitudes :",
        ],
        liste: [
          "Mettre en quarantaine tout nouvel arrivant pendant deux à quatre semaines avant de l'ajouter au bac principal.",
          "Tester l'eau régulièrement et changer une partie de l'eau chaque semaine.",
          "Éviter de surpeupler le bac et choisir des espèces compatibles.",
          "Varier l'alimentation et ne pas suralimenter.",
          "Observer ses poissons chaque jour, au moment du repas.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
      { href: '/faq#entretien', label: 'Questions fréquentes sur l’entretien' },
      { href: '/guides/acclimater-nouveau-poisson-aquarium', label: 'Bien acclimater un nouveau poisson' },
      { href: '/guides/erreurs-debutant-aquariophilie', label: 'Les erreurs de débutant à éviter' },
    ],
  },
  {
    slug: 'role-du-filtre-dans-aquarium',
    titre: "Comprendre le rôle du filtre dans un aquarium",
    eyebrow: 'Comprendre',
    description:
      "Filtration mécanique, biologique, chimique : à quoi sert vraiment un filtre d'aquarium, au-delà de simplement « nettoyer l'eau ».",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Le filtre est l'équipement le plus important d'un aquarium. Il ne se contente pas de « nettoyer » l'eau : il fait vivre une colonie de bactéries sans laquelle les poissons ne survivraient pas plus de quelques jours. Comprendre ses trois fonctions aide à bien le choisir et à l'entretenir correctement.",
        ],
      },
      {
        titre: "La filtration mécanique",
        image: { src: '/guides/sections/role-du-filtre-dans-aquarium/1.webp', alt: "Les particules en suspension sont retenues par la mousse, la ouate et le perlon" },
        paragraphes: [
          "Elle retient les particules en suspension (mousse, ouate, perlon) : c'est la fonction la plus visible du filtre, mais aussi la moins importante pour l'équilibre du bac sur le long terme.",
          "Elle rend l'eau limpide en retenant les déchets, les restes de nourriture et les feuilles. Elle doit être nettoyée régulièrement, sans quoi les particules se décomposent dans le filtre et produisent de l'ammoniac.",
        ],
      },
      {
        titre: "La filtration biologique",
        image: { src: '/guides/sections/role-du-filtre-dans-aquarium/2.webp', alt: "Les bactéries nitrifiantes logées dans les masses filtrantes transforment l’ammoniac en nitrites puis en nitrates" },
        paragraphes: [
          "C'est le rôle le plus important, et souvent le plus sous-estimé : les masses filtrantes biologiques hébergent les bactéries nitrifiantes qui transforment l'ammoniac et les nitrites en substances beaucoup moins toxiques. C'est cette population bactérienne qui « fait » le cyclage d'un aquarium.",
          "Ces bactéries vivent sur toutes les surfaces du bac, mais surtout dans le filtre, où l'eau circule en continu et leur apporte oxygène et nourriture. Plus la surface disponible est grande (céramiques poreuses, billes, mousses), plus la colonie peut être importante. C'est la raison pour laquelle un filtre ne doit jamais être éteint longtemps.",
        ],
      },
      {
        titre: "La filtration chimique",
        image: { src: '/guides/sections/role-du-filtre-dans-aquarium/3.webp', alt: "Le charbon actif retire ponctuellement un médicament après un traitement ou une odeur persistante" },
        paragraphes: [
          "Charbon actif ou résines anti-nitrates : utile ponctuellement, par exemple pour retirer un médicament après un traitement ou une odeur persistante, mais pas indispensable au quotidien dans un bac bien entretenu.",
          "Le charbon actif se sature en quelques semaines et ne retire pas l'ammoniac. Il ne doit pas être utilisé pendant un traitement médicamenteux, car il neutraliserait le produit. Les résines spécifiques (phosphates, nitrates) trouvent leur place dans des bacs particuliers comme le récifal.",
        ],
      },
      {
        titre: "Pourquoi ne jamais tout nettoyer d’un coup",
        image: { src: '/guides/sections/role-du-filtre-dans-aquarium/4.webp', alt: "Nettoyer toutes les masses au robinet détruit les bactéries ; on rince une masse à la fois dans l’eau du bac" },
        paragraphes: [
          "Nettoyer l'ensemble des masses filtrantes en même temps, à l'eau du robinet et de manière trop appuyée, détruit une grande partie de cette population bactérienne. Rincer les masses biologiques dans l'eau du bac déjà retirée, et par roulement plutôt que toutes en même temps, préserve l'équilibre du cycle de l'azote.",
          "Un nettoyage trop zélé peut renvoyer le bac à l'état d'un aquarium neuf, avec des pics d'ammoniac et de nitrites qui peuvent tuer les poissons. Un filtre un peu sale est bien moins dangereux qu'un filtre trop propre.",
        ],
      },
      {
        titre: "Le débit et le brassage",
        paragraphes: [
          "Un bon filtre brasse aussi l'eau et agite la surface, ce qui favorise les échanges gazeux : l'oxygène entre, le CO₂ s'échappe. Comme repère, le débit horaire doit représenter environ quatre à six fois le volume du bac. Un débit excessif fatigue certains poissons de petite taille ou de courants calmes, comme les Bettas ou les Scalaires, tandis qu'un débit insuffisant laisse des zones mortes où les déchets s'accumulent.",
        ],
      },
      {
        titre: "Les grandes familles de filtres",
        paragraphes: [
          "Le choix dépend du volume du bac, du budget et de l'esthétique recherchée :",
        ],
        liste: [
          "Filtre à air (mousse) : très simple et économique, idéal pour un petit bac, une cuve de quarantaine ou des alevins.",
          "Filtre interne : compact et peu coûteux, adapté aux petits et moyens volumes.",
          "Filtre externe : plus puissant, avec une grande capacité de masses filtrantes, il convient aux bacs plus grands et à l'aquascaping.",
          "Filtre de décantation (sump) : surtout utilisé en récifal ou pour les très gros volumes.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-filtration-aquarium', label: 'Bien choisir sa filtration' },
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
      { href: '/guides/entretien-filtre-aquarium-bonne-frequence', label: 'Entretien du filtre : fréquence et méthode' },
      { href: '/guides/filtre-interne-ou-externe-comparatif', label: 'Filtre interne ou externe ?' },
    ],
  },
  {
    slug: 'printemps-bassin-redemarrage',
    titre: 'Bassin de jardin : bien relancer la saison au printemps',
    eyebrow: 'Bassin',
    description:
      "Reprise de l'alimentation, nettoyage, relance de la filtration : comment redémarrer son bassin de jardin après l'hiver sans le déstabiliser.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Quand les beaux jours reviennent, le bassin sort de sa léthargie hivernale. Les poissons reprennent de l'activité, les plantes repartent et les algues aussi. Un redémarrage progressif, fait par étapes, évite bien des désagréments pour toute la saison.",
        ],
      },
      {
        titre: "Reprendre l'alimentation progressivement",
        image: { src: '/guides/sections/printemps-bassin-redemarrage/1.webp', alt: "Thermomètre qui monte et reprise progressive de la nourriture à partir de 10 degrés" },
        paragraphes: [
          "Dès que l'eau dépasse 10°C, une reprise progressive avec une nourriture digeste est possible, avant de revenir au rythme et à la nourriture habituels une fois la température stabilisée au-delà de 14-15°C. Reprendre trop tôt ou trop généreusement peut perturber une digestion encore ralentie par le froid.",
          "Commencez par de petites quantités d'une nourriture à base de germe de blé, une fois tous les deux ou trois jours, puis augmentez peu à peu. Observez vos poissons à cette occasion : après l'hiver, ils peuvent être affaiblis, porter des blessures ou des parasites. Un poisson qui reste immobile ou qui présente des plaques blanchâtres est à isoler.",
        ],
      },
      {
        titre: "Nettoyer sans tout perturber",
        image: { src: '/guides/sections/printemps-bassin-redemarrage/2.webp', alt: "Épuisette qui retire les feuilles du bassin sans bouleverser le fond où vit la faune utile" },
        paragraphes: [
          "Retirer les débris et les feuilles accumulées en surface reste utile, mais un nettoyage trop brutal du fond du bassin dérange aussi la faune utile qui s'y trouve. Mieux vaut y aller par étapes plutôt que de tout remuer en une seule fois.",
          "Retirez les feuilles mortes, les tiges de plantes fanées, la vase accumulée en excès, mais gardez une fine couche de dépôt, qui abrite des micro-organismes utiles. Évitez les grands changements d'eau, qui perturbent les poissons encore fragiles.",
        ],
      },
      {
        titre: "Relancer la filtration biologique",
        image: { src: '/guides/sections/printemps-bassin-redemarrage/3.webp', alt: "Pompe et filtre remis en route progressivement sur plusieurs jours après l’hiver" },
        paragraphes: [
          "Si la filtration a été arrêtée ou ralentie pendant l'hiver, la remettre en route progressivement laisse le temps aux bactéries épuratrices de se redévelopper, plutôt que de la relancer brutalement à pleine puissance.",
          "Contrôlez la pompe, les tuyaux, le clarificateur UV (la lampe doit souvent être remplacée) et les prises électriques avant de remettre le système en marche. Nettoyez les mousses du filtre dans l'eau du bassin, jamais à l'eau du robinet, et rincez sans excès pour conserver les bactéries.",
        ],
      },
      {
        titre: "Surveiller les premières proliférations d’algues",
        image: { src: '/guides/sections/printemps-bassin-redemarrage/4.webp', alt: "Bassin qui verdit au printemps avant que les plantes aient repris leur rôle de régulation" },
        paragraphes: [
          "Le printemps est une période à risque pour les algues, avant que les plantes du bassin aient repris leur rôle de régulation naturelle des nutriments. Une eau qui verdit rapidement à cette période n'est pas anormale, mais mérite d'être surveillée.",
          "Réduisez la quantité de nourriture, retirez les filaments d'algues à la main ou au râteau, et plantez dès que possible pour concurrencer les algues. Un test de l'eau (nitrates, phosphates) permet de repérer un apport excessif de nutriments.",
        ],
      },
      {
        titre: "Les tâches de plantation et de contrôle",
        paragraphes: [
          "Le printemps est aussi le moment de s'occuper des plantes :",
        ],
        liste: [
          "Tailler les tiges mortes et diviser les touffes trop denses.",
          "Replanter les nénuphars dans de la terre argileuse fraîche, si besoin.",
          "Installer de nouvelles plantes oxygénantes et épuratrices.",
          "Vérifier le niveau d'eau, l'étanchéité de la bâche et la stabilité des berges.",
          "Contrôler l'état du filet de protection et le remettre en place.",
        ],
      },
      {
        titre: "Un calendrier de reprise simple",
        paragraphes: [
          "Fin de l'hiver : nettoyage léger, contrôle du matériel. Première douceur, eau entre 8 et 10 °C : remise en route de la pompe. Eau au-dessus de 10 °C : premiers repas légers. Eau au-dessus de 14 à 15 °C : alimentation normale et plantations. En avançant ainsi, vous laissez au bassin le temps de retrouver son équilibre sans brusquer ses habitants.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/hivernage-poissons-bassin', label: 'Préparer l’hivernage de son bassin' },
      { href: '/guides/eau-verte-bassin-solutions', label: 'Lutter contre l’eau verte en bassin' },
      { href: '/guides/plantes-bassin-oxygenantes-epuratrices', label: 'Les plantes de bassin' },
    ],
  },
  {
    slug: 'eau-verte-bassin-solutions',
    titre: 'Eau verte dans un bassin : causes et solutions',
    eyebrow: 'Bassin',
    description:
      "Pourquoi l'eau d'un bassin de jardin devient verte en été, et les solutions qui fonctionnent réellement pour retrouver une eau claire.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Un bassin dont l'eau devient verte comme une soupe de pois inquiète souvent les propriétaires. Rassurez-vous : c'est un phénomène très courant, qui touche presque tous les bassins un jour ou l'autre. Il se règle avec une méthode simple, à condition de comprendre ce qui se passe.",
        ],
      },
      {
        titre: "La cause : des algues microscopiques",
        image: { src: '/guides/sections/eau-verte-bassin-solutions/1.webp', alt: "Eau verte vue au microscope : algues unicellulaires favorisées par la lumière et les nutriments" },
        paragraphes: [
          "L'eau verte est due à une prolifération d'algues unicellulaires en suspension, favorisée par la lumière et l'excès de nutriments (déjections des poissons, décomposition de matière végétale). Ce n'est pas un signe de mauvaise santé du bassin en soi, mais un déséquilibre à corriger.",
          "Le phénomène s'observe surtout au printemps, quand l'eau se réchauffe et que la lumière augmente alors que les plantes ne sont pas encore développées. Les poissons ne sont pas directement menacés, mais l'eau opaque réduit la visibilité, diminue l'oxygène la nuit et peut masquer d'autres problèmes.",
        ],
      },
      {
        titre: "Les solutions qui fonctionnent",
        image: { src: '/guides/sections/eau-verte-bassin-solutions/2.webp', alt: "Clarificateur UV, plantes concurrentes des algues et ombrage partiel du bassin" },
        paragraphes: [
          "Un clarificateur UV agglomère ces algues pour qu'elles soient ensuite piégées par le filtre. Les plantes oxygénantes et épuratrices concurrencent aussi les algues pour les nutriments disponibles. Un ombrage partiel du bassin limite la lumière disponible, un facteur clé de la prolifération.",
          "Pour qu'un ultraviolet agisse, il doit être dimensionné au volume du bassin et traverser l'eau lentement : un débit trop élevé réduit son efficacité. La lampe s'use et se remplace en général chaque année. Les plantes flottantes, nénuphars en tête, couvrent la surface et privent les algues de lumière.",
        ],
      },
      {
        titre: "Les solutions à éviter",
        image: { src: '/guides/sections/eau-verte-bassin-solutions/3.webp', alt: "Traitements chimiques utilisés seuls et vidange totale du bassin, deux solutions à éviter" },
        paragraphes: [
          "Les traitements chimiques agressifs, utilisés seuls sans corriger la cause, ramènent généralement le problème après quelques semaines. Une vidange totale du bassin déstabilise tout l'écosystème installé et peut, paradoxalement, aggraver la situation plutôt que la résoudre.",
          "Évitez aussi de multiplier les produits : ils peuvent affecter les poissons, les plantes et les bactéries du filtre. Mieux vaut agir sur les causes : excès de nourriture, boues accumulées, feuilles mortes, filtration insuffisante.",
        ],
      },
      {
        titre: "Une question de patience",
        image: { src: '/guides/sections/eau-verte-bassin-solutions/4.webp', alt: "Évolution d’un bassin neuf de l’eau verte vers une eau claire à mesure que les plantes s’installent" },
        paragraphes: [
          "Un bassin neuf traverse souvent une phase d'eau verte avant de se stabiliser, une fois les plantes bien installées et l'équilibre biologique trouvé. Cette phase transitoire ne doit pas systématiquement pousser à intervenir dans l'urgence.",
          "Comptez plusieurs semaines pour qu'un bassin retrouve son équilibre après une période d'eau verte. Pendant ce temps, limitez le nourrissage, retirez les débris végétaux et laissez les plantes s'installer.",
        ],
      },
      {
        titre: "Un plan d'action en cinq étapes",
        paragraphes: [
          "Pour traiter durablement une eau verte, procédez dans cet ordre :",
        ],
        liste: [
          "Réduire la quantité de nourriture donnée aux poissons.",
          "Retirer les feuilles, la vase et les débris organiques du fond.",
          "Ajouter des plantes oxygénantes, épuratrices et flottantes.",
          "Installer ou vérifier le clarificateur UV, et contrôler la filtration.",
          "Changer 10 à 20 % de l'eau si besoin, avec une eau de pluie ou de l'eau traitée.",
        ],
      },
      {
        titre: "Prévenir le retour de l'eau verte",
        paragraphes: [
          "Un bassin peu profond, au plein soleil, avec trop de poissons et peu de plantes est prédisposé à l'eau verte. Les mesures préventives sont les mêmes que pour la résoudre : ombrager, planter, entretenir le filtre, ne pas suralimenter. Faire analyser l'eau du robinet peut aussi aider, car certaines eaux sont riches en nitrates et en phosphates, qui nourrissent les algues dès le remplissage.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/demarrer-bassin-jardin', label: 'Démarrer un bassin de jardin' },
      { href: '/categorie/materiel', label: 'Voir le matériel en vente' },
      { href: '/guides/plantes-bassin-oxygenantes-epuratrices', label: 'Les plantes de bassin' },
      { href: '/guides/pompe-filtration-bassin-bien-choisir', label: 'Pompe et filtration de bassin' },
    ],
  },
  {
    slug: 'changement-eau-aquarium-frequence-methode',
    titre: "Changement d'eau en aquarium : fréquence et bonne méthode",
    eyebrow: 'Entretien',
    description:
      "Pourquoi, à quelle fréquence et comment faire un changement d'eau efficace en aquarium, sans stresser inutilement ses poissons.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Le changement d'eau est le geste d'entretien le plus important en aquariophilie, et celui qui prête le plus à confusion : quelle quantité, à quelle fréquence, avec quelle eau ? Voici une méthode simple, valable pour la grande majorité des aquariums d'eau douce.",
        ],
      },
      {
        titre: "Pourquoi changer l'eau régulièrement",
        image: { src: '/guides/sections/changement-eau-aquarium-frequence-methode/1.webp', alt: "Courbe de nitrates qui augmentent avec le temps et seau pour les éliminer par un changement d’eau" },
        paragraphes: [
          "Même avec une bonne filtration, les nitrates et d'autres substances continuent de s'accumuler dans l'eau au fil du temps. Le changement d'eau reste le seul moyen de les éliminer réellement, tout en réintroduisant des oligo-éléments consommés par les plantes et les poissons.",
          "Un filtre ne supprime pas les nitrates, il se contente de transformer l'ammoniac en nitrites puis en nitrates. Sans renouvellement, leur concentration monte jusqu'à fatiguer les poissons, favoriser les algues et affaiblir leurs défenses. Le changement d'eau rétablit aussi le KH, qui s'épuise peu à peu et protège le pH.",
        ],
      },
      {
        titre: "La fréquence recommandée",
        image: { src: '/guides/sections/changement-eau-aquarium-frequence-methode/2.webp', alt: "Changement d’eau de dix à vingt pour cent du volume chaque semaine" },
        paragraphes: [
          "Un changement de 10 à 20 % du volume par semaine convient à la plupart des bacs, à ajuster à la hausse si le bac est fortement peuplé ou si les nitrates montent rapidement entre deux changements.",
          "Un petit changement hebdomadaire vaut mieux qu'un grand changement mensuel : les paramètres restent stables et les poissons ne subissent pas de choc. Pour mesurer l'effet d'un changement, retenez cette règle simple : renouveler 20 % de l'eau réduit les nitrates d'environ 20 %. Si vous mesurez 40 mg/L avant, vous obtiendrez environ 32 mg/L après.",
        ],
      },
      {
        titre: "La bonne méthode",
        image: { src: '/guides/sections/changement-eau-aquarium-frequence-methode/3.webp', alt: "Siphonnage du substrat, conditionneur anti-chlore et eau à température proche de celle du bac" },
        paragraphes: [
          "Siphonner le substrat en même temps que le changement d'eau permet de retirer les déchets qui s'y accumulent. La nouvelle eau doit être traitée avec un conditionneur anti-chlore et amenée à une température proche de celle du bac avant d'être réintroduite, pour éviter un choc thermique.",
          "Voici le déroulé type, qui prend une vingtaine de minutes pour un bac de taille moyenne :",
        ],
        liste: [
          "Débrancher le chauffage avant de faire baisser le niveau, pour éviter qu'il chauffe hors de l'eau.",
          "Siphonner une partie du substrat (un tiers à chaque fois) en retirant l'eau souhaitée dans un seau réservé à l'aquarium.",
          "Remplir un autre seau avec l'eau du robinet, à une température proche de celle du bac (à 1 ou 2 °C près) et ajouter le conditionneur selon la dose indiquée.",
          "Verser l'eau doucement, en la dirigeant contre une vitre ou sur une assiette pour ne pas creuser le substrat ni stresser les poissons.",
          "Rebrancher le chauffage une fois le niveau rétabli.",
        ],
      },
      {
        titre: "Les erreurs à éviter pendant un changement d'eau",
        paragraphes: [
          "Ne vidangez jamais tout le bac : vous détruiriez l'équilibre biologique et provoqueriez un choc pour les poissons. N'utilisez pas d'eau chaude du robinet, qui peut contenir des métaux issus de la tuyauterie. Évitez aussi tout savon ou produit ménager sur le matériel, y compris pour le seau. Enfin, ne nettoyez pas tout le même jour : le filtre, le substrat et le décor se nettoient à tour de rôle, pour conserver les bactéries utiles.",
        ],
      },
      {
        titre: "Les signes qu'il faut changer d'eau plus souvent",
        image: { src: '/guides/sections/changement-eau-aquarium-frequence-methode/4.webp', alt: "Nitrates élevés au test, eau qui jaunit et poissons agités indiquant un besoin de changer l’eau plus souvent" },
        paragraphes: [
          "Des nitrates élevés au test, une eau qui jaunit visiblement entre deux changements, ou des poissons plus agités que d'habitude quelques jours après le dernier changement sont des signaux à prendre en compte pour ajuster la fréquence.",
          "Un bac plein de poissons, des algues qui reviennent sans cesse, une odeur désagréable ou une eau qui perd sa limpidité plaident aussi pour augmenter la fréquence, par exemple en passant de 15 % à 25 % par semaine, plutôt qu'en doublant d'un coup les volumes.",
        ],
      },
      {
        titre: "Cas particuliers",
        paragraphes: [
          "Dans un bac fraîchement démarré, on limite les changements avant la fin du cyclage, sauf en cas de pic d'ammoniac ou de nitrites. Dans un bac de crevettes, on change l'eau plus doucement encore, avec une eau proche en dureté et en température, car les invertébrés supportent mal les variations. Enfin, après un traitement médicamenteux, on suit les indications du produit, souvent un changement partiel suivi de l'ajout de charbon actif.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/parametres-eau-ph-gh-kh', label: 'Comprendre les paramètres de l’eau' },
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
      { href: '/guides/aquarium-eau-trouble-causes', label: 'Aquarium à l’eau trouble : causes et solutions' },
      { href: '/guides/lutter-contre-les-algues-aquarium', label: 'Lutter contre les algues' },
    ],
  },
  {
    slug: 'nettoyer-aquarium-sans-stresser-poissons',
    titre: 'Nettoyer son aquarium sans stresser ses poissons',
    eyebrow: 'Entretien',
    description:
      "Vitres, décor, substrat : comment nettoyer un aquarium efficacement, sans perturber inutilement les poissons et l'équilibre biologique du bac.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Nettoyer un aquarium est nécessaire, mais c'est aussi un moment où les poissons peuvent être bousculés et le bac déséquilibré. Avec les bons gestes, l'entretien se fait en une vingtaine de minutes, sans stress ni mauvaise surprise. Voici comment procéder, étape par étape.",
        ],
      },
      {
        titre: "Les vitres",
        image: { src: '/guides/sections/nettoyer-aquarium-sans-stresser-poissons/1.webp', alt: "Aimant ou raclette passés lentement sur la vitre pour retirer les algues" },
        paragraphes: [
          "Un aimant ou une raclette dédiée à l'aquarium, utilisés avec des mouvements lents, suffisent généralement à retirer les dépôts d'algues sans agiter excessivement les poissons.",
          "Attention aux grains de sable ou de gravier qui peuvent se coincer entre l'aimant et la vitre et la rayer : éloignez le matériel du sol et rincez-le régulièrement. Sur une cuve en acrylique, utilisez uniquement les accessoires adaptés, bien plus fragiles que le verre. À l'extérieur, un chiffon humide suffit ; n'utilisez jamais de produit ménager en spray à proximité du bac.",
        ],
      },
      {
        titre: "Le décor et les plantes",
        image: { src: '/guides/sections/nettoyer-aquarium-sans-stresser-poissons/2.webp', alt: "Brosse douce pour nettoyer le décor, sans produit chimique anti-algues" },
        paragraphes: [
          "Retirer les algues à la main ou avec une brosse douce reste préférable aux produits chimiques anti-algues, qui peuvent affecter à la fois les poissons sensibles et les plantes du bac.",
          "Une vieille brosse à dents réservée à cet usage est idéale pour les racines et les roches. Pour un décor très encrassé, sortez-le et rincez-le dans un seau d'eau du bac. En cas d'algues tenaces sur un décor dur, un bain dans de l'eau de Javel très diluée suivi d'un rinçage abondant et d'un séchage complet est possible, mais jamais sur des éléments poreux comme le bois.",
        ],
      },
      {
        titre: "Le substrat",
        image: { src: '/guides/sections/nettoyer-aquarium-sans-stresser-poissons/3.webp', alt: "Substrat siphonné par zones pour préserver les bactéries utiles" },
        paragraphes: [
          "Siphonner le substrat par zones, plutôt que l'ensemble du fond d'un seul coup, évite de perturber excessivement les bactéries qui s'y trouvent — un point particulièrement important dans un bac planté avec un substrat nutritif.",
          "Faites par exemple un tiers du fond à chaque changement d'eau : en trois semaines, tout a été nettoyé. Dans un sol nutritif ou un bac très planté, contentez-vous d'effleurer la surface pour retirer les déchets visibles, sans fouiller en profondeur.",
        ],
      },
      {
        titre: "Le bon rythme",
        image: { src: '/guides/sections/nettoyer-aquarium-sans-stresser-poissons/4.webp', alt: "Entretien léger chaque semaine comparé à un grand nettoyage espacé de plusieurs mois" },
        paragraphes: [
          "Un entretien léger et régulier, chaque semaine, reste toujours moins stressant pour les poissons qu'un grand nettoyage espacé de plusieurs mois, qui bouleverse d'un coup l'ensemble du bac.",
          "Un petit protocole hebdomadaire de 15 à 20 minutes suffit à garder un bac propre : vitres, retrait des feuilles mortes, siphonnage d'une partie du fond et changement de 10 à 20 % de l'eau. Le filtre se nettoie à part, toutes les quatre à six semaines.",
        ],
      },
      {
        titre: "Limiter le stress des poissons",
        paragraphes: [
          "Quelques précautions rendent l'entretien beaucoup plus discret pour les habitants du bac :",
        ],
        liste: [
          "Travailler lentement, sans gestes brusques, et éviter de poursuivre les poissons avec la main.",
          "Ne pas éteindre complètement le bac : une lumière douce évite les sursauts.",
          "Éviter de tout déplacer dans le décor, qui sert de repère et de cachette.",
          "Ne jamais nettoyer à la fois le filtre, le substrat et le décor lors de la même séance.",
          "Observer les poissons pendant l'entretien et vérifier leur comportement après.",
        ],
      },
      {
        titre: "Les produits à bannir",
        paragraphes: [
          "Savon, produit vaisselle, vinaigre pur et autres produits ménagers sont à proscrire dans et autour du bac : leurs résidus sont toxiques pour les poissons et les bactéries. Même un chiffon utilisé pour le ménage peut contaminer l'eau. Gardez du matériel dédié à l'aquarium, rincé uniquement à l'eau claire, et lavez-vous les mains sans savon parfumé avant de les plonger dans l'eau.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: 'Bien faire son changement d’eau' },
      { href: '/guides/entretien-filtre-aquarium-bonne-frequence', label: 'Entretien du filtre' },
      { href: '/guides/lutter-contre-les-algues-aquarium', label: 'Lutter contre les algues' },
    ],
  },
  {
    slug: 'lutter-contre-les-algues-aquarium',
    titre: 'Lutter contre les algues en aquarium : identifier et agir',
    eyebrow: 'Entretien',
    description:
      "Algues brunes, vertes, filamenteuses, cyanobactéries : comment identifier le type d'algue et adapter la bonne solution à chaque cas.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Aucun aquarium n'est totalement exempt d'algues : elles font partie de l'écosystème et un peu d'algues est signe d'un bac vivant. Le problème commence quand elles envahissent les vitres, le décor et les plantes. Pour les combattre durablement, il faut d'abord identifier de quel type d'algue il s'agit, puis comprendre ce qui les nourrit.",
        ],
      },
      {
        titre: "Identifier le type d’algue",
        image: { src: '/guides/sections/lutter-contre-les-algues-aquarium/1.webp', alt: "Diatomées brunes, algues vertes en points ou filaments et cyanobactéries en tapis bleu-vert" },
        paragraphes: [
          "Les diatomées forment un voile brunâtre, fréquent dans un bac encore jeune. Les algues vertes en points ou en filaments traduisent le plus souvent un excès de lumière ou de nutriments. Les cyanobactéries, malgré leur nom, ne sont pas vraiment des algues : elles forment un voile glissant, souvent rougeâtre ou verdâtre, et une odeur caractéristique.",
          "On rencontre aussi les algues en brosse ou en barbe, des touffes sombres et rêches qui s'accrochent aux feuilles et au décor, et les algues filamenteuses en « cheveux d'ange », longues et soyeuses, qui s'enroulent autour des plantes. Les premières signalent souvent des variations de CO₂ ou un entretien irrégulier, les secondes un excès de fer ou de nutriments.",
        ],
      },
      {
        titre: "Les causes communes",
        image: { src: '/guides/sections/lutter-contre-les-algues-aquarium/2.webp', alt: "Éclairage trop intense ou trop long, excès de nutriments et déséquilibre entre plantes et lumière" },
        paragraphes: [
          "Un éclairage trop intense ou trop long, un excès de nutriments lié à la suralimentation ou à des changements d'eau trop rares, et un déséquilibre entre la quantité de plantes et la lumière disponible expliquent la grande majorité des invasions d'algues.",
          "Le soleil direct sur la vitre est un facteur sous-estimé : même un éclairage de bac bien réglé ne compense pas quelques heures de lumière naturelle chaque jour. Un bac neuf traverse presque toujours une phase d'algues pendant les premières semaines, le temps que les plantes s'installent et que l'équilibre se fasse.",
        ],
      },
      {
        titre: "Les solutions selon le cas",
        image: { src: '/guides/sections/lutter-contre-les-algues-aquarium/3.webp', alt: "Réduire la photopériode, renforcer les changements d’eau, ajouter des plantes à croissance rapide et des mangeurs d’algues" },
        paragraphes: [
          "Réduire la photopériode, renforcer temporairement les changements d'eau, et ajouter des plantes à croissance rapide qui concurrencent les algues pour les nutriments sont les leviers les plus efficaces. Certaines espèces (Ancistrus, crevettes) aident aussi à limiter certains types d'algues au quotidien.",
          "Une photopériode de 6 à 8 heures par jour, avec une minuterie, convient à la plupart des bacs. Pour les diatomées, la patience suffit : elles disparaissent seules en quelques semaines. Pour les cyanobactéries, retirez-les à la main lors du siphonnage, augmentez le brassage de l'eau et corrigez l'excès de matières organiques. Pour les algues vertes sur les vitres, une raclette ou un aimant suffit.",
        ],
      },
      {
        titre: "Le piège à éviter",
        image: { src: '/guides/sections/lutter-contre-les-algues-aquarium/4.webp', alt: "Produit anti-algues utilisé seul contre correction de la vraie cause, lumière ou nutriments en excès" },
        paragraphes: [
          "Traiter uniquement le symptôme avec un produit anti-algues, sans corriger la cause réelle (lumière ou nutriments en excès), ramène généralement le problème après quelques semaines.",
          "Les traitements chimiques peuvent aussi affecter les plantes et les invertébrés, et certains antibiotiques détruisent les bactéries utiles du filtre. Ils sont à réserver aux situations bloquées, une fois les causes traitées.",
        ],
      },
      {
        titre: "Les mangeurs d’algues : utiles, mais pas magiques",
        paragraphes: [
          "Plusieurs animaux aident à garder un bac propre : les crevettes Neocaridina et Caridina, les escargots Néritines (excellents sur les vitres, mais ils pondent des œufs blancs difficiles à retirer), les Otocinclus pour les diatomées, ou l'Ancistrus pour le biofilm. Attention toutefois : aucun animal ne résout un déséquilibre de fond, et il faut leur laisser assez de nourriture, sous peine de les voir dépérir une fois les algues disparues.",
        ],
      },
      {
        titre: "Prévenir plutôt que guérir",
        paragraphes: [
          "Un bac planté, correctement éclairé et entretenu régulièrement résiste bien mieux aux algues. Quelques habitudes suffisent :",
        ],
        liste: [
          "Éclairer 6 à 8 heures par jour avec une minuterie et éviter la lumière directe du soleil.",
          "Nourrir avec parcimonie : ce qui n'est pas mangé en deux ou trois minutes est de trop.",
          "Changer 10 à 20 % de l'eau chaque semaine pour limiter l'accumulation de nitrates et de phosphates.",
          "Densifier la végétation, avec des plantes à croissance rapide dès le démarrage.",
          "Nettoyer les mousses du filtre régulièrement, mais dans l'eau du bac.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/bien-nourrir-poissons-aquarium', label: 'Bien nourrir ses poissons' },
      { href: '/glossaire/cyanobacteries', label: 'Cyanobactéries : définition' },
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: 'Bien faire son changement d’eau' },
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
    ],
  },
  {
    slug: 'choisir-son-substrat-aquarium',
    titre: "Bien choisir son substrat d'aquarium",
    eyebrow: 'Décoration',
    description:
      "Sable, gravier, substrat nutritif : comment choisir le bon substrat d'aquarium selon le type de bac et les espèces hébergées.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Le substrat est la couche de sable, de gravier ou de sol qui recouvre le fond de l'aquarium. Il influence l'apparence du bac, le bien-être des poissons de fond, la croissance des plantes et même la qualité de l'eau. Son choix mérite donc d'être réfléchi avant la mise en eau, car on ne le change plus facilement ensuite.",
        ],
      },
      {
        titre: "Substrat neutre : sable ou gravier",
        image: { src: '/guides/sections/choisir-son-substrat-aquarium/1.webp', alt: "Aquarium avec sable ou gravier fin pour des poissons de fond comme les Corydoras" },
        paragraphes: [
          "Un substrat neutre suffit pour un bac peu planté, ou pour héberger des poissons de fond fouisseurs comme les Corydoras, qui préfèrent un substrat fin et non coupant pour ne pas abîmer leurs barbillons.",
          "Le sable (grains de 0,5 à 2 mm) est idéal pour les fouisseurs et donne un rendu naturel. Le gravier (2 à 4 mm) laisse mieux circuler l'eau et convient aux bacs plantés modestes. Préférez des grains arrondis, sans arêtes, et rincez-les abondamment avant l'installation, jusqu'à ce que l'eau de rinçage devienne claire.",
        ],
      },
      {
        titre: "Substrat nutritif",
        image: { src: '/guides/sections/choisir-son-substrat-aquarium/2.webp', alt: "Substrat nutritif en coupe avec les racines des plantes qui puisent leurs nutriments" },
        paragraphes: [
          "Conçu pour nourrir les racines des plantes, il est recommandé pour un bac fortement planté ou un projet d'aquascaping, où les plantes puisent une bonne partie de leurs nutriments directement dans le sol.",
          "Ces sols, souvent à base d'argile cuite ou de terre volcanique, relâchent de l'ammonium dans les premières semaines et abaissent légèrement le pH. Prévoyez des changements d'eau plus fréquents au démarrage. Ils s'épuisent en un à deux ans et doivent ensuite être complétés par des engrais racinaires.",
        ],
      },
      {
        titre: "Cas particulier : bacs à crevettes ou Cichlidés africains",
        image: { src: '/guides/sections/choisir-son-substrat-aquarium/3.webp', alt: "Substrats actifs qui modifient pH et GH, à réserver aux projets qui recherchent cet effet" },
        paragraphes: [
          "Certains substrats dits « actifs » influencent le pH et le GH de l'eau : à réserver aux projets qui recherchent précisément cet effet, au risque sinon de déstabiliser un bac qui n'en a pas besoin.",
          "Pour les Cichlidés du Malawi ou du Tanganyika, on utilise du sable corallien ou des coquillages concassés, qui maintiennent un pH élevé. Pour les crevettes Caridina, on choisit au contraire des sols acidifiants. Dans tous les cas, l'effet s'épuise avec le temps et demande un suivi des paramètres.",
        ],
      },
      {
        titre: "L’épaisseur, un détail qui compte",
        image: { src: '/guides/sections/choisir-son-substrat-aquarium/4.webp', alt: "Substrat trop fin, d’épaisseur idéale et trop épais avec zones anaérobies" },
        paragraphes: [
          "Une couche trop fine limite l'installation des racines et des bactéries utiles, tandis qu'une couche trop épaisse peut favoriser des zones anaérobies mal odorantes si le substrat n'est pas régulièrement entretenu.",
          "Comptez 3 à 5 centimètres en général, un peu plus à l'arrière qu'à l'avant pour créer de la profondeur. Pour un bac de 54 litres, cela représente environ 8 kilos de sable. Un petit tour de siphon superficiel à chaque changement d'eau suffit à l'entretenir, sans fouiller en profondeur.",
        ],
      },
      {
        titre: "Quelle quantité prévoir",
        paragraphes: [
          "Pour estimer rapidement, multipliez la surface du fond (longueur × largeur en centimètres) par l'épaisseur souhaitée pour obtenir un volume en cm³, divisez par 1 000 pour passer en litres, puis multipliez par environ 1,5 kilo par litre de matière. Prévoyez un petit surplus pour les pentes et les ajustements.",
        ],
      },
      {
        titre: "Les erreurs à éviter",
        paragraphes: [
          "Quelques réflexes évitent les mauvaises surprises :",
        ],
        liste: [
          "Utiliser du sable de construction ou des graviers de jardin non testés, qui peuvent contenir du calcaire ou des impuretés.",
          "Ne pas rincer le substrat, ce qui trouble l'eau pendant des jours.",
          "Mélanger des grains de tailles très différentes, qui se séparent avec le temps.",
          "Choisir des grains trop fins sous des plantes à fort enracinement, qui compactent le sol.",
          "Changer de substrat dans un bac installé, ce qui détruit une partie des bactéries.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/aquascaping-decor-naturel', label: 'Créer un décor naturel' },
      { href: '/categorie/plantes', label: 'Voir les plantes en vente' },
      { href: '/guides/roches-pierres-aquarium-lesquelles-choisir', label: 'Quelles roches choisir' },
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
        paragraphes: [
          "Réussir un premier aquarium planté ne demande ni CO₂ ni éclairage sophistiqué, à condition de choisir les bonnes plantes. Certaines espèces pardonnent presque toutes les erreurs et poussent même dans des conditions modestes. Voici celles qui méritent d'ouvrir la liste.",
        ],
      },
      {
        titre: "Anubias et fougère de Java (Microsorum)",
        image: { src: '/guides/sections/plantes-faciles-aquarium-debutant/1.webp', alt: "Anubias et fougère de Java fixés sur une racine et une roche" },
        paragraphes: [
          "Ces plantes se fixent sur une racine ou une roche plutôt que dans le substrat. Très tolérantes et à croissance lente, elles conviennent parfaitement à un premier bac, y compris avec un éclairage modeste.",
          "Leur règle d'or : ne jamais enterrer le rhizome, cette tige horizontale d'où partent les feuilles et les racines, sous peine de le voir pourrir. On le colle ou on l'attache sur le décor. Leur croissance lente les rend peu sujettes aux invasions d'algues, mais elles peuvent en attraper si la lumière est trop forte.",
        ],
      },
      {
        titre: "Les mousses (Java moss)",
        image: { src: '/guides/sections/plantes-faciles-aquarium-debutant/2.webp', alt: "Mousse de Java attachée sur une racine avec crevettes et alevins qui s’y cachent" },
        paragraphes: [
          "Faciles à attacher sur le décor, elles tolèrent une large gamme de conditions et servent aussi de cachette naturelle pour les alevins ou les crevettes.",
          "On les fixe par petits paquets avec un fil de nylon ou on les colle sur la pierre ou le bois. Elles forment peu à peu un tapis dense, à tailler régulièrement pour éviter qu'elles ne s'étouffent elles-mêmes ou ne retiennent des déchets.",
        ],
      },
      {
        titre: "Cryptocoryne et Vallisneria",
        image: { src: '/guides/sections/plantes-faciles-aquarium-debutant/3.webp', alt: "Cryptocoryne et Vallisneria plantées dans le substrat d’un premier bac planté" },
        paragraphes: [
          "Des plantes de substrat robustes, qui forment une bonne base pour un premier bac planté classique, sans exigences particulières en CO2 ou en engrais.",
          "Les Cryptocorynes peuvent « fondre » (perdre leurs feuilles) après une plantation ou un changement de conditions, puis repartir : ne pas les arracher trop vite. La Vallisneria, avec ses longues feuilles en ruban, se multiplie par stolons et convient bien à l'arrière-plan.",
        ],
      },
      {
        titre: "Ce qu’il faut éviter en débutant",
        image: { src: '/guides/sections/plantes-faciles-aquarium-debutant/4.webp', alt: "Plantes exigeantes qui fondent sans lumière, CO₂ et matériel adaptés" },
        paragraphes: [
          "Certaines plantes à forte demande en lumière et en CO2 (certaines Rotala, l'Hemianthus callitrichoides) fondent rapidement sans un matériel adapté — mieux vaut les réserver à un projet d'aquascaping plus avancé.",
          "Évitez aussi d'acheter beaucoup de variétés différentes d'un coup : mieux vaut maîtriser quelques espèces robustes qu'accumuler des plantes qui ont des besoins contradictoires.",
        ],
      },
      {
        titre: "Les plantes de tige et flottantes",
        paragraphes: [
          "Pour compléter, quelques plantes à croissance rapide jouent un rôle précieux dans un bac neuf : Egeria densa, Ceratophyllum, Hygrophila ou Limnophila absorbent vite les nutriments et limitent les algues. Les plantes flottantes (Limnobium, Salvinia, Pistia) filtrent la lumière et sont idéales pour les poissons timides. Elles doivent toutefois être régulièrement éclaircies pour ne pas priver de lumière le reste du bac.",
        ],
      },
      {
        titre: "Bien planter et bien démarrer",
        paragraphes: [
          "Quelques gestes simples font gagner des semaines :",
        ],
        liste: [
          "Retirer le pot et la laine de roche des plantes en pot, et rincer les racines.",
          "Planter dense dès le départ pour concurrencer les algues.",
          "Mettre les plantes exigeantes en lumière en haut et au centre, les plantes d'ombre derrière les rochers.",
          "Prévoir un éclairage de 6 à 8 heures, avec une minuterie.",
          "Ajouter au besoin un engrais liquide doux, en suivant la dose indiquée.",
          "Rincer les plantes achetées en boutique pour éliminer d'éventuels escargots ou algues.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/plantes', label: 'Voir les plantes en vente' },
      { href: '/guides/aquascaping-decor-naturel', label: 'Créer un décor naturel' },
      { href: '/guides/role-des-plantes-aquarium-equilibre', label: 'Le rôle des plantes dans l’équilibre du bac' },
      { href: '/guides/tailler-entretenir-plantes-aquarium', label: 'Tailler et entretenir ses plantes' },
    ],
  },
  {
    slug: 'eclairage-bac-plante-choisir',
    titre: "Choisir l'éclairage de son aquarium planté",
    eyebrow: 'Décoration',
    description:
      "Puissance, spectre, durée : comment choisir un éclairage adapté à un bac planté, sans provoquer une invasion d'algues.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "L'éclairage est le moteur d'un aquarium planté. Mal réglé, il fatigue les plantes ou nourrit les algues. Bien réglé, il laisse les plantes se développer sans que les algues s'installent. Voici comment faire les bons choix, sans vous perdre dans les caractéristiques techniques.",
        ],
      },
      {
        titre: "Le spectre lumineux",
        image: { src: '/guides/sections/eclairage-bac-plante-choisir/1.webp', alt: "Rampe LED et spectre rouge et bleu utilisé par les plantes pour la photosynthèse" },
        paragraphes: [
          "Les plantes utilisent principalement les longueurs d'onde rouge et bleue pour la photosynthèse. La plupart des rampes LED horticoles modernes couvrent bien ce spectre, sans qu'il soit nécessaire de rechercher un modèle très spécialisé pour débuter.",
          "Une température de couleur autour de 6 500 K donne une lumière blanche agréable à l'œil et suffisante pour les plantes. Les spectres très marqués rouge-bleu favorisent les plantes mais rendent l'aquarium peu naturel à regarder.",
        ],
      },
      {
        titre: "La puissance selon les plantes",
        image: { src: '/guides/sections/eclairage-bac-plante-choisir/2.webp', alt: "Éclairage modéré pour Anubias et mousses, plus intense pour tapis de sol et Rotala" },
        paragraphes: [
          "Les plantes exigeantes (tapis de sol, certaines Rotala) demandent un éclairage plus intense que les espèces faciles comme les Anubias ou les mousses, qui se contentent d'un éclairage modéré.",
          "Pour débuter, on classe les bacs en trois niveaux : faible lumière (Anubias, Fougères, Cryptocorynes), lumière moyenne (la plupart des plantes de fond et de tige) et forte lumière (tapis de sol, plantes rouges exigeantes). Plus la lumière est forte, plus il faut de nutriments et de CO₂ pour que les plantes l'exploitent : sinon, ce sont les algues qui en profitent.",
        ],
      },
      {
        titre: "La durée d'éclairage",
        image: { src: '/guides/sections/eclairage-bac-plante-choisir/3.webp', alt: "Éclairage de huit à dix heures par jour, une durée excessive provoquant des algues" },
        paragraphes: [
          "Une durée de 7 à 8 heures par jour constitue une bonne base pour la plupart des bacs plantés. Une durée excessive est l'une des causes les plus fréquentes d'invasion d'algues, bien avant un problème de puissance en elle-même.",
          "Utilisez toujours une minuterie, et démarrez avec 6 heures dans un bac neuf. Si des algues apparaissent, réduisez avant de changer quoi que ce soit d'autre.",
        ],
      },
      {
        titre: "Éviter le sur-éclairage en début de bac",
        image: { src: '/guides/sections/eclairage-bac-plante-choisir/4.webp', alt: "Intensité lumineuse augmentée progressivement dans un aquarium jeune encore peu planté" },
        paragraphes: [
          "Un aquarium jeune, avec encore peu de plantes établies pour consommer les nutriments disponibles, est particulièrement sensible aux algues si l'éclairage est trop fort trop tôt. Mieux vaut monter progressivement en intensité à mesure que les plantes s'installent.",
          "Avec une rampe réglable, démarrez à 50 % de puissance et augmentez de 10 % toutes les deux semaines si les plantes poussent bien et qu'aucune algue n'apparaît.",
        ],
      },
      {
        titre: "La profondeur du bac",
        paragraphes: [
          "La lumière diminue rapidement avec la profondeur de l'eau : un bac haut de 50 centimètres reçoit bien moins de lumière au fond qu'un bac de 30 centimètres avec la même rampe. Pour les bacs hauts, prévoyez un éclairage plus puissant ou des plantes qui s'accommodent d'un faible éclairage au sol, et placez les espèces exigeantes sur des rochers ou un relief qui les rapproche de la surface.",
        ],
      },
      {
        titre: "Les erreurs courantes",
        paragraphes: [
          "Quelques pièges reviennent souvent :",
        ],
        liste: [
          "Acheter une rampe trop puissante pour un bac sans CO₂ ni engrais.",
          "Éclairer 10 à 12 heures par jour pour « aider » les plantes.",
          "Combiner lumière naturelle et artificielle sans contrôle.",
          "Oublier de nettoyer la rampe et les vitres, qui filtrent la lumière.",
          "Changer plusieurs paramètres à la fois et ne plus savoir ce qui agit.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/lutter-contre-les-algues-aquarium', label: 'Lutter contre les algues' },
      { href: '/guides/plantes-faciles-aquarium-debutant', label: 'Des plantes faciles pour débuter' },
      { href: '/guides/comprendre-la-photoperiode-aquarium', label: 'Comprendre la photopériode' },
      { href: '/guides/led-vs-neon-eclairage-aquarium-comparatif', label: 'LED ou néon : le comparatif' },
    ],
  },
  {
    slug: 'chauffage-aquarium-bien-choisir-puissance',
    titre: "Chauffage d'aquarium : comment bien choisir sa puissance",
    eyebrow: 'Matériel',
    description:
      "Comment dimensionner un chauffage d'aquarium selon le volume du bac et la température de la pièce, et pourquoi la sécurité ne doit pas être négligée.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Un chauffage mal dimensionné est une cause fréquente de stress chez les poissons tropicaux : trop faible, il laisse la température chuter l'hiver ; trop puissant ou défaillant, il peut surchauffer le bac. Voici comment le choisir et le protéger.",
        ],
      },
      {
        titre: "Le calcul de base",
        image: { src: '/guides/sections/chauffage-aquarium-bien-choisir-puissance/1.webp', alt: "Aquarium avec un chauffage et la règle d’environ un watt par litre dans une pièce tempérée" },
        paragraphes: [
          "Une règle courante consiste à prévoir environ 1 watt par litre dans une pièce tempérée, un peu plus si la pièce est fraîche l'hiver ou si le bac est ouvert, ce qui augmente les déperditions de chaleur.",
          "Ce calcul donne un ordre de grandeur : pour un bac de 100 litres, un chauffage de 100 watts est un bon point de départ. Le besoin dépend aussi de l'écart entre la température de la pièce et celle de l'eau. Pour la plupart des poissons tropicaux, on vise 24 à 26 °C. Un bac plus petit, de 20 à 30 litres, se contente de 25 à 50 watts, mais il refroidit et se réchauffe plus vite.",
        ],
      },
      {
        titre: "Un ou deux chauffages ?",
        image: { src: '/guides/sections/chauffage-aquarium-bien-choisir-puissance/2.webp', alt: "Grand aquarium avec deux chauffages placés à chaque extrémité pour une chaleur homogène" },
        paragraphes: [
          "Au-delà de 150 à 200 litres, répartir la puissance sur deux chauffages de moindre puissance placés à chaque extrémité du bac assure une température plus homogène, et sécurise en cas de panne de l'un des deux appareils.",
          "Cette redondance est précieuse : si un chauffage reste bloqué en position allumée, un seul chauffage de forte puissance peut cuire le bac, alors que deux appareils de puissance moindre limitent la montée en température.",
        ],
      },
      {
        titre: "Le thermostat, indispensable",
        image: { src: '/guides/sections/chauffage-aquarium-bien-choisir-puissance/3.webp', alt: "Chauffage avec thermostat réglable et thermomètre séparé pour vérifier la température" },
        paragraphes: [
          "La plupart des chauffages modernes intègrent un thermostat réglable. Vérifier sa précision avec un thermomètre séparé reste une bonne habitude, surtout dans les premières semaines suivant l'installation.",
          "Les graduations des chauffages sont souvent approximatives, avec un écart de plusieurs degrés. Placez un thermomètre à l'autre bout du bac, loin de la source de chaleur, et ajustez le réglage jusqu'à obtenir la température souhaitée. Évitez les variations quotidiennes importantes.",
        ],
      },
      {
        titre: "Ne pas négliger la sécurité",
        image: { src: '/guides/sections/chauffage-aquarium-bien-choisir-puissance/4.webp', alt: "Chauffage à l’air libre après baisse du niveau d’eau, consigne de débrancher avant un grand changement d’eau" },
        paragraphes: [
          "Toujours débrancher le chauffage avant de baisser fortement le niveau d'eau, par exemple lors d'un grand changement d'eau, pour éviter qu'il ne chauffe à l'air libre et ne s'endommage.",
          "Choisissez un modèle avec une gaine solide (titane ou verre trempé de qualité) et une protection contre la surchauffe. Placez-le dans une zone où l'eau circule, par exemple près de la sortie du filtre, pour répartir la chaleur. Remplacez-le tous les deux à trois ans ou dès qu'il montre des signes d'usure : un chauffage défaillant est une panne qui tue en une nuit.",
        ],
      },
      {
        titre: "Les différents types de chauffage",
        paragraphes: [
          "Plusieurs formats existent, selon l'esthétique et la taille du bac :",
        ],
        liste: [
          "Chauffage plongeant : le plus répandu, simple et économique.",
          "Chauffage externe : placé sur le circuit d'un filtre externe, il libère le bac et réduit le risque de casse.",
          "Cordon chauffant : utilisé surtout en aquariophilie spécialisée, pour chauffer le substrat des bacs plantés.",
          "Chauffage à thermostat externe : permet un pilotage plus précis, avec une sonde séparée.",
        ],
      },
      {
        titre: "Quand ne pas chauffer",
        paragraphes: [
          "Tous les poissons n'ont pas besoin de chauffage. Les poissons rouges, les Cichlidés d'eau fraîche et certaines espèces d'eau froide vivent très bien entre 15 et 22 °C. Chauffer un bac de poissons rouges réduit leur espérance de vie. À l'inverse, en été, une pièce qui dépasse 28 °C peut obliger à ventiler le bac ou à ajouter un système de refroidissement.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Démarrer un aquarium d’eau douce' },
      { href: '/categorie/materiel', label: 'Voir le matériel en vente' },
      { href: '/guides/aquarium-eau-froide-ou-tropical', label: 'Aquarium d’eau froide ou tropical' },
    ],
  },
  {
    slug: 'pompe-a-air-utilite-aquarium',
    titre: 'À quoi sert une pompe à air (bulleur) en aquarium ?',
    eyebrow: 'Matériel',
    description:
      "Oxygénation, brassage de surface, alimentation d'accessoires : le rôle réel d'une pompe à air en aquarium d'eau douce.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Le bulleur est l'un des accessoires les plus courants et les moins bien compris. Il donne l'impression d'oxygéner l'eau grâce à ses bulles, alors que son effet est plus subtil. Voici à quoi il sert vraiment, et dans quels cas il est utile.",
        ],
      },
      {
        titre: "Favoriser les échanges gazeux",
        image: { src: '/guides/sections/pompe-a-air-utilite-aquarium/1.webp', alt: "Aquarium avec un diffuseur à bulles et les échanges d’oxygène et de gaz carbonique à la surface de l’eau" },
        paragraphes: [
          "Les bulles elles-mêmes n'oxygènent pas directement l'eau : c'est le brassage de surface qu'elles créent qui favorise les échanges gazeux, en particulier l'apport d'oxygène et l'évacuation du CO2 excédentaire.",
          "Plus les bulles sont fines et remontent lentement, plus elles brassent la surface sans bruit. Une pierre poreuse (diffuseur) produit des bulles plus fines qu'un simple tube. L'effet principal vient du courant ascendant, qui renouvelle l'eau de surface où l'oxygène se dissout.",
        ],
      },
      {
        titre: "Utile en cas de forte chaleur ou de bac chargé",
        image: { src: '/guides/sections/pompe-a-air-utilite-aquarium/2.webp', alt: "Aquarium très peuplé avec thermomètre élevé et bulleur qui complète l’aération" },
        paragraphes: [
          "Un bac très peuplé, ou une eau chaude qui retient naturellement moins d'oxygène, profite particulièrement d'un complément d'aération, notamment pendant les périodes de forte chaleur.",
          "L'eau à 28 °C contient sensiblement moins d'oxygène dissous que l'eau à 20 °C. Les poissons qui se tiennent en surface au petit matin, la bouche en mouvement, manquent souvent d'oxygène : un bac très planté consomme de l'oxygène la nuit. Dans ce cas, brancher le bulleur la nuit améliore nettement la situation. L'aération est aussi conseillée pendant un traitement médicamenteux et en quarantaine.",
        ],
      },
      {
        titre: "Alimenter d'autres équipements",
        image: { src: '/guides/sections/pompe-a-air-utilite-aquarium/3.webp', alt: "Pompe à air reliée à un filtre à éponge, un décor animé et un diffuseur" },
        paragraphes: [
          "Une pompe à air peut aussi faire fonctionner un filtre à éponge ou un décor animé, en plus de son rôle d'aération proprement dit.",
          "Le filtre à air (mousse), très économique, convient bien aux petits bacs, aux bacs de quarantaine et aux alevins, car son aspiration douce ne blesse pas les petits animaux. Sa capacité de filtration reste limitée.",
        ],
      },
      {
        titre: "Pas toujours indispensable",
        image: { src: '/guides/sections/pompe-a-air-utilite-aquarium/4.webp', alt: "Bac avec surface agitée par le retour du filtre comparé à un bac où les poissons manquent d’oxygène" },
        paragraphes: [
          "Un bac avec une bonne agitation de surface générée par le retour du filtre a souvent moins besoin d'un bulleur séparé, sauf cas particulier comme une forte densité de poissons ou un manque d'oxygène observé.",
          "Attention : dans un bac planté avec injection de CO₂, le bulleur chasse le gaz carbonique dont les plantes ont besoin. On l'arrête alors pendant la période d'éclairage, et on le laisse tourner la nuit, lorsque les plantes ne consomment plus de CO₂.",
        ],
      },
      {
        titre: "Installer une pompe à air correctement",
        paragraphes: [
          "Quelques détails d'installation évitent des accidents et des nuisances :",
        ],
        liste: [
          "Placer la pompe au-dessus du niveau d'eau, ou installer un clapet anti-retour, pour que l'eau ne redescende pas dans la pompe en cas de coupure.",
          "Poser la pompe sur un support souple pour limiter les vibrations et le bruit.",
          "Choisir un modèle au débit adapté au volume du bac, et un régulateur de débit pour doser l'aération.",
          "Remplacer régulièrement la membrane et le diffuseur colmaté, qui réduisent le débit.",
        ],
      },
      {
        titre: "Prévoir les coupures de courant",
        paragraphes: [
          "Une panne électrique arrête à la fois le filtre et la pompe à air, ce qui prive le bac d'oxygène. Pour les bacs très peuplés, une petite pompe à air à piles ou rechargeable permet de tenir quelques heures et de protéger les poissons en attendant le retour du courant.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-filtration-aquarium', label: 'Bien choisir sa filtration' },
      { href: '/categorie/materiel', label: 'Voir le matériel en vente' },
      { href: '/guides/role-du-filtre-dans-aquarium', label: 'Comprendre le rôle du filtre' },
    ],
  },
  {
    slug: 'kit-test-eau-aquarium-lequel-choisir',
    titre: "Quel kit de test d'eau choisir pour son aquarium ?",
    eyebrow: 'Matériel',
    description:
      "Bandelettes, tests en gouttes, testeurs électroniques : avantages et limites de chaque méthode pour suivre les paramètres de son eau.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Tester l'eau est le seul moyen de connaître l'état réel d'un aquarium : l'œil ne voit ni l'ammoniac, ni les nitrites, ni les nitrates. Mais entre bandelettes, flacons et sondes électroniques, difficile de s'y retrouver. Voici comment choisir selon vos besoins et votre budget.",
        ],
      },
      {
        titre: "Les bandelettes",
        image: { src: '/guides/sections/kit-test-eau-aquarium-lequel-choisir/1.webp', alt: "Bandelettes de test dont les carrés de couleur se comparent à une charte" },
        paragraphes: [
          "Rapides et pratiques à utiliser, elles sont généralement moins précises que d'autres méthodes et se conservent mal une fois le flacon ouvert, avec une fiabilité qui décline dans le temps.",
          "Elles donnent une indication, utile pour voir si un paramètre est franchement hors norme, mais la lecture des teintes est subjective et ne permet pas de repérer de petites dérives. Elles ne conviennent pas pour le suivi précis d'un cyclage. Conservez-les au sec, flacon bien fermé, et jetez-les après la date de péremption.",
        ],
      },
      {
        titre: "Les tests en gouttes (type API)",
        image: { src: '/guides/sections/kit-test-eau-aquarium-lequel-choisir/2.webp', alt: "Quatre tubes de test en gouttes pour l’ammoniac, les nitrites, les nitrates et le pH" },
        paragraphes: [
          "Plus précis que les bandelettes, ils restent la référence pour un suivi régulier, aussi bien en eau douce qu'en récifal, au prix d'un peu plus de manipulation à chaque test.",
          "Le principe : on prélève un volume d'eau dans un tube, on ajoute quelques gouttes de réactif, et on compare la couleur obtenue à une charte. Un coffret couvrant l'ammoniac, les nitrites, les nitrates et le pH suffit pour débuter. Respectez scrupuleusement le temps de réaction, rincez les tubes entre deux tests, et secouez bien les flacons de réactif quand la notice le demande, notamment pour les nitrates.",
        ],
      },
      {
        titre: "Les testeurs électroniques",
        image: { src: '/guides/sections/kit-test-eau-aquarium-lequel-choisir/3.webp', alt: "Testeur électronique avec écran et sonde pour mesurer le pH, la salinité et la température" },
        paragraphes: [
          "Utiles surtout pour un suivi en continu de paramètres précis comme le pH, la salinité ou la température, ils représentent un coût d'achat plus élevé, généralement justifié pour un usage intensif ou un projet récifal.",
          "Leur précision dépend de la qualité de la sonde et de l'étalonnage régulier avec des solutions de référence. Une sonde mal entretenue ou périmée donne des valeurs fausses avec beaucoup d'assurance. En récifal, un réfractomètre est le moyen le plus fiable de mesurer la salinité, nettement plus précis qu'un densimètre à aiguille.",
        ],
      },
      {
        titre: "Ce qu’il faut tester en priorité",
        image: { src: '/guides/sections/kit-test-eau-aquarium-lequel-choisir/4.webp', alt: "Trois niveaux de tests : ammoniac, nitrites et nitrates pendant le cyclage, pH et dureté ensuite, calcium, KH et magnésium en récifal" },
        paragraphes: [
          "Ammoniac, nitrites et nitrates en priorité pendant le cyclage, puis pH et GH/KH de façon ponctuelle. En récifal, calcium, KH et magnésium s'ajoutent à ce suivi de base.",
          "Une fois le bac stabilisé, un test de nitrates toutes les une à deux semaines suffit à décider de la fréquence des changements d'eau. En cas de comportement anormal d'un poisson, testez immédiatement ammoniac et nitrites avant toute autre action.",
        ],
      },
      {
        titre: "Bien utiliser ses tests",
        paragraphes: [
          "Pour des résultats fiables, quelques précautions comptent autant que le choix du kit :",
        ],
        liste: [
          "Vérifier la date de péremption des réactifs, qui perdent en précision avec le temps.",
          "Lire la couleur à la lumière du jour ou sous une lumière blanche, sur un fond blanc.",
          "Tester toujours à la même heure et au même endroit du bac pour comparer les résultats.",
          "Noter les mesures dans un carnet ou une application pour repérer les tendances.",
          "Penser à tester aussi l'eau du robinet, qui peut contenir des nitrates ou du phosphate.",
        ],
      },
      {
        titre: "Quel budget prévoir",
        paragraphes: [
          "Un bon coffret de tests en gouttes coûte en général entre 25 et 40 euros et dure plusieurs mois. C'est un investissement dérisoire comparé au coût d'un renouvellement de poissons mal protégés. Pour la plupart des aquariums d'eau douce, il n'est pas nécessaire d'acheter davantage.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/parametres-eau-ph-gh-kh', label: 'Comprendre les paramètres de l’eau' },
      { href: '/guides/calcium-kh-magnesium-recifal', label: 'Calcium, KH et magnésium en récifal' },
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
    ],
  },
  {
    slug: 'aquarium-neuf-ou-occasion-comparatif',
    titre: "Aquarium neuf ou d'occasion : que choisir ?",
    eyebrow: 'Comparatif',
    description:
      "Avantages et précautions de l'achat d'occasion face au neuf, pour un aquarium comme pour son matériel : ce qu'il faut vérifier avant de se décider.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Acheter un aquarium neuf ou d'occasion ? Le marché de l'occasion est très actif entre passionnés, et permet souvent de réaliser de belles économies. Mais tout ne s'achète pas d'occasion sans précaution. Voici comment trancher selon ce que l'on achète.",
        ],
      },
      {
        titre: "Ce que l'occasion permet d'économiser",
        image: { src: '/guides/sections/aquarium-neuf-ou-occasion-comparatif/1.webp', alt: "Petit kit neuf comparé à un grand aquarium d’occasion au même budget" },
        paragraphes: [
          "Un aquarium ou un kit complet d'occasion permet souvent d'obtenir un volume ou un équipement plus généreux pour un budget identique, un argument de poids pour un premier bac ou un projet d'agrandissement.",
          "Le matériel volumineux se déprécie fortement dès la première année : une cuve avec son meuble se négocie souvent à la moitié du prix du neuf, parfois moins. Un filtre externe, un éclairage LED ou un écumeur d'occasion sont aussi des affaires intéressantes. L'économie peut permettre de choisir un bac plus grand ou une filtration de meilleure qualité.",
        ],
      },
      {
        titre: "Ce qu'il faut vérifier avant d'acheter d'occasion",
        image: { src: '/guides/sections/aquarium-neuf-ou-occasion-comparatif/2.webp', alt: "Contrôle de l’étanchéité et du silicone, test sur place du matériel et âge général de l’équipement" },
        paragraphes: [
          "L'étanchéité et l'état du silicone pour un bac, le fonctionnement réel testé sur place pour un filtre ou une pompe, et l'ancienneté générale du matériel sont les points à contrôler avant de valider un achat d'occasion.",
          "Inspectez les vitres (rayures profondes, éclats, bords ébréchés), les joints de silicone (décollements, bulles, zones noircies), la solidité du meuble (gonflement, moisissures) et l'état des tuyaux. Un aquarium qui semble sain sec peut fuir une fois plein : si possible, demandez à le voir rempli, ou remplissez-le chez vous en le laissant 48 heures avant d'y mettre quoi que ce soit.",
        ],
      },
      {
        titre: "Ce qui reste préférable en neuf",
        image: { src: '/guides/sections/aquarium-neuf-ou-occasion-comparatif/3.webp', alt: "Consommables et matériel à usure invisible comme la résistance d’un chauffage, plus sûrs à acheter neufs" },
        paragraphes: [
          "Les consommables (masses filtrantes, réactifs de test, nourriture) et le matériel dont l'usure n'est pas visible de l'extérieur, comme une résistance de chauffage, sont plus risqués à acheter d'occasion.",
          "Un chauffage ancien peut cesser de fonctionner sans prévenir, ou rester bloqué en marche. Les réactifs de test périmés donnent des résultats faux. Pour ces articles, le neuf est un investissement raisonnable, et d'un prix souvent modeste.",
        ],
      },
      {
        titre: "Le bon réflexe : tester avant de valider",
        image: { src: '/guides/sections/aquarium-neuf-ou-occasion-comparatif/4.webp', alt: "Acheteur qui vérifie un filtre branché en fonctionnement avant de finaliser un achat d’occasion" },
        paragraphes: [
          "Lors d'une remise en main propre, demander à voir le matériel en fonctionnement quand c'est possible reste la meilleure garantie avant de finaliser un achat d'occasion.",
          "Branchez le filtre pour vérifier le débit et le bruit, contrôlez que le chauffage s'allume, que l'éclairage fonctionne et que les pièces d'usure (turbine, joints) sont en bon état. N'hésitez pas à poser des questions sur l'âge du matériel et la raison de la vente.",
        ],
      },
      {
        titre: "Neuf ou occasion : comment décider",
        paragraphes: [
          "Quelques repères simples guident le choix :",
        ],
        liste: [
          "Cuve, meuble, filtre externe, éclairage : l'occasion est généralement très avantageuse.",
          "Chauffage, tuyaux, joints, pompes à air : l'occasion est possible mais à tester soigneusement.",
          "Masses filtrantes, tests, produits : à acheter neufs.",
          "Poissons et plantes : à acquérir auprès de vendeurs fiables, en vérifiant leur état de santé.",
        ],
      },
      {
        titre: "Nettoyer et remettre en route un bac d'occasion",
        paragraphes: [
          "Un matériel d'occasion doit être soigneusement nettoyé avant utilisation. Rincez-le à l'eau claire, éventuellement avec un peu d'eau de Javel très diluée, puis rincez abondamment et laissez sécher à l'air libre. N'utilisez jamais de savon ou de produit ménager. Une fois remonté, le bac doit être cyclé comme un aquarium neuf, même si le filtre a déjà servi, car son contenu sera inactif après plusieurs jours à sec.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/cuves', label: 'Voir les aquariums en vente' },
      { href: '/guides/meilleur-aquarium-pour-debutant', label: 'Quel aquarium choisir pour débuter' },
      { href: '/guides/acheter-aquarium-occasion-verifications', label: 'Acheter un aquarium d’occasion : les points à vérifier' },
      { href: '/guides/vendre-son-aquarium-occasion', label: 'Vendre son aquarium d’occasion' },
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
        paragraphes: [
          "Un poisson qui arrive à la maison a vécu un transport stressant, dans une eau dont la température et les paramètres diffèrent de ceux de votre aquarium. Un changement trop brutal le stresse fortement, et peut lui être fatal dans les cas les plus sévères. L'acclimatation se fait en 3 étapes et prend environ 45 minutes.",
          "Avant même l'étape 1, préparez le bac : le cyclage doit être terminé, l'eau à bonne température et l'éclairage idéalement éteint ou réduit pour que le poisson ne soit pas aveuglé en arrivant. Rentrez directement chez vous après l'achat, sans laisser le sac dans une voiture chaude ou froide.",
        ],
      },
      {
        titre: "Étape 1 : laisser flotter le sac fermé",
        image: { src: '/guides/acclimatation/etape-1-sac-flottant.webp', alt: "Sac de transport fermé qui flotte à la surface de l’aquarium pour égaliser la température" },
        paragraphes: [
          "Posez le sac encore fermé à la surface du bac et laissez-le flotter pendant 15 à 20 minutes. La température de l'eau du sac s'égalise progressivement avec celle de l'aquarium, avant même d'ouvrir le sac.",
          "Profitez-en pour observer le poisson dans son sac : s'il est calme, coloré et respire normalement, tout va bien. Un poisson couché sur le flanc ou aux couleurs ternes doit alerter dès l'arrivée.",
        ],
      },
      {
        titre: "Étape 2 : mélanger progressivement l'eau",
        image: { src: '/guides/acclimatation/etape-2-melanger-leau.webp', alt: "Ajout d’un petit volume d’eau de l’aquarium dans le sac ouvert, à intervalles réguliers" },
        paragraphes: [
          "Ouvrez ensuite le sac et ajoutez-y un petit volume d'eau du bac toutes les 5 à 10 minutes, pendant environ une demi-heure. Les paramètres de l'eau s'équilibrent ainsi en douceur plutôt que d'un coup.",
          "Si le sac est petit, videz-en la moitié avant d'ajouter l'eau du bac, pour éviter qu'il ne déborde. Cette étape permet d'adapter le poisson aux différences de pH, de dureté et de minéralisation, bien plus importantes qu'on ne le croit entre le magasin et la maison.",
        ],
      },
      {
        titre: "Étape 3 : transférer le poisson à l'épuisette",
        image: { src: '/guides/acclimatation/etape-3-epuisette.webp', alt: "Poisson transféré du sac vers l’aquarium à l’épuisette, sans verser l’eau du sac" },
        paragraphes: [
          "Prenez le poisson à l'épuisette et placez-le dans l'aquarium sans verser l'eau du sac. Celle du magasin ou de l'éleveur peut contenir des germes ou des résidus de traitement : mieux vaut ne pas l'introduire dans le bac.",
          "Placez l'épuisette dans l'eau et laissez le poisson en sortir de lui-même, puis retirez-la doucement. Évitez de le manipuler à la main.",
        ],
      },
      {
        titre: "Après l'introduction",
        paragraphes: [
          "Laissez la lumière éteinte quelques heures et ne nourrissez pas le poisson le jour de son arrivée : il est trop stressé pour manger, et la nourriture non consommée polluerait l'eau. Il est normal qu'un nouvel arrivant se cache ou reste immobile pendant un ou deux jours. Surveillez ensuite sa nage, son appétit et ses couleurs, et testez l'eau pour vérifier que l'ajout n'a pas provoqué de pic d'ammoniac.",
          "Si vous ajoutez plusieurs poissons, faites-le par petits groupes espacés de quelques semaines : le filtre doit s'adapter à la charge supplémentaire de déchets.",
        ],
      },
      {
        titre: "Cas particuliers : crevettes, escargots et poissons sensibles",
        paragraphes: [
          "Les crevettes, les escargots et certaines espèces fragiles supportent mal les variations. Pour eux, la méthode au goutte-à-goutte est préférable : on place l'animal dans un récipient, puis on y fait arriver l'eau du bac très lentement, à raison de quelques gouttes par seconde grâce à un tuyau muni d'un nœud, pendant une à deux heures.",
          "Dans tous les cas, évitez d'introduire un nouvel animal directement dans un bac peuplé sans précaution : si vous en avez la possibilité, une quarantaine de deux à quatre semaines dans un petit bac séparé protège vos poissons des maladies que le nouveau pourrait transporter.",
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
        paragraphes: [
          "« Quel aquarium choisir pour débuter ? » est la question la plus posée, et la réponse dépend moins de la place disponible que des animaux que l'on veut accueillir. Un aquarium trop petit complique l'entretien et met les poissons en difficulté ; un volume adapté simplifie tout.",
        ],
      },
      {
        titre: "Partir des poissons, pas du meuble disponible",
        image: { src: '/guides/sections/quel-volume-aquarium-choisir-espece/1.webp', alt: "Ordre à suivre : choisir les espèces, en déduire le volume, et non partir du meuble disponible" },
        paragraphes: [
          "Le bon ordre est de choisir les espèces que l'on souhaite accueillir puis d'en déduire le volume nécessaire, plutôt que l'inverse.",
          "Concrètement, listez les espèces qui vous plaisent, notez pour chacune la taille adulte, le nombre d'individus recommandé et le volume minimum conseillé sur sa fiche, puis calculez le total. Si le résultat dépasse la place disponible, il vaut mieux réduire la liste des poissons que d'acheter un aquarium trop petit.",
        ],
      },
      {
        titre: "Tenir compte de la taille adulte",
        image: { src: '/guides/sections/quel-volume-aquarium-choisir-espece/2.webp', alt: "Un petit poisson acheté jeune atteint à l’âge adulte une taille qui exige un bac bien plus grand" },
        paragraphes: [
          "Un poisson vendu jeune à quelques centimètres peut atteindre une taille bien plus importante une fois adulte. Se renseigner sur la taille adulte de chaque espèce avant l'achat évite de se retrouver avec un bac trop petit quelques mois plus tard.",
          "La règle ancienne du « un centimètre de poisson par litre » est trop approximative : un poisson massif comme le Scalaire ou un Cichlidé du Lac Malawi occupe bien plus de place que son nombre de centimètres ne le suggère, et certaines espèces ont besoin de longueur de nage plutôt que de volume brut. Mieux vaut se fier aux recommandations par espèce.",
        ],
      },
      {
        titre: "Les espèces qui vivent en groupe",
        image: { src: '/guides/sections/quel-volume-aquarium-choisir-espece/3.webp', alt: "Un poisson solitaire dans un petit bac face à un banc de dix poissons dans un bac plus grand" },
        paragraphes: [
          "De nombreux poissons (bancs, Corydoras, Tétras) ont besoin d'un nombre minimum d'individus pour se sentir en sécurité, ce qui augmente d'autant le volume nécessaire par rapport à un poisson solitaire.",
          "Un petit groupe de six Corydoras ou de huit à dix Néons demande beaucoup plus de place qu'un seul poisson, alors que chaque individu est minuscule. À l'inverse, certains poissons territoriaux, comme les Bettas mâles, supportent mal d'être plusieurs dans un petit bac et se vivent mieux seuls.",
        ],
      },
      {
        titre: "Une marge de sécurité utile",
        image: { src: '/guides/sections/quel-volume-aquarium-choisir-espece/4.webp', alt: "Un aquarium un peu plus grand que le minimum théorique laisse une marge d’erreur sur les paramètres" },
        paragraphes: [
          "Viser un peu plus grand que le minimum théorique laisse une marge d'erreur sur les paramètres et facilite l'entretien au quotidien, un aquarium plus grand étant paradoxalement souvent plus simple à stabiliser.",
          "Dans un petit volume, une erreur de dosage ou un excès de nourriture déséquilibre l'eau en quelques heures. Dans un grand bac, la même erreur est diluée et laisse le temps de réagir. C'est pourquoi on recommande souvent aux débutants de commencer avec au moins 54 à 100 litres plutôt qu'un bac de moins de 30 litres.",
        ],
      },
      {
        titre: "Comment calculer le volume réel",
        paragraphes: [
          "Le volume se calcule en multipliant longueur, largeur et hauteur en centimètres, puis en divisant par 1 000 pour obtenir des litres. Un aquarium de 60 × 30 × 30 cm contient ainsi environ 54 litres bruts. Le volume réellement disponible pour les poissons est plus faible : le substrat, le décor, le bord de la cuve et le niveau d'eau, jamais rempli jusqu'au rebord, enlèvent 10 à 20 % du volume annoncé.",
          "Pensez aussi à la longueur : un bac long et bas offre plus de surface d'échange avec l'air, donc plus d'oxygène, et plus d'espace de nage qu'un bac haut et étroit de même volume.",
        ],
      },
      {
        titre: "Repères indicatifs selon les espèces",
        paragraphes: [
          "Ces valeurs sont des ordres de grandeur pour des poissons adultes. Elles varient selon les espèces et les sources, et la fiche de chaque poisson est toujours plus précise :",
        ],
        liste: [
          "Betta (mâle seul) : à partir de 20 litres, 30 litres si possible.",
          "Guppys ou Néons en petit groupe : 54 litres environ.",
          "Corydoras (groupe de 6) : 80 litres, avec un sol sableux.",
          "Scalaires : 200 litres et une hauteur d'au moins 50 cm.",
          "Cichlidés du Lac Malawi : 200 litres, sur 120 cm de long.",
          "Poissons rouges communs : prévoir un bassin ou un très grand aquarium, ils dépassent 25 cm.",
        ],
      },
      {
        titre: "Penser aux autres équipements",
        paragraphes: [
          "Le volume conditionne aussi le reste du matériel : filtre dimensionné pour environ quatre à six fois le volume du bac en débit horaire, chauffage de 1 watt par litre en première approximation, éclairage adapté à la profondeur. Un aquarium plus grand coûte plus cher à l'achat, mais il demande souvent moins de corrections et d'attentions au quotidien.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-son-premier-poisson', label: 'Choisir ses premiers poissons' },
      { href: '/categorie/cuves', label: 'Voir les aquariums en vente' },
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Démarrer un aquarium d’eau douce' },
      { href: '/guides/erreurs-debutant-aquariophilie', label: 'Les erreurs de débutant à éviter' },
    ],
  },
  {
    slug: 'aquarium-pour-enfant-bonne-idee',
    titre: 'Un aquarium pour un enfant : bonne ou mauvaise idée ?',
    eyebrow: 'Débuter',
    description:
      "Ce qu'il faut anticiper avant d'offrir un aquarium à un enfant : l'entretien réel, les espèces adaptées, et le rôle des parents.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Offrir un aquarium à un enfant est une idée séduisante : les poissons fascinent, l'observation apprend la patience et le respect du vivant. Mais c'est aussi un engagement de plusieurs années, qui demande une organisation familiale réaliste. Voici ce qu'il faut savoir avant de se lancer.",
        ],
      },
      {
        titre: "L'entretien reste une responsabilité d'adulte",
        image: { src: '/guides/sections/aquarium-pour-enfant-bonne-idee/1.webp', alt: "L’enfant nourrit et observe, l’adulte gère les paramètres et l’entretien technique" },
        paragraphes: [
          "Un enfant peut participer (nourrissage, observation) mais le suivi des paramètres et l'entretien technique restent, dans les faits, à la charge d'un adulte de la maison.",
          "Les tests d'eau, les changements d'eau, le nettoyage du filtre et les décisions en cas de problème demandent un recul qu'un enfant n'a pas toujours. Prévoyez que l'adulte supervise, et répartissez les tâches selon l'âge : observer et compter les poissons dès 5-6 ans, nourrir avec une ration préparée vers 8-10 ans, participer aux changements d'eau ensuite.",
        ],
      },
      {
        titre: "Choisir des espèces robustes et tolérantes",
        image: { src: '/guides/sections/aquarium-pour-enfant-bonne-idee/2.webp', alt: "Un poisson robuste et tolérant convient à un projet familial, une espèce délicate demande un aquariophile expérimenté" },
        paragraphes: [
          "Des poissons peu exigeants en paramètres et supportant de petites erreurs d'entretien conviennent mieux à un projet familial qu'une espèce délicate, réservée à un aquariophile plus expérimenté.",
          "Les Guppys, Platys, Danios et Corydoras sont de bons choix. Évitez le poisson rouge en bocal, dont la durée de vie peut dépasser dix ans et qui exige un grand volume. Un volume de 54 à 60 litres rend le bac plus stable qu'un mini-aquarium, souvent vendu comme « idéal pour enfant » mais bien plus délicat à équilibrer.",
        ],
      },
      {
        titre: "Un bon projet pédagogique",
        image: { src: '/guides/sections/aquarium-pour-enfant-bonne-idee/3.webp', alt: "Observer le cycle de l’azote, le comportement des poissons et la croissance des plantes" },
        paragraphes: [
          "Suivre le cycle de l'azote, observer le comportement des poissons ou le développement des plantes peut être une bonne initiation à la biologie et à la patience pour un enfant.",
          "L'enfant peut tenir un carnet de bord : date des changements d'eau, résultats des tests, naissances, observations. Le démarrage du bac, avec ses semaines d'attente avant les premiers poissons, est lui-même une leçon de patience. Les plantes, les escargots et les crevettes ajoutent des occasions d'observer un petit écosystème vivant.",
        ],
      },
      {
        titre: "Éviter les décisions impulsives",
        image: { src: '/guides/sections/aquarium-pour-enfant-bonne-idee/4.webp', alt: "Un coup de cœur en animalerie contre une décision prise en famille pour un engagement de plusieurs années" },
        paragraphes: [
          "Un aquarium engage sur plusieurs années. Mieux vaut en discuter en famille avant l'achat plutôt que de céder à un coup de cœur en animalerie.",
          "Un poisson acheté sur un coup de tête, dans un bac pas encore prêt, a peu de chances de survivre. Prenez le temps de préparer le bac, de le faire tourner quelques semaines, puis de choisir ensemble les premiers habitants.",
        ],
      },
      {
        titre: "Sécurité et hygiène",
        paragraphes: [
          "Quelques règles protègent à la fois l'enfant et l'aquarium :",
        ],
        liste: [
          "Installer le bac sur un meuble solide, à l'abri des chocs, avec un couvercle.",
          "Placer toutes les prises électriques en hauteur, avec des boucles d'égouttement.",
          "Préparer une ration de nourriture par jour : un enfant a tendance à trop donner.",
          "Se laver les mains avant et après tout contact avec l'eau, et éviter de plonger les mains avec une plaie ouverte.",
          "Ne jamais relâcher un poisson dans la nature, quelle que soit la situation.",
        ],
      },
      {
        titre: "Prévoir ce qui se passe quand l'enfant se lasse",
        paragraphes: [
          "L'intérêt d'un enfant peut baisser au bout de quelques mois, alors que les poissons continuent de vivre. Prévoyez qui reprendra l'entretien et rappelez-vous que certaines espèces vivent longtemps. Parlez aussi de la disparition d'un poisson : c'est une occasion de parler du vivant et du cycle de la vie, plutôt que de cacher la vérité. Enterrer le poisson dans le jardin vaut mieux que de le jeter aux toilettes.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-son-premier-poisson', label: 'Choisir ses premiers poissons' },
      { href: '/guides/erreurs-debutant-aquariophilie', label: 'Les erreurs de débutant à éviter' },
      { href: '/guides/quel-volume-aquarium-choisir-espece', label: 'Quel volume d’aquarium choisir' },
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
        paragraphes: [
          "Les premières semaines d'un aquarium neuf se jouent sans poisson, ou presque : le temps que le filtre développe sa population de bactéries utiles. Voici le déroulé en 4 étapes, du cyclage jusqu'à l'introduction progressive des poissons.",
          "Avant de commencer, rincez soigneusement le substrat et le décor, remplissez le bac avec de l'eau du robinet traitée par un conditionneur, mettez en marche le filtre et le chauffage, et réglez la température autour de 25 °C. Le filtre doit tourner en continu, jour et nuit, dès le premier jour.",
        ],
      },
      {
        titre: "Étape 1, semaines 1 à 2 : lancer le cyclage",
        image: { src: '/guides/premiere-semaine/etape-1-lancer-le-cyclage.webp', alt: "Aquarium neuf avec filtre en marche et tests d’eau, sans aucun poisson" },
        paragraphes: [
          "Installez le matériel, démarrez le filtre et suivez les tests d'ammoniac et de nitrites, sans introduire le moindre poisson à ce stade.",
          "Apportez une source d'ammoniac et plantez dès maintenant : les plantes accélèrent la stabilisation et limitent les algues. Réglez l'éclairage sur 5 à 6 heures par jour seulement. L'eau peut se troubler : c'est normal et temporaire. Notez vos mesures dans un carnet pour suivre l'évolution.",
        ],
      },
      {
        titre: "Étape 2, semaines 3 à 4 : suivre la montée des nitrites",
        image: { src: '/guides/premiere-semaine/etape-2-pic-des-nitrites.webp', alt: "Courbe des nitrites qui atteint son pic entre la 3e et la 4e semaine avant de redescendre" },
        paragraphes: [
          "C'est généralement la période où les nitrites atteignent leur pic avant de redescendre. C'est le signe que la population bactérienne du filtre progresse correctement : continuez à tester, sans rien ajouter.",
          "Une fine pellicule brune sur les vitres et le décor (diatomées) apparaît souvent à ce stade. Elle est inoffensive et disparaît seule. Évitez la tentation de changer l'eau massivement ou de vider le bac : cela retarderait simplement la fin du cyclage.",
        ],
      },
      {
        titre: "Étape 3, fin de cyclage : les premiers poissons",
        image: { src: '/guides/premiere-semaine/etape-3-premiers-poissons.webp', alt: "Tests d’ammoniac et de nitrites à zéro : les premiers poissons robustes peuvent être introduits" },
        paragraphes: [
          "Une fois l'ammoniac et les nitrites retombés à zéro, vous pouvez introduire les premiers poissons robustes, en petit nombre plutôt que tous à la fois.",
          "Faites un gros changement d'eau (30 à 50 %) pour ramener les nitrates à un niveau acceptable, puis introduisez environ un tiers du peuplement final prévu, en acclimatant soigneusement chaque poisson. Nourrissez très peu pendant la première semaine et testez l'eau tous les deux jours.",
        ],
      },
      {
        titre: "Étape 4, les semaines suivantes : peupler progressivement",
        image: { src: '/guides/premiere-semaine/etape-4-peupler.webp', alt: "Ajouts de poissons espacés de 2 à 3 semaines pour laisser le filtre s’adapter" },
        paragraphes: [
          "Attendez 2 à 3 semaines entre chaque nouvel ajout de poissons. Le filtre a le temps de s'adapter à la charge biologique supplémentaire, sans à-coup pour l'équilibre du bac.",
          "Au bout de deux à trois mois, le bac atteint un fonctionnement stable : tests réguliers, changements d'eau hebdomadaires, nourrissage mesuré. Gardez en tête qu'un aquarium met plusieurs mois à acquérir une vraie maturité biologique.",
        ],
      },
      {
        titre: "Ce qu'il ne faut pas faire pendant cette période",
        paragraphes: [
          "Plusieurs réflexes bien intentionnés se révèlent contre-productifs :",
        ],
        liste: [
          "Ajouter des poissons « pour voir » avant la fin du cyclage.",
          "Vider le bac à cause d'une eau trouble ou de premières algues.",
          "Rincer le filtre à l'eau du robinet.",
          "Multiplier les produits correcteurs (pH, anti-algues, clarifiants).",
          "Laisser l'éclairage allumé toute la journée.",
        ],
      },
      {
        titre: "Les indicateurs de réussite",
        paragraphes: [
          "Votre bac est prêt quand l'ammoniac et les nitrites restent à zéro 24 heures après l'ajout d'une source d'ammoniac, que les nitrates sont mesurables, que l'eau est claire et que les plantes poussent. Ces indicateurs comptent bien plus que le calendrier : certains bacs sont prêts en trois semaines, d'autres en huit.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Démarrer un aquarium d’eau douce' },
      { href: '/guides/cycle-sans-poisson-vs-avec-poisson', label: 'Cyclage sans poisson ou avec poisson' },
      { href: '/guides/acclimater-nouveau-poisson-aquarium', label: 'Bien acclimater un nouveau poisson' },
    ],
  },
  {
    slug: 'cycle-sans-poisson-vs-avec-poisson',
    titre: 'Cyclage sans poisson ou avec poisson : quelle méthode choisir ?',
    eyebrow: 'Comprendre',
    description:
      "Deux méthodes existent pour cycler un aquarium neuf : avec ou sans poisson présent. Leurs différences, avantages et inconvénients.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Tout aquarium neuf doit passer par un cyclage, c'est-à-dire l'installation de la colonie de bactéries qui traite les déchets. Deux approches s'opposent : le cyclage sans poisson et le cyclage avec poisson. Elles aboutissent au même résultat mais pas dans les mêmes conditions pour les animaux.",
        ],
      },
      {
        titre: "Le cyclage sans poisson",
        image: { src: '/guides/sections/cycle-sans-poisson-vs-avec-poisson/1.webp', alt: "Une source d’ammoniac nourrit les bactéries dans un bac sans poisson, sans exposer d’animal" },
        paragraphes: [
          "Une source d'ammoniac (produit dédié ou un peu de nourriture en décomposition) nourrit les bactéries en formation sans exposer d'animal aux pics toxiques. C'est la méthode la plus recommandée aujourd'hui.",
          "On fournit au bac environ 2 mg/L d'ammoniac, on suit l'évolution avec un kit de test, et on attend que l'ammoniac puis les nitrites disparaissent en 24 heures. Il est possible d'accélérer en apportant des masses filtrantes ou du substrat d'un bac déjà installé. Les plantes, nombreuses et en croissance, aident aussi à absorber l'ammonium.",
        ],
      },
      {
        titre: "Le cyclage avec poisson",
        image: { src: '/guides/sections/cycle-sans-poisson-vs-avec-poisson/2.webp', alt: "Les premiers poissons sont exposés aux pics d’ammoniac et de nitrites pendant les premières semaines" },
        paragraphes: [
          "Historiquement répandu, il expose directement les premiers poissons aux pics d'ammoniac et de nitrites, avec un risque de mortalité ou de stress important pendant les premières semaines.",
          "Si le bac est déjà peuplé et n'a pas été cyclé, il faut faire tout son possible pour limiter les dégâts : peu de poissons, très peu de nourriture, des tests quotidiens, et des changements d'eau de 30 à 50 % chaque fois que l'ammoniac ou les nitrites dépassent 0,25 mg/L. Un conditionneur d'eau qui neutralise temporairement l'ammoniac apporte aussi un peu de répit.",
          "Ce type de démarrage reste une solution de dépannage et non un choix : si vous avez encore le choix, mieux vaut ne pas acheter les poissons tant que le cycle n'est pas terminé.",
        ],
      },
      {
        titre: "Pourquoi la méthode sans poisson est privilégiée",
        image: { src: '/guides/sections/cycle-sans-poisson-vs-avec-poisson/3.webp', alt: "Sans poisson, le cycle se termine avant l’arrivée des animaux ; avec poisson, ils subissent les pics toxiques" },
        paragraphes: [
          "Elle permet d'attendre la fin complète du cycle avant d'introduire le moindre animal, sans compromis sur son bien-être ni sur celui des poissons suivants.",
          "Les poissons exposés à l'ammoniac subissent des lésions aux branchies qui peuvent laisser des séquelles durables, même s'ils semblent s'en remettre. Le cyclage sans poisson évite entièrement ce problème, et permet de lancer le bac dans de bonnes conditions dès l'arrivée des premiers habitants.",
        ],
      },
      {
        titre: "Dans tous les cas, la patience reste la clé",
        image: { src: '/guides/sections/cycle-sans-poisson-vs-avec-poisson/4.webp', alt: "Un cyclage complet prend généralement de 4 à 6 semaines, quelle que soit la méthode" },
        paragraphes: [
          "Qu'elle que soit la méthode choisie, un cyclage complet prend généralement 4 à 6 semaines, un délai qu'il vaut mieux anticiper avant même l'achat des poissons.",
          "Ne vous fiez pas à l'aspect de l'eau : un bac peut être limpide et pourtant sans bactéries. Seuls les tests donnent la réponse.",
        ],
      },
      {
        titre: "Comparaison rapide",
        paragraphes: [
          "Pour résumer les différences entre les deux méthodes :",
        ],
        liste: [
          "Sans poisson : aucun animal exposé, durée de 4 à 6 semaines, nécessite un kit de test et une source d'ammoniac.",
          "Avec poisson : démarrage immédiat mais stress et risques de mortalité, nécessite des tests quotidiens et de gros changements d'eau.",
          "Avec plantes en abondance : le bac se stabilise plus vite et plus doucement, à condition de peupler très progressivement.",
        ],
      },
      {
        titre: "Une troisième voie : le bac très planté",
        paragraphes: [
          "Un aquarium dense en plantes, avec un substrat riche et un très faible nombre de poissons, peut se stabiliser presque sans pic visible : les plantes absorbent l'ammonium au fur et à mesure. Cette méthode exige de la rigueur et de petites quantités de poissons au début, mais elle donne des bacs d'une grande stabilité à long terme.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
      { href: '/guides/premiere-semaine-nouvel-aquarium', label: 'Les premières semaines d’un nouvel aquarium' },
      { href: '/guides/acclimater-nouveau-poisson-aquarium', label: 'Bien acclimater un nouveau poisson' },
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
        paragraphes: [
          "Les plantes ne sont pas qu'un élément de décoration. Dans un aquarium, elles participent activement à l'équilibre de l'eau, à la santé des poissons et à la lutte contre les algues. C'est aussi pourquoi un bac bien planté est généralement plus facile à entretenir qu'un bac nu.",
        ],
      },
      {
        titre: "Consommer les nutriments en excès",
        image: { src: '/guides/sections/role-des-plantes-aquarium-equilibre/1.webp', alt: "Les plantes absorbent des nitrates et soulagent la filtration biologique" },
        paragraphes: [
          "Les plantes absorbent une partie des nitrates et d'autres composés issus des déchets, réduisant d'autant la charge que la filtration biologique doit traiter.",
          "Elles consomment aussi directement l'ammonium issu des déjections des poissons, qu'elles préfèrent aux nitrates : elles participent donc au traitement de la pollution dès la première étape. Les plantes à croissance rapide (Egeria densa, Ceratophyllum, Hygrophila, Vallisnéries) sont les plus efficaces, tout comme les plantes flottantes, qui prélèvent leurs nutriments directement dans l'eau.",
        ],
      },
      {
        titre: "Concurrencer les algues",
        image: { src: '/guides/sections/role-des-plantes-aquarium-equilibre/2.webp', alt: "Comparaison d’un bac avec peu de plantes et des algues, et d’un bac bien planté sans algues" },
        paragraphes: [
          "En captant les nutriments disponibles, des plantes bien installées limitent naturellement le développement des algues indésirables.",
          "Les algues et les plantes se disputent les mêmes ressources : lumière, azote, phosphore, CO₂. Quand les plantes sont nombreuses et en bonne santé, il reste peu de nutriments pour les algues. C'est pourquoi un bac neuf, planté dès le premier jour et de façon dense, connaît beaucoup moins de problèmes qu'un bac planté timidement et rempli plus tard.",
        ],
      },
      {
        titre: "Offrir des cachettes et réduire le stress",
        image: { src: '/guides/sections/role-des-plantes-aquarium-equilibre/3.webp', alt: "Poissons timides et alevins qui se réfugient parmi les plantes" },
        paragraphes: [
          "Les plantes fournissent des zones de repli pour les poissons timides ou les alevins, ce qui réduit le niveau de stress général dans le bac.",
          "Elles cassent aussi les lignes de vue, ce qui limite les conflits entre poissons territoriaux, et servent de support de ponte à de nombreuses espèces. Un poisson qui peut se cacher se comporte de façon plus naturelle, se nourrit mieux et résiste mieux aux maladies.",
        ],
      },
      {
        titre: "Un équilibre qui prend du temps à s'installer",
        image: { src: '/guides/sections/role-des-plantes-aquarium-equilibre/4.webp', alt: "Un bac fraîchement planté met plusieurs semaines à profiter pleinement du rôle des plantes" },
        paragraphes: [
          "Un bac fraîchement planté met plusieurs semaines à tirer pleinement parti de ce rôle, le temps que les plantes développent racines et feuillage.",
          "Pendant cette phase, des algues peuvent apparaître, ce qui est normal. La patience, un éclairage modéré et des changements d'eau réguliers permettent de passer le cap. Retirez rapidement les feuilles mortes ou fanées, qui pourrissent et polluent l'eau.",
        ],
      },
      {
        titre: "Ce que les plantes ne font pas",
        paragraphes: [
          "Les plantes aident, mais elles ne remplacent pas la filtration ni les changements d'eau. La nuit, elles consomment de l'oxygène au lieu d'en produire, et un bac très planté mais mal oxygéné peut manquer d'air au petit matin. Un bac dense en poissons ne sera jamais purifié uniquement par ses plantes.",
          "Choisissez aussi vos plantes en fonction de la lumière et du substrat dont vous disposez, plutôt que l'inverse : une plante inadaptée dépérit, pourrit et pollue l'eau au lieu de la purifier. Quand vous hésitez, privilégiez les espèces robustes, qui pardonnent les erreurs de débutant.",
        ],
      },
      {
        titre: "Par où commencer",
        paragraphes: [
          "Pour un premier bac planté, quelques principes simples évitent la plupart des déconvenues :",
        ],
        liste: [
          "Choisir des plantes faciles, peu exigeantes en lumière et en nutriments (Anubias, Fougère de Java, Cryptocorynes, Vallisnéries).",
          "Planter dense dès le départ, en incluant quelques plantes à croissance rapide et des plantes flottantes.",
          "Respecter une photopériode raisonnable, de 6 à 8 heures par jour.",
          "Ajouter un substrat nutritif ou des engrais racinaires si le sol est inerte.",
          "Tailler régulièrement pour éviter qu'un excès de plantes ne se mette à mourir en dessous.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/plantes-faciles-aquarium-debutant', label: 'Des plantes faciles pour débuter' },
      { href: '/guides/lutter-contre-les-algues-aquarium', label: 'Lutter contre les algues' },
      { href: '/guides/comprendre-la-photoperiode-aquarium', label: 'Comprendre la photopériode' },
      { href: '/guides/tailler-entretenir-plantes-aquarium', label: 'Tailler et entretenir ses plantes' },
    ],
  },
  {
    slug: 'difference-eau-osmosee-eau-robinet-aquarium',
    titre: "Eau du robinet ou eau osmosée : ce qu'il faut savoir",
    eyebrow: 'Comprendre',
    description:
      "Différences entre l'eau du robinet et l'eau osmosée pour l'aquariophilie, et dans quels cas l'une ou l'autre est préférable.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "L'eau est le milieu de vie de vos poissons : sa composition conditionne tout le reste. Faut-il se contenter de l'eau du robinet ou investir dans l'eau osmosée ? La réponse dépend de vos poissons, de la dureté de votre eau et de votre projet.",
        ],
      },
      {
        titre: "L’eau du robinet, un point de départ pour la plupart des bacs",
        image: { src: '/guides/sections/difference-eau-osmosee-eau-robinet-aquarium/1.webp', alt: "Eau du robinet traitée avec un conditionneur anti-chlore pour un aquarium d’eau douce communautaire" },
        paragraphes: [
          "Traitée avec un conditionneur anti-chlore, elle convient à la grande majorité des aquariums d'eau douce communautaires, à condition de vérifier ses paramètres de base (dureté notamment).",
          "Elle contient des minéraux utiles (calcium, magnésium, bicarbonates) et son tampon naturel protège le pH. Son principal défaut est sa variabilité d'une région à l'autre : très dure en zone calcaire, très douce sur un sol granitique. Elle peut aussi contenir des nitrates, des phosphates ou des silicates qui nourrissent les algues. Votre service des eaux publie ses analyses : consultez-les avant d'acheter quoi que ce soit.",
        ],
      },
      {
        titre: "L’eau osmosée, une eau quasiment vide de minéraux",
        image: { src: '/guides/sections/difference-eau-osmosee-eau-robinet-aquarium/2.webp', alt: "Un osmoseur filtre l’eau du robinet et produit une eau presque sans minéraux" },
        paragraphes: [
          "Obtenue par un osmoseur qui filtre l'eau du robinet, elle est presque totalement dépourvue de minéraux, ce qui la rend utile pour certains projets spécifiques.",
          "Une membrane d'osmose inverse retire environ 90 à 99 % des sels dissous, ainsi que la plupart des polluants. L'eau obtenue présente une conductivité très faible, proche de zéro, un GH et un KH quasi nuls et un pH instable, car elle n'a plus de pouvoir tampon.",
        ],
      },
      {
        titre: "Quand l'eau osmosée devient utile",
        image: { src: '/guides/sections/difference-eau-osmosee-eau-robinet-aquarium/3.webp', alt: "Un bac récifal ou des poissons d’eau très douce profitent d’une eau osmosée reminéralisée" },
        paragraphes: [
          "Un bac récifal, ou l'élevage de poissons qui exigent une eau très douce, tire souvent parti d'une eau osmosée reminéralisée de façon contrôlée.",
          "Elle sert aussi à adoucir une eau du robinet trop dure en la coupant avec de l'eau osmosée, pour des poissons d'Amazonie, des Discus ou des crevettes sensibles. Enfin, elle est précieuse quand l'eau du robinet est polluée en nitrates ou en phosphates.",
        ],
      },
      {
        titre: "Ne jamais utiliser d’eau osmosée pure sans reminéralisation",
        image: { src: '/guides/sections/difference-eau-osmosee-eau-robinet-aquarium/4.webp', alt: "L’eau osmosée pure est instable pour les poissons : elle doit être reminéralisée avant usage" },
        paragraphes: [
          "Une eau totalement dépourvue de minéraux n'est stable pour aucun poisson. Elle doit être reminéralisée avant utilisation dans la grande majorité des cas.",
          "On reminéralise soit avec un sel du commerce adapté à l'usage (eau douce, crevettes, récif), soit en mélangeant eau osmosée et eau du robinet. Pour viser un GH donné, la formule est simple : GH final ≈ GH du robinet × part d'eau du robinet dans le mélange. Avec une eau du robinet à 16 °dGH, un mélange moitié-moitié donne environ 8 °dGH.",
        ],
      },
      {
        titre: "Les eaux à éviter",
        paragraphes: [
          "L'eau déminéralisée vendue pour les fers à repasser contient parfois des parfums ou des additifs, et l'eau en bouteille a une composition très variable : elles sont à déconseiller sans contrôle. L'eau de pluie récoltée en ville est polluée. L'eau adoucie par un adoucisseur domestique est riche en sodium et ne convient pas aux aquariums.",
        ],
      },
      {
        titre: "Un détail important : l'évaporation",
        paragraphes: [
          "Quand l'eau s'évapore, les minéraux restent dans le bac. Pour compléter le niveau, utilisez donc de l'eau osmosée ou déminéralisée, pas de l'eau du robinet : la dureté augmenterait peu à peu sinon. C'est une pratique courante en récifal, avec un osmolateur qui complète automatiquement.",
          "Si vous vous lancez dans l'osmose, vérifiez régulièrement la qualité de l'eau produite avec un testeur de TDS, qui mesure les sels dissous : une valeur qui grimpe indique que la membrane ou les préfiltres sont à remplacer. Comptez aussi la consommation d'eau de l'appareil, car il rejette une partie de l'eau traitée.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/parametres-eau-ph-gh-kh', label: 'Comprendre les paramètres de l’eau' },
      { href: '/guides/osmoseur-aquarium-a-quoi-ca-sert', label: 'L’osmoseur : à quoi ça sert' },
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: 'Bien faire son changement d’eau' },
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
        paragraphes: [
          "L'éclairage d'un aquarium ne se résume pas à choisir une belle lampe : sa durée quotidienne compte autant que sa puissance. Cette durée, appelée photopériode, influence la santé des poissons, la croissance des plantes et, quand elle est mal réglée, l'apparition des algues.",
        ],
      },
      {
        titre: "Qu'est-ce que la photopériode",
        image: { src: '/guides/sections/comprendre-la-photoperiode-aquarium/1.webp', alt: "Durée quotidienne d’éclairage du bac, réglée par un minuteur sur un cadran de 24 heures" },
        paragraphes: [
          "C'est la durée quotidienne pendant laquelle l'éclairage du bac reste allumé, généralement réglée par une prise programmable ou un minuteur intégré.",
          "Elle correspond à la longueur du « jour » dans le bac. Dans la nature, les poissons tropicaux vivent à des latitudes où le jour dure en moyenne 12 heures toute l'année, mais cela ne signifie pas qu'il faille allumer le bac aussi longtemps : une lampe d'aquarium, proche des yeux des poissons et de l'eau, concentre bien plus de lumière qu'une rivière ombragée par la forêt.",
        ],
      },
      {
        titre: "Son rôle pour les plantes",
        image: { src: '/guides/sections/comprendre-la-photoperiode-aquarium/2.webp', alt: "Une photopériode suffisante permet la photosynthèse et la croissance des plantes" },
        paragraphes: [
          "Une photopériode suffisante permet la photosynthèse nécessaire à la croissance des plantes, sans quoi elles s'affaiblissent progressivement.",
          "Les plantes ont besoin d'une quantité de lumière (intensité × durée), mais elles saturent assez vite : au-delà de 8 heures dans la plupart des bacs, elles ne profitent plus d'un temps supplémentaire, alors que les algues, elles, continuent de se développer. Les espèces d'ombre comme les Anubias et les Fougères de Java se contentent de très peu de lumière, tandis que les plantes de premier plan exigent un éclairage plus puissant.",
        ],
      },
      {
        titre: "Son rôle pour les poissons",
        image: { src: '/guides/sections/comprendre-la-photoperiode-aquarium/3.webp', alt: "Alternance de jour actif et de nuit au repos, comme un rythme circadien" },
        paragraphes: [
          "Une alternance jour/nuit régulière rassure les poissons et structure leur comportement (alimentation, repos), un peu comme un rythme circadien.",
          "Un bac éclairé en continu stresse les poissons, qui ont besoin de périodes d'obscurité pour se reposer. À l'inverse, éteindre brutalement la lumière peut effrayer certaines espèces : une petite lumière d'ambiance de la pièce pendant quelques minutes avant la nuit leur évite un sursaut.",
        ],
      },
      {
        titre: "Le piège d'une photopériode trop longue",
        image: { src: '/guides/sections/comprendre-la-photoperiode-aquarium/4.webp', alt: "Au-delà de 10 à 12 heures d’éclairage par jour, l’excès de lumière favorise surtout les algues" },
        paragraphes: [
          "Au-delà de 10 à 12 heures par jour selon les bacs, l'excès de lumière favorise surtout la prolifération d'algues, sans bénéfice supplémentaire pour les plantes.",
          "Si des algues apparaissent, réduire la durée d'éclairage est le premier levier à actionner, avant tout produit : essayez de passer de 9 à 7 heures et attendez deux à trois semaines pour juger de l'effet.",
        ],
      },
      {
        titre: "Quelle durée choisir ?",
        paragraphes: [
          "Les valeurs suivantes constituent de bons points de départ, à ajuster selon votre bac :",
        ],
        liste: [
          "Aquarium sans plantes ou avec plantes d'ombre : 6 à 8 heures par jour.",
          "Aquarium planté standard, sans CO₂ ajouté : 7 à 8 heures par jour.",
          "Aquarium planté avec injection de CO₂ : 8 à 9 heures, en démarrant progressivement.",
          "Bac neuf (les premières semaines) : 5 à 6 heures, le temps que les plantes s'installent et que le bac se stabilise.",
          "Aquarium récifal : suivre le programme de l'éclairage, qui simule souvent un lever et un coucher de soleil.",
        ],
      },
      {
        titre: "Une technique utile : la pause de midi",
        paragraphes: [
          "Certains aquariophiles divisent la photopériode en deux, avec une pause de deux à trois heures au milieu de la journée. Cette « siesta » réduit le temps pendant lequel les algues bénéficient d'une lumière continue, sans pénaliser les plantes. C'est facile à mettre en œuvre avec une minuterie à plusieurs plages horaires.",
          "Veillez aussi à ce que le bac ne reçoive pas de soleil direct. Même quelques heures de lumière naturelle viennent s'ajouter à l'éclairage artificiel et faussent complètement les réglages.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/eclairage-bac-plante-choisir', label: 'Choisir l’éclairage d’un bac planté' },
      { href: '/guides/lutter-contre-les-algues-aquarium', label: 'Lutter contre les algues' },
      { href: '/guides/minuterie-programmateur-aquarium-utilite', label: 'Minuterie et programmateur' },
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
        paragraphes: [
          "Un aquarium récifal représente un investissement important en temps, en argent et en vivant. Une seule maladie introduite par un poisson ou un corail peut ruiner des mois de travail. La quarantaine est la meilleure assurance contre ce risque, et elle est plus simple à mettre en place qu'on ne l'imagine.",
        ],
      },
      {
        titre: "Le risque d’introduire une maladie",
        image: { src: '/guides/sections/quarantaine-poissons-recifal-pourquoi/1.webp', alt: "Poisson ou corail neuf porteur d’un parasite invisible pouvant contaminer le bac récifal" },
        paragraphes: [
          "Un poisson ou un corail nouvellement acheté peut porter un parasite ou une maladie invisible à l'œil nu, capable de contaminer tout un bac récifal une fois introduit directement.",
          "Chez les poissons, les principaux risques sont l'ichthyophthiriose marine (Cryptocaryon, les points blancs), l'oodinium (maladie du velours) et diverses infections bactériennes ou parasitaires. Chez les coraux, on craint les vers plats, les limaces prédatrices, les aiptasies et divers ravageurs minuscules. Une fois installés dans le bac principal, ces problèmes sont très difficiles à éradiquer.",
        ],
      },
      {
        titre: "Un bac de quarantaine simple mais efficace",
        image: { src: '/guides/sections/quarantaine-poissons-recifal-pourquoi/2.webp', alt: "Petit bac de quarantaine avec filtre et chauffage et sans décor complexe" },
        paragraphes: [
          "Un petit volume, un filtre et un chauffage suffisent généralement, sans décor complexe, pour observer le nouvel arrivant pendant quelques semaines.",
          "Un bac de 40 à 100 litres convient pour la plupart des poissons. Ajoutez un filtre à éponge prémûri dans le bac principal, des tuyaux en PVC pour servir de cachettes, un chauffage, un thermomètre et une couverture pour éviter les sauts. Pas de substrat ni de roches : ils rendraient l'observation et le traitement plus difficiles.",
        ],
      },
      {
        titre: "La durée recommandée",
        image: { src: '/guides/sections/quarantaine-poissons-recifal-pourquoi/3.webp', alt: "Quarantaine de deux à quatre semaines pour observer le nouvel arrivant" },
        paragraphes: [
          "Une période de 2 à 4 semaines d'observation pour les coraux, et de 4 à 6 semaines pour les poissons, permet généralement de repérer un problème avant qu'il ne soit trop tard pour le reste du bac.",
          "Cette durée correspond au cycle de vie des parasites comme le Cryptocaryon, qui peuvent rester invisibles quelques jours avant de se manifester. Pour les coraux, un bain préventif (« dip ») dans une solution adaptée, suivi d'une inspection minutieuse sous une lampe, permet de déloger de nombreux ravageurs.",
        ],
      },
      {
        titre: "Un investissement qui protège tout le bac principal",
        image: { src: '/guides/sections/quarantaine-poissons-recifal-pourquoi/4.webp', alt: "Bac de quarantaine peu coûteux qui protège le bac récifal contre une contamination" },
        paragraphes: [
          "Le coût et l'espace d'un bac de quarantaine restent minimes comparés au risque de perdre plusieurs coraux ou poissons en cas de contamination du bac principal.",
          "En cas de maladie, vous pouvez traiter le poisson dans le bac de quarantaine sans exposer les coraux, très sensibles à certains médicaments comme le cuivre. C'est un argument décisif en faveur de ce bac séparé.",
        ],
      },
      {
        titre: "Comment organiser la quarantaine",
        paragraphes: [
          "Un protocole simple fonctionne bien :",
        ],
        liste: [
          "Acclimater le poisson avec soin, puis le placer dans le bac de quarantaine, sans le mélanger aux autres.",
          "Observer chaque jour : respiration, appétit, couleurs, taches, comportement.",
          "Tester les paramètres : ammoniac, nitrites, température et salinité.",
          "Nourrir peu mais régulièrement, avec des aliments variés.",
          "Traiter selon le diagnostic, jamais préventivement à l'aveugle.",
          "Ne transférer l'animal dans le bac principal qu'après la fin de la période d'observation.",
        ],
      },
      {
        titre: "Un matériel dédié",
        paragraphes: [
          "Utilisez du matériel séparé pour la quarantaine (épuisette, seau, tuyau) ou désinfectez-le soigneusement entre chaque usage. Lavez-vous les mains et les avant-bras entre le bac de quarantaine et le bac principal. Un matériel partagé suffit à transporter des parasites d'un bac à l'autre. Enfin, achetez de préférence des animaux auprès de revendeurs qui pratiquent eux-mêmes une quarantaine.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/acclimatation-goutte-a-goutte-poissons-coraux', label: 'L’acclimatation goutte à goutte' },
      { href: '/guides/aquarium-recifal-par-ou-commencer', label: 'Démarrer en récifal' },
      { href: '/guides/reconnaitre-poisson-malade-stresse', label: 'Reconnaître un poisson malade ou stressé' },
    ],
  },
  {
    slug: 'eclairage-recifal-choisir-led',
    titre: 'Choisir son éclairage LED pour un aquarium récifal',
    eyebrow: 'Récifal',
    description:
      "Puissance, spectre, intensité : comment choisir un éclairage LED adapté à un aquarium récifal selon les coraux hébergés.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Dans un aquarium récifal, la lumière n'est pas un simple confort visuel : elle nourrit les coraux. Les algues microscopiques qui vivent dans leurs tissus (les zooxanthelles) produisent une grande partie de l'énergie du corail grâce à la photosynthèse. Choisir un bon éclairage est donc une décision structurante pour tout le projet.",
        ],
      },
      {
        titre: "Un besoin bien plus élevé qu'en eau douce",
        image: { src: '/guides/sections/eclairage-recifal-choisir-led/1.webp', alt: "Éclairage plus puissant nécessaire en récifal qu’en eau douce plantée" },
        paragraphes: [
          "Les coraux, en particulier les SPS, ont besoin d'une intensité lumineuse nettement supérieure à celle d'un bac planté d'eau douce classique pour assurer leur photosynthèse symbiotique.",
          "On exprime cette intensité en PAR (rayonnement utile à la photosynthèse). Pour donner des ordres de grandeur, les coraux mous se contentent en général de 50 à 150 µmol/m²/s, les LPS de 100 à 200 et les SPS de 200 à 400, selon l'espèce et la profondeur. Un luxmètre ou un PAR-mètre permet de mesurer, mais les fabricants fournissent souvent des cartes de répartition de la lumière.",
        ],
      },
      {
        titre: "Le spectre adapté aux coraux",
        image: { src: '/guides/sections/eclairage-recifal-choisir-led/2.webp', alt: "Spectre LED à dominante bleue complété par une composante blanche" },
        paragraphes: [
          "Une dominante bleue favorise généralement la coloration et la croissance des coraux, en complément d'une composante blanche qui profite aussi à l'observation du bac.",
          "Les LED récifales combinent plusieurs canaux (bleu royal, bleu, blanc, violet, parfois rouge ou vert), réglables séparément. Les teintes bleues et violettes font ressortir la fluorescence des coraux, tandis que le blanc donne un rendu plus naturel. Choisissez une rampe à canaux séparés si vous voulez régler finement le spectre.",
        ],
      },
      {
        titre: "Adapter l’intensité selon les espèces",
        image: { src: '/guides/sections/eclairage-recifal-choisir-led/3.webp', alt: "Lumière modérée pour coraux mous et LPS, plus puissante pour SPS" },
        paragraphes: [
          "Les coraux mous et LPS tolèrent une lumière plus modérée que les SPS, qui exigent généralement un éclairage plus puissant et une acclimatation progressive à cette intensité.",
          "Dans un même bac, on étage les coraux : les SPS exigeants en haut, près de la source lumineuse, les LPS au milieu et les mous ou les espèces d'ombre en bas ou sur les côtés. La profondeur diminue vite l'intensité, d'où l'importance de tenir compte de la hauteur du bac.",
        ],
      },
      {
        titre: "Une acclimatation lumineuse progressive",
        image: { src: '/guides/sections/eclairage-recifal-choisir-led/4.webp', alt: "Intensité lumineuse augmentée par paliers sur plusieurs semaines pour éviter le blanchiment des coraux" },
        paragraphes: [
          "Un nouveau corail, ou un éclairage neuf plus puissant, doit être introduit progressivement pour éviter un stress lumineux (blanchiment) chez des coraux non habitués.",
          "Démarrez à 30 ou 40 % de la puissance et augmentez de 10 % par semaine environ, en surveillant la couleur des coraux. Un corail qui pâlit brutalement a perdu ses zooxanthelles : c'est le blanchiment. Dans ce cas, réduisez immédiatement l'intensité et vérifiez les paramètres de l'eau.",
        ],
      },
      {
        titre: "Durée et programmation",
        paragraphes: [
          "Une photopériode de 8 à 10 heures est courante, avec un lever et un coucher progressifs qui simulent le soleil. La plupart des rampes récifales offrent cette programmation. Évitez d'allumer ou d'éteindre brutalement : cela stresse les poissons et les coraux. Une période de nuit totale est nécessaire à leur repos. Installez une minuterie ou un contrôleur, et notez vos réglages pour comprendre les effets d'un changement.",
        ],
      },
      {
        titre: "Les critères pour choisir une rampe",
        paragraphes: [
          "Avant d'acheter, vérifiez ces points :",
        ],
        liste: [
          "Puissance et couverture adaptées à la taille du bac (longueur, largeur et hauteur).",
          "Canaux réglables et programmation d'un cycle jour/nuit.",
          "Refroidissement efficace : une LED qui chauffe vieillit mal.",
          "Fixation adaptée (suspension, bras) et distance réglable au-dessus de l'eau.",
          "Disponibilité des pièces et du service après-vente.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/coraux-mous-lps-sps-differences', label: 'Coraux mous, LPS, SPS : les différences' },
      { href: '/guides/materiel-recifal-ecumeur-osmolateur-brassage', label: 'Le matériel indispensable en récifal' },
      { href: '/guides/led-vs-neon-eclairage-aquarium-comparatif', label: 'LED ou néon : le comparatif' },
    ],
  },
  {
    slug: 'nourrir-un-aquarium-recifal',
    titre: 'Bien nourrir un aquarium récifal',
    eyebrow: 'Récifal',
    description:
      "Nourrir les poissons mais aussi les coraux d'un aquarium récifal : quelles différences, quelle fréquence et quels pièges éviter.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Nourrir un aquarium récifal demande plus de finesse qu'un bac d'eau douce. Chaque repas apporte des nutriments qui nourrissent à la fois les poissons, les coraux et les algues indésirables. L'objectif est de nourrir assez pour que tous les habitants se portent bien, sans faire monter les nitrates et les phosphates.",
        ],
      },
      {
        titre: "Nourrir les poissons récifal",
        image: { src: '/guides/sections/nourrir-un-aquarium-recifal/1.webp', alt: "Granulés, paillettes et nourriture congelée pour les poissons marins" },
        paragraphes: [
          "Une alimentation variée (granulés, paillettes, nourriture congelée) couvre généralement les besoins des poissons marins, en veillant à ne pas suralimenter dans un volume souvent plus sensible qu'en eau douce.",
          "Les mysis, les artémias, les granulés pour poissons marins et les algues séchées (nori) fixées sur une pince conviennent à la plupart des espèces. Les herbivores comme les chirurgiens ont besoin de végétaux en continu. Donnez de petites quantités une à deux fois par jour, et rincez la nourriture congelée avant de la distribuer pour limiter l'apport de phosphates.",
        ],
      },
      {
        titre: "Nourrir les coraux",
        image: { src: '/guides/sections/nourrir-un-aquarium-recifal/2.webp', alt: "Coraux nourris par la lumière et par un complément de phytoplancton ou zooplancton" },
        paragraphes: [
          "De nombreux coraux tirent une bonne partie de leur énergie de la photosynthèse via les algues symbiotiques qu'ils hébergent, mais certains profitent aussi d'un apport complémentaire en nourriture fine (phytoplancton, zooplancton).",
          "Les LPS à gros polypes (Euphyllia, Trachyphyllia) acceptent des morceaux de mysis ou de chair de poisson, déposés avec une pipette. Les gorgones et les coraux non photosynthétiques (Tubastrea, certains coraux mous) dépendent presque entièrement d'un apport planctonique. Deux ou trois nourrissages par semaine suffisent généralement.",
        ],
      },
      {
        titre: "Le risque de suralimentation en récifal",
        image: { src: '/guides/sections/nourrir-un-aquarium-recifal/3.webp', alt: "Excès de nourriture qui fait monter les nitrates et les phosphates" },
        paragraphes: [
          "Un excès de nourriture se traduit rapidement par une hausse des nitrates et des phosphates, deux paramètres particulièrement sensibles à surveiller en aquarium récifal.",
          "Des nitrates et des phosphates élevés favorisent les algues filamenteuses et les cyanobactéries, et peuvent gêner la coloration des coraux. À l'inverse, des valeurs proches de zéro affament les coraux et les font pâlir. L'objectif est un niveau faible mais mesurable, à adapter selon le type de bac.",
        ],
      },
      {
        titre: "Adapter la fréquence aux paramètres du bac",
        image: { src: '/guides/sections/nourrir-un-aquarium-recifal/4.webp', alt: "Mesure des nitrates et phosphates pour ajuster la fréquence de nourrissage" },
        paragraphes: [
          "Un suivi régulier des nitrates et phosphates permet d'ajuster la fréquence de nourrissage plutôt que de suivre une règle fixe, différente d'un bac à l'autre.",
          "Testez les nitrates et les phosphates chaque semaine au début, puis moins souvent quand le bac est stable. Si les valeurs montent, réduisez les quantités, nettoyez l'écumeur plus souvent et augmentez le renouvellement d'eau. Si elles tombent à zéro et que les coraux ternissent, nourrissez davantage.",
        ],
      },
      {
        titre: "Bonnes pratiques de nourrissage",
        paragraphes: [
          "Quelques réflexes simplifient la gestion :",
        ],
        liste: [
          "Éteindre brièvement l'écumeur et les pompes de brassage pendant le nourrissage des coraux, pour éviter que la nourriture ne soit aspirée.",
          "Nourrir toujours à la même heure, pour que les poissons s'habituent à un rythme.",
          "Retirer les restes avec une épuisette ou une pipette après quelques minutes.",
          "Conserver la nourriture congelée au congélateur et la décongeler dans un peu d'eau du bac.",
          "Noter les quantités distribuées pour repérer l'effet sur les paramètres.",
        ],
      },
      {
        titre: "Les poissons à régime particulier",
        paragraphes: [
          "Certaines espèces sont délicates à nourrir : les hippocampes et les syngnathes exigent des proies vivantes ou bien habituées à la nourriture congelée, les poissons-mandarins se nourrissent de petits crustacés présents dans la roche vivante. Renseignez-vous avant d'acheter, car un poisson qui ne mange pas dépérit lentement, et un régime inadapté se paie en quelques semaines.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/calcium-kh-magnesium-recifal', label: 'Calcium, KH et magnésium en récifal' },
      { href: '/guides/aquarium-recifal-par-ou-commencer', label: 'Démarrer en récifal' },
      { href: '/guides/materiel-recifal-ecumeur-osmolateur-brassage', label: 'Écumeur, osmolateur et brassage' },
    ],
  },
  {
    slug: 'choisir-poissons-bassin-jardin',
    titre: 'Quels poissons choisir pour un bassin de jardin ?',
    eyebrow: 'Bassin',
    description:
      "Carpes koï, poissons rouges, autres espèces rustiques : comment choisir les poissons adaptés à un bassin de jardin selon sa taille et son climat.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Un bassin de jardin vit avec ses poissons : ils animent l'eau, mangent les larves de moustiques et participent à l'ambiance. Mais le choix des espèces dépend de la taille du bassin, du climat et du temps que l'on veut consacrer à l'entretien. Voici les principales options.",
        ],
      },
      {
        titre: "Les carpes koï",
        image: { src: '/guides/sections/choisir-poissons-bassin-jardin/1.webp', alt: "Carpe koï adulte, nettement plus grande qu’un poisson rouge, qui demande un grand bassin" },
        paragraphes: [
          "Populaires pour leur robustesse et leurs couleurs, elles demandent néanmoins un bassin de volume conséquent, leur taille adulte étant nettement supérieure à celle d'un poisson rouge.",
          "Un koï adulte mesure fréquemment 60 à 90 centimètres et vit plusieurs décennies. Comptez environ 1 000 litres par adulte et une profondeur d'au moins 1,2 mètre, avec une filtration puissante. Les koï déracinent les plantes et remuent le fond, ce qui complique la végétalisation du bassin.",
        ],
      },
      {
        titre: "Le poisson rouge, une valeur sûre",
        image: { src: '/guides/sections/choisir-poissons-bassin-jardin/2.webp', alt: "Poisson rouge rustique, tolérant aux variations de température, pour des bassins plus modestes" },
        paragraphes: [
          "Rustique et tolérant à de larges variations de température, il convient à des bassins de taille plus modeste que les koï.",
          "Le poisson rouge commun, le comète et le shubunkin passent l'hiver dehors sans difficulté et s'adaptent à un bassin de 1 000 litres ou plus. Les variétés à voiles ou à yeux globuleux sont plus fragiles et se gardent plutôt en aquarium. Comptez environ un adulte pour 200 à 300 litres.",
        ],
      },
      {
        titre: "Tenir compte du climat local",
        image: { src: '/guides/sections/choisir-poissons-bassin-jardin/3.webp', alt: "Bassin profond permettant d’éviter un gel complet dans les régions aux hivers rigoureux" },
        paragraphes: [
          "Dans les régions aux hivers rigoureux, la profondeur du bassin doit permettre d'éviter un gel complet, sous peine de mettre en danger les poissons qui y hivernent.",
          "En région méditerranéenne, l'enjeu est inverse : en été, l'eau d'un bassin peu profond peut dépasser 28 °C, ce qui réduit l'oxygène dissous et fatigue les poissons. Ombrage, plantes flottantes et aération limitent cet effet. Les poissons tropicaux ne passent pas l'hiver dehors et sont à éviter.",
        ],
      },
      {
        titre: "Éviter la surpopulation",
        image: { src: '/guides/sections/choisir-poissons-bassin-jardin/4.webp', alt: "Bassin surpeuplé comparé à un bassin avec un nombre de poissons adapté à son volume" },
        paragraphes: [
          "Comme en aquarium, un bassin surpeuplé dégrade rapidement la qualité de l'eau. Mieux vaut prévoir un nombre de poissons cohérent avec le volume réel du bassin.",
          "Les poissons grandissent et se reproduisent : un bassin qui semble vide au départ se remplit vite. Partez sur un petit nombre de poissons et laissez-les grossir. Une population stable est plus facile à entretenir qu'un bassin surchargé qu'il faut ensuite réguler.",
        ],
      },
      {
        titre: "D'autres poissons de bassin",
        paragraphes: [
          "Au-delà des koï et des poissons rouges, d'autres espèces rustiques peuvent peupler un bassin :",
        ],
        liste: [
          "L'orfe (ide mélanote) : poisson de banc vif et élégant, mais qui demande de l'espace et de la place pour nager.",
          "La tanche dorée : discrète, elle fouille le fond et reste souvent cachée.",
          "L'épinoche ou les petits poissons indigènes : à réserver à des mares naturelles, non à un bassin d'ornement.",
          "Le poisson-chat nain ou les petits cyprinidés rustiques : à vérifier selon la région et la réglementation locale.",
        ],
      },
      {
        titre: "Bien introduire ses poissons",
        paragraphes: [
          "Attendez que le bassin soit stabilisé, de préférence au printemps ou au début de l'été, quand l'eau est entre 12 et 20 °C. Acclimatez les poissons en laissant flotter leur sac une vingtaine de minutes, puis en ajoutant progressivement de l'eau du bassin. Évitez de nourrir trop abondamment les premiers jours, et ne relâchez jamais dans le milieu naturel un poisson de bassin dont vous ne voulez plus : donnez-le plutôt à un autre passionné.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/hivernage-poissons-bassin', label: 'Préparer l’hivernage de son bassin' },
      { href: '/guides/demarrer-bassin-jardin', label: 'Démarrer un bassin de jardin' },
      { href: '/guides/predateurs-bassin-proteger-poissons', label: 'Protéger les poissons des prédateurs' },
    ],
  },
  {
    slug: 'plantes-bassin-oxygenantes-epuratrices',
    titre: 'Les plantes de bassin : oxygénantes, épuratrices, décoratives',
    eyebrow: 'Bassin',
    description:
      "Le rôle des différentes catégories de plantes de bassin, et comment les combiner pour un bassin équilibré et une eau plus claire.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Les plantes sont les meilleures alliées d'un bassin de jardin. Elles embellissent l'ensemble, mais surtout elles filtrent l'eau, la protègent des algues et abritent la faune. Un bassin bien planté demande moins de technique et d'entretien qu'un bassin presque nu. Voici les trois grandes familles et comment les associer.",
        ],
      },
      {
        titre: "Les plantes oxygénantes",
        image: { src: '/guides/sections/plantes-bassin-oxygenantes-epuratrices/1.webp', alt: "Plantes immergées qui oxygènent l’eau et concurrencent les algues pour les nutriments" },
        paragraphes: [
          "Immergées, elles participent aux échanges gazeux et concurrencent les algues pour les nutriments disponibles, un rôle proche de celui des plantes d'aquarium.",
          "Le cératophylle, les élodées, le myriophylle ou certains potamots poussent entièrement sous l'eau. Elles offrent aussi des cachettes aux alevins. Attention à ne pas introduire d'espèces invasives : certaines plantes aquatiques comme la jussie, le myriophylle du Brésil ou la jacinthe d'eau sont interdites à la vente et ne doivent jamais être jetées dans la nature.",
        ],
      },
      {
        titre: "Les plantes épuratrices",
        image: { src: '/guides/sections/plantes-bassin-oxygenantes-epuratrices/2.webp', alt: "Plantes de berge qui absorbent les nutriments en excès et limitent les algues" },
        paragraphes: [
          "Souvent installées en berge ou en zone peu profonde, elles absorbent une partie des nutriments en excès, limitant d'autant la prolifération d'algues.",
          "L'iris des marais, la menthe aquatique, le jonc, la pontédérie, le trèfle d'eau ou le roseau plantés dans un panier ou une zone de lagunage filtrent l'eau par leurs racines. Ils doivent être taillés à l'automne pour exporter les nutriments qu'ils ont absorbés. Choisissez des espèces peu envahissantes, car certaines, comme la massette commune, colonisent rapidement le bassin.",
        ],
      },
      {
        titre: "Les plantes décoratives",
        image: { src: '/guides/sections/plantes-bassin-oxygenantes-epuratrices/3.webp', alt: "Nénuphars et plantes à fleurs qui décorent et font de l’ombre" },
        paragraphes: [
          "Nénuphars et autres plantes à fleurs apportent surtout un intérêt visuel, tout en offrant de l'ombrage qui limite aussi la lumière disponible pour les algues.",
          "Les nénuphars se choisissent selon la profondeur du bassin : des variétés naines pour 30 à 40 centimètres, de plus grandes pour 80 centimètres ou davantage. Ils s'installent dans des paniers remplis de terre argileuse lourde, sans terreau, recouverte de gravier pour éviter que les poissons ne remuent la terre.",
        ],
      },
      {
        titre: "Trouver le bon équilibre",
        image: { src: '/guides/sections/plantes-bassin-oxygenantes-epuratrices/4.webp', alt: "Plantes oxygénantes, épuratrices et décoratives associées dans un même bassin" },
        paragraphes: [
          "Un bassin qui associe ces trois catégories de plantes tend à s'équilibrer plus naturellement qu'un bassin uniquement décoratif, avec moins de recours à des solutions techniques.",
          "Visez environ la moitié à deux tiers de la surface couverte de feuilles flottantes en été, ni davantage, pour laisser passer la lumière et les échanges gazeux. Plantez dense en début de saison, et retirez régulièrement l'excédent pour qu'il ne s'étouffe pas lui-même.",
        ],
      },
      {
        titre: "Les erreurs à éviter",
        paragraphes: [
          "Plusieurs erreurs reviennent chez les débutants :",
        ],
        liste: [
          "Planter trop tard dans la saison : mieux vaut installer les plantes dès le printemps.",
          "Utiliser du terreau ordinaire, qui libère trop de nutriments et favorise les algues.",
          "Introduire des plantes invasives, interdites ou dangereuses pour l'écosystème local.",
          "Laisser des plantes mortes se décomposer dans l'eau à l'automne.",
          "Avoir des poissons qui déracinent les plantes : les koï, notamment, y sont sujets.",
        ],
      },
      {
        titre: "Entretenir sa végétation",
        paragraphes: [
          "Les plantes demandent peu mais régulièrement : taille des tiges mortes à l'automne, division des touffes tous les deux à trois ans, retrait des filaments d'algues, apport d'engrais spécifique pour nénuphars sous forme de tablettes. En hiver, les plantes rustiques passent la mauvaise saison sans difficulté ; les plantes tropicales, elles, doivent être rentrées à l'abri du gel.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/eau-verte-bassin-solutions', label: 'Lutter contre l’eau verte en bassin' },
      { href: '/guides/demarrer-bassin-jardin', label: 'Démarrer un bassin de jardin' },
      { href: '/guides/pompe-filtration-bassin-bien-choisir', label: 'Pompe et filtration de bassin' },
    ],
  },
  {
    slug: 'pompe-filtration-bassin-bien-choisir',
    titre: 'Bien choisir sa pompe et sa filtration de bassin',
    eyebrow: 'Bassin',
    description:
      "Débit, filtration mécanique et biologique : comment dimensionner la pompe et le filtre d'un bassin de jardin.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "La pompe et le filtre sont le cœur technique d'un bassin avec poissons. Ils font circuler l'eau, retiennent les débris et abritent les bactéries qui traitent les déchets. Un équipement mal dimensionné se paie vite : eau verte, poissons fatigués, entretien incessant. Voici comment faire les bons choix.",
        ],
      },
      {
        titre: "Dimensionner le débit de la pompe",
        image: { src: '/guides/sections/pompe-filtration-bassin-bien-choisir/1.webp', alt: "Pompe qui fait circuler tout le volume du bassin en une à deux heures" },
        paragraphes: [
          "Une règle courante consiste à faire circuler l'intégralité du volume du bassin en une à deux heures, un repère à ajuster selon la charge en poissons et plantes.",
          "Pour un bassin de 5 000 litres, cela correspond à une pompe d'un débit de 2 500 à 5 000 litres par heure. Attention : le débit annoncé par le fabricant est mesuré sans résistance. Dès que l'eau doit monter de plusieurs mètres (hauteur manométrique) ou traverser un filtre et de longs tuyaux, il diminue nettement. Consultez la courbe de débit de la pompe plutôt que le chiffre maximum.",
        ],
      },
      {
        titre: "La filtration mécanique",
        image: { src: '/guides/sections/pompe-filtration-bassin-bien-choisir/2.webp', alt: "Filtre mécanique qui retient les feuilles et particules avant leur décomposition" },
        paragraphes: [
          "Elle retient les débris (feuilles, particules) avant qu'ils ne se décomposent dans le bassin, un rôle particulièrement utile à l'automne.",
          "Un skimmer de surface retire feuilles et poussières avant qu'elles ne coulent, un pré-filtre protège la pompe, et des mousses ou brosses retiennent les particules plus fines. Ces éléments doivent être nettoyés régulièrement : un filtre mécanique colmaté réduit le débit et finit par relarguer ce qu'il avait retenu.",
        ],
      },
      {
        titre: "La filtration biologique",
        image: { src: '/guides/sections/pompe-filtration-bassin-bien-choisir/3.webp', alt: "Filtre biologique hébergeant des bactéries qui transforment les déchets azotés" },
        paragraphes: [
          "Comme en aquarium, elle héberge les bactéries qui traitent les déchets azotés produits par les poissons, un rôle essentiel dans un bassin peuplé.",
          "On y place des supports à grande surface (billes, brosses, matériaux poreux) sur lesquels les bactéries se fixent. Le filtre doit être dimensionné pour la charge en poissons à terme, pas pour la situation de départ. Évitez de le rincer à l'eau du robinet, et nettoyez-le à l'eau du bassin lorsqu'il est trop encrassé.",
        ],
      },
      {
        titre: "Le cas des bassins à koï",
        image: { src: '/guides/sections/pompe-filtration-bassin-bien-choisir/4.webp', alt: "Filtre surdimensionné pour un bassin à koï face à un filtre de bassin classique" },
        paragraphes: [
          "Avec des poissons de grande taille et une production de déchets plus importante, un filtre surdimensionné par rapport à un bassin classique est généralement recommandé.",
          "Comptez environ 1 000 litres par koï adulte et une profondeur d'au moins 1,2 mètre. Un bassin à koï demande un système plus ambitieux : un drain de fond pour évacuer les déchets, un filtre à fort volume, une aération soutenue et un ultraviolet. La facture électrique est aussi à prendre en compte.",
        ],
      },
      {
        titre: "Les équipements complémentaires",
        paragraphes: [
          "Selon le bassin, plusieurs éléments complètent l'installation :",
        ],
        liste: [
          "Clarificateur UV : élimine l'eau verte en agglomérant les algues en suspension.",
          "Skimmer : retire feuilles et débris flottants en surface.",
          "Cascade ou fontaine : oxygène l'eau et améliore l'esthétique.",
          "Aérateur : utile en été et en hiver pour maintenir l'oxygène.",
          "Prise étanche avec disjoncteur différentiel : indispensable pour la sécurité.",
        ],
      },
      {
        titre: "Économiser l'énergie",
        paragraphes: [
          "Une pompe fonctionne en général 24 heures sur 24, et sa consommation compte. Les modèles à économie d'énergie coûtent plus cher à l'achat mais réduisent nettement la facture annuelle. Des tuyaux de grand diamètre, courts et peu coudés, limitent aussi les pertes de charge. Enfin, la filtration ne doit jamais être arrêtée trop longtemps en saison chaude : l'eau stagnante se dégrade vite.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-poissons-bassin-jardin', label: 'Quels poissons choisir pour son bassin' },
      { href: '/categorie/materiel', label: 'Voir le matériel en vente' },
      { href: '/guides/demarrer-bassin-jardin', label: 'Bien démarrer un bassin de jardin' },
      { href: '/guides/eau-verte-bassin-solutions', label: 'Eau verte dans un bassin' },
    ],
  },
  {
    slug: 'predateurs-bassin-proteger-poissons',
    titre: 'Protéger les poissons de bassin des prédateurs',
    eyebrow: 'Bassin',
    description:
      "Hérons, chats, prédateurs terrestres : comment protéger les poissons d'un bassin de jardin des menaces les plus courantes.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Un bassin de jardin est un garde-manger pour de nombreux animaux. Un héron peut manger des poissons de plusieurs années en quelques matinées, et un chat curieux ou un rapace en font parfois autant. Prévenir vaut mieux que soigner : voici les protections qui fonctionnent réellement.",
        ],
      },
      {
        titre: "Le héron, un prédateur redoutable",
        image: { src: '/guides/sections/predateurs-bassin-proteger-poissons/1.webp', alt: "Héron qui guette les poissons dans les zones peu profondes d’un bassin" },
        paragraphes: [
          "Capable de vider un bassin en quelques visites, il est attiré par les zones peu profondes qui exposent les poissons. Un filet tendu ou des zones de refuge profondes limitent ce risque.",
          "Le héron chasse en marchant dans l'eau ou au bord. Il ne s'aventure généralement pas dans une eau de plus de 40 à 50 centimètres. Des berges abruptes, sans zone peu profonde, le découragent. Le héron cendré est une espèce protégée : on ne peut que l'éloigner, jamais le blesser.",
        ],
      },
      {
        titre: "Les chats et autres prédateurs terrestres",
        image: { src: '/guides/sections/predateurs-bassin-proteger-poissons/2.webp', alt: "Chat qui guette depuis la rive d’un bassin, rebord surélevé pour réduire les tentatives" },
        paragraphes: [
          "Un rebord de bassin surélevé, ou une zone de berge peu accessible, réduit les tentatives de pêche depuis la rive.",
          "Les chats, mais aussi les fouines, les rats ou les corneilles, profitent des berges douces. Une bordure plus haute, des plantes épineuses ou des pierres disposées sur le pourtour rendent l'accès plus difficile. Un fil tendu à 20 centimètres du bord peut aussi suffire à dissuader.",
        ],
      },
      {
        titre: "Les cachettes dans le bassin",
        image: { src: '/guides/sections/predateurs-bassin-proteger-poissons/3.webp', alt: "Plantes immergées denses, tuyaux et rochers qui servent de cachettes aux poissons" },
        paragraphes: [
          "Des plantes immergées denses ou des structures type tuyaux et rochers offrent aux poissons un abri immédiat en cas de menace repérée.",
          "Des tuyaux en PVC de gros diamètre posés au fond, des pierres empilées en voûte ou des plantes denses permettent aux poissons de s'y glisser. Cela vaut surtout pour les poissons clairs, blancs ou oranges, très visibles depuis le haut, et pour les plus petits.",
        ],
      },
      {
        titre: "Un filet, la solution la plus fiable",
        image: { src: '/guides/sections/predateurs-bassin-proteger-poissons/4.webp', alt: "Filet correctement tendu au-dessus du bassin qui protège les poissons du héron" },
        paragraphes: [
          "Un filet correctement tendu au-dessus du bassin reste souvent la protection la plus efficace contre l'ensemble de ces prédateurs, en particulier le héron.",
          "Choisissez un filet à mailles de 3 à 5 centimètres, tendu à une cinquantaine de centimètres au-dessus de l'eau pour qu'aucun animal ne puisse le toucher. Il sert aussi à retenir les feuilles mortes à l'automne. Vérifiez régulièrement qu'aucun oiseau ou petit animal ne s'est pris dedans.",
        ],
      },
      {
        titre: "Les solutions de dissuasion",
        paragraphes: [
          "Plusieurs dispositifs complètent les protections de base, avec une efficacité variable :",
        ],
        liste: [
          "Leurres de héron : peu efficaces à long terme, car les hérons s'y habituent vite.",
          "Détecteurs de mouvement avec jet d'eau : efficaces mais à surveiller selon la saison.",
          "Fil électrique ou fil tendu autour du bassin, discret et efficace contre les mammifères.",
          "Présence humaine régulière, ou chien dans le jardin, qui fait fuir les intrus.",
          "Un bassin couvert en grande partie de plantes flottantes, qui cachent les poissons.",
        ],
      },
      {
        titre: "Que faire après une attaque",
        paragraphes: [
          "Si des poissons ont été attaqués, isolez rapidement ceux qui sont blessés, désinfectez les plaies avec un produit adapté ou consultez un spécialiste, et vérifiez l'état de l'eau. Un poisson survivant mais stressé est vulnérable aux maladies. Profitez-en pour renforcer les protections avant le retour du prédateur, qui reviendra presque toujours.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-poissons-bassin-jardin', label: 'Quels poissons choisir pour son bassin' },
      { href: '/guides/hivernage-poissons-bassin', label: 'Préparer l’hivernage de son bassin' },
      { href: '/guides/plantes-bassin-oxygenantes-epuratrices', label: 'Les plantes de bassin' },
    ],
  },
  {
    slug: 'vacances-aquarium-que-faire',
    titre: 'Partir en vacances : comment préparer son aquarium',
    eyebrow: 'Entretien',
    description:
      "Nourrissage automatique, entretien avant le départ, personne de confiance : comment préparer son aquarium pour une absence de plusieurs jours.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Partir quelques jours ne doit pas empêcher de profiter de ses vacances : un aquarium bien préparé se débrouille très bien seul. La clé est d'anticiper, de simplifier et de ne rien changer au dernier moment. Voici une méthode éprouvée pour partir l'esprit tranquille.",
        ],
      },
      {
        titre: "Un nourrissage automatique fiable",
        image: { src: '/guides/sections/vacances-aquarium-que-faire/1.webp', alt: "Distributeur automatique programmé comparé à un bloc de nourriture à dissolution lente" },
        paragraphes: [
          "Un distributeur automatique programmé reste plus sûr qu'un bloc de nourriture à dissolution lente, qui peut dégrader la qualité de l'eau s'il se dissout trop vite.",
          "Testez le distributeur au moins une semaine avant le départ, en vérifiant la quantité distribuée à chaque cycle : certains modèles ont tendance à déverser trop de nourriture, ou à se bloquer avec l'humidité. Remplissez-le avec une nourriture bien sèche, et placez-le à l'écart des projections d'eau.",
        ],
      },
      {
        titre: "Un entretien complet avant le départ",
        image: { src: '/guides/sections/vacances-aquarium-que-faire/2.webp', alt: "Changement d’eau et nettoyage léger avant le départ pour des paramètres stables" },
        paragraphes: [
          "Un changement d'eau et un nettoyage léger juste avant de partir permettent de partir sur des paramètres stables pour toute la durée de l'absence.",
          "Faites ce changement d'eau un à deux jours avant de partir plutôt que le matin même, pour laisser le temps de repérer un éventuel problème. Contrôlez le matériel (filtre, chauffage, éclairage) une à deux semaines avant le départ, pour avoir le temps de remplacer une pièce défaillante. Évitez de nettoyer le filtre juste avant de partir.",
        ],
      },
      {
        titre: "Éviter de suralimenter avant de partir",
        image: { src: '/guides/sections/vacances-aquarium-que-faire/3.webp', alt: "Double ration à éviter alors que les poissons adultes supportent plusieurs jours sans nourriture" },
        paragraphes: [
          "Donner une double ration pour « compenser » l'absence est une fausse bonne idée qui dégrade la qualité de l'eau. Les poissons adultes supportent en réalité bien plusieurs jours sans nourriture.",
          "Pour une absence de deux à trois jours, vous pouvez ne rien donner. Jusqu'à une semaine, la plupart des poissons adultes en bonne santé s'en sortent sans difficulté, surtout si un bac planté leur offre un peu de nourriture naturelle. Les alevins, les jeunes poissons et les espèces à métabolisme rapide demandent en revanche des repas réguliers.",
        ],
      },
      {
        titre: "Prévoir un contact en cas d'imprévu",
        image: { src: '/guides/sections/vacances-aquarium-que-faire/4.webp', alt: "Personne de confiance qui vérifie l’aquarium et repère une panne de matériel pendant l’absence" },
        paragraphes: [
          "Demander à une personne de confiance de passer vérifier l'aquarium en cas d'absence prolongée reste une sécurité utile, notamment pour repérer une panne de matériel.",
          "Laissez une fiche simple avec la quantité de nourriture, les numéros à joindre, et les gestes à éviter (ne pas nourrir en excès, ne pas changer toute l'eau). Mieux vaut une personne qui nourrit peu et regarde le bac qu'une personne trop zélée.",
        ],
      },
      {
        titre: "Penser à la température et à l'éclairage",
        paragraphes: [
          "En été, une pièce fermée peut dépasser 30 °C pendant plusieurs jours. Placez le bac à l'ombre, laissez les volets mi-clos, et vérifiez que le chauffage est bien réglé. Programmez la lumière avec une minuterie sur sa durée habituelle, pas davantage : un bac éclairé en continu développe des algues. Si la pièce risque de chauffer, une pompe à air ou un ventilateur aide à limiter la montée de température.",
        ],
      },
      {
        titre: "La checklist avant le départ",
        paragraphes: [
          "Pour ne rien oublier, passez en revue ces points :",
        ],
        liste: [
          "Changement d'eau partiel 1 à 2 jours avant le départ.",
          "Filtre, chauffage, éclairage et pompe à air contrôlés.",
          "Minuterie d'éclairage réglée sur la durée habituelle.",
          "Distributeur testé, ou absence sans nourriture si elle est inférieure à une semaine.",
          "Niveau d'eau vérifié, couvercle bien en place.",
          "Contact de confiance prévenu, avec instructions simples.",
          "Aucun nouveau produit ni nouvel équipement introduit juste avant le départ.",
        ],
      },
      {
        titre: "Pour une absence plus longue",
        paragraphes: [
          "Au-delà de deux semaines, mieux vaut prévoir une vraie visite : changement d'eau partiel, contrôle du matériel, nourrissage mesuré. Une absence de plusieurs semaines sans aucun suivi fait courir de vrais risques, notamment en cas de panne de chauffage ou de filtre. Si besoin, confiez le bac à un aquariophile de confiance ou à une animalerie qui propose la garde.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/bien-nourrir-poissons-aquarium', label: 'Bien nourrir ses poissons' },
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: 'Bien faire son changement d’eau' },
      { href: '/guides/minuterie-programmateur-aquarium-utilite', label: 'Minuterie et programmateur' },
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
        paragraphes: [
          "Un aquarium planté n'est pas un décor figé : les plantes poussent, se développent et finissent par envahir le bac si on les laisse faire. Une taille régulière entretient la lumière, l'esthétique et l'équilibre de l'eau. Voici comment procéder sans abîmer les plantes.",
        ],
      },
      {
        titre: "Pourquoi tailler régulièrement",
        image: { src: '/guides/sections/tailler-entretenir-plantes-aquarium/1.webp', alt: "Plante trop développée qui fait de l’ombre et flotte en surface sans taille régulière" },
        paragraphes: [
          "Une plante qui pousse sans être taillée finit par faire de l'ombre aux espèces voisines, ou par flotter en surface une fois trop développée.",
          "Les plantes qui s'étendent en surface bloquent la lumière pour celles du fond, qui s'étiolent et finissent par mourir. Une taille régulière relance aussi la croissance, avec des tiges plus denses et des feuilles plus fournies. C'est également un moyen de retirer les nutriments accumulés dans les tissus des plantes.",
        ],
      },
      {
        titre: "Les plantes à tiges",
        image: { src: '/guides/sections/tailler-entretenir-plantes-aquarium/2.webp', alt: "Tige coupée à la hauteur souhaitée puis replantée ailleurs dans le bac" },
        paragraphes: [
          "Elles se taillent en coupant la tige à la hauteur souhaitée. La partie coupée peut souvent être replantée pour repartir ailleurs dans le bac.",
          "Utilisez des ciseaux bien affûtés, de préférence longs et courbes, et coupez juste au-dessus d'un nœud. Pour replanter la bouture, retirez les feuilles du bas et enterrez la tige sur 2 à 3 centimètres. Plusieurs tiges plantées ensemble donnent un massif plus dense.",
        ],
      },
      {
        titre: "Les plantes à rosette et de premier plan",
        image: { src: '/guides/sections/tailler-entretenir-plantes-aquarium/3.webp', alt: "Feuilles abîmées ou jaunies retirées au fur et à mesure sur les plantes à rosette" },
        paragraphes: [
          "Elles demandent surtout de retirer les feuilles abîmées ou jaunies au fur et à mesure, plutôt qu'une taille franche comme les plantes à tiges.",
          "Coupez les feuilles les plus anciennes à leur base, sans arracher la plante. Pour les Vallisneria, supprimez les stolons en trop ; pour les Anubias, taillez le rhizome si besoin sans l'enterrer. Les mousses se taillent au ciseau et se ramassent à l'épuisette pour éviter les fragments flottants.",
        ],
      },
      {
        titre: "Éviter de tout tailler en une seule fois",
        image: { src: '/guides/sections/tailler-entretenir-plantes-aquarium/4.webp', alt: "Bac entièrement taillé d’un coup qui perd sa capacité à absorber les nutriments" },
        paragraphes: [
          "Une taille trop importante d'un coup peut déstabiliser temporairement l'équilibre du bac, en réduisant brutalement la capacité des plantes à absorber les nutriments.",
          "Ne dépassez pas un tiers de la masse végétale lors d'une même intervention, et alternez les zones taillées d'une semaine à l'autre. Après la taille, effectuez un changement d'eau et retirez les débris flottants avec une épuisette : les feuilles coupées qui pourrissent sont une source d'ammoniac et d'algues.",
        ],
      },
      {
        titre: "Un calendrier d'entretien simple",
        paragraphes: [
          "Un rythme régulier évite les grands chantiers :",
        ],
        liste: [
          "Chaque semaine : retirer les feuilles mortes ou jaunies, ramasser les débris flottants.",
          "Toutes les deux semaines : tailler les plantes à tiges et nettoyer les feuilles couvertes d'algues.",
          "Chaque mois : éclaircir les plantes flottantes et les mousses, diviser les touffes trop denses.",
          "Au besoin : replanter les boutures et ajuster la fertilisation.",
        ],
      },
      {
        titre: "Les signes d'une plante en difficulté",
        paragraphes: [
          "Des feuilles jaunes ou transparentes signalent un manque de nutriments (fer, azote, potassium). Des feuilles trouées indiquent souvent une carence en potassium. Des feuilles couvertes d'algues révèlent un excès de lumière ou de nutriments. Plutôt que de changer plusieurs éléments à la fois, modifiez un paramètre à la fois pour comprendre ce qui fonctionne, et notez les résultats.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/plantes-faciles-aquarium-debutant', label: 'Des plantes faciles pour débuter' },
      { href: '/guides/aquascaping-decor-naturel', label: 'Créer un décor naturel' },
      { href: '/guides/role-des-plantes-aquarium-equilibre', label: 'Le rôle des plantes dans l’équilibre du bac' },
    ],
  },
  {
    slug: 'entretien-filtre-aquarium-bonne-frequence',
    titre: "Entretien du filtre d'aquarium : quelle fréquence et comment procéder",
    eyebrow: 'Entretien',
    description:
      "À quelle fréquence nettoyer le filtre d'un aquarium, et comment le faire sans détruire les bactéries utiles qu'il héberge.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Le filtre est le cœur de l'aquarium : c'est dans ses masses filtrantes que vit la colonie de bactéries qui transforme les déchets toxiques. Un entretien trop agressif détruit cet équilibre, tandis qu'un entretien trop rare colmate le filtre et réduit son efficacité. Voici comment trouver le bon rythme.",
        ],
      },
      {
        titre: "La fréquence recommandée",
        image: { src: '/guides/sections/entretien-filtre-aquarium-bonne-frequence/1.webp', alt: "Nettoyage du filtre toutes les quatre à six semaines" },
        paragraphes: [
          "Un nettoyage toutes les 4 à 6 semaines convient généralement à la plupart des bacs, à ajuster selon l'encrassement observé et le débit du filtre.",
          "Le vrai signal n'est pas le calendrier mais le débit : quand le jet de sortie faiblit nettement, il est temps d'intervenir. Un bac très peuplé ou très nourri encrasse son filtre plus vite qu'un bac peu occupé. Les mousses de pré-filtration, qui retiennent les gros déchets, se nettoient plus souvent que les masses biologiques en profondeur.",
        ],
      },
      {
        titre: "Ne jamais tout nettoyer en même temps",
        image: { src: '/guides/sections/entretien-filtre-aquarium-bonne-frequence/2.webp', alt: "Masses filtrantes nettoyées en alternance pour préserver les bactéries épuratrices" },
        paragraphes: [
          "Nettoyer l'ensemble des masses filtrantes le même jour détruit une grande partie des bactéries épuratrices. Mieux vaut alterner les masses nettoyées d'une fois sur l'autre.",
          "Si votre filtre contient une mousse grossière, une mousse fine et un média biologique (céramique, billes), nettoyez la mousse grossière à chaque passage, la fine une fois sur deux, et ne touchez au média biologique que très rarement, en le rinçant à peine.",
        ],
      },
      {
        titre: "Toujours rincer à l'eau du bac",
        image: { src: '/guides/sections/entretien-filtre-aquarium-bonne-frequence/3.webp', alt: "Masses filtrantes rincées dans l’eau du bac et non au robinet chloré" },
        paragraphes: [
          "L'eau du robinet, chlorée, tue une partie des bactéries utiles. Rincer les masses biologiques dans de l'eau du bac déjà retirée les préserve beaucoup mieux.",
          "Prélevez un seau d'eau lors d'un changement d'eau et servez-vous-en pour rincer les mousses : pressez-les doucement jusqu'à ce que l'eau soit moins sale, sans chercher à les rendre parfaitement propres. Une mousse qui garde une teinte brunâtre est normale : c'est la preuve que les bactéries y sont installées.",
        ],
      },
      {
        titre: "Vérifier le débit après l'entretien",
        image: { src: '/guides/sections/entretien-filtre-aquarium-bonne-frequence/4.webp', alt: "Turbine et joint à contrôler quand le débit du filtre reste faible après nettoyage" },
        paragraphes: [
          "Un débit qui reste faible après le nettoyage peut signaler une pièce usée (turbine, joint) à vérifier ou à remplacer.",
          "Profitez-en pour contrôler l'axe de la turbine, qui peut être encrassé ou usé, et les joints d'étanchéité. Sur un filtre externe, nettoyez les tuyaux avec une brosse une à deux fois par an : le biofilm qui s'y accumule réduit le débit sans que l'on s'en aperçoive. Après la remise en route, purgez l'air et vérifiez l'absence de fuite.",
        ],
      },
      {
        titre: "Les masses à remplacer ou non",
        paragraphes: [
          "Les mousses ne se changent pas tant qu'elles restent en bon état : elles durent plusieurs années. On les remplace seulement quand elles s'effritent ou ne laissent plus passer l'eau, et jamais toutes en même temps. Le charbon actif, en revanche, perd son efficacité en quelques semaines et peut même relarguer ce qu'il avait absorbé : il se remplace selon les indications du fabricant, ou se retire s'il n'a pas d'utilité particulière.",
        ],
      },
      {
        titre: "Déroulé type d'un nettoyage",
        paragraphes: [
          "Pour un entretien sans risque, procédez dans cet ordre :",
        ],
        liste: [
          "Débrancher le filtre avant toute intervention, et fermer les robinets sur un filtre externe.",
          "Sortir les masses filtrantes à nettoyer dans un seau contenant de l'eau du bac.",
          "Les rincer en les pressant doucement, sans frotter ni utiliser de produit.",
          "Nettoyer la turbine et son logement avec une petite brosse.",
          "Remonter le filtre, purger l'air et le rebrancher.",
          "Contrôler le débit et l'absence de fuite quelques minutes plus tard.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/role-du-filtre-dans-aquarium', label: 'Comprendre le rôle du filtre' },
      { href: '/guides/choisir-filtration-aquarium', label: 'Bien choisir sa filtration' },
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: 'Bien faire son changement d’eau' },
    ],
  },
  {
    slug: 'aquarium-eau-trouble-causes',
    titre: "Aquarium à l'eau trouble : causes et solutions",
    eyebrow: 'Entretien',
    description:
      "Eau blanchâtre, laiteuse ou trouble en aquarium : les causes les plus fréquentes et comment retrouver une eau claire.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Une eau qui se trouble est l'un des soucis les plus courants, surtout dans les premières semaines. Bonne nouvelle : dans la majorité des cas, ce n'est pas grave et l'eau redevient claire seule. L'important est de reconnaître la couleur du trouble, car elle indique la cause et donc la bonne réaction.",
        ],
      },
      {
        titre: "Une eau trouble et blanchâtre",
        image: { src: '/guides/sections/aquarium-eau-trouble-causes/1.webp', alt: "Aquarium à l’eau blanchâtre causée par une prolifération bactérienne" },
        paragraphes: [
          "Souvent liée à une prolifération bactérienne suite à un excès de nourriture ou un bac récemment cyclé, elle se résorbe généralement d'elle-même en quelques jours si la cause est corrigée.",
          "Ce voile laiteux est typique d'un aquarium neuf : en l'absence de colonie bactérienne installée, des bactéries libres se multiplient dans l'eau pour consommer les déchets, puis disparaissent quand le filtre prend le relais. Dans ce cas, ne videz pas le bac et ne changez pas le matériel filtrant. Un changement d'eau trop massif retarderait simplement la stabilisation.",
        ],
      },
      {
        titre: "Une eau trouble après un nettoyage",
        image: { src: '/guides/sections/aquarium-eau-trouble-causes/2.webp', alt: "Fines particules remises en suspension lors du siphonnage du substrat, sans gravité" },
        paragraphes: [
          "Remuer le substrat lors d'un entretien peut temporairement troubler l'eau en remettant en suspension de fines particules, sans gravité particulière.",
          "Le même phénomène survient quand on installe un sable ou un gravier mal rincé : la poussière de roche reste en suspension pendant plusieurs heures. Rincer abondamment le substrat avant de le mettre dans le bac évite ce désagrément. Si le trouble persiste au-delà de deux ou trois jours, la cause est ailleurs.",
        ],
      },
      {
        titre: "Vérifier les paramètres en priorité",
        image: { src: '/guides/sections/aquarium-eau-trouble-causes/3.webp', alt: "Test d’ammoniac et de nitrites en cas d’eau trouble persistante" },
        paragraphes: [
          "Une eau trouble qui persiste doit d'abord faire l'objet d'un test d'ammoniac et de nitrites, qui peut révéler un déséquilibre du cycle de l'azote.",
          "Si l'un des deux est supérieur à zéro, les poissons sont en danger même si l'eau paraît limpide à d'autres moments. Dans ce cas, un changement d'eau de 30 à 50 % s'impose, accompagné d'une réduction des repas. Un poisson mort resté dans un recoin ou sous un décor est aussi une cause classique : en se décomposant, il provoque à la fois du trouble et un pic d'ammoniac.",
        ],
      },
      {
        titre: "Les bons réflexes",
        image: { src: '/guides/sections/aquarium-eau-trouble-causes/4.webp', alt: "Réduire la nourriture, faire un changement d’eau partiel et laisser l’eau se stabiliser" },
        paragraphes: [
          "Réduire temporairement la nourriture, effectuer un changement d'eau partiel et éviter de suralimenter en attendant que l'eau se stabilise sont les mesures les plus efficaces.",
          "Évitez d'ajouter des produits clarifiants dès les premiers signes : ils agglomèrent les particules mais ne règlent pas la cause, et le trouble revient dès que leur effet s'estompe. Patience et observation donnent de meilleurs résultats que les traitements.",
        ],
      },
      {
        titre: "Une eau verte",
        paragraphes: [
          "Une eau qui prend une teinte verte uniforme, comme une soupe de pois, est colonisée par des algues microscopiques en suspension. La cause habituelle est un excès de lumière, notamment le soleil direct sur la vitre, combiné à un excès de nutriments.",
          "Placez le bac à l'abri de la lumière directe, réduisez la durée d'éclairage à 6 ou 8 heures par jour et espacez moins les changements d'eau. Une période d'obscurité totale de quelques jours, bac recouvert, fait souvent disparaître le phénomène, mais veillez à ce que les plantes puissent le supporter. Un clarificateur UV est la solution la plus fiable quand le problème revient régulièrement.",
        ],
      },
      {
        titre: "Une eau jaunâtre ou brune",
        paragraphes: [
          "Une teinte thé ou ambrée vient presque toujours des tanins relâchés par un bois flotté, des feuilles mortes ou de la tourbe. Elle est sans danger et même recherchée pour certains poissons d'Amazonie ou d'Asie du Sud-Est, qui apprécient ces eaux dites « noires ».",
          "Si cette couleur vous dérange, trempez longuement le bois avant de l'installer, faites des changements d'eau plus fréquents ou ajoutez un sachet de charbon actif dans le filtre pendant quelques jours.",
        ],
      },
      {
        titre: "Un filtre colmaté ou sous-dimensionné",
        paragraphes: [
          "Un filtre encrassé brasse mal l'eau et laisse passer les particules fines. À l'inverse, un filtre trop petit pour le volume du bac ne suffit pas à traiter les déchets. Rincez les mousses dans un seau d'eau prélevée lors du changement d'eau, jamais sous le robinet, pour préserver les bactéries utiles, et vérifiez que le débit correspond bien à la taille de votre aquarium.",
        ],
      },
      {
        titre: "Aide-mémoire",
        paragraphes: [
          "Pour résumer les cas les plus fréquents :",
        ],
        liste: [
          "Eau blanche dans un bac neuf : attendre, nourrir peu, ne rien vider.",
          "Eau trouble juste après un entretien : patienter quelques heures à quelques jours.",
          "Eau verte : réduire la lumière et les nutriments, envisager un clarificateur UV.",
          "Eau jaunâtre : tanins sans danger, charbon actif ou changements d'eau si besoin.",
          "Eau trouble persistante : tester l'ammoniac et les nitrites, chercher un poisson mort ou un filtre défaillant.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/cycle-de-lazote-aquarium', label: 'Comprendre le cycle de l’azote' },
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: 'Bien faire son changement d’eau' },
      { href: '/guides/lutter-contre-les-algues-aquarium', label: 'Lutter contre les algues' },
      { href: '/guides/parametres-eau-ph-gh-kh', label: 'pH, GH, KH : les paramètres de l’eau' },
    ],
  },
  {
    slug: 'bois-flotte-aquarium-preparation',
    titre: 'Bois flotté en aquarium : comment le préparer et l’utiliser',
    eyebrow: 'Décoration',
    description:
      "Pourquoi et comment préparer un bois flotté avant de l'installer en aquarium, pour éviter qu'il ne flotte ou ne colore l'eau trop longtemps.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Le bois flotté est l'un des décors les plus appréciés en aquarium : il structure la composition, offre des cachettes aux poissons et sert de support à de nombreuses plantes. Encore faut-il le choisir et le préparer correctement, sous peine de voir l'eau se troubler ou le bois remonter à la surface.",
        ],
      },
      {
        titre: "Pourquoi le bois flotte au départ",
        image: { src: '/guides/sections/bois-flotte-aquarium-preparation/1.webp', alt: "Bois flotté neuf qui flotte à la surface à cause de l’air contenu dans ses fibres" },
        paragraphes: [
          "Un bois flotté neuf contient de l'air dans ses fibres, ce qui le fait souvent remonter à la surface avant d'être suffisamment gorgé d'eau pour couler naturellement.",
          "Selon l'essence et la densité du bois, ce phénomène dure de quelques jours à plusieurs semaines. Les bois de tourbière (« bog wood ») coulent plus rapidement que les racines de mangrove, plus légères. En attendant, on peut caler le bois avec une roche ou le fixer à une pierre avec un fil de nylon.",
        ],
      },
      {
        titre: "Le faire tremper avant l'installation",
        image: { src: '/guides/sections/bois-flotte-aquarium-preparation/2.webp', alt: "Bois flotté qui trempe plusieurs jours dans un seau dont l’eau est renouvelée régulièrement" },
        paragraphes: [
          "Un trempage de plusieurs jours à plusieurs semaines dans un seau d'eau, renouvelée régulièrement, accélère ce processus et limite la coloration de l'eau du bac une fois installé.",
          "Pour gagner du temps, on peut aussi faire bouillir les pièces de taille raisonnable pendant une à deux heures : cela chasse l'air, libère une partie des tanins et élimine certains microbes. Brossez le bois à l'eau claire avant, sans produit ménager.",
        ],
      },
      {
        titre: "La coloration de l'eau, sans danger",
        image: { src: '/guides/sections/bois-flotte-aquarium-preparation/3.webp', alt: "Eau teintée en jaune-brun par les tanins du bois, sans danger pour les poissons" },
        paragraphes: [
          "Les tanins libérés par certains bois teintent l'eau en jaune-brun. C'est sans danger pour les poissons, et certaines espèces (bacs biotope Amazonie) en profitent même volontiers.",
          "Les tanins abaissent légèrement le pH et la dureté, un effet bénéfique pour les espèces de rivières acides. Si la couleur vous gêne, effectuez des changements d'eau supplémentaires ou utilisez un peu de charbon actif dans le filtre. Un voile blanc gélatineux peut aussi apparaître sur le bois neuf : c'est un biofilm inoffensif, que les crevettes et les Ancistrus mangent volontiers, et qui disparaît seul en quelques semaines.",
        ],
      },
      {
        titre: "Choisir un bois adapté à l'aquariophilie",
        image: { src: '/guides/sections/bois-flotte-aquarium-preparation/4.webp', alt: "Bois vendu pour l’aquariophilie contre bois trouvé en extérieur" },
        paragraphes: [
          "Tous les bois trouvés en extérieur ne conviennent pas. Mieux vaut choisir un bois spécifiquement vendu pour l'aquariophilie, déjà préparé pour cet usage.",
          "Les bois récoltés en forêt ou au bord de l'eau peuvent contenir de la résine (conifères), des pesticides ou des polluants, et pourrissent dans l'eau. Seules certaines essences durables conviennent. Si vous ramassez malgré tout un bois, il doit être entièrement sec, sans écorce, sans moisissure, et bouilli longuement.",
        ],
      },
      {
        titre: "Les essences les plus courantes",
        paragraphes: [
          "Les boutiques proposent plusieurs types de bois, aux aspects très différents :",
        ],
        liste: [
          "Bois de tourbière (Moorwood, Mopani) : dense, sombre, il coule vite et donne un décor imposant.",
          "Racine de mangrove : légère et ramifiée, elle convient aux compositions aérées, mais flotte longtemps.",
          "Spiderwood : branches fines et courbées, très utilisé en aquascaping.",
          "Bois de Redmoor ou de Malaisie : teinte rougeâtre, structure irrégulière.",
        ],
      },
      {
        titre: "Planter sur le bois",
        paragraphes: [
          "Le bois est un support idéal pour les plantes qui s'accrochent par leurs racines, comme les Anubias, les fougères de Java et les mousses. Fixez-les avec un fil de nylon ou une colle gel sans solvant spéciale aquarium, sans les enterrer : leur rhizome pourrit s'il est recouvert. En quelques semaines, les racines s'accrochent d'elles-mêmes et le fil peut être retiré.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/aquascaping-decor-naturel', label: 'Créer un décor naturel' },
      { href: '/guides/aquarium-biotope-reproduire-milieu-naturel', label: 'Créer un aquarium biotope' },
      { href: '/guides/plantes-faciles-aquarium-debutant', label: 'Des plantes faciles pour débuter' },
    ],
  },
  {
    slug: 'roches-pierres-aquarium-lesquelles-choisir',
    titre: 'Quelles roches et pierres choisir pour son décor d’aquarium ?',
    eyebrow: 'Décoration',
    description:
      "Roches inertes ou influençant les paramètres de l'eau : comment choisir les bonnes pierres selon le type de bac et les espèces hébergées.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Les roches donnent du relief à un aquarium, créent des cachettes et structurent le paysage. Mais toutes ne sont pas neutres : certaines modifient durablement la composition de l'eau. Mieux vaut savoir ce que l'on installe avant de l'immerger.",
        ],
      },
      {
        titre: "Les roches inertes",
        image: { src: '/guides/sections/roches-pierres-aquarium-lesquelles-choisir/1.webp', alt: "Roches ornementales inertes qui n’influencent pas les paramètres de l’eau" },
        paragraphes: [
          "La plupart des roches ornementales vendues pour l'aquariophilie n'influencent pas les paramètres de l'eau, ce qui les rend adaptées à la majorité des bacs communautaires.",
          "Le quartz, le granite, le schiste, la pierre de lave et la pierre dragon (Ohko) sont des choix sûrs en général. La pierre de lave, très poreuse, sert aussi de support aux bactéries. Choisissez-les sans arêtes trop tranchantes si vos poissons ont des nageoires fragiles ou des barbillons, comme les Corydoras.",
        ],
      },
      {
        titre: "Les roches qui modifient le pH ou la dureté",
        image: { src: '/guides/sections/roches-pierres-aquarium-lesquelles-choisir/2.webp', alt: "Pierres calcaires qui augmentent pH et dureté, utiles pour des Cichlidés africains mais à éviter en eau acide" },
        paragraphes: [
          "Certaines pierres calcaires relâchent des minéraux dans l'eau, ce qui augmente le pH et la dureté. Utile pour un bac de Cichlidés africains, à éviter pour un bac de poissons d'eau douce et acide.",
          "Le calcaire, le tuf, le marbre, certaines roches comme la Seiryu et les coquillages ou coraux concassés font monter le GH et le KH. Dans un bac amazonien ou de crevettes Caridina, elles déstabilisent l'équilibre. Dans un bac de lac Malawi, elles reproduisent au contraire les conditions naturelles.",
        ],
      },
      {
        titre: "Vérifier avant d’introduire une roche non identifiée",
        image: { src: '/guides/sections/roches-pierres-aquarium-lesquelles-choisir/3.webp', alt: "Test au vinaigre sur une roche, l’effervescence révélant la présence de calcaire" },
        paragraphes: [
          "Un test au vinaigre (effervescence en présence de calcaire) permet de repérer une roche susceptible d'influencer les paramètres avant de l'installer.",
          "Déposez quelques gouttes de vinaigre blanc sur la roche : si elle mousse et grésille, elle contient du calcaire. Pour confirmer, laissez-la tremper une semaine dans un seau d'eau et mesurez le GH et le KH de cette eau avant et après. Évitez en tout cas les roches récoltées près de routes, de sites industriels ou de terrains traités, qui peuvent contenir des métaux ou des polluants.",
        ],
      },
      {
        titre: "La stabilité du montage",
        image: { src: '/guides/sections/roches-pierres-aquarium-lesquelles-choisir/4.webp', alt: "Empilement de roches stable et fixé dans un aquarium rempli d’eau" },
        paragraphes: [
          "Un empilement de roches doit toujours être stable et fixé si nécessaire, un aquarium bien rempli d'eau exerçant une pression capable de faire bouger un montage mal assuré.",
          "Les poissons fouisseurs, comme certains Cichlidés, creusent sous les roches et peuvent provoquer un effondrement. Posez toujours les roches sur le fond de la vitre avant d'ajouter le substrat, et collez les éléments importants avec une colle gel cyanoacrylate ou une résine époxy compatible aquarium.",
        ],
      },
      {
        titre: "Préparer les roches avant l'installation",
        paragraphes: [
          "Brossez chaque roche à l'eau claire, sans savon ni produit ménager, pour retirer poussières et résidus. Rincez abondamment. Si la roche provient d'un autre aquarium, laissez-la sécher quelques jours pour éviter de transférer des algues ou des maladies. Utilisez des roches de taille raisonnable : un bloc trop lourd peut rayer ou fissurer la vitre, et mieux vaut poser une plaque de mousse fine sous les pièces les plus lourdes.",
        ],
      },
      {
        titre: "Quelle roche pour quel bac",
        paragraphes: [
          "Pour vous repérer rapidement :",
        ],
        liste: [
          "Bac communautaire d'eau douce : quartz, granite, pierre dragon, lave.",
          "Bac amazonien ou à crevettes sensibles : roches inertes uniquement.",
          "Bac de cichlidés africains : calcaire, tuf, roches basiques, coraux concassés.",
          "Aquascaping : pierre dragon, Seiryu (en connaissant son effet sur la dureté), roches à textures marquées.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-son-substrat-aquarium', label: 'Bien choisir son substrat' },
      { href: '/guides/aquascaping-decor-naturel', label: 'Créer un décor naturel' },
      { href: '/guides/parametres-eau-ph-gh-kh', label: 'pH, GH, KH : les paramètres de l’eau' },
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
        paragraphes: [
          "Le biotope est une manière de faire de l'aquariophilie qui sort de l'assemblage classique de poissons colorés. L'idée : reproduire un morceau de nature précis, avec ses animaux, ses plantes, son décor et son eau. Le résultat est plus cohérent, souvent plus beau, et les poissons s'y comportent comme dans leur milieu d'origine.",
        ],
      },
      {
        titre: "Le principe du biotope",
        image: { src: '/guides/sections/aquarium-biotope-reproduire-milieu-naturel/1.webp', alt: "Biotope reproduisant décor, paramètres et espèces d’un même milieu naturel précis" },
        paragraphes: [
          "Contrairement à un bac communautaire classique, un biotope cherche à reproduire fidèlement les conditions d'un milieu naturel précis : décor, paramètres et espèces originaires de la même zone géographique.",
          "On distingue le biotope strict, qui rassemble des espèces vivant ensemble dans un même cours d'eau, et le biotope d'ambiance, plus souple, qui évoque une région (Amazonie, Asie du Sud-Est) sans exiger la précision d'un relevé de terrain. Pour un premier projet, l'ambiance suffit largement.",
        ],
      },
      {
        titre: "Choisir un biotope accessible pour débuter",
        image: { src: '/guides/sections/aquarium-biotope-reproduire-milieu-naturel/2.webp', alt: "Biotope amazonien avec bois flotté, feuilles et poissons sud-américains" },
        paragraphes: [
          "Un biotope amazonien (bois flotté, feuilles, eau douce et acide, poissons sud-américains) reste l'un des plus accessibles pour un premier projet de ce type.",
          "Il associe des espèces paisibles (Tétras, Corydoras, Scalaires, Apistogramma) à un décor facile à réunir : sable clair, racines, feuilles mortes qui tapissent le fond. D'autres biotopes sont également abordables, comme les rivières d'Asie du Sud-Est avec des Rasboras, des Botias et des plantes à croissance lente.",
        ],
      },
      {
        titre: "Adapter les paramètres au biotope choisi",
        image: { src: '/guides/sections/aquarium-biotope-reproduire-milieu-naturel/3.webp', alt: "Biotope amazonien à eau acide face au biotope africain à eau dure et alcaline" },
        paragraphes: [
          "Un biotope africain (lac Malawi ou Tanganyika) demande une eau dure et alcaline, à l'opposé d'un biotope amazonien. Les deux ne peuvent pas cohabiter dans les mêmes paramètres.",
          "Avant de choisir, renseignez-vous sur les valeurs de pH, de GH et de température du milieu naturel, et comparez-les à celles de votre eau du robinet. Si l'écart est trop important, le biotope demandera un traitement de l'eau (osmoseur, remineralisation) qui augmente le coût et l'entretien.",
        ],
      },
      {
        titre: "L’intérêt pédagogique du biotope",
        image: { src: '/guides/sections/aquarium-biotope-reproduire-milieu-naturel/4.webp', alt: "Livre ouvert symbolisant ce que le biotope apprend sur les besoins réels des espèces" },
        paragraphes: [
          "Au-delà de l'esthétique, ce type de projet pousse à mieux comprendre les besoins réels des espèces choisies, plutôt que de simplement assembler des poissons compatibles sur le papier.",
          "En cherchant comment vit réellement une espèce, on comprend pourquoi elle a besoin de cachettes, d'un courant, d'un certain type de nourriture ou de groupes. Le biotope favorise aussi la reproduction, car les poissons retrouvent des conditions proches de leur environnement.",
        ],
      },
      {
        titre: "Les éléments clés d'un biotope réussi",
        paragraphes: [
          "Pour composer un biotope cohérent, concentrez-vous sur quatre éléments :",
        ],
        liste: [
          "Le substrat : sable fin pour les rivières, gravier pour les torrents, sol sombre pour les eaux noires.",
          "Le décor : racines, branches, roches ou feuilles mortes selon le milieu.",
          "Les plantes : uniquement celles qui poussent dans la région choisie, ou des plantes flottantes pour tamiser la lumière.",
          "Les poissons : des espèces qui cohabitent réellement dans la nature, en groupes d'effectif correct.",
        ],
      },
      {
        titre: "Un atout : les feuilles mortes",
        paragraphes: [
          "Les feuilles de chêne, de hêtre ou de Catappa (amandier de l'Inde) recréent le tapis de feuilles des rivières tropicales. Elles libèrent des tanins qui colorent légèrement l'eau, abaissent le pH et offrent un abri et de la nourriture aux crevettes et aux alevins. Utilisez uniquement des feuilles séchées et issues d'endroits non pollués, sans pesticide, et remplacez-les au fur et à mesure de leur décomposition.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/bois-flotte-aquarium-preparation', label: 'Préparer un bois flotté' },
      { href: '/categorie/vivant', label: 'Voir les poissons en vente' },
      { href: '/guides/parametres-eau-ph-gh-kh', label: 'pH, GH, KH : les paramètres de l’eau' },
      { href: '/guides/aquascaping-decor-naturel', label: 'Aquascaping : composer un décor naturel' },
    ],
  },
  {
    slug: 'co2-aquarium-plante-utile',
    titre: 'Le CO2 en aquarium planté : utile ou indispensable ?',
    eyebrow: 'Décoration',
    description:
      "Dans quels cas un apport de CO2 devient utile en aquarium planté, et quand il est possible de s'en passer.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Le CO₂ divise les aquariophiles : certains en font la clé du bac planté, d'autres s'en passent très bien. La vérité dépend de ce que l'on veut cultiver. Avant d'investir dans une bouteille et un détendeur, il est utile de comprendre ce que cet apport change vraiment.",
        ],
      },
      {
        titre: "Le rôle du CO2 pour les plantes",
        image: { src: '/guides/sections/co2-aquarium-plante-utile/1.webp', alt: "Lumière, nutriments et CO₂, les trois éléments de base de la photosynthèse des plantes" },
        paragraphes: [
          "C'est l'un des éléments de base de la photosynthèse, aux côtés de la lumière et des nutriments. Un manque de CO2 peut limiter la croissance même avec un bon éclairage.",
          "Dans un aquarium sans injection, le CO₂ provient surtout de la respiration des poissons et des bactéries, et des échanges avec l'air. Il suffit à des plantes modestes mais devient le facteur limitant dès que la lumière augmente : les plantes ne peuvent plus l'exploiter, et les algues prennent le relais.",
        ],
      },
      {
        titre: "Les bacs qui peuvent s'en passer",
        image: { src: '/guides/sections/co2-aquarium-plante-utile/2.webp', alt: "Plantes peu exigeantes comme Anubias, mousses et Cryptocoryne qui poussent sans CO₂" },
        paragraphes: [
          "Un aquarium avec des plantes peu exigeantes (Anubias, mousses, Cryptocoryne) et un éclairage modéré se développe généralement bien sans apport de CO2 supplémentaire.",
          "C'est la solution « low-tech » : peu coûteuse, simple, sans risque pour les poissons. En choisissant des plantes adaptées et un éclairage raisonnable, on obtient un bac vert et sain, avec une croissance plus lente mais sans stress d'entretien.",
        ],
      },
      {
        titre: "Quand l'apport devient utile",
        image: { src: '/guides/sections/co2-aquarium-plante-utile/3.webp', alt: "Bac fortement planté sous éclairage puissant qui profite d’un apport de CO₂" },
        paragraphes: [
          "Un bac fortement planté, avec un éclairage puissant et des espèces exigeantes (tapis de sol, certaines Rotala), tire souvent un net bénéfice d'un apport de CO2 pour éviter un déséquilibre entre lumière et nutriments disponibles.",
          "Un système complet comprend une bouteille, un détendeur, une électrovanne reliée à une minuterie, un compte-bulles, un diffuseur et idéalement un « drop checker », un témoin coloré qui indique la concentration. On vise environ 20 à 30 mg/L de CO₂ dans l'eau.",
        ],
      },
      {
        titre: "Le risque d'un mauvais dosage",
        image: { src: '/guides/sections/co2-aquarium-plante-utile/4.webp', alt: "Chute dangereuse du pH par mauvais dosage de CO₂ contre diffuseur avec compte-bulles et suivi régulier" },
        paragraphes: [
          "Un apport de CO2 mal réglé peut faire chuter le pH de façon dangereuse pour les poissons. Un diffuseur avec compte-bulles et un suivi régulier restent indispensables si cette option est choisie.",
          "Les signes d'un excès : poissons qui restent en surface, respiration très rapide, comportement apathique. Dans ce cas, coupez immédiatement l'injection et aérez fortement le bac. Augmentez le débit de CO₂ progressivement sur plusieurs jours, jamais d'un coup.",
        ],
      },
      {
        titre: "Les alternatives à la bouteille",
        paragraphes: [
          "Plusieurs options existent selon le budget et le niveau d'exigence :",
        ],
        liste: [
          "Bouteille de CO₂ sous pression : la référence, précise et stable, mais l'investissement de départ est le plus élevé.",
          "Système à levure (« DIY ») : économique mais instable, avec des variations de débit et une durée de vie courte.",
          "CO₂ liquide (carbone liquide) : pratique pour de petits bacs, mais moins efficace et à manier avec prudence, certains produits étant nocifs pour des plantes ou des crevettes.",
        ],
      },
      {
        titre: "Les règles de bon fonctionnement",
        paragraphes: [
          "Démarrez l'injection environ une heure avant l'allumage de l'éclairage, et coupez-la une heure avant l'extinction : le pH se stabilise ainsi aux heures où les plantes consomment le CO₂. Aérez la nuit, car sans lumière les plantes rejettent du CO₂ et consomment de l'oxygène. Fixez solidement la bouteille et vérifiez régulièrement les raccords. Enfin, ajoutez des engrais adaptés : avec plus de CO₂ et de lumière, les plantes consomment davantage de nutriments.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/eclairage-bac-plante-choisir', label: 'Choisir l’éclairage d’un bac planté' },
      { href: '/guides/plantes-faciles-aquarium-debutant', label: 'Des plantes faciles pour débuter' },
      { href: '/guides/pompe-a-air-utilite-aquarium', label: 'À quoi sert une pompe à air' },
    ],
  },
  {
    slug: 'epuisette-materiel-manipulation-poissons',
    titre: 'Épuisette et matériel de manipulation : les indispensables',
    eyebrow: 'Matériel',
    description:
      "Épuisette, seau dédié, tuyau de siphon : le petit matériel de manipulation qui simplifie vraiment l'entretien d'un aquarium.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Au-delà de l'aquarium lui-même, quelques outils simples facilitent l'entretien et évitent des erreurs. On les oublie souvent à l'achat, alors qu'ils servent chaque semaine. Voici ceux qui méritent vraiment une place dans votre équipement de base.",
        ],
      },
      {
        titre: "L'épuisette, l'outil du quotidien",
        image: { src: '/guides/sections/epuisette-materiel-manipulation-poissons/1.webp', alt: "Épuisette qui attrape un poisson dans un aquarium, plus douce que les mains nues" },
        paragraphes: [
          "Indispensable pour attraper un poisson en cas de besoin (quarantaine, déplacement) sans le stresser inutilement avec les mains.",
          "Choisissez une taille adaptée à vos poissons, avec un filet souple à mailles fines. Un filet à mailles grossières peut accrocher les nageoires, notamment chez les poissons à voiles comme les Bettas ou les guppys ornementaux. Pour attraper un poisson, la méthode la plus douce consiste à utiliser deux outils : l'épuisette et un récipient ou un second filet pour guider le poisson sans courir derrière. Retirez le décor mobile pour limiter l'espace de fuite.",
        ],
      },
      {
        titre: "Un seau dédié à l’aquarium",
        image: { src: '/guides/sections/epuisette-materiel-manipulation-poissons/2.webp', alt: "Seau réservé uniquement à l’aquarium, écarté de tout produit ménager" },
        paragraphes: [
          "Réservé exclusivement à cet usage, il évite tout résidu de produit ménager qui pourrait être toxique pour les poissons en cas de contact avec l'eau du bac.",
          "Marquez-le clairement pour qu'il ne serve jamais au ménage, et rincez-le uniquement à l'eau claire. Un seau gradué est pratique pour mesurer le volume d'eau changé. Si vous avez plusieurs aquariums, un seau par bac ou un rinçage soigneux entre deux évite de transporter un parasite d'un bac à l'autre.",
        ],
      },
      {
        titre: "Le tuyau de siphon",
        image: { src: '/guides/sections/epuisette-materiel-manipulation-poissons/3.webp', alt: "Tuyau de siphon qui aspire les déchets du substrat et évacue l’eau vers un seau" },
        paragraphes: [
          "Il combine souvent l'aspiration des déchets du substrat et le changement d'eau en une seule opération, un vrai gain de temps au quotidien.",
          "Pour un bac moyen, un siphon manuel à cloche suffit. Pour de gros volumes, un système raccordé directement à un robinet et à une évacuation supprime la corvée des seaux. Choisissez un tuyau suffisamment long pour atteindre l'évacuation et dont le diamètre convient à la cloche : un tuyau trop fin rallonge le temps d'intervention.",
        ],
      },
      {
        titre: "Des gants ou une manche dédiée",
        image: { src: '/guides/sections/epuisette-materiel-manipulation-poissons/4.webp', alt: "Gants dédiés pour manipuler l’aquarium, loin du savon, des crèmes et des parfums" },
        paragraphes: [
          "Pour les manipulations directes dans l'eau (récifal notamment), éviter tout contact avec crèmes, parfums ou résidus de savon protège les habitants du bac.",
          "Lavez-vous toujours les mains et les avant-bras à l'eau claire, sans savon, avant de les plonger dans l'eau. Les gants longs jetables sont utiles en récifal, où certains coraux piquent ou libèrent des toxines, et lors des manipulations d'un poisson malade.",
        ],
      },
      {
        titre: "Les autres accessoires utiles",
        paragraphes: [
          "Quelques outils complètent l'ensemble, selon le type de bac :",
        ],
        liste: [
          "Un thermomètre fiable, placé à l'opposé du chauffage.",
          "Une raclette ou un aimant pour nettoyer les vitres.",
          "Une pince ou des ciseaux d'aquascaping, pour tailler et planter.",
          "Une brosse souple dédiée pour nettoyer décor et masses filtrantes.",
          "Un couvercle ou une grille pour les espèces sauteuses.",
        ],
      },
      {
        titre: "Entretenir son matériel",
        paragraphes: [
          "Rincez l'épuisette à l'eau claire après chaque usage et laissez-la sécher : un filet humide reste un nid à bactéries. En cas de maladie dans un bac, désinfectez-la avant de l'utiliser dans un autre, par exemple avec une solution d'eau très diluée et de l'eau de Javel rincée abondamment, puis laissée sécher à l'air libre. Mieux vaut avoir une épuisette dédiée au bac de quarantaine.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/nettoyer-aquarium-sans-stresser-poissons', label: 'Nettoyer son aquarium sans stresser ses poissons' },
      { href: '/guides/changement-eau-aquarium-frequence-methode', label: 'Bien faire son changement d’eau' },
      { href: '/guides/reconnaitre-poisson-malade-stresse', label: 'Reconnaître un poisson malade ou stressé' },
    ],
  },
  {
    slug: 'minuterie-programmateur-aquarium-utilite',
    titre: 'Minuterie et programmateur : automatiser son aquarium',
    eyebrow: 'Matériel',
    description:
      "Comment une simple minuterie programmable simplifie l'entretien quotidien d'un aquarium, notamment pour l'éclairage.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Une simple minuterie ou une prise programmable fait partie des équipements les moins chers et les plus utiles en aquariophilie. Elle rend l'éclairage régulier, soulage la routine quotidienne et permet de partir quelques jours l'esprit tranquille.",
        ],
      },
      {
        titre: "Automatiser l’éclairage",
        image: { src: '/guides/sections/minuterie-programmateur-aquarium-utilite/1.webp', alt: "Prise programmable reliée à la rampe d’éclairage d’un aquarium avec une photopériode régulière" },
        paragraphes: [
          "Une prise programmable garantit une photopériode régulière, jour après jour, sans dépendre d'y penser chaque soir.",
          "C'est l'usage principal : allumer le bac le matin et l'éteindre le soir, à heures fixes. Cette régularité évite les oublis (un bac resté éclairé toute la nuit favorise les algues) et supprime les à-coups d'éclairage qui perturbent les poissons.",
        ],
      },
      {
        titre: "Une régularité utile pour les poissons et les plantes",
        image: { src: '/guides/sections/minuterie-programmateur-aquarium-utilite/2.webp', alt: "Aquarium de jour avec poissons actifs et aquarium de nuit assombri, cycle jour nuit régulier" },
        paragraphes: [
          "Un cycle jour/nuit stable réduit le stress des poissons et favorise une croissance homogène des plantes.",
          "Les poissons s'habituent vite à des horaires fixes et mangent mieux. Les plantes, de leur côté, réagissent à la durée précise de la lumière : un éclairage irrégulier désorganise leur croissance et peut déclencher des algues.",
        ],
      },
      {
        titre: "Automatiser d’autres équipements",
        image: { src: '/guides/sections/minuterie-programmateur-aquarium-utilite/3.webp', alt: "Multiprise programmable branchée sur une pompe à air, une pompe de brassage et un système de dosage" },
        paragraphes: [
          "Une pompe à air, un système de brassage ou un dosage automatique peuvent aussi bénéficier d'une programmation horaire selon les besoins du bac.",
          "Dans un bac avec CO₂, on coupe l'injection environ une heure avant l'extinction des lumières et on la rallume une heure avant leur allumage. Il ne faut en revanche jamais mettre le filtre sur minuterie : il doit tourner en continu pour que ses bactéries restent oxygénées. Le chauffage, lui, est normalement piloté par son thermostat et n'a pas besoin de programmation.",
        ],
      },
      {
        titre: "Un allié pour les absences courtes",
        image: { src: '/guides/sections/minuterie-programmateur-aquarium-utilite/4.webp', alt: "Prise programmable et nourrisseur automatique qui maintiennent le bac en l’absence de quelques jours" },
        paragraphes: [
          "Couplée à un nourrisseur automatique, une bonne programmation permet de maintenir un fonctionnement stable pendant une absence de quelques jours.",
          "Testez toujours l'installation plusieurs jours avant le départ, notamment la quantité distribuée par le nourrisseur : un excès de nourriture pendant votre absence pollue l'eau et reste la première cause de mauvaises surprises au retour.",
        ],
      },
      {
        titre: "Quel modèle choisir",
        paragraphes: [
          "Il existe trois grandes familles, selon le budget et le niveau de précision recherché :",
        ],
        liste: [
          "Minuterie mécanique : peu coûteuse, avec un cadran à pions, mais précision limitée (souvent 15 minutes) et sans mémoire en cas de coupure.",
          "Programmateur numérique : programmation à la minute, plusieurs plages horaires par jour, souvent avec pile de secours. C'est le meilleur rapport qualité-prix.",
          "Prise connectée (Wi-Fi) : pilotable depuis un téléphone, avec scénarios, mais dépendante du réseau.",
        ],
      },
      {
        titre: "Points de sécurité",
        paragraphes: [
          "L'eau et l'électricité font mauvais ménage. Placez la minuterie en hauteur, hors de portée des éclaboussures, formez une boucle d'égouttement avec chaque câble pour que l'eau ne remonte pas jusqu'à la prise, et vérifiez que la puissance totale branchée ne dépasse pas celle de la minuterie. Après une coupure de courant, contrôlez que l'horloge est toujours à l'heure : une dérive de quelques heures suffit à dérégler la photopériode.",
          "Enfin, notez le réglage choisi quelque part : si vous modifiez la photopériode pour lutter contre les algues, vous saurez exactement ce qui a été changé, et à quelle date, ce qui vous aidera à comprendre ce qui fonctionne dans votre bac. Un simple carnet ou une note dans votre téléphone suffit.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/comprendre-la-photoperiode-aquarium', label: 'Comprendre la photopériode' },
      { href: '/guides/vacances-aquarium-que-faire', label: 'Préparer son aquarium avant de partir' },
      { href: '/guides/role-des-plantes-aquarium-equilibre', label: 'Le rôle des plantes dans l’équilibre du bac' },
    ],
  },
  {
    slug: 'meuble-aquarium-bien-choisir',
    titre: 'Bien choisir le meuble de son aquarium',
    eyebrow: 'Matériel',
    description:
      "Solidité, niveau, rangement : ce qu'il faut vérifier avant de choisir le meuble qui supportera un aquarium rempli d'eau.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Le meuble est l'élément le plus sous-estimé d'une installation d'aquarium. Il supporte un poids considérable, doit rester parfaitement stable pendant des années et sert aussi à ranger le matériel. Un mauvais choix peut aller de la simple déception esthétique à la rupture d'une vitre.",
        ],
      },
      {
        titre: "La solidité avant tout",
        image: { src: '/guides/sections/meuble-aquarium-bien-choisir/1.webp', alt: "Meuble solide spécialement conçu pour porter un aquarium rempli de plusieurs centaines de kilos" },
        paragraphes: [
          "Un aquarium rempli pèse plusieurs centaines de kilos au-delà de quelques dizaines de litres. Un meuble conçu spécifiquement pour l'aquariophilie est fortement préférable à un meuble de salon classique.",
          "Comptez environ 1 kilo par litre d'eau, auquel s'ajoutent le verre, le substrat et le décor : un bac de 200 litres dépasse facilement les 250 kilos. Les meubles dédiés sont dimensionnés pour cette charge, avec des montants renforcés et un plateau épais. Les meubles courants en panneaux d'aggloméré peu épais plient avec le temps, et l'humidité fait gonfler les panneaux non protégés : choisissez un revêtement résistant à l'eau.",
        ],
      },
      {
        titre: "Un meuble parfaitement à niveau",
        image: { src: '/guides/sections/meuble-aquarium-bien-choisir/2.webp', alt: "Niveau à bulle posé sur un meuble horizontal comparé à un aquarium posé de travers qui subit une pression inégale" },
        paragraphes: [
          "Le moindre défaut de mise à niveau peut, sur la durée, exercer une pression inégale sur le fond du bac et fragiliser le collage des vitres.",
          "Contrôlez le niveau avec un niveau à bulle dans les deux sens avant de poser le bac, et réglez les pieds si le sol est irrégulier. Une plaque de mousse de polystyrène fine, placée entre le meuble et l'aquarium, répartit la pression et compense les petits défauts de surface, surtout pour les cuves sans cadre.",
        ],
      },
      {
        titre: "Le rangement pratique",
        image: { src: '/guides/sections/meuble-aquarium-bien-choisir/3.webp', alt: "Meuble ouvert qui range un filtre externe, un système de dosage et des transformateurs sous l’aquarium" },
        paragraphes: [
          "Un meuble fermé permet de dissimuler le matériel technique (filtre externe, dosage, transformateurs) tout en le gardant accessible pour l'entretien.",
          "Pensez aux passages de câbles et de tuyaux : une ouverture à l'arrière ou sur le côté évite de laisser les portes entrouvertes. Une multiprise placée en hauteur, avec des boucles d'égouttement sur les câbles, limite les risques électriques en cas de fuite. Prévoyez aussi une bonne ventilation du meuble : la chaleur et l'humidité s'accumulent vite dans un espace clos.",
        ],
      },
      {
        titre: "Anticiper l’emplacement final",
        image: { src: '/guides/sections/meuble-aquarium-bien-choisir/4.webp', alt: "Plan d’une pièce avec l’emplacement définitif du meuble d’aquarium à valider avant la mise en eau" },
        paragraphes: [
          "Un meuble se déplace difficilement une fois l'aquarium rempli. Mieux vaut valider l'emplacement définitif avant la mise en eau plutôt qu'après.",
          "Choisissez un emplacement à l'écart du soleil direct et des radiateurs, près d'une prise, accessible pour l'entretien et à l'abri du passage. Pour les gros volumes, vérifiez la capacité du plancher : un logement standard supporte en moyenne de l'ordre de 150 kilos par mètre carré, et un bac de 300 litres concentre bien plus de charge sur sa surface. Placez-le de préférence près d'un mur porteur, et demandez conseil en cas de doute.",
        ],
      },
      {
        titre: "Dimensions et finitions",
        paragraphes: [
          "Le plateau du meuble doit être au moins aussi grand que la base de l'aquarium, sans que la cuve ne dépasse. Pour une cuve à cadre, le poids repose sur le pourtour, alors qu'une cuve sans cadre demande un plateau entièrement plan. Vérifiez enfin la hauteur : l'idéal est que le niveau des yeux tombe au tiers supérieur du bac une fois assis ou debout dans la pièce principale.",
        ],
      },
      {
        titre: "Les points à vérifier avant l'achat",
        paragraphes: [
          "Voici une liste rapide pour comparer les modèles :",
        ],
        liste: [
          "Charge maximale indiquée par le fabricant, supérieure au poids du bac plein.",
          "Panneaux résistants à l'humidité, avec chants protégés.",
          "Plateau plan et assez grand pour toute la base de la cuve.",
          "Ouverture pour les câbles et ventilation du compartiment.",
          "Pieds réglables pour compenser un sol irrégulier.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/categorie/cuves', label: 'Voir les aquariums en vente' },
      { href: '/guides/quel-volume-aquarium-choisir-espece', label: 'Quel volume choisir selon ses poissons' },
      { href: '/guides/demarrer-aquarium-eau-douce', label: 'Démarrer un aquarium d’eau douce' },
    ],
  },
  {
    slug: 'osmoseur-aquarium-a-quoi-ca-sert',
    titre: 'L’osmoseur : à quoi sert une eau osmosée en aquarium ?',
    eyebrow: 'Matériel',
    description:
      "Comment fonctionne un osmoseur, et dans quels cas il devient un investissement utile pour un aquarium d'eau douce ou récifal.",
    datePublication: '2026-09-26',
    sections: [
      {
        titre: "Le principe de l’osmose inverse",
        image: { src: '/guides/sections/osmoseur-aquarium-a-quoi-ca-sert/1.webp', alt: "Eau du robinet poussée à travers une membrane qui retient minéraux et impuretés et laisse passer une eau presque pure" },
        paragraphes: [
          "Un osmoseur pousse l'eau du robinet sous pression à travers une membrane semi-perméable aux pores minuscules. L'eau pure passe de l'autre côté, tandis que les minéraux, les nitrates, les phosphates, le chlore et une grande partie des polluants sont retenus puis évacués à l'égout dans une eau de rejet.",
          "Cette eau de rejet est le principal coût d'un osmoseur : il en produit plusieurs litres pour chaque litre d'eau pure, selon l'appareil et la pression de votre arrivée d'eau. On contrôle la qualité avec un testeur TDS, qui mesure les sels dissous : une eau osmosée de bonne qualité n'affiche que quelques ppm, contre 200 ou plus pour une eau du robinet dure. Une valeur qui remonte avec le temps signale des préfiltres ou une membrane à changer.",
        ],
      },
      {
        titre: "Un intérêt particulier en récifal",
        image: { src: '/guides/sections/osmoseur-aquarium-a-quoi-ca-sert/2.webp', alt: "Eau osmosée mélangée à du sel marin pour préparer une eau de mer constante, salinité contrôlée au réfractomètre" },
        paragraphes: [
          "En aquarium marin, l'eau osmosée est la base de tout : on y dissout du sel marin pour fabriquer une eau de mer dont on maîtrise la salinité, en général autour de 35 g/L, soit une densité d'environ 1,025. Comme le sel de départ est connu, les paramètres de l'eau ne dépendent plus de ce que contient votre robinet, ce qui apporte la stabilité dont un récif a besoin.",
          "Les nitrates, phosphates et silicates d'une eau du robinet alimentent les algues indésirables et fatiguent les coraux. L'eau osmosée sert aussi à compenser l'évaporation : seule l'eau s'évapore, le sel reste dans le bac. Il faut donc ajouter de l'eau pure, jamais de l'eau salée, pour garder une salinité constante. C'est le rôle d'un osmolateur, qui rajoute automatiquement un peu d'eau osmosée dès que le niveau baisse.",
        ],
      },
      {
        titre: "Un intérêt pour certains bacs d’eau douce",
        image: { src: '/guides/sections/osmoseur-aquarium-a-quoi-ca-sert/3.webp', alt: "Eau du robinet dure coupée avec de l’eau osmosée pour obtenir une eau plus adaptée aux espèces sensibles" },
        paragraphes: [
          "En eau douce, l'osmoseur n'est pas obligatoire : la plupart des poissons d'élevage s'accommodent d'une eau du robinet débarrassée de son chlore par un conditionneur. Il devient utile quand votre eau est très dure ou chargée en nitrates, ou quand vous gardez des espèces qui exigent une eau douce et peu minéralisée : certaines crevettes (Caridina), des tétras d'Amazonie ou des discus.",
          "On ne remplace pas pour autant toute l'eau. On coupe l'eau du robinet avec de l'eau osmosée, dans une proportion qu'on ajuste avec un test de dureté (GH et KH) jusqu'à se rapprocher des valeurs recherchées. Notez le mélange qui fonctionne et refaites-le à l'identique à chaque changement d'eau.",
        ],
      },
      {
        titre: "Ce que l’osmoseur ne remplace pas",
        image: { src: '/guides/sections/osmoseur-aquarium-a-quoi-ca-sert/4.webp', alt: "Eau osmosée qui doit être reminéralisée avant d’arriver dans l’aquarium, jamais utilisée directement" },
        paragraphes: [
          "L'eau osmosée est presque dépourvue de minéraux, et donc de KH, le pouvoir tampon qui stabilise le pH. Utilisée seule, elle ferait chuter et varier le pH, ce qui est dangereux pour les poissons. Une eau totalement pure n'est stable pour aucune espèce d'aquarium : il faut la reminéraliser avant de l'utiliser.",
          "En eau douce, on le fait avec des sels de reminéralisation vendus pour l'aquariophilie, ou en la mélangeant avec de l'eau du robinet. En eau de mer, le sel marin s'en charge. Dans tous les cas, l'osmoseur ne remplace ni la filtration ni les changements d'eau réguliers : il améliore l'eau qui entre, il n'épure pas celle du bac.",
        ],
      },
      {
        titre: "Savoir ce que contient votre eau avant d’investir",
        paragraphes: [
          "Avant d'acheter un osmoseur, mesurez votre eau. Un testeur TDS, quelques dizaines d'euros, donne une première idée de sa charge en sels, et des tests GH et KH précisent sa dureté. Les résultats du contrôle sanitaire de l'eau de votre commune sont aussi publics : ils sont disponibles en mairie et sur le site du ministère de la Santé.",
          "Si votre eau est douce et pauvre en nitrates, et que vous gardez des poissons courants, un osmoseur n'apporterait presque rien. Si elle est très dure, ou si vous montez un récif, il se rentabilise vite.",
        ],
      },
      {
        titre: "Choisir et entretenir un osmoseur",
        paragraphes: [
          "Les modèles domestiques comptent en général trois à cinq étages : un filtre à sédiments, un ou deux filtres à charbon qui retiennent le chlore, la membrane, et parfois une résine déionisante qui descend l'eau à zéro TDS, utile en récifal. Le chlore abîme la membrane : ne repoussez pas le changement du charbon.",
          "Pour un particulier, un modèle de 75 GPD, soit environ 280 litres par jour, suffit largement. Prévoyez une pression d'arrivée d'eau d'environ 3 bars et un raccord à l'arrivée d'eau et à l'évacuation. L'entretien tient en quelques gestes :",
        ],
        liste: [
          "remplacer les préfiltres (sédiments et charbon) environ tous les 6 à 12 mois, selon la qualité de votre eau",
          "changer la membrane tous les 2 à 3 ans, ou dès que la valeur TDS de l'eau produite remonte nettement",
          "rincer la membrane et vérifier l'absence de fuite après chaque changement de cartouche",
          "réutiliser l'eau de rejet pour arroser les plantes ou nettoyer, plutôt que de la perdre",
        ],
      },
      {
        titre: "Les erreurs fréquentes",
        paragraphes: [
          "La plus courante est de verser l'eau osmosée pure directement dans le bac : sans minéraux, le pH devient instable. La deuxième est d'oublier de changer les cartouches, ce qui revient à produire une eau qui n'est plus pure sans s'en apercevoir. La troisième est de mélanger eau osmosée et eau du robinet à l'œil, sans test : les paramètres varient alors d'un changement d'eau à l'autre.",
          "Pensez aussi à stocker l'eau produite dans un bidon propre et fermé, à l'abri de la lumière : c'est ainsi qu'on évite les algues et les contaminations avant l'usage.",
        ],
      },
      {
        titre: "Et si vous ne voulez pas investir ?",
        paragraphes: [
          "Pour un petit bac ou un usage occasionnel, vous pouvez acheter de l'eau osmosée au litre dans les magasins d'aquariophilie et certaines jardineries. Le coût à l'usage est plus élevé qu'un osmoseur, mais l'investissement de départ est nul, ce qui laisse le temps de vérifier que vous en avez vraiment besoin.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/difference-eau-osmosee-eau-robinet-aquarium', label: 'Eau du robinet ou eau osmosée' },
      { href: '/guides/parametres-eau-ph-gh-kh', label: 'pH, GH et KH : comprendre les paramètres de l’eau' },
      { href: '/guides/calcium-kh-magnesium-recifal', label: 'Calcium, KH et magnésium en récifal' },
    ],
  },
  {
    slug: 'aquarium-communautaire-ou-espece-unique',
    titre: 'Bac communautaire ou bac d’espèce : que choisir ?',
    eyebrow: 'Comparatif',
    description:
      "Aquarium communautaire avec plusieurs espèces compatibles, ou bac dédié à une seule espèce : avantages et inconvénients de chaque approche.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Faut-il mélanger plusieurs espèces dans un même aquarium ou se concentrer sur une seule ? La question se pose dès le premier achat, et la réponse change le choix des poissons, du décor et des paramètres de l'eau. Voici les deux approches, leurs avantages et leurs limites.",
        ],
      },
      {
        titre: "Le bac communautaire",
        image: { src: '/guides/sections/aquarium-communautaire-ou-espece-unique/1.webp', alt: "Aquarium communautaire avec plusieurs espèces compatibles par température, caractère et taille" },
        paragraphes: [
          "Il permet de varier les couleurs et les comportements observés, à condition de bien vérifier la compatibilité des espèces choisies entre elles (température, caractère, taille).",
          "Un bon bac communautaire associe des poissons paisibles occupant des zones différentes : un banc de Rasboras ou de Néons dans le milieu de l'eau, des Corydoras au fond, quelques Guppys ou Platys en surface. Il faut vérifier quatre points pour chaque espèce : la température, le pH et la dureté de l'eau, la taille adulte (un poisson mange tout ce qui rentre dans sa bouche), et le caractère.",
        ],
      },
      {
        titre: "Le bac d’espèce",
        image: { src: '/guides/sections/aquarium-communautaire-ou-espece-unique/2.webp', alt: "Aquarium dédié à une seule espèce de poisson en banc" },
        paragraphes: [
          "Dédié à une seule espèce, souvent en groupe, il simplifie le choix des paramètres et évite les problèmes de cohabitation, au prix d'une diversité visuelle plus réduite.",
          "C'est l'approche privilégiée des passionnés : on y observe le comportement naturel de l'espèce, ses interactions, sa reproduction. Un bac de Corydoras, de Guppys d'élevage, de Cichlidés nains ou de crevettes Caridina permet d'adapter précisément l'eau, le décor et l'alimentation. La contrepartie : il demande de bien se renseigner avant l'achat.",
        ],
      },
      {
        titre: "Le cas des espèces territoriales",
        image: { src: '/guides/sections/aquarium-communautaire-ou-espece-unique/3.webp', alt: "Deux poissons territoriaux qui se défendent leur espace dans un aquarium" },
        paragraphes: [
          "Certains poissons (Cichlidés notamment) supportent mal la cohabitation avec d'autres espèces et se prêtent souvent mieux à un bac d'espèce.",
          "Les Cichlidés du lac Malawi, les Combattants (Bettas) mâles, certains Gouramis ou les Barbus tigrés posent des problèmes en bac mixte : agressivité, harcèlement de voisins plus timides. Dans ce cas, mieux vaut un bac dédié, avec des cachettes nombreuses et des effectifs adaptés.",
        ],
      },
      {
        titre: "Notre recommandation pour débuter",
        image: { src: '/guides/sections/aquarium-communautaire-ou-espece-unique/4.webp', alt: "Bac communautaire conseillé pour débuter, bac d’espèce plus tard avec une recherche plus poussée" },
        paragraphes: [
          "Un bac communautaire avec des espèces reconnues comme compatibles reste un bon point de départ. Un bac d'espèce demande généralement une recherche plus poussée en amont.",
          "Pour un premier aquarium, privilégiez des espèces paisibles, rustiques et vivant dans des paramètres proches. Évitez de multiplier les espèces : trois ou quatre bien choisies valent mieux qu'une douzaine mal assorties.",
        ],
      },
      {
        titre: "Comparer les deux approches",
        paragraphes: [
          "Pour résumer les points forts de chaque option :",
        ],
        liste: [
          "Bac communautaire : plus de variété visuelle, plus de mouvement, mais compatibilité à vérifier.",
          "Bac d'espèce : paramètres adaptés précisément, comportement naturel, reproduction possible.",
          "Communautaire : plus de compromis sur la température et la dureté de l'eau.",
          "Espèce unique : moins de diversité, mais plus de facilité de gestion.",
        ],
      },
      {
        titre: "Les erreurs de cohabitation classiques",
        paragraphes: [
          "Plusieurs associations sont à éviter : un Combattant avec des poissons à nageoires longues et colorées (il les confond avec des rivaux), des Barbus tigrés avec des poissons à voiles qu'ils mordillent, un poisson rouge avec des tropicaux, qui n'ont pas la même température, ou encore de petits poissons avec un gros cichlidé qui les verra comme des proies. En cas de doute, consultez la fiche de chaque espèce avant l'achat et introduisez en dernier les poissons les plus territoriaux.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-son-premier-poisson', label: 'Choisir ses premiers poissons' },
      { href: '/guides/quel-volume-aquarium-choisir-espece', label: 'Quel volume choisir selon ses poissons' },
      { href: '/guides/erreurs-debutant-aquariophilie', label: 'Les erreurs de débutant à éviter' },
    ],
  },
  {
    slug: 'led-vs-neon-eclairage-aquarium-comparatif',
    titre: 'Éclairage LED ou néon : quel choix pour son aquarium ?',
    eyebrow: 'Comparatif',
    description:
      "Comparatif entre l'éclairage LED et le néon (tube fluorescent) pour un aquarium : consommation, durée de vie et qualité de lumière.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Pendant longtemps, l'éclairage des aquariums reposait sur des tubes fluorescents (néons). Les LED se sont imposées en quelques années. Mais la LED est-elle toujours le meilleur choix, et faut-il remplacer un néon qui fonctionne encore ? Voici les critères qui comptent.",
        ],
      },
      {
        titre: "La consommation électrique",
        image: { src: '/guides/sections/led-vs-neon-eclairage-aquarium-comparatif/1.webp', alt: "Rampe LED qui consomme moins d’électricité qu’un tube néon pour un éclairage équivalent" },
        paragraphes: [
          "Une rampe LED consomme généralement bien moins d'électricité qu'un néon classique pour un éclairage équivalent, un avantage qui se ressent sur la durée.",
          "À titre d'ordre de grandeur, une rampe LED d'une vingtaine de watts peut remplacer deux tubes de 24 watts. Allumée 8 heures par jour pendant un an, cette différence représente de l'ordre de 80 kWh, soit une vingtaine d'euros d'économie sur la facture annuelle selon le tarif. L'économie est modeste sur un seul bac, mais notable sur plusieurs.",
        ],
      },
      {
        titre: "La durée de vie",
        image: { src: '/guides/sections/led-vs-neon-eclairage-aquarium-comparatif/2.webp', alt: "Courbe d’intensité lumineuse qui reste stable pour une LED et diminue progressivement pour un néon" },
        paragraphes: [
          "Les LED conservent leurs performances beaucoup plus longtemps qu'un néon, dont l'intensité décline progressivement bien avant qu'il ne cesse de fonctionner.",
          "Un tube T5 se remplace généralement tous les 9 à 12 mois pour conserver son spectre et son efficacité, alors qu'une LED de qualité fonctionne plusieurs années. Ce renouvellement annuel des néons est un coût caché qu'il faut inclure dans la comparaison.",
        ],
      },
      {
        titre: "La qualité et la modularité de la lumière",
        image: { src: '/guides/sections/led-vs-neon-eclairage-aquarium-comparatif/3.webp', alt: "Rampe LED à intensité et spectre réglables comparée à un tube néon à lumière fixe" },
        paragraphes: [
          "De nombreuses rampes LED permettent de régler l'intensité et parfois le spectre, une souplesse que les tubes néon classiques n'offrent pas.",
          "Les modèles programmables simulent un lever et un coucher de soleil progressifs, plus doux pour les poissons que l'allumage brutal d'un néon. La LED dégage aussi moins de chaleur dans le bac, un avantage en été, et un point utile pour les petits volumes.",
        ],
      },
      {
        titre: "Le cas du matériel déjà en place",
        image: { src: '/guides/sections/led-vs-neon-eclairage-aquarium-comparatif/4.webp', alt: "Néon encore fonctionnel conservé, puis remplacé par une rampe LED au moment du renouvellement" },
        paragraphes: [
          "Remplacer un néon fonctionnel par une LED n'est pas toujours une priorité immédiate. C'est surtout au moment d'un renouvellement de matériel que la LED s'impose aujourd'hui comme le choix par défaut.",
          "Si votre néon donne satisfaction, changez-le au rythme habituel jusqu'à la panne. Si vous démarrez un bac ou remplacez un tube usé, la LED est presque toujours plus rentable à moyen terme.",
        ],
      },
      {
        titre: "Les points à vérifier avant d'acheter une LED",
        paragraphes: [
          "Toutes les LED ne se valent pas. Pour éviter une mauvaise surprise :",
        ],
        liste: [
          "Puissance et surface couvertes : la rampe doit correspondre à la longueur du bac.",
          "Température de couleur : autour de 6 500 K pour un rendu naturel et favorable aux plantes.",
          "Gradateur et minuterie intégrés : pratiques pour régler l'intensité et la durée.",
          "Dissipation de la chaleur : un radiateur de qualité prolonge la durée de vie.",
          "Indice de protection contre les éclaboussures, car l'humidité est omniprésente.",
        ],
      },
      {
        titre: "Et pour les plantes ?",
        paragraphes: [
          "Les LED actuelles conviennent très bien aux bacs plantés, y compris exigeants, à condition de choisir un modèle conçu pour cet usage et de régler la durée d'éclairage avec soin. Un éclairage trop fort pour un bac jeune est un piège classique, quelle que soit la technologie.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/eclairage-bac-plante-choisir', label: 'Choisir l’éclairage d’un bac planté' },
      { href: '/guides/eclairage-recifal-choisir-led', label: 'Choisir son éclairage LED en récifal' },
      { href: '/guides/comprendre-la-photoperiode-aquarium', label: 'Comprendre la photopériode' },
    ],
  },
  {
    slug: 'filtre-interne-ou-externe-comparatif',
    titre: 'Filtre interne ou externe : lequel choisir ?',
    eyebrow: 'Comparatif',
    description:
      "Différences entre un filtre interne et un filtre externe pour aquarium, et dans quels cas privilégier l'un ou l'autre.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Interne ou externe ? C'est l'une des premières hésitations lors de l'achat d'un aquarium. Les deux types de filtres font leur travail, mais ils ne s'adressent pas aux mêmes bacs ni aux mêmes budgets. Voici une comparaison concrète, pour choisir sans regret.",
        ],
      },
      {
        titre: "Le filtre interne",
        image: { src: '/guides/sections/filtre-interne-ou-externe-comparatif/1.webp', alt: "Aquarium avec un filtre interne installé dans le bac" },
        paragraphes: [
          "Installé directement dans le bac, il est généralement plus abordable et plus simple à entretenir, mais prend de la place visible dans l'aquarium et convient mieux aux volumes modestes.",
          "Il est discret côté facture, facile à poser et à remplacer, et ne peut pas fuir à l'extérieur du bac. Sa capacité de masse filtrante est limitée, et son moteur plongé dans l'eau réchauffe très légèrement le bac. Il peut aspirer de petits animaux, d'où l'intérêt d'une mousse de protection pour les crevettes et les alevins.",
        ],
      },
      {
        titre: "Le filtre externe",
        image: { src: '/guides/sections/filtre-interne-ou-externe-comparatif/2.webp', alt: "Aquarium avec un filtre externe rangé sous le meuble qui libère tout l’espace du bac" },
        paragraphes: [
          "Installé sous le meuble, il libère entièrement l'espace visible du bac et offre souvent un volume de masses filtrantes plus important, un atout pour les bacs de grand volume ou fortement peuplés.",
          "Son prix est plus élevé, mais il apporte une filtration plus stable et un entretien moins fréquent. Il se raccorde par des tuyaux, ce qui exige une installation soignée : un raccord mal serré peut causer une fuite. Il demande aussi un espace sous le meuble et des tuyaux qui restent propres.",
        ],
      },
      {
        titre: "L’entretien au quotidien",
        image: { src: '/guides/sections/filtre-interne-ou-externe-comparatif/3.webp', alt: "Entretien rapide mais plus fréquent d’un filtre interne comparé à un entretien plus long mais plus espacé d’un filtre externe" },
        paragraphes: [
          "Un filtre interne se nettoie plus rapidement sur place, tandis qu'un filtre externe demande de le débrancher et de le sortir, une opération un peu plus longue mais moins fréquente.",
          "Un filtre interne s'encrasse plus vite à cause de sa petite capacité : comptez un nettoyage toutes les deux à quatre semaines. Un filtre externe bien dimensionné tient souvent deux à trois mois entre deux entretiens, avec un nettoyage des tuyaux une à deux fois par an.",
        ],
      },
      {
        titre: "Notre recommandation selon le volume",
        image: { src: '/guides/sections/filtre-interne-ou-externe-comparatif/4.webp', alt: "Filtre interne pour un petit volume, filtre externe au-delà d’un certain volume" },
        paragraphes: [
          "Un filtre interne suffit généralement jusqu'à un certain volume, au-delà duquel un filtre externe devient souvent plus adapté pour maintenir une bonne qualité d'eau.",
          "Comme repère, un filtre interne convient bien jusqu'à 60 à 80 litres. Au-delà, ou pour un bac planté, fortement peuplé ou orienté aquascaping, le filtre externe est le meilleur investissement, et se revend facilement d'occasion.",
        ],
      },
      {
        titre: "Tableau comparatif",
        paragraphes: [
          "Pour résumer les principales différences :",
        ],
        liste: [
          "Prix : interne plus économique, externe plus coûteux à l'achat.",
          "Capacité de filtration : externe supérieure, avec davantage de masses filtrantes.",
          "Esthétique : externe invisible dans le bac, interne visible.",
          "Entretien : interne plus fréquent mais plus rapide, externe plus long mais moins souvent.",
          "Risque de fuite : externe à surveiller, interne sans risque.",
          "Bacs adaptés : interne pour les petits volumes, externe pour les moyens et grands.",
        ],
      },
      {
        titre: "Les cas particuliers",
        paragraphes: [
          "Pour un aquarium de crevettes, un filtre à mousse ou un filtre interne équipé d'une grille fine protège les petits. Pour un Betta, un filtre à débit réglable évite un courant trop fort. Dans un petit nano-aquarium, un filtre interne compact suffit largement. Et dans tous les cas, le débit doit être adapté au volume du bac : quatre à six fois le volume par heure en repère.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/choisir-filtration-aquarium', label: 'Bien choisir sa filtration' },
      { href: '/guides/quel-filtre-choisir-selon-volume', label: 'Quel filtre choisir selon le volume' },
      { href: '/guides/role-du-filtre-dans-aquarium', label: 'Comprendre le rôle du filtre' },
      { href: '/guides/entretien-filtre-aquarium-bonne-frequence', label: 'Entretien du filtre' },
    ],
  },
  {
    slug: 'aquarium-eau-froide-ou-tropical',
    titre: 'Aquarium d’eau froide ou tropical : quelle différence ?',
    eyebrow: 'Comparatif',
    description:
      "Différences entre un aquarium d'eau froide (sans chauffage) et un aquarium tropical, et comment choisir selon les espèces envisagées.",
    datePublication: '2026-09-26',
    sections: [
      {
        paragraphes: [
          "Avant de choisir des poissons, il faut décider de la température du bac. Tous les poissons ne vivent pas dans la même eau : certains exigent la chaleur des tropiques, d'autres préfèrent la fraîcheur. Faire le bon choix dès le départ évite de bloquer son projet.",
        ],
      },
      {
        titre: "L’aquarium tropical",
        image: { src: '/guides/sections/aquarium-eau-froide-ou-tropical/1.webp', alt: "Aquarium tropical chauffé entre 24 et 28 degrés avec des poissons colorés" },
        paragraphes: [
          "Le plus répandu, il maintient une température stable généralement comprise entre 24 et 28°C grâce à un chauffage, adaptée à la grande majorité des poissons d'ornement vendus en animalerie.",
          "Il offre le plus grand choix d'espèces : Guppys, Néons, Corydoras, Scalaires, Discus, Gouramis. Il demande un chauffage fiable, un thermomètre et une certaine vigilance en été, quand la pièce peut dépasser 28 °C. L'eau chaude contient moins d'oxygène, d'où l'importance d'un bon brassage.",
        ],
      },
      {
        titre: "L’aquarium d’eau froide",
        image: { src: '/guides/sections/aquarium-eau-froide-ou-tropical/2.webp', alt: "Aquarium sans chauffage avec des poissons rouges à température ambiante" },
        paragraphes: [
          "Sans chauffage, il convient à des espèces qui tolèrent ou préfèrent une température plus basse, comme certains poissons rouges ou certaines espèces originaires de zones tempérées.",
          "Les poissons rouges vivent bien entre 15 et 22 °C. D'autres espèces apprécient aussi une eau plus fraîche : le Cardinal (Tanichthys albonubes), la loche d'étang, certains Danios, ou la crevette Neocaridina qui tolère de 18 à 26 °C. Un aquarium sans chauffage économise de l'énergie et simplifie le matériel.",
        ],
      },
      {
        titre: "Ne pas confondre eau froide et bassin extérieur",
        image: { src: '/guides/sections/aquarium-eau-froide-ou-tropical/3.webp', alt: "Aquarium d’eau froide à température ambiante comparé à un bassin de jardin exposé aux variations de saison" },
        paragraphes: [
          "Un aquarium d'eau froide reste un bac d'intérieur à température ambiante, différent d'un bassin de jardin exposé aux variations saisonnières extérieures.",
          "Dans un logement, la température de l'eau reste le plus souvent entre 18 et 24 °C. Elle varie peu d'un jour à l'autre, contrairement à un bassin extérieur qui suit les saisons. Les poissons rouges de bassin supportent le gel, alors que ceux d'un bac intérieur vivent à température ambiante toute l'année.",
        ],
      },
      {
        titre: "Le risque de mélanger les deux besoins",
        image: { src: '/guides/sections/aquarium-eau-froide-ou-tropical/4.webp', alt: "Poissons tropicaux dans un bac non chauffé exposés à un stress thermique, choix du bac avant celui des espèces" },
        paragraphes: [
          "Un poisson tropical placé dans un bac non chauffé, ou l'inverse, subit un stress thermique durable qui affecte sa santé sur le long terme. Le choix du type de bac doit précéder celui des espèces.",
          "Il existe toutefois une zone intermédiaire de 22 à 25 °C où cohabitent des espèces tolérantes : Danios, Platys, Corydoras aeneus et paleatus, certaines crevettes. Pour un bac communautaire, c'est un compromis souvent satisfaisant, mais il faut vérifier chaque espèce.",
        ],
      },
      {
        titre: "Choisir selon votre situation",
        paragraphes: [
          "Plusieurs critères aident à décider :",
        ],
        liste: [
          "Votre pièce est chauffée toute l'année : un bac tropical est facile à stabiliser.",
          "Votre pièce est fraîche en hiver : un bac d'eau froide ou un chauffage plus puissant.",
          "Vous voulez peu de matériel : l'eau froide évite chauffage et surveillance de la température.",
          "Vous voulez un large choix d'espèces colorées : le tropical offre le plus de diversité.",
          "Vous vivez dans une région chaude : prévoyez de l'ombrage et du brassage en été.",
        ],
      },
      {
        titre: "Attention aux poissons rouges",
        paragraphes: [
          "Le poisson rouge est souvent présenté comme le poisson idéal pour débuter en eau froide, ce qui est trompeur. Il grandit beaucoup, produit énormément de déchets et exige un volume important, de l'ordre de 75 à 100 litres pour un premier individu, et davantage pour chacun des suivants. Un bac trop petit lui est fatal à moyen terme. Informez-vous avant de vous lancer.",
        ],
      },
    ],
    liensUtiles: [
      { href: '/guides/quel-volume-aquarium-choisir-espece', label: 'Quel volume choisir selon ses poissons' },
      { href: '/guides/choisir-poissons-bassin-jardin', label: 'Quels poissons choisir pour son bassin' },
      { href: '/guides/chauffage-aquarium-bien-choisir-puissance', label: 'Bien choisir son chauffage' },
    ],
  },
  {
      "slug": "vendre-son-aquarium-occasion",
      "titre": "Vendre son aquarium d'occasion : le guide pour bien le vendre",
      "eyebrow": "Acheter & vendre",
      "description": "Préparer, photographier, fixer le prix et organiser la remise : tout pour vendre rapidement son aquarium d'occasion et son matériel entre particuliers.",
      "datePublication": "2026-10-22",
      "sections": [
        {
          "titre": "Préparer l'aquarium avant de le mettre en vente",
          "image": {
            "src": "/guides/sections/vendre-son-aquarium-occasion/1.webp",
            "alt": "Aquarium nettoyé puis rempli quelques heures pour vérifier qu’il ne fuit pas"
          },
          "paragraphes": [
            "Videz et nettoyez le bac, rincez les accessoires et retirez le calcaire des vitres. Un aquarium propre se vend plus facilement et rassure l'acheteur. Si vous le pouvez, vérifiez l'étanchéité en le remplissant quelques heures : pouvoir annoncer « ne fuit pas » est un argument de poids.",
            "Pour le calcaire tenace, un chiffon imbibé de vinaigre blanc dilué suffit, suivi d'un rinçage abondant à l'eau claire. N'utilisez ni savon ni produit ménager sur les parois intérieures, dont les résidus pourraient gêner le prochain propriétaire. Pensez aussi à nettoyer le filtre, à démonter les accessoires et à les sécher : un matériel propre et sec donne une meilleure impression que le même matériel couvert de dépôts."
          ]
        },
        {
          "titre": "Bien le photographier",
          "image": {
            "src": "/guides/sections/vendre-son-aquarium-occasion/2.webp",
            "alt": "Appareil photo et photos du bac vide, du filtre, du chauffage, de l’éclairage et du meuble, avec les défauts éventuels"
          },
          "paragraphes": [
            "Prenez plusieurs photos nettes, à la lumière du jour, du bac vide et de chaque équipement (filtre, chauffage, éclairage, meuble). Montrez aussi les éventuels défauts : rayures légères, silicone ancien. Un acheteur qui voit tout à l'avance pose moins de questions et se déplace plus sûrement. Sur Aquatopia, vous pouvez joindre plusieurs photos à chaque annonce : profitez-en pour montrer le bac sous tous les angles.",
            "Évitez les photos prises de nuit ou en contre-jour : un fond neutre et une lumière naturelle suffisent. Une photo avec un objet de référence (une règle, un mètre) aide l'acheteur à se repérer sur la taille réelle du bac."
          ]
        },
        {
          "titre": "Rédiger une annonce complète",
          "image": {
            "src": "/guides/sections/vendre-son-aquarium-occasion/3.webp",
            "alt": "Annonce avec photo, contenance, dimensions, contenu inclus, raison de la vente et ville"
          },
          "paragraphes": [
            "Indiquez la contenance en litres, les dimensions, l'âge du bac, la marque, ce qui est inclus (meuble, filtre, éclairage, décor) et la raison de la vente. Précisez votre ville : sur Aquatopia, les annonces sont classées par distance, et la plupart des acheteurs cherchent près de chez eux."
          ]
        },
        {
          "titre": "Fixer le prix",
          "image": {
            "src": "/guides/sections/vendre-son-aquarium-occasion/4.webp",
            "alt": "Comparaison de son aquarium avec des annonces comparables pour fixer un prix légèrement négociable"
          },
          "paragraphes": [
            "Regardez les annonces d'aquariums comparables (même volume, même état, mêmes équipements) et situez-vous par rapport à elles. Un prix légèrement négociable attire davantage de messages. Si vous vendez le bac avec son matériel, un lot complet à prix attractif peut aussi se vendre plus vite. Parcourez la catégorie Aquariums d'Aquatopia pour voir ce que demandent les autres vendeurs près de chez vous."
          ]
        },
        {
          "titre": "Organiser la remise",
          "image": {
            "src": "/guides/sections/vendre-son-aquarium-occasion/5.webp",
            "alt": "Vendeur et acheteur au rendez-vous : bac vidé, paiement convenu à l’avance, remise sur place"
          },
          "paragraphes": [
            "Un aquarium se récupère sur place, ce qui permet à l'acheteur de le contrôler. Fixez un rendez-vous, videz l'eau à l'avance et aidez au démontage si nécessaire. Convenez du mode de paiement avant la venue de l'acheteur. La messagerie d'Aquatopia vous permet de fixer le rendez-vous et de répondre aux dernières questions avant le jour J."
          ]
        },
        {
          "titre": "Ce que vous pouvez proposer avec le bac",
          "paragraphes": [
            "Vendre le bac seul, c'est limiter le nombre d'acheteurs potentiels. Un lot cohérent intéresse davantage les débutants, qui cherchent à démarrer sans multiplier les achats. Selon ce que vous avez, vous pouvez proposer :"
          ],
          "liste": [
            "Le meuble ou le support sur lequel le bac était installé.",
            "Le filtre, avec ses éponges et ses tuyaux, si vous les jugez en bon état.",
            "Le chauffage et le thermomètre, testés avant la mise en vente.",
            "L'éclairage (rampe LED ou réglette) et le couvercle.",
            "Le décor, les roches et le substrat, si l'acheteur le souhaite."
          ]
        },
        {
          "titre": "Éviter les mauvaises surprises",
          "paragraphes": [
            "Décrivez honnêtement l'état du bac et de son matériel : rayures, silicone vieilli, pièces manquantes. Un acheteur informé ne revient pas sur sa décision le jour de la remise. Préférez un paiement convenu à l'avance et une remise en main propre, plutôt qu'un envoi à distance : un aquarium est lourd, fragile et difficile à expédier. Soyez prudent avec les acheteurs qui ne veulent pas voir le bac ou qui proposent un mode de paiement inhabituel.",
            "Une fois le bac vendu, pensez à prévenir les autres personnes qui vous avaient contacté, pour éviter de les laisser dans l'attente."
          ]
        }
      ],
      "liensUtiles": [
        {
          "href": "/categorie/cuves",
          "label": "Voir les aquariums d'occasion"
        },
        {
          "href": "/guides/acheter-aquarium-occasion-verifications",
          "label": "Acheter un aquarium d'occasion : points à vérifier"
        },
        {
          "href": "/guides/deposer-annonce-aquariophilie-gratuite",
          "label": "Déposer une annonce gratuite"
        },
        {
          "href": "/guides/aquarium-neuf-ou-occasion-comparatif",
          "label": "Aquarium neuf ou d’occasion : comparatif"
        },
        {
          "href": "/guides/budget-demarrer-aquarium",
          "label": "Budget pour démarrer un aquarium"
        }
      ]
    },
    {
      "slug": "acheter-aquarium-occasion-verifications",
      "titre": "Acheter un aquarium d'occasion : les points à vérifier avant de payer",
      "eyebrow": "Acheter & vendre",
      "description": "Étanchéité, silicone, vitres, équipements : la checklist pour acheter un aquarium d'occasion sans mauvaise surprise.",
      "datePublication": "2026-10-22",
      "sections": [
        {
          "titre": "Pourquoi acheter d'occasion",
          "image": {
            "src": "/guides/sections/acheter-aquarium-occasion-verifications/1.webp",
            "alt": "Un grand aquarium d’occasion avec son matériel inclus pour un budget réduit"
          },
          "paragraphes": [
            "Un aquarium d'occasion permet souvent de démarrer avec un volume plus grand et du matériel inclus pour un budget réduit. Il demande simplement un peu plus de vérifications qu'un bac neuf. Sur Aquatopia, la catégorie Aquariums rassemble les annonces de particuliers, classées par distance, pour trouver un bac près de chez vous."
          ]
        },
        {
          "titre": "Contrôler le bac",
          "image": {
            "src": "/guides/sections/acheter-aquarium-occasion-verifications/2.webp",
            "alt": "Inspection des vitres, des joints en silicone et des angles, puis test en eau chez soi"
          },
          "paragraphes": [
            "Inspectez les vitres (rayures profondes, éclats, traces d'humidité), les joints de silicone (décollements, moisissures noires, silicone jauni ou craquelé) et les angles. Un test en eau de quelques heures chez vous, avant de le garnir, reste la meilleure garantie d'étanchéité.",
            "Contrôlez aussi le fond du bac, sous le substrat si le vendeur l'a vidé, et passez le doigt le long des joints : ils doivent être souples, continus, sans zone décollée. Une trace de calcaire ou un voile blanc sur la vitre se nettoie, mais une rayure profonde ou un éclat sur un angle est un défaut définitif. Un aquarium neuf pour un volume équivalent coûte plus cher, mais un bac mal contrôlé peut fuir et abîmer un meuble ou un sol."
          ]
        },
        {
          "titre": "Tester les équipements",
          "image": {
            "src": "/guides/sections/acheter-aquarium-occasion-verifications/3.webp",
            "alt": "Filtre, chauffage et éclairage testés devant le vendeur"
          },
          "paragraphes": [
            "Faites fonctionner le filtre, le chauffage et l'éclairage devant le vendeur. Le chauffage doit chauffer, le filtre ne doit pas faire de bruit anormal, la rampe LED doit s'allumer entièrement. Notez la marque et le modèle pour vérifier plus tard la disponibilité des pièces. Prévenez le vendeur par la messagerie d'Aquatopia que vous voulez tout voir fonctionner : un vendeur sérieux n'y voit aucun inconvénient."
          ]
        },
        {
          "titre": "Nettoyer avant la mise en eau",
          "image": {
            "src": "/guides/sections/acheter-aquarium-occasion-verifications/4.webp",
            "alt": "Nettoyage à l’eau claire sans savon ni produit ménager avant la mise en eau"
          },
          "paragraphes": [
            "À la maison, nettoyez le bac et le matériel à l'eau claire, sans savon ni produit ménager dont les résidus pourraient nuire aux poissons. Remplacez les consommables usés (médias filtrants, ampoules) si nécessaire."
          ]
        },
        {
          "titre": "Prévoir le transport",
          "image": {
            "src": "/guides/sections/acheter-aquarium-occasion-verifications/5.webp",
            "alt": "Véhicule, aide, sangles et couvertures, et mesure du bac et de l’emplacement avant de se déplacer"
          },
          "paragraphes": [
            "Un aquarium est lourd et fragile : prévoyez de l'aide, des sangles ou des couvertures et un véhicule adapté. Mesurez le bac et l'endroit où vous le placerez avant de vous déplacer."
          ]
        },
        {
          "titre": "Avant de payer",
          "image": {
            "src": "/guides/sections/acheter-aquarium-occasion-verifications/6.webp",
            "alt": "Vérifier que le bac correspond à l’annonce et poser ses questions par la messagerie avant de payer"
          },
          "paragraphes": [
            "Vérifiez que le bac correspond bien à l'annonce et convenez du prix à l'avance. Sur Aquatopia, vous pouvez poser toutes vos questions au vendeur par la messagerie avant de vous déplacer."
          ]
        },
        {
          "titre": "Les questions à poser au vendeur",
          "paragraphes": [
            "Avant de vous déplacer, posez quelques questions simples par la messagerie. Les réponses vous renseignent autant que le bac lui-même :"
          ],
          "liste": [
            "Quel est l'âge du bac, et a-t-il déjà été recollé ou réparé ?",
            "Quelles sont les dimensions et le volume exact ?",
            "Quelle était la dernière utilisation (eau douce, eau de mer, bassin de quarantaine) ?",
            "Le matériel inclus fonctionne-t-il, et depuis quand ?",
            "Pourquoi le vendeur se sépare-t-il du bac ?"
          ]
        },
        {
          "titre": "Les signes d'alerte",
          "paragraphes": [
            "Un joint qui noircit ou se décolle, une vitre fissurée même légèrement, un meuble gonflé par l'humidité, un vendeur qui refuse de remplir le bac ou de brancher le matériel : ces signaux doivent vous faire renoncer ou renégocier fortement. Méfiez-vous aussi d'un prix très inférieur à celui des annonces comparables, sans explication."
          ]
        },
        {
          "titre": "Remettre le bac en route",
          "paragraphes": [
            "Un aquarium d'occasion doit être cyclé comme un bac neuf : même si le filtre contient encore des éponges, les bactéries utiles ne survivent pas à plusieurs jours à sec. Prévoyez donc le cyclage avant d'introduire des poissons, et testez l'eau régulièrement. Si le bac vient d'un aquarium malade, remplacez les éponges et désinfectez soigneusement le matériel."
          ]
        }
      ],
      "liensUtiles": [
        {
          "href": "/categorie/cuves",
          "label": "Voir les aquariums d'occasion"
        },
        {
          "href": "/guides/vendre-son-aquarium-occasion",
          "label": "Vendre son aquarium d'occasion"
        },
        {
          "href": "/guides/aquarium-neuf-ou-occasion-comparatif",
          "label": "Aquarium neuf ou d’occasion : comparatif"
        },
        {
          "href": "/guides/demarrer-aquarium-eau-douce",
          "label": "Démarrer un aquarium d’eau douce"
        },
        {
          "href": "/guides/cycle-de-lazote-aquarium",
          "label": "Comprendre le cycle de l’azote"
        }
      ]
    },
    {
      "slug": "vendre-ses-poissons-aquarium",
      "titre": "Vendre ses poissons d'aquarium : bien préparer son annonce et la remise",
      "eyebrow": "Acheter & vendre",
      "description": "Espèce, quantité, photos, transport : comment vendre ses poissons d'aquarium en respectant les animaux et les règles de la plateforme.",
      "datePublication": "2026-10-22",
      "sections": [
        {
          "titre": "Identifier correctement l'espèce",
          "image": {
            "src": "/guides/sections/vendre-ses-poissons-aquarium/1.webp",
            "alt": "Poisson avec son nom commun et son nom scientifique ; certaines espèces sont interdites à la vente"
          },
          "paragraphes": [
            "Indiquez le nom commun et, si possible, le nom scientifique. Une identification précise évite les malentendus et permet à l'acheteur de vérifier la compatibilité avec son bac. Certaines espèces sont protégées ou interdites à la vente : sur Aquatopia, les annonces d'espèces réglementées sont contrôlées avant publication, et certaines demandent une déclaration d'élevage en captivité."
          ]
        },
        {
          "titre": "Des photos qui montrent vraiment vos poissons",
          "image": {
            "src": "/guides/sections/vendre-ses-poissons-aquarium/2.webp",
            "alt": "Photos nettes de ses propres poissons plutôt qu’une image trouvée sur internet"
          },
          "paragraphes": [
            "Photographiez vos propres poissons plutôt que des images trouvées sur internet : l'acheteur veut voir la taille, les couleurs et l'état réel. Des photos nettes, sans reflets sur la vitre, rassurent et accélèrent la vente. Dans votre annonce Aquatopia, ajoutez plusieurs photos : une vue d'ensemble du groupe, puis des gros plans."
          ]
        },
        {
          "titre": "Préciser quantité, âge et conditions d'élevage",
          "image": {
            "src": "/guides/sections/vendre-ses-poissons-aquarium/3.webp",
            "alt": "Informations à donner : âge ou taille, mâles et femelles, nourriture, paramètres de l’eau et lot"
          },
          "paragraphes": [
            "Âge ou taille approximative, nombre de mâles et de femelles, nourriture habituelle et paramètres de l'eau d'origine aident l'acheteur à préparer l'accueil. Si vous proposez un lot, précisez-le dans l'annonce. Ces informations trouvent leur place dans la description de votre annonce Aquatopia, et les acheteurs peuvent compléter par la messagerie.",
            "Un acheteur apprécie aussi de savoir si les poissons sont nés dans votre bac, s'ils ont déjà frayé, et s'ils s'entendent bien avec d'autres espèces. Plus l'annonce est précise, moins vous répondrez aux mêmes questions."
          ]
        },
        {
          "titre": "Remise en main propre et transport",
          "image": {
            "src": "/guides/sections/vendre-ses-poissons-aquarium/4.webp",
            "alt": "Poissons dans un sac avec l’eau du bac, remis en main propre à proximité"
          },
          "paragraphes": [
            "Sur Aquatopia, les animaux vivants se remettent en main propre. Mettez les poissons dans un sac ou un récipient adapté avec l'eau du bac, à l'abri du froid et de la chaleur, et donnez rendez-vous à l'acheteur à proximité. Évitez de les nourrir juste avant le transport.",
            "Pour un transport de plus d'une demi-heure, utilisez un sac solide rempli d'un tiers d'eau et de deux tiers d'air, doublé et fermé par un élastique, puis placé dans un carton ou une boîte isotherme. Évitez les chocs et les écarts de température. Ne nourrissez pas les poissons pendant les 24 heures qui précèdent la remise : ils produisent moins de déchets pendant le trajet."
          ]
        },
        {
          "titre": "Penser au bien-être des poissons",
          "image": {
            "src": "/guides/sections/vendre-ses-poissons-aquarium/5.webp",
            "alt": "Vendre des poissons en bonne santé, signaler un problème et conseiller la quarantaine"
          },
          "paragraphes": [
            "Ne vendez que des animaux en bonne santé et signalez honnêtement un éventuel problème. Conseillez aussi la quarantaine à l'acheteur : un vendeur transparent est un vendeur que l'on recommande."
          ]
        },
        {
          "titre": "Fixer un prix raisonnable",
          "paragraphes": [
            "Comparez avec les annonces similaires (même espèce, même âge, même quantité) avant de fixer votre prix. Un lot de jeunes poissons issus de votre élevage se vend généralement moins cher qu'un couple reproducteur adulte ou qu'une variété rare. Un prix trop élevé décourage, un prix trop bas inquiète sur la santé ou l'origine des poissons."
          ]
        },
        {
          "titre": "Rester dans le cadre de la loi",
          "paragraphes": [
            "Certaines espèces sont soumises à une réglementation (espèces protégées, espèces envahissantes interdites, espèces inscrites à la CITES) et ne peuvent pas être vendues librement. Renseignez-vous avant de publier, et ne proposez jamais un animal dont vous n'êtes pas certain qu'il peut être vendu. Si vous vendez de façon régulière, des obligations spécifiques peuvent s'appliquer : informez-vous auprès des autorités compétentes."
          ]
        },
        {
          "titre": "Ce que l'acheteur doit savoir",
          "paragraphes": [
            "Un bon vendeur donne à l'acheteur les informations qui l'aideront à garder ses nouveaux poissons en bonne santé : température et paramètres de l'eau d'origine, nourriture habituelle, caractère de l'espèce. Cela limite les mauvaises surprises et prépare la réussite de l'acclimatation."
          ]
        }
      ],
      "liensUtiles": [
        {
          "href": "/categorie/vivant",
          "label": "Voir les annonces de poissons et de vivant"
        },
        {
          "href": "/guides/acheter-poissons-aquarium-particulier",
          "label": "Acheter des poissons à un particulier"
        },
        {
          "href": "/guides/acclimater-nouveau-poisson-aquarium",
          "label": "Acclimater un nouveau poisson"
        },
        {
          "href": "/dons",
          "label": "Annonces à donner"
        },
        {
          "href": "/guides/reconnaitre-poisson-malade-stresse",
          "label": "Reconnaître un poisson malade ou stressé"
        }
      ]
    },
    {
      "slug": "acheter-poissons-aquarium-particulier",
      "titre": "Acheter des poissons d'aquarium à un particulier : bien s'y prendre",
      "eyebrow": "Acheter & vendre",
      "description": "Où en trouver, quelles questions poser au vendeur et comment accueillir ses nouveaux poissons : le guide pour acheter entre particuliers.",
      "datePublication": "2026-10-22",
      "sections": [
        {
          "titre": "Pourquoi acheter à un particulier",
          "image": {
            "src": "/guides/sections/acheter-poissons-aquarium-particulier/1.webp",
            "alt": "Poissons nés en aquarium, parents visibles et possibilité de poser ses questions directement au vendeur"
          },
          "paragraphes": [
            "Les particuliers et les éleveurs amateurs proposent souvent des poissons nés en aquarium, déjà habitués à une eau domestique, parfois difficiles à trouver en animalerie. Vous pouvez aussi voir les parents et poser vos questions directement au vendeur. Sur Aquatopia, la catégorie Vivant regroupe les annonces de poissons et d'invertébrés proposées par des particuliers et des éleveurs amateurs, classées par distance."
          ]
        },
        {
          "titre": "Les questions à poser",
          "image": {
            "src": "/guides/sections/acheter-poissons-aquarium-particulier/2.webp",
            "alt": "Âge, taille adulte, alimentation, paramètres de l’eau, santé passée et comportement avec les autres espèces"
          },
          "paragraphes": [
            "Demandez l'âge, la taille adulte, l'alimentation, les paramètres de l'eau du vendeur (pH, dureté, température) et les éventuels problèmes de santé passés. Renseignez-vous aussi sur le comportement des poissons avec d'autres espèces. Sur Aquatopia, la messagerie permet de poser ces questions au vendeur avant le rendez-vous, puis d'observer les poissons à la remise en main propre.",
            "N'hésitez pas à demander des photos ou une courte vidéo avant de vous déplacer : un poisson qui nage normalement, mange et réagit à la présence du vendeur est un bon signe."
          ]
        },
        {
          "titre": "Vérifier avant d'acheter",
          "image": {
            "src": "/guides/sections/acheter-poissons-aquarium-particulier/3.webp",
            "alt": "Poissons à observer : nage normale, nageoires intactes, couleurs vives, pas de points blancs"
          },
          "paragraphes": [
            "Si le rendez-vous le permet, observez les poissons : nage normale, nageoires intactes, couleurs vives, pas de points blancs ni de taches suspectes. Voir le bac du vendeur renseigne aussi sur les conditions d'élevage."
          ]
        },
        {
          "titre": "Préparer son aquarium",
          "image": {
            "src": "/guides/sections/acheter-poissons-aquarium-particulier/4.webp",
            "alt": "Aquarium cyclé et adapté, vérifié avec la fiche de l’espèce avant l’achat"
          },
          "paragraphes": [
            "Votre bac doit être cyclé et adapté à l'espèce (volume, paramètres, compagnons). Consultez la fiche de l'espèce sur Aquatopia avant l'achat pour vérifier que ses besoins correspondent à votre installation."
          ]
        },
        {
          "titre": "Transporter et acclimater",
          "image": {
            "src": "/guides/sections/acheter-poissons-aquarium-particulier/5.webp",
            "alt": "Sac à l’abri du froid pendant le trajet, puis acclimatation progressive et quarantaine éventuelle"
          },
          "paragraphes": [
            "Le sac doit rester à l'abri du froid pendant le trajet. À la maison, laissez-le flotter dans le bac puis acclimatez les poissons progressivement. Si vous avez un bac dédié, une quarantaine limite les risques pour vos autres poissons."
          ]
        },
        {
          "titre": "Reconnaître un vendeur sérieux",
          "paragraphes": [
            "Un vendeur de confiance répond clairement à vos questions, ne cherche pas à vous presser et accepte que vous voyiez les poissons avant de payer. Il vous renseigne sur l'origine des animaux, leur âge, leur alimentation, et reconnaît volontiers les limites de son élevage. Méfiez-vous d'une annonce qui promet des poissons « rares » à un prix dérisoire, ou d'un vendeur qui refuse la remise en main propre."
          ]
        },
        {
          "titre": "Repérer un poisson en bonne santé",
          "paragraphes": [
            "Au moment de la remise, prenez le temps d'observer. Un poisson en forme présente :"
          ],
          "liste": [
            "Une nage fluide, sans balancement ni position anormale.",
            "Des nageoires entières, sans déchirures, sans filaments blanchâtres.",
            "Des couleurs franches et un corps ni creusé ni gonflé.",
            "Une peau sans points blancs, sans plaques ou duvet.",
            "Un comportement actif, qui réagit à la nourriture."
          ]
        },
        {
          "titre": "Vérifier l'espèce avant l'achat",
          "paragraphes": [
            "Vérifiez la taille adulte, le caractère, la température et les paramètres de l'eau de l'espèce proposée. Un poisson vendu juvénile peut atteindre une taille bien plus importante que prévu. Assurez-vous aussi que l'espèce peut légalement être détenue et vendue."
          ]
        },
        {
          "titre": "Après l'achat",
          "paragraphes": [
            "Une quarantaine de deux à quatre semaines dans un bac séparé protège vos autres poissons. Ne nourrissez pas les poissons le jour de leur arrivée et surveillez leur comportement pendant les premiers jours. Si vous constatez un problème de santé, informez le vendeur : cela l'aide à vérifier l'état de son élevage."
          ]
        },
        {
          "titre": "Un achat qui construit une relation",
          "paragraphes": [
            "Acheter à un particulier, c'est aussi nouer un contact utile : un vendeur qui connaît bien son espèce reste souvent joignable pour répondre à vos questions après l'achat, sur l'alimentation, la reproduction ou un souci de santé. N'hésitez pas à lui donner des nouvelles et à revenir vers lui si besoin."
          ]
        }
      ],
      "liensUtiles": [
        {
          "href": "/categorie/vivant",
          "label": "Voir les poissons à vendre"
        },
        {
          "href": "/especes",
          "label": "Consulter les fiches espèces"
        },
        {
          "href": "/guides/acclimater-nouveau-poisson-aquarium",
          "label": "Acclimater un nouveau poisson"
        },
        {
          "href": "/simulateur",
          "label": "Composer son aquarium avec le simulateur"
        },
        {
          "href": "/guides/erreurs-debutant-aquariophilie",
          "label": "Les erreurs de débutant à éviter"
        }
      ]
    },
    {
      "slug": "donner-aquarium-poissons-materiel",
      "titre": "Donner un aquarium, des poissons ou du matériel : comment faire",
      "eyebrow": "Acheter & vendre",
      "description": "Un aquarium dont vous ne voulez plus ? Découvrez comment donner votre matériel et vos poissons à un aquariophile plutôt que de les jeter.",
      "datePublication": "2026-10-22",
      "sections": [
        {
          "titre": "Pourquoi donner plutôt que jeter",
          "image": {
            "src": "/guides/sections/donner-aquarium-poissons-materiel/1.webp",
            "alt": "Du matériel d’aquarium encore utilisable donné à un débutant plutôt que jeté"
          },
          "paragraphes": [
            "Un aquarium, un filtre ou une rampe LED encore utilisables intéressent beaucoup de débutants. Les donner évite le gaspillage et rend service. Pour les poissons, c'est surtout la meilleure façon de leur garantir un bon accueil. Sur Aquatopia, publier un don est gratuit et l'annonce touche des aquariophiles près de chez vous.",
            "Un don peut aussi faire gagner un temps précieux à un débutant : plutôt que d'acheter un équipement neuf, il peut démarrer avec un filtre ou un éclairage déjà éprouvés."
          ]
        },
        {
          "titre": "Publier une annonce de don",
          "image": {
            "src": "/guides/sections/donner-aquarium-poissons-materiel/2.webp",
            "alt": "Choix du type d’annonce « don », avec description, photos et ville"
          },
          "paragraphes": [
            "Dans l'application Aquatopia, choisissez le type « don », décrivez ce que vous donnez, ajoutez des photos et indiquez votre ville. Chaque annonce est d'abord vérifiée par l'équipe, puis les dons apparaissent sur la page des annonces à donner."
          ]
        },
        {
          "titre": "Choisir le bon repreneur",
          "image": {
            "src": "/guides/sections/donner-aquarium-poissons-materiel/3.webp",
            "alt": "Un repreneur dont le bac est prêt, et jamais de relâche d’animaux d’aquarium dans la nature"
          },
          "paragraphes": [
            "Posez quelques questions par la messagerie d'Aquatopia : le bac est-il prêt ? L'espèce est-elle déjà connue du repreneur ? Pour des poissons, évitez de les confier à quelqu'un dont l'aquarium n'est pas cyclé ou adapté. Ne relâchez jamais poissons, plantes ou crevettes d'aquarium dans la nature : cela peut abîmer les milieux naturels."
          ]
        },
        {
          "titre": "Organiser la remise",
          "image": {
            "src": "/guides/sections/donner-aquarium-poissons-materiel/4.webp",
            "alt": "Remise en main propre avec un carton calé pour le matériel et l’eau du bac pour les poissons"
          },
          "paragraphes": [
            "Donnez rendez-vous en main propre, avec l'eau du bac et un emballage adapté pour les poissons, un carton solide et du calage pour le matériel fragile."
          ]
        },
        {
          "titre": "Ce que l'on peut donner",
          "paragraphes": [
            "Beaucoup d'éléments d'aquariophilie trouvent facilement preneur lorsqu'ils sont donnés :"
          ],
          "liste": [
            "Aquariums, meubles et supports en bon état.",
            "Filtres, chauffages, pompes, éclairages encore fonctionnels.",
            "Décor, racines, roches et substrat propres.",
            "Plantes, boutures et surplus d'élevage (crevettes, escargots, poissons).",
            "Livres, accessoires et petit matériel d'entretien."
          ]
        },
        {
          "titre": "Préparer le don de poissons ou de plantes",
          "paragraphes": [
            "Si vous donnez des animaux, informez le repreneur sur leur espèce, leur âge, leur alimentation et leurs besoins. Préparez-les pour le transport dans un sac avec de l'eau du bac, à l'abri des chocs et des écarts de température. Pour des plantes, emballez-les humides, dans un sac fermé, et précisez si elles portent des escargots ou d'autres hôtes inattendus."
          ]
        },
        {
          "titre": "Rester prudent lors de la remise",
          "paragraphes": [
            "Donnez rendez-vous dans un lieu convenu et à une heure précise, et avertissez un proche si vous recevez quelqu'un chez vous. Vous pouvez demander à l'avance quel usage sera fait de l'article, notamment pour les animaux. Un don bien préparé profite à tout le monde : le repreneur reçoit un équipement utile, et vous, la satisfaction d'avoir évité un gaspillage."
          ]
        },
        {
          "titre": "Donner ou vendre : comment choisir",
          "paragraphes": [
            "Si l'article a une vraie valeur (un bac complet, un filtre externe récent), une vente à prix doux est souvent plus juste. Si l'objet est ancien, légèrement abîmé ou si vous voulez simplement qu'il serve à nouveau, le don est la meilleure solution. Pour des animaux, il n'est pas rare de préférer un don à un acheteur choisi plutôt qu'une vente rapide : vous gardez la maîtrise de leur avenir.",
            "Dans tous les cas, soyez transparent sur l'état de ce que vous donnez. Un don honnête, avec ses défauts annoncés, évite les malentendus et laisse un bon souvenir de l'échange des deux côtés."
          ]
        },
        {
          "titre": "Les gestes qui évitent les problèmes",
          "paragraphes": [
            "Pour que le don se passe bien, quelques réflexes simples aident :"
          ],
          "liste": [
            "Nettoyer le matériel à l'eau claire avant la remise, sans produit ménager.",
            "Vider l'aquarium, le sécher et le caler pour le transport.",
            "Retirer les masses filtrantes d'un bac malade plutôt que de les transmettre.",
            "Indiquer clairement l'heure et le lieu du rendez-vous dans la messagerie.",
            "Ne donner un animal qu'à une personne qui a un bac adapté à l'espèce."
          ]
        }
      ],
      "liensUtiles": [
        {
          "href": "/dons",
          "label": "Voir les annonces à donner"
        },
        {
          "href": "/guides/vendre-ses-poissons-aquarium",
          "label": "Vendre ses poissons d'aquarium"
        },
        {
          "href": "/guides/deposer-annonce-aquariophilie-gratuite",
          "label": "Déposer une annonce gratuite"
        },
        {
          "href": "/echanges",
          "label": "Voir les annonces à échanger"
        },
        {
          "href": "/guides/acclimater-nouveau-poisson-aquarium",
          "label": "Bien acclimater un nouveau poisson"
        }
      ]
    },
    {
      "slug": "deposer-annonce-aquariophilie-gratuite",
      "titre": "Déposer une annonce d'aquariophilie gratuite : mode d'emploi",
      "eyebrow": "Acheter & vendre",
      "description": "Comment publier gratuitement une annonce pour vendre, donner ou échanger un aquarium, des poissons, des plantes ou du matériel sur Aquatopia.",
      "datePublication": "2026-10-22",
      "sections": [
        {
          "titre": "Télécharger l'application",
          "image": {
            "src": "/guides/sections/deposer-annonce-aquariophilie-gratuite/1.webp",
            "alt": "Application Aquatopia à installer sur iPhone ou Android, gratuite pour les particuliers"
          },
          "paragraphes": [
            "Aquatopia est gratuite pour les particuliers. Installez l'application sur iPhone ou Android, créez votre compte et complétez votre profil aquariophile."
          ]
        },
        {
          "titre": "Créer son annonce",
          "image": {
            "src": "/guides/sections/deposer-annonce-aquariophilie-gratuite/2.webp",
            "alt": "Choix de la catégorie et du type d’annonce, puis titre, description, photos, ville et prix"
          },
          "paragraphes": [
            "Choisissez la catégorie (vivant, plantes, cuves, matériel, éclairage ou décor) et le type d'annonce : vente, don ou échange. Ajoutez un titre clair, une description, des photos de ce que vous proposez, votre ville et, pour une vente, votre prix.",
            "Prenez quelques minutes pour réfléchir au type d'annonce avant de la rédiger. Une vente demande un prix, un don s'adresse à des repreneurs sérieux, un échange suppose que vous précisiez ce que vous cherchez en retour."
          ]
        },
        {
          "titre": "Faire valider son annonce",
          "image": {
            "src": "/guides/sections/deposer-annonce-aquariophilie-gratuite/3.webp",
            "alt": "Chaque annonce est vérifiée par l’équipe avant sa mise en ligne"
          },
          "paragraphes": [
            "Chaque annonce est vérifiée par l'équipe avant sa mise en ligne. Vous êtes prévenu dès qu'elle est validée, ou si une modification est nécessaire."
          ]
        },
        {
          "titre": "Répondre aux acheteurs",
          "image": {
            "src": "/guides/sections/deposer-annonce-aquariophilie-gratuite/4.webp",
            "alt": "Échanges par la messagerie pour convenir d’un lieu et d’un horaire de remise en main propre"
          },
          "paragraphes": [
            "Les acheteurs vous contactent par la messagerie. Répondez rapidement, convenez d'un lieu et d'un horaire, puis remettez l'article en main propre. Vos conversations restent dans l'application, et vous pouvez signaler une annonce ou bloquer un utilisateur en cas de problème."
          ]
        },
        {
          "titre": "Les erreurs à éviter",
          "image": {
            "src": "/guides/sections/deposer-annonce-aquariophilie-gratuite/5.webp",
            "alt": "Photo floue, titre vague, prix absent et ville manquante : les erreurs qui font fuir les acheteurs"
          },
          "paragraphes": [
            "Des photos floues ou trouvées sur internet, un titre trop vague, un prix absent ou une ville manquante font fuir les acheteurs. Vérifiez aussi que l'espèce proposée est autorisée à la vente."
          ]
        },
        {
          "titre": "Rédiger un bon titre",
          "paragraphes": [
            "Le titre est la première chose que voit un acheteur : il doit dire l'essentiel en quelques mots. Mentionnez ce que vous proposez, la quantité ou le volume, et l'état. Un titre comme « Aquarium 100 L avec meuble, très bon état » est bien plus efficace que « Aquarium à vendre ». Pour le vivant, indiquez le nom de l'espèce et le nombre d'individus."
          ]
        },
        {
          "titre": "Soigner les photos",
          "paragraphes": [
            "Les photos font la moitié de l'annonce. Prenez-les à la lumière du jour, sur un fond dégagé, avec plusieurs angles et des gros plans sur les détails importants. Pour des poissons, photographiez-les dans leur bac, sans reflet sur la vitre. N'utilisez jamais de photos trouvées sur internet : elles trompent l'acheteur et sont souvent refusées à la validation."
          ]
        },
        {
          "titre": "Fixer un prix cohérent",
          "paragraphes": [
            "Regardez les annonces comparables avant de fixer votre prix. Indiquez un prix net, sans ambiguïté, et précisez s'il est légèrement négociable. Un prix réaliste attire des messages rapidement, alors qu'un prix trop haut laisse l'annonce sans réponse."
          ]
        },
        {
          "titre": "Après la remise",
          "paragraphes": [
            "Une fois l'article remis, prévenez les autres personnes qui vous avaient contacté et ne laissez pas une annonce expirée en ligne. Si l'échange s'est bien passé, il peut être utile de garder le contact avec votre acheteur : les aquariophiles sont une communauté où l'on se recroise souvent."
          ]
        },
        {
          "titre": "Le bon contenu pour chaque catégorie",
          "paragraphes": [
            "Chaque catégorie d'annonce appelle des informations spécifiques. Voici ce qu'un acheteur attend de vous :"
          ],
          "liste": [
            "Vivant : espèce, nombre, âge ou taille, origine (élevage), alimentation habituelle.",
            "Plantes : nom de la plante, quantité, état, et mention des éventuels escargots ou algues.",
            "Aquariums : volume, dimensions, marque, état des joints et de la vitre, accessoires inclus.",
            "Matériel et éclairage : marque, modèle, année, puissance, état de fonctionnement.",
            "Décor : nature du matériau (bois, roche), dimensions, préparation."
          ]
        },
        {
          "titre": "Quelques exemples d'annonces réussies",
          "paragraphes": [
            "Une bonne annonce tient en quelques lignes : « Aquarium 100 L (80 × 35 × 40 cm), joints en bon état, avec filtre externe et chauffage, vendu pour passage à un plus grand bac. Photos du bac vide et des accessoires. Remise en main propre à Montpellier. » On y retrouve le volume, l'état, ce qui est inclus, la raison de la vente et la ville. C'est exactement ce que cherche l'acheteur."
          ]
        }
      ],
      "liensUtiles": [
        {
          "href": "/guides/vendre-son-aquarium-occasion",
          "label": "Vendre son aquarium d'occasion"
        },
        {
          "href": "/guides/vendre-ses-poissons-aquarium",
          "label": "Vendre ses poissons d'aquarium"
        },
        {
          "href": "/dons",
          "label": "Annonces à donner"
        },
        {
          "href": "/faq",
          "label": "FAQ pour les débutants"
        },
        {
          "href": "/guides/donner-aquarium-poissons-materiel",
          "label": "Donner son aquarium et son matériel"
        }
      ]
    },
    {
      "slug": "aquarium-occasion-60-100-200-litres",
      "titre": "Aquarium d'occasion 60 L, 100 L ou 200 L : quel volume choisir ?",
      "eyebrow": "Acheter & vendre",
      "description": "Aquarium 60 L, 100 L ou 200 L d'occasion : avantages de chaque volume, poissons adaptés, poids à prévoir et points à vérifier avant d'acheter chez un particulier.",
      "datePublication": "2026-10-23",
      "sections": [
        {
          "titre": "Le volume avant le prix",
          "image": {
            "src": "/guides/sections/aquarium-occasion-60-100-200-litres/1.webp",
            "alt": "Trois volumes d’aquarium d’occasion à comparer avant de regarder le prix"
          },
          "paragraphes": [
            "Quand on cherche un aquarium d'occasion, on regarde souvent le prix en premier. C'est le volume qu'il faut décider d'abord : il détermine les espèces que vous pourrez accueillir, la stabilité de l'eau et la place que le bac prendra chez vous. Un aquarium de 60 L, de 100 L ou de 200 L ne se gère pas de la même façon.",
            "Les annonces indiquent le plus souvent le volume en litres. Vérifiez qu'il s'agit du volume brut (dimensions du bac) et non du volume réellement utilisable : une fois le sol, les décors et le niveau d'eau en dessous du bord pris en compte, il reste environ 10 à 15 % de moins."
          ]
        },
        {
          "titre": "Aquarium d'occasion de 60 litres",
          "image": {
            "src": "/guides/sections/aquarium-occasion-60-100-200-litres/2.webp",
            "alt": "Un bac de 60 litres pour petits poissons, crevettes ou betta seul, léger mais peu tolérant aux erreurs"
          },
          "paragraphes": [
            "C'est un bon bac de départ pour de petits poissons, des crevettes ou un betta seul. Il tient sur un meuble courant et reste léger à déplacer. En contrepartie, le petit volume laisse peu de marge d'erreur : un excès de nourriture ou un filtre en panne se répercute vite sur la qualité de l'eau."
          ]
        },
        {
          "titre": "Aquarium d'occasion de 100 litres",
          "image": {
            "src": "/guides/sections/aquarium-occasion-60-100-200-litres/3.webp",
            "alt": "Un bac de 100 litres, souvent le meilleur compromis pour débuter"
          },
          "paragraphes": [
            "Le 100 L est souvent le meilleur compromis pour débuter. Il permet un petit aquarium communautaire (poissons de petite taille et paisibles) avec des plantes, tout en restant abordable et facile à installer. C'est aussi l'un des volumes les plus fréquents en occasion, donc celui où l'on a le plus de choix. Sur Aquatopia, la catégorie Aquariums permet de comparer les annonces de 60, 100 et 200 litres près de chez vous."
          ]
        },
        {
          "titre": "Aquarium d'occasion de 200 litres",
          "image": {
            "src": "/guides/sections/aquarium-occasion-60-100-200-litres/4.webp",
            "alt": "Un grand bac de 200 litres plus stable, pour des espèces plus grandes ou des groupes plus nombreux"
          },
          "paragraphes": [
            "Un grand volume est plus stable : les paramètres varient moins vite, ce qui pardonne davantage les erreurs d'entretien. Il ouvre aussi la porte à des espèces plus grandes ou à des groupes plus nombreux, à condition de vérifier les besoins de chaque espèce dans les fiches espèces d'Aquatopia.",
            "Attention au poids : un litre d'eau pèse un kilo, donc un 200 L pèse déjà plus de 200 kg une fois rempli, sans compter le bac, le sol et le meuble. Vérifiez que le meuble et le sol peuvent le supporter, et prévoyez de l'aide pour le transport."
          ]
        },
        {
          "titre": "Les points à vérifier sur un bac d'occasion",
          "image": {
            "src": "/guides/sections/aquarium-occasion-60-100-200-litres/5.webp",
            "alt": "Joints, vitres, dimensions et test de remplissage pendant 24 heures"
          },
          "paragraphes": [
            "Contrôlez l'état des joints en silicone (pas de zones décollées ou noircies), l'absence de rayures profondes ou d'éclats sur les vitres, et demandez les dimensions exactes. Si possible, remplissez le bac d'eau pendant 24 heures chez vous avant de l'installer pour vérifier qu'il ne fuit pas.",
            "Demandez aussi ce qui est inclus : meuble, filtre, chauffage, éclairage, couvercle. Un lot complet est souvent plus avantageux que les éléments achetés séparément. Posez ces questions au vendeur par la messagerie d'Aquatopia avant de vous déplacer."
          ]
        },
        {
          "titre": "Que peut-on mettre dans chaque volume ?",
          "paragraphes": [
            "Le volume n'est qu'un point de départ : chaque espèce a ses propres besoins, détaillés dans les fiches espèces. À titre d'ordre de grandeur :"
          ],
          "liste": [
            "60 L : un Betta, des crevettes, quelques petits poissons de banc ou un petit groupe de Guppys.",
            "100 L : un bac communautaire de petits poissons paisibles, avec des Corydoras et des plantes.",
            "200 L : un banc plus important, des poissons de taille moyenne comme les Scalaires, ou des cichlidés d'Afrique."
          ]
        },
        {
          "titre": "Faut-il viser plus grand ?",
          "paragraphes": [
            "Dans le doute, prenez le plus grand volume que vous pouvez accueillir, entretenir et transporter. Un aquarium plus grand offre plus de choix d'espèces et plus de stabilité. L'occasion permet d'ailleurs de viser plus grand pour le même budget qu'un petit bac neuf. Veillez toutefois à ne pas dépasser ce que votre sol, votre meuble et votre agenda d'entretien peuvent supporter."
          ]
        }
      ],
      "liensUtiles": [
        {
          "href": "/categorie/cuves",
          "label": "Aquariums d'occasion à vendre"
        },
        {
          "href": "/guides/acheter-aquarium-occasion-verifications",
          "label": "Acheter un aquarium d'occasion : points à vérifier"
        },
        {
          "href": "/guides/quel-volume-aquarium-choisir-espece",
          "label": "Quel volume pour quelle espèce"
        },
        {
          "href": "/simulateur",
          "label": "Simulateur d'aquarium"
        },
        {
          "href": "/guides/meilleur-aquarium-pour-debutant",
          "label": "Quel aquarium choisir pour débuter"
        }
      ]
    },
    {
      "slug": "materiel-aquarium-occasion-filtre-chauffage",
      "titre": "Matériel d'aquarium d'occasion : filtre, chauffage, éclairage, que peut-on acheter ?",
      "eyebrow": "Acheter & vendre",
      "description": "Filtre, chauffage, éclairage, pompe : ce qu'on peut acheter d'occasion sans risque, ce qu'il faut tester avant, et ce qu'il vaut mieux prendre neuf.",
      "datePublication": "2026-10-23",
      "sections": [
        {
          "titre": "Ce qui s'achète bien d'occasion",
          "image": {
            "src": "/guides/sections/materiel-aquarium-occasion-filtre-chauffage/1.webp",
            "alt": "Meuble, décor, éclairage LED, filtre externe et écumeur : du matériel qui s’use peu"
          },
          "paragraphes": [
            "Le matériel d'aquariophilie d'occasion permet de faire de vraies économies, surtout pour les éléments qui s'usent peu : meuble, décor, éclairage LED, filtre externe ou écumeur en bon état. Ces équipements changent souvent de main parce que leur propriétaire change de bac, pas parce qu'ils sont défectueux. Sur Aquatopia, les catégories Matériel et Éclairage rassemblent ces annonces de particuliers, classées par distance."
          ]
        },
        {
          "titre": "Acheter un filtre d'occasion",
          "image": {
            "src": "/guides/sections/materiel-aquarium-occasion-filtre-chauffage/2.webp",
            "alt": "Contrôle des joints, de l’hélice, des raccords et des tuyaux d’un filtre d’occasion"
          },
          "paragraphes": [
            "Avant d'acheter un filtre d'aquarium d'occasion, vérifiez les joints, l'hélice de la pompe, les raccords et les tuyaux. Un moteur qui fait un bruit anormal ou qui chauffe est un mauvais signe. Demandez si le filtre a déjà servi dans un bac malade : la masse filtrante d'un bac inconnu peut transporter des parasites, il vaut mieux la remplacer.",
            "Un filtre se teste facilement chez le vendeur : branché dans un seau d'eau quelques minutes, il doit démarrer sans à-coups et ne pas fuir. Prévenez le vendeur par la messagerie d'Aquatopia pour qu'il prévoie un seau d'eau."
          ]
        },
        {
          "titre": "Chauffage et thermostat",
          "image": {
            "src": "/guides/sections/materiel-aquarium-occasion-filtre-chauffage/3.webp",
            "alt": "Test du chauffage dans un seau avec un thermomètre pendant 24 heures avant utilisation"
          },
          "paragraphes": [
            "Le chauffage est un équipement de sécurité : un thermostat qui dérive peut chauffer ou refroidir un bac trop fort. D'occasion, testez-le dans un seau avec un thermomètre pendant 24 heures avant de le mettre dans l'aquarium, ou préférez-le neuf si vous avez un doute."
          ]
        },
        {
          "titre": "Éclairage",
          "image": {
            "src": "/guides/sections/materiel-aquarium-occasion-filtre-chauffage/4.webp",
            "alt": "Rampe LED durable contre tube fluorescent ancien qui perd de l’intensité"
          },
          "paragraphes": [
            "Les rampes LED vieillissent bien et se revendent facilement. Les tubes fluorescents perdent en intensité et en spectre avec le temps : s'ils sont anciens, comptez leur remplacement. Vérifiez aussi l'état des câbles et de la prise."
          ]
        },
        {
          "titre": "Ce qu'il vaut mieux acheter neuf",
          "image": {
            "src": "/guides/sections/materiel-aquarium-occasion-filtre-chauffage/5.webp",
            "alt": "Kits de test, conditionneurs, nourriture et matériel électrique abîmé : à acheter neuf"
          },
          "paragraphes": [
            "Les kits de test dont les réactifs ont une date limite, les conditionneurs d'eau, la nourriture et tout équipement électrique dont le câble est abîmé ne s'achètent pas d'occasion. La sécurité et la fiabilité des mesures passent avant l'économie."
          ]
        },
        {
          "titre": "Les tests à faire chez le vendeur",
          "paragraphes": [
            "Quand c'est possible, testez le matériel sur place avant de payer. Voici une routine simple :"
          ],
          "liste": [
            "Brancher le filtre dans un seau d'eau : il doit démarrer vite, sans bruit anormal ni fuite.",
            "Vérifier l'état de l'hélice et des joints : ils ne doivent être ni fendus ni durcis.",
            "Contrôler le câble électrique : pas de gaine abîmée ni de fil dénudé.",
            "Faire chauffer l'eau avec le chauffage dans un seau et vérifier la température au thermomètre.",
            "Allumer chaque canal de la rampe LED pour vérifier qu'aucune zone ne reste éteinte."
          ]
        },
        {
          "titre": "Quand c'est une bonne affaire",
          "paragraphes": [
            "Un matériel d'occasion est intéressant quand son prix est nettement inférieur à celui du neuf, qu'il est de marque connue (les pièces détachées sont plus faciles à trouver) et que le vendeur sait en parler. Un filtre externe d'une bonne marque, revendu à moitié prix, est un excellent investissement. À l'inverse, un matériel inconnu, sans modèle identifiable et sans possibilité de test n'est pas une affaire, quel que soit son prix."
          ]
        },
        {
          "titre": "Hygiène et remise en route",
          "paragraphes": [
            "Nettoyez tout le matériel d'occasion avant utilisation : rincez à l'eau claire, brossez les tuyaux, remplacez les mousses et les joints usés. Si le matériel vient d'un aquarium dont vous ne connaissez pas l'état de santé, désinfectez-le soigneusement avec une solution d'eau de Javel très diluée, rincée abondamment et séchée à l'air libre avant d'être installé."
          ]
        }
      ],
      "liensUtiles": [
        {
          "href": "/categorie/materiel",
          "label": "Matériel d'aquarium d'occasion"
        },
        {
          "href": "/guides/quel-filtre-choisir-selon-volume",
          "label": "Quel filtre choisir selon le volume"
        },
        {
          "href": "/guides/aquarium-neuf-ou-occasion-comparatif",
          "label": "Aquarium neuf ou d'occasion"
        },
        {
          "href": "/guides/vendre-son-aquarium-occasion",
          "label": "Vendre son matériel d'occasion"
        }
      ]
    },
    {
      "slug": "aquarium-occasion-pas-cher-ou-trouver",
      "titre": "Aquarium d'occasion pas cher : où le trouver et comment bien négocier",
      "eyebrow": "Acheter & vendre",
      "description": "Où trouver un aquarium d'occasion pas cher, comment estimer un bon prix, négocier poliment et éviter les pièges des annonces trop belles pour être vraies.",
      "datePublication": "2026-10-23",
      "sections": [
        {
          "titre": "Où chercher un aquarium d'occasion",
          "image": {
            "src": "/guides/sections/aquarium-occasion-pas-cher-ou-trouver/1.webp",
            "alt": "Particuliers, annonces en ligne, annonces à donner, clubs et bourses : les endroits où chercher"
          },
          "paragraphes": [
            "Les meilleures affaires se trouvent généralement chez des particuliers qui arrêtent l'aquariophilie, déménagent ou changent de bac. Vous pouvez consulter les annonces d'aquariums d'occasion sur Aquatopia, regarder les annonces à donner, passer par les clubs et associations aquariophiles de votre région ou fréquenter les bourses aux poissons.",
            "Les annonces sont classées par distance : cherchez d'abord près de chez vous, vous économiserez le transport, souvent le vrai point délicat avec un grand bac."
          ]
        },
        {
          "titre": "Comment estimer un bon prix",
          "image": {
            "src": "/guides/sections/aquarium-occasion-pas-cher-ou-trouver/2.webp",
            "alt": "Volume, âge, joints et équipements fournis déterminent le prix ; un lot complet est souvent plus avantageux"
          },
          "paragraphes": [
            "Il n'existe pas de barème : le prix dépend du volume, de l'âge, de l'état des joints et de ce qui est fourni avec le bac. En règle générale, un aquarium d'occasion se vend nettement moins cher que le neuf, et un lot complet (bac, meuble, filtre, éclairage) coûte moins que les éléments achetés un par un. Comparez plusieurs annonces de même volume avant de décider."
          ]
        },
        {
          "titre": "Négocier sans froisser",
          "image": {
            "src": "/guides/sections/aquarium-occasion-pas-cher-ou-trouver/3.webp",
            "alt": "Acheteur sérieux et disponible qui signale calmement les défauts et propose d’enlever rapidement le bac"
          },
          "paragraphes": [
            "Un vendeur accepte plus volontiers de baisser son prix quand l'acheteur est sérieux et disponible. Venez voir le bac, signalez calmement les défauts constatés (rayures, silicone vieilli), proposez de l'enlever rapidement et de vous charger du démontage. Une offre raisonnable, argumentée, passe mieux qu'un prix cassé donné sans voir le bac. Dans la messagerie d'Aquatopia, restez courtois et précis : proposez un prix et un créneau pour venir chercher le bac."
          ]
        },
        {
          "titre": "Les pièges à éviter",
          "image": {
            "src": "/guides/sections/aquarium-occasion-pas-cher-ou-trouver/4.webp",
            "alt": "Prix anormalement bas, annonce sans photo et vendeur qui refuse de montrer le bac"
          },
          "paragraphes": [
            "Méfiez-vous d'un prix très en dessous du marché sans explication, d'une annonce sans photo ou avec des photos qui semblent copiées, et d'un vendeur qui refuse de vous laisser voir le bac. Contrôlez toujours l'étanchéité, l'état des vitres et du silicone avant de payer. Remettez le bac en main propre plutôt que d'accepter un envoi : c'est d'ailleurs pour cela que les annonces d'Aquatopia sont classées par distance."
          ]
        },
        {
          "titre": "Et si c'est gratuit ?",
          "image": {
            "src": "/guides/sections/aquarium-occasion-pas-cher-ou-trouver/5.webp",
            "alt": "Aquarium donné trouvé dans les annonces à donner, dont il faut vérifier l’étanchéité"
          },
          "paragraphes": [
            "Certains aquariums sont simplement donnés. Consultez la page des annonces à donner d'Aquatopia : c'est parfois la solution la moins chère pour débuter, à condition de vérifier l'étanchéité du bac comme pour n'importe quel achat."
          ]
        },
        {
          "titre": "Les bons moments pour acheter",
          "paragraphes": [
            "Les annonces sont plus nombreuses en fin d'été et au début de l'année, quand les particuliers déménagent, changent de logement ou mettent fin à leur passion. Les périodes de vacances sont aussi propices aux dons. Soyez réactif : les meilleures affaires partent vite, surtout quand le prix est correct et la ville proche."
          ]
        },
        {
          "titre": "Calculer le vrai coût d'un achat",
          "paragraphes": [
            "Un aquarium pas cher n'est une bonne affaire que si le coût total reste raisonnable. Avant de vous décider, comptez :"
          ],
          "liste": [
            "Le transport, et l'aide nécessaire pour le charger et le décharger.",
            "Le remplacement éventuel du silicone, du chauffage ou des mousses du filtre.",
            "Le meuble ou le support adapté si le bac n'en a pas.",
            "Le cyclage et les premiers produits (conditionneur, tests)."
          ]
        },
        {
          "titre": "Se préparer avant de se déplacer",
          "paragraphes": [
            "Prévoyez de quoi tester le bac (un seau d'eau, une lampe de poche), un mètre pour vérifier les dimensions, des sangles ou des couvertures pour le transport, et de l'argent liquide ou un mode de paiement convenu à l'avance. Prévenez le vendeur de votre heure d'arrivée et soyez ponctuel : un acheteur sérieux et organisé a plus de chances d'obtenir un bon prix."
          ]
        }
      ],
      "liensUtiles": [
        {
          "href": "/categorie/cuves",
          "label": "Aquariums d'occasion à vendre"
        },
        {
          "href": "/dons",
          "label": "Annonces à donner"
        },
        {
          "href": "/guides/acheter-aquarium-occasion-verifications",
          "label": "Acheter un aquarium d'occasion : points à vérifier"
        },
        {
          "href": "/guides/budget-demarrer-aquarium",
          "label": "Budget pour démarrer un aquarium"
        },
        {
          "href": "/guides/aquarium-occasion-60-100-200-litres",
          "label": "Aquarium d’occasion : quel volume choisir"
        }
      ]
    },
    {
      "slug": "bourse-aux-poissons-aquariophilie",
      "titre": "Bourse aux poissons : comment ça marche et comment en trouver une près de chez soi",
      "eyebrow": "Acheter & vendre",
      "description": "Une bourse aquariophile, c'est quoi ? Comment la trouver, bien s'y préparer, transporter ses poissons et la compléter avec des annonces en ligne.",
      "datePublication": "2026-10-23",
      "sections": [
        {
          "titre": "Qu'est-ce qu'une bourse aux poissons ?",
          "image": {
            "src": "/guides/sections/bourse-aux-poissons-aquariophilie/1.webp",
            "alt": "Stand de bourse aquariophile avec poissons, crevettes, plantes et boutures"
          },
          "paragraphes": [
            "Une bourse aquariophile est une rencontre où des éleveurs et des passionnés vendent ou échangent des poissons, des crevettes, des plantes et des boutures. Elle est en général organisée par un club ou une association aquariophile, à une date et dans un lieu annoncés à l'avance. On y trouve souvent des espèces et des variétés difficiles à voir en animalerie."
          ]
        },
        {
          "titre": "Comment trouver une bourse près de chez vous",
          "image": {
            "src": "/guides/sections/bourse-aux-poissons-aquariophilie/2.webp",
            "alt": "Clubs et associations aquariophiles et groupes de passionnés qui relaient les événements"
          },
          "paragraphes": [
            "Le plus fiable est de contacter les clubs et associations aquariophiles de votre région : ce sont eux qui organisent les bourses et connaissent le calendrier. Les groupes de passionnés sur les réseaux sociaux relaient aussi beaucoup d'événements. Notez que les dates sont peu fréquentes : selon l'endroit où vous habitez, il peut y avoir plusieurs mois entre deux bourses."
          ]
        },
        {
          "titre": "Bien se préparer",
          "image": {
            "src": "/guides/sections/bourse-aux-poissons-aquariophilie/3.webp",
            "alt": "Glacière, sacs adaptés, trajet court et arrivée tôt pour une bourse aquariophile"
          },
          "paragraphes": [
            "Apportez des sacs ou des boîtes adaptés, de quoi garder l'eau à bonne température (une glacière convient très bien) et prévoyez un trajet court. Arrivez tôt, c'est là que le choix est le plus large. Posez des questions au vendeur sur l'origine des animaux, l'alimentation et les paramètres d'eau qu'il utilise.",
            "À la maison, mettez les nouveaux arrivants en quarantaine si vous le pouvez et acclimatez-les doucement avant de les introduire dans le bac."
          ]
        },
        {
          "titre": "Compléter avec des annonces en ligne",
          "image": {
            "src": "/guides/sections/bourse-aux-poissons-aquariophilie/4.webp",
            "alt": "Une bourse a lieu quelques fois par an alors que les annonces en ligne restent disponibles en permanence"
          },
          "paragraphes": [
            "Une bourse n'a lieu que quelques fois par an. Pour acheter, vendre ou échanger le reste de l'année, les annonces entre particuliers, comme celles d'Aquatopia, restent disponibles en permanence : vous y trouvez des poissons, des plantes, du matériel et des aquariums classés par distance. Les règles sur les espèces protégées s'appliquent aussi bien en bourse que sur une annonce : vérifiez toujours qu'une espèce peut légalement être vendue. Après une bourse, Aquatopia permet aussi de vendre ou d'échanger gratuitement vos boutures et surplus d'élevage."
          ]
        },
        {
          "titre": "Ce que l'on y trouve",
          "paragraphes": [
            "Les bourses sont l'occasion de rencontrer des éleveurs passionnés, souvent spécialisés : guppys d'élevage, Discus, crevettes sélectionnées, plantes rares, cichlidés. On y trouve aussi du matériel d'occasion, des livres et des conseils qu'aucune animalerie ne peut offrir. L'ambiance est conviviale et les prix souvent très raisonnables."
          ]
        },
        {
          "titre": "Les règles à connaître",
          "paragraphes": [
            "Les vendeurs et les acheteurs doivent respecter les mêmes règles qu'ailleurs :"
          ],
          "liste": [
            "Ne proposer que des animaux en bonne santé, correctement identifiés.",
            "Respecter les règles sur les espèces protégées ou interdites à la vente.",
            "Ne jamais relâcher de poissons ou de plantes dans la nature.",
            "Respecter le bien-être des animaux pendant le transport et l'exposition.",
            "Se renseigner auprès du club organisateur sur les conditions de vente."
          ]
        },
        {
          "titre": "Vendre à une bourse",
          "paragraphes": [
            "Si vous souhaitez vendre vos surplus d'élevage, contactez le club organisateur à l'avance pour connaître les modalités d'inscription et les règles. Préparez des sacs propres, étiquetés avec le nom de l'espèce, et un petit nombre d'individus de belle qualité plutôt qu'un grand nombre mal préparés. Pensez à apporter un peu de documentation sur l'espèce, pour renseigner les acheteurs."
          ]
        },
        {
          "titre": "Un bon moyen d'apprendre",
          "paragraphes": [
            "Une bourse est aussi une excellente école. Vous y croisez des passionnés qui partagent volontiers leur expérience : comment ils élèvent telle espèce, quel matériel ils utilisent, quelles erreurs ils ont commises. Venez avec une liste de questions et, si vous débutez, avec une idée précise des espèces qui vous intéressent. Quelques conversations suffisent souvent à éviter un mauvais achat, et c'est parfois là que naissent les échanges de boutures et de bons plans entre aquariophiles."
          ]
        }
      ],
      "liensUtiles": [
        {
          "href": "/categorie/vivant",
          "label": "Poissons et crevettes à vendre"
        },
        {
          "href": "/echanges",
          "label": "Annonces d'échange"
        },
        {
          "href": "/guides/acclimater-nouveau-poisson-aquarium",
          "label": "Acclimater un nouveau poisson"
        },
        {
          "href": "/guides/acheter-poissons-aquarium-particulier",
          "label": "Acheter des poissons à un particulier"
        }
      ]
    },
    {
      "slug": "leboncoin-ou-site-specialise-aquariophilie",
      "titre": "Leboncoin ou site spécialisé : où vendre et acheter en aquariophilie ?",
      "eyebrow": "Acheter & vendre",
      "description": "Site d'annonces généraliste ou application spécialisée dans l'aquarium : audience, tri des annonces, modération et gratuité. Comment choisir pour acheter ou vendre.",
      "datePublication": "2026-10-23",
      "sections": [
        {
          "titre": "Les sites généralistes : une grande audience",
          "image": {
            "src": "/guides/sections/leboncoin-ou-site-specialise-aquariophilie/1.webp",
            "alt": "Un site généraliste très connu, avec une grande audience pour les objets grand public"
          },
          "paragraphes": [
            "Les plateformes d'annonces généralistes, comme Leboncoin, ont un énorme avantage : tout le monde les connaît, donc votre annonce peut être vue par beaucoup de personnes. C'est utile pour un objet qui intéresse un large public, comme un meuble ou un aquarium courant."
          ]
        },
        {
          "titre": "Leurs limites en aquariophilie",
          "image": {
            "src": "/guides/sections/leboncoin-ou-site-specialise-aquariophilie/2.webp",
            "alt": "Annonces d’aquariophilie mélangées à des meubles, voitures et objets divers sans filtres adaptés"
          },
          "paragraphes": [
            "Dans un site qui vend de tout, les annonces d'aquariophilie sont mélangées aux autres catégories. Il est souvent difficile de filtrer par type d'animal, par volume de bac ou par biotope, et le vocabulaire spécialisé (cyclage, nano, récifal) n'y est pas toujours compris des acheteurs. La vente d'animaux vivants y demande aussi une vigilance particulière sur les espèces autorisées."
          ]
        },
        {
          "titre": "Un site d'annonces d'aquariophilie entre particuliers",
          "image": {
            "src": "/guides/sections/leboncoin-ou-site-specialise-aquariophilie/3.webp",
            "alt": "Marketplace dédiée à l’aquarium avec catégories et acheteurs qui parlent le même langage"
          },
          "paragraphes": [
            "Une marketplace dédiée à l'aquarium, comme Aquatopia, réunit des gens qui parlent la même langue : acheteurs, vendeurs et éleveurs savent ce qu'est une crevette Neocaridina ou un bac cyclé. Les annonces sont classées par catégorie (vivant, plantes, aquariums, matériel, éclairage, décor), par biotope, et par distance, ce qui facilite la remise en main propre.",
            "Chaque annonce est vérifiée par l'équipe avant sa mise en ligne, et l'application est gratuite, pour vendre comme pour donner ou échanger."
          ]
        },
        {
          "titre": "Quelle plateforme choisir ?",
          "image": {
            "src": "/guides/sections/leboncoin-ou-site-specialise-aquariophilie/4.webp",
            "alt": "Publier un aquarium ou du matériel sur les deux types de sites, les animaux vivants sur une application spécialisée"
          },
          "paragraphes": [
            "Il n'y a pas à choisir : rien ne vous empêche de publier au même endroit sur plusieurs sites. Pour un aquarium, un filtre ou du matériel, publiez sur les deux. Pour des poissons, des crevettes, des plantes ou des coraux, privilégiez une application spécialisée comme Aquatopia, où les acheteurs sont plus qualifiés et où les règles sur les espèces sont rappelées."
          ]
        },
        {
          "titre": "Les critères pour comparer les plateformes",
          "paragraphes": [
            "Pour choisir où publier votre annonce, comparez quelques critères essentiels :"
          ],
          "liste": [
            "La taille de l'audience : une plateforme généraliste touche plus de monde, mais moins de passionnés.",
            "La qualité des acheteurs : sur une plateforme spécialisée, ils connaissent le sujet et posent les bonnes questions.",
            "Le classement et les filtres : par catégorie, par biotope, par distance.",
            "La modération : une annonce vérifiée rassure les acheteurs et écarte les abus.",
            "Le coût : certaines plateformes proposent des options payantes."
          ]
        },
        {
          "titre": "Les précautions valables partout",
          "paragraphes": [
            "Quelle que soit la plateforme, les bons réflexes restent les mêmes : privilégier la remise en main propre, vérifier le matériel avant de payer, ne jamais communiquer de données bancaires, se méfier des prix trop beaux pour être vrais. Pour les animaux vivants, vérifiez que l'espèce peut être légalement vendue et que vous pouvez lui offrir des conditions adaptées."
          ]
        },
        {
          "titre": "Combiner les deux approches",
          "paragraphes": [
            "Rien n'empêche de tester les deux. Un aquarium et son meuble peuvent être publiés sur une plateforme généraliste pour toucher un large public, tandis que les poissons, les plantes et le matériel spécialisé trouvent plus facilement preneur auprès d'aquariophiles. Quand vous recevez une première réponse, retirez ou mettez à jour les autres annonces pour éviter les doublons."
          ]
        },
        {
          "titre": "Un conseil pour les débutants",
          "paragraphes": [
            "Si vous débutez, privilégiez les annonces où le vendeur décrit précisément son matériel ou ses animaux et accepte de répondre à vos questions. Un vendeur passionné vous renseignera volontiers sur l'entretien, l'alimentation et la compatibilité des espèces : c'est une aide précieuse que vous ne trouverez pas toujours dans une annonce très courte. Sur une plateforme spécialisée, ces échanges font partie de l'esprit de la communauté, ce qui rassure autant les acheteurs que les vendeurs."
          ]
        }
      ],
      "liensUtiles": [
        {
          "href": "/guides/deposer-annonce-aquariophilie-gratuite",
          "label": "Déposer une annonce gratuite"
        },
        {
          "href": "/guides/vendre-son-aquarium-occasion",
          "label": "Vendre son aquarium d'occasion"
        },
        {
          "href": "/guides/acheter-poissons-aquarium-particulier",
          "label": "Acheter des poissons à un particulier"
        },
        {
          "href": "/faq",
          "label": "FAQ pour les débutants"
        }
      ]
    },
    {
      "slug": "reprise-aquarium-vendre-donner-echanger",
      "titre": "Reprise d'aquarium : vendre, donner ou échanger son ancien aquarium ?",
      "eyebrow": "Acheter & vendre",
      "description": "Que faire de son ancien aquarium : reprise en magasin, vente, don ou échange. Préparer le démontage, nettoyer le bac, replacer les poissons et recycler le matériel.",
      "datePublication": "2026-10-23",
      "sections": [
        {
          "titre": "La reprise en magasin",
          "image": {
            "src": "/guides/sections/reprise-aquarium-vendre-donner-echanger/1.webp",
            "alt": "Magasin dont la reprise n’est pas systématique et peu valorisée, face à la vente à un particulier"
          },
          "paragraphes": [
            "Certains magasins peuvent proposer une reprise, mais ce n'est pas systématique et la valeur proposée est généralement faible. Renseignez-vous avant de vous déplacer. Vendre ou donner à un particulier est souvent plus intéressant et plus rapide : une annonce sur Aquatopia touche des aquariophiles près de chez vous."
          ]
        },
        {
          "titre": "Vendre, donner ou échanger",
          "image": {
            "src": "/guides/sections/reprise-aquarium-vendre-donner-echanger/2.webp",
            "alt": "Trois options pour son ancien aquarium : vendre, donner ou échanger"
          },
          "paragraphes": [
            "Si votre aquarium est en bon état, vendez-le : c'est la voie la plus rentable, surtout avec son meuble et son équipement. Si le bac est ancien ou si vous voulez simplement le faire partir, donnez-le : vous le trouverez vite preneur. Enfin, vous pouvez l'échanger contre un autre matériel, des plantes ou des poissons.",
            "Dans les trois cas, publiez des photos nettes, indiquez le volume exact, l'âge et ce qui est inclus. Sur Aquatopia, vous choisissez le type d'annonce (vente, don ou échange) en la publiant, et c'est gratuit pour les particuliers."
          ]
        },
        {
          "titre": "Préparer le démontage",
          "image": {
            "src": "/guides/sections/reprise-aquarium-vendre-donner-echanger/3.webp",
            "alt": "Débrancher le matériel, replacer les poissons avant de vider le bac, sans jamais les relâcher dans la nature"
          },
          "paragraphes": [
            "Débranchez d'abord tout le matériel électrique. Replacez les poissons avant de vider le bac : ne les relâchez jamais dans la nature, c'est dangereux pour les écosystèmes et interdit pour de nombreuses espèces. Donnez-les, vendez-les ou échangez-les via une annonce Aquatopia (catégorie Vivant).",
            "Videz et rincez le bac à l'eau claire sans savon ni produit chimique, qui laissent des résidus nocifs pour les futurs poissons. Un peu de vinaigre blanc dilué enlève le calcaire, rincez ensuite abondamment. Laissez sécher avant de remettre le bac à l'acheteur."
          ]
        },
        {
          "titre": "Et le matériel hors d'usage ?",
          "image": {
            "src": "/guides/sections/reprise-aquarium-vendre-donner-echanger/4.webp",
            "alt": "Matériel électrique hors d’usage à déposer en déchetterie ou point de collecte et non à la poubelle ordinaire"
          },
          "paragraphes": [
            "Un chauffage, une pompe ou un éclairage qui ne fonctionnent plus ne se vendent pas : ils sont à déposer en déchetterie ou dans un point de collecte des appareils électriques, pas à la poubelle ordinaire."
          ]
        },
        {
          "titre": "Comparer les trois options",
          "paragraphes": [
            "Chaque solution répond à une situation particulière :"
          ],
          "liste": [
            "Vendre : la voie la plus rentable, surtout pour un bac en bon état avec son meuble et son matériel.",
            "Donner : la solution la plus rapide pour un bac ancien ou pour libérer de la place sans attendre.",
            "Échanger : idéale pour obtenir du matériel, des plantes ou des poissons en retour, sans dépenser.",
            "Reprise en magasin : pratique, mais généralement peu avantageuse."
          ]
        },
        {
          "titre": "Fixer le bon prix ou le bon échange",
          "paragraphes": [
            "Pour une vente, comparez avec des annonces similaires et acceptez une marge de négociation. Pour un échange, précisez ce que vous cherchez et ce que vous proposez, avec des valeurs comparables. Un échange équilibré laisse les deux parties satisfaites. Pour un don, soyez clair sur l'état de l'objet et sur les conditions de retrait."
          ]
        },
        {
          "titre": "Planifier le calendrier",
          "paragraphes": [
            "Ne commencez pas le démontage avant d'avoir trouvé un repreneur. Publiez d'abord l'annonce, convenez d'une date, puis préparez le bac quelques jours avant la remise. Pensez à prévoir une solution pour vos poissons : un bac provisoire, un accueil chez un ami aquariophile ou une annonce de don ou de vente. Un démontage préparé évite de précipiter des animaux dans un contenant inadapté."
          ]
        },
        {
          "titre": "Un geste pour la communauté",
          "paragraphes": [
            "Remettre un aquarium en circulation, c'est offrir à un autre passionné la possibilité de démarrer à moindre coût, et éviter que du matériel durable ne finisse inutilisé. Que vous le vendiez, le donniez ou l'échangiez, un aquarium bien préparé et bien présenté trouve presque toujours preneur rapidement. Prenez le temps de bien faire les choses, vous y gagnerez une transaction sereine et peut-être un nouveau contact dans la communauté aquariophile."
          ]
        }
      ],
      "liensUtiles": [
        {
          "href": "/guides/vendre-son-aquarium-occasion",
          "label": "Vendre son aquarium d'occasion"
        },
        {
          "href": "/guides/donner-aquarium-poissons-materiel",
          "label": "Donner son aquarium et son matériel"
        },
        {
          "href": "/echanges",
          "label": "Annonces d'échange"
        },
        {
          "href": "/dons",
          "label": "Annonces à donner"
        },
        {
          "href": "/guides/budget-demarrer-aquarium",
          "label": "Budget pour démarrer un aquarium"
        }
      ]
    },
];

export function fetchGuideParSlug(slug: string): Guide | null {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}

// Couvertures : une image par guide (public/guides/couvertures/<slug>.webp).
// Ajoutées catégorie par catégorie : seuls les slugs listés ici affichent une couverture.
const SLUGS_AVEC_COUVERTURE = new Set<string>([
  // Débuter
  'demarrer-aquarium-eau-douce',
  'choisir-son-premier-poisson',
  'budget-demarrer-aquarium',
  'erreurs-debutant-aquariophilie',
  'acclimater-nouveau-poisson-aquarium',
  'quel-volume-aquarium-choisir-espece',
  'aquarium-pour-enfant-bonne-idee',
  'premiere-semaine-nouvel-aquarium',
  // Comprendre
  'cycle-de-lazote-aquarium',
  'parametres-eau-ph-gh-kh',
  'reconnaitre-poisson-malade-stresse',
  'role-du-filtre-dans-aquarium',
  'cycle-sans-poisson-vs-avec-poisson',
  'role-des-plantes-aquarium-equilibre',
  'difference-eau-osmosee-eau-robinet-aquarium',
  'comprendre-la-photoperiode-aquarium',
  'vendre-son-aquarium-occasion',
  'acheter-aquarium-occasion-verifications',
  'vendre-ses-poissons-aquarium',
  'acheter-poissons-aquarium-particulier',
  'donner-aquarium-poissons-materiel',
  'deposer-annonce-aquariophilie-gratuite',
  'aquarium-occasion-60-100-200-litres',
  'materiel-aquarium-occasion-filtre-chauffage',
  'aquarium-occasion-pas-cher-ou-trouver',
  'bourse-aux-poissons-aquariophilie',
  'leboncoin-ou-site-specialise-aquariophilie',
  'reprise-aquarium-vendre-donner-echanger',
  'aquarium-recifal-par-ou-commencer',
  'materiel-recifal-ecumeur-osmolateur-brassage',
  'coraux-mous-lps-sps-differences',
  'calcium-kh-magnesium-recifal',
  'acclimatation-goutte-a-goutte-poissons-coraux',
  'quarantaine-poissons-recifal-pourquoi',
  'eclairage-recifal-choisir-led',
  'nourrir-un-aquarium-recifal',
  'hivernage-poissons-bassin',
  'demarrer-bassin-jardin',
  'printemps-bassin-redemarrage',
  'eau-verte-bassin-solutions',
  'choisir-poissons-bassin-jardin',
  'plantes-bassin-oxygenantes-epuratrices',
  'pompe-filtration-bassin-bien-choisir',
  'predateurs-bassin-proteger-poissons',
  'bien-nourrir-poissons-aquarium',
  'changement-eau-aquarium-frequence-methode',
  'nettoyer-aquarium-sans-stresser-poissons',
  'lutter-contre-les-algues-aquarium',
  'vacances-aquarium-que-faire',
  'tailler-entretenir-plantes-aquarium',
  'entretien-filtre-aquarium-bonne-frequence',
  'aquarium-eau-trouble-causes',
  'aquascaping-decor-naturel',
  'choisir-son-substrat-aquarium',
  'plantes-faciles-aquarium-debutant',
  'eclairage-bac-plante-choisir',
  'bois-flotte-aquarium-preparation',
  'roches-pierres-aquarium-lesquelles-choisir',
  'aquarium-biotope-reproduire-milieu-naturel',
  'co2-aquarium-plante-utile',
  'choisir-filtration-aquarium',
  'chauffage-aquarium-bien-choisir-puissance',
  'pompe-a-air-utilite-aquarium',
  'kit-test-eau-aquarium-lequel-choisir',
  'epuisette-materiel-manipulation-poissons',
  'minuterie-programmateur-aquarium-utilite',
  'meuble-aquarium-bien-choisir',
  'osmoseur-aquarium-a-quoi-ca-sert',
  'aquarium-neuf-ou-occasion-comparatif',
  'meilleur-aquarium-pour-debutant',
  'quel-filtre-choisir-selon-volume',
  'eau-douce-ou-eau-de-mer-comment-choisir',
  'aquarium-communautaire-ou-espece-unique',
  'led-vs-neon-eclairage-aquarium-comparatif',
  'filtre-interne-ou-externe-comparatif',
  'aquarium-eau-froide-ou-tropical',
]);

export function couvertureGuide(slug: string): string | null {
  return SLUGS_AVEC_COUVERTURE.has(slug) ? `/guides/couvertures/${slug}.webp` : null;
}
