import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/shipping", destination: "/policies/shipping", permanent: true },
      { source: "/returns", destination: "/policies/returns", permanent: true },
    ];
  },
};

export default nextConfig;
