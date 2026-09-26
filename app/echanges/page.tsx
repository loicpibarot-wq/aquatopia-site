import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAnnoncesParType, buildSlug } from '@/lib/annonces';

const SITE_URL = 'https://aquatopia.fr';
const PAR_PAGE = 24;

const TITRE = 'Annonces à échanger : poissons, plantes et matériel';
const DESCRIPTION =
  "Échangez poissons, plantes, crevettes ou matériel d'aquariophilie contre d'autres espèces ou équipements, sans transaction d'argent. Toutes catégories confondues.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const suffixe = page > 1 ? ` — page ${page}` : '';
  const url = `/echanges${page > 1 ? `?page=${page}` : ''}`;

  return {
    title: `${TITRE}${suffixe}`,
    description: DESCRIPTION,
    alternates: { canonical: url },
    openGraph: { title: `${TITRE}${suffixe} | Aquatopia`, description: DESCRIPTION, url, type: 'website' },
  };
}

export const revalidate = 300;

export default async function EchangesPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const offset = (page - 1) * PAR_PAGE;

  const { annonces, total } = await fetchAnnoncesParType('echange', { limit: PAR_PAGE, offset });
  const totalPages = Math.max(1, Math.ceil(total / PAR_PAGE));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITRE,
    description: DESCRIPTION,
    url: `${SITE_URL}/echanges`,
  };

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · Échanges
      </div>

      <div className="section-head" style={{ marginBottom: 28 }}>
        <span className="eyebrow">Échange</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{TITRE}</h1>
        <p style={{ marginTop: 14 }}>
          Une bonne façon de renouveler son cheptel ou son matériel sans dépenser : de nombreux passionnés proposent
          leurs poissons, plantes ou équipements contre d&apos;autres espèces ou accessoires plutôt que contre de
          l&apos;argent.
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
          Précisez bien ce que vous recherchez en échange dans votre message au vendeur — les propositions les plus
          claires aboutissent le plus vite.
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
                  <span className="prix">Échange</span>
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
                <Link href={`/echanges${page - 1 > 1 ? `?page=${page - 1}` : ''}`} className="btn btn-ghost">
                  ← Précédent
                </Link>
              ) : (
                <span />
              )}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-faint)' }}>
                Page {page} / {totalPages}
              </span>
              {page < totalPages ? (
                <Link href={`/echanges?page=${page + 1}`} className="btn btn-ghost">
                  Suivant →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </>
      ) : (
        <p style={{ color: 'var(--text-muted)' }}>Aucun échange en cours pour le moment.</p>
      )}

      <section style={{ marginTop: 64 }}>
        <p className="subcat-label eyebrow">Voir aussi</p>
        <div className="subcat-row">
          <Link href="/dons" className="subcat-chip">
            Dons
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
