// lib/configurateur.ts
import type { IconeNom } from './icones';
import { estPoisson, quantiteListe, VOL_REF } from './configurateur-peuplement';
import { construireSections, construirePresets, integrerPresets, type SectionEspeces, type SetupPret } from './configurateur-especes';
// Logique du configurateur « clé en main » – pure TypeScript, zéro dépendance externe.

export type Niveau      = 'Debutant' | 'Intermediaire' | 'Expert';
export type TypeBac     = 'douce-plante' | 'douce-biotope' | 'marin' | 'bassin';
export type VolumeBac   = 'nano' | 'moyen' | 'grand' | 'tres-grand';
export type NiveauDiff  = 'Débutant' | 'Intermédiaire' | 'Expert';
export type CatEspece   = string;
export type VolumeChoix = VolumeBac | 'auto';
export type Budget      = 'eco' | 'moyen' | 'haut';
export type TempsEntretien = 'faible' | 'moyen' | 'passion';

export interface EspeceLight {
  slug:             string;
  nomCommun:        string;
  nomScientifique:  string;
  categorie:        CatEspece;
  difficulte:       NiveauDiff;
  volumeMin:        number | null;
  tailleAdulte:     string;
  /** Taille minimale du groupe conseillée (fiche espèce). */
  groupeMin?:       number | null;
  statutLegal:      string;
  co2?:             'Inutile' | 'Recommandé' | 'Indispensable';
  placementPlante?: string;
  corailType?:      string;
  reefSafe?:        string;
  /** Niveau de la colonne d'eau (poissons et invertébrés marins). */
  zone?:            string;
  tempMin?:         number | null;
  tempMax?:         number | null;
  phMin?:           number | null;
  phMax?:           number | null;
}

export interface LigneSetup {
  icone:     IconeNom;
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

export interface EspeceReco extends EspeceLight {
  /** Quantité indicative conseillée (ex : « 8 à 10 », « 2 à 4 »). */
  quantite: string;
}

export interface CuveIdeale {
  titre:  string;
  detail: string;
}

export interface ResultatRecommandation {
  /** Liste à plat de toutes les espèces affichées (sert au comptage des annonces). */
  especes:     EspeceReco[];
  /** Espèces classées par type puis par zone du bac. */
  sections:    SectionEspeces[];
  /** Associations prêtes à l'emploi, compatibles entre elles. */
  presets:     SetupPret[];
  setup:       SetupComplet;
  cuve:        CuveIdeale;
  /** Volume réellement utilisé (résolu si l'utilisateur a répondu « Je ne sais pas »). */
  volume:      VolumeBac;
  volumeAuto:  boolean;
}

// ─── Métadonnées wizard ────────────────────────────────────────────────────────

export const NIVEAUX: { id: Niveau; label: string; desc: string; icone: IconeNom; repete?: number }[] = [
  { id: 'Debutant',      label: 'Débutant',      icone: 'pousse',
    desc: "Premier aquarium ou moins de 2 ans d'expérience. Je préfère la simplicité." },
  { id: 'Intermediaire', label: 'Intermédiaire', icone: 'poisson',
    desc: "Quelques années de pratique, à l'aise avec le cycle de l'azote et les paramètres d'eau." },
  { id: 'Expert',        label: 'Expert',        icone: 'corail',
    desc: 'Éleveur expérimenté, je veux des espèces exigeantes et des setups techniques.' },
];

export const TYPES_BAC: { id: TypeBac; label: string; desc: string; icone: IconeNom; repete?: number }[] = [
  { id: 'douce-plante',  label: 'Eau douce planté',   icone: 'plante',
    desc: 'Aquarium tropical densément végétalisé avec poissons et plantes aquatiques.' },
  { id: 'douce-biotope', label: 'Eau douce biotope',  icone: 'substrat',
    desc: "Décor naturel (Amazonie, Rift africain…) centré sur les poissons, peu ou pas de plantes." },
  { id: 'marin',         label: 'Eau de mer récifal', icone: 'vagues',
    desc: 'Aquarium marin avec poissons, coraux et invertébrés. Plus technique mais spectaculaire.' },
  { id: 'bassin',        label: 'Bassin de jardin',   icone: 'arbre',
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

export const BUDGETS: { id: Budget; label: string; desc: string; icone: IconeNom; repete?: number }[] = [
  { id: 'eco',   label: 'Économique',        icone: 'euro', repete: 1,
    desc: "Priorité au matériel d'occasion et aux petits prix." },
  { id: 'moyen', label: 'Moyen / raisonnable', icone: 'euro', repete: 2,
    desc: 'Un bon équilibre entre neuf et occasion.' },
  { id: 'haut',  label: 'Sans concession',   icone: 'euro', repete: 3,
    desc: 'Matériel haut de gamme, je veux le meilleur.' },
];

export const TEMPS_ENTRETIEN: { id: TempsEntretien; label: string; desc: string; icone: IconeNom; repete?: number }[] = [
  { id: 'faible',  label: "Moins de 15 min / semaine", icone: 'minuteur',
    desc: 'Système basse maintenance, plantes et espèces faciles.' },
  { id: 'moyen',   label: '30 min à 1 h / semaine',    icone: 'minuteur',
    desc: "Maintenance classique, changements d'eau réguliers." },
  { id: 'passion', label: 'Passionné (pas de limite !)', icone: 'minuteur',
    desc: "Projets complexes, engrais, CO₂, paramètres d'eau stricts." },
];

// Une seule réponse : « Qu'aimerais-tu voir principalement dans ton bac ? ».
export const STYLES: Record<TypeBac, { id: string; label: string; desc: string; icone: IconeNom; repete?: number }[]> = {
  'douce-plante': [
    { id: 'plantes-dense', label: 'Un paysage très planté',   icone: 'plante', desc: 'Aquascaping : plantes, racines, crevettes et petits poissons.' },
    { id: 'colorés',       label: 'Un banc de poissons colorés', icone: 'poisson', desc: 'Guppys, tétras, rasboras…' },
    { id: 'majestueux',    label: 'Des poissons majestueux',  icone: 'couronne', desc: 'Discus, scalaires, grands cichlidés : des spécimens.' },
    { id: 'crevettes',     label: "Un univers d'invertébrés", icone: 'coquillage', desc: 'Crevettes Neocaridina / Caridina, escargots.' },
  ],
  'douce-biotope': [
    { id: 'amazonie',   label: 'Un biotope Amazonie',      icone: 'arbre', desc: 'Eau douce, racines, feuilles mortes, poissons sud-américains.' },
    { id: 'colorés',    label: 'Un banc de poissons colorés', icone: 'poisson', desc: 'Guppys, tétras, rasboras…' },
    { id: 'majestueux', label: 'Des poissons majestueux',  icone: 'couronne', desc: 'Cichlidés africains, discus, scalaires : des spécimens.' },
    { id: 'crevettes',  label: "Un univers d'invertébrés", icone: 'coquillage', desc: 'Crevettes, écrevisses naines, escargots.' },
  ],
  'marin': [
    { id: 'reef-poissons',    label: 'Surtout des poissons',    icone: 'poisson', desc: 'Poissons-clowns, gobies et compagnie.' },
    { id: 'reef-coraux-mous', label: 'Coraux mous et anémones', icone: 'corail', desc: 'Faciles et très colorés.' },
    { id: 'reef-coraux-durs', label: 'Coraux durs (LPS / SPS)', icone: 'brassage', desc: 'Plus exigeants, spectaculaires.' },
    { id: 'reef-invertebres', label: 'Crevettes et invertébrés', icone: 'coquillage', desc: "Nettoyeurs et animaux utiles à l'équilibre du bac." },
    { id: 'reef-algues',      label: 'Macroalgues (refugium)',  icone: 'pousse', desc: "Pour stabiliser l'eau naturellement." },
  ],
  'bassin': [
    { id: 'koi',            label: 'Des carpes koï',         icone: 'poisson-symbole', desc: "Les stars du bassin, besoin d'espace et de filtration." },
    { id: 'poissons-rouge', label: 'Poissons rouges / comètes', icone: 'poisson', desc: 'Robustes et faciles.' },
    { id: 'plantes-bassin', label: 'Des plantes aquatiques', icone: 'corail', desc: 'Nénuphars, plantes de berge.' },
    { id: 'faune-locale',   label: 'Faune locale et naturel', icone: 'tortue', desc: 'Un bassin vivant, au plus près de la nature.' },
  ],
};

// ─── Catégories filtrées par type de bac ──────────────────────────────────────

const CATS_BAC: Record<TypeBac, string[]> = {
  'douce-plante':  ['Eau Douce', 'Plantes', 'Crustacés / Invertébrés eau douce', 'Mollusques eau douce'],
  'douce-biotope': ['Eau Douce', 'Crustacés / Invertébrés eau douce', 'Mollusques eau douce'],
  'marin':         ['Poissons marins', 'Coraux et anémones', 'Invertébrés marins', 'Macroalgues marines'],
  'bassin':        ['Bassin', 'Plantes'],
};

const DIFF_OK: Record<Niveau, NiveauDiff[]> = {
  Debutant:      ['Débutant'],
  Intermediaire: ['Débutant', 'Intermédiaire'],
  Expert:        ['Débutant', 'Intermédiaire', 'Expert'],
};

// ─── Recommandation ────────────────────────────────────────────────────────────

export function recommander(
  pool:         EspeceLight[],
  niveau:       Niveau,
  typeBac:      TypeBac,
  volumeChoix:  VolumeChoix,
  style:        string | null,
  budget:       Budget = 'moyen',
  temps:        TempsEntretien = 'moyen',
): ResultatRecommandation {
  const volumeAuto = volumeChoix === 'auto';
  const volume: VolumeBac = volumeAuto ? volumeConseille(typeBac, niveau, budget) : volumeChoix;
  const cats   = CATS_BAC[typeBac];
  // Peu de temps d'entretien : on ne propose que des espèces faciles, quel que
  // soit le niveau déclaré (un expert pressé ne veut pas d'un bac capricieux).
  const diffs  = temps === 'faible' ? (['Débutant'] as NiveauDiff[]) : DIFF_OK[niveau];
  // Une espèce n'est proposée que si la cuve annoncée (« Ta cuve idéale ») atteint son volume minimum.
  const volMax = VOL_REF[typeBac][volume];
  const filtered = pool.filter((e) => {
    if (!cats.includes(e.categorie)) return false;
    if (e.statutLegal === 'interdite' || e.statutLegal === 'autorisation_requise') return false;
    if (!diffs.includes(e.difficulte)) return false;
    if ((e.volumeMin ?? 0) > volMax) return false;
    if (e.placementPlante === 'Plante de bassin' && typeBac !== 'bassin') return false;
    if (e.placementPlante === 'Plante de berge'  && typeBac !== 'bassin') return false;
    return true;
  });

  const ctx = { filtered, typeBac, volume, niveau, style, temps, quantite: (e: EspeceLight, v: VolumeBac) => quantiteConseillee(e, v, typeBac) };
  const presets  = construirePresets(ctx);
  // Toute espèce d'un setup figure aussi dans les listes d'espèces compatibles.
  const sections = integrerPresets(construireSections(ctx), presets, typeBac);

  // Liste à plat (sans doublon) : sert au comptage des annonces en ligne.
  const vus = new Set<string>();
  const especesReco: EspeceReco[] = sections
    .flatMap((sec) => sec.groupes.flatMap((g) => g.especes))
    .filter((e) => (vus.has(e.slug) ? false : (vus.add(e.slug), true)));

  return {
    especes: especesReco,
    sections,
    presets,
    setup:   genererSetup(niveau, typeBac, volume, budget, temps),
    cuve:    cuveIdeale(typeBac, volume),
    volume,
    volumeAuto,
  };
}

// ─── Volume conseillé (« Je ne sais pas encore ») ─────────────────────────────

export function volumeConseille(typeBac: TypeBac, niveau: Niveau, budget: Budget): VolumeBac {
  // Marin : un nano est trop instable pour être conseillé d'office.
  if (typeBac === 'marin') return budget === 'haut' && niveau === 'Expert' ? 'grand' : 'moyen';
  if (budget === 'eco') return 'nano';
  if (budget === 'haut' && niveau === 'Expert') return 'grand';
  return 'moyen';
}

// ─── Cuve idéale ──────────────────────────────────────────────────────────────

export function cuveIdeale(typeBac: TypeBac, volume: VolumeBac): CuveIdeale {
  const detail = VOLUMES_BAC[typeBac].find((v) => v.id === volume)?.detail ?? '';
  const titres: Record<TypeBac, Record<VolumeBac, string>> = {
    'douce-plante': {
      nano:         'Aquarium 40 L avec filtre interne et sol nutritif',
      moyen:        'Aquarium 100 L (80 cm) avec filtre externe et sol nutritif',
      grand:        'Aquarium 250 L (120 cm) avec filtre externe et sol nutritif',
      'tres-grand': 'Aquarium 500 L et plus avec double filtre externe',
    },
    'douce-biotope': {
      nano:         'Aquarium 40 L avec filtre interne',
      moyen:        'Aquarium 100 L (80 cm) avec filtre externe',
      grand:        'Aquarium 250 L (120 cm) avec filtre externe',
      'tres-grand': 'Aquarium 500 L et plus avec double filtre externe',
    },
    'marin': {
      nano:         'Nano-récif 60 L tout-en-un',
      moyen:        'Récif 200 L (100 cm) avec décanteur / sump',
      grand:        'Récif 400 L avec sump dédié',
      'tres-grand': 'Récif 700 L et plus avec sump dédié',
    },
    'bassin': {
      nano:         'Bassin de 800 L (profondeur 60 cm)',
      moyen:        'Bassin de 3 000 L (profondeur 80 cm)',
      grand:        'Bassin de 10 000 L (profondeur 1 m)',
      'tres-grand': 'Bassin de 25 000 L et plus',
    },
  };
  return { titre: titres[typeBac][volume], detail };
}

// ─── Quantités indicatives ────────────────────────────────────────────────────

export function quantiteConseillee(e: EspeceLight, volume: VolumeBac, typeBac: TypeBac = 'douce-plante'): string {
  const idx = ['nano', 'moyen', 'grand', 'tres-grand'].indexOf(volume);
  const pick = (vals: string[]) => vals[Math.max(0, idx)];
  switch (e.categorie) {
    case 'Plantes':                           return '3 à 5 pieds';
    case 'Crustacés / Invertébrés eau douce': return pick(['10', '10 à 15', '15 à 20', '20 et plus']);
    case 'Mollusques eau douce':              return '3 à 5';
    case 'Coraux et anémones':                return '1 colonie';
    case 'Invertébrés marins':                return '2 à 3';
    case 'Macroalgues marines':               return '1 touffe';
    case 'Bassin':
    default: // poissons : effectifs calculés d'après la taille adulte et le volume du bac
      return estPoisson(e) ? quantiteListe(e, typeBac, volume) : '1';
  }
}

// ─── Génération du setup équipement ───────────────────────────────────────────

export function genererSetup(
  niveau:  Niveau,
  typeBac: TypeBac,
  volume:  VolumeBac,
  budget:  Budget = 'moyen',
  temps:   TempsEntretien = 'moyen',
): SetupComplet {
  const base = genererSetupBrut(niveau, typeBac, volume, budget);
  const arrondi = (n: number) => Math.round(n / 10) * 10;
  const facteur = budget === 'eco' ? 0.75 : budget === 'haut' ? 1.35 : 1;

  let lignes = base.lignes;
  const conseils = [...base.conseils];

  // Peu de temps d'entretien en eau douce plantée : pas de CO₂ ni d'osmoseur.
  if (temps === 'faible' && typeBac === 'douce-plante') {
    lignes = lignes.filter((l) => l.categorie !== 'CO₂' && l.categorie !== 'Osmose');
    conseils.unshift('Pas de CO₂ : choisis des plantes robustes (anubias, fougère java, cryptocorynes) et un éclairage modéré pour limiter algues et entretien.');
  }

  if (budget === 'eco') {
    conseils.push("Budget serré : achète filtre, éclairage et chauffage d'occasion — jusqu'à 50 % d'économie possible sur Aquatopia, selon les annonces disponibles.");
  } else if (budget === 'haut') {
    conseils.push('Budget confortable : investis d\'abord dans la filtration et l\'éclairage, ils conditionnent tout le reste du projet.');
  }
  if (temps === 'faible') {
    conseils.push('Avec peu de temps : un changement d\'eau de 20 % par semaine et un bac bien planté suffisent pour un aquarium stable.');
  } else if (temps === 'passion') {
    conseils.push('Passionné : tu peux viser des espèces exigeantes et suivre tes paramètres (GH, KH, nitrates) avec des tests réguliers.');
  }

  return {
    ...base,
    lignes,
    conseils,
    budgetMin: arrondi(base.budgetMin * facteur),
    budgetMax: arrondi(base.budgetMax * facteur),
  };
}

function genererSetupBrut(niveau: Niveau, typeBac: TypeBac, volume: VolumeBac, budget: Budget): SetupComplet {
  const isNano  = volume === 'nano';
  const isMoyen = volume === 'moyen';
  const isGrand = volume === 'grand';
  // Budget serré → équipement d'entrée de gamme ; haut de gamme → équipement avancé.
  const isDeb   = budget === 'eco' || (niveau === 'Debutant' && budget !== 'haut');

  if (typeBac === 'douce-plante') {
    const lignes: LigneSetup[] = [
      { icone: 'filtration', categorie: 'Filtration',
        item: isNano
          ? 'Filtre interne (Fluval U2 / Eheim Aquaball)'
          : isMoyen ? 'Filtre externe 600-900 L/h (Eheim Classic 350 / JBL CristalProfi e702)'
          : 'Double filtre externe 1 200-2 400 L/h + pompe de brassage',
        detail: isNano ? 'Débit ~300 L/h' : isMoyen ? 'Débit 4-5× le volume du bac' : 'Débit 6-8× le volume' },
      { icone: 'eclairage', categorie: 'Éclairage',
        item: isNano
          ? (isDeb ? 'Rampe LED 6 500 K 20 W (Aquael Leddy / Chihiros A-201)'
                   : 'Rampe LED fine spectrale (Chihiros WRGB II 30 / Twinstar 300E)')
          : isMoyen
            ? (isDeb ? 'Rampe LED horticole (Fluval Plant 3.0 60 cm)'
                     : 'Rampe LED haut de gamme (Twinstar 900E / Chihiros WRGB II 60)')
            : 'Série de 2-3 rampes LED haut de gamme (Twinstar 1200S / ATI SolarNode)',
        detail: 'Photopériode 8-10 h/j — timer recommandé' },
      { icone: 'chauffage', categorie: 'Chauffage',
        item: isNano ? 'Thermostat 50 W (Aquael Ultra / Eheim Jäger)'
            : isMoyen ? 'Thermostat 100-150 W (Eheim Jäger / Fluval M)'
            : 'Thermostat 200-300 W (ou 2 × 150 W)',
        detail: '24-26 °C selon les espèces' },
      { icone: 'substrat', categorie: 'Substrat',
        item: isDeb
          ? 'Sol nutritif débutant (Dennerle Power Soil / JBL Manado Dark) 3-5 cm'
          : 'Sol nutritif professionnel (ADA Amazonia / Tropica Aquarium Soil) 5-7 cm',
        detail: 'Optionnel : 2 cm de sable fin décoratif par-dessus' },
      { icone: 'co2', categorie: 'CO₂',
        item: (isDeb || isNano)
          ? 'Système CO₂ liquide (Dennerle S35 95 g + diffuseur)'
          : isMoyen
            ? 'Bouteille CO₂ rechargeable 500 g + réducteur double jauge + diffuseur verre atomiseur'
            : 'Bouteille CO₂ 2 kg + réducteur électronique + diffuseur en ligne',
        detail: '20-30 ppm en photopériode — arrêt automatique la nuit' },
      { icone: 'eau', categorie: 'Entretien eau',
        item: 'Conditionneur (Seachem Prime) + engrais liquide macro/micro (Tropica / Seachem Flourish)',
        detail: 'Changement 20-30 % hebdomadaire — test GH/KH/nitrates mensuel' },
    ];
    if (!isNano && !isDeb) {
      lignes.push({ icone: 'osmose', categorie: 'Osmose',
        item: 'Osmoseur 100-200 GPD + reminéralisation (Salty Shrimp GH+)',
        detail: 'Recommandé si eau du robinet > 15° GH' });
    }
    const b = isNano ? (isDeb ? [120,250] : [200,400]) : isMoyen ? (isDeb ? [350,600] : [600,1100]) : isGrand ? [900,1900] : [2000,5000];
    return {
      titre: `Aquarium ${isNano?'nano':isMoyen?'moyen':isGrand?'grand':'XL'} eau douce planté`,
      lignes, budgetMin: b[0], budgetMax: b[1],
      conseils: [
        "Lancez le cycle de l'azote (fishless cycling) 3-4 semaines avant d'introduire les premiers poissons.",
        "Plantez dense dès le départ pour limiter les algues — les plantes consomment les nitrates.",
        isDeb
          ? "Commencez par des plantes robustes : Vallisneria, Cryptocoryne, Anubias, Java fern."
          : "Équilibrez le ratio lumière / CO₂ / engrais pour éviter les algues indésirables.",
        "Changement d'eau hebdomadaire de 20-30 % : premier facteur de succès.",
      ],
    };
  }

  if (typeBac === 'douce-biotope') {
    const lignes: LigneSetup[] = [
      { icone: 'filtration', categorie: 'Filtration',
        item: isNano ? 'Filtre interne (Eheim Aquaball / Fluval U2)'
            : isMoyen ? 'Filtre externe (Eheim Classic 350 / JBL CristalProfi e702)'
            : 'Filtre externe puissant 1 200-2 000 L/h (Eheim Pro 4 / Fluval FX4)',
        detail: "Privilégier un débit doux pour les espèces d'eaux calmes" },
      { icone: 'eclairage', categorie: 'Éclairage',
        item: isNano ? 'Rampe LED 6 500 K 15-25 W (Aquael Leddy / Fluval Plant nano)'
            : isMoyen ? 'Rampe LED 40-60 W (Aquael Leddy XXL / Beamwork DA FSPEC)'
            : 'Rampe LED 80-120 W ou 2 × 50 W',
        detail: "Photopériode 8-10 h/j — limiter pour biotopes ombragés (Amazonie)" },
      { icone: 'chauffage', categorie: 'Chauffage',
        item: isNano ? 'Thermostat 50 W' : isMoyen ? 'Thermostat 100-150 W' : 'Thermostat 200-300 W',
        detail: '24-28 °C — les cichlidés du Rift préfèrent 25-27 °C' },
      { icone: 'substrat', categorie: 'Substrat & décor',
        item: 'Sable fin 0,2-1 mm (JBL Sansibar) + décor biotope adapté',
        detail: 'Racines + feuilles mortes (Amazonie) | Roches calcaires (Rift africain)' },
      { icone: 'eau', categorie: 'Paramètres',
        item: 'Conditionneur (Seachem Prime) + test pH/GH/KH hebdomadaire',
        detail: 'Eau noire (Amazonie) : tourbe ou feuilles de catappa, pH 6-7, GH < 8' },
    ];
    const b = isNano ? [100,220] : isMoyen ? [300,550] : isGrand ? [700,1500] : [1500,4000];
    return {
      titre: `Aquarium ${isNano?'nano':isMoyen?'moyen':isGrand?'grand':'XL'} eau douce biotope`,
      lignes, budgetMin: b[0], budgetMax: b[1],
      conseils: [
        "Cycle de l'azote obligatoire avant l'introduction de poissons (3-4 semaines).",
        "Rift africain : eau dure, pH 7.8-8.5, pierres calcaires, lumière vive.",
        "Amazonie : eau douce acide (pH 6-7), sable fin, racines, feuilles mortes.",
        "Variez les niveaux de nage (surface, milieu, fond) pour un aquarium harmonieux.",
      ],
    };
  }

  if (typeBac === 'marin') {
    const lignes: LigneSetup[] = [
      { icone: 'filtration', categorie: 'Filtration / Sump',
        item: isNano
          ? 'Bac tout-en-un (Red Sea Max Nano / Fluval Evo) ou décanteur externe'
          : isMoyen ? 'Sump 50-80 L + décanteur en verre (Deltec / Bubble Magus)'
          : 'Sump 100-150 L + décanteur haut de gamme (Bubble King / Royal Exclusiv)',
        detail: 'Le sump augmente le volume total — facteur clé de stabilité' },
      { icone: 'ecumeur', categorie: 'Écumeur (skimmer)',
        item: isNano ? 'Mini-skimmer (Tunze 9001 / Reef Octopus Nano)'
            : isMoyen ? 'Skimmer externe (Bubble Magus Curve A5 / Deltec SC 1455)'
            : 'Skimmer haut de gamme (Bubble King / Royal Exclusiv)',
        detail: 'Élimine la matière organique avant décomposition — indispensable' },
      { icone: 'eclairage', categorie: 'Éclairage',
        item: isNano
          ? (isDeb ? 'LED marin (Kessil A80 / AI Prime HD)' : 'LED performante (Radion XR15 / Kessil A160WE)')
          : isMoyen
            ? 'LED suspendue × 1-2 (Radion XR15 / AI Hydra 32 / Kessil A360X)'
            : 'LED haut de gamme × 2-3 (Radion XR30 / ATI SolarNode)',
        detail: 'Spectre 14 000-20 000 K + UV/violet — progression sur 2-4 semaines' },
      { icone: 'brassage', categorie: 'Brassage',
        item: isNano ? 'Pompe de brassage 1 000-2 000 L/h (Jebao SLW-10 / Tunze 6015)'
            : isMoyen ? '2 × pompes de brassage (Jebao RW-8 / Tunze 6055)'
            : 'Gyre (Maxspect / Panta Rei) ou 2-3 × Tunze 6105',
        detail: 'Viser 15-25× le volume du bac en brassage total' },
      { icone: 'chauffage', categorie: 'Chauffage',
        item: isNano ? '2 × thermostat 100 W (redondance de sécurité)'
            : isMoyen ? '2 × thermostat 150-200 W'
            : '2 × thermostat 300 W ou refroidisseur/chauffe-eau (Teco TC15)',
        detail: '25-26 °C — TOUJOURS deux thermostats indépendants' },
      { icone: 'chimie', categorie: "Chimie de l'eau",
        item: (isNano || isDeb)
          ? 'Sel de qualité (Red Sea Coral Pro / Tropic Marin) + osmoseur 75 GPD + réfractomètre'
          : isMoyen
            ? 'Sel + osmoseur 100 GPD + tests KH/Ca/Mg + dosage Manuel (Balling ou NaHCO3/CaCl2)'
            : 'Sel + osmoseur 200 GPD + doseur automatique (GHL Doser) + contrôleur (GHL ProfiLux)',
        detail: 'Salinité 1.023-1.025 — 100 % eau osmosée RODI < 5 ppm TDS' },
    ];
    if (!isDeb || !isNano) {
      lignes.push({ icone: 'uv', categorie: 'UV stérilisateur',
        item: isNano ? 'UV 9 W en ligne' : 'UV 18-36 W (TMC Vecton / Aqua Ultraviolet)',
        detail: 'Réduit les agents pathogènes — optionnel mais recommandé' });
    }
    const b = isNano ? (isDeb ? [600,1100] : [900,1800]) : isMoyen ? (isDeb ? [1500,3000] : [2500,5000]) : isGrand ? [4000,9000] : [8000,20000];
    return {
      titre: `Aquarium ${isNano?'nano':isMoyen?'moyen':isGrand?'grand':'XL'} eau de mer récifal`,
      lignes, budgetMin: b[0], budgetMax: b[1],
      conseils: [
        "Patience obligatoire : maturation biologique 6-8 semaines minimum avant tout animal.",
        "Investir dans du bon matériel dès le départ — les économies coûtent cher en marin.",
        isDeb
          ? "Commencez par des poissons robustes (Amphiprion) et des coraux mous avant les LPS/SPS."
          : "La stabilité des paramètres (KH, Ca, Mg, température) prime sur leur valeur absolue.",
        "Utiliser exclusivement de l'eau osmosée (RODI < 5 ppm TDS) pour tout apport.",
        "Rejoindre un club ou forum local : le retour d'expérience en marin est précieux.",
      ],
    };
  }

  // bassin
  const lignes: LigneSetup[] = [
    { icone: 'filtration', categorie: 'Filtration',
      item: isNano ? 'Filtre de bassin pression (Oase BioPress 6000 / Pontec PondoPress)'
          : isMoyen ? 'Filtre à tambour ou boîte de filtration (Oase Biotec ScreenMatic / BioTec Koi 6)'
          : 'Filtre boîte + filtre à tambour automatique (Oase BioTec Screenmatic2)',
      detail: 'Capacité filtrante = 2× le volume du bassin pour les koïs' },
    { icone: 'eau', categorie: 'Pompe de circulation',
      item: isNano ? 'Pompe de bassin 3 000-5 000 L/h (Oase AquaMax Eco 4000)'
          : isMoyen ? 'Pompe 8 000-15 000 L/h (Oase AquaMax Eco Premium)'
          : 'Pompe 20 000-40 000 L/h (Oase AquaMax Eco Expert)',
      detail: 'Débit = volume du bassin par heure minimum' },
    { icone: 'uv', categorie: 'UV stérilisateur',
      item: isNano ? 'UV 9-18 W (JBL ProCristal UV-C 18W)' : isMoyen ? 'UV 36-55 W (TMC Vecton 300)' : 'UV 75-110 W ou double UV 36 W',
      detail: 'Traite les algues en suspension (eau verte) et les bactéries pathogènes' },
    { icone: 'plante', categorie: 'Plantes aquatiques',
      item: 'Nénuphars (≥ 40 % couverture) + plantes oxygénantes + plantes de berge',
      detail: "Les plantes sont le premier filtre naturel — indispensables pour la qualité de l'eau" },
    { icone: 'substrat', categorie: 'Fond & structure',
      item: isNano ? 'Bâche EPDM 0,5 mm + feutre de protection + substrat pour plantes'
          : "Bâche EPDM 1 mm ou béton projeté + fond sans substrat (facilite l'entretien pour les koïs)",
      detail: 'Profondeur min. 80 cm pour que les koïs hivernent sans gel' },
    { icone: 'co2', categorie: 'Oxygénation',
      item: isNano ? 'Aérateur 40 L/min' : isMoyen ? 'Aérateur 80-150 L/min (Oase OxyTex 1500)' : 'Aérateur 300+ L/min ou cascade décorative',
      detail: "Essentiel en été (eau chaude = moins d'O₂) et pour les bacs à koïs" },
  ];
  const b = isNano ? [400,900] : isMoyen ? [1000,3000] : isGrand ? [3000,8000] : [8000,25000];
  return {
    titre: `Bassin de jardin ${isNano?'petit':isMoyen?'moyen':isGrand?'grand':'XL'}`,
    lignes, budgetMin: b[0], budgetMax: b[1],
    conseils: [
      'Ne jamais surcharger : 1 cm de poisson pour 50-80 L (koïs), 10-20 L (poissons rouges).',
      'Les nénuphars couvrant 40-60 % de la surface limitent les algues naturellement.',
      'Prévoir une profondeur ≥ 80 cm pour que les koïs hivernent sans gel.',
      'La filtration biologique doit maturer 3-4 semaines avant introduction de poissons.',
      "En été, surveiller l'oxygène dissous tôt le matin (moment le plus bas de la journée).",
    ],
  };
}
