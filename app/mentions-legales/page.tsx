import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions légales — RetraiteClair",
  description: "Mentions légales du site RetraiteClair.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/"
        className="text-sm font-medium text-green-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
      >
        ← Retour à l’accueil
      </Link>
      <h1 className="mt-8 font-serif text-3xl text-neutral-900">Mentions légales</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-neutral-600">
        <p>
          <strong className="text-neutral-900">Éditeur.</strong> RetraiteClair —
          simulateur d’information à caractère pédagogique. Coordonnées de contact
          disponibles sur la page Contact.
        </p>
        <p>
          <strong className="text-neutral-900">Hébergement.</strong> Selon votre
          prestataire d’hébergement (à compléter avec vos informations réelles).
        </p>
        <p>
          <strong className="text-neutral-900">Propriété intellectuelle.</strong>{" "}
          Les contenus du site sont protégés. Toute reproduction non autorisée est
          interdite.
        </p>
        <p>
          <strong className="text-neutral-900">Limitation de responsabilité.</strong>{" "}
          Les simulations proposées sont indicatives et ne remplacent pas une
          décision des caisses de retraite compétentes.
        </p>
      </div>
      </div>
      <Footer />
    </>
  );
}
