/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mui/material'],
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
