'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { memoriserSource } from '@/lib/analytics';

// Identifiant de mesure Google Analytics 4. Vide, rien n'est chargé et aucun
// bandeau n'est affiché.
// Cet identifiant est public (il apparaît dans le code de toute page qui l'utilise) :
// on peut le laisser ici, ou le remplacer via NEXT_PUBLIC_GA_ID.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-XBCWZ7Z8WE';
// v2 : le choix est enregistré avec sa date (l'ancienne clé v1, sans date et donnée avant que
// le bandeau ne nomme Google Analytics, n'est plus prise en compte : le choix est redemandé).
const CLE = 'aquatopia_consentement_v2';
const ANCIENNE_CLE = 'aquatopia_consentement_v1';
// Le choix (accord ou refus) est redemandé au bout de 6 mois (recommandation CNIL).
const DUREE_CHOIX_MS = 182 * 24 * 60 * 60 * 1000;
// Durée de vie des cookies _ga : 390 jours (moins de 13 mois), non prolongée à chaque visite
// (cookie_update: false), comme le demande la CNIL. Par défaut, Google les garde 2 ans.
const DUREE_COOKIES_S = 390 * 24 * 60 * 60;

type Choix = 'accepte' | 'refuse' | null;

function lireChoix(): Choix {
  try {
    const brut = localStorage.getItem(CLE);
    if (!brut) return null;
    const { choix, date } = JSON.parse(brut) as { choix?: string; date?: number };
    if (choix !== 'accepte' && choix !== 'refuse') return null;
    if (typeof date !== 'number' || Date.now() - date > DUREE_CHOIX_MS) return null;
    return choix;
  } catch {
    return null;
  }
}

/** Supprime les cookies Google Analytics (_ga, _ga_<id>…) sur le domaine et ses domaines parents. */
function supprimerCookiesGa() {
  try {
    const noms = document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => n.startsWith('_ga'));
    if (noms.length === 0) return;
    const morceaux = window.location.hostname.split('.');
    const domaines: (string | null)[] = [null];
    for (let i = 0; i < morceaux.length - 1; i++) {
      const d = morceaux.slice(i).join('.');
      domaines.push(d, `.${d}`);
    }
    for (const nom of noms) {
      for (const d of domaines) {
        document.cookie = `${nom}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ''}`;
      }
    }
  } catch { /* cookies indisponibles */ }
}

/**
 * Google Analytics n'est chargé qu'après un « Accepter » explicite (règles
 * CNIL sur les cookies). Le choix est mémorisé 6 mois ; le lien « Gérer les cookies »
 * du pied de page permet de le changer à tout moment. Refuser supprime les cookies _ga.
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
    // Prévient le bandeau « Installer l'appli » (Android) qu'il peut s'afficher.
    try { window.dispatchEvent(new Event('aquatopia-consentement')); } catch { /* rien */ }
    try {
      localStorage.setItem(CLE, JSON.stringify({ choix: c, date: Date.now() }));
      localStorage.removeItem(ANCIENNE_CLE);
    } catch { /* stockage indisponible */ }
    if (c === 'refuse') {
      supprimerCookiesGa();
      // Refus après acceptation : on recharge pour couper proprement le suivi déjà chargé.
      if (choix === 'accepte') {
        window.location.reload();
        return;
      }
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
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true,cookie_expires:${DUREE_COOKIES_S},cookie_update:false});`}
          </Script>
        </>
      )}

      {ouvert && (
        <div
          role="dialog"
          aria-label="Choix sur les cookies Google Analytics"
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
            Avec votre accord, nous utilisons <strong>Google Analytics</strong> (cookies _ga, 13 mois au plus) pour savoir quelles pages sont utiles. Aucune publicité. Refuser ne change rien à votre visite.{' '}
            <Link href="/confidentialite" style={{ color: 'inherit', textDecoration: 'underline' }}>En savoir plus</Link>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            <button type="button" className="btn btn-primary" style={{ flex: 1, maxWidth: 160, justifyContent: 'center', fontSize: '0.85rem', padding: '9px 12px', minHeight: 44 }} onClick={() => decider('refuse')}>
              Refuser
            </button>
            <button type="button" className="btn btn-primary" style={{ flex: 1, maxWidth: 160, justifyContent: 'center', fontSize: '0.85rem', padding: '9px 12px', minHeight: 44 }} onClick={() => decider('accepte')}>
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
