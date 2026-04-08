import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — RetraiteClair",
  description: "Contacter RetraiteClair.",
};

export default function ContactPage() {
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
      <h1 className="mt-8 font-serif text-3xl text-neutral-900">Contact</h1>
      <p className="mt-6 text-sm leading-relaxed text-neutral-600">
        Pour toute question sur l’outil ou les contenus pédagogiques, écrivez-nous
        à l’adresse indiquée sur votre site officiel (à remplacer par votre
        adresse de contact réelle).
      </p>
      <p className="mt-4">
        <a
          href="mailto:contact@retraiteclair.com"
          className="text-sm font-medium text-green-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
          contact@retraiteclair.com
        </a>
      </p>
      </div>
      <Footer />
    </>
  );
}
