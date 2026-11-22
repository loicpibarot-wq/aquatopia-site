import { jsonLdSur } from '@/lib/json-ld';
import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import { CONFIDENTIALITE_APPLI } from '@/lib/textes-legaux';

// Page publique de suppression de compte (exigée par Google Play) : accessible
// sans l'application. Les textes de conservation ne sont pas recopiés ici : ils
// viennent directement de la politique de confidentialité (lib/textes-legaux.ts)
// pour rester toujours identiques à celle-ci.

const TITRE = 'Supprimer votre compte Aquatopia';
const DESCRIPTION =
  "Comment supprimer votre compte Aquatopia depuis l'application ou par e-mail, ce qui est supprimé et ce qui est conservé, et pendant combien de temps.";
const CHEMIN = '/supprimer-compte';
const CONTACT = 'contact@aquatopia.fr';
const MAILTO = `mailto:${CONTACT}?subject=${encodeURIComponent('Suppression de mon compte')}`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: CHEMIN },
  openGraph: { title: `${TITRE} | Aquatopia`, description: DESCRIPTION, url: CHEMIN, type: 'website', images: ['/og-image.jpg'], siteName: 'Aquatopia', locale: 'fr_FR' },
};

const conservation = CONFIDENTIALITE_APPLI.find((s) => s.titre.includes('Conservation'))?.paragraphes ?? [];
const annoncesConclues = CONFIDENTIALITE_APPLI.flatMap((s) => s.paragraphes).find((p) => p.startsWith('Annonces conclues'));

const ETAPES = [
  "Ouvrez l'application Aquatopia et connectez-vous au compte à supprimer.",
  "Touchez l'onglet « Profil » en bas de l'écran, puis l'icône des réglages (roue dentée) en haut à droite.",
  "En bas de l'écran « Réglages », touchez « Supprimer mon compte ».",
  "Confirmez en touchant « Supprimer ». La suppression est immédiate et définitive.",
];

export default function SupprimerComptePage() {
  const fil = [{ name: 'Accueil', url: '/' }, { name: TITRE }];
  const h2 = { fontSize: '1.2rem', marginBottom: 10 } as const;
  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSur(breadcrumbJsonLd(fil)) }} />
      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · {TITRE}
      </div>
      <div className="section-head" style={{ marginBottom: 28, maxWidth: 720 }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 4 }}>{TITRE}</h1>
      </div>

      <div style={{ maxWidth: 720 }}>
        <p className="annonce-desc" style={{ marginTop: 0 }}>
          Vous pouvez supprimer votre compte Aquatopia à tout moment, gratuitement, directement depuis l&apos;application
          ou en nous écrivant. Votre compte, votre profil, vos annonces et vos messages sont alors supprimés, sauf les éléments conservés indiqués plus bas.
        </p>

        <div style={{ marginTop: 32 }}>
          <h2 style={h2}>Depuis l&apos;application</h2>
          <ol className="annonce-desc" style={{ marginTop: 0, paddingLeft: 22, whiteSpace: 'normal' }}>
            {ETAPES.map((e) => (
              <li key={e} style={{ marginBottom: 8 }}>{e}</li>
            ))}
          </ol>
        </div>

        <div style={{ marginTop: 32 }}>
          <h2 style={h2}>Sans l&apos;application</h2>
          <p className="annonce-desc" style={{ marginTop: 0 }}>
            Écrivez-nous à <a href={MAILTO}>{CONTACT}</a> depuis l&apos;adresse e-mail de votre compte, avec pour objet
            « Suppression de mon compte ». Nous supprimons alors votre compte et vous le confirmons par retour d&apos;e-mail,
            dans un délai d&apos;un mois au maximum.
          </p>
          <p style={{ marginTop: 16 }}>
            <a href={MAILTO} className="btn btn-primary" style={{ display: 'inline-flex' }}>
              Demander la suppression par e-mail
            </a>
          </p>
        </div>

        {conservation.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h2 style={h2}>Ce qui est supprimé, ce qui est conservé</h2>
            {conservation.map((p, i) => (
              <p key={i} className="annonce-desc" style={{ marginTop: i === 0 ? 0 : 12 }}>{p}</p>
            ))}
          </div>
        )}

        {annoncesConclues && (
          <div style={{ marginTop: 32 }}>
            <h2 style={h2}>Annonces conclues affichées sur le site</h2>
            <p className="annonce-desc" style={{ marginTop: 0 }}>{annoncesConclues}</p>
          </div>
        )}

        <p style={{ marginTop: 40, fontSize: '0.85rem', color: 'var(--text-faint)' }}>
          Ces informations sont extraites de notre <Link href="/confidentialite">politique de confidentialité</Link>. Une
          question ? Écrivez-nous à <a href={MAILTO}>{CONTACT}</a>. Adresse de cette page : aquatopia.fr{CHEMIN}
        </p>
      </div>
    </div>
  );
}
