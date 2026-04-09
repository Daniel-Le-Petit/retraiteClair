import Image from "next/image";
import { BarChart3, SlidersHorizontal, UserRound } from "lucide-react";
import { howItWorksImages } from "@/lib/imageAssets";

const steps = [
  {
    title: "Renseignez votre situation",
    description: "Âge, trimestres, salaire",
    Icon: UserRound,
  },
  {
    title: "Choisissez votre rythme",
    description: "40 % à 80 % de temps partiel",
    Icon: SlidersHorizontal,
  },
  {
    title: "Consultez vos résultats",
    description: "Revenus, pension, impact fiscal",
    Icon: BarChart3,
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="comment-ca-marche"
      className="print-hidden border-b border-green-200/70 bg-gradient-to-b from-emerald-50/80 via-green-50/60 to-amber-50/30 py-16 sm:px-6"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-serif text-3xl text-green-950 sm:text-4xl">
          Comment ça marche
        </h2>
        <p className="mt-2 max-w-2xl text-neutral-700">
          Trois étapes pour visualiser votre transition vers la retraite
          progressive.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map(({ title, description, Icon }, i) => (
            <div
              key={title}
              className="overflow-hidden rounded-xl border border-green-200/90 border-l-[4px] border-l-green-600 bg-white shadow-md shadow-green-900/10"
            >
              <div
                className="relative aspect-[16/10] w-full"
                style={{ position: "relative", aspectRatio: "16 / 10" }}
              >
                <Image
                  src={howItWorksImages[i].src}
                  alt={howItWorksImages[i].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/55 to-transparent" />
                <span className="absolute bottom-2 left-3 rounded-full bg-white/95 px-2.5 py-0.5 font-mono text-xs font-bold text-green-800 shadow">
                  {i + 1}/3
                </span>
              </div>
              <div className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-green-200 bg-green-100 text-green-800">
                  <Icon className="h-5 w-5" aria-hidden />
                  <span className="sr-only">Étape {i + 1}</span>
                </div>
                <h3 className="mt-3 font-medium text-green-950">{title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
