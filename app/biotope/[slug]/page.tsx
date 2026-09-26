import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  fetchAnnoncesParBiotope,
  buildSlug,
  SLUG_VERS_BIOTOPE,
  BIOTOPE_VERS_SLUG,
} from '@/lib/annonces';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';

const SITE_URL = 'https://aquatopia.fr';
const PAR_PAGE = 24;

// Même principe que app/categorie/[slug]/page.tsx, mais sur la colonne
// `biotope` plutôt que `categorie` : Eau Douce / Eau de Mer / Bassin. Un
// contenu unique par biotope pour que ces pages ne soient pas de simples
// filtres, mais de vraies pages d'entrée sur le sujet.
const CONTENU: Record<
  string,
  { h1: string; intro: string; conseil: string; metaTitre: string; metaDescription: string }
> = {
  'eau-douce': {
    h1: "Aquariophilie d'eau douce",
    intro:
      "Le plus grand univers de l'aquariophilie : poissons (Guppy, Betta, Scalaire, Cichlidés, Ancistrus...), crevettes (Red Cherry, Caridina, Neocaridina), plantes et aquascaping, cuves et matériel dédié. Toutes les annonces d'eau douce, tous types confondus, publiées par des particuliers et éleveurs partout en France.",
    conseil:
      "Avant l'achat, vérifiez la compatibilité de l'espèce avec les paramètres de votre eau (pH, dureté, température) et la taille de votre aquarium — un vendeur sérieux pourra toujours vous renseigner sur ces points.",
    metaTitre: "Annonces aquariophilie eau douce — poissons, plantes, matériel",
    metaDescription:
      "Toutes les annonces d'eau douce sur Aquatopia : poissons, crevettes, plantes, cuves et matériel entre particuliers et éleveurs, partout en France.",
  },
  'eau-de-mer': {
    h1: "Aquariophilie récifale et marine",
    intro:
      "Poissons marins, boutures de coraux (LPS, SPS, mous), invertébrés (crevettes, crabes, bénitiers) et matériel spécifique au récifal (écumeurs, osmolateurs, brassage, éclairage full spectrum) : retrouvez ici toutes les annonces liées à l'eau de mer.",
    conseil:
      "Le récifal demande des paramètres stables (salinité, calcium, KH) : prenez le temps d'échanger avec le vendeur sur l'acclimatation de l'animal avant de le récupérer.",
    metaTitre: "Annonces récifal et eau de mer — poissons, coraux, matériel",
    metaDescription:
      "Annonces d'eau de mer et de récifal sur Aquatopia : poissons marins, coraux, invertébrés et matériel spécifique entre particuliers.",
  },
  bassin: {
    h1: "Bassins et poissons de bassin",
    intro:
      "Carpes Koï, poissons rouges, esturgeons, plantes de berge et de bassin, pompes et systèmes de filtration extérieurs : toutes les annonces liées aux bassins de jardin, de la simple mare aux bassins de Koï.",
    conseil:
      "La taille adulte de certaines espèces (Koï, esturgeons) est bien supérieure à leur taille en vente : vérifiez que votre bassin pourra les accueillir à long terme, et privilégiez une introduction au printemps ou en été.",
    metaTitre: "Annonces bassin — Koï, poissons rouges, plantes de bassin",
    metaDescription:
      "Annonces de poissons et plantes de bassin, matériel de filtration extérieur, entre particuliers sur Aquatopia.",
  },
};

export function generateStaticParams() {
  return Object.keys(SLUG_VERS_BIOTOPE).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}): Promise<Metadata> {
  const biotope = SLUG_VERS_BIOTOPE[params.slug];
  if (!biotope) return {};
  const contenu = CONTENU[params.slug];
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const suffixe = page > 1 ? ` — page ${page}` : '';
  const url = `/biotope/${params.slug}${page > 1 ? `?page=${page}` : ''}`;

  return {
    title: `${contenu.metaTitre}${suffixe}`,
    description: contenu.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${contenu.metaTitre}${suffixe} | Aquatopia`,
      description: contenu.metaDescription,
      url,
      type: 'website',
    },
  };
}

export const revalidate = 300;

export default async function BiotopePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const biotope = SLUG_VERS_BIOTOPE[params.slug];
  if (!biotope) notFound();
  const contenu = CONTENU[params.slug];

  const page = Math.max(1, Number(searchParams?.page) || 1);
  const offset = (page - 1) * PAR_PAGE;

  const { annonces, total } = await fetchAnnoncesParBiotope(biotope, { limit: PAR_PAGE, offset });
  const totalPages = Math.max(1, Math.ceil(total / PAR_PAGE));

  const autresBiotopes = Object.entries(BIOTOPE_VERS_SLUG).filter(([label]) => label !== biotope);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: contenu.h1,
    description: contenu.metaDescription,
    url: `${SITE_URL}/biotope/${params.slug}`,
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: biotope },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · {biotope}
      </div>

      <div className="section-head" style={{ marginBottom: 28 }}>
        <span className="eyebrow">Biotope</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{contenu.h1}</h1>
        <p style={{ marginTop: 14 }}>{contenu.intro}</p>
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
          {contenu.conseil}
        </p>
      </div>

      {annonces.length > 0 ? (
        <>
          <div className="annonce-grille-liens">
            {annonces.map((a) => (
              <Link key={a.id} href={`/annonce/${buildSlug(a)}`} className="annonce-card-mini">
                {a.photos?.[0] && <Image src={a.photos[0]} alt={a.titre} width={300} height={225} />}
                <div className="body">
                  <h4>{a.titre}</h4>
                  <span className="prix">{a.is_don ? 'Don' : a.is_echange ? 'Échange' : `${a.prix} €`}</span>
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
                <Link href={`/biotope/${params.slug}${page - 1 > 1 ? `?page=${page - 1}` : ''}`} className="btn btn-ghost">
                  ← Précédent
                </Link>
              ) : (
                <span />
              )}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-faint)' }}>
                Page {page} / {totalPages}
              </span>
              {page < totalPages ? (
                <Link href={`/biotope/${params.slug}?page=${page + 1}`} className="btn btn-ghost">
                  Suivant →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </>
      ) : (
        <p style={{ color: 'var(--text-muted)' }}>
          Aucune annonce dans ce biotope pour le moment. Téléchargez l&apos;application pour être alerté dès
          qu&apos;une nouvelle annonce est publiée.
        </p>
      )}

      <section style={{ marginTop: 64 }}>
        <p className="subcat-label eyebrow">Autres biotopes</p>
        <div className="subcat-row">
          {autresBiotopes.map(([label, slug]) => (
            <Link key={slug} href={`/biotope/${slug}`} className="subcat-chip">
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
