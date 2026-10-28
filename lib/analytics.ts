// Mesure d'audience : événements Google Analytics envoyés seulement si le visiteur a
// accepté les cookies (sinon gtag n'existe pas et chaque appel ne fait rien).

type Valeur = string | number | boolean;

export function suivre(nom: string, params: Record<string, Valeur> = {}): void {
  try {
    const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (typeof g === 'function') g('event', nom, params);
  } catch {
    // la mesure ne doit jamais gêner le site
  }
}

const CLE_SOURCE = 'aquatopia_source_v1';

// Noms lisibles pour les sources les plus courantes (les navigateurs intégrés des
// réseaux sociaux envoient souvent un référent du type « l.instagram.com »).
const RESEAUX: [RegExp, string][] = [
  [/tiktok\./, 'tiktok'],
  [/instagram\./, 'instagram'],
  [/(facebook|fb)\.(com|me)/, 'facebook'],
  [/(youtube\.|youtu\.be)/, 'youtube'],
  [/(google|bing|qwant|duckduckgo|ecosia)\./, 'recherche'],
];

/**
 * À appeler à l'arrivée sur le site : retient d'où vient le visiteur pour toute la
 * visite. Priorité à ?src= ou ?utm_source= dans le lien (fiable, à mettre dans les
 * bios), puis au site d'origine. Reste dans sessionStorage, jamais envoyé ailleurs.
 */
export function memoriserSource(): void {
  try {
    if (sessionStorage.getItem(CLE_SOURCE)) return;
    const q = new URLSearchParams(window.location.search);
    let source = (q.get('src') ?? q.get('utm_source') ?? '').toLowerCase().slice(0, 40);
    if (!source && document.referrer) {
      const hote = new URL(document.referrer).hostname.toLowerCase();
      if (hote !== window.location.hostname) {
        source = RESEAUX.find(([re]) => re.test(hote))?.[1] ?? hote.replace(/^www\./, '');
      }
    }
    sessionStorage.setItem(CLE_SOURCE, source || 'direct');
  } catch {
    // stockage indisponible
  }
}

export function sourceVisite(): string {
  try {
    return sessionStorage.getItem(CLE_SOURCE) ?? 'direct';
  } catch {
    return 'direct';
  }
}
