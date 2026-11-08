// Pages « marketplace » générées à partir des vraies annonces en ligne :
// - aquariums d'occasion par volume (/aquarium-occasion/volume/100-litres…)
// - espèces à donner (/dons/guppy…)
// Comme les pages ville et département (lib/lieux.ts), une page n'existe que si
// elle compte au moins MIN_ANNONCES annonces : jamais de page vide ou quasi vide.
// Search Console montre que ces recherches d'achat (« aquarium 100 litres
// occasion », « guppy à donner »…) sont celles où le site convertit le mieux.
import { supabase } from './supabase';
import { slugify } from './annonces';
import { departementDepuisCodePostal, type AnnonceLocale } from './lieux';
import { ESPECES_PUBLIEES } from './especes';

export const MIN_ANNONCES = 3;

export type AnnonceMarche = AnnonceLocale & {
  volume: string | null;
  nom_commun: string | null;
  nom_scientifique: string | null;
};

export async function chargerAnnoncesMarche(): Promise<AnnonceMarche[]> {
  const { data, error } = await supabase
    .from('annonces')
    .select('id, titre, ville, code_postal, photos, prix, is_don, is_echange, created_at, categorie, biotope, volume, nom_commun, nom_scientifique')
    .eq('statut', 'active')
    .eq('validee', true)
    .order('created_at', { ascending: false })
    .limit(5000);
  if (error) throw error;
  const res: AnnonceMarche[] = [];
  for (const a of (data ?? []) as any[]) {
    const dep = departementDepuisCodePostal(a.code_postal);
    const ville = (a.ville ?? '').trim();
    const base = slugify(ville);
    if (!dep || !base) continue;
    res.push({
      id: a.id, titre: a.titre, ville, photos: a.photos ?? [], prix: a.prix,
      is_don: !!a.is_don, is_echange: !!a.is_echange, created_at: a.created_at,
      categorie: a.categorie, biotope: a.biotope, dep, villeSlug: `${base}-${dep.toLowerCase()}`,
      volume: a.volume ?? null, nom_commun: a.nom_commun ?? null, nom_scientifique: a.nom_scientifique ?? null,
    });
  }
  return res;
}

// ─── Aquariums d'occasion par volume ─────────────────────────────────────────

export type TrancheVolume = { slug: string; libelle: string; min: number; max: number };

export const TRANCHES_VOLUME: TrancheVolume[] = [
  { slug: '60-litres', libelle: '60 litres', min: 40, max: 80 },
  { slug: '100-litres', libelle: '100 litres', min: 81, max: 150 },
  { slug: '200-litres', libelle: '200 litres', min: 151, max: 250 },
  { slug: '300-litres', libelle: '300 litres', min: 251, max: 350 },
  { slug: '400-litres', libelle: '400 litres', min: 351, max: 500 },
  { slug: '600-litres', libelle: '600 litres et plus', min: 501, max: 5000 },
];

// Volume en litres lu dans le champ `volume`, sinon dans le titre (« Aquarium 120L », « 200 litres »).
export function volumeLitres(a: { volume: string | null; titre: string }): number | null {
  const lire = (t: string | null) => {
    if (!t) return null;
    const m = t.replace(/\s+/g, ' ').match(/(\d{2,4})(?:[.,]\d+)?\s?(?:l\b|L\b|litres?\b|liters?\b)/i);
    return m ? Number(m[1]) : null;
  };
  const brut = a.volume && /^\s*\d{2,4}\s*$/.test(a.volume) ? Number(a.volume) : lire(a.volume);
  const v = brut ?? lire(a.titre);
  return v && v >= 10 && v <= 5000 ? v : null;
}

export type PageVolume = TrancheVolume & { annonces: AnnonceMarche[] };

export function grouperVolumes(liste: AnnonceMarche[], min = MIN_ANNONCES): PageVolume[] {
  const cuves = liste.filter((a) => a.categorie === 'Cuves');
  return TRANCHES_VOLUME.map((t) => ({
    ...t,
    annonces: cuves.filter((a) => {
      const v = volumeLitres(a);
      return v !== null && v >= t.min && v <= t.max;
    }),
  })).filter((p) => p.annonces.length >= min);
}

// ─── Espèces à donner ────────────────────────────────────────────────────────

const normaliser = (t: string) =>
  ` ${t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()} `;

// Termes de recherche par espèce (nom commun, autres noms, nom scientifique), au pluriel
// simple compris. Seules les espèces librement détenables sont retenues.
const TERMES: { slug: string; terme: string }[] = ESPECES_PUBLIEES.filter((e) => e.statutLegal === 'autorise').flatMap((e) =>
  [e.nomCommun, e.nomScientifique, ...(e.autresNoms ?? [])]
    .map((n) => normaliser(n.replace(/\(.*?\)/g, '')).trim())
    .filter((n) => n.length >= 4)
    .map((terme) => ({ slug: e.slug, terme }))
);

// Espèce d'une annonce : le terme le plus long trouvé dans le nom commun, le nom
// scientifique ou le titre (« guppy endler » l'emporte sur « guppy »).
export function especeAnnonce(a: AnnonceMarche): string | null {
  const texte = normaliser(`${a.nom_commun ?? ''} ${a.nom_scientifique ?? ''} ${a.titre}`);
  let meilleur: { slug: string; terme: string } | null = null;
  for (const t of TERMES) {
    if (texte.includes(` ${t.terme} `) || texte.includes(` ${t.terme}s `)) {
      if (!meilleur || t.terme.length > meilleur.terme.length) meilleur = t;
    }
  }
  return meilleur?.slug ?? null;
}

export type PageDonEspece = { slug: string; nom: string; categorie: string; annonces: AnnonceMarche[] };

export function grouperDonsParEspece(liste: AnnonceMarche[], min = MIN_ANNONCES): PageDonEspece[] {
  const m = new Map<string, AnnonceMarche[]>();
  for (const a of liste) {
    if (!a.is_don) continue;
    const s = especeAnnonce(a);
    if (s) m.set(s, [...(m.get(s) ?? []), a]);
  }
  const parSlug = new Map(ESPECES_PUBLIEES.map((e) => [e.slug, e]));
  return [...m.entries()]
    .filter(([, l]) => l.length >= min)
    .map(([slug, annonces]) => ({ slug, nom: parSlug.get(slug)!.nomCommun, categorie: parSlug.get(slug)!.categorie, annonces }))
    .sort((a, b) => b.annonces.length - a.annonces.length || a.nom.localeCompare(b.nom, 'fr'));
}

// Prix observés (annonces en vente uniquement), pour donner un repère chiffré tiré des vraies annonces.
export function fourchettePrix(annonces: AnnonceMarche[]): { min: number; max: number; median: number } | null {
  const p = annonces
    .filter((a) => !a.is_don && !a.is_echange && typeof a.prix === 'number' && a.prix > 0)
    .map((a) => a.prix as number)
    .sort((x, y) => x - y);
  if (p.length < MIN_ANNONCES) return null;
  const median = p.length % 2 ? p[(p.length - 1) / 2] : Math.round((p[p.length / 2 - 1] + p[p.length / 2]) / 2);
  return { min: p[0], max: p[p.length - 1], median };
}
