import { Schema, model } from 'mongoose'

const ImageSchema = new Schema(
  {
    data: { type: String, required: true }, // base64
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export const Image = model('Image', ImageSchema)
