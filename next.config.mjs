/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["sakshamnftdata.s3.amazonaws.com", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
