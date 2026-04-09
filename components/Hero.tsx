import Image from "next/image";
import { heroCoupleMedallion, heroImage } from "@/lib/imageAssets";

export function Hero() {
  return (
    <section className="print-hidden relative border-b border-green-200/80 bg-green-50/50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_80%_15%,rgba(29,158,117,0.25),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_90%,rgba(250,238,218,0.5),transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-green-200/40 via-green-50/90 to-amber-100/45" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-20 sm:px-6">
        <div>
          <h1 className="font-serif text-4xl leading-tight tracking-tight text-green-950 sm:text-[52px]">
            Préparez votre retraite progressive en 2 minutes
          </h1>
          <p className="mt-4 max-w-xl text-lg text-neutral-700">
            Calculez vos revenus, vérifiez votre éligibilité et optimisez votre
            transition — gratuitement.
          </p>
          <div className="mt-6 flex flex-row flex-wrap items-center gap-3">
            <span className="inline-flex w-fit items-center rounded-full border border-green-300/80 bg-white px-3 py-1.5 text-xs font-medium text-green-900 shadow-sm">
              Basé sur la réglementation Cnav 2025
            </span>
            <span className="inline-flex w-fit items-center rounded-full border border-amber-300/80 bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-900 shadow-sm">
              Utilisé par +12 000 personnes
            </span>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#simulator"
              className="inline-flex w-fit items-center justify-center rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-green-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              Simuler maintenant →
            </a>
            <a
              href="#comment-ca-marche"
              className="rounded text-sm font-medium text-green-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              En savoir plus sur la retraite progressive ↓
            </a>
          </div>
        </div>
        <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Styles inline : si le CSS /_next/… ne charge pas, aspect-* Tailwind est absent et l’image remplit l’écran. */}
          <div
            className="relative aspect-[4/5] max-h-[min(520px,78vh)] w-full overflow-hidden rounded-2xl border-2 border-white shadow-xl shadow-green-900/15 ring-1 ring-green-200/80"
            style={{
              position: "relative",
              overflow: "hidden",
              aspectRatio: "4 / 5",
              maxHeight: "min(520px, 78vh)",
              width: "100%",
            }}
          >
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              className="object-cover object-top sm:object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/45 via-transparent to-amber-50/10" />
            {/* Médaillon : complément humain (projection de vie) */}
            <div className="absolute bottom-4 right-4 z-20 h-24 w-24 sm:bottom-5 sm:right-5 sm:h-28 sm:w-28">
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-amber-200 shadow-lg shadow-black/20 ring-2 ring-white">
                <Image
                  src={heroCoupleMedallion.src}
                  alt={heroCoupleMedallion.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 96px, 112px"
                />
              </div>
            </div>
          </div>
          <div
            className="absolute -bottom-4 -left-2 right-8 rounded-xl border border-green-100 bg-white/95 p-3 shadow-lg shadow-green-900/10 backdrop-blur-sm sm:-left-4"
            aria-hidden
          >
            <p className="font-serif text-sm text-green-900">
              Transition en toute visibilité
            </p>
            <p className="mt-0.5 text-xs text-neutral-600">
              Revenus, pension, démarches — tout sur une page
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
}
