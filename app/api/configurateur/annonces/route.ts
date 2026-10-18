import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { buildSlug } from '@/lib/annonces';

// GET /api/configurateur/annonces?noms=Nom scientifique 1,Nom scientifique 2
// Pour la page de résultats du configurateur : renvoie, pour les espèces
// conseillées, le nombre d'annonces actives et validées (même filtre que le
// reste du site public) et quelques annonces récentes à afficher.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const noms = (searchParams.get('noms') ?? '')
    .split(',')
    .map((n) => n.trim())
    .filter((n) => n.length > 0 && n.length <= 120)
    .slice(0, 12);

  const vide = { counts: {} as Record<string, number>, annonces: [] as unknown[], total: 0 };
  if (noms.length === 0) return NextResponse.json(vide);

  const { data, error } = await supabase
    .from('annonces')
    .select('id, titre, ville, prix, is_don, is_echange, photos, nom_scientifique, created_at')
    .eq('statut', 'active')
    .eq('validee', true)
    .in('nom_scientifique', noms)
    .order('created_at', { ascending: false })
    .limit(200);

  if (error || !data) return NextResponse.json(vide);

  const counts: Record<string, number> = {};
  for (const a of data) {
    if (a.nom_scientifique) counts[a.nom_scientifique] = (counts[a.nom_scientifique] ?? 0) + 1;
  }

  const annonces = data.slice(0, 6).map((a) => ({
    slug:       buildSlug({ id: a.id, titre: a.titre, ville: a.ville }),
    titre:      a.titre as string,
    ville:      a.ville as string | null,
    prix:       a.prix as number | null,
    is_don:     !!a.is_don,
    is_echange: !!a.is_echange,
    photo:      Array.isArray(a.photos) && a.photos.length > 0 ? (a.photos[0] as string) : null,
    nom_scientifique: a.nom_scientifique as string | null,
  }));

  return NextResponse.json(
    { counts, annonces, total: data.length },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } },
  );
}
