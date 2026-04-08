import Image from "next/image";
import { testimonialPortraits } from "@/lib/imageAssets";

const items = [
  {
    quote:
      "À 61 ans, j'ai pu passer à 60 % tout en gardant 80 % de mes revenus. Le simulateur m'a donné confiance pour faire le pas.",
    author: "Martine D.",
    role: "Ancienne infirmière, Lyon",
  },
  {
    quote:
      "J'ignorais totalement que j'avais droit à la retraite progressive. En 5 minutes j'avais ma réponse.",
    author: "Patrick R.",
    role: "Cadre, Bordeaux",
  },
  {
    quote:
      "Très clair et honnête sur les limites du calcul. J'ai ensuite consulté ma caisse avec les chiffres en main.",
    author: "Sylvie M.",
    role: "Enseignante, Rennes",
  },
];

export function Testimonials() {
  return (
    <section className="print-hidden border-b border-amber-200/50 bg-gradient-to-br from-amber-100/50 via-orange-50/30 to-green-100/40 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-serif text-3xl text-green-950 sm:text-4xl">
          Ils se sont projetés sereinement
        </h2>
        <p className="mt-2 text-neutral-700">
          Des parcours variés, une même envie : anticiper sereinement.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map(({ quote, author, role }, i) => (
            <blockquote
              key={author}
              className="flex flex-col overflow-hidden rounded-xl border border-green-200/90 bg-white/95 shadow-lg shadow-green-900/10"
            >
              <div className="relative h-36 w-full shrink-0" aria-hidden>
                <Image
                  src={testimonialPortraits[i].src}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-5 pt-2">
                <p className="font-serif text-lg italic leading-relaxed text-neutral-900">
                  “{quote}”
                </p>
                <footer className="mt-4 border-t border-green-100 pt-4 text-xs font-medium uppercase tracking-wide text-green-900">
                  {author}
                  <span className="mt-1 block font-sans normal-case tracking-normal text-neutral-600">
                    {role}
                  </span>
                </footer>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
