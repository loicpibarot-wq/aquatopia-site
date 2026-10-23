'use client';

import { useState } from 'react';
import Icone from '@/components/Icone';

interface Props {
  src: string;
  alt: string;
  /** Slug de l'espèce : active le bouton « Signaler la photo ». */
  slug?: string;
}

const MOTIFS: { id: string; label: string }[] = [
  { id: 'mauvais_poisson',    label: "Ce n'est pas le bon animal ou la bonne plante" },
  { id: 'floue',              label: 'Photo floue ou de mauvaise qualité' },
  { id: 'variete_differente', label: 'Mâle / femelle ou variété différente' },
  { id: 'droits_auteur',      label: "Problème de droits d'auteur" },
  { id: 'autre',              label: 'Autre' },
];

type Etat = 'saisie' | 'envoi' | 'merci' | 'erreur' | 'limite';

export default function EspeceImage({ src, alt, slug }: Props) {
  const [visible, setVisible] = useState(true);
  const [ouvert, setOuvert] = useState(false);
  const [motif, setMotif] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [piege, setPiege] = useState('');
  const [etat, setEtat] = useState<Etat>('saisie');

  function fermer() {
    setOuvert(false);
    // On remet le formulaire à zéro après un envoi réussi.
    if (etat === 'merci') { setMotif(null); setMessage(''); }
    setEtat('saisie');
  }

  async function envoyer() {
    if (!motif || !slug) return;
    setEtat('envoi');
    try {
      const r = await fetch('/api/signaler-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, motif, message, site: piege }),
      });
      setEtat(r.ok ? 'merci' : r.status === 429 ? 'limite' : 'erreur');
    } catch {
      setEtat('erreur');
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 760, marginBottom: visible ? 24 : 0 }}>
      <img
        src={src}
        alt={alt}
        width={1200}
        height={675}
        style={{ borderRadius: 12, width: '100%', height: 'auto', display: visible ? 'block' : 'none' }}
        onError={() => setVisible(false)}
      />

      {slug && visible && (
        <button
          type="button"
          onClick={() => setOuvert(true)}
          aria-label="Signaler cette photo"
          title="Signaler cette photo"
          style={{
            position: 'absolute', top: 10, right: 10,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28, padding: 0, borderRadius: '50%', cursor: 'pointer',
            background: 'rgba(11,37,48,0.55)', color: '#e2e8f0',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(4px)', fontFamily: 'inherit',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <circle cx="8" cy="3" r="1.4" />
            <circle cx="8" cy="8" r="1.4" />
            <circle cx="8" cy="13" r="1.4" />
          </svg>
        </button>
      )}

      {ouvert && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) fermer(); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
          }}
        >
          <div
            role="dialog" aria-modal="true" aria-labelledby="signal-photo-titre"
            style={{
              background: '#0f2535', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16,
              padding: '26px 26px 22px', width: '100%', maxWidth: 440,
              maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            }}
          >
            <h2 id="signal-photo-titre" style={{ fontSize: '1.05rem', margin: '0 0 6px', color: '#e2e8f0' }}>
              Signaler la photo
            </h2>

            {etat === 'merci' ? (
              <>
                <p style={{ fontSize: '0.9rem', color: '#9FC3C0', lineHeight: 1.6, margin: '8px 0 20px' }}>
                  <Icone nom="valide" size={16} style={{ marginRight: 6, verticalAlign: '-3px' }} />
                  Merci, votre signalement a bien été transmis. Nous vérifions la photo rapidement.
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={fermer} style={boutonPrincipal(true)}>Fermer</button>
                </div>
              </>
            ) : (
              <>
                <p style={{ fontSize: '0.83rem', color: '#6b7a8d', margin: '0 0 16px' }}>
                  {alt} — qu&apos;est-ce qui ne va pas avec cette photo ?
                </p>

                <div role="radiogroup" aria-label="Motif" style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  {MOTIFS.map((m) => {
                    const actif = motif === m.id;
                    return (
                      <button
                        key={m.id} type="button" role="radio" aria-checked={actif}
                        onClick={() => setMotif(m.id)}
                        style={{
                          textAlign: 'left', padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                          fontFamily: 'inherit', fontSize: '0.88rem',
                          background: actif ? 'rgba(47,217,190,0.12)' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${actif ? 'rgba(47,217,190,0.6)' : 'rgba(255,255,255,0.12)'}`,
                          color: actif ? '#e2e8f0' : '#9FC3C0',
                        }}
                      >
                        {actif && <Icone nom="valide" size={14} strokeWidth={2.6} style={{ marginRight: 8, verticalAlign: '-2px', color: '#2FD9BE' }} />}
                        {m.label}
                      </button>
                    );
                  })}
                </div>

                <label htmlFor="signal-photo-message" style={{ display: 'block', fontSize: '0.8rem', color: '#9FC3C0', marginBottom: 6 }}>
                  Précisions (facultatif)
                </label>
                <textarea
                  id="signal-photo-message" value={message} maxLength={500} rows={3}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex : c'est un néon cardinal, pas un néon bleu…"
                  style={{
                    width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 12px',
                    color: '#e2e8f0', fontSize: '0.88rem', resize: 'vertical', outline: 'none',
                    fontFamily: 'inherit', lineHeight: 1.5, marginBottom: 14,
                  }}
                />

                {/* Champ piège anti-robot : invisible pour les visiteurs. */}
                <input
                  type="text" name="site" value={piege} onChange={(e) => setPiege(e.target.value)}
                  tabIndex={-1} autoComplete="off" aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                />

                {etat === 'erreur' && (
                  <p style={{ fontSize: '0.82rem', color: '#f59e0b', margin: '0 0 12px' }}>
                    L&apos;envoi a échoué. Réessayez dans un instant.
                  </p>
                )}
                {etat === 'limite' && (
                  <p style={{ fontSize: '0.82rem', color: '#f59e0b', margin: '0 0 12px' }}>
                    Vous avez envoyé beaucoup de signalements. Merci de réessayer plus tard.
                  </p>
                )}

                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button type="button" onClick={fermer} style={{
                    background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8,
                    padding: '8px 18px', color: '#9FC3C0', fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'inherit',
                  }}>Annuler</button>
                  <button
                    type="button" onClick={envoyer}
                    disabled={!motif || etat === 'envoi'}
                    style={boutonPrincipal(!!motif && etat !== 'envoi')}
                  >
                    {etat === 'envoi' ? 'Envoi…' : 'Envoyer'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function boutonPrincipal(actif: boolean): React.CSSProperties {
  return {
    background: actif ? '#2FD9BE' : 'rgba(47,217,190,0.25)', border: 'none', borderRadius: 8,
    padding: '8px 18px', color: actif ? '#0B2530' : 'rgba(11,37,48,0.5)',
    fontSize: '0.88rem', fontWeight: 600, cursor: actif ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
  };
}
