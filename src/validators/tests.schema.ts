import { z } from 'zod';

export const TestImportSchema = z.object({
  translations: z.object({
    en: z.object({
      title: z.string(),
      description: z.string()
    }),
    uk: z.object({
      title: z.string(),
      description: z.string()
    }),
    ru: z.object({
      title: z.string(),
      description: z.string()
    })
  }),
  questions: z.array(
    z.object({
      translations: z.any(),
      answers: z.array(
        z.object({
          translations: z.any(),
          score: z.number()
        })
      )
    })
  )
})

export const TestTypeCreateSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Slug must be kebab-case'),

  translations: z.object({
    en: z.object({
      title: z.string().min(1),
      description: z.string().optional().default('')
    }),
    uk: z.object({
      title: z.string().min(1),
      description: z.string().optional().default('')
    }),
    ru: z.object({
      title: z.string().min(1),
      description: z.string().optional().default('')
    })
  })
})

export const TestTypeUpdateSchema = z.object({
  slug: z.string().min(1).optional(),
  translations: z.object({
    en: z.object({
      title: z.string().min(1),
      description: z.string().optional().default('')
    }),
    uk: z.object({
      title: z.string().min(1),
      description: z.string().optional().default('')
    }),
    ru: z.object({
      title: z.string().min(1),
      description: z.string().optional().default('')
    })
  }).optional()
})

