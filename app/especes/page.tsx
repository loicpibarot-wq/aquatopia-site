import type { Metadata } from 'next';
import Link from 'next/link';
import { ESPECES_PUBLIEES } from '@/lib/especes';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import EspeceRecherche from '@/components/EspeceRecherche';

const SITE_URL = 'https://aquatopia.fr';
const TITRE = "Fiches espèces : poissons, plantes, coraux et invertébrés d'aquarium";
const DESCRIPTION =
  "Volume minimum, compatibilité, paramètres d'eau (pH, température, salinité), conseils d'entretien et statut légal en France pour chaque espèce d'aquarium d'eau douce, d'eau de mer récifal ou de bassin.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/especes' },
  openGraph: { title: `${TITRE} | Aquatopia`, description: DESCRIPTION, url: '/especes', type: 'website', images: ['/og-image.jpg'], siteName: 'Aquatopia', locale: 'fr_FR' },
};

export default function EspecesPage() {
  const especes = [...ESPECES_PUBLIEES]
    .sort((a, b) => a.nomCommun.localeCompare(b.nomCommun, 'fr'))
    .map((e) => ({
      slug: e.slug,
      nomCommun: e.nomCommun,
      nomScientifique: e.nomScientifique,
      categorie: e.categorie,
      statutLegal: e.statutLegal,
      autresNoms: e.autresNoms,
    }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITRE,
    description: DESCRIPTION,
    url: `${SITE_URL}/especes`,
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Espèces' },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · Espèces
      </div>

      <div className="section-head" style={{ marginBottom: 12 }}>
        <span className="eyebrow">Espèces</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{TITRE}</h1>
        <p style={{ marginTop: 14 }}>{DESCRIPTION}</p>
        <p style={{ marginTop: 10, fontSize: '0.92rem' }}>
          Envie de voir de l&apos;action ?{' '}
          <Link href="/poissons-spectaculaires" style={{ color: 'var(--teal)', fontWeight: 600 }}>
            Les poissons au comportement le plus spectaculaire →
          </Link>
        </p>
        <p style={{ marginTop: 6, fontSize: '0.92rem' }}>
          Envie de voir naître des alevins ?{' '}
          <Link href="/reproduction-poissons-aquarium" style={{ color: 'var(--teal)', fontWeight: 600 }}>
            Les guides de reproduction, poisson par poisson →
          </Link>
        </p>
        <p style={{ marginTop: 6, fontSize: '0.92rem' }}>
          Envie de multiplier vos plantes ou vos coraux ?{' '}
          <Link href="/bouturage-plantes-aquarium" style={{ color: 'var(--teal)', fontWeight: 600 }}>
            Bouturer ses plantes →
          </Link>{' '}
          <Link href="/bouturage-coraux-aquarium" style={{ color: 'var(--teal)', fontWeight: 600 }}>
            Bouturer ses coraux →
          </Link>
        </p>
      </div>

      <EspeceRecherche especes={especes} />
    </div>
  );
}
