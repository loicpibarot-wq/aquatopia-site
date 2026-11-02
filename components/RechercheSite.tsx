'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { suivre } from '@/lib/analytics';
import {
  chercher, preparer, LIBELLE_GROUPE, MAX_PAR_GROUPE,
  type ElementIndex, type Prepare, type TypeResultat,
} from '@/lib/recherche';

const SUGGESTIONS = ['le pH', 'cyclage', 'algues', 'crevettes', 'vendre mon aquarium'];

type Groupe = { type: TypeResultat; items: Prepare[] };

// Champ de recherche de l'accueil : trouve un guide, une espèce, une définition ou une page du site.
export default function RechercheSite() {
  const [q, setQ] = useState('');
  const [ouvert, setOuvert] = useState(false);
  const [actif, setActif] = useState(-1);
  const [index, setIndex] = useState<Prepare[] | null>(null);
  const [erreur, setErreur] = useState(false);
  const racine = useRef<HTMLDivElement>(null);
  const champ = useRef<HTMLInputElement>(null);
  const idListe = useId();

  const charger = () => {
    if (index || erreur) return;
    fetch('/api/recherche')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j: ElementIndex[]) => setIndex(preparer(j)))
      .catch(() => setErreur(true));
  };

  const groupes: Groupe[] = useMemo(() => {
    if (!index || !q.trim()) return [];
    const trouves = chercher(index, q);
    const par = new Map<TypeResultat, { items: Prepare[]; top: number }>();
    for (const { item, score } of trouves) {
      const g = par.get(item.t) ?? { items: [], top: score };
      if (g.items.length < MAX_PAR_GROUPE[item.t]) g.items.push(item);
      par.set(item.t, g);
    }
    return [...par.entries()].sort((a, b) => b[1].top - a[1].top).map(([type, g]) => ({ type, items: g.items }));
  }, [index, q]);

  const plat = useMemo(() => groupes.flatMap((g) => g.items), [groupes]);
  const aRequete = q.trim().length > 0;

  useEffect(() => { setActif(-1); }, [q]);

  useEffect(() => {
    const dehors = (e: MouseEvent) => {
      if (racine.current && !racine.current.contains(e.target as Node)) setOuvert(false);
    };
    document.addEventListener('mousedown', dehors);
    return () => document.removeEventListener('mousedown', dehors);
  }, []);

  const choisi = (i: Prepare) => {
    suivre('recherche_site_clic', { type: i.t });
    setOuvert(false);
  };

  const clavier = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setOuvert(false); return; }
    if (!plat.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setOuvert(true); setActif((a) => (a + 1) % plat.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActif((a) => (a <= 0 ? plat.length - 1 : a - 1)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const cible = plat[actif >= 0 ? actif : 0];
      if (cible) { choisi(cible); window.location.assign(cible.href); }
    }
  };

  const idOption = (n: number) => `${idListe}-o${n}`;
  let n = -1;

  return (
    <div className="recherche" ref={racine}>
      <div className="recherche-champ">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={champ}
          type="search"
          role="combobox"
          aria-expanded={ouvert && aRequete}
          aria-controls={idListe}
          aria-activedescendant={actif >= 0 ? idOption(actif) : undefined}
          aria-autocomplete="list"
          aria-label="Rechercher sur Aquatopia"
          placeholder="Une question ? Cherchez un guide, une espèce…"
          autoComplete="off"
          enterKeyHint="search"
          value={q}
          onFocus={() => { charger(); setOuvert(true); }}
          onChange={(e) => { setQ(e.target.value); setOuvert(true); charger(); }}
          onKeyDown={clavier}
        />
        {ouvert && aRequete && (
          <div className="recherche-liste" id={idListe} role="listbox" aria-label="Résultats de la recherche">
            {!index && !erreur && <p className="recherche-vide">Recherche…</p>}
            {erreur && <p className="recherche-vide">La recherche est indisponible pour le moment. <Link href="/guides">Parcourir les guides</Link></p>}
            {index && groupes.length === 0 && (
              <div className="recherche-vide">
                <p style={{ margin: 0 }}>Aucun résultat pour « {q.trim()} ».</p>
                <p className="recherche-rebond">
                  <Link href="/guides">Tous les guides</Link>
                  <Link href="/faq">FAQ débutant</Link>
                  <Link href="/simulateur">Simulateur</Link>
                </p>
              </div>
            )}
            {groupes.map((g) => (
              <div key={g.type} role="group" aria-label={LIBELLE_GROUPE[g.type]}>
                <p className="recherche-groupe">{LIBELLE_GROUPE[g.type]}</p>
                {g.items.map((it) => {
                  n += 1;
                  const num = n;
                  return (
                    <Link
                      key={`${it.t}-${it.href}-${it.titre}`}
                      id={idOption(num)}
                      role="option"
                      aria-selected={actif === num}
                      href={it.href}
                      className={`recherche-item${actif === num ? ' actif' : ''}`}
                      onClick={() => choisi(it)}
                      onMouseEnter={() => setActif(num)}
                    >
                      <span className="recherche-titre">{it.titre}</span>
                      {it.sous && <span className="recherche-sous">{it.sous}</span>}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="recherche-suggestions">
        <span>Essayez :</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => { setQ(s); setOuvert(true); charger(); champ.current?.focus(); suivre('recherche_site_suggestion', { suggestion: s }); }}
          >
            {s}
          </button>
        ))}
      </p>
    </div>
  );
}
