"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const EMPLOYEUR_FAQ_INDEX = 2;

const faqs = [
  {
    q: "Qu'est-ce que la retraite progressive exactement ?",
    a: "C'est un dispositif qui permet de réduire votre temps de travail tout en touchant une partie de votre pension de retraite, sous conditions d'âge et de carrière. Votre employeur doit donner son accord. Les modalités précises peuvent varier selon votre caisse.",
  },
  {
    q: "Quelles sont les conditions d'éligibilité ?",
    a: "En pratique, il faut généralement être proche de l'âge légal de départ et avoir suffisamment de trimestres validés. Les règles exactes dépendent de votre régime (général, public, agricole, etc.). Ce simulateur donne un ordre de grandeur, pas une décision officielle.",
  },
  {
    q: "Mon employeur peut-il refuser ?",
    a: "L'accord de l'employeur est indispensable : sans validation de sa part, la retraite progressive ne peut pas être mise en place. Il est donc recommandé d'anticiper la discussion avec lui et de formaliser cet accord par un avenant au contrat de travail. L'employeur dispose d'un délai de deux mois pour répondre ; à défaut de réponse dans ce délai, son accord est réputé acquis.",
  },
  {
    q: "Est-ce que je continue à cotiser pendant la retraite progressive ?",
    a: "Oui, dans la plupart des situations vous restez salarié à temps partiel et les cotisations continuent sur la part salariale correspondante. Le détail dépend de votre convention et de votre caisse.",
  },
  {
    q: "Quelle est la différence avec la retraite à temps partiel ?",
    a: "La « retraite à temps partiel » désigne souvent une retraite calculée sur une carrière incomplète. La retraite progressive combine activité réduite et versement d'une fraction de pension : l'objectif est de lisser la transition de revenus.",
  },
  {
    q: "Les calculs de ce simulateur sont-ils officiels ?",
    a: "Non. Les montants sont des estimations pédagogiques basées sur des hypothèses simplifiées. Seule votre caisse peut confirmer vos droits, votre taux de pension et les formalités à accomplir.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    function applyHash() {
      const h = window.location.hash.replace(/^#/, "");
      if (h === "faq-employeur" || h === "employeur") {
        setOpen(EMPLOYEUR_FAQ_INDEX);
        window.setTimeout(() => {
          document.getElementById("faq-employeur")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      }
    }
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <section
      id="faq"
      className="print-hidden border-b border-green-200/60 bg-gradient-to-b from-green-100/40 via-emerald-50/50 to-white py-16 sm:px-6"
    >
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-serif text-3xl text-green-950 sm:text-4xl">
          Questions fréquentes
        </h2>
        <div className="mt-8 divide-y divide-green-100/80 overflow-hidden rounded-xl border border-green-200/90 bg-white shadow-md shadow-green-900/10">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  id={index === EMPLOYEUR_FAQ_INDEX ? "faq-employeur" : buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-medium text-green-950 hover:bg-green-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  {item.q}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-neutral-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={
                    index === EMPLOYEUR_FAQ_INDEX ? "faq-employeur" : buttonId
                  }
                  className={`overflow-hidden transition-[max-height] duration-300 ease-out ${isOpen ? "max-h-[min(48rem,90vh)]" : "max-h-0"}`}
                >
                  <p className="px-4 pb-4 text-sm leading-relaxed text-neutral-600">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
