import { Schema } from 'mongoose';
import { TranslationSchema } from './Translations.schema';

export const ResultSchema = new Schema(
  {
    translations: { type: TranslationSchema, required: true },
    score: {
        from: { type: Number, required: true },
        to: { type: Number, required: true }
    }
  },
  { _id: true }
)
