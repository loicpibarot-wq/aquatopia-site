// Génère le JSON-LD BreadcrumbList à partir du même fil d'Ariane que celui
// affiché à l'écran (jamais un contenu différent, pour rester cohérent avec
// les règles de Google sur les données structurées).
const SITE_URL = 'https://aquatopia.fr';

export function breadcrumbJsonLd(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: `${SITE_URL}${item.url}` } : {}),
    })),
  };
}
