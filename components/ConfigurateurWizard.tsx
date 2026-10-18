'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  type Niveau, type TypeBac, type VolumeBac,
  type EspeceLight, type ResultatRecommandation,
  NIVEAUX, TYPES_BAC, VOLUMES_BAC, PREFERENCES,
  recommander,
} from '@/lib/configurateur';

interface Props {
  pool: EspeceLight[];
}

type Etape = 1 | 2 | 3 | 4 | 'resultats';

interface WizardState {
  etape:       Etape;
  niveau:      Niveau | null;
  typeBac:     TypeBac | null;
  volume:      VolumeBac | null;
  preferences: string[];
  resultats:   ResultatRecommandation | null;
}

const ETAPES_LABEL = ['Niveau', 'Type de bac', 'Volume', 'Préférences'];

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
  const courante = etape === 'resultats' ? 4 : (etape as number);
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
        {ETAPES_LABEL.map((label, i) => {
          const num = i + 1;
          const active = num === courante;
          const done   = num < courante || etape === 'resultats';
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: i < 3 ? '1' : undefined }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.78rem', fontWeight: 700,
                background: done ? 'var(--teal)' : active ? 'linear-gradient(135deg, var(--teal), var(--blue))' : 'var(--bg-3)',
                color: (done || active) ? '#052027' : 'var(--text-muted)',
                transition: 'all .2s',
              }}>
                {done ? '✓' : num}
              </div>
              <span style={{
                fontSize: '0.8rem',
                fontWeight: active ? 700 : 400,
                color: active ? 'var(--text)' : done ? 'var(--teal)' : 'var(--text-faint)',
                display: 'none',
              }}
                className="step-label"
              >
                {label}
              </span>
              {i < 3 && (
                <div style={{
                  flex: 1, height: 2,
                  background: done ? 'var(--teal)' : 'var(--border)',
                  borderRadius: 2,
                  transition: 'background .3s',
                }} />
              )}
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '0.06em' }}>
        {etape === 'resultats'
          ? 'Votre setup clé en main'
          : `Étape ${courante} sur 4 — ${ETAPES_LABEL[(courante as number) - 1]}`}
      </div>
    </div>
  );
}

// ─── Card de sélection ─────────────────────────────────────────────────────────
function ChoixCard({
  emoji, label, desc, selected, onClick,
}: { emoji: string; label: string; desc?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        padding: '18px 20px',
        borderRadius: 'var(--radius-m)',
        border: `1px solid ${selected ? 'var(--teal)' : 'var(--border)'}`,
        background: selected ? 'rgba(47,217,190,0.08)' : 'var(--bg-2)',
        cursor: 'pointer', textAlign: 'left', transition: 'all .15s',
        boxShadow: selected ? '0 0 0 1px var(--teal)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{emoji}</span>
        <span style={{
          fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
          fontSize: '1.08rem', color: selected ? 'var(--teal)' : 'var(--text)',
        }}>
          {label}
        </span>
        {selected && (
          <span style={{
            marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%',
            background: 'var(--teal)', color: '#052027', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem',
            fontWeight: 800, flexShrink: 0,
          }}>✓</span>
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
        border: `1px solid ${selected ? 'var(--teal)' : 'var(--border-strong)'}`,
        background: selected ? 'rgba(47,217,190,0.1)' : 'transparent',
        color: selected ? 'var(--teal)' : 'var(--text-muted)',
        cursor: 'pointer', fontSize: '0.88rem', fontWeight: selected ? 700 : 400,
        transition: 'all .15s',
      }}
    >
      {selected && '✓ '}{label}
    </button>
  );
}

// ─── Carte espèce résultat ─────────────────────────────────────────────────────
function CarteEspece({ e }: { e: EspeceLight }) {
  return (
    <Link href={`/especes/${e.slug}`} style={{ textDecoration: 'none', display: 'flex', height: '100%' }}>
      <div style={{
        padding: '14px 16px',
        flex: 1,
        borderRadius: 'var(--radius-s)',
        border: '1px solid var(--border)',
        background: 'var(--bg-2)',
        transition: 'border-color .15s, transform .15s',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: 6,
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
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>
              {e.nomCommun}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {e.nomScientifique}
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 3, color: 'var(--text-faint)' }}>
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <BadgeCategorie cat={e.categorie} />
          <span style={{
            fontSize: '0.72rem', color: 'var(--text-faint)',
            fontFamily: "'IBM Plex Mono',monospace",
          }}>
            {e.difficulte} · {e.volumeMin ? `${e.volumeMin} L min` : e.tailleAdulte}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Composant principal ────────────────────────────────────────────────────────
export default function ConfigurateurWizard({ pool }: Props) {
  const [state, setState] = useState<WizardState>({
    etape: 1, niveau: null, typeBac: null, volume: null,
    preferences: [], resultats: null,
  });

  function choisirNiveau(n: Niveau) {
    setState((s) => ({ ...s, niveau: n, etape: 2 }));
  }
  function choisirTypeBac(t: TypeBac) {
    setState((s) => ({ ...s, typeBac: t, volume: null, preferences: [], etape: 3 }));
  }
  function choisirVolume(v: VolumeBac) {
    setState((s) => ({ ...s, volume: v, etape: 4 }));
  }
  function togglePref(id: string) {
    setState((s) => ({
      ...s,
      preferences: s.preferences.includes(id)
        ? s.preferences.filter((p) => p !== id)
        : [...s.preferences, id],
    }));
  }
  function calculer() {
    if (!state.niveau || !state.typeBac || !state.volume) return;
    const resultats = recommander(pool, state.niveau, state.typeBac, state.volume, state.preferences);
    setState((s) => ({ ...s, etape: 'resultats', resultats }));
    fetch('/api/stats/configurateur_utilisations', { method: 'POST' }).catch(() => {});
  }
  function recommencer() {
    setState({ etape: 1, niveau: null, typeBac: null, volume: null, preferences: [], resultats: null });
  }
  function retour() {
    setState((s) => {
      if (s.etape === 'resultats') return { ...s, etape: 4 };
      if (s.etape === 2) return { ...s, etape: 1 };
      if (s.etape === 3) return { ...s, etape: 2 };
      if (s.etape === 4) return { ...s, etape: 3 };
      return s;
    });
  }

  const { etape, niveau, typeBac, volume, preferences, resultats } = state;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <style>{`
        @media (min-width: 540px) { .step-label { display: inline !important; } }
        .setup-ligne:hover { background: var(--bg-3) !important; }
      `}</style>

      <BarreProgression etape={etape} />

      {/* ── Étape 1 : Niveau ────────────────────────────────────────────── */}
      {etape === 1 && (
        <section>
          <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.5rem', marginBottom: 8 }}>
            Quel est votre niveau en aquariophilie ?
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, marginTop: 8 }}>
            Cela nous permet de vous proposer des espèces adaptées et des équipements proportionnés.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {NIVEAUX.map((n) => (
              <ChoixCard key={n.id} emoji={n.emoji} label={n.label} desc={n.desc}
                selected={niveau === n.id} onClick={() => choisirNiveau(n.id)} />
            ))}
          </div>
        </section>
      )}

      {/* ── Étape 2 : Type de bac ────────────────────────────────────────── */}
      {etape === 2 && (
        <section>
          <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.5rem', marginBottom: 8 }}>
            Quel type d'aquarium vous attire ?
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, marginTop: 8 }}>
            Chaque univers a ses contraintes et ses récompenses. Choisissez ce qui vous fait rêver.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            {TYPES_BAC.map((t) => (
              <ChoixCard key={t.id} emoji={t.emoji} label={t.label} desc={t.desc}
                selected={typeBac === t.id} onClick={() => choisirTypeBac(t.id)} />
            ))}
          </div>
          <button type="button" onClick={retour} style={{
            marginTop: 20, background: 'none', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', fontSize: '0.86rem', padding: '4px 0',
          }}>← Retour</button>
        </section>
      )}

      {/* ── Étape 3 : Volume ────────────────────────────────────────────── */}
      {etape === 3 && typeBac && (
        <section>
          <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.5rem', marginBottom: 8 }}>
            Quel volume avez-vous prévu ?
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, marginTop: 8 }}>
            Le volume détermine les espèces compatibles et le dimensionnement de votre filtration.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {VOLUMES_BAC[typeBac].map((v) => (
              <ChoixCard key={v.id} emoji="📐" label={v.label} desc={v.detail}
                selected={volume === v.id} onClick={() => choisirVolume(v.id)} />
            ))}
          </div>
          <button type="button" onClick={retour} style={{
            marginTop: 20, background: 'none', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', fontSize: '0.86rem', padding: '4px 0',
          }}>← Retour</button>
        </section>
      )}

      {/* ── Étape 4 : Préférences ────────────────────────────────────────── */}
      {etape === 4 && typeBac && (
        <section>
          <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.5rem', marginBottom: 8 }}>
            Quelles sont vos préférences ?
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, marginTop: 8 }}>
            Sélectionnez autant d'options que vous souhaitez — ou aucune pour un setup équilibré.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
            {PREFERENCES[typeBac].map((p) => (
              <Chip key={p.id} label={p.label}
                selected={preferences.includes(p.id)}
                onClick={() => togglePref(p.id)} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button type="button" onClick={calculer}
              className="btn btn-primary"
              style={{ fontSize: '1rem', padding: '12px 28px' }}>
              Voir mon setup clé en main →
            </button>
            <button type="button" onClick={retour} style={{
              background: 'none', border: 'none', color: 'var(--text-muted)',
              cursor: 'pointer', fontSize: '0.86rem', padding: '4px 0',
            }}>← Retour</button>
          </div>
        </section>
      )}

      {/* ── Résultats ────────────────────────────────────────────────────── */}
      {etape === 'resultats' && resultats && (
        <section>
          {/* Header résultats */}
          <div style={{
            padding: '18px 22px', borderRadius: 'var(--radius-m)',
            background: 'linear-gradient(135deg, rgba(47,217,190,0.1), rgba(44,166,222,0.08))',
            border: '1px solid rgba(47,217,190,0.25)',
            marginBottom: 32,
          }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Setup recommandé</div>
            <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.4rem', marginBottom: 14 }}>
              {resultats.setup.titre}
            </h2>

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
                  {resultats.setup.budgetMin.toLocaleString('fr-FR')} – {resultats.setup.budgetMax.toLocaleString('fr-FR')} €
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
                <div style={{
                  position: 'absolute', top: 6, right: 8,
                  background: 'var(--teal)', color: '#052027',
                  fontSize: '0.65rem', fontWeight: 800, padding: '2px 7px',
                  borderRadius: 20, letterSpacing: '0.06em',
                }}>
                  – 50 %
                </div>
                <div style={{ fontSize: '0.72rem', fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '0.08em', color: 'var(--teal)', marginBottom: 4, textTransform: 'uppercase' }}>
                  Via Aquatopia
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--teal)' }}>
                  {Math.round(resultats.setup.budgetMin * 0.45 / 10) * 10} – {Math.round(resultats.setup.budgetMax * 0.55 / 10) * 10} €
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>estimation occasion</div>
              </div>
            </div>

            {/* CTA téléchargement */}
            <a
              href="https://apps.apple.com/app/aquatopia/id6741454953"
              target="_blank"
              rel="noopener noreferrer"
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
                transition: 'opacity .15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>📱</span>
              <div>
                <div>Trouver ce setup en occasion sur Aquatopia</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 400, opacity: 0.75, marginTop: 1 }}>
                  Des milliers d'annonces entre aquariophiles — téléchargement gratuit
                </div>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '1.1rem', flexShrink: 0 }}>→</span>
            </a>
          </div>

          {/* Setup équipement */}
          <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.15rem', marginBottom: 16 }}>
            🔧 Équipement nécessaire
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
                borderBottom: i < resultats.setup.lignes.length - 1 ? '1px solid var(--border)' : 'none',
                background: i % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)',
                transition: 'background .12s',
              }}>
                <span style={{ fontSize: '1.3rem', lineHeight: 1.4 }}>{ligne.emoji}</span>
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
            💡 Conseils essentiels
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
                paddingBottom: i < resultats.setup.conseils.length - 1 ? 10 : 0,
                paddingLeft: 0,
                display: 'flex', gap: 10,
              }}>
                <span style={{ color: 'var(--teal)', flexShrink: 0, marginTop: 2 }}>▸</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>

          {/* Espèces recommandées */}
          <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.15rem', marginBottom: 8 }}>
            🐟 Espèces compatibles avec votre setup
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 16, marginTop: 0 }}>
            Sélection adaptée à votre niveau et votre volume — cliquez sur une fiche pour tous les détails.
          </p>
          {resultats.especes.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10, marginBottom: 32 }}>
              {resultats.especes.map((e) => (
                <CarteEspece key={e.slug} e={e} />
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

          {/* Liens CTA */}
          <div style={{
            padding: '20px 24px', borderRadius: 'var(--radius-m)',
            background: 'var(--bg-2)', border: '1px solid var(--border)',
            marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>
              Trouver des espèces sur Aquatopia
            </div>
            <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Des milliers d'annonces entre aquariophiles passionnés — achetez, échangez, adoptez localement.
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
              <Link href="/especes" className="btn btn-ghost" style={{ fontSize: '0.88rem', padding: '8px 18px' }}>
                Parcourir les fiches espèces
              </Link>
              <Link href="/#categories" className="btn btn-primary" style={{ fontSize: '0.88rem', padding: '8px 18px' }}>
                Voir les annonces
              </Link>
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
