'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

interface EspeceCarte {
  slug: string;
  nomCommun: string;
  nomScientifique: string;
  categorie: string;
  statutLegal: 'autorise' | 'cites_a_signaler' | 'autorisation_requise' | 'interdite';
  autresNoms?: string[];
}

// Recherche insensible aux accents et à la casse (« Elodee » trouve « Élodée »).
const normaliser = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

// Filtre côté client sur nom courant, nom scientifique ET autres noms (les
// façons de chercher une espèce), avec un filtre de catégorie : un simple
// .filter() suffit largement, la liste reste petite (quelques centaines
// d'entrées au maximum).
export default function EspeceRecherche({ especes }: { especes: EspeceCarte[] }) {
  const [recherche, setRecherche] = useState('');
  const [categorie, setCategorie] = useState('');
  const categories = useMemo(() => Array.from(new Set(especes.map((e) => e.categorie))).sort((a, b) => a.localeCompare(b, 'fr')), [especes]);

  const filtrees = useMemo(() => {
    const q = normaliser(recherche.trim());
    return especes.filter((e) => {
      if (categorie && e.categorie !== categorie) return false;
      if (!q) return true;
      return [e.nomCommun, e.nomScientifique, ...(e.autresNoms ?? [])].some((n) => normaliser(n).includes(q));
    });
  }, [especes, recherche, categorie]);

  return (
    <>
      <input
        type="search"
        className="espece-recherche"
        placeholder="Chercher une espèce (nom courant, autre nom ou nom scientifique)…"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        aria-label="Rechercher une espèce"
      />
      <select
        className="espece-recherche"
        style={{ marginTop: 12 }}
        value={categorie}
        onChange={(e) => setCategorie(e.target.value)}
        aria-label="Filtrer par catégorie"
      >
        <option value="">Toutes les catégories ({especes.length})</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c} ({especes.filter((e) => e.categorie === c).length})
          </option>
        ))}
      </select>

      {filtrees.length === 0 ? (
        <p className="espece-vide">Aucune espèce ne correspond à votre recherche.</p>
      ) : (
        <div className="guide-grid" style={{ marginTop: 28 }}>
          {filtrees.map((e) => (
            <Link key={e.slug} href={`/especes/${e.slug}`} className="guide-card">
              <span className="eyebrow">{e.categorie}</span>
              <h3>{e.nomCommun}</h3>
              {normaliser(e.nomCommun) !== normaliser(e.nomScientifique) && <p style={{ fontStyle: 'italic' }}>{e.nomScientifique}</p>}
              {e.statutLegal !== 'autorise' && (
                <span
                  className={`badge-legal ${e.statutLegal === 'interdite' || e.statutLegal === 'autorisation_requise' ? 'interdite' : 'cites'}`}
                  style={{ marginTop: 12 }}
                >
                  {e.statutLegal === 'interdite' ? 'Vente interdite en France' : e.statutLegal === 'autorisation_requise' ? 'Autorisation requise' : 'CITES à justifier'}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
