import { Schema } from 'mongoose'

export type CalculationType = 'sum' | 'formula'

interface CalculationScheme {
  type: CalculationType
  formula?: string
}

export const CalculationSchemeSchema = new Schema<CalculationScheme>(
  {
    type: {
      type: String,
      enum: ['sum', 'formula'],
      required: true
    },
    formula: {
      type: String,
      required: function (this: CalculationScheme) {
        return this.type === 'formula'
      }
    }
  },
  { _id: false }
)
