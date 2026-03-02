import { z } from 'zod'

const TranslationSchemaZod = z.object({
  en: z.string(),
  uk: z.string(),
  ru: z.string()
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

export const TestTypeCreateSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Slug must be kebab-case'),
  title: TranslationSchemaZod,
  description: TranslationSchemaZod
})

export const TestTypeUpdateSchema = z.object({
  slug: z.string().min(1).optional(),
  title: TranslationSchemaZod,
  description: TranslationSchemaZod
})

export const TestCategoryCreateSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Slug must be kebab-case'),
  title: TranslationSchemaZod,
  description: TranslationSchemaZod
})

export const TestCategoryUpdateSchema = z.object({
  slug: z.string().min(1).optional(),
  title: TranslationSchemaZod,
  description: TranslationSchemaZod
})