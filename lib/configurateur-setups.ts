// lib/configurateur-setups.ts
// Modèles de « setups prêts à l'emploi ». Chaque modèle correspond à un choix de
// l'utilisateur dans le simulateur (type de bac, volume, ce qu'il veut voir dans son
// bac) : on ne propose donc que des setups qui répondent à SES réponses. Un modèle
// donne plusieurs variantes en faisant tourner les espèces candidates de chaque
// emplacement (voir construirePresets).
import type { TypeBac, VolumeBac } from './configurateur';

export interface Slot {
  role:      string;
  candidats: string[];
  /** L'emplacement doit être rempli, sinon le modèle est ignoré. */
  requis?:   boolean;
  /** L'espèce retenue apparaît dans le titre du setup. */
  nom?:      boolean;
  /** Candidats = plantes de bassin disponibles (liste dynamique). */
  plantesBassin?: boolean;
}

export interface ModeleSetup {
  id:       string;
  /** Début du titre ; les espèces « nom » le complètent (« Communauté colorée : Guppy et Tétra néon »). */
  base:     string;
  desc:     string;
  types:    TypeBac[];
  /** Réponses « ce que je veux voir dans mon bac » auxquelles ce modèle répond. */
  styles:   string[];
  /** Volumes pour lesquels le modèle a du sens (tous si absent). */
  volumes?: VolumeBac[];
  slots:    Slot[];
  /** Ajoute une plante d'arrière-plan, de plan moyen et d'avant-plan (eau douce plantée). */
  plantes?: boolean;
}

const DOUCE: TypeBac[] = ['douce-plante', 'douce-biotope'];

export const MODELES: ModeleSetup[] = [
  // ─ Eau douce : paysage planté ─
  {
    id: 'plante-nano', base: 'Paysage planté',
    desc: 'Pour un petit bac très végétalisé : un mini-banc discret, un poisson de surface et des crevettes.',
    types: ['douce-plante'], styles: ['plantes-dense'], volumes: ['nano', 'moyen'], plantes: true,
    slots: [
      { role: 'Surface', candidats: ['combattant-betta', 'gourami-nain', 'endler'] },
      { role: 'Milieu', nom: true, requis: true, candidats: ['rasbora-arlequin', 'tetra-rouge-minor', 'barbus-cerise', 'tetra-glowlight', 'rasbora-tete-de-cuivre', 'tetra-neon'] },
      { role: 'Fond', candidats: ['corydoras-pygmee', 'otocinclus', 'loche-kuhli'] },
      { role: 'Invertébré', nom: true, candidats: ['crevette-red-cherry', 'crevette-amano', 'crevette-blue-dream', 'neritine'] },
    ],
  },
  {
    id: 'plante-jungle', base: 'Jungle plantée',
    desc: 'Un grand bac dense : gourami en surface, banc de tétras au milieu et nettoyeurs au sol.',
    types: ['douce-plante'], styles: ['plantes-dense'], volumes: ['moyen', 'grand', 'tres-grand'], plantes: true,
    slots: [
      { role: 'Surface', nom: true, candidats: ['gourami-nain', 'gourami-miel', 'gourami-perle'] },
      { role: 'Milieu', nom: true, requis: true, candidats: ['tetra-cardinal', 'tetra-citron', 'rasbora-arlequin', 'tetra-empereur', 'poisson-hachette'] },
      { role: 'Fond', candidats: ['corydoras-de-sterba', 'corydoras-bronze', 'loche-kuhli', 'otocinclus'] },
      { role: 'Invertébré', candidats: ['crevette-amano', 'neritine'] },
    ],
  },
  // ─ Eau douce : biotope Amazonie ─
  {
    id: 'amazonie-banc', base: 'Amazonie',
    desc: "Un banc de tétras sud-américains, des corydoras au sol et un poisson-hachette en surface, dans un décor de racines.",
    types: ['douce-biotope'], styles: ['amazonie'],
    slots: [
      { role: 'Surface', candidats: ['poisson-hachette'] },
      { role: 'Milieu', nom: true, requis: true, candidats: ['tetra-cardinal', 'tetra-neon', 'tetra-rouge-minor', 'tetra-citron', 'tetra-glowlight', 'tetra-empereur'] },
      { role: 'Fond', nom: true, candidats: ['corydoras-pygmee', 'corydoras-de-sterba', 'corydoras-bronze', 'otocinclus', 'poisson-chat-corydoras-venezuela'] },
      { role: 'Invertébré', candidats: ['neritine'] },
    ],
  },
  {
    id: 'amazonie-cichlides', base: 'Amazonie',
    desc: 'Un couple de petits cichlidés en vedette, entouré de tétras et de corydoras : un bac vivant et coloré.',
    types: ['douce-biotope'], styles: ['amazonie'], volumes: ['moyen', 'grand', 'tres-grand'],
    slots: [
      { role: 'Milieu', nom: true, requis: true, candidats: ['apistogramma-cacatuoides', 'apistogramma-viejita', 'ram-papiliochromis', 'scalaire'] },
      { role: 'Milieu', candidats: ['tetra-cardinal', 'tetra-citron', 'tetra-rouge-minor', 'tetra-neon'] },
      { role: 'Fond', candidats: ['corydoras-de-sterba', 'corydoras-bronze', 'otocinclus'] },
      { role: 'Surface', candidats: ['poisson-hachette'] },
    ],
  },
  // ─ Eau douce : poissons colorés ─
  {
    id: 'colore-classique', base: 'Communauté colorée',
    desc: 'Le grand classique : des vivipares vifs en surface, un banc brillant au milieu et des corydoras au sol.',
    types: DOUCE, styles: ['colorés'], plantes: true,
    slots: [
      { role: 'Surface', nom: true, candidats: ['guppy', 'endler', 'platy', 'xipho-porte-epee'] },
      { role: 'Milieu', nom: true, requis: true, candidats: ['tetra-neon', 'tetra-glowlight', 'rasbora-tete-de-cuivre', 'barbus-cerise', 'tetra-rouge-minor', 'rasbora-arlequin', 'danio-leopard', 'tetra-a-queue-rouge'] },
      { role: 'Fond', candidats: ['corydoras-bronze', 'corydoras-de-sterba', 'corydoras-pygmee', 'otocinclus'] },
      { role: 'Invertébré', candidats: ['crevette-red-cherry', 'neritine', 'escargot-mystere'] },
    ],
  },
  {
    id: 'colore-grand', base: 'Grand banc coloré',
    desc: 'Pour un bac plus grand : des bancs plus fournis, un gourami ou un vivipare en surface et des nettoyeurs.',
    types: DOUCE, styles: ['colorés'], volumes: ['moyen', 'grand', 'tres-grand'], plantes: true,
    slots: [
      { role: 'Surface', nom: true, candidats: ['platy', 'xipho-porte-epee', 'gourami-perle', 'molly-voile-noir'] },
      { role: 'Milieu', nom: true, requis: true, candidats: ['tetra-empereur', 'tetra-citron', 'barbus-de-sumatra', 'danio-zebre', 'barbus-rose', 'tetra-rouge-du-congo'] },
      { role: 'Milieu', candidats: ['rasbora-arlequin', 'tetra-glowlight', 'poisson-arc-en-ciel'] },
      { role: 'Fond', candidats: ['corydoras-bronze', 'ancistrus-plecos-commun', 'loche-kuhli'] },
    ],
  },
  // ─ Eau douce : poissons majestueux ─
  {
    id: 'majestueux-cichlides', base: 'Vedette',
    desc: 'Un poisson à belle allure, des compagnons paisibles trop grands pour être mangés et des nettoyeurs.',
    types: DOUCE, styles: ['majestueux'], volumes: ['moyen', 'grand', 'tres-grand'], plantes: true,
    slots: [
      { role: 'Milieu', nom: true, requis: true, candidats: ['scalaire', 'apistogramma-cacatuoides', 'ram-papiliochromis', 'kribensis', 'poisson-arc-en-ciel'] },
      { role: 'Surface', candidats: ['gourami-perle', 'gourami-miel', 'poisson-hachette'] },
      { role: 'Milieu', candidats: ['tetra-citron', 'tetra-empereur', 'tetra-rouge-du-congo', 'tetra-cardinal'] },
      { role: 'Fond', candidats: ['corydoras-de-sterba', 'ancistrus-plecos-commun', 'bristlenose-ancistrus-nain'] },
      { role: 'Invertébré', candidats: ['neritine'] },
    ],
  },
  {
    id: 'majestueux-gouramis', base: 'Gouramis élégants',
    desc: 'Des gouramis calmes et colorés avec des poissons de taille moyenne et des nettoyeurs.',
    types: DOUCE, styles: ['majestueux'], volumes: ['moyen', 'grand', 'tres-grand'], plantes: true,
    slots: [
      { role: 'Surface', nom: true, requis: true, candidats: ['gourami-perle', 'gourami-miel', 'gourami-dore'] },
      { role: 'Milieu', nom: true, candidats: ['barbus-de-sumatra', 'poisson-arc-en-ciel', 'tetra-empereur', 'tetra-citron'] },
      { role: 'Fond', candidats: ['corydoras-bronze', 'loche-kuhli', 'ancistrus-plecos-commun'] },
      { role: 'Invertébré', candidats: ['neritine'] },
    ],
  },
  {
    id: 'majestueux-afrique', base: "Cichlidés d'Afrique",
    desc: "Des cichlidés des grands lacs africains, colorés et actifs, pour un bac de belle taille à l'eau dure.",
    types: ['douce-biotope'], styles: ['majestueux'], volumes: ['grand', 'tres-grand'],
    slots: [
      { role: 'Milieu', nom: true, requis: true, candidats: ['cichlide-paon-aulonocara', 'cichlide-zebre-du-malawi', 'cichlide-frontosa-tanganyika'] },
      { role: 'Milieu', nom: true, candidats: ['cichlide-zebre-du-malawi', 'cichlide-paon-aulonocara'] },
      { role: 'Fond', candidats: ['poisson-chat-synodontis'] },
    ],
  },
  {
    id: 'majestueux-nano', base: 'Le roi du petit bac',
    desc: 'Un poisson à belle allure pour un petit volume : un combattant ou un gourami nain, avec des nettoyeurs discrets.',
    types: DOUCE, styles: ['majestueux'], volumes: ['nano'], plantes: true,
    slots: [
      { role: 'Surface', nom: true, requis: true, candidats: ['combattant-betta', 'gourami-nain', 'gourami-miel'] },
      { role: 'Fond', nom: true, candidats: ['corydoras-pygmee', 'otocinclus', 'loche-kuhli'] },
      { role: 'Invertébré', candidats: ['neritine', 'escargot-mystere'] },
      { role: 'Milieu', candidats: ['rasbora-arlequin', 'tetra-rouge-minor'] },
    ],
  },
  // ─ Eau douce : univers d'invertébrés ─
  {
    id: 'crevettes', base: 'Univers de crevettes',
    desc: 'Des crevettes en vedette, des escargots utiles et quelques poissons très discrets.',
    types: DOUCE, styles: ['crevettes'], plantes: true,
    slots: [
      { role: 'Invertébré', nom: true, requis: true, candidats: ['crevette-red-cherry', 'crevette-blue-dream', 'crevette-fantome', 'crevette-amano', 'crevette-crystal-red', 'crevette-tigre'] },
      { role: 'Invertébré', nom: true, candidats: ['neritine', 'escargot-tylomelania', 'planorbe-rouge', 'escargot-trompette-de-malaisie', 'escargot-mystere'] },
      { role: 'Fond', candidats: ['otocinclus', 'corydoras-pygmee'] },
      { role: 'Milieu', candidats: ['rasbora-arlequin', 'tetra-rouge-minor', 'tetra-glowlight'] },
    ],
  },

  // ─ Marin : surtout des poissons ─
  {
    id: 'marin-poissons-nano', base: 'Nano-récif de poissons',
    desc: 'Pour un petit bac : un gobie ou une blennie, des crevettes utiles et un ou deux coraux faciles.',
    types: ['marin'], styles: ['reef-poissons'], volumes: ['nano'],
    slots: [
      { role: 'Milieu', nom: true, requis: true, candidats: ['gobie-neon', 'gobie-clown', 'blennie-bicolore', 'gobie-a-longs-filaments', 'demoiselle-azur'] },
      { role: 'Fond', nom: true, candidats: ['blennie-bicolore', 'gobie-a-longs-filaments', 'gobie-neon'] },
      { role: 'Invertébré', candidats: ['crevette-sexy', 'crevette-menthe', 'escargot-trochus', 'bernard-l-ermite-a-pattes-bleues'] },
      { role: 'Corail', candidats: ['corallimorphe-champignon', 'xenia', 'clavularia'] },
    ],
  },
  {
    id: 'marin-poissons', base: 'Récif de poissons',
    desc: 'Un poisson-clown ou un cardinal en vedette, un gobie au sol, des invertébrés utiles et des coraux mous faciles.',
    types: ['marin'], styles: ['reef-poissons'], volumes: ['moyen', 'grand', 'tres-grand'],
    slots: [
      { role: 'Milieu', nom: true, requis: true, candidats: ['poisson-clown-ocellaris', 'poisson-clown-tomate', 'poisson-clown-skunk', 'poisson-clown-de-clark', 'poisson-clown-percula', 'cardinalis-de-banggai', 'gramma-royal'] },
      { role: 'Milieu', nom: true, candidats: ['gramma-royal', 'cardinalis-de-banggai', 'cardinal-pyjama', 'pseudochromis-de-fridman', 'demoiselle-azur'] },
      { role: 'Fond', candidats: ['gobie-neon', 'blennie-bicolore', 'labre-a-six-lignes', 'gobie-a-longs-filaments'] },
      { role: 'Invertébré', candidats: ['crevette-nettoyeuse', 'escargot-turbo', 'bernard-l-ermite-marin', 'crabe-porcelaine'] },
      { role: 'Corail', candidats: ['zoanthaire', 'corail-cuir-sinularia', 'corail-mou-genre-sarcophyton', 'xenia'] },
    ],
  },
  // ─ Marin : coraux mous et anémones ─
  {
    id: 'marin-mous', base: 'Récif de coraux mous',
    desc: 'Des coraux mous colorés et faciles, quelques poissons calmes et des invertébrés pour garder le bac propre.',
    types: ['marin'], styles: ['reef-coraux-mous'],
    slots: [
      { role: 'Corail', nom: true, requis: true, candidats: ['zoanthaire', 'corail-cuir-sinularia', 'corail-mou-genre-sarcophyton', 'xenia', 'clavularia', 'corail-kenya', 'lobophytum', 'etoile-verte', 'corallimorphe-champignon'] },
      { role: 'Corail', nom: true, candidats: ['corallimorphe-champignon', 'xenia', 'clavularia', 'zoanthaire', 'corail-kenya', 'etoile-verte'] },
      { role: 'Milieu', candidats: ['gramma-royal', 'cardinalis-de-banggai', 'gobie-clown', 'gobie-neon'] },
      { role: 'Invertébré', candidats: ['crevette-nettoyeuse', 'escargot-turbo', 'bernard-l-ermite-marin', 'crevette-menthe', 'escargot-trochus'] },
    ],
  },
  // ─ Marin : coraux durs ─
  {
    id: 'marin-lps', base: 'Récif LPS',
    desc: 'Des coraux durs à gros polypes, spectaculaires mais accessibles, avec des poissons calmes.',
    types: ['marin'], styles: ['reef-coraux-durs'], volumes: ['moyen', 'grand', 'tres-grand'],
    slots: [
      { role: 'Corail', nom: true, requis: true, candidats: ['corail-torche', 'corail-frogspawn', 'acanthastrea', 'lobophyllia', 'blastomussa', 'corail-trompette', 'favia', 'corail-cerveau-ouvert', 'corail-duncan'] },
      { role: 'Corail', nom: true, candidats: ['blastomussa', 'acanthastrea', 'corail-trompette', 'favia', 'corail-duncan', 'lobophyllia'] },
      { role: 'Milieu', candidats: ['gramma-royal', 'cardinalis-de-banggai', 'cardinal-pyjama'] },
      { role: 'Fond', candidats: ['gobie-neon', 'labre-a-six-lignes', 'blennie-bicolore'] },
      { role: 'Invertébré', candidats: ['crevette-nettoyeuse', 'etoile-fromia', 'crabe-emeraude', 'escargot-turbo'] },
    ],
  },
  {
    id: 'marin-sps', base: 'Récif SPS',
    desc: 'Des coraux durs à petits polypes (acropores, montiporas) avec des poissons discrets.',
    types: ['marin'], styles: ['reef-coraux-durs'], volumes: ['moyen', 'grand', 'tres-grand'],
    slots: [
      { role: 'Corail', nom: true, requis: true, candidats: ['montipora-digite', 'stylophora', 'pocillopora', 'corail-a-epingles', 'corail-plaque', 'acropora-millepora'] },
      { role: 'Corail', nom: true, candidats: ['pocillopora', 'stylophora', 'corail-a-epingles', 'montipora-digite'] },
      { role: 'Milieu', candidats: ['gramma-royal', 'labre-fee-de-scott'] },
      { role: 'Fond', candidats: ['gobie-neon', 'blennie-bicolore'] },
      { role: 'Invertébré', candidats: ['crevette-nettoyeuse', 'crabe-emeraude'] },
    ],
  },
  // ─ Marin : crevettes et invertébrés ─
  {
    id: 'marin-inverts', base: "Récif d'invertébrés",
    desc: "Des crevettes, des escargots et des crabes utiles à l'équilibre du bac, avec un poisson calme et un corail facile.",
    types: ['marin'], styles: ['reef-invertebres'],
    slots: [
      { role: 'Invertébré', nom: true, requis: true, candidats: ['crevette-nettoyeuse', 'crevette-pistolet', 'crabe-porcelaine', 'crevette-sexy', 'crevette-menthe', 'crevette-de-feu', 'crevette-bandee', 'etoile-fromia', 'oursin-tuxedo'] },
      { role: 'Invertébré', nom: true, candidats: ['escargot-turbo', 'escargot-trochus', 'escargot-cerith', 'bernard-l-ermite-marin', 'escargot-nassarius', 'crabe-emeraude'] },
      { role: 'Fond', candidats: ['gobie-neon', 'blennie-bicolore'] },
      { role: 'Corail', candidats: ['zoanthaire', 'corallimorphe-champignon', 'xenia'] },
    ],
  },
  // ─ Marin : macroalgues ─
  {
    id: 'marin-algues', base: 'Bac à macroalgues',
    desc: 'Des macroalgues qui stabilisent l’eau, quelques poissons calmes et des brouteurs pour entretenir le bac.',
    types: ['marin'], styles: ['reef-algues'],
    slots: [
      { role: 'Macroalgue', nom: true, requis: true, candidats: ['chaetomorpha', 'caulerpa-prolifera', 'gracilaria', 'laitue-de-mer', 'halimeda', 'caulerpa-brachypus'] },
      { role: 'Macroalgue', nom: true, candidats: ['gracilaria', 'laitue-de-mer', 'caulerpa-prolifera', 'chaetomorpha', 'halimeda'] },
      { role: 'Milieu', candidats: ['gramma-royal', 'cardinalis-de-banggai', 'gobie-clown'] },
      { role: 'Fond', candidats: ['blennie-bicolore', 'gobie-neon'] },
      { role: 'Invertébré', candidats: ['escargot-turbo', 'bernard-l-ermite-marin', 'crevette-menthe', 'escargot-trochus'] },
    ],
  },
  // ─ Bassin ─
  {
    id: 'bassin-koi', base: 'Bassin koï',
    desc: "Des koïs en vedette, accompagnés de poissons rouges ou d'ides et d'une tanche au fond.",
    types: ['bassin'], styles: ['koi'],
    slots: [
      { role: 'Milieu', nom: true, requis: true, candidats: ['carpe-koi'] },
      { role: 'Surface', nom: true, candidats: ['poisson-rouge-carassin-dore', 'ide-melanote'] },
      { role: 'Fond', candidats: ['tanche'] },
      { role: 'Plante', plantesBassin: true, candidats: [] },
    ],
  },
  {
    id: 'bassin-rouges', base: 'Bassin de poissons rouges',
    desc: 'Des poissons rouges robustes en surface, un compagnon de milieu et une tanche pour nettoyer le fond.',
    types: ['bassin'], styles: ['poissons-rouge'],
    slots: [
      { role: 'Surface', requis: true, candidats: ['poisson-rouge-carassin-dore'] },
      { role: 'Milieu', nom: true, candidats: ['ide-melanote', 'vairon', 'perche-soleil-naine-decorative'] },
      { role: 'Fond', candidats: ['tanche'] },
      { role: 'Plante', plantesBassin: true, candidats: [] },
    ],
  },
  {
    id: 'bassin-vegetal', base: 'Bassin végétal',
    desc: "Un bassin où les plantes dominent : nénuphars, plantes de berge et quelques poissons rouges pour l'animation.",
    types: ['bassin'], styles: ['plantes-bassin'],
    slots: [
      { role: 'Plante', nom: true, requis: true, plantesBassin: true, candidats: [] },
      { role: 'Plante', nom: true, plantesBassin: true, candidats: [] },
      { role: 'Surface', candidats: ['poisson-rouge-carassin-dore', 'vairon'] },
      { role: 'Fond', candidats: ['tanche'] },
    ],
  },
  {
    id: 'bassin-nature', base: 'Bassin nature',
    desc: 'Une faune locale et discrète : vairons, perche-soleil naine et tanche, avec des plantes de bassin.',
    types: ['bassin'], styles: ['faune-locale'],
    slots: [
      { role: 'Surface', nom: true, requis: true, candidats: ['vairon'] },
      { role: 'Milieu', nom: true, candidats: ['perche-soleil-naine-decorative', 'ide-melanote'] },
      { role: 'Fond', candidats: ['tanche'] },
      { role: 'Plante', plantesBassin: true, candidats: [] },
    ],
  },
];
