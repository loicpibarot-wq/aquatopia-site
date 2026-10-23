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
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import DownloadButton from '@/components/DownloadButton';

const SITE_URL = 'https://aquatopia.fr';
const PAR_PAGE = 8;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

const CONTENU: Record<
  string,
  {
    h1: string; intro: string; conseil: string; metaTitre: string; metaDescription: string;
    faq: { q: string; a: string }[];
    guides: { href: string; label: string }[];
  }
> = {
  vivant: {
    h1: 'Vivant : poissons, crevettes, coraux et invertébrés',
    intro:
      "Poissons d'eau douce (Guppy, Betta, Scalaire, Cichlidés, Ancistrus...), crevettes (Red Cherry, Caridina, Neocaridina), poissons marins et boutures de coraux (LPS/SPS), poissons de bassin (Koï, poissons rouges, esturgeons) et invertébrés divers : retrouvez ici les annonces d'animaux aquatiques à vendre, à donner ou à échanger, publiées par des particuliers, des éleveurs passionnés et des boutiques spécialisées.",
    conseil:
      "Avant de contacter un vendeur, assurez-vous que votre aquarium ou bassin est déjà cyclé et adapté aux besoins de l'espèce. L'envoi postal d'animaux vivants étant interdit par la loi, toutes les remises se font exclusivement en main propre, entre passionnés situés en France.",
    metaTitre: "Poissons d'aquarium à vendre — annonces entre particuliers",
    metaDescription:
      "Poissons d'aquarium, crevettes, coraux et invertébrés à vendre ou à donner entre particuliers et éleveurs. Annonces vérifiées, remise en main propre.",
    faq: [
      {
        q: "Où acheter des poissons d'aquarium à un particulier ?",
        a: "Sur Aquatopia, des particuliers et des éleveurs publient des poissons, crevettes, coraux et invertébrés à vendre. Les annonces sont vérifiées avant leur mise en ligne et la remise des animaux se fait en main propre.",
      },
      {
        q: "Comment vendre ses poissons d'aquarium ?",
        a: "Publiez une annonce avec des photos nettes, l'espèce, la quantité et votre ville. Notre équipe la vérifie, puis les acheteurs vous contactent par la messagerie pour convenir d'un rendez-vous.",
      },
      {
        q: "Peut-on donner des poissons gratuitement ?",
        a: "Oui, chaque annonce peut être un don. Vous trouverez aussi toutes les annonces gratuites sur la page des dons.",
      },
    ],
    guides: [
      { href: '/guides/acheter-poissons-aquarium-particulier', label: 'Acheter des poissons à un particulier' },
      { href: '/guides/vendre-ses-poissons-aquarium', label: "Vendre ses poissons d'aquarium" },
      { href: '/guides/acclimater-nouveau-poisson-aquarium', label: 'Acclimater un nouveau poisson' },
      { href: '/guides/bourse-aux-poissons-aquariophilie', label: 'Bourses aux poissons : comment ça marche' },
    ],
  },
  materiel: {
    h1: "Matériel d'aquariophilie neuf et d'occasion",
    intro:
      "Filtres externes, pompes de brassage, systèmes CO2, chauffages, régulateurs, osmolateurs, testeurs d'eau... Retrouvez le matériel nécessaire à l'entretien d'un aquarium ou d'un bassin, vendu en neuf ou en occasion par des particuliers et des boutiques spécialisées.",
    conseil:
      "Avant d'acheter du matériel d'occasion, vérifiez son état et son fonctionnement avec le vendeur — idéalement lors d'une remise en main propre. Certains vendeurs proposent aussi l'envoi partout en France.",
    metaTitre: "Matériel d'aquarium d'occasion — filtre, chauffage, éclairage",
    metaDescription:
      "Matériel d'aquarium d'occasion ou neuf entre particuliers : filtres, chauffages, pompes, CO2 et accessoires à vendre ou à donner près de chez vous.",
    faq: [
      {
        q: "Où trouver du matériel d'aquarium d'occasion ?",
        a: "Aquatopia réunit les annonces de particuliers : filtres, pompes, chauffages, systèmes CO2, éclairages et accessoires, classés par distance pour une remise en main propre.",
      },
      {
        q: "Comment vendre du matériel d'aquarium dont je n'ai plus besoin ?",
        a: "Photographiez le matériel en fonctionnement, indiquez sa marque, son âge et son état, puis publiez gratuitement votre annonce. Notre guide détaille comment bien la préparer.",
      },
    ],
    guides: [
      { href: '/guides/vendre-son-aquarium-occasion', label: "Vendre son aquarium et son matériel d'occasion" },
      { href: '/guides/aquarium-neuf-ou-occasion-comparatif', label: 'Aquarium neuf ou d’occasion : comparatif' },
      { href: '/guides/materiel-aquarium-occasion-filtre-chauffage', label: "Matériel d'occasion : filtre, chauffage, éclairage" },
      { href: '/guides/choisir-filtration-aquarium', label: 'Bien choisir sa filtration' },
    ],
  },
  cuves: {
    h1: "Aquariums et cuves d'occasion",
    intro:
      "Bacs nus ou équipés, de 30 à plus de 500 litres, pour l'eau douce, le récifal ou le bassin — trouvez l'aquarium qu'il vous faut parmi les annonces de particuliers publiées partout en France.",
    conseil:
      "Vérifiez l'étanchéité, l'état du silicone et l'ancienneté de la cuve avant l'achat, et privilégiez une remise en main propre pour tester le bac sur place.",
    metaTitre: "Aquarium d'occasion à vendre — 60, 100, 200 L, bacs équipés",
    metaDescription:
      "Aquariums d'occasion à vendre ou à donner entre particuliers : bacs nus ou équipés, de 30 à plus de 500 litres, près de chez vous.",
    faq: [
      {
        q: "Où acheter un aquarium d'occasion près de chez moi ?",
        a: "Sur Aquatopia, les annonces d'aquariums de particuliers sont classées par distance : vous pouvez voir et tester le bac sur place avant de l'acheter.",
      },
      {
        q: "Que vérifier avant d'acheter un aquarium d'occasion ?",
        a: "L'étanchéité, l'état du silicone, l'absence de rayures profondes ou d'éclats sur les vitres, et le fonctionnement des équipements fournis. Notre guide détaille tous les points à contrôler.",
      },
      {
        q: "Comment vendre son aquarium d'occasion ?",
        a: "Nettoyez-le, photographiez-le sous plusieurs angles, indiquez sa contenance, ses dimensions et ce qui est inclus, puis publiez gratuitement votre annonce.",
      },
    ],
    guides: [
      { href: '/guides/acheter-aquarium-occasion-verifications', label: "Acheter un aquarium d'occasion : points à vérifier" },
      { href: '/guides/aquarium-occasion-60-100-200-litres', label: 'Aquarium 60 L, 100 L ou 200 L : quel volume choisir ?' },
      { href: '/guides/aquarium-occasion-pas-cher-ou-trouver', label: "Aquarium d'occasion pas cher : où le trouver" },
      { href: '/guides/vendre-son-aquarium-occasion', label: "Vendre son aquarium d'occasion" },
      { href: '/guides/meilleur-aquarium-pour-debutant', label: 'Le meilleur aquarium pour débuter' },
    ],
  },
  plantes: {
    h1: "Plantes d'aquarium et d'aquascaping",
    intro:
      "Plantes d'eau douce, mousses (Java moss, Christmas moss), racines (Bogwood, Mangrove) et boutures — un rayon dédié aux amateurs de bacs plantés et d'aquascaping.",
    conseil:
      "Beaucoup de plantes se transmettent en petites quantités entre passionnés : n'hésitez pas à échanger avec le vendeur sur l'entretien et les paramètres d'eau avant de récupérer votre commande.",
    metaTitre: "Plantes d'aquarium à vendre ou à donner — aquascaping",
    metaDescription:
      "Plantes d'aquarium, mousses, racines et boutures à vendre ou à donner entre passionnés d'aquascaping, près de chez vous.",
    faq: [
      {
        q: "Où acheter des plantes d'aquarium entre particuliers ?",
        a: "Les passionnés proposent boutures, mousses et plantes d'eau douce sur Aquatopia, souvent à petit prix ou en don, avec une remise en main propre.",
      },
      {
        q: "Peut-on échanger des boutures de plantes ?",
        a: "Oui, les annonces peuvent être des ventes, des dons ou des échanges, ce qui convient bien aux boutures.",
      },
    ],
    guides: [
      { href: '/guides/plantes-faciles-aquarium-debutant', label: 'Plantes faciles pour débuter' },
      { href: '/guides/tailler-entretenir-plantes-aquarium', label: 'Tailler et entretenir ses plantes' },
    ],
  },
  eclairage: {
    h1: "Éclairages et rampes LED pour aquarium",
    intro:
      "Rampes LED, spots, tubes T5/T8, variateurs et minuteries — tout l'éclairage nécessaire à la photosynthèse des plantes, à la croissance des coraux ou simplement à la mise en valeur de votre aquarium.",
    conseil:
      "Le spectre et la puissance d'un éclairage dépendent du type de bac (planté, récifal, poissons) : vérifiez la compatibilité avec le vendeur avant l'achat.",
    metaTitre: "Rampe LED et éclairage d'aquarium d'occasion à vendre",
    metaDescription:
      "Rampes LED, spots et éclairages d'aquarium neufs ou d'occasion à vendre entre particuliers, près de chez vous.",
    faq: [
      {
        q: "Où acheter une rampe LED d'aquarium d'occasion ?",
        a: "Sur Aquatopia, des particuliers vendent rampes LED, spots, tubes et minuteries. Testez l'éclairage en main propre avant de l'acheter.",
      },
    ],
    guides: [
      { href: '/guides/eclairage-bac-plante-choisir', label: 'Choisir l’éclairage d’un bac planté' },
      { href: '/guides/led-vs-neon-eclairage-aquarium-comparatif', label: 'LED ou néon : le comparatif' },
    ],
  },
  decor: {
    h1: "Décors et substrats pour aquarium",
    intro:
      "Roches, racines, substrats techniques ou nutritifs, décors artificiels — tout pour composer un décor naturel et adapté à vos espèces.",
    conseil:
      "Certains matériaux naturels (roches, racines) doivent être préparés avant d'être immergés : demandez conseil au vendeur si c'est votre première utilisation.",
    metaTitre: "Décor d'aquarium à vendre — roches, racines, substrats",
    metaDescription:
      "Roches, racines, substrats et décors d'aquarium à vendre ou à donner entre particuliers, près de chez vous.",
    faq: [
      {
        q: "Où trouver des roches et des racines pour aquarium ?",
        a: "Les particuliers proposent sur Aquatopia roches, bois flotté, substrats et décors, souvent en lot, avec remise en main propre.",
      },
    ],
    guides: [
      { href: '/guides/bois-flotte-aquarium-preparation', label: 'Préparer un bois flotté' },
      { href: '/guides/roches-pierres-aquarium-lesquelles-choisir', label: 'Quelles roches choisir' },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(SLUG_VERS_CATEGORIE).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const categorie = SLUG_VERS_CATEGORIE[params.slug];
  if (!categorie) return {};
  const contenu = CONTENU[params.slug];
  const url = `/categorie/${params.slug}`;

  return {
    title: contenu.metaTitre,
    description: contenu.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${contenu.metaTitre} | Aquatopia`,
      description: contenu.metaDescription,
      url,
      type: 'website', images: ['/og-image.jpg'], siteName: 'Aquatopia', locale: 'fr_FR',
    },
  };
}

export const revalidate = 300;

export default async function CategoriePage({
  params,
}: {
  params: { slug: string };
}) {
  const categorie = SLUG_VERS_CATEGORIE[params.slug];
  if (!categorie) notFound();
  const contenu = CONTENU[params.slug];

  const { annonces, total } = await fetchAnnoncesParCategorie(categorie, { limit: PAR_PAGE });

  const autresCategories = Object.entries(CATEGORIE_VERS_SLUG).filter(([label]) => label !== categorie);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: contenu.h1,
    description: contenu.metaDescription,
    url: `${SITE_URL}/categorie/${params.slug}`,
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: categorie },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: contenu.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
                {a.photos?.[0] && <Image src={a.photos[0]} alt={a.titre} width={300} height={225} />}
                <div className="body">
                  <h4 style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{a.titre}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <span className="prix">{a.is_don ? 'Don' : a.is_echange ? 'Échange' : `${a.prix} €`}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)', flexShrink: 0 }}>{formatDate(a.created_at)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA téléchargement app */}
          <div style={{ marginTop: 32, textAlign: 'center', padding: '28px 20px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 16 }}>
            <p style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
              {total > PAR_PAGE
                ? `+${total - PAR_PAGE} autres annonces disponibles`
                : 'Toutes les annonces sur l\'app'}
            </p>
            <p style={{ margin: '0 0 22px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Téléchargez l&apos;application Aquatopia pour voir toutes les annonces,<br />
              être alerté des nouveautés et contacter les vendeurs.
            </p>
            <DownloadButton className="btn btn-primary" style={{ fontSize: '1rem', padding: '13px 36px' }}>
              Télécharger l&apos;application
            </DownloadButton>
          </div>
        </>
      ) : (
        <p style={{ color: 'var(--text-muted)' }}>
          Aucune annonce dans cette catégorie pour le moment. Téléchargez l&apos;application pour être alerté dès
          qu&apos;une nouvelle annonce est publiée.
        </p>
      )}

      <section style={{ marginTop: 56, maxWidth: 760 }} aria-labelledby="faq-categorie">
        <h2 id="faq-categorie" style={{ fontSize: '1.2rem', marginBottom: 16 }}>Questions fréquentes</h2>
        {contenu.faq.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: '0.98rem', marginBottom: 6 }}>{q}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>{a}</p>
          </div>
        ))}
        <p className="subcat-label eyebrow" style={{ marginTop: 28 }}>Nos guides pour bien acheter et vendre</p>
        <ul style={{ margin: '8px 0 0', paddingLeft: 18, lineHeight: 1.9 }}>
          {contenu.guides.map((g) => (
            <li key={g.href}><Link href={g.href}>{g.label}</Link></li>
          ))}
        </ul>
      </section>

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
