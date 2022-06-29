/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  styledComponents: true,
  images: {
    domains: [
      'lh3.googleusercontent.com', 
      'blogassets.singsaver.com.sg',
      's.gravatar.com',
      'imagesvc.meredithcorp.io',
      'd1ex1xtzymn6tv.cloudfront.net'
    ]
  }
}

module.exports = nextConfig
