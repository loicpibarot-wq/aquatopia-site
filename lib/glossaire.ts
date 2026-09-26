// Glossaire aquariophile — un terme par page pour capter les recherches du
// type "c'est quoi le KH" ou "définition écumeur", en plus de l'index qui
// liste tout. Le contenu recoupe volontairement celui des guides (lib/guides.ts)
// mais reste condensé : le glossaire répond vite, le guide développe.
export type TermeGlossaire = {
  slug: string;
  terme: string;
  categorie: string;
  definition: string;
  guideLie?: { href: string; label: string };
};

export const GLOSSAIRE: TermeGlossaire[] = [
  {
    slug: 'cyclage',
    terme: 'Cyclage (cycle de l’azote)',
    categorie: 'Eau douce',
    definition:
      "Période initiale (généralement 4 à 6 semaines) pendant laquelle une population de bactéries bénéfiques s'installe dans le filtre et le substrat pour transformer l'ammoniac toxique en nitrites puis en nitrates, moins nocifs. Indispensable avant d'introduire le moindre poisson.",
    guideLie: { href: '/guides/cycle-de-lazote-aquarium', label: "Le cycle de l'azote en détail" },
  },
  {
    slug: 'ammoniac',
    terme: 'Ammoniac (NH3/NH4)',
    categorie: 'Eau douce',
    definition:
      "Substance toxique produite par la décomposition des déjections et des restes de nourriture. Un aquarium correctement cyclé maintient l'ammoniac à zéro grâce aux bactéries nitrifiantes.",
    guideLie: { href: '/guides/cycle-de-lazote-aquarium', label: "Le cycle de l'azote en détail" },
  },
  {
    slug: 'nitrites',
    terme: 'Nitrites (NO2)',
    categorie: 'Eau douce',
    definition:
      "Produit intermédiaire du cycle de l'azote, issu de la transformation de l'ammoniac. Toxiques pour les poissons, ils doivent redescendre à zéro avant l'introduction d'animaux.",
    guideLie: { href: '/guides/cycle-de-lazote-aquarium', label: "Le cycle de l'azote en détail" },
  },
  {
    slug: 'nitrates',
    terme: 'Nitrates (NO3)',
    categorie: 'Eau douce',
    definition:
      "Dernier maillon du cycle de l'azote, beaucoup moins toxique que l'ammoniac ou les nitrites. Ils s'accumulent progressivement et sont éliminés par les changements d'eau réguliers.",
    guideLie: { href: '/guides/cycle-de-lazote-aquarium', label: "Le cycle de l'azote en détail" },
  },
  {
    slug: 'ph',
    terme: 'pH',
    categorie: 'Eau douce',
    definition:
      "Mesure de l'acidité ou de la basicité de l'eau, sur une échelle de 0 à 14 (7 étant neutre). Chaque espèce tolère une fourchette de pH, mais la stabilité compte souvent plus que la valeur exacte.",
    guideLie: { href: '/guides/parametres-eau-ph-gh-kh', label: 'pH, GH, KH expliqués' },
  },
  {
    slug: 'gh',
    terme: 'GH (dureté générale)',
    categorie: 'Eau douce',
    definition:
      "Mesure la concentration en calcium et magnésium dissous dans l'eau — on parle d'eau douce (GH bas) ou dure (GH élevé). Un paramètre important pour la reproduction et la croissance des plantes.",
    guideLie: { href: '/guides/parametres-eau-ph-gh-kh', label: 'pH, GH, KH expliqués' },
  },
  {
    slug: 'kh',
    terme: 'KH (dureté carbonatée)',
    categorie: 'Eau douce',
    definition:
      "Mesure le pouvoir tampon de l'eau, c'est-à-dire sa capacité à résister aux variations de pH. Un KH trop bas expose à des chutes brutales de pH, dangereuses pour les poissons.",
    guideLie: { href: '/guides/parametres-eau-ph-gh-kh', label: 'pH, GH, KH expliqués' },
  },
  {
    slug: 'osmolateur',
    terme: 'Osmolateur (ATO)',
    categorie: 'Récifal',
    definition:
      "Appareil qui compense automatiquement l'évaporation d'un aquarium en ajoutant de l'eau osmosée pure, pour maintenir un niveau et une salinité stables sans intervention manuelle.",
    guideLie: { href: '/guides/materiel-recifal-ecumeur-osmolateur-brassage', label: 'Le matériel récifal expliqué' },
  },
  {
    slug: 'ecumeur',
    terme: 'Écumeur (protein skimmer)',
    categorie: 'Récifal',
    definition:
      "Équipement qui extrait les déchets organiques dissous de l'eau de mer en les capturant sous forme d'écume, avant qu'ils ne se décomposent en polluants. L'un des équipements les plus déterminants en récifal.",
    guideLie: { href: '/guides/materiel-recifal-ecumeur-osmolateur-brassage', label: 'Le matériel récifal expliqué' },
  },
  {
    slug: 'brassage',
    terme: 'Brassage',
    categorie: 'Récifal',
    definition:
      "Mouvement de l'eau généré par des pompes dédiées, qui reproduit les courants marins naturels. Essentiel à la santé et à la coloration des coraux, et à la lutte contre l'accumulation de déchets.",
    guideLie: { href: '/guides/materiel-recifal-ecumeur-osmolateur-brassage', label: 'Le matériel récifal expliqué' },
  },
  {
    slug: 'lps',
    terme: 'LPS (coraux durs à gros polypes)',
    categorie: 'Récifal',
    definition:
      "Famille de coraux durs (« Large Polyp Stony ») aux polypes charnus, comme les Euphyllia ou Trachyphyllia. Plus exigeants que les coraux mous, mais plus indulgents que les SPS.",
    guideLie: { href: '/guides/coraux-mous-lps-sps-differences', label: 'Coraux mous, LPS, SPS : les différences' },
  },
  {
    slug: 'sps',
    terme: 'SPS (coraux durs à petits polypes)',
    categorie: 'Récifal',
    definition:
      "Famille de coraux durs (« Small Polyp Stony », comme les Acropora) réputée la plus exigeante : éclairage puissant, brassage important et paramètres d'eau très stables sont indispensables.",
    guideLie: { href: '/guides/coraux-mous-lps-sps-differences', label: 'Coraux mous, LPS, SPS : les différences' },
  },
  {
    slug: 'coraux-mous',
    terme: 'Coraux mous',
    categorie: 'Récifal',
    definition:
      "Coraux sans squelette calcaire rigide (Zoanthus, Discosoma, Sarcophyton), plus tolérants aux variations de paramètres et d'éclairage. Recommandés pour démarrer un bac récifal.",
    guideLie: { href: '/guides/coraux-mous-lps-sps-differences', label: 'Coraux mous, LPS, SPS : les différences' },
  },
  {
    slug: 'salinite',
    terme: 'Salinité (densité)',
    categorie: 'Récifal',
    definition:
      "Concentration en sel de l'eau de mer, généralement mesurée en densité (autour de 1,025) plutôt qu'en grammes par litre. Un paramètre à maintenir stable pour éviter tout choc osmotique.",
  },
  {
    slug: 'calcium',
    terme: 'Calcium (Ca)',
    categorie: 'Récifal',
    definition:
      "Élément que les coraux durs puisent dans l'eau pour construire leur squelette, généralement maintenu entre 400 et 450 ppm en récifal, aux côtés du KH et du magnésium.",
    guideLie: { href: '/guides/calcium-kh-magnesium-recifal', label: 'Calcium, KH, magnésium : bien doser' },
  },
  {
    slug: 'magnesium',
    terme: 'Magnésium (Mg)',
    categorie: 'Récifal',
    definition:
      "Élément qui empêche le calcium et les carbonates (KH) de précipiter ensemble. Un magnésium trop bas rend ces deux paramètres très instables, quel que soit le dosage effectué.",
    guideLie: { href: '/guides/calcium-kh-magnesium-recifal', label: 'Calcium, KH, magnésium : bien doser' },
  },
  {
    slug: 'phosphates',
    terme: 'Phosphates (PO4)',
    categorie: 'Récifal',
    definition:
      "Nutriments issus notamment des restes de nourriture, dont l'excès favorise la prolifération d'algues et de cyanobactéries. Ils se contrôlent par l'écumage, des masses filtrantes dédiées ou une alimentation plus mesurée.",
    guideLie: { href: '/guides/coraux-mous-lps-sps-differences', label: 'Récifal : les bases' },
  },
  {
    slug: 'cyanobacteries',
    terme: 'Cyanobactéries',
    categorie: 'Entretien',
    definition:
      "Organismes formant un voile coloré (souvent rougeâtre ou verdâtre) sur le décor et le substrat, favorisés par un excès de nutriments et un brassage insuffisant. À ne pas confondre avec de véritables algues.",
  },
  {
    slug: 'aquascaping',
    terme: 'Aquascaping',
    categorie: 'Décoration',
    definition:
      "Art de composer le décor d'un aquarium en s'inspirant de paysages naturels, avec des styles reconnus comme le style hollandais (bac planté dense) ou l'Iwagumi japonais (roches et sobriété).",
    guideLie: { href: '/guides/aquascaping-decor-naturel', label: 'Composer un décor naturel' },
  },
  {
    slug: 'substrat-nutritif',
    terme: 'Substrat nutritif',
    categorie: 'Décoration',
    definition:
      "Substrat enrichi conçu pour nourrir les racines des plantes aquatiques, à distinguer d'un substrat neutre (sable, gravier) purement décoratif.",
    guideLie: { href: '/guides/aquascaping-decor-naturel', label: 'Composer un décor naturel' },
  },
  {
    slug: 'bacteries-nitrifiantes',
    terme: 'Bactéries nitrifiantes',
    categorie: 'Eau douce',
    definition:
      "Micro-organismes qui s'installent dans le filtre et le substrat pendant le cyclage, responsables de la transformation de l'ammoniac en nitrites puis en nitrates.",
    guideLie: { href: '/guides/cycle-de-lazote-aquarium', label: "Le cycle de l'azote en détail" },
  },
  {
    slug: 'filtre-sur-verre',
    terme: 'Filtre sur-verre (sump)',
    categorie: 'Matériel',
    definition:
      "Système de filtration déportée dans un bac séparé sous le meuble, relié à l'aquarium par une gorge en verre. Offre le plus grand volume de filtration, utilisé notamment en récifal.",
    guideLie: { href: '/guides/choisir-filtration-aquarium', label: 'Quel filtre choisir' },
  },
  {
    slug: 'acclimatation-goutte-a-goutte',
    terme: 'Acclimatation goutte-à-goutte',
    categorie: 'Récifal',
    definition:
      "Méthode consistant à ajouter très progressivement de l'eau de l'aquarium de destination à celle de transport, pour habituer un poisson ou un corail marin en douceur aux nouveaux paramètres.",
    guideLie: { href: '/guides/acclimatation-goutte-a-goutte-poissons-coraux', label: "L'acclimatation en détail" },
  },
  {
    slug: 'quarantaine',
    terme: 'Quarantaine',
    categorie: 'Entretien',
    definition:
      "Période d'isolement d'un nouveau poisson dans un bac séparé, destinée à observer son état de santé et éviter d'introduire une maladie ou un parasite dans l'aquarium principal.",
  },
  {
    slug: 'photoperiode',
    terme: 'Photopériode',
    categorie: 'Entretien',
    definition:
      "Durée quotidienne d'éclairage de l'aquarium, généralement 8 à 10 heures pour un bac planté classique. Réduire la photopériode est souvent la première solution en cas d'invasion d'algues.",
  },
  {
    slug: 'osmose-inverse',
    terme: 'Eau osmosée (RO/DI)',
    categorie: 'Matériel',
    definition:
      "Eau purifiée par un système d'osmose inverse (et parfois de déionisation), débarrassée de la plupart des minéraux et polluants. Utilisée en récifal et pour certaines espèces d'eau douce exigeantes.",
  },
];

export function fetchTermeParSlug(slug: string): TermeGlossaire | null {
  return GLOSSAIRE.find((t) => t.slug === slug) ?? null;
}
