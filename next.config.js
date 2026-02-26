/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve under /gadgets subdirectory
  basePath: '/gadgets',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
