import { Schema, model, Document } from 'mongoose'
import { TranslationsSchema } from './Translations.schema'

export interface ITestCategory extends Document {
  slug: string
  translations: {
    en: { title: string; description: string }
    uk: { title: string; description: string }
    ru: { title: string; description: string }
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const TestCategorySchema = new Schema<ITestCategory>(
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
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

export const TestCategoryModel = model<ITestCategory>(
  'TestCategory',
  TestCategorySchema
)
