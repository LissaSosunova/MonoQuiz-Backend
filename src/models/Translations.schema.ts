import { Schema } from 'mongoose'

export const TranslationSchema = new Schema(
  {
    en: { type: String, required: true },
    uk: { type: String, required: true },
    ru: { type: String, required: true }
  },
  { _id: false }
)
