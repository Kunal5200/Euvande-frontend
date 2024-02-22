/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  images: {
    unoptimized: true,
  },
  transpilePackages: ["mui-tel-input"],
};

module.exports = nextConfig;
