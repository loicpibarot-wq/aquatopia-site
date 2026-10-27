import type { Metadata } from 'next';
import HubBouturage, { HUBS_BOUTURAGE } from '@/components/HubBouturage';

const cfg = HUBS_BOUTURAGE.coraux;

export const metadata: Metadata = {
  title: cfg.titre,
  description: cfg.description,
  alternates: { canonical: cfg.chemin },
  openGraph: {
    title: `${cfg.titre} | Aquatopia`,
    description: cfg.description,
    url: cfg.chemin,
    type: 'website',
    images: ['/og-image.jpg'],
    siteName: 'Aquatopia',
    locale: 'fr_FR',
  },
};

export default function Page() {
  return <HubBouturage type="coraux" />;
}
