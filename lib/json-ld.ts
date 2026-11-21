// Sérialise des données structurées (JSON-LD) pour une balise <script>.
// Échappe « < » pour qu'un texte saisi par un membre (titre, description
// d'annonce…) ne puisse jamais fermer la balise et injecter du code.
export function jsonLdSur(donnees: unknown): string {
  return JSON.stringify(donnees).replace(/</g, '\\u003c');
}
