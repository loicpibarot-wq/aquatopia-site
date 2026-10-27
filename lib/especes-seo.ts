// Aides de référencement et de mise en page pour les fiches espèces :
// titre et méta-description, questions fréquentes (affichées ET déclarées à
// Google en JSON-LD, à partir des mêmes champs, jamais un contenu différent),
// tuiles d'information et choix des fiches « Voir aussi ».
import { ESPECES_PUBLIEES, CATEGORIES_MARINES, type Espece, type FicheTechnique } from '@/lib/especes';
import { faqBouturage, guideBouturage } from '@/lib/bouturage';
import { faqReproduction, reproductionEspece } from '@/lib/especes-reproduction';
import { comportementEspece, COMPORTEMENT_NIVEAUX } from '@/lib/especes-comportement';

export type EspecePubliee = Espece & { fiche: FicheTechnique };

const normaliser = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

// Beaucoup de plantes et de coraux n'ont pas de nom français : le nom « commun »
// est alors le nom scientifique. On évite de l'afficher deux fois.
export function nomsIdentiques(a: string, b: string): boolean {
  return normaliser(a) === normaliser(b);
}

export function nomAvecScientifique(e: Espece): string {
  return nomsIdentiques(e.nomCommun, e.nomScientifique) ? e.nomCommun : `${e.nomCommun} (${e.nomScientifique})`;
}

export const estMarine = (e: Espece) => CATEGORIES_MARINES.includes(e.categorie);

function suffixeTitre(e: EspecePubliee): string {
  if (e.statutLegal === 'interdite') return 'espèce interdite en France';
  if (e.statutLegal === 'autorisation_requise') return 'réglementation en France';
  if (e.categorie === 'Plantes') return 'entretien et culture';
  if (e.categorie === 'Coraux et anémones') return 'entretien en bac récifal';
  if (e.categorie === 'Macroalgues marines') return 'entretien en aquarium marin';
  if (estMarine(e)) return 'fiche et entretien en eau de mer';
  return 'fiche technique';
}

// Seules les espèces librement vendables reçoivent « à vendre » dans leur titre
// et leur description : jamais pour une espèce interdite, soumise à autorisation
// ou à déclaration CITES.
export const estVendable = (e: Espece) => e.statutLegal === 'autorise';

export function titreEspece(e: EspecePubliee): string {
  const vendable = estVendable(e);
  // Avec « à vendre », on raccourcit le suffixe pour rester lisible dans Google.
  const COURT: Record<string, string> = {
    'entretien en bac récifal': 'entretien récifal',
    'entretien en aquarium marin': 'entretien marin',
    'fiche et entretien en eau de mer': 'fiche et entretien',
  };
  const suffixeLong = suffixeTitre(e);
  const suffixe = vendable ? (COURT[suffixeLong] ?? suffixeLong) : suffixeLong;
  const mot = vendable ? ' à vendre' : '';
  const complet = `${nomAvecScientifique(e)}${mot} : ${suffixe}`;
  // Google tronque les titres trop longs (le gabarit ajoute « | Aquatopia ») :
  // au-delà, on garde le seul nom courant.
  const limite = vendable ? 58 : 70;
  return complet.length <= limite ? complet : `${e.nomCommun}${mot} : ${suffixe}`;
}

const coupe = (texte: string, max: number) => {
  if (texte.length <= max) return texte;
  const morceau = texte.slice(0, max - 1);
  return `${morceau.slice(0, morceau.lastIndexOf(' '))}…`;
};

// « bouturage, » dans la meta description quand la fiche affiche un guide de bouturage.
function bouturageDesc(e: EspecePubliee): string {
  const g = guideBouturage(e);
  return g && (g.faisable || e.fiche.corail) ? 'bouturage, ' : '';
}

// Thèmes propres aux fiches de poissons, ajoutés à la meta description :
// « Comportement, reproduction, » selon ce que la fiche contient vraiment.
function themesFiche(slug: string): string {
  const themes = [comportementEspece(slug) ? 'Comportement' : null, reproductionEspece(slug) ? 'reproduction' : null].filter(Boolean) as string[];
  if (themes.length === 0) return '';
  const t = themes.join(', ');
  return `${t.charAt(0).toUpperCase()}${t.slice(1)}, `;
}

export function descriptionEspece(e: EspecePubliee): string {
  const nomDesc = estVendable(e) ? `${e.nomCommun} à vendre` : e.nomCommun;
  const f = e.fiche;
  const ph = `pH ${f.phMin ?? '?'}-${f.phMax ?? '?'}`;
  const temp = `${f.tempMin ?? '?'}-${f.tempMax ?? '?'}°C`;
  if (e.statutLegal === 'interdite') {
    return coupe(`${e.nomCommun} : espèce interdite à la vente en France. Statut légal, raisons de l'interdiction et conseils.`, 158);
  }
  if (e.statutLegal === 'autorisation_requise') {
    return coupe(`${e.nomCommun} : détention soumise à certificat de capacité en France, donc fermée aux particuliers. Réglementation et risques.`, 158);
  }
  if (f.corail) {
    const c = f.corail;
    return coupe(
      `${nomDesc} : ${c.type}, lumière ${c.lumiere.toLowerCase()}, courant ${c.courant.toLowerCase()}, ${temp}. Entretien, ${bouturageDesc(e)}compatibilité et statut légal.`,
      158,
    );
  }
  if (f.algue) {
    const a = f.algue;
    return coupe(
      `${nomDesc} : lumière ${a.lumiere.toLowerCase()}, croissance ${a.croissance.toLowerCase()}, risque de prolifération ${a.risque.toLowerCase()}. Usage, entretien et statut légal en France.`,
      158,
    );
  }
  if (f.plante) {
    const p = f.plante;
    return coupe(
      `${nomDesc} : ${p.placement.toLowerCase()}, lumière ${p.lumiere.toLowerCase()}, CO₂ ${p.co2.toLowerCase()}, ${ph}, ${temp}. Entretien, ${bouturageDesc(e)}compatibilité et statut.`,
      158,
    );
  }
  if (f.marin) {
    const reef = f.marin.reefSafe ? `, récif : ${f.marin.reefSafe.toLowerCase()}` : '';
    const compo = themesFiche(e.slug);
    return coupe(
      `${nomDesc} : volume min. ${f.volumeMinLitres ? `${f.volumeMinLitres} L` : 'non applicable'}${reef}, ${temp}. ${compo}${compo ? 'compatibilité' : 'Compatibilité'}, alimentation et statut légal.`,
      158,
    );
  }
  const compo = themesFiche(e.slug);
  return coupe(`${nomDesc} : volume min. ${f.volumeMinLitres ? `${f.volumeMinLitres} L` : 'non applicable'}, ${ph}, ${temp}. ${compo}${compo ? 'compatibilité' : 'Compatibilité'}, alimentation et entretien.`, 160);
}

export interface Tuile {
  label: string;
  valeur: string;
  // Valeurs textuelles longues : police un peu plus petite.
  petite?: boolean;
}

// Tuiles « fiche technique » en haut de page, selon le type de fiche.
export function tuilesEspece(e: EspecePubliee): Tuile[] {
  const f = e.fiche;
  const t: Tuile[] = [];
  const volume = f.volumeMinLitres ? `${f.volumeMinLitres} L` : 'Non applicable';
  const groupe = f.tailleGroupeMin ? `${f.tailleGroupeMin} individu${f.tailleGroupeMin > 1 ? 's' : ''}` : 'Non applicable';
  const ph = f.phMin !== null && f.phMax !== null ? `${f.phMin} – ${f.phMax}` : 'Non applicable';
  const temp = f.tempMin !== null && f.tempMax !== null ? `${f.tempMin} – ${f.tempMax}°C` : 'Non applicable';

  if (f.corail) {
    const c = f.corail;
    t.push({ label: 'Type', valeur: c.type }, { label: 'Lumière', valeur: c.lumiere }, { label: 'Courant', valeur: c.courant });
    t.push({ label: 'Placement', valeur: c.placement, petite: true }, { label: 'Croissance', valeur: c.croissance }, { label: 'Agressivité', valeur: c.agressivite, petite: true });
    if (f.volumeMinLitres) t.push({ label: 'Volume minimum', valeur: volume });
  } else if (f.algue) {
    const a = f.algue;
    t.push({ label: 'Placement', valeur: a.placement, petite: true }, { label: 'Lumière', valeur: a.lumiere });
    t.push({ label: 'Croissance', valeur: a.croissance }, { label: 'Risque de prolifération', valeur: a.risque, petite: true });
  } else if (f.plante) {
    const p = f.plante;
    t.push({ label: 'Placement', valeur: p.placement, petite: true }, { label: 'Lumière', valeur: p.lumiere });
    t.push({ label: 'Croissance', valeur: p.croissance }, { label: 'CO₂', valeur: p.co2 });
    if (f.volumeMinLitres) t.push({ label: 'Volume minimum', valeur: volume });
  } else {
    t.push({ label: 'Volume minimum', valeur: volume }, { label: 'Groupe minimum', valeur: groupe });
    if (f.marin?.reefSafe) t.push({ label: 'Compatible récif', valeur: f.marin.reefSafe, petite: true });
    if (f.marin?.zone) t.push({ label: 'Zone du bac', valeur: f.marin.zone, petite: true });
  }

  t.push({ label: 'pH idéal', valeur: ph }, { label: 'Température', valeur: temp });
  if (f.marin) {
    t.push({ label: 'Salinité', valeur: f.marin.salinite, petite: true });
    if (f.marin.kh) t.push({ label: 'KH', valeur: f.marin.kh, petite: true });
    if (f.marin.calcium) t.push({ label: 'Calcium', valeur: f.marin.calcium, petite: true });
    if (f.marin.magnesium) t.push({ label: 'Magnésium', valeur: f.marin.magnesium, petite: true });
    t.push({ label: 'Origine', valeur: f.marin.origine, petite: true });
  }
  t.push({ label: f.plante || f.corail || f.algue ? 'Taille' : 'Taille adulte', valeur: f.tailleAdulte, petite: true });
  t.push({ label: 'Difficulté', valeur: f.difficulte });
  return t;
}

export interface QuestionReponse {
  question: string;
  reponse: string;
}

const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const minuscule = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
const phrase = (t: string) => (/[.!?…]$/.test(t.trim()) ? t.trim() : `${t.trim()}.`);
const enumeration = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} et ${items[items.length - 1]}`;

// Questions fréquentes construites uniquement à partir des champs de la fiche.
export function faqEspece(e: EspecePubliee): QuestionReponse[] {
  const f = e.fiche;
  const nom = e.nomCommun;
  const faq: QuestionReponse[] = [];
  const vigilance = f.plante || f.algue || f.corail ? 'Points de vigilance' : 'À éviter';

  // ── Paramètres eau — questions individuelles (= requêtes Google ciblées) ──
  if (f.tempMin !== null && f.tempMax !== null) {
    faq.push({
      question: `Quelle température pour ${nom} ?`,
      reponse: `${nom} vit entre ${f.tempMin} et ${f.tempMax} °C.`,
    });
  }

  if (f.phMin !== null && f.phMax !== null) {
    faq.push({
      question: `Quel pH pour ${nom} ?`,
      reponse: `Le pH idéal pour ${nom} est compris entre ${f.phMin} et ${f.phMax}.`,
    });
  }

  if (f.marin?.salinite) {
    faq.push({
      question: `Quelle salinité pour ${nom} ?`,
      reponse: `${nom} nécessite une salinité de ${f.marin.salinite}.`,
    });
  }

  // Chimie avancée pour coraux / marins (KH, calcium, magnésium)
  const m = f.marin;
  if (m && (m.kh || m.calcium || m.magnesium)) {
    const chimie = [
      m.kh && `KH ${m.kh}`,
      m.calcium && `calcium ${m.calcium}`,
      m.magnesium && `magnésium ${m.magnesium}`,
    ]
      .filter(Boolean)
      .join(', ');
    faq.push({
      question: `Quels paramètres chimiques avancés pour ${nom} ?`,
      reponse: `Chimie de l'eau recommandée : ${chimie}.`,
    });
  }

  // ── Branches par type de vivant ────────────────────────────────────
  if (f.corail) {
    const c = f.corail;
    faq.push({
      question: `Quelle lumière et quel courant pour ${nom} ?`,
      reponse: `Lumière : ${c.lumiere.toLowerCase()}. Courant : ${c.courant.toLowerCase()}. ${phrase(f.alimentation)}`,
    });
    faq.push({
      question: `Où placer ${nom} dans l'aquarium ?`,
      reponse: `Placement conseillé : ${c.placement.toLowerCase()}. Agressivité : ${c.agressivite.toLowerCase()}. Taille adulte : ${f.tailleAdulte}.`,
    });
    faq.push(...faqBouturage(e));
  } else if (f.algue) {
    const a = f.algue;
    faq.push({
      question: `À quoi sert ${nom} en aquarium marin ?`,
      reponse: `${phrase(majuscule(a.usage))} Placement : ${a.placement.toLowerCase()}, lumière ${a.lumiere.toLowerCase()}.`,
    });
    faq.push({
      question: `${nom} risque-t-elle de proliférer ?`,
      reponse: `Risque de prolifération : ${a.risque.toLowerCase()}. ${phrase(f.conseil)}`,
    });
    faq.push({ question: `Comment multiplier ${nom} ?`, reponse: phrase(majuscule(a.multiplication)) });
  } else if (f.plante) {
    const p = f.plante;
    faq.push({
      question: `Quelle lumière et quel CO₂ pour ${nom} ?`,
      reponse: `Lumière : ${p.lumiere.toLowerCase()}. CO₂ : ${p.co2.toLowerCase()}. ${phrase(f.alimentation)}`,
    });
    faq.push({
      question: `Où placer ${nom} ?`,
      reponse: `Placement conseillé : ${p.placement.toLowerCase()}. Taille adulte : ${f.tailleAdulte}.`,
    });
    faq.push(...faqBouturage(e));
  } else {
    // Poissons, crustacés, invertébrés eau douce et marins
    if (f.volumeMinLitres) {
      faq.push({
        question: `Combien de litres pour ${nom} ?`,
        reponse: `Il faut un aquarium d'au moins ${f.volumeMinLitres} litres pour ${nom}${
          f.tailleGroupeMin && f.tailleGroupeMin > 1
            ? `, gardé en groupe d'au moins ${f.tailleGroupeMin} individus`
            : ''
        }.`,
      });
    }
    if (f.tailleGroupeMin && f.tailleGroupeMin > 1) {
      faq.push({
        question: `En combien d'exemplaires garder ${nom} ?`,
        reponse: `${nom} est une espèce grégaire qui doit être gardée en groupe d'au moins ${f.tailleGroupeMin} individus.`,
      });
    }
    if (f.marin?.reefSafe) {
      const intro =
        f.marin.reefSafe === 'Oui'
          ? 'Oui, il convient à un bac récifal.'
          : f.marin.reefSafe === 'Avec précautions'
            ? 'Avec précautions.'
            : 'Non, il est déconseillé dans un bac récifal.';
      faq.push({
        question: `${nom} est-il compatible avec un aquarium récifal ?`,
        reponse: `${intro} ${phrase(f.incompatibilite)}`,
      });
    }
    faq.push({
      question: `Avec quelles espèces associer ${nom} ?`,
      reponse: `${phrase(f.compatibilite)}${f.incompatibilite ? ` ${vigilance} : ${minuscule(f.incompatibilite)}` : ''}`.trim(),
    });
    faq.push({ question: `Que mange ${nom} ?`, reponse: phrase(f.alimentation) });
    faq.push({
      question: `Quelle taille adulte pour ${nom} ?`,
      reponse: `${nom} atteint ${f.tailleAdulte} à l'âge adulte.`,
    });
    const comportement = comportementEspece(e.slug);
    if (comportement) {
      faq.push({
        question: `Quel est le comportement de ${nom} en aquarium ?`,
        reponse: `${comportement.description} Intérêt à l'observer : ${comportement.niveau} sur 5 (${COMPORTEMENT_NIVEAUX[comportement.niveau].libelle.toLowerCase()}).`,
      });
    }
    if (reproductionEspece(e.slug)) {
      faq.push(...faqReproduction(e.slug, nom));
    } else if (f.reproduction) {
      faq.push({
        question: `La reproduction de ${nom} est-elle facile ?`,
        reponse: `Reproduction ${f.reproduction.facilite.toLowerCase()}. ${phrase(f.reproduction.description)}`,
      });
    }
  }

  faq.push({
    question: `Quel niveau de difficulté pour ${nom} ?`,
    reponse: `Niveau ${f.difficulte.toLowerCase()}. ${phrase(f.conseil)}`,
  });

  // ── Statut légal ───────────────────────────────────────────────────
  if (e.statutLegal === 'interdite') {
    faq.push({
      question: `Peut-on acheter ou vendre ${nom} en France ?`,
      reponse: `Non. ${phrase(e.remarqueLegale ?? 'Cette espèce est interdite à la vente et à la détention en France.')}`,
    });
  } else if (e.statutLegal === 'autorisation_requise') {
    faq.push({
      question: `Peut-on détenir ou vendre ${nom} en France ?`,
      reponse: `Pas en tant que particulier. ${phrase(e.remarqueLegale ?? "Sa détention exige un certificat de capacité et une autorisation d'ouverture.")}`,
    });
  } else if (e.statutLegal === 'cites_a_signaler') {
    faq.push({
      question: `Peut-on acheter ou vendre ${nom} en France ?`,
      reponse: phrase(e.remarqueLegale ?? 'Cette espèce est réglementée (CITES) : conservez la preuve de son origine légale.'),
    });
  } else {
    faq.push({
      question: `Peut-on acheter ou vendre ${nom} en France ?`,
      reponse: `Oui. Cette espèce ne figure ni parmi les espèces interdites à la vente en France, ni parmi les espèces CITES à justifier.${e.remarqueLegale ? ` ${phrase(e.remarqueLegale)}` : ''}`,
    });
  }

  return faq;
}

// Petit hachage stable : varie les « Voir aussi » d'une fiche à l'autre sans
// aléa (le rendu doit rester identique à chaque génération du site).
const hachage = (t: string) => {
  let h = 0;
  for (let i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) % 9973;
  return h;
};

const genre = (e: Espece) => normaliser(e.nomScientifique).split(' ')[0];

// Fiches proches : même genre botanique ou zoologique d'abord (par exemple les
// autres cryptocorynes), puis même placement ou même type de corail, puis même
// statut ; à score égal, un ordre stable mais différent d'une fiche à l'autre.
export function especesLiees(e: EspecePubliee, nombre = 4): EspecePubliee[] {
  const g = genre(e);
  return ESPECES_PUBLIEES.filter((x) => x.slug !== e.slug && x.categorie === e.categorie)
    .map((x) => {
      let score = 0;
      if (genre(x) === g) score += 3;
      if (e.fiche.plante && x.fiche.plante && e.fiche.plante.placement === x.fiche.plante.placement) score += 2;
      if (e.fiche.corail && x.fiche.corail && e.fiche.corail.type === x.fiche.corail.type) score += 2;
      if (e.fiche.marin?.reefSafe && x.fiche.marin?.reefSafe === e.fiche.marin.reefSafe) score += 1;
      if (x.statutLegal === e.statutLegal) score += 1;
      return { x, score: score + (hachage(`${e.slug}|${x.slug}`) % 1000) / 10000 };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, nombre)
    .map((r) => r.x);
}
