import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: ['https://aquatopia.fr/sitemap.xml', 'https://aquatopia.fr/sitemap-images.xml'],
  };
}
