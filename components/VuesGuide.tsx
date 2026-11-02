'use client';

import { useEffect, useState } from 'react';

// Compte une lecture par visite et par guide, puis affiche le total une fois qu'il est
// au moins égal au seuil (1 : dès la première lecture ; on peut le relever pour masquer les petits chiffres).
export default function VuesGuide({ slug, seuil = 1 }: { slug: string; seuil?: number }) {
  const [vues, setVues] = useState<number | null>(null);

  useEffect(() => {
    const cle = `aquatopia_lecture_${slug}`;
    let dejaVu = false;
    try { dejaVu = !!sessionStorage.getItem(cle); } catch { /* stockage indisponible */ }
    if (!dejaVu) {
      try { sessionStorage.setItem(cle, '1'); } catch { /* stockage indisponible */ }
    }
    fetch(`/api/vues-guides/${slug}`, { method: dejaVu ? 'GET' : 'POST' })
      .then((r) => r.json())
      .then((d: { vues: number }) => setVues(d.vues))
      .catch(() => {});
  }, [slug]);

  if (vues === null || vues < seuil) return null;

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 10 }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {vues.toLocaleString('fr-FR')} lecture{vues !== 1 ? 's' : ''}
    </span>
  );
}
