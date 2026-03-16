// File: next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 🔴 Ye line add karni hai
    },
  },
};
export default nextConfig;