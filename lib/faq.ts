// FAQ complète pour débutants en aquariophilie — distincte du petit FAQ de
// la page d'accueil (qui porte sur l'application elle-même). Ici, ce sont
// des questions génériques sur le loisir, qui captent des recherches Google
// beaucoup plus larges que le nom de l'application.
export type FaqItem = { question: string; reponse: string };
export type FaqCategorie = { titre: string; slug: string; questions: FaqItem[] };

export const FAQ_CATEGORIES: FaqCategorie[] = [
  {
    titre: 'Pour démarrer',
    slug: 'demarrer',
    questions: [
      {
        question: 'Quel volume d’aquarium choisir pour commencer ?',
        reponse:
          "Un volume d'au moins 54 à 60 litres est plus facile à équilibrer qu'un petit bac : les paramètres de l'eau y varient beaucoup moins vite, ce qui laisse plus de marge d'erreur au débutant.",
      },
      {
        question: 'Combien de temps avant de pouvoir mettre des poissons ?',
        reponse:
          "Il faut compter 4 à 6 semaines de cyclage (installation des bactéries bénéfiques) avant d'introduire le moindre poisson, au risque de les exposer à des pics d'ammoniac toxiques.",
      },
      {
        question: 'Faut-il un chauffage même en été ?',
        reponse:
          "Oui pour la plupart des poissons tropicaux, dont la température idéale (24-27°C) dépasse souvent la température ambiante même en été, et surtout la nuit ou en cas de baisse soudaine.",
      },
      {
        question: 'Eau du robinet ou eau osmosée, laquelle utiliser ?',
        reponse:
          "L'eau du robinet convient à la grande majorité des poissons d'eau douce une fois le chlore neutralisé (avec un conditionneur d'eau). L'eau osmosée n'est généralement nécessaire que pour des espèces exigeant une eau très douce, ou en récifal.",
      },
      {
        question: 'Combien ça coûte de démarrer un aquarium ?',
        reponse:
          "Pour un premier bac de 60 à 100 litres équipé (aquarium, filtre, chauffage, éclairage, substrat), il faut généralement compter plusieurs centaines d'euros en neuf — nettement moins en occasion, ce qui explique le succès du marché de seconde main dans ce loisir.",
      },
      {
        question: 'Peut-on mettre un poisson dans un bocal sans filtre ?',
        reponse:
          "Ce n'est pas recommandé : sans filtration ni cyclage, les déchets s'accumulent rapidement et la qualité de l'eau se dégrade vite, ce qui met en danger le poisson.",
      },
      {
        question: 'Combien de poissons puis-je mettre dans mon aquarium ?',
        reponse:
          "Il n'existe pas de règle universelle fiable (la fameuse règle du « 1 cm par litre » est trop simpliste) : la bonne charge dépend du volume, de la filtration, de la taille adulte et du comportement de chaque espèce. Mieux vaut peupler progressivement et observer l'évolution des paramètres.",
      },
    ],
  },
  {
    titre: 'Cyclage et paramètres de l’eau',
    slug: 'cyclage-parametres',
    questions: [
      {
        question: 'Pourquoi mon eau est trouble ou verte après quelques jours ?',
        reponse:
          "Une eau trouble blanchâtre signale souvent un pic bactérien lié au cyclage en cours ; une eau verte est généralement due à une prolifération d'algues microscopiques, favorisée par un excès de lumière ou de nutriments (nitrates, phosphates).",
      },
      {
        question: 'Mes poissons remontent à la surface pour respirer, est-ce grave ?',
        reponse:
          "Oui, c'est souvent un signe de manque d'oxygène ou de pic d'ammoniac/nitrites — il faut tester l'eau immédiatement et faire un changement d'eau partiel en cas d'anomalie.",
      },
      {
        question: 'Faut-il tester l’eau tous les jours ?',
        reponse:
          "Pendant le cyclage, oui, un suivi rapproché est utile. Une fois le bac stabilisé, un test hebdomadaire (ou avant/après tout changement notable) suffit généralement.",
      },
      {
        question: 'Combien de temps garder un aquarium sans poisson avant d’en ajouter ?',
        reponse:
          "Le temps que le cycle de l'azote soit établi, soit généralement 4 à 6 semaines, confirmé par des tests montrant ammoniac et nitrites à zéro 24h après un ajout.",
      },
      {
        question: 'Comment savoir si mon eau est trop dure ou trop douce pour mes poissons ?',
        reponse:
          "Un test de GH (dureté générale) donne cette information ; il suffit ensuite de comparer la valeur mesurée à la fourchette recommandée pour l'espèce concernée, disponible sur la plupart des fiches d'élevage.",
      },
    ],
  },
  {
    titre: 'Poissons et cohabitation',
    slug: 'poissons-cohabitation',
    questions: [
      {
        question: 'Quels poissons peuvent vivre ensemble ?',
        reponse:
          "Cela dépend du caractère (paisible ou territorial), de la taille adulte et des paramètres d'eau recherchés par chaque espèce. En général, mieux vaut associer des poissons de gabarit et de tempérament similaires plutôt que de mélanger au hasard.",
      },
      {
        question: 'Combien de poissons par litre ?',
        reponse:
          "Il n'y a pas de ratio fiable : la charge dépend surtout de la filtration, du volume réel disponible et de la taille adulte des espèces, pas d'une simple formule.",
      },
      {
        question: 'Pourquoi mon poisson en attaque un autre ?',
        reponse:
          "Les causes les plus fréquentes sont la défense d'un territoire, une hiérarchie de groupe qui s'installe, un manque d'individus pour une espèce de banc (qui se reporte alors sur les autres), ou un bac trop petit pour le nombre ou le caractère des espèces en présence.",
      },
      {
        question: 'Peut-on mettre un poisson rouge avec des poissons tropicaux ?',
        reponse:
          "Ce n'est pas recommandé : le poisson rouge préfère une eau plus fraîche que la plupart des poissons tropicaux et grandit bien plus que ce qu'on imagine, ce qui le rend incompatible avec un bac tropical classique.",
      },
      {
        question: 'Un Betta peut-il vivre avec d’autres poissons ?',
        reponse:
          "Oui dans certains cas, avec des espèces paisibles et peu susceptibles de le stresser (à nageoires courtes, discrètes), mais jamais avec un autre Betta mâle, et deux mâles ne doivent jamais cohabiter.",
      },
      {
        question: 'Comment reconnaître un poisson malade ?',
        reponse:
          "Des signes comme la nage en biais, l'apathie, la perte d'appétit, des taches, des nageoires abîmées ou une respiration anormalement rapide doivent alerter — une observation quotidienne permet de repérer ces changements tôt.",
      },
      {
        question: 'Combien de temps vit un poisson d’aquarium ?',
        reponse:
          "Cela varie énormément selon l'espèce : quelques années pour un Guppy, une dizaine d'années pour beaucoup de Cichlidés, plusieurs décennies pour un Koï ou un poisson rouge bien entretenu.",
      },
      {
        question: 'Comment reconnaître un poisson mâle d’une femelle ?',
        reponse:
          "Le dimorphisme sexuel varie selon l'espèce : couleurs plus vives ou nageoires plus développées chez le mâle pour beaucoup d'espèces (Guppy, Betta), ventre plus arrondi chez la femelle pour d'autres — mieux vaut se référer à la fiche de l'espèce précise.",
      },
      {
        question: 'Mes poissons se reproduisent, que faire des bébés ?',
        reponse:
          "Il faut anticiper le devenir des alevins avant même la reproduction (bac séparé, dons ou reventes) : de nombreuses espèces communes se reproduisent très facilement en aquarium et peuvent vite dépasser la capacité du bac.",
      },
    ],
  },
  {
    titre: 'Alimentation',
    slug: 'alimentation',
    questions: [
      {
        question: 'Combien de fois par jour nourrir ses poissons ?',
        reponse:
          "Une à deux fois par jour suffit pour la plupart des espèces, en ne donnant que ce qu'elles consomment en 2 à 3 minutes.",
      },
      {
        question: 'Que faire pendant les vacances (qui nourrit les poissons) ?',
        reponse:
          "La plupart des poissons adultes supportent très bien un jeûne d'une à deux semaines sans problème. Pour une absence plus longue, un distributeur automatique ou un voisin de confiance reste préférable aux blocs de nourriture à dissolution lente, souvent source de pollution de l'eau.",
      },
      {
        question: 'Peut-on trop nourrir ses poissons ?',
        reponse:
          "Oui, et c'est même la cause la plus fréquente de problèmes d'eau : les surplus non consommés se décomposent et polluent l'aquarium, provoquant pics d'ammoniac et prolifération d'algues.",
      },
    ],
  },
  {
    titre: 'Entretien',
    slug: 'entretien',
    questions: [
      {
        question: 'À quelle fréquence changer l’eau ?',
        reponse:
          "Un changement partiel de 10 à 20 % par semaine est une bonne base pour la majorité des aquariums d'eau douce, à ajuster selon la charge en poissons et les résultats des tests.",
      },
      {
        question: 'Comment nettoyer la vitre sans stresser les poissons ?',
        reponse:
          "Un aimant ou une raclette dédiée à l'aquarium, utilisée par mouvements lents et réguliers, suffit généralement sans perturber les poissons ni abîmer la vitre.",
      },
      {
        question: 'Faut-il nettoyer le filtre, et comment ?',
        reponse:
          "Oui, mais en rinçant les masses filtrantes dans de l'eau prélevée dans l'aquarium (jamais à l'eau du robinet, qui tuerait les bactéries bénéfiques), et sans tout nettoyer en même temps pour ne pas perturber le cycle de l'azote.",
      },
      {
        question: 'Pourquoi j’ai des algues qui envahissent mon bac ?',
        reponse:
          "Un excès de lumière (durée ou intensité) combiné à un excès de nutriments (nitrates, phosphates, souvent liés à une suralimentation) est la cause la plus fréquente d'invasion d'algues.",
      },
      {
        question: 'Combien de temps laisser la lumière allumée par jour ?',
        reponse:
          "8 à 10 heures par jour est une bonne base pour un aquarium planté classique ; réduire la durée est souvent la première solution en cas d'invasion d'algues.",
      },
    ],
  },
  {
    titre: 'Plantes',
    slug: 'plantes',
    questions: [
      {
        question: 'Quelles plantes ne demandent pas de CO2 ?',
        reponse:
          "Anubias, Java Fern (Microsorum), mousses (Java moss) et Cryptocoryne comptent parmi les plantes les plus tolérantes, capables de bien pousser sans apport de CO2.",
      },
      {
        question: 'Pourquoi mes plantes jaunissent ou fondent ?',
        reponse:
          "Un manque de lumière ou de nutriments, ou une adaptation en cours après plantation (la « fonte » initiale de certaines plantes cultivées hors d'eau) sont les causes les plus fréquentes.",
      },
      {
        question: 'Faut-il un substrat spécial pour les plantes ?',
        reponse:
          "Pour un bac peu planté, un substrat neutre suffit ; pour un bac fortement planté, un substrat technique ou nutritif favorise nettement la croissance des racines et limite les carences.",
      },
    ],
  },
  {
    titre: 'Récifal et eau de mer',
    slug: 'recifal',
    questions: [
      {
        question: 'Quelle différence entre eau douce et eau de mer pour débuter ?',
        reponse:
          "Le récifal demande des paramètres plus stables et précis (salinité, calcium, KH), un matériel plus spécifique (écumeur, brassage) et un budget de départ généralement plus élevé que l'eau douce.",
      },
      {
        question: 'Combien de temps avant de pouvoir mettre un poisson dans un récifal ?',
        reponse:
          "Comme en eau douce, il faut d'abord laisser le bac cycler (plusieurs semaines), souvent avec l'ajout de roches vivantes qui accélèrent l'installation d'une bonne base bactérienne.",
      },
      {
        question: 'Pourquoi mes coraux ferment ou blanchissent ?',
        reponse:
          "Un stress lié à une variation de paramètres (température, salinité, éclairage), un brassage inadapté ou une acclimatation trop rapide en sont les causes les plus courantes — un blanchissement prolongé signale souvent l'expulsion des algues symbiotiques du corail.",
      },
      {
        question: 'Faut-il obligatoirement un écumeur ?',
        reponse:
          "Ce n'est pas absolument obligatoire sur tous les systèmes, mais c'est fortement recommandé sur la plupart des bacs récifaux classiques pour maintenir une bonne qualité d'eau dans la durée.",
      },
      {
        question: 'Comment fabriquer son eau de mer ?',
        reponse:
          "De l'eau osmosée est mélangée à du sel marin de synthèse dans les proportions indiquées par le fabricant, jusqu'à obtenir la densité (salinité) visée, généralement autour de 1,025.",
      },
    ],
  },
  {
    titre: 'Bassin',
    slug: 'bassin',
    questions: [
      {
        question: 'Mes poissons de bassin peuvent-ils rester dehors en hiver ?',
        reponse:
          "Oui pour la plupart des Koï et poissons rouges, à condition que le bassin soit assez profond (80 cm à 1 mètre minimum) pour ne pas geler entièrement.",
      },
      {
        question: 'Faut-il une pompe été comme hiver ?',
        reponse:
          "Les pratiques varient selon le climat local : certains réduisent le débit en hiver pour éviter le gel des canalisations, d'autres arrêtent la filtration biologique le temps que les bactéries redeviennent actives au printemps.",
      },
      {
        question: 'Combien de Koï pour un bassin de X litres ?',
        reponse:
          "Les Koï grandissent beaucoup (jusqu'à 60-90 cm à l'âge adulte) : mieux vaut raisonner en volume disponible par poisson adulte plutôt qu'en nombre de poissons juvéniles achetés au départ.",
      },
      {
        question: 'Pourquoi l’eau de mon bassin devient verte l’été ?',
        reponse:
          "Une prolifération d'algues microscopiques favorisée par le soleil direct et l'excès de nutriments (déjections, feuilles en décomposition) en est généralement la cause — une filtration adaptée et un peu d'ombre limitent le phénomène.",
      },
    ],
  },
  {
    titre: 'Achat et vente entre particuliers',
    slug: 'achat-vente',
    questions: [
      {
        question: 'Comment savoir si un vendeur est sérieux ?',
        reponse:
          "Des photos réelles et récentes de l'annonce, une description précise et une communication claire sur la messagerie sont de bons indicateurs — n'hésitez pas à poser vos questions avant de vous déplacer.",
      },
      {
        question: 'Peut-on se faire livrer des poissons par la poste ?',
        reponse:
          "Non, l'envoi postal d'animaux vivants n'est pas autorisé : toutes les remises d'animaux doivent se faire en main propre, entre l'acheteur et le vendeur.",
      },
      {
        question: 'Comment transporter des poissons sur un trajet de plusieurs heures ?',
        reponse:
          "Un sac de transport rempli aux deux tiers d'oxygène (ou une glacière isotherme pour les trajets longs) et à l'abri des écarts de température limite le stress — mieux vaut aussi éviter de nourrir les poissons juste avant le transport.",
      },
      {
        question: 'Que vérifier avant d’acheter un aquarium d’occasion ?',
        reponse:
          "L'étanchéité (traces de fuite, état du silicone), l'ancienneté du bac et l'état du matériel fourni (filtre, chauffage) sont les points essentiels à vérifier, idéalement lors d'une remise en main propre.",
      },
      {
        question: 'Comment estimer le prix de revente de son matériel ?',
        reponse:
          "Comparer les annonces similaires (même modèle, état comparable) déjà publiées est la méthode la plus fiable pour fixer un prix cohérent avec le marché de l'occasion.",
      },
    ],
  },
];
