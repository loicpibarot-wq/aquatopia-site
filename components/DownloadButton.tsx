'use client';

import { useEffect, useState } from 'react';

const IOS_STORE = 'https://apps.apple.com/app/id6774605218';
const ANDROID_STORE = 'https://play.google.com/store/apps/details?id=com.noula34.aquatopia';

// Même logique que le <script> de l'ancien site statique : sur mobile, on
// pointe directement vers le bon store selon l'OS détecté ; sur desktop (ou
// avant hydratation), on retombe sur l'App Store par défaut.
export default function DownloadButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [href, setHref] = useState(IOS_STORE);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || '';
    setHref(/android/i.test(ua) ? ANDROID_STORE : IOS_STORE);
  }, []);

  return (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {children}
    </a>
  );
}
