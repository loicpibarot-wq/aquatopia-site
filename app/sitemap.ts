import type { MetadataRoute } from 'next';
import { fetchAnnoncesPourSitemap, buildSlug, CATEGORIE_VERS_SLUG, BIOTOPE_VERS_SLUG } from '@/lib/annonces';
import { GUIDES } from '@/lib/guides';
import { GLOSSAIRE } from '@/lib/glossaire';

const SITE_URL = 'https://aquatopia.fr';

// Régénéré automatiquement toutes les 10 minutes (voir `revalidate`) : une
// annonce vendue ou désactivée sort du sitemap sans intervention manuelle,
// et une nouvelle annonce y apparaît dès la prochaine régénération.
export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const racine: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
  ];

  const categories: MetadataRoute.Sitemap = Object.values(CATEGORIE_VERS_SLUG).map((slug) => ({
    url: `${SITE_URL}/categorie/${slug}`,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const biotopes: MetadataRoute.Sitemap = Object.values(BIOTOPE_VERS_SLUG).map((slug) => ({
    url: `${SITE_URL}/biotope/${slug}`,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const transactions: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/dons`, changeFrequency: 'daily', priority: 0.7 },
    { url: `${SITE_URL}/echanges`, changeFrequency: 'daily', priority: 0.7 },
  ];

  const guides: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/guides`, changeFrequency: 'weekly', priority: 0.7 },
    ...GUIDES.map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}`,
      lastModified: g.datePublication,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/faq`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/a-propos`, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const glossaire: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/glossaire`, changeFrequency: 'monthly', priority: 0.6 },
    ...GLOSSAIRE.map((t) => ({
      url: `${SITE_URL}/glossaire/${t.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];

  let annonces: MetadataRoute.Sitemap = [];
  try {
    const liste = await fetchAnnoncesPourSitemap();
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

  return [...racine, ...categories, ...biotopes, ...transactions, ...guides, ...glossaire, ...annonces];
}
