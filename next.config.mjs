/** @type {import('next').NextConfig} */
const nextConfig = {
  // Anciennes adresses de fiches espèces : deux doublons fusionnés et un nom
  // corrigé (le « poisson-pierre » est un autre animal ; Erpetoichthys
  // calabaricus est le poisson-roseau). Redirection permanente pour garder
  // les liens et le référencement existants.
  async redirects() {
    return [
      { source: '/especes/colisa-lalia-gourami-nain-multicolore', destination: '/especes/gourami-nain', permanent: true },
      { source: '/especes/poisson-clown-d-eau-douce-chromobotia', destination: '/especes/loche-clown', permanent: true },
      { source: '/especes/poisson-pierre', destination: '/especes/poisson-roseau', permanent: true },
    ];
  },
  images: {
    // Les photos d'annonces sont en réalité hébergées sur Cloudflare R2 (et
    // non sur le storage Supabase, malgré ce qu'on pensait au départ) —
    // nécessaire pour utiliser next/image dessus sans le désactiver
    // globalement. Le pattern Supabase est gardé au cas où une partie du
    // stockage y basculerait un jour.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iwnbybohssaqfvhtbhza.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-bf9510243fdb42ab97de71212dad4dc5.r2.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
