import type { NextConfig } from "next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*", // フロントエンドからのアクセスパス
        destination: `${API_BASE_URL}/:path*`, // 実際のAPIのURL
      },
    ];
  },
};

export default nextConfig;
