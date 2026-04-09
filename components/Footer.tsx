import Link from "next/link";

export function Footer() {
  return (
    <footer className="print-hidden border-t border-green-800/50 bg-green-900 py-12 text-green-50 sm:px-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="flex items-center gap-2 font-serif text-lg text-white">
              <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden />
              RetraiteClair
            </p>
            <p className="mt-2 text-sm text-green-100/90">
              Simulateur de retraite progressive gratuit
            </p>
          </div>
          <nav
            className="flex flex-col gap-3 text-sm text-green-100/90 sm:flex-row sm:gap-6"
            aria-label="Liens de pied de page"
          >
            <Link className="hover:text-white underline-offset-4 hover:underline" href="/mentions-legales">
              Mentions légales
            </Link>
            <Link className="hover:text-white underline-offset-4 hover:underline" href="/politique-confidentialite">
              Politique de confidentialité
            </Link>
            <Link className="hover:text-white underline-offset-4 hover:underline" href="/contact">
              Contact
            </Link>
            <Link className="hover:text-white underline-offset-4 hover:underline" href="/admin">
              Admin
            </Link>
          </nav>
        </div>
        <p className="mt-8 max-w-3xl text-xs text-green-100/80">
          Les résultats sont des estimations indicatives. Consultez votre caisse de
          retraite pour une évaluation officielle.
        </p>
        <p className="mt-4 text-xs text-green-200/80">
          © 2025 RetraiteClair
        </p>
      </div>
    </footer>
  );
}
