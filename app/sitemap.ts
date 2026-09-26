import type { MetadataRoute } from 'next';
import { fetchAnnoncesPourSitemap, buildSlug, CATEGORIE_VERS_SLUG, BIOTOPE_VERS_SLUG } from '@/lib/annonces';
import { GUIDES } from '@/lib/guides';
import { GLOSSAIRE } from '@/lib/glossaire';

const SITE_URL = 'https://aquatopia.fr';

// Date de dernière modification des pages au contenu fixe (FAQ, à propos,
// glossaire). À mettre à jour à la main quand on modifie ces contenus.
const MAJ_PAGES_STATIQUES = '2026-09-26';

// Régénéré automatiquement toutes les 10 minutes (voir `revalidate`) : une
// annonce vendue ou désactivée sort du sitemap sans intervention manuelle,
// et une nouvelle annonce y apparaît dès la prochaine régénération.
export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let liste: Awaited<ReturnType<typeof fetchAnnoncesPourSitemap>> = [];
  try {
    liste = await fetchAnnoncesPourSitemap();
  } catch {
    // Si Supabase est momentanément injoignable, on renvoie au moins les
    // pages fixes plutôt que de faire échouer tout le sitemap.
  }

  // `liste` est triée par created_at décroissant : la première annonce qui
  // correspond au filtre est la plus récente. Sert de lastmod aux pages de
  // listing, pour que Google revienne quand il y a vraiment du nouveau.
  const derniereAnnonce = (filtre: (a: (typeof liste)[number]) => boolean = () => true) =>
    liste.find(filtre)?.created_at;

  const racine: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: derniereAnnonce(), changeFrequency: 'daily', priority: 1 },
  ];

  const categories: MetadataRoute.Sitemap = Object.entries(CATEGORIE_VERS_SLUG).map(([categorie, slug]) => ({
    url: `${SITE_URL}/categorie/${slug}`,
    lastModified: derniereAnnonce((a) => a.categorie === categorie),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const biotopes: MetadataRoute.Sitemap = Object.entries(BIOTOPE_VERS_SLUG).map(([biotope, slug]) => ({
    url: `${SITE_URL}/biotope/${slug}`,
    lastModified: derniereAnnonce((a) => a.biotope === biotope),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const transactions: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/dons`, lastModified: derniereAnnonce((a) => a.is_don), changeFrequency: 'daily', priority: 0.7 },
    { url: `${SITE_URL}/echanges`, lastModified: derniereAnnonce((a) => a.is_echange), changeFrequency: 'daily', priority: 0.7 },
  ];

  const guides: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/guides`,
      lastModified: GUIDES.map((g) => g.datePublication).sort().at(-1),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...GUIDES.map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}`,
      lastModified: g.datePublication,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/faq`, lastModified: MAJ_PAGES_STATIQUES, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/a-propos`, lastModified: MAJ_PAGES_STATIQUES, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const glossaire: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/glossaire`, lastModified: MAJ_PAGES_STATIQUES, changeFrequency: 'monthly', priority: 0.6 },
    ...GLOSSAIRE.map((t) => ({
      url: `${SITE_URL}/glossaire/${t.slug}`,
      lastModified: MAJ_PAGES_STATIQUES,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];

  const annonces: MetadataRoute.Sitemap = liste.map((a) => ({
    url: `${SITE_URL}/annonce/${buildSlug(a)}`,
    lastModified: a.created_at,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...racine, ...categories, ...biotopes, ...transactions, ...guides, ...glossaire, ...annonces];
}
