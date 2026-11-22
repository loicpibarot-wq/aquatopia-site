/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ne pas annoncer « X-Powered-By: Next.js » dans les réponses (inutile, et aide les robots à cibler).
  poweredByHeader: false,
  // En-têtes de sécurité sur toutes les réponses (pages Next comprises : ceux de netlify.toml
  // ne s'appliquaient qu'aux fichiers fixes). Stockés avec la réponse en cache : aucun coût en plus.
  // CSP en « rapport seulement » : le navigateur signale sans bloquer. Après quelques jours sans
  // alerte dans la console, renommer la clé en « Content-Security-Policy ».
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://iwnbybohssaqfvhtbhza.supabase.co https://*.r2.dev https://imagedelivery.net https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com https://*.google.fr; font-src 'self' data:; connect-src 'self' https://iwnbybohssaqfvhtbhza.supabase.co https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com; frame-src 'none'; frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; manifest-src 'self'; worker-src 'self' blob:",
          },
        ],
      },
    ];
  },
  // Anciennes adresses de fiches espèces : deux doublons fusionnés et un nom
  // corrigé (le « poisson-pierre » est un autre animal ; Erpetoichthys
  // calabaricus est le poisson-roseau). Redirection permanente pour garder
  // les liens et le référencement existants.
  async redirects() {
    return [
      // Le « configurateur » a été renommé « simulateur » (nom plus parlant).
      { source: '/configurateur', destination: '/simulateur', permanent: true },
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
