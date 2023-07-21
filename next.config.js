/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.tse.jus.br',
        port: '',
        pathname: '/hotsites/simulador-de-votacao/image/figuras/**',
      },
    ],
  },
}

module.exports = nextConfig
