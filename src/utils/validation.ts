import { z } from 'zod';

// Schema for simplified form
export const simplifiedFormSchema = z.object({
  salaireBrut: z
    .number({
      required_error: 'Le salaire brut est requis',
      invalid_type_error: 'Le salaire brut doit être un nombre'
    })
    .positive('Le salaire brut doit être positif')
    .max(100000, 'Le salaire brut ne peut pas dépasser 100 000 €'),
  tempsPartiel: z
    .number({
      required_error: 'Le temps partiel est requis',
      invalid_type_error: 'Le temps partiel doit être un nombre'
    })
    .min(40, 'Le temps partiel doit être au moins 40%')
    .max(80, 'Le temps partiel ne peut pas dépasser 80%'),
  age: z
    .number({
      required_error: 'L\'âge est requis',
      invalid_type_error: 'L\'âge doit être un nombre'
    })
    .int('L\'âge doit être un nombre entier')
    .min(55, 'L\'âge minimum est de 55 ans')
    .max(70, 'L\'âge maximum est de 70 ans')
});

// Schema for advanced form
export const advancedFormSchema = z.object({
  salaireBrut: z
    .number({
      required_error: 'Le salaire brut est requis',
      invalid_type_error: 'Le salaire brut doit être un nombre'
    })
    .positive('Le salaire brut doit être positif')
    .max(100000, 'Le salaire brut ne peut pas dépasser 100 000 €'),
  tempsPartiel: z
    .number({
      required_error: 'Le temps partiel est requis',
      invalid_type_error: 'Le temps partiel doit être un nombre'
    })
    .min(40, 'Le temps partiel doit être au moins 40%')
    .max(80, 'Le temps partiel ne peut pas dépasser 80%'),
  age: z
    .number({
      required_error: 'L\'âge est requis',
      invalid_type_error: 'L\'âge doit être un nombre'
    })
    .int('L\'âge doit être un nombre entier')
    .min(55, 'L\'âge minimum est de 55 ans')
    .max(70, 'L\'âge maximum est de 70 ans'),
  trimestres: z
    .number({
      required_error: 'Le nombre de trimestres est requis',
      invalid_type_error: 'Le nombre de trimestres doit être un nombre'
    })
    .int('Le nombre de trimestres doit être un nombre entier')
    .min(150, 'Le nombre minimum de trimestres est 150')
    .max(200, 'Le nombre maximum de trimestres est 200'),
  sam: z
    .number({
      required_error: 'Le SAM est requis',
      invalid_type_error: 'Le SAM doit être un nombre'
    })
    .positive('Le SAM doit être positif')
    .max(50000, 'Le SAM ne peut pas dépasser 50 000 €')
    .optional(),
  pensionComplete: z
    .number({
      invalid_type_error: 'La pension complète doit être un nombre'
    })
    .positive('La pension complète doit être positive')
    .max(10000, 'La pension complète ne peut pas dépasser 10 000 €')
    .optional(),
  revenusComplementaires: z
    .number({
      invalid_type_error: 'Les revenus complémentaires doivent être un nombre'
    })
    .nonnegative('Les revenus complémentaires ne peuvent pas être négatifs')
    .max(50000, 'Les revenus complémentaires ne peuvent pas dépasser 50 000 €')
    .optional()
});

// Type inference
export type SimplifiedFormData = z.infer<typeof simplifiedFormSchema>;
export type AdvancedFormData = z.infer<typeof advancedFormSchema>;

// Validation helper functions
export const validateSimplifiedForm = (data: unknown) => {
  try {
    return {
      success: true,
      data: simplifiedFormSchema.parse(data)
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message
        }))
      };
    }
    throw error;
  }
};

export const validateAdvancedForm = (data: unknown) => {
  try {
    return {
      success: true,
      data: advancedFormSchema.parse(data)
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message
        }))
      };
    }
    throw error;
  }
};






