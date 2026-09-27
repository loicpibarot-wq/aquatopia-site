import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ESPECES_PUBLIEES, fetchEspeceParSlug, categorieAnnonceSlug, biotopeSlug } from '@/lib/especes';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';

const SITE_URL = 'https://aquatopia.fr';

export function generateStaticParams() {
  return ESPECES_PUBLIEES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const espece = fetchEspeceParSlug(params.slug);
  if (!espece) return {};
  const titre = `${espece.nomCommun} (${espece.nomScientifique}) : fiche technique`;
  const description = `${espece.nomCommun} : volume minimum ${espece.fiche.volumeMinLitres ? `${espece.fiche.volumeMinLitres} L` : 'non applicable'}, pH ${espece.fiche.phMin ?? '?'}-${espece.fiche.phMax ?? '?'}, température ${espece.fiche.tempMin ?? '?'}-${espece.fiche.tempMax ?? '?'}°C. Compatibilité, alimentation et conseils d'entretien.`;
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

  const autresEspeces = ESPECES_PUBLIEES.filter(
    (e) => e.slug !== espece.slug && e.categorie === espece.categorie,
  ).slice(0, 4);

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Espèces', url: '/especes' },
    { name: espece.nomCommun },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · <Link href="/especes">Espèces</Link> · {espece.nomCommun}
      </div>

      <div className="section-head" style={{ marginBottom: 8, maxWidth: 760 }}>
        <span className="eyebrow">{espece.categorie}</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{espece.nomCommun}</h1>
        <p style={{ marginTop: 6, fontStyle: 'italic', color: 'var(--text-muted)' }}>{espece.nomScientifique}</p>
      </div>

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
                : espece.statutLegal === 'cites_a_signaler'
                  ? '⚠ Espèce réglementée (CITES) — déclaration obligatoire. '
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
        <div className="espece-fact">
          <span>Volume minimum</span>
          <strong>{fiche.volumeMinLitres ? `${fiche.volumeMinLitres} L` : 'Non applicable'}</strong>
        </div>
        <div className="espece-fact">
          <span>Groupe minimum</span>
          <strong>
            {fiche.tailleGroupeMin ? `${fiche.tailleGroupeMin} individu${fiche.tailleGroupeMin > 1 ? 's' : ''}` : 'Non applicable'}
          </strong>
        </div>
        <div className="espece-fact">
          <span>pH idéal</span>
          <strong>{fiche.phMin !== null && fiche.phMax !== null ? `${fiche.phMin} – ${fiche.phMax}` : 'Non applicable'}</strong>
        </div>
        <div className="espece-fact">
          <span>Température</span>
          <strong>{fiche.tempMin !== null && fiche.tempMax !== null ? `${fiche.tempMin} – ${fiche.tempMax}°C` : 'Non applicable'}</strong>
        </div>
        <div className="espece-fact">
          <span>Taille adulte</span>
          <strong style={{ fontSize: '0.95rem' }}>{fiche.tailleAdulte}</strong>
        </div>
        <div className="espece-fact">
          <span>Difficulté</span>
          <strong>{fiche.difficulte}</strong>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 760, marginBottom: 32 }}>
        <div>
          <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>Compatible avec</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{fiche.compatibilite}</p>
        </div>
        <div>
          <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>À éviter</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{fiche.incompatibilite}</p>
        </div>
        <div>
          <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>Alimentation</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{fiche.alimentation}</p>
        </div>
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

      {espece.statutLegal === 'autorise' && (
        <div style={{ marginBottom: 48 }}>
          <Link href={`/categorie/${categorieAnnonceSlug(espece.categorie)}`} className="btn btn-ghost" style={{ marginRight: 12 }}>
            Voir les annonces {espece.categorie === 'Plantes' ? 'plantes' : 'vivant'}
          </Link>
          <Link href={`/biotope/${biotopeSlug(espece.categorie)}`} className="btn btn-ghost">
            Voir les annonces {biotopeSlug(espece.categorie) === 'eau-de-mer' ? "d'eau de mer" : biotopeSlug(espece.categorie) === 'bassin' ? 'de bassin' : "d'eau douce"}
          </Link>
        </div>
      )}

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
                <p style={{ fontStyle: 'italic' }}>{e.nomScientifique}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
