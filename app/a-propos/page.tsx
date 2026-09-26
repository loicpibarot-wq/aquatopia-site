import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';

const SITE_URL = 'https://aquatopia.fr';
const TITRE = 'À propos d’Aquatopia';
const DESCRIPTION =
  "Aquatopia est une marketplace française dédiée à l'aquariophilie d'eau douce, récifale et de bassin, pensée par des passionnés pour des passionnés.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/a-propos' },
  openGraph: { title: `${TITRE} | Aquatopia`, description: DESCRIPTION, url: '/a-propos', type: 'website' },
};

export default function AProposPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: TITRE,
    description: DESCRIPTION,
    url: `${SITE_URL}/a-propos`,
    about: {
      '@type': 'Organization',
      name: 'Aquatopia',
      url: SITE_URL,
    },
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'À propos' },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · À propos
      </div>

      <div className="section-head" style={{ marginBottom: 32, maxWidth: 720 }}>
        <span className="eyebrow">À propos</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{TITRE}</h1>
      </div>

      <div style={{ maxWidth: 720 }}>
        <p className="annonce-desc">
          Aquatopia est née d&apos;un constat simple : l&apos;aquariophilie n&apos;avait pas d&apos;espace dédié pour
          acheter, vendre, donner ou échanger entre passionnés. Les petites annonces généralistes mélangent le vivant
          avec tout le reste, sans tenir compte des contraintes propres à ce loisir — remise en main propre
          obligatoire pour les animaux, distinction entre eau douce, récifal et bassin, besoin de repères clairs pour
          les débutants comme pour les éleveurs.
        </p>
        <p className="annonce-desc" style={{ marginTop: 16 }}>
          L&apos;application est pensée par des personnes qui pratiquent elles-mêmes l&apos;aquariophilie au
          quotidien, du bac communautaire d&apos;eau douce au récifal, en passant par le bassin de jardin — avec
          l&apos;idée que les meilleurs outils pour un loisir viennent souvent de ceux qui le pratiquent.
        </p>
        <h2 style={{ fontSize: '1.2rem', marginTop: 36, marginBottom: 14 }}>Nos engagements</h2>
        <p className="annonce-desc">
          Toutes les remises d&apos;animaux se font en main propre, jamais par voie postale, conformément à la
          réglementation et dans le respect du bien-être animal. Chaque annonce et chaque profil passe par une
          validation avant publication. L&apos;application reste gratuite pour les particuliers : téléchargement,
          recherche et publication d&apos;annonces sans frais.
        </p>
        <h2 style={{ fontSize: '1.2rem', marginTop: 36, marginBottom: 14 }}>Pourquoi ce site</h2>
        <p className="annonce-desc">
          En plus de l&apos;application, ce site rassemble des{' '}
          <Link href="/guides" style={{ color: 'var(--teal)' }}>
            guides
          </Link>{' '}
          et une{' '}
          <Link href="/faq" style={{ color: 'var(--teal)' }}>
            FAQ
          </Link>{' '}
          pour aider les débutants à bien démarrer, et un{' '}
          <Link href="/glossaire" style={{ color: 'var(--teal)' }}>
            glossaire
          </Link>{' '}
          pour retrouver rapidement la définition d&apos;un terme technique — que ce soit en eau douce ou en récifal.
        </p>
      </div>
    </div>
  );
}
