import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import { buildSlug } from '@/lib/annonces';
import { chargerAnnoncesMarche, grouperVolumes, fourchettePrix, type PageVolume } from '@/lib/marketplace-seo';
import AnnoncesLocales from '@/components/AnnoncesLocales';

const SITE_URL = 'https://aquatopia.fr';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    return grouperVolumes(await chargerAnnoncesMarche()).map((p) => ({ volume: p.slug }));
  } catch {
    return [];
  }
}

async function trouver(slug: string): Promise<{ page: PageVolume; autres: PageVolume[] } | null> {
  const pages = grouperVolumes(await chargerAnnoncesMarche());
  const page = pages.find((p) => p.slug === slug);
  if (!page) return null;
  return { page, autres: pages.filter((p) => p.slug !== slug) };
}

const titrePage = (p: PageVolume) => `Aquarium ${p.libelle} d'occasion`;

export async function generateMetadata({ params }: { params: { volume: string } }): Promise<Metadata> {
  const r = await trouver(params.volume).catch(() => null);
  if (!r) return { robots: { index: false } };
  const { page } = r;
  const titre = `${titrePage(page)} : annonces entre particuliers`;
  const description = `${page.annonces.length} aquariums de ${page.min} à ${page.max >= 5000 ? 'plus de 500' : page.max} litres d'occasion à vendre, donner ou échanger entre particuliers, partout en France. Annonces vérifiées, remise en main propre.`;
  const url = `/aquarium-occasion/volume/${page.slug}`;
  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${titre} | Aquatopia`, description, url, type: 'website', images: ['/og-image.jpg'], siteName: 'Aquatopia', locale: 'fr_FR' },
  };
}

export default async function VolumePage({ params }: { params: { volume: string } }) {
  const r = await trouver(params.volume).catch(() => null);
  if (!r) notFound();
  const { page, autres } = r;
  const n = page.annonces.length;
  const prix = fourchettePrix(page.annonces);
  const dons = page.annonces.filter((a) => a.is_don).length;
  const plage = page.max >= 5000 ? `plus de ${page.min - 1} litres` : `${page.min} à ${page.max} litres`;
  const url = `${SITE_URL}/aquarium-occasion/volume/${page.slug}`;

  const faq = [
    {
      q: `Quel prix pour un aquarium de ${page.libelle} d'occasion ?`,
      a: prix
        ? `Sur les annonces en ligne actuellement, les aquariums de ${plage} sont proposés entre ${prix.min} € et ${prix.max} €, pour un prix médian de ${prix.median} €. Le prix dépend surtout de ce qui est inclus (meuble, filtre, éclairage, décor) et de l'état du bac.`
        : `Le prix dépend surtout du volume exact, de ce qui est inclus (meuble, filtre, éclairage, décor) et de l'état du bac. Comparez plusieurs annonces avant de vous décider.`,
    },
    {
      q: "Que vérifier avant d'acheter un aquarium d'occasion ?",
      a: "Contrôlez les joints de silicone (ni décollés ni noircis), l'absence de rayures profondes et d'éclats sur les vitres, et faites fonctionner le matériel devant vous. Prévoyez aussi le transport : un bac se transporte toujours vide.",
    },
    {
      q: `Comment vendre mon aquarium de ${page.libelle} ?`,
      a: "Publiez gratuitement une annonce avec des photos nettes, le volume exact, les dimensions, ce qui est inclus et votre prix. Les acheteurs proches de chez vous vous contactent par la messagerie, puis la remise se fait en main propre.",
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: titrePage(page),
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
    { name: "Aquariums d'occasion", url: '/categorie/cuves' },
    { name: titrePage(page) },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · <Link href="/categorie/cuves">Aquariums d&apos;occasion</Link> · {page.libelle}
      </div>

      <div className="section-head" style={{ marginBottom: 28 }}>
        <span className="eyebrow">{plage}</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{titrePage(page)}</h1>
        <p style={{ marginTop: 14 }}>
          {n} aquariums de {plage} sont actuellement proposés par des particuliers sur Aquatopia
          {prix ? `, entre ${prix.min} € et ${prix.max} € (prix médian : ${prix.median} €)` : ''}.
          {dons > 0 ? ` ${dons} ${dons > 1 ? 'sont donnés' : 'est donné'} gratuitement.` : ''} Les annonces sont vérifiées avant
          publication, et la remise se fait en main propre.
        </p>
      </div>

      <AnnoncesLocales annonces={page.annonces} />

      <section style={{ marginTop: 56, maxWidth: 760 }} aria-labelledby="faq-volume">
        <h2 id="faq-volume" style={{ fontSize: '1.2rem', marginBottom: 16 }}>Questions fréquentes</h2>
        {faq.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: '0.98rem', marginBottom: 6 }}>{q}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>{a}</p>
          </div>
        ))}

        {autres.length > 0 && (
          <>
            <p className="subcat-label eyebrow" style={{ marginTop: 28 }}>Autres volumes</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
              {autres.map((p) => (
                <Link key={p.slug} href={`/aquarium-occasion/volume/${p.slug}`} className="subcat-chip">
                  {p.libelle} ({p.annonces.length})
                </Link>
              ))}
            </div>
          </>
        )}

        <p className="subcat-label eyebrow" style={{ marginTop: 28 }}>Aussi sur Aquatopia</p>
        <ul style={{ margin: '8px 0 0', paddingLeft: 18, lineHeight: 1.9 }}>
          <li><Link href="/guides/acheter-aquarium-occasion-verifications">Acheter un aquarium d&apos;occasion : points à vérifier</Link></li>
          <li><Link href="/guides/aquarium-occasion-60-100-200-litres">Aquarium 60 L, 100 L ou 200 L : quel volume choisir ?</Link></li>
          <li><Link href="/aquarium-occasion">Annonces par ville et département</Link></li>
          <li><Link href="/guides/vendre-son-aquarium-occasion">Vendre son aquarium d&apos;occasion</Link></li>
        </ul>
      </section>
    </div>
  );
}
