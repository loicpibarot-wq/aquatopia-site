import type { Metadata } from 'next';
import Link from 'next/link';
import { ESPECES_PUBLIEES, type CategorieEspece } from '@/lib/especes';
import { COMPORTEMENT_NIVEAUX, comportementEspece } from '@/lib/especes-comportement';
import { nomsIdentiques } from '@/lib/especes-seo';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import CarteEspeceLiee from '@/components/CarteEspeceLiee';

const SITE_URL = 'https://aquatopia.fr';
const TITRE = "Poissons d'aquarium spectaculaires : comportements à observer";
const DESCRIPTION =
  "Combattant, poisson-clown, hippocampe, gobie crevette : les poissons d'eau douce, d'eau de mer et de bassin dont le comportement est le plus passionnant à observer.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/poissons-spectaculaires' },
  openGraph: {
    title: `${TITRE} | Aquatopia`,
    description: DESCRIPTION,
    url: '/poissons-spectaculaires',
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

// Premier fragment de phrase du texte de comportement, pour la carte.
function extrait(texte: string): string {
  const m = texte.match(/^.+?[.!?](\s|$)/);
  const p = (m ? m[0] : texte).trim();
  return p.length <= 170 ? p : `${p.slice(0, 167).replace(/\s+\S*$/, '')}…`;
}

const enumeration = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} et ${items[items.length - 1]}`;

export default function PoissonsSpectaculairesPage() {
  // Seules les espèces librement détenables par un particulier sont mises en avant :
  // pas d'espèce interdite ni soumise à autorisation.
  const poissons = ESPECES_PUBLIEES.flatMap((e) => {
    const c = comportementEspece(e.slug);
    if (!c || c.niveau < 4) return [];
    if (e.statutLegal === 'interdite' || e.statutLegal === 'autorisation_requise') return [];
    return [{ espece: e, comportement: c }];
  }).sort((a, b) => a.espece.nomCommun.localeCompare(b.espece.nomCommun, 'fr'));

  const niveaux = [5, 4] as const;
  const sections = niveaux.map((niveau) => ({
    niveau,
    libelle: COMPORTEMENT_NIVEAUX[niveau].libelle,
    milieux: MILIEUX.map((m) => ({
      ...m,
      poissons: poissons.filter((p) => p.comportement.niveau === niveau && m.categories.includes(p.espece.categorie)),
    })).filter((m) => m.poissons.length > 0),
    total: poissons.filter((p) => p.comportement.niveau === niveau).length,
  }));

  const spectaculaires = poissons.filter((p) => p.comportement.niveau === 5).map((p) => p.espece.nomCommun);

  const faq = [
    {
      question: "Quels poissons d'aquarium ont le comportement le plus spectaculaire ?",
      reponse: `Les poissons notés 5 sur 5 pour l'intérêt de leur comportement sont : ${enumeration(spectaculaires)}.`,
    },
    {
      question: "Comment est noté l'intérêt du comportement d'un poisson ?",
      reponse:
        "La note va de 1 (très discret) à 5 (spectaculaire). Elle reflète ce qu'on voit réellement en aquarium : parade, nage particulière, association avec un autre animal, soins aux œufs. Chaque description est rédigée d'après des sources publiques d'aquariophilie et de zoologie, et la note est un jugement éditorial d'Aquatopia.",
    },
  ];

  const jsonLdListe = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITRE,
    description: DESCRIPTION,
    url: `${SITE_URL}/poissons-spectaculaires`,
    inLanguage: 'fr-FR',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: poissons.length,
      itemListElement: poissons.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/especes/${p.espece.slug}`,
        name: p.espece.nomCommun,
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
    { name: 'Poissons spectaculaires' },
  ];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdListe) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · <Link href="/especes">Espèces</Link> · Poissons spectaculaires
      </div>

      <div className="section-head" style={{ marginBottom: 24 }}>
        <span className="eyebrow">Comportement</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{TITRE}</h1>
        <p style={{ marginTop: 14 }}>
          Un aquarium ne se résume pas à des couleurs : certains poissons parent, creusent, nettoient leurs voisins, projettent de l&apos;eau pour chasser, s&apos;associent à un autre animal ou changent de sexe. Voici ceux dont le comportement est noté{' '}
          <b>spectaculaire</b> ou <b>très agréable à observer</b>, avec ce qu&apos;on y voit vraiment. Cliquez sur une fiche pour les paramètres d&apos;eau, la compatibilité et le statut légal.
        </p>
      </div>

      {sections.map((s) => (
        <section key={s.niveau} style={{ marginBottom: 36, padding: 0 }} aria-labelledby={`niveau-${s.niveau}`}>
          <h2 id={`niveau-${s.niveau}`} style={{ fontSize: '1.3rem', marginBottom: 6, textAlign: 'center' }}>
            {s.niveau === 5 ? 'Les plus spectaculaires' : 'Très agréables à observer'} ({s.total})
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0 0 18px' }}>
            Note {s.niveau} sur 5 : {s.libelle.toLowerCase()}.
          </p>
          {s.milieux.map((m) => (
            <div key={m.cle} style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 6px', textAlign: 'center' }}>
                {m.titre} ({m.poissons.length})
              </h3>
              <div className="guide-grid" style={{ marginTop: 0, gap: 14 }}>
                {m.poissons.map(({ espece, comportement }) => (
                  <CarteEspeceLiee
                    key={espece.slug}
                    slug={espece.slug}
                    nomCommun={espece.nomCommun}
                    categorie={espece.categorie}
                    nomScientifique={nomsIdentiques(espece.nomCommun, espece.nomScientifique) ? undefined : espece.nomScientifique}
                    extrait={extrait(comportement.description)}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}

      <section style={{ maxWidth: 760, margin: '0 auto 40px', padding: 0 }} aria-labelledby="faq-spectaculaires">
        <h2 id="faq-spectaculaires" style={{ fontSize: '1.2rem', marginBottom: 16, textAlign: 'center' }}>
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
