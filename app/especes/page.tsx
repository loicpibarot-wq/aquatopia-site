import type { Metadata } from 'next';
import Link from 'next/link';
import { ESPECES_PUBLIEES } from '@/lib/especes';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import EspeceRecherche from '@/components/EspeceRecherche';

const SITE_URL = 'https://aquatopia.fr';
const TITRE = "Fiches espèces : poissons, plantes, crevettes et coraux d'aquarium";
const DESCRIPTION =
  "Volume minimum, taille de groupe, compatibilité, pH et température idéale pour chaque espèce couramment maintenue en aquarium ou en bassin — et son statut légal en France.";

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
      </div>

      <EspeceRecherche especes={especes} />
    </div>
  );
}
