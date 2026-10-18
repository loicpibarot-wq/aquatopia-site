'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import Icone from '@/components/Icone';
import type { IconeNom } from '@/lib/icones';

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
    .replace(/[̀-ͯ]/g, '');

const ICONES_CATEGORIE: Record<string, IconeNom> = {
  'Eau douce':              'poisson',
  'Plantes':                'plante',
  'Crevettes / Invertébrés eau douce': 'coquillage',
  'Coraux et anémones':     'corail',
  'Eau de mer':             'vagues',
  'Macroalgues marines':    'pousse',
  'Bassin':                 'arbre',
};
const iconeCategorie = (cat: string): IconeNom => ICONES_CATEGORIE[cat] ?? 'patte';

function BadgeLegal({ statut }: { statut: EspeceCarte['statutLegal'] }) {
  if (statut === 'autorise') return null;
  const cls = statut === 'interdite' || statut === 'autorisation_requise' ? 'interdite' : 'cites';
  const label =
    statut === 'interdite'            ? 'Vente interdite en France' :
    statut === 'autorisation_requise' ? 'Autorisation requise' :
                                        'CITES à justifier';
  return <span className={`badge-legal ${cls}`} style={{ marginTop: 12 }}>{label}</span>;
}

function CarteEspece({ e }: { e: EspeceCarte }) {
  return (
    <Link key={e.slug} href={`/especes/${e.slug}`} className="guide-card">
      <span className="eyebrow">{e.categorie}</span>
      <h3>{e.nomCommun}</h3>
      {normaliser(e.nomCommun) !== normaliser(e.nomScientifique) && (
        <p style={{ fontStyle: 'italic' }}>{e.nomScientifique}</p>
      )}
      <BadgeLegal statut={e.statutLegal} />
    </Link>
  );
}

export default function EspeceRecherche({ especes }: { especes: EspeceCarte[] }) {
  const [recherche, setRecherche] = useState('');
  const [categorie, setCategorie] = useState('');

  const categories = useMemo(
    () => Array.from(new Set(especes.map((e) => e.categorie))).sort((a, b) => a.localeCompare(b, 'fr')),
    [especes],
  );

  const filtrees = useMemo(() => {
    const q = normaliser(recherche.trim());
    return especes.filter((e) => {
      if (categorie && e.categorie !== categorie) return false;
      if (!q) return true;
      return [e.nomCommun, e.nomScientifique, ...(e.autresNoms ?? [])].some((n) => normaliser(n).includes(q));
    });
  }, [especes, recherche, categorie]);

  // Groupement par catégorie (uniquement quand aucun filtre n'est actif)
  const grouped = useMemo(() => {
    if (recherche.trim() || categorie) return null;
    const map = new Map<string, EspeceCarte[]>();
    for (const e of filtrees) {
      if (!map.has(e.categorie)) map.set(e.categorie, []);
      map.get(e.categorie)!.push(e);
    }
    return map;
  }, [filtrees, recherche, categorie]);

  const pillStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 12px',
    borderRadius: 999,
    border: `1.5px solid ${active ? 'var(--teal)' : 'var(--border)'}`,
    background: active ? 'rgba(47,217,190,0.12)' : 'var(--bg-2)',
    color: active ? 'var(--teal)' : 'var(--text-muted)',
    fontSize: '0.82rem',
    fontWeight: active ? 700 : 400,
    cursor: 'pointer',
    transition: 'all .15s',
    textAlign: 'center' as const,
    width: '100%',
  });

  return (
    <>
      {/* Barre de recherche */}
      <input
        type="search"
        className="espece-recherche"
        placeholder="Chercher une espèce (nom courant, autre nom ou nom scientifique)…"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        aria-label="Rechercher une espèce"
      />

      {/* Pills de catégories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))', gap: 8, marginTop: 14 }}>
        <button type="button" onClick={() => setCategorie('')} style={pillStyle(!categorie)}>
          Toutes ({especes.length})
        </button>
        {categories.map((c) => {
          const count = especes.filter((e) => e.categorie === c).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategorie(categorie === c ? '' : c)}
              style={pillStyle(categorie === c)}
            >
              <Icone nom={iconeCategorie(c)} size={15} style={{ marginRight: 6, verticalAlign: '-2px' }} />{c} ({count})
            </button>
          );
        })}
      </div>

      {/* Résultats */}
      {filtrees.length === 0 ? (
        <p className="espece-vide">Aucune espèce ne correspond à votre recherche.</p>
      ) : grouped ? (
        /* Mode par défaut — regroupé par catégorie */
        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 48 }}>
          {Array.from(grouped.entries()).map(([cat, items]) => (
            <section key={cat}>
              <h2 style={{
                fontFamily: "'Fredoka',sans-serif",
                fontSize: '1.25rem',
                color: 'var(--text)',
                marginBottom: 20,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ display: 'inline-flex', color: 'var(--teal)' }}><Icone nom={iconeCategorie(cat)} size={22} /></span>
                {cat}
                <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)', fontFamily: 'inherit' }}>
                  — {items.length} espèce{items.length > 1 ? 's' : ''}
                </span>
              </h2>
              <div className="guide-grid">
                {items.map((e) => <CarteEspece key={e.slug} e={e} />)}
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* Mode filtré / recherche — liste plate */
        <div className="guide-grid" style={{ marginTop: 28 }}>
          {filtrees.map((e) => <CarteEspece key={e.slug} e={e} />)}
        </div>
      )}
    </>
  );
}
