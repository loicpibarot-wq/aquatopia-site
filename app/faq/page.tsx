import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQ_CATEGORIES } from '@/lib/faq';

const SITE_URL = 'https://aquatopia.fr';
const TITRE = "FAQ aquariophilie : toutes les questions de débutant, avec réponses";
const DESCRIPTION =
  "Cyclage, choix des poissons, alimentation, entretien, récifal, bassin, achat d'occasion : les réponses aux questions les plus fréquentes des débutants en aquariophilie.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/faq' },
  openGraph: { title: `${TITRE} | Aquatopia`, description: DESCRIPTION, url: '/faq', type: 'website' },
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

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · FAQ
      </div>

      <div className="section-head" style={{ marginBottom: 20 }}>
        <span className="eyebrow">FAQ débutant</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{TITRE}</h1>
        <p style={{ marginTop: 14, maxWidth: 720 }}>{DESCRIPTION}</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}>
        {FAQ_CATEGORIES.map((cat) => (
          <a key={cat.slug} href={`#${cat.slug}`} className="subcat-chip" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
            {cat.titre}
          </a>
        ))}
      </div>

      {FAQ_CATEGORIES.map((cat) => (
        <section key={cat.slug} id={cat.slug} style={{ marginBottom: 48, scrollMarginTop: 90 }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 18 }}>{cat.titre}</h2>
          <div className="faq-list">
            {cat.questions.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.reponse}</p>
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
          sur le démarrage d&apos;un aquarium, le récifal et les bassins de jardin.
        </p>
      </div>
    </div>
  );
}
