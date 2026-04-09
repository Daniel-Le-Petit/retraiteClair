"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { RegimeRetraite, SimulatorResult } from "@/lib/types";

function formatEUR(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

function formatPct(n: number) {
  return `${n.toFixed(0)} %`;
}

const REGIME_LABELS: Record<RegimeRetraite, string> = {
  general: "Régime général",
  fonction_publique: "Fonction publique",
  msa: "MSA",
  rsi: "RSI",
};

const adminSteps = [
  "Contactez votre caisse de retraite (Cnav, MSA, etc.)",
  "Obtenez l’accord de votre employeur (obligatoire)",
  "Déposez votre demande 4 mois avant la date souhaitée",
  "Signez un avenant à votre contrat de travail",
];

export interface ResultsPanelProps {
  age: number;
  trimestres: number;
  salaireBrut: number;
  tauxTempsPartiel: number;
  regime: RegimeRetraite;
  result: SimulatorResult;
}

export interface ResultsPanelFollowUpProps {
  result: SimulatorResult;
}

/** Blocs pleine largeur sous le tableau de résultats (évite une colonne vide à gauche). */
export function ResultsPanelFollowUp({ result }: ResultsPanelFollowUpProps) {
  const [openAdmin, setOpenAdmin] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-neutral-200 bg-neutral-100/80 p-4 text-sm print-break-inside-avoid">
        <p className="font-medium text-neutral-900">Impact fiscal (estimation)</p>
        <p className="mt-2 text-neutral-900">
          Revenu net mensuel estimé (après prélèvements, ordre de grandeur ~23 %) :{" "}
          <strong>{formatEUR(result.revenuNetEstimeMensuel)}</strong>
        </p>
        <p className="mt-2 text-neutral-600">
          Estimation indicative — consultez un conseiller pour votre situation
          précise.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border-[0.5px] border-neutral-200 bg-white print-break-inside-avoid">
        <button
          type="button"
          id="admin-accordion-button"
          aria-expanded={openAdmin}
          aria-controls="admin-accordion-panel"
          onClick={() => setOpenAdmin((o) => !o)}
          className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium text-neutral-900 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
          Vos démarches administratives
          <ChevronDown
            className={`h-5 w-5 shrink-0 transition-transform ${openAdmin ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
        <div
          id="admin-accordion-panel"
          role="region"
          aria-labelledby="admin-accordion-button"
          className={`overflow-hidden border-neutral-200 transition-[max-height] duration-300 ease-out ${openAdmin ? "max-h-96 border-t" : "max-h-0"}`}
        >
          <ol className="list-decimal space-y-2 px-4 py-3 pl-9 text-sm text-neutral-600">
            {adminSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="print-only mt-6 border-t border-neutral-200 pt-4 text-xs text-neutral-600">
        Les résultats sont des estimations indicatives. Consultez votre caisse de
        retraite pour une évaluation officielle.
      </div>

      <button
        type="button"
        onClick={() => window.print()}
        className="print-hidden w-full rounded-lg border border-green-700 bg-white py-3 text-sm font-medium text-green-700 transition hover:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 sm:w-auto sm:self-start"
      >
        Télécharger mon rapport
      </button>
    </div>
  );
}

export function ResultsPanel({
  age,
  trimestres,
  salaireBrut,
  tauxTempsPartiel,
  regime,
  result,
}: ResultsPanelProps) {

  const salaire = result.salaireTempsPartiel;
  const pension = result.pensionProgressive;
  const perdu = result.revenuPerduVsTempsPlein;
  const base =
    salaireBrut > 0
      ? salaireBrut
      : Math.max(salaire + pension + perdu, 1);
  const pct = (v: number) => (base > 0 ? Math.min(100, Math.max(0, (v / base) * 100)) : 0);

  const segments = [
    {
      key: "salaire",
      label: "Salaire à temps partiel",
      short: "Salaire partiel",
      value: salaire,
      widthPct: pct(salaire),
      className:
        "bg-[#0a4a35] text-white border-r border-white/25",
      dotClass: "bg-[#0a4a35]",
    },
    {
      key: "pension",
      label: "Pension progressive",
      short: "Pension",
      value: pension,
      widthPct: pct(pension),
      className:
        "bg-[#1d9e75] text-white border-r border-white/25",
      dotClass: "bg-[#1d9e75]",
    },
    {
      key: "perdu",
      label: "Écart vs temps plein (non perçu)",
      short: "Revenu non perçu",
      value: perdu,
      widthPct: pct(perdu),
      className: "bg-[#64748b] text-white",
      dotClass: "bg-slate-500",
    },
  ] as const;

  return (
    <div
      className="flex flex-col gap-6"
      aria-live="polite"
      aria-relevant="additions text"
    >
      <div className="print-only print-break-inside-avoid border-b border-neutral-200 pb-4">
        <p
          className="font-serif text-xl text-neutral-900"
          suppressHydrationWarning
        >
          Simulation RetraiteClair —{" "}
          {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(
            new Date()
          )}
        </p>
        <p className="mt-1 text-sm text-neutral-600">
          Données saisies : âge {age} ans, {trimestres} trimestres, salaire brut{" "}
          {formatEUR(salaireBrut)}, temps partiel {formatPct(tauxTempsPartiel * 100)},{" "}
          {REGIME_LABELS[regime]}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-green-200/80 bg-green-50/90 p-4 print-break-inside-avoid">
          <p className="text-xs font-medium uppercase tracking-wide text-green-800/80">
            Salaire à temps partiel
          </p>
          <p className="mt-2 font-serif text-2xl text-green-900">
            {formatEUR(result.salaireTempsPartiel)}
          </p>
        </div>
        <div className="rounded-lg border border-green-100 bg-green-100/60 p-4 print-break-inside-avoid">
          <p className="text-xs font-medium uppercase tracking-wide text-green-800/80">
            Pension progressive
          </p>
          <p className="mt-2 font-serif text-2xl text-green-900">
            {formatEUR(result.pensionProgressive)}
          </p>
        </div>
        <div className="rounded-lg border border-green-600/40 bg-green-800 p-4 text-white shadow-md shadow-green-900/25 print-break-inside-avoid">
          <p className="text-xs font-medium uppercase tracking-wide text-green-100/90">
            Revenu total mensuel
          </p>
          <p className="mt-2 font-serif text-2xl text-white">
            {formatEUR(result.revenuTotalBrutMensuel)}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-amber-100 bg-amber-100 p-4 text-sm text-amber-700 print-break-inside-avoid">
        <p className="font-medium">Point clé</p>
        <p className="mt-1">
          Vous conservez environ{" "}
          <strong>{result.pourcentageRevenuConserve.toFixed(0)} %</strong> de votre
          revenu actuel en travaillant à{" "}
          <strong>{formatPct(tauxTempsPartiel * 100)}</strong> du temps.
        </p>
      </div>

      <div className="rounded-lg border border-green-200/90 bg-white p-4 shadow-sm shadow-green-900/5 print-break-inside-avoid">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-base font-medium text-green-950">
            Composition de vos revenus mensuels
          </p>
          <p className="text-xs text-neutral-600">
            Référence : salaire brut temps plein ({formatEUR(salaireBrut)})
          </p>
        </div>
        <p className="mt-2 text-xs text-neutral-600">
          Chaque bandeau correspond à une part de votre salaire brut à temps plein : salaire
          partiel, pension, et la part non perçue par rapport au temps plein.
        </p>

        <ul className="mt-4 space-y-3" aria-label="Détail par poste">
          {segments.map((s) => (
            <li
              key={s.key}
              className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm sm:flex-nowrap sm:items-center"
            >
              <span className={`inline-block h-3 w-3 shrink-0 rounded-sm ${s.dotClass}`} />
              <span className="min-w-[10rem] sm:min-w-[12rem] font-medium text-neutral-900">
                {s.label}
              </span>
              <span className="ml-auto font-serif text-lg tabular-nums text-green-950 sm:ml-2">
                {formatEUR(s.value)}
              </span>
              <span className="w-full text-xs text-neutral-500 sm:w-auto">
                ({s.widthPct.toFixed(0)} % du brut)
              </span>
            </li>
          ))}
        </ul>

        <div
          className="mt-4 flex h-14 w-full min-h-[3.5rem] overflow-hidden rounded-lg border border-neutral-200 shadow-inner print:h-12"
          role="img"
          aria-label="Barre empilée : salaire partiel, pension, revenu non perçu"
        >
          {segments.map((s) => (
            <div
              key={s.key}
              className={`flex min-w-0 flex-col items-center justify-center px-0.5 py-1 text-center text-[10px] font-semibold leading-tight sm:px-1 sm:text-xs ${s.className}`}
              style={{ width: `${s.widthPct}%` }}
              title={`${s.label} : ${formatEUR(s.value)}`}
            >
              {s.widthPct >= 10 ? (
                <>
                  <span className="hidden sm:inline">{s.short}</span>
                  <span className="tabular-nums sm:mt-0.5">{formatEUR(s.value)}</span>
                </>
              ) : s.widthPct >= 4 ? (
                <span className="tabular-nums">{formatEUR(s.value)}</span>
              ) : null}
            </div>
          ))}
        </div>

        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-600">
          <li className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#0a4a35]" aria-hidden />
            Vert foncé : salaire à temps partiel
          </li>
          <li className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#1d9e75]" aria-hidden />
            Vert vif : pension progressive
          </li>
          <li className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#64748b]" aria-hidden />
            Gris : écart vs temps plein (non perçu)
          </li>
        </ul>
      </div>
    </div>
  );
}
