import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ESPECES_PUBLIEES, fetchEspeceParSlug, categorieAnnonceSlug, biotopeSlug } from '@/lib/especes';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import { descriptionEspece, especesLiees, faqEspece, nomsIdentiques, titreEspece, tuilesEspece } from '@/lib/especes-seo';
import EspeceImage from '@/components/EspeceImage';
import SignalementModal from '@/components/SignalementModal';
import VuesEspece from '@/components/VuesEspece';

const SITE_URL = 'https://aquatopia.fr';

export function generateStaticParams() {
  return ESPECES_PUBLIEES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const espece = fetchEspeceParSlug(params.slug);
  if (!espece) return {};
  const titre = titreEspece(espece);
  const description = descriptionEspece(espece);
  const url = `/especes/${espece.slug}`;

  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${titre} | Aquatopia`, description, url, type: 'article', images: ['/og-image.jpg'], siteName: 'Aquatopia', locale: 'fr_FR' },
  };
}

export default function EspecePage({ params }: { params: { slug: string } }) {
  const espece = fetchEspeceParSlug(params.slug);
  if (!espece) notFound();
  const { fiche } = espece;

  const autresEspeces = especesLiees(espece);
  const faq = faqEspece(espece);
  const tuiles = tuilesEspece(espece);
  const cultive = Boolean(fiche.plante || fiche.corail || fiche.algue);
  const multiplication = fiche.plante?.multiplication ?? fiche.corail?.multiplication ?? fiche.algue?.multiplication ?? null;
  const titreAlimentation = fiche.plante || fiche.algue ? 'Culture et nutrition' : fiche.corail ? 'Alimentation et nutrition' : 'Alimentation';
  const urlFiche = `${SITE_URL}/especes/${espece.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titreEspece(espece),
    description: descriptionEspece(espece),
    inLanguage: 'fr-FR',
    url: urlFiche,
    mainEntityOfPage: urlFiche,
    image: `${SITE_URL}/og-image.jpg`,
    author: { '@type': 'Organization', name: 'Aquatopia' },
    publisher: { '@type': 'Organization', name: 'Aquatopia' },
    about: {
      '@type': 'Thing',
      name: espece.nomCommun,
      alternateName: [
        ...(nomsIdentiques(espece.nomCommun, espece.nomScientifique) ? [] : [espece.nomScientifique]),
        ...(espece.autresNoms ?? []),
      ],
    },
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.reponse },
    })),
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Espèces', url: '/especes' },
    { name: espece.nomCommun },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Bouton retour — visible immédiatement, style pill */}
      <Link href="/especes" className="btn-retour">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Espèces
      </Link>

      {/* Fil d'Ariane (SEO uniquement — visuellement discret) */}
      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · <Link href="/especes">Espèces</Link> · {espece.nomCommun}
      </div>

      <div className="section-head" style={{ marginBottom: 8, maxWidth: 760 }}>
        <span className="eyebrow">{espece.categorie}</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{espece.nomCommun}</h1>
        {!nomsIdentiques(espece.nomCommun, espece.nomScientifique) && (
          <p style={{ marginTop: 6, fontStyle: 'italic', color: 'var(--text-muted)' }}>{espece.nomScientifique}</p>
        )}
        {espece.autresNoms && espece.autresNoms.length > 0 && (
          <p style={{ marginTop: 6, color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Aussi appelé{espece.autresNoms.length > 1 ? 's' : ''} : {espece.autresNoms.join(', ')}
          </p>
        )}
        <VuesEspece slug={espece.slug} />
      </div>

      <EspeceImage src={`/especes/${espece.slug}.webp`} alt={espece.nomCommun} />

      {espece.remarqueLegale && (
        <div
          className={`espece-alerte ${
            espece.statutLegal === 'cites_a_signaler' ? 'cites' : espece.statutLegal === 'autorise' ? 'info' : ''
          }`}
        >
          <p>
            <strong>
              {espece.statutLegal === 'interdite'
                ? '⚠ Vente et détention interdites en France. '
                : espece.statutLegal === 'autorisation_requise'
                  ? '⚠ Détention soumise à autorisation (certificat de capacité) : fermée aux particuliers. '
                  : espece.statutLegal === 'cites_a_signaler'
                    ? '⚠ Espèce réglementée (CITES) : conservez la preuve de son origine légale. '
                    : 'ℹ Point de vigilance. '}
            </strong>
            {espece.remarqueLegale}
            {espece.citesAnnexe && ` (Annexe ${espece.citesAnnexe})`}
          </p>
        </div>
      )}

      <p className="annonce-desc" style={{ maxWidth: 760, marginTop: espece.remarqueLegale ? 0 : 28 }}>
        {fiche.description}
      </p>

      <div className="espece-facts">
        {tuiles.map((t) => (
          <div className="espece-fact" key={t.label}>
            <span>{t.label}</span>
            <strong style={t.petite ? { fontSize: '0.95rem' } : undefined}>{t.valeur}</strong>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 760, marginBottom: 32 }}>
        <div>
          <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>Compatible avec</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{fiche.compatibilite}</p>
        </div>
        <div>
          <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>{cultive ? 'Points de vigilance' : 'À éviter'}</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{fiche.incompatibilite}</p>
        </div>
        <div>
          <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>{titreAlimentation}</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{fiche.alimentation}</p>
        </div>
        {cultive && multiplication && (
          <div>
            <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>{fiche.corail ? 'Bouturage et multiplication' : 'Multiplication'}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{multiplication}</p>
          </div>
        )}
      </div>

      <div
        style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '18px 22px',
          marginBottom: 48,
          maxWidth: 760,
        }}
      >
        <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          <b style={{ color: 'var(--text)' }}>Conseil : </b>
          {fiche.conseil}
        </p>
      </div>

      {fiche.reproduction && (
        <section style={{ maxWidth: 760, marginBottom: 48 }} aria-labelledby="repro-espece">
          <h2 id="repro-espece" style={{ fontSize: '1.2rem', marginBottom: 16 }}>
            Reproduction de {espece.nomCommun} en aquarium
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span
              style={{
                display: 'inline-block',
                padding: '3px 12px',
                borderRadius: 20,
                fontSize: '0.82rem',
                fontWeight: 600,
                background:
                  fiche.reproduction.facilite === 'Très facile' ? 'var(--vert-pale, #d4edda)' :
                  fiche.reproduction.facilite === 'Facile' ? 'var(--vert-pale, #d4edda)' :
                  fiche.reproduction.facilite === 'Modérée' ? 'var(--jaune-pale, #fff3cd)' :
                  fiche.reproduction.facilite === 'Difficile' ? 'var(--orange-pale, #ffe0b2)' :
                  fiche.reproduction.facilite === 'Très difficile' ? 'var(--rouge-pale, #f8d7da)' :
                  'var(--bg-2)',
                color:
                  fiche.reproduction.facilite === 'Très facile' ? '#155724' :
                  fiche.reproduction.facilite === 'Facile' ? '#155724' :
                  fiche.reproduction.facilite === 'Modérée' ? '#856404' :
                  fiche.reproduction.facilite === 'Difficile' ? '#e65100' :
                  fiche.reproduction.facilite === 'Très difficile' ? '#721c24' :
                  'var(--text-muted)',
              }}
            >
              {fiche.reproduction.facilite}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Difficulté de reproduction</span>
          </div>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>
            {fiche.reproduction.description}
          </p>
        </section>
      )}

      {espece.statutLegal === 'autorise' && (
        <div style={{ marginBottom: 48 }}>
          <Link href={`/categorie/${categorieAnnonceSlug(espece.categorie)}`} className="btn btn-ghost" style={{ marginRight: 12 }}>
            Voir les annonces {categorieAnnonceSlug(espece.categorie) === 'plantes' ? 'plantes' : 'vivant'}
          </Link>
          <Link href={`/biotope/${biotopeSlug(espece.categorie)}`} className="btn btn-ghost">
            Voir les annonces {biotopeSlug(espece.categorie) === 'eau-de-mer' ? "d'eau de mer" : biotopeSlug(espece.categorie) === 'bassin' ? 'de bassin' : "d'eau douce"}
          </Link>
        </div>
      )}

      <section style={{ maxWidth: 760, marginBottom: 48 }} aria-labelledby="faq-espece">
        <h2 id="faq-espece" style={{ fontSize: '1.2rem', marginBottom: 16 }}>
          Questions fréquentes sur {espece.nomCommun}
        </h2>
        {faq.map((q) => (
          <div key={q.question} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: '0.98rem', marginBottom: 6 }}>{q.question}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>{q.reponse}</p>
          </div>
        ))}
      </section>

      {autresEspeces.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <div className="section-head" style={{ marginBottom: 24 }}>
            <span className="eyebrow">Voir aussi ({espece.categorie})</span>
          </div>
          <div className="guide-grid">
            {autresEspeces.map((e) => (
              <Link key={e.slug} href={`/especes/${e.slug}`} className="guide-card">
                <span className="eyebrow">{e.categorie}</span>
                <h3>{e.nomCommun}</h3>
                {!nomsIdentiques(e.nomCommun, e.nomScientifique) && <p style={{ fontStyle: 'italic' }}>{e.nomScientifique}</p>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Retour bas de page */}
      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
        <Link href="/especes" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none',
        }}>
          ← Retour aux fiches espèces
        </Link>
      </div>

      <SignalementModal />
    </div>
  );
}
