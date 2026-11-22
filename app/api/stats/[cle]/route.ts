import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { ENTETES_CACHE_LECTURE } from '@/lib/cache-api';
import { nePasCompter } from '@/lib/anti-abus';

// Seuls ces compteurs existent : toute autre clé est refusée (sinon n'importe qui pourrait créer des lignes).
const CLES_AUTORISEES = new Set(['configurateur_utilisations']);

// POST /api/stats/[cle] — incrémente et retourne le nouveau total
export async function POST(
  req: Request,
  { params }: { params: { cle: string } },
) {
  if (!CLES_AUTORISEES.has(params.cle)) return NextResponse.json({ valeur: 0 }, { status: 404 });
  // Une seule utilisation comptée par visiteur et par jour ; les robots ne comptent pas.
  if (nePasCompter(req, `stats:${params.cle}`)) {
    return NextResponse.json({ valeur: await lireTotal(params.cle) });
  }
  const { data, error } = await supabase.rpc('increment_stat', {
    p_cle: params.cle,
  });
  if (error) return NextResponse.json({ valeur: 0 });
  return NextResponse.json({ valeur: data as number });
}

// GET /api/stats/[cle] — lecture seule
export async function GET(
  _req: Request,
  { params }: { params: { cle: string } },
) {
  if (!CLES_AUTORISEES.has(params.cle)) return NextResponse.json({ valeur: 0 }, { status: 404 });
  return NextResponse.json(
    { valeur: await lireTotal(params.cle) },
    { headers: ENTETES_CACHE_LECTURE },
  );
}

async function lireTotal(cle: string): Promise<number> {
  const { data } = await supabase
    .from('stats_globales')
    .select('valeur')
    .eq('cle', cle)
    .single();
  return (data as { valeur: number } | null)?.valeur ?? 0;
}
