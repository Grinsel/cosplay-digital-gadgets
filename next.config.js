/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server mode for Railway/Vercel hosting
  // Remove 'output: export' to enable next start
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
