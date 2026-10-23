import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsentementAnalytics from '@/components/ConsentementAnalytics';
import './globals.css';

const SITE_URL = 'https://aquatopia.fr';

// Données structurées communes à tout le site : l'organisation (nom, logo,
// pages officielles) et le site web. Aucun avis ni note inventé.
const JSON_LD_SITE = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organisation`,
      name: 'Aquatopia',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.webp`,
      email: 'contact@aquatopia.fr',
      sameAs: [
        'https://www.facebook.com/share/1DmYnkCM4g/?mibextid=wwXIfr',
        'https://www.instagram.com/aquatopia.app',
        'https://www.tiktok.com/@aquatopia.app',
        'https://apps.apple.com/app/id6774605218',
        'https://play.google.com/store/apps/details?id=com.noula34.aquatopia',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#site`,
      url: SITE_URL,
      name: 'Aquatopia',
      description: "Site d'annonces d'aquariophilie entre particuliers : aquariums, poissons, plantes et matériel.",
      inLanguage: 'fr-FR',
      publisher: { '@id': `${SITE_URL}/#organisation` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Petites annonces aquariophilie : poissons et aquariums – Aquatopia",
    template: '%s | Aquatopia',
  },
  description:
    "Découvrez Aquatopia, l'application gratuite de petites annonces aquariophiles. Achetez, vendez, échangez ou donnez poissons, plantes et matériel d'aquarium.",
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
    title: "Petites annonces aquariophilie : poissons et aquariums – Aquatopia",
    description:
      "Découvrez Aquatopia, l'application gratuite de petites annonces aquariophiles. Achetez, vendez, échangez ou donnez poissons, plantes et matériel d'aquarium.",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_SITE) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <ConsentementAnalytics />
      </body>
    </html>
  );
}
