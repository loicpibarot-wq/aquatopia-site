import type { Metadata } from 'next';
import PageLegale from '@/components/PageLegale';
import { MENTIONS_APPLI } from '@/lib/textes-legaux';

const TITRE = 'Mentions légales';
const DESCRIPTION = "Éditeur, hébergeur et conditions d'utilisation des contenus du site aquatopia.fr, application d'annonces d'aquariophilie.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/mentions-legales' },
  openGraph: { title: `${TITRE} | Aquatopia`, description: DESCRIPTION, url: '/mentions-legales', type: 'website', images: ['/og-image.jpg'], siteName: 'Aquatopia', locale: 'fr_FR' },
};

export default function MentionsLegalesPage() {
  return (
    <PageLegale
      titre={TITRE}
      chemin="/mentions-legales"
      sections={[
        ...MENTIONS_APPLI.map((s) => (s.titre === 'Éditeur de l\'Application' ? { ...s, titre: "Éditeur du site et de l'application" } : s)).filter((s) => s.titre !== 'Hébergement'),
        {
          titre: 'Hébergement',
          paragraphes: [
            "Le site aquatopia.fr est hébergé par Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, États-Unis (netlify.com).",
            "L'application et ses bases de données sont hébergées par la société Supabase, Inc. Les données des utilisateurs européens sont stockées sur leurs infrastructures sécurisées situées en Europe (Paris). Les photos des annonces sont stockées chez Cloudflare (service R2).",
          ],
        },
        {
          titre: 'Propriété intellectuelle',
          paragraphes: [
            "Les textes, guides, fiches espèces, illustrations et la marque Aquatopia sont protégés par le droit d'auteur. Toute reproduction ou réutilisation, totale ou partielle, sans accord écrit préalable est interdite, hors courte citation avec mention de la source et lien vers la page d'origine.",
            "Les photos et textes des annonces restent la propriété de leurs auteurs, dans les conditions de l'article 8 des conditions générales d'utilisation. Si vous estimez qu'un contenu porte atteinte à vos droits, écrivez à contact@aquatopia.fr en indiquant la page concernée.",
          ],
        },
        {
          titre: 'Responsabilité',
          paragraphes: [
            "Les guides et fiches espèces ont une portée générale et informative. Ils ne remplacent ni l'avis d'un vétérinaire ou d'un professionnel, ni la consultation des textes en vigueur : le statut légal d'une espèce (CITES, espèces interdites ou soumises à autorisation) doit toujours être vérifié avant tout achat, vente ou détention.",
            "Les annonces sont publiées sous la responsabilité de leurs auteurs, dans les conditions des conditions générales d'utilisation (aquatopia.fr/conditions-utilisation).",
          ],
        },
        {
          titre: 'Données personnelles et cookies',
          paragraphes: ["Le traitement de vos données et l'utilisation des cookies sont détaillés dans la politique de confidentialité (aquatopia.fr/confidentialite)."],
        },
        {
          titre: 'Droit applicable',
          paragraphes: ["Le site est soumis au droit français."],
        },
      ]}
    />
  );
}
