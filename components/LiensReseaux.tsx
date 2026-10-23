import { Facebook, Instagram } from 'lucide-react';

// Pages officielles d'Aquatopia sur les réseaux sociaux.
export const RESEAUX = [
  { nom: 'Facebook', url: 'https://www.facebook.com/share/1DmYnkCM4g/?mibextid=wwXIfr' },
  { nom: 'Instagram', url: 'https://www.instagram.com/aquatopia.app' },
  { nom: 'TikTok', url: 'https://www.tiktok.com/@aquatopia.app' },
] as const;

// Lucide n'a pas de logo TikTok : note de musique tracée dans le même style.
function IconeTikTok({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.4 2.4 2.1 4 4.5 4.2" />
    </svg>
  );
}

function IconeReseau({ nom, size }: { nom: string; size: number }) {
  if (nom === 'Facebook') return <Facebook size={size} aria-hidden="true" />;
  if (nom === 'Instagram') return <Instagram size={size} aria-hidden="true" />;
  return <IconeTikTok size={size} />;
}

// Trois boutons ronds de même taille, avec seulement le logo du réseau, qui
// ouvrent les pages officielles dans un nouvel onglet.
export default function LiensReseaux({
  taille = 'md',
  justify = 'flex-start',
  accent = false,
}: {
  taille?: 'sm' | 'md' | 'lg';
  justify?: 'flex-start' | 'center';
  // Fond turquoise léger et contour turquoise : les boutons ressortent
  // davantage sur le fond sombre.
  accent?: boolean;
}) {
  const diametre = taille === 'sm' ? 44 : taille === 'md' ? 52 : 56;
  const tailleIcone = taille === 'sm' ? 20 : taille === 'md' ? 24 : 26;
  return (
    <div style={{ display: 'flex', gap: taille === 'sm' ? 10 : 14, justifyContent: justify }}>
      {RESEAUX.map((r) => (
        <a
          key={r.nom}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
          aria-label={`Aquatopia sur ${r.nom}`}
          title={r.nom}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: diametre,
            height: diametre,
            padding: 0,
            borderRadius: '50%',
            ...(accent
              ? { background: 'rgba(47,217,190,0.14)', borderColor: 'var(--teal)', color: 'var(--teal)' }
              : {}),
          }}
        >
          <IconeReseau nom={r.nom} size={tailleIcone} />
        </a>
      ))}
    </div>
  );
}
