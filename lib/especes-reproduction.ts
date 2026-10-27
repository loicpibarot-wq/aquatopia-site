// Tutoriels de reproduction en aquarium, espèce par espèce (poissons vendables
// uniquement : pas d'espèce interdite ni soumise à autorisation).
//
// Chaque texte est rédigé d'après des sources publiques recoupées (SeriouslyFish,
// Planet Catfish, Loaches.com, Fishkeeper, Wikipédia, publications scientifiques,
// programmes d'élevage de poissons marins). Quand une espèce ne se reproduit pas
// en aquarium amateur, la fiche le dit honnêtement (faisable: false) au lieu
// d'inventer des étapes. Le même objet alimente la section affichée ET la FAQ
// déclarée à Google : jamais deux contenus différents.

export type NiveauRepro =
  | 'Très facile'
  | 'Facile'
  | 'Modérée'
  | 'Difficile'
  | 'Très difficile'
  | 'Impossible en captivité';

export interface ReproductionEspece {
  niveau: NiveauRepro;
  /** false : la reproduction n'est pas réalisée (ou pas réalisable) en aquarium amateur. */
  faisable: boolean;
  /** Mode de reproduction, ex. « Vivipare ». */
  methode?: string;
  /** Texte d'introduction propre à l'espèce. */
  resume: string;
  materiel?: string[];
  etapes?: string[];
  /** Élevage des alevins / larves. */
  alevins?: string;
  /** Point d'attention. */
  precaution?: string;
}

const r = (
  niveau: NiveauRepro,
  methode: string,
  resume: string,
  materiel: string[],
  etapes: string[],
  alevins: string,
  precaution?: string,
): ReproductionEspece => ({ niveau, faisable: true, methode, resume, materiel, etapes, alevins, precaution });

// Espèce dont la reproduction n'est pas réalisée en aquarium amateur.
const nr = (niveau: NiveauRepro, resume: string, precaution?: string): ReproductionEspece => ({
  niveau,
  faisable: false,
  resume,
  precaution,
});

const MAT_VIVIPARE = [
  'Un bac de naissance de 20 à 30 L, ou un aquarium bien garni de plantes',
  'Plantes touffues et flottantes (mousse de Java, cératophylle, plantes flottantes) pour cacher les alevins',
  'Nauplies d’artémia ou flocons réduits en poudre pour les alevins',
];

const MAT_PONTE_DISPERSEE = [
  'Un petit bac de ponte (environ 40 à 50 cm de long), tamisé ou presque noir',
  'Un fond de maille grossière, de billes de verre ou de gazon synthétique, ou des touffes de mousse de Java et des fibres de ponte, pour que les œufs échappent aux parents',
  'Un petit filtre à éponge branché sur une pompe à air, réglé très doucement',
  'Une alimentation riche en proies vivantes ou congelées pour conditionner les adultes',
];

const MAT_CORYDORAS = [
  'Un bac bien oxygéné, avec du courant, et de l’eau un peu plus fraîche pour les changements d’eau (50 à 70 % du volume)',
  'Des proies vivantes ou congelées pour conditionner le groupe (vers de vase, vers blancs, daphnies)',
  'Un peu de bleu de méthylène ou des cônes d’aulne contre les moisissures, et une pipette pour retirer les œufs abîmés',
  'Une fine couche de sable au fond du bac d’élevage',
];

const MAT_NID_BULLES = [
  'Un bac de reproduction de faible hauteur (15 à 20 cm d’eau), avec couvercle bien ajusté pour garder l’air chaud et humide au-dessus de la surface',
  'Des plantes flottantes (ou un morceau de polystyrène) et des plantes à feuilles fines, pour que le mâle ancre son nid',
  'Un filtre à éponge doux, branché sur une pompe à air',
  'Des infusoires ou un aliment liquide pour alevins, puis des nauplies d’artémia',
];

const MAT_PONTE_MAILLE = [
  'Un bac de ponte tamisé, peu éclairé',
  'Un fond de maille, de gazon synthétique ou de mousse de Java, pour que les œufs échappent aux parents',
  'Un filtre à éponge ou une pierre à air, réglé doucement',
  'Des paramécies ou un aliment de 5 à 50 microns pour les premiers jours, puis des nauplies d’artémia',
];

const MAT_CLOWN = [
  'Un couple stable, acheté déjà formé ou grandi ensemble à partir de jeunes, de préférence issus d’élevage',
  'Un support de ponte : pot en terre cuite, carrelage ou pierre plate',
  'Un petit bac d’élevage d’environ 40 L, avec chauffage, diffuseur d’air et filtre à éponge mûri depuis au moins une semaine, éclairage très faible et parois masquées',
  'Des cultures de rotifères et de phytoplancton prêtes avant la ponte',
];

const ETAPES_CLOWN = [
  'Formez un couple stable : achetez un couple déjà formé ou faites grandir ensemble de jeunes poissons. Un jeune couple peut mettre un an ou deux avant de pondre, un couple établi beaucoup moins longtemps.',
  'Placez un pot en terre cuite, un carrelage ou une pierre plate : le couple nettoie la surface choisie (souvent l’intérieur d’un pot) avant de pondre.',
  'La femelle pond des centaines d’œufs orange que le mâle féconde puis ventile jusqu’à l’éclosion.',
  'Les œufs éclosent en 7 à 8 jours en général, le plus souvent de nuit. Le bac d’élevage et les rotifères doivent être prêts avant.',
  'Le soir de l’éclosion, coupez les pompes et attirez les larves avec une lampe de poche faible pour les rassembler, puis transférez-les dans le bac d’élevage.',
];

const ALEVINS_CLOWN =
  'Pendant les dix premiers jours, les larves ne mangent que des proies vivantes : des rotifères enrichis au phytoplancton (technique de l’eau verte). La métamorphose commence vers le 10e jour et se termine vers le 20e, quand les jeunes ressemblent à de petits adultes : c’est l’étape la plus délicate, qui demande un bac stable, nettoyé avant les jours 8 à 9, puis sans gros changement d’eau. Les nauplies d’artémia s’introduisent ensuite avec prudence, puis des aliments secs très fins à partir de deux semaines environ.';

const PREC_CLOWN =
  'Les difficultés fréquentes sont un mauvais taux d’éclosion, des larves qui ne se nourrissent pas et le passage aux nauplies d’artémia.';

const clown = (resume: string): ReproductionEspece =>
  r('Modérée', 'Œufs collés sur un support, gardés par le mâle', resume, MAT_CLOWN, ETAPES_CLOWN, ALEVINS_CLOWN, PREC_CLOWN);

const MAT_SEAHORSE = [
  'Un couple adulte, de préférence né en élevage',
  'Un bac de mise bas séparé, où le mâle est placé avant la naissance',
  'Des copépodes et des rotifères pour les premiers jours, puis des nauplies d’artémia enrichies',
  'Plus tard, des mysis vivantes et des cyclops, puis des mysis congelées',
];

const ETAPES_SEAHORSE = [
  'Réunissez un couple adulte : le mâle porte une poche incubatrice sous le ventre, la femelle un ovipositeur.',
  'La femelle dépose ses œufs dans la poche du mâle, qui les féconde et les garde.',
  'La gestation dure jusqu’à environ 3 semaines selon l’espèce et la température. Placez le mâle dans le bac de mise bas avant la naissance.',
  'Le mâle met bas de quelques jeunes à plusieurs centaines, parfois un millier.',
  'Retirez le mâle si besoin et occupez-vous tout de suite des jeunes : les premiers jours sont les plus critiques.',
];

const PREC_SEAHORSE =
  'Tous les hippocampes sont inscrits à l’annexe II de la CITES : le commerce international doit être légal et suivi. Renseignez-vous sur les documents nécessaires avant de céder des animaux.';

const TEXTE_CHIRURGIEN =
  'Seules huit espèces de chirurgiens ont été reproduites en captivité, en laboratoire ou à petite échelle par quelques producteurs : le chirurgien jaune n’a été élevé pour la première fois qu’en 2015 et le chirurgien bleu seulement en petits lots. Il n’existe pas de méthode à la portée d’un amateur, et les poissons vendus sont en pratique prélevés dans la nature.';

const TEXTE_LABRE =
  'Aucun labre d’ornement n’est produit commercialement : tous les labres du commerce sont prélevés dans la nature, et moins de dix espèces ont été reproduites en captivité. Il n’existe pas de méthode à la portée d’un amateur.';

const TEXTE_NON_DOCUMENTE =
  'À notre connaissance, aucune reproduction de cette espèce n’est documentée en aquarium amateur. La grande majorité des poissons marins d’ornement sont encore prélevés dans la nature : environ 398 espèces marines ont été reproduites en captivité, dont une quarantaine seulement sont couramment disponibles.';

const TEXTE_ANGE_NAIN =
  'Les poissons-anges nains (genre Centropyge) vivent en harem : ce sont des hermaphrodites protogynes, des femelles dont certaines deviennent mâles en l’absence de mâle dominant. Leurs œufs, fragiles, flottent grâce à une goutte d’huile, et l’élevage des larves est resté très difficile ; il n’a été réussi que dans des structures spécialisées, par exemple à Hawaï. Aucun protocole accessible à un amateur n’est publié.';

const TEXTE_DEMOISELLE_CHRYSIPTERA =
  'Parmi les 28 genres de demoiselles, seuls les poissons-clowns (Amphiprion et Premnas) sont élevés à l’échelle commerciale. Les tentatives d’élevage avec le genre Chrysiptera ont eu peu de succès : les larves, très petites à l’éclosion, ne peuvent pas manger les rotifères. Cette reproduction n’est pas réalisable par un amateur.';

const TEXTE_DASCYLLUS =
  'Les Dascyllus pondent en aquarium : dans un rapport d’éleveur sur le Dascyllus à trois points, un couple a pondu environ tous les 9 à 10 jours une masse d’environ 1 000 œufs sur une roche, que le mâle nettoie ; les œufs ont éclos en 4 à 5 jours, une trentaine de minutes après l’extinction des lumières. Mais les larves n’ont pas été élevées, et les tentatives d’élevage de Dascyllus ont eu peu de succès : le Dascyllus à trois bandes n’a été élevé qu’en laboratoire, avec du plancton sauvage. Cette reproduction n’est pas réalisable par un amateur.';

export const REPRODUCTIONS: Record<string, ReproductionEspece> = {
  // ── Vivipares ──
  'guppy': r(
    'Très facile',
    'Vivipare',
    'Le guppy est vivipare : la femelle porte ses œufs dans son corps et met bas des alevins déjà formés, qui nagent dès la naissance. La gestation dure environ 4 semaines (25 à 35 jours en élevage) et une portée compte en général de 5 à 60 alevins.',
    MAT_VIVIPARE,
    [
      'Gardez plus de femelles que de mâles (au moins 2 femelles pour 1 mâle) : les mâles poursuivent les femelles sans relâche.',
      'Une seule fécondation suffit : la femelle stocke le sperme et peut donner plusieurs portées pendant 6 mois ou plus sans mâle. Pour contrôler les croisements, séparez les femelles des mâles dès que les sexes se distinguent.',
      'Repérez la gestation : la tache gravide sombre, derrière la nageoire anale, fonce et le ventre s’arrondit.',
      'Avant la mise bas, garnissez le bac de plantes denses et de plantes flottantes (ou préparez un bac de naissance planté).',
      'Après la naissance, retirez la femelle ou ramassez les alevins : les adultes mangent les petits.',
      'Élevez les alevins à part, avec une nourriture très fine plusieurs fois par jour.',
    ],
    'Les alevins nagent et mangent dès la naissance : nauplies d’artémia ou flocons pulvérisés, en petites quantités plusieurs fois par jour. Gardez-les séparés des adultes jusqu’à ce qu’ils soient trop gros pour être avalés.',
    'Une femelle enchaîne les portées : prévoyez à l’avance où placer les alevins avant de laisser un groupe se reproduire librement.',
  ),
  'molly-voile-noir': r(
    'Très facile',
    'Vivipare',
    'Le molly est vivipare et se reproduit très facilement dès que le groupe compte un mâle et plusieurs femelles. La gestation dure de 4 à 8 semaines selon la température et la variété, et la portée peut atteindre une centaine d’alevins, déjà assez gros pour accepter des nauplies d’artémia ou des flocons pulvérisés.',
    MAT_VIVIPARE,
    [
      'Formez un groupe avec un mâle pour 2 ou 3 femelles : les mâles sont très insistants.',
      'Garnissez le bac de plantes denses : sans cachettes, les alevins sont mangés par les adultes.',
      'Quand la femelle est visiblement ronde, installez-la seule dans un bac de naissance planté (les filets de ponte sont déconseillés : trop petits pour élever les alevins).',
      'Après la mise bas, remettez la femelle dans le bac principal sans attendre.',
      'Élevez les alevins à part ; une femelle peut avoir de nouvelles portées sans nouvel accouplement.',
    ],
    'Les alevins naissent assez gros : nauplies d’artémia ou flocons pulvérisés dès le premier jour, plusieurs fois par jour.',
    'Les mâles harcèlent les femelles : ne gardez jamais un mâle avec une seule femelle.',
  ),
  'molly-ballon': r(
    'Très facile',
    'Vivipare',
    'Variété ballon du molly, il se reproduit exactement comme les autres mollies : vivipare, gestation de 4 à 8 semaines selon la température, portées pouvant atteindre une centaine d’alevins.',
    MAT_VIVIPARE,
    [
      'Formez un groupe avec un mâle pour 2 ou 3 femelles pour répartir le harcèlement.',
      'Garnissez le bac de plantes denses et de plantes flottantes.',
      'Installez la femelle gestante seule dans un bac de naissance planté quand elle est bien ronde.',
      'Remettez-la dans le bac principal juste après la mise bas.',
      'Élevez les alevins à part avec des nauplies d’artémia ou des flocons pulvérisés.',
    ],
    'Les alevins naissent assez gros et mangent dès la naissance : nauplies d’artémia ou flocons pulvérisés plusieurs fois par jour.',
    'Les mâles harcèlent les femelles : ne gardez jamais un mâle avec une seule femelle.',
  ),
  'molly-voile-de-lyre': r(
    'Très facile',
    'Vivipare',
    'Le molly voile de lyre (forme à grandes nageoires du molly voilier) est vivipare. La gestation dure environ 4 semaines à 2 mois et une portée peut compter de 20 à 150 alevins. Il apprécie une eau dure et alcaline, parfois additionnée d’un peu de sel marin.',
    MAT_VIVIPARE,
    [
      'Gardez un mâle avec au moins 2 femelles (idéalement trois).',
      'Maintenez une eau dure et alcaline (KH élevé) ou ajoutez du sel marin pour aquarium : sans cela le molly voilier dépérit.',
      'Garnissez le bac de plantes denses : les alevins sont mangés par les adultes et les autres poissons.',
      'Installez la femelle gestante dans un bac de naissance planté, puis remettez-la dans le bac principal après la mise bas.',
      'Élevez les alevins à part.',
    ],
    'Les alevins naissent assez gros : nauplies d’artémia, microvers ou flocons pulvérisés dès la naissance.',
    'Les mâles sont très insistants : prévoyez toujours plusieurs femelles par mâle.',
  ),
  'platy': r(
    'Très facile',
    'Vivipare',
    'Le platy est vivipare : la gestation dure 4 à 6 semaines et la femelle met bas jusqu’à 80 alevins déjà assez gros pour manger de la nourriture en poudre ou des nauplies d’artémia. Les adultes mangent peu leurs petits, mais les autres poissons le feront.',
    MAT_VIVIPARE,
    [
      'Gardez plusieurs femelles par mâle : un mâle seul épuise une femelle.',
      'Garnissez le bac de plantes denses et de plantes flottantes pour offrir un refuge aux alevins.',
      'Repérez la femelle gestante (ventre rond, tache gravide sombre près de l’anale) et, si le bac est peuplé, installez-la seule dans un bac de naissance.',
      'Après la mise bas, remettez-la dans le bac principal.',
      'Nourrissez les alevins deux à trois fois par jour : ils grandissent vite.',
    ],
    'Les alevins sont assez gros pour accepter des nauplies d’artémia ou des flocons en poudre dès la naissance, deux à trois fois par jour.',
    'Le platy hybride facilement avec le xipho : séparez les deux espèces si vous voulez des lignées pures.',
  ),
  'xipho-porte-epee': r(
    'Très facile',
    'Vivipare',
    'Le xipho est vivipare. La gestation dure de 4 à 6 semaines et la femelle donne en général de 50 à 120 alevins d’environ 8 mm. Les adultes mangent volontiers les petits : séparer la femelle ou prévoir un bac très planté est indispensable.',
    MAT_VIVIPARE,
    [
      'Gardez un mâle avec deux ou trois femelles.',
      'Isolez la femelle gestante dès qu’elle est ronde, dans un bac de naissance garni de plantes flottantes (un panier de ponte peut servir de refuge, mais il est trop petit pour élever les alevins).',
      'Après la naissance, remettez la femelle dans le bac principal : les parents et les autres poissons mangent les petits.',
      'Élevez les alevins à part, plusieurs repas fins par jour.',
    ],
    'Les alevins mesurent environ 8 mm à la naissance : nauplies d’artémia ou flocons pulvérisés dès le premier jour.',
    'Certaines femelles peuvent changer de sexe en vieillissant : ne vous étonnez pas de voir apparaître un gonopode chez une ancienne femelle.',
  ),
  'endler': r(
    'Très facile',
    'Vivipare',
    'L’endler est vivipare : une femelle peut mettre bas toutes les 3 à 4 semaines (23 à 24 jours en moyenne), pour des portées plus petites que celles du guppy, de 5 à 25 alevins. Il hybride facilement avec le guppy.',
    MAT_VIVIPARE,
    [
      'Gardez uniquement des endlers dans le bac : les croisements avec les guppys donnent des descendants fertiles et la lignée pure disparaît.',
      'Installez des plantes denses et flottantes.',
      'Quand une femelle est visiblement gestante, déplacez-la dans un bac séparé pour la mise bas (les filets de ponte ne conviennent pas pour élever les alevins).',
      'Remettez-la dans le bac principal après la naissance : les adultes mangent rarement leurs petits.',
      'Les mâles prennent leurs couleurs en 3 à 5 semaines et les femelles peuvent avoir des petits dès 2 mois.',
    ],
    'Les alevins sont assez gros pour accepter nauplies d’artémia ou flocons pulvérisés dès la naissance ; nourrissez-les deux à trois fois par jour.',
    'Si vous ne voulez pas multiplier la population, achetez uniquement des mâles.',
  ),
  'xenotoca-poisson-a-queue-rouge': r(
    'Facile',
    'Vivipare',
    'Le xenotoca est un goodéidé vivipare : la gestation dure 7 à 8 semaines et les 5 à 50 alevins naissent gros, capables d’avaler la nourriture des adultes. Les parents mangent rarement leurs petits, mais les mâles peuvent être impétueux.',
    MAT_VIVIPARE,
    [
      'Gardez le groupe dans un aquarium d’espèce, avec beaucoup de plantes.',
      'Repérez la femelle au ventre arrondi : la gestation dure entre 7 et 8 semaines.',
      'Garnissez le bac de plantes denses : les alevins sont hardis et entrent en concurrence avec les autres poissons.',
      'Après la naissance, laissez les alevins grandir à part si le bac est peuplé.',
    ],
    'Les alevins sont assez gros pour accepter dès la naissance les mêmes aliments que les adultes (paillettes fines, nauplies, microvers).',
    'Le caractère du xenotoca est imprévisible : certains individus attaquent leurs voisins.',
  ),
  // ── Characidés ──
  'tetra-neon': r(
    'Difficile',
    'Pondeur d’œufs dispersés',
    'Le néon disperse ses œufs sans soin parental. Il pond de préférence dans une eau très douce et acide (pH 5,5 à 6,5, gH 1 à 5) à 26,5–29 °C, dans une pénombre presque totale : œufs et alevins sont sensibles à la lumière. Les œufs éclosent en 24 à 36 heures.',
    MAT_PONTE_DISPERSEE,
    [
      'Conditionnez mâles et femelles séparément, avec une alimentation variée riche en petites proies.',
      'Préparez le bac de ponte : eau douce et acide (pH 5,5 à 6,5, gH 1 à 5), 26,5 à 29 °C, éclairage très faible.',
      'Le soir, transférez la femelle la plus ronde et le mâle le mieux coloré. La ponte a lieu le lendemain matin. En groupe, comptez environ six individus de chaque sexe.',
      'Dès que les œufs sont repérés, retirez les adultes : ils mangent les œufs.',
      'Gardez le bac dans le noir : les œufs éclosent en 24 à 36 heures et les alevins nagent librement 3 à 4 jours plus tard.',
    ],
    'Pendant les premiers jours, donnez une nourriture de type infusoires, puis des microvers ou des nauplies d’artémia quand les alevins sont assez grands.',
    'Les œufs et les alevins craignent la lumière : n’allumez le bac qu’avec parcimonie.',
  ),
  'tetra-cardinal': r(
    'Difficile',
    'Pondeur d’œufs dispersés',
    'Le tétra cardinal est désormais élevé commercialement à grande échelle, mais une partie des poissons vendus reste pêchée dans la nature. La ponte demande une eau douce et acide (pH 5,5 à 6,5, gH 1 à 5), 26,5 à 29 °C et très peu de lumière. Les œufs éclosent en 24 à 36 heures.',
    MAT_PONTE_DISPERSEE,
    [
      'Conditionnez mâles et femelles séparément.',
      'Préparez un bac de ponte tamisé : eau douce et acide (pH 5,5 à 6,5, gH 1 à 5), 26,5 à 29 °C.',
      'Le soir, placez un couple choisi (femelle bien ronde, mâle bien coloré) dans le bac de ponte : ils pondent généralement vers minuit.',
      'Retirez les adultes dès que les œufs apparaissent : ils les mangent. Dans un bac très planté, on peut les laisser et aspirer les alevins au fur et à mesure.',
      'Maintenez le noir : les œufs éclosent en 24 à 36 heures, les alevins nagent librement 3 à 4 jours plus tard.',
    ],
    'Donnez des infusoires pendant les premiers jours, puis des microvers ou des nauplies d’artémia.',
    'Les œufs et les alevins sont sensibles à la lumière : gardez le bac sombre.',
  ),
  'tetra-citron': r(
    'Modérée',
    'Pondeur d’œufs dispersés',
    'Le tétra citron disperse ses œufs sans soin parental. Il faut un petit bac de ponte très tamisé, rempli d’eau mûre légèrement acide à neutre, et une température dans le haut de sa plage (jusqu’à 28 °C).',
    MAT_PONTE_DISPERSEE,
    [
      'Conditionnez les adultes avec une alimentation variée et riche en proies.',
      'Préparez un bac de ponte plus petit, rempli d’eau mûre légèrement acide à neutre, très peu éclairé, avec filtre à éponge et maille ou plantes fines au fond.',
      'Introduisez un couple, ou un ou deux mâles avec plusieurs femelles, une fois les adultes en forme.',
      'Laissez-les jusqu’à ce que les œufs soient repérés, en général le lendemain matin, puis retirez les adultes pour protéger les œufs.',
      'Surveillez l’éclosion et préparez la première nourriture des alevins.',
    ],
    'Les alevins se nourrissent d’abord de paramécies ou d’un aliment sec de 5 à 50 microns, puis de nauplies d’artémia et de microvers quand ils sont assez grands.',
    'L’éclosion n’est pas précisément documentée pour cette espèce : retirez les adultes et suivez le développement des œufs sans les exposer à la lumière.',
  ),
  'tetra-rouge-minor': r(
    'Facile',
    'Pondeur d’œufs dispersés',
    'Le tétra rouge se reproduit souvent seul : quelques alevins peuvent apparaître dans un bac mûr sans intervention. Pour en obtenir davantage, il pond ses œufs dispersés dans un bac tamisé, sans soin parental, dans une eau légèrement acide à neutre.',
    MAT_PONTE_DISPERSEE,
    [
      'Conditionnez bien les adultes : ils pondent souvent.',
      'Préparez un petit bac de ponte rempli d’eau mûre, très peu éclairé, avec maille ou plantes fines au fond et filtre à éponge.',
      'Choisissez une température dans le haut de sa plage (jusqu’à 28 °C) et une eau légèrement acide à neutre.',
      'Introduisez un couple, ou un ou deux mâles avec plusieurs femelles.',
      'Retirez les adultes dès que des œufs apparaissent, en général le lendemain matin.',
    ],
    'Les alevins se nourrissent d’abord de paramécies ou d’un aliment sec de 5 à 50 microns, puis de nauplies d’artémia et de microvers.',
  ),
  'tetra-empereur': r(
    'Modérée',
    'Pondeur d’œufs dispersés',
    'Le tétra empereur pond ses œufs un peu à la fois, ce qui peut durer plusieurs heures. Il lui faut une eau douce et acide (pH 6,0 à 7,0, gH 1 à 10) à 24–26,5 °C et un bac de ponte d’environ 40 × 20 × 20 cm. Les œufs éclosent en 24 à 36 heures.',
    MAT_PONTE_DISPERSEE,
    [
      'Conditionnez mâles et femelles dans des bacs séparés.',
      'Préparez un bac d’environ 40 × 20 × 20 cm, très peu éclairé, avec filtre à éponge doux, eau douce et acide (pH 6,0 à 7,0, gH 1 à 10), 24 à 26,5 °C.',
      'Le soir, placez la femelle la plus ronde et le mâle le mieux coloré dans le bac. Ils pondent le lendemain matin, quelques œufs à la fois.',
      'Si aucun œuf n’apparaît après quelques jours, essayez un autre couple. En groupe (six de chaque sexe), prévoyez un bac plus grand pour que les mâles gardent leur territoire.',
      'Retirez les adultes dès que les œufs sont repérés : ils les mangent volontiers.',
      'Les œufs éclosent en 24 à 36 heures ; les alevins nagent librement 4 à 5 jours plus tard.',
    ],
    'Donnez une nourriture de type infusoires pendant la première semaine environ, puis des microvers ou des nauplies d’artémia.',
  ),
  'tetra-glowlight': r(
    'Modérée',
    'Pondeur d’œufs dispersés',
    'Le tétra glowlight pond dans une eau douce et acide (pH 5,5 à 6,5, gH 1 à 5) à 26,5–29 °C. Une femelle produit en moyenne 120 à 150 œufs, qui éclosent en 24 à 36 heures. Œufs et alevins sont sensibles à la lumière.',
    MAT_PONTE_DISPERSEE,
    [
      'Conditionnez bien le groupe avec beaucoup de petites proies vivantes ou congelées.',
      'Préparez un bac d’environ 45 × 25 × 25 cm, très peu éclairé, rempli d’eau douce et acide (pH 5,5 à 6,5, gH 1 à 5), à 26,5–29 °C, avec fond de maille ou plantes fines. L’eau d’osmose ou filtrée sur tourbe aide.',
      'Placez le soir un couple (femelle bien ronde, mâle bien coloré), ou un groupe d’environ six de chaque sexe. La ponte a lieu le lendemain matin, et le couple se retourne parfois complètement pendant la ponte.',
      'Retirez les adultes dès que les œufs sont repérés.',
      'Maintenez le bac dans l’obscurité : éclosion en 24 à 36 heures, nage libre 3 à 4 jours plus tard.',
    ],
    'Infusoires pendant les premiers jours, puis microvers ou nauplies d’artémia.',
  ),
  'tetra-a-queue-rouge': r(
    'Très difficile',
    'Pondeur d’œufs dispersés',
    'Le tétra nez rouge est réputé très difficile à reproduire, et l’élevage des alevins l’est encore davantage. Il lui faut une eau très douce et acide (pH 5,5 à 6,5, dH 1 à 4) à 27–28 °C, quelques œufs étant lâchés au fond ou dans des plantes fines. Les alevins éclosent en 30 à 36 heures.',
    MAT_PONTE_DISPERSEE,
    [
      'Conditionnez le groupe avec des vers blancs et d’autres proies vivantes ou congelées.',
      'Préparez un bac de ponte très peu éclairé, avec fond de maille ou plantes fines, eau très douce et acide (pH 5,5 à 6,5, dH 1 à 4), 27 à 28 °C.',
      'Placez un couple choisi dans le bac. Quelques œufs sont lâchés, au fond ou dans les plantes.',
      'Retirez les parents après la ponte : ils mangent les œufs.',
      'Les alevins éclosent en 30 à 36 heures et nagent librement après 4 jours.',
    ],
    'Les alevins ne peuvent d’abord manger que de minuscules organismes (infusoires) : leur élevage est délicat.',
    'Réservé aux aquariophiles expérimentés : ne tentez pas la reproduction sans maîtriser l’eau très douce et l’élevage d’infusoires.',
  ),
  'tetra-buenos-aires-albinos': r(
    'Facile',
    'Pondeur d’œufs dispersés',
    'Le tétra de Buenos Aires est un pondeur d’œufs dispersés sans soin parental. Une femelle bien nourrie peut pondre jusqu’à 2 000 œufs pendant 2 à 4 heures, qui éclosent en 24 à 36 heures. Une eau légèrement acide à neutre convient.',
    MAT_PONTE_DISPERSEE,
    [
      'Conditionnez les adultes ensemble avec une alimentation riche.',
      'Préparez un bac de ponte plus petit, rempli d’eau mûre légèrement acide à neutre, très peu éclairé, avec fond de maille ou plantes fines et filtre à éponge.',
      'Introduisez un couple, ou un ou deux mâles avec plusieurs femelles. Les œufs sont repérés le lendemain matin ; la ponte dure 2 à 4 heures.',
      'Retirez les adultes dès que les œufs sont repérés.',
      'Les œufs éclosent en 24 à 36 heures ; les larves portent encore un gros sac vitellin.',
    ],
    'Paramécies ou aliment sec de 5 à 50 microns au début, puis nauplies d’artémia et microvers.',
    'Cette espèce grignote les plantes tendres et peut devenir turbulente : prévoyez un bac assez grand pour le groupe.',
  ),
  'tetra-rouge-du-congo': r(
    'Difficile',
    'Pondeur d’œufs dispersés',
    'Le tétra du Congo pond jusqu’à 300 gros œufs sur plusieurs jours (100 à 200 est plus courant). Beaucoup d’œufs moisissent dans les 24 à 48 heures et doivent être retirés à la pipette, et l’éclosion prend environ 6 jours.',
    MAT_PONTE_DISPERSEE,
    [
      'Conditionnez le groupe avec des proies vivantes et congelées, puis choisissez le mâle le plus coloré et la femelle la plus ronde.',
      'Préparez un petit bac de ponte avec fond de maille, éclairage faible, plantes en touffes et eau douce, légèrement en dessous de la neutralité.',
      'Placez le couple dans le bac : la femelle pond sur plusieurs jours.',
      'Retirez régulièrement les œufs moisis avec une longue pipette, surtout pendant les 24 à 48 premières heures.',
      'Les œufs éclosent en environ 6 jours.',
    ],
    'Quand le sac vitellin est résorbé (environ 24 heures après l’éclosion), donnez des infusoires ; 2 à 3 jours plus tard, passez aux nauplies d’artémia ou aux microvers.',
    'Surveillez la qualité de l’eau : le développement des œufs est long, d’où le risque de moisissures.',
  ),
  // ── Corydoras, loches et autres poissons de fond ──
  'corydoras-bronze': r(
    'Facile',
    'Pondeur de petits œufs collants',
    'Le corydoras bronzé pond de petits œufs collés sur la vitre ou le décor après un gros changement d’eau fraîche, avec deux mâles pour une femelle. Les œufs éclosent en 3 à 4 jours.',
    MAT_CORYDORAS,
    [
      'Formez un groupe avec deux mâles pour une femelle et nourrissez-le avec des proies vivantes, congelées et sèches.',
      'Quand les femelles sont visiblement pleines d’œufs, changez 50 à 70 % de l’eau avec une eau plus fraîche, augmentez l’oxygénation et le courant.',
      'Répétez chaque jour jusqu’à la ponte. Les œufs sont déposés sur la vitre en général (des plantes à feuilles fines ou des fibres de ponte conviennent aussi).',
      'Une fois la ponte finie, retirez les adultes ou les œufs : ils les mangent. Les œufs se décollent en les roulant doucement avec le doigt sur la vitre vers un bac rempli de la même eau, bien oxygéné.',
      'Ajoutez quelques gouttes de bleu de méthylène ou un cône d’aulne et retirez les œufs blancs et moisis.',
      'Les œufs éclosent en 3 à 4 jours.',
    ],
    'Une fois le sac vitellin résorbé, donnez des microvers ou des nauplies d’artémia. Les alevins semblent moins sensibles aux maladies sur une fine couche de sable que sur un fond nu.',
  ),
  'corydoras-panda': r(
    'Modérée',
    'Pondeur de petits œufs collants',
    'Le corydoras panda pond ses œufs un à un, en général sur la vitre. Il se reproduit à environ 24 °C et pH 6,5, après des changements d’eau plus fraîche. Beaucoup de corydoras pondent surtout à certaines saisons : si l’été échoue, recommencez en hiver.',
    MAT_CORYDORAS,
    [
      'Gardez deux mâles par femelle et nourrissez avec des proies variées (vivantes, congelées, sèches).',
      'Quand les femelles sont pleines d’œufs, changez 50 à 70 % de l’eau avec de l’eau plus fraîche (environ 24 °C, pH 6,5), augmentez l’oxygénation et le courant, et répétez chaque jour jusqu’à la ponte.',
      'La femelle dépose les œufs un à un sur la vitre, souvent là où le courant est assez fort.',
      'Retirez les adultes ou décollez les œufs avec le doigt pour les mettre dans un bac rempli de la même eau, bien oxygéné.',
      'Ajoutez du bleu de méthylène ou un cône d’aulne et retirez les œufs moisis.',
      'Les œufs éclosent en 3 à 5 jours.',
    ],
    'Après la résorption du sac vitellin, donnez des infusoires quelques jours, puis des microvers ou des nauplies d’artémia. Une fine couche de sable limite les maladies.',
  ),
  'corydoras-pygmee': r(
    'Modérée',
    'Pondeur de petits œufs collants',
    'Le corydoras pygmée suit le même schéma que les autres corydoras : un groupe avec deux mâles pour une femelle, de l’eau fraîche et du courant pour déclencher la ponte, des œufs déposés un à un sur la vitre, qui éclosent en 3 à 5 jours.',
    MAT_CORYDORAS,
    [
      'Gardez deux mâles pour une femelle ; conditionnez avec des proies variées.',
      'Quand les femelles sont pleines d’œufs, changez 50 à 70 % de l’eau avec de l’eau plus fraîche (environ 24 °C, pH 6,5), augmentez oxygénation et courant, et répétez chaque jour.',
      'Les œufs sont déposés un à un sur la vitre. Surveillez-les : les adultes les mangent.',
      'Retirez les adultes, ou déplacez les œufs dans un bac rempli de la même eau, bien oxygéné.',
      'Ajoutez du bleu de méthylène et retirez les œufs moisis.',
      'Éclosion en 3 à 5 jours.',
    ],
    'Une fois le sac vitellin résorbé, infusoires pendant quelques jours puis microvers ou nauplies d’artémia ; une fine couche de sable limite les maladies.',
  ),
  'corydoras-de-sterba': r(
    'Modérée',
    'Pondeur de petits œufs collants',
    'Le corydoras de Sterba est difficile à faire pondre : un gros changement d’eau plus fraîche suivi d’une remontée progressive de la température vers 28 °C peut déclencher la ponte. Les œufs semi-collants sont fixés aux plantes, au décor ou à la vitre, et éclosent en environ 5 jours.',
    MAT_CORYDORAS,
    [
      'Gardez deux mâles pour une femelle, avec des proies vivantes ou congelées.',
      'Faites un gros changement d’eau avec une eau un peu plus fraîche, puis laissez la température remonter lentement jusque vers 28 °C.',
      'Le couple se place en « T » : le mâle féconde les œufs tenus entre les nageoires pelviennes de la femelle, qui les fixe sur plantes, décor ou vitre. Le cycle se répète.',
      'Quand la ponte est terminée, retirez les adultes pour éviter qu’ils mangent les œufs, ou déplacez les œufs.',
      'Les œufs éclosent en 3 à 5 jours ; retirez les œufs moisis.',
      'Les alevins nagent quelques jours après l’éclosion.',
    ],
    'Donnez des poudres très fines puis des nauplies d’artémia aux alevins quand ils nagent librement.',
  ),
  'poisson-chat-corydoras-venezuela': r(
    'Modérée',
    'Pondeur de petits œufs collants',
    'Le corydoras du Venezuela suit le schéma du genre : un groupe conditionné avec des proies vivantes ou congelées, et un changement d’eau pour déclencher la ponte. Des reproducteurs ont pondu le lendemain d’un changement d’eau, à pH 7, 24 °C environ.',
    MAT_CORYDORAS,
    [
      'Conditionnez le groupe avec des vers de vase, vers blancs, daphnies ou tubifex.',
      'Faites un gros changement d’eau un peu plus fraîche, avec des paramètres proches de son habitat naturel (pH 7, eau moyennement dure, environ 24 °C).',
      'La ponte a lieu en général le lendemain d’un changement d’eau ; surveillez les œufs.',
      'Retirez les adultes ou déplacez les œufs dans un bac rempli de la même eau, bien oxygéné.',
      'Retirez les œufs moisis.',
    ],
    'Microvers ou nauplies d’artémia pour les alevins, une fois le sac vitellin résorbé.',
    'Les détails de l’incubation ne sont pas documentés aussi précisément que pour d’autres corydoras : observez vos œufs et notez leurs délais.',
  ),
  'loche-clown': nr(
    'Impossible en captivité',
    'La loche clown ne se reproduit pas en aquarium d’amateur : aucune reproduction n’y est connue. Les poissons du commerce sont soit capturés à l’état sauvage, soit produits dans des élevages d’Asie du Sud-Est et d’Europe de l’Est qui utilisent des hormones. Mieux vaut choisir des sujets d’élevage plutôt que sauvages.',
    'Ne tentez pas de reproduction : elle repose sur des traitements hormonaux et du matériel d’élevage.',
  ),
  'loche-kuhli': nr(
    'Très difficile',
    'La reproduction de la loche kuhli en aquarium reste occasionnelle : quelques aquariophiles ont trouvé de jeunes poissons dans un bac planté de mousse de Java, d’anubias et de bois, mais il n’existe pas de méthode fiable et reproductible. La ponte et l’incubation ne sont pas bien documentées.',
    'Si vous voyez de jeunes loches, déplacez les adultes quelques semaines : ils pourraient manger les petits.',
  ),
  'poisson-clown-loche-yoyo': nr(
    'Très difficile',
    'La loche yoyo ne se reproduit pas en aquarium d’amateur : aucune reproduction n’a été rapportée en aquarium privé. Une partie des poissons du commerce provient d’élevages commerciaux utilisant des hormones, qui ont aussi produit des hybrides.',
    'Ne tentez pas de reproduction : elle repose sur des traitements hormonaux.',
  ),
  // ── Labyrinthidés ──
  'combattant-betta': r(
    'Modérée',
    'Nid de bulles, soins paternels',
    'Le mâle du combattant construit un nid de bulles à la surface, ramasse les œufs à mesure qu’ils tombent et les garde. La femelle doit être retirée dès la fin de la ponte. Une ponte compte environ 300 à 500 œufs, qui éclosent en 24 à 36 heures.',
    MAT_NID_BULLES,
    [
      'Préparez un petit bac de 4 à 20 L, avec des plantes flottantes ou un morceau de polystyrène pour que le mâle accroche son nid.',
      'Placez un mâle et une femelle ensemble : la ponte a lieu en général dans les 1 à 3 jours qui suivent.',
      'Le mâle bâtit le nid de bulles à la surface, enlace la femelle sous le nid, puis place chaque œuf dans le nid à mesure qu’ils tombent.',
      'Retirez la femelle une fois la ponte terminée : le mâle ne la tolère plus.',
      'Le mâle surveille les œufs et les larves. Les œufs éclosent en 24 à 36 heures ; retirez-le à ce moment-là.',
      'Les larves absorbent leur sac vitellin en environ 3 jours.',
    ],
    'Dès que le sac vitellin est résorbé (environ 3 jours après l’éclosion), donnez des infusoires, puis des nauplies d’artémia, avant de passer progressivement à des flocons ou granulés fins.',
    'Ne laissez jamais le mâle et la femelle ensemble sans surveillance après la ponte.',
  ),
  'gourami-nain': r(
    'Modérée',
    'Nid de bulles, soins paternels',
    'Le gourami nain est un pondeur en nid de bulles : le mâle construit un radeau de bulles à la surface, puis garde la ponte (jusqu’à 700 œufs). Les œufs éclosent en moins de 36 heures. Les plantes fines et flottantes sont indispensables à la réussite.',
    MAT_NID_BULLES,
    [
      'Baissez le niveau d’eau à 15–20 cm et montez la température à 26,5–29 °C.',
      'Ajoutez de grosses touffes de cératophylle ou d’autres plantes fines, plus des plantes flottantes comme le riccia : elles sont indispensables au succès.',
      'Quand la femelle est prête, le mâle construit son nid de bulles à la surface puis prend en charge la ponte.',
      'Retirez la femelle dès la fin de la ponte : le mâle ne la tolère plus et pourrait la blesser.',
      'Les œufs éclosent en général en 36 heures et le nid se désagrège. Le mâle peut rester les deux premiers jours, jusqu’à la résorption du sac vitellin.',
    ],
    'Donnez des infusoires pendant la première semaine environ, puis des microvers ou des nauplies d’artémia.',
  ),
  'gourami-miel': r(
    'Facile',
    'Nid de bulles, soins paternels',
    'Le gourami miel construit un petit nid de bulles sans matière végétale, souvent sous une grande feuille ou dans un coin du bac. Les œufs éclosent en 24 à 36 heures ; les alevins, très petits, ont besoin d’une couche d’air chaud et humide à la surface pour développer leur organe labyrinthique.',
    MAT_NID_BULLES,
    [
      'Garnissez le bac de plantes flottantes ou à tiges qui atteignent la surface, avec une filtration douce et un couvercle bien ajusté.',
      'Le mâle construit d’abord un petit nid de bulles, puis fait la cour aux femelles prêtes à pondre.',
      'Après une longue parade, le couple s’enlace sous le nid et libère œufs et laitance ; le mâle ramasse les œufs et les place dans le nid. Plusieurs pontes peuvent se suivre.',
      'Quand il n’y a plus d’œufs, la femelle est chassée : retirez-la.',
      'Le mâle garde le nid jusqu’à l’éclosion (24 à 36 heures), puis vous pouvez le retirer. Les alevins nagent librement 24 à 48 heures plus tard.',
    ],
    'Infusoires ou aliment liquide pendant la première semaine, puis nauplies d’artémia ou microvers. Les jeunes sont très sensibles aux variations de température et de qualité de l’eau : faites de petits changements d’eau doux.',
    'Gardez une couche d’air chaud et humide au-dessus de l’eau : sans elle, l’organe labyrinthique des alevins peut mal se développer.',
  ),
  'gourami-perle': r(
    'Modérée',
    'Nid de bulles, soins paternels',
    'Le gourami perlé construit un large nid de bulles, parfois d’environ 25 cm, ancré dans les plantes flottantes. Après une parade active, le couple pond 200 à 300 œufs transparents ; l’éclosion prend 20 à 30 heures et les alevins restent 4 à 5 jours dans le nid.',
    MAT_NID_BULLES,
    [
      'Préparez un bac d’espèce avec beaucoup de plantes flottantes, qui serviront d’ancrage au nid.',
      'Le mâle construit un grand nid de bulles à la surface.',
      'Après une parade active, le couple pond environ 200 à 300 œufs transparents. La ponte peut se poursuivre pendant des semaines.',
      'Dès que le mâle garde les œufs, retirez tous les autres poissons, y compris la femelle.',
      'Les œufs éclosent en 20 à 30 heures ; les alevins restent dans le nid 4 à 5 jours.',
      'Retirez le mâle quand les alevins nagent librement.',
    ],
    'Les premiers jours, donnez des paramécies, des rotifères ou des infusoires, puis des nauplies d’artémia.',
  ),
  'gourami-dore': r(
    'Facile',
    'Nid de bulles, soins paternels',
    'Le gourami doré (gourami à trois taches) construit un nid de bulles dans les plantes flottantes. Une ponte compte 500 à 1 200 œufs, qui éclosent en 20 à 30 heures ; les alevins nagent librement 4 à 5 jours plus tard.',
    MAT_NID_BULLES,
    [
      'Réduisez la hauteur d’eau à 15–20 cm, avec beaucoup de plantes flottantes et une filtration douce.',
      'Prévoyez 2 ou 3 femelles par mâle : il peut être dur avec une femelle qui n’est pas prête.',
      'Quand une femelle est pleine d’œufs, le mâle construit un grand nid dans les plantes flottantes et y ajoute des morceaux de plantes.',
      'Pendant la ponte, sous le nid, le mâle ramasse les œufs flottants et les place dans le nid. Retirez la femelle dès la fin de la ponte : elle risque d’être sérieusement blessée.',
      'Les œufs éclosent en 20 à 30 heures, pendant que le mâle garde le nid. Retirez-le quand les alevins nagent librement (4 à 5 jours plus tard).',
    ],
    'Infusoires ou aliment liquide pendant la première semaine, puis nauplies d’artémia, microvers et flocons en poudre. Triez les alevins selon leur taille : sans cela, le cannibalisme est fréquent.',
  ),
  'blue-gourami': r(
    'Facile',
    'Nid de bulles, soins paternels',
    'Le gourami bleu est une variété du gourami à trois taches et se reproduit de la même façon : nid de bulles dans les plantes flottantes, 500 à 1 200 œufs par ponte, éclosion en 20 à 30 heures, alevins nageant 4 à 5 jours plus tard.',
    MAT_NID_BULLES,
    [
      'Réduisez la hauteur d’eau à 15–20 cm, avec beaucoup de plantes flottantes et une filtration douce.',
      'Prévoyez 2 ou 3 femelles par mâle.',
      'Quand la femelle est pleine d’œufs, le mâle construit un grand nid dans les plantes flottantes.',
      'Retirez la femelle dès la fin de la ponte : le mâle peut la blesser sérieusement.',
      'Les œufs éclosent en 20 à 30 heures ; retirez le mâle quand les alevins nagent librement.',
    ],
    'Infusoires la première semaine, puis nauplies d’artémia, microvers et flocons en poudre. Triez les alevins selon leur taille pour limiter le cannibalisme.',
  ),
  'gourami-geant': nr(
    'Très difficile',
    'Le gourami géant se reproduit surtout en bassin d’élevage : il construit un nid de fibres végétales, le mâle devient presque noir, et les œufs éclosent en environ 24 heures. L’espèce atteint le plus souvent 45 cm (jusqu’à 80 cm) : aucun aquarium domestique ne permet de la faire se reproduire.',
    'Ne prévoyez pas d’élevage en aquarium d’appartement.',
  ),
  // ── Cyprinidés ──
  'danio-zebre': r(
    'Très facile',
    'Pondeur d’œufs dispersés',
    'Le danio zébré dissémine ses œufs sans soin parental. Il suffit de lui proposer un bac de ponte peu éclairé, avec un fond de maille, et de déclencher la ponte par des ajouts d’eau fraîche. Les œufs éclosent en 24 à 36 heures.',
    MAT_PONTE_MAILLE,
    [
      'Conditionnez le groupe avec de petites proies vivantes ou congelées.',
      'Préparez un ou plusieurs bacs à moitié remplis, très peu éclairés, avec un fond de maille, de gazon synthétique ou de mousse de Java, un petit filtre dont le courant longe le bac, une eau légèrement acide à neutre et une température dans le haut de la plage 18–25 °C.',
      'Quand les femelles sont pleines d’œufs, placez un ou deux couples dans chaque bac.',
      'Ajoutez un peu d’eau fraîche toutes les quelques heures pour compléter progressivement le niveau : cela déclenche la ponte, en général le lendemain matin. Une femelle qui a pondu est visiblement plus fine.',
      'Retirez les adultes au bout d’un ou deux jours : ils mangent les œufs. Remplacez alors le filtre par un filtre à éponge pour ne pas aspirer les alevins.',
      'Les œufs éclosent en 24 à 36 heures ; les alevins nagent quelques jours plus tard.',
    ],
    'Paramécies ou aliment sec très fin (5 à 50 microns) au début, puis nauplies d’artémia ou microvers quand les alevins sont assez grands.',
  ),
  'danio-leopard': r(
    'Très facile',
    'Pondeur d’œufs dispersés',
    'Le danio léopard est une variété du danio zébré et se reproduit de la même façon : pondeur d’œufs dispersés sans soin parental, ponte déclenchée par des ajouts d’eau fraîche, éclosion en 24 à 36 heures.',
    MAT_PONTE_MAILLE,
    [
      'Conditionnez le groupe avec de petites proies vivantes ou congelées.',
      'Préparez un ou plusieurs bacs à moitié remplis, très peu éclairés, avec un fond de maille ou de mousse de Java, un filtre doux, une eau légèrement acide à neutre et une température dans le haut de la plage 18–25 °C.',
      'Placez un ou deux couples dans chaque bac quand les femelles sont pleines.',
      'Ajoutez un peu d’eau fraîche toutes les quelques heures : la ponte a lieu en général le lendemain matin.',
      'Retirez les adultes au bout d’un ou deux jours et remplacez le filtre par une éponge.',
      'Éclosion en 24 à 36 heures.',
    ],
    'Paramécies ou aliment sec très fin (5 à 50 microns) au début, puis nauplies d’artémia ou microvers.',
  ),
  'barbus-de-sumatra': r(
    'Facile',
    'Pondeur d’œufs dispersés',
    'Le barbus de Sumatra disperse ses œufs sans soin parental dans un bac de ponte peu éclairé, au fond protégé par une maille. Les œufs éclosent en 24 à 48 heures et les alevins nagent environ 24 heures plus tard.',
    MAT_PONTE_MAILLE,
    [
      'Conditionnez le groupe ensemble. Vous pouvez aussi garder environ six individus de chaque sexe dans un bac plus grand.',
      'Préparez un bac de ponte rempli d’eau mûre, peu éclairé, au fond de maille ou de gazon synthétique, avec une eau légèrement acide à neutre et une température dans le haut de la plage 20–26 °C.',
      'Quand les femelles sont pleines, introduisez un ou deux couples : la ponte a lieu en général le lendemain matin.',
      'Retirez les adultes après la ponte.',
      'Les œufs éclosent en 24 à 48 heures ; les alevins nagent environ 24 heures plus tard.',
    ],
    'Infusoires pendant les premiers jours, puis microvers ou nauplies d’artémia quand les alevins sont assez grands.',
  ),
  'barbus-rose': r(
    'Facile',
    'Pondeur d’œufs dispersés',
    'Le barbus rosé disperse ses œufs sans soin parental. La ponte a lieu en général le lendemain matin, dans un bac de ponte peu éclairé. Les œufs éclosent en 24 à 48 heures.',
    MAT_PONTE_MAILLE,
    [
      'Conditionnez le groupe ; vous pouvez aussi garder environ six individus de chaque sexe dans un bac plus grand.',
      'Préparez un bac d’eau mûre, peu éclairé, au fond de maille, avec une eau légèrement acide à neutre et une température dans le haut de la plage 16–24 °C.',
      'Quand les femelles sont pleines d’œufs, introduisez un ou deux couples.',
      'Retirez les œufs ou les adultes dès que les œufs sont repérés : les adultes les mangent probablement.',
      'Les œufs éclosent en 24 à 48 heures ; les alevins nagent environ 24 heures plus tard.',
    ],
    'Infusoires pendant quelques jours, puis microvers ou nauplies d’artémia.',
  ),
  'barbus-cerise': r(
    'Modérée',
    'Pondeur sur plantes',
    'Le barbus cerise pond de petits groupes d’œufs collants (1 à 3 à la fois) jusqu’à 200 à 300 œufs au total, dans un bac très planté, à 26–27 °C et pH 6,0 à 6,5. Les œufs éclosent en environ 24 heures.',
    [
      'Un bac de ponte très planté (plantes fines ou fils de ponte)',
      'Des vers blancs pour nourrir les parents pendant la ponte',
      'Des nauplies d’artémia fraîchement écloses et des flocons écrasés pour les alevins',
    ],
    [
      'Installez un couple dans un bac de ponte très planté, à 26–27 °C, pH 6,0 à 6,5 et dureté de 4 à 10 °dH.',
      'Donnez aux parents des vers blancs pendant la ponte : ils mangent moins leurs œufs.',
      'À chaque rapprochement, 1 à 3 œufs sont pondus, collés aux plantes fines ou aux fils de ponte, jusqu’à un total de 200 à 300 œufs.',
      'Retirez le couple une fois la ponte terminée.',
      'Les œufs éclosent après environ 24 heures ; les alevins nagent librement 2 à 3 jours plus tard.',
    ],
    'Nauplies d’artémia fraîchement écloses et flocons écrasés.',
  ),
  'rasbora-arlequin': r(
    'Difficile',
    'Œufs collés sous une feuille',
    'Le rasbora arlequin colle ses œufs sous une large feuille et est souvent réputé difficile à reproduire. L’eau doit être douce et acide (pH 5,0 à 6,0, 1 à 5 °dH). L’incubation dure 24 à 48 heures et les alevins nagent librement environ une semaine plus tard.',
    MAT_PONTE_MAILLE,
    [
      'Choisissez des adultes d’un an ou plus : les poissons plus jeunes pondent moins souvent et moins.',
      'Préparez un bac de ponte très peu éclairé avec une grosse touffe de plante à larges feuilles (Microsorium, Cryptocoryne, ou un substitut artificiel), un fond nu ou de maille, et un petit filtre à éponge facultatif.',
      'Réglez l’eau : pH 5,0 à 6,0, 1 à 5 °dH, température dans le haut de la plage 21–28 °C.',
      'La femelle choisit la face inférieure d’une feuille : le couple pond à l’envers et fixe les œufs sous la feuille.',
      'Retirez les adultes ou les œufs sans attendre : les adultes mangent tous les œufs qu’ils trouvent.',
      'L’incubation dure en général de 24 à 48 heures, selon la température.',
    ],
    'Les alevins nagent librement environ une semaine plus tard. Donnez des paramécies ou un aliment très fin, puis des nauplies d’artémia ou des microvers.',
  ),
  'poisson-arlequin-cuivre': r(
    'Difficile',
    'Œufs collés sous une feuille',
    'Le rasbora de Lambchop colle ses œufs sous une large feuille. Comme les autres Trigonostigma, il est souvent réputé difficile à reproduire. Il faut une eau douce et acide (pH 5,0 à 6,0, 1 à 5 °dH). L’incubation dure 24 à 48 heures.',
    MAT_PONTE_MAILLE,
    [
      'Choisissez des adultes d’un an ou plus.',
      'Préparez un bac de ponte très peu éclairé avec une grosse touffe de plante à larges feuilles (Microsorium, Cryptocoryne, ou un substitut artificiel).',
      'Réglez l’eau : pH 5,0 à 6,0, 1 à 5 °dH, température dans le haut de la plage 21–28 °C.',
      'La femelle fixe les œufs sous une feuille, à l’envers.',
      'Retirez les adultes ou les œufs sans attendre : les adultes mangent les œufs.',
      'L’incubation dure en général de 24 à 48 heures.',
    ],
    'Paramécies ou aliment très fin au début, puis nauplies d’artémia et microvers.',
  ),
  'rasbora-tete-de-cuivre': r(
    'Difficile',
    'Pondeur d’œufs dispersés',
    'Le rasbora à ciseaux est un pondeur d’œufs dispersés qui pond en continu. Sa reproduction en aquarium n’est pas clairement documentée : des alevins peuvent apparaître dans un bac mûr et très planté, mais une ponte contrôlée suppose un grand bac de ponte et une méthode d’élevage soignée.',
    MAT_PONTE_MAILLE,
    [
      'Dans un bac très planté et mûr, des alevins peuvent apparaître spontanément : n’intervenez pas trop.',
      'Pour une ponte contrôlée, préparez un ou plusieurs bacs longs et peu profonds, d’environ 120 × 30 × 30 cm, à moitié remplis et très peu éclairés, avec fond de maille ou de gazon synthétique.',
      'Mettez l’eau légèrement acide à neutre, dans le haut de la plage 20–25 °C. Conditionnez les adultes ensemble.',
      'Quand les femelles sont pleines, placez un ou deux couples dans chaque bac, ajoutez un peu d’eau fraîche toutes les quelques heures et nourrissez avec de petites proies vivantes ou congelées.',
      'Retirez les adultes au bout d’un ou deux jours, puis remplacez le filtre par une éponge pour ne pas aspirer les alevins.',
      'Les œufs éclosent en 18 à 48 heures et les alevins nagent librement 24 à 48 heures plus tard.',
    ],
    'Nauplies d’artémia ou microvers dès que les alevins nagent.',
    'Réservé aux éleveurs expérimentés : les spécialistes eux-mêmes ne savent pas si cette espèce a déjà été reproduite en aquarium de façon fiable.',
  ),
  'requin-arc-en-ciel': nr(
    'Impossible en captivité',
    'Aucun aquariophile n’a, à notre connaissance, reproduit le requin arc-en-ciel en aquarium. Les poissons vendus viennent d’élevages commerciaux qui utilisent des hormones.',
    'Ne tentez pas de reproduction : elle repose sur des traitements hormonaux.',
  ),
  'requin-a-queue-rouge': nr(
    'Impossible en captivité',
    'Le requin à queue rouge ne s’est pas reproduit en aquarium privé, à notre connaissance. Les élevages commerciaux utilisent des hormones, notamment en Thaïlande, où l’espèce est produite en bassins extérieurs. L’obstacle principal est qu’il est très difficile de garder plus d’un adulte dans un même aquarium.',
    'Ne tentez pas de reproduction : elle repose sur des traitements hormonaux et sur des installations spécialisées.',
  ),
  // ── Poissons arc-en-ciel ──
  'poisson-arc-en-ciel': r(
    'Facile',
    'Pondeur sur plantes fines ou fibres',
    'Le poisson arc-en-ciel de Boeseman pond pendant plusieurs semaines, par petits lots chaque jour, sur des plantes fines ou des fibres de ponte. Les œufs éclosent en 7 à 12 jours selon la température.',
    [
      'Des plantes à feuilles fines (mousse de Java) ou des fibres de ponte, sans substrat',
      'Un bac d’élevage rempli d’eau du bac de ponte',
      'Des infusoires, puis des nauplies d’artémia pour les alevins',
    ],
    [
      'Installez le couple dans un bac de ponte à 26,5–29 °C et pH d’environ 7,5, garni de mousse de Java ou de fibres de ponte. Une légère hausse de température déclenche souvent la ponte.',
      'La femelle pond tous les jours pendant plusieurs semaines, par lots.',
      'Contrôlez régulièrement les plantes ou fibres de ponte et déplacez les œufs dans un bac d’élevage rempli d’eau du bac de ponte.',
      'Les œufs éclosent en 7 à 12 jours selon la température.',
    ],
    'Infusoires les premiers jours, puis nauplies d’artémia après environ une semaine. Évitez les aliments qui coulent : les alevins restent près de la surface.',
  ),
  // ── Cichlidés ──
  'scalaire': r(
    'Modérée',
    'Pondeur sur support vertical, soins parentaux',
    'Le scalaire forme un couple stable (vers 4 mois) et pond sur une feuille de grande plante ou sur un support vertical. Les œufs éclosent en 3 à 4 jours et les alevins nagent vers le 7ᵉ jour. Les parents mangent souvent leur première ponte.',
    [
      'Un grand aquarium haut, avec des grandes feuilles (plante type Amazone) ou un support vertical pour la ponte',
      'Une eau à environ 25 °C et pH 7 (dureté moyenne)',
      'Un bac d’incubation rempli de l’eau du bac principal',
      'Infusoires ou aliment liquide pour alevins, puis nauplies d’artémia',
    ],
    [
      'Achetez un petit groupe de jeunes et laissez-les s’apparier d’eux-mêmes : dans un cas décrit, à environ 4 mois, deux des plus gros nageaient ensemble et chassaient les autres.',
      'Retirez les autres poissons du bac ou isolez le couple.',
      'Laissez un support de ponte vertical (feuille de plante, tube de filtre, ardoise). Le couple le nettoie puis y fixe les œufs.',
      'Les parents mangent facilement leur première ponte : si vous voulez des alevins, retirez le support de ponte (ou la moitié des œufs) vers un bac d’incubation rempli de la même eau.',
      'Les œufs éclosent en 3 à 4 jours ; les alevins nagent librement vers le 7ᵉ jour.',
    ],
    'Pendant les 2 à 3 premiers jours de nage, donnez des infusoires ou un aliment liquide pour alevins, puis des nauplies d’artémia fraîchement écloses.',
  ),
  'scalaire-manacapuru': r(
    'Modérée',
    'Pondeur sur support vertical, soins parentaux',
    'Cette variété de scalaire se reproduit comme l’espèce de base : couple stable, ponte sur un support vertical, éclosion en 3 à 4 jours et alevins nageant vers le 7ᵉ jour. Les parents mangent souvent leur première ponte.',
    [
      'Un grand aquarium haut, avec des grandes feuilles ou un support vertical pour la ponte',
      'Une eau à environ 25 °C et pH 7',
      'Un bac d’incubation rempli de l’eau du bac principal',
      'Infusoires ou aliment liquide pour alevins, puis nauplies d’artémia',
    ],
    [
      'Achetez un petit groupe de jeunes et laissez-les s’apparier d’eux-mêmes.',
      'Isolez le couple des autres poissons.',
      'Laissez un support vertical (feuille, tube de filtre, ardoise) pour la ponte.',
      'Si vous voulez des alevins, retirez le support de ponte vers un bac d’incubation rempli de la même eau : les parents mangent facilement leur première ponte.',
      'Les œufs éclosent en 3 à 4 jours ; les alevins nagent vers le 7ᵉ jour.',
    ],
    'Infusoires ou aliment liquide pour alevins pendant 2 à 3 jours, puis nauplies d’artémia fraîchement écloses.',
  ),
  'discus': r(
    'Difficile',
    'Pondeur sur support vertical, alevins nourris de mucus',
    'Le discus pond sur un support nettoyé au préalable, dans une eau très douce et acide (pH 6,0 à 6,5 requis). Les parents protègent œufs et alevins, et les alevins se nourrissent d’abord du mucus de leur peau.',
    [
      'Un bac de reproduction sans décor (nu), avec un cône de ponte ou un support vertical',
      'Une eau très douce (osmose possible, environ 1 °dH), acide (pH 6,0 à 6,5), chauffée jusqu’à environ 29 °C',
      'Un filtre à éponge de grande taille',
      'Nauplies d’artémia fraîchement écloses, puis petits granulés',
    ],
    [
      'Formez un couple (les poissons s’apparient d’eux-mêmes) et isolez-le dans un bac de reproduction nu, avec un cône de ponte.',
      'Réglez l’eau : très douce et acide (pH 6,0 à 6,5 est requis pour la reproduction), autour de 29 °C.',
      'Le couple nettoie le support puis pond (de l’ordre de 150 œufs ou plus). Les parents éventent les œufs et mangent ceux qui moisissent.',
      'Les œufs éclosent en environ 2 à 3 jours ; les parents déplacent les larves sur le cône, qui nagent librement vers le 6ᵉ jour.',
      'Les alevins broutent le mucus de la peau des parents pendant la première semaine environ, et certains continuent plusieurs semaines.',
      'Vers 4 semaines, passez à de très petits granulés ; vers 6 semaines, introduisez les vers de vase.',
    ],
    'Les premiers jours, les alevins se nourrissent du mucus des parents. Complétez avec des nauplies d’artémia fraîchement écloses, puis de très petits granulés vers 4 semaines.',
    'Il arrive que les parents mangent la première couvée : un couple qui n’a jamais élevé d’alevins peut demander plusieurs pontes avant de réussir.',
  ),
  'kribensis': r(
    'Facile',
    'Pondeur en caverne, soins parentaux',
    'Le kribensis pond jusqu’à 300 œufs sur le toit ou la paroi d’une caverne. La femelle soigne les œufs pendant que le mâle garde le territoire. Les œufs éclosent en 2 à 3 jours et les alevins nagent après 7 à 8 jours.',
    [
      'Des cavernes (pots de terre cuite dont on a retiré un morceau du bord)',
      'Une eau à 24–27 °C et pH 6,5 à 7,0, avec un filtre à éponge doux (les alevins se font aspirer par les filtres puissants)',
      'Nauplies d’artémia ou microvers pour les alevins',
    ],
    [
      'Installez plusieurs cavernes (pots de terre cuite) dans le bac.',
      'Réglez l’eau : 24 à 27 °C, pH 6,5 à 7,0. Un pH alcalin donne surtout des mâles, un pH acide surtout des femelles.',
      'Le couple choisit une caverne, parfois creusée sous le décor, et la femelle y pond jusqu’à 300 œufs sur le toit ou la paroi.',
      'La femelle soigne les œufs ; le mâle défend le territoire.',
      'Les œufs éclosent en 2 à 3 jours ; les alevins nagent librement après 7 à 8 jours.',
    ],
    'Premiers repas : nauplies d’artémia ou microvers. Les alevins broutent aussi algues et détritus.',
  ),
  'apistogramma-cacatuoides': r(
    'Modérée',
    'Pondeur en caverne, soins maternels',
    'L’apistogramma cacatoïde pond jusqu’à 300 œufs dans une caverne (pot de terre cuite ou niche dans un bois). Les œufs éclosent en 3 à 4 jours, les larves restent dans un creux jusqu’à la résorption du sac vitellin, puis nagent 4 à 7 jours plus tard. La femelle guide les alevins pendant plusieurs semaines.',
    [
      'Des pots de terre cuite, des cavernes et des cachettes',
      'Une eau tolérant un pH de 7,0 à 7,6 (inutile de l’acidifier à outrance)',
      'Nauplies d’artémia fraîchement écloses',
    ],
    [
      'Mettez un mâle avec une ou plusieurs femelles, avec beaucoup de cachettes et de pots de terre cuite.',
      'La femelle choisit sa caverne (parfois une niche dans un bois plutôt que le pot) et y pond jusqu’à 300 œufs.',
      'Elle garde et soigne les œufs ; le mâle défend le territoire. Quand le mâle devient trop pressant, déplacez-le ou séparez-le.',
      'Les œufs éclosent en 3 à 4 jours ; les larves tombent au fond de la caverne et restent dans un creux du substrat jusqu’à la résorption du sac vitellin.',
      'Les alevins nagent librement 4 à 7 jours plus tard.',
      'La femelle conduit les alevins dans le bac pendant plusieurs semaines.',
    ],
    'Nauplies d’artémia fraîchement écloses, proposées à la pipette près des alevins.',
    'Le mâle ne tolère aucun autre poisson dans son territoire : déplacez les poissons en trop une fois le couple formé.',
  ),
  'apistogramma-viejita': r(
    'Difficile',
    'Pondeur en caverne, soins maternels',
    'L’apistogramma viejita demande une eau douce, acide et de très bonne qualité, ainsi qu’une caverne à petite entrée. Les alevins nagent environ une semaine après la ponte, gardés par la femelle pendant que le mâle défend le territoire.',
    [
      'Une caverne à petite entrée (pot de terre cuite par exemple)',
      'Une eau douce, acide et de très bonne qualité',
      'Nauplies d’artémia ou microvers pour les alevins',
    ],
    [
      'Préparez une eau douce et acide, de très bonne qualité : c’est la condition de base.',
      'Fournissez des cavernes à petite entrée.',
      'Formez un couple, ou un harem (un mâle, plusieurs femelles ayant chacune son petit territoire).',
      'La femelle pond dans la caverne et garde la couvée ; le mâle défend le territoire.',
      'Les alevins nagent librement environ une semaine après l’éclosion ; la femelle les garde.',
    ],
    'Nauplies d’artémia fraîchement écloses ou microvers dès que les alevins nagent.',
  ),
  'ram-papiliochromis': r(
    'Modérée',
    'Pondeur sur pierre plate, soins biparentaux',
    'Le ram pond environ 200 œufs ambrés sur une pierre plate nettoyée. Les œufs éclosent en 4 jours, les alevins nagent 4 jours plus tard. Il faut une eau douce et chaude, un bac calme et aucun autre poisson : les rams mangent facilement leur ponte quand ils se sentent dérangés.',
    [
      'Des pierres plates et de petits pots de terre cuite',
      'Une eau douce (moins de 6 °dH pour des poissons d’élevage), à 27 °C ou un peu plus',
      'Un bac calme, éclairé modérément, sans autres poissons',
      'Nauplies d’artémia de petite taille, microvers et aliment en poudre',
    ],
    [
      'Identifiez un couple à leur couleur et à leur comportement : la femelle montre un ventre rose-rouge en condition de ponte et sa papille génitale est plus petite et arrondie.',
      'Préparez un bac calme, sans autres poissons, avec une pierre plate et des pots de terre cuite.',
      'Réglez l’eau : douce (moins de 6 °dH), pH 5 à 7, 27 °C ou un peu plus.',
      'Le couple nettoie la pierre et y pond environ 200 œufs ambrés.',
      'Les œufs éclosent en environ 4 jours ; le mâle peut déplacer les larves vers un pot couché. Les alevins nagent environ 4 jours plus tard.',
      'Retirez les parents vers 3 semaines si vous craignez que la couvée soit mangée.',
    ],
    'Nauplies d’artémia de petite taille, puis microvers et aliment en poudre très fin.',
    'N’ajoutez aucun autre poisson dans le bac de ponte : un ram qui se sent en insécurité mange ses œufs.',
  ),
  'oscar': r(
    'Modérée',
    'Pondeur sur roche plate, soins parentaux',
    'L’oscar pond sur une roche plate nettoyée (jusqu’à 2 000 œufs). Les parents s’en occupent longtemps, mais la difficulté est surtout la taille : un aquarium de 150 × 60 cm convient à peine à un seul adulte, bien plus grand pour un couple.',
    [
      'Un très grand aquarium (au moins 150 × 60 cm pour un adulte, davantage pour un couple)',
      'Des roches plates où le couple pond',
      'Rotifères, nauplies d’artémia et de cyclops pour les alevins',
    ],
    [
      'Achetez un groupe d’une demi-douzaine de jeunes ou plus et laissez-les s’apparier en grandissant, puis retirez les autres.',
      'Placez des roches plates dans le bac : le couple choisit un site et le nettoie.',
      'La femelle pond jusqu’à 2 000 œufs blancs et opaques, qui deviennent colorés en 24 heures s’ils sont viables.',
      'Les œufs éclosent en 3 à 4 jours ; les larves sont transférées dans des creux, où elles restent 6 à 7 jours jusqu’à ce qu’elles nagent.',
      'Les soins parentaux se prolongent après l’éclosion. Quand les alevins nagent librement, séparez-les des adultes.',
    ],
    'Rotifères, nauplies d’artémia et nauplies de cyclops au début, puis aliments plus gros.',
    'Un couple est agressif pendant la ponte et l’élevage des alevins : ne mélangez pas avec d’autres poissons.',
  ),
  'poisson-perroquet-nain-convict': r(
    'Très facile',
    'Pondeur en caverne, soins parentaux',
    'Le convict pond jusqu’à 300 œufs dans une caverne. La femelle garde les œufs et les alevins pendant plusieurs semaines, le mâle défend le territoire. Les œufs éclosent en 3 à 4 jours et les alevins nagent 4 à 7 jours plus tard. Le couple est très agressif pendant la reproduction.',
    [
      'Plusieurs cavernes et cachettes (pots de terre cuite)',
      'Une eau à 24–28 °C',
      'Nauplies d’artémia pour les alevins',
    ],
    [
      'Installez des cavernes et des pots de terre cuite : la ponte (jusqu’à 300 œufs) y sera déposée.',
      'La femelle garde les œufs ; le mâle défend le territoire et ne tolère pas d’autres poissons.',
      'Les œufs éclosent en 3 à 4 jours. Les larves tombent au fond de la caverne puis dans un creux du substrat jusqu’à la résorption du sac vitellin.',
      'Les alevins nagent 4 à 7 jours plus tard. Les parents les soignent pendant plusieurs semaines.',
      'Retirez les autres poissons une fois le couple formé.',
    ],
    'Nauplies d’artémia fraîchement écloses dès que les alevins nagent.',
    'Un couple de convicts devient très agressif : même un doigt imprudent peut être attaqué.',
  ),
  'cichlide-zebre-du-malawi': r(
    'Facile',
    'Incubation buccale maternelle',
    'Le cichlidé zèbre du Malawi est un incubateur buccal : la femelle garde les œufs dans sa bouche pendant 3 à 4 semaines sans manger, puis libère en moyenne 10 à 15 alevins déjà assez gros pour accepter des nauplies d’artémia et des aliments écrasés.',
    [
      'Un aquarium d’environ 120 cm, avec des roches plates et de la place en sable ouvert',
      'Une eau dure et alcaline (pH 8,0 à 8,5), à 25–26,5 °C',
      'Un petit bac vide, bien cyclé, pour la femelle avec les alevins',
    ],
    [
      'Formez un harem : un mâle et au moins trois femelles.',
      'Installez des roches plates et des zones de sable ouvert : la ponte et la fécondation s’y déroulent.',
      'Quand une femelle porte les œufs en bouche (joues gonflées), elle ne mange plus pendant 3 à 4 semaines.',
      'Pour protéger les alevins, isolez la femelle dans un petit bac garni de cachettes ; le mâle peut manger les alevins à la libération.',
      'La femelle libère les alevins nageurs au bout de 3 à 4 semaines.',
    ],
    'Dès la libération, les alevins prennent des nauplies d’artémia et des aliments secs écrasés.',
    'Ne dépouillez pas la bouche de la femelle avant 2 semaines : c’est réservé aux éleveurs expérimentés.',
  ),
  'cichlide-paon-aulonocara': r(
    'Facile',
    'Incubation buccale maternelle',
    'Le cichlidé paon est un incubateur buccal : les œufs éclosent 10 à 15 jours après la fécondation et la femelle garde ensuite les alevins en bouche jusqu’à deux semaines de plus, pour une couvée de 10 à 30 alevins environ.',
    [
      'Un aquarium bien décoré, avec cachettes',
      'Un harem : un mâle pour trois ou quatre femelles',
      'Un petit bac de 40 à 60 L, bien cyclé et garni de cachettes, pour la femelle et les alevins',
    ],
    [
      'Formez un groupe de même espèce : un mâle pour trois ou quatre femelles. Deux mâles adultes se battent jusqu’à la mort de l’un d’eux.',
      'Les femelles qui portent les œufs en bouche (joues gonflées) sont facilement repérées.',
      'Les œufs éclosent 10 à 15 jours après la fécondation ; la femelle garde ensuite les alevins jusqu’à deux semaines.',
      'Si vous voulez les sauver, déplacez la femelle dans un petit bac garni de cachettes avant la libération.',
      'Après la libération, les alevins sont à l’abri dans le petit bac ; les adultes du bac principal les mangeraient.',
    ],
    'Aliments très fins (nauplies d’artémia, flocons écrasés) pour les alevins déjà assez gros à la libération.',
    'Un mâle présent à la libération peut manger les alevins.',
  ),
  'cichlide-frontosa-tanganyika': r(
    'Difficile',
    'Incubation buccale maternelle',
    'Le frontosa est un incubateur buccal à maturité lente : il faut plusieurs années avant que les jeunes soient prêts. La femelle garde les œufs en bouche pendant 35 à 50 jours ou plus, pour seulement 10 à 50 œufs très gros.',
    [
      'Un très grand aquarium avec cachettes et roches',
      'Un harem : un mâle pour au moins trois ou quatre femelles',
      'Un bac séparé, bien cyclé, pour la femelle et les alevins',
    ],
    [
      'Achetez un groupe de jeunes : l’espèce n’est mature qu’après plusieurs années, patience.',
      'Formez un harem avec un mâle pour au moins trois ou quatre femelles : les mâles sont polygames.',
      'La femelle prend les œufs en bouche juste après la fécondation et les garde 35 à 50 jours ou plus. Elle peut alors recevoir de petits aliments, comme des nauplies d’artémia.',
      'Les alevins restent dans la bouche jusqu’à ce qu’ils soient capables de survivre seuls.',
      'Quand ils nagent librement, retirez-les du bac principal pour les élever séparément.',
    ],
    'Alevins déjà gros à la libération : nauplies d’artémia, puis aliments fins.',
    'Certains éleveurs retirent les œufs de la bouche pour les faire éclore ailleurs : cette technique est déconseillée aux débutants.',
  ),
  // ── Poissons-chats, plecos et autres ──
  'ancistrus-plecos-commun': r(
    'Facile',
    'Pondeur en caverne, soins paternels',
    'L’ancistrus pond en grappe dans une caverne ou une crevasse que le mâle a choisie et nettoyée. Une fois la femelle chassée, c’est le mâle qui garde les œufs. Les alevins vivent d’abord sur leur sac vitellin pendant 4 à 7 jours.',
    [
      'Des cavernes ou crevasses (tube, pot de terre cuite, bois creux)',
      'Un bac d’élevage rempli de l’eau du bac principal (facultatif)',
      'Infusoires, légumes, nauplies d’artémia ou microvers pour les alevins',
    ],
    [
      'Proposez plusieurs cavernes ou crevasses : le mâle en choisit une et la nettoie.',
      'La femelle y pond ses œufs en grappe.',
      'Le mâle chasse la femelle puis garde seul les œufs.',
      'Les alevins se collent aux parois de la caverne, vivent de leur sac vitellin pendant 4 à 7 jours, puis nagent librement.',
      'Quand ils nagent, laissez-les : quelques-uns survivent dans un bac peuplé s’il y a assez de cachettes, davantage s’ils sont élevés à part.',
    ],
    'Une fois le sac vitellin résorbé, donnez des infusoires, des légumes, des nauplies d’artémia ou des microvers.',
  ),
  'bristlenose-ancistrus-nain': r(
    'Facile',
    'Pondeur en caverne, soins paternels',
    'L’ancistrus nain pond en grappe dans une caverne ou une crevasse que le mâle a choisie et nettoyée. Une fois la femelle chassée, c’est le mâle qui garde les œufs. Les alevins vivent d’abord sur leur sac vitellin pendant 4 à 7 jours.',
    [
      'Des cavernes ou crevasses (tube, pot de terre cuite, bois creux)',
      'Un bac d’élevage rempli de l’eau du bac principal (facultatif)',
      'Infusoires, légumes, nauplies d’artémia ou microvers pour les alevins',
    ],
    [
      'Proposez plusieurs cavernes ou crevasses : le mâle en choisit une et la nettoie.',
      'La femelle y pond ses œufs en grappe.',
      'Le mâle chasse la femelle puis garde seul les œufs.',
      'Les alevins se collent aux parois de la caverne, vivent de leur sac vitellin pendant 4 à 7 jours, puis nagent librement.',
      'Quand ils nagent, laissez-les : quelques-uns survivent dans un bac peuplé s’il y a assez de cachettes, davantage s’ils sont élevés à part.',
    ],
    'Une fois le sac vitellin résorbé, donnez des infusoires, des légumes, des nauplies d’artémia ou des microvers.',
  ),
  'pleco-commun': nr(
    'Impossible en captivité',
    'Le pleco commun ne se reproduit pas en aquarium : les pontes observées concernaient des poissons de plus de 30 cm, dans de grands bassins. Les élevages commerciaux (Singapour, Floride, Hong Kong) utilisent de grands bassins aux berges abruptes, où chaque couple creuse un terrier et y pond environ 300 œufs.',
  ),
  'hypancistrus-zebra-l046': r(
    'Modérée',
    'Pondeur en caverne, soins paternels',
    'Le zèbre L046 se reproduit assez souvent en aquarium. Il faut un bac séparé avec des cavernes à entrée à peine plus large que le poisson, une eau chaude (28–30 °C) et du courant. Le mâle surveille la ponte de 7 à 15 œufs, qui éclosent en une semaine.',
    [
      'Un bac d’élevage séparé, avec de nombreuses cavernes dont l’entrée est à peine plus grande que le poisson',
      'Un léger courant près des entrées',
      'Un chauffage réglé à 28–30 °C',
      'Microvers et nauplies d’artémia en continu pour les alevins',
    ],
    [
      'Formez un groupe de reproduction avec 2 à 3 femelles par mâle, dans un bac séparé garni de cavernes à petite entrée.',
      'Réglez la température à 28–30 °C et assurez un peu de courant devant les cavernes.',
      'Après la ponte (7 à 15 œufs en général), le mâle défend la caverne et éventille les œufs. Certains éleveurs retirent les œufs et les élèvent dans un récipient suspendu avec une pierre à air.',
      'Les œufs éclosent en une semaine environ.',
      'Si la ponte tarde, faites de gros changements d’eau fraîche (50 à 70 %), à répéter tous les 2 ou 3 jours.',
    ],
    'Les alevins vivent de leur sac vitellin pendant 2 à 3 jours de plus, puis ont besoin de microvers ou de nauplies d’artémia, disponibles en permanence.',
  ),
  'otocinclus': r(
    'Difficile',
    'Pondeur sur vitre et plantes',
    'La reproduction de l’otocinclus en aquarium est possible mais peu documentée. Les femelles pondent quelques œufs à la fois sur la vitre ou sous les feuilles de plantes, et la survie des alevins reste inégale.',
    [
      'Un bac d’espèce planté, avec de la vitre propre',
      'Une eau de très bonne qualité',
      'Un aliment en poudre pour les alevins',
    ],
    [
      'Gardez un groupe d’otocinclus en bon état dans un bac planté et calme.',
      'Les femelles pondent quelques œufs à la fois, sur la vitre ou sous les feuilles. Vous pouvez en trouver sur plusieurs jours.',
      'Surveillez les œufs : ils éclosent en quelques jours et les alevins se cachent dans les plantes.',
      'Donnez un aliment en poudre dès le 3ᵉ jour après l’éclosion : un éleveur a obtenu une meilleure survie ainsi.',
      'Les alevins broutent aussi des légumes blanchis (courgette).',
    ],
    'Aliment en poudre à partir du 3ᵉ jour, et légumes blanchis (courgette).',
    'Les données sont limitées : sur plus de 50 œufs, un éleveur n’a obtenu qu’une trentaine d’alevins survivants. La qualité de l’eau est déterminante.',
  ),
  'poisson-chat-synodontis': r(
    'Difficile',
    'Pondeur en cavité ou dépression',
    'La reproduction du synodontis à l’envers a été obtenue en aquarium, mais les détails sont rares. Il pond jusqu’à 450 œufs, dans une dépression du substrat ou dans des tubes. Les alevins nagent après 4 jours et prennent la posture inversée vers 7 à 8 semaines.',
    [
      'Un bac d’espèce avec une dépression dans le substrat et des tubes (cavernes)',
      'Un gros changement d’eau froide pour déclencher la ponte',
      'Nauplies d’artémia ou microvers pour les alevins',
    ],
    [
      'Proposez des tubes et une dépression dans le substrat : les témoignages divergent sur le site de ponte.',
      'Déclenchez la ponte par un gros changement d’eau froide, qui imite la saison des pluies.',
      'Les œufs (jusqu’à 450 environ) éclosent, et les alevins nagent après 4 jours.',
      'Les alevins nagent d’abord à l’endroit, puis adoptent la posture inversée après 7 à 8 semaines.',
    ],
    'Nauplies d’artémia ou microvers dès que les alevins nagent.',
    'Peu de données fiables : traitez les chiffres comme des ordres de grandeur.',
  ),
  'poisson-chat-pictus': nr(
    'Impossible en captivité',
    'La reproduction du poisson-chat pictus en aquarium n’est pas connue de la communauté aquariophile : à notre connaissance, elle n’a pas été obtenue en aquarium privé.',
  ),
  'poisson-chat-de-verre': nr(
    'Impossible en captivité',
    'Aucune reproduction du poisson-chat de verre n’est documentée, et l’espèce ne semble jamais avoir été élevée commercialement : tous les poissons vendus sont pêchés dans la nature.',
  ),
  'poisson-hachette': nr(
    'Impossible en captivité',
    'La reproduction du poisson-hachette en aquarium n’est pas documentée, et l’espèce n’est pas élevée commercialement : tous les poissons en vente sont pêchés dans la nature.',
  ),
  'killie-nothobranchius': r(
    'Modérée',
    'Pondeur sur tourbe, œufs à incubation sèche',
    'Le killi Nothobranchius est un poisson annuel : il enfouit ses œufs dans la tourbe, qu’on retire et fait sécher plusieurs mois (de 5 à 7 mois pour N. rachovii) avant de la remouiller. La méthode est simple mais demande de la patience.',
    [
      'Un bac de ponte avec une couche de tourbe de sphaigne bouillie et rincée (environ 1,5 cm), ou un bac plastique avec un couvercle percé',
      'Une épuisette fine pour récolter la tourbe',
      'Un sac plastique étiqueté pour stocker la tourbe',
      'Des nauplies d’artémia ou des microvers pour les alevins',
    ],
    [
      'Placez la tourbe bouillie et rincée au fond du bac (environ 1,5 cm). Laissez les poissons pondre 1 à 3 semaines.',
      'Retirez la tourbe avec une épuisette fine, pressez-la pour retirer l’excès d’eau, puis laissez-la sécher à l’air jusqu’à ce qu’elle soit humide sans être détrempée.',
      'Fermez-la dans un sac plastique étiqueté (espèce, dates de récolte). Conservez-la vers 24 °C pendant toute la durée d’incubation propre à l’espèce (comptez 5 à 7 mois pour N. rachovii).',
      'Vérifiez que les œufs sont prêts : les yeux des embryons doivent être visibles.',
      'Plongez la tourbe dans environ 7 cm d’eau fraîche et mûre (16 à 20 °C), cassez toutes les mottes, retirez la tourbe qui flotte : l’éclosion commence en quelques heures.',
      'Une fois les alevins en train de manger, déplacez-les dans un autre récipient. Séchez de nouveau la tourbe 4 semaines avant de la remouiller : un second lot d’œufs peut éclore.',
    ],
    'Les alevins prennent des nauplies d’artémia fraîchement écloses peu après l’éclosion (parfois un jour d’infusoires pour N. rachovii), ainsi que des microvers. Changez l’eau souvent.',
    'Les œufs doivent rester humides mais non détrempés pendant toute la conservation.',
  ),
  'poisson-lune-metynnis': r(
    'Difficile',
    'Pondeur en groupe, œufs au fond',
    'Le métynnis pond en groupe, dans un grand bac, dans une eau plus douce et plus acide et à environ 28 °C. Une paire peut pondre jusqu’à 2 000 œufs, qui coulent au fond et éclosent en environ 3 jours.',
    [
      'Un grand bac d’élevage pour le groupe',
      'Une eau douce et acide, vers le bas de la plage de l’espèce',
      'Une eau chauffée à environ 28 °C',
      'Infusoires puis nauplies d’artémia et aliments en poudre',
    ],
    [
      'Conditionnez bien le groupe, puis installez-le dans un grand bac de ponte.',
      'Abaissez la dureté et le pH vers le bas de la plage de l’espèce et montez la température à environ 28 °C. Un changement d’eau un peu plus chaude peut déclencher la ponte.',
      'Les mâles foncent aux nageoires et leur poitrine devient plus rouge ; ils poursuivent les femelles et nagent à côté d’elles. La femelle libère les œufs et le mâle les féconde.',
      'Une fois la ponte finie, retirez les œufs : les adultes en mangent moins que d’autres poissons, mais l’élevage est plus simple ainsi.',
      'Les œufs éclosent en environ 3 jours.',
    ],
    'Une fois le sac vitellin résorbé, donnez des infusoires, puis des nauplies d’artémia fraîchement écloses et des aliments en poudre. Retirez les alevins petits ou déformés pour garder une couvée gérable.',
    'Une paire peut pondre jusqu’à 2 000 œufs : la mortalité est élevée.',
  ),
  'anableps-poisson-a-quatre-yeux': r(
    'Difficile',
    'Vivipare',
    'L’anableps est vivipare. La gestation dure environ 12 semaines et les jeunes naissent déjà grands (40 à 50 mm). Les naissances prématurées sont fréquentes en aquarium, parfois avec une hernie de l’intestin, et leur cause est inconnue.',
    [
      'Un groupe mixte dans un grand aquarium d’eau saumâtre (densité de 1,005 à 1,015)',
      'Un bac séparé pour isoler les femelles gestantes',
      'Une alimentation variée riche en protéines et en algues',
    ],
    [
      'Gardez un groupe mixte : l’accouplement se passe en général bien.',
      'Observez la femelle : son appétit augmente pendant les 12 semaines de gestation.',
      'Isolez les femelles gestantes et donnez une alimentation variée avec des proies riches en protéines et des algues.',
      'Peu avant la naissance, la femelle devient hostile envers ses voisins et cherche un endroit tranquille.',
      'En cas de naissance prématurée, certains jeunes ont été sauvés en les déplaçant dans un bac d’eau stérile.',
    ],
    'Les jeunes naissent complètement formés (40 à 50 mm) et acceptent d’emblée des aliments assez gros.',
    'La cause des naissances prématurées n’est pas connue : qualité de l’eau, régime, maturité ou stress sont suspectés.',
  ),
  // ── Autres poissons d'eau douce ──
  'poisson-archer': nr(
    'Impossible en captivité',
    'Aucune reproduction du poisson archer n’est rapportée en aquarium. L’espèce migrerait vers l’eau de mer pour se reproduire, des conditions très difficiles à reproduire en aquarium.',
  ),
  'poisson-couteau': nr(
    'Très difficile',
    'La reproduction du couteau fantôme noir est documentée en laboratoire et en aquaculture (ponte de nuit, entre 23 h et 2 h, meilleur résultat avec 2 mâles pour 3 femelles dans un aquarium de 80 × 40 × 40 cm), mais pas par des aquariophiles amateurs.',
    'Ne tentez pas de reproduction à domicile.',
  ),
  'poisson-elephant-mormyridae': nr(
    'Impossible en captivité',
    'Aucune reproduction du poisson-éléphant n’a été obtenue en captivité. En aquarium, les signaux électriques propres à chaque sexe deviennent moins nets, voire inversés : les poissons ne reconnaissent plus leur partenaire, ce qui inhibe la ponte.',
  ),
  'raie-d-eau-douce-potamotrygon-motoro': r(
    'Très difficile',
    'Vivipare matrotrophe',
    'La raie motoro est vivipare : les petits se développent dans la mère, qui les nourrit, et naissent sous forme de mini-adultes. La gestation dure 2 à 3 mois pour une portée de 1 à 8 raies. L’espèce a été reproduite en aquarium domestique, mais très lentement : la maturité sexuelle demande de nombreuses années.',
    [
      'Un très grand aquarium adapté à une raie adulte',
      'Un second bac pour séparer le couple et les jeunes',
      'Des changements d’eau importants et réguliers',
    ],
    [
      'Attendez la maturité sexuelle : les raies mettent de nombreuses années à l’atteindre.',
      'Formez un couple avec une femelle plus grande que le mâle : la parade peut être rude.',
      'Surveillez la gestation, qui dure 2 à 3 mois.',
      'Préparez des bacs séparés pour les jeunes : ils risquent d’être mangés et la naissance trouble l’eau.',
      'Après chaque naissance, prévoyez un grand changement d’eau, auquel les jeunes peuvent être sensibles.',
      'Séparez le couple après quelques portées : la reproduction est éprouvante pour la femelle.',
    ],
    'Les jeunes naissent déjà formés (mini-adultes) ; ils ont besoin de bacs séparés et d’une eau très propre.',
    'Cette espèce est réglementée (CITES) : conservez les documents de votre animal et des jeunes.',
  ),
  'arowana-asiatique': nr(
    'Très difficile',
    'L’arowana asiatique est un incubateur buccal paternel : le mâle porte les œufs dans sa bouche. Il est élevé commercialement surtout en bassins extérieurs par des éleveurs enregistrés CITES, et chaque poisson doit être micropucé et accompagné de documents officiels. La reproduction en aquarium amateur n’est pas envisageable.',
    'L’espèce est inscrite à l’annexe I de la CITES : chaque poisson doit être accompagné de papiers officiels.',
  ),
  'esturgeon-nain': nr(
    'Impossible en captivité',
    'Les esturgeons de type sterlet frayent au printemps en remontant les rivières, sur du gravier en courant fort, et ne deviennent matures qu’après une longue croissance (taille de première maturité d’environ 43 cm, temps de génération de plus de 13 ans). Leur reproduction n’est pas envisageable en aquarium ou en petit bassin.',
  ),
  'poisson-chat-requin-pangasius': nr(
    'Impossible en captivité',
    'Le pangasius ne se reproduit pas en aquarium amateur. Il est produit en aquaculture professionnelle, en écloserie, à partir de géniteurs sélectionnés.',
  ),
  'poisson-roseau': nr(
    'Très difficile',
    'La reproduction du poisson-roseau n’a pas été enregistrée en aquarium.',
  ),
  'anguille-serpent-mastacembelus': nr(
    'Impossible en captivité',
    'Aucune reproduction de l’anguille épineuse n’est rapportée en aquarium d’amateur.',
  ),
  'perche-soleil-naine-decorative': r(
    'Difficile',
    'Nid gardé par le mâle',
    'La perche soleil à bandes noires construit un nid et le protège contre les prédateurs. Une période hivernale froide de deux à trois mois est jugée nécessaire par certains éleveurs, dans une eau très douce et acide. La reproduction est peu documentée.',
    [
      'Un bac d’espèce planté, avec une eau très douce et acide (pH au plus aux alentours de 6,5)',
      'Un endroit frais pour l’hivernage (environ 4 à 10 °C)',
      'Des plantes ou des abris pour le nid',
      'Des nauplies d’artémia fraîchement écloses pour les alevins',
    ],
    [
      'Gardez le groupe dans une eau très douce et acide (pH au plus vers le milieu des 6).',
      'Faites passer l’hiver aux poissons au froid pendant deux ou trois mois, vers 4 à 10 °C, avec une alimentation réduite.',
      'Au printemps, remontez la température et observez le mâle : il choisit un site de nid parmi les plantes ou un autre abri.',
      'La femelle y pond, puis le mâle la chasse : retirez la femelle si elle est poursuivie.',
      'Le mâle garde les œufs jusqu’à l’éclosion et environ une semaine de plus, jusqu’à ce que les alevins nagent.',
    ],
    'Une fois le sac vitellin résorbé, donnez des nauplies d’artémia fraîchement écloses.',
    'Aucune reproduction en élevage n’est connue de la communauté britannique : les informations sont limitées.',
  ),
  // ── Poissons de bassin ──
  'carpe-koi': r(
    'Modérée',
    'Pondeur sur supports, œufs dispersés',
    'Le koï se reproduit naturellement dans un bassin si des mâles et des femelles matures sont présents et si les conditions leur conviennent. Beaucoup de pontes passent inaperçues parce que les parents et les autres poissons mangent les œufs. Les œufs éclosent en 4 à 5 jours.',
    [
      'Un bassin avec des supports de ponte (cordes, brosses ou fibres de ponte)',
      'Un grand récipient avec des plantes de bassin et une oxygénation douce',
      'Une eau identique à celle du bassin principal',
      'Des infusoires et des daphnies pour les alevins',
    ],
    [
      'Gardez des mâles et des femelles matures dans un bassin avec des supports de ponte (cordes, brosses).',
      'Observez régulièrement les poissons pour repérer la ponte.',
      'Une fois les œufs déposés, retirez-les : séparez-les des parents et élevez-les dans un récipient.',
      'Le récipient doit être spacieux, avec des plantes de bassin et une oxygénation douce et continue, dans une eau identique à celle du bassin.',
      'Les œufs éclosent en général en 4 à 5 jours.',
    ],
    'Les alevins se nourrissent de leur sac vitellin pendant les premiers jours, puis ont besoin d’un apport régulier de petites proies vivantes, comme des infusoires et des daphnies.',
  ),
  'poisson-rouge-carassin-dore': r(
    'Facile',
    'Pondeur sur plantes, œufs collants',
    'Le poisson rouge se reproduit dès que l’eau atteint environ 15 °C : les mâles poursuivent les femelles vers les plantes ou des supports de ponte. Une femelle pond de 500 à 1 000 œufs, qui éclosent en 48 à 72 heures selon la température.',
    [
      'Des plantes aquatiques ou des fibres de ponte (supports de ponte artificiels)',
      'Un second bac ou bassin pour les œufs, rempli d’eau identique',
      'Des nauplies d’artémia pour les alevins',
    ],
    [
      'Gardez deux mâles pour une femelle pour de meilleures chances de fécondation. Les mâles mûrs ont des boutons blancs sur les nageoires pectorales et les ouïes.',
      'Quand l’eau atteint environ 15 °C, les mâles poursuivent les femelles : les œufs sont pondus parmi les plantes ou sur des fibres de ponte.',
      'Retirez les adultes (ou les supports de ponte portant les œufs) : les autres poissons mangent facilement les œufs.',
      'Les œufs sains sont clairs, les œufs abîmés deviennent opaques : retirez ces derniers pour limiter les moisissures.',
      'Les œufs éclosent en 48 à 72 heures selon la température. Évitez de déranger les alevins : ils peuvent d’abord couler au fond.',
    ],
    'Nauplies d’artémia en petites quantités et en continu. Retirez les restes au bout de quelques heures.',
  ),
  'shubunkin': r(
    'Facile',
    'Pondeur sur plantes, œufs collants',
    'Le shubunkin est un poisson rouge et se reproduit comme lui : dès que l’eau atteint environ 15 °C, les mâles poursuivent les femelles vers les plantes ou des fibres de ponte. Les œufs éclosent en 48 à 72 heures.',
    [
      'Des plantes aquatiques ou des fibres de ponte',
      'Un second bac ou bassin pour les œufs, rempli d’eau identique',
      'Des nauplies d’artémia pour les alevins',
    ],
    [
      'Gardez deux mâles pour une femelle.',
      'Quand l’eau atteint environ 15 °C, les mâles poursuivent les femelles : les œufs sont pondus parmi les plantes ou sur des fibres de ponte.',
      'Retirez les adultes (ou les supports portant les œufs) : les autres poissons mangent les œufs.',
      'Retirez les œufs opaques pour limiter les moisissures.',
      'Éclosion en 48 à 72 heures selon la température.',
    ],
    'Nauplies d’artémia en petites quantités et en continu.',
  ),
  'ryukin': r(
    'Modérée',
    'Pondeur sur plantes, œufs collants',
    'Le ryukin est un poisson rouge de forme sélectionnée et se reproduit comme lui : dès que l’eau atteint environ 15 °C, les mâles poursuivent les femelles vers des plantes ou des fibres de ponte. Les œufs éclosent en 48 à 72 heures.',
    [
      'Des plantes aquatiques ou des fibres de ponte',
      'Un second bac ou bassin pour les œufs, rempli d’eau identique',
      'Des nauplies d’artémia pour les alevins',
    ],
    [
      'Gardez deux mâles pour une femelle.',
      'Quand l’eau atteint environ 15 °C, les mâles poursuivent les femelles : les œufs sont pondus parmi les plantes ou sur des fibres de ponte.',
      'Retirez les adultes (ou les supports portant les œufs) : les autres poissons mangent les œufs.',
      'Retirez les œufs opaques pour limiter les moisissures.',
      'Éclosion en 48 à 72 heures selon la température.',
    ],
    'Nauplies d’artémia en petites quantités et en continu.',
  ),
  'poisson-rouge-bubble-eye': r(
    'Modérée',
    'Pondeur sur plantes, œufs collants',
    'Le poisson rouge bubble eye se reproduit comme les autres poissons rouges : dès que l’eau atteint environ 15 °C, les mâles poursuivent les femelles vers des plantes ou des fibres de ponte. Les œufs éclosent en 48 à 72 heures.',
    [
      'Des plantes aquatiques ou des fibres de ponte',
      'Un second bac ou bassin pour les œufs, rempli d’eau identique',
      'Des nauplies d’artémia pour les alevins',
    ],
    [
      'Gardez deux mâles pour une femelle.',
      'Quand l’eau atteint environ 15 °C, les mâles poursuivent les femelles : les œufs sont pondus parmi les plantes ou sur des fibres de ponte.',
      'Retirez les adultes (ou les supports portant les œufs) : les autres poissons mangent les œufs.',
      'Retirez les œufs opaques pour limiter les moisissures.',
      'Éclosion en 48 à 72 heures selon la température.',
    ],
    'Nauplies d’artémia en petites quantités et en continu.',
  ),
  'tanche': r(
    'Modérée',
    'Pondeur sur plantes, œufs collants',
    'La tanche pond de mai à septembre vers 19–20 °C dans une végétation dense, en eau calme. Ses œufs verts et collants sont pondus tous les 1 à 5 jours pendant environ deux mois et éclosent en 3 jours à 20 °C. Elle est mature à 2–3 ans (mâles) et 3–7 ans (femelles).',
    [
      'Un grand bassin avec une végétation dense et une eau calme',
      'Une eau à 19–20 °C',
    ],
    [
      'Attendez la maturité : environ 2 à 3 ans pour les mâles, 3 à 7 ans pour les femelles.',
      'Garnissez le bassin de végétation dense en eau calme.',
      'Entre mai et septembre, vers 19 à 20 °C, la femelle pond de nombreux œufs verts et collants, collés aux plantes ou déposés au fond, tous les 1 à 5 jours pendant environ deux mois.',
      'Les œufs éclosent en environ 3 jours à 20 °C.',
      'Les larves (4 à 5 mm) restent accrochées aux plantes jusqu’à la résorption du sac vitellin.',
    ],
    'Les larves restent accrochées aux plantes quelques jours, puis ont besoin de petites proies vivantes.',
    'La croissance est lente : la maturité demande plusieurs années.',
  ),
  'vairon': nr(
    'Difficile',
    'Le vairon fraie au printemps sur du gravier propre en courant, ou sur les rives balayées par les vagues des lacs : les femelles pondent des œufs collants enfouis dans le gravier, qui éclosent en 4 à 5 jours à 18 °C. Cette reproduction n’est pas documentée en aquarium ou en petit bassin.',
  ),
  'ide-melanote': nr(
    'Difficile',
    'L’ide fraie au printemps, en eau peu profonde, pendant 3 à 4 jours ; les œufs adhèrent au gravier ou à la végétation et éclosent en 1 à 2 semaines. L’espèce est mature à 3–5 ans, voire 7 ans en eau fraîche. La reproduction n’est pas documentée en bassin d’amateur.',
  ),
  'amour-blanc': nr(
    'Impossible en captivité',
    'L’amour blanc atteint la maturité en captivité mais ne peut pas se reproduire naturellement : la ponte exige un courant et des variations du niveau d’eau, et les élevages professionnels utilisent des injections d’hormones dans de grands bassins en béton.',
  ),
  'poisson-clown-ocellaris': clown(
    'Le poisson-clown ocellaris est considéré comme l’un des poissons marins les plus faciles à reproduire en aquarium domestique : le couple pond sur un support nettoyé et le mâle garde les œufs. L’étape exigeante est l’élevage des larves, qui demande des proies vivantes microscopiques.',
  ),
  'poisson-clown-percula': clown(
    'Le poisson-clown percula se reproduit comme les autres poissons-clowns du genre Amphiprion : ponte sur un support nettoyé, œufs gardés par le mâle, puis larves planctoniques à élever avec des proies vivantes microscopiques.',
  ),
  'poisson-clown-tomate': clown(
    'Le poisson-clown tomate se reproduit comme les autres poissons-clowns du genre Amphiprion : ponte sur un support nettoyé, œufs gardés par le mâle, puis larves planctoniques à élever avec des proies vivantes microscopiques.',
  ),
  'poisson-clown-de-clark': clown(
    'Le poisson-clown de Clark se reproduit comme les autres poissons-clowns du genre Amphiprion : ponte sur un support nettoyé, œufs gardés par le mâle, puis larves planctoniques à élever avec des proies vivantes microscopiques.',
  ),
  'poisson-clown-skunk': clown(
    'Le poisson-clown skunk se reproduit comme les autres poissons-clowns du genre Amphiprion : ponte sur un support nettoyé, œufs gardés par le mâle, puis larves planctoniques à élever avec des proies vivantes microscopiques.',
  ),
  'poisson-clown-a-dos-rouge': clown(
    'Le poisson-clown à dos rouge se reproduit comme les autres poissons-clowns du genre Amphiprion : ponte sur un support nettoyé, œufs gardés par le mâle, puis larves planctoniques à élever avec des proies vivantes microscopiques.',
  ),
  'poisson-clown-marron': clown(
    'Le poisson-clown marron (genre Premnas) fait partie, avec les Amphiprion, des seuls poissons de la famille des demoiselles élevés à l’échelle commerciale. La ponte se déroule comme chez les autres poissons-clowns ; l’élevage des larves demande des proies vivantes microscopiques.',
  ),
  'cardinalis-de-banggai': r(
    'Facile',
    'Incubation buccale par le mâle',
    'Le cardinal de Banggai se reproduit facilement en aquarium : le mâle incube les œufs dans sa bouche, puis libère de petits poissons déjà formés, sans phase larvaire planctonique. C’est l’un des poissons marins les plus accessibles pour un amateur.',
    [
      'Un aquarium marin mûr d’au moins 80 L pour un couple, avec des structures verticales (roches, branches) où se réfugier',
      'Un groupe de jeunes (une demi-douzaine ou plus) pour que le couple se forme seul, ou un couple connu',
      'Une eau stable, vers 25 à 27 °C',
      'Des nauplies d’artémia fraîchement écloses pour les jeunes',
    ],
    [
      'Gardez un groupe de jeunes ou un couple connu : les sexes se distinguent mal, mais le mâle a la mâchoire inférieure qui fonce pendant la parade.',
      'La femelle lance la parade : les deux poissons nagent côte à côte, la tête proche de l’orifice génital de l’autre.',
      'La femelle libère une vingtaine à une soixantaine d’œufs de 2,5 à 3 mm près du fond ; le mâle les féconde et les prend dans sa bouche.',
      'Le mâle incube pendant environ 3 à 4 semaines, sans manger. Ne le dérangez pas.',
      'Il libère alors de petits poissons de 6 à 8 mm, complètement formés. Il ne s’en occupe plus ensuite : les jeunes ont besoin de cachettes, par exemple entre des branches.',
    ],
    'Les jeunes ressemblent à de petits adultes et acceptent dès le début des nauplies d’artémia fraîchement écloses, plusieurs fois par jour, sans phase de rotifères. On passe ensuite à des aliments très fins (granulés écrasés, cyclops congelés, aliment en gel), puis à des mysis hachées.',
    'L’espèce est classée « en danger » par l’UICN : préférez des poissons nés en élevage, largement disponibles.',
  ),
  'cardinal-pyjama': r(
    'Difficile',
    'Incubation buccale par le mâle',
    'Chez le cardinal pyjama, le mâle incube les œufs dans sa bouche, comme le cardinal de Banggai. Mais ici les œufs donnent de vraies larves planctoniques, minuscules : leur élevage est la difficulté de l’espèce, bien qu’elle soit produite en élevage commercial.',
    [
      'Un couple ou un petit groupe bien nourri',
      'Un bac d’élevage séparé, assombri',
      'Des cultures de rotifères marins et de nannochloropsis, prêtes avant la ponte',
      'Des nauplies d’artémia enrichies, puis un aliment sec pour larves de 50 à 100 microns',
    ],
    [
      'Nourrissez bien le couple. Une fois la reproduction lancée, il pond environ toutes les deux à trois semaines.',
      'Le mâle porte les œufs dans sa bouche. Au début, il arrive qu’il les mange ou les relâche : plusieurs pontes peuvent être nécessaires.',
      'Les larves commencent à éclore vers le 7e–8e jour, et le reste de la ponte quitte la bouche du mâle vers le 9e jour.',
      'Les éleveurs prélèvent les œufs vers le 8e jour pour les faire éclore dans le bac d’élevage séparé.',
    ],
    'Les larves reçoivent des rotifères marins en forte densité dans une eau assombrie à la nannochloropsis. Les rotifères sont enrichis en acides gras dès le 5e jour, les nauplies d’artémia enrichies viennent après le 12e jour et un aliment sec pour larves de 50 à 100 microns à partir de la troisième semaine.',
    'Les larves sont très sensibles à la hausse de l’ammoniaque. Un éleveur amateur cité par TFH Magazine a eu besoin de quatre ans d’essais pour obtenir des résultats réguliers.',
  ),
  'opistognathe-a-front-jaune': r(
    'Difficile',
    'Incubation buccale par le mâle',
    'Le mâle de l’opistognathe à front jaune incube les œufs dans sa bouche et vit dans un terrier qu’il creuse lui-même : il faut donc un fond très épais. Les pontes réussies restent rares chez les amateurs, car les jeunes mâles mangent souvent les œufs.',
    [
      'Un fond de sable et de gravier très profond : au moins 15 cm, certains éleveurs recommandent jusqu’à 30 cm',
      'Des coquillages et de petits cailloux, que les poissons utilisent pour bâtir et couvrir leurs terriers',
      'Un bac d’élevage séparé d’environ 75 L, pour les larves',
      'Des cultures de rotifères, d’algues et de nauplies d’artémia prêtes avant la ponte',
    ],
    [
      'Aménagez un fond profond avec des coquilles et des cailloux : chaque poisson creuse son propre terrier.',
      'Réunissez un couple. La femelle pond une masse d’environ 100 œufs de 2 mm, adhésifs, que le mâle prend dans sa bouche.',
      'Le mâle incube seul. Les jeunes mâles mangent souvent les œufs un à trois jours après les avoir pris, et même des couples bien assortis échouent souvent sur leurs premières pontes.',
      'Les larves éclosent dans le noir, mesurent 2 à 3 mm et sont fragiles. Il faut les isoler dans le bac d’élevage dès l’éclosion, car elles ne survivent pas en bac communautaire.',
    ],
    'Dans un rapport d’éleveur, les larves reçoivent d’abord des rotifères enrichis, puis des nauplies d’artémia et des copépodes benthiques. La survie y atteint 35 % la première semaine et 16 % la quatrième ; la métamorphose a lieu vers les jours 20 à 23. Les jeunes sont robustes mais sujets aux infections bactériennes.',
    'La plupart des opistognathes du commerce sont prélevés dans la nature, et les reproductions réussies documentées restent peu nombreuses.',
  ),
  'gramma-royal': r(
    'Difficile',
    'Nid gardé par le mâle',
    'Le mâle du gramma royal construit et garde un nid dans une cavité, où une ou plusieurs femelles viennent pondre. La ponte est possible en aquarium ; l’élevage des larves, très petites, reste la difficulté et les protocoles accessibles sont peu documentés.',
    [
      'Un aquarium avec plusieurs cavités (tubes en PVC, arches de roche) : les essais cités utilisaient de petits bacs de 23 L',
      'Un mâle pour deux femelles, un rapport qui favorise la parade et l’utilisation du nid d’après des essais préliminaires',
      'Un bac d’élevage et des cultures de proies vivantes de très petite taille',
    ],
    [
      'Installez un groupe avec un mâle pour deux femelles, dans un bac offrant plusieurs cavités.',
      'Le mâle choisit une cavité, l’entretient comme un nid et s’y accouple avec les femelles. Plusieurs femelles peuvent y pondre.',
      'Le mâle garde les œufs jusqu’à l’éclosion de larves déjà robustes.',
      'Pour récupérer les larves, des éleveurs utilisent un nid en PVC fermé par une grille qui sépare les larves des adultes.',
    ],
    'Les larves sont minuscules et demandent des proies vivantes de la taille des rotifères. Les publications consultées décrivent surtout leur collecte, pas un protocole détaillé de nourrissage : n’espérez pas de succès sans expérience préalable de l’élevage de larves marines.',
    'La fécondité du gramma est plus faible que celle d’autres espèces, ce qui freine son élevage commercial.',
  ),
  'pseudochromis-de-fridman': r(
    'Difficile',
    'Œufs adhésifs en cavité, gardés par le mâle',
    'Le pseudochromis de Fridman pond dans une cavité choisie par le mâle. La ponte est régulière en aquarium et l’espèce est produite en élevage commercial, mais les larves demandent beaucoup de soins.',
    [
      'Un couple dans un bac avec une cavité profonde (une grotte d’environ 10 cm de profondeur dans un rapport d’éleveur) ou un tube en PVC',
      'Un bac d’élevage séparé pour les larves',
      'Des cultures de rotifères enrichis et du plancton, prêts avant la ponte',
    ],
    [
      'Offrez une cavité : le mâle choisit une grotte ou un tube en PVC et fait une parade à l’extérieur.',
      'Si la femelle accepte, elle entre et pond plusieurs centaines d’œufs adhésifs que le mâle féconde dans la foulée (environ un millier dans un rapport d’éleveur, en une masse d’environ 2 cm).',
      'Le mâle chasse la femelle, ventile les œufs avec ses nageoires pectorales et peut les déplacer en cas de danger. Dans un rapport d’éleveur, il pond environ tous les 6 jours.',
      'Les œufs éclosent en 3 à 5 jours selon la température, peu après la tombée de la nuit. Séparez les jeunes des parents juste avant, car les soins parentaux s’arrêtent à l’éclosion.',
    ],
    'Les larves de 2,5 mm sont attirées par la lumière. Dans un rapport d’éleveur, elles reçoivent des rotifères enrichis deux à trois fois par jour, puis du plancton sauvage dès le 3e jour, et se métamorphosent en 22 à 32 jours. La survie y est d’environ 50 % la première semaine puis 20 % la deuxième.',
    'La femelle peut sortir de la ponte avec des nageoires déchirées ou des écailles manquantes : surveillez la qualité de l’eau pour qu’elle récupère.',
  ),
  'poisson-mandarin': r(
    'Très difficile',
    'Œufs pélagiques, ponte au crépuscule',
    'Le mandarin pond au crépuscule, lors d’une montée vers la surface, et ses œufs flottent. La ponte est possible en aquarium mais l’élevage est l’un des plus exigeants du loisir : les larves sont parmi les plus petites larves de poissons marins et exigent des copépodes en culture.',
    [
      'Un couple ou un harem bien conditionné (un mâle, plusieurs femelles), habitué aux proies congelées et nourri aussi de proies vivantes',
      'Un bac d’élevage séparé, avec un léger courant',
      'Des cultures stables de copépodes pélagiques (Parvocalanus crassirostris) et de rotifères',
      'Un éclairage à deux phases, avec une lumière actinique pour l’aube et le crépuscule',
    ],
    [
      'Constituez un couple ou un harem. Le mâle a le premier rayon de la nageoire dorsale allongé. Les couples échouent souvent quand les poissons sont mal conditionnés ou quand le mâle est plus petit que la femelle.',
      'Nourrissez-les abondamment de proies vivantes et congelées. Un éclairage principal de 12 à 14 heures complété par une lumière actinique pour l’aube et le crépuscule aide certains éleveurs à synchroniser la ponte.',
      'Au crépuscule, le couple monte en parade vers la surface et libère œufs et sperme, puis redescend. Un couple bien nourri peut pondre toutes les une à trois nuits.',
      'Récoltez les œufs flottants à la surface avec un bécher et transférez-les dans le bac d’élevage dans les 15 heures, avant l’éclosion.',
    ],
    'Vers le 3e jour, les larves passent du vert au jaune vif et mangent seules. Elles ont besoin de nauplies de copépodes pélagiques, assez petites pour elles ; d’autres éleveurs ont aussi utilisé des rotifères ou du plancton sauvage. Elles se posent vers le 12e jour, grandissent très lentement et peuvent mettre presque un an à atteindre une taille vendable, avec l’essentiel des pertes pendant cette période.',
    'Sans cultures de copépodes déjà en place avant la ponte, il est inutile de commencer.',
  ),
  'mandarin-psychedelique': r(
    'Très difficile',
    'Œufs pélagiques, ponte au crépuscule',
    'Le mandarin psychédélique, ou mandarin tacheté, suit la même reproduction que les autres mandarins : ponte au crépuscule lors d’une montée vers la surface, œufs flottants, larves minuscules. Ce sont les copépodes en culture qui rendent l’élevage exigeant.',
    [
      'Un couple ou un harem bien conditionné (un mâle, plusieurs femelles), habitué aux proies congelées et nourri aussi de proies vivantes',
      'Un bac d’élevage séparé, avec un léger courant',
      'Des cultures stables de copépodes pélagiques (Parvocalanus crassirostris) et de rotifères',
      'Un éclairage à deux phases, avec une lumière actinique pour l’aube et le crépuscule',
    ],
    [
      'Constituez un couple ou un harem. Le mâle a le premier rayon de la nageoire dorsale allongé. Les couples échouent souvent quand les poissons sont mal conditionnés ou quand le mâle est plus petit que la femelle.',
      'Nourrissez-les abondamment de proies vivantes et congelées.',
      'Au crépuscule, le couple monte en parade vers la surface et libère œufs et sperme, puis redescend.',
      'Récoltez les œufs flottants à la surface avec un bécher et transférez-les dans le bac d’élevage dans les 15 heures, avant l’éclosion.',
    ],
    'Les larves ont besoin de nauplies de copépodes pélagiques, assez petites pour elles ; d’autres éleveurs ont aussi utilisé des rotifères ou du plancton sauvage. Chez les mandarins tachetés, la métamorphose a lieu en 12 à 14 jours environ. La croissance est ensuite très lente et la plupart des pertes ont lieu avant la taille vendable.',
    'Sans cultures de copépodes déjà en place avant la ponte, il est inutile de commencer.',
  ),
  'gobie-neon': r(
    'Difficile',
    'Œufs collés, gardés par le mâle',
    'Le gobie néon pond facilement en aquarium : les gobies du genre Elacatinus font partie des gobies produits en élevage. La difficulté vient des larves, qui sont planctoniques et demandent des rotifères enrichis.',
    [
      'Un couple dans un petit aquarium individuel (20 à 40 L), dont les vitres voisines sont masquées pour limiter le stress',
      'Un support de ponte : tube en PVC de petit diamètre, pot en terre cuite, carrelage ou roche',
      'Un bac d’élevage avec une aération très douce',
      'Des rotifères enrichis, puis des nauplies d’artémia',
    ],
    [
      'Formez un couple : les gobies néon forment toujours des couples bien distincts pour pondre. Une alimentation riche en protéines et un éclairage d’au moins 12 heures par jour favorisent la ponte.',
      'Proposez un tube en PVC court ou un autre support : les œufs, retenus par des filaments, y sont collés et soignés par les parents.',
      'Une fois les œufs pondus, vous pouvez déplacer le tube avec les œufs dans un bac identique, à l’abri des prédateurs, avec une aération très douce.',
      'Les œufs éclosent en environ 8 jours, selon la température.',
    ],
    'Les larves de 3 à 3,5 mm reçoivent d’abord des rotifères enrichis en acides gras (DHA, EPA), puis des nauplies d’artémia vers le 7e jour et enfin des aliments microparticulaires, jusqu’à la fixation, qui a lieu entre 26 et 58 jours après l’éclosion selon l’espèce. Les jeunes fixés sont fragiles.',
    'Les pertes d’œufs et de larves sont fréquentes : l’alimentation des larves doit être gérée avec soin.',
  ),
  'gobie-clown': r(
    'Difficile',
    'Œufs collés sur un support, gardés par le mâle',
    'Le gobie clown jaune pond sur le corail qui l’abrite ou sur toute surface du bac. La ponte est signalée seulement de façon sporadique chez les amateurs, car les larves sont minuscules et difficiles à nourrir.',
    [
      'Un aquarium d’au moins 100 L, car ces gobies se disputent dans les très petits bacs',
      'Plusieurs gobies pour obtenir un couple, ou un couple déjà formé',
      'Un bac d’élevage, et de grandes quantités de rotifères et de petits ciliés',
      'Des nauplies d’artémia pour les jeunes au moment de la fixation',
    ],
    [
      'Gardez un couple dans un bac d’au moins 100 L ; en ajouter plusieurs peut aider à en obtenir un.',
      'La femelle dépose ses œufs sur le corail hôte ou sur la surface qu’ils utilisent dans le bac ; la fécondation est externe.',
      'Le mâle garde les œufs, les ventile et retire les moisissures.',
      'Les œufs éclosent en moins d’une semaine. Une ponte peut donner jusqu’à environ 500 larves.',
    ],
    'Les larves de gobies clowns et de Paragobiodon sont plus petites que celles des autres gobies : il leur faut des proies de moins de 180 microns, comme des ciliés et des rotifères, en grandes quantités. Elles restent planctoniques environ 30 jours avant de se poser sur les branches des coraux. À ce stade, elles acceptent des nauplies d’artémia.',
    'L’élevage des larves est l’étape qui fait échouer la plupart des tentatives.',
  ),
  'gobie-crevette': nr(
    'Très difficile',
    'Le gobie crevette jaune fait partie des gobies produits à l’échelle commerciale, mais cette production relève d’écloseries professionnelles. En aquarium amateur, un rapport d’éleveur décrit une ponte de plus de 5 000 œufs jaunes fixés au plafond d’un demi-pot de fleurs, éclos en 4 à 5 jours au lever du jour : les larves de moins de 2 mm ont reçu des rotifères, mais la survie a chuté à moins de 1 % à la 4e semaine et aucune n’a dépassé 30 jours.',
  ),
  'gobie-nemateleotris': nr(
    'Très difficile',
    'Le gobie nemateleotris (poisson de feu) n’est pas élevé en aquarium amateur. Un laboratoire de l’université de Floride a obtenu des pontes de 3 000 à 6 000 œufs environ chaque mois chez un couple, et élevé des larves jusqu’à 52 jours sans qu’elles se posent. Le passage des nauplies de copépodes à l’artémia provoque une forte mortalité : l’espèce reste au stade de la recherche.',
  ),
  'gobie-a-longs-filaments': nr(
    'Très difficile',
    'Le genre Stonogobiops est cité parmi les genres de gobies élevés en captivité, et une photo montre un Stonogobiops yasha qui garde ses œufs. Nous n’avons toutefois retrouvé aucun protocole publié pour cette espèce : aucune méthode accessible à un amateur n’est documentée.',
  ),
  'gobie-nettoyeur-de-sable': nr(
    'Très difficile',
    'Les genres Valenciennea et Amblygobius sont cités comme élevés en captivité, mais aucune espèce de ces genres ne figure parmi les gobies produits couramment. Aucun protocole publié pour cette espèce n’a été retrouvé : aucune méthode accessible à un amateur n’est documentée.',
  ),
  'gobie-sifteur-de-sable': nr(
    'Très difficile',
    'Les genres Valenciennea et Amblygobius sont cités comme élevés en captivité, mais aucune espèce de ces genres ne figure parmi les gobies produits couramment. Aucun protocole publié pour cette espèce n’a été retrouvé : aucune méthode accessible à un amateur n’est documentée.',
  ),
  'blennie-a-queue-fourchue': r(
    'Difficile',
    'Œufs collés dans une cavité, gardés par le mâle',
    'La blennie à queue fourchue se reproduit en bac et a été élevée par des chercheurs : les pontes sont régulières, et l’éclosion se passe bien. La difficulté est l’élevage des larves, qui demande des rotifères puis des nauplies d’artémia.',
    [
      'Un petit groupe d’adultes (des harems de six poissons ont pondu dans un essai), avec des abris en tube PVC de 50 mm à entrée réduite à 25 mm',
      'Un bac d’éclosion séparé pour y placer les œufs juste avant l’éclosion',
      'Une alimentation riche en protéines (plus de 40 %) complétée d’algues pour les adultes',
      'Des rotifères enrichis, de l’eau verte, des nauplies d’artémia et des aliments microparticulaires pour les larves',
    ],
    [
      'Formez des couples en laissant un petit groupe de jeunes s’apparier seul, ou installez un harem.',
      'Offrez des abris en tube PVC : le mâle y garde les œufs. Dans l’essai cité, la ponte a débuté environ trois mois après l’arrivée des poissons ; la femelle lance la parade.',
      'Les œufs, collés au support, mesurent environ 1 mm ; ils sont jaunes ou orange à la ponte puis grisent en se développant. Un couple peut ensuite pondre environ tous les 8 jours.',
      'Les œufs restent avec les parents : ils éclosent mieux et attrapent moins de maladies. Ils éclosent en 7 à 11 jours selon la température (environ 181 heures à 28 °C dans l’essai).',
      'Juste avant l’éclosion, déplacez les œufs dans un bac séparé pour que les parents ne mangent pas les larves.',
    ],
    'Les larves de 3 mm environ vivent sur leur vitellus jusqu’au 3e jour, puis reçoivent des rotifères enrichis (avec de l’eau verte), puis des nauplies d’artémia vers le 7e jour (elles peuvent en manger entre les jours 6 et 10), et ensuite des aliments microparticulaires. La fixation a lieu vers 35 jours après l’éclosion.',
    'Chez les Meiacanthus, les premières pontes peuvent demander des mois et donner de petites pontes ou des larves de mauvaise qualité.',
  ),
  'blennie-bicolore': nr(
    'Très difficile',
    'Le genre Ecsenius figure parmi les genres de blennies élevés en captivité, mais aucune méthode détaillée n’a été publiée pour cette espèce. Chez les blennies qui pondent dans une cavité (Meiacanthus, Salarias), le mâle garde les œufs ; pour Ecsenius bicolor, aucun protocole fiable n’a été retrouvé.',
  ),
  'blennie-leopard': nr(
    'Très difficile',
    'La blennie léopard (Salarias fasciatus) n’a été élevée avec succès que très récemment : en 2023, un producteur (The Biota Group) a annoncé ses premiers jeunes, alors qu’aucun jeune n’avait jamais été publié auparavant. Les blennies de ce genre pondent dans une cavité où le mâle garde les œufs, et leurs larves se posent dès le 14e jour environ, mais aucun protocole accessible à un amateur n’existe.',
  ),
  'hippocampe': r(
    'Difficile',
    'Gestation par le mâle (poche incubatrice)',
    'Chez l’hippocampe, c’est le mâle qui porte les œufs dans une poche sur le ventre et qui met bas. Les couples peuvent se reproduire en aquarium ; la difficulté, ce sont les tout premiers jours des petits, qui demandent des proies vivantes minuscules.',
    MAT_SEAHORSE,
    ETAPES_SEAHORSE,
    'Pendant les premiers jours, les petits reçoivent des copépodes et des rotifères, car l’artémia est plus difficile à digérer. À partir du 4e ou 5e jour, on donne des nauplies d’artémia enrichies en algues. Vers 2 mois, ils passent à des mysis vivantes et des cyclops, puis à des mysis congelées pour les sevrer des proies vivantes.',
    PREC_SEAHORSE,
  ),
  'hippocampe-kuda': r(
    'Difficile',
    'Gestation par le mâle (poche incubatrice)',
    'L’hippocampe kuda se reproduit en captivité : des élevages indiens obtiennent des centaines de jeunes par naissance. Comme chez tous les hippocampes, la réussite dépend des premiers jours des petits et d’une alimentation vivante adaptée.',
    MAT_SEAHORSE,
    ETAPES_SEAHORSE,
    'Dans une étude indienne, une naissance donnait en moyenne environ 262 jeunes, nourris à volonté de nauplies d’artémia ; en 30 jours, ils passaient de 7,8 mm à 31 mm. La survie par cycle d’élevage est passée de moins de 1 % à environ 65 % après amélioration des conditions d’élevage. Pour un amateur, commencez par des copépodes et des rotifères pendant les premiers jours, comme pour les autres hippocampes.',
    PREC_SEAHORSE,
  ),
  'poisson-pipe-a-bandes': r(
    'Très difficile',
    'Incubation par le mâle, petits indépendants à la naissance',
    'Le poisson-pipe à bandes a été reproduit en élevage : ses petits naissent transparents, comme de petites copies des adultes, et ils sont attirés par la lumière. Le principal danger est le système d’aspiration du bac et la nourriture des nouveau-nés.',
    [
      'Un couple de poissons-pipes dans un bac dont le trop-plein est protégé (filtre grillagé) ou un bac de mise bas',
      'Un bac d’élevage noirci, avec un seul point éclairé où les petits se rassemblent',
      'Des rotifères enrichis en acides gras, ou des copépodes',
    ],
    [
      'Installez un couple dans un bac calme. Comme chez tous les syngnathidés (hippocampes et poissons-pipes), c’est le mâle qui porte les œufs.',
      'Avant la naissance, protégez le trop-plein du bac ou déplacez le parent : les nouveau-nés pourraient être aspirés.',
      'Les petits naissent transparents et attirés par la lumière : ils se regroupent près de la surface.',
    ],
    'Comme pour les petits hippocampes pélagiques, on commence par des rotifères enrichis ou des copépodes larvaires. Un éleveur noircit le bac d’élevage et éclaire un seul point, où les petits viennent manger. La coloration de la queue apparaît vers 15 mm.',
    'La durée de gestation n’est pas précisée dans les sources consultées.',
  ),
  'requin-taupe-requin-de-recif-aquarium-geant': r(
    'Difficile',
    'Ovipare (capsules d’œufs)',
    'Le requin bambou à bandes brunes pond des œufs en capsules et peut se reproduire en captivité. La vraie contrainte est la taille : l’adulte atteint environ 1 m et la maturité n’est atteinte qu’à environ 63 cm pour la femelle et 68 à 76 cm pour le mâle, soit bien plus que ce qu’un aquarium familial peut accueillir.',
    [
      'Un très grand bac ou bassin, adapté à des animaux de 1 m',
      'Au moins un mâle et une femelle adultes',
    ],
    [
      'Gardez un mâle et une femelle matures : les femelles atteignent la maturité vers 63 cm, les mâles vers 68 à 76 cm.',
      'La femelle dépose au fond des capsules d’œufs aplaties d’environ 11 × 15 cm. Les embryons vivent entièrement sur leur vitellus.',
      'En captivité, l’éclosion peut prendre jusqu’à quatre mois.',
      'Les petits mesurent 13 à 17 cm à l’éclosion.',
    ],
    'Les jeunes sont déjà bien formés à la naissance. Prévoyez surtout de l’espace, car ils deviennent vite grands.',
    'L’espèce peut dépasser un mètre à l’âge adulte et vit environ 25 ans : elle ne convient pas à un aquarium domestique ordinaire.',
  ),
  'poisson-lion-volant': nr(
    'Très difficile',
    'Le poisson-lion volant n’a pas été reproduit en aquarium domestique. En mer, le mâle fait une parade pour attirer plusieurs femelles ; elles libèrent des milliers d’œufs collés par un mucus qui se dissout après environ 36 heures, puis les larves vivent en plancton. Aucune méthode d’élevage de ces larves n’est publiée pour un amateur.',
    'Espèce venimeuse. Introduite dans l’Atlantique occidental et le golfe du Mexique, où elle cause des dégâts écologiques : ne la relâchez jamais dans le milieu naturel.',
  ),
  'poisson-comete': nr(
    'Très difficile',
    'Le poisson-comète a été élevé par un producteur américain (Sustainable Aquatics), mais aucune méthode d’élevage détaillée n’a été publiée. Les obstacles cités sont l’obtention de pontes régulières chez les couples et l’agressivité entre jeunes ; la croissance est très lente, comparable à celle des mandarins.',
  ),
  'pseudochromis-royal': nr(
    'Très difficile',
    'Le pseudochromis royal a déjà été reproduit en captivité, mais on ne sait pas s’il est produit commercialement, et aucun protocole détaillé n’est publié. Le pseudochromis de Fridman, un proche, pond dans une cavité gardée par le mâle ; pour le pseudochromis royal lui-même, aucune méthode fiable n’a été retrouvée.',
  ),
  'assessor-bleu': nr(
    'Très difficile',
    'L’assessor bleu est aujourd’hui vendu principalement issu d’élevages professionnels, mais aucun protocole détaillé n’est publié pour cette espèce. Aucune méthode accessible à un amateur n’est documentée.',
  ),
  'chirurgien-bleu': nr('Très difficile', 'Le chirurgien bleu a été produit à l’université de Floride, mais seulement en petits lots. ' + TEXTE_CHIRURGIEN),
  'chirurgien-voile-jaune': nr('Très difficile', TEXTE_CHIRURGIEN),
  'chirurgien-pourpre': nr('Très difficile', TEXTE_CHIRURGIEN),
  'chirurgien-voile': nr('Très difficile', TEXTE_CHIRURGIEN),
  'chirurgien-kole': nr('Très difficile', TEXTE_CHIRURGIEN),
  'chirurgien-bleu-poudre': nr('Très difficile', TEXTE_CHIRURGIEN),
  'nason-a-licorne': nr('Très difficile', 'Les nasons sont des poissons de la même famille que les chirurgiens. ' + TEXTE_CHIRURGIEN),
  'demoiselle-bleue': nr('Très difficile', TEXTE_DEMOISELLE_CHRYSIPTERA),
  'demoiselle-azur': nr('Très difficile', TEXTE_DEMOISELLE_CHRYSIPTERA),
  'demoiselle-jaune-et-bleue': nr('Très difficile', TEXTE_DEMOISELLE_CHRYSIPTERA),
  'demoiselle-verte': nr(
    'Très difficile',
    'Parmi les 28 genres de demoiselles, seuls les poissons-clowns (Amphiprion et Premnas) sont élevés à l’échelle commerciale : les larves des autres demoiselles, très petites, sont difficiles à élever. Aucun protocole accessible à un amateur n’est publié pour la demoiselle verte.',
  ),
  'demoiselle-a-trois-bandes': nr('Très difficile', TEXTE_DASCYLLUS),
  'demoiselle-a-trois-points': nr('Très difficile', TEXTE_DASCYLLUS),
  'poisson-ange-nain': nr('Très difficile', TEXTE_ANGE_NAIN),
  'poisson-ange-bicolore': nr('Très difficile', TEXTE_ANGE_NAIN),
  'poisson-ange-citron': nr('Très difficile', TEXTE_ANGE_NAIN),
  'poisson-ange-cherub': nr('Très difficile', TEXTE_ANGE_NAIN),
  'poisson-ange-de-bellus': nr(
    'Très difficile',
    'Les poissons-anges (famille des Pomacanthidae) sont produits en élevage seulement en petites quantités et rarement. Aucune reproduction du poisson-ange de Bellus n’est documentée en aquarium amateur.',
  ),
  'poisson-ange-royal': nr(
    'Très difficile',
    'Les poissons-anges (famille des Pomacanthidae) sont produits en élevage seulement en petites quantités et rarement. À notre connaissance, aucune reproduction du poisson-ange royal n’est documentée en aquarium amateur ; les poissons vendus sont prélevés dans la nature.',
  ),
  'labre-nettoyeur': nr('Très difficile', TEXTE_LABRE),
  'labre-fee-de-scott': nr('Très difficile', TEXTE_LABRE),
  'labre-de-carpenter': nr('Très difficile', TEXTE_LABRE),
  'labre-a-six-lignes': nr('Très difficile', TEXTE_LABRE),
  'labre-jaune': nr('Très difficile', TEXTE_LABRE),
  'labre-leopard': nr('Très difficile', TEXTE_LABRE),
  'napoleon': nr(
    'Très difficile',
    'Le napoléon est l’un des plus grands poissons de récif (jusqu’à 2,3 m) et un hermaphrodite protogyne : en mer, les adultes se rassemblent pour pondre en pleine eau. Aucune reproduction n’est documentée en aquarium amateur.',
    'Espèce inscrite à l’annexe II de la CITES et classée « en danger » par l’UICN.',
  ),
  'anthias-a-ecailles-carrees': nr('Très difficile', TEXTE_NON_DOCUMENTE),
  'poisson-perroquet': nr('Très difficile', TEXTE_NON_DOCUMENTE),
  'poisson-papillon': nr('Très difficile', TEXTE_NON_DOCUMENTE),
  'poisson-cocher': nr('Très difficile', TEXTE_NON_DOCUMENTE),
  'baliste-picasso': nr('Très difficile', TEXTE_NON_DOCUMENTE),
  'baliste-clown': nr('Très difficile', TEXTE_NON_DOCUMENTE),
  'baliste-noir-a-dents-rouges': nr('Très difficile', TEXTE_NON_DOCUMENTE),
  'poisson-coffre-jaune': nr('Très difficile', TEXTE_NON_DOCUMENTE),
  'canthigaster-de-valentin': nr('Très difficile', TEXTE_NON_DOCUMENTE),
  'poisson-rasoir': nr('Très difficile', TEXTE_NON_DOCUMENTE),
  'idole-des-maures': nr('Très difficile', TEXTE_NON_DOCUMENTE),
  'anguille-ruban': nr('Très difficile', TEXTE_NON_DOCUMENTE),
  'poisson-lapin-renard': nr(
    'Très difficile',
    'Un brevet chinois décrit l’élevage artificiel d’alevins de Siganus vulpinus en intérieur, ce qui relève d’un élevage professionnel. Aucune méthode accessible à un amateur n’est publiée pour cette espèce.',
  ),
  // @@FIN@@
};

export function reproductionEspece(slug: string): ReproductionEspece | undefined {
  return REPRODUCTIONS[slug];
}

const phraseRepro = (t: string) => (/[.!?…]$/.test(t.trim()) ? t.trim() : `${t.trim()}.`);

/** Questions/réponses de la FAQ (JSON-LD) : mêmes textes que la section affichée. */
export function faqReproduction(slug: string, nom: string): { question: string; reponse: string }[] {
  const g = REPRODUCTIONS[slug];
  if (!g) return [];
  if (!g.faisable) {
    return [
      {
        question: `La reproduction de ${nom} est-elle possible en aquarium ?`,
        reponse: `Reproduction ${g.niveau.toLowerCase()}. ${phraseRepro(g.resume)}${g.precaution ? ` ${phraseRepro(g.precaution)}` : ''}`,
      },
    ];
  }
  const faq = [
    {
      question: `La reproduction de ${nom} est-elle facile ?`,
      reponse: `Reproduction ${g.niveau.toLowerCase()}. ${phraseRepro(g.resume)}`,
    },
    {
      question: `Comment faire se reproduire ${nom} ?`,
      reponse: `${(g.etapes ?? []).map((e, i) => `${i + 1}. ${phraseRepro(e)}`).join(' ')}${g.precaution ? ` ${phraseRepro(g.precaution)}` : ''}`,
    },
  ];
  if (g.materiel?.length) {
    faq.push({
      question: `Quel matériel pour faire se reproduire ${nom} ?`,
      reponse: `${g.materiel.join(' ; ')}.`,
    });
  }
  if (g.alevins) {
    faq.push({
      question: `Comment élever les jeunes de ${nom} ?`,
      reponse: phraseRepro(g.alevins),
    });
  }
  return faq;
}
