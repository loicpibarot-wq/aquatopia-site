// lib/configurateur.ts
// Logique du configurateur « clé en main » – pure TypeScript, zéro dépendance externe.

export type Niveau      = 'Debutant' | 'Intermediaire' | 'Expert';
export type TypeBac     = 'douce-plante' | 'douce-biotope' | 'marin' | 'bassin';
export type VolumeBac   = 'nano' | 'moyen' | 'grand' | 'tres-grand';
export type NiveauDiff  = 'Débutant' | 'Intermédiaire' | 'Expert';
export type CatEspece   = string;

export interface EspeceLight {
  slug:             string;
  nomCommun:        string;
  nomScientifique:  string;
  categorie:        CatEspece;
  difficulte:       NiveauDiff;
  volumeMin:        number | null;
  tailleAdulte:     string;
  statutLegal:      string;
  co2?:             'Inutile' | 'Recommandé' | 'Indispensable';
  placementPlante?: string;
  corailType?:      string;
  reefSafe?:        string;
}

export interface LigneSetup {
  emoji:     string;
  categorie: string;
  item:      string;
  detail:    string;
}

export interface SetupComplet {
  titre:      string;
  lignes:     LigneSetup[];
  budgetMin:  number;
  budgetMax:  number;
  conseils:   string[];
}

export interface ResultatRecommandation {
  especes: EspeceLight[];
  setup:   SetupComplet;
}

// ─── Métadonnées wizard ────────────────────────────────────────────────────────

export const NIVEAUX: { id: Niveau; label: string; desc: string; emoji: string }[] = [
  { id: 'Debutant',      label: 'Débutant',      emoji: '🌱',
    desc: "Premier aquarium ou moins de 2 ans d'expérience. Je préfère la simplicité." },
  { id: 'Intermediaire', label: 'Intermédiaire', emoji: '🐠',
    desc: "Quelques années de pratique, à l'aise avec le cycle de l'azote et les paramètres d'eau." },
  { id: 'Expert',        label: 'Expert',        emoji: '🪸',
    desc: 'Éleveur expérimenté, je veux des espèces exigeantes et des setups techniques.' },
];

export const TYPES_BAC: { id: TypeBac; label: string; desc: string; emoji: string }[] = [
  { id: 'douce-plante',  label: 'Eau douce planté',   emoji: '🌿',
    desc: 'Aquarium tropical densément végétalisé avec poissons et plantes aquatiques.' },
  { id: 'douce-biotope', label: 'Eau douce biotope',  emoji: '🪨',
    desc: "Décor naturel (Amazonie, Rift africain…) centré sur les poissons, peu ou pas de plantes." },
  { id: 'marin',         label: 'Eau de mer récifal', emoji: '🐡',
    desc: 'Aquarium marin avec poissons, coraux et invertébrés. Plus technique mais spectaculaire.' },
  { id: 'bassin',        label: 'Bassin de jardin',   emoji: '🏞️',
    desc: 'Bassin extérieur avec koïs, poissons rouges ou plantes de bassin.' },
];

export const VOLUMES_BAC: Record<TypeBac, { id: VolumeBac; label: string; detail: string }[]> = {
  'douce-plante': [
    { id: 'nano',       label: 'Nano  (< 60 L)',       detail: 'Idéal sur un bureau ou une étagère' },
    { id: 'moyen',      label: 'Moyen  (60 – 200 L)',  detail: 'Format salon classique' },
    { id: 'grand',      label: 'Grand  (200 – 500 L)', detail: 'Bac mur ou meuble TV' },
    { id: 'tres-grand', label: 'XL  (> 500 L)',        detail: 'Projet passionné, budget conséquent' },
  ],
  'douce-biotope': [
    { id: 'nano',       label: 'Nano  (< 60 L)',       detail: 'Idéal pour crevettes ou petits cichlidés' },
    { id: 'moyen',      label: 'Moyen  (60 – 200 L)',  detail: 'Format salon classique' },
    { id: 'grand',      label: 'Grand  (200 – 500 L)', detail: 'Cichlidés africains ou discus' },
    { id: 'tres-grand', label: 'XL  (> 500 L)',        detail: 'Grands cichlidés ou arowana' },
  ],
  'marin': [
    { id: 'nano',       label: 'Nano  (< 80 L)',       detail: "Défi technique, peu d'espèces" },
    { id: 'moyen',      label: 'Moyen  (80 – 300 L)',  detail: 'Format récifal optimal' },
    { id: 'grand',      label: 'Grand  (300 – 600 L)', detail: 'Récif SPS ou FOWLR avancé' },
    { id: 'tres-grand', label: 'XL  (> 600 L)',        detail: 'Projet récifal de prestige' },
  ],
  'bassin': [
    { id: 'nano',       label: 'Petit  (< 1 000 L)',        detail: 'Bassin de terrasse ou balcon' },
    { id: 'moyen',      label: 'Moyen  (1 000 – 5 000 L)',  detail: 'Bassin de jardin classique' },
    { id: 'grand',      label: 'Grand  (5 000 – 20 000 L)', detail: 'Grand bassin koï' },
    { id: 'tres-grand', label: 'XL  (> 20 000 L)',          detail: 'Bassin de compétition ou élevage' },
  ],
};

export const PREFERENCES: Record<TypeBac, { id: string; label: string }[]> = {
  'douce-plante': [
    { id: 'plantes-dense', label: 'Jungle aquatique dense' },
    { id: 'sans-co2',      label: 'Sans injection de CO₂' },
    { id: 'crevettes',     label: 'Crevettes ornementales' },
    { id: 'colorés',       label: 'Poissons très colorés' },
    { id: 'fond',          label: 'Poissons de fond (corydoras, loches)' },
    { id: 'facile',        label: 'Entretien minimal' },
  ],
  'douce-biotope': [
    { id: 'colorés',   label: 'Poissons très colorés' },
    { id: 'fond',      label: 'Poissons de fond (corydoras, loches)' },
    { id: 'cichlides', label: 'Cichlidés africains' },
    { id: 'amazonie',  label: 'Biotope Amazonie' },
    { id: 'crevettes', label: 'Crevettes et invertébrés' },
    { id: 'facile',    label: 'Entretien minimal' },
  ],
  'marin': [
    { id: 'reef-poissons',      label: 'Principalement des poissons' },
    { id: 'reef-coraux-mous',   label: 'Coraux mous et anémones' },
    { id: 'reef-coraux-durs',   label: 'Coraux durs (LPS / SPS)' },
    { id: 'reef-invertebres',   label: 'Crevettes et invertébrés marins' },
    { id: 'reef-algues',        label: 'Macroalgues (refugium)' },
    { id: 'reef-peu-entretien', label: 'Entretien simplifié' },
  ],
  'bassin': [
    { id: 'koi',           label: 'Carpes Koï' },
    { id: 'poissons-rouge', label: 'Poissons rouges / Comètes' },
    { id: 'plantes-bassin', label: 'Plantes aquatiques' },
    { id: 'faune-locale',   label: 'Faune locale et naturel' },
    { id: 'facile',         label: 'Entretien minimal' },
  ],
};

// ─── Catégories filtrées par type de bac ──────────────────────────────────────

const CATS_BAC: Record<TypeBac, string[]> = {
  'douce-plante':  ['Eau Douce', 'Plantes', 'Crustacés / Invertébrés eau douce', 'Mollusques eau douce'],
  'douce-biotope': ['Eau Douce', 'Crustacés / Invertébrés eau douce', 'Mollusques eau douce'],
  'marin':         ['Poissons marins', 'Coraux et anémones', 'Invertébrés marins', 'Macroalgues marines'],
  'bassin':        ['Bassin', 'Plantes'],
};

const VOL_MAX: Record<TypeBac, Record<VolumeBac, number>> = {
  'douce-plante':  { nano: 60,   moyen: 200,  grand: 500,   'tres-grand': 999999 },
  'douce-biotope': { nano: 60,   moyen: 200,  grand: 500,   'tres-grand': 999999 },
  'marin':         { nano: 80,   moyen: 300,  grand: 600,   'tres-grand': 999999 },
  'bassin':        { nano: 1000, moyen: 5000, grand: 20000, 'tres-grand': 999999 },
};

const DIFF_OK: Record<Niveau, NiveauDiff[]> = {
  Debutant:      ['Débutant'],
  Intermediaire: ['Débutant', 'Intermédiaire'],
  Expert:        ['Débutant', 'Intermédiaire', 'Expert'],
};

// ─── Recommandation ────────────────────────────────────────────────────────────

export function recommander(
  pool:        EspeceLight[],
  niveau:      Niveau,
  typeBac:     TypeBac,
  volume:      VolumeBac,
  preferences: string[],
): ResultatRecommandation {
  const cats   = CATS_BAC[typeBac];
  const diffs  = DIFF_OK[niveau];
  const volMax = VOL_MAX[typeBac][volume];
  const has    = (id: string) => preferences.includes(id);

  const filtered = pool.filter((e) => {
    if (!cats.includes(e.categorie)) return false;
    if (e.statutLegal === 'interdite' || e.statutLegal === 'autorisation_requise') return false;
    if (!diffs.includes(e.difficulte)) return false;
    if ((e.volumeMin ?? 0) > volMax) return false;
    if (e.placementPlante === 'Plante de bassin' && typeBac !== 'bassin') return false;
    if (e.placementPlante === 'Plante de berge'  && typeBac !== 'bassin') return false;
    return true;
  });

  function pick(cat: string, n: number, predicate?: (e: EspeceLight) => boolean): EspeceLight[] {
    if (n <= 0) return [];
    let src = filtered.filter((e) => e.categorie === cat);
    if (predicate) {
      const narrow = src.filter(predicate);
      if (narrow.length >= Math.min(n, 2)) src = narrow;
    }
    const ord = ['Débutant', 'Intermédiaire', 'Expert'];
    src.sort((a, b) => {
      const d = ord.indexOf(a.difficulte) - ord.indexOf(b.difficulte);
      return d !== 0 ? d : a.nomCommun.localeCompare(b.nomCommun, 'fr');
    });
    return src.slice(0, n);
  }

  let especes: EspeceLight[] = [];

  if (typeBac === 'douce-plante') {
    const co2Pred = has('sans-co2')
      ? (e: EspeceLight) => e.co2 === 'Inutile' || e.co2 === 'Recommandé'
      : undefined;
    especes = [
      ...pick('Eau Douce', 3),
      ...pick('Plantes', has('plantes-dense') ? 4 : 2, co2Pred),
      ...pick('Crustacés / Invertébrés eau douce', has('crevettes') ? 2 : 1),
      ...pick('Mollusques eau douce', 1),
    ];
  } else if (typeBac === 'douce-biotope') {
    especes = [
      ...pick('Eau Douce', 5),
      ...pick('Crustacés / Invertébrés eau douce', has('crevettes') ? 2 : 1),
    ];
  } else if (typeBac === 'marin') {
    const corailPred = has('reef-coraux-durs')
      ? (e: EspeceLight) => e.corailType === 'LPS' || e.corailType === 'SPS'
      : has('reef-coraux-mous')
        ? (e: EspeceLight) => ['Corail mou', 'Anémone', 'Zoanthaire', 'Corallimorphe'].includes(e.corailType ?? '')
        : undefined;
    especes = [
      ...pick('Poissons marins', 3),
      ...pick('Coraux et anémones', (has('reef-coraux-mous') || has('reef-coraux-durs')) ? 3 : 1, corailPred),
      ...pick('Invertébrés marins', has('reef-invertebres') ? 3 : 2),
      ...pick('Macroalgues marines', has('reef-algues') ? 2 : 1),
    ];
  } else {
    especes = [
      ...pick('Bassin', has('plantes-bassin') ? 3 : 5),
      ...pick('Plantes', has('plantes-bassin') ? 3 : 0,
        (e) => e.placementPlante === 'Plante de bassin' || e.placementPlante === 'Plante de berge'),
    ];
  }

  const seen = new Set<string>();
  especes = especes.filter((e) => {
    if (seen.has(e.slug)) return false;
    seen.add(e.slug);
    return true;
  }).slice(0, 8);

  return { especes, setup: genererSetup(niveau, typeBac, volume) };
}

// ─── Génération du setup équipement ───────────────────────────────────────────

export function genererSetup(niveau: Niveau, typeBac: TypeBac, volume: VolumeBac): SetupComplet {
  const isNano  = volume === 'nano';
  const isMoyen = volume === 'moyen';
  const isGrand = volume === 'grand';
  const isDeb   = niveau === 'Debutant';

  if (typeBac === 'douce-plante') {
    const lignes: LigneSetup[] = [
      { emoji: '🫧', categorie: 'Filtration',
        item: isNano
          ? 'Filtre interne (Fluval U2 / Eheim Aquaball)'
          : isMoyen ? 'Filtre externe 600-900 L/h (Eheim Classic 350 / JBL CristalProfi e702)'
          : 'Double filtre externe 1 200-2 400 L/h + pompe de brassage',
        detail: isNano ? 'Débit ~300 L/h' : isMoyen ? 'Débit 4-5× le volume du bac' : 'Débit 6-8× le volume' },
      { emoji: '💡', categorie: 'Éclairage',
        item: isNano
          ? (isDeb ? 'Rampe LED 6 500 K 20 W (Aquael Leddy / Chihiros A-201)'
                   : 'Rampe LED fine spectrale (Chihiros WRGB II 30 / Twinstar 300E)')
          : isMoyen
            ? (isDeb ? 'Rampe LED horticole (Fluval Plant 3.0 60 cm)'
                     : 'Rampe LED haut de gamme (Twinstar 900E / Chihiros WRGB II 60)')
            : 'Série de 2-3 rampes LED haut de gamme (Twinstar 1200S / ATI SolarNode)',
        detail: 'Photopériode 8-10 h/j — timer recommandé' },
      { emoji: '🌡️', categorie: 'Chauffage',
        item: isNano ? 'Thermostat 50 W (Aquael Ultra / Eheim Jäger)'
            : isMoyen ? 'Thermostat 100-150 W (Eheim Jäger / Fluval M)'
            : 'Thermostat 200-300 W (ou 2 × 150 W)',
        detail: '24-26 °C selon les espèces' },
      { emoji: '🪨', categorie: 'Substrat',
        item: isDeb
          ? 'Sol nutritif débutant (Dennerle Power Soil / JBL Manado Dark) 3-5 cm'
          : 'Sol nutritif professionnel (ADA Amazonia / Tropica Aquarium Soil) 5-7 cm',
        detail: 'Optionnel : 2 cm de sable fin décoratif par-dessus' },
      { emoji: '💨', categorie: 'CO₂',
        item: (isDeb || isNano)
          ? 'Système CO₂ liquide (Dennerle S35 95 g + diffuseur)'
          : isMoyen
            ? 'Bouteille CO₂ rechargeable 500 g + réducteur double jauge + diffuseur verre atomiseur'
            : 'Bouteille CO₂ 2 kg + réducteur électronique + diffuseur en ligne',
        detail: '20-30 ppm en photopériode — arrêt automatique la nuit' },
      { emoji: '💧', categorie: 'Entretien eau',
        item: 'Conditionneur (Seachem Prime) + engrais liquide macro/micro (Tropica / Seachem Flourish)',
        detail: 'Changement 20-30 % hebdomadaire — test GH/KH/nitrates mensuel' },
    ];
    if (!isNano && !isDeb) {
      lignes.push({ emoji: '🔬', categorie: 'Osmose',
        item: 'Osmoseur 100-200 GPD + reminéralisation (Salty Shrimp GH+)',
        detail: 'Recommandé si eau du robinet > 15° GH' });
    }
    const b = isNano ? (isDeb ? [120,250] : [200,400]) : isMoyen ? (isDeb ? [350,600] : [600,1100]) : isGrand ? [900,1900] : [2000,5000];
    return {
      titre: `Aquarium ${isNano?'nano':isMoyen?'moyen':isGrand?'grand':'XL'} eau douce planté`,
      lignes, budgetMin: b[0], budgetMax: b[1],
      conseils: [
        "Lancez le cycle de l'azote (fishless cycling) 3-4 semaines avant d'introduire les premiers poissons.",
        "Plantez dense dès le départ pour limiter les algues — les plantes consomment les nitrates.",
        isDeb
          ? "Commencez par des plantes robustes : Vallisneria, Cryptocoryne, Anubias, Java fern."
          : "Équilibrez le ratio lumière / CO₂ / engrais pour éviter les algues indésirables.",
        "Changement d'eau hebdomadaire de 20-30 % : premier facteur de succès.",
      ],
    };
  }

  if (typeBac === 'douce-biotope') {
    const lignes: LigneSetup[] = [
      { emoji: '🫧', categorie: 'Filtration',
        item: isNano ? 'Filtre interne (Eheim Aquaball / Fluval U2)'
            : isMoyen ? 'Filtre externe (Eheim Classic 350 / JBL CristalProfi e702)'
            : 'Filtre externe puissant 1 200-2 000 L/h (Eheim Pro 4 / Fluval FX4)',
        detail: "Privilégier un débit doux pour les espèces d'eaux calmes" },
      { emoji: '💡', categorie: 'Éclairage',
        item: isNano ? 'Rampe LED 6 500 K 15-25 W (Aquael Leddy / Fluval Plant nano)'
            : isMoyen ? 'Rampe LED 40-60 W (Aquael Leddy XXL / Beamwork DA FSPEC)'
            : 'Rampe LED 80-120 W ou 2 × 50 W',
        detail: "Photopériode 8-10 h/j — limiter pour biotopes ombragés (Amazonie)" },
      { emoji: '🌡️', categorie: 'Chauffage',
        item: isNano ? 'Thermostat 50 W' : isMoyen ? 'Thermostat 100-150 W' : 'Thermostat 200-300 W',
        detail: '24-28 °C — les cichlidés du Rift préfèrent 25-27 °C' },
      { emoji: '🪨', categorie: 'Substrat & décor',
        item: 'Sable fin 0,2-1 mm (JBL Sansibar) + décor biotope adapté',
        detail: 'Racines + feuilles mortes (Amazonie) | Roches calcaires (Rift africain)' },
      { emoji: '💧', categorie: 'Paramètres',
        item: 'Conditionneur (Seachem Prime) + test pH/GH/KH hebdomadaire',
        detail: 'Eau noire (Amazonie) : tourbe ou feuilles de catappa, pH 6-7, GH < 8' },
    ];
    const b = isNano ? [100,220] : isMoyen ? [300,550] : isGrand ? [700,1500] : [1500,4000];
    return {
      titre: `Aquarium ${isNano?'nano':isMoyen?'moyen':isGrand?'grand':'XL'} eau douce biotope`,
      lignes, budgetMin: b[0], budgetMax: b[1],
      conseils: [
        "Cycle de l'azote obligatoire avant l'introduction de poissons (3-4 semaines).",
        "Rift africain : eau dure, pH 7.8-8.5, pierres calcaires, lumière vive.",
        "Amazonie : eau douce acide (pH 6-7), sable fin, racines, feuilles mortes.",
        "Variez les niveaux de nage (surface, milieu, fond) pour un aquarium harmonieux.",
      ],
    };
  }

  if (typeBac === 'marin') {
    const lignes: LigneSetup[] = [
      { emoji: '🫧', categorie: 'Filtration / Sump',
        item: isNano
          ? 'Bac tout-en-un (Red Sea Max Nano / Fluval Evo) ou décanteur externe'
          : isMoyen ? 'Sump 50-80 L + décanteur en verre (Deltec / Bubble Magus)'
          : 'Sump 100-150 L + décanteur haut de gamme (Bubble King / Royal Exclusiv)',
        detail: 'Le sump augmente le volume total — facteur clé de stabilité' },
      { emoji: '⚡', categorie: 'Écumeur (skimmer)',
        item: isNano ? 'Mini-skimmer (Tunze 9001 / Reef Octopus Nano)'
            : isMoyen ? 'Skimmer externe (Bubble Magus Curve A5 / Deltec SC 1455)'
            : 'Skimmer haut de gamme (Bubble King / Royal Exclusiv)',
        detail: 'Élimine la matière organique avant décomposition — indispensable' },
      { emoji: '💡', categorie: 'Éclairage',
        item: isNano
          ? (isDeb ? 'LED marin (Kessil A80 / AI Prime HD)' : 'LED performante (Radion XR15 / Kessil A160WE)')
          : isMoyen
            ? 'LED suspendue × 1-2 (Radion XR15 / AI Hydra 32 / Kessil A360X)'
            : 'LED haut de gamme × 2-3 (Radion XR30 / ATI SolarNode)',
        detail: 'Spectre 14 000-20 000 K + UV/violet — progression sur 2-4 semaines' },
      { emoji: '🌊', categorie: 'Brassage',
        item: isNano ? 'Pompe de brassage 1 000-2 000 L/h (Jebao SLW-10 / Tunze 6015)'
            : isMoyen ? '2 × pompes de brassage (Jebao RW-8 / Tunze 6055)'
            : 'Gyre (Maxspect / Panta Rei) ou 2-3 × Tunze 6105',
        detail: 'Viser 15-25× le volume du bac en brassage total' },
      { emoji: '🌡️', categorie: 'Chauffage',
        item: isNano ? '2 × thermostat 100 W (redondance de sécurité)'
            : isMoyen ? '2 × thermostat 150-200 W'
            : '2 × thermostat 300 W ou refroidisseur/chauffe-eau (Teco TC15)',
        detail: '25-26 °C — TOUJOURS deux thermostats indépendants' },
      { emoji: '🧪', categorie: "Chimie de l'eau",
        item: (isNano || isDeb)
          ? 'Sel de qualité (Red Sea Coral Pro / Tropic Marin) + osmoseur 75 GPD + réfractomètre'
          : isMoyen
            ? 'Sel + osmoseur 100 GPD + tests KH/Ca/Mg + dosage Manuel (Balling ou NaHCO3/CaCl2)'
            : 'Sel + osmoseur 200 GPD + doseur automatique (GHL Doser) + contrôleur (GHL ProfiLux)',
        detail: 'Salinité 1.023-1.025 — 100 % eau osmosée RODI < 5 ppm TDS' },
    ];
    if (!isDeb || !isNano) {
      lignes.push({ emoji: '☀️', categorie: 'UV stérilisateur',
        item: isNano ? 'UV 9 W en ligne' : 'UV 18-36 W (TMC Vecton / Aqua Ultraviolet)',
        detail: 'Réduit les agents pathogènes — optionnel mais recommandé' });
    }
    const b = isNano ? (isDeb ? [600,1100] : [900,1800]) : isMoyen ? (isDeb ? [1500,3000] : [2500,5000]) : isGrand ? [4000,9000] : [8000,20000];
    return {
      titre: `Aquarium ${isNano?'nano':isMoyen?'moyen':isGrand?'grand':'XL'} eau de mer récifal`,
      lignes, budgetMin: b[0], budgetMax: b[1],
      conseils: [
        "Patience obligatoire : maturation biologique 6-8 semaines minimum avant tout animal.",
        "Investir dans du bon matériel dès le départ — les économies coûtent cher en marin.",
        isDeb
          ? "Commencez par des poissons robustes (Amphiprion) et des coraux mous avant les LPS/SPS."
          : "La stabilité des paramètres (KH, Ca, Mg, température) prime sur leur valeur absolue.",
        "Utiliser exclusivement de l'eau osmosée (RODI < 5 ppm TDS) pour tout apport.",
        "Rejoindre un club ou forum local : le retour d'expérience en marin est précieux.",
      ],
    };
  }

  // bassin
  const lignes: LigneSetup[] = [
    { emoji: '🫧', categorie: 'Filtration',
      item: isNano ? 'Filtre de bassin pression (Oase BioPress 6000 / Pontec PondoPress)'
          : isMoyen ? 'Filtre à tambour ou boîte de filtration (Oase Biotec ScreenMatic / BioTec Koi 6)'
          : 'Filtre boîte + filtre à tambour automatique (Oase BioTec Screenmatic2)',
      detail: 'Capacité filtrante = 2× le volume du bassin pour les koïs' },
    { emoji: '💧', categorie: 'Pompe de circulation',
      item: isNano ? 'Pompe de bassin 3 000-5 000 L/h (Oase AquaMax Eco 4000)'
          : isMoyen ? 'Pompe 8 000-15 000 L/h (Oase AquaMax Eco Premium)'
          : 'Pompe 20 000-40 000 L/h (Oase AquaMax Eco Expert)',
      detail: 'Débit = volume du bassin par heure minimum' },
    { emoji: '☀️', categorie: 'UV stérilisateur',
      item: isNano ? 'UV 9-18 W (JBL ProCristal UV-C 18W)' : isMoyen ? 'UV 36-55 W (TMC Vecton 300)' : 'UV 75-110 W ou double UV 36 W',
      detail: 'Traite les algues en suspension (eau verte) et les bactéries pathogènes' },
    { emoji: '🌿', categorie: 'Plantes aquatiques',
      item: 'Nénuphars (≥ 40 % couverture) + plantes oxygénantes + plantes de berge',
      detail: "Les plantes sont le premier filtre naturel — indispensables pour la qualité de l'eau" },
    { emoji: '🪨', categorie: 'Fond & structure',
      item: isNano ? 'Bâche EPDM 0,5 mm + feutre de protection + substrat pour plantes'
          : "Bâche EPDM 1 mm ou béton projeté + fond sans substrat (facilite l'entretien pour les koïs)",
      detail: 'Profondeur min. 80 cm pour que les koïs hivernent sans gel' },
    { emoji: '💨', categorie: 'Oxygénation',
      item: isNano ? 'Aérateur 40 L/min' : isMoyen ? 'Aérateur 80-150 L/min (Oase OxyTex 1500)' : 'Aérateur 300+ L/min ou cascade décorative',
      detail: "Essentiel en été (eau chaude = moins d'O₂) et pour les bacs à koïs" },
  ];
  const b = isNano ? [400,900] : isMoyen ? [1000,3000] : isGrand ? [3000,8000] : [8000,25000];
  return {
    titre: `Bassin de jardin ${isNano?'petit':isMoyen?'moyen':isGrand?'grand':'XL'}`,
    lignes, budgetMin: b[0], budgetMax: b[1],
    conseils: [
      'Ne jamais surcharger : 1 cm de poisson pour 50-80 L (koïs), 10-20 L (poissons rouges).',
      'Les nénuphars couvrant 40-60 % de la surface limitent les algues naturellement.',
      'Prévoir une profondeur ≥ 80 cm pour que les koïs hivernent sans gel.',
      'La filtration biologique doit maturer 3-4 semaines avant introduction de poissons.',
      "En été, surveiller l'oxygène dissous tôt le matin (moment le plus bas de la journée).",
    ],
  };
}
