import { createClient } from '@supabase/supabase-js';

// Clé publique (anon/publishable), la même que celle embarquée côté app
// mobile — lecture seule, la RLS de Supabase filtre déjà côté serveur ce
// que ce rôle peut voir (annonces actives et validées uniquement, voir
// lib/annonces.ts). Aucune donnée sensible ne transite par ce client.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Ne JAMAIS lever d'exception au chargement du module : ce fichier est
// importé dès la génération de app/sitemap.ts et des pages /annonce/*, y
// compris pendant `next build`. Une variable d'env absente/mal configurée
// (ex: oubliée dans Netlify) ne doit jamais faire planter tout le build —
// seuls les appels réseau échouent, et ils sont déjà gérés avec des
// try/catch côté appelant (voir lib/annonces.ts, app/sitemap.ts).
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'NEXT_PUBLIC_SUPABASE_URL et/ou NEXT_PUBLIC_SUPABASE_ANON_KEY manquantes — vérifier les variables d\'environnement Netlify.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.invalid',
  supabaseAnonKey || 'placeholder',
  { auth: { persistSession: false } }
);
