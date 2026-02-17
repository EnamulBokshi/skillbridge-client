import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
  return [
    {
      source: "/api/:path*",
      destination: "https://skill-bridge-server-seven.vercel.app/api/:path*",
    },
  ];
}

};

export default nextConfig;
