import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/lib/guides';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';

const SITE_URL = 'https://aquatopia.fr';
const TITRE = "Guides aquariophilie : conseils pour bien débuter et progresser";
const DESCRIPTION =
  "Des guides pratiques sur l'aquariophilie d'eau douce, le récifal et les bassins de jardin : cyclage, choix des poissons, matériel et entretien.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/guides' },
  openGraph: { title: `${TITRE} | Aquatopia`, description: DESCRIPTION, url: '/guides', type: 'website' },
};

export default function GuidesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITRE,
    description: DESCRIPTION,
    url: `${SITE_URL}/guides`,
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Guides' },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · Guides
      </div>

      <div className="section-head" style={{ marginBottom: 36 }}>
        <span className="eyebrow">Guides</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{TITRE}</h1>
        <p style={{ marginTop: 14 }}>{DESCRIPTION}</p>
      </div>

      <div className="guide-grid">
        {GUIDES.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="guide-card">
            <span className="eyebrow">{guide.eyebrow}</span>
            <h3>{guide.titre}</h3>
            <p>{guide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
