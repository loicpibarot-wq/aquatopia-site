// Guide de bouturage / multiplication des plantes et des coraux.
//
// Le texte propre à chaque espèce reste dans `fiche.plante.multiplication` /
// `fiche.corail.multiplication` (déjà rédigé espèce par espèce). Ce module y
// ajoute la méthode pas à pas, choisie d'après le type de plante ou de corail,
// pour que la fiche réponde vraiment à « comment bouturer … ». Le même objet
// alimente la section affichée ET la FAQ déclarée à Google : jamais deux
// contenus différents.
import type { Espece, FicheTechnique } from '@/lib/especes';

type EspeceAvecFiche = Espece & { fiche: FicheTechnique };

export type NiveauBouture = 'Facile' | 'Moyenne' | 'Délicate';

export interface GuideBouturage {
  /** Titre de la section (et de la question FAQ principale). */
  titre: string;
  /** Texte propre à l'espèce, tiré de sa fiche. */
  resume: string;
  /** false : l'espèce ne se bouture pas (ou on ne le conseille pas). */
  faisable: boolean;
  niveau?: NiveauBouture;
  /** Nom court de la méthode, ex. « bouture de tige ». */
  methode?: string;
  materiel: string[];
  etapes: string[];
  reprise?: string;
  precaution?: string;
}

const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const phrase = (t: string) => (/[.!?…]$/.test(t.trim()) ? t.trim() : `${t.trim()}.`);

// ─── Plantes ────────────────────────────────────────────────────────────────

type MethodePlante =
  | 'tige' | 'mousse' | 'rhizome-fixe' | 'rhizome-sol' | 'stolon' | 'tapis'
  | 'plantules' | 'bulbe' | 'souche' | 'flottante' | 'graines';

function methodePlante(e: EspeceAvecFiche): MethodePlante {
  const p = e.fiche.plante!;
  const t = p.multiplication.toLowerCase();
  const slug = e.slug;

  if (/mousse|fissidens|riccardia|pellia/.test(slug)) return 'mousse';
  if (/bouturage (des |de )?(tiges?|sommets)|fragments? de tige|^bouturage de tiges/.test(t)) return 'tige';
  if (p.placement === 'Plante de berge' || p.placement === 'Plante de bassin') {
    return /^bouturage/.test(t) ? 'tige' : 'souche';
  }
  if (!/bouturage|division|rhizome|stolon|rejet|plantule|fragment|bulbe|bourgeon|touffe/.test(t)) return 'graines';
  if (/hampes? florales?|plantules (sur|au bout|nées|sous)/.test(t)) return 'plantules';
  if (/bulbe/.test(t)) return 'bulbe';
  if (/rhizome/.test(t)) return p.placement === 'Fixée sur bois ou roche' ? 'rhizome-fixe' : 'rhizome-sol';
  if (p.placement === 'Tapis') return 'tapis';
  if (p.placement === 'Flottante') return /souche/.test(t) ? 'souche' : 'flottante';
  if (/stolon|rejet/.test(t)) return 'stolon';
  return 'souche';
}

const MATERIEL_PLANTE: Record<MethodePlante, string[]> = {
  tige: ["Ciseaux d'aquascaping bien affûtés (ou ciseaux fins et propres)", 'Pincette longue pour replanter', 'Engrais racinaire (facultatif) pour aider les nouvelles boutures'],
  mousse: ['Ciseaux fins', 'Fil de pêche ou fil de coton, ou colle cyanoacrylate gel', 'Un support : bois, roche ou grille d’aquascaping'],
  'rhizome-fixe': ['Ciseaux tranchants ou lame propre', 'Fil de pêche ou colle cyanoacrylate gel', 'Un bois ou une roche pour fixer chaque morceau'],
  'rhizome-sol': ['Ciseaux tranchants ou lame propre', 'Pincette longue pour replanter'],
  stolon: ['Ciseaux fins', 'Pincette longue pour replanter', 'Engrais racinaire (facultatif)'],
  tapis: ['Ciseaux fins', 'Pincette longue pour replanter', 'Substrat fin'],
  plantules: ['Ciseaux fins', 'Pincette longue pour replanter'],
  bulbe: ['Couteau ou ciseaux propres', 'Pincette ou doigts pour replanter', 'Substrat nutritif'],
  souche: ['Bêche, couteau solide ou sécateur propre', 'Gants', 'Panier de plantation et terreau argileux pour bassin, ou substrat adapté'],
  flottante: ['Épuisette ou simplement les mains'],
  graines: [],
};

const ETAPES_PLANTE: Record<MethodePlante, string[]> = {
  tige: [
    'Choisissez une tige saine, bien feuillée, sans algues ni feuilles abîmées, et laissez-la pousser jusqu’à au moins 15 à 20 cm.',
    'Coupez le sommet de la tige sur 8 à 15 cm, juste sous un nœud (le point d’où partent les feuilles) : c’est là que les racines se formeront.',
    'Retirez les feuilles du bas sur 2 à 3 cm pour dégager la partie qui sera enterrée.',
    'Plantez la bouture de 2 à 3 cm dans le substrat avec la pincette, en espaçant les tiges d’environ 1 à 2 cm pour qu’elles ne se fassent pas d’ombre.',
    'Laissez la base de la plante mère en place : la tige recoupée émet des rejets latéraux et se densifie.',
  ],
  mousse: [
    'Prélevez une touffe saine et rincez-la dans l’eau du bac pour retirer les débris.',
    'Coupez-la en morceaux de 2 à 5 cm avec les ciseaux, ou séparez-la à la main.',
    'Étalez une couche fine sur le support : trop épaisse, la mousse noircit en dessous faute de lumière et de courant.',
    'Fixez-la avec du fil de pêche ou de coton, ou une pointe de colle gel. Le fil se retire quand la mousse s’est accrochée.',
    'Taillez régulièrement pour garder une mousse dense et claire.',
  ],
  'rhizome-fixe': [
    'Repérez le rhizome, la tige épaisse et horizontale d’où partent les feuilles et les racines.',
    'Sortez la plante du bac et coupez le rhizome net entre deux groupes de feuilles : chaque tronçon doit garder plusieurs feuilles (au moins 3 ou 4) et, idéalement, quelques racines.',
    'Fixez chaque tronçon sur une roche ou un bois avec du fil de pêche ou de la colle gel.',
    'N’enterrez jamais le rhizome : il pourrit. Seules les racines peuvent aller dans le substrat.',
    'Remettez dans le bac et retirez le fil au bout de quelques semaines, une fois les racines accrochées.',
  ],
  'rhizome-sol': [
    'Sortez la plante du bac et repérez son rhizome (la tige épaisse d’où partent feuilles et racines).',
    'Séparez ou coupez un morceau qui conserve des racines saines et plusieurs feuilles.',
    'Replantez-le en enterrant les racines mais en laissant le rhizome dépasser du substrat.',
    'Retirez les feuilles abîmées pour que la plante concentre son énergie sur les racines.',
  ],
  stolon: [
    'Laissez la plantule se développer jusqu’à avoir 3 ou 4 feuilles et ses propres racines.',
    'Coupez le stolon (la tige fine qui la relie à la plante mère) avec les ciseaux.',
    'Plantez la jeune plante avec la pincette, le collet (la base d’où partent les feuilles) au niveau du substrat : ni enterré, ni dégagé.',
    'Pour éclaircir un massif, vous pouvez aussi séparer une touffe avec ses racines et la replanter ailleurs.',
  ],
  tapis: [
    'Laissez le tapis s’épaissir jusqu’à bien couvrir le sol.',
    'Coupez une portion de touffe avec les ciseaux, ou détachez-en un morceau avec ses racines.',
    'Divisez-la en petits groupes de quelques tiges.',
    'Replantez chaque groupe à la pincette, à 1 ou 2 cm les uns des autres, dans un substrat fin.',
    'Taillez le tapis régulièrement pour qu’il se densifie plutôt que de monter en hauteur.',
  ],
  plantules: [
    'Attendez que la plantule ait 3 ou 4 feuilles et que de petites racines apparaissent.',
    'Détachez-la en coupant le support (hampe, feuille ou fronde) à 1 ou 2 cm de la plantule.',
    'Plantez-la ou fixez-la sur son support, la base dans le substrat mais le cœur de la plante dégagé.',
    'Gardez la plantule bien éclairée : elle devient autonome en quelques semaines.',
  ],
  bulbe: [
    'Repérez les bulbes fils, petites boules qui se forment au pied du bulbe principal.',
    'Attendez qu’ils aient leurs propres racines et quelques feuilles avant de les séparer.',
    'Dégagez doucement le substrat autour de la touffe, puis séparez le bulbe fils du bulbe principal en gardant ses racines.',
    'Replantez sans enterrer entièrement le bulbe : sa partie haute doit dépasser du substrat.',
  ],
  souche: [
    'Choisissez la bonne saison : en général le printemps, hors période de gel.',
    'Sortez la plante de son panier ou de la berge et rincez les racines pour voir la souche.',
    'Divisez la souche en deux ou trois parts avec le couteau ou la bêche : chaque part doit garder des racines saines et plusieurs pousses.',
    'Replantez chaque part dans un panier avec un terreau pour bassin, recouvert d’une couche de gravier.',
    'Remettez à la profondeur d’origine et laissez la plante s’installer sans la déplacer.',
  ],
  flottante: [
    'Prélevez quelques plants ou rosettes à l’épuisette ou à la main.',
    'Séparez les jeunes plants des plus grands si des liens (stolons) les relient encore.',
    'Remettez-en quelques-uns à la surface : la multiplication est rapide.',
    'Éclaircissez régulièrement et ne laissez pas la surface entièrement couverte : la lumière et les échanges gazeux doivent passer.',
  ],
  graines: [],
};

const REPRISE_PLANTE: Record<MethodePlante, string> = {
  tige: 'Les premières racines apparaissent en général en une à deux semaines. La bouture a repris quand de nouvelles feuilles se forment au sommet. Une bonne lumière et, si la plante l’exige, du CO₂ et de l’engrais accélèrent la reprise.',
  mousse: 'Il faut souvent un mois ou plus pour que la mousse s’accroche solidement au support. La croissance reste lente, surtout sans lumière ni nutriments suffisants.',
  'rhizome-fixe': 'Les nouvelles racines s’accrochent en quelques semaines. La croissance est lente : ne vous inquiétez pas si la plante semble immobile au début.',
  'rhizome-sol': 'La plante met quelques semaines à reprendre. Quelques anciennes feuilles peuvent jaunir avant que de nouvelles ne poussent.',
  stolon: 'La jeune plante s’enracine en une à trois semaines. Un éclairage correct et un engrais racinaire l’aident à s’installer.',
  tapis: 'Le tapis se referme en quelques semaines si la lumière est suffisante au niveau du sol.',
  plantules: 'La plantule devient autonome en quelques semaines. Des feuilles neuves indiquent qu’elle a repris.',
  bulbe: 'Le bulbe fils émet des racines puis de nouvelles feuilles en quelques semaines. Il peut rester un temps sans pousser, ce qui est normal.',
  souche: 'La plante s’installe en quelques semaines. Évitez de la diviser à nouveau avant qu’elle ait bien repris.',
  flottante: 'Les nouveaux plants sont autonomes immédiatement ; la population double souvent en quelques jours à quelques semaines.',
  graines: '',
};

const METHODE_NOM_PLANTE: Record<MethodePlante, string> = {
  tige: 'bouture de tige',
  mousse: 'division en fragments',
  'rhizome-fixe': 'division du rhizome',
  'rhizome-sol': 'division du rhizome',
  stolon: 'séparation des plantules sur stolon',
  tapis: 'division de touffes',
  plantules: 'séparation des plantules',
  bulbe: 'séparation des bulbes fils',
  souche: 'division de souche',
  flottante: 'séparation des plants',
  graines: 'semis',
};

const NIVEAU_PLANTE: Record<MethodePlante, NiveauBouture> = {
  tige: 'Facile', mousse: 'Facile', 'rhizome-fixe': 'Facile', 'rhizome-sol': 'Moyenne',
  stolon: 'Facile', tapis: 'Facile', plantules: 'Facile', bulbe: 'Moyenne', souche: 'Moyenne',
  flottante: 'Facile', graines: 'Moyenne',
};

function guidePlante(e: EspeceAvecFiche): GuideBouturage {
  const nom = e.nomCommun;
  const p = e.fiche.plante!;
  const resume = phrase(majuscule(p.multiplication));

  if (e.statutLegal !== 'autorise') {
    return {
      titre: `Peut-on bouturer ${nom} ?`,
      resume,
      faisable: false,
      materiel: [],
      etapes: [],
      precaution: 'Cette plante est réglementée ou potentiellement envahissante : ne la multipliez pas pour la céder, et ne jetez jamais de fragments dans la nature.',
    };
  }

  const m = methodePlante(e);
  if (m === 'graines') {
    return {
      titre: `Peut-on bouturer ${nom} ?`,
      resume,
      faisable: false,
      materiel: [],
      etapes: [],
      precaution: 'Cette plante ne se multiplie pas de façon fiable par bouture ou par division : elle se renouvelle surtout par graines, après floraison.',
    };
  }

  const verbe = m === 'tige' || m === 'mousse' || m === 'rhizome-fixe' || m === 'rhizome-sol' || m === 'tapis' ? 'bouturer' : 'multiplier';
  let precaution: string | undefined;
  if (/cryptocoryne/.test(e.slug)) {
    precaution = 'Les cryptocorynes peuvent perdre leurs feuilles après un déplacement (on parle de « fonte »). C’est normal : elles repartent de la base quand elles se sont réadaptées.';
  } else if (/délicat/.test(p.multiplication.toLowerCase())) {
    precaution = 'Cette opération est délicate : laissez la plaie cicatriser avant de replanter et ne divisez que des plantes bien développées.';
  }

  return {
    titre: `Comment ${verbe} ${nom} ?`,
    resume,
    faisable: true,
    niveau: NIVEAU_PLANTE[m],
    methode: METHODE_NOM_PLANTE[m],
    materiel: MATERIEL_PLANTE[m],
    etapes: ETAPES_PLANTE[m],
    reprise: REPRISE_PLANTE[m],
    precaution,
  };
}

// ─── Coraux ─────────────────────────────────────────────────────────────────

type MethodeCorail = 'sps' | 'lps-ramifie' | 'lps-massif' | 'mou-lobe' | 'mou-tige' | 'zoanthaire' | 'corallimorphe' | 'gorgone';

const LPS_RAMIFIES = /marteau|torche|frogspawn|trompette|duncan|galaxea/;
const MOU_LOBES = /sarcophyton|cuir|sinularia|lobophytum|kenya/;

function methodeCorail(e: EspeceAvecFiche): MethodeCorail | null {
  const c = e.fiche.corail!;
  const slug = e.slug;
  if (c.type === 'Anémone') return null;
  if (c.type === 'SPS' || c.type === 'Autre') return 'sps';
  if (c.type === 'LPS') return LPS_RAMIFIES.test(slug) ? 'lps-ramifie' : 'lps-massif';
  if (c.type === 'Corail mou') return MOU_LOBES.test(slug) ? 'mou-lobe' : 'mou-tige';
  if (c.type === 'Zoanthaire') return 'zoanthaire';
  if (c.type === 'Corallimorphe') return 'corallimorphe';
  if (c.type === 'Gorgone') return 'gorgone';
  return null;
}

const MATERIEL_COMMUN_CORAIL = [
  'Gants en nitrile et lunettes de protection',
  'Supports de bouture (plugs en céramique ou petits cailloux)',
  'Colle cyanoacrylate gel sans solvant, ou pâte époxy pour corail',
  'Un récipient rempli d’eau prélevée dans le bac',
];

const MATERIEL_CORAIL: Record<MethodeCorail, string[]> = {
  sps: ['Pince coupante à corail (ou scie fine)', ...MATERIEL_COMMUN_CORAIL],
  'lps-ramifie': ['Scie à corail fine ou sécateur à corail', ...MATERIEL_COMMUN_CORAIL],
  'lps-massif': ['Scie à corail (scie à ruban ou à disque diamant pour les squelettes épais)', 'Bain de désinfection pour coraux (facultatif)', ...MATERIEL_COMMUN_CORAIL],
  'mou-lobe': ['Scalpel ou lame propre', 'Élastique ou fil fin pour maintenir la bouture', ...MATERIEL_COMMUN_CORAIL],
  'mou-tige': ['Ciseaux fins ou scalpel propre', 'Élastique ou fil fin pour maintenir la bouture', ...MATERIEL_COMMUN_CORAIL],
  zoanthaire: ['Scalpel ou lame propre', 'Gants en nitrile et lunettes de protection (indispensables)', ...MATERIEL_COMMUN_CORAIL.slice(1)],
  corallimorphe: ['Scalpel propre', 'Élastique ou fil fin pour maintenir la bouture', ...MATERIEL_COMMUN_CORAIL],
  gorgone: ['Ciseaux ou pince coupante', 'Supports ou roche percée', ...MATERIEL_COMMUN_CORAIL.slice(0, 1), ...MATERIEL_COMMUN_CORAIL.slice(2)],
};

const AVANT_COUPE = [
  'Choisissez une colonie en pleine forme, installée depuis plusieurs semaines : couleurs franches, polypes sortis, aucun tissu qui se décolle.',
  'Préparez le poste : gants et lunettes (certains coraux libèrent des substances irritantes), supports secs, colle à portée de main et un récipient avec de l’eau du bac pour travailler.',
];

const ETAPES_CORAIL: Record<MethodeCorail, string[]> = {
  sps: [
    ...AVANT_COUPE,
    'Coupez le bout d’une branche sur 2 à 4 cm avec la pince, net, en travaillant autant que possible dans l’eau du bac.',
    'Séchez rapidement la base du fragment sans toucher aux polypes, déposez une goutte de colle gel sur le support et maintenez le fragment quelques secondes.',
    'Replacez la bouture dans une zone de lumière moyenne et de courant modéré, à distance des voisins : les SPS supportent mal le contact.',
    'Remontez-la progressivement vers l’éclairage et le courant qui lui conviennent une fois que les polypes sont bien sortis.',
  ],
  'lps-ramifie': [
    ...AVANT_COUPE,
    'Repérez une branche portant une ou plusieurs têtes. Coupez dans le squelette, en dessous des polypes, sans passer à travers le tissu vivant.',
    'Laissez la plaie cicatriser dans une eau calme, par exemple posée sur le fond à l’abri du courant, avant de la fixer.',
    'Collez la bouture sur un support avec de la colle gel, puis replacez-la sous un éclairage et un courant modérés.',
  ],
  'lps-massif': [
    ...AVANT_COUPE,
    'Coupez avec la scie entre deux têtes ou deux vallées, jamais à travers une tête : un tissu écrasé s’infecte facilement.',
    'Rincez la bouture dans l’eau du bac. Beaucoup d’éleveurs la passent dans un bain de désinfection pour coraux, selon les consignes du produit.',
    'Laissez la plaie cicatriser dans une eau calme, puis fixez la bouture sur un support avec de la colle gel.',
    'Replacez-la sous un éclairage modéré, sans courant direct, et ne la manipulez plus pendant la reprise.',
  ],
  'mou-lobe': [
    ...AVANT_COUPE,
    'Attendez que le corail soit rétracté, puis coupez un lobe, une crête ou un morceau de pied avec un scalpel propre, en laissant la colonie principale intacte.',
    'Laissez la plaie cicatriser quelques jours dans une eau calme avant de fixer la bouture.',
    'Fixez-la sur une petite roche avec de la colle gel, ou maintenez-la avec un élastique ou un fil fin le temps qu’elle s’accroche, puis retirez-le.',
    'Replacez-la dans une zone d’éclairage et de courant modérés.',
  ],
  'mou-tige': [
    ...AVANT_COUPE,
    'Détachez une tige ou une portion de stolon avec ses polypes, aux ciseaux ou au scalpel, en laissant la colonie principale intacte.',
    'Fixez-la sur une roche avec de la colle gel, ou maintenez-la avec un élastique ou un fil fin jusqu’à ce qu’elle s’accroche.',
    'Replacez-la dans une zone d’éclairage et de courant modérés.',
    'Surveillez la colonie : certains coraux de ce type s’étalent vite et peuvent envahir la roche.',
  ],
  zoanthaire: [
    'Mettez gants et lunettes avant toute manipulation. Certains zoanthaires et palythoas peuvent contenir de la palytoxine, une substance très toxique : évitez tout contact avec les yeux, la bouche et les plaies, travaillez dans un endroit aéré, loin des enfants et des animaux.',
    'Choisissez une colonie en pleine forme, installée depuis plusieurs semaines, avec des polypes bien ouverts.',
    'Détachez un petit groupe de polypes (une dizaine, par exemple) ou un morceau du tapis avec un scalpel, sous l’eau si possible, ou séparez un morceau de roche qui les porte.',
    'Fixez le fragment sur une petite roche avec de la colle gel, sans le laisser longtemps hors de l’eau.',
    'Replacez-le dans une zone d’éclairage et de courant modérés ; il s’étale ensuite tout seul.',
    'Lavez-vous soigneusement les mains et le matériel après l’opération.',
  ],
  corallimorphe: [
    ...AVANT_COUPE,
    'Coupez un polype ou une portion du disque avec un scalpel propre, en gardant une part de pied.',
    'Posez le fragment sur un support et maintenez-le avec un élastique ou un fil fin jusqu’à ce qu’il se referme et s’accroche.',
    'Replacez-le dans une zone d’éclairage et de courant faibles à modérés.',
  ],
  gorgone: [
    ...AVANT_COUPE,
    'Coupez une branche avec une pince ou des ciseaux, sans la sortir de l’eau : l’air blesse le tissu.',
    'Fixez l’extrémité dans un petit trou de roche ou de support avec de la colle gel.',
    'Replacez la bouture dans une zone de courant modéré, sans la déplacer pendant la reprise.',
  ],
};

const REPRISE_CORAIL: Record<MethodeCorail, string> = {
  sps: 'Les polypes ressortent en général en quelques jours, puis la bouture s’encroûte sur son support et reprend sa croissance en quelques semaines. La colonie mère cicatrise et repousse.',
  'lps-ramifie': 'Comptez plusieurs semaines pour que le tissu recouvre la coupe et que les polypes se redéploient complètement.',
  'lps-massif': 'La cicatrisation est lente : comptez plusieurs semaines à quelques mois avant que le tissu recouvre la coupe. Surveillez l’apparition de tissu blanc ou de mucus anormal.',
  'mou-lobe': 'La plaie se referme en quelques jours, puis la bouture s’accroche en une à deux semaines. Elle déploie ses polypes et reprend sa croissance ensuite.',
  'mou-tige': 'La bouture s’accroche en quelques jours à deux semaines selon l’espèce, puis elle s’étale.',
  zoanthaire: 'Les polypes se rouvrent en quelques jours et le fragment s’étale sur son support en quelques semaines.',
  corallimorphe: 'Le fragment se referme en quelques jours à quelques semaines. La reprise est souvent lente.',
  gorgone: 'La reprise est lente et irrégulière : comptez plusieurs semaines avant de voir les polypes bien déployés.',
};

const METHODE_NOM_CORAIL: Record<MethodeCorail, string> = {
  sps: 'fragmentation à la pince',
  'lps-ramifie': 'coupe à la scie',
  'lps-massif': 'coupe à la scie',
  'mou-lobe': 'coupe au scalpel',
  'mou-tige': 'coupe aux ciseaux',
  zoanthaire: 'division de la colonie',
  corallimorphe: 'découpe du disque',
  gorgone: 'coupe d’une branche',
};

const NIVEAU_CORAIL: Record<MethodeCorail, NiveauBouture> = {
  sps: 'Moyenne', 'lps-ramifie': 'Moyenne', 'lps-massif': 'Délicate', 'mou-lobe': 'Facile',
  'mou-tige': 'Facile', zoanthaire: 'Facile', corallimorphe: 'Moyenne', gorgone: 'Délicate',
};

const NON_CONSEILLE_CORAIL = /très délicate|réservée aux producteurs|très peu pratiquée|rarement pratiquée|ne se bouture pas|aucune technique|non conseillée|ne jamais/i;
const PRECAUTION_GENERALE_CORAIL =
  'Ne bouturez qu’un corail en bonne santé et bien installé. Une coupe stresse l’animal : gardez des paramètres stables et ne bouturez pas juste après un changement dans le bac.';

function guideCorail(e: EspeceAvecFiche): GuideBouturage {
  const nom = e.nomCommun;
  const c = e.fiche.corail!;
  const resume = phrase(majuscule(c.multiplication));
  const m = methodeCorail(e);

  if (!m || NON_CONSEILLE_CORAIL.test(c.multiplication)) {
    return {
      titre: `Peut-on bouturer ${nom} ?`,
      resume,
      faisable: false,
      materiel: [],
      etapes: [],
      precaution:
        c.type === 'Anémone'
          ? 'Les anémones ne se bouturent pas : se couper les expose à des infections. Elles se divisent spontanément quand elles sont bien installées.'
          : 'Le bouturage maison est rarement pratiqué pour ce corail et reste risqué : la coupe l’expose à des infections. Mieux vaut, si possible, acheter une colonie issue d’élevage.',
    };
  }

  let niveau = NIVEAU_CORAIL[m];
  let precaution = PRECAUTION_GENERALE_CORAIL;
  if (/délicat|incertaine|peu pratiqué|pertes de tissu|cicatrisation est lente/i.test(c.multiplication)) {
    niveau = 'Délicate';
    precaution = `${PRECAUTION_GENERALE_CORAIL} Pour ce corail, la coupe reste risquée : le bouturage s’adresse aux aquariophiles expérimentés.`;
  }

  return {
    titre: `Comment bouturer ${nom} ?`,
    resume,
    faisable: true,
    niveau,
    methode: METHODE_NOM_CORAIL[m],
    materiel: MATERIEL_CORAIL[m],
    etapes: ETAPES_CORAIL[m],
    reprise: REPRISE_CORAIL[m],
    precaution,
  };
}

// ─── Entrée publique ────────────────────────────────────────────────────────

export function guideBouturage(e: EspeceAvecFiche): GuideBouturage | null {
  if (e.fiche.corail) return guideCorail(e);
  if (e.fiche.plante) return guidePlante(e);
  return null;
}

/** Questions FAQ tirées du guide (mêmes mots que la section affichée). */
export function faqBouturage(e: EspeceAvecFiche): { question: string; reponse: string }[] {
  const g = guideBouturage(e);
  if (!g) return [];
  const nom = e.nomCommun;

  if (!g.faisable) {
    return [{ question: g.titre, reponse: `${g.resume} ${g.precaution ?? ''}`.trim() }];
  }

  const faq = [
    {
      question: g.titre,
      reponse: `${g.resume} ${g.etapes.map((s, i) => `${i + 1}. ${phrase(s)}`).join(' ')}`,
    },
    {
      question: `Quel matériel pour ${g.titre.startsWith('Comment bouturer') ? 'bouturer' : 'multiplier'} ${nom} ?`,
      reponse: `${g.materiel.join(' ; ')}.`,
    },
  ];
  if (g.reprise) {
    faq.push({
      question: `Combien de temps pour qu’une bouture de ${nom} reprenne ?`,
      reponse: g.reprise,
    });
  }
  return faq;
}
