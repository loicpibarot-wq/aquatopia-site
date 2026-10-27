import Link from 'next/link';
import { ESPECES_PUBLIEES } from '@/lib/especes';
import { guideBouturage, type NiveauBouture } from '@/lib/bouturage';
import { nomsIdentiques } from '@/lib/especes-seo';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import CarteEspeceLiee from '@/components/CarteEspeceLiee';

const SITE_URL = 'https://aquatopia.fr';

export type TypeHub = 'plantes' | 'coraux';

export const HUBS_BOUTURAGE: Record<TypeHub, { chemin: string; titre: string; description: string; h1: string; eyebrow: string }> = {
  plantes: {
    chemin: '/bouturage-plantes-aquarium',
    titre: "Bouturer ses plantes d'aquarium : guides pas à pas",
    h1: "Bouturer ses plantes d'aquarium : guides pas à pas",
    description:
      "Comment bouturer vos plantes d'aquarium : tige, rhizome, stolon, division de touffe. Matériel, étapes numérotées et délai de reprise, plante par plante.",
    eyebrow: 'Bouturage',
  },
  coraux: {
    chemin: '/bouturage-coraux-aquarium',
    titre: 'Bouturer ses coraux en aquarium récifal : guides pas à pas',
    h1: 'Bouturer ses coraux en aquarium récifal : guides pas à pas',
    description:
      "Comment bouturer vos coraux mous, SPS, LPS et zoanthaires : matériel, étapes numérotées, reprise de la bouture et précautions, espèce par espèce.",
    eyebrow: 'Bouturage',
  },
};

const RANG: Record<NiveauBouture, number> = { Facile: 0, Moyenne: 1, Délicate: 2 };
const INTRO_NIVEAU: Record<NiveauBouture, string> = {
  Facile: 'bouturage facile',
  Moyenne: 'bouturage de difficulté moyenne',
  Délicate: 'bouturage délicat, pour aquariophiles expérimentés',
};

const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const enumeration = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} et ${items[items.length - 1]}`;

function extrait(texte: string): string {
  const m = texte.match(/^.+?[.!?](\s|$)/);
  const p = (m ? m[0] : texte).trim();
  return p.length <= 170 ? p : `${p.slice(0, 167).replace(/\s+\S*$/, '')}…`;
}

// Données du hub : espèces libres à la détention (ni interdites ni soumises à autorisation).
export function donneesHub(type: TypeHub) {
  const tout = ESPECES_PUBLIEES.flatMap((e) => {
    if (!e.fiche) return [];
    if (e.statutLegal === 'interdite' || e.statutLegal === 'autorisation_requise') return [];
    if (type === 'plantes' ? !e.fiche.plante : !e.fiche.corail) return [];
    const guide = guideBouturage({ ...e, fiche: e.fiche });
    return guide ? [{ espece: e, guide }] : [];
  }).sort((a, b) => a.espece.nomCommun.localeCompare(b.espece.nomCommun, 'fr'));

  const faisables = tout.filter((p) => p.guide.faisable);
  const autres = tout.filter((p) => !p.guide.faisable);

  const parMethode = new Map<string, typeof faisables>();
  for (const p of faisables) {
    const cle = p.guide.methode ?? 'bouturage';
    parMethode.set(cle, [...(parMethode.get(cle) ?? []), p]);
  }
  const groupes = [...parMethode.entries()]
    .map(([methode, poissons]) => ({
      methode,
      niveau: poissons[0].guide.niveau ?? 'Moyenne',
      especes: poissons,
    }))
    .sort((a, b) => RANG[a.niveau] - RANG[b.niveau] || b.especes.length - a.especes.length);

  return { faisables, autres, groupes };
}

export function faqHub(type: TypeHub) {
  const { faisables, autres } = donneesHub(type);
  const faciles = faisables.filter((p) => p.guide.niveau === 'Facile').map((p) => p.espece.nomCommun);
  if (type === 'plantes') {
    return [
      {
        question: "Quelles plantes d'aquarium sont les plus faciles à bouturer ?",
        reponse: `${faciles.length} plantes du catalogue sont notées « bouturage facile », par exemple ${enumeration(faciles.slice(0, 8))}. Chaque fiche détaille le matériel, les étapes et le délai de reprise.`,
      },
      {
        question: "Toutes les plantes d'aquarium se bouturent-elles ?",
        reponse: autres.length
          ? `Non : ${enumeration(autres.map((p) => p.espece.nomCommun))} se multiplient surtout par graines ou ne se bouturent pas. La fiche l'explique plutôt que d'inventer des étapes.`
          : 'Presque toutes : chaque fiche indique la méthode adaptée (tige, rhizome, stolon, division de touffe).',
      },
      {
        question: 'Comment est notée la difficulté du bouturage ?',
        reponse:
          "Le niveau va de facile (la plante repart presque toujours) à délicat (la coupe reste risquée). Chaque guide est rédigé d'après la façon dont la plante pousse, et le niveau est un jugement éditorial d'Aquatopia.",
      },
    ];
  }
  return [
    {
      question: 'Quels coraux sont les plus faciles à bouturer ?',
      reponse: faciles.length
        ? `${faciles.length} types de coraux sont notés « bouturage facile », par exemple ${enumeration(faciles.slice(0, 6))}. Chaque fiche détaille le matériel, les étapes et la reprise de la bouture.`
        : 'Consultez les fiches : chacune précise le matériel, les étapes et la reprise de la bouture.',
    },
    {
      question: 'Tous les coraux peuvent-ils être bouturés ?',
      reponse: autres.length
        ? `Non : ${enumeration(autres.map((p) => p.espece.nomCommun))} ne se bouturent pas ou très rarement. Certaines anémones se divisent d'elles-mêmes dans un bac stable. La fiche explique la situation de chaque espèce.`
        : 'Presque tous : chaque fiche indique la méthode adaptée.',
    },
    {
      question: 'Faut-il des papiers pour acheter ou vendre des boutures de coraux ?',
      reponse:
        "Beaucoup de coraux durs sont inscrits à la CITES, et le commerce de leurs boutures peut exiger des documents d'origine. La fiche de chaque espèce indique son statut légal : conservez la preuve de l'origine de vos coraux.",
    },
    {
      question: 'Comment est notée la difficulté du bouturage ?',
      reponse:
        "Le niveau va de facile à délicat. Chaque guide est rédigé d'après le type de corail, et le niveau est un jugement éditorial d'Aquatopia.",
    },
  ];
}

export default function HubBouturage({ type }: { type: TypeHub }) {
  const cfg = HUBS_BOUTURAGE[type];
  const { faisables, autres, groupes } = donneesHub(type);
  const faq = faqHub(type);

  const jsonLdListe = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cfg.titre,
    description: cfg.description,
    url: `${SITE_URL}${cfg.chemin}`,
    inLanguage: 'fr-FR',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: faisables.length,
      itemListElement: faisables.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/especes/${p.espece.slug}#bouturage`,
        name: p.guide.titre,
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
  const fil = [{ name: 'Accueil', url: '/' }, { name: 'Espèces', url: '/especes' }, { name: type === 'plantes' ? 'Bouturage des plantes' : 'Bouturage des coraux' }];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdListe) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />

      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · <Link href="/especes">Espèces</Link> · {type === 'plantes' ? 'Bouturage des plantes' : 'Bouturage des coraux'}
      </div>

      <div className="section-head" style={{ marginBottom: 24 }}>
        <span className="eyebrow">{cfg.eyebrow}</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{cfg.h1}</h1>
        <p style={{ marginTop: 14 }}>
          {faisables.length} {type === 'plantes' ? 'plantes' : 'coraux et anémones'} ont un guide de bouturage complet : méthode, matériel, étapes numérotées et reprise de la bouture. Les guides sont classés par méthode, des plus simples aux plus délicates. Cliquez sur une fiche pour le pas à pas détaillé.
        </p>
      </div>

      {groupes.map((g) => (
        <section key={g.methode} style={{ marginBottom: 32, padding: 0 }} aria-labelledby={`methode-${g.methode.replace(/\W+/g, '-')}`}>
          <h2 id={`methode-${g.methode.replace(/\W+/g, '-')}`} style={{ fontSize: '1.2rem', marginBottom: 6, textAlign: 'center' }}>
            {majuscule(g.methode)} ({g.especes.length})
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0 0 16px' }}>
            {majuscule(INTRO_NIVEAU[g.niveau])}.
          </p>
          <div className="guide-grid" style={{ marginTop: 0, gap: 14 }}>
            {g.especes.map(({ espece, guide }) => (
              <CarteEspeceLiee
                key={espece.slug}
                slug={espece.slug}
                nomCommun={espece.nomCommun}
                categorie={espece.categorie}
                nomScientifique={nomsIdentiques(espece.nomCommun, espece.nomScientifique) ? undefined : espece.nomScientifique}
                extrait={extrait(guide.resume)}
              />
            ))}
          </div>
        </section>
      ))}

      {autres.length > 0 && (
        <section style={{ maxWidth: 760, margin: '0 auto 36px', padding: 0 }} aria-labelledby="non-boutures">
          <h2 id="non-boutures" style={{ fontSize: '1.2rem', marginBottom: 10, textAlign: 'center' }}>
            {type === 'plantes' ? 'Plantes qui ne se bouturent pas' : 'Coraux qui ne se bouturent pas (ou presque pas)'} ({autres.length})
          </h2>
          <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.9, textAlign: 'center' }}>
            {autres.map((p, i) => (
              <span key={p.espece.slug}>
                {i > 0 && ' · '}
                <Link href={`/especes/${p.espece.slug}`} style={{ color: 'var(--teal)' }}>
                  {p.espece.nomCommun}
                </Link>
              </span>
            ))}
          </p>
        </section>
      )}

      <section style={{ maxWidth: 760, margin: '0 auto 40px', padding: 0 }} aria-labelledby="faq-bouturage">
        <h2 id="faq-bouturage" style={{ fontSize: '1.2rem', marginBottom: 16, textAlign: 'center' }}>
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
