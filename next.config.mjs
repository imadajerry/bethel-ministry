/** @type {import('next').NextConfig} */

// Custom domain www.bethelministrymizoram.com is served from root (no repository subpath)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
