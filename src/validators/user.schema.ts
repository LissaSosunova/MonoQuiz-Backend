import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(['admin', 'user']).optional(),
  isActive: z.boolean().optional()
});

export const changePasswordSchema = z.object({
  password: z.string().min(6)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const TestImportSchema = z.object({
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
