// Règles de peuplement du simulateur : combien de poissons un bac peut raisonnablement
// accueillir. Tout est ramené à une « cuve de référence » (celle que le simulateur
// annonce dans « Ta cuve idéale ») et à un budget de centimètres de poisson adulte.
import type { EspeceLight, TypeBac, VolumeBac } from './configurateur';

/** Volume (L) de la cuve annoncée pour chaque gabarit : sert de référence unique. */
export const VOL_REF: Record<TypeBac, Record<VolumeBac, number>> = {
  'douce-plante':  { nano: 40, moyen: 100, grand: 250, 'tres-grand': 500 },
  'douce-biotope': { nano: 40, moyen: 100, grand: 250, 'tres-grand': 500 },
  'marin':         { nano: 60, moyen: 200, grand: 400, 'tres-grand': 700 },
  'bassin':        { nano: 800, moyen: 3000, grand: 10000, 'tres-grand': 25000 },
};

/** Centimètres de poisson adulte par litre (règles usuelles, volontairement prudentes). */
const CM_PAR_LITRE: Record<TypeBac, number> = {
  'douce-plante': 1, 'douce-biotope': 1, 'marin': 0.2, 'bassin': 0.1,
};

const CATS_POISSON = ['Eau Douce', 'Poissons marins', 'Bassin'];
export const estPoisson = (e: EspeceLight) => CATS_POISSON.includes(e.categorie);

export function budgetCm(typeBac: TypeBac, volume: VolumeBac): number {
  // 80 % de la règle : on garde une marge (croissance, déplacements, panne de filtre).
  return VOL_REF[typeBac][volume] * CM_PAR_LITRE[typeBac] * 0.8;
}

/** Taille adulte en cm lue dans la fiche (milieu de fourchette ; borne haute en bassin). */
export function tailleCm(e: EspeceLight, typeBac: TypeBac): number {
  const m = e.tailleAdulte.match(/(\d+(?:[.,]\d+)?)(?:\s*(?:à|-|–)\s*(\d+(?:[.,]\d+)?))?\s*(cm|mm|m)\b/i);
  if (!m) return 10;
  const n = (s: string) => parseFloat(s.replace(',', '.'));
  const a = n(m[1]);
  const b = m[2] ? n(m[2]) : a;
  let v = typeBac === 'bassin' ? Math.max(a, b) : (a + b) / 2;
  const u = m[3].toLowerCase();
  if (u === 'mm') v /= 10;
  if (u === 'm') v *= 100;
  return v;
}

const ordre = (v: VolumeBac) => ['nano', 'moyen', 'grand', 'tres-grand'].indexOf(v);

/** Effectif minimal acceptable (groupe de l'espèce) et effectif idéal pour ce gabarit. */
export function effectifs(e: EspeceLight, typeBac: TypeBac, volume: VolumeBac): { min: number; ideal: number } {
  const grand = tailleCm(e, typeBac) >= 25;
  const g = Math.max(1, e.groupeMin ?? 1);
  // Gros poissons (koï, tanche…) : on ne les compte jamais en banc.
  const min = grand ? Math.min(g, 2) : Math.min(g, 10);
  if (g <= 1) {
    // Solitaires et territoriaux : 1 seul, sauf couples ou harems usuels.
    if (/amphiprion|clown/i.test(`${e.nomCommun} ${e.nomScientifique}`) && e.categorie === 'Poissons marins') return { min: 1, ideal: 2 };
    if (/apistogramma/i.test(e.nomScientifique) && ordre(volume) >= 1) return { min: 1, ideal: 3 };
    return { min: 1, ideal: 1 };
  }
  if (g === 2) return { min: 2, ideal: 2 };
  // Poissons de banc : plus le bac est grand, plus le banc est fourni.
  const facteur = [1, 1.5, 2, 2.5][Math.max(0, ordre(volume))];
  const ideal = grand ? Math.min(g, 2) + Math.max(0, ordre(volume) - 1) : Math.min(20, Math.round(g * facteur));
  return { min, ideal: Math.max(min, ideal) };
}

/**
 * Répartit les effectifs d'un setup : chacun part de son effectif idéal, puis on réduit
 * (jusqu'au minimum de l'espèce) tant que le budget du bac est dépassé. Renvoie null
 * quand même les minimums ne tiennent pas — l'appelant retire alors une espèce.
 */
export function repartir(
  poissons: { e: EspeceLight }[],
  typeBac: TypeBac,
  volume: VolumeBac,
): number[] | null {
  const budget = budgetCm(typeBac, volume);
  const infos = poissons.map(({ e }) => ({ ...effectifs(e, typeBac, volume), t: tailleCm(e, typeBac) }));
  const n = infos.map((i) => i.ideal);
  const total = () => n.reduce((a, q, i) => a + q * infos[i].t, 0);
  while (total() > budget + 1e-9) {
    // On retire un poisson à l'espèce qui pèse le plus et peut encore baisser.
    let cible = -1;
    infos.forEach((inf, i) => {
      if (n[i] > inf.min && (cible < 0 || n[i] * inf.t > n[cible] * infos[cible].t)) cible = i;
    });
    if (cible < 0) return null;
    n[cible]--;
  }
  return n;
}

/** Quantité affichée dans les listes d'espèces (une espèce prise isolément, ≤ 60 % du budget). */
export function quantiteListe(e: EspeceLight, typeBac: TypeBac, volume: VolumeBac): string {
  const { min, ideal } = effectifs(e, typeBac, volume);
  const t = tailleCm(e, typeBac);
  let q = ideal;
  while (q > min && q * t > budgetCm(typeBac, volume) * 0.6) q--;
  return String(q);
}
