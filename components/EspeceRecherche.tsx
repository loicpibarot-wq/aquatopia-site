'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import Icone from '@/components/Icone';
import { suivre } from '@/lib/analytics';
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

// Trois grands univers ; chacun regroupe des catégories du catalogue.
const UNIVERS: { id: string; label: string; icone: IconeNom; categories: string[] }[] = [
  { id: 'eau-douce', label: 'Eau douce', icone: 'poisson', categories: ['Eau Douce', 'Plantes', 'Crustacés / Invertébrés eau douce', 'Mollusques eau douce'] },
  { id: 'recifal',   label: 'Récifal',   icone: 'corail',  categories: ['Poissons marins', 'Coraux et anémones', 'Invertébrés marins', 'Macroalgues marines'] },
  { id: 'bassin',    label: 'Bassin',    icone: 'arbre',   categories: ['Bassin'] },
];
const universDe = (cat: string) => UNIVERS.find((u) => u.categories.includes(cat))?.id ?? '';
// Libellés plus parlants dans la ligne de sous-catégories.
const LIBELLE_SOUS: Record<string, string> = { 'Eau Douce': "Poissons d'eau douce" };

function BadgeLegal({ statut, surPhoto = false }: { statut: EspeceCarte['statutLegal']; surPhoto?: boolean }) {
  // Sans photo, seule une contrainte légale est signalée ; sur la photo, on affiche aussi « Autorisé ».
  if (statut === 'autorise' && !surPhoto) return null;
  const cls = statut === 'autorise' ? 'autorise'
    : statut === 'interdite' || statut === 'autorisation_requise' ? 'interdite' : 'cites';
  const label =
    statut === 'autorise'             ? 'Autorisé' :
    statut === 'interdite'            ? (surPhoto ? 'Vente interdite FR' : 'Vente interdite en France') :
    statut === 'autorisation_requise' ? 'Autorisation requise' :
                                        'CITES à justifier';
  const icone: IconeNom = statut === 'autorise' ? 'valide' : 'alerte';
  return (
    <span className={`badge-legal ${cls}${surPhoto ? ' sur-photo' : ''}`} style={surPhoto ? undefined : { marginTop: 12 }}>
      {surPhoto && <Icone nom={icone} size={14} />}
      {label}
    </span>
  );
}

function CarteEspece({ e }: { e: EspeceCarte }) {
  // Photo de la fiche en miniature ; si le fichier manque, la carte reste telle quelle.
  const [photoOk, setPhotoOk] = useState(true);
  return (
    <Link key={e.slug} href={`/especes/${e.slug}`} className={`guide-card${photoOk ? ' photo-grande' : ''}`}>
      {photoOk && (
        <div className="carte-photo">
          <Image
            src={`/especes/${e.slug}.webp`}
            alt={e.nomCommun}
            width={640}
            height={400}
            sizes="(max-width: 600px) 100vw, 360px"
            loading="lazy"
            className="espece-vignette"
            onError={() => setPhotoOk(false)}
          />
          <BadgeLegal statut={e.statutLegal} surPhoto />
        </div>
      )}
      <div className="carte-texte">
        <span className="eyebrow">{e.categorie}</span>
        <h3>{e.nomCommun}</h3>
        {normaliser(e.nomCommun) !== normaliser(e.nomScientifique) && (
          <p style={{ fontStyle: 'italic' }}>{e.nomScientifique}</p>
        )}
        {!photoOk && <BadgeLegal statut={e.statutLegal} />}
      </div>
    </Link>
  );
}

// Mémorise l'état de la liste quand on ouvre une fiche, pour le retrouver
// (filtres + position) quand on revient avec « Espèces ». Le drapeau « retour »
// est posé par LienRetour : sans lui, une visite normale repart de zéro.
export const CLE_LISTE_ESPECES = 'aquatopia_especes_liste_v1';
export const CLE_RETOUR_ESPECES = 'aquatopia_especes_retour_v1';

export default function EspeceRecherche({ especes }: { especes: EspeceCarte[] }) {
  const [recherche, setRecherche] = useState('');
  const [categorie, setCategorie] = useState('');
  const [univers, setUnivers] = useState('');
  const [restauree, setRestauree] = useState(false);
  const scrollARestaurer = useRef(0);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(CLE_RETOUR_ESPECES)) {
        const brut = sessionStorage.getItem(CLE_LISTE_ESPECES);
        if (brut) {
          const d = JSON.parse(brut) as { recherche?: string; categorie?: string; univers?: string; scroll?: number };
          if (typeof d.recherche === 'string') setRecherche(d.recherche);
          if (typeof d.categorie === 'string') setCategorie(d.categorie);
          if (typeof d.univers === 'string') setUnivers(d.univers);
          else if (typeof d.categorie === 'string') setUnivers(universDe(d.categorie));
          scrollARestaurer.current = Number(d.scroll) || 0;
        }
      }
      if (sessionStorage.getItem(CLE_RETOUR_ESPECES)) sessionStorage.removeItem(CLE_LISTE_ESPECES);
      sessionStorage.removeItem(CLE_RETOUR_ESPECES);
    } catch { /* stockage indisponible : liste de départ */ }
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

  // Un événement « search » par recherche, une fois la frappe terminée (pas à chaque lettre).
  useEffect(() => {
    const t = recherche.trim();
    if (t.length < 3) return;
    const id = setTimeout(() => suivre('search', { search_term: t.toLowerCase().slice(0, 60) }), 1500);
    return () => clearTimeout(id);
  }, [recherche]);

  function memoriserListe(e: React.MouseEvent) {
    const lien = (e.target as HTMLElement).closest('a[href^="/especes/"]');
    if (!lien) return;
    const slug = (lien.getAttribute('href') ?? '').split('/').filter(Boolean).pop();
    if (!slug) return;
    try {
      sessionStorage.setItem(CLE_LISTE_ESPECES, JSON.stringify({ recherche, categorie, univers, scroll: window.scrollY, slug }));
    } catch { /* ignoré */ }
  }

  const universActif = UNIVERS.find((u) => u.id === univers);
  const especesUnivers = useMemo(
    () => (universActif ? especes.filter((e) => universActif.categories.includes(e.categorie)) : especes),
    [especes, universActif],
  );
  // Sous-catégories de l'univers choisi, dans l'ordre défini ci-dessus, si elles existent dans la liste.
  const sousCategories = useMemo(
    () => (universActif ? universActif.categories.filter((c) => especes.some((e) => e.categorie === c)) : []),
    [especes, universActif],
  );

  const filtrees = useMemo(() => {
    const q = normaliser(recherche.trim());
    return especesUnivers.filter((e) => {
      if (categorie && e.categorie !== categorie) return false;
      if (!q) return true;
      return [e.nomCommun, e.nomScientifique, ...(e.autresNoms ?? [])].some((n) => normaliser(n).includes(q));
    });
  }, [especesUnivers, recherche, categorie]);

  // Pendant la saisie : liste compacte de suggestions affichée juste sous la
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
    border: `1.5px solid ${active ? 'var(--teal)' : 'var(--border)'}`,
    background: active ? 'rgba(47,217,190,0.12)' : 'var(--bg-2)',
    color: active ? 'var(--teal)' : 'var(--text-muted)',
    fontSize: '0.82rem',
    fontWeight: active ? 700 : 400,
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

      {/* Pills de catégories (masquées pendant la saisie : la liste de
          suggestions prend la place, juste sous la barre de recherche) */}
      {!enRecherche && (
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <style>{`
            .esp-seg{ display:flex; width:100%; max-width:520px; padding:4px; gap:4px; background:var(--bg-2); border:1px solid var(--border); border-radius:999px; }
            .esp-seg button{ flex:1; min-width:0; padding:10px 6px; border:0; border-radius:999px; background:transparent; color:var(--text-muted); font:inherit; font-size:0.9rem; font-weight:600; cursor:pointer; transition:background .15s, color .15s; white-space:nowrap; }
            .esp-seg button:hover{ color:var(--text); }
            .esp-seg button[aria-pressed="true"]{ background:linear-gradient(120deg, var(--teal), var(--blue)); color:#052027; }
            .esp-tabs{ display:flex; gap:22px; max-width:100%; overflow-x:auto; padding:0 4px; border-bottom:1px solid var(--border); scrollbar-width:none; }
            .esp-tabs::-webkit-scrollbar{ display:none; }
            .esp-tabs button{ flex:none; padding:8px 2px 10px; border:0; border-bottom:2px solid transparent; margin-bottom:-1px; background:transparent; color:var(--text-muted); font:inherit; font-size:0.9rem; cursor:pointer; white-space:nowrap; transition:color .15s, border-color .15s; }
            .esp-tabs button:hover{ color:var(--text); }
            .esp-tabs button[aria-pressed="true"]{ color:var(--teal); border-bottom-color:var(--teal); font-weight:700; }
            .esp-tabs small{ margin-left:5px; font-size:0.75rem; opacity:0.7; font-variant-numeric:tabular-nums; }
          `}</style>

          <div className="esp-seg" role="group" aria-label="Univers">
            <button type="button" aria-pressed={!univers} onClick={() => { setUnivers(''); setCategorie(''); }}>Toutes</button>
            {UNIVERS.map((u) => (
              <button
                key={u.id}
                type="button"
                aria-pressed={univers === u.id}
                onClick={() => { setUnivers(univers === u.id ? '' : u.id); setCategorie(''); }}
              >
                {u.label}
              </button>
            ))}
          </div>

          {universActif && sousCategories.length > 1 && (
            <div className="esp-tabs" role="group" aria-label="Catégories">
              <button type="button" aria-pressed={!categorie} onClick={() => setCategorie('')}>
                Tout<small>{especesUnivers.length}</small>
              </button>
              {sousCategories.map((c) => (
                <button key={c} type="button" aria-pressed={categorie === c} onClick={() => setCategorie(categorie === c ? '' : c)}>
                  {LIBELLE_SOUS[c] ?? c}<small>{especes.filter((e) => e.categorie === c).length}</small>
                </button>
              ))}
            </div>
          )}
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
              {suggestions.length} résultat{suggestions.length > 1 ? 's' : ''}
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
                    borderTop: i === 0 ? 'none' : '1px solid var(--border)',
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
                      className={`badge-legal ${e.statutLegal === 'interdite' || e.statutLegal === 'autorisation_requise' ? 'interdite' : 'cites'}`}
                      style={{ flexShrink: 0, fontSize: '0.7rem' }}
                    >
                      {e.statutLegal === 'interdite' ? 'Interdite' : e.statutLegal === 'autorisation_requise' ? 'Autorisation' : 'CITES'}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )
      ) : filtrees.length === 0 ? (
        <p className="espece-vide">Aucune espèce ne correspond à votre recherche.</p>
      ) : grouped ? (
        /* Mode par défaut — regroupé par catégorie */
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 32 }}>
          {Array.from(grouped.entries()).map(([cat, items]) => (
            <section key={cat} style={{ padding: 0 }}>
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
                  — {items.length} espèce{items.length > 1 ? 's' : ''}
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
