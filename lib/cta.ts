// Bouton d'action contextuel pour les questions de FAQ et les guides :
// - sujets « que choisir / combien / quel matériel » → le simulateur ;
// - sujets reproduction, bouturage, mâle/femelle, durée de vie, espèce précise → les fiches espèces.
export type Cta = { href: string; label: string };

const normaliser = (t: string) =>
  t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’]/g, "'");

const ESPECES_MOTS = [
  'reproduc', 'se reproduisent', 'alevin', 'bebes', 'male d', 'femelle', 'boutur',
  'combien de temps vit', 'duree de vie', 'betta', 'koi', 'guppy',
];

const SIMULATEUR_MOTS = [
  'quel aquarium', 'quelle taille', 'quel volume', 'volume d\'aquarium', 'combien de litres',
  'quel poisson', 'quels poissons', 'poissons choisir', 'quelle crevette', 'quels coraux', 'quel corail',
  'combien de poissons', 'vivre ensemble', 'communautaire', 'combien coute', 'budget',
  'quel materiel', 'materiel faut-il', 'quel filtre', 'lequel choisir', 'que choisir', 'quel choix',
  'choisir son', 'bien choisir', 'puissance de chauffage', 'quel eclairage', 'quel sol', 'quel substrat',
  'pour debuter', 'pour commencer', 'par ou commencer', 'comment choisir', 'faut-il un chauffage',
  'comment installer', 'installer un aquarium', 'demarrer un aquarium', 'premier aquarium',
];

export function ctaPour(texte: string, exclure?: 'simulateur' | 'especes'): Cta | null {
  const t = normaliser(texte);
  if (exclure !== 'especes' && ESPECES_MOTS.some((m) => t.includes(m))) {
    return { href: '/especes', label: 'Voir les fiches espèces' };
  }
  if (exclure !== 'simulateur' && SIMULATEUR_MOTS.some((m) => t.includes(m))) {
    return { href: '/simulateur', label: 'Essayer le simulateur' };
  }
  return null;
}
