import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { ENTETES_CACHE_LECTURE } from '@/lib/cache-api';
import { nePasCompter } from '@/lib/anti-abus';

// Compteur global des clics sur les boutons « Télécharger » du site (lien intelligent
// et badges App Store / Google Play confondus). Même mécanique que /api/stats/[cle],
// mais la clé est fixe : on ne peut pas créer d'autres compteurs par cette adresse.
const CLE = 'telechargements_clics';

// Sans cela, Next met la réponse GET en cache au build et le total resterait figé.
export const dynamic = 'force-dynamic';

// POST /api/telechargements — ajoute un clic et retourne le nouveau total
export async function POST(req: Request) {
  // Un seul clic compté par visiteur et par jour ; les robots ne comptent pas.
  if (nePasCompter(req, CLE)) return NextResponse.json({ valeur: await lireTotal() });
  const { data, error } = await supabase.rpc('increment_stat', { p_cle: CLE });
  if (error) return NextResponse.json({ valeur: 0 });
  return NextResponse.json({ valeur: data as number });
}

// GET /api/telechargements — lecture seule
export async function GET() {
  return NextResponse.json({ valeur: await lireTotal() }, { headers: ENTETES_CACHE_LECTURE });
}

async function lireTotal(): Promise<number> {
  const { data } = await supabase.from('stats_globales').select('valeur').eq('cle', CLE).single();
  return (data as { valeur: number } | null)?.valeur ?? 0;
}
