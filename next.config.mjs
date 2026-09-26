/** @type {import('next').NextConfig} */
const nextConfig = {
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
