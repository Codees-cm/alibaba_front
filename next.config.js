/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});


const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/:slug(^[a-z][0-9]+)',
        destination: '/',
        permanent: true,
      },
    ]
  },
});

module.exports = nextConfig;