// Pictogrammes des boutons de téléchargement (logos simplifiés de l'App
// Store et de Google Play). Remplaçables par les badges officiels fournis
// par Apple et Google (voir public/) si on veut les reproduire à l'identique.
import { Apple } from 'lucide-react';

export function IconeApple({ size = 22 }: { size?: number }) {
  return <Apple size={size} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />;
}

export function IconeGooglePlay({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <polygon points="3.6,2.2 13.2,12 3.6,21.8" fill="#00A3FF" />
      <polygon points="3.6,2.2 13.2,12 16.8,8.4" fill="#00E27A" />
      <polygon points="16.8,8.4 21.2,12 16.8,15.6 13.2,12" fill="#FFD500" />
      <polygon points="3.6,21.8 13.2,12 16.8,15.6" fill="#FF3A44" />
    </svg>
  );
}
