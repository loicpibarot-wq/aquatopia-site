import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import { buildSlug } from '@/lib/annonces';
import {
  chargerAnnoncesLocales, grouperVilles, grouperDepartements, resumeCategories,
  DEPARTEMENTS, slugDepartement, type Lieu,
} from '@/lib/lieux';
import AnnoncesLocales from '@/components/AnnoncesLocales';

const SITE_URL = 'https://aquatopia.fr';

export const revalidate = 600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    return grouperVilles(await chargerAnnoncesLocales()).map((v) => ({ ville: v.slug }));
  } catch {
    return [];
  }
}

async function trouver(slug: string): Promise<{ ville: Lieu; voisines: Lieu[]; deptAvecPage: boolean } | null> {
  const liste = await chargerAnnoncesLocales();
  const villes = grouperVilles(liste);
  const ville = villes.find((v) => v.slug === slug);
  if (!ville) return null;
  const voisines = villes.filter((v) => v.dep === ville.dep && v.slug !== ville.slug).slice(0, 8);
  const deptAvecPage = grouperDepartements(liste).some((d) => d.dep === ville.dep);
  return { ville, voisines, deptAvecPage };
}

export async function generateMetadata({ params }: { params: { ville: string } }): Promise<Metadata> {
  const r = await trouver(params.ville);
  if (!r) return { robots: { index: false } };
  const { ville } = r;
  const n = ville.annonces.length;
  const titre = `Aquarium d'occasion à ${ville.nom} (${ville.dep}) : poissons, matériel`;
  const description = `${n} annonces d'aquariophilie à ${ville.nom} : aquariums d'occasion, poissons, plantes et matériel entre particuliers. Gratuit, annonces vérifiées avant publication.`;
  const url = `/aquarium-occasion/${ville.slug}`;
  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${titre} | Aquatopia`, description, url, type: 'website', images: ['/og-image.jpg'], siteName: 'Aquatopia', locale: 'fr_FR' },
  };
}

export default async function VillePage({ params }: { params: { ville: string } }) {
  const r = await trouver(params.ville);
  if (!r) notFound();
  const { ville, voisines, deptAvecPage } = r;
  const n = ville.annonces.length;
  const depNom = DEPARTEMENTS[ville.dep];
  const dons = ville.annonces.filter((a) => a.is_don).length;
  const resume = resumeCategories(ville.annonces);
  const url = `${SITE_URL}/aquarium-occasion/${ville.slug}`;

  const faq = [
    {
      q: `Où trouver un aquarium d'occasion à ${ville.nom} ?`,
      a: `Sur Aquatopia, des particuliers de ${ville.nom} et des environs publient des aquariums d'occasion, du matériel, des poissons et des plantes. Les annonces sont classées par distance et vérifiées par l'équipe avant leur mise en ligne.`,
    },
    {
      q: `Comment vendre mon aquarium ou mes poissons à ${ville.nom} ?`,
      a: `Publiez gratuitement une annonce avec des photos, le volume ou l'espèce, votre prix et votre ville. Les acheteurs de ${ville.nom} et des environs vous contactent par la messagerie, puis la remise se fait en main propre.`,
    },
    {
      q: `Peut-on donner ou échanger du matériel d'aquarium à ${ville.nom} ?`,
      a: `Oui : chaque annonce peut être une vente, un don ou un échange. Vous pouvez aussi consulter les annonces à donner et les annonces d'échange sur Aquatopia.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Aquarium d'occasion à ${ville.nom}`,
    url,
    inLanguage: 'fr-FR',
    about: `Annonces d'aquariophilie à ${ville.nom} (${depNom})`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: n,
      itemListElement: ville.annonces.slice(0, 24).map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/annonce/${buildSlug(a)}`,
        name: a.titre,
      })),
    },
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Annonces par ville', url: '/aquarium-occasion' },
    { name: ville.nom },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · <Link href="/aquarium-occasion">Annonces par ville</Link> · {ville.nom}
      </div>

      <div className="section-head" style={{ marginBottom: 28 }}>
        <span className="eyebrow">{depNom} ({ville.dep})</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>
          Aquarium d&apos;occasion, poissons et matériel à {ville.nom}
        </h1>
        <p style={{ marginTop: 14 }}>
          {n} annonces d&apos;aquariophilie sont actuellement en ligne à {ville.nom} : {resume}.
          {dons > 0 ? ` ${dons} ${dons > 1 ? 'sont proposées' : 'est proposée'} gratuitement.` : ''}
          {' '}Particuliers et éleveurs vendent, donnent ou échangent près de chez vous, avec remise en main propre.
        </p>
      </div>

      <AnnoncesLocales annonces={ville.annonces} />

      <section style={{ marginTop: 56, maxWidth: 760 }} aria-labelledby="faq-ville">
        <h2 id="faq-ville" style={{ fontSize: '1.2rem', marginBottom: 16 }}>Questions fréquentes à {ville.nom}</h2>
        {faq.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: '0.98rem', marginBottom: 6 }}>{q}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>{a}</p>
          </div>
        ))}

        <p className="subcat-label eyebrow" style={{ marginTop: 28 }}>Aussi sur Aquatopia</p>
        <ul style={{ margin: '8px 0 0', paddingLeft: 18, lineHeight: 1.9 }}>
          {deptAvecPage && (
            <li><Link href={`/poissons-a-vendre/${slugDepartement(ville.dep)}`}>Poissons et matériel à vendre en {depNom}</Link></li>
          )}
          <li><Link href="/categorie/cuves">Aquariums d&apos;occasion</Link></li>
          <li><Link href="/categorie/vivant">Poissons, crevettes et coraux à vendre</Link></li>
          <li><Link href="/guides/acheter-aquarium-occasion-verifications">Acheter un aquarium d&apos;occasion : points à vérifier</Link></li>
          <li><Link href="/guides/deposer-annonce-aquariophilie-gratuite">Déposer une annonce gratuite</Link></li>
        </ul>

        {voisines.length > 0 && (
          <>
            <p className="subcat-label eyebrow" style={{ marginTop: 28 }}>Autres villes en {depNom}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
              {voisines.map((v) => (
                <Link key={v.slug} href={`/aquarium-occasion/${v.slug}`} className="subcat-chip">
                  {v.nom} ({v.annonces.length})
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
