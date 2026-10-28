'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { memoriserSource } from '@/lib/analytics';

// Identifiant de mesure Google Analytics 4. Vide, rien n'est chargé et aucun
// bandeau n'est affiché.
// Cet identifiant est public (il apparaît dans le code de toute page qui l'utilise) :
// on peut le laisser ici, ou le remplacer via NEXT_PUBLIC_GA_ID.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-XBCWZ7Z8WE';
const CLE = 'aquatopia_consentement_v1';

type Choix = 'accepte' | 'refuse' | null;

function lireChoix(): Choix {
  try {
    const v = localStorage.getItem(CLE);
    return v === 'accepte' || v === 'refuse' ? v : null;
  } catch {
    return null;
  }
}

/**
 * Google Analytics n'est chargé qu'après un « Accepter » explicite (règles
 * CNIL sur les cookies). Le choix est mémorisé ; le lien « Gérer les cookies »
 * du pied de page permet de le changer à tout moment.
 */
export default function ConsentementAnalytics() {
  const [choix, setChoix] = useState<Choix>(null);
  const [pret, setPret] = useState(false);
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    memoriserSource();
    const c = lireChoix();
    setChoix(c);
    setOuvert(c === null);
    setPret(true);
    const rouvrir = () => setOuvert(true);
    window.addEventListener('aquatopia-cookies', rouvrir);
    return () => window.removeEventListener('aquatopia-cookies', rouvrir);
  }, []);

  function decider(c: 'accepte' | 'refuse') {
    try { localStorage.setItem(CLE, c); } catch { /* stockage indisponible */ }
    // Refus après acceptation : on recharge pour couper proprement le suivi.
    if (c === 'refuse' && choix === 'accepte') {
      window.location.reload();
      return;
    }
    setChoix(c);
    setOuvert(false);
  }

  if (!GA_ID || !pret) return null;

  return (
    <>
      {choix === 'accepte' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {ouvert && (
        <div
          role="dialog"
          aria-label="Choix sur les cookies de mesure d'audience"
          style={{
            position: 'fixed', left: 12, right: 12, bottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
            zIndex: 60, maxWidth: 440, margin: '0 auto',
            padding: '16px 18px 18px', borderRadius: 'var(--radius-m)',
            background: 'var(--bg-2)', border: '1px solid var(--border)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0 0 14px', fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--text-muted)' }}>
            Nous utilisons des cookies pour mesurer l&apos;audience du site. Vous pouvez les accepter ou les refuser.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            <button type="button" className="btn btn-ghost" style={{ flex: 1, maxWidth: 160, justifyContent: 'center', fontSize: '0.85rem', padding: '9px 12px' }} onClick={() => decider('refuse')}>
              Refuser
            </button>
            <button type="button" className="btn btn-primary" style={{ flex: 1, maxWidth: 160, justifyContent: 'center', fontSize: '0.85rem', padding: '9px 12px' }} onClick={() => decider('accepte')}>
              Accepter
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Lien du pied de page pour rouvrir le choix. */
export function LienGererCookies({ className }: { className?: string }) {
  if (!GA_ID) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event('aquatopia-cookies'))}
      style={{ background: 'none', border: 0, padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' }}
    >
      Gérer les cookies
    </button>
  );
}
