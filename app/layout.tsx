import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RetraiteClair — Simulateur de retraite progressive",
  description:
    "Calculez vos revenus, vérifiez votre éligibilité et anticipez votre transition vers la retraite progressive. Gratuit et indicatif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen font-sans text-neutral-900">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
