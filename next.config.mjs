/** @type {import('next').NextConfig} */
const useStandalone = process.env.USE_STANDALONE === "true";
const useStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

/** Sous-chemin du site (ex. `/projet` sur GitHub Pages). Laisser vide pour la racine du domaine. */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

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
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
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
