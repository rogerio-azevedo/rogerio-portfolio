import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@assets': require('path').resolve(__dirname, 'src/assets'),
    }

    return config
  },
}

export default nextConfig
