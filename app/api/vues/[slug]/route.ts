import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST /api/vues/[slug] — incrémente et retourne le nouveau total
export async function POST(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const { data, error } = await supabase.rpc('increment_espece_vues', {
    p_slug: params.slug,
  });
  if (error) return NextResponse.json({ vues: 0 });
  return NextResponse.json({ vues: data as number });
}

// GET /api/vues/[slug] — lecture seule (sans incrément)
export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const { data } = await supabase
    .from('espece_vues')
    .select('vues')
    .eq('slug', params.slug)
    .single();
  return NextResponse.json({ vues: (data as { vues: number } | null)?.vues ?? 0 });
}
