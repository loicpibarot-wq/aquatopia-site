'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  /** Destination par défaut (accès direct, lien partagé, moteur de recherche). */
  href:        string;
  className?:  string;
  style?:      CSSProperties;
  children:    ReactNode;
  /** Remplace le texte quand on arrive depuis le configurateur. */
  texteDepuisConfigurateur?: ReactNode;
}

/**
 * Lien « retour » : si l'on arrive d'une page du site (ex : résultats du
 * configurateur), il revient réellement en arrière dans l'historique au lieu
 * d'envoyer vers la liste par défaut.
 */
export default function LienRetour({ href, className, style, children, texteDepuisConfigurateur }: Props) {
  const router = useRouter();
  const [depuisSite, setDepuisSite] = useState(false);
  const [depuisConfigurateur, setDepuisConfigurateur] = useState(false);

  useEffect(() => {
    try {
      if (!document.referrer) return;
      const ref = new URL(document.referrer);
      if (ref.origin !== window.location.origin) return;
      setDepuisSite(window.history.length > 1);
      setDepuisConfigurateur(ref.pathname.startsWith('/configurateur'));
    } catch { /* référent illisible : on garde le lien classique */ }
  }, []);

  return (
    <Link
      href={depuisConfigurateur ? '/configurateur' : href}
      className={className}
      style={style}
      onClick={(e) => {
        if (depuisSite) { e.preventDefault(); router.back(); }
      }}
    >
      {depuisConfigurateur && texteDepuisConfigurateur ? texteDepuisConfigurateur : children}
    </Link>
  );
}
