'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

interface EspeceCarte {
  slug: string;
  nomCommun: string;
  nomScientifique: string;
  categorie: string;
  statutLegal: 'autorise' | 'cites_a_signaler' | 'interdite';
}

// Filtre côté client sur nom courant ET nom scientifique (les deux façons
// de chercher une espèce) : un simple .filter() suffit largement, la liste
// reste petite (quelques centaines d'entrées au maximum).
export default function EspeceRecherche({ especes }: { especes: EspeceCarte[] }) {
  const [recherche, setRecherche] = useState('');

  const filtrees = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    if (!q) return especes;
    return especes.filter(
      (e) => e.nomCommun.toLowerCase().includes(q) || e.nomScientifique.toLowerCase().includes(q),
    );
  }, [especes, recherche]);

  return (
    <>
      <input
        type="search"
        className="espece-recherche"
        placeholder="Chercher une espèce (nom courant ou scientifique)…"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        aria-label="Rechercher une espèce"
      />

      {filtrees.length === 0 ? (
        <p className="espece-vide">Aucune espèce ne correspond à « {recherche} ».</p>
      ) : (
        <div className="guide-grid" style={{ marginTop: 28 }}>
          {filtrees.map((e) => (
            <Link key={e.slug} href={`/especes/${e.slug}`} className="guide-card">
              <span className="eyebrow">{e.categorie}</span>
              <h3>{e.nomCommun}</h3>
              <p style={{ fontStyle: 'italic' }}>{e.nomScientifique}</p>
              {e.statutLegal !== 'autorise' && (
                <span
                  className={`badge-legal ${e.statutLegal === 'interdite' ? 'interdite' : 'cites'}`}
                  style={{ marginTop: 12 }}
                >
                  {e.statutLegal === 'interdite' ? 'Vente interdite en France' : 'CITES à signaler'}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
