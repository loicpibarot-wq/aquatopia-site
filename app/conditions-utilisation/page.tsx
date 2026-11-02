import type { Metadata } from 'next';
import PageLegale from '@/components/PageLegale';
import { CGU_APPLI } from '@/lib/textes-legaux';

const TITRE = "Conditions générales d'utilisation";
const DESCRIPTION = "Conditions générales d'utilisation d'Aquatopia : règles de publication, vente et don d'animaux et de matériel d'aquariophilie, remise en main propre, modération.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/conditions-utilisation' },
  openGraph: { title: `${TITRE} | Aquatopia`, description: DESCRIPTION, url: '/conditions-utilisation', type: 'website', images: ['/og-image.jpg'], siteName: 'Aquatopia', locale: 'fr_FR' },
};

export default function ConditionsPage() {
  return (
    <PageLegale
      titre={TITRE}
      chemin="/conditions-utilisation"
      intro="Ce texte est celui que chaque utilisateur accepte en créant son compte dans l'application Aquatopia (version 8). Il est publié ici à l'identique pour être consultable sans installer l'application."
      sections={CGU_APPLI}
    />
  );
}
