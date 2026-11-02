import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { ENTETES_CACHE_LECTURE } from '@/lib/cache-api';
import { fetchEspeceParSlug } from '@/lib/especes';

// POST /api/vues/[slug] — incrémente et retourne le nouveau total
export async function POST(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  // Seules les fiches qui existent sont comptées (pas de lignes inventées dans la base).
  if (!fetchEspeceParSlug(params.slug)) return NextResponse.json({ vues: 0 }, { status: 404 });
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
  return NextResponse.json(
    { vues: (data as { vues: number } | null)?.vues ?? 0 },
    { headers: ENTETES_CACHE_LECTURE },
  );
}
