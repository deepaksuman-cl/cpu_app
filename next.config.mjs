/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      { hostname: 'cpur.in' },
      { hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  serverExternalPackages: ['sequelize', 'mariadb'],
};

export default nextConfig;