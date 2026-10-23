import {
  Filter, Lightbulb, Thermometer, Mountain, Wind, Droplet, Microscope, Zap, Waves,
  FlaskConical, Sun, Leaf, Sprout, Wrench, Flower2, Fish, FishSymbol, Shell, Crown,
  TreeDeciduous, Ruler, CircleHelp, Container, Smartphone, ShoppingCart, MapPin,
  PawPrint, Snail, Timer, Euro, Check, TriangleAlert, Info, Turtle, Droplets, Flag,
  type LucideIcon, type LucideProps,
} from 'lucide-react';
import { forwardRef } from 'react';
import type { IconeNom } from '@/lib/icones';

// Icône « crevette » : absente de la version de lucide-react installée, reprise
// du jeu d'icônes Lucide (licence ISC) au même format que les autres.
const Crevette = forwardRef<SVGSVGElement, LucideProps>(function Crevette(
  { size = 24, strokeWidth = 2, ...reste },
  ref,
) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...reste}
    >
      <path d="M11 12h.01" />
      <path d="M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1" />
      <path d="M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8" />
      <path d="M14 8a8.5 8.5 0 0 1 0 8" />
      <path d="M16 16c2 0 4.5-4 4-6" />
    </svg>
  );
});

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
  crevette: Crevette,
  escargot: Snail,
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
