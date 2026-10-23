import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import { buildSlug } from '@/lib/annonces';
import { chargerAnnoncesLocales, grouperVilles, grouperDepartements, resumeCategories } from '@/lib/lieux';
import AnnoncesLocales from '@/components/AnnoncesLocales';

const SITE_URL = 'https://aquatopia.fr';

export const revalidate = 600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    return grouperDepartements(await chargerAnnoncesLocales()).map((d) => ({ departement: d.slug }));
  } catch {
    return [];
  }
}

async function trouver(slug: string) {
  const liste = await chargerAnnoncesLocales();
  const dept = grouperDepartements(liste).find((d) => d.slug === slug);
  if (!dept) return null;
  const villes = grouperVilles(liste).filter((v) => v.dep === dept.dep).slice(0, 12);
  return { dept, villes };
}

export async function generateMetadata({ params }: { params: { departement: string } }): Promise<Metadata> {
  const r = await trouver(params.departement);
  if (!r) return { robots: { index: false } };
  const { dept } = r;
  const titre = `Poissons d'aquarium à vendre : ${dept.nom} (${dept.dep})`;
  const description = `${dept.annonces.length} annonces d'aquariophilie en ${dept.nom} : poissons, crevettes, plantes, aquariums d'occasion et matériel entre particuliers. Gratuit, annonces vérifiées.`;
  const url = `/poissons-a-vendre/${dept.slug}`;
  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${titre} | Aquatopia`, description, url, type: 'website', images: ['/og-image.jpg'], siteName: 'Aquatopia', locale: 'fr_FR' },
  };
}

export default async function DepartementPage({ params }: { params: { departement: string } }) {
  const r = await trouver(params.departement);
  if (!r) notFound();
  const { dept, villes } = r;
  const n = dept.annonces.length;
  const dons = dept.annonces.filter((a) => a.is_don).length;
  const url = `${SITE_URL}/poissons-a-vendre/${dept.slug}`;

  const faq = [
    {
      q: `Où acheter des poissons d'aquarium en ${dept.nom} ?`,
      a: `Sur Aquatopia, des particuliers et des éleveurs du département (${dept.dep}) publient des poissons, des crevettes, des plantes et du matériel à vendre. Les annonces sont classées par distance et vérifiées avant leur mise en ligne.`,
    },
    {
      q: `Comment vendre mes poissons ou mon aquarium en ${dept.nom} ?`,
      a: `Publiez gratuitement une annonce avec des photos, l'espèce ou le volume, votre prix et votre ville. Les acheteurs du département vous contactent par la messagerie, puis la remise se fait en main propre.`,
    },
    {
      q: `Peut-on trouver des aquariums d'occasion en ${dept.nom} ?`,
      a: `Oui, la catégorie Aquariums rassemble des bacs d'occasion nus ou équipés. Les annonces proches de chez vous apparaissent en premier dans l'application.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Poissons d'aquarium à vendre en ${dept.nom}`,
    url,
    inLanguage: 'fr-FR',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: n,
      itemListElement: dept.annonces.slice(0, 24).map((a, i) => ({
        '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/annonce/${buildSlug(a)}`, name: a.titre,
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
    { name: dept.nom },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · <Link href="/aquarium-occasion">Annonces par ville</Link> · {dept.nom}
      </div>

      <div className="section-head" style={{ marginBottom: 28 }}>
        <span className="eyebrow">Département {dept.dep}</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>
          Poissons, aquariums et matériel à vendre en {dept.nom}
        </h1>
        <p style={{ marginTop: 14 }}>
          {n} annonces d&apos;aquariophilie sont actuellement en ligne en {dept.nom} : {resumeCategories(dept.annonces)}.
          {dons > 0 ? ` ${dons} ${dons > 1 ? 'sont proposées' : 'est proposée'} gratuitement.` : ''}
          {' '}Particuliers et éleveurs vendent, donnent ou échangent près de chez vous.
        </p>
      </div>

      {villes.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {villes.map((v) => (
            <Link key={v.slug} href={`/aquarium-occasion/${v.slug}`} className="subcat-chip">
              {v.nom} ({v.annonces.length})
            </Link>
          ))}
        </div>
      )}

      <AnnoncesLocales annonces={dept.annonces} />

      <section style={{ marginTop: 56, maxWidth: 760 }} aria-labelledby="faq-dept">
        <h2 id="faq-dept" style={{ fontSize: '1.2rem', marginBottom: 16 }}>Questions fréquentes en {dept.nom}</h2>
        {faq.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: '0.98rem', marginBottom: 6 }}>{q}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>{a}</p>
          </div>
        ))}
        <ul style={{ margin: '20px 0 0', paddingLeft: 18, lineHeight: 1.9 }}>
          <li><Link href="/categorie/vivant">Poissons, crevettes et coraux à vendre</Link></li>
          <li><Link href="/categorie/cuves">Aquariums d&apos;occasion</Link></li>
          <li><Link href="/guides/acheter-poissons-aquarium-particulier">Acheter des poissons à un particulier</Link></li>
          <li><Link href="/guides/vendre-ses-poissons-aquarium">Vendre ses poissons d&apos;aquarium</Link></li>
        </ul>
      </section>
    </div>
  );
}
