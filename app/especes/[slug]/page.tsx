import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ESPECES_PUBLIEES, fetchEspeceParSlug } from '@/lib/especes';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import { guideBouturage } from '@/lib/bouturage';
import { descriptionEspece, especesLiees, faqEspece, nomsIdentiques, titreEspece, tuilesEspece } from '@/lib/especes-seo';
import EspeceImage from '@/components/EspeceImage';
import Icone from '@/components/Icone';
import SignalementModal from '@/components/SignalementModal';
import VuesEspece from '@/components/VuesEspece';
import LienRetour from '@/components/LienRetour';
import DownloadButton from '@/components/DownloadButton';
import CarteEspeceLiee from '@/components/CarteEspeceLiee';

const SITE_URL = 'https://aquatopia.fr';

export function generateStaticParams() {
  return ESPECES_PUBLIEES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const espece = fetchEspeceParSlug(params.slug);
  if (!espece) return {};
  const titre = titreEspece(espece);
  const description = descriptionEspece(espece);
  const url = `/especes/${espece.slug}`;

  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${titre} | Aquatopia`, description, url, type: 'article', images: ['/og-image.jpg'], siteName: 'Aquatopia', locale: 'fr_FR' },
  };
}

// Niveaux de difficulté de reproduction : couleur de la pastille, nombre de
// points (1 = très simple, 5 = très difficile) et phrase d'explication.
const REPRO_NIVEAUX: Record<string, { points: number; fond: string; texte: string; phrase: string }> = {
  'Très facile':   { points: 1, fond: 'var(--vert-pale, #d4edda)',   texte: '#155724', phrase: 'Se reproduit spontanément' },
  'Facile':        { points: 2, fond: 'var(--vert-pale, #d4edda)',   texte: '#155724', phrase: 'Quelques conditions suffisent' },
  'Modérée':       { points: 3, fond: 'var(--jaune-pale, #fff3cd)',  texte: '#856404', phrase: "Demande un peu d'expérience" },
  'Difficile':     { points: 4, fond: 'var(--orange-pale, #ffe0b2)', texte: '#e65100', phrase: 'Réservé aux aquariophiles expérimentés' },
  'Très difficile':{ points: 5, fond: 'var(--rouge-pale, #f8d7da)',  texte: '#721c24', phrase: 'Matériel et savoir-faire spécialisés' },
  'Impossible en captivité': { points: 5, fond: 'var(--rouge-pale, #f8d7da)', texte: '#721c24', phrase: 'Reproduction non maîtrisée en aquarium' },
};

// Pastille de difficulté (points + libellé + phrase), commune à la reproduction
// et au bouturage.
function PastilleNiveau({ titre, facilite }: { titre: string; facilite: string }) {
  const niveau = REPRO_NIVEAUX[facilite];
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>
        {titre}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px 12px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '4px 14px',
            borderRadius: 20,
            fontSize: '0.85rem',
            fontWeight: 600,
            background: niveau?.fond ?? 'var(--bg-2)',
            color: niveau?.texte ?? 'var(--text-muted)',
          }}
        >
          {niveau && (
            <span aria-hidden="true" style={{ display: 'inline-flex', gap: 3 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: 'currentColor',
                    opacity: n <= niveau.points ? 1 : 0.2,
                  }}
                />
              ))}
            </span>
          )}
          {facilite}
        </span>
        {niveau && (
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{niveau.phrase}</span>
        )}
      </div>
    </div>
  );
}

// Difficulté du bouturage (Facile / Moyenne / Délicate) → échelle de la pastille.
const NIVEAU_BOUTURAGE_VERS_PASTILLE: Record<string, string> = { Facile: 'Facile', Moyenne: 'Modérée', Délicate: 'Difficile' };

export default function EspecePage({ params }: { params: { slug: string } }) {
  const espece = fetchEspeceParSlug(params.slug);
  if (!espece) notFound();
  const { fiche } = espece;

  const autresEspeces = especesLiees(espece);
  const faq = faqEspece(espece);
  const bouturage = guideBouturage(espece);
  const tuiles = tuilesEspece(espece);
  const cultive = Boolean(fiche.plante || fiche.corail || fiche.algue);
  const multiplication = fiche.plante?.multiplication ?? fiche.corail?.multiplication ?? fiche.algue?.multiplication ?? null;
  const titreAlimentation = fiche.plante || fiche.algue ? 'Culture et nutrition' : fiche.corail ? 'Alimentation et nutrition' : 'Alimentation';
  const urlFiche = `${SITE_URL}/especes/${espece.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titreEspece(espece),
    description: descriptionEspece(espece),
    inLanguage: 'fr-FR',
    url: urlFiche,
    mainEntityOfPage: urlFiche,
    image: `${SITE_URL}/og-image.jpg`,
    author: { '@type': 'Organization', name: 'Aquatopia' },
    publisher: { '@type': 'Organization', name: 'Aquatopia' },
    about: {
      '@type': 'Thing',
      name: espece.nomCommun,
      alternateName: [
        ...(nomsIdentiques(espece.nomCommun, espece.nomScientifique) ? [] : [espece.nomScientifique]),
        ...(espece.autresNoms ?? []),
      ],
    },
  };
  const faqJsonLd = {
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
    { name: espece.nomCommun },
  ];

  const reproduction = fiche.reproduction ? (
    <>
          <PastilleNiveau titre="Difficulté de reproduction" facilite={fiche.reproduction.facilite} />
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>
            {fiche.reproduction.description}
          </p>
    </>
  ) : null;
  // Coraux : une seule section « Reproduction » avec le pas à pas. Plantes : « Comment bouturer »
  // seulement si elles se bouturent (sinon le texte court de multiplication, et la FAQ répond).
  const afficherGuide = Boolean(bouturage && (bouturage.faisable || fiche.corail));
  const reproFondueDansBouturage = Boolean(afficherGuide && fiche.corail && fiche.reproduction);

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Bouton retour — visible immédiatement, style pill */}
      <LienRetour
        href="/especes"
        className="btn-retour"
        texteDepuisConfigurateur={<>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Simulateur
        </>}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Espèces
      </LienRetour>

      {/* Fil d'Ariane (SEO uniquement — visuellement discret) */}
      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · <Link href="/especes">Espèces</Link> · {espece.nomCommun}
      </div>

      <div className="section-head" style={{ marginBottom: 8, maxWidth: 760 }}>
        <span className="eyebrow">{espece.categorie}</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>{espece.nomCommun}</h1>
        {!nomsIdentiques(espece.nomCommun, espece.nomScientifique) && (
          <p style={{ marginTop: 6, fontStyle: 'italic', color: 'var(--text-muted)' }}>{espece.nomScientifique}</p>
        )}
        {espece.autresNoms && espece.autresNoms.length > 0 && (
          <p style={{ marginTop: 6, color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Aussi appelé{espece.autresNoms.length > 1 ? 's' : ''} : {espece.autresNoms.join(', ')}
          </p>
        )}
        <VuesEspece slug={espece.slug} />
      </div>

      <EspeceImage src={`/especes/${espece.slug}.webp`} alt={espece.nomCommun} slug={espece.slug} />

      {espece.remarqueLegale && (
        <div
          className={`espece-alerte ${
            espece.statutLegal === 'cites_a_signaler' ? 'cites' : espece.statutLegal === 'autorise' ? 'info' : ''
          }`}
        >
          <p>
            <strong>
              <Icone
                nom={espece.statutLegal === 'autorise' ? 'info' : 'alerte'}
                size={16}
                style={{ marginRight: 6, verticalAlign: '-3px' }}
              />
              {espece.statutLegal === 'interdite'
                ? 'Vente et détention interdites en France. '
                : espece.statutLegal === 'autorisation_requise'
                  ? 'Détention soumise à autorisation (certificat de capacité) : fermée aux particuliers. '
                  : espece.statutLegal === 'cites_a_signaler'
                    ? 'Espèce réglementée (CITES) : conservez la preuve de son origine légale. '
                    : 'Point de vigilance. '}
            </strong>
            {espece.remarqueLegale}
            {espece.citesAnnexe && ` (Annexe ${espece.citesAnnexe})`}
          </p>
        </div>
      )}

      <p className="annonce-desc" style={{ maxWidth: 760, marginTop: espece.remarqueLegale ? 0 : 28 }}>
        {fiche.description}
      </p>

      <div className="espece-facts">
        {tuiles.map((t) => (
          <div className="espece-fact" key={t.label}>
            <span>{t.label}</span>
            <strong style={t.petite ? { fontSize: '0.95rem' } : undefined}>{t.valeur}</strong>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 760, marginBottom: 32 }}>
        <div>
          <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>Compatible avec</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{fiche.compatibilite}</p>
        </div>
        <div>
          <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>{cultive ? 'Points de vigilance' : 'À éviter'}</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{fiche.incompatibilite}</p>
        </div>
        <div>
          <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>{titreAlimentation}</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{fiche.alimentation}</p>
        </div>
        {cultive && multiplication && !afficherGuide && (
          <div>
            <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>{fiche.corail ? 'Bouturage et multiplication' : 'Multiplication'}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{multiplication}</p>
          </div>
        )}
      </div>

      <div
        style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '18px 22px',
          marginBottom: 48,
          maxWidth: 760,
        }}
      >
        <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          <b style={{ color: 'var(--text)' }}>Conseil : </b>
          {fiche.conseil}
        </p>
      </div>

      {afficherGuide && bouturage && (
        <section id="bouturage" style={{ maxWidth: 760, marginBottom: 40, padding: 0 }} aria-labelledby="bouturage-titre">
          <h2 id="bouturage-titre" style={{ fontSize: '1.2rem', marginBottom: 16 }}>
            {fiche.corail ? `Reproduction de ${espece.nomCommun} en aquarium` : bouturage.titre}
          </h2>
          {fiche.corail && reproduction}
          {!(fiche.corail && fiche.reproduction) && (
            <p style={{ margin: '0 0 14px', color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>
              {bouturage.resume}
            </p>
          )}
          {bouturage.faisable && (
            <div style={{ marginTop: fiche.corail && fiche.reproduction ? 22 : 0 }}>
              {fiche.corail && (
                <h3 style={{ fontSize: '1.02rem', marginBottom: 10 }}>Bouturer {espece.nomCommun}, étape par étape</h3>
              )}
              {bouturage.niveau && !(fiche.corail && fiche.reproduction) && (
                <PastilleNiveau titre="Difficulté du bouturage" facilite={NIVEAU_BOUTURAGE_VERS_PASTILLE[bouturage.niveau] ?? 'Modérée'} />
              )}
              {bouturage.methode && (
                <p style={{ margin: '0 0 16px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  <b style={{ color: 'var(--text)' }}>Méthode :</b> {bouturage.methode}
                  {bouturage.niveau && fiche.corail && fiche.reproduction && <> · <b style={{ color: 'var(--text)' }}>Difficulté du bouturage :</b> {bouturage.niveau}</>}
                </p>
              )}
              <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>Matériel</h3>
              <ul style={{ margin: '0 0 18px', paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                {bouturage.materiel.map((m) => <li key={m}>{m}</li>)}
              </ul>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>Étape par étape</h3>
              <ol style={{ margin: '0 0 18px', paddingLeft: 22, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {bouturage.etapes.map((et) => <li key={et}>{et}</li>)}
              </ol>
              {bouturage.reprise && (
                <>
                  <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>Reprise de la bouture</h3>
                  <p style={{ margin: '0 0 14px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>{bouturage.reprise}</p>
                </>
              )}
            </div>
          )}
          {bouturage.precaution && (
            <p style={{ margin: '4px 0 0', padding: '12px 16px', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              <b style={{ color: 'var(--text)' }}>À savoir : </b>{bouturage.precaution}
            </p>
          )}
        </section>
      )}

      {fiche.reproduction && !reproFondueDansBouturage && (
        <section style={{ maxWidth: 760, marginBottom: 40, padding: 0 }} aria-labelledby="repro-espece">
          <h2 id="repro-espece" style={{ fontSize: '1.2rem', marginBottom: 16 }}>
            Reproduction de {espece.nomCommun} en aquarium
          </h2>
          {reproduction}
        </section>
      )}

      {espece.statutLegal === 'autorise' && (
        <div style={{
          maxWidth: 760, marginBottom: 48, padding: '24px 24px',
          borderRadius: 'var(--radius-m)', background: 'var(--bg-2)', border: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12,
        }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{espece.nomCommun} à vendre, à donner ou à échanger</h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>
            Des particuliers et des éleveurs proposent régulièrement des annonces sur Aquatopia, classées par distance pour une remise en main propre. Chaque annonce est vérifiée avant sa mise en ligne.
          </p>
          <DownloadButton className="btn btn-primary" style={{ marginTop: 4 }}>Télécharger l&apos;application</DownloadButton>
        </div>
      )}

      <section style={{ maxWidth: 760, marginBottom: 40, padding: 0 }} aria-labelledby="faq-espece">
        <h2 id="faq-espece" style={{ fontSize: '1.2rem', marginBottom: 16 }}>
          Questions fréquentes sur {espece.nomCommun}
        </h2>
        {faq.map((q) => (
          <div key={q.question} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: '0.98rem', marginBottom: 6 }}>{q.question}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>{q.reponse}</p>
          </div>
        ))}
      </section>

      {autresEspeces.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <div className="section-head" style={{ marginBottom: 24 }}>
            <span className="eyebrow">Voir aussi ({espece.categorie})</span>
          </div>
          <div className="guide-grid">
            {autresEspeces.map((e) => (
              <CarteEspeceLiee
                key={e.slug}
                slug={e.slug}
                nomCommun={e.nomCommun}
                categorie={e.categorie}
                nomScientifique={nomsIdentiques(e.nomCommun, e.nomScientifique) ? undefined : e.nomScientifique}
              />
            ))}
          </div>
        </section>
      )}

      {/* Retour bas de page */}
      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
        <LienRetour href="/especes" texteDepuisConfigurateur="← Retour au simulateur" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none',
        }}>
          ← Retour aux fiches espèces
        </LienRetour>
      </div>

      <SignalementModal />
    </div>
  );
}
