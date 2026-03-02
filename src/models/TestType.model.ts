import { Schema, model, Document } from 'mongoose'
import { TranslationSchema } from './Translations.schema'

export type QuestionType = 'single' | 'multiple' | 'scale'

export interface ITestType extends Document {
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

const TestTypeSchema = new Schema<ITestType>(
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

export const TestTypeModel = model<ITestType>(
  'TestType',
  TestTypeSchema
)
