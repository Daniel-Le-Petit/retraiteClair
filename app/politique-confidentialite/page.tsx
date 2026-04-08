import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité — RetraiteClair",
  description: "Politique de confidentialité du site RetraiteClair.",
};

export default function PolitiqueConfidentialitePage() {
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
      <h1 className="mt-8 font-serif text-3xl text-neutral-900">
        Politique de confidentialité
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-neutral-600">
        <p>
          <strong className="text-neutral-900">Données saisies.</strong> Les
          simulations sont réalisées dans votre navigateur. Nous ne stockons pas
          vos revenus ni votre situation personnelle sur nos serveurs dans la
          version standard de l’outil.
        </p>
        <p>
          <strong className="text-neutral-900">Cookies.</strong> Une préférence
          peut être mémorisée localement pour enregistrer votre choix concernant
          les cookies. Vous pouvez la modifier en effaçant les données du site
          depuis votre navigateur.
        </p>
        <p>
          <strong className="text-neutral-900">Analytics.</strong> Aucun traceur
          tiers n’est chargé sans votre accord explicite.
        </p>
        <p>
          <strong className="text-neutral-900">Contact.</strong> Pour toute
          question relative à vos données, utilisez les coordonnées indiquées sur
          la page Contact.
        </p>
      </div>
      </div>
      <Footer />
    </>
  );
}
