import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const SITE_URL = 'https://aquatopia.fr';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aquatopia | Vente, Échange & Don : Poissons, Récifal, Bassin & Matériel",
    template: '%s | Aquatopia',
  },
  description:
    "La marketplace aquariophile complète. Achetez, vendez et échangez poissons, coraux, plantes, bassins, éclairages, décors et accessoires d'occasion ou neufs entre particuliers et professionnels.",
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Aquatopia | Vente, Échange & Don : Poissons, Récifal, Bassin & Matériel",
    description:
      "La marketplace aquariophile complète. Achetez, vendez et échangez poissons, coraux, plantes, bassins, éclairages, décors et accessoires d'occasion ou neufs entre particuliers et professionnels.",
    url: SITE_URL,
    siteName: 'Aquatopia',
    images: ['/og-image.jpg'],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
