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

// Ordre d'affichage volontairement pédagogique : du plus généraliste
// (débuter, comprendre) vers le plus spécialisé (récifal, bassin), puis le
// pratico-pratique (entretien, décoration, matériel) et enfin les
// comparatifs, plus orientés décision d'achat.
const ORDRE_CATEGORIES = ['Débuter', 'Comprendre', 'Récifal', 'Bassin', 'Entretien', 'Décoration', 'Matériel', 'Comparatif'];

export default function GuidesPage() {
  const categories = ORDRE_CATEGORIES.map((eyebrow) => ({
    eyebrow,
    guides: GUIDES.filter((g) => g.eyebrow === eyebrow),
  })).filter((cat) => cat.guides.length > 0);

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

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}>
        {categories.map((cat) => (
          <a
            key={cat.eyebrow}
            href={`#${slugifyEyebrow(cat.eyebrow)}`}
            className="subcat-chip"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            {cat.eyebrow}
          </a>
        ))}
      </div>

      {categories.map((cat) => (
        <section key={cat.eyebrow} id={slugifyEyebrow(cat.eyebrow)} style={{ marginBottom: 48, scrollMarginTop: 90 }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 18 }}>{cat.eyebrow}</h2>
          <div className="guide-grid">
            {cat.guides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="guide-card">
                <span className="eyebrow">{guide.eyebrow}</span>
                <h3>{guide.titre}</h3>
                <p>{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function slugifyEyebrow(texte: string): string {
  return texte
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}
