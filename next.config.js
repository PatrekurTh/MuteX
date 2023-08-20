/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: ['picsum.photos'],
  },
};

module.exports = nextConfig;
