// lib/configurateur-especes.ts
// Résultats du configurateur : espèces classées par zone du bac (surface / milieu /
// fond ; arrière-plan / plan moyen / avant-plan) et setups « prêts à l'emploi »
// dont les espèces sont compatibles entre elles (températures et pH communs).
import type { IconeNom } from './icones';
import type { EspeceLight, EspeceReco, TypeBac, VolumeBac, Niveau, TempsEntretien } from './configurateur';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Zone = 'surface' | 'milieu' | 'fond';

export interface GroupeEspeces {
  id:      string;
  label:   string;
  astuce?: string;
  especes: EspeceReco[];
}

export interface SectionEspeces {
  id:      string;
  titre:   string;
  icone:   IconeNom;
  groupes: GroupeEspeces[];
}

export interface MembreSetup {
  role:    string;
  espece:  EspeceReco;
}

export interface SetupPret {
  id:      string;
  titre:   string;
  desc:    string;
  membres: MembreSetup[];
  /** Plage de température commune à tous les poissons (ex : « 22–26 °C »). */
  temp:    string | null;
  /** pH commun (ex : « 7 » ou « 6–6,5 »). */
  ph:      string | null;
}

export interface CtxEspeces {
  filtered: EspeceLight[];
  typeBac:  TypeBac;
  volume:   VolumeBac;
  niveau:   Niveau;
  style:    string | null;
  temps:    TempsEntretien;
  quantite: (e: EspeceLight, v: VolumeBac) => string;
}

// ─── Données éditoriales : zone de nage ───────────────────────────────────────

// Zone principale de nage des poissons d'eau douce (non renseignée dans les fiches).
const ZONE_DOUCE: Record<string, Zone> = {
  // Surface
  'guppy': 'surface', 'endler': 'surface', 'platy': 'surface', 'xipho-porte-epee': 'surface',
  'molly-voile-noir': 'surface', 'molly-ballon': 'surface', 'molly-voile-de-lyre': 'surface',
  'combattant-betta': 'surface', 'gourami-nain': 'surface', 'gourami-perle': 'surface',
  'gourami-miel': 'surface', 'gourami-geant': 'surface', 'gourami-dore': 'surface',
  'danio-zebre': 'surface', 'danio-leopard': 'surface', 'poisson-arc-en-ciel': 'surface',
  'killie-nothobranchius': 'surface', 'poisson-archer': 'surface', 'poisson-hachette': 'surface',
  'anableps-poisson-a-quatre-yeux': 'surface', 'arowana-asiatique': 'surface',
  // Fond
  'corydoras-de-sterba': 'fond', 'corydoras-bronze': 'fond', 'corydoras-panda': 'fond',
  'corydoras-pygmee': 'fond', 'poisson-chat-corydoras-venezuela': 'fond',
  'loche-clown': 'fond', 'loche-kuhli': 'fond', 'poisson-clown-loche-yoyo': 'fond',
  'ancistrus-plecos-commun': 'fond', 'bristlenose-ancistrus-nain': 'fond', 'pleco-commun': 'fond',
  'hypancistrus-zebra-l046': 'fond', 'otocinclus': 'fond', 'poisson-chat-pictus': 'fond',
  'poisson-chat-synodontis': 'fond', 'raie-d-eau-douce-potamotrygon-motoro': 'fond',
  'esturgeon-nain': 'fond', 'anguille-serpent-mastacembelus': 'fond', 'poisson-roseau': 'fond',
  'poisson-elephant-mormyridae': 'fond', 'apistogramma-cacatuoides': 'fond',
  'apistogramma-viejita': 'fond', 'ram-papiliochromis': 'fond',
  'poisson-perroquet-nain-convict': 'fond', 'kribensis': 'fond',
  // Tout le reste (tétras, rasboras, barbus, scalaire, discus, cichlidés…) : milieu.
};

const ZONE_BASSIN: Record<string, Zone> = {
  'poisson-rouge-carassin-dore': 'surface',
  'vairon': 'surface',
  'tanche': 'fond',
};

function zoneDe(e: EspeceLight, typeBac: TypeBac): Zone {
  if (typeBac === 'marin') {
    if (e.zone === 'Surface') return 'surface';
    if (e.zone === 'Fond')    return 'fond';
    return 'milieu';
  }
  if (typeBac === 'bassin') return ZONE_BASSIN[e.slug] ?? 'milieu';
  return ZONE_DOUCE[e.slug] ?? 'milieu';
}

// Placement des premières plantes de la base (champ non renseigné dans leur fiche).
const PLACEMENT_PLANTE_DEFAUT: Record<string, string> = {
  'mousse-de-java': 'Fixée sur bois ou roche', 'anubias-nana': 'Fixée sur bois ou roche',
  'fougere-de-java': 'Fixée sur bois ou roche', 'cryptocoryne-wendtii': 'Milieu de bac',
  'echinodorus-epee-d-amazone': 'Arrière-plan', 'vallisneria-spiralis': 'Arrière-plan',
  'hygrophila-polysperma': 'Arrière-plan', 'rotala-rotundifolia': 'Milieu de bac',
  'ludwigia-repens': 'Milieu de bac', 'lentille-d-eau-lemna-minor': 'Flottante',
  'bacopa-caroliniana': 'Milieu de bac', 'limnophila-sessiliflora': 'Arrière-plan',
  'riccia-fluitans': 'Flottante', 'cryptocoryne-parva': 'Avant-plan',
  'hydrocotyle-leucocephala-trefle-d-eau': 'Milieu de bac', 'eleocharis-herbe-aiguille': 'Avant-plan',
  'pogostemon-helferi': 'Avant-plan', 'ceratophyllum-demersum': 'Arrière-plan',
};

type GroupePlante = 'arriere' | 'milieu' | 'avant' | 'fixee' | 'flottante';

function groupePlante(e: EspeceLight): GroupePlante | null {
  const p = e.placementPlante ?? PLACEMENT_PLANTE_DEFAUT[e.slug];
  switch (p) {
    case 'Arrière-plan':            return 'arriere';
    case 'Milieu de bac':           return 'milieu';
    case 'Avant-plan':
    case 'Tapis':                   return 'avant';
    case 'Fixée sur bois ou roche': return 'fixee';
    case 'Flottante':               return 'flottante';
    default:                        return null;
  }
}

// Espèces mises en avant (les plus courantes / faciles) : elles passent en premier.
const POPULAIRES = [
  'guppy', 'endler', 'platy', 'molly-voile-noir', 'tetra-neon', 'tetra-cardinal', 'rasbora-arlequin',
  'barbus-cerise', 'danio-zebre', 'corydoras-bronze', 'corydoras-de-sterba', 'corydoras-pygmee',
  'gourami-nain', 'combattant-betta', 'scalaire', 'ancistrus-plecos-commun', 'loche-kuhli', 'otocinclus',
  'tetra-citron', 'crevette-red-cherry', 'crevette-amano', 'neritine', 'escargot-mystere',
  'poisson-clown-ocellaris', 'poisson-clown-tomate', 'gramma-royal', 'gobie-neon', 'blennie-bicolore',
  'cardinalis-de-banggai', 'crevette-nettoyeuse', 'escargot-turbo', 'zoanthaire',
  'corail-mou-genre-sarcophyton', 'corail-champignon-dur', 'chaetomorpha',
  'anubias-nana', 'mousse-de-java', 'vallisneria-spiralis', 'cryptocoryne-wendtii',
  'echinodorus-epee-d-amazone', 'hygrophila-corymbosa', 'bacopa-caroliniana', 'staurogyne-repens',
  'lilaeopsis-du-bresil', 'cryptocoryne-parva', 'lentille-d-eau-lemna-minor', 'ludwigia-repens',
  'carpe-koi', 'poisson-rouge-carassin-dore', 'nenuphar-de-bassin', 'iris-des-marais',
  'pontederie-a-feuilles-en-coeur',
];

const ORD = ['Débutant', 'Intermédiaire', 'Expert'];

// ─── Utilitaires ──────────────────────────────────────────────────────────────

type Pred = (e: EspeceLight) => boolean;

function trier(list: EspeceLight[], pred?: Pred): EspeceLight[] {
  const rangPop = (e: EspeceLight) => { const i = POPULAIRES.indexOf(e.slug); return i < 0 ? 9999 : i; };
  return [...list].sort((a, b) => {
    if (pred) {
      const d = (pred(a) ? 0 : 1) - (pred(b) ? 0 : 1);
      if (d !== 0) return d;
    }
    const p = rangPop(a) - rangPop(b);
    if (p !== 0) return p;
    const d = ORD.indexOf(a.difficulte) - ORD.indexOf(b.difficulte);
    return d !== 0 ? d : a.nomCommun.localeCompare(b.nomCommun, 'fr');
  });
}

/** Les espèces peuvent cohabiter : 2 °C de température commune et pH qui se recoupent. */
function compatibles(deja: EspeceLight[], e: EspeceLight): boolean {
  const tous = [...deja, e];
  const tMin = Math.max(...tous.map((x) => x.tempMin ?? -Infinity));
  const tMax = Math.min(...tous.map((x) => x.tempMax ?? Infinity));
  if (Number.isFinite(tMin) && Number.isFinite(tMax) && tMax - tMin < 2) return false;
  const pMin = Math.max(...tous.map((x) => x.phMin ?? -Infinity));
  const pMax = Math.min(...tous.map((x) => x.phMax ?? Infinity));
  if (Number.isFinite(pMin) && Number.isFinite(pMax) && pMax < pMin) return false;
  return true;
}

const fmt = (n: number) => String(n).replace('.', ',');

export function parametresCommuns(list: EspeceLight[]): { temp: string | null; ph: string | null } {
  const tMin = Math.max(...list.map((x) => x.tempMin ?? -Infinity));
  const tMax = Math.min(...list.map((x) => x.tempMax ?? Infinity));
  const pMin = Math.max(...list.map((x) => x.phMin ?? -Infinity));
  const pMax = Math.min(...list.map((x) => x.phMax ?? Infinity));
  return {
    temp: Number.isFinite(tMin) && Number.isFinite(tMax) && tMax >= tMin
      ? (tMin === tMax ? `${fmt(tMin)} °C` : `${fmt(tMin)}–${fmt(tMax)} °C`) : null,
    ph: Number.isFinite(pMin) && Number.isFinite(pMax) && pMax >= pMin
      ? (pMin === pMax ? fmt(pMin) : `${fmt(pMin)}–${fmt(pMax)}`) : null,
  };
}

/** Prend jusqu'à n espèces compatibles avec celles déjà retenues (qui est mise à jour). */
function prendre(
  candidats: EspeceLight[], n: number, retenues: EspeceLight[], pred?: Pred, verifierCompat = true,
): EspeceLight[] {
  const res: EspeceLight[] = [];
  for (const e of trier(candidats, pred)) {
    if (res.length >= n) break;
    if (retenues.some((r) => r.slug === e.slug)) continue;
    if (verifierCompat && !compatibles(retenues, e)) continue;
    res.push(e);
    retenues.push(e);
  }
  return res;
}

// ─── Sections de la page de résultats ─────────────────────────────────────────

export function construireSections(ctx: CtxEspeces): SectionEspeces[] {
  const { filtered, typeBac, volume, style, temps } = ctx;
  const has = (id: string) => style === id;
  const reco = (list: EspeceLight[]): EspeceReco[] =>
    list.map((e) => ({ ...e, quantite: ctx.quantite(e, volume) }));
  const cat = (c: string) => filtered.filter((e) => e.categorie === c);
  const groupe = (id: string, label: string, astuce: string | undefined, list: EspeceLight[]): GroupeEspeces | null =>
    list.length ? { id, label, astuce, especes: reco(list) } : null;
  const garder = (gs: (GroupeEspeces | null)[]) => gs.filter((g): g is GroupeEspeces => !!g);

  const sections: SectionEspeces[] = [];
  const retenuesPoissons: EspeceLight[] = [];

  // ── Poissons ────────────────────────────────────────────────────────────────
  function sectionPoissons(catPoisson: string, n: Record<Zone, number>, pred?: Pred) {
    const poissons = cat(catPoisson);
    const parZone = (z: Zone) => poissons.filter((e) => zoneDe(e, typeBac) === z);
    // Le milieu ancre le choix, puis le fond et la surface s'y accordent.
    const milieu  = prendre(parZone('milieu'),  n.milieu,  retenuesPoissons, pred);
    const fond    = prendre(parZone('fond'),    n.fond,    retenuesPoissons, pred);
    const surface = prendre(parZone('surface'), n.surface, retenuesPoissons, pred);
    const groupes = garder([
      groupe('surface', 'En surface', 'Nagent dans la partie haute du bac.', surface),
      groupe('milieu',  'Au milieu',  'Occupent le centre du bac, souvent en banc.', milieu),
      groupe('fond',    'Au fond',    'Fouillent le sol et nettoient les restes.', fond),
    ]);
    if (groupes.length) sections.push({ id: 'poissons', titre: 'Poissons', icone: 'poisson', groupes });
  }

  // ── Eau douce ───────────────────────────────────────────────────────────────
  if (typeBac === 'douce-plante' || typeBac === 'douce-biotope') {
    const poissonPred: Pred | undefined = has('majestueux') ? (e) => (e.volumeMin ?? 0) >= 80 : undefined;

    if (typeBac === 'douce-plante') {
      const dense = has('plantes-dense');
      const co2Pred: Pred | undefined = temps === 'faible' ? (e) => e.co2 === 'Inutile' : undefined;
      const plantes = cat('Plantes');
      const parGroupe = (g: GroupePlante) => plantes.filter((e) => groupePlante(e) === g);
      const nb = dense ? 3 : 2;
      const sel = (g: GroupePlante, n: number) => prendre(parGroupe(g), n, [], co2Pred, false);
      const groupes = garder([
        groupe('arriere',   'Arrière-plan', 'Grandes plantes qui habillent le fond et cachent la vitre arrière.', sel('arriere', nb)),
        groupe('milieu',    'Plan moyen',   'Plantes touffues qui structurent le décor.', sel('milieu', nb)),
        groupe('avant',     'Avant-plan',   'Plantes basses et gazons, à planter près de la vitre.', sel('avant', nb)),
        groupe('fixee',     'À fixer sur bois ou roche', 'Ne se plantent pas dans le sol : on les attache au décor.', sel('fixee', dense ? 2 : 1)),
        groupe('flottante', 'Flottantes',   'Ombragent le bac et absorbent les nitrates.', sel('flottante', 1)),
      ]);
      if (groupes.length) sections.push({ id: 'plantes', titre: 'Plantes', icone: 'plante', groupes });
    }

    sectionPoissons(
      'Eau Douce',
      has('crevettes') ? { surface: 1, milieu: 2, fond: 1 } : { surface: 2, milieu: 3, fond: 2 },
      poissonPred,
    );

    const crevettes = prendre(cat('Crustacés / Invertébrés eau douce'), has('crevettes') ? 3 : 2, retenuesPoissons);
    const escargots = prendre(cat('Mollusques eau douce'), has('crevettes') ? 2 : 1, retenuesPoissons);
    const groupes = garder([
      groupe('crevettes', 'Crevettes', 'Nettoyeuses discrètes : attention aux gros poissons qui les mangent.', crevettes),
      groupe('escargots', 'Escargots', 'Mangent algues et restes de nourriture.', escargots),
    ]);
    if (groupes.length) sections.push({ id: 'inverts', titre: 'Invertébrés', icone: 'coquillage', groupes });
  }

  // ── Marin ───────────────────────────────────────────────────────────────────
  if (typeBac === 'marin') {
    const poissonsPrio = has('reef-poissons');
    sectionPoissons('Poissons marins', { surface: 1, milieu: poissonsPrio ? 4 : 3, fond: 2 });

    const corailPred: Pred | undefined = has('reef-coraux-durs')
      ? (e) => e.corailType === 'LPS' || e.corailType === 'SPS'
      : has('reef-coraux-mous')
        ? (e) => ['Corail mou', 'Anémone', 'Zoanthaire', 'Corallimorphe'].includes(e.corailType ?? '')
        : undefined;
    const nCoraux = (has('reef-coraux-mous') || has('reef-coraux-durs')) ? 4 : 2;
    const coraux = prendre(cat('Coraux et anémones'), nCoraux, [], corailPred, false);
    const gc = groupe('coraux', 'Coraux et anémones', 'Commencez par les plus faciles (mous, zoanthaires).', coraux);
    if (gc) sections.push({ id: 'coraux', titre: 'Coraux', icone: 'corail', groupes: [gc] });

    const inverts = prendre(cat('Invertébrés marins'), has('reef-invertebres') ? 4 : 3, [], undefined, false);
    const gi = groupe('inverts', 'Nettoyeurs et invertébrés', 'Gardent le bac propre et équilibré.', inverts);
    if (gi) sections.push({ id: 'inverts', titre: 'Invertébrés', icone: 'coquillage', groupes: [gi] });

    const algues = prendre(cat('Macroalgues marines'), has('reef-algues') ? 2 : 1, [], undefined, false);
    const ga = groupe('algues', 'Macroalgues', 'Exportent nitrates et phosphates en refuge.', algues);
    if (ga) sections.push({ id: 'algues', titre: 'Macroalgues', icone: 'pousse', groupes: [ga] });
  }

  // ── Bassin ──────────────────────────────────────────────────────────────────
  if (typeBac === 'bassin') {
    const prio: Pred | undefined =
      has('koi')              ? (e) => e.slug === 'carpe-koi'
      : has('poissons-rouge') ? (e) => e.slug === 'poisson-rouge-carassin-dore'
      : has('faune-locale')   ? (e) => ['vairon', 'perche-soleil-naine-decorative', 'tanche', 'ide-melanote'].includes(e.slug)
      : undefined;
    sectionPoissons('Bassin', { surface: 2, milieu: 3, fond: 1 }, prio);

    const plantes = cat('Plantes');
    const nb = has('plantes-bassin') ? 4 : 2;
    const bassin = prendre(plantes.filter((e) => e.placementPlante === 'Plante de bassin'), nb, [], undefined, false);
    const berge  = prendre(plantes.filter((e) => e.placementPlante === 'Plante de berge'),  nb, [], undefined, false);
    const groupes = garder([
      groupe('bassin', "Dans l'eau", 'Nénuphars et plantes à feuilles flottantes.', bassin),
      groupe('berge',  'En bordure', "Plantes de berge, pieds dans l'eau.", berge),
    ]);
    if (groupes.length) sections.push({ id: 'plantes', titre: 'Plantes aquatiques', icone: 'plante', groupes });
  }

  // Plantes d'abord (comme on construit un décor), puis poissons, puis le reste.
  const ordre = ['plantes', 'poissons', 'coraux', 'inverts', 'algues'];
  return sections.sort((a, b) => ordre.indexOf(a.id) - ordre.indexOf(b.id));
}

// ─── Setups prêts à l'emploi ──────────────────────────────────────────────────

interface Slot {
  role:       string;
  candidats:  string[];
  requis?:    boolean;
}

interface PresetDef {
  id:       string;
  titre:    string;
  desc:     string;
  types:    TypeBac[];
  volumes?: VolumeBac[];
  styles?:  string[];
  slots:    Slot[];
  /** Ajoute une plante d'arrière-plan, de plan moyen et d'avant-plan (eau douce plantée). */
  plantes?: boolean;
}

const EAU_DOUCE: TypeBac[] = ['douce-plante', 'douce-biotope'];

const PRESETS: PresetDef[] = [
  // ─ Eau douce ─
  {
    id: 'communaute-coloree', titre: 'Communauté colorée',
    desc: 'Le grand classique : un banc vif au milieu, des vivipares en surface et des corydoras qui nettoient le sol.',
    types: EAU_DOUCE, styles: ['colorés'], plantes: true,
    slots: [
      { role: 'Surface', candidats: ['guppy', 'endler', 'platy'] },
      { role: 'Milieu',  candidats: ['tetra-neon', 'tetra-glowlight', 'rasbora-tete-de-cuivre', 'barbus-cerise'], requis: true },
      { role: 'Fond',    candidats: ['corydoras-bronze', 'corydoras-de-sterba', 'corydoras-pygmee', 'poisson-chat-corydoras-venezuela'] },
      { role: 'Invertébré', candidats: ['crevette-red-cherry', 'neritine', 'escargot-mystere'] },
    ],
  },
  {
    id: 'amazonie-paisible', titre: 'Amazonie paisible',
    desc: "Tétras, gourami nain et petits nettoyeurs : une eau douce et des plantes d'Amérique du Sud et d'Asie.",
    types: EAU_DOUCE, styles: ['amazonie', 'plantes-dense'], plantes: true,
    slots: [
      { role: 'Surface', candidats: ['gourami-nain', 'gourami-miel', 'combattant-betta'] },
      { role: 'Milieu',  candidats: ['tetra-cardinal', 'tetra-citron', 'tetra-rouge-minor', 'rasbora-arlequin'], requis: true },
      { role: 'Fond',    candidats: ['corydoras-pygmee', 'loche-kuhli', 'otocinclus', 'corydoras-de-sterba'] },
      { role: 'Invertébré', candidats: ['crevette-amano', 'neritine'] },
    ],
  },
  {
    id: 'nano-zen', titre: 'Nano zen',
    desc: 'Pour un petit bac : un betta ou un endler, un mini-banc discret et des crevettes.',
    types: EAU_DOUCE, volumes: ['nano', 'moyen'], styles: ['crevettes', 'plantes-dense'], plantes: true,
    slots: [
      { role: 'Surface', candidats: ['combattant-betta', 'endler'] },
      { role: 'Milieu',  candidats: ['rasbora-arlequin', 'tetra-rouge-minor', 'barbus-cerise'], requis: true },
      { role: 'Fond',    candidats: ['corydoras-pygmee', 'otocinclus', 'loche-kuhli'] },
      { role: 'Invertébré', candidats: ['crevette-red-cherry', 'crevette-amano', 'neritine'] },
    ],
  },
  {
    id: 'grand-bac', titre: 'Grand bac majestueux',
    desc: 'Un scalaire en vedette, entouré de poissons paisibles trop grands pour être mangés.',
    types: EAU_DOUCE, volumes: ['moyen', 'grand', 'tres-grand'], styles: ['majestueux'], plantes: true,
    slots: [
      { role: 'Surface', candidats: ['gourami-perle', 'gourami-miel'] },
      { role: 'Milieu',  candidats: ['scalaire'], requis: true },
      { role: 'Milieu',  candidats: ['tetra-citron', 'tetra-empereur', 'tetra-rouge-du-congo'] },
      { role: 'Fond',    candidats: ['corydoras-de-sterba', 'ancistrus-plecos-commun', 'bristlenose-ancistrus-nain'] },
      { role: 'Invertébré', candidats: ['neritine'] },
    ],
  },
  {
    id: 'asie-douce', titre: 'Asie douce',
    desc: 'Danios vifs en surface, rasboras au milieu et corydoras au sol : un bac animé et robuste.',
    types: EAU_DOUCE, plantes: true,
    slots: [
      { role: 'Surface', candidats: ['danio-zebre', 'danio-leopard'] },
      { role: 'Milieu',  candidats: ['rasbora-arlequin', 'rasbora-tete-de-cuivre', 'barbus-cerise'], requis: true },
      { role: 'Fond',    candidats: ['loche-kuhli', 'corydoras-bronze'] },
      { role: 'Invertébré', candidats: ['crevette-amano', 'neritine'] },
    ],
  },
  // ─ Marin ─
  {
    id: 'recif-clown', titre: 'Récif poissons-clowns',
    desc: 'Un poisson-clown, un gramma, un gobie au sol et des coraux mous faciles.',
    types: ['marin'], volumes: ['moyen', 'grand', 'tres-grand'], styles: ['reef-poissons', 'reef-coraux-mous'],
    slots: [
      { role: 'Milieu', candidats: ['poisson-clown-ocellaris', 'poisson-clown-tomate', 'poisson-clown-skunk', 'poisson-clown-de-clark'], requis: true },
      { role: 'Milieu', candidats: ['gramma-royal', 'cardinalis-de-banggai', 'cardinal-pyjama'] },
      { role: 'Fond',   candidats: ['gobie-neon', 'blennie-bicolore', 'labre-a-six-lignes'] },
      { role: 'Invertébré', candidats: ['crevette-nettoyeuse', 'escargot-turbo', 'bernard-l-ermite-marin', 'crabe-porcelaine'] },
      { role: 'Corail', candidats: ['zoanthaire', 'corail-mou-genre-sarcophyton', 'corail-cuir-sinularia', 'corail-champignon-dur'] },
    ],
  },
  {
    id: 'nano-recif', titre: 'Nano-récif',
    desc: 'Pour un petit récif : gobies, crevettes et quelques coraux champignons ou zoanthaires.',
    types: ['marin'], volumes: ['nano'],
    slots: [
      { role: 'Milieu', candidats: ['gobie-clown', 'gobie-neon'], requis: true },
      { role: 'Fond',   candidats: ['blennie-bicolore', 'gobie-a-longs-filaments', 'gobie-neon'] },
      { role: 'Invertébré', candidats: ['crevette-sexy', 'crevette-menthe', 'escargot-trochus', 'bernard-l-ermite-a-pattes-bleues'] },
      { role: 'Corail', candidats: ['zoanthaire', 'corail-champignon-dur', 'corail-mou-genre-sarcophyton'] },
    ],
  },
  {
    id: 'recif-lps', titre: 'Récif LPS paisible',
    desc: 'Poissons calmes et coraux durs à gros polypes : un bac spectaculaire mais accessible.',
    types: ['marin'], volumes: ['moyen', 'grand', 'tres-grand'], styles: ['reef-coraux-durs'],
    slots: [
      { role: 'Milieu', candidats: ['gramma-royal', 'cardinalis-de-banggai'], requis: true },
      { role: 'Milieu', candidats: ['cardinal-pyjama', 'cardinalis-de-banggai'] },
      { role: 'Fond',   candidats: ['gobie-neon', 'labre-a-six-lignes', 'blennie-bicolore'] },
      { role: 'Invertébré', candidats: ['crevette-nettoyeuse', 'etoile-fromia', 'crabe-emeraude'] },
      { role: 'Corail', candidats: ['corail-torche', 'corail-frogspawn', 'acanthastrea', 'lobophyllia', 'blastomussa'] },
    ],
  },
  {
    id: 'recif-sps', titre: 'Récif SPS',
    desc: 'Des coraux durs à petits polypes (acropores, montiporas) avec des poissons discrets.',
    types: ['marin'], volumes: ['moyen', 'grand', 'tres-grand'], styles: ['reef-coraux-durs'],
    slots: [
      { role: 'Corail', candidats: ['montipora-digite', 'stylophora', 'pocillopora', 'acropora-millepora'], requis: true },
      { role: 'Corail', candidats: ['pocillopora', 'stylophora', 'corail-a-epingles'] },
      { role: 'Milieu', candidats: ['gramma-royal', 'labre-fee-de-scott'] },
      { role: 'Fond',   candidats: ['gobie-neon', 'blennie-bicolore'] },
      { role: 'Invertébré', candidats: ['crevette-nettoyeuse', 'crabe-emeraude'] },
    ],
  },
  // ─ Bassin ─
  {
    id: 'bassin-classique', titre: 'Bassin de jardin classique',
    desc: 'Poissons rouges en surface, ide mélanote au milieu et tanche au fond.',
    types: ['bassin'],
    slots: [
      { role: 'Surface', candidats: ['poisson-rouge-carassin-dore'], requis: true },
      { role: 'Milieu',  candidats: ['ide-melanote'] },
      { role: 'Fond',    candidats: ['tanche'] },
    ],
  },
  {
    id: 'bassin-koi', titre: 'Bassin koï',
    desc: "Des koïs en vedette, accompagnés de poissons rouges et d'une tanche.",
    types: ['bassin'], styles: ['koi'],
    slots: [
      { role: 'Milieu',  candidats: ['carpe-koi'], requis: true },
      { role: 'Surface', candidats: ['poisson-rouge-carassin-dore'] },
      { role: 'Fond',    candidats: ['tanche'] },
    ],
  },
  {
    id: 'bassin-nature', titre: 'Bassin nature',
    desc: 'Une faune locale et discrète : vairons, perche-soleil naine et tanche.',
    types: ['bassin'], styles: ['faune-locale'],
    slots: [
      { role: 'Surface', candidats: ['vairon'], requis: true },
      { role: 'Milieu',  candidats: ['perche-soleil-naine-decorative', 'ide-melanote'] },
      { role: 'Fond',    candidats: ['tanche'] },
    ],
  },
];

export function construirePresets(ctx: CtxEspeces): SetupPret[] {
  const { filtered, typeBac, volume, style } = ctx;
  const parSlug = new Map(filtered.map((e) => [e.slug, e]));
  const plantes = filtered.filter((e) => e.categorie === 'Plantes');
  const plantesGroupe = (g: GroupePlante) =>
    trier(plantes.filter((e) => groupePlante(e) === g), ctx.temps === 'faible' ? (e) => e.co2 === 'Inutile' : undefined);

  const candidats = PRESETS.filter((p) =>
    p.types.includes(typeBac) && (!p.volumes || p.volumes.includes(volume)));

  const resultats: { setup: SetupPret; score: number }[] = [];

  candidats.forEach((def, idx) => {
    const retenues: EspeceLight[] = [];
    const choisies: (EspeceLight | null)[] = def.slots.map(() => null);
    const resoudre = (i: number) => {
      for (const slug of def.slots[i].candidats) {
        const e = parSlug.get(slug);
        if (!e || retenues.some((r) => r.slug === e.slug)) continue;
        if (!compatibles(retenues, e)) continue;
        choisies[i] = e;
        retenues.push(e);
        return;
      }
    };
    def.slots.forEach((s, i) => { if (s.requis) resoudre(i); });
    if (def.slots.some((s, i) => s.requis && !choisies[i])) return;
    def.slots.forEach((s, i) => { if (!s.requis) resoudre(i); });

    const animaux = choisies.filter((e): e is EspeceLight => !!e);
    const minimum = typeBac === 'bassin' ? 2 : 3;
    if (animaux.length < minimum) return;

    const membres: MembreSetup[] = [];
    def.slots.forEach((s, i) => {
      const e = choisies[i];
      if (e) membres.push({ role: s.role, espece: { ...e, quantite: ctx.quantite(e, volume) } });
    });

    if (def.plantes && typeBac === 'douce-plante') {
      // Une plante par plan, en variant d'un setup à l'autre.
      const decalage = idx % 3;
      const ajout = (g: GroupePlante, role: string) => {
        const l = plantesGroupe(g);
        if (!l.length) return;
        const e = l[decalage % Math.min(l.length, 3)];
        membres.push({ role, espece: { ...e, quantite: ctx.quantite(e, volume) } });
      };
      ajout('arriere', 'Arrière-plan');
      ajout('milieu',  'Plan moyen');
      ajout('avant',   'Avant-plan');
    }
    if (typeBac === 'bassin') {
      const l = trier(plantes.filter((e) => e.placementPlante === 'Plante de bassin'));
      if (l.length) membres.push({ role: 'Plante', espece: { ...l[0], quantite: ctx.quantite(l[0], volume) } });
    }

    const { temp, ph } = parametresCommuns(animaux.filter((e) => e.categorie !== 'Coraux et anémones'));
    const score = (def.styles?.includes(style ?? '') ? 100 : 0) + animaux.length;
    resultats.push({
      score,
      setup: {
        id: def.id, titre: def.titre, desc: def.desc, membres, temp,
        ph: typeBac === 'douce-plante' || typeBac === 'douce-biotope' ? ph : null,
      },
    });
  });

  return resultats.sort((a, b) => b.score - a.score).slice(0, 3).map((r) => r.setup);
}
