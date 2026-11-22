import { createHash } from 'crypto';

// Outils anti-abus partagés par les routes d'API (formulaire de signalement, compteurs).
// Rien n'est écrit en base ni dans un cookie : les empreintes restent en mémoire, hachées,
// et disparaissent au plus tard à la fin de la journée (ou au redémarrage de la fonction).

/**
 * Adresse IP du visiteur, telle que vue par Netlify.
 * `x-nf-client-connection-ip` est posé par Netlify lui-même (un visiteur ne peut pas
 * l'imposer). À défaut, on prend le DERNIER maillon de x-forwarded-for, celui ajouté par
 * le proxy : les premiers maillons sont fournis par le client et donc falsifiables.
 */
export function ipClient(req: Request): string {
  const netlify = req.headers.get('x-nf-client-connection-ip')?.trim();
  if (netlify) return netlify;
  const maillons = (req.headers.get('x-forwarded-for') ?? '')
    .split(',').map((s) => s.trim()).filter(Boolean);
  return maillons[maillons.length - 1] || 'inconnue';
}

// Robots évidents (moteurs de recherche, aperçus de liens, outils en ligne de commande…).
const MOTIF_ROBOT =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|lighthouse|headless|phantom|curl|wget|python|httpclient|okhttp|java\/|go-http|axios|node-fetch|undici|postman|insomnia|scrapy|monitor|uptime|pingdom/i;

/** Vrai si la requête vient manifestement d'un robot (ou n'a pas de user-agent). */
export function estRobot(req: Request): boolean {
  const ua = req.headers.get('user-agent') ?? '';
  return ua.length < 10 || MOTIF_ROBOT.test(ua);
}

// Empreintes déjà comptées aujourd'hui : empreinte -> date (AAAA-MM-JJ, UTC).
const DEJA_COMPTES = new Map<string, string>();
const TAILLE_MAX = 50_000; // garde-fou mémoire

function jourUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Vrai si ce visiteur a déjà été compté aujourd'hui pour cette clé (ex. « vues:neon »).
 * L'empreinte est un hachage salé de IP + user-agent + jour + clé : on ne garde jamais
 * l'IP en clair. Limite : la mémoire n'est pas partagée entre les instances serverless,
 * donc un même visiteur peut exceptionnellement être compté une fois par instance.
 */
export function dejaCompteAujourdhui(req: Request, cle: string): boolean {
  const jour = jourUTC();
  const sel = process.env.SIGNALEMENT_SEL ?? 'aquatopia';
  const empreinte = createHash('sha256')
    .update(`${ipClient(req)}|${req.headers.get('user-agent') ?? ''}|${jour}|${cle}|${sel}`)
    .digest('hex').slice(0, 32);

  // Ménage : on oublie les empreintes des jours précédents, ou tout si la table déborde.
  if (DEJA_COMPTES.size >= TAILLE_MAX) DEJA_COMPTES.clear();
  else if (DEJA_COMPTES.size > 0 && DEJA_COMPTES.values().next().value !== jour) {
    DEJA_COMPTES.forEach((j, k) => { if (j !== jour) DEJA_COMPTES.delete(k); });
  }

  if (DEJA_COMPTES.get(empreinte) === jour) return true;
  DEJA_COMPTES.set(empreinte, jour);
  return false;
}

/** Vrai si la requête doit être lue sans incrémenter (robot ou déjà compté aujourd'hui). */
export function nePasCompter(req: Request, cle: string): boolean {
  return estRobot(req) || dejaCompteAujourdhui(req, cle);
}
