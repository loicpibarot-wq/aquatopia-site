import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import { buildSlug } from '@/lib/annonces';
import { chargerAnnoncesMarche, grouperDonsParEspece, type PageDonEspece } from '@/lib/marketplace-seo';
import AnnoncesLocales from '@/components/AnnoncesLocales';

const SITE_URL = 'https://aquatopia.fr';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    return grouperDonsParEspece(await chargerAnnoncesMarche()).map((p) => ({ espece: p.slug }));
  } catch {
    return [];
  }
}

async function trouver(slug: string): Promise<{ page: PageDonEspece; autres: PageDonEspece[] } | null> {
  const pages = grouperDonsParEspece(await chargerAnnoncesMarche());
  const page = pages.find((p) => p.slug === slug);
  if (!page) return null;
  return { page, autres: pages.filter((p) => p.slug !== slug).slice(0, 12) };
}

export async function generateMetadata({ params }: { params: { espece: string } }): Promise<Metadata> {
  const r = await trouver(params.espece).catch(() => null);
  if (!r) return { robots: { index: false } };
  const { page } = r;
  const titre = `${page.nom} à donner : annonces gratuites entre particuliers`;
  const description = `${page.annonces.length} annonces de ${page.nom.toLowerCase()} à donner gratuitement par des aquariophiles, partout en France. Remise en main propre, annonces vérifiées.`;
  const url = `/dons/${page.slug}`;
  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${titre} | Aquatopia`, description, url, type: 'website', images: ['/og-image.jpg'], siteName: 'Aquatopia', locale: 'fr_FR' },
  };
}

export default async function DonEspecePage({ params }: { params: { espece: string } }) {
  const r = await trouver(params.espece).catch(() => null);
  if (!r) notFound();
  const { page, autres } = r;
  const n = page.annonces.length;
  const nom = page.nom;
  const url = `${SITE_URL}/dons/${page.slug}`;

  const faq = [
    {
      q: `Où trouver des ${nom.toLowerCase()} à donner ?`,
      a: `Sur Aquatopia, des aquariophiles donnent régulièrement leurs ${nom.toLowerCase()} en surplus, souvent issus de leur propre élevage. ${n} annonces sont en ligne actuellement ; la remise se fait en main propre, près de chez vous.`,
    },
    {
      q: `Comment accueillir des ${nom.toLowerCase()} reçus en don ?`,
      a: `Vérifiez avant de les récupérer que votre aquarium ou votre bassin convient (volume, température, compatibilité), prévoyez un sac ou un seau propre pour le transport, puis acclimatez-les doucement. La fiche espèce détaille les paramètres à respecter.`,
    },
    {
      q: `Comment donner mes ${nom.toLowerCase()} ?`,
      a: `Publiez une annonce gratuite en choisissant le type « don », avec une photo et votre ville. Ne relâchez jamais d'animaux ou de plantes d'aquarium dans la nature.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${nom} à donner`,
    url,
    inLanguage: 'fr-FR',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: n,
      itemListElement: page.annonces.slice(0, 24).map((a, i) => ({
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
    { name: 'Dons', url: '/dons' },
    { name: `${nom} à donner` },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · <Link href="/dons">Dons</Link> · {nom}
      </div>

      <div className="section-head" style={{ marginBottom: 28 }}>
        <span className="eyebrow">{page.categorie}</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{nom} à donner</h1>
        <p style={{ marginTop: 14 }}>
          {n} annonces de {nom.toLowerCase()} sont actuellement données gratuitement par des aquariophiles sur Aquatopia. Les
          annonces sont vérifiées avant publication, et la remise se fait en main propre.{' '}
          <Link href={`/especes/${page.slug}`}>Voir la fiche espèce : {nom}</Link>
        </p>
      </div>

      <AnnoncesLocales annonces={page.annonces} />

      <section style={{ marginTop: 56, maxWidth: 760 }} aria-labelledby="faq-don">
        <h2 id="faq-don" style={{ fontSize: '1.2rem', marginBottom: 16 }}>Questions fréquentes</h2>
        {faq.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: '0.98rem', marginBottom: 6 }}>{q}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>{a}</p>
          </div>
        ))}

        {autres.length > 0 && (
          <>
            <p className="subcat-label eyebrow" style={{ marginTop: 28 }}>Autres espèces à donner</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
              {autres.map((p) => (
                <Link key={p.slug} href={`/dons/${p.slug}`} className="subcat-chip">
                  {p.nom} ({p.annonces.length})
                </Link>
              ))}
            </div>
          </>
        )}

        <p className="subcat-label eyebrow" style={{ marginTop: 28 }}>Aussi sur Aquatopia</p>
        <ul style={{ margin: '8px 0 0', paddingLeft: 18, lineHeight: 1.9 }}>
          <li><Link href="/dons">Toutes les annonces à donner</Link></li>
          <li><Link href="/guides/donner-aquarium-poissons-materiel">Donner son aquarium, ses poissons ou son matériel</Link></li>
          <li><Link href="/guides/acclimater-nouveau-poisson-aquarium">Acclimater un nouveau poisson</Link></li>
        </ul>
      </section>
    </div>
  );
}
