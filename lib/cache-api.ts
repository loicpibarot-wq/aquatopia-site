// En-têtes de cache pour les lectures (GET) des routes d'API : le réseau de diffusion de
// Netlify garde la réponse quelques minutes, sans réveiller la fonction serveur à chaque
// visite (chaque appel consomme des crédits). Les écritures (POST) ne sont jamais mises en cache.
export const ENTETES_CACHE_LECTURE = {
  'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
} as const;
