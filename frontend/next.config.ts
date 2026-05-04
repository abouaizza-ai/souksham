import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      { source: "/shipping", destination: "/policies/shipping", permanent: true },
      { source: "/returns", destination: "/policies/returns", permanent: true },
    ];
  },
};

export default nextConfig;
