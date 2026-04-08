/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /** Définir USE_STANDALONE=true au build Docker si vous préférez l’image minimaliste */
  ...(process.env.USE_STANDALONE === "true" ? { output: "standalone" } : {}),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
