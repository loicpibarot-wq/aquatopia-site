import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { ENTETES_CACHE_LECTURE } from '@/lib/cache-api';
import { fetchGuideParSlug } from '@/lib/guides';

// POST /api/vues-guides/[slug] — compte une lecture et retourne le nouveau total.
// Seuls les guides qui existent sont comptés (pas de lignes inventées dans la base).
export async function POST(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  if (!fetchGuideParSlug(params.slug)) return NextResponse.json({ vues: 0 }, { status: 404 });
  const { data, error } = await supabase.rpc('increment_guide_vues', { p_slug: params.slug });
  if (error) return NextResponse.json({ vues: 0 });
  return NextResponse.json({ vues: Number(data) || 0 });
}

// GET /api/vues-guides/[slug] — lecture seule (en cache, sans réveiller la fonction à chaque visite)
export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const { data } = await supabase
    .from('guide_vues')
    .select('vues')
    .eq('slug', params.slug)
    .maybeSingle();
  return NextResponse.json(
    { vues: Number((data as { vues: number } | null)?.vues ?? 0) },
    { headers: ENTETES_CACHE_LECTURE },
  );
}
