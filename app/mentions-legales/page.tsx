import type { Metadata } from 'next';
import PageLegale from '@/components/PageLegale';

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
        {
          titre: "Éditeur du site et de l'application",
          paragraphes: [
            "Le site aquatopia.fr et l'application Aquatopia sont édités par un particulier, à titre non professionnel et sans but lucratif.",
            "Conformément à l'article 1-1 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, l'éditeur a choisi de ne pas rendre publiques ses coordonnées personnelles. Il les a communiquées à l'hébergeur du site, indiqué ci-dessous.",
          ],
        },
        {
          titre: 'Contact',
          paragraphes: [
            "Pour joindre directement l'éditeur, y compris pour signaler un contenu, exercer vos droits sur vos données ou toute demande des autorités : contact@aquatopia.fr.",
          ],
        },
        {
          titre: 'Directeur de la publication',
          paragraphes: ["L'éditeur d'Aquatopia, joignable à contact@aquatopia.fr."],
        },
        {
          titre: 'Hébergement',
          paragraphes: [
            "Le site aquatopia.fr est hébergé par Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, États-Unis. Contact : support@netlify.com (netlify.com).",
          ],
        },
        {
          titre: 'Prestataires techniques',
          paragraphes: [
            "Base de données et comptes de l'application : Supabase Pte. Ltd., 65 Chulia Street #38-02/03, OCBC Centre, Singapour 049513 (supabase.com). Les données sont stockées sur des serveurs situés en Europe (Paris).",
            "Photos des annonces : Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis (cloudflare.com), service R2.",
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
