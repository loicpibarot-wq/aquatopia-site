import type { Metadata } from 'next';
import Link from 'next/link';
import { ESPECES_PUBLIEES } from '@/lib/especes';
import { compterAnnoncesActives } from '@/lib/annonces';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import ConfigurateurWizard from '@/components/ConfigurateurWizard';
import StatsConfigurateur from '@/components/StatsConfigurateur';
import SignalementModal from '@/components/SignalementModal';
import type { EspeceLight } from '@/lib/configurateur';

const SITE_URL = 'https://aquatopia.fr';
const TITRE = "Simulateur d'aquarium : trouvez votre setup clé en main";
const DESCRIPTION =
  "Répondez à quelques questions sur votre niveau, votre budget et vos envies — obtenez la cuve idéale, une liste d'équipements, des espèces compatibles et des setups prêts à l'emploi.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/simulateur' },
  openGraph: {
    title: `${TITRE} | Aquatopia`,
    description: DESCRIPTION,
    url: '/simulateur',
    type: 'website',
    images: ['/og-image.jpg'],
    siteName: 'Aquatopia',
    locale: 'fr_FR',
  },
};

export const revalidate = 600;

export default async function ConfigurateurPage() {
  const nbAnnonces = await compterAnnoncesActives();
  const annoncesArrondi = nbAnnonces && nbAnnonces >= 100
    ? `${(Math.floor(nbAnnonces / 100) * 100).toLocaleString('fr-FR').replace(/\s/g, ' ')}+`
    : null;
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
    url: `${SITE_URL}/simulateur`,
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Simulateur' },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · Simulateur
      </div>

      <div className="section-head" style={{ marginBottom: 36 }}>
        <span className="eyebrow">Simulateur</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>
          {TITRE}
        </h1>
        <p style={{ marginTop: 14 }}>
          {DESCRIPTION}
        </p>
        <StatsConfigurateur />
      </div>

      <ConfigurateurWizard pool={pool} annoncesArrondi={annoncesArrondi} />

      <SignalementModal />
    </div>
  );
}
