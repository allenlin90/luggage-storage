/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa');
const { i18n } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // reactStrictMode: true,
  i18n,
  images: {
    domains: ['flagcdn.com'],
  },
  publicRuntimeConfig: {
    production: process.env.NODE_ENV === 'production',
    staging: process.env.NODE_ENV === 'staging',
  },
  // pwa: {
  //   disable: process.env.NODE_ENV !== 'production',
  // },
};

// module.exports = withBundleAnalyzer(withPWA(nextConfig));
module.exports = withBundleAnalyzer(nextConfig);
