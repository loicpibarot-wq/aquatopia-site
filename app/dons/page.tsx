import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAnnoncesParType, buildSlug } from '@/lib/annonces';

const SITE_URL = 'https://aquatopia.fr';
const PAR_PAGE = 24;

const TITRE = 'Annonces à donner : poissons, plantes et matériel gratuits';
const DESCRIPTION =
  "Des passionnés donnent des poissons, plantes, crevettes ou du matériel d'aquariophilie dont ils n'ont plus besoin. Toutes catégories confondues, remise en main propre.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const suffixe = page > 1 ? ` — page ${page}` : '';
  const url = `/dons${page > 1 ? `?page=${page}` : ''}`;

  return {
    title: `${TITRE}${suffixe}`,
    description: DESCRIPTION,
    alternates: { canonical: url },
    openGraph: { title: `${TITRE}${suffixe} | Aquatopia`, description: DESCRIPTION, url, type: 'website' },
  };
}

export const revalidate = 300;

export default async function DonsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const offset = (page - 1) * PAR_PAGE;

  const { annonces, total } = await fetchAnnoncesParType('don', { limit: PAR_PAGE, offset });
  const totalPages = Math.max(1, Math.ceil(total / PAR_PAGE));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITRE,
    description: DESCRIPTION,
    url: `${SITE_URL}/dons`,
  };

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · Dons
      </div>

      <div className="section-head" style={{ marginBottom: 28 }}>
        <span className="eyebrow">Don</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{TITRE}</h1>
        <p style={{ marginTop: 14 }}>
          Toutes catégories confondues (vivant, plantes, matériel, cuves...), des passionnés donnent ce dont ils n&apos;ont
          plus besoin plutôt que de le jeter. Une bonne occasion de démarrer ou compléter son installation à moindre
          coût.
        </p>
      </div>

      <div
        style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '18px 22px',
          marginBottom: 36,
          maxWidth: 760,
        }}
      >
        <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          <b style={{ color: 'var(--text)' }}>À savoir : </b>
          Un don reste un engagement : vérifiez que vous pouvez accueillir l&apos;animal ou le matériel dans de bonnes
          conditions avant de contacter le donateur, et prévenez-le rapidement si vous n&apos;êtes plus disponible pour
          la remise.
        </p>
      </div>

      {annonces.length > 0 ? (
        <>
          <div className="annonce-grille-liens">
            {annonces.map((a) => (
              <Link key={a.id} href={`/annonce/${buildSlug(a)}`} className="annonce-card-mini">
                {a.photos?.[0] && <Image src={a.photos[0]} alt={a.titre} width={300} height={225} unoptimized />}
                <div className="body">
                  <h4>{a.titre}</h4>
                  <span className="prix">Don</span>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: 40 }}
            >
              {page > 1 ? (
                <Link href={`/dons${page - 1 > 1 ? `?page=${page - 1}` : ''}`} className="btn btn-ghost">
                  ← Précédent
                </Link>
              ) : (
                <span />
              )}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-faint)' }}>
                Page {page} / {totalPages}
              </span>
              {page < totalPages ? (
                <Link href={`/dons?page=${page + 1}`} className="btn btn-ghost">
                  Suivant →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </>
      ) : (
        <p style={{ color: 'var(--text-muted)' }}>Aucun don en cours pour le moment.</p>
      )}

      <section style={{ marginTop: 64 }}>
        <p className="subcat-label eyebrow">Voir aussi</p>
        <div className="subcat-row">
          <Link href="/echanges" className="subcat-chip">
            Échanges
          </Link>
          <Link href="/categorie/vivant" className="subcat-chip">
            Vivant
          </Link>
          <Link href="/categorie/materiel" className="subcat-chip">
            Matériel
          </Link>
        </div>
      </section>
    </div>
  );
}
