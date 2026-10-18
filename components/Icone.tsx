import {
  Filter, Lightbulb, Thermometer, Mountain, Wind, Droplet, Microscope, Zap, Waves,
  FlaskConical, Sun, Leaf, Sprout, Wrench, Flower2, Fish, FishSymbol, Shell, Crown,
  TreeDeciduous, Ruler, CircleHelp, Container, Smartphone, ShoppingCart, MapPin,
  PawPrint, Timer, Euro, Check, TriangleAlert, Info, Turtle, Droplets, Flag,
  type LucideIcon,
} from 'lucide-react';
import type { IconeNom } from '@/lib/icones';

const ICONES: Record<IconeNom, LucideIcon> = {
  filtration: Filter,
  eclairage: Lightbulb,
  chauffage: Thermometer,
  substrat: Mountain,
  co2: Wind,
  eau: Droplet,
  osmose: Microscope,
  ecumeur: Zap,
  brassage: Waves,
  chimie: FlaskConical,
  uv: Sun,
  plante: Leaf,
  pousse: Sprout,
  outil: Wrench,
  corail: Flower2,
  poisson: Fish,
  'poisson-symbole': FishSymbol,
  coquillage: Shell,
  couronne: Crown,
  arbre: TreeDeciduous,
  regle: Ruler,
  aide: CircleHelp,
  cuve: Container,
  mobile: Smartphone,
  panier: ShoppingCart,
  lieu: MapPin,
  patte: PawPrint,
  minuteur: Timer,
  euro: Euro,
  valide: Check,
  alerte: TriangleAlert,
  info: Info,
  tortue: Turtle,
  vagues: Waves,
  gouttes: Droplets,
  drapeau: Flag,
};

interface Props {
  nom: IconeNom;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Icône vectorielle (trait fin, hérite de la couleur du texte). Décorative par défaut. */
export default function Icone({ nom, size = 18, strokeWidth = 1.9, className, style }: Props) {
  const Composant = ICONES[nom] ?? PawPrint;
  return (
    <Composant
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      style={{ flexShrink: 0, ...style }}
      aria-hidden="true"
      focusable="false"
    />
  );
}

/** Icône posée dans une pastille teintée (cartes de choix, lignes d'équipement). */
export function IconePastille({ nom, repete = 1, taille = 40 }: { nom: IconeNom; repete?: number; taille?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1,
        minWidth: taille, height: taille, padding: repete > 1 ? '0 8px' : 0,
        borderRadius: 12, flexShrink: 0,
        background: 'rgba(47,217,190,0.1)', border: '1px solid rgba(47,217,190,0.22)',
        color: 'var(--teal)',
      }}
    >
      {Array.from({ length: repete }).map((_, i) => (
        <Icone key={i} nom={nom} size={Math.round(taille * 0.5)} />
      ))}
    </span>
  );
}
