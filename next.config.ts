// next.config.js
const nextConfig = {
  images: {
    domains: ['your-cdn-domain.com'],
  },
  experimental: {
    optimizeCss: true,
    swcMinify: true,
  },
  // ...resto de configuración
}

module.exports = nextConfig;