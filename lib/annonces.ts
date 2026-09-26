import { supabase } from './supabase';

export type Annonce = {
  id: number;
  created_at: string;
  titre: string;
  description: string | null;
  prix: number | null;
  ville: string | null;
  code_postal: string | null;
  categorie: string;
  biotope: string;
  photos: string[];
  is_don: boolean;
  is_echange: boolean;
  echange_souhaite: string | null;
  volume: string | null;
  etat: string | null;
  nom_scientifique: string | null;
  nom_commun: string | null;
  quantite: number | null;
  prix_par_unite: boolean | null;
  envoi_possible: boolean | null;
  vues: number | null;
  nb_favoris: number | null;
  vendu_at: string | null;
};

// Colonnes utiles pour l'affichage public — on évite `select=*` pour ne pas
// exposer par erreur une colonne interne ajoutée plus tard côté app sans
// review ici (déclarations CITES, journal de modération, etc.).
const COLONNES_PUBLIQUES =
  'id, created_at, titre, description, prix, ville, code_postal, categorie, biotope, photos, is_don, is_echange, echange_souhaite, volume, etat, nom_scientifique, nom_commun, quantite, prix_par_unite, envoi_possible, vues, nb_favoris, vendu_at';

// Toute annonce affichée sur le site public doit être active et validée —
// exactement le même filtre que la RLS anonyme autorise déjà côté Supabase
// (annonce vendue, en attente, refusée ou désactivée => jamais indexée).
export async function fetchAnnoncesActives(limit = 5000): Promise<Annonce[]> {
  const { data, error } = await supabase
    .from('annonces')
    .select(COLONNES_PUBLIQUES)
    .eq('statut', 'active')
    .eq('validee', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as unknown as Annonce[];
}

// Version allégée réservée au sitemap : seules les colonnes nécessaires à
// construire l'URL et la date sont demandées (pas les photos/description),
// pour que la requête reste rapide même avec des centaines d'annonces et
// évite les échecs intermittents observés avec la requête complète.
export async function fetchAnnoncesPourSitemap(
  limit = 5000
): Promise<Pick<Annonce, 'id' | 'titre' | 'ville' | 'created_at'>[]> {
  const { data, error } = await supabase
    .from('annonces')
    .select('id, titre, ville, created_at')
    .eq('statut', 'active')
    .eq('validee', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as unknown as Pick<Annonce, 'id' | 'titre' | 'ville' | 'created_at'>[];
}

// --- Catégories ----------------------------------------------------------
// Mêmes 6 catégories que dans l'app (voir CATEGORIES dans ajouter.tsx),
// avec un slug d'URL propre pour chacune. Le libellé exact stocké en base
// (accents compris) reste la clé de gauche : c'est la valeur de la colonne
// `categorie`, utilisée telle quelle dans les filtres Supabase.
export const CATEGORIE_VERS_SLUG: Record<string, string> = {
  Vivant: 'vivant',
  Matériel: 'materiel',
  Cuves: 'cuves',
  Plantes: 'plantes',
  Éclairage: 'eclairage',
  Décor: 'decor',
};

export const SLUG_VERS_CATEGORIE: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORIE_VERS_SLUG).map(([categorie, slug]) => [slug, categorie])
);

// Pagination sur une catégorie : `count: 'exact'` en plus de `range` pour
// pouvoir afficher le nombre total et calculer le nombre de pages côté
// appelant, sans requête séparée.
export async function fetchAnnoncesParCategorie(
  categorie: string,
  { limit = 24, offset = 0 }: { limit?: number; offset?: number } = {}
): Promise<{ annonces: Annonce[]; total: number }> {
  const { data, error, count } = await supabase
    .from('annonces')
    .select(COLONNES_PUBLIQUES, { count: 'exact' })
    .eq('statut', 'active')
    .eq('validee', true)
    .eq('categorie', categorie)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { annonces: (data ?? []) as unknown as Annonce[], total: count ?? 0 };
}

// --- Biotopes --------------------------------------------------------------
// Les 3 biotopes de l'app (voir ajouter.tsx) : Eau Douce, Eau de Mer, Bassin.
// Même logique que CATEGORIE_VERS_SLUG ci-dessus, mais sur la colonne
// `biotope` plutôt que `categorie`.
export const BIOTOPE_VERS_SLUG: Record<string, string> = {
  'Eau Douce': 'eau-douce',
  'Eau de Mer': 'eau-de-mer',
  Bassin: 'bassin',
};

export const SLUG_VERS_BIOTOPE: Record<string, string> = Object.fromEntries(
  Object.entries(BIOTOPE_VERS_SLUG).map(([biotope, slug]) => [slug, biotope])
);

export async function fetchAnnoncesParBiotope(
  biotope: string,
  { limit = 24, offset = 0 }: { limit?: number; offset?: number } = {}
): Promise<{ annonces: Annonce[]; total: number }> {
  const { data, error, count } = await supabase
    .from('annonces')
    .select(COLONNES_PUBLIQUES, { count: 'exact' })
    .eq('statut', 'active')
    .eq('validee', true)
    .eq('biotope', biotope)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { annonces: (data ?? []) as unknown as Annonce[], total: count ?? 0 };
}

export async function fetchAnnonceParId(id: number): Promise<Annonce | null> {
  const { data, error } = await supabase
    .from('annonces')
    .select(COLONNES_PUBLIQUES)
    .eq('id', id)
    .eq('statut', 'active')
    .eq('validee', true)
    .maybeSingle();

  if (error) throw error;
  return (data as unknown as Annonce) ?? null;
}

// --- Slugs -------------------------------------------------------------
// Format : titre-et-ville-lisibles-ID (ex: neocaridina-blue-velvet-thionville-92)
// L'ID en fin de slug est la seule partie qui compte pour la recherche en
// base — le texte devant sert uniquement au référencement et à la lecture
// humaine de l'URL. Si le titre change après publication, l'ancien lien
// reste fonctionnel (on ignore juste le texte, seul l'ID est utilisé), voir
// generateStaticParams/page.tsx qui redirige vers le slug à jour le cas
// échéant.
export function slugify(texte: string): string {
  return texte
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function buildSlug(annonce: Pick<Annonce, 'id' | 'titre' | 'ville'>): string {
  const base = slugify(`${annonce.titre} ${annonce.ville ?? ''}`) || 'annonce';
  return `${base}-${annonce.id}`;
}

export function parseIdFromSlug(slug: string): number | null {
  const m = slug.match(/(\d+)$/);
  if (!m) return null;
  const id = Number(m[1]);
  return Number.isFinite(id) ? id : null;
}

// --- Textes SEO ----------------------------------------------------------
export function nomAffiche(annonce: Annonce): string {
  return (annonce.nom_commun || annonce.nom_scientifique || annonce.titre).trim();
}

export function typeTransactionLabel(annonce: Annonce): string {
  if (annonce.is_don && annonce.is_echange) return 'à donner ou à échanger';
  if (annonce.is_don) return 'à donner';
  if (annonce.is_echange) return 'à échanger';
  return 'à vendre';
}

// Le suffixe "| Aquatopia" est déjà ajouté par le template de
// app/layout.tsx (title.template) — ne pas le répéter ici.
export function metaTitle(annonce: Annonce): string {
  const nom = nomAffiche(annonce);
  const ville = annonce.ville?.trim();
  const type = typeTransactionLabel(annonce);
  const lieu = ville ? ` à ${ville}` : '';
  if (!annonce.is_don && !annonce.is_echange && annonce.prix) {
    return `${nom} ${type}${lieu} — ${annonce.prix} €`;
  }
  return `${nom} ${type}${lieu}`;
}

export function metaDescription(annonce: Annonce): string {
  const brut = (annonce.description ?? '').trim().replace(/\s+/g, ' ');
  if (brut.length >= 40) {
    return brut.length > 155 ? `${brut.slice(0, 152)}…` : brut;
  }
  const nom = nomAffiche(annonce);
  const ville = annonce.ville?.trim();
  const type = typeTransactionLabel(annonce);
  const lieu = ville ? ` à ${ville}` : ' en France';
  return `${nom} ${type}${lieu} sur Aquatopia, la marketplace aquariophile locale. Annonces vérifiées, remise en main propre.`;
}
