/**
 * Logs calculation requests for audit purposes
 * No personal data is logged - only calculation parameters and results
 */

interface CalculationLog {
  timestamp: string;
  mode: 'simplifie' | 'avance';
  parameters: {
    tempsPartiel: number;
    age: number;
    hasTrimestres: boolean;
    hasSam: boolean;
    hasPensionComplete: boolean;
    hasRevenusComplementaires: boolean;
  };
  results: {
    totalNet: number;
    salaireNetTempsPartiel: number;
    pensionProgressiveNet: number;
    impactFiscal?: {
      economie: number;
      trancheAvant: number;
      trancheApres: number;
    };
  };
  formulaVersion: string;
}

export const logCalculation = (logData: CalculationLog) => {
  // In production, this would be sent to a logging service
  // For now, we log to console in JSON format for easy parsing
  if (process.env.NODE_ENV === 'production') {
    console.log(JSON.stringify({
      type: 'calculation',
      ...logData
    }));
  } else {
    // In development, pretty print for debugging
    console.log('📊 Calculation Log:', logData);
  }
};


