const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {

}

module.exports = {
  // trailingSlash: true,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    }
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    domains: ['d3vt78ic2w6yaz.cloudfront.net', 'www.for9a.com', "images.unsplash.com",
      "www.ida2at.com", "www.pexels.com", "images.pexels.com", "staticfor9a.s3-eu-west-1.amazonaws.com", "images.for9a.com"],
    imageSizes: [390,414,615],
    deviceSizes: [390,414,615]
  
  },
  env: {
    api: process.env.api,
    domain: process.env.domain,
    NEXT_PUBLIC_VERCEL_URL: "https://for9a-git-main-haneen-abusharar.vercel.app"

  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}
//nextConfig
