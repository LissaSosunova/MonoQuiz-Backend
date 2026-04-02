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

const ResultSchemaZod = z.object({
    translations: TranslationSchemaZod,
    score: z.object({
        from: z
            .number({
                error: 'From must be a number'
            })
            .min(0, 'From must be >= 0'),
        to: z
            .number({
                error: 'To must be a number'
            })
            .min(0, 'To must be >= 0')
    })
})
export const TestCreateSchema = z.object({
  name: TranslationSchemaZod,
  description: TranslationSchemaZod.optional(),

  type: z.string().min(1, 'Type required'),
  category: z.string().min(1, 'Category required'),

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

  questions: z
    .array(QuestionSchemaZod)
    .min(1, 'At least one question'),

  results: z
    .array(ResultSchemaZod)
    .min(1, 'At least one result')
    .refine((results) => {
      // сортируем диапазоны по from
      const sorted = [...results].sort(
        (a, b) => a.score.from - b.score.from
      );

      // проверяем пересечения
      for (let i = 0; i < sorted.length - 1; i++) {
        const current = sorted[i];
        const next = sorted[i + 1];

        if (current.score.to >= next.score.from) {
          return false;
        }
      }

      return true;
    }, {
      message: 'Score ranges must not overlap'
    }),

  price: z
    .number({
      error: 'Price must be number'
    })
    .min(0)
    .nullable()
    .optional(),

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