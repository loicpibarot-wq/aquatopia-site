'use client';

import { useState, useEffect } from 'react';

export default function SignalementModal() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageUrl(window.location.href);
    }
  }, []);

  function handleSend() {
    const subject = encodeURIComponent("Signalement d'erreur – Aquatopia");
    const body = encodeURIComponent(
      `Page concernée : ${pageUrl}\n\nDescription de l'erreur :\n${message}`
    );
    window.location.href = `mailto:loic.cimmimmobilier@gmail.com?subject=${subject}&body=${body}`;
    setOpen(false);
    setMessage('');
  }

  return (
    <>
      {/* Bouton discret en bas de page */}
      <div style={{ marginTop: 40, paddingTop: 20, display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#6b7a8d',
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 10px',
            borderRadius: 6,
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#9FC3C0')}
          onMouseLeave={e => (e.currentTarget.style.color = '#6b7a8d')}
          aria-label="Signaler une erreur sur cette page"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Signaler une erreur
        </button>
      </div>

      {/* Overlay modal */}
      {open && (
        <div
          onClick={e => { if (e.target === e.currentTarget) { setOpen(false); setMessage(''); } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16,
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="signalement-titre"
            style={{
              background: '#0f2535',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16,
              padding: '28px 28px 24px',
              width: '100%', maxWidth: 440,
              boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            }}
          >
            <h2 id="signalement-titre" style={{ fontSize: '1.05rem', margin: '0 0 6px', color: '#e2e8f0' }}>
              Signaler une erreur
            </h2>
            <p style={{ fontSize: '0.83rem', color: '#6b7a8d', margin: '0 0 20px' }}>
              Votre signalement sera envoyé par email à notre équipe.
            </p>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '0.8rem', color: '#9FC3C0', marginBottom: 6 }}>
                Page concernée
              </div>
              <div style={{
                fontSize: '0.82rem', color: '#6b7a8d',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8, padding: '8px 12px',
                wordBreak: 'break-all', lineHeight: 1.5,
              }}>
                {pageUrl}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="signalement-message"
                style={{ display: 'block', fontSize: '0.8rem', color: '#9FC3C0', marginBottom: 6 }}
              >
                Description de l&apos;erreur
              </label>
              <textarea
                id="signalement-message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Décrivez l'erreur observée…"
                rows={4}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8, padding: '10px 12px',
                  color: '#e2e8f0', fontSize: '0.88rem',
                  resize: 'vertical', outline: 'none',
                  fontFamily: 'inherit', lineHeight: 1.5,
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setOpen(false); setMessage(''); }}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8, padding: '8px 18px',
                  color: '#9FC3C0', fontSize: '0.88rem',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                style={{
                  background: message.trim() ? '#2FD9BE' : 'rgba(47,217,190,0.25)',
                  border: 'none',
                  borderRadius: 8, padding: '8px 18px',
                  color: message.trim() ? '#0B2530' : 'rgba(11,37,48,0.5)',
                  fontSize: '0.88rem', fontWeight: 600,
                  cursor: message.trim() ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit',
                  transition: 'background .15s, color .15s',
                }}
              >
                Envoyer par email
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
