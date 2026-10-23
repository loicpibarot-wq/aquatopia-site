'use client';

import type { CSSProperties } from 'react';

// Lien intelligent d'Aquatopia : il envoie vers l'App Store ou Google Play
// selon l'appareil. Une seule adresse à maintenir, côté domaine.
const LIEN_APPLI = 'https://app.aquatopia.fr';

export default function DownloadButton({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <a href={LIEN_APPLI} target="_blank" rel="noopener" className={className} style={style}>
      {children}
    </a>
  );
}
