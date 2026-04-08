/** @type {import('next').NextConfig} */
const useStandalone = process.env.USE_STANDALONE === "true";
const useStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

/** Export statique (dossier `out/`) : Render Static Site, pas de `next start`.
 *  Standalone : Docker. Sinon : build classique + `next start` (Web Service). */
const output = useStandalone
  ? "standalone"
  : useStaticExport
    ? "export"
    : undefined;

/** L’optimiseur d’images Next nécessite un serveur ; obligatoire en export statique. */
const nextConfig = {
  reactStrictMode: true,
  ...(output ? { output } : {}),
  images: {
    ...(useStaticExport ? { unoptimized: true } : {}),
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
