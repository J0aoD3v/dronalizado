/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {},
  experimental: {},
};

const config = {
  ...nextConfig,
  webpack: (config: import("webpack").Configuration) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

export default config;
