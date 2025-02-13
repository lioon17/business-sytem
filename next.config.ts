import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // ✅ Ensures routes are handled correctly
};

export default nextConfig;
