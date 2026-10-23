'use client';

import { useEffect, useState } from 'react';
import Icone from '@/components/Icone';

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
      <Icone nom="outil" size={14} style={{ marginRight: 6, verticalAlign: '-2px' }} />Simulateur utilisé {count.toLocaleString('fr-FR')} fois
    </p>
  );
}
