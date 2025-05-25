/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  assetPrefix: undefined,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = false;
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        minimize: false,
        splitChunks: false,
        runtimeChunk: false
      };
    }
    return config;
  },
};

module.exports = nextConfig;