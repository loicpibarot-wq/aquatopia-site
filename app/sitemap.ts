import type { MetadataRoute } from 'next';
import { fetchAnnoncesActives, buildSlug } from '@/lib/annonces';

const SITE_URL = 'https://aquatopia.fr';

// Régénéré automatiquement toutes les 10 minutes (voir `revalidate`) : une
// annonce vendue ou désactivée sort du sitemap sans intervention manuelle,
// et une nouvelle annonce y apparaît dès la prochaine régénération.
export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const racine: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
  ];

  let annonces: MetadataRoute.Sitemap = [];
  try {
    const liste = await fetchAnnoncesActives();
    annonces = liste.map((a) => ({
      url: `${SITE_URL}/annonce/${buildSlug(a)}`,
      lastModified: a.created_at,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch {
    // Si Supabase est momentanément injoignable, on renvoie au moins la
    // page d'accueil plutôt que de faire échouer tout le sitemap.
  }

  return [...racine, ...annonces];
}
