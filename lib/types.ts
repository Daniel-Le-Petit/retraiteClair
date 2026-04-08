export type RegimeRetraite =
  | "general"
  | "fonction_publique"
  | "msa"
  | "rsi";

export type TauxTempsPartiel = 0.4 | 0.6 | 0.7 | 0.8;

export interface SimulatorInput {
  age: number;
  trimestresValides: number;
  salaireBrutMensuel: number;
  tauxTempsPartiel: TauxTempsPartiel;
  regime: RegimeRetraite;
}

export interface SimulatorResult {
  salaireTempsPartiel: number;
  pensionProgressive: number;
  revenuTotalBrutMensuel: number;
  revenuPerduVsTempsPlein: number;
  pourcentageRevenuConserve: number;
  revenuNetEstimeMensuel: number;
}

export type EligibilityStatus = "eligible" | "maybe" | "not_eligible";
