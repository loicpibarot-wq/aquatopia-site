'use client';

import type { CSSProperties } from 'react';
import { suivre, sourceVisite } from '@/lib/analytics';

// Lien intelligent d'Aquatopia : il envoie vers l'App Store ou Google Play
// selon l'appareil. Une seule adresse à maintenir, côté domaine.
const LIEN_APPLI = 'https://onelink.to/4ctudp';

// Compte un clic sans retarder ni bloquer l'ouverture du lien. sendBeacon survit à la
// navigation ; à défaut, fetch avec keepalive. Aucune donnée personnelle n'est envoyée.
function compterClic(href: string) {
  const plateforme = href.includes('apps.apple.com') ? 'ios' : href.includes('play.google.com') ? 'android' : 'lien_intelligent';
  suivre('telechargement_app', { plateforme, page: window.location.pathname, source: sourceVisite() });
  try {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon?.('/api/telechargements')) return;
    fetch('/api/telechargements', { method: 'POST', keepalive: true }).catch(() => {});
  } catch {
    // le comptage ne doit jamais gêner le téléchargement
  }
}

export default function DownloadButton({
  className,
  style,
  children,
  href = LIEN_APPLI,
}: {
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
  /** Par défaut le lien intelligent ; les badges des stores passent leur adresse. */
  href?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener" className={className} style={style} onClick={() => compterClic(href)}>
      {children}
    </a>
  );
}
