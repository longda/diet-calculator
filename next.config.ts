import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Optimized for production deployments
  poweredByHeader: false, // Remove X-Powered-By header for security
  reactStrictMode: true, // Enable React strict mode
  compress: true, // Enable compression
};

export default nextConfig;
