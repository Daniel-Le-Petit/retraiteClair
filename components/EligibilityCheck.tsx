"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { getEligibility } from "@/lib/pension";

export function EligibilityCheck() {
  const [age, setAge] = useState<number | "">("");
  const [trimestres, setTrimestres] = useState<number | "">("");

  const status = useMemo(() => {
    if (age === "" || trimestres === "") return null;
    const a = Number(age);
    const t = Number(trimestres);
    if (Number.isNaN(a) || Number.isNaN(t)) return null;
    return getEligibility(a, t);
  }, [age, trimestres]);

  return (
    <section className="print-hidden border-b border-green-200/60 bg-gradient-to-br from-teal-50/80 via-amber-50/40 to-emerald-50/70 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 overflow-hidden rounded-xl border border-green-200/80 shadow-md shadow-green-900/10">
          <Image
            src="/images/illustration-transition.svg"
            alt=""
            width={800}
            height={240}
            className="h-16 w-full object-cover object-center sm:h-20"
          />
        </div>
        <h2 className="font-serif text-2xl text-green-950 sm:text-3xl">
          Éligibilité — premier repère
        </h2>
        <p className="mt-2 text-neutral-700">
          Répondez à deux questions pour un indicateur rapide (non contractuel).
        </p>
        <form
          className="mt-8 grid gap-6 sm:grid-cols-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="rounded-lg border border-green-100/80 bg-white/90 p-4 shadow-sm shadow-green-900/5">
            <label
              htmlFor="elig-age"
              className="text-sm font-medium text-neutral-900"
            >
              Quel est votre âge ?
            </label>
            <input
              id="elig-age"
              type="number"
              inputMode="numeric"
              min={50}
              max={75}
              value={age === "" ? "" : age}
              onChange={(e) => {
                const v = e.target.value;
                setAge(v === "" ? "" : Number(v));
              }}
              className="mt-2 w-full rounded-md border-[0.5px] border-neutral-200 bg-white px-3 py-2 text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            />
          </div>
          <div className="rounded-lg border border-green-100/80 bg-white/90 p-4 shadow-sm shadow-green-900/5">
            <label
              htmlFor="elig-trim"
              className="text-sm font-medium text-neutral-900"
            >
              Combien de trimestres avez-vous validés ?
            </label>
            <input
              id="elig-trim"
              type="number"
              inputMode="numeric"
              min={0}
              max={200}
              value={trimestres === "" ? "" : trimestres}
              onChange={(e) => {
                const v = e.target.value;
                setTrimestres(v === "" ? "" : Number(v));
              }}
              className="mt-2 w-full rounded-md border-[0.5px] border-neutral-200 bg-white px-3 py-2 text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            />
          </div>
        </form>
        {status && (
          <div className="mt-6" role="status" aria-live="polite">
            {status === "eligible" && (
              <div className="flex items-start gap-3 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-900">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                <span>
                  Vous semblez éligible à la retraite progressive
                </span>
              </div>
            )}
            {status === "maybe" && (
              <div className="flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-100 px-4 py-3 text-sm text-amber-700">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  Votre éligibilité dépend de votre caisse de retraite —
                  simulez quand même
                </span>
              </div>
            )}
            {status === "not_eligible" && (
              <div className="flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-900">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />
                <span>
                  Vous ne remplissez pas encore les conditions minimales
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
