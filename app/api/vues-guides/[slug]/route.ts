import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { ENTETES_CACHE_LECTURE } from '@/lib/cache-api';
import { fetchGuideParSlug } from '@/lib/guides';
import { nePasCompter } from '@/lib/anti-abus';

// POST /api/vues-guides/[slug] — compte une lecture et retourne le nouveau total.
// Seuls les guides qui existent sont comptés (pas de lignes inventées dans la base).
export async function POST(
  req: Request,
  { params }: { params: { slug: string } },
) {
  if (!fetchGuideParSlug(params.slug)) return NextResponse.json({ vues: 0 }, { status: 404 });
  // Une seule lecture comptée par visiteur, par guide et par jour ; les robots ne comptent pas.
  if (nePasCompter(req, `guides:${params.slug}`)) {
    return NextResponse.json({ vues: await lireVues(params.slug) });
  }
  const { data, error } = await supabase.rpc('increment_guide_vues', { p_slug: params.slug });
  if (error) return NextResponse.json({ vues: 0 });
  return NextResponse.json({ vues: Number(data) || 0 });
}

// GET /api/vues-guides/[slug] — lecture seule (en cache, sans réveiller la fonction à chaque visite)
export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  return NextResponse.json({ vues: await lireVues(params.slug) }, { headers: ENTETES_CACHE_LECTURE });
}

async function lireVues(slug: string): Promise<number> {
  const { data } = await supabase
    .from('guide_vues')
    .select('vues')
    .eq('slug', slug)
    .maybeSingle();
  return Number((data as { vues: number } | null)?.vues ?? 0);
}
