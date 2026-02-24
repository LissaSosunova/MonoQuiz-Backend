import { z } from 'zod'

const TranslationSchemaZod = z.object({
  en: z.string().min(1),
  uk: z.string().min(1),
  ru: z.string().min(1)
})

const AnswerSchemaZod = z.object({
  translations: TranslationSchemaZod,
  score: z.number()
})

const QuestionSchemaZod = z.object({
  translations: TranslationSchemaZod,
  answers: z.array(AnswerSchemaZod).min(1)
})

export const TestCreateSchema = z.object({
  name: TranslationSchemaZod,
  description: TranslationSchemaZod,

  type: z.string(),
  category: z.string(),

  calculationScheme: z.object({
    type: z.enum(['sum', 'formula']),
    formula: z.string().optional()
  }).refine(
    (data) => data.type === 'sum' || !!data.formula,
    {
      message: 'Formula required',
      path: ['formula']
    }
  ),

  questions: z.array(QuestionSchemaZod).min(1),

  price: z.number().min(0),

  image: z.string().optional()
})
