// lib/configurateur-especes.ts
// Résultats du configurateur : espèces classées par zone du bac (surface / milieu /
// fond ; arrière-plan / plan moyen / avant-plan) et setups « prêts à l'emploi »
// dont les espèces sont compatibles entre elles (températures et pH communs).
import type { IconeNom } from './icones';
import type { EspeceLight, EspeceReco, TypeBac, VolumeBac, Niveau, TempsEntretien } from './configurateur';
import { MODELES, type ModeleSetup } from './configurateur-setups';

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
// Les setups proposés découlent des réponses de l'utilisateur : type de bac,
// volume et « ce que je veux voir dans mon bac ». Chaque modèle (voir
// configurateur-setups.ts) répond à un style précis ; on en tire jusqu'à
// 4 variantes en faisant tourner les espèces candidates de chaque emplacement.

const NB_SETUPS = 4;

export function construirePresets(ctx: CtxEspeces): SetupPret[] {
  const { filtered, typeBac, volume, style } = ctx;
  const parSlug = new Map(filtered.map((e) => [e.slug, e]));
  const plantes = filtered.filter((e) => e.categorie === 'Plantes');
  const plantesGroupe = (g: GroupePlante) =>
    trier(plantes.filter((e) => groupePlante(e) === g), ctx.temps === 'faible' ? (e) => e.co2 === 'Inutile' : undefined);
  const plantesBassin = trier(plantes.filter((e) => e.placementPlante === 'Plante de bassin'));

  const defParId = new Map<string, ModeleSetup>();

  // Variante n°k d'un modèle : chaque emplacement prend, à partir du k-ième
  // candidat, la première espèce disponible et compatible avec celles déjà retenues.
  const variante = (def: ModeleSetup, k: number): SetupPret | null => {
    const retenues: EspeceLight[] = [];
    const choisies: (EspeceLight | null)[] = def.slots.map(() => null);
    const resoudre = (i: number) => {
      const slot = def.slots[i];
      const candidats = slot.plantesBassin
        ? plantesBassin
        : slot.candidats.map((c) => parSlug.get(c)).filter((e): e is EspeceLight => !!e);
      for (let j = 0; j < candidats.length; j++) {
        const e = candidats[(k + j) % candidats.length];
        if (retenues.some((r) => r.slug === e.slug)) continue;
        if (!compatibles(retenues, e)) continue;
        choisies[i] = e;
        retenues.push(e);
        return;
      }
    };
    def.slots.forEach((s, i) => { if (s.requis) resoudre(i); });
    if (def.slots.some((s, i) => s.requis && !choisies[i])) return null;
    def.slots.forEach((s, i) => { if (!s.requis) resoudre(i); });

    const animaux = choisies.filter((e): e is EspeceLight => !!e && e.categorie !== 'Plantes');
    const minimum = typeBac === 'bassin' ? 1 : 3;
    if (animaux.length < minimum) return null;

    const membres: MembreSetup[] = [];
    def.slots.forEach((s, i) => {
      const e = choisies[i];
      if (e) membres.push({ role: s.role, espece: { ...e, quantite: ctx.quantite(e, volume) } });
    });

    const noms = def.slots
      .map((s, i) => (s.nom ? choisies[i] : null))
      .filter((e): e is EspeceLight => !!e)
      .slice(0, 2)
      .map((e) => e.nomCommun);
    const titre = noms.length ? `${def.base} : ${noms.join(' et ')}` : def.base;

    const { temp, ph } = parametresCommuns(animaux.filter((e) => e.categorie !== 'Coraux et anémones'));
    defParId.set(`${def.id}-${k}`, def);
    return {
      id: `${def.id}-${k}`, titre, desc: def.desc, membres, temp,
      ph: typeBac === 'douce-plante' || typeBac === 'douce-biotope' ? ph : null,
    };
  };

  const convient = (m: ModeleSetup) => m.types.includes(typeBac) && (!m.volumes || m.volumes.includes(volume));
  const modeles = MODELES.filter(convient);
  // Avec un style choisi : uniquement les modèles de ce style, jamais ceux d'un autre
  // (pas de « Amazonie » pour qui veut du coloré). Si rien ne convient à ce niveau
  // et à ce volume, on ne propose rien plutôt que du hors-sujet.
  // Sans style : un setup par modèle du bac.
  const retenus = style ? modeles.filter((m) => m.styles.includes(style)) : modeles;
  const nbVariantes = style ? NB_SETUPS : 1;
  const paquets = retenus.map((m) => {
    const v: SetupPret[] = [];
    for (let k = 0; k < nbVariantes; k++) {
      const s = variante(m, k);
      if (s) v.push(s);
    }
    return v;
  });

  // On alterne entre modèles pour garder de la variété, sans doublon d'espèces.
  const res: SetupPret[] = [];
  const vus = new Set<string>();
  for (let rang = 0; res.length < NB_SETUPS; rang++) {
    let ajoute = false;
    for (const paquet of paquets) {
      const s = paquet[rang];
      if (!s) continue;
      ajoute = true;
      const signature = s.membres.map((m) => m.espece.slug).sort().join('|');
      if (vus.has(signature)) continue;
      vus.add(signature);
      res.push(s);
      if (res.length >= NB_SETUPS) break;
    }
    if (!ajoute) break;
  }

  // Plantes des setups d'eau douce plantée : choisies APRÈS les animaux, parmi celles qui
  // supportent la même eau (température et pH), et décalées d'un setup à l'autre pour que
  // chaque setup ait son propre décor végétal.
  if (typeBac === 'douce-plante') {
    res.forEach((s, rang) => {
      if (!defParId.get(s.id)?.plantes) return;
      const animauxDuSetup = s.membres.map((m) => m.espece).filter((e) => e.categorie !== 'Plantes');
      const ajout = (g: GroupePlante, role: string, decalage = rang) => {
        const toutes = plantesGroupe(g);
        const compat = toutes.filter((p) => compatibles(animauxDuSetup, p));
        const liste = compat.length > 0 ? compat : toutes;
        if (!liste.length) return;
        const e = liste[decalage % liste.length];
        s.membres.push({ role, espece: { ...e, quantite: ctx.quantite(e, volume) } });
      };
      ajout('arriere', 'Arrière-plan');
      ajout('milieu',  'Plan moyen');
      ajout('avant',   'Avant-plan');
      ajout('fixee',   'Sur bois ou roche');
      if (rang % 2 === 1) ajout('flottante', 'Flottante', Math.floor(rang / 2));
    });
  }

  // Deux setups ne portent jamais exactement le même titre : on ajoute ce qui les distingue.
  const parTitre = new Map<string, SetupPret[]>();
  res.forEach((s) => parTitre.set(s.titre, [...(parTitre.get(s.titre) ?? []), s]));
  parTitre.forEach((groupe) => {
    if (groupe.length < 2) return;
    groupe.forEach((s, i) => {
      const autres = new Set(groupe.filter((x) => x !== s).flatMap((x) => x.membres.map((m) => m.espece.slug)));
      const propre = [...s.membres].reverse().find((m) => !autres.has(m.espece.slug));
      s.titre = propre ? `${s.titre} · ${propre.espece.nomCommun}` : `${s.titre} (${i + 1})`;
    });
  });
  return res;
}


// ─── Cohérence setups / listes d'espèces compatibles ──────────────────────────
// Toute espèce d'un setup prêt à l'emploi doit aussi figurer dans les listes
// « poissons », « plantes », etc. : on ajoute celles qui manquent à leur zone.

type Emplacement = { section: string; titre: string; icone: IconeNom; groupe: string; label: string; astuce?: string };

const GROUPES_PLANTES: Record<string, { label: string; astuce: string }> = {
  arriere:   { label: 'Arrière-plan', astuce: 'Grandes plantes qui habillent le fond et cachent la vitre arrière.' },
  milieu:    { label: 'Plan moyen',   astuce: 'Plantes touffues qui structurent le décor.' },
  avant:     { label: 'Avant-plan',   astuce: 'Plantes basses et gazons, à planter près de la vitre.' },
  fixee:     { label: 'À fixer sur bois ou roche', astuce: 'Ne se plantent pas dans le sol : on les attache au décor.' },
  flottante: { label: 'Flottantes',   astuce: 'Ombragent le bac et absorbent les nitrates.' },
};
const GROUPES_POISSONS: Record<Zone, { label: string; astuce: string }> = {
  surface: { label: 'En surface', astuce: 'Nagent dans la partie haute du bac.' },
  milieu:  { label: 'Au milieu',  astuce: 'Occupent le centre du bac, souvent en banc.' },
  fond:    { label: 'Au fond',    astuce: 'Fouillent le sol et nettoient les restes.' },
};
const ORDRE_GROUPES: Record<string, string[]> = {
  plantes:  ['arriere', 'milieu', 'avant', 'fixee', 'flottante', 'bassin', 'berge'],
  poissons: ['surface', 'milieu', 'fond'],
  inverts:  ['crevettes', 'escargots', 'inverts'],
};

function emplacementDe(e: EspeceLight, typeBac: TypeBac): Emplacement {
  if (e.categorie === 'Plantes') {
    if (typeBac === 'bassin') {
      const berge = e.placementPlante === 'Plante de berge';
      return { section: 'plantes', titre: 'Plantes aquatiques', icone: 'plante', groupe: berge ? 'berge' : 'bassin',
        label: berge ? 'En bordure' : "Dans l'eau",
        astuce: berge ? "Plantes de berge, pieds dans l'eau." : 'Nénuphars et plantes à feuilles flottantes.' };
    }
    const g = groupePlante(e) ?? 'milieu';
    return { section: 'plantes', titre: 'Plantes', icone: 'plante', groupe: g, ...GROUPES_PLANTES[g] };
  }
  switch (e.categorie) {
    case 'Crustacés / Invertébrés eau douce':
      return { section: 'inverts', titre: 'Invertébrés', icone: 'coquillage', groupe: 'crevettes', label: 'Crevettes',
        astuce: 'Nettoyeuses discrètes : attention aux gros poissons qui les mangent.' };
    case 'Mollusques eau douce':
      return { section: 'inverts', titre: 'Invertébrés', icone: 'coquillage', groupe: 'escargots', label: 'Escargots',
        astuce: 'Mangent algues et restes de nourriture.' };
    case 'Invertébrés marins':
      return { section: 'inverts', titre: 'Invertébrés', icone: 'coquillage', groupe: 'inverts', label: 'Nettoyeurs et invertébrés',
        astuce: 'Gardent le bac propre et équilibré.' };
    case 'Coraux et anémones':
      return { section: 'coraux', titre: 'Coraux', icone: 'corail', groupe: 'coraux', label: 'Coraux et anémones',
        astuce: 'Commencez par les plus faciles (mous, zoanthaires).' };
    case 'Macroalgues marines':
      return { section: 'algues', titre: 'Macroalgues', icone: 'pousse', groupe: 'algues', label: 'Macroalgues',
        astuce: 'Exportent nitrates et phosphates en refuge.' };
  }
  const z = zoneDe(e, typeBac);
  return { section: 'poissons', titre: 'Poissons', icone: 'poisson', groupe: z, ...GROUPES_POISSONS[z] };
}

export function integrerPresets(sections: SectionEspeces[], presets: SetupPret[], typeBac: TypeBac): SectionEspeces[] {
  const present = new Set(sections.flatMap((s) => s.groupes.flatMap((g) => g.especes.map((e) => e.slug))));
  for (const p of presets) {
    for (const m of p.membres) {
      if (present.has(m.espece.slug)) continue;
      const emp = emplacementDe(m.espece, typeBac);
      let section = sections.find((s) => s.id === emp.section);
      if (!section) {
        section = { id: emp.section, titre: emp.titre, icone: emp.icone, groupes: [] };
        sections.push(section);
      }
      let groupe = section.groupes.find((g) => g.id === emp.groupe);
      if (!groupe) {
        groupe = { id: emp.groupe, label: emp.label, astuce: emp.astuce, especes: [] };
        section.groupes.push(groupe);
        const ordre = ORDRE_GROUPES[section.id];
        if (ordre) section.groupes.sort((a, b) => ordre.indexOf(a.id) - ordre.indexOf(b.id));
      }
      groupe.especes.push(m.espece);
      present.add(m.espece.slug);
    }
  }
  const ordre = ['plantes', 'poissons', 'coraux', 'inverts', 'algues'];
  return sections.sort((a, b) => ordre.indexOf(a.id) - ordre.indexOf(b.id));
}
