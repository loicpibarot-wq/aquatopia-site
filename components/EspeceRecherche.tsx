'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
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

// Une icône par catégorie réelle du catalogue (voir CategorieEspece).
const ICONES_CATEGORIE: Record<string, IconeNom> = {
  'Eau Douce':                         'poisson',
  'Poissons marins':                   'poisson-symbole',
  'Plantes':                           'plante',
  'Crustacés / Invertébrés eau douce': 'crevette',
  'Mollusques eau douce':              'escargot',
  'Invertébrés marins':                'coquillage',
  'Coraux et anémones':                'corail',
  'Macroalgues marines':               'pousse',
  'Bassin':                            'arbre',
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
  // Photo de la fiche en miniature ; si le fichier manque, la carte reste telle quelle.
  const [photoOk, setPhotoOk] = useState(true);
  return (
    <Link key={e.slug} href={`/especes/${e.slug}`} className={`guide-card${photoOk ? ' avec-photo' : ''}`}>
      <div className="carte-texte">
        <span className="eyebrow">{e.categorie}</span>
        <h3>{e.nomCommun}</h3>
        {normaliser(e.nomCommun) !== normaliser(e.nomScientifique) && (
          <p style={{ fontStyle: 'italic' }}>{e.nomScientifique}</p>
        )}
        <BadgeLegal statut={e.statutLegal} />
      </div>
      {photoOk && (
        <Image
          src={`/especes/${e.slug}.webp`}
          alt={e.nomCommun}
          width={256}
          height={168}
          sizes="128px"
          loading="lazy"
          className="espece-vignette"
          onError={() => setPhotoOk(false)}
        />
      )}
    </Link>
  );
}

// Mémorise l'état de la liste quand on ouvre une fiche, pour le retrouver
// (filtres + position) quand on revient avec « Espèces ». Le drapeau « retour »
// est posé par LienRetour : sans lui, une visite normale repart de zéro.
export const CLE_LISTE_ESPECES = 'aquatopia_especes_liste_v1';
export const CLE_RETOUR_ESPECES = 'aquatopia_especes_retour_v1';

export default function EspeceRecherche({ especes }: { especes: EspeceCarte[] }) {
  const [recherche, setRecherche] = useState('');
  const [categorie, setCategorie] = useState('');
  const [restauree, setRestauree] = useState(false);
  const scrollARestaurer = useRef(0);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(CLE_RETOUR_ESPECES)) {
        const brut = sessionStorage.getItem(CLE_LISTE_ESPECES);
        if (brut) {
          const d = JSON.parse(brut) as { recherche?: string; categorie?: string; scroll?: number };
          if (typeof d.recherche === 'string') setRecherche(d.recherche);
          if (typeof d.categorie === 'string') setCategorie(d.categorie);
          scrollARestaurer.current = Number(d.scroll) || 0;
        }
      }
      if (sessionStorage.getItem(CLE_RETOUR_ESPECES)) sessionStorage.removeItem(CLE_LISTE_ESPECES);
      sessionStorage.removeItem(CLE_RETOUR_ESPECES);
    } catch { /* stockage indisponible : liste de départ */ }
    setRestauree(true);
  }, []);

  // Une fois filtres rétablis et liste redessinée, on remet la page à la
  // position où l'on avait cliqué.
  useEffect(() => {
    if (!restauree || !scrollARestaurer.current) return;
    const y = scrollARestaurer.current;
    scrollARestaurer.current = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior })));
  }, [restauree]);

  function memoriserListe(e: React.MouseEvent) {
    const lien = (e.target as HTMLElement).closest('a[href^="/especes/"]');
    if (!lien) return;
    const slug = (lien.getAttribute('href') ?? '').split('/').filter(Boolean).pop();
    if (!slug) return;
    try {
      sessionStorage.setItem(CLE_LISTE_ESPECES, JSON.stringify({ recherche, categorie, scroll: window.scrollY, slug }));
    } catch { /* ignoré */ }
  }

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

  // Pendant la saisie : liste compacte de suggestions affichée juste sous la
  // barre de recherche, sur toutes les catégories (le filtre de catégorie est
  // mis de côté tant qu'on tape). Les noms qui COMMENCENT par la saisie
  // passent en premier, puis ceux qui la contiennent.
  const enRecherche = recherche.trim().length > 0;
  const suggestions = useMemo(() => {
    const q = normaliser(recherche.trim());
    if (!q) return [];
    const rang = (e: EspeceCarte) => {
      if (normaliser(e.nomCommun).startsWith(q)) return 0;
      const noms = [e.nomScientifique, ...(e.autresNoms ?? [])].map(normaliser);
      if (noms.some((n) => n.startsWith(q))) return 1;
      return 2;
    };
    return especes
      .filter((e) => [e.nomCommun, e.nomScientifique, ...(e.autresNoms ?? [])].some((n) => normaliser(n).includes(q)))
      .sort((a, b) => rang(a) - rang(b) || a.nomCommun.localeCompare(b.nomCommun, 'fr'));
  }, [especes, recherche]);

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
    <div onClickCapture={memoriserListe}>
      {/* Barre de recherche */}
      <input
        type="search"
        className="espece-recherche"
        placeholder="Chercher une espèce (nom courant, autre nom ou nom scientifique)…"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        aria-label="Rechercher une espèce"
        autoComplete="off"
        enterKeyHint="search"
      />

      {/* Pills de catégories (masquées pendant la saisie : la liste de
          suggestions prend la place, juste sous la barre de recherche) */}
      {!enRecherche && (
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
      )}

      {/* Résultats */}
      {enRecherche ? (
        /* Pendant la saisie — liste de suggestions compacte */
        suggestions.length === 0 ? (
          <p className="espece-vide">Aucune espèce ne correspond à votre recherche.</p>
        ) : (
          <div style={{ marginTop: 14 }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 8px 4px' }}>
              {suggestions.length} résultat{suggestions.length > 1 ? 's' : ''}
            </p>
            <div role="list" style={{ border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', background: 'var(--bg-2)' }}>
              {suggestions.map((e, i) => (
                <Link
                  key={e.slug}
                  href={`/especes/${e.slug}`}
                  role="listitem"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px',
                    borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                    textDecoration: 'none', color: 'inherit',
                  }}
                >
                  <span style={{ display: 'inline-flex', color: 'var(--teal)', flexShrink: 0 }}>
                    <Icone nom={iconeCategorie(e.categorie)} size={20} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontWeight: 600, color: 'var(--text)' }}>{e.nomCommun}</span>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', overflowWrap: 'anywhere' }}>
                      {normaliser(e.nomCommun) !== normaliser(e.nomScientifique) && (
                        <i>{e.nomScientifique} · </i>
                      )}
                      {e.categorie}
                    </span>
                  </span>
                  {e.statutLegal !== 'autorise' && (
                    <span
                      className={`badge-legal ${e.statutLegal === 'interdite' || e.statutLegal === 'autorisation_requise' ? 'interdite' : 'cites'}`}
                      style={{ flexShrink: 0, fontSize: '0.7rem' }}
                    >
                      {e.statutLegal === 'interdite' ? 'Interdite' : e.statutLegal === 'autorisation_requise' ? 'Autorisation' : 'CITES'}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )
      ) : filtrees.length === 0 ? (
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
    </div>
  );
}
