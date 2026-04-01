/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      { hostname: 'cpur.in' },
      { hostname: 'images.unsplash.com' },
    ],
  },
  // Required: react-pdf and pdfjs-dist are ESM-only packages.
  // Without this, Turbopack cannot resolve their exports and components become undefined.
  transpilePackages: ['react-pdf', 'pdfjs-dist', 'react-pageflip'],
  experimental: {
    middlewareClientMaxBodySize: '28mb',
    serverActions: {
      bodySizeLimit: '28mb',
    },
  },
  serverExternalPackages: ['sequelize', 'mariadb'],
};

export default nextConfig;