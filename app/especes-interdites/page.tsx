import type { Metadata } from 'next';
import Link from 'next/link';
import { ESPECES_PUBLIEES, type CategorieEspece } from '@/lib/especes';
import { nomsIdentiques } from '@/lib/especes-seo';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import CarteEspeceLiee from '@/components/CarteEspeceLiee';

// Page pilier « espèces interdites » : générée depuis le catalogue (statutLegal), elle
// se met à jour seule quand une fiche d'espèce interdite est ajoutée. Les données de
// Search Console montrent que les fiches d'espèces interdites sont parmi les mieux
// classées du site : cette page les rassemble et leur transmet du poids.
const SITE_URL = 'https://aquatopia.fr';
const TITRE = 'Espèces interdites en aquarium et en bassin en France : la liste complète';
const DESCRIPTION =
  "Écrevisses américaines, perche soleil, gambusie, jussies, laitue d'eau, escargot-pomme : la liste des poissons, crustacés, mollusques et plantes interdits en aquarium et en bassin en France, et ce que dit la loi.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/especes-interdites' },
  openGraph: {
    title: `${TITRE} | Aquatopia`,
    description: DESCRIPTION,
    url: '/especes-interdites',
    type: 'website',
    images: ['/og-image.jpg'],
    siteName: 'Aquatopia',
    locale: 'fr_FR',
  },
};

const GROUPES: { cle: string; titre: string; categories: CategorieEspece[] }[] = [
  { cle: 'poissons', titre: 'Poissons', categories: ['Eau Douce', 'Bassin', 'Poissons marins'] },
  { cle: 'crustaces', titre: 'Écrevisses et crabes', categories: ['Crustacés / Invertébrés eau douce'] },
  { cle: 'mollusques', titre: 'Escargots et moules', categories: ['Mollusques eau douce'] },
  { cle: 'plantes', titre: 'Plantes aquatiques et algues', categories: ['Plantes', 'Macroalgues marines'] },
];

// Paires « interdite / autorisée » souvent confondues, d'après les remarques légales des fiches.
const CONFUSIONS: { interdite: string; autorisee: string; texte: string }[] = [
  {
    interdite: 'escargot-pomme',
    autorisee: 'escargot-mystere',
    texte: "Les escargots-pommes (Pomacea maculata et P. canaliculata) sont interdits, alors que l'escargot mystère (Pomacea bridgesii), très proche d'aspect, reste autorisé.",
  },
  {
    interdite: 'jussie-a-grandes-fleurs',
    autorisee: 'ludwigia-repens',
    texte: "Les jussies de bassin (Ludwigia grandiflora et L. peploides) sont interdites, mais la Ludwigia repens, plante d'aquarium classique, reste autorisée.",
  },
  {
    interdite: 'hydrocotyle-fausse-renoncule',
    autorisee: 'hydrocotyle-leucocephala-trefle-d-eau',
    texte: "L'hydrocotyle fausse-renoncule est interdite ; le trèfle d'eau (Hydrocotyle leucocephala), vendu pour l'aquarium, reste autorisé.",
  },
  {
    interdite: 'perche-soleil',
    autorisee: 'perche-soleil-naine-decorative',
    texte: "La perche soleil (Lepomis gibbosus) est interdite, mais la perche soleil naine décorative (Enneacanthus chaetodon) est autorisée : vérifiez toujours le nom scientifique.",
  },
];

function extrait(texte: string | null): string | undefined {
  if (!texte) return undefined;
  const m = texte.match(/^.+?[.!?](\s|$)/);
  const p = (m ? m[0] : texte).trim();
  return p.length <= 170 ? p : `${p.slice(0, 167).replace(/\s+\S*$/, '')}…`;
}

export default function EspecesInterditesPage() {
  const tri = (a: { nomCommun: string }, b: { nomCommun: string }) => a.nomCommun.localeCompare(b.nomCommun, 'fr');
  const interdites = ESPECES_PUBLIEES.filter((e) => e.statutLegal === 'interdite').sort(tri);
  const soumises = ESPECES_PUBLIEES.filter((e) => e.statutLegal === 'autorisation_requise').sort(tri);
  const parSlug = new Map(ESPECES_PUBLIEES.map((e) => [e.slug, e]));

  const groupes = GROUPES.map((g) => ({
    ...g,
    especes: interdites.filter((e) => g.categories.includes(e.categorie)),
  })).filter((g) => g.especes.length > 0);

  const confusions = CONFUSIONS.filter((c) => parSlug.has(c.interdite) && parSlug.has(c.autorisee));

  const faq = [
    {
      question: 'Quelles espèces sont interdites en aquarium et en bassin en France ?',
      reponse: `Aquatopia recense ${interdites.length} espèces aquatiques interdites : des poissons (perche soleil, gambusie, pseudorasbora, poisson-tête-de-serpent…), des écrevisses américaines, des escargots-pommes et de nombreuses plantes de bassin (jussies, laitue d'eau, jacinthe d'eau, myriophylle du Brésil…). Elles sont classées espèces exotiques envahissantes par la réglementation européenne ou française.`,
    },
    {
      question: 'Que dit la loi sur les espèces exotiques envahissantes ?',
      reponse:
        "Pour les espèces réglementées (règlement européen n° 1143/2014 et arrêtés français du 14 février 2018), il est interdit de les introduire dans le milieu naturel, de les détenir, de les transporter vivantes, de les utiliser, de les échanger, de les vendre ou de les acheter, y compris entre particuliers et même gratuitement.",
    },
    {
      question: "Que faire si j'ai une espèce interdite dans mon bassin ou mon aquarium ?",
      reponse:
        "Ne la relâchez surtout pas dans la nature, et ne la donnez ni ne la vendez. Empêchez sa reproduction et son évasion, et renseignez-vous auprès de la direction départementale des territoires (DDT) ou de l'Office français de la biodiversité (OFB). Pour les plantes, la destruction en évitant toute dispersion (déchets verts incinérés, jamais au compost ni au fossé) est recommandée.",
    },
    {
      question: 'Quelles sanctions en cas de relâcher dans la nature ?',
      reponse:
        "Introduire une espèce exotique envahissante dans le milieu naturel est un délit puni d'une peine d'emprisonnement et d'une amende pouvant atteindre 150 000 €. C'est aussi l'une des principales causes de déclin des espèces locales.",
    },
    {
      question: 'Peut-on vendre ou donner ces espèces sur Aquatopia ?',
      reponse:
        "Non. Les annonces portant sur une espèce interdite ne sont pas acceptées sur Aquatopia : chaque fiche espèce indique le statut légal de l'animal ou de la plante, pour vérifier avant d'acheter, de vendre ou d'échanger.",
    },
  ];

  const jsonLdListe = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITRE,
    description: DESCRIPTION,
    url: `${SITE_URL}/especes-interdites`,
    inLanguage: 'fr-FR',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: interdites.length,
      itemListElement: interdites.map((e, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/especes/${e.slug}`,
        name: e.nomCommun,
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
    { name: 'Espèces interdites' },
  ];

  const carte = (e: (typeof interdites)[number]) => (
    <CarteEspeceLiee
      key={e.slug}
      slug={e.slug}
      nomCommun={e.nomCommun}
      categorie={e.categorie}
      nomScientifique={nomsIdentiques(e.nomCommun, e.nomScientifique) ? undefined : e.nomScientifique}
      extrait={extrait(e.remarqueLegale)}
    />
  );

  const bloc = { maxWidth: 760, margin: '0 auto 32px', padding: 0 } as const;
  const texte = { color: 'var(--text-muted)', lineHeight: 1.7, margin: '0 0 12px' } as const;

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdListe) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · <Link href="/especes">Espèces</Link> · Espèces interdites
      </div>

      <div className="section-head" style={{ marginBottom: 24 }}>
        <span className="eyebrow">Réglementation</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{TITRE}</h1>
        <p style={{ marginTop: 14 }}>
          Certaines espèces autrefois courantes en aquarium ou en bassin sont aujourd&apos;hui <b>interdites en France</b>, car elles
          se sont échappées dans la nature et menacent les espèces locales. Voici les <b>{interdites.length} espèces interdites</b>{' '}
          recensées par Aquatopia, classées par groupe, avec ce que dit la loi et ce qu&apos;il faut faire si vous en possédez.
        </p>
      </div>

      <section style={bloc} aria-labelledby="loi">
        <h2 id="loi" style={{ fontSize: '1.25rem', marginBottom: 12 }}>Ce que dit la loi</h2>
        <p style={texte}>
          Ces espèces sont des <b>espèces exotiques envahissantes</b>, inscrites sur la liste de l&apos;Union européenne (règlement
          n° 1143/2014) ou sur les listes françaises fixées par les arrêtés du 14 février 2018 (une liste pour les animaux, une
          pour les végétaux). Pour toutes ces espèces, il est interdit :
        </p>
        <ul style={{ ...texte, paddingLeft: 22 }}>
          <li>de les introduire dans le milieu naturel (rivière, mare, étang, fossé) ;</li>
          <li>de les détenir, de les transporter vivantes ou de les utiliser ;</li>
          <li>de les vendre, de les acheter, de les échanger ou de les donner, y compris entre particuliers.</li>
        </ul>
        <p style={texte}>
          Relâcher une espèce envahissante dans la nature est un délit, puni d&apos;une peine d&apos;emprisonnement et d&apos;une amende
          pouvant atteindre 150 000 €. Les annonces portant sur ces espèces ne sont pas acceptées sur Aquatopia.
        </p>
      </section>

      {groupes.map((g) => (
        <section key={g.cle} style={{ marginBottom: 32, padding: 0 }} aria-labelledby={`groupe-${g.cle}`}>
          <h2 id={`groupe-${g.cle}`} style={{ fontSize: '1.25rem', marginBottom: 14, textAlign: 'center' }}>
            {g.titre} interdits ({g.especes.length})
          </h2>
          <div className="guide-grid" style={{ marginTop: 0, gap: 14 }}>
            {g.especes.map(carte)}
          </div>
        </section>
      ))}

      {confusions.length > 0 && (
        <section style={bloc} aria-labelledby="confusions">
          <h2 id="confusions" style={{ fontSize: '1.25rem', marginBottom: 12 }}>Attention aux confusions</h2>
          <p style={texte}>
            Plusieurs espèces interdites ressemblent à des espèces autorisées, parfois vendues sous des noms proches. Fiez-vous
            toujours au nom scientifique :
          </p>
          <ul style={{ ...texte, paddingLeft: 22 }}>
            {confusions.map((c) => (
              <li key={c.interdite}>
                {c.texte}{' '}
                <Link href={`/especes/${c.interdite}`}>Fiche interdite</Link> ·{' '}
                <Link href={`/especes/${c.autorisee}`}>Fiche autorisée</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {soumises.length > 0 && (
        <section style={{ marginBottom: 32, padding: 0 }} aria-labelledby="autorisation">
          <h2 id="autorisation" style={{ fontSize: '1.25rem', marginBottom: 8, textAlign: 'center' }}>
            Espèces soumises à autorisation ({soumises.length})
          </h2>
          <p style={{ ...texte, textAlign: 'center', maxWidth: 760, margin: '0 auto 14px' }}>
            Ces espèces dangereuses ne sont pas interdites en soi, mais leur détention exige un certificat de capacité et une
            autorisation préfectorale dès le premier spécimen : elles sont inaccessibles à un particulier.
          </p>
          <div className="guide-grid" style={{ marginTop: 0, gap: 14 }}>
            {soumises.map(carte)}
          </div>
        </section>
      )}

      <section style={bloc} aria-labelledby="faq-interdites">
        <h2 id="faq-interdites" style={{ fontSize: '1.2rem', marginBottom: 16, textAlign: 'center' }}>
          Questions fréquentes
        </h2>
        {faq.map((q) => (
          <div key={q.question} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: '1rem', margin: '0 0 6px' }}>{q.question}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>{q.reponse}</p>
          </div>
        ))}
        <p style={{ ...texte, fontSize: '0.85rem', marginTop: 20 }}>
          Ces informations sont données à titre indicatif et ne remplacent pas les textes officiels. En cas de doute, contactez la
          direction départementale des territoires (DDT) ou l&apos;Office français de la biodiversité.
        </p>
        <p style={{ margin: '24px 0 0', textAlign: 'center' }}>
          <Link href="/especes" className="btn btn-primary">Voir toutes les fiches espèces</Link>
        </p>
      </section>
    </div>
  );
}
