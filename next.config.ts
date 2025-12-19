import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vstorage.vngcloud.vn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.enjoysport.asia',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.enjoysport.vn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.enjoysport.asia',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.enjoysport.vn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hcm03.vstorage.vngcloud.vn',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
