/** @type {import('next').NextConfig} */
const nextConfig = {
  
  // images: {
  //   domains: ['d3vt78ic2w6yaz.cloudfront.net'],
  // },
}

module.exports = {
 
  images: {
    domains: ['d3vt78ic2w6yaz.cloudfront.net', 'www.for9a.com',"images.unsplash.com" ,"www.ida2at.com" ],
  },
  env: {

    HOST:"http://localhost:3000",
    NEXT_PUBLIC_VERCEL_URL:"https://for9a-git-main-haneen-abusharar.vercel.app"
    
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
