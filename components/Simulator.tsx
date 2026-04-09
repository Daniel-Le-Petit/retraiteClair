"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { computeSimulatorResult } from "@/lib/pension";
import { simulatorBanner } from "@/lib/imageAssets";
import type { RegimeRetraite, TauxTempsPartiel } from "@/lib/types";
import { ResultsPanel, ResultsPanelFollowUp } from "./ResultsPanel";

const tauxOptions: { value: TauxTempsPartiel; label: string }[] = [
  { value: 0.4, label: "40 %" },
  { value: 0.6, label: "60 %" },
  { value: 0.7, label: "70 %" },
  { value: 0.8, label: "80 %" },
];

const regimeOptions: { value: RegimeRetraite; label: string }[] = [
  { value: "general", label: "Régime général" },
  { value: "fonction_publique", label: "Fonction publique" },
  { value: "msa", label: "MSA" },
  { value: "rsi", label: "RSI" },
];

const simulatorSchema = z.object({
  age: z.coerce
    .number()
    .min(55, "Entre 55 et 67 ans")
    .max(67, "Entre 55 et 67 ans"),
  trimestres: z.coerce
    .number()
    .min(0, "Entre 0 et 200")
    .max(200, "Entre 0 et 200"),
  salaireBrut: z.coerce
    .number()
    .min(800, "Entre 800 € et 15 000 €")
    .max(15000, "Entre 800 € et 15 000 €"),
  tauxTempsPartiel: z.enum(["0.4", "0.6", "0.7", "0.8"]),
  regime: z.enum(["general", "fonction_publique", "msa", "rsi"]),
});

type SimulatorForm = z.infer<typeof simulatorSchema>;

export function Simulator() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<SimulatorForm>({
    resolver: zodResolver(simulatorSchema),
    mode: "onBlur",
    defaultValues: {
      age: 60,
      trimestres: 150,
      salaireBrut: 3500,
      tauxTempsPartiel: "0.6",
      regime: "general",
    },
  });

  const values = watch();

  const parsed = useMemo(() => {
    const taux = Number(values.tauxTempsPartiel) as TauxTempsPartiel;
    const salaire = Number(values.salaireBrut);
    const trim = Number(values.trimestres);
    const age = Number(values.age);
    if (
      [salaire, trim, age, taux].some((n) => Number.isNaN(n)) ||
      values.regime === undefined
    ) {
      return null;
    }
    const safe = simulatorSchema.safeParse({
      ...values,
      age: values.age,
      trimestres: values.trimestres,
      salaireBrut: values.salaireBrut,
    });
    if (!safe.success) return null;
    return {
      age: safe.data.age,
      trimestres: safe.data.trimestres,
      salaireBrut: safe.data.salaireBrut,
      tauxTempsPartiel: taux,
      regime: safe.data.regime,
      result: computeSimulatorResult(salaire, trim, taux),
    };
  }, [values]);

  const fieldClass =
    "mt-1 w-full rounded-md border border-green-100 bg-white px-3 py-2 text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2";

  return (
    <section
      id="simulator"
      className="scroll-mt-16 border-b border-green-200/80 bg-gradient-to-b from-emerald-50/50 via-white to-amber-50/25 py-16 sm:px-6"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-serif text-3xl text-green-950 sm:text-4xl print-hidden">
          Simulateur
        </h2>
        <p className="mt-2 max-w-2xl text-neutral-700 print-hidden">
          Ajustez les champs : les résultats se mettent à jour automatiquement.
        </p>

        <div className="print-hidden relative mt-8 overflow-hidden rounded-2xl border border-green-200/90 shadow-lg shadow-green-900/10">
          <div
            className="relative aspect-[21/8] min-h-[140px] w-full sm:aspect-[24/7]"
            style={{
              position: "relative",
              aspectRatio: "21 / 8",
              minHeight: 140,
            }}
          >
            <Image
              src={simulatorBanner.src}
              alt={simulatorBanner.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-950/65 via-green-900/25 to-transparent" />
            <p className="absolute bottom-4 left-4 max-w-xs font-serif text-lg text-white drop-shadow sm:bottom-6 sm:left-6 sm:max-w-md sm:text-xl">
              Projettez vos revenus en quelques clics
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12 md:items-start">
          <form className="space-y-6" noValidate>
            <div className="rounded-lg border-[0.5px] border-neutral-200 bg-neutral-50 p-4">
              <label htmlFor="sim-age" className="text-sm font-medium text-neutral-900">
                Âge actuel
              </label>
              <input
                id="sim-age"
                type="number"
                inputMode="numeric"
                {...register("age")}
                className={fieldClass}
                min={55}
                max={67}
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {errors.age.message}
                </p>
              )}
            </div>

            <div className="rounded-lg border border-green-100/90 bg-green-50/50 p-4">
              <label htmlFor="sim-trim" className="text-sm font-medium text-neutral-900">
                Trimestres validés
              </label>
              <input
                id="sim-trim"
                type="number"
                inputMode="numeric"
                {...register("trimestres")}
                className={fieldClass}
                min={0}
                max={200}
              />
              {errors.trimestres && (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {errors.trimestres.message}
                </p>
              )}
            </div>

            <div className="rounded-lg border border-green-100/90 bg-green-50/50 p-4">
              <label
                htmlFor="sim-salaire"
                className="text-sm font-medium text-neutral-900"
              >
                Salaire brut mensuel (€)
              </label>
              <input
                id="sim-salaire"
                type="number"
                inputMode="decimal"
                {...register("salaireBrut")}
                className={fieldClass}
                min={800}
                max={15000}
                step={50}
              />
              {errors.salaireBrut && (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {errors.salaireBrut.message}
                </p>
              )}
            </div>

            <fieldset className="rounded-lg border border-green-100/90 bg-green-50/50 p-4">
              <legend className="text-sm font-medium text-neutral-900">
                Taux de temps partiel
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {tauxOptions.map(({ value, label }) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-green-200/80 bg-white px-3 py-2 text-sm has-[:checked]:border-green-600 has-[:checked]:bg-green-50"
                  >
                    <input
                      type="radio"
                      value={String(value)}
                      {...register("tauxTempsPartiel")}
                      className="text-green-700 focus:ring-green-500"
                    />
                    {label}
                  </label>
                ))}
              </div>
              {errors.tauxTempsPartiel && (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {errors.tauxTempsPartiel.message}
                </p>
              )}
            </fieldset>

            <div className="rounded-lg border border-green-100/90 bg-green-50/40 p-4">
              <label htmlFor="sim-regime" className="text-sm font-medium text-neutral-900">
                Régime de retraite
              </label>
              <select
                id="sim-regime"
                {...register("regime")}
                className={fieldClass}
              >
                {regimeOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.regime && (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {errors.regime.message}
                </p>
              )}
            </div>
          </form>

          <div className="min-w-0">
            {parsed ? (
              <ResultsPanel
                age={parsed.age}
                trimestres={parsed.trimestres}
                salaireBrut={parsed.salaireBrut}
                tauxTempsPartiel={parsed.tauxTempsPartiel}
                regime={parsed.regime}
                result={parsed.result}
              />
            ) : (
              <div
                className="rounded-lg border border-amber-100 bg-amber-50/50 p-6 text-sm text-neutral-700"
                aria-live="polite"
              >
                Corrigez les champs surlignés pour afficher les résultats.
              </div>
            )}
          </div>
        </div>

        {parsed && (
          <div className="mt-10">
            <ResultsPanelFollowUp result={parsed.result} />
          </div>
        )}
      </div>
    </section>
  );
}
