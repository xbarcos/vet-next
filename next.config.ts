import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "iuupi.com.br"
      },
      {
        protocol: "https",
        hostname: "cdn.dribbble.com"
      }
    ],
  },
};

module.exports = nextConfig;
