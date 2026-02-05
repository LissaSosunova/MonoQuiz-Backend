import { Schema } from 'mongoose'

export const TranslationsSchema = new Schema(
  {
    en: {
      title: { type: String, required: true },
      description: { type: String, default: '' }
    },
    uk: {
      title: { type: String, required: true },
      description: { type: String, default: '' }
    },
    ru: {
      title: { type: String, required: true },
      description: { type: String, default: '' }
    }
  },
  { _id: false }
)
