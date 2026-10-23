'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Posé par le simulateur quand on ouvre une fiche espèce : valeur = slug de la fiche.
// (document.referrer ne bouge pas lors d'une navigation interne : il ne suffit pas.)
const CLE_ORIGINE = 'aquatopia_simulateur_origine_v1';
// Posés par la liste des espèces (voir EspeceRecherche).
const CLE_LISTE = 'aquatopia_especes_liste_v1';
const CLE_RETOUR_LISTE = 'aquatopia_especes_retour_v1';

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
      const slug = window.location.pathname.split('/').filter(Boolean).pop();
      if (slug && sessionStorage.getItem(CLE_ORIGINE) === slug) {
        setDepuisSite(true);
        setDepuisConfigurateur(true);
        return;
      }
      // Arrivée depuis la liste des espèces : un vrai retour arrière.
      const liste = sessionStorage.getItem(CLE_LISTE);
      if (slug && liste && (JSON.parse(liste) as { slug?: string }).slug === slug) {
        setDepuisSite(true);
        return;
      }
    } catch { /* stockage indisponible : on passe au référent */ }
    try {
      if (!document.referrer) return;
      const ref = new URL(document.referrer);
      if (ref.origin !== window.location.origin) return;
      setDepuisSite(window.history.length > 1);
      setDepuisConfigurateur(ref.pathname.startsWith('/simulateur'));
    } catch { /* référent illisible : on garde le lien classique */ }
  }, []);

  return (
    <Link
      href={depuisConfigurateur ? '/simulateur' : href}
      className={className}
      style={style}
      onClick={(e) => {
        // Retour vers la liste des espèces : elle retrouvera filtres et position.
        if (!depuisConfigurateur && href === '/especes') {
          try { if (sessionStorage.getItem(CLE_LISTE)) sessionStorage.setItem(CLE_RETOUR_LISTE, '1'); } catch { /* ignoré */ }
        }
        if (depuisSite) { e.preventDefault(); router.back(); }
      }}
    >
      {depuisConfigurateur && texteDepuisConfigurateur ? texteDepuisConfigurateur : children}
    </Link>
  );
}
