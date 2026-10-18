import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST /api/stats/[cle] — incrémente et retourne le nouveau total
export async function POST(
  _req: Request,
  { params }: { params: { cle: string } },
) {
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
  const { data } = await supabase
    .from('stats_globales')
    .select('valeur')
    .eq('cle', params.cle)
    .single();
  return NextResponse.json({ valeur: (data as { valeur: number } | null)?.valeur ?? 0 });
}
