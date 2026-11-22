// Mise en forme des montants à la française : « 1 234,50 € », « 25 € ».
// Séparateur de milliers et espace avant « € » : espace insécable (U+00A0), pour que
// le nombre ne soit jamais coupé en fin de ligne. Pas de « ,00 » pour les montants entiers.
// À ne PAS utiliser dans les données structurées (Offer.price) : là, garder le nombre brut.

const ESPACE_INSECABLE = ' ';

/** « 1234.5 » -> « 1 234,50 » (sans symbole). */
export function formatNombre(n: number): string {
  const entier = Number.isInteger(n);
  return n
    .toLocaleString('fr-FR', {
      minimumFractionDigits: entier ? 0 : 2,
      maximumFractionDigits: entier ? 0 : 2,
    })
    // Intl utilise selon les moteurs une espace fine insécable (U+202F) ou normale.
    .replace(/[\s ]/g, ESPACE_INSECABLE);
}

/** « 1234.5 » -> « 1 234,50 € » ; chaîne vide si le prix est absent ou invalide. */
export function formatPrix(prix: number | string | null | undefined): string {
  const n = typeof prix === 'string' ? Number(prix) : prix;
  if (typeof n !== 'number' || !Number.isFinite(n)) return '';
  return `${formatNombre(n)}${ESPACE_INSECABLE}€`;
}
