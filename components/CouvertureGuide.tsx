'use client';

import { useState } from 'react';

// Couverture en tête de guide, sous le titre : fondu vers le bas pour se fondre dans la page.
// Si le fichier manque, rien ne s'affiche.
export default function CouvertureGuide({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={960}
      height={600}
      onError={() => setOk(false)}
      style={{
        display: 'block',
        width: '100%',
        maxWidth: 720,
        height: 'auto',
        aspectRatio: '16 / 10',
        borderRadius: 14,
        marginBottom: 28,
        WebkitMaskImage: 'linear-gradient(to bottom, #000 70%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, #000 70%, transparent 100%)',
      }}
    />
  );
}
