import type { Metadata } from 'next';
import Link from 'next/link';
import { ESPECES_PUBLIEES } from '@/lib/especes';
import { compterAnnoncesActives } from '@/lib/annonces';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import ConfigurateurWizard from '@/components/ConfigurateurWizard';
import StatsConfigurateur from '@/components/StatsConfigurateur';
import { ctaPour } from '@/lib/cta';
import SignalementModal from '@/components/SignalementModal';
import type { EspeceLight } from '@/lib/configurateur';
import { FAQ_SIMULATEUR } from '@/lib/faqSimulateur';

const SITE_URL = 'https://aquatopia.fr';
const TITRE = "Simulateur d'aquarium : trouvez votre setup clé en main";
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
  // Pré-calcul côté serveur : on ne passe au client que les champs nécessaires
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

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_SIMULATEUR.flatMap((cat) => cat.questions).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.reponse },
    })),
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Simulateur' },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · Simulateur
      </div>

      <div className="section-head" style={{ marginBottom: 20 }}>
        <span className="eyebrow">Simulateur</span>
        <h1 style={{ fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)', marginTop: 10 }}>
          {TITRE}
        </h1>
        <p style={{ marginTop: 10, fontSize: '0.95rem' }}>
          Six questions, et vous obtenez la cuve idéale, le matériel et les espèces compatibles.
        </p>
      </div>

      <div id="configurateur"><ConfigurateurWizard pool={pool} annoncesArrondi={annoncesArrondi} /></div>
      <div style={{ maxWidth: 720, margin: '0 auto' }}><StatsConfigurateur /></div>

      <section id="faq" style={{ marginTop: 72, padding: 0 }}>
        <div className="section-head" style={{ marginBottom: 28 }}>
          <span className="eyebrow">Questions fréquentes</span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)', marginTop: 14 }}>
            Bien choisir son aquarium : les questions que tout le monde se pose
          </h2>
          <p style={{ marginTop: 12, maxWidth: 720 }}>
            Quel poisson, quel volume, quel matériel, quel budget : les réponses aux questions les plus fréquentes avant de se lancer.
          </p>
        </div>

        {FAQ_SIMULATEUR.map((cat) => (
          <div key={cat.slug} style={{ marginBottom: 36 }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: 14 }}>{cat.titre}</h3>
            <div className="faq-list">
              {cat.questions.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.reponse}</p>
                  {ctaPour(item.question) && (
                    <p style={{ marginTop: 12 }}>
                      {ctaPour(item.question)!.href === '/simulateur' ? (
                        <a href="#configurateur" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
                          Lancer le simulateur
                        </a>
                      ) : (
                        <Link href={ctaPour(item.question)!.href} className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
                          {ctaPour(item.question)!.label}
                        </Link>
                      )}
                    </p>
                  )}
                </details>
              ))}
            </div>
          </div>
        ))}

        <p style={{ marginTop: 8, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          Plus de questions sur l&apos;entretien, la santé ou l&apos;alimentation ? Consultez la{' '}
          <Link href="/faq" style={{ color: 'var(--teal)' }}>FAQ complète</Link>{' '}
          ou parcourez nos <Link href="/especes" style={{ color: 'var(--teal)' }}>fiches espèces</Link>.
        </p>
      </section>

      <SignalementModal />
    </div>
  );
}
