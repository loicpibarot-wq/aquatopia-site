import { fetchAnnoncesPourSitemapImages, buildSlug } from '@/lib/annonces';

const SITE_URL = 'https://aquatopia.fr';

// Sitemap dédié aux images des annonces, au format d'extension Google Image
// Sitemap. Next.js (14.2) ne supporte pas nativement ce champ dans
// MetadataRoute.Sitemap : on génère donc le XML à la main dans un route
// handler plutôt que via la convention app/sitemap.ts.
export const revalidate = 600;

function echapper(texte: string): string {
  return texte
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  let annonces: Awaited<ReturnType<typeof fetchAnnoncesPourSitemapImages>> = [];
  try {
    annonces = await fetchAnnoncesPourSitemapImages();
  } catch {
    // Si Supabase est injoignable, on renvoie un sitemap vide plutôt qu'une erreur 500.
  }

  const urls = annonces
    .filter((a) => a.photos && a.photos.length > 0)
    .map((a) => {
      const loc = `${SITE_URL}/annonce/${buildSlug(a)}`;
      const images = a.photos
        .slice(0, 10)
        .map((url) => `    <image:image>\n      <image:loc>${echapper(url)}</image:loc>\n    </image:image>`)
        .join('\n');
      return `  <url>\n    <loc>${echapper(loc)}</loc>\n${images}\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
