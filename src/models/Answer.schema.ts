import { Schema } from 'mongoose';
import { TranslationSchema } from './Translations.schema';

export const AnswerSchema = new Schema(
  {
    translations: { type: TranslationSchema, required: true },
    score: { type: Number, required: true }
  },
  { _id: true }
)
