/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const isGithubActions = Boolean(process.env.GITHUB_ACTIONS);
let repo = "/bethel-ministry";
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  repo = `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : (isProd ? repo : "");

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
