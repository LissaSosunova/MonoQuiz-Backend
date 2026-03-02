import { Schema, model, Document } from 'mongoose'
import { TranslationSchema } from './Translations.schema'

export interface ITestCategory extends Document {
  slug: string
  title: {
    en: string;
    uk: string;
    ru: string;
  }
  description: {
    en: string;
    uk: string;
    ru: string;
  }
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

    title: {
      type: TranslationSchema,
      required: true
    },

    description: {
      type: TranslationSchema,
      required: true
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
