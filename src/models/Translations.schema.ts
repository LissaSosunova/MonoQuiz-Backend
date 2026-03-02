import { Schema } from 'mongoose'

export const TranslationSchema = new Schema({
  en: { type: String, default: '' },
  uk: { type: String, default: '' },
  ru: { type: String, default: '' }
})

