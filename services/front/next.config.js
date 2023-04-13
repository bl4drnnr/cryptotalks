/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'chart.googleapis.com',
      'cdn.coinranking.com',
      'mikhail-bahdashych-cryptotalks.s3.us-east-1.amazonaws.com'
    ]
  }
};

module.exports = nextConfig;
