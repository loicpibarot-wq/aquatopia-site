// Bouton d'action contextuel pour les questions de FAQ et les guides :
// - sujets « que choisir / combien / quel matériel » → le simulateur ;
// - sujets reproduction, bouturage, mâle/femelle, durée de vie, espèce précise → les fiches espèces.
export type Cta = { href: string; label: string };

const normaliser = (t: string) =>
  t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’]/g, "'");

const ESPECES_MOTS = [
  'reproduc', 'se reproduisent', 'alevin', 'bebes', 'male d', 'femelle', 'boutur',
  'combien de temps vit', 'duree de vie', 'betta', 'koi', 'guppy',
];

const SIMULATEUR_MOTS = [
  'quel aquarium', 'quelle taille', 'quel volume', 'volume d\'aquarium', 'combien de litres',
  'quel poisson', 'quels poissons', 'poissons choisir', 'quelle crevette', 'quels coraux', 'quel corail',
  'combien de poissons', 'vivre ensemble', 'communautaire', 'combien coute', 'budget',
  'quel materiel', 'materiel faut-il', 'quel filtre', 'lequel choisir', 'que choisir', 'quel choix',
  'choisir son', 'bien choisir', 'puissance de chauffage', 'quel eclairage', 'quel sol', 'quel substrat',
  'pour debuter', 'pour commencer', 'par ou commencer', 'comment choisir', 'faut-il un chauffage',
  'comment installer', 'installer un aquarium', 'demarrer un aquarium', 'premier aquarium',
];

export function ctaPour(texte: string, exclure?: 'simulateur' | 'especes'): Cta | null {
  const t = normaliser(texte);
  if (exclure !== 'especes' && ESPECES_MOTS.some((m) => t.includes(m))) {
    return { href: '/especes', label: 'Voir les fiches espèces' };
  }
  if (exclure !== 'simulateur' && SIMULATEUR_MOTS.some((m) => t.includes(m))) {
    return { href: '/simulateur', label: 'Essayer le simulateur' };
  }
  return null;
}

// Encart « Aquatopia » des guides Acheter & vendre : un texte adapté au sujet, le bouton de
// téléchargement de l'application et, quand c'est utile, un lien vers les annonces du site.
// `apresSection` place l'encart juste après une section (index) ; sans lui, il ferme l'article.
export type AppelAppli = {
  titre: string;
  texte: string;
  lien?: { href: string; label: string };
  apresSection?: number;
};

const TEXTE_VENTE = "Gratuit pour les particuliers. Ajoutez vos photos, fixez votre prix et échangez avec les acheteurs par la messagerie.";
const TEXTE_ACHAT = "Téléchargez l'application pour parcourir les annonces près de chez vous, contacter les vendeurs par la messagerie et être alerté des nouveautés.";

const APPELS: Record<string, AppelAppli> = {
  'vendre-son-aquarium-occasion': { titre: 'Postez votre annonce sur Aquatopia', texte: TEXTE_VENTE, lien: { href: '/categorie/cuves', label: 'Voir les aquariums en vente' } },
  'vendre-ses-poissons-aquarium': { titre: 'Postez votre annonce sur Aquatopia', texte: "Gratuit pour les particuliers. Indiquez l'espèce, ajoutez vos photos et remettez vos poissons en main propre à un acheteur près de chez vous.", lien: { href: '/categorie/vivant', label: 'Voir les annonces de poissons' } },
  'reprise-aquarium-vendre-donner-echanger': { titre: 'Vendez, donnez ou échangez sur Aquatopia', texte: "Choisissez le type d'annonce en la publiant : c'est gratuit pour les particuliers, et l'équipe vérifie chaque annonce avant sa mise en ligne." },
  'donner-aquarium-poissons-materiel': { titre: 'Publiez votre don sur Aquatopia', texte: "Gratuit, et visible par des aquariophiles près de chez vous. L'équipe vérifie chaque annonce avant sa mise en ligne.", lien: { href: '/dons', label: 'Voir les annonces à donner' } },
  'deposer-annonce-aquariophilie-gratuite': { titre: 'Déposez votre première annonce', texte: "Installez Aquatopia sur iPhone ou Android, créez votre compte et publiez en quelques minutes. L'application est gratuite pour les particuliers.", apresSection: 0 },
  'acheter-aquarium-occasion-verifications': { titre: 'Trouvez votre aquarium sur Aquatopia', texte: TEXTE_ACHAT, lien: { href: '/categorie/cuves', label: 'Voir les aquariums en vente' } },
  'aquarium-occasion-60-100-200-litres': { titre: 'Trouvez votre aquarium sur Aquatopia', texte: TEXTE_ACHAT, lien: { href: '/categorie/cuves', label: 'Voir les aquariums en vente' } },
  'aquarium-occasion-pas-cher-ou-trouver': { titre: 'Trouvez votre aquarium sur Aquatopia', texte: TEXTE_ACHAT, lien: { href: '/categorie/cuves', label: 'Voir les aquariums en vente' } },
  'materiel-aquarium-occasion-filtre-chauffage': { titre: 'Trouvez votre matériel sur Aquatopia', texte: TEXTE_ACHAT, lien: { href: '/categorie/materiel', label: 'Voir le matériel en vente' } },
  'acheter-poissons-aquarium-particulier': { titre: 'Trouvez vos poissons sur Aquatopia', texte: TEXTE_ACHAT, lien: { href: '/categorie/vivant', label: 'Voir les poissons en vente' } },
  'bourse-aux-poissons-aquariophilie': { titre: 'Prolongez la bourse sur Aquatopia', texte: "Achetez, vendez ou échangez poissons, plantes et boutures toute l'année, gratuitement pour les particuliers.", lien: { href: '/echanges', label: 'Voir les annonces d’échange' } },
  'leboncoin-ou-site-specialise-aquariophilie': { titre: 'Publiez votre annonce sur Aquatopia', texte: "Une application dédiée à l'aquariophilie : annonces classées par catégorie, biotope et distance, vérifiées par l'équipe et gratuites pour les particuliers." },
};

export function appelAppliPour(slug: string): AppelAppli | null {
  return APPELS[slug] ?? null;
}
