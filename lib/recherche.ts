// Recherche du site (champ de l'accueil) : types et logique pures, utilisables côté client.
// L'index lui-même est construit côté serveur (lib/recherche-index.ts) et servi par /api/recherche.

export type TypeResultat = 'guide' | 'espece' | 'terme' | 'faq' | 'page';

export type ElementIndex = {
  t: TypeResultat;
  titre: string;
  sous?: string;
  href: string;
  k: string; // texte normalisé du titre (et noms alternatifs)
  d: string; // texte normalisé secondaire (description, sections, définition…)
};

export const normaliser = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, ' ');

const MOTS_VIDES = new Set(['le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'l', 'd', 'mon', 'ma', 'mes', 'au', 'aux', 'en', 'et', 'ou', 'a', 'sur', 'pour', 'comment', 'quel', 'quelle']);

// Quelques équivalences de vocabulaire (mots déjà normalisés et sans pluriel).
const SYNONYMES: Record<string, string[]> = {
  ph: ['acidite', 'alcalinite', 'kh'],
  acide: ['ph', 'acidite'],
  nitrite: ['cyclage', 'azote'],
  nitrate: ['cyclage', 'azote'],
  ammoniac: ['cyclage', 'azote'],
  cycle: ['cyclage'],
  filtre: ['filtration'],
  lumiere: ['eclairage', 'led'],
  eclairage: ['lumiere', 'led'],
  chauffage: ['temperature'],
  temperature: ['chauffage'],
  debutant: ['demarrer'],
  poster: ['annonce', 'deposer'],
  depot: ['annonce', 'deposer'],
  vendre: ['annonce', 'vente'],
  trouble: ['turbide'],
  turbide: ['trouble'],
  verte: ['algue'],
  vert: ['algue'],
  maladie: ['sante', 'traitement'],
};

// Retire un « s » ou « x » final (pluriel) pour que « poissons » trouve « poisson ».
const singulier = (m: string) => (m.length > 3 && /[sx]$/.test(m) ? m.slice(0, -1) : m);

const mots = (t: string) => normaliser(t).split(/[^a-z0-9]+/).filter(Boolean);

export function jetons(requete: string): string[][] {
  const tous = mots(requete).map(singulier);
  const utiles = tous.filter((m) => !MOTS_VIDES.has(m));
  const base = utiles.length ? utiles : tous;
  return base.map((m) => [m, ...(SYNONYMES[m] ?? [])]);
}

function pointsPour(variantes: string[], cle: string, motsCle: string[], poidsMot: number, poidsPartie: number): number {
  let meilleur = 0;
  variantes.forEach((v, rang) => {
    // Un synonyme (rang > 0) compte moins que le mot tapé par le visiteur.
    const f = rang === 0 ? 1 : 0.7;
    // Un jeton très court (« ph ») ne vaut que comme mot entier : sinon « phosphate » le captait.
    const court = v.length <= 2;
    if (motsCle.some((w) => (court ? w === v : w.startsWith(v)))) meilleur = Math.max(meilleur, poidsMot * f);
    else if (!court && v.length >= 3 && cle.includes(v)) meilleur = Math.max(meilleur, poidsPartie * f);
  });
  return meilleur;
}

export type Prepare = ElementIndex & { mk: string[]; md: string[] };

export const preparer = (items: ElementIndex[]): Prepare[] =>
  items.map((i) => ({ ...i, mk: i.k.split(/[^a-z0-9]+/).filter(Boolean), md: i.d.split(/[^a-z0-9]+/).filter(Boolean) }));

const POIDS_TYPE: Record<TypeResultat, number> = { page: 1.2, guide: 1, terme: 1, espece: 0.9, faq: 0.7 };

export function chercher(index: Prepare[], requete: string): { item: Prepare; score: number }[] {
  const jt = jetons(requete);
  if (!jt.length) return [];
  const brut = normaliser(requete).trim();
  const out: { item: Prepare; score: number }[] = [];
  for (const item of index) {
    let total = 0;
    let ok = true;
    for (const variantes of jt) {
      const p = Math.max(
        pointsPour(variantes, item.k, item.mk, 4, 2.5),
        pointsPour(variantes, item.d, item.md, 1.2, 0.6),
      );
      if (p === 0) { ok = false; break; }
      total += p;
    }
    if (!ok) continue;
    if (item.k === brut) total += 6;
    else if (item.k.startsWith(brut)) total += 3;
    out.push({ item, score: total * POIDS_TYPE[item.t] });
  }
  return out.sort((a, b) => b.score - a.score);
}

export const LIBELLE_GROUPE: Record<TypeResultat, string> = {
  guide: 'Guides',
  espece: 'Espèces',
  terme: 'Définitions',
  faq: 'Questions fréquentes',
  page: 'Pages du site',
};
export const MAX_PAR_GROUPE: Record<TypeResultat, number> = { guide: 4, espece: 4, terme: 3, faq: 2, page: 3 };
