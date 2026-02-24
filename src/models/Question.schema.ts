import { Schema } from 'mongoose';
import { TranslationSchema } from './Translations.schema';
import { AnswerSchema } from './Answer.schema';

export const QuestionSchema = new Schema(
  {
    translations: { type: TranslationSchema, required: true },
    answers: { type: [AnswerSchema], required: true }
  },
  { _id: true }
)
