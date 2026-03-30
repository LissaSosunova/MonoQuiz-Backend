import { z } from 'zod';

export const startTestSchema = z.object({
  testId: z.string().min(1)
});


export const answerQuestionSchema = z.object({
    testId: z.string().min(1),
    questionId: z.string().min(1),
    answer: z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.array(z.string())
    ])

});

export const finishTestSchema = z.object({
  testId: z.string().min(1)
});
