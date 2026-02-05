import { Schema, model, Document } from 'mongoose'
import { TranslationsSchema } from './Translations.schema'

export type CalculationType = 'sum' | 'formula'

export interface IResultRange {
  min: number
  max: number
  translations: {
    en: { title: string; description: string }
    uk: { title: string; description: string }
    ru: { title: string; description: string }
  }
}

export interface ICalculationScheme extends Document {
  slug: string
  type: CalculationType
  formula?: string
  resultRanges: IResultRange[]
}

const ResultRangeSchema = new Schema<IResultRange>(
  {
    min: Number,
    max: Number,
    translations: {
      type: TranslationsSchema,
      required: true
    }
  },
  { _id: false }
)

const CalculationSchemeSchema = new Schema<ICalculationScheme>(
  {
    slug: {
      type: String,
      unique: true,
      required: true
    },

    type: {
      type: String,
      enum: ['sum', 'formula'],
      required: true
    },

    formula: {
      type: String,
      required: function () {
        return this.type === 'formula'
      }
    },

    resultRanges: {
      type: [ResultRangeSchema],
      default: []
    }
  },
  { timestamps: true }
)

export const CalculationSchemeModel = model<ICalculationScheme>(
  'CalculationScheme',
  CalculationSchemeSchema
)
