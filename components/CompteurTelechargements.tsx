'use client';

import { useEffect, useState } from 'react';

// Total des clics sur « Télécharger », volontairement discret : un petit chiffre pâle dans
// le pied de page, sans texte explicatif. Le survol affiche la signification.
export default function CompteurTelechargements() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/telechargements', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d: { valeur: number }) => setTotal(d.valeur))
      .catch(() => {});
  }, []);

  if (total === null || total <= 0) return null;

  return (
    <span
      title="Clics sur Télécharger"
      style={{ marginLeft: 10, fontSize: '0.68rem', opacity: 0.35, fontVariantNumeric: 'tabular-nums' }}
    >
      {total.toLocaleString('fr-FR')}
    </span>
  );
}
