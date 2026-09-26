import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  fetchAnnoncesParCategorie,
  buildSlug,
  SLUG_VERS_CATEGORIE,
  CATEGORIE_VERS_SLUG,
} from '@/lib/annonces';

const SITE_URL = 'https://aquatopia.fr';
const PAR_PAGE = 24;

// Contenu unique par catégorie : sert à la fois de texte affiché sur la
// page (pour que chaque catégorie ait un vrai contenu utile, pas juste une
// grille d'annonces) et de base pour les balises meta. Ecrit une seule fois
// ici plutôt que dans le composant pour rester lisible.
const CONTENU: Record<
  string,
  { h1: string; intro: string; conseil: string; metaTitre: string; metaDescription: string }
> = {
  vivant: {
    h1: 'Vivant : poissons, crevettes, coraux et invertébrés',
    intro:
      "Poissons d'eau douce (Guppy, Betta, Scalaire, Cichlidés, Ancistrus...), crevettes (Red Cherry, Caridina, Neocaridina), poissons marins et boutures de coraux (LPS/SPS), poissons de bassin (Koï, poissons rouges, esturgeons) et invertébrés divers : retrouvez ici les annonces d'animaux aquatiques à vendre, à donner ou à échanger, publiées par des particuliers, des éleveurs passionnés et des boutiques spécialisées.",
    conseil:
      "Avant de contacter un vendeur, assurez-vous que votre aquarium ou bassin est déjà cyclé et adapté aux besoins de l'espèce. L'envoi postal d'animaux vivants étant interdit par la loi, toutes les remises se font exclusivement en main propre, entre passionnés situés en France.",
    metaTitre: "Poissons, crevettes, coraux d'occasion — annonces vivant",
    metaDescription:
      "Annonces de poissons, crevettes, coraux et invertébrés entre particuliers et éleveurs sur Aquatopia. Remise en main propre uniquement, annonces vérifiées.",
  },
  materiel: {
    h1: "Matériel d'aquariophilie neuf et d'occasion",
    intro:
      "Filtres externes, pompes de brassage, systèmes CO2, chauffages, régulateurs, osmolateurs, testeurs d'eau... Retrouvez le matériel nécessaire à l'entretien d'un aquarium ou d'un bassin, vendu en neuf ou en occasion par des particuliers et des boutiques spécialisées.",
    conseil:
      "Avant d'acheter du matériel d'occasion, vérifiez son état et son fonctionnement avec le vendeur — idéalement lors d'une remise en main propre. Certains vendeurs proposent aussi l'envoi partout en France.",
    metaTitre: "Matériel d'aquarium d'occasion — filtres, pompes, CO2",
    metaDescription:
      "Matériel d'aquariophilie neuf et d'occasion entre particuliers : filtres, pompes, chauffages, systèmes CO2 et accessoires sur Aquatopia.",
  },
  cuves: {
    h1: "Aquariums et cuves d'occasion",
    intro:
      "Bacs nus ou équipés, de 30 à plus de 500 litres, pour l'eau douce, le récifal ou le bassin — trouvez l'aquarium qu'il vous faut parmi les annonces de particuliers publiées partout en France.",
    conseil:
      "Vérifiez l'étanchéité, l'état du silicone et l'ancienneté de la cuve avant l'achat, et privilégiez une remise en main propre pour tester le bac sur place.",
    metaTitre: "Aquariums et cuves d'occasion — bacs nus ou équipés",
    metaDescription:
      "Annonces d'aquariums et de cuves d'occasion (nues ou équipées), toutes tailles, entre particuliers sur Aquatopia.",
  },
  plantes: {
    h1: "Plantes d'aquarium et d'aquascaping",
    intro:
      "Plantes d'eau douce, mousses (Java moss, Christmas moss), racines (Bogwood, Mangrove) et boutures — un rayon dédié aux amateurs de bacs plantés et d'aquascaping.",
    conseil:
      "Beaucoup de plantes se transmettent en petites quantités entre passionnés : n'hésitez pas à échanger avec le vendeur sur l'entretien et les paramètres d'eau avant de récupérer votre commande.",
    metaTitre: "Plantes d'aquarium d'occasion — aquascaping",
    metaDescription:
      "Plantes d'eau douce, mousses, racines et boutures entre passionnés d'aquascaping sur Aquatopia.",
  },
  eclairage: {
    h1: "Éclairages et rampes LED pour aquarium",
    intro:
      "Rampes LED, spots, tubes T5/T8, variateurs et minuteries — tout l'éclairage nécessaire à la photosynthèse des plantes, à la croissance des coraux ou simplement à la mise en valeur de votre aquarium.",
    conseil:
      "Le spectre et la puissance d'un éclairage dépendent du type de bac (planté, récifal, poissons) : vérifiez la compatibilité avec le vendeur avant l'achat.",
    metaTitre: "Éclairage et rampes LED d'aquarium d'occasion",
    metaDescription:
      "Rampes LED, spots et éclairages d'aquarium neufs ou d'occasion entre particuliers sur Aquatopia.",
  },
  decor: {
    h1: "Décors et substrats pour aquarium",
    intro:
      "Roches, racines, substrats techniques ou nutritifs, décors artificiels — tout pour composer un décor naturel et adapté à vos espèces.",
    conseil:
      "Certains matériaux naturels (roches, racines) doivent être préparés avant d'être immergés : demandez conseil au vendeur si c'est votre première utilisation.",
    metaTitre: "Décors et substrats d'aquarium d'occasion",
    metaDescription:
      "Roches, racines, substrats et décors d'aquarium entre particuliers sur Aquatopia.",
  },
};

export function generateStaticParams() {
  return Object.keys(SLUG_VERS_CATEGORIE).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}): Promise<Metadata> {
  const categorie = SLUG_VERS_CATEGORIE[params.slug];
  if (!categorie) return {};
  const contenu = CONTENU[params.slug];
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const suffixe = page > 1 ? ` — page ${page}` : '';
  const url = `/categorie/${params.slug}${page > 1 ? `?page=${page}` : ''}`;

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

// Régénéré régulièrement : une nouvelle annonce ou une annonce vendue doit
// se refléter sans attendre un redéploiement (même logique que les pages
// d'annonce individuelles).
export const revalidate = 300;

export default async function CategoriePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const categorie = SLUG_VERS_CATEGORIE[params.slug];
  if (!categorie) notFound();
  const contenu = CONTENU[params.slug];

  const page = Math.max(1, Number(searchParams?.page) || 1);
  const offset = (page - 1) * PAR_PAGE;

  const { annonces, total } = await fetchAnnoncesParCategorie(categorie, { limit: PAR_PAGE, offset });
  const totalPages = Math.max(1, Math.ceil(total / PAR_PAGE));

  // Si la page demandée dépasse le nombre de pages disponibles (ex: lien
  // partagé vers ?page=9 alors qu'il n'y a plus assez d'annonces), on
  // affiche quand même l'état "aucune annonce" plutôt qu'une 404 : ce n'est
  // pas une erreur, juste un filtre qui ne renvoie rien pour l'instant.
  const autresCategories = Object.entries(CATEGORIE_VERS_SLUG).filter(([label]) => label !== categorie);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: contenu.h1,
    description: contenu.metaDescription,
    url: `${SITE_URL}/categorie/${params.slug}`,
  };

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · {categorie}
      </div>

      <div className="section-head" style={{ marginBottom: 28 }}>
        <span className="eyebrow">Catégorie</span>
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
                {a.photos?.[0] && <Image src={a.photos[0]} alt={a.titre} width={300} height={225} unoptimized />}
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
                <Link href={`/categorie/${params.slug}${page - 1 > 1 ? `?page=${page - 1}` : ''}`} className="btn btn-ghost">
                  ← Précédent
                </Link>
              ) : (
                <span />
              )}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-faint)' }}>
                Page {page} / {totalPages}
              </span>
              {page < totalPages ? (
                <Link href={`/categorie/${params.slug}?page=${page + 1}`} className="btn btn-ghost">
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
          Aucune annonce dans cette catégorie pour le moment. Téléchargez l&apos;application pour être alerté dès
          qu&apos;une nouvelle annonce est publiée.
        </p>
      )}

      <section style={{ marginTop: 64 }}>
        <p className="subcat-label eyebrow">Autres catégories</p>
        <div className="subcat-row">
          {autresCategories.map(([label, slug]) => (
            <Link key={slug} href={`/categorie/${slug}`} className="subcat-chip">
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
