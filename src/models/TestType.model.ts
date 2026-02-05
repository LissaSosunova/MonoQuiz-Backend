import { Schema, model, Document } from 'mongoose'
import { TranslationsSchema } from './Translations.schema'

export type QuestionType = 'single' | 'multiple' | 'scale'

export interface ITestType extends Document {
  slug: string
  translations: {
    en: { title: string; description: string }
    uk: { title: string; description: string }
    ru: { title: string; description: string }
  }
  createdAt: Date
  updatedAt: Date
}

const TestTypeSchema = new Schema<ITestType>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    translations: {
      type: TranslationsSchema,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const TestTypeModel = model<ITestType>(
  'TestType',
  TestTypeSchema
)
