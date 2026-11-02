'use client';

import { useEffect, useState } from 'react';

export default function VuesEspece({ slug }: { slug: string }) {
  const [vues, setVues] = useState<number | null>(null);

  useEffect(() => {
    // Une vue est comptée une seule fois par visite et par fiche (écriture, non mise en
    // cache) ; les rechargements suivants se contentent de lire le total (lecture en cache).
    const cle = `aquatopia_vue_${slug}`;
    let dejaVue = false;
    try { dejaVue = !!sessionStorage.getItem(cle); } catch { /* stockage indisponible */ }
    if (!dejaVue) {
      try { sessionStorage.setItem(cle, '1'); } catch { /* stockage indisponible */ }
    }
    fetch(`/api/vues/${slug}`, { method: dejaVue ? 'GET' : 'POST' })
      .then((r) => r.json())
      .then((d: { vues: number }) => setVues(d.vues))
      .catch(() => {});
  }, [slug]);

  if (vues === null) return null;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
        marginTop: 8,
      }}
    >
      <svg
        width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {vues.toLocaleString('fr-FR')} vue{vues !== 1 ? 's' : ''}
    </span>
  );
}
