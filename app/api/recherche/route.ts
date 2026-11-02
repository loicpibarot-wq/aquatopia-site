import { NextResponse } from 'next/server';
import { construireIndex } from '@/lib/recherche-index';

// Index de recherche du site, généré au build : chargé par le champ de l'accueil à la première utilisation.
export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json(construireIndex(), {
    headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' },
  });
}
