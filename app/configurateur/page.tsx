import type { Metadata } from 'next';
import Link from 'next/link';
import { ESPECES_PUBLIEES } from '@/lib/especes';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import ConfigurateurWizard from '@/components/ConfigurateurWizard';
import StatsConfigurateur from '@/components/StatsConfigurateur';
import SignalementModal from '@/components/SignalementModal';
import type { EspeceLight } from '@/lib/configurateur';

const SITE_URL = 'https://aquatopia.fr';
const TITRE = "Configurateur aquarium : trouvez votre setup clé en main";
const DESCRIPTION =
  "Répondez à quelques questions sur votre niveau, votre budget et vos envies — obtenez la cuve idéale, une liste d'équipements et d'espèces compatibles, et les annonces disponibles.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/configurateur' },
  openGraph: {
    title: `${TITRE} | Aquatopia`,
    description: DESCRIPTION,
    url: '/configurateur',
    type: 'website',
    images: ['/og-image.jpg'],
    siteName: 'Aquatopia',
    locale: 'fr_FR',
  },
};

export default function ConfigurateurPage() {
  // Pré-calcul côté serveur : on ne passe au client que les champs nécessaires
  // à l'algorithme de recommandation, pas les descriptions longues.
  const pool: EspeceLight[] = ESPECES_PUBLIEES
    .filter((e) => e.fiche)
    .map((e) => ({
      slug:             e.slug,
      nomCommun:        e.nomCommun,
      nomScientifique:  e.nomScientifique,
      categorie:        e.categorie,
      difficulte:       e.fiche!.difficulte,
      volumeMin:        e.fiche!.volumeMinLitres,
      tailleAdulte:     e.fiche!.tailleAdulte,
      statutLegal:      e.statutLegal,
      // Champs de filtrage par préférence
      co2:             e.fiche!.plante?.co2,
      placementPlante: e.fiche!.plante?.placement,
      corailType:      e.fiche!.corail?.type,
      reefSafe:        e.fiche!.marin?.reefSafe,
      zone:            e.fiche!.marin?.zone,
      tempMin:         e.fiche!.tempMin,
      tempMax:         e.fiche!.tempMax,
      phMin:           e.fiche!.phMin,
      phMax:           e.fiche!.phMax,
    }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: TITRE,
    description: DESCRIPTION,
    url: `${SITE_URL}/configurateur`,
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Configurateur' },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · Configurateur
      </div>

      <div className="section-head" style={{ marginBottom: 36 }}>
        <span className="eyebrow">Configurateur</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>
          {TITRE}
        </h1>
        <p style={{ marginTop: 14 }}>
          {DESCRIPTION}
        </p>
        <StatsConfigurateur />
      </div>

      <ConfigurateurWizard pool={pool} />

      <SignalementModal />
    </div>
  );
}
