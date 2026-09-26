import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GLOSSAIRE, fetchTermeParSlug } from '@/lib/glossaire';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';

const SITE_URL = 'https://aquatopia.fr';

export function generateStaticParams() {
  return GLOSSAIRE.map((t) => ({ terme: t.slug }));
}

export async function generateMetadata({ params }: { params: { terme: string } }): Promise<Metadata> {
  const terme = fetchTermeParSlug(params.terme);
  if (!terme) return {};
  const titre = `${terme.terme} : définition`;
  const url = `/glossaire/${terme.slug}`;

  return {
    title: titre,
    description: terme.definition,
    alternates: { canonical: url },
    openGraph: { title: `${titre} | Aquatopia`, description: terme.definition, url, type: 'article' },
  };
}

export default function TermeGlossairePage({ params }: { params: { terme: string } }) {
  const terme = fetchTermeParSlug(params.terme);
  if (!terme) notFound();

  const autresTermes = GLOSSAIRE.filter((t) => t.slug !== terme.slug && t.categorie === terme.categorie).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: terme.terme,
    description: terme.definition,
    url: `${SITE_URL}/glossaire/${terme.slug}`,
    inDefinedTermSet: `${SITE_URL}/glossaire`,
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Glossaire', url: '/glossaire' },
    { name: terme.terme },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · <Link href="/glossaire">Glossaire</Link> · {terme.categorie}
      </div>

      <div className="section-head" style={{ marginBottom: 24, maxWidth: 720 }}>
        <span className="eyebrow">{terme.categorie}</span>
        <h1 style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', marginTop: 14 }}>{terme.terme}</h1>
      </div>

      <p className="annonce-desc" style={{ maxWidth: 720 }}>
        {terme.definition}
      </p>

      {terme.guideLie && (
        <div
          style={{
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '18px 22px',
            marginTop: 24,
            marginBottom: 48,
            maxWidth: 720,
          }}
        >
          <Link href={terme.guideLie.href} style={{ fontSize: '0.9rem', color: 'var(--teal)' }}>
            → {terme.guideLie.label}
          </Link>
        </div>
      )}

      {autresTermes.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <div className="section-head" style={{ marginBottom: 24 }}>
            <span className="eyebrow">Voir aussi ({terme.categorie})</span>
          </div>
          <div className="guide-grid">
            {autresTermes.map((t) => (
              <Link key={t.slug} href={`/glossaire/${t.slug}`} className="guide-card">
                <span className="eyebrow">{t.categorie}</span>
                <h3>{t.terme}</h3>
                <p>{t.definition.length > 130 ? `${t.definition.slice(0, 127)}…` : t.definition}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
