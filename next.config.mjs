// File: next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    serverExternalPackages: ['sequelize', 'mariadb'],
  },
};
export default nextConfig;