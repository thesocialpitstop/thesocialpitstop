/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: true,
  styledComponents: true,
  images: {
    domains: ['blogassets.singsaver.com.sg','s.gravatar.com']
  }
}

module.exports = nextConfig
