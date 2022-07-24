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
  },
  rewrites: async () => {
    return [
      {
        source: "/docs/graphql",
        destination: "/graphql/index.html",
      }
    ]
}
}

module.exports = nextConfig
