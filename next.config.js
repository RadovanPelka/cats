/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.thecatapi.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.tumblr.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.theimageapi.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
