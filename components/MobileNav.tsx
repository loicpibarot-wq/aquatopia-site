'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Mêmes liens que ceux masqués en desktop-only (`.hide-mobile`) dans
// Header.tsx : le menu hamburger leur redonne un accès sur mobile, où ils
// étaient auparavant simplement invisibles jusqu'au footer.
const LIENS: { href: string; label: string; ancre: boolean }[] = [
  { href: '/#fonctionnement', label: 'Comment ça marche', ancre: true },
  { href: '/#categories', label: 'Annonces', ancre: true },
  { href: '/guides', label: 'Guides', ancre: false },
  { href: '/especes', label: 'Espèces', ancre: false },
  { href: '/#confiance', label: 'Confiance', ancre: true },
  { href: '/faq', label: 'FAQ débutant', ancre: false },
];

export default function MobileNav() {
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    function surEchap(e: KeyboardEvent) {
      if (e.key === 'Escape') setOuvert(false);
    }
    document.addEventListener('keydown', surEchap);
    return () => document.removeEventListener('keydown', surEchap);
  }, [ouvert]);

  // Ferme le menu automatiquement si on passe en largeur desktop (rotation
  // d'écran, redimensionnement), pour ne pas le laisser ouvert par erreur.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 821px)');
    function surChangement() {
      if (mq.matches) setOuvert(false);
    }
    mq.addEventListener('change', surChangement);
    return () => mq.removeEventListener('change', surChangement);
  }, []);

  return (
    <>
      <button
        type="button"
        className="hamburger-btn"
        aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={ouvert}
        onClick={() => setOuvert((v) => !v)}
      >
        <span />
      </button>
      {ouvert && (
        <div className="mobile-menu" role="navigation" aria-label="Menu">
          <div className="mobile-menu-inner">
            {LIENS.map((lien) =>
              lien.ancre ? (
                <a key={lien.href} href={lien.href} onClick={() => setOuvert(false)}>
                  {lien.label}
                </a>
              ) : (
                <Link key={lien.href} href={lien.href} onClick={() => setOuvert(false)}>
                  {lien.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </>
  );
}
