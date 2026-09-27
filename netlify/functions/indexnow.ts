// Fonction planifiée Netlify : prévient Bing (et les autres moteurs
// compatibles IndexNow : Yandex, Seznam, Naver…) des nouvelles annonces,
// pour qu'elles soient indexées en quelques heures au lieu d'attendre la
// prochaine lecture du sitemap. Google n'utilise pas IndexNow.
//
// Les annonces sont créées depuis l'app mobile (directement dans Supabase)
// et validées plus tard par un admin, sans date de validation en base. On
// envoie donc chaque jour les annonces actives et validées créées dans les
// 3 derniers jours : une annonce validée avec retard est quand même
// signalée, et une même URL n'est envoyée que 3 fois au maximum.
//
// Test manuel : Netlify > Logs > Functions > indexnow > « Run now ».
import { fetchAnnoncesPourSitemap, buildSlug, CATEGORIE_VERS_SLUG, BIOTOPE_VERS_SLUG } from '../../lib/annonces';

const SITE_URL = 'https://aquatopia.fr';
const HOST = 'aquatopia.fr';

// Clé publique IndexNow : doit correspondre au fichier public/<clé>.txt,
// qui prouve aux moteurs que les envois viennent bien du propriétaire du site.
const INDEXNOW_KEY = '184236cacbfcd134930c02d0b64c3062';

const FENETRE_JOURS = 3;

export default async function handler(): Promise<Response> {
  const depuis = Date.now() - FENETRE_JOURS * 24 * 60 * 60 * 1000;

  const annonces = (await fetchAnnoncesPourSitemap()).filter(
    (a) => new Date(a.created_at).getTime() >= depuis
  );

  if (annonces.length === 0) {
    console.log('IndexNow : aucune nouvelle annonce, rien à envoyer.');
    return new Response('rien à envoyer');
  }

  // Les pages de listing qui affichent ces annonces ont changé elles aussi.
  const pagesListing = new Set<string>([SITE_URL]);
  for (const a of annonces) {
    const cat = CATEGORIE_VERS_SLUG[a.categorie];
    if (cat) pagesListing.add(`${SITE_URL}/categorie/${cat}`);
    const bio = BIOTOPE_VERS_SLUG[a.biotope];
    if (bio) pagesListing.add(`${SITE_URL}/biotope/${bio}`);
    if (a.is_don) pagesListing.add(`${SITE_URL}/dons`);
    if (a.is_echange) pagesListing.add(`${SITE_URL}/echanges`);
  }

  const urlList = [...annonces.map((a) => `${SITE_URL}/annonce/${buildSlug(a)}`), ...pagesListing];

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });

  // 200 ou 202 = accepté. 403 = clé introuvable/invalide, 422 = URL hors du domaine.
  console.log(`IndexNow : ${urlList.length} URL envoyées, réponse HTTP ${res.status}`);
  return new Response(`${urlList.length} URL envoyées (HTTP ${res.status})`, {
    status: res.ok ? 200 : 502,
  });
}

// Tous les jours à 5 h UTC (7 h heure de Paris en été, 6 h en hiver).
export const config = { schedule: '0 5 * * *' };
