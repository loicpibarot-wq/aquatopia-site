import type { Metadata } from 'next';
import Link from 'next/link';
import { GLOSSAIRE } from '@/lib/glossaire';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';

const SITE_URL = 'https://aquatopia.fr';
const TITRE = 'Glossaire aquariophile : tous les termes expliqués simplement';
const DESCRIPTION =
  "KH, GH, cyclage, écumeur, SPS, osmolateur... Le lexique complet de l'aquariophilie d'eau douce, récifale et de bassin, expliqué en langage clair.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/glossaire' },
  openGraph: { title: `${TITRE} | Aquatopia`, description: DESCRIPTION, url: '/glossaire', type: 'website' },
};

export default function GlossairePage() {
  const trie = [...GLOSSAIRE].sort((a, b) => a.terme.localeCompare(b.terme, 'fr'));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: TITRE,
    description: DESCRIPTION,
    url: `${SITE_URL}/glossaire`,
    hasDefinedTerm: GLOSSAIRE.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.terme,
      description: t.definition,
      url: `${SITE_URL}/glossaire/${t.slug}`,
    })),
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Glossaire' },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · Glossaire
      </div>

      <div className="section-head" style={{ marginBottom: 36 }}>
        <span className="eyebrow">Glossaire</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{TITRE}</h1>
        <p style={{ marginTop: 14, maxWidth: 720 }}>{DESCRIPTION}</p>
      </div>

      <div className="guide-grid">
        {trie.map((t) => (
          <Link key={t.slug} href={`/glossaire/${t.slug}`} className="guide-card">
            <span className="eyebrow">{t.categorie}</span>
            <h3>{t.terme}</h3>
            <p>{t.definition.length > 130 ? `${t.definition.slice(0, 127)}…` : t.definition}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
