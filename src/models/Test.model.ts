import { TranslationSchema } from './Translations.schema';
import { CalculationSchemeSchema } from './CalculationScheme.model';
import { QuestionSchema } from './Question.schema';

import { model, Schema } from 'mongoose'

const TestSchema = new Schema(
  {
    name: { type: TranslationSchema, required: true },
    description: { type: TranslationSchema, required: true },

    type: { type: String, required: true },
    category: { type: String, required: true },

    calculationScheme: {
      type: CalculationSchemeSchema,
      required: true
    },

    questions: {
      type: [QuestionSchema],
      required: true
    },

    price: { type: Number, default: 0 },

    image: { type: String },

    dateCreated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

export const TestModel = model('Test', TestSchema)
