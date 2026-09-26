import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import DownloadButton from '@/components/DownloadButton';
import {
  fetchAnnonceParId,
  fetchAnnoncesActives,
  buildSlug,
  parseIdFromSlug,
  metaTitle,
  metaDescription,
  nomAffiche,
  typeTransactionLabel,
  CATEGORIE_VERS_SLUG,
  BIOTOPE_VERS_SLUG,
  type Annonce,
} from '@/lib/annonces';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';

// Rendu à la demande avec cache court : une annonce vendue il y a 2 minutes
// ne doit jamais rester indexée/affichée comme disponible plus de quelques
// minutes — voir la discussion sur l'export statique classique qui, lui,
// ne se met à jour qu'au redéploiement.
export const revalidate = 300;

async function getAnnonceOrNotFound(slug: string): Promise<Annonce> {
  const id = parseIdFromSlug(slug);
  if (id === null) notFound();
  const annonce = await fetchAnnonceParId(id);
  if (!annonce) notFound(); // vendue / désactivée / inexistante : jamais affichée ni indexée
  return annonce;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const annonce = await getAnnonceOrNotFound(params.slug);
  const title = metaTitle(annonce);
  const description = metaDescription(annonce);
  const url = `/annonce/${buildSlug(annonce)}`;
  const image = annonce.photos?.[0];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      // Les balises Open Graph n'héritent pas du title.template de
      // app/layout.tsx (contrairement à <title>) : le suffixe est donc
      // rajouté explicitement ici pour rester cohérent sur les partages.
      title: `${title} | Aquatopia`,
      description,
      url,
      images: image ? [image] : undefined,
      type: 'website',
    },
  };
}

export default async function AnnoncePage({ params }: { params: { slug: string } }) {
  const annonce = await getAnnonceOrNotFound(params.slug);

  // Canonicalise l'URL : si le texte du slug (titre/ville au moment du clic)
  // ne correspond plus à l'annonce actuelle, on redirige vers le slug à
  // jour plutôt que d'afficher une URL désynchronisée — l'ID en fin de slug
  // reste la seule chose qui compte pour retrouver l'annonce.
  const slugAJour = buildSlug(annonce);
  if (slugAJour !== params.slug) {
    redirect(`/annonce/${slugAJour}`);
  }

  const [autresAnnonces] = await Promise.all([
    fetchAnnoncesActives(80).then((liste) =>
      liste.filter((a) => a.id !== annonce.id && a.categorie === annonce.categorie).slice(0, 4)
    ),
  ]);

  const photos = annonce.photos?.length ? annonce.photos : [];
  const type = typeTransactionLabel(annonce);
  const nom = nomAffiche(annonce);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: annonce.titre,
    description: metaDescription(annonce),
    image: photos,
    category: annonce.categorie,
    offers: {
      '@type': 'Offer',
      price: annonce.is_don ? 0 : annonce.prix ?? 0,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      areaServed: annonce.ville ?? 'France',
    },
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: annonce.categorie, url: `/categorie/${CATEGORIE_VERS_SLUG[annonce.categorie] ?? ''}` },
    { name: annonce.biotope, url: `/biotope/${BIOTOPE_VERS_SLUG[annonce.biotope] ?? ''}` },
    { name: annonce.titre },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · {annonce.categorie} · {annonce.biotope}
      </div>

      <div className="annonce-grid">
        <div>
          <div className="annonce-gallery">
            {photos[0] && (
              <Image src={photos[0]} alt={annonce.titre} width={800} height={600} priority />
            )}
            {photos.length > 1 && (
              <div className="annonce-gallery-grid">
                {photos.slice(1, 5).map((url) => (
                  <Image key={url} src={url} alt={annonce.titre} width={200} height={200} />
                ))}
              </div>
            )}
          </div>

          <div className="annonce-badges">
            <span className="annonce-badge prix">{annonce.is_don ? 'Don' : annonce.is_echange ? 'Échange' : `${annonce.prix} €`}</span>
            <span className="annonce-badge">{annonce.biotope}</span>
            <span className="annonce-badge">{annonce.categorie}</span>
            {annonce.envoi_possible && <span className="annonce-badge">Envoi possible</span>}
          </div>

          <h1 className="annonce-title">{annonce.titre}</h1>
          {annonce.nom_scientifique && <p className="annonce-sous-titre">{annonce.nom_scientifique}</p>}

          <div className="annonce-meta">
            {annonce.ville && <span>📍 {annonce.ville}{annonce.code_postal ? ` (${annonce.code_postal})` : ''}</span>}
            {annonce.quantite ? <span>{annonce.quantite} spécimen{annonce.quantite > 1 ? 's' : ''}</span> : null}
            {annonce.volume && <span>{annonce.volume}</span>}
            {annonce.etat && <span>{annonce.etat}</span>}
          </div>

          {annonce.description && <p className="annonce-desc">{annonce.description}</p>}
        </div>

        <aside className="annonce-cta-card">
          <h3>{nom} {type}{annonce.ville ? ` à ${annonce.ville}` : ''}</h3>
          <p>
            Pour contacter le vendeur, échanger par messagerie et organiser une remise en main propre, ouvrez cette
            annonce dans l&apos;application gratuite Aquatopia.
          </p>
          <DownloadButton className="btn btn-primary">Ouvrir dans l&apos;app Aquatopia</DownloadButton>
        </aside>
      </div>

      {autresAnnonces.length > 0 && (
        <section style={{ marginTop: 64 }}>
          <div className="section-head" style={{ marginBottom: 24 }}>
            <span className="eyebrow">À voir aussi</span>
            <h2 style={{ fontSize: '1.3rem', marginTop: 10 }}>Autres annonces {annonce.categorie.toLowerCase()}</h2>
          </div>
          <div className="annonce-grille-liens">
            {autresAnnonces.map((a) => (
              <Link key={a.id} href={`/annonce/${buildSlug(a)}`} className="annonce-card-mini">
                {a.photos?.[0] && <Image src={a.photos[0]} alt={a.titre} width={300} height={225} />}
                <div className="body">
                  <h4>{a.titre}</h4>
                  <span className="prix">{a.is_don ? 'Don' : a.is_echange ? 'Échange' : `${a.prix} €`}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
