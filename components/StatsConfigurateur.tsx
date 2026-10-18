'use client';

import { useEffect, useState } from 'react';

export default function StatsConfigurateur() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/stats/configurateur_utilisations')
      .then((r) => r.json())
      .then((d: { valeur: number }) => setCount(d.valeur))
      .catch(() => {});
  }, []);

  if (count === null || count === 0) return null;

  return (
    <p style={{ marginTop: 6, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
      🔧 Configurateur utilisé {count.toLocaleString('fr-FR')} fois
    </p>
  );
}
