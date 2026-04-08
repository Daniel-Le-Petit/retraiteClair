export function CtaBanner() {
  return (
    <section className="print-hidden border-b border-green-200/80 bg-green-100/80 py-14 sm:px-6">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-serif text-2xl text-green-900 sm:text-3xl">
          Prêt à simuler votre transition ?
        </h2>
        <a
          href="#simulator"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
          Lancer le simulateur →
        </a>
        <p className="mt-4 text-xs text-neutral-600">
          Gratuit · Sans inscription · Basé sur la réglementation 2025
        </p>
      </div>
    </section>
  );
}
