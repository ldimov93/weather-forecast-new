/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    openWeatherKey: '',
  },
  images: {
    domains: ['openweathermap.org'],
  },
}

module.exports = nextConfig
