/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Photos d'annonces hébergées sur le storage Supabase — nécessaire pour
    // utiliser next/image dessus sans le désactiver globalement.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iwnbybohssaqfvhtbhza.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
