import { Schema, model, Document, Types } from 'mongoose'
import { TranslationsSchema } from './Translations.schema'

/* ---------- Answer ---------- */
export interface IAnswer {
  id: string
  translations: {
    en: { title: string }
    uk: { title: string }
    ru: { title: string }
  }
  score: number
}

const AnswerSchema = new Schema<IAnswer>(
  {
    id: { type: String, required: true },

    translations: {
      type: TranslationsSchema,
      required: true
    },

    score: {
      type: Number,
      required: true
    }
  },
  { _id: false }
)

/* ---------- Question ---------- */
export interface IQuestion {
  id: string
  translations: {
    en: { title: string; description?: string }
    uk: { title: string; description?: string }
    ru: { title: string; description?: string }
  }
  answers: IAnswer[]
  reverse: boolean
}

const QuestionSchema = new Schema<IQuestion>(
  {
    id: { type: String, required: true },

    translations: {
      type: TranslationsSchema,
      required: true
    },

    answers: {
      type: [AnswerSchema],
      validate: [(v: IAnswer[]) => v.length > 0, 'Answers required']
    },

    reverse: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
)

/* ---------- Test ---------- */
export interface ITest extends Document {
  slug: string

  categoryId: Types.ObjectId
  typeId: Types.ObjectId
  calculationSchemeId: Types.ObjectId

  translations: {
    en: { title: string; description: string }
    uk: { title: string; description: string }
    ru: { title: string; description: string }
  }

  questions: IQuestion[]

  version: number
  isPublished: boolean
}

const TestSchema = new Schema<ITest>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'TestCategory',
      required: true
    },

    typeId: {
      type: Schema.Types.ObjectId,
      ref: 'TestType',
      required: true
    },

    calculationSchemeId: {
      type: Schema.Types.ObjectId,
      ref: 'CalculationScheme',
      required: true
    },

    translations: {
      type: TranslationsSchema,
      required: true
    },

    questions: {
      type: [QuestionSchema],
      default: []
    },

    version: {
      type: Number,
      default: 1
    },

    isPublished: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export const TestModel = model<ITest>('Test', TestSchema)
