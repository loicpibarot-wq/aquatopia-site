import type { Metadata } from 'next';
import PageLegale, { type SectionLegale } from '@/components/PageLegale';
import { CONFIDENTIALITE_APPLI } from '@/lib/textes-legaux';

const TITRE = 'Politique de confidentialité';
const DESCRIPTION = "Quelles données Aquatopia collecte dans l'application et sur le site, pourquoi, pendant combien de temps, et comment exercer vos droits.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/confidentialite' },
  openGraph: { title: `${TITRE} | Aquatopia`, description: DESCRIPTION, url: '/confidentialite', type: 'website', images: ['/og-image.jpg'], siteName: 'Aquatopia', locale: 'fr_FR' },
};

// La partie « application » reprend le texte de l'appli tel quel (sauf le point 6, remplacé par le
// contact commun en bas de page).
const APPLICATION: SectionLegale[] = CONFIDENTIALITE_APPLI.filter((s) => !s.titre.startsWith('6.'));

const SITE: SectionLegale[] = [
  {
    titre: "Mesure d'audience et cookies",
    paragraphes: [
      "Si vous l'acceptez dans le bandeau cookies, Google Analytics enregistre les pages visitées, avec une adresse IP anonymisée, pour comprendre quels contenus sont utiles. Sans votre accord, aucune mesure d'audience n'est déclenchée. Vous pouvez modifier votre choix à tout moment avec le lien « Gérer les cookies » en bas de chaque page.",
      "Le site n'affiche aucune publicité.",
    ],
  },
  {
    titre: 'Compteurs et recherche',
    paragraphes: [
      "Le nombre de lectures d'un guide, de vues d'une fiche espèce ou de clics sur les boutons Télécharger est comptabilisé sous forme de totaux, sans vous identifier. Un repère temporaire stocké dans votre navigateur évite de compter plusieurs fois la même visite.",
      "Le texte tapé dans le champ de recherche de l'accueil reste dans votre navigateur ; seul le type de résultat cliqué (guide, espèce…) peut être transmis à Google Analytics si vous avez accepté les cookies.",
    ],
  },
  {
    titre: "Signalement d'une photo",
    paragraphes: [
      "Si vous signalez une photo d'espèce, nous recevons l'espèce, le motif, votre message éventuel et une empreinte technique de votre adresse IP (et non l'adresse elle-même), utilisée uniquement pour limiter les abus. Le signalement est transmis à l'équipe par e-mail (service Resend).",
    ],
  },
  {
    titre: 'Prestataires du site et transferts hors Union européenne',
    paragraphes: [
      "Le site est hébergé par Netlify. Netlify, Cloudflare, Resend et Google sont situés ou peuvent traiter des données hors de l'Union européenne, notamment aux États-Unis, dans le cadre des garanties prévues par le RGPD (clauses contractuelles types ou cadre de protection des données UE–États-Unis).",
    ],
  },
];

const CONTACT_CNIL: SectionLegale = {
  titre: 'Contact et réclamation',
  paragraphes: [
    "Pour toute question relative à cette politique de confidentialité ou pour exercer vos droits : contact@aquatopia.fr.",
    "Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (cnil.fr).",
  ],
};

export default function ConfidentialitePage() {
  return (
    <PageLegale
      titre={TITRE}
      chemin="/confidentialite"
      misAJour="novembre 2026"
      intro="Cette page explique comment Aquatopia (application mobile et site aquatopia.fr) traite vos données personnelles, conformément au règlement général sur la protection des données (RGPD). Le responsable du traitement est l'éditeur d'Aquatopia, dont l'identité figure dans les mentions légales."
      sections={[
        { titre: 'Application mobile', paragraphes: [], partie: true },
        ...APPLICATION,
        { titre: 'Site web aquatopia.fr', paragraphes: [], partie: true },
        ...SITE,
        CONTACT_CNIL,
      ]}
    />
  );
}
