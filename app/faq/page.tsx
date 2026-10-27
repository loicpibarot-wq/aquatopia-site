import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQ_CATEGORIES } from '@/lib/faq';
import { fetchGuideParSlug } from '@/lib/guides';
import { ctaPour } from '@/lib/cta';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';

const SITE_URL = 'https://aquatopia.fr';
const TITRE = "FAQ aquariophilie : toutes les questions de débutant, avec réponses";
const DESCRIPTION =
  "Cyclage, choix des poissons, alimentation, entretien, récifal, bassin, achat d'occasion : les réponses aux questions les plus fréquentes des débutants en aquariophilie.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/faq' },
  openGraph: { title: `${TITRE} | Aquatopia`, description: DESCRIPTION, url: '/faq', type: 'website', images: ['/og-image.jpg'], siteName: 'Aquatopia', locale: 'fr_FR' },
};

export default function FaqPage() {
  const toutesLesQuestions = FAQ_CATEGORIES.flatMap((cat) => cat.questions);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: toutesLesQuestions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.reponse },
    })),
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'FAQ' },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · FAQ
      </div>

      <div className="section-head" style={{ marginBottom: 20 }}>
        <span className="eyebrow">FAQ débutant</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{TITRE}</h1>
        <p style={{ marginTop: 14, maxWidth: 720 }}>{DESCRIPTION}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gridAutoRows: '1fr', gap: 10, marginBottom: 28 }}>
        {FAQ_CATEGORIES.map((cat) => (
          <a key={cat.slug} href={`#${cat.slug}`} className="subcat-chip" style={{ padding: '10px 16px', fontSize: '0.82rem', justifyContent: 'center', textAlign: 'center' }}>
            {cat.titre}
          </a>
        ))}
      </div>

      {FAQ_CATEGORIES.map((cat) => (
        <section key={cat.slug} id={cat.slug} style={{ marginBottom: 28, padding: 0, scrollMarginTop: -8 }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 10, textAlign: 'center' }}>{cat.titre}</h2>
          <div className="faq-list">
            {cat.questions.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.reponse}</p>
                {ctaPour(item.question) && (
                  <p style={{ marginTop: 12 }}>
                    <Link href={ctaPour(item.question)!.href} className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
                      {ctaPour(item.question)!.label}
                    </Link>
                  </p>
                )}
                {item.guide && fetchGuideParSlug(item.guide) && (
                  <p style={{ marginTop: 10 }}>
                    <Link href={`/guides/${item.guide}`}>
                      Lire le guide complet : {fetchGuideParSlug(item.guide)!.titre} →
                    </Link>
                  </p>
                )}
              </details>
            ))}
          </div>
        </section>
      ))}

      <div
        style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '18px 22px',
          maxWidth: 760,
        }}
      >
        <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          Pour aller plus loin, retrouvez nos{' '}
          <Link href="/guides" style={{ color: 'var(--teal)' }}>
            guides détaillés
          </Link>{' '}
          sur le démarrage d&apos;un aquarium, le récifal et les bassins de jardin, ou découvrez les{' '}
          <Link href="/poissons-spectaculaires" style={{ color: 'var(--teal)' }}>
            poissons les plus spectaculaires à observer
          </Link>
          {' '}ou nos{' '}
          <Link href="/reproduction-poissons-aquarium" style={{ color: 'var(--teal)' }}>
            guides de reproduction des poissons
          </Link>
          , ainsi que le{' '}
          <Link href="/bouturage-plantes-aquarium" style={{ color: 'var(--teal)' }}>
            bouturage des plantes
          </Link>{' '}
          et le{' '}
          <Link href="/bouturage-coraux-aquarium" style={{ color: 'var(--teal)' }}>
            bouturage des coraux
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
