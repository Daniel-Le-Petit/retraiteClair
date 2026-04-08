import type { SimulatorResult } from "./types";

const TAUX_PLEIN_TRIMESTRES = 172;
const TAUX_MAX_PENSION = 0.5;

export function calculatePensionProgressive(
  salaireBrut: number,
  trimestresValides: number,
  tauxTempsPartiel: number
): number {
  const tauxAcquis = Math.min(trimestresValides / TAUX_PLEIN_TRIMESTRES, 1);
  const pensionPleine = salaireBrut * TAUX_MAX_PENSION * tauxAcquis;
  const fractionProgressive = 1 - tauxTempsPartiel;
  return pensionPleine * fractionProgressive;
}

export function computeSimulatorResult(
  salaireBrutMensuel: number,
  trimestresValides: number,
  tauxTempsPartiel: number
): SimulatorResult {
  const salaireTempsPartiel = salaireBrutMensuel * tauxTempsPartiel;
  const pensionProgressive = calculatePensionProgressive(
    salaireBrutMensuel,
    trimestresValides,
    tauxTempsPartiel
  );
  const revenuTotalBrutMensuel = salaireTempsPartiel + pensionProgressive;
  const revenuPerduVsTempsPlein = Math.max(
    0,
    salaireBrutMensuel - revenuTotalBrutMensuel
  );
  const pourcentageRevenuConserve =
    salaireBrutMensuel > 0
      ? (revenuTotalBrutMensuel / salaireBrutMensuel) * 100
      : 0;
  const revenuNetEstimeMensuel = revenuTotalBrutMensuel * 0.77;

  return {
    salaireTempsPartiel,
    pensionProgressive,
    revenuTotalBrutMensuel,
    revenuPerduVsTempsPlein,
    pourcentageRevenuConserve,
    revenuNetEstimeMensuel,
  };
}

export function getEligibility(
  age: number,
  trimestres: number
): "eligible" | "maybe" | "not_eligible" {
  if (age >= 60 && trimestres >= 150) return "eligible";
  if (age >= 60 && trimestres >= 120 && trimestres <= 149) return "maybe";
  return "not_eligible";
}
