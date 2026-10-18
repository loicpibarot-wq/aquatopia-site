// Noms d'icônes vectorielles utilisés dans les données du site (configurateur,
// catégories…). Le rendu se fait avec <Icone nom="…" /> (components/Icone.tsx) :
// les données restent de simples chaînes, sans dépendre de React.
export type IconeNom =
  | 'filtration' | 'eclairage' | 'chauffage' | 'substrat' | 'co2' | 'eau'
  | 'osmose' | 'ecumeur' | 'brassage' | 'chimie' | 'uv' | 'plante' | 'pousse'
  | 'outil' | 'corail' | 'poisson' | 'poisson-symbole' | 'coquillage' | 'couronne'
  | 'arbre' | 'regle' | 'aide' | 'cuve' | 'mobile' | 'panier' | 'lieu' | 'patte'
  | 'minuteur' | 'euro' | 'valide' | 'alerte' | 'info' | 'tortue' | 'vagues' | 'gouttes' | 'drapeau';
