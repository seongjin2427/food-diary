/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [`${process.env.S3_B_NAME}.s3.${process.env.S3_R}.amazonaws.com`],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
