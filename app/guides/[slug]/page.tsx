import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIDES, fetchGuideParSlug } from '@/lib/guides';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';

const SITE_URL = 'https://aquatopia.fr';

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = fetchGuideParSlug(params.slug);
  if (!guide) return {};
  const url = `/guides/${guide.slug}`;

  return {
    title: guide.titre,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${guide.titre} | Aquatopia`,
      description: guide.description,
      url,
      type: 'article',
      publishedTime: guide.datePublication,
    },
  };
}

export default function GuideArticlePage({ params }: { params: { slug: string } }) {
  const guide = fetchGuideParSlug(params.slug);
  if (!guide) notFound();

  const autresGuides = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.titre,
    description: guide.description,
    datePublished: guide.datePublication,
    author: { '@type': 'Organization', name: 'Aquatopia' },
    publisher: { '@type': 'Organization', name: 'Aquatopia' },
    mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: guide.titre },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · <Link href="/guides">Guides</Link> · {guide.eyebrow}
      </div>

      <div className="section-head" style={{ marginBottom: 32, maxWidth: 720 }}>
        <span className="eyebrow">{guide.eyebrow}</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{guide.titre}</h1>
      </div>

      <div style={{ maxWidth: 720 }}>
        {guide.sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            {section.titre && (
              <h2 style={{ fontSize: '1.2rem', marginBottom: 10 }}>{section.titre}</h2>
            )}
            {section.paragraphes.map((p, j) => (
              <p key={j} className="annonce-desc" style={{ marginTop: j === 0 ? 0 : 12 }}>
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>

      {guide.liensUtiles.length > 0 && (
        <div
          style={{
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '18px 22px',
            marginTop: 20,
            marginBottom: 56,
            maxWidth: 720,
          }}
        >
          <p style={{ margin: '0 0 10px', fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)' }}>
            Pour aller plus loin
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {guide.liensUtiles.map((lien) => (
              <Link key={lien.href} href={lien.href} style={{ fontSize: '0.9rem', color: 'var(--teal)' }}>
                → {lien.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {autresGuides.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <div className="section-head" style={{ marginBottom: 24 }}>
            <span className="eyebrow">À lire aussi</span>
          </div>
          <div className="guide-grid">
            {autresGuides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="guide-card">
                <span className="eyebrow">{g.eyebrow}</span>
                <h3>{g.titre}</h3>
                <p>{g.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
