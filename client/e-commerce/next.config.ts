import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // Add 'localhost' to allow images from this domain
  },
};

export default nextConfig;
