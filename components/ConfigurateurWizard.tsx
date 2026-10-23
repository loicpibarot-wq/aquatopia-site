'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import DownloadButton from '@/components/DownloadButton';
import Link from 'next/link';
import Icone, { IconePastille } from '@/components/Icone';
import type { IconeNom } from '@/lib/icones';
import {
  type Niveau, type TypeBac, type VolumeChoix, type Budget, type TempsEntretien,
  type EspeceLight, type EspeceReco, type ResultatRecommandation,
  NIVEAUX, TYPES_BAC, VOLUMES_BAC, BUDGETS, STYLES, TEMPS_ENTRETIEN,
  recommander,
} from '@/lib/configurateur';

interface Props {
  pool: EspeceLight[];
  annoncesArrondi?: string | null;
}

const CLE_SESSION = 'aquatopia_configurateur_v1';
// Position de défilement au moment où l'on ouvre une fiche espèce : au retour,
// on revient exactement là où l'on avait cliqué.
const CLE_SCROLL = 'aquatopia_configurateur_scroll_v1';
// Slug de la fiche ouverte depuis le simulateur : la fiche affiche alors « Simulateur » en retour.
const CLE_ORIGINE = 'aquatopia_simulateur_origine_v1';

type Etape = 1 | 2 | 3 | 4 | 5 | 6 | 'resultats';

interface WizardState {
  etape:       Etape;
  niveau:      Niveau | null;
  typeBac:     TypeBac | null;
  volume:      VolumeChoix | null;
  budget:      Budget | null;
  style:       string | null;
  temps:       TempsEntretien | null;
  resultats:   ResultatRecommandation | null;
}

interface AnnonceReco {
  slug:  string;
  titre: string;
  ville: string | null;
  prix:  number | null;
  is_don: boolean;
  is_echange: boolean;
  photo: string | null;
  nom_scientifique: string | null;
}

interface AnnoncesInfo {
  counts:   Record<string, number>;
  annonces: AnnonceReco[];
  total:    number;
}

const ETAPES_LABEL = ['Niveau', 'Type de bac', 'Volume', 'Budget', 'Style', 'Entretien'];

// ─── Badge de catégorie ────────────────────────────────────────────────────────
function BadgeCategorie({ cat }: { cat: string }) {
  const map: Record<string, string> = {
    'Eau Douce':                      '#173A57',
    'Plantes':                        '#1E5C43',
    'Crustacés / Invertébrés eau douce': '#173A57',
    'Mollusques eau douce':           '#173A57',
    'Poissons marins':                '#193050',
    'Coraux et anémones':             '#2a2010',
    'Invertébrés marins':             '#193050',
    'Macroalgues marines':            '#1E5C43',
    'Bassin':                         '#1E5C43',
  };
  const bg = map[cat] ?? '#173A57';
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 9px',
      borderRadius: 20,
      fontSize: '0.72rem',
      fontFamily: "'IBM Plex Mono', monospace",
      letterSpacing: '0.06em',
      background: bg,
      color: 'var(--text-muted)',
    }}>
      {cat}
    </span>
  );
}

// ─── Barre de progression ──────────────────────────────────────────────────────
function BarreProgression({ etape }: { etape: Etape }) {
  const courante = etape === 'resultats' ? ETAPES_LABEL.length : (etape as number);
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
        {ETAPES_LABEL.map((label, i) => {
          const num = i + 1;
          const active = num === courante;
          const done   = num < courante || etape === 'resultats';
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: i < ETAPES_LABEL.length - 1 ? '1' : undefined }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.78rem', fontWeight: 700,
                background: done ? 'var(--teal)' : active ? 'linear-gradient(135deg, var(--teal), var(--blue))' : 'var(--bg-3)',
                color: (done || active) ? '#052027' : 'var(--text-muted)',
                transition: 'all .2s',
              }}>
                {done ? <Icone nom="valide" size={15} strokeWidth={2.6} /> : num}
              </div>
              <span style={{
                fontSize: '0.8rem',
                fontWeight: active ? 700 : 400,
                color: active ? 'var(--text)' : done ? 'var(--teal)' : 'var(--text-faint)',
                display: 'none',
              }}
                className="step-label"
              >
                {label}
              </span>
              {i < ETAPES_LABEL.length - 1 && (
                <div style={{
                  flex: 1, height: 2,
                  background: done ? 'var(--teal)' : 'var(--border)',
                  borderRadius: 2,
                  transition: 'background .3s',
                }} />
              )}
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '0.06em', textAlign: 'center' }}>
        {etape === 'resultats'
          ? 'Votre projet Aquatopia sur mesure'
          : `Étape ${courante} sur ${ETAPES_LABEL.length} — ${ETAPES_LABEL[(courante as number) - 1]}`}
      </div>
    </div>
  );
}

// ─── Card de sélection ─────────────────────────────────────────────────────────
function ChoixCard({
  icone, repete, label, desc, selected, onClick,
}: { icone: IconeNom; repete?: number; label: string; desc?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        padding: '18px 20px',
        borderRadius: 'var(--radius-m)',
        border: `1px solid ${selected ? 'var(--teal)' : 'var(--border)'}`,
        background: selected ? 'rgba(47,217,190,0.08)' : 'var(--bg-2)',
        cursor: 'pointer', textAlign: 'left', transition: 'all .15s',
        boxShadow: selected ? '0 0 0 1px var(--teal)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <IconePastille nom={icone} repete={repete} />
        <span style={{
          fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
          fontSize: '1.08rem', color: selected ? 'var(--teal)' : 'var(--text)',
        }}>
          {label}
        </span>
        {selected && (
          <span style={{
            marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%',
            background: 'var(--teal)', color: '#052027', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem',
            fontWeight: 800, flexShrink: 0,
          }}><Icone nom="valide" size={12} strokeWidth={3} /></span>
        )}
      </div>
      {desc && (
        <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {desc}
        </p>
      )}
    </button>
  );
}

// ─── Chip préférence (multi-select) ───────────────────────────────────────────
function Chip({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '8px 16px',
        borderRadius: 'var(--radius-l)',
        border: `1px solid ${selected ? 'var(--teal)' : 'var(--border-strong)'}`,
        background: selected ? 'rgba(47,217,190,0.1)' : 'transparent',
        color: selected ? 'var(--teal)' : 'var(--text-muted)',
        cursor: 'pointer', fontSize: '0.88rem', fontWeight: selected ? 700 : 400,
        transition: 'all .15s',
      }}
    >
      {selected && <Icone nom="valide" size={14} strokeWidth={2.6} style={{ marginRight: 6, verticalAlign: '-2px' }} />}{label}
    </button>
  );
}

// ─── Carte espèce résultat ─────────────────────────────────────────────────────
function CarteEspece({ e }: { e: EspeceReco }) {
  // Photo de la fiche à droite ; si le fichier manque, la carte garde son ancienne forme.
  const [photoOk, setPhotoOk] = useState(true);
  return (
    <Link
      href={`/especes/${e.slug}`}
      onClick={() => {
        try {
          sessionStorage.setItem(CLE_SCROLL, String(Math.round(window.scrollY)));
          sessionStorage.setItem(CLE_ORIGINE, e.slug);
        } catch { /* ignoré */ }
      }}
      style={{ textDecoration: 'none', display: 'flex', height: '100%' }}
    >
      <div style={{
        padding: '14px 16px',
        flex: 1,
        borderRadius: 'var(--radius-s)',
        border: '1px solid var(--border)',
        background: 'var(--bg-2)',
        transition: 'border-color .15s, transform .15s',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
      }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(47,217,190,0.5)';
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLDivElement).style.transform = 'none';
        }}
      >
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>
              {e.nomCommun}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {e.nomScientifique}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <BadgeCategorie cat={e.categorie} />
            <span style={{
              padding: '2px 9px', borderRadius: 20,
              background: 'rgba(47,217,190,0.12)', border: '1px solid rgba(47,217,190,0.35)',
              color: 'var(--teal)', fontSize: '0.74rem', fontWeight: 700, whiteSpace: 'nowrap',
            }}>
              × {e.quantite}
            </span>
            <span style={{
              fontSize: '0.72rem', color: 'var(--text-faint)',
              fontFamily: "'IBM Plex Mono',monospace",
            }}>
              {e.difficulte} · {e.volumeMin ? `${e.volumeMin} L min` : e.tailleAdulte}
            </span>
          </div>
        </div>
        {photoOk && (
          <div style={{ flexShrink: 0 }}>
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
          </div>
        )}
      </div>
    </Link>
  );
}

// ─── Composant principal ────────────────────────────────────────────────────────
export default function ConfigurateurWizard({ pool, annoncesArrondi }: Props) {
  const [state, setState] = useState<WizardState>({
    etape: 1, niveau: null, typeBac: null, volume: null,
    budget: null, style: null, temps: null, resultats: null,
  });
  const [annoncesInfo, setAnnoncesInfo] = useState<AnnoncesInfo | null>(null);
  const [restaure, setRestaure] = useState(false);
  const debutEtape = useRef<HTMLDivElement>(null);
  const remonterApresReset = useRef(false);

  // Les réponses survivent à un aller-retour vers une fiche espèce : on les
  // garde dans sessionStorage et on recalcule les résultats au retour.
  useEffect(() => {
    try {
      // On est de retour sur le simulateur : la fiche n'a plus à s'en réclamer.
      sessionStorage.removeItem(CLE_ORIGINE);
      const brut = sessionStorage.getItem(CLE_SESSION);
      if (brut) {
        const d = JSON.parse(brut) as Partial<WizardState>;
        if (d.etape === 'resultats' && d.niveau && d.typeBac && d.volume && d.temps) {
          const resultats = recommander(pool, d.niveau, d.typeBac, d.volume, d.style ?? null, d.budget ?? 'moyen', d.temps);
          setState({ ...(d as WizardState), resultats });
        } else if (typeof d.etape === 'number') {
          setState({ etape: d.etape, niveau: d.niveau ?? null, typeBac: d.typeBac ?? null, volume: d.volume ?? null,
            budget: d.budget ?? null, style: d.style ?? null, temps: d.temps ?? null, resultats: null });
        }
      }
    } catch { /* stockage indisponible : on repart de zéro */ }
    setRestaure(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!restaure) return;
    try {
      const { resultats: _r, ...reponses } = state;
      sessionStorage.setItem(CLE_SESSION, JSON.stringify(reponses));
    } catch { /* ignoré */ }
  }, [state, restaure]);

  function choisirNiveau(n: Niveau) {
    setState((s) => ({ ...s, niveau: n, etape: 2 }));
  }
  function choisirTypeBac(t: TypeBac) {
    setState((s) => ({ ...s, typeBac: t, volume: null, style: null, etape: 3 }));
  }
  function choisirVolume(v: VolumeChoix) {
    setState((s) => ({ ...s, volume: v, etape: 4 }));
  }
  function choisirBudget(b: Budget | null) {
    setState((s) => ({ ...s, budget: b, etape: 5 }));
  }
  function choisirStyle(id: string | null) {
    setState((s) => ({ ...s, style: id, etape: 6 }));
  }
  function choisirTemps(t: TempsEntretien) {
    const { niveau, typeBac, volume, budget, style } = state;
    if (!niveau || !typeBac || !volume) return;
    const resultats = recommander(pool, niveau, typeBac, volume, style, budget ?? 'moyen', t);
    setState((s) => ({ ...s, temps: t, etape: 'resultats', resultats }));
    fetch('/api/stats/configurateur_utilisations', { method: 'POST' }).catch(() => {});
  }
  function recommencer() {
    setState({ etape: 1, niveau: null, typeBac: null, volume: null, budget: null, style: null, temps: null, resultats: null });
    setAnnoncesInfo(null);
    // Le défilement se fait dans l'effet ci-dessous, une fois la page redessinée.
    remonterApresReset.current = true;
  }
  function retour() {
    setState((s) => {
      if (s.etape === 'resultats') return { ...s, etape: 6 };
      if (typeof s.etape === 'number' && s.etape > 1) return { ...s, etape: (s.etape - 1) as Etape };
      return s;
    });
  }

  const { etape, niveau, typeBac, volume, budget, style, temps, resultats } = state;

  // Après « Recommencer » : on remonte au début du questionnaire (titre de la
  // 1re question juste sous le fil d'Ariane collant), pas tout en haut.
  useEffect(() => {
    if (!remonterApresReset.current || state.etape !== 1) return;
    remonterApresReset.current = false;
    const cible = debutEtape.current;
    if (!cible) return;
    const fil = document.querySelector('.breadcrumb');
    const collant = !!fil && getComputedStyle(fil).position === 'sticky';
    const bas = collant ? fil!.getBoundingClientRect().bottom : 80;
    window.scrollTo({ top: Math.max(0, cible.getBoundingClientRect().top + window.scrollY - bas - 20), behavior: 'instant' as ScrollBehavior });
  }, [state.etape]);

  // Retour depuis une fiche espèce : une fois les résultats réaffichés, on
  // remet la page à la position où l'on avait cliqué (une seule fois).
  const scrollRestaure = useRef(false);
  useEffect(() => {
    if (scrollRestaure.current || !restaure) return;
    scrollRestaure.current = true;
    // Pas de résultats à réafficher : une ancienne position ne doit pas servir.
    if (etape !== 'resultats' || !resultats) {
      try { sessionStorage.removeItem(CLE_SCROLL); } catch { /* ignoré */ }
      return;
    }
    try {
      const y = Number(sessionStorage.getItem(CLE_SCROLL));
      sessionStorage.removeItem(CLE_SCROLL);
      if (y > 0) {
        // Deux images d'attente : le temps que les cartes soient dessinées.
        requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, y)));
      }
    } catch { /* ignoré */ }
  }, [restaure, etape, resultats]);

  // Annonces réellement en ligne pour les espèces conseillées (nombre + quelques
  // annonces récentes). Échec silencieux : la page reste utile sans.
  useEffect(() => {
    if (!resultats || resultats.especes.length === 0) { setAnnoncesInfo(null); return; }
    let annule = false;
    const noms = resultats.especes.map((e) => e.nomScientifique).join(',');
    fetch(`/api/configurateur/annonces?noms=${encodeURIComponent(noms)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (!annule && d) setAnnoncesInfo(d as AnnoncesInfo); })
      .catch(() => {});
    return () => { annule = true; };
  }, [resultats]);

  return (
    <div
      style={
        etape === 'resultats'
          ? { maxWidth: 720, margin: '0 auto' }
          : {
              maxWidth: 720, margin: '0 auto', padding: '20px 18px 22px',
              background: 'var(--bg-2)', border: '1px solid var(--border-strong)',
              borderRadius: 22, boxShadow: 'var(--shadow)',
            }
      }
    >
      <style>{`
        @media (min-width: 540px) { .step-label { display: inline !important; } }
        .setup-ligne:hover { background: var(--bg-3) !important; }
      `}</style>

      <BarreProgression etape={etape} />
      <div ref={debutEtape} />

      {/* ── Étape 1 : Niveau ────────────────────────────────────────────── */}
      {etape === 1 && (
        <section style={{ padding: 0 }}>
          <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.3rem', marginBottom: 4, textAlign: 'center' }}>
            Quel est votre niveau en aquariophilie ?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 16, marginTop: 4, textAlign: 'center' }}>
            Cela nous permet de vous proposer des espèces adaptées et des équipements proportionnés.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {NIVEAUX.map((n) => (
              <ChoixCard key={n.id} icone={n.icone} repete={n.repete} label={n.label} desc={n.desc}
                selected={niveau === n.id} onClick={() => choisirNiveau(n.id)} />
            ))}
          </div>
        </section>
      )}

      {/* ── Étape 2 : Type de bac ────────────────────────────────────────── */}
      {etape === 2 && (
        <section style={{ padding: 0 }}>
          <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.3rem', marginBottom: 4, textAlign: 'center' }}>
            Quel type d'aquarium vous attire ?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 16, marginTop: 4, textAlign: 'center' }}>
            Chaque univers a ses contraintes et ses récompenses. Choisissez ce qui vous fait rêver.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            {TYPES_BAC.map((t) => (
              <ChoixCard key={t.id} icone={t.icone} repete={t.repete} label={t.label} desc={t.desc}
                selected={typeBac === t.id} onClick={() => choisirTypeBac(t.id)} />
            ))}
          </div>
          <button type="button" onClick={retour} style={{
            marginTop: 20, background: 'none', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', fontSize: '0.86rem', padding: '4px 0',
          }}>← Retour</button>
        </section>
      )}

      {/* ── Étape 3 : Volume ────────────────────────────────────────────── */}
      {etape === 3 && typeBac && (
        <section style={{ padding: 0 }}>
          <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.3rem', marginBottom: 4, textAlign: 'center' }}>
            Quel volume avez-vous prévu ?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 16, marginTop: 4, textAlign: 'center' }}>
            Le volume détermine les espèces compatibles et le dimensionnement de votre filtration.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {VOLUMES_BAC[typeBac].map((v) => (
              <ChoixCard key={v.id} icone="regle" label={v.label} desc={v.detail}
                selected={volume === v.id} onClick={() => choisirVolume(v.id)} />
            ))}
            <ChoixCard icone="aide" label="Je ne sais pas encore"
              desc="Laissez le simulateur recommander la taille idéale selon votre niveau et votre budget."
              selected={volume === 'auto'} onClick={() => choisirVolume('auto')} />
          </div>
          <button type="button" onClick={retour} style={{
            marginTop: 20, background: 'none', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', fontSize: '0.86rem', padding: '4px 0',
          }}>← Retour</button>
        </section>
      )}

      {/* ── Étape 4 : Budget ─────────────────────────────────────────────── */}
      {etape === 4 && (
        <section style={{ padding: 0 }}>
          <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.3rem', marginBottom: 4, textAlign: 'center' }}>
            Quel est votre budget global ?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 16, marginTop: 4, textAlign: 'center' }}>
            Aquarium et animaux compris. Il adapte le niveau de gamme du matériel conseillé — étape facultative.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {BUDGETS.map((b) => (
              <ChoixCard key={b.id} icone={b.icone} repete={b.repete} label={b.label} desc={b.desc}
                selected={budget === b.id} onClick={() => choisirBudget(b.id)} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 20, flexWrap: 'wrap' }}>
            <button type="button" onClick={retour} style={{
              background: 'none', border: 'none', color: 'var(--text-muted)',
              cursor: 'pointer', fontSize: '0.86rem', padding: '4px 0',
            }}>← Retour</button>
            <button type="button" onClick={() => choisirBudget(null)} style={{
              background: 'none', border: 'none', color: 'var(--teal)',
              cursor: 'pointer', fontSize: '0.86rem', padding: '4px 0',
            }}>Passer cette étape →</button>
          </div>
        </section>
      )}

      {/* ── Étape 5 : Style ──────────────────────────────────────────────── */}
      {etape === 5 && typeBac && (
        <section style={{ padding: 0 }}>
          <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.3rem', marginBottom: 4, textAlign: 'center' }}>
            Qu'aimeriez-vous voir principalement dans votre bac ?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 16, marginTop: 4, textAlign: 'center' }}>
            Cela oriente les espèces phares et le décor conseillés.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            {STYLES[typeBac].map((st) => (
              <ChoixCard key={st.id} icone={st.icone} repete={st.repete} label={st.label} desc={st.desc}
                selected={style === st.id} onClick={() => choisirStyle(st.id)} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 20, flexWrap: 'wrap' }}>
            <button type="button" onClick={retour} style={{
              background: 'none', border: 'none', color: 'var(--text-muted)',
              cursor: 'pointer', fontSize: '0.86rem', padding: '4px 0',
            }}>← Retour</button>
            <button type="button" onClick={() => choisirStyle(null)} style={{
              background: 'none', border: 'none', color: 'var(--teal)',
              cursor: 'pointer', fontSize: '0.86rem', padding: '4px 0',
            }}>Peu importe, un bac équilibré →</button>
          </div>
        </section>
      )}

      {/* ── Étape 6 : Temps d'entretien ──────────────────────────────────── */}
      {etape === 6 && (
        <section style={{ padding: 0 }}>
          <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.3rem', marginBottom: 4, textAlign: 'center' }}>
            Combien de temps pouvez-vous accorder à l'entretien ?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 16, marginTop: 4, textAlign: 'center' }}>
            Indispensable pour ne pas vous orienter vers des espèces trop exigeantes.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TEMPS_ENTRETIEN.map((t) => (
              <ChoixCard key={t.id} icone={t.icone} repete={t.repete} label={t.label} desc={t.desc}
                selected={temps === t.id} onClick={() => choisirTemps(t.id)} />
            ))}
          </div>
          <button type="button" onClick={retour} style={{
            marginTop: 20, background: 'none', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', fontSize: '0.86rem', padding: '4px 0',
          }}>← Retour</button>
        </section>
      )}

      {/* ── Résultats ────────────────────────────────────────────────────── */}
      {etape === 'resultats' && resultats && (
        <section style={{ padding: 0 }}>
          {/* Header résultats */}
          <div style={{
            padding: '18px 22px', borderRadius: 'var(--radius-m)',
            background: 'linear-gradient(135deg, rgba(47,217,190,0.1), rgba(44,166,222,0.08))',
            border: '1px solid rgba(47,217,190,0.25)',
            marginBottom: 32,
          }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Ton projet Aquatopia sur mesure</div>
            <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.4rem', marginBottom: 14 }}>
              {resultats.setup.titre}
            </h2>

            {/* Cuve idéale */}
            <div style={{
              display: 'flex', gap: 14, alignItems: 'flex-start',
              padding: '14px 16px', marginBottom: 14,
              borderRadius: 'var(--radius-s)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
            }}>
              <IconePastille nom="cuve" taille={44} />
              <div>
                <div style={{ fontSize: '0.72rem', fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '0.08em', color: 'var(--teal)', marginBottom: 4, textTransform: 'uppercase' }}>
                  La cuve idéale
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
                  {resultats.cuve.titre}
                </div>
                {resultats.cuve.detail && (
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {resultats.cuve.detail}
                  </div>
                )}
                {resultats.volumeAuto && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)', marginTop: 6 }}>
                    Volume choisi pour vous (« Je ne sais pas encore ») selon votre niveau et votre budget.
                  </div>
                )}
              </div>
            </div>

            {/* Comparaison prix neuf vs Aquatopia */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
              marginBottom: 16,
            }}>
              {/* Prix neuf */}
              <div style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-s)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
              }}>
                <div style={{ fontSize: '0.72rem', fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase' }}>
                  Prix en neuf
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-muted)', textDecoration: 'line-through', opacity: 0.7 }}>
                  {resultats.setup.budgetMin.toLocaleString('fr-FR')} – {resultats.setup.budgetMax.toLocaleString('fr-FR')}&nbsp;€
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: 2 }}>hors animaux et plantes</div>
              </div>

              {/* Prix Aquatopia */}
              <div style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-s)',
                background: 'linear-gradient(135deg, rgba(47,217,190,0.15), rgba(44,166,222,0.12))',
                border: '1px solid rgba(47,217,190,0.4)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px 8px', marginBottom: 6 }}>
                  <div style={{ fontSize: '0.72rem', fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '0.08em', color: 'var(--teal)', textTransform: 'uppercase' }}>
                    Via Aquatopia
                  </div>
                  <span style={{
                    background: 'var(--teal)', color: '#052027',
                    fontSize: '0.65rem', fontWeight: 800, padding: '2px 7px',
                    borderRadius: 20, letterSpacing: '0.06em', whiteSpace: 'nowrap',
                  }}>
                    jusqu&apos;à – 50 %
                  </span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--teal)' }}>
                  {(Math.round(resultats.setup.budgetMin * 0.45 / 10) * 10).toLocaleString('fr-FR')} – {(Math.round(resultats.setup.budgetMax * 0.55 / 10) * 10).toLocaleString('fr-FR')}&nbsp;€
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>estimation indicative, selon les annonces</div>
              </div>
            </div>

            {/* CTA téléchargement */}
            <DownloadButton
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '13px 18px',
                borderRadius: 'var(--radius-s)',
                background: 'var(--teal)',
                color: '#052027',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}
            >
              <Icone nom="mobile" size={26} />
              <div>
                <div>Trouver ce setup en occasion sur Aquatopia</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 400, opacity: 0.75, marginTop: 1 }}>
                  Application gratuite — achetez, échangez ou adoptez près de chez vous
                </div>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '1.1rem', flexShrink: 0 }}>→</span>
            </DownloadButton>
          </div>

          {/* Setup équipement */}
          <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.15rem', marginBottom: 16 }}>
            <Icone nom="outil" size={20} style={{ marginRight: 10, verticalAlign: '-3px', color: 'var(--teal)' }} />Équipement nécessaire
          </h3>
          <div style={{
            borderRadius: 'var(--radius-m)',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            marginBottom: 32,
          }}>
            {resultats.setup.lignes.map((ligne, i) => (
              <div key={i} className="setup-ligne" style={{
                display: 'grid', gridTemplateColumns: '36px 1fr',
                gap: '0 12px', padding: '14px 18px',
                borderBottom: i < resultats.setup.lignes.length - 1 ? '1px solid var(--border)' : 'none',
                background: i % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)',
                transition: 'background .12s',
              }}>
                <span style={{ color: 'var(--teal)', paddingTop: 2 }}><Icone nom={ligne.icone} size={22} /></span>
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', alignItems: 'baseline' }}>
                    <span style={{
                      fontSize: '0.72rem', fontFamily: "'IBM Plex Mono',monospace",
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: 'var(--teal)',
                    }}>
                      {ligne.categorie}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text)', margin: '2px 0' }}>
                    {ligne.item}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {ligne.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Conseils */}
          <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.15rem', marginBottom: 16 }}>
            <Icone nom="eclairage" size={20} style={{ marginRight: 10, verticalAlign: '-3px', color: 'var(--teal)' }} />Conseils essentiels
          </h3>
          <ul style={{
            margin: '0 0 32px', padding: '16px 20px 16px 36px',
            borderRadius: 'var(--radius-m)', background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            listStyle: 'none',
          }}>
            {resultats.setup.conseils.map((c, i) => (
              <li key={i} style={{
                fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6,
                paddingBottom: i < resultats.setup.conseils.length - 1 ? 10 : 0,
                paddingLeft: 0,
                display: 'flex', gap: 10,
              }}>
                <span style={{ color: 'var(--teal)', flexShrink: 0, marginTop: 2 }}>▸</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>

          {/* Espèces recommandées, classées par type puis par zone du bac */}
          <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.15rem', marginBottom: 8 }}>
            <Icone nom="poisson" size={20} style={{ marginRight: 10, verticalAlign: '-3px', color: 'var(--teal)' }} />Espèces compatibles avec votre setup
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 20, marginTop: 0 }}>
            Sélection adaptée à votre niveau, votre volume et vos envies, rangée par emplacement dans le bac. Les quantités sont indicatives — cliquez sur une fiche pour tous les détails.
          </p>
          {resultats.sections.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 36 }}>
              {resultats.sections.map((sec) => (
                <div key={sec.id}>
                  <h4 style={{
                    fontFamily: "'Fredoka',sans-serif", fontSize: '1.05rem', margin: '0 0 12px',
                    paddingBottom: 8, borderBottom: '1px solid var(--border)',
                  }}>
                    <Icone nom={sec.icone} size={18} style={{ marginRight: 8, verticalAlign: '-3px', color: 'var(--teal)' }} />{sec.titre}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {sec.groupes.map((g) => (
                      <div key={g.id}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>{g.label}</span>
                          {g.astuce && (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>{g.astuce}</span>
                          )}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
                          {g.especes.map((e) => (
                            <CarteEspece key={e.slug} e={e} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              padding: '20px', borderRadius: 'var(--radius-m)', background: 'var(--bg-2)',
              border: '1px solid var(--border)', color: 'var(--text-muted)', marginBottom: 32,
              fontSize: '0.9rem',
            }}>
              Aucune fiche ne correspond exactement à vos critères pour l'instant.{' '}
              <Link href="/especes" style={{ color: 'var(--teal)' }}>Voir toutes les espèces →</Link>
            </div>
          )}

          {/* Setups prêts à l'emploi */}
          {resultats.presets.length === 0 && style && (
            <div style={{
              padding: '16px 18px', borderRadius: 'var(--radius-m)', background: 'var(--bg-2)',
              border: '1px solid var(--border)', color: 'var(--text-muted)', marginBottom: 32, fontSize: '0.88rem', lineHeight: 1.55,
            }}>
              Aucun setup prêt à l&apos;emploi ne correspond à ce choix pour votre niveau et ce volume
              (espèces trop exigeantes ou trop grandes pour ce bac). Les espèces compatibles ci-dessus restent
              utilisables, ou recommencez avec un autre volume.
            </div>
          )}

          {resultats.presets.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.15rem', marginBottom: 8 }}>
                <Icone nom="cuve" size={20} style={{ marginRight: 10, verticalAlign: '-3px', color: 'var(--teal)' }} />Setups prêts à l'emploi
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 16, marginTop: 0 }}>
                {resultats.presets.length > 1 ? 'Des associations construites' : 'Une association construite'} à partir de vos choix
                {typeBac && volume ? ` (${[
                  TYPES_BAC.find((t) => t.id === typeBac)?.label,
                  VOLUMES_BAC[typeBac].find((v) => v.id === resultats.volume)?.label,
                  STYLES[typeBac].find((x) => x.id === style)?.label.replace(/^./, (c) => c.toLowerCase()),
                ].filter(Boolean).join(', ').replace(/\s+/g, ' ')})` : ''}.
                {' '}Les espèces d&apos;un même setup partagent la même température et un pH commun : vous pouvez les prendre telles quelles.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
                {resultats.presets.map((p) => (
                  <div key={p.id} style={{
                    padding: '16px 18px', borderRadius: 'var(--radius-m)',
                    border: '1px solid var(--border)', background: 'var(--bg-2)',
                    display: 'flex', flexDirection: 'column', gap: 10,
                  }}>
                    <div>
                      <div style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)' }}>
                        {p.titre}
                      </div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginTop: 4 }}>
                        {p.desc}
                      </div>
                    </div>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {p.membres.map((m, i) => (
                        <li key={`${m.role}-${m.espece.slug}-${i}`} style={{
                          display: 'flex', alignItems: 'baseline', gap: 10, fontSize: '0.88rem',
                        }}>
                          <span style={{
                            flex: '0 0 92px', fontSize: '0.7rem', letterSpacing: '0.04em', textTransform: 'uppercase',
                            color: 'var(--text-faint)', fontFamily: "'IBM Plex Mono',monospace",
                          }}>{m.role}</span>
                          <Link href={`/especes/${m.espece.slug}`} style={{ color: 'var(--text)', fontWeight: 600, textDecoration: 'none', flex: 1, minWidth: 0 }}>
                            {m.espece.nomCommun}
                          </Link>
                          <span style={{ color: 'var(--teal)', fontWeight: 700, fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                            × {m.espece.quantite}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {(p.temp || p.ph) && (
                      <div style={{
                        display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 10,
                        borderTop: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text-muted)',
                      }}>
                        {p.temp && (
                          <span><Icone nom="chauffage" size={14} style={{ marginRight: 5, verticalAlign: '-2px', color: 'var(--teal)' }} />{p.temp}</span>
                        )}
                        {p.ph && (
                          <span><Icone nom="gouttes" size={14} style={{ marginRight: 5, verticalAlign: '-2px', color: 'var(--teal)' }} />pH {p.ph}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Liens CTA */}
          <div style={{
            padding: '20px 24px', borderRadius: 'var(--radius-m)',
            background: 'var(--bg-2)', border: '1px solid var(--border)',
            marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 10,
            alignItems: 'center', textAlign: 'center',
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>
              Trouver des espèces sur Aquatopia
            </div>
            <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              {annoncesArrondi ? `${annoncesArrondi} annonces` : 'Des annonces'} entre aquariophiles passionnés — achetez, échangez, adoptez près de chez vous.
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
              <DownloadButton className="btn btn-primary" style={{ fontSize: '0.88rem', padding: '8px 18px' }}>
                Télécharger l&apos;application
              </DownloadButton>
            </div>
          </div>

          {/* Recommencer */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" onClick={retour}
              className="btn btn-ghost"
              style={{ fontSize: '0.88rem', padding: '8px 18px' }}>
              ← Modifier mes préférences
            </button>
            <button type="button" onClick={recommencer}
              className="btn btn-ghost"
              style={{ fontSize: '0.88rem', padding: '8px 18px' }}>
              ↺ Recommencer
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
