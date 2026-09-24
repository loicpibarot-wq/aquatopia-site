import { createClient } from '@supabase/supabase-js';

// Clé publique (anon/publishable), la même que celle embarquée côté app
// mobile — lecture seule, la RLS de Supabase filtre déjà côté serveur ce
// que ce rôle peut voir (annonces actives et validées uniquement, voir
// lib/annonces.ts). Aucune donnée sensible ne transite par ce client.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY doivent être définies (voir .env.example).'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});
