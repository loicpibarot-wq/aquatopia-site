'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export type ItemLieu = { href: string; nom: string; code?: string; n: number };

const norm = (t: string) =>
  t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Grille de cartes avec recherche : on affiche les plus fournies d'abord, le
// reste se déplie ou se trouve en tapant dans le champ.
export default function ListeLieux({
  items,
  placeholder,
  visiblesParDefaut = Infinity,
}: {
  items: ItemLieu[];
  placeholder: string;
  visiblesParDefaut?: number;
}) {
  const [q, setQ] = useState('');
  const [tout, setTout] = useState(false);

  const recherche = q.trim().length > 0;
  const correspond = useMemo(() => {
    const n = norm(q.trim());
    return items.map((i) => !n || norm(`${i.nom} ${i.code ?? ''}`).includes(n));
  }, [items, q]);
  const nbCorrespond = correspond.filter(Boolean).length;
  // Tous les liens restent dans le HTML (utile pour Google) ; on masque
  // seulement ceux au-delà de la limite tant que la liste n'est pas dépliée.
  const visible = (idx: number) => correspond[idx] && (recherche || tout || idx < visiblesParDefaut);

  return (
    <div>
      {items.length > 12 && (
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="lieu-recherche"
        />
      )}
      {nbCorrespond > 0 ? (
        <div className="lieu-grid">
          {items.map((i, idx) => (
            <Link key={i.href} href={i.href} className="lieu-card" hidden={!visible(idx)}>
              <span className="lieu-nom">{i.nom}{i.code ? <small> {i.code}</small> : null}</span>
              <span className="lieu-n">{i.n} annonce{i.n > 1 ? 's' : ''}</span>
            </Link>
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--text-muted)', margin: '8px 0 0' }}>Aucun résultat pour « {q} ».</p>
      )}
      {!recherche && !tout && Number.isFinite(visiblesParDefaut) && items.length > visiblesParDefaut && (
        <button type="button" className="btn btn-ghost lieu-plus" onClick={() => setTout(true)}>
          Voir les {items.length - visiblesParDefaut} autres
        </button>
      )}
    </div>
  );
}
