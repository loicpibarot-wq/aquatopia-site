// Pages locales (ville et département), générées à partir des vraies annonces
// en ligne. Une page n'existe que si le lieu compte assez d'annonces : pas de
// page vide ou quasi vide (mauvais pour les visiteurs comme pour Google).
import { supabase } from './supabase';
import { slugify } from './annonces';

export const MIN_ANNONCES_LIEU = 3;

export const DEPARTEMENTS: Record<string, string> = {
  '01': 'Ain', '02': 'Aisne', '03': 'Allier', '04': 'Alpes-de-Haute-Provence', '05': 'Hautes-Alpes',
  '06': 'Alpes-Maritimes', '07': 'Ardèche', '08': 'Ardennes', '09': 'Ariège', '10': 'Aube',
  '11': 'Aude', '12': 'Aveyron', '13': 'Bouches-du-Rhône', '14': 'Calvados', '15': 'Cantal',
  '16': 'Charente', '17': 'Charente-Maritime', '18': 'Cher', '19': 'Corrèze', '2A': 'Corse-du-Sud',
  '2B': 'Haute-Corse', '21': "Côte-d'Or", '22': "Côtes-d'Armor", '23': 'Creuse', '24': 'Dordogne',
  '25': 'Doubs', '26': 'Drôme', '27': 'Eure', '28': 'Eure-et-Loir', '29': 'Finistère',
  '30': 'Gard', '31': 'Haute-Garonne', '32': 'Gers', '33': 'Gironde', '34': 'Hérault',
  '35': 'Ille-et-Vilaine', '36': 'Indre', '37': 'Indre-et-Loire', '38': 'Isère', '39': 'Jura',
  '40': 'Landes', '41': 'Loir-et-Cher', '42': 'Loire', '43': 'Haute-Loire', '44': 'Loire-Atlantique',
  '45': 'Loiret', '46': 'Lot', '47': 'Lot-et-Garonne', '48': 'Lozère', '49': 'Maine-et-Loire',
  '50': 'Manche', '51': 'Marne', '52': 'Haute-Marne', '53': 'Mayenne', '54': 'Meurthe-et-Moselle',
  '55': 'Meuse', '56': 'Morbihan', '57': 'Moselle', '58': 'Nièvre', '59': 'Nord',
  '60': 'Oise', '61': 'Orne', '62': 'Pas-de-Calais', '63': 'Puy-de-Dôme', '64': 'Pyrénées-Atlantiques',
  '65': 'Hautes-Pyrénées', '66': 'Pyrénées-Orientales', '67': 'Bas-Rhin', '68': 'Haut-Rhin', '69': 'Rhône',
  '70': 'Haute-Saône', '71': 'Saône-et-Loire', '72': 'Sarthe', '73': 'Savoie', '74': 'Haute-Savoie',
  '75': 'Paris', '76': 'Seine-Maritime', '77': 'Seine-et-Marne', '78': 'Yvelines', '79': 'Deux-Sèvres',
  '80': 'Somme', '81': 'Tarn', '82': 'Tarn-et-Garonne', '83': 'Var', '84': 'Vaucluse',
  '85': 'Vendée', '86': 'Vienne', '87': 'Haute-Vienne', '88': 'Vosges', '89': 'Yonne',
  '90': 'Territoire de Belfort', '91': 'Essonne', '92': 'Hauts-de-Seine', '93': 'Seine-Saint-Denis',
  '94': 'Val-de-Marne', '95': "Val-d'Oise",
  '971': 'Guadeloupe', '972': 'Martinique', '973': 'Guyane', '974': 'La Réunion', '976': 'Mayotte',
};

// Code département à partir d'un code postal (null si introuvable).
export function departementDepuisCodePostal(cp: string | null): string | null {
  if (!cp) return null;
  const c = cp.trim();
  if (!/^\d{5}$/.test(c)) return null;
  let dep: string;
  if (c.startsWith('97')) dep = c.slice(0, 3);
  else if (c.startsWith('20')) dep = Number(c) < 20200 ? '2A' : '2B';
  else dep = c.slice(0, 2);
  return DEPARTEMENTS[dep] ? dep : null;
}

export const slugDepartement = (dep: string) => `${slugify(DEPARTEMENTS[dep])}-${dep.toLowerCase()}`;

export function departementDepuisSlug(slug: string): string | null {
  const m = slug.match(/-([0-9][0-9a-z]?[0-9]?|2a|2b)$/i);
  if (!m) return null;
  const dep = m[1].toUpperCase();
  if (!DEPARTEMENTS[dep]) return null;
  return slugDepartement(dep) === slug ? dep : null;
}

// « MONTPELLIER » ou « montpellier » → « Montpellier » ; « saint-etienne » → « Saint-Etienne ».
function belleCasse(brut: string): string {
  const t = brut.trim().replace(/\s+/g, ' ');
  if (t !== t.toUpperCase() && t !== t.toLowerCase()) return t;
  return t
    .toLowerCase()
    .replace(/(^|[\s'’-])([a-zà-ÿ])/g, (_, sep: string, l: string) => sep + l.toUpperCase());
}

export type AnnonceLocale = {
  id: number;
  titre: string;
  ville: string;
  photos: string[];
  prix: number | null;
  is_don: boolean;
  is_echange: boolean;
  created_at: string;
  categorie: string;
  biotope: string;
  dep: string;
  villeSlug: string;
};

export type Lieu = {
  slug: string;
  nom: string;
  dep: string;
  annonces: AnnonceLocale[];
};

export async function chargerAnnoncesLocales(): Promise<AnnonceLocale[]> {
  const { data, error } = await supabase
    .from('annonces')
    .select('id, titre, ville, code_postal, photos, prix, is_don, is_echange, created_at, categorie, biotope')
    .eq('statut', 'active')
    .eq('validee', true)
    .order('created_at', { ascending: false })
    .limit(5000);
  if (error) throw error;
  const res: AnnonceLocale[] = [];
  for (const a of (data ?? []) as any[]) {
    const dep = departementDepuisCodePostal(a.code_postal);
    const ville = (a.ville ?? '').trim();
    const base = slugify(ville);
    if (!dep || !base) continue;
    res.push({
      id: a.id, titre: a.titre, ville, photos: a.photos ?? [], prix: a.prix,
      is_don: !!a.is_don, is_echange: !!a.is_echange, created_at: a.created_at,
      categorie: a.categorie, biotope: a.biotope, dep, villeSlug: `${base}-${dep.toLowerCase()}`,
    });
  }
  return res;
}

export function grouperVilles(liste: AnnonceLocale[], min = MIN_ANNONCES_LIEU): Lieu[] {
  const m = new Map<string, { variantes: Map<string, number>; dep: string; annonces: AnnonceLocale[] }>();
  for (const a of liste) {
    const g = m.get(a.villeSlug) ?? { variantes: new Map<string, number>(), dep: a.dep, annonces: [] as AnnonceLocale[] };
    g.variantes.set(a.ville, (g.variantes.get(a.ville) ?? 0) + 1);
    g.annonces.push(a);
    m.set(a.villeSlug, g);
  }
  return [...m.entries()]
    .filter(([, g]) => g.annonces.length >= min)
    .map(([slug, g]) => {
      const brut = [...g.variantes.entries()].sort((x, y) => y[1] - x[1])[0][0];
      return { slug, nom: belleCasse(brut), dep: g.dep, annonces: g.annonces };
    })
    .sort((a, b) => b.annonces.length - a.annonces.length || a.nom.localeCompare(b.nom, 'fr'));
}

export function grouperDepartements(liste: AnnonceLocale[], min = MIN_ANNONCES_LIEU): Lieu[] {
  const m = new Map<string, AnnonceLocale[]>();
  for (const a of liste) m.set(a.dep, [...(m.get(a.dep) ?? []), a]);
  return [...m.entries()]
    .filter(([, l]) => l.length >= min)
    .map(([dep, annonces]) => ({ slug: slugDepartement(dep), nom: DEPARTEMENTS[dep], dep, annonces }))
    .sort((a, b) => b.annonces.length - a.annonces.length || a.nom.localeCompare(b.nom, 'fr'));
}

const LIBELLE_CATEGORIE: Record<string, string> = {
  Vivant: 'poissons, crevettes et coraux',
  Cuves: 'aquariums',
  Matériel: 'matériel',
  Plantes: 'plantes',
  Éclairage: 'éclairage',
  Décor: 'décors',
};

// « aquariums (4), matériel (3), plantes (2) » — uniquement à partir des vraies annonces.
export function resumeCategories(annonces: AnnonceLocale[]): string {
  const c = new Map<string, number>();
  for (const a of annonces) c.set(a.categorie, (c.get(a.categorie) ?? 0) + 1);
  return [...c.entries()]
    .sort((x, y) => y[1] - x[1])
    .map(([cat, n]) => `${LIBELLE_CATEGORIE[cat] ?? cat.toLowerCase()} (${n})`)
    .join(', ');
}
