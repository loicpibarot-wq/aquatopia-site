import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { ENTETES_CACHE_LECTURE } from '@/lib/cache-api';
import { fetchEspeceParSlug } from '@/lib/especes';
import { nePasCompter } from '@/lib/anti-abus';

// POST /api/vues/[slug] — incrémente et retourne le nouveau total
export async function POST(
  req: Request,
  { params }: { params: { slug: string } },
) {
  // Seules les fiches qui existent sont comptées (pas de lignes inventées dans la base).
  if (!fetchEspeceParSlug(params.slug)) return NextResponse.json({ vues: 0 }, { status: 404 });
  // Une seule vue comptée par visiteur, par fiche et par jour ; les robots ne comptent pas.
  if (nePasCompter(req, `vues:${params.slug}`)) {
    return NextResponse.json({ vues: await lireVues(params.slug) });
  }
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
  // Slug inconnu : réponse immédiate, sans lecture en base (évite des appels inutiles).
  if (!fetchEspeceParSlug(params.slug)) return NextResponse.json({ vues: 0 }, { status: 404 });
  return NextResponse.json({ vues: await lireVues(params.slug) }, { headers: ENTETES_CACHE_LECTURE });
}

async function lireVues(slug: string): Promise<number> {
  const { data } = await supabase
    .from('espece_vues')
    .select('vues')
    .eq('slug', slug)
    .single();
  return (data as { vues: number } | null)?.vues ?? 0;
}
