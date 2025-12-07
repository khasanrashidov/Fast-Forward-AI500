import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mini-io-api.texnomart.uz',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
