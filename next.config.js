/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  swcMinify: true,
  plugins: [
    '~/plugins/contentful',
    '~/plugins/prism',
  ],
}

module.exports = nextConfig;