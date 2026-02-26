/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve under /gadgets subdirectory
  basePath: '/gadgets',
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
