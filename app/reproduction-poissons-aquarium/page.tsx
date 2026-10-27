import type { Metadata } from 'next';
import Link from 'next/link';
import { ESPECES_PUBLIEES, type CategorieEspece } from '@/lib/especes';
import { REPRODUCTIONS, type NiveauRepro } from '@/lib/especes-reproduction';
import { nomsIdentiques } from '@/lib/especes-seo';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import CarteEspeceLiee from '@/components/CarteEspeceLiee';

const SITE_URL = 'https://aquatopia.fr';
const TITRE = "Reproduction des poissons d'aquarium : guides pas à pas";
const DESCRIPTION =
  "Quels poissons d'eau douce, d'eau de mer et de bassin se reproduisent en aquarium ? Guides étape par étape, matériel, élevage des alevins et espèces à ne pas tenter.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/reproduction-poissons-aquarium' },
  openGraph: {
    title: `${TITRE} | Aquatopia`,
    description: DESCRIPTION,
    url: '/reproduction-poissons-aquarium',
    type: 'website',
    images: ['/og-image.jpg'],
    siteName: 'Aquatopia',
    locale: 'fr_FR',
  },
};

const MILIEUX: { cle: string; titre: string; categories: CategorieEspece[] }[] = [
  { cle: 'eau-douce', titre: 'Poissons d’eau douce', categories: ['Eau Douce'] },
  { cle: 'eau-de-mer', titre: 'Poissons d’eau de mer', categories: ['Poissons marins'] },
  { cle: 'bassin', titre: 'Poissons de bassin', categories: ['Bassin'] },
];

const GROUPES: { cle: string; titre: string; intro: string; niveaux: NiveauRepro[] }[] = [
  {
    cle: 'faciles',
    titre: 'Faciles à reproduire',
    intro: 'Niveaux « très facile » et « facile » : quelques conditions suffisent, souvent sans matériel particulier.',
    niveaux: ['Très facile', 'Facile'],
  },
  {
    cle: 'moderes',
    titre: 'Demandent un peu d’expérience',
    intro: 'Niveau « modéré » : un bac dédié, de la préparation et de la patience.',
    niveaux: ['Modérée'],
  },
  {
    cle: 'difficiles',
    titre: 'Réservés aux éleveurs expérimentés',
    intro: 'Niveaux « difficile » et « très difficile » : les adultes pondent, mais les jeunes exigent un savoir-faire spécialisé.',
    niveaux: ['Difficile', 'Très difficile'],
  },
];

// Première phrase du résumé, pour la carte.
function extrait(texte: string): string {
  const m = texte.match(/^.+?[.!?](\s|$)/);
  const p = (m ? m[0] : texte).trim();
  return p.length <= 170 ? p : `${p.slice(0, 167).replace(/\s+\S*$/, '')}…`;
}

const enumeration = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} et ${items[items.length - 1]}`;

export default function ReproductionPoissonsPage() {
  const avecFiche = ESPECES_PUBLIEES.flatMap((e) => {
    const r = REPRODUCTIONS[e.slug];
    return r ? [{ espece: e, repro: r }] : [];
  }).sort((a, b) => a.espece.nomCommun.localeCompare(b.espece.nomCommun, 'fr'));

  const faisables = avecFiche.filter((p) => p.repro.faisable);
  const nonFaisables = avecFiche.filter((p) => !p.repro.faisable);

  const sections = GROUPES.map((g) => ({
    ...g,
    milieux: MILIEUX.map((m) => ({
      ...m,
      poissons: faisables.filter((p) => g.niveaux.includes(p.repro.niveau) && m.categories.includes(p.espece.categorie)),
    })).filter((m) => m.poissons.length > 0),
    total: faisables.filter((p) => g.niveaux.includes(p.repro.niveau)).length,
  })).filter((g) => g.total > 0);

  const tresFaciles = faisables.filter((p) => p.repro.niveau === 'Très facile').map((p) => p.espece.nomCommun);
  const marinsFaisables = faisables.filter((p) => p.espece.categorie === 'Poissons marins');
  const marinsTotal = avecFiche.filter((p) => p.espece.categorie === 'Poissons marins').length;

  const faq = [
    {
      question: "Quels poissons d'aquarium sont les plus faciles à reproduire ?",
      reponse: tresFaciles.length
        ? `Les poissons notés « très facile » sont : ${enumeration(tresFaciles)}. Chaque fiche détaille le matériel, les étapes et l'élevage des alevins.`
        : "Consultez les fiches notées « facile » : chacune détaille le matériel, les étapes et l'élevage des alevins.",
    },
    {
      question: 'Peut-on reproduire des poissons marins en aquarium ?',
      reponse: `Pour quelques espèces seulement : ${marinsFaisables.length} poissons marins sur ${marinsTotal} ont un guide de reproduction, parmi lesquels ${enumeration(marinsFaisables.slice(0, 6).map((p) => p.espece.nomCommun.toLowerCase()))}. Les larves de la plupart des poissons marins sont minuscules et demandent des cultures de rotifères ou de copépodes. Pour les autres espèces, la fiche l'indique honnêtement.`,
    },
    {
      question: 'Comment est notée la difficulté de reproduction ?',
      reponse:
        "Le niveau va de très facile (l'espèce se reproduit spontanément) à très difficile (matériel et savoir-faire spécialisés). Chaque guide est rédigé d'après des sources publiques d'aquariophilie et de zoologie, et le niveau est un jugement éditorial d'Aquatopia.",
    },
    {
      question: 'Que faire des alevins après la naissance ou la ponte ?',
      reponse:
        "Cela dépend de l'espèce : chaque fiche précise la nourriture des jeunes (poudre d'aliment, nauplies d'artémia, rotifères) et s'il faut les séparer des adultes. Pour les espèces dont l'élevage n'est pas réalisable à la maison, la fiche l'explique.",
    },
  ];

  const jsonLdListe = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITRE,
    description: DESCRIPTION,
    url: `${SITE_URL}/reproduction-poissons-aquarium`,
    inLanguage: 'fr-FR',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: faisables.length,
      itemListElement: faisables.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/especes/${p.espece.slug}#reproduction`,
        name: `Comment faire se reproduire ${p.espece.nomCommun} ?`,
      })),
    },
  };
  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.reponse },
    })),
  };

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Espèces', url: '/especes' },
    { name: 'Reproduction des poissons' },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdListe) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · <Link href="/especes">Espèces</Link> · Reproduction des poissons
      </div>

      <div className="section-head" style={{ marginBottom: 24 }}>
        <span className="eyebrow">Reproduction</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{TITRE}</h1>
        <p style={{ marginTop: 14 }}>
          {faisables.length} poissons d&apos;eau douce, d&apos;eau de mer et de bassin ont un guide de reproduction complet : mode de ponte ou de gestation, matériel, étapes numérotées et élevage des jeunes. Pour {nonFaisables.length} autres, la reproduction n&apos;est pas réalisée en aquarium amateur : la fiche l&apos;explique plutôt que d&apos;inventer des étapes. Cliquez sur un poisson pour son guide détaillé.
        </p>
      </div>

      {sections.map((s) => (
        <section key={s.cle} style={{ marginBottom: 36, padding: 0 }} aria-labelledby={`groupe-${s.cle}`}>
          <h2 id={`groupe-${s.cle}`} style={{ fontSize: '1.3rem', marginBottom: 6, textAlign: 'center' }}>
            {s.titre} ({s.total})
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0 0 18px' }}>{s.intro}</p>
          {s.milieux.map((m) => (
            <div key={m.cle} style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 6px', textAlign: 'center' }}>
                {m.titre} ({m.poissons.length})
              </h3>
              <div className="guide-grid" style={{ marginTop: 0, gap: 14 }}>
                {m.poissons.map(({ espece, repro }) => (
                  <CarteEspeceLiee
                    key={espece.slug}
                    slug={espece.slug}
                    nomCommun={espece.nomCommun}
                    categorie={espece.categorie}
                    nomScientifique={nomsIdentiques(espece.nomCommun, espece.nomScientifique) ? undefined : espece.nomScientifique}
                    extrait={extrait(repro.resume)}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}

      <section style={{ maxWidth: 760, margin: '0 auto 36px', padding: 0 }} aria-labelledby="non-reproduits">
        <h2 id="non-reproduits" style={{ fontSize: '1.2rem', marginBottom: 10, textAlign: 'center' }}>
          Poissons qui ne se reproduisent pas en aquarium amateur ({nonFaisables.length})
        </h2>
        <p style={{ margin: '0 0 12px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65, textAlign: 'center' }}>
          Larves planctoniques trop petites, reproduction qui exige des hormones ou de très grands bassins, ou simple absence de méthode publiée : pour ces espèces, mieux vaut acheter des poissons déjà adultes.
        </p>
        <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.9, textAlign: 'center' }}>
          {nonFaisables.map((p, i) => (
            <span key={p.espece.slug}>
              {i > 0 && ' · '}
              <Link href={`/especes/${p.espece.slug}#reproduction`} style={{ color: 'var(--teal)' }}>
                {p.espece.nomCommun}
              </Link>
            </span>
          ))}
        </p>
      </section>

      <section style={{ maxWidth: 760, margin: '0 auto 40px', padding: 0 }} aria-labelledby="faq-reproduction">
        <h2 id="faq-reproduction" style={{ fontSize: '1.2rem', marginBottom: 16, textAlign: 'center' }}>
          Questions fréquentes
        </h2>
        {faq.map((q) => (
          <div key={q.question} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: '1rem', margin: '0 0 6px' }}>{q.question}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>{q.reponse}</p>
          </div>
        ))}
        <p style={{ margin: '24px 0 0', textAlign: 'center' }}>
          <Link href="/simulateur" className="btn btn-primary">Composer mon aquarium</Link>
        </p>
      </section>
    </div>
  );
}
